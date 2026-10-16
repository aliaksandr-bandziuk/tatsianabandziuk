/**
 * Every internal link on the deployed site, starting from the sitemap.
 *   npx tsx scripts/check-links.ts
 *   npx tsx scripts/check-links.ts --base=https://staging.example.com
 *   npx tsx scripts/check-links.ts --allow-redirects
 *
 * Fetches every page in sitemap.xml, collects every internal <a href> and checks
 * what each distinct target answers.
 *
 * - 4xx and 5xx are errors: a broken link.
 * - 3xx is an error too, unless --allow-redirects. An internal link should point
 *   at the final URL; on a domain where the crawl budget is the bottleneck, a
 *   redirect is a wasted fetch. This is the check that would have caught the
 *   language switch pointing at internal section segments (92 of 250 targets).
 * - A 200 target that is not in the sitemap is listed as a note, not a problem:
 *   thin blog categories are deliberately kept out of it.
 *
 * Run it a minute after a deploy. A CDN can still be serving the previous build,
 * and the check then reports links that are already fixed.
 */
const args = process.argv.slice(2);
const baseArg = args.find((a) => a.startsWith("--base="));
const BASE = (
  baseArg ? baseArg.slice("--base=".length) : "https://www.tatsianabandziuk.com"
).replace(/\/$/, "");
const ALLOW_REDIRECTS = args.includes("--allow-redirects");
const CONCURRENCY = 8;

const errors: string[] = [];
const warnings: string[] = [];
const notes: string[] = [];

/** Runs `work` over `items`, a few at a time, so the host is not hammered. */
async function pool<T>(
  items: T[],
  work: (item: T) => Promise<void>,
): Promise<void> {
  let i = 0;
  const runners = Array.from(
    { length: Math.min(CONCURRENCY, items.length) },
    async () => {
      while (i < items.length) {
        const item = items[i++];
        await work(item);
      }
    },
  );
  await Promise.all(runners);
}

const get = (url: string, redirect: RequestRedirect) =>
  fetch(url, {
    redirect,
    signal: AbortSignal.timeout(20000),
    headers: { "user-agent": "check-links (internal)" },
  });

/** Internal hrefs of one page, absolute, without the hash. */
function hrefsIn(html: string, pageUrl: string): string[] {
  const out: string[] = [];
  for (const m of html.matchAll(
    /<a\b[^>]*?\shref\s*=\s*(?:"([^"]*)"|'([^']*)')/gi,
  )) {
    const raw = (m[1] ?? m[2] ?? "").trim();
    if (!raw || /^(mailto:|tel:|javascript:|data:|#)/i.test(raw)) continue;
    let u: URL;
    try {
      u = new URL(raw, pageUrl);
    } catch {
      warnings.push(`unparseable href "${raw}" on ${pageUrl}`);
      continue;
    }
    if (u.origin !== new URL(BASE).origin) continue;
    u.hash = "";
    out.push(u.toString());
  }
  return out;
}

async function main() {
  const smRes = await get(`${BASE}/sitemap.xml`, "follow");
  if (!smRes.ok) {
    console.log(`ERROR sitemap.xml answered ${smRes.status}`);
    process.exit(1);
  }
  const sitemap = await smRes.text();
  const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!pages.length) {
    console.log("ERROR sitemap.xml has no <loc> entries");
    process.exit(1);
  }

  /** target URL → the pages that link to it */
  const linkedFrom = new Map<string, Set<string>>();
  await pool(pages, async (page) => {
    try {
      const r = await get(page, "follow");
      if (!r.ok) {
        errors.push(`${r.status} ${page} (page from the sitemap)`);
        return;
      }
      for (const href of hrefsIn(await r.text(), page)) {
        if (!linkedFrom.has(href)) linkedFrom.set(href, new Set());
        linkedFrom.get(href)!.add(page);
      }
    } catch (e) {
      errors.push(
        `fetch failed ${page}: ${e instanceof Error ? e.message : String(e)}`,
      );
    }
  });

  const targets = [...linkedFrom.keys()].sort();
  const sources = (u: string) => {
    const from = [...linkedFrom.get(u)!];
    return (
      from.slice(0, 2).join(", ") +
      (from.length > 2 ? ` (+${from.length - 2} more)` : "")
    );
  };

  let ok = 0;
  await pool(targets, async (url) => {
    try {
      const r = await get(url, "manual");
      if (r.status >= 300 && r.status < 400) {
        const to = r.headers.get("location") ?? "?";
        const line = `${r.status} ${url} → ${to}  ← linked from ${sources(url)}`;
        (ALLOW_REDIRECTS ? warnings : errors).push(line);
      } else if (r.status >= 400) {
        errors.push(`${r.status} ${url}  ← linked from ${sources(url)}`);
      } else {
        ok += 1;
        if (!pages.includes(url)) notes.push(`not in the sitemap: ${url}`);
      }
    } catch (e) {
      errors.push(
        `fetch failed ${url}: ${e instanceof Error ? e.message : String(e)}`,
      );
    }
  });

  for (const n of notes) console.log(`note  ${n}`);
  for (const w of warnings) console.log(`warn  ${w}`);
  for (const e of errors) console.log(`ERROR ${e}`);
  console.log(
    `\n${BASE}: ${pages.length} pages, ${targets.length} distinct internal targets, ${ok} answered 200`,
  );
  console.log(`${errors.length} errors, ${warnings.length} warnings`);
  process.exit(errors.length ? 1 : 0);
}

main();
