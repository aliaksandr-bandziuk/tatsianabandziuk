# Star Schema for Retail Sales and Stock in Power BI

**Meta title:** Star Schema for Retail Sales and Stock in Power BI (49)
**Meta description:** How to model retail sales and a weekly stock snapshot in Power BI: two fact tables, shared dimensions, and why the facts are never joined. (139)
**Slug:** `/blog/retail-star-schema-power-bi`
**Category:** Power BI · **Service:** Power BI dashboards · **Related case:** weekly retail trading report

---

A retail model has two fact tables, not one: sales at store, SKU and day, and a stock snapshot at store, SKU and week. They share three dimensions — the retail calendar, the product and the store — and they are never related to each other.

That last sentence is the whole design. Almost every broken retail model is broken because somebody joined stock to sales to get them on one page.

## What Goes in a Fact Table and What Goes in a Dimension

Microsoft's own guidance puts it plainly: dimension tables describe the things you model, fact tables store observations or events, and the type is not a setting — it follows from the relationships, because "the 'one' side is always a dimension table while the 'many' side is always a fact table." Two rules from the same page are worth pinning above the model: "avoid mixing the two types together for a single table", and "it's also important that fact tables always load data at a consistent grain."

The distinction the guidance draws between dimensionality and granularity is the one that matters in retail. Dimensionality is which key columns a fact has. Granularity is what the values of those keys mean — one row per store, SKU and day is a different table from one row per store, SKU and week, even though both carry the same three keys.

## The Retail Model: Two Fact Tables at Different Grain

[FIGURE: retail-star-schema.svg — three dimensions across the top, two fact tables below, with a crossed-out link between them.]

**Sales** is transactional: one row per store, SKU and day, carrying units, net sales value, cost and returns. It only has rows where something happened.

**Stock snapshot** is a photograph: one row per store, SKU and week, carrying units and cost value, written whether or not anything moved. It has rows for every combination that exists, which is why it is usually the larger table despite the coarser grain.

The three dimensions are shared, and that sharing is what makes the model work. Filter a category on the Product table and both facts respond. Select four weeks on the calendar and both facts narrow to those weeks. No measure has to know about the other fact table.

## Why Sales and Stock Must Not Be Related to Each Other

The temptation is obvious: both tables have store, SKU and a date, so a relationship looks available. It is not, for three reasons.

**The keys are not unique on either side.** A relationship needs a "one" side. Neither fact has one: a store-SKU-day appears many times in sales and a store-SKU-week many times in stock. Power BI will either refuse the relationship or create a many-to-many that fans the rows out and multiplies every total.

**The grains do not line up.** Sales has rows on days; stock has rows on week-ending dates. Joined on date, six days in seven match nothing and the stock disappears.

**It is not needed.** Both facts already share the dimensions, which is the entire purpose of a star schema. A measure that needs both — cover, sell-through, GMROI — reads one measure from each fact in the same filter context and divides. Nothing has to be joined for that to work.

```dax
Weeks of Cover =
DIVIDE ( [Closing Stock Units], [Rate of Sale 4W] )
```

Those two measures come from different fact tables. They agree because the filter context is the same for both, not because the tables are connected.

## Handling the Grain Difference Between Daily Sales and a Weekly Snapshot

The snapshot relates to the calendar on its snapshot date, like any other fact. The grain difference is handled in the measure, not in the relationship, because stock does not sum over time: a month column that adds four weekly snapshots reports four times the stock the business holds.

```dax
Closing Stock Units =
VAR MaxStockDate =
    CALCULATE (
        MAX ( Stock[Date] ),
        ALLEXCEPT ( Stock, 'Retail Calendar' )
    )
VAR Result =
    CALCULATE (
        SUM ( Stock[Units] ),
        'Retail Calendar'[Date] = MaxStockDate
    )
RETURN
    Result
```

Where a fact's grain is genuinely coarser than the dimension it is joined to — stock held only at category level, say, rather than SKU — the choice is between relating at the coarser level and accepting that finer slices show blank, or leaving the table unrelated and simulating the join in DAX. Marco Russo's advice on that fork is to take the simpler path unless performance forces the other: a physical relationship needs ETL work and dummy rows; the DAX version is more flexible and more verbose.

## Role-Playing Dates: Order, Delivery and Intake

Retail facts carry more than one date. An intake line has an order date, a planned delivery date and an actual receipt date, and all three want the same calendar.

Only one relationship between two tables can be active at a time. The guidance offers two ways round it: duplicate the date table per role, which it calls the accepted approach and notes the cost is "rarely a concern" because dimensions are small, or keep one calendar with inactive relationships and activate the one you need inside the measure with `USERELATIONSHIP`.

Duplicate tables are easier for report users, who see "Delivery Date" in the field list and pick it. Inactive relationships keep the model smaller and the logic in the measures. For a trading report that mostly reads one date, inactive relationships are enough; for a supply-chain model where every page slices by a different date, duplicate the table.

## Where the Retail Calendar Fits in the Model

The date dimension in a retail model is the 4-5-4 retail calendar, not a Gregorian date table: it carries the week index, the period, the quarter and the mapping to last year's week. Every year-on-year measure in the model is an offset on those columns rather than a call to a time intelligence function.

This is also the one dimension both facts must share without exception. If sales join a daily calendar and stock joins a separate week table, nothing lines up and every combined measure needs a translation step that will eventually disagree with itself.

## Mistakes in Retail Data Models

1. **One flat table.** Sales, product attributes and stock in a single sheet imported from Excel. It works at ten thousand rows and collapses at ten million, and every attribute change rewrites history.
2. **Joining the two fact tables.** The rows fan out and every total is wrong in a way that looks plausible.
3. **Summing the stock snapshot over time.** The most common wrong number in retail reporting.
4. **Attributes on the fact table.** Category and season live on Product. A category column on the sales fact means last season's sales re-categorise themselves the day somebody moves the SKU.
5. **A Gregorian date table in a business that trades on a retail calendar.** Everything works until the first year-on-year comparison.
6. **No store close date.** Without it, a closed store silently stays in every comparison and nobody can build like-for-like.

---

**Sources used in this draft**

- [Understand star schema and the importance for Power BI — Microsoft Learn](https://learn.microsoft.com/en-us/power-bi/guidance/star-schema) — fact and dimension definitions, dimensionality versus granularity, the consistent-grain rule, role-playing dimensions.
- [How to handle fact tables with different granularities — SQLBI](https://www.sqlbi.com/blog/marco/2014/05/01/how-to-handle-fact-tables-with-different-granularities-in-dax-powerpivot-tabular/) — relating at the coarser level versus simulating the join in DAX, and the advice to prefer the simpler approach.
- [Semi-additive calculations — DAX Patterns](https://www.daxpatterns.com/semi-additive-calculations/) — the last-date-with-data pattern behind the closing stock measure.

**Note:** Microsoft's star schema page does not cover snapshot fact tables, semi-additive measures or fact-to-fact relationships at all. That gap is what this article is for.
