import localizedSlug from "./localizedSlug";
import common from "./objects/common";
import { ARTICLE_BLOCKS } from "./objects/article";
import siteSettings from "./documents/siteSettings";
import pages from "./documents/pages";
import collections from "./documents/collections";

/** Documents that exist once per language (managed by the i18n plugin). */
export const TRANSLATED_TYPES = [
  "siteSettings",
  "homepage",
  "aboutPage",
  "listingPage",
  "contactPage",
  "coursesPage",
  "templatesPage",
  "legalPage",
  "service",
  "caseStudy",
  "post",
  "category",
  "calculatorPage",
];

export const schemaTypes = [siteSettings, ...pages, ...collections, localizedSlug, ...common, ...ARTICLE_BLOCKS];
