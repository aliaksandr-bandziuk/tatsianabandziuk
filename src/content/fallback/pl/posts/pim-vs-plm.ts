import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

// Stand-in: real metadata and FAQ, the body is an H2 skeleton until the article is written (task 02).
const WIP = "Ta sekcja jest w przygotowaniu.";
const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: WIP },
];

export const post: Post = {
  ...postPlan("pim-vs-plm", "pl"),
  title: "System PIM i PLM w branży modowej: czym się różnią i kiedy są potrzebne",
  h1: { before: "System PIM i PLM w branży modowej:", accent: "czym się różnią i kiedy są potrzebne" },
  excerpt: "Co to jest system PIM i system PLM, jakie dane przechowuje każdy z nich i jak pilnować jakości danych produktowych w marce modowej.",
  lead: "System PLM prowadzi produkt od projektu do produkcji, a system PIM przygotowuje gotowe dane produktowe do sprzedaży w sklepach i kanałach online. Marka modowa zwykle potrzebuje obu, bo PLM należy do zespołów produktu, a PIM do e-commerce i marketingu.",
  date: "2026-07-07",
  readingMinutes: 8,
  body: [
    ...section("co-to-jest-system-pim", "Co to jest system PIM"),
    ...section("co-to-jest-system-plm", "Co to jest system PLM"),
    ...section("pim-a-plm", "PIM a PLM: dane, właściciele i moment w cyklu produktu"),
    ...section("jakosc-danych-plm-pim", "Jakość danych produktowych między PLM a PIM"),
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
  placeholder: true,
  seo: {
    title: "System PIM i PLM w branży modowej: czym się różnią",
    description: "Co to jest system PIM i system PLM, jakie dane przechowuje każdy z nich, kto za nie odpowiada i jak dbać o jakość danych produktowych w marce modowej.",
  },
};
