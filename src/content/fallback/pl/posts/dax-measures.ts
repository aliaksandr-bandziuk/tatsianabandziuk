import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

// Stand-in: real metadata and FAQ, the body is an H2 skeleton until the article is written (task 02).
const WIP = "Ta sekcja jest w przygotowaniu.";
const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: WIP },
];

export const post: Post = {
  ...postPlan("dax-measures", "pl"),
  title: "Pięć miar DAX w Power BI, których potrzebuje dashboard KPI w handlu",
  h1: { before: "Pięć miar DAX w Power BI, których potrzebuje", accent: "dashboard KPI w handlu" },
  excerpt: "Co to jest DAX w Power BI i pięć miar do dashboardu KPI w handlu: pokrycie zapasu, sprzedaż w pełnej cenie, zwroty, tygodnie zapasu i marża.",
  lead: "DAX (Data Analysis Expressions) to język formuł Power BI, w którym zapisuje się miary liczone na bieżąco dla każdego filtra raportu. Dashboard KPI w handlu potrzebuje przede wszystkim pięciu miar: pokrycia zapasu, udziału sprzedaży w pełnej cenie, wskaźnika zwrotów, tygodni zapasu i marży.",
  date: "2026-07-21",
  readingMinutes: 9,
  body: [
    ...section("co-to-jest-dax", "Co to jest DAX w Power BI"),
    ...section("miara-a-kolumna-obliczeniowa", "Miara DAX a kolumna obliczeniowa"),
    ...section("miara-pokrycia-zapasu", "Miara DAX pokrycia zapasu"),
    ...section("sprzedaz-w-pelnej-cenie", "Udział sprzedaży w pełnej cenie w DAX"),
    ...section("wskaznik-zwrotow", "Wskaźnik zwrotów w DAX"),
    ...section("tygodnie-zapasu", "Tygodnie zapasu w DAX"),
    ...section("marza-w-dax", "Marża w DAX"),
  ],
  faqTitle: "Miary DAX w Power BI — najczęstsze pytania",
  faq: [
    {
      question: "Co to jest DAX w Power BI?",
      answer: "DAX to język formuł używany w Power BI, Power Pivot w Excelu i Analysis Services. Służy do tworzenia miar, kolumn obliczeniowych i tabel na podstawie modelu danych. Najważniejsze są miary, bo przeliczają się zgodnie z filtrami, które użytkownik wybiera w raporcie.",
    },
    {
      question: "Czy DAX to język programowania?",
      answer: "DAX jest językiem formuł i zapytań, a nie językiem programowania ogólnego przeznaczenia. Bliżej mu do formuł Excela niż do Pythona: nie tworzy się w nim aplikacji, tylko obliczenia na modelu danych. Trudność polega głównie na zrozumieniu kontekstu filtra i funkcji CALCULATE.",
    },
    {
      question: "Czym różni się miara od kolumny obliczeniowej?",
      answer: "Kolumna obliczeniowa liczy wartość raz dla każdego wiersza podczas odświeżania danych i zajmuje miejsce w modelu. Miara liczy wynik w chwili wyświetlenia, dla aktualnych filtrów: rynku, kategorii czy tygodnia. Wskaźniki takie jak marża czy sell-through powinny być miarami, bo procentów nie da się poprawnie sumować.",
    },
    {
      question: "Jak sprawdzić miarę DAX w Excelu?",
      answer: "Najprościej użyć funkcji „Analizuj w programie Excel”, która łączy tabelę przestawną z modelem semantycznym Power BI. W tabeli przestawnej można zestawić miarę z sumami policzonymi ręcznie dla kilku produktów lub tygodni. Jeśli liczby się różnią, zwykle winne są relacje w modelu albo kontekst filtra.",
    },
  ],
  placeholder: true,
  seo: {
    title: "Miary DAX w Power BI dla dashboardu KPI w handlu",
    description: "Co to jest DAX w Power BI i pięć miar dla dashboardu KPI w handlu: pokrycie zapasu, sprzedaż w pełnej cenie, zwroty, tygodnie zapasu i marża.",
  },
};
