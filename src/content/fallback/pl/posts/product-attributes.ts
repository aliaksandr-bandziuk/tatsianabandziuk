import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("product-attributes", "pl"),
  title: "Standardy atrybutów produktu w PLM, które działają na kilku rynkach",
  h1: { before: "Standardy atrybutów produktu w PLM,", accent: "które działają na kilku rynkach" },
  excerpt: "Jakie atrybuty produktu potrzebuje marka modowa w PLM i jak ustalić zasady dla koloru, sezonu i składu wspólne dla rynków.",
  lead: "Atrybuty produktu to uporządkowane cechy modelu, takie jak kategoria, kolor, sezon, skład i rozmiary, zapisane w PLM według jednego słownika. Wspólne standardy sprawiają, że raporty, karty produktowe i plany zakupów na różnych rynkach opisują ten sam produkt tymi samymi wartościami.",
  date: "2026-05-26",
  readingMinutes: 5,
  body: [
    { type: "h2", id: "atrybuty-produktu-w-plm", text: "Jakie atrybuty produktu są potrzebne marce modowej w PLM" },
    {
      type: "p",
      text: "Atrybut produktu składa się z dwóch części: nazwy atrybutu (na przykład „kolor”, „fason”, „sezon”) i wartości z zamkniętej listy („granatowy”, „oversize”, „jesień–zima 2027”). Atrybuty nie zmieniają samego produktu, ale decydują o tym, czy da się go znaleźć w filtrze sklepu, policzyć w raporcie i porównać z podobnymi modelami na innym rynku.",
    },
    {
      type: "p",
      text: "W marce modowej atrybuty powstają w PLM, kiedy model jest projektowany i zatwierdzany. Później trafiają do ERP, do systemu planowania i do PIM, który buduje z nich kartę produktu. Różnice między PLM a PIM opisuję w osobnym artykule na tym blogu. Tutaj zajmuję się tym, co wspólne: jakie atrybuty są potrzebne i jak je zapisywać, żeby działały na wszystkich rynkach.",
    },
    {
      type: "table",
      caption: "Grupy atrybutów produktu w PLM marki modowej",
      columns: [
        { label: "Grupa", kind: "text" },
        { label: "Przykładowe atrybuty", kind: "text" },
        { label: "Kto uzupełnia", kind: "text" },
      ],
      rows: [
        { cells: ["Identyfikacja", "Numer modelu, kod koloru, SKU, kod EAN", "Zespół produktu, system"] },
        { cells: ["Klasyfikacja", "Dział, kategoria, podkategoria, płeć, grupa wiekowa", "Zespół produktu"] },
        { cells: ["Cechy handlowe", "Kolor, fason, długość, krój, wzór, okazja", "Projekt, zespół produktu"] },
        { cells: ["Czas", "Sezon, okno dostawy, produkt ciągły lub sezonowy", "Planowanie, zakupy"] },
        { cells: ["Techniczne", "Skład surowcowy, gramatura, pielęgnacja, rozmiarówka", "Technolog"] },
        { cells: ["Handlowe", "Próg cenowy, kraj pochodzenia, dostawca", "Zakupy"] },
      ],
    },
    {
      type: "p",
      text: "Zasada praktyczna: atrybut zasługuje na miejsce w PLM, jeśli ktoś będzie według niego filtrował, raportował albo planował. Cechy, które służą tylko opisowi marketingowemu, lepiej zostawić w PIM.",
    },
    {
      type: "p",
      text: "Osobnej uwagi wymaga rozmiar. Na kilku rynkach ten sam model bywa opisywany rozmiarami literowymi, europejskimi numerami i oznaczeniami brytyjskimi. W PLM zapisuje się więc rozmiarówkę jako atrybut modelu (na przykład „damska literowa XS–XL”), a każdy rozmiar jako wartość z kodem wewnętrznym. Przeliczenie na lokalne oznaczenia robi tabela konwersji, a nie ręczny wpis przy każdym modelu. Dzięki temu raport sprzedaży według rozmiarów, na którym opiera się krzywa rozmiarów, jest porównywalny między rynkami.",
    },
    { type: "h2", id: "slownik-atrybutow", text: "Struktura słownika atrybutów produktu" },
    {
      type: "p",
      text: "Słownik atrybutów to lista dopuszczalnych wartości dla każdego atrybutu. Bez niego ten sam kolor szybko pojawia się jako „granat”, „granatowy”, „navy” i „dark blue”, a raport sprzedaży według kolorów pokazuje cztery wiersze tam, gdzie powinien być jeden. Słownik działający na kilku rynkach ma zawsze kod niezależny od języka i nazwy w językach rynków.",
    },
    {
      type: "table",
      caption: "Kolumny słownika atrybutów – przykład dla wartości koloru",
      columns: [
        { label: "Kolumna", kind: "text" },
        { label: "Przykład", kind: "text" },
        { label: "Po co", kind: "text" },
      ],
      rows: [
        { cells: ["Kod", "410", "Stały identyfikator, używany w systemach i raportach"] },
        { cells: ["Nazwa PL", "granatowy", "Wyświetlanie na rynku polskim"] },
        { cells: ["Nazwa EN", "navy", "Wspólny język zespołów i kolejnych tłumaczeń"] },
        { cells: ["Grupa nadrzędna", "niebieski", "Filtry w sklepie i raporty na wyższym poziomie"] },
        { cells: ["Status", "aktywny", "Wycofanych wartości nie można przypisać do nowych modeli"] },
        { cells: ["Data wprowadzenia", "2026-03-02", "Historia zmian i audyt"] },
      ],
    },
    {
      type: "p",
      text: "Kto powinien odpowiadać za słownik atrybutów? Jeden właściciel, najczęściej zespół danych produktowych albo osoba prowadząca PLM. Zespoły produktu, zakupów i e-commerce zgłaszają nowe wartości, ale zatwierdza je właściciel słownika. Przed dodaniem nowej wartości sprawdza, czy podobna już nie istnieje, i przypisuje ją do grupy nadrzędnej. Wartości się nie usuwa, tylko zmienia ich status na wycofany, żeby historyczne raporty dalej działały.",
    },
    {
      type: "p",
      text: "Proces dodania nowej wartości nie musi być skomplikowany, ale powinien być zawsze ten sam:",
    },
    {
      type: "list",
      items: [
        "Zgłoszenie: kto potrzebuje wartości, do którego atrybutu i dla jakiego modelu.",
        "Sprawdzenie: czy istniejąca wartość nie opisuje już tego samego, na przykład „ecru” wobec „złamanej bieli”.",
        "Uzupełnienie: kod, nazwy we wszystkich językach rynków, grupa nadrzędna.",
        "Publikacja: wartość trafia do słownika w PLM i jest przekazywana do ERP i PIM razem z tłumaczeniami.",
      ],
    },
    {
      type: "p",
      text: "Przy dobrze prowadzonym słowniku raport zmian jest krótki. Jeśli co tydzień przybywa kilkanaście nowych kolorów, to znak, że zespoły używają słownika jako miejsca na nazwy handlowe, a nie na wartości do raportowania.",
    },
    { type: "h2", id: "atrybut-koloru", text: "Zasady dla atrybutu koloru" },
    {
      type: "p",
      text: "Kolor sprawia najwięcej kłopotów, bo projektant, marketing i analityk potrzebują od niego czegoś innego. Rozwiązaniem jest rozdzielenie koloru na trzy poziomy, każdy z własnym zastosowaniem:",
    },
    {
      type: "list",
      items: [
        "Kod koloru: stały, niezależny od języka, wchodzi do numeru SKU. Ten sam kod oznacza ten sam odcień w każdym sezonie i na każdym rynku.",
        "Nazwa handlowa koloru: „butelkowa zieleń”, „karmel”. Może być tłumaczona i zmieniana przez marketing, bo nie służy do raportów.",
        "Kolor bazowy: krótka, zamknięta lista kilkunastu grup (czarny, biały, beżowy, niebieski, zielony…). Na nim działają filtry w sklepie i raporty sprzedaży według kolorów.",
      ],
    },
    {
      type: "p",
      text: "Dwie dodatkowe zasady oszczędzają wielu dyskusji. Kolor bazowy przypisuje się według koloru dominującego, a produkty wielobarwne dostają osobną wartość. Wzór (paski, kratka, kwiaty) jest osobnym atrybutem, a nie kolorem, bo sukienka w granatowe kwiaty powinna pojawić się w filtrze koloru „niebieski” i w filtrze wzoru „kwiaty”.",
    },
    { type: "h2", id: "kody-sezonow", text: "Kody sezonów wspólne dla rynków" },
    {
      type: "p",
      text: "Sezon wydaje się najprostszym atrybutem, a w praktyce ma najwięcej wariantów zapisu: „JZ27”, „FW 2027”, „AW27”, „jesień–zima 2027”. Jeśli każdy rynek i każdy dział używa własnej konwencji, porównanie sezonu z tym samym sezonem rok wcześniej wymaga ręcznego mapowania. Dlatego kod sezonu powinien być krótki, stały i niezależny od języka, a nazwę w lokalnym języku dodaje się w słowniku.",
    },
    {
      type: "list",
      items: [
        "Jeden format kodu, na przykład SS27 i AW27: dwie litery sezonu i dwie cyfry roku. Z takiego kodu łatwo wyciągnąć rok i typ sezonu formułą.",
        "Sezon wprowadzenia i sezon sprzedaży jako dwa osobne atrybuty. Model wprowadzony w AW26 i sprzedawany dalej w AW27 ma oba zapisane.",
        "Oznaczenie produktu ciągłego (carry-over), który nie należy do jednego sezonu. Bez niego produkty bazowe zawyżają lub zaniżają wyniki kolejnych kolekcji.",
        "Okno dostawy lub drop jako osobny atrybut w ramach sezonu, a nie część kodu sezonu.",
      ],
    },
    { type: "h2", id: "sklad-materialowy", text: "Skład materiałowy bez wolnego tekstu" },
    {
      type: "p",
      text: "Skład surowcowy to atrybut, który ma podstawę prawną. W UE nazwy włókien i sposób ich podawania na etykiecie określa rozporządzenie (UE) nr 1007/2011: włókna podaje się ich nazwami z listy w rozporządzeniu, procentowo według masy, w kolejności malejącej, w języku kraju sprzedaży. Wyroby z kilku części o różnym składzie, na przykład wierzch i podszewka, opisuje się dla każdej części osobno.",
    },
    {
      type: "p",
      text: "Wpisywanie składu wolnym tekstem („80% bawełna 20% poliester”, „bawełna 80%, PES 20”) uniemożliwia kontrolę i tłumaczenie. Zamiast tego skład zapisuje się w strukturze: część wyrobu, włókno ze słownika i procent. Z takiej struktury PIM automatycznie buduje tekst etykiety w każdym języku, a analityk może policzyć na przykład udział modeli z włóknami z recyklingu.",
    },
    {
      type: "p",
      text: "Ta sama zasada dotyczy zaleceń pielęgnacji. Symbole prania, suszenia i prasowania zapisuje się jako kody z listy, a nie jako tekst. Tekst w języku rynku generuje się z kodów, więc zmiana tłumaczenia w jednym miejscu poprawia wszystkie karty produktów.",
    },
    {
      type: "p",
      text: "Najprostsze kontrole jakości da się zrobić w Excelu na eksporcie z PLM, zanim dane trafią dalej (polska wersja Excela):",
    },
    {
      type: "code",
      caption: "Kontrola atrybutów w Excelu: kod sezonu w C, kod koloru w D, procenty włókien części głównej w F, H i J, słowniki w arkuszu Słownik.",
      code: `L2  kod sezonu:    =JEŻELI(ORAZ(DŁ(C2)=4;LUB(LEWY(C2;2)="SS";LEWY(C2;2)="AW"));"OK";"zły format")
M2  kolor:         =JEŻELI(LICZ.JEŻELI(Słownik!A:A;D2)=0;"spoza słownika";"OK")
N2  skład:         =JEŻELI(SUMA(F2;H2;J2)<>100;"suma różna od 100%";"OK")`,
    },
    { type: "h2", id: "atrybuty-a-karta-produktu", text: "Atrybuty produktu a karta produktu w sklepie" },
    {
      type: "p",
      text: "Uporządkowane atrybuty w PLM to podstawa dobrej karty produktu. Co powinna zawierać karta produktu w modzie? Nazwę, opis, cenę, zdjęcia, dostępne rozmiary z tabelą wymiarów, kolor, skład surowcowy i zalecenia pielęgnacji. Potrzebne są też identyfikatory: numer modelu, SKU i kod EAN.",
    },
    {
      type: "p",
      text: "Większość tych pól nie powinna być pisana od nowa w sklepie. Kolor, skład, rozmiary i pielęgnacja pochodzą z PLM, a opis produktu tylko je rozwija: do czego pasuje fason, jak się nosi materiał, jak dobrać rozmiar. Jeśli opis mówi „100% bawełna”, a atrybut składu w PLM zawiera elastan, klient dostaje sprzeczną informację, a marka ryzykuje zwroty i reklamacje.",
    },
    {
      type: "p",
      text: "Jeśli chcesz uporządkować słownik atrybutów w PLM tak, żeby działał na wszystkich rynkach Twojej marki, umów konsultację – odpowiadam w ciągu jednego dnia roboczego.",
    },
  ],
  faqTitle: "Atrybuty produktu — najczęstsze pytania",
  faq: [
    {
      question: "Co to są atrybuty produktu?",
      answer: "Atrybuty produktu to cechy, które opisują produkt w ustrukturyzowany sposób, na przykład kategoria, kolor, fason, materiał, sezon czy rozmiar. Każdy atrybut ma określoną listę dopuszczalnych wartości. Dzięki temu produkty można filtrować, raportować i porównywać między rynkami.",
    },
    {
      question: "Co powinna zawierać karta produktu?",
      answer: "Karta produktu w modzie powinna zawierać nazwę, opis, cenę, zdjęcia, dostępne rozmiary z tabelą wymiarów, kolor, skład surowcowy i zalecenia pielęgnacji. Potrzebne są też identyfikatory, takie jak numer modelu, SKU i kod EAN. Skład materiałowy wyrobów tekstylnych w UE musi być podany zgodnie z przepisami o etykietowaniu.",
    },
    {
      question: "Kto powinien odpowiadać za słownik atrybutów?",
      answer: "Za słownik atrybutów powinien odpowiadać jeden właściciel, najczęściej zespół danych produktowych lub osoba prowadząca PLM. Zespoły produktu, zakupów i e-commerce zgłaszają nowe wartości, ale zatwierdza je właściciel słownika. Bez tego ten sam kolor szybko pojawia się w systemie pod kilkoma nazwami.",
    },
  ],
  seo: {
    title: "Atrybuty produktu w PLM: słownik dla marki modowej",
    description: "Jakie atrybuty produktu potrzebuje marka modowa w PLM i jak ustalić zasady dla koloru, sezonu i składu, których przestrzegają wszystkie rynki.",
  },
};
