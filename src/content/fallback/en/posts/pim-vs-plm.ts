import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: "This section is being written." },
];

// Stand-in: metadata, lead and FAQ are final; the body is the planned H2 skeleton (task 02).
export const post: Post = {
  ...postPlan("pim-vs-plm", "en"),
  title: "PIM vs PLM for Fashion Brands: What Each System Does",
  h1: { before: "PIM vs PLM for Fashion Brands:", accent: "What Each System Does" },
  excerpt: "PLM manages a garment from design to production; PIM prepares its data for selling. What each system holds, who owns it and when you need both.",
  lead: "PLM (product lifecycle management) is where a fashion brand designs and develops a product, from sketch and bill of materials to supplier and costing; PIM (product information management) is where the finished product’s data is enriched and published to e-commerce and marketplaces. PLM serves design, sourcing and product teams before production, and PIM serves e-commerce and marketing before the product goes on sale.",
  date: "2026-07-03",
  readingMinutes: 8,
  body: [
    ...section("what-is-plm", "What Is PLM in Fashion"),
    ...section("what-is-pim", "What Is PIM (Product Information Management)"),
    ...section("pim-vs-plm-data-owners", "PIM vs PLM: Data, Owners and Timing"),
    ...section("plm-and-pim-together", "When a Fashion Brand Needs Both PLM and PIM"),
    ...section("data-quality-plm-pim", "Product Data Quality Between PLM and PIM"),
  ],
  faqTitle: "PIM and PLM Systems: Common Questions",
  faq: [
    {
      question: "What is PLM in fashion?",
      answer:
        "PLM in fashion is software that manages a product from the first idea to production: design briefs, sketches, tech packs, materials, bills of materials, size specifications, suppliers, samples and costing. It gives design, product development and sourcing teams one version of each style. Centric, PTC FlexPLM and Lectra are typical examples.",
    },
    {
      question: "What is a PIM system?",
      answer:
        "A PIM (product information management) system stores the commercial data needed to sell a product: names, descriptions, marketing attributes, images, sizes and translations for each channel. It checks that every product is complete before it is published to the website, marketplaces or wholesale partners. Akeneo, Salsify and inRiver are typical examples.",
    },
    {
      question: "What is the difference between PIM and PLM?",
      answer:
        "PLM holds technical and development data and is used before production; PIM holds customer-facing data and is used before selling. PLM is owned by product and sourcing teams, PIM by e-commerce and content teams. In a well-connected setup, core attributes such as style code, colour, composition and season are created once in PLM and passed to PIM rather than typed again.",
    },
    {
      question: "Does a fashion brand need both PIM and PLM?",
      answer:
        "A brand that designs its own collections and sells through several online channels usually benefits from both, because development data and selling data have different owners and timing. A small brand with one web shop can often manage product content in its e-commerce platform and keep development in PLM or spreadsheets. The deciding factor is the number of channels, languages and products, not the size of the design team.",
    },
  ],
  placeholder: true,
  seo: {
    title: "PIM vs PLM for Fashion Brands: What Each System Does",
    description: "What PLM and product information management (PIM) do in a fashion brand, which data each holds, who owns it and when you need both systems.",
  },
};
