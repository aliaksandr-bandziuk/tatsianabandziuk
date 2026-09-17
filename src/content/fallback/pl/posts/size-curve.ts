import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

// Stand-in: real metadata and FAQ, the body is an H2 skeleton until the article is written (task 02).
const WIP = "Ta sekcja jest w przygotowaniu.";
const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: WIP },
];

export const post: Post = {
  ...postPlan("size-curve", "pl"),
  title: "Jak zbudować krzywą rozmiarów na podstawie sprzedaży z poprzedniego sezonu",
  h1: { before: "Jak zbudować krzywą rozmiarów na podstawie", accent: "sprzedaży z poprzedniego sezonu" },
  excerpt: "Jak policzyć krzywą rozmiarów z danych sprzedaży: usunąć braki towaru, zwroty i promocje, a potem wyliczyć udziały rozmiarów.",
  lead: "Krzywa rozmiarów to procentowy podział zakupu modelu na rozmiary, na przykład 10% XS, 25% S, 35% M, 20% L i 10% XL. Buduje się ją ze sprzedaży z poprzedniego sezonu, ale dopiero po oczyszczeniu danych z braków towaru, zwrotów i promocji.",
  date: "2026-04-28",
  readingMinutes: 6,
  body: [
    ...section("czym-jest-krzywa-rozmiarow", "Czym jest krzywa rozmiarów w zakupach odzieży"),
    ...section("surowe-dane-sprzedazy", "Dlaczego surowe dane sprzedaży dają błędną krzywą rozmiarów"),
    ...section("czyszczenie-danych-krzywa-rozmiarow", "Trzy kroki czyszczenia danych przed obliczeniem krzywej rozmiarów"),
    ...section("krzywe-rozmiarow-rynki-kategorie", "Krzywe rozmiarów dla rynków i kategorii"),
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
  placeholder: true,
  seo: {
    title: "Krzywa rozmiarów: jak ją policzyć z danych sprzedaży",
    description: "Jak policzyć krzywą rozmiarów z danych sprzedaży: usunąć braki towaru, zwroty i promocje, a potem wyliczyć udziały rozmiarów dla rynków.",
  },
};
