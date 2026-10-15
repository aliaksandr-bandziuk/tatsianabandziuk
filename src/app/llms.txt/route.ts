import { NextResponse } from "next/server";
import { getAllContent, calculatorHref, caseHref, localizeHref, postHref, serviceHref } from "@/content";
import { LOCALES, SITE_NAME, SITE_URL, INDEXING_ALLOWED } from "@/lib/site";
import type { AccentHeading, Locale, SiteContent } from "@/content/types";

/**
 * /llms.txt — what the site is and where to look, for assistants that read a
 * page instead of crawling a sitemap.
 *
 * Built from the same content loader as the pages (Sanity first, fallback
 * modules otherwise), so it cannot drift from the site the way a hand-written
 * file does. Cached and revalidated like the pages; the publish webhook
 * refreshes it with everything else.
 *
 * The path contains a dot, so the i18n middleware leaves it alone and it is
 * served from the site root.
 */
export const revalidate = 86400;

const LABEL: Record<Locale, { lang: string; services: string; cases: string; tools: string; articles: string; pages: string; contact: string }> = {
  en: { lang: "English", services: "Services", cases: "Case studies", tools: "Free calculators", articles: "Recent articles", pages: "Key pages", contact: "Contact" },
  pl: { lang: "Polski", services: "Usługi", cases: "Case studies", tools: "Darmowe kalkulatory", articles: "Najnowsze artykuły", pages: "Najważniejsze strony", contact: "Kontakt" },
  ru: { lang: "Русский", services: "Услуги", cases: "Кейсы", tools: "Бесплатные калькуляторы", articles: "Свежие статьи", pages: "Основные страницы", contact: "Контакты" },
};

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;
/** Page headings are plain strings on some models and accent headings on others. */
const heading = (h: string | AccentHeading) =>
  typeof h === "string" ? h : [h.before, h.accent, h.after].filter(Boolean).join(" ").trim();

const line = (title: string, url: string, note?: string) => `- [${title}](${abs(url)})${note ? `: ${note}` : ""}`;

function section(lang: Locale, c: SiteContent): string {
  const t = LABEL[lang];
  const out: string[] = [];
  out.push(`## ${t.lang} (${lang})`);
  out.push("");
  out.push(c.person.shortBio);
  out.push("");
  out.push(`### ${t.services}`);
  out.push(...c.services.map((s) => line(s.cardTitle, serviceHref(lang, s.slug), s.cardText)));
  out.push("");
  out.push(`### ${t.tools}`);
  out.push(...c.calculators.map((x) => line(x.cardTitle, calculatorHref(lang, x.slug), x.lead)));
  out.push("");
  out.push(`### ${t.cases}`);
  out.push(...c.caseStudies.map((x) => line(x.title, caseHref(lang, x.slug), x.summary)));
  out.push("");
  out.push(`### ${t.articles}`);
  out.push(
    ...[...c.posts]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 12)
      .map((p) => line(p.title, postHref(lang, p.slug), p.excerpt)),
  );
  out.push("");
  out.push(`### ${t.pages}`);
  out.push(line(heading(c.about.h1), localizeHref(lang, "/about")));
  out.push(line(heading(c.servicesPage.h1), localizeHref(lang, "/services")));
  out.push(line(heading(c.blogPage.h1), localizeHref(lang, "/blog")));
  out.push(line(heading(c.templates.h1), localizeHref(lang, "/free-templates")));
  out.push(line(heading(c.contact.h1), localizeHref(lang, "/contact")));
  out.push("");
  out.push(`### ${t.contact}`);
  out.push(`- ${c.person.email}`);
  out.push(`- ${c.person.location} · ${c.person.timezone}`);
  out.push(`- ${c.person.linkedin}`);
  return out.join("\n");
}

export async function GET() {
  if (!INDEXING_ALLOWED) return new NextResponse("", { status: 404 });

  const all = await getAllContent();
  const en = all.en;

  const head = [
    `# ${SITE_NAME}`,
    "",
    `> ${en.person.jobTitle}. ${en.person.shortBio}`,
    "",
    `The site is published in three languages: English at ${SITE_URL}/, Polish under /pl/ and Russian under /ru/.`,
    "Each language is written from its own keyword research, so the versions are not translations of each other and the article lists differ.",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
    "## About this file",
    "",
    "Definitions, formulas and worked examples on this site are written to be quoted:",
    "every article opens with a direct answer, formulas are given as text rather than images,",
    "and the calculators show the same formulas with a worked example.",
    "Figures in the case studies come from real projects; the client names are withheld.",
    "",
  ].join("\n");

  const body = LOCALES.map((l) => section(l, all[l])).join("\n\n");
  const foot = `\n\n---\n\nLast updated: ${new Date().toISOString().slice(0, 10)}\n`;

  return new NextResponse(head + body + foot, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
