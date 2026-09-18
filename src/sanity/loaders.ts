import groq from "groq";
import { client } from "./sanity.client";
import { ARTICLE_BLOCK_KINDS } from "./articleBlocks";
import type { Locale, SiteContent, SiteImage } from "@/content/types";

/**
 * Reads one language of the site from Sanity and returns exactly the view
 * models of src/content/types.ts (field map: docs/sanity-mapping.md).
 *
 * One query per language; `client` adds the day-long cache and the `sanity`
 * tag that the publish webhook revalidates.
 */

const ROUTABLE = groq`..., "slug": slug[$lang].current, "updatedAt": _updatedAt`;

const QUERY = groq`{
  "settings": *[_type == "siteSettings" && language == $lang][0]{
    ...,
    person{
      ...,
      "photoPrimary": { "src": photoPrimary.file.asset->url, "alt": photoPrimary.alt },
      "photoSecondary": { "src": photoSecondary.file.asset->url, "alt": photoSecondary.alt },
      "photoWorkspace": { "src": photoWorkspace.file.asset->url, "alt": photoWorkspace.alt }
    }
  },
  "home": *[_type == "homepage" && language == $lang][0]{ ..., "updatedAt": _updatedAt },
  "about": *[_type == "aboutPage" && language == $lang][0]{
    ...,
    "updatedAt": _updatedAt,
    credentials{
      ...,
      items[]{
        ...,
        "thumb": thumb.asset->url,
        "image": image.asset->url,
        "width": image.asset->metadata.dimensions.width,
        "height": image.asset->metadata.dimensions.height
      }
    }
  },
  "listings": *[_type == "listingPage" && language == $lang]{ ..., "updatedAt": _updatedAt },
  "contact": *[_type == "contactPage" && language == $lang][0]{ ..., "updatedAt": _updatedAt },
  "courses": *[_type == "coursesPage" && language == $lang][0]{ ..., "updatedAt": _updatedAt },
  "templates": *[_type == "templatesPage" && language == $lang][0]{ ..., "updatedAt": _updatedAt },
  "privacy": *[_type == "legalPage" && language == $lang && key == "privacy"][0]{ ..., "slug": slug[$lang].current, "updatedAt": _updatedAt },
  "services": *[_type == "service" && language == $lang && defined(slug[$lang].current)] | order(order asc){ ${ROUTABLE} },
  "caseStudies": *[_type == "caseStudy" && language == $lang && defined(slug[$lang].current)] | order(order asc){ ${ROUTABLE} },
  "posts": *[_type == "post" && language == $lang && defined(slug[$lang].current)] | order(order asc){ ${ROUTABLE} },
  "categories": *[_type == "category" && language == $lang && defined(slug[$lang].current)] | order(order asc){ ${ROUTABLE} },
  "calculators": *[_type == "calculatorPage" && language == $lang && defined(slug[$lang].current)] | order(order asc){ ${ROUTABLE} }
}`;

type Raw = Record<string, unknown>;
type RawResult = {
  settings: Raw | null;
  home: Raw | null;
  about: Raw | null;
  listings: Raw[];
  contact: Raw | null;
  courses: Raw | null;
  templates: Raw | null;
  privacy: Raw | null;
  services: Raw[];
  caseStudies: Raw[];
  posts: Raw[];
  categories: Raw[];
  calculators: Raw[];
};

/** Document bookkeeping that is not part of any view model. */
const DROP = new Set(["language", "order"]);

/** Sanity value → plain view-model value: no _key/_type/null, article blocks get `type` back. */
function clean(value: unknown, depth = 0): unknown {
  if (value === null || value === undefined) return undefined;
  if (Array.isArray(value)) return value.map((v) => clean(v, depth + 1)).filter((v) => v !== undefined);
  if (typeof value !== "object") return value;
  const src = value as Raw;
  const out: Raw = {};
  const kind = typeof src._type === "string" ? ARTICLE_BLOCK_KINDS[src._type] : undefined;
  if (kind) out.type = kind;
  for (const [k, v] of Object.entries(src)) {
    if (k.startsWith("_") || (depth === 0 && DROP.has(k))) continue;
    const c = clean(v, depth + 1);
    if (c !== undefined) out[k] = c;
  }
  if (kind) return articleBlock(out);
  return out;
}

/** Shapes that differ between the schema and the model. */
function articleBlock(block: Raw): Raw {
  if (block.type === "list" && !Array.isArray(block.items)) block.items = [];
  if (block.type === "calculator" && Array.isArray(block.labels)) {
    block.labels = Object.fromEntries((block.labels as { id?: string; label?: string }[]).map((l) => [l.id ?? "", l.label ?? ""]));
  }
  if (block.type === "table") {
    const columns = (block.columns as { kind?: string }[] | undefined) ?? [];
    block.columns = columns;
    block.rows = ((block.rows as { cells?: string[] }[] | undefined) ?? []).map((row) => ({
      ...row,
      cells: (row.cells ?? []).map((cell, i) => {
        const n = Number(cell);
        return columns[i]?.kind === "number" && cell !== "" && Number.isFinite(n) ? n : cell;
      }),
    }));
  }
  return block;
}

