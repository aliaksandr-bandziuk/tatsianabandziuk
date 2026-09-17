import type { ConsultingFormat, Recommendation, Service, Tool } from "../../types";

const rec = (topic: string): Recommendation => ({
  quote: `“Placeholder recommendation text. Two or three sentences from a colleague on ${topic}, quoted with permission once the real recommendation is in place.”`,
  name: "Name Surname",
  role: `Role · ${topic}`,
  placeholder: true,
});

const facts = (duration: string, deliverables: string) => [
  { label: "Duration", value: duration },
  { label: "Format", value: "remote / on-site" },
  { label: "Languages", value: "EN / PL / RU" },
  { label: "Deliverables", value: deliverables },
];

export const services: Service[] = [
  {
    key: "assortment-planning",
    slug: "assortment-planning",
    number: "01",
    cardTitle: "Assortment Planning and Merchandise Planning",
    cardText:
      "Range architecture, size and colour curves, open-to-buy and in-season monitoring, so the buy follows real demand rather than last season’s habit.",
    chart: "sizeCurve",
    chartCaption: "size curve · XS–3XL",
    breadcrumb: "Assortment planning",
    h1: { before: "Assortment Planning and Merchandise Planning Consulting for", accent: "Fashion Retail" },
    intro:
      "Assortment planning consulting helps fashion brands and distributors decide how many options to carry per category, how deep to buy each size and colour, and which market gets which part of the range. You get a merchandise plan and an open-to-buy model built on your own sales data, which your planners keep running after the handover.",
    factsTitle: "Typical engagement",
    facts: facts("6–10 weeks", "range plan + OTB model"),
    factsNote: "Always starts with your own sales data.",
    problemsTitle: "Assortment Planning Problems This Consulting Service Solves",
    problems: [
      {
        title: "Too Many Options and Too Little Depth in the Assortment",
        text: "The range looks rich on paper and sells thin in store: sizes are broken by week four and no bestseller has stock behind it.",
      },
      {
        title: "Size and Colour Curves Copied from Last Season",
        text: "Curves are inherited rather than calculated, so last season’s stock-outs and returns quietly distort every following buy.",
      },
      {
        title: "One Assortment Pushed into Very Different Markets",
        text: "The same range ships to markets with different climates, price expectations and store sizes, and markdown absorbs the difference.",
      },
      {
        title: "No Agreed Sell-Through Figure Between Buying and Finance",
        text: "Every range review starts by reconciling two versions of sell-through instead of deciding what to buy.",
      },
    ],
    includesTitle: "What the Assortment Planning Consulting Work Includes",
    includesLead:
      "Five workstreams in a fixed order. Each ends with a document or model that stays with your team.",
    includes: [
      {
        label: "01",
        title: "Range Architecture Review by Category and Price Tier",
        text: "Option counts by category, price tier and market, compared with sell-through and margin history.",
      },
      {
        label: "02",
        title: "Size and Colour Curve Calculation from Cleaned Sales Data",
        text: "Curves rebuilt from sales history with returns, stock-out weeks and promotions removed.",
      },
      {
        label: "03",
        title: "Merchandise Plan and Open-to-Buy Model in Excel",
        text: "One model your planners maintain: units, cost, margin and phasing by month and market.",
      },
      {
        label: "04",
        title: "In-Season Assortment Monitoring in Power BI",
        text: "A weekly view of sell-through, stock cover and size integrity, built on agreed definitions.",
      },
      {
        label: "05",
        title: "Handover Workshops for Buying and Merchandise Planning Teams",
        text: "Two working sessions and written documentation, so the next season runs without me.",
      },
    ],
    resultsTitle: "Assortment Planning Results for Fashion Brands",
    results: [
      { value: "+18", unit: "pp", label: "sell-through on core categories in the first full season" },
      { value: "−21", unit: "%", label: "option count, with depth moved into proven sizes and colours" },
      { value: "−31", unit: "%", label: "markdown spend across two consecutive seasons" },
    ],
    toolsTitle: "Tools Used in Assortment Planning Projects",
    tools: [
      { label: "fx", title: "Excel Merchandise Plan and Open-to-Buy Model", text: "Open-to-buy, monthly phasing and scenario comparison in one workbook." },
      { label: "BI", title: "Power BI for In-Season Assortment Monitoring", text: "DAX measures for sell-through, stock cover and size integrity." },
      { label: "PLM", title: "PLM Product Data Behind the Range Plan", text: "Clean category, season and colour attributes behind every option count." },
    ],
    caseStudyKey: "womenswear-range-plan-rebuild",
    recommendationTitle: "Recommendation from a Fashion Retail Colleague on Assortment Planning Work",
    recommendation: rec("the assortment planning project"),
    faqTitle: "Assortment Planning Consulting FAQ",
    faq: [
      {
        question: "What is assortment planning in fashion retail?",
        answer:
          "Assortment planning in fashion retail is deciding which products a brand will sell in a season: how many options per category and price tier, how deep to buy each size and colour, and which stores or markets receive them. It balances range width against depth so that customers find choice and bestsellers stay in stock. The output is a range plan that the buy and the open-to-buy budget are built on.",
      },
      {
        question: "What is the difference between assortment planning and merchandise planning?",
        answer:
          "Assortment planning decides what to sell: the options, sizes, colours and their split by market. Merchandise planning decides how much money to spend and when: sales, margin, stock and open-to-buy by month and category. The two plans have to agree, so I build them together.",
      },
      {
        question: "Which sales history is needed for an assortment plan?",
        answer:
          "Ideally two seasons of sales, stock and returns at SKU and week level, plus product attributes such as category, colour, size and price. One season is workable, but the size and colour curves then carry more uncertainty. Standard ERP or PLM exports are enough.",
      },
      {
        question: "Can one assortment plan work for several markets?",
        answer:
          "Yes. The model keeps one range architecture and lets depth, size split and phasing differ by market. That way each market plan stays comparable with the others while still reflecting local demand.",
      },
      {
        question: "Do we need assortment planning software before hiring a consultant?",
        answer:
          "No. Most brand teams need a clear process and a reliable Excel and Power BI model first. If you later choose planning software, the model becomes its specification and the team already knows what it needs from the system.",
      },
      {
        question: "Who maintains the merchandise plan after the project?",
        answer:
          "Your planning team. The plan is built in the tools they already use, documented step by step and handed over in two workshops. Ongoing support is available if you want a monthly review.",
      },
    ],
    ctaTitle: "Discuss an Assortment Planning Project with Tatsiana Bandziuk",
    ctaText:
      "Send me the category you are least sure about. I will reply with what the sales data would need to show for that part of the range to be right.",
    seo: {
      title: "Assortment Planning Consulting for Fashion Retail",
      description:
        "Assortment and merchandise planning for fashion brands: range architecture, size and colour curves, open-to-buy and in-season monitoring. Warsaw.",
    },
  },
  {
    key: "retail-pricing-analysis",
    slug: "retail-pricing-analysis",
    number: "02",
    cardTitle: "Retail Pricing Analysis and Price Architecture",
    cardText:
      "Price architecture by category, good-better-best tiers, cross-market price alignment and markdown scenarios tested before the season.",
    chart: "priceLadder",
    chartCaption: "price ladder · entry → top tier",
    breadcrumb: "Retail pricing analysis",
    h1: { before: "Retail Pricing Analysis and Price Architecture", accent: "Across Markets" },
    intro:
      "Retail pricing analysis shows a fashion brand whether its price points make sense to customers and to finance: where the price architecture has gaps or overlaps, where prices drift between markets, and what a markdown will cost before it starts. You get agreed pricing rules, a margin and markdown scenario model and a weekly monitoring view.",
    factsTitle: "Typical engagement",
    facts: facts("4–8 weeks", "pricing rules + margin model"),
    factsNote: "Prices are checked against sell-through, not only against competitors.",
    problemsTitle: "Retail Pricing Problems This Analysis Solves",
    problems: [
      {
        title: "Gaps and Overlaps in the Retail Price Architecture",
        text: "Two price points too close together cannibalise each other, while an empty tier sends customers to another brand.",
      },
      {
        title: "The Same Product Priced Differently Across Markets",
        text: "Currency conversion and local decisions drift apart until a customer notices the difference before you do.",
      },
      {
        title: "Markdown Depth and Timing Decided by Habit",
        text: "Discounts repeat last season’s calendar instead of following stock levels and sell-through.",
      },
      {
        title: "Margin Impact of Price Changes Seen Only After the Season",
        text: "Price changes are agreed in meetings, and their effect on margin shows up in the report two months later.",
      },
    ],
    includesTitle: "What the Retail Pricing Analysis Includes",
    includesLead: "Four steps, each ending with a file your pricing owner keeps.",
    includes: [
      { label: "01", title: "Price Architecture Audit per Category", text: "Entry, core and top price points mapped against sales mix and margin." },
      { label: "02", title: "Cross-Market Price Alignment Rules", text: "Conversion logic, rounding and allowed deviations by market, agreed once." },
      { label: "03", title: "Margin and Markdown Scenario Model in Excel", text: "Price and discount options compared on margin and stock before they are approved." },
      { label: "04", title: "Weekly Price and Margin Monitoring in Power BI", text: "Price, margin and markdown depth by category and market, refreshed every week." },
    ],
    resultsTitle: "Retail Pricing Analysis Results",
    results: [
      { value: "+2.4", unit: "pp", label: "gross margin after the price architecture clean-up" },
      { value: "3", label: "markets priced from one set of rules" },
      { value: "−18", unit: "%", label: "markdown depth on core lines" },
    ],
    toolsTitle: "Tools Used in Retail Pricing Projects",
    tools: [
      { label: "fx", title: "Excel Model for Price and Markdown Scenarios", text: "Price ladders, currency conversion and margin what-ifs." },
      { label: "BI", title: "Power BI for Weekly Price and Margin Monitoring", text: "Price, margin and markdown by week, category and market." },
      { label: "PLM", title: "PLM Price Fields as the Single Pricing Source", text: "One owner and one format for every price attribute." },
    ],
    caseStudyKey: "price-ladder-margin-report",
    recommendationTitle: "Recommendation from a Fashion Retail Colleague on Retail Pricing Work",
    recommendation: rec("the pricing project"),
    faqTitle: "Retail Pricing Analysis FAQ",
    faq: [
      {
        question: "What is price architecture in retail?",
        answer:
          "Price architecture is the structure of price points a retailer uses within each category, usually from entry through core to top price. It tells the customer where each product sits and gives buyers clear targets for cost and margin. A good price architecture has no empty tiers and no price points so close that they compete with each other.",
      },
      {
        question: "What is good-better-best pricing?",
        answer:
          "Good-better-best pricing offers the same type of product at three quality and price levels, for example a basic, a core and a premium T-shirt. Each tier has a clear difference in fabric, detail or fit that justifies the price step. It lets a brand serve several customer budgets without confusing the range.",
      },
      {
        question: "Which data is needed for a retail pricing analysis?",
        answer:
          "Sales by SKU and week with the selling price, cost price and discounts, for at least one full season. Product attributes such as category and price tier, and stock levels, make the analysis more precise. For several markets, the local prices and currencies are needed too.",
      },
      {
        question: "How do you align retail prices across markets and currencies?",
        answer:
          "I agree a set of rules once: the reference market, conversion rates, rounding to local price points and the allowed deviation per market. The Excel model then calculates every local price from these rules and flags exceptions. The result is consistent prices that still look natural in each currency.",
      },
      {
        question: "Can markdown scenarios be tested before the season?",
        answer:
          "Yes. The scenario model compares discount depth and timing options and shows the expected margin and closing stock for each one. The team approves a markdown plan with its cost already known, instead of discovering it at the end of the season.",
      },
      {
        question: "Do you compare our prices with competitors?",
        answer:
          "Yes, as one input. Competitor price points help to position each tier, but the main check is how your own customers respond to your own prices, which your sell-through and margin data show.",
      },
    ],
    ctaTitle: "Discuss a Retail Pricing Project with Tatsiana Bandziuk",
    ctaText:
      "Send me one category where the prices feel wrong. I will reply with what I would check first.",
    seo: {
      title: "Retail Pricing Analysis and Price Architecture Consulting",
      description:
        "Retail pricing analysis for fashion brands: price architecture audit, good-better-best tiers, cross-market price alignment and markdown scenarios.",
    },
  },
  {
    key: "power-bi-dashboards",
    slug: "power-bi-dashboards",
    number: "03",
    cardTitle: "Power BI Consultant for Retail KPI Dashboards",
    cardText:
      "One Power BI model for sell-through, stock cover, margin and returns that the commercial team actually opens.",
    chart: "dashboard",
    chartCaption: "dashboard layout · schematic",
    breadcrumb: "Power BI dashboards",
    h1: { before: "Power BI Consultant for Retail Sales and", accent: "Assortment Dashboards" },
    intro:
      "As a Power BI consultant for fashion and retail brands, I build one data model and a set of dashboards for sell-through, stock cover, margin and returns that buyers, planners and finance read the same way. The KPI definitions are agreed before the first chart is drawn, so the weekly trading meeting starts with decisions rather than reconciliation.",
    factsTitle: "Typical engagement",
    facts: facts("4–8 weeks", "data model + report"),
    factsNote: "Definitions first, visuals second.",
    problemsTitle: "Retail Reporting Problems a Power BI Consultant Solves",
    problems: [
      { title: "Five Retail Reports with Five Versions of Sell-Through", text: "Each team calculates the same KPI differently, so every meeting starts with reconciliation." },
      { title: "Monthly Retail Reporting Rebuilt by Hand", text: "Exports, copy-paste and manual fixes take days before anyone can read the numbers." },
      { title: "Retail Dashboards Nobody Opens", text: "Reports answer questions nobody asked, while the questions buyers do ask stay in Excel." },
      { title: "No Owner for a Retail KPI That Looks Wrong", text: "When a figure looks odd, nobody knows who can explain it or fix it." },
    ],
    includesTitle: "What the Power BI Dashboard Work Includes",
    includesLead: "From KPI definitions to handover, in five steps.",
    includes: [
      { label: "01", title: "Retail KPI Definition Sheet Agreed with the Teams", text: "Every measure written down with its formula, data source and owner." },
      { label: "02", title: "Retail Data Model in Power BI", text: "Sales, stock, receipts, returns, prices and product attributes in one star-schema model." },
      { label: "03", title: "DAX Measures for Sell-Through, Stock Cover and Margin", text: "Plus weeks of supply, full-price share and returns rate, checked against Excel." },
      { label: "04", title: "Power BI Report Pages Built Around Trading Meetings", text: "Weekly trading, category review and end-of-season pages, each for a real meeting." },
      { label: "05", title: "Refresh, Row-Level Security and Handover", text: "Scheduled refresh, access by market and documentation for the report owner." },
    ],
    resultsTitle: "Results of Power BI Retail Dashboard Projects",
    results: [
      { value: "40", unit: "h", label: "monthly reporting time removed" },
      { value: "4 → 1", label: "competing reports replaced by one model" },
      { value: "100", unit: "%", label: "KPIs with a written definition and owner" },
    ],
    toolsTitle: "Tools Used in Power BI Dashboard Projects",
    tools: [
      { label: "BI", title: "Power BI Data Model, DAX and Row-Level Security", text: "Measures, calculation groups and access by market." },
      { label: "PQ", title: "Power Query for Retail Data Preparation", text: "Repeatable cleaning of ERP, PLM and e-commerce exports." },
      { label: "fx", title: "Excel as the Retail KPI Definition Sheet", text: "One place where every KPI is described and signed off." },
    ],
    caseStudyKey: "weekly-retail-trade-report",
    recommendationTitle: "Recommendation from a Fashion Retail Colleague on Power BI Reporting",
    recommendation: rec("the Power BI reporting"),
    faqTitle: "Power BI Consultant FAQ",
    faq: [
      {
        question: "What does a Power BI consultant do?",
        answer:
          "A Power BI consultant designs the data model, writes the DAX measures and builds the reports that turn a company’s data into answers its teams use. The work also covers data preparation, refresh, access rights and handover. For retail brands, I start with the KPI definitions and the meetings the reports have to serve.",
      },
      {
        question: "What does a good retail dashboard look like?",
        answer:
          "A good retail dashboard answers the questions of one meeting on one page: how sales, sell-through, stock cover and margin are moving, and where to act. It uses agreed definitions, shows comparisons to plan and last year, and lets the user drill from category to SKU. Anything that does not lead to a decision is left out.",
      },
      {
        question: "Which data do you need to build retail KPI dashboards?",
        answer:
          "Sales, stock, receipts and returns at SKU and week level, plus prices and product attributes. Exports from your ERP, PLM or e-commerce platform are enough to start, and the connection can be automated later.",
      },
      {
        question: "Do we need Power BI Pro, Premium or Fabric?",
        answer:
          "Most brand teams start with Power BI Pro licences for everyone who publishes or views shared reports. Premium Per User or a Fabric capacity becomes worth it with many viewers, large datasets or more frequent refreshes. I review your Microsoft 365 setup before recommending anything.",
      },
      {
        question: "Can each market see only its own numbers?",
        answer:
          "Yes. Row-level security lets one report serve every market while each user sees only the data they are allowed to see. Head office keeps the full view without maintaining separate files.",
      },
      {
        question: "How long does a Power BI dashboard project take?",
        answer:
          "Usually four to eight weeks, depending on the number of data sources, KPIs and markets. Agreeing the definitions often takes as long as building the model.",
      },
    ],
    ctaTitle: "Discuss a Power BI Reporting Project with Tatsiana Bandziuk",
    ctaText:
      "Send me the report your team argues about most. I will reply with the definitions I would agree first.",
    seo: {
      title: "Power BI Consultant for Retail and Fashion Dashboards",
      description:
        "Power BI consultant for fashion and retail brands: data model, DAX measures and dashboards for sell-through, stock cover, margin and returns.",
    },
  },
  {
    key: "excel-retail-planning-models",
    slug: "excel-retail-planning-models",
    number: "04",
    cardTitle: "Excel Merchandise Financial Planning Models",
    cardText:
      "Open-to-buy, buy plan and margin models in Excel, built for your planners to maintain rather than a consultant.",
    chart: "otbTable",
    chartCaption: "open-to-buy · units, illustrative",
    breadcrumb: "Excel planning models",
    h1: { before: "Excel Models for Merchandise Financial Planning and", accent: "Open-to-Buy" },
    intro:
      "Merchandise financial planning in Excel gives fashion and retail planners one workbook for the open-to-buy, the buy plan and margin by month and market, instead of a new copy of the file every season. The model is structured, checked and documented, so the team can maintain it without the person who built it.",
    factsTitle: "Typical engagement",
    facts: facts("3–6 weeks", "Excel model + guide"),
    factsNote: "A model is finished when someone else can run it.",
    problemsTitle: "Merchandise Planning Problems These Excel Models Solve",
    problems: [
      { title: "A Buy Plan Workbook Only Its Author Understands", text: "Hidden sheets, hard-coded numbers and links to files that no longer exist." },
      { title: "An Open-to-Buy Budget That Drifts Mid-Season", text: "Receipts and sales are updated in different places, so the budget is never current." },
      { title: "Planning Scenarios Compared by Copying the File", text: "Every what-if becomes a new version, and nobody knows which one was approved." },
      { title: "Margin Calculated Differently in Every Planning Tab", text: "Cost, discounts and currency are handled inconsistently from sheet to sheet." },
    ],
    includesTitle: "What the Excel Merchandise Financial Planning Work Includes",
    includesLead: "Four parts, delivered as one workbook and one short guide.",
    includes: [
      { label: "01", title: "Open-to-Buy Sheet with Monthly Phasing", text: "Planned sales, markdowns, stock and receipts by month, category and market." },
      { label: "02", title: "Buy Plan and Margin Calculation by Market", text: "Cost, selling price, discounts and currency handled by one consistent logic." },
      { label: "03", title: "Scenario Comparison Without File Copies", text: "Switchable assumptions and a side-by-side summary of the options." },
      { label: "04", title: "Built-In Checks and a Maintenance Guide", text: "Three checks that flag drift, and a guide for the next owner of the model." },
    ],
    resultsTitle: "Results of Excel Merchandise Planning Models",
    results: [
      { value: "1", label: "workbook instead of seasonal copies" },
      { value: "−70", unit: "%", label: "time to update the open-to-buy" },
      { value: "3", label: "automatic checks against drift" },
    ],
    toolsTitle: "Excel and Power Query Tools Used in Planning Models",
    tools: [
      { label: "fx", title: "Excel Tables, Dynamic Arrays and Named Ranges", text: "Formulas that can be read and audited by the next planner." },
      { label: "PQ", title: "Power Query Imports of Sales and Stock", text: "Actuals loaded from exports without copy-paste." },
      { label: "BI", title: "Power BI for Plan vs Actual Monitoring", text: "An optional weekly view of the plan against actual sales." },
    ],
    caseStudyKey: "womenswear-range-plan-rebuild",
    recommendationTitle: "Recommendation from a Fashion Retail Colleague on Merchandise Planning Models",
    recommendation: rec("the planning model"),
    faqTitle: "Excel Merchandise Financial Planning FAQ",
    faq: [
      {
        question: "What is merchandise financial planning?",
        answer:
          "Merchandise financial planning (MFP) sets the money side of the range: planned sales, margin, markdowns, stock and purchases by month, category and market. Its main output is the open-to-buy, the budget still available for buying. It links the buying team’s decisions to the company’s financial targets.",
      },
      {
        question: "Why build the merchandise plan in Excel and not in planning software?",
        answer:
          "Many brand teams need a clear, working model before they need software, and Excel is the tool planners already know. A well-built Excel model is quick to change and easy to audit. If you move to a planning system later, it becomes the specification for that system.",
      },
      {
        question: "Can you rebuild our existing buy plan workbook?",
        answer:
          "Yes. I document the existing logic first and then restructure the workbook, so nothing that works today is lost. The team checks the new version against the old one before switching over.",
      },
      {
        question: "Which Excel version is needed?",
        answer:
          "Microsoft 365 is recommended, because dynamic arrays and Power Query make the model simpler and faster to update. Older versions can be supported with simpler formulas.",
      },
      {
        question: "How does the model handle several markets and currencies?",
        answer:
          "Each market has its own planning inputs, and a currency table converts everything to the reporting currency with agreed rates. Totals roll up by category and market, so head office and local teams read the same numbers.",
      },
    ],
    ctaTitle: "Discuss an Excel Merchandise Planning Model with Tatsiana Bandziuk",
    ctaText:
      "Describe the planning file your team is afraid to touch. I will reply with how I would restructure it.",
    seo: {
      title: "Excel Merchandise Financial Planning and OTB Models",
      description:
        "Merchandise financial planning in Excel: open-to-buy, buy plan and margin models for fashion and retail planners, built for the team to maintain.",
    },
  },
  {
    key: "product-data-quality-plm",
    slug: "product-data-quality-plm",
    number: "05",
    cardTitle: "Product Data Quality and PLM Standardisation",
    cardText:
      "One attribute dictionary across markets: consistent seasons, colours, compositions and categories in the PLM system.",
    chart: "completeness",
    chartCaption: "attribute completeness · illustrative",
    breadcrumb: "Product data and PLM",
    h1: { before: "Product Data Quality and PLM Data Standardisation for", accent: "Fashion Brands" },
    intro:
      "Product data quality work gives a fashion brand one attribute dictionary for every market, validation rules at PLM entry and a dashboard that shows where data is missing. As a result, colour, season, composition and category mean the same thing in e-commerce, planning and every report.",
    factsTitle: "Typical engagement",
    facts: facts("6–12 weeks", "dictionary + rules + dashboard"),
    factsNote: "Agreeing the dictionary is the real project.",
    problemsTitle: "Product Data Quality Problems This PLM Service Solves",
    problems: [
      { title: "The Colour Attribute Written Four Different Ways", text: "Free text and local habits make one attribute impossible to filter or report on." },
      { title: "Season Codes That Disagree Between Markets", text: "Markets define the start of a season differently, so season totals never match." },
      { title: "Missing Product Attributes Discovered Too Late", text: "Products reach e-commerce or reporting with empty compositions and categories." },
      { title: "Manual Product Data Cleaning Before Every Report", text: "Days of fixing data each month before anyone can trust a category total." },
    ],
    includesTitle: "What the Product Data Standardisation Work Includes",
    includesLead: "Four workstreams, from the first audit to a monthly review.",
    includes: [
      { label: "01", title: "Product Attribute Audit per Market", text: "Every field mapped, counted and scored for completeness and conflicts." },
      { label: "02", title: "Attribute Dictionary Agreed with All Markets", text: "Colour, season, composition and category defined once, with translations." },
      { label: "03", title: "Migration Rules and PLM Entry Validation", text: "Historic values remapped; new products stopped at entry if key fields are missing." },
      { label: "04", title: "Product Data Quality Dashboard and Monthly Review", text: "Completeness by attribute and market, with a named owner for each gap." },
    ],
    resultsTitle: "Product Data Quality Results",
    results: [
      { value: "98", unit: "%", label: "attribute completeness after standardisation" },
      { value: "−60", unit: "%", label: "time spent fixing product data before reporting" },
      { value: "3", unit: "days", label: "of monthly manual cleaning removed" },
    ],
    toolsTitle: "Tools Used in PLM Product Data Projects",
    tools: [
      { label: "PLM", title: "PLM Attribute and Validation Configuration", text: "Attribute lists, mandatory fields and market permissions." },
      { label: "fx", title: "Excel and Power Query for Attribute Mapping", text: "Repeatable remapping of historic attribute values." },
      { label: "BI", title: "Power BI Product Data Quality Dashboard", text: "Completeness by attribute, market and season." },
    ],
    caseStudyKey: "plm-product-data-standardisation",
    recommendationTitle: "Recommendation from a Fashion Retail Colleague on Product Data Work",
    recommendation: rec("the product data project"),
    faqTitle: "Product Data Quality and PLM FAQ",
    faq: [
      {
        question: "What is product data quality?",
        answer:
          "Product data quality is how complete, consistent, accurate and timely the information about each product is: category, colour, size, composition, season, price and so on. High-quality product data means every system and report describes the same product in the same way. It is usually measured as completeness and error rates per attribute.",
      },
      {
        question: "What is the difference between PLM and PIM?",
        answer:
          "PLM (product lifecycle management) holds the data created while a product is designed and developed: materials, suppliers, costs, sizes and seasons. PIM (product information management) holds the customer-facing content used to sell it: descriptions, images and marketing attributes for each channel. In fashion, product data usually starts in PLM and is enriched in PIM, so both need the same attribute rules.",
      },
      {
        question: "Which PLM systems do you work with?",
        answer:
          "The method does not depend on the system. I have applied it in an enterprise fashion PLM and in simpler product databases and spreadsheets. What matters is that attribute lists and validation rules can be configured, which is true of most PLM systems.",
      },
      {
        question: "How long does it take to agree an attribute dictionary?",
        answer:
          "Usually three to five weeks. Most of the time goes into decisions with the markets and teams, not into the data itself.",
      },
      {
        question: "Can historic product data be cleaned too?",
        answer:
          "Yes. Migration rules remap old values to the new dictionary, and the cases that cannot be mapped automatically are listed for manual review with an owner and a deadline.",
      },
      {
        question: "Who owns product data governance after the project?",
        answer:
          "A named owner inside your team, usually in product data, merchandising or e-commerce. The project leaves a written dictionary, entry rules, a quality dashboard and a monthly review routine, so ownership is clear from day one.",
      },
    ],
    ctaTitle: "Discuss a Product Data Quality Project with Tatsiana Bandziuk",
    ctaText:
      "Send me the three product attributes that cause the most trouble. I will reply with how I would standardise them.",
    seo: {
      title: "Product Data Quality and PLM Standards for Fashion Brands",
      description:
        "Product data quality for fashion brands: attribute dictionary, PLM validation rules, product master data governance and a data quality dashboard.",
    },
  },
  {
    key: "retail-analytics-processes",
    slug: "retail-analytics-processes",
    number: "06",
    cardTitle: "Retail Reporting Process and Analytics Team Setup",
    cardText:
      "A reporting calendar, KPI owners, agreed definitions and weekly reviews, so numbers are agreed once and reused everywhere.",
    chart: "calendar",
    chartCaption: "reporting calendar · weekly / monthly / quarterly",
    breadcrumb: "Retail reporting processes",
    h1: { before: "Setting Up Retail Reporting Processes and", accent: "Analytics Teams" },
    intro:
      "Retail reporting process setup gives a fashion brand team a reporting calendar, a named owner for every KPI and a weekly trading review that ends in decisions. It suits teams whose reports arrive late, disagree with each other or depend on one person, and it frees meeting time for acting on the numbers instead of checking them.",
    factsTitle: "Typical engagement",
    facts: facts("4–8 weeks", "calendar + roles + playbook"),
    factsNote: "A report nobody owns stops being true within a month.",
    problemsTitle: "Retail Reporting Problems This Process Setup Solves",
    problems: [
      { title: "Retail Reports That Arrive at Random Times", text: "Nobody knows which version is final or when the next one is due." },
      { title: "Retail Analysis Done by Whoever Is Free", text: "Product specialists, planners and analysts overlap in some areas and leave gaps in others." },
      { title: "KPI Definitions That Live Only in People’s Heads", text: "When someone leaves, the logic of the reports leaves with them." },
      { title: "Trading Reviews That End Without Decisions", text: "Meetings discuss the numbers, but actions are not recorded or followed up." },
    ],
    includesTitle: "What the Retail Reporting Process Work Includes",
    includesLead: "Four building blocks of a reporting routine that lasts.",
    includes: [
      { label: "01", title: "Retail Reporting Calendar", text: "Weekly, monthly and seasonal reports with dates, audiences and inputs." },
      { label: "02", title: "Report Ownership Matrix", text: "Who prepares, checks and explains each report and data area, with backups." },
      { label: "03", title: "KPI Definitions and Data Standards Playbook", text: "KPI formulas, data entry rules and review steps in one document." },
      { label: "04", title: "Weekly Trading Review and Decision Log", text: "A meeting format that ends with actions, owners and dates." },
    ],
    resultsTitle: "Results of Retail Reporting Process Projects",
    results: [
      { value: "1", label: "reporting calendar for all teams" },
      { value: "100", unit: "%", label: "reports with a named owner" },
      { value: "−50", unit: "%", label: "time spent reconciling numbers in meetings" },
    ],
    toolsTitle: "Tools Used in Retail Reporting Process Projects",
    tools: [
      { label: "fx", title: "Excel Report Ownership Matrix", text: "Reports, owners and backups in one table." },
      { label: "BI", title: "Power BI Report Catalogue", text: "Which report answers which question, and for whom." },
      { label: "PLM", title: "PLM Data Entry Standards for Clean Reporting", text: "Entry rules that keep the reports correct at the source." },
    ],
    caseStudyKey: "weekly-retail-trade-report",
    recommendationTitle: "Recommendation from a Fashion Retail Colleague on Analytics Team Leadership",
    recommendation: rec("leading product data and analytics work"),
    faqTitle: "Retail Reporting Process FAQ",
    faq: [
      {
        question: "What should a weekly retail trading report include?",
        answer:
          "Sales against plan and last year, sell-through, stock cover, gross margin and markdown by category, plus the best and worst sellers. Each figure should have one written definition and an owner. The report should end with the decisions to be taken that week, not just the numbers.",
      },
      {
        question: "Who should own each retail KPI?",
        answer:
          "The person or team that can act on it: buying or merchandise planning for sell-through and stock cover, finance for margin, e-commerce for returns. The analytics team owns the calculation, and the business owner owns the decision. Both are named in the ownership matrix.",
      },
      {
        question: "Is a reporting process worth it for a small brand team?",
        answer:
          "Yes, and often most of all. In a small team each person covers several roles, so a simple calendar and clear definitions save proportionally more time and prevent errors when someone is away.",
      },
      {
        question: "Do you work with our existing reports and tools?",
        answer:
          "Yes. The process is designed around the reports, Excel files and Power BI models you already have. New tools are suggested only where an existing one cannot do the job.",
      },
      {
        question: "Can you train the team that will run the reports?",
        answer:
          "Yes. Training sessions and a written playbook are part of every handover, and the first reporting cycles can be run together before the team takes over.",
      },
    ],
    ctaTitle: "Discuss a Retail Reporting Process Project with Tatsiana Bandziuk",
    ctaText:
      "Tell me how your team produces its weekly report today. I will reply with the first thing I would change.",
    seo: {
      title: "Retail Reporting Process and Analytics Team Setup",
      description:
        "Retail reporting process for fashion brands: reporting calendar, KPI definitions, report owners and weekly review rituals that end in decisions.",
    },
  },
];

