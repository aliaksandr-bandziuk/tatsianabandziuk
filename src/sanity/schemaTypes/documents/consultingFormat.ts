import { defineField, defineType } from "sanity";
import { languageField, orderField, placeholderField } from "../shared";

/** “Two-Week Retail Data Diagnostic”, “Project”, “Ongoing support”. */
export default defineType({
  name: "consultingFormat",
  title: "Consulting format",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "suits", title: "Suits", type: "text", rows: 2 }),
    defineField({ name: "youGet", title: "You get", type: "text", rows: 2 }),
    defineField({ name: "duration", title: "Typical duration", type: "string" }),
    defineField({ name: "ctaLabel", title: "Link label", type: "string" }),
    orderField,
    placeholderField,
    languageField,
  ],
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
});
