"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { LinkItem } from "@/content/types";
import type { LanguageAlias } from "@/content";
import { localizePath } from "@/lib/routing";
import { ConsultationButton } from "./ConsultationModal";
import { useNavDropdown } from "./useNavDropdown";
import s from "./header.module.scss";

/** Main navigation item: `href` is an internal path, `children[].href` a ready public URL. */
export type NavEntry = LinkItem & { children?: LinkItem[] };

type Props = {
  lang: string;
  nav: NavEntry[];
  cta: { label: string; href: string };
  labels: { menu: string; close: string; language: string };
};

const LANGS = ["en", "pl", "ru"] as const;

const SUBMENU_LABEL: Record<string, (label: string) => string> = {
  en: (l) => `Open the ${l} submenu`,
  pl: (l) => `Otwórz podmenu: ${l}`,
  ru: (l) => `Открыть подменю «${l}»`,
};
const submenuLabel = (lang: string, label: string) => (SUBMENU_LABEL[lang] ?? SUBMENU_LABEL.en)(label);

// React 19: `inert` is a boolean prop (React 18 needed the "" string form).
const INERT = { inert: true };

/** Path without the locale prefix: "/pl/services" → "/services". */
function stripLocale(pathname: string): string {
  const m = pathname.match(/^\/(pl|ru)(?=\/|$)/);
  const rest = m ? pathname.slice(m[0].length) : pathname;
  return rest || "/";
}

