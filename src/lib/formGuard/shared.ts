/**
 * Shared between the contact forms and `/api/email`.
 *
 * The honeypot name is deliberately obscure: browsers autofill fields whose
 * names look like "website" or "url", which would make a real visitor look
 * like a bot and silently drop their enquiry.
 */
export const HONEYPOT_FIELD = "fax_extension_2";

/**
 * Faster than this is a script. A person using browser autofill on the short
 * form still needs well over a second and a half to tick consent and submit.
 */
export const MIN_FILL_MS = 1500;
