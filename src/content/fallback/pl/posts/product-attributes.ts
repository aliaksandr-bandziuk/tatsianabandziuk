import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

// Stand-in: real metadata and FAQ, the body is an H2 skeleton until the article is written (task 02).
const WIP = "Ta sekcja jest w przygotowaniu.";
const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: WIP },
];

export const post: Post = {
  ...postPlan("product-attributes", "pl"),
  title: "Standardy atrybutów produktu w PLM, które działają na kilku rynkach",
  h1: { before: "Standardy atrybutów produktu w PLM,", accent: "które działają na kilku rynkach" },
  excerpt: "Jakie atrybuty produktu potrzebuje marka modowa w PLM i jak ustalić zasady dla koloru, sezonu i składu wspólne dla rynków.",
  lead: "Atrybuty produktu to uporządkowane cechy modelu, takie jak kategoria, kolor, sezon, skład i rozmiary, zapisane w PLM według jednego słownika. Wspólne standardy sprawiają, że raporty, karty produktowe i plany zakupów na różnych rynkach opisują ten sam produkt tymi samymi wartościami.",
  date: "2026-05-26",
  readingMinutes: 7,
  body: [
    ...section("atrybuty-produktu-w-plm", "Jakie atrybuty produktu są potrzebne marce modowej w PLM"),
    ...section("slownik-atrybutow", "Struktura słownika atrybutów produktu"),
    ...section("atrybut-koloru", "Zasady dla atrybutu koloru"),
    ...section("kody-sezonow", "Kody sezonów wspólne dla rynków"),
    ...section("sklad-materialowy", "Skład materiałowy bez wolnego tekstu"),
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
  placeholder: true,
  seo: {
    title: "Atrybuty produktu w PLM: słownik dla marki modowej",
    description: "Jakie atrybuty produktu potrzebuje marka modowa w PLM i jak ustalić zasady dla koloru, sezonu i składu, których przestrzegają wszystkie rynki.",
  },
};
