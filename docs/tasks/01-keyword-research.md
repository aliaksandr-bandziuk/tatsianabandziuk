# Задание 1. Подбор ключевых слов через DataForSEO и карта страниц

## Контекст

Проект — сайт-портфолио и консалтинговый сайт Татьяны Бандюк (Tatsiana Bandziuk): аналитика ассортимента, ценообразования, товарных данных (PLM) и отчётности Power BI / Excel для fashion- и retail-брендов. Next.js 14 (App Router) + Sanity, языки EN (без префикса), PL (`/pl`), RU (`/ru`). Домен: https://www.tatsianabandziuk.com. Сайт закрыт от индексации до запуска.

Прочитай перед началом: `CLAUDE.md`, `brief.md`, `docs/tasks/00-README.md`, `src/content/types.ts`, `src/content/fallback/en/index.ts`, `src/content/fallback/en/services.ts`, `src/content/fallback/en/caseStudies.ts`, `src/content/fallback/en/blog.ts`.

Аудитории по приоритету:
1. Консалтинговые клиенты: fashion- и retail-бренды, дистрибьюторы, e-commerce, которым нужна помощь с ассортиментом, ценами, товарными данными, отчётностью.
2. Рекрутеры (вторично, без сигналов «ищу работу»).
3. Читатели блога и будущих курсов (SEO/GEO/AEO-трафик).

Текущая структура страниц (её не менять без явной причины из данных):
- главная; /services; 6 услуг: `assortment-planning`, `retail-pricing-analysis`, `power-bi-dashboards`, `excel-retail-planning-models`, `product-data-quality-plm`, `retail-analytics-processes`;
- /case-studies (6 кейсов); /blog, рубрики `power-bi`, `assortment`, `pricing`, `product-data`, `excel`; 8 статей (слаги в `src/content/fallback/en/blog.ts`);
- /about; /contact; /courses (лист ожидания); /free-templates (OTB-шаблон Excel + чек-лист дашборда); политика конфиденциальности.

## Доступ

- Логин и пароль DataForSEO: `DATAFORSEO_API_LOGIN` и `DATAFORSEO_API_PASSWORD` в `.env.local` (Basic Auth). Значения не печатать.
- Документация: https://docs.dataforseo.com/v3/

## Бюджет и осторожность

- Лимит расходов на всё задание: **10 USD**. Перед запуском каждого пакета запросов оцени стоимость по документации и веди учёт фактических расходов (поле `cost` в ответах) в `research/keywords/cost-log.csv`.
- Сначала один тестовый запрос, проверь ответ, потом пакет.
- Кэшируй все сырые ответы в `research/keywords/raw/<endpoint>-<lang>-<date>.json`, чтобы не платить повторно. Перед запросом проверяй кэш.
- Используй `live`-эндпоинты только там, где нет дешёвой `task`-альтернативы, или где объём маленький.

## Рынки

Определи через `/v3/dataforseo_labs/locations_and_languages` (и/или `/v3/keywords_data/google_ads/locations`), какие локации доступны, и выбери:
- **EN:** United Kingdom (основной, клиенты в Европе) + United States (для объёмов и идей). Язык `en`.
- **PL:** Poland, язык `pl`.
- **RU:** русскоязычные запросы. Google Ads и Labs могут не поддерживать Россию и Беларусь — проверь. Если недоступны, возьми Kazakhstan (`ru`) как основной рынок для объёмов и дополнительно Poland / Germany с языком `ru`, если доступны. Запиши выбранное и причину в отчёт.

## Шаги

1. **Скрипт.** Создай `scripts/dataforseo/` на TypeScript (запуск через `npx tsx`, добавь `tsx` в devDependencies, если его нет) с общим клиентом: Basic Auth из `.env.local` (через `dotenv`), кэш ответов, журнал стоимости, ретраи на 429/5xx. Никаких секретов в коде.
2. **Сиды.** Для каждого языка составь список сидов (20–40 фраз) по темам: assortment planning, range planning, open-to-buy (OTB), merchandise planning, sell-through, size curve, retail pricing / price architecture / markdown, Power BI для ритейла (DAX, retail KPI dashboard), Excel-модели для ритейла, product data / PLM / product information management / attribute standards, retail analytics consulting, fashion analytics consultant, freelance retail analyst. Для PL и RU — на родном языке, с учётом того, как реально ищут (включая англицизмы: «sell-through», «OTB», «Power BI»). Сохрани в `research/keywords/seeds-<lang>.txt`.
3. **Расширение.** DataForSEO Labs: `keyword_suggestions`, `related_keywords` и/или `keyword_ideas` по сидам. Затем объёмы и CPC: `keywords_data/google_ads/search_volume` (или `dataforseo_labs/.../keyword_overview`). Сложность: `bulk_keyword_difficulty`. Интент: `search_intent`.
4. **Выдача.** По 25–40 главным запросам каждого языка — `serp/google/organic/live/advanced` (top-10). Зафиксируй: кто ранжируется (консультанты, агентства, софт, блоги), какие есть SERP-фичи (People Also Ask, featured snippet, video), вопросы из PAA.
5. **Вопросы для блога и AEO.** Собери вопросы (PAA, «how to…», «jak…», «как…») для статей и FAQ.
6. **Очистка и кластеризация.** Убери мусор, брендовые запросы чужих компаний, нерелевантное. Сгруппируй по кластерам и привяжи каждый кластер к одной странице сайта (без каннибализации: один основной кластер — одна страница).

## Результат

1. `research/keywords/<lang>.csv` — колонки: `keyword, lang, location, volume, cpc, competition, kd, intent, cluster, target_page, priority (P1/P2/P3), serp_notes`.
2. `research/keyword-map.md` — главный документ, по языкам. Для **каждой** страницы сайта (главная, /services, 6 услуг, /case-studies, каждый кейс, /blog, каждая рубрика, каждая статья, /about, /contact, /courses, /free-templates):
   - основной запрос и 3–8 вторичных (с объёмами);
   - предложение для `<title>` (до 60 символов) и meta description (до 155);
   - предложение H1 и список H2/H3 с ключевыми фразами (правила заголовков — в `00-README.md`);
   - вопросы для FAQ-блока страницы (3–6);
   - слаг: оставить английский или предложить локальный для PL/RU (с обоснованием данными).
3. `research/blog-plan.md` — 15–25 тем статей по языкам с основным запросом, объёмом, интентом, рубрикой и приоритетом; пометить, какие из 8 текущих статей оставить, переименовать или заменить.
4. `research/keyword-report.md` — краткий отчёт: выбранные рынки и почему, главные выводы по каждому языку, конкуренты в выдаче, возможности для GEO/AEO, рекомендации по URL (переводить ли слаги), итоговые расходы.

## Проверка

- Все файлы созданы, CSV открываются, в карте нет страниц без основного запроса.
- В коде и файлах нет секретов; `.env.local` не тронут.
- `research/keywords/raw/` добавлен в `.gitignore` (сырые ответы не коммитим), а CSV и .md — коммитим.
- В конце — сообщение владельцу: что сделано, сколько потрачено, какие решения нужны от него (например, про перевод слагов).
