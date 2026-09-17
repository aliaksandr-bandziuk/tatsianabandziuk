import type { ChartKind, CoverVariant, DashboardVariant } from "@/content/types";
import { Fragment } from "react";
import s from "./charts.module.scss";

// Colours come from CSS variables so the dark theme works.
const EM = "var(--emerald)";
const MUTED = "var(--bar-muted)";
const TRACK = "var(--tint-3)";
const SAND = "var(--placeholder)";
const SAND2 = "var(--sand-2)";
const GREY = "#b6b2a8";

/** Small chart at the bottom of a service card. */
export function MiniChart({ kind }: { kind: ChartKind }) {
  switch (kind) {
    case "sizeCurve": {
      const bars = [
        [0, 26, 16, 0], [33, 18, 24, 0], [66, 8, 34, 1], [99, 3, 39, 1],
        [132, 12, 30, 1], [165, 22, 20, 0], [198, 30, 12, 0], [231, 35, 7, 0],
      ];
      return (
        <svg className={s.svg} viewBox="0 0 260 42" preserveAspectRatio="none" aria-hidden="true">
          {bars.map(([x, y, h, hi], i) => (
            <rect key={i} className={s.grow} x={x} y={y} width="26" height={h} fill={hi ? EM : MUTED}
              style={{ transitionDelay: `${i * 60}ms` }} />
          ))}
        </svg>
      );
    }
    case "priceLadder":
      return (
        <svg className={s.svg} viewBox="0 0 260 42" preserveAspectRatio="none" aria-hidden="true">
          <polyline className={s.draw} pathLength={1} points="4,36 48,31 92,23 136,21 180,12 224,6 256,4" fill="none" stroke={EM} strokeWidth="2" />
          {[[48, 31], [136, 21], [224, 6]].map(([cx, cy]) => (
            <circle key={cx} className={s.fade} cx={cx} cy={cy} r="2.8" fill={EM} />
          ))}
        </svg>
      );
    case "dashboard":
      return (
        <svg className={s.svg} viewBox="0 0 260 42" preserveAspectRatio="none" aria-hidden="true">
          <rect x="0" y="0" width="120" height="18" rx="2" fill={TRACK} />
          <rect x="0" y="24" width="120" height="18" rx="2" fill={TRACK} />
          <rect x="128" y="0" width="132" height="42" rx="2" fill={TRACK} />
          <polyline className={s.draw} pathLength={1} points="136,34 160,25 184,28 208,15 232,19 252,9" fill="none" stroke={EM} strokeWidth="2" />
          <rect className={s.grow} style={{ transformOrigin: "left" }} x="0" y="0" width="52" height="18" rx="2" fill={EM} />
        </svg>
      );
    case "otbTable":
      return <OtbTable />;
    case "completeness":
      return (
        <div className={s.completeness} aria-hidden="true">
          {[["Colour", 94, false], ["Season", 98, false], ["Composition", 77, true]].map(([label, v, soft]) => (
            <div key={String(label)} className={s.completenessRow}>
              <span>{label}</span>
              <span className={s.track}>
                <span className={`${s.bar} ${soft ? s.barSoft : ""}`} style={{ right: `${100 - Number(v)}%` }} />
              </span>
              <b>{v}%</b>
            </div>
          ))}
        </div>
      );
    case "calendar": {
      const pattern = [1, 0, 0, 2, 1, 0, 0, 2, 1, 0, 0, 2];
      return (
        <div className={s.calendar} aria-hidden="true">
          {pattern.map((p, i) => (
            <span key={i} className={`${s.grow} ${p === 1 ? s.c1 : p === 2 ? s.c2 : ""}`} style={{ transitionDelay: `${i * 40}ms` }} />
          ))}
        </div>
      );
    }
  }
}

