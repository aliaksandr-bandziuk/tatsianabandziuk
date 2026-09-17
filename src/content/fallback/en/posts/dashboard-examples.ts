import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("dashboard-examples", "en"),
  title: "Power BI Dashboard Examples for Retail and Fashion Sales",
  h1: { before: "Power BI Dashboard Examples for", accent: "Retail and Fashion Sales" },
  excerpt: "Three Power BI dashboard examples for retail, described page by page: weekly trading, category review and end-of-season review, with KPIs and design rules.",
  lead: "A good Power BI retail dashboard answers one recurring business question per page, such as how last week traded or which categories need action. Below are three dashboard examples I would build for a fashion brand, page by page, with the KPIs each page needs and the design rules that keep them readable.",
  date: "2026-08-20",
  readingMinutes: 7,
  body: [
    { type: "h2", id: "good-dashboard", text: "What a Good Retail Dashboard in Power BI Shows" },
    {
      type: "p",
      text: "Most retail dashboards I am asked to fix have the same problem: they show everything the data model contains. Twenty visuals, five slicers, no obvious starting point. A commercial team opens such a report once, then goes back to its spreadsheet.",
    },
    {
      type: "p",
      text: "A useful dashboard starts from the meeting it serves. The weekly trading meeting, the monthly category review and the end-of-season review ask different questions, look at different time frames and have different audiences. Each deserves its own report, or at least its own set of pages, rather than one report that tries to serve them all.",
    },
    {
      type: "list",
      items: [
        "One question per page, written as the page title.",
        "Four to six headline KPIs at the top, always compared with plan or last year.",
        "One main visual that explains the headline, and a detail table for people who want to drill down.",
        "The same definitions everywhere: net sales after returns, sell-through on available stock, margin on net prices.",
      ],
    },
    { type: "h2", id: "weekly-trading", text: "Power BI Sales Dashboard Example: Weekly Trading" },
    {
      type: "p",
      text: "The weekly trading dashboard is the Power BI sales dashboard most retail teams need first. It is opened on Monday morning, it covers the last completed week and season to date, and it must answer one question in under a minute: are we ahead of or behind plan, and where?",
    },
    {
      type: "p",
      text: "Page 1 is the summary. A row of KPI cards shows net sales, units, average selling price, full-price share and gross margin for the week, each against last year and plan. Below it, a bar chart splits the variance to plan by channel and market. Page 2 lists the best and worst sellers by style, with sell-through and weeks of cover next to sales, so the team can decide on reorders and transfers in the same meeting.",
    },
    {
      type: "table",
      caption: "Example KPI set for a weekly trading page",
      columns: [
        { label: "KPI", kind: "text" },
        { label: "Compared with", kind: "text" },
        { label: "Question it answers", kind: "text" },
      ],
      rows: [
        { cells: ["Net sales", "Plan and last year", "Are we on track this week?"] },
        { cells: ["Units sold", "Last year", "Is the change driven by volume or price?"] },
        { cells: ["Average selling price", "Last year", "Are we selling at lower prices than before?"] },
        { cells: ["Full-price sales share", "Last year", "How much of the week depended on discounts?"] },
        { cells: ["Gross margin %", "Plan", "Is the sales growth profitable?"] },
        { cells: ["Weeks of cover", "Target range", "Where will we run out or be overstocked?"] },
      ],
    },
    {
      type: "p",
      text: "Two details make this page work in practice. The data must be refreshed before the meeting starts, with the refresh time shown on the page, so nobody asks whether Sunday is included. And the page should open on the level most people care about, usually the whole brand, with a drill-through to market and store for those who need it.",
    },
    { type: "h2", id: "category-review", text: "Power BI Retail Dashboard Example: Category Review" },
    {
      type: "p",
      text: "The category review dashboard serves buyers and merchandisers once a month. The time frame is season to date, and the question is different: which categories, price points and styles are working, and what should we change in the range?",
    },
    {
      type: "p",
      text: "Page 1 is a category matrix: one row per category with sales, sell-through, margin and stock, using conditional formatting so the weak rows stand out without reading every number. Page 2 shows the price architecture: units and sell-through by price band, which reveals gaps and overcrowded price points. Page 3 is the style list, filtered to one category at a time, with a slicer for colour and size so the team can see whether a problem sits in the design or in the size curve.",
    },
    {
      type: "table",
      caption: "Example KPI set for a category review page",
      columns: [
        { label: "KPI", kind: "text" },
        { label: "Visual", kind: "text" },
        { label: "Decision it supports", kind: "text" },
      ],
      rows: [
        { cells: ["Sell-through season to date", "Matrix with colour scale", "Reorder, hold or mark down"] },
        { cells: ["Sales mix vs plan", "Bar chart by category", "Rebalance next season’s option count"] },
        { cells: ["Units by price band", "Column chart", "Fill or close price ladder gaps"] },
        { cells: ["Gross margin %", "Matrix column", "Review cost or price by category"] },
        { cells: ["Size sell-through", "Heat map by size", "Adjust the size curve for the next buy"] },
      ],
    },
    { type: "h2", id: "end-of-season", text: "Power BI Dashboard Example: End-of-Season Review" },
    {
      type: "p",
      text: "The end-of-season review looks back at a closed season and feeds the next buy. The audience is wider: buying, planning, finance and often the management team. The question is: what did the season teach us, in numbers?",
    },
    {
      type: "p",
      text: "Page 1 compares the season with plan and with the same season last year: sales, achieved margin, markdown cost and closing stock. Page 2 shows the cumulative sell-through curve by category, this season against last, which makes a slow start or an early stock-out visible at a glance. Page 3 splits the margin gap between intake margin and achieved margin into markdowns, promotions and returns. Page 4 lists the leftover stock that will carry over, with its age and value.",
    },
    {
      type: "table",
      caption: "Example KPI set for an end-of-season review",
      columns: [
        { label: "KPI", kind: "text" },
        { label: "Page", kind: "text" },
        { label: "What it tells the next buy", kind: "text" },
      ],
      rows: [
        { cells: ["Final sell-through by category", "Season curve", "Where the buy was too deep or too shallow"] },
        { cells: ["Markdown cost", "Margin bridge", "How much intake margin to plan"] },
        { cells: ["Achieved margin vs intake margin", "Margin bridge", "Which categories lose most to discounts"] },
        { cells: ["Closing stock value and age", "Carry-over list", "How much stock enters next season"] },
        { cells: ["Stock-out weeks on best sellers", "Style list", "Which styles deserved a deeper buy"] },
      ],
    },
    {
      type: "p",
      text: "The value of this dashboard comes from reusing it. When the same pages are built for every season, the team can open last year’s review during the next range planning session and check whether the same categories keep appearing on the problem list.",
    },
    {
      type: "p",
      text: "Every page that compares with last year needs the same time intelligence measure. For weekly retail reporting I compare with the same weekday last year, which is 364 days back, rather than the same calendar date:",
    },
    {
      type: "code",
      code: "Net Sales :=\nSUM ( Sales[NetAmount] )\n\nNet Sales LY :=\nCALCULATE ( [Net Sales], DATEADD ( 'Date'[Date], -364, DAY ) )\n\nNet Sales vs LY % :=\nDIVIDE ( [Net Sales] - [Net Sales LY], [Net Sales LY] )",
      caption: "Last-year comparison aligned by weekday; table and column names are examples.",
    },
    { type: "h2", id: "design-rules", text: "Retail KPI Dashboard Design Rules" },
    {
      type: "p",
      text: "These rules come from watching how commercial teams actually use reports. None of them needs a special visual or a paid add-on.",
    },
    {
      type: "list",
      items: [
        "Write the page title as the question the page answers, not as “Overview” or “Sales”.",
        "Put comparisons next to every headline number: a KPI without plan or last year is just a number.",
        "Use colour only for meaning, such as red for behind plan, and keep everything else neutral.",
        "Keep slicers in the same place on every page and show clearly which filters are active.",
        "Show dates as the retail week and season the team uses, not as calendar months only.",
        "Add a definitions page that explains every KPI, its formula and its data source.",
        "Limit each page to what fits on one screen without scrolling.",
        "Test the dashboard in a real meeting before adding more pages.",
      ],
    },
    {
      type: "p",
      text: "If your team already has data in Power BI but still prepares the Monday numbers by hand, the gap is usually the page design and the definitions rather than the data. That is the part I focus on when I build Power BI dashboards for retail brands.",
    },
  ],
  faqTitle: "Power BI Retail Dashboard FAQ",
  faq: [
    {
      question: "What should a Power BI sales dashboard for retail include?",
      answer: "At minimum: net sales, units, average selling price, gross margin and a stock measure such as weeks of cover, each compared with plan or last year. Add sell-through for seasonal products. Every KPI should have a written definition on a separate page.",
    },
    {
      question: "How many pages should a retail dashboard in Power BI have?",
      answer: "As few as the meeting needs, usually two to four per report. Each page should answer one question. If a report grows beyond six or seven pages, it is usually serving several audiences and is easier to use when split.",
    },
    {
      question: "How do I compare sales with last year in Power BI?",
      answer: "Create a measure that shifts the date filter back by one year. For weekly retail reporting, DATEADD with minus 364 days keeps the same weekdays, so a Monday is compared with a Monday. Then divide the difference by last year’s sales for the percentage change.",
    },
    {
      question: "Should a retail sales dashboard be built in Power BI or Excel?",
      answer: "Excel is enough for a small team with one data source and a few users. Power BI is better when several people need the same numbers, data comes from more than one system, or markets must see only their own data. Many teams keep Excel for planning and use Power BI for reporting.",
    },
  ],
  seo: {
    title: "Power BI Dashboard Examples for Retail and Fashion Sales",
    description: "Three Power BI dashboard examples for retail: a weekly sales dashboard, a category review and an end-of-season review, with KPIs and design rules.",
  },
};
