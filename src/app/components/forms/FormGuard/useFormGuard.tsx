"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { HONEYPOT_FIELD } from "@/lib/formGuard/shared";

/**
 * Anti-spam fields for a contact form: a hidden honeypot input and the time
 * since the form appeared. Render `honeypot` inside the form and spread
 * `guardFields()` into the request body.
 */
export function useFormGuard() {
  const mountedAt = useRef<number>(0);
  const trap = useRef<HTMLInputElement>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const guardFields = useCallback(
    () => ({
      [HONEYPOT_FIELD]: trap.current?.value ?? "",
      fillMs: mountedAt.current ? Date.now() - mountedAt.current : 0,
    }),
    [],
  );

  // Off-screen rather than display:none, which some bots detect and skip.
  // Hidden from assistive tech and the tab order, so people never meet it.
  const honeypot = (
    <div
      aria-hidden="true"
      style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
    >
      <label>
        Leave this field empty
        <input ref={trap} type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );

  return { honeypot, guardFields };
}
