"use client";

import Link from "next/link";
import {
  useId,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { useFormGuard } from "@/app/components/forms/FormGuard/useFormGuard";
import type { Ui } from "@/content/types";
import s from "./forms.module.scss";

type Status = "idle" | "sending" | "sent" | "error";

type CellProps = {
  id: string;
  addr: string;
  /** Address when the sheet collapses to one column. */
  addrStack?: string;
  label: string;
  error?: string;
  multiline?: boolean;
} & Omit<
  InputHTMLAttributes<HTMLInputElement> &
    TextareaHTMLAttributes<HTMLTextAreaElement>,
  "id" | "placeholder"
>;

/**
 * Form field styled as a spreadsheet cell: cell address on the left, the ƒx
 * sign that turns into "=" on focus or once filled, a floating label and a
 * left-to-right fill on focus. Cells sit edge to edge in a `.sheet` grid.
 * An error turns the border red and replaces the label with the message, so
 * the grid never breaks.
 */
function Cell({
  id,
  addr,
  addrStack,
  label,
  error,
  multiline,
  className,
  ...rest
}: CellProps) {
  const errId = `${id}-error`;
  const aria = error
    ? { "aria-invalid": true as const, "aria-describedby": errId }
    : {};
  return (
    <div
      className={`${s.cell} ${multiline ? s.multi : ""} ${className ?? ""}`}
      data-error={error ? "true" : undefined}
    >
      <Addr wide={addr} stack={addrStack} />
      <span className={s.fx} aria-hidden="true">
        <b>ƒx</b>
        <i />
      </span>
      <div className={s.cellBox}>
        {multiline ? (
          <textarea
            id={id}
            placeholder=" "
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            {...aria}
          />
        ) : (
          <input
            id={id}
            placeholder=" "
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
            {...aria}
          />
        )}
        <label htmlFor={id} title={error || undefined}>
          {error ? (
            <>
              <span className={s.srOnly}>{label}: </span>
              <span id={errId}>{error}</span>
            </>
          ) : (
            label
          )}
        </label>
      </div>
    </div>
  );
}

function Addr({ wide, stack }: { wide: string; stack?: string }) {
  return (
    <span className={s.addr} aria-hidden="true">
      <span className={stack ? s.addrWide : undefined}>{wide}</span>
      {stack && <span className={s.addrStack}>{stack}</span>}
    </span>
  );
}

type Channel = "email" | "whatsapp" | "phone";
const CHANNELS: Channel[] = ["email", "whatsapp", "phone"];

async function send(body: Record<string, unknown>) {
  const res = await fetch("/api/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, currentPage: window.location.pathname }),
  });
  if (!res.ok) throw new Error(String(res.status));
}

type ContactProps = {
  lang: string;
  form: Ui["form"];
  /** No longer shown: the enquiry language is the page language. */
  languages?: Ui["languages"];
  submitLabel?: string;
  thanks: {
    title: string;
    text: string;
    nextTitle: string;
    next: string[];
    links: { label: string; href: string }[];
  };
};

