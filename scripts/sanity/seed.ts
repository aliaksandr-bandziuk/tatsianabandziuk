/**
 * Writes the typed content from src/content/fallback/{en,pl,ru} to Sanity.
 *
 *   npx tsx scripts/sanity/seed.ts --dry-run          # build and check documents, write nothing
 *   npx tsx scripts/sanity/seed.ts                    # write everything
 *   npx tsx scripts/sanity/seed.ts --only=post,service
 *
 * - Deterministic ids: `service-assortment-planning.en`, `siteSettings.pl`, …
 *   and createOrReplace, so a second run replaces instead of duplicating.
 * - Language versions are linked through `translation.metadata` documents
 *   (the format of @sanity/document-internationalization).
 * - The conversion is driven by the Studio schema: every array item gets
 *   `_key` and `_type`, and any model field the schema does not know about is
 *   reported (the run stops before writing).
 * - Diploma images from public/images/credentials are uploaded once; assets
 *   are found again by their SHA-1, so reruns do not duplicate them.
 * - Before writing, back up the dataset: npx tsx scripts/sanity/backup.ts
 */
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { dataset, writeClient } from "./env";
import { schemaTypes, TRANSLATED_TYPES } from "../../src/sanity/schemaTypes";
import { en } from "../../src/content/fallback/en";
import { pl } from "../../src/content/fallback/pl";
import { ru } from "../../src/content/fallback/ru";
import type { Locale, SiteContent } from "../../src/content/types";
import { ARTICLE_BLOCK_TYPES } from "../../src/sanity/articleBlocks";

type Json = Record<string, unknown>;
type Def = { name?: string; type: string; fields?: Def[]; of?: Def[] };
type Doc = Json & { _id: string; _type: string };

const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const onlyArg = args.find((a) => a.startsWith("--only="));
const ONLY = onlyArg ? new Set(onlyArg.slice("--only=".length).split(",").filter(Boolean)) : null;
const BATCH = 10;

const CONTENT: Record<Locale, SiteContent> = { en, pl, ru };
const LANGS: Locale[] = ["en", "pl", "ru"];

const TYPES = new Map<string, Def>((schemaTypes as unknown as Def[]).map((t) => [t.name!, t]));
const problems: string[] = [];

/* ---------- images ---------- */

const imageRefs = new Map<string, string>();
let uploaded = 0;
let reused = 0;

async function imageAsset(publicPath: string): Promise<Json> {
  const file = path.join(process.cwd(), "public", publicPath);
  let ref = imageRefs.get(file);
  if (!ref) {
    const buf = readFileSync(file);
    const sha1 = createHash("sha1").update(buf).digest("hex");
    if (DRY) {
      ref = `image-${sha1}-dry-run`;
    } else {
      const existing = await writeClient.fetch<string | null>(`*[_type == "sanity.imageAsset" && sha1hash == $sha1][0]._id`, { sha1 });
      if (existing) {
        ref = existing;
        reused++;
      } else {
        const asset = await writeClient.assets.upload("image", buf, { filename: path.basename(file) });
        ref = asset._id;
        uploaded++;
      }
    }
    imageRefs.set(file, ref);
  }
  return { _type: "image", asset: { _type: "reference", _ref: ref } };
}

/* ---------- model → schema shape ---------- */

/** Model-specific reshaping that the schema cannot express one to one. */
function reshape(value: Json): Json {
  const out: Json = { ...value };
  // Article block: `type` → Sanity object type; calculator labels record → list.
  if (typeof out.type === "string" && ARTICLE_BLOCK_TYPES[out.type as keyof typeof ARTICLE_BLOCK_TYPES]) {
    out._type = ARTICLE_BLOCK_TYPES[out.type as keyof typeof ARTICLE_BLOCK_TYPES];
    delete out.type;
    if (out._type === "articleCalculator" && out.labels && !Array.isArray(out.labels)) {
      out.labels = Object.entries(out.labels as Record<string, string>).map(([id, label]) => ({ id, label }));
    }
  }
  return out;
}

let keySeq = 0;

