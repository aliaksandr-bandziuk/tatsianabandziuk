"use client";

import { useEffect } from "react";
import { afterInteraction } from "@/lib/afterInteraction";

const GA_ID = "G-2RJCDFRSJH";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Google Analytics (gtag.js). Loads on every page regardless of the cookie
 * banner choice, as on bandziuk.com (owner decision, 2026-09-18), on the
 * visitor's first interaction or 4 s after load (see afterInteraction), so
 * the 160 KB tag stays out of the first render.
 */
export default function GoogleAnalyticsWrapper() {
  useEffect(
    () =>
      afterInteraction(() => {
        if (document.getElementById("gtag-js")) return;
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag() {
          // gtag.js expects the arguments object itself.
          // eslint-disable-next-line prefer-rest-params
          window.dataLayer!.push(arguments);
        };
        window.gtag("js", new Date());
        window.gtag("config", GA_ID);
        const s = document.createElement("script");
        s.id = "gtag-js";
        s.async = true;
        s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(s);
      }),
    [],
  );
  return null;
}
