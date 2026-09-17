/**
 * Offline steps over the cached responses (no requests).
 *
 *   npx tsx scripts/dataforseo/build.ts candidates <lang>   research/keywords/candidates-<lang>.txt (for Ads volumes)
 *   npx tsx scripts/dataforseo/build.ts needs-metrics <lang> research/keywords/needs-metrics-<lang>.txt
 *   npx tsx scripts/dataforseo/build.ts serp-list <lang>    research/keywords/serp-<lang>.txt
 *   npx tsx scripts/dataforseo/build.ts csv <lang>          research/keywords/<lang>.csv + serp-summary-<lang>.md
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { csvCell, RAW_DIR, readLines, RESEARCH_DIR } from "./client";
import { BROAD, classify, EXTRA_CANDIDATES, type Rule } from "./clusters";
import { isLang, PRIMARY, type Lang } from "./markets";
import { buildPool, norm, type Row } from "./pool";
import { localizeTarget } from "./slugs";

type Classified = Row & { rule: Rule; priority: "P1" | "P2" | "P3" };

const file = (name: string) => path.join(RESEARCH_DIR, name);
const variantKey = (k: string) => k.replace(/[-–]/g, " ").replace(/\s+/g, " ").trim();

function seedsAndExtras(lang: Lang): Set<string> {
  const batches = [2, 3]
    .map((n) => file(`candidates${n}-${lang}.txt`))
    .filter((f) => existsSync(f))
    .flatMap((f) => readLines(f));
  return new Set([...readLines(file(`seeds-${lang}.txt`)), ...EXTRA_CANDIDATES[lang], ...batches].map(norm));
}

function maxExtra(r: Row): number {
  return Math.max(0, ...Object.values(r.volumeExtra).map((v) => v ?? 0));
}

const BUSINESS = /^\/(pl|ru)?$|\/services|\/free-templates|\/contact|\/about/;
const GENERIC_PRICING = /strateg|polityk|ustalan|ценообраз|ценов|pricing/;
const RETAIL_WORD = /retail|store|shop|fashion|handl|sklep|mod|магазин|рознич|ритейл|одежд/;

function priority(lang: Lang, r: Row, rule: Rule): Classified["priority"] {
  const vol = r.volume ?? 0;
  const extra = maxExtra(r);
  // US volumes are larger, so they count with a smaller weight than the UK.
  const signal = lang === "en" ? Math.max(vol, extra / 10) : Math.max(vol, extra);
  const business = BUSINESS.test(rule.target);
  let p: Classified["priority"] =
    (business && signal >= 20) || (!business && signal >= 50) ? "P1" : signal >= 10 ? "P2" : "P3";
  if (rule.cluster.includes("pric") || rule.cluster.includes("cen")) {
    if (GENERIC_PRICING.test(r.keyword) && !RETAIL_WORD.test(r.keyword) && p === "P1") p = "P2";
  }
  if (BROAD[lang].test(r.keyword)) p = "P3";
  if (rule.cluster === "brand-name") p = "P1";
  return p;
}

function classified(lang: Lang, onlyKnown = true): Classified[] {
  const pool = buildPool(lang, PRIMARY[lang].code);
  const hand = seedsAndExtras(lang);
  const byVariant = new Map<string, Classified>();
  for (const r of Array.from(pool.values())) {
    const rule = classify(lang, r.keyword);
    if (!rule) continue;
    const hasVolume = (r.volume ?? 0) > 0 || maxExtra(r) > 0;
    if (onlyKnown && !hasVolume && !hand.has(r.keyword)) continue;
    const c: Classified = { ...r, rule, priority: priority(lang, r, rule) };
    const key = variantKey(r.keyword);
    const prev = byVariant.get(key);
    // Keep the variant with Ads data / higher volume; prefer the spelling without hyphens.
    if (!prev || (c.volume ?? -1) > (prev.volume ?? -1) || ((c.volume ?? -1) === (prev.volume ?? -1) && !c.keyword.includes("-") && prev.keyword.includes("-"))) {
      byVariant.set(key, c);
    }
  }
  return Array.from(byVariant.values()).sort(
    (a, b) => a.priority.localeCompare(b.priority) || (b.volume ?? -1) - (a.volume ?? -1) || maxExtra(b) - maxExtra(a),
  );
}

function candidates(lang: Lang) {
  const pool = buildPool(lang, PRIMARY[lang].code);
  const out = new Set<string>();
  for (const r of Array.from(pool.values())) if (classify(lang, r.keyword)) out.add(r.keyword);
  for (const k of Array.from(seedsAndExtras(lang))) out.add(k);
  const list = Array.from(out);
  writeFileSync(file(`candidates-${lang}.txt`), list.join("\n") + "\n");
  console.log(`candidates ${lang}: ${list.length}`);
}

function needsMetrics(lang: Lang) {
  const list = classified(lang)
    .filter((r) => r.kd === null || r.intent === null)
    .map((r) => r.keyword);
  writeFileSync(file(`needs-metrics-${lang}.txt`), list.join("\n") + (list.length ? "\n" : ""));
  console.log(`needs-metrics ${lang}: ${list.length}`);
}

function serpList(lang: Lang, max = 40) {
  const rows = classified(lang).filter((r) => (r.volume ?? 0) > 0 || maxExtra(r) > 0 || r.rule.cluster === "brand-name");
  const byCluster = new Map<string, Classified[]>();
  for (const r of rows) byCluster.set(r.rule.cluster, [...(byCluster.get(r.rule.cluster) ?? []), r]);
  const pick: string[] = [];
  const score = (r: Row) => Math.max(r.volume ?? 0, maxExtra(r) / (lang === "en" ? 10 : 1));
  // Two strongest keywords per cluster, then the rest by volume.
  for (const list of Array.from(byCluster.values())) {
    for (const r of list.sort((a, b) => score(b) - score(a)).slice(0, 2)) pick.push(r.keyword);
  }
  for (const r of rows.sort((a, b) => score(b) - score(a))) {
    if (pick.length >= max) break;
    if (!pick.includes(r.keyword)) pick.push(r.keyword);
  }
  const list = pick.slice(0, max);
  writeFileSync(file(`serp-${lang}.txt`), list.join("\n") + "\n");
  console.log(`serp list ${lang}: ${list.length}`);
}

type SerpItem = {
  type: string;
  rank_absolute?: number;
  domain?: string;
  title?: string;
  items?: { type?: string; title?: string }[];
  references?: { domain?: string }[] | null;
};
type SerpSummary = { keyword: string; domains: string[]; features: string[]; paa: string[]; aio: string[] };

function serpSummaries(prefix: string): Map<string, SerpSummary> {
  const out = new Map<string, SerpSummary>();
  const files = readdirSync(RAW_DIR).filter((f) => f.startsWith(prefix));
  for (const f of files) {
    const json = JSON.parse(readFileSync(path.join(RAW_DIR, f), "utf8"));
    const res = json.tasks?.[0]?.result?.[0];
    if (!res) continue;
    const items: SerpItem[] = res.items ?? [];
    const domains = items.filter((i) => i.type === "organic").map((i) => (i.domain ?? "").replace(/^www\./, ""));
    const features = Array.from(new Set(items.map((i) => i.type).filter((t) => t !== "organic")));
    const paa = items
      .filter((i) => i.type === "people_also_ask")
      .flatMap((i) => (i.items ?? []).map((q) => q.title ?? ""))
      .filter(Boolean);
    const aio = Array.from(
      new Set(
        items
          .filter((i) => i.type === "ai_overview")
          .flatMap((i) => (i.references ?? []).map((r) => (r.domain ?? "").replace(/^www\./, "")))
          .filter(Boolean),
      ),
    );
    out.set(norm(res.keyword), { keyword: norm(res.keyword), domains, features, paa, aio });
  }
  return out;
}

function writeSerpSummary(name: string, title: string, serp: Map<string, SerpSummary>) {
  const md: string[] = [`# SERP summary · ${title}`, ""];
  const domainCount = new Map<string, number>();
  const featureCount = new Map<string, number>();
  const aioCount = new Map<string, number>();
  for (const s of Array.from(serp.values())) {
    for (const d of Array.from(new Set(s.domains))) domainCount.set(d, (domainCount.get(d) ?? 0) + 1);
    for (const f of s.features) featureCount.set(f, (featureCount.get(f) ?? 0) + 1);
    for (const a of s.aio) aioCount.set(a, (aioCount.get(a) ?? 0) + 1);
  }
  md.push(`Checked keywords: ${serp.size}`, "", "## Domains in top-10 (number of SERPs)", "");
  for (const [d, n] of Array.from(domainCount).sort((a, b) => b[1] - a[1]).slice(0, 40)) md.push(`- ${d} — ${n}`);
  md.push("", "## SERP features (number of SERPs)", "");
  for (const [f, n] of Array.from(featureCount).sort((a, b) => b[1] - a[1])) md.push(`- ${f} — ${n}`);
  md.push("", "## Sources cited in AI Overviews (number of SERPs)", "");
  for (const [a, n] of Array.from(aioCount).sort((x, y) => y[1] - x[1]).slice(0, 30)) md.push(`- ${a} — ${n}`);
  md.push("", "## Per keyword", "");
  for (const s of Array.from(serp.values())) {
    md.push(`### ${s.keyword}`, "", `- top-5: ${s.domains.slice(0, 5).join(", ") || "—"}`, `- features: ${s.features.join(", ") || "—"}`);
    if (s.aio.length) md.push(`- AI Overview sources: ${s.aio.join(", ")}`);
    if (s.paa.length) md.push(`- PAA: ${s.paa.join(" | ")}`);
    md.push("");
  }
  writeFileSync(file(name), md.join("\n"));
}

/** Russian-language SERPs in Poland and Germany (run.ts serp-alt ru). */
function serpAltSummary(lang: Lang) {
  for (const [t, name] of [["pl-ru", "Poland, ru"], ["de-ru", "Germany, ru"]]) {
    const serp = serpSummaries(`serpalt_organic-${lang}-${t}-`);
    writeSerpSummary(`serp-summary-${lang}-${t.split("-")[0]}.md`, `${lang.toUpperCase()} · ${name}`, serp);
    console.log(`serp summary ${t}: ${serp.size}`);
  }
}

