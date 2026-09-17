import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: "This section is being written." },
];

// Stand-in: metadata, lead and FAQ are final; the body is the planned H2 skeleton (task 02).
export const post: Post = {
  ...postPlan("row-level-security", "en"),
  title: "Row-Level Security in Power BI for Multi-Market Retail Reporting",
  h1: { before: "Row-Level Security in Power BI for", accent: "Multi-Market Retail Reporting" },
  excerpt: "How to set up row-level security in Power BI so that each market sees only its own figures in one shared retail report.",
  lead: "Row-level security (RLS) in Power BI filters the data in a report by the viewer’s role, so one retail report can serve every market while each country team sees only its own sales and stock. You define roles with DAX filters in the model, assign people or groups to them in the Power BI Service and test them with View as role.",
  date: "2026-07-24",
  readingMinutes: 8,
  body: [
    ...section("what-rls-does", "What Row-Level Security in Power BI Does"),
    ...section("static-vs-dynamic-rls", "Static vs Dynamic Row-Level Security for Retail Markets"),
    ...section("market-roles", "Setting Up Market Roles in Power BI Row-Level Security"),
    ...section("testing-rls", "Testing Row-Level Security with View as Role"),
    ...section("rls-limits", "Row-Level Security Limits in Retail Reporting"),
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
  placeholder: true,
  seo: {
    title: "Row-Level Security in Power BI for Retail Reports",
    description: "How to set up static and dynamic row-level security in Power BI so each market sees only its own numbers in one retail report.",
  },
};
