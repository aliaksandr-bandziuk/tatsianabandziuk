# tatsianabandziuk.com — project notes

Personal consulting site for Tatsiana Bandziuk (retail and fashion analytics).
Infrastructure was taken from the sibling project `../bandziuk` on 2026-09-16;
its CLAUDE.md explains the reasoning behind most of the rules below.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 App Router (Turbopack), React 19, TypeScript strict, Node 24 (`engines`) |
| CMS | Sanity 6 + next-sanity 13 (Studio only), Studio at `/admin`; the site reads through `@sanity/client` 8 + `groq` |
| i18n | next-intl 4 in `src/proxy.ts` (Next 16 name for middleware): EN without prefix (default), `/pl`, `/ru`; `@sanity/document-internationalization` 6 (one document per language) |
| Styling | SCSS modules + CSS custom properties in `src/app/globals.css` (tokens from the approved design) |
| Fonts | Playfair Display (headings), Inter Tight (body), IBM Plex Mono (labels, numbers), Caveat (handwritten notes) — all with Cyrillic |
| Animation | Framer Motion, always with a `prefers-reduced-motion` fallback |
| Hosting | Vercel (project not created yet) |

Design reference: `design/Tatsiana_Bandziuk_Site_v4.html` (Claude Design export, open in a browser).
Brief and positioning: `brief.md`.

## Content rules (owner's instructions)

- **Discretion.** Never name her current employer anywhere: copy, schema (`worksFor` is deliberately absent), case studies, image metadata. Nothing traceable to it either (market counts, internal project names, SKU counts). No "open to work" signals, no CV download button.
- **Russian spelling of her name is «Татьяна Бандюк».**
- **Headings.** Every H1/H2/H3 must be understandable on its own and carry the key term of its section. No newspaper-style or vague headings ("Results", "What's next").
- **Placeholders.** The site is prepared as a surprise, so content is partly stand-in. Every such document has `placeholder: true`; all of them must be replaced before launch.
- **Recommendations** are only real ones, quoted with permission. Never invent names.
- Copy is written per language from keyword research (DataForSEO), not translated.

## Engineering rules (inherited from bandziuk)

- **Local builds are allowed since the Next 16 migration (owner, 2026-09-18).** Checks: `npx tsc --noEmit`, `npm run lint` (ESLint 9 flat config `eslint.config.mjs`; `next lint` no longer exists), `npx next build`. A local build overwrites `.next`, so stop any dev server first. Kill any server you start.
- **Next 16 specifics:** `params` in pages, layouts and `generateMetadata` is a Promise (`await props.params`); `revalidateTag(tag, { expire: 0 })` in the webhook (the `"max"` profile would serve stale pages once more); `NextRequest.ip` is gone (form guard reads `x-forwarded-for`); `inert` is a boolean prop in React 19.
- **Polyfills:** `turbopack.resolveAlias` in `next.config.mjs` swaps Next's `polyfill-module` for `src/lib/empty-polyfills.js`; every browser Next 16 supports has those features. Check after a Next upgrade that the alias still matches (`"trimStart"in String.prototype` must not appear in `.next/static/chunks`).
- **Git:** do not commit or push unless the owner asks in the session. Inspect with `git --no-optional-locks`. Never run mutating git commands from a shell that cannot delete files (stale `index.lock`).
- **Sanity access only through `client` from `src/sanity/sanity.client.ts`** (adds `revalidate: 86400` + tag `sanity`). A raw `createClient` fetch with the token makes the route dynamic.
- **Every page under `[lang]` exports `generateStaticParams`**, otherwise it is rendered on every request.
- `useCdn: false` stays. The token (`SANITY_API_TOKEN`) is required: translated documents are private.
- **JSON-LD uses a plain `<script type="application/ld+json" suppressHydrationWarning>`**, never `next/script` (AI fetchers do not run JS).
- **Images go through Sanity's CDN** (`src/lib/images/sanityLoader.ts`), not `/_next/image`. Do not add `unoptimized`; `fill` images need `sizes`.
- **Publish webhook:** manage.sanity.io → Webhooks → `POST {SITE_URL}/api/indexnow/webhook`, header `Authorization: Bearer <INDEXNOW_WEBHOOK_SECRET>`, filter `!(_id in path("drafts.**"))`. It calls `revalidateTag("sanity")` for every type and submits `service`, `caseStudy`, `post` URLs to IndexNow.
- `/admin` is excluded from the i18n middleware. Keep it that way.
- Analytics load on every page regardless of the cookie banner choice, as on bandziuk (owner decision 2026-09-18): Google Analytics `G-2RJCDFRSJH` is hard-coded in `GoogleAnalyticsWrapper`; Clarity `yk8avkfbei` is hard-coded in `MicrosoftClarity`. The banner and the privacy policy texts still say analytics cookies are set only with consent (same as bandziuk).
- **Indexing is open on production since 2026-09-18**: `INDEXING_ALLOWED` (`src/lib/site.ts`, repeated in `next.config.mjs` for the header) is true on the Vercel production deployment (`VERCEL_ENV=production`) unless `SITE_INDEXING=off`; previews and local runs stay closed (robots.txt `Disallow: /`, noindex meta, `X-Robots-Tag`, no IndexNow). `SITE_INDEXING=on` opens any environment. When open, `robots.ts` blocks SEO-tool crawlers; search engines and AI crawlers stay allowed.
- **Sitemap lastmod**: every URL has one. Items use their `_updatedAt`; fixed pages use their own document's `_updatedAt` (`updatedAt` on the page models, projected in `loaders.ts`), and home and listing pages take the newest of that and the items they list (`staticLastmod` in `api/sitemap/route.ts`).

