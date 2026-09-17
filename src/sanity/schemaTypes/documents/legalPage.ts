import { defineField, defineType } from "sanity";
import { groups, languageField, seoField } from "../shared";

export default defineType({
  name: "legalPage",
  title: "Legal page",
  type: "document",
  groups,
  fields: [
    defineField({ name: "title", title: "Title (H1)", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "localizedSlug" }),
    defineField({ name: "updatedAt", title: "Last updated", type: "date" }),
    defineField({ name: "body", title: "Body", type: "richText" }),
    seoField,
    languageField,
  ],
});
