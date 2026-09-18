import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("price-architecture", "en"),
  title: "How to Build and Read a Retail Price Architecture Before the Season",
  h1: { before: "How to Build and Read a", accent: "Retail Price Architecture", after: "Before the Season" },
  excerpt: "Entry, core and top price points, good-better-best tiers and how to spot a gap in the price ladder before the buy is placed.",
  lead: "A retail price architecture is the planned set of price points in each category, typically entry, core and top, that tells customers how the range is structured and tells the business where sales and margin should come from. Reading it before the season means checking the price ladder against last season’s sales mix and margin, so gaps and overcrowded tiers are fixed before the buy.",
  date: "2026-06-26",
  readingMinutes: 7,
  body: [
    {
      type: "p",
      text: "Most pricing discussions in fashion happen one product at a time: is this jacket worth 89 or 99? Price architecture moves the question up a level. Before looking at single styles, I want to see the whole ladder of a category and check whether customers can find something at every price they are willing to pay, and whether the business earns its margin where most of the units are.",
    },
    { type: "h2", id: "price-architecture-explained", text: "Retail Price Architecture and Price Ladder Explained" },
    {
      type: "p",
      text: "Price architecture is the structure of price points a retailer uses within each category, from the lowest entry price to the highest. It fixes three things: how many price levels there are, how far apart they sit, and what difference in fabric, construction or detail justifies each step up.",
    },
    {
      type: "p",
      text: "The price ladder is the same structure seen as a list of real prices. Knitwear might sit at 29, 39, 49, 69 and 89. Each price is a rung, and the number of options and units on each rung shows where the range is concentrated. The architecture is the rule; the ladder is what the rule looks like in a given season.",
    },
    {
      type: "p",
      text: "If you search for the term, you will also meet price pack architecture. That is the consumer goods version, where pack size and price are designed together. The idea is close, but in fashion there is no pack size to play with. The levers are the number of price points, the gaps between them and the quality story behind each step.",
    },
    { type: "h2", id: "entry-core-top", text: "Entry, Core and Top Price Points per Category" },
    {
      type: "p",
      text: "I group the rungs of every category into three tiers, because each tier has a different commercial job:",
    },
    {
      type: "list",
      items: [
        "Entry price points bring customers in and anchor the perception of value. They are usually bought deeper, carry a lower margin and are the first price a customer sees in advertising.",
        "Core price points carry most of the units and most of the gross margin. This is where the brand’s typical customer buys, so it deserves the widest choice.",
        "Top price points show what the brand can do: better fabric, more detail, a stronger fashion statement. They sell fewer units, but they make the core look reasonable and give loyal customers a reason to trade up.",
      ],
    },
    {
      type: "p",
      text: "Tiers are set per category, not for the whole store. An entry dress and an entry T-shirt do not share a price. What should be shared is the logic: every category has a clear entry, a clear core and a clear top, with steps a customer can notice.",
    },
    { type: "h2", id: "good-better-best", text: "Good-Better-Best Pricing in Fashion Retail" },
    {
      type: "p",
      text: "Good-better-best pricing offers three clear versions of the same kind of product. In knitwear that might be a cotton-blend crew neck at 29, a lambswool one at 49 and a merino version at 89. The customer compares like with like, and the difference in price is explained by something they can see and touch.",
    },
    {
      type: "p",
      text: "The model works only when the steps are visible. If the 49 and the 89 jumper look the same on the hanger, customers will take the cheaper one and the top tier becomes markdown stock. My rules of thumb for fashion:",
    },
    {
      type: "list",
      items: [
        "Three to five price points per category. More than that and the steps become too small to notice.",
        "A step of roughly 20–40% between neighbouring price points, so each move up feels meaningful.",
        "One visible reason per step: fibre, weight, finishing, lining or detail. Write it down in the range brief.",
        "The good tier must still cover its costs and a sensible margin. A thin entry margin is a choice; a loss is not.",
      ],
    },
    {
      type: "p",
      text: "A related question comes up in almost every pricing workshop: do price endings such as 49.99 still work? In fashion I follow the convention of the market and keep it consistent across the range. Mixing 49, 49.90 and 49.99 in one category makes the ladder harder to read and adds nothing.",
    },
    { type: "h2", id: "price-ladder-gap", text: "What a Gap in the Retail Price Ladder Costs" },
    {
      type: "p",
      text: "A gap is a step in the ladder that is too wide for the customer. Someone ready to spend about 60 on a jumper finds 49 or 69 and nothing in between. Some trade down, some trade up, and some leave. The cost is invisible in the sales report, because lost customers do not create a row.",
    },
    {
      type: "p",
      text: "You can estimate it with an explicit assumption. Suppose last season a 59 rung sold 1,500 units, and this season it has been removed. If half of those customers trade down to 49, a third trade up to 69 and the rest buy nothing, sales on that demand fall from 88,500 to 71,250: about 17,000 lost, before any effect on margin. The split is an assumption, so I test two or three versions of it. Where a rung was removed in the past, its history is the best guide.",
    },
    { type: "formula", text: "step % = (higher price point − lower price point) ÷ lower price point × 100" },
    {
      type: "p",
      text: "The opposite problem is an overcrowded rung: twelve similar options at 49. They compete with each other, each one sells less, and the depth that would have made two of them strong is spread across twelve. Both problems are much cheaper to fix in the range plan than with markdowns in July.",
    },
    { type: "h2", id: "check-price-ladder", text: "How to Check a Price Ladder Against Sales Mix and Margin" },
    {
      type: "p",
      text: "Before the buy, I put the planned ladder next to last season’s results for the same category. The key comparison is the share of options on each rung against the share of units customers bought there.",
    },
    { type: "formula", text: "price point index = share of units sold ÷ share of options" },
    {
      type: "table",
      caption: "Illustrative data · knitwear ladder, planned options vs last season’s sales mix",
      columns: [
        { label: "Price point", kind: "number" },
        { label: "Options", kind: "number" },
        { label: "Share of options", kind: "number", suffix: "%" },
        { label: "Share of units sold", kind: "number", format: "bars", suffix: "%" },
        { label: "Index", kind: "number", format: "scale" },
        { label: "Gross margin", kind: "number", suffix: "%" },
      ],
      rows: [
        { cells: [29, 6, 17, 24, 1.41, 52] },
        { cells: [39, 5, 14, 22, 1.57, 56] },
        { cells: [49, 12, 33, 31, 0.94, 60] },
        { cells: [69, 9, 25, 13, 0.52, 62] },
        { cells: [89, 4, 11, 10, 0.91, 64] },
      ],
    },
    {
      type: "p",
      text: "As a rule of thumb, an index above about 1.2 means customers buy more on that rung than the range offers, and one below about 0.8 means the rung is overbuilt. Here the 29 and 39 rungs are underbuilt, while 69 carries a quarter of the options and only 13% of the units. The step from 49 to 69 is also about 41%, at the edge of what customers accept. I would move three options from 69 to the 29 and 39 rungs, and then decide whether the 69 rung needs a clearer quality story or should come down to 59.",
    },
    {
      type: "p",
      text: "Two details make the check honest. Count sales by original price point, so a 69 jumper sold at 49 in the sale still counts at 69. And look at margin next to units: entry rungs may sell well at a thin margin, so the mix you want depends on both.",
    },
    {
      type: "code",
      code: "' Range = planned options, Sales = last season; A2 = category, B2 = price point\n' Share of options on the rung\n=COUNTIFS(Range[Category], A2, Range[Price], B2) / COUNTIFS(Range[Category], A2)\n\n' Share of units sold, by original price point\n=SUMIFS(Sales[Units], Sales[Category], A2, Sales[OriginalPrice], B2) / SUMIFS(Sales[Units], Sales[Category], A2)\n\n' Index\n=IFERROR(D2 / C2, 0)",
      caption: "Excel formulas for the price ladder check. Table and column names are examples.",
    },
    { type: "h2", id: "price-architecture-markets", text: "Retail Price Architecture Across Markets and Currencies" },
    {
      type: "p",
      text: "For a brand selling in several countries, the ladder has to work in each currency. Converting prices at the exchange rate rarely does: 49 euros becomes an odd local number, VAT rates differ, and local competitors set their own reference points.",
    },
    {
      type: "p",
      text: "What I keep constant is the position, not the number. Each rung of the home ladder maps to one rung in every currency, set by a price matrix that the whole company uses. For example, and purely as an illustration, a euro ladder of 29, 49 and 79 could map to 129, 199 and 329 in zloty. The local prices follow local endings and competition, but the order of rungs and the size of the steps stay similar, so the architecture reads the same in every market.",
    },
    {
      type: "list",
      items: [
        "Keep one price matrix per currency and update it on a fixed date, not product by product.",
        "Check local steps with the same step formula: a 25% step at home should not become a 10% step abroad after rounding.",
        "Report the ladder check per market in local currency, with the price point expressed as a rung number so markets can be compared.",
        "Review margin per market separately, because duties, freight and VAT move it even when the ladder looks the same.",
      ],
    },
    {
      type: "p",
      text: "Price architecture is one of the first things I look at when a brand says its margin is under pressure. Quite often the problem is not a price that is too low, but a ladder where the range sits on rungs customers do not buy. My article on range planning shows where this check fits in the season’s timeline.",
    },
  ],
  faqTitle: "Retail Price Architecture: Common Questions",
  faq: [
    {
      question: "What is price architecture in retail?",
      answer:
        "Price architecture is the structure of price points a retailer uses within each category, from the lowest entry price to the highest. It defines how many price levels there are, how far apart they sit and what quality or features justify each step. A clear architecture makes the range easy to shop and protects margin.",
    },
    {
      question: "What is a price ladder in retail?",
      answer:
        "A price ladder is the ordered list of actual price points in a category, for example knitwear at 29, 39, 49, 69 and 89. Each price point is a rung, and the number of options and units on each rung shows where the range is concentrated. Comparing the ladder with sales by price point shows whether customers buy where the range is deepest.",
    },
    {
      question: "What is good-better-best pricing?",
      answer:
        "Good-better-best pricing offers three clear levels of the same type of product: a basic version, an upgraded one and a premium one, each with visible differences in fabric, construction or detail. It lets customers trade up and gives the brand a margin-rich top tier. In fashion it often maps to entry, core and top price points.",
    },
    {
      question: "How many price points should a category have?",
      answer:
        "Most fashion categories work with three to five price points; more than that makes steps too small for customers to notice the difference. The gap between neighbouring price points is often 20–40%, so each step feels meaningful. The right number depends on the category’s share of sales and the width of the customer’s budget, so check it against your own sales mix.",
    },
  ],
  seo: {
    title: "Retail Price Architecture: How to Read a Price Ladder",
    description: "How to build a retail price architecture: entry, core and top price points, good-better-best tiers and what a gap in the price ladder costs.",
  },
};
