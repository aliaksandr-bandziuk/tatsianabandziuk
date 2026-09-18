import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("product-attributes", "en"),
  title: "Product Attribute Standards for Fashion PLM That Work Across Markets",
  h1: { before: "Product Attribute Standards for Fashion PLM", accent: "That Work Across Markets" },
  excerpt: "Which product attributes a fashion brand needs in PLM, and how a shared dictionary keeps colour, season and composition consistent in every market.",
  lead: "Product attributes are the defined characteristics of a product, such as category, colour, season, fit and composition, and in a fashion PLM they only work when every value comes from one shared dictionary with clear rules. A good attribute standard lets every market filter, report and publish the same product in the same way without manual clean-up.",
  date: "2026-06-12",
  readingMinutes: 6,
  body: [
    {
      type: "p",
      text: "When a sales report shows “Navy”, “navy”, “Dark blue” and “Marine” as four separate colours, the problem did not start in the report. It started in the product data, when four people typed a colour into a free-text field. Most of the reporting clean-up I have done in fashion traces back to product attributes that were never standardised. This article covers which attributes a fashion brand needs, how to structure the dictionary behind them and the rules that keep colour, season and composition consistent across markets.",
    },
    { type: "h2", id: "attributes-in-plm", text: "Which Product Attributes a Fashion Brand Needs in PLM" },
    {
      type: "p",
      text: "Product attributes are the characteristics that describe a product and let people and systems tell products apart. Some are tangible, such as fabric or length; some are intangible, such as price tier or lifecycle status. In a PLM they are stored as structured fields with allowed values. I find it most useful to split them into four types, because each type has a different owner and must be complete at a different moment:",
    },
    {
      type: "list",
      items: [
        "Technical attributes: materials, weight, measurements, construction details. Owned by product development; needed before the sample is approved.",
        "Descriptive attributes: colour family and colour name, fit, length, neckline, sleeve type, pattern. Owned by design and buying; needed before the range is fixed.",
        "Commercial attributes: department, category, subcategory, season and drop, price tier, core or fashion status, channel, launch date. Owned by buying and merchandising; needed before the buy.",
        "Legal attributes: fibre composition, care instructions, country of origin, sustainability claims. Owned by quality or compliance; needed before labels are printed.",
      ],
    },
    {
      type: "p",
      text: "Commercial attributes are the ones most often forgotten in PLM projects, because PLM is seen as a design tool. Yet they are exactly what planners and analysts filter on. If price tier or core status lives only in a buyer’s spreadsheet, every report has to rebuild it by hand.",
    },
    { type: "h2", id: "dictionary-structure", text: "Product Attribute Dictionary Structure" },
    {
      type: "p",
      text: "The attribute dictionary is the single list of every attribute and every value it may take. Product attribute management is mostly the work of keeping this list correct. For each attribute, the dictionary should record:",
    },
    {
      type: "list",
      items: [
        "A code and a name, plus a one-sentence definition that answers “what counts as this?”.",
        "The data type: value from a list, number with a unit, date or yes/no. Free text only for real descriptions, never for anything people filter on.",
        "The allowed values, each with its own code, translations per language and an active or retired status.",
        "Whether one or several values are allowed, and at which stage gate the attribute becomes mandatory.",
        "The owner who approves new values, and the mapping to each channel, such as the online shop or a marketplace.",
      ],
    },
    {
      type: "table",
      caption: "Example rows from an attribute dictionary",
      columns: [
        { label: "Attribute", kind: "text" },
        { label: "Type", kind: "text" },
        { label: "Values", kind: "text" },
        { label: "Mandatory at", kind: "text" },
        { label: "Owner", kind: "text" },
      ],
      rows: [
        { cells: ["Colour family", "List, single", "about 15 values", "Range sign-off", "Product data"] },
        { cells: ["Fit", "List, single", "slim, regular, relaxed, oversized", "Range sign-off", "Design"] },
        { cells: ["Price tier", "List, single", "entry, core, top", "Buy", "Merchandising"] },
        { cells: ["Composition", "Structured rows", "fibre + % per component", "Label order", "Quality"] },
        { cells: ["Season", "Code", "SS27, AW27…", "Style creation", "Product data"] },
      ],
    },
    {
      type: "p",
      text: "Codes, not names, go into the systems. Names can then be corrected or translated without breaking any report, because the history is stored against the code.",
    },
    { type: "h2", id: "colour-rules", text: "Colour Attribute Rules in a PLM Dictionary" },
    {
      type: "p",
      text: "Colour is the attribute that breaks first, because everyone has an opinion about it. I separate it into three fields with different jobs:",
    },
    {
      type: "list",
      items: [
        "Colour family: a short, stable list, around fifteen values such as black, white, blue, green or red. This is what customers filter on and what reports group by.",
        "Colour name: the commercial name the customer sees, such as “ink blue” or “sage”, chosen from a controlled list that the owner extends on request.",
        "Colour code: the precise shade reference agreed with suppliers, used by product development and quality.",
      ],
    },
    {
      type: "p",
      text: "Every colour name belongs to exactly one family, so a new commercial name never creates a new filter value. Multicolour and print need their own rule, for example the family of the dominant colour plus a pattern attribute. And the colour never goes into the style description as well, because then two fields disagree sooner or later.",
    },
    { type: "h2", id: "season-code-rules", text: "Season Code Rules Across Markets" },
    {
      type: "p",
      text: "A season code looks simple until the same product sells at different times in different markets. My rule is to keep one global season code, the season the product was designed and bought for, in a fixed format such as SS27 or AW27. Everything else is a separate attribute:",
    },
    {
      type: "list",
      items: [
        "Drop or delivery window within the season, as its own list.",
        "Launch date per market, because one market may start selling weeks after another.",
        "Carry-over: the first season stays unchanged, and the seasons in which the style is active are stored as a list, rather than creating a new code each time.",
      ],
    },
    {
      type: "p",
      text: "If markets overwrite the season code to match their own calendar, the same style appears as new in one report and as carry-over in another, and sell-through by season stops being comparable.",
    },
    { type: "h2", id: "composition-fields", text: "Composition Fields Without Free Text" },
    {
      type: "p",
      text: "Composition is a legal attribute, so errors are costly. In the EU, fibre names on labels must follow the textile labelling regulation, and each language has its own wording. Free text such as “95% cotton 5% elastane” cannot be translated or checked reliably. I store composition as rows instead: component, fibre from the dictionary and a percentage.",
    },
    {
      type: "code",
      code: "Style     Component  Fibre      %\nS27-1042  Shell      Cotton     95\nS27-1042  Shell      Elastane    5\nS27-1042  Lining     Polyester 100\n\n' Check in Excel: each component must add up to 100\n=SUMIFS(Comp[Percent], Comp[Style], A2, Comp[Component], B2) = 100",
      caption: "Composition stored as structured rows, with a completeness check. Codes are examples.",
    },
    {
      type: "p",
      text: "The label text in every language is then generated from these rows. The same data feeds the online product page, sustainability reporting and any analysis of fibre mix, without anyone retyping it.",
    },
    { type: "h2", id: "agree-attribute-standards", text: "How to Agree Product Attribute Standards with Markets" },
    {
      type: "p",
      text: "The technical part is the easy half. The harder half is getting markets and departments to stop creating their own values. The approach that has worked best for me:",
    },
    {
      type: "list",
      items: [
        "Start with evidence: pull every distinct value of an attribute from all systems and count how many products use each. A list of 60 colour spellings convinces people faster than a presentation.",
        "Propose target values and a mapping from every old value to a new one, then review it with each market in a short workshop.",
        "Name one owner for the dictionary, usually product data or product operations, with a simple request process and a promised response time.",
        "Make attributes mandatory at stage gates in PLM, so incomplete products cannot move to the next step.",
        "Publish a data quality report: completeness per attribute, season and market. What is measured every week gets fixed.",
      ],
    },
    {
      type: "p",
      text: "For the report, I use a simple completeness measure in Power BI and show it as a matrix of attributes against seasons.",
    },
    {
      type: "code",
      code: "Attribute Completeness % :=\nDIVIDE (\n    CALCULATE ( COUNTROWS ( ProductAttributes ), NOT ISBLANK ( ProductAttributes[ValueCode] ) ),\n    COUNTROWS ( ProductAttributes )\n)",
      caption: "DAX measure for attribute completeness. Table and column names are examples.",
    },
    {
      type: "p",
      text: "An attribute standard is never finished; new categories and channels will keep asking for values. But once the dictionary has an owner and the gates are in place, the clean-up stops being a project and becomes a routine. The difference between PLM and PIM, and where each attribute should live, is the subject of a separate article on this blog.",
    },
  ],
  faqTitle: "Product Attributes in Fashion: Common Questions",
  faq: [
    {
      question: "What are product attributes?",
      answer:
        "Product attributes are the characteristics that describe a product and let people and systems tell products apart, such as category, colour, size, material, fit or price tier. In a PLM or PIM they are stored as structured fields with allowed values. Consistent attributes make filtering, reporting and online search reliable.",
    },
    {
      question: "What are examples of product attributes in fashion?",
      answer:
        "Typical fashion attributes include department, category and subcategory, season and drop, colour family and colour name, size range, fit, length, neckline, sleeve type, fabric composition, care instructions, country of origin and sustainability claims. Commercial attributes such as price tier, core or fashion status and launch date are just as important for planning and reporting.",
    },
    {
      question: "What are the different types of product attributes?",
      answer:
        "A practical split is technical attributes (materials, measurements, construction), descriptive attributes (colour, fit, style details), commercial attributes (price tier, season, channel, lifecycle status) and legal attributes (composition, origin, care labelling). Each type usually has a different owner and a different moment in the product lifecycle when it must be complete.",
    },
    {
      question: "Who should own the product attribute dictionary?",
      answer:
        "One central team, usually product data or product operations, should own the dictionary and approve every new value. Markets and departments can request additions, but they should not create values locally, or the same colour ends up with five spellings. A short change process with a named owner keeps the dictionary usable over many seasons.",
    },
  ],
  seo: {
    title: "Product Attributes in Fashion PLM: A Dictionary That Works",
    description: "Which product attributes a fashion brand needs in PLM and how to write rules for colour, season and composition that every market follows.",
  },
};
