import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("abc-xyz", "en"),
  title: "ABC and XYZ Analysis for Retail Assortment in Excel",
  h1: { before: "ABC and XYZ Analysis for", accent: "Retail Assortment in Excel" },
  excerpt: "How to run ABC analysis by sales contribution and XYZ analysis by demand stability in Excel, and use the matrix for assortment decisions.",
  lead: "ABC analysis ranks products by their share of sales or margin, so that A items bring roughly the first 80%, B the next 15% and C the last 5%; XYZ analysis groups the same products by how stable their weekly demand is. Combined in Excel, the two give a nine-cell matrix that shows which products to protect, which to replenish automatically and which to review.",
  date: "2026-06-19",
  readingMinutes: 5,
  body: [
    {
      type: "p",
      text: "ABC analysis comes from inventory management, and most guides explain it with warehouse parts. It works just as well for a retail assortment, with one condition: you have to know which products it suits. Below I show how I run ABC and XYZ analysis in Excel, how I read the combined matrix and where the method misleads fashion teams.",
    },
    { type: "h2", id: "what-abc-analysis-shows", text: "What ABC Analysis Shows in Retail" },
    {
      type: "p",
      text: "ABC analysis is a ranking of products by their contribution to a total, usually sales value, gross margin or units. You sort products from the highest contributor to the lowest, calculate the cumulative share and cut the list into three classes: A items bring about the first 80% of the total, B items the next 15% and C items the last 5%.",
    },
    {
      type: "p",
      text: "The 80/20 rule behind it is the Pareto principle: in most ranges a small share of products brings most of the result. In a real range with hundreds of options, the A class is often a fifth of the products or fewer. The exact split varies, and that is the point of the exercise: it shows where attention and stock investment matter most in your business, not in a textbook.",
    },
    {
      type: "p",
      text: "When should you use ABC analysis? I use it to decide where to spend planning time, which products must never be out of stock, which to count and check first, and which to question at the next range review. It is sometimes confused with EOQ, the economic order quantity. They answer different questions: ABC decides how much attention an item deserves, EOQ calculates how much to order each time for an item that is replenished.",
    },
    {
      type: "p",
      text: "Choose the measure deliberately. Sales value is the default, gross margin is better when margins differ a lot between categories, and units suit warehouse and replenishment questions. I often run two versions and look at the products that are A on sales but C on margin.",
    },
    { type: "h2", id: "abc-analysis-excel", text: "How to Do ABC Analysis in Excel" },
    {
      type: "p",
      text: "You need one row per product with its sales value for a meaningful period, such as the last 52 weeks for continuity lines. Then four steps:",
    },
    {
      type: "list",
      items: [
        "Sort the table by sales value, largest first.",
        "Add a column with each product’s share of the total.",
        "Add a running total of that share.",
        "Classify each product by its cumulative share: up to 80% is A, up to 95% is B, the rest is C.",
      ],
    },
    {
      type: "code",
      code: "' Columns: A = product, B = sales value (sorted largest first)\n' C: share of total\n=B2/SUM($B$2:$B$101)\n\n' D: cumulative share\n=SUM($C$2:C2)\n\n' E: ABC class\n=IF(D2<=80%,\"A\",IF(D2<=95%,\"B\",\"C\"))\n\n' Excel 365: a sorted copy that updates when new weeks are added\n=SORTBY(A2:B101, B2:B101, -1)",
      caption: "ABC analysis formulas in Excel. Adjust the ranges to your data; format C and D as percentages.",
    },
    {
      type: "p",
      text: "Here is a small worked example with ten continuity products and illustrative sales. A range this short is less skewed than a real one, but the mechanics are identical.",
    },
    {
      type: "table",
      caption: "ABC analysis example · illustrative annual sales of ten continuity products",
      columns: [
        { label: "Product", kind: "text" },
        { label: "Sales", kind: "number" },
        { label: "Share", kind: "number", suffix: "%" },
        { label: "Cumulative", kind: "number", format: "bars", suffix: "%" },
        { label: "Class", kind: "text" },
      ],
      rows: [
        { cells: ["Slim jeans", 24000, 24, 24, "A"] },
        { cells: ["Crew T-shirt", 18000, 18, 42, "A"] },
        { cells: ["Knit jumper", 14000, 14, 56, "A"] },
        { cells: ["Chino trousers", 11000, 11, 67, "A"] },
        { cells: ["Oxford shirt", 9000, 9, 76, "A"] },
        { cells: ["Hoodie", 7000, 7, 83, "B"] },
        { cells: ["Denim jacket", 6000, 6, 89, "B"] },
        { cells: ["Linen shirt", 5000, 5, 94, "B"] },
        { cells: ["Leather belt", 3500, 3.5, 97.5, "C"] },
        { cells: ["Socks 3-pack", 2500, 2.5, 100, "C"] },
      ],
    },
    {
      type: "p",
      text: "One detail to agree in advance: the product that crosses the 80% line. With the formula above, the hoodie at 83% becomes B. Some teams use the cumulative share of the previous row instead, which pulls that product into A. Either is fine, as long as the rule stays the same from season to season.",
    },
    { type: "h2", id: "xyz-analysis", text: "XYZ Analysis for Demand Stability" },
    {
      type: "p",
      text: "ABC analysis tells you how much a product contributes; XYZ analysis tells you how predictable its demand is. It uses the coefficient of variation (CV) of weekly or monthly sales: the standard deviation divided by the average. A low CV means steady demand, a high CV means sales jump around from week to week.",
    },
    { type: "formula", text: "coefficient of variation = standard deviation of weekly sales ÷ average weekly sales" },
    {
      type: "code",
      code: "' Weekly units in columns C:N (12 weeks)\n=STDEV.P(C2:N2)/AVERAGE(C2:N2)\n\n' XYZ class with thresholds in cells Q1 (X limit) and Q2 (Y limit)\n=IF(O2<=$Q$1,\"X\",IF(O2<=$Q$2,\"Y\",\"Z\"))",
      caption: "XYZ analysis in Excel. Keeping the thresholds in cells makes them easy to tune.",
    },
    {
      type: "p",
      text: "Take two products over six weeks. A crew T-shirt sells 120, 110, 130, 125, 115 and 120 units: the average is 120, the standard deviation about 6.5, so the CV is roughly 5%, clearly X. A knit jumper sells 40, 90, 20, 150, 60 and 100: the average is about 77 and the CV about 56%, clearly Z.",
    },
    {
      type: "p",
      text: "Thresholds differ by business. As a rule of thumb for weekly fashion sales, I start with X up to 25%, Y from 25% to 50% and Z above 50%, then adjust so that the classes make sense to the planners. Monthly data is smoother, so its thresholds can be lower.",
    },
    { type: "h2", id: "abc-xyz-matrix", text: "ABC-XYZ Matrix for Assortment Decisions" },
    {
      type: "p",
      text: "Put the two classes together and every product lands in one of nine cells. Each cell suggests a different way to plan and buy it.",
    },
    {
      type: "table",
      caption: "ABC-XYZ matrix with the default action I start from in each cell",
      columns: [
        { label: "Class", kind: "text" },
        { label: "X · stable demand", kind: "text" },
        { label: "Y · variable demand", kind: "text" },
        { label: "Z · irregular demand", kind: "text" },
      ],
      rows: [
        { cells: ["A · high contribution", "Automatic replenishment, never out of stock", "Replenish with safety stock, review weekly", "Plan manually, buy in smaller drops"] },
        { cells: ["B · medium contribution", "Automatic replenishment, lower safety stock", "Review every few weeks", "Buy cautiously, review each season"] },
        { cells: ["C · low contribution", "Replenish with minimum stock", "Question the number of options", "Candidates to delist unless they have a clear role"] },
      ],
    },
    {
      type: "p",
      text: "AX products are the backbone of the range: they deserve the tightest availability targets and the least manual effort, because their demand is easy to forecast. AZ products are the opposite: they matter a lot but are hard to predict, so they need a planner’s judgement, and they are where stock-outs and overstocks both cost the most. CZ products take effort and bring little, which makes them the first place to look when a range needs to be simplified.",
    },
    { type: "h2", id: "abc-analysis-mistakes", text: "ABC Analysis Mistakes in Fashion" },
    {
      type: "p",
      text: "Does ABC-XYZ analysis work for fashion? It works well for continuity lines, basics and replenished items with several seasons of history. For seasonal fashion it needs care, and these are the mistakes I see most often:",
    },
    {
      type: "list",
      items: [
        "Running it on individual seasonal styles that live only a few weeks. Use categories, price tiers or attribute groups instead, such as “midi dresses at the middle price tier”.",
        "Leaving in weeks with stock-outs. Zero sales because there was no stock push a product down the ABC ranking and make its demand look irregular.",
        "Leaving in markdown and promotion weeks, which create spikes that say more about the discount than about demand.",
        "Classifying at size level. Sizes split the volume, so every product looks smaller and more erratic than it is; classify the option, then use a size curve.",
        "Mixing markets with different seasons or price levels in one ranking.",
        "Treating C as “delete”. An entry-price item, a new launch or a product that completes an outfit can be C and still earn its place.",
        "Running the analysis once. Refresh it every season, or monthly for replenished lines, and watch which products change class.",
      ],
    },
    {
      type: "p",
      text: "Used this way, ABC-XYZ analysis is a quick first cut of an assortment, not a verdict. I pair it with sell-through and weeks of cover, described in my article on retail KPIs, before recommending that anything is added to or removed from a range.",
    },
  ],
  faqTitle: "ABC and XYZ Analysis: Common Questions",
  faq: [
    {
      question: "What is ABC analysis in retail?",
      answer:
        "ABC analysis is a Pareto-based ranking of products by their contribution to sales, margin or units. Products are sorted from highest to lowest, a cumulative share is calculated, and the list is cut into class A (about 80% of the total), B (the next 15%) and C (the remaining 5%). It shows where attention and stock investment matter most.",
    },
    {
      question: "How do I do ABC analysis in Excel?",
      answer:
        "Put one row per product with its sales value, sort the table in descending order and add a column with each product’s share of the total. Add a running total of that share, then classify with a formula such as =IF(D2<=80%,\"A\",IF(D2<=95%,\"B\",\"C\")). A pivot table or SORTBY with SUM keeps the ranking up to date when new weeks are added.",
    },
    {
      question: "What is the difference between ABC and XYZ analysis?",
      answer:
        "ABC analysis measures how much a product contributes; XYZ analysis measures how predictable its demand is. XYZ uses the coefficient of variation of weekly or monthly sales: typically X below 10–25%, Y up to about 50%, and Z above that, with thresholds set per business. Together they separate stable best-sellers from volatile ones that need a different buying approach.",
    },
    {
      question: "Does ABC-XYZ analysis work for fashion?",
      answer:
        "It works well for continuity lines, basics and replenished items with several seasons of history. For seasonal fashion, most products live for only a few weeks, so the analysis is better run on categories, price tiers or attribute groups than on individual styles. Stock-outs and markdown weeks should be removed first, or they distort both classes.",
    },
  ],
  seo: {
    title: "ABC and XYZ Analysis for Retail Assortment in Excel",
    description: "How to do ABC analysis and XYZ analysis for a retail assortment in Excel, read the ABC-XYZ matrix and avoid the usual mistakes in fashion.",
  },
};
