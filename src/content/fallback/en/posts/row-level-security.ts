import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("row-level-security", "en"),
  title: "Row-Level Security in Power BI for Multi-Market Retail Reporting",
  h1: { before: "Row-Level Security in Power BI for", accent: "Multi-Market Retail Reporting" },
  excerpt: "How to set up row-level security in Power BI so that each market sees only its own figures in one shared retail report.",
  lead: "Row-level security (RLS) in Power BI filters the data in a report by the viewer’s role, so one retail report can serve every market while each country team sees only its own sales and stock. You define roles with DAX filters in the model, assign people or groups to them in the Power BI Service and test them with View as role.",
  date: "2026-07-24",
  readingMinutes: 7,
  body: [
    {
      type: "p",
      text: "Sooner or later every retail business that reports across countries hits the same request: the Polish team wants the trading report, but only with Polish numbers, and the German team the same for Germany. The tempting answer is a copy of the report per market. I have seen where that leads: eight versions of the same file, each slightly out of date, and a new measure that has to be added eight times. Row-level security solves this properly with one model, one report and a filter that depends on who is looking.",
    },
    { type: "h2", id: "what-rls-does", text: "What Row-Level Security in Power BI Does" },
    {
      type: "p",
      text: "RLS stands for row-level security. It restricts which rows of the semantic model a viewer can see. You write a DAX filter on a table, for example Market[Country] = \"Poland\", save it as a role, and every visual, total and export for a member of that role is calculated only from the rows that pass the filter. The report layout does not change; the numbers behind it do.",
    },
    {
      type: "p",
      text: "The filter travels through relationships. If you secure the Market dimension, the Sales, Stock and Receipts fact tables related to it are filtered too, so the Polish team sees Polish sales, Polish stock and Polish sell-through without any extra work. This is why I always put security filters on dimension tables and never on the large fact tables: it is faster and much easier to reason about.",
    },
    {
      type: "p",
      text: "Should you enable row-level security at all? If different groups of viewers must not see each other’s figures, yes, and it is the only way to do it inside one report. Hiding a page or a slicer is not security: anyone with access can still reach the data through another visual, an export or Analyze in Excel. Power BI has no page-level security, so if a page must stay private, it belongs in a separate report.",
    },
    { type: "h2", id: "static-vs-dynamic-rls", text: "Static vs Dynamic Row-Level Security for Retail Markets" },
    {
      type: "p",
      text: "There are two ways to write the roles. Static RLS hard-codes the value in each role: a role called Poland with the filter Market[Country] = \"Poland\", a role called Germany, and so on. Dynamic RLS uses one role whose filter reads the viewer’s login with USERPRINCIPALNAME() and looks it up in a mapping table of emails and markets.",
    },
    {
      type: "table",
      caption: "Static vs dynamic row-level security in a multi-market retail report",
      columns: [
        { label: "Aspect", kind: "text" },
        { label: "Static RLS", kind: "text" },
        { label: "Dynamic RLS", kind: "text" },
      ],
      rows: [
        { cells: ["Number of roles", "One per market or region", "Usually one for everyone"] },
        { cells: ["Where access is managed", "Role membership in the Service", "A mapping table of emails and markets"] },
        { cells: ["New market", "New role, republish the model", "New rows in the mapping table"] },
        { cells: ["Store managers or area managers", "Impractical", "Works with a store-level mapping"] },
        { cells: ["Best for", "A handful of markets that rarely change", "Many markets, regions or stores"] },
      ],
    },
    {
      type: "p",
      text: "My rule of thumb: up to five or six markets with stable teams, static roles are perfectly fine and easier to explain to a business owner. As soon as access goes down to region or store level, or people move between markets every season, dynamic RLS pays for itself within weeks, because access changes become an edit in a table rather than a change to the model.",
    },
    { type: "h2", id: "market-roles", text: "Setting Up Market Roles in Power BI Row-Level Security" },
    {
      type: "p",
      text: "For a static setup, open the model in Power BI Desktop, go to Modeling → Manage roles, create a role per market and add a filter on the Market table. For dynamic RLS in a multi-market retail report, these are the steps I follow:",
    },
    {
      type: "list",
      items: [
        "Create a UserAccess table with two columns, Email and MarketCode, one row per person and market. A regional manager simply gets several rows. Keep the table in a SharePoint list or a small database table so the business can maintain it.",
        "Load it into the model without a relationship to the other tables and hide it from report view.",
        "Create one role, for example Market access, with a DAX filter on the Market dimension that keeps only the markets listed for the current user.",
        "If some people, such as the head of trading, need every market, give them a row with the code ALL rather than a row per market, so a new country does not need a new row for each of them.",
        "Publish the model, open its Security settings in the Power BI Service and add the users or, better, a security group to the role.",
      ],
    },
    {
      type: "code",
      code: "-- Role \"Market access\", table filter on Market\nVAR CurrentUser = USERPRINCIPALNAME ()\nVAR HasAllMarkets =\n    CALCULATE (\n        COUNTROWS ( UserAccess ),\n        UserAccess[Email] = CurrentUser,\n        UserAccess[MarketCode] = \"ALL\"\n    ) > 0\nVAR UserMarkets =\n    CALCULATETABLE (\n        VALUES ( UserAccess[MarketCode] ),\n        UserAccess[Email] = CurrentUser\n    )\nRETURN\n    HasAllMarkets || Market[MarketCode] IN UserMarkets",
      caption: "Dynamic RLS filter for a multi-market report. Table and column names are examples; rename them to match your model.",
    },
    {
      type: "p",
      text: "A user in two roles sees the union of both, not the overlap. That matters when you mix approaches: if someone is in a Poland role and also in a role that sees everything, they see everything. Keep role design simple and, with dynamic RLS, let the mapping table be the single place where access is decided.",
    },
    {
      type: "p",
      text: "If USERPRINCIPALNAME() is not working, the cause is almost always the login rather than the DAX. The user principal name is the sign-in name, which is not always the email address people write in the mapping table, and guest users from another organisation can have a different format. Add a temporary card with a measure that returns USERPRINCIPALNAME() and compare what it shows with the table.",
    },
    { type: "h2", id: "testing-rls", text: "Testing Row-Level Security with View as Role" },
    {
      type: "p",
      text: "To check row-level security in Power BI Desktop, go to Modeling → View as, tick the role and, for dynamic RLS, tick Other user and type an email from the mapping table. The whole report switches to what that person would see. In the Power BI Service, open the semantic model’s Security settings, choose the role and select Test as role; there you can also enter a specific user.",
    },
    {
      type: "p",
      text: "Clicking through the pages is not enough. For every role I compare a few totals with the source system, because a wrong filter often still shows plausible numbers. My checklist:",
    },
    {
      type: "list",
      items: [
        "Net sales and stock units for one market in one week, against the ERP or the sales export.",
        "A user with two markets, to confirm they see both and that the group total equals the sum of the two.",
        "A user with ALL access, whose totals must match the unsecured model.",
        "An email that is not in the mapping table, which must see no data at all.",
        "Tables that are not related to Market, such as a supplier or a size table, to make sure nothing leaks through them.",
      ],
    },
    { type: "h2", id: "rls-limits", text: "Row-Level Security Limits in Retail Reporting" },
    {
      type: "p",
      text: "RLS is reliable, but it has limits that regularly surprise retail teams. The first one is about roles in the workspace: row-level security applies only to viewers. Workspace Admins, Members and Contributors see all the data regardless of the roles. This is also the honest answer to how people “bypass” RLS: they are not bypassing it, they have edit rights. Give market teams Viewer access or distribute the report through an app.",
    },
    {
      type: "list",
      items: [
        "Once roles exist, a viewer who is not in any role sees no data. That is the safe default, but it is also the first thing new starters report as a broken dashboard.",
        "RLS hides rows, not tables or columns. If a market team must not see cost prices at all, you need object-level security (OLS), which is usually set up with Tabular Editor.",
        "A market that sees only its own rows cannot compare itself with the group average. If you want that benchmark, add a small aggregated table without a relationship to Market, knowing that this deliberately shares group-level figures.",
        "There is no switch to turn off row-level security. To remove it, delete the roles in Power BI Desktop and republish the model.",
        "Complex filters with many lookups slow every visual down. Filter small dimension tables and keep the mapping table narrow.",
      ],
    },
    {
      type: "p",
      text: "When I set up Power BI reporting for a brand that sells in several countries, access is part of the model design from day one, together with the KPI definitions described in my article on DAX measures for retail dashboards. Adding RLS to a finished report is possible, but designing the Market dimension with security in mind saves a lot of rework.",
    },
  ],
  faqTitle: "Row-Level Security in Power BI: Common Questions",
  faq: [
    {
      question: "What is row-level security in Power BI?",
      answer:
        "Row-level security is a Power BI feature that restricts which rows of data a viewer can see. Roles are defined in the semantic model with DAX filter expressions, for example Market = \"Poland\", and users are assigned to those roles in the Power BI Service. The visuals stay the same for everyone, but the numbers behind them are filtered per role.",
    },
    {
      question: "How do I check row-level security in Power BI?",
      answer:
        "In Power BI Desktop, open Modeling → View as and select one or more roles to see the report as a member of those roles would. In the Power BI Service, open the semantic model’s Security settings, choose a role and use Test as role, where you can also enter a specific user’s email for dynamic RLS. Always compare a few totals with the source data for each role before you share the report.",
    },
    {
      question: "Should I use static or dynamic row-level security?",
      answer:
        "Static RLS hard-codes the filter in each role, which is fine for a handful of markets that rarely change. Dynamic RLS uses a mapping table of user emails and markets together with USERPRINCIPALNAME(), so one role covers everyone and access is managed by editing the table. For a retail business with many markets, regions or store managers, dynamic RLS is easier to maintain.",
    },
    {
      question: "Does row-level security apply to report editors?",
      answer:
        "No. RLS applies only to users with the Viewer role in a workspace or to people the report is shared with. Workspace Admins, Members and Contributors can see all the data in the semantic model regardless of the roles. If market teams must not see each other’s figures, give them Viewer access or share the report through an app.",
    },
  ],
  seo: {
    title: "Row-Level Security in Power BI for Retail Reports",
    description: "How to set up static and dynamic row-level security in Power BI so each market sees only its own numbers in one retail report.",
  },
};
