import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

// Stand-in: real metadata and FAQ, the body is an H2 skeleton until the article is written (task 02).
const WIP = "Ta sekcja jest w przygotowaniu.";
const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: WIP },
];

export const post: Post = {
  ...postPlan("row-level-security", "pl"),
  title: "RLS w Power BI — zabezpieczenia na poziomie wierszy w raportach dla wielu rynków",
  h1: { before: "RLS w Power BI — zabezpieczenia na poziomie wierszy w raportach", accent: "dla wielu rynków" },
  excerpt: "Jak skonfigurować statyczny i dynamiczny RLS w Power BI, aby każdy rynek widział w jednym raporcie tylko swoje dane.",
  lead: "RLS (row-level security) w Power BI to zabezpieczenia na poziomie wierszy: role z filtrami DAX, które ograniczają dane widoczne dla użytkownika. Dzięki nim jeden raport sprzedaży obsługuje wiele rynków, a każdy zespół widzi tylko swoje liczby.",
  date: "2026-06-30",
  readingMinutes: 7,
  body: [
    ...section("do-czego-sluzy-rls", "Do czego służy RLS w Power BI"),
    ...section("statyczny-i-dynamiczny-rls", "Statyczny i dynamiczny RLS dla rynków"),
    ...section("role-rynkow-power-bi", "Role rynków w Power BI krok po kroku"),
    ...section("test-rls-power-bi", "Jak przetestować RLS w Power BI"),
  ],
  faqTitle: "RLS w Power BI — najczęstsze pytania",
  faq: [
    {
      question: "Co to jest RLS w Power BI?",
      answer: "RLS, czyli row-level security, to mechanizm Power BI, który filtruje wiersze danych w zależności od roli użytkownika. Role definiuje się w Power BI Desktop za pomocą wyrażeń DAX, a użytkowników przypisuje do nich w usłudze Power BI. Raport jest jeden, ale każdy odbiorca widzi inny zakres danych.",
    },
    {
      question: "Jak sprawdzić RLS w Power BI?",
      answer: "W Power BI Desktop służy do tego opcja „Wyświetl jako” na karcie Modelowanie, która pokazuje raport oczami wybranej roli. Po publikacji rolę testuje się w ustawieniach zabezpieczeń modelu semantycznego funkcją „Testuj jako rolę”. Trzeba pamiętać, że RLS nie ogranicza osób z rolą administratora, członka ani współautora obszaru roboczego.",
    },
    {
      question: "Kiedy wybrać dynamiczny RLS?",
      answer: "Dynamiczny RLS opłaca się, gdy użytkowników i rynków jest wielu albo często się zmieniają. Zamiast osobnej roli dla każdego rynku tworzy się jedną rolę, która przez funkcję USERPRINCIPALNAME() i tabelę uprawnień dobiera dane do zalogowanej osoby. Statyczne role wystarczą przy kilku stałych rynkach.",
    },
  ],
  placeholder: true,
  seo: {
    title: "RLS w Power BI: zabezpieczenia wierszy w raportach",
    description: "Jak skonfigurować statyczny i dynamiczny RLS w Power BI, aby każdy rynek widział w jednym raporcie tylko swoje dane sprzedażowe.",
  },
};
