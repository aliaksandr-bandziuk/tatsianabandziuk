import * as React from "react";
import type { Metadata } from "next";
import { INDEXING_ALLOWED, NOINDEX_ROBOTS } from "@/lib/site";
import type { CalculatorPage, CaseStudy, Category, Locale, Post, Service, SiteContent } from "./types";
import { en } from "./fallback/en";
import { pl } from "./fallback/pl";
import { ru } from "./fallback/ru";
import { SITE_NAME } from "@/lib/site";
import { localizePath } from "@/lib/routing";
import { loadSiteContent } from "@/sanity/loaders";

/**
 * Content source for every page.
 *
 * Sanity first (src/sanity/loaders.ts); the typed modules in ./fallback when
 * Sanity cannot be reached or a language or page is not there, with a warning
 * in the server log. Both give the same view models (./types), so components
 * never care where a text came from.
 *
 * Services, case studies, posts, categories and calculators have a
 * language-independent `key` and a per-language `slug`. Cross-references
 * (serviceKey, caseStudyKey, post.category, relatedPostKey) always use keys;
 * URLs always use slugs.
 */
export const FALLBACK: Record<Locale, SiteContent> = { en, pl, ru };

export const LOCALES: Locale[] = ["en", "pl", "ru"];

const toLocale = (lang: string): Locale => ((lang as Locale) in FALLBACK ? (lang as Locale) : "en");

// React's per-request memo where it exists (Next server rendering), a pass-through elsewhere (scripts).
type AnyFn = (...args: never[]) => unknown;
type Memo = <T extends AnyFn>(fn: T) => T;
const perRequest: Memo = (React as unknown as { cache?: Memo }).cache ?? ((fn) => fn);

const lastWarning = new Map<string, number>();
function warn(message: string) {
  const now = Date.now();
  if (now - (lastWarning.get(message) ?? 0) < 60000) return;
  lastWarning.set(message, now);
  console.warn(`[content] ${message}`);
}

const loadContent = perRequest(async (lang: Locale): Promise<SiteContent> => {
  try {
    const result = await loadSiteContent(lang, FALLBACK[lang]);
    if (!result) {
      warn(`Sanity has no content for "${lang}", using the fallback modules`);
      return FALLBACK[lang];
    }
    if (result.missing.length) warn(`Sanity "${lang}" is missing ${result.missing.join(", ")}; using the fallback for them`);
    return result.content;
  } catch (err) {
    warn(`Sanity fetch failed for "${lang}", using the fallback modules: ${err instanceof Error ? err.message : String(err)}`);
    return FALLBACK[lang];
  }
});

export function getContent(lang: string): Promise<SiteContent> {
  return loadContent(toLocale(lang));
}

export async function getAllContent(): Promise<Record<Locale, SiteContent>> {
  const [e, p, r] = await Promise.all(LOCALES.map((l) => getContent(l)));
  return { en: e, pl: p, ru: r };
}

/** Internal path → public URL: "/services/x" → "/pl/uslugi/x" for PL, unchanged for EN. */
export function localizeHref(lang: string, href: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
  const path = href === "/" ? "" : localizePath(lang, href);
  return lang === "en" ? path || "/" : `/${lang}${path}`;
}

export const serviceHref = (lang: string, slug: string) => localizeHref(lang, `/services/${slug}`);
export const caseHref = (lang: string, slug: string) => localizeHref(lang, `/case-studies/${slug}`);
export const postHref = (lang: string, slug: string) => localizeHref(lang, `/blog/${slug}`);
export const categoryHref = (lang: string, slug: string) => localizeHref(lang, `/blog/category/${slug}`);
export const calculatorHref = (lang: string, slug: string) => localizeHref(lang, `/tools/${slug}`);
export const privacyHref = (c: SiteContent) => localizeHref(c.locale, `/${c.privacy.slug}`);

export type RoutableKind = "service" | "caseStudy" | "post" | "category" | "calculator";

type Routable = Service | CaseStudy | Post | Category | CalculatorPage;

