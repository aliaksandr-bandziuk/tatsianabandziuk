import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("weeks-of-cover", "en"),
  title: "Weeks of Cover in Power BI: DAX Measure and Formula",
  h1: {
    before: "Weeks of Cover in Power BI:",
    accent: "DAX Measure and Formula",
  },
  excerpt:
    "The weeks of cover formula, why the averaging window changes the answer, a DAX measure that counts only in-stock weeks, and how cover converts to stock turn.",
  lead: "Weeks of cover is stock on hand divided by the weekly rate of sale: 290 units selling 29 units a week is 10 weeks of cover. Two teams can report different cover for the same style on the same day and both be right, because the number depends on which weeks of sales go into the average.",
  date: "2026-10-16",
  readingMinutes: 7,
  body: [
    {
      type: "p",
      text: "The formula is the easy part. Two teams can report different cover for the same style on the same day and both be arithmetically correct, because cover depends on a choice nobody writes down: which weeks of sales go into the average. This article fixes the definition, shows what the choice does to the number, and gives the DAX that puts it in a Power BI model.",
    },
    {
      type: "h2",
      id: "what-it-measures",
      text: "What Weeks of Cover Measures in Retail",
    },
    {
      type: "p",
      text: "Weeks of cover answers one question: how long will the stock last. It is also called weeks of supply, and in most retail teams the two terms are interchangeable.",
    },
    {
      type: "p",
      text: "What makes it useful is that it is stated in time, not in units or money. Four thousand units of stock means nothing without a sales rate behind it. Ten weeks of cover in week 12 of a twelve-week season means the range will not clear, and everyone in the trading meeting understands it in the same second.",
    },
    {
      type: "p",
      text: "Cover is a forward-looking read on stock built out of backward-looking data. That is exactly where it goes wrong.",
    },
    {
      type: "h2",
      id: "formula",
      text: "The Weeks of Cover Formula and a Worked Example",
    },
    {
      type: "formula",
      text: "Weeks of cover = stock on hand ÷ average weekly units sold",
    },
    {
      type: "p",
      text: "Two decisions sit inside that line. The first is which stock: closing stock for the week being reported, or opening stock for the week ahead. Closing stock is the normal choice for a trading report, because that is what you have when the meeting starts. Planning guidance from Toolio writes the formula with beginning-of-period inventory, which is the same number shifted by one week. What matters is that one definition is used everywhere. The second decision is which weeks of sales, and it is the subject of the next two sections.",
    },
    {
      type: "p",
      text: "A worked example. One style, 1,200 units received, twelve weeks on sale. The figures are illustrative, chosen to show a normal decay curve.",
    },
    {
      type: "table",
      caption: "One style over twelve weeks. Stock falls as sales decay.",
      columns: [
        {
          label: "Week",
          kind: "text",
        },
        {
          label: "Units sold",
          kind: "number",
        },
        {
          label: "Closing stock",
          kind: "number",
        },
      ],
      rows: [
        {
          cells: ["Week 1", 180, 1020],
        },
        {
          cells: ["Week 2", 150, 870],
        },
        {
          cells: ["Week 3", 120, 750],
        },
        {
          cells: ["Week 4", 95, 655],
        },
        {
          cells: ["Week 5", 80, 575],
        },
        {
          cells: ["Week 6", 70, 505],
        },
        {
          cells: ["Week 7", 55, 450],
        },
        {
          cells: ["Week 8", 45, 405],
        },
        {
          cells: ["Week 9", 40, 365],
        },
        {
          cells: ["Week 10", 30, 335],
        },
        {
          cells: ["Week 11", 25, 310],
        },
        {
          cells: ["Week 12", 20, 290],
        },
      ],
    },
    {
      type: "p",
      text: "In week 12 the style has 290 units left. Over the last four weeks it sold 115 units, 28.75 a week, so cover is 10.1 weeks. Over the whole season it sold 910 units, 75.8 a week, so cover is 3.8 weeks. Same stock, same week, same formula, and the answer differs by a factor of 2.6.",
    },
    {
      type: "h2",
      id: "window",
      text: "Choosing the Rate of Sale Window for Weeks of Cover",
    },
    {
      type: "figure",
      src: "/images/blog/weeks-of-cover-windows.svg",
      alt: "Weeks of cover for one style over weeks 4 to 12, calculated two ways. On a four-week rate of sale cover rises from 4.8 to 10.1 weeks. On a season-to-date rate of sale it falls from 4.8 to 3.8 weeks. The stock figure is identical in both.",
      width: 960,
      height: 480,
      caption: "The same stock in both lines. Only the rate of sale differs.",
    },
    {
      type: "p",
      text: "The two lines start on the same number in week 4 and never meet again. The reason is in the sales curve, not in the stock: demand decays, and a long window keeps feeding the average with the high early weeks.",
    },
    {
      type: "p",
      text: "That gives a rule worth remembering in both directions. On a declining curve, a long window hides overstock: season-to-date cover says 3.8 weeks, which reads as comfortable, while the style is actually selling 20 units a week and will not clear. On a rising curve, the same arithmetic in reverse hides a stockout, because the average lags the acceleration, cover looks longer than it is, and nobody raises the replenishment.",
    },
    {
      type: "p",
      text: "In a weekly trading report, a four-week rate of sale is the sane default. It is short enough to follow the trend and long enough to survive one odd week of weather or a promotion; Toolio's worked examples use four-week and eight-week trailing averages for the same reason. Season-to-date has one good use: judging how a whole range performed after it has finished.",
    },
    {
      type: "p",
      text: "Whichever window you pick, put it in the column header. Cover (4wk) is a measure. Cover is an argument waiting to happen.",
    },
    {
      type: "h2",
      id: "in-stock-weeks",
      text: "Why Out-of-Stock Weeks Must Leave the Rate of Sale",
    },
    {
      type: "p",
      text: "A week in which a size ran out on Tuesday is not a week of demand. Leave it in the average and the rate of sale drops, cover rises, and the report recommends holding stock of something that was selling faster than you think.",
    },
    {
      type: "p",
      text: "The fix is to average over in-stock weeks only. Toolio puts the size of the error at roughly 30% or more of demand understated when zero-inventory weeks are included. Treat that as an order of magnitude rather than a constant, because it depends entirely on how often you break.",
    },
    {
      type: "p",
      text: "This is the correction most home-built cover reports are missing, and it is why the measure below counts its weeks instead of dividing by a fixed four.",
    },
    {
      type: "h2",
      id: "dax-measure",
      text: "A Weeks of Cover DAX Measure for Power BI",
    },
    {
      type: "p",
      text: "Three measures. The model is a star schema: a Date table, a Sales fact at day or week grain, and a Stock snapshot with one row per product, location and date.",
    },
    {
      type: "p",
      text: "Closing stock is semi-additive, which means it does not sum over time. Stock adds up across stores and styles, but across weeks you want the last value, not the total. The measure below takes the last date that actually has a snapshot, so it survives a model where stock is loaded weekly rather than daily. It follows the first-and-last-date-with-data pattern published by DAX Patterns; ALLEXCEPT is what makes every row of the matrix and the total agree on one date instead of each finding its own.",
    },
    {
      type: "code",
      caption:
        "Closing stock: the last snapshot in the period, not the sum of the snapshots.",
      code: "Closing Stock Units =\nVAR MaxStockDate =\n    CALCULATE (\n        MAX ( Stock[Date] ),\n        ALLEXCEPT ( Stock, 'Date' )\n    )\nVAR Result =\n    CALCULATE (\n        SUM ( Stock[Units] ),\n        'Date'[Date] = MaxStockDate\n    )\nRETURN\n    Result",
    },
    {
      type: "p",
      text: "The rate of sale builds the window with DATESINPERIOD, turns it into a list of weeks with VALUES, and drops the weeks that closed with no stock. Dividing by COUNTROWS of what survives is what keeps a broken week from diluting the average.",
    },
    {
      type: "code",
      caption:
        "Rate of sale over in-stock weeks only. Change WeeksBack to move the window.",
      code: "Rate of Sale 4W =\nVAR WeeksBack = 4\nVAR LastDay = MAX ( 'Date'[Date] )\nVAR Window =\n    DATESINPERIOD ( 'Date'[Date], LastDay, - WeeksBack * 7, DAY )\nVAR WeeksInWindow =\n    CALCULATETABLE ( VALUES ( 'Date'[Week Key] ), Window )\nVAR InStockWeeks =\n    FILTER ( WeeksInWindow, [Closing Stock Units] > 0 )\nVAR UnitsSold =\n    CALCULATE ( [Sales Units], InStockWeeks )\nRETURN\n    DIVIDE ( UnitsSold, COUNTROWS ( InStockWeeks ) )",
    },
    {
      type: "p",
      text: "Cover itself is then one line.",
    },
    {
      type: "code",
      code: "Weeks of Cover 4W =\nDIVIDE ( [Closing Stock Units], [Rate of Sale 4W] )",
    },
    {
      type: "p",
      text: "Use DIVIDE rather than the division operator. When the rate of sale is zero, because the style sold nothing in the window, DIVIDE returns blank, and blank is the honest answer: stock that is not selling has no finite cover. Microsoft's guidance is to prefer DIVIDE for exactly this case and to leave the blank alone instead of passing a third argument that turns it into a zero. A zero would sort next to the fastest sellers in the range and get read as no stock problem.",
    },
    {
      type: "p",
      text: "One display decision belongs in the report rather than the model. Cover of 180 weeks and cover of 900 weeks carry the same message, so cap the visual at a number the business recognises and keep the blank visible as its own state.",
    },
    {
      type: "code",
      caption: "A capped version for the visual. The blank stays blank.",
      code: "Weeks of Cover (capped) =\nVAR Cover = [Weeks of Cover 4W]\nRETURN\n    IF ( ISBLANK ( Cover ), BLANK (), MIN ( Cover, 52 ) )",
    },
    {
      type: "h2",
      id: "stock-turn",
      text: "How Weeks of Cover Converts to Stock Turn",
    },
    {
      type: "formula",
      text: "Weeks of cover = 52 ÷ annual stock turns",
    },
    {
      type: "p",
      text: "Cover and stock turn are the same fact in two units. Four turns a year is thirteen weeks of average cover; thirteen weeks of average cover is four turns. This is worth knowing because the two numbers are usually owned by different people: the finance review talks in turns, the Monday trading meeting talks in weeks, and the conversion stops the two from drifting into separate versions of the truth.",
    },
    {
      type: "p",
      text: "The identity holds on averages across a year. Do not apply it to a single week of a seasonal range.",
    },
    {
      type: "h2",
      id: "forward-cover",
      text: "Forward Weeks of Cover for Seasonal Ranges",
    },
    {
      type: "p",
      text: "Backward-looking cover breaks on anything with a season, because the next four weeks will not look like the last four. For a coat in week 40, history understates what is coming; for the same coat in week 2, history overstates it badly.",
    },
    {
      type: "formula",
      text: "Forward weeks of cover = stock on hand ÷ forecast weekly units",
    },
    {
      type: "p",
      text: "In DAX this is the same measure with the forecast table in place of the sales fact. The decision is organisational rather than technical: forward cover is only worth building if a weekly forecast exists and somebody owns it. A forward cover driven by a forecast nobody maintains is worse than a trailing average, because it carries the same authority with none of the evidence.",
    },
    {
      type: "h2",
      id: "targets",
      text: "Weeks of Cover Targets by Category",
    },
    {
      type: "p",
      text: "There is no universal target. Cover is right when it matches lead time, season length and how much risk the business will carry, and all three are yours rather than the industry's.",
    },
    {
      type: "p",
      text: "Two anchors help. The first is arithmetic: a minimum cover below the replenishment lead time guarantees a stockout, so the floor is lead time plus a buffer, which Toolio's planning guidance puts at about 25% — an eight-week lead time gives a ten-week minimum. The second is the turn benchmark converted with 52 ÷ turns.",
    },
    {
      type: "table",
      caption:
        "Category turn benchmarks published by Toolio in 2024, converted to weeks of cover.",
      columns: [
        {
          label: "Category",
          kind: "text",
        },
        {
          label: "Annual turns",
          kind: "text",
        },
        {
          label: "Implied weeks of cover",
          kind: "text",
        },
      ],
      rows: [
        {
          cells: ["Footwear", "3–5×", "10–17"],
        },
        {
          cells: ["Apparel and fashion", "3–4×", "13–17"],
        },
        {
          cells: ["Sporting goods", "3–4×", "13–17"],
        },
        {
          cells: ["Home and furniture", "2–3×", "17–26"],
        },
        {
          cells: ["Luxury and jewellery", "1–2×", "26–52"],
        },
      ],
    },
    {
      type: "p",
      text: "Read these as the shape of the distribution, not as a target to hit. They are one vendor's published figures, they cover whole categories rather than your channel mix, and an own-brand retailer with an eighteen-week critical path has a different floor from a wholesaler buying in season.",
    },
    {
      type: "h2",
      id: "mistakes",
      text: "Five Mistakes That Make Weeks of Cover Wrong",
    },
    {
      type: "list",
      items: [
        "Summing stock over weeks. Without a semi-additive measure, a quarter column adds thirteen weekly snapshots together and reports cover of several years.",
        "Leaving out-of-stock weeks in the rate of sale. Demand is understated, cover is overstated, and the replenishment goes to the wrong styles.",
        "Mixing the windows. A four-week cover on one page and a season-to-date cover on another, both labelled cover, produce two true numbers and one argument.",
        "Turning the blank into a zero. Non-sellers then sort with the best performers and disappear from the markdown list.",
        "Averaging cover across styles. The average of a cover column is not the cover of the range: divide total stock by the total rate of sale instead, which is what these measures already do at every level.",
      ],
    },
  ],
  faqTitle: "Weeks of Cover FAQ",
  faq: [
    {
      question: "What is a good weeks of cover?",
      answer:
        "There is no universal figure. The floor is the replenishment lead time plus a buffer of around 25%, so an eight-week lead time means a ten-week minimum. Above that, the target follows the season: a twelve-week range should be approaching zero cover at week twelve, while a continuity line can sit at fifteen weeks all year. Converting a turn target with 52 ÷ turns gives a sanity check — three to four turns a year, typical of apparel, implies thirteen to seventeen weeks of average cover.",
    },
    {
      question: "What is the difference between weeks of cover and stock turn?",
      answer:
        "They are the same fact in different units, linked by weeks of cover = 52 ÷ annual turns. Cover states how long the stock lasts at the current rate of sale, which suits a weekly trading meeting. Turn states how many times the stock is replaced in a year, which suits a finance review. Four turns and thirteen weeks of cover describe the same business.",
    },
    {
      question: "Is weeks of cover the same as weeks of supply?",
      answer:
        "In practice, yes — most retail teams use the two terms for the same calculation of stock divided by weekly rate of sale. The distinction that does matter is the data behind them: cover on historical sales looks backwards, while forward cover divides the same stock by a forecast rate of sale.",
    },
    {
      question: "How do you calculate weeks of cover in Power BI?",
      answer:
        "With three measures. One returns closing stock as a semi-additive value, taking the last snapshot date rather than summing the snapshots. One returns the rate of sale, averaging units sold over a fixed number of trailing weeks but counting only the weeks that ended in stock. The third divides the two with DIVIDE, so a style with no sales returns blank rather than an error or a misleading zero.",
    },
    {
      question:
        "Why do two reports show different weeks of cover for the same style?",
      answer:
        "Almost always because they average the rate of sale over different windows. On a decaying sales curve a season-to-date average keeps the high early weeks in the denominator and reports far lower cover than a four-week average of the same style in the same week. Both are arithmetically correct, which is why the window belongs in the column header.",
    },
  ],
  seo: {
    title: "Weeks of Cover in Power BI: DAX Measure and Formula",
    description:
      "The weeks of cover formula, why the averaging window changes the answer, and a DAX measure for Power BI that counts only in-stock weeks.",
  },
};
