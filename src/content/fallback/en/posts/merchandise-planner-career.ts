import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: "This section is being written." },
];

// Stand-in: metadata, lead and FAQ are final; the body is the planned H2 skeleton (task 02).
// Careers article: explains the profession only, no personal career plans of the author.
export const post: Post = {
  ...postPlan("merchandise-planner-career", "en"),
  title: "Merchandise Planner Career in Fashion: Skills, Path and How to Start",
  h1: { before: "Merchandise Planner Career in Fashion:", accent: "Skills, Path and How to Start" },
  excerpt: "What a merchandise planner does, how the role differs from a fashion buyer, the skills it needs and the usual path from allocation to head of planning.",
  lead: "A merchandise planner in a fashion brand owns the numbers behind the range: sales, stock and margin targets, open-to-buy budgets and in-season trading actions, working alongside buyers who choose the products. Most planners start as allocation or merchandise analysts and build strong Excel and retail maths skills before moving into planning roles.",
  date: "2026-03-20",
  readingMinutes: 8,
  body: [
    ...section("what-planner-does", "What a Merchandise Planner Does in a Fashion Brand"),
    ...section("planner-vs-buyer", "Merchandise Planner vs Fashion Buyer"),
    ...section("planner-skills", "Skills and Tools a Merchandise Planner Needs"),
    ...section("how-to-become", "How to Become a Merchandise Planner or Fashion Buyer"),
    ...section("career-path", "Career Path from Allocation Analyst to Head of Planning"),
  ],
  faqTitle: "Merchandise Planner Careers: Common Questions",
  faq: [
    {
      question: "What does a merchandise planner do?",
      answer:
        "A merchandise planner sets and manages the financial plan for a range: sales, margin, stock levels and the open-to-buy budget by category and month. In season, the planner tracks sell-through and stock cover and recommends reorders, transfers and markdowns. The role is the commercial counterpart of the buyer.",
    },
    {
      question: "What is the difference between a merchandise planner and a buyer?",
      answer:
        "The buyer decides which products to offer: styles, colours, suppliers and cost prices. The merchandise planner decides how much to buy and when, and makes sure the range meets its sales and margin targets. Buyers are closer to product and suppliers, planners to data and stock, and the two usually work as a pair for each category.",
    },
    {
      question: "How do you become a fashion buyer?",
      answer:
        "Most fashion buyers start as buying administrators or assistant buyers and progress to junior buyer and buyer over several years. A degree in fashion business, retail management or a related subject helps, but commercial awareness, negotiation skills and a good eye for product matter more. Strong numeracy and Excel skills are expected, because buyers work with margins and budgets every day.",
    },
    {
      question: "How do you become a merchandise planner?",
      answer:
        "The usual entry points are allocation analyst, merchandise administrator or assistant merchandiser roles, where you learn stock distribution, reporting and retail maths. From there the path leads to merchandiser or planner and later senior or head of planning. Advanced Excel, a reporting tool such as Power BI, and a solid grasp of open-to-buy, sell-through and margin are the core skills.",
    },
  ],
  placeholder: true,
  seo: {
    title: "Merchandise Planner Career in Fashion: Skills and Path",
    description: "What a merchandise planner does, merchandise planner vs buyer, the skills needed, how to become a fashion buyer or planner and the typical career path.",
  },
};
