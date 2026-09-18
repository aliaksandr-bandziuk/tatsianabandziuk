"use client";

import Cookies from "js-cookie";
import { CONSENT_COOKIE, CONSENT_EVENT } from "@/lib/consent";
import styles from "./CustomCookieConsent.module.scss";

/** The two answers of the server-rendered cookie banner (CustomCookieConsent). */
export default function CookieBannerButtons({ accept, reject }: { accept: string; reject: string }) {
  const save = (analytics: boolean) => {
    Cookies.set(CONSENT_COOKIE, JSON.stringify({ necessary: true, analytics, marketing: analytics }), {
      expires: 180,
      sameSite: "Lax",
    });
    document.documentElement.classList.add("cc-set");
    window.dispatchEvent(new Event(CONSENT_EVENT));
  };
  return (
    <div className={styles.buttons}>
      <button type="button" onClick={() => save(true)} className={styles.primaryButton}>
        {accept}
      </button>
      <button type="button" onClick={() => save(false)} className={styles.linkButton}>
        {reject}
      </button>
    </div>
  );
}
