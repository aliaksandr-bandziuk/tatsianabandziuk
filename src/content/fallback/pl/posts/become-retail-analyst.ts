import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

// Stand-in: real metadata and FAQ, the body is an H2 skeleton until the article is written (task 02).
const WIP = "Ta sekcja jest w przygotowaniu.";
const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: WIP },
];

export const post: Post = {
  ...postPlan("become-retail-analyst", "pl"),
  title: "Jak zostać analitykiem w handlu i modzie: role, umiejętności, pierwsze kroki",
  h1: { before: "Jak zostać analitykiem w handlu i modzie:", accent: "role, umiejętności, pierwsze kroki" },
  excerpt: "Czym zajmuje się analityk danych w handlu, kim są kupiec, merchandiser i category manager i od czego zacząć w tej branży.",
  lead: "Analityk w handlu zamienia dane o sprzedaży, zapasie i cenach w decyzje zakupowe i handlowe, a zostaje się nim zwykle przez naukę Excela i Power BI oraz praktykę w dziale zakupów, planowania lub sprzedaży. W modzie ta rola ściśle współpracuje z kupcem, merchandiserem i category managerem.",
  date: "2026-05-05",
  readingMinutes: 8,
  body: [
    ...section("analityk-danych-w-handlu", "Czym zajmuje się analityk danych w handlu"),
    ...section("kupiec-merchandiser-category-manager", "Kupiec, merchandiser i category manager — kto to i czym się różnią"),
    ...section("umiejetnosci-analityka-w-handlu", "Umiejętności analityka w handlu: Excel, Power BI, SQL"),
    ...section("analityk-danych-w-branzy-modowej", "Jak zostać analitykiem danych w branży modowej"),
  ],
  faqTitle: "Praca analityka w handlu — najczęstsze pytania",
  faq: [
    {
      question: "Jak zostać analitykiem danych w handlu?",
      answer: "Podstawą jest dobra znajomość Excela (tabele przestawne, wyszukiwanie danych, formuły warunkowe), a następnie Power BI lub innego narzędzia do raportów. Równie ważne jest rozumienie wskaźników handlowych, takich jak marża, sell-through i rotacja zapasu. Wiele osób zaczyna w dziale sprzedaży, zakupów lub alokacji i stopniowo przejmuje raportowanie.",
    },
    {
      question: "Kupiec — kto to jest w handlu?",
      answer: "Kupiec (buyer) wybiera produkty do asortymentu, negocjuje z dostawcami ceny i warunki oraz decyduje o ilościach zakupu. W modzie odpowiada za kolekcję w swojej kategorii i jej wynik sprzedażowy. Pracuje na danych przygotowanych przez analityków i merchandiserów.",
    },
    {
      question: "Czym różni się merchandiser od category managera?",
      answer: "Merchandiser w modzie planuje ilości, budżety zakupowe i dystrybucję towaru do sklepów, pilnując, by zapas odpowiadał sprzedaży. Category manager odpowiada za całą kategorię jako biznes: asortyment, ceny, promocje i wynik finansowy. Zakres obu ról różni się między firmami, dlatego warto czytać opis obowiązków, a nie sam tytuł stanowiska.",
    },
    {
      question: "Czy analityk w handlu musi znać SQL?",
      answer: "Na początku wystarczy biegły Excel i podstawy Power BI, ale SQL szybko staje się przydatny przy dużych zbiorach danych. Pozwala samodzielnie pobierać dane z hurtowni zamiast czekać na eksport z działu IT. W większych firmach handlowych znajomość SQL jest coraz częściej standardem.",
    },
  ],
  placeholder: true,
  seo: {
    title: "Jak zostać analitykiem danych w handlu i modzie",
    description: "Czym zajmuje się analityk danych w handlu, kim jest kupiec, merchandiser i category manager, jakich umiejętności wymagają te role i jak zacząć.",
  },
};
