# Карта ключевых слов tatsianabandziuk.com

Версия 1.0 · 17.09.2026 · данные DataForSEO (Google Ads + Labs + выдача Google), собраны 17.09.2026.
Исходные таблицы: `research/keywords/{en,pl,ru}.csv`. Сводки выдачи: `research/keywords/serp-summary-{en,pl,ru}.md`. План блога: `research/blog-plan.md`. Выводы и расходы: `research/keyword-report.md`.

## Как читать карту

- **Объём** — среднемесячные запросы Google Ads за последние 12 месяцев на основном рынке языка:
  - EN — Великобритания, в скобках США;
  - PL — Польша;
  - RU — Казахстан, в скобках Украина с языком `ru` (если есть).
- **«<10»** — Google не показывает объём, то есть меньше 10 запросов в месяц. **KD** — сложность (0–100) по DataForSEO Labs, указана там, где она есть.
- У каждой страницы один основной кластер. Одна и та же фраза не стоит основным запросом на двух страницах.
- Для страниц с нулевым спросом основной запрос выбран по смыслу страницы и выдаче. Такие страницы нужны для заявок, доверия и ответов ИИ-систем, а не для трафика. Это отмечено словами «спроса нет».
- **Title** — до 60 символов, **Description** — до 155 (проверено скриптом). **H1–H3** написаны по правилу из `docs/tasks/00-README.md`: каждый заголовок понятен без контекста и содержит ключевую фразу раздела.
- **FAQ** — вопросы для блока FAQ. Пометка «(PAA)» значит, что вопрос взят из блока Google «Похожие вопросы» (People Also Ask). Формулировка при этом может быть уточнена под fashion-ритейл, исходные вопросы — в `serp-summary-*.md`.
- **Слаг.** Для документов PL и RU (услуги, кейсы, статьи, рубрики) используются локальные слаги из этой карты: польский без диакритики, русский латинской транслитерацией. Сегменты разделов (`/services`, `/blog`, `/case-studies`, `/about` и т. д.) в карте пока английские, см. открытый вопрос ниже.
- Страницы со статусом `new:` — новые статьи, их ещё нет на сайте. Они описаны в `blog-plan.md`.
- Все цифры в кейсах на сайте — заглушки. Ключевые слова кейсов от цифр не зависят.

## Решения владельца (17.09.2026)

Эти решения обязательны для заданий 02 и 03.

1. **Локальные слаги** для PL и RU — как в этой карте.
2. **Новые EN-слаги:** `retail-price-architecture` (было `price-ladder-analysis`), `sell-in-vs-sell-through` (было `sell-through-vs-finance`), `sell-through-rate` (было `sell-through-rate-power-bi`). Остальные EN-слаги не меняются.
3. **Новые H1 EN-услуг:** «Assortment Planning and Merchandise Planning Consulting for Fashion Retail» и «Excel Models for Merchandise Financial Planning and Open-to-Buy».
4. **Все новые статьи из `blog-plan.md` пишутся.** Добавлена рубрика **Careers** (PL — Kariera, RU — Карьера), см. ниже.
5. **Имя на русских страницах — только по-русски: «Татьяна Бандюк».** Латинского написания в видимом тексте RU-страниц нет. В разметке `Person.alternateName` на всех языках: Tatsiana Bandziuk, Tatiana Bandziuk, Tatsiana Lustenkova, Татьяна Бандюк. `sameAs` пополнится ссылками на профили позже.
6. **Везде «Бандюк»,** написание «Бандзюк» не используется.
7. **Калькуляторы делаем:**
   - маржа/наценка — в статьях о марже на трёх языках;
   - sell-through — в статье о sell-through;
   - GMROI и stock turn — в статье о KPI;
   - оборачиваемость — в статьях PL/RU.

   Спрос см. в `blog-plan.md`.
8. **Русскоязычная часть работает на доверие и ИИ-ответы.** Выдача для русскоязычных в Польше и Германии снята: `serp-summary-ru-pl.md`, `serp-summary-ru-de.md`.
9. **Срок ответа на заявку — один рабочий день** (EN «within one working day», PL «w ciągu jednego dnia roboczego», RU «в течение одного рабочего дня»). В текстах сайта уже исправлено.
10. **Видео планируется,** план — в `blog-plan.md`.

### Дополнительные решения (17.09.2026, после задания 02)

11. **Разделы в адресах тоже локализованы.** Карта сегментов — в `src/lib/routing.ts`. Старые английские сегменты под `/pl` и `/ru` отдают редирект 308.

    | Раздел | EN | PL | RU |
    |---|---|---|---|
    | Услуги | `/services` | `/pl/uslugi` | `/ru/uslugi` |
    | Кейсы | `/case-studies` | `/pl/case-study` | `/ru/kejsy` |
    | Блог | `/blog` | `/pl/blog` | `/ru/blog` |
    | Рубрика | `/blog/category` | `/pl/blog/kategoria` | `/ru/blog/rubrika` |
    | Обо мне | `/about` | `/pl/o-mnie` | `/ru/obo-mne` |
    | Контакты | `/contact` | `/pl/kontakt` | `/ru/kontakty` |
    | Курсы | `/courses` | `/pl/kursy` | `/ru/kursy` |
    | Шаблоны | `/free-templates` | `/pl/darmowe-szablony` | `/ru/besplatnye-shablony` |
    | Калькуляторы | `/tools` | `/pl/kalkulatory` | `/ru/kalkulyatory` |

12. **Отдельные страницы калькуляторов** — пять на каждом языке (см. раздел «Калькуляторы» ниже), плюс страница-список.
13. **FAQ-блоки** есть на всех страницах: списки услуг, кейсов, блога и калькуляторов; «Обо мне»; курсы; шаблоны; каждый кейс, рубрика и статья. Вопросы для них — в этой карте.
14. **Политика конфиденциальности** перенесена из проекта bandziuk. Контролёр данных — JDG Aliaksandr Bandziuk, e-mail info@bandziuk.com. Ключевые слова для неё не нужны.
15. **Проверка запрещённых слов** не нужна (`FORBIDDEN_TERMS` не используется).

## Калькуляторы (отдельные страницы)

Спрос: UK (US) для EN, Польша для PL, Казахстан (Украина-ru) для RU.

| Ключ | EN `/tools/…` | PL `/pl/kalkulatory/…` | RU `/ru/kalkulyatory/…` | Основной запрос EN / PL / RU |
|---|---|---|---|---|
| margin-calculator | `margin-calculator` | `kalkulator-marzy` | `kalkulyator-marzhi` | margin calculator 27 100 (110 000) · kalkulator marży 2900 · калькулятор маржи 140 (110) |
| sell-through-calculator | `sell-through-calculator` | `kalkulator-sell-through` | `kalkulyator-sell-through` | sell through calculator 40 (170) · <10 · <10 |
| stock-turn-calculator | `stock-turn-calculator` | `kalkulator-rotacji-zapasow` | `kalkulyator-oborachivaemosti` | stock turn calculator 20 (10) · kalkulator rotacji zapasów 10 · <10 |
| gmroi-calculator | `gmroi-calculator` | `kalkulator-gmroi` | `kalkulyator-gmroi` | gmroi calculator 10 (30) · <10 · <10 |
| open-to-buy-calculator | `open-to-buy-calculator` | `kalkulator-open-to-buy` | `kalkulyator-byudzheta-zakupok` | open to buy calculator 10 (10) · <10 · <10 |

**Вторичные запросы для калькулятора маржи:**
- EN: gross margin calculator 1900 (12 100), markup calculator 1900 (18 100), margin and markup calculator 260 (1300), retail margin calculator 70 (590);
- PL: kalkulator marży i narzutu 170, kalkulator narzutu 110;
- RU: калькулятор маржинальности 140 (110), калькулятор наценки 10 (20).

**Без каннибализации:** статьи о марже держат информационные запросы (markup vs margin, jak obliczyć marżę, маржа и наценка разница), а страницы калькуляторов — инструментальные. Статья и страница ссылаются друг на друга.

---

# EN (United Kingdom, US для объёмов)

## Главная `/`

- **Основной:** retail analytics consultant — 20 (US 40)
- **Вторичные:**
  - retail data analytics — 140 (390), KD 1
  - retail analytics — 110 (590), KD 0
  - merchandising consultant — 30 (50)
  - fashion business consultant — 20 (50)
  - fashion retail consultant — 10 (10)
  - fashion analytics — 10 (40)
  - Tatsiana Bandziuk — <10 (цель №1 брифа)
- **Title:** Tatsiana Bandziuk — Retail & Fashion Analytics Consultant
- **Description:** Retail and fashion analytics consultant in Warsaw: assortment planning, retail pricing, Power BI dashboards and PLM product data. Work in EN, PL, RU.
- **H1:** Tatsiana Bandziuk, Retail and Fashion Analytics Consultant
- **H2:**
  - Retail Analytics Consulting Services for Fashion and Retail Brands
  - Retail Analytics Consulting Results in Numbers
  - How a Retail Analytics Consulting Project Works
  - Retail and Fashion Analytics Case Studies
  - Retail Analytics Tools: Power BI, Excel and PLM Systems
  - Education in Logistics, Economics and Management
  - Retail Analytics Consultant FAQ
  - Retail Analytics Articles on Power BI, Pricing and Assortment
  - Contact Tatsiana Bandziuk about a Retail Analytics Project
- **FAQ:**
  - What does a retail analytics consultant do? (PAA: «What does an analytics consultant do?»)
  - What is retail analytics? (PAA)
  - What are the 5 KPIs in retail? (PAA → ссылка на статью о retail KPIs)
  - How long does a retail analytics consulting project take?
  - Which data do you need to start a retail analytics project?
  - Do you work with fashion brands outside Poland?
- **Слаг:** `/`
- **Выдача:** агентства (vidi-corp, ascendanalytics, cleartelligence), indeed, McKinsey. Личных сайтов консультантов нет. AI Overview есть почти во всех выдачах.

## Услуги `/services`

- **Основной:** retail analytics consulting — 20 (40)
- **Вторичные:**
  - retail consulting services — 70 (110)
  - retail analytics services — 10 (40)
  - merchandise planning consulting — 10 (10)
  - retail consultancy — 210 (480): общий запрос, только в тексте
- **Title:** Retail Analytics Consulting Services for Fashion Brands
- **Description:** Assortment planning, retail pricing analysis, Power BI dashboards, Excel planning models and PLM product data consulting for fashion and retail brands.
- **H1:** Retail and Fashion Analytics Consulting Services
- **H2:**
  - Six Retail Analytics Consulting Services for Fashion Brands
  - Retail Analytics Consulting Formats: Diagnostic, Project, Ongoing Support
  - Which Retail and Fashion Companies These Consulting Services Suit
  - Retail Analytics Consulting Services FAQ
- **FAQ:**
  - What does a retail consultant do? (PAA)
  - What is included in the two-week retail data diagnostic?
  - How is a retail analytics consulting project scoped and priced?
  - Can you work with our existing ERP, PLM and Power BI setup?
  - Do you work remotely or on site?
- **Слаг:** `/services`

## Услуга `/services/assortment-planning`

- **Основной:** assortment planning — 40 (260), KD 0
- **Вторичные:**
  - merchandise planning — 50 (320)
  - merchandise plan — 50 (320)
  - category management consultant — 40 (90)
  - retail assortment planning — 10 (90)
  - assortment planning in fashion — 10 (20)
  - merchandise planning consulting — 10 (10)
  - assortment planning consultant — <10
- **Title:** Assortment Planning Consulting for Fashion Retail
- **Description:** Assortment and merchandise planning for fashion brands: range architecture, size and colour curves, open-to-buy and in-season monitoring. Warsaw.
- **H1:** Assortment Planning and Merchandise Planning Consulting for Fashion Retail. Утверждено 17.09.2026, было «Range Management» (без спроса).
- **H2 / H3:**
  - H2 Assortment Planning Problems This Consulting Service Solves
  - H2 What the Assortment Planning Consulting Work Includes
    - H3 Range Architecture Review by Category and Price Tier
    - H3 Size and Colour Curve Calculation from Cleaned Sales Data
    - H3 Merchandise Plan and Open-to-Buy Model in Excel
    - H3 In-Season Assortment Monitoring in Power BI
    - H3 Handover Workshops for Buying and Merchandise Planning Teams
  - H2 Assortment Planning Results for Fashion Brands
  - H2 Tools Used in Assortment Planning Projects
  - H2 Assortment Planning Consulting FAQ
- **FAQ:**
  - What is assortment planning in fashion retail? (PAA)
  - What is the difference between assortment planning and merchandise planning?
  - Which sales history is needed for an assortment plan?
  - Can one assortment plan work for several markets?
  - Do we need assortment planning software before hiring a consultant?
  - Who maintains the merchandise plan after the project?
- **Слаг:** `/services/assortment-planning`, оставить.
- **Выдача:** в топе только вендоры ПО (Board, Centric, Toolio, RELEX, o9). Страница консультанта с определением в первом абзаце — свободная ниша, в том числе для AI Overview. «range plan» и «range planning fashion» вынесены в отдельную статью: выдача по ним информационная.

## Услуга `/services/retail-pricing-analysis`

- **Основной:** retail pricing analysis — 10 (10)
- **Вторичные:**
  - pricing analysis — 70 (590)
  - price architecture — 50 (70): в выдаче архитектура зданий, использовать только как «retail price architecture»
  - pricing consultant — 20 (50)
  - good better best pricing — 10 (70)
  - retail price points — 10 (50)
- **Title:** Retail Pricing Analysis and Price Architecture Consulting
- **Description:** Retail pricing analysis for fashion brands: price architecture audit, good-better-best tiers, cross-market price alignment and markdown scenarios.
- **H1:** Retail Pricing Analysis and Price Architecture Across Markets
- **H2 / H3:**
  - H2 Retail Pricing Problems This Analysis Solves
  - H2 What the Retail Pricing Analysis Includes
    - H3 Price Architecture Audit per Category
    - H3 Cross-Market Price Alignment Rules
    - H3 Margin and Markdown Scenario Model in Excel
    - H3 Weekly Price and Margin Monitoring in Power BI
  - H2 Retail Pricing Analysis Results
  - H2 Tools Used in Retail Pricing Projects
  - H2 Retail Pricing Analysis FAQ
