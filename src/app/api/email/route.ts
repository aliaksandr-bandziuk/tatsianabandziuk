import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { guardContactRequest } from "@/lib/formGuard/server";
import { pageLanguage, templatesMail } from "@/lib/templatesMail";

export async function POST(request: NextRequest) {
  const guard = await guardContactRequest(request);

  if (!guard.ok) {
    if (guard.silent) return NextResponse.json({ message: "Email sent" });
    console.warn(`[api/email] rejected: ${guard.reason}`);
    return NextResponse.json({ error: "Invalid request" }, { status: guard.status });
  }

  const data = guard.data;

  if (!process.env.SMTP_HOST || !process.env.EMAIL_USER) {
    console.warn(`[api/email] SMTP not configured; ${data.kind} from ${data.email} not mailed`);
    // Locally the form can be tested end to end without mail settings. In
    // production a missing configuration must surface: the visitor sees the
    // error with the email fallback instead of a false "sent".
    if (process.env.NODE_ENV !== "production") return NextResponse.json({ message: "Email sent", dev: true });
    return NextResponse.json({ error: "Mail not configured" }, { status: 500 });
  }

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Fail fast instead of holding a serverless function open on a slow SMTP.
    connectionTimeout: 10_000,
    socketTimeout: 15_000,
  });

  const SUBJECT: Record<typeof data.kind, string> = {
    contact: "New consulting enquiry",
    templates: "Free templates request",
    waitlist: "Course waitlist signup",
  };

  const CHANNEL_LABEL = { email: "Email", whatsapp: "WhatsApp", phone: "Phone call" } as const;

  const mailBody = [
    `Type: ${SUBJECT[data.kind]}`,
    `Name: ${data.name || "—"}`,
    `Email: ${data.email}`,
    `Company: ${data.company || "—"}`,
    `Preferred contact: ${data.channel ? CHANNEL_LABEL[data.channel] : "—"}`,
    `Phone: ${data.phone || "—"}`,
    `Site language: ${data.language || "—"}`,
    `Timeline / budget: ${data.timeline || "—"}`,
    `Page: ${data.currentPage || "—"}`,
    "",
    data.message || "",
  ].join("\n");

  const mailOptions: Mail.Options = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    // Reply goes straight to the enquirer. The address passed validation.
    replyTo: data.email,
    subject: `${SUBJECT[data.kind]} · tatsianabandziuk.com`,
    text: mailBody,
  };

  try {
    await transport.sendMail(mailOptions);
    // Template requests and waitlist signups get both free templates at once.
    if (data.kind === "templates" || data.kind === "waitlist") {
      await transport.sendMail(templatesMail(data.kind, pageLanguage(data.language, data.currentPage), data.email, process.env.EMAIL_USER!, process.env.EMAIL_TO || process.env.EMAIL_USER!));
    }
    return NextResponse.json({ message: "Email sent" });
  } catch (err) {
    // Logged, not returned: SMTP errors can carry server and account details.
    console.error("[api/email] send failed:", err);
    return NextResponse.json({ error: "Could not send" }, { status: 500 });
  }
}
