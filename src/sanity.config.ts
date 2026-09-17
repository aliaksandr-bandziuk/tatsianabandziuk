import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { documentInternationalization } from "@sanity/document-internationalization";
import { schemaTypes, TRANSLATED_TYPES } from "./sanity/schemaTypes";
import { i18n } from "./i18n.config";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET as string;

export default defineConfig({
  basePath: "/admin",
  name: "tatsianabandziuk",
  title: "Tatsiana Bandziuk",
  projectId,
  dataset,

  plugins: [
    structureTool(),
    visionTool(),
    documentInternationalization({
      supportedLanguages: i18n.languages,
      schemaTypes: TRANSLATED_TYPES,
    }),
  ],

  schema: {
    types: schemaTypes,
    // New documents are created through the language menu of the i18n
    // plugin, so the plain "create" templates for translated types are hidden.
    templates: (prev) => prev.filter((template) => !TRANSLATED_TYPES.includes(template.id)),
  },
});
