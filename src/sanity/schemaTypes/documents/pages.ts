import { defineType } from "sanity";
import { list, obj, objects, paragraphs, str, strings, txt, typed } from "../fields";
import { groups, keyField, languageField, seoField, slugField } from "../shared";

const faqFields = [str("faqTitle", { title: "FAQ heading", group: "faq" }), list("faq", "faqItem", { title: "FAQ", group: "faq" })];

const preview = (title: string) => ({
  select: { language: "language", key: "key" },
  prepare: ({ language, key }: { language?: string; key?: string }) => ({
    title: key ? `${title}: ${key}` : title,
    subtitle: language?.toUpperCase(),
  }),
});

/** HomeContent */
export const homepage = defineType({
  name: "homepage",
  title: "Home page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "sections", title: "Sections" },
    { name: "faq", title: "FAQ" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    languageField,
    seoField,
    str("eyebrow", { group: "hero" }),
    typed("h1", "accentHeading", { title: "H1", group: "hero" }),
    txt("subtitle", { group: "hero" }),
    str("primaryCta", { group: "hero" }),
    str("secondaryCta", { group: "hero" }),
    list("stats", "metric", { group: "hero" }),
    str("chartLabel", { group: "hero" }),
    str("chartDelta", { group: "hero" }),
    str("chartNote", { group: "hero" }),
    str("experienceTitle", { group: "sections" }),
    strings("experienceNames", { group: "sections", description: "Past employers only; never the current one" }),
    str("servicesTitle", { group: "sections" }),
    str("aboutTitle", { group: "sections" }),
    paragraphs("aboutText", { group: "sections" }),
    str("timelineLabel", { group: "sections" }),
    list("timeline", "careerStep", { group: "sections" }),
    str("aboutLink", { group: "sections" }),
    str("resultsTitle", { group: "sections" }),
    list("results", "metric", { group: "sections" }),
    str("formatsTitle", { group: "sections" }),
    str("clientTypesLabel", { group: "sections" }),
    strings("clientTypes", { group: "sections" }),
    str("processTitle", { group: "sections" }),
    list("process", "titledText", { group: "sections" }),
    str("processPhotoLabel", { group: "sections" }),
    str("processNote", { group: "sections" }),
    str("toolsTitle", { group: "sections" }),
    str("educationTitle", { group: "sections" }),
    strings("educationChips", { group: "sections" }),
    str("caseStudiesTitle", { group: "sections" }),
    str("recommendationsTitle", { group: "sections" }),
    str("recommendationsNote", { group: "sections" }),
    str("blogTitle", { group: "sections" }),
    str("contactTitle", { group: "sections" }),
    txt("contactNote", { group: "sections" }),
    str("faqTitle", { title: "FAQ heading", group: "faq" }),
    txt("faqLead", { group: "faq" }),
    list("faq", "faqItem", { title: "FAQ", group: "faq" }),
  ],
  preview: preview("Home page"),
});

/** AboutContent */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  groups,
  fields: [
    languageField,
    seoField,
    typed("h1", "accentHeading", { title: "H1", group: "content" }),
    txt("intro", { group: "content" }),
    strings("chips", { group: "content" }),
    str("experienceTitle", { group: "content" }),
    paragraphs("experienceText", { group: "content" }),
    str("projectsTitle", { group: "content" }),
    list("projects", "titledText", { group: "content" }),
    str("leadershipTitle", { group: "content" }),
    paragraphs("leadershipText", { group: "content" }),
    str("leadershipNote", { group: "content" }),
    str("timelineTitle", { group: "content" }),
    str("timelineNote", { group: "content" }),
    list("timeline", "careerStep", { group: "content" }),
    str("educationTitle", { group: "content" }),
    txt("educationText", { group: "content" }),
    strings("educationChips", { group: "content" }),
    obj(
      "credentials",
      [
        str("title"),
        txt("intro"),
        list("items", "credential"),
        obj("labels", [
          str("open"),
          str("close"),
          str("prev"),
          str("next"),
          str("zoomIn"),
          str("zoomOut"),
          str("track"),
          str("redactionNote"),
          str("zoomHint"),
        ]),
      ],
      { title: "Diplomas and certificates", group: "content" },
    ),
    str("languagesTitle", { group: "content" }),
    txt("languagesText", { group: "content" }),
    str("recommendationTitle", { group: "content" }),
    typed("recommendation", "recommendation", { group: "content", collapsed: true }),
    str("ctaTitle", { group: "content" }),
    txt("ctaText", { group: "content" }),
    str("ctaNote", { group: "content" }),
    ...faqFields,
  ],
  preview: preview("About page"),
});

