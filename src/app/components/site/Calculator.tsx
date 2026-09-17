"use client";

import { useId, useMemo, useState } from "react";
import type { CalculatorKind } from "@/content/types";
import { CALCULATOR_FIELDS, type Result } from "@/content/calculators";
import s from "./calculator.module.scss";

const LOCALE: Record<string, string> = { en: "en-GB", pl: "pl-PL", ru: "ru-RU" };

/** EN: "1,234.5" (comma = thousands). PL/RU: "1 234,5" (comma = decimal; a dot is also read as decimal). */
function parse(raw: string, lang: string): number {
  // \s also matches the no-break spaces Intl uses as thousands separators.
  let t = raw.replace(/[\s%×]/g, "");
  if (lang === "en") t = t.replace(/,/g, "");
  else if (t.includes(",")) t = t.replace(/\./g, "").replace(",", ".");
  if (t === "") return NaN;
  const n = Number(t);
  return Number.isFinite(n) ? n : NaN;
}

type Props = { kind: CalculatorKind; title: string; labels: Record<string, string>; note?: string; hint: string; lang: string };

export default function Calculator({ kind, title, labels, note, hint, lang }: Props) {
  const spec = CALCULATOR_FIELDS[kind];
  const uid = useId();
  const nf = useMemo(() => new Intl.NumberFormat(LOCALE[lang] ?? "en-GB", { maximumFractionDigits: 2 }), [lang]);
  const [raw, setRaw] = useState<Record<string, string>>(() => Object.fromEntries(spec.inputs.map((f) => [f.id, nf.format(f.initial)])));

  const values = Object.fromEntries(spec.inputs.map((f) => [f.id, parse(raw[f.id] ?? "", lang)]));
  const valid = Object.values(values).every((n) => !Number.isNaN(n));

  const show = (r: Result) => {
    if (!valid) return "—";
    const n = r.compute(values);
    if (n === null || !Number.isFinite(n)) return "—";
    switch (r.format) {
      case "percent":
        return `${nf.format(n * 100)} %`;
      case "ratio":
        return `${nf.format(n)}×`;
      default:
        return nf.format(n);
    }
  };

  return (
    <figure className={s.calc} data-reveal>
      <figcaption className={s.head}>{title}</figcaption>
      <div className={s.grid}>
        <div className={s.inputs}>
          {spec.inputs.map((f, i) => (
            <label key={f.id} className={s.cell} htmlFor={`${uid}-${f.id}`}>
              <span className={s.addr}>A{i + 1}</span>
              <span className={s.label}>{labels[f.id] ?? f.id}</span>
              <input
                id={`${uid}-${f.id}`}
                inputMode="decimal"
                autoComplete="off"
                value={raw[f.id] ?? ""}
                aria-invalid={Number.isNaN(values[f.id])}
                onChange={(e) => setRaw((prev) => ({ ...prev, [f.id]: e.target.value }))}
              />
              {f.suffix && <span className={s.suffix}>{f.suffix}</span>}
            </label>
          ))}
        </div>
        <output className={s.results} htmlFor={spec.inputs.map((f) => `${uid}-${f.id}`).join(" ")} aria-live="polite">
          {spec.results.map((r, i) => (
            <span key={r.id} className={s.result}>
              <span className={s.addr}>B{i + 1}</span>
              <span className={s.label}>{labels[r.id] ?? r.id}</span>
              <strong>{show(r)}</strong>
            </span>
          ))}
        </output>
      </div>
      {note && <p className={s.note}>{note}</p>}
      <p className={s.hint}>{hint}</p>
    </figure>
  );
}
