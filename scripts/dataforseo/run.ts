/**
 * Keyword research steps. Every step is cached, so re-running is free.
 *
 *   npx tsx scripts/dataforseo/run.ts estimate            print the cost plan, no requests
 *   npx tsx scripts/dataforseo/run.ts test en             one small paid request
 *   npx tsx scripts/dataforseo/run.ts expand <lang>       Labs ideas + suggestions + related (+ Ads ideas for pl/ru)
 *   npx tsx scripts/dataforseo/run.ts volume <lang>       Google Ads volumes for research/keywords/candidates-<lang>.txt
 *   npx tsx scripts/dataforseo/run.ts volume2 <lang>      second volume batch for research/keywords/candidates2-<lang>.txt
 *   npx tsx scripts/dataforseo/run.ts volume3 <lang>      third batch (careers, calculators): candidates3-<lang>.txt
 *   npx tsx scripts/dataforseo/run.ts serp-alt ru         top-10 in Poland/ru and Germany/ru for serp-ru.txt
 *   npx tsx scripts/dataforseo/run.ts metrics <lang>     difficulty + intent for candidates without Labs data
 *   npx tsx scripts/dataforseo/run.ts serp <lang>         top-10 for research/keywords/serp-<lang>.txt
 */
import path from "node:path";
import { existsSync } from "node:fs";
import { call, chunk, readLines, RESEARCH_DIR, today, totalSpent } from "./client";
import { EXTRA, isLang, LANGS, PRIMARY, tag, type Lang, type Market } from "./markets";

const LABS_REQ = 0.012;
const LABS_ROW = 0.00012;
const ADS_REQ = 0.09;
const SERP_REQ = 0.002;

const SUGGESTION_LIMIT = 50;
const RELATED_SEEDS = 15;
const RELATED_LIMIT = 40;
const IDEAS_LIMIT = 700;

const seeds = (lang: Lang) => readLines(path.join(RESEARCH_DIR, `seeds-${lang}.txt`));
const d = today();

const labsTask = (m: Market, extra: Record<string, unknown>) => [
  { location_code: m.code, language_code: m.language, include_seed_keyword: true, ...extra },
];

async function pool<T>(items: T[], size: number, fn: (item: T, i: number) => Promise<void>) {
  let next = 0;
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (next < items.length) {
        const i = next++;
        await fn(items[i], i);
      }
    }),
  );
}

function plan(lang: Lang) {
  const s = seeds(lang).length;
  const extraLabs = lang === "en" ? EXTRA.en.length : 0;
  const rows = {
    ideas: (1 + extraLabs) * (LABS_REQ + IDEAS_LIMIT * LABS_ROW),
    suggestions: s * (LABS_REQ + SUGGESTION_LIMIT * LABS_ROW),
    related: Math.min(RELATED_SEEDS, s) * (LABS_REQ + RELATED_LIMIT * LABS_ROW),
    adsIdeas: lang === "en" ? 0 : Math.ceil(s / 20) * ADS_REQ,
    volume: (1 + EXTRA[lang].length) * ADS_REQ,
    // difficulty + intent for up to 400 keywords that came from Ads without Labs metrics
    metrics: 2 * (LABS_REQ + 400 * LABS_ROW),
    serp: 40 * SERP_REQ,
  };
  return { seeds: s, rows, total: Object.values(rows).reduce((a, b) => a + b, 0) };
}

function estimate() {
  let grand = 0;
  for (const lang of LANGS) {
    const p = plan(lang);
    grand += p.total;
    console.log(`\n${lang.toUpperCase()} (${p.seeds} seeds), upper bound:`);
    for (const [k, v] of Object.entries(p.rows)) console.log(`  ${k.padEnd(12)} $${v.toFixed(3)}`);
    console.log(`  ${"total".padEnd(12)} $${p.total.toFixed(3)}`);
  }
  console.log(`\nALL LANGUAGES upper bound: $${grand.toFixed(2)}, spent so far: $${totalSpent().toFixed(4)}`);
}

async function test() {
  const m = PRIMARY.en;
  const r = await call<{ items_count: number; items: { keyword: string; keyword_info: { search_volume: number } }[] }>(
    "/v3/dataforseo_labs/google/keyword_suggestions/live",
    {
      cache: `test-keyword_suggestions-en-${d}`,
      body: labsTask(m, { keyword: "open to buy", limit: 10 }),
      estimate: LABS_REQ + 10 * LABS_ROW,
    },
  );
  const t = r.tasks[0];
  console.log("status", t.status_code, "cost", r.cost);
  for (const it of t.result?.[0]?.items ?? []) console.log(" ", it.keyword, it.keyword_info?.search_volume);
}