- **FAQ:**
  - What is price architecture in retail?
  - What is good-better-best pricing?
  - Which data is needed for a retail pricing analysis?
  - How do you align retail prices across markets and currencies?
  - Can markdown scenarios be tested before the season?
  - Do you compare our prices with competitors?
- **Слаг:** оставить.
- **Выдача:** «pricing analyst» (390 / US 1900) — это вакансии, основным запросом его брать нельзя. «retail pricing» (1300) отдан статье о ценовой стратегии: выдача по нему информационная.

## Услуга `/services/power-bi-dashboards`

- **Основной:** power bi consultant — 320 (590), KD 0
- **Вторичные:**
  - power bi consultancy — 320 (590)
  - power bi consultant uk — 20 (10)
  - power bi freelancer — 20 (50)
  - hire power bi consultant — 10 (50)
  - freelance power bi developer — 10 (10)
- **Title:** Power BI Consultant for Retail and Fashion Dashboards
- **Description:** Power BI consultant for fashion and retail brands: data model, DAX measures and dashboards for sell-through, stock cover, margin and returns.
- **H1:** Power BI Consultant for Retail Sales and Assortment Dashboards
- **H2 / H3:**
  - H2 Retail Reporting Problems a Power BI Consultant Solves
  - H2 What the Power BI Dashboard Work Includes
    - H3 Retail KPI Definition Sheet Agreed with the Teams
    - H3 Retail Data Model in Power BI
    - H3 DAX Measures for Sell-Through, Stock Cover and Margin
    - H3 Power BI Report Pages Built Around Trading Meetings
    - H3 Refresh, Row-Level Security and Handover
  - H2 Results of Power BI Retail Dashboard Projects
  - H2 Tools Used in Power BI Dashboard Projects
  - H2 Power BI Consultant FAQ
- **FAQ:**
  - What does a Power BI consultant do? (PAA)
  - What does a good retail dashboard look like? (PAA)
  - Which data do you need to build retail KPI dashboards?
  - Do we need Power BI Pro, Premium or Fabric?
  - Can each market see only its own numbers?
  - How long does a Power BI dashboard project take?
- **Слаг:** оставить.
- **Выдача:** вакансии indeed, британские агентства, reddit. AI Overview ссылается на reddit и upwork. Самый большой коммерческий запрос EN-части. Запросы про примеры дашбордов (power bi dashboard examples, sales dashboard) отданы статье `new:/blog/power-bi-retail-dashboard-examples`: в выдаче по ним примеры, а не подрядчики.

## Услуга `/services/excel-retail-planning-models`

- **Основной:** merchandise financial planning — 10 (50)
- **Вторичные:**
  - merchandise budget planning — 10 (10)
  - assortment planning excel — 10 (10)
  - excel for retail — 10 (10)
  - merchandise financial planning excel — <10
  - buying and merchandising excel — <10
- **Title:** Excel Merchandise Financial Planning and OTB Models
- **Description:** Merchandise financial planning in Excel: open-to-buy, buy plan and margin models for fashion and retail planners, built for the team to maintain.
- **H1:** Excel Models for Merchandise Financial Planning and Open-to-Buy. Утверждено 17.09.2026, было «Merchandising Analysis» (без спроса).
- **H2 / H3:**
  - H2 Merchandise Planning Problems These Excel Models Solve
  - H2 What the Excel Merchandise Financial Planning Work Includes
    - H3 Open-to-Buy Sheet with Monthly Phasing
    - H3 Buy Plan and Margin Calculation by Market
    - H3 Scenario Comparison Without File Copies
    - H3 Built-In Checks and a Maintenance Guide
  - H2 Results of Excel Merchandise Planning Models
  - H2 Excel and Power Query Tools Used in Planning Models
  - H2 Excel Merchandise Financial Planning FAQ
- **FAQ:**
  - What is merchandise financial planning?
  - Why build the merchandise plan in Excel and not in planning software?
  - Can you rebuild our existing buy plan workbook?
  - Which Excel version is needed?
  - How does the model handle several markets and currencies?
- **Слаг:** `/services/excel-retail-planning-models`, без изменений.
- **Выдача:** Anaplan, Centric, Blue Yonder, Board, Gartner. Excel-подход в выдаче никто не занимает.

## Услуга `/services/product-data-quality-plm`

- **Основной:** product data quality — 10 (30)
- **Вторичные:**
  - product master data management — 50 (110)
  - product data enrichment — 20 (50)
  - product data governance — 10 (30)
  - product data standards — 10 (10)
  - ecommerce product data — 10 (40)
  - product data management — 140 (590): в выдаче инженерные PDM (PTC, Autodesk), использовать только с «fashion»
- **Title:** Product Data Quality and PLM Standards for Fashion Brands
- **Description:** Product data quality for fashion brands: attribute dictionary, PLM validation rules, product master data governance and a data quality dashboard.
- **H1:** Product Data Quality and PLM Data Standardisation for Fashion Brands. Как сейчас.
- **H2 / H3:**
  - H2 Product Data Quality Problems This PLM Service Solves
  - H2 What the Product Data Standardisation Work Includes
    - H3 Product Attribute Audit per Market
    - H3 Attribute Dictionary Agreed with All Markets
    - H3 Migration Rules and PLM Entry Validation
    - H3 Product Data Quality Dashboard and Monthly Review
  - H2 Product Data Quality Results
  - H2 Tools Used in PLM Product Data Projects
  - H2 Product Data Quality and PLM FAQ
- **FAQ:**
  - What is product data quality?
  - What is the difference between PLM and PIM?
  - Which PLM systems do you work with?
  - How long does it take to agree an attribute dictionary?
  - Can historic product data be cleaned too?
  - Who owns product data governance after the project?
- **Слаг:** оставить.
- **Выдача:** «data governance», «master data management», «data quality» — большие общие темы, в них доминируют вендоры и Wikipedia. Для нас это P3.

## Услуга `/services/retail-analytics-processes`

- **Основной:** retail reporting — 70 (210), KD 4. Выдача про отраслевые отчёты (ONS, Retail Economics), попадание слабое.
- **Вторичные:**
  - weekly trading report — <10
  - retail trading report — <10
  - kpi definitions — общий запрос, только в тексте
- **Title:** Retail Reporting Process and Analytics Team Setup
- **Description:** Retail reporting process for fashion brands: reporting calendar, KPI definitions, report owners and weekly review rituals that end in decisions.
- **H1:** Setting Up Retail Reporting Processes and Analytics Teams
- **H2 / H3:**
  - H2 Retail Reporting Problems This Process Setup Solves
  - H2 What the Retail Reporting Process Work Includes
    - H3 Retail Reporting Calendar
    - H3 Report Ownership Matrix
    - H3 KPI Definitions and Data Standards Playbook
    - H3 Weekly Trading Review and Decision Log
  - H2 Results of Retail Reporting Process Projects
  - H2 Tools Used in Retail Reporting Process Projects
  - H2 Retail Reporting Process FAQ
- **FAQ:**
  - What should a weekly retail trading report include?
  - Who should own each retail KPI?
  - Is a reporting process worth it for a small brand team?
  - Do you work with our existing reports and tools?
  - Can you train the team that will run the reports?
- **Слаг:** оставить.
- **Примечание:** спроса почти нет. Страница нужна для заявок и цитирования, трафика она не даст.

## Кейсы `/case-studies`

- **Основной:** retail analytics case studies — 10 (10)
- **Вторичные:**
  - retail analytics case study — 10 (10)
  - fashion retail case study — 10 (10)
  - power bi case study — 10 (10)
- **Title:** Retail and Fashion Analytics Case Studies
- **Description:** Anonymised retail and fashion analytics case studies: assortment planning, retail pricing, Power BI reporting and PLM product data, with results.
- **H1:** Retail and Fashion Analytics Case Studies
- **H2:**
  - Retail Analytics Case Studies by Topic
  - Discuss a Similar Retail Analytics Project
- **FAQ:**
  - Are the retail analytics case study clients named?
  - How are the case study figures anonymised?
  - Can a similar project be done for our brand?
- **Слаг:** оставить.

### Кейсы (EN)

Основные запросы кейсов — длинные низкочастотные фразы (<10). Они не пересекаются с основными запросами услуг. Во всех кейсах одинаковая структура H2:
- Challenge;
- What Was Done;
- Results in Numbers;
- Tools Used;
- Related Service.

Каждый H2 содержит тему кейса (как сейчас в `caseStudies.ts`).

| Кейс | Основной | Вторичные | Title | H1 |
|---|---|---|---|---|
| `plm-product-data-standardisation` | PLM data standardisation case study (<10) | product attribute standardization (<10), plm data quality (<10) | PLM Product Data Standardisation Case Study | Standardising Product Data Across European and Asian Markets in a PLM System |
| `womenswear-range-plan-rebuild` | assortment planning case study (<10) | range planning fashion (50, ведёт на статью), womenswear range plan | Womenswear Range Plan Rebuild: Assortment Case Study | Rebuilding the Womenswear Range Plan for a European Fashion Distributor |
| `price-ladder-margin-report` | price architecture case study (<10) | retail margin report, good better best pricing | Price Architecture and Margin Report: Pricing Case Study | Building a Price Architecture and Margin Report for a Fashion E-commerce Retailer |
| `weekly-retail-trade-report` | power bi case study — 10 (10) | weekly trading report (<10), retail trading report (<10) | Weekly Retail Trading Report in Power BI: Case Study | Setting Up a Weekly Retail Trading Report in Power BI for a Multi-Brand Retailer |
| `menswear-size-curve-rebuild` | size curve analysis retail — 10 | size curves (20 / 50) | Menswear Size Curve Analysis After Stock-Outs: Case Study | Rebuilding Size Curves for a Menswear Brand After Two Seasons of Stock-Outs |
| `ecommerce-catalogue-attribute-cleaning` | product data cleansing — 10 (10) | attribute mapping (10 / 90), ecommerce product data (10 / 40) | Product Data Cleansing for a Fashion Catalogue Migration | Cleaning Product Data for a Fashion E-commerce Catalogue Migration |

**Description кейсов** (цифры-заглушки в description не выносим):

| Кейс | Description |
|---|---|
| `plm-product-data-standardisation` | Case study: one attribute dictionary, PLM validation rules and a data quality dashboard for a fashion brand selling in Europe and Asia. |
| `womenswear-range-plan-rebuild` | Assortment planning case study: range architecture review, recalculated size curves and a new open-to-buy plan for a womenswear distributor. |
| `price-ladder-margin-report` | Pricing case study: price architecture audit, cross-market pricing rules and a weekly Power BI margin report for a fashion e-commerce retailer. |
| `weekly-retail-trade-report` | Power BI case study: agreed KPI definitions and one weekly retail trading report that replaced four competing spreadsheets. |
| `menswear-size-curve-rebuild` | Size curve analysis case study: stock-outs and returns removed from sales history before size curves were rebuilt for a menswear brand. |
| `ecommerce-catalogue-attribute-cleaning` | Product data cleansing case study: attribute mapping and validation rules agreed before a fashion e-commerce catalogue migration. |

FAQ кейсов (3 вопроса, одинаковый шаблон):
- How long did the {тема} project take?
- Which data was needed?
- What changed for the team after the project?

---

## Блог `/blog`

- **Основной:** retail analytics blog — 0 (US 10). Спроса нет, страница — хаб.
- **Вторичные:**
  - merchandising blog — 10 (10)
  - power bi blog — отдан рубрике Power BI
- **Title:** Retail Analytics Blog: Power BI, Excel and Assortment
- **Description:** Practical articles on retail KPIs, sell-through, open-to-buy, pricing, PLM product data and Power BI for fashion and retail teams, with formulas.
- **H1:** Retail Analytics Blog: Power BI, Excel and Assortment Planning
- **H2:**
  - Featured Retail Analytics Article
  - Retail Analytics Articles by Topic
  - Free Retail Planning Templates for Blog Readers
- **FAQ:**
  - Who writes the retail analytics blog?
  - How often are new retail analytics articles published?
  - Can I suggest a topic for the blog?

### Рубрики (EN)

**`/blog/category/power-bi`**
- **Основной:** power bi for retail — 10 (10)
- **Вторичные:** power bi blog — 390 (590): навигационный запрос к блогу Microsoft, шанс невелик
- **Title:** Power BI for Retail: DAX, Dashboards and Guides
- **Description:** Power BI articles for retail teams: DAX measures, sell-through and stock cover reporting, row-level security and dashboard examples.
- **H1:** Power BI for Retail Analytics: Articles and Guides
- **H2:** Power BI Articles for Retail Reporting · Power BI Consulting for Retail Brands
- **FAQ:**
  - Is Power BI suitable for a small fashion brand?
  - Which Power BI licence does a retail team need?
  - Power BI or Excel for retail reporting?

**`/blog/category/assortment`**
- **Основной:** merchandising blog — 10 (10)
- **Вторичные:** what is assortment planning, range planning fashion (обе ведут на статьи)
- **Title:** Assortment and Merchandise Planning Articles
- **Description:** Articles on assortment and merchandise planning in fashion retail: range plans, size curves, ABC analysis and buy planning with examples.
- **H1:** Assortment and Merchandise Planning Articles for Fashion Retail
- **H2:** Assortment Planning Articles · Assortment Planning Consulting
- **FAQ:**
  - What is the difference between range planning and assortment planning?
  - Where should a small brand start with assortment planning?
  - How often should a range plan be reviewed?

