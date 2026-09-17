import type { CalculatorPage, ListingPage } from "../../types";
import { calculatorPlan } from "../registry";

export const calculatorsPage: ListingPage = {
  seo: {
    title: "Free Retail Calculators: Margin, Sell-Through, GMROI",
    description:
      "Free retail calculators for fashion and retail teams: margin and markup, sell-through rate, stock turn and weeks of cover, GMROI and open-to-buy.",
  },
  eyebrow: "Retail calculators",
  h1: "Free Retail Calculators for Margin, Sell-Through and Stock",
  intro:
    "Five free retail calculators for buyers, planners and analysts: margin and markup, sell-through rate, stock turn and weeks of cover, GMROI and open-to-buy. Each one shows the formula under the result, a worked example and the mistakes I see most often in fashion retail files.",
  faqTitle: "Free Retail Calculators FAQ",
  faq: [
    {
      question: "Are the retail calculators free to use?",
      answer:
        "Yes. All five calculators are free and need no sign-up. The numbers you type stay in your browser and are not sent or stored anywhere.",
    },
    {
      question: "Which formulas do the retail calculators use?",
      answer:
        "Each calculator uses the standard retail formula and prints it under the result: gross margin on the selling price, markup on cost, sell-through on available stock, stock turn on cost of goods sold, GMROI on average inventory at cost and open-to-buy from planned sales, markdowns and stock. Every page explains the formula with a worked example.",
    },
    {
      question: "Can I use the calculators for a whole category, not just one product?",
      answer:
        "Yes. Enter category or season totals instead of unit values and the result is the category figure. Use totals rather than averaging product results, because an average of percentages overweights small styles.",
    },
  ],
  ctaTitle: "Need These Retail KPIs in a Power BI or Excel Model?",
  ctaText:
    "A calculator answers one question at a time. If you need margin, sell-through and stock cover calculated every week for every category and market, I can build the model with your team.",
};