async function expand(lang: Lang) {
  const list = seeds(lang);
  const labsMarkets = lang === "en" ? [PRIMARY.en, ...EXTRA.en] : [PRIMARY[lang]];

  for (const m of labsMarkets) {
    const r = await call("/v3/dataforseo_labs/google/keyword_ideas/live", {
      cache: `keyword_ideas-${lang}-${tag(m, lang)}-${d}`,
      body: labsTask(m, { keywords: list.slice(0, 200), limit: IDEAS_LIMIT, order_by: ["keyword_info.search_volume,desc"] }),
      estimate: LABS_REQ + IDEAS_LIMIT * LABS_ROW,
    });
    console.log(`ideas ${tag(m, lang)}: cost ${r.cost}`);
  }

  const m = PRIMARY[lang];
  let cost = 0;
  await pool(list, 3, async (keyword, i) => {
    const r = await call("/v3/dataforseo_labs/google/keyword_suggestions/live", {
      cache: `keyword_suggestions-${lang}-${d}-${String(i).padStart(2, "0")}`,
      body: labsTask(m, { keyword, limit: SUGGESTION_LIMIT, order_by: ["keyword_info.search_volume,desc"] }),
      estimate: LABS_REQ + SUGGESTION_LIMIT * LABS_ROW,
    });
    cost += r.cost;
  });
  console.log(`suggestions ${lang}: cost ${cost.toFixed(4)}`);

  cost = 0;
  await pool(list.slice(0, RELATED_SEEDS), 3, async (keyword, i) => {
    const r = await call("/v3/dataforseo_labs/google/related_keywords/live", {
      cache: `related_keywords-${lang}-${d}-${String(i).padStart(2, "0")}`,
      body: labsTask(m, { keyword, depth: 2, limit: RELATED_LIMIT }),
      estimate: LABS_REQ + RELATED_LIMIT * LABS_ROW,
    });
    cost += r.cost;
  });
  console.log(`related ${lang}: cost ${cost.toFixed(4)}`);

  if (lang !== "en") {
    // Labs data is thin for PL and RU markets, so Google Ads ideas are added.
    const groups = chunk(list.map(adsSafe).filter(Boolean) as string[], 20);
    for (let i = 0; i < groups.length; i++) {
      const keywords = groups[i];
      const r = await call("/v3/keywords_data/google_ads/keywords_for_keywords/live", {
        cache: `ads_keywords_for_keywords-${lang}-${d}-${i}`,
        body: [{ keywords, location_code: m.code, language_code: m.language, sort_by: "search_volume" }],
        estimate: ADS_REQ,
      });
      console.log(`ads ideas ${lang} #${i}: cost ${r.cost}`);
    }
  }
}

