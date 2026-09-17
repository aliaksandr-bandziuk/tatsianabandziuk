import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

// Stand-in: real metadata and FAQ, the body is an H2 skeleton until the article is written (task 02).
const WIP = "Ta sekcja jest w przygotowaniu.";
const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: WIP },
];

export const post: Post = {
  ...postPlan("open-to-buy", "pl"),
  title: "Budżet open-to-buy w Excelu: wzór i model, który zespół utrzyma",
  h1: { before: "Budżet open-to-buy w Excelu: wzór i", accent: "model, który zespół utrzyma" },
  excerpt: "Czym jest budżet open-to-buy, jak go obliczyć na przykładzie i jak zbudować w Excelu model zakupów na cały sezon.",
  lead: "Open to buy (OTB) to kwota, za którą można jeszcze kupić towar w danym okresie, tak aby zrealizować plan sprzedaży i nie przekroczyć planowanego zapasu. Liczy się ją jako planowaną sprzedaż plus obniżki plus zapas końcowy, minus zapas początkowy i już zamówione dostawy.",
  date: "2026-07-14",
  readingMinutes: 8,
  body: [
    ...section("co-oznacza-open-to-buy", "Co oznacza open to buy w handlu"),
    ...section("wzor-na-open-to-buy", "Wzór na open to buy z przykładem"),
    {
      type: "calculator",
      kind: "openToBuy",
      title: "Kalkulator budżetu open-to-buy",
      labels: {
        sales: "Planowana sprzedaż",
        markdowns: "Planowane obniżki",
        endStock: "Planowany zapas na koniec okresu",
        openingStock: "Zapas na początek okresu",
        onOrder: "Zamówione dostawy",
        otb: "Budżet open-to-buy",
      },
      note: "OTB = planowana sprzedaż + planowane obniżki + planowany zapas na koniec okresu − zapas na początek okresu − zamówione dostawy. Wszystkie wartości w tej samej walucie i w tych samych cenach (detalicznych lub zakupu). Dane nie są nigdzie wysyłane.",
    },
    ...section("struktura-skoroszytu-otb", "Struktura skoroszytu open-to-buy w Excelu"),
    ...section("kontrole-budzetu-otb", "Trzy kontrole, które zatrzymują rozjazd budżetu"),
    ...section("szablon-open-to-buy", "Darmowy szablon open-to-buy w Excelu"),
  ],
  faqTitle: "Open to buy — najczęstsze pytania",
  faq: [
    {
      question: "Co to jest open to buy?",
      answer: "Open to buy to budżet zakupowy na dany okres: wartość towaru, którą dział zakupów może jeszcze zamówić bez przekroczenia planu zapasu. Stosuje się go w handlu sezonowym, zwłaszcza w modzie, gdzie zakupy planuje się z wyprzedzeniem. Budżet liczy się osobno dla kategorii i miesięcy.",
    },
    {
      question: "Jak obliczyć budżet open-to-buy?",
      answer: "Do planowanej sprzedaży dodaje się planowane obniżki i planowany zapas na koniec okresu, a następnie odejmuje zapas na początek okresu i dostawy już zamówione. Przykład: 100 000 + 8 000 + 60 000 − 70 000 − 20 000 daje 78 000 zł budżetu. Wszystkie składniki muszą być w tej samej wycenie, detalicznej albo zakupowej.",
    },
    {
      question: "Jak często aktualizować budżet zakupowy?",
      answer: "Budżet open-to-buy warto aktualizować co tydzień lub przynajmniej co miesiąc, po zamknięciu danych o sprzedaży i dostawach. Jeśli sprzedaż odbiega od planu, zmienia się planowany zapas końcowy, a z nim kwota do wydania. Rzadsza aktualizacja sprawia, że zespół kupuje według nieaktualnych liczb.",
    },
  ],
  placeholder: true,
  seo: {
    title: "Open to buy w handlu: wzór i model w Excelu",
    description: "Czym jest budżet open-to-buy, jak go obliczyć na przykładzie i jak zbudować w Excelu model zakupów, który zespół utrzyma przez cały sezon.",
  },
};
