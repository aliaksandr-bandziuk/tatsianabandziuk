import { defineField, defineType } from "sanity";
import { groups, languageField, placeholderField, seoField } from "../shared";

/** Free templates page and the signup panel shown across the site. */
export default defineType({
  name: "leadMagnet",
  title: "Free templates",
  type: "document",
  groups,
  fields: [
    defineField({ name: "title", title: "Heading", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "localizedSlug" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({
      name: "items",
      title: "Files",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "What is inside", type: "text", rows: 3 }),
            defineField({ name: "preview", title: "Preview image", type: "imageWithAlt" }),
            defineField({ name: "file", title: "File", type: "file" }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
    defineField({ name: "buttonLabel", title: "Button label", type: "string" }),
    defineField({ name: "note", title: "Small print", type: "string" }),
    placeholderField,
    seoField,
    languageField,
  ],
});
