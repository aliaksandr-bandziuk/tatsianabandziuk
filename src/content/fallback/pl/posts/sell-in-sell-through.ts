import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("sell-in-sell-through", "pl"),
  title: "Sell-in a sell-through: dlaczego dział handlowy i finanse mają różne liczby",
  h1: { before: "Sell-in a sell-through: dlaczego dział handlowy i finanse", accent: "mają różne liczby" },
  excerpt: "Czym różnią się sell-in, sell-through i sell-out oraz dlaczego dział handlowy i finanse raportują inne wartości tego samego wskaźnika.",
  lead: "Sell-in to sprzedaż marki do partnera handlowego, sell-out to sprzedaż partnera klientom końcowym, a sell-through to procent dostępnego towaru, który trafił do klientów. Dział handlowy i finanse mają różne liczby, bo liczą sell-through w innych jednostkach, od innej bazy i w innych datach.",
  date: "2026-05-12",
  readingMinutes: 5,
  body: [
    { type: "h2", id: "definicje-sell-in-sell-through-sell-out", text: "Sell-in, sell-through i sell-out — definicje" },
    {
      type: "p",
      text: "Co znaczy sell-in i sell-out? To dwa końce tej samej drogi towaru. Sell-in to sprzedaż marki do kanału dystrybucji: do sieci sklepów, dystrybutora, domu towarowego albo marketplace’u, który kupuje towar na własny rachunek. To relacja B2B, a jej wynikiem jest faktura marki. Sell-out to sprzedaż, którą ten partner robi dalej, klientom końcowym, w sztukach albo w wartości. To relacja B2C.",
    },
    {
      type: "p",
      text: "Sell-through łączy oba końce. To procent towaru dostępnego u partnera lub w sklepie, który został sprzedany klientom końcowym w danym okresie. Sell-in i sell-out są więc wielkościami (ile sztuk, ile złotych), a sell-through jest wskaźnikiem (jaka część). W marce z własnymi sklepami sell-in jest po prostu przesunięciem towaru z magazynu do sklepu, ale logika zostaje ta sama.",
    },
    {
      type: "table",
      caption: "Sell-in, sell-out i sell-through – porównanie",
      columns: [
        { label: "Cecha", kind: "text" },
        { label: "Sell-in", kind: "text" },
        { label: "Sell-out", kind: "text" },
        { label: "Sell-through", kind: "text" },
      ],
      rows: [
        { cells: ["Co mierzy", "Sprzedaż marki do partnera", "Sprzedaż partnera klientom", "Część dostępnego towaru sprzedaną klientom"] },
        { cells: ["Jednostka", "Sztuki lub wartość hurtowa", "Sztuki lub wartość detaliczna", "Procent"] },
        { cells: ["Źródło danych", "Faktury i wysyłki marki", "Raporty partnera, systemy kasowe", "Sell-out i stany zapasu"] },
        { cells: ["Kto patrzy najczęściej", "Finanse, sprzedaż hurtowa", "Dział handlowy, partner", "Merchandising, planowanie"] },
      ],
    },
    { type: "h2", id: "sell-in-a-sell-out-zapas-w-kanale", text: "Różnica między sell-in a sell-out i zapas w kanale" },
    {
      type: "p",
      text: "Sell-in pokazuje przychód marki dziś. Sell-out pokazuje, czy ten przychód się powtórzy. Partner, który kupił dużo, a sprzedaje mało, w następnym sezonie zamówi mniej albo poprosi o wsparcie w obniżkach. Dlatego sam sell-in bywa mylący: dobry kwartał sprzedaży hurtowej może oznaczać, że towar po prostu leży w magazynach partnerów.",
    },
    {
      type: "p",
      text: "Różnica między sell-in a sell-out w danym okresie to przyrost zapasu w kanale. Jeśli marka wysłała partnerowi 1000 sztuk, a partner sprzedał 680, zapas w kanale wzrósł o 320 sztuk. W analizie hurtu warto śledzić stosunek sell-out do sell-in w kolejnych miesiącach. Wynik trwale niższy od 1 oznacza, że kanał się zapełnia, a kolejne zamówienia będą mniejsze.",
    },
    {
      type: "p",
      text: "Przykład: w trzech kolejnych miesiącach stosunek sell-out do sell-in u partnera wynosi 0,68, 0,75 i 0,71. Przez cały kwartał kanał przyjmował więcej, niż sprzedawał. Dział sprzedaży hurtowej widzi dobre wyniki, ale planista powinien już teraz obniżyć prognozę zamówień partnera na kolejny sezon albo zaplanować z nim wspólne działania sprzedażowe.",
    },
    { type: "h2", id: "rozbieznosci-sell-through", text: "Trzy rozbieżności w definicji sell-through" },
    {
      type: "p",
      text: "Wzór na sell-through wygląda prosto: sprzedaż ÷ dostępny towar × 100%. Kłopot w tym, że każdy dział może inaczej rozumieć zarówno licznik, jak i mianownik. Z mojego doświadczenia prawie każda rozbieżność między raportem działu handlowego a raportem finansów sprowadza się do jednej z trzech przyczyn.",
    },
    {
      type: "list",
      items: [
        "Jednostka: dział handlowy liczy w sztukach, finanse w wartości. Wartość sprzedaży po obniżkach dzieli się przez wartość zapasu w cenach pełnych, więc sell-through wartościowy jest niższy niż sztukowy, gdy część towaru sprzedano z rabatem.",
        "Zwroty: jeden raport odejmuje zwroty klientów od sprzedaży, drugi ich nie uwzględnia. W handlu internetowym, gdzie zwrotów jest dużo, różnica bywa znacząca.",
        "Mianownik: jeden raport dzieli sprzedaż przez cały dostępny towar (zapas początkowy + dostawy), drugi tylko przez dostawy z okresu. Wariant od dostaw daje wyższy wynik, bo pomija towar, który leżał w sklepie wcześniej.",
      ],
    },
    {
      type: "p",
      text: "Przykład: partner miał na początku sezonu 200 sztuk modelu, marka dostarczyła 1000 sztuk. Klienci kupili 720 sztuk, z czego 40 zwrócili. 480 sztuk sprzedano w pełnej cenie 250 zł, a 200 sztuk netto po obniżce o 30%, czyli za 175 zł. Ten sam model daje cztery różne wyniki:",
    },
    {
      type: "table",
      caption: "Sell-through jednego modelu liczony na cztery sposoby (dane ilustracyjne)",
      columns: [
        { label: "Wariant", kind: "text" },
        { label: "Licznik", kind: "text" },
        { label: "Mianownik", kind: "text" },
        { label: "Sell-through", kind: "number", suffix: "%", format: "bars" },
      ],
      rows: [
        { cells: ["Sztuki, po zwrotach, od całej dostępności", "680 szt.", "1200 szt.", 56.7] },
        { cells: ["Sztuki, bez odejmowania zwrotów", "720 szt.", "1200 szt.", 60] },
        { cells: ["Sztuki, po zwrotach, tylko od dostaw", "680 szt.", "1000 szt.", 68] },
        { cells: ["Wartość po obniżkach, od zapasu w cenach pełnych", "155 000 zł", "300 000 zł", 51.7] },
      ],
    },
    {
      type: "p",
      text: "Różnica między najniższym a najwyższym wynikiem to ponad 16 punktów procentowych dla tego samego modelu i tego samego okresu. Na poziomie całej kolekcji takie różnice sumują się, a na spotkaniu jeden dział mówi o dobrym sezonie, drugi o konieczności obniżek.",
    },
    {
      type: "p",
      text: "Żaden z tych wyników nie jest błędny. Każdy odpowiada na inne pytanie. Problem zaczyna się wtedy, gdy wszystkie cztery nazywają się w raportach tak samo. Kalkulator poniżej pozwala porównać dwa najczęstsze warianty sztukowe na własnych danych.",
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
      note: "Sell-through = (sprzedaż − zwroty) ÷ (zapas początkowy + dostawy). Wariant od dostaw dzieli sprzedaż netto tylko przez dostawy z okresu.",
    },
    { type: "h2", id: "daty-w-raportach-sell-through", text: "Daty w raportach sell-in i sell-through" },
    {
      type: "p",
      text: "Czwarte źródło różnic to kalendarz. Nawet przy tej samej definicji dwa raporty dają inne liczby, jeśli przypisują zdarzenia do innych dni. Różnice z tego powodu są największe na początku sezonu, gdy dużo towaru jest w drodze, i w tygodniach na przełomie miesięcy.",
    },
    {
      type: "list",
      items: [
        "Data dostawy: finanse księgują sell-in w dniu wysyłki lub wystawienia faktury, a dział handlowy liczy towar od przyjęcia w sklepie. Towar w drodze jest wtedy w mianowniku jednego raportu, a w drugim go nie ma.",
        "Okres: dział handlowy pracuje na tygodniach handlowych (poniedziałek–niedziela) i sezonach, finanse na miesiącach kalendarzowych.",
        "Zwroty: zwrot może być przypisany do dnia zakupu albo do dnia, w którym towar wrócił. Pierwsze podejście zmienia wyniki zamkniętych już tygodni.",
      ],
    },
    { type: "h2", id: "wspolna-definicja-sell-through", text: "Jak uzgodnić jedną definicję sell-through z finansami" },
    {
      type: "p",
      text: "Rozwiązaniem nie jest wybór „prawdziwego” wyniku, tylko spisanie definicji i wspólne źródło danych. Taką kartę wskaźnika przygotowuję razem z finansami i działem handlowym, zanim powstanie raport. Powinna odpowiadać na kilka pytań:",
    },
    {
      type: "list",
      items: [
        "Jednostka: sztuki czy wartość, a jeśli wartość, to w jakich cenach.",
        "Licznik: sprzedaż brutto czy po zwrotach, i do którego dnia przypisuje się zwrot.",
        "Mianownik: cały dostępny towar czy tylko dostawy, i czy towar w drodze się wlicza.",
        "Okres i kalendarz: od początku sezonu, tydzień handlowy czy miesiąc.",
        "Poziom: model–kolor, kategoria, sklep, partner.",
        "Źródło i właściciel: z której tabeli pochodzą dane i kto zatwierdza zmiany definicji.",
      ],
    },
    {
      type: "p",
      text: "Zanim nowa definicja trafi do raportów, warto ją sprawdzić na jednym przykładzie. Bierzemy jeden model i jeden tydzień, liczymy sell-through według starego raportu handlowego, według raportu finansów i według nowej definicji, a potem rozpisujemy różnice na czynniki: zwroty, towar w drodze, obniżki. Jeśli każdą różnicę da się wyjaśnić, definicja jest gotowa. Jeśli zostaje reszta, której nikt nie potrafi wyjaśnić, problem leży w danych źródłowych i trzeba go rozwiązać przed budową raportu.",
    },
    {
      type: "p",
      text: "W praktyce zwykle zostają dwie miary: główny sell-through w sztukach, po zwrotach, od całej dostępności, używany do decyzji o dokupieniu i obniżkach, oraz sell-through wartościowy dla finansów. Mają różne nazwy i obie liczą się z tego samego modelu danych. W Power BI może to wyglądać tak:",
    },
    {
      type: "code",
      caption: "Dwie miary DAX zamiast jednej niejasnej (nazwy tabel i kolumn ilustracyjne)",
      code: `Sprzedaż netto szt. =
SUM ( Sprzedaz[Sztuki] ) - SUM ( Zwroty[Sztuki] )

Dostępność szt. =
SUM ( Zapas[StanPoczatkowySzt] ) + SUM ( Dostawy[PrzyjeteSzt] )

Sell-through szt. % =
DIVIDE ( [Sprzedaż netto szt.], [Dostępność szt.] )

Sell-through wartościowy % =
DIVIDE (
    SUM ( Sprzedaz[WartoscNetto] ) - SUM ( Zwroty[WartoscNetto] ),
    SUM ( Zapas[WartoscPoczatkowaPelnaCena] ) + SUM ( Dostawy[WartoscPelnaCena] )
)`,
    },
    {
      type: "p",
      text: "Obie miary korzystają z tych samych tabel i tych samych dat, więc różnica między nimi wynika już tylko z obniżek. To różnica, którą da się wytłumaczyć na spotkaniu w jednym zdaniu. Więcej o samym wskaźniku, jego wzorze i dobrym poziomie w modzie piszę w osobnym artykule o sell-through na tym blogu.",
    },
    {
      type: "p",
      text: "Jeśli w Twojej firmie dział handlowy i finanse pokazują różne liczby sprzedaży, umów konsultację – pomogę spisać definicje i zbudować na nich wspólny raport. Odpowiadam w ciągu jednego dnia roboczego.",
    },
  ],
  faqTitle: "Sell-in, sell-through i sell-out — najczęstsze pytania",
  faq: [
    {
      question: "Czym różni się sell-in od sell-through?",
      answer: "Sell-in mierzy, ile towaru marka sprzedała lub wysłała partnerom handlowym, na przykład sieciom sklepów i dystrybutorom. Sell-through mierzy, jaka część tego towaru została sprzedana klientom końcowym, i zwykle wyraża się go w procentach. Sell-in pokazuje przychód marki dziś, a sell-through to, czy partner zamówi ponownie.",
    },
    {
      question: "Czym jest sell-out?",
      answer: "Sell-out to sprzedaż towaru przez sklep lub partnera handlowego klientom końcowym, podawana w sztukach lub wartości. Dane o sell-out marka otrzymuje zwykle z raportów partnera albo z własnych sklepów. Na ich podstawie liczy się sell-through i planuje uzupełnienia.",
    },
    {
      question: "Dlaczego finanse pokazują inny sell-through?",
      answer: "Najczęstsze przyczyny to liczenie w wartości zamiast w sztukach, ujmowanie lub pomijanie zwrotów oraz inny mianownik, na przykład same dostawy zamiast całego dostępnego zapasu. Różnice dają też daty: finanse księgują wysyłkę, a dział handlowy przyjęcie towaru w sklepie. Rozwiązaniem jest jedna spisana definicja wskaźnika i wspólne źródło danych.",
    },
  ],
  seo: {
    title: "Sell-in, sell-through i sell-out: różnice w raportach",
    description: "Czym różnią się sell-in, sell-through i sell-out oraz dlaczego dział handlowy i finanse raportują inne wartości tego samego wskaźnika.",
  },
};
