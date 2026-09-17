import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: "This section is being written." },
];

// Stand-in: metadata, lead and FAQ are final; the body is the planned H2 skeleton (task 02).
export const post: Post = {
  ...postPlan("assortment-process", "en"),
  title: "Assortment Planning Process in Fashion Retail, Step by Step",
  h1: { before: "Assortment Planning Process in Fashion Retail,", accent: "Step by Step" },
  excerpt: "What assortment planning is, how it differs from merchandise planning and category management, and the steps of the process with an example.",
  lead: "Assortment planning is the process of deciding which products a retailer offers, in what breadth and depth, in which stores or channels and at what time, so that the range matches customer demand within the season’s budget. In fashion it runs from reviewing last season’s results through setting option counts and price tiers to allocating the range by store cluster.",
  date: "2026-05-08",
  readingMinutes: 9,
  body: [
    ...section("what-assortment-planning-is", "What Assortment Planning Is"),
    ...section("assortment-vs-merchandise-category", "Assortment Planning vs Merchandise Planning vs Category Management"),
    ...section("process-steps", "Assortment Planning Process Steps"),
    ...section("womenswear-example", "Assortment Plan Example for a Womenswear Category"),
    ...section("best-practices", "Assortment Planning Best Practices"),
  ],
  faqTitle: "Assortment Planning and Category Management: Common Questions",
  faq: [
    {
      question: "What is assortment planning?",
      answer:
        "Assortment planning is deciding the mix of products a retailer will carry: how many options per category (breadth), how many units per option (depth), which price points and which stores or channels get them. Its aim is to maximise sales and margin within the buying budget. In fashion it is repeated every season and adjusted in-season.",
    },
    {
      question: "What is category management?",
      answer:
        "Category management treats each product category as a separate business unit with its own targets, strategy and owner. The category manager is responsible for the category’s range, pricing, promotion and space, and measures results against the plan. It originated in grocery retail but is now common in fashion and department stores.",
    },
    {
      question: "What is the difference between assortment planning and merchandise planning?",
      answer:
        "Merchandise planning sets the financial frame: sales, margin, stock and open-to-buy budgets by month and category. Assortment planning works inside that frame and decides which products fill it and where they go. A merchandise plan says how much to spend on knitwear; an assortment plan says which knitwear styles, colours and sizes to buy for which stores.",
    },
    {
      question: "What are the main steps of the assortment planning process?",
      answer:
        "Review last season’s sales, sell-through and margin by category and attribute; set targets from the merchandise financial plan; define the range architecture with option counts and price tiers; select products with design and buying; plan depth and size curves; allocate by store cluster or channel; and track performance in-season to adjust replenishment and markdowns.",
    },
  ],
  placeholder: true,
  seo: {
    title: "Assortment Planning Process in Fashion Retail",
    description: "What assortment planning is, how it differs from merchandise planning and category management, and the process step by step with a womenswear example.",
  },
};