**`/blog/category/pricing`**
- **Основной:** retail pricing articles (<10, спроса нет)
- **Вторичные:** retail pricing (1300, ведёт на статью), markdown vs markup (140, ведёт на статью)
- **Title:** Retail Pricing, Markup and Markdown Articles
- **Description:** Retail pricing articles for fashion brands: price architecture, markup vs margin, markdown strategy and pricing across markets.
- **H1:** Retail Pricing, Margin and Markdown Articles
- **H2:** Retail Pricing Articles · Retail Pricing Analysis Service
- **FAQ:**
  - What is the difference between markup and margin?
  - When should markdowns start?
  - How is a price architecture built?

**`/blog/category/product-data`**
- **Основной:** product data articles (<10, спроса нет)
- **Вторичные:** what is plm (390, ведёт на статью), product attributes (50)
- **Title:** Product Data, PIM and PLM Articles for Fashion Brands
- **Description:** Product data articles for fashion brands: PIM vs PLM, product attribute dictionaries, data quality checks and governance across markets.
- **H1:** Product Data, PIM and PLM Articles for Fashion Brands
- **H2:** Product Data Articles · Product Data Quality Service
- **FAQ:**
  - What is the difference between PIM and PLM?
  - Who should own product data in a fashion brand?
  - How do you measure product data quality?

**`/blog/category/excel`**
- **Основной:** excel for retail — 10 (10)
- **Вторичные:** open to buy (70, ведёт на статью), abc analysis (260, ведёт на статью)
- **Title:** Excel for Retail Planning: Articles and Templates
- **Description:** Excel articles for retail planners: open-to-buy models, ABC analysis, buy plans and margin calculations, plus free templates to download.
- **H1:** Excel for Retail Planning: Articles and Templates
- **H2:** Excel Articles for Retail Planners · Free Excel Templates for Retail Planning
- **FAQ:**
  - Which Excel skills does a merchandise planner need?
  - Is Excel enough for open-to-buy planning?
  - When should a retail team move from Excel to Power BI?

**`/blog/category/careers`** — новая рубрика (решение 17.09.2026)
- **Основной:** careers in fashion business — 50 (170)
- **Вторичные:**
  - fashion industry careers — 260 (880): общий запрос, в выдаче вероятны вакансии
  - retail analyst career — 10 (10)
  - fashion analyst career — <10
  - статьи рубрики: merchandise planner career — 50 (390), how to become a fashion buyer — 70 (170), retail analyst — 70 (170)
- **Title:** Careers in Fashion Business: Analyst, Planner, Buyer
- **Description:** Articles on analytics careers in fashion retail: what brand analysts, merchandise planners and buyers do, which skills they need and how to start.
- **H1:** Careers in Fashion Business: Analyst, Merchandise Planner and Buyer Roles
- **H2:** Fashion Retail Career Articles · How Analyst, Planner and Buyer Roles Differ
- **FAQ:**
  - What does a merchandise planner do?
  - How do you become a fashion buyer?
  - Which skills does a retail analyst need?
- **Слаг:** `careers`
- **Правило сдержанности:** рубрика объясняет профессии и навыки. Никаких формулировок от первого лица о поиске работы, никаких CV и «open to work».

### Статьи (EN, текущие 8)

**`/blog/sell-through-rate`** (было `sell-through-rate-power-bi`) — расширить (P1)
- **Основной:** sell through rate — 170 (2400), KD 5
- **Вторичные:**
  - sell through — 170 (1000)
  - what is sell through rate — 40 (260)
  - sell through formula — 30 (260)
  - how to calculate sell through rate — 30 (210)
  - what is a good sell through rate — 10 (90)
  - average sell through rate in fashion — 10 (10)
  - sell through rate formula excel — 10 (10)
- **Title:** Sell-Through Rate: Formula, Benchmarks and Power BI DAX
- **Description:** How to calculate sell-through rate, which denominator to use, what a good sell-through rate is in fashion, and DAX measures for a weekly curve.
- **H1:** How to Calculate Sell-Through Rate in Retail and Power BI
- **H2:**
  - Sell-Through Rate Definition Used in Retail Reporting
  - Sell-Through Rate Formula with Two Denominators
  - What Is a Good Sell-Through Rate in Fashion Retail
  - How to Calculate Sell-Through Rate in Excel
  - DAX Measures for Sell-Through Rate in Power BI
  - Weekly Sell-Through Curve in a Retail Dashboard
  - Common Sell-Through Rate Calculation Mistakes
- **FAQ:**
  - What is the sell-through rate formula? (PAA)
  - What is a good sell-through rate? (PAA)
  - What does sell-through mean? (PAA)
  - How do I calculate sell-through in Excel? (PAA)
  - What is the difference between sell-in and sell-through? (PAA)
- **Слаг:** `sell-through-rate` (утверждено).
- **Выдача:** reddit, Klipfolio, Lightspeed, SPS Commerce, Wall Street Prep. Специалистов по fashion-ритейлу нет, много шума про eBay. Хороший шанс для статьи с формулой и нормами по fashion.

**`/blog/size-curve-from-sales-data`** — оставить, уточнить формулировки (P2)
- **Основной:** size curve analysis — 10 (10). Голый «size curve» (20 / 50) в выдаче означает одежду больших размеров (New Look, ASOS curve), «size ratio» — соотношение сторон экрана.
- **Вторичные:**
  - size curve retail — 10 (10)
  - size curves — 20 (50)
  - how to calculate size curve — <10
- **Title:** Size Curve Analysis in Retail: Size Ratios from Sales Data
- **Description:** How to build a retail size curve from sales data: remove stock-outs, returns and promo weeks, then calculate size ratios per category and market.
- **H1:** How to Build a Retail Size Curve from Last Season's Sales Data
- **H2:**
  - What a Size Curve Means in Retail Buying
  - Why Raw Sales Data Gives a Wrong Size Curve
  - Three Steps to Clean Sales Data Before Size Curve Analysis
  - How to Calculate Size Ratios per Category in Excel
  - Size Curves per Market and Store Cluster
  - Size Integrity Monitoring After the Buy
- **FAQ:**
  - What is a size curve in retail buying?
  - How do you calculate a size curve from sales?
  - How do stock-outs distort a size curve?
  - How often should size curves be recalculated?
- **Слаг:** оставить.

**`/blog/product-attribute-standards-plm`** — оставить, переименовать (P2)
- **Основной:** product attributes — 50 (260), KD 0
- **Вторичные:**
  - product attribute dictionary — <10
  - product attribute management — <10
  - product attribute standardization — <10
  - data dictionary template — 50 (260): общий запрос, только в тексте
- **Title:** Product Attributes in Fashion PLM: A Dictionary That Works
- **Description:** Which product attributes a fashion brand needs in PLM and how to write rules for colour, season and composition that every market follows.
- **H1:** Product Attribute Standards for Fashion PLM That Work Across Markets
- **H2:**
  - Which Product Attributes a Fashion Brand Needs in PLM
  - Product Attribute Dictionary Structure
  - Colour Attribute Rules in a PLM Dictionary
  - Season Code Rules Across Markets
  - Composition Fields Without Free Text
  - How to Agree Product Attribute Standards with Markets
- **FAQ:**
  - What are product attributes? (PAA)
  - What are examples of product attributes in fashion? (PAA)
  - What are the different types of product attributes? (PAA)
  - Who should own the product attribute dictionary?
- **Слаг:** оставить.

**`/blog/retail-price-architecture`** (было `price-ladder-analysis`) — перенацелить (P2)
- **Основной:** price architecture — 50 (70), KD 0. В заголовках писать «retail price architecture».
- **Вторичные:**
  - price ladder — 90 (390): выдача про трейдинг и карточки, только в связке с retail
  - good better best pricing — 10 (70)
  - retail price points — 10 (50)
- **Title:** Retail Price Architecture: How to Read a Price Ladder
- **Description:** How to build a retail price architecture: entry, core and top price points, good-better-best tiers and what a gap in the price ladder costs.
- **H1:** How to Build and Read a Retail Price Architecture Before the Season
- **H2:**
  - Retail Price Architecture and Price Ladder Explained
  - Entry, Core and Top Price Points per Category
  - Good-Better-Best Pricing in Fashion Retail
  - What a Gap in the Retail Price Ladder Costs
  - How to Check a Price Ladder Against Sales Mix and Margin
  - Retail Price Architecture Across Markets and Currencies
- **FAQ:**
  - What is price architecture in retail?
  - What is a price ladder in retail?
  - What is good-better-best pricing?
  - How many price points should a category have?
- **Слаг:** `retail-price-architecture` (утверждено).

**`/blog/dax-measures-retail-kpi-dashboard`** — оставить (P1)
- **Основной:** dax measures — 110 (320)
- **Вторичные:**
  - dax running total — 10 (50)
  - dax retail — <10
  - power bi retail kpis — <10
- Общие KPI (retail kpis, stock turn, GMROI) вынесены в новую статью `retail-kpis-fashion-brands`, чтобы не было каннибализации.
- **Title:** DAX Measures for a Retail KPI Dashboard in Power BI
- **Description:** Five DAX measures for a retail KPI dashboard in Power BI: stock cover, full-price share, returns rate, weeks of supply and contribution margin.
- **H1:** Five DAX Measures Every Retail KPI Dashboard Needs
- **H2:**
  - DAX Measures vs Calculated Columns for Retail KPIs
  - Stock Cover Measure in DAX
  - Full-Price Sales Share Measure in DAX
  - Returns Rate Measure in DAX
  - Weeks of Supply Measure in DAX
  - Contribution Margin Measure in DAX
  - Running Total DAX Pattern for Season-to-Date KPIs
- **FAQ:**
  - What is a DAX measure in Power BI?
  - How do I create a running total in DAX?
  - Which retail KPIs should be DAX measures?
  - How do I check a DAX measure against Excel?
- **Слаг:** оставить.

**`/blog/open-to-buy-model-excel`** — оставить, расширить (P1)
- **Основной:** open to buy — 70 (390), KD 0
- **Вторичные:**
  - otb meaning — 480 (2900): выдача в основном про сленг, в тексте писать «OTB in retail»
  - open to buy definition — 30 (170)
  - open to buy formula — 10 (90)
  - what is open to buy in retail — 10 (50)
  - how to calculate open to buy — 10 (20)
  - open to buy example — 10 (20)
- **Title:** Open-to-Buy in Retail: Formula and Excel Model
- **Description:** What open-to-buy means in retail, the OTB formula with a worked example, and an Excel open-to-buy model that planners can keep up to date.
- **H1:** Open-to-Buy in Retail: Formula and an Excel Model Planners Maintain
- **H2:**
  - What Open-to-Buy Means in Retail
  - Open-to-Buy Formula with a Worked Example
  - Open-to-Buy Workbook Structure in Excel
  - Monthly Open-to-Buy Phasing by Category and Market
  - Three Checks That Stop Open-to-Buy Drift
  - Free Open-to-Buy Excel Template
- **FAQ:**
  - What does open to buy mean? (PAA)
  - How do you calculate open to buy? (PAA)
  - What does OTB mean in retail? (PAA)
  - What is an open-to-buy budget?
  - How often should open-to-buy be updated?
- **Слаг:** `open-to-buy-model-excel`, без изменений.
- **Выдача:** Board, Retalon, RetailDogma, Shopify, YouTube.

**`/blog/row-level-security-retail-reporting`** — оставить (P1)
- **Основной:** row level security power bi — 170 (390), KD 0
- **Вторичные:**
  - power bi rls — 70 (170)
  - dynamic row level security power bi — 10 (20)
  - dynamic rls power bi — 10 (10)
- **Title:** Row-Level Security in Power BI for Retail Reports
- **Description:** How to set up static and dynamic row-level security in Power BI so each market sees only its own numbers in one retail report.
- **H1:** Row-Level Security in Power BI for Multi-Market Retail Reporting
- **H2:**
  - What Row-Level Security in Power BI Does
  - Static vs Dynamic Row-Level Security for Retail Markets
  - Setting Up Market Roles in Power BI Row-Level Security
  - Testing Row-Level Security with View as Role
  - Row-Level Security Limits in Retail Reporting
- **FAQ:**
  - What is row-level security in Power BI? (PAA)
  - How do I check row-level security in Power BI? (PAA)
  - Should I use static or dynamic row-level security?
  - Does row-level security apply to report editors?
- **Слаг:** `row-level-security-retail-reporting`, без изменений.
- **Выдача:** Microsoft Learn, DataCamp, GeeksforGeeks, Tabular Editor. Отраслевой угол (несколько рынков) выделит статью.

**`/blog/sell-in-vs-sell-through`** (было `sell-through-vs-finance`) — переписать (P2)
- **Основной:** sell in vs sell through — 20 (260), KD 56
- **Вторичные:**
  - sell through vs sell out — 10 (10)
  - sell in sell through sell out — 10 (10)
- **Title:** Sell-In vs Sell-Through vs Sell-Out in Retail Reporting
- **Description:** Sell-in, sell-through and sell-out explained, and the three definition mismatches that make commercial and finance teams report different numbers.
- **H1:** Sell-In vs Sell-Through: Why Commercial and Finance Numbers Differ
- **H2:**
  - Sell-In, Sell-Through and Sell-Out Definitions
  - Three Sell-Through Definition Mismatches Between Teams
  - How to Agree One Sell-Through Definition with Finance
  - Sell-In vs Sell-Through in a Power BI Report
- **FAQ:**
  - What is the difference between sell-in and sell-through? (PAA)
  - What is the difference between sell-through and sell-out? (PAA)
  - Why does finance report a different sell-through number?
- **Слаг:** `sell-in-vs-sell-through` (утверждено).

---

## Обо мне `/about`

- **Основной:** Tatsiana Bandziuk (брендовый запрос; общий кластер с главной, на главной он основной). Здесь акцент на опыте.
- **Вторичные:**
  - fashion brand analyst — <10
  - global brand analyst — <10
  - product data lead — <10
