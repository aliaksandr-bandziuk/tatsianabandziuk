import type { ArticleBlock, CaseStudy, Category, Post } from "../../types";
import { caseStudies as enCases } from "../en/caseStudies";
import { posts as enPosts } from "../en/blog";

const P = (topic: string) =>
  `Tekst zastępczy o temacie: ${topic}. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`;

const tagMap: Record<string, string> = {
  "Product data · PLM": "Dane produktowe · PLM",
  "Assortment · Range": "Asortyment · Kolekcja",
  "Pricing · Reporting": "Ceny · Raportowanie",
  "Reporting · Process": "Raportowanie · Procesy",
  "Assortment · Size curves": "Asortyment · Krzywe rozmiarów",
  "Product data · E-commerce": "Dane produktowe · E-commerce",
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
    title: "Standaryzacja danych produktowych na rynkach Europy i Azji w systemie PLM",
    h1: { before: "Standaryzacja danych produktowych na rynkach Europy i Azji w", accent: "systemie PLM" },
    summary: "Marka modowa działająca na wielu rynkach. Jeden słownik atrybutów zastąpił wiele lokalnych konwencji.",
    metrics: ["98% kompletności", "−60% poprawek danych"],
    breadcrumb: "Dane produktowe i PLM",
    challengeTitle: "Wyzwanie: dane produktowe na rynkach Europy i Azji",
    actionsTitle: "Jak ustandaryzowano dane produktowe w PLM",
    resultsTitle: "Wyniki standaryzacji danych produktowych w liczbach",
    toolsTitle: "Narzędzia w projekcie standaryzacji danych PLM",
    serviceTitle: "Powiązana usługa: jakość danych produktowych i standaryzacja PLM",
    note: "Słownik był łatwy — uzgodnienie go było właściwym projektem.",
    seoTitle: "Case study: standaryzacja danych produktowych w PLM",
  },
  "womenswear-range-plan-rebuild": {
    title: "Przebudowa planu kolekcji damskiej dla europejskiego dystrybutora mody",
    h1: { before: "Przebudowa planu kolekcji damskiej dla", accent: "europejskiego dystrybutora mody" },
    summary: "Liczba opcji mniejsza o jedną piątą, głębokość przeniesiona do sprawdzonych rozmiarów i kolorów.",
    metrics: ["+18 pp sell-through", "−31% obniżek"],
    breadcrumb: "Planowanie asortymentu",
    challengeTitle: "Wyzwanie: planowanie kolekcji damskiej",
    actionsTitle: "Jak przebudowano plan kolekcji damskiej",
    resultsTitle: "Wyniki przebudowy planu kolekcji w liczbach",
    toolsTitle: "Narzędzia w projekcie planu kolekcji",
    serviceTitle: "Powiązana usługa: planowanie asortymentu i zarządzanie kolekcją",
    note: "Mniej opcji, więcej głębokości — najtrudniejsza była pierwsza rozmowa.",
    seoTitle: "Case study: przebudowa planu kolekcji damskiej",
  },
  "price-ladder-margin-report": {
    title: "Drabinka cenowa i raport marży dla sklepu internetowego z modą",
    h1: { before: "Drabinka cenowa i raport marży dla", accent: "sklepu internetowego z modą" },
    summary: "Ceny wejścia i wyjścia w każdej kategorii, spójne na trzech rynkach i monitorowane co tydzień w Power BI.",
    metrics: ["+2,4 pp marży", "3 rynki"],
    breadcrumb: "Analiza cen",
    challengeTitle: "Wyzwanie: ceny w e-commerce modowym",
    actionsTitle: "Jak zbudowano drabinkę cenową i raport marży",
    resultsTitle: "Wyniki projektu cenowego w liczbach",
    toolsTitle: "Narzędzia w projekcie cenowym",
    serviceTitle: "Powiązana usługa: analiza cen w handlu detalicznym",
    note: "Luka w drabince to cena, którą ustala za Ciebie ktoś inny.",
    seoTitle: "Case study: drabinka cenowa i raport marży",
  },
  "weekly-retail-trade-report": {
    title: "Tygodniowy raport handlowy dla sieci wielomarkowej",
    h1: { before: "Tygodniowy raport handlowy dla", accent: "sieci wielomarkowej" },
    summary: "Jeden zestaw definicji i raport na poniedziałek zamiast czterech konkurujących arkuszy.",
    metrics: ["40 h/mies. oszczędności", "4 → 1 raport"],
    breadcrumb: "Raportowanie",
    challengeTitle: "Wyzwanie: tygodniowe raportowanie handlowe",
    actionsTitle: "Jak wdrożono tygodniowy raport handlowy",
    resultsTitle: "Wyniki raportu tygodniowego w liczbach",
    toolsTitle: "Narzędzia w projekcie raportowym",
    serviceTitle: "Powiązana usługa: organizacja procesów analitycznych",
    note: "Raport się uprościł, gdy wszyscy uzgodnili, do czego służy.",
    seoTitle: "Case study: tygodniowy raport handlowy",
  },
  "menswear-size-curve-rebuild": {
    title: "Nowe krzywe rozmiarów dla marki męskiej po dwóch sezonach braków",
    h1: { before: "Nowe krzywe rozmiarów dla marki męskiej po", accent: "dwóch sezonach braków" },
    summary: "Zwroty i braki usunięte z historii przed przeliczeniem krzywych dla każdego rynku.",
    metrics: ["−27% niepełnych rozmiarów", "+9 pp pełnej ceny"],
    breadcrumb: "Krzywe rozmiarów",
    challengeTitle: "Wyzwanie: krzywe rozmiarów w modzie męskiej",
    actionsTitle: "Jak przebudowano krzywe rozmiarów",
    resultsTitle: "Wyniki projektu krzywych rozmiarów w liczbach",
    toolsTitle: "Narzędzia w projekcie krzywych rozmiarów",
    serviceTitle: "Powiązana usługa: planowanie asortymentu i zarządzanie kolekcją",
    note: "Wyprzedany rozmiar to nie niepopularny rozmiar.",
    seoTitle: "Case study: krzywe rozmiarów w modzie męskiej",
  },
  "ecommerce-catalogue-attribute-cleaning": {
    title: "Porządkowanie atrybutów produktów przed migracją katalogu e-commerce",
    h1: { before: "Porządkowanie atrybutów produktów przed migracją", accent: "katalogu e-commerce" },
    summary: "Mapowanie atrybutów i reguły walidacji uzgodnione przed migracją, więc filtry działały od pierwszego dnia.",
    metrics: ["99% zmapowanych", "0 zablokowanych SKU"],
    breadcrumb: "Dane produktowe",
    challengeTitle: "Wyzwanie: dane przed migracją katalogu",
    actionsTitle: "Co zrobiono przed migracją katalogu",
    resultsTitle: "Wyniki migracji katalogu w liczbach",
    toolsTitle: "Narzędzia w projekcie migracji",
    serviceTitle: "Powiązana usługa: jakość danych produktowych i standaryzacja PLM",
    note: "Filtry działają tylko wtedy, gdy dane pod nimi są zgodne.",
    seoTitle: "Case study: atrybuty produktów przed migracją e-commerce",
  },
};

