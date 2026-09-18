# Задание 3. Схемы Sanity, загрузка контента и переключение сайта на Sanity

## Контекст

Сайт читает контент из типизированных модулей `src/content/fallback/{en,pl,ru}/` через `getContent(lang)` в `src/content/index.ts`. Все компоненты работают только с моделями из `src/content/types.ts`. Схемы Sanity (`src/sanity/schemaTypes/`) были созданы раньше моделей и могут им не соответствовать. Studio — по адресу `/admin`. Плагин `@sanity/document-internationalization`: по одному документу на язык, связь переводов — через документы `translation.metadata`. Список переводимых типов — `TRANSLATED_TYPES` в `src/sanity/schemaTypes/index.ts`.

Прочитай перед началом: `CLAUDE.md` (особенно раздел Engineering rules), `docs/tasks/00-README.md`, `src/content/types.ts`, `src/content/index.ts`, `src/content/fallback/*`, `src/sanity/sanity.client.ts`, `src/sanity/sanity.utils.ts`, `src/sanity/schemaTypes/**`, `src/sanity.config.ts`, `src/app/api/sitemap/route.ts`, `src/lib/indexnow/resolveUrls.ts`. Для примера рабочей схемы и загрузчиков можно смотреть соседний проект `../bandziuk` (там тот же стек).

## Доступ

- `.env.local`: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, токен с правами Editor — `SANITY_API_TOKEN` или `SANITY_API_WRITE_TOKEN` (код принимает оба имени). Значения не печатать.
- Перед записью сделай экспорт датасета: `npx sanity dataset export <dataset> backups/sanity-<date>.tar.gz` (папку `backups/` добавить в `.gitignore`).

## Правила (из CLAUDE.md, обязательные)

- Чтение Sanity на сайте — **только** через `client` из `src/sanity/sanity.client.ts` (он добавляет `revalidate: 86400` и тег `sanity`). Не создавать отдельный `createClient` с токеном для страниц — это делает маршрут динамическим.
- Каждая страница под `[lang]` экспортирует `generateStaticParams`.
- `useCdn: false` не менять.
- Изображения — через CDN Sanity (кастомный loader), `fill`-изображениям нужен `sizes`.
- Не запускать `npm run build`.

## Шаги

### 1. Выравнивание схем

- Для каждой модели из `types.ts` (Service, ConsultingFormat, CaseStudy, Post, ArticleBlock, Category, Tool, Recommendation, Person, CareerStep, HomeContent, AboutContent включая `credentials`, ListingPage, ContactContent, CoursesContent, TemplatesContent, LegalContent, NotFoundContent, ThankYouContent, Ui) составь таблицу соответствия «поле модели → документ/поле схемы». Сохрани в `docs/sanity-mapping.md`.
- Доработай схемы, чтобы каждое поле модели имело место в Sanity: недостающие поля, объекты (`accentHeading`, `metric`, `fact`, `faqItem`, `titledText`, блоки статьи, включая `table`), `credentials` (изображения документов загружаются в Sanity как assets, с полями year/institution/title/redacted), `ui`-строки (в `siteSettings`), тексты фиксированных страниц (в `pageSettings` или отдельных синглтонах).
- Слаги: сейчас поле `slug` локализованное (`slug.<lang>.current`) — сохранить этот подход, он используется в sitemap и IndexNow.
- Studio должна открываться на `/admin` без ошибок; синглтоны (siteSettings, homepage, pageSettings…) — через structure, по одному на язык.

### 2. Скрипт загрузки (seed)

- `scripts/sanity/seed.ts` (запуск `npx tsx scripts/sanity/seed.ts [--dry-run] [--only=service,post]`):
  - берёт данные из `src/content/fallback/{en,pl,ru}` (импорт модулей, те же типы);
  - формирует документы с детерминированными `_id` (например `service-assortment-planning.en`), чтобы повторный запуск обновлял, а не дублировал (`createOrReplace`);
  - создаёт `translation.metadata` для связки EN/PL/RU каждой сущности (формат — как у плагина: `translations[]` с `_key` = язык и weak-reference `value`);
  - загружает изображения из `public/images/credentials/` как assets (с кэшем по хэшу, чтобы не дублировать) и ставит ссылки;
  - транзакции пакетами, `--dry-run` печатает сводку без записи;
  - в конце — сводка: сколько документов каждого типа создано/обновлено по языкам.
