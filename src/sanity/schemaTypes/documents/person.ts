import { defineField, defineType } from "sanity";
import { languageField, placeholderField } from "../shared";

/**
 * Tatsiana herself, one per language. Feeds the About page, the About teaser,
 * author boxes and the Person JSON-LD.
 *
 * Discretion rule: the current employer is never named anywhere — not here,
 * not in schema (no worksFor).
 */
export default defineType({
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", description: "RU: Татьяна Бандюк" }),
    defineField({ name: "jobTitle", title: "Positioning / job title", type: "string" }),
    defineField({ name: "shortBio", title: "Short bio (teaser, author box)", type: "text", rows: 4 }),
    defineField({ name: "bio", title: "Full bio", type: "richText" }),
    defineField({ name: "photo", title: "Portrait", type: "imageWithAlt" }),
    defineField({ name: "workingPhoto", title: "Working-moment photo", type: "imageWithAlt" }),
    defineField({ name: "signature", title: "Signature text", type: "string", initialValue: "Tatsiana" }),
    defineField({
      name: "languages",
      title: "Working languages",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "language", title: "Language", type: "string" }),
            defineField({ name: "level", title: "Level", type: "string" }),
          ],
          preview: { select: { title: "language", subtitle: "level" } },
        },
      ],
    }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "education",
      title: "Education",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "degree", title: "Degree", type: "string" }),
            defineField({ name: "institution", title: "Institution", type: "string" }),
            defineField({ name: "years", title: "Years", type: "string" }),
          ],
          preview: { select: { title: "degree", subtitle: "institution" } },
        },
      ],
    }),
    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "knowsAbout",
      title: "Expertise keywords (for search engines and AI)",
      type: "array",
      of: [{ type: "string" }],
    }),
    placeholderField,
    languageField,
  ],
  preview: { select: { title: "name", subtitle: "language" } },
});
