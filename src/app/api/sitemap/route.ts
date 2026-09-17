import { BASE_URL, localePrefix } from "@/utils/hreflang";
import { LOCALES } from "@/lib/site";
import { routableGroups, STATIC_PATHS } from "@/content";
import { localizePath } from "@/lib/routing";

// Cached like the pages; the publish webhook refreshes it.
export const revalidate = 86400;

type Entry = { loc: string; lastmod?: string; alternates: Record<string, string> };

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function url(lang: string, path: string) {
  return `${BASE_URL}${localePrefix(lang)}${localizePath(lang, path)}` || BASE_URL;
}

/**
 * Every page in every language with hreflang alternates. Items come from the
 * same content loader as the pages (Sanity first, fallback modules otherwise),
 * grouped by their language-independent key.
 */
export async function GET() {
  const entries: Entry[] = [];

  for (const path of STATIC_PATHS) {
    const alternates = Object.fromEntries(LOCALES.map((l) => [l, url(l, path) || `${BASE_URL}/`]));
    for (const lang of LOCALES) {
      entries.push({ loc: alternates[lang], alternates });
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