const LIST: Record<RoutableKind, (c: SiteContent) => Routable[]> = {
  service: (c) => c.services,
  caseStudy: (c) => c.caseStudies,
  post: (c) => c.posts,
  category: (c) => c.categories,
  calculator: (c) => c.calculators,
};

/** Path without the locale prefix, and the listing page used when a translation is missing. */
const PATH: Record<RoutableKind, { path: (slug: string) => string; index: string }> = {
  service: { path: (slug) => `/services/${slug}`, index: "/services" },
  caseStudy: { path: (slug) => `/case-studies/${slug}`, index: "/case-studies" },
  post: { path: (slug) => `/blog/${slug}`, index: "/blog" },
  category: { path: (slug) => `/blog/category/${slug}`, index: "/blog" },
  calculator: { path: (slug) => `/tools/${slug}`, index: "/tools" },
};

export const serviceByKey = (c: SiteContent, key?: string) => (key ? c.services.find((x) => x.key === key) : undefined);
export const caseByKey = (c: SiteContent, key?: string) => (key ? c.caseStudies.find((x) => x.key === key) : undefined);
export const postByKey = (c: SiteContent, key?: string) => (key ? c.posts.find((x) => x.key === key) : undefined);
export const calculatorByKind = (c: SiteContent, kind: string) => c.calculators.find((x) => x.kind === kind);
export const categoryByKey = (c: SiteContent, key?: string) => (key ? c.categories.find((x) => x.key === key) : undefined);

type RoutableOf<K extends RoutableKind> = K extends "service"
  ? Service
  : K extends "caseStudy"
    ? CaseStudy
    : K extends "post"
      ? Post
      : K extends "calculator"
        ? CalculatorPage
        : Category;

export function bySlug<K extends RoutableKind>(kind: K, c: SiteContent, slug: string) {
  return LIST[kind](c).find((x) => x.slug === slug) as RoutableOf<K> | undefined;
}

function pathsFrom(all: Record<Locale, SiteContent>, kind: RoutableKind, key: string): Partial<Record<Locale, string>> {
  const out: Partial<Record<Locale, string>> = {};
  for (const l of LOCALES) {
    const item = LIST[kind](all[l]).find((x) => x.key === key);
    if (item) out[l] = PATH[kind].path(item.slug);
  }
  return out;
}

/** Paths (without locale prefix) of every existing language version of an item. */
export async function alternatePaths(kind: RoutableKind, key: string): Promise<Partial<Record<Locale, string>>> {
  return pathsFrom(await getAllContent(), kind, key);
}

/** Static params for a dynamic route: every slug in every language. */
export async function slugParams(kind: RoutableKind) {
  const all = await getAllContent();
  return LOCALES.flatMap((lang) => LIST[kind](all[lang]).map((x) => ({ lang, slug: x.slug })));
}

export type RoutableGroup = {
  /** Path without locale prefix per language that has the item. */
  paths: Partial<Record<Locale, string>>;
  /** Last edit per language (Sanity only). */
  updatedAt?: Partial<Record<Locale, string>>;
};

/** Every routable item as a group of per-language paths (for the sitemap). */
export async function routableGroups(): Promise<RoutableGroup[]> {
  const all = await getAllContent();
  const groups: RoutableGroup[] = [];
  for (const kind of Object.keys(LIST) as RoutableKind[]) {
    const keys = new Set(LOCALES.flatMap((l) => LIST[kind](all[l]).map((x) => x.key)));
    keys.forEach((key) => {
      const updatedAt: Partial<Record<Locale, string>> = {};
      for (const l of LOCALES) {
        const item = LIST[kind](all[l]).find((x) => x.key === key);
        if (item?.updatedAt) updatedAt[l] = item.updatedAt;
      }
      groups.push({ paths: pathsFrom(all, kind, key), updatedAt });
    });
  }
  groups.push({
    paths: Object.fromEntries(LOCALES.map((l) => [l, `/${all[l].privacy.slug}`])),
    updatedAt: Object.fromEntries(LOCALES.flatMap((l) => (all[l].privacy.updatedAt ? [[l, all[l].privacy.updatedAt]] : []))),
  });
  return groups;
}

