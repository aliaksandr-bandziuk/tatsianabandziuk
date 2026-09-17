/**
 * Debug helper: prints the merged pool for a language as TSV (sorted by volume).
 *   npx tsx scripts/dataforseo/dump.ts en > pool-en.tsv
 */
import { PRIMARY, isLang } from "./markets";
import { buildPool } from "./pool";

const lang = process.argv[2];
if (!isLang(lang)) throw new Error("language must be en, pl or ru");
const rows = Array.from(buildPool(lang, PRIMARY[lang].code).values()).sort(
  (a, b) => (b.volume ?? -1) - (a.volume ?? -1) || a.keyword.localeCompare(b.keyword),
);
console.log("keyword\tvol\textra\tcpc\tkd\tintent\tsrc");
for (const r of rows) {
  const extra = Object.entries(r.volumeExtra).map(([k, v]) => `${k}:${v ?? ""}`).join(" ");
  const src = r.sources.map((s) => s.replace("keyword_", "").slice(0, 4)).join(",");
  console.log([r.keyword, r.volume ?? "", extra, r.cpc ?? "", r.kd ?? "", r.intent ?? "", src].join("\t"));
}
