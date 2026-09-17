import { defineField, defineType } from "sanity";
import { languageField, orderField, placeholderField } from "../shared";

/**
 * Only real recommendations, quoted with the author's permission (e.g. from
 * LinkedIn). Never invent names. Placeholders stay flagged and are hidden in
 * production unless SHOW_PLACEHOLDERS is on.
 */
export default defineType({
  name: "recommendation",
  title: "Recommendation",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 5 }),
    defineField({ name: "authorName", title: "Author", type: "string" }),
    defineField({ name: "authorRole", title: "Role", type: "string" }),
    defineField({ name: "relationship", title: "Relationship", type: "string", description: "e.g. worked together on assortment planning" }),
    defineField({ name: "avatar", title: "Photo", type: "imageWithAlt" }),
    defineField({ name: "sourceUrl", title: "Source (LinkedIn)", type: "url" }),
    defineField({ name: "permissionGranted", title: "Author agreed to publication", type: "boolean", initialValue: false }),
    orderField,
    placeholderField,
    languageField,
  ],
  preview: { select: { title: "authorName", subtitle: "quote" } },
});
