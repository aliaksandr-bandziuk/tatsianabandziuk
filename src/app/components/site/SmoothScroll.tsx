"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Site-wide smooth scrolling with Lenis, the same setup as giuseppeiannone.
 * Lenis smooths the native window scroll, so sticky elements,
 * IntersectionObserver and anchors keep working.
 * Off for touch pointers (native inertia is better there) and reduced motion.
 * Scrollable overlays (popup, mobile menu) carry `data-lenis-prevent`.
 */
export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, duration: 1.1, autoRaf: true, anchors: { offset: -90 } });
    lenisRef.current = lenis;

    // Lenis measures the scroll limit on construction and window resize only;
    // pages grow after images, reveals and client navigation, so re-measure.
    let t: number | undefined;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(t);
      t = window.setTimeout(() => lenis.resize(), 250);
    });
    ro.observe(document.body);

    // The popup and the mobile menu lock the page with body overflow: hidden.
    const mo = new MutationObserver(() => {
      if (document.body.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    });
    mo.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    return () => {
      window.clearTimeout(t);
      ro.disconnect();
      mo.disconnect();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.resize();
    const timers = [300, 1000, 2000].map((ms) => window.setTimeout(() => lenisRef.current?.resize(), ms));
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [pathname]);

  return null;
}
