import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("markup-vs-margin", "pl"),
  title: "Marża a narzut w handlu: wzory, różnice i kalkulator marży",
  h1: { before: "Marża a narzut w handlu: wzory, różnice i", accent: "kalkulator marży" },
  excerpt: "Jak obliczyć marżę i narzut, jak przeliczyć jedno na drugie i dlaczego w handlu modowym liczy się marża po obniżkach.",
  lead:
    "Marża to zysk liczony jako procent ceny sprzedaży, a narzut to ten sam zysk liczony jako procent kosztu zakupu. Przy zakupie za 80 zł i sprzedaży za 200 zł netto marża wynosi 60%, a narzut 150% – obie liczby opisują tę samą transakcję, ale z innej podstawy.",
  date: "2026-08-04",
  featured: true,
  readingMinutes: 5,
  body: [
    { type: "h2", id: "roznica", text: "Czym różni się marża od narzutu" },
    {
      type: "p",
      text: "Marża i narzut zaczynają się od tej samej kwoty: różnicy między ceną sprzedaży a kosztem zakupu. W handlu nazywa się ją marżą kwotową albo zyskiem na sztuce. Różnica pojawia się dopiero przy liczeniu procentu. Marża procentowa dzieli zysk przez cenę sprzedaży, narzut dzieli go przez koszt zakupu. Ponieważ koszt jest zawsze niższy od ceny, narzut jest zawsze wyższy od marży.",
    },
    {
      type: "p",
      text: "W codziennym języku słowo „marża” bywa używane dla obu wskaźników. Dostawca mówi „dajemy 100% marży”, a ma na myśli narzut. W budżecie i w raportach warto trzymać się ścisłych definicji, bo pomyłka między nimi zmienia wynik o kilkadziesiąt punktów procentowych.",
    },
    {
      type: "table",
      caption: "Marża a narzut – porównanie na przykładzie sukienki kupionej za 80 zł i sprzedanej za 200 zł netto (liczby ilustracyjne)",
      columns: [{ label: "Cecha", kind: "text" }, { label: "Marża", kind: "text" }, { label: "Narzut", kind: "text" }],
      rows: [
        { cells: ["Podstawa procentu", "Cena sprzedaży netto", "Koszt zakupu netto"] },
        { cells: ["Wzór", "(cena − koszt) ÷ cena × 100%", "(cena − koszt) ÷ koszt × 100%"] },
        { cells: ["Wynik w przykładzie", "60%", "150%"] },
        { cells: ["Górna granica", "Poniżej 100%", "Brak granicy"] },
        { cells: ["Kto używa", "Finanse, zarząd, raporty wyniku", "Zakupy, kalkulacja ceny"] },
      ],
    },
    { type: "h2", id: "kalkulator", text: "Kalkulator marży i narzutu" },
    {
      type: "p",
      text: "Kalkulator poniżej liczy marżę procentową, narzut i zysk na sztuce z kosztu zakupu i ceny sprzedaży. Pole „Docelowa marża” pokazuje, jaką cenę netto trzeba ustawić, żeby przy danym koszcie osiągnąć wybraną marżę. Wszystkie kwoty wpisuje się netto, bez VAT.",
    },
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
    { type: "h2", id: "jak-obliczyc-marze", text: "Jak obliczyć marżę: wzór i przykład" },
    { type: "formula", text: "Marża % = (cena sprzedaży netto − koszt zakupu netto) ÷ cena sprzedaży netto × 100%" },
    {
      type: "p",
      text: "Przykład: sukienka kosztuje w zakupie 80 zł netto, a cena sprzedaży netto wynosi 200 zł. Marża kwotowa to 200 − 80 = 120 zł. Marża procentowa to 120 ÷ 200 × 100% = 60%. Oznacza to, że z każdej złotówki przychodu 60 groszy zostaje na pokrycie kosztów sklepu, zespołu, marketingu i na zysk.",
    },
    {
      type: "p",
      text: "Wzór działa też w drugą stronę. Gdy znany jest koszt i docelowa marża, cenę liczy się tak: cena = koszt ÷ (1 − marża). Przy koszcie 80 zł i docelowej marży 60% cena netto wynosi 80 ÷ 0,4 = 200 zł. Tego wzoru używa się przy kalkulacji cen nowej kolekcji.",
    },
    {
      type: "p",
      text: "Marżę kategorii lub całego sklepu liczy się z sum, a nie jako średnią z marż modeli. Jeśli jeden model dał 10 000 zł sprzedaży przy marży 60%, a drugi 2000 zł przy marży 30%, marża łączna wynosi (6000 + 600) ÷ 12 000 = 55%, a nie 45%. Taka marża ważona sprzedażą jest jedyną, którą można porównać z budżetem.",
    },
    { type: "h2", id: "jak-obliczyc-narzut", text: "Jak obliczyć narzut: wzór i przykład" },
    { type: "formula", text: "Narzut % = (cena sprzedaży netto − koszt zakupu netto) ÷ koszt zakupu netto × 100%" },
    {
      type: "p",
      text: "Dla tej samej sukienki narzut wynosi 120 ÷ 80 × 100% = 150%. Cenę z narzutu liczy się prościej niż z marży: cena = koszt × (1 + narzut), czyli 80 × 2,5 = 200 zł. Dlatego działy zakupów często pracują na mnożniku. Mnożnik 2,5 to narzut 150%, mnożnik 3 to narzut 200%.",
    },
    { type: "h2", id: "przeliczanie", text: "Jak przeliczyć narzut na marżę i marżę na narzut" },
    {
      type: "p",
      text: "Oba wskaźniki można przeliczać bez znajomości ceny i kosztu. Wystarczą dwa wzory, w których procenty zapisuje się jako ułamki dziesiętne:",
    },
    { type: "formula", text: "Marża = narzut ÷ (1 + narzut)     Narzut = marża ÷ (1 − marża)" },
    {
      type: "table",
      caption: "Tabela przeliczeń narzutu na marżę (wartości zaokrąglone do jednego miejsca po przecinku)",
      columns: [
        { label: "Narzut", kind: "number", suffix: "%" },
        { label: "Mnożnik ceny", kind: "number" },
        { label: "Marża", kind: "number", suffix: "%", format: "bars" },
      ],
      rows: [
        { cells: [25, 1.25, 20] },
        { cells: [50, 1.5, 33.3] },
        { cells: [100, 2, 50] },
        { cells: [150, 2.5, 60] },
        { cells: [200, 3, 66.7] },
        { cells: [250, 3.5, 71.4] },
        { cells: [300, 4, 75] },
      ],
    },
    {
      type: "p",
      text: "Tabela pokazuje, że podwojenie narzutu nie podwaja marży. Przejście z narzutu 150% na 300% podnosi marżę tylko z 60% do 75%, a cena rośnie przy tym o 60%.",
    },
    { type: "h2", id: "marza-handlowa-moda", text: "Marża handlowa w handlu modowym" },
    {
      type: "p",
      text: "W modzie marża handlowa ma kilka poziomów i warto je rozróżniać w raportach. Marża początkowa (initial margin) wynika z ceny katalogowej i kosztu zakupu. Marża zrealizowana to wynik po obniżkach, promocjach i zwrotach. Różnica między nimi pokazuje, ile kosztował sezon.",
    },
    {
      type: "list",
      items: [
        "Koszt zakupu powinien być kosztem „w magazynie” (landed cost): cena od dostawcy plus transport, cło i różnice kursowe. Liczenie marży od samej ceny fabrycznej zawyża wynik.",
        "Obniżka o 30% zmienia marżę bardziej, niż się wydaje. Sukienka za 200 zł po obniżce kosztuje 140 zł, a marża spada z 60% do 42,9%.",
        "Marżę planuje się na poziomie kategorii i sezonu, a nie pojedynczego modelu. Modele wejściowe mogą mieć niższą marżę, jeśli linia cenowa jako całość osiąga cel.",
        "W sklepach w kilku krajach marżę porównuje się po przeliczeniu cen na jedną walutę i bez lokalnego VAT.",
      ],
    },
    {
      type: "p",
      text: "Przykład sezonu: marka kupuje 1000 sztuk sukienki po 80 zł i ustala cenę 200 zł netto, czyli marżę początkową 60%. W pełnej cenie sprzedaje się 600 sztuk, kolejne 300 po obniżce o 30%, a 100 sztuk zostaje w magazynie. Przychód wynosi 600 × 200 + 300 × 140 = 162 000 zł, koszt sprzedanych sztuk 900 × 80 = 72 000 zł, więc marża zrealizowana to 90 000 ÷ 162 000 = 55,6%. Pozostałe 100 sztuk to jeszcze 8000 zł kosztu, który trzeba będzie odzyskać w kolejnej wyprzedaży lub w outlecie.",
    },
    {
      type: "p",
      text: "Dlatego przy planowaniu kolekcji marżę początkową ustawia się z zapasem na obniżki. Jeśli historycznie sezon kończy się marżą zrealizowaną niższą o kilkanaście punktów, cena katalogowa musi to uwzględniać.",
    },
    { type: "h2", id: "netto-brutto", text: "Czy marżę liczy się od ceny netto czy brutto" },
    {
      type: "p",
      text: "Marżę i narzut liczy się od kwot netto, czyli bez VAT. VAT nie jest przychodem sklepu, tylko podatkiem przekazywanym do urzędu skarbowego. Koszt zakupu i cena sprzedaży muszą być wyrażone w tej samej postaci: oba netto.",
    },
    {
      type: "p",
      text: "Przykład błędu: cena na metce to 246 zł brutto, co przy stawce 23% daje 200 zł netto. Liczenie marży od ceny brutto daje (246 − 80) ÷ 246 = 67,5% zamiast prawidłowych 60%. Ceny detaliczne w systemie kasowym są zwykle brutto, więc przed analizą trzeba je przeliczyć. Osobnym tematem jest procedura VAT marża, stosowana m.in. przy sprzedaży towarów używanych: w niej podatek nalicza się od marży, a nie od całej ceny.",
    },
    { type: "h2", id: "bledy", text: "Najczęstsze błędy w liczeniu marży i narzutu" },
    {
      type: "list",
      items: [
        "Mylenie marży z narzutem przy ustalaniu ceny: cel „50% marży” zrealizowany jako narzut 50% daje w praktyce marżę 33,3%.",
        "Mieszanie kwot netto i brutto w jednym wzorze.",
        "Pomijanie kosztów transportu i cła w koszcie zakupu.",
        "Liczenie średniej marży jako średniej z procentów zamiast ilorazu sumy zysku i sumy sprzedaży. Model sprzedany w 10 sztukach waży wtedy tyle samo co model sprzedany w 1000 sztuk.",
        "Raportowanie tylko marży początkowej, bez marży po obniżkach i zwrotach.",
      ],
    },
    {
      type: "p",
      text: "Jeśli chcesz sprawdzić, jak marża zmienia się w Twojej strukturze cen i obniżek, umów konsultację dotyczącą analizy cen – odpowiadam w ciągu jednego dnia roboczego.",
    },
  ],
  faqTitle: "Marża i narzut – najczęstsze pytania",
  faq: [
    {
      question: "Jaki jest wzór na marżę?",
      answer:
        "Marża procentowa = (cena sprzedaży netto − koszt zakupu netto) ÷ cena sprzedaży netto × 100%. Przy koszcie 80 zł i cenie 200 zł marża wynosi 60%. Marża kwotowa to sama różnica, czyli 120 zł.",
    },
    {
      question: "Czy marża liczy się od netto czy brutto?",
      answer:
        "Marżę liczy się od kwot netto, bez VAT, zarówno po stronie ceny, jak i kosztu. VAT nie jest przychodem sprzedawcy, więc liczenie od ceny brutto zawyża marżę. Wyjątkiem jest procedura VAT marża, w której podatek nalicza się od samej marży.",
    },
    {
      question: "Ile marży można narzucić?",
      answer:
        "Przepisy co do zasady nie ograniczają wysokości marży ani narzutu; wyjątki dotyczą towarów z cenami urzędowymi, np. leków refundowanych. W praktyce granicę wyznacza cena, którą klient zaakceptuje, oraz marża potrzebna na pokrycie kosztów i obniżek. W modzie cenę katalogową ustala się zwykle z zapasem na wyprzedaż sezonową.",
    },
    {
      question: "Jak przeliczyć narzut na marżę?",
      answer:
        "Marża = narzut ÷ (1 + narzut), gdzie procenty zapisuje się jako ułamki. Narzut 100% (1,0) daje marżę 1,0 ÷ 2,0 = 50%, a narzut 150% daje marżę 60%. W drugą stronę: narzut = marża ÷ (1 − marża).",
    },
    {
      question: "Czym różni się marża od narzutu?",
      answer:
        "Oba wskaźniki mierzą ten sam zysk na sztuce, ale marża odnosi go do ceny sprzedaży, a narzut do kosztu zakupu. Dlatego narzut jest zawsze wyższy od marży, a marża nie może przekroczyć 100%. Marży używają zwykle finanse, narzutu – zakupy przy kalkulacji ceny.",
    },
  ],
  seo: {
    title: "Marża a narzut: wzory, różnice i kalkulator marży",
    description:
      "Jak obliczyć marżę i narzut: wzory, przykłady, tabela przeliczeń i kalkulator marży. Marża w handlu modowym, netto czy brutto i częste błędy.",
  },
};
