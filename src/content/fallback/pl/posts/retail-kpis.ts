import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("retail-kpis", "pl"),
  title: "KPI w handlu detalicznym: najważniejsze wskaźniki sprzedaży",
  h1: { before: "KPI w handlu detalicznym:", accent: "najważniejsze wskaźniki sprzedaży" },
  excerpt: "Najważniejsze wskaźniki sprzedaży w sklepie i marce modowej oraz sposób liczenia KPI w Excelu i Power BI.",
  lead: "Najważniejsze wskaźniki sprzedaży w handlu detalicznym to sprzedaż rok do roku, marża, sell-through, rotacja zapasu, tygodnie zapasu i GMROI. Razem pokazują, czy sklep lub marka sprzedaje wystarczająco dużo, z odpowiednim zyskiem i bez zamrażania gotówki w towarze.",
  date: "2026-06-23",
  readingMinutes: 5,
  body: [
    { type: "h2", id: "czym-sa-kpi-w-handlu", text: "Czym są KPI i wskaźniki sprzedaży w handlu" },
    {
      type: "p",
      text: "KPI (Key Performance Indicators) to kluczowe wskaźniki efektywności, czyli kilka liczb, na podstawie których zespół ocenia, czy realizuje swoje cele. Wskaźników sprzedaży można policzyć dziesiątki, ale KPI są tylko te, które prowadzą do decyzji: dokupić, przesunąć towar, obniżyć cenę, zmienić ekspozycję. Wiele poradników o KPI w sprzedaży opisuje lejek handlowców B2B. W handlu detalicznym i w modzie liczą się inne miary, bo sprzedaje się towar z zapasu, a nie oferty.",
    },
    {
      type: "p",
      text: "W handlu warto rozdzielić dwie grupy wskaźników. Pierwsza opisuje ruch i klientów w sklepie: ile osób weszło, ile kupiło i za ile. Druga opisuje towar: z jaką marżą się sprzedaje, jak szybko schodzi z półki i ile kapitału w nim zamrożono. Sklep potrzebuje obu, marka modowa kładzie nacisk na drugą.",
    },
    { type: "h2", id: "wskazniki-sprzedazy-w-sklepie", text: "Najważniejsze wskaźniki sprzedaży w sklepie" },
    {
      type: "p",
      text: "W sklepie stacjonarnym, także odzieżowym, podstawowy zestaw KPI mieści się w jednej tabeli. Każdy wskaźnik porównuje się z tym samym tygodniem rok wcześniej i z planem, a nie z innym sklepem o innej lokalizacji i powierzchni.",
    },
    {
      type: "table",
      caption: "Podstawowe wskaźniki sprzedaży w sklepie – wzory i przykład tygodnia (dane ilustracyjne)",
      columns: [
        { label: "Wskaźnik", kind: "text" },
        { label: "Wzór", kind: "text" },
        { label: "Przykład", kind: "text" },
      ],
      rows: [
        { cells: ["Sprzedaż netto rok do roku", "sprzedaż tego roku ÷ sprzedaż rok temu − 1", "84 000 zł wobec 78 000 zł = +7,7%"] },
        { cells: ["Średnia wartość paragonu", "sprzedaż netto ÷ liczba paragonów", "84 000 ÷ 600 = 140 zł"] },
        { cells: ["UPT (sztuki na paragon)", "sprzedane sztuki ÷ liczba paragonów", "1050 ÷ 600 = 1,75"] },
        { cells: ["Konwersja", "liczba paragonów ÷ liczba wejść × 100%", "600 ÷ 4000 = 15%"] },
        { cells: ["Sprzedaż na m²", "sprzedaż netto ÷ powierzchnia sprzedaży", "84 000 ÷ 350 m² = 240 zł"] },
        { cells: ["Marża %", "(sprzedaż netto − koszt sprzedanych towarów) ÷ sprzedaż netto", "zależy od kategorii i obniżek"] },
      ],
    },
    {
      type: "p",
      text: "Wskaźniki te rozkładają obrót na czynniki. Sprzedaż to liczba wejść × konwersja × średnia wartość paragonu. Jeśli obrót spadł, a wejść było tyle samo, problem leży w sklepie: w obsłudze, dostępności rozmiarów albo w ekspozycji. Jeśli spadła liczba wejść, przyczyna jest zwykle na zewnątrz, na przykład w ruchu w galerii handlowej. UPT, czyli liczba sztuk na paragonie, pokazuje, jak skutecznie sklep sprzedaje zestawy i produkty uzupełniające.",
    },
    {
      type: "p",
      text: "Przy porównaniu rok do roku zasada praktyczna brzmi: licz sprzedaż na porównywalnej bazie (LFL, like-for-like), czyli tylko w sklepach, które działały w obu okresach tyle samo dni. Otwarcie nowego sklepu podnosi łączną sprzedaż, ale nic nie mówi o tym, czy istniejące sklepy sprzedają lepiej.",
    },
    { type: "h2", id: "kpi-sprzedazy-marki-modowej", text: "KPI sprzedaży dla marki modowej" },
    {
      type: "p",
      text: "Marka modowa kupuje towar na sezon z wyprzedzeniem i musi go sprzedać, zanim straci wartość. Dlatego oprócz sprzedaży i marży śledzi przede wszystkim wskaźniki towarowe. Liczy się je na poziomie kategorii, modelu i koloru, bo decyzje o dokupieniu, przesunięciu towaru czy obniżce zapadają właśnie tam. Przegląd odbywa się zwykle co tydzień.",
    },
    {
      type: "list",
      items: [
        "Sell-through: procent dostępnego towaru, który sprzedano, liczony od początku sezonu. Pokazuje, które modele trzeba dokupić, a które obniżyć.",
        "Udział sprzedaży w pełnej cenie: jaka część sprzedaży sezonu powstała bez obniżki. Spadek tego udziału oznacza, że sezon „kupuje się” rabatami.",
        "Głębokość obniżek: średni procent obniżki na sprzedanych sztukach i wartość obniżek w stosunku do sprzedaży.",
        "Marża zrealizowana: marża po obniżkach i zwrotach, porównywana z marżą początkową z planu.",
        "Tygodnie zapasu (pokrycie): zapas ÷ średnia sprzedaż tygodniowa. Wynik porównuje się z liczbą tygodni do końca sezonu.",
        "Rotacja zapasu: ile razy w okresie obraca się przeciętny zapas. Służy do porównywania kategorii i sezonów.",
        "GMROI: ile złotych marży brutto przynosi każda złotówka zapasu w cenach zakupu.",
      ],
    },
    {
      type: "p",
      text: "Sell-through, rotację zapasów i różnice w definicjach sell-through między działami opisuję w osobnych artykułach na tym blogu. Tutaj skupię się na wskaźniku, który łączy marżę i zapas w jedną liczbę.",
    },
    { type: "h2", id: "jak-obliczyc-gmroi", text: "Jak obliczyć GMROI – zwrot z zapasu w marży brutto" },
    { type: "formula", text: "GMROI = marża brutto w okresie ÷ przeciętny zapas w cenach zakupu" },
    {
      type: "p",
      text: "Przykład: kategoria swetrów wypracowała w sezonie jesień–zima 180 000 zł marży brutto, a przeciętny zapas w cenach zakupu wynosił 120 000 zł. GMROI to 180 000 ÷ 120 000 = 1,5. Każda złotówka zamrożona w swetrach przyniosła 1,50 zł marży. Marżę i zapas trzeba liczyć za ten sam okres, a zapas zawsze w cenach zakupu, nie detalicznych.",
    },
    {
      type: "calculator",
      kind: "gmroi",
      title: "Kalkulator GMROI",
      labels: {
        grossMargin: "Marża brutto w okresie (zł)",
        avgInventory: "Przeciętny zapas w cenach zakupu (zł)",
        gmroi: "GMROI (zł marży na 1 zł zapasu)",
      },
      note: "GMROI = marża brutto ÷ przeciętny zapas w cenach zakupu. Marżę i zapas wpisuje się za ten sam okres.",
    },
    {
      type: "p",
      text: "GMROI jest przydatny, bo łączy dwa wskaźniki, które często ciągną w przeciwne strony. Kategoria z wysoką marżą, ale wolnym obrotem, może mieć niższy GMROI niż kategoria z niższą marżą, która szybko się sprzedaje. Dlatego przy podziale budżetu zakupów między kategorie warto patrzeć na GMROI, a nie na samą marżę procentową.",
    },
    {
      type: "p",
      text: "Przykład ilustracyjny: płaszcze mają marżę 65%, ale zapas obraca się w nich wolno, więc GMROI wynosi 1,2. Koszulki bazowe mają marżę 55%, za to szybki obrót daje GMROI 3,0. Złotówka zainwestowana w koszulki przynosi w tym przykładzie ponad dwa razy więcej marży niż złotówka w płaszczach. Nie oznacza to, że płaszcze trzeba wycofać, tylko że ich zakup powinien być płytszy i lepiej rozłożony w czasie.",
    },
    { type: "h2", id: "dobre-kpi-w-handlu", text: "Jak wybrać dobre KPI w handlu detalicznym" },
    {
      type: "p",
      text: "Dobre KPI to nie te, których jest najwięcej, tylko te, na które ktoś reaguje. Przy budowie raportów dla zespołów handlowych stosuję kilka zasad:",
    },
    {
      type: "list",
      items: [
        "Najwyżej pięć–siedem KPI na jednym ekranie. Resztę wskaźników zostawiam na stronach szczegółowych.",
        "Każdy KPI ma spisaną definicję: wzór, jednostkę (sztuki czy wartość), źródło danych i sposób traktowania zwrotów.",
        "Każdy KPI ma punkt odniesienia: plan, ten sam okres rok wcześniej albo oba naraz.",
        "Każdy KPI ma właściciela, który wie, jaką decyzję podjąć, gdy wskaźnik się pogarsza.",
        "Wskaźniki sklepowe i towarowe czyta się razem: wysoka konwersja przy braku rozmiarów nie utrzyma sprzedaży.",
      ],
    },
    {
      type: "p",
      text: "Równie ważny jak wybór KPI jest rytm ich przeglądu. Różne wskaźniki zmieniają się w różnym tempie, więc nie ma sensu patrzeć na wszystkie codziennie:",
    },
    {
      type: "list",
      items: [
        "Codziennie: sprzedaż, liczba paragonów i konwersja w sklepach, żeby szybko zauważyć problem z obsadą, dostawą lub ruchem.",
        "Co tydzień: sell-through, tygodnie zapasu, udział sprzedaży w pełnej cenie i marża na poziomie modelu i kategorii. To podstawa decyzji o dokupieniu, przesunięciu i obniżkach.",
        "Co miesiąc i po sezonie: rotacja zapasu, GMROI i marża zrealizowana na poziomie kategorii, jako podstawa budżetu zakupów na kolejny sezon.",
      ],
    },
    { type: "h2", id: "kpi-w-excelu-i-power-bi", text: "Jak liczyć KPI w Excelu i Power BI" },
    {
      type: "p",
      text: "Jak się oblicza KPI w praktyce? Wszystkie wskaźniki z tego artykułu to proste ilorazy, więc najważniejsze jest przygotowanie danych: sprzedaż, paragony i sztuki z systemu kasowego, wejścia z liczników ruchu, zapas i koszt z ERP. W Excelu wystarczy tabela z jednym wierszem na sklep lub kategorię i tydzień. Formuły poniżej zabezpieczają dzielenie przez zero (polska wersja Excela):",
    },
    {
      type: "code",
      caption: "KPI sklepu w Excelu: sprzedaż netto w B, liczba paragonów w C, sztuki w D, wejścia w E, sprzedaż rok temu w F, marża brutto w G, przeciętny zapas w cenach zakupu w H.",
      code: `I2  średnia wartość paragonu:  =JEŻELI(C2=0;"";B2/C2)
J2  UPT:                       =JEŻELI(C2=0;"";D2/C2)
K2  konwersja:                 =JEŻELI(E2=0;"";C2/E2)
L2  sprzedaż rok do roku:      =JEŻELI(F2=0;"";B2/F2-1)
M2  GMROI:                     =JEŻELI(H2=0;"";G2/H2)`,
    },
    {
      type: "p",
      text: "W Power BI te same wskaźniki zapisuje się jako miary, a nie kolumny obliczeniowe. Dzięki temu średnia wartość paragonu dla regionu liczy się z sum, a nie jako średnia z wyników sklepów. To ta sama pułapka co przy marży: średnia z procentów waży mały sklep tak samo jak duży.",
    },
    {
      type: "code",
      caption: "Przykładowe miary DAX dla KPI w handlu (nazwy tabel i kolumn ilustracyjne)",
      code: `Sprzedaż netto = SUM ( Sprzedaz[WartoscNetto] )

Paragony = DISTINCTCOUNT ( Sprzedaz[NumerParagonu] )

Średnia wartość paragonu = DIVIDE ( [Sprzedaż netto], [Paragony] )

UPT = DIVIDE ( SUM ( Sprzedaz[Sztuki] ), [Paragony] )

Konwersja % = DIVIDE ( [Paragony], SUM ( Ruch[Wejscia] ) )

Sprzedaż rok temu =
CALCULATE ( [Sprzedaż netto], SAMEPERIODLASTYEAR ( Kalendarz[Data] ) )

Zmiana rdr % =
DIVIDE ( [Sprzedaż netto] - [Sprzedaż rok temu], [Sprzedaż rok temu] )

Marża brutto = [Sprzedaż netto] - SUM ( Sprzedaz[KosztZakupu] )

Przeciętny zapas =
AVERAGEX (
    VALUES ( Kalendarz[KoniecTygodnia] ),
    CALCULATE ( SUM ( Zapas[WartoscZakupu] ) )
)

GMROI = DIVIDE ( [Marża brutto], [Przeciętny zapas] )`,
    },
    {
      type: "p",
      text: "Miara przeciętnego zapasu liczy średnią ze stanów tygodniowych w wybranym okresie, dlatego tabela zapasu powinna zawierać stan na koniec każdego tygodnia. Tak przygotowany model obsłuży jednocześnie raport sklepowy i raport towarowy dla zespołu produktu.",
    },
    {
      type: "p",
      text: "Jeśli chcesz ustalić zestaw KPI dla swojego sklepu lub marki i zbudować na nim tygodniowy raport w Power BI, umów konsultację – odpowiadam w ciągu jednego dnia roboczego.",
    },
  ],
  faqTitle: "KPI i wskaźniki sprzedaży w handlu — najczęstsze pytania",
  faq: [
    {
      question: "Jakie są najważniejsze wskaźniki sprzedaży w sklepie?",
      answer: "W sklepie stacjonarnym podstawą są obrót, liczba paragonów, średnia wartość paragonu, konwersja (odsetek wchodzących, którzy kupili) i sprzedaż na metr kwadratowy. Do tego dochodzą wskaźniki towarowe: marża, sell-through i rotacja zapasu. Porównuje się je rok do roku i z planem.",
    },
    {
      question: "Jakie KPI śledzi marka modowa?",
      answer: "Marka modowa oprócz sprzedaży i marży śledzi przede wszystkim sell-through, udział sprzedaży w pełnej cenie, głębokość obniżek, tygodnie zapasu i GMROI. Wskaźniki te liczy się na poziomie kategorii, modelu i koloru, bo decyzje o dokupieniu lub obniżce zapadają na tym poziomie. Przegląd odbywa się zwykle co tydzień.",
    },
    {
      question: "Jak obliczyć GMROI?",
      answer: "GMROI (zwrot z zapasu w marży brutto) oblicza się, dzieląc marżę brutto z okresu przez średnią wartość zapasu w cenach zakupu. Wynik 1,5 oznacza, że każda złotówka zamrożona w towarze przyniosła 1,50 zł marży. W Excelu wystarczy formuła =marża/średni_zapas, a w Power BI prosta miara DIVIDE.",
    },
  ],
  seo: {
    title: "Wskaźniki sprzedaży i KPI w handlu detalicznym",
    description: "Najważniejsze wskaźniki sprzedaży w sklepie i marce modowej: sell-through, rotacja zapasu, GMROI, tygodnie zapasu i marża, ze wzorami do Excela i Power BI.",
  },
};
