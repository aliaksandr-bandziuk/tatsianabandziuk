# Отчёт: подбор ключевых слов (DataForSEO)

17.09.2026 · задание `docs/tasks/01-keyword-research.md` · версия 1.1 (после решений владельца)

## Итог в шести пунктах

1. **Спрос в нише маленький на всех трёх языках.** Самые точные профильные запросы, по которым продаются услуги, ищут от 10 до 50 раз в месяц в Великобритании и меньше 10 раз в Польше и Казахстане. Примеры: assortment planning, open to buy, planowanie asortymentu, планирование ассортимента. Трафик сайт будет получать в основном через статьи по смежным темам: маржа/наценка, ABC-анализ, оборачиваемость, KPI, sell-through, PIM/PLM, дашборды Power BI. Страницы услуг нужны для заявок и цитирования в ИИ-ответах, а не для объёма.
2. **Самый большой коммерческий запрос EN** — «power bi consultant» (320 в UK, 590 в US, KD 0). Он стал основным для страницы услуги Power BI.
3. **Выдача почти везде с AI Overview:**

   | Язык | С AI Overview | С People Also Ask |
   |---|---|---|
   | EN | 38 из 40 | 39 |
   | PL | 35 из 37 | 36 |
   | RU | 36 из 36 | 34 |

   В нише доминируют вендоры ПО и справочные сайты. Экспертов-практиков из fashion в топе нет. Это главная возможность для GEO/AEO.
4. **По имени.** «Tatsiana Bandziuk» (EN/PL) выдаёт только LinkedIn, Facebook, Instagram и RocketReach, сайта нет. По **«Татьяна Бандюк»** Google показывает другого человека — бухгалтера-лектора (kontur.ru, buhonline.ru, audit-it.ru). Связь двух написаний держится на разметке (`alternateName`, позже `sameAs`), на самих RU-страницах имя пишется только по-русски (решение 5).
5. **Потрачено $4.83 из лимита $10**, 373 запроса. Первая часть — $4.22 при оценке до $4.5. Вторая — $0.61 после решений владельца: калькуляторы, рубрика «Карьера», выдача RU по Польше и Германии. Все сырые ответы в кэше, повторный запуск бесплатен.
6. **Калькуляторы маржи — самый большой спрос во всём исследовании:** «margin calculator» — 27 100 в UK (110 000 в US), «markup calculator» и «gross margin calculator» — по 1900, «kalkulator marży» — 2900 в PL, «калькулятор маржи» — 140 в KZ.

## Выбранные рынки и почему

Доступность проверена бесплатными эндпоинтами (`dataforseo_labs/locations_and_languages`, `keywords_data/google_ads/locations`, `serp/google/locations`).

| Страна | Labs | Google Ads | SERP |
|---|---|---|---|
| Великобритания | en | да | да |
| США | en, es | да | да |
| Польша | pl | да | да |
| Казахстан | ru | да | да |
| Украина | uk, ru | да | да |
| Германия | de | да | да |
| Россия | **нет** | **нет** | **нет** |
| Беларусь | **нет** | **нет** | **нет** |

- **EN:** Великобритания — основной рынок (клиенты в Европе, есть Labs, Ads и выдача). США — только для объёмов и идей: объёмы в разы больше и помогают сравнивать темы.
- **PL:** Польша, язык `pl`.
- **RU:** Россия и Беларусь недоступны ни в одном источнике.
  - Основной рынок — **Казахстан (`ru`)**: единственная страна с русским языком в Labs, Ads и выдаче.
  - Дополнительно объёмы Google Ads для **Польши (`ru`)** и **Германии (`ru`)**, как в задании. В Labs этих пар нет, Ads их принимает.
  - Добавлена **Украина (`ru`)** — только как сигнал объёма (4 запроса Ads, $0.18 из общей суммы). Без неё казахстанские «10» не позволяли отличить темы друг от друга. Выдачу по Украине не снимали, на неё ничего не таргетируется.
  - Выдача RU снята по Казахстану, а после решения владельца — ещё по Польше (`ru`) и Германии (`ru`): `serp-summary-ru-pl.md`, `serp-summary-ru-de.md`. В Польше и Германии казахстанские сайты уходят, остаются те же российские сервисы: Wikipedia, Контур, Cleverence, КонсультантПлюс, Яндекс Практикум, Kokoc, Т-Банк Секреты. AI Overview — в 36 и 35 выдачах из 36. Выводы по конкурентам для RU от рынка не зависят.

## Как собирали данные

