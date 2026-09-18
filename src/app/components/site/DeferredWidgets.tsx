"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import type StatusBarType from "./StatusBar";
import type PageLoaderType from "./PageLoader";

// Separate chunks, fetched only once the page has loaded and the browser is idle.
const SmoothScroll = dynamic(() => import("./SmoothScroll"), { ssr: false });
const StatusBar = dynamic(() => import("./StatusBar"), { ssr: false });
const PageLoader = dynamic(() => import("./PageLoader"), { ssr: false });

/**
 * Widgets the first screen does not need: smooth scrolling (Lenis), the
 * Excel-style status bar and the page-transition loader. Mounting them after
 * `load` + idle keeps their JavaScript out of the first render (PageSpeed,
 * 2026-09-18). The cookie banner is not here: it is server-rendered so it is
 * part of the first paint.
 */
export default function DeferredWidgets({
  statusBar,
  pageLoader,
}: {
  statusBar: ComponentProps<typeof StatusBarType>;
  pageLoader: ComponentProps<typeof PageLoaderType>;
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
    </>
  );
}
