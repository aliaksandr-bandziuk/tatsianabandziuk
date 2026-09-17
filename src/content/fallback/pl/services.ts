import type { ConsultingFormat, Recommendation, Service, Tool } from "../../types";
import { services as en } from "../en/services";
import { SERVICE_SLUGS } from "../registry";

const rec = (topic: string): Recommendation => ({
  quote: `„Tekst zastępczy rekomendacji. Dwa lub trzy zdania od współpracownika o ${topic}, cytowane za zgodą, gdy pojawi się prawdziwa rekomendacja.”`,
  name: "Imię Nazwisko",
  role: `Stanowisko · ${topic}`,
  placeholder: true,
});

const facts = (duration: string, deliverables: string) => [
  { label: "Czas trwania", value: duration },
  { label: "Forma pracy", value: "online / na miejscu" },
  { label: "Języki", value: "PL / EN / RU" },
  { label: "Rezultat", value: deliverables },
];

/** Language-independent fields (key, number, chart, caseStudyKey) come from EN; every text field is overridden below. */
const base = (key: string) => ({ ...en.find((s) => s.key === key)!, slug: SERVICE_SLUGS[key].pl });

export const services: Service[] = [
  {
    ...base("assortment-planning"),
    cardTitle: "Planowanie asortymentu i zarządzanie asortymentem",
    cardText:
      "Struktura kolekcji, liczba modeli w kategoriach i głębokość zakupu na rynkach — tak, by zakup odpowiadał popytowi, a nie przyzwyczajeniom z poprzedniego sezonu.",
    chartCaption: "krzywa rozmiarów · XS–3XL",
    breadcrumb: "Planowanie asortymentu",
    h1: { before: "Planowanie asortymentu i zarządzanie asortymentem w", accent: "handlu modowym" },
    intro:
      "Planowanie asortymentu to ustalenie, ile modeli, kolorów i rozmiarów kupić w każdej kategorii i na każdy rynek, aby jak najwięcej sprzedać w pełnej cenie. Markom modowym i dystrybutorom pomagam zbudować taki plan na oczyszczonych danych sprzedaży — z budżetem open-to-buy w Excelu i cotygodniowym monitoringiem w Power BI.",
    factsTitle: "Typowy projekt planowania asortymentu",
    facts: facts("6–10 tygodni", "plan asortymentu i model w Excelu"),
    factsNote: "Pracę zawsze zaczynam od danych sprzedażowych klienta.",
    problemsTitle: "Problemy z asortymentem, które rozwiązuje planowanie asortymentu",
    problems: [
      {
        title: "Za dużo modeli, za mało głębokości na model",
        text: "Kolekcja wygląda bogato w planie, ale w sklepie już w czwartym tygodniu brakuje podstawowych rozmiarów, a bestsellery nie mają zapasu.",
      },
      {
        title: "Krzywe rozmiarów i kolorów przepisane z poprzedniego sezonu",
        text: "Udziały rozmiarów kopiuje się z poprzedniego planu, więc braki towaru i zwroty po cichu zniekształcają każdy kolejny zakup.",
      },
      {
        title: "Jeden asortyment dla bardzo różnych rynków",
        text: "Ta sama kolekcja trafia na rynki o innym klimacie, poziomie cen i wielkości sklepów, a różnicę pochłaniają obniżki.",
      },
      {
        title: "Zakupy i finanse pracują na różnych liczbach",
        text: "Spotkanie zaczyna się od uzgadniania dwóch wersji sell-through zamiast od decyzji, co i ile kupić.",
      },
    ],
    includesTitle: "Co obejmuje planowanie asortymentu",
    includesLead: "Pięć etapów realizowanych po kolei. Po każdym zespół dostaje dokument lub model, z którym pracuje dalej.",
    includes: [
      {
        label: "01",
        title: "Przegląd struktury asortymentu według kategorii i poziomów cen",
        text: "Liczba modeli w kategoriach, progach cenowych i na rynkach zestawiona z historią sell-through i marży.",
      },
      {
        label: "02",
        title: "Krzywe rozmiarów i kolorów z oczyszczonych danych sprzedaży",
        text: "Udziały rozmiarów i kolorów liczone po usunięciu zwrotów, tygodni z brakami towaru i promocji.",
      },
      {
        label: "03",
        title: "Plan zakupów i budżet open-to-buy w Excelu",
        text: "Jeden model prowadzony przez planistów: ilości, koszt, marża i rozłożenie dostaw na miesiące i rynki.",
      },
      {
        label: "04",
        title: "Monitoring asortymentu w sezonie w Power BI",
        text: "Cotygodniowy sell-through, pokrycie zapasu i kompletność rozmiarów według uzgodnionych definicji.",
      },
      {
        label: "05",
        title: "Warsztaty dla zespołu zakupów i planowania asortymentu",
        text: "Dwie sesje i pisemna dokumentacja, aby kolejny sezon zespół zaplanował samodzielnie.",
      },
    ],
    resultsTitle: "Wyniki planowania asortymentu dla marek modowych",
    results: [
      { value: "+18", unit: "p.p.", label: "sell-through w kluczowych kategoriach w pierwszym pełnym sezonie" },
      { value: "−21", unit: "%", label: "liczby modeli przy większej głębokości sprawdzonych rozmiarów i kolorów" },
      { value: "−31", unit: "%", label: "kosztów obniżek w dwóch kolejnych sezonach" },
    ],
    toolsTitle: "Narzędzia w projektach planowania asortymentu",
    tools: [
      { label: "fx", title: "Excel do planu zakupów i budżetu open-to-buy", text: "Rozłożenie dostaw w czasie i porównanie scenariuszy zakupu." },
      { label: "BI", title: "Power BI do monitoringu asortymentu w sezonie", text: "Miary DAX dla sell-through, pokrycia zapasu i kompletności rozmiarów." },
      { label: "PLM", title: "Dane z systemu PLM jako podstawa planu", text: "Uporządkowane atrybuty kategorii, sezonu i koloru za każdą liczbą w planie." },
    ],
    recommendationTitle: "Rekomendacja współpracownika z branży mody o planowaniu asortymentu",
    recommendation: rec("projekcie planowania asortymentu"),
    faqTitle: "Planowanie asortymentu — pytania",
    faq: [
      {
        question: "Czym jest planowanie asortymentu?",
        answer:
          "Planowanie asortymentu to proces, w którym ustala się, jakie produkty, w ilu wariantach i w jakich ilościach mają trafić do sprzedaży w danym sezonie i kanale. W modzie obejmuje liczbę modeli w kategoriach, poziomy cen, krzywe rozmiarów i kolorów oraz budżet zakupów. Dobry plan opiera się na historii sprzedaży, a nie na intuicji.",
      },
      {
        question: "Czym różni się category management od planowania asortymentu?",
        answer:
          "Category management to sposób zarządzania całą kategorią jak osobnym biznesem: jej rolą, cenami, promocjami i wynikami. Planowanie asortymentu jest częścią tej pracy i odpowiada na pytanie, co i ile kupić na sezon. W markach modowych oba procesy korzystają z tych samych danych o sprzedaży.",
      },
      {
        question: "Co to jest struktura asortymentu?",
        answer:
          "Struktura asortymentu to podział oferty na kategorie, podkategorie i poziomy cen wraz z udziałem każdej grupy w sprzedaży. Opisuje ją szerokość, czyli liczba kategorii i modeli, oraz głębokość, czyli liczba wariantów i sztuk na model. Przegląd struktury pokazuje, gdzie kolekcja jest zbyt rozdrobniona, a gdzie brakuje towaru.",
      },
      {
        question: "Jakie dane sprzedażowe są potrzebne?",
        answer:
          "Najlepiej dwa sezony sprzedaży na poziomie SKU i tygodnia, ze stanami magazynowymi, dostawami i zwrotami. Przydają się też atrybuty produktu: kategoria, kolor, rozmiar i cena. Jeden sezon wystarczy do pierwszego planu, ale krzywe rozmiarów są wtedy mniej pewne.",
      },
      {
        question: "Czy jeden plan asortymentu może objąć kilka rynków?",
        answer:
          "Tak. Model zachowuje jedną strukturę asortymentu, a głębokość zakupu, udziały rozmiarów i rozłożenie dostaw ustala osobno dla każdego rynku. Dzięki temu plany rynków pozostają porównywalne i łatwo je zsumować.",
      },
    ],
    ctaTitle: "Porozmawiaj o planowaniu asortymentu w Twojej marce",
    ctaText:
      "Napisz, co do której kategorii masz najwięcej wątpliwości. Odpowiem, co musiałyby pokazać dane, żeby plan asortymentu był trafny.",
    seo: {
      title: "Planowanie asortymentu i zarządzanie asortymentem w modzie",
      description:
        "Planowanie i zarządzanie asortymentem dla marek modowych: struktura kolekcji, krzywe rozmiarów, budżet open-to-buy i monitoring sprzedaży w sezonie.",
    },
  },
  {
    ...base("retail-pricing-analysis"),
    cardTitle: "Analiza cen i architektura cenowa",
    cardText:
      "Progi cenowe w kategoriach, spójne ceny na rynkach i scenariusze marży oraz obniżek sprawdzone przed sezonem, a nie po nim.",
    chartCaption: "architektura cenowa · od wejścia do najwyższej półki",
    breadcrumb: "Analiza cen",
    h1: { before: "Analiza cen w handlu i spójna architektura cenowa", accent: "na różnych rynkach" },
    intro:
      "Analiza cen w handlu to sprawdzenie, czy ceny w każdej kategorii tworzą czytelne progi, dają zaplanowaną marżę i są spójne między rynkami. Markom modowym i sklepom internetowym przygotowuję audyt architektury cenowej, zasady cen dla rynków i walut oraz model obniżek, który można przetestować przed sezonem.",
    factsTitle: "Typowy projekt analizy cen",
    facts: facts("4–8 tygodni", "architektura cenowa i model marży"),
    factsNote: "Ceny porównuję ze sprzedażą i marżą, nie tylko z konkurencją.",
    problemsTitle: "Problemy cenowe, które rozwiązuje analiza cen",
    problems: [
      {
        title: "Luki i nakładające się ceny w kategoriach",
        text: "Zbyt bliskie ceny odbierają sobie sprzedaż, a pusty próg cenowy wysyła klientów do konkurencji.",
      },
      {
        title: "Ten sam produkt w różnych cenach bez powodu",
        text: "Przeliczenia walut, zaokrąglenia i lokalne decyzje z czasem rozjeżdżają ceny między rynkami.",
      },
      {
        title: "Obniżki cen planowane z przyzwyczajenia",
        text: "Głębokość i termin rabatów powtarzają kalendarz z poprzedniego sezonu, niezależnie od sprzedaży.",
      },
      {
        title: "Marża sprawdzana dopiero po sezonie",
        text: "Skutek zmiany cen widać w raporcie miesięcznym, gdy na korektę jest już za późno.",
      },
    ],
    includesTitle: "Co obejmuje analiza cen w handlu",
    includesLead: "Cztery etapy. Każdy kończy się plikiem, z którego korzysta osoba odpowiedzialna za ceny.",
    includes: [
      {
        label: "01",
        title: "Audyt architektury cenowej w kategoriach",
        text: "Progi wejścia, środka i najwyższej półki zestawione ze strukturą sprzedaży i marżą.",
      },
      {
        label: "02",
        title: "Zasady spójności cen między rynkami i walutami",
        text: "Przeliczenia walut, zaokrąglenia i dopuszczalne odchylenia zapisane w jednym dokumencie.",
      },
      {
        label: "03",
        title: "Model marży i obniżek cen w Excelu",
        text: "Porównanie wariantów cen i rabatów pod kątem marży i zapasu, zanim zapadnie decyzja.",
      },
      {
        label: "04",
        title: "Cotygodniowy monitoring cen i marży w Power BI",
        text: "Cena, rabat, marża i głębokość obniżek według tygodnia, kategorii i rynku.",
      },
    ],
    resultsTitle: "Wyniki analizy cen w handlu",
    results: [
      { value: "+2,4", unit: "p.p.", label: "marży brutto po uporządkowaniu architektury cenowej" },
      { value: "3", label: "rynki wyceniane według jednych zasad" },
      { value: "−18", unit: "%", label: "głębokości obniżek w liniach podstawowych" },
    ],
    toolsTitle: "Narzędzia w projektach analizy cen",
    tools: [
      { label: "fx", title: "Excel do scenariuszy cen i obniżek", text: "Progi cenowe, przeliczenia walut i warianty marży." },
      { label: "BI", title: "Power BI do monitoringu cen i marży", text: "Cena, rabat i marża według tygodnia i rynku." },
      { label: "PLM", title: "Pola cenowe w systemie PLM jako źródło danych", text: "Jeden właściciel i jeden format każdego atrybutu ceny." },
    ],
    recommendationTitle: "Rekomendacja współpracownika z branży mody o analizie cen",
    recommendation: rec("projekcie analizy cen"),
    faqTitle: "Analiza cen — pytania",
    faq: [
      {
        question: "Na czym polega analiza cen w handlu?",
        answer:
          "Analiza cen w handlu polega na sprawdzeniu, jak ceny wpływają na sprzedaż i marżę w każdej kategorii i na każdym rynku. Obejmuje progi cenowe, spójność cen między rynkami, głębokość i termin obniżek oraz porównanie z konkurencją. Wynikiem są zasady ustalania cen i model, w którym można sprawdzić ich skutki.",
      },
      {
        question: "Czym jest architektura cenowa?",
        answer:
          "Architektura cenowa to uporządkowany układ cen w kategorii: próg wejścia, środek i najwyższa półka, z jasnymi odstępami między nimi. Pokazuje klientowi, za co płaci więcej, i pozwala marce kontrolować marżę na każdym poziomie. Luka lub nakładające się ceny zwykle oznaczają utraconą sprzedaż.",
      },
      {
        question: "Czy analiza cen obejmuje ceny konkurencji?",
        answer:
          "Tak, jako jeden z elementów. Ceny konkurentów pokazują, gdzie marka stoi na rynku, ale ważniejsza jest reakcja własnych klientów na własne ceny, widoczna w sprzedaży i w sell-through. Dlatego porównanie z konkurencją zawsze zestawiam z danymi sprzedażowymi.",
      },
      {
        question: "Jak zaplanować obniżki cen przed sezonem?",
        answer:
          "Model obniżek opiera się na planie sprzedaży, zapasie i historii poprzednich sezonów. Dla każdego wariantu, na przykład wcześniejszej i płytszej albo późniejszej i głębszej obniżki, pokazuje marżę i zapas na koniec sezonu. Decyzję podejmuje się przed sezonem, a w trakcie koryguje według tygodniowego sell-through.",
      },
      {
        question: "Jakie dane są potrzebne do analizy cen?",
        answer:
          "Sprzedaż na poziomie SKU i tygodnia z ceną regularną, ceną sprzedaży, rabatem i kosztem zakupu, najlepiej za co najmniej jeden pełny sezon. Przy kilku rynkach potrzebne są też waluty i kursy przeliczeniowe. Ceny konkurencji można dodać z osobnego zestawienia.",
      },
    ],
    ctaTitle: "Porozmawiaj o analizie cen w Twojej marce",
    ctaText:
      "Napisz, w której kategorii ceny wydają się nietrafione. Odpowiem, co sprawdziłabym najpierw.",
    seo: {
      title: "Analiza cen w handlu i architektura cenowa marek modowych",
      description:
        "Analiza cen dla marek modowych: architektura cenowa, progi cenowe w kategoriach, spójne ceny na rynkach i scenariusze obniżek przed sezonem.",
    },
  },
  {
    ...base("power-bi-dashboards"),
    cardTitle: "Raportowanie sprzedaży w Power BI",
    cardText:
      "Dashboard sprzedażowy z sell-through, pokryciem zapasu, marżą i zwrotami w jednym modelu danych, który zespół handlowy naprawdę otwiera.",
    chartCaption: "układ dashboardu sprzedażowego · schemat",
    breadcrumb: "Raportowanie sprzedaży w Power BI",
    h1: { before: "Raportowanie sprzedaży w Power BI:", accent: "dashboardy KPI dla handlu i mody" },
    intro:
      "Raportowanie sprzedaży w Power BI to jeden model danych i jeden dashboard sprzedażowy, w którym zakupy, planowanie i finanse widzą te same KPI: sell-through, pokrycie zapasu, marżę i zwroty. Wdrożenie dla marki modowej obejmuje słownik KPI, model danych, miary DAX i strony raportu przygotowane pod cotygodniowe spotkania handlowe.",
    factsTitle: "Typowe wdrożenie Power BI",
    facts: facts("4–8 tygodni", "model danych i raport sprzedaży"),
    factsNote: "Najpierw definicje KPI, potem wykresy.",
    problemsTitle: "Problemy z raportowaniem sprzedaży, które rozwiązuje Power BI",
    problems: [
      {
        title: "Pięć raportów i pięć wersji sell-through",
        text: "Każdy zespół liczy ten sam wskaźnik inaczej, więc spotkanie zaczyna się od sporu o liczby.",
      },
      {
        title: "Raport sprzedaży składany ręcznie z eksportów",
        text: "Kopiowanie danych i poprawki formuł zajmują co tydzień kilka godzin, a co miesiąc kilka dni.",
      },
      {
        title: "Dashboardy, których nikt nie otwiera",
        text: "Raport odpowiada na pytania, których nikt nie zadaje, a na te ważne trzeba szukać odpowiedzi w Excelu.",
      },
      {
        title: "Wskaźniki bez właściciela",
        text: "Gdy wynik wygląda podejrzanie, nikt nie wie, kto może go wyjaśnić.",
      },
    ],
    includesTitle: "Co obejmuje wdrożenie dashboardu sprzedażowego",
    includesLead: "Pięć etapów, od uzgodnienia definicji do przekazania raportu zespołowi.",
    includes: [
      {
        label: "01",
        title: "Słownik KPI uzgodniony z zespołami",
        text: "Każdy wskaźnik z wzorem, źródłem danych i właścicielem, zatwierdzony przez zakupy, planowanie i finanse.",
      },
      {
        label: "02",
        title: "Model danych handlowych w Power BI",
        text: "Sprzedaż, zapasy, dostawy, zwroty i atrybuty produktu połączone w jednym modelu.",
      },
      {
        label: "03",
        title: "Miary DAX dla sell-through, zapasu i marży",
        text: "Sell-through, tygodnie pokrycia zapasu, udział sprzedaży w pełnej cenie, zwroty i marża.",
      },
      {
        label: "04",
        title: "Strony raportu pod cotygodniowe spotkania handlowe",
        text: "Przegląd tygodnia, widok kategorii i podsumowanie końca sezonu ułożone według agendy spotkania.",
      },
      {
        label: "05",
        title: "Odświeżanie, RLS i przekazanie raportu zespołowi",
        text: "Harmonogram odświeżania, zabezpieczenia na poziomie wierszy dla rynków i dokumentacja modelu.",
      },
    ],
    resultsTitle: "Wyniki projektów raportowania sprzedaży w Power BI",
    results: [
      { value: "40", unit: "h", label: "miesięcznie mniej ręcznej pracy nad raportami" },
      { value: "4 → 1", label: "konkurujące raporty zastąpione jednym modelem danych" },
      { value: "100", unit: "%", label: "wskaźników z definicją i właścicielem" },
    ],
    toolsTitle: "Narzędzia w projektach Power BI",
    tools: [
      { label: "BI", title: "Model danych Power BI i miary DAX", text: "Relacje, miary i zabezpieczenia na poziomie wierszy." },
      { label: "PQ", title: "Power Query do przygotowania danych", text: "Powtarzalne czyszczenie eksportów z ERP i PLM." },
      { label: "fx", title: "Excel jako słownik KPI", text: "Jedno miejsce z opisem, wzorem i właścicielem każdego wskaźnika." },
    ],
    recommendationTitle: "Rekomendacja współpracownika z branży mody o raportowaniu sprzedaży w Power BI",
    recommendation: rec("raportowaniu sprzedaży w Power BI"),
    faqTitle: "Raportowanie sprzedaży w Power BI — pytania",
    faq: [
      {
        question: "Ile trwa wdrożenie Power BI w firmie handlowej?",
        answer:
          "Wdrożenie raportu sprzedaży dla jednej marki trwa zwykle od czterech do ośmiu tygodni. Najwięcej czasu zajmuje uzgodnienie definicji KPI i przygotowanie danych, a nie sam projekt stron raportu. Przy kilku rynkach i źródłach danych projekt może się wydłużyć.",
      },
      {
        question: "Czy Power BI jest za darmo?",
        answer:
          "Power BI Desktop, w którym buduje się model i raporty, jest bezpłatny. Publikowanie i udostępnianie raportów innym osobom w usłudze Power BI wymaga licencji Pro dla każdego użytkownika albo pojemności Premium lub Fabric. Bezpłatne konto wystarcza do nauki i pracy na własnym komputerze.",
      },
      {
        question: "Ile kosztuje licencja Power BI?",
        answer:
          "Power BI Pro jest licencjonowany w abonamencie miesięcznym na użytkownika; w 2025 roku kosztował około 14 USD netto miesięcznie, a Premium Per User około 24 USD. Duże organizacje mogą zamiast tego kupić pojemność Fabric. Aktualny cennik warto sprawdzić na stronie Microsoftu, bo ceny się zmieniają.",
      },
      {
        question: "Czy każdy rynek może widzieć tylko swoje dane?",
        answer:
          "Tak. Służą do tego zabezpieczenia na poziomie wierszy (RLS): jeden raport, a każdy rynek po zalogowaniu widzi wyłącznie swoje liczby. Role można przypisać ręcznie albo dynamicznie, na podstawie tabeli użytkowników i rynków.",
      },
      {
        question: "Czym różni się raport od dashboardu w Power BI?",
        answer:
          "Raport w Power BI to jedna lub wiele interaktywnych stron zbudowanych na jednym modelu danych, z filtrami i przejściami do szczegółów. Dashboard w usłudze Power BI to jedna strona z przypiętymi kafelkami, które mogą pochodzić z różnych raportów. W codziennym języku dashboardem sprzedażowym nazywa się zwykle stronę przeglądową raportu.",
      },
    ],
    ctaTitle: "Porozmawiaj o raportowaniu sprzedaży w Power BI",
    ctaText:
      "Opisz raport, o który Twój zespół spiera się najczęściej. Odpowiem, od których definicji zaczęłabym porządki.",
    seo: {
      title: "Raportowanie sprzedaży w Power BI dla handlu i mody",
      description:
        "Wdrożenie Power BI dla marek modowych: model danych, miary DAX i dashboard sprzedażowy z sell-through, pokryciem zapasu, marżą i zwrotami.",
    },
  },
  {
    ...base("excel-retail-planning-models"),
    cardTitle: "Planowanie zakupów w Excelu",
    cardText:
      "Budżet open-to-buy, plan zakupów i model marży w jednym skoroszycie, który prowadzi zespół planowania, a nie konsultant.",
    chartCaption: "budżet open-to-buy · sztuki, dane przykładowe",
    breadcrumb: "Planowanie zakupów w Excelu",
    h1: { before: "Modele Excel do planowania", accent: "zakupów i sprzedaży", after: "w handlu" },
    intro:
      "Model planowania zakupów w Excelu łączy plan sprzedaży, budżet open-to-buy i marżę w jednym skoroszycie, który planiści prowadzą bez pomocy autora. Buduję takie modele dla marek modowych i dystrybutorów, którym potrzebny jest przejrzysty plan zakupów przed wdrożeniem systemu planistycznego albo zamiast niego.",
    factsTitle: "Typowy projekt modelu planowania zakupów",
    facts: facts("3–6 tygodni", "model w Excelu i instrukcja"),
    factsNote: "Model jest gotowy wtedy, gdy prowadzi go ktoś inny niż autor.",
    problemsTitle: "Problemy z planowaniem zakupów, które rozwiązują modele Excel",
    problems: [
      {
        title: "Plan zakupów, który rozumie tylko autor",
        text: "Ukryte arkusze, liczby wpisane na sztywno w formuły i brak opisu logiki.",
      },
      {
        title: "Budżet open-to-buy rozjeżdża się w sezonie",
        text: "Dostawy, sprzedaż i zamówienia aktualizuje się w różnych plikach, więc budżet przestaje się zgadzać.",
      },
      {
        title: "Scenariusze tworzone przez kopiowanie pliku",
        text: "Każdy wariant zakupu to nowa wersja skoroszytu i nikt nie wie, która jest ostateczna.",
      },
      {
        title: "Marża liczona inaczej w każdej zakładce",
        text: "Koszty, rabaty i kursy walut są wpisane w kilku miejscach i nie zgadzają się ze sobą.",
      },
    ],
    includesTitle: "Co obejmuje model planowania zakupów w Excelu",
    includesLead: "Cztery części w jednym skoroszycie, z krótką instrukcją dla kolejnego właściciela.",
    includes: [
      {
        label: "01",
        title: "Budżet open-to-buy z podziałem na miesiące",
        text: "Ilości i wartość zakupu według miesiąca, kategorii i rynku, z zapasem początkowym i końcowym.",
      },
      {
        label: "02",
        title: "Plan zakupów i kalkulacja marży dla rynków",
        text: "Jedna logika kosztu, ceny, rabatu i kursu waluty dla wszystkich rynków.",
      },
      {
        label: "03",
        title: "Porównanie scenariuszy bez kopiowania plików",
        text: "Przełączane założenia i zestawienie wariantów obok siebie w jednym arkuszu.",
      },
      {
        label: "04",
        title: "Kontrole spójności i instrukcja utrzymania modelu",
        text: "Trzy automatyczne kontrole i opis, jak aktualizować model co tydzień.",
      },
    ],
    resultsTitle: "Wyniki modeli planowania zakupów w Excelu",
    results: [
      { value: "1", label: "skoroszyt zamiast sezonowych kopii" },
      { value: "−70", unit: "%", label: "czasu cotygodniowej aktualizacji budżetu open-to-buy" },
      { value: "3", label: "automatyczne kontrole spójności" },
    ],
    toolsTitle: "Excel i Power Query w planowaniu zakupów",
    tools: [
      { label: "fx", title: "Formuły i tabele strukturalne Excela", text: "Tablice dynamiczne, sumy warunkowe i nazwane zakresy zamiast adresów komórek." },
      { label: "PQ", title: "Power Query do importu sprzedaży i zapasów", text: "Dane z ERP wczytywane bez ręcznego kopiowania." },
      { label: "BI", title: "Power BI do porównania planu z wykonaniem", text: "Plan zakupów zestawiony z rzeczywistą sprzedażą w sezonie." },
    ],
    recommendationTitle: "Rekomendacja współpracownika z branży mody o planowaniu zakupów w Excelu",
    recommendation: rec("modelu planowania zakupów"),
    faqTitle: "Planowanie zakupów w Excelu — pytania",
    faq: [
      {
        question: "Czym jest budżet open-to-buy?",
        answer:
          "Budżet open-to-buy (OTB) to kwota lub liczba sztuk, którą marka może jeszcze zamówić w danym okresie, aby osiągnąć planowany zapas końcowy. Oblicza się go jako planowaną sprzedaż plus obniżki plus planowany zapas końcowy, minus zapas początkowy i towar już zamówiony. Budżet aktualizuje się w trakcie sezonu według rzeczywistej sprzedaży.",
      },
      {
        question: "Dlaczego Excel, a nie system do planowania?",
        answer:
          "Wiele zespołów najpierw potrzebuje przejrzystego modelu, który rozumieją wszyscy planiści. Excel jest dostępny od razu, nie wymaga wdrożenia i pozwala szybko zmieniać logikę. Dobrze zbudowany model staje się potem specyfikacją, jeśli firma zdecyduje się na system planistyczny.",
      },
      {
        question: "Czy można przebudować nasz obecny plik planu zakupów?",
        answer:
          "Tak. Najpierw dokumentuję istniejącą logikę i sprawdzam, które formuły dają błędne wyniki. Potem przenoszę ją do nowej struktury, zachowując układ, do którego zespół jest przyzwyczajony.",
      },
      {
        question: "Jak połączyć planowanie sprzedaży z planem zakupów?",
        answer:
          "Plan sprzedaży według miesięcy i kategorii jest wejściem do budżetu open-to-buy, więc oba plany powinny być w tym samym skoroszycie lub czytać te same dane. Zmiana prognozy sprzedaży od razu zmienia wtedy dostępny budżet zakupów. W modelu służy do tego jedna tabela założeń zamiast liczb przepisywanych ręcznie.",
      },
      {
        question: "Jaka wersja Excela jest potrzebna?",
        answer:
          "Zalecam Microsoft 365, bo model korzysta z tablic dynamicznych i aktualnego Power Query. Excel 2021 zwykle też wystarcza. W starszych wersjach część funkcji trzeba zastąpić prostszymi formułami, co ustalamy na początku projektu.",
      },
    ],
    ctaTitle: "Porozmawiaj o planowaniu zakupów w Excelu",
    ctaText:
      "Opisz plik planu zakupów, którego Twój zespół boi się dotykać. Odpowiem, co przebudowałabym najpierw.",
    seo: {
      title: "Planowanie zakupów i sprzedaży w Excelu dla handlu",
      description:
        "Modele Excel do planowania zakupów w handlu modowym: budżet open-to-buy, plan zakupów, marża i scenariusze, które zespół utrzyma samodzielnie.",
    },
  },
  {
    ...base("product-data-quality-plm"),
    cardTitle: "Jakość danych produktowych i PLM",
    cardText:
      "Jeden słownik atrybutów dla wszystkich rynków: kompletne kolory, sezony, składy i kategorie w systemie PLM i w kartach produktowych.",
    chartCaption: "kompletność atrybutów · dane przykładowe",
    breadcrumb: "Jakość danych produktowych",
    h1: { before: "Jakość danych produktowych i standaryzacja danych", accent: "w systemie PLM" },
    intro:
      "Jakość danych produktowych oznacza, że każdy produkt ma kompletne i jednakowo zapisane atrybuty — kolor, sezon, skład, kategorię — na wszystkich rynkach i we wszystkich systemach. Markom modowym przygotowuję słownik atrybutów, reguły walidacji w PLM i dashboard jakości danych, dzięki którym karty produktowe i raporty przestają wymagać ręcznych poprawek.",
    factsTitle: "Typowy projekt standaryzacji danych produktowych",
    facts: facts("6–12 tygodni", "słownik atrybutów, reguły walidacji i dashboard"),
    factsNote: "Najtrudniejsze jest uzgodnienie słownika, nie jego zapisanie.",
    problemsTitle: "Problemy z danymi produktowymi, które rozwiązuje standaryzacja",
    problems: [
      {
        title: "Ten sam kolor zapisany na cztery sposoby",
        text: "Wolny tekst w polach atrybutów uniemożliwia filtrowanie w sklepie internetowym i raportowanie kategorii.",
      },
      {
        title: "Kody sezonów niezgodne między rynkami",
        text: "Rynki różnie definiują początek sezonu, więc te same produkty trafiają do różnych okresów w raportach.",
      },
      {
        title: "Puste pola odkryte dopiero przy publikacji",
        text: "Produkty trafiają do e-commerce bez składu, kategorii lub opisu i blokują start sprzedaży.",
      },
      {
        title: "Ręczne czyszczenie danych przed każdym raportem",
        text: "Co miesiąc ktoś traci kilka dni na poprawianie atrybutów, zanim liczby da się zsumować.",
      },
    ],
    includesTitle: "Co obejmuje standaryzacja danych produktowych",
    includesLead: "Cztery etapy — od audytu atrybutów do comiesięcznego przeglądu jakości danych.",
    includes: [
      {
        label: "01",
        title: "Audyt atrybutów produktów na rynkach",
        text: "Każde pole zmapowane, policzone i ocenione pod kątem kompletności i sprzecznych wartości.",
      },
      {
        label: "02",
        title: "Słownik atrybutów uzgodniony ze wszystkimi rynkami",
        text: "Kolor, sezon, skład i kategoria zdefiniowane raz, z listą dozwolonych wartości i tłumaczeniami.",
      },
      {
        label: "03",
        title: "Reguły migracji i walidacja danych w PLM",
        text: "Dane archiwalne przemapowane według słownika, a nowe produkty sprawdzane już przy wprowadzaniu.",
      },
      {
        label: "04",
        title: "Dashboard jakości danych produktowych",
        text: "Kompletność według atrybutu, rynku i sezonu, z właścicielem każdej luki i comiesięcznym przeglądem.",
      },
    ],
    resultsTitle: "Wyniki standaryzacji danych produktowych",
    results: [
      { value: "98", unit: "%", label: "kompletności atrybutów produktów" },
      { value: "−60", unit: "%", label: "czasu na poprawianie danych przed raportowaniem" },
      { value: "3", unit: "dni", label: "ręcznego czyszczenia danych mniej co miesiąc" },
    ],
    toolsTitle: "Narzędzia w projektach danych produktowych i PLM",
    tools: [
      { label: "PLM", title: "Konfiguracja atrybutów w systemie PLM", text: "Listy wartości, pola obowiązkowe i reguły walidacji." },
      { label: "fx", title: "Excel i Power Query do mapowania atrybutów", text: "Powtarzalne przemapowanie danych archiwalnych." },
      { label: "BI", title: "Dashboard jakości danych w Power BI", text: "Kompletność według atrybutu, rynku i sezonu." },
    ],
    recommendationTitle: "Rekomendacja współpracownika z branży mody o jakości danych produktowych",
    recommendation: rec("projekcie danych produktowych"),
    faqTitle: "Jakość danych produktowych i PLM — pytania",
    faq: [
      {
        question: "Co to jest jakość danych produktowych?",
        answer:
          "Jakość danych produktowych to stopień, w jakim informacje o produkcie są kompletne, poprawne i zapisane według wspólnych zasad. Mierzy się ją między innymi kompletnością atrybutów i zgodnością wartości ze słownikiem. Od jakości tych danych zależą filtry w sklepie internetowym, raporty sprzedaży i planowanie asortymentu.",
      },
      {
        question: "Czym różni się system PIM od PLM?",
        answer:
          "System PLM prowadzi produkt od projektu do produkcji: materiały, konstrukcję, dostawców i sezony. System PIM gromadzi gotowe informacje handlowe i publikuje je w kanałach sprzedaży, na przykład w sklepie internetowym i na marketplace'ach. W marce modowej dane zwykle powstają w PLM i są przekazywane do PIM.",
      },
      {
        question: "Jakie atrybuty powinna mieć karta produktowa w modzie?",
        answer:
          "Podstawą są kategoria, kolor, rozmiar, skład materiałowy, sezon, cena i instrukcja pielęgnacji. Do filtrów w e-commerce przydają się też krój, długość, fason i okazja. Każdy z tych atrybutów powinien mieć listę dozwolonych wartości zamiast wolnego tekstu.",
      },
      {
        question: "Ile trwa uzgodnienie słownika atrybutów?",
        answer:
          "Zwykle od trzech do pięciu tygodni, w zależności od liczby rynków i atrybutów. Najwięcej czasu zajmuje uzgodnienie wartości, które rynki zapisywały dotąd po swojemu, na przykład nazw kolorów. Techniczne wprowadzenie słownika do PLM jest zwykle szybsze.",
      },
      {
        question: "Czy można uporządkować dane archiwalne?",
        answer:
          "Tak. Reguły migracji mapują stare wartości na nowe według słownika, a przypadki, których nie da się dopasować automatycznie, trafiają na listę do ręcznego przeglądu. Dzięki temu raporty porównujące sezony korzystają z jednolitych danych.",
      },
    ],
    ctaTitle: "Porozmawiaj o jakości danych produktowych w Twojej marce",
    ctaText:
      "Napisz, które trzy atrybuty sprawiają najwięcej kłopotu. Odpowiem, od czego zaczęłabym standaryzację.",
    seo: {
      title: "Jakość danych produktowych i standardy PLM w modzie",
      description:
        "Jakość danych produktowych dla marek modowych: słownik atrybutów, reguły walidacji w PLM, porządek w kartach produktowych i dashboard jakości.",
    },
  },
  {
    ...base("retail-analytics-processes"),
    cardTitle: "Procesy raportowania w handlu",
    cardText:
      "Kalendarz raportowy, właściciele raportów, definicje KPI i cotygodniowy przegląd sprzedaży — liczby uzgadnia się raz i używa wszędzie.",
    chartCaption: "kalendarz raportowy · tydzień / miesiąc / kwartał",
    breadcrumb: "Procesy raportowania",
    h1: { before: "Organizacja procesów raportowania i", accent: "zespołu analitycznego", after: "w handlu" },
    intro:
      "Organizacja procesów raportowania to ustalenie, kto, kiedy i według jakich definicji przygotowuje każdy raport, tak aby cotygodniowy przegląd sprzedaży kończył się decyzjami, a nie sprawdzaniem liczb. Zespołom w handlu i modzie pomagam zbudować kalendarz raportowy, macierz odpowiedzialności, definicje KPI i rejestr decyzji.",
    factsTitle: "Typowy projekt organizacji raportowania",
    facts: facts("4–8 tygodni", "kalendarz, role i definicje KPI"),
    factsNote: "Raport bez właściciela po miesiącu przestaje być prawdziwy.",
    problemsTitle: "Problemy z raportowaniem, które rozwiązuje uporządkowanie procesów",
    problems: [
      {
        title: "Raporty w przypadkowych terminach",
        text: "Nikt nie wie, która wersja jest ostateczna i kiedy pojawi się następna.",
      },
      {
        title: "Analizy robi ten, kto akurat ma czas",
        text: "Zadania się dublują, a część pytań zostaje bez odpowiedzi.",
      },
      {
        title: "Definicje wskaźników tylko w głowach pracowników",
        text: "Odejście jednej osoby zabiera logikę raportów, której nikt nie zapisał.",
      },
      {
        title: "Przeglądy sprzedaży bez decyzji",
        text: "Ustalenia ze spotkań nie są zapisywane, więc nikt nie sprawdza, czy zostały wykonane.",
      },
    ],
    includesTitle: "Co obejmuje organizacja procesów raportowania",
    includesLead: "Cztery elementy, dzięki którym raportowanie działa co tydzień tak samo.",
    includes: [
      {
        label: "01",
        title: "Kalendarz raportowy",
        text: "Raporty tygodniowe, miesięczne i sezonowe z terminami, odbiorcami i źródłami danych.",
      },
      {
        label: "02",
        title: "Macierz odpowiedzialności za raporty",
        text: "Kto przygotowuje, kto sprawdza, kto prezentuje i kto zastępuje każdą z tych osób.",
      },
      {
        label: "03",
        title: "Definicje KPI i standardy danych",
        text: "Wzory wskaźników i zasady wprowadzania danych zebrane w jednym dokumencie.",
      },
      {
        label: "04",
        title: "Cotygodniowy przegląd sprzedaży i rejestr decyzji",
        text: "Spotkanie według stałej agendy, które kończy się zadaniem, właścicielem i terminem.",
      },
    ],
    resultsTitle: "Wyniki organizacji procesów raportowania",
    results: [
      { value: "1", label: "kalendarz raportowy dla wszystkich zespołów" },
      { value: "100", unit: "%", label: "raportów z przypisanym właścicielem" },
      { value: "−50", unit: "%", label: "czasu na uzgadnianie liczb przed spotkaniami" },
    ],
    toolsTitle: "Narzędzia w projektach procesów raportowania",
    tools: [
      { label: "fx", title: "Macierz odpowiedzialności w Excelu", text: "Raporty, właściciele, zastępcy i terminy w jednej tabeli." },
      { label: "BI", title: "Katalog raportów Power BI", text: "Który raport odpowiada na które pytanie biznesowe." },
      { label: "PLM", title: "Standardy danych w systemie PLM", text: "Zasady wprowadzania danych, na których opierają się raporty." },
    ],
    recommendationTitle: "Rekomendacja współpracownika z branży mody o organizacji raportowania",
    recommendation: rec("organizacji zespołu i raportowania"),
    faqTitle: "Procesy raportowania w handlu — pytania",
    faq: [
      {
        question: "Co powinien zawierać tygodniowy raport sprzedaży?",
        answer:
          "Tygodniowy raport sprzedaży w handlu modowym powinien pokazywać sprzedaż wartościowo i ilościowo na tle planu i poprzedniego roku, sell-through, pokrycie zapasu, udział sprzedaży w pełnej cenie i zwroty. Warto dodać listę bestsellerów i produktów sprzedających się najsłabiej. Każdy wskaźnik powinien mieć jedną definicję i właściciela.",
      },
      {
        question: "Kto powinien odpowiadać za każdy wskaźnik?",
        answer:
          "Za każdy wskaźnik odpowiada jedna osoba, zwykle z zespołu, który najczęściej podejmuje na jego podstawie decyzje: za sell-through zakupy lub planowanie, za marżę finanse. Właściciel pilnuje definicji i wyjaśnia nietypowe wyniki. Zespół analityczny odpowiada za to, żeby dane były policzone zgodnie z definicją.",
      },
      {
        question: "Czy mała firma potrzebuje procesu raportowego?",
        answer:
          "Tak, choć w prostszej formie. W małym zespole wystarczą stały termin raportu, spisane definicje kilku najważniejszych wskaźników i krótki rejestr decyzji. Małe firmy często zyskują najwięcej, bo jedna osoba nie musi już pamiętać całej logiki raportów.",
      },
      {
        question: "Czy pracujesz na naszych obecnych raportach i narzędziach?",
        answer:
          "Tak. Proces projektuję wokół raportów i narzędzi, których zespół już używa, i zmieniam tylko to, co powoduje spory o liczby lub opóźnienia. Nowe narzędzia proponuję dopiero wtedy, gdy obecne naprawdę nie wystarczają.",
      },
      {
        question: "Czy przeszkolisz zespół, który będzie prowadził raporty?",
        answer:
          "Tak. Szkolenie z kalendarza, definicji KPI i prowadzenia przeglądu sprzedaży jest częścią przekazania projektu. Zespół dostaje też pisemny opis procesu, z którego skorzystają nowe osoby.",
      },
    ],
    ctaTitle: "Porozmawiaj o procesach raportowania w Twoim zespole",
    ctaText:
      "Opisz, jak dziś powstaje Twój tygodniowy raport sprzedaży. Odpowiem, gdzie proces traci najwięcej czasu.",
    seo: {
      title: "Procesy raportowania i zespół analityczny w handlu",
      description:
        "Kalendarz raportowy, właściciele raportów, definicje KPI i cotygodniowe przeglądy sprzedaży, które kończą się decyzjami. Dla zespołów w handlu.",
    },
  },
];

