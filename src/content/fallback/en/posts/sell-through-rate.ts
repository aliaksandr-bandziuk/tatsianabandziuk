import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("sell-through-rate", "en"),
  title: "How to Calculate Sell-Through Rate in Retail and Power BI",
  h1: { before: "How to Calculate Sell-Through Rate in", accent: "Retail and Power BI" },
  excerpt: "The sell-through rate formula, the two denominators teams confuse, fashion benchmarks, an Excel formula and DAX for a weekly curve.",
  lead: "Sell-through rate is the share of the stock you made available that has actually sold, calculated as net units sold divided by units available. Below I show both common denominators, the ranges I treat as healthy in fashion, and how to build the measure in Excel and Power BI.",
  date: "2026-09-10",
  readingMinutes: 7,
  featured: true,
  body: [
    {
      type: "p",
      text: "Sell-through rate answers one question: of everything we put in front of customers, how much has sold? It sounds trivial until two people in the same trading meeting quote different numbers. In almost every case I have looked into, the reason is the same: one of them divides by units received, the other by units received plus opening stock.",
    },
    { type: "h2", id: "definition", text: "Sell-Through Rate Definition Used in Retail Reporting" },
    {
      type: "p",
      text: "In retail reporting, sell-through rate is the percentage of available units sold within a period, usually a season or a number of weeks since launch. It is measured in units, not value, because it describes how the buy performed, not how much money it made. Price and margin sit in other KPIs next to it.",
    },
    {
      type: "p",
      text: "Pick one definition per brand, write it down and put it in the report description. The version I use by default divides net sales units, after returns, by the total units made available in the period.",
    },
    { type: "h2", id: "formula", text: "Sell-Through Rate Formula with Two Denominators" },
    { type: "formula", text: "sell-through % = (units sold − units returned) ÷ (opening stock + units received) × 100" },
    { type: "formula", text: "sell-through on receipts % = (units sold − units returned) ÷ units received × 100" },
    {
      type: "p",
      text: "The first formula is the one I recommend for most reports. It counts everything customers could buy, including carry-over stock from the previous season, so the rate can never pass 100%. The second formula ignores opening stock. Buyers like it for new-season styles, where opening stock is zero anyway and both versions give the same answer.",
    },
    {
      type: "p",
      text: "The trouble starts with continuity lines and carry-over. For example, a basic T-shirt starts the season with 200 units in stock, receives 800 more and sells 640, of which 40 come back. On the first formula the sell-through is 600 ÷ 1,000 = 60%. On the second it is 600 ÷ 800 = 75%. Both are correct; they just answer different questions. Try your own numbers in the calculator below.",
    },
    {
      type: "calculator",
      kind: "sellThrough",
      title: "Sell-through rate calculator",
      labels: {
        opening: "Opening stock (units)",
        received: "Units received",
        sold: "Units sold",
        returned: "Units returned",
        rate: "Sell-through on available stock",
        rateReceived: "Sell-through on receipts only",
      },
      note: "Formula: (sold − returned) ÷ (opening stock + received). The second result divides by received units only.",
    },
    { type: "h2", id: "good-rate", text: "What Is a Good Sell-Through Rate in Fashion Retail" },
    {
      type: "p",
      text: "There is no single good sell-through rate. It depends on the category, the season length and how much markdown the plan allows. The ranges below are rules of thumb I use as a starting point for seasonal fashion, measured on the first formula. Treat them as a sense check, not as a target to copy.",
    },
    {
      type: "list",
      items: [
        "Seasonal fashion at full price, end of the full-price period: around 50–70%. Below 40% the buy was probably too deep or the price too high.",
        "Seasonal fashion at the end of the season, including markdown: around 75–90%. Much higher often means lost sales from stock-outs.",
        "Trend or fashion-forward styles: a fast start matters more than the final number; about 20–30% in the first four weeks is a healthy signal.",
        "Outerwear and heavy knitwear: slower until the weather turns, so compare with last year’s curve by week rather than a flat target.",
        "Continuity and basics: sell-through is the wrong lens; judge them on weeks of cover and availability instead.",
      ],
    },
    {
      type: "p",
      text: "A rate that is too high is a warning too. If a style sells 95% in six weeks, you ran out of sizes, and the sales you did not make never appear in the report.",
    },
    {
      type: "p",
      text: "The most useful benchmark is your own history. Save the weekly curve of every category each season, and next year compare the new line with the old one at the same week since launch.",
    },
    { type: "h2", id: "excel", text: "How to Calculate Sell-Through Rate in Excel" },
    {
      type: "p",
      text: "In Excel, keep one row per style or option with four columns: opening stock, received, sold and returned. The formula then fits in one cell, and IFERROR stops new styles with no stock from showing an error.",
    },
    {
      type: "code",
      code: "' Columns: A = style, B = opening stock, C = received, D = sold, E = returned\n=IFERROR((D2-E2)/(B2+C2), 0)\n\n' Sell-through for one category from a flat sales table\n=IFERROR(\n  (SUMIFS(Sales[Units], Sales[Category], H2) - SUMIFS(Sales[Returns], Sales[Category], H2))\n  / (SUMIFS(Stock[Opening], Stock[Category], H2) + SUMIFS(Receipts[Units], Receipts[Category], H2)),\n  0)",
      caption: "Excel formulas for sell-through rate. Format the result cell as a percentage; table and column names are examples.",
    },
    {
      type: "p",
      text: "Do not average the percentages of individual styles to get a category rate. A style with 10 units counts as much as one with 2,000. Sum units first, then divide, as the SUMIFS version does.",
    },
    { type: "h2", id: "dax", text: "DAX Measures for Sell-Through Rate in Power BI" },
    {
      type: "p",
      text: "In Power BI I build three measures: net units, available units and the ratio. Keeping them separate makes the number easy to audit, and while the definition is still being agreed you can show both denominators side by side.",
    },
    {
      type: "code",
      code: "Net Units :=\nSUM ( Sales[Units] ) - SUM ( Sales[ReturnUnits] )\n\nAvailable Units :=\nCALCULATE (\n    SUM ( Stock[OpeningUnits] ) + SUM ( Receipts[Units] ),\n    REMOVEFILTERS ( 'Date'[Week] )\n)\n\nSell-Through % :=\nDIVIDE ( [Net Units], [Available Units] )\n\nSell-Through on Receipts % :=\nDIVIDE ( [Net Units], CALCULATE ( SUM ( Receipts[Units] ), REMOVEFILTERS ( 'Date'[Week] ) ) )",
      caption: "Example table and column names; rename them to match your model.",
    },
    {
      type: "p",
      text: "REMOVEFILTERS on the week keeps the denominator fixed for the whole season. Without it, a weekly visual divides each week’s sales by that week’s receipts, which is a different and rarely useful number.",
    },
    { type: "h2", id: "weekly-curve", text: "Weekly Sell-Through Curve in a Retail Dashboard" },
    {
      type: "p",
      text: "A single percentage tells you little. The curve does: cumulative sell-through by week since launch, against last season. Too flat and the buy was too deep or the price is wrong. Too steep and you will be out of sizes before the season ends. For the cumulative line, wrap Net Units in a season-to-date pattern and plot it by week number since launch, not by calendar week.",
    },
    {
      type: "chart",
      title: "Cumulative sell-through, weeks 1–12",
      legend: "this season vs last",
      caption: "Illustrative data · solid = this season, dashed = last season",
    },
    {
      type: "table",
      caption: "Illustrative data · select cells to see the average, count and sum below",
      columns: [
        { label: "Category", kind: "text" },
        { label: "Units received", kind: "number" },
        { label: "Sell-through, wk 8", kind: "number", format: "scale", suffix: "%" },
        { label: "Gross margin", kind: "number", format: "bars", suffix: "%" },
      ],
      trendColumn: 2,
      rows: [
        { cells: ["Dresses", 1240, 68, 42], trend: "up" },
        { cells: ["Knitwear", 980, 54, 38], trend: "flat" },
        { cells: ["Denim", 1510, 74, 47], trend: "up" },
        { cells: ["Outerwear", 640, 39, 31], trend: "down" },
        { cells: ["Accessories", 720, 61, 55], trend: "up" },
        { cells: ["Footwear", 560, 33, 29], trend: "down" },
      ],
    },
    {
      type: "p",
      text: "In a table like this, outerwear and footwear stand out at once. Whether that is a problem depends on their curve: at week 8 outerwear is often still waiting for cold weather, so I would check last year’s line before proposing a markdown.",
    },
    { type: "h2", id: "mistakes", text: "Common Sell-Through Rate Calculation Mistakes" },
    {
      type: "list",
      items: [
        "Filtering the denominator by week, so availability resets every week and the curve looks flat.",
        "Leaving returns in sales units, which inflates sell-through in categories with high return rates such as dresses bought online.",
        "Averaging style-level percentages instead of dividing total units by total units.",
        "Mixing markets with different season start weeks in one cumulative view.",
        "Counting stock in transit to stores as available before it reaches the shop floor or the online warehouse.",
        "Comparing a rate on receipts with last year’s rate on available stock.",
      ],
    },
    {
      type: "p",
      text: "If your team reports sell-through in three different ways today, agreeing one definition is usually the first step of a Power BI dashboard project, and it is where I start when I set up retail reporting.",
    },
  ],
  faqTitle: "Sell-Through Rate FAQ",
  faq: [
    {
      question: "What is the sell-through rate formula?",
      answer: "Sell-through rate = (units sold − units returned) ÷ (opening stock + units received) × 100. Some teams divide by units received only, which gives a higher number when there is carry-over stock. Choose one version and write it into the report definition.",
    },
    {
      question: "What is a good sell-through rate?",
      answer: "For seasonal fashion, a rough rule of thumb is 50–70% at the end of the full-price period and 75–90% by the end of the season including markdown. Basics and continuity lines should be judged on weeks of cover instead. Always compare with the same category’s curve from last season.",
    },
    {
      question: "What does sell-through mean?",
      answer: "Sell-through is the share of available stock that customers have bought in a given period. It shows how well a buy matched demand. It is measured in units, so it says nothing about price or margin on its own.",
    },
    {
      question: "How do I calculate sell-through in Excel?",
      answer: "Put opening stock, received, sold and returned units in separate columns and use =IFERROR((sold−returned)/(opening+received),0), formatted as a percentage. For a category total, sum the units with SUMIFS first and divide afterwards, rather than averaging style percentages.",
    },
    {
      question: "What is the difference between sell-in and sell-through?",
      answer: "Sell-in is what a brand ships to its retailers or stores, while sell-through is what those stores sell to end customers. Sell-in can look strong while stock builds up on shop floors. Sell-through shows whether the goods are actually moving.",
    },
  ],
  seo: {
    title: "Sell-Through Rate: Formula, Benchmarks and Power BI DAX",
    description: "How to calculate sell-through rate, which denominator to use, what a good sell-through rate is in fashion, and DAX measures for a weekly curve.",
  },
};