/** Public path (no prefix) → URL with prefix. */
function withPrefix(lang: string, path: string): string {
  if (lang === "en") return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

/** Internal path → public URL with localised segments. */
function withLocale(lang: string, path: string): string {
  return withPrefix(lang, path === "/" ? path : localizePath(lang, path));
}

/** Links to the same page in the other languages (translated slugs through the aliases). */
function useLanguageLinks(lang: string, aliases: LanguageAlias[]) {
  const rest = stripLocale(usePathname() ?? "/");
  return LANGS.filter((l) => l !== lang).map((l) => {
    const alias = aliases.find((a) => a.paths[lang as keyof LanguageAlias["paths"]] === rest);
    const target = alias ? alias.paths[l] ?? alias.fallback[l] : rest;
    return { lang: l, href: withPrefix(l, target) };
  });
}

/** The logo mark from the favicon (src/app/icon.svg), used as the logo on phones. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="12" fill="#faf8f4" />
      <rect x="7" y="7" width="47" height="47" rx="3" fill="#fff" stroke="#0f5943" strokeWidth="5" />
      <rect x="47" y="47" width="13" height="13" rx="2" fill="#0f5943" stroke="#faf8f4" strokeWidth="3" />
      <path
        fill="#0f5943"
        transform="translate(17.782 44) scale(0.03814 -0.03814)"
        d="M642 708Q638 657 636.5 610.0Q635 563 635 538Q635 516 636.0 496.0Q637 476 638 462H615Q599 546 574.5 595.0Q550 644 516.0 664.5Q482 685 436 685H413V114Q413 74 421.5 54.0Q430 34 453.0 27.5Q476 21 520 20V0Q489 1 437.5 2.0Q386 3 330 3Q275 3 226.0 2.0Q177 1 147 0V20Q192 21 215.0 27.5Q238 34 246.0 54.0Q254 74 254 114V685H232Q186 685 152.0 664.5Q118 644 94.0 595.5Q70 547 52 462H29Q31 476 31.5 496.0Q32 516 32 538Q32 563 30.5 610.0Q29 657 25 708Q71 707 125.5 706.0Q180 705 235 705H434Q488 705 543.0 706.0Q598 707 642 708Z"
      />
    </svg>
  );
}

export function LangSwitch({ lang, aliases, label }: { lang: string; aliases: LanguageAlias[]; label: string }) {
  const pathname = usePathname() ?? "/";
  const links = useLanguageLinks(lang, aliases);
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
        {links.map((l) => (
          <li key={l.lang}>
            <Link href={l.href} hrefLang={l.lang} lang={l.lang} prefetch={false} onClick={() => setOpen(false)}>
              {l.lang}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function isActive(pathname: string, lang: string, href: string) {
  const full = withLocale(lang, href);
  return pathname === full || pathname.startsWith(`${full}/`);
}

/**
 * A top-level item with a submenu: the label stays a real link to the section,
 * the chevron is a separate button that opens the panel (hover opens it too).
 * The panel is always in the HTML, so crawlers see every link.
 */
function NavItemWithSubmenu({ lang, item, active, isOpen, onOpenChange }: { lang: string; item: NavEntry; active: boolean; isOpen: boolean; onOpenChange: (open: boolean) => void }) {
  const pathname = usePathname() ?? "/";
  const { rootRef, buttonRef, panelId, clearTimer, onMouseEnter, onMouseLeave, onButtonClick, onKeyDown, onBlur } = useNavDropdown(isOpen, onOpenChange);
  return (
    <div
      ref={rootRef}
      className={s.navItem}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocusCapture={clearTimer}
      onBlurCapture={onBlur}
      onKeyDown={onKeyDown}
    >
      <span className={s.navTrigger}>
        <Link href={withLocale(lang, item.href)} aria-current={active ? "page" : undefined}>
          {item.label}
        </Link>
        <button
          ref={buttonRef}
          type="button"
          className={s.chevronButton}
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={submenuLabel(lang, item.label)}
          onClick={onButtonClick}
        >
          <span className={s.chevron} data-open={isOpen || undefined} aria-hidden="true" />
        </button>
      </span>
      <div id={panelId} className={s.submenu} data-open={isOpen || undefined}>
        <ul>
          {item.children!.map((child) => (
            <li key={child.href}>
              <Link href={child.href} aria-current={pathname === child.href ? "page" : undefined} tabIndex={isOpen ? undefined : -1} onClick={() => onOpenChange(false)}>
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function DesktopNav({ lang, nav }: { lang: string; nav: NavEntry[] }) {
  const pathname = usePathname() ?? "/";
  const [openItem, setOpenItem] = useState<string | null>(null);

  useEffect(() => setOpenItem(null), [pathname]);

  return (
    <nav className={s.nav} aria-label="Main">
      {nav.map((item) =>
        item.children?.length ? (
          <NavItemWithSubmenu
            key={item.href}
            lang={lang}
            item={item}
            active={isActive(pathname, lang, item.href)}
            isOpen={openItem === item.href}
            onOpenChange={(open) => setOpenItem((cur) => (open ? item.href : cur === item.href ? null : cur))}
          />
        ) : (
          <Link key={item.href} href={withLocale(lang, item.href)} aria-current={isActive(pathname, lang, item.href) ? "page" : undefined}>
            {item.label}
          </Link>
        ),
      )}
    </nav>
  );
}

export function MobileMenu({ lang, nav, cta, labels, aliases }: Props & { aliases: LanguageAlias[] }) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const pathname = usePathname() ?? "/";
  const languages = useLanguageLinks(lang, aliases);

  useEffect(() => {
    setOpen(false);
    setSection(null);
  }, [pathname]);

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
          {nav.map((item) => {
            const link = (
              <Link href={withLocale(lang, item.href)} aria-current={isActive(pathname, lang, item.href) ? "page" : undefined} tabIndex={open ? 0 : -1}>
                {item.label}
              </Link>
            );
            if (!item.children?.length) return <div key={item.href} className={s.mobileItem}>{link}</div>;
            const expanded = section === item.href;
            const panelId = `mobile-sub-${item.href.replace(/\W/g, "")}`;
            return (
              <div key={item.href} className={s.mobileItem}>
                <div className={s.mobileRow}>
                  {link}
                  <button
                    type="button"
                    className={s.mobileToggle}
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    aria-label={submenuLabel(lang, item.label)}
                    tabIndex={open ? 0 : -1}
                    onClick={() => setSection(expanded ? null : item.href)}
                  >
                    <span className={s.chevron} data-open={expanded || undefined} aria-hidden="true" />
                  </button>
                </div>
                <div id={panelId} className={s.mobileSub} data-open={expanded || undefined} {...(expanded && open ? {} : INERT)}>
                  <ul>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} aria-current={pathname === child.href ? "page" : undefined}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </nav>
        {/* On phones the language switch lives here instead of the header bar. */}
        <div className={s.mobileLangs} role="group" aria-label={labels.language}>
          <span aria-current="true">{lang}</span>
          {languages.map((l) => (
            <Link key={l.lang} href={l.href} hrefLang={l.lang} lang={l.lang} prefetch={false} tabIndex={open ? 0 : -1}>
              {l.lang}
            </Link>
          ))}
        </div>
        <ConsultationButton href={cta.href} className={`btn btn-block ${s.btn}`} tabIndex={open ? 0 : -1} onOpen={() => setOpen(false)}>
          {cta.label}
        </ConsultationButton>
      </div>
    </>
  );
}
