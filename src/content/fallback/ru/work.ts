import type { ArticleBlock, CaseStudy, Category, Post } from "../../types";
import { caseStudies as enCases } from "../en/caseStudies";
import { posts as enPosts } from "../en/blog";

const P = (topic: string) =>
  `Текст-заглушка на тему: ${topic}. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`;

const tagMap: Record<string, string> = {
  "Product data · PLM": "Товарные данные · PLM",
  "Assortment · Range": "Ассортимент · Коллекция",
  "Pricing · Reporting": "Цены · Отчётность",
  "Reporting · Process": "Отчётность · Процессы",
  "Assortment · Size curves": "Ассортимент · Размерные кривые",
  "Product data · E-commerce": "Товарные данные · E-commerce",
};

type CaseText = {
  title: string;
  h1: CaseStudy["h1"];
  summary: string;
  metrics: [string, string];
  breadcrumb: string;
  challengeTitle: string;
  actionsTitle: string;
  resultsTitle: string;
  toolsTitle: string;
  serviceTitle: string;
  note: string;
  seoTitle: string;
};

const texts: Record<string, CaseText> = {
  "plm-product-data-standardisation": {
    title: "Стандартизация товарных данных на рынках Европы и Азии в системе PLM",
    h1: { before: "Стандартизация товарных данных на рынках Европы и Азии в", accent: "системе PLM" },
    summary: "Fashion-бренд на нескольких рынках. Один справочник атрибутов заменил множество локальных правил.",
    metrics: ["98% заполненности", "−60% правок данных"],
    breadcrumb: "Товарные данные и PLM",
    challengeTitle: "Задача: товарные данные на рынках Европы и Азии",
    actionsTitle: "Как стандартизировали товарные данные в PLM",
    resultsTitle: "Результаты стандартизации товарных данных в цифрах",
    toolsTitle: "Инструменты проекта по стандартизации данных PLM",
    serviceTitle: "Связанная услуга: качество товарных данных и стандартизация PLM",
    note: "Справочник был простой частью — согласовать его и было проектом.",
    seoTitle: "Кейс: стандартизация товарных данных в PLM",
  },
  "womenswear-range-plan-rebuild": {
    title: "Перестройка плана женской коллекции для европейского fashion-дистрибьютора",
    h1: { before: "Перестройка плана женской коллекции для", accent: "европейского fashion-дистрибьютора" },
    summary: "Артикулов на пятую часть меньше, глубина перенесена в проверенные размеры и цвета.",
    metrics: ["+18 п.п. sell-through", "−31% скидок"],
    breadcrumb: "Планирование ассортимента",
    challengeTitle: "Задача: планирование женской коллекции",
    actionsTitle: "Как перестроили план женской коллекции",
    resultsTitle: "Результаты перестройки плана коллекции в цифрах",
    toolsTitle: "Инструменты проекта по плану коллекции",
    serviceTitle: "Связанная услуга: планирование ассортимента",
    note: "Меньше артикулов, больше глубины — труднее всего был первый разговор.",
    seoTitle: "Кейс: перестройка плана женской коллекции",
  },
  "price-ladder-margin-report": {
    title: "Ценовая лестница и отчёт по марже для fashion-интернет-магазина",
    h1: { before: "Ценовая лестница и отчёт по марже для", accent: "fashion-интернет-магазина" },
    summary: "Входные и верхние цены по категориям, единые для трёх рынков и под еженедельным контролем в Power BI.",
    metrics: ["+2,4 п.п. маржи", "3 рынка"],
    breadcrumb: "Анализ цен",
    challengeTitle: "Задача: цены в fashion e-commerce",
    actionsTitle: "Как построили ценовую лестницу и отчёт по марже",
    resultsTitle: "Результаты ценового проекта в цифрах",
    toolsTitle: "Инструменты ценового проекта",
    serviceTitle: "Связанная услуга: анализ цен в ритейле",
    note: "Разрыв в лестнице — это цена, которую за вас ставит кто-то другой.",
    seoTitle: "Кейс: ценовая лестница и отчёт по марже",
  },
  "weekly-retail-trade-report": {
    title: "Еженедельный торговый отчёт для мультибрендовой сети",
    h1: { before: "Еженедельный торговый отчёт для", accent: "мультибрендовой сети" },
    summary: "Один набор определений и понедельничный отчёт вместо четырёх конкурирующих таблиц.",
    metrics: ["40 ч/мес. экономии", "4 → 1 отчёт"],
    breadcrumb: "Отчётность",
    challengeTitle: "Задача: еженедельная торговая отчётность",
    actionsTitle: "Как внедрили еженедельный торговый отчёт",
    resultsTitle: "Результаты еженедельного отчёта в цифрах",
    toolsTitle: "Инструменты проекта по отчётности",
    serviceTitle: "Связанная услуга: настройка аналитических процессов",
    note: "Отчёт стал проще, когда все договорились, зачем он нужен.",
    seoTitle: "Кейс: еженедельный торговый отчёт",
  },
  "menswear-size-curve-rebuild": {
    title: "Новые размерные кривые для мужского бренда после двух сезонов дефицита",
    h1: { before: "Новые размерные кривые для мужского бренда после", accent: "двух сезонов дефицита" },
    summary: "Возвраты и дефицит убраны из истории до пересчёта кривых по каждому рынку.",
    metrics: ["−27% разбитых рядов", "+9 п.п. полной цены"],
    breadcrumb: "Размерные кривые",
    challengeTitle: "Задача: размерные кривые в мужской одежде",
    actionsTitle: "Как пересчитали размерные кривые",
    resultsTitle: "Результаты проекта по размерным кривым в цифрах",
    toolsTitle: "Инструменты проекта по размерным кривым",
    serviceTitle: "Связанная услуга: планирование ассортимента",
    note: "Распроданный размер — не значит непопулярный.",
    seoTitle: "Кейс: размерные кривые в мужской одежде",
  },
  "ecommerce-catalogue-attribute-cleaning": {
    title: "Очистка атрибутов товаров перед миграцией каталога интернет-магазина",
    h1: { before: "Очистка атрибутов товаров перед миграцией", accent: "каталога интернет-магазина" },
    summary: "Сопоставление атрибутов и правила проверки согласованы до миграции — фильтры заработали с первого дня.",
    metrics: ["99% сопоставлено", "0 заблокированных SKU"],
    breadcrumb: "Товарные данные",
    challengeTitle: "Задача: данные перед миграцией каталога",
    actionsTitle: "Что сделали перед миграцией каталога",
    resultsTitle: "Результаты миграции каталога в цифрах",
    toolsTitle: "Инструменты проекта по миграции",
    serviceTitle: "Связанная услуга: качество товарных данных и стандартизация PLM",
    note: "Фильтры работают, только если данные под ними согласованы.",
    seoTitle: "Кейс: атрибуты товаров перед миграцией e-commerce",
  },
};