export function OtbTable() {
  const rows: [string, string[]][] = [
    ["Buy", ["420", "380", "455", "1255"]],
    ["Sold", ["311", "358", "402", "1071"]],
  ];
  return (
    <div className={s.otb} aria-hidden="true">
      <span className={s.rowHead}>OTB</span>
      {["M1", "M2", "M3", "Q1"].map((h) => (
        <span key={h} className={s.colHead}>{h}</span>
      ))}
      {rows.map(([label, cells], r) => (
        <Fragment key={label}>
          <span className={s.rowHead}>{label}</span>
          {cells.map((c, i) => {
            const cls = r === 0 && i === 3 ? s.hi : r === 1 && (i === 1 || i === 3) ? s.soft : "";
            return (
              <span key={`${label}-${i}`} className={`${cls} ${r === 1 && i === 3 ? s.sweep : ""}`}>{c}</span>
            );
          })}
        </Fragment>
      ))}
    </div>
  );
}

/** Sell-through sparkline in the hero, with the handwritten note. */
export function HeroChart({ label, delta, note }: { label: string; delta: string; note: string }) {
  return (
    <div className={s.hero}>
      <div className={s.heroHead}>
        <span>{label}</span>
        <b>{delta}</b>
      </div>
      <svg className={s.svg} viewBox="0 0 300 64" preserveAspectRatio="none" style={{ height: 64 }} aria-hidden="true">
        <polyline points="0,60 38,57 76,54 114,51 152,47 190,43 228,40 266,37 300,35" fill="none" stroke="#b9c4bb" strokeWidth="1.5" strokeDasharray="4 3" />
        <polyline className={s.draw} pathLength={1} points="0,58 38,52 76,44 114,38 152,26 190,20 228,13 266,9 300,6" fill="none" stroke={EM} strokeWidth="2" />
        <circle className={s.fade} cx="152" cy="26" r="3.2" fill={EM} />
      </svg>
      <div className={s.axis}>
        <span>W1</span>
        <span>W12</span>
      </div>
      <div className={`${s.note} ${s.fade}`}>
        <span>{note}</span>
        <svg width="34" height="30" viewBox="0 0 34 30" aria-hidden="true">
          <path d="M32 4C22 6 12 12 5 24" fill="none" stroke={EM} strokeWidth="1.4" />
          <path d="M3 16l1.4 9 8-4z" fill={EM} />
        </svg>
      </div>
    </div>
  );
}

/** Schematic dashboard on case-study cards. */
export function CaseDashboard({ variant, tall = false }: { variant: DashboardVariant; tall?: boolean }) {
  const vb = tall ? "0 0 1280 300" : "0 0 320 118";
  if (tall) return <WideDashboard />;
  if (variant === "trend")
    return (
      <svg className={s.svg} viewBox={vb} aria-hidden="true">
        <rect x="0" y="0" width="320" height="30" rx="3" fill={SAND} />
        <rect className={s.grow} style={{ transformOrigin: "left" }} x="0" y="0" width="90" height="30" rx="3" fill={EM} />
        <rect x="0" y="38" width="200" height="80" rx="3" fill={SAND2} />
        <polyline points="12,110 46,104 80,100 114,94 148,90 188,84" fill="none" stroke={GREY} strokeWidth="1.5" strokeDasharray="4 3" />
        <polyline className={s.draw} pathLength={1} points="12,104 46,92 80,86 114,66 148,58 188,44" fill="none" stroke={EM} strokeWidth="2" />
        <rect x="210" y="38" width="110" height="36" rx="3" fill={SAND2} />
        <rect x="210" y="82" width="110" height="36" rx="3" fill={SAND2} />
      </svg>
    );
  if (variant === "blocks") {
    const bars = [[12, 98, 12], [42, 88, 22], [72, 76, 34], [102, 82, 28], [132, 92, 18], [162, 84, 26], [192, 94, 16], [222, 86, 24]];
    return (
      <svg className={s.svg} viewBox={vb} aria-hidden="true">
        <rect x="0" y="0" width="104" height="54" rx="3" fill={SAND} />
        <rect x="112" y="0" width="104" height="54" rx="3" fill={SAND} />
        <rect x="224" y="0" width="96" height="54" rx="3" fill={EM} />
        <rect x="0" y="62" width="320" height="56" rx="3" fill={SAND2} />
        {bars.map(([x, y, h], i) => (
          <rect key={i} className={s.grow} style={{ transitionDelay: `${i * 50}ms` }} x={x} y={y} width="22" height={h} fill={i === 2 ? EM : GREY} />
        ))}
      </svg>
    );
  }
  const bars = [[14, 94, 12, 0], [40, 82, 24, 0], [66, 68, 38, 1], [92, 58, 48, 1], [118, 74, 32, 0]];
  return (
    <svg className={s.svg} viewBox={vb} aria-hidden="true">
      <rect x="0" y="0" width="150" height="34" rx="3" fill={SAND} />
      <rect className={s.grow} style={{ transformOrigin: "left" }} x="0" y="0" width="64" height="34" rx="3" fill={EM} />
      <rect x="160" y="0" width="160" height="34" rx="3" fill={SAND} />
      <rect x="0" y="42" width="320" height="76" rx="3" fill={SAND2} />
      {bars.map(([x, y, h, hi], i) => (
        <rect key={i} className={s.grow} style={{ transitionDelay: `${i * 60}ms` }} x={x} y={y} width="18" height={h} fill={hi ? EM : GREY} />
      ))}
      <polyline className={s.draw} pathLength={1} points="150,92 186,80 222,84 258,62 294,54" fill="none" stroke={EM} strokeWidth="2" />
    </svg>
  );
}

