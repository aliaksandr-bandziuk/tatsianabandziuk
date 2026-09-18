"use client";

import { useEffect, useRef, type ComponentProps } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ContactForm } from "./Forms";
import s from "./modal.module.scss";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text: string;
  closeLabel: string;
  form: ComponentProps<typeof ContactForm>;
};

/**
 * The consultation popup itself: animation (framer-motion) and the form.
 * Loaded on the first "Book a consultation" click (see ConsultationModal), so
 * neither ships with the first page load.
 */
export default function ConsultationDialog({ isOpen, onClose, title, text, closeLabel, form }: DialogProps) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const box = boxRef.current;
    // First real field: the honeypot input has tabindex="-1" and must never get focus.
    const t = window.setTimeout(() => box?.querySelector<HTMLElement>('input:not([type="hidden"]):not([tabindex="-1"])')?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
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
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={s.overlay}
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
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
            <button type="button" className={s.close} onClick={onClose} aria-label={closeLabel}>
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
  );
}
