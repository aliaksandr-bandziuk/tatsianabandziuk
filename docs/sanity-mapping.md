# Sanity ↔ view models

How every model in `src/content/types.ts` is stored in Sanity (`src/sanity/schemaTypes`).
The loader (`src/sanity/loaders.ts`) reads one language in one GROQ query and returns
exactly these models; the seed (`scripts/sanity/seed.ts`) writes the other way.

Field names are the same in the model and the schema unless a row says otherwise.
Every document has `language` (`en` / `pl` / `ru`); ids are `<base>.<lang>`.

## Documents

| Model (`SiteContent` field) | Sanity document | `_id` | Notes |
|---|---|---|---|
| `ui` | `siteSettings.ui` | `siteSettings.<lang>` | `ui.topics` is a record in the model, a list of `{key, label}` in Sanity |
| `person` | `siteSettings.person` | same | `languages` → list of `fact` |
| `formats` | `siteSettings.formats[]` (`consultingFormat`) | same | |
| `tools` | `siteSettings.tools[]` (`toolItem`) | same | |
| `recommendations` | `siteSettings.recommendations[]` (`recommendation`) | same | only real ones |
| `notFound` | `siteSettings.notFound` | same | |
| `thankYou` | `siteSettings.thankYou` | same | |
| `home` | `homepage` | `homepage.<lang>` | |
| `about` | `aboutPage` | `aboutPage.<lang>` | `credentials.items[]` → `credential` (see below) |
| `servicesPage` | `listingPage`, `key = services` | `listingPage-services.<lang>` | |
| `caseStudiesPage` | `listingPage`, `key = caseStudies` | `listingPage-caseStudies.<lang>` | |
| `blogPage` | `listingPage`, `key = blog` | `listingPage-blog.<lang>` | |
| `calculatorsPage` | `listingPage`, `key = calculators` | `listingPage-calculators.<lang>` | |
| `contact` | `contactPage` | `contactPage.<lang>` | |
| `courses` | `coursesPage` | `coursesPage.<lang>` | |
| `templates` | `templatesPage` | `templatesPage.<lang>` | `items[]` inline objects |
| `privacy` | `legalPage`, `key = privacy` | `legalPage-privacy.<lang>` | `slug` → `slug.<lang>.current` |
| `services[]` | `service` | `service-<key>.<lang>` | |
| `caseStudies[]` | `caseStudy` | `caseStudy-<key>.<lang>` | |
| `posts[]` | `post` | `post-<key>.<lang>` | |
| `categories[]` | `category` | `category-<key>.<lang>` | |
| `calculators[]` | `calculatorPage` | `calculatorPage-<key>.<lang>` | |

Language versions are linked by `translation.metadata` documents (`translation-<base>`),
created only when an item exists in at least two languages.

## Fields shared by collections

| Model field | Sanity field | Notes |
|---|---|---|
| `key` | `key` | language-independent id (the EN slug); cross-references use it |
| `slug` | `slug.<lang>.current` (`localizedSlug`) | used by sitemap, IndexNow, language switcher |
| `updatedAt` | `_updatedAt` | read-only, sitemap `lastmod` |
| — | `order` | list order (the fallback array order); dropped by the loader |
| `seo` | `seo` (`title`, `description`, `noindex`) | |
| `faqTitle`, `faq[]` | `faqTitle`, `faq[]` (`faqItem`) | FAQ group in Studio |
| `caseStudyKey`, `serviceKey`, `category`, `relatedPostKey` | plain strings with the key | no references, so a missing translation never breaks a page |

## Objects

| Model type | Sanity object | Fields |
|---|---|---|
| `AccentHeading` | `accentHeading` | `before`, `accent`, `after` |
| `Metric` | `metric` | `value`, `unit`, `label` |
| `TitledText` | `titledText` | `label`, `title`, `text` |
| `Fact` | `fact` | `label`, `value` |
| `FaqItem` | `faqItem` | `question`, `answer` |
| `LinkItem` | `link` | `label`, `href` (internal path in English segments) |
| `Recommendation` | `recommendation` | `quote`, `name`, `role`, `placeholder` |
| `CareerStep` | `careerStep` | `period`, `company`, `role`, `text`, `current` |
| `ConsultingFormat` | `consultingFormat` | `label`, `title`, `suits`, `youGet`, `duration`, `cta` |
| `Tool` | `toolItem` | `id`, `monogram`, `title`, `text`, `skills[]` |
| `Credential` | `credential` | `id`, `year`, `institution`, `title`, `thumb` (image), `image` (image), `redacted`. `thumb`/`image` URLs and `width`/`height` are projected from the asset |
| `string[]` (paragraphs, chips) | array of `text` / `string` | |

## Article blocks (`Post.body`, `CalculatorPage.body`)

Map in `src/sanity/articleBlocks.ts`; the model's `type` becomes the Sanity `_type` and back.

| Model `type` | Sanity type | Differences |
|---|---|---|
| `p` | `articleParagraph` | |
| `h2` | `articleHeading` | `id` = anchor for the table of contents |
| `formula` | `articleFormula` | |
| `code` | `articleCode` | |
| `chart` | `articleChart` | |
| `list` | `articleList` | |
| `calculator` | `articleCalculator` | `labels` record ↔ list of `{id, label}` |
| `video` | `articleVideo` | |
| `table` | `articleTable` | `rows[].cells` stored as strings; number columns are converted back to numbers by the loader |
