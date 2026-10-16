import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("retail-star-schema", "en"),
  title: "Star Schema for Retail Sales and Stock in Power BI",
  h1: {
    before: "Star Schema for Retail",
    accent: "Sales and Stock in Power BI",
  },
  excerpt:
    "How to model retail sales and a weekly stock snapshot in Power BI: two fact tables, three shared dimensions, and why the facts are never joined.",
  lead: "A retail model has two fact tables, not one: sales at store, SKU and day, and a stock snapshot at store, SKU and week. They share three dimensions - the retail calendar, the product and the store - and they are never related to each other.",
  date: "2026-10-16",
  readingMinutes: 7,
  body: [
    {
      type: "p",
      text: "That last clause is the whole design. Almost every broken retail model is broken because somebody joined stock to sales to get them onto one page.",
    },
    {
      type: "h2",
      id: "facts-and-dimensions",
      text: "What Goes in a Fact Table and What Goes in a Dimension",
    },
    {
      type: "p",
      text: "Microsoft's own guidance puts it plainly: dimension tables describe the things you model, fact tables store observations or events, and the type is not a setting but a consequence of the relationships, because the one side is always a dimension table while the many side is always a fact table. Two rules from the same page are worth pinning above the model: avoid mixing the two types together in a single table, and load fact tables at a consistent grain.",
    },
    {
      type: "p",
      text: "The distinction that page draws between dimensionality and granularity is the one that matters in retail. Dimensionality is which key columns a fact carries. Granularity is what the values of those keys mean. One row per store, SKU and day is a different table from one row per store, SKU and week, even though both carry the same three keys.",
    },
    {
      type: "h2",
      id: "two-facts",
      text: "The Retail Model: Two Fact Tables at Different Grain",
    },
    {
      type: "figure",
      src: "/images/blog/retail-star-schema.svg",
      alt: "A star schema for retail: three dimension tables across the top - retail calendar, product and store - each connecting to two fact tables below, sales at store, SKU and day grain and a stock snapshot at store, SKU and week grain. A crossed-out dashed line between the two fact tables marks that they are never related to each other.",
      width: 960,
      height: 470,
      caption:
        "The facts meet through the dimensions, never through each other.",
    },
    {
      type: "p",
      text: "Sales is transactional: one row per store, SKU and day, carrying units, net sales value, cost and returns. It only has rows where something happened.",
    },
    {
      type: "p",
      text: "The stock snapshot is a photograph: one row per store, SKU and week, carrying units and cost value, written whether or not anything moved. It has rows for every combination that exists, which is why it is usually the larger table despite the coarser grain.",
    },
    {
      type: "p",
      text: "The three dimensions are shared, and that sharing is what makes the model work. Filter a category on the product table and both facts respond. Select four weeks on the calendar and both facts narrow to those weeks. No measure has to know about the other fact table.",
    },
    {
      type: "h2",
      id: "never-join-facts",
      text: "Why Sales and Stock Must Not Be Related to Each Other",
    },
    {
      type: "p",
      text: "The temptation is obvious: both tables have a store, a SKU and a date, so a relationship looks available. It is not, for three reasons.",
    },
    {
      type: "list",
      items: [
        "The keys are unique on neither side. A relationship needs a one side, and neither fact has one: a store-SKU-day appears many times in sales, a store-SKU-week many times in stock. Power BI either refuses the relationship or creates a many-to-many that fans the rows out and multiplies every total.",
        "The grains do not line up. Sales has rows on days, stock on week-ending dates. Joined on date, six days in seven match nothing and the stock disappears.",
        "It is not needed. Both facts already share the dimensions, which is the entire purpose of a star schema.",
      ],
    },
    {
      type: "p",
      text: "A measure that needs both facts - cover, sell-through, GMROI - reads one measure from each in the same filter context and divides. Nothing has to be joined for that to work.",
    },
    {
      type: "code",
      caption:
        "Two measures from two fact tables. They agree because the filter context is shared.",
      code: "Weeks of Cover =\nDIVIDE ( [Closing Stock Units], [Rate of Sale 4W] )",
    },
    {
      type: "h2",
      id: "grain-difference",
      text: "Handling the Grain Difference Between Daily Sales and a Weekly Snapshot",
    },
    {
      type: "p",
      text: "The snapshot relates to the calendar on its snapshot date, like any other fact. The grain difference is handled in the measure rather than in the relationship, because stock does not sum over time: a month column that adds four weekly snapshots reports four times the stock the business holds.",
    },
    {
      type: "code",
      caption:
        "Closing stock: the last snapshot in the period, not the sum of the snapshots.",
      code: "Closing Stock Units =\nVAR MaxStockDate =\n    CALCULATE (\n        MAX ( Stock[Date] ),\n        ALLEXCEPT ( Stock, 'Retail Calendar' )\n    )\nVAR Result =\n    CALCULATE (\n        SUM ( Stock[Units] ),\n        'Retail Calendar'[Date] = MaxStockDate\n    )\nRETURN\n    Result",
    },
    {
      type: "p",
      text: "Where a fact's grain is genuinely coarser than the dimension it joins to - stock held at category level rather than SKU, say - the choice is between relating at the coarser level and accepting that finer slices show blank, or leaving the table unrelated and simulating the join in DAX. Marco Russo's advice on that fork is to take the simpler path unless performance forces the other, because a physical relationship needs ETL work and dummy rows while the DAX version is more flexible and more verbose.",
    },
    {
      type: "h2",
      id: "role-playing-dates",
      text: "Role-Playing Dates: Order, Delivery and Intake",
    },
    {
      type: "p",
      text: "Retail facts carry more than one date. An intake line has an order date, a planned delivery date and an actual receipt date, and all three want the same calendar.",
    },
    {
      type: "p",
      text: "Only one relationship between two tables can be active at a time. There are two ways round it: duplicate the date table per role, which Microsoft calls the accepted approach and notes is rarely a concern for size because dimensions are small, or keep one calendar with inactive relationships and activate the one you need inside the measure with USERELATIONSHIP.",
    },
    {
      type: "p",
      text: "Duplicate tables are easier for report users, who see Delivery Date in the field list and pick it. Inactive relationships keep the model smaller and the logic in the measures. For a trading report that mostly reads one date, inactive relationships are enough; for a supply-chain model where every page slices by a different date, duplicate the table.",
    },
    {
      type: "h2",
      id: "calendar",
      text: "Where the Retail Calendar Fits in the Model",
    },
    {
      type: "p",
      text: "The date dimension in a retail model is the 4-5-4 retail calendar rather than a Gregorian date table: it carries the week index, the period, the quarter and the mapping to last year's week. Every year-on-year measure in the model is an offset on those columns rather than a call to a time intelligence function.",
    },
    {
      type: "p",
      text: "This is also the one dimension both facts must share without exception. If sales join a daily calendar and stock joins a separate week table, nothing lines up, and every combined measure needs a translation step that will eventually disagree with itself.",
    },
    {
      type: "h2",
      id: "mistakes",
      text: "Mistakes in Retail Data Models",
    },
    {
      type: "list",
      items: [
        "One flat table. Sales, product attributes and stock in a single sheet imported from Excel works at ten thousand rows and collapses at ten million, and every attribute change rewrites history.",
        "Joining the two fact tables. The rows fan out and every total is wrong in a way that looks plausible.",
        "Summing the stock snapshot over time. The most common wrong number in retail reporting.",
        "Attributes on the fact table. Category and season live on the product dimension; a category column on the sales fact means last season's sales re-categorise themselves the day somebody moves the SKU.",
        "A Gregorian date table in a business that trades on a retail calendar. Everything works until the first year-on-year comparison.",
        "No store close date. Without it a closed store silently stays in every comparison and like-for-like cannot be built at all.",
      ],
    },
  ],
  faqTitle: "Retail Data Model FAQ",
  faq: [
    {
      question: "Can a Power BI model have two fact tables?",
      answer:
        "Yes, and a retail model needs at least two: sales and a stock snapshot. They are not related to each other. Each relates to the same dimension tables - the retail calendar, the product and the store - and that shared filtering is what lets one measure read sales and another read stock in the same context.",
    },
    {
      question: "How do you combine sales and stock in one Power BI report?",
      answer:
        "Through shared dimensions and separate measures, not through a relationship. Write a measure over the sales fact and a measure over the stock fact, then combine them with DIVIDE. Both respond to the same slicers because both facts are filtered by the same dimension tables, so cover, sell-through and GMROI all work without the facts ever touching.",
    },
    {
      question: "Why can't I relate the sales table to the stock table?",
      answer:
        "Because neither side is unique: a store, SKU and date appears many times in each table. Power BI either refuses the relationship or builds a many-to-many that duplicates rows and inflates every total. The grains also differ, with sales on days and stock on week-ending dates, so most rows would match nothing.",
    },
    {
      question: "Should a stock snapshot be daily or weekly?",
      answer:
        "Weekly is enough for trading decisions and costs a fraction of the storage; daily is worth it when replenishment runs daily or when intraday stock accuracy drives availability reporting. Whichever you choose, keep the grain consistent - a table that is daily for some stores and weekly for others cannot be measured correctly.",
    },
    {
      question: "Do I need a separate date table for each date in the model?",
      answer:
        "Only one relationship between two tables can be active, so a fact with order, delivery and receipt dates needs either a duplicate date table per role or inactive relationships activated in measures with USERELATIONSHIP. Duplicate tables are easier for report users; inactive relationships keep the model smaller.",
    },
  ],
  seo: {
    title: "Star Schema for Retail Sales and Stock in Power BI",
    description:
      "Two fact tables, three shared dimensions, and why sales and a stock snapshot are never joined to each other in a Power BI retail model.",
  },
};