## Content model (`src/sanity/schemaTypes`)

Schemas mirror the view models in `src/content/types.ts` one to one; field map in `docs/sanity-mapping.md`.
Translated documents (one per language, id `<base>.<lang>`, `TRANSLATED_TYPES`): `siteSettings` (ui strings, person, formats, tools, recommendations, 404, thank-you), `homepage`, `aboutPage` (with `credentials`), `listingPage` (`key`: services / caseStudies / blog / calculators), `contactPage`, `coursesPage`, `templatesPage`, `legalPage` (`key`: privacy), and collections `service`, `caseStudy`, `post`, `category`, `calculatorPage` (with `key`, localised `slug`, `order`).
Objects: `localizedSlug` (`slug.<lang>.current`), `accentHeading`, `seo`, `metric`, `titledText`, `fact`, `faqItem`, `link`, `recommendation`, `careerStep`, `consultingFormat`, `toolItem`, `credential`, article blocks `article*` (map to `ArticleBlock` via `src/sanity/articleBlocks.ts`).

## Routes

`/`, `/services`, `/services/[slug]`, `/case-studies`, `/case-studies/[slug]`, `/blog`, `/blog/[slug]`, `/blog/category/[slug]`, `/about`, `/contact`, `/courses`, `/free-templates`, `/tools`, `/tools/[slug]` (calculators), `/[legal slug]`, plus PL/RU versions.

**Section segments are localised for PL/RU:**
- Examples: `/pl/uslugi`, `/pl/case-study`, `/pl/blog/kategoria`, `/pl/o-mnie`, `/pl/kontakt`, `/pl/kursy`, `/pl/darmowe-szablony`, `/pl/kalkulatory`; `/ru/uslugi`, `/ru/kejsy`, `/ru/blog/rubrika`, `/ru/obo-mne`, `/ru/kontakty`, `/ru/kursy`, `/ru/besplatnye-shablony`, `/ru/kalkulyatory`.
- The map lives in `src/lib/routing.ts`. The middleware (next-intl `pathnames`) rewrites these to the English page folders and redirects English segments under `/pl`/`/ru` with 308.
- Always build links with `localizeHref(lang, "<internal path>")` or the `*Href` helpers, never by hand.

Sitemap at `/sitemap.xml` (→ `/api/sitemap`) with hreflang.

## Status

