import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("category-management", "pl"),
  title: "Category management w handlu modowym: zasady i etapy",
  h1: { before: "Category management w handlu modowym:", accent: "zasady i etapy" },
  excerpt: "Co to jest category management, jakie są jego etapy i czym różni się od planowania asortymentu w marce modowej.",
  lead: "Category management to zarządzanie asortymentem według kategorii traktowanych jak osobne jednostki biznesowe, z własnym celem, strategią, wynikami i odpowiedzialną osobą. W handlu modowym oznacza to, że sukienki, kurtki czy akcesoria mają osobne plany sprzedaży, marży, cen i zapasu.",
  date: "2026-03-17",
  readingMinutes: 5,
  body: [
    { type: "h2", id: "co-to-jest-category-management", text: "Co to jest category management" },
    {
      type: "p",
      text: "Category management, po polsku zarządzanie kategorią, w skrócie CatMan, to sposób organizacji handlu, w którym podstawową jednostką decyzji jest kategoria produktów, a nie pojedynczy produkt, dostawca czy sklep. Kategoria ma swój cel, swój plan i swoją osobę odpowiedzialną za wynik. Podejście wyrosło w latach 90. z handlu spożywczego i współpracy detalistów z producentami w ramach inicjatywy ECR (Efficient Consumer Response).",
    },
    {
      type: "p",
      text: "Szukając definicji, łatwo trafić na drugie znaczenie tego pojęcia. W zakupach firmowych (procurement) category management oznacza grupowanie kupowanych towarów i usług w kategorie, żeby skonsolidować wydatki i lepiej negocjować z dostawcami. W tym artykule piszę o znaczeniu handlowym: o kategoriach, które sklep lub marka sprzedaje klientom.",
    },
    {
      type: "p",
      text: "Najważniejsza zasada: kategorię definiuje się z perspektywy klienta. Klientka nie szuka „dzianiny od dostawcy X”, tylko swetra na jesień albo sukienki na wesele. Dlatego kategorie w modzie buduje się wokół potrzeb i okazji zakupowych, a dopiero potem dopasowuje do nich strukturę zakupów i dostawców. Z tej zasady wynikają kolejne:",
    },
    {
      type: "list",
      items: [
        "Kategoria jak biznes: ma własny plan sprzedaży, marży i zapasu, a jej wynik ocenia się tak, jak ocenia się wynik firmy.",
        "Jedna osoba odpowiedzialna: category manager, kupiec lub merchandiser odpowiada za całość, a nie za wycinek, na przykład tylko za zakup.",
        "Decyzje na danych: asortyment, ceny i promocje wynikają ze sprzedaży, zapasu i zachowań klientów, a nie z przyzwyczajeń.",
        "Rola kategorii: nie każda kategoria ma te same cele. Jedna buduje ruch, inna marżę, jeszcze inna uzupełnia koszyk.",
        "Stały cykl: plan, realizacja i przegląd powtarzają się co sezon, a wnioski z przeglądu zasilają kolejny plan.",
      ],
    },
    {
      type: "p",
      text: "Category management w modzie różni się od wersji znanej z supermarketów. W handlu spożywczym asortyment jest w dużej mierze stały, a kategoria żyje latami: te same produkty, te same półki, negocjacje z producentami o miejsce na regale. W marce modowej większość kolekcji zmienia się co sezon, więc zarządza się nie listą produktów, tylko strukturą: liczbą modeli, poziomami cenowymi, głębokością zakupu i proporcją między produktami bazowymi a modowymi. Kategoria jest stała, a jej zawartość wymienia się co kilka miesięcy.",
    },
    { type: "h2", id: "role-kategorii", text: "Role kategorii w category management" },
    {
      type: "p",
      text: "Klasyczny model ECR opisuje cztery role kategorii. W wielu źródłach spotyka się też wersję z trzema typami, bez kategorii uzupełniającej. Sama nazwa jest mniej ważna od konsekwencji: rola decyduje, ile miejsca, budżetu i uwagi dostaje kategoria i po jakich wskaźnikach się ją ocenia.",
    },
    {
      type: "table",
      caption: "Role kategorii w modelu ECR – przykłady dla marki odzieży damskiej",
      columns: [
        { label: "Rola kategorii", kind: "text" },
        { label: "Przykład w modzie", kind: "text" },
        { label: "Główny cel i wskaźnik", kind: "text" },
      ],
      rows: [
        { cells: ["Docelowa (wizerunkowa)", "Sukienki, jeansy w marce jeansowej", "Budowanie ruchu i wizerunku; udział w sprzedaży, sell-through"] },
        { cells: ["Podstawowa (rutynowa)", "Koszulki bazowe, bielizna, legginsy", "Stała dostępność; pokrycie zapasu, braki rozmiarów"] },
        { cells: ["Sezonowa (okazjonalna)", "Stroje kąpielowe, kurtki puchowe, kolekcja świąteczna", "Sprzedaż w oknie sezonu; sell-through, udział obniżek"] },
        { cells: ["Uzupełniająca", "Skarpetki, paski, drobne akcesoria", "Wartość koszyka i marża; liczba sztuk na paragon, marża procentowa"] },
      ],
    },
    {
      type: "p",
      text: "Ta sama kategoria może mieć różne role w różnych markach. Dla marki sportowej legginsy są kategorią docelową, a dla marki z odzieżą biurową uzupełniającą. Rolę ustala się więc na podstawie danych marki: udziału w sprzedaży, częstotliwości zakupu i tego, czy kategoria przyciąga klientów, czy raczej dopełnia ich zakupy.",
    },
    {
      type: "p",
      text: "Rola ma bezpośrednie przełożenie na decyzje. Kategoria docelowa dostaje najlepsze miejsce w sklepie i na stronie głównej, najszerszy wybór i priorytet w dostawach, a jej braki kosztują najwięcej. Kategoria podstawowa nie musi zachwycać wyborem, ale nie może mieć dziur w rozmiarach. Kategoria uzupełniająca ma pracować na marżę i wartość koszyka, więc rzadko obejmuje się ją głębokimi obniżkami.",
    },
    { type: "h2", id: "etapy-category-management", text: "Etapy category management" },
    {
      type: "p",
      text: "Model ECR dzieli proces zarządzania kategorią na osiem etapów. Tabela pokazuje, na jakie pytanie odpowiada każdy z nich i jak wygląda w marce modowej.",
    },
    {
      type: "table",
      caption: "Osiem etapów category management według ECR i ich odpowiedniki w handlu modowym",
      columns: [
        { label: "Etap", kind: "text" },
        { label: "Pytanie", kind: "text" },
        { label: "W marce modowej", kind: "text" },
      ],
      rows: [
        { cells: ["1. Definicja kategorii", "Co należy do kategorii?", "Drzewo kategorii: np. okrycia → kurtki, płaszcze, kamizelki"] },
        { cells: ["2. Rola kategorii", "Po co ta kategoria istnieje?", "Docelowa, podstawowa, sezonowa lub uzupełniająca"] },
        { cells: ["3. Ocena kategorii", "Jak radzi sobie teraz?", "Analiza sprzedaży, marży, sell-through i zapasu z poprzedniego sezonu"] },
        { cells: ["4. Karta wyników", "Jakie cele i wskaźniki?", "Plan sprzedaży, marży, sell-through i pokrycia zapasu na sezon"] },
        { cells: ["5. Strategie", "Jak osiągnąć cele?", "Np. budowanie ruchu, zwiększanie marży, ochrona udziału"] },
        { cells: ["6. Taktyki", "Jakie konkretne działania?", "Asortyment, architektura cen, promocje, ekspozycja, dostawy"] },
        { cells: ["7. Wdrożenie", "Kto, co i kiedy?", "Zakup, alokacja do sklepów, harmonogram wprowadzenia"] },
        { cells: ["8. Przegląd", "Co zadziałało, a co nie?", "Cotygodniowy raport w sezonie i podsumowanie po sezonie"] },
      ],
    },
    {
      type: "p",
      text: "W praktyce marki modowe rzadko przechodzą przez wszystkie osiem kroków formalnie. Z mojego doświadczenia proces sprowadza się do cyklu sezonowego, który powtarza się dwa razy w roku albo częściej, jeśli marka ma kilka dropów kolekcji:",
    },
    {
      type: "list",
      items: [
        "Analiza poprzedniego sezonu: które modele, ceny i rozmiary sprzedały się dobrze, a gdzie zostały nadwyżki. Decyzja: co powtórzyć, co zmienić, co wycofać.",
        "Plan kategorii: budżet sprzedaży i zakupu, liczba modeli, poziomy cenowe, docelowa marża. Decyzja: podział budżetu między podkategorie.",
        "Zakup: wybór modeli, kolorów i ilości, krzywe rozmiarów, terminy dostaw. Decyzja: zamówienie u dostawców lub w produkcji.",
        "Śledzenie sprzedaży w sezonie: sell-through, pokrycie zapasu, uzupełnienia i przesunięcia. Decyzja: dokupić, przesunąć albo obniżyć.",
        "Wnioski: podsumowanie wyniku kategorii na tle planu. Decyzja: zmiany w planie następnego sezonu.",
      ],
    },
    {
      type: "p",
      text: "Każdy etap powinien kończyć się konkretną decyzją. Jeśli analiza sezonu kończy się tylko prezentacją, a plan jest kopią poprzedniego z doliczonym wzrostem, category management istnieje tylko z nazwy.",
    },
    {
      type: "p",
      text: "Karta wyników kategorii (scorecard) jest najważniejszym narzędziem w etapach czwartym i ósmym. Wystarczy kilka wskaźników z planem i realizacją, liczonych tak samo co tydzień:",
    },
    {
      type: "table",
      caption: "Przykładowa karta wyników kategorii kurtek w połowie sezonu – dane ilustracyjne",
      columns: [
        { label: "Wskaźnik", kind: "text" },
        { label: "Plan", kind: "text" },
        { label: "Realizacja", kind: "text" },
        { label: "Ocena", kind: "text" },
      ],
      rows: [
        { cells: ["Sprzedaż netto narastająco", "620 000 zł", "585 000 zł", "−5,6% do planu"], trend: "down" },
        { cells: ["Marża procentowa", "58%", "60%", "+2 p.p."], trend: "up" },
        { cells: ["Sell-through narastająco", "45%", "39%", "wolniej niż plan"], trend: "down" },
        { cells: ["Pokrycie zapasu", "8 tygodni", "11 tygodni", "zapas za wysoki"], trend: "down" },
      ],
      trendColumn: 3,
    },
    {
      type: "p",
      text: "Taka karta od razu podpowiada decyzję: marża jest powyżej planu, ale sprzedaż i sell-through poniżej, a zapasu starczy na dłużej niż do końca sezonu. To sygnał, żeby wcześniej zaplanować promocję lub przesunąć towar między sklepami, póki pełna cena jeszcze działa.",
    },
    { type: "h2", id: "category-manager", text: "Czym zajmuje się category manager w handlu modowym" },
    {
      type: "p",
      text: "Category manager odpowiada za wynik swojej kategorii: sprzedaż, marżę i zapas. W handlu spożywczym to często osobne stanowisko, które negocjuje z dostawcami i układa planogramy. W modzie zakres obowiązków zwykle dzieli się między kupca, merchandisera i analityka, a tytuł „category manager” pojawia się rzadziej. Typowe zadania to:",
    },
    {
      type: "list",
      items: [
        "Ustalanie roli, celów i budżetu kategorii na sezon.",
        "Decyzje o asortymencie: liczba modeli, głębokość zakupu, podział na poziomy cenowe.",
        "Polityka cen i promocji w kategorii, w tym plan obniżek na koniec sezonu.",
        "Współpraca z dostawcami lub zespołem produktu i projektantami.",
        "Cotygodniowa analiza sprzedaży i zapasu oraz decyzje w trakcie sezonu.",
      ],
    },
    {
      type: "p",
      text: "Wynagrodzenie na tym stanowisku zależy od miasta, wielkości firmy i poziomu doświadczenia, więc nie da się go podać jedną liczbą. Więcej o rolach w dziale handlowym, w tym o różnicy między kupcem, merchandiserem i category managerem, piszę w artykule o tym, jak zostać analitykiem w handlu i modzie.",
    },
    { type: "h2", id: "category-management-a-planowanie-asortymentu", text: "Category management a planowanie asortymentu" },
    {
      type: "p",
      text: "Oba pojęcia często używa się zamiennie, ale ich zakres jest różny. Planowanie asortymentu odpowiada na pytanie, jakie modele, kolory, rozmiary i ilości kupić na sezon. Category management obejmuje także ceny, promocje, ekspozycję i cele finansowe kategorii. Planowanie asortymentu jest więc jednym z narzędzi zarządzania kategorią, wykorzystywanym głównie w etapie taktyk i wdrożenia.",
    },
    {
      type: "table",
      caption: "Planowanie asortymentu a category management – porównanie zakresu",
      columns: [
        { label: "Obszar", kind: "text" },
        { label: "Planowanie asortymentu", kind: "text" },
        { label: "Category management", kind: "text" },
      ],
      rows: [
        { cells: ["Główne pytanie", "Co i ile kupić?", "Jak kategoria ma zarabiać i jaką rolę pełni?"] },
        { cells: ["Horyzont", "Jeden sezon zakupowy", "Sezon oraz strategia na kilka sezonów"] },
        { cells: ["Decyzje", "Modele, kolory, rozmiary, ilości, dostawy", "Rola, cele, asortyment, ceny, promocje, ekspozycja"] },
        { cells: ["Wskaźniki", "Sell-through, pokrycie zapasu, braki rozmiarów", "Sprzedaż, marża, udział w obrocie, rotacja zapasów"] },
      ],
    },
    {
      type: "p",
      text: "W praktyce najlepiej działa połączenie obu podejść w jednym modelu danych: plan kategorii wyznacza budżet i cele, plan asortymentu rozpisuje je na modele, a karta wyników co tydzień porównuje realizację z planem. Narzędzia, które pomagają na każdym etapie, opisuję w osobnych artykułach: analiza ABC XYZ przy ocenie kategorii, wskaźnik rotacji zapasów i sell-through przy karcie wyników, a krzywa rozmiarów przy zakupie.",
    },
    {
      type: "p",
      text: "Jeśli chcesz uporządkować zarządzanie kategoriami w swojej marce, od drzewa kategorii po kartę wyników w Excelu lub Power BI, umów konsultację – odpowiadam w ciągu jednego dnia roboczego.",
    },
  ],
  faqTitle: "Category management — najczęstsze pytania",
  faq: [
    {
      question: "Co to jest category management?",
      answer: "Category management to podejście, w którym sklep lub marka zarządza każdą kategorią produktów jak odrębnym biznesem. Kategoria ma określoną rolę, cele sprzedaży i marży oraz własną strategię asortymentu, cen i promocji. Wyniki ocenia się na poziomie kategorii, a nie pojedynczych produktów.",
    },
    {
      question: "Jakie są etapy category management?",
      answer: "Klasyczny model ECR ma osiem etapów: definicję kategorii, określenie jej roli, ocenę, kartę wyników, strategie, taktyki, wdrożenie i przegląd. W praktyce marki modowe upraszczają go do cyklu sezonowego: analiza poprzedniego sezonu, plan kategorii, zakup, śledzenie sprzedaży i wnioski. Ważne, by każdy etap kończył się konkretną decyzją.",
    },
    {
      question: "Czym zajmuje się category manager?",
      answer: "Category manager odpowiada za wynik swojej kategorii: sprzedaż, marżę i zapas. Decyduje o asortymencie, cenach i promocjach, współpracuje z dostawcami lub zespołem produktu i analizuje dane sprzedażowe. W modzie jego rola często łączy się z rolą kupca lub merchandisera.",
    },
    {
      question: "Czym category management różni się od planowania asortymentu?",
      answer: "Planowanie asortymentu odpowiada na pytanie, jakie modele, kolory, rozmiary i ilości kupić na sezon. Category management jest szersze: obejmuje też ceny, promocje, ekspozycję i cele finansowe kategorii. Planowanie asortymentu jest więc jednym z narzędzi category managementu.",
    },
  ],
  seo: {
    title: "Category management w handlu modowym: zasady i etapy",
    description: "Co to jest category management, jakie są jego etapy i czym różni się od planowania asortymentu w marce modowej i sieci sklepów odzieżowych.",
  },
};
