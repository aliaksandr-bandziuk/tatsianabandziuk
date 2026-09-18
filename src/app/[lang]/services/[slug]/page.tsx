import type { Metadata } from "next";
import { ConsultationButton } from "@/app/components/site/ConsultationModal";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bySlug, caseByKey, caseHref, getContent, itemMetadata, localizeHref, serviceHref, slugParams } from "@/content";
import {
  Accent,
  Breadcrumbs,
  CaseCard,
  CtaPanel,
  FactPanel,
  FaqSection,
  MetricsBand,
  NumberedList,
  Problems,
  RecommendationWide,
  ToolRows,
  accentText,
} from "@/app/components/site/Blocks";
import JsonLd from "@/app/components/site/JsonLd";
import { RelatedCalculators, RelatedPosts, serviceCalculators, servicePosts } from "@/app/components/site/Related";
import { PERSON_ID, SERVICE_ID } from "@/lib/schema/identity";
import { SITE_URL } from "@/lib/site";
import s from "../../pages.module.scss";

type Params = { lang: string; slug: string };

export async function generateStaticParams() {
  return slugParams("service");
}

async function find(params: Params) {
  return bySlug("service", await getContent(params.lang), params.slug);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const sv = await find(params);
  if (!sv) return {};
  return await itemMetadata("service", params.lang, sv);
}

export default async function ServicePage({ params }: { params: Params }) {
  const { lang } = params;
  const c = await getContent(lang);
  const sv = await find(params);
  if (!sv) notFound();
  const related = caseByKey(c, sv.caseStudyKey);
  const url = `${SITE_URL}${serviceHref(lang, sv.slug)}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: accentText(sv.h1),
    serviceType: sv.cardTitle,
    description: sv.intro,
    url,
    inLanguage: lang,
    provider: { "@id": SERVICE_ID },
    broker: { "@id": PERSON_ID },
    areaServed: { "@type": "Place", name: "Europe" },
    availableLanguage: ["en", "pl", "ru"],
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className={`container ${s.innerHero}`}>
        <div data-reveal>
          <Breadcrumbs
            lang={lang}
            items={[
              { label: c.ui.nav[0].label, href: localizeHref(lang, "/services") },
              { label: sv.breadcrumb },
            ]}
          />
          <h1 className="h1-inner">
            <Accent h={sv.h1} />
          </h1>
          <p className="lead">{sv.intro}</p>
          <div style={{ display: "flex", gap: "16px 24px", alignItems: "center", flexWrap: "wrap", marginTop: 30 }}>
            <ConsultationButton href={`${localizeHref(lang, "/contact")}#enquiry`} className="btn">
              {c.ui.bookConsultation}
            </ConsultationButton>
            {related && (
              <Link href={caseHref(lang, related.slug)} className="link">
                {c.ui.seeCaseStudy}
              </Link>
            )}
          </div>
        </div>
        <FactPanel title={sv.factsTitle} facts={sv.facts} note={sv.factsNote} />
      </section>

      <section className="container section">
        <h2 className="h2" style={{ marginBottom: 30 }} data-reveal>
          {sv.problemsTitle}
        </h2>
        <Problems items={sv.problems} />
      </section>

      <section className={`container section ${s.leadCol}`}>
        <div data-reveal>
          <h2 className="h2" style={{ marginBottom: 14 }}>
            {sv.includesTitle}
          </h2>
          <p className="body" style={{ maxWidth: 300 }}>
            {sv.includesLead}
          </p>
        </div>
        <NumberedList items={sv.includes} />
      </section>

      <MetricsBand title={sv.resultsTitle} items={sv.results} />

      <section className={`container section ${s.twoCol}`}>
        <div>
          <h2 className="h2-sm" style={{ marginBottom: 24 }} data-reveal>
            {sv.toolsTitle}
          </h2>
          <ToolRows tools={sv.tools} />
        </div>
        {related && (
          <div>
            <h2 className="h2-sm" style={{ marginBottom: 24 }} data-reveal>
              {c.ui.relatedCaseStudy}: {related.title}
            </h2>
            <CaseCard lang={lang} item={related} />
          </div>
        )}
      </section>

      <RelatedCalculators lang={lang} items={await serviceCalculators(lang, sv.key)} />

      <RelatedPosts lang={lang} posts={await servicePosts(lang, sv.key)} />

      {/* Recommendation: hidden until real ones arrive (owner, 2026-09-18).
      <RecommendationWide title={sv.recommendationTitle} note={c.ui.recommendationPlaceholder} item={sv.recommendation} />
      */}

      <FaqSection title={sv.faqTitle} items={sv.faq} />

      <CtaPanel lang={lang} title={sv.ctaTitle} text={sv.ctaText} signature={c.person.signature} />
    </>
  );
}
