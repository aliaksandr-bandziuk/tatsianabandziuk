import Link from "next/link";
import { ConsultationButton } from "@/app/components/site/ConsultationModal";
import { getContent, localizeHref } from "@/content";
import { DesktopNav, LangSwitch, MobileMenu } from "./HeaderClient";
import s from "./header.module.scss";

export default function Header({ lang }: { lang: string }) {
  const c = getContent(lang);
  const privacySlugs = {
    en: getContent("en").privacy.slug,
    pl: getContent("pl").privacy.slug,
    ru: getContent("ru").privacy.slug,
  };
  const cta = { label: c.ui.bookConsultation, href: `${localizeHref(lang, "/contact")}#enquiry` };
  return (
    <header className={s.header}>
      <div className={`container ${s.inner}`}>
        <Link href={localizeHref(lang, "/")} className={s.brand} aria-label={c.person.name}>
          <span className={s.brandName}>{c.person.name}</span>
          <span className={s.brandTag}>{c.ui.tagline}</span>
        </Link>
        <DesktopNav lang={lang} nav={c.ui.nav} />
        <div className={s.actions}>
          <LangSwitch lang={lang} privacySlugs={privacySlugs} label={c.ui.switchLanguage} />
          <ConsultationButton href={cta.href} className={`btn btn-sm ${s.cta}`}>
            {cta.label}
          </ConsultationButton>
          <MobileMenu
            lang={lang}
            nav={c.ui.nav}
            cta={cta}
            privacySlugs={privacySlugs}
            labels={{ menu: c.ui.menu, close: c.ui.close, language: c.ui.switchLanguage }}
          />
        </div>
      </div>
    </header>
  );
}