function WideDashboard() {
  const bars = Array.from({ length: 14 }, (_, i) => [40 + i * 40, [60, 90, 120, 150, 110, 80, 130, 160, 140, 100, 70, 95, 125, 85][i]]);
  const completeness = [0.94, 0.98, 0.77, 0.88];
  return (
    <svg className={s.svg} viewBox="0 0 1280 300" aria-hidden="true">
      <rect x="0" y="0" width="400" height="60" rx="6" fill={SAND} />
      <rect className={s.grow} style={{ transformOrigin: "left" }} x="0" y="0" width="150" height="60" rx="6" fill={EM} />
      <rect x="420" y="0" width="420" height="60" rx="6" fill={SAND} />
      <rect x="860" y="0" width="420" height="60" rx="6" fill={SAND} />
      <rect x="0" y="80" width="760" height="220" rx="6" fill={SAND2} />
      {bars.map(([x, h], i) => (
        <rect key={i} className={s.grow} style={{ transitionDelay: `${i * 40}ms` }} x={x} y={280 - h} width="24" height={h} fill={i % 3 === 1 ? EM : GREY} />
      ))}
      <polyline className={s.draw} pathLength={1} points="600,250 640,220 680,230 720,180" fill="none" stroke={EM} strokeWidth="3" />
      <rect x="780" y="80" width="500" height="220" rx="6" fill={SAND2} />
      {completeness.map((v, i) => (
        <g key={i}>
          <rect x="810" y={110 + i * 46} width="440" height="14" rx="7" fill={SAND} />
          <rect className={s.bar} style={{ transformOrigin: "left" }} x="810" y={110 + i * 46} width={440 * v} height="14" rx="7" fill={i === 2 ? "var(--emerald-soft)" : EM} />
        </g>
      ))}
    </svg>
  );
}

