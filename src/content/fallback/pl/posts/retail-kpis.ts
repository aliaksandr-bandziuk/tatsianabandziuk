import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

// Stand-in: real metadata and FAQ, the body is an H2 skeleton until the article is written (task 02).
const WIP = "Ta sekcja jest w przygotowaniu.";
const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: WIP },
];

export const post: Post = {
  ...postPlan("retail-kpis", "pl"),
  title: "KPI w handlu detalicznym: najważniejsze wskaźniki sprzedaży",
  h1: { before: "KPI w handlu detalicznym:", accent: "najważniejsze wskaźniki sprzedaży" },
  excerpt: "Najważniejsze wskaźniki sprzedaży w sklepie i marce modowej oraz sposób liczenia KPI w Excelu i Power BI.",
  lead: "Najważniejsze wskaźniki sprzedaży w handlu detalicznym to sprzedaż rok do roku, marża, sell-through, rotacja zapasu, tygodnie zapasu i GMROI. Razem pokazują, czy sklep lub marka sprzedaje wystarczająco dużo, z odpowiednim zyskiem i bez zamrażania gotówki w towarze.",
  date: "2026-06-23",
  readingMinutes: 7,
  body: [
    ...section("wskazniki-sprzedazy-w-sklepie", "Najważniejsze wskaźniki sprzedaży w sklepie"),
    ...section("kpi-sprzedazy-marki-modowej", "KPI sprzedaży dla marki modowej"),
    ...section("kpi-w-excelu-i-power-bi", "Jak liczyć KPI w Excelu i Power BI"),
  ],
  faqTitle: "KPI i wskaźniki sprzedaży w handlu — najczęstsze pytania",
  faq: [
    {
      question: "Jakie są najważniejsze wskaźniki sprzedaży w sklepie?",
      answer: "W sklepie stacjonarnym podstawą są obrót, liczba paragonów, średnia wartość paragonu, konwersja (odsetek wchodzących, którzy kupili) i sprzedaż na metr kwadratowy. Do tego dochodzą wskaźniki towarowe: marża, sell-through i rotacja zapasu. Porównuje się je rok do roku i z planem.",
    },
    {
      question: "Jakie KPI śledzi marka modowa?",
      answer: "Marka modowa oprócz sprzedaży i marży śledzi przede wszystkim sell-through, udział sprzedaży w pełnej cenie, głębokość obniżek, tygodnie zapasu i GMROI. Wskaźniki te liczy się na poziomie kategorii, modelu i koloru, bo decyzje o dokupieniu lub obniżce zapadają na tym poziomie. Przegląd odbywa się zwykle co tydzień.",
    },
    {
      question: "Jak obliczyć GMROI?",
      answer: "GMROI (zwrot z zapasu w marży brutto) oblicza się, dzieląc marżę brutto z okresu przez średnią wartość zapasu w cenach zakupu. Wynik 1,5 oznacza, że każda złotówka zamrożona w towarze przyniosła 1,50 zł marży. W Excelu wystarczy formuła =marża/średni_zapas, a w Power BI prosta miara DIVIDE.",
    },
  ],
  placeholder: true,
  seo: {
    title: "Wskaźniki sprzedaży i KPI w handlu detalicznym",
    description: "Najważniejsze wskaźniki sprzedaży w sklepie i marce modowej: sell-through, rotacja zapasu, GMROI, tygodnie zapasu i marża, ze wzorami do Excela i Power BI.",
  },
};