- **Title:** About Tatsiana Bandziuk: Fashion Retail Analytics
- **Description:** Tatsiana Bandziuk: about ten years in international fashion retail as a brand analyst and product data lead. Assortment, pricing, PLM. Warsaw.
- **H1:** About Tatsiana Bandziuk, Retail and Fashion Analytics Consultant
- **H2:**
  - Global Brand Analyst and Product Data Lead Experience in International Fashion Retail
  - Assortment, Pricing and Product Data Projects
  - Leading Product Data and Analytics Teams
  - Career Timeline in Fashion Retail Analytics
  - Education in Logistics, Economics and Management at BSEU
  - Diplomas and Certificates in Logistics, Economics and Management
  - Working Languages and Location: English, Polish, Russian in Warsaw
- **FAQ:**
  - Where is Tatsiana Bandziuk based?
  - Which languages does Tatsiana Bandziuk work in?
  - What is Tatsiana Bandziuk's education?
  - Does Tatsiana Bandziuk take consulting projects?
- **Слаг:** `/about`
- **Выдача по имени:** pl.linkedin.com, facebook, instagram, rocketreach. Сайта пока нет.

## Контакты `/contact`

- **Основной:** retail consultant warsaw — <10 (спроса нет)
- **Вторичные:**
  - data analyst warsaw — 10 (10)
  - hire retail consultant — <10
- **Title:** Contact Tatsiana Bandziuk — Retail Analytics Consultant
- **Description:** Send a retail analytics enquiry to Tatsiana Bandziuk: assortment, pricing, Power BI or product data. Reply within one working day, EN / PL / RU.
- **H1:** Contact Tatsiana Bandziuk about a Retail Analytics Consulting Project
- **H2:**
  - How a Retail Analytics Enquiry Works: Reply, Call, Scope
  - Retail Analytics Enquiry Form
  - Consultation Languages and Location in Warsaw
  - Retail Analytics Enquiry FAQ
- **FAQ:**
  - How fast do you reply to an enquiry?
  - Can the first call be in Polish or Russian?
  - What should the enquiry include?
  - Do you sign an NDA before seeing our data?

## Курсы `/courses`

- **Основной:** power bi training uk — 140 (10)
- **Вторичные:**
  - merchandising course — 90 (50)
  - retail analytics course — 10 (10)
  - merchandise planning course — 10 (10)
  - power bi course for retail — <10
  - power bi course — 2900 (2400): общий запрос, страница листа ожидания по нему не ранжируется
- **Title:** Power BI and Excel Courses for Retail Analysts
- **Description:** Upcoming Power BI and Excel courses for retail and fashion analysts: KPI reporting, open-to-buy, pricing and product data. Join the waitlist.
- **H1:** Power BI and Excel Courses for Retail and Fashion Analysts
- **H2:**
  - Power BI and Excel Course Modules for Retail Analysts
  - Who the Retail Analytics Courses Are For
  - Join the Retail Analytics Course Waitlist
  - Free Retail Planning Templates While You Wait
- **FAQ:**
  - When will the retail analytics courses start?
  - Will the Power BI course be online?
  - Which languages will the courses be taught in?
  - Do I need Power BI experience to join?

## Шаблоны `/free-templates`

- **Основной:** open to buy template excel — 10 (20)
- **Вторичные:**
  - kpi dashboard template — 50 (210)
  - weekly sales report template — 20 (90)
  - retail kpi dashboard excel template — 10 (10)
  - open to buy calculator — 10 (10)
  - excel dashboard template — 390 (1300) и free excel templates — 170 (1000): общие запросы, только в тексте
- **Title:** Free Open-to-Buy Excel Template and KPI Checklist
- **Description:** Free open-to-buy Excel template for retail planners and a retail KPI dashboard checklist for Power BI. Structured, documented, ready to adapt.
- **H1:** Free Open-to-Buy Excel Template and Retail KPI Dashboard Checklist
- **H2:**
  - Open-to-Buy Excel Template for Retail Planning
  - Retail KPI Dashboard Checklist for Power BI
  - What Is Inside the Open-to-Buy Excel Template
  - How to Use the Open-to-Buy Template in a Planning Cycle
  - Download the Free Retail Planning Templates
- **FAQ:**
  - Is the open-to-buy Excel template free?
  - Which Excel version does the template need?
  - Can the template handle several markets?
  - How is the KPI dashboard checklist used?
- **Выдача:** RetailDogma, Toolio, Inventory Planner, Shopify.

---

# PL (Polska)

Спрос в PL на профильные термины ниже 10 почти везде. Реальный спрос есть у смежных тем:
- маржа и наценка;
- ABC-анализ;
- оборачиваемость запасов (rotacja zapasów);
- отчёты Power BI;
- PIM/PLM;
- ценовая политика.

Эти темы вынесены в новые статьи (`blog-plan.md`). Страницы услуг получили ближайшие польские формулировки.

## Główna `/pl`

- **Основной:** analityka sprzedaży — 70
- **Вторичные:**
  - analiza sprzedaży — 110
  - analiza danych sprzedażowych — 40
  - analityk sprzedaży — 70 (выдача: вакансии)
  - retail analytics — 10
  - Tatsiana Bandziuk — <10
- **Title:** Tatsiana Bandziuk — analityka sprzedaży w handlu i modzie
- **Description:** Konsultantka ds. analityki w handlu i modzie z Warszawy: planowanie asortymentu, analiza cen, raportowanie sprzedaży w Power BI i dane produktowe.
- **H1:** Tatsiana Bandziuk — konsultantka ds. analityki sprzedaży w handlu i modzie
- **H2:**
  - Usługi analityki sprzedaży dla marek modowych i handlowych
  - Wyniki projektów analityki sprzedaży w liczbach
  - Jak przebiega projekt analityki sprzedaży
  - Case study z analityki w handlu i modzie
  - Narzędzia analityki sprzedaży: Power BI, Excel i systemy PLM
  - Wykształcenie w logistyce, ekonomii i zarządzaniu
  - Analityka sprzedaży w handlu — najczęstsze pytania
  - Artykuły o analityce sprzedaży, cenach i asortymencie
  - Kontakt w sprawie projektu analityki sprzedaży
- **FAQ:**
  - Czym zajmuje się konsultantka ds. analityki sprzedaży?
  - Na czym polega analiza sprzedaży w handlu?
  - Jakie są najważniejsze wskaźniki sprzedaży? (PAA)
  - Ile trwa projekt analityki sprzedaży?
  - Jakie dane są potrzebne na start?
  - Czy konsultacja może odbyć się po polsku?
- **Слаг:** `/pl`
- **Выдача:** «analiza sprzedaży» — elzab, vizyble, mfiles. Консультантов в топе нет.

## Usługi `/pl/services`

- **Основной:** analityka dla firm handlowych (<10, спроса нет)
- **Вторичные:**
  - analiza danych dla firm — <10
  - outsourcing analityki — <10
  - analityk danych na zlecenie — <10
  - doradztwo biznesowe — 590: общий запрос, только в тексте
- **Title:** Usługi analityczne dla handlu i marek modowych
- **Description:** Planowanie asortymentu, analiza cen, raporty Power BI, modele Excel i jakość danych produktowych. Analityka dla marek modowych, także na zlecenie.
- **H1:** Usługi analityki w handlu i modzie
- **H2:**
  - Sześć usług analitycznych dla marek modowych i handlowych
  - Formy współpracy: diagnoza danych, projekt, stałe wsparcie analityczne
  - Dla jakich firm są usługi analityki handlowej
  - Usługi analityczne dla handlu — pytania
- **FAQ:**
  - Czy analitykę można zlecić bez zatrudniania analityka na etat?
  - Co obejmuje dwutygodniowa diagnoza danych sprzedażowych?
  - Czy pracujesz na naszych systemach ERP, PLM i Power BI?
  - Czy współpraca może być w pełni online?
- **Слаг:** `/pl/services`, вариант `/pl/uslugi`.

## Usługa: planowanie asortymentu

- **Основной:** zarządzanie asortymentem — 10
- **Вторичные:**
  - category management — 110
  - zarządzanie kategorią produktów — 30
  - struktura asortymentu — 10
  - merchandise planning — 10
  - planowanie asortymentu — <10
  - analiza asortymentu — <10
  - matryca asortymentowa — <10
- **Title:** Planowanie asortymentu i zarządzanie asortymentem w modzie
- **Description:** Planowanie i zarządzanie asortymentem dla marek modowych: struktura kolekcji, krzywe rozmiarów, budżet open-to-buy i monitoring sprzedaży w sezonie.
- **H1:** Planowanie asortymentu i zarządzanie asortymentem w handlu modowym
- **H2 / H3:**
  - H2 Problemy z asortymentem, które rozwiązuje planowanie asortymentu
  - H2 Co obejmuje planowanie asortymentu
    - H3 Przegląd struktury asortymentu według kategorii i poziomów cen
    - H3 Krzywe rozmiarów i kolorów z oczyszczonych danych sprzedaży
    - H3 Plan zakupów i budżet open-to-buy w Excelu
    - H3 Monitoring asortymentu w sezonie w Power BI
    - H3 Warsztaty dla zespołu zakupów i planowania asortymentu
  - H2 Wyniki planowania asortymentu dla marek modowych
  - H2 Narzędzia w projektach planowania asortymentu
  - H2 Category management a planowanie asortymentu w modzie
  - H2 Planowanie asortymentu — pytania
- **FAQ:**
  - Czym jest planowanie asortymentu?
  - Czym różni się category management od planowania asortymentu?
  - Co to jest struktura asortymentu?
  - Jakie dane sprzedażowe są potrzebne?
  - Czy jeden plan asortymentu może objąć kilka rynków?
- **Слаг:** `planowanie-asortymentu`
- **Выдача:** PlanoHero, Leafio (ПО), logistyka.net.pl, продуктовый ритейл. Fashion-консультантов нет.

## Usługa: analiza cen

- **Основной:** analiza cen — 50 (в выдаче есть шум про цены на недвижимость)
- **Вторичные:**
  - analiza cen konkurencji — 10
  - architektura cenowa — <10
  - polityka cenowa (ведёт на статью)
- **Title:** Analiza cen w handlu i architektura cenowa marek modowych
- **Description:** Analiza cen dla marek modowych: architektura cenowa, progi cenowe w kategoriach, spójne ceny na rynkach i scenariusze obniżek przed sezonem.
- **H1:** Analiza cen w handlu i spójna architektura cenowa na różnych rynkach
- **H2 / H3:**
  - H2 Problemy cenowe, które rozwiązuje analiza cen
  - H2 Co obejmuje analiza cen w handlu
    - H3 Audyt architektury cenowej w kategoriach
    - H3 Zasady spójności cen między rynkami i walutami
    - H3 Model marży i obniżek cen w Excelu
    - H3 Cotygodniowy monitoring cen i marży w Power BI
  - H2 Wyniki analizy cen w handlu
  - H2 Narzędzia w projektach analizy cen
  - H2 Analiza cen — pytania
- **FAQ:**
  - Na czym polega analiza cen w handlu?
  - Czym jest architektura cenowa?
  - Czy analiza cen obejmuje ceny konkurencji?
  - Jak zaplanować obniżki cen przed sezonem?
  - Jakie dane są potrzebne do analizy cen?
- **Слаг:** `analiza-cen`

## Usługa: raportowanie sprzedaży w Power BI

- **Основной:** raportowanie sprzedaży — 140
- **Вторичные:**
  - dashboard sprzedażowy — 70
  - dashboard sprzedaży — 70
  - raport sprzedaży excel — 30
  - wdrożenie power bi — <10
  - konsultant power bi — <10 (выдача: вакансии)
- **Title:** Raportowanie sprzedaży w Power BI dla handlu i mody
- **Description:** Wdrożenie Power BI dla marek modowych: model danych, miary DAX i dashboard sprzedażowy z sell-through, pokryciem zapasu, marżą i zwrotami.
- **H1:** Raportowanie sprzedaży w Power BI: dashboardy KPI dla handlu i mody
- **H2 / H3:**
  - H2 Problemy z raportowaniem sprzedaży, które rozwiązuje Power BI
  - H2 Co obejmuje wdrożenie dashboardu sprzedażowego
    - H3 Słownik KPI uzgodniony z zespołami
    - H3 Model danych handlowych w Power BI
    - H3 Miary DAX dla sell-through, zapasu i marży
    - H3 Strony raportu pod cotygodniowe spotkania handlowe
    - H3 Odświeżanie, RLS i przekazanie raportu zespołowi
  - H2 Wyniki projektów raportowania sprzedaży w Power BI
  - H2 Narzędzia w projektach Power BI
  - H2 Raportowanie sprzedaży w Power BI — pytania
- **FAQ:**
  - Ile trwa wdrożenie Power BI w firmie handlowej?
  - Czy Power BI jest za darmo? (PAA)
  - Ile kosztuje licencja Power BI? (PAA)
  - Czy każdy rynek może widzieć tylko swoje dane?
  - Czym różni się raport od dashboardu w Power BI?
- **Слаг:** `raportowanie-sprzedazy-power-bi`
- **Выдача:** «wdrożenie power bi» — argondata, powerbi.pl, cogit, qbico (польские BI-агентства).

## Usługa: modele Excel do planowania zakupów

- **Основной:** planowanie zakupów — 50
- **Вторичные:**
  - planowanie sprzedaży — 210 (общая выдача про планирование продаж)
  - analiza sprzedaży excel — 10
  - budżet zakupowy — <10
  - open to buy (ведёт на статью)
- **Title:** Planowanie zakupów i sprzedaży w Excelu dla handlu
- **Description:** Modele Excel do planowania zakupów w handlu modowym: budżet open-to-buy, plan zakupów, marża i scenariusze, które zespół utrzyma samodzielnie.
- **H1:** Modele Excel do planowania zakupów i sprzedaży w handlu
- **H2 / H3:**
  - H2 Problemy z planowaniem zakupów, które rozwiązują modele Excel
  - H2 Co obejmuje model planowania zakupów w Excelu
    - H3 Budżet open-to-buy z podziałem na miesiące
    - H3 Plan zakupów i kalkulacja marży dla rynków
    - H3 Porównanie scenariuszy bez kopiowania plików
    - H3 Kontrole spójności i instrukcja utrzymania modelu
  - H2 Wyniki modeli planowania zakupów w Excelu
  - H2 Excel i Power Query w planowaniu zakupów
  - H2 Planowanie zakupów w Excelu — pytania
