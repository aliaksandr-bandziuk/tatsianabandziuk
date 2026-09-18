import type { Post } from "../../../types";
import { postPlan } from "../../registry";

export const post: Post = {
  ...postPlan("pim-vs-plm", "pl"),
  title: "System PIM i PLM w branży modowej: czym się różnią i kiedy są potrzebne",
  h1: { before: "System PIM i PLM w branży modowej:", accent: "czym się różnią i kiedy są potrzebne" },
  excerpt: "Co to jest system PIM i system PLM, jakie dane przechowuje każdy z nich i jak pilnować jakości danych produktowych w marce modowej.",
  lead: "System PLM prowadzi produkt od projektu do produkcji, a system PIM przygotowuje gotowe dane produktowe do sprzedaży w sklepach i kanałach online. Marka modowa zwykle potrzebuje obu, bo PLM należy do zespołów produktu, a PIM do e-commerce i marketingu.",
  date: "2026-07-07",
  readingMinutes: 5,
  body: [
    { type: "h2", id: "co-to-jest-system-pim", text: "Co to jest system PIM" },
    {
      type: "p",
      text: "PIM to skrót od Product Information Management, czyli zarządzanie informacją produktową. System PIM to jedno miejsce, w którym marka gromadzi, uzupełnia i rozsyła wszystko, co klient widzi na karcie produktu: nazwę, opis, atrybuty do filtrów, zdjęcia, tabelę rozmiarów, skład i zalecenia pielęgnacji. Z PIM dane trafiają do sklepu internetowego, na marketplace’y, do aplikacji, katalogów i do partnerów hurtowych.",
    },
    {
      type: "p",
      text: "Do czego służy PIM w praktyce? Do tego, żeby ta sama sukienka miała ten sam kolor, skład i opis w każdym kanale i w każdym języku. Bez PIM te dane żyją w arkuszach, w panelu sklepu i w plikach wysyłanych do partnerów, a każdą poprawkę trzeba wprowadzać kilka razy. Typowy zakres pracy w PIM wygląda tak:",
    },
    {
      type: "list",
      items: [
        "Import danych bazowych z PLM lub ERP: numer modelu, kolor, rozmiary, kody EAN, skład, cena.",
        "Wzbogacanie: opisy marketingowe, tłumaczenia, atrybuty do filtrów w sklepie (fason, długość, dekolt, okazja).",
        "Zasoby cyfrowe: zdjęcia packshot i modelowe, wideo, przypisane do właściwego koloru.",
        "Kontrola kompletności: produkt nie trafia do kanału, dopóki nie ma wymaganych pól.",
        "Dystrybucja: eksport w formacie, którego wymaga dany kanał, na przykład plik produktowy dla marketplace’u.",
      ],
    },
    {
      type: "p",
      text: "Na polskim rynku popularne są zarówno systemy open source, jak Akeneo, jak i rozwiązania rodzime, na przykład Ergonode. Wybór narzędzia jest mniej ważny niż ustalenie, jakie dane PIM ma przyjmować z innych systemów, a jakie tworzy sam.",
    },
    { type: "h2", id: "co-to-jest-system-plm", text: "Co to jest system PLM" },
    {
      type: "p",
      text: "PLM to Product Lifecycle Management, czyli zarządzanie cyklem życia produktu. W przemyśle PLM kojarzy się z dokumentacją inżynierską, a najczęściej wymieniane programy PLM to Siemens Teamcenter, PTC Windchill czy ENOVIA. W modzie używa się systemów PLM przygotowanych dla odzieży, obuwia i akcesoriów, bo cykl produktu wygląda tu inaczej: kolekcja powstaje co sezon, a jeden model ma wiele kolorów i rozmiarów.",
    },
    {
      type: "p",
      text: "System PLM w marce modowej prowadzi produkt od pomysłu do zamówienia produkcyjnego. Przechowuje specyfikację techniczną (tech pack), materiały i dodatki, skład surowcowy, tabele wymiarów, historię próbek i przymiarek, dostawców, koszty i kalendarz kolekcji. Korzystają z niego projektanci, konstruktorzy, technolodzy, zespoły produktu i zakupów. Wszystko, co dzieje się w PLM, dzieje się zanim produkt trafi do sprzedaży.",
    },
    {
      type: "p",
      text: "Cykl życia produktu w PLM marki modowej zwykle przechodzi przez te same etapy, a każdy z nich dodaje do modelu kolejne dane:",
    },
    {
      type: "list",
      items: [
        "Koncepcja i plan kolekcji: kategoria, docelowy próg cenowy, liczba modeli w linii.",
        "Projekt i specyfikacja: szkic, tech pack, materiały, dodatki, kolorystyka.",
        "Próbki i przymiarki: kolejne wersje próbek, poprawki konstrukcyjne, zatwierdzona tabela wymiarów.",
        "Kalkulacja i wybór dostawcy: koszt zakupu, minimalne ilości, terminy.",
        "Zatwierdzenie i zamówienie produkcyjne: model dostaje kody, warianty kolor–rozmiar i trafia do ERP.",
      ],
    },
    { type: "h2", id: "pdm-a-plm", text: "Różnica między PDM a PLM" },
    {
      type: "p",
      text: "PDM (Product Data Management) to zarządzanie danymi produktu, przede wszystkim plikami i dokumentacją techniczną oraz ich wersjami. PLM obejmuje szerszy proces: przepływ pracy między zespołami, etapy zatwierdzania, kalendarz kolekcji, dostawców i koszty. W wielu systemach PDM jest po prostu jednym z modułów PLM. W modzie odpowiednikiem PDM jest biblioteka tech packów i plików projektowych, a PLM spina ją z procesem tworzenia kolekcji.",
    },
    { type: "h2", id: "pim-a-plm", text: "PIM a PLM: dane, właściciele i moment w cyklu produktu" },
    {
      type: "p",
      text: "Oba systemy przechowują dane o produkcie, dlatego łatwo je pomylić. Różnią się jednak celem, etapem, na którym pracują, i ludźmi, którzy za dane odpowiadają. Najprościej ująć to tak: PLM odpowiada na pytanie „jak ten produkt zrobić”, a PIM na pytanie „jak ten produkt sprzedać”.",
    },
    {
      type: "table",
      caption: "System PLM a system PIM w marce modowej – porównanie",
      columns: [
        { label: "Cecha", kind: "text" },
        { label: "PLM", kind: "text" },
        { label: "PIM", kind: "text" },
      ],
      rows: [
        { cells: ["Główne pytanie", "Jak zaprojektować i wyprodukować produkt", "Jak opisać i pokazać produkt w kanałach sprzedaży"] },
        { cells: ["Moment w cyklu", "Od szkicu do zamówienia produkcyjnego", "Od zatwierdzenia modelu do końca sprzedaży"] },
        { cells: ["Właściciele danych", "Projektanci, technolodzy, produkt, zakupy", "E-commerce, marketing, zespół treści"] },
        { cells: ["Typowe dane", "Tech pack, materiały, skład, wymiary, koszty, dostawcy", "Opisy, tłumaczenia, zdjęcia, atrybuty do filtrów"] },
        { cells: ["Odbiorcy danych", "Zespoły wewnętrzne i fabryki", "Klienci, marketplace’y, partnerzy hurtowi"] },
      ],
    },
    {
      type: "p",
      text: "Pomiędzy nimi zwykle stoi ERP, który nadaje kody towarowe, ceny i obsługuje zamówienia oraz stany. Typowy przepływ wygląda tak: model powstaje w PLM, po zatwierdzeniu kolekcji trafia do ERP jako indeks z wariantami kolor–rozmiar, a PIM pobiera dane bazowe i dokłada do nich treści sprzedażowe. Informacja płynie w jedną stronę. Jeśli ktoś poprawia skład w PIM, a w PLM zostaje stara wartość, przy następnym imporcie błąd wróci.",
    },
    {
      type: "p",
      text: "Moment przekazania danych też jest ważny. Zespół e-commerce potrzebuje danych wcześniej, niż się wydaje: zdjęcia i opisy powstają kilka tygodni przed dostawą towaru. Jeśli skład czy tabela wymiarów są zatwierdzane w PLM dopiero na końcu, PIM dostaje je za późno, a karta produktu startuje niekompletna.",
    },
    { type: "h2", id: "kiedy-pim-i-plm", text: "Kiedy marka modowa potrzebuje systemu PIM i PLM" },
    {
      type: "p",
      text: "Nie każda marka musi od razu wdrażać oba systemy. Z mojego doświadczenia pierwszy jest zwykle PLM albo dobrze prowadzony arkusz kolekcji, bo bez uporządkowanej specyfikacji nie da się zamówić produkcji. PIM staje się potrzebny, gdy rośnie liczba kanałów i języków. Kilka sygnałów, że przyszedł na niego czas:",
    },
    {
      type: "list",
      items: [
        "Sprzedajesz w więcej niż jednym kanale online i poprawiasz te same dane w kilku panelach.",
        "Karty produktów w różnych krajach różnią się składem lub kolorem tego samego modelu.",
        "Wprowadzenie nowej kolekcji do sklepu trwa tygodniami, bo treści i zdjęcia zbiera się ręcznie.",
        "Marketplace odrzuca produkty z powodu brakujących atrybutów.",
        "Nikt nie potrafi powiedzieć, który plik zawiera aktualny opis produktu.",
      ],
    },
    {
      type: "p",
      text: "Mała marka z jednym sklepem internetowym może przez długi czas pracować na platformie e-commerce jako prostym PIM. Warunek jest jeden: od początku trzeba ustalić, który system jest źródłem prawdy dla każdego atrybutu.",
    },
    { type: "h2", id: "jakosc-danych-plm-pim", text: "Jakość danych produktowych między PLM a PIM" },
    {
      type: "p",
      text: "Większość problemów z danymi produktowymi, które widziałam, nie wynikała z wyboru systemu, tylko z braku zasad na styku PLM i PIM. Ten sam kolor zapisany jako „granat”, „granatowy” i „navy”, skład wpisany wolnym tekstem, sezon w trzech formatach. Każda taka niespójność psuje filtry w sklepie, a później raporty sprzedaży według atrybutów.",
    },
    {
      type: "list",
      items: [
        "Źródło prawdy dla każdego atrybutu: skład, wymiary i kolor bazowy pochodzą z PLM, opis marketingowy i zdjęcia z PIM, cena z ERP. Zapisz to w jednej tabeli.",
        "Słowniki zamiast wolnego tekstu: kolor, sezon, kategoria i włókna wybiera się z listy wartości, którą prowadzi jeden właściciel.",
        "Jeden kierunek poprawek: błąd w składzie poprawia się w PLM, a nie w PIM, żeby nie wrócił przy kolejnym imporcie.",
        "Kontrola kompletności przed publikacją: produkt bez składu, tabeli rozmiarów lub zdjęć nie przechodzi do kanału.",
        "Regularny raport niezgodności: lista modeli, w których wartość w PIM różni się od wartości w PLM.",
      ],
    },
    {
      type: "p",
      text: "Zanim marka zdecyduje się na narzędzie do jakości danych, wystarczy prosty arkusz. Eksport z PIM, jeden wiersz na model i kolor, kolumny z wymaganymi atrybutami. Formuły poniżej liczą procent kompletności karty i sprawdzają, czy kolor pochodzi ze słownika (polska wersja Excela):",
    },
    {
      type: "code",
      caption: "Kontrola jakości danych produktowych w Excelu: atrybuty wymagane w kolumnach C–K, kolor w kolumnie D, słownik kolorów w arkuszu Słownik, kolumna A.",
      code: `L2  kompletność karty:     =1-LICZ.PUSTE(C2:K2)/LICZBA.KOLUMN(C2:K2)
M2  kolor ze słownika:     =JEŻELI(LICZ.JEŻELI(Słownik!A:A;D2)=0;"spoza słownika";"OK")
N2  gotowy do publikacji:  =JEŻELI(ORAZ(L2=1;M2="OK");"tak";"nie")`,
    },
    {
      type: "p",
      text: "Średnia kompletność w podziale na kategorie i sezony szybko pokazuje, gdzie dane się rozjeżdżają. O tym, jak zbudować sam słownik atrybutów, by działał na kilku rynkach, piszę w osobnym artykule o standardach atrybutów produktu w PLM.",
    },
    {
      type: "p",
      text: "Jeśli chcesz uporządkować przepływ danych produktowych między PLM, ERP i PIM w swojej marce, umów konsultację – odpowiadam w ciągu jednego dnia roboczego.",
    },
  ],
  faqTitle: "System PIM i PLM — najczęstsze pytania",
  faq: [
    {
      question: "Co to jest system PIM?",
      answer: "PIM (Product Information Management) to system do zarządzania informacją produktową: opisami, atrybutami, zdjęciami i tłumaczeniami. Zbiera dane z różnych źródeł, uzupełnia je i wysyła do sklepu internetowego, marketplace’ów i katalogów. Dzięki temu karta produktu jest taka sama w każdym kanale.",
    },
    {
      question: "Co to jest system PLM?",
      answer: "PLM (Product Lifecycle Management) to system do zarządzania cyklem życia produktu, w modzie od szkicu przez specyfikację techniczną i próbki po produkcję. Przechowuje dane takie jak materiały, skład, tabele wymiarów, dostawcy i koszty. Korzystają z niego głównie projektanci, zespoły produktu i zakupów.",
    },
    {
      question: "Jaka jest różnica między PDM a PLM?",
      answer: "PDM (Product Data Management) zarządza danymi i dokumentacją techniczną produktu, na przykład plikami projektowymi i ich wersjami. PLM obejmuje szerszy proces: cały cykl życia produktu, przepływ pracy między zespołami, kalendarz kolekcji i dostawców. Często PDM jest jednym z modułów systemu PLM.",
    },
    {
      question: "Czy marka modowa potrzebuje jednocześnie PIM i PLM?",
      answer: "Przy kilku kanałach sprzedaży i wielu rynkach zazwyczaj tak, bo oba systemy obsługują inne etapy i innych właścicieli danych. Mała marka z jednym sklepem internetowym może zacząć od PLM lub dobrze prowadzonego arkusza i platformy e-commerce. Najważniejsze jest ustalenie, który system jest źródłem prawdy dla każdego atrybutu.",
    },
  ],
  seo: {
    title: "System PIM i PLM w branży modowej: czym się różnią",
    description: "Co to jest system PIM i system PLM, jakie dane przechowuje każdy z nich, kto za nie odpowiada i jak dbać o jakość danych produktowych w marce modowej.",
  },
};
