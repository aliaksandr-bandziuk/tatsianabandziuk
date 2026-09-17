"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { LinkItem } from "@/content/types";
import { ConsultationButton } from "./ConsultationModal";
import s from "./header.module.scss";

type Props = {
  lang: string;
  nav: LinkItem[];
  cta: { label: string; href: string };
  labels: { menu: string; close: string; language: string };
  privacySlugs: Record<string, string>;
};

const LANGS = ["en", "pl", "ru"] as const;

/** Path without the locale prefix: "/pl/services" → "/services". */
function stripLocale(pathname: string): string {
  const m = pathname.match(/^\/(pl|ru)(?=\/|$)/);
  const rest = m ? pathname.slice(m[0].length) : pathname;
  return rest || "/";
}

function withLocale(lang: string, path: string): string {
  if (lang === "en") return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

export function LangSwitch({ lang, privacySlugs, label }: { lang: string; privacySlugs: Record<string, string>; label: string }) {
  const pathname = usePathname() ?? "/";
  const rest = stripLocale(pathname);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className={s.langs} ref={ref}>
      <button type="button" className={s.langButton} aria-label={label} aria-haspopup="true" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {lang}
        <svg className={s.langArrow} width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
          <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>
      {/* The list stays in the server HTML (hidden with CSS) so crawlers see links to the other languages. */}
      <ul className={s.langList} data-open={open}>
        {LANGS.filter((l) => l !== lang).map((l) => {
          // Legal pages have a translated slug; everything else keeps its path.
          const target = rest === `/${privacySlugs[lang]}` ? `/${privacySlugs[l]}` : rest;
          return (
            <li key={l}>
              <Link href={withLocale(l, target)} hrefLang={l} lang={l} prefetch={false} onClick={() => setOpen(false)}>
                {l}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function isActive(pathname: string, lang: string, href: string) {
  const full = withLocale(lang, href);
  return pathname === full || pathname.startsWith(`${full}/`);
}

export function DesktopNav({ lang, nav }: { lang: string; nav: LinkItem[] }) {
  const pathname = usePathname() ?? "/";
  return (
    <nav className={s.nav} aria-label="Main">
      {nav.map((item) => (
        <Link key={item.href} href={withLocale(lang, item.href)} aria-current={isActive(pathname, lang, item.href) ? "page" : undefined}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function MobileMenu({ lang, nav, cta, labels, privacySlugs }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={s.burger}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? labels.close : labels.menu}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>
      <div id="mobile-menu" className={s.mobile} data-lenis-prevent data-open={open} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {nav.map((item) => (
            <Link key={item.href} href={withLocale(lang, item.href)} aria-current={isActive(pathname, lang, item.href) ? "page" : undefined} tabIndex={open ? 0 : -1}>
              {item.label}
            </Link>
          ))}
        </nav>
        <ConsultationButton href={cta.href} className={`btn btn-block ${s.btn}`} tabIndex={open ? 0 : -1} onOpen={() => setOpen(false)}>
          {cta.label}
        </ConsultationButton>
      </div>
    </>
  );
}
