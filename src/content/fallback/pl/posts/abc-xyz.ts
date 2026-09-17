import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("abc-xyz", "pl"),
  title: "Analiza ABC i XYZ asortymentu w Excelu krok po kroku",
  h1: { before: "Analiza ABC i XYZ asortymentu w Excelu", accent: "krok po kroku" },
  excerpt: "Jak zrobić analizę ABC i XYZ asortymentu w Excelu, jakie przyjąć progi i jak czytać macierz ABC XYZ w handlu modowym.",
  lead:
    "Analiza ABC dzieli asortyment na trzy grupy według udziału w sprzedaży: A to kilka modeli, które dają większość obrotu, C to długi ogon o małym znaczeniu. Analiza XYZ dodaje drugą oś – stabilność popytu – i razem tworzą macierz, która pomaga zdecydować, co kupować głęboko, co uzupełniać, a co wycofać.",
  date: "2026-09-02",
  readingMinutes: 5,
  body: [
    { type: "h2", id: "na-czym-polega-abc", text: "Na czym polega analiza ABC asortymentu" },
    {
      type: "p",
      text: "Analiza ABC opiera się na zasadzie Pareto: niewielka część pozycji odpowiada za większość wyniku. Modele sortuje się od największej do najmniejszej sprzedaży, liczy ich udział narastająco i przypisuje klasy według progów. Najczęściej stosuje się podział 80/15/5.",
    },
    {
      type: "list",
      items: [
        "Klasa A: modele, które razem dają pierwsze 80% sprzedaży. Zwykle to kilkanaście–kilkadziesiąt procent asortymentu.",
        "Klasa B: kolejne 15% sprzedaży, czyli pozycje średnio ważne.",
        "Klasa C: ostatnie 5% sprzedaży, często ponad połowa wszystkich modeli.",
      ],
    },
    {
      type: "p",
      text: "Kryterium nie musi być przychodem. W handlu modowym analizę ABC robi się także według marży kwotowej i według sztuk. Model może być w klasie A pod względem przychodu i w klasie C pod względem marży, jeśli sprzedaje się głównie w promocji. Porównanie obu wyników mówi więcej niż każdy z nich osobno.",
    },
    {
      type: "p",
      text: "Równie ważny jest wybór okresu. Dla kolekcji sezonowej bierze się sprzedaż z jednego sezonu, od wprowadzenia do końca wyprzedaży. Dla produktów stałych wystarcza ostatnie 12 miesięcy. Analiza obejmująca dwa różne sezony miesza modele, które nigdy nie były w sprzedaży jednocześnie, i zaniża pozycję nowszych produktów.",
    },
    { type: "h2", id: "abc-w-excelu", text: "Jak zrobić analizę ABC w Excelu krok po kroku" },
    {
      type: "list",
      items: [
        "Krok 1. Przygotowanie danych: jeden wiersz na model (lub model-kolor), kolumna ze sprzedażą netto za wybrany okres, np. za ostatni sezon.",
        "Krok 2. Sortowanie malejąco według sprzedaży (Dane → Sortuj).",
        "Krok 3. Udział każdego modelu w sprzedaży całkowitej.",
        "Krok 4. Udział narastająco, czyli suma udziałów od pierwszego wiersza do bieżącego.",
        "Krok 5. Klasa ABC według progów 80% i 95%.",
        "Krok 6. Tabela podsumowująca: liczba modeli i udział w sprzedaży w każdej klasie (tabela przestawna lub funkcja LICZ.JEŻELI).",
      ],
    },
    {
      type: "code",
      caption: "Formuły analizy ABC w polskiej wersji Excela (w nawiasach nazwy angielskie). Dane: sprzedaż w kolumnie B, wiersze 2–201.",
      code: `C2  udział:              =B2/SUMA($B$2:$B$201)                      (SUM)
D2  udział narastająco:  =SUMA($C$2:C2)
E2  klasa ABC:           =JEŻELI(D2<=80%;"A";JEŻELI(D2<=95%;"B";"C"))   (IF)

Podsumowanie klas:
H2  liczba modeli A:     =LICZ.JEŻELI($E$2:$E$201;"A")               (COUNTIF)
I2  sprzedaż klasy A:    =SUMA.JEŻELI($E$2:$E$201;"A";$B$2:$B$201)   (SUMIF)`,
    },
    {
      type: "table",
      caption: "Przykład analizy ABC dla ośmiu modeli – dane ilustracyjne, sprzedaż sezonu w złotych",
      columns: [
        { label: "Model", kind: "text" },
        { label: "Sprzedaż netto", kind: "number", suffix: " zł", format: "bars" },
        { label: "Udział", kind: "number", suffix: "%" },
        { label: "Udział narastająco", kind: "number", suffix: "%" },
        { label: "Klasa", kind: "text" },
      ],
      rows: [
        { cells: ["Sukienka midi", 150000, 30, 30, "A"] },
        { cells: ["Jeansy o prostym kroju", 110000, 22, 52, "A"] },
        { cells: ["Marynarka", 80000, 16, 68, "A"] },
        { cells: ["Bluzka satynowa", 55000, 11, 79, "A"] },
        { cells: ["Sweter z wełną", 45000, 9, 88, "B"] },
        { cells: ["Spódnica plisowana", 30000, 6, 94, "B"] },
        { cells: ["Szalik", 20000, 4, 98, "C"] },
        { cells: ["Pasek", 10000, 2, 100, "C"] },
      ],
    },
    {
      type: "p",
      text: "Przy niewielkiej liczbie modeli granice klas są umowne: bluzka z udziałem narastającym 79% trafia do A, a sweter z 88% do B. Przy kilkuset modelach ten efekt znika, ale warto ręcznie przejrzeć pozycje tuż przy progach.",
    },
    { type: "h2", id: "analiza-xyz", text: "Analiza XYZ i stabilność popytu" },
    {
      type: "p",
      text: "Analiza XYZ klasyfikuje modele według tego, jak równomiernie się sprzedają. Miarą jest współczynnik zmienności: odchylenie standardowe sprzedaży z kolejnych okresów podzielone przez średnią sprzedaż. Im niższy współczynnik, tym łatwiej prognozować popyt.",
    },
    { type: "formula", text: "Współczynnik zmienności (CV) = odchylenie standardowe sprzedaży ÷ średnia sprzedaż" },
    {
      type: "list",
      items: [
        "X: popyt stabilny, niski współczynnik zmienności (w literaturze często do 10% dla danych miesięcznych).",
        "Y: popyt zmienny, ale przewidywalny, np. z wyraźną sezonowością (często 10–25%).",
        "Z: popyt nieregularny i trudny do prognozowania (powyżej 25%).",
      ],
    },
    {
      type: "p",
      text: "Przykład: jeansy sprzedają się w kolejnych tygodniach w ilościach 40, 42, 38, 41 i 39 sztuk. Średnia to 40, odchylenie standardowe około 1,4, więc współczynnik zmienności wynosi około 3,5% – to typowy model X. Sukienka koktajlowa sprzedaje 5, 30, 2, 18 i 0 sztuk: przy średniej 11 odchylenie przekracza 11, a współczynnik zmienności ponad 100% oznacza klasę Z, mimo dobrych pojedynczych tygodni.",
    },
    {
      type: "p",
      text: "Progi z podręczników pasują do towarów o stałej sprzedaży. Dane tygodniowe z handlu modowego mają naturalnie większą zmienność, dlatego progi ustala się na własnych danych, np. tak, żeby do X trafiła mniej więcej jedna piąta modeli z pełną historią. Ważne, żeby progi były stałe między analizami.",
    },
    {
      type: "code",
      caption: "Formuły analizy XYZ. Sprzedaż tygodniowa w kolumnach F–Q (12 tygodni), progi przykładowe – do kalibracji na własnych danych.",
      code: `R2  współczynnik zmienności: =ODCH.STANDARDOWE.POPUL(F2:Q2)/ŚREDNIA(F2:Q2)   (STDEV.P / AVERAGE)
S2  klasa XYZ:               =JEŻELI(R2<=0,25;"X";JEŻELI(R2<=0,5;"Y";"Z"))
T2  klasa łączna:            =E2&S2`,
    },
    { type: "h2", id: "macierz-abc-xyz", text: "Macierz ABC XYZ w decyzjach asortymentowych" },
    {
      type: "p",
      text: "Połączenie obu klasyfikacji daje dziewięć grup. Każda z nich wymaga innego podejścia do zakupu, uzupełnień i obniżek. Tabela poniżej pokazuje typowe decyzje dla marki odzieżowej.",
    },
    {
      type: "table",
      caption: "Macierz ABC XYZ – typowe decyzje asortymentowe",
      columns: [
        { label: "Klasa", kind: "text" },
        { label: "Charakter modelu", kind: "text" },
        { label: "Decyzja", kind: "text" },
      ],
      rows: [
        { cells: ["AX", "Duża sprzedaż, stabilny popyt", "Stała dostępność, automatyczne uzupełnienia, pilnowanie rozmiarów"] },
        { cells: ["AY", "Duża sprzedaż, popyt sezonowy", "Głęboki zakup przed szczytem, plan dostaw pod sezon"] },
        { cells: ["AZ", "Duża sprzedaż, popyt nieregularny", "Krótsze serie, szybkie uzupełnienia, częsty przegląd"] },
        { cells: ["BX", "Średnia sprzedaż, stabilny popyt", "Uzupełnienia według prognozy, niższy zapas bezpieczeństwa"] },
        { cells: ["BY", "Średnia sprzedaż, popyt sezonowy", "Zakup z planem obniżek na koniec sezonu"] },
        { cells: ["BZ", "Średnia sprzedaż, popyt nieregularny", "Mały zapas, zamówienia pod potwierdzony popyt"] },
        { cells: ["CX", "Mała sprzedaż, stabilny popyt", "Sprawdzić rolę w asortymencie, ograniczyć liczbę wariantów"] },
        { cells: ["CY", "Mała sprzedaż, popyt sezonowy", "Płytki zakup lub tylko wybrane sklepy i e-commerce"] },
        { cells: ["CZ", "Mała sprzedaż, popyt nieregularny", "Kandydat do wycofania lub sprzedaży tylko online"] },
      ],
    },
    {
      type: "p",
      text: "Macierz nie podejmuje decyzji za zespół. Model z klasy CZ może być potrzebny, bo uzupełnia stylizację albo zamyka linię cenową. Klasyfikacja wskazuje, które pozycje wymagają rozmowy, a nie które automatycznie usunąć.",
    },
    {
      type: "p",
      text: "W planowaniu kolejnego sezonu wyniki macierzy wykorzystuje się w kilku miejscach:",
    },
    {
      type: "list",
      items: [
        "Budżet zakupów: modele AX i AY dostają głębszy zakup i priorytet w dostawach, a budżet na klasę C jest ograniczany z góry.",
        "Liczba wariantów: w klasie C sprawdza się, czy każdy kolor i każda długość są potrzebne, bo nadmiar wariantów rozprasza zapas.",
        "Zapas bezpieczeństwa: dla X może być niski, bo prognoza jest trafna; dla Z wyższy zapas zwykle nie pomaga, lepiej skrócić czas uzupełnienia.",
        "Rozmieszczenie w sklepach: modele A trafiają do wszystkich lokalizacji, modele C mogą być dostępne tylko w największych sklepach i online.",
      ],
    },
    { type: "h2", id: "bledy-w-modzie", text: "Błędy analizy ABC XYZ w handlu modowym" },
    {
      type: "list",
      items: [
        "Sezonowość: model sezonowy z natury ma wysoki współczynnik zmienności. XYZ liczy się w obrębie sezonu, a nie na danych z całego roku, bo inaczej prawie cała kolekcja trafi do Z.",
        "Nowe produkty: model z kilkoma tygodniami historii nie ma wiarygodnej klasy. Nowości oznacza się osobno i ocenia na podstawie modeli analogicznych albo po zebraniu danych.",
        "Braki towaru: model, którego zabrakło w popularnych rozmiarach, ma zaniżoną sprzedaż i może fałszywie trafić do C. Tygodnie z brakami warto oznaczyć lub wyłączyć.",
        "Obniżki i zwroty: przychód z wyprzedaży zawyża pozycję modelu, który sprzedawał się tylko w obniżonej cenie. Pomaga druga analiza ABC według marży.",
        "Zły poziom szczegółowości: analiza na poziomie SKU (rozmiarów) rozbija model na wiele małych pozycji. Dla decyzji asortymentowych właściwy jest poziom model-kolor.",
        "Różne okresy: porównywanie klas z sezonów o różnej długości albo z różną liczbą sklepów daje fałszywe przesunięcia.",
      ],
    },
    {
      type: "p",
      text: "Najlepsze efekty daje zestawienie kilku widoków w jednym arkuszu: klasa ABC według przychodu, klasa ABC według marży, klasa XYZ i sell-through z sezonu. Model, który jest w A według przychodu, w C według marży i ma niski sell-through, to zwykle sygnał problemu z ceną lub głębokością zakupu, a nie z samym produktem. Takie zestawienie warto przejrzeć razem z zespołem zakupów przed zamknięciem planu na kolejny sezon.",
    },
    {
      type: "p",
      text: "Jeśli chcesz przeprowadzić analizę ABC XYZ na danych swojej marki i przełożyć ją na plan zakupów, umów konsultację – odpowiadam w ciągu jednego dnia roboczego.",
    },
  ],
  faqTitle: "Analiza ABC i XYZ – najczęstsze pytania",
  faq: [
    {
      question: "Na czym polega analiza ABC?",
      answer:
        "Analiza ABC dzieli asortyment na trzy klasy według udziału w sprzedaży lub marży. Klasa A to pozycje dające około 80% wyniku, B – kolejne 15%, a C – ostatnie 5%. Pozwala skupić uwagę i budżet na modelach, które najbardziej wpływają na wynik.",
    },
    {
      question: "Czym różni się analiza ABC od analizy XYZ?",
      answer:
        "Analiza ABC mierzy znaczenie pozycji, czyli jej udział w sprzedaży. Analiza XYZ mierzy stabilność popytu za pomocą współczynnika zmienności sprzedaży w kolejnych okresach. Połączone tworzą macierz dziewięciu grup, z których każda wymaga innej strategii zakupu.",
    },
    {
      question: "Jak zrobić analizę ABC w Excelu?",
      answer:
        "Należy posortować modele malejąco według sprzedaży, policzyć udział każdego w sumie (=B2/SUMA($B$2:$B$201)) i udział narastająco (=SUMA($C$2:C2)). Klasę przypisuje formuła JEŻELI z progami 80% i 95%. Całość zajmuje kilka minut przy danych w jednym arkuszu.",
    },
    {
      question: "Jakie progi przyjąć w analizie XYZ?",
      answer:
        "W literaturze często podaje się progi 10% i 25% współczynnika zmienności dla danych miesięcznych. W handlu modowym dane tygodniowe są bardziej zmienne, więc progi ustala się na własnych danych i utrzymuje bez zmian między analizami. XYZ liczy się w obrębie sezonu, żeby sezonowość nie przesunęła wszystkich modeli do Z.",
    },
    {
      question: "Jak często powtarzać analizę ABC XYZ?",
      answer:
        "Pełną analizę robi się zwykle po każdym sezonie, przed planowaniem kolejnych zakupów. Dla produktów stałych, sprzedawanych cały rok, warto ją odświeżać co miesiąc lub co kwartał. Nowe modele klasyfikuje się dopiero po zebraniu kilku tygodni sprzedaży.",
    },
  ],
  seo: {
    title: "Analiza ABC i XYZ asortymentu w Excelu krok po kroku",
    description:
      "Analiza ABC krok po kroku w Excelu: formuły, progi 80/15/5, analiza XYZ ze współczynnikiem zmienności i macierz ABC XYZ do decyzji o asortymencie.",
  },
};
