import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("open-to-buy", "en"),
  title: "Open-to-Buy in Retail: Formula and an Excel Model Planners Maintain",
  h1: { before: "Open-to-Buy in Retail: Formula and an", accent: "Excel Model Planners Maintain" },
  excerpt: "What OTB in retail means, the open-to-buy formula with a monthly worked example, and how to structure an Excel model that stays accurate.",
  lead: "Open-to-buy (OTB) is the budget a retailer still has available to spend on stock for a period, after planned sales, markdowns, target closing stock and orders already placed are taken into account. Here is the formula, a worked monthly example and the Excel workbook structure I use so the model survives the season.",
  date: "2026-08-12",
  readingMinutes: 7,
  body: [
    { type: "h2", id: "what-is-otb", text: "What Open-to-Buy Means in Retail" },
    {
      type: "p",
      text: "OTB in retail is a control figure, not a forecast. It tells a buyer how much more stock, usually at retail value or at cost, can be bought for a given month without ending the month with too much or too little inventory. When OTB is positive, there is money left to buy. When it turns negative, the business has already committed more than the plan allows.",
    },
    {
      type: "p",
      text: "The open-to-buy budget sits between the financial plan and the buying team. Finance agrees sales, margin and stock targets for the season; the OTB model turns them into monthly spending limits by category and market. Buyers then place orders against those limits and watch them shrink as purchase orders are confirmed.",
    },
    {
      type: "p",
      text: "Keep the model in one unit. I prefer retail value for fashion because sales and markdowns are planned in retail value, but some finance teams insist on cost. Mixing the two in one sheet is the fastest way to a budget nobody trusts.",
    },
    { type: "h2", id: "formula", text: "Open-to-Buy Formula with a Worked Example" },
    { type: "formula", text: "OTB = planned sales + planned markdowns + planned closing stock − opening stock − stock on order" },
    {
      type: "p",
      text: "The first three terms are what the month needs: stock to sell, value lost to markdowns, and the stock you want left at the end. The last two are what you already have or have already bought. The difference is what you can still buy.",
    },
    {
      type: "p",
      text: "For example, a womenswear category plans February sales of 100k, markdowns of 8k and closing stock of 60k. It opens the month with 70k in stock and has 20k already on order. OTB is 100 + 8 + 60 − 70 − 20 = 78k. The table below continues the same category through the season. Note that each month’s opening stock equals the previous month’s planned closing stock.",
    },
    {
      type: "table",
      caption: "Illustrative data, thousands at retail value",
      columns: [
        { label: "Month", kind: "text" },
        { label: "Planned sales", kind: "number" },
        { label: "Markdowns", kind: "number" },
        { label: "Closing stock", kind: "number" },
        { label: "Opening stock", kind: "number" },
        { label: "On order", kind: "number" },
        { label: "Open-to-buy", kind: "number", format: "bars" },
      ],
      rows: [
        { cells: ["February", 100, 8, 60, 70, 20, 78] },
        { cells: ["March", 120, 6, 75, 60, 40, 101] },
        { cells: ["April", 130, 5, 80, 75, 50, 90] },
        { cells: ["May", 125, 10, 70, 80, 30, 95] },
        { cells: ["June", 110, 25, 55, 70, 10, 110] },
        { cells: ["July", 90, 30, 50, 55, 0, 115] },
      ],
    },
    {
      type: "p",
      text: "Late in the season OTB looks generous because nothing is on order yet. That money is usually meant for the next season’s early deliveries and for replenishing continuity lines, so the model should show it by delivery month, not as free budget. Try your own figures in the open-to-buy calculator.",
    },
    {
      type: "calculator",
      kind: "openToBuy",
      title: "Open-to-buy calculator",
      labels: {
        sales: "Planned sales",
        markdowns: "Planned markdowns",
        endStock: "Planned closing stock",
        openingStock: "Opening stock",
        onOrder: "Stock on order",
        otb: "Open-to-buy",
      },
      note: "Formula: planned sales + markdowns + closing stock − opening stock − on order. Use the same unit (retail or cost) for every input.",
    },
    { type: "h2", id: "workbook", text: "Open-to-Buy Workbook Structure in Excel" },
    {
      type: "p",
      text: "Most OTB spreadsheets fail not because the formula is wrong but because nobody can tell which numbers are inputs and which are calculated. I split the workbook into sheets with one job each:",
    },
    {
      type: "list",
      items: [
        "Settings: season, months, currency, unit (retail or cost), list of categories and markets. Every other sheet reads from here.",
        "Plan: the approved sales, markdown and closing stock targets by month, category and market. Only the planner edits it, and only after sign-off.",
        "On order: a pasted export of open purchase orders by delivery month. No formulas, no manual edits.",
        "Actuals: weekly sales, markdowns and stock from the reporting system, also pasted as values.",
        "OTB: the calculation, one block per category and market, with the formula above and no typed numbers.",
        "Checks: the reconciliation tests described below, each returning OK or a difference.",
      ],
    },
    {
      type: "p",
      text: "Use Excel tables and SUMIFS against the category, market and month columns rather than cell references to other sheets. A new category then means one new row in Settings, not an afternoon of copying blocks. Colour input cells one way and formula cells another, and lock the formula cells.",
    },
    { type: "h2", id: "phasing", text: "Monthly Open-to-Buy Phasing by Category and Market" },
    {
      type: "p",
      text: "The seasonal budget is agreed as a total, so the model needs phasing percentages to spread it across months. I start from last year’s sales share by month for each category and adjust for what has changed.",
    },
    {
      type: "list",
      items: [
        "Calendar shifts: Easter, bank holidays and the number of trading weekends in each month.",
        "Market differences: seasons start and sale periods run at different dates, so each market gets its own phasing row.",
        "Category rhythm: swimwear and outerwear peak in very different months; a single brand-level phasing hides that.",
        "Stock-outs last year: months where sales were capped by missing stock should be corrected upwards before they become next year’s plan.",
      ],
    },
    {
      type: "p",
      text: "Keep phasing as a separate block of percentages that sums to 100% per row. Planners can then change the shape of the season without touching the total budget.",
    },
    { type: "h2", id: "checks", text: "Three Checks That Stop Open-to-Buy Drift" },
    {
      type: "p",
      text: "Drift happens quietly: a closing stock is typed over, a purchase order is counted twice, an old sales export stays in the file. These three checks catch most of it, and I put them on the first sheet people see.",
    },
    {
      type: "list",
      items: [
        "Stock roll-forward: each month’s closing stock equals next month’s opening stock, per category and market. Any difference means a typed number.",
        "Order book: the on-order total in the model equals the total of the latest purchase order export. A difference means a missing or duplicated order.",
        "Budget tie-out: the sum of the monthly plan equals the approved seasonal budget, and actuals are loaded up to the last closed week.",
      ],
    },
    {
      type: "p",
      text: "Update the model weekly during the season and re-forecast the remaining months monthly. When actual sales run ahead of plan, OTB for future months grows; when they lag, it shrinks, and the buyer should know before placing the next order, not after.",
    },
    { type: "h2", id: "template", text: "Free Open-to-Buy Excel Template" },
    {
      type: "p",
      text: "If you would rather not build the workbook from scratch, the free templates page on this site offers an open-to-buy Excel template, sent by email. It follows the logic described here: monthly phasing by category and market, the margin calculation and the three checks against drift, with the formulas already in place. Rename the categories and markets to your own and it is ready for the next planning cycle.",
    },
    {
      type: "p",
      text: "When a spreadsheet is no longer enough, for example because several planners edit it at once or the market count keeps growing, I help teams rebuild the model as part of my Excel planning work, keeping the logic the planners already know.",
    },
  ],
  faqTitle: "Open-to-Buy FAQ",
  faq: [
    {
      question: "What does open to buy mean?",
      answer: "Open to buy is the amount of stock a retailer can still purchase for a period without exceeding its inventory plan. It is calculated from planned sales, markdowns and closing stock, minus the stock already held and on order. Buyers use it as a spending limit.",
    },
    {
      question: "How do you calculate open to buy?",
      answer: "OTB = planned sales + planned markdowns + planned closing stock − opening stock − stock on order. For example, 100 + 8 + 60 − 70 − 20 gives an OTB of 78. Use the same unit, retail value or cost, for every term.",
    },
    {
      question: "What does OTB mean in retail?",
      answer: "In retail, OTB stands for open-to-buy, the remaining budget for buying merchandise in a month or season. It links the financial plan to the buying team’s orders. A negative OTB means the business has committed more stock than the plan allows.",
    },
    {
      question: "What is an open-to-buy budget?",
      answer: "An open-to-buy budget is the seasonal stock budget broken down by month, category and market. It is reduced as purchase orders are placed and adjusted as actual sales come in. It keeps buying decisions within the agreed stock and margin targets.",
    },
    {
      question: "How often should open-to-buy be updated?",
      answer: "Update actual sales, stock and orders weekly during the season and re-forecast the remaining months at least monthly. A model that is refreshed only at the start of the season stops reflecting reality within a few weeks.",
    },
  ],
  seo: {
    title: "Open-to-Buy in Retail: Formula and Excel Model",
    description: "What open-to-buy means in retail, the OTB formula with a worked example, and an Excel open-to-buy model that planners can keep up to date.",
  },
};
