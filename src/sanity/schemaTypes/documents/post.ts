import { defineField, defineType } from "sanity";
import { groups, languageField, placeholderField, seoField } from "../shared";

export default defineType({
  name: "post",
  title: "Blog article",
  type: "document",
  groups,
  fields: [
    defineField({ name: "title", title: "Title (H1)", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "localizedSlug" }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "category" }] }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({ name: "cover", title: "Cover image", type: "imageWithAlt" }),
    defineField({ name: "publishedAt", title: "Published", type: "datetime" }),
    defineField({ name: "updatedAt", title: "Last meaningful update", type: "datetime" }),
    defineField({ name: "readingMinutes", title: "Reading time, minutes", type: "number" }),
    defineField({ name: "featured", title: "Featured on the blog page", type: "boolean", initialValue: false }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "person" }] }),
    defineField({ name: "body", title: "Body", type: "richText" }),
    defineField({ name: "faq", title: "FAQ", type: "array", of: [{ type: "faqItem" }] }),
    defineField({ name: "service", title: "Related service", type: "reference", to: [{ type: "service" }] }),
    placeholderField,
    seoField,
    languageField,
  ],
  orderings: [{ title: "Newest", name: "newest", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "language", media: "cover" } },
});