async function convert(value: unknown, def: Def, where: string): Promise<unknown> {
  if (value === undefined || value === null) return undefined;
  const named = TYPES.get(def.type);

  switch (def.type) {
    case "string":
    case "text":
      if (typeof value === "number") return String(value);
      if (typeof value !== "string") problems.push(`${where}: expected text, got ${typeof value}`);
      return value;
    case "number":
    case "boolean":
      return value;
    case "image":
      if (typeof value !== "string") {
        problems.push(`${where}: image must be a /public path`);
        return undefined;
      }
      return imageAsset(value);
    case "array": {
      if (!Array.isArray(value)) {
        problems.push(`${where}: expected a list`);
        return undefined;
      }
      const members = def.of ?? [];
      const out: unknown[] = [];
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        if (item === null || typeof item !== "object") {
          const member = members.find((m) => m.type === "string" || m.type === "text");
          out.push(member ? await convert(item, member, `${where}[${i}]`) : item);
          continue;
        }
        const shaped = reshape(item as Json);
        const typeName = typeof shaped._type === "string" ? shaped._type : undefined;
        const member = typeName ? members.find((m) => (m.name ?? m.type) === typeName || m.type === typeName) : members.find((m) => m.type !== "string" && m.type !== "text");
        if (!member) {
          problems.push(`${where}[${i}]: no list member for ${typeName ?? "object"}`);
          continue;
        }
        const converted = (await convert(shaped, member, `${where}[${i}]`)) as Json;
        // Inline members are typed by their own name; named types set _type themselves.
        const _type = member.type === "object" ? member.name : converted._type;
        out.push({ _key: `k${(keySeq++).toString(36)}`, ...converted, _type });
      }
      return out;
    }
    case "object": {
      const fields = def.fields ?? [];
      const out: Json = {};
      for (const [k, v] of Object.entries(value as Json)) {
        if (k === "_type") continue;
        const field = fields.find((f) => f.name === k);
        if (!field) {
          if (v !== undefined) problems.push(`${where}.${k}: not in schema`);
          continue;
        }
        const c = await convert(v, field, `${where}.${k}`);
        if (c !== undefined) out[k] = c;
      }
      return out;
    }
    default:
      if (named) {
        const c = await convert(value, named, where);
        return c && typeof c === "object" && !Array.isArray(c) && named.type === "object" ? { _type: named.name, ...(c as Json) } : c;
      }
      problems.push(`${where}: unknown schema type ${def.type}`);
      return undefined;
  }
}

/* ---------- documents ---------- */

type Source = { type: string; base: string; lang: Locale; data: Json; order?: number; slug?: string };

function sources(lang: Locale): Source[] {
  const c = CONTENT[lang];
  const out: Source[] = [];
  const topics = Object.entries(c.ui.topics).map(([key, label]) => ({ key, label }));
  // Photos: model { src, alt, focus } → schema { file (image asset), alt }; focus stays in the fallback modules.
  const photo = (p?: { src: string; alt: string }) => (p ? { file: p.src, alt: p.alt } : undefined);
  const person = {
    ...c.person,
    photoPrimary: photo(c.person.photoPrimary),
    photoSecondary: photo(c.person.photoSecondary),
    photoWorkspace: photo(c.person.photoWorkspace),
  };
  out.push({
    type: "siteSettings",
    base: "siteSettings",
    lang,
    data: {
      ui: { ...c.ui, topics },
      person,
      formats: c.formats,
      tools: c.tools,
      recommendations: c.recommendations,
      notFound: c.notFound,
      thankYou: c.thankYou,
    },
  });
  out.push({ type: "homepage", base: "homepage", lang, data: c.home });
  const credentials = {
    ...c.about.credentials,
    items: c.about.credentials.items.map(({ width: _w, height: _h, ...rest }) => rest),
  };
  out.push({ type: "aboutPage", base: "aboutPage", lang, data: { ...c.about, credentials } });
  const listings: [string, SiteContent["servicesPage"]][] = [
    ["services", c.servicesPage],
    ["caseStudies", c.caseStudiesPage],
    ["blog", c.blogPage],
    ["calculators", c.calculatorsPage],
  ];
  for (const [key, page] of listings) out.push({ type: "listingPage", base: `listingPage-${key}`, lang, data: { key, ...page } });
  out.push({ type: "contactPage", base: "contactPage", lang, data: c.contact });
  out.push({ type: "coursesPage", base: "coursesPage", lang, data: c.courses });
  out.push({ type: "templatesPage", base: "templatesPage", lang, data: c.templates });
  const { slug: privacySlug, ...privacy } = c.privacy;
  out.push({ type: "legalPage", base: "legalPage-privacy", lang, data: { key: "privacy", ...privacy }, slug: privacySlug });

  const collections: [string, { key: string; slug: string }[]][] = [
    ["service", c.services],
    ["caseStudy", c.caseStudies],
    ["post", c.posts],
    ["category", c.categories],
    ["calculatorPage", c.calculators],
  ];
  for (const [type, items] of collections) {
    items.forEach((item, i) => {
      const { slug, ...data } = item as Json & { key: string; slug: string };
      out.push({ type, base: `${type}-${item.key}`, lang, data, order: i, slug });
    });
  }
  return out;
}

