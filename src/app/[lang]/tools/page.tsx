import type { Metadata } from "next";
import Link from "next/link";
import { calculatorHref, getContent, localeParams, pageMetadata } from "@/content";
import { CtaPanel, FaqSection } from "@/app/components/site/Blocks";
import JsonLd from "@/app/components/site/JsonLd";
import { SITE_URL } from "@/lib/site";
import s from "../pages.module.scss";

export const generateStaticParams = localeParams;

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  return pageMetadata(params.lang, (await getContent(params.lang)).calculatorsPage.seo, () => "/tools");
}

export default async function CalculatorsPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const { lang } = params;
  const c = await getContent(lang);
  const p = c.calculatorsPage;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: p.h1,
    itemListElement: c.calculators.map((calc, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}${calculatorHref(lang, calc.slug)}`,
      name: calc.cardTitle,
    })),
  };
  return (
    <>
      <JsonLd data={schema} />
      <section className={`container ${s.pageHead}`} data-reveal>
        <p className="eyebrow">{p.eyebrow}</p>
        <h1 className="h1-inner" style={{ marginTop: 20 }}>
          {p.h1}
        </h1>
        <p className="lead">{p.intro}</p>
      </section>
      <section className="container section">
        <div className="grid-3">
          {c.calculators.map((calc, i) => (
            <Link key={calc.key} href={calculatorHref(lang, calc.slug)} className="card lift" style={{ textDecoration: "none", color: "inherit" }} data-reveal data-reveal-delay={(i % 3) * 60}>
              <span className="label">{`=${String(i + 1).padStart(2, "0")}`}</span>
              <h2 className="h3" style={{ margin: "14px 0 10px" }}>
                {calc.cardTitle}
              </h2>
              <p className="body">{calc.cardText}</p>
            </Link>
          ))}
        </div>
      </section>
      {p.faq && p.faq.length > 0 && <FaqSection title={p.faqTitle ?? p.h1} items={p.faq} />}
      {p.ctaTitle && <CtaPanel lang={lang} title={p.ctaTitle} text={p.ctaText ?? ""} signature={c.person.signature} />}
    </>
  );
}
