import type { Post } from "../../../types";
import { postPlan } from "../../registry";

// Careers article: explains the profession only, no personal career plans of the author.
export const post: Post = {
  ...postPlan("merchandise-planner-career", "en"),
  title: "Merchandise Planner Career in Fashion: Skills, Path and How to Start",
  h1: { before: "Merchandise Planner Career in Fashion:", accent: "Skills, Path and How to Start" },
  excerpt: "What a merchandise planner does, how the role differs from a fashion buyer, the skills it needs and the usual path from allocation to head of planning.",
  lead: "A merchandise planner in a fashion brand owns the numbers behind the range: sales, stock and margin targets, open-to-buy budgets and in-season trading actions, working alongside buyers who choose the products. Most planners start as allocation or merchandise analysts and build strong Excel and retail maths skills before moving into planning roles.",
  date: "2026-03-20",
  readingMinutes: 6,
  body: [
    {
      type: "p",
      text: "Merchandise planning is one of the least visible careers in fashion business and one of the most influential. Customers never see the planner’s work, but it decides whether their size is on the shelf and whether the dress they wanted ends up in the sale. I have worked next to planning teams for most of my career, as a retail, category and pricing and now brand analyst, so this is a practical view of the role from close up.",
    },
    { type: "h2", id: "what-planner-does", text: "What a Merchandise Planner Does in a Fashion Brand" },
    {
      type: "p",
      text: "A merchandise planner sets and manages the financial plan for a range. Before the season, that means sales, margin and stock targets by category and month, and the open-to-buy budget that tells buyers how much they can still spend. During the season, it means tracking actual sales against plan and deciding what to do about the difference.",
    },
    {
      type: "p",
      text: "A note on terms for the UK: in British fashion retail the same job is often called merchandiser, and it has nothing to do with visual merchandising. Job ads use merchandiser, merchandise planner and planner for very similar roles, so read the responsibilities rather than the title. A typical week looks like this:",
    },
    {
      type: "list",
      items: [
        "Monday: the weekly trading report. Sales, sell-through and stock cover by category against plan and last year.",
        "Updating the WSSI, the weekly sales, stock and intake plan, with actual figures and a revised forecast for the rest of the season.",
        "Trading meeting with buyers: which styles to reorder, which to transfer between stores, which to mark down and when.",
        "Checking open-to-buy after new orders and cancellations, and flagging categories that are over-committed.",
        "Mid-week: preparing the next season’s plan, from last season’s review to budgets per category.",
      ],
    },
    {
      type: "p",
      text: "Is it stressful? It can be, mostly around deadlines: pre-season budget sign-off, the weekly trading meeting and the end-of-season clearance. The pressure comes from being accountable for numbers that depend on weather, suppliers and customers you do not control. People who like it tend to enjoy exactly that.",
    },
    { type: "h2", id: "planner-vs-buyer", text: "Merchandise Planner vs Fashion Buyer" },
    {
      type: "p",
      text: "The buyer decides what to sell: styles, colours, fabrics, suppliers and cost prices. The planner decides how much to buy and when, and makes sure the range meets its sales and margin targets. The two usually work as a pair for each category, and the best results come when they argue openly in the trading meeting rather than past each other.",
    },
    {
      type: "table",
      caption: "Typical split of responsibilities; exact scope differs by company",
      columns: [
        { label: "Topic", kind: "text" },
        { label: "Fashion buyer", kind: "text" },
        { label: "Merchandise planner", kind: "text" },
      ],
      rows: [
        { cells: ["Main question", "Which products do we sell?", "How much, when and where?"] },
        { cells: ["Works closest with", "Design, suppliers, trend teams", "Finance, allocation, stores, buyers"] },
        { cells: ["Key numbers", "Cost price, initial markup, margin per style", "Sales plan, stock levels, open-to-buy, sell-through"] },
        { cells: ["In season", "Repeat buys, supplier negotiations, new styles", "Reorders, transfers, markdown timing"] },
        { cells: ["Typical tools", "Line sheets, PLM, supplier portals", "Excel planning models, Power BI, planning systems"] },
      ],
    },
    {
      type: "p",
      text: "Buyers are closer to product and suppliers; planners are closer to data and stock. Both need numeracy, but the planner lives in the spreadsheet all day while the buyer uses it to check decisions made mostly in the showroom.",
    },
    { type: "h2", id: "planner-skills", text: "Skills and Tools a Merchandise Planner Needs" },
    {
      type: "p",
      text: "The core skills are analytical, but a planner who cannot explain a number to a buyer or a head of department will not get far. This is what I see in the planners I trust most.",
    },
    {
      type: "list",
      items: [
        "Advanced Excel: SUMIFS, lookups, pivot tables and building models that other people can follow. Planning models live and die by structure.",
        "Retail maths: sell-through, stock cover, weeks of cover, margin and markup, open-to-buy, markdown effect on margin, size curves.",
        "A reporting tool, most often Power BI, to see trends across hundreds of options instead of scrolling through them.",
        "A planning or ERP system, depending on the company. You learn these on the job; employers rarely expect them from a newcomer.",
        "Commercial judgement: knowing when a number is noise and when it calls for action, for example when a slow start is just late weather.",
        "Communication and negotiation: planners constantly say “not now” or “not that much” to buyers, and it has to be backed by numbers.",
      ],
    },
    {
      type: "p",
      text: "The formula planners use most is probably open-to-buy. If you want to test yourself, try building it from scratch as described in my article on the open-to-buy model, then compare it with a sell-through report.",
    },
    { type: "formula", text: "OTB = planned sales + planned markdowns + planned closing stock − opening stock − stock on order" },
    { type: "h2", id: "how-to-become", text: "How to Become a Merchandise Planner or Fashion Buyer" },
    {
      type: "p",
      text: "Both careers usually start at the bottom of a team rather than with a direct hire into the role. For planning, the entry points are allocation analyst, merchandise administrator or assistant merchandiser. There you learn stock distribution, weekly reporting and retail maths on real data. For buying, the usual start is buying administrator or assistant buyer, followed by junior buyer and buyer over several years.",
    },
    {
      type: "p",
      text: "A degree in fashion business, retail management, economics, business or a numerate subject helps, but employers look hardest at numeracy and Excel for planning, and at commercial awareness and product sense for buying. My own degrees are in logistics and economics, not fashion, and that is common among planners and analysts.",
    },
    {
      type: "list",
      items: [
        "No retail experience: a store job or stockroom role teaches how stock actually moves, and many head-office teams value it.",
        "Coming from analytics or finance: highlight Excel models, reporting and any work with stock or sales data; allocation roles are the natural bridge.",
        "Graduates: retail graduate schemes often rotate through buying, merchandising and allocation, which is a good way to find out which side suits you.",
        "Everyone: learn the vocabulary. Being able to explain sell-through, stock cover and open-to-buy in an interview puts you ahead of most candidates.",
      ],
    },
    {
      type: "p",
      text: "Pay is a frequent question. It varies by market, company size and seniority, and planning and buying are paid differently from company to company, so compare current job ads in your own market rather than relying on a general figure.",
    },
    { type: "h2", id: "career-path", text: "Career Path from Allocation Analyst to Head of Planning" },
    {
      type: "p",
      text: "The planning ladder is fairly consistent across fashion retailers, even if titles vary. The timing depends on the company and the person, so treat the order as the useful part.",
    },
    {
      type: "list",
      items: [
        "Allocation analyst or merchandise administrator: distributing stock to stores, replenishment, weekly reports.",
        "Assistant merchandiser or assistant planner: supporting a planner on one category, maintaining the WSSI and OTB sheets.",
        "Merchandiser or merchandise planner: owning the plan for a category or department and trading it with the buyer.",
        "Senior merchandiser or senior planner: larger or several categories, often a small team, more pre-season strategy.",
        "Head of planning or merchandising director: the planning function across the brand, budget setting with finance and the leadership team.",
      ],
    },
    {
      type: "p",
      text: "Not everyone climbs straight up. Planning skills also lead sideways into brand and pricing analytics, supply planning, BI and reporting, or retail consulting. The retail maths and the habit of tying every decision to a number transfer well to all of them, which is one reason I think merchandise planning is a strong foundation for a career in fashion business.",
    },
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
  seo: {
    title: "Merchandise Planner Career in Fashion: Skills and Path",
    description: "What a merchandise planner does, merchandise planner vs buyer, the skills needed, how to become a fashion buyer or planner and the typical career path.",
  },
};
