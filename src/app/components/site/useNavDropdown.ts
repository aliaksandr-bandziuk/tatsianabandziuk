"use client";

import { useCallback, useEffect, useId, useRef } from "react";

const CLOSE_DELAY_MS = 150;

const hasHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/**
 * Open/close mechanics of a header submenu (pattern from giuseppeiannone):
 * hover opens on fine pointers and closes after a short intent delay, the
 * chevron button opens (and on touch toggles), Escape closes and returns focus
 * to the button, focus leaving the item or a click outside closes it.
 */
export function useNavDropdown(isOpen: boolean, onOpenChange: (open: boolean) => void) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const timer = useRef<number | null>(null);
  const panelId = useId();

  const clearTimer = useCallback(() => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const onMouseEnter = () => {
    if (!hasHover()) return;
    clearTimer();
    onOpenChange(true);
  };

  const onMouseLeave = () => {
    if (!hasHover()) return;
    clearTimer();
    timer.current = window.setTimeout(() => onOpenChange(false), CLOSE_DELAY_MS);
  };

  const onButtonClick = () => onOpenChange(hasHover() ? true : !isOpen);

  // On the root, so Escape also works while focus is on a submenu link.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) {
      onOpenChange(false);
      buttonRef.current?.focus();
    }
  };

  const onBlur = (e: React.FocusEvent) => {
    const next = e.relatedTarget as Node | null;
    if (rootRef.current && next && rootRef.current.contains(next)) return;
    onOpenChange(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) onOpenChange(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [isOpen, onOpenChange]);

  useEffect(() => clearTimer, [clearTimer]);

  return { rootRef, buttonRef, panelId, clearTimer, onMouseEnter, onMouseLeave, onButtonClick, onKeyDown, onBlur };
}
