"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./error.module.scss";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const messages = {
  en: {
    heading: "Something went wrong",
    body: "An unexpected error occurred. You can try again or return to the homepage.",
    retry: "Try again",
    home: "Back to home",
  },
  pl: {
    heading: "Coś poszło nie tak",
    body: "Wystąpił nieoczekiwany błąd. Możesz spróbować ponownie lub wrócić do strony głównej.",
    retry: "Spróbuj ponownie",
    home: "Wróć na stronę główną",
  },
  ru: {
    heading: "Что-то пошло не так",
    body: "Произошла непредвиденная ошибка. Вы можете попробовать ещё раз или вернуться на главную.",
    retry: "Попробовать снова",
    home: "На главную",
  },
} as const;

type Lang = keyof typeof messages;

export default function Error({ error, reset }: Props) {
  const path = usePathname() ?? "";
  const lang: Lang = path.startsWith("/pl")
    ? "pl"
    : path.startsWith("/ru")
      ? "ru"
      : "en";

  const t = messages[lang];
  const homeHref = lang === "en" ? "/" : `/${lang}`;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.icon} aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 className={styles.heading}>{t.heading}</h1>
        <p className={styles.body}>{t.body}</p>
        <div className={styles.actions}>
          <button className={styles.btnPrimary} onClick={reset}>
            {t.retry}
          </button>
          <Link href={homeHref} className={styles.btnSecondary}>
            {t.home}
          </Link>
        </div>
      </div>
    </div>
  );
}
