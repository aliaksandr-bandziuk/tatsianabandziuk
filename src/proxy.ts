import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { defaultLocale, locales } from "@/i18n.config";
import { intlPathnames } from "@/lib/routing";

const pathnames = intlPathnames();

export default async function proxy(request: NextRequest) {
  const handleI18nRouting = createIntlMiddleware({
    locales,
    defaultLocale,
    localePrefix: "as-needed",
    localeDetection: false,
    alternateLinks: false,
    // Localised section segments: /pl/uslugi → app/[lang]/services; /pl/services → redirect to /pl/uslugi.
    pathnames,
  });

  const response = handleI18nRouting(request);
  // next-intl redirects with 307; these URL moves are permanent.
  const location = response.headers.get("location");
  if (response.status === 307 && location) {
    return NextResponse.redirect(location, 308);
  }
  return response;
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
