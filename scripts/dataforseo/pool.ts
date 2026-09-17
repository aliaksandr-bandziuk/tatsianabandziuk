/**
 * Reads cached DataForSEO responses and merges them into one keyword pool per language.
 * No requests are made here.
 */
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { RAW_DIR } from "./client";
import type { Lang } from "./markets";

export type Row = {
  keyword: string;
  volume: number | null; // primary market
  volumeExtra: Record<string, number | null>; // us / pl-ru / de-ru
  cpc: number | null;
  competition: number | null; // 0..1
  kd: number | null;
  intent: string | null;
  sources: string[];
};

type LabsItem = {
  keyword: string;
  location_code?: number;
  keyword_info?: { search_volume: number | null; cpc: number | null; competition: number | null };
  keyword_properties?: { keyword_difficulty: number | null };
  search_intent_info?: { main_intent: string | null } | null;
};
type AdsItem = {
  keyword: string;
  location_code: number;
  language_code: string;
  search_volume: number | null;
  cpc: number | null;
  competition_index: number | null;
};

const EXTRA_TAG: Record<string, string> = { "2840": "us", "2616-ru": "pl-ru", "2276-ru": "de-ru", "2804-ru": "ua-ru" };

function load(file: string) {
  return JSON.parse(readFileSync(path.join(RAW_DIR, file), "utf8")) as {
    tasks: { status_code: number; data: Record<string, unknown>; result: unknown[] | null }[];
  };
}

export const norm = (k: string) => k.toLowerCase().replace(/\s+/g, " ").trim();

export function buildPool(lang: Lang, primaryCode: number): Map<string, Row> {
  const pool = new Map<string, Row>();
  const get = (keyword: string) => {
    const k = norm(keyword);
    let row = pool.get(k);
    if (!row) {
      row = { keyword: k, volume: null, volumeExtra: {}, cpc: null, competition: null, kd: null, intent: null, sources: [] };
      pool.set(k, row);
    }
    return row;
  };
  const addSource = (row: Row, s: string) => {
    if (!row.sources.includes(s)) row.sources.push(s);
  };

  const applyLabs = (it: LabsItem, source: string) => {
    const row = get(it.keyword);
    addSource(row, source);
    const vol = it.keyword_info?.search_volume ?? null;
    if (it.location_code && it.location_code !== primaryCode) {
      const t = EXTRA_TAG[String(it.location_code)];
      if (t) row.volumeExtra[t] = vol;
      return;
    }
    row.volume ??= vol;
    row.cpc ??= it.keyword_info?.cpc ?? null;
    row.competition ??= it.keyword_info?.competition ?? null;
    row.kd ??= it.keyword_properties?.keyword_difficulty ?? null;
    row.intent ??= it.search_intent_info?.main_intent ?? null;
  };

  const files = readdirSync(RAW_DIR).filter((f) => f.endsWith(".json"));
  for (const file of files) {
    const [endpoint, fileLang] = file.split("-");
    if (fileLang !== lang) continue;
    const json = load(file);
    for (const task of json.tasks ?? []) {
      if (task.status_code !== 20000 || !task.result) continue;
      if (endpoint === "keyword_ideas" || endpoint === "keyword_suggestions") {
        for (const r of task.result as { items?: LabsItem[] }[]) for (const it of r.items ?? []) applyLabs(it, endpoint);
      } else if (endpoint === "related_keywords") {
        for (const r of task.result as { items?: { keyword_data: LabsItem }[] }[])
          for (const it of r.items ?? []) applyLabs(it.keyword_data, endpoint);
      } else if (endpoint === "ads_keywords_for_keywords" || endpoint === "ads_search_volume") {
        for (const it of task.result as AdsItem[]) {
          const row = get(it.keyword);
          addSource(row, endpoint === "ads_search_volume" ? "ads_volume" : "ads_ideas");
          const extraKey = it.location_code === primaryCode ? null : EXTRA_TAG[String(it.location_code)] ?? EXTRA_TAG[`${it.location_code}-${it.language_code}`];
          if (extraKey) {
            row.volumeExtra[extraKey] = it.search_volume;
            continue;
          }
          // Google Ads volume for the primary market overrides Labs when present.
          if (endpoint === "ads_search_volume" && it.search_volume !== null) row.volume = it.search_volume;
          else row.volume ??= it.search_volume;
          row.cpc ??= it.cpc;
          row.competition ??= it.competition_index === null ? null : it.competition_index / 100;
        }
      } else if (endpoint === "bulk_keyword_difficulty") {
        for (const r of task.result as { items?: { keyword: string; keyword_difficulty: number | null }[] }[])
          for (const it of r.items ?? []) get(it.keyword).kd ??= it.keyword_difficulty;
      } else if (endpoint === "search_intent") {
        for (const r of task.result as { items?: { keyword: string; keyword_intent?: { label: string } }[] }[])
          for (const it of r.items ?? []) get(it.keyword).intent ??= it.keyword_intent?.label ?? null;
      }
    }
  }
  return pool;
}
