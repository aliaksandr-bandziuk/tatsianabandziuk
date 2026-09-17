import type { Category } from "../../types";
import { categoryPlan } from "../registry";

export const categories: Category[] = [
  {
    ...categoryPlan("power-bi", "en"),
    label: "Power BI",
    h1: "Power BI for Retail Analytics: Articles and Guides",
    intro:
      "Power BI articles for retail and fashion teams: DAX measures, sell-through and stock cover reporting, row-level security and dashboard examples. Each guide starts from a real retail KPI and shows how to calculate and present it.",
    faqTitle: "Power BI for Retail Analytics FAQ",
    faq: [
      {
        question: "Is Power BI suitable for a small fashion brand?",
        answer:
          "Yes. A small brand can start with a few Pro licences and one data model for sales, stock and margin built from ERP or e-commerce exports. The main benefit is that the weekly report refreshes itself instead of being rebuilt by hand.",
      },
      {
        question: "Which Power BI licence does a retail team need?",
        answer:
          "Most retail teams need Power BI Pro for everyone who publishes or views shared reports. Premium Per User or a Fabric capacity makes sense with many viewers, large datasets or frequent refreshes. Check your Microsoft 365 plan first, because some plans already include Pro.",
      },
      {
        question: "Power BI or Excel for retail reporting?",
        answer:
          "Excel is best for planning models and one-off analysis, where people type in assumptions. Power BI is better for recurring reporting that many people read, such as the weekly trading report. Most retail teams use both, with agreed KPI definitions shared between them.",
      },
    ],
    seo: {
      title: "Power BI for Retail: DAX, Dashboards and Guides",
      description:
        "Power BI articles for retail teams: DAX measures, sell-through and stock cover reporting, row-level security and dashboard examples.",
    },
  },
  {
    ...categoryPlan("assortment", "en"),
    label: "Assortment",
    h1: "Assortment and Merchandise Planning Articles for Fashion Retail",
    intro:
      "Articles on assortment and merchandise planning in fashion retail: range plans, size curves, ABC analysis and buy planning. Each one explains the method step by step, with a worked example.",
    faqTitle: "Assortment and Merchandise Planning FAQ",
    faq: [
      {
        question: "What is the difference between range planning and assortment planning?",
        answer:
          "Range planning designs the collection: which products, options and price tiers a brand will offer in a season. Assortment planning then decides how that range is split across stores, markets and channels, and how deep to buy each size and colour. In many fashion companies the two terms overlap, so it helps to agree which decisions each plan covers.",
      },
      {
        question: "Where should a small brand start with assortment planning?",
        answer:
          "Start with last season’s sales and stock by category, option and size. Look at sell-through and margin per option, find the options that sold out early and those that ended in markdown, and plan the next range around that evidence. A simple Excel range plan is enough to begin.",
      },
      {
        question: "How often should a range plan be reviewed?",
        answer:
          "The range plan is built once per season, before buying, and then checked in-season every week or two against sell-through and stock. Size curves and category splits are worth recalculating at least once a season with fresh sales data.",
      },
    ],
    seo: {
      title: "Assortment and Merchandise Planning Articles",
      description:
        "Articles on assortment and merchandise planning in fashion retail: range plans, size curves, ABC analysis and buy planning with examples.",
    },
  },
  {
    ...categoryPlan("pricing", "en"),
    label: "Pricing",
    h1: "Retail Pricing, Margin and Markdown Articles",
    intro:
      "Retail pricing articles for fashion brands: price architecture, markup and margin, markdown strategy and pricing across markets. Each article gives the formulas and a worked example you can check in Excel.",
    faqTitle: "Retail Pricing, Markup and Markdown FAQ",
    faq: [
      {
        question: "What is the difference between markup and margin?",
        answer:
          "Markup is profit as a percentage of cost; margin is profit as a percentage of the selling price. A jacket bought for 20 and sold for 50 has a 150% markup and a 60% margin. Mixing up the two is one of the most common pricing mistakes in retail.",
      },
      {
        question: "When should markdowns start?",
        answer:
          "Markdowns should start when sell-through falls behind the planned curve and the remaining weeks are not enough to clear the stock at full price. Many fashion brands review this weekly from mid-season, starting with small markdowns on slow options rather than a blanket sale.",
      },
      {
        question: "How is a price architecture built?",
        answer:
          "Start with the price points customers already buy in each category, then define entry, core and top tiers with clear differences in product between them. Check each tier against sales mix, margin and competitor prices, and remove price points that are too close to each other.",
      },
    ],
    seo: {
      title: "Retail Pricing, Markup and Markdown Articles",
      description:
        "Retail pricing articles for fashion brands: price architecture, markup vs margin, markdown strategy and pricing across markets.",
    },
  },
  {
    ...categoryPlan("product-data", "en"),
    label: "Product data",
    h1: "Product Data, PIM and PLM Articles for Fashion Brands",
    intro:
      "Product data articles for fashion brands: PIM vs PLM, product attribute dictionaries, data quality checks and governance across markets. They explain how to keep product information consistent from design to e-commerce.",
    faqTitle: "Product Data, PIM and PLM FAQ",
    faq: [
      {
        question: "What is the difference between PIM and PLM?",
        answer:
          "PLM manages product data while a product is designed and developed: materials, suppliers, costs and sizes. PIM manages the product information used to sell it: descriptions, images and channel-specific attributes. A fashion brand often needs both, connected by the same attribute rules.",
      },
      {
        question: "Who should own product data in a fashion brand?",
        answer:
          "Each attribute should have a named owner, usually the team that creates it: product development for technical data, merchandising for commercial attributes, e-commerce for online content. A product data lead or team sets the standards and checks quality across all of them.",
      },
      {
        question: "How do you measure product data quality?",
        answer:
          "The simplest measures are completeness (the share of products with each required attribute filled) and validity (the share of values that match the dictionary). Track both by attribute, market and season in a dashboard, and review the gaps monthly with their owners.",
      },
    ],
    seo: {
      title: "Product Data, PIM and PLM Articles for Fashion Brands",
      description:
        "Product data articles for fashion brands: PIM vs PLM, product attribute dictionaries, data quality checks and governance across markets.",
    },
  },
  {
    ...categoryPlan("excel", "en"),
    label: "Excel",
    h1: "Excel for Retail Planning: Articles and Templates",
    intro:
      "Excel articles for retail planners: open-to-buy models, ABC analysis, buy plans and margin calculations, with free templates to download. The focus is on models a planning team can read, check and maintain.",
    faqTitle: "Excel for Retail Planning FAQ",
    faq: [
      {
        question: "Which Excel skills does a merchandise planner need?",
        answer:
          "Solid use of tables, SUMIFS and lookup functions, pivot tables and charts, plus basic Power Query for importing sales and stock. Dynamic arrays and a clear workbook structure make planning models far easier to maintain.",
      },
      {
        question: "Is Excel enough for open-to-buy planning?",
        answer:
          "For most small and mid-sized brands, yes. A well-structured Excel model with monthly phasing and built-in checks handles open-to-buy for several categories and markets. Dedicated planning software becomes worth it with many stores, frequent replanning or many users editing at once.",
      },
      {
        question: "When should a retail team move from Excel to Power BI?",
        answer:
          "When the same report is rebuilt by hand every week, when several people need the same numbers, or when the data no longer fits comfortably in a workbook. Planning inputs can stay in Excel while Power BI takes over the recurring reporting.",
      },
    ],
    seo: {
      title: "Excel for Retail Planning: Articles and Templates",
      description:
        "Excel articles for retail planners: open-to-buy models, ABC analysis, buy plans and margin calculations, plus free templates to download.",
    },
  },
  {
    ...categoryPlan("careers", "en"),
    label: "Careers",
    h1: "Careers in Fashion Business: Analyst, Merchandise Planner and Buyer Roles",
    intro:
      "Articles on analytics careers in fashion retail: what brand analysts, merchandise planners and buyers do, which skills and tools they need and how people typically start in these roles. They describe the professions as they work in practice, from the analytics side of a fashion business.",
    faqTitle: "Careers in Fashion Business FAQ",
    faq: [
      {
        question: "What does a merchandise planner do?",
        answer:
          "A merchandise planner sets the financial plan for a range: sales, margin, stock and open-to-buy by month and category. During the season they track performance against the plan and recommend re-orders, transfers or markdowns. They work closely with buyers, who choose the products.",
      },
      {
        question: "How do you become a fashion buyer?",
        answer:
          "Most fashion buyers start as buying or merchandising assistants or allocators and move up to assistant buyer and buyer. A degree in fashion business, economics or a related field helps, but strong numeracy, Excel skills and product sense matter just as much. Experience in a store or e-commerce team is also valued.",
      },
      {
        question: "Which skills does a retail analyst need?",
        answer:
          "A retail analyst needs strong Excel, a BI tool such as Power BI, and often some SQL. Equally important are knowing retail KPIs like sell-through, stock cover and margin, and being able to explain what the numbers mean for buying and pricing decisions.",
      },
    ],
    seo: {
      title: "Careers in Fashion Business: Analyst, Planner, Buyer",
      description:
        "Articles on analytics careers in fashion retail: what brand analysts, merchandise planners and buyers do, which skills they need and how to start.",
    },
  },
];
