# Task 3 report: Sanity schemas, seed, switch to Sanity

Date: 2026-09-17. Dataset: `production`.

## What changed

**Schemas** (`src/sanity/schemaTypes`) were rewritten to match `src/content/types.ts`
one to one (field map: `docs/sanity-mapping.md`). The old per-entity documents
(`person`, `experience`, `tool`, `recommendation`, `pageSettings`, `contactForm`, …) were removed:

- `siteSettings` — interface strings, person, consulting formats, tools, recommendations, 404 and thank-you texts.
- Fixed pages: `homepage`, `aboutPage` (with diplomas), `listingPage` (services / case studies / blog / calculators, chosen by `key`), `contactPage`, `coursesPage`, `templatesPage`, `legalPage`.
- Collections: `service`, `caseStudy`, `post`, `category`, `calculatorPage`.
- Objects: `accentHeading`, `seo`, `metric`, `titledText`, `fact`, `faqItem`, `link`, `recommendation`, `careerStep`, `consultingFormat`, `toolItem`, `credential`, and nine article blocks (paragraph, heading, formula, code, chart, list, calculator, video, table).
- Slugs stay localised (`slug.<lang>.current`).
- Studio sidebar (`src/sanity/structure.ts`): every type opens as EN / PL / RU / all languages.

**Site.** `getContent(lang)` in `src/content/index.ts` is now async and reads Sanity first
(`src/sanity/loaders.ts`, one cached query per language through `client`).
If Sanity is unreachable or a language is missing, the fallback modules are used and a
`[content]` warning is logged; a single missing page falls back on its own.
`generateStaticParams`, metadata, sitemap, hreflang and the language switcher all take
slugs from the same source.

## Current data in Sanity

205 documents: per language 1 each of siteSettings, homepage, aboutPage, contactPage,
coursesPage, templatesPage, legalPage; 4 listingPage; 6 service; 6 caseStudy; 6 category;
5 calculatorPage; posts EN 19 / PL 18 / RU 17. Plus 49 `translation.metadata`, 10 image
assets (5 diplomas: preview + full scan). No drafts, no dangling translation links.

## Scripts (`scripts/sanity/`)

| Command | What it does |
|---|---|
| `npx tsx scripts/sanity/backup.ts` | exports the dataset to `backups/sanity-<date>.tar.gz` (run before every seed) |
| `npx tsx scripts/sanity/seed.ts --dry-run` | builds all documents, checks them against the schema, writes `backups/seed-dry-run.ndjson`, writes nothing to Sanity |
| `npx tsx scripts/sanity/seed.ts [--only=post,service]` | writes with `createOrReplace` (deterministic ids, reruns do not duplicate); images are reused by SHA-1 |
| `npx tsx scripts/sanity/compare.ts` | loads every language through the site loader and compares it with the fallback modules |
| `npx tsx scripts/sanity/webhook-check.ts [baseUrl]` | against a running dev server: changes a string, shows the page updates only after the webhook, restores it |
| `npx tsx scripts/sanity/validate-schema.ts` | compiles the Studio schema and prints every problem |
| `npx tsx scripts/sanity/urls.ts` | prints every public URL path in all languages |

**Warning:** seed overwrites documents with the content of `src/content/fallback`.
Once the owner edits texts in Studio, run it only with `--only=` for types that were not edited, and always after a backup.

## Checks done

- `compare.ts`: 0 differences in EN, PL, RU; all 5 diplomas served from the Sanity CDN.
- Webhook: 401 without the secret; the page keeps the cached text until the webhook is called, then shows the new one.
- Wrong `NEXT_PUBLIC_SANITY_DATASET`: every language falls back to the modules, no crash.
- `npx tsc --noEmit`: no errors.
- Dev server: all 153 sitemap URLs return 200; the sitemap has 583 hreflang links.

## What the owner fills in Studio

Everything with `placeholder: true` must be replaced before launch. In particular:

- **Portrait and process photo** — the design has placeholders (`portraitPlaceholder`, `processPhotoLabel`).
- **Recommendations** — `siteSettings.recommendations` and the `recommendation` field on services, listings and About: only real ones, with permission; delete stand-ins.
- **Case study figures** — `results`, `cardMetrics`, `facts` in every case study (currently stand-in numbers, marked with `ui.placeholderFigures`). Nothing traceable to the current employer.
- **Article bodies** marked placeholder (list in `research/copy-report.md`).
- **YouTube videos** — `articleVideo` blocks when videos exist.
- **Person** — LinkedIn URL, email, location.

## Publish webhook (owner, in the Sanity dashboard)

1. manage.sanity.io → project → **API → Webhooks → Create webhook**.
2. URL: `https://www.tatsianabandziuk.com/api/indexnow/webhook`
3. Dataset: `production`. Trigger on: **Create, Update, Delete**.
4. Filter: `!(_id in path("drafts.**"))`
5. Projection: `{_id, _type, language, slug}`
6. HTTP method: **POST**. HTTP header: `Authorization` = `Bearer <INDEXNOW_WEBHOOK_SECRET>`.
7. Save.

In Vercel (Project → Settings → Environment Variables) add `INDEXNOW_WEBHOOK_SECRET`
(same value as in the webhook) and `INDEXNOW_KEY`, plus the Sanity variables from `.env.local`.
Manual refresh at any time: `POST /api/indexnow/webhook` with the header and body `{"_id":"manual","_type":"manual"}`.
IndexNow submissions start only after `SITE_INDEXING=on`.
