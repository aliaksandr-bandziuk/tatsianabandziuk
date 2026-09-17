import type { Category } from "../../types";
import { categoryPlan } from "../registry";

export const categories: Category[] = [
  {
    ...categoryPlan("power-bi", "pl"),
    label: "Power BI",
    h1: "Power BI w analityce handlu: artykuły i poradniki",
    intro:
      "Artykuły o Power BI dla zespołów w handlu i modzie: miary DAX, raport sprzedaży, sell-through, pokrycie zapasu, RLS dla wielu rynków i przykłady dashboardów, które zespół handlowy naprawdę otwiera.",
    faqTitle: "Power BI w raportowaniu sprzedaży — pytania",
    faq: [
      {
        question: "Czy Power BI jest za darmo?",
        answer:
          "Power BI Desktop, w którym buduje się model danych i raporty, jest bezpłatny. Udostępnianie raportów innym osobom w usłudze Power BI wymaga płatnej licencji Pro dla każdego użytkownika albo pojemności Premium lub Fabric. Dla małego zespołu handlowego zwykle wystarczają licencje Pro.",
      },
      {
        question: "Czy Power BI jest trudny?",
        answer:
          "Podstawy, czyli import danych i proste wykresy, można opanować w kilka dni, zwłaszcza znając Excela. Trudniejsze są model danych i język DAX, bo wymagają myślenia o relacjach między tabelami i kontekście filtrów. W raportowaniu sprzedaży wystarczy na start kilkanaście dobrze zrozumianych miar.",
      },
      {
        question: "Power BI czy Excel w raportowaniu sprzedaży?",
        answer:
          "Excel sprawdza się w planowaniu, scenariuszach i jednorazowych analizach. Power BI jest lepszy do cyklicznego raportu sprzedaży, który odświeża się automatycznie i trafia do wielu osób z różnymi uprawnieniami. W wielu firmach handlowych oba narzędzia działają obok siebie.",
      },
    ],
    seo: {
      title: "Blog Power BI: raporty i miary DAX dla handlu",
      description:
        "Artykuły o Power BI dla handlu: miary DAX, raporty sprzedaży, sell-through, RLS i przykłady dashboardów dla marek modowych.",
    },
  },
  {
    ...categoryPlan("assortment", "pl"),
    label: "Asortyment",
    h1: "Artykuły o planowaniu asortymentu w handlu modowym",
    intro:
      "Praktyczne artykuły o zarządzaniu asortymentem w modzie: struktura asortymentu, analiza ABC i XYZ, category management, krzywe rozmiarów i plan zakupów na przykładach z branży odzieżowej.",
    faqTitle: "Planowanie asortymentu w modzie — pytania",
    faq: [
      {
        question: "Czym różni się planowanie kolekcji od planowania asortymentu?",
        answer:
          "Planowanie kolekcji dotyczy jednego sezonu: ile modeli, kolorów i rozmiarów trafi do sklepów i w jakich terminach. Planowanie asortymentu jest szersze i obejmuje strukturę kategorii, poziomy cen i rolę każdej grupy produktów w dłuższym okresie. Plan kolekcji powinien wynikać z planu asortymentu.",
      },
      {
        question: "Od czego mała marka powinna zacząć planowanie asortymentu?",
        answer:
          "Od rzetelnej historii sprzedaży na poziomie SKU i tygodnia, z informacją o stanach i zwrotach. Na tej podstawie można policzyć sell-through, udział kategorii i podstawowe krzywe rozmiarów. Prosty model w Excelu zwykle wystarcza na pierwsze sezony.",
      },
      {
        question: "Jak często przeglądać plan asortymentu?",
        answer:
          "Plan asortymentu warto aktualizować przed każdym sezonem zakupowym, a w trakcie sezonu co tydzień porównywać sprzedaż z planem. Cotygodniowy przegląd sell-through i pokrycia zapasu pozwala wcześnie zdecydować o dokupieniu lub obniżce.",
      },
    ],
    seo: {
      title: "Asortyment w handlu modowym: artykuły i poradniki",
      description:
        "Artykuły o planowaniu asortymentu w handlu modowym: struktura asortymentu, analiza ABC XYZ, krzywe rozmiarów i plan zakupów.",
    },
  },
  {
    ...categoryPlan("pricing", "pl"),
    label: "Ceny",
    h1: "Artykuły o cenach, marży i obniżkach w handlu",
    intro:
      "Artykuły o polityce cenowej w handlu detalicznym: strategie cenowe, marża a narzut, obniżki cen i architektura cenowa marek modowych, z wzorami i przykładami liczbowymi.",
    faqTitle: "Ceny, marża i obniżki w handlu — pytania",
    faq: [
      {
        question: "Czym różni się marża od narzutu?",
        answer:
          "Marża to zysk liczony jako procent ceny sprzedaży, a narzut to zysk liczony jako procent kosztu zakupu. Produkt kupiony za 20 zł i sprzedany za 50 zł ma narzut 150% i marżę 60%. Pomylenie tych dwóch wskaźników prowadzi do zbyt niskich cen.",
      },
      {
        question: "Kiedy zaczynać obniżki cen?",
        answer:
          "Moment obniżki najlepiej wyznaczać na podstawie tygodniowego sell-through i pokrycia zapasu, a nie samego kalendarza. Jeśli produkt w połowie sezonu sprzedaje się wyraźnie wolniej niż plan, wcześniejsza i płytsza obniżka zwykle kosztuje mniej niż późna i głęboka.",
      },
      {
        question: "Jak zbudować architekturę cenową?",
        answer:
          "Najpierw ustala się dla każdej kategorii progi cenowe: wejście, środek i najwyższą półkę. Potem sprawdza się, jak sprzedaż i marża rozkładają się między progami, i usuwa luki oraz nakładające się ceny. Na końcu te same zasady przenosi się na wszystkie rynki i waluty.",
      },
    ],
    seo: {
      title: "Ceny, marża i obniżki w handlu: artykuły",
      description:
        "Artykuły o cenach w handlu: strategie i polityka cenowa, marża a narzut, obniżki cen i architektura cenowa marek modowych.",
    },
  },
  {
    ...categoryPlan("product-data", "pl"),
    label: "Dane produktowe",
    h1: "Artykuły o danych produktowych, PIM i PLM w modzie",
    intro:
      "Artykuły o danych produktowych w markach modowych: system PIM i PLM, atrybuty produktu, karty produktowe, jakość danych i standardy, których przestrzegają wszystkie rynki.",
    faqTitle: "Dane produktowe, PIM i PLM — pytania",
    faq: [
      {
        question: "Czym różni się system PIM od PLM?",
        answer:
          "System PLM obsługuje produkt od projektu do produkcji: materiały, wymiary, dostawców i sezony. System PIM zbiera gotowe informacje o produkcie i publikuje je w kanałach sprzedaży, na przykład w sklepie internetowym. W marce modowej dane zwykle powstają w PLM i trafiają do PIM.",
      },
      {
        question: "Kto powinien odpowiadać za dane produktowe w marce modowej?",
        answer:
          "Każdy atrybut powinien mieć jednego właściciela: dział produktu, zakupy, e-commerce lub zespół danych produktowych. Wspólny słownik atrybutów i comiesięczny przegląd jakości utrzymuje osoba lub zespół odpowiedzialny za standardy danych.",
      },
      {
        question: "Jak mierzyć jakość danych produktowych?",
        answer:
          "Najprostsze miary to kompletność, czyli udział produktów z wypełnionym atrybutem, oraz zgodność, czyli udział wartości ze słownika. Warto liczyć je dla każdego atrybutu, rynku i sezonu i pokazywać na jednym dashboardzie z właścicielem każdej luki.",
      },
    ],
    seo: {
      title: "Dane produktowe, PIM i PLM: artykuły dla marek modowych",
      description:
        "Artykuły o danych produktowych: system PIM i PLM, atrybuty produktu, jakość danych i standardy dla marek modowych.",
    },
  },
  {
    ...categoryPlan("excel", "pl"),
    label: "Excel",
    h1: "Excel w planowaniu zakupów i sprzedaży: artykuły",
    intro:
      "Artykuły o Excelu w handlu: budżet open-to-buy, rotacja zapasów, prognozowanie sprzedaży, analiza ABC i darmowe szablony do planowania zakupów.",
    faqTitle: "Excel w planowaniu handlu — pytania",
    faq: [
      {
        question: "Jakich umiejętności Excela potrzebuje planista zakupów?",
        answer:
          "Planiście zakupów przydają się tabele strukturalne, funkcje wyszukiwania, takie jak X.WYSZUKAJ, sumy warunkowe, tabele przestawne i Power Query do importu danych. Równie ważna jest umiejętność zbudowania skoroszytu, który zrozumie druga osoba.",
      },
      {
        question: "Czy Excel wystarczy do budżetu open-to-buy?",
        answer:
          "Dla większości małych i średnich marek tak, jeśli model ma jasną strukturę, jedno źródło danych i wbudowane kontrole. System planistyczny staje się potrzebny przy wielu rynkach, kanałach i użytkownikach pracujących jednocześnie.",
      },
      {
        question: "Kiedy przejść z Excela na Power BI?",
        answer:
          "Gdy ten sam raport sprzedaży przygotowuje się ręcznie co tydzień, a odbiorców jest coraz więcej. Power BI odświeża dane automatycznie i pozwala ograniczyć dostęp do rynków. Excel zostaje wtedy narzędziem do planowania i scenariuszy.",
      },
    ],
    seo: {
      title: "Excel w planowaniu handlu: artykuły i szablony",
      description:
        "Artykuły o Excelu w handlu: budżet open-to-buy, prognozowanie sprzedaży, analiza ABC i darmowe szablony do planowania.",
    },
  },
  {
    ...categoryPlan("careers", "pl"),
    label: "Kariera",
    h1: "Kariera w analityce handlu i mody: analityk, merchandiser, kupiec",
    intro:
      "Artykuły o zawodach w analityce handlu i mody: czym zajmują się analityk danych, merchandiser, kupiec i category manager, jakich umiejętności potrzebują i jak zacząć pracę w tej dziedzinie.",
    faqTitle: "Kariera w analityce handlu i mody — pytania",
    faq: [
      {
        question: "Jak zostać analitykiem danych w handlu?",
        answer:
          "Najczęściej zaczyna się od dobrej znajomości Excela, potem dochodzi Power BI lub inne narzędzie BI i podstawy SQL. Równie ważne jest zrozumienie wskaźników handlowych, takich jak sell-through, marża i rotacja zapasów. Wiele osób przechodzi do analityki z działów zakupów, sprzedaży lub logistyki.",
      },
      {
        question: "Kim jest kupiec w handlu?",
        answer:
          "Kupiec, czyli buyer, wybiera produkty do kolekcji, negocjuje z dostawcami ceny i terminy oraz odpowiada za wyniki sprzedaży swojej kategorii. W modzie kupiec współpracuje z merchandiserem, który planuje ilości i budżet, oraz z analitykiem, który dostarcza dane.",
      },
      {
        question: "Czym zajmuje się category manager?",
        answer:
          "Category manager zarządza kategorią produktów jak osobnym biznesem: ustala jej rolę, strukturę asortymentu, ceny i promocje. Rozlicza się z wyników sprzedaży i marży kategorii, a decyzje opiera na danych o sprzedaży i klientach.",
      },
    ],
    seo: {
      title: "Kariera w analityce handlu i mody: role i ścieżki",
      description:
        "Artykuły o karierze w analityce handlu i mody: czym zajmują się analityk, merchandiser i kupiec, jakie mają umiejętności i jak zacząć.",
    },
  },
];