const factLabels: Record<string, string> = {
  Business: "Firma",
  Markets: "Rynki",
  Scope: "Zakres",
  Duration: "Czas trwania",
  Role: "Rola",
  Category: "Kategoria",
  Audience: "Odbiorcy",
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
    facts: c.facts.map((f) => ({ label: factLabels[f.label] ?? f.label, value: "tekst zastępczy" })),
    factsNote: "Klient zanonimizowany · dane zastępcze",
    challengeTitle: t.challengeTitle,
    challenge: [P(t.challengeTitle.toLowerCase())],
    challengePoints: ["Problem zastępczy nr 1", "Problem zastępczy nr 2", "Problem zastępczy nr 3"],
    actionsTitle: t.actionsTitle,
    actions: c.actions.map((a, i) => ({ label: a.label, title: `Etap ${i + 1}: opis zastępczy`, text: "Tekst zastępczy opisu etapu projektu." })),
    resultsTitle: t.resultsTitle,
    results: c.results.map((r) => ({ ...r, value: r.value.replace(".", ","), label: "opis wyniku — tekst zastępczy" })),
    toolsTitle: t.toolsTitle,
    tools: c.tools.map((tool) => ({ ...tool, title: `${tool.label}: narzędzie w projekcie`, text: "Tekst zastępczy." })),
    serviceTitle: t.serviceTitle,
    serviceText: "Ta sama metoda dopasowana do Twoich systemów i zespołu. Tekst zastępczy.",
    serviceChips: ["tekst zastępczy"],
    note: t.note,
    seo: { title: t.seoTitle, description: t.summary },
  };
});