/** Google Ads rejects long phrases and some characters. */
function adsSafe(k: string): string | null {
  const clean = k.toLowerCase().replace(/[^a-z0-9ąćęłńóśźżа-яёәғқңөұүһі\s\-']/g, " ").replace(/\s+/g, " ").trim();
  return clean && clean.length <= 80 && clean.split(" ").length <= 10 ? clean : null;
}

function candidates(lang: Lang): string[] {
  const file = path.join(RESEARCH_DIR, `candidates-${lang}.txt`);
  if (!existsSync(file)) throw new Error(`${file} not found: run "npx tsx scripts/dataforseo/build.ts candidates ${lang}" first`);
  return Array.from(new Set(readLines(file).map(adsSafe).filter(Boolean) as string[]));
}

async function volume(lang: Lang) {
  const list = candidates(lang);
  for (const m of [PRIMARY[lang], ...EXTRA[lang]]) {
    const parts = chunk(list, 1000);
    for (let i = 0; i < parts.length; i++) {
      const keywords = parts[i];
      const r = await call("/v3/keywords_data/google_ads/search_volume/live", {
        cache: `ads_search_volume-${lang}-${tag(m, lang)}-${d}-${i}`,
        body: [{ keywords, location_code: m.code, language_code: m.language }],
        estimate: ADS_REQ,
      });
      console.log(`volume ${tag(m, lang)} #${i} (${keywords.length} kw): cost ${r.cost}`);
    }
  }
}

/** Second, smaller volume batch: primary market plus one volume signal (US for en, Ukraine/ru for ru). */
async function volumeBatch(lang: Lang, batch: number) {
  const file = path.join(RESEARCH_DIR, `candidates${batch}-${lang}.txt`);
  const keywords = Array.from(new Set(readLines(file).map(adsSafe).filter(Boolean) as string[]));
  const signal = lang === "en" ? EXTRA.en : lang === "ru" ? EXTRA.ru.filter((m) => m.code === 2804) : [];
  for (const m of [PRIMARY[lang], ...signal]) {
    const r = await call("/v3/keywords_data/google_ads/search_volume/live", {
      cache: `ads_search_volume-${lang}-${tag(m, lang)}-${d}-batch${batch}`,
      body: [{ keywords, location_code: m.code, language_code: m.language }],
      estimate: ADS_REQ,
    });
    console.log(`volume batch ${batch} ${tag(m, lang)} (${keywords.length} kw): cost ${r.cost}`);
  }
}

/** Russian-language SERPs in the extra markets (Poland, Germany) for the same keyword list. */
async function serpAlt(lang: Lang) {
  const list = readLines(path.join(RESEARCH_DIR, `serp-${lang}.txt`));
  for (const m of EXTRA[lang].filter((x) => x.code !== 2804 && x.code !== 2840)) {
    let cost = 0;
    await pool(list, 4, async (keyword, i) => {
      const r = await call("/v3/serp/google/organic/live/advanced", {
        cache: `serpalt_organic-${lang}-${tag(m, lang)}-${d}-${String(i).padStart(2, "0")}`,
        body: [{ keyword, location_code: m.code, language_code: m.language, depth: 10, people_also_ask_click_depth: 1 }],
        estimate: SERP_REQ * 2,
      });
      cost += r.cost;
    });
    console.log(`serp ${tag(m, lang)} (${list.length}): cost ${cost.toFixed(4)}`);
  }
}

async function metrics(lang: Lang) {
  const file = path.join(RESEARCH_DIR, `needs-metrics-${lang}.txt`);
  if (!existsSync(file)) throw new Error(`${file} not found: run build.ts first`);
  const list = readLines(file);
  if (!list.length) return console.log("nothing to fetch");
  const m = PRIMARY[lang];
  const parts = chunk(list, 1000);
  for (let i = 0; i < parts.length; i++) {
    const keywords = parts[i];
    const kd = await call("/v3/dataforseo_labs/google/bulk_keyword_difficulty/live", {
      cache: `bulk_keyword_difficulty-${lang}-${d}-${i}`,
      body: [{ keywords, location_code: m.code, language_code: m.language }],
      estimate: LABS_REQ + keywords.length * LABS_ROW,
    });
    const intent = await call("/v3/dataforseo_labs/google/search_intent/live", {
      cache: `search_intent-${lang}-${d}-${i}`,
      body: [{ keywords, language_code: m.language }],
      estimate: LABS_REQ + keywords.length * LABS_ROW,
    });
    console.log(`metrics ${lang} #${i} (${keywords.length} kw): kd ${kd.cost}, intent ${intent.cost}`);
  }
}

async function serp(lang: Lang) {
  const list = readLines(path.join(RESEARCH_DIR, `serp-${lang}.txt`));
  const m = PRIMARY[lang];
  let cost = 0;
  await pool(list, 4, async (keyword, i) => {
    const r = await call("/v3/serp/google/organic/live/advanced", {
      cache: `serp_organic-${lang}-${d}-${String(i).padStart(2, "0")}`,
      body: [{ keyword, location_code: m.code, language_code: m.language, depth: 10, people_also_ask_click_depth: 1 }],
      estimate: SERP_REQ * 2,
    });
    cost += r.cost;
  });
  console.log(`serp ${lang} (${list.length}): cost ${cost.toFixed(4)}`);
}

async function main() {
  const [step, langArg] = process.argv.slice(2);
  if (step === "estimate") return estimate();
  if (step === "test") return test();
  if (!isLang(langArg)) throw new Error("language must be en, pl or ru");
  const steps: Record<string, (l: Lang) => Promise<void>> = {
    expand,
    volume,
    volume2: (l) => volumeBatch(l, 2),
    volume3: (l) => volumeBatch(l, 3),
    metrics,
    serp,
    "serp-alt": serpAlt,
  };
  if (!steps[step]) throw new Error(`unknown step ${step}`);
  await steps[step](langArg);
  console.log(`total spent: $${totalSpent().toFixed(4)}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
