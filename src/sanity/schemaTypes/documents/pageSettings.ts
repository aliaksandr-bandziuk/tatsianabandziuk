import { defineField, defineType } from "sanity";
import { groups, languageField, seoField } from "../shared";

/**
 * Heading, intro and SEO for the fixed listing pages. One document per page
 * per language; `page` says which one.
 */
export const PAGE_KEYS = [
  { title: "Services overview", value: "services" },
  { title: "Case studies overview", value: "caseStudies" },
  { title: "Blog overview", value: "blog" },
  { title: "About", value: "about" },
  { title: "Contact", value: "contact" },
  { title: "Courses (coming soon)", value: "courses" },
  { title: "Page not found", value: "notFound" },
];

export default defineType({
  name: "pageSettings",
  title: "Page texts",
  type: "document",
  groups,
  fields: [
    defineField({ name: "page", title: "Page", type: "string", options: { list: PAGE_KEYS } }),
    defineField({ name: "eyebrow", title: "Small label above the heading", type: "string" }),
    defineField({ name: "h1", title: "Heading (H1)", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
    defineField({ name: "sections", title: "Section headings", type: "array", of: [{ type: "sectionHeading" }] }),
    defineField({ name: "blocks", title: "Cards / steps", type: "array", of: [{ type: "titledText" }] }),
    defineField({ name: "faq", title: "FAQ", type: "array", of: [{ type: "faqItem" }] }),
    defineField({ name: "ctaTitle", title: "Call-to-action heading", type: "string" }),
    defineField({ name: "ctaText", title: "Call-to-action text", type: "text", rows: 3 }),
    seoField,
    languageField,
  ],
  preview: { select: { title: "page", subtitle: "language" } },
});