const factLabels: Record<string, string> = {
  Business: "Компания",
  Markets: "Рынки",
  Scope: "Объём",
  Duration: "Срок",
  Role: "Роль",
  Category: "Категория",
  Audience: "Аудитория",
};

export const caseStudies: CaseStudy[] = enCases.map((c) => {
  const t = texts[c.slug];
  return {
    ...c,
    tag: tagMap[c.tag] ?? c.tag,
    title: t.title,
    h1: t.h1,
    summary: t.summary,
    intro: t.summary,
    cardMetrics: t.metrics,
    breadcrumb: t.breadcrumb,
    facts: c.facts.map((f) => ({ label: factLabels[f.label] ?? f.label, value: "текст-заглушка" })),
    factsNote: "Клиент анонимизирован · данные-заглушки",
    challengeTitle: t.challengeTitle,
    challenge: [P(t.challengeTitle.toLowerCase())],
    challengePoints: ["Проблема-заглушка № 1", "Проблема-заглушка № 2", "Проблема-заглушка № 3"],
    actionsTitle: t.actionsTitle,
    actions: c.actions.map((a, i) => ({ label: a.label, title: `Этап ${i + 1}: описание-заглушка`, text: "Текст-заглушка описания этапа проекта." })),
    resultsTitle: t.resultsTitle,
    results: c.results.map((r) => ({ ...r, value: r.value.replace(".", ","), unit: r.unit === "pp" ? "п.п." : r.unit === "h" ? "ч" : r.unit === "days" ? "дня" : r.unit, label: "описание результата — заглушка" })),
    toolsTitle: t.toolsTitle,
    tools: c.tools.map((tool) => ({ ...tool, title: `${tool.label}: инструмент проекта`, text: "Текст-заглушка." })),
    serviceTitle: t.serviceTitle,
    serviceText: "Тот же метод, адаптированный под ваши системы и команду. Текст-заглушка.",
    serviceChips: ["текст-заглушка"],
    note: t.note,
    seo: { title: t.seoTitle, description: t.summary },
  };
});

