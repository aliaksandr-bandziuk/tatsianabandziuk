import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllContent, getContent, pageMetadata } from "@/content";
import { LOCALES } from "@/lib/site";
import s from "../pages.module.scss";

/** Legal pages: one localized slug per language (privacy policy for now). */

export async function generateStaticParams() {
  const all = await getAllContent();
  return LOCALES.map((lang) => ({ lang, slug: all[lang].privacy.slug }));
}

async function legalFor(lang: string, slug: string) {
  const p = (await getContent(lang)).privacy;
  return p.slug === slug ? p : null;
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }): Promise<Metadata> {
  const p = await legalFor(params.lang, params.slug);
  if (!p) return {};
  const all = await getAllContent();
  return pageMetadata(params.lang, p.seo, (l) => `/${all[l].privacy.slug}`);
}

export default async function LegalPage({ params }: { params: { lang: string; slug: string } }) {
  const c = await getContent(params.lang);
  const p = await legalFor(params.lang, params.slug);
  if (!p) notFound();

  return (
    <>
      <section className={`container ${s.pageHead}`} data-reveal>
        <p className="eyebrow">{p.eyebrow}</p>
        <h1 className="h1-inner" style={{ marginTop: 20 }}>
          {p.h1}
        </h1>
        <p className="lead">{p.intro}</p>
      </section>
      <section className={`container section ${s.legal}`}>
        <nav className={s.toc} aria-label={c.ui.toc}>
          <span className="label">{c.ui.toc}</span>
          <ol>
            {p.sections.map((sec) => (
              <li key={sec.id}>
                <a href={`#${sec.id}`}>{sec.title}</a>
              </li>
            ))}
          </ol>
        </nav>
        <div>
          {p.sections.map((sec) => (
            <section key={sec.id} id={sec.id}>
              <h2>{sec.title}</h2>
              {sec.text.split("\n\n").map((para) => (
                <p key={para} className="body-lg" style={{ whiteSpace: "pre-line" }}>
                  {para}
                </p>
              ))}
            </section>
          ))}
          <p className="caption" style={{ marginTop: 36 }}>
            {p.note}
          </p>
        </div>
      </section>
    </>
  );
}
