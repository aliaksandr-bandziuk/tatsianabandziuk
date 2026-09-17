import Link from "next/link";
import { ConsultationButton } from "@/app/components/site/ConsultationModal";
import type { ReactNode } from "react";
import type {
  AccentHeading,
  CareerStep,
  CaseStudy,
  ConsultingFormat,
  Fact,
  FaqItem,
  Metric,
  Post,
  Recommendation,
  Service,
  TitledText,
  Tool,
} from "@/content/types";
import { caseHref, dateLabel, getContent, localizeHref, postHref, serviceHref } from "@/content";
import { CaseDashboard, Cover, MiniChart } from "./Charts";
import CountUp from "./CountUp";
import FaqAccordion from "./FaqAccordion";
import JsonLd from "./JsonLd";
import { SITE_URL } from "@/lib/site";
import { CellFrame, cellAddr } from "./CellFrameClient";
import s from "./blocks.module.scss";

export { CellFrame, cellAddr };

export function Accent({ h }: { h: AccentHeading }) {
  return (
    <>
      {h.before}
      {h.accent && (
        <>
          {" "}
          <span className="accent">{h.accent}</span>
        </>
      )}
      {h.after && <> {h.after}</>}
    </>
  );
}

export const accentText = (h: AccentHeading) => [h.before, h.accent, h.after].filter(Boolean).join(" ");

export function SectionHead({ title, aside, as: Tag = "h2", className = "h2" }: { title: ReactNode; aside?: ReactNode; as?: "h2" | "h1"; className?: string }) {
  return (
    <div className="section-head" data-reveal>
      <Tag className={className}>{title}</Tag>
      {aside}
    </div>
  );
}

export function Photo({ label, height, className = "" }: { label: string; height?: number | string; className?: string }) {
  return (
    <div className={`photo ${className}`} style={height !== undefined && height !== "auto" ? { height } : undefined} role="img" aria-label={label}>
      <span>{label}</span>
    </div>
  );
}

export function ServiceCard({ lang, service, index = 0 }: { lang: string; service: Service; index?: number }) {
  return (
    <Link href={serviceHref(lang, service.slug)} className={`card lift xcell ${s.serviceCard}`} data-reveal data-reveal-delay={index * 60}>
      <CellFrame addr={cellAddr(index)} />
      <span className="label">{service.number}</span>
      <h3 className="h3">{service.cardTitle}</h3>
      <p>{service.cardText}</p>
      <div className={s.cardChart}>
        <MiniChart kind={service.chart} />
        <span className={s.caption}>{service.chartCaption}</span>
      </div>
    </Link>
  );
}

export function ServicesGrid({ lang, services }: { lang: string; services: Service[] }) {
  return (
    <div className="grid-3">
      {services.map((sv, i) => (
        <ServiceCard key={sv.slug} lang={lang} service={sv} index={i} />
      ))}
    </div>
  );
}

