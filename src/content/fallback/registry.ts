import type { Locale } from "../types";

/**
 * Language-independent keys and per-language URL slugs (owner decision
 * 2026-09-17, research/keyword-map.md). Language modules take their slugs
 * from here so the three versions of a page stay linked.
 */

type Slugs = Record<Locale, string>;

export const SERVICE_SLUGS: Record<string, Slugs> = {
  "assortment-planning": { en: "assortment-planning", pl: "planowanie-asortymentu", ru: "upravlenie-assortimentom" },
  "retail-pricing-analysis": { en: "retail-pricing-analysis", pl: "analiza-cen", ru: "analiz-cen" },
  "power-bi-dashboards": { en: "power-bi-dashboards", pl: "raportowanie-sprzedazy-power-bi", ru: "otchety-po-prodazham-power-bi" },
  "excel-retail-planning-models": { en: "excel-retail-planning-models", pl: "planowanie-zakupow-excel", ru: "planirovanie-zakupok-excel" },
  "product-data-quality-plm": { en: "product-data-quality-plm", pl: "jakosc-danych-produktowych", ru: "tovarnye-dannye-plm" },
  "retail-analytics-processes": { en: "retail-analytics-processes", pl: "procesy-raportowania", ru: "otchetnost-v-ritejle" },
};

export const CASE_SLUGS: Record<string, Slugs> = {
  "plm-product-data-standardisation": { en: "plm-product-data-standardisation", pl: "standaryzacja-danych-produktowych-plm", ru: "standartizaciya-tovarnyh-dannyh-plm" },
  "womenswear-range-plan-rebuild": { en: "womenswear-range-plan-rebuild", pl: "plan-asortymentu-odziez-damska", ru: "assortimentnyj-plan-zhenskoj-odezhdy" },
  "price-ladder-margin-report": { en: "price-ladder-margin-report", pl: "architektura-cenowa-raport-marzy", ru: "cenovaya-linejka-otchet-o-marzhe" },
  "weekly-retail-trade-report": { en: "weekly-retail-trade-report", pl: "tygodniowy-raport-sprzedazy-power-bi", ru: "ezhenedelnyj-otchet-po-prodazham-power-bi" },
  "menswear-size-curve-rebuild": { en: "menswear-size-curve-rebuild", pl: "krzywe-rozmiarow-odziez-meska", ru: "razmernaya-matrica-muzhskoj-odezhdy" },
  "ecommerce-catalogue-attribute-cleaning": { en: "ecommerce-catalogue-attribute-cleaning", pl: "atrybuty-produktow-migracja-e-commerce", ru: "ochistka-atributov-tovarov-katalog" },
};

export const CATEGORY_SLUGS: Record<string, Slugs & { service?: string }> = {
  "power-bi": { en: "power-bi", pl: "power-bi", ru: "power-bi", service: "power-bi-dashboards" },
  assortment: { en: "assortment", pl: "asortyment", ru: "assortiment", service: "assortment-planning" },
  pricing: { en: "pricing", pl: "ceny", ru: "ceny", service: "retail-pricing-analysis" },
  "product-data": { en: "product-data", pl: "dane-produktowe", ru: "tovarnye-dannye", service: "product-data-quality-plm" },
  excel: { en: "excel", pl: "excel", ru: "excel", service: "excel-retail-planning-models" },
  careers: { en: "careers", pl: "kariera", ru: "karera" },
};

export type CalculatorPlan = {
  key: string;
  kind: "marginMarkup" | "sellThrough" | "gmroi" | "stockTurn" | "openToBuy";
  serviceKey: string;
  slugs: Slugs;
};

