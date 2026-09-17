"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CredentialsBlock } from "@/content/types";
import { CellFrame, cellAddr } from "./CellFrameClient";
import s from "./credentials.module.scss";

const MIN = 1;
const MAX = 4;

/**
 * Diplomas and certificates: a scroll-snap slider of cards (same mechanics as
 * DiplomiSlider in giuseppeiannone) and a viewer that pages through the
 * documents and zooms (wheel, double-click, buttons, pinch) and pans (drag).
 * Every card is in the server HTML; the viewer is an enhancement.
 */
export default function CredentialsGallery({ data }: { data: CredentialsBlock }) {
  const { items, labels } = data;
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ prev: false, next: false, overflow: false });
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setEdges({ overflow: scrollWidth - clientWidth > 1, prev: scrollLeft > 2, next: scrollLeft < scrollWidth - clientWidth - 2 });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = track.current;
    const first = el?.querySelector("li");
    if (!el || !first) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (first.getBoundingClientRect().width + gap), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className={s.gallery}>
      {edges.overflow && (
        <div className={s.arrows}>
          <button type="button" className={s.arrow} aria-label={labels.prev} disabled={!edges.prev} onClick={() => scrollByCard(-1)}>
            <Chevron dir="left" />
          </button>
          <button type="button" className={s.arrow} aria-label={labels.next} disabled={!edges.next} onClick={() => scrollByCard(1)}>
            <Chevron dir="right" />
          </button>
        </div>
      )}
      <div className={s.trackWrap} data-fade-start={edges.prev || undefined} data-fade-end={edges.next || undefined}>
        <ul ref={track} className={s.track} aria-label={labels.track} tabIndex={0}>
          {items.map((it, i) => (
            <li key={it.id} className={s.item}>
              <button
                type="button"
                className={`${s.card} xcell`}
                aria-label={`${it.title}, ${it.institution}, ${it.year}. ${labels.open}`}
                onClick={() => setOpen(i)}
              >
                <CellFrame addr={cellAddr(i, items.length)} />
                <span className={s.media}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={it.thumb} alt="" loading="lazy" decoding="async" />
                </span>
                <span className={s.meta}>
                  <span className={s.year}>{it.year}</span>
                  <span className={s.title}>{it.title}</span>
                  <span className={s.institution}>{it.institution}</span>
                  <span className={s.open}>{labels.open} →</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {open !== null && <Viewer data={data} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </div>
  );
}

function Viewer({ data, index, onIndex, onClose }: { data: CredentialsBlock; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const { items, labels } = data;
  const dialog = useRef<HTMLDialogElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const [view, setView] = useState({ z: 1, x: 0, y: 0 });
  const [dir, setDir] = useState<1 | -1>(1);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{ dist: number; z: number; sx: number; sy: number; vx: number; vy: number; moved: boolean } | null>(null);
  const item = items[index];
  const img = useRef<HTMLImageElement>(null);
  const dragged = useRef(false);

  useEffect(() => {
    lastFocus.current = document.activeElement as HTMLElement;
    const d = dialog.current;
    d?.showModal();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
      lastFocus.current?.focus?.({ preventScroll: true });
    };
  }, []);

  // Reset zoom on every document change.
  useEffect(() => setView({ z: 1, x: 0, y: 0 }), [index]);

  const clamp = useCallback((z: number, x: number, y: number) => {
    const el = stage.current;
    const zz = Math.min(MAX, Math.max(MIN, z));
    if (!el || zz === 1) return { z: zz, x: 0, y: 0 };
    const w = el.clientWidth;
    const h = el.clientHeight;
    const mx = ((zz - 1) * w) / 2;
    const my = ((zz - 1) * h) / 2;
    return { z: zz, x: Math.min(mx, Math.max(-mx, x)), y: Math.min(my, Math.max(-my, y)) };
  }, []);

  // Zoom towards a point (clientX/Y), keeping it under the cursor.
  const zoomAt = useCallback(
    (nz: number, cx?: number, cy?: number) => {
      setView((v) => {
        const el = stage.current;
        if (!el || cx === undefined || cy === undefined) return clamp(nz, v.x * (nz / v.z), v.y * (nz / v.z));
        const r = el.getBoundingClientRect();
        const px = cx - (r.left + r.width / 2);
        const py = cy - (r.top + r.height / 2);
        const k = Math.min(MAX, Math.max(MIN, nz)) / v.z;
        return clamp(nz, px - (px - v.x) * k, py - (py - v.y) * k);
      });
    },
    [clamp],
  );

  const go = useCallback(
    (step: 1 | -1) => {
      setDir(step);
      onIndex((index + step + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "+" || e.key === "=") setView((v) => clamp(v.z * 1.5, v.x, v.y));
      else if (e.key === "-") setView((v) => clamp(v.z / 1.5, v.x, v.y));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, clamp]);

  // Wheel zoom needs a non-passive listener.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setView((v) => {
        const nz = v.z * Math.exp(-e.deltaY * 0.0022);
        const r = el.getBoundingClientRect();
        const px = e.clientX - (r.left + r.width / 2);
        const py = e.clientY - (r.top + r.height / 2);
        const k = Math.min(MAX, Math.max(MIN, nz)) / v.z;
        return clamp(nz, px - (px - v.x) * k, py - (py - v.y) * k);
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [clamp]);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = Array.from(pointers.current.values());
    const dist = pts.length === 2 ? Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) : 0;
    gesture.current = { dist, z: view.z, sx: e.clientX, sy: e.clientY, vx: view.x, vy: view.y, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId) || !gesture.current) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    const pts = Array.from(pointers.current.values());
    if (pts.length === 2 && g.dist) {
      const d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      g.moved = true;
      zoomAt(g.z * (d / g.dist), (pts[0].x + pts[1].x) / 2, (pts[0].y + pts[1].y) / 2);
      return;
    }
    const dx = e.clientX - g.sx;
    const dy = e.clientY - g.sy;
    if (Math.abs(dx) + Math.abs(dy) > 4) g.moved = true;
    if (view.z > 1) setView(clamp(view.z, g.vx + dx, g.vy + dy));
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const g = gesture.current;
    pointers.current.delete(e.pointerId);
    if (g && view.z === 1 && pointers.current.size === 0) {
      const dx = e.clientX - g.sx;
      // Swipe to change document when not zoomed in.
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(e.clientY - g.sy)) go(dx < 0 ? 1 : -1);
    }
    if (pointers.current.size === 0) {
      dragged.current = !!g?.moved;
      gesture.current = null;
    }
  };

  // Clicking the dark area around the document closes the viewer; clicks on
  // the document itself or at the end of a drag do not.
  const onStageClick = (e: React.MouseEvent) => {
    if (dragged.current) {
      dragged.current = false;
      return;
    }
    const r = img.current?.getBoundingClientRect();
    if (r && e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) return;
    onClose();
  };

  const zoomed = view.z > 1.01;

  return (
    <dialog
      ref={dialog}
      className={s.dialog}
      aria-label={`${item.title}, ${item.year}`}
      data-lenis-prevent
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => e.target === dialog.current && onClose()}
    >
      <button type="button" className={`${s.ctrl} ${s.close}`} aria-label={labels.close} onClick={onClose}>
        ×
      </button>
      {items.length > 1 && (
        <>
          <button type="button" className={`${s.ctrl} ${s.nav} ${s.navPrev}`} aria-label={labels.prev} onClick={() => go(-1)}>
            <Chevron dir="left" />
          </button>
          <button type="button" className={`${s.ctrl} ${s.nav} ${s.navNext}`} aria-label={labels.next} onClick={() => go(1)}>
            <Chevron dir="right" />
          </button>
        </>
      )}

      <div
        ref={stage}
        className={s.stage}
        data-zoomed={zoomed}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={(e) => zoomAt(zoomed ? 1 : 2.4, e.clientX, e.clientY)}
        onClick={onStageClick}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={item.id}
          ref={img}
          src={item.image}
          alt={`${item.title} — ${item.institution}, ${item.year}`}
          width={item.width}
          height={item.height}
          className={s.doc}
          data-dir={dir}
          draggable={false}
          style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.z})` }}
        />
      </div>

      <div className={s.bar}>
        <div className={s.caption}>
          <span className={s.counter}>
            {index + 1} / {items.length}
          </span>
          <span className={s.capTitle}>{item.title}</span>
          <span className={s.capMeta}>
            {item.institution} · {item.year}
            {item.redacted ? ` · ${labels.redactionNote}` : ""}
          </span>
        </div>
        <div className={s.zoom}>
          <button type="button" className={s.ctrl} aria-label={labels.zoomOut} disabled={!zoomed} onClick={() => setView((v) => clamp(v.z / 1.5, v.x, v.y))}>
            −
          </button>
          <span className={s.zoomValue}>{Math.round(view.z * 100)}%</span>
          <button type="button" className={s.ctrl} aria-label={labels.zoomIn} disabled={view.z >= MAX} onClick={() => setView((v) => clamp(v.z * 1.5, v.x, v.y))}>
            +
          </button>
          <span className={s.hint}>{labels.zoomHint}</span>
        </div>
      </div>
    </dialog>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d={dir === "left" ? "M15 5 L8 12 L15 19" : "M9 5 L16 12 L9 19"} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
