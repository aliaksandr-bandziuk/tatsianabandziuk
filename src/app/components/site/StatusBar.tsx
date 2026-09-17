"use client";

import { useEffect, useState } from "react";
import { SHEET_EVENT, type SheetSelection } from "./DataSheet";
import s from "./statusbar.module.scss";

type Labels = { ready: string; average: string; count: string; sum: string; words: string; characters: string; value: string };

type State = { ref?: string; items: [string, string][] };

/**
 * Excel-style status bar. Hidden until something is selected: text anywhere
 * on the page shows words and characters, a range in a DataSheet shows
 * average, count and sum.
 */
export default function StatusBar({ lang, labels }: { lang: string; labels: Labels }) {
  const [state, setState] = useState<State>({ items: [] });

  useEffect(() => {
    const nf = new Intl.NumberFormat(lang === "en" ? "en-GB" : lang, { maximumFractionDigits: 1 });
    let sheetActive = false;

    const onSheet = (e: Event) => {
      const d = (e as CustomEvent<SheetSelection | null>).detail;
      sheetActive = !!d;
      if (!d) {
        setState({ items: [] });
        return;
      }
      const sum = d.values.reduce((a, b) => a + b, 0);
      const items: [string, string][] =
        d.values.length > 1
          ? [
              [labels.average, nf.format(sum / d.values.length)],
              [labels.count, String(d.count)],
              [labels.sum, nf.format(sum)],
            ]
          : d.values.length === 1
            ? [[labels.value, nf.format(d.values[0])]]
            : [[labels.count, String(d.count)]];
      setState({ ref: d.ref, items });
    };

    const onText = () => {
      if (sheetActive) return;
      const sel = window.getSelection();
      const text = sel ? String(sel).trim() : "";
      // Ignore selections inside form fields.
      const node = sel?.anchorNode?.parentElement;
      if (!text || node?.closest("input, textarea")) {
        setState({ items: [] });
        return;
      }
      const words = text.split(/\s+/).filter(Boolean).length;
      setState({
        items: [
          [labels.words, nf.format(words)],
          [labels.characters, nf.format(text.length)],
        ],
      });
    };

    window.addEventListener(SHEET_EVENT, onSheet);
    document.addEventListener("selectionchange", onText);
    return () => {
      window.removeEventListener(SHEET_EVENT, onSheet);
      document.removeEventListener("selectionchange", onText);
    };
  }, [lang, labels]);

  const visible = state.items.length > 0;
  return (
    <div className={s.bar} data-visible={visible} aria-hidden={!visible}>
      <span className={s.ready}>{labels.ready}</span>
      {state.ref && <span className={s.ref}>{state.ref}</span>}
      <span className={s.items} aria-live="polite">
        {state.items.map(([k, v]) => (
          <span key={k}>
            {k}: <b>{v}</b>
          </span>
        ))}
      </span>
      <span className={s.zoom} aria-hidden="true">
        <span>−</span>
        <i />
        <span>+</span>
        <span>100%</span>
      </span>
    </div>
  );
}