- **FAQ:**
  - Czym jest budżet open-to-buy?
  - Dlaczego Excel, a nie system do planowania?
  - Czy można przebudować nasz obecny plik planu zakupów?
  - Jak połączyć planowanie sprzedaży z planem zakupów?
  - Jaka wersja Excela jest potrzebna?
- **Слаг:** `planowanie-zakupow-excel`
- **Внимание:** «plan zakupów» (50) в выдаче означает госзакупки, поэтому его нет в заголовках.

## Usługa: jakość danych produktowych i PLM

- **Основной:** jakość danych produktowych — <10
- **Вторичные:**
  - karty produktowe — 90 (выдача: e-commerce, контент карточек)
  - atrybuty produktu — 10
  - zarządzanie danymi produktowymi — <10 (выдача: вакансии, PIM)
  - dane produktowe — <10
- **Title:** Jakość danych produktowych i standardy PLM w modzie
- **Description:** Jakość danych produktowych dla marek modowych: słownik atrybutów, reguły walidacji w PLM, porządek w kartach produktowych i dashboard jakości.
- **H1:** Jakość danych produktowych i standaryzacja danych w systemie PLM
- **H2 / H3:**
  - H2 Problemy z danymi produktowymi, które rozwiązuje standaryzacja
  - H2 Co obejmuje standaryzacja danych produktowych
    - H3 Audyt atrybutów produktów na rynkach
    - H3 Słownik atrybutów uzgodniony ze wszystkimi rynkami
    - H3 Reguły migracji i walidacja danych w PLM
    - H3 Dashboard jakości danych produktowych
  - H2 Wyniki standaryzacji danych produktowych
  - H2 Narzędzia w projektach danych produktowych i PLM
  - H2 Jakość danych produktowych i PLM — pytania
- **FAQ:**
  - Co to jest jakość danych produktowych?
  - Czym różni się system PIM od PLM?
  - Jakie atrybuty powinna mieć karta produktowa w modzie?
  - Ile trwa uzgodnienie słownika atrybutów?
  - Czy można uporządkować dane archiwalne?
- **Слаг:** `jakosc-danych-produktowych`

## Usługa: procesy raportowania

- **Основной:** procesy raportowania w handlu — <10 (спроса нет)
- **Вторичные:** tygodniowy raport sprzedaży — <10
- **Title:** Procesy raportowania i zespół analityczny w handlu
- **Description:** Kalendarz raportowy, właściciele raportów, definicje KPI i cotygodniowe przeglądy sprzedaży, które kończą się decyzjami. Dla zespołów w handlu.
- **H1:** Organizacja procesów raportowania i zespołu analitycznego w handlu
- **H2 / H3:**
  - H2 Problemy z raportowaniem, które rozwiązuje uporządkowanie procesów
  - H2 Co obejmuje organizacja procesów raportowania
    - H3 Kalendarz raportowy
    - H3 Macierz odpowiedzialności za raporty
    - H3 Definicje KPI i standardy danych
    - H3 Cotygodniowy przegląd sprzedaży i rejestr decyzji
  - H2 Wyniki organizacji procesów raportowania
  - H2 Narzędzia w projektach procesów raportowania
  - H2 Procesy raportowania w handlu — pytania
- **FAQ:**
  - Co powinien zawierać tygodniowy raport sprzedaży?
  - Kto powinien odpowiadać za każdy wskaźnik?
  - Czy mała firma potrzebuje procesu raportowego?
  - Czy przeszkolisz zespół, który będzie prowadził raporty?
- **Слаг:** `procesy-raportowania`

## Case study `/pl/case-studies`

- **Основной:** case study power bi — 10
- **Вторичные:**
  - case study analityka — <10
  - studium przypadku — 1900: общий запрос (учёба), только в тексте
- **Title:** Case study: analityka w handlu i modzie
- **Description:** Anonimowe case study z analityki w handlu i modzie: planowanie asortymentu, analiza cen, raporty Power BI i dane produktowe w PLM.
- **H1:** Case study z analityki w handlu i modzie
- **H2:**
  - Case study według tematu
  - Porozmawiajmy o podobnym projekcie analitycznym
- **FAQ:**
  - Czy klienci z case study są wymienieni z nazwy?
  - Jak anonimizowane są liczby w case study?
  - Czy podobny projekt można zrealizować dla naszej marki?

### Case study (PL)

У всех кейсов основной запрос <10. Структура H2 как в EN, на польском:
- Wyzwanie;
- Co zrobiono;
- Wyniki w liczbach;
- Narzędzia;
- Powiązana usługa.

| Кейс | Title | H1 | Слаг |
|---|---|---|---|
| plm-product-data-standardisation | Standaryzacja danych produktowych w PLM — case study | Standaryzacja danych produktowych dla rynków Europy i Azji w systemie PLM | `standaryzacja-danych-produktowych-plm` |
| womenswear-range-plan-rebuild | Przebudowa planu asortymentu odzieży damskiej — case | Przebudowa planu asortymentu odzieży damskiej dla europejskiego dystrybutora | `plan-asortymentu-odziez-damska` |
| price-ladder-margin-report | Architektura cenowa i raport marży — case study | Architektura cenowa i raport marży dla sklepu internetowego z modą | `architektura-cenowa-raport-marzy` |
| weekly-retail-trade-report | Tygodniowy raport sprzedaży w Power BI — case study | Tygodniowy raport sprzedaży w Power BI dla sieci wielomarkowej | `tygodniowy-raport-sprzedazy-power-bi` |
| menswear-size-curve-rebuild | Krzywe rozmiarów dla marki odzieży męskiej — case study | Nowe krzywe rozmiarów dla marki odzieży męskiej po dwóch sezonach braków | `krzywe-rozmiarow-odziez-meska` |
| ecommerce-catalogue-attribute-cleaning | Porządkowanie atrybutów produktów przed migracją sklepu | Porządkowanie atrybutów produktów przed migracją katalogu e-commerce | `atrybuty-produktow-migracja-e-commerce` |

Description кейсов (PL):

| Кейс | Description |
|---|---|
| plm-product-data-standardisation | Case study: jeden słownik atrybutów, reguły walidacji w PLM i dashboard jakości danych dla marki modowej sprzedającej w Europie i Azji. |
| womenswear-range-plan-rebuild | Case study planowania asortymentu: przegląd struktury kolekcji, nowe krzywe rozmiarów i budżet open-to-buy dla dystrybutora odzieży damskiej. |
| price-ladder-margin-report | Case study analizy cen: audyt architektury cenowej, wspólne zasady cen dla rynków i cotygodniowy raport marży w Power BI dla sklepu z modą. |
| weekly-retail-trade-report | Case study Power BI: uzgodnione definicje KPI i jeden tygodniowy raport sprzedaży zamiast czterech konkurencyjnych arkuszy. |
| menswear-size-curve-rebuild | Case study: braki towaru i zwroty usunięte z historii sprzedaży przed przeliczeniem krzywych rozmiarów dla marki odzieży męskiej. |
| ecommerce-catalogue-attribute-cleaning | Case study danych produktowych: mapowanie atrybutów i reguły walidacji uzgodnione przed migracją katalogu sklepu internetowego z modą. |

## Blog `/pl/blog`

- **Основной:** blog o analityce w handlu — <10 (хаб)
- **Title:** Blog o analityce w handlu: Power BI, Excel, asortyment
- **Description:** Praktyczne artykuły o KPI w handlu, rotacji zapasów, marży, cenach, danych produktowych i Power BI dla zespołów w handlu i modzie.
- **H1:** Blog o analityce w handlu: Power BI, Excel i planowanie asortymentu
- **H2:**
  - Polecany artykuł o analityce w handlu
  - Artykuły o analityce w handlu według tematu
  - Darmowe szablony Excel dla czytelników bloga
- **FAQ:**
  - Kto pisze artykuły na blogu?
  - Jak często pojawiają się nowe artykuły?
  - Czy mogę zaproponować temat?

### Kategorie (PL)

| Рубрика | Основной | Title | H1 | Слаг |
|---|---|---|---|---|
| power-bi | blog power bi — 90 | Blog Power BI: raporty i miary DAX dla handlu | Power BI w analityce handlu: artykuły i poradniki | `power-bi` |
| assortment | zarządzanie asortymentem — artykuły (<10) | Asortyment w handlu modowym: artykuły i poradniki | Artykuły o planowaniu asortymentu w handlu modowym | `asortyment` |
| pricing | polityka cenowa — artykuły (ведёт на статью, 170) | Ceny, marża i obniżki w handlu: artykuły | Artykuły o cenach, marży i obniżkach w handlu | `ceny` |
| product-data | system PIM — artykuły (ведёт на статью, 260) | Dane produktowe, PIM i PLM: artykuły dla marek modowych | Artykuły o danych produktowych, PIM i PLM w modzie | `dane-produktowe` |
| excel | excel w handlu (<10) | Excel w planowaniu handlu: artykuły i szablony | Excel w planowaniu zakupów i sprzedaży: artykuły | `excel` |
| careers (новая) | kariera w modzie (<10); статья рубрики: jak zostać analitykiem danych — 90, kupiec kto to — 50 | Kariera w analityce handlu i mody: role i ścieżki | Kariera w analityce handlu i mody: analityk, merchandiser, kupiec | `kariera` |

Description рубрик (PL):

| Рубрика | Description |
|---|---|
| power-bi | Artykuły o Power BI dla handlu: miary DAX, raporty sprzedaży, sell-through, RLS i przykłady dashboardów dla marek modowych. |
| assortment | Artykuły o planowaniu asortymentu w handlu modowym: struktura asortymentu, analiza ABC XYZ, krzywe rozmiarów i plan zakupów. |
| pricing | Artykuły o cenach w handlu: strategie i polityka cenowa, marża a narzut, obniżki cen i architektura cenowa marek modowych. |
| product-data | Artykuły o danych produktowych: system PIM i PLM, atrybuty produktu, jakość danych i standardy dla marek modowych. |
| excel | Artykuły o Excelu w handlu: budżet open-to-buy, prognozowanie sprzedaży, analiza ABC i darmowe szablony do planowania. |
| careers | Artykuły o karierze w analityce handlu i mody: czym zajmują się analityk, merchandiser i kupiec, jakie mają umiejętności i jak zacząć. |

FAQ рубрики kariera:
- Jak zostać analitykiem danych w handlu?
- Kim jest kupiec w handlu?
- Czym zajmuje się category manager?

FAQ рубрик: по 3 вопроса, аналогично EN, на польском. Например, для power-bi:
- Czy Power BI jest za darmo?
- Czy Power BI jest trudny? (оба PAA)
- Power BI czy Excel w raportowaniu sprzedaży?

### Artykuły (PL, текущие 8)

**sell-through** (P2)
- **Основной:** sell through — 50
- **Вторичные:** sell-through rate — 20; sell in sell through — 10; wskaźnik sell through — <10
- **Title:** Sell-through: jak obliczyć wskaźnik w Excelu i Power BI
- **Description:** Co oznacza sell-through, jak go obliczyć w Excelu i Power BI, jaki poziom jest dobry w modzie i jakie błędy zniekształcają wskaźnik.
- **H1:** Wskaźnik sell-through: wzór, interpretacja i miary DAX w Power BI
- **H2:**
  - Co oznacza sell-through w handlu
  - Wzór na sell-through i dwa sposoby liczenia
  - Jaki sell-through jest dobry w handlu modowym
  - Jak obliczyć sell-through w Excelu
  - Miary DAX dla sell-through w Power BI
  - Tygodniowa krzywa sell-through w raporcie
  - Najczęstsze błędy w liczeniu sell-through
- **FAQ:**
  - Co to jest sell-through?
  - Jak obliczyć sell-through?
  - Czym różni się sell-in od sell-through?
  - Jak policzyć sell-through w Excelu?
- **Слаг:** `wskaznik-sell-through`

**size-curve** (P3, спроса нет)
- **Основной:** krzywa rozmiarów — <10
- **Title:** Krzywa rozmiarów: jak ją policzyć z danych sprzedaży
- **Description:** Jak policzyć krzywą rozmiarów z danych sprzedaży: usunąć braki towaru, zwroty i promocje, a potem wyliczyć udziały rozmiarów dla rynków.
- **H1:** Jak zbudować krzywą rozmiarów na podstawie sprzedaży z poprzedniego sezonu
- **H2:**
  - Czym jest krzywa rozmiarów w zakupach odzieży
  - Dlaczego surowe dane sprzedaży dają błędną krzywą rozmiarów
  - Trzy kroki czyszczenia danych przed obliczeniem krzywej rozmiarów
  - Krzywe rozmiarów dla rynków i kategorii
- **FAQ:**
  - Co to jest krzywa rozmiarów?
  - Jak braki towaru zniekształcają krzywą rozmiarów?
  - Jak często aktualizować krzywe rozmiarów?
- **Слаг:** `krzywa-rozmiarow`

**product-attributes** (P2)
- **Основной:** atrybuty produktu — 10
- **Вторичные:** karty produktowe — 90 (упоминание, основной у услуги не он); słownik atrybutów — <10
- **Title:** Atrybuty produktu w PLM: słownik dla marki modowej
- **Description:** Jakie atrybuty produktu potrzebuje marka modowa w PLM i jak ustalić zasady dla koloru, sezonu i składu, których przestrzegają wszystkie rynki.
- **H1:** Standardy atrybutów produktu w PLM, które działają na kilku rynkach
- **H2:**
  - Jakie atrybuty produktu są potrzebne marce modowej w PLM
  - Struktura słownika atrybutów produktu
  - Zasady dla atrybutu koloru
  - Kody sezonów wspólne dla rynków
  - Skład materiałowy bez wolnego tekstu
- **FAQ:**
  - Co to są atrybuty produktu?
  - Co powinna zawierać karta produktu? (PAA)
  - Kto powinien odpowiadać za słownik atrybutów?
