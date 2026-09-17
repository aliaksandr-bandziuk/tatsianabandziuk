import type { ArticleBlock } from "@/content/types";

/** ArticleBlock `type` → Sanity object type (schemaTypes/objects/article.ts). */
export const ARTICLE_BLOCK_TYPES: Record<ArticleBlock["type"], string> = {
  p: "articleParagraph",
  h2: "articleHeading",
  formula: "articleFormula",
  code: "articleCode",
  chart: "articleChart",
  list: "articleList",
  calculator: "articleCalculator",
  video: "articleVideo",
  table: "articleTable",
};

/** Sanity object type → ArticleBlock `type`. */
export const ARTICLE_BLOCK_KINDS: Record<string, ArticleBlock["type"]> = Object.fromEntries(
  Object.entries(ARTICLE_BLOCK_TYPES).map(([kind, type]) => [type, kind]),
) as Record<string, ArticleBlock["type"]>;
