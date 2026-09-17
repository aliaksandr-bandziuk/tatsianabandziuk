import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: "This section is being written." },
];

// Stand-in: metadata, lead and FAQ are final; the body is the planned H2 skeleton (task 02).
export const post: Post = {
  ...postPlan("range-planning", "en"),
  title: "How to Build a Range Plan in Fashion Retail",
  h1: { before: "How to Build a", accent: "Range Plan in Fashion Retail" },
  excerpt: "What a fashion range plan contains, the steps from brief to buy, and how options, depth and price tiers fit into one range plan template.",
  lead: "A range plan is the document that turns a season’s sales and margin targets into a concrete list of options per category, with their price points, buy depth and delivery dates. It is built by merchandise planners and buyers together, starting from last season’s performance and the design brief, and it is fixed before the buy is placed.",
  date: "2026-06-05",
  readingMinutes: 8,
  body: [
    ...section("what-range-plan-is", "What a Range Plan Is in Fashion"),
    ...section("range-planning-steps", "Range Planning Steps from Brief to Buy"),
    ...section("range-architecture", "Range Architecture: Options, Depth and Price Tiers"),
    ...section("range-plan-template", "Range Plan Template Structure"),
    ...section("range-vs-assortment-planning", "Range Planning vs Assortment Planning"),
  ],
  faqTitle: "Range Planning in Fashion: Common Questions",
  faq: [
    {
      question: "What is a range plan in fashion?",
      answer:
        "A range plan is a structured list of every option a brand intends to sell in a season, grouped by category and usually shown with price points, fabrics, colours, delivery drops and planned units. It connects the financial plan with the design collection. Buyers, designers and planners use it to check that the range is balanced before anything is ordered.",
    },
    {
      question: "What is range architecture?",
      answer:
        "Range architecture is the shape of a range: how many options sit in each category, how deep each option is bought and how they spread across entry, core and top price tiers. A clear architecture stops a range from being overloaded with similar styles at one price. It is usually agreed at category level before individual styles are chosen.",
    },
    {
      question: "What should a range plan template include?",
      answer:
        "At minimum: category and subcategory, option name or style code, colour, price tier and retail price, cost and intended margin, planned units, size range, delivery month and status. Summary rows per category should compare planned sales and option counts with the targets from the merchandise financial plan. Excel works well as long as the structure is fixed and totals are formula-driven.",
    },
    {
      question: "What is the difference between range planning and assortment planning?",
      answer:
        "Range planning decides what the brand will offer in a season: the options, prices and depth. Assortment planning decides where those options go: which stores, clusters or markets get which part of the range and in what quantities. In smaller companies the two are done by the same person, but they answer different questions.",
    },
  ],
  placeholder: true,
  seo: {
    title: "How to Build a Range Plan in Fashion Retail",
    description: "What a range plan is in fashion, range planning steps from brief to buy, range architecture by options, depth and price tiers, and a template.",
  },
};
