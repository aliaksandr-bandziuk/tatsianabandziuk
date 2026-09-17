/**
 * Localised section segments (owner decision 2026-09-17). Page files live
 * under the English segments (app/[lang]/services/...); the middleware
 * rewrites the public PL/RU paths to them and redirects English segments
 * requested under /pl or /ru to the localised ones.
 *
 * Pure module: imported by the middleware, content helpers and sitemap.
 */

export type RouteLocale = "en" | "pl" | "ru";

/** Internal segment → public segment per language. Longer segments first. */
export const SECTION_SEGMENTS: [internal: string, localized: Record<RouteLocale, string>][] = [
  ["blog/category", { en: "blog/category", pl: "blog/kategoria", ru: "blog/rubrika" }],
  ["services", { en: "services", pl: "uslugi", ru: "uslugi" }],
  ["case-studies", { en: "case-studies", pl: "case-study", ru: "kejsy" }],
  ["blog", { en: "blog", pl: "blog", ru: "blog" }],
  ["about", { en: "about", pl: "o-mnie", ru: "obo-mne" }],
  ["contact", { en: "contact", pl: "kontakt", ru: "kontakty" }],
  ["courses", { en: "courses", pl: "kursy", ru: "kursy" }],
  ["free-templates", { en: "free-templates", pl: "darmowe-szablony", ru: "besplatnye-shablony" }],
  ["tools", { en: "tools", pl: "kalkulatory", ru: "kalkulyatory" }],
];

/** "/services/x" → "/uslugi/x" for PL. Paths are without the locale prefix; hash and query are kept. */
export function localizePath(lang: string, path: string): string {
  if (lang === "en") return path;
  const m = path.match(/^([^?#]*)(.*)$/)!;
  const [, pathname, suffix] = m;
  for (const [internal, localized] of SECTION_SEGMENTS) {
    const prefix = `/${internal}`;
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return `/${localized[lang as RouteLocale]}${pathname.slice(prefix.length)}${suffix}`;
    }
  }
  return path;
}

/**
 * next-intl `pathnames`: internal template → localised template.
 * Pages without localised segments (home, legal page, catch-all) need no entry.
 */
export function intlPathnames(): Record<string, Record<RouteLocale, string>> {
  const out: Record<string, Record<RouteLocale, string>> = {};
  for (const [internal, localized] of SECTION_SEGMENTS) {
    const loc = (suffix: string) => Object.fromEntries(Object.entries(localized).map(([l, seg]) => [l, `/${seg}${suffix}`])) as Record<RouteLocale, string>;
    if (internal !== "blog/category") out[`/${internal}`] = loc("");
    out[`/${internal}/[slug]`] = loc("/[slug]");
  }
  return out;
}
