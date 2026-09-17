"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const CONSENT_COOKIE = "cookieConsent";
export const CONSENT_EVENT = "cookie-consent-change";

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