export function ContactForm({ lang, form, submitLabel, thanks }: ContactProps) {
  const { honeypot, guardFields } = useFormGuard();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const uid = useId();
  const [channel, setChannel] = useState<Channel>("email");
  const phoneRequired = channel !== "email";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<
      string,
      string
    >;
    const next: Record<string, string> = {};
    if (!data.name?.trim()) next.name = form.required;
    if (!data.email?.trim()) next.email = form.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim()))
      next.email = form.invalidEmail;
    if (!data.message?.trim()) next.message = form.required;
    const phone = data.phone?.trim() ?? "";
    if (!phone && phoneRequired) next.phone = form.required;
    else if (phone && !/^\+?\d{7,15}$/.test(phone.replace(/[\s().-]/g, "")))
      next.phone = form.invalidPhone;
    setErrors(next);
    if (Object.keys(next).length) {
      const first = e.currentTarget.querySelector<HTMLElement>(
        `[name="${Object.keys(next)[0]}"]`,
      );
      first?.focus();
      return;
    }
    setStatus("sending");
    try {
      await send({ kind: "contact", ...data, ...guardFields() });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={s.success} role="status" aria-live="polite">
        <span className={s.check} aria-hidden="true">
          ✓
        </span>
        <h3 className="h2-sm" style={{ fontSize: "clamp(24px, 2.4vw, 30px)" }}>
          {thanks.title}
        </h3>
        <p className="body" style={{ marginTop: 12 }}>
          {thanks.text}
        </p>
        <p className="h3" style={{ marginTop: 22, fontSize: 18 }}>
          {thanks.nextTitle}
        </p>
        <ol className={s.nextList}>
          {thanks.next.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ol>
        <div
          style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 22 }}
        >
          {thanks.links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={i === 0 ? "btn btn-sm btn-inline" : "link"}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form
      className={s.form}
      onSubmit={onSubmit}
      noValidate
      onInput={(e) => {
        // The red border goes away as soon as the field is edited.
        const n = (e.target as HTMLInputElement).name;
        if (errors[n]) setErrors((prev) => ({ ...prev, [n]: "" }));
      }}
    >
      {honeypot}
      <div className={`${s.sheet} ${s.full}`}>
        <div className={s.sheetGrid}>
          <Cell
            id={`${uid}-name`}
            addr="A1"
            label={form.name}
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            error={errors.name}
          />
          <Cell
            id={`${uid}-company`}
            addr="B1"
            addrStack="A2"
            label={form.company}
            name="company"
            autoComplete="organization"
            maxLength={150}
          />
          <Cell
            id={`${uid}-email`}
            addr="A2"
            addrStack="A3"
            label={form.email}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={254}
            error={errors.email}
          />
          <Cell
            id={`${uid}-phone`}
            addr="B2"
            addrStack="A4"
            label={phoneRequired ? form.phoneRequired : form.phoneOptional}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required={phoneRequired}
            maxLength={40}
            error={errors.phone}
          />
          <Cell
            id={`${uid}-timeline`}
            addr="A3"
            addrStack="A5"
            label={form.timeline}
            name="timeline"
            maxLength={200}
            className={s.pair}
          />
          <fieldset
            className={`${s.cell} ${s.choiceCell} ${s.pair}`}
            aria-label={form.channelLegend}
          >
            <Addr wide="B3" stack="A6" />
            <div className={s.choiceBox}>
              <legend title={form.channelLegend}>{form.channelShort}</legend>
              <div className={s.choices}>
                {CHANNELS.map((ch) => (
                  <label key={ch}>
                    <input
                      type="radio"
                      name="channel"
                      value={ch}
                      checked={channel === ch}
                      onChange={() => {
                        setChannel(ch);
                        setErrors((prev) => ({ ...prev, phone: "" }));
                      }}
                    />
                    <span>{form.channels[ch]}</span>
                  </label>
                ))}
              </div>
            </div>
          </fieldset>
          <Cell
            id={`${uid}-message`}
            addr="A4"
            addrStack="A7"
            label={form.task}
            name="message"
            multiline
            required
            maxLength={5000}
            error={errors.message}
            className={s.span}
          />
        </div>
      </div>
      {/* Announces the phone label change (required / optional) without moving focus. */}
      <span className={s.srOnly} aria-live="polite">
        {phoneRequired ? form.phoneRequired : form.phoneOptional}
      </span>
      {/* The visitor is already on their language version of the site. */}
      <input type="hidden" name="language" value={lang} />
      <div className={`${s.full} ${s.submitRow}`}>
        <button
          type="submit"
          className="btn btn-inline"
          disabled={status === "sending"}
        >
          {status === "sending" ? form.sending : (submitLabel ?? form.submit)}
        </button>
        <small>{form.privacyNote}</small>
      </div>
      {status === "error" && (
        <p className={`${s.full} ${s.status} ${s.error}`} role="alert">
          {form.error}
        </p>
      )}
    </form>
  );
}

type SignupProps = {
  kind: "templates" | "waitlist";
  form: Ui["form"];
  button: string;
  note?: string;
  thanks: { title: string; text: string; sent?: string; items?: string[] };
};

export function EmailSignup({ kind, form, button, note, thanks }: SignupProps) {
  const { honeypot, guardFields } = useFormGuard();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const uid = useId();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError(value ? form.invalidEmail : form.required);
      return;
    }
    setError("");
    setStatus("sending");
    try {
      await send({ kind, email: value, ...guardFields() });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={s.success} role="status" aria-live="polite">
        <span className={s.check} aria-hidden="true">
          ✓
        </span>
        <p className="h3" style={{ fontSize: 22 }}>
          {thanks.title}
        </p>
        <p className="body" style={{ marginTop: 10 }}>
          {thanks.text} <b className="mono">{email}</b>
        </p>
        {thanks.items && (
          <ul className={s.sentList}>
            {thanks.items.map((it) => (
              <li key={it}>
                {it} <b>{thanks.sent}</b>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: 12 }}
    >
      {honeypot}
      <div className={s.sheet}>
        <div className={`${s.sheetGrid} ${s.single}`}>
          <Cell
            id={`${uid}-email`}
            addr="A1"
            label={form.workEmail}
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            error={error}
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-block"
        disabled={status === "sending"}
      >
        {status === "sending" ? form.sending : button}
      </button>
      {status === "error" && (
        <p className={`${s.status} ${s.error}`} role="alert">
          {form.error}
        </p>
      )}
      {note && (
        <small
          className="body"
          style={{ fontSize: 12, color: "var(--text-tertiary)" }}
        >
          {note}
        </small>
      )}
    </form>
  );
}
