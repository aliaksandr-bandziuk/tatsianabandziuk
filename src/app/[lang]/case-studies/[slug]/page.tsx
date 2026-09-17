import type { Metadata } from "next";
import { ConsultationButton } from "@/app/components/site/ConsultationModal";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseHref, getContent, localizeHref, pageMetadata, serviceHref } from "@/content";
import { Accent, Breadcrumbs, CaseCard, FactPanel, MetricsBand, NumberedList, ToolRows, accentText } from "@/app/components/site/Blocks";
import { CaseDashboard } from "@/app/components/site/Charts";
import JsonLd from "@/app/components/site/JsonLd";
import { PERSON_ID } from "@/lib/schema/identity";
import { LOCALES, SITE_URL } from "@/lib/site";
import s from "../../pages.module.scss";

type Params = { lang: string; slug: string };


export function generateStaticParams() {
  return LOCALES.flatMap((lang) => getContent(lang).caseStudies.map((cs) => ({ lang, slug: cs.slug })));
}

function find(params: Params) {
  return getContent(params.lang).caseStudies.find((cs) => cs.slug === params.slug);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const cs = find(params);
  if (!cs) return {};
  return pageMetadata(params.lang, cs.seo, () => `/case-studies/${cs.slug}`, { type: "article" });
}

export default function CaseStudyPage({ params }: { params: Params }) {
  const { lang } = params;
  const c = getContent(lang);
  const cs = find(params);
  if (!cs) notFound();
  const others = c.caseStudies.filter((x) => x.slug !== cs.slug).slice(0, 3);
  const url = `${SITE_URL}${caseHref(lang, cs.slug)}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: accentText(cs.h1),
    description: cs.intro,
    url,
    inLanguage: lang,
    datePublished: cs.publishedAt,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    about: cs.tag,
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className={`container ${s.innerHero}`}>
        <div data-reveal>
          <Breadcrumbs
            lang={lang}
            items={[
              { label: c.ui.nav[1].label, href: localizeHref(lang, "/case-studies") },
              { label: cs.breadcrumb },
            ]}
          />
          <h1 className="h1-inner">
            <Accent h={cs.h1} />
          </h1>
          <p className="lead">{cs.intro}</p>
        </div>
        <FactPanel title={{ en: "Type of company", pl: "Typ firmy", ru: "Тип компании" }[lang] ?? "Type of company"} facts={cs.facts} note={cs.factsNote} noteHand={false} />
      </section>

      <section className="container section">
        <div className="panel panel-sand" data-reveal style={{ padding: "30px 30px 24px" }}>
          <CaseDashboard variant={cs.dashboard} tall />
          <span className="caption" style={{ marginTop: 12, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 10 }}>
            {c.ui.dashboardCaption}
          </span>
        </div>
      </section>

      <section className={`container section ${s.twoCol}`}>
        <div data-reveal>
          <h2 className="h2-sm" style={{ marginBottom: 20 }}>
            {cs.challengeTitle}
          </h2>
          {cs.challenge.map((p) => (
            <p key={p} className="body-lg" style={{ marginBottom: 14, color: "var(--grey)" }}>
              {p}
            </p>
          ))}
          <ul className={s.checklist} style={{ marginTop: 20 }}>
            {cs.challengePoints.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="h2-sm" style={{ marginBottom: 20 }} data-reveal>
            {cs.actionsTitle}
          </h2>
          <NumberedList items={cs.actions} />
        </div>
      </section>

      <MetricsBand title={cs.resultsTitle} note={c.ui.placeholderFigures} items={cs.results} />

      <section className={`container section ${s.twoCol}`}>
        <div>
          <h2 className="h2-sm" style={{ marginBottom: 22 }} data-reveal>
            {cs.toolsTitle}
          </h2>
          <ToolRows tools={cs.tools} />
        </div>
        <div data-reveal>
          <h2 className="h2-sm" style={{ marginBottom: 22 }}>
            {cs.serviceTitle}
          </h2>
          <div className="card card-sand">
            <p className="body-lg" style={{ marginBottom: 18, color: "var(--grey)" }}>
              {cs.serviceText}
            </p>
            <div className="chips" style={{ marginBottom: 22 }}>
              {cs.serviceChips.map((ch) => (
                <span key={ch} className="chip">
                  {ch}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: "12px 20px", flexWrap: "wrap", alignItems: "center" }}>
              <ConsultationButton href={`${localizeHref(lang, "/contact")}#enquiry`} className="btn btn-inline">
                {c.ui.bookConsultation}
              </ConsultationButton>
              <Link href={serviceHref(lang, cs.serviceSlug)} className="link">
                {c.ui.relatedService}
              </Link>
            </div>
          </div>
          <p className="hand" style={{ fontSize: 18, margin: "20px 2px 0" }}>
            {cs.note}
          </p>
        </div>
      </section>

      <section className="container section">
        <h2 className="h2-sm" style={{ marginBottom: 26 }} data-reveal>
          {c.caseStudiesPage.h1}
        </h2>
        <div className="grid-3">
          {others.map((o, i) => (
            <CaseCard key={o.slug} lang={lang} item={o} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
