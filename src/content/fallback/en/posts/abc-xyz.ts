import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: "This section is being written." },
];

// Stand-in: metadata, lead and FAQ are final; the body is the planned H2 skeleton (task 02).
export const post: Post = {
  ...postPlan("abc-xyz", "en"),
  title: "ABC and XYZ Analysis for Retail Assortment in Excel",
  h1: { before: "ABC and XYZ Analysis for", accent: "Retail Assortment in Excel" },
  excerpt: "How to run ABC analysis by sales contribution and XYZ analysis by demand stability in Excel, and use the matrix for assortment decisions.",
  lead: "ABC analysis ranks products by their share of sales or margin, so that A items bring roughly the first 80%, B the next 15% and C the last 5%; XYZ analysis groups the same products by how stable their weekly demand is. Combined in Excel, the two give a nine-cell matrix that shows which products to protect, which to replenish automatically and which to review.",
  date: "2026-06-19",
  readingMinutes: 8,
  body: [
    ...section("what-abc-analysis-shows", "What ABC Analysis Shows in Retail"),
    ...section("abc-analysis-excel", "How to Do ABC Analysis in Excel"),
    ...section("xyz-analysis", "XYZ Analysis for Demand Stability"),
    ...section("abc-xyz-matrix", "ABC-XYZ Matrix for Assortment Decisions"),
    ...section("abc-analysis-mistakes", "ABC Analysis Mistakes in Fashion"),
  ],
  faqTitle: "ABC and XYZ Analysis: Common Questions",
  faq: [
    {
      question: "What is ABC analysis in retail?",
      answer:
        "ABC analysis is a Pareto-based ranking of products by their contribution to sales, margin or units. Products are sorted from highest to lowest, a cumulative share is calculated, and the list is cut into class A (about 80% of the total), B (the next 15%) and C (the remaining 5%). It shows where attention and stock investment matter most.",
    },
    {
      question: "How do I do ABC analysis in Excel?",
      answer:
        "Put one row per product with its sales value, sort the table in descending order and add a column with each product’s share of the total. Add a running total of that share, then classify with a formula such as =IF(D2<=80%,\"A\",IF(D2<=95%,\"B\",\"C\")). A pivot table or SORTBY with SUM keeps the ranking up to date when new weeks are added.",
    },
    {
      question: "What is the difference between ABC and XYZ analysis?",
      answer:
        "ABC analysis measures how much a product contributes; XYZ analysis measures how predictable its demand is. XYZ uses the coefficient of variation of weekly or monthly sales: typically X below 10–25%, Y up to about 50%, and Z above that, with thresholds set per business. Together they separate stable best-sellers from volatile ones that need a different buying approach.",
    },
    {
      question: "Does ABC-XYZ analysis work for fashion?",
      answer:
        "It works well for continuity lines, basics and replenished items with several seasons of history. For seasonal fashion, most products live for only a few weeks, so the analysis is better run on categories, price tiers or attribute groups than on individual styles. Stock-outs and markdown weeks should be removed first, or they distort both classes.",
    },
  ],
  placeholder: true,
  seo: {
    title: "ABC and XYZ Analysis for Retail Assortment in Excel",
    description: "How to do ABC analysis and XYZ analysis for a retail assortment in Excel, read the ABC-XYZ matrix and avoid the usual mistakes in fashion.",
  },
};
