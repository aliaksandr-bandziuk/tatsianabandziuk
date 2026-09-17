import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Article body. H2/H3 must carry the key term of their section
 * (editorial rule, see CLAUDE.md).
 */
export default defineType({
  name: "richText",
  title: "Rich text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({ name: "href", type: "string", title: "URL or path" }),
              defineField({ name: "blank", type: "boolean", title: "Open in new tab", initialValue: false }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({ type: "imageWithAlt" }),
    defineArrayMember({
      name: "codeBlock",
      title: "Code (DAX, Power Query, Excel formula)",
      type: "object",
      fields: [
        defineField({
          name: "language",
          title: "Language",
          type: "string",
          options: { list: ["DAX", "M (Power Query)", "Excel", "SQL", "Other"] },
        }),
        defineField({ name: "code", title: "Code", type: "text", rows: 10 }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
      preview: { select: { title: "language", subtitle: "code" } },
    }),
    defineArrayMember({
      name: "callout",
      title: "Callout",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "text", title: "Text", type: "text", rows: 3 }),
      ],
    }),
  ],
});
