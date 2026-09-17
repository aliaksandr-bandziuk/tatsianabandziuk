/**
 * Localised slugs for the research CSV. The source of truth is the site
 * registry (src/content/fallback/registry.ts); research targets still use the
 * EN slugs of 2026-09-17, mapped here to the registry keys.
 */
import { CASE_SLUGS, POSTS, SERVICE_SLUGS } from "../../src/content/fallback/registry";
import type { Lang } from "./markets";
import { localizePath } from "../../src/lib/routing";

/** Research target slug (EN, as used in clusters.ts) → registry entry. */
const POST_KEYS: Record<string, string> = {
  "sell-through-rate": "sell-through-rate",
  "sell-through-rate-power-bi": "sell-through-rate",
  "size-curve-from-sales-data": "size-curve",
  "product-attribute-standards-plm": "product-attributes",
  "price-ladder-analysis": "price-architecture",
  "retail-price-architecture": "price-architecture",
  "dax-measures-retail-kpi-dashboard": "dax-measures",
  "open-to-buy-model-excel": "open-to-buy",
  "row-level-security-retail-reporting": "row-level-security",
  "sell-through-vs-finance": "sell-in-sell-through",
  "sell-in-vs-sell-through": "sell-in-sell-through",
};

function lookup(lang: "pl" | "ru", slug: string): string | undefined {
  if (SERVICE_SLUGS[slug]) return SERVICE_SLUGS[slug][lang];
  if (CASE_SLUGS[slug]) return CASE_SLUGS[slug][lang];
  const key = POST_KEYS[slug];
  return key ? POSTS.find((p) => p.key === key)?.slugs[lang] : undefined;
}

/** Localised slug and localised section segments ("/pl/services/x" → "/pl/uslugi/<pl slug>"). */
export function localizeTarget(lang: Lang, target: string): string {
  if (lang === "en") return target;
  const i = target.lastIndexOf("/");
  const slug = lookup(lang, target.slice(i + 1));
  const withSlug = slug ? target.slice(0, i + 1) + slug : target;
  const m = withSlug.match(/^(new:)?\/(pl|ru)(\/.*)?$/);
  if (!m) return withSlug;
  const [, isNew = "", l, rest = ""] = m;
  return `${isNew}/${l}${rest ? localizePath(l, rest) : ""}`;
}
