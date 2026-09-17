import type { ArticleBlock, Post } from "../../../types";
import { postPlan } from "../../registry";

// Stand-in: real metadata and FAQ, the body is an H2 skeleton until the article is written (task 02).
const WIP = "Ta sekcja jest w przygotowaniu.";
const section = (id: string, text: string): ArticleBlock[] => [
  { type: "h2", id, text },
  { type: "p", text: WIP },
];

export const post: Post = {
  ...postPlan("price-architecture", "pl"),
  title: "Jak zbudować i czytać architekturę cenową przed sezonem",
  h1: { before: "Jak zbudować i czytać", accent: "architekturę cenową przed sezonem" },
  excerpt: "Jak zbudować architekturę cenową w handlu: progi wejścia, środka i najwyższej półki oraz ile kosztuje luka między poziomami cen.",
  lead: "Architektura cenowa to układ progów cenowych w kategorii: od ceny wejścia, przez środek, po najwyższą półkę, wraz z liczbą modeli na każdym progu. Sprawdza się ją przed sezonem, aby klient na każdym poziomie cen miał wybór, a między progami nie było luk, przez które traci się sprzedaż.",
  date: "2026-04-14",
  readingMinutes: 6,
  body: [
    ...section("czym-jest-architektura-cenowa", "Czym jest architektura cenowa w handlu"),
    ...section("progi-cenowe", "Progi cenowe: wejście, środek i najwyższa półka"),
    ...section("luka-w-architekturze-cenowej", "Ile kosztuje luka w architekturze cenowej"),
    ...section("architektura-cenowa-rynki-waluty", "Architektura cenowa na kilku rynkach i w kilku walutach"),
  ],
  faqTitle: "Architektura cenowa — najczęstsze pytania",
  faq: [
    {
      question: "Czym jest architektura cenowa?",
      answer: "Architektura cenowa to struktura cen w kategorii lub całej kolekcji: jakie progi cenowe istnieją, jak duże są odstępy między nimi i ile modeli przypada na każdy próg. Pomaga klientowi zrozumieć różnicę między produktami, a marce pilnować marży. W modzie planuje się ją razem z asortymentem, zanim zapadną decyzje zakupowe.",
    },
    {
      question: "Ile progów cenowych powinna mieć kategoria?",
      answer: "Najczęściej stosuje się trzy progi: wejście, środek i najwyższą półkę, znane też jako model dobry–lepszy–najlepszy. Szerokie kategorie, na przykład kurtki czy sukienki, mogą mieć cztery lub pięć progów. Każdy próg powinien mieć wyraźną różnicę w cenie i w produkcie, inaczej klient nie widzi powodu, by dopłacić.",
    },
    {
      question: "Jakie są rodzaje cen?",
      answer: "W handlu detalicznym rozróżnia się między innymi cenę regularną (pełną), cenę promocyjną, cenę obniżoną w ramach wyprzedaży i cenę sugerowaną przez producenta. Każdą z nich można podać netto lub brutto, a w sklepie dla konsumenta obowiązuje cena brutto. Przy obniżkach w UE trzeba też pokazać najniższą cenę z 30 dni przed obniżką.",
    },
  ],
  placeholder: true,
  seo: {
    title: "Architektura cenowa w handlu: jak czytać progi cenowe",
    description: "Jak zbudować architekturę cenową w handlu: progi wejścia, środka i najwyższej półki oraz ile kosztuje luka między poziomami cen.",
  },
};
