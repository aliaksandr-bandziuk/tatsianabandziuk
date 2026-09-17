import type { CaseStudy } from "../../types";
import { CASE_SLUGS } from "../registry";
import { caseStudies as enCases } from "../en/caseStudies";

/**
 * Anonymised cases. Result figures are placeholders (same as EN) until the
 * owner supplies real ones. Nothing may identify the current employer.
 * Only language-independent fields are taken from EN.
 */
const base = (key: string) => {
  const c = enCases.find((x) => x.key === key)!;
  return {
    key: c.key,
    slug: CASE_SLUGS[key].pl,
    topics: c.topics,
    dashboard: c.dashboard,
    serviceKey: c.serviceKey,
    publishedAt: c.publishedAt,
  };
};

const NOTE = "Klient zanonimizowany · dane zastępcze";

export const caseStudies: CaseStudy[] = [
  {
    ...base("plm-product-data-standardisation"),
    tag: "Dane produktowe · PLM",
    title: "Standaryzacja danych produktowych dla rynków Europy i Azji w systemie PLM",
    h1: { before: "Standaryzacja danych produktowych dla rynków Europy i Azji", accent: "w systemie PLM" },
    summary: "Marka modowa sprzedająca w Europie i Azji. Jeden słownik atrybutów zastąpił wiele lokalnych konwencji zapisu.",
    intro:
      "Marka modowa sprzedająca w Europie i Azji zastąpiła lokalne sposoby opisywania produktów jednym słownikiem atrybutów w PLM. Dzięki regułom walidacji i dashboardowi jakości ten sam produkt oznacza teraz to samo w raportach każdego rynku.",
    cardMetrics: ["98% kompletności", "−60% poprawek danych"],
    breadcrumb: "Standaryzacja danych w PLM",
    facts: [
      { label: "Firma", value: "marka modowa działająca na wielu rynkach" },
      { label: "Rynki", value: "Europa i Azja" },
      { label: "Zakres", value: "pełna kolekcja sezonowa" },
      { label: "Czas trwania", value: "9 tygodni" },
      { label: "Rola", value: "główna analityczka projektu" },
    ],
    factsNote: NOTE,
    challengeTitle: "Wyzwanie: niespójne dane produktowe na rynkach Europy i Azji",
    challenge: [
      "Każdy rynek wypracował własny sposób opisywania produktów: kolor zapisywany na cztery sposoby, kody sezonów, które inaczej wyznaczały jego początek, i skład materiałowy wpisywany wolnym tekstem.",
      "Skonsolidowany raport trzeba było co miesiąc poprawiać ręcznie, a sumom kategorii nikt nie ufał na tyle, by szybko na ich podstawie działać.",
    ],
    challengePoints: [
      "Wiele lokalnych konwencji atrybutów w jednym systemie PLM",
      "Około 3 dni ręcznego czyszczenia danych przed każdym raportem miesięcznym",
      "Różne sumy kategorii na rynkach i w centrali",
    ],
    actionsTitle: "Co zrobiono, aby ustandaryzować dane produktowe w PLM",
    actions: [
      { label: "01", title: "Audyt atrybutów produktów na każdym rynku", text: "Każde pole zmapowane, policzone i ocenione pod kątem kompletności i sprzecznych wartości." },
      { label: "02", title: "Jeden słownik atrybutów uzgodniony z rynkami", text: "Kolor, sezon, skład i kategoria zdefiniowane raz, razem z tłumaczeniami." },
      { label: "03", title: "Reguły migracji i walidacja przy wprowadzaniu do PLM", text: "Dane archiwalne przemapowane, a nowy produkt bez kluczowych pól nie może zostać zapisany." },
      { label: "04", title: "Dashboard jakości danych i comiesięczny przegląd", text: "Kompletność według atrybutu i rynku, z właścicielem każdej luki." },
    ],
    resultsTitle: "Wyniki standaryzacji danych produktowych w PLM w liczbach",
    results: [
      { value: "98", unit: "%", label: "kompletności atrybutów wobec 71% na starcie projektu" },
      { value: "−60", unit: "%", label: "czasu na poprawianie danych produktowych przed raportowaniem" },
      { value: "1", label: "słownik atrybutów zamiast wielu lokalnych konwencji" },
      { value: "3", unit: "dni", label: "ręcznego czyszczenia danych mniej w każdym cyklu miesięcznym" },
    ],
    toolsTitle: "Narzędzia w projekcie standaryzacji danych w PLM",
    tools: [
      { label: "PLM", title: "Konfiguracja atrybutów w systemie PLM", text: "Listy wartości, reguły walidacji i uprawnienia rynków." },
      { label: "fx", title: "Excel i Power Query do mapowania i migracji", text: "Powtarzalne przemapowanie historycznych atrybutów." },
      { label: "BI", title: "Dashboard jakości danych w Power BI", text: "Kompletność według atrybutu, rynku i sezonu, przeglądana co miesiąc." },
    ],
    serviceTitle: "Powiązana usługa: jakość danych produktowych i standaryzacja w PLM",
    serviceText:
      "Ta sama metoda dopasowana do systemów i zespołu klienta: audyt, słownik atrybutów, reguły migracji, walidacja przy wprowadzaniu i dashboard jakości danych.",
    serviceChips: ["słownik atrybutów", "reguły migracji", "zarządzanie danymi"],
    note: "Zapisanie słownika było łatwe — projektem było jego uzgodnienie.",
    faqTitle: "Standaryzacja danych produktowych w PLM — pytania o projekt",
    faq: [
      {
        question: "Ile trwał projekt standaryzacji danych produktowych w PLM?",
        answer:
          "Projekt trwał dziewięć tygodni i objął pełną kolekcję sezonową. Obejmował audyt atrybutów na rynkach, uzgodnienie słownika, migrację danych archiwalnych oraz wdrożenie walidacji i dashboardu jakości danych.",
      },
      {
        question: "Jakie dane były potrzebne do standaryzacji atrybutów?",
        answer:
          "Potrzebny był eksport atrybutów produktów z systemu PLM dla każdego rynku: kolory, kody sezonów, skład materiałowy i kategorie. Na tej podstawie każde pole zostało zmapowane i ocenione pod kątem kompletności oraz sprzecznych wartości.",
      },
      {
        question: "Co zmieniło się dla zespołów po standaryzacji danych w PLM?",
        answer:
          "Rynki pracują na jednym słowniku atrybutów, a produkt bez kluczowych pól nie może zostać zapisany w PLM. Skonsolidowany raport nie wymaga już ręcznego czyszczenia danych przed każdym cyklem miesięcznym. Luki w danych mają właścicieli i są omawiane na comiesięcznym przeglądzie.",
      },
    ],
    seo: {
      title: "Standaryzacja danych produktowych w PLM — case study",
      description:
        "Case study: jeden słownik atrybutów, reguły walidacji w PLM i dashboard jakości danych dla marki modowej sprzedającej w Europie i Azji.",
    },
  },
  {
    ...base("womenswear-range-plan-rebuild"),
    tag: "Asortyment · Plan kolekcji",
    title: "Przebudowa planu asortymentu odzieży damskiej dla europejskiego dystrybutora",
    h1: { before: "Przebudowa planu asortymentu odzieży damskiej", accent: "dla europejskiego dystrybutora" },
    summary: "Liczba modeli mniejsza o jedną piątą, a głębokość zakupu przeniesiona do sprawdzonych rozmiarów i kolorów.",
    intro:
      "Europejski dystrybutor mody ograniczył liczbę modeli w kolekcji damskiej o jedną piątą i przeniósł głębokość zakupu do sprawdzonych rozmiarów i kolorów. Nowy plan asortymentu opiera się na oczyszczonych krzywych rozmiarów i budżecie open-to-buy, a sprzedaż jest monitorowana co tydzień w Power BI.",
    cardMetrics: ["+18 p.p. sell-through", "−31% obniżek"],
    breadcrumb: "Plan asortymentu odzieży damskiej",
    facts: [
      { label: "Firma", value: "dystrybutor mody" },
      { label: "Kategoria", value: "odzież damska" },
      { label: "Czas trwania", value: "8 tygodni" },
      { label: "Rola", value: "główna analityczka projektu" },
    ],
    factsNote: NOTE,
    challengeTitle: "Wyzwanie: rozrastający się plan asortymentu odzieży damskiej",
    challenge: [
      "Kolekcja rosła z sezonu na sezon: za każdym razem więcej modeli i coraz mniej sztuk na model. W sklepach szybko kończyły się podstawowe rozmiary, a nietrafione kolory trafiały do obniżek.",
      "Krzywe rozmiarów przepisywano z poprzedniego planu razem ze zniekształceniami wynikającymi z braków towaru.",
    ],
    challengePoints: [
      "Niepełne rozmiarówki w liniach podstawowych już w czwartym tygodniu",
      "Obniżki zabierające coraz większą część marży",
      "Brak wspólnego widoku sell-through dla zakupów i finansów",
    ],
    actionsTitle: "Co zrobiono, aby przebudować plan asortymentu odzieży damskiej",
    actions: [
      { label: "01", title: "Przegląd struktury asortymentu według kategorii i poziomów cen", text: "Liczba modeli zestawiona z historią sell-through i marży." },
      { label: "02", title: "Nowe krzywe rozmiarów i kolorów", text: "Zwroty, tygodnie z brakami i promocje usunięte z historii sprzedaży." },
      { label: "03", title: "Nowy plan zakupów i budżet open-to-buy", text: "Głębokość przeniesiona do sprawdzonych modeli, dostawy rozłożone na miesiące." },
      { label: "04", title: "Cotygodniowy monitoring asortymentu w Power BI", text: "Sell-through i kompletność rozmiarów porównywane z planem." },
    ],
    resultsTitle: "Wyniki przebudowy planu asortymentu odzieży damskiej w liczbach",
    results: [
      { value: "+18", unit: "p.p.", label: "sell-through w kluczowych kategoriach" },
      { value: "−21", unit: "%", label: "liczby modeli w kolekcji" },
      { value: "−31", unit: "%", label: "kosztów obniżek w dwóch sezonach" },
    ],
    toolsTitle: "Narzędzia w projekcie planu asortymentu odzieży damskiej",
    tools: [
      { label: "fx", title: "Plan zakupów i budżet open-to-buy w Excelu", text: "Rozłożenie dostaw w czasie i porównanie scenariuszy." },
      { label: "BI", title: "Monitoring asortymentu w Power BI", text: "Cotygodniowy sell-through i kompletność rozmiarów." },
    ],
    serviceTitle: "Powiązana usługa: planowanie asortymentu i zarządzanie asortymentem",
    serviceText:
      "Struktura asortymentu, krzywe rozmiarów, plan zakupów i monitoring w sezonie, dopasowane do kategorii i rynków klienta.",
    serviceChips: ["struktura asortymentu", "krzywe rozmiarów", "open-to-buy"],
    note: "Mniej modeli, więcej głębokości — najtrudniejsza była pierwsza rozmowa.",
    faqTitle: "Plan asortymentu odzieży damskiej — pytania o projekt",
    faq: [
      {
        question: "Ile trwała przebudowa planu asortymentu odzieży damskiej?",
        answer:
          "Projekt trwał osiem tygodni. W tym czasie powstał przegląd struktury asortymentu, nowe krzywe rozmiarów i kolorów, plan zakupów z budżetem open-to-buy oraz cotygodniowy monitoring w Power BI.",
      },
      {
        question: "Jakie dane były potrzebne do przebudowy planu asortymentu?",
        answer:
          "Potrzebna była historia sprzedaży, zapasów, zwrotów i promocji na poziomie modelu, rozmiaru i koloru, a także historia sell-through i marży według kategorii i poziomów cen. Z historii sprzedaży usunięto zwroty, tygodnie z brakami towaru i okresy promocji, zanim policzono nowe krzywe.",
      },
      {
        question: "Co zmieniło się dla zespołu zakupów po przebudowie planu asortymentu?",
        answer:
          "Zakupy pracują na mniejszej liczbie modeli z większą głębokością w sprawdzonych rozmiarach i kolorach. Dostawy są rozłożone na miesiące w budżecie open-to-buy. Zakupy i finanse co tydzień widzą ten sam sell-through i kompletność rozmiarów na tle planu.",
      },
    ],
    seo: {
      title: "Przebudowa planu asortymentu odzieży damskiej — case",
      description:
        "Case study planowania asortymentu: przegląd struktury kolekcji, nowe krzywe rozmiarów i budżet open-to-buy dla dystrybutora odzieży damskiej.",
    },
  },
  {
    ...base("price-ladder-margin-report"),
    tag: "Ceny · Raportowanie",
    title: "Architektura cenowa i raport marży dla sklepu internetowego z modą",
    h1: { before: "Architektura cenowa i raport marży", accent: "dla sklepu internetowego z modą" },
    summary: "Progi cenowe w każdej kategorii, wspólne zasady cen dla trzech rynków i cotygodniowy raport marży w Power BI.",
    intro:
      "Sklep internetowy z modą uporządkował progi cenowe w każdej kategorii i wprowadził wspólne zasady cen dla trzech rynków. Cotygodniowy raport marży w Power BI pozwala korygować ceny i promocje, zanim marża zostanie utracona.",
    cardMetrics: ["+2,4 p.p. marży", "3 rynki"],
    breadcrumb: "Architektura cenowa i raport marży",
    facts: [
      { label: "Firma", value: "sklep internetowy z modą" },
      { label: "Rynki", value: "3" },
      { label: "Czas trwania", value: "6 tygodni" },
      { label: "Rola", value: "analityczka cen" },
    ],
    factsNote: NOTE,
    challengeTitle: "Wyzwanie: niespójne ceny i marża w sklepie internetowym z modą",
    challenge: [
      "Ceny ustalano osobno dla każdego rynku, z inną logiką zaokrągleń i przeliczeń walut, a w progach cenowych były luki, przez które klienci odchodzili do konkurencji.",
      "Marżę sprawdzano dopiero na koniec miesiąca, gdy było już za późno na korektę promocji.",
    ],
    challengePoints: [
      "Nakładające się ceny w kategoriach podstawowych",
      "Niespójne ceny tego samego produktu na różnych rynkach",
      "Brak cotygodniowego widoku marży",
    ],
    actionsTitle: "Co zrobiono, aby zbudować architekturę cenową i raport marży",
    actions: [
      { label: "01", title: "Audyt architektury cenowej", text: "Progi wejścia, środka i najwyższej półki w każdej kategorii." },
      { label: "02", title: "Wspólne zasady cen dla rynków", text: "Przeliczenia walut, zaokrąglenia i dopuszczalne odchylenia." },
      { label: "03", title: "Cotygodniowy raport marży w Power BI", text: "Cena, rabat i marża według kategorii i rynku." },
    ],
    resultsTitle: "Wyniki projektu architektury cenowej w liczbach",
    results: [
      { value: "+2,4", unit: "p.p.", label: "marży brutto" },
      { value: "3", label: "rynki wyceniane według jednych zasad" },
      { value: "1", label: "cotygodniowy raport marży" },
    ],
    toolsTitle: "Narzędzia w projekcie architektury cenowej",
    tools: [
      { label: "fx", title: "Scenariusze cen w Excelu", text: "Progi cenowe i warianty marży." },
      { label: "BI", title: "Raport marży w Power BI", text: "Co tydzień według kategorii i rynku." },
    ],
    serviceTitle: "Powiązana usługa: analiza cen w handlu",
    serviceText:
      "Architektura cenowa, spójne ceny na rynkach i scenariusze obniżek przygotowane dla kategorii klienta.",
    serviceChips: ["architektura cenowa", "marża", "obniżki cen"],
    note: "Luka w progach cenowych to cena, którą ktoś inny ustala za Ciebie.",
    faqTitle: "Architektura cenowa i raport marży — pytania o projekt",
    faq: [
      {
        question: "Ile trwał projekt architektury cenowej i raportu marży?",
        answer:
          "Projekt trwał sześć tygodni. Obejmował audyt progów cenowych w kategoriach, wspólne zasady cen dla trzech rynków i wdrożenie cotygodniowego raportu marży w Power BI.",
      },
      {
        question: "Jakie dane były potrzebne do analizy architektury cenowej?",
        answer:
          "Potrzebne były ceny, rabaty i koszty zakupu produktów według kategorii i rynku oraz dane o sprzedaży. Do ustalenia wspólnych zasad cen przeanalizowano też stosowane przeliczenia walut i zaokrąglenia na każdym rynku.",
      },
      {
        question: "Co zmieniło się dla zespołu po wdrożeniu raportu marży?",
        answer:
          "Ceny na rynkach są ustalane według jednych zasad przeliczeń walut i zaokrągleń. Marża jest widoczna co tydzień według kategorii i rynku, a nie dopiero na koniec miesiąca. Dzięki temu ceny i promocje można korygować w trakcie miesiąca.",
      },
    ],
    seo: {
      title: "Architektura cenowa i raport marży — case study",
      description:
        "Case study analizy cen: audyt architektury cenowej, wspólne zasady cen dla rynków i cotygodniowy raport marży w Power BI dla sklepu z modą.",
    },
  },
  {
    ...base("weekly-retail-trade-report"),
    tag: "Raportowanie · Procesy",
    title: "Tygodniowy raport sprzedaży w Power BI dla sieci wielomarkowej",
    h1: { before: "Tygodniowy raport sprzedaży w Power BI", accent: "dla sieci wielomarkowej" },
    summary: "Jeden zestaw definicji KPI i raport na poniedziałkowe spotkanie zamiast czterech konkurujących arkuszy.",
    intro:
      "Sieć wielomarkowa zastąpiła cztery konkurujące arkusze jednym tygodniowym raportem sprzedaży w Power BI. Podstawą były definicje KPI uzgodnione przez zakupy, planowanie i finanse oraz kalendarz raportowy z przypisanymi właścicielami.",
    cardMetrics: ["40 h/mies. mniej pracy", "4 → 1 raport"],
    breadcrumb: "Tygodniowy raport sprzedaży",
    facts: [
      { label: "Firma", value: "sieć wielomarkowa" },
      { label: "Odbiorcy", value: "zakupy, planowanie, finanse" },
      { label: "Czas trwania", value: "5 tygodni" },
      { label: "Rola", value: "liderka projektu analitycznego" },
    ],
    factsNote: NOTE,
    challengeTitle: "Wyzwanie: cztery wersje tygodniowego raportu sprzedaży",
    challenge: [
      "Cztery zespoły przygotowywały cztery tygodniowe arkusze z różnymi definicjami tych samych wskaźników, więc poniedziałkowe spotkania zaczynały się od uzgadniania liczb.",
    ],
    challengePoints: [
      "Cztery konkurujące raporty tygodniowe",
      "Brak spisanych definicji KPI",
      "Dwa dni ręcznego przygotowania raportu co tydzień",
    ],
    actionsTitle: "Co zrobiono, aby wdrożyć tygodniowy raport sprzedaży w Power BI",
    actions: [
      { label: "01", title: "Uzgodnione definicje KPI", text: "Jeden arkusz definicji zatwierdzony przez wszystkie zespoły." },
      { label: "02", title: "Raport sprzedaży w Power BI", text: "Strony ułożone według agendy poniedziałkowego spotkania." },
      { label: "03", title: "Kalendarz raportowy i właściciele", text: "Kto przygotowuje, sprawdza i prezentuje raport." },
    ],
    resultsTitle: "Wyniki wdrożenia tygodniowego raportu sprzedaży w liczbach",
    results: [
      { value: "40", unit: "h", label: "oszczędności miesięcznie" },
      { value: "4 → 1", label: "raport tygodniowy" },
      { value: "100", unit: "%", label: "wskaźników z właścicielem" },
    ],
    toolsTitle: "Narzędzia w projekcie tygodniowego raportu sprzedaży",
    tools: [
      { label: "BI", title: "Raport sprzedaży w Power BI", text: "Cotygodniowe odświeżanie i widoki marek." },
      { label: "fx", title: "Arkusz definicji KPI w Excelu", text: "Wzory, źródła danych i właściciele." },
    ],
    serviceTitle: "Powiązana usługa: organizacja procesów raportowania",
    serviceText:
      "Kalendarz raportowy, właściciele raportów i definicje KPI, dzięki którym liczby uzgadnia się raz i używa wszędzie.",
    serviceChips: ["kalendarz raportowy", "właściciele raportów", "definicje KPI"],
    note: "Raport się uprościł, gdy wszyscy uzgodnili, do czego służy.",
    faqTitle: "Tygodniowy raport sprzedaży w Power BI — pytania o projekt",
    faq: [
      {
        question: "Ile trwało wdrożenie tygodniowego raportu sprzedaży w Power BI?",
        answer:
          "Wdrożenie trwało pięć tygodni. W tym czasie zakupy, planowanie i finanse uzgodniły definicje KPI, powstał raport w Power BI i kalendarz raportowy z właścicielami.",
      },
      {
        question: "Jakie dane były potrzebne do tygodniowego raportu sprzedaży?",
        answer:
          "Punktem wyjścia były cztery dotychczasowe arkusze tygodniowe i dane, z których je przygotowywano. Dla każdego wskaźnika spisano wzór, źródło danych i właściciela w jednym arkuszu definicji KPI.",
      },
      {
        question: "Co zmieniło się dla zespołów po wdrożeniu raportu w Power BI?",
        answer:
          "Zakupy, planowanie i finanse korzystają z jednego raportu tygodniowego zamiast czterech arkuszy. Poniedziałkowe spotkanie nie zaczyna się już od uzgadniania liczb, bo strony raportu odpowiadają agendzie spotkania. Każdy wskaźnik ma właściciela, a raport odświeża się co tydzień.",
      },
    ],
    seo: {
      title: "Tygodniowy raport sprzedaży w Power BI — case study",
      description:
        "Case study Power BI: uzgodnione definicje KPI i jeden tygodniowy raport sprzedaży zamiast czterech konkurencyjnych arkuszy.",
    },
  },
  {
    ...base("menswear-size-curve-rebuild"),
    tag: "Asortyment · Krzywe rozmiarów",
    title: "Nowe krzywe rozmiarów dla marki odzieży męskiej po dwóch sezonach braków",
    h1: { before: "Nowe krzywe rozmiarów dla marki odzieży męskiej", accent: "po dwóch sezonach braków" },
    summary: "Braki towaru i zwroty usunięte z historii sprzedaży, zanim krzywe rozmiarów przeliczono osobno dla każdego rynku.",
    intro:
      "Marka odzieży męskiej przeliczyła krzywe rozmiarów po dwóch sezonach, w których najpopularniejsze rozmiary szybko się wyprzedawały. Przed obliczeniem z historii sprzedaży usunięto tygodnie z brakami towaru i zwroty, a krzywe policzono osobno dla każdego rynku.",
    cardMetrics: ["−27% niepełnych rozmiarówek", "+9 p.p. w pełnej cenie"],
    breadcrumb: "Krzywe rozmiarów odzieży męskiej",
    facts: [
      { label: "Firma", value: "marka odzieży męskiej" },
      { label: "Czas trwania", value: "4 tygodnie" },
      { label: "Rola", value: "analityczka asortymentu" },
    ],
    factsNote: NOTE,
    challengeTitle: "Wyzwanie: krzywe rozmiarów zniekształcone przez braki towaru",
    challenge: [
      "Dwa sezony braków towaru nauczyły krzywe rozmiarów złej lekcji: rozmiary, które się wyprzedały, w danych wyglądały na mało popularne, więc kolejne zamówienia jeszcze je zmniejszały.",
    ],
    challengePoints: [
      "Braki towaru zapisane w danych jako niski popyt",
      "Zwroty liczone jako sprzedaż",
      "Jedna krzywa rozmiarów dla wszystkich rynków",
    ],
    actionsTitle: "Co zrobiono, aby przeliczyć krzywe rozmiarów odzieży męskiej",
    actions: [
      { label: "01", title: "Oczyszczenie historii sprzedaży", text: "Usunięte tygodnie z brakami towaru i zwroty." },
      { label: "02", title: "Krzywe rozmiarów dla każdego rynku", text: "Policzone według kategorii i kroju." },
      { label: "03", title: "Monitoring kompletności rozmiarów", text: "Cotygodniowa kontrola niepełnych rozmiarówek." },
    ],
    resultsTitle: "Wyniki projektu krzywych rozmiarów w liczbach",
    results: [
      { value: "−27", unit: "%", label: "niepełnych rozmiarówek" },
      { value: "+9", unit: "p.p.", label: "udziału sprzedaży w pełnej cenie" },
    ],
    toolsTitle: "Narzędzia w projekcie krzywych rozmiarów",
    tools: [
      { label: "fx", title: "Model krzywych rozmiarów w Excelu", text: "Oczyszczona historia i krzywe dla rynków." },
      { label: "BI", title: "Widok kompletności rozmiarów w Power BI", text: "Monitoring co tydzień." },
    ],
    serviceTitle: "Powiązana usługa: planowanie asortymentu i zarządzanie asortymentem",
    serviceText:
      "Krzywe rozmiarów i kolorów liczone z oczyszczonej historii sprzedaży, osobno dla każdego rynku.",
    serviceChips: ["krzywe rozmiarów", "braki towaru", "zwroty"],
    note: "Wyprzedany rozmiar to nie jest niepopularny rozmiar.",
    faqTitle: "Krzywe rozmiarów odzieży męskiej — pytania o projekt",
    faq: [
      {
        question: "Ile trwał projekt przeliczenia krzywych rozmiarów?",
        answer:
          "Projekt trwał cztery tygodnie. Obejmował oczyszczenie historii sprzedaży, przeliczenie krzywych rozmiarów dla każdego rynku oraz wdrożenie cotygodniowej kontroli niepełnych rozmiarówek.",
      },
      {
        question: "Jakie dane były potrzebne do przeliczenia krzywych rozmiarów?",
        answer:
          "Potrzebna była historia sprzedaży i zapasów według rozmiaru, rynku, kategorii i kroju z dwóch ostatnich sezonów, razem ze zwrotami. Dane o zapasach pozwoliły wskazać tygodnie z brakami towaru i usunąć je z historii przed obliczeniem krzywych.",
      },
      {
        question: "Co zmieniło się dla zespołu po przeliczeniu krzywych rozmiarów?",
        answer:
          "Zamówienia opierają się na krzywych policzonych osobno dla każdego rynku, kategorii i kroju, a nie na jednej krzywej dla wszystkich. Wyprzedane rozmiary nie są już traktowane jako mało popularne. Kompletność rozmiarówek jest sprawdzana co tydzień w Power BI.",
      },
    ],
    seo: {
      title: "Krzywe rozmiarów dla marki odzieży męskiej — case study",
      description:
        "Case study: braki towaru i zwroty usunięte z historii sprzedaży przed przeliczeniem krzywych rozmiarów dla marki odzieży męskiej.",
    },
  },
  {
    ...base("ecommerce-catalogue-attribute-cleaning"),
    tag: "Dane produktowe · E-commerce",
    title: "Porządkowanie atrybutów produktów przed migracją katalogu e-commerce",
    h1: { before: "Porządkowanie atrybutów produktów", accent: "przed migracją katalogu e-commerce" },
    summary: "Mapowanie atrybutów i reguły walidacji uzgodnione przed migracją, więc filtry w nowym sklepie działały od pierwszego dnia.",
    intro:
      "Sklep internetowy z modą uporządkował atrybuty produktów przed przeniesieniem katalogu na nową platformę e-commerce. Mapowanie wartości i reguły walidacji uzgodniono przed importem, dlatego filtry działały od pierwszego dnia, a żaden produkt nie został zablokowany.",
    cardMetrics: ["99% zmapowanych atrybutów", "0 zablokowanych SKU"],
    breadcrumb: "Atrybuty produktów przed migracją",
    facts: [
      { label: "Firma", value: "sklep internetowy z modą" },
      { label: "Czas trwania", value: "5 tygodni" },
      { label: "Rola", value: "analityczka danych produktowych" },
    ],
    factsNote: NOTE,
    challengeTitle: "Wyzwanie: atrybuty produktów w wolnym tekście przed migracją katalogu",
    challenge: [
      "Nowa platforma e-commerce potrzebowała uporządkowanych atrybutów do filtrów, a w starym katalogu większość z nich była zapisana wolnym tekstem.",
    ],
    challengePoints: [
      "Kolory i materiały wpisywane wolnym tekstem",
      "Brakujące kategorie produktów",
      "Krótki termin migracji",
    ],
    actionsTitle: "Co zrobiono z atrybutami produktów przed migracją katalogu",
    actions: [
      { label: "01", title: "Mapowanie atrybutów", text: "Stare wartości przypisane do nowej struktury katalogu." },
      { label: "02", title: "Reguły walidacji", text: "Kontrole blokujące błędne dane przed importem." },
      { label: "03", title: "Lista wyjątków", text: "Ręczny przegląd przypadków, których nie dało się zmapować automatycznie." },
    ],
    resultsTitle: "Wyniki porządkowania atrybutów przed migracją w liczbach",
    results: [
      { value: "99", unit: "%", label: "zmapowanych atrybutów" },
      { value: "0", label: "SKU zablokowanych w dniu startu" },
    ],
    toolsTitle: "Narzędzia w projekcie migracji katalogu e-commerce",
    tools: [
      { label: "PQ", title: "Mapowanie atrybutów w Power Query", text: "Powtarzalne przypisanie wartości atrybutów." },
      { label: "fx", title: "Listy wyjątków w Excelu", text: "Właściciel i status każdego przypadku." },
    ],
    serviceTitle: "Powiązana usługa: jakość danych produktowych i standaryzacja w PLM",
    serviceText:
      "Słowniki atrybutów, mapowanie i reguły walidacji danych produktowych w PLM i w sklepie internetowym.",
    serviceChips: ["mapowanie atrybutów", "walidacja danych", "e-commerce"],
    note: "Filtry działają tylko wtedy, gdy dane pod nimi są zgodne.",
    faqTitle: "Atrybuty produktów przed migracją e-commerce — pytania o projekt",
    faq: [
      {
        question: "Ile trwało porządkowanie atrybutów przed migracją katalogu?",
        answer:
          "Projekt trwał pięć tygodni i zakończył się przed importem katalogu na nową platformę e-commerce. Obejmował mapowanie atrybutów, reguły walidacji i przegląd listy wyjątków.",
      },
      {
        question: "Jakie dane były potrzebne do mapowania atrybutów produktów?",
        answer:
          "Potrzebny był eksport starego katalogu z atrybutami zapisanymi wolnym tekstem, takimi jak kolory i materiały, oraz struktura atrybutów nowej platformy. Wartości, których nie dało się przypisać automatycznie, trafiły na listę wyjątków z właścicielem i statusem.",
      },
      {
        question: "Co zmieniło się dla zespołu e-commerce po migracji katalogu?",
        answer:
          "Filtry w nowym sklepie działały od pierwszego dnia, a żaden produkt nie został zablokowany przy starcie. Reguły walidacji zatrzymują błędne dane przed importem, więc zespół nie musi poprawiać ich już na stronie sklepu.",
      },
    ],
    seo: {
      title: "Porządkowanie atrybutów produktów przed migracją sklepu",
      description:
        "Case study danych produktowych: mapowanie atrybutów i reguły walidacji uzgodnione przed migracją katalogu sklepu internetowego z modą.",
    },
  },
];
