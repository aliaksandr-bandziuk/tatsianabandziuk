# Weeks of Cover in Power BI: DAX Measure and Formula

**Meta title:** Weeks of Cover in Power BI: DAX Measure and Formula (50 characters)
**Meta description:** The weeks of cover formula, why the averaging window changes the answer, a DAX measure for Power BI, and how cover converts to stock turn. (140 characters)
**Slug:** `/blog/weeks-of-cover-power-bi-dax`
**Category:** Power BI · **Service:** Power BI dashboards · **Related case:** weekly retail trading report

---

Weeks of cover is stock on hand divided by the weekly rate of sale. If a style has 290 units left and sells 29 units a week, it has 10 weeks of cover: at the current rate, the stock runs out in ten weeks.

The formula is the easy part. Two teams can report different cover for the same style on the same day and both be arithmetically correct, because cover depends on a choice nobody writes down: which weeks of sales go into the average. This article fixes the definition, shows what the choice does to the number, and gives the DAX that puts it in a Power BI model.

## What Weeks of Cover Measures in Retail

Weeks of cover answers one question: how long will the stock last. It is also called weeks of supply, and in most retail teams the two terms are interchangeable.

What makes it useful is that it is stated in time, not in units or money. "4,000 units of stock" means nothing without a sales rate behind it. "Ten weeks of cover in week 12 of a twelve-week season" means the range will not clear, and everyone in the trading meeting understands it in the same second.

Cover is a forward-looking read on stock made out of backward-looking data. That is exactly where it goes wrong.

## The Weeks of Cover Formula and a Worked Example

> Weeks of cover = stock on hand ÷ average weekly units sold

Two decisions sit inside it:

- **Which stock.** Closing stock for the week being reported, or opening stock for the week ahead. Closing stock is the normal choice for a trading report, because that is what you have when the meeting starts. Toolio's planning guidance writes the formula with beginning-of-period inventory, which is the same number one week shifted; what matters is that one definition is used everywhere.
- **Which weeks of sales.** The subject of the next two sections.

A worked example. One style, 1,200 units received, twelve weeks on sale:

| Week | Units sold | Closing stock |
|---|---|---|
| 1 | 180 | 1,020 |
| 2 | 150 | 870 |
| 3 | 120 | 750 |
| 4 | 95 | 655 |
| 5 | 80 | 575 |
| 6 | 70 | 505 |
| 7 | 55 | 450 |
| 8 | 45 | 405 |
| 9 | 40 | 365 |
| 10 | 30 | 335 |
| 11 | 25 | 310 |
| 12 | 20 | 290 |

In week 12 the style has 290 units left. On the last four weeks it sold 115 units, 28.75 a week, so cover is 10.1 weeks. On the whole season it sold 910 units, 75.8 a week, so cover is 3.8 weeks. Same stock, same week, same formula. The answer differs by a factor of 2.6.

## Choosing the Rate of Sale Window for Weeks of Cover

[FIGURE: weeks-of-cover-windows.svg — "Same stock, two averaging windows". Line chart, weeks 4–12, two series: cover on a four-week rate of sale rising 4.8 → 10.1, cover on a season-to-date rate of sale falling 4.8 → 3.8.]

The two lines start on the same number in week 4 and never meet again. The reason is in the sales curve, not in the stock: demand decays, and a long window keeps feeding the average with the high early weeks.

That gives a rule worth remembering in both directions:

- **On a declining curve, a long window hides overstock.** Season-to-date cover says 3.8 weeks — comfortable, sell it through. The style is in fact selling 20 units a week and will not clear.
- **On a rising curve, a long window hides a stockout.** The same arithmetic in reverse: the average lags the acceleration, cover looks longer than it is, and the replenishment does not get raised.

In a weekly trading report, a four-week rate of sale is the sane default. It is short enough to follow the trend and long enough to survive one odd week of weather or a promotion. Toolio's examples use four-week and eight-week trailing averages for the same reason. Use season-to-date for one job only: judging how a whole range has performed after it has finished.

