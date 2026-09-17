import { SITE_URL } from "@/lib/site";

export const BASE_URL = SITE_URL;

/** Returns "" for EN (no-prefix default), "/{lang}" for PL/RU. */
export function localePrefix(lang: string): string {
  return lang === "en" ? "" : `/${lang}`;
}

type SlugTranslation = {
  slug?: Record<string, { current?: string | null } | null> | null;
};

/**
 * Search _translations for the alternate slug of a given locale.
 * Mirrors the LocaleSwitcher check: slug[locale].current must be non-empty.
 * Returns null if no translation exists for that locale.
 */
export function findAltSlug(
  translations: SlugTranslation[],
  locale: string,
): string | null {
  for (const t of translations) {
    const s = t?.slug?.[locale]?.current;
    if (s) return s;
  }
  return null;
}

/**
 * Finalise the alternates.languages map for Next.js generateMetadata.
 * Adds x-default pointing to the EN URL, then returns the completed map.
 * Pass only locales whose translations actually exist.
 */
export function buildLanguageAlternates(
  entries: Record<string, string>,
): Record<string, string> {
  const result = { ...entries };
  if (entries["en"]) result["x-default"] = entries["en"];
  return result;
}
