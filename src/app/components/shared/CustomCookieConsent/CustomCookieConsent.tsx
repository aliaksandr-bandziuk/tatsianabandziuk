"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from "./CustomCookieConsent.module.scss";
import { CONSENT_COOKIE as COOKIE_NAME, CONSENT_EVENT } from "@/hooks/useAnalyticsConsent";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

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

export default function CustomCookieConsent({ lang }: Props) {
  const t = dictionary[lang as keyof typeof dictionary] || dictionary.en;

  const getNormalizedHref = (lang: string, link: string) => {
    const normalizedLink = link.startsWith("/") ? link.slice(1) : link;
    const languagePrefix = lang === "en" ? "" : `/${lang}`;
    return `${languagePrefix}/${normalizedLink}`;
  };

  const [visible, setVisible] = useState(false);

  // Show the banner only while no choice has been saved.
  useEffect(() => {
    const saved = Cookies.get(COOKIE_NAME);
    if (!saved) {
      setVisible(true);
    }
  }, []);

  const acceptAll = () => {
    const consent: Consent = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    Cookies.set(COOKIE_NAME, JSON.stringify(consent), {
      expires: 180,
      sameSite: "Lax",
    });
    setVisible(false);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  };

  const rejectAll = () => {
    const consent: Consent = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    Cookies.set(COOKIE_NAME, JSON.stringify(consent), {
      expires: 180,
      sameSite: "Lax",
    });
    setVisible(false);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  };

  if (!visible) return null;

  return (
    <div className={styles.cookieBanner} role="dialog" aria-live="polite" aria-label={t.title}>
      <p className={styles.title}>{t.title}</p>
      <p className={styles.text}>{t.description}</p>

      <div className={styles.buttons}>
        <button
          type="button"
          onClick={acceptAll}
          className={styles.primaryButton}
        >
          {t.acceptAll}
        </button>

        <button type="button" onClick={rejectAll} className={styles.linkButton}>
          {t.rejectAll}
        </button>
      </div>

      <p className={styles.policyLink}>
        <a
          href={getNormalizedHref(
            lang,
            ({
              en: "privacy-policy",
              pl: "polityka-prywatnosci",
              ru: "politika-konfidencialnosti",
            } as Record<string, string>)[lang] ?? "privacy-policy"
          )}
        >
          {t.privacy}
        </a>
      </p>
    </div>
  );
}
