/** Sanity credentials for Node scripts, from .env.local. Values are never printed. */
import { config } from "dotenv";
import path from "node:path";
import { createClient } from "@sanity/client";

config({ path: path.resolve(process.cwd(), ".env.local"), quiet: true });

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "";
export const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_WRITE_TOKEN || "";
if (!projectId || !dataset || !token) throw new Error("Sanity project id, dataset or token missing in .env.local");

export const apiVersion = "2023-10-16";
export const writeClient = createClient({ projectId, dataset, token, apiVersion, useCdn: false });
