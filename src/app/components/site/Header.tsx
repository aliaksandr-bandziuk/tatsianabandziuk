import Link from "next/link";
import { ConsultationButton } from "@/app/components/site/ConsultationModal";
import { calculatorHref, getContent, languageAliases, localizeHref, serviceHref } from "@/content";
import { BrandMark, DesktopNav, LangSwitch, MobileMenu, type NavEntry } from "./HeaderClient";
import s from "./header.module.scss";

export default async function Header({ lang }: { lang: string }) {
  const c = await getContent(lang);
  const aliases = await languageAliases();

  // Sections whose pages open as a submenu under their nav item.
  const submenus: Record<string, NavEntry["children"]> = {
    "/services": c.services.map((x) => ({ label: x.breadcrumb, href: serviceHref(lang, x.slug) })),
    "/tools": c.calculators.map((x) => ({ label: x.breadcrumb, href: calculatorHref(lang, x.slug) })),
  };
  const nav: NavEntry[] = c.ui.nav.map((item) => (submenus[item.href]?.length ? { ...item, children: submenus[item.href] } : item));

  const cta = { label: c.ui.bookConsultation, href: `${localizeHref(lang, "/contact")}#enquiry` };
  return (
    <header className={s.header}>
      <div className={`container ${s.inner}`}>
        <Link href={localizeHref(lang, "/")} className={s.brand} aria-label={c.person.name}>
          <BrandMark className={s.brandMark} />
          <span className={s.brandName}>{c.person.name}</span>
          <span className={s.brandTag}>{c.ui.tagline}</span>
        </Link>
        <DesktopNav lang={lang} nav={nav} />
        <div className={s.actions}>
          <LangSwitch lang={lang} aliases={aliases} label={c.ui.switchLanguage} />
          <ConsultationButton href={cta.href} className={`btn btn-sm ${s.cta}`}>
            <span className={s.ctaFull}>{cta.label}</span>
            <span className={s.ctaShort}>{c.ui.bookConsultationShort}</span>
          </ConsultationButton>
          <MobileMenu
            lang={lang}
            nav={nav}
            cta={cta}
            aliases={aliases}
            labels={{ menu: c.ui.menu, close: c.ui.close, language: c.ui.switchLanguage }}
          />
        </div>
      </div>
    </header>
  );
}
