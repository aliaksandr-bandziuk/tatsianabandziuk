# Новые заголовки и описания для Sanity Studio

Одиннадцать страниц, которые уже стоят на позициях 3–16 в Google и не дают кликов. Логика правок одна: в сниппете обещать то, чего нет в ИИ-ответе, — готовую формулу, таблицу норм, калькулятор, разобранный пример, число шагов.

В репозитории (`src/content/fallback/**`) всё это уже применено. Живой сайт читает Sanity, поэтому то же самое нужно внести в Studio: документ `post` (или `calculatorPage`) нужного языка, поле SEO.

Длины проверены: title до 60 символов, description до 155.

---

## 1. Статья «sell-in, sell-through, sell-out», русская версия

Было на позиции 7,3 при 523 показах и одном клике — больше половины всех показов сайта.

Title: Sell-in, sell-through, sell-out: разница и формулы

Description: Разница между sell-in, sell-through и sell-out на одном примере: три формулы, таблица отличий и причина, по которой у продаж и финансов цифры не сходятся.

## 2. Статья «sell-through», русская версия

Позиция 5,8 при 97 показах.

Title: Sell-through: формула, нормы по категориям, калькулятор

Description: Формула sell-through с возвратами и без них, нормы для fashion по неделям сезона, расчёт в Excel и Power BI и бесплатный калькулятор на сайте.

## 3. Статья «sell-in, sell-through, sell-out», польская версия

Позиция 4,1 при 60 показах.

Title: Sell-in, sell-through, sell-out: różnice i wzory

Description: Różnice między sell-in, sell-through i sell-out na jednym przykładzie: trzy wzory, tabela porównawcza i powód rozbieżności między handlem a finansami.

## 4. Статья о мерах DAX, русская версия

Позиция 7,4 при 19 показах.

Title: Меры DAX для ритейла: 5 готовых формул с разбором

Description: Пять мер DAX для отчёта по продажам: sell-through, недели запаса, продажи по полной цене, возвраты и маржа. Код можно скопировать и вставить в Power BI.

## 5. Статья о KPI в рознице, польская версия

Позиция 9,6 при 12 показах, один клик.

Title: KPI w handlu detalicznym: 8 wskaźników ze wzorami

Description: Osiem wskaźników sprzedaży z gotowymi wzorami: sell-through, rotacja zapasu, GMROI, tygodnie zapasu i marża, z wartościami odniesienia i kalkulatorami.

## 6. Статья с примерами дашбордов Power BI, английская версия

Позиция 7,0 при 15 показах, один клик.

Title: Power BI Retail Dashboard Examples: 3 Layouts and DAX

Description: Three retail Power BI dashboards page by page: weekly trade, category review, end of season. The KPI list, layout rules and the DAX behind each measure.

## 7. Статья о байере и категорийном менеджере, русская версия

Позиция 5,4 при 12 показах.

Title: Байер, категорийный менеджер, аналитик: кто что делает

Description: Чем занимается байер, категорийный менеджер и товарный аналитик: таблица обязанностей, зоны ответственности и путь в профессию из смежных ролей.

## 8. Статья о RLS в Power BI, русская версия

Позиция 6,0 при 7 показах.

Title: RLS в Power BI: настройка доступа по рынкам по шагам

Description: Статический и динамический RLS в Power BI по шагам: роли, фильтр на DAX, таблица доступов и проверка. Каждый рынок видит в отчёте только свои продажи.

## 9. Статья о RLS в Power BI, польская версия

Позиция 6,3 при 6 показах.

Title: RLS w Power BI: dostęp do raportu według rynków

Description: Statyczny i dynamiczny RLS w Power BI krok po kroku: role, filtr DAX, tabela uprawnień i test. Każdy rynek widzi w jednym raporcie tylko swoje dane.

## 10. Статья о размерной кривой, английская версия

Позиция 11,1 при 13 показах.

Title: Size Curve Analysis: Size Ratios from Sales Data in 5 Steps

Description: Build a size curve from sales data in five steps: strip stock-outs, returns and promo weeks, then set size ratios per category, market and store.

## 11. Калькулятор оборачиваемости, английская версия

Позиция 12,9 при 16 показах. Документ `calculatorPage`, не `post`.

Title: Stock Turn Calculator: Turns, Days and Weeks of Cover

Description: Work out stock turn, days of inventory and weeks of cover in one step. Formulas, a worked fashion example and the ranges each figure usually sits in.

---

## Как проверять результат

Эти страницы уже ранжируются, поэтому эффект виден по CTR, а не по позициям. Через три-четыре недели сравните в Search Console CTR по этим адресам с текущим: сейчас по ним 2 клика на 780 показов, то есть около 0,26%. Нормальная цель для позиций 4–8 на информационных запросах — 2–4%, но часть запросов здесь определительные, и там потолок ниже.

Если по конкретной странице CTR не сдвинулся, а позиция держится, причина обычно не в тексте сниппета, а в том, что ответ полностью закрывается блоком ИИ. В этом случае дешевле переводить страницу в формат, который в ответ не умещается: калькулятор, шаблон, большая таблица.
