/**
 * Research for writing the stand-in articles, per language and market:
 * top-10 organic results with People Also Ask and related searches for each
 * target query, plus keyword suggestions (with volume) for the main query.
 *
 *   npx tsx scripts/dataforseo/articles.ts estimate
 *   npx tsx scripts/dataforseo/articles.ts run <lang>
 *   npx tsx scripts/dataforseo/articles.ts brief <lang>    writes research/articles/<lang>/<key>.md (no requests)
 *
 * Target queries come from research/blog-plan.md (main query column).
 * Responses are cached like every other research step.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { call, readCache, ROOT, today, totalSpent } from "./client";
import { isLang, PRIMARY, type Lang } from "./markets";

const SERP_REQ = 0.004; // live advanced with PAA click depth 1
const LABS = 0.012 + 30 * 0.00012;

/** Stand-in article key → target queries (first = main). */
export const TARGETS: Record<Lang, Record<string, string[]>> = {
  en: {
    "row-level-security": ["row level security power bi", "power bi rls"],
    "dax-measures": ["dax measures", "dax measures for retail"],
    "pricing-strategy": ["retail pricing strategy", "retail pricing"],
    "pim-vs-plm": ["pim vs plm", "what is plm"],
    "abc-xyz": ["abc analysis", "abc xyz analysis"],
    "range-planning": ["range planning", "range plan fashion"],
    "price-architecture": ["price architecture", "good better best pricing"],
    "product-attributes": ["product attributes", "product attribute management"],
    "sell-in-sell-through": ["sell in vs sell through", "sell in sell through sell out"],
    "markdown-strategy": ["markdown strategy retail", "markdown pricing"],
    "assortment-process": ["assortment planning process", "what is assortment planning"],
    "size-curve": ["size curve", "size curve analysis"],
    "analyst-roles": ["retail analyst", "brand analyst vs business analyst"],
    "merchandise-planner-career": ["merchandise planner", "how to become a merchandise planner"],
  },
  pl: {
    "sell-through-rate": ["sell through", "wskaźnik sell through"],
    "open-to-buy": ["open to buy", "budżet zakupowy"],
    "row-level-security": ["rls power bi", "zabezpieczenia na poziomie wierszy power bi"],
    "dax-measures": ["dax power bi", "miary dax"],
    "pricing-strategy": ["strategie cenowe", "polityka cenowa"],
    "pim-vs-plm": ["system pim", "system plm"],
    "retail-kpis": ["wskaźniki sprzedaży", "kpi w handlu"],
    "price-architecture": ["architektura cenowa", "strategia cenowa good better best"],
    "product-attributes": ["atrybuty produktu", "karta produktu atrybuty"],
    "sell-in-sell-through": ["sell in sell out", "sell in sell through"],
    "category-management": ["category management", "zarządzanie kategorią"],
    "sales-forecasting": ["prognozowanie sprzedaży", "prognoza sprzedaży excel"],
    "size-curve": ["rozmiarówka", "krzywa rozmiarów"],
    "become-retail-analyst": ["jak zostać analitykiem danych", "kupiec kto to"],
  },
  ru: {
    "sell-through-rate": ["sell through", "процент реализации товара"],
    "open-to-buy": ["open to buy", "бюджет закупок"],
    "row-level-security": ["rls power bi", "безопасность на уровне строк power bi"],
    "dax-measures": ["dax функции", "меры dax power bi"],
    "dashboard-examples": ["дашборд в power bi", "дашборд продаж"],
    "pim-vs-plm": ["pim система", "plm система"],
    "retail-kpis": ["kpi в розничной торговле", "показатели эффективности магазина"],
    "price-architecture": ["ценовой сегмент", "ценовая линейка"],
    "product-attributes": ["атрибуты товара", "характеристики товара для маркетплейса"],
    "sell-in-sell-through": ["sell in sell out", "sell in и sell out разница"],
    "assortment-matrix": ["ассортиментная матрица", "ассортиментная матрица магазина одежды"],
    "size-curve": ["размерная линейка", "размерная сетка закупка"],
    "buyer-and-category-manager": ["категорийный менеджер", "кто такой байер"],
  },
};

const d = today();
// RegExp constructor: the tsconfig target does not accept the /u flag in a literal.
const NON_WORD = new RegExp("[^\\p{L}\\p{N}]+", "gu");
const slugify = (s: string) => s.replace(NON_WORD, "-").replace(/^-|-$/g, "").toLowerCase();
const serpCache = (lang: Lang, key: string, q: string) => `article_serp-${lang}-${key}-${slugify(q)}`;
const suggCache = (lang: Lang, key: string) => `article_suggestions-${lang}-${key}`;

