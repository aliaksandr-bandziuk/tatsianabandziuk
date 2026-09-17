import type { StructureBuilder, StructureResolver } from "sanity/structure";
import { i18n } from "@/i18n.config";

/**
 * Studio sidebar: settings and fixed pages first, then collections. Every
 * type opens as a language picker (EN / PL / RU / all).
 */
const byLanguage = (S: StructureBuilder, type: string, title: string) =>
  S.listItem()
    .title(title)
    .id(type)
    .schemaType(type)
    .child(
      S.list()
        .title(title)
        .items([
          ...i18n.languages.map((lang) =>
            S.listItem()
              .title(lang.title)
              .id(`${type}-${lang.id}`)
              .schemaType(type)
              .child(
                S.documentTypeList(type)
                  .title(`${title} · ${lang.id.toUpperCase()}`)
                  .filter("_type == $type && language == $lang")
                  .params({ type, lang: lang.id }),
              ),
          ),
          S.divider(),
          S.listItem().title("All languages").id(`${type}-all`).schemaType(type).child(S.documentTypeList(type).title(title)),
        ]),
    );

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      byLanguage(S, "siteSettings", "Site settings"),
      S.divider(),
      byLanguage(S, "homepage", "Home page"),
      byLanguage(S, "aboutPage", "About page"),
      byLanguage(S, "listingPage", "Listing pages (services, case studies, blog, calculators)"),
      byLanguage(S, "contactPage", "Contact page"),
      byLanguage(S, "coursesPage", "Courses page"),
      byLanguage(S, "templatesPage", "Free templates page"),
      byLanguage(S, "legalPage", "Privacy policy"),
      S.divider(),
      byLanguage(S, "service", "Services"),
      byLanguage(S, "caseStudy", "Case studies"),
      byLanguage(S, "post", "Articles"),
      byLanguage(S, "category", "Rubrics"),
      byLanguage(S, "calculatorPage", "Calculators"),
    ]);
