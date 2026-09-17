import type { CaseStudy } from "../../types";

/**
 * Anonymised case studies with placeholder figures. Nothing here may be
 * traceable to the current employer: no market counts, internal project names
 * or SKU counts.
 */
export const caseStudies: CaseStudy[] = [
  {
    key: "plm-product-data-standardisation",
    slug: "plm-product-data-standardisation",
    topics: ["product-data"],
    tag: "Product data · PLM",
    title: "Standardising Product Data Across European and Asian Markets in a PLM System",
    h1: { before: "Standardising Product Data Across European and Asian Markets in a", accent: "PLM System" },
    summary:
      "A fashion brand selling in Europe and Asia replaced local naming habits with one PLM attribute dictionary and validation at entry.",
    intro:
      "A fashion brand selling across Europe and Asia had product attributes described differently in every market. One shared attribute dictionary, validation rules at PLM entry and a data quality dashboard made the same product mean the same thing in every market’s reporting.",
    cardMetrics: ["98% completeness", "−60% data fixes"],
    dashboard: "bars",
    breadcrumb: "PLM product data",
    facts: [
      { label: "Business", value: "multi-market fashion brand" },
      { label: "Markets", value: "Europe + Asia" },
      { label: "Scope", value: "full seasonal range" },
      { label: "Duration", value: "9 weeks" },
      { label: "Role", value: "lead analyst" },
    ],
    factsNote: "Anonymised client · placeholder figures",
    challengeTitle: "PLM Product Data Challenge Across European and Asian Markets",
    challenge: [
      "Each market had grown its own way of describing products: colour written four ways, season codes that disagreed on when a season starts, and compositions typed as free text.",
      "As a result, consolidated reporting was rebuilt by hand every month, and nobody trusted a category total enough to act on it quickly.",
    ],
    challengePoints: [
      "Several local attribute conventions inside one PLM system",
      "About three days of manual data cleaning before each monthly report",
      "Category totals that differed between markets and head office",
    ],
    actionsTitle: "What Was Done to Standardise the PLM Product Data",
    actions: [
      { label: "01", title: "Product Attribute Audit in Every Market", text: "Every field mapped, counted and scored for completeness and conflicts." },
      { label: "02", title: "One Product Attribute Dictionary Agreed with All Markets", text: "Colour, season, composition and category defined once, with translations." },
      { label: "03", title: "Migration Rules and PLM Entry Validation", text: "Historic values remapped; new products stopped at entry if key fields were missing." },
      { label: "04", title: "Product Data Quality Dashboard and Monthly Review", text: "Completeness by attribute and market, with a named owner for each gap." },
    ],
    resultsTitle: "PLM Product Data Standardisation Results in Numbers",
    results: [
      { value: "98", unit: "%", label: "attribute completeness, from 71% at project start" },
      { value: "−60", unit: "%", label: "time spent fixing product data before reporting" },
      { value: "1", label: "attribute dictionary in place of several local conventions" },
      { value: "3", unit: "days", label: "of monthly manual cleaning removed from the reporting cycle" },
    ],
    toolsTitle: "Tools Used in the PLM Product Data Standardisation Project",
    tools: [
      { label: "PLM", title: "PLM Attribute and Validation Configuration", text: "Attribute lists, mandatory fields and market permissions." },
      { label: "fx", title: "Excel and Power Query for Attribute Migration", text: "Repeatable remapping of historic attribute values." },
      { label: "BI", title: "Power BI Product Data Quality Dashboard", text: "Completeness by attribute, market and season, reviewed monthly." },
    ],
    serviceKey: "product-data-quality-plm",
    serviceTitle: "Related Service: Product Data Quality and PLM Standardisation",
    serviceText:
      "The same method, adapted to your systems: attribute audit, dictionary, migration rules, validation at entry and a quality dashboard your team reviews.",
    serviceChips: ["attribute dictionary", "PLM validation", "data governance"],
    note: "The dictionary was the easy part — agreeing it was the project.",
    faqTitle: "PLM Product Data Standardisation Case Study FAQ",
    faq: [
      {
        question: "How long did the PLM product data standardisation project take?",
        answer:
          "The project took nine weeks. Most of that time went into the attribute audit and into agreeing one dictionary with every market; migration rules and validation followed once the definitions were signed off.",
      },
      {
        question: "Which data was needed for the PLM standardisation?",
        answer:
          "An export of every product attribute from the PLM system for each market, including colour, season, composition and category values. The monthly reporting files showed where the differences caused problems. Historic values were needed to build the migration rules.",
      },
      {
        question: "What changed for the team after the PLM project?",
        answer:
          "New products are now checked at entry, so missing or non-standard attributes are stopped before they reach reporting. The manual cleaning before each monthly report was removed, and a data quality dashboard with named owners is reviewed every month.",
      },
    ],
    publishedAt: "2026-06-01",
    seo: {
      title: "PLM Product Data Standardisation Case Study",
      description:
        "Case study: one attribute dictionary, PLM validation rules and a data quality dashboard for a fashion brand selling in Europe and Asia.",
    },
  },
  {
    key: "womenswear-range-plan-rebuild",
    slug: "womenswear-range-plan-rebuild",
    topics: ["assortment"],
    tag: "Assortment · Range",
    title: "Rebuilding the Womenswear Range Plan for a European Fashion Distributor",
    h1: { before: "Rebuilding the Womenswear Range Plan for a", accent: "European Fashion Distributor" },
    summary:
      "Fewer options, more depth in proven sizes and colours, and a new open-to-buy plan for a womenswear distributor.",
    intro:
      "A European fashion distributor’s womenswear range had grown wider every season while depth per option shrank. A range architecture review, recalculated size and colour curves and a new open-to-buy plan moved the buy into proven options, monitored weekly in Power BI.",
    cardMetrics: ["+18 pp sell-through", "−31% markdown"],
    dashboard: "trend",
    breadcrumb: "Womenswear range plan",
    facts: [
      { label: "Business", value: "European fashion distributor" },
      { label: "Category", value: "womenswear" },
      { label: "Duration", value: "8 weeks" },
      { label: "Role", value: "lead analyst" },
    ],
    factsNote: "Anonymised client · placeholder figures",
    challengeTitle: "Womenswear Range Planning Challenge for the Distributor",
    challenge: [
      "The womenswear range had grown season by season: more options each time and less depth behind each one. Stores ran out of core sizes early, while fringe colours ended up in markdown.",
      "The size curves had been copied from the previous plan, together with the distortions caused by earlier stock-outs.",
    ],
    challengePoints: [
      "Broken size runs in core lines by week four",
      "Markdown absorbing a growing share of margin",
      "No shared sell-through figure between buying and finance",
    ],
    actionsTitle: "What Was Done to Rebuild the Womenswear Range Plan",
    actions: [
      { label: "01", title: "Womenswear Range Architecture Review by Category and Price Tier", text: "Option counts compared with sell-through and margin history." },
      { label: "02", title: "Size and Colour Curves Recalculated from Cleaned Sales", text: "Returns, stock-out weeks and promotions removed from the history." },
      { label: "03", title: "New Womenswear Buy Plan and Open-to-Buy Model", text: "Depth moved into proven options, with monthly phasing." },
      { label: "04", title: "Weekly Womenswear Range Monitoring in Power BI", text: "Sell-through and size integrity tracked against the plan." },
    ],
    resultsTitle: "Womenswear Range Plan Results in Numbers",
    results: [
      { value: "+18", unit: "pp", label: "sell-through on core categories" },
      { value: "−21", unit: "%", label: "option count" },
      { value: "−31", unit: "%", label: "markdown spend across two seasons" },
    ],
    toolsTitle: "Tools Used in the Womenswear Range Plan Project",
    tools: [
      { label: "fx", title: "Excel Buy Plan and Open-to-Buy Model", text: "Monthly phasing and scenario comparison." },
      { label: "BI", title: "Power BI Range Monitoring Report", text: "Weekly sell-through and size integrity." },
    ],
    serviceKey: "assortment-planning",
    serviceTitle: "Related Service: Assortment Planning and Merchandise Planning Consulting",
    serviceText:
      "Range architecture, size and colour curves, a merchandise plan and in-season monitoring, adapted to your categories and markets.",
    serviceChips: ["range architecture", "size curves", "open-to-buy"],
    note: "Fewer options, more depth — the hardest conversation was the first one.",
    faqTitle: "Womenswear Range Plan Rebuild Case Study FAQ",
    faq: [
      {
        question: "How long did the womenswear range plan project take?",
        answer:
          "The project took eight weeks, from the range architecture review to the new buy plan and open-to-buy model. Weekly monitoring in Power BI then continued through the season.",
      },
      {
        question: "Which data was needed for the womenswear range plan?",
        answer:
          "Sales, stock, returns and receipts by option and size, with sell-through and margin history by category and price tier. Stock-out weeks and promotions had to be identifiable so they could be removed before the size and colour curves were recalculated.",
      },
      {
        question: "What changed for the team after the range plan rebuild?",
        answer:
          "Buying now works from a narrower range with more depth in proven options and a monthly open-to-buy plan. Buying and finance look at the same sell-through figure in a weekly Power BI report, which also flags broken size runs.",
      },
    ],
    publishedAt: "2026-05-01",
    seo: {
      title: "Womenswear Range Plan Rebuild: Assortment Case Study",
      description:
        "Assortment planning case study: range architecture review, recalculated size curves and a new open-to-buy plan for a womenswear distributor.",
    },
  },
  {
    key: "price-ladder-margin-report",
    slug: "price-ladder-margin-report",
    topics: ["pricing", "reporting"],
    tag: "Pricing · Reporting",
    title: "Building a Price Architecture and Margin Report for a Fashion E-commerce Retailer",
    h1: { before: "Building a Price Architecture and Margin Report for a", accent: "Fashion E-commerce Retailer" },
    summary:
      "Clear entry, core and top price points per category, one set of pricing rules for all markets and a weekly margin report.",
    intro:
      "A fashion e-commerce retailer set prices market by market and saw margin only at month end. A price architecture audit, cross-market pricing rules and a weekly Power BI margin report let the team correct prices and promotions before margin was lost.",
    cardMetrics: ["+2.4 pp margin", "3 markets"],
    dashboard: "blocks",
    breadcrumb: "Price architecture",
    facts: [
      { label: "Business", value: "fashion e-commerce retailer" },
      { label: "Markets", value: "3" },
      { label: "Duration", value: "6 weeks" },
      { label: "Role", value: "pricing analyst" },
    ],
    factsNote: "Anonymised client · placeholder figures",
    challengeTitle: "Retail Price Architecture Challenge in Fashion E-commerce",
    challenge: [
      "Prices were set separately for each market, with different rounding and currency logic, and the price architecture had gaps that sent customers to competitors.",
      "Margin was reviewed only at month end, too late to correct a promotion that was already running.",
    ],
    challengePoints: [
      "Overlapping price points in core categories",
      "Inconsistent prices for the same product between markets",
      "No weekly view of margin and discount depth",
    ],
    actionsTitle: "What Was Done to Build the Price Architecture and Margin Report",
    actions: [
      { label: "01", title: "Price Architecture Audit by Category", text: "Entry, core and top price points mapped against sales mix and margin." },
      { label: "02", title: "Cross-Market Pricing Rules", text: "Reference market, conversion, rounding and allowed deviations agreed once." },
      { label: "03", title: "Weekly Margin Report in Power BI", text: "Price, discount and margin by category and market, refreshed every Monday." },
    ],
    resultsTitle: "Price Architecture and Margin Report Results in Numbers",
    results: [
      { value: "+2.4", unit: "pp", label: "gross margin" },
      { value: "3", label: "markets on one set of pricing rules" },
      { value: "1", label: "weekly margin report for all markets" },
    ],
    toolsTitle: "Tools Used in the Price Architecture Project",
    tools: [
      { label: "fx", title: "Excel Price and Margin Scenario Model", text: "Price ladders, conversions and margin what-ifs." },
      { label: "BI", title: "Power BI Weekly Margin Report", text: "Margin and discount depth by category and market." },
    ],
    serviceKey: "retail-pricing-analysis",
    serviceTitle: "Related Service: Retail Pricing Analysis and Price Architecture",
    serviceText:
      "Price architecture audit, cross-market price alignment and markdown scenarios for your categories and markets.",
    serviceChips: ["price architecture", "margin", "markdown"],
    note: "A gap in the price ladder is a price someone else sets for you.",
    faqTitle: "Price Architecture and Margin Report Case Study FAQ",
    faq: [
      {
        question: "How long did the price architecture and margin report project take?",
        answer:
          "The project took six weeks. It started with the price architecture audit by category, continued with the cross-market pricing rules and ended with the weekly margin report in Power BI.",
      },
      {
        question: "Which data was needed for the pricing project?",
        answer:
          "Current prices for every market, sales mix and margin by category, discount and promotion history, and the currency conversion and rounding used in each market. Product costs were needed to calculate margin at every price point.",
      },
      {
        question: "What changed for the team after the pricing project?",
        answer:
          "All markets are now priced from one agreed set of rules instead of market by market. Margin and discount depth are visible every Monday, so the team can correct a price or a promotion while it is still running rather than at month end.",
      },
    ],
    publishedAt: "2026-04-01",
    seo: {
      title: "Price Architecture and Margin Report: Pricing Case Study",
      description:
        "Pricing case study: price architecture audit, cross-market pricing rules and a weekly Power BI margin report for a fashion e-commerce retailer.",
    },
  },
  {
    key: "weekly-retail-trade-report",
    slug: "weekly-retail-trade-report",
    topics: ["reporting"],
    tag: "Reporting · Power BI",
    title: "Setting Up a Weekly Retail Trading Report in Power BI for a Multi-Brand Retailer",
    h1: { before: "Setting Up a Weekly Retail Trading Report in Power BI for a", accent: "Multi-Brand Retailer" },
    summary:
      "One set of agreed KPI definitions and one Monday trading report in Power BI instead of four competing spreadsheets.",
    intro:
      "A multi-brand retailer had four teams producing four weekly spreadsheets with different KPI definitions. One agreed definition sheet, a weekly retail trading report in Power BI and a reporting calendar with named owners replaced them.",
    cardMetrics: ["40 h/month saved", "4 → 1 report"],
    dashboard: "bars",
    breadcrumb: "Weekly trading report",
    facts: [
      { label: "Business", value: "multi-brand retailer" },
      { label: "Audience", value: "buying, planning, finance" },
      { label: "Duration", value: "5 weeks" },
      { label: "Role", value: "analytics lead" },
    ],
    factsNote: "Anonymised client · placeholder figures",
    challengeTitle: "Weekly Retail Trading Report Challenge at the Multi-Brand Retailer",
    challenge: [
      "Buying, planning, finance and e-commerce each produced their own weekly spreadsheet, with a different definition of sell-through, margin and stock.",
      "Every Monday meeting started with reconciling the numbers, and preparing the files took about two days of manual work each week.",
    ],
    challengePoints: [
      "Four competing weekly reports",
      "No written KPI definitions",
      "Two days of manual preparation every week",
    ],
    actionsTitle: "What Was Done to Set Up the Weekly Retail Trading Report",
    actions: [
      { label: "01", title: "Retail KPI Definitions Agreed by All Teams", text: "One definition sheet with formulas, sources and owners, signed off by every team." },
      { label: "02", title: "Weekly Trading Report Built in Power BI", text: "Pages that follow the Monday meeting agenda, from total sales to SKU detail." },
      { label: "03", title: "Reporting Calendar and Report Owners", text: "Who prepares, checks and presents each part of the report, and when." },
    ],
    resultsTitle: "Weekly Retail Trading Report Results in Numbers",
    results: [
      { value: "40", unit: "h", label: "saved per month" },
      { value: "4 → 1", label: "weekly report" },
      { value: "100", unit: "%", label: "KPIs with an owner" },
    ],
    toolsTitle: "Tools Used in the Weekly Trading Report Project",
    tools: [
      { label: "BI", title: "Power BI Weekly Trading Report", text: "Weekly refresh and views by brand and market." },
      { label: "fx", title: "Excel KPI Definition Sheet", text: "Formulas, sources and owners in one place." },
    ],
    serviceKey: "retail-analytics-processes",
    serviceTitle: "Related Service: Setting Up Retail Reporting Processes and Analytics Teams",
    serviceText:
      "A reporting calendar, report owners and KPI definitions, so numbers are agreed once and reused in every meeting.",
    serviceChips: ["reporting calendar", "report owners", "KPI definitions"],
    note: "The report got simpler once everyone agreed what it was for.",
    faqTitle: "Weekly Retail Trading Report in Power BI Case Study FAQ",
    faq: [
      {
        question: "How long did the weekly retail trading report project take?",
        answer:
          "The project took five weeks. Agreeing the KPI definitions with buying, planning, finance and e-commerce came first; the Power BI report and the reporting calendar were built on top of them.",
      },
      {
        question: "Which data was needed for the weekly trading report?",
        answer:
          "Weekly sales, stock, receipts and margin by brand and market, plus the four existing spreadsheets, which showed how each team calculated its figures. Those spreadsheets were the starting point for the shared definition sheet.",
      },
      {
        question: "What changed for the team after the Power BI trading report?",
        answer:
          "The Monday meeting now uses one report with agreed definitions instead of four competing spreadsheets. Every KPI has an owner, and a reporting calendar says who prepares, checks and presents each part.",
      },
    ],
    publishedAt: "2026-03-01",
    seo: {
      title: "Weekly Retail Trading Report in Power BI: Case Study",
      description:
        "Power BI case study: agreed KPI definitions and one weekly retail trading report that replaced four competing spreadsheets.",
    },
  },
  {
    key: "menswear-size-curve-rebuild",
    slug: "menswear-size-curve-rebuild",
    topics: ["assortment"],
    tag: "Assortment · Size curves",
    title: "Rebuilding Size Curves for a Menswear Brand After Two Seasons of Stock-Outs",
    h1: { before: "Rebuilding Size Curves for a Menswear Brand After", accent: "Two Seasons of Stock-Outs" },
    summary:
      "Stock-outs and returns were removed from the sales history before the size curves were recalculated by market.",
    intro:
      "After two seasons of stock-outs, a menswear brand’s size curves showed its best-selling sizes as unpopular. Size curve analysis on cleaned sales history, with stock-out weeks and returns removed, produced new curves by category, fit and market.",
    cardMetrics: ["−27% broken sizes", "+9 pp full-price"],
    dashboard: "trend",
    breadcrumb: "Menswear size curves",
    facts: [
      { label: "Business", value: "menswear brand" },
      { label: "Duration", value: "4 weeks" },
      { label: "Role", value: "assortment analyst" },
    ],
    factsNote: "Anonymised client · placeholder figures",
    challengeTitle: "Menswear Size Curve Challenge After Repeated Stock-Outs",
    challenge: [
      "Two seasons of stock-outs had taught the size curves the wrong lesson: sizes that sold out early looked unpopular in the data, so they were bought even thinner next time.",
      "Returns were counted as sales, and one curve was used for every market regardless of local fit preferences.",
    ],
    challengePoints: [
      "Stock-outs recorded as low demand",
      "Returns counted as sales",
      "One size curve for all markets",
    ],
    actionsTitle: "What Was Done to Rebuild the Menswear Size Curves",
    actions: [
      { label: "01", title: "Menswear Sales History Cleaned of Stock-Outs and Returns", text: "Weeks with broken size runs and returned units removed before any calculation." },
      { label: "02", title: "Size Curves Recalculated by Market, Category and Fit", text: "Size ratios calculated separately where demand really differs." },
      { label: "03", title: "Weekly Size Integrity Monitoring", text: "A Power BI view that flags broken size runs while there is still time to react." },
    ],
    resultsTitle: "Menswear Size Curve Results in Numbers",
    results: [
      { value: "−27", unit: "%", label: "broken size runs" },
      { value: "+9", unit: "pp", label: "full-price share" },
    ],
    toolsTitle: "Tools Used in the Menswear Size Curve Project",
    tools: [
      { label: "fx", title: "Excel Size Curve Model", text: "Cleaned history and size ratios by market." },
      { label: "BI", title: "Power BI Size Integrity View", text: "Weekly monitoring of broken size runs." },
    ],
    serviceKey: "assortment-planning",
    serviceTitle: "Related Service: Assortment Planning and Merchandise Planning Consulting",
    serviceText:
      "Size and colour curves calculated from cleaned sales history, by category and market, as part of the assortment plan.",
    serviceChips: ["size curves", "stock-outs", "returns"],
    note: "A sold-out size is not an unpopular size.",
    faqTitle: "Menswear Size Curve Analysis Case Study FAQ",
    faq: [
      {
        question: "How long did the menswear size curve project take?",
        answer:
          "The project took four weeks. Cleaning the sales history took the most care; recalculating the curves and setting up the weekly size integrity view followed.",
      },
      {
        question: "Which data was needed for the size curve analysis?",
        answer:
          "Two seasons of sales, stock and returns by size, week and market, with category and fit for every product. Weekly stock by size was essential, because it showed which weeks had broken size runs and had to be removed from the history.",
      },
      {
        question: "What changed for the team after the size curve rebuild?",
        answer:
          "Buyers now work from size curves by market, category and fit, calculated on cleaned sales rather than on history distorted by stock-outs and returns. A weekly Power BI view flags broken size runs while there is still time to react.",
      },
    ],
    publishedAt: "2026-02-01",
    seo: {
      title: "Menswear Size Curve Analysis After Stock-Outs: Case Study",
      description:
        "Size curve analysis case study: stock-outs and returns removed from sales history before size curves were rebuilt for a menswear brand.",
    },
  },
  {
    key: "ecommerce-catalogue-attribute-cleaning",
    slug: "ecommerce-catalogue-attribute-cleaning",
    topics: ["product-data"],
    tag: "Product data · E-commerce",
    title: "Cleaning Product Data for a Fashion E-commerce Catalogue Migration",
    h1: { before: "Cleaning Product Data for a Fashion", accent: "E-commerce Catalogue Migration" },
    summary:
      "Attribute mapping and validation rules agreed before the migration, so the new site’s filters worked from day one.",
    intro:
      "A fashion e-commerce retailer moving to a new platform needed structured product attributes for its filters, while the old catalogue held most of them as free text. Product data cleansing with agreed attribute mapping and validation rules made the catalogue ready before go-live.",
    cardMetrics: ["99% mapped", "0 blocked SKUs"],
    dashboard: "blocks",
    breadcrumb: "Catalogue product data",
    facts: [
      { label: "Business", value: "fashion e-commerce retailer" },
      { label: "Duration", value: "5 weeks" },
      { label: "Role", value: "product data analyst" },
    ],
    factsNote: "Anonymised client · placeholder figures",
    challengeTitle: "Product Data Challenge Before the E-commerce Catalogue Migration",
    challenge: [
      "The new e-commerce platform needed structured values for colour, material, fit and category to build its filters. In the old catalogue most of these were free text, written differently by different people.",
      "The migration date was fixed, so the data had to be cleaned in weeks, not months.",
    ],
    challengePoints: [
      "Free-text colours and materials",
      "Products with missing categories",
      "A fixed migration deadline",
    ],
    actionsTitle: "What Was Done to Clean the Catalogue Product Data Before Migration",
    actions: [
      { label: "01", title: "Attribute Mapping from the Old to the New Catalogue", text: "Every old value mapped to the new attribute structure." },
      { label: "02", title: "Validation Rules Before Catalogue Import", text: "Blocking checks that stopped incomplete products before import." },
      { label: "03", title: "Exception List for Manual Product Data Review", text: "The remaining cases, each with an owner and a status." },
    ],
    resultsTitle: "Catalogue Product Data Cleansing Results in Numbers",
    results: [
      { value: "99", unit: "%", label: "attributes mapped" },
      { value: "0", label: "SKUs blocked at go-live" },
    ],
    toolsTitle: "Tools Used in the Catalogue Product Data Project",
    tools: [
      { label: "PQ", title: "Power Query Attribute Mapping", text: "Repeatable remapping of attribute values." },
      { label: "fx", title: "Excel Exception Lists", text: "Owner and status for every open case." },
    ],
    serviceKey: "product-data-quality-plm",
    serviceTitle: "Related Service: Product Data Quality and PLM Standardisation",
    serviceText:
      "Attribute dictionaries, mapping and validation rules for product data in PLM and e-commerce systems.",
    serviceChips: ["attribute mapping", "validation rules", "e-commerce data"],
    note: "Filters only work if the data under them agrees.",
    faqTitle: "Catalogue Product Data Cleansing Case Study FAQ",
    faq: [
      {
        question: "How long did the catalogue product data cleansing project take?",
        answer:
          "The project took five weeks, fitted around a fixed migration date. Attribute mapping came first, then the validation rules, and the remaining cases were handled through an exception list.",
      },
      {
        question: "Which data was needed for the catalogue migration?",
        answer:
          "A full export of the old catalogue, including free-text colours, materials, fits and categories, and the attribute structure required by the new e-commerce platform. The platform’s filter requirements defined which fields had to be complete.",
      },
      {
        question: "What changed for the team after the product data cleansing?",
        answer:
          "The team moved to the new platform with structured attributes, so the site filters worked from day one. Validation rules now stop incomplete products before import, and open cases are tracked with an owner and a status.",
      },
    ],
    publishedAt: "2026-01-01",
    seo: {
      title: "Product Data Cleansing for a Fashion Catalogue Migration",
      description:
        "Product data cleansing case study: attribute mapping and validation rules agreed before a fashion e-commerce catalogue migration.",
    },
  },
];
