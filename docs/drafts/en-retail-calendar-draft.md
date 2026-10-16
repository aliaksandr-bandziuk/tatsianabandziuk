# 4-5-4 Retail Calendar in Power BI: How to Build the Table

**Meta title:** 4-5-4 Retail Calendar in Power BI: How to Build It (54)
**Meta description:** The columns a 4-5-4 retail calendar needs, DAX that builds the table, why Power BI time intelligence breaks on it, and what the 53rd week does. (148)
**Slug:** `/blog/retail-calendar-454-power-bi`
**Category:** Power BI · **Service:** Power BI dashboards · **Related case:** weekly retail trading report

---

A 4-5-4 retail calendar divides the year into four quarters of thirteen weeks, each quarter split into months of four, five and four weeks. Weeks run Sunday to Saturday, and the year ends on the Saturday closest to 31 January — retail 2026 runs from Sunday 1 February 2026 to Saturday 30 January 2027.

In Power BI it replaces the ordinary date table. That has one consequence most teams discover late: the built-in time intelligence functions stop being correct, and every year-on-year measure has to be written by hand.

## What a 4-5-4 Retail Calendar Is

The National Retail Federation publishes the calendar as a voluntary industry guide, derived in the 1930s. The point of it is comparability: four-week and five-week months hold the same number of Saturdays and Sundays from one year to the next, and holidays stay in the same week. Weekends carry a disproportionate share of retail sales, so under an ordinary calendar a month with five Saturdays looks like growth that never happened.

The structure is fixed:

| Quarter | Months | Weeks |
|---|---|---|
| Q1 | February, March, April | 4 + 5 + 4 = 13 |
| Q2 | May, June, July | 4 + 5 + 4 = 13 |
| Q3 | August, September, October | 4 + 5 + 4 = 13 |
| Q4 | November, December, January | 4 + 5 + 4 = 13 |

[FIGURE: retail-calendar-454.svg — the 52 weeks of a retail year laid out in four quarter rows, grouped 4-5-4 into periods, with the 53rd week shown as an occasional addition at the end.]

Retail months are defined by weeks, not by dates, so a retail month starts and ends partway through a Gregorian one. Retail March 2026 runs from 1 March to 4 April. This is the part that confuses everyone outside the planning team for their first season, and it is why the calendar table has to carry a readable period label, not just a number.

## The Columns a Retail Calendar Table Needs

| Column | What it is for |
|---|---|
| `Date` | One row per day, contiguous. Required for Power BI to accept the table as a date table |
| `Week Index` | A continuous integer across the whole calendar, not restarting each year. Every year-on-year measure is an offset on this column |
| `Retail Year` | The year the week belongs to, which is not the Gregorian year of the date |
| `Week of Year` | 1 to 52, or 53 |
| `Period` and `Period Name` | 1 to 12, plus a label such as "Mar 26". Numbers sort, labels get read |
| `Quarter` | 1 to 4 |
| `Week of Quarter` | 1 to 13, the column the 4-5-4 split is derived from |
| `LY Week Index` | The week index this week compares with. Usually `Week Index − 52`, but not always — see the 53rd week below |
| `Is Current Week` | A calculated flag, so the report opens on the right week without a slicer |

`Week Index` and `LY Week Index` are the two that matter most, and they are the two most often missing. Without them every comparison measure has to recompute the alignment, and each one does it slightly differently.

## Building the 4-5-4 Calendar Table in DAX

The arithmetic is all integer division on the week index, which is why it is worth generating rather than maintaining by hand.

```dax
Retail Calendar =
VAR FirstDay = DATE ( 2021, 1, 31 )   -- the Sunday the earliest retail year starts
VAR LastDay = DATE ( 2028, 1, 29 )    -- the Saturday the latest one ends
VAR Base =
    ADDCOLUMNS (
        CALENDAR ( FirstDay, LastDay ),
        "Week Index", QUOTIENT ( DATEDIFF ( FirstDay, [Date], DAY ), 7 )
    )
VAR WithYear =
    ADDCOLUMNS (
        Base,
        "Retail Year", YEAR ( FirstDay ) + QUOTIENT ( [Week Index], 52 ),
        "Week of Year", MOD ( [Week Index], 52 ) + 1
    )
VAR WithQuarter =
    ADDCOLUMNS (
        WithYear,
        "Quarter", QUOTIENT ( [Week of Year] - 1, 13 ) + 1,
        "Week of Quarter", MOD ( [Week of Year] - 1, 13 ) + 1
    )
RETURN
    ADDCOLUMNS (
        WithQuarter,
        "Period",
            ( [Quarter] - 1 ) * 3
                + IF ( [Week of Quarter] <= 4, 1, IF ( [Week of Quarter] <= 9, 2, 3 ) ),
        "LY Week Index", [Week Index] - 52
    )
```

The 4-5-4 split is the one line in the middle: weeks 1 to 4 of a quarter are its first month, 5 to 9 the second, 10 to 13 the third.

Then mark it as the date table in the model (Table tools, Mark as date table, pick `Date`). Power BI requires contiguous dates with no gaps, which `CALENDAR` guarantees; without the marking, relationships to it behave as ordinary integer joins and some visuals silently drop dates with no sales.

