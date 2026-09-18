import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("range-planning", "en"),
  title: "How to Build a Range Plan in Fashion Retail",
  h1: { before: "How to Build a", accent: "Range Plan in Fashion Retail" },
  excerpt: "What a fashion range plan contains, the steps from brief to buy, and how options, depth and price tiers fit into one range plan template.",
  lead: "A range plan is the document that turns a season’s sales and margin targets into a concrete list of options per category, with their price points, buy depth and delivery dates. It is built by merchandise planners and buyers together, starting from last season’s performance and the design brief, and it is fixed before the buy is placed.",
  date: "2026-06-05",
  readingMinutes: 6,
  body: [
    {
      type: "p",
      text: "Every buying team I have worked with had a range plan. Far fewer had one that everybody trusted. The usual problem is not the spreadsheet itself but the order of work: styles get chosen first and the numbers are fitted around them afterwards. Below is the sequence I use, the architecture behind a balanced range and the template structure that keeps it readable for buyers, designers and finance.",
    },
    { type: "h2", id: "what-range-plan-is", text: "What a Range Plan Is in Fashion" },
    {
      type: "p",
      text: "In fashion, a range plan is a structured list of every option the brand intends to sell in a season. An option is one style in one colour. Each row carries the category, price point, cost, intended margin, planned units, size range and delivery drop. Put together, the rows describe the whole collection in commercial terms.",
    },
    {
      type: "p",
      text: "The range plan sits between two other plans. Above it is the merchandise financial plan, which sets sales, margin and stock targets per category and month. Next to it is the design collection, with its themes, fabrics and silhouettes. Range planning in merchandising is the job of making those two meet: enough options, at the right prices, in the right depth, to reach the numbers without buying stock that will end up in the sale.",
    },
    {
      type: "p",
      text: "Ownership is shared, and it helps to say who owns what. In most teams I have seen, the merchandiser or planner owns the numbers, the buyer owns the product choices and the designer owns the look. The range plan is the one document all three work in.",
    },
    { type: "h2", id: "range-planning-steps", text: "Range Planning Steps from Brief to Buy" },
    {
      type: "p",
      text: "The range planning process runs over several weeks and a few formal reviews, but the logic is always the same: numbers first, then slots, then styles.",
    },
    {
      type: "list",
      items: [
        "Review last season. Sales, sell-through and gross margin by category and price tier, plus the list of best and worst options. Decide what carries over, what is repeated in a new colour and what is dropped.",
        "Take the targets from the merchandise financial plan: sales at full price, margin and closing stock per category, and the open-to-buy that goes with them.",
        "Turn the sales target into an option count per category, using what an average option sold last season.",
        "Split the options into slots: core and fashion, and entry, core and top price tiers. At this point the slots are empty.",
        "Design and buying fill the slots with styles, colours and fabrics from the design brief.",
        "Cost and price every option, check the margin, and set depth and size curve per option.",
        "Hold the range review, compare totals with the targets, fix gaps and duplicates, then sign off and place the orders.",
      ],
    },
    {
      type: "p",
      text: "Step three is where most of the discipline comes from. The option count is a simple division, and it stops a category from growing just because designers had many good ideas.",
    },
    { type: "formula", text: "options needed = category sales target ÷ planned sales per option" },
    {
      type: "p",
      text: "For example, knitwear has a full-price sales target of 800k. Last season an average knitwear option sold about 18k at full price. That gives roughly 44 options. If the design team presents 70, the conversation is about which 26 to cut, not about raising the target to fit them.",
    },
    { type: "h2", id: "range-architecture", text: "Range Architecture: Options, Depth and Price Tiers" },
    {
      type: "p",
      text: "Range architecture is the shape of the range: how many options sit in each category, how deep each one is bought and how they spread across price tiers. I agree it at category level before a single style is named, because once real products are on the table everyone argues about the products instead of the shape.",
    },
    {
      type: "table",
      caption: "Illustrative data · knitwear range architecture, full-price values",
      columns: [
        { label: "Price tier", kind: "text" },
        { label: "Price point", kind: "number" },
        { label: "Options", kind: "number" },
        { label: "Units per option", kind: "number" },
        { label: "Planned units", kind: "number", format: "bars" },
        { label: "Planned sales (k)", kind: "number", format: "bars" },
      ],
      rows: [
        { cells: ["Entry", 29, 12, 600, 7200, 209] },
        { cells: ["Core", 49, 22, 400, 8800, 431] },
        { cells: ["Top", 79, 10, 200, 2000, 158] },
      ],
    },
    {
      type: "p",
      text: "Together the three tiers give 44 options, 18,000 units and about 798k of full-price sales, which matches the knitwear target from the example above. If the totals do not reach the target, the fix is in the shape of the range, not in a more optimistic sales rate per option.",
    },
    {
      type: "p",
      text: "Three decisions sit inside a table like this. The first is breadth against depth. Many options bought shallow give choice but break into missing sizes quickly; few options bought deep look strong on the shop floor but carry more risk if a style misses. Entry options are usually fewer and deeper, top options more varied and shallower.",
    },
    {
      type: "p",
      text: "The second is the core and fashion split. Core options, such as a crew-neck jumper in five colours, repeat every season and can be bought with confidence from history. Fashion options follow the trend story and are harder to forecast, so I plan them shallower and keep some budget open for repeats.",
    },
    {
      type: "p",
      text: "The third is the spread across price tiers. The core tier normally carries most of the sales. If the entry or top tier holds more options than its sales share justifies, the range is overbuilt there. I cover how to read this in more detail in my article on retail price architecture.",
    },
    { type: "h2", id: "range-plan-template", text: "Range Plan Template Structure" },
    {
      type: "p",
      text: "A fashion range plan template does not need special software. Excel works well as long as the structure is fixed, every value in a coded column comes from a list, and totals are calculated rather than typed. The columns I use as a minimum are:",
    },
    {
      type: "list",
      items: [
        "Identity: season, department, category, subcategory, style code, option name, colour.",
        "Commercial: price tier, retail price, cost, margin (calculated), core or fashion flag.",
        "Quantity: planned units, size range, size curve reference.",
        "Timing: delivery drop or month, and first on-sale week.",
        "Control: status (proposed, confirmed, dropped), supplier, last change date and who changed it.",
      ],
    },
    {
      type: "p",
      text: "Below the option rows, or on a separate sheet, sits a summary per category and price tier that compares the plan with the targets. The formulas are ordinary SUMIFS and COUNTIFS, filtered on status so that dropped options stop counting at once.",
    },
    {
      type: "code",
      code: "' Plan = option table; A2 = category, B2 = price tier\n' Confirmed options in the slot\n=COUNTIFS(Plan[Category], A2, Plan[Tier], B2, Plan[Status], \"confirmed\")\n\n' Planned full-price sales in the slot\n=SUMIFS(Plan[PlannedSales], Plan[Category], A2, Plan[Tier], B2, Plan[Status], \"confirmed\")\n\n' Gap to the category target from the financial plan\n=SUMIFS(Plan[PlannedSales], Plan[Category], A2, Plan[Status], \"confirmed\") - XLOOKUP(A2, Targets[Category], Targets[Sales])",
      caption: "Excel formulas for the range plan summary. Table and column names are examples.",
    },
    {
      type: "p",
      text: "Two habits keep the template alive for the whole season. First, style codes in the range plan should be the same codes the product will have in PLM, so the plan can later be matched with actual sales without a mapping table. Second, save a dated copy at each review. When someone asks in week 10 why knitwear has 52 options instead of 44, the history answers it.",
    },
    { type: "h2", id: "range-vs-assortment-planning", text: "Range Planning vs Assortment Planning" },
    {
      type: "p",
      text: "The two terms are often used as synonyms, and in small companies one person does both. They answer different questions, though. Range planning decides what the brand offers in a season: the options, their prices and total depth. Assortment planning decides where that range goes: which stores, clusters, markets or online channels get which options, and in what quantities.",
    },
    {
      type: "list",
      items: [
        "Range planning: output is the list of options with total units; time is before the buy; the main input is the financial plan and last season’s results.",
        "Assortment planning: output is options and units per store cluster or channel; time is after the range is fixed and before allocation; the main input is store grades, space and local sales history.",
      ],
    },
    {
      type: "p",
      text: "The order matters. If assortment decisions are made while the range is still moving, store plans have to be redone after every range review. I cover the next stage in my article on the assortment planning process, and the budget side in the article on open-to-buy.",
    },
    {
      type: "p",
      text: "If your range plan today is a collection of files per buyer that nobody can add up, the first improvement is usually not a new system. It is one agreed template, a fixed set of lists and a summary that compares the plan with the targets every time someone changes a row.",
    },
  ],
  faqTitle: "Range Planning in Fashion: Common Questions",
  faq: [
    {
      question: "What is a range plan in fashion?",
      answer:
        "A range plan is a structured list of every option a brand intends to sell in a season, grouped by category and usually shown with price points, fabrics, colours, delivery drops and planned units. It connects the financial plan with the design collection. Buyers, designers and planners use it to check that the range is balanced before anything is ordered.",
    },
    {
      question: "What is range architecture?",
      answer:
        "Range architecture is the shape of a range: how many options sit in each category, how deep each option is bought and how they spread across entry, core and top price tiers. A clear architecture stops a range from being overloaded with similar styles at one price. It is usually agreed at category level before individual styles are chosen.",
    },
    {
      question: "What should a range plan template include?",
      answer:
        "At minimum: category and subcategory, option name or style code, colour, price tier and retail price, cost and intended margin, planned units, size range, delivery month and status. Summary rows per category should compare planned sales and option counts with the targets from the merchandise financial plan. Excel works well as long as the structure is fixed and totals are formula-driven.",
    },
    {
      question: "What is the difference between range planning and assortment planning?",
      answer:
        "Range planning decides what the brand will offer in a season: the options, prices and depth. Assortment planning decides where those options go: which stores, clusters or markets get which part of the range and in what quantities. In smaller companies the two are done by the same person, but they answer different questions.",
    },
  ],
  seo: {
    title: "How to Build a Range Plan in Fashion Retail",
    description: "What a range plan is in fashion, range planning steps from brief to buy, range architecture by options, depth and price tiers, and a template.",
  },
};
