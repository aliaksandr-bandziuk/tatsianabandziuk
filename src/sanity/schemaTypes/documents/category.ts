import { defineField, defineType } from "sanity";
import { groups, languageField, orderField, seoField } from "../shared";

export default defineType({
  name: "category",
  title: "Blog category",
  type: "document",
  groups,
  fields: [
    defineField({ name: "title", title: "Chip label", type: "string", description: "e.g. Power BI" }),
    defineField({ name: "slug", title: "Slug", type: "localizedSlug" }),
    defineField({ name: "h1", title: "Page heading (H1)", type: "string" }),
    defineField({ name: "description", title: "Intro", type: "text", rows: 3 }),
    defineField({ name: "service", title: "Related service", type: "reference", to: [{ type: "service" }] }),
    orderField,
    seoField,
    languageField,
  ],
  preview: { select: { title: "title", subtitle: "language" } },
});
