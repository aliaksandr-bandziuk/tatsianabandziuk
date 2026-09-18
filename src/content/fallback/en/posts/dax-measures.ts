import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("dax-measures", "en"),
  title: "Five DAX Measures Every Retail KPI Dashboard Needs",
  h1: { before: "Five DAX Measures Every", accent: "Retail KPI Dashboard Needs" },
  excerpt: "Stock cover, full-price share, returns rate, weeks of supply and contribution margin as DAX measures for a Power BI retail dashboard.",
  lead: "A retail KPI dashboard in Power BI needs five DAX measures beyond sales and units: stock cover, full-price sales share, returns rate, weeks of supply and contribution margin. Written as measures rather than calculated columns, they recalculate correctly for any market, category or week the viewer selects.",
  date: "2026-07-10",
  readingMinutes: 5,
  body: [
    {
      type: "p",
      text: "Most retail dashboards I am asked to review already show sales, units and last year. What they miss are the measures that link sales with stock and profit, the ones a trading meeting actually argues about. Below are the five DAX measures I add to almost every retail model, with the definitions behind them. Table and column names are examples; the logic is what matters.",
    },
    { type: "h2", id: "measures-vs-columns", text: "DAX Measures vs Calculated Columns for Retail KPIs" },
    {
      type: "p",
      text: "DAX stands for Data Analysis Expressions, the formula language of Power BI, Power Pivot in Excel and Analysis Services. So yes, you can use DAX in Excel: the same measures work in a Power Pivot data model. It looks like Excel formulas but behaves differently, because a measure is evaluated at query time in the filter context of each cell of a visual.",
    },
    {
      type: "p",
      text: "A calculated column is computed once per row when the model refreshes and then stored. A measure is not stored; it recalculates for whatever the viewer has selected, whether that is one store, a category or the whole season. That leads to a simple test I use: if adding up the value across rows gives a wrong answer, it has to be a measure. Ratios such as sell-through, stock cover or margin percentage fail that test, so they are always measures. Attributes such as price tier or season code belong in columns.",
    },
    {
      type: "p",
      text: "Is DAX harder than SQL? Different rather than harder. SQL describes which rows to return; DAX describes how to aggregate whatever rows the report has filtered. The hard part is filter context, and every measure below uses it deliberately. They all build on three base measures:",
    },
    {
      type: "code",
      code: "Net Units :=\nSUM ( Sales[Units] ) - SUM ( Sales[ReturnUnits] )\n\nNet Sales :=\nSUM ( Sales[NetSalesExVAT] ) - SUM ( Sales[ReturnValueExVAT] )\n\nCOGS :=\nSUM ( Sales[LandedCost] ) - SUM ( Sales[ReturnLandedCost] )",
      caption: "Base measures. Values excluding VAT, cost at landed cost.",
    },
    {
      type: "p",
      text: "Before a new measure goes into a report, I check it against Excel. Pick a small, well-known slice, such as one category in one week, export the underlying rows, recalculate the KPI with ordinary formulas and compare it with a Power BI table filtered to the same slice. When the numbers differ, the cause is usually filter context: blank rows, an inactive relationship or a missing date filter.",
    },
    { type: "h2", id: "stock-cover", text: "Stock Cover Measure in DAX" },
    {
      type: "p",
      text: "Stock cover tells you how many weeks the current stock would last at the recent rate of sale. I define it as closing stock units divided by average weekly net units over the last four weeks. Stock is a snapshot, so it must not be summed over time: the measure takes the last date with stock in the selected period.",
    },
    {
      type: "code",
      code: "Stock Units :=\nCALCULATE (\n    SUM ( Stock[Units] ),\n    LASTNONBLANK ( 'Date'[Date], CALCULATE ( SUM ( Stock[Units] ) ) )\n)\n\nAvg Weekly Units 4W :=\nVAR LastDay = MAX ( 'Date'[Date] )\nRETURN\n    DIVIDE (\n        CALCULATE ( [Net Units], DATESINPERIOD ( 'Date'[Date], LastDay, -28, DAY ) ),\n        4\n    )\n\nStock Cover (weeks) :=\nDIVIDE ( [Stock Units], [Avg Weekly Units 4W] )",
      caption: "Stock cover in weeks from a weekly stock snapshot table.",
    },
    {
      type: "p",
      text: "DIVIDE is the answer to the common question of how to divide two measures in DAX: it returns blank instead of an error when the denominator is zero, which happens every time a style has stock but no sales yet. You can sense-check the result with the calculator below.",
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
      note: "Weeks of cover = current stock ÷ average weekly sales. Stock turn = COGS ÷ average inventory.",
    },
    { type: "h2", id: "full-price-share", text: "Full-Price Sales Share Measure in DAX" },
    {
      type: "p",
      text: "Full-price share shows how much of the business is sold at the original ticket price, before markdowns and promotions. In fashion it is one of the best early signals of margin: a season with strong sales but a falling full-price share is buying volume with discount. The measure needs a clean price-type attribute on every sales line, which is a data task before it is a DAX task.",
    },
    {
      type: "code",
      code: "Full-Price Sales :=\nCALCULATE ( [Net Sales], Sales[PriceType] = \"Full price\" )\n\nFull-Price Share % :=\nDIVIDE ( [Full-Price Sales], [Net Sales] )",
      caption: "Full-price share by value. Build a units version the same way if buyers prefer it.",
    },
    { type: "h2", id: "returns-rate", text: "Returns Rate Measure in DAX" },
    {
      type: "p",
      text: "The returns rate is returned units divided by gross units sold. Online fashion lives or dies by it, and dresses, trousers and footwear usually run far higher than accessories. The subtle part is timing. Counted by return date, a week after a big promotion shows a spike in returns against normal sales. Counted by the original sale date, the rate is correct for that sale, but recent weeks look better than they are because their returns have not arrived yet.",
    },
    {
      type: "code",
      code: "Returns Rate % :=\nDIVIDE ( SUM ( Sales[ReturnUnits] ), SUM ( Sales[Units] ) )\n\nReturns Rate by Sale Date % :=\nCALCULATE (\n    DIVIDE ( SUM ( Returns[Units] ), SUM ( Sales[Units] ) ),\n    USERELATIONSHIP ( Returns[OriginalSaleDate], 'Date'[Date] )\n)",
      caption: "The first version counts returns booked in the sales table on the return date; the second uses a returns table with an inactive relationship on the original sale date.",
    },
    { type: "h2", id: "weeks-of-supply", text: "Weeks of Supply Measure in DAX" },
    {
      type: "p",
      text: "Weeks of supply looks similar to stock cover, but it looks forward instead of back. I define it as stock plus open orders divided by the planned or forecast weekly sales for the coming weeks. Stock cover answers “how long will this last at today’s pace?”; weeks of supply answers “is what we own and have ordered enough for the plan?”. Both are useful, and a dashboard should say clearly which one it shows.",
    },
    {
      type: "code",
      code: "Weeks of Supply :=\nVAR LastDay = MAX ( 'Date'[Date] )\nVAR PlannedWeekly =\n    DIVIDE (\n        CALCULATE (\n            SUM ( Plan[Units] ),\n            DATESINPERIOD ( 'Date'[Date], LastDay + 1, 28, DAY )\n        ),\n        4\n    )\nRETURN\n    DIVIDE ( [Stock Units] + SUM ( Orders[OpenUnits] ), PlannedWeekly )",
      caption: "Needs a date table that extends into the future and a plan table at week level.",
    },
    { type: "h2", id: "contribution-margin", text: "Contribution Margin Measure in DAX" },
    {
      type: "p",
      text: "Gross margin stops at the cost of goods. Contribution margin also deducts the variable costs of selling: fulfilment, payment fees, marketplace commissions and returns handling. For a brand selling online, a category can look healthy on gross margin and weak on contribution margin simply because of its returns rate, which is why I place the two side by side.",
    },
    {
      type: "code",
      code: "Gross Margin :=\n[Net Sales] - [COGS]\n\nVariable Selling Costs :=\nSUMX ( Sales, Sales[Units] * RELATED ( CostRates[CostPerUnit] ) )\n    + SUMX ( Sales, Sales[NetSalesExVAT] * RELATED ( CostRates[FeeRate] ) )\n\nContribution Margin :=\n[Gross Margin] - [Variable Selling Costs]\n\nContribution Margin % :=\nDIVIDE ( [Contribution Margin], [Net Sales] )",
      caption: "Cost rates per channel in a small CostRates table related to Sales.",
    },
    {
      type: "p",
      text: "Here is the idea with illustrative numbers: a category with net sales of 100,000, COGS of 42,000 and variable selling costs of 18,000 has a gross margin of 58% and a contribution margin of 40%. Agree the cost rates with finance once and document them; otherwise every meeting reopens the question.",
    },
    { type: "h2", id: "running-total", text: "Running Total DAX Pattern for Season-to-Date KPIs" },
    {
      type: "p",
      text: "Retail reports rarely stop at a single week. Buyers want season-to-date sales, full-price share and margin next to the week. The classic running total in DAX keeps the season and removes the date filter up to the last visible day:",
    },
    {
      type: "code",
      code: "Net Sales STD :=\nVAR LastDay = MAX ( 'Date'[Date] )\nVAR CurrentSeason = MAX ( 'Date'[Season] )\nRETURN\n    CALCULATE (\n        [Net Sales],\n        REMOVEFILTERS ( 'Date' ),\n        'Date'[Season] = CurrentSeason,\n        'Date'[Date] <= LastDay\n    )\n\n-- Financial year to date, year ending 31 January\nNet Sales FYTD :=\nCALCULATE ( [Net Sales], DATESYTD ( 'Date'[Date], \"1/31\" ) )",
      caption: "Season-to-date and financial-year-to-date running totals.",
    },
    {
      type: "p",
      text: "Ratios need a little more care: season-to-date full-price share is season-to-date full-price sales divided by season-to-date net sales, never an average of weekly percentages. The same rule applies to every measure in this article. Both patterns also need a proper date table, marked as a date table, with season and week columns.",
    },
    {
      type: "list",
      items: [
        "Stock cover: closing stock ÷ average weekly sales of the last four weeks.",
        "Full-price share: sales at original price ÷ net sales.",
        "Returns rate: returned units ÷ gross units sold, by return date or by sale date.",
        "Weeks of supply: stock plus open orders ÷ planned weekly sales ahead.",
        "Contribution margin: gross margin minus variable selling costs.",
      ],
    },
    {
      type: "p",
      text: "These five, together with sell-through, cover most of what a weekly trading review needs. My article on sell-through rate shows that measure in DAX, and the one on Power BI dashboard examples shows how I lay these KPIs out on a page.",
    },
  ],
  faqTitle: "DAX Measures for Retail KPIs: Common Questions",
  faq: [
    {
      question: "What is a DAX measure in Power BI?",
      answer:
        "A DAX measure is a formula that Power BI evaluates at query time in the context of the current visual, slicers and filters. Unlike a calculated column, it is not stored row by row, so the same measure returns the right value for a single store, a category or the whole season. Ratios such as sell-through or returns rate should always be measures.",
    },
    {
      question: "How do I create a running total in DAX?",
      answer:
        "The usual pattern is CALCULATE([Sales], FILTER(ALL('Date'[Date]), 'Date'[Date] <= MAX('Date'[Date]))), which sums everything up to the last date in the current context. For season-to-date figures, keep the season filter and remove only the date filter, or use DATESYTD with a year-end argument when the season follows a fixed financial year. A proper date table marked as such is required for either approach.",
    },
    {
      question: "Which retail KPIs should be DAX measures?",
      answer:
        "Every KPI that is a ratio or depends on the selected period should be a measure: sell-through, stock cover, weeks of supply, full-price share, returns rate, margin percentage and GMROI. Attributes that describe a product, such as price tier or season code, belong in columns. A simple test: if adding up the value across rows gives a wrong answer, it has to be a measure.",
    },
    {
      question: "How do I check a DAX measure against Excel?",
      answer:
        "Pick a small, well-known slice, such as one category in one week, and export the underlying rows to Excel. Recalculate the KPI there with ordinary formulas and compare it with the measure shown in a Power BI table filtered to the same slice. If the figures differ, check filter context first: blank rows, inactive relationships and missing date filters cause most mismatches.",
    },
  ],
  seo: {
    title: "DAX Measures for a Retail KPI Dashboard in Power BI",
    description: "Five DAX measures for a retail KPI dashboard in Power BI: stock cover, full-price share, returns rate, weeks of supply and contribution margin.",
  },
};