export const categories: Category[] = [
  { slug: "power-bi", label: "Power BI", h1: "Power BI w analityce handlowej: artykuły i poradniki", intro: "Wzorce DAX, modele danych i dashboardy dla sell-through, zapasów i marży w handlu modą.", serviceSlug: "power-bi-dashboards", seo: { title: "Power BI w analityce handlowej — artykuły", description: "Wzorce DAX, modele danych i dashboardy Power BI dla handlu modą." } },
  { slug: "assortment", label: "Asortyment", h1: "Artykuły o planowaniu asortymentu w handlu modą", intro: "Architektura kolekcji, krzywe rozmiarów i planowanie zakupów na przykładach z branży mody.", serviceSlug: "assortment-planning", seo: { title: "Planowanie asortymentu — artykuły", description: "Architektura kolekcji, krzywe rozmiarów i plan zakupów w handlu modą." } },
  { slug: "pricing", label: "Ceny", h1: "Artykuły o analizie cen i obniżek w handlu", intro: "Drabinki cenowe, ceny na wielu rynkach i decyzje o obniżkach oparte na danych.", serviceSlug: "retail-pricing-analysis", seo: { title: "Analiza cen i obniżek — artykuły", description: "Drabinki cenowe i analiza obniżek w handlu modą." } },
  { slug: "product-data", label: "Dane produktowe", h1: "Artykuły o danych produktowych i PLM dla marek modowych", intro: "Słowniki atrybutów, jakość danych w PLM i reguły działające na wielu rynkach.", serviceSlug: "product-data-quality-plm", seo: { title: "Dane produktowe i PLM — artykuły", description: "Słowniki atrybutów i jakość danych PLM dla marek modowych." } },
  { slug: "excel", label: "Excel", h1: "Excel w planowaniu handlowym: artykuły i szablony", intro: "Open-to-buy, plany zakupów i modele marży w Excelu, które planiści potrafią utrzymać.", serviceSlug: "excel-retail-planning-models", seo: { title: "Excel w planowaniu handlowym — artykuły", description: "Modele open-to-buy i planu zakupów w Excelu." } },
];

type PostText = { title: string; h1: Post["h1"]; excerpt: string; h2: string[] };

const postTexts: Record<string, PostText> = {
  "size-curve-from-sales-data": {
    title: "Jak zbudować krzywą rozmiarów na podstawie sprzedaży z poprzedniego sezonu",
    h1: { before: "Jak zbudować krzywą rozmiarów na podstawie", accent: "sprzedaży z poprzedniego sezonu" },
    excerpt: "Najpierw usuń z danych zwroty i braki, dopiero potem zaufaj podziałowi rozmiarów.",
    h2: ["Dlaczego surowa sprzedaż daje błędną krzywą rozmiarów", "Trzy kroki czyszczenia danych przed wyliczeniem krzywej rozmiarów", "Krzywe rozmiarów dla rynków i kategorii"],
  },
  "product-attribute-standards-plm": {
    title: "Standardy atrybutów produktów, które działają na trzech rynkach",
    h1: { before: "Standardy atrybutów produktów, które działają na", accent: "trzech rynkach" },
    excerpt: "Praktyczny słownik atrybutów dla PLM z regułami dla koloru, sezonu i składu.",
    h2: ["Reguły atrybutu koloru w słowniku PLM", "Reguły kodów sezonów na różnych rynkach", "Skład produktu bez wolnego tekstu"],
  },
  "price-ladder-analysis": {
    title: "Jak czytać drabinkę cenową przed ustaleniem cen na kolejny sezon",
    h1: { before: "Jak czytać drabinkę cenową przed ustaleniem cen na", accent: "kolejny sezon" },
    excerpt: "Ceny wejścia i wyjścia w każdej kategorii oraz koszt luki w drabince.",
    h2: ["Progi cenowe wejścia, środka i topu w kategorii", "Ile kosztuje luka w drabince cenowej"],
  },
  "dax-measures-retail-kpi-dashboard": {
    title: "Pięć miar DAX, których potrzebuje każdy dashboard KPI w handlu",
    h1: { before: "Pięć miar DAX, których potrzebuje każdy", accent: "dashboard KPI w handlu" },
    excerpt: "Pokrycie zapasem, udział pełnej ceny, zwroty, tygodnie zapasu i marża kontrybucyjna.",
    h2: ["Miara pokrycia zapasem w DAX", "Miara udziału sprzedaży w pełnej cenie w DAX", "Miara wskaźnika zwrotów w DAX"],
  },
  "open-to-buy-model-excel": {
    title: "Model open-to-buy w Excelu, który planiści będą utrzymywać",
    h1: { before: "Model open-to-buy w Excelu, który", accent: "planiści będą utrzymywać" },
    excerpt: "Struktura, rozłożenie w czasie i trzy kontrole, które zatrzymują rozjazd modelu w sezonie.",
    h2: ["Struktura skoroszytu open-to-buy", "Trzy kontrole, które zatrzymują rozjazd open-to-buy"],
  },
  "row-level-security-retail-reporting": {
    title: "Zabezpieczenia na poziomie wierszy w Power BI dla raportów wielu rynków",
    h1: { before: "Zabezpieczenia na poziomie wierszy w Power BI dla", accent: "raportów wielu rynków" },
    excerpt: "Jeden raport, wiele rynków: każdy zespół widzi swoje liczby bez kopii.",
    h2: ["Role rynków w zabezpieczeniach Power BI"],
  },
  "sell-through-vs-finance": {
    title: "Dlaczego Twój wykres sell-through nie zgadza się z finansami",
    h1: { before: "Dlaczego Twój wykres sell-through", accent: "nie zgadza się z finansami" },
    excerpt: "Trzy różnice w definicjach, które tłumaczą większość sporów o raporty.",
    h2: ["Trzy różnice w definicji sell-through"],
  },
};

