import type { Metadata } from "next";
import { getContent, localeParams, localizeHref, pageMetadata } from "@/content";
import { FactPanel, FaqSection, NumberedList } from "@/app/components/site/Blocks";
import { ContactForm } from "@/app/components/site/Forms";
import JsonLd from "@/app/components/site/JsonLd";
import { PERSON_ID } from "@/lib/schema/identity";
import { SITE_URL } from "@/lib/site";
import s from "../pages.module.scss";

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return pageMetadata(params.lang, getContent(params.lang).contact.seo, () => "/contact");
}

export default function ContactPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const c = getContent(lang);
  const p = c.contact;
  const url = `${SITE_URL}${localizeHref(lang, "/contact")}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${url}#webpage`,
    url,
    name: p.seo.title,
    description: p.seo.description,
    inLanguage: lang,
    about: { "@id": PERSON_ID },
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

      <section className="container section" id="enquiry">
        <div className={`panel ${s.contact}`} data-reveal>
          <div>
            <p className="body-lg">{p.note}</p>
            <p className="signature" style={{ fontSize: 30, marginTop: 18 }}>
              {c.person.signature}
            </p>
            <div className={s.contactMeta}>
              <a href={`mailto:${c.person.email}`}>{c.person.email}</a>
              <a href={c.person.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
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

      <section className={`container section ${s.leadCol}`}>
        <div data-reveal>
          <h2 className="h2" style={{ marginBottom: 30 }}>
            {p.stepsTitle}
          </h2>
          <FactPanel title={p.languagesTitle} facts={p.details} />
        </div>
        <NumberedList items={p.steps} />
      </section>

      <FaqSection title={p.faqTitle} items={p.faq} />
    </>
  );
}
