import Script from "next/script";

const GA_ID = "G-2RJCDFRSJH";

/**
 * Google Analytics (gtag.js). Loads on every page regardless of the cookie
 * banner choice, as on bandziuk.com (owner decision, 2026-09-18).
 * lazyOnload: fetched after the page has loaded and the browser is idle, so
 * the 160 KB tag does not compete with the first render (PageSpeed, 2026-09-18).
 */
export default function GoogleAnalyticsWrapper() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
      <Script id="gtag-init" strategy="lazyOnload">
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
