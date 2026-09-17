import { defineField, defineType } from "sanity";

/** A figure with a unit and a caption: "+18 pp — sell-through on core categories". */
export const metric = defineType({
  name: "metric",
  title: "Metric",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Value", type: "string", description: "e.g. +18, −31, 98, 30+" }),
    defineField({ name: "unit", title: "Unit", type: "string", description: "e.g. pp, %, h, days" }),
    defineField({ name: "label", title: "Caption", type: "string" }),
  ],
  preview: {
    select: { value: "value", unit: "unit", label: "label" },
    prepare: ({ value, unit, label }) => ({ title: `${value ?? ""} ${unit ?? ""}`.trim(), subtitle: label }),
  },
});

/** Title + text pair used for steps, problems, deliverables. */
export const titledText = defineType({
  name: "titledText",
  title: "Title and text",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Small label", type: "string", description: "Optional, e.g. STEP 01" }),
    defineField({ name: "title", title: "Title", type: "string", description: "Self-explanatory, with the key term" }),
    defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "title", subtitle: "text" } },
});

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ item",
  type: "object",
  fields: [
    defineField({ name: "question", title: "Question", type: "string" }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 4 }),
  ],
  preview: { select: { title: "question", subtitle: "answer" } },
});

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "href", title: "URL or path", type: "string", description: "e.g. /contact or https://…" }),
  ],
});

/** Section heading with an optional lead paragraph. */
export const sectionHeading = defineType({
  name: "sectionHeading",
  title: "Section heading",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Heading (H2)", type: "string", description: "Self-explanatory, with the key term" }),
    defineField({ name: "subtitle", title: "Lead text", type: "text", rows: 2 }),
  ],
});

/** Image with required alt text. */
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
});

export default [metric, titledText, faqItem, link, sectionHeading, imageWithAlt];
