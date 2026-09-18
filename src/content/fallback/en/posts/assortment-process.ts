import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("assortment-process", "en"),
  title: "Assortment Planning Process in Fashion Retail, Step by Step",
  h1: { before: "Assortment Planning Process in Fashion Retail,", accent: "Step by Step" },
  excerpt: "What assortment planning is, how it differs from merchandise planning and category management, and the steps of the process with an example.",
  lead: "Assortment planning is the process of deciding which products a retailer offers, in what breadth and depth, in which stores or channels and at what time, so that the range matches customer demand within the season’s budget. In fashion it runs from reviewing last season’s results through setting option counts and price tiers to allocating the range by store cluster.",
  date: "2026-05-08",
  readingMinutes: 6,
  body: [
    { type: "h2", id: "what-assortment-planning-is", text: "What Assortment Planning Is" },
    {
      type: "p",
      text: "An assortment is simply the set of products a retailer offers at a given time. A womenswear range of 40 dresses in three price tiers is an assortment; so is a basics programme of 12 T-shirt colours that runs all year. Assortment planning is the work of deciding what that set should look like before anything is bought, and then adjusting it while the season trades.",
    },
    {
      type: "p",
      text: "Every assortment plan answers the same four questions. Breadth: how many different options, meaning style and colour combinations, does each category carry? Depth: how many units of each option are bought? Price: which price tiers are covered and how many options sit in each? Placement: which stores, clusters and online channels receive which part of the range, and when?",
    },
    {
      type: "p",
      text: "These are the classic “five rights” of retailing in practical form: the right product, in the right quantity, at the right price, in the right place, at the right time. Retailers combine breadth and depth into an assortment strategy. A broad and shallow range offers many options in small quantities, typical for trend-led fashion. A narrow and deep range offers few options in large quantities, typical for basics. Most fashion brands run both at once, category by category.",
    },
    { type: "h2", id: "assortment-vs-merchandise-category", text: "Assortment Planning vs Merchandise Planning vs Category Management" },
    {
      type: "p",
      text: "The three terms are often used as synonyms, and in small teams one person may do all three. They still describe different jobs, and confusing them is how a range ends up with the right budget and the wrong products, or the other way round.",
    },
    {
      type: "list",
      items: [
        "Merchandise planning sets the financial frame: sales, margin, stock and open-to-buy by month and category. Its output is money, usually at retail value.",
        "Assortment planning fills that frame with products: how many options, at which prices, in what depth and for which stores. Its output is a range plan, often called a line plan or range architecture.",
        "Category management is an organisational model: each category is run as a business unit with an owner who is accountable for its range, pricing, promotion, space and results.",
      ],
    },
    {
      type: "p",
      text: "In practice, the merchandise plan says knitwear has 400k to spend this autumn. The assortment plan says that money buys 32 options across three price tiers, with the premium tier only in the largest stores. The category manager, where the role exists, owns both decisions and answers for the outcome. Category management came from grocery retail, but I see it more and more in fashion and department stores, especially where one team handles several brands.",
    },
    { type: "h2", id: "process-steps", text: "Assortment Planning Process Steps" },
    {
      type: "p",
      text: "Software vendors describe the process in five, seven or ten steps. The names differ, the sequence does not. This is the version I use with fashion brands, from the review of last season to in-season control.",
    },
    {
      type: "list",
      items: [
        "Review last season. Sales, sell-through, margin and markdown by category, price tier and attribute such as colour, fabric or fit. The question is what worked and why, not only what sold most.",
        "Take targets from the merchandise financial plan. Sales, margin and stock budgets per category and month become the constraints the range has to fit.",
        "Define the range architecture. Option counts per category, the split between newness and carry-over, price tiers and the number of options in each tier.",
        "Select products with design and buying. Styles are chosen against the architecture, not the other way round, so every option fills a planned slot.",
        "Plan depth and size curves. Buy quantities per option follow from planned sales and target sell-through; sizes follow the category’s size curve.",
        "Allocate by store cluster and channel. Stores are grouped by size, climate or customer, and each cluster gets the part of the range it can sell.",
        "Track and adjust in season. Weekly sell-through and stock cover drive reorders, transfers between stores and markdowns.",
      ],
    },
    {
      type: "p",
      text: "The first two steps are often rushed because the design calendar is already running. They are also where most of the value is. A range built without an honest review of last season repeats last season’s mistakes with new colours.",
    },
    { type: "h2", id: "womenswear-example", text: "Assortment Plan Example for a Womenswear Category" },
    {
      type: "p",
      text: "Here is a simplified example for spring–summer dresses. The merchandise plan gives the category 570k of sales at retail value. Last season’s review showed that the core price tier sold best, the premium tier sold well in larger stores only, and the entry tier needed markdown to clear. The team plans 40 options and a full-season sell-through of 80%.",
    },
    { type: "formula", text: "buy units = planned sales units ÷ planned sell-through" },
    { type: "formula", text: "depth per option = buy units ÷ number of options" },
    {
      type: "table",
      caption: "Illustrative data · spring–summer dresses, planned sales at 80% sell-through, thousands at retail value; the total row shows the average price",
      columns: [
        { label: "Price tier", kind: "text" },
        { label: "Price", kind: "number" },
        { label: "Options", kind: "number" },
        { label: "Units per option", kind: "number" },
        { label: "Buy units", kind: "number", format: "bars" },
        { label: "Planned sales, k", kind: "number" },
      ],
      rows: [
        { cells: ["Entry", 30, 12, 450, 5400, 129.6] },
        { cells: ["Core", 50, 20, 360, 7200, 288] },
        { cells: ["Premium", 80, 8, 300, 2400, 153.6] },
        { cells: ["Total", 48, 40, 375, 15000, 571.2] },
      ],
    },
    {
      type: "p",
      text: "The total lands within a few thousand of the 570k plan, so the architecture fits the budget. Half of the options sit in the core tier because that is where last season’s demand was. The entry tier is broad but shallower in value, and the premium tier is narrow and bought in the lowest depth per option, because only part of the store estate will carry it.",
    },
    {
      type: "p",
      text: "Placement is the last layer. In this example the stores are grouped into three clusters and online:",
    },
    {
      type: "list",
      items: [
        "Cluster A, the largest stores: all 40 options, including the full premium tier.",
        "Cluster B, mid-sized stores: about 30 options, core and entry plus the four strongest premium styles.",
        "Cluster C, small stores: about 18 options, mainly core bestsellers and a few entry-price styles.",
        "Online: the full range, plus extended sizes that stores do not carry.",
      ],
    },
    {
      type: "p",
      text: "In Excel this lives in one sheet with a row per option: tier, price, cluster flags, depth and size curve. A check cell such as =SUMPRODUCT(BuyUnits, Price) * 0.8 compared with the category budget shows at once when a change in option count breaks the plan.",
    },
    { type: "h2", id: "best-practices", text: "Assortment Planning Best Practices" },
    {
      type: "list",
      items: [
        "Plan options before styles. Fix the number of slots per category and price tier first, then fill them. Otherwise the range grows every time someone likes one more sample.",
        "Review by attribute, not only by style. Styles do not come back next season; colours, fabrics, fits and price points do, so that is where the lessons are.",
        "Keep a fixed share for newness and test options, and a fixed share for proven carry-over. The ratio differs by category, but it should be a decision, not an accident.",
        "Tie depth to sell-through targets. If depth is set by feel, the sell-through report will be bad for reasons nobody can trace back.",
        "Plan for store clusters, not for the average store. A range that suits the average store fits none of them well.",
        "Clean up product data early. Categories, price tiers and attributes must be correct in the product system from the start, or the review of this season will be as hard as the last one.",
      ],
    },
    {
      type: "p",
      text: "The last point is the one I see ignored most often. Assortment analysis is only as good as the attributes behind it; if half the dresses have no fabric or fit recorded, you cannot learn which fabrics and fits worked. For the size side of the plan, see my article on building size curves from sales data, and for the budget side, my article on open-to-buy.",
    },
  ],
  faqTitle: "Assortment Planning and Category Management: Common Questions",
  faq: [
    {
      question: "What is assortment planning?",
      answer:
        "Assortment planning is deciding the mix of products a retailer will carry: how many options per category (breadth), how many units per option (depth), which price points and which stores or channels get them. Its aim is to maximise sales and margin within the buying budget. In fashion it is repeated every season and adjusted in-season.",
    },
    {
      question: "What is category management?",
      answer:
        "Category management treats each product category as a separate business unit with its own targets, strategy and owner. The category manager is responsible for the category’s range, pricing, promotion and space, and measures results against the plan. It originated in grocery retail but is now common in fashion and department stores.",
    },
    {
      question: "What is the difference between assortment planning and merchandise planning?",
      answer:
        "Merchandise planning sets the financial frame: sales, margin, stock and open-to-buy budgets by month and category. Assortment planning works inside that frame and decides which products fill it and where they go. A merchandise plan says how much to spend on knitwear; an assortment plan says which knitwear styles, colours and sizes to buy for which stores.",
    },
    {
      question: "What are the main steps of the assortment planning process?",
      answer:
        "Review last season’s sales, sell-through and margin by category and attribute; set targets from the merchandise financial plan; define the range architecture with option counts and price tiers; select products with design and buying; plan depth and size curves; allocate by store cluster or channel; and track performance in-season to adjust replenishment and markdowns.",
    },
  ],
  seo: {
    title: "Assortment Planning Process in Fashion Retail",
    description: "What assortment planning is, how it differs from merchandise planning and category management, and the process step by step with a womenswear example.",
  },
};
