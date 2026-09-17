import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: "This section is being written." },
];

// Stand-in: metadata, lead and FAQ are final; the body is the planned H2 skeleton (task 02).
export const post: Post = {
  ...postPlan("dax-measures", "en"),
  title: "Five DAX Measures Every Retail KPI Dashboard Needs",
  h1: { before: "Five DAX Measures Every", accent: "Retail KPI Dashboard Needs" },
  excerpt: "Stock cover, full-price share, returns rate, weeks of supply and contribution margin as DAX measures for a Power BI retail dashboard.",
  lead: "A retail KPI dashboard in Power BI needs five DAX measures beyond sales and units: stock cover, full-price sales share, returns rate, weeks of supply and contribution margin. Written as measures rather than calculated columns, they recalculate correctly for any market, category or week the viewer selects.",
  date: "2026-07-10",
  readingMinutes: 8,
  body: [
    ...section("measures-vs-columns", "DAX Measures vs Calculated Columns for Retail KPIs"),
    ...section("stock-cover", "Stock Cover Measure in DAX"),
    ...section("full-price-share", "Full-Price Sales Share Measure in DAX"),
    ...section("returns-rate", "Returns Rate Measure in DAX"),
    ...section("weeks-of-supply", "Weeks of Supply Measure in DAX"),
    ...section("contribution-margin", "Contribution Margin Measure in DAX"),
    ...section("running-total", "Running Total DAX Pattern for Season-to-Date KPIs"),
  ],
  faqTitle: "DAX Measures for Retail KPIs: Common Questions",
  faq: [
    {
      question: "What is a DAX measure in Power BI?",
      answer:
        "A DAX measure is a formula that Power BI evaluates at query time in the context of the current visual, slicers and filters. Unlike a calculated column, it is not stored row by row, so the same measure returns the right value for a single store, a category or the whole season. Ratios such as sell-through or returns rate should always be measures.",
    },
    {
      question: "How do I create a running total in DAX?",
      answer:
        "The usual pattern is CALCULATE([Sales], FILTER(ALL('Date'[Date]), 'Date'[Date] <= MAX('Date'[Date]))), which sums everything up to the last date in the current context. For season-to-date figures, keep the season filter and remove only the date filter, or use DATESYTD with a year-end argument when the season follows a fixed financial year. A proper date table marked as such is required for either approach.",
    },
    {
      question: "Which retail KPIs should be DAX measures?",
      answer:
        "Every KPI that is a ratio or depends on the selected period should be a measure: sell-through, stock cover, weeks of supply, full-price share, returns rate, margin percentage and GMROI. Attributes that describe a product, such as price tier or season code, belong in columns. A simple test: if adding up the value across rows gives a wrong answer, it has to be a measure.",
    },
    {
      question: "How do I check a DAX measure against Excel?",
      answer:
        "Pick a small, well-known slice, such as one category in one week, and export the underlying rows to Excel. Recalculate the KPI there with ordinary formulas and compare it with the measure shown in a Power BI table filtered to the same slice. If the figures differ, check filter context first: blank rows, inactive relationships and missing date filters cause most mismatches.",
    },
  ],
  placeholder: true,
  seo: {
    title: "DAX Measures for a Retail KPI Dashboard in Power BI",
    description: "Five DAX measures for a retail KPI dashboard in Power BI: stock cover, full-price share, returns rate, weeks of supply and contribution margin.",
  },
};
