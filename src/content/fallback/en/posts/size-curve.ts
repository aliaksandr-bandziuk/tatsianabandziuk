import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: "This section is being written." },
];

// Stand-in: metadata, lead and FAQ are final; the body is the planned H2 skeleton (task 02).
export const post: Post = {
  ...postPlan("size-curve", "en"),
  title: "How to Build a Retail Size Curve from Last Season’s Sales Data",
  h1: { before: "How to Build a Retail Size Curve from", accent: "Last Season’s Sales Data" },
  excerpt: "How to clean sales data of stock-outs, returns and promotions before calculating size ratios per category, market and store cluster.",
  lead: "A retail size curve is the share of units a category should be bought in each size, for example 10% XS, 25% S, 35% M, 20% L and 10% XL. To build a reliable one from last season’s sales, you first remove weeks with stock-outs, adjust for returns and exclude promotional peaks, then calculate size ratios per category and market.",
  date: "2026-05-15",
  readingMinutes: 7,
  body: [
    ...section("what-size-curve-means", "What a Size Curve Means in Retail Buying"),
    ...section("raw-sales-wrong-curve", "Why Raw Sales Data Gives a Wrong Size Curve"),
    ...section("clean-sales-data", "Three Steps to Clean Sales Data Before Size Curve Analysis"),
    ...section("size-ratios-excel", "How to Calculate Size Ratios per Category in Excel"),
    ...section("size-curves-markets", "Size Curves per Market and Store Cluster"),
    ...section("size-integrity", "Size Integrity Monitoring After the Buy"),
  ],
  faqTitle: "Size Curve Analysis: Common Questions",
  faq: [
    {
      question: "What is a size curve in retail buying?",
      answer:
        "A size curve is the planned distribution of units across sizes for a product or category, expressed as percentages that add up to 100%. Buyers apply it to the total quantity of an option to decide how many units of each size to order. A good curve reduces both broken size runs and leftover stock in the extremes.",
    },
    {
      question: "How do you calculate a size curve from sales?",
      answer:
        "Take net unit sales by size for a category over comparable weeks, after removing periods when sizes were out of stock. Divide the sales of each size by the category total to get its share. Calculate curves separately for categories with different fits, such as tops and trousers, and round the result to the pack or ratio sizes your suppliers use.",
    },
    {
      question: "How do stock-outs distort a size curve?",
      answer:
        "When a size sells out, its sales stop while other sizes keep selling, so the data understates demand for the popular sizes and overstates it for the rest. A curve built on that data buys even less of the sizes that ran out, and the problem repeats next season. Using only weeks when all sizes were available, or estimating lost sales, corrects it.",
    },
    {
      question: "How often should size curves be recalculated?",
      answer:
        "Once a season is a sensible minimum, before the buy, using the latest comparable season. Recalculate sooner when the customer base changes, for example after entering a new market, changing the fit block or moving more sales online. Between recalculations, monitor size availability in-season to spot curves that are drifting.",
    },
  ],
  placeholder: true,
  seo: {
    title: "Size Curve Analysis in Retail: Size Ratios from Sales Data",
    description: "How to build a retail size curve from sales data: remove stock-outs, returns and promo weeks, then calculate size ratios per category and market.",
  },
};
