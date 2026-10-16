import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("retail-calendar-454", "en"),
  title: "4-5-4 Retail Calendar in Power BI: How to Build It",
  h1: {
    before: "4-5-4 Retail Calendar in Power BI:",
    accent: "How to Build It",
  },
  excerpt:
    "The columns a 4-5-4 retail calendar needs, DAX that builds the table, why Power BI time intelligence breaks on it, and what the 53rd week does.",
  lead: "A 4-5-4 retail calendar divides the year into four quarters of thirteen weeks, each split into months of four, five and four weeks. Weeks run Sunday to Saturday and the year ends on the Saturday closest to 31 January, so retail 2026 runs from 1 February 2026 to 30 January 2027.",
  date: "2026-10-16",
  readingMinutes: 8,
  body: [
    {
      type: "p",
      text: "In Power BI a retail calendar replaces the ordinary date table. That has one consequence most teams discover late: the built-in time intelligence functions stop being correct, and every year-on-year measure has to be written by hand.",
    },
    {
      type: "h2",
      id: "what-it-is",
      text: "What a 4-5-4 Retail Calendar Is",
    },
    {
      type: "p",
      text: "The National Retail Federation publishes the calendar as a voluntary industry guide, derived in the 1930s. The point of it is comparability: four-week and five-week months hold the same number of Saturdays and Sundays from one year to the next, and holidays stay in the same week. Weekends carry a disproportionate share of retail sales, so under an ordinary calendar a month with five Saturdays looks like growth that never happened.",
    },
    {
      type: "table",
      caption:
        "The structure is fixed: thirteen weeks a quarter, split four, five and four.",
      columns: [
        {
          label: "Quarter",
          kind: "text",
        },
        {
          label: "Months",
          kind: "text",
        },
        {
          label: "Weeks",
          kind: "text",
        },
      ],
      rows: [
        {
          cells: ["Q1", "February, March, April", "4 + 5 + 4 = 13"],
        },
        {
          cells: ["Q2", "May, June, July", "4 + 5 + 4 = 13"],
        },
        {
          cells: ["Q3", "August, September, October", "4 + 5 + 4 = 13"],
        },
        {
          cells: ["Q4", "November, December, January", "4 + 5 + 4 = 13"],
        },
      ],
    },
    {
      type: "figure",
      src: "/images/blog/retail-calendar-454.svg",
      alt: "The 52 weeks of a retail year in four rows, one per quarter. Each quarter holds thirteen weeks split into months of four, five and four, so the five-week month always falls in the middle. A 53rd week is shown with a dashed outline after week 52.",
      width: 960,
      height: 494,
      caption:
        "One retail year. The five-week month sits in the middle of every quarter.",
    },
    {
      type: "p",
      text: "Retail months are defined by weeks rather than by dates, so a retail month starts and ends partway through a Gregorian one: retail March 2026 runs from 1 March to 4 April. This is what confuses everyone outside the planning team for their first season, and it is why the calendar table has to carry a readable period label and not only a number.",
    },
    {
      type: "h2",
      id: "columns",
      text: "The Columns a Retail Calendar Table Needs",
    },
    {
      type: "table",
      caption:
        "The minimum set. Week Index and LY Week Index are the two most often missing.",
      columns: [
        {
          label: "Column",
          kind: "text",
        },
        {
          label: "What it is for",
          kind: "text",
        },
      ],
      rows: [
        {
          cells: [
            "Date",
            "One row per day, contiguous. Power BI requires it before the table can be marked as a date table",
          ],
        },
        {
          cells: [
            "Week Index",
            "A continuous integer across the whole calendar, not restarting each year. Every year-on-year measure is an offset on this column",
          ],
        },
        {
          cells: [
            "Retail Year",
            "The year the week belongs to, which is not the Gregorian year of the date",
          ],
        },
        {
          cells: ["Week of Year", "1 to 52, or 53"],
        },
        {
          cells: [
            "Period and Period Name",
            "1 to 12, plus a label such as Mar 26. Numbers sort, labels get read",
          ],
        },
        {
          cells: ["Quarter", "1 to 4"],
        },
        {
          cells: [
            "Week of Quarter",
            "1 to 13, the column the 4-5-4 split is derived from",
          ],
        },
        {
          cells: [
            "LY Week Index",
            "The week index this week compares with. Usually Week Index minus 52, but not across a 53-week year",
          ],
        },
        {
          cells: [
            "Is Current Week",
            "A flag, so the report opens on the right week without a slicer",
          ],
        },
      ],
    },
    {
      type: "p",
      text: "Without those two index columns every comparison measure has to work out the alignment for itself, and each one ends up doing it slightly differently.",
    },
    {
      type: "h2",
      id: "build-in-dax",
      text: "Building the 4-5-4 Calendar Table in DAX",
    },
    {
      type: "p",
      text: "The arithmetic is integer division on the week index, which is why the table is worth generating rather than maintaining by hand.",
    },
    {
      type: "code",
      caption:
        "A calculated table. Change the two dates to the range the model needs.",
      code: 'Retail Calendar =\nVAR FirstDay = DATE ( 2021, 1, 31 )   -- the Sunday the earliest retail year starts\nVAR LastDay = DATE ( 2028, 1, 29 )    -- the Saturday the latest one ends\nVAR Base =\n    ADDCOLUMNS (\n        CALENDAR ( FirstDay, LastDay ),\n        "Week Index", QUOTIENT ( DATEDIFF ( FirstDay, [Date], DAY ), 7 )\n    )\nVAR WithYear =\n    ADDCOLUMNS (\n        Base,\n        "Retail Year", YEAR ( FirstDay ) + QUOTIENT ( [Week Index], 52 ),\n        "Week of Year", MOD ( [Week Index], 52 ) + 1\n    )\nVAR WithQuarter =\n    ADDCOLUMNS (\n        WithYear,\n        "Quarter", QUOTIENT ( [Week of Year] - 1, 13 ) + 1,\n        "Week of Quarter", MOD ( [Week of Year] - 1, 13 ) + 1\n    )\nRETURN\n    ADDCOLUMNS (\n        WithQuarter,\n        "Period",\n            ( [Quarter] - 1 ) * 3\n                + IF ( [Week of Quarter] <= 4, 1, IF ( [Week of Quarter] <= 9, 2, 3 ) ),\n        "LY Week Index", [Week Index] - 52\n    )',
    },
    {
      type: "p",
      text: "The 4-5-4 split is the one line in the middle: weeks 1 to 4 of a quarter belong to its first month, 5 to 9 to the second, 10 to 13 to the third.",
    },
    {
      type: "p",
      text: "Then mark it as the date table in the model. Power BI requires contiguous dates with no gaps, which CALENDAR guarantees; without the marking, the relationship behaves as an ordinary integer join and some visuals quietly drop the dates with no sales.",
    },
    {
      type: "p",
      text: "This version assumes every retail year has 52 weeks. That holds for a run of years and then does not. When the range crosses a 53-week year, the year boundaries have to come from data rather than from division: a two-column table of retail year and its first day, with the same arithmetic running per year. Build it in Power Query or keep it as a small maintained table. It is a dozen rows and it is worth owning.",
    },
    {
      type: "h2",
      id: "time-intelligence",
      text: "Why Power BI Time Intelligence Does Not Work on a Retail Calendar",
    },
    {
      type: "p",
      text: "DATESYTD, SAMEPERIODLASTYEAR, TOTALYTD and the rest assume a Gregorian structure: that every day of a month belongs to the same quarter in every year, and that the same day and month last year is the comparable period. On a week-based calendar neither assumption holds. SQLBI's analysis of week-based time intelligence gives the clean example, that 1 and 2 January 2011 belong to week 52 of 2010, and notes that the optional year-end argument of DATESYTD cannot repair it, because the period boundaries themselves move between years.",
    },
    {
      type: "p",
      text: "So the measures are written against the calendar's own columns instead: filter on Retail Year, Period or Week of Year, plus a cap on the week index.",
    },
    {
      type: "code",
      caption: "Year to date on a retail calendar, without time intelligence.",
      code: "Sales RYTD =\nVAR LastWeek = MAX ( 'Retail Calendar'[Week Index] )\nVAR ThisYear = SELECTEDVALUE ( 'Retail Calendar'[Retail Year] )\nRETURN\n    IF (\n        NOT ISBLANK ( ThisYear ),\n        CALCULATE (\n            [Sales Value],\n            REMOVEFILTERS ( 'Retail Calendar' ),\n            'Retail Calendar'[Retail Year] = ThisYear,\n            'Retail Calendar'[Week Index] <= LastWeek\n        )\n    )",
    },
    {
      type: "p",
      text: "The IF around it is deliberate. On a total row where several retail years are in context there is no single year to run to date, and a blank is a more honest answer than a number nobody can reconstruct.",
    },
    {
      type: "h2",
      id: "last-year",
      text: "Comparing With Last Year on a Retail Calendar",
    },
    {
      type: "p",
      text: "With LY Week Index in the table, last year is a lookup rather than a date calculation.",
    },
    {
      type: "code",
      caption:
        "The measure reads the mapping from the calendar instead of subtracting 52 itself.",
      code: "Sales LY =\nVAR LastYearWeeks =\n    TREATAS (\n        SELECTCOLUMNS (\n            VALUES ( 'Retail Calendar'[Week Index] ),\n            \"@Week\", 'Retail Calendar'[LY Week Index]\n        ),\n        'Retail Calendar'[Week Index]\n    )\nRETURN\n    CALCULATE (\n        [Sales Value],\n        REMOVEFILTERS ( 'Retail Calendar' ),\n        LastYearWeeks\n    )",
    },
    {
      type: "p",
      text: "Reading the column rather than subtracting 52 inside the measure is the whole point: the correction for a 53-week year then lives in one place, and every measure built on it inherits the fix.",
    },
    {
      type: "h2",
      id: "53rd-week",
      text: "What the 53rd Week Does to a Retail Calendar",
    },
    {
      type: "p",
      text: "A 52-week year is 364 days, so a day accumulates every year and, with leap years, the calendar drifts. The fix is a 53rd week added roughly every five or six years. NRF's rule is to add one when four or more days remain in January after week 52, and it lists 2006, 2012, 2017 and 2023 as 53-week years.",
    },
    {
      type: "p",
      text: "Two things break at that boundary, both quietly. Week alignment goes first: week index minus 52 lands a week off, so every year-on-year figure is wrong by one week for a full year. Nothing errors, the numbers simply stop meaning what the label says. Then the totals: a 53-week year holds an extra week of trade, so comparing it with a 52-week year shows growth that is a week of calendar rather than a week of demand.",
    },
    {
      type: "p",
      text: "NRF's answer to the first is restatement: shift each week back by one and ignore the first week of the 53-week year, which keeps the holidays aligned. In the model that is exactly what the LY Week Index column is for. Write the restated mapping into it once, for the two years either side of the boundary, and no measure needs a special case.",
    },
    {
      type: "p",
      text: "For the second there is no arithmetic fix, only disclosure: a 53-week year gets reported both ways, 53 against 52 for the statutory numbers and 52 against 52 for the trading read, and each page says which one it is showing.",
    },
    {
      type: "h2",
      id: "mistakes",
      text: "Mistakes in Retail Calendar Tables",
    },
    {
      type: "list",
      items: [
        "Restarting the week number each year and comparing on it. Week 1 of one year and week 1 of the next sit a different distance from the season start when a 53rd week falls between them. Compare on a continuous index.",
        "Using the built-in time intelligence anyway. It returns numbers, which is worse than returning errors.",
        "Leaving the table unmarked as a date table. Relationships still work, so nothing looks broken until a visual drops the weeks with no sales.",
        "Deriving the retail year by division when the range crosses a 53-week year. The arithmetic has no way to know, so the boundary has to come from data.",
        "Showing the period label without the period number. Mar 26 then sorts between Jul 26 and May 26; sort the label by the number.",
      ],
    },
  ],
  faqTitle: "Retail Calendar FAQ",
  faq: [
    {
      question: "What is a 4-5-4 retail calendar?",
      answer:
        "A reporting calendar that divides the year into four quarters of thirteen weeks, each split into months of four, five and four weeks. Weeks run Sunday to Saturday and the year ends on the Saturday closest to 31 January. Because the months are built from whole weeks, comparable months hold the same number of weekends from one year to the next, which is what makes year-on-year sales comparable.",
    },
    {
      question: "When does the retail year start?",
      answer:
        "On the Sunday after the Saturday closest to 31 January. Retail 2026 runs from Sunday 1 February 2026 to Saturday 30 January 2027. Retail months are defined by weeks rather than dates, so retail March 2026 covers 1 March to 4 April.",
    },
    {
      question:
        "Can I use DATESYTD and SAMEPERIODLASTYEAR with a retail calendar?",
      answer:
        "No. Those functions assume every day of a month belongs to the same quarter in every year and that the comparable period last year is the same day and month, and neither is true on a week-based calendar. The year-end argument of DATESYTD does not fix it, because the period boundaries move between years. Write the measures against the calendar's own year, period and week-index columns instead.",
    },
    {
      question: "How do I handle the 53rd week in Power BI?",
      answer:
        "Put the comparison mapping in the calendar table as an LY Week Index column rather than subtracting 52 inside each measure. Apply NRF's restatement in that column for the years either side of the boundary: shift each week back by one and ignore the first week of the 53-week year. Totals are a separate problem with no arithmetic answer, so report a 53-week year both ways and label which view a page shows.",
    },
    {
      question: "What is the difference between a 4-5-4 and a 4-4-5 calendar?",
      answer:
        "Only where the five-week month sits in the quarter. 4-5-4 puts it in the middle, which is the NRF convention in retail; 4-4-5 puts it last and is more common in manufacturing and finance. The quarter is thirteen weeks either way, and everything in the model below the month label is identical.",
    },
  ],
  seo: {
    title: "4-5-4 Retail Calendar in Power BI: How to Build It",
    description:
      "The columns a 4-5-4 retail calendar needs, DAX that builds the table, and why Power BI time intelligence does not work on it.",
  },
};
