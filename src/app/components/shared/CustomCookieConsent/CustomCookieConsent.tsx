import styles from "./CustomCookieConsent.module.scss";
import CookieBannerButtons from "./CookieBannerButtons";
import { CONSENT_COOKIE } from "@/lib/consent";

type Props = {
  lang: string;
};

const dictionary = {
  en: {
    title: "Cookies on this site",
    description:
      "Necessary cookies keep the site working. Analytics cookies, which show how visitors use the site, are set only if you agree.",
    acceptAll: "Accept all",
    rejectAll: "Only necessary",
    privacy: "Privacy policy",
  },
  pl: {
    title: "Pliki cookie na tej stronie",
    description:
      "Niezbędne pliki cookie zapewniają działanie strony. Analityczne pliki cookie ustawiamy tylko za Twoją zgodą.",
    acceptAll: "Akceptuj wszystkie",
    rejectAll: "Tylko niezbędne",
    privacy: "Polityka prywatności",
  },
  ru: {
    title: "Файлы cookie на сайте",
    description:
      "Необходимые cookie обеспечивают работу сайта. Аналитические cookie устанавливаются только с вашего согласия.",
    acceptAll: "Принять все",
    rejectAll: "Только необходимые",
    privacy: "Политика конфиденциальности",
  },
};

const PRIVACY_SLUG: Record<string, string> = {
  en: "privacy-policy",
  pl: "polityka-prywatnosci",
  ru: "politika-konfidencialnosti",
};

/**
 * Inline script for <head>: marks <html> with `cc-set` before the first paint
 * when a choice is already saved, so the banner (in the HTML from the start)
 * never flashes for returning visitors. See `.cc-set .cookieBanner`.
 */
export const COOKIE_BANNER_HEAD_SCRIPT = `try{if(document.cookie.indexOf(${JSON.stringify(CONSENT_COOKIE + "=")})>-1)document.documentElement.classList.add("cc-set")}catch(e){}`;

/**
 * Cookie banner, rendered on the server so it is part of the first paint:
 * a banner that slid in after the JavaScript loaded was the last visual change
 * on the first screen and hurt Speed Index (PageSpeed, 2026-09-18). Only the
 * buttons are a client component.
 */
export default function CustomCookieConsent({ lang }: Props) {
  const t = dictionary[lang as keyof typeof dictionary] || dictionary.en;
  const privacyHref = `${lang === "en" ? "" : `/${lang}`}/${PRIVACY_SLUG[lang] ?? PRIVACY_SLUG.en}`;

  return (
    <div className={styles.cookieBanner} role="dialog" aria-live="polite" aria-label={t.title}>
      <p className={styles.title}>{t.title}</p>
      <p className={styles.text}>{t.description}</p>
      <CookieBannerButtons accept={t.acceptAll} reject={t.rejectAll} />
      <p className={styles.policyLink}>
        <a href={privacyHref}>{t.privacy}</a>
      </p>
    </div>
  );
}