const marginCalculator: CalculatorPage = {
  ...calculatorPlan("margin-calculator", "en"),
  cardTitle: "Margin Calculator",
  cardText: "Gross margin, markup and gross profit from cost and price, plus the price you need for a target margin.",
  breadcrumb: "Margin calculator",
  h1: { before: "Margin Calculator: Gross Margin and", accent: "Markup for Retail" },
  lead: "Enter the cost and the selling price to get the gross margin, the markup and the profit per unit; add a target margin to get the price that delivers it. Margin divides profit by the selling price, markup divides it by cost, so the same product always shows two different percentages.",
  body: [
    {
      type: "calculator",
      kind: "marginMarkup",
      title: "Margin and Markup Calculator",
      labels: {
        cost: "Cost per unit (excl. VAT)",
        price: "Selling price (excl. VAT)",
        targetMargin: "Target margin",
        margin: "Gross margin",
        markup: "Markup",
        profit: "Gross profit per unit",
        targetPrice: "Price for target margin",
      },
      note: "Margin = (price − cost) ÷ price. Markup = (price − cost) ÷ cost. Price for a target margin = cost ÷ (1 − target margin).",
    },
    { type: "h2", id: "how-to-use", text: "How to Use the Margin Calculator" },
    {
      type: "list",
      items: [
        "Enter the cost per unit. For retail I use landed cost: the purchase price plus freight, duty and agent fees.",
        "Enter the selling price without VAT. A price that includes VAT makes the margin look higher than it is.",
        "Read the gross margin, the markup and the gross profit per unit.",
        "To price a new product, enter the target margin and read the price that delivers it, then round it to a price point on your ladder.",
      ],
    },
    { type: "h2", id: "formulas", text: "Gross Margin and Markup Formulas" },
    { type: "formula", text: "gross margin % = (selling price − cost) ÷ selling price × 100" },
    { type: "formula", text: "markup % = (selling price − cost) ÷ cost × 100" },
    { type: "formula", text: "price for target margin = cost ÷ (1 − target margin)" },
    {
      type: "p",
      text: "Both percentages use the same gross profit. The only difference is the number you divide by. Markup can be above 100%, gross margin cannot. To convert one into the other without cost or price, use margin = markup ÷ (1 + markup) and markup = margin ÷ (1 − margin), with both written as decimals. I explain the difference in more detail, with a conversion table and intake versus achieved margin, in my article on markup vs margin in fashion retail.",
    },
    { type: "h2", id: "worked-example", text: "Margin Calculator Worked Example for a Jacket" },
    {
      type: "p",
      text: "Take an illustrative jacket with a landed cost of 20 and a selling price of 50, both excluding VAT. The gross profit is 30. The gross margin is 30 ÷ 50 = 60% and the markup is 30 ÷ 20 = 150%. If the buyer wants a 65% margin on the same cost, the price has to be 20 ÷ 0.35 = 57.14, which in practice becomes 57 or 59 depending on the price architecture. After rounding, check the margin again with the calculator.",
    },
    {
      type: "table",
      caption: "Illustrative jacket · cost 20, excl. VAT",
      columns: [
        { label: "Selling price", kind: "number" },
        { label: "Gross margin", kind: "number", format: "bars", suffix: "%" },
        { label: "Markup", kind: "number", suffix: "%" },
      ],
      rows: [
        { cells: [30, 33.3, 50] },
        { cells: [40, 50, 100] },
        { cells: [50, 60, 150] },
        { cells: [60, 66.7, 200] },
      ],
    },
    { type: "h2", id: "mistakes", text: "Common Mistakes with Margin and Markup Calculations" },
    {
      type: "list",
      items: [
        "Adding the target margin to cost: 20 plus 60% is 32, which is a 37.5% margin, not 60%.",
        "Calculating margin on prices that include VAT.",
        "Using the supplier price instead of landed cost, so freight and duty quietly reduce the real margin.",
        "Quoting “60%” in a pricing file without saying whether it is margin or markup.",
        "Averaging product margins instead of dividing total gross profit by total sales.",
      ],
    },
  ],
  faqTitle: "Margin Calculator FAQ",
  faq: [
    {
      question: "How do I calculate gross margin?",
      answer:
        "Subtract the cost from the selling price and divide the result by the selling price. A product bought at 20 and sold at 50 has a gross margin of 30 ÷ 50 = 60%. Use prices without VAT.",
    },
    {
      question: "How do I calculate markup?",
      answer:
        "Subtract the cost from the selling price and divide the result by the cost. The same product bought at 20 and sold at 50 has a markup of 30 ÷ 20 = 150%. Markup is what buyers add to cost when they set a price.",
    },
    {
      question: "What price do I need for a 60% margin?",
      answer:
        "Divide the cost by one minus the margin: cost ÷ 0.4. For a cost of 20 the price is 50 before VAT. Round it to a price point that fits your range and check the margin again.",
    },
    {
      question: "Why is my markup higher than my margin?",
      answer:
        "Markup divides the profit by cost, which is always smaller than the selling price, so the percentage is higher. A 100% markup equals a 50% margin. The two only look similar at low markups.",
    },
    {
      question: "Is this a retail margin calculator or a general one?",
      answer:
        "The maths is the same for any product, but the labels and advice are written for retail. In fashion I recommend landed cost and prices net of VAT, and a separate check of the margin achieved after markdowns.",
    },
  ],
  relatedPostKey: "markup-vs-margin",
  seo: {
    title: "Margin Calculator: Gross Margin and Markup for Retail",
    description:
      "Free margin calculator: gross margin, markup and profit from cost and price, and the price for a target margin. Formulas and a worked retail example.",
  },
};

