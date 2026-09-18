import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("sales-forecasting", "pl"),
  title: "Prognozowanie sprzedaży i popytu w handlu: metody i przykład w Excelu",
  h1: { before: "Prognozowanie sprzedaży i popytu w handlu:", accent: "metody i przykład w Excelu" },
  excerpt: "Metody prognozowania sprzedaży i popytu w handlu, specyfika mody sezonowej i prognoza sprzedaży w Excelu krok po kroku.",
  lead: "Prognozowanie sprzedaży to szacowanie przyszłej sprzedaży na podstawie danych historycznych, sezonowości i planowanych działań, takich jak promocje czy nowe kolekcje. W handlu modowym prognozuje się głównie na poziomie kategorii i tygodni, bo dla nowych modeli nie ma historii sprzedaży.",
  date: "2026-06-02",
  readingMinutes: 5,
  body: [
    { type: "h2", id: "na-czym-polega-prognozowanie", text: "Na czym polega prognozowanie sprzedaży w handlu" },
    {
      type: "p",
      text: "Prognoza sprzedaży to liczba – w sztukach albo w złotych – którą firma przyjmuje jako najbardziej prawdopodobny wynik w przyszłym okresie. W handlu z tej liczby wynikają niemal wszystkie pozostałe plany: budżet zakupów, dostawy do sklepów, zatrudnienie w szczycie sezonu i plan promocji. Dlatego prognoza nie jest celem sprzedażowym. Cel mówi, ile chcemy sprzedać, prognoza – ile realnie sprzedamy przy obecnych założeniach.",
    },
    {
      type: "p",
      text: "W podręcznikach prognozowania wymienia się trzy funkcje prognoz: przygotowanie decyzji (funkcja preparacyjna), pobudzanie do działań, które wzmocnią lub osłabią przewidywany wynik (funkcja aktywizująca), oraz ostrzeganie przed zmianami (funkcja informacyjna). W handlu wszystkie trzy widać co tydzień: prognoza poniżej planu uruchamia promocję, a prognoza powyżej zapasu – uzupełnienie.",
    },
    { type: "h2", id: "metody-prognozowania-sprzedazy", text: "Metody prognozowania sprzedaży" },
    {
      type: "p",
      text: "Metody prognozowania dzielą się na ilościowe, oparte na historii sprzedaży, i jakościowe, oparte na ocenie ekspertów. W handlu najczęściej łączy się je: model liczy bazę, a zespół handlowy koryguje ją o to, czego w danych jeszcze nie ma, na przykład nową kolekcję czy zmianę cen.",
    },
    {
      type: "table",
      caption: "Najczęściej stosowane metody prognozowania sprzedaży w handlu",
      columns: [
        { label: "Metoda", kind: "text" },
        { label: "Kiedy się sprawdza", kind: "text" },
        { label: "Ograniczenie", kind: "text" },
      ],
      rows: [
        { cells: ["Naiwna (jak rok temu)", "Stabilny asortyment, szybki punkt odniesienia", "Powtarza jednorazowe zdarzenia z zeszłego roku"] },
        { cells: ["Średnia ruchoma", "Towar stały bez wyraźnego trendu", "Spóźnia się przy zmianach, nie widzi sezonowości"] },
        { cells: ["Wygładzanie wykładnicze", "Dane tygodniowe, szybka reakcja na zmiany", "Wymaga doboru parametru wygładzania"] },
        { cells: ["Regresja i trend liniowy", "Stały wzrost lub spadek bez sezonowości", "Mylące przy danych sezonowych"] },
        { cells: ["Model sezonowy (indeksy, ETS)", "Kategorie sezonowe z historią co najmniej dwóch lat", "Nie zadziała dla nowych produktów"] },
        { cells: ["Analogi i ocena ekspertów", "Nowe modele i kategorie bez historii", "Zależy od doświadczenia i dyscypliny zespołu"] },
      ],
    },
    {
      type: "p",
      text: "Wybór metody zależy od poziomu, na którym się prognozuje. Im wyższy poziom agregacji, tym trafniejsza prognoza: sprzedaż całej kategorii w tygodniu da się przewidzieć znacznie lepiej niż sprzedaż jednego rozmiaru jednego modelu w jednym sklepie. Dlatego w handlu stosuje się podejście z góry na dół: prognoza kategorii, a potem rozbicie na modele, sklepy i rozmiary według udziałów.",
    },
    { type: "h2", id: "prognozowanie-popytu-w-modzie", text: "Prognozowanie popytu w handlu modowym" },
    {
      type: "p",
      text: "Prognoza sprzedaży i prognoza popytu to nie to samo. Sprzedaż jest ograniczona zapasem: jeśli rozmiar M skończył się w trzecim tygodniu, sprzedaż w kolejnych tygodniach spada do zera, choć klienci nadal go szukają. Popyt to sprzedaż, która byłaby możliwa bez braków. Kto prognozuje wprost z historii sprzedaży, co sezon kupuje mniej tam, gdzie brakowało towaru, i zaniża plan w najlepszych modelach.",
    },
    {
      type: "p",
      text: "Przykład: model sprzedawał się przez pięć tygodni po 20 sztuk tygodniowo przy pełnej dostępności rozmiarów, a w dwóch kolejnych tygodniach po 8 sztuk, bo zabrakło M i L. Surowa średnia z siedmiu tygodni to (100 + 16) ÷ 7 ≈ 16,6 sztuki. Popyt lepiej szacować na podstawie tygodni z pełną dostępnością, czyli na około 20 sztuk tygodniowo. Różnica ponad 15% przeniesiona na plan zakupów oznacza kolejne braki w następnym sezonie.",
    },
    {
      type: "p",
      text: "Moda ma też kilka cech, które utrudniają stosowanie podręcznikowych metod:",
    },
    {
      type: "list",
      items: [
        "Nowe modele bez historii: większość kolekcji to nowe produkty, więc prognozę buduje się dla kategorii i poziomu cenowego, a model przypisuje się do analogu z poprzedniego sezonu, np. „sukienka midi w cenie 199–249 zł”.",
        "Krótki cykl życia: model sprzedaje się kilka–kilkanaście tygodni, więc prognozuje się krzywą sprzedaży w cyklu życia, a nie jedną średnią.",
        "Sezonowość i pogoda: przesunięcie zimna o dwa tygodnie zmienia rozkład sprzedaży okryć, choć suma w sezonie może być podobna.",
        "Promocje i obniżki: tygodnie wyprzedaży zawyżają sprzedaż w sztukach. Przy prognozie bazowej oznacza się je osobno i nie traktuje jako normy.",
        "Zmiany sieci: nowe i zamknięte sklepy zmieniają sumę sprzedaży, dlatego porównuje się sprzedaż na porównywalnej bazie sklepów (like-for-like).",
      ],
    },
    {
      type: "p",
      text: "W praktyce w modzie powstają więc dwie prognozy o różnym horyzoncie. Prognoza przedsezonowa, przygotowywana kilka miesięcy przed startem kolekcji, wyznacza budżet zakupów kategorii i opiera się na historii kategorii oraz analogach. Prognoza w sezonie jest aktualizowana co tydzień na podstawie pierwszych tygodni sprzedaży nowych modeli: jeśli model po trzech tygodniach sprzedaje się dwa razy szybciej niż jego analog, prognozę do końca sezonu podnosi się i sprawdza, czy da się dokupić towar. Ta druga prognoza decyduje o uzupełnieniach, przesunięciach między sklepami i momencie obniżek.",
    },
    { type: "h2", id: "prognoza-sprzedazy-w-excelu", text: "Prognoza sprzedaży w Excelu krok po kroku" },
    {
      type: "p",
      text: "Dla większości marek nie trzeba zaczynać od specjalnego oprogramowania. Dobrze przygotowany arkusz daje prognozę kategorii, którą da się wytłumaczyć zespołowi zakupów, a to na początku jest ważniejsze niż kilka punktów procentowych trafności.",
    },
    {
      type: "list",
      items: [
        "Krok 1. Dane: jedna kolumna z datą (tydzień lub miesiąc), druga ze sprzedażą w sztukach. Okresy muszą być równe i bez luk; co najmniej dwa pełne lata, jeśli sprzedaż jest sezonowa.",
        "Krok 2. Czyszczenie: oznaczenie tygodni z brakami towaru, jednorazowych promocji i zamknięć sklepów, a w razie potrzeby zastąpienie ich wartością szacowanego popytu.",
        "Krok 3. Prognoza: funkcja Arkusz prognozy na karcie Dane albo formuła PROGNOZA.ETS, która sama wykrywa sezonowość. Dla danych bez sezonowości wystarczy PROGNOZA.LINIOWA.",
        "Krok 4. Korekta: dodanie znanych zdarzeń, których nie ma w historii – nowe sklepy, zmiana cen, większa kampania.",
        "Krok 5. Test: prognoza dla okresu, który już się zakończył, i porównanie z rzeczywistą sprzedażą.",
      ],
    },
    {
      type: "code",
      caption: "Formuły prognozy w polskiej wersji Excela (w nawiasach nazwy angielskie). Daty w kolumnie A, sprzedaż miesięczna w kolumnie B, historia w wierszach 2–25, prognozowane miesiące od wiersza 26.",
      code: `C26  prognoza z sezonowością:  =PROGNOZA.ETS(A26;$B$2:$B$25;$A$2:$A$25;12)   (FORECAST.ETS)
D26  trend liniowy:            =PROGNOZA.LINIOWA(A26;$B$2:$B$25;$A$2:$A$25)  (FORECAST.LINEAR)
E26  średnia ruchoma 3 mies.:  =ŚREDNIA(B23:B25)                             (AVERAGE)`,
    },
    {
      type: "p",
      text: "PROGNOZA.ETS to wygładzanie wykładnicze z sezonowością. Ostatni argument, 12, mówi Excelowi, że cykl ma dwanaście miesięcy; przy danych tygodniowych wpisuje się 52. Arkusz prognozy korzysta z tej samej metody, a dodatkowo rysuje wykres z przedziałem ufności, który dobrze pokazuje zespołowi, jak duża jest niepewność.",
    },
    {
      type: "p",
      text: "Prostszą i bardzo czytelną alternatywą są indeksy sezonowe. Indeks pokazuje, ile razy sprzedaż w danym okresie jest wyższa lub niższa od średniej. Liczy się go jako średni udział okresu w sprzedaży roku pomnożony przez liczbę okresów. Prognozę roczną dzieli się potem na okresy według indeksów.",
    },
    {
      type: "table",
      caption: "Indeksy sezonowe kategorii kurtek i prognoza na rok 3 przy założonym wzroście 10% – dane ilustracyjne w sztukach",
      columns: [
        { label: "Kwartał", kind: "text" },
        { label: "Rok 1", kind: "number", suffix: " szt." },
        { label: "Rok 2", kind: "number", suffix: " szt." },
        { label: "Indeks sezonowy", kind: "number", format: "scale" },
        { label: "Prognoza rok 3", kind: "number", suffix: " szt.", format: "bars" },
      ],
      rows: [
        { cells: ["I kwartał", 1200, 1300, 0.59, 1460] },
        { cells: ["II kwartał", 400, 450, 0.2, 495] },
        { cells: ["III kwartał", 1800, 2000, 0.89, 2203] },
        { cells: ["IV kwartał", 4600, 5250, 2.32, 5742] },
      ],
    },
    {
      type: "p",
      text: "Sprzedaż roku 2 wyniosła 9000 sztuk, więc przy wzroście 10% prognoza roczna to 9900 sztuk, czyli średnio 2475 na kwartał. Prognoza na IV kwartał to 2475 × 2,32 ≈ 5742 sztuki. Suma czterech kwartałów znów daje 9900. Tę samą logikę stosuje się do tygodni: wtedy indeksów jest 52, a zamiast kwartałów w tabeli są tygodnie sezonu.",
    },
    { type: "h2", id: "trafnosc-prognozy-sprzedazy", text: "Jak mierzyć trafność prognozy sprzedaży" },
    {
      type: "p",
      text: "Prognozy, której trafności nikt nie mierzy, nie da się poprawić. Wystarczą dwa wskaźniki liczone co miesiąc lub po każdym sezonie. MAPE, czyli średni bezwzględny błąd procentowy, mówi, o ile średnio prognoza myli się w górę lub w dół. Obciążenie (bias) mówi, czy myli się systematycznie w jedną stronę.",
    },
    {
      type: "code",
      caption: "Trafność prognozy w Excelu: sprzedaż rzeczywista w kolumnie B, prognoza w kolumnie C, 12 okresów w wierszach 2–13.",
      code: `D2   błąd bezwzględny %:  =MODUŁ.LICZBY(C2-B2)/B2        (ABS)
D14  MAPE:                =ŚREDNIA(D2:D13)
D15  obciążenie (bias):   =SUMA(C2:C13)/SUMA(B2:B13)-1`,
    },
    {
      type: "p",
      text: "Obciążenie jest dla handlu ważniejsze, niż się wydaje. Prognoza, która co sezon jest o kilka procent za wysoka, przekłada się na nadwyżki i obniżki, a prognoza stale za niska – na braki i utraconą sprzedaż. Jako regułę kciuka przyjmuję, że obciążenie powinno oscylować wokół zera; jeśli przez kilka okresów z rzędu ma ten sam znak, poprawiam założenia, zanim zacznę szukać bardziej zaawansowanej metody.",
    },
    {
      type: "p",
      text: "Prognoza kategorii to punkt wyjścia do planu zakupów i budżetu open to buy, a jej podział na rozmiary opisuję w artykule o krzywej rozmiarów. Jeśli chcesz zbudować model prognozy sprzedaży dla swojej marki w Excelu lub Power BI, umów konsultację – odpowiadam w ciągu jednego dnia roboczego.",
    },
  ],
  faqTitle: "Prognozowanie sprzedaży — najczęstsze pytania",
  faq: [
    {
      question: "Jakie są metody prognozowania sprzedaży?",
      answer: "Metody dzielą się na ilościowe i jakościowe. Ilościowe to między innymi średnia ruchoma, wygładzanie wykładnicze, regresja i modele sezonowe, które wykorzystują historię sprzedaży. Jakościowe opierają się na ocenie ekspertów i przydają się tam, gdzie historii brakuje, na przykład przy nowych produktach.",
    },
    {
      question: "Czym różni się prognozowanie sprzedaży od prognozowania popytu?",
      answer: "Prognoza sprzedaży szacuje, ile faktycznie się sprzeda, więc jest ograniczona dostępnym zapasem. Prognoza popytu szacuje, ile klienci chcieliby kupić, gdyby towaru nie brakowało. W modzie różnica jest duża, bo braki rozmiarów obniżają sprzedaż i zaniżają prognozę na kolejny sezon.",
    },
    {
      question: "Jak zrobić prognozę sprzedaży w Excelu?",
      answer: "Najprościej przygotować tabelę z datami i sprzedażą, a następnie użyć funkcji Arkusz prognozy na karcie Dane albo formuły PROGNOZA.ETS, która uwzględnia sezonowość. Dla trendu bez sezonowości wystarczy PROGNOZA.LINIOWA. Wynik warto porównać z rzeczywistą sprzedażą z kilku ostatnich okresów, zanim użyje się go w planie zakupów.",
    },
  ],
  seo: {
    title: "Prognozowanie sprzedaży w handlu: metody i Excel",
    description: "Metody prognozowania sprzedaży i popytu w handlu, specyfika mody sezonowej i prognoza sprzedaży w Excelu krok po kroku na prostym przykładzie.",
  },
};
