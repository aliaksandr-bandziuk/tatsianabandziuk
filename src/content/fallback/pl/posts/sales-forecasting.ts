import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

// Stand-in: real metadata and FAQ, the body is an H2 skeleton until the article is written (task 02).
const WIP = "Ta sekcja jest w przygotowaniu.";
const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: WIP },
];

export const post: Post = {
  ...postPlan("sales-forecasting", "pl"),
  title: "Prognozowanie sprzedaży i popytu w handlu: metody i przykład w Excelu",
  h1: { before: "Prognozowanie sprzedaży i popytu w handlu:", accent: "metody i przykład w Excelu" },
  excerpt: "Metody prognozowania sprzedaży i popytu w handlu, specyfika mody sezonowej i prognoza sprzedaży w Excelu krok po kroku.",
  lead: "Prognozowanie sprzedaży to szacowanie przyszłej sprzedaży na podstawie danych historycznych, sezonowości i planowanych działań, takich jak promocje czy nowe kolekcje. W handlu modowym prognozuje się głównie na poziomie kategorii i tygodni, bo dla nowych modeli nie ma historii sprzedaży.",
  date: "2026-06-02",
  readingMinutes: 8,
  body: [
    ...section("metody-prognozowania-sprzedazy", "Metody prognozowania sprzedaży"),
    ...section("prognozowanie-popytu-w-modzie", "Prognozowanie popytu w handlu modowym"),
    ...section("prognoza-sprzedazy-w-excelu", "Prognoza sprzedaży w Excelu krok po kroku"),
  ],
  faqTitle: "Prognozowanie sprzedaży — najczęstsze pytania",
  faq: [
    {
      question: "Jakie są metody prognozowania sprzedaży?",
      answer: "Metody dzielą się na ilościowe i jakościowe. Ilościowe to między innymi średnia ruchoma, wygładzanie wykładnicze, regresja i modele sezonowe, które wykorzystują historię sprzedaży. Jakościowe opierają się na ocenie ekspertów i przydają się tam, gdzie historii brakuje, na przykład przy nowych produktach.",
    },
    {
      question: "Czym różni się prognozowanie sprzedaży od prognozowania popytu?",
      answer: "Prognoza sprzedaży szacuje, ile faktycznie się sprzeda, więc jest ograniczona dostępnym zapasem. Prognoza popytu szacuje, ile klienci chcieliby kupić, gdyby towaru nie brakowało. W modzie różnica jest duża, bo braki rozmiarów obniżają sprzedaż i zaniżają prognozę na kolejny sezon.",
    },
    {
      question: "Jak zrobić prognozę sprzedaży w Excelu?",
      answer: "Najprościej przygotować tabelę z datami i sprzedażą, a następnie użyć funkcji Arkusz prognozy na karcie Dane albo formuły PROGNOZA.ETS, która uwzględnia sezonowość. Dla trendu bez sezonowości wystarczy PROGNOZA.LINIOWA. Wynik warto porównać z rzeczywistą sprzedażą z kilku ostatnich okresów, zanim użyje się go w planie zakupów.",
    },
  ],
  placeholder: true,
  seo: {
    title: "Prognozowanie sprzedaży w handlu: metody i Excel",
    description: "Metody prognozowania sprzedaży i popytu w handlu, specyfika mody sezonowej i prognoza sprzedaży w Excelu krok po kroku na prostym przykładzie.",
  },
};