Whichever window you pick, put it in the column header. `Cover (4wk)` is a measure. `Cover` is an argument waiting to happen.

## Why Out-of-Stock Weeks Must Leave the Rate of Sale

A week in which a size ran out on Tuesday is not a week of demand. Leave it in the average and the rate of sale drops, cover rises, and the system recommends holding stock of something that was actually selling faster than you think.

The fix is to average over in-stock weeks only. Toolio puts the size of the error at roughly 30% or more of demand understated when zero-inventory weeks are included — treat that as an order of magnitude rather than a constant, since it depends entirely on how often you break.

This is the single correction that most home-built cover reports are missing, and it is the reason the DAX below counts its weeks instead of dividing by a fixed four.

## A Weeks of Cover DAX Measure for Power BI

Three measures. The model is a star schema: a `Date` table, a `Sales` fact at day or week grain, and a `Stock` snapshot table with one row per product, location and date.

**1. Closing stock is semi-additive — it does not sum over time.** Stock adds up across stores and styles, but across weeks you want the last value, not the total. The pattern below takes the last date that actually has a snapshot, which survives a model where stock is loaded weekly rather than daily. It follows the "first and last date with data" pattern published by DAX Patterns; `ALLEXCEPT` is what makes every row of the matrix and the total agree on the same date instead of each finding its own.

```dax
Closing Stock Units =
VAR MaxStockDate =
    CALCULATE (
        MAX ( Stock[Date] ),
        ALLEXCEPT ( Stock, 'Date' )
    )
VAR Result =
    CALCULATE (
        SUM ( Stock[Units] ),
        'Date'[Date] = MaxStockDate
    )
RETURN
    Result
```

**2. Rate of sale over in-stock weeks.** `DATESINPERIOD` builds the window, `VALUES` turns it into a list of weeks, and the `FILTER` drops the weeks that closed with no stock. Dividing by `COUNTROWS` of what survives is what keeps a broken week from diluting the average.

```dax
Rate of Sale 4W =
VAR WeeksBack = 4
VAR LastDay = MAX ( 'Date'[Date] )
VAR Window =
    DATESINPERIOD ( 'Date'[Date], LastDay, - WeeksBack * 7, DAY )
VAR WeeksInWindow =
    CALCULATETABLE ( VALUES ( 'Date'[Week Key] ), Window )
VAR InStockWeeks =
    FILTER ( WeeksInWindow, [Closing Stock Units] > 0 )
VAR UnitsSold =
    CALCULATE ( [Sales Units], InStockWeeks )
RETURN
    DIVIDE ( UnitsSold, COUNTROWS ( InStockWeeks ) )
```

**3. Cover itself.**

```dax
Weeks of Cover 4W =
DIVIDE ( [Closing Stock Units], [Rate of Sale 4W] )
```

Use `DIVIDE`, not the `/` operator. When the rate of sale is zero — a style that sold nothing in the window — `DIVIDE` returns blank, and blank is the honest answer: stock that is not selling has no finite cover. Microsoft's own guidance is to prefer `DIVIDE` for exactly this case, and to leave the blank alone rather than passing a third argument that turns it into a zero. A zero would sort next to the fastest sellers in the range and get read as "no stock problem".

One display decision belongs in the report, not the model: cover of 180 weeks and cover of 900 weeks are the same message. Cap the visual at a number the business recognises, and keep the blank visible as its own state:

```dax
Weeks of Cover (capped) =
VAR Cover = [Weeks of Cover 4W]
RETURN
    IF ( ISBLANK ( Cover ), BLANK (), MIN ( Cover, 52 ) )
```

## How Weeks of Cover Converts to Stock Turn

Cover and stock turn are the same fact in two units:

> Weeks of cover = 52 ÷ annual stock turns