- Сначала `--dry-run`, потом реальная запись. Проверить в Studio выборочно 3–4 документа на каждом языке и что переключатель языков плагина показывает связанные переводы.

### 3. Загрузчики и переключение сайта

- В `src/sanity/sanity.utils.ts` (или `src/content/sanity.ts`) — GROQ-запросы, которые возвращают **ровно** модели из `types.ts` (проекции GROQ маппят поля).
- `getContent(lang)` становится асинхронной (`getContent(lang): Promise<SiteContent>`) и читает Sanity первым; при ошибке или пустом ответе — берёт `fallback` и пишет предупреждение в лог. Обновить все места вызова (страницы, `generateMetadata`, `generateStaticParams`, layout, Header/Footer, sitemap). Клиентские компоненты получают данные пропсами от серверных — не импортируют `getContent`.
- Лучше один запрос на язык с кэшированием (`unstable_cache` не нужен — `client` уже ставит `revalidate` и тег), либо несколько запросов по страницам — на выбор, но без N+1.
- `generateStaticParams` для услуг, кейсов, статей и рубрик берёт слаги из Sanity (с fallback).
- `src/app/api/sitemap/route.ts` — продолжает работать: при данных в Sanity берёт документы оттуда (уже умеет), при пустом — fallback.
- Вебхук `/api/indexnow/webhook` вызывает `revalidateTag("sanity")` — после публикации в Studio изменения появляются на сайте. Проверить вручную: изменить заголовок услуги в Studio → опубликовать → POST на вебхук с секретом `{"_id":"manual","_type":"manual"}` → на странице новый заголовок.

### 4. Настройка вебхука (инструкция владельцу, не делать самому)

В отчёт добавь шаги: manage.sanity.io → API → Webhooks → Create: URL `https://www.tatsianabandziuk.com/api/indexnow/webhook`, Trigger on: Create/Update/Delete, Filter `!(_id in path("drafts.**"))`, Projection `{_id, _type, language, slug}`, HTTP method POST, header `Authorization: Bearer <INDEXNOW_WEBHOOK_SECRET>`; и что `INDEXNOW_KEY` / `INDEXNOW_WEBHOOK_SECRET` нужно добавить в Vercel.

## Проверка

- `npm run typecheck` без ошибок.
- `npm run dev`: все страницы на трёх языках выглядят так же, как до переключения (сравнить выборочно скриншотами или текстом), плюс `/admin` работает.
- При временно неверном `NEXT_PUBLIC_SANITY_DATASET` сайт не падает, а показывает fallback (проверить и вернуть значение).
- Страницы остаются статическими (в выводе `next dev` нет предупреждений о динамическом рендере из-за токена; маршруты не вызывают `headers()`/`cookies()`).
- `/sitemap.xml` содержит все страницы с hreflang; `robots.txt` по-прежнему закрыт (`SITE_INDEXING` не задан).
- Обновить раздел Status и Content model в `CLAUDE.md`.
- Отчёт `docs/sanity-report.md`: что изменено в схемах, как запускать seed, какие поля в Studio заполняет владелец (фото, рекомендации, цифры кейсов), шаги по вебхуку.


## Фотографии в Sanity

В модель `Person` (`src/content/types.ts`) добавлены два поля типа `SiteImage` (`{ src, alt, focus? }`):

- `photoPrimary` — фото в первом экране главной страницы (сейчас снимок с прозрачным фоном);
- `photoSecondary` — фото во всех остальных местах: блок «обо мне» на главной, страница About, блок контактов.

В fallback-контенте они указывают на файлы `public/images/portrait/tatsiana-main.webp` и `tatsiana-second.webp`. Что нужно сделать в Sanity:

1. В схеме документа с данными о человеке (`person` или тот документ, куда легла модель `Person`) завести два поля типа `image` с `hotspot: true` и обязательным `alt` (поле локализовано вместе с документом, то есть своё на каждый язык).
2. В маппинге (`src/content/index.ts` или где собирается `Person`) собирать `src` через `urlFor(asset)` — кастомный лоадер `src/lib/images/sanityLoader.ts` сам подставит ширину и формат. Если фото в Sanity нет, остаётся значение из fallback.
3. В seed-скрипте загрузить оба файла из `public/images/portrait/` как assets и проставить ссылки во все три языковые версии документа.
4. Компонент `Photo` (`src/app/components/site/Blocks.tsx`) рендерит `next/image` с `fill`, поэтому менять его не нужно — достаточно, чтобы в `Person` приходили `src` и `alt`.
