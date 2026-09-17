import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

// Stand-in: real metadata and FAQ, the body is an H2 skeleton until the article is written (task 02).
const WIP = "Ta sekcja jest w przygotowaniu.";
const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: WIP },
];

export const post: Post = {
  ...postPlan("pricing-strategy", "pl"),
  title: "Strategie cenowe i polityka cenowa w handlu detalicznym",
  h1: { before: "Strategie cenowe i polityka cenowa", accent: "w handlu detalicznym" },
  excerpt: "Czym jest polityka cenowa, jakie strategie cenowe i metody ustalania cen stosuje handel detaliczny i jak planować obniżki.",
  lead: "Polityka cenowa to zbiór zasad, według których sklep lub marka ustala, zmienia i obniża ceny; strategia cenowa to wybrany sposób pozycjonowania ceny wobec klientów i konkurencji. W handlu modowym obie decydują o marży, tempie sprzedaży i o tym, ile towaru trzeba będzie wyprzedać na koniec sezonu.",
  date: "2026-06-16",
  readingMinutes: 8,
  body: [
    ...section("co-to-jest-polityka-cenowa", "Co to jest polityka cenowa"),
    ...section("rodzaje-strategii-cenowych", "Rodzaje strategii cenowych w handlu"),
    ...section("metody-ustalania-cen", "Metody ustalania cen"),
    ...section("obnizki-cen-i-wyprzedaz", "Obniżki cen i wyprzedaż sezonowa"),
    ...section("ceny-psychologiczne", "Ceny psychologiczne w sklepie"),
  ],
  faqTitle: "Strategie cenowe i polityka cenowa — najczęstsze pytania",
  faq: [
    {
      question: "Co to jest polityka cenowa?",
      answer: "Polityka cenowa to spisane zasady ustalania cen w firmie: poziomy cenowe, relacja do kosztu i konkurencji, zasady promocji i obniżek. Obejmuje też to, kto może zmienić cenę i na jakiej podstawie. Dzięki niej ceny w kategoriach, kanałach i na rynkach są spójne.",
    },
    {
      question: "Jakie są 4 strategie cenowe?",
      answer: "Najczęściej wymienia się strategię wysokich cen (zbierania śmietanki), strategię niskich cen (penetracji rynku), strategię średnich cen oraz strategię cen prestiżowych. Pierwsza zakłada wysoką cenę na starcie i jej stopniowe obniżanie, druga szybkie zdobycie udziału w rynku niską ceną. W modzie marki często łączą je w obrębie jednej kolekcji, na różnych progach cenowych.",
    },
    {
      question: "Jakie są 3 metody ustalania cen?",
      answer: "Podstawowe metody to metoda kosztowa (koszt plus narzut), metoda popytowa oparta na wartości dla klienta i metoda konkurencyjna, która bierze za punkt odniesienia ceny konkurentów. W praktyce detalista liczy cenę od kosztu, a potem koryguje ją do progów cenowych i cen rynkowych. Sama metoda kosztowa rzadko wystarcza w modzie.",
    },
  ],
  placeholder: true,
  seo: {
    title: "Strategie cenowe i polityka cenowa w handlu detalicznym",
    description: "Czym jest polityka cenowa, jakie strategie cenowe i metody ustalania cen stosuje handel detaliczny oraz jak planować obniżki cen i ceny psychologiczne.",
  },
};
