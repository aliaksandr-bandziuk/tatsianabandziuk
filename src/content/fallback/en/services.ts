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
    slug: "assortment-planning",
    number: "01",
    cardTitle: "Assortment Planning and Range Management",
    cardText:
      "Range architecture, option counts and depth by market, so the buy matches real demand instead of last season’s habit.",
    chart: "sizeCurve",
    chartCaption: "size curve · XS–3XL",
    breadcrumb: "Assortment planning",
    h1: { before: "Assortment Planning and Range Management Consulting for", accent: "Fashion Retail" },
    intro:
      "A range built on evidence: how many options per category, how deep per size and colour, and which markets carry which part of the buy.",
    factsTitle: "Typical engagement",
    facts: facts("6–10 weeks", "range plan + model"),
    factsNote: "Always starts with your own sales data.",
    problemsTitle: "Assortment Problems This Consulting Service Solves",
    problems: [
      {
        title: "Too many options, too little depth per option",
        text: "The range looks rich on paper and sells thin in store: broken sizes by week four, and no bestseller with stock behind it.",
      },
      {
        title: "Size and colour splits copied from last season",
        text: "Curves are inherited rather than calculated, so returns and stock-outs quietly distort every following buy.",
      },
      {
        title: "One range pushed into very different markets",
        text: "The same assortment ships to markets with different climates, price expectations and store sizes, and markdown absorbs the difference.",
      },
      {
        title: "No agreed numbers between buying and finance",
        text: "Every meeting starts by reconciling two versions of sell-through instead of deciding what to buy.",
      },
    ],
    includesTitle: "What Assortment Planning and Range Management Work Includes",
    includesLead: "Five workstreams, delivered in order, each with a document your team keeps.",
    includes: [
      {
        label: "01",
        title: "Category and range architecture review",
        text: "Option counts by category, price tier and market, against sell-through and margin history.",
      },
      {
        label: "02",
        title: "Size and colour curve calculation",
        text: "Curves rebuilt from cleaned sales: returns, stock-outs and promo weeks excluded.",
      },
      {
        label: "03",
        title: "Buy plan and open-to-buy model in Excel",
        text: "One model your planners maintain: units, cost, margin and phasing by month and market.",
      },
      {
        label: "04",
        title: "In-season range monitoring in Power BI",
        text: "Weekly sell-through, stock cover and size-integrity view, with agreed definitions.",
      },
      {
        label: "05",
        title: "Handover workshops for buying and planning teams",
        text: "Two sessions plus written documentation, so the next season runs without me.",
      },
    ],
    resultsTitle: "Results Clients Get from Assortment Planning Consulting",
    results: [
      { value: "+18", unit: "pp", label: "sell-through on core categories in the first full season" },
      { value: "−21", unit: "%", label: "option count, with depth moved into proven sizes and colours" },
      { value: "−31", unit: "%", label: "markdown spend across two consecutive seasons" },
    ],
    toolsTitle: "Tools Used in Assortment Planning Projects",
    tools: [
      { label: "fx", title: "Advanced Excel for the buy plan", text: "Open-to-buy, phasing and scenario comparison." },
      { label: "BI", title: "Power BI for in-season monitoring", text: "DAX measures for sell-through, cover and size integrity." },
      { label: "PLM", title: "PLM data as the range backbone", text: "Clean category, season and colour attributes behind every count." },
    ],
    caseStudySlug: "womenswear-range-plan-rebuild",
    recommendationTitle: "Recommendation from a Fashion Retail Colleague on Assortment Planning Work",
    recommendation: rec("the assortment planning project"),
    faqTitle: "Assortment Planning Consulting FAQ",
    faq: [
      {
        question: "Which sales history is needed for a range plan rebuild?",
        answer:
          "Two seasons at SKU and week level, with stock and returns. One season is workable but the curves carry more uncertainty.",
      },
      {
        question: "Can the range plan work for several markets at once?",
        answer:
          "Yes. The model keeps one range architecture and lets depth, size split and phasing differ per market, so each market plan stays comparable.",
      },
      {
        question: "Who keeps the buy plan model after the project ends?",
        answer:
          "Your planning team. The model is built in the tools they already use, documented, and handed over in two workshops.",
      },
    ],
    ctaTitle: "Discuss an Assortment Planning Project with Tatsiana Bandziuk",
    ctaText:
      "Placeholder note: send me the category you are least sure about. I will tell you what the data would have to show for the range to be right.",
    seo: {
      title: "Assortment Planning Consulting for Fashion Retail",
      description:
        "Range architecture, size and colour curves, open-to-buy model and in-season monitoring for fashion and retail brands. Consultant in Warsaw, EN / PL / RU.",
    },
  },
  {
    slug: "retail-pricing-analysis",
    number: "02",
    cardTitle: "Retail Pricing Analysis",
    cardText: "Price ladders, entry and exit points, margin and markdown scenarios by category and market.",
    chart: "priceLadder",
    chartCaption: "price ladder · entry → top tier",
    breadcrumb: "Retail pricing analysis",
    h1: { before: "Retail Pricing Analysis and Price Alignment", accent: "Across Markets" },
    intro:
      "Price ladders that make sense to a customer and to finance: clear entry and exit points per category, consistent across markets, tested against margin before the season starts.",
    factsTitle: "Typical engagement",
    facts: facts("4–8 weeks", "price ladder + margin model"),
    factsNote: "Prices are checked against sell-through, not only against competitors.",
    problemsTitle: "Pricing Problems This Retail Analysis Solves",
    problems: [
      {
        title: "Gaps and overlaps in the price ladder",
        text: "Two price points too close together cannibalise each other, while an empty tier sends customers elsewhere.",
      },
      {
        title: "The same product priced differently without a reason",
        text: "Currency conversions and local decisions drift apart until a customer notices the difference before you do.",
      },
      {
        title: "Markdown decided by habit",
        text: "Discount depth and timing repeat last season’s calendar instead of following stock and sell-through.",
      },
      {
        title: "Margin checked only after the season",
        text: "Price changes are agreed in meetings, and their effect on margin appears in the report two months later.",
      },
    ],
    includesTitle: "What the Retail Pricing Analysis Work Includes",
    includesLead: "Four steps, each ending with a file your pricing owner keeps.",
    includes: [
      { label: "01", title: "Price ladder audit per category", text: "Entry, core and top tiers mapped against sales mix and margin." },
      { label: "02", title: "Cross-market price alignment rules", text: "Conversion logic, rounding and allowed deviations agreed once." },
      { label: "03", title: "Margin and markdown scenario model in Excel", text: "What-if comparison of price and discount options before they are approved." },
      { label: "04", title: "Price monitoring view in Power BI", text: "Weekly check of price, margin and markdown depth by category and market." },
    ],
    resultsTitle: "Results Clients Get from Retail Pricing Analysis",
    results: [
      { value: "+2.4", unit: "pp", label: "gross margin after ladder clean-up" },
      { value: "3", label: "markets priced from one set of rules" },
      { value: "−18", unit: "%", label: "markdown depth on core lines" },
    ],
    toolsTitle: "Tools Used in Retail Pricing Projects",
    tools: [
      { label: "fx", title: "Advanced Excel for price scenarios", text: "Ladders, conversions and margin what-ifs." },
      { label: "BI", title: "Power BI for price monitoring", text: "Price, margin and markdown by week and market." },
      { label: "PLM", title: "PLM price fields as the source", text: "One owner and one format for every price attribute." },
    ],
    caseStudySlug: "price-ladder-margin-report",
    recommendationTitle: "Recommendation from a Fashion Retail Colleague on Pricing Work",
    recommendation: rec("the pricing project"),
    faqTitle: "Retail Pricing Analysis FAQ",
    faq: [
      { question: "Which data is needed for a price ladder audit?", answer: "Sales by SKU and week with selling price, cost price and discounts for at least one full season." },
      { question: "Do you compare our prices with competitors?", answer: "Yes, as one input. The main check is how your own customers respond to your own price points." },
      { question: "Can the markdown plan be tested before it starts?", answer: "Yes. The scenario model shows margin and stock outcome for each discount option before approval." },
    ],
    ctaTitle: "Discuss a Retail Pricing Project with Tatsiana Bandziuk",
    ctaText: "Placeholder note: send me one category where the prices feel wrong. I will reply with what I would check first.",
    seo: {
      title: "Retail Pricing Analysis and Price Ladder Consulting",
      description:
        "Price ladder audit, cross-market price alignment and markdown scenarios for fashion and retail brands. Pricing analysis consultant in Warsaw.",
    },
  },
  {
    slug: "power-bi-dashboards",
    number: "03",
    cardTitle: "Power BI Dashboards for Retail KPIs",
    cardText: "Sell-through, stock cover, full-price share and returns in one model the commercial team actually opens.",
    chart: "dashboard",
    chartCaption: "dashboard layout · schematic",
    breadcrumb: "Power BI dashboards",
    h1: { before: "Power BI Dashboards for Retail Sales and", accent: "Assortment KPIs" },
    intro:
      "One data model for sell-through, stock cover, full-price share and returns, with definitions your buyers, planners and finance agree on before the first chart is drawn.",
    factsTitle: "Typical engagement",
    facts: facts("4–8 weeks", "data model + report"),
    factsNote: "Definitions first, visuals second.",
    problemsTitle: "Retail Reporting Problems This Power BI Service Solves",
    problems: [
      { title: "Five reports, five versions of sell-through", text: "Each team calculates the same KPI differently, so meetings start with reconciliation." },
      { title: "Monthly reporting rebuilt by hand", text: "Exports, copy-paste and manual fixes take days before anyone can read the numbers." },
      { title: "Dashboards nobody opens", text: "Reports answer questions nobody asked, while the questions buyers do ask stay in Excel." },
      { title: "No owner for a number", text: "When a figure looks wrong, nobody knows who can explain or fix it." },
    ],
    includesTitle: "What the Power BI Retail Dashboard Work Includes",
    includesLead: "From definitions to handover, in five steps.",
    includes: [
      { label: "01", title: "KPI definition sheet agreed with the teams", text: "Every measure written down with formula, source and owner." },
      { label: "02", title: "Retail data model in Power BI", text: "Sales, stock, receipts, returns and product attributes in one model." },
      { label: "03", title: "DAX measures for retail KPIs", text: "Sell-through, weeks of cover, full-price share, returns rate and margin." },
      { label: "04", title: "Report pages built around real meetings", text: "Weekly trade, category review and end-of-season views." },
      { label: "05", title: "Refresh, access and handover", text: "Scheduled refresh, row-level security per market and documentation." },
    ],
    resultsTitle: "Results Clients Get from Retail Power BI Dashboards",
    results: [
      { value: "40", unit: "h", label: "monthly reporting time removed" },
      { value: "4 → 1", label: "competing reports replaced by one model" },
      { value: "100", unit: "%", label: "KPIs with a written definition and owner" },
    ],
    toolsTitle: "Tools Used in Power BI Dashboard Projects",
    tools: [
      { label: "BI", title: "Power BI data model and DAX", text: "Measures, calculation groups and row-level security." },
      { label: "PQ", title: "Power Query for data preparation", text: "Repeatable cleaning of exports and ERP extracts." },
      { label: "fx", title: "Excel as the definition sheet", text: "One place where every KPI is described." },
    ],
    caseStudySlug: "weekly-retail-trade-report",
    recommendationTitle: "Recommendation from a Fashion Retail Colleague on Power BI Reporting",
    recommendation: rec("the Power BI reporting"),
    faqTitle: "Power BI Retail Dashboard FAQ",
    faq: [
      { question: "Which data do you need to build retail KPI dashboards?", answer: "Sales, stock, receipts and returns at SKU and week level, plus product attributes. Exports from your ERP or PLM are enough to start." },
      { question: "Do we need Power BI Pro or Premium licences?", answer: "Pro is enough for most brand teams. Premium or Fabric capacity helps only with many viewers or large data volumes." },
      { question: "Can the dashboard be split by market with restricted access?", answer: "Yes, with row-level security: one report, and each market sees only its own numbers." },
    ],
    ctaTitle: "Discuss a Power BI Reporting Project with Tatsiana Bandziuk",
    ctaText: "Placeholder note: send me the report your team argues about most. I will reply with the definitions I would agree first.",
    seo: {
      title: "Power BI Dashboards for Retail KPIs",
      description:
        "Power BI data model, DAX measures and dashboards for sell-through, stock cover, full-price share and returns in fashion and retail brands.",
    },
  },
  {
    slug: "excel-retail-planning-models",
    number: "04",
    cardTitle: "Excel Models for Retail Planning",
    cardText: "Open-to-buy, seasonal buy plans and margin models built to be maintained by the team, not by a consultant.",
    chart: "otbTable",
    chartCaption: "open-to-buy · units, placeholder",
    breadcrumb: "Excel planning models",
    h1: { before: "Excel Models for Retail Planning and", accent: "Merchandising Analysis" },
    intro:
      "Open-to-buy, buy plans and margin models in the tool your planners already use, structured so they can be read, checked and maintained without the person who built them.",
    factsTitle: "Typical engagement",
    facts: facts("3–6 weeks", "Excel model + guide"),
    factsNote: "A model is finished when someone else can run it.",
    problemsTitle: "Planning Problems This Excel Modelling Service Solves",
    problems: [
      { title: "A buy plan only its author understands", text: "Hidden sheets, hard-coded numbers and links to files that no longer exist." },
      { title: "Open-to-buy that drifts mid-season", text: "Receipts and sales are updated in different places, so the budget is never current." },
      { title: "Scenarios compared by copying the file", text: "Every what-if becomes a new version, and nobody knows which one was approved." },
      { title: "Margin calculated differently in every tab", text: "Cost, discounts and currency are handled inconsistently." },
    ],
    includesTitle: "What the Excel Retail Planning Model Work Includes",
    includesLead: "Four parts, delivered as one workbook and one short guide.",
    includes: [
      { label: "01", title: "Open-to-buy sheet with monthly phasing", text: "Units and value by month, category and market." },
      { label: "02", title: "Buy plan and margin calculation", text: "Cost, selling price, discounts and currency in one consistent logic." },
      { label: "03", title: "Scenario comparison without copies", text: "Switchable assumptions and a side-by-side summary." },
      { label: "04", title: "Built-in checks and a maintenance guide", text: "Three checks that flag drift, plus a guide for the next owner." },
    ],
    resultsTitle: "Results Clients Get from Excel Planning Models",
    results: [
      { value: "1", label: "workbook instead of seasonal copies" },
      { value: "−70", unit: "%", label: "time to update the open-to-buy" },
      { value: "3", label: "automatic checks against drift" },
    ],
    toolsTitle: "Tools Used in Excel Planning Projects",
    tools: [
      { label: "fx", title: "Excel formulas and tables", text: "Structured tables, dynamic arrays and named ranges." },
      { label: "PQ", title: "Power Query imports", text: "Sales and stock loaded from exports without copy-paste." },
      { label: "BI", title: "Power BI for monitoring", text: "Optional view of plan vs actual by week." },
    ],
    caseStudySlug: "womenswear-range-plan-rebuild",
    recommendationTitle: "Recommendation from a Fashion Retail Colleague on Planning Models",
    recommendation: rec("the planning model"),
    faqTitle: "Excel Retail Planning Model FAQ",
    faq: [
      { question: "Why Excel and not a planning system?", answer: "Many brand teams need a clear model before they need software. A good Excel model also becomes the specification for a system later." },
      { question: "Can you rebuild our existing buy plan file?", answer: "Yes. The existing logic is documented first, then restructured so nothing that works is lost." },
      { question: "Which Excel version is required?", answer: "Microsoft 365 is recommended for dynamic arrays and Power Query; older versions can be supported with simpler formulas." },
    ],
    ctaTitle: "Discuss an Excel Planning Model with Tatsiana Bandziuk",
    ctaText: "Placeholder note: describe the file your planners are afraid to touch. I will reply with how I would restructure it.",
    seo: {
      title: "Excel Open-to-Buy and Buy Plan Models for Retail",
      description:
        "Open-to-buy, buy plan and margin models in Excel for fashion and retail planners, built to be maintained by the team.",
    },
  },
  {
    slug: "product-data-quality-plm",
    number: "05",
    cardTitle: "Product Data Quality and PLM Data Standardisation",
    cardText:
      "One attribute dictionary across markets: clean seasons, colours, compositions and codes in the PLM system.",
    chart: "completeness",
    chartCaption: "attribute completeness · placeholder",
    breadcrumb: "Product data and PLM",
    h1: { before: "Product Data Quality and PLM Data Standardisation for", accent: "Fashion Brands" },
    intro:
      "One attribute dictionary for every market, validation rules at entry and a quality dashboard, so the same product means the same thing in every report.",
    factsTitle: "Typical engagement",
    facts: facts("6–12 weeks", "dictionary + rules + dashboard"),
    factsNote: "Agreeing the dictionary is the real project.",
    problemsTitle: "Product Data Problems This PLM Service Solves",
    problems: [
      { title: "Colour written four ways", text: "Free text and local habits make one attribute impossible to filter or report." },
      { title: "Season codes that disagree", text: "Markets define the start of a season differently, so totals never match." },
      { title: "Missing fields discovered too late", text: "Products reach e-commerce or reporting with empty compositions and categories." },
      { title: "Manual cleaning before every report", text: "Days of fixing data each month before anyone can trust a category total." },
    ],
    includesTitle: "What the Product Data Standardisation Work Includes",
    includesLead: "Four workstreams, from audit to monthly review.",
    includes: [
      { label: "01", title: "Audit of product attributes per market", text: "Every field mapped, counted and scored for completeness and conflict." },
      { label: "02", title: "Attribute dictionary agreed with all markets", text: "Colour, season, composition and category defined once, with translations." },
      { label: "03", title: "Migration rules and PLM entry validation", text: "Historic data remapped; new products blocked at entry if key fields are missing." },
      { label: "04", title: "Data quality dashboard and monthly review", text: "Completeness per attribute and market, with a named owner for each gap." },
    ],
    resultsTitle: "Results Clients Get from Product Data Standardisation",
    results: [
      { value: "98", unit: "%", label: "attribute completeness after standardisation" },
      { value: "−60", unit: "%", label: "time spent fixing product data before reporting" },
      { value: "3", unit: "days", label: "of monthly manual cleaning removed" },
    ],
    toolsTitle: "Tools Used in PLM Data Projects",
    tools: [
      { label: "PLM", title: "PLM system configuration", text: "Attribute lists, validation rules and market permissions." },
      { label: "fx", title: "Excel and Power Query for mapping", text: "Remapping of historic attributes." },
      { label: "BI", title: "Power BI data quality dashboard", text: "Completeness by attribute, market and season." },
    ],
    caseStudySlug: "plm-product-data-standardisation",
    recommendationTitle: "Recommendation from a Fashion Retail Colleague on Product Data Work",
    recommendation: rec("the product data project"),
    faqTitle: "Product Data and PLM Standardisation FAQ",
    faq: [
      { question: "Which PLM systems do you work with?", answer: "The method is system-independent. It has been applied in enterprise fashion PLM systems and in simpler product databases." },
      { question: "How long does it take to agree an attribute dictionary?", answer: "Usually three to five weeks, most of it spent on decisions with the markets rather than on the data itself." },
      { question: "Can historic products be cleaned too?", answer: "Yes. Migration rules remap old values to the new dictionary, and exceptions are listed for manual review." },
    ],
    ctaTitle: "Discuss a Product Data Project with Tatsiana Bandziuk",
    ctaText: "Placeholder note: send me three attributes that cause the most trouble. I will reply with how I would standardise them.",
    seo: {
      title: "Product Data Quality and PLM Standardisation",
      description:
        "Attribute dictionary, PLM validation rules and data quality dashboards for fashion brands selling in several markets.",
    },
  },
  {
    slug: "retail-analytics-processes",
    number: "06",
    cardTitle: "Setting Up Retail Analytics Processes",
    cardText:
      "Reporting calendar, owners, definitions and review rituals, so numbers are agreed once and reused everywhere.",
    chart: "calendar",
    chartCaption: "reporting calendar · weekly / monthly / quarterly",
    breadcrumb: "Analytics processes",
    h1: { before: "Setting Up Retail Analytics Processes and", accent: "Reporting Teams" },
    intro:
      "A reporting calendar, named owners and agreed definitions, so a brand team spends its meetings on decisions instead of on checking numbers.",
    factsTitle: "Typical engagement",
    facts: facts("4–8 weeks", "calendar + roles + playbook"),
    factsNote: "A report nobody owns stops being true within a month.",
    problemsTitle: "Team and Process Problems This Service Solves",
    problems: [
      { title: "Reports arrive at random times", text: "Nobody knows which version is final or when the next one comes." },
      { title: "Analysis done by whoever is free", text: "Product specialists, planners and analysts overlap and leave gaps." },
      { title: "Definitions live in people’s heads", text: "When someone leaves, the logic of the reports leaves with them." },
      { title: "Reviews without decisions", text: "Meetings discuss numbers, but actions are not recorded or followed up." },
    ],
    includesTitle: "What the Retail Analytics Process Work Includes",
    includesLead: "Four building blocks of a reporting routine that lasts.",
    includes: [
      { label: "01", title: "Reporting calendar", text: "Weekly, monthly and seasonal reports with dates, audiences and inputs." },
      { label: "02", title: "Roles and ownership matrix", text: "Who prepares, checks and explains each report and data area." },
      { label: "03", title: "Definition and data standards playbook", text: "KPIs, data entry rules and review steps in one document." },
      { label: "04", title: "Review rituals and decision log", text: "Meeting formats that end with owners and dates." },
    ],
    resultsTitle: "Results Clients Get from Analytics Process Setup",
    results: [
      { value: "1", label: "reporting calendar for all teams" },
      { value: "100", unit: "%", label: "reports with a named owner" },
      { value: "−50", unit: "%", label: "time spent reconciling numbers in meetings" },
    ],
    toolsTitle: "Tools Used in Analytics Process Projects",
    tools: [
      { label: "fx", title: "Excel ownership matrix", text: "Tasks, owners and backups in one table." },
      { label: "BI", title: "Power BI report catalogue", text: "Which report answers which question." },
      { label: "PLM", title: "PLM data standards", text: "Entry rules that keep reporting clean." },
    ],
    caseStudySlug: "weekly-retail-trade-report",
    recommendationTitle: "Recommendation from a Fashion Retail Colleague on Team Leadership",
    recommendation: rec("leading product data and analytics work"),
    faqTitle: "Retail Analytics Process FAQ",
    faq: [
      { question: "Is this only for large teams?", answer: "No. Small brand teams benefit most, because each person covers several roles." },
      { question: "Do you work with our existing tools?", answer: "Yes. The process is designed around the tools and reports you already have." },
      { question: "Can you train the team that will run the reports?", answer: "Yes. Training and a written playbook are part of every handover." },
    ],
    ctaTitle: "Discuss a Retail Analytics Process Project with Tatsiana Bandziuk",
    ctaText: "Placeholder note: tell me how your team produces its weekly report today. I will reply with the first thing I would change.",
    seo: {
      title: "Retail Analytics Process and Reporting Team Setup",
      description:
        "Reporting calendar, ownership matrix, KPI definitions and review rituals for fashion and retail analytics teams.",
    },
  },
];