const sellThroughCalculator: CalculatorPage = {
  ...calculatorPlan("sell-through-calculator", "en"),
  cardTitle: "Sell-Through Rate Calculator",
  cardText: "Sell-through on available stock and on receipts, with returns taken out of sales.",
  breadcrumb: "Sell-through calculator",
  h1: { before: "Sell-Through Rate Calculator for", accent: "Fashion and Retail" },
  lead: "This sell-through calculator shows what share of the available stock has sold, net of returns: units sold minus returns, divided by opening stock plus units received. It also gives the rate on receipts only, the version many buying teams quote for a new delivery.",
  body: [
    {
      type: "calculator",
      kind: "sellThrough",
      title: "Sell-Through Rate Calculator",
      labels: {
        opening: "Opening stock (units)",
        received: "Units received",
        sold: "Units sold",
        returned: "Units returned",
        rate: "Sell-through on available stock",
        rateReceived: "Sell-through on receipts only",
      },
      note: "Formula: (sold − returned) ÷ (opening stock + received). The second result divides by received units only.",
    },
    { type: "h2", id: "how-to-use", text: "How to Use the Sell-Through Calculator" },
    {
      type: "list",
      items: [
        "Choose the period and the scope: one style, a category or a whole season.",
        "Enter the stock at the start of the period and the units received during it.",
        "Enter the units sold and the units returned in the same period.",
        "Read the sell-through on available stock; use the receipts-only rate when the product had no opening stock or when you compare deliveries.",
      ],
    },
    { type: "h2", id: "formulas", text: "Sell-Through Rate Formulas" },
    { type: "formula", text: "sell-through % = (units sold − units returned) ÷ (opening stock + units received) × 100" },
    { type: "formula", text: "sell-through on receipts % = (units sold − units returned) ÷ units received × 100" },
    {
      type: "p",
      text: "The first formula is the one I use for seasonal fashion, because it counts every unit the business could have sold. The second is common for a single delivery or a new style. Both are only comparable if everyone agrees which one the report shows, so write the definition next to the number. My sell-through rate article covers typical ranges by category and how to build the measure in Excel and Power BI.",
    },
    { type: "h2", id: "worked-example", text: "Sell-Through Rate Worked Example" },
    {
      type: "p",
      text: "An illustrative knitwear style starts the month with 200 units and receives 800 more, so 1,000 units are available. The stores and the website sell 640 units and 40 come back, which leaves 600 net sales. Sell-through on available stock is 600 ÷ 1,000 = 60%. Sell-through on receipts is 600 ÷ 800 = 75%. The fifteen-point gap is simply the opening stock, which is why two teams using different formulas can both be right and still disagree.",
    },
    { type: "h2", id: "mistakes", text: "Common Mistakes in Sell-Through Rate Calculations" },
    {
      type: "list",
      items: [
        "Leaving returns in sales, which inflates sell-through in categories with high online returns.",
        "Dividing by closing stock instead of the stock that was available to sell.",
        "Comparing a four-week sell-through with a full-season one.",
        "Mixing the receipts-only rate and the available-stock rate in one report.",
        "Reading a high sell-through as success when the product sold out early and lost sales.",
      ],
    },
  ],
  faqTitle: "Sell-Through Calculator FAQ",
  faq: [
    {
      question: "How do you calculate sell-through rate?",
      answer:
        "Divide the units sold, minus returns, by the units that were available to sell: opening stock plus units received. 600 net units sold from 1,000 available is a 60% sell-through. Always state the period.",
    },
    {
      question: "Should returns be deducted from sell-through?",
      answer:
        "Yes, for fashion I always deduct them. A unit that comes back is available to sell again, and online return rates can be high enough to distort the figure. If a report does not deduct returns, the definition should say so.",
    },
    {
      question: "What is a good sell-through rate?",
      answer:
        "It depends on the category, the season length and the markdown plan, so there is no single benchmark. Compare a style with its own category and with the plan for the same week of the season. A very high rate early in the season can mean the buy was too shallow.",
    },
    {
      question: "What is the difference between sell-through and stock turn?",
      answer:
        "Sell-through is the share of available units that sold in a period. Stock turn shows how many times the average inventory was sold over a period, usually at cost. Sell-through suits seasonal products, stock turn suits continuous ranges.",
    },
  ],
  relatedPostKey: "sell-through-rate",
  seo: {
    title: "Sell-Through Rate Calculator for Fashion Retail",
    description:
      "Free sell-through rate calculator: net sales divided by available stock, with returns deducted and a receipts-only rate. Formula and worked example.",
  },
};

