# -*- coding: utf-8 -*-
"""Two fixes: the /en prefix leaking into switcher links, and dates without a day."""
import io, os, sys

R = os.environ["REPO"]
rd = lambda p: io.open(os.path.join(R, p), encoding="utf-8").read()
wr = lambda p, t: io.open(os.path.join(R, p), "w", encoding="utf-8", newline="").write(t)


def patch(path, old, new, label, marker):
    t = rd(path)
    if marker in t:
        print("skip:", label); return
    if t.count(old) != 1:
        print("FAIL (%d matches): %s" % (t.count(old), label)); sys.exit(1)
    wr(path, t.replace(old, new)); print("ok:", label)


H = "src/app/components/site/HeaderClient.tsx"

# 1. next-intl rewrites an English URL to /en/... internally and usePathname returns
#    that rewritten path, so "en" has to come off too. Without it the language switch
#    built /pl/en/blog/... and the active nav item never matched on English pages.
patch(H,
      '''/** Path without the locale prefix: "/pl/services" → "/services". */
function stripLocale(pathname: string): string {
  const m = pathname.match(/^\\/(pl|ru)(?=\\/|$)/);
  const rest = m ? pathname.slice(m[0].length) : pathname;
  return rest || "/";
}''',
      '''/**
 * Path without the locale prefix: "/pl/services" → "/services".
 *
 * `en` is in the list even though English URLs carry no prefix in public: the
 * i18n middleware rewrites them to `/en/...` internally and `usePathname`
 * returns the rewritten path, so without stripping it the language switch
 * builds `/pl/en/...` and nothing that compares paths matches.
 */
function stripLocale(pathname: string): string {
  const m = pathname.match(/^\\/(en|pl|ru)(?=\\/|$)/);
  const rest = m ? pathname.slice(m[0].length) : pathname;
  return rest || "/";
}

/** The public path of the current page, whatever the router reports internally. */
function usePublicPath(lang: string): string {
  return withPrefix(lang, stripLocale(usePathname() ?? "/"));
}''',
      "stripLocale knows en", "const m = pathname.match(/^\\/(en|pl|ru)")

# 2. Everything that compares or rebuilds the current path uses the public form.
t = rd(H)
n = t.count('const pathname = usePathname() ?? "/";')
if n == 0:
    print("skip: pathname call sites")
else:
    if n != 4:
        print("FAIL: expected 4 pathname call sites, found %d" % n); sys.exit(1)
    wr(H, t.replace('const pathname = usePathname() ?? "/";', "const pathname = usePublicPath(lang);"))
    print("ok: %d pathname call sites use the public path" % n)

# 3. A month and a year is not a date. The article page asks for the long form.
patch("src/content/index.ts",
      '''  return new Intl.DateTimeFormat(locale, { month: style === "short" ? "short" : "long", year: "numeric" }).format(new Date(iso));''',
      '''  const opts: Intl.DateTimeFormatOptions =
    style === "long" ? { day: "numeric", month: "long", year: "numeric" } : { day: "numeric", month: "short", year: "numeric" };
  return new Intl.DateTimeFormat(locale, opts).format(new Date(iso));''',
      "dateLabel shows the day", "Intl.DateTimeFormatOptions")
print("done")