/**
 * Path aliases for the language switcher: the public path of one page in
 * every language that has it, and the listing page for the others.
 */
export type LanguageAlias = {
  /** Public path (localised segments, no locale prefix) per language that has the page. */
  paths: Partial<Record<Locale, string>>;
  /** Public path of the listing page per language, for languages without a translation. */
  fallback: Record<Locale, string>;
};

export async function languageAliases(): Promise<LanguageAlias[]> {
  const all = await getAllContent();
  const pub = (l: Locale, p: string) => localizePath(l, p);
  const everywhere = (p: string) => Object.fromEntries(LOCALES.map((l) => [l, pub(l, p)])) as Record<Locale, string>;
  const groups: LanguageAlias[] = [];
  for (const kind of Object.keys(LIST) as RoutableKind[]) {
    const keys = new Set(LOCALES.flatMap((l) => LIST[kind](all[l]).map((x) => x.key)));
    keys.forEach((key) => {
      const alt = pathsFrom(all, kind, key);
      const paths: Partial<Record<Locale, string>> = {};
      for (const l of LOCALES) if (alt[l]) paths[l] = pub(l, alt[l]!);
      groups.push({ paths, fallback: everywhere(PATH[kind].index) });
    });
  }
  for (const p of STATIC_PATHS.filter(Boolean)) groups.push({ paths: everywhere(p), fallback: everywhere("/") });
  groups.push({ paths: Object.fromEntries(LOCALES.map((l) => [l, `/${all[l].privacy.slug}`])), fallback: everywhere("/") });
  return groups;
}

/** Fixed pages that exist in every language (internal paths). */
export const STATIC_PATHS = ["", "/services", "/case-studies", "/blog", "/about", "/contact", "/courses", "/free-templates", "/tools"];

/**
 * Metadata with canonical and hreflang. `pathFor(lang)` returns the path
 * without the locale prefix, or nothing when the page has no version in
 * that language (it is then left out of hreflang).
 */
export function pageMetadata(
  lang: string,
  seo: { title: string; description: string; noindex?: boolean },
  pathFor: (lang: Locale) => string | undefined,
  opts: { absoluteTitle?: boolean; type?: "website" | "article" } = {},
): Metadata {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    const p = pathFor(l);
    if (p !== undefined) languages[l] = localizeHref(l, p);
  }
  if (languages.en) languages["x-default"] = languages.en;
  const canonical = languages[lang] ?? languages.en;
  return {
    title: opts.absoluteTitle ? { absolute: seo.title } : seo.title,
    description: seo.description,
    alternates: { canonical, languages },
    robots: !INDEXING_ALLOWED ? NOINDEX_ROBOTS : seo.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonical,
      siteName: SITE_NAME,
      locale: { en: "en_GB", pl: "pl_PL", ru: "ru_RU" }[lang] ?? "en_GB",
      type: opts.type ?? "website",
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  };
}

/** Metadata for a routable item: hreflang only for the languages that have it. */
export async function itemMetadata(
  kind: RoutableKind,
  lang: string,
  item: { key: string; seo: Parameters<typeof pageMetadata>[1] },
  opts: Parameters<typeof pageMetadata>[3] = {},
): Promise<Metadata> {
  const alt = await alternatePaths(kind, item.key);
  return pageMetadata(lang, item.seo, (l) => alt[l], opts);
}

/** Newest articles, finished ones first (stand-ins only fill the remaining slots). */
export function latestPosts(c: SiteContent, count: number, exceptKey?: string): Post[] {
  return c.posts
    .filter((p) => p.key !== exceptKey)
    .sort((a, b) => Number(!!a.placeholder) - Number(!!b.placeholder) || b.date.localeCompare(a.date))
    .slice(0, count);
}

export const localeParams = () => LOCALES.map((lang) => ({ lang }));

export function dateLabel(lang: string, iso: string, style: "short" | "long" = "short"): string {
  const locale = { en: "en-GB", pl: "pl-PL", ru: "ru-RU" }[lang] ?? "en-GB";
  return new Intl.DateTimeFormat(locale, { month: style === "short" ? "short" : "long", year: "numeric" }).format(new Date(iso));
}
