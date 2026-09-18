import { calculatorHref, caseHref, categoryHref, getAllContent, localizeHref, postHref, serviceHref } from "@/content";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// Built from the same content as the pages (Sanity first), cached like them;
// the publish webhook refreshes it through the `sanity` tag.
export const revalidate = 86400;

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;
const line = (title: string, path: string, note?: string) => `- [${title}](${abs(path)})${note ? `: ${note}` : ""}`;

/**
 * /llms.txt (https://llmstxt.org): a Markdown map of the site for language
 * models and AI agents — H1, a one-paragraph summary, then sections of links
 * with a short note each. English pages in full; Polish and Russian versions
 * are listed as entry points, their pages link to each other through hreflang.
 */
export async function GET() {
  const all = await getAllContent();
  const c = all.en;
  const posts = [...c.posts].sort((a, b) => b.date.localeCompare(a.date));
  const category = (key: string) => c.categories.find((x) => x.key === key)?.label;

  const out = [
    `# ${SITE_NAME} — ${c.person.jobTitle}`,
    "",
    `> ${c.person.shortBio}`,
    "",
    "Consulting for fashion and retail brands: assortment planning, retail pricing and price architecture, Power BI reporting, Excel planning models (open-to-buy), product data quality in PLM. Works in English, Polish and Russian from Warsaw. Consultation requests go through the contact form.",
    "",
    "## Main pages",
    "",
    line("Home", "/", c.home.seo.description),
    line(c.about.seo.title, localizeHref("en", "/about"), c.about.seo.description),
    line(c.servicesPage.h1, localizeHref("en", "/services"), c.servicesPage.seo.description),
    line(c.caseStudiesPage.h1, localizeHref("en", "/case-studies"), c.caseStudiesPage.seo.description),
    line(c.blogPage.h1, localizeHref("en", "/blog"), c.blogPage.seo.description),
    line(c.calculatorsPage.h1, localizeHref("en", "/tools"), c.calculatorsPage.seo.description),
    line(c.templates.h1, localizeHref("en", "/free-templates"), c.templates.seo.description),
    line(c.contact.h1, localizeHref("en", "/contact"), c.contact.seo.description),
    "",
    "## Services",
    "",
    ...c.services.map((s) => line(s.cardTitle, serviceHref("en", s.slug), s.cardText)),
    "",
    "## Case studies",
    "",
    ...c.caseStudies.map((cs) => line(cs.title, caseHref("en", cs.slug), cs.summary)),
    "",
    "## Free retail calculators",
    "",
    ...c.calculators.map((x) => line(x.cardTitle, calculatorHref("en", x.slug), x.cardText)),
    "",
    "## Articles",
    "",
    ...posts.map((p) => line(p.title, postHref("en", p.slug), [category(p.category), p.excerpt].filter(Boolean).join(" — "))),
    "",
    "## Blog categories",
    "",
    ...c.categories.map((x) => line(x.label, categoryHref("en", x.slug), x.seo.description)),
    "",
    "## Other languages",
    "",
    line("Polski: analityka w handlu i modzie", localizeHref("pl", "/"), all.pl.home.seo.description),
    line("Русский: аналитика в ритейле и моде", localizeHref("ru", "/"), all.ru.home.seo.description),
    "",
    "## Optional",
    "",
    line("Sitemap with every page in every language", "/sitemap.xml"),
    line(c.privacy.h1, localizeHref("en", `/${c.privacy.slug}`)),
    "",
  ];

  return new Response(out.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
