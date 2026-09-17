export type Lang = "en" | "pl" | "ru";

export type Market = { code: number; name: string; language: string };

/** Primary market per language (Labs + Google Ads + SERP). */
export const PRIMARY: Record<Lang, Market> = {
  en: { code: 2826, name: "United Kingdom", language: "en" },
  pl: { code: 2616, name: "Poland", language: "pl" },
  // Russia and Belarus are not available in Labs, Google Ads or SERP.
  ru: { code: 2398, name: "Kazakhstan", language: "ru" },
};

/** Extra markets: Labs ideas (en) and Google Ads volumes only. */
export const EXTRA: Record<Lang, Market[]> = {
  en: [{ code: 2840, name: "United States", language: "en" }],
  pl: [],
  ru: [
    { code: 2616, name: "Poland", language: "ru" },
    { code: 2276, name: "Germany", language: "ru" },
    // Volume signal only: Kazakhstan volumes are too small to rank topics.
    { code: 2804, name: "Ukraine", language: "ru" },
  ],
};

export const LANGS: Lang[] = ["en", "pl", "ru"];

export function isLang(v: string | undefined): v is Lang {
  return v === "en" || v === "pl" || v === "ru";
}

/** Short market tag used in cache names and CSV (`uk`, `us`, `pl`, `kz`, `pl-ru`, `de-ru`). */
export function tag(m: Market, lang: Lang): string {
  const short: Record<number, string> = { 2826: "uk", 2840: "us", 2616: "pl", 2398: "kz", 2276: "de", 2804: "ua" };
  const t = short[m.code] ?? String(m.code);
  return m.language === lang && (lang !== "ru" || m.code === 2398) ? t : `${t}-${m.language}`;
}
