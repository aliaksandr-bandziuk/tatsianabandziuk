/**
 * Manual check of the publish webhook against a running dev server:
 * changes one interface string in Sanity, shows the cached page still has the
 * old text, calls the webhook, shows the new text, then restores the string.
 *   npx tsx scripts/sanity/webhook-check.ts [baseUrl]
 */
import { writeClient } from "./env";

const BASE = process.argv[2] ?? "http://localhost:3012";
const DOC = "siteSettings.en";
const MARK = " · webhook test";

async function page() {
  const html = await (await fetch(`${BASE}/`)).text();
  return html.includes(MARK);
}

async function webhook() {
  const secret = process.env.INDEXNOW_WEBHOOK_SECRET;
  if (!secret) throw new Error("INDEXNOW_WEBHOOK_SECRET is not set in .env.local");
  const res = await fetch(`${BASE}/api/indexnow/webhook`, {
    method: "POST",
    headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
    body: JSON.stringify({ _id: DOC, _type: "siteSettings", language: "en" }),
  });
  return `${res.status} ${await res.text()}`;
}

async function main() {
  const unauthorized = await fetch(`${BASE}/api/indexnow/webhook`, { method: "POST", body: "{}" });
  console.log("without secret:", unauthorized.status);

  await page(); // warm the cache
  const { tagline } = await writeClient.fetch<{ tagline: string }>(`*[_id == $id][0]{ "tagline": ui.tagline }`, { id: DOC });
  await writeClient.patch(DOC).set({ "ui.tagline": tagline + MARK }).commit();
  try {
    console.log("changed in Sanity, page shows it before webhook:", await page());
    console.log("webhook:", await webhook());
    console.log("page shows it after webhook:", await page());
  } finally {
    await writeClient.patch(DOC).set({ "ui.tagline": tagline }).commit();
    console.log("restored; webhook:", (await webhook()).slice(0, 3), "page still shows test text:", await page());
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
