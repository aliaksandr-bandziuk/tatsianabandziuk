import NotFoundView from "@/app/components/site/NotFoundView";
import { getAllContent } from "@/content";
import { LOCALES } from "@/lib/site";

/**
 * 404 inside the locale segment, so it gets the header, footer and fonts.
 * Next passes no params here; the client view reads the language from the URL.
 */
export default async function NotFound() {
  const all = await getAllContent();
  const byLang = Object.fromEntries(
    LOCALES.map((l) => {
      const c = all[l];
      return [l, { ...c.notFound, home: c.ui.breadcrumbHome }];
    }),
  );
  return <NotFoundView byLang={byLang} />;
}
