import type { Metadata } from "next";
import { getContent, localeParams, pageMetadata } from "@/content";
import { Accent, CtaPanel, FactPanel, NumberedList, Photo, RecommendationWide, Timeline } from "@/app/components/site/Blocks";
import JsonLd from "@/app/components/site/JsonLd";
import { PERSON_ID } from "@/lib/schema/identity";
import { SITE_URL } from "@/lib/site";
import { localizeHref } from "@/content";
import s from "../pages.module.scss";

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return pageMetadata(params.lang, getContent(params.lang).about.seo, () => "/about");
}

export default function AboutPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const c = getContent(lang);
  const a = c.about;
  const url = `${SITE_URL}${localizeHref(lang, "/about")}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${url}#webpage`,
    url,
    name: a.seo.title,
    description: a.seo.description,
    inLanguage: lang,
    mainEntity: { "@id": PERSON_ID },
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className={`container ${s.innerHero}`}>
        <div data-reveal>
          <h1 className="h1-inner">
            <Accent h={a.h1} />
          </h1>
          <p className="lead">{a.intro}</p>
          <div className="chips" style={{ marginTop: 28 }}>
            {a.chips.map((ch) => (
              <span key={ch} className="chip">
                {ch}
              </span>
            ))}
          </div>
        </div>
        <div data-reveal data-reveal-delay="120">
          <Photo label={c.ui.portraitPlaceholder} height={460} />
          <p className="signature" style={{ fontSize: 28, margin: "14px 4px 0" }}>
            {c.person.signature}
          </p>
        </div>
      </section>

      <section className={`container section ${s.leadCol}`}>
        <h2 className="h2" data-reveal>
          {a.experienceTitle}
        </h2>
        <div className="stack" data-reveal data-reveal-delay="100">
          {a.experienceText.map((p) => (
            <p key={p} className="body-lg">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="panel">
          <h2 className="h2" style={{ marginBottom: 30 }} data-reveal>
            {a.projectsTitle}
          </h2>
          <NumberedList items={a.projects} />
        </div>
      </section>

      <section className={`container section ${s.twoCol}`}>
        <div data-reveal>
          <h2 className="h2-sm">{a.leadershipTitle}</h2>
          {a.leadershipText.map((p) => (
            <p key={p} className="body-lg">
              {p}
            </p>
          ))}
          <p className="hand" style={{ fontSize: 20, marginTop: 18 }}>
            {a.leadershipNote}
          </p>
        </div>
        <div data-reveal data-reveal-delay="100">
          <h2 className="h2-sm">{a.timelineTitle}</h2>
          <p className="caption" style={{ marginBottom: 18 }}>
            {a.timelineNote}
          </p>
          <Timeline items={a.timeline} />
        </div>
      </section>

      <section className={`container section ${s.twoCol}`}>
        <div className="panel" data-reveal>
          <h2 className="h2-sm">{a.educationTitle}</h2>
          <p className="body-lg">{a.educationText}</p>
          <div className="chips" style={{ marginTop: 18 }}>
            {a.educationChips.map((ch) => (
              <span key={ch} className="chip">
                {ch}
              </span>
            ))}
          </div>
        </div>
        <div data-reveal data-reveal-delay="100">
          <FactPanel title={a.languagesTitle} facts={c.person.languages} note={a.languagesText} noteHand={false} />
        </div>
      </section>

      <RecommendationWide title={a.recommendationTitle} note={c.ui.recommendationPlaceholder} item={a.recommendation} />
      <CtaPanel lang={lang} title={a.ctaTitle} text={a.ctaText} note={a.ctaNote} signature={c.person.signature} />
    </>
  );
}
