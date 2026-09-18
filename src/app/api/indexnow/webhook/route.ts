import { timingSafeEqual } from "crypto";
import { INDEXING_ALLOWED } from "@/lib/site";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { SANITY_CACHE_TAG } from "@/sanity/sanity.client";
import {
  resolveDocumentUrls,
  type IndexNowWebhookPayload,
} from "@/lib/indexnow/resolveUrls";
import { submitToIndexNow } from "@/lib/indexnow/submit";

const TRACKED_TYPES = new Set(["service", "caseStudy", "post", "category", "calculatorPage"]);

/**
 * Shared-secret check for an incoming Sanity webhook. This is the first
 * authenticated route in the codebase — written so the header + env-var pattern is reusable by future
 * webhooks, not IndexNow-specific.
 */
function isAuthorized(request: NextRequest): boolean {
  const expected = process.env.INDEXNOW_WEBHOOK_SECRET;
  if (!expected) return false;

  const provided = request.headers.get("authorization") ?? "";
  const expectedHeader = `Bearer ${expected}`;

  const a = Buffer.from(provided);
  const b = Buffer.from(expectedHeader);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: IndexNowWebhookPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // The Sanity webhook is configured with filter !(_id in path("drafts.**"))
  // so autosaves never reach this route — this is a defense-in-depth repeat
  // of that same check, in case the dashboard filter is ever changed.
  if (!payload?._id || payload._id.startsWith("drafts.")) {
    return NextResponse.json(
      { error: "Draft or missing document id" },
      { status: 400 },
    );
  }

  // Refresh the site before anything else, for every document type: pages are
  // cached for a day and this is how a publish reaches them immediately. It
  // also runs first so the URL resolution below reads fresh data. A manual
  // refresh is a POST with the secret and body {"_id":"manual","_type":"manual"}.
  // Next 16: `{ expire: 0 }` expires the cached pages at once (the "max"
  // profile would serve the old version once more while refreshing).
  revalidateTag(SANITY_CACHE_TAG, { expire: 0 });

  // No IndexNow pings while the site is closed to search engines.
  if (!INDEXING_ALLOWED) {
    return NextResponse.json({ revalidated: true, skipped: true, reason: "indexing disabled (SITE_INDEXING)" });
  }

  if (!TRACKED_TYPES.has(payload._type)) {
    return NextResponse.json({ revalidated: true, skipped: true, reason: "type not tracked" });
  }

  const urls = await resolveDocumentUrls(payload);
  if (urls.length === 0) {
    console.log(
      `[indexnow] ${payload._id}: no reachable URL resolved, nothing submitted`,
    );
    return NextResponse.json({ revalidated: true, skipped: true, reason: "no resolvable URL" });
  }

  const results = await submitToIndexNow(urls);
  return NextResponse.json({ revalidated: true, submittedUrls: urls, results });
}
