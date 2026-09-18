import { BASE_URL, localePrefix } from "@/utils/hreflang";
import { LOCALES } from "@/lib/site";
import { getAllContent, routableGroups, STATIC_PATHS } from "@/content";
import type { SiteContent } from "@/content/types";
import { localizePath } from "@/lib/routing";

// Cached like the pages; the publish webhook refreshes it.
export const revalidate = 86400;

type Entry = { loc: string; lastmod?: string; alternates: Record<string, string> };

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function url(lang: string, path: string) {
  return `${BASE_URL}${localePrefix(lang)}${localizePath(lang, path)}` || BASE_URL;
}

const latest = (dates: (string | undefined)[]) =>
  dates.filter((d): d is string => Boolean(d)).sort((a, b) => Date.parse(b) - Date.parse(a))[0];

const dates = (items: { updatedAt?: string }[]) => items.map((i) => i.updatedAt);

/**
 * Last edit of a fixed page: its own Sanity document, and for pages that list
 * items (home, listings) also the newest item they show. Undefined when the
 * content comes from the fallback modules.
 */
function staticLastmod(c: SiteContent, path: string): string | undefined {
  switch (path) {
    case "":
      return latest([c.home.updatedAt, ...dates(c.services), ...dates(c.caseStudies), ...dates(c.posts)]);
    case "/services":
      return latest([c.servicesPage.updatedAt, ...dates(c.services)]);
    case "/case-studies":
      return latest([c.caseStudiesPage.updatedAt, ...dates(c.caseStudies)]);
    case "/blog":
      return latest([c.blogPage.updatedAt, ...dates(c.posts), ...dates(c.categories)]);
    case "/tools":
      return latest([c.calculatorsPage.updatedAt, ...dates(c.calculators)]);
    case "/about":
      return c.about.updatedAt;
    case "/contact":
      return c.contact.updatedAt;
    case "/courses":
      return c.courses.updatedAt;
    case "/free-templates":
      return c.templates.updatedAt;
    default:
      return undefined;
  }
}

/**
 * Every page in every language with hreflang alternates and lastmod. Items come
 * from the same content loader as the pages (Sanity first, fallback modules
 * otherwise), grouped by their language-independent key.
 */
export async function GET() {
  const entries: Entry[] = [];
  const all = await getAllContent();

  for (const path of STATIC_PATHS) {
    const alternates = Object.fromEntries(LOCALES.map((l) => [l, url(l, path) || `${BASE_URL}/`]));
    for (const lang of LOCALES) {
      entries.push({ loc: alternates[lang], lastmod: staticLastmod(all[lang], path), alternates });
    }
  }

  for (const group of await routableGroups()) {
    const alternates: Record<string, string> = {};
    for (const l of LOCALES) {
      const p = group.paths[l as keyof typeof group.paths];
      if (p) alternates[l] = url(l, p);
    }
    for (const l of Object.keys(alternates)) {
      entries.push({ loc: alternates[l], lastmod: group.updatedAt?.[l as keyof typeof group.paths], alternates });
    }
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
