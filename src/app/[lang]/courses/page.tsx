import type { Metadata } from "next";
import Link from "next/link";
import { getContent, localeParams, localizeHref, pageMetadata } from "@/content";
import { FaqSection, NumberedList } from "@/app/components/site/Blocks";
import { EmailSignup } from "@/app/components/site/Forms";
import s from "../pages.module.scss";

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return pageMetadata(params.lang, (await getContent(params.lang)).courses.seo, () => "/courses");
}

export default async function CoursesPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const c = await getContent(lang);
  const p = c.courses;

  return (
    <>
      <section className={`container ${s.pageHead}`} data-reveal>
        <p className="eyebrow">{p.eyebrow}</p>
        <h1 className="h1-inner" style={{ marginTop: 20 }}>
          {p.h1}
        </h1>
        <p className="lead">{p.intro}</p>
      </section>

      <section className={`container section ${s.leadCol}`}>
        <h2 className="h2" data-reveal>
          {p.modulesTitle}
        </h2>
        <NumberedList items={p.modules} />
      </section>

      <section className={`container section ${s.twoCol}`}>
        <div className="panel" data-reveal>
          <h2 className="h2-sm">{p.audienceTitle}</h2>
          <ul className={s.checklist}>
            {p.audience.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
        <div className="panel" data-reveal data-reveal-delay="100">
          <h2 className="h2-sm">{p.waitlistTitle}</h2>
          <p className="body-lg">{p.waitlistText}</p>
          <div style={{ marginTop: 22 }} />
          <EmailSignup
            kind="waitlist"
            form={c.ui.form}
            button={p.waitlistButton}
            thanks={{ title: p.waitlistTitle, text: p.waitlistText, sent: c.thankYou.sent }}
          />
          <p className="body" style={{ marginTop: 20 }}>
            {p.meanwhile}{" "}
            <Link className="link" href={localizeHref(lang, "/free-templates")}>
              {p.meanwhileLink}
            </Link>
          </p>
        </div>
      </section>
      {p.faq && p.faq.length > 0 && <FaqSection title={p.faqTitle ?? p.h1} items={p.faq} />}
    </>
  );
}