1. **Сиды:** 37 EN, 34 PL, 34 RU (`research/keywords/seeds-*.txt`).
2. **Расширение (Labs):**
   - `keyword_ideas`: один запрос на все сиды, для EN ещё отдельный по США;
   - `keyword_suggestions`: по каждому сиду;
   - `related_keywords`: по 15 главным сидам.
   - Для PL и RU дополнительно `google_ads/keywords_for_keywords`: данных Labs по этим рынкам мало.
3. **Очистка:** правила в `scripts/dataforseo/clusters.ts`.
   - Исключения: чужие бренды и ПО, вакансии, eBay/Amazon, медицинские анализы и уценённая техника в RU, маркетплейсы, госзакупки, Познань в PL.
   - Отдельный список «общих и двусмысленных» запросов (P3) — у них в выдаче другой смысл:
     - DAX — биржевой индекс;
     - OTB — сленг;
     - «размерная сетка» — таблица размеров для покупателей;
     - «price ladder» — трейдинг;
     - «size curve» — одежда больших размеров.
   - `keyword_ideas` оказался почти бесполезен: он подбирает по категории и приносил «Lech Poznań» и «best buy».
4. **Объёмы:** `google_ads/search_volume` тремя пакетами.
   - Второй пакет — для страниц без данных после первого прохода: кейсы, курсы, шаблоны, контакты, маржа, ABC.
   - Третий — калькуляторы и карьерные запросы (`candidates3-*.txt`).
   - Рынки: EN — UK + US; PL — PL; RU — KZ + PL-ru + DE-ru + UA-ru (во втором и третьем пакетах только KZ + UA-ru).
5. **Сложность и интент:** для фраз без данных Labs — `bulk_keyword_difficulty` и `search_intent`. У многих низкочастотных фраз сложности нет: Labs её не считает.
6. **Выдача:** `serp/google/organic/live/advanced`, top-10, со сбором PAA. 40 EN, 37 PL и 36 RU фраз (RU — по трём рынкам), отобраны вручную: по 1–2 фразы на каждую страницу плюс имя. Сводки — в `research/keywords/serp-summary-*.md`.
7. **Кластеризация:** у каждого кластера одна целевая страница (колонка `target_page` в CSV).

**Ограничения данных:**
- Google Ads округляет объёмы до корзин (10, 20, 30, 50, 70, 90, 110…).
- «10» на низких частотах означает «от 0 до ~15».
- Пустой объём значит меньше 10.
- Близкие варианты написания Ads склеивает. Например, «kpi definitions» получил объём общего «kpi», поэтому он в P3.

## Выводы по языкам

### EN

- **Коммерческие запросы:**
  - power bi consultant / consultancy — 320 (590);
  - retail consulting services — 70 (110);
  - assortment planning — 40 (260);
  - merchandise planning — 50 (320);
  - category management consultant — 40 (90);
  - retail analytics consultant — 20 (40).
- **Информационные темы с объёмом:**
  - markup vs margin — 1600 (5400);
  - retail pricing — 1300 (49 500);
  - power bi dashboard examples — 880 (2900);
  - retail kpis — 390 (480);
  - what is plm — 390 (1900);
  - what is category management — 320 (880);
  - abc analysis — 260 (1300);
  - sell through rate — 170 (2400);
  - row level security power bi — 170 (390);
  - range plan — 170;
  - stock turn — 140;
  - dax measures — 110 (320).
- **Что изменить в текущих текстах:**
  - H1 услуги ассортимента: «Range Management» → «Merchandise Planning» (у первой фразы спроса нет).
  - H1 Excel-услуги: «Merchandising Analysis» → «Merchandise Financial Planning and Open-to-Buy».
  - Статья `price-ladder-analysis` → «retail price architecture»: по «price ladder» в выдаче трейдинг.
  - Статья `sell-through-vs-finance` → «sell-in vs sell-through» (20 / 260).
  - «size curve» использовать только с «retail / analysis».
- **Выдача по «pricing analyst», «brand analyst», «merchandising consultant»** — вакансии. Эти слова не ставить в заголовки как основные.

### PL

- Профильные запросы почти без спроса: planowanie asortymentu, analiza asortymentu, krzywa rozmiarów, architektura cenowa, open to buy — все <10.
- **Спрос есть по смежным темам:**
  - kalkulator marży — 2900;
  - analiza abc — 1300;
  - jak obliczyć marżę — 880;
  - narzut a marża — 720;
  - wskaźnik rotacji zapasów — 480 (плюс длинный хвост про «w dniach / w razach / wzór»);
  - kurs power bi — 480;
  - dax power bi — 390;
  - system pim — 260;
  - plm system — 210;
  - raport sprzedaży — 210;
  - wskaźniki sprzedaży — 210;
  - planowanie sprzedaży — 210;
  - polityka cenowa / strategie cenowe — 170;
  - raportowanie sprzedaży — 140;
  - category management — 110.
