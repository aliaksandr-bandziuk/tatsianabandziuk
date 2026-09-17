import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("markup-vs-margin", "en"),
  title: "Markup vs Margin in Fashion Retail: Formulas and a Worked Example",
  h1: { before: "Markup vs Margin in Fashion Retail: Formulas and", accent: "a Worked Example" },
  excerpt: "Markup is calculated on cost, margin on the selling price. Formulas, a conversion table, a margin calculator and the mistakes that cost retailers money.",
  lead: "Markup and margin use the same profit but divide it by different numbers: markup divides profit by cost, margin divides it by the selling price. That is why a 100% markup is only a 50% margin, and below I show the formulas, a conversion table and a margin and markup calculator you can use straight away.",
  date: "2026-09-03",
  readingMinutes: 7,
  body: [
    { type: "h2", id: "difference", text: "Markup vs Margin: The Difference in One Table" },
    {
      type: "p",
      text: "Take a jacket bought at 20 and sold at 50, both excluding VAT. The gross profit is 30 either way. Markup compares those 30 with the cost of 20, so it is 150%. Margin compares them with the price of 50, so it is 60%. Same jacket, same profit, two very different percentages.",
    },
    {
      type: "table",
      caption: "Markup vs margin at a glance · illustrative jacket: cost 20, price 50",
      columns: [
        { label: "Aspect", kind: "text" },
        { label: "Markup", kind: "text" },
        { label: "Margin", kind: "text" },
      ],
      rows: [
        { cells: ["Divides profit by", "Cost", "Selling price"] },
        { cells: ["Formula", "(price − cost) ÷ cost", "(price − cost) ÷ price"] },
        { cells: ["Jacket example", "30 ÷ 20 = 150%", "30 ÷ 50 = 60%"] },
        { cells: ["Can exceed 100%?", "Yes", "No"] },
        { cells: ["Who uses it most", "Buyers setting prices from cost", "Finance and trading reports"] },
        { cells: ["Answers the question", "How much do I add to cost?", "How much of each sale do I keep?"] },
      ],
    },
    {
      type: "p",
      text: "Markup is a pricing tool: you start from cost and decide what to add. Margin is a performance measure: you start from the sale and see what is left. Problems begin when a buyer talks in markup and a finance report talks in margin, and both simply say “60%”.",
    },
    {
      type: "calculator",
      kind: "marginMarkup",
      title: "Margin and markup calculator",
      labels: {
        cost: "Cost per unit (excl. VAT)",
        price: "Selling price (excl. VAT)",
        targetMargin: "Target margin",
        margin: "Gross margin",
        markup: "Markup",
        profit: "Gross profit per unit",
        targetPrice: "Price for target margin",
      },
      note: "Margin = (price − cost) ÷ price. Markup = (price − cost) ÷ cost. Price for a target margin = cost ÷ (1 − target margin).",
    },
    { type: "h2", id: "formulas", text: "Markup Formula and Margin Formula" },
    { type: "formula", text: "markup % = (selling price − cost) ÷ cost × 100" },
    { type: "formula", text: "gross margin % = (selling price − cost) ÷ selling price × 100" },
    {
      type: "p",
      text: "To find the price that delivers a given margin, divide cost by one minus the margin. A dress costing 18 with a target margin of 65% needs a price of 18 ÷ 0.35 = 51.43 before VAT. A buyer would then round it to the nearest price point on the ladder, for example 49.99 or 54.99, and check what that does to the margin.",
    },
    { type: "formula", text: "price for target margin = cost ÷ (1 − target margin)" },
    {
      type: "p",
      text: "Two definitions need to be agreed before any of this is useful. First, which cost: I use landed cost, meaning the purchase price plus freight, duty and any agent fees, because that is what the product really costs the business. Second, which price: always net of VAT. A price including 23% VAT makes the margin look far better than it is.",
    },
    { type: "h2", id: "convert", text: "How to Convert Markup to Margin" },
    {
      type: "p",
      text: "You do not need the cost or the price to convert one percentage into the other. Write both as decimals and use these two formulas:",
    },
    { type: "formula", text: "margin = markup ÷ (1 + markup)    ·    markup = margin ÷ (1 − margin)" },
    {
      type: "p",
      text: "A 150% markup is 1.5 ÷ 2.5 = 60% margin. A 70% margin is 0.7 ÷ 0.3 = 233% markup. The table lists the pairs that come up most often in fashion buying, together with the price multiplier, which is simply price divided by cost.",
    },
    {
      type: "table",
      caption: "Markup to margin conversion for common values",
      columns: [
        { label: "Markup", kind: "number", suffix: "%" },
        { label: "Gross margin", kind: "number", format: "bars", suffix: "%" },
        { label: "Price multiplier", kind: "number", suffix: "×" },
      ],
      rows: [
        { cells: [25, 20, 1.25] },
        { cells: [33.3, 25, 1.33] },
        { cells: [50, 33.3, 1.5] },
        { cells: [100, 50, 2] },
        { cells: [150, 60, 2.5] },
        { cells: [185.7, 65, 2.86] },
        { cells: [233.3, 70, 3.33] },
        { cells: [300, 75, 4] },
      ],
    },
    {
      type: "p",
      text: "Notice how the gap widens. Up to a 50% markup the two numbers are close; at the markups typical for fashion they are far apart, which is exactly where confusion becomes expensive.",
    },
    {
      type: "p",
      text: "A quick mental check helps in supplier meetings: a price multiplier of 2 means a 50% margin, 2.5 means 60%, and roughly 3.3 means 70%. If a buyer quotes a markup above 100%, it cannot be a margin, and if someone quotes a margin above 80% for a fashion product, it is worth asking whether VAT or freight was left out.",
    },
    { type: "h2", id: "initial-markup", text: "Initial Markup and Retail Margin in Fashion Buying" },
    {
      type: "p",
      text: "Fashion buying adds one more layer, because the first price is rarely the price at which everything sells. Initial markup, often called intake margin in UK buying teams, is the margin planned on the original full price. The retail margin the business actually achieves comes later, after markdowns, promotions and returns.",
    },
    { type: "formula", text: "initial markup (on retail) % = (original retail price − landed cost) ÷ original retail price × 100" },
    {
      type: "p",
      text: "Be careful with the name: in retail maths “markup on retail” is calculated on the price, so it equals the margin formula, while “markup on cost” is the markup formula above. Always check which one a supplier, a system or a colleague means.",
    },
    {
      type: "list",
      items: [
        "Intake or initial margin: set when the range is bought; it has to be high enough to fund the markdowns that will follow.",
        "Achieved or realised margin: what remains after all price reductions; this is what finance reports at season end.",
        "Margin erosion: the difference between the two, usually driven by markdown depth and the share of stock sold at reduced prices.",
        "Price multiplier: the quick check buyers use at a supplier meeting, for example a cost of 15 times 3.3 for a retail price near 49.99.",
      ],
    },
    {
      type: "p",
      text: "In practice, a buyer who needs a 55% achieved margin and expects a quarter of the units to sell at 40% off must plan a noticeably higher intake margin. Working that out category by category, with realistic sell-through assumptions, is the core of a good margin plan.",
    },
    {
      type: "p",
      text: "Here is the arithmetic with illustrative numbers. A style costs 20 and is priced at 50, so the intake margin is 60%. Of 100 units, 75 sell at full price and 25 sell at 40% off, for 30 each. Revenue is 75 × 50 + 25 × 30 = 4,500, the cost of the 100 units is 2,000, and the achieved margin is 2,500 ÷ 4,500 = 55.6%. Four and a half points disappeared, and that is before promotions and returns. If the plan needs 60% achieved, the intake margin has to start higher, or the markdown share has to be smaller.",
    },
    {
      type: "p",
      text: "This is also why I prefer to set margin targets per category rather than one number for the whole range. Basics that rarely go on sale can live with a lower intake margin, while trend pieces with a high markdown risk need a bigger cushion.",
    },
    { type: "h2", id: "mistakes", text: "Markup vs Margin Mistakes in Retail Pricing" },
    {
      type: "p",
      text: "The formulas are simple, yet the same errors appear in pricing files again and again. These are the ones I check for first:",
    },
    {
      type: "list",
      items: [
        "Adding a margin percentage to cost: cost 20 plus 60% gives 32, which is a 37.5% margin, not 60%.",
        "Calculating margin on prices that include VAT.",
        "Using the supplier price instead of landed cost, so freight and duty quietly eat the margin.",
        "Comparing an intake margin plan with an achieved margin report and calling the gap a failure of the season.",
        "Averaging style margins instead of dividing total profit by total sales, which overweights small styles.",
        "Leaving the word “markup” undefined in a pricing file shared between buying and finance.",
      ],
    },
    {
      type: "p",
      text: "Most of these mistakes disappear once the pricing file states its definitions on the first tab. When I review pricing across categories or markets, agreeing those definitions is the first thing I do, before any price is changed.",
    },
  ],
  faqTitle: "Markup vs Margin FAQ",
  faq: [
    {
      question: "What is the difference between markup and margin?",
      answer: "Markup divides gross profit by cost, while margin divides the same profit by the selling price. A product bought at 20 and sold at 50 has a 150% markup and a 60% margin. Markup can exceed 100%, margin cannot.",
    },
    {
      question: "How do I convert markup to margin?",
      answer: "Write the markup as a decimal and use margin = markup ÷ (1 + markup). A 100% markup gives 1 ÷ 2 = 50% margin. To go the other way, use markup = margin ÷ (1 − margin).",
    },
    {
      question: "Is a 50% markup the same as a 50% margin?",
      answer: "No. A 50% markup on a cost of 20 gives a price of 30 and a margin of 33.3%. To reach a 50% margin, you need a 100% markup, which means doubling the cost.",
    },
    {
      question: "How do I calculate the price for a target margin?",
      answer: "Divide the cost by one minus the target margin. For a cost of 20 and a 60% target margin, the price is 20 ÷ 0.4 = 50 before VAT. Then round it to a price point that fits your price architecture and recheck the margin.",
    },
    {
      question: "What is initial markup in retail?",
      answer: "Initial markup is the margin planned on the original full retail price when the stock is bought. It is usually higher than the margin achieved at season end, because markdowns and promotions reduce the price of part of the stock.",
    },
  ],
  seo: {
    title: "Markup vs Margin: Formulas, Examples and a Calculator",
    description: "Markup vs margin in one table, with formulas, a markup-to-margin conversion chart and a free margin and markup calculator for retail pricing.",
  },
};
