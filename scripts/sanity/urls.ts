/**
 * Prints every public URL path (all languages) from the content loader, one per line.
 *   npx tsx scripts/sanity/urls.ts > urls.txt
 */
import { config } from "dotenv";

config({ path: ".env.local", quiet: true });

async function main() {
  const { STATIC_PATHS, localizeHref, routableGroups, LOCALES } = await import("../../src/content");
  const urls = new Set<string>();
  for (const l of LOCALES) for (const p of STATIC_PATHS) urls.add(localizeHref(l, p || "/"));
  for (const g of await routableGroups()) {
    for (const [l, p] of Object.entries(g.paths)) if (p) urls.add(localizeHref(l, p));
  }
  urls.add("/sitemap.xml");
  console.log(Array.from(urls).join("\n"));
}

main();
