"use client";

import { useEffect, useRef, useState } from "react";
import s from "./sheet.module.scss";

export type SheetColumn = {
  label: string;
  /** "text" columns are left-aligned and never summed. */
  kind?: "text" | "number";
  /** Conditional formatting: colour scale, data bars, or ▲▼ icons from a trend column. */
  format?: "scale" | "bars";
  suffix?: string;
};

export type SheetRow = { cells: (string | number)[]; trend?: "up" | "down" | "flat" };

export type SheetSelection = { ref: string; values: number[]; count: number };
export const SHEET_EVENT = "sheet-selection";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const GREEN: [number, number, number] = [15, 89, 67];
const LIGHT: [number, number, number] = [247, 249, 247];

function scaleColor(t: number) {
  const k = t * 0.85;
  return `rgb(${LIGHT.map((x, i) => Math.round(x + (GREEN[i] - x) * k)).join(",")})`;
}

type Pos = { r: number; c: number };

/**
 * Spreadsheet-style table: column letters and row numbers, conditional
 * formatting that plays when the sheet scrolls into view (colour scale, data
 * bars, trend icons), and drag-to-select ranges. The selection is broadcast
 * as a `sheet-selection` event for the site-wide status bar.
 */
export default function DataSheet({
  columns,
  rows,
  caption,
  trendColumn,
  lang = "en",
}: {
  columns: SheetColumn[];
  rows: SheetRow[];
  caption?: string;
  /** Index of the column that shows the trend icon. */
  trendColumn?: number;
  lang?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [anchor, setAnchor] = useState<Pos | null>(null);
  const [focus, setFocus] = useState<Pos | null>(null);
  const dragging = useRef(false);

  // Replays every time the sheet comes back into view, like the prototype.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ranges = columns.map((col, ci) => {
    if (!col.format) return null;
    const nums = rows.map((r) => Number(r.cells[ci])).filter((n) => Number.isFinite(n));
    return { min: Math.min(...nums), max: Math.max(...nums) };
  });

  const box = anchor && focus
    ? { r1: Math.min(anchor.r, focus.r), r2: Math.max(anchor.r, focus.r), c1: Math.min(anchor.c, focus.c), c2: Math.max(anchor.c, focus.c) }
    : null;
  const inBox = (r: number, c: number) => !!box && r >= box.r1 && r <= box.r2 && c >= box.c1 && c <= box.c2;

  // Broadcast the selection (or its end) to the status bar.
  useEffect(() => {
    if (!box) {
      window.dispatchEvent(new CustomEvent<SheetSelection | null>(SHEET_EVENT, { detail: null }));
      return;
    }
    const values: number[] = [];
    let count = 0;
    for (let r = box.r1; r <= box.r2; r++)
      for (let c = box.c1; c <= box.c2; c++) {
        count++;
        const v = rows[r]?.cells[c];
        if (columns[c]?.kind !== "text" && typeof v === "number") values.push(v);
      }
    const a = `${LETTERS[box.c1]}${box.r1 + 2}`;
    const b = `${LETTERS[box.c2]}${box.r2 + 2}`;
    window.dispatchEvent(
      new CustomEvent<SheetSelection>(SHEET_EVENT, { detail: { ref: a === b ? a : `${a}:${b}`, values, count } }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [box?.r1, box?.r2, box?.c1, box?.c2]);

  // Clicking anywhere outside clears the range.
  useEffect(() => {
    const up = () => (dragging.current = false);
    const down = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) {
        setAnchor(null);
        setFocus(null);
      }
    };
    document.addEventListener("mouseup", up);
    document.addEventListener("mousedown", down);
    return () => {
      document.removeEventListener("mouseup", up);
      document.removeEventListener("mousedown", down);
    };
  }, []);

  const fmt = new Intl.NumberFormat(lang === "en" ? "en-GB" : lang, { maximumFractionDigits: 1 });

  return (
    <figure className={s.figure}>
      <div className={`${s.wrap} ${on ? s.on : ""}`} ref={wrap}>
        <table className={s.sheet}>
          <thead>
            <tr>
              <th className={s.corner} aria-hidden="true" />
              {columns.map((_, c) => (
                <th key={c} aria-hidden="true" className={box && c >= box.c1 && c <= box.c2 ? s.hl : undefined}>
                  {LETTERS[c]}
                </th>
              ))}
            </tr>
            <tr>
              <th className={s.rowNum} aria-hidden="true">
                1
              </th>
              {columns.map((col, c) => (
                <th key={c} scope="col" className={`${s.head} ${col.kind === "text" ? s.left : ""}`}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                <th aria-hidden="true" className={`${s.rowNum} ${box && r >= box.r1 && r <= box.r2 ? s.hl : ""}`}>
                  {r + 2}
                </th>
                {row.cells.map((v, c) => {
                  const col = columns[c];
                  const range = ranges[c];
                  const n = typeof v === "number" ? v : NaN;
                  const t = range && Number.isFinite(n) && range.max > range.min ? (n - range.min) / (range.max - range.min) : 0;
                  const isAnchor = anchor?.r === r && anchor?.c === c;
                  const style: React.CSSProperties = { transitionDelay: `${r * 110}ms` };
                  if (col.format === "scale" && on) {
                    style.backgroundColor = scaleColor(t);
                    if (t > 0.55) style.color = "#fff";
                  }
                  const Cell = c === 0 && col.kind === "text" ? "th" : "td";
                  return (
                    <Cell
                      key={c}
                      scope={Cell === "th" ? "row" : undefined}
                      className={`${col.kind === "text" ? s.left : ""} ${inBox(r, c) && !isAnchor ? s.inRange : ""} ${isAnchor ? s.active : ""}`}
                      style={style}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        window.getSelection()?.removeAllRanges();
                        dragging.current = true;
                        if (e.shiftKey && anchor) setFocus({ r, c });
                        else {
                          setAnchor({ r, c });
                          setFocus({ r, c });
                        }
                      }}
                      onMouseEnter={() => dragging.current && setFocus({ r, c })}
                    >
                      {col.format === "bars" && Number.isFinite(n) && range && (
                        <span
                          className={s.bar}
                          aria-hidden="true"
                          style={{ width: on ? `calc(${Math.max(8, (n / range.max) * 100)}% - 8px)` : 0, transitionDelay: `${250 + r * 110}ms` }}
                        />
                      )}
                      {trendColumn === c && row.trend && <span className={`${s.icon} ${s[row.trend]}`} aria-hidden="true" />}
                      <span className={s.value}>
                        {typeof v === "number" ? fmt.format(v) : v}
                        {col.suffix && typeof v === "number" ? col.suffix : ""}
                      </span>
                    </Cell>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <figcaption className={s.caption}>{caption}</figcaption>}
    </figure>
  );
}
