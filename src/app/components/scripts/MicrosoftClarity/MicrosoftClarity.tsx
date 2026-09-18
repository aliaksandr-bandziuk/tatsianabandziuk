"use client";

import { useEffect } from "react";

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

/**
 * Microsoft Clarity. Loads whenever NEXT_PUBLIC_CLARITY_ID is set, regardless
 * of the cookie banner choice, as on bandziuk.com (owner decision, 2026-09-18).
 */
export default function MicrosoftClarity() {
  useEffect(() => {
    if (!CLARITY_ID) return;
    (function (c: any, l: Document, a: string, r: string, i: string) {
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
  }, []);

  return null;
}
