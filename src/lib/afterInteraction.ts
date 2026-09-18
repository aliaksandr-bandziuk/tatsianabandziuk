/**
 * Runs `cb` once: on the visitor's first scroll, pointer, touch or key
 * action, or `fallbackMs` after the page has loaded, whichever comes first.
 * Used for the analytics tags so their ~0.5 s of script does not compete with
 * the first render (PageSpeed, 2026-09-18); every visit that lasts a few
 * seconds is still counted. Returns a cleanup function.
 */
const EVENTS = ["scroll", "pointerdown", "touchstart", "keydown", "mousemove"] as const;

export function afterInteraction(cb: () => void, fallbackMs = 4000): () => void {
  let done = false;
  let timer: number | undefined;
  const run = () => {
    if (done) return;
    done = true;
    cleanup();
    cb();
  };
  const startTimer = () => {
    timer = window.setTimeout(run, fallbackMs);
  };
  const cleanup = () => {
    EVENTS.forEach((e) => window.removeEventListener(e, run));
    window.removeEventListener("load", startTimer);
    if (timer !== undefined) window.clearTimeout(timer);
  };
  EVENTS.forEach((e) => window.addEventListener(e, run, { once: true, passive: true }));
  if (document.readyState === "complete") startTimer();
  else window.addEventListener("load", startTimer, { once: true });
  return cleanup;
}
