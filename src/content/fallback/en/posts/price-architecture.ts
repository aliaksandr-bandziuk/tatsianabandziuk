import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: "This section is being written." },
];

// Stand-in: metadata, lead and FAQ are final; the body is the planned H2 skeleton (task 02).
export const post: Post = {
  ...postPlan("price-architecture", "en"),
  title: "How to Build and Read a Retail Price Architecture Before the Season",
  h1: { before: "How to Build and Read a", accent: "Retail Price Architecture", after: "Before the Season" },
  excerpt: "Entry, core and top price points, good-better-best tiers and how to spot a gap in the price ladder before the buy is placed.",
  lead: "A retail price architecture is the planned set of price points in each category, typically entry, core and top, that tells customers how the range is structured and tells the business where sales and margin should come from. Reading it before the season means checking the price ladder against last season’s sales mix and margin, so gaps and overcrowded tiers are fixed before the buy.",
  date: "2026-06-26",
  readingMinutes: 8,
  body: [
    ...section("price-architecture-explained", "Retail Price Architecture and Price Ladder Explained"),
    ...section("entry-core-top", "Entry, Core and Top Price Points per Category"),
    ...section("good-better-best", "Good-Better-Best Pricing in Fashion Retail"),
    ...section("price-ladder-gap", "What a Gap in the Retail Price Ladder Costs"),
    ...section("check-price-ladder", "How to Check a Price Ladder Against Sales Mix and Margin"),
    ...section("price-architecture-markets", "Retail Price Architecture Across Markets and Currencies"),
  ],
  faqTitle: "Retail Price Architecture: Common Questions",
  faq: [
    {
      question: "What is price architecture in retail?",
      answer:
        "Price architecture is the structure of price points a retailer uses within each category, from the lowest entry price to the highest. It defines how many price levels there are, how far apart they sit and what quality or features justify each step. A clear architecture makes the range easy to shop and protects margin.",
    },
    {
      question: "What is a price ladder in retail?",
      answer:
        "A price ladder is the ordered list of actual price points in a category, for example knitwear at 29, 39, 49, 69 and 89. Each price point is a rung, and the number of options and units on each rung shows where the range is concentrated. Comparing the ladder with sales by price point shows whether customers buy where the range is deepest.",
    },
    {
      question: "What is good-better-best pricing?",
      answer:
        "Good-better-best pricing offers three clear levels of the same type of product: a basic version, an upgraded one and a premium one, each with visible differences in fabric, construction or detail. It lets customers trade up and gives the brand a margin-rich top tier. In fashion it often maps to entry, core and top price points.",
    },
    {
      question: "How many price points should a category have?",
      answer:
        "Most fashion categories work with three to five price points; more than that makes steps too small for customers to notice the difference. The gap between neighbouring price points is often 20–40%, so each step feels meaningful. The right number depends on the category’s share of sales and the width of the customer’s budget, so check it against your own sales mix.",
    },
  ],
  placeholder: true,
  seo: {
    title: "Retail Price Architecture: How to Read a Price Ladder",
    description: "How to build a retail price architecture: entry, core and top price points, good-better-best tiers and what a gap in the price ladder costs.",
  },
};
