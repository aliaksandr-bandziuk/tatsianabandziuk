/**
 * Exports the dataset to backups/sanity-<date>.tar.gz through the Sanity CLI.
 * The token from .env.local is passed as SANITY_AUTH_TOKEN; nothing is printed.
 *   npx tsx scripts/sanity/backup.ts
 */
import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dataset, token } from "./env";

mkdirSync("backups", { recursive: true });
const stamp = new Date().toISOString().replace(/[:T]/g, "-").slice(0, 16);
const file = `backups/sanity-${stamp}.tar.gz`;
const r = spawnSync("npx", ["sanity", "dataset", "export", dataset, file, "--overwrite"], {
  stdio: ["ignore", "ignore", "pipe"],
  shell: true,
  env: { ...process.env, SANITY_AUTH_TOKEN: token },
});
if (r.status !== 0) {
  console.error("export failed:", String(r.stderr).split(token).join("***").slice(0, 800));
  process.exit(1);
}
console.log("saved", file);