- **Слаг:** `atrybuty-produktu-plm`

**price-ladder** (P3)
- **Основной:** architektura cenowa — <10
- **Title:** Architektura cenowa w handlu: jak czytać progi cenowe
- **Description:** Jak zbudować architekturę cenową w handlu: progi wejścia, środka i najwyższej półki oraz ile kosztuje luka między poziomami cen.
- **H1:** Jak zbudować i czytać architekturę cenową przed sezonem
- **H2:**
  - Czym jest architektura cenowa w handlu
  - Progi cenowe: wejście, środek i najwyższa półka
  - Ile kosztuje luka w architekturze cenowej
  - Architektura cenowa na kilku rynkach i w kilku walutach
- **FAQ:**
  - Czym jest architektura cenowa?
  - Ile progów cenowych powinna mieć kategoria?
  - Jakie są rodzaje cen? (PAA)
- **Слаг:** `architektura-cenowa`

**dax-measures** (P1)
- **Основной:** dax power bi — 390, KD 2
- **Вторичные:** miary dax — 10; funkcje dax — 10; dax — 18100 (биржевой индекс, только в тексте)
- **Title:** Miary DAX w Power BI dla dashboardu KPI w handlu
- **Description:** Co to jest DAX w Power BI i pięć miar dla dashboardu KPI w handlu: pokrycie zapasu, sprzedaż w pełnej cenie, zwroty, tygodnie zapasu i marża.
- **H1:** Pięć miar DAX w Power BI, których potrzebuje dashboard KPI w handlu
- **H2:**
  - Co to jest DAX w Power BI
  - Miara DAX a kolumna obliczeniowa
  - Miara DAX pokrycia zapasu
  - Udział sprzedaży w pełnej cenie w DAX
  - Wskaźnik zwrotów w DAX
  - Tygodnie zapasu w DAX
  - Marża w DAX
- **FAQ:**
  - Co to jest DAX w Power BI? (PAA)
  - Czy DAX to język programowania? (PAA)
  - Czym różni się miara od kolumny obliczeniowej?
  - Jak sprawdzić miarę DAX w Excelu?
- **Слаг:** `miary-dax-power-bi`
- **Выдача:** Microsoft Learn, qbico, dax.guide, odczarujpowerbi.pl.

**open-to-buy** (P3)
- **Основной:** open to buy — 10
- **Вторичные:** budżet zakupowy — <10
- **Title:** Open to buy w handlu: wzór i model w Excelu
- **Description:** Czym jest budżet open-to-buy, jak go obliczyć na przykładzie i jak zbudować w Excelu model zakupów, który zespół utrzyma przez cały sezon.
- **H1:** Budżet open-to-buy w Excelu: wzór i model, który zespół utrzyma
- **H2:**
  - Co oznacza open to buy w handlu
  - Wzór na open to buy z przykładem
  - Struktura skoroszytu open-to-buy w Excelu
  - Trzy kontrole, które zatrzymują rozjazd budżetu
  - Darmowy szablon open-to-buy w Excelu
- **FAQ:**
  - Co to jest open to buy?
  - Jak obliczyć budżet open-to-buy?
  - Jak często aktualizować budżet zakupowy?
- **Слаг:** `open-to-buy-excel`

**row-level-security** (P2)
- **Основной:** rls power bi — 50
- **Вторичные:** zabezpieczenia na poziomie wierszy power bi — <10
- **Title:** RLS w Power BI: zabezpieczenia wierszy w raportach
- **Description:** Jak skonfigurować statyczny i dynamiczny RLS w Power BI, aby każdy rynek widział w jednym raporcie tylko swoje dane sprzedażowe.
- **H1:** RLS w Power BI — zabezpieczenia na poziomie wierszy w raportach dla wielu rynków
- **H2:**
  - Do czego służy RLS w Power BI
  - Statyczny i dynamiczny RLS dla rynków
  - Role rynków w Power BI krok po kroku
  - Jak przetestować RLS w Power BI
- **FAQ:**
  - Co to jest RLS w Power BI?
  - Jak sprawdzić RLS w Power BI?
  - Kiedy wybrać dynamiczny RLS?
- **Слаг:** `rls-power-bi`

**sell-in vs sell-through** (P3)
- **Основной:** sell in sell through — 10
- **Title:** Sell-in, sell-through i sell-out: różnice w raportach
- **Description:** Czym różnią się sell-in, sell-through i sell-out oraz dlaczego dział handlowy i finanse raportują inne wartości tego samego wskaźnika.
- **H1:** Sell-in a sell-through: dlaczego dział handlowy i finanse mają różne liczby
- **H2:**
  - Sell-in, sell-through i sell-out — definicje
  - Trzy rozbieżności w definicji sell-through
  - Jak uzgodnić jedną definicję sell-through z finansami
- **FAQ:**
  - Czym różni się sell-in od sell-through?
  - Czym jest sell-out?
  - Dlaczego finanse pokazują inny sell-through?
- **Слаг:** `sell-in-sell-through-sell-out`

## O mnie `/pl/about`

- **Основной:** Tatsiana Bandziuk (брендовый запрос)
- **Вторичные:** analityk marki — <10
- **Title:** O mnie — Tatsiana Bandziuk, analityka w handlu i modzie
- **Description:** Tatsiana Bandziuk: około 10 lat w międzynarodowym handlu modowym jako brand analyst i product data lead. Asortyment, ceny, PLM. Warszawa.
- **H1:** O mnie: Tatsiana Bandziuk, konsultantka ds. analityki w handlu i modzie
- **H2:**
  - Doświadczenie Global Brand Analyst i Product Data Lead w międzynarodowej marce modowej
  - Projekty asortymentowe, cenowe i produktowe
  - Kierowanie zespołem danych produktowych i analityki
  - Przebieg kariery w analityce handlu modowego
  - Wykształcenie: logistyka, ekonomia i zarządzanie na BGEU
  - Dyplomy i certyfikaty z logistyki, ekonomii i zarządzania
  - Języki pracy i lokalizacja: angielski, polski, rosyjski, Warszawa
- **FAQ:**
  - Gdzie pracuje Tatsiana Bandziuk?
  - W jakich językach prowadzi projekty?
  - Jakie ma wykształcenie?
  - Czy przyjmuje projekty konsultingowe?
- **Слаг:** `/pl/about`, вариант `/pl/o-mnie`.

## Kontakt `/pl/contact`

- **Основной:** analityk danych warszawa — 30 (выдачу не проверяли, скорее всего вакансии)
- **Вторичные:** konsultant power bi warszawa — <10
- **Title:** Kontakt — Tatsiana Bandziuk, analityka w handlu, Warszawa
- **Description:** Zapytanie o projekt analityczny: asortyment, ceny, raporty Power BI lub dane produktowe. Odpowiedź w ciągu jednego dnia roboczego, PL / EN / RU.
- **H1:** Kontakt w sprawie projektu analityki w handlu — Tatsiana Bandziuk
- **H2:**
  - Jak przebiega zapytanie: odpowiedź, rozmowa, zakres prac
  - Formularz zapytania o projekt analityczny
  - Języki i lokalizacja konsultacji w Warszawie
  - Zapytanie o projekt analityczny — pytania
- **FAQ:**
  - Jak szybko odpowiadasz na zapytanie?
  - Czy rozmowa może być po polsku?
  - Co napisać w zapytaniu?
  - Czy podpisujesz NDA przed analizą danych?
- **Слаг:** `/pl/contact`, вариант `/pl/kontakt`.

## Kursy `/pl/courses`

- **Основной:** kurs power bi — 480, KD 0
- **Вторичные:**
  - power bi szkolenie — 390
  - kurs excel dla zaawansowanych — 20
  - kurs excel — 2900 и kurs analizy danych — 390: общие запросы, только в тексте
- **Title:** Kurs Power BI i Excel dla analityków handlu
- **Description:** Kurs Power BI i Excel dla analityków w handlu i modzie: raporty KPI, budżet open-to-buy, ceny i dane produktowe. Zapisz się na listę oczekujących.
- **H1:** Kursy Power BI i Excel dla analityków w handlu i modzie
- **H2:**
  - Program kursu Power BI i Excel dla handlu
  - Dla kogo są kursy analityki handlowej
  - Lista oczekujących na kurs Power BI
  - Darmowe szablony Excel na start nauki
- **FAQ:**
  - Kiedy startuje kurs Power BI?
  - Ile kosztuje kurs Power BI? (PAA)
  - Od czego zacząć naukę Power BI? (PAA)
  - Czy kurs będzie online?
  - W jakim języku będą kursy?
- **Выдача:** Microsoft Learn, expose.pl, Koźmiński, Comarch, Santander Open Academy. Страница листа ожидания вряд ли пробьётся, запрос пригодится при запуске курса.

## Darmowe szablony `/pl/free-templates`

- **Основной:** dashboard excel szablon — 50
- **Вторичные:**
  - darmowe szablony excel — 40
  - budżet zakupowy — <10
  - szablon excel — 170: общий запрос
- **Title:** Darmowy szablon Excel open-to-buy i checklista dashboardu
- **Description:** Darmowy szablon Excel do budżetu zakupów open-to-buy i checklista dashboardu KPI w Power BI. Gotowe do dostosowania dla zespołów w handlu.
- **H1:** Darmowy szablon Excel open-to-buy i checklista dashboardu KPI
- **H2:**
  - Szablon Excel open-to-buy do planowania zakupów
  - Checklista dashboardu KPI dla Power BI
  - Co zawiera szablon open-to-buy
  - Jak korzystać z szablonu w cyklu planowania zakupów
  - Pobierz darmowe szablony Excel dla handlu
- **FAQ:**
  - Czy szablon jest darmowy?
  - Jaka wersja Excela jest potrzebna?
  - Czy szablon obsługuje kilka rynków?
  - Jak używać checklisty dashboardu?
- **Слаг:** `/pl/free-templates`, вариант `/pl/darmowe-szablony`.

---

# RU (Казахстан, Украина-ru как сигнал)

В русскоязычной выборке объёмы ничтожные: Казахстан почти везде 10. Приоритеты расставлены по совокупности: Казахстан + Украина (ru) + Польша/Германия (ru) и смысл страницы.

Реальный интерес есть к темам:
- маржинальность и наценка;
- ABC/XYZ-анализ;
- оборачиваемость;
- ценообразование;
- обучение Power BI;
- дашборды.

Внимание к имени: по «татьяна бандюк» в выдаче другой человек, бухгалтер-лектор (kontur.ru, buhonline.ru, audit-it.ru). См. отчёт.

## Главная `/ru`

- **Основной:** аналитика продаж — 20 (UA 10), KD 40
- **Вторичные:**
  - ритейл аналитика — 10
  - аналитика розничных продаж — 10
  - аналитик фриланс — 10
  - аналитика в ритейле — <10
  - Татьяна Бандюк (на RU-страницах только русское написание)
- **Title:** Татьяна Бандюк — аналитика продаж в ритейле и моде
- **Description:** Консультант по аналитике в ритейле и моде из Варшавы: планирование ассортимента, анализ цен, отчёты по продажам в Power BI, товарные данные.
- **H1:** Татьяна Бандюк — консультант по аналитике продаж в ритейле и моде
- **H2:**
  - Услуги по аналитике продаж для fashion- и ритейл-брендов
  - Результаты проектов по аналитике продаж в цифрах
  - Как проходит проект по аналитике в ритейле
  - Кейсы по аналитике в ритейле и моде
  - Инструменты аналитики продаж: Power BI, Excel и PLM-системы
  - Образование в логистике, экономике и управлении
  - Вопросы об аналитике продаж в ритейле
  - Статьи об аналитике продаж, ценах и ассортименте
  - Связаться с Татьяной Бандюк по проекту аналитики
- **FAQ:**
  - Чем занимается консультант по аналитике в ритейле?
  - Что такое аналитика продаж простыми словами?
  - Какие KPI важны для магазина одежды?
  - Сколько длится проект по аналитике продаж?
  - Можно ли работать удалённо и на русском языке?
  - Какие данные нужны для старта?
- **Слаг:** `/ru`
- **Выдача «аналитика в ритейле»:** Хабр, Yandex Cloud, Datawiz, 1С-Битрикс. Консультантов нет.

## Услуги `/ru/services`

- **Основной:** услуги аналитика — 10 (UA 10)
- **Вторичные:**
  - аналитик на аутсорсе — <10
  - аутсорсинг аналитики — <10
  - консалтинг в ритейле — <10
- **Title:** Услуги аналитика для ритейла и fashion-брендов
- **Description:** Планирование ассортимента, анализ цен, отчёты Power BI, модели Excel и качество товарных данных для fashion- и ритейл-брендов. Можно на аутсорсе.
- **H1:** Услуги по аналитике в ритейле и моде
- **H2:**
  - Шесть аналитических услуг для fashion- и ритейл-брендов
  - Форматы работы: диагностика данных, проект, аналитика на аутсорсе
  - Каким компаниям подходят услуги аналитика
  - Вопросы об услугах аналитика для ритейла
- **FAQ:**
  - Можно ли заказать аналитику на аутсорсе без штатного аналитика?
  - Что входит в двухнедельную диагностику данных?
  - Работаете ли вы с 1С, ERP и PLM-системами?
  - Можно ли работать полностью онлайн?
- **Слаг:** `/ru/services`, вариант `/ru/uslugi`.

## Услуга: управление ассортиментом

- **Основной:** управление ассортиментом — 10
- **Вторичные:**
  - категорийный менеджмент — 20 (UA 90)
  - анализ ассортимента — 10
  - ассортиментная политика — 10
  - управление ассортиментом в рознице — 10
  - ширина и глубина ассортимента — 10
  - планирование ассортимента — <10
