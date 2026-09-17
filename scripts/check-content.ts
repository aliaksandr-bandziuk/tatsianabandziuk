/**
 * Content checks for src/content/fallback (task 02).
 *   npx tsx scripts/check-content.ts
 *
 * - seo.title ≤ 60, seo.description ≤ 155 on every page
 * - the misspelling "Бандзюк" never appears
 * - no empty headings (h1/h2/title fields), no empty FAQ answers
 * - article structure: h2 ids unique, calculator labels complete, full articles ≥ 800 words
 * - every service/case/post/category key has the same slug as the registry
 * Exit code 1 on any error. Warnings (placeholders) are listed but do not fail.
 */
import { en } from "../src/content/fallback/en";
import { pl } from "../src/content/fallback/pl";
import { ru } from "../src/content/fallback/ru";
import { CALCULATORS, CASE_SLUGS, CATEGORY_SLUGS, POSTS, SERVICE_SLUGS } from "../src/content/fallback/registry";
import { CALCULATOR_FIELDS } from "../src/content/calculators";
import type { AccentHeading, Locale, SiteContent } from "../src/content/types";

const errors: string[] = [];
const warnings: string[] = [];
const err = (m: string) => errors.push(m);
const warn = (m: string) => warnings.push(m);

const CONTENT: Record<Locale, SiteContent> = { en, pl, ru };
const MISSPELLING = /Бандзюк/i;
const PLACEHOLDER = /lorem ipsum|placeholder|tekst zastępczy|заглушк/i;


const accent = (h: AccentHeading) => [h.before, h.accent, h.after].filter(Boolean).join(" ").trim();
const words = (s: string) => s.split(/\s+/).filter(Boolean).length;

/** Walks every string in the content and applies the text rules. */
function walk(value: unknown, where: string, lang: Locale) {
  if (typeof value === "string") {
    if (MISSPELLING.test(value)) err(`${lang} ${where}: contains the misspelling "Бандзюк"`);
    return;
  }
  if (Array.isArray(value)) return value.forEach((v, i) => walk(v, `${where}[${i}]`, lang));
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) walk(v, where ? `${where}.${k}` : k, lang);
  }
}

/** Finds every { seo } object and checks lengths. */
function seoCheck(value: unknown, where: string, lang: Locale) {
  if (Array.isArray(value)) return value.forEach((v, i) => seoCheck(v, `${where}[${i}]`, lang));
  if (!value || typeof value !== "object") return;
  const obj = value as Record<string, unknown>;
  if (obj.seo && typeof obj.seo === "object") {
    const seo = obj.seo as { title?: string; description?: string };
    if (!seo.title?.trim()) err(`${lang} ${where}.seo.title is empty`);
    else if (seo.title.length > 60) err(`${lang} ${where}.seo.title is ${seo.title.length} chars (max 60): ${seo.title}`);
    if (!seo.description?.trim()) err(`${lang} ${where}.seo.description is empty`);
    else if (seo.description.length > 155) err(`${lang} ${where}.seo.description is ${seo.description.length} chars (max 155)`);
  }
  for (const [k, v] of Object.entries(obj)) if (k !== "seo") seoCheck(v, where ? `${where}.${k}` : k, lang);
}

/** Heading-like fields must not be empty. */
function headingCheck(value: unknown, where: string, lang: Locale) {
  if (Array.isArray(value)) return value.forEach((v, i) => headingCheck(v, `${where}[${i}]`, lang));
  if (!value || typeof value !== "object") return;
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    const here = where ? `${where}.${k}` : k;
    if (/(^h1$|Title$|^title$)/.test(k)) {
      if (typeof v === "string" && !v.trim()) err(`${lang} ${here} is an empty heading`);
      if (k === "h1" && v && typeof v === "object" && !accent(v as AccentHeading)) err(`${lang} ${here} is an empty heading`);
    }
    if (k === "answer" && typeof v === "string" && !v.trim()) err(`${lang} ${here} is an empty FAQ answer`);
    headingCheck(v, here, lang);
  }
}

