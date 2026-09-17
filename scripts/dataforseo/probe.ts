/**
 * Free requests: account balance, endpoint prices and available markets.
 * Run: npx tsx scripts/dataforseo/probe.ts
 */
import { call, today, totalSpent } from "./client";

type UserData = { money?: { balance?: number }; price?: Record<string, unknown> };
type LabsLocation = {
  location_code: number;
  location_name: string;
  available_languages: { language_name: string; language_code: string }[];
};
type AdsLocation = { location_code: number; location_name: string; location_type: string; country_iso_code: string };

const COUNTRIES = ["United Kingdom", "United States", "Poland", "Russia", "Belarus", "Kazakhstan", "Germany", "Ukraine"];

function pick(obj: unknown, keys: string[]): unknown {
  let cur = obj as Record<string, unknown> | undefined;
  for (const k of keys) cur = cur?.[k] as Record<string, unknown> | undefined;
  return cur;
}

async function main() {
  const user = await call<UserData>("/v3/appendix/user_data", { cache: `user_data-${today()}` });
  const u = user.tasks[0].result?.[0];
  console.log("balance USD:", u?.money?.balance);
  const price = u?.price ?? {};
  const wanted: [string, string[]][] = [
    ["labs keyword_suggestions", ["dataforseo_labs", "google", "keyword_suggestions"]],
    ["labs related_keywords", ["dataforseo_labs", "google", "related_keywords"]],
    ["labs keyword_ideas", ["dataforseo_labs", "google", "keyword_ideas"]],
    ["labs keyword_overview", ["dataforseo_labs", "google", "keyword_overview"]],
    ["labs bulk_keyword_difficulty", ["dataforseo_labs", "google", "bulk_keyword_difficulty"]],
    ["labs search_intent", ["dataforseo_labs", "google", "search_intent"]],
    ["ads search_volume", ["keywords_data", "google_ads", "search_volume"]],
    ["serp organic", ["serp", "google", "organic"]],
  ];
  for (const [label, keys] of wanted) console.log(label, JSON.stringify(pick(price, keys)));

  const labs = await call<LabsLocation>("/v3/dataforseo_labs/locations_and_languages", {
    cache: `labs_locations-${today()}`,
  });
  console.log("\nLabs locations:");
  for (const l of labs.tasks[0].result ?? []) {
    if (COUNTRIES.includes(l.location_name)) {
      console.log(` ${l.location_code} ${l.location_name}: ${l.available_languages.map((x) => x.language_code).join(", ")}`);
    }
  }
  const labsNames = new Set((labs.tasks[0].result ?? []).map((l) => l.location_name));
  console.log(" missing in Labs:", COUNTRIES.filter((c) => !labsNames.has(c)).join(", ") || "none");

  const ads = await call<AdsLocation>("/v3/keywords_data/google_ads/locations", { cache: `ads_locations-${today()}` });
  console.log("\nGoogle Ads countries:");
  const adsCountries = (ads.tasks[0].result ?? []).filter((l) => l.location_type === "Country");
  for (const c of COUNTRIES) {
    const hit = adsCountries.find((l) => l.location_name === c);
    console.log(` ${c}: ${hit ? hit.location_code : "NOT AVAILABLE"}`);
  }
  console.log("\nspent so far:", totalSpent());
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
