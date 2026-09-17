import { defineField, defineType } from "sanity";
import { languageField, orderField } from "../shared";

export default defineType({
  name: "tool",
  title: "Tool",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Title", type: "string", description: "e.g. Power BI for Retail Reporting" }),
    defineField({ name: "monogram", title: "Monogram", type: "string", description: "2–3 characters: BI, fx, PLM" }),
    defineField({ name: "description", title: "What she does with it", type: "text", rows: 2 }),
    defineField({ name: "skills", title: "Skill chips", type: "array", of: [{ type: "string" }] }),
    orderField,
    languageField,
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