async function run(lang: Lang) {
  const m = PRIMARY[lang];
  let cost = 0;
  for (const [key, queries] of Object.entries(TARGETS[lang])) {
    for (const keyword of queries) {
      const r = await call("/v3/serp/google/organic/live/advanced", {
        cache: serpCache(lang, key, keyword),
        body: [{ keyword, location_code: m.code, language_code: m.language, depth: 10, people_also_ask_click_depth: 1 }],
        estimate: SERP_REQ,
      });
      cost += r.cost ?? 0;
    }
    const r = await call("/v3/dataforseo_labs/google/keyword_suggestions/live", {
      cache: suggCache(lang, key),
      body: [{ keyword: queries[0], location_code: m.code, language_code: m.language, include_seed_keyword: true, limit: 30, order_by: ["keyword_info.search_volume,desc"] }],
      estimate: LABS,
    });
    cost += r.cost ?? 0;
    console.log(`${lang} ${key}: done`);
  }
  console.log(`${lang}: cost ${cost.toFixed(4)}, total spent $${totalSpent().toFixed(4)}`);
}

type SerpItem = {
  type: string;
  rank_group?: number;
  title?: string;
  url?: string;
  domain?: string;
  description?: string;
  items?: { type?: string; title?: string; seed_question?: string; expanded_element?: { description?: string }[] }[] | string[];
};

function brief(lang: Lang) {
  const dir = path.join(ROOT, "research", "articles", lang);
  mkdirSync(dir, { recursive: true });
  for (const [key, queries] of Object.entries(TARGETS[lang])) {
    const out: string[] = [`# ${key} (${lang}, ${PRIMARY[lang].name}) — DataForSEO ${d}`, ""];
    for (const q of queries) {
      const res = readCache<{ items: SerpItem[] }>(serpCache(lang, key, q));
      const items = res?.tasks?.[0]?.result?.[0]?.items ?? [];
      out.push(`## SERP: ${q}`, "");
      for (const it of items.filter((i) => i.type === "organic").slice(0, 10)) {
        out.push(`${it.rank_group}. ${it.title} — ${it.domain}`);
        if (it.description) out.push(`   ${it.description.slice(0, 220)}`);
      }
      const paa = items.filter((i) => i.type === "people_also_ask").flatMap((i) => (i.items as { title?: string }[] | undefined) ?? []);
      if (paa.length) out.push("", "People also ask:", ...paa.map((p) => `- ${p.title}`));
      const related = items.filter((i) => i.type === "related_searches").flatMap((i) => (i.items as string[] | undefined) ?? []);
      if (related.length) out.push("", "Related searches:", ...related.map((r) => `- ${r}`));
      const other = Array.from(new Set(items.map((i) => i.type).filter((t) => !["organic", "people_also_ask", "related_searches"].includes(t))));
      if (other.length) out.push("", `Other SERP features: ${other.join(", ")}`);
      out.push("");
    }
    const sug = readCache<{ items: { keyword: string; keyword_info?: { search_volume?: number } }[] }>(suggCache(lang, key));
    const rows = sug?.tasks?.[0]?.result?.[0]?.items ?? [];
    if (rows.length) {
      out.push("## Keyword suggestions (volume)", "");
      for (const r of rows) out.push(`- ${r.keyword} — ${r.keyword_info?.search_volume ?? "n/a"}`);
    }
    writeFileSync(path.join(dir, `${key}.md`), out.join("\n") + "\n");
  }
  console.log(`briefs written to research/articles/${lang}`);
}

function estimate() {
  let total = 0;
  for (const lang of Object.keys(TARGETS) as Lang[]) {
    const t = TARGETS[lang];
    const n = Object.values(t).reduce((s, q) => s + q.length, 0);
    const c = n * SERP_REQ + Object.keys(t).length * LABS;
    total += c;
    console.log(`${lang}: ${Object.keys(t).length} articles, ${n} SERPs, ~$${c.toFixed(3)}`);
  }
  console.log(`total ~$${total.toFixed(2)}; spent so far $${totalSpent().toFixed(4)}`);
}

async function main() {
  const [step, lang] = process.argv.slice(2);
  if (step === "estimate") return estimate();
  if (!isLang(lang)) throw new Error("language must be en, pl or ru");
  if (step === "run") return run(lang);
  if (step === "brief") return brief(lang);
  throw new Error(`unknown step ${step}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
