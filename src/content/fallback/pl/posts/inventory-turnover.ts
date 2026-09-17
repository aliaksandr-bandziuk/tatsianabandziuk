import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("inventory-turnover", "pl"),
  title: "Wskaźnik rotacji zapasów: wzór w dniach i w razach, interpretacja",
  h1: { before: "Wskaźnik rotacji zapasów: wzór w dniach i w razach,", accent: "interpretacja" },
  excerpt: "Jak obliczyć wskaźnik rotacji zapasów w dniach i w razach, jak go czytać przy sezonowej sprzedaży i czym różni się od sell-through.",
  lead:
    "Wskaźnik rotacji zapasów pokazuje, ile razy w danym okresie firma sprzedaje i odtwarza przeciętny zapas (rotacja w razach) albo ile dni średnio towar czeka na sprzedaż (rotacja w dniach). Liczy się go z kosztu sprzedanych towarów i przeciętnego zapasu, a w handlu modowym zawsze czyta się go w kontekście sezonu.",
  date: "2026-08-20",
  readingMinutes: 5,
  body: [
    { type: "h2", id: "definicja", text: "Co to jest wskaźnik rotacji zapasów" },
    {
      type: "p",
      text: "Rotacja zapasów to miara tempa, w jakim towar zamienia się w sprzedaż. Im szybciej zapas się obraca, tym mniej kapitału jest w nim zamrożone i tym mniejsze ryzyko, że towar trzeba będzie sprzedać z obniżką. Wskaźnik występuje w dwóch postaciach, które opisują to samo zjawisko z dwóch stron.",
    },
    {
      type: "list",
      items: [
        "Rotacja w razach: ile razy przeciętny zapas został sprzedany w okresie. Wyższa wartość oznacza szybszy obrót.",
        "Rotacja w dniach (cykl rotacji zapasów): ile dni średnio mija od przyjęcia towaru do jego sprzedaży. Niższa wartość oznacza szybszy obrót.",
        "Pokrycie zapasu w tygodniach: na ile tygodni wystarczy obecny zapas przy obecnym tempie sprzedaży. To wskaźnik operacyjny, używany co tydzień przez zespół handlowy.",
      ],
    },
    {
      type: "p",
      text: "Zapas i sprzedaż muszą być wyceniane tak samo. Jeśli zapas jest w cenach zakupu, sprzedaż bierze się jako koszt sprzedanych towarów (KWS), a nie przychód. W analizie finansowej spotyka się też wersję z przychodem ze sprzedaży, ale wtedy wynik jest zawyżony o marżę i nie da się go porównać z wersją kosztową.",
    },
    { type: "h2", id: "wzor-w-dniach", text: "Wzór na rotację zapasów w dniach" },
    { type: "formula", text: "Rotacja zapasów w dniach = przeciętny zapas ÷ koszt sprzedanych towarów × liczba dni okresu" },
    {
      type: "p",
      text: "Przeciętny zapas najprościej liczy się jako średnią ze stanu na początek i na koniec okresu. Dokładniejszy wynik daje średnia ze stanów na koniec każdego miesiąca albo tygodnia, bo w modzie stan magazynu mocno się zmienia w ciągu sezonu. Liczba dni okresu to 365 dla roku, 90 lub 91 dla kwartału i około 182 dla sezonu wiosna–lato.",
    },
    {
      type: "p",
      text: "Przykład: kategoria kurtek miała w roku koszt sprzedanych towarów 360 000 zł, a przeciętny zapas w cenach zakupu wynosił 180 000 zł. Rotacja w dniach to 180 000 ÷ 360 000 × 365 = 182,5 dnia. Średnio kurtka czeka więc na sprzedaż około pół roku.",
    },
    { type: "h2", id: "wzor-w-razach", text: "Wzór na rotację zapasów w razach" },
    { type: "formula", text: "Rotacja zapasów w razach = koszt sprzedanych towarów ÷ przeciętny zapas" },
    {
      type: "p",
      text: "Dla tych samych kurtek rotacja w razach wynosi 360 000 ÷ 180 000 = 2,0. Oba wskaźniki łączy prosta zależność: rotacja w dniach = liczba dni okresu ÷ rotacja w razach. Wystarczy więc policzyć jeden z nich, a drugi wyprowadzić.",
    },
    {
      type: "table",
      caption: "Rotacja zapasów w dniach i w razach dla czterech kategorii – dane ilustracyjne za rok (365 dni)",
      columns: [
        { label: "Kategoria", kind: "text" },
        { label: "Koszt sprzedanych towarów", kind: "number", suffix: " zł" },
        { label: "Przeciętny zapas", kind: "number", suffix: " zł" },
        { label: "Rotacja w razach", kind: "number", format: "scale" },
        { label: "Rotacja w dniach", kind: "number", format: "bars" },
      ],
      rows: [
        { cells: ["Koszulki", 480000, 80000, 6, 60.8] },
        { cells: ["Swetry", 300000, 100000, 3, 121.7] },
        { cells: ["Kurtki", 360000, 180000, 2, 182.5] },
        { cells: ["Akcesoria", 90000, 60000, 1.5, 243.3] },
      ],
    },
    {
      type: "p",
      text: "Akcesoria mają najniższy koszt sprzedaży, ale też najwolniejszy obrót: zapas wystarcza na ponad osiem miesięcy. To sygnał, żeby sprawdzić głębokość zakupu i liczbę wariantów w tej kategorii.",
    },
    {
      type: "calculator",
      kind: "stockTurn",
      title: "Kalkulator rotacji zapasów i pokrycia zapasu",
      labels: {
        cogs: "Koszt sprzedanych towarów w okresie (zł)",
        avgInventory: "Przeciętny zapas w cenach zakupu (zł)",
        periodDays: "Liczba dni okresu",
        stock: "Zapas w sztukach",
        weeklySales: "Średnia sprzedaż tygodniowa w sztukach",
        turns: "Rotacja zapasów w razach",
        days: "Rotacja zapasów w dniach",
        weeksCover: "Pokrycie zapasu w tygodniach",
      },
      note: "Wzory: rotacja w razach = koszt sprzedanych towarów ÷ przeciętny zapas; rotacja w dniach = liczba dni okresu ÷ rotacja w razach; pokrycie zapasu = zapas w sztukach ÷ średnia sprzedaż tygodniowa.",
    },
    {
      type: "p",
      text: "Pokrycie zapasu liczy się w sztukach: zapas 1200 sztuk przy średniej sprzedaży 150 sztuk tygodniowo wystarczy na 8 tygodni. Wynik porównuje się z liczbą tygodni, które zostały do końca sezonu. Jeśli do końca sezonu jest 6 tygodni, a pokrycie wynosi 8, około jednej czwartej zapasu nie sprzeda się w obecnym tempie i trzeba zaplanować działania: przesunięcie towaru, promocję albo obniżkę.",
    },
    { type: "h2", id: "rotacja-w-excelu", text: "Jak obliczyć rotację zapasów w Excelu" },
    {
      type: "p",
      text: "W Excelu wystarczy tabela z jednym wierszem na kategorię i kolumnami: koszt sprzedanych towarów, stany zapasu na koniec kolejnych miesięcy i liczba dni okresu. Formuły wyglądają tak (polska wersja Excela):",
    },
    {
      type: "code",
      caption: "Rotacja zapasów w Excelu: koszt sprzedanych towarów w kolumnie B, stany miesięczne w kolumnach C–N, liczba dni okresu w komórce $S$1.",
      code: `O2  przeciętny zapas:     =ŚREDNIA(C2:N2)
P2  rotacja w razach:     =JEŻELI(O2=0;"";B2/O2)
Q2  rotacja w dniach:     =JEŻELI(P2="";"";$S$1/P2)`,
    },
    {
      type: "p",
      text: "Formatowanie warunkowe (skala kolorów) na kolumnie z rotacją w dniach od razu pokazuje kategorie o najwolniejszym obrocie. Ten sam arkusz można odświeżać co miesiąc, dopisując kolejny stan zapasu.",
    },
    { type: "h2", id: "interpretacja", text: "Jak interpretować wskaźnik rotacji zapasów w handlu modowym" },
    {
      type: "p",
      text: "Nie istnieje jedna prawidłowa wartość rotacji. Wynik porównuje się z tą samą kategorią w poprzednich okresach, z planem i z innymi kategoriami o podobnym charakterze. Koszulki bazowe z natury obracają się szybciej niż płaszcze, więc porównywanie ich ze sobą niewiele mówi.",
    },
    {
      type: "list",
      items: [
        "Sezonowość: rotacja liczona za cały rok uśrednia szczyt i koniec sezonu. Dla kolekcji sezonowych lepiej liczyć ją osobno dla sezonu wiosna–lato i jesień–zima i porównywać z tym samym sezonem rok wcześniej.",
        "Towar stały i sezonowy: produkty bazowe, dostępne cały rok, mają inną normę niż kolekcja sezonowa. Warto je raportować oddzielnie.",
        "Zbyt wysoka rotacja nie zawsze jest dobra. Może oznaczać za płytki zakup, braki popularnych rozmiarów i utraconą sprzedaż.",
        "Niska rotacja oznacza zamrożony kapitał i rosnące ryzyko obniżek na koniec sezonu. Przy spadającej rotacji w środku sezonu decyzję o promocji podejmuje się wcześniej, póki cena jeszcze działa.",
        "Moment pomiaru: stan tuż po dostawie kolekcji zaniża rotację, a stan po wyprzedaży ją zawyża. Średnia z kilku punktów w czasie wyrównuje ten efekt.",
      ],
    },
    {
      type: "p",
      text: "W praktyce najwięcej mówi zmiana wskaźnika w czasie. Rotacja kategorii spadająca z sezonu na sezon przy stabilnej sprzedaży wskazuje, że zakupy rosną szybciej niż popyt.",
    },
    { type: "h2", id: "rotacja-a-sell-through", text: "Rotacja zapasów a sell-through" },
    {
      type: "p",
      text: "Sell-through to procent dostępnego towaru, który został sprzedany: sprzedane sztuki ÷ (zapas początkowy + dostawy) × 100%. Liczy się go zwykle w sztukach, dla modelu lub kategorii, od początku sezonu. Rotacja zapasów liczy się w wartości i pokazuje tempo obrotu kapitałem w dowolnym okresie.",
    },
    {
      type: "list",
      items: [
        "Sell-through odpowiada na pytanie, jaką część zakupu sezonu już sprzedano i czy model trzeba obniżyć.",
        "Rotacja odpowiada na pytanie, jak długo kapitał jest zamrożony w zapasie i jak kategoria wypada na tle innych.",
        "Pokrycie zapasu w tygodniach łączy oba spojrzenia: pokazuje, czy obecny zapas sprzeda się do końca sezonu przy obecnym tempie sprzedaży.",
      ],
    },
    {
      type: "p",
      text: "W tygodniowym raporcie dla marki modowej sell-through i pokrycie zapasu są na poziomie modelu, a rotacja na poziomie kategorii i sezonu. Taki podział pozwala podejmować decyzje o obniżkach i o budżecie zakupów na podstawie tych samych danych.",
    },
    { type: "h2", id: "bledy", text: "Najczęstsze błędy w liczeniu rotacji zapasów" },
    {
      type: "list",
      items: [
        "Zapas w cenach zakupu, a sprzedaż w cenach detalicznych brutto: wynik jest zawyżony o marżę i VAT.",
        "Przeciętny zapas liczony tylko ze stanu na koniec okresu.",
        "Porównywanie rotacji z okresów o różnej długości bez przeliczenia na te same dni.",
        "Wliczanie towaru w drodze lub zamówionego do zapasu w magazynie.",
        "Jedna średnia dla całego asortymentu, która ukrywa modele zalegające od kilku sezonów.",
      ],
    },
    {
      type: "p",
      text: "Jeśli potrzebujesz modelu w Excelu, który liczy rotację i pokrycie zapasu dla Twoich kategorii co tydzień, umów konsultację – odpowiadam w ciągu jednego dnia roboczego.",
    },
  ],
  faqTitle: "Wskaźnik rotacji zapasów – najczęstsze pytania",
  faq: [
    {
      question: "Jak obliczyć wskaźnik rotacji zapasów?",
      answer:
        "Rotację w razach liczy się jako koszt sprzedanych towarów podzielony przez przeciętny zapas w cenach zakupu. Rotację w dniach liczy się jako przeciętny zapas podzielony przez koszt sprzedanych towarów i pomnożony przez liczbę dni okresu. Przeciętny zapas to średnia ze stanów na początek i koniec okresu albo ze stanów miesięcznych.",
    },
    {
      question: "Jak interpretować wskaźnik rotacji zapasów?",
      answer:
        "Wyższa rotacja w razach i niższa rotacja w dniach oznaczają szybszy obrót towaru i mniej zamrożonego kapitału. Wynik porównuje się z tą samą kategorią w poprzednich okresach i z planem, a nie z jedną normą rynkową. Bardzo wysoka rotacja może też oznaczać zbyt płytki zakup i braki towaru.",
    },
    {
      question: "Czym różni się rotacja zapasów w dniach od rotacji w razach?",
      answer:
        "Rotacja w razach mówi, ile razy zapas obrócił się w okresie, a rotacja w dniach – ile dni średnio towar czeka na sprzedaż. To dwie postaci tego samego wskaźnika: rotacja w dniach równa się liczbie dni okresu podzielonej przez rotację w razach.",
    },
    {
      question: "Jaki wskaźnik rotacji zapasów jest dobry w handlu odzieżą?",
      answer:
        "Dobra wartość zależy od kategorii i modelu sprzedaży: produkty bazowe obracają się szybciej niż okrycia czy akcesoria. W modzie wskaźnik ocenia się dla sezonu i porównuje z tym samym sezonem rok wcześniej. Ważniejszy od samej liczby jest kierunek zmian przy podobnym poziomie sprzedaży.",
    },
    {
      question: "Czym różni się rotacja zapasów od sell-through?",
      answer:
        "Sell-through pokazuje, jaki procent dostępnego towaru sprzedano, i liczy się go zwykle w sztukach dla modelu od początku sezonu. Rotacja zapasów pokazuje tempo obrotu kapitałem w wartości dla dowolnego okresu. Sell-through służy decyzjom o obniżkach, rotacja – ocenie kategorii i budżetu zakupów.",
    },
  ],
  seo: {
    title: "Wskaźnik rotacji zapasów: wzór w dniach i w razach",
    description:
      "Wskaźnik rotacji zapasów w dniach i w razach: wzory, przykład z tabelą, kalkulator i interpretacja w handlu modowym, gdzie sprzedaż zależy od sezonu.",
  },
};