for (const lang of Object.keys(CONTENT) as Locale[]) {
  const c = CONTENT[lang];
  walk(c, "", lang);
  seoCheck(c, "", lang);
  headingCheck(c, "", lang);

  // Registry consistency
  for (const s of c.services) if (SERVICE_SLUGS[s.key]?.[lang] !== s.slug) err(`${lang} service ${s.key}: slug "${s.slug}" differs from registry`);
  for (const s of c.caseStudies) if (CASE_SLUGS[s.key]?.[lang] !== s.slug) err(`${lang} case ${s.key}: slug "${s.slug}" differs from registry`);
  for (const s of c.categories) if (CATEGORY_SLUGS[s.key]?.[lang] !== s.slug) err(`${lang} category ${s.key}: slug "${s.slug}" differs from registry`);
  const planned = POSTS.filter((p) => p.slugs[lang]);
  for (const p of planned) if (!c.posts.some((x) => x.key === p.key)) err(`${lang}: planned article "${p.key}" is missing`);
  for (const p of c.posts) {
    const plan = POSTS.find((x) => x.key === p.key);
    if (!plan || plan.slugs[lang] !== p.slug) err(`${lang} post ${p.key}: slug "${p.slug}" differs from registry`);
    if (!c.categories.some((x) => x.key === p.category)) err(`${lang} post ${p.key}: unknown category "${p.category}"`);
    if (!c.services.some((x) => x.key === p.serviceKey)) err(`${lang} post ${p.key}: unknown service "${p.serviceKey}"`);
    if (!p.excerpt.trim() || !p.lead.trim()) err(`${lang} post ${p.key}: empty excerpt or lead`);

    const ids = new Set<string>();
    let count = words(p.lead);
    for (const b of p.body) {
      if (b.type === "h2") {
        if (ids.has(b.id)) err(`${lang} post ${p.key}: duplicate h2 id "${b.id}"`);
        ids.add(b.id);
        count += words(b.text);
      } else if (b.type === "p") count += words(b.text);
      else if (b.type === "list") count += b.items.reduce((n, it) => n + words(it), 0);
      else if (b.type === "calculator") {
        const spec = CALCULATOR_FIELDS[b.kind];
        for (const f of [...spec.inputs, ...spec.results]) if (!b.labels[f.id]?.trim()) err(`${lang} post ${p.key}: calculator ${b.kind} has no label for "${f.id}"`);
      } else if (b.type === "video" && !/^[\w-]{11}$/.test(b.youtubeId)) err(`${lang} post ${p.key}: invalid YouTube id "${b.youtubeId}"`);
    }
    if (p.placeholder) warn(`${lang} post ${p.key}: body is a stand-in (placeholder: true)`);
    else if (count < 800) err(`${lang} post ${p.key}: ${count} words, a full article needs at least 800`);
    else if (count > 1800) warn(`${lang} post ${p.key}: ${count} words`);
  }
  // Calculator pages
  for (const plan of CALCULATORS) {
    const page = c.calculators.find((x) => x.key === plan.key);
    if (!page) {
      err(`${lang}: calculator page "${plan.key}" is missing`);
      continue;
    }
    if (page.slug !== plan.slugs[lang]) err(`${lang} calculator ${plan.key}: slug "${page.slug}" differs from registry`);
    const block = page.body.find((b) => b.type === "calculator");
    if (!block || block.type !== "calculator" || block.kind !== plan.kind) err(`${lang} calculator ${plan.key}: body has no "${plan.kind}" calculator block`);
    if (!page.lead.trim() || !page.cardText.trim()) err(`${lang} calculator ${plan.key}: empty lead or card text`);
    if (page.faq.length < 3) err(`${lang} calculator ${plan.key}: needs at least 3 FAQ items`);
    if (page.relatedPostKey && !c.posts.some((x) => x.key === page.relatedPostKey)) err(`${lang} calculator ${plan.key}: unknown article "${page.relatedPostKey}"`);
    const text = page.body.reduce((n, b) => n + (b.type === "p" || b.type === "h2" ? words(b.text) : b.type === "list" ? words(b.items.join(" ")) : 0), words(page.lead));
    if (text < 300) err(`${lang} calculator ${plan.key}: ${text} words of explanation, needs at least 300`);
    for (const b of page.body) {
      if (b.type !== "calculator") continue;
      const spec = CALCULATOR_FIELDS[b.kind];
      for (const f of [...spec.inputs, ...spec.results]) if (!b.labels[f.id]?.trim()) err(`${lang} calculator ${plan.key}: no label for "${f.id}"`);
    }
  }

  // FAQ blocks on pages (owner decision 2026-09-17)
  const faqPages: [string, { faq?: unknown[] }][] = [
    ["servicesPage", c.servicesPage],
    ["caseStudiesPage", c.caseStudiesPage],
    ["blogPage", c.blogPage],
    ["calculatorsPage", c.calculatorsPage],
    ["about", c.about],
    ["courses", c.courses],
    ["templates", c.templates],
    ...c.caseStudies.map((x) => [`case ${x.key}`, x] as [string, { faq?: unknown[] }]),
    ...c.categories.map((x) => [`category ${x.key}`, x] as [string, { faq?: unknown[] }]),
    ...c.posts.map((x) => [`post ${x.key}`, x] as [string, { faq?: unknown[] }]),
  ];
  for (const [name, page] of faqPages) if (!page.faq || page.faq.length < 3) err(`${lang} ${name}: needs a FAQ block with at least 3 items`);

  for (const s of c.services) if (s.caseStudyKey && !c.caseStudies.some((x) => x.key === s.caseStudyKey)) err(`${lang} service ${s.key}: unknown case "${s.caseStudyKey}"`);
  for (const s of c.caseStudies) if (!c.services.some((x) => x.key === s.serviceKey)) err(`${lang} case ${s.key}: unknown service "${s.serviceKey}"`);

  // Remaining stand-in text outside fields that are expected to be placeholders.
  const stand: string[] = [];
  const scan = (v: unknown, where: string) => {
    if (typeof v === "string") {
      if (PLACEHOLDER.test(v) && !/recommendation|factsNote|placeholderFigures|recommendationPlaceholder|portraitPlaceholder/.test(where)) stand.push(where);
    } else if (Array.isArray(v)) v.forEach((x, i) => scan(x, `${where}[${i}]`));
    else if (v && typeof v === "object") {
      if ((v as { placeholder?: boolean }).placeholder) return;
      for (const [k, x] of Object.entries(v)) scan(x, where ? `${where}.${k}` : k);
    }
  };
  scan(c, "");
  for (const w of stand) warn(`${lang} ${w}: stand-in text`);
}

for (const w of warnings) console.log(`warn  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(`\n${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
