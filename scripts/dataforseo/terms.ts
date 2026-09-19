/**
 * "Consultant" vs "expert" wording check for PL and RU (2026-09-19):
 * Google Ads volumes for role words and their combinations, plus top-10 SERPs
 * for the bare words to see what Google means by them.
 *
 *   npx tsx scripts/dataforseo/terms.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { call, readCache, ROOT, totalSpent } from "./client";

const PL = [
  "konsultant", "konsultantka", "ekspert", "ekspertka", "doradca", "analityk", "analityczka",
  "konsultant sprzedaży", "konsultant online", "konsultant biznesowy", "ekspert biznesowy", "doradca biznesowy",
  "konsultant analityki", "ekspert analityki", "konsultant ds. analityki", "ekspert ds. analityki",
  "konsultant analityki danych", "ekspert analityki danych", "analityk danych freelance",
  "konsultant power bi", "ekspert power bi", "konsultant excel", "ekspert excel",
  "konsultant retail", "ekspert retail", "ekspert handlu detalicznego", "konsultant e-commerce", "ekspert e-commerce",
  "ekspert ds. asortymentu", "konsultant ds. asortymentu", "analityk sprzedaży", "analityk biznesowy",
  "ekspert mody", "konsultant modowy", "doradztwo analityczne", "analityka biznesowa",
];

const RU = [
  "консультант", "эксперт", "аналитик", "онлайн консультант", "продавец консультант",
  "бизнес консультант", "бизнес эксперт", "консультант по аналитике", "эксперт по аналитике",
  "аналитик данных", "бизнес аналитик", "аналитик продаж",
  "консультант power bi", "эксперт power bi", "эксперт по excel", "консультант по excel",
  "консультант по ритейлу", "эксперт по ритейлу", "ритейл консультант", "ритейл эксперт",
  "консультант по ассортименту", "эксперт по ассортименту", "эксперт по ценообразованию", "консультант по ценообразованию",
  "эксперт по продажам", "консультант по продажам", "fashion консультант", "fashion эксперт",
  "эксперт по розничной торговле", "консалтинг в ритейле", "консультант по управлению ассортиментом",
];

const SERP: { lang: "pl" | "ru"; code: number; language: string; keywords: string[] }[] = [
  { lang: "pl", code: 2616, language: "pl", keywords: ["konsultant", "ekspert", "konsultant analityki danych", "ekspert analityki danych"] },
  { lang: "ru", code: 2398, language: "ru", keywords: ["консультант", "эксперт", "консультант по аналитике", "эксперт по аналитике"] },
];

const VOLUME: { lang: "pl" | "ru"; tag: string; code: number; language: string; keywords: string[] }[] = [
  { lang: "pl", tag: "pl", code: 2616, language: "pl", keywords: PL },
  { lang: "ru", tag: "kz", code: 2398, language: "ru", keywords: RU },
  { lang: "ru", tag: "ua-ru", code: 2804, language: "ru", keywords: RU },
];

const NON_WORD = new RegExp("[^\\p{L}\\p{N}]+", "gu");
const slug = (s: string) => s.replace(NON_WORD, "-").toLowerCase();

async function main() {
  for (const v of VOLUME) {
    await call("/v3/keywords_data/google_ads/search_volume/live", {
      cache: `terms_volume-${v.tag}`,
      body: [{ keywords: v.keywords, location_code: v.code, language_code: v.language }],
      estimate: 0.09,
    });
  }
  for (const s of SERP) {
    for (const keyword of s.keywords) {
      await call("/v3/serp/google/organic/live/advanced", {
        cache: `terms_serp-${s.lang}-${slug(keyword)}`,
        body: [{ keyword, location_code: s.code, language_code: s.language, depth: 10, people_also_ask_click_depth: 1 }],
        estimate: 0.004,
      });
    }
  }

  const out: string[] = ["# Consultant vs expert: PL and RU (DataForSEO, 2026-09-19)", ""];
  for (const v of VOLUME) {
    const res = readCache<{ keyword: string; search_volume: number | null; competition: string | null; cpc: number | null }>(`terms_volume-${v.tag}`);
    const rows = (res?.tasks?.[0]?.result ?? []).slice().sort((a, b) => (b.search_volume ?? -1) - (a.search_volume ?? -1));
    out.push(`## Google Ads volume — ${v.tag}`, "", "| keyword | volume | cpc | competition |", "|---|---|---|---|");
    for (const r of rows) out.push(`| ${r.keyword} | ${r.search_volume ?? "—"} | ${r.cpc ?? "—"} | ${r.competition ?? "—"} |`);
    out.push("");
  }
  for (const s of SERP) {
    for (const keyword of s.keywords) {
      const res = readCache<{ items: { type: string; rank_group?: number; title?: string; domain?: string; items?: { title?: string }[] }[] }>(`terms_serp-${s.lang}-${slug(keyword)}`);
      const items = res?.tasks?.[0]?.result?.[0]?.items ?? [];
      out.push(`## SERP (${s.lang}): ${keyword}`, "");
      for (const it of items.filter((i) => i.type === "organic").slice(0, 10)) out.push(`${it.rank_group}. ${it.title} — ${it.domain}`);
      const paa = items.filter((i) => i.type === "people_also_ask").flatMap((i) => i.items ?? []).map((i) => i.title).filter(Boolean);
      if (paa.length) out.push("", "PAA: " + paa.join(" | "));
      out.push("");
    }
  }
  const file = path.join(ROOT, "research", "consultant-vs-expert.md");
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, out.join("\n") + "\n");
  console.log(`written ${path.relative(ROOT, file)}; total spent $${totalSpent().toFixed(4)}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
