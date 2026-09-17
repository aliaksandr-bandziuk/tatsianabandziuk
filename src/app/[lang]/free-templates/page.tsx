import type { Metadata } from "next";
import { getContent, latestPosts, localeParams, pageMetadata } from "@/content";
import { FaqSection, PostCard, SectionHead } from "@/app/components/site/Blocks";
import DataSheet, { type SheetColumn, type SheetRow } from "@/app/components/site/DataSheet";
import { EmailSignup } from "@/app/components/site/Forms";
import s from "../pages.module.scss";

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return pageMetadata(params.lang, (await getContent(params.lang)).templates.seo, () => "/free-templates");
}

/** Preview of the open-to-buy sheet (placeholder figures). */
const OTB_COLUMNS: Record<string, SheetColumn[]> = {
  en: [
    { label: "Month", kind: "text" },
    { label: "Buy plan", kind: "number" },
    { label: "Sold", kind: "number" },
    { label: "Sell-through", kind: "number", format: "scale", suffix: "%" },
    { label: "OTB left", kind: "number", format: "bars" },
  ],
  pl: [
    { label: "Miesiąc", kind: "text" },
    { label: "Plan zakupu", kind: "number" },
    { label: "Sprzedaż", kind: "number" },
    { label: "Sell-through", kind: "number", format: "scale", suffix: "%" },
    { label: "Pozostały OTB", kind: "number", format: "bars" },
  ],
  ru: [
    { label: "Месяц", kind: "text" },
    { label: "План закупки", kind: "number" },
    { label: "Продано", kind: "number" },
    { label: "Sell-through", kind: "number", format: "scale", suffix: "%" },
    { label: "Остаток OTB", kind: "number", format: "bars" },
  ],
};

const OTB_ROWS: SheetRow[] = [
  { cells: ["M1", 420, 311, 74, 109], trend: "up" },
  { cells: ["M2", 380, 358, 94, 22], trend: "up" },
  { cells: ["M3", 455, 402, 88, 53], trend: "down" },
];

export default async function FreeTemplatesPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const c = await getContent(lang);
  const p = c.templates;

  return (
    <>
      <section className={`container ${s.pageHead}`} data-reveal>
        <p className="eyebrow">{p.eyebrow}</p>
        <h1 className="h1-inner" style={{ marginTop: 20 }}>
          {p.h1}
        </h1>
        <p className="lead">{p.intro}</p>
      </section>

      <section className="container section">
        <div className="grid-2">
          {p.items.map((it, i) => (
            <article key={it.title} className={s.previewCard} data-reveal data-reveal-delay={String(i * 100)}>
              <div className={s.previewMedia}>
                <div>
                  {it.preview === "otb" ? (
                    <DataSheet lang={lang} columns={OTB_COLUMNS[lang] ?? OTB_COLUMNS.en} rows={OTB_ROWS} trendColumn={3} />
                  ) : (
                    <ul className={s.ticks}>
                      {p.checklist.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <p className="caption" style={{ marginTop: 10 }}>
                  {it.previewCaption}
                </p>
              </div>
              <div style={{ padding: "22px 24px 26px" }}>
                <h2 className="h3">{it.title}</h2>
                <p className="body">{it.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container section" id="get-templates">
        <div className={`panel ${s.templates}`} data-reveal>
          <div>
            <h2 className="h2-sm">{p.insideTitle}</h2>
            <ul className={s.checklist}>
              {p.inside.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h2-sm">{p.formTitle}</h2>
            <p className="body-lg" style={{ marginBottom: 22 }}>
              {p.formText}
            </p>
            <EmailSignup
              kind="templates"
              form={c.ui.form}
              button={p.button}
              note={p.courseNote}
              thanks={{ title: c.thankYou.templatesTitle, text: c.thankYou.templatesText, sent: c.thankYou.sent, items: p.items.map((i) => i.title) }}
            />
          </div>
        </div>
      </section>

      <section className="container section">
        <SectionHead title={p.relatedTitle} />
        <div className="grid-3">
          {latestPosts(c, 3).map((post, i) => (
            <PostCard key={post.key} lang={lang} post={post} index={i} />
          ))}
        </div>
      </section>
      {p.faq && p.faq.length > 0 && <FaqSection title={p.faqTitle ?? p.h1} items={p.faq} />}
    </>
  );
}