function csv(lang: Lang) {
  const serp = serpSummaries(`serp_organic-${lang}-`);
  const rows = classified(lang);
  const header = "keyword,lang,location,volume,cpc,competition,kd,intent,cluster,target_page,priority,serp_notes";
  const lines = rows.map((r) => {
    const s = serp.get(r.keyword);
    const extras = Object.entries(r.volumeExtra)
      .filter(([, v]) => v !== null)
      .map(([k, v]) => `${k.toUpperCase()} ${v}`)
      .join("; ");
    const location = PRIMARY[lang].name + (extras ? ` (${extras})` : "");
    const broad = BROAD[lang].test(r.keyword) ? "broad or ambiguous term; " : "";
    const notes = broad + (s
      ? `top: ${s.domains.slice(0, 5).join(" ")}; features: ${s.features.join(" ") || "none"}${s.paa.length ? `; PAA: ${s.paa.slice(0, 3).join(" | ")}` : ""}`
      : "");
    return [
      r.keyword,
      lang,
      location,
      r.volume ?? "",
      r.cpc ?? "",
      r.competition === null ? "" : Math.round(r.competition * 100) / 100,
      r.kd ?? "",
      r.intent ?? "",
      r.rule.cluster,
      localizeTarget(lang, r.rule.target),
      r.priority,
      notes,
    ]
      .map(csvCell)
      .join(",");
  });
  // BOM so Excel opens Polish and Cyrillic text correctly.
  writeFileSync(file(`${lang}.csv`), String.fromCharCode(0xfeff) + [header, ...lines].join("\n") + "\n");

  writeSerpSummary(`serp-summary-${lang}.md`, `${lang.toUpperCase()} · ${PRIMARY[lang].name}`, serp);
  console.log(`csv ${lang}: ${rows.length} rows (P1 ${rows.filter((r) => r.priority === "P1").length}), serp ${serp.size}`);
}

const [step, lang] = process.argv.slice(2);
if (!isLang(lang)) throw new Error("language must be en, pl or ru");
const steps: Record<string, (l: Lang) => void> = {
  candidates,
  "needs-metrics": needsMetrics,
  "serp-list": serpList,
  csv,
  "serp-alt-summary": serpAltSummary,
};
if (!steps[step]) throw new Error(`unknown step ${step}`);
if (step !== "candidates" && !existsSync(file(`seeds-${lang}.txt`))) throw new Error("seeds missing");
steps[step](lang);