export const formats: ConsultingFormat[] = [
  {
    label: "FORMAT 01",
    title: "Two-Week Retail Data Diagnostic",
    suits: "brands that suspect the range or the prices are wrong but cannot prove it from their own reports.",
    youGet: "a findings memo, quantified gaps and a prioritised plan.",
    duration: "2 weeks",
    cta: "Book a diagnostic",
  },
  {
    label: "FORMAT 02",
    title: "Assortment, Pricing or Reporting Project",
    suits: "teams with one clear problem to fix — the range plan, the price ladder, the PLM data or the KPI reporting.",
    youGet: "working models or dashboards, documentation and team handover.",
    duration: "6–10 weeks",
    cta: "Discuss a project",
  },
  {
    label: "FORMAT 03",
    title: "Ongoing Analytics Support",
    suits: "growing brands without an in-house analyst who still need a reliable monthly rhythm.",
    youGet: "maintained reporting, a monthly review and decisions documented.",
    duration: "monthly retainer",
    cta: "Ask about support",
  },
];

export const tools: Tool[] = [
  {
    id: "power-bi",
    monogram: "BI",
    title: "Power BI for Retail Reporting",
    text: "One data model per brand: sell-through, stock cover and margin, refreshed without manual work.",
    skills: ["DAX", "Power Query", "row-level security"],
  },
  {
    id: "excel",
    monogram: "fx",
    title: "Advanced Excel for Planning Models",
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
