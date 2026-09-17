import { defineField, defineType } from "sanity";
import { groups, languageField, seoField } from "../shared";

/** One per language: header, footer and site-wide defaults. */
export default defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups,
  fields: [
    defineField({ name: "title", title: "Site name", type: "string", initialValue: "Tatsiana Bandziuk" }),
    defineField({ name: "tagline", title: "Tagline under the name", type: "string", description: "e.g. RETAIL & FASHION ANALYTICS" }),
    defineField({ name: "navigation", title: "Header navigation", type: "array", of: [{ type: "link" }] }),
    defineField({ name: "ctaLabel", title: "Header button label", type: "string", description: "e.g. Book a Consultation" }),
    defineField({ name: "footerText", title: "Footer description", type: "text", rows: 3 }),
    defineField({ name: "footerServicesTitle", title: "Footer: services column title", type: "string" }),
    defineField({ name: "footerSiteTitle", title: "Footer: site column title", type: "string" }),
    defineField({ name: "footerLinks", title: "Footer: site links", type: "array", of: [{ type: "link" }] }),
    defineField({ name: "email", title: "Contact email", type: "string" }),
    defineField({ name: "location", title: "Location line", type: "string", description: "e.g. Warsaw · CET" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url", initialValue: "https://www.linkedin.com/in/tatsiana-bandziuk-a96b81165/" }),
    defineField({ name: "privacyLabel", title: "Privacy policy link label", type: "string" }),
    seoField,
    languageField,
  ],
  preview: { select: { title: "title", subtitle: "language" } },
});