export function FormatCards({ lang, formats, clientTypesLabel, clientTypes }: { lang: string; formats: ConsultingFormat[]; clientTypesLabel?: string; clientTypes?: string[] }) {
  const contact = `${localizeHref(lang, "/contact")}#enquiry`;
  return (
    <>
      <div className="grid-3">
        {formats.map((f, i) => (
          <article key={f.title} className={`card ${s.formatCard}`} data-reveal data-reveal-delay={i * 60}>
            <span className="label">{f.label}</span>
            <h3 className="h3">{f.title}</h3>
            <p>
              <strong>{getSuitsLabel(lang)}</strong> {f.suits}
            </p>
            <p>
              <strong>{getYouGetLabel(lang)}</strong> {f.youGet}
            </p>
            <div className={s.formatFoot}>
              <span>{f.duration}</span>
              <ConsultationButton className="link" href={contact}>
                {f.cta}
              </ConsultationButton>
            </div>
          </article>
        ))}
      </div>
      {clientTypes && (
        <div className={s.clientTypes} data-reveal>
          <span className="eyebrow">{clientTypesLabel}</span>
          {clientTypes.map((t, i) => (
            <span key={t}>
              {i > 0 && <i aria-hidden="true">· </i>}
              {t}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

function getSuitsLabel(lang: string) {
  return { en: "Suits:", pl: "Dla kogo:", ru: "Кому подходит:" }[lang] ?? "Suits:";
}
function getYouGetLabel(lang: string) {
  return { en: "You get:", pl: "Otrzymujesz:", ru: "Результат:" }[lang] ?? "You get:";
}

export function Steps({ steps, columns = 2 }: { steps: TitledText[]; columns?: 2 | 3 }) {
  return (
    <div className={columns === 3 ? "grid-3" : "grid-2"}>
      {steps.map((st, i) => (
        <article key={st.title} className={s.step} data-reveal data-reveal-delay={i * 60}>
          <span className="label" style={{ fontSize: 11 }}>
            {st.label}
          </span>
          <h3>{st.title}</h3>
          {st.text && <p>{st.text}</p>}
        </article>
      ))}
    </div>
  );
}

export function ToolCards({ tools }: { tools: Tool[] }) {
  return (
    <div className="grid-3">
      {tools.map((t, i) => (
        <article key={t.id} className={s.toolCard} data-reveal data-reveal-delay={i * 60}>
          <span className={s.mono} aria-hidden="true">
            {t.monogram}
          </span>
          <h3 className="h3">{t.title}</h3>
          <p>{t.text}</p>
          <div className="chips">
            {t.skills.map((k) => (
              <span key={k} className="chip">
                {k}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export function ToolRows({ tools }: { tools: TitledText[] }) {
  return (
    <div className="stack">
      {tools.map((t) => (
        <div key={t.title} className={s.toolRow} data-reveal>
          <span className={`${s.mono} ${s.monoSm}`} aria-hidden="true">
            {t.label}
          </span>
          <div>
            <h3>{t.title}</h3>
            {t.text && <p>{t.text}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

export async function CaseCard({ lang, item, index = 0, addr }: { lang: string; item: CaseStudy; index?: number; addr?: string }) {
  const ui = (await getContent(lang)).ui;
  return (
    <Link href={caseHref(lang, item.slug)} className={`lift xcell ${s.caseCard}`} data-reveal data-reveal-delay={(index % 3) * 60}>
      <CellFrame addr={addr ?? cellAddr(index)} />
      <div className={s.caseMedia}>
        <CaseDashboard variant={item.dashboard} />
        <span className={s.caption}>{ui.schematicCaption}</span>
      </div>
      <div className={s.caseBody}>
        <span className="chip">{item.tag}</span>
        <h3 className="h3">{item.title}</h3>
        <p>{item.summary}</p>
        <div className={s.caseMetrics}>
          <span>{item.cardMetrics[0]}</span>
          <span>{item.cardMetrics[1]}</span>
        </div>
      </div>
    </Link>
  );
}

export async function PostCard({ lang, post, withCover = true, index = 0 }: { lang: string; post: Post; withCover?: boolean; index?: number }) {
  const c = await getContent(lang);
  const cat = c.categories.find((x) => x.key === post.category);
  return (
    <Link href={postHref(lang, post.slug)} className={`lift ${s.postCard}`} data-reveal data-reveal-delay={index * 60}>
      {withCover && <Cover variant={post.cover} />}
      <div className={s.postBody}>
        <div className={s.postMeta}>
          {cat && <span className="chip">{cat.label}</span>}
          <span className="chip chip-muted">
            <time dateTime={post.date}>{dateLabel(lang, post.date)}</time>
          </span>
        </div>
        <h3 className="h3">{post.title}</h3>
        <p>{post.excerpt}</p>
      </div>
    </Link>
  );
}

export function RecommendationCards({ items }: { items: Recommendation[] }) {
  return (
    <div className="grid-3">
      {items.map((r, i) => (
        <figure key={i} className={`card ${s.recCard}`} data-reveal data-reveal-delay={i * 60} style={{ margin: 0 }}>
          <blockquote>{r.quote}</blockquote>
          <figcaption className={s.person}>
            <span className={s.avatar} aria-hidden="true" />
            <span>
              <cite className={s.personName}>{r.name}</cite>
              <div className={s.personRole}>{r.role}</div>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function RecommendationWide({ title, note, item }: { title: string; note: string; item: Recommendation }) {
  return (
    <section className="container section">
      <div className={`panel ${s.recWide}`} data-reveal>
        <div>
          <h2 className="h2-sm">{title}</h2>
          <span className="eyebrow">{note}</span>
        </div>
        <figure style={{ margin: 0 }}>
          <blockquote>{item.quote}</blockquote>
          <figcaption className={s.person}>
            <span className={s.avatar} aria-hidden="true" />
            <span>
              <cite className={s.personName}>{item.name}</cite>
              <div className={s.personRole}>{item.role}</div>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/** Width (0–100) of the KPI bar: percentages as they are, other units relative to the largest figure. */
function metricBars(items: Metric[]) {
  const nums = items.map((m) => Math.abs(parseFloat(m.value.replace("−", "-").replace(",", "."))) || 0);
  const max = Math.max(...nums, 1);
  return items.map((m, i) => {
    const pct = /%|pp/.test(m.unit ?? "") ? nums[i] : (nums[i] / max) * 100;
    return Math.max(6, Math.min(100, Math.round(pct)));
  });
}

export function MetricsBand({ title, note, items }: { title: string; note: string; items: Metric[] }) {
  const bars = metricBars(items);
  return (
    <section className={s.band}>
      <div className="container">
        <div className="section-head" style={{ marginBottom: 46 }} data-reveal>
          <h2 className="h2">{title}</h2>
          <span className="eyebrow">{note}</span>
        </div>
        <div className={s.bandGrid} style={{ ["--cols" as string]: Math.min(items.length, 4) }}>
          {items.map((m, i) => (
            <div key={i} data-reveal data-reveal-delay={i * 80}>
              <div className={s.bandValue}>
                <CountUp value={m.value} />
                {m.unit && <small>{m.unit}</small>}
              </div>
              {/* KPI bar, fills when the figure scrolls into view (like a Power BI card). */}
              <span className={s.bandTrack} aria-hidden="true">
                <i style={{ ["--w" as string]: `${bars[i]}%`, transitionDelay: `${200 + i * 150}ms` }} />
              </span>
              <p className={s.bandLabel}>{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq({ items, openFirst = true }: { items: FaqItem[]; openFirst?: boolean }) {
  return <FaqAccordion items={items} openFirst={openFirst} />;
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function FaqSection({ title, lead, items }: { title: string; lead?: string; items: FaqItem[] }) {
  return (
    <section className={`container section ${s.split}`}>
      <div data-reveal>
        <h2 className="h2">{title}</h2>
        {lead && (
          <p className="body" style={{ marginTop: 16, maxWidth: 320 }}>
            {lead}
          </p>
        )}
      </div>
      <Faq items={items} />
      <JsonLd data={faqSchema(items)} />
    </section>
  );
}

export async function CtaPanel({ lang, title, text, note, signature, dark = false }: { lang: string; title: string; text: string; note?: string; signature?: string; dark?: boolean }) {
  const c = await getContent(lang);
  return (
    <section className="container section">
      <div className={`panel ${s.cta} ${dark ? s.ctaDark : ""}`} data-reveal>
        <div>
          <h2 className="h2-sm" style={{ marginBottom: 14 }}>
            {title}
          </h2>
          <p>{text}</p>
          {signature && (
            <p className="signature" style={{ fontSize: 28, marginTop: 12 }}>
              {signature}
            </p>
          )}
        </div>
        <div className={s.ctaSide}>
          <ConsultationButton href={`${localizeHref(lang, "/contact")}#enquiry`} className={`btn btn-block ${dark ? "btn-light" : ""}`}>
            {c.ui.bookConsultation}
          </ConsultationButton>
          <span className={s.ctaNote}>{note ?? c.ui.replyNote}</span>
        </div>
      </div>
    </section>
  );
}

export type Crumb = { label: string; href?: string };

export async function Breadcrumbs({ lang, items }: { lang: string; items: Crumb[] }) {
  const c = await getContent(lang);
  const all: Crumb[] = [{ label: c.ui.breadcrumbHome, href: localizeHref(lang, "/") }, ...items];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      ...(it.href ? { item: `${SITE_URL}${it.href === "/" ? "" : it.href}` || SITE_URL } : {}),
    })),
  };
  return (
    <nav className={`eyebrow ${s.crumbs}`} aria-label="Breadcrumb">
      <ol>
        {all.map((it, i) => (
          <li key={i}>{it.href && i < all.length - 1 ? <Link href={it.href}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}</li>
        ))}
      </ol>
      <JsonLd data={schema} />
    </nav>
  );
}

export function FactPanel({ title, facts, note, noteHand = true }: { title: string; facts: Fact[]; note?: string; noteHand?: boolean }) {
  return (
    <aside className={s.facts} data-reveal>
      <div className="eyebrow" style={{ color: "var(--text-secondary)" }}>
        {title}
      </div>
      <dl>
        {facts.map((f) => (
          <div key={f.label}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
      {note &&
        (noteHand ? (
          <p className="hand" style={{ fontSize: 16, marginTop: 20 }}>
            {note}
          </p>
        ) : (
          <p className="caption" style={{ marginTop: 18, fontSize: 11 }}>
            {note}
          </p>
        ))}
    </aside>
  );
}

export function NumberedList({ items }: { items: TitledText[] }) {
  return (
    <div className="stack">
      {items.map((it, i) => (
        <div key={it.title} className={s.numbered} data-reveal>
          <span>{it.label ?? String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3>{it.title}</h3>
            {it.text && <p>{it.text}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Problems({ items }: { items: TitledText[] }) {
  return (
    <div className="grid-2">
      {items.map((it, i) => (
        <div key={it.title} className={s.problem} data-reveal data-reveal-delay={i * 60}>
          <h3>{it.title}</h3>
          {it.text && <p>{it.text}</p>}
        </div>
      ))}
    </div>
  );
}

export function Timeline({ items }: { items: CareerStep[] }) {
  return (
    <ol className={s.timeline} style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((t) => (
        <li key={t.period} className={`${s.timelineItem} ${t.current ? s.timelineCurrent : ""}`}>
          <span>{t.period}</span>
          <strong>{t.company}</strong>
          <em>{t.role}</em>
        </li>
      ))}
    </ol>
  );
}
