import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("sell-in-sell-through", "en"),
  title: "Sell-In vs Sell-Through: Why Commercial and Finance Numbers Differ",
  h1: { before: "Sell-In vs Sell-Through:", accent: "Why Commercial and Finance Numbers Differ" },
  excerpt: "Sell-in, sell-through and sell-out explained, and why commercial and finance teams report different sell-through figures for the same season.",
  lead: "Sell-in is what a brand ships to its stores or retail partners, sell-through is the share of that stock sold to end customers, and sell-out is the customer sales volume itself. Commercial and finance teams often report different sell-through numbers because they use different denominators, time windows and treatment of returns.",
  date: "2026-05-29",
  readingMinutes: 5,
  body: [
    {
      type: "p",
      text: "Few things waste as much time in a trading meeting as two sell-through numbers for the same season. The commercial team says 57%, finance says 68%, and the next half hour goes on deciding who is right. Usually both are, because they are measuring different things under the same name. Here is how I separate sell-in, sell-through and sell-out, where the definitions drift apart, and how to show all three in one Power BI report.",
    },
    { type: "h2", id: "definitions", text: "Sell-In, Sell-Through and Sell-Out Definitions" },
    {
      type: "list",
      items: [
        "Sell-in: units or value moved from the brand into the channel. For a wholesale brand, these are shipments invoiced to retail partners. For a brand’s own retail, it is stock delivered from the warehouse to stores or to the online fulfilment centre.",
        "Sell-out: units or value bought by end customers in a period, net of returns. It is an absolute number: 900 units, or 45k.",
        "Sell-through: sell-out expressed as a share of the stock that was available, for example 600 units sold out of 1,000 received is 60%.",
      ],
    },
    {
      type: "p",
      text: "So sell-out tells you volume, and sell-through tells you how well the quantity you bought or shipped is performing. You will find sources that use sell-through and sell-out as synonyms; in retail reporting it pays to keep them apart, because one is a count and the other is a rate.",
    },
    {
      type: "p",
      text: "Why finance cares so much about sell-in is a matter of revenue. For a wholesale business, revenue is generally recognised when the goods are delivered to the partner, not when a customer buys them, although sale-or-return and consignment deals change that and your finance team will have the exact rule. For own retail, revenue is the sell-out. A brand with both channels therefore has two different moments at which a unit counts as “sold”.",
    },
    { type: "h2", id: "sell-in-sell-through-example", text: "Sell-In vs Sell-Through Example for One Season" },
    {
      type: "p",
      text: "Take a simple season. A brand buys 10,000 units of a style. It sends 8,000 to its own stores and online shop and ships 2,000 to a wholesale partner. Own channels sell 5,200 units, of which 400 come back. The partner reports a sell-out of 900 units.",
    },
    {
      type: "table",
      caption: "Illustrative data · one style, one season, units",
      columns: [
        { label: "View", kind: "text" },
        { label: "Units counted as sold", kind: "number" },
        { label: "Denominator", kind: "number" },
        { label: "Sell-through", kind: "number", format: "scale", suffix: "%" },
      ],
      rows: [
        { cells: ["Own stores and online", 4800, 8000, 60] },
        { cells: ["Wholesale partner, sell-out", 900, 2000, 45] },
        { cells: ["All channels, end customers", 5700, 10000, 57] },
        { cells: ["All channels, shipments to partner as sold", 6800, 10000, 68] },
      ],
    },
    {
      type: "p",
      text: "The last row is how the season looks if wholesale shipments count as sold, which is natural from a revenue point of view. The third row is what end customers actually bought. The 11-point difference is 1,100 units sitting on the partner’s shelves. High sell-in with low sell-through is exactly this pattern: stock building up in the channel, which usually comes back later as returns, markdown support or smaller orders next season.",
    },
    { type: "h2", id: "definition-mismatches", text: "Three Sell-Through Definition Mismatches Between Teams" },
    {
      type: "p",
      text: "Wholesale is only one source of disagreement. When I compare commercial and finance reports, the gap almost always comes from one of three places.",
    },
    {
      type: "p",
      text: "The first is the denominator and the unit. Commercial teams usually divide net units sold by units received. Finance often divides sales by opening stock plus receipts, and does it in value at cost. On a style with 200 units of carry-over, 800 received and 600 net sold, that is 60% on one denominator and 75% on the other, and value weighting pulls the result towards expensive products. The calculator below shows how far the two unit denominators drift apart.",
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
    {
      type: "p",
      text: "The second is the time window. Finance closes by fiscal month, commercial teams by retail week or by weeks since launch. A report cut on the last Sunday and one cut on the last calendar day of the month will not match, especially in a month with a sale weekend at the edge.",
    },
    {
      type: "p",
      text: "The third is returns, transfers and shipments. Finance books a return in the period it comes back; many commercial reports net it against the original sale. Transfers between stores may be counted as receipts twice. And, as above, one team counts wholesale shipments as sold while the other waits for the partner’s sell-out data.",
    },
    { type: "h2", id: "agree-definition", text: "How to Agree One Sell-Through Definition with Finance" },
    {
      type: "p",
      text: "The fix is not to decide who was right. It is to write the definitions down and give different things different names. I use a short definition card for every KPI in the report, agreed with one person from finance and one from the commercial side:",
    },
    {
      type: "list",
      items: [
        "Name and formula, in words and in the exact calculation.",
        "Unit: units, value at retail or value at cost.",
        "Denominator: units received only, or opening stock plus receipts.",
        "Returns rule: netted against the original sale or booked in the period received.",
        "Period: retail week, fiscal month or weeks since launch, and the cut-off day.",
        "Channel scope: own retail, wholesale sell-in, wholesale sell-out, or all.",
        "Source tables and an owner who answers questions about it.",
      ],
    },
    {
      type: "p",
      text: "If both views are needed, they get two names, for example “customer sell-through” and “shipped share”. The same label should never hide two formulas. Once the card is signed off, it goes into the report description, so anyone reading the number can see how it was built.",
    },
    { type: "h2", id: "power-bi-report", text: "Sell-In vs Sell-Through in a Power BI Report" },
    {
      type: "p",
      text: "In the data model, sell-in and sell-out are two fact tables: shipments and customer sales. Both connect to the same date, product, store and customer dimensions, so they can sit in one visual. Stock in the channel is then simply cumulative sell-in minus cumulative sell-out.",
    },
    {
      type: "code",
      code: "Sell-In Units :=\nSUM ( Shipments[Units] )\n\nSell-Out Units :=\nSUM ( Sales[Units] ) - SUM ( Sales[ReturnUnits] )\n\nCustomer Sell-Through % :=\nVAR LastDay = MAX ( 'Date'[Date] )\nRETURN\n    DIVIDE (\n        CALCULATE ( [Sell-Out Units], REMOVEFILTERS ( 'Date' ), 'Date'[Date] <= LastDay ),\n        CALCULATE ( [Sell-In Units], REMOVEFILTERS ( 'Date' ), 'Date'[Date] <= LastDay )\n    )\n\nChannel Stock Units :=\nVAR LastDay = MAX ( 'Date'[Date] )\nRETURN\n    CALCULATE ( [Sell-In Units] - [Sell-Out Units], REMOVEFILTERS ( 'Date' ), 'Date'[Date] <= LastDay )",
      caption: "Example table and column names; filter by season through the product dimension.",
    },
    {
      type: "p",
      text: "The page I build shows weekly sell-in and sell-out as two lines, the channel stock as a column, and customer sell-through by channel in a small table. When the lines separate for several weeks, stock is piling up somewhere, and the table shows where.",
    },
    {
      type: "p",
      text: "One practical detail: partner sell-out data usually arrives later and less regularly than your own sales. I show the date of the latest partner file on the page. Without it, a sudden drop in wholesale sell-through is often just a missing week of data. For the rate itself, including what a good sell-through rate looks like in fashion, see my article on how to calculate sell-through rate.",
    },
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
  seo: {
    title: "Sell-In vs Sell-Through vs Sell-Out in Retail Reporting",
    description: "Sell-in, sell-through and sell-out explained, and the three definition mismatches that make commercial and finance teams report different numbers.",
  },
};
