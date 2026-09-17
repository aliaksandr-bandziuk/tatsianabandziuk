import { defineField, defineType } from "sanity";
import { languageField, orderField, placeholderField } from "../shared";

/** One career step for the timeline. */
export default defineType({
  name: "experience",
  title: "Career step",
  type: "document",
  fields: [
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({
      name: "company",
      title: "Company as shown",
      type: "string",
      description: "The current employer is always shown generically: “International fashion brand”.",
    }),
    defineField({ name: "period", title: "Period", type: "string", description: "e.g. 2018 — 2021 or 2021 — today" }),
    defineField({ name: "current", title: "Current role", type: "boolean", initialValue: false }),
    defineField({ name: "description", title: "What she did", type: "text", rows: 3 }),
    defineField({ name: "highlights", title: "Highlights", type: "array", of: [{ type: "string" }] }),
    orderField,
    placeholderField,
    languageField,
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "company", subtitle: "period" } },
});