/**
 * Lists the editor emptied are removed by the Studio; components expect an
 * array. Adds [] wherever the fallback model of the same page has a list.
 * Only lists: missing texts and objects stay missing.
 */
function conform(value: unknown, template: unknown): unknown {
  if (Array.isArray(template)) {
    if (!Array.isArray(value)) return value === undefined ? [] : value;
    const t = template[0];
    return t && typeof t === "object" ? value.map((v) => conform(v, t)) : value;
  }
  if (template && typeof template === "object" && value && typeof value === "object" && !Array.isArray(value)) {
    const out = { ...(value as Raw) };
    for (const [k, t] of Object.entries(template as Raw)) {
      if (Array.isArray(t) || (t && typeof t === "object")) out[k] = conform(out[k], t);
    }
    return out;
  }
  return value;
}

function piece<T>(raw: Raw | null | undefined, fallback: T, name: string, lang: Locale, missing: string[]): T {
  if (!raw) {
    missing.push(name);
    return fallback;
  }
  return conform(clean(raw), fallback) as T;
}

function items<T>(raw: Raw[], fallback: T[]): T[] {
  const template = fallback[0];
  return raw.map((r) => conform(clean(r), template) as T);
}

export type LoadResult = { content: SiteContent; missing: string[] } | null;

/**
 * Returns null when the language is not in Sanity at all (no site settings).
 * Missing single pages are taken from `fallback` and listed in `missing`.
 * Throws when Sanity cannot be reached.
 */
export async function loadSiteContent(lang: Locale, fallback: SiteContent): Promise<LoadResult> {
  const raw = await client.fetch<RawResult>(QUERY, { lang });
  if (!raw?.settings) return null;

  const missing: string[] = [];
  const settings = clean(raw.settings) as Raw;
  const uiRaw = (settings.ui ?? {}) as Raw;
  const topics = Array.isArray(uiRaw.topics)
    ? Object.fromEntries((uiRaw.topics as { key?: string; label?: string }[]).map((t) => [t.key ?? "", t.label ?? ""]))
    : fallback.ui.topics;
  const ui = conform({ ...uiRaw, topics }, fallback.ui) as SiteContent["ui"];

  const listing = (key: string, fb: SiteContent["servicesPage"]) => {
    const doc = raw.listings.find((l) => l.key === key);
    if (!doc) return piece(null, fb, `listingPage ${key}`, lang, missing);
    const { key: _key, ...rest } = doc;
    return piece(rest, fb, `listingPage ${key}`, lang, missing);
  };

  let privacy = fallback.privacy;
  if (raw.privacy && typeof raw.privacy.slug === "string") {
    const { key: _key, ...rest } = raw.privacy;
    privacy = piece(rest, fallback.privacy, "legalPage privacy", lang, missing);
  } else {
    missing.push("legalPage privacy");
  }

  const personRaw = settings.person
    ? (conform(settings.person, fallback.person) as SiteContent["person"])
    : (missing.push("person"), fallback.person);
  /** A photo counts only when Studio has a file; otherwise the fallback file under public/ stays. */
  const photo = (value: SiteImage | undefined, fb: SiteImage | undefined): SiteImage | undefined =>
    value && typeof value.src === "string" && value.src ? { ...fb, ...value } : fb;
  const person: SiteContent["person"] = {
    ...personRaw,
    photoPrimary: photo(personRaw.photoPrimary, fallback.person.photoPrimary),
    photoSecondary: photo(personRaw.photoSecondary, fallback.person.photoSecondary),
    photoWorkspace: photo(personRaw.photoWorkspace, fallback.person.photoWorkspace),
  };

  const content: SiteContent = {
    locale: lang,
    ui,
    person,
    formats: (settings.formats as SiteContent["formats"]) ?? [],
    tools: (conform(settings.tools ?? [], fallback.tools) as SiteContent["tools"]) ?? [],
    recommendations: (settings.recommendations as SiteContent["recommendations"]) ?? [],
    notFound: settings.notFound ? (conform(settings.notFound, fallback.notFound) as SiteContent["notFound"]) : (missing.push("notFound"), fallback.notFound),
    thankYou: settings.thankYou ? (conform(settings.thankYou, fallback.thankYou) as SiteContent["thankYou"]) : (missing.push("thankYou"), fallback.thankYou),
    home: piece(raw.home, fallback.home, "homepage", lang, missing),
    about: piece(raw.about, fallback.about, "aboutPage", lang, missing),
    servicesPage: listing("services", fallback.servicesPage),
    caseStudiesPage: listing("caseStudies", fallback.caseStudiesPage),
    blogPage: listing("blog", fallback.blogPage),
    calculatorsPage: listing("calculators", fallback.calculatorsPage),
    contact: piece(raw.contact, fallback.contact, "contactPage", lang, missing),
    courses: piece(raw.courses, fallback.courses, "coursesPage", lang, missing),
    templates: piece(raw.templates, fallback.templates, "templatesPage", lang, missing),
    privacy,
    services: items(raw.services, fallback.services),
    caseStudies: items(raw.caseStudies, fallback.caseStudies),
    posts: items(raw.posts, fallback.posts),
    categories: items(raw.categories, fallback.categories),
    calculators: items(raw.calculators, fallback.calculators),
  };
  return { content, missing };
}

