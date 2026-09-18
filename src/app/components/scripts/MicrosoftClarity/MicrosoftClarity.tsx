"use client";

import { useEffect } from "react";

const CLARITY_ID = "yk8avkfbei";

/**
 * Microsoft Clarity. Loads on every page regardless of the cookie banner
 * choice, as on bandziuk.com (owner decision, 2026-09-18). Injected after the
 * page has loaded and the browser is idle, so it stays out of the first render.
 */
export default function MicrosoftClarity() {
  useEffect(() => {
    const inject = () => (function (c: any, l: Document, a: string, r: string, i: string) {
      if (c[a]) return; // do not initialise twice (dev strict mode)
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      const t = l.createElement(r) as HTMLScriptElement;
      t.async = true;
      t.src = "https://www.clarity.ms/tag/" + i;
      const y = l.getElementsByTagName(r)[0];
      if (y && y.parentNode) y.parentNode.insertBefore(t, y);
      else l.head.appendChild(t);
    })(window, document, "clarity", "script", CLARITY_ID);

    const idle = () => {
      if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(inject, { timeout: 4000 });
      else setTimeout(inject, 2000);
    };
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });
    return () => window.removeEventListener("load", idle);
  }, []);

  return null;
}
