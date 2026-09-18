import type { NextRequest } from "next/server";
import { HONEYPOT_FIELD, MIN_FILL_MS } from "./shared";

/**
 * Server-side checks for the public forms (`/api/email`): the enquiry form,
 * the free-templates request and the course waitlist.
 *
 * The route mails only the site owner, so it cannot be used to spam third
 * parties. The risks are flooding the inbox and tripping the SMTP provider's sending
 * limits, which would stop real enquiries arriving. Each check here is cheap;
 * together they stop scripted posting without a captcha.
 */

export type GuardResult =
  | { ok: true; data: ContactPayload }
  /** `silent`: answer 200 so a bot learns nothing, but send no mail. */
  | { ok: false; status: number; reason: string; silent?: boolean };

export type ContactPayload = {
  kind: "contact" | "templates" | "waitlist";
  name: string;
  email: string;
  company?: string;
  message?: string;
  timeline?: string;
  language?: string;
  channel?: ContactChannel;
  phone?: string;
  currentPage?: string;
};

export const CONTACT_CHANNELS = ["email", "whatsapp", "phone"] as const;
export type ContactChannel = (typeof CONTACT_CHANNELS)[number];

/** Digits with an optional leading +; spaces, dots, dashes and brackets are ignored. */
export const PHONE_RE = /^\+?\d{7,15}$/;
export const normalizePhone = (v: string) => v.replace(/[\s().-]/g, "");

const MAX_BODY_BYTES = 20_000;

const LIMITS = {
  name: 100,
  email: 254,
  company: 150,
  message: 5000,
  timeline: 200,
  language: 20,
  phone: 40,
  currentPage: 500,
} as const;

const KINDS = ["contact", "templates", "waitlist"] as const;

// Deliberately loose: the client already validates with Yup. This only
// rejects values no real address can have.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Best-effort rate limit, per server instance. Vercel reuses warm instances,
 * so this stops bursts, but it is not a global counter: a distributed flood
 * spread across cold instances can exceed it. A captcha or a shared store is
 * the durable fix if that ever happens.
 */
const WINDOW_MS = 10 * 60 * 1000;
const PER_IP = 5;
const PER_INSTANCE = 40;
const hits = new Map<string, number[]>();
let instanceHits: number[] = [];

function recent(list: number[], now: number) {
  return list.filter((t) => now - t < WINDOW_MS);
}

function rateLimited(ip: string, now = Date.now()): boolean {
  instanceHits = recent(instanceHits, now);
  const forIp = recent(hits.get(ip) ?? [], now);
  if (forIp.length >= PER_IP || instanceHits.length >= PER_INSTANCE) {
    hits.set(ip, forIp);
    return true;
  }
  forIp.push(now);
  instanceHits.push(now);
  hits.set(ip, forIp);
  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) hits.clear();
  return false;
}

function clientIp(req: NextRequest): string {
  // NextRequest.ip was removed in Next 15; Vercel puts the client IP in these headers.
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

/**
 * Same-origin only. Browsers always send `Origin` on a POST from our own
 * pages; comparing it with the request's own host keeps localhost and Vercel
 * preview deployments working without a hardcoded domain list.
 */
function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function str(value: unknown, max: number): string | null {
  if (value === undefined || value === null || value === "") return "";
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > max ? null : trimmed;
}

export async function guardContactRequest(req: NextRequest): Promise<GuardResult> {
  if (!sameOrigin(req)) return { ok: false, status: 403, reason: "origin" };

  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return { ok: false, status: 413, reason: "too large" };

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) return { ok: false, status: 413, reason: "too large" };
    body = JSON.parse(raw);
  } catch {
    return { ok: false, status: 400, reason: "bad json" };
  }
  if (!body || typeof body !== "object") return { ok: false, status: 400, reason: "bad body" };

  // A filled honeypot is a bot. Answer as if it worked.
  if (typeof body[HONEYPOT_FIELD] === "string" && body[HONEYPOT_FIELD] !== "") {
    return { ok: false, status: 200, reason: "honeypot", silent: true };
  }

  // Missing timing is not silent: a visitor still running a page bundle from
  // before this check shipped must see the error and the email fallback,
  // rather than a false "sent" for a lead that never arrives.
  const fillMs = body.fillMs;
  if (typeof fillMs !== "number" || !Number.isFinite(fillMs) || fillMs < MIN_FILL_MS) {
    return { ok: false, status: 400, reason: "timing" };
  }

  if (rateLimited(clientIp(req))) return { ok: false, status: 429, reason: "rate limit" };

  const kind = KINDS.find((k) => k === body.kind) ?? "contact";
  const name = str(body.name, LIMITS.name);
  const email = str(body.email, LIMITS.email);
  const company = str(body.company, LIMITS.company);
  const message = str(body.message, LIMITS.message);
  const timeline = str(body.timeline, LIMITS.timeline);
  const language = str(body.language, LIMITS.language);
  const currentPage = str(body.currentPage, LIMITS.currentPage);
  const phone = str(body.phone, LIMITS.phone);
  const channel = CONTACT_CHANNELS.find((c) => c === body.channel);

  if (!email || !EMAIL_RE.test(email)) return { ok: false, status: 400, reason: "invalid email" };
  if (name === null || company === null || message === null || timeline === null || language === null || currentPage === null || phone === null) {
    return { ok: false, status: 400, reason: "invalid" };
  }
  // An enquiry needs a name and a description; a template request only an email.
  if (kind === "contact" && (!name || !message)) return { ok: false, status: 400, reason: "missing fields" };
  // WhatsApp and phone call need a number; a number given with email is still shape-checked.
  if (kind === "contact" && !channel) return { ok: false, status: 400, reason: "missing channel" };
  if (kind === "contact" && channel !== "email" && !phone) return { ok: false, status: 400, reason: "missing phone" };
  if (phone && !PHONE_RE.test(normalizePhone(phone))) return { ok: false, status: 400, reason: "invalid phone" };

  return {
    ok: true,
    data: {
      kind,
      name: name || "",
      email,
      company: company || undefined,
      message: message || undefined,
      timeline: timeline || undefined,
      language: language || undefined,
      channel: kind === "contact" ? channel : undefined,
      phone: phone || undefined,
      currentPage: currentPage || undefined,
    },
  };
}
