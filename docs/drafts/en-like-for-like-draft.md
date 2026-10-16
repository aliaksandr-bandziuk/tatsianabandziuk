# Like-for-Like Sales in DAX: Comparable Stores and Aligned Weeks

**Meta title:** Like-for-Like Sales in DAX: Comparable Stores (49)
**Meta description:** How like-for-like sales are defined, the two methods of choosing comparable stores, and the DAX that keeps both years on the same store set. (143)
**Slug:** `/blog/like-for-like-sales-dax`
**Category:** Power BI · **Service:** Power BI dashboards · **Related case:** weekly retail trading report

---

Like-for-like sales compare this period with the same period last year using only the stores that traded in both. Everything difficult about it sits in the word "only": which stores qualify, which weeks of theirs count, and whether the same set is used on both sides of the comparison.

Get that wrong and the measure still returns a number. It is the number that makes a bad year look flat.

## What Like-for-Like Sales Actually Measure

The purpose is to separate trading performance from estate changes. A chain that opened twenty stores will grow total sales whatever happens in the shops it already had; like-for-like strips the new ones out and answers a narrower question — did the existing business sell more.

There is no standard definition. Each retailer sets its own and states it in its filings, which is why two chains reporting "LFL +3%" are not necessarily comparable with each other. Macy's, answering an SEC comment on exactly this, described its rule as sales from stores in operation throughout both periods being compared, with remodels, expansions and relocations staying in the calculation unless the store closed for any significant period, closed stores removed once the closure is announced, and all internet sales included.

Three decisions are hiding in that one sentence, and your model has to answer all three:

- **How long a store must have traded** to qualify at all.
- **What happens to a store that was shut for a refit** in the middle of the comparison.
- **Whether e-commerce is in or out** — and if the chain has click-and-collect, which side that revenue sits on.

None of these have a right answer. They have an answer your business has chosen, which has to be written down, because a measure that silently encodes one of them is a measure nobody can audit.

## Store-Based and Store-Period: The Two Ways to Choose Comparable Stores

The two methods differ in what they exclude, and the choice changes the number.

**Store-based.** A store either qualifies or it does not. It qualifies when it has enough trading history to cover both periods in full — thirteen months for a month-on-month read, the current year plus the whole prior year for year to date. One store that opened mid-way through last year is dropped entirely, including the months where a perfectly good comparison exists.

**Store-period.** Eligibility is decided per store and per week rather than per store. A store that opened in week 5 of last year contributes weeks 5 to 52 and nothing earlier. Nothing usable is thrown away, and the comparison stays honest because the same weeks are excluded on both sides.

[FIGURE: like-for-like-store-weeks.svg — five stores over thirteen weeks, last year and this year side by side, with the weeks that count as comparable outlined.]

Store-period is the better method and the one worth building. It is also the one that needs a model behind it, because eligibility is no longer an attribute of the store — it is a fact about a store and a week.

## The Rule Belongs in a Table, Not in a Measure

Comparable-store eligibility is a business rule with exceptions: refits, relocations, announced closures, a store that traded four days of its opening week. Those exceptions arrive by email, not by formula, so the rule belongs in a maintained table that somebody owns.

What the model needs is one table at store-and-week grain:

| Column | What it holds |
|---|---|
| `Store Key` | The store |
| `Week Index` | A comparable week for that store, on the continuous index of the retail calendar |
| `LY Week Index` | The week it compares with, read from the calendar rather than computed as minus 52 |

Build it in Power Query or upstream in the warehouse, with active relationships to the store table and to the retail calendar. Every row in it is a promise: this store, this week, has a valid counterpart last year.

A store-week belongs in the table when the store traded in that week **and** traded in its counterpart week last year. Deriving "traded" from the sales fact is the quick version and it is wrong at the edges — a store open with no sales in a quiet week looks closed — so where a store trading calendar exists, use it.

## The DAX for Like-for-Like Sales

With that table in the model, the measures are short, and the whole point is that both of them read the same rows.

```dax
Sales LFL =
VAR Pairs =
    SELECTCOLUMNS (
        'Comparable Store Weeks',
        "@Store", 'Comparable Store Weeks'[Store Key],
        "@Week", 'Comparable Store Weeks'[Week Index]
    )
RETURN
    CALCULATE (
        [Sales Value],
        KEEPFILTERS ( TREATAS ( Pairs, Store[Store Key], 'Retail Calendar'[Week Index] ) )
    )
```

```dax
Sales LFL LY =
VAR Pairs =
    SELECTCOLUMNS (
        'Comparable Store Weeks',
        "@Store", 'Comparable Store Weeks'[Store Key],
        "@Week", 'Comparable Store Weeks'[LY Week Index]
    )
RETURN
    CALCULATE (
        [Sales Value],
        REMOVEFILTERS ( 'Retail Calendar' ),
        TREATAS ( Pairs, Store[Store Key], 'Retail Calendar'[Week Index] )
    )
```

```dax
LFL % =
DIVIDE ( [Sales LFL] - [Sales LFL LY], [Sales LFL LY] )
```

The two measures are deliberately near-identical: the only difference is which column of the same filtered rows they project. `'Comparable Store Weeks'` is filtered by whatever weeks the user has selected before either measure runs, so the LY side follows the selection instead of being recomputed from dates.

`REMOVEFILTERS` on the calendar in the second measure is what lets last year's weeks through. Without it the filter from the slicer and the filter from `TREATAS` intersect to nothing, and the measure returns blank — the single most common way this pattern is broken.

## Why Like-for-Like Needs Aligned Weeks

Comparing week 42 with week 42 only works if the two weeks are the same part of the season. On an ordinary calendar they are not: dates drift by a day or two each year, Easter moves by weeks, and a 53-week year shifts everything after it by one.

This is why `LY Week Index` is read from the retail calendar rather than written as `Week Index - 52` inside the measure. The retail calendar holds the alignment, including the restatement across a 53-week year, and the like-for-like measures inherit it. A like-for-like built on calendar dates carries a calendar artefact that nobody can separate from trading.

## Mistakes in Like-for-Like Measures

1. **Filtering the current period and not last year.** The classic. This year counts comparable stores only, last year counts everything, and the growth number is pure estate change.
2. **Deciding eligibility from a measure instead of a table.** It works until somebody slices by category, at which point a store with no sales in that category looks closed and silently leaves the comparison.
3. **Subtracting 52 inside the measure.** Correct until the 53-week year, then quietly wrong for twelve months.
4. **Dropping a whole store because it opened mid-way through last year.** The store-based method throws away months of valid comparison; store-period keeps them.
5. **Leaving e-commerce undecided.** Including online in one year's figure and not the other produces growth nobody can explain, and in a chain with click-and-collect the question has a third answer that also needs writing down.
6. **Reporting the percentage without the store count.** "LFL +3% across 180 of 214 stores" is a fact. "LFL +3%" is a claim.

---

**Sources used in this draft**

- [Macy's, Inc. — SEC correspondence, 2008](https://www.sec.gov/Archives/edgar/data/0000794367/000079436708000139/filename1.htm) — a retailer's own comparable-store definition: stores in operation throughout both periods, treatment of remodels, relocations and announced closures, and the inclusion of internet sales.
- [Same-store sales — Wikipedia](https://en.wikipedia.org/wiki/Same-store_sales) — the store-based and store-period methods and the trading-history thresholds each implies.
- [4-5-4 Calendar — National Retail Federation](https://nrf.com/resources/4-5-4-calendar) — week alignment and the 53-week year.