- **Title:** Планирование и управление ассортиментом в fashion-ритейле
- **Description:** Планирование ассортимента для fashion-брендов: структура коллекции, размерные матрицы, бюджет закупок open-to-buy и контроль продаж в сезоне.
- **H1:** Планирование и управление ассортиментом в fashion-ритейле
- **H2 / H3:**
  - H2 Проблемы с ассортиментом, которые решает планирование ассортимента
  - H2 Что входит в планирование ассортимента
    - H3 Анализ структуры ассортимента по категориям и ценовым сегментам
    - H3 Размерные и цветовые матрицы по очищенным продажам
    - H3 План закупок и бюджет open-to-buy в Excel
    - H3 Контроль ассортимента в сезоне в Power BI
    - H3 Передача процессов команде закупок и планирования
  - H2 Результаты планирования ассортимента для fashion-брендов
  - H2 Инструменты для управления ассортиментом
  - H2 Категорийный менеджмент и планирование ассортимента в моде
  - H2 Вопросы об управлении ассортиментом
- **FAQ:**
  - Что такое управление ассортиментом? (PAA)
  - Чем категорийный менеджмент отличается от планирования ассортимента?
  - Что такое ширина и глубина ассортимента?
  - Какие данные о продажах нужны для плана ассортимента?
  - Можно ли вести один план ассортимента для нескольких рынков?
- **Слаг:** `upravlenie-assortimentom`
- **Выдача:** Эвотор, партнёры 1С, Cleverence. Fashion-специфики нет.

## Услуга: анализ цен

- **Основной:** анализ цен — 40 (UA 30)
- **Вторичные:**
  - анализ цен конкурентов — 10
  - ценовая архитектура — <10
  - ценовые сегменты (ведёт на статью)
- **Title:** Анализ цен в рознице и ценовая архитектура бренда
- **Description:** Анализ цен для fashion-брендов: ценовая архитектура, ценовые сегменты в категориях, единые цены на разных рынках и сценарии уценки до сезона.
- **H1:** Анализ цен в рознице и согласование цен между рынками
- **H2 / H3:**
  - H2 Ценовые проблемы, которые решает анализ цен
  - H2 Что входит в анализ цен в рознице
    - H3 Аудит ценовой архитектуры по категориям
    - H3 Правила согласования цен между рынками и валютами
    - H3 Модель маржи и уценки в Excel
    - H3 Еженедельный контроль цен и маржи в Power BI
  - H2 Результаты анализа цен
  - H2 Инструменты для анализа цен
  - H2 Вопросы об анализе цен в рознице
- **FAQ:**
  - Что включает анализ цен в рознице?
  - Что такое ценовая архитектура бренда?
  - Анализируете ли вы цены конкурентов?
  - Как спланировать уценку до начала сезона?
  - Какие данные нужны для анализа цен?
- **Слаг:** `analiz-cen`
- **Выдача:** InSales, Idatica, мониторинг цен конкурентов.

## Услуга: отчёты по продажам в Power BI

- **Основной:** отчет по продажам — 20, KD 39
- **Вторичные:**
  - внедрение power bi — 10
  - отчет по продажам в excel — 10
  - отчет о продажах — 10
  - power bi для ритейла — <10
  - консультант power bi — <10
- **Title:** Отчёт по продажам в Power BI для ритейла и fashion
- **Description:** Внедрение Power BI для fashion-брендов: модель данных, меры DAX и отчёт по продажам с sell-through, запасом, маржой и возвратами.
- **H1:** Отчёты по продажам и дашборды Power BI для ритейла
- **H2 / H3:**
  - H2 Проблемы с отчётами по продажам, которые решает Power BI
  - H2 Что входит во внедрение Power BI для ритейла
    - H3 Справочник KPI, согласованный с командами
    - H3 Модель данных ритейла в Power BI
    - H3 Меры DAX для sell-through, запаса и маржи
    - H3 Страницы отчёта под еженедельные встречи
    - H3 Обновление, RLS и передача отчёта команде
  - H2 Результаты внедрения отчётов Power BI
  - H2 Инструменты для отчётов Power BI
  - H2 Вопросы о внедрении Power BI для ритейла
- **FAQ:**
  - Можно ли пользоваться Power BI бесплатно? (PAA)
  - Чем Power BI лучше Excel для отчёта по продажам? (PAA)
  - Сколько длится внедрение Power BI?
  - Можно ли ограничить доступ к отчёту по рынкам?
  - Какие данные нужны для отчёта по продажам?
- **Слаг:** `otchety-po-prodazham-power-bi`
- **Выдача «power bi для ритейла»:** Microsoft, zerobit.kz, Datawiz, biconsult.

## Услуга: планирование закупок в Excel

- **Основной:** планирование закупок в excel — 10
- **Вторичные:**
  - планирование продаж в excel — 10
  - ассортиментная матрица в excel — 10
  - анализ продаж в excel — 10
  - планирование закупок — 10 (выдача: госзакупки и 1С)
- **Title:** Планирование закупок в Excel для fashion-ритейла
- **Description:** Модели Excel для планирования закупок в fashion-ритейле: бюджет open-to-buy, план закупок, маржа и сценарии, которые команда ведёт сама.
- **H1:** Модели Excel для планирования закупок и продаж в ритейле
- **H2 / H3:**
  - H2 Проблемы планирования закупок, которые решают модели Excel
  - H2 Что входит в модель планирования закупок в Excel
    - H3 Бюджет закупок open-to-buy по месяцам
    - H3 План закупок и расчёт маржи по рынкам
    - H3 Сравнение сценариев без копий файла
    - H3 Встроенные проверки и инструкция для команды
  - H2 Результаты моделей планирования закупок в Excel
  - H2 Excel и Power Query в планировании закупок
  - H2 Вопросы о планировании закупок в Excel
- **FAQ:**
  - Что такое бюджет закупок open-to-buy?
  - Почему Excel, а не система планирования?
  - Можно ли перестроить наш файл плана закупок?
  - Как связать план продаж и план закупок?
  - Какая версия Excel нужна?
- **Слаг:** `planirovanie-zakupok-excel`
- **Внимание:** «план закупок» (30) — это госзакупки (goszakup.gov.kz), в заголовках его не использовать.

## Услуга: товарные данные и PLM

- **Основной:** управление товарными данными — <10
- **Вторичные:**
  - мастер данные — 10
  - справочник номенклатуры — 10
  - качество данных — 10 (KD 43)
  - карточка товара — 260: маркетплейсы, только в тексте
- **Title:** Качество товарных данных и справочник номенклатуры в PLM
- **Description:** Качество товарных данных для fashion-брендов: справочник атрибутов, мастер-данные, правила проверки в PLM и дашборд качества по рынкам.
- **H1:** Качество товарных данных и стандартизация атрибутов в PLM
- **H2 / H3:**
  - H2 Проблемы с товарными данными, которые решает стандартизация
  - H2 Что входит в стандартизацию товарных данных
    - H3 Аудит атрибутов товаров по рынкам
    - H3 Справочник атрибутов, согласованный со всеми рынками
    - H3 Правила миграции и проверки данных в PLM
    - H3 Дашборд качества товарных данных
  - H2 Результаты стандартизации товарных данных
  - H2 Инструменты для работы с товарными данными и PLM
  - H2 Вопросы о товарных данных и PLM
- **FAQ:**
  - Что такое мастер-данные товара?
  - Чем PIM-система отличается от PLM?
  - Как навести порядок в справочнике номенклатуры?
  - Сколько времени занимает согласование атрибутов?
  - Можно ли очистить исторические данные?
- **Слаг:** `tovarnye-dannye-plm`

## Услуга: отчётность в ритейле

- **Основной:** отчетность в ритейле — <10 (спроса нет)
- **Вторичные:** еженедельный отчет по продажам — <10
- **Title:** Отчётность в ритейле: процессы и аналитическая команда
- **Description:** Календарь отчётности, владельцы отчётов, определения KPI и еженедельные разборы продаж, после которых принимаются решения. Для ритейл-команд.
- **H1:** Настройка отчётности в ритейле и работы аналитической команды
- **H2 / H3:**
  - H2 Проблемы с отчётностью, которые решает настройка процессов
  - H2 Что входит в настройку отчётности в ритейле
    - H3 Календарь отчётности
    - H3 Матрица ответственности за отчёты
    - H3 Определения KPI и стандарты данных
    - H3 Еженедельный разбор продаж и журнал решений
  - H2 Результаты настройки отчётности
  - H2 Инструменты для процессов отчётности
  - H2 Вопросы об отчётности в ритейле
- **FAQ:**
  - Что должно быть в еженедельном отчёте по продажам?
  - Кто отвечает за каждый показатель?
  - Нужен ли процесс отчётности небольшой компании?
  - Обучаете ли вы команду, которая будет вести отчёты?
- **Слаг:** `otchetnost-v-ritejle`

## Кейсы `/ru/case-studies`

- **Основной:** кейсы по аналитике — <10
- **Вторичные:** кейсы power bi — <10; кейс ритейл — <10
- **Title:** Кейсы по аналитике в ритейле и моде
- **Description:** Обезличенные кейсы по аналитике в ритейле и моде: планирование ассортимента, анализ цен, отчёты Power BI и товарные данные в PLM.
- **H1:** Кейсы по аналитике в ритейле и моде
- **H2:**
  - Кейсы по аналитике по темам
  - Обсудить похожий проект по аналитике
- **FAQ:**
  - Называете ли вы клиентов из кейсов?
  - Как обезличены цифры в кейсах?
  - Можно ли сделать похожий проект для нашего бренда?

### Кейсы (RU)

Структура H2 кейса:
- Задача;
- Что сделано;
- Результаты в цифрах;
- Инструменты;
- Связанная услуга.

Каждый H2 содержит тему кейса.

| Кейс | Title | H1 | Слаг |
|---|---|---|---|
| plm-product-data-standardisation | Стандартизация товарных данных в PLM: кейс | Стандартизация товарных данных для рынков Европы и Азии в PLM-системе | `standartizaciya-tovarnyh-dannyh-plm` |
| womenswear-range-plan-rebuild | Перестройка ассортиментного плана женской одежды: кейс | Перестройка ассортиментного плана женской одежды для европейского дистрибьютора | `assortimentnyj-plan-zhenskoj-odezhdy` |
| price-ladder-margin-report | Ценовая линейка и отчёт о марже: кейс e-commerce | Ценовая линейка и отчёт о марже для fashion-интернет-магазина | `cenovaya-linejka-otchet-o-marzhe` |
| weekly-retail-trade-report | Еженедельный отчёт по продажам в Power BI: кейс | Еженедельный отчёт по продажам в Power BI для мультибрендовой сети | `ezhenedelnyj-otchet-po-prodazham-power-bi` |
| menswear-size-curve-rebuild | Размерная матрица мужской одежды после дефицита: кейс | Новая размерная матрица для бренда мужской одежды после двух сезонов дефицита | `razmernaya-matrica-muzhskoj-odezhdy` |
| ecommerce-catalogue-attribute-cleaning | Очистка атрибутов товаров перед миграцией каталога | Очистка атрибутов товаров перед переносом каталога интернет-магазина | `ochistka-atributov-tovarov-katalog` |

Description кейсов (RU):

| Кейс | Description |
|---|---|
| plm-product-data-standardisation | Кейс: единый справочник атрибутов, правила проверки в PLM и дашборд качества данных для fashion-бренда, работающего в Европе и Азии. |
| womenswear-range-plan-rebuild | Кейс по планированию ассортимента: разбор структуры коллекции, новые размерные матрицы и бюджет закупок для дистрибьютора женской одежды. |
| price-ladder-margin-report | Кейс по анализу цен: аудит ценовой линейки, единые правила цен для рынков и еженедельный отчёт о марже в Power BI для интернет-магазина. |
| weekly-retail-trade-report | Кейс Power BI: согласованные определения KPI и один еженедельный отчёт по продажам вместо четырёх конкурирующих таблиц. |
| menswear-size-curve-rebuild | Кейс: дефицит размеров и возвраты убраны из истории продаж, после чего размерные матрицы бренда мужской одежды рассчитаны заново. |
| ecommerce-catalogue-attribute-cleaning | Кейс по товарным данным: сопоставление атрибутов и правила проверки, согласованные до переноса каталога fashion-интернет-магазина. |

## Блог `/ru/blog`

- **Основной:** блог аналитика — 10 (UA 10)
- **Title:** Блог об аналитике в ритейле: Power BI, Excel, ассортимент
- **Description:** Практические статьи о KPI магазина, оборачиваемости, марже и наценке, ценах, товарных данных и Power BI для fashion- и ритейл-команд.
- **H1:** Блог об аналитике в ритейле: Power BI, Excel и ассортимент
- **H2:**
  - Главная статья блога об аналитике в ритейле
  - Статьи об аналитике в ритейле по темам
  - Бесплатные шаблоны Excel для читателей блога
- **FAQ:**
  - Кто пишет статьи блога?
  - Как часто выходят новые статьи?
  - Можно ли предложить тему?

### Рубрики (RU)

| Рубрика | Основной | Title | H1 | Слаг |
|---|---|---|---|---|
| power-bi | power bi для ритейла (<10); «power bi» 5400 — общий | Power BI для ритейла: статьи, DAX и дашборды | Power BI в аналитике ритейла: статьи и инструкции | `power-bi` |
| assortment | управление ассортиментом — статьи (<10) | Ассортимент в fashion-ритейле: статьи и разборы | Статьи о планировании ассортимента в fashion-ритейле | `assortiment` |
| pricing | ценообразование — статьи (ведёт на статью, 170) | Цены, маржа и уценка в рознице: статьи | Статьи о ценообразовании, марже и уценке в рознице | `ceny` |
| product-data | товарные данные — статьи (<10) | Товарные данные, PIM и PLM: статьи для fashion | Статьи о товарных данных, PIM и PLM в моде | `tovarnye-dannye` |
| excel | excel для аналитика — 10 | Excel для планирования в ритейле: статьи | Excel для планирования закупок и продаж: статьи | `excel` |
| careers (новая) | карьера аналитика — 10; профессия аналитик данных — 20 (статья рубрики: кто такой байер — 110, категорийный менеджер — 140) | Карьера в fashion-ритейле: аналитик, байер, менеджер | Карьера в аналитике fashion-ритейла: аналитик, байер и категорийный менеджер | `karera` |

