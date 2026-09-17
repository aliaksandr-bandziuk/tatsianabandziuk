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

// React 18 has no `inert` prop type and renders it only as a string.
const INERT = { inert: "" } as object;

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

export function LangSwitch({ lang, aliases, label }: { lang: string; aliases: LanguageAlias[]; label: string }) {
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
          // Pages with translated slugs map through the aliases; fixed pages keep their path.
          const alias = aliases.find((a) => a.paths[lang as keyof LanguageAlias['paths']] === rest);
          const target = alias ? alias.paths[l] ?? alias.fallback[l] : rest;
          return (
            <li key={l}>
              <Link href={withPrefix(l, target)} hrefLang={l} lang={l} prefetch={false} onClick={() => setOpen(false)}>
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

/**
 * A top-level item with a submenu: the label stays a real link to the section,
 * the chevron is a separate button that opens the panel (hover opens it too).
 * The panel is always in the HTML, so crawlers see every link.
 */
function NavItemWithSubmenu({ lang, item, active, isOpen, onOpenChange }: { lang: string; item: NavEntry; active: boolean; isOpen: boolean; onOpenChange: (open: boolean) => void }) {
  const pathname = usePathname() ?? "/";
  const d = useNavDropdown(isOpen, onOpenChange);
  return (
    <div
      ref={d.rootRef}
      className={s.navItem}
      onMouseEnter={d.onMouseEnter}
      onMouseLeave={d.onMouseLeave}
      onFocusCapture={d.clearTimer}
      onBlurCapture={d.onBlur}
      onKeyDown={d.onKeyDown}
    >
      <span className={s.navTrigger}>
        <Link href={withLocale(lang, item.href)} aria-current={active ? "page" : undefined}>
          {item.label}
        </Link>
        <button
          ref={d.buttonRef}
          type="button"
          className={s.chevronButton}
          aria-expanded={isOpen}
          aria-controls={d.panelId}
          aria-label={submenuLabel(lang, item.label)}
          onClick={d.onButtonClick}
        >
          <span className={s.chevron} data-open={isOpen || undefined} aria-hidden="true" />
        </button>
      </span>
      <div id={d.panelId} className={s.submenu} data-open={isOpen || undefined}>
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

export function MobileMenu({ lang, nav, cta, labels }: Props) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const pathname = usePathname() ?? "/";

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
        <ConsultationButton href={cta.href} className={`btn btn-block ${s.btn}`} tabIndex={open ? 0 : -1} onOpen={() => setOpen(false)}>
          {cta.label}
        </ConsultationButton>
      </div>
    </>
  );
}
