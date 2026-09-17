import { defineType } from "sanity";
import { num, objects, paragraphs, str, strings, txt } from "../fields";

/**
 * Article body blocks (Post.body, CalculatorPage.body). Each Sanity type maps
 * to one `ArticleBlock` variant: the loader turns `_type` into `type`
 * (ARTICLE_BLOCK_TYPES in src/sanity/loaders.ts).
 */
const CALCULATOR_KINDS = ["marginMarkup", "sellThrough", "gmroi", "stockTurn", "openToBuy"];

const block = (name: string, title: string, fields: ReturnType<typeof str>[], previewField: string) =>
  defineType({
    name,
    title,
    type: "object",
    fields,
    preview: {
      select: { value: previewField },
      prepare: ({ value }) => ({ title: typeof value === "string" ? value.slice(0, 90) : title, subtitle: title }),
    },
  });

export const articleParagraph = block("articleParagraph", "Paragraph", [txt("text", { rows: 5 })], "text");

export const articleHeading = block(
  "articleHeading",
  "Heading (H2)",
  [
    str("text", { description: "Self-explanatory, with the key term of the section" }),
    str("id", { title: "Anchor", description: "Used in the table of contents, e.g. formula" }),
  ],
  "text",
);

export const articleFormula = block("articleFormula", "Formula", [str("text")], "text");

export const articleCode = block("articleCode", "Code (DAX, Excel, SQL)", [txt("code", { rows: 8 }), str("caption")], "caption");

export const articleChart = block("articleChart", "Chart", [str("title"), str("legend"), str("caption")], "title");

export const articleList = block("articleList", "List", [paragraphs("items")], "items.0");

export const articleCalculator = block(
  "articleCalculator",
  "Calculator",
  [
    str("kind", { list: CALCULATOR_KINDS, required: true, description: "Field ids per kind: src/content/calculators.ts" }),
    str("title"),
    objects("labels", [str("id", { title: "Field id" }), str("label")], {
      description: "One label per input and result of this kind",
      preview: { title: "label", subtitle: "id" },
    }),
    txt("note"),
  ],
  "title",
);

export const articleVideo = block(
  "articleVideo",
  "YouTube video",
  [
    str("youtubeId", { title: "YouTube ID", required: true, description: "The part after v= in the video URL" }),
    str("title"),
    txt("description"),
    str("uploadDate", { description: "ISO date of the upload, e.g. 2026-10-01" }),
    str("duration", { description: "ISO 8601, e.g. PT7M30S" }),
    paragraphs("transcript", { description: "Short transcript or chapter summary" }),
  ],
  "title",
);

export const articleTable = block(
  "articleTable",
  "Table",
  [
    str("caption"),
    objects(
      "columns",
      [
        str("label"),
        str("kind", { list: ["text", "number"] }),
        str("format", { list: ["scale", "bars"] }),
        str("suffix"),
      ],
      { preview: { title: "label", subtitle: "kind" } },
    ),
    objects("rows", [strings("cells", { description: "Numbers in number columns are written as plain numbers" }), str("trend", { list: ["up", "down", "flat"] })], {
      preview: { title: "cells.0", subtitle: "trend" },
    }),
    num("trendColumn", { description: "Index of the column that shows the trend icon (0 = first)" }),
  ],
  "caption",
);

export const ARTICLE_BLOCKS = [
  articleParagraph,
  articleHeading,
  articleFormula,
  articleCode,
  articleChart,
  articleList,
  articleCalculator,
  articleVideo,
  articleTable,
];

export const ARTICLE_BLOCK_NAMES = ARTICLE_BLOCKS.map((b) => b.name);
