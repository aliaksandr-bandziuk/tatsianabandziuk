"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a figure up from zero when it scrolls into view. Keeps the sign,
 * decimal separator and any suffix of the original string ("−31", "+2,4",
 * "4 → 1" is left as is). The final value is server-rendered, so crawlers and
 * no-JS visitors see the real number.
 */
export default function CountUp({ value, duration = 1500 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^([+−-]?)(\d+(?:[.,]\d+)?)(\D*)$/);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
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
  }, [value]);

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
