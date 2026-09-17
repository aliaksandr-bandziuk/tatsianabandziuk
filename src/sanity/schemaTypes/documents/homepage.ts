import { defineField, defineType } from "sanity";
import { groups, languageField, placeholderField, seoField } from "../shared";

/**
 * Home page, one per language. Section order follows the approved design:
 * hero → experience strip → services → about teaser → results → formats →
 * process → tools → education → case studies → recommendations → templates →
 * FAQ → blog → contact. Cards come from their own document types; this
 * document holds the headings and the copy that exists only here.
 */
export default defineType({
  name: "homepage",
  title: "Home page",
  type: "document",
  groups: [
    ...groups,
    { name: "hero", title: "Hero" },
    { name: "sections", title: "Sections" },
  ],
  fields: [
    // Hero
    defineField({ name: "heroEyebrow", title: "Small line above the H1", type: "string", group: "hero" }),
    defineField({ name: "heroTitle", title: "H1, first line", type: "string", group: "hero", description: "e.g. Tatsiana Bandziuk," }),
    defineField({ name: "heroTitleAccent", title: "H1, emerald italic part", type: "string", group: "hero", description: "e.g. Retail and Fashion Analytics" }),
    defineField({ name: "heroTitleEnd", title: "H1, last part", type: "string", group: "hero", description: "e.g. Consultant" }),
    defineField({ name: "heroSubtitle", title: "Positioning line", type: "text", rows: 2, group: "hero" }),
    defineField({ name: "heroPrimaryCta", title: "Primary button", type: "link", group: "hero" }),
    defineField({ name: "heroSecondaryCta", title: "Secondary link", type: "link", group: "hero" }),
    defineField({ name: "heroStats", title: "Stats under the buttons", type: "array", of: [{ type: "metric" }], group: "hero" }),
    defineField({ name: "heroChartLabel", title: "Hero chart label", type: "string", group: "hero", description: "e.g. SELL-THROUGH BY WEEK" }),
    defineField({ name: "heroChartNote", title: "Hero chart handwritten note", type: "string", group: "hero" }),

    // Sections
    defineField({ name: "experienceTitle", title: "Experience strip heading", type: "string", group: "sections" }),
    defineField({ name: "experienceNames", title: "Experience strip company names", type: "array", of: [{ type: "string" }], group: "sections" }),
    defineField({ name: "services", title: "Services section", type: "sectionHeading", group: "sections" }),
    defineField({ name: "about", title: "About teaser", type: "sectionHeading", group: "sections" }),
    defineField({ name: "aboutText", title: "About teaser paragraphs", type: "array", of: [{ type: "text" }], group: "sections" }),
    defineField({ name: "results", title: "Results section", type: "sectionHeading", group: "sections" }),
    defineField({ name: "resultItems", title: "Results", type: "array", of: [{ type: "metric" }], group: "sections" }),
    defineField({ name: "formats", title: "Consulting formats section", type: "sectionHeading", group: "sections" }),
    defineField({ name: "clientTypesLabel", title: "Client types label", type: "string", group: "sections" }),
    defineField({ name: "clientTypes", title: "Client types", type: "array", of: [{ type: "string" }], group: "sections" }),
    defineField({ name: "process", title: "Process section", type: "sectionHeading", group: "sections" }),
    defineField({ name: "processSteps", title: "Process steps", type: "array", of: [{ type: "titledText" }], group: "sections" }),
    defineField({ name: "processNote", title: "Handwritten note under the photo", type: "string", group: "sections" }),
    defineField({ name: "tools", title: "Tools section", type: "sectionHeading", group: "sections" }),
    defineField({ name: "education", title: "Education section", type: "sectionHeading", group: "sections" }),
    defineField({ name: "caseStudies", title: "Case studies section", type: "sectionHeading", group: "sections" }),
    defineField({ name: "recommendations", title: "Recommendations section", type: "sectionHeading", group: "sections" }),
    defineField({ name: "faq", title: "FAQ section", type: "sectionHeading", group: "sections" }),
    defineField({ name: "faqItems", title: "FAQ", type: "array", of: [{ type: "faqItem" }], group: "sections" }),
    defineField({ name: "blog", title: "Blog section", type: "sectionHeading", group: "sections" }),
    defineField({ name: "contact", title: "Contact section", type: "sectionHeading", group: "sections" }),
    defineField({ name: "contactNote", title: "Personal note next to the form", type: "text", rows: 4, group: "sections" }),

    placeholderField,
    seoField,
    languageField,
  ],
  preview: { select: { subtitle: "language" }, prepare: ({ subtitle }) => ({ title: "Home page", subtitle }) },
});
