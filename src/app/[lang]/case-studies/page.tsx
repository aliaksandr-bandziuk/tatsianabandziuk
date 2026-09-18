import type { Metadata } from "next";
import { caseHref, getContent, localeParams, pageMetadata } from "@/content";
import { CaseCard, CtaPanel, FaqSection, cellAddr } from "@/app/components/site/Blocks";
import CaseSlicer from "@/app/components/site/CaseSlicer";
import JsonLd from "@/app/components/site/JsonLd";
import { SITE_URL } from "@/lib/site";
import s from "../pages.module.scss";

export const generateStaticParams = localeParams;

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  return pageMetadata(params.lang, (await getContent(params.lang)).caseStudiesPage.seo, () => "/case-studies");
}

export default async function CaseStudiesPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const { lang } = params;
  const c = await getContent(lang);
  const p = c.caseStudiesPage;
  const topics = Object.entries(c.ui.topics).map(([key, label]) => ({
    key,
    label,
    count: c.caseStudies.filter((cs) => cs.topics.includes(key)).length,
  }));
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: p.h1,
    description: p.intro,
    inLanguage: lang,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: c.caseStudies.map((cs, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}${caseHref(lang, cs.slug)}`,
        name: cs.title,
      })),
    },
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
        <CaseSlicer topics={topics} labels={c.ui.slicer}>
          {c.caseStudies.map((cs, i) => (
            <div key={cs.slug} data-topics={cs.topics.join(" ")}>
              <CaseCard lang={lang} item={cs} index={i} addr={cellAddr(i, 2)} />
            </div>
          ))}
        </CaseSlicer>
      </section>
      {p.faq && p.faq.length > 0 && <FaqSection title={p.faqTitle ?? p.h1} items={p.faq} />}
      <CtaPanel lang={lang} title={p.ctaTitle ?? ""} text={p.ctaText ?? ""} signature={c.person.signature} />
    </>
  );
}
