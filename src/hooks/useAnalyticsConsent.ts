"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { CONSENT_COOKIE, CONSENT_EVENT } from "@/lib/consent";

export { CONSENT_COOKIE, CONSENT_EVENT };

function readConsent(): boolean {
  try {
    const raw = Cookies.get(CONSENT_COOKIE);
    return raw ? Boolean(JSON.parse(raw)?.analytics) : false;
  } catch {
    return false;
  }
}

/**
 * True once the visitor accepted analytics cookies. Read on the client so the
 * layout stays static (reading cookies() on the server would make every page
 * dynamic). Updates immediately when the banner is answered.
 */
export function useAnalyticsConsent(): boolean {
  const [granted, setGranted] = useState(false);
  useEffect(() => {
    setGranted(readConsent());
    const onChange = () => setGranted(readConsent());
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);
  return granted;
}