export const formats: ConsultingFormat[] = [
  {
    label: "FORMAT 01",
    title: "Dwutygodniowa diagnoza danych sprzedażowych",
    suits: "markom, które podejrzewają błędy w asortymencie lub cenach, ale nie mogą tego wykazać na podstawie obecnych raportów.",
    youGet: "pisemny raport z ustaleniami, policzone straty i listę priorytetów.",
    duration: "2 tygodnie",
    cta: "Zapytaj o diagnozę",
  },
  {
    label: "FORMAT 02",
    title: "Projekt: asortyment, ceny, dane lub raportowanie",
    suits: "zespołom z jednym jasnym problemem — planem asortymentu, cenami, danymi produktowymi w PLM lub raportem sprzedaży.",
    youGet: "działający model lub dashboard, dokumentację i przekazanie zespołowi.",
    duration: "3–12 tygodni",
    cta: "Omów projekt",
  },
  {
    label: "FORMAT 03",
    title: "Stałe wsparcie analityczne",
    suits: "rosnącym markom bez własnego analityka, które potrzebują analityki na zlecenie w stałym, miesięcznym rytmie.",
    youGet: "prowadzone raporty, comiesięczny przegląd wyników i zapisane decyzje.",
    duration: "współpraca miesięczna",
    cta: "Zapytaj o wsparcie",
  },
];

