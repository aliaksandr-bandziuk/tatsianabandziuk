import type { Metadata } from "next";
import type { Locale, SiteContent } from "./types";
import { en } from "./fallback/en";
import { pl } from "./fallback/pl";
import { ru } from "./fallback/ru";
import { SITE_NAME } from "@/lib/site";

/**
 * Content source for every page.
 *
 * Stage 1 (now): the placeholder content in ./fallback, written from the
 * approved design and brief. Stage 2 (seeding): the same shapes are written to
 * Sanity by a script and these loaders read Sanity first, falling back here.
 * Components only ever see the view models in ./types.
 */
const CONTENT: Record<Locale, SiteContent> = { en, pl, ru };

export function getContent(lang: string): SiteContent {
  return CONTENT[(lang as Locale) in CONTENT ? (lang as Locale) : "en"];
}

/** "/services" → "/pl/services" for PL/RU, unchanged for EN. */
export function localizeHref(lang: string, href: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
  const path = href === "/" ? "" : href;
  return lang === "en" ? path || "/" : `/${lang}${path}`;
}

export const serviceHref = (lang: string, slug: string) => localizeHref(lang, `/services/${slug}`);
export const caseHref = (lang: string, slug: string) => localizeHref(lang, `/case-studies/${slug}`);
export const postHref = (lang: string, slug: string) => localizeHref(lang, `/blog/${slug}`);
export const categoryHref = (lang: string, slug: string) => localizeHref(lang, `/blog/category/${slug}`);
export const privacyHref = (lang: string) => localizeHref(lang, `/${getContent(lang).privacy.slug}`);

const LOCALES: Locale[] = ["en", "pl", "ru"];

/**
 * Metadata with canonical and hreflang for a page that exists in every
 * language. `pathFor(lang)` returns the path without the locale prefix.
 */
export function pageMetadata(
  lang: string,
  seo: { title: string; description: string; noindex?: boolean },
  pathFor: (lang: Locale) => string,
  opts: { absoluteTitle?: boolean; type?: "website" | "article" } = {},
): Metadata {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = localizeHref(l, pathFor(l));
  languages["x-default"] = languages.en;
  const canonical = languages[lang] ?? languages.en;
  return {
    title: opts.absoluteTitle ? { absolute: seo.title } : seo.title,
    description: seo.description,
    alternates: { canonical, languages },
    robots: seo.noindex ? { index: false, follow: true } : undefined,
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

export const localeParams = () => LOCALES.map((lang) => ({ lang }));

export function dateLabel(lang: string, iso: string, style: "short" | "long" = "short"): string {
  const locale = { en: "en-GB", pl: "pl-PL", ru: "ru-RU" }[lang] ?? "en-GB";
  return new Intl.DateTimeFormat(locale, { month: style === "short" ? "short" : "long", year: "numeric" }).format(new Date(iso));
}
