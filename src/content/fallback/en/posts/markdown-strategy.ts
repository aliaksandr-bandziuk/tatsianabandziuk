import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("markdown-strategy", "en"),
  title: "Markdown Strategy in Fashion Retail: When and How Deep to Discount",
  h1: { before: "Markdown Strategy in Fashion Retail:", accent: "When and How Deep to Discount" },
  excerpt: "How to calculate a markdown, time it by sell-through and choose a discount depth that clears stock without giving away more margin than needed.",
  lead: "A markdown strategy sets when a fashion product is discounted and by how much, so that seasonal stock sells out by the end of its life with the least possible loss of margin. The decision is best driven by each product’s sell-through against plan and its remaining weeks, not by a fixed sale calendar alone.",
  date: "2026-05-22",
  readingMinutes: 5,
  body: [
    {
      type: "p",
      text: "Every fashion season ends with stock that did not sell at full price. The question is not whether to mark it down but when and how deep. In my experience the expensive mistakes come from two habits: waiting for the big seasonal sale to touch anything, and then taking the same 50% off everything at once. A retail markdown strategy replaces both with a weekly decision per product, based on a few numbers you already have.",
    },
    { type: "h2", id: "markdown-vs-markup", text: "Markdown vs Markup in Retail" },
    {
      type: "p",
      text: "The two words sound alike and point in opposite directions. Markup is the amount added to the cost to reach the selling price, usually expressed as a percentage of cost. Markdown is a reduction from the original selling price, expressed as a percentage of that price. A jacket that costs 20 and sells at 50 carries a 150% markup. Selling it at 35 is a 30% markdown.",
    },
    {
      type: "p",
      text: "Because the bases differ, the percentages cannot be added or subtracted. A 150% markup followed by a 30% markdown does not leave 120% of anything; it leaves a price of 35 and a margin of 15 per unit. I explain the markup side in detail in my article on markup vs margin.",
    },
    {
      type: "p",
      text: "Markdowns also come in different types, and it helps to keep them apart in reporting:",
    },
    {
      type: "list",
      items: [
        "Permanent markdown: the ticket price is lowered for everyone until the product sells out. This is the main tool of a markdown strategy.",
        "Promotional markdown: a temporary reduction for an event or a weekend, after which the price goes back up.",
        "Clearance: the final, deepest step at the end of the product’s life, often moved to outlet or online sale areas.",
        "Discounts, such as loyalty or employee discounts and codes, reduce the price for some customers only. They cost margin too, but they are not part of the product’s price path.",
      ],
    },
    { type: "h2", id: "calculate-markdown", text: "How to Calculate a Markdown" },
    { type: "formula", text: "markdown % = (original price − reduced price) ÷ original price × 100" },
    {
      type: "p",
      text: "Reducing a dress from 80 to 60 is a 25% markdown. For planning, the percentage matters less than the markdown cost, which is what the discount takes out of gross margin:",
    },
    { type: "formula", text: "markdown cost = (original price − reduced price) × units sold at the reduced price" },
    {
      type: "p",
      text: "If 300 of those dresses sell at 60, the markdown cost is 20 × 300 = 6,000. Markdown cost only counts units actually sold at the lower price, so taking a markdown on stock that then does not sell costs nothing on paper, but it has still failed.",
    },
    {
      type: "p",
      text: "The markdown rate for a category or season is the total markdown cost as a share of sales. Some teams divide by actual net sales, others by sales at original price, which gives a lower figure. Both are fine as long as the report says which one it uses and last year is calculated the same way.",
    },
    { type: "h2", id: "markdown-timing", text: "Markdown Timing by Sell-Through" },
    {
      type: "p",
      text: "The best trigger for a markdown is a product selling slower than planned for its age. I look at two numbers each week: cumulative sell-through against the plan for the same week since launch, and weeks of cover against the weeks the product has left to sell.",
    },
    { type: "formula", text: "weeks of cover = stock on hand ÷ average weekly sales of the last three weeks" },
    {
      type: "p",
      text: "A product with 400 units in stock, selling 20 a week, has 20 weeks of cover. If its season ends in six weeks, it will finish with about 280 units unless something changes. As a rule of thumb, sell-through below 30–40% after half of the selling weeks is a warning in seasonal fashion, although the threshold differs by category. Outerwear, for example, often waits for the weather.",
    },
    {
      type: "table",
      caption: "Illustrative data · weekly markdown review for a summer range",
      columns: [
        { label: "Style", kind: "text" },
        { label: "Weeks on sale", kind: "number" },
        { label: "Sell-through", kind: "number", format: "scale", suffix: "%" },
        { label: "Plan", kind: "number", suffix: "%" },
        { label: "Weeks of cover", kind: "number" },
        { label: "Weeks left", kind: "number" },
        { label: "Action", kind: "text" },
      ],
      rows: [
        { cells: ["Linen dress", 6, 48, 45, 5, 6, "Hold"] },
        { cells: ["Printed blouse", 6, 28, 45, 14, 6, "Markdown"] },
        { cells: ["Cropped trousers", 8, 35, 55, 9, 4, "Markdown"] },
        { cells: ["Denim jacket", 4, 22, 30, 7, 8, "Watch"] },
        { cells: ["Knitted vest", 10, 71, 65, 2, 2, "Hold"] },
      ],
    },
    {
      type: "p",
      text: "An early, shallow markdown on a slow line usually costs less margin than a deep one at the end of the season, because there is still time for a small reduction to work. Products selling to plan stay at full price, even when the sale starts around them.",
    },
    { type: "h2", id: "markdown-depth", text: "Markdown Depth and Margin Scenarios" },
    {
      type: "p",
      text: "Many fashion retailers start with a first markdown of 20–30%, because smaller reductions rarely change customer behaviour enough to matter. The trouble with deeper cuts is how quickly they eat margin. Take a product with a cost of 20 and a price of 50, earning 30 per unit at full price. The table shows how many more units each markdown depth must sell to earn the same gross margin.",
    },
    { type: "formula", text: "units multiple needed = full-price margin per unit ÷ margin per unit after markdown" },
    {
      type: "table",
      caption: "Illustrative data · cost 20, original price 50, prices excluding VAT",
      columns: [
        { label: "Markdown", kind: "number", suffix: "%" },
        { label: "Price", kind: "number" },
        { label: "Margin per unit", kind: "number", format: "bars" },
        { label: "Gross margin", kind: "number", suffix: "%" },
        { label: "Units needed vs full price", kind: "number", format: "scale", suffix: "×" },
      ],
      rows: [
        { cells: [0, 50, 30, 60, 1] },
        { cells: [20, 40, 20, 50, 1.5] },
        { cells: [30, 35, 15, 43, 2] },
        { cells: [40, 30, 10, 33, 3] },
        { cells: [50, 25, 5, 20, 6] },
      ],
    },
    {
      type: "p",
      text: "Late in the season, the fair comparison is not with full price but with doing nothing. Back to the product with 400 units and six weeks left: at full price it sells about 120 more units and earns 3,600, and the other 280 go to an outlet at roughly cost. If I assume a 30% markdown lifts sales to 55 a week, it sells 330 units and earns 4,950. If I assume 50% off lifts sales to 80 a week, it clears all 400 but earns only 2,000. The sales lifts are assumptions; your own history of past markdowns is the best source for them.",
    },
    {
      type: "p",
      text: "Use the calculator to test your own product: enter the reduced price as the selling price to see what margin is left.",
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
    { type: "h2", id: "markdown-optimisation", text: "Markdown Optimisation Without Software" },
    {
      type: "p",
      text: "Markdown optimisation software models price elasticity per product and proposes the price path. It can be worth it for large ranges, but a disciplined weekly routine in Excel or Power BI gets a smaller brand most of the way. What I set up:",
    },
    {
      type: "list",
      items: [
        "One review table per week with sell-through, plan, weeks of cover and weeks left for every seasonal option.",
        "A flag rule agreed in advance, so the discussion is about exceptions, not about every line.",
        "A fixed ladder of markdown steps, for example 20%, 30%, 50%, so prices stay readable and the next step is known.",
        "A log of every markdown: date, depth, weekly sales before and after. After two seasons this log is your own elasticity data.",
        "A last date for each product’s final clearance, set from its planned end of life, not from the sale calendar.",
      ],
    },
    {
      type: "code",
      code: "' C = sell-through, D = plan for this week, E = weeks of cover, F = weeks left\n=IF(AND(C2 < D2*0.8, E2 > F2), \"Markdown\",\n  IF(C2 < D2*0.8, \"Watch\", \"Hold\"))",
      caption: "Excel flag for the weekly markdown review. The 0.8 tolerance is a starting point; tune it per category.",
    },
    {
      type: "p",
      text: "The flag only proposes. A buyer may know that a delayed delivery explains a slow start, or that a style is about to feature in a campaign. But when the default is agreed and written down, markdowns stop being decided by who argues hardest in the meeting. For the sell-through measure behind the flag, see my article on how to calculate sell-through rate.",
    },
  ],
  faqTitle: "Markdown Strategy: Common Questions",
  faq: [
    {
      question: "What is the difference between markdown and markup?",
      answer:
        "Markup is the amount added to the cost to reach the selling price, usually expressed as a percentage of cost. Markdown is a reduction from the original selling price, expressed as a percentage of that price. A jacket that costs 20 and sells at 50 carries a 150% markup; selling it at 35 is a 30% markdown.",
    },
    {
      question: "How do you calculate a markdown?",
      answer:
        "Markdown percentage = (original price − reduced price) ÷ original price × 100. For example, reducing a dress from 80 to 60 is a 25% markdown. For planning, also track markdown cost: the price reduction multiplied by the units sold at the reduced price, because that is what the discount takes out of gross margin.",
    },
    {
      question: "When should a fashion retailer take a markdown?",
      answer:
        "The usual trigger is sell-through falling behind plan for the product’s age, for example below 30–40% after half of its selling weeks, although the threshold differs by category. An early, shallow markdown on a slow line usually costs less margin than a deep one at the end of the season. Products that are selling to plan should stay at full price.",
    },
    {
      question: "How deep should a first markdown be?",
      answer:
        "Many fashion retailers start at 20–30%, because smaller reductions rarely change customer behaviour enough to matter. Go deeper only when there is little time left and a lot of stock. Before choosing a depth, compare margin scenarios: the extra units a discount must sell to earn the same gross margin rise quickly as the markdown deepens.",
    },
  ],
  seo: {
    title: "Markdown Strategy in Fashion Retail: Timing and Depth",
    description: "Markdown vs markup, how to calculate a markdown, when to discount by sell-through and how deep to go: a practical retail markdown strategy for fashion.",
  },
};
