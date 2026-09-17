/**
 * Site-wide constants. The address comes from NEXT_PUBLIC_SITE_URL so the same
 * code serves previews and production; the fallback is the production domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.tatsianabandziuk.com"
).replace(/\/$/, "");

export const SITE_NAME = "Tatsiana Bandziuk";

export const LOCALES = ["en", "pl", "ru"] as const;
export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * URL segments for each document type. Kept in English for every language for
 * now; localised segments are an open question for the keyword research.
 */
export const ROUTES = {
  service: "services",
  caseStudy: "case-studies",
  post: "blog",
  category: "blog/category",
  calculator: "tools",
} as const;

/**
 * Search indexing switch. The site stays closed (robots.txt disallow, noindex
 * meta, X-Robots-Tag header, no IndexNow pings) until SITE_INDEXING=on is set
 * in the environment — so a fresh Vercel deploy or preview is never indexed.
 */
export const INDEXING_ALLOWED = process.env.SITE_INDEXING === "on";

export const NOINDEX_ROBOTS = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false, noimageindex: true },
} as const;
