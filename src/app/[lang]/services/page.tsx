import type { Metadata } from "next";
import { getContent, localeParams, pageMetadata, serviceHref } from "@/content";
import { CtaPanel, FaqSection, FormatCards, RecommendationWide, ServicesGrid } from "@/app/components/site/Blocks";
import JsonLd from "@/app/components/site/JsonLd";
import { SERVICE_ID } from "@/lib/schema/identity";
import { SITE_URL } from "@/lib/site";
import s from "../pages.module.scss";

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return pageMetadata(params.lang, (await getContent(params.lang)).servicesPage.seo, () => "/services");
}

export default async function ServicesPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const c = await getContent(lang);
  const p = c.servicesPage;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: p.h1,
    itemListElement: c.services.map((sv, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: sv.cardTitle,
        description: sv.cardText,
        url: `${SITE_URL}${serviceHref(lang, sv.slug)}`,
        provider: { "@id": SERVICE_ID },
      },
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
        <ServicesGrid lang={lang} services={c.services} />
      </section>
      <section className="container section">
        <h2 className="h2" style={{ marginBottom: 34 }} data-reveal>
          {c.home.formatsTitle}
        </h2>
        <FormatCards lang={lang} formats={c.formats} clientTypesLabel={c.home.clientTypesLabel} clientTypes={c.home.clientTypes} />
      </section>
      {p.recommendation && p.recommendationTitle && (
        <RecommendationWide title={p.recommendationTitle} note={c.ui.recommendationPlaceholder} item={p.recommendation} />
      )}
      {p.faq && p.faq.length > 0 && <FaqSection title={p.faqTitle ?? p.h1} items={p.faq} />}
      <CtaPanel lang={lang} title={p.ctaTitle ?? ""} text={p.ctaText ?? ""} signature={c.person.signature} />
    </>
  );
}
