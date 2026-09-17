import { defineType } from "sanity";
import { bool, list, num, paragraphs, str, strings, txt, typed } from "../fields";
import { ARTICLE_BLOCK_NAMES } from "../objects/article";
import { chartOptions, groups, keyField, languageField, orderField, placeholderField, seoField, slugField } from "../shared";

const faqFields = [str("faqTitle", { title: "FAQ heading", group: "faq" }), list("faq", "faqItem", { title: "FAQ", group: "faq" })];

const refKey = (name: string, title: string, description: string) => str(name, { title, description, group: "content" });

const CALCULATOR_KINDS = [
  { title: "Margin and markup", value: "marginMarkup" },
  { title: "Sell-through rate", value: "sellThrough" },
  { title: "GMROI", value: "gmroi" },
  { title: "Stock turn and weeks of cover", value: "stockTurn" },
  { title: "Open to buy", value: "openToBuy" },
];

const preview = (title: string, subtitle = "key") => ({
  select: { title, language: "language", sub: subtitle, placeholder: "placeholder" },
  prepare: ({ title, language, sub, placeholder }: Record<string, unknown>) => ({
    title: String(title ?? ""),
    subtitle: [String(language ?? "").toUpperCase(), sub, placeholder ? "placeholder" : ""].filter(Boolean).join(" · "),
  }),
});

const common = [languageField, { ...keyField, group: "content" }, { ...slugField, group: "content" }, { ...orderField, group: "content" }, seoField];

/** Service */
export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  groups,
  fields: [
    ...common,
    str("number", { group: "content", description: "Card number, e.g. 01" }),
    str("cardTitle", { group: "content", required: true }),
    txt("cardText", { group: "content" }),
    str("chart", { group: "content", list: chartOptions, title: "Card mini-chart" }),
    str("chartCaption", { group: "content" }),
    str("breadcrumb", { group: "content" }),
    typed("h1", "accentHeading", { title: "H1", group: "content" }),
    txt("intro", { group: "content", rows: 4 }),
    str("factsTitle", { group: "content" }),
    list("facts", "fact", { group: "content" }),
    txt("factsNote", { group: "content" }),
    str("problemsTitle", { group: "content" }),
    list("problems", "titledText", { group: "content" }),
    str("includesTitle", { group: "content" }),
    txt("includesLead", { group: "content" }),
    list("includes", "titledText", { group: "content" }),
    str("resultsTitle", { group: "content" }),
    list("results", "metric", { group: "content" }),
    str("toolsTitle", { group: "content" }),
    list("tools", "titledText", { group: "content", description: "Label = tool monogram" }),
    refKey("caseStudyKey", "Related case study (key)", "Key of a case study, e.g. assortment-planning-core-categories"),
    str("recommendationTitle", { group: "content" }),
    typed("recommendation", "recommendation", { group: "content", collapsed: true }),
    str("ctaTitle", { group: "content" }),
    txt("ctaText", { group: "content" }),
    ...faqFields,
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: preview("cardTitle"),
});

/** CaseStudy */
export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  groups,
  fields: [
    ...common,
    strings("topics", {
      group: "content",
      description: "Slicer filter keys: assortment, pricing, product-data, reporting",
    }),
    str("tag", { group: "content" }),
    str("title", { group: "content", required: true }),
    typed("h1", "accentHeading", { title: "H1", group: "content" }),
    txt("summary", { group: "content" }),
    txt("intro", { group: "content", rows: 4 }),
    strings("cardMetrics", { group: "content", description: "Exactly two short figures for the card" }),
    str("dashboard", { group: "content", list: ["bars", "trend", "blocks"], title: "Card dashboard" }),
    str("breadcrumb", { group: "content" }),
    list("facts", "fact", { group: "content" }),
    txt("factsNote", { group: "content" }),
    str("challengeTitle", { group: "content" }),
    paragraphs("challenge", { group: "content" }),
    strings("challengePoints", { group: "content" }),
    str("actionsTitle", { group: "content" }),
    list("actions", "titledText", { group: "content" }),
    str("resultsTitle", { group: "content" }),
    list("results", "metric", { group: "content" }),
    str("toolsTitle", { group: "content" }),
    list("tools", "titledText", { group: "content" }),
    refKey("serviceKey", "Related service (key)", "Key of a service, e.g. assortment-planning"),
    str("serviceTitle", { group: "content" }),
    txt("serviceText", { group: "content" }),
    strings("serviceChips", { group: "content" }),
    txt("note", { group: "content" }),
    str("publishedAt", { group: "content", description: "ISO date, e.g. 2026-09-16" }),
    ...faqFields,
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: preview("title"),
});

/** Post (blog article) */
export const post = defineType({
  name: "post",
  title: "Article",
  type: "document",
  groups,
  fields: [
    ...common,
    { ...placeholderField, group: "content" },
    refKey("category", "Rubric (key)", "Key of a category, e.g. merchandise-planning"),
    str("title", { group: "content", required: true }),
    typed("h1", "accentHeading", { title: "H1", group: "content" }),
    txt("excerpt", { group: "content" }),
    txt("lead", { group: "content", rows: 4 }),
    str("date", { group: "content", description: "ISO date, e.g. 2026-09-16" }),
    num("readingMinutes", { group: "content" }),
    str("cover", { group: "content", list: ["bars", "tag", "swatches", "table", "lines"], title: "Card cover" }),
    bool("featured", { group: "content", description: "Large card at the top of the blog (one per language)" }),
    list("body", ARTICLE_BLOCK_NAMES, { group: "content", title: "Article body" }),
    refKey("serviceKey", "Related service (key)", "Key of a service"),
    ...faqFields,
  ],
  orderings: [{ title: "Date, newest", name: "date", by: [{ field: "date", direction: "desc" }] }],
  preview: preview("title", "category"),
});

/** Category (blog rubric) */
export const category = defineType({
  name: "category",
  title: "Rubric",
  type: "document",
  groups,
  fields: [
    ...common,
    str("label", { group: "content", required: true }),
    str("h1", { title: "H1", group: "content" }),
    txt("intro", { group: "content", rows: 4 }),
    refKey("serviceKey", "Related service (key)", "Optional"),
    ...faqFields,
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: preview("label"),
});

/** CalculatorPage (/tools/<slug>). The body must contain a calculator block of the same kind. */
export const calculatorPage = defineType({
  name: "calculatorPage",
  title: "Calculator page",
  type: "document",
  groups,
  fields: [
    ...common,
    str("kind", { group: "content", list: CALCULATOR_KINDS, required: true }),
    str("cardTitle", { group: "content", required: true }),
    txt("cardText", { group: "content" }),
    str("breadcrumb", { group: "content" }),
    typed("h1", "accentHeading", { title: "H1", group: "content" }),
    txt("lead", { group: "content", description: "1–2 sentences: what the calculator does" }),
    list("body", ARTICLE_BLOCK_NAMES, { group: "content", title: "Page body" }),
    refKey("relatedPostKey", "Related article (key)", "Optional"),
    refKey("serviceKey", "Related service (key)", "Key of a service"),
    ...faqFields,
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: preview("cardTitle", "kind"),
});

export default [service, caseStudy, post, category, calculatorPage];
