import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: "This section is being written." },
];

// Stand-in: metadata, lead and FAQ are final; the body is the planned H2 skeleton (task 02).
export const post: Post = {
  ...postPlan("product-attributes", "en"),
  title: "Product Attribute Standards for Fashion PLM That Work Across Markets",
  h1: { before: "Product Attribute Standards for Fashion PLM", accent: "That Work Across Markets" },
  excerpt: "Which product attributes a fashion brand needs in PLM, and how a shared dictionary keeps colour, season and composition consistent in every market.",
  lead: "Product attributes are the defined characteristics of a product, such as category, colour, season, fit and composition, and in a fashion PLM they only work when every value comes from one shared dictionary with clear rules. A good attribute standard lets every market filter, report and publish the same product in the same way without manual clean-up.",
  date: "2026-06-12",
  readingMinutes: 8,
  body: [
    ...section("attributes-in-plm", "Which Product Attributes a Fashion Brand Needs in PLM"),
    ...section("dictionary-structure", "Product Attribute Dictionary Structure"),
    ...section("colour-rules", "Colour Attribute Rules in a PLM Dictionary"),
    ...section("season-code-rules", "Season Code Rules Across Markets"),
    ...section("composition-fields", "Composition Fields Without Free Text"),
    ...section("agree-attribute-standards", "How to Agree Product Attribute Standards with Markets"),
  ],
  faqTitle: "Product Attributes in Fashion: Common Questions",
  faq: [
    {
      question: "What are product attributes?",
      answer:
        "Product attributes are the characteristics that describe a product and let people and systems tell products apart, such as category, colour, size, material, fit or price tier. In a PLM or PIM they are stored as structured fields with allowed values. Consistent attributes make filtering, reporting and online search reliable.",
    },
    {
      question: "What are examples of product attributes in fashion?",
      answer:
        "Typical fashion attributes include department, category and subcategory, season and drop, colour family and colour name, size range, fit, length, neckline, sleeve type, fabric composition, care instructions, country of origin and sustainability claims. Commercial attributes such as price tier, core or fashion status and launch date are just as important for planning and reporting.",
    },
    {
      question: "What are the different types of product attributes?",
      answer:
        "A practical split is technical attributes (materials, measurements, construction), descriptive attributes (colour, fit, style details), commercial attributes (price tier, season, channel, lifecycle status) and legal attributes (composition, origin, care labelling). Each type usually has a different owner and a different moment in the product lifecycle when it must be complete.",
    },
    {
      question: "Who should own the product attribute dictionary?",
      answer:
        "One central team, usually product data or product operations, should own the dictionary and approve every new value. Markets and departments can request additions, but they should not create values locally, or the same colour ends up with five spellings. A short change process with a named owner keeps the dictionary usable over many seasons.",
    },
  ],
  placeholder: true,
  seo: {
    title: "Product Attributes in Fashion PLM: A Dictionary That Works",
    description: "Which product attributes a fashion brand needs in PLM and how to write rules for colour, season and composition that every market follows.",
  },
};
