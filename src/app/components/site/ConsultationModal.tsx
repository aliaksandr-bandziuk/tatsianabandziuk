"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ContactForm } from "./Forms";
import s from "./modal.module.scss";

type ModalCtx = { open: () => void };
const Ctx = createContext<ModalCtx | null>(null);

type FormProps = ComponentProps<typeof ContactForm>;

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Holds the consultation popup for the whole page (same idea as ModalContext in bandziuk). */
export function ConsultationModalProvider({
  children,
  title,
  text,
  closeLabel,
  form,
}: {
  children: ReactNode;
  title: string;
  text: string;
  closeLabel: string;
  form: FormProps;
}) {
  const [isOpen, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const open = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement;
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!isOpen) {
      lastFocus.current?.focus?.();
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const box = boxRef.current;
    const t = window.setTimeout(() => box?.querySelector<HTMLElement>("input")?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !box) return;
      const els = Array.from(box.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={s.overlay}
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(e) => e.target === e.currentTarget && close()}
          >
            <motion.div
              ref={boxRef}
              className={s.box}
              role="dialog"
              aria-modal="true"
              aria-labelledby="consultation-title"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <button type="button" className={s.close} onClick={close} aria-label={closeLabel}>
                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M15 1 1 15M1 1l14 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
              <p className={s.title} id="consultation-title">
                {title}
              </p>
              <p className={s.text}>{text}</p>
              <ContactForm {...form} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

/**
 * "Book a consultation" control. Renders a real link to the contact form
 * (works without JS and for crawlers); a normal click opens the popup instead.
 */
export function ConsultationButton({
  href,
  className,
  children,
  tabIndex,
  onOpen,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  tabIndex?: number;
  onOpen?: () => void;
}) {
  const ctx = useContext(Ctx);
  return (
    <Link
      href={href}
      className={className}
      tabIndex={tabIndex}
      aria-haspopup="dialog"
      onClick={(e) => {
        if (!ctx || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        onOpen?.();
        ctx.open();
      }}
    >
      {children}
    </Link>
  );
}
