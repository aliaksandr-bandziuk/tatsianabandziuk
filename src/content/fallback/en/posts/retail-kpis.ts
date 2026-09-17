import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("retail-kpis", "en"),
  title: "Retail KPIs for Fashion Brands: Sell-Through, Stock Turn, GMROI and Weeks of Cover",
  h1: { before: "Retail KPIs for Fashion Brands: Sell-Through, Stock Turn,", accent: "GMROI and Weeks of Cover" },
  excerpt: "The retail KPIs a fashion brand should review every week, with formulas for stock turn, GMROI and weeks of cover and two calculators.",
  lead: "The retail KPIs that matter most for a fashion brand connect sales with stock: sell-through, stock turn, GMROI and weeks of cover show whether the inventory you paid for is turning into profit. This article gives the formula for each, the ranges I use as rules of thumb and a KPI definitions sheet your team can adopt.",
  date: "2026-08-27",
  readingMinutes: 7,
  body: [
    { type: "h2", id: "weekly-kpis", text: "The Retail KPIs a Fashion Brand Should Track Weekly" },
    {
      type: "p",
      text: "Sales alone do not tell a fashion brand whether a week was good. A strong week bought with deep discounts, or with stock that will run out in ten days, is a problem in disguise. That is why I group weekly retail metrics into three families: sales, margin and stock, and never show one without the others.",
    },
    {
      type: "table",
      caption: "Weekly retail KPIs with formulas",
      columns: [
        { label: "KPI", kind: "text" },
        { label: "Formula", kind: "text" },
        { label: "What it tells you", kind: "text" },
      ],
      rows: [
        { cells: ["Net sales vs last year", "(net sales − net sales LY) ÷ net sales LY", "Whether the business is growing"] },
        { cells: ["Sell-through %", "net units sold ÷ (opening stock + received)", "How well the buy matched demand"] },
        { cells: ["Full-price sales share", "full-price sales ÷ net sales", "How much of the week relied on discounts"] },
        { cells: ["Gross margin %", "(net sales − cost of goods sold) ÷ net sales", "Whether sales are profitable"] },
        { cells: ["Average selling price", "net sales ÷ units sold", "Whether price or mix has shifted"] },
        { cells: ["Returns rate", "returned units ÷ units sold", "Fit, quality or description issues"] },
        { cells: ["Weeks of cover", "stock units ÷ average weekly units sold", "Where stock will run out or pile up"] },
        { cells: ["Stock turn", "cost of goods sold ÷ average inventory at cost", "How fast stock converts into sales"] },
        { cells: ["GMROI", "gross margin ÷ average inventory at cost", "How much margin each unit of stock earns"] },
      ],
    },
    {
      type: "p",
      text: "Sell-through, full-price share and weeks of cover belong on the Monday dashboard. Stock turn and GMROI move slowly, so I review them monthly and by category, but they sit in the same model and use the same stock figures. Sell-through has its own detailed article on this blog, so below I focus on the other three stock KPIs.",
    },
    {
      type: "p",
      text: "Read the KPIs together. For example, if net sales are up but full-price share and margin are down, the growth was bought with discounts. If sell-through is high and weeks of cover are below three on best sellers, the next problem is availability, not demand.",
    },
    { type: "h2", id: "stock-turn", text: "Stock Turn Formula in Retail" },
    {
      type: "p",
      text: "Stock turn, also called inventory turnover, shows how many times the average stock is sold and replaced in a period. The cost version is the one I recommend, because both parts of the ratio are at cost and markdowns do not distort it.",
    },
    { type: "formula", text: "stock turn = cost of goods sold ÷ average inventory at cost" },
    { type: "formula", text: "days of stock = days in period ÷ stock turn" },
    {
      type: "p",
      text: "Average inventory should be the average of several stock snapshots, ideally month-end values across the year, not just the opening and closing figures. A brand that ends the year with low stock after the sale looks much better on two snapshots than it really was.",
    },
    {
      type: "p",
      text: "Some retailers calculate stock turn at retail value instead: net sales divided by average inventory at retail prices. It works if both figures use the same prices, but markdowns lower sales without lowering the stock valuation, so the ratio drops in sale periods for reasons that have nothing to do with speed. Whichever version you choose, write it down.",
    },
    {
      type: "p",
      text: "For example, a brand with a cost of goods sold of 600,000 and average inventory of 150,000 at cost turns its stock 4 times a year, which means about 91 days of stock. As a rule of thumb, seasonal fashion apparel usually lands somewhere between 3 and 6 turns a year. Fast-moving fashion runs higher, while footwear, outerwear and brands with a large continuity range often run lower. Compare categories within your own brand before comparing with anyone else.",
    },
    {
      type: "calculator",
      kind: "stockTurn",
      title: "Stock turn and weeks of cover calculator",
      labels: {
        cogs: "Cost of goods sold in the period",
        avgInventory: "Average inventory at cost",
        periodDays: "Days in the period",
        stock: "Current stock (units)",
        weeklySales: "Average weekly sales (units)",
        turns: "Stock turn",
        days: "Days of stock",
        weeksCover: "Weeks of cover",
      },
      note: "Stock turn = COGS ÷ average inventory. Days of stock = days in period ÷ stock turn. Weeks of cover = current stock ÷ average weekly sales.",
    },
    { type: "h2", id: "gmroi", text: "GMROI Formula and a Good GMROI" },
    {
      type: "p",
      text: "GMROI, gross margin return on inventory investment, shows how much gross margin the business earns for every unit of money tied up in stock. It combines margin and stock turn in one number, which makes it the best single KPI for comparing categories with very different price levels.",
    },
    { type: "formula", text: "GMROI = gross margin ÷ average inventory at cost" },
    {
      type: "p",
      text: "A category that earned 120,000 of gross margin over the year with average stock of 80,000 at cost has a GMROI of 1.5: every 1 invested in stock returned 1.50 of margin. Below 1, the stock earns less than it costs to hold. As a rough guide for fashion, I treat anything above 2 as healthy and above 3 as strong, but the right level depends on your operating costs, so set the threshold with finance.",
    },
    {
      type: "p",
      text: "In Excel, keep gross margin for the period in one column and the month-end stock values at cost in the next twelve. Then GMROI for row 2 is =B2/AVERAGE(C2:N2). Averaging all twelve snapshots avoids the flattering picture you get from year-end stock alone.",
    },
    {
      type: "calculator",
      kind: "gmroi",
      title: "GMROI calculator",
      labels: {
        grossMargin: "Gross margin in the period",
        avgInventory: "Average inventory at cost",
        gmroi: "GMROI",
      },
      note: "GMROI = gross margin ÷ average inventory at cost. Use the same period for both inputs.",
    },
    { type: "h2", id: "weeks-of-cover", text: "Weeks of Cover Calculation" },
    {
      type: "p",
      text: "Weeks of cover, or stock cover, shows how many weeks the current stock would last at the current rate of sale. It is the most practical stock KPI for weekly decisions: reorders, transfers between stores and the timing of markdowns.",
    },
    { type: "formula", text: "weeks of cover = current stock units ÷ average weekly units sold" },
    {
      type: "p",
      text: "With 1,200 units in stock and average sales of 150 units a week, cover is 8 weeks. For the rate of sale I use the average of the last four weeks, or the forecast for the coming weeks when the season is changing fast. A single week is too noisy.",
    },
    {
      type: "p",
      text: "Backward-looking cover is easy to calculate but can mislead at the turn of a season. Stock of summer dresses at the end of June may show six weeks of cover on June sales, yet demand will fall sharply in August. Where a sales forecast exists, forward cover, which divides stock by the forecast units for the coming weeks, gives a more honest answer.",
    },
    {
      type: "list",
      items: [
        "Compare cover with the weeks left in the season: 12 weeks of cover with 5 weeks to go means markdown risk.",
        "Calculate it per style and size, not only per category, because a healthy total can hide missing sizes.",
        "Use a target range per category, for example 4–8 weeks for continuity lines, and flag everything outside it.",
        "Exclude stock that customers cannot buy yet, such as goods still in transit.",
      ],
    },
    { type: "h2", id: "definitions-sheet", text: "Retail KPI Definitions Sheet" },
    {
      type: "p",
      text: "Every argument about numbers I have seen in a trading meeting came back to definitions. A KPI definitions sheet settles them once. It is a simple table, kept next to the report, that nobody changes without agreement.",
    },
    {
      type: "table",
      caption: "Example structure of a KPI definitions sheet",
      columns: [
        { label: "KPI", kind: "text" },
        { label: "Definition", kind: "text" },
        { label: "Data source", kind: "text" },
        { label: "Owner", kind: "text" },
      ],
      rows: [
        { cells: ["Net sales", "Sales excl. VAT after returns and discounts", "Sales system", "Finance"] },
        { cells: ["Sell-through %", "Net units ÷ (opening stock + received)", "Sales and stock tables", "Planning"] },
        { cells: ["Stock turn", "COGS ÷ average of month-end stock at cost", "Finance and stock tables", "Finance"] },
        { cells: ["GMROI", "Gross margin ÷ average of month-end stock at cost", "Finance and stock tables", "Finance"] },
        { cells: ["Weeks of cover", "Stock units ÷ average units sold, last 4 weeks", "Sales and stock tables", "Planning"] },
      ],
    },
    {
      type: "p",
      text: "Add a column for the refresh frequency and one for the date of the last change, and link the sheet from every dashboard page. When I set up retail reporting in Power BI, this sheet is written before the first visual.",
    },
  ],
  faqTitle: "Retail KPIs FAQ",
  faq: [
    {
      question: "What are the 5 KPIs in retail?",
      answer: "There is no official list, but for a fashion brand I would pick net sales against last year, gross margin, sell-through, weeks of cover and GMROI. Together they cover growth, profitability and stock health. Store-based retailers often add conversion rate and sales per square metre.",
    },
    {
      question: "What is a good stock turnover ratio?",
      answer: "It depends on the category. As a rule of thumb, seasonal fashion apparel often turns 3 to 6 times a year, while footwear and slow-moving categories turn less. The best benchmark is your own brand’s trend by category over several seasons.",
    },
    {
      question: "How do I calculate GMROI in Excel?",
      answer: "Put gross margin for the period in one cell and the month-end stock values at cost in a row of cells. Then divide: =B2/AVERAGE(C2:N2). Format the result as a number with two decimals, for example 2.35.",
    },
    {
      question: "What is a good GMROI in fashion retail?",
      answer: "A GMROI below 1 means stock earns less margin than it costs. Above 2 is generally healthy for fashion and above 3 is strong, but the right threshold depends on the brand’s operating costs. Agree it with finance and compare categories against it.",
    },
    {
      question: "How do you calculate weeks of cover?",
      answer: "Divide current stock units by average weekly sales units. With 1,200 units in stock and 150 units sold per week, you have 8 weeks of cover. Use a four-week average or a forecast rather than a single week.",
    },
  ],
  seo: {
    title: "Retail KPIs for Fashion Brands: Stock Turn, GMROI, Cover",
    description: "The retail KPIs a fashion brand should track weekly, with formulas for stock turn, GMROI and weeks of cover, benchmarks and two free calculators.",
  },
};
