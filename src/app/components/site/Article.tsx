import Link from "next/link";
import DataSheet from "./DataSheet";
import { ConsultationButton } from "@/app/components/site/ConsultationModal";
import type { ReactNode } from "react";
import type { ArticleBlock, Post } from "@/content/types";
import { getContent, localizeHref, serviceHref } from "@/content";
import { ArticleCurve } from "./Charts";
import s from "./article.module.scss";

const DAX_FUNCTIONS = /\b(SUMX?|CALCULATE|REMOVEFILTERS|DIVIDE|FILTER|ALL|VALUES|AVERAGEX?|COUNTROWS|SELECTEDVALUE|DATESYTD|TOTALYTD|SAMEPERIODLASTYEAR|VAR|RETURN)\b/g;

function highlight(code: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  const re = new RegExp(DAX_FUNCTIONS.source, "g");
  let m: RegExpExecArray | null;
  while ((m = re.exec(code)) !== null) {
    const i = m.index;
    out.push(code.slice(last, i), <b key={i}>{m[0]}</b>);
    last = i + m[0].length;
  }
  out.push(code.slice(last));
  return out;
}

export function ArticleBody({ blocks, lang = "en" }: { blocks: ArticleBlock[]; lang?: string }) {
  return (
    <div className={s.body}>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return <p key={i}>{b.text}</p>;
          case "h2":
            return (
              <h2 key={i} id={b.id}>
                {b.text}
              </h2>
            );
          case "formula":
            return (
              <div key={i} className={s.formula}>
                {b.text}
              </div>
            );
          case "code":
            return (
              <figure key={i} style={{ margin: 0 }}>
                <pre className={s.code}>
                  <code>{highlight(b.code)}</code>
                </pre>
                {b.caption && <figcaption className={s.codeCaption}>{b.caption}</figcaption>}
              </figure>
            );
          case "chart":
            return (
              <figure key={i} className={s.chart} data-reveal>
                <div className={s.chartHead}>
                  <span>{b.title}</span>
                  <b>{b.legend}</b>
                </div>
                <ArticleCurve />
                <figcaption className="caption" style={{ marginTop: 10, fontSize: 10 }}>
                  {b.caption}
                </figcaption>
              </figure>
            );
          case "table":
            return (
              <div key={i} className={s.table}>
                <DataSheet columns={b.columns} rows={b.rows} caption={b.caption} trendColumn={b.trendColumn} lang={lang} />
              </div>
            );
          case "list":
            return (
              <ul key={i} className={s.list}>
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
        }
      })}
    </div>
  );
}

export function ArticleAside({ lang, post }: { lang: string; post: Post }) {
  const c = getContent(lang);
  const headings = post.body.filter((b): b is Extract<ArticleBlock, { type: "h2" }> => b.type === "h2");
  const service = c.services.find((sv) => sv.slug === post.serviceSlug);
  return (
    <aside className={s.aside}>
      {headings.length > 1 && (
        <nav className={s.toc} aria-label={c.ui.toc}>
          <p className="eyebrow" style={{ color: "var(--text-secondary)" }}>
            {c.ui.toc}
          </p>
          <ol>
            {headings.map((h) => (
              <li key={h.id}>
                <a href={`#${h.id}`}>{h.text}</a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className={s.author}>
        <div className={s.authorHead}>
          <span aria-hidden="true" />
          <div>
            <strong>{c.person.name}</strong>
            <em>{c.person.jobTitle}</em>
          </div>
        </div>
        <p>{c.person.shortBio}</p>
        <Link className="link" style={{ fontSize: 13 }} href={localizeHref(lang, "/about")} rel="author">
          {c.ui.aboutLink}
        </Link>
      </div>
      {service && (
        <div className={s.service}>
          <p className="eyebrow" style={{ margin: 0 }}>
            {c.ui.relatedService}
          </p>
          <h3>
            <Link href={serviceHref(lang, service.slug)}>{service.cardTitle}</Link>
          </h3>
          <p>{service.cardText}</p>
          <ConsultationButton href={`${localizeHref(lang, "/contact")}#enquiry`} className="btn btn-sm btn-light btn-inline">
            {c.ui.bookConsultation}
          </ConsultationButton>
        </div>
      )}
    </aside>
  );
}

export { s as articleStyles };
