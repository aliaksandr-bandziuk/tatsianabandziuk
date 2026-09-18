import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("dax-measures", "pl"),
  title: "Pięć miar DAX w Power BI, których potrzebuje dashboard KPI w handlu",
  h1: { before: "Pięć miar DAX w Power BI, których potrzebuje", accent: "dashboard KPI w handlu" },
  excerpt: "Co to jest DAX w Power BI i pięć miar do dashboardu KPI w handlu: pokrycie zapasu, sprzedaż w pełnej cenie, zwroty, tygodnie zapasu i marża.",
  lead: "DAX (Data Analysis Expressions) to język formuł Power BI, w którym zapisuje się miary liczone na bieżąco dla każdego filtra raportu. Dashboard KPI w handlu potrzebuje przede wszystkim pięciu miar: pokrycia zapasu, udziału sprzedaży w pełnej cenie, wskaźnika zwrotów, tygodni zapasu i marży.",
  date: "2026-07-21",
  readingMinutes: 5,
  body: [
    { type: "h2", id: "co-to-jest-dax", text: "Co to jest DAX w Power BI" },
    {
      type: "p",
      text: "DAX to język formuł, którego Power BI używa do obliczeń na modelu danych. Ten sam język działa w Power Pivot w Excelu i w Analysis Services, więc miara napisana raz w jednym z tych narzędzi przenosi się do pozostałych prawie bez zmian. Funkcje takie jak SUM, AVERAGE czy IF wyglądają znajomo dla każdego, kto pracował w Excelu.",
    },
    {
      type: "p",
      text: "Czy DAX to język programowania? Nie w potocznym sensie. Nie pisze się w nim aplikacji ani pętli, tylko wyrażenia, które zwracają liczbę albo tabelę. Bliżej mu do formuł Excela niż do Pythona. Różnica polega na tym, że formuła w Excelu odwołuje się do komórek, a miara DAX do kolumn i tabel modelu i liczy się w kontekście filtra: dla rynku, kategorii czy tygodnia, które użytkownik właśnie wybrał. Zrozumienie tego kontekstu i funkcji CALCULATE, która go zmienia, to najtrudniejsza część nauki DAX.",
    },
    {
      type: "p",
      text: "Funkcje DAX dzielą się na kilka grup. Funkcje agregujące, takie jak SUM, AVERAGE i COUNTROWS, liczą sumy i średnie. Iteratory z końcówką X, na przykład SUMX, liczą wyrażenie wiersz po wierszu, a potem je sumują. CALCULATE zmienia kontekst filtra, FILTER i VALUES zwracają tabele, RELATED pobiera wartość z tabeli powiązanej relacją, a funkcje analizy czasowej, takie jak DATESINPERIOD czy SAMEPERIODLASTYEAR, porównują okresy. Do pięciu miar poniżej wystarczy kilkanaście z nich.",
    },
    {
      type: "p",
      text: "W raportach dla handlu pracuję zawsze w schemacie gwiazdy: tabele faktów sprzedaży, zwrotów i stanów zapasu oraz wymiary produktu, sklepu i kalendarza. Nazwy tabel i kolumn w przykładach poniżej są ilustracyjne, a sama logika pasuje do większości modeli sprzedażowych.",
    },
    { type: "h2", id: "miara-a-kolumna-obliczeniowa", text: "Miara DAX a kolumna obliczeniowa" },
    {
      type: "p",
      text: "Kolumna obliczeniowa liczy wartość raz, dla każdego wiersza tabeli, podczas odświeżania danych, i zapisuje ją w modelu. Miara nie jest nigdzie zapisana: liczy wynik w chwili wyświetlenia wizualizacji, dla aktualnych filtrów. Z tej różnicy wynika prosta zasada.",
    },
    {
      type: "list",
      items: [
        "Kolumna obliczeniowa opisuje wiersz: próg cenowy produktu, flaga sprzedaży w pełnej cenie, sezon. Używa się jej w fragmentatorach, osiach i filtrach.",
        "Miara opisuje zbiór wierszy: sumę sprzedaży, marżę, sell-through, wskaźnik zwrotów. Każdy wskaźnik będący ilorazem musi być miarą, bo procentów nie da się poprawnie zsumować.",
        "Prosty test: jeśli zsumowanie wartości z kilku wierszy daje błędny wynik, to jest miara, a nie kolumna.",
      ],
    },
    {
      type: "p",
      text: "Pięć miar opisanych niżej korzysta z kilku miar bazowych. Warto je zdefiniować raz i odwoływać się do nich w nawiasach kwadratowych, bez nazwy tabeli, zamiast powtarzać sumy w każdej formule.",
    },
    {
      type: "code",
      caption: "Miary bazowe: sprzedaż netto po zwrotach i koszt sprzedanych towarów (KWS)",
      code: `Sprzedaż netto =
SUM ( Sprzedaz[WartoscNetto] ) - SUM ( Zwroty[WartoscNetto] )

KWS =
SUMX ( Sprzedaz, Sprzedaz[Sztuki] * Sprzedaz[KosztJednostkowy] )
    - SUMX ( Zwroty, Zwroty[Sztuki] * Zwroty[KosztJednostkowy] )`,
    },
    { type: "h2", id: "miara-pokrycia-zapasu", text: "Miara DAX pokrycia zapasu" },
    {
      type: "p",
      text: "Pokrycie zapasu pokazuje, ile okresów sprzedaży mieści się w zapasie na koniec wybranego okresu: przy widoku miesięcznym – ile miesięcy, przy tygodniowym – ile tygodni. Liczę je w wartości, w cenach zakupu, i używam na poziomie kategorii, gdzie porównuje się je z planem zakupów i budżetem open-to-buy.",
    },
    {
      type: "p",
      text: "Zapas to wartość chwilowa, więc nie wolno go sumować po datach. Stan z czterech tygodni miesiąca zsumowany razem dałby czterokrotność zapasu. Miara bierze stan z ostatniego dnia w wybranym okresie, dla którego są dane.",
    },
    {
      type: "code",
      caption: "Zapas na koniec okresu i pokrycie zapasu w DAX",
      code: `Zapas w cenach zakupu =
CALCULATE (
    SUMX ( Zapasy, Zapasy[Sztuki] * Zapasy[KosztJednostkowy] ),
    LASTNONBLANK ( Kalendarz[Data], CALCULATE ( SUM ( Zapasy[Sztuki] ) ) )
)

Pokrycie zapasu =
DIVIDE ( [Zapas w cenach zakupu], [KWS] )`,
    },
    {
      type: "p",
      text: "Przykład: kategoria dzianiny ma na koniec października zapas o wartości 180 000 zł w cenach zakupu, a koszt sprzedanych towarów w październiku wyniósł 90 000 zł. Pokrycie wynosi 2,0: zapas wystarczy na dwa miesiące sprzedaży w obecnym tempie.",
    },
    { type: "h2", id: "sprzedaz-w-pelnej-cenie", text: "Udział sprzedaży w pełnej cenie w DAX" },
    {
      type: "p",
      text: "Udział sprzedaży w pełnej cenie mówi, jaka część przychodu powstała bez obniżki. W modzie to jeden z najważniejszych sygnałów zdrowia sezonu: sprzedaż może rosnąć, ale jeśli rośnie głównie na obniżkach, marża na koniec sezonu będzie niższa od planu.",
    },
    {
      type: "p",
      text: "Tu kolumna obliczeniowa ma sens. Flaga „pełna cena” opisuje pojedynczą transakcję, więc liczę ją dla wiersza, najlepiej już w Power Query: cena sprzedaży równa cenie katalogowej. Miara korzysta z tej flagi jako filtra.",
    },
    {
      type: "code",
      caption: "Udział sprzedaży w pełnej cenie w DAX",
      code: `Sprzedaż w pełnej cenie =
CALCULATE ( [Sprzedaż netto], Sprzedaz[CzyPelnaCena] = TRUE () )

Udział sprzedaży w pełnej cenie % =
DIVIDE ( [Sprzedaż w pełnej cenie], [Sprzedaż netto] )`,
    },
    {
      type: "p",
      text: "Przed napisaniem miary trzeba uzgodnić definicję. Czy rabat z programu lojalnościowego albo kod promocyjny w e-commerce to jeszcze pełna cena? Każda odpowiedź jest dopuszczalna, ale musi być jedna i zapisana w słowniku wskaźników.",
    },
    { type: "h2", id: "wskaznik-zwrotow", text: "Wskaźnik zwrotów w DAX" },
    {
      type: "p",
      text: "Wskaźnik zwrotów to zwrócone sztuki podzielone przez sprzedane sztuki. Problem polega na dacie. W raporcie tygodniowym zwrot liczy się w tygodniu, w którym wrócił, bo wtedy zmienia zapas i przychód. Przy ocenie modelu lepiej przypisać zwrot do tygodnia sprzedaży, bo inaczej model sprzedany w ostatnim tygodniu okresu wygląda na idealny, a jego zwroty trafią do kolejnego. Obie wersje da się obsłużyć jedną tabelą zwrotów z dwiema datami i nieaktywną relacją do kalendarza.",
    },
    {
      type: "code",
      caption: "Wskaźnik zwrotów według daty zwrotu i według daty sprzedaży (nieaktywna relacja Zwroty[DataSprzedazy] – Kalendarz[Data])",
      code: `Wskaźnik zwrotów % =
DIVIDE ( SUM ( Zwroty[Sztuki] ), SUM ( Sprzedaz[Sztuki] ) )

Wskaźnik zwrotów wg daty sprzedaży % =
DIVIDE (
    CALCULATE ( SUM ( Zwroty[Sztuki] ), USERELATIONSHIP ( Zwroty[DataSprzedazy], Kalendarz[Data] ) ),
    SUM ( Sprzedaz[Sztuki] )
)`,
    },
    { type: "h2", id: "tygodnie-zapasu", text: "Tygodnie zapasu w DAX" },
    {
      type: "p",
      text: "Tygodnie zapasu to operacyjna wersja pokrycia: zapas w sztukach podzielony przez średnią sprzedaż tygodniową z ostatnich czterech tygodni. Używa się jej na poziomie modelu i koloru, w cotygodniowej rozmowie o uzupełnieniach, przesunięciach i obniżkach. Średnia z czterech tygodni wygładza pojedyncze wahania, a jednocześnie szybko reaguje na zmianę tempa sprzedaży.",
    },
    {
      type: "code",
      caption: "Tygodnie zapasu w DAX: zapas w sztukach i średnia sprzedaż z 28 dni przed końcem wybranego okresu",
      code: `Zapas szt. =
CALCULATE (
    SUM ( Zapasy[Sztuki] ),
    LASTNONBLANK ( Kalendarz[Data], CALCULATE ( SUM ( Zapasy[Sztuki] ) ) )
)

Tygodnie zapasu =
VAR Koniec = MAX ( Kalendarz[Data] )
VAR Sprzedaz4Tyg =
    CALCULATE ( SUM ( Sprzedaz[Sztuki] ), DATESINPERIOD ( Kalendarz[Data], Koniec, -28, DAY ) )
RETURN
    DIVIDE ( [Zapas szt.], Sprzedaz4Tyg / 4 )`,
    },
    {
      type: "p",
      text: "Model z zapasem 1200 sztuk i sprzedażą 600 sztuk w ostatnich czterech tygodniach ma 8 tygodni zapasu. Jeśli do końca sezonu zostało 6 tygodni, część towaru nie sprzeda się w obecnym tempie i trzeba zaplanować działanie. Model bez sprzedaży dostaje pusty wynik zamiast błędu dzięki funkcji DIVIDE; takie modele warto pokazać na osobnej liście.",
    },
    { type: "h2", id: "marza-w-dax", text: "Marża w DAX" },
    {
      type: "p",
      text: "Marża to przychód netto minus koszt sprzedanych towarów, a marża procentowa to ta różnica podzielona przez przychód. Obie kwoty muszą być netto, bez VAT, i obie po zwrotach, co zapewniają miary bazowe. Koszt jednostkowy najlepiej zapisać w wierszu sprzedaży w chwili transakcji. Koszt pobrany z bieżącej karty produktu zmienia historyczne marże po każdej aktualizacji ceny zakupu.",
    },
    {
      type: "code",
      caption: "Marża kwotowa i procentowa w DAX",
      code: `Marża =
[Sprzedaż netto] - [KWS]

Marża % =
DIVIDE ( [Marża], [Sprzedaż netto] )`,
    },
    {
      type: "p",
      text: "Marża procentowa kategorii liczona tą miarą jest automatycznie ważona sprzedażą, bo powstaje z sum, a nie ze średniej z marż modeli. To główny powód, dla którego nie liczę marży w kolumnie obliczeniowej. Różnicę między marżą a narzutem i marżę po obniżkach opisuję szerzej w osobnym artykule o marży i narzucie.",
    },
    { type: "h2", id: "sprawdzenie-miar-dax-w-excelu", text: "Jak sprawdzić miary DAX w Excelu" },
    {
      type: "p",
      text: "Każdą nową miarę sprawdzam, zanim trafi do raportu. Najprościej użyć funkcji „Analizuj w programie Excel”, która łączy tabelę przestawną z modelem semantycznym Power BI. Wybieram mały, dobrze znany wycinek, na przykład jedną kategorię w jednym tygodniu, i liczę ten sam wskaźnik zwykłymi formułami z wierszy danych. Jeśli wyniki się różnią, przyczyną są zwykle relacje w modelu, puste wiersze wymiaru albo brak filtra dat.",
    },
    {
      type: "p",
      text: "Jeśli chcesz, żeby dashboard KPI Twojego zespołu opierał się na jednym zestawie miar z jasnymi definicjami, umów konsultację – odpowiadam w ciągu jednego dnia roboczego.",
    },
  ],
  faqTitle: "Miary DAX w Power BI — najczęstsze pytania",
  faq: [
    {
      question: "Co to jest DAX w Power BI?",
      answer: "DAX to język formuł używany w Power BI, Power Pivot w Excelu i Analysis Services. Służy do tworzenia miar, kolumn obliczeniowych i tabel na podstawie modelu danych. Najważniejsze są miary, bo przeliczają się zgodnie z filtrami, które użytkownik wybiera w raporcie.",
    },
    {
      question: "Czy DAX to język programowania?",
      answer: "DAX jest językiem formuł i zapytań, a nie językiem programowania ogólnego przeznaczenia. Bliżej mu do formuł Excela niż do Pythona: nie tworzy się w nim aplikacji, tylko obliczenia na modelu danych. Trudność polega głównie na zrozumieniu kontekstu filtra i funkcji CALCULATE.",
    },
    {
      question: "Czym różni się miara od kolumny obliczeniowej?",
      answer: "Kolumna obliczeniowa liczy wartość raz dla każdego wiersza podczas odświeżania danych i zajmuje miejsce w modelu. Miara liczy wynik w chwili wyświetlenia, dla aktualnych filtrów: rynku, kategorii czy tygodnia. Wskaźniki takie jak marża czy sell-through powinny być miarami, bo procentów nie da się poprawnie sumować.",
    },
    {
      question: "Jak sprawdzić miarę DAX w Excelu?",
      answer: "Najprościej użyć funkcji „Analizuj w programie Excel”, która łączy tabelę przestawną z modelem semantycznym Power BI. W tabeli przestawnej można zestawić miarę z sumami policzonymi ręcznie dla kilku produktów lub tygodni. Jeśli liczby się różnią, zwykle winne są relacje w modelu albo kontekst filtra.",
    },
  ],
  seo: {
    title: "Miary DAX w Power BI dla dashboardu KPI w handlu",
    description: "Co to jest DAX w Power BI i pięć miar dla dashboardu KPI w handlu: pokrycie zapasu, sprzedaż w pełnej cenie, zwroty, tygodnie zapasu i marża.",
  },
};
