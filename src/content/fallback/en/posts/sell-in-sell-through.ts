import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: "This section is being written." },
];

// Stand-in: metadata, lead and FAQ are final; the body is the planned H2 skeleton (task 02).
export const post: Post = {
  ...postPlan("sell-in-sell-through", "en"),
  title: "Sell-In vs Sell-Through: Why Commercial and Finance Numbers Differ",
  h1: { before: "Sell-In vs Sell-Through:", accent: "Why Commercial and Finance Numbers Differ" },
  excerpt: "Sell-in, sell-through and sell-out explained, and why commercial and finance teams report different sell-through figures for the same season.",
  lead: "Sell-in is what a brand ships to its stores or retail partners, sell-through is the share of that stock sold to end customers, and sell-out is the customer sales volume itself. Commercial and finance teams often report different sell-through numbers because they use different denominators, time windows and treatment of returns.",
  date: "2026-05-29",
  readingMinutes: 7,
  body: [
    ...section("definitions", "Sell-In, Sell-Through and Sell-Out Definitions"),
    ...section("definition-mismatches", "Three Sell-Through Definition Mismatches Between Teams"),
    ...section("agree-definition", "How to Agree One Sell-Through Definition with Finance"),
    ...section("power-bi-report", "Sell-In vs Sell-Through in a Power BI Report"),
  ],
  faqTitle: "Sell-In and Sell-Through: Common Questions",
  faq: [
    {
      question: "What is the difference between sell-in and sell-through?",
      answer:
        "Sell-in measures units or value moved from the brand into the channel: to its own stores, wholesale customers or marketplaces. Sell-through measures how much of that stock end customers have bought, usually as a percentage of units received. High sell-in with low sell-through means stock is building up in the channel.",
    },
    {
      question: "What is the difference between sell-through and sell-out?",
      answer:
        "Sell-out is the absolute quantity or value sold to end customers in a period. Sell-through expresses the same sales as a share of available stock, for example 600 units sold out of 1,000 received is a 60% sell-through. Sell-out tells you volume; sell-through tells you how well the bought quantity is performing.",
    },
    {
      question: "Why does finance report a different sell-through number?",
      answer:
        "Finance often divides sales by opening stock plus receipts in value at cost, while commercial teams divide units sold by units received. The teams may also count returns, transfers and wholesale shipments differently, or cut the period at a different week. Agreeing one written definition, with the denominator and the returns rule spelled out, removes most of the difference.",
    },
  ],
  placeholder: true,
  seo: {
    title: "Sell-In vs Sell-Through vs Sell-Out in Retail Reporting",
    description: "Sell-in, sell-through and sell-out explained, and the three definition mismatches that make commercial and finance teams report different numbers.",
  },
};
