import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("sell-through-rate", "pl"),
  title: "Wskaźnik sell-through: wzór, interpretacja i miary DAX w Power BI",
  h1: { before: "Wskaźnik sell-through: wzór, interpretacja i", accent: "miary DAX w Power BI" },
  excerpt: "Co oznacza sell-through, jak go obliczyć w Excelu i Power BI oraz jaki poziom wskaźnika jest dobry w handlu modowym.",
  lead: "Sell-through to procent dostępnego towaru, który sprzedał się w danym okresie: sprzedaż netto w sztukach dzielona przez zapas początkowy plus dostawy. Wskaźnik pokazuje, czy zakup był trafiony i kiedy reagować obniżką albo dokupieniem towaru.",
  date: "2026-07-28",
  readingMinutes: 5,
  body: [
    { type: "h2", id: "co-oznacza-sell-through", text: "Co oznacza sell-through w handlu" },
    {
      type: "p",
      text: "Sell-through (w skrócie STR, od sell-through rate) odpowiada na proste pytanie: jaka część towaru, który mieliśmy do dyspozycji, trafiła już do klientów. Angielskie „sold through” znaczy po prostu „wyprzedany”. Jeśli marka kupiła 1000 sztuk sukienki, a po sześciu tygodniach sprzedała 450, sell-through wynosi 45%.",
    },
    {
      type: "p",
      text: "W modzie to podstawowy wskaźnik trafności zakupu sezonowego. Kolekcję kupuje się raz, z wyprzedzeniem kilku miesięcy, a sezon trwa krótko. Sell-through liczony co tydzień na poziomie modelu i koloru pokazuje, które decyzje zakupowe się sprawdziły, które modele warto dokupić, a które trzeba będzie obniżyć, zanim zostaną w magazynie na koniec sezonu.",
    },
    {
      type: "p",
      text: "Warto odróżnić go od dwóch pokrewnych pojęć. Sell-in to sprzedaż marki do partnera handlowego: sklepu wielomarkowego, dystrybutora albo platformy. Sell-through mówi, ile z tego towaru partner sprzedał klientom końcowym. Sell-out bywa używany zamiennie z sell-through, choć część firm rozumie przez niego samą sprzedaż do klienta końcowego w sztukach, bez odniesienia do zapasu. Wysoki sell-in przy niskim sell-through oznacza, że towar utknął na półkach partnera i wróci jako zwrot albo żądanie rabatu. Szerzej opisuję tę zależność w artykule o sell-in, sell-through i sell-out.",
    },
    { type: "h2", id: "wzor-na-sell-through", text: "Wzór na sell-through i dwa sposoby liczenia" },
    { type: "formula", text: "Sell-through % = (sprzedaż − zwroty) ÷ (zapas początkowy + dostawy) × 100%" },
    {
      type: "p",
      text: "Mianownik to cała dostępność w okresie: to, co leżało w sklepach i magazynie na początku, plus to, co dojechało w trakcie. Licznik to sprzedaż netto, czyli po odjęciu zwrotów. Przykład: 200 sztuk zapasu na początek miesiąca, 800 sztuk dostaw, 650 sztuk sprzedanych i 50 zwróconych. Sell-through wynosi (650 − 50) ÷ (200 + 800) = 60%.",
    },
    {
      type: "p",
      text: "Drugi sposób dzieli sprzedaż netto tylko przez dostawy z okresu: 600 ÷ 800 = 75%. Tę wersję stosuje się często dla nowej kolekcji, która startuje od zera, bo wtedy oba wyniki są równe. Przy towarze kontynuowanym wersja od dostaw zawyża wskaźnik, ponieważ pomija zapas przeniesiony z poprzedniego okresu. Nie ma jednej właściwej definicji, ale trzeba jedną wybrać, zapisać w słowniku wskaźników i stosować konsekwentnie w Excelu, w Power BI i na spotkaniach handlowych.",
    },
    {
      type: "p",
      text: "Kalkulator poniżej liczy oba warianty. Wszystkie wartości wpisuje się w sztukach.",
    },
    {
      type: "calculator",
      kind: "sellThrough",
      title: "Kalkulator sell-through",
      labels: {
        opening: "Zapas początkowy (szt.)",
        received: "Dostawy (szt.)",
        sold: "Sprzedaż w sztukach",
        returned: "Zwroty (szt.)",
        rate: "Sell-through od całej dostępności",
        rateReceived: "Sell-through od dostaw",
      },
      note: "Sell-through = (sprzedaż − zwroty) ÷ (zapas początkowy + dostawy). Wariant od dostaw dzieli sprzedaż netto tylko przez dostawy z okresu. Dane nie są nigdzie wysyłane.",
    },
    { type: "h2", id: "dobry-sell-through-w-modzie", text: "Jaki sell-through jest dobry w handlu modowym" },
    {
      type: "p",
      text: "Jednej normy dla wszystkich nie ma. Dobry wynik zależy od kategorii, długości sezonu, strategii cenowej i tego, ile tygodni minęło od wejścia towaru do sklepów. Koszulka bazowa i płaszcz zimowy mają zupełnie inne tempo, a 40% po dwóch tygodniach to świetny wynik, podczas gdy 40% na koniec sezonu oznacza poważny problem.",
    },
    {
      type: "p",
      text: "Dlatego sell-through ocenia się zawsze względem punktu odniesienia. Z mojej praktyki w planowaniu kolekcji najlepiej działają trzy porównania:",
    },
    {
      type: "list",
      items: [
        "Z planem: przy zakupie zakłada się docelowy sell-through na koniec sezonu w pełnej cenie i po wyprzedaży, a potem rozkłada go na tygodnie.",
        "Z tym samym tygodniem sezonu rok wcześniej, dla tej samej kategorii. Porównanie z datą kalendarzową myli, bo sezon mógł wystartować tydzień później.",
        "Z innymi modelami w tej samej kategorii i progu cenowym. Model z sell-through dwa razy niższym niż sąsiedzi na półce wymaga decyzji niezależnie od średniej.",
      ],
    },
    {
      type: "p",
      text: "Jako regułę kciuka, a nie normę branżową, traktuję taki układ: kolekcja sezonowa, która przed startem wyprzedaży ma sell-through w okolicach 60–70% w pełnej cenie, zwykle kończy sezon z rozsądną marżą. Wynik wyraźnie niższy oznacza głębsze obniżki, a wynik zbliżony do 90–100% w połowie sezonu sugeruje, że zakup był za płytki i część sprzedaży przepadła przez braki rozmiarów.",
    },
    { type: "h2", id: "sell-through-w-excelu", text: "Jak obliczyć sell-through w Excelu" },
    {
      type: "p",
      text: "W Excelu wystarczy tabela z jednym wierszem na model (albo model i kolor) i czterema kolumnami: zapas początkowy, dostawy, sprzedaż i zwroty. Formuły w polskiej wersji Excela wyglądają tak:",
    },
    {
      type: "code",
      caption: "Sell-through w Excelu: zapas początkowy w kolumnie A, dostawy w B, sprzedaż w C, zwroty w D. Kolumny E i F sformatowane jako procent.",
      code: `E2  sell-through od dostępności:  =JEŻELI((A2+B2)=0;"";(C2-D2)/(A2+B2))
F2  sell-through od dostaw:       =JEŻELI(B2=0;"";(C2-D2)/B2)

Sell-through kategorii z tabeli z kolumną kategorii w G, wynik dla kategorii z komórki J2:
=(SUMA.JEŻELI(G:G;J2;C:C)-SUMA.JEŻELI(G:G;J2;D:D))/(SUMA.JEŻELI(G:G;J2;A:A)+SUMA.JEŻELI(G:G;J2;B:B))`,
    },
    {
      type: "p",
      text: "Ostatnia formuła pokazuje najważniejszą zasadę: sell-through kategorii, tygodnia czy sezonu liczy się z sum sztuk, a nie jako średnią z procentów poszczególnych modeli. Model sprzedany w 20 sztukach ważyłby w średniej tyle samo co bestseller sprzedany w 2000 sztukach. W tabeli przestawnej najwygodniej dodać pole obliczeniowe, które dzieli sumy, albo policzyć wynik obok tabeli na podstawie jej sum.",
    },
    { type: "h2", id: "miary-dax-sell-through", text: "Miary DAX dla sell-through w Power BI" },
    {
      type: "p",
      text: "W Power BI sell-through musi być miarą, a nie kolumną obliczeniową, bo tylko miara przelicza się poprawnie dla każdego wyboru w raporcie: rynku, kategorii, tygodnia czy pojedynczego modelu. Poniższe miary zakładają tabelę kalendarza oznaczoną jako tabela dat, tabelę sprzedaży, tabelę zwrotów, tygodniowe stany zapasu i tabelę dostaw.",
    },
    {
      type: "code",
      caption: "Sell-through od początku sezonu w DAX (nazwy tabel i kolumn ilustracyjne)",
      code: `Sprzedaż netto szt. =
SUM ( Sprzedaz[Sztuki] ) - SUM ( Zwroty[Sztuki] )

Sell-through sezonu % =
VAR KoniecOkresu = MAX ( Kalendarz[Data] )
VAR StartSezonu =
    CALCULATE ( MIN ( Kalendarz[Data] ), ALLEXCEPT ( Kalendarz, Kalendarz[Sezon] ) )
VAR SprzedazSezonu =
    CALCULATE ( [Sprzedaż netto szt.], DATESBETWEEN ( Kalendarz[Data], StartSezonu, KoniecOkresu ) )
VAR ZapasStartowy =
    CALCULATE ( SUM ( Zapasy[Sztuki] ), REMOVEFILTERS ( Kalendarz ), Kalendarz[Data] = StartSezonu - 1 )
VAR DostawySezonu =
    CALCULATE ( SUM ( Dostawy[Sztuki] ), DATESBETWEEN ( Kalendarz[Data], StartSezonu, KoniecOkresu ) )
RETURN
    DIVIDE ( SprzedazSezonu, ZapasStartowy + DostawySezonu )`,
    },
    {
      type: "p",
      text: "Funkcja DIVIDE zwraca pusty wynik zamiast błędu, gdy model nie miał jeszcze dostaw. Zmienne (VAR) ułatwiają sprawdzenie miary: wystarczy tymczasowo zwrócić jedną z nich zamiast wyniku i porównać ją z sumą w Excelu. Tak samo zbudowana miara z zakresem jednego tygodnia zamiast całego sezonu daje tygodniowy sell-through.",
    },
    { type: "h2", id: "tygodniowa-krzywa-sell-through", text: "Tygodniowa krzywa sell-through w raporcie" },
    {
      type: "p",
      text: "Pojedyncza liczba mówi, gdzie jesteśmy. Krzywa sell-through narastająco, tydzień po tygodniu, mówi, dokąd zmierzamy. W raporcie tygodniowym pokazuję ją na tle planu i poprzedniego sezonu, z zaznaczonym tygodniem startu obniżek.",
    },
    {
      type: "table",
      caption: "Narastający sell-through kategorii sukienek w pierwszych ośmiu tygodniach sezonu – dane ilustracyjne",
      columns: [
        { label: "Tydzień sezonu", kind: "text" },
        { label: "Plan", kind: "number", suffix: "%" },
        { label: "Rzeczywisty", kind: "number", suffix: "%", format: "bars" },
        { label: "Odchylenie (p.p.)", kind: "number" },
      ],
      rows: [
        { cells: ["Tydzień 1", 4, 5, 1], trend: "up" },
        { cells: ["Tydzień 2", 9, 10, 1], trend: "up" },
        { cells: ["Tydzień 3", 14, 14, 0], trend: "flat" },
        { cells: ["Tydzień 4", 20, 18, -2], trend: "down" },
        { cells: ["Tydzień 5", 26, 22, -4], trend: "down" },
        { cells: ["Tydzień 6", 32, 26, -6], trend: "down" },
        { cells: ["Tydzień 7", 38, 30, -8], trend: "down" },
        { cells: ["Tydzień 8", 44, 34, -10], trend: "down" },
      ],
      trendColumn: 3,
    },
    {
      type: "p",
      text: "Z takiej krzywej widać nie tylko opóźnienie, ale i jego tempo. Od czwartego tygodnia kategoria traci do planu około dwóch punktów procentowych tygodniowo. To moment na decyzję: sprawdzić rozmiary i ekspozycję w sklepach, przesunąć towar między lokalizacjami albo zaplanować promocję, póki cena jeszcze działa. Reakcja w ósmym tygodniu kosztuje zwykle mniej niż głęboka obniżka na koniec sezonu.",
    },
    { type: "h2", id: "bledy-sell-through", text: "Najczęstsze błędy w liczeniu sell-through" },
    {
      type: "list",
      items: [
        "Średnia z procentów zamiast ilorazu sum: wynik kategorii zależy wtedy od liczby małych modeli, a nie od sprzedaży.",
        "Pomijanie zwrotów. W e-commerce sprzedaż brutto potrafi wyraźnie zawyżyć sell-through, a zwrócony towar wraca do zapasu.",
        "Mieszanie definicji: jeden raport dzieli przez dostawy, drugi przez całą dostępność, i zespół porównuje liczby, które nie są porównywalne.",
        "Liczenie w wartości zamiast w sztukach. Obniżki zmieniają wartość sprzedaży, więc sell-through w złotych myli się z efektem cenowym.",
        "Towar w drodze wliczony do dostaw, zanim dotarł do magazynu. Mianownik rośnie wcześniej niż sprzedaż i wskaźnik sztucznie spada.",
        "Brak kontekstu czasu: sell-through bez informacji, ile tygodni minęło od wejścia towaru, niewiele mówi.",
      ],
    },
    {
      type: "p",
      text: "Sell-through dobrze uzupełnia wskaźnik rotacji zapasów i pokrycie zapasu w tygodniach, które opisuję w osobnych artykułach. Jeśli chcesz, żeby sell-through w Twoim raporcie miał jedną definicję i liczył się tak samo w Excelu i w Power BI, umów konsultację – odpowiadam w ciągu jednego dnia roboczego.",
    },
  ],
  faqTitle: "Sell-through — najczęstsze pytania",
  faq: [
    {
      question: "Co to jest sell-through?",
      answer: "Sell-through to wskaźnik, który pokazuje, jaka część dostępnego towaru została sprzedana w danym okresie. Wyraża się go w procentach i liczy zwykle w sztukach, na poziomie modelu, koloru lub kategorii. W modzie to podstawowa miara trafności zakupu sezonowego.",
    },
    {
      question: "Jak obliczyć sell-through?",
      answer: "Sprzedaż netto w sztukach (sprzedaż minus zwroty) dzieli się przez zapas początkowy powiększony o dostawy z okresu i mnoży przez 100. Na przykład 600 sprzedanych sztuk przy 200 sztukach zapasu i 800 sztukach dostaw daje 60%. Część firm dzieli tylko przez dostawy, dlatego definicję trzeba zapisać i stosować konsekwentnie.",
    },
    {
      question: "Czym różni się sell-in od sell-through?",
      answer: "Sell-in to sprzedaż marki do partnera handlowego, czyli to, co trafiło na półki sklepu lub do magazynu dystrybutora. Sell-through mówi, jaka część tego towaru została sprzedana klientom końcowym. Wysoki sell-in przy niskim sell-through oznacza, że zapas utknął u partnera.",
    },
    {
      question: "Jak policzyć sell-through w Excelu?",
      answer: "Wystarczą cztery kolumny: zapas początkowy, dostawy, sprzedaż i zwroty. Formuła w wierszu ma postać =(C2-D2)/(A2+B2), a komórkę formatuje się jako procent. Przy danych z wielu tygodni lepiej sumować sztuki w tabeli przestawnej i dopiero potem dzielić, zamiast uśredniać procenty.",
    },
  ],
  seo: {
    title: "Sell-through: jak obliczyć wskaźnik w Excelu i Power BI",
    description: "Co oznacza sell-through, jak go obliczyć w Excelu i Power BI, jaki poziom jest dobry w modzie i jakie błędy zniekształcają wskaźnik.",
  },
};
