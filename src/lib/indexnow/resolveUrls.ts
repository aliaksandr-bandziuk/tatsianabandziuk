import { groq } from "next-sanity";
import { client } from "@/sanity/sanity.client";
import { BASE_URL, localePrefix, findAltSlug } from "@/utils/hreflang";
import { LOCALES, ROUTES, isLocale } from "@/lib/site";
import { localizePath } from "@/lib/routing";

export type IndexNowDocType = "service" | "caseStudy" | "post" | "category" | "calculatorPage";

export type IndexNowWebhookPayload = {
  _id: string;
  _type: string;
  language: string;
};

const SEGMENT: Record<IndexNowDocType, string> = {
  service: ROUTES.service,
  caseStudy: ROUTES.caseStudy,
  post: ROUTES.post,
  category: ROUTES.category,
  calculatorPage: ROUTES.calculator,
};

type TranslationsResult = {
  slug: string | null;
  _translations: Array<{ slug?: Record<string, { current?: string | null } | null> | null }>;
};

/** Every locale URL that currently exists for one published document. */
export async function resolveDocumentUrls(payload: IndexNowWebhookPayload): Promise<string[]> {
  const { _id, _type, language } = payload;
  if (!isLocale(language) || !(_type in SEGMENT)) return [];
  const segment = SEGMENT[_type as IndexNowDocType];

  const result = await client.fetch<TranslationsResult | null>(
    groq`*[_id == $id][0]{
      "slug": slug[$language].current,
      "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{ slug }
    }`,
    { id: _id, language },
    // Runs inside the publish webhook: must see the document just published.
    { cache: "no-store" },
  );
  if (!result?.slug) return [];

  const urls = new Set<string>();
  for (const locale of LOCALES) {
    const localeSlug = locale === language ? result.slug : findAltSlug(result._translations ?? [], locale);
    if (localeSlug) urls.add(`${BASE_URL}${localePrefix(locale)}${localizePath(locale, `/${segment}/${localeSlug}`)}`);
  }
  return Array.from(urls);
}
