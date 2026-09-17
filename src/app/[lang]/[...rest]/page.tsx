import { notFound } from "next/navigation";

/**
 * Catch-all for URLs that match no route. Calling notFound() here keeps the
 * 404 inside [lang]/layout.tsx (header, footer, fonts); without it Next falls
 * back to its bare default page, because the root layout has no <html>.
 */
export const metadata = { robots: { index: false } };

export default function CatchAll() {
  notFound();
}
