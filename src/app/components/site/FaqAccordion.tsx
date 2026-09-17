"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/content/types";
import s from "./blocks.module.scss";

/**
 * FAQ accordion with a smooth height animation (grid-template-rows 0fr → 1fr).
 * Answers stay in the server HTML, so crawlers and AI fetchers read them.
 */
export default function FaqAccordion({ items, openFirst = true }: { items: FaqItem[]; openFirst?: boolean }) {
  const [open, setOpen] = useState<number | null>(openFirst ? 0 : null);
  const base = useId();
  return (
    <div className={s.faq}>
      {items.map((f, i) => {
        const expanded = open === i;
        const btnId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <div key={f.question} className={s.faqItem} data-open={expanded} data-reveal data-reveal-delay={i * 40}>
            <h3>
              <button type="button" id={btnId} aria-expanded={expanded} aria-controls={panelId} onClick={() => setOpen(expanded ? null : i)}>
                <span>{f.question}</span>
                <span className={s.faqIcon} aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} className={s.faqPanel}>
              <div>
                <p>{f.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
