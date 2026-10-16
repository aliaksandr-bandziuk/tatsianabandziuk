import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("like-for-like-dax", "en"),
  title: "Like-for-Like Sales in DAX: Comparable Stores and Weeks",
  h1: {
    before: "Like-for-Like Sales in DAX:",
    accent: "Comparable Stores and Weeks",
  },
  excerpt:
    "How like-for-like sales are defined, the two methods of choosing comparable stores, and the DAX that keeps both years on the same store set.",
  lead: "Like-for-like sales compare this period with the same period last year using only the stores that traded in both. The hard part is not the arithmetic: it is deciding which store-weeks qualify, and making sure the same set is applied to this year and to last year.",
  date: "2026-10-16",
  readingMinutes: 7,
  body: [
    {
      type: "p",
      text: "Everything difficult about like-for-like sits in the word only: which stores qualify, which of their weeks count, and whether the same set is used on both sides of the comparison. Get that wrong and the measure still returns a number. It is the number that makes a bad year look flat.",
    },
    {
      type: "h2",
      id: "what-it-measures",
      text: "What Like-for-Like Sales Actually Measure",
    },
    {
      type: "p",
      text: "The purpose is to separate trading performance from estate changes. A chain that opened twenty stores will grow total sales whatever happens in the shops it already had. Like-for-like strips the new ones out and answers a narrower question: did the existing business sell more.",
    },
    {
      type: "p",
      text: "There is no standard definition. Each retailer sets its own and states it in its filings, which is why two chains reporting LFL plus three percent are not necessarily comparable with each other. Macy's, answering an SEC comment on exactly this, described its rule as sales from stores in operation throughout both periods being compared, with remodels, expansions and relocations staying in the calculation unless the store closed for any significant period, closed stores removed once the closure is announced, and all internet sales included.",
    },
    {
      type: "p",
      text: "Three decisions hide in that one sentence, and the model has to answer all three: how long a store must have traded to qualify at all, what happens to a store that was shut for a refit in the middle of the comparison, and whether e-commerce is in or out — with a third answer needed where the chain has click-and-collect. None of these has a right answer. They have an answer the business has chosen, and it has to be written down, because a measure that silently encodes one of them is a measure nobody can audit.",
    },
    {
      type: "h2",
      id: "two-methods",
      text: "Store-Based and Store-Period: Two Ways to Choose Comparable Stores",
    },
    {
      type: "p",
      text: "The two methods differ in what they exclude, and the choice changes the number. Store-based treats eligibility as a property of the store: it qualifies when it has enough trading history to cover both periods in full, thirteen months for a month-on-month read, the current year plus the whole prior year for year to date. A store that opened midway through last year is dropped entirely, including the months where a perfectly good comparison exists.",
    },
    {
      type: "p",
      text: "Store-period decides eligibility per store and per week instead. A store that opened in week 5 of last year contributes weeks 5 to 52 and nothing earlier. Nothing usable is thrown away, and the comparison stays honest because the same weeks are excluded on both sides.",
    },
    {
      type: "figure",
      src: "/images/blog/like-for-like-store-weeks.svg",
      alt: "Five stores over thirteen weeks, last year beside this year. A week counts as like-for-like only where the store traded in both years: the store open throughout counts in all thirteen weeks, one opened this year counts in none, one opened last year in week 7 counts from week 7, one closing in week 10 counts in weeks 1 to 9, and one shut for a refit counts in every week except those three.",
      width: 962,
      height: 324,
      caption: "The store-period method. 39 of 65 store-weeks survive.",
    },
    {
      type: "p",
      text: "Store-period is the better method and the one worth building. It is also the one that needs a model behind it, because eligibility is no longer an attribute of the store: it is a fact about a store and a week.",
    },
    {
      type: "h2",
      id: "rule-in-a-table",
      text: "The Comparable-Store Rule Belongs in a Table",
    },
    {
      type: "p",
      text: "Comparable-store eligibility is a business rule with exceptions: refits, relocations, announced closures, a store that traded four days of its opening week. Those exceptions arrive by email rather than by formula, so the rule belongs in a maintained table that somebody owns.",
    },
    {
      type: "table",
      caption:
        "One table at store-and-week grain, related to the store table and the retail calendar.",
      columns: [
        {
          label: "Column",
          kind: "text",
        },
        {
          label: "What it holds",
          kind: "text",
        },
      ],
      rows: [
        {
          cells: ["Store Key", "The store"],
        },
        {
          cells: [
            "Week Index",
            "A comparable week for that store, on the continuous index of the retail calendar",
          ],
        },
        {
          cells: [
            "LY Week Index",
            "The week it compares with, read from the calendar rather than computed as minus 52",
          ],
        },
      ],
    },
    {
      type: "p",
      text: "Build it in Power Query or upstream in the warehouse. Every row in it is a promise: this store, this week, has a valid counterpart last year. A store-week belongs in the table when the store traded in that week and also traded in its counterpart week last year. Deriving traded from the sales fact is the quick version and it is wrong at the edges, because a store that was open with no sales in a quiet week looks closed, so where a store trading calendar exists, use it.",
    },
    {
      type: "h2",
      id: "dax",
      text: "The DAX for Like-for-Like Sales",
    },
    {
      type: "p",
      text: "With that table in the model the measures are short, and the whole point is that both of them read the same rows.",
    },
    {
      type: "code",
      caption: "This year, restricted to the comparable store-weeks.",
      code: "Sales LFL =\nVAR Pairs =\n    SELECTCOLUMNS (\n        'Comparable Store Weeks',\n        \"@Store\", 'Comparable Store Weeks'[Store Key],\n        \"@Week\", 'Comparable Store Weeks'[Week Index]\n    )\nRETURN\n    CALCULATE (\n        [Sales Value],\n        KEEPFILTERS ( TREATAS ( Pairs, Store[Store Key], 'Retail Calendar'[Week Index] ) )\n    )",
    },
    {
      type: "code",
      caption: "Last year: the same rows, projected on the other column.",
      code: "Sales LFL LY =\nVAR Pairs =\n    SELECTCOLUMNS (\n        'Comparable Store Weeks',\n        \"@Store\", 'Comparable Store Weeks'[Store Key],\n        \"@Week\", 'Comparable Store Weeks'[LY Week Index]\n    )\nRETURN\n    CALCULATE (\n        [Sales Value],\n        REMOVEFILTERS ( 'Retail Calendar' ),\n        TREATAS ( Pairs, Store[Store Key], 'Retail Calendar'[Week Index] )\n    )",
    },
    {
      type: "code",
      code: "LFL % =\nDIVIDE ( [Sales LFL] - [Sales LFL LY], [Sales LFL LY] )",
    },
    {
      type: "p",
      text: "The two measures are deliberately near-identical: the only difference is which column of the same filtered rows they project. The comparable table is filtered by whatever weeks the user has selected before either measure runs, so the last-year side follows the selection instead of being recomputed from dates.",
    },
    {
      type: "p",
      text: "REMOVEFILTERS on the calendar in the second measure is what lets last year's weeks through. Without it the filter from the slicer and the filter from TREATAS intersect to nothing and the measure returns blank, which is the single most common way this pattern is broken.",
    },
    {
      type: "h2",
      id: "aligned-weeks",
      text: "Why Like-for-Like Needs Aligned Weeks",
    },
    {
      type: "p",
      text: "Comparing week 42 with week 42 only works if the two weeks are the same part of the season. On an ordinary calendar they are not: dates drift by a day or two each year, Easter moves by weeks, and a 53-week year shifts everything after it by one.",
    },
    {
      type: "p",
      text: "This is why LY Week Index is read from the retail calendar rather than written as Week Index minus 52 inside the measure. The calendar holds the alignment, including the restatement across a 53-week year, and the like-for-like measures inherit it. A like-for-like built on calendar dates carries an artefact nobody can separate from trading.",
    },
    {
      type: "h2",
      id: "mistakes",
      text: "Mistakes in Like-for-Like Measures",
    },
    {
      type: "list",
      items: [
        "Filtering the current period and not last year. This year counts comparable stores only, last year counts everything, and the growth number is pure estate change.",
        "Deciding eligibility from a measure instead of a table. It works until somebody slices by category, at which point a store with no sales in that category looks closed and silently leaves the comparison.",
        "Subtracting 52 inside the measure. Correct until the 53-week year, then quietly wrong for twelve months.",
        "Dropping a whole store because it opened midway through last year. The store-based method throws away months of valid comparison that the store-period method keeps.",
        "Leaving e-commerce undecided. Including online in one year and not the other produces growth nobody can explain, and click-and-collect needs a decision of its own.",
        "Reporting the percentage without the store count. LFL plus 3% across 180 of 214 stores is a fact; LFL plus 3% is a claim.",
      ],
    },
  ],
  faqTitle: "Like-for-Like FAQ",
  faq: [
    {
      question: "What are like-for-like sales?",
      answer:
        "Sales compared with the same period last year counting only the stores that traded in both periods, so that growth from new openings and losses from closures are excluded. The measure answers whether the existing business sold more, which total sales cannot. It is also called comparable store sales or same-store sales.",
    },
    {
      question:
        "How long must a store trade before it counts as like-for-like?",
      answer:
        "That is the retailer's decision rather than a standard. The common rule is that the store must have traded throughout both periods being compared, which means thirteen months for a month-on-month read and the current year plus the whole prior year for year to date. The store-period method relaxes this: the store contributes the weeks it traded in both years and nothing earlier.",
    },
    {
      question:
        "Are refurbished or relocated stores included in like-for-like?",
      answer:
        "Usually yes, unless the store was closed for a significant period. Macy's states exactly that rule in its filings: remodels, expansions and relocations stay in the calculation, and closed stores drop out once the closure is announced. Whatever the business decides, the decision belongs in the eligibility table rather than inside a measure, because the exceptions are specific to individual stores.",
    },
    {
      question: "Is e-commerce included in like-for-like sales?",
      answer:
        "It depends on the retailer and it has to be stated. Macy's includes all internet sales. A chain with click-and-collect has a third question, because that revenue can be attributed to the store, to online, or split, and the choice has to be the same in both years or the comparison means nothing.",
    },
    {
      question: "Why does my like-for-like measure return blank for last year?",
      answer:
        "Almost always because the date or week filter from the report is still active when the last-year filter is applied, and the two intersect to nothing. Remove the calendar filter inside the measure with REMOVEFILTERS before applying the last-year week set.",
    },
  ],
  seo: {
    title: "Like-for-Like Sales in DAX: Comparable Stores",
    description:
      "How like-for-like sales are defined, the two ways of choosing comparable stores, and DAX that keeps both years on the same store set.",
  },
};
