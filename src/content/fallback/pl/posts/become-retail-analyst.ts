import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("become-retail-analyst", "pl"),
  title: "Jak zostać analitykiem w handlu i modzie: role, umiejętności, pierwsze kroki",
  h1: { before: "Jak zostać analitykiem w handlu i modzie:", accent: "role, umiejętności, pierwsze kroki" },
  excerpt: "Czym zajmuje się analityk danych w handlu, kim są kupiec, merchandiser i category manager i od czego zacząć w tej branży.",
  lead: "Analityk w handlu zamienia dane o sprzedaży, zapasie i cenach w decyzje zakupowe i handlowe, a zostaje się nim zwykle przez naukę Excela i Power BI oraz praktykę w dziale zakupów, planowania lub sprzedaży. W modzie ta rola ściśle współpracuje z kupcem, merchandiserem i category managerem.",
  date: "2026-05-05",
  readingMinutes: 5,
  body: [
    { type: "h2", id: "analityk-danych-w-handlu", text: "Czym zajmuje się analityk danych w handlu" },
    {
      type: "p",
      text: "Analityk w handlu odpowiada na pytania, od których zależą pieniądze: co się sprzedaje, co zalega, ile kupić na kolejny sezon, kiedy obniżyć cenę i które sklepy potrzebują więcej towaru. Nie jest to praca „obok biznesu”. Dobry analityk siedzi na tych samych spotkaniach co kupcy i merchandiserzy, tylko przychodzi na nie z liczbami.",
    },
    {
      type: "p",
      text: "Tydzień pracy analityka w sieci handlowej lub marce modowej wygląda mniej więcej tak:",
    },
    {
      type: "list",
      items: [
        "Raport tygodniowy: sprzedaż, marża, sell-through i pokrycie zapasu na tle planu i zeszłego roku, zwykle w Power BI lub w Excelu.",
        "Analizy na zamówienie: dlaczego kategoria spadła, które modele obniżyć, jak zadziałała promocja, co sprzedaje się w nowym sklepie.",
        "Wsparcie planowania: dane do planu zakupów, prognozy sprzedaży, krzywe rozmiarów, podział budżetu między kategorie.",
        "Ceny: kontrola marż, architektura cenowa, porównania cen między kanałami lub rynkami.",
        "Jakość danych: sprawdzanie, czy produkty mają poprawne atrybuty, kategorie i ceny, bo bez tego każdy raport będzie błędny.",
      ],
    },
    {
      type: "p",
      text: "Proporcje zależą od firmy. W mniejszej marce analityk robi wszystko sam, od pobrania danych po prezentację wniosków. W dużej sieci są osobne zespoły raportowe, planistyczne i cenowe, a analityk specjalizuje się w jednym obszarze.",
    },
    { type: "h2", id: "kupiec-merchandiser-category-manager", text: "Kupiec, merchandiser i category manager — kto to i czym się różnią" },
    {
      type: "p",
      text: "Słownikowo kupiec to osoba, która trudni się handlem. W firmie handlowej to nazwa stanowiska, po angielsku buyer: osoba, która wybiera produkty do asortymentu, negocjuje ceny i warunki z dostawcami oraz decyduje o ilościach zakupu. W modzie kupiec odpowiada za kolekcję w swojej kategorii i jej wynik sprzedażowy. Obok niego pracują merchandiser, category manager i analityk – i to z nimi analityk współpracuje najczęściej.",
    },
    {
      type: "table",
      caption: "Role w dziale handlowym marki modowej – typowy podział, który w konkretnych firmach może wyglądać inaczej",
      columns: [
        { label: "Rola", kind: "text" },
        { label: "Główne pytanie", kind: "text" },
        { label: "Typowe decyzje", kind: "text" },
      ],
      rows: [
        { cells: ["Kupiec (buyer)", "Jakie produkty mamy sprzedawać?", "Wybór modeli, dostawcy, cena zakupu, ilości"] },
        { cells: ["Merchandiser (planista)", "Ile kupić i gdzie ma trafić towar?", "Budżety zakupowe, open to buy, alokacja, uzupełnienia"] },
        { cells: ["Category manager", "Jak kategoria ma zarabiać?", "Rola kategorii, asortyment, ceny, promocje, cele"] },
        { cells: ["Analityk", "Co mówią dane i co z nich wynika?", "Raporty, prognozy, rekomendacje dla pozostałych ról"] },
      ],
    },
    {
      type: "p",
      text: "Zakres tych ról bardzo różni się między firmami. W jednej marce merchandiser planuje budżet i alokację, w innej to samo stanowisko oznacza osobę, która układa ekspozycję w sklepie (visual merchandiser). Category manager w handlu spożywczym negocjuje z producentami, a w modzie jego zadania często przejmuje starszy kupiec. Dlatego przy szukaniu pierwszej pracy warto czytać opis obowiązków, a nie sam tytuł stanowiska. Więcej o samym zarządzaniu kategorią piszę w artykule o category management w handlu modowym.",
    },
    { type: "h2", id: "umiejetnosci-analityka-w-handlu", text: "Umiejętności analityka w handlu: Excel, Power BI, SQL" },
    {
      type: "p",
      text: "Narzędzia są ważne, ale na rozmowie kwalifikacyjnej częściej odpada się przez brak rozumienia biznesu niż przez nieznajomość formuły. Analityk, który wie, czym jest marża, sell-through i rotacja zapasów, szybko nauczy się nowego narzędzia. Odwrotnie bywa trudniej.",
    },
    {
      type: "list",
      items: [
        "Excel: tabele przestawne, WYSZUKAJ.X lub WYSZUKAJ.PIONOWO, SUMA.WARUNKÓW, JEŻELI, formatowanie warunkowe, Power Query do łączenia i czyszczenia danych. To wciąż podstawowe narzędzie w każdym dziale zakupów.",
        "Power BI: model danych z tabelą faktów i wymiarami, podstawy języka DAX (miary, porównanie z zeszłym rokiem), czytelny dashboard. W wielu firmach zastępuje ręczne raporty w Excelu.",
        "SQL: pobieranie danych z hurtowni bez czekania na eksport z IT. Na start wystarczą SELECT, WHERE, GROUP BY i JOIN.",
        "Wskaźniki handlowe: marża i narzut, sell-through, rotacja zapasów, pokrycie zapasu, GMROI, open to buy, sprzedaż like-for-like.",
        "Komunikacja: wniosek w jednym zdaniu i rekomendacja, co zrobić, zamiast tabeli z czterdziestoma kolumnami.",
      ],
    },
    {
      type: "p",
      text: "Python przydaje się przy dużych zbiorach danych i automatyzacji, ale w analityce handlowej nie jest warunkiem wejścia. Moim zdaniem kolejność nauki powinna wyglądać tak: Excel do poziomu swobodnej pracy z tabelami przestawnymi i Power Query, wskaźniki handlowe, Power BI, a potem SQL. Tak przygotowana osoba może zacząć pracę w dziale sprzedaży, zakupów lub alokacji i od pierwszego tygodnia robić coś przydatnego.",
    },
    {
      type: "p",
      text: "Najprostszy test, czy rozumiesz dane handlowe, to samodzielne policzenie kilku wskaźników na małym zbiorze. Na przykład: model kupiony w 500 sztukach sprzedał 320 sztuk w pełnej cenie i 80 w obniżce. Sell-through wynosi 400 ÷ 500 = 80%, ale tylko 64% zakupu sprzedało się w pełnej cenie. Analityk powinien umieć powiedzieć, co ta różnica oznacza dla marży i dla planu zakupu na kolejny sezon.",
    },
    {
      type: "p",
      text: "Warto też wiedzieć, skąd biorą się dane. W handlu modowym analityk pracuje zwykle z kilkoma źródłami: systemem sprzedaży (paragony i zamówienia internetowe), systemem magazynowym (zapas i dostawy), systemem ERP (zakupy i koszty) oraz systemem PLM lub PIM, w którym zapisane są atrybuty produktu – kategoria, kolor, skład, sezon. Połowa problemów w raportach wynika z tego, że te systemy nie mówią tym samym językiem, dlatego umiejętność łączenia i sprawdzania danych jest równie cenna jak ładny dashboard.",
    },
    { type: "h2", id: "analityk-danych-w-branzy-modowej", text: "Jak zostać analitykiem danych w branży modowej" },
    {
      type: "p",
      text: "Nie ma jednej drogi. Studia z ekonomii, logistyki, zarządzania lub informatyki pomagają, ale nie są warunkiem. W handlu liczy się to, czy umiesz pracować z danymi sprzedażowymi i rozumiesz, jak powstaje wynik sklepu. Moja droga dobrze to pokazuje. Skończyłam logistykę, a pierwszą pracę analityczną podjęłam w sieci sklepów z materiałami budowlanymi, gdzie w latach 2014–2017 raportowałam sprzedaż i wspierałam planowanie. Potem pracowałam z raportami dla wielu marek modowych, sell-through i wynikami najemców, a następnie przez cztery lata zajmowałam się strukturą asortymentu i cen dla dystrybuowanych marek. Od 2022 roku pracuję jako Global Brand Analyst & Product Data Lead w międzynarodowej marce modowej.",
    },
    {
      type: "p",
      text: "Wniosek z tej drogi jest prosty: nie trzeba zaczynać w modzie. Mechanika handlu – sprzedaż, zapas, marża, sezonowość – jest podobna w każdej branży, a moda dodaje do niej rozmiary, kolory i krótki cykl życia produktu. Pierwsze kroki, które zalecam:",
    },
    {
      type: "list",
      items: [
        "Opanuj Excel na danych handlowych, nie na abstrakcyjnych ćwiczeniach: sprzedaż tygodniowa, zapas, ceny, rozmiary.",
        "Zbuduj jeden projekt od początku do końca, na przykład raport sprzedaży w Power BI z porównaniem do zeszłego roku i analizą ABC asortymentu. Taki projekt lepiej pokazuje umiejętności niż lista certyfikatów.",
        "Szukaj stanowisk blisko danych: asystent kupca, specjalista ds. alokacji, młodszy analityk sprzedaży, praca w centrali sieci handlowej. W wielu firmach analitycy wyrastają z tych ról.",
        "Automatyzuj to, co robisz ręcznie. Osoba, która zamieniła cotygodniowe kopiowanie danych w odświeżany raport, szybko staje się tą, która odpowiada za raportowanie.",
        "Ucz się od kupców i merchandiserów. Pytaj, jakie decyzje podejmują na podstawie Twoich liczb – to najlepsza szkoła myślenia handlowego.",
      ],
    },
    {
      type: "p",
      text: "Pytanie o zarobki pojawia się zawsze. Wynagrodzenie analityka w handlu, kupca czy merchandisera zależy od miasta, wielkości firmy, zakresu odpowiedzialności i poziomu doświadczenia, dlatego nie podaję tu kwot. Z mojej perspektywy najszybciej rośnie wartość osoby, która łączy umiejętności techniczne z rozumieniem asortymentu i cen, bo taka osoba może przejść zarówno w stronę planowania, jak i zarządzania kategorią.",
    },
    {
      type: "p",
      text: "Jeśli chcesz uporządkować raportowanie w swoim zespole handlowym albo przygotować analityków do pracy z danymi o asortymencie i cenach, umów konsultację – odpowiadam w ciągu jednego dnia roboczego.",
    },
  ],
  faqTitle: "Praca analityka w handlu — najczęstsze pytania",
  faq: [
    {
      question: "Jak zostać analitykiem danych w handlu?",
      answer: "Podstawą jest dobra znajomość Excela (tabele przestawne, wyszukiwanie danych, formuły warunkowe), a następnie Power BI lub innego narzędzia do raportów. Równie ważne jest rozumienie wskaźników handlowych, takich jak marża, sell-through i rotacja zapasu. Wiele osób zaczyna w dziale sprzedaży, zakupów lub alokacji i stopniowo przejmuje raportowanie.",
    },
    {
      question: "Kupiec — kto to jest w handlu?",
      answer: "Kupiec (buyer) wybiera produkty do asortymentu, negocjuje z dostawcami ceny i warunki oraz decyduje o ilościach zakupu. W modzie odpowiada za kolekcję w swojej kategorii i jej wynik sprzedażowy. Pracuje na danych przygotowanych przez analityków i merchandiserów.",
    },
    {
      question: "Czym różni się merchandiser od category managera?",
      answer: "Merchandiser w modzie planuje ilości, budżety zakupowe i dystrybucję towaru do sklepów, pilnując, by zapas odpowiadał sprzedaży. Category manager odpowiada za całą kategorię jako biznes: asortyment, ceny, promocje i wynik finansowy. Zakres obu ról różni się między firmami, dlatego warto czytać opis obowiązków, a nie sam tytuł stanowiska.",
    },
    {
      question: "Czy analityk w handlu musi znać SQL?",
      answer: "Na początku wystarczy biegły Excel i podstawy Power BI, ale SQL szybko staje się przydatny przy dużych zbiorach danych. Pozwala samodzielnie pobierać dane z hurtowni zamiast czekać na eksport z działu IT. W większych firmach handlowych znajomość SQL jest coraz częściej standardem.",
    },
  ],
  seo: {
    title: "Jak zostać analitykiem danych w handlu i modzie",
    description: "Czym zajmuje się analityk danych w handlu, kim jest kupiec, merchandiser i category manager, jakich umiejętności wymagają te role i jak zacząć.",
  },
};
