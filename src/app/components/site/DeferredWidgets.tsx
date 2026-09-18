"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import type StatusBarType from "./StatusBar";
import type PageLoaderType from "./PageLoader";
import type CookieConsentType from "../shared/CustomCookieConsent/CustomCookieConsent";

// Separate chunks, fetched only once the page has loaded and the browser is idle.
const SmoothScroll = dynamic(() => import("./SmoothScroll"), { ssr: false });
const StatusBar = dynamic(() => import("./StatusBar"), { ssr: false });
const PageLoader = dynamic(() => import("./PageLoader"), { ssr: false });
const CustomCookieConsent = dynamic(() => import("../shared/CustomCookieConsent/CustomCookieConsent"), { ssr: false });

/**
 * Widgets the first screen does not need: smooth scrolling (Lenis), the
 * Excel-style status bar, the page-transition loader and the cookie banner.
 * Mounting them after `load` + idle keeps their JavaScript out of the first
 * render (PageSpeed, 2026-09-18).
 */
export default function DeferredWidgets({
  statusBar,
  pageLoader,
  cookie,
}: {
  statusBar: ComponentProps<typeof StatusBarType>;
  pageLoader: ComponentProps<typeof PageLoaderType>;
  cookie: ComponentProps<typeof CookieConsentType>;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    const go = () => {
      if (typeof window.requestIdleCallback === "function") idleId = window.requestIdleCallback(() => setReady(true), { timeout: 2500 });
      else idleId = window.setTimeout(() => setReady(true), 1200);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      if (idleId !== undefined) {
        if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idleId);
        window.clearTimeout(idleId);
      }
    };
  }, []);

  if (!ready) return null;
  return (
    <>
      <SmoothScroll />
      <StatusBar {...statusBar} />
      <PageLoader {...pageLoader} />
      <CustomCookieConsent {...cookie} />
    </>
  );
}
