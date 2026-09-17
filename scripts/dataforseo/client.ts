/**
 * Shared DataForSEO client for the keyword research scripts.
 *
 * - Basic Auth from .env.local (DATAFORSEO_API_LOGIN / DATAFORSEO_API_PASSWORD).
 *   Credentials are never printed or written anywhere.
 * - Every response is cached in research/keywords/raw/<name>.json; a cached
 *   response is returned without a new (paid) request.
 * - The `cost` of every paid response is appended to research/keywords/cost-log.csv.
 * - 429 and 5xx responses are retried with exponential backoff.
 */
import { config } from "dotenv";
import { existsSync, mkdirSync, readFileSync, writeFileSync, appendFileSync } from "node:fs";
import path from "node:path";

config({ path: path.resolve(process.cwd(), ".env.local"), quiet: true });

export const ROOT = process.cwd();
export const RESEARCH_DIR = path.join(ROOT, "research", "keywords");
export const RAW_DIR = path.join(RESEARCH_DIR, "raw");
const COST_LOG = path.join(RESEARCH_DIR, "cost-log.csv");
const API = "https://api.dataforseo.com";

/** Hard stop for the whole task (USD). */
export const BUDGET_USD = 10;

export type DfsTask<T = unknown> = {
  id: string;
  status_code: number;
  status_message: string;
  cost: number;
  result_count: number;
  data: Record<string, unknown>;
  result: T[] | null;
};

export type DfsResponse<T = unknown> = {
  status_code: number;
  status_message: string;
  cost: number;
  tasks_count: number;
  tasks_error: number;
  tasks: DfsTask<T>[];
};

function authHeader(): string {
  const login = process.env.DATAFORSEO_API_LOGIN;
  const password = process.env.DATAFORSEO_API_PASSWORD;
  if (!login || !password) {
    throw new Error("DATAFORSEO_API_LOGIN / DATAFORSEO_API_PASSWORD are missing in .env.local");
  }
  return "Basic " + Buffer.from(`${login}:${password}`).toString("base64");
}

function ensureDirs() {
  mkdirSync(RAW_DIR, { recursive: true });
  if (!existsSync(COST_LOG)) {
    writeFileSync(COST_LOG, "timestamp,endpoint,cache_name,tasks,cost_usd\n");
  }
}

export function totalSpent(): number {
  if (!existsSync(COST_LOG)) return 0;
  return readFileSync(COST_LOG, "utf8")
    .trim()
    .split("\n")
    .slice(1)
    .reduce((sum, line) => sum + (Number(line.split(",").at(-1)) || 0), 0);
}

export function rawPath(name: string): string {
  return path.join(RAW_DIR, `${name}.json`);
}

export function readCache<T>(name: string): DfsResponse<T> | null {
  const file = rawPath(name);
  return existsSync(file) ? (JSON.parse(readFileSync(file, "utf8")) as DfsResponse<T>) : null;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type CallOptions = {
  method?: "GET" | "POST";
  body?: unknown;
  /** Cache file name without extension, e.g. `keyword_suggestions-en-2026-09-17`. */
  cache: string;
  /** Rough expected cost, checked against the remaining budget before the call. */
  estimate?: number;
};

export async function call<T = unknown>(endpoint: string, opts: CallOptions): Promise<DfsResponse<T>> {
  ensureDirs();
  const cached = readCache<T>(opts.cache);
  if (cached) return cached;

  const spent = totalSpent();
  if (spent + (opts.estimate ?? 0) > BUDGET_USD) {
    throw new Error(`Budget guard: spent ${spent.toFixed(4)} + estimate ${opts.estimate} > ${BUDGET_USD} USD`);
  }

  const method = opts.method ?? (opts.body ? "POST" : "GET");
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(API + endpoint, {
      method,
      headers: { Authorization: authHeader(), "Content-Type": "application/json" },
      body: opts.body ? JSON.stringify(opts.body) : undefined,
    });
    if ((res.status === 429 || res.status >= 500) && attempt < 4) {
      await sleep(2000 * 2 ** attempt);
      continue;
    }
    const json = (await res.json()) as DfsResponse<T>;
    if (!res.ok || json.status_code >= 40000) {
      throw new Error(`${endpoint}: HTTP ${res.status}, ${json.status_code} ${json.status_message}`);
    }
    // Retry whole call when every task failed with a transient server error.
    const transient = json.tasks?.every((t) => t.status_code >= 50000);
    if (transient && attempt < 4) {
      await sleep(2000 * 2 ** attempt);
      continue;
    }
    writeFileSync(rawPath(opts.cache), JSON.stringify(json, null, 1));
    appendFileSync(
      COST_LOG,
      `${new Date().toISOString()},${endpoint},${opts.cache},${json.tasks_count ?? 0},${json.cost ?? 0}\n`,
    );
    const failed = json.tasks?.filter((t) => t.status_code !== 20000) ?? [];
    for (const t of failed) console.warn(`  task error ${t.status_code}: ${t.status_message}`);
    return json;
  }
}

export const today = () => new Date().toISOString().slice(0, 10);

export function readLines(file: string): string[] {
  return readFileSync(file, "utf8")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));
}

export function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

export function csvCell(value: unknown): string {
  const s = value === null || value === undefined ? "" : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