**This version assumes every retail year has 52 weeks.** That holds for a run of years and then does not — see below. When the range crosses a 53-week year, the year boundaries have to come from data rather than from division: a two-column table of retail year and its first day, from which the same arithmetic runs per year. Either build that in Power Query or keep it as a small maintained table. It is a dozen rows and it is worth owning.

## Why Power BI Time Intelligence Does Not Work on a Retail Calendar

`DATESYTD`, `SAMEPERIODLASTYEAR`, `TOTALYTD` and the rest assume a Gregorian structure: that every day of a month belongs to the same quarter in every year, and that the same day and month last year is the comparable period. On a week-based calendar neither assumption holds. SQLBI's analysis of week-based time intelligence gives the clean example — 1 and 2 January 2011 belong to week 52 of 2010 — and notes that the optional year-end-date argument of `DATESYTD` cannot repair it, because the period boundaries themselves move between years.

So the measures are written by hand against the calendar's own columns. For a retail calendar that means filtering on `Retail Year`, `Period` or `Week of Year` plus a date cap, instead of calling a time intelligence function.

```dax
Sales RYTD =
VAR LastWeek = MAX ( 'Retail Calendar'[Week Index] )
VAR ThisYear = SELECTEDVALUE ( 'Retail Calendar'[Retail Year] )
RETURN
    IF (
        NOT ISBLANK ( ThisYear ),
        CALCULATE (
            [Sales Value],
            REMOVEFILTERS ( 'Retail Calendar' ),
            'Retail Calendar'[Retail Year] = ThisYear,
            'Retail Calendar'[Week Index] <= LastWeek
        )
    )
```

The `IF` around it is deliberate. On a total row where several retail years are selected there is no single year to run to date, and a blank is a more honest answer than a number nobody can reconstruct.

## Last Year on a Retail Calendar

With `LY Week Index` in the table, last year is a lookup rather than a date calculation.

```dax
Sales LY =
VAR LastYearWeeks =
    TREATAS (
        SELECTCOLUMNS (
            VALUES ( 'Retail Calendar'[Week Index] ),
            "@Week", 'Retail Calendar'[LY Week Index]
        ),
        'Retail Calendar'[Week Index]
    )
RETURN
    CALCULATE (
        [Sales Value],
        REMOVEFILTERS ( 'Retail Calendar' ),
        LastYearWeeks
    )
```

Reading `LY Week Index` from the table rather than subtracting 52 inside the measure is the whole point: the correction for a 53-week year then lives in one place, and every measure built on it inherits the fix.

## What the 53rd Week Does to a Retail Calendar

A 52-week year is 364 days, so a day accumulates every year and, with leap years, the calendar drifts. The fix is a 53rd week added roughly every five or six years. NRF's rule is to add one when four or more days remain in January after week 52, and it lists 2006, 2012, 2017 and 2023 as 53-week years.

Two things break at that boundary, both quietly:

- **Week alignment.** Week index minus 52 lands a week off, so every year-on-year figure is wrong by one week for a full year. Nothing errors; the numbers just stop meaning what the label says.
- **Year-on-year totals.** A 53-week year has an extra week of trade in it. Comparing it with a 52-week year shows growth that is a week of calendar, not a week of demand.

NRF's answer to the first is restatement: shift each week back by one and ignore the first week of the 53-week year, which keeps holidays aligned. In the model that is exactly what the `LY Week Index` column is for — write the restated mapping into it once, for the two years either side of the boundary, and the measures need no special case.

For the second, there is no arithmetic fix, only disclosure: a 53-week year is reported both ways, 53 weeks against 52 for the statutory numbers and 52 against 52 for the trading read, and the report says which one a page is showing.

## Mistakes in Retail Calendar Tables

1. **Restarting the week number each year and comparing on it.** Week 1 of one year and week 1 of the next are different lengths of time from the season start when a 53rd week sits between them. Compare on a continuous index.
2. **Using built-in time intelligence anyway.** It returns numbers, which is worse than returning errors.
3. **Leaving the table unmarked as a date table.** Relationships still work, so nothing looks broken until a visual drops the weeks with no sales.
4. **Deriving the retail year with division when the range crosses a 53-week year.** The arithmetic has no way to know, so the boundary has to come from data.
5. **Hiding the period number and showing only the label.** "Mar 26" then sorts between "Jul 26" and "May 26". Sort the label by the number.

---

**Sources used in this draft**

- [4-5-4 Calendar — National Retail Federation](https://nrf.com/resources/4-5-4-calendar) — the calendar's purpose, the 53rd-week rule, the restatement method and the list of 53-week years.
- [Retail calendar explained: the 4-5-4 guide — Toolio](https://www.toolio.com/post/retail-calendar-explained-the-4-5-4-guide) — year start and end dates, Sunday-to-Saturday weeks, the quarter and month structure.
- [Week-based time intelligence in DAX — SQLBI](https://www.sqlbi.com/articles/week-based-time-intelligence-in-dax/) — why the standard functions cannot be used and what to write instead.