async function toDoc(s: Source): Promise<Doc> {
  const def = TYPES.get(s.type)!;
  const body = (await convert(s.data, { ...def, type: "object" }, `${s.base}.${s.lang}`)) as Json;
  const doc: Doc = { _id: `${s.base}.${s.lang}`, _type: s.type, language: s.lang, ...body };
  if (s.order !== undefined) doc.order = s.order;
  if (s.slug) doc.slug = { _type: "localizedSlug", [s.lang]: { _type: "slug", current: s.slug } };
  return doc;
}

function metadataDocs(docs: Doc[]): Doc[] {
  const byBase = new Map<string, Doc[]>();
  for (const d of docs) {
    const base = d._id.slice(0, d._id.lastIndexOf("."));
    byBase.set(base, [...(byBase.get(base) ?? []), d]);
  }
  const out: Doc[] = [];
  byBase.forEach((group, base) => {
    if (group.length < 2) return;
    out.push({
      _id: `translation-${base}`,
      _type: "translation.metadata",
      schemaTypes: [group[0]._type],
      translations: group.map((d) => ({
        _key: String(d.language),
        _type: "internationalizedArrayReferenceValue",
        value: { _type: "reference", _ref: d._id, _weak: true },
      })),
    });
  });
  return out;
}

async function main() {
  const all = LANGS.flatMap(sources).filter((s) => !ONLY || ONLY.has(s.type));
  if (ONLY) {
    const unknown = Array.from(ONLY).filter((t) => !TRANSLATED_TYPES.includes(t));
    if (unknown.length) throw new Error(`--only: unknown type(s) ${unknown.join(", ")}`);
  }
  const docs: Doc[] = [];
  for (const s of all) docs.push(await toDoc(s));

  const ids = new Set<string>();
  for (const d of docs) {
    if (ids.has(d._id)) problems.push(`duplicate id ${d._id}`);
    ids.add(d._id);
  }
  if (problems.length) {
    console.error(`${problems.length} problem(s), nothing written:`);
    problems.slice(0, 60).forEach((p) => console.error("  " + p));
    process.exit(1);
  }

  const meta = metadataDocs(docs);
  const writes = [...docs, ...meta];
  const counts = new Map<string, number>();
  for (const d of writes) counts.set(`${d._type}${d.language ? " " + d.language : ""}`, (counts.get(`${d._type}${d.language ? " " + d.language : ""}`) ?? 0) + 1);
  const size = Buffer.byteLength(JSON.stringify(writes));

  if (DRY) {
    mkdirSync("backups", { recursive: true });
    writeFileSync("backups/seed-dry-run.ndjson", writes.map((d) => JSON.stringify(d)).join("\n"));
    console.log(`DRY RUN (dataset "${dataset}"): ${writes.length} documents, ${(size / 1024).toFixed(0)} KB, ${imageRefs.size} image file(s)`);
  } else {
    for (let i = 0; i < writes.length; i += BATCH) {
      const tx = writeClient.transaction();
      writes.slice(i, i + BATCH).forEach((d) => tx.createOrReplace(d));
      await tx.commit({ visibility: "async" });
      process.stdout.write(`\rwritten ${Math.min(i + BATCH, writes.length)}/${writes.length}`);
    }
    console.log(`\nWROTE to dataset "${dataset}": ${writes.length} documents, images uploaded ${uploaded}, reused ${reused}`);
  }
  Array.from(counts.entries())
    .sort()
    .forEach(([k, n]) => console.log(`  ${k.padEnd(28)} ${n}`));
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
