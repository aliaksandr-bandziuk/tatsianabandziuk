import { groq } from "next-sanity";
import { client } from "./sanity.client";

/**
 * All GROQ queries live here. Always call Sanity through `client` from
 * sanity.client.ts (cache lifetime + publish tag), never a raw createClient.
 */

/** Shape the i18n plugin produces. Do not simplify. */
const TRANSLATIONS = groq`"_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{ language, slug }`;

export type SlugTranslation = {
  language?: string;
  slug?: Record<string, { current?: string | null } | null> | null;
};

export async function getSiteSettings(lang: string) {
  return client.fetch(groq`*[_type == "siteSettings" && language == $lang][0]`, { lang });
}

export async function getHomepage(lang: string) {
  return client.fetch(groq`*[_type == "homepage" && language == $lang][0]{ ..., ${TRANSLATIONS} }`, { lang });
}

export async function getPerson(lang: string) {
  return client.fetch(groq`*[_type == "person" && language == $lang][0]`, { lang });
}

/** Slugs of every routable document, for generateStaticParams and the sitemap. */
export async function getSlugs(type: "service" | "caseStudy" | "post" | "category" | "legalPage", lang: string) {
  return client.fetch<{ slug: string; updatedAt?: string }[]>(
    groq`*[_type == $type && language == $lang && defined(slug[$lang].current)]{
      "slug": slug[$lang].current,
      "updatedAt": coalesce(updatedAt, _updatedAt)
    }`,
    { type, lang },
  );
}

/**
 * Every language version of every routable document, with its slug per
 * language — the sitemap builds hreflang alternates from this.
 */
export async function getRoutableDocuments() {
  return client.fetch<
    {
      _id: string;
      _type: string;
      language: string;
      slug: string;
      updatedAt: string;
      _translations: SlugTranslation[];
    }[]
  >(
    groq`*[_type in ["service", "caseStudy", "post", "category", "legalPage"] && defined(language) && defined(slug[language].current)]{
      _id, _type, language,
      "slug": slug[language].current,
      "updatedAt": coalesce(updatedAt, _updatedAt),
      ${TRANSLATIONS}
    }`,
  );
}
