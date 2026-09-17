import { NextResponse } from "next/server";

/**
 * IndexNow key file, served from an env var rather than a static file in
 * public/ — public/images/landing-cta-photo.jpg was wiped out wholesale by
 * an unrelated cleanup commit in August 2026, and the standard <key>.txt
 * naming convention would otherwise put the credential into a committed
 * filename (and git history) permanently.
 *
 * Lives at the SITE ROOT, not under /api/indexnow/ — IndexNow's keyLocation
 * (Option 2) scopes validation to the key file's own path prefix ("a key
 * file at /catalog/key.txt can only validate URLs under /catalog/"). A key
 * file nested under /api/indexnow/ can never validate a URL outside that
 * path, which is every real page on this site. It has to be root-scoped to
 * cover /services/..., /blog/..., /pl/..., etc. Filename is still not the
 * credential — only the location moved.
 *
 * This path contains a dot, so it's already excluded from the i18n
 * middleware matcher (same mechanism that lets /favicon.ico bypass locale
 * rewriting) and reaches this route directly instead of the [lang] catch-all.
 */
export async function GET() {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    return new NextResponse("", { status: 500 });
  }
  return new NextResponse(key, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