Description рубрик (RU):

| Рубрика | Description |
|---|---|
| power-bi | Статьи о Power BI для ритейла: меры DAX, дашборды продаж, sell-through, RLS и отчёты для fashion-брендов. |
| assortment | Статьи о планировании ассортимента в fashion-ритейле: ассортиментная матрица, ABC/XYZ-анализ, размерные матрицы и закупки. |
| pricing | Статьи о ценообразовании в рознице: маржа и наценка, ценовая политика, ценовая линейка и уценка в fashion-ритейле. |
| product-data | Статьи о товарных данных: PIM- и PLM-системы, атрибуты товара, качество данных и справочники для fashion-брендов. |
| excel | Статьи об Excel для ритейла: бюджет закупок open-to-buy, ABC-анализ, расчёт оборачиваемости и бесплатные шаблоны. |
| careers | Статьи о карьере в fashion-ритейле: чем занимаются аналитик, байер и категорийный менеджер, какие навыки нужны и как начать. |

FAQ рубрики «Карьера»:
- Кто такой байер?
- Как стать аналитиком в ритейле?
- Чем категорийный менеджер отличается от товарного аналитика?

FAQ рубрик — по 3 вопроса, на русском. Например, для power-bi:
- Можно ли пользоваться Power BI бесплатно?
- Сколько учить Power BI? (оба PAA)
- Power BI или Excel для отчётов по продажам?

### Статьи (RU, текущие 8)

**sell-through** (P2)
- **Основной:** sell through — 10 (DE-ru 90, PL-ru 50)
- **Вторичные:** sell through что это — 10; процент продаж — 10; процент реализации товара — <10 (выдача про наценку)
- **Title:** Sell-through: что это и как посчитать в Excel и Power BI
- **Description:** Что такое sell-through, как его рассчитать в Excel и Power BI, какой уровень считается хорошим в fashion-ритейле и где чаще всего ошибаются.
- **H1:** Sell-through в ритейле: формула, норма и меры DAX в Power BI
- **H2:**
  - Что такое sell-through в ритейле
  - Формула sell-through и два способа расчёта
  - Какой sell-through считается хорошим в fashion-ритейле
  - Как посчитать sell-through в Excel
  - Меры DAX для sell-through в Power BI
  - Недельная кривая sell-through в отчёте
- **FAQ:**
  - Что такое sell-through простыми словами?
  - Как рассчитать sell-through?
  - Чем sell-in отличается от sell-through?
  - Как посчитать sell-through в Excel?
- **Слаг:** `sell-through`

**size-curve** (P2)
- **Основной:** размерная линейка — 30, KD 38
- **Вторичные:** размерная матрица — <10; размерный ряд — 170 (общий, про размеры одежды)
- **Title:** Размерная матрица закупки: расчёт по данным продаж
- **Description:** Как рассчитать размерную матрицу закупки по продажам: убрать дефицит, возвраты и акции, затем посчитать доли размеров по рынкам.
- **H1:** Как рассчитать размерную матрицу закупки по продажам прошлого сезона
- **H2:**
  - Что такое размерная матрица и размерная линейка в закупках
  - Почему «сырые» продажи дают неверную размерную матрицу
  - Три шага очистки данных перед расчётом размерной матрицы
  - Размерные матрицы по рынкам и категориям
- **FAQ:**
  - Чем размерная линейка отличается от размерной сетки?
  - Как дефицит размеров искажает размерную матрицу?
  - Как часто пересчитывать размерную матрицу?
- **Слаг:** `razmernaya-matrica-zakupki`

**product-attributes** (P2)
- **Основной:** атрибуты товара — 10
- **Вторичные:** характеристики товаров — 10; характеристика товара пример — 10
- **Title:** Атрибуты товара в PLM: справочник для fashion-бренда
- **Description:** Какие атрибуты товара нужны fashion-бренду в PLM и как описать правила для цвета, сезона и состава, которые соблюдают все рынки.
- **H1:** Стандарты атрибутов товара в PLM, которые работают на разных рынках
- **H2:**
  - Какие атрибуты товара нужны fashion-бренду в PLM
  - Структура справочника атрибутов товара
  - Правила для атрибута «цвет»
  - Коды сезонов, общие для всех рынков
  - Состав материала без свободного текста
- **FAQ:**
  - Что такое атрибуты товара?
  - Какие характеристики товара обязательны в fashion?
  - Кто отвечает за справочник атрибутов?
- **Слаг:** `atributy-tovara-plm`

**price-ladder** (P2)
- **Основной:** ценовой сегмент — 20 (UA 20)
- **Вторичные:** ценовые сегменты — 10; ценовая сегментация это — 10; ценовые категории товаров — 10; ценовая линейка — <10
- **Title:** Ценовая линейка и ценовые сегменты в fashion-ритейле
- **Description:** Как построить ценовую линейку: входной, средний и верхний ценовые сегменты в категории и во что обходится пробел между ценами.
- **H1:** Как построить ценовую линейку и ценовые сегменты до начала сезона
- **H2:**
  - Что такое ценовая линейка и ценовой сегмент
  - Входной, средний и верхний ценовые сегменты в категории
  - Сколько стоит пробел в ценовой линейке
  - Ценовая линейка на нескольких рынках и в разных валютах
- **FAQ:**
  - Что такое ценовой сегмент?
  - Сколько ценовых точек нужно категории?
  - Какие бывают виды цен? (PAA)
- **Слаг:** `cenovaya-linejka`

**dax-measures** (P2)
- **Основной:** dax функции — 10
- **Вторичные:** dax формулы — 10; меры dax — <10; dax — 480 (биржевой индекс, только в тексте)
- **Title:** Меры DAX в Power BI для дашборда KPI ритейла
- **Description:** Пять мер DAX для дашборда KPI ритейла в Power BI: покрытие запаса, продажи по полной цене, возвраты, недели запаса и маржа.
- **H1:** Пять мер DAX в Power BI, без которых не работает дашборд KPI ритейла
- **H2:**
  - Что такое меры DAX в Power BI
  - Мера DAX или вычисляемый столбец
  - Мера DAX для покрытия запаса
  - Доля продаж по полной цене в DAX
  - Процент возвратов в DAX
  - Недели запаса в DAX
  - Маржа в DAX
- **FAQ:**
  - Что такое мера DAX?
  - Чем мера отличается от вычисляемого столбца?
  - Как проверить меру DAX в Excel?
- **Слаг:** `mery-dax-power-bi`

**open-to-buy** (P2)
- **Основной:** open to buy — 10 (DE-ru 40)
- **Вторичные:** бюджет закупок — 10; otb — 70 (общий)
- **Title:** Open to buy: формула бюджета закупок и модель в Excel
- **Description:** Что такое бюджет закупок open-to-buy, как его рассчитать на примере и как собрать модель в Excel, которую команда ведёт весь сезон.
- **H1:** Бюджет закупок open-to-buy: формула и модель в Excel
- **H2:**
  - Что такое open to buy в ритейле
  - Формула open to buy с примером
  - Структура файла open-to-buy в Excel
  - Три проверки, которые не дают бюджету закупок разойтись с фактом
  - Бесплатный шаблон open-to-buy в Excel
- **FAQ:**
  - Что такое open to buy?
  - Как рассчитать бюджет закупок?
  - Как часто обновлять бюджет закупок?
- **Слаг:** `open-to-buy`

**row-level-security** (P2)
- **Основной:** rls power bi — 10
- **Вторичные:** безопасность на уровне строк power bi — <10
- **Title:** RLS в Power BI: доступ к отчётам по рынкам
- **Description:** Как настроить статический и динамический RLS в Power BI, чтобы каждый рынок видел в общем отчёте только свои продажи.
- **H1:** RLS в Power BI: безопасность на уровне строк в отчётах для нескольких рынков
- **H2:**
  - Что делает RLS в Power BI
  - Статический и динамический RLS для рынков
  - Роли рынков в Power BI по шагам
  - Как проверить RLS в Power BI
- **FAQ:**
  - Что такое RLS в Power BI?
  - Как проверить RLS?
  - Когда нужен динамический RLS?
- **Слаг:** `rls-power-bi`

**sell-in / sell-out** (P2)
- **Основной:** sell in sell out — 10 (UA 20)
- **Вторичные:** sell out — 590 (общий)
- **Title:** Sell-in, sell-through и sell-out: в чём разница
- **Description:** Чем различаются sell-in, sell-through и sell-out и почему коммерческий отдел и финансы показывают разные значения одного показателя.
- **H1:** Sell-in, sell-through и sell-out: почему коммерческий отдел и финансы видят разные цифры
- **H2:**
  - Sell-in, sell-through и sell-out: определения
  - Три расхождения в определении sell-through
  - Как согласовать одно определение sell-through с финансами
- **FAQ:**
  - Чем sell-in отличается от sell-out?
  - Что такое sell-out простыми словами?
  - Почему у финансов другой sell-through?
- **Слаг:** `sell-in-sell-through-sell-out`

## Обо мне `/ru/about`

- **Основной:** Татьяна Бандюк (бренд, общий кластер с главной)
- **Вторичные:**
  - товарный аналитик — 10 (выдача: вакансии hh.kz)
  - бренд аналитик — 10
  - аналитик продаж — 10
- **Title:** Обо мне — Татьяна Бандюк, аналитик fashion-ритейла
- **Description:** Татьяна Бандюк: около 10 лет в международном fashion-ритейле — бренд-аналитик и руководитель направления товарных данных. Варшава, EN/PL/RU.
- **H1:** Обо мне: Татьяна Бандюк, консультант по аналитике в ритейле и моде
- **H2:**
  - Опыт Global Brand Analyst и Product Data Lead в международном fashion-бренде
  - Проекты по ассортименту, ценам и товарным данным
  - Руководство командой товарных данных и аналитики
  - Карьера в аналитике fashion-ритейла
  - Образование: логистика, экономика и управление в БГЭУ
  - Дипломы и сертификаты по логистике, экономике и управлению
  - Рабочие языки и город: английский, польский, русский, Варшава
- **FAQ:**
  - Где работает Татьяна Бандюк?
  - На каких языках Татьяна ведёт проекты?
  - Какое у неё образование?
  - Чем товарный аналитик отличается от бренд-аналитика?
- **Слаг:** `/ru/about`, вариант `/ru/obo-mne`.

## Контакты `/ru/contact`

- **Основной:** консультант по аналитике — <10 (спроса нет)
- **Title:** Контакты — Татьяна Бандюк, аналитика в ритейле
- **Description:** Заявка на проект по аналитике: ассортимент, цены, отчёты Power BI или товарные данные. Ответ в течение одного рабочего дня, RU / EN / PL.
- **H1:** Связаться с Татьяной Бандюк по проекту аналитики в ритейле
- **H2:**
  - Как проходит заявка: ответ, звонок, объём работ
  - Форма заявки на проект по аналитике
  - Языки консультаций и город: Варшава
  - Вопросы о заявке на проект по аналитике
- **FAQ:**
  - Как быстро приходит ответ на заявку?
  - Можно ли провести первый звонок на русском?
  - Что написать в заявке?
  - Подписываете ли вы NDA до работы с данными?
- **Слаг:** `/ru/contact`, вариант `/ru/kontakty`.

## Курсы `/ru/courses`

- **Основной:** power bi обучение — 70 (UA 20), KD 9
- **Вторичные:**
  - power bi курс — 40 (UA 70)
  - курсы power bi — 30 (UA 70)
  - курс excel для аналитиков — 10
  - power bi для начинающих — 10
- **Title:** Обучение Power BI и Excel для аналитиков ритейла
- **Description:** Курсы Power BI и Excel для аналитиков ритейла и моды: отчёты KPI, бюджет закупок, цены и товарные данные. Запишитесь в лист ожидания.
- **H1:** Курсы Power BI и Excel для аналитиков ритейла и моды
- **H2:**
  - Программа обучения Power BI и Excel для ритейла
  - Для кого курсы по аналитике ритейла
  - Лист ожидания курса Power BI
  - Бесплатные шаблоны Excel для старта
- **FAQ:**
  - Когда стартует обучение Power BI?
  - Сколько учить Power BI? (PAA)
  - Где можно получить бесплатное обучение Power BI? (PAA)
  - Курс будет онлайн?
  - На каком языке будут курсы?
- **Выдача:** databoom.kz, reddit, Microsoft Learn, казахстанские учебные центры.

## Бесплатные шаблоны `/ru/free-templates`

- **Основной:** шаблоны excel — 10 (UA 40)
- **Вторичные:**
  - бюджет закупок — 10
  - шаблон бюджета excel — 10
  - дашборд в excel — 50 (ведёт на статью о дашбордах; упомянуть чек-лист)
- **Title:** Бесплатный шаблон Excel: бюджет закупок open-to-buy
- **Description:** Бесплатный шаблон Excel для бюджета закупок open-to-buy и чек-лист дашборда KPI в Power BI. Готовы к адаптации под вашу команду.
- **H1:** Бесплатный шаблон Excel для бюджета закупок и чек-лист дашборда KPI
- **H2:**
  - Шаблон Excel open-to-buy для планирования закупок
  - Чек-лист дашборда KPI для Power BI
  - Что внутри шаблона бюджета закупок
  - Как использовать шаблон в цикле планирования закупок
  - Скачать бесплатные шаблоны Excel для ритейла
- **FAQ:**
  - Шаблон действительно бесплатный?
  - Какая версия Excel нужна?
  - Подходит ли шаблон для нескольких рынков?
  - Как пользоваться чек-листом дашборда?
- **Слаг:** `/ru/free-templates`, вариант `/ru/besplatnye-shablony`.

---

## Политика конфиденциальности

Страница юридическая, ключевых слов не требует. H1 — «Privacy Policy for tatsianabandziuk.com» и аналоги на PL/RU. Индексировать можно, но в sitemap ставить низкий приоритет.
