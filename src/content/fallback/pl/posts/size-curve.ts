import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("size-curve", "pl"),
  title: "Jak zbudować krzywą rozmiarów na podstawie sprzedaży z poprzedniego sezonu",
  h1: { before: "Jak zbudować krzywą rozmiarów na podstawie", accent: "sprzedaży z poprzedniego sezonu" },
  excerpt: "Jak policzyć krzywą rozmiarów z danych sprzedaży: usunąć braki towaru, zwroty i promocje, a potem wyliczyć udziały rozmiarów.",
  lead: "Krzywa rozmiarów to procentowy podział zakupu modelu na rozmiary, na przykład 10% XS, 25% S, 35% M, 20% L i 10% XL. Buduje się ją ze sprzedaży z poprzedniego sezonu, ale dopiero po oczyszczeniu danych z braków towaru, zwrotów i promocji.",
  date: "2026-04-28",
  readingMinutes: 5,
  body: [
    { type: "h2", id: "czym-jest-krzywa-rozmiarow", text: "Czym jest krzywa rozmiarów w zakupach odzieży" },
    {
      type: "p",
      text: "Krzywa rozmiarów (ang. size curve) to rozkład procentowy, według którego kupiec dzieli ilość zamawianego modelu na rozmiary. Nie należy jej mylić z tabelą rozmiarów, którą widzi klient w sklepie internetowym. Tabela mówi, jakie wymiary ciała odpowiadają rozmiarowi M. Krzywa mówi, ile sztuk w rozmiarze M kupić, jeśli cały zakup modelu to 1000 sztuk.",
    },
    {
      type: "p",
      text: "Dobrze dobrana krzywa działa w dwie strony. Zmniejsza braki w najpopularniejszych rozmiarach, które sprzedają się pierwsze i ciągną w dół sell-through całego modelu, oraz ogranicza nadwyżki skrajnych rozmiarów, które na koniec sezonu trafiają na wyprzedaż. Kiedy analizuję wyniki modelu, który „nie sprzedał się”, często okazuje się, że problemem nie był produkt, tylko rozmiarówka: brakowało M i L, a zostały XS i XL.",
    },
    {
      type: "p",
      text: "Krzywą rozmiarów ustala się zwykle nie dla pojedynczego modelu, tylko dla grupy modeli o podobnym kroju i klientce, na przykład „sukienki damskie, krój dopasowany” albo „jeansy męskie, krój prosty”. Pojedynczy model ma za mało sprzedaży, żeby udziały były stabilne, a nowe modele i tak nie mają własnej historii.",
    },
    { type: "h2", id: "surowe-dane-sprzedazy", text: "Dlaczego surowe dane sprzedaży dają błędną krzywą rozmiarów" },
    {
      type: "p",
      text: "Najprostsze podejście – podzielić sprzedaż każdego rozmiaru przez sumę sprzedaży modelu – daje wynik, który wygląda wiarygodnie, ale jest zniekształcony. Sprzedaż pokazuje, co klienci kupili z tego, co było dostępne, a nie to, czego szukali. Trzy zjawiska psują dane najbardziej:",
    },
    {
      type: "list",
      items: [
        "Braki towaru: gdy M skończy się w połowie sezonu, jego sprzedaż przestaje rosnąć, a klienci kupują S lub L albo rezygnują. Krzywa zaniża udział M i zawyża rozmiary, które zostały na półce.",
        "Zwroty: w sprzedaży internetowej klienci często zamawiają dwa sąsiednie rozmiary i jeden odsyłają. Sprzedaż brutto zawyża więc rozmiary, które częściej wracają.",
        "Promocje i wyprzedaż: pod koniec sezonu w sklepie zostają głównie skrajne rozmiary, więc sprzedają się w obniżce. Tygodnie wyprzedaży przesuwają krzywą w stronę XS i XL.",
      ],
    },
    {
      type: "p",
      text: "Efekt się utrwala. Krzywa policzona z sezonu z brakami M prowadzi do mniejszego zakupu M w kolejnym sezonie, co powoduje kolejne braki i jeszcze niższy udział M w danych. Po dwóch–trzech sezonach marka kupuje rozmiarówkę, która coraz bardziej odbiega od rzeczywistego popytu.",
    },
    { type: "h2", id: "czyszczenie-danych-krzywa-rozmiarow", text: "Trzy kroki czyszczenia danych przed obliczeniem krzywej rozmiarów" },
    {
      type: "list",
      items: [
        "Krok 1. Tylko tygodnie pełnej dostępności. Dla każdego modelu i tygodnia sprawdza się, czy wszystkie rozmiary miały zapas na początku tygodnia. Do obliczeń bierze się tylko takie tygodnie. W sieci sklepów warto to robić na poziomie sklepu, bo braki w jednym sklepie nie są widoczne w sumie.",
        "Krok 2. Sprzedaż netto po zwrotach. Od sprzedaży każdego rozmiaru odejmuje się zwroty tego rozmiaru. Jeśli zwrot nie ma daty sprzedaży, przypisuje się go do tygodnia zwrotu – przy danych z całego sezonu różnica jest niewielka.",
        "Krok 3. Bez tygodni promocyjnych. Wyłącza się tygodnie z obniżką ceny modelu i okres wyprzedaży końcowej. Zostaje sprzedaż w pełnej cenie, która najlepiej oddaje naturalny wybór klientów.",
      ],
    },
    {
      type: "p",
      text: "Poniższy przykład pokazuje różnicę dla jednego modelu z całego sezonu. Rozmiar M skończył się po szóstym tygodniu, więc pełna dostępność dotyczy tylko pierwszych sześciu tygodni sprzedaży w pełnej cenie.",
    },
    {
      type: "table",
      caption: "Krzywa rozmiarów z surowej sprzedaży i po oczyszczeniu danych – dane ilustracyjne w sztukach",
      columns: [
        { label: "Rozmiar", kind: "text" },
        { label: "Sprzedaż w sezonie", kind: "number", suffix: " szt." },
        { label: "Krzywa surowa", kind: "number", suffix: "%" },
        { label: "Sprzedaż w tygodniach pełnej dostępności", kind: "number", suffix: " szt." },
        { label: "Krzywa po oczyszczeniu", kind: "number", suffix: "%", format: "bars" },
      ],
      rows: [
        { cells: ["XS", 90, 9, 30, 10] },
        { cells: ["S", 230, 23, 70, 23] },
        { cells: ["M", 260, 26, 105, 35] },
        { cells: ["L", 250, 25, 60, 20] },
        { cells: ["XL", 170, 17, 35, 12] },
      ],
    },
    {
      type: "p",
      text: "Surowa krzywa daje M tylko 26%, podczas gdy w tygodniach z pełną dostępnością M miało 35% sprzedaży. Przy zakupie 1000 sztuk różnica to 90 sztuk M za mało i o tyle za dużo L i XL, czyli dokładnie tych rozmiarów, które zostają na wyprzedaży.",
    },
    {
      type: "p",
      text: "Warto zwrócić uwagę na skalę: po oczyszczeniu zostało 300 sztuk z 1000, bo tygodnie z brakami i wyprzedaż odpadły. To normalne. Krzywa oparta na mniejszej, ale czystej próbie jest bliższa rzeczywistemu popytowi niż krzywa z pełnej, ale zniekształconej sprzedaży. Jeśli dane po czyszczeniu kurczą się do kilkudziesięciu sztuk, trzeba połączyć kilka podobnych modeli w jedną grupę, zamiast wracać do surowych danych.",
    },
    {
      type: "p",
      text: "Oczyszczona krzywa pokazuje historyczny popyt, ale ostateczną decyzję podejmuje kupiec. Jeśli marka zmienia grupę docelową albo wprowadza szerszą rozmiarówkę, krzywą koryguje się ręcznie i zapisuje powód korekty, żeby po sezonie sprawdzić, czy była trafna.",
    },
    { type: "h2", id: "krzywa-rozmiarow-w-excelu", text: "Jak obliczyć krzywą rozmiarów w Excelu" },
    {
      type: "p",
      text: "Wystarczy tabela z jednym wierszem na model, tydzień i rozmiar oraz kolumnami: sprzedaż w sztukach, zwroty w sztukach, zapas na początek tygodnia i znacznik promocji. Z tych danych liczy się znacznik pełnej dostępności, a potem sumuje sprzedaż netto tylko z tygodni, które przeszły oba filtry.",
    },
    {
      type: "code",
      caption: "Krzywa rozmiarów w polskiej wersji Excela. Dane w wierszach 2–500: A model, B tydzień, C rozmiar, D sprzedaż, E zwroty, F zapas na początek tygodnia, G promocja (1/0). Rozmiary w J2:J6, planowany zakup modelu w $N$1.",
      code: `H2  pełna dostępność:  =JEŻELI(LICZ.WARUNKI($A$2:$A$500;A2;$B$2:$B$500;B2;$F$2:$F$500;0)=0;1;0)   (COUNTIFS)
K2  sprzedaż netto:    =SUMA.WARUNKÓW($D$2:$D$500;$C$2:$C$500;J2;$H$2:$H$500;1;$G$2:$G$500;0)
                        -SUMA.WARUNKÓW($E$2:$E$500;$C$2:$C$500;J2;$H$2:$H$500;1;$G$2:$G$500;0)   (SUMIFS)
L2  udział rozmiaru:   =K2/SUMA($K$2:$K$6)
M2  zakup w sztukach:  =ZAOKR(L2*$N$1;0)                                                           (ROUND)`,
    },
    {
      type: "p",
      text: "Po zaokrągleniu suma sztuk może różnić się od planu o jedną–dwie sztuki; różnicę dodaje się do najpopularniejszego rozmiaru. W praktyce zakup dzieli się też na paczki dla sklepów, więc krzywą sprawdza się jeszcze na poziomie sklepu: mały sklep z trzema sztukami modelu nie przyjmie pięciu rozmiarów i wtedy dostaje tylko środek krzywej.",
    },
    {
      type: "p",
      text: "Rozsądna reguła kciuka: krzywa oparta na kilkudziesięciu sztukach jest bardziej przypadkowa niż informacyjna. Jeśli grupa modeli ma po oczyszczeniu za mało danych, łączy się ją z podobną grupą albo bierze dłuższy okres, na przykład dwa porównywalne sezony.",
    },
    { type: "h2", id: "krzywe-rozmiarow-rynki-kategorie", text: "Krzywe rozmiarów dla rynków i kategorii" },
    {
      type: "p",
      text: "Jedna krzywa dla całej marki to najczęstszy uproszczony wariant i zwykle najdroższy. Rozkład rozmiarów różni się między grupami klientów, dlatego krzywe liczy się osobno tam, gdzie dane pokazują wyraźne różnice:",
    },
    {
      type: "list",
      items: [
        "Rynki: sylwetka klientów i przyzwyczajenia dotyczące kroju różnią się między krajami. Na rynkach azjatyckich krzywa zwykle przesuwa się w stronę mniejszych rozmiarów w porównaniu z Europą, dlatego przy wejściu na nowy rynek nie kopiuje się krzywej z rynku macierzystego.",
        "Kategorie i kroje: dzianina oversize ma inną krzywą niż dopasowane marynarki, a spodnie w rozmiarach liczbowych lub z długością nogawki wymagają osobnej siatki rozmiarów.",
        "Kanały sprzedaży: w e-commerce skrajne rozmiary zwykle mają większy udział niż w sklepach stacjonarnych, bo online klient znajduje rozmiar, którego w małym sklepie często nie ma.",
        "Typy sklepów: sklepy w centrach dużych miast, sklepy w mniejszych miejscowościach i outlety mają różną klientelę, co widać także w rozkładzie rozmiarów.",
      ],
    },
    {
      type: "p",
      text: "Na krzywą wpływa też sam produkt. Zaniżona rozmiarówka, czyli model, który jest mniejszy niż wskazuje metka, przesuwa sprzedaż o rozmiar w górę i zwiększa zwroty. Taki model trzeba oznaczyć i wyłączyć z obliczeń krzywej dla grupy, a zmianę konstrukcji fasonu traktować jako powód do przeliczenia krzywej.",
    },
    {
      type: "p",
      text: "Krzywe aktualizuje się zwykle raz na sezon, przed planowaniem zakupów, na danych z ostatniego porównywalnego sezonu. Nową krzywą zawsze porównuję z poprzednią: jeśli udział rozmiaru zmienia się o kilka punktów procentowych, szukam przyczyny w danych, zanim zmienię zamówienie. Więcej o sell-through na poziomie rozmiaru i prognozie, z której wynika całkowita ilość zakupu, piszę w artykułach o sell-through i o prognozowaniu sprzedaży.",
    },
    {
      type: "p",
      text: "Jeśli chcesz policzyć krzywe rozmiarów dla swoich kategorii, rynków i kanałów sprzedaży, umów konsultację – odpowiadam w ciągu jednego dnia roboczego.",
    },
  ],
  faqTitle: "Krzywa rozmiarów — najczęstsze pytania",
  faq: [
    {
      question: "Co to jest krzywa rozmiarów?",
      answer: "Krzywa rozmiarów to rozkład procentowy, według którego dzieli się zakup modelu na poszczególne rozmiary. Kupiec stosuje ją do ustalenia, ile sztuk każdego rozmiaru zamówić. Dobra krzywa zmniejsza zarówno braki popularnych rozmiarów, jak i nadwyżki skrajnych.",
    },
    {
      question: "Jak braki towaru zniekształcają krzywą rozmiarów?",
      answer: "Gdy rozmiar M skończy się w połowie sezonu, jego sprzedaż przestaje rosnąć, choć klienci nadal go szukają. Krzywa policzona z takiej sprzedaży zaniża udział M i zawyża rozmiary, które zostały na półce. Dlatego do obliczeń bierze się tylko tygodnie, w których wszystkie rozmiary były dostępne.",
    },
    {
      question: "Jak często aktualizować krzywe rozmiarów?",
      answer: "Krzywe rozmiarów aktualizuje się zwykle raz na sezon, przed planowaniem zakupów, na danych z ostatniego porównywalnego sezonu. Częstsze zmiany mają sens przy nowym rynku, nowej grupie klientów lub zmianie konstrukcji fasonu. Warto porównywać nową krzywą z poprzednią i sprawdzać duże odchylenia.",
    },
  ],
  seo: {
    title: "Krzywa rozmiarów: jak ją policzyć z danych sprzedaży",
    description: "Jak policzyć krzywą rozmiarów z danych sprzedaży: usunąć braki towaru, zwroty i promocje, a potem wyliczyć udziały rozmiarów dla rynków.",
  },
};
