import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("dashboard-examples", "pl"),
  title: "Raport sprzedaży w Power BI: przykłady dashboardów dla handlu",
  h1: { before: "Raport sprzedaży w Power BI:", accent: "przykłady dashboardów dla handlu" },
  excerpt: "Co powinien zawierać raport sprzedaży w Power BI, jak wyglądają strony dashboardu dla handlu i jak zbudować raport tygodniowy.",
  lead:
    "Dobry raport sprzedaży w Power BI odpowiada na trzy pytania: ile sprzedaliśmy w porównaniu z planem i rokiem ubiegłym, co sprzedaje się lepiej lub gorzej od oczekiwań oraz jaki zapas zostaje na resztę sezonu. Poniżej – przykładowe strony takiego dashboardu dla marki modowej i sposób jego projektowania.",
  date: "2026-09-11",
  readingMinutes: 5,
  body: [
    { type: "h2", id: "co-zawiera-raport", text: "Co powinien zawierać raport sprzedaży" },
    {
      type: "p",
      text: "Raport sprzedaży nie jest zbiorem wszystkich dostępnych wykresów. To uzgodniony zestaw wskaźników, które zespół handlowy czyta co tydzień i na podstawie których podejmuje decyzje. W handlu, a zwłaszcza w modzie, zestaw ten jest dość stały.",
    },
    {
      type: "list",
      items: [
        "Sprzedaż netto w wartości i w sztukach, z porównaniem do planu i do tego samego okresu rok wcześniej.",
        "Marża kwotowa i procentowa, najlepiej z podziałem na sprzedaż w pełnej cenie i w obniżce.",
        "Sell-through od początku sezonu na poziomie kategorii i modelu.",
        "Zapas i pokrycie zapasu w tygodniach.",
        "Średnia cena sprzedaży i udział obniżek w przychodzie.",
        "Zwroty, szczególnie w e-commerce, gdzie potrafią istotnie zmienić wynik tygodnia.",
      ],
    },
    {
      type: "p",
      text: "Każdy wskaźnik musi mieć jedną definicję zapisaną w modelu danych, a nie w pojedynczym wizualu. Dzięki temu sell-through na stronie kategorii jest tym samym sell-through co na stronie przeglądu, a finanse i zespół handlowy nie spierają się o liczby.",
    },
    { type: "h2", id: "przyklad-przeglad", text: "Przykład dashboardu sprzedażowego w Power BI: strona przeglądu" },
    {
      type: "p",
      text: "Pierwsza strona raportu to przegląd dla kierownictwa. Zawiera kilka kart z najważniejszymi liczbami i jeden–dwa wykresy trendu. Czas potrzebny na przeczytanie tej strony nie powinien przekraczać minuty.",
    },
    {
      type: "table",
      caption: "Strona przeglądu sprzedaży – elementy i pytania, na które odpowiadają",
      columns: [
        { label: "Element strony", kind: "text" },
        { label: "Co pokazuje", kind: "text" },
        { label: "Pytanie biznesowe", kind: "text" },
      ],
      rows: [
        { cells: ["Karty KPI", "Sprzedaż, marża %, sell-through, pokrycie zapasu", "Czy tydzień był lepszy od planu?"] },
        { cells: ["Wykres liniowy", "Sprzedaż tygodniowa w tym i ubiegłym roku", "Czy trend się poprawia?"] },
        { cells: ["Wykres słupkowy", "Odchylenie od planu według kategorii", "Która kategoria ciągnie wynik w dół?"] },
        { cells: ["Fragmentator", "Sezon, kanał, kraj", "Czy problem dotyczy całej sieci czy jednego kanału?"] },
      ],
    },
    { type: "h2", id: "przyklad-kategorie", text: "Przykład dashboardu Power BI dla przeglądu kategorii" },
    {
      type: "p",
      text: "Druga strona służy kierownikom kategorii. Pokazuje kategorie i modele w tabeli z formatowaniem warunkowym, a kliknięcie kategorii filtruje listę najlepszych i najsłabszych modeli. Tabela poniżej pokazuje, jak może wyglądać jej główna część.",
    },
    {
      type: "table",
      caption: "Przegląd kategorii w raporcie tygodniowym – dane ilustracyjne",
      columns: [
        { label: "Kategoria", kind: "text" },
        { label: "Sprzedaż tygodnia (tys. zł)", kind: "number", format: "bars" },
        { label: "Zmiana rok do roku", kind: "number", suffix: "%" },
        { label: "Sell-through", kind: "number", suffix: "%", format: "scale" },
        { label: "Pokrycie zapasu (tyg.)", kind: "number" },
      ],
      rows: [
        { cells: ["Sukienki", 128, 12, 46, 6.5], trend: "up" },
        { cells: ["Spodnie", 96, -4, 38, 9.2], trend: "down" },
        { cells: ["Dzianina", 74, 3, 29, 11.4], trend: "flat" },
        { cells: ["Okrycia", 152, 18, 22, 14.8], trend: "up" },
        { cells: ["Akcesoria", 31, -9, 51, 5.1], trend: "down" },
      ],
      trendColumn: 2,
    },
    {
      type: "p",
      text: "Z takiej tabeli od razu widać, że okrycia rosną, ale mają niski sell-through i długie pokrycie zapasu, więc wymagają obserwacji przed szczytem sezonu. Akcesoria spadają rok do roku, a pokrycie zapasu jest krótkie – to może oznaczać braki, a nie słaby popyt.",
    },
    { type: "h2", id: "koniec-sezonu", text: "Dashboard Power BI na koniec sezonu" },
    {
      type: "p",
      text: "Trzecia strona jest używana kilka razy w roku, przy podsumowaniu sezonu i planowaniu obniżek. Pokazuje krzywą sell-through tydzień po tygodniu, zapas pozostały na koniec sezonu w wartości i sztukach, marżę przed i po obniżkach oraz modele, które warto powtórzyć w kolejnej kolekcji.",
    },
    {
      type: "list",
      items: [
        "Krzywa sell-through sezonu na tle planu i poprzedniego roku, z zaznaczonymi tygodniami obniżek.",
        "Zapas końcowy według kategorii i wieku towaru, żeby oddzielić bieżącą kolekcję od starszych sezonów.",
        "Marża zrealizowana w porównaniu z marżą początkową – różnica pokazuje koszt obniżek.",
        "Lista modeli do powtórzenia i do wycofania, z sell-through, marżą i zwrotami w jednym wierszu.",
      ],
    },
    {
      type: "p",
      text: "Ta strona odpowiada na pytanie, czy sezon zakończył się zgodnie z planem, i dostarcza danych do budżetu zakupów na kolejny sezon. Dlatego warto zachować jej wersję z zamkniętymi danymi, zamiast nadpisywać ją przy każdym odświeżeniu.",
    },
    { type: "h2", id: "raport-tygodniowy", text: "Raport tygodniowy dla zespołu handlowego" },
    {
      type: "p",
      text: "Raport tygodniowy to rytm pracy działu handlowego. Dane z zamkniętego tygodnia powinny być gotowe w pierwszy dzień roboczy nowego tygodnia, zanim odbędzie się spotkanie handlowe. Dobrze działa stały układ:",
    },
    {
      type: "list",
      items: [
        "Podsumowanie tygodnia w trzech–czterech zdaniach, pisane przez analityka, a nie generowane z wykresów.",
        "Wynik względem planu i roku ubiegłego dla całej marki, kanałów i krajów.",
        "Najlepsze i najsłabsze modele tygodnia z informacją o zapasie i pokryciu.",
        "Lista działań: uzupełnienia, przesunięcia towaru między sklepami, propozycje obniżek.",
        "Status działań z poprzedniego tygodnia.",
      ],
    },
    {
      type: "p",
      text: "Porównanie rok do roku w handlu robi się tydzień do tygodnia, a nie data do daty. Tydzień z tym samym układem weekendów daje uczciwe porównanie, dlatego tabela kalendarza w modelu powinna mieć kolumny roku handlowego i numeru tygodnia.",
    },
    { type: "h2", id: "projekt-krok-po-kroku", text: "Projekt dashboardu Power BI krok po kroku" },
    {
      type: "list",
      items: [
        "Krok 1. Zebranie decyzji, a nie wykresów: jakie decyzje zespół podejmuje co tydzień i jakich liczb do tego potrzebuje.",
        "Krok 2. Słownik wskaźników: nazwa, wzór, źródło danych i właściciel każdej definicji.",
        "Krok 3. Model danych w schemacie gwiazdy: tabele faktów sprzedaży i zapasów oraz wymiary produktu, sklepu i kalendarza.",
        "Krok 4. Miary DAX dla wszystkich wskaźników ze słownika, zamiast kolumn obliczeniowych.",
        "Krok 5. Szkic stron na papierze lub w PowerPoincie i akceptacja układu przez użytkowników.",
        "Krok 6. Budowa stron, testy z danymi z zamkniętego tygodnia i porównanie z dotychczasowym raportem.",
        "Krok 7. Harmonogram odświeżania, uprawnienia (np. RLS dla krajów) i krótka instrukcja dla zespołu.",
      ],
    },
    {
      type: "p",
      text: "Najwięcej czasu zajmują kroki 1–3. Dashboard zbudowany na niespójnych definicjach wygląda dobrze, ale po kilku tygodniach zespół wraca do Excela, bo liczby nie zgadzają się z innymi raportami.",
    },
    {
      type: "p",
      text: "Źródła danych w handlu są zwykle trzy: system kasowy i sklep internetowy (sprzedaż i zwroty), system magazynowy lub ERP (zapasy i dostawy) oraz plik z planem, często w Excelu. Plan warto trzymać w tym samym układzie co dane rzeczywiste – kategoria, kanał, tydzień – bo inaczej porównanie z planem wymaga ręcznych przeliczeń.",
    },
    { type: "h2", id: "zasady-dashboardu", text: "Zasady czytelnego dashboardu sprzedaży w Power BI" },
    {
      type: "list",
      items: [
        "Jedna strona – jedno pytanie. Strona, która próbuje odpowiedzieć na wszystko, nie odpowiada na nic.",
        "Najważniejsze liczby w lewym górnym rogu, szczegóły niżej i po prawej.",
        "Zawsze punkt odniesienia: plan, rok ubiegły albo średnia. Sama liczba sprzedaży nic nie mówi.",
        "Kolor tylko dla odchyleń: zielony i czerwony zarezerwowane dla wyniku względem planu, reszta w neutralnych barwach.",
        "Te same filtry w tym samym miejscu na każdej stronie.",
        "Nazwy wskaźników ze słownika, bez skrótów zrozumiałych tylko dla autora raportu.",
      ],
    },
    { type: "h2", id: "miary-dax", text: "Miary DAX do raportu sprzedaży w Power BI" },
    {
      type: "p",
      text: "Poniższe miary tworzą podstawę raportu. Porównanie rok do roku używa funkcji SAMEPERIODLASTYEAR, która wymaga tabeli kalendarza oznaczonej jako tabela dat; przy kalendarzu handlowym zastępuje się ją filtrem po numerze tygodnia i roku handlowym.",
    },
    {
      type: "code",
      caption: "Przykładowe miary DAX dla raportu sprzedaży (nazwy tabel i kolumn ilustracyjne)",
      code: `Sprzedaż netto = SUM ( Sprzedaz[WartoscNetto] )

Sprzedaż rok temu =
CALCULATE ( [Sprzedaż netto], SAMEPERIODLASTYEAR ( Kalendarz[Data] ) )

Zmiana rdr % =
DIVIDE ( [Sprzedaż netto] - [Sprzedaż rok temu], [Sprzedaż rok temu] )

Sell-through % =
DIVIDE (
    SUM ( Sprzedaz[Sztuki] ),
    SUM ( Zapasy[ZapasPoczatkowy] ) + SUM ( Dostawy[Sztuki] )
)`,
    },
    {
      type: "p",
      text: "Jeśli chcesz uporządkować raport sprzedaży w Power BI dla swojego zespołu, umów konsultację – odpowiadam w ciągu jednego dnia roboczego.",
    },
  ],
  faqTitle: "Raport sprzedaży w Power BI – najczęstsze pytania",
  faq: [
    {
      question: "Co powinien zawierać raport sprzedaży?",
      answer:
        "Raport sprzedaży w handlu powinien pokazywać sprzedaż w wartości i sztukach względem planu i roku ubiegłego, marżę, sell-through, zapas z pokryciem w tygodniach oraz zwroty. Każdy wskaźnik powinien mieć jedną, zapisaną definicję. Dodatkowo warto dołączyć krótkie podsumowanie tygodnia i listę działań.",
    },
    {
      question: "Jak zrobić dashboard w Power BI?",
      answer:
        "Pracę zaczyna się od listy decyzji, które dashboard ma wspierać, i słownika wskaźników. Następnie buduje się model danych w schemacie gwiazdy, miary DAX i dopiero na końcu strony raportu. Przed wdrożeniem wyniki porównuje się z dotychczasowym raportem na danych z zamkniętego tygodnia.",
    },
    {
      question: "Czym różni się raport od dashboardu w Power BI?",
      answer:
        "W Power BI raport to plik z jedną lub wieloma interaktywnymi stronami opartymi na jednym modelu danych. Dashboard w usłudze Power BI to jedna strona z kafelkami przypiętymi z różnych raportów. W potocznym języku „dashboardem” nazywa się też stronę przeglądu w raporcie.",
    },
    {
      question: "Power BI czy Excel do raportu sprzedaży?",
      answer:
        "Excel wystarcza przy małej liczbie produktów, jednym źródle danych i kilku odbiorcach. Power BI jest lepszy, gdy dane pochodzą z kilku systemów, raport ma się odświeżać automatycznie, a różne osoby mają widzieć różne zakresy danych. Wiele zespołów łączy oba narzędzia: Power BI do raportowania, Excel do planowania.",
    },
    {
      question: "Jak często odświeżać raport sprzedaży w Power BI?",
      answer:
        "Raport tygodniowy odświeża się po zamknięciu tygodnia, tak aby był gotowy w pierwszy dzień roboczy. Widok dzienny przydaje się w szczycie sezonu i w czasie wyprzedaży. Harmonogram odświeżania ustawia się w usłudze Power BI zgodnie z godziną ładowania danych źródłowych.",
    },
  ],
  seo: {
    title: "Raport sprzedaży w Power BI: przykłady dashboardów",
    description:
      "Raport sprzedaży w Power BI dla handlu: co powinien zawierać, przykłady stron dashboardu, raport tygodniowy dla zespołu handlowego i miary DAX.",
  },
};
