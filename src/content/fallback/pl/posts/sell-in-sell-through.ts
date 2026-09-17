import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

// Stand-in: real metadata and FAQ, the body is an H2 skeleton until the article is written (task 02).
const WIP = "Ta sekcja jest w przygotowaniu.";
const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: WIP },
];

export const post: Post = {
  ...postPlan("sell-in-sell-through", "pl"),
  title: "Sell-in a sell-through: dlaczego dział handlowy i finanse mają różne liczby",
  h1: { before: "Sell-in a sell-through: dlaczego dział handlowy i finanse", accent: "mają różne liczby" },
  excerpt: "Czym różnią się sell-in, sell-through i sell-out oraz dlaczego dział handlowy i finanse raportują inne wartości tego samego wskaźnika.",
  lead: "Sell-in to sprzedaż marki do partnera handlowego, sell-out to sprzedaż partnera klientom końcowym, a sell-through to procent dostępnego towaru, który trafił do klientów. Dział handlowy i finanse mają różne liczby, bo liczą sell-through w innych jednostkach, od innej bazy i w innych datach.",
  date: "2026-05-12",
  readingMinutes: 6,
  body: [
    ...section("definicje-sell-in-sell-through-sell-out", "Sell-in, sell-through i sell-out — definicje"),
    ...section("rozbieznosci-sell-through", "Trzy rozbieżności w definicji sell-through"),
    ...section("wspolna-definicja-sell-through", "Jak uzgodnić jedną definicję sell-through z finansami"),
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
  placeholder: true,
  seo: {
    title: "Sell-in, sell-through i sell-out: różnice w raportach",
    description: "Czym różnią się sell-in, sell-through i sell-out oraz dlaczego dział handlowy i finanse raportują inne wartości tego samego wskaźnika.",
  },
};