/** Article cover illustrations. */
export function Cover({ variant }: { variant: CoverVariant }) {
  const bg = <rect width="420" height="168" fill="var(--sand-2)" />;
  switch (variant) {
    case "tag":
      return (
        <svg className={s.cover} viewBox="0 0 420 168" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {bg}
          <path d="M120 24h120l60 60-96 60-84-84z" fill="#d8d3c8" />
          <circle cx="150" cy="54" r="9" fill="var(--sand-2)" />
          <polyline points="196,116 226,100 256,106 286,78 314,66" fill="none" stroke={EM} strokeWidth="3" />
          <rect x="196" y="130" width="120" height="8" rx="4" fill="#d8d3c8" />
        </svg>
      );
    case "swatches":
      return (
        <svg className={s.cover} viewBox="0 0 420 168" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {bg}
          <rect x="52" y="30" width="72" height="108" rx="5" fill={EM} />
          <rect x="132" y="30" width="72" height="108" rx="5" fill="#8db8a2" />
          <rect x="212" y="30" width="72" height="108" rx="5" fill="#d8d3c8" />
          <rect x="292" y="30" width="72" height="108" rx="5" fill="#cfcabf" />
        </svg>
      );
    case "table":
      return (
        <svg className={s.cover} viewBox="0 0 420 168" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {bg}
          <rect x="60" y="26" width="300" height="116" rx="6" fill="#faf8f4" />
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2, 3, 4].map((c) => (
              <rect key={`${r}-${c}`} x={72 + c * 56} y={38 + r * 25} width="50" height="19" rx="2"
                fill={r === 0 ? "#e2ebe4" : r === 2 && c === 4 ? EM : r === 3 && c % 2 ? "#d6e7dc" : "#eeeae2"} />
            )),
          )}
        </svg>
      );
    case "lines":
      return (
        <svg className={s.cover} viewBox="0 0 420 168" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {bg}
          <rect x="40" y="26" width="340" height="116" rx="6" fill="#d8d3c8" opacity=".5" />
          <polyline points="60,120 110,104 160,110 210,84 260,90 310,62 360,50" fill="none" stroke={EM} strokeWidth="3" />
          <polyline points="60,126 110,120 160,118 210,108 260,104 310,96 360,90" fill="none" stroke={GREY} strokeWidth="2" strokeDasharray="5 4" />
        </svg>
      );
    default:
      return (
        <svg className={s.cover} viewBox="0 0 420 168" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {bg}
          <rect x="40" y="26" width="160" height="116" rx="6" fill="#d8d3c8" />
          <rect x="216" y="26" width="164" height="116" rx="6" fill={EM} opacity=".08" />
          <rect x="236" y="104" width="22" height="22" fill={EM} />
          <rect x="266" y="88" width="22" height="38" fill={EM} />
          <rect x="296" y="72" width="22" height="54" fill={EM} />
          <rect x="326" y="92" width="22" height="34" fill={EM} />
          <rect x="356" y="110" width="14" height="16" fill={EM} />
        </svg>
      );
  }
}

/** Cumulative sell-through curve inside the article. */
export function ArticleCurve() {
  return (
    <svg className={s.svg} viewBox="0 0 680 200" aria-hidden="true">
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="0" x2="680" y1={y} y2={y} stroke="var(--tint-3)" strokeWidth="1" />
      ))}
      <polyline points="0,190 62,182 124,172 186,160 248,148 310,136 372,124 434,114 496,104 558,96 620,90 680,84" fill="none" stroke={GREY} strokeWidth="2" strokeDasharray="6 5" />
      <polyline className={s.draw} pathLength={1} points="0,188 62,172 124,150 186,128 248,104 310,88 372,70 434,56 496,44 558,34 620,26 680,20" fill="none" stroke={EM} strokeWidth="3" />
      <circle className={s.fade} cx="248" cy="104" r="5" fill={EM} />
    </svg>
  );
}

/** 404: sessions that drop to nothing. */
export function NotFoundChart({ label }: { label: string }) {
  return (
    <div className={s.hero} style={{ padding: "22px 24px 18px" }}>
      <div className={s.heroHead}>
        <span>{label}</span>
        <b>404</b>
      </div>
      <svg className={s.svg} viewBox="0 0 400 140" aria-hidden="true">
        <line x1="0" x2="400" y1="130" y2="130" stroke="var(--tint-3)" />
        <polyline className={s.draw} pathLength={1} points="0,110 60,90 120,96 180,60 220,68 270,42" fill="none" stroke={EM} strokeWidth="2.5" />
        <polyline points="270,42 310,80 350,112 380,128" fill="none" stroke={EM} strokeWidth="2.5" strokeDasharray="5 5" />
        <circle cx="270" cy="42" r="5" fill={EM} />
      </svg>
      <div className={s.axis}>
        <span>W1</span>
        <span>W9</span>
        <span>W12</span>
      </div>
    </div>
  );
}
