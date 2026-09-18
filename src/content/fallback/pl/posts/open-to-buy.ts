import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("open-to-buy", "pl"),
  title: "Budżet open-to-buy w Excelu: wzór i model, który zespół utrzyma",
  h1: { before: "Budżet open-to-buy w Excelu: wzór i", accent: "model, który zespół utrzyma" },
  excerpt: "Czym jest budżet open-to-buy, jak go obliczyć na przykładzie i jak zbudować w Excelu model zakupów na cały sezon.",
  lead: "Open to buy (OTB) to kwota, za którą można jeszcze kupić towar w danym okresie, tak aby zrealizować plan sprzedaży i nie przekroczyć planowanego zapasu. Liczy się ją jako planowaną sprzedaż plus obniżki plus zapas końcowy, minus zapas początkowy i już zamówione dostawy.",
  date: "2026-07-14",
  readingMinutes: 5,
  body: [
    { type: "h2", id: "co-oznacza-open-to-buy", text: "Co oznacza open to buy w handlu" },
    {
      type: "p",
      text: "Open to buy to budżet zakupowy działu handlowego, ale liczony inaczej niż zwykły budżet kosztów. Nie mówi, ile firma chce wydać, tylko ile może jeszcze kupić, żeby zapas na koniec okresu był taki, jak w planie. Kwota „otwarta do zakupu” zmienia się więc w trakcie sezonu razem ze sprzedażą: gdy klienci kupują szybciej, niż zakładał plan, budżet rośnie, a gdy wolniej – maleje.",
    },
    {
      type: "p",
      text: "W handlu modowym open to buy jest szczególnie ważny, bo kolekcję zamawia się z wyprzedzeniem kilku miesięcy, a na sezon zostawia się zwykle część budżetu na dokupienie bestsellerów i reakcję na trendy. Bez OTB łatwo o dwa kosztowne błędy: przekupienie, które kończy się głębokimi obniżkami, albo zbyt ostrożny zakup i puste półki w szczycie sezonu.",
    },
    {
      type: "p",
      text: "Budżet OTB planuje się osobno dla każdej kategorii i każdego miesiąca, a w sieciach działających w kilku krajach także dla każdego rynku. Kupiec widzi wtedy nie jedną kwotę na sezon, ale konkretny limit: ile może zamówić sukienek z dostawą w kwietniu na danym rynku.",
    },
    { type: "h2", id: "wzor-na-open-to-buy", text: "Wzór na open to buy z przykładem" },
    { type: "formula", text: "OTB = planowana sprzedaż + planowane obniżki + planowany zapas końcowy − zapas początkowy − zamówione dostawy" },
    {
      type: "p",
      text: "Logika jest prosta. Pierwsze trzy składniki to potrzeba towaru w okresie: to, co sprzedamy, to, o ile obniżki zmniejszą wartość zapasu, i to, co ma zostać na półkach na start kolejnego miesiąca. Dwa ostatnie to towar, który już mamy albo który już zamówiliśmy. Różnica to kwota, którą można jeszcze wydać.",
    },
    {
      type: "p",
      text: "Przykład dla kategorii sukienek w lutym, w cenach detalicznych netto: planowana sprzedaż 100 000 zł, planowane obniżki 8000 zł, planowany zapas na koniec lutego 60 000 zł, zapas na początek lutego 70 000 zł i dostawy już zamówione 20 000 zł. Budżet open-to-buy wynosi 100 000 + 8000 + 60 000 − 70 000 − 20 000 = 78 000 zł.",
    },
    {
      type: "p",
      text: "Wszystkie składniki muszą być w tej samej wycenie. W wycenie detalicznej obniżki są osobną pozycją, bo zmniejszają wartość zapasu bez sprzedaży sztuki. Kupiec zamawia jednak w cenach zakupu, dlatego budżet detaliczny przelicza się na zakupowy przez marżę początkową: OTB w cenach zakupu ≈ OTB w cenach detalicznych × (1 − marża początkowa). Przy marży początkowej 60% budżet 78 000 zł w cenach detalicznych to około 31 200 zł w cenach zakupu.",
    },
    {
      type: "calculator",
      kind: "openToBuy",
      title: "Kalkulator budżetu open-to-buy",
      labels: {
        sales: "Planowana sprzedaż",
        markdowns: "Planowane obniżki",
        endStock: "Planowany zapas na koniec okresu",
        openingStock: "Zapas na początek okresu",
        onOrder: "Zamówione dostawy",
        otb: "Budżet open-to-buy",
      },
      note: "OTB = planowana sprzedaż + planowane obniżki + planowany zapas na koniec okresu − zapas na początek okresu − zamówione dostawy. Wszystkie wartości w tej samej walucie i w tych samych cenach (detalicznych lub zakupu). Dane nie są nigdzie wysyłane.",
    },
    {
      type: "p",
      text: "Najtrudniejszym składnikiem jest planowany zapas końcowy. Najczęściej wyznacza się go ze wskaźnika zapasu do sprzedaży: zapas na koniec miesiąca to planowana sprzedaż następnego miesiąca pomnożona przez uzgodniony wskaźnik. Jeśli w marcu planujemy 120 000 zł sprzedaży, a wskaźnik wynosi 0,5, zapas na koniec lutego powinien wynosić 60 000 zł. Wskaźnik ustala się na podstawie historii kategorii i zmienia w ciągu sezonu: przed szczytem jest wyższy, pod koniec sezonu niższy.",
    },
    {
      type: "table",
      caption: "Plan open-to-buy kategorii sukienek na cztery miesiące, w cenach detalicznych netto (zł) – dane ilustracyjne",
      columns: [
        { label: "Miesiąc", kind: "text" },
        { label: "Sprzedaż", kind: "number" },
        { label: "Obniżki", kind: "number" },
        { label: "Zapas końcowy", kind: "number" },
        { label: "Zapas początkowy", kind: "number" },
        { label: "Zamówione", kind: "number" },
        { label: "Open to buy", kind: "number", format: "bars" },
      ],
      rows: [
        { cells: ["Luty", 100000, 8000, 60000, 70000, 20000, 78000] },
        { cells: ["Marzec", 120000, 6000, 75000, 60000, 90000, 51000] },
        { cells: ["Kwiecień", 130000, 10000, 70000, 75000, 40000, 95000] },
        { cells: ["Maj", 110000, 14000, 55000, 70000, 0, 109000] },
      ],
    },
    {
      type: "p",
      text: "Zapas początkowy każdego miesiąca to zapas końcowy poprzedniego. Marzec ma najniższy budżet, bo większość towaru jest już zamówiona. Maj ma najwyższy, bo nie ma w nim jeszcze żadnych zamówień – to przestrzeń na dokupienie modeli, które sprawdzą się w pierwszych tygodniach sezonu. Ujemny wynik w którymkolwiek miesiącu oznacza przekupienie: zamówiono więcej, niż pozwala plan zapasu.",
    },
    { type: "h2", id: "struktura-skoroszytu-otb", text: "Struktura skoroszytu open-to-buy w Excelu" },
    {
      type: "p",
      text: "Model OTB w Excelu żyje cały sezon i przechodzi przez ręce kilku osób, dlatego jego struktura jest ważniejsza niż elegancja formuł. Pracowałam z wieloma skoroszytami, które po dwóch sezonach rozumiał już tylko autor. Układ, który zespoły są w stanie utrzymać, ma zwykle pięć arkuszy:",
    },
    {
      type: "list",
      items: [
        "Parametry: lista kategorii, rynków i miesięcy, wskaźniki zapasu do sprzedaży i marża początkowa dla kategorii. Jedyne miejsce, w którym zmienia się założenia.",
        "Plan: planowana sprzedaż i obniżki według kategorii, rynku i miesiąca, w tym samym układzie co dane rzeczywiste.",
        "Zamówienia: eksport otwartych zamówień z systemu, wklejany co tydzień w całości albo ładowany przez Power Query, bez ręcznych poprawek.",
        "Rzeczywiste: sprzedaż i zapas z ostatniego zamkniętego tygodnia.",
        "OTB: arkusz wynikowy z formułami, w którym nikt niczego nie wpisuje ręcznie, oraz na górze wyniki kontroli.",
      ],
    },
    {
      type: "code",
      caption: "Przykładowe formuły arkusza OTB (polska wersja Excela): nazwa kategorii w komórce A5, miesiące od kolumny C (nazwy w wierszu 4), wiersze 6–7 to plan sprzedaży i obniżek, wiersz 9 to planowany zapas końcowy.",
      code: `Zamówione dostawy (wiersz 10):
=SUMA.WARUNKÓW(Zamowienia[Wartosc];Zamowienia[Kategoria];$A$5;Zamowienia[MiesiacDostawy];C$4)

Zapas początkowy (wiersz 8), od drugiego miesiąca = zapas końcowy poprzedniego:
=B9

Open to buy (wiersz 11):
=C6+C7+C9-C8-C10

Open to buy w cenach zakupu (wiersz 12):
=C11*(1-WYSZUKAJ.PIONOWO($A$5;Parametry!$A:$C;3;FAŁSZ))`,
    },
    {
      type: "p",
      text: "Zasada, której pilnuję w każdym modelu: jedna formuła na cały wiersz, bez wyjątków wpisanych ręcznie w pojedyncze komórki. Jeśli któryś miesiąc wymaga korekty, zmienia się założenie w arkuszu parametrów albo planu, a nie wynik w arkuszu OTB.",
    },
    { type: "h2", id: "kontrole-budzetu-otb", text: "Trzy kontrole, które zatrzymują rozjazd budżetu OTB" },
    {
      type: "p",
      text: "Rozjazd budżetu zakupowego dzieje się po cichu: ktoś nadpisze zapas końcowy, zamówienie policzy się dwa razy, w pliku zostanie stary eksport sprzedaży. Trzy proste kontrole wyłapują większość takich sytuacji. Umieszczam je na pierwszym arkuszu, który widzi każdy użytkownik.",
    },
    {
      type: "list",
      items: [
        "Ciągłość zapasu: zapas końcowy każdego miesiąca równa się zapasowi początkowemu następnego, dla każdej kategorii i rynku. Każda różnica oznacza liczbę wpisaną ręcznie.",
        "Zgodność zamówień: suma zamówionych dostaw w modelu równa się sumie z ostatniego eksportu zamówień. Różnica oznacza brakujące albo zdublowane zamówienie.",
        "Zgodność z budżetem: suma planu miesięcznego równa się zatwierdzonemu budżetowi sezonu, a dane rzeczywiste są wczytane do ostatniego zamkniętego tygodnia.",
      ],
    },
    {
      type: "p",
      text: "Budżet open-to-buy aktualizuję co tydzień w trakcie sezonu, po zamknięciu danych o sprzedaży i dostawach, a prognozę pozostałych miesięcy – co miesiąc. Jeśli sprzedaż wyprzedza plan, rośnie OTB na kolejne miesiące; jeśli zostaje w tyle, budżet maleje. Kupiec powinien o tym wiedzieć przed złożeniem kolejnego zamówienia, a nie po nim. Przy rzadszej aktualizacji zespół kupuje według nieaktualnych liczb.",
    },
    {
      type: "p",
      text: "Warto też patrzeć na OTB razem z sell-through i pokryciem zapasu. Budżet mówi, ile można kupić, a sell-through na poziomie modeli podpowiada, na co go wydać: na dokupienie modeli sprzedających się szybciej od planu, a nie na kolejne warianty tych, które zalegają.",
    },
    { type: "h2", id: "szablon-open-to-buy", text: "Darmowy szablon open-to-buy w Excelu" },
    {
      type: "p",
      text: "Jeśli nie chcesz budować skoroszytu od zera, na stronie z darmowymi szablonami można pobrać szablon Excel open-to-buy, wysyłany e-mailem. Działa według logiki opisanej w tym artykule: rozkłada zakupy na miesiące, kategorie i rynki, liczy marżę i zawiera trzy kontrole przeciw rozjazdowi budżetu, z gotowymi formułami. Wystarczy zmienić nazwy kategorii i rynków na własne, wpisać plan i wkleić eksport zamówień.",
    },
    {
      type: "p",
      text: "Gdy arkusz przestaje wystarczać, na przykład dlatego, że kilku planistów edytuje go jednocześnie albo rynków przybywa, pomagam zespołom przebudować model tak, żeby zachować logikę, którą planiści już znają. Jeśli chcesz o tym porozmawiać, umów konsultację – odpowiadam w ciągu jednego dnia roboczego.",
    },
  ],
  faqTitle: "Open to buy — najczęstsze pytania",
  faq: [
    {
      question: "Co to jest open to buy?",
      answer: "Open to buy to budżet zakupowy na dany okres: wartość towaru, którą dział zakupów może jeszcze zamówić bez przekroczenia planu zapasu. Stosuje się go w handlu sezonowym, zwłaszcza w modzie, gdzie zakupy planuje się z wyprzedzeniem. Budżet liczy się osobno dla kategorii i miesięcy.",
    },
    {
      question: "Jak obliczyć budżet open-to-buy?",
      answer: "Do planowanej sprzedaży dodaje się planowane obniżki i planowany zapas na koniec okresu, a następnie odejmuje zapas na początek okresu i dostawy już zamówione. Przykład: 100 000 + 8 000 + 60 000 − 70 000 − 20 000 daje 78 000 zł budżetu. Wszystkie składniki muszą być w tej samej wycenie, detalicznej albo zakupowej.",
    },
    {
      question: "Jak często aktualizować budżet zakupowy?",
      answer: "Budżet open-to-buy warto aktualizować co tydzień lub przynajmniej co miesiąc, po zamknięciu danych o sprzedaży i dostawach. Jeśli sprzedaż odbiega od planu, zmienia się planowany zapas końcowy, a z nim kwota do wydania. Rzadsza aktualizacja sprawia, że zespół kupuje według nieaktualnych liczb.",
    },
  ],
  seo: {
    title: "Open to buy w handlu: wzór i model w Excelu",
    description: "Czym jest budżet open-to-buy, jak go obliczyć na przykładzie i jak zbudować w Excelu model zakupów, który zespół utrzyma przez cały sezon.",
  },
};