- **Страницы услуг PL** получили ближайшие польские формулировки: zarządzanie asortymentem, analiza cen, raportowanie sprzedaży, planowanie zakupów, jakość danych produktowych.
- **Конкуренты:**
  - польские BI-агентства (powerbi.pl, qbico, cogit, argondata);
  - SaaS для розницы (Leafio, PlanoHero);
  - сервисы для e-commerce (IdoSell, Shoper, Symfonia);
  - справочник mfiles.pl.

  Консультантов по fashion-аналитике в выдаче нет.

### RU

- Объёмы по Казахстану минимальные: почти всё «10». Сигнал давали Украина (ru) и Германия (ru).
- **Интерес есть:**
  - маржинальность — 320 (UA 320);
  - ценообразование — 170;
  - abc анализ — 210 (110);
  - категорийный менеджер — 140;
  - мерчендайзинг — 260 (это выкладка, не наша тема);
  - power bi обучение — 70;
  - xyz анализ — 70;
  - дашборд в power bi / в excel — 50;
  - оборачиваемость товара — 50 (70);
  - анализ цен — 40.
- **«Sell-through» по-русски почти не ищут.** «процент реализации товара» — <10, а выдача по нему про наценку. В статье нужны оба термина.
- **Выдача:**
  - российские и казахстанские сервисы: Cleverence, МойСклад, Datawiz, Контур, Kokoc, SendPulse;
  - онлайн-школы: Skillbox, Яндекс Практикум;
  - партнёры 1С.

  Отраслевых fashion-экспертов нет.
- **Для RU сайт — прежде всего канал доверия и ИИ-ответов**, а не трафика. Реальная русскоязычная аудитория (Беларусь, Россия, диаспора в Польше и Германии) в данных Google Ads не видна.

## Конкуренты в выдаче

| Тип | EN | PL | RU |
|---|---|---|---|
| Вендоры ПО для планирования и PLM/PIM | Board, Centric, Toolio, RELEX, o9, Anaplan, Akeneo, Pimcore, Retalon | Leafio, PlanoHero, Akeneo, SAP, Oracle | Datawiz, SpacePlanner, 1С-партнёры, Cleverence |
| BI-агентства и консультанты | vidi-corp, ascendanalytics, cleartelligence, simpson-associates | powerbi.pl, qbico, cogit, argondata | biconsult, zerobit.kz, alexkolokolov |
| Справочные и обучающие сайты | Wikipedia, Investopedia, Wall Street Prep, RetailDogma, Klipfolio, Microsoft Learn | mfiles.pl, eanaliza.pl, Wikipedia, Microsoft Learn | Wikipedia, Контур, Skillbox, Яндекс Практикум, Kokoc |
| Форумы и видео | reddit, YouTube | YouTube | YouTube, Хабр |
| Вакансии | indeed, LinkedIn, Harnham | pracuj.pl, jooble, nofluffjobs | hh.kz |

Самый частый отраслевой сайт в EN — **RetailDogma** (6 выдач из 40, 4 цитирования в AI Overview). Это главный ориентир по формату: короткие определения, формулы, шаблоны.

## Возможности для GEO / AEO

**Кого цитирует AI Overview:**
- EN — YouTube (9), RetailDogma (4), reddit (3), Wikipedia (3), Shopify (3), ThoughtSpot, Investopedia, Slimstock, Klipfolio;
- PL — mfiles.pl (5), Wikipedia (4), YouTube (4), Microsoft Learn (4);
- RU — Cleverence, Kokoc, Skillbox, Wikipedia, Roistat.

Сайт с теми же форматами, но с отраслевой глубиной, может попасть в эти ссылки.

**Рекомендации:**