- 2026-09-16: infrastructure and schemas in place, temporary home page. Next: components and pages from the design, contact form adapted to the new fields (company, task, timeline, language), content seed with placeholders.
- 2026-09-16 (later): full layout from the design is done for every route (home, services + 6 details, case studies + 6 details, blog + category + 8 posts, about, contact, courses, free templates, privacy policy per language, 404). Content comes from typed fallback modules in `src/content/fallback/{en,pl,ru}` (placeholder / Lorem text); Sanity loaders will return the same view models (`src/content/types.ts`). Next: seed Sanity, switch `getContent` to Sanity-first, then keyword research (DataForSEO) and final copy.
- Layout building blocks: `src/app/components/site/*` (Blocks, Charts, Forms, Article, BlogList, Header, Footer, Reveal), page layouts in `src/app/[lang]/pages.module.scss`.
- 404: `[lang]/[...rest]` catches unknown URLs so the 404 renders inside the site layout. Do not add `dynamicParams = false` to `[lang]` routes — it sends unknown slugs to the bare framework 404.
- Interaction patterns mirror bandziuk: language dropdown (list stays in the server HTML), numbers count up from zero (`CountUp`), smooth FAQ accordion (`FaqAccordion`, answers stay in HTML), every "Book a consultation" control is `ConsultationButton` — a real link to `/contact#enquiry` that opens the popup form (`ConsultationModalProvider` in `[lang]/layout.tsx`). The site is light only; dark tokens exist behind `data-theme="dark"` and are not used.
- Footer credit: "bandziuk" (lowercase, the owner's brand) linking to https://www.bandziuk.com (followed link, no nofollow).
- Contact form asks for the preferred channel (email / WhatsApp / phone call, default email); phone is required for WhatsApp and phone call, validated on the client and in `lib/formGuard/server.ts`. Pattern taken from giuseppeiannone.
- Smooth scroll: `SmoothScroll` (Lenis, off on touch and reduced motion); scrollable overlays need `data-lenis-prevent`. Page transition loader: `PageLoader` (signature in the hand font fills from tint to emerald; shown only if navigation takes > 300 ms). Both mirror giuseppeiannone.
- Fonts: Marck Script is the signature font (`.signature`, `--font-signature`, also the page loader); Caveat stays for handwritten notes (`.hand`).
- Form fields are spreadsheet cells (`Cell` in `Forms.tsx`): gapless `.sheet` grid, cell address instead of icons (A1…; A1–A7 when the sheet collapses to one column via a container query), ƒx turns into a drawn "=" on focus/filled, errors replace the label inside the cell. The contact channel is cell B3, the task cell A4 is last; the enquiry language is the page language (hidden field).
- Excel / Power BI interactions: `CaseSlicer` (Power BI slicer with cross-highlighting on /case-studies; cards are dimmed, never removed), `CellFrame` + `.xcell` (Excel selection frame on service and case cards), `DataSheet` (spreadsheet table with colour scale, data bars, trend icons and drag-to-select; used on /free-templates and as the `table` article block), KPI bars in `MetricsBand`, `StatusBar` (site-wide, appears on text or cell selection: words/characters or average/count/sum).
- Education (from the diplomas): BSEU, Logistics, logistician-economist (2014); BSEU master's, Logistics, Master of Economics and Management (2015); EU Tempus Be-Safe certificate with Sapienza CTL (2014–2015); Loughborough University Knowledge Transfer certificate (2016, confirmed by the owner); BNTU Young Researchers Seminar 2016, best paper 2nd place. Not marketing.
- Owner decisions of 2026-09-18: career timeline OMA 2014–2017, Fashion House 2017–2018, Luxvisage 2018–2022, current role since 2022 ("markets in Europe and Asia" is approved). Case study and service figures are real: no "placeholder figures" notes anywhere (`ui.placeholderFigures` and `home.resultsNote` removed). Recommendation blocks are commented out in the pages (home, services, service, about) until real ones arrive. The courses FAQ makes no claims about format or languages. LinkedIn stays visible. Enquiries are not stored in Sanity (email only); no cookie-settings link. Video: separate YouTube channels per language. Articles (DataForSEO per language), and the free templates are written by Claude.
- Diploma gallery: `CredentialsGallery` on /about (scroll-snap slider + viewer with paging, wheel/double-click/pinch zoom, drag, swipe; modelled on DiplomiSlider in giuseppeiannone). Images in `public/images/credentials/` (processed from photos: perspective, colour; diploma form numbers redacted). Data: `about.credentials` in the content modules.
- 2026-09-17: keyword research done (task 01). Results in `research/` (`keyword-map.md` is the source for task 02 copy); scripts in `scripts/dataforseo/` (`run.ts` paid steps with cache and budget guard, `build.ts` rebuilds CSV offline). RU market = Kazakhstan (Russia/Belarus unavailable in DataForSEO). Owner decisions of 2026-09-17 are listed at the top of `research/keyword-map.md` (local PL/RU slugs, new EN slugs, Careers rubric, calculators, video plan, reply time one working day, Russian pages show the name only in Russian); open questions at the end of `research/keyword-report.md`.
- 2026-09-17: copy written (task 02, report `research/copy-report.md`). Content files per language: `index.ts`, `services.ts`, `caseStudies.ts`, `categories.ts`, `posts/<key>.ts`. Services, cases, posts and categories have a language-independent `key` and a localised `slug`; cross-references use keys (`serviceKey`, `caseStudyKey`, `post.category`). Keys, slugs and the article list live in `src/content/fallback/registry.ts`; hreflang, sitemap and the language switcher are built from keys (`src/content/index.ts`: `alternatePaths`, `languageAliases`, `routableGroups`). Articles differ per language (EN 19, PL 18, RU 17); stand-in bodies have `placeholder: true`. Article blocks include `calculator` (`Calculator.tsx`, formulas in `src/content/calculators.ts`) and `video` (YouTube lite embed from youtube-nocookie.com + VideoObject; no videos yet). Check content with `npx tsx scripts/check-content.ts`. Calculator pages: `calculators.ts` per language (keys and slugs in `CALCULATORS` in the registry); embedded calculators link to them. FAQ blocks on every page type (optional `faqTitle`/`faq` fields). Privacy policy text is the one from bandziuk (controller: JDG Aliaksandr Bandziuk, info@bandziuk.com), owner decision.
- 2026-09-17: Sanity seeded and the site switched to it (task 03, report `docs/sanity-report.md`). `getContent(lang)` is async: Sanity first (`src/sanity/loaders.ts`, one query per language), fallback modules on error or missing documents with a `[content]` warning. Scripts in `scripts/sanity/`: `backup.ts` (always before writing), `seed.ts [--dry-run] [--only=type]` (createOrReplace from the fallback modules — overwrites Studio edits, so once the owner edits content use `--only` carefully), `compare.ts` (Sanity vs fallback, 0 differences after seed), `webhook-check.ts`. `INDEXNOW_WEBHOOK_SECRET` is set in `.env.local`; webhook still to be created in the Sanity dashboard and the env vars added in Vercel.
- Navigation: "Services" and "Calculators" (`/tools`) have submenus built in `Header.tsx` from `services` / `calculators` (pattern from giuseppeiannone: label stays a link, chevron button opens; hover with 150 ms close delay, Escape, focus-out, click outside — `useNavDropdown.ts`; mobile menu uses an accordion). Footer has a calculators column. Cross-links by `serviceKey` (`Related.tsx`): service and case study pages show its articles and calculators, articles show calculators not embedded in the text, rubrics show calculators of their articles' services.
- Free templates (2026-09-18): `templates/<lang>/` holds the open-to-buy model and the 12-point KPI dashboard checklist per language, built by `python scripts/templates/build.py` (openpyxl; texts in its `TEXT` dict) and checked by `python scripts/templates/verify.py` (pycel evaluates every formula and hand-checked values). `/api/email` mails both files to the visitor for `templates` and `waitlist` requests (`src/lib/templatesMail.ts`, language from the page path); `next.config.mjs` bundles `templates/**` with the route. Page texts on /free-templates describe exactly these files — change both together.
- Articles (2026-09-18): all 54 are full (no stand-ins left; `check-content` 0 errors, 0 warnings). The 41 former stand-ins were written from per-article DataForSEO research: `npx tsx scripts/dataforseo/articles.ts run|brief <lang>` (target queries in its `TARGETS`), briefs in `research/articles/<lang>/<key>.md` (top-10, People Also Ask, related searches, suggestions). Total DataForSEO spend so far about $5.55 of the $10 guard.
- Role wording (owner, 2026-09-19): in PL and RU she is an expert, not a consultant — «Эксперт по аналитике в ритейле и моде», «Ekspertka ds. analityki w handlu i modzie» (content, `identity.ts` jobTitle). Reason: in RU «консультант» reads as «продавец-консультант» / КонсультантПлюс, in a retail context especially; no search volume either way for the long-tail roles (`research/consultant-vs-expert.md`, `scripts/dataforseo/terms.ts`). "Консультация / konsultacja" for the service stays. EN keeps "Consultant".
- `_to_delete/` holds files from bandziuk that are not used here; the owner can delete the folder.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

Every maintenance script has an `npm run` entry (added 2026-10-15); the bare
`npx tsx scripts/...` calls still work and mean the same thing.

| Command | What it does |
|---|---|
| `npm run dev` | Dev server. Never run `npm run build` locally — Vercel builds on push. |
| `npm run typecheck` | `tsc --noEmit`; run before every commit. |
| `npm run lint` | ESLint. |
| `npm run check:content` | SEO lengths, name spelling, empty headings and FAQ answers, registry match, calculator labels, article length, remaining stand-ins. |
| `npm run check:links` | Crawls the deployed site from sitemap.xml and checks every internal link. 4xx, 5xx and 3xx all fail (`--allow-redirects` downgrades 3xx to a warning); `--base=` points it at another deployment. Run it a minute after a deploy, or the CDN still answers with the previous build. |
| `npm run sanity:backup` | Dataset export to `backups/`. Always before writing to Sanity. |
| `npm run sanity:seed` | Writes the fallback modules to Sanity with createOrReplace — overwrites Studio edits, so prefer `--only=` or `seo:apply`. |
| `npm run sanity:compare` | Sanity against the fallback modules. |
| `npm run sanity:validate` | Schema check. |
| `npm run sanity:webhook` | Publish-webhook check. |
| `npm run sanity:urls` | URLs a document resolves to. |
| `npm run seo:diff` | Shows which `seo.title` / `seo.description` differ between the content modules and Sanity. Writes nothing. |
| `npm run seo:apply` | Writes those two fields with a patch, leaving the rest of each document untouched (`scripts/sanity/patch-seo.ts`). |
| `npm run templates:build` / `templates:verify` | Rebuilds and verifies the Excel templates (Python, openpyxl / pycel). |
| `npm run keywords:build` | Rebuilds the keyword CSVs from the cached DataForSEO responses, offline and free. |

Editing copy is two steps: change `src/content/fallback/**`, then `npm run seo:apply`
for SEO fields (or edit the document in Studio). The site reads Sanity first, so a
change that lives only in the modules does not reach the live site.

## Indexing rules (from the first month of Search Console data, 2026-10-14)

State on 14 October: 81 pages indexed, 79 not, 71 of them "Discovered - currently
not indexed" with no crawl date at all — Google knew the URLs from the sitemap and
never fetched them. Not a technical fault: a one-month-old domain with no backlinks
gets little crawl budget. The unindexed set was the commercial half of the site
(all PL services, three EN and three RU services, 11 of 18 case studies, `/ru`,
most calculators, `/about`, `/courses`, `/free-templates`).

What follows from that, and what is now in the code:

- **A thin rubric is not an index-worthy URL.** `MIN_CATEGORY_POSTS = 3` in
  `src/content/index.ts`: a rubric with fewer articles is dropped from the sitemap
  group and gets `noindex, follow` in its metadata. It stays on the site and keeps
  passing link weight. Raising the threshold removes more URLs from the crawl queue;
  do not add new URLs to the sitemap without a reason while indexing is the bottleneck.
- **Another language's slug answers 308, not 404.** `crossLanguageHref` in
  `src/content/index.ts`, used by every dynamic route. Search engines guess
  combinations like `/case-studies/<pl slug>`; a redirect keeps the signal.
- **`dateModified` comes from `updatedAt`**, not from the publication date
  (articles and case studies). Freshness is a ranking and citation signal and the
  data was already there.
- **Articles link to the case study of their service** (`RelatedCase` in
  `Related.tsx`), so pages Google already crawls feed the ones it does not.
- **Snippets promise what an AI answer does not carry** — a formula to copy, a
  benchmark table, a calculator, a worked example, a step count. Eleven pages were
  rewritten this way on 2026-10-15; they sat at positions 3–16 with 2 clicks on
  780 impressions. Keep new titles under 60 characters and descriptions under 155;
  `npm run check:content` enforces it.
- **Manual submission is part of the job** while the domain is young: priority URLs
  go into Search Console by hand after each deploy, a handful a day.
- **Share cards**: `public/images/og/og-{en,pl,ru}.png` (1200x630, name and role in
  the site's own fonts and colours), wired in `ogImage()` in `src/content/index.ts`
  and used by `pageMetadata` and the `[lang]` layout. Rebuild them by hand if the
  name, role or brand colours change — they carry text, not page titles.
- **`/llms.txt`** is a route (`src/app/llms.txt/route.ts`), not a static file: it is
  built from the same content loader as the pages, so it cannot drift. It lists the
  services, calculators, case studies, twelve newest articles and contacts per
  language, and returns 404 while indexing is closed.

- **Internal links point at the final URL.** No internal link may answer a redirect: the language switch
  once emitted internal section segments (`/pl/case-studies` instead of `/pl/case-study`) and 92 of 250
  link targets went through a 308. Nothing looked broken, because every one of them landed on the right
  page. `npm run check:links` is what catches it.
