import type { CalculatorPage, ListingPage } from "../../types";
import { calculatorPlan } from "../registry";

export const calculatorsPage: ListingPage = {
  seo: {
    title: "Darmowe kalkulatory dla handlu: marża, rotacja, sell-through",
    description:
      "Darmowe kalkulatory online dla handlu i mody: marża i narzut, sell-through, rotacja zapasów, GMROI i budżet open to buy. Wzory i przykłady.",
  },
  eyebrow: "Kalkulatory",
  h1: "Darmowe kalkulatory dla handlu: marża, narzut, rotacja zapasów",
  intro:
    "Pięć darmowych kalkulatorów dla zespołów w handlu i modzie: marża i narzut, sell-through, rotacja zapasów, GMROI oraz budżet open to buy. Każdy kalkulator liczy wynik od razu w przeglądarce, a pod nim znajdują się wzory, przykład i najczęstsze błędy.",
  ctaTitle: "Potrzebujesz tych wskaźników w raporcie Power BI lub modelu Excel?",
  ctaText:
    "Kalkulator pokazuje jedną pozycję. Jeśli chcesz liczyć marżę, sell-through i rotację dla całego asortymentu co tydzień, opisz swoje dane — odpowiem w ciągu jednego dnia roboczego.",
  faqTitle: "Kalkulatory dla handlu — najczęstsze pytania",
  faq: [
    {
      question: "Czy kalkulatory są darmowe?",
      answer:
        "Tak. Wszystkie kalkulatory są darmowe i nie wymagają rejestracji ani podawania adresu e-mail. Można z nich korzystać dowolnie często, także w pracy z klientami.",
    },
    {
      question: "Czy wpisane liczby są gdzieś zapisywane?",
      answer:
        "Nie. Obliczenia wykonuje przeglądarka, a wpisane wartości nie są wysyłane na serwer ani zapisywane. Po odświeżeniu strony kalkulator wraca do wartości przykładowych.",
    },
    {
      question: "Jak policzyć te wskaźniki dla całego asortymentu?",
      answer:
        "Dla wielu produktów te same wzory wpisuje się w Excelu jako kolumny obliczeniowe albo w Power BI jako miary DAX. Przy każdym kalkulatorze jest link do artykułu z przykładem w Excelu, a przy większej skali warto zbudować jeden model danych dla całego raportu.",
    },
  ],
};

