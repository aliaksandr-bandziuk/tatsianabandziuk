"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { DialogProps } from "./ConsultationDialog";

type ModalCtx = { open: () => void };
const Ctx = createContext<ModalCtx | null>(null);

type FormProps = DialogProps["form"];

// The popup (framer-motion + the form) is a separate chunk, fetched on the first open.
const loadDialog = () => import("./ConsultationDialog");
const ConsultationDialog = dynamic(loadDialog, { ssr: false });
const prefetchDialog = () => void loadDialog();

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
  // Mounted after the first open and kept, so the closing animation can run.
  const [loaded, setLoaded] = useState(false);
  const lastFocus = useRef<HTMLElement | null>(null);
  const open = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement;
    setLoaded(true);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!isOpen) lastFocus.current?.focus?.();
  }, [isOpen]);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {loaded && <ConsultationDialog isOpen={isOpen} onClose={close} title={title} text={text} closeLabel={closeLabel} form={form} />}
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
      // Warm the popup chunk on intent, so the first click opens it without a wait.
      onMouseEnter={prefetchDialog}
      onFocus={prefetchDialog}
      onTouchStart={prefetchDialog}
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
