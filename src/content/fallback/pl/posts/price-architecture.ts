import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("price-architecture", "pl"),
  title: "Jak zbudować i czytać architekturę cenową przed sezonem",
  h1: { before: "Jak zbudować i czytać", accent: "architekturę cenową przed sezonem" },
  excerpt: "Jak zbudować architekturę cenową w handlu: progi wejścia, środka i najwyższej półki oraz ile kosztuje luka między poziomami cen.",
  lead: "Architektura cenowa to układ progów cenowych w kategorii: od ceny wejścia, przez środek, po najwyższą półkę, wraz z liczbą modeli na każdym progu. Sprawdza się ją przed sezonem, aby klient na każdym poziomie cen miał wybór, a między progami nie było luk, przez które traci się sprzedaż.",
  date: "2026-04-14",
  readingMinutes: 6,
  body: [
    { type: "h2", id: "czym-jest-architektura-cenowa", text: "Czym jest architektura cenowa w handlu" },
    {
      type: "p",
      text: "Architektura cenowa (price architecture) to struktura cen w kategorii lub w całej kolekcji. Opisuje trzy rzeczy: jakie progi cenowe istnieją, jak duże są odstępy między nimi i ile modeli przypada na każdy próg. Nie chodzi o cenę pojedynczego produktu, tylko o to, jak ceny układają się względem siebie.",
    },
    {
      type: "p",
      text: "Klient w sklepie nie porównuje sukienki z abstrakcyjną wartością, tylko z sukienkami wiszącymi obok. Dobrze zbudowana architektura cenowa pozwala mu szybko znaleźć swój poziom cen i zrozumieć, za co dopłaca na wyższym progu. Dla marki to narzędzie do pilnowania marży i do planowania zakupów: zanim zapadną decyzje o ilościach, wiadomo, ile modeli i ile sztuk potrzeba na każdym poziomie.",
    },
    {
      type: "p",
      text: "Architektura cenowa różni się od strategii cenowej. Strategia odpowiada na pytanie, jak marka chce konkurować ceną (na przykład niska cena na co dzień albo pozycja premium), a architektura przekłada tę decyzję na konkretne progi w każdej kategorii. Strategie cenowe i metody ustalania cen omawiam szerzej w osobnym artykule na tym blogu.",
    },
    { type: "h2", id: "progi-cenowe", text: "Progi cenowe: wejście, środek i najwyższa półka" },
    {
      type: "p",
      text: "Najczęściej kategoria ma trzy progi cenowe, znane też jako model dobry–lepszy–najlepszy (good–better–best). Szerokie kategorie, na przykład kurtki czy sukienki, mogą mieć cztery lub pięć progów, a kategorie wąskie, jak paski czy skarpetki, czasem dwa.",
    },
    {
      type: "list",
      items: [
        "Próg wejścia: cena, od której klient może kupić produkt z kategorii. Przyciąga ruch i buduje wrażenie dostępności marki. Modele są prostsze, a marża bywa niższa.",
        "Środek: próg, na którym zwykle powstaje największa część sprzedaży. Tu jest najwięcej modeli i największa głębokość zakupu.",
        "Najwyższa półka: produkty z lepszym materiałem, bardziej złożoną konstrukcją lub detalem. Sprzedają się w mniejszych ilościach, ale podnoszą postrzeganą wartość całej kategorii.",
      ],
    },
    {
      type: "p",
      text: "Każdy próg musi różnić się od sąsiedniego i ceną, i produktem. Jeśli sukienka za 249 zł wygląda prawie tak samo jak ta za 199 zł, klient wybierze tańszą. Jako regułę praktyczną przyjmuję, że kolejny próg powinien być wyraźnie wyższy, zwykle o jedną trzecią do połowy, i nieść różnicę widoczną na wieszaku: materiał, podszewkę, wykończenie.",
    },
    {
      type: "table",
      caption: "Architektura cenowa kategorii sukienek – modele, sprzedaż i zapas według progów (dane ilustracyjne, ceny brutto)",
      columns: [
        { label: "Próg", kind: "text" },
        { label: "Przedział cen", kind: "text" },
        { label: "Liczba modeli", kind: "number" },
        { label: "Udział w sprzedaży", kind: "number", suffix: "%", format: "bars" },
        { label: "Udział w zapasie", kind: "number", suffix: "%", format: "bars" },
      ],
      rows: [
        { cells: ["Wejście", "129–149 zł", 8, 30, 25] },
        { cells: ["Środek", "199–249 zł", 12, 45, 45] },
        { cells: ["Najwyższa półka", "349–449 zł", 5, 25, 30] },
      ],
    },
    {
      type: "p",
      text: "Tak czyta się architekturę cenową: udział progu w zapasie porównuje się z jego udziałem w sprzedaży. W przykładzie najwyższa półka ma 30% zapasu, a daje 25% sprzedaży, więc jest przekupiona względem popytu. Próg wejścia sprzedaje więcej, niż wynosi jego udział w zapasie, co przy końcu sezonu może oznaczać braki najtańszych modeli.",
    },
    { type: "h2", id: "jak-zbudowac-architekture-cenowa", text: "Jak zbudować architekturę cenową przed sezonem" },
    {
      type: "p",
      text: "Architekturę cenową planuje się razem z asortymentem, zanim zapadną decyzje zakupowe. Po zamówieniu produkcji zmiana progu oznacza zwykle zmianę marży, a nie zmianę produktu. Pracuję według kilku kroków:",
    },
    {
      type: "list",
      items: [
        "Analiza poprzedniego sezonu: sprzedaż, marża zrealizowana i sell-through według progów cenowych, a nie tylko według modeli.",
        "Ustalenie progów: ceny wejścia, środka i najwyższej półki dla każdej kategorii, z uwzględnieniem cen konkurentów, do których klient porównuje markę.",
        "Podział modeli i głębokości zakupu na progi, tak by udział w zapasie odpowiadał oczekiwanemu udziałowi w sprzedaży.",
        "Kontrola marży: cena każdego modelu musi pokryć koszt zakupu z docelową marżą, liczoną od ceny netto.",
        "Przegląd luk: sprawdzenie, czy między progami nie zostały puste przedziały cen, w których w poprzednim sezonie była sprzedaż.",
      ],
    },
    {
      type: "p",
      text: "Cenę pojedynczego produktu ustala się zwykle jedną z trzech metod: od kosztu (koszt zakupu plus narzut), od konkurencji albo od wartości postrzeganej przez klienta. W architekturze cenowej łączy się je wszystkie: koszt wyznacza dolną granicę, konkurencja i próg określają, gdzie model trafi.",
    },
    {
      type: "p",
      text: "Liczbę modeli na progach najłatwiej sprawdzić w Excelu na liście planowanej kolekcji. Formuła poniżej liczy modele w przedziale cen z tabeli progów (polska wersja Excela):",
    },
    {
      type: "code",
      caption: "Liczba modeli i udział w planowanym zapasie według progu: kategoria w kolumnie B, cena w kolumnie D, planowane sztuki w kolumnie E listy Kolekcja; w tabeli progów kategoria w A, dolna granica w B, górna w C.",
      code: `D2  liczba modeli:     =LICZ.WARUNKI(Kolekcja!B:B;A2;Kolekcja!D:D;">="&B2;Kolekcja!D:D;"<="&C2)
E2  planowane sztuki:  =SUMA.WARUNKÓW(Kolekcja!E:E;Kolekcja!B:B;A2;Kolekcja!D:D;">="&B2;Kolekcja!D:D;"<="&C2)
F2  udział w zapasie:  =E2/SUMA.JEŻELI($A$2:$A$20;A2;$E$2:$E$20)`,
    },
    { type: "h2", id: "luka-w-architekturze-cenowej", text: "Ile kosztuje luka w architekturze cenowej" },
    {
      type: "p",
      text: "Luka w architekturze cenowej to przedział cen, w którym klient szuka produktu, a marka go nie ma. Najczęściej powstaje wtedy, gdy koszty zakupu rosną i modele ze środka przesuwają się w górę, a nikt nie sprawdza, co zostało pomiędzy progami.",
    },
    {
      type: "p",
      text: "Przykład: w poprzednim sezonie sukienki za 299 zł sprzedały 900 sztuk, czyli 269 100 zł brutto. W nowej kolekcji środek kończy się na 249 zł, a najwyższa półka zaczyna od 399 zł. Klienci szukający sukienki za około 300 zł muszą zdecydować: zejść niżej, dopłacić albo kupić gdzie indziej. Załóżmy, że połowa wybierze model za 249 zł, co dziesiąta dopłaci do 399 zł, a pozostali odejdą. Sprzedaż wyniesie 450 × 249 + 90 × 399 = 147 960 zł. Luka kosztuje więc około 121 000 zł przychodu w jednej kategorii.",
    },
    {
      type: "p",
      text: "Proporcje w tym przykładzie to założenie, nie norma. Każda marka powinna je oszacować na własnych danych, na przykład porównując sprzedaż sezonu, w którym próg istniał, z sezonem, w którym go zabrakło. Sama metoda jest jednak zawsze ta sama: sprzedaż utracona w luce minus sprzedaż, która przeszła na sąsiednie progi.",
    },
    { type: "h2", id: "rodzaje-cen", text: "Rodzaje cen w handlu detalicznym a architektura cenowa" },
    {
      type: "p",
      text: "Architekturę cenową buduje się na cenach regularnych, czyli pełnych. W handlu detalicznym rozróżnia się jednak więcej rodzajów cen i każdy z nich trzeba czytać osobno:",
    },
    {
      type: "list",
      items: [
        "Cena regularna (pełna): cena z metki na początku sezonu. Na niej opiera się architektura cenowa i marża początkowa.",
        "Cena promocyjna: czasowa obniżka na wybrane produkty, po której produkt wraca do ceny regularnej.",
        "Cena obniżona w ramach wyprzedaży: trwała obniżka na koniec sezonu, zwykle w kilku krokach.",
        "Cena sugerowana przez producenta: cena detaliczna, którą marka rekomenduje partnerom handlowym, gdy sprzedaje im towar hurtowo.",
        "Cena netto i brutto: marżę liczy się od ceny netto, a klientowi w sklepie pokazuje się cenę brutto z VAT.",
      ],
    },
    {
      type: "p",
      text: "Przy obniżkach w UE trzeba też pokazać najniższą cenę z 30 dni przed obniżką. Dla architektury cenowej ma to praktyczne skutki: częste krótkie promocje obniżają punkt odniesienia i utrudniają późniejszą wyprzedaż, a progi w sklepie przestają być czytelne.",
    },
    { type: "h2", id: "architektura-cenowa-rynki-waluty", text: "Architektura cenowa na kilku rynkach i w kilku walutach" },
    {
      type: "p",
      text: "Marka, która sprzedaje w kilku krajach, nie może po prostu przeliczyć cen po kursie. Wynik daje ceny w rodzaju 51,73 EUR, które nie pasują do lokalnych przyzwyczajeń, a różne stawki VAT sprawiają, że ta sama cena brutto oznacza różną cenę netto. Dlatego architekturę cenową ustala się dla każdego rynku osobno, pilnując trzech zasad.",
    },
    {
      type: "list",
      items: [
        "Te same progi i ta sama kolejność: model z najwyższej półki w Polsce jest na najwyższej półce na każdym rynku.",
        "Podobne odstępy między progami, żeby różnica między wejściem a środkiem była dla klienta tak samo czytelna.",
        "Lokalne końcówki cen (na przykład 149 zł, 34,99 EUR, 899 Kč) i kontrola marży po przeliczeniu na jedną walutę, bez lokalnego VAT.",
      ],
    },
    {
      type: "table",
      caption: "Progi cenowe sukienek na trzech rynkach – ceny brutto ustalone lokalnie, nie przeliczone po kursie (dane ilustracyjne)",
      columns: [
        { label: "Próg", kind: "text" },
        { label: "Polska", kind: "text" },
        { label: "Strefa euro", kind: "text" },
        { label: "Czechy", kind: "text" },
      ],
      rows: [
        { cells: ["Wejście", "149 zł", "34,99 EUR", "899 Kč"] },
        { cells: ["Środek", "229 zł", "54,99 EUR", "1399 Kč"] },
        { cells: ["Najwyższa półka", "399 zł", "94,99 EUR", "2399 Kč"] },
      ],
    },
    {
      type: "p",
      text: "Taką tabelę warto przeglądać przed każdym sezonem i po większych zmianach kursów. Gdy marża na jednym rynku spada poniżej celu, zmienia się cały próg, a nie pojedynczy model, bo inaczej architektura się rozjeżdża.",
    },
    {
      type: "p",
      text: "Jeśli chcesz sprawdzić architekturę cenową swojej kolekcji przed sezonem, umów konsultację dotyczącą analizy cen – odpowiadam w ciągu jednego dnia roboczego.",
    },
  ],
  faqTitle: "Architektura cenowa — najczęstsze pytania",
  faq: [
    {
      question: "Czym jest architektura cenowa?",
      answer: "Architektura cenowa to struktura cen w kategorii lub całej kolekcji: jakie progi cenowe istnieją, jak duże są odstępy między nimi i ile modeli przypada na każdy próg. Pomaga klientowi zrozumieć różnicę między produktami, a marce pilnować marży. W modzie planuje się ją razem z asortymentem, zanim zapadną decyzje zakupowe.",
    },
    {
      question: "Ile progów cenowych powinna mieć kategoria?",
      answer: "Najczęściej stosuje się trzy progi: wejście, środek i najwyższą półkę, znane też jako model dobry–lepszy–najlepszy. Szerokie kategorie, na przykład kurtki czy sukienki, mogą mieć cztery lub pięć progów. Każdy próg powinien mieć wyraźną różnicę w cenie i w produkcie, inaczej klient nie widzi powodu, by dopłacić.",
    },
    {
      question: "Jakie są rodzaje cen?",
      answer: "W handlu detalicznym rozróżnia się między innymi cenę regularną (pełną), cenę promocyjną, cenę obniżoną w ramach wyprzedaży i cenę sugerowaną przez producenta. Każdą z nich można podać netto lub brutto, a w sklepie dla konsumenta obowiązuje cena brutto. Przy obniżkach w UE trzeba też pokazać najniższą cenę z 30 dni przed obniżką.",
    },
  ],
  seo: {
    title: "Architektura cenowa w handlu: jak czytać progi cenowe",
    description: "Jak zbudować architekturę cenową w handlu: progi wejścia, środka i najwyższej półki oraz ile kosztuje luka między poziomami cen.",
  },
};