export const calculators: CalculatorPage[] = [
  {
    ...calculatorPlan("margin-calculator", "pl"),
    cardTitle: "Kalkulator marży i narzutu",
    cardText: "Marża procentowa, narzut, zysk na sztuce i cena dla docelowej marży z kosztu zakupu i ceny netto.",
    breadcrumb: "Kalkulator marży",
    h1: { before: "Kalkulator marży i narzutu online —", accent: "marża brutto i cena sprzedaży" },
    lead:
      "Kalkulator marży liczy marżę procentową, narzut i zysk na sztuce na podstawie kosztu zakupu i ceny sprzedaży netto. Podaje też cenę, przy której produkt osiągnie docelową marżę.",
    body: [
      {
        type: "calculator",
        kind: "marginMarkup",
        title: "Kalkulator marży i narzutu",
        labels: {
          cost: "Koszt zakupu netto (zł)",
          price: "Cena sprzedaży netto (zł)",
          targetMargin: "Docelowa marża (%)",
          margin: "Marża procentowa",
          markup: "Narzut procentowy",
          profit: "Zysk na sztuce – marża kwotowa (zł)",
          targetPrice: "Cena netto dla docelowej marży (zł)",
        },
        note: "Wzory: marża = (cena − koszt) ÷ cena × 100%; narzut = (cena − koszt) ÷ koszt × 100%; cena dla docelowej marży = koszt ÷ (1 − marża).",
      },
      { type: "h2", id: "jak-korzystac", text: "Jak korzystać z kalkulatora marży i narzutu" },
      {
        type: "list",
        items: [
          "W polu kosztu zakupu wpisuje się cenę zakupu jednej sztuki netto, razem z transportem i cłem, jeśli firma wlicza je do kosztu towaru.",
          "W polu ceny sprzedaży wpisuje się cenę netto, czyli bez VAT. Cenę brutto z metki dzieli się najpierw przez 1,23 (przy stawce 23%).",
          "Kalkulator od razu pokazuje marżę procentową, narzut procentowy i marżę kwotową na sztuce.",
          "Pole docelowej marży służy do wyceny: po wpisaniu np. 60% kalkulator podaje cenę netto, przy której produkt osiągnie tę marżę.",
        ],
      },
      { type: "h2", id: "wzory-marza-narzut", text: "Wzory na marżę, narzut i cenę sprzedaży" },
      { type: "formula", text: "Marża % = (cena sprzedaży netto − koszt zakupu netto) ÷ cena sprzedaży netto × 100%" },
      { type: "formula", text: "Narzut % = (cena sprzedaży netto − koszt zakupu netto) ÷ koszt zakupu netto × 100%" },
      { type: "formula", text: "Cena netto dla docelowej marży = koszt zakupu netto ÷ (1 − docelowa marża)" },
      {
        type: "p",
        text: "Marża i narzut opisują tę samą kwotę zysku, ale odnoszą ją do innej podstawy: marża do ceny, narzut do kosztu. Dlatego narzut jest zawsze wyższy od marży, a marża nigdy nie przekroczy 100%. Szczegółowe porównanie obu pojęć i tabelę przeliczeń zawiera artykuł o marży i narzucie.",
      },
      { type: "h2", id: "marza-brutto-netto-vat", text: "Marża brutto a ceny netto i brutto z VAT" },
      {
        type: "p",
        text: "Określenie „marża brutto” w handlu oznacza marżę przed kosztami działalności, czyli różnicę między ceną sprzedaży a kosztem zakupu towaru. Nie ma ono związku z ceną brutto zawierającą VAT. Marżę liczy się z cen netto, ponieważ VAT nie jest przychodem sklepu. Wpisanie ceny brutto zawyża wynik: przy koszcie 20 zł i cenie 61,50 zł brutto kalkulator pokazałby marżę 67,5% zamiast rzeczywistych 60%.",
      },
      { type: "h2", id: "przyklad-marzy", text: "Przykład obliczenia marży i narzutu dla koszulki" },
      {
        type: "p",
        text: "Koszulka kosztuje w zakupie 20 zł netto i sprzedaje się za 50 zł netto (61,50 zł brutto). Marża kwotowa wynosi 30 zł, marża procentowa 30 ÷ 50 = 60%, a narzut 30 ÷ 20 = 150%. Jeśli ta sama koszulka ma osiągnąć marżę 65%, cena netto musi wynosić 20 ÷ 0,35 ≈ 57,14 zł, czyli około 70,29 zł brutto przed zaokrągleniem do progu cenowego.",
      },
      { type: "h2", id: "bledy-kalkulator-marzy", text: "Najczęstsze błędy przy liczeniu marży i narzutu" },
      {
        type: "list",
        items: [
          "Dodanie docelowej marży do kosztu jak narzutu: koszt 20 zł plus 60% daje 32 zł, a to tylko 37,5% marży.",
          "Mieszanie cen brutto i netto w jednym obliczeniu.",
          "Pomijanie transportu, cła i rabatów od dostawcy w koszcie zakupu.",
          "Liczenie marży z ceny katalogowej zamiast z ceny po obniżce, gdy produkt sprzedaje się w promocji.",
        ],
      },
    ],
    faqTitle: "Kalkulator marży i narzutu — najczęstsze pytania",
    faq: [
      {
        question: "Jak działa kalkulator marży?",
        answer:
          "Kalkulator odejmuje koszt zakupu od ceny sprzedaży netto i dzieli tę różnicę przez cenę, co daje marżę procentową. Tę samą różnicę dzieli też przez koszt, co daje narzut. Wszystkie obliczenia odbywają się w przeglądarce.",
      },
      {
        question: "Czym różni się marża od narzutu?",
        answer:
          "Marża to zysk liczony jako procent ceny sprzedaży, a narzut to zysk liczony jako procent kosztu zakupu. Przy koszcie 20 zł i cenie 50 zł marża wynosi 60%, a narzut 150%. To ta sama kwota zysku, tylko odniesiona do innej podstawy.",
      },
      {
        question: "Czy marżę liczy się od ceny netto czy brutto?",
        answer:
          "Marżę liczy się od ceny netto, bez VAT, i od kosztu zakupu netto. VAT jest odprowadzany do urzędu skarbowego i nie stanowi przychodu sklepu. Cenę brutto przy stawce 23% zamienia się na netto, dzieląc ją przez 1,23.",
      },
      {
        question: "Co to jest marża brutto w handlu?",
        answer:
          "Marża brutto, nazywana też marżą handlową, to różnica między przychodem ze sprzedaży a kosztem zakupu sprzedanego towaru. Nie uwzględnia kosztów sklepu, wynagrodzeń ani marketingu. Nazwa „brutto” odnosi się do kosztów, a nie do podatku VAT.",
      },
      {
        question: "Jak obliczyć cenę sprzedaży z docelowej marży?",
        answer:
          "Koszt zakupu netto dzieli się przez (1 − docelowa marża). Przy koszcie 20 zł i marży 60% cena netto wynosi 20 ÷ 0,4 = 50 zł. Kalkulator liczy tę cenę automatycznie po wpisaniu docelowej marży.",
      },
    ],
    relatedPostKey: "markup-vs-margin",
    seo: {
      title: "Kalkulator marży i narzutu online — marża brutto",
      description:
        "Darmowy kalkulator marży i narzutu: marża procentowa, narzut, zysk na sztuce i cena dla docelowej marży. Wzory, ceny netto i brutto, przykład.",
    },
  },
  {
    ...calculatorPlan("sell-through-calculator", "pl"),
    cardTitle: "Kalkulator sell-through",
    cardText: "Wskaźnik sell-through od całej dostępności towaru i od samych dostaw, z uwzględnieniem zwrotów.",
    breadcrumb: "Kalkulator sell-through",
    h1: { before: "Kalkulator sell-through —", accent: "wskaźnik sprzedaży towaru w sezonie" },
    lead:
      "Kalkulator sell-through pokazuje, jaki procent dostępnego towaru został sprzedany w danym okresie, po odliczeniu zwrotów. Wynik liczy w dwóch wariantach: od zapasu początkowego i dostaw oraz od samych dostaw.",
    body: [
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
        note: "Sell-through = (sprzedaż − zwroty) ÷ (zapas początkowy + dostawy). Wariant od dostaw dzieli sprzedaż netto tylko przez dostawy z okresu.",
      },
      { type: "h2", id: "jak-korzystac-sell-through", text: "Jak korzystać z kalkulatora sell-through" },
      {
        type: "list",
        items: [
          "Zapas początkowy to liczba sztuk w sklepach i magazynie na początku okresu, np. sezonu lub tygodnia.",
          "Dostawy to sztuki przyjęte w tym samym okresie.",
          "Sprzedaż i zwroty wpisuje się w sztukach za ten sam okres; kalkulator odejmuje zwroty od sprzedaży.",
          "Wszystkie wartości powinny dotyczyć tego samego zakresu: jednego modelu, kategorii albo całej kolekcji.",
        ],
      },
      { type: "h2", id: "wzor-sell-through", text: "Wskaźnik sell-through: wzór w dwóch wariantach" },
      { type: "formula", text: "Sell-through % = (sprzedaż − zwroty) ÷ (zapas początkowy + dostawy) × 100%" },
      { type: "formula", text: "Sell-through od dostaw % = (sprzedaż − zwroty) ÷ dostawy × 100%" },
      {
        type: "p",
        text: "Pierwszy wariant jest bezpieczniejszy, bo obejmuje cały towar, który można było sprzedać, także resztki z poprzedniego sezonu. Wariant od dostaw stosuje się dla nowej kolekcji, która nie miała zapasu początkowego. Ważne, żeby w jednym raporcie używać jednej, spisanej definicji.",
      },
      { type: "h2", id: "przyklad-sell-through", text: "Przykład obliczenia wskaźnika sell-through dla kolekcji" },
      {
        type: "p",
        text: "Na początku sezonu w sklepach było 200 sztuk kurtek z poprzedniej dostawy, a w sezonie przyszło kolejne 800. Sprzedano 640 sztuk, z czego 40 wróciło jako zwroty. Sprzedaż netto wynosi 600 sztuk, więc sell-through od całej dostępności to 600 ÷ 1000 = 60%, a od dostaw 600 ÷ 800 = 75%. Różnica 15 punktów procentowych pokazuje, jak mocno wybór definicji zmienia ocenę tego samego sezonu.",
      },
      {
        type: "p",
        text: "Sam wynik warto porównać z planem na ten sam tydzień sezonu, a nie z wynikiem końcowym. Sell-through 60% w szóstym tygodniu to dobry wynik, a w ostatnim tygodniu przed obniżkami może oznaczać zbyt duży zapas.",
      },
      { type: "h2", id: "bledy-sell-through", text: "Najczęstsze błędy przy liczeniu sell-through" },
      {
        type: "list",
        items: [
          "Liczenie sprzedaży bez odejmowania zwrotów, co w sklepach internetowych z modą mocno zawyża wynik.",
          "Pomijanie zapasu początkowego przy towarze przechodzącym z poprzedniego sezonu.",
          "Porównywanie sell-through liczonego w sztukach z wynikiem liczonym w wartości.",
          "Ocena wyniku bez odniesienia do tygodnia sezonu i planu.",
        ],
      },
      {
        type: "p",
        text: "Kalkulator sprawdza się przy pojedynczym modelu lub kategorii. Przy całej kolekcji ten sam wzór wpisuje się w Excelu jako kolumnę obliczeniową albo w Power BI jako miarę DAX, tak aby sell-through był liczony co tydzień według jednej definicji dla wszystkich zespołów. Przykłady formuł i miar zawiera artykuł o wskaźniku sell-through.",
      },
    ],
    faqTitle: "Kalkulator sell-through — najczęstsze pytania",
    faq: [
      {
        question: "Co to jest wskaźnik sell-through?",
        answer:
          "Sell-through to procent dostępnego towaru, który został sprzedany w danym okresie. W handlu modowym jest podstawowym wskaźnikiem oceny kolekcji i decyzji o dokupieniu lub obniżce. Liczy się go zwykle w sztukach, po odjęciu zwrotów.",
      },
      {
        question: "Jak obliczyć sell-through?",
        answer:
          "Sprzedaż netto, czyli sprzedaż minus zwroty, dzieli się przez sumę zapasu początkowego i dostaw z okresu, a wynik mnoży przez 100%. Przy 600 sztukach sprzedaży netto i 1000 sztukach dostępnego towaru sell-through wynosi 60%.",
      },
      {
        question: "Jaki sell-through jest dobry?",
        answer:
          "Nie ma jednej dobrej wartości, bo wynik zależy od kategorii, długości sezonu i tygodnia, w którym się go mierzy. W modzie porównuje się go z planowaną krzywą sell-through dla danego tygodnia. Wynik powyżej planu sugeruje dokupienie, a wyraźnie poniżej — przesunięcie towaru lub obniżkę.",
      },
      {
        question: "Czy zwroty trzeba odejmować od sprzedaży?",
        answer:
          "Tak. Zwrócony towar wraca do zapasu, więc liczenie sprzedaży brutto zawyża sell-through. W sklepach internetowych z modą różnica bywa bardzo duża, dlatego kalkulator odejmuje zwroty automatycznie.",
      },
    ],
    relatedPostKey: "sell-through-rate",
    seo: {
      title: "Kalkulator sell-through — wskaźnik sell-through online",
      description:
        "Darmowy kalkulator sell-through: procent sprzedanego towaru od całej dostępności i od dostaw, ze zwrotami. Wzór, przykład i najczęstsze błędy.",
    },
  },
  {
    ...calculatorPlan("stock-turn-calculator", "pl"),
    cardTitle: "Kalkulator rotacji zapasów",
    cardText: "Rotacja zapasów w razach i w dniach oraz pokrycie zapasu w tygodniach.",
    breadcrumb: "Kalkulator rotacji zapasów",
    h1: { before: "Kalkulator rotacji zapasów —", accent: "w razach, w dniach i w tygodniach pokrycia" },
    lead:
      "Kalkulator rotacji zapasów pokazuje, ile razy w okresie sprzedaje się przeciętny zapas i ile dni trwa jeden cykl. Dodatkowo liczy pokrycie zapasu, czyli na ile tygodni sprzedaży wystarczy obecny towar.",
    body: [
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
      { type: "h2", id: "jak-korzystac-rotacja", text: "Jak korzystać z kalkulatora rotacji zapasów" },
      {
        type: "list",
        items: [
          "Koszt sprzedanych towarów i przeciętny zapas wpisuje się w tych samych cenach, najczęściej w cenach zakupu.",
          "Przeciętny zapas to zwykle średnia z zapasu na początek i koniec okresu albo średnia ze stanów miesięcznych.",
          "Liczba dni okresu to 365 dla roku, 90 dla kwartału lub długość sezonu.",
          "Pokrycie zapasu liczy się osobno, w sztukach: obecny zapas i średnia sprzedaż z ostatnich tygodni.",
        ],
      },
      { type: "h2", id: "wskaznik-rotacji-zapasow-wzor", text: "Wskaźnik rotacji zapasów: wzór w razach i w dniach" },
      { type: "formula", text: "Rotacja zapasów w razach = koszt sprzedanych towarów ÷ przeciętny zapas" },
      { type: "formula", text: "Rotacja zapasów w dniach = liczba dni okresu ÷ rotacja zapasów w razach" },
      { type: "formula", text: "Pokrycie zapasu w tygodniach = zapas w sztukach ÷ średnia sprzedaż tygodniowa w sztukach" },
      {
        type: "p",
        text: "Rotacja w razach mówi, ile razy zapas „obrócił się” w okresie. Rotacja w dniach przekłada ten wynik na liczbę dni, przez które towar leży w firmie, zanim zostanie sprzedany. Im wyższa rotacja w razach i krótsza w dniach, tym mniej kapitału jest zamrożone w zapasie. Pełne omówienie wskaźnika i przykład w Excelu zawiera artykuł o rotacji zapasów.",
      },
      { type: "h2", id: "przyklad-rotacji-zapasow", text: "Przykład obliczenia rotacji zapasów w dniach" },
      {
        type: "p",
        text: "Sklep sprzedał w ciągu roku towar o koszcie zakupu 600 000 zł, a przeciętny zapas wynosił 150 000 zł. Rotacja w razach to 600 000 ÷ 150 000 = 4, czyli zapas sprzedaje się cztery razy w roku. Rotacja w dniach to 365 ÷ 4 ≈ 91 dni. Jeśli w danej kategorii zostało 1200 sztuk, a sprzedaż wynosi średnio 150 sztuk tygodniowo, pokrycie zapasu to 8 tygodni.",
      },
      { type: "h2", id: "bledy-rotacja-zapasow", text: "Najczęstsze błędy przy liczeniu rotacji zapasów" },
      {
        type: "list",
        items: [
          "Dzielenie przychodu w cenach sprzedaży przez zapas w cenach zakupu, co zawyża rotację o wartość marży.",
          "Użycie stanu z jednego dnia zamiast przeciętnego zapasu w sezonowym handlu modowym.",
          "Porównywanie rotacji rocznej z kwartalną bez przeliczenia liczby dni.",
          "Ocena całego asortymentu jedną liczbą, która ukrywa wolno rotujące kategorie.",
        ],
      },
      {
        type: "p",
        text: "Rotację zapasów najlepiej śledzić osobno dla każdej kategorii i porównywać z tym samym okresem poprzedniego roku. Spadek rotacji w dniach przy stałej sprzedaży zwykle oznacza, że zakupy rosną szybciej niż popyt, i jest sygnałem do przeglądu budżetu zakupowego przed kolejnym sezonem.",
      },
    ],
    faqTitle: "Kalkulator rotacji zapasów — najczęstsze pytania",
    faq: [
      {
        question: "Jak obliczyć rotację zapasów w dniach?",
        answer:
          "Najpierw dzieli się koszt sprzedanych towarów przez przeciętny zapas, co daje rotację w razach. Następnie liczbę dni okresu dzieli się przez ten wynik. Przy rotacji 4 w skali roku zapas rotuje co około 91 dni.",
      },
      {
        question: "Co oznacza wysoka rotacja zapasów?",
        answer:
          "Wysoka rotacja w razach oznacza, że towar szybko się sprzedaje i firma zamraża w zapasie mniej pieniędzy. Zbyt wysoka rotacja może jednak oznaczać braki towaru i utraconą sprzedaż. Wynik ocenia się zawsze na tle kategorii i sezonu.",
      },
      {
        question: "Czym różni się rotacja zapasów od pokrycia zapasu?",
        answer:
          "Rotacja opisuje przeszły okres i liczy się ją w wartości, zwykle w cenach zakupu. Pokrycie zapasu patrzy w przyszłość: pokazuje, na ile tygodni sprzedaży wystarczy obecny zapas w sztukach. W handlu modowym oba wskaźniki czyta się razem.",
      },
      {
        question: "Jak obliczyć przeciętny zapas?",
        answer:
          "Najprostsza metoda to średnia z zapasu na początek i na koniec okresu. Dokładniejsza jest średnia ze stanów na koniec każdego miesiąca lub tygodnia, co w sezonowym handlu daje bardziej wiarygodny wynik. Zapas i koszt sprzedaży muszą być wyrażone w tych samych cenach.",
      },
    ],
    relatedPostKey: "inventory-turnover",
    seo: {
      title: "Kalkulator rotacji zapasów — w razach i w dniach",
      description:
        "Darmowy kalkulator rotacji zapasów: wskaźnik rotacji w razach i w dniach oraz pokrycie zapasu w tygodniach. Wzór, przykład i najczęstsze błędy.",
    },
  },
  {
    ...calculatorPlan("gmroi-calculator", "pl"),
    cardTitle: "Kalkulator GMROI",
    cardText: "Zwrot z inwestycji w zapas: ile złotych marży brutto przynosi każda złotówka zapasu.",
    breadcrumb: "Kalkulator GMROI",
    h1: { before: "Kalkulator GMROI —", accent: "marża brutto z inwestycji w zapas" },
    lead:
      "Kalkulator GMROI pokazuje, ile złotych marży brutto przynosi każda złotówka zainwestowana w zapas. Wystarczy wpisać marżę brutto z okresu i przeciętny zapas w cenach zakupu.",
    body: [
      {
        type: "calculator",
        kind: "gmroi",
        title: "Kalkulator GMROI",
        labels: {
          grossMargin: "Marża brutto w okresie (zł)",
          avgInventory: "Przeciętny zapas w cenach zakupu (zł)",
          gmroi: "GMROI (zł marży na 1 zł zapasu)",
        },
        note: "GMROI = marża brutto ÷ przeciętny zapas w cenach zakupu.",
      },
      { type: "h2", id: "jak-korzystac-gmroi", text: "Jak korzystać z kalkulatora GMROI" },
      {
        type: "list",
        items: [
          "Marża brutto to przychód netto ze sprzedaży minus koszt zakupu sprzedanego towaru za wybrany okres.",
          "Przeciętny zapas wpisuje się w cenach zakupu, za ten sam okres co marżę.",
          "Wynik czyta się jako kwotę: GMROI 1,5 oznacza 1,50 zł marży brutto z każdej złotówki zapasu.",
          "Kalkulator można stosować dla całej firmy, kategorii, marki lub pojedynczego modelu.",
        ],
      },
      { type: "h2", id: "gmroi-wzor", text: "GMROI wzór i znaczenie wskaźnika" },
      { type: "formula", text: "GMROI = marża brutto ÷ przeciętny zapas w cenach zakupu" },
      { type: "formula", text: "GMROI = marża brutto % × rotacja zapasów ÷ (1 − marża brutto %)" },
      {
        type: "p",
        text: "GMROI (gross margin return on inventory investment) łączy dwa wskaźniki: marżę i rotację zapasów. Druga postać wzoru pokazuje, że ten sam wynik można osiągnąć wysoką marżą przy wolnej rotacji albo niższą marżą przy szybkiej rotacji. Dzięki temu GMROI pozwala porównywać kategorie o zupełnie innym modelu sprzedaży, np. płaszcze i podstawowe koszulki.",
      },
      { type: "h2", id: "przyklad-gmroi", text: "Przykład obliczenia GMROI dla kategorii" },
      {
        type: "p",
        text: "Kategoria wygenerowała w roku 120 000 zł marży brutto, a przeciętny zapas w cenach zakupu wynosił 80 000 zł. GMROI to 120 000 ÷ 80 000 = 1,5. Każda złotówka zamrożona w zapasie przyniosła więc 1,50 zł marży brutto. Jeśli inna kategoria przy tym samym zapasie daje GMROI 0,9, to ona w pierwszej kolejności wymaga przeglądu głębokości zakupu i cen.",
      },
      {
        type: "p",
        text: "Wynik poniżej 1 nie zawsze oznacza stratę, bo koszty działalności pokrywa marża z całego asortymentu. Jest jednak sygnałem, że pieniądze w zapasie tej kategorii pracują słabiej niż w innych.",
      },
      { type: "h2", id: "bledy-gmroi", text: "Najczęstsze błędy przy liczeniu GMROI" },
      {
        type: "list",
        items: [
          "Wpisanie zapasu w cenach detalicznych zamiast w cenach zakupu.",
          "Użycie przychodu zamiast marży brutto.",
          "Porównywanie GMROI z różnych okresów, np. sezonu i całego roku.",
          "Pomijanie obniżek w marży, co zawyża wynik kategorii sprzedawanych w promocji.",
        ],
      },
      {
        type: "p",
        text: "GMROI warto czytać razem z innymi wskaźnikami: sell-through, rotacją zapasów i udziałem sprzedaży w pełnej cenie. Dopiero zestawienie tych liczb pokazuje, czy słaby wynik wynika ze zbyt głębokiego zakupu, zbyt niskiej ceny, czy z obniżek. Pełny zestaw wskaźników opisuje artykuł o KPI w handlu detalicznym.",
      },
    ],
    faqTitle: "Kalkulator GMROI — najczęstsze pytania",
    faq: [
      {
        question: "Co to jest GMROI?",
        answer:
          "GMROI to wskaźnik zwrotu marży brutto z inwestycji w zapas. Pokazuje, ile złotych marży brutto przynosi każda złotówka zapasu w cenach zakupu. Łączy w jednej liczbie marżę i rotację zapasów.",
      },
      {
        question: "Jak obliczyć GMROI?",
        answer:
          "Marżę brutto z okresu dzieli się przez przeciętny zapas w cenach zakupu z tego samego okresu. Przy marży 120 000 zł i zapasie 80 000 zł GMROI wynosi 1,5. Obie wartości muszą dotyczyć tego samego zakresu asortymentu.",
      },
      {
        question: "Jaki GMROI jest dobry?",
        answer:
          "Wynik powyżej 1 oznacza, że zapas przynosi w okresie więcej marży brutto, niż wynosi jego przeciętna wartość w cenach zakupu. Dobry poziom zależy od kategorii, modelu sprzedaży i kosztów firmy, dlatego GMROI porównuje się głównie między kategoriami i z poprzednimi sezonami.",
      },
      {
        question: "Czym GMROI różni się od rotacji zapasów?",
        answer:
          "Rotacja zapasów mówi tylko, jak szybko sprzedaje się towar. GMROI dodaje do tego marżę, więc pokazuje, czy szybka sprzedaż przynosi też pieniądze. Kategoria z wysoką rotacją i niską marżą może mieć niższy GMROI niż wolniej rotująca kategoria z wysoką marżą.",
      },
    ],
    relatedPostKey: "retail-kpis",
    seo: {
      title: "Kalkulator GMROI — wzór i zwrot z zapasu",
      description:
        "Darmowy kalkulator GMROI: ile złotych marży brutto przynosi każda złotówka zapasu. GMROI wzór, przykład dla kategorii i najczęstsze błędy.",
    },
  },
  {
    ...calculatorPlan("open-to-buy-calculator", "pl"),
    cardTitle: "Kalkulator open to buy",
    cardText: "Budżet zakupowy na okres z planu sprzedaży, obniżek, zapasu i zamówionych dostaw.",
    breadcrumb: "Kalkulator open to buy",
    h1: { before: "Kalkulator open to buy —", accent: "budżet zakupowy na sezon" },
    lead:
      "Kalkulator open to buy liczy budżet zakupowy, czyli kwotę, za którą można jeszcze zamówić towar w danym okresie. Wynik wynika z planu sprzedaży, obniżek, zapasu docelowego i już złożonych zamówień.",
    body: [
      {
        type: "calculator",
        kind: "openToBuy",
        title: "Kalkulator budżetu open to buy",
        labels: {
          sales: "Planowana sprzedaż",
          markdowns: "Planowane obniżki",
          endStock: "Planowany zapas na koniec okresu",
          openingStock: "Zapas na początek okresu",
          onOrder: "Zamówione dostawy",
          otb: "Budżet open to buy",
        },
        note: "OTB = planowana sprzedaż + planowane obniżki + planowany zapas na koniec okresu − zapas na początek okresu − zamówione dostawy. Wszystkie wartości w tej samej walucie i w tych samych cenach.",
      },
      { type: "h2", id: "jak-korzystac-otb", text: "Jak korzystać z kalkulatora open to buy" },
      {
        type: "list",
        items: [
          "Wszystkie pola wypełnia się w tej samej walucie i w tych samych cenach: detalicznych albo zakupu.",
          "Planowana sprzedaż i planowane obniżki pochodzą z planu finansowego na miesiąc lub sezon.",
          "Planowany zapas na koniec okresu to poziom potrzebny do sprzedaży w kolejnym okresie.",
          "Zamówione dostawy to towar zamówiony, ale jeszcze nieprzyjęty na magazyn.",
        ],
      },
      { type: "h2", id: "budzet-zakupowy-wzor", text: "Budżet zakupowy open to buy: wzór" },
      {
        type: "formula",
        text: "OTB = planowana sprzedaż + planowane obniżki + planowany zapas końcowy − zapas początkowy − zamówione dostawy",
      },
      {
        type: "p",
        text: "Pierwsze trzy składniki opisują, ile towaru firma potrzebuje w okresie: na sprzedaż, na utratę wartości przez obniżki i na zapas przechodzący dalej. Dwa ostatnie mówią, ile tego towaru już ma lub zamówiła. Różnica to kwota, którą można jeszcze przeznaczyć na zakupy. Wynik ujemny oznacza, że zamówień jest za dużo i trzeba je przesunąć lub anulować.",
      },
      { type: "h2", id: "przyklad-open-to-buy", text: "Przykład obliczenia budżetu open to buy na miesiąc" },
      {
        type: "p",
        text: "Plan na miesiąc zakłada sprzedaż 100 000 zł i obniżki 8000 zł, a na koniec miesiąca w sklepach ma zostać zapas 60 000 zł. Na początek miesiąca zapas wynosi 70 000 zł, a zamówione dostawy 20 000 zł. Budżet open to buy to 100 000 + 8000 + 60 000 − 70 000 − 20 000 = 78 000 zł. Za tę kwotę kupiec może jeszcze zamówić towar, np. dokupić modele z najlepszym sell-through.",
      },
      {
        type: "p",
        text: "W praktyce budżet liczy się dla każdego miesiąca i każdej kategorii osobno, a po każdym tygodniu sprzedaży aktualizuje go o rzeczywiste wyniki. Szablon takiego arkusza jest dostępny wśród darmowych szablonów Excel.",
      },
      { type: "h2", id: "bledy-open-to-buy", text: "Najczęstsze błędy w budżecie open to buy" },
      {
        type: "list",
        items: [
          "Mieszanie cen detalicznych i cen zakupu w jednym obliczeniu.",
          "Pomijanie planowanych obniżek, przez co budżet jest zbyt niski.",
          "Brak zamówionych, ale nieprzyjętych dostaw, co prowadzi do podwójnych zakupów.",
          "Liczenie budżetu raz przed sezonem bez aktualizacji o rzeczywistą sprzedaż.",
        ],
      },
    ],
    faqTitle: "Kalkulator open to buy — najczęstsze pytania",
    faq: [
      {
        question: "Co to jest open to buy?",
        answer:
          "Open to buy (OTB) to budżet zakupowy: kwota, za którą firma może jeszcze kupić towar w danym okresie, nie przekraczając planu zapasu. Stosuje się go w handlu modowym do kontroli zakupów w sezonie. Wynik aktualizuje się wraz z rzeczywistą sprzedażą.",
      },
      {
        question: "Jak obliczyć budżet zakupowy?",
        answer:
          "Do planowanej sprzedaży dodaje się planowane obniżki i planowany zapas na koniec okresu. Od tej sumy odejmuje się zapas na początek okresu i już zamówione dostawy. Przy danych z przykładu budżet wynosi 78 000 zł.",
      },
      {
        question: "Co oznacza ujemny wynik open to buy?",
        answer:
          "Ujemny budżet oznacza, że firma zamówiła więcej towaru, niż wynika z planu sprzedaży i zapasu. Trzeba wtedy przesunąć lub zmniejszyć dostawy albo skorygować plan sprzedaży. Bez korekty rośnie ryzyko nadmiernego zapasu i obniżek.",
      },
      {
        question: "Czy open to buy liczy się w cenach detalicznych czy w cenach zakupu?",
        answer:
          "Można stosować jedne i drugie, pod warunkiem że wszystkie składniki są w tych samych cenach. Budżet w cenach detalicznych łatwiej porównać z planem sprzedaży, a w cenach zakupu z budżetem finansowym. Wynik w cenach detalicznych przelicza się na koszt przez planowaną marżę.",
      },
    ],
    relatedPostKey: "open-to-buy",
    seo: {
      title: "Kalkulator open to buy — budżet zakupowy online",
      description:
        "Darmowy kalkulator open to buy: budżet zakupowy z planu sprzedaży, obniżek, zapasu i zamówionych dostaw. Wzór, przykład i najczęstsze błędy.",
    },
  },
];
