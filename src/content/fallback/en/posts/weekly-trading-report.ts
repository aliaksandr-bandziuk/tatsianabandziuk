import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("weekly-trading-report", "en"),
  title: "Weekly Trading Report in Power BI: What to Include",
  h1: {
    before: "Weekly Trading Report in Power BI:",
    accent: "What to Include",
  },
  excerpt:
    "The four pages of a weekly trading report in Power BI, the measures each one needs, the retail calendar underneath it, and the mistakes that make it useless.",
  lead: "A weekly trading report answers four questions in the order a Monday meeting asks them: how did we trade against plan, where did the gap come from, which products caused it, and what do we do this week. Four pages, one per question, each carrying only the measures that question needs.",
  date: "2026-10-16",
  readingMinutes: 8,
  body: [
    {
      type: "p",
      text: "Most weekly reports fail for the same reason: they are organised around the data the team happens to have, one page per source system or one page per chart type, instead of around the decisions the meeting makes. The agenda is the specification.",
    },
    {
      type: "h2",
      id: "what-it-answers",
      text: "What a Weekly Trading Report Has to Answer",
    },
    {
      type: "p",
      text: "The report exists to produce decisions: replenish, mark down, cancel intake, rebalance stock between channels. Anything that does not lead to one of those belongs in a monthly pack.",
    },
    {
      type: "p",
      text: "That has a practical consequence for the build. Before any modelling, write the four questions down and show them to the people who sit in the meeting. If a visual on page two does not help answer question two, it comes off the page. A trading report with forty visuals is a report nobody reads past the first ten minutes.",
    },
    {
      type: "h2",
      id: "four-pages",
      text: "The Four Pages of a Weekly Trading Report in Power BI",
    },
    {
      type: "table",
      caption: "One page per question, in the order the meeting asks them.",
      columns: [
        {
          label: "Page",
          kind: "text",
        },
        {
          label: "The question it answers",
          kind: "text",
        },
        {
          label: "What goes on it",
          kind: "text",
        },
      ],
      rows: [
        {
          cells: [
            "1. Trade summary",
            "Did we hit the plan last week?",
            "Sales value and units for the week against plan and against last year on aligned weeks; the same three for month to date and season to date; margin and full-price share; one variance line, not twelve",
          ],
        },
        {
          cells: [
            "2. Where the gap came from",
            "Which part of the business moved?",
            "The same variance split by channel, market, department and category; a waterfall from plan to actual; over- and under-performers ranked by the size of the gap rather than by sales",
          ],
        },
        {
          cells: [
            "3. Product detail",
            "Which styles caused it, and what is the stock position?",
            "Best and worst sellers by sell-through and by gap to plan; weeks of cover against intake already booked; size availability; aged stock",
          ],
        },
        {
          cells: [
            "4. Actions",
            "What do we do this week?",
            "Replenishment candidates with quantities, markdown candidates with stock value, intake to cancel or pull forward, each with an owner",
          ],
        },
      ],
    },
    {
      type: "p",
      text: "Page one is read by everyone; page four is the only one anybody acts on. Pages two and three exist to get from one to the other, and they are where filters earn their place: the same page serves the buying meeting and the finance review because the measures recalculate for whatever is selected.",
    },
    {
      type: "p",
      text: "One deliberate omission: no page shows a target that is not in the plan. A number with no plan behind it produces discussion rather than a decision.",
    },
    {
      type: "h2",
      id: "measures",
      text: "The Measures a Weekly Trading Report Needs",
    },
    {
      type: "p",
      text: "Everything on those four pages is built from a small set of measures.",
    },
    {
      type: "list",
      items: [
        "Sales value and units, net of returns.",
        "Plan, and variance to plan in value, units and percent.",
        "Last year on aligned weeks, and variance to it.",
        "Sell-through: units sold over units received, or over received plus opening stock. One definition, written down.",
        "Weeks of cover: closing stock over the rate of sale on in-stock weeks.",
        "Full-price share of sales value.",
        "Intake: received in the week, and booked but not yet received.",
        "Stock value and units, as a semi-additive closing position rather than a sum across weeks.",
      ],
    },
    {
      type: "p",
      text: "The variance measures are the ones most often written as calculated columns, which is wrong: a variance has to recalculate for whatever the viewer has filtered.",
    },
    {
      type: "code",
      caption:
        "DIVIDE keeps a category with no plan blank instead of raising an error.",
      code: "Sales vs Plan % =\nVAR Actual = [Sales Value]\nVAR Plan = [Plan Value]\nRETURN\n    DIVIDE ( Actual - Plan, Plan )",
    },
    {
      type: "h2",
      id: "retail-calendar",
      text: "Why a Weekly Trading Report Needs a 4-5-4 Retail Calendar",
    },
    {
      type: "p",
      text: "Comparing this week with the same week number last year only works if the two weeks are comparable. Under an ordinary calendar they are not: the number of weekends in a month changes from year to year, and weekends carry a growing share of sales.",
    },
    {
      type: "p",
      text: "That is the problem the 4-5-4 calendar solves. The National Retail Federation describes it as a voluntary guide the industry derived in the 1930s, splitting each quarter into months of four, five and four weeks so that holidays stay aligned and comparable months hold the same number of Saturdays and Sundays. Like days are compared with like days.",
    },
    {
      type: "p",
      text: "In a Power BI model this means the date table is a retail calendar rather than a Gregorian one: it carries fiscal year, fiscal week, period, quarter and a continuous week index. With that index, last year is an offset rather than a date calculation.",
    },
    {
      type: "code",
      caption: "Last year by week index, not by date.",
      code: "Sales LY (aligned weeks) =\nVAR CurrentWeeks =\n    VALUES ( 'Retail Calendar'[Week Index] )\nVAR LastYearWeeks =\n    TREATAS (\n        SELECTCOLUMNS ( CurrentWeeks, \"@Week\", 'Retail Calendar'[Week Index] - 52 ),\n        'Retail Calendar'[Week Index]\n    )\nRETURN\n    CALCULATE (\n        [Sales Value],\n        REMOVEFILTERS ( 'Retail Calendar' ),\n        LastYearWeeks\n    )",
    },
    {
      type: "p",
      text: "The minus-52 shortcut breaks, and it is worth knowing when. A 52-week year is 364 days, so the retail calendar adds a 53rd week roughly every five or six years. NRF's rule is to add one when four or more days are left in January after week 52, and it names 2006, 2012, 2017 and 2023 as 53-week years. Across such a boundary, week index minus 52 lands on the wrong week and every year-on-year number in the report is quietly wrong by one week. NRF's own answer is to restate: shift each week back by one and ignore the first week of the 53-week year.",
    },
    {
      type: "p",
      text: "The robust build does the same thing in the model rather than in the measure. Put an explicit LY Week Index column in the calendar table with the restatement already applied, and have the measure read that column instead of subtracting 52. The arithmetic then survives the boundary year without anybody remembering to fix it.",
    },
    {
      type: "h2",
      id: "stock-vs-sales-variance",
      text: "Reading Stock Variance Against Sales Variance",
    },
    {
      type: "p",
      text: "The most useful chart on page two is not sales. It is sales variance plotted against stock variance, because the relationship between the two says whether a category is healthy.",
    },
    {
      type: "p",
      text: "The rule, as Style Arcade states it in their guidance on Monday trade reporting: sales variance should exceed stock variance. Their worked examples are 15% sales growth against 3% stock growth as a strong position, minus 7% against minus 15% as acceptable, and minus 15% sales against plus 25% stock as the one that needs a deep dive.",
    },
    {
      type: "figure",
      src: "/images/blog/sales-vs-stock-variance.svg",
      alt: "Sales variance plotted against stock variance, both against last year. A diagonal marks where the two are equal and the half above it is shaded. Plus 15 against plus 3 and minus 7 against minus 15 sit below the line; minus 15 sales against plus 25 stock sits in the shaded half.",
      width: 900,
      height: 560,
      caption:
        "The three positions Style Arcade uses as examples, placed against the rule.",
    },
    {
      type: "p",
      text: "The diagonal is the rule. Anything below it is selling faster than the stock is growing; anything above it is accumulating. A category sitting well above the line with the season ending is a markdown decision, and it is better found on a chart than in a sorted table, because the eye catches the outlier before the ranking does.",
    },
    {
      type: "h2",
      id: "owners-and-refresh",
      text: "Who Owns the Weekly Trading Report and When It Refreshes",
    },
    {
      type: "p",
      text: "A trading report is a scheduled obligation, not a dashboard somebody opens when curious. Three things have to be written down next to it, and all three are organisational rather than technical.",
    },
    {
      type: "list",
      items: [
        "One set of KPI definitions. Sell-through, cover and full-price share each have at least two defensible definitions; the report needs one of each, with the formula, the source and the owner recorded in a sheet everybody has signed off. Without it the meeting spends its first ten minutes reconciling numbers.",
        "A refresh that lands before the meeting, not during it. If the Monday meeting is at ten, the refresh and its check happen earlier, and a failed refresh has to be visible as a failure rather than as yesterday's figures presented as today's.",
        "A named owner per page, who prepares, checks and presents that part. The BI team is not an owner.",
      ],
    },
    {
      type: "h2",
      id: "mistakes",
      text: "Mistakes That Make a Weekly Trading Report Useless",
    },
    {
      type: "list",
      items: [
        "Building the pages around data sources instead of the agenda. The meeting then jumps between pages, and the report is replaced by somebody's spreadsheet within a quarter.",
        "Comparing unaligned weeks. Without a retail calendar, every year-on-year number carries a calendar artefact nobody can separate from real performance.",
        "Ranking by sales instead of by gap. The biggest category is almost always at the top; the biggest problem rarely is.",
        "Showing stock as a sum across weeks. Stock is semi-additive: a month column that adds four weekly snapshots reports four times the stock the business holds.",
        "No plan on the page. A number without a plan generates opinions; a variance generates a decision.",
        "Forty visuals. Everything that does not lead to replenish, mark down, cancel or rebalance belongs in the monthly pack.",
      ],
    },
  ],
  faqTitle: "Weekly Trading Report FAQ",
  faq: [
    {
      question: "What should a weekly trading report contain?",
      answer:
        "Four pages, one per question the meeting asks. A trade summary of sales, margin and full-price share against plan and against last year on aligned weeks; a breakdown of where the variance came from, by channel, market and category; product detail with best and worst sellers, weeks of cover against booked intake and size availability; and a page of actions with quantities and owners. Anything that does not lead to replenishing, marking down, cancelling intake or rebalancing stock belongs in the monthly pack.",
    },
    {
      question: "How often should a trading report refresh?",
      answer:
        "Daily refresh with a weekly cadence of use is the usual arrangement: the meeting is weekly, but a mid-week check on a fast-moving launch needs current figures. What matters more than frequency is that the refresh and its validation finish before the meeting starts, and that a failed refresh shows as a failure rather than quietly serving yesterday's numbers.",
    },
    {
      question: "Why does a retail report need a 4-5-4 calendar?",
      answer:
        "Because week-on-week and year-on-year comparisons are only meaningful between comparable weeks. The 4-5-4 calendar splits each quarter into months of four, five and four weeks so that comparable months hold the same number of Saturdays and Sundays and holidays stay aligned. Without it, a year-on-year figure mixes real performance with a calendar artefact.",
    },
    {
      question: "What is the difference between a WSSI and a trading report?",
      answer:
        "A WSSI, weekly sales stock and intake, is the planning grid that projects stock forward from sales and intake, and it is maintained by planning. A trading report is the weekly read of what actually happened and what to do about it, and it is read by buying, planning and finance together. The trading report usually shows the current position against the WSSI projection rather than replacing it.",
    },
    {
      question: "Should a weekly trading report show plan or last year?",
      answer:
        "Both, and they answer different questions. Plan says whether the business is on the track it committed to and is the basis for an action. Last year says whether the market or the range has moved, and it needs aligned weeks to mean anything. A page with last year and no plan produces discussion rather than decisions.",
    },
  ],
  seo: {
    title: "Weekly Trading Report in Power BI: What to Include",
    description:
      "The four pages of a weekly trading report in Power BI, the measures each needs, and why it has to sit on a 4-5-4 retail calendar.",
  },
};