const sellThroughBody: ArticleBlock[] = [
  { type: "p", text: "Sell-through odpowiada na jedno pytanie: jaka część tego, co udostępniliśmy, faktycznie się sprzedała? Brzmi prosto, dopóki dwie osoby na tym samym spotkaniu nie podadzą różnych liczb — zwykle dlatego, że jedna dzieli przez dostawy, a druga przez dostawy plus zapas początkowy." },
  { type: "h2", id: "definition", text: "Definicja sell-through w raportowaniu handlowym" },
  { type: "p", text: "Wybierz jedną definicję dla marki, zapisz ją i umieść w opisie raportu. Poniższa wersja dzieli sprzedaż netto w sztukach przez wszystkie sztuki dostępne w okresie." },
  { type: "formula", text: "sell-through % = sprzedaż netto w szt. ÷ (zapas początkowy + dostawy)" },
  { type: "h2", id: "dax", text: "Miary DAX dla sell-through w Power BI" },
  { type: "p", text: "Trzy miary: sztuki netto, sztuki dostępne i ich stosunek. Rozdzielenie ich pozwala sprawdzić wynik i pokazać oba mianowniki obok siebie, zanim definicja zostanie uzgodniona." },
  { type: "code", code: "Net Units :=\nSUM ( Sales[Units] ) - SUM ( Sales[ReturnUnits] )\n\nAvailable Units :=\nCALCULATE (\n    SUM ( Stock[OpeningUnits] ) + SUM ( Receipts[Units] ),\n    REMOVEFILTERS ( 'Date'[Week] )\n)\n\nSell-Through % :=\nDIVIDE ( [Net Units], [Available Units] )", caption: "Nazwy tabel i kolumn są przykładowe — dopasuj je do swojego modelu." },
  { type: "h2", id: "weekly-curve", text: "Tygodniowa krzywa sell-through w dashboardzie" },
  { type: "p", text: "Sam procent mówi niewiele. Krzywa narastającego sell-through tydzień po tygodniu, na tle poprzedniego sezonu, skłania do działania: zbyt płaska — zakup był za głęboki, zbyt stroma — zabraknie rozmiarów przed końcem sezonu." },
  { type: "chart", title: "Narastający sell-through, tygodnie 1–12", legend: "ten sezon vs poprzedni", caption: "dane zastępcze · linia ciągła = ten sezon, przerywana = poprzedni" },
  { type: "h2", id: "mistakes", text: "Najczęstsze błędy przy liczeniu sell-through w Power BI" },
  { type: "list", items: ["Filtrowanie mianownika po tygodniu, przez co dostępność zeruje się co tydzień.", "Pozostawienie zwrotów w sprzedaży, co zawyża wynik w kategoriach z dużą liczbą zwrotów.", "Łączenie rynków o różnych tygodniach startu sezonu w jednym widoku narastającym."] },
];

export const posts: Post[] = enPosts.map((p) => {
  if (p.slug === "sell-through-rate-power-bi") {
    return {
      ...p,
      title: "Jak policzyć sell-through w Power BI",
      h1: { before: "Jak policzyć sell-through w", accent: "Power BI" },
      excerpt: "Wzorzec DAX, dwa mylone mianowniki i widok tygodniowy.",
      lead: "Dwa mianowniki, jeden wzorzec DAX i tygodniowy widok, dzięki któremu sell-through przydaje się na spotkaniu zakupowym.",
      body: sellThroughBody,
      seo: { title: "Jak policzyć sell-through w Power BI (DAX)", description: "Definicja sell-through, miary DAX i tygodniowa krzywa sprzedaży w dashboardach Power BI." },
    };
  }
  const t = postTexts[p.slug];
  let i = 0;
  const body: ArticleBlock[] = p.body.map((b) => {
    if (b.type === "h2") return { ...b, text: t.h2[i++] ?? b.text };
    if (b.type === "p") return { type: "p", text: P(t.title.toLowerCase()) };
    if (b.type === "list") return { type: "list", items: b.items.map((_, n) => `Punkt zastępczy nr ${n + 1}.`) };
    return b;
  });
  return { ...p, title: t.title, h1: t.h1, excerpt: t.excerpt, lead: t.excerpt, body, seo: { title: t.title, description: t.excerpt } };
});
