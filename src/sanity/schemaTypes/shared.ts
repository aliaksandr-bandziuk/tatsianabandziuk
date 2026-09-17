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
 * Language-independent id shared by all language versions (the English slug
 * at the time of creation). Cross-references use it: serviceKey,
 * caseStudyKey, post.category, relatedPostKey. Never change it after publishing.
 */
export const keyField = defineField({
  name: "key",
  title: "Key",
  type: "string",
  description: "Same in every language version; other documents refer to it. Do not change.",
  validation: (r) => r.required().regex(/^[a-z0-9-]+$/, { name: "kebab-case" }),
});

export const slugField = defineField({
  name: "slug",
  title: "URL slug",
  type: "localizedSlug",
  validation: (r) => r.required(),
});

/**
 * Marks content that is still a stand-in (the site is being prepared before
 * Tatsiana has reviewed it). Search the dataset for placeholder == true before
 * launch and replace every hit.
 */
export const placeholderField = defineField({
  name: "placeholder",
  title: "Placeholder content",
  description: "On while this text is a stand-in. Must be off everywhere before launch.",
  type: "boolean",
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
  description: "Lower numbers come first in lists.",
});

export const groups = [
  { name: "content", title: "Content", default: true },
  { name: "faq", title: "FAQ" },
  { name: "seo", title: "SEO" },
];

/** Mini-chart drawn on service cards (see the design). */
export const chartOptions = [
  { title: "Size curve (bars)", value: "sizeCurve" },
  { title: "Price ladder (line)", value: "priceLadder" },
  { title: "Dashboard layout", value: "dashboard" },
  { title: "Open-to-buy table", value: "otbTable" },
  { title: "Attribute completeness", value: "completeness" },
  { title: "Reporting calendar", value: "calendar" },
];