1. **Первый абзац каждой статьи и услуги — прямой ответ на основной вопрос** (40–60 слов). Например: «Sell-through rate is…», «Open-to-buy is…». Затем формула в отдельном блоке и таблица-пример. Именно такие фрагменты AI Overview берёт у RetailDogma и Klipfolio.
2. **FAQ из PAA** на каждой странице (вопросы в `keyword-map.md`) с разметкой `FAQPage`. Ответ — 1–3 предложения, без «воды».
3. **Формулы и расчёты текстом**, а не только картинкой: DAX-код, Excel-формулы, таблицы `DataSheet`. ИИ-системы цитируют текст.
4. **Автор и Person-разметка:** BlogPosting с автором и ссылка на /about в каждой статье. Контекст «практик fashion-ритейла» — главное отличие от вендорских статей.
5. **`llms.txt`** со списком ключевых страниц на трёх языках (в брифе уже запланирован) плюс определения ключевых терминов.
6. **Видео.** YouTube — самый цитируемый источник в EN и частый в PL/RU. Короткие ролики «как посчитать sell-through в Power BI» — отдельный канал цитирования (решение владельца, это за рамками сайта).
7. **Калькуляторы:** «kalkulator marży» (2900 в PL) и «sell through rate calculator» (140 в US). Интерактивный калькулятор в статье о марже или sell-through закрывает инструментальный интент.
8. **Имя:**
   - `alternateName` в Person: Tatsiana Bandziuk, Татьяна Бандюк, Tatiana Bandziuk, Tatsiana Lustenkova;
   - на RU-страницах имя только по-русски (решение 5). От однофамилицы-бухгалтера её отделяют тема страниц (fashion-ритейл, Power BI) и разметка Person с `alternateName`;
   - `sameAs` → LinkedIn, позже другие профили.

## Рекомендации по URL (слагам)

- **Спрос от слага не зависит:** Google показывает одну и ту же страницу независимо от языка URL. Выгода локальных слагов:
  - кликабельность и читаемость в выдаче и в ссылках;
  - слабый сигнал релевантности;
  - запросы PL/RU почти не содержат английских слов, кроме «power bi», «sell-through», «open to buy».
- **Рекомендация:**
  1. **Документы (услуги, кейсы, статьи, рубрики) — локальные слаги.** PL — польский без диакритики (`planowanie-asortymentu`). RU — латинская транслитерация (`upravlenie-assortimentom`). Кириллица в URL превращается в `%D0%…` при копировании, поэтому её не используем. Модель `localizedSlug` в Sanity это уже поддерживает. Предложения — в `keyword-map.md`.
  2. **Сегменты разделов** (`/services`, `/blog`, `/case-studies`, `/about`, `/contact`, `/courses`, `/free-templates`) можно оставить английскими: это дешевле и спрос не меняет. Если нужна полная локализация (`/pl/uslugi`, `/ru/uslugi`), это делается через `pathnames` в next-intl и редиректы. Решение за владельцем.
  3. **EN: пока сайт закрыт, можно без потерь переименовать:**
     - `price-ladder-analysis` → `retail-price-architecture`;
     - `sell-through-vs-finance` → `sell-in-vs-sell-through`;
     - по желанию `sell-through-rate-power-bi` → `sell-through-rate`.

     После запуска любое переименование — только с 301-редиректом.
  4. **hreflang** связывает PL/RU-версии с EN независимо от слага (уже заложено в sitemap).

## Расходы

| Шаг | Эндпоинт | Запросов | EN | PL | RU | Итого |
|---|---|---|---|---|---|---|
| Проверка рынков, баланс, цены | locations, user_data | 4 | | | | 0.0000 |
| Тестовый запрос | labs keyword_suggestions | 1 | 0.0132 | | | 0.0132 |
| Идеи | labs keyword_ideas | 4 | 0.1920 | 0.0960 | 0.0960 | 0.3840 |
| Подсказки по сидам | labs keyword_suggestions | 105 | 0.4916 | 0.4192 | 0.4153 | 1.3261 |
| Похожие запросы | labs related_keywords | 45 | 0.1889 | 0.1844 | 0.1805 | 0.5538 |
| Идеи Google Ads | ads keywords_for_keywords | 4 | | 0.1800 | 0.1800 | 0.3600 |
| Объёмы (3 пакета) | ads search_volume | 17 | 0.5400 | 0.2700 | 0.7200 | 1.5300 |
| Сложность | labs bulk_keyword_difficulty | 3 | 0.0470 | 0.0340 | 0.0487 | 0.1297 |
| Интент | labs search_intent | 3 | 0.0470 | 0.0340 | 0.0487 | 0.1297 |
| Выдача top-10 + PAA | serp organic live advanced | 187 | 0.0898 | 0.0794 | 0.2312 (KZ + PL-ru + DE-ru) | 0.4004 |
| **Всего** | | **373** | **1.6097** | **1.2969** | **1.9205** | **4.8271 USD** |

Суммы по строкам округлены, итог взят из журнала. Два запроса выдачи EN (по имени) упали с ошибкой поисковика 40101 и были повторены, это $0.004. Подробный журнал — `research/keywords/cost-log.csv`. Баланс DataForSEO до начала: $33.90.

