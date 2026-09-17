import { defineField, defineType } from "sanity";
import { groups, languageField, placeholderField, seoField } from "../shared";

/**
 * Anonymised project. Never name the client or anything traceable to the
 * current employer (market counts, internal project names, SKU counts).
 */
export default defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  groups,
  fields: [
    defineField({ name: "title", title: "Title (H1)", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "localizedSlug" }),
    defineField({
      name: "topics",
      title: "Topics",
      type: "array",
      of: [{ type: "string" }],
      options: { list: ["Assortment", "Pricing", "Product data", "Reporting"] },
    }),
    defineField({ name: "companyType", title: "Type of company", type: "string" }),
    defineField({ name: "summary", title: "Card summary", type: "text", rows: 3 }),
    defineField({ name: "facts", title: "Fact panel", type: "array", of: [{ type: "titledText" }] }),
    defineField({ name: "challengeHeading", title: "Challenge heading", type: "string" }),
    defineField({ name: "challenge", title: "Challenge", type: "richText" }),
    defineField({ name: "actionsHeading", title: "What was done — heading", type: "string" }),
    defineField({ name: "actions", title: "What was done", type: "array", of: [{ type: "titledText" }] }),
    defineField({ name: "resultsHeading", title: "Results heading", type: "string" }),
    defineField({ name: "results", title: "Results", type: "array", of: [{ type: "metric" }] }),
    defineField({ name: "toolsHeading", title: "Tools heading", type: "string" }),
    defineField({ name: "tools", title: "Tools", type: "array", of: [{ type: "reference", to: [{ type: "tool" }] }] }),
    defineField({ name: "service", title: "Related service", type: "reference", to: [{ type: "service" }] }),
    defineField({ name: "dashboardImage", title: "Dashboard illustration (optional)", type: "imageWithAlt" }),
    defineField({ name: "publishedAt", title: "Published", type: "datetime" }),
    placeholderField,
    seoField,
    languageField,
  ],
  preview: { select: { title: "title", subtitle: "language" } },
});
