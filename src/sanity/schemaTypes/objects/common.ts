import { defineType } from "sanity";
import { bool, img, str, strings, txt } from "../fields";

/** Heading whose middle part is set in emerald italics: before + accent + after. */
export const accentHeading = defineType({
  name: "accentHeading",
  title: "Heading with accent",
  type: "object",
  fields: [
    str("before", { title: "Text before the accent", required: true }),
    str("accent", { title: "Accent (emerald italics)" }),
    str("after", { title: "Text after the accent" }),
  ],
  preview: {
    select: { before: "before", accent: "accent", after: "after" },
    prepare: ({ before, accent, after }) => ({ title: [before, accent, after].filter(Boolean).join("") }),
  },
});

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    {
      ...str("title", { title: "Meta title", required: true }),
      validation: (r) => r.required().max(65).warning("Keep under ~60 characters"),
    },
    {
      ...txt("description", { title: "Meta description", rows: 3 }),
      validation: (r) => r.required().max(170).warning("Keep within 140–160 characters"),
    },
    bool("noindex", { title: "Hide from search engines" }),
  ],
});

/** A figure with a unit and a caption: "+18 pp — sell-through on core categories". */
export const metric = defineType({
  name: "metric",
  title: "Metric",
  type: "object",
  fields: [
    str("value", { description: "e.g. +18, −31, 98, 30+" }),
    str("unit", { description: "e.g. pp, %, h, days" }),
    str("label", { title: "Caption" }),
  ],
  preview: {
    select: { value: "value", unit: "unit", label: "label" },
    prepare: ({ value, unit, label }) => ({ title: `${value ?? ""} ${unit ?? ""}`.trim(), subtitle: label }),
  },
});

/** Title + text pair: steps, problems, deliverables, tools (label = monogram). */
export const titledText = defineType({
  name: "titledText",
  title: "Title and text",
  type: "object",
  fields: [
    str("label", { title: "Small label", description: "Optional, e.g. STEP 01 or a tool monogram" }),
    str("title", { description: "Self-explanatory, with the key term" }),
    txt("text"),
  ],
  preview: { select: { title: "title", subtitle: "text" } },
});

export const fact = defineType({
  name: "fact",
  title: "Fact",
  type: "object",
  fields: [str("label"), str("value")],
  preview: { select: { title: "label", subtitle: "value" } },
});

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ item",
  type: "object",
  fields: [str("question"), txt("answer", { rows: 5 })],
  preview: { select: { title: "question", subtitle: "answer" } },
});

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [str("label"), str("href", { title: "Path or URL", description: "Internal path in English segments, e.g. /services or /contact" })],
  preview: { select: { title: "label", subtitle: "href" } },
});

/** Only real recommendations, quoted with permission. */
export const recommendation = defineType({
  name: "recommendation",
  title: "Recommendation",
  type: "object",
  fields: [txt("quote", { rows: 4 }), str("name"), str("role"), bool("placeholder", { title: "Placeholder (stand-in text)" })],
  preview: { select: { title: "name", subtitle: "quote" } },
});

export const careerStep = defineType({
  name: "careerStep",
  title: "Career step",
  type: "object",
  fields: [str("period"), str("company"), str("role"), txt("text"), bool("current")],
  preview: { select: { title: "company", subtitle: "period" } },
});

export const consultingFormat = defineType({
  name: "consultingFormat",
  title: "Consulting format",
  type: "object",
  fields: [str("label"), str("title"), txt("suits"), txt("youGet", { title: "You get" }), str("duration"), str("cta", { title: "Button text" })],
  preview: { select: { title: "title", subtitle: "duration" } },
});

export const toolItem = defineType({
  name: "toolItem",
  title: "Tool",
  type: "object",
  fields: [str("id", { title: "ID" }), str("monogram"), str("title"), txt("text"), strings("skills")],
  preview: { select: { title: "title", subtitle: "monogram" } },
});

/** Diploma or certificate. Width and height are read from the image asset. */
export const credential = defineType({
  name: "credential",
  title: "Credential",
  type: "object",
  fields: [
    str("id", { title: "ID" }),
    str("year"),
    str("institution"),
    str("title"),
    img("thumb", { title: "Card preview", description: "Cover for bound diplomas" }),
    img("image", { title: "Full document", description: "Shown in the viewer; form numbers must be redacted" }),
    bool("redacted", { title: "Numbers redacted" }),
  ],
  preview: { select: { title: "title", subtitle: "institution", media: "thumb" } },
});

export default [accentHeading, seo, metric, titledText, fact, faqItem, link, recommendation, careerStep, consultingFormat, toolItem, credential];