const stockTurnCalculator: CalculatorPage = {
  ...calculatorPlan("stock-turn-calculator", "en"),
  cardTitle: "Stock Turn and Weeks of Cover Calculator",
  cardText: "Stock turn, days of stock and weeks of cover from cost of goods sold, inventory and weekly sales.",
  breadcrumb: "Stock turn calculator",
  h1: { before: "Stock Turn Calculator with", accent: "Weeks of Cover" },
  lead: "This stock turn calculator shows how many times the average inventory was sold in a period (cost of goods sold ÷ average inventory at cost), how many days of stock that means, and how many weeks the current stock will last at the current rate of sale. Stock turn is also called inventory turnover.",
  body: [
    {
      type: "calculator",
      kind: "stockTurn",
      title: "Stock Turn and Weeks of Cover Calculator",
      labels: {
        cogs: "Cost of goods sold in the period",
        avgInventory: "Average inventory at cost",
        periodDays: "Days in the period",
        stock: "Current stock (units)",
        weeklySales: "Average weekly sales (units)",
        turns: "Stock turn",
        days: "Days of stock",
        weeksCover: "Weeks of cover",
      },
      note: "Stock turn = COGS ÷ average inventory. Days of stock = days in period ÷ stock turn. Weeks of cover = current stock ÷ average weekly sales.",
    },
    { type: "h2", id: "how-to-use", text: "How to Use the Stock Turn Calculator" },
    {
      type: "list",
      items: [
        "Enter the cost of goods sold for the period, for example the last 12 months.",
        "Enter the average inventory at cost for the same period: the average of the month-end stock values works well.",
        "Enter the number of days in the period (365 for a year, 91 for a quarter).",
        "For weeks of cover, enter the current stock in units and the average weekly units sold over the last four to six weeks.",
      ],
    },
    { type: "h2", id: "formulas", text: "Stock Turn Formula and Weeks of Cover Formula" },
    { type: "formula", text: "stock turn = cost of goods sold ÷ average inventory at cost" },
    { type: "formula", text: "days of stock = days in the period ÷ stock turn" },
    { type: "formula", text: "weeks of cover = current stock units ÷ average weekly units sold" },
    {
      type: "p",
      text: "Stock turn and days of stock describe the past period and suit season or year reviews. Weeks of cover looks forward and suits weekly decisions: reorders, transfers and the timing of markdowns. Keep cost and inventory on the same basis; mixing sales at retail price with stock at cost overstates the turn. My article on retail KPIs for fashion brands shows how stock turn fits with sell-through, GMROI and margin.",
    },
    { type: "h2", id: "worked-example", text: "Stock Turn and Weeks of Cover Worked Example" },
    {
      type: "p",
      text: "An illustrative accessories category sold goods costing 600,000 over a year, with an average inventory of 150,000 at cost. The stock turn is 600,000 ÷ 150,000 = 4, so the stock was sold four times, and 365 ÷ 4 gives about 91 days of stock. Today the category holds 1,200 units and sells about 150 units a week, so it has 1,200 ÷ 150 = 8 weeks of cover. If the season ends in five weeks, three weeks of stock are at risk of markdown.",
    },
    { type: "h2", id: "mistakes", text: "Common Mistakes in Stock Turn Calculations" },
    {
      type: "list",
      items: [
        "Dividing sales at retail price by inventory at cost.",
        "Using closing stock instead of an average, which distorts the turn in seasonal businesses.",
        "Comparing a quarterly stock turn with an annual one without converting the period.",
        "Calculating weeks of cover from one unusual week, such as a promotion week.",
        "Reading one high total turn while slow categories hide behind fast basics.",
      ],
    },
  ],
  faqTitle: "Stock Turn Calculator FAQ",
  faq: [
    {
      question: "What is the stock turn formula?",
      answer:
        "Stock turn equals cost of goods sold divided by average inventory at cost, for the same period. Goods costing 600,000 sold against an average stock of 150,000 give a stock turn of 4. Some retailers use sales and inventory at retail price instead; the key is to use the same basis for both.",
    },
    {
      question: "Is stock turn the same as inventory turnover?",
      answer:
        "Yes. Stock turn is the usual UK retail term and inventory turnover the usual accounting term for the same ratio. Both show how many times the average stock was sold in a period.",
    },
    {
      question: "How do I calculate weeks of cover?",
      answer:
        "Divide the current stock in units by the average weekly units sold. 1,200 units selling 150 a week gives 8 weeks of cover. Use an average of several recent weeks so one promotion does not distort it.",
    },
    {
      question: "What is a good stock turn for a fashion retailer?",
      answer:
        "It varies with the business model and category: basics and continuous lines turn faster than seasonal collections with deep size runs. Compare each category with its own history and plan rather than with a general benchmark. A falling turn is an early sign that the buy is ahead of demand.",
    },
  ],
  relatedPostKey: "retail-kpis",
  seo: {
    title: "Stock Turn Calculator: Formula and Weeks of Cover",
    description:
      "Free stock turn calculator: inventory turnover, days of stock and weeks of cover from COGS, average inventory and weekly sales. Formula and example.",
  },
};

