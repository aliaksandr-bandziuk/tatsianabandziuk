"use client";

import { Children, isValidElement, useEffect, useRef, useState, type ReactNode } from "react";
import s from "./slicer.module.scss";

type Topic = { key: string; label: string; count: number };

type Props = {
  topics: Topic[];
  labels: { slicer: string; clear: string; chart: string };
  /** Each child must carry a `data-topics="a b"` attribute. */
  children: ReactNode;
};

/**
 * Power BI-style slicer with cross-highlighting: ticking a topic (or clicking
 * its bar) keeps matching case studies bright and dims the rest. Nothing is
 * removed from the page, so every card stays in the HTML and in view.
 */
export default function CaseSlicer({ topics, labels, children }: Props) {
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [grown, setGrown] = useState(false);
  const chart = useRef<HTMLDivElement>(null);
  const max = Math.max(...topics.map((t) => t.count), 1);

  useEffect(() => {
    const el = chart.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setGrown(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = (key: string) =>
    setSel((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  // Power BI: a plain click on a bar selects only that bar; Ctrl/Cmd adds to the selection.
  const clickBar = (key: string, additive: boolean) =>
    setSel((prev) => {
      if (additive) {
        const next = new Set(prev);
        if (next.has(key)) next.delete(key);
        else next.add(key);
        return next;
      }
      return prev.size === 1 && prev.has(key) ? new Set() : new Set([key]);
    });

  const filtered = sel.size > 0;

  return (
    <div className={s.bi} data-filtered={filtered}>
      <div className={s.slicer}>
        <div className={s.head}>
          <span id="slicer-title">{labels.slicer}</span>
          <button type="button" className={s.clear} data-on={filtered} onClick={() => setSel(new Set())} tabIndex={filtered ? 0 : -1}>
            {labels.clear} ✕
          </button>
        </div>
        <div role="group" aria-labelledby="slicer-title">
          {topics.map((t) => (
            <label key={t.key} className={s.option}>
              <input type="checkbox" checked={sel.has(t.key)} onChange={() => toggle(t.key)} />
              <span className={s.box} aria-hidden="true" />
              <span>{t.label}</span>
              <span className={s.count}>{t.count}</span>
            </label>
          ))}
        </div>
      </div>
      <div className={s.main}>
        <div className={s.visual} ref={chart}>
          <div className={s.head}>
            <span>{labels.chart}</span>
          </div>
          <div className={s.bars}>
            {topics.map((t, i) => (
              <button
                key={t.key}
                type="button"
                className={s.bar}
                data-sel={sel.has(t.key)}
                aria-pressed={sel.has(t.key)}
                onClick={(e) => clickBar(t.key, e.ctrlKey || e.metaKey)}
              >
                <b>{t.count}</b>
                <i style={{ height: `${(t.count / max) * 100}%`, transform: grown ? "none" : "scaleY(0)", transitionDelay: `${i * 90}ms` }} />
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className={s.grid}>
          {Children.map(children, (child) => {
            if (!isValidElement(child)) return child;
            const keys = String((child.props as { "data-topics"?: string })["data-topics"] ?? "").split(" ");
            const hit = keys.some((k) => sel.has(k));
            return (
              <div className={s.item} data-hit={filtered ? hit : undefined}>
                {child}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
