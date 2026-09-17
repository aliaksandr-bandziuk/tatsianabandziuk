import Link from "next/link";
import { calculatorHref, getContent, localizeHref, privacyHref, serviceHref } from "@/content";
import s from "./footer.module.scss";

/** Site credit: a followed link to the developer's site (no rel="nofollow" on purpose). */
const CREDITS: Record<string, { label: string; name: string; href: string }> = {
  en: { label: "Design and development:", name: "bandziuk", href: "https://www.bandziuk.com" },
  pl: { label: "Projekt i wykonanie strony:", name: "bandziuk", href: "https://www.bandziuk.com/pl" },
  ru: { label: "Дизайн и разработка сайта:", name: "bandziuk", href: "https://www.bandziuk.com/ru" },
};

export default async function Footer({ lang }: { lang: string }) {
  const c = await getContent(lang);
  const year = new Date().getFullYear();
  const credit = CREDITS[lang] ?? CREDITS.en;
  return (
    <footer className={s.footer}>
      <div className="container">
        <div className={s.grid}>
          <div>
            <div className={s.name}>{c.person.name}</div>
            <p className={s.text}>{c.ui.footerText}</p>
          </div>
          <nav className={s.col} aria-label={c.ui.footerServices}>
            <span className={s.colTitle}>{c.ui.footerServices}</span>
            {c.services.map((sv) => (
              <Link key={sv.slug} href={serviceHref(lang, sv.slug)}>
                {sv.breadcrumb}
              </Link>
            ))}
          </nav>
          <nav className={s.col} aria-label={c.calculatorsPage.eyebrow}>
            <Link className={s.colTitle} href={localizeHref(lang, "/tools")}>
              {c.calculatorsPage.eyebrow}
            </Link>
            {c.calculators.map((calc) => (
              <Link key={calc.slug} href={calculatorHref(lang, calc.slug)}>
                {calc.breadcrumb}
              </Link>
            ))}
          </nav>
          <nav className={s.col} aria-label={c.ui.footerSite}>
            <span className={s.colTitle}>{c.ui.footerSite}</span>
            {c.ui.footerSiteLinks.map((l) => (
              <Link key={l.href} href={localizeHref(lang, l.href)}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className={s.col}>
            <span className={s.colTitle}>{c.ui.footerContact}</span>
            <a className={s.mono} href={`mailto:${c.person.email}`}>
              {c.person.email}
            </a>
            <a href={c.person.linkedin} rel="me noopener" target="_blank">
              LinkedIn
            </a>
            <span>
              {c.person.location} · {c.person.timezone}
            </span>
          </div>
        </div>
        <div className={s.bottom}>
          <span>
            © {year} {c.person.name}
          </span>
          <span className={s.bottomLinks}>
            <Link href={privacyHref(c)}>{c.ui.privacy}</Link>
            <span>
              {credit.label}{" "}
              <a href={credit.href} target="_blank">
                {credit.name}
              </a>
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
