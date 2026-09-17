import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

// Stand-in: real metadata and FAQ, the body is an H2 skeleton until the article is written (task 02).
const WIP = "Ta sekcja jest w przygotowaniu.";
const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: WIP },
];

export const post: Post = {
  ...postPlan("category-management", "pl"),
  title: "Category management w handlu modowym: zasady i etapy",
  h1: { before: "Category management w handlu modowym:", accent: "zasady i etapy" },
  excerpt: "Co to jest category management, jakie są jego etapy i czym różni się od planowania asortymentu w marce modowej.",
  lead: "Category management to zarządzanie asortymentem według kategorii traktowanych jak osobne jednostki biznesowe, z własnym celem, strategią, wynikami i odpowiedzialną osobą. W handlu modowym oznacza to, że sukienki, kurtki czy akcesoria mają osobne plany sprzedaży, marży, cen i zapasu.",
  date: "2026-03-17",
  readingMinutes: 6,
  body: [
    ...section("co-to-jest-category-management", "Co to jest category management"),
    ...section("etapy-category-management", "Etapy category management"),
    ...section("category-management-a-planowanie-asortymentu", "Category management a planowanie asortymentu"),
  ],
  faqTitle: "Category management — najczęstsze pytania",
  faq: [
    {
      question: "Co to jest category management?",
      answer: "Category management to podejście, w którym sklep lub marka zarządza każdą kategorią produktów jak odrębnym biznesem. Kategoria ma określoną rolę, cele sprzedaży i marży oraz własną strategię asortymentu, cen i promocji. Wyniki ocenia się na poziomie kategorii, a nie pojedynczych produktów.",
    },
    {
      question: "Jakie są etapy category management?",
      answer: "Klasyczny model ECR ma osiem etapów: definicję kategorii, określenie jej roli, ocenę, kartę wyników, strategie, taktyki, wdrożenie i przegląd. W praktyce marki modowe upraszczają go do cyklu sezonowego: analiza poprzedniego sezonu, plan kategorii, zakup, śledzenie sprzedaży i wnioski. Ważne, by każdy etap kończył się konkretną decyzją.",
    },
    {
      question: "Czym zajmuje się category manager?",
      answer: "Category manager odpowiada za wynik swojej kategorii: sprzedaż, marżę i zapas. Decyduje o asortymencie, cenach i promocjach, współpracuje z dostawcami lub zespołem produktu i analizuje dane sprzedażowe. W modzie jego rola często łączy się z rolą kupca lub merchandisera.",
    },
    {
      question: "Czym category management różni się od planowania asortymentu?",
      answer: "Planowanie asortymentu odpowiada na pytanie, jakie modele, kolory, rozmiary i ilości kupić na sezon. Category management jest szersze: obejmuje też ceny, promocje, ekspozycję i cele finansowe kategorii. Planowanie asortymentu jest więc jednym z narzędzi category managementu.",
    },
  ],
  placeholder: true,
  seo: {
    title: "Category management w handlu modowym: zasady i etapy",
    description: "Co to jest category management, jakie są jego etapy i czym różni się od planowania asortymentu w marce modowej i sieci sklepów odzieżowych.",
  },
};