/** Stand-alone calculator pages (/tools/<slug>, PL /kalkulatory, RU /kalkulyatory). */
export const CALCULATORS: CalculatorPlan[] = [
  { key: "margin-calculator", kind: "marginMarkup", serviceKey: "retail-pricing-analysis", slugs: { en: "margin-calculator", pl: "kalkulator-marzy", ru: "kalkulyator-marzhi" } },
  { key: "sell-through-calculator", kind: "sellThrough", serviceKey: "power-bi-dashboards", slugs: { en: "sell-through-calculator", pl: "kalkulator-sell-through", ru: "kalkulyator-sell-through" } },
  { key: "stock-turn-calculator", kind: "stockTurn", serviceKey: "excel-retail-planning-models", slugs: { en: "stock-turn-calculator", pl: "kalkulator-rotacji-zapasow", ru: "kalkulyator-oborachivaemosti" } },
  { key: "gmroi-calculator", kind: "gmroi", serviceKey: "power-bi-dashboards", slugs: { en: "gmroi-calculator", pl: "kalkulator-gmroi", ru: "kalkulyator-gmroi" } },
  { key: "open-to-buy-calculator", kind: "openToBuy", serviceKey: "excel-retail-planning-models", slugs: { en: "open-to-buy-calculator", pl: "kalkulator-open-to-buy", ru: "kalkulyator-byudzheta-zakupok" } },
];

export function calculatorPlan(key: string, lang: Locale) {
  const c = CALCULATORS.find((x) => x.key === key);
  if (!c) throw new Error(`Unknown calculator "${key}"`);
  return { key: c.key, slug: c.slugs[lang], kind: c.kind, serviceKey: c.serviceKey };
}

export type PostPlan = {
  key: string;
  category: string;
  serviceKey: string;
  cover: "bars" | "tag" | "swatches" | "table" | "lines";
  /** Only the languages that have this article. */
  slugs: Partial<Slugs>;
};