/** ListingPage: /services, /case-studies, /blog, /tools. */
export const listingPage = defineType({
  name: "listingPage",
  title: "Listing page",
  type: "document",
  groups,
  fields: [
    languageField,
    {
      ...str("key", {
        title: "Page",
        required: true,
        list: [
          { title: "Services", value: "services" },
          { title: "Case studies", value: "caseStudies" },
          { title: "Blog", value: "blog" },
          { title: "Calculators", value: "calculators" },
        ],
      }),
      readOnly: ({ document }: { document?: { _createdAt?: string } }) => Boolean(document?._createdAt),
    },
    seoField,
    str("eyebrow", { group: "content" }),
    str("h1", { title: "H1", group: "content" }),
    txt("intro", { group: "content" }),
    str("ctaTitle", { group: "content" }),
    txt("ctaText", { group: "content" }),
    str("recommendationTitle", { group: "content" }),
    typed("recommendation", "recommendation", { group: "content", collapsed: true }),
    ...faqFields,
  ],
  preview: preview("Listing"),
});

/** ContactContent */
export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  groups,
  fields: [
    languageField,
    seoField,
    str("eyebrow", { group: "content" }),
    str("h1", { title: "H1", group: "content" }),
    txt("intro", { group: "content" }),
    txt("note", { group: "content" }),
    str("stepsTitle", { group: "content" }),
    list("steps", "titledText", { group: "content" }),
    str("languagesTitle", { group: "content" }),
    list("details", "fact", { group: "content" }),
    ...faqFields,
  ],
  preview: preview("Contact page"),
});

/** CoursesContent */
export const coursesPage = defineType({
  name: "coursesPage",
  title: "Courses page",
  type: "document",
  groups,
  fields: [
    languageField,
    seoField,
    str("eyebrow", { group: "content" }),
    str("h1", { title: "H1", group: "content" }),
    txt("intro", { group: "content" }),
    str("modulesTitle", { group: "content" }),
    list("modules", "titledText", { group: "content" }),
    str("audienceTitle", { group: "content" }),
    paragraphs("audience", { group: "content" }),
    str("waitlistTitle", { group: "content" }),
    txt("waitlistText", { group: "content" }),
    str("waitlistButton", { group: "content" }),
    str("meanwhile", { group: "content" }),
    str("meanwhileLink", { group: "content" }),
    ...faqFields,
  ],
  preview: preview("Courses page"),
});

/** TemplatesContent (/free-templates) */
export const templatesPage = defineType({
  name: "templatesPage",
  title: "Free templates page",
  type: "document",
  groups,
  fields: [
    languageField,
    seoField,
    str("eyebrow", { group: "content" }),
    str("h1", { title: "H1", group: "content" }),
    txt("intro", { group: "content" }),
    objects(
      "items",
      [str("title"), txt("text"), str("preview", { list: ["otb", "checklist"] }), str("previewCaption")],
      { group: "content", title: "Templates", preview: { title: "title", subtitle: "preview" } },
    ),
    paragraphs("checklist", { group: "content" }),
    str("insideTitle", { group: "content" }),
    paragraphs("inside", { group: "content" }),
    str("formTitle", { group: "content" }),
    txt("formText", { group: "content" }),
    str("panelTitle", { group: "content" }),
    txt("panelText", { group: "content" }),
    strings("chips", { group: "content" }),
    str("button", { group: "content" }),
    str("courseNote", { group: "content" }),
    str("relatedTitle", { group: "content" }),
    ...faqFields,
  ],
  preview: preview("Free templates page"),
});

/** LegalContent (privacy policy). The slug is the public URL: /<slug>. */
export const legalPage = defineType({
  name: "legalPage",
  title: "Legal page",
  type: "document",
  groups,
  fields: [
    languageField,
    { ...keyField, description: "privacy" },
    { ...slugField, group: "content" },
    seoField,
    str("eyebrow", { group: "content" }),
    str("h1", { title: "H1", group: "content" }),
    txt("intro", { group: "content" }),
    objects("sections", [str("id", { title: "Anchor" }), str("title"), txt("text", { rows: 8 })], {
      group: "content",
      preview: { title: "title", subtitle: "id" },
    }),
    txt("note", { group: "content" }),
  ],
  preview: preview("Legal"),
});

const pages = [homepage, aboutPage, listingPage, contactPage, coursesPage, templatesPage, legalPage];
export default pages;
