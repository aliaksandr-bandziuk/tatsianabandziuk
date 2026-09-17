# tatsianabandziuk.com — project notes

Personal consulting site for Tatsiana Bandziuk (retail and fashion analytics).
Infrastructure was taken from the sibling project `../bandziuk` on 2026-09-16;
its CLAUDE.md explains the reasoning behind most of the rules below.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 App Router, TypeScript strict |
| CMS | Sanity v3 + next-sanity, Studio at `/admin` |
| i18n | next-intl middleware: EN without prefix (default), `/pl`, `/ru`; `@sanity/document-internationalization` (one document per language) |
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

- **Never run `npm run build` locally.** Vercel builds on push. Use `npm run dev` and `npx tsc --noEmit`. Kill any dev server you start.
- **Git:** do not commit or push unless the owner asks in the session. Inspect with `git --no-optional-locks`. Never run mutating git commands from a shell that cannot delete files (stale `index.lock`).
- **Sanity access only through `client` from `src/sanity/sanity.client.ts`** (adds `revalidate: 86400` + tag `sanity`). A raw `createClient` fetch with the token makes the route dynamic.
- **Every page under `[lang]` exports `generateStaticParams`**, otherwise Next 14 renders it on every request.
- `useCdn: false` stays. The token (`SANITY_API_TOKEN`) is required: translated documents are private.
- **JSON-LD uses a plain `<script type="application/ld+json" suppressHydrationWarning>`**, never `next/script` (AI fetchers do not run JS).
- **Images go through Sanity's CDN** (`src/lib/images/sanityLoader.ts`), not `/_next/image`. Do not add `unoptimized`; `fill` images need `sizes`.
- **Publish webhook:** manage.sanity.io → Webhooks → `POST {SITE_URL}/api/indexnow/webhook`, header `Authorization: Bearer <INDEXNOW_WEBHOOK_SECRET>`, filter `!(_id in path("drafts.**"))`. It calls `revalidateTag("sanity")` for every type and submits `service`, `caseStudy`, `post` URLs to IndexNow.
- `/admin` is excluded from the i18n middleware. Keep it that way.
- Analytics (GA, Clarity) load only when their env IDs are set **and** the visitor accepted analytics cookies (`useAnalyticsConsent`). This differs from bandziuk on purpose (GDPR).
- `robots.ts` blocks SEO-tool crawlers; search engines and AI crawlers stay allowed.

## Content model (`src/sanity/schemaTypes`)

Translated documents (one per language): `siteSettings`, `homepage`, `person`, `experience`, `service`, `consultingFormat`, `caseStudy`, `post`, `category`, `tool`, `recommendation`, `leadMagnet`, `legalPage`, `pageSettings` (texts for fixed pages: services, caseStudies, blog, about, contact, courses, notFound), `contactForm`.
Objects: `localizedSlug` (`slug.<lang>.current`), `seo`, `richText` (with DAX/Excel code blocks and callouts), `metric`, `titledText`, `faqItem`, `link`, `sectionHeading`, `imageWithAlt`.

## Routes (planned)

`/`, `/services`, `/services/[slug]`, `/case-studies`, `/case-studies/[slug]`, `/blog`, `/blog/[slug]`, `/blog/category/[slug]`, `/about`, `/contact`, `/courses`, `/free-templates`, `/[legal slug]`, plus the same under `/pl` and `/ru`. URL segments stay English in every language for now (open question for the keyword research). Sitemap at `/sitemap.xml` (→ `/api/sitemap`) with hreflang.

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
- `_to_delete/` holds files from bandziuk that are not used here; the owner can delete the folder.
