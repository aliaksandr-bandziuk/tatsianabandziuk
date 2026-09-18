import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("pricing-strategy", "en"),
  title: "Retail Pricing Strategy for Fashion Brands: Methods and Examples",
  h1: { before: "Retail Pricing Strategy for Fashion Brands:", accent: "Methods and Examples" },
  excerpt: "Cost-plus, competitive, value-based, psychological and promotional pricing: how fashion brands choose a retail pricing strategy per category.",
  lead: "A retail pricing strategy is the set of rules a brand uses to decide what a product sells for, balancing cost, competitor prices, perceived value and the margin the business needs. Most fashion brands combine several methods, such as cost-plus for basics and value-based pricing for trend pieces, and choose the mix category by category.",
  date: "2026-07-17",
  readingMinutes: 6,
  body: [
    {
      type: "p",
      text: "Lists of “seven” or “ten” pricing strategies are easy to find, and most of them are correct. What they rarely say is that a fashion brand never uses just one. A white T-shirt, a statement coat and a clearance rail in the same store follow different pricing logic, and the skill is in deciding which logic applies where. This article goes through the methods I see in fashion retail and how I would choose between them.",
    },
    { type: "h2", id: "what-retail-pricing-means", text: "What Retail Pricing Means" },
    {
      type: "p",
      text: "Retail pricing is the process of setting the price the end customer pays in a shop or online. The retail price is that final ticket price, and in the UK and the rest of Europe it is shown including VAT. Behind it sit three other numbers: the landed cost, the wholesale price if the product also goes to retail partners, and the margin the business needs to cover its costs and markdowns.",
    },
    {
      type: "p",
      text: "A useful checklist is the five C’s of pricing. One common version names cost, customers, competitors, channels and company objectives. Cost sets the floor, customers and competitors set the ceiling, the channel decides who takes a share of the price, and the company’s positioning decides where between floor and ceiling you land.",
    },
    {
      type: "p",
      text: "Here is the basic arithmetic with illustrative numbers. A knitted jumper has a landed cost of 15, and the category targets a 65% margin. The price before VAT is 15 ÷ (1 − 0.65) = 42.86, or 51.43 with 20% UK VAT. Nobody puts 51.43 on a ticket, so the buyer picks 49.99. That leaves 41.66 before VAT and a margin of about 64%, a point below target but on a price point customers recognise. Try the numbers for your own products below.",
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
      note: "Margin = (price − cost) ÷ price. Price for a target margin = cost ÷ (1 − target margin). Enter prices without VAT.",
    },
    { type: "h2", id: "pricing-strategies-fashion", text: "Retail Pricing Strategies Used by Fashion Brands" },
    {
      type: "p",
      text: "These are the five main pricing strategies I meet in fashion retail. The table shows what each starts from and where it tends to fit.",
    },
    {
      type: "table",
      caption: "Retail pricing strategies in fashion at a glance",
      columns: [
        { label: "Strategy", kind: "text" },
        { label: "Starts from", kind: "text" },
        { label: "Typical use in fashion", kind: "text" },
      ],
      rows: [
        { cells: ["Cost-plus", "Landed cost plus a fixed markup", "Basics, continuity lines, private label"] },
        { cells: ["Competitive", "Prices of comparable brands", "Key items customers compare, such as jeans and white shirts"] },
        { cells: ["Value-based", "What customers are willing to pay", "Trend pieces, hero styles, collaborations"] },
        { cells: ["Psychological", "How customers read prices", "Entry prices, price thresholds, premium lines"] },
        { cells: ["Promotional", "A temporary discount", "Traffic events, clearance, launches"] },
      ],
    },
    {
      type: "p",
      text: "Cost-plus pricing is the simplest: apply a standard multiplier to cost. It guarantees the margin on paper but ignores the customer, so a lucky low-cost style ends up underpriced and an expensive fabric prices itself out of the market. Keystone pricing, doubling the wholesale price, is the retail version of the same idea.",
    },
    {
      type: "p",
      text: "Competitive pricing sets the price relative to a defined set of comparable brands, for example “within 5% of the main competitor on core denim”. It works for items customers compare directly, and it needs a regular price check, not a one-off exercise.",
    },
    {
      type: "p",
      text: "Value-based pricing starts from the customer: what would they pay for this particular dress, given the fabric, the fit and the brand? For trend pieces it usually beats cost-plus, because the perceived value has little to do with cost. It needs judgement and sales history, and it is where a good price architecture, with clear good, better and best tiers, helps most.",
    },
    {
      type: "p",
      text: "Two more terms appear in most lists. Everyday low pricing (EDLP) keeps prices stable and low with few promotions; high-low pricing sets higher regular prices and runs frequent promotions. Most fashion brands sit closer to high-low, with a planned end-of-season markdown on top.",
    },
    { type: "h2", id: "psychological-pricing", text: "Psychological Pricing in Fashion Retail" },
    {
      type: "p",
      text: "Psychological pricing uses the way customers read prices rather than the way accountants do. The familiar techniques in fashion are:",
    },
    {
      type: "list",
      items: [
        "Charm pricing: 39.99 reads closer to 30 than to 40, because people read the first digit first.",
        "Price thresholds: staying under a round number that customers use as a limit, such as 50 or 100.",
        "Round prices for premium lines: a clean 120 can signal quality and confidence where 119.99 would look like a discount store.",
        "Anchoring: one higher-priced item in a range, for example a leather version of a jacket, makes the core prices look reasonable next to it.",
        "Consistent endings: using the same endings across the range so the price ladder looks deliberate.",
      ],
    },
    {
      type: "p",
      text: "Does the .99 trick actually work? In my experience the ending matters much less than the threshold. Moving a price from 50 to 49.99 crosses a line customers notice; moving it from 44 to 43.99 changes almost nothing except the margin. I would rather spend the effort on getting the price tier right for the category, which has a far bigger effect than any ending.",
    },
    { type: "h2", id: "promotional-pricing", text: "Promotional Pricing and Its Effect on Margin" },
    {
      type: "p",
      text: "Promotional pricing means temporary discounts: seasonal sales, multibuys, event days, discount codes. Promotions bring traffic and clear stock, but a discount reduces margin far more than it reduces the price. The jacket from the margin example costs 20 and sells at 50, a 60% margin and 30 of profit per unit. At 20% off it sells at 40, the margin falls to 50% and each unit earns 20. To make the same total profit, the promotion has to sell 50% more units.",
    },
    { type: "formula", text: "break-even volume uplift = discount ÷ (margin − discount)" },
    {
      type: "table",
      caption: "Extra units needed to keep the same gross profit · discount and margin as a share of the full price",
      columns: [
        { label: "Margin before discount", kind: "text" },
        { label: "10% off", kind: "number", format: "scale", suffix: "%" },
        { label: "20% off", kind: "number", format: "scale", suffix: "%" },
        { label: "30% off", kind: "number", format: "scale", suffix: "%" },
      ],
      rows: [
        { cells: ["50% margin", 25, 66.7, 150] },
        { cells: ["60% margin", 20, 50, 100] },
        { cells: ["70% margin", 16.7, 40, 75] },
      ],
    },
    {
      type: "p",
      text: "The table explains why a 30% promotion on a 50% margin product rarely pays for itself on volume alone. It can still be the right decision if it clears stock that would otherwise need a deeper markdown later, which is why I judge promotions together with sell-through and weeks of cover, not in isolation. In the EU there is also a legal side: an announced price reduction has to be shown against the lowest price of the previous 30 days, so constant promotions weaken your own reference price.",
    },
    { type: "h2", id: "choose-pricing-strategy", text: "How to Choose a Retail Pricing Strategy by Category" },
    {
      type: "p",
      text: "I choose the pricing method per category, based on the role that category plays in the range. The rules of thumb I start from:",
    },
    {
      type: "list",
      items: [
        "Basics and continuity lines: cost-plus with a competitive check, stable prices and few promotions. Customers compare them, so consistency builds trust.",
        "Key comparison items, such as core denim: competitive pricing against a named set of brands, reviewed every season.",
        "Trend and hero pieces: value-based pricing on round or threshold price points, with a markdown budget planned from the start.",
        "Entry prices in each category: psychological thresholds, because they carry the “from” price customers remember.",
        "End-of-season stock: a planned markdown cadence rather than ad hoc promotions, as described in my article on markdown strategy.",
      ],
    },
    {
      type: "p",
      text: "Two checks keep the mix consistent. First, every category should have a clear price ladder, so that the methods above land on the same set of price points; my article on price architecture covers that. Second, the planned margin per category must be high enough to fund its promotions and markdowns, which is the gap between intake and achieved margin explained in my article on markup vs margin.",
    },
    {
      type: "p",
      text: "For brands selling in several countries there is one more layer: VAT, currency and local competitors differ, so the same method can give different prices per market. When I review retail pricing for a brand, I start with one category, one market and last season’s sales by price point, because that shows quickly which of these strategies the brand is really using, whatever the pricing policy says.",
    },
  ],
  faqTitle: "Retail Pricing Strategy: Common Questions",
  faq: [
    {
      question: "What is retail pricing?",
      answer:
        "Retail pricing is the process of setting the price the end customer pays in a shop or online. It starts from the product cost and the target margin, then adjusts for competitor prices, the brand’s positioning and the price points customers expect in the category. The result is a retail price per product and market, usually including VAT in Europe.",
    },
    {
      question: "What are the main retail pricing strategies?",
      answer:
        "The most common are cost-plus pricing (a fixed markup on cost), competitive pricing (set relative to comparable brands), value-based pricing (set by what customers are willing to pay), psychological pricing (price endings and thresholds such as 49.99) and promotional pricing (temporary discounts). Fashion brands also plan markdowns at the end of the season as part of the strategy, not as an afterthought.",
    },
    {
      question: "What is psychological pricing in fashion?",
      answer:
        "Psychological pricing uses the way customers read prices: 39.99 feels closer to 30 than to 40, and a round 120 can signal quality in a premium line. Fashion brands also use anchor prices, placing one higher-priced item in a range so that the core prices look reasonable. The effect is real but small compared with getting the price tier right for the category.",
    },
    {
      question: "How does promotional pricing affect margin?",
      answer:
        "A discount reduces margin far more than it reduces the price. For example, a jacket that costs 20 and sells at 50 has a 60% gross margin; at 20% off it sells at 40 and the margin falls to 50%, so each unit earns 20 instead of 30. The promotion only pays off if it sells at least 50% more units, or clears stock that would otherwise need a deeper markdown later.",
    },
  ],
  seo: {
    title: "Retail Pricing Strategy for Fashion Brands",
    description: "Retail pricing explained for fashion: cost-plus, competitive, value-based, psychological and promotional pricing, and how to choose per category.",
  },
};
