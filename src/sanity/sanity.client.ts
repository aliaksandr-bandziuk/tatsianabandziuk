// Straight from @sanity/client, not the next-sanity root: that entry pulls
// visual-editing and live-preview client components into the browser bundle
// (≈50 KB of unused JS on every page, PageSpeed 2026-09-18).
import { createClient, type QueryParams } from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET as string;
export const apiVersion = "2023-10-16";
// SANITY_API_WRITE_TOKEN is accepted as an alias (the name used in .env.local).
export const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

/**
 * Freshness comes from the Sanity webhook calling revalidateTag(SANITY_CACHE_TAG)
 * on every publish (`/api/indexnow/webhook`). This time-based expiry is only a
 * safety net for document types the webhook does not cover.
 *
 * It used to be 60 seconds. Combined with the token below, that made the
 * homepage, blog posts and the portfolio render on every single request, and
 * every other page re-render once a minute for any visitor or bot: over Vercel's
 * free ISR-write and CPU limits with almost no human traffic (2026-09-15).
 */
export const SANITY_REVALIDATE_SECONDS = 86400;
export const SANITY_CACHE_TAG = "sanity";

/**
 * The token is required, not optional: documents whose _id contains a dot
 * (every translation, e.g. `blog-foo.pl`) are private in Sanity and invisible
 * without it — about half the site.
 *
 * useCdn is off on purpose. Next's data cache already sits in front of every
 * query, so Sanity is only asked when a page regenerates; the API CDN would add
 * a few seconds of staleness right after a publish, exactly when the webhook
 * triggers regeneration, and freeze the old content for a day.
 */
// Created on first use, so a missing project id surfaces as a failed fetch
// (the content loader then falls back) instead of crashing every import.
let sanityClient: ReturnType<typeof createClient> | undefined;
function getClient() {
  sanityClient ??= createClient({ projectId, dataset, apiVersion, useCdn: false, token });
  return sanityClient;
}

type NextFetchOptions = { revalidate?: number | false; tags?: string[] };
type SanityFetchOptions = {
  cache?: RequestCache;
  next?: NextFetchOptions;
  [key: string]: unknown;
};

/**
 * Every query gets an explicit cache lifetime and the shared tag.
 *
 * Explicit matters: Next.js does not cache a fetch that carries an
 * Authorization header unless it is told to, and an uncached fetch turns the
 * whole route dynamic. Pass `{ cache: "no-store" }` for a query that must be
 * fresh (e.g. resolving URLs inside the webhook); it is left untouched.
 */
function withSanityCache(options: SanityFetchOptions = {}): SanityFetchOptions {
  if (options.cache === "no-store") return options;
  const next = options.next ?? {};
  return {
    ...options,
    next: {
      ...next,
      revalidate: SANITY_REVALIDATE_SECONDS,
      tags: Array.from(new Set([...(next.tags ?? []), SANITY_CACHE_TAG])),
    },
  };
}

export const client = {
  fetch<R = any>(query: string, params: QueryParams = {}, options: SanityFetchOptions = {}): Promise<R> {
    return getClient().fetch<R>(query, params, withSanityCache(options) as never);
  },
};

const builder = ImageUrlBuilder({ projectId, dataset });

export function urlFor(source: any) {
  return builder.image(source);
}

// Settings for Node.js scripts
export const sanityConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // scripts need fresh data
  token,
};
