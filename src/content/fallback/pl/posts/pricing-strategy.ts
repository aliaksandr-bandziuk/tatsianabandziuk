import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("pricing-strategy", "pl"),
  title: "Strategie cenowe i polityka cenowa w handlu detalicznym",
  h1: { before: "Strategie cenowe i polityka cenowa", accent: "w handlu detalicznym" },
  excerpt: "Czym jest polityka cenowa, jakie strategie cenowe i metody ustalania cen stosuje handel detaliczny i jak planować obniżki.",
  lead: "Polityka cenowa to zbiór zasad, według których sklep lub marka ustala, zmienia i obniża ceny; strategia cenowa to wybrany sposób pozycjonowania ceny wobec klientów i konkurencji. W handlu modowym obie decydują o marży, tempie sprzedaży i o tym, ile towaru trzeba będzie wyprzedać na koniec sezonu.",
  date: "2026-06-16",
  readingMinutes: 5,
  body: [
    { type: "h2", id: "co-to-jest-polityka-cenowa", text: "Co to jest polityka cenowa" },
    {
      type: "p",
      text: "Polityka cenowa to spisane zasady, które odpowiadają na pytania powtarzające się przy każdej kolekcji: od czego liczymy cenę, jaką marżę początkową chcemy osiągnąć, w jakich progach cenowych sprzedajemy, kiedy i o ile obniżamy ceny oraz kto może podjąć taką decyzję. Strategia cenowa jest węższa. To wybór pozycji cenowej marki lub kategorii wobec klientów i konkurencji, a polityka cenowa przekłada ten wybór na codzienne reguły.",
    },
    {
      type: "p",
      text: "W sklepie z kilkoma kategoriami, kanałami i rynkami brak takich zasad szybko widać w danych. Ten sam model kosztuje inaczej w sklepie stacjonarnym i w e-commerce, obniżki startują w różnych tygodniach w różnych krajach, a marża kategorii zależy od tego, kto akurat ustalał ceny. Dobra polityka cenowa obejmuje zwykle kilka rodzajów cen:",
    },
    {
      type: "list",
      items: [
        "Cenę katalogową (regularną), od której liczy się marżę początkową.",
        "Cenę promocyjną: czasową, na wybrane modele lub kategorie, z powrotem do ceny regularnej.",
        "Cenę wyprzedażową: trwałą obniżkę towaru sezonowego, bez powrotu do ceny regularnej.",
        "Cenę outletową albo cenę końcówek kolekcji z poprzednich sezonów.",
        "Zasady różnic cenowych między kanałami i rynkami, po przeliczeniu walut i bez lokalnego VAT.",
      ],
    },
    {
      type: "p",
      text: "Przykład polityki cenowej marki modowej może zmieścić się na dwóch stronach: docelowa marża początkowa dla każdej kategorii, lista progów cenowych w liniach podstawowej, średniej i wyższej, zasada zaokrąglania cen, maksymalna różnica cen między kanałami, kalendarz wyprzedaży z dopuszczalnymi głębokościami obniżek oraz stanowiska osób, które zatwierdzają zmianę ceny. Krótki dokument, którego zespół rzeczywiście używa, jest cenniejszy niż obszerna instrukcja, do której nikt nie zagląda.",
    },
    { type: "h2", id: "rodzaje-strategii-cenowych", text: "Rodzaje strategii cenowych w handlu" },
    {
      type: "p",
      text: "W podręcznikach marketingu najczęściej wymienia się cztery strategie cenowe: wysokich cen, niskich cen, średnich cen i cen prestiżowych. W handlu dochodzą do nich strategie opisujące nie poziom ceny, ale jej zachowanie w czasie i względem konkurencji.",
    },
    {
      type: "table",
      caption: "Rodzaje strategii cenowych i ich zastosowanie w handlu modowym",
      columns: [
        { label: "Strategia cenowa", kind: "text" },
        { label: "Na czym polega", kind: "text" },
        { label: "Zastosowanie w modzie", kind: "text" },
      ],
      rows: [
        { cells: ["Wysokich cen (zbierania śmietanki)", "Wysoka cena na starcie, potem stopniowe obniżanie", "Nowości i modele trendowe na początku sezonu"] },
        { cells: ["Niskich cen (penetracji rynku)", "Niska cena, żeby szybko zdobyć klientów i udział w rynku", "Wejście na nowy rynek, linia produktów bazowych"] },
        { cells: ["Średnich cen", "Cena zbliżona do średniej rynkowej, konkurencja jakością i ofertą", "Większość kategorii marek ze średniego segmentu"] },
        { cells: ["Cen prestiżowych", "Wysoka cena budująca wizerunek, rzadkie obniżki", "Linie premium, kolaboracje, okrycia z droższych materiałów"] },
        { cells: ["Konkurencyjna (dostosowawcza)", "Cena ustalana względem liderów rynku", "Kategorie, w których klient łatwo porównuje ceny"] },
        { cells: ["Stałych niskich cen (EDLP) albo promocyjna (Hi-Lo)", "Stabilna cena bez promocji albo wyższa cena z częstymi akcjami", "Wybór rytmu komunikacji ceny dla całej marki"] },
      ],
    },
    {
      type: "p",
      text: "W modzie rzadko wybiera się jedną strategię dla całej oferty. Marka łączy je w obrębie kolekcji: produkty bazowe mają ceny bliskie konkurencji, bo klient łatwo je porównuje, a modele sezonowe i linia premium mają ceny wyższe, z zapasem na późniejsze obniżki. Porządek w tych poziomach zapewnia architektura cenowa, czyli podział kategorii na progi cenowe typu podstawowy, średni i wyższy. Szerzej opisuję ją w osobnym artykule.",
    },
    { type: "h2", id: "metody-ustalania-cen", text: "Metody ustalania cen" },
    {
      type: "p",
      text: "Metody ustalania cen są trzy: kosztowa, popytowa i konkurencyjna. Metoda kosztowa wychodzi od kosztu zakupu i dodaje narzut albo docelową marżę. Metoda popytowa pyta, ile klient jest skłonny zapłacić za wartość, którą widzi w produkcie. Metoda konkurencyjna bierze za punkt odniesienia ceny podobnych produktów u konkurentów.",
    },
    {
      type: "p",
      text: "W praktyce detalista używa wszystkich trzech po kolei. Cena kosztowa pokazuje minimum, poniżej którego model nie zarobi na siebie. Ceny konkurencji i próg cenowy kategorii pokazują, gdzie klient ją zaakceptuje. Sama metoda kosztowa rzadko wystarcza w modzie, bo dwa modele o tym samym koszcie mogą mieć bardzo różną wartość w oczach klienta.",
    },
    { type: "formula", text: "Cena netto = koszt zakupu z transportem i cłem ÷ (1 − docelowa marża początkowa)" },
    {
      type: "p",
      text: "Przykład: sweter kosztuje w magazynie 60 zł netto, a docelowa marża początkowa kategorii to 60%. Cena netto z metody kosztowej wynosi 60 ÷ 0,4 = 150 zł, czyli 184,50 zł brutto przy stawce VAT 23%. Podobne swetry u konkurentów kosztują 189–229 zł, a próg cenowy dzianiny w średniej linii marki to 199 zł. Ostateczna cena to 199 zł brutto, czyli 161,79 zł netto i marża początkowa około 62,9%. Metoda kosztowa dała minimum, a próg cenowy i konkurencja – cenę końcową.",
    },
    {
      type: "p",
      text: "Na cenę składają się więc koszt zakupu (z transportem, cłem i różnicami kursowymi), marża pokrywająca koszty sklepu, zespołu i obniżek oraz VAT. Pomylenie marży z narzutem przy tym rachunku to jeden z najczęstszych błędów; wyjaśniam go w artykule o marży i narzucie.",
    },
    { type: "h2", id: "obnizki-cen-i-wyprzedaz", text: "Obniżki cen i wyprzedaż sezonowa" },
    {
      type: "p",
      text: "W modzie obniżki nie są porażką, tylko zaplanowaną częścią sezonu. Część kolekcji zawsze sprzeda się wolniej, niż zakładał plan, a towar sezonowy traci wartość z każdym tygodniem. Pytanie nie brzmi, czy obniżać, ale kiedy, o ile i które modele. Dlatego budżet obniżek planuje się razem z budżetem zakupów open-to-buy, a cenę katalogową ustala z zapasem na wyprzedaż.",
    },
    {
      type: "list",
      items: [
        "Decyzję o obniżce opieram na danych modelu: sell-through od początku sezonu na tle planu i tygodniach zapasu do końca sezonu, a nie na samej wysokości zapasu.",
        "Reguła kciuka z mojej praktyki: wcześniejsza i płytsza obniżka kosztuje zwykle mniej niż późna i głęboka, bo działa, póki towar jest jeszcze w sezonie.",
        "Obniżki planuje się w krokach, na przykład pierwsza o 20–30%, kolejna głębsza dla modeli, które nadal nie rotują. Harmonogram i głębokości zapisuje się w polityce cenowej.",
        "Po każdej fali obniżek sprawdza się efekt: przyrost sprzedaży w sztukach i marżę zrealizowaną, a nie tylko przychód.",
      ],
    },
    {
      type: "p",
      text: "Obniżka zmienia marżę bardziej, niż się wydaje. Sweter za 199 zł brutto po obniżce o 30% kosztuje 139,30 zł brutto, czyli 113,25 zł netto. Przy koszcie 60 zł marża spada z 62,9% do 47,0%, a marża kwotowa na sztuce z 101,79 zł do 53,25 zł. Żeby zarobić tyle samo złotych marży co w pełnej cenie, trzeba sprzedać prawie dwa razy więcej sztuk.",
    },
    {
      type: "p",
      text: "W Polsce, przy każdej informacji o obniżce ceny, sprzedawca musi podać także najniższą cenę z 30 dni przed obniżką. To wymóg wynikający z dyrektywy Omnibus. W praktyce oznacza to, że krótkie podniesienie ceny tuż przed wyprzedażą niczego nie daje, a historia cen musi być dostępna w systemie dla każdego modelu i kanału.",
    },
    { type: "h2", id: "ceny-psychologiczne", text: "Ceny psychologiczne w sklepie" },
    {
      type: "p",
      text: "Ceny psychologiczne wykorzystują sposób, w jaki klienci odczytują liczby. Nie zastąpią dobrze ustalonej ceny, ale pomagają ją podać. W handlu modowym stosuje się najczęściej kilka technik:",
    },
    {
      type: "list",
      items: [
        "Końcówki 9 i 99: 199 zł zamiast 200 zł. Klient czyta pierwszą cyfrę, więc cena mieści się w niższym przedziale.",
        "Progi cenowe: ceny ustawione tuż poniżej okrągłych granic, które klienci traktują jako limit wydatku, na przykład 99, 149, 199 i 299 zł.",
        "Linia cenowa dobra–lepsza–najlepsza: trzy poziomy tego samego produktu, w których środkowy wygląda na najrozsądniejszy wybór.",
        "Efekt kotwicy: droższy model na eksponowanym miejscu sprawia, że pozostałe wydają się przystępne.",
        "Ceny okrągłe w linii premium: 400 zł zamiast 399 zł podkreśla jakość, a nie okazję.",
      ],
    },
    {
      type: "p",
      text: "Najważniejsza zasada: te same progi cenowe w całej kategorii, a nie przypadkowe ceny dla każdego modelu. Klient widzi wtedy czytelną ofertę, a analityk może porównać sprzedaż i marżę według progów cenowych w raporcie.",
    },
    {
      type: "p",
      text: "Jeśli chcesz uporządkować politykę cenową, progi cenowe albo plan obniżek na podstawie danych sprzedażowych, umów konsultację dotyczącą analizy cen – odpowiadam w ciągu jednego dnia roboczego.",
    },
  ],
  faqTitle: "Strategie cenowe i polityka cenowa — najczęstsze pytania",
  faq: [
    {
      question: "Co to jest polityka cenowa?",
      answer: "Polityka cenowa to spisane zasady ustalania cen w firmie: poziomy cenowe, relacja do kosztu i konkurencji, zasady promocji i obniżek. Obejmuje też to, kto może zmienić cenę i na jakiej podstawie. Dzięki niej ceny w kategoriach, kanałach i na rynkach są spójne.",
    },
    {
      question: "Jakie są 4 strategie cenowe?",
      answer: "Najczęściej wymienia się strategię wysokich cen (zbierania śmietanki), strategię niskich cen (penetracji rynku), strategię średnich cen oraz strategię cen prestiżowych. Pierwsza zakłada wysoką cenę na starcie i jej stopniowe obniżanie, druga szybkie zdobycie udziału w rynku niską ceną. W modzie marki często łączą je w obrębie jednej kolekcji, na różnych progach cenowych.",
    },
    {
      question: "Jakie są 3 metody ustalania cen?",
      answer: "Podstawowe metody to metoda kosztowa (koszt plus narzut), metoda popytowa oparta na wartości dla klienta i metoda konkurencyjna, która bierze za punkt odniesienia ceny konkurentów. W praktyce detalista liczy cenę od kosztu, a potem koryguje ją do progów cenowych i cen rynkowych. Sama metoda kosztowa rzadko wystarcza w modzie.",
    },
  ],
  seo: {
    title: "Strategie cenowe i polityka cenowa w handlu detalicznym",
    description: "Czym jest polityka cenowa, jakie strategie cenowe i metody ustalania cen stosuje handel detaliczny oraz jak planować obniżki cen i ceny psychologiczne.",
  },
};
