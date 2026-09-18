import Script from "next/script";

const GA_ID = "G-2RJCDFRSJH";

/**
 * Google Analytics (gtag.js). Loads on every page regardless of the cookie
 * banner choice, as on bandziuk.com (owner decision, 2026-09-18).
 */
export default function GoogleAnalyticsWrapper() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
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
