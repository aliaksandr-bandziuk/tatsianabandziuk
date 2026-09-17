import { SITE_URL } from "@/lib/site";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const HOST = new URL(SITE_URL).host;
const KEY_LOCATION = `${SITE_URL}/indexnow-key.txt`;

// Up to 10,000 URLs are allowed in a single IndexNow submission.
const MAX_URLS_PER_BATCH = 10000;

const STATUS_MEANING: Record<number, string> = {
  200: "OK — URL(s) submitted",
  202: "Accepted — key validation pending",
  400: "Bad request — invalid format",
  403: "Forbidden — key not valid or not found",
  422: "Unprocessable — URLs don't belong to host, or key mismatch",
  429: "Too many requests",
};

export type IndexNowBatchResult = { status: number; urlCount: number };

/**
 * POST one deduplicated batch (<=10,000 URLs) to IndexNow and log the
 * documented response code. Never logs the key or the request body — only
 * the status and how many URLs were sent, so a rejected submission is
 * visible in logs instead of failing silently for months.
 */
async function postBatch(urls: string[]): Promise<IndexNowBatchResult> {
  const key = process.env.INDEXNOW_KEY;
  if (!key) throw new Error("INDEXNOW_KEY is not set");

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key, keyLocation: KEY_LOCATION, urlList: urls }),
  });

  const label = STATUS_MEANING[res.status] ?? "Unrecognized status";
  console.log(`[indexnow] submitted ${urls.length} URL(s) — HTTP ${res.status} (${label})`);

  return { status: res.status, urlCount: urls.length };
}

/**
 * Dedupe and submit. Splits into <=10,000-URL batches only if the input
 * ever exceeds the single-request limit — at current site size this is
 * always exactly one request.
 */
export async function submitToIndexNow(
  urls: string[],
): Promise<IndexNowBatchResult[]> {
  const unique = Array.from(new Set(urls));
  if (unique.length === 0) return [];

  const results: IndexNowBatchResult[] = [];
  for (let i = 0; i < unique.length; i += MAX_URLS_PER_BATCH) {
    const batch = unique.slice(i, i + MAX_URLS_PER_BATCH);
    results.push(await postBatch(batch));
  }
  return results;
}