export const categories: Category[] = [
  { slug: "power-bi", label: "Power BI", h1: "Power BI в аналитике ритейла: статьи и руководства", intro: "Паттерны DAX, модели данных и дашборды для sell-through, остатков и маржи в фешн-ритейле.", serviceSlug: "power-bi-dashboards", seo: { title: "Power BI в аналитике ритейла — статьи", description: "Паттерны DAX, модели данных и дашборды Power BI для фешн-ритейла." } },
  { slug: "assortment", label: "Ассортимент", h1: "Статьи о планировании ассортимента в фешн-ритейле", intro: "Архитектура коллекции, размерные кривые и планирование закупок на примерах из fashion.", serviceSlug: "assortment-planning", seo: { title: "Планирование ассортимента — статьи", description: "Архитектура коллекции, размерные кривые и план закупок в фешн-ритейле." } },
  { slug: "pricing", label: "Цены", h1: "Статьи об анализе цен и скидок в ритейле", intro: "Ценовые лестницы, цены на нескольких рынках и решения о скидках на основе данных.", serviceSlug: "retail-pricing-analysis", seo: { title: "Анализ цен и скидок — статьи", description: "Ценовые лестницы и анализ скидок в фешн-ритейле." } },
  { slug: "product-data", label: "Товарные данные", h1: "Статьи о товарных данных и PLM для fashion-брендов", intro: "Справочники атрибутов, качество данных в PLM и правила, которые работают на разных рынках.", serviceSlug: "product-data-quality-plm", seo: { title: "Товарные данные и PLM — статьи", description: "Справочники атрибутов и качество данных PLM для fashion-брендов." } },
  { slug: "excel", label: "Excel", h1: "Excel в планировании ритейла: статьи и шаблоны", intro: "Open-to-buy, планы закупок и модели маржи в Excel, которые планировщики могут поддерживать.", serviceSlug: "excel-retail-planning-models", seo: { title: "Excel в планировании ритейла — статьи", description: "Модели open-to-buy и плана закупок в Excel." } },
];

type PostText = { title: string; h1: Post["h1"]; excerpt: string; h2: string[] };

const postTexts: Record<string, PostText> = {
  "size-curve-from-sales-data": {
    title: "Как построить размерную кривую по продажам прошлого сезона",
    h1: { before: "Как построить размерную кривую по", accent: "продажам прошлого сезона" },
    excerpt: "Сначала уберите из данных возвраты и дефицит, и только потом доверяйте размерному распределению.",
    h2: ["Почему сырые продажи дают неверную размерную кривую", "Три шага очистки данных перед расчётом размерной кривой", "Размерные кривые по рынкам и категориям"],
  },
  "product-attribute-standards-plm": {
    title: "Стандарты атрибутов товаров, которые работают на трёх рынках",
    h1: { before: "Стандарты атрибутов товаров, которые работают на", accent: "трёх рынках" },
    excerpt: "Практический справочник атрибутов для PLM с правилами для цвета, сезона и состава.",
    h2: ["Правила атрибута «цвет» в справочнике PLM", "Правила кодов сезонов на разных рынках", "Состав товара без свободного текста"],
  },
  "price-ladder-analysis": {
    title: "Как читать ценовую лестницу перед установкой цен на следующий сезон",
    h1: { before: "Как читать ценовую лестницу перед установкой цен на", accent: "следующий сезон" },
    excerpt: "Входные и верхние цены по категориям и во что обходится разрыв в лестнице.",
    h2: ["Входной, основной и верхний ценовые уровни категории", "Во что обходится разрыв в ценовой лестнице"],
  },
  "dax-measures-retail-kpi-dashboard": {
    title: "Пять мер DAX, которые нужны каждому дашборду KPI в ритейле",
    h1: { before: "Пять мер DAX, которые нужны каждому", accent: "дашборду KPI в ритейле" },
    excerpt: "Покрытие запасом, доля полной цены, возвраты, недели запаса и маржинальный доход.",
    h2: ["Мера покрытия запасом в DAX", "Мера доли продаж по полной цене в DAX", "Мера доли возвратов в DAX"],
  },
  "open-to-buy-model-excel": {
    title: "Модель open-to-buy в Excel, которую планировщики будут поддерживать",
    h1: { before: "Модель open-to-buy в Excel, которую", accent: "планировщики будут поддерживать" },
    excerpt: "Структура, распределение и три проверки, которые не дают модели «уплыть» в сезоне.",
    h2: ["Структура книги open-to-buy", "Три проверки, которые не дают open-to-buy «уплыть»"],
  },
  "row-level-security-retail-reporting": {
    title: "Защита на уровне строк в Power BI для отчётности по нескольким рынкам",
    h1: { before: "Защита на уровне строк в Power BI для", accent: "отчётности по нескольким рынкам" },
    excerpt: "Один отчёт, много рынков: каждая команда видит свои цифры без копий.",
    h2: ["Роли рынков в защите на уровне строк Power BI"],
  },
  "sell-through-vs-finance": {
    title: "Почему ваш график sell-through не совпадает с финансами",
    h1: { before: "Почему ваш график sell-through", accent: "не совпадает с финансами" },
    excerpt: "Три расхождения в определениях, которые объясняют большинство споров об отчётах.",
    h2: ["Три расхождения в определении sell-through"],
  },
};

