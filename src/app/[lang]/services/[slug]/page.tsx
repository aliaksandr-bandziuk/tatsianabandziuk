import type { Metadata } from "next";
import { ConsultationButton } from "@/app/components/site/ConsultationModal";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseHref, getContent, localizeHref, pageMetadata, serviceHref } from "@/content";
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
import { PERSON_ID, SERVICE_ID } from "@/lib/schema/identity";
import { LOCALES, SITE_URL } from "@/lib/site";
import s from "../../pages.module.scss";

type Params = { lang: string; slug: string };


export function generateStaticParams() {
  return LOCALES.flatMap((lang) => getContent(lang).services.map((sv) => ({ lang, slug: sv.slug })));
}

function find(params: Params) {
  return getContent(params.lang).services.find((sv) => sv.slug === params.slug);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const sv = find(params);
  if (!sv) return {};
  return pageMetadata(params.lang, sv.seo, () => `/services/${sv.slug}`);
}

export default function ServicePage({ params }: { params: Params }) {
  const { lang } = params;
  const c = getContent(lang);
  const sv = find(params);
  if (!sv) notFound();
  const related = sv.caseStudySlug ? c.caseStudies.find((cs) => cs.slug === sv.caseStudySlug) : undefined;
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

      <MetricsBand title={sv.resultsTitle} note={c.ui.placeholderFigures} items={sv.results} />

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

      <RecommendationWide title={sv.recommendationTitle} note={c.ui.recommendationPlaceholder} item={sv.recommendation} />

      <FaqSection title={sv.faqTitle} items={sv.faq} />

      <CtaPanel lang={lang} title={sv.ctaTitle} text={sv.ctaText} signature={c.person.signature} />
    </>
  );
}