const gmroiCalculator: CalculatorPage = {
  ...calculatorPlan("gmroi-calculator", "en"),
  cardTitle: "GMROI Calculator",
  cardText: "Gross margin return on inventory investment from gross margin and average inventory at cost.",
  breadcrumb: "GMROI calculator",
  h1: { before: "GMROI Calculator: Gross Margin Return on", accent: "Inventory Investment" },
  lead: "This GMROI calculator shows how much gross margin each unit of money invested in stock earned: gross margin divided by average inventory at cost. A GMROI of 1.5 means every 1 held in inventory returned 1.50 of gross margin over the period.",
  body: [
    {
      type: "calculator",
      kind: "gmroi",
      title: "GMROI Calculator",
      labels: {
        grossMargin: "Gross margin in the period",
        avgInventory: "Average inventory at cost",
        gmroi: "GMROI",
      },
      note: "GMROI = gross margin ÷ average inventory at cost. Use the same period for both inputs.",
    },
    { type: "h2", id: "how-to-use", text: "How to Use the GMROI Calculator" },
    {
      type: "list",
      items: [
        "Choose the period, usually a season or a rolling 12 months.",
        "Enter the gross margin for that period in money: net sales minus cost of goods sold.",
        "Enter the average inventory at cost over the same period.",
        "Read the GMROI and compare it between categories, brands or markets rather than on its own.",
      ],
    },
    { type: "h2", id: "formula", text: "GMROI Formula and How to Read It" },
    { type: "formula", text: "GMROI = gross margin ÷ average inventory at cost" },
    { type: "formula", text: "GMROI = gross margin % × (net sales ÷ average inventory at cost)" },
    {
      type: "p",
      text: "The second line shows why GMROI is useful: it combines margin and stock productivity in one number. A category can reach the same GMROI with a high margin and slow stock, or a lower margin and fast stock. A GMROI below 1 means the stock earned less gross margin than it cost to hold. My article on retail KPIs for fashion brands explains how GMROI sits next to stock turn, sell-through and margin in a weekly report.",
    },
    { type: "h2", id: "worked-example", text: "GMROI Calculation Worked Example" },
    {
      type: "p",
      text: "Take two illustrative categories over the same year. Knitwear made a gross margin of 120,000 on an average inventory of 80,000 at cost, so its GMROI is 120,000 ÷ 80,000 = 1.5. Outerwear made 150,000 of gross margin but held 150,000 of stock on average, so its GMROI is 1.0. Outerwear earned more margin in total, yet knitwear used its stock money better. That is the conversation GMROI starts: whether the extra outerwear depth is worth the money tied up in it.",
    },
    {
      type: "table",
      caption: "Illustrative GMROI by category · one year",
      columns: [
        { label: "Category", kind: "text" },
        { label: "Gross margin", kind: "number" },
        { label: "Average inventory at cost", kind: "number" },
        { label: "GMROI", kind: "number", format: "scale" },
      ],
      rows: [
        { cells: ["Knitwear", 120000, 80000, 1.5] },
        { cells: ["Outerwear", 150000, 150000, 1] },
      ],
    },
    { type: "h2", id: "mistakes", text: "Common Mistakes in GMROI Calculations" },
    {
      type: "list",
      items: [
        "Using inventory at retail price, which makes GMROI look lower than it is.",
        "Taking closing stock instead of average stock for the period.",
        "Mixing a quarterly gross margin with an annual average inventory.",
        "Using the margin percentage instead of gross margin in money.",
        "Ranking categories by GMROI without checking sell-through and availability.",
      ],
    },
  ],
  faqTitle: "GMROI Calculator FAQ",
  faq: [
    {
      question: "What is the GMROI formula?",
      answer:
        "GMROI equals gross margin in money divided by average inventory at cost for the same period. A gross margin of 120,000 on an average inventory of 80,000 gives a GMROI of 1.5. It can also be written as gross margin percentage multiplied by sales-to-stock ratio.",
    },
    {
      question: "How do you do a GMROI calculation for a category?",
      answer:
        "Add up the category’s net sales minus cost of goods sold for the period to get gross margin. Average the category’s stock at cost over the same period, for example from month-end values. Divide the first figure by the second.",
    },
    {
      question: "What is a good GMROI in retail?",
      answer:
        "Above 1 means the stock earned more gross margin than it cost; beyond that, a good level depends on the category and business model. Compare categories within your own business and track the trend. A falling GMROI usually means stock is growing faster than margin.",
    },
    {
      question: "Why use average inventory at cost for GMROI?",
      answer:
        "Because GMROI measures the return on money invested in stock, and that money is the cost value. Inventory at retail price would include margin that has not been earned yet. The average smooths out seasonal peaks.",
    },
  ],
  relatedPostKey: "retail-kpis",
  seo: {
    title: "GMROI Calculator: Formula and Worked Example",
    description:
      "Free GMROI calculator: gross margin return on inventory investment from gross margin and average inventory at cost, with the formula and an example.",
  },
};