export const formats: ConsultingFormat[] = [
  {
    label: "FORMAT 01",
    title: "Two-Week Retail Data Diagnostic",
    suits: "brands that suspect the range, prices or reporting are wrong but cannot prove it from their own reports.",
    youGet: "a findings memo, quantified gaps and a prioritised plan.",
    duration: "2 weeks",
    cta: "Book a diagnostic",
  },
  {
    label: "FORMAT 02",
    title: "Retail Analytics Project: Assortment, Pricing, Data or Reporting",
    suits: "teams with one clear problem to fix: the range plan, the price architecture, the PLM data or the KPI reporting.",
    youGet: "working models or dashboards, documentation and a team handover.",
    duration: "4–10 weeks",
    cta: "Discuss a project",
  },
  {
    label: "FORMAT 03",
    title: "Ongoing Retail Analytics Support",
    suits: "growing brands without an in-house analyst that still need a reliable monthly reporting rhythm.",
    youGet: "maintained reports, a monthly review and documented decisions.",
    duration: "monthly retainer",
    cta: "Ask about support",
  },
];

export const tools: Tool[] = [
  {
    id: "power-bi",
    monogram: "BI",
    title: "Power BI for Retail Reporting",
    text: "One data model per brand for sell-through, stock cover and margin, refreshed without manual work.",
    skills: ["DAX", "Power Query", "row-level security"],
  },
  {
    id: "excel",
    monogram: "fx",
    title: "Advanced Excel for Merchandise Planning",
    text: "Buy plans, open-to-buy and margin scenarios your planners can open, read and keep using.",
    skills: ["open-to-buy", "scenarios", "pivot models"],
  },
  {
    id: "plm",
    monogram: "PLM",
    title: "PLM Systems for Product Data",
    text: "Attribute dictionaries, season and colour structures, and rules that keep product data clean at entry.",
    skills: ["attribute dictionary", "data governance"],
  },
];

export const recommendations: Recommendation[] = [
  {
    quote:
      "“Placeholder recommendation text. Two or three sentences on how the assortment analysis changed the way the buying team made decisions, written by a colleague and quoted with permission.”",
    name: "Name Surname",
    role: "Role · worked together on assortment planning",
    placeholder: true,
  },
  {
    quote:
      "“Placeholder recommendation text. A few lines about the Power BI reporting — that the numbers stopped being argued about and started being used in the weekly trade meeting.”",
    name: "Name Surname",
    role: "Role · reported into the same brand team",
    placeholder: true,
  },
  {
    quote:
      "“Placeholder recommendation text. A short note on the PLM product data work and on what it is like to hand a data standard over to a team that then keeps it.”",
    name: "Name Surname",
    role: "Role · product data project counterpart",
    placeholder: true,
  },
];
