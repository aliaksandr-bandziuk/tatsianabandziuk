"use client";

import { useAnalyticsConsent } from "@/hooks/useAnalyticsConsent";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** Loads only when NEXT_PUBLIC_GA_ID is set and the visitor accepted analytics cookies. */
export default function GoogleAnalyticsWrapper() {
  const consent = useAnalyticsConsent();
  if (!GA_ID || !consent) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