Four turns a year is thirteen weeks of average cover. Thirteen weeks of average cover is four turns. This is worth knowing because the two numbers are usually owned by different people: the finance review talks in turns, the Monday trading meeting talks in weeks, and the conversion stops the two from drifting into separate versions of the truth.

The conversion holds on averages across a year. Do not apply it to a single week of a seasonal range.

## Forward Weeks of Cover for Seasonal Ranges

Backward-looking cover breaks on anything with a season, because the next four weeks will not look like the last four. For a coat in week 40, history understates what is coming; for the same coat in week 2, history overstates it badly.

Forward weeks of cover divides the same stock by **forecast** weekly units instead of historical ones:

> Forward weeks of cover = stock on hand ÷ forecast weekly units

In DAX this is the same measure with the forecast table in place of the sales fact. The decision is organisational, not technical: forward cover is only worth building if a weekly forecast exists and somebody owns it. A forward cover driven by a forecast nobody maintains is worse than a trailing average, because it carries the same authority with none of the evidence.

## Weeks of Cover Targets by Category

There is no universal target. Cover is right when it matches lead time, season length and how much risk the business will carry — and all three are yours, not the industry's.

Two anchors are useful. The first is arithmetic: a minimum cover below the replenishment lead time guarantees a stockout, so the floor is lead time plus a buffer. Toolio's planning guidance puts that buffer at about 25% — an eight-week lead time gives a ten-week minimum.

The second is the turn benchmark, converted with `52 ÷ turns`. Toolio's 2024 category figures:

| Category | Annual turns | Implied weeks of cover |
|---|---|---|
| Footwear | 3–5× | 10–17 |
| Apparel and fashion | 3–4× | 13–17 |
| Sporting goods | 3–4× | 13–17 |
| Home and furniture | 2–3× | 17–26 |
| Luxury and jewellery | 1–2× | 26–52 |

Read these as the shape of the distribution, not as a target to hit. They are one vendor's published figures, they cover whole categories rather than your channel mix, and an own-brand retailer with an eighteen-week critical path has a different floor from a wholesaler buying in-season.

## Five Mistakes That Make Weeks of Cover Wrong

1. **Summing stock over weeks.** Without a semi-additive measure, a quarter column shows thirteen weeks of stock added together and cover of several years. The measure above fixes it; a plain `SUM` does not.
2. **Leaving out-of-stock weeks in the rate of sale.** Demand is understated, cover is overstated, and the replenishment goes to the wrong styles.
3. **Mixing the windows.** A dashboard with a four-week cover on one page and a season-to-date cover on another, both labelled "cover", produces two true numbers and one argument.
4. **Turning the blank into a zero.** Non-sellers then sort with the best performers and disappear from the markdown list.
5. **Averaging cover across styles.** The average of a cover column is not the cover of the range. Divide total stock by the total rate of sale instead — the measures above already do this at every level, which is the point of writing them as measures rather than as a calculated column.

---

**Sources used in this draft**

- [Semi-additive calculations — DAX Patterns](https://www.daxpatterns.com/semi-additive-calculations/) — the "first and last date with data" pattern and the `ALLEXCEPT` reasoning.
- [DIVIDE function (DAX) — Microsoft Learn](https://learn.microsoft.com/en-us/dax/divide-function-dax) and [DIVIDE function vs divide operator](https://learn.microsoft.com/en-us/dax/best-practices/dax-divide-function-operator) — blank on division by zero.
- [Avoid converting BLANKs to values in DAX — Microsoft Learn](https://learn.microsoft.com/en-us/dax/best-practices/dax-avoid-converting-blank) — why the blank should stay a blank.
- [How to calculate weeks of supply and set target levels — Toolio](https://www.toolio.com/post/how-to-calculate-weeks-of-supply-and-set-target-levels) — BOP-based formula, in-stock-weeks correction, lead time plus 25%, 2024 category turn benchmarks.
