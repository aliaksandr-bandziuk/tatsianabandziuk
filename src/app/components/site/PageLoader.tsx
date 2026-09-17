"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import s from "./loader.module.scss";

// Shown only when a client navigation takes longer than this: a flash on a
// fast transition would make the site feel slower (same rule as giuseppeiannone).
const SHOW_DELAY_MS = 300;
// If the route never changes (aborted navigation, error), hide anyway.
const SAFETY_TIMEOUT_MS = 8000;

/**
 * Full-screen loader between pages: the handwritten signature fills from a
 * muted tint to the brand green. Navigation start is detected from link clicks
 * and back/forward; the end is the pathname change.
 */
export default function PageLoader({ signature, label }: { signature: string; label: string }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const pathRef = useRef(pathname);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  useEffect(() => {
    pathRef.current = pathname;
    clear();
    setVisible(false);
  }, [pathname]);

  useEffect(() => {
    const arm = () => {
      clear();
      timers.current = [
        window.setTimeout(() => setVisible(true), SHOW_DELAY_MS),
        window.setTimeout(() => {
          clear();
          setVisible(false);
        }, SAFETY_TIMEOUT_MS),
      ];
    };

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;
      if (a.target && a.target !== "_self") return;
      if (a.hasAttribute("download")) return;
      // Consultation buttons open the popup instead of navigating.
      if (a.getAttribute("aria-haspopup") === "dialog") return;
      let url: URL;
      try {
        url = new URL(a.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      arm();
    };
    const onPop = () => {
      if (window.location.pathname !== pathRef.current) arm();
    };

    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPop);
      clear();
    };
  }, []);

  return (
    <div className={s.overlay} data-visible={visible}>
      <span className={s.word} data-text={signature} aria-hidden="true">
        {signature}
      </span>
      <p className={s.status} role="status">
        {visible ? label : ""}
      </p>
    </div>
  );
}