/** Every article on the site (research/blog-plan.md). */
export const POSTS: PostPlan[] = [
  { key: "sell-through-rate", category: "power-bi", serviceKey: "power-bi-dashboards", cover: "bars", slugs: { en: "sell-through-rate", pl: "wskaznik-sell-through", ru: "sell-through" } },
  { key: "open-to-buy", category: "excel", serviceKey: "excel-retail-planning-models", cover: "table", slugs: { en: "open-to-buy-model-excel", pl: "open-to-buy-excel", ru: "open-to-buy" } },
  { key: "row-level-security", category: "power-bi", serviceKey: "power-bi-dashboards", cover: "lines", slugs: { en: "row-level-security-retail-reporting", pl: "rls-power-bi", ru: "rls-power-bi" } },
  { key: "dax-measures", category: "power-bi", serviceKey: "power-bi-dashboards", cover: "lines", slugs: { en: "dax-measures-retail-kpi-dashboard", pl: "miary-dax-power-bi", ru: "mery-dax-power-bi" } },
  { key: "markup-vs-margin", category: "pricing", serviceKey: "retail-pricing-analysis", cover: "table", slugs: { en: "markup-vs-margin-fashion-retail", pl: "marza-a-narzut-w-handlu", ru: "marzha-i-nacenka-v-roznice" } },
  { key: "dashboard-examples", category: "power-bi", serviceKey: "power-bi-dashboards", cover: "bars", slugs: { en: "power-bi-retail-dashboard-examples", pl: "raport-sprzedazy-power-bi", ru: "dashbord-prodazh-power-bi" } },
  { key: "pricing-strategy", category: "pricing", serviceKey: "retail-pricing-analysis", cover: "tag", slugs: { en: "retail-pricing-strategy-fashion", pl: "strategie-cenowe-w-handlu", ru: "cenoobrazovanie-v-roznice" } },
  { key: "pim-vs-plm", category: "product-data", serviceKey: "product-data-quality-plm", cover: "swatches", slugs: { en: "pim-vs-plm-fashion-brands", pl: "system-pim-i-plm-w-branzy-modowej", ru: "pim-i-plm-sistemy-dlya-fashion" } },
  { key: "retail-kpis", category: "power-bi", serviceKey: "power-bi-dashboards", cover: "bars", slugs: { en: "retail-kpis-fashion-brands", pl: "kpi-w-handlu-detalicznym", ru: "kpi-v-roznichnoj-torgovle" } },
  { key: "abc-xyz", category: "assortment", serviceKey: "assortment-planning", cover: "table", slugs: { en: "abc-xyz-analysis-assortment", pl: "analiza-abc-xyz-asortymentu", ru: "abc-xyz-analiz-assortimenta" } },
  { key: "inventory-turnover", category: "excel", serviceKey: "excel-retail-planning-models", cover: "lines", slugs: { pl: "wskaznik-rotacji-zapasow", ru: "oborachivaemost-tovarnyh-zapasov" } },
  { key: "range-planning", category: "assortment", serviceKey: "assortment-planning", cover: "tag", slugs: { en: "range-planning-fashion" } },
  { key: "price-architecture", category: "pricing", serviceKey: "retail-pricing-analysis", cover: "table", slugs: { en: "retail-price-architecture", pl: "architektura-cenowa", ru: "cenovaya-linejka" } },
  { key: "product-attributes", category: "product-data", serviceKey: "product-data-quality-plm", cover: "swatches", slugs: { en: "product-attribute-standards-plm", pl: "atrybuty-produktu-plm", ru: "atributy-tovara-plm" } },
  { key: "sell-in-sell-through", category: "power-bi", serviceKey: "power-bi-dashboards", cover: "bars", slugs: { en: "sell-in-vs-sell-through", pl: "sell-in-sell-through-sell-out", ru: "sell-in-sell-through-sell-out" } },
  { key: "markdown-strategy", category: "pricing", serviceKey: "retail-pricing-analysis", cover: "tag", slugs: { en: "markdown-strategy-fashion-retail" } },
  { key: "assortment-process", category: "assortment", serviceKey: "assortment-planning", cover: "tag", slugs: { en: "assortment-planning-process-fashion-retail" } },
  { key: "category-management", category: "assortment", serviceKey: "assortment-planning", cover: "tag", slugs: { pl: "category-management-w-modzie" } },
  { key: "assortment-matrix", category: "assortment", serviceKey: "assortment-planning", cover: "table", slugs: { ru: "assortimentnaya-matrica-magazina-odezhdy" } },
  { key: "sales-forecasting", category: "excel", serviceKey: "excel-retail-planning-models", cover: "lines", slugs: { pl: "prognozowanie-sprzedazy-w-handlu" } },
  { key: "size-curve", category: "assortment", serviceKey: "assortment-planning", cover: "tag", slugs: { en: "size-curve-from-sales-data", pl: "krzywa-rozmiarow", ru: "razmernaya-matrica-zakupki" } },
  { key: "analyst-roles", category: "careers", serviceKey: "retail-analytics-processes", cover: "lines", slugs: { en: "brand-analyst-vs-business-analyst" } },
  { key: "merchandise-planner-career", category: "careers", serviceKey: "assortment-planning", cover: "bars", slugs: { en: "merchandise-planner-career" } },
  { key: "become-retail-analyst", category: "careers", serviceKey: "retail-analytics-processes", cover: "lines", slugs: { pl: "jak-zostac-analitykiem-w-handlu" } },
  { key: "buyer-and-category-manager", category: "careers", serviceKey: "assortment-planning", cover: "lines", slugs: { ru: "bajer-kategorijnyj-menedzher-tovarnyj-analitik" } },
];

export function postPlan(key: string, lang: Locale) {
  const plan = POSTS.find((p) => p.key === key);
  if (!plan || !plan.slugs[lang]) throw new Error(`No ${lang} article planned for key "${key}"`);
  return { key: plan.key, slug: plan.slugs[lang]!, category: plan.category, serviceKey: plan.serviceKey, cover: plan.cover };
}

export function categoryPlan(key: string, lang: Locale) {
  const c = CATEGORY_SLUGS[key];
  return { key, slug: c[lang], ...(c.service ? { serviceKey: c.service } : {}) };
}
