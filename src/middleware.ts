import { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { defaultLocale, locales } from "@/i18n.config";

export default async function middleware(request: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({
    locales,
    defaultLocale,
    localePrefix: "as-needed",
    localeDetection: false,
    alternateLinks: false,
  });

  return handleI18nRouting(request);
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, and any static file (path segment
  // with a dot, e.g. /images/photo.jpg) — without the dot exclusion, static
  // assets under /public get rewritten with a locale prefix and 404, since
  // no page route exists at that path. Standard next-intl recommendation.
  matcher: [
    "/((?!api|_next/static|admin|structure|robots|sitemap|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
