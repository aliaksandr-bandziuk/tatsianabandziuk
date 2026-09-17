import { defineField, defineType } from "sanity";
import { i18n } from "@/i18n.config";

/**
 * Slug stored as slug.<lang>.current (the webhook, IndexNow and the loaders
 * read slug[language]). Only the field of the document's own language is shown.
 */
export default defineType({
  name: "localizedSlug",
  title: "Localized Slug",
  type: "object",
  fields: i18n.languages.map((lang) =>
    defineField({
      name: lang.id,
      title: `Slug (${lang.title})`,
      type: "slug",
      hidden: ({ document }) => Boolean(document?.language) && document?.language !== lang.id,
      options: {
        source: (doc: Record<string, unknown>) => String(doc.title ?? doc.cardTitle ?? doc.label ?? doc.h1 ?? ""),
      },
    }),
  ),
});
