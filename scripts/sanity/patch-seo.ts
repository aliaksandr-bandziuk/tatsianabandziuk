/**
 * Copies SEO titles and descriptions from the typed content modules to Sanity.
 *
 *   npx tsx scripts/sanity/patch-seo.ts                      # show the diff, write nothing
 *   npx tsx scripts/sanity/patch-seo.ts --apply              # write it
 *   npx tsx scripts/sanity/patch-seo.ts --only=post --apply
 *   npx tsx scripts/sanity/patch-seo.ts --keys=sell-through-rate,dax-measures --apply
 *   npx tsx scripts/sanity/patch-seo.ts --lang=ru,pl
 *
 * Unlike seed.ts this touches two fields only (`seo.title`, `seo.description`)
 * with a patch, so everything else the owner edited in Studio stays as it is.
 * A document that does not exist, or whose text already matches, is skipped.
 *
 * Back up before writing: npx tsx scripts/sanity/backup.ts
 */
import { writeClient } from "./env";
import { en } from "../../src/content/fallback/en";
import { pl } from "../../src/content/fallback/pl";
import { ru } from "../../src/content/fallback/ru";
import type { Locale, Seo, SiteContent } from "../../src/content/types";

type Kind = "service" | "caseStudy" | "post" | "category" | "calculatorPage";

const CONTENT: Record<Locale, SiteContent> = { en, pl, ru };
const LANGS: Locale[] = ["en", "pl", "ru"];

const LIST: Record<Kind, (c: SiteContent) => { key: string; seo: Seo }[]> = {
  service: (c) => c.services,
  caseStudy: (c) => c.caseStudies,
  post: (c) => c.posts,
  category: (c) => c.categories,
  calculatorPage: (c) => c.calculators,
};

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const value = (name: string) => {
  const a = args.find((x) => x.startsWith(`--${name}=`));
  return a ? new Set(a.slice(name.length + 3).split(",").filter(Boolean)) : null;
};
const ONLY = value("only");
const KEYS = value("keys");
const ONLY_LANG = value("lang");

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;

type Row = { id: string; kind: Kind; lang: Locale; key: string; field: "title" | "description"; from: string; to: string };

async function main() {
  const wanted: { id: string; kind: Kind; lang: Locale; key: string; seo: Seo }[] = [];
  for (const kind of Object.keys(LIST) as Kind[]) {
    if (ONLY && !ONLY.has(kind)) continue;
    for (const lang of LANGS) {
      if (ONLY_LANG && !ONLY_LANG.has(lang)) continue;
      for (const item of LIST[kind](CONTENT[lang])) {
        if (KEYS && !KEYS.has(item.key)) continue;
        wanted.push({ id: `${kind}-${item.key}.${lang}`, kind, lang, key: item.key, seo: item.seo });
      }
    }
  }

  const long = wanted.flatMap((w) => {
    const out: string[] = [];
    if (w.seo.title.length > TITLE_MAX) out.push(`${w.id}: title ${w.seo.title.length} characters`);
    if (w.seo.description.length > DESCRIPTION_MAX) out.push(`${w.id}: description ${w.seo.description.length} characters`);
    return out;
  });
  if (long.length) {
    console.error("Too long for a snippet, fix the content first:");
    long.forEach((l) => console.error("  " + l));
    process.exit(1);
  }

  const ids = wanted.map((w) => w.id);
  const existing = await writeClient.fetch<{ _id: string; seo?: { title?: string; description?: string } }[]>(
    `*[_id in $ids]{_id, seo}`,
    { ids },
  );
  const bySanityId = new Map(existing.map((d) => [d._id, d.seo ?? {}]));

  const rows: Row[] = [];
  const missing: string[] = [];
  for (const w of wanted) {
    const current = bySanityId.get(w.id);
    if (!current) {
      missing.push(w.id);
      continue;
    }
    if ((current.title ?? "") !== w.seo.title) {
      rows.push({ ...w, field: "title", from: current.title ?? "—", to: w.seo.title });
    }
    if ((current.description ?? "") !== w.seo.description) {
      rows.push({ ...w, field: "description", from: current.description ?? "—", to: w.seo.description });
    }
  }

  if (missing.length) {
    console.log(`Not in Sanity (skipped): ${missing.length}`);
    missing.slice(0, 10).forEach((m) => console.log("  " + m));
    if (missing.length > 10) console.log(`  … and ${missing.length - 10} more`);
    console.log("");
  }

  if (!rows.length) {
    console.log("Sanity already matches the content modules. Nothing to write.");
    return;
  }

  const docs = [...new Set(rows.map((r) => r.id))];
  console.log(`${rows.length} field(s) differ in ${docs.length} document(s):\n`);
  for (const id of docs) {
    console.log(id);
    for (const r of rows.filter((x) => x.id === id)) {
      console.log(`  ${r.field}`);
      console.log(`    was: ${r.from}`);
      console.log(`    now: ${r.to}`);
    }
    console.log("");
  }

  if (!APPLY) {
    console.log("Dry run. Add --apply to write these to Sanity.");
    return;
  }

  let written = 0;
  for (const id of docs) {
    const w = wanted.find((x) => x.id === id)!;
    await writeClient
      .patch(id)
      .set({ "seo.title": w.seo.title, "seo.description": w.seo.description })
      .commit({ autoGenerateArrayKeys: false });
    written += 1;
    console.log(`written: ${id}`);
  }
  console.log(`\nDone: ${written} document(s). The publish webhook refreshes the cache; if it is not set up yet, redeploy or wait for the daily revalidation.`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
