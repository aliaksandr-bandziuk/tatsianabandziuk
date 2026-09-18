"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a figure up from zero when it scrolls into view. Keeps the sign,
 * decimal separator and any suffix of the original string ("−31", "+2,4",
 * "4 → 1" is left as is). The final value is server-rendered, so crawlers and
 * no-JS visitors see the real number.
 */
/**
 * `animate={false}` for figures on the first screen: counting up there is a
 * late visual change that hurts Speed Index (PageSpeed, 2026-09-18).
 */
export default function CountUp({ value, duration = 1500, animate = true }: { value: string; duration?: number; animate?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^([+−-]?)(\d+(?:[.,]\d+)?)(\D*)$/);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match || !animate) return;
    const [, sign, num, suffix] = match;
    const sep = num.includes(",") ? "," : ".";
    const decimals = num.split(/[.,]/)[1]?.length ?? 0;
    const target = parseFloat(num.replace(",", "."));
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          const current = (target * eased).toFixed(decimals).replace(".", sep);
          setShown(`${sign}${current}${suffix}`);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        setShown(`${sign}${(0).toFixed(decimals).replace(".", sep)}${suffix}`);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, animate]);

  return (
    // Screen readers get the final value; the animated digits are hidden from them.
    <span ref={ref}>
      <span className="visually-hidden">{value}</span>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
