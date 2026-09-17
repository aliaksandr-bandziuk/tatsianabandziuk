"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Fades sections in on first appearance. Elements opt in with `data-reveal`
 * (optionally `data-reveal-delay="120"`). Content stays visible without JS:
 * the hiding class is added only here. Charts inside a revealed element
 * animate through the `.is-visible` class (see charts.module.scss).
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));
    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }
    root.classList.add("js-reveal");
    nodes.forEach((n) => {
      const d = n.dataset.revealDelay;
      if (d) n.style.setProperty("--reveal-delay", `${d}ms`);
    });
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
