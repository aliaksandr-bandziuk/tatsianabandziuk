import NotFoundView from "@/app/components/site/NotFoundView";
import { getContent } from "@/content";
import { LOCALES } from "@/lib/site";

/**
 * 404 inside the locale segment, so it gets the header, footer and fonts.
 * Next passes no params here; the client view reads the language from the URL.
 */
export default function NotFound() {
  const byLang = Object.fromEntries(
    LOCALES.map((l) => {
      const c = getContent(l);
      return [l, { ...c.notFound, home: c.ui.breadcrumbHome }];
    }),
  );
  return <NotFoundView byLang={byLang} />;
}
