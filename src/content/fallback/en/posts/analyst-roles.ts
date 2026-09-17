import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: "This section is being written." },
];

// Stand-in: metadata, lead and FAQ are final; the body is the planned H2 skeleton (task 02).
// Careers article: explains the professions only, no personal job-seeking signals.
export const post: Post = {
  ...postPlan("analyst-roles", "en"),
  title: "Brand Analyst vs Business Analyst in Fashion: Responsibilities and Skills Compared",
  h1: { before: "Brand Analyst vs Business Analyst in Fashion:", accent: "Responsibilities and Skills Compared" },
  excerpt: "What brand analysts, business analysts, merchandise planners and allocation analysts do in a fashion company, and the skills each role needs.",
  lead: "In a fashion company, a brand analyst turns sales, stock and product data into decisions about the range, pricing and markets, while a business analyst focuses on processes and systems, translating business needs into requirements for IT. Merchandise planners and allocation analysts sit closer to the numbers of buying and stock distribution.",
  date: "2026-04-17",
  readingMinutes: 7,
  body: [
    ...section("brand-analyst", "What a Brand Analyst Does in a Fashion Company"),
    ...section("business-analyst", "What a Business Analyst Does"),
    ...section("roles-compared", "Merchandise Planner, Allocation Analyst and Brand Analyst Compared"),
    ...section("skills-and-tools", "Skills and Tools for Fashion Analyst Roles"),
  ],
  faqTitle: "Fashion Analyst Roles: Common Questions",
  faq: [
    {
      question: "What does a retail analyst do?",
      answer:
        "A retail analyst collects and interprets sales, stock, pricing and customer data to explain performance and recommend actions. Typical outputs are weekly trading reports, category reviews, sell-through and margin analysis, and inputs for buying and markdown decisions. The role combines working with data tools and explaining results to commercial teams.",
    },
    {
      question: "What is the difference between a brand analyst and a business analyst?",
      answer:
        "A brand analyst works on commercial questions: how the brand’s products, categories and markets perform and what to change in the range or prices. A business analyst works on how the organisation operates: mapping processes, gathering requirements and helping to implement systems such as ERP, PLM or reporting tools. Both need analytical thinking, but the first is closer to trading and the second to projects and IT.",
    },
    {
      question: "What does an allocation analyst do?",
      answer:
        "An allocation analyst decides how much of each product goes to each store or channel, both for the initial distribution and for replenishment. The role uses store grades, size curves, sales rates and stock levels to put the right quantities where they will sell. It is a common entry point into merchandise planning.",
    },
    {
      question: "What skills does a fashion data analyst need?",
      answer:
        "Strong Excel is the baseline, followed by a reporting tool such as Power BI with DAX, and often SQL for pulling data. Equally important is retail knowledge: sell-through, stock cover, margin, open-to-buy and size curves. The ability to explain a number clearly to buyers and managers is what makes the analysis useful.",
    },
  ],
  placeholder: true,
  seo: {
    title: "Brand Analyst vs Business Analyst in Fashion Retail",
    description: "What a retail analyst, brand analyst, business analyst and merchandise planner do in fashion, and the skills and tools each role needs.",
  },
};