const sellThroughBody: ArticleBlock[] = [
  { type: "p", text: "Sell-through отвечает на один вопрос: какая доля того, что мы сделали доступным, действительно продана? Звучит просто, пока два человека на одной встрече не называют разные цифры — обычно потому, что один делит на поступления, а другой на поступления плюс начальный остаток." },
  { type: "h2", id: "definition", text: "Определение sell-through в отчётности ритейла" },
  { type: "p", text: "Выберите одно определение для бренда, зафиксируйте его и добавьте в описание отчёта. Вариант ниже делит чистые продажи в штуках на все штуки, доступные в периоде." },
  { type: "formula", text: "sell-through % = чистые продажи, шт. ÷ (начальный остаток + поступления)" },
  { type: "h2", id: "dax", text: "Меры DAX для расчёта sell-through в Power BI" },
  { type: "p", text: "Три меры: чистые штуки, доступные штуки и их отношение. Раздельные меры позволяют проверить результат и показать оба знаменателя рядом, пока определение согласуется." },
  { type: "code", code: "Net Units :=\nSUM ( Sales[Units] ) - SUM ( Sales[ReturnUnits] )\n\nAvailable Units :=\nCALCULATE (\n    SUM ( Stock[OpeningUnits] ) + SUM ( Receipts[Units] ),\n    REMOVEFILTERS ( 'Date'[Week] )\n)\n\nSell-Through % :=\nDIVIDE ( [Net Units], [Available Units] )", caption: "Названия таблиц и столбцов условные — переименуйте под свою модель." },
  { type: "h2", id: "weekly-curve", text: "Недельная кривая sell-through в дашборде ритейла" },
  { type: "p", text: "Один процент говорит мало. Кривая накопленного sell-through по неделям на фоне прошлого сезона заставляет действовать: слишком пологая — закупили слишком глубоко, слишком крутая — размеры закончатся до конца сезона." },
  { type: "chart", title: "Накопленный sell-through, недели 1–12", legend: "этот сезон vs прошлый", caption: "данные-заглушки · сплошная = этот сезон, пунктир = прошлый" },
  { type: "h2", id: "mistakes", text: "Частые ошибки при расчёте sell-through в Power BI" },
  { type: "list", items: ["Фильтр знаменателя по неделе, из-за которого доступность обнуляется каждую неделю.", "Возвраты внутри продаж, что завышает sell-through в категориях с высокой долей возвратов.", "Смешение рынков с разной неделей старта сезона в одном накопленном графике."] },
];

export const posts: Post[] = enPosts.map((p) => {
  if (p.slug === "sell-through-rate-power-bi") {
    return {
      ...p,
      title: "Как рассчитать sell-through в Power BI",
      h1: { before: "Как рассчитать sell-through в", accent: "Power BI" },
      excerpt: "Паттерн DAX, два путаемых знаменателя и недельный график.",
      lead: "Два знаменателя, один паттерн DAX и недельный вид, с которым sell-through полезен на закупочной встрече.",
      body: sellThroughBody,
      seo: { title: "Как рассчитать sell-through в Power BI (DAX)", description: "Определение sell-through, меры DAX и недельная кривая продаж в дашбордах Power BI." },
    };
  }
  const t = postTexts[p.slug];
  let i = 0;
  const body: ArticleBlock[] = p.body.map((b) => {
    if (b.type === "h2") return { ...b, text: t.h2[i++] ?? b.text };
    if (b.type === "p") return { type: "p", text: P(t.title.toLowerCase()) };
    if (b.type === "list") return { type: "list", items: b.items.map((_, n) => `Пункт-заглушка № ${n + 1}.`) };
    return b;
  });
  return { ...p, title: t.title, h1: t.h1, excerpt: t.excerpt, lead: t.excerpt, body, seo: { title: t.title, description: t.excerpt } };
});