const openToBuyCalculator: CalculatorPage = {
  ...calculatorPlan("open-to-buy-calculator", "en"),
  cardTitle: "Open-to-Buy Calculator",
  cardText: "The budget left to buy for a period, from planned sales, markdowns, stock and orders.",
  breadcrumb: "Open-to-buy calculator",
  h1: { before: "Open-to-Buy Calculator for", accent: "Retail Buying Budgets" },
  lead: "This open-to-buy calculator shows how much stock you can still buy for a period without missing your stock plan: planned sales plus planned markdowns plus planned closing stock, minus opening stock and stock already on order. A negative result means the period is already overbought.",
  body: [
    {
      type: "calculator",
      kind: "openToBuy",
      title: "Open-to-Buy Calculator",
      labels: {
        sales: "Planned sales",
        markdowns: "Planned markdowns",
        endStock: "Planned closing stock",
        openingStock: "Opening stock",
        onOrder: "Stock on order",
        otb: "Open-to-buy",
      },
      note: "Formula: planned sales + markdowns + closing stock − opening stock − on order. Use the same unit (retail or cost) for every input.",
    },
    { type: "h2", id: "how-to-use", text: "How to Use the Open-to-Buy Calculator" },
    {
      type: "list",
      items: [
        "Pick one period and one scope, for example March for a single category.",
        "Enter planned sales, planned markdowns and the closing stock you want at the end of the period.",
        "Enter the opening stock and the stock already on order for delivery in the period.",
        "Read the open-to-buy: the budget still free for new orders. Keep every input at retail value or every input at cost.",
      ],
    },
    { type: "h2", id: "formula", text: "Open-to-Buy Formula" },
    { type: "formula", text: "open-to-buy = planned sales + planned markdowns + planned closing stock − opening stock − stock on order" },
    {
      type: "p",
      text: "The first three items are what the period needs: stock to sell, value lost to price reductions and stock to carry into the next period. The last two are what you already have or have committed to. The difference is how much you can still buy. In a real plan this runs month by month and category by category, with the closing stock of one month becoming the opening stock of the next. My article on the open-to-buy model in Excel shows that structure and the checks I build into it.",
    },
    { type: "h2", id: "worked-example", text: "How to Calculate Open to Buy: A Worked Example" },
    {
      type: "p",
      text: "An illustrative womenswear category plans March sales of 100,000 and markdowns of 8,000 at retail value, and wants to close the month with 60,000 of stock. It opens the month with 70,000 and has 20,000 already on order. The open-to-buy is 100,000 + 8,000 + 60,000 − 70,000 − 20,000 = 78,000. If sales then run 10% behind plan, the buyer should lower the sales line and recalculate before placing the next order, not after.",
    },
    { type: "h2", id: "mistakes", text: "Common Mistakes in Open-to-Buy Calculations" },
    {
      type: "list",
      items: [
        "Mixing retail and cost values in the same calculation.",
        "Forgetting planned markdowns, which leaves the plan short of stock.",
        "Leaving out orders that are placed but not yet delivered.",
        "Setting open-to-buy once per season and not updating it with actual sales.",
        "Calculating one total for the season instead of by month and category.",
      ],
    },
  ],
  faqTitle: "Open-to-Buy Calculator FAQ",
  faq: [
    {
      question: "What is the open-to-buy formula?",
      answer:
        "Open-to-buy equals planned sales plus planned markdowns plus planned closing stock, minus opening stock and stock on order. The result is the budget still available for new orders in the period. All inputs should use the same valuation.",
    },
    {
      question: "How do you calculate open to buy at retail or at cost?",
      answer:
        "Use the same formula and keep every input on one basis. At retail, markdowns are the value of price reductions; at cost, convert sales and stock using your cost-to-retail ratio. Buyers often plan at retail and place orders at cost, so the conversion must be agreed.",
    },
    {
      question: "What does a negative open-to-buy mean?",
      answer:
        "It means the stock you have and have ordered already exceeds what the period needs. Instead of buying more, look at cancelling or delaying orders, moving stock between channels or planning markdowns earlier.",
    },
    {
      question: "How often should open-to-buy be updated?",
      answer:
        "I update it at least monthly and weekly during the peak buying period. Each update replaces planned figures with actual sales, markdowns and receipts, so the remaining budget stays realistic.",
    },
  ],
  relatedPostKey: "open-to-buy",
  seo: {
    title: "Open-to-Buy Calculator: Formula and Example",
    description:
      "Free open-to-buy calculator for retail buyers: planned sales, markdowns and closing stock minus opening stock and orders. Formula and worked example.",
  },
};

export const calculators: CalculatorPage[] = [
  marginCalculator,
  sellThroughCalculator,
  stockTurnCalculator,
  gmroiCalculator,
  openToBuyCalculator,
];
