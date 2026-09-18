import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("size-curve", "en"),
  title: "How to Build a Retail Size Curve from Last Season’s Sales Data",
  h1: { before: "How to Build a Retail Size Curve from", accent: "Last Season’s Sales Data" },
  excerpt: "How to clean sales data of stock-outs, returns and promotions before calculating size ratios per category, market and store cluster.",
  lead: "A retail size curve is the share of units a category should be bought in each size, for example 10% XS, 25% S, 35% M, 20% L and 10% XL. To build a reliable one from last season’s sales, you first remove weeks with stock-outs, adjust for returns and exclude promotional peaks, then calculate size ratios per category and market.",
  date: "2026-05-15",
  readingMinutes: 6,
  body: [
    { type: "h2", id: "what-size-curve-means", text: "What a Size Curve Means in Retail Buying" },
    {
      type: "p",
      text: "In retail buying, a size curve is the planned split of units across the sizes of a product or category, expressed as percentages that add up to 100%. Some teams call it a size ratio, size break or size profile. The buyer decides the total quantity of an option; the size curve turns that total into an order per size.",
    },
    {
      type: "p",
      text: "If a dress is bought in 600 units and the curve is 10% XS, 25% S, 35% M, 20% L and 10% XL, the order is 60, 150, 210, 120 and 60. A good curve means the popular sizes do not sell out in week four while XS and XL wait for the sale. A bad one does both at once, and it costs twice: lost full-price sales in the middle sizes and markdown on the edges.",
    },
    {
      type: "p",
      text: "Curves differ by category because fit differs. Tops, trousers with waist sizes, shoes and bras each need their own. They also differ by market and by channel, which I come back to below.",
    },
    { type: "h2", id: "raw-sales-wrong-curve", text: "Why Raw Sales Data Gives a Wrong Size Curve" },
    {
      type: "p",
      text: "The obvious method is to take last season’s unit sales by size and divide each size by the total. The problem is that sales show what customers bought from the stock that was there, not what they wanted. Three things distort the picture.",
    },
    {
      type: "list",
      items: [
        "Stock-outs. When M sells out, its sales stop while XS and XL keep selling, so the middle sizes look weaker than they are.",
        "Returns. Online customers often order two sizes and send one back, and the return rate differs by size. Gross sales overstate the sizes that come back most.",
        "Promotions and markdown. The sizes left at the end of the season are the ones nobody wanted at full price. When they sell at 50% off, the data suggests demand for them.",
      ],
    },
    {
      type: "p",
      text: "A curve built on this data buys even less of the sizes that ran out, they run out earlier next season, and the error grows each time. The table compares a raw curve with a cleaned one for the same category.",
    },
    {
      type: "table",
      caption: "Illustrative data · women’s knitwear, one season; the cleaned curve uses net sales in weeks with full size availability",
      columns: [
        { label: "Size", kind: "text" },
        { label: "Raw sales, units", kind: "number", format: "bars" },
        { label: "Raw share", kind: "number", suffix: "%" },
        { label: "Cleaned share", kind: "number", format: "scale", suffix: "%" },
        { label: "Difference, pts", kind: "number" },
      ],
      trendColumn: 4,
      rows: [
        { cells: ["XS", 138, 12, 10, -2], trend: "down" },
        { cells: ["S", 345, 30, 25, -5], trend: "down" },
        { cells: ["M", 380, 33, 35, 2], trend: "up" },
        { cells: ["L", 184, 16, 20, 4], trend: "up" },
        { cells: ["XL", 103, 9, 10, 1], trend: "up" },
      ],
    },
    {
      type: "p",
      text: "In this example M and L sold out in many stores by mid-season, and S sold well in the clearance weeks. The raw curve would have cut L from 20% to 16% for next season, exactly the size that was already short.",
    },
    { type: "h2", id: "clean-sales-data", text: "Three Steps to Clean Sales Data Before Size Curve Analysis" },
    {
      type: "p",
      text: "You do not need a forecasting tool to fix most of this. You need sales and stock by size, store and week, which most retailers already have.",
    },
    {
      type: "list",
      items: [
        "Remove stock-out weeks. Keep only store-weeks in which every core size of the option was in stock, or at least the size in question had stock at the start of the week. If that leaves too little data, use rate of sale per size per in-stock week instead of total sales.",
        "Use net sales. Subtract returns by size, and if you can, count a size exchange as a sale of the size the customer kept, not of the one they bought first.",
        "Exclude promotional peaks and markdown weeks. Use full-price weeks only, or at least exclude the final clearance, when the size mix on sale is whatever is left.",
      ],
    },
    {
      type: "p",
      text: "Rate of sale is the most robust of these. If M sold 12 units a week while available and XS sold 4, the demand ratio is 3 to 1 no matter how many weeks each size was on the shelf.",
    },
    { type: "h2", id: "size-ratios-excel", text: "How to Calculate Size Ratios per Category in Excel" },
    {
      type: "p",
      text: "The size curve formula itself is simple: the share of each size is its cleaned sales divided by the cleaned sales of all sizes in the category. The work is in the filters. With a flat table of store-week rows and an in-stock flag, SUMIFS does it.",
    },
    { type: "formula", text: "size share % = cleaned sales of size ÷ cleaned sales of all sizes × 100" },
    {
      type: "code",
      code: "' Table Sales: Category, Size, Week, NetUnits, InStock (1 = all core sizes in stock), FullPrice (1 = no promotion)\n' H2 = category, I2 = size\n=SUMIFS(Sales[NetUnits], Sales[Category], $H2, Sales[Size], I2, Sales[InStock], 1, Sales[FullPrice], 1)\n  / SUMIFS(Sales[NetUnits], Sales[Category], $H2, Sales[InStock], 1, Sales[FullPrice], 1)\n\n' Rate of sale per in-stock week for one size\n=SUMIFS(Sales[NetUnits], Sales[Size], I2, Sales[InStock], 1)\n  / COUNTIFS(Sales[Size], I2, Sales[InStock], 1)",
      caption: "Example table and column names; format the share as a percentage. When you use rate of sale, divide each size’s rate by the sum of the rates.",
    },
    {
      type: "p",
      text: "Then round the curve to what suppliers can deliver. Many orders come in packs with a fixed ratio, such as 1-2-3-2-1, which is 11%, 22%, 33%, 22% and 11%. Pick the pack ratio closest to your curve and put the difference into loose units where the supplier allows it, rather than bending the curve to the pack.",
    },
    { type: "h2", id: "size-curves-markets", text: "Size Curves per Market and Store Cluster" },
    {
      type: "p",
      text: "One curve for the whole business hides real differences. Customers in different countries have different size profiles, online sells more of the extreme sizes because stores often do not carry them, and a small store cannot hold the same size run as a flagship. I calculate curves at three levels: category, category by market, and category by store cluster or channel.",
    },
    {
      type: "p",
      text: "The limit is data. A curve split too finely is built on a handful of sales and swings randomly from season to season. My rule of thumb: if a market or cluster has fewer than a few hundred cleaned units in the category, use the parent curve, the category total or the market total, and adjust it only where the difference is clear and repeats over two seasons.",
    },
    {
      type: "p",
      text: "Recalculate once a season before the buy, using the latest comparable season. Do it sooner when the customer base changes: a new market, a new fit block, or a big shift of sales to online.",
    },
    { type: "h2", id: "size-integrity", text: "Size Integrity Monitoring After the Buy" },
    {
      type: "p",
      text: "A curve is a forecast, so it needs a check. In season I track size integrity: the share of options in a store that still have all their core sizes in stock. When an option loses a core size, it is broken, and it sells much more slowly even if other sizes remain.",
    },
    { type: "formula", text: "size integrity % = options with all core sizes in stock ÷ options in stock × 100" },
    {
      type: "list",
      items: [
        "Watch which sizes break first. If it is the same size in the same category every week, the curve is short on it, and next season’s buy should say so.",
        "Use transfers before markdowns. Moving the missing size from a store where it is not selling often recovers more margin than a discount.",
        "Consolidate broken options into fewer stores so each keeps a full size run.",
        "Keep a log of broken-size weeks. It is exactly the data you need for step one of the cleaning next season.",
      ],
    },
    {
      type: "p",
      text: "Size integrity and sell-through belong in the same report. A style with high sell-through and low integrity probably sold out in the wrong sizes, which the sell-through figure alone never shows.",
    },
  ],
  faqTitle: "Size Curve Analysis: Common Questions",
  faq: [
    {
      question: "What is a size curve in retail buying?",
      answer:
        "A size curve is the planned distribution of units across sizes for a product or category, expressed as percentages that add up to 100%. Buyers apply it to the total quantity of an option to decide how many units of each size to order. A good curve reduces both broken size runs and leftover stock in the extremes.",
    },
    {
      question: "How do you calculate a size curve from sales?",
      answer:
        "Take net unit sales by size for a category over comparable weeks, after removing periods when sizes were out of stock. Divide the sales of each size by the category total to get its share. Calculate curves separately for categories with different fits, such as tops and trousers, and round the result to the pack or ratio sizes your suppliers use.",
    },
    {
      question: "How do stock-outs distort a size curve?",
      answer:
        "When a size sells out, its sales stop while other sizes keep selling, so the data understates demand for the popular sizes and overstates it for the rest. A curve built on that data buys even less of the sizes that ran out, and the problem repeats next season. Using only weeks when all sizes were available, or estimating lost sales, corrects it.",
    },
    {
      question: "How often should size curves be recalculated?",
      answer:
        "Once a season is a sensible minimum, before the buy, using the latest comparable season. Recalculate sooner when the customer base changes, for example after entering a new market, changing the fit block or moving more sales online. Between recalculations, monitor size availability in-season to spot curves that are drifting.",
    },
  ],
  seo: {
    title: "Size Curve Analysis in Retail: Size Ratios from Sales Data",
    description: "How to build a retail size curve from sales data: remove stock-outs, returns and promo weeks, then calculate size ratios per category and market.",
  },
};
