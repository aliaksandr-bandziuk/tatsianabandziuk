import localizedSlug from "./localizedSlug";
import seo from "./objects/seo";
import primitives from "./objects/primitives";
import richText from "./objects/richText";

import siteSettings from "./documents/siteSettings";
import homepage from "./documents/homepage";
import person from "./documents/person";
import experience from "./documents/experience";
import service from "./documents/service";
import consultingFormat from "./documents/consultingFormat";
import caseStudy from "./documents/caseStudy";
import post from "./documents/post";
import category from "./documents/category";
import tool from "./documents/tool";
import recommendation from "./documents/recommendation";
import leadMagnet from "./documents/leadMagnet";
import legalPage from "./documents/legalPage";
import pageSettings from "./documents/pageSettings";
import contactForm from "./documents/contactForm";

/** Documents that exist once per language (managed by the i18n plugin). */
export const TRANSLATED_TYPES = [
  "siteSettings",
  "homepage",
  "person",
  "experience",
  "service",
  "consultingFormat",
  "caseStudy",
  "post",
  "category",
  "tool",
  "recommendation",
  "leadMagnet",
  "legalPage",
  "pageSettings",
  "contactForm",
];

export const schemaTypes = [
  // documents
  siteSettings,
  homepage,
  person,
  experience,
  service,
  consultingFormat,
  caseStudy,
  post,
  category,
  tool,
  recommendation,
  leadMagnet,
  legalPage,
  pageSettings,
  contactForm,
  // objects
  localizedSlug,
  seo,
  richText,
  ...primitives,
];
