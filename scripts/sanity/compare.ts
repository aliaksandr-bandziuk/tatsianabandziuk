/**
 * Round-trip check: loads every language through the Sanity loader and
 * compares it with the fallback modules. After a fresh seed there must be no
 * differences (updatedAt is ignored; an empty list equals a missing one).
 *   npx tsx scripts/sanity/compare.ts
 */
import { config } from "dotenv";

config({ path: ".env.local", quiet: true });

type Json = Record<string, unknown>;

const empty = (v: unknown) => v === undefined || (Array.isArray(v) && v.length === 0);

function diff(a: unknown, b: unknown, path: string, out: string[]) {
  if (out.length > 80) return;
  if (empty(a) && empty(b)) return;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) out.push(`${path}: length ${a.length} ≠ ${b.length}`);
    for (let i = 0; i < Math.min(a.length, b.length); i++) diff(a[i], b[i], `${path}[${i}]`, out);
    return;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    const keys = new Set([...Object.keys(a as Json), ...Object.keys(b as Json)]);
    keys.forEach((k) => {
      if (k === "updatedAt") return;
      diff((a as Json)[k], (b as Json)[k], `${path}.${k}`, out);
    });
    return;
  }
  if (a !== b) out.push(`${path}: ${JSON.stringify(a)?.slice(0, 80)} ≠ ${JSON.stringify(b)?.slice(0, 80)}`);
}

async function main() {
  const { loadSiteContent } = await import("../../src/sanity/loaders");
  const { FALLBACK, LOCALES } = await import("../../src/content");
  let total = 0;
  for (const lang of LOCALES) {
    const result = await loadSiteContent(lang, FALLBACK[lang]);
    if (!result) {
      console.log(`${lang}: not in Sanity`);
      total++;
      continue;
    }
    const out: string[] = [];
    diff(FALLBACK[lang], result.content, lang, out);
    // Credentials: Sanity serves the images from its CDN, so only the rest must match.
    const rest = out.filter((d) => !/credentials\.items\[\d+\]\.(thumb|image|width|height)/.test(d));
    const images = result.content.about.credentials.items.filter((i) => i.image.startsWith("https://cdn.sanity.io/") && i.width > 0).length;
    console.log(`${lang}: ${rest.length} difference(s); missing pieces: ${result.missing.join(", ") || "none"}; CDN images ${images}/${result.content.about.credentials.items.length}`);
    rest.slice(0, 40).forEach((d) => console.log("  " + d));
    total += rest.length + result.missing.length;
  }
  process.exit(total ? 1 : 0);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
