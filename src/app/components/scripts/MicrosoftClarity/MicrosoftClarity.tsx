"use client";

import { useAnalyticsConsent } from "@/hooks/useAnalyticsConsent";
import { useEffect } from "react";

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

/** Loads only when NEXT_PUBLIC_CLARITY_ID is set and the visitor accepted analytics cookies. */
export default function MicrosoftClarity() {
  const consent = useAnalyticsConsent();
  useEffect(() => {
    if (!CLARITY_ID || !consent) return;
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
  }, [consent]);

  return null;
}