export const tools: Tool[] = [
  {
    id: "power-bi",
    monogram: "BI",
    title: "Power BI w raportowaniu sprzedaży",
    text: "Jeden model danych dla marki: sell-through, pokrycie zapasu i marża bez ręcznego składania raportów.",
    skills: ["DAX", "Power Query", "RLS"],
  },
  {
    id: "excel",
    monogram: "fx",
    title: "Zaawansowany Excel w planowaniu zakupów",
    text: "Plany zakupów, budżety open-to-buy i scenariusze marży, które planiści potrafią prowadzić samodzielnie.",
    skills: ["open-to-buy", "scenariusze", "tabele przestawne"],
  },
  {
    id: "plm",
    monogram: "PLM",
    title: "Systemy PLM i dane produktowe",
    text: "Słowniki atrybutów, struktury sezonów i kolorów oraz reguły, które utrzymują dane w porządku.",
    skills: ["słownik atrybutów", "walidacja danych", "zarządzanie danymi"],
  },
];

export const recommendations: Recommendation[] = [
  {
    quote: "„Tekst zastępczy rekomendacji. Kilka zdań o tym, jak analiza asortymentu zmieniła decyzje zespołu zakupów.”",
    name: "Imię Nazwisko",
    role: "Stanowisko · wspólna praca nad asortymentem",
    placeholder: true,
  },
  {
    quote: "„Tekst zastępczy rekomendacji. Kilka zdań o raportach Power BI, których liczb nikt już nie podważa.”",
    name: "Imię Nazwisko",
    role: "Stanowisko · ten sam zespół marki",
    placeholder: true,
  },
  {
    quote: "„Tekst zastępczy rekomendacji. Krótko o pracy z danymi produktowymi w PLM i przekazaniu standardu zespołowi.”",
    name: "Imię Nazwisko",
    role: "Stanowisko · projekt danych produktowych",
    placeholder: true,
  },
];
