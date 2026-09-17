import type { Metadata } from "next";
import { ConsultationButton } from "@/app/components/site/ConsultationModal";
import Link from "next/link";
import { getContent, localeParams, localizeHref, pageMetadata } from "@/content";
import {
  Accent,
  CaseCard,
  FaqSection,
  FormatCards,
  MetricsBand,
  Photo,
  PostCard,
  RecommendationCards,
  SectionHead,
  ServicesGrid,
  Steps,
  Timeline,
  ToolCards,
} from "@/app/components/site/Blocks";
import { HeroChart } from "@/app/components/site/Charts";
import { ContactForm, EmailSignup } from "@/app/components/site/Forms";
import CountUp from "@/app/components/site/CountUp";
import JsonLd from "@/app/components/site/JsonLd";
import { PERSON_ID, SERVICE_ID } from "@/lib/schema/identity";
import { SITE_URL } from "@/lib/site";
import s from "./pages.module.scss";

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const c = getContent(params.lang);
  return pageMetadata(params.lang, c.home.seo, () => "/", { absoluteTitle: true });
}

export default function Home({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const c = getContent(lang);
  const h = c.home;
  const contactHref = localizeHref(lang, "/contact");

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}${localizeHref(lang, "/") === "/" ? "" : localizeHref(lang, "/")}#webpage`,
    url: `${SITE_URL}${localizeHref(lang, "/") === "/" ? "" : localizeHref(lang, "/")}`,
    name: h.seo.title,
    description: h.seo.description,
    inLanguage: lang,
    mainEntity: { "@id": PERSON_ID },
    about: { "@id": SERVICE_ID },
  };

  return (
    <>
      <JsonLd data={schema} />

      {/* Hero */}
      <section className={`container ${s.hero}`}>
        <div data-reveal>
          <p className="eyebrow">{h.eyebrow}</p>
          <h1 className={`h1 ${s.heroTitle}`}>
            {h.h1.before}
            <br />
            <span className="accent">{h.h1.accent}</span> {h.h1.after}
          </h1>
          <p className="lead">{h.subtitle}</p>
          <div className={s.heroActions}>
            <ConsultationButton href={`${contactHref}#enquiry`} className="btn">
              {h.primaryCta}
            </ConsultationButton>
            <Link href={localizeHref(lang, "/case-studies")} className="link">
              {h.secondaryCta}
            </Link>
          </div>
          <div className={s.stats}>
            {h.stats.map((st) => (
              <div key={st.label} className={s.stat}>
                <b>
                  <CountUp value={st.value} />
                </b>
                <span>{st.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={s.heroMedia} data-reveal data-reveal-delay="150">
          <Photo label={c.ui.portraitPlaceholder} height="auto" className={s.heroPhoto} />
          <HeroChart label={h.chartLabel} delta={h.chartDelta} note={h.chartNote} />
        </div>
      </section>

      {/* Experience strip */}
      <section className="container section">
        <div className={s.experience} data-reveal>
          <h2>{h.experienceTitle}</h2>
          <div className={s.experienceNames}>
            {h.experienceNames.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container section">
        <SectionHead title={h.servicesTitle} aside={<span className="eyebrow">{h.servicesCount}</span>} />
        <ServicesGrid lang={lang} services={c.services} />
      </section>

      {/* About teaser */}
      <section className="container section">
        <div className={`panel ${s.about}`} data-reveal>
          <Photo label={c.ui.portraitPlaceholder} height="auto" className={s.aboutPhoto} />
          <div>
            <h2 className="h2-sm">{h.aboutTitle}</h2>
            {h.aboutText.map((p) => (
              <p key={p} className="body-lg">
                {p}
              </p>
            ))}
            <p className="eyebrow" style={{ margin: "14px 0 12px" }}>
              {h.timelineLabel}
            </p>
            <Timeline items={h.timeline} />
            <div className={s.aboutFoot}>
              <span className="chip">{c.person.educationChip}</span>
              <Link className="link" href={localizeHref(lang, "/about")}>
                {h.aboutLink}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <MetricsBand title={h.resultsTitle} note={h.resultsNote} items={h.results} />

      {/* Formats */}
      <section className="container section">
        <SectionHead title={h.formatsTitle} />
        <FormatCards lang={lang} formats={c.formats} clientTypesLabel={h.clientTypesLabel} clientTypes={h.clientTypes} />
      </section>

      {/* Process */}
      <section className={`container section ${s.process}`}>
        <div>
          <h2 className="h2" data-reveal>
            {h.processTitle}
          </h2>
          <Steps steps={h.process} />
        </div>
        <div data-reveal data-reveal-delay="120">
          <Photo label={h.processPhotoLabel} height="auto" className={s.processPhoto} />
          <p className="hand" style={{ fontSize: 17, margin: "16px 4px 0" }}>
            {h.processNote}
          </p>
        </div>
      </section>

      {/* Tools */}
      <section className="container section">
        <div className="panel">
          <h2 className="h2" style={{ marginBottom: 34 }} data-reveal>
            {h.toolsTitle}
          </h2>
          <ToolCards tools={c.tools} />
        </div>
      </section>

      {/* Education */}
      <section className="container section">
        <div className={s.education} data-reveal>
          <h2>{h.educationTitle}</h2>
          <div className="chips">
            {h.educationChips.map((ch, i) => (
              <span key={ch} className={`chip ${i > 0 ? "chip-paper" : ""}`} style={i > 0 ? { color: "var(--text-tertiary)" } : undefined}>
                {ch}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="container section">
        <SectionHead
          title={h.caseStudiesTitle}
          aside={
            <Link className="link" href={localizeHref(lang, "/case-studies")}>
              {c.ui.allCaseStudies}
            </Link>
          }
        />
        <div className="grid-3">
          {c.caseStudies.slice(0, 3).map((cs, i) => (
            <CaseCard key={cs.slug} lang={lang} item={cs} index={i} />
          ))}
        </div>
      </section>

      {/* Recommendations */}
      <section className="container section">
        <SectionHead
          title={h.recommendationsTitle}
          aside={
            <span className="eyebrow" style={{ maxWidth: 300, textAlign: "right" }}>
              {h.recommendationsNote}
            </span>
          }
        />
        <RecommendationCards items={c.recommendations} />
      </section>

      {/* Free templates */}
      <section className="container section">
        <div className={`panel ${s.templates}`} data-reveal>
          <div>
            <h2 className="h2-sm">{c.templates.panelTitle}</h2>
            <p className="body-lg">{c.templates.panelText}</p>
            <div className="chips">
              {c.templates.chips.map((ch) => (
                <Link key={ch} className="chip" href={localizeHref(lang, "/free-templates")}>
                  {ch}
                </Link>
              ))}
            </div>
          </div>
          <EmailSignup
            kind="templates"
            form={c.ui.form}
            button={c.templates.button}
            note={c.templates.courseNote}
            thanks={{ title: c.thankYou.templatesTitle, text: c.thankYou.templatesText, sent: c.thankYou.sent, items: c.templates.items.map((i) => i.title) }}
          />
        </div>
      </section>

      {/* FAQ */}
      <FaqSection title={h.faqTitle} lead={h.faqLead} items={h.faq} />

      {/* Blog */}
      <section className="container section">
        <SectionHead
          title={h.blogTitle}
          aside={
            <Link className="link" href={localizeHref(lang, "/blog")}>
              {c.ui.allArticles}
            </Link>
          }
        />
        <div className="grid-3">
          {c.posts.slice(0, 3).map((p, i) => (
            <PostCard key={p.slug} lang={lang} post={p} index={i} />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="container section" id="contact">
        <div className={`panel ${s.contact}`} data-reveal>
          <div>
            <Photo label={c.ui.portraitPlaceholder} height="auto" className={s.contactPhoto} />
            <h2 className="h2-sm" style={{ marginBottom: 16 }}>
              {h.contactTitle}
            </h2>
            <p className="body-lg">{h.contactNote}</p>
            <p className="signature" style={{ fontSize: 30, marginTop: 18 }}>
              {c.person.signature}
            </p>
            <div className={s.contactMeta}>
              <a href={`mailto:${c.person.email}`}>{c.person.email}</a>
              <span>
                {c.person.location} · {c.person.timezone}
              </span>
            </div>
          </div>
          <ContactForm
            lang={lang}
            form={c.ui.form}
            languages={c.ui.languages}
            thanks={{
              title: c.thankYou.contactTitle,
              text: c.thankYou.contactText,
              nextTitle: c.thankYou.nextTitle,
              next: c.thankYou.next,
              links: [
                { label: c.thankYou.caseStudiesLink, href: localizeHref(lang, "/case-studies") },
                { label: c.thankYou.templatesLink, href: localizeHref(lang, "/free-templates") },
              ],
            }}
          />
        </div>
      </section>
    </>
  );
}
