import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: "This section is being written." },
];

// Stand-in: metadata, lead and FAQ are final; the body is the planned H2 skeleton (task 02).
export const post: Post = {
  ...postPlan("markdown-strategy", "en"),
  title: "Markdown Strategy in Fashion Retail: When and How Deep to Discount",
  h1: { before: "Markdown Strategy in Fashion Retail:", accent: "When and How Deep to Discount" },
  excerpt: "How to calculate a markdown, time it by sell-through and choose a discount depth that clears stock without giving away more margin than needed.",
  lead: "A markdown strategy sets when a fashion product is discounted and by how much, so that seasonal stock sells out by the end of its life with the least possible loss of margin. The decision is best driven by each product’s sell-through against plan and its remaining weeks, not by a fixed sale calendar alone.",
  date: "2026-05-22",
  readingMinutes: 8,
  body: [
    ...section("markdown-vs-markup", "Markdown vs Markup in Retail"),
    ...section("calculate-markdown", "How to Calculate a Markdown"),
    ...section("markdown-timing", "Markdown Timing by Sell-Through"),
    ...section("markdown-depth", "Markdown Depth and Margin Scenarios"),
    ...section("markdown-optimisation", "Markdown Optimisation Without Software"),
  ],
  faqTitle: "Markdown Strategy: Common Questions",
  faq: [
    {
      question: "What is the difference between markdown and markup?",
      answer:
        "Markup is the amount added to the cost to reach the selling price, usually expressed as a percentage of cost. Markdown is a reduction from the original selling price, expressed as a percentage of that price. A jacket that costs 20 and sells at 50 carries a 150% markup; selling it at 35 is a 30% markdown.",
    },
    {
      question: "How do you calculate a markdown?",
      answer:
        "Markdown percentage = (original price − reduced price) ÷ original price × 100. For example, reducing a dress from 80 to 60 is a 25% markdown. For planning, also track markdown cost: the price reduction multiplied by the units sold at the reduced price, because that is what the discount takes out of gross margin.",
    },
    {
      question: "When should a fashion retailer take a markdown?",
      answer:
        "The usual trigger is sell-through falling behind plan for the product’s age, for example below 30–40% after half of its selling weeks, although the threshold differs by category. An early, shallow markdown on a slow line usually costs less margin than a deep one at the end of the season. Products that are selling to plan should stay at full price.",
    },
    {
      question: "How deep should a first markdown be?",
      answer:
        "Many fashion retailers start at 20–30%, because smaller reductions rarely change customer behaviour enough to matter. Go deeper only when there is little time left and a lot of stock. Before choosing a depth, compare margin scenarios: the extra units a discount must sell to earn the same gross margin rise quickly as the markdown deepens.",
    },
  ],
  placeholder: true,
  seo: {
    title: "Markdown Strategy in Fashion Retail: Timing and Depth",
    description: "Markdown vs markup, how to calculate a markdown, when to discount by sell-through and how deep to go: a practical retail markdown strategy for fashion.",
  },
};