## Файлы

- `research/keywords/en.csv`, `pl.csv`, `ru.csv` — все отобранные запросы. Колонки из задания; в `location` в скобках объёмы дополнительных рынков, в `serp_notes` — топ-5 доменов, SERP-фичи, PAA и пометка «broad or ambiguous term». Файлы в UTF-8 с BOM, открываются в Excel.
- `research/keyword-map.md` — карта: страница → запросы, title, description, H1–H3, FAQ, слаг; в начале — решения владельца.
- `research/blog-plan.md` — 19 тем EN, 18 PL, 17 RU, калькуляторы, план видео, порядок публикации.
- `research/keywords/serp-summary-{en,pl,ru}.md`, `serp-summary-ru-pl.md`, `serp-summary-ru-de.md` — выдача по каждой фразе, домены, SERP-фичи, источники AI Overview.
- Служебные: `seeds-*.txt`, `candidates-*.txt`, `candidates2-*.txt`, `candidates3-*.txt`, `serp-*.txt`, `needs-metrics-*.txt`, `cost-log.csv`.
- `research/keywords/raw/` — сырые ответы, в `.gitignore`.
- **Скрипты** `scripts/dataforseo/`:
  - `client.ts` — авторизация из `.env.local`, кэш, журнал, ретраи, стоп по бюджету;
  - `run.ts` — платные шаги;
  - `build.ts` — сборка CSV без запросов;
  - `clusters.ts` — правила очистки и кластеров;
  - `slugs.ts` — утверждённые локальные слаги PL/RU (подставляются в `target_page` CSV);
  - `pool.ts`, `markets.ts`, `probe.ts`, `dump.ts`.
- **Запуск:** `npx tsx scripts/dataforseo/run.ts estimate` — смета; `npx tsx scripts/dataforseo/build.ts csv en` — пересборка CSV после правки правил, бесплатно.
- `tsx` добавлен в devDependencies.

## Решения владельца (17.09.2026)

1. **Слаги.** Для документов PL/RU — локальные слаги (см. карту и `scripts/dataforseo/slugs.ts`).
2. **EN-слаги до запуска:** `retail-price-architecture`, `sell-in-vs-sell-through`, `sell-through-rate`.
3. **H1 двух EN-услуг** меняются: Merchandise Planning; Merchandise Financial Planning and Open-to-Buy.
4. **Новые статьи.** Все новые статьи пишутся. Рубрика Careers / Kariera / Карьера создаётся, под неё добавлены статьи EN № 19 и PL № 18, статья RU № 17 перенаправлена на байера и категорийного менеджера.
5. **Имя.** На русских страницах имя пишется только по-русски. `alternateName` обязателен: Tatsiana Bandziuk, Tatiana Bandziuk, Tatsiana Lustenkova, Татьяна Бандюк (в `src/lib/schema/identity.ts` уже есть). `sameAs` дополнится позже.
6. **Везде «Бандюк».** Бриф исправлен (3 места). «Бандзюк» остался только в `docs/tasks/00-README.md` и `02-copywriting.md` как запрещённое написание для проверки.
7. **Калькуляторы делаем,** список и спрос — в `blog-plan.md`.
8. **RU-часть** работает на доверие и ИИ-ответы. Выдача по PL-ru/DE-ru снята.
9. **Срок ответа — один рабочий день.** Исправлено в текстах сайта: `src/content/fallback/{en,pl,ru}/index.ts` и попап в `src/app/[lang]/layout.tsx`. Не менялся срок ответа на вопросы по политике конфиденциальности (EN): это отдельное обязательство по GDPR.
10. **Видео планируется,** план — в `blog-plan.md`.

Попутно в `knowsAbout` разметки Person «Range management» заменён на «Merchandise planning» — по решению 3.

## Открытые вопросы

1. **Сегменты разделов.** Локализовать ли их тоже (`/pl/uslugi`, `/pl/o-mnie`, `/ru/uslugi`, `/ru/obo-mne` и т. д.) или локальными будут только слаги документов? Варианты указаны в карте.
2. **Калькуляторы.** Делать ли их ещё и отдельными страницами (например, `/tools/margin-calculator`)? Встроенный в статью калькулятор почти не имеет шансов по «margin calculator» (27 100 / 110 000). Отдельная страница — новый раздел сайта.
3. **Видео.** Один YouTube-канал с плейлистами по языкам или три канала? Появляется ли Татьяна в кадре и за кадром (решает она сама, после презентации)?