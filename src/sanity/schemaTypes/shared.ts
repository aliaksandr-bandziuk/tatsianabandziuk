import { defineField } from "sanity";

/**
 * Fields every translatable document carries. `language` is managed by
 * @sanity/document-internationalization: one document per language, linked
 * through translation.metadata. Do not edit it by hand.
 */
export const languageField = defineField({
  name: "language",
  type: "string",
  readOnly: true,
  hidden: true,
});

/**
 * Marks content that is still a stand-in (the site is being prepared before
 * Tatsiana has reviewed it). Search the dataset for placeholder == true before
 * launch and replace every hit.
 */
export const placeholderField = defineField({
  name: "placeholder",
  title: "Placeholder content",
  description: "On while this text or figure is a stand-in. Must be off everywhere before launch.",
  type: "boolean",
  initialValue: true,
});

export const seoField = defineField({
  name: "seo",
  title: "SEO",
  type: "seo",
  group: "seo",
});

export const orderField = defineField({
  name: "order",
  title: "Order",
  type: "number",
  description: "Lower numbers come first.",
});

export const groups = [
  { name: "content", title: "Content", default: true },
  { name: "seo", title: "SEO" },
];

/** Mini-chart drawn on service and case-study cards (see the design). */
export const chartOptions = [
  { title: "Size curve (bars)", value: "sizeCurve" },
  { title: "Price ladder (line)", value: "priceLadder" },
  { title: "Dashboard layout", value: "dashboard" },
  { title: "Open-to-buy table", value: "otbTable" },
  { title: "Attribute completeness", value: "completeness" },
  { title: "Reporting calendar", value: "calendar" },
];
