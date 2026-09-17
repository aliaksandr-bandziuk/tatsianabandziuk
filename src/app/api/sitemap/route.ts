import { getRoutableDocuments } from "@/sanity/sanity.utils";
import { BASE_URL, findAltSlug, localePrefix } from "@/utils/hreflang";
import { LOCALES, ROUTES } from "@/lib/site";
import { getContent } from "@/content";

// Cached like the pages; the publish webhook refreshes it.
export const revalidate = 86400;

/** Fixed pages that exist in every language (paths after the locale prefix). */
const STATIC_PATHS = ["", "/services", "/case-studies", "/blog", "/about", "/contact", "/courses", "/free-templates"];

const SEGMENT: Record<string, string> = {
  service: ROUTES.service,
  caseStudy: ROUTES.caseStudy,
  post: ROUTES.post,
  category: ROUTES.category,
  legalPage: "",
};

type Entry = { loc: string; lastmod?: string; alternates: Record<string, string> };

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function url(lang: string, path: string) {
  return `${BASE_URL}${localePrefix(lang)}${path}` || BASE_URL;
}

export async function GET() {
  const entries: Entry[] = [];

  for (const path of STATIC_PATHS) {
    const alternates = Object.fromEntries(LOCALES.map((l) => [l, url(l, path) || `${BASE_URL}/`]));
    for (const lang of LOCALES) {
      entries.push({ loc: alternates[lang], alternates });
    }
  }

  let docs: Awaited<ReturnType<typeof getRoutableDocuments>> = [];
  try {
    docs = await getRoutableDocuments();
  } catch (err) {
    console.error("[sitemap] Sanity fetch failed:", err);
  }

  if (docs.length === 0) {
    // Sanity is not seeded yet: list the fallback content (same slug index in every language).
    const add = (pathFor: (lang: string) => string | undefined) => {
      const alternates: Record<string, string> = {};
      for (const l of LOCALES) {
        const p = pathFor(l);
        if (p) alternates[l] = url(l, p);
      }
      for (const l of Object.keys(alternates)) entries.push({ loc: alternates[l], alternates });
    };
    const en = getContent("en");
    add((l) => `/${getContent(l).privacy.slug}`);
    en.services.forEach((_, i) => add((l) => getContent(l).services[i] && `/${ROUTES.service}/${getContent(l).services[i].slug}`));
    en.caseStudies.forEach((_, i) => add((l) => getContent(l).caseStudies[i] && `/${ROUTES.caseStudy}/${getContent(l).caseStudies[i].slug}`));
    en.posts.forEach((_, i) => add((l) => getContent(l).posts[i] && `/${ROUTES.post}/${getContent(l).posts[i].slug}`));
    en.categories.forEach((_, i) => add((l) => getContent(l).categories[i] && `/${ROUTES.category}/${getContent(l).categories[i].slug}`));
  }

  for (const doc of docs) {
    const segment = SEGMENT[doc._type];
    const pathFor = (slug: string) => (segment ? `/${segment}/${slug}` : `/${slug}`);
    const alternates: Record<string, string> = {};
    for (const lang of LOCALES) {
      const slug = lang === doc.language ? doc.slug : findAltSlug(doc._translations ?? [], lang);
      if (slug) alternates[lang] = url(lang, pathFor(slug));
    }
    entries.push({ loc: alternates[doc.language], lastmod: doc.updatedAt, alternates });
  }

  const body = entries
    .map((e) => {
      const links = Object.entries(e.alternates)
        .map(([l, href]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${esc(href)}"/>`)
        .concat(
          e.alternates.en
            ? [`    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(e.alternates.en)}"/>`]
            : [],
        )
        .join("\n");
      const lastmod = e.lastmod ? `\n    <lastmod>${new Date(e.lastmod).toISOString()}</lastmod>` : "";
      return `  <url>\n    <loc>${esc(e.loc)}</loc>${lastmod}\n${links}\n  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
