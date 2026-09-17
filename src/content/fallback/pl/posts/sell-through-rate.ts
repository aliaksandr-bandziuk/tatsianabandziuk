import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

// Stand-in: real metadata and FAQ, the body is an H2 skeleton until the article is written (task 02).
const WIP = "Ta sekcja jest w przygotowaniu.";
const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: WIP },
];

export const post: Post = {
  ...postPlan("sell-through-rate", "pl"),
  title: "Wskaźnik sell-through: wzór, interpretacja i miary DAX w Power BI",
  h1: { before: "Wskaźnik sell-through: wzór, interpretacja i", accent: "miary DAX w Power BI" },
  excerpt: "Co oznacza sell-through, jak go obliczyć w Excelu i Power BI oraz jaki poziom wskaźnika jest dobry w handlu modowym.",
  lead: "Sell-through to procent dostępnego towaru, który sprzedał się w danym okresie: sprzedaż netto w sztukach dzielona przez zapas początkowy plus dostawy. Wskaźnik pokazuje, czy zakup był trafiony i kiedy reagować obniżką albo dokupieniem towaru.",
  date: "2026-07-28",
  readingMinutes: 9,
  body: [
    ...section("co-oznacza-sell-through", "Co oznacza sell-through w handlu"),
    ...section("wzor-na-sell-through", "Wzór na sell-through i dwa sposoby liczenia"),
    {
      type: "calculator",
      kind: "sellThrough",
      title: "Kalkulator sell-through",
      labels: {
        opening: "Zapas początkowy (szt.)",
        received: "Dostawy (szt.)",
        sold: "Sprzedaż w sztukach",
        returned: "Zwroty (szt.)",
        rate: "Sell-through od całej dostępności",
        rateReceived: "Sell-through od dostaw",
      },
      note: "Sell-through = (sprzedaż − zwroty) ÷ (zapas początkowy + dostawy). Wariant od dostaw dzieli sprzedaż netto tylko przez dostawy z okresu. Dane nie są nigdzie wysyłane.",
    },
    ...section("dobry-sell-through-w-modzie", "Jaki sell-through jest dobry w handlu modowym"),
    ...section("sell-through-w-excelu", "Jak obliczyć sell-through w Excelu"),
    ...section("miary-dax-sell-through", "Miary DAX dla sell-through w Power BI"),
    ...section("tygodniowa-krzywa-sell-through", "Tygodniowa krzywa sell-through w raporcie"),
    ...section("bledy-sell-through", "Najczęstsze błędy w liczeniu sell-through"),
  ],
  faqTitle: "Sell-through — najczęstsze pytania",
  faq: [
    {
      question: "Co to jest sell-through?",
      answer: "Sell-through to wskaźnik, który pokazuje, jaka część dostępnego towaru została sprzedana w danym okresie. Wyraża się go w procentach i liczy zwykle w sztukach, na poziomie modelu, koloru lub kategorii. W modzie to podstawowa miara trafności zakupu sezonowego.",
    },
    {
      question: "Jak obliczyć sell-through?",
      answer: "Sprzedaż netto w sztukach (sprzedaż minus zwroty) dzieli się przez zapas początkowy powiększony o dostawy z okresu i mnoży przez 100. Na przykład 600 sprzedanych sztuk przy 200 sztukach zapasu i 800 sztukach dostaw daje 60%. Część firm dzieli tylko przez dostawy, dlatego definicję trzeba zapisać i stosować konsekwentnie.",
    },
    {
      question: "Czym różni się sell-in od sell-through?",
      answer: "Sell-in to sprzedaż marki do partnera handlowego, czyli to, co trafiło na półki sklepu lub do magazynu dystrybutora. Sell-through mówi, jaka część tego towaru została sprzedana klientom końcowym. Wysoki sell-in przy niskim sell-through oznacza, że zapas utknął u partnera.",
    },
    {
      question: "Jak policzyć sell-through w Excelu?",
      answer: "Wystarczą cztery kolumny: zapas początkowy, dostawy, sprzedaż i zwroty. Formuła w wierszu ma postać =(C2-D2)/(A2+B2), a komórkę formatuje się jako procent. Przy danych z wielu tygodni lepiej sumować sztuki w tabeli przestawnej i dopiero potem dzielić, zamiast uśredniać procenty.",
    },
  ],
  placeholder: true,
  seo: {
    title: "Sell-through: jak obliczyć wskaźnik w Excelu i Power BI",
    description: "Co oznacza sell-through, jak go obliczyć w Excelu i Power BI, jaki poziom jest dobry w modzie i jakie błędy zniekształcają wskaźnik.",
  },
};
