import type { SiteContent } from "../../types";
import { formats, recommendations, services, tools } from "./services";
import { caseStudies } from "./caseStudies";
import { categories } from "./categories";
import { posts } from "./posts";
import { calculators, calculatorsPage } from "./calculators";

const placeholderRec = (topic: string) => ({
  quote: `„Tekst zastępczy rekomendacji. Dwa lub trzy zdania od współpracownika o ${topic}, cytowane za zgodą, gdy pojawi się prawdziwa rekomendacja.”`,
  name: "Imię Nazwisko",
  role: `Stanowisko · ${topic}`,
  placeholder: true,
});

const timeline = [
  {
    period: "2014 — 2017",
    company: "OMA",
    role: "Analityczka handlowa",
    text: "Raportowanie sprzedaży i wsparcie planowania w sieci sklepów z materiałami budowlanymi.",
  },
  {
    period: "2017 — 2018",
    company: "Fashion House",
    role: "Analityczka retail",
    text: "Raporty dla wielu marek, sell-through i analiza wyników najemców.",
  },
  {
    period: "2018 — 2022",
    company: "Luxvisage",
    role: "Analityczka kategorii i cen",
    text: "Struktura asortymentu i cen dla dystrybuowanych marek.",
  },
  {
    period: "2022 — obecnie",
    company: "Międzynarodowa marka modowa",
    role: "Global Brand Analyst & Product Data Lead",
    text: "Asortyment, ceny i dane produktowe na rynkach Europy i Azji.",
    current: true,
  },
];

const EMAIL = "business@tatsianabandziuk.com";

export const pl: SiteContent = {
  locale: "pl",
  ui: {
    nav: [
      { label: "Usługi", href: "/services" },
      { label: "Case study", href: "/case-studies" },
      { label: "O mnie", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Kalkulatory", href: "/tools" },
      { label: "Kontakt", href: "/contact" },
    ],
    tagline: "Analityka w handlu i modzie",
    bookConsultation: "Umów konsultację",
    bookConsultationShort: "Umów konsultację",
    menu: "Menu",
    close: "Zamknij",
    switchLanguage: "Język",
    breadcrumbHome: "Strona główna",
    footerText:
      "Planowanie asortymentu, analiza cen i raportowanie sprzedaży w Power BI dla marek modowych i firm handlowych. Warszawa, praca po polsku, angielsku i rosyjsku.",
    footerServices: "Usługi",
    footerSite: "Strona",
    footerContact: "Kontakt",
    footerSiteLinks: [
      { label: "Case study", href: "/case-studies" },
      { label: "O mnie", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Darmowe szablony", href: "/free-templates" },
      { label: "Kalkulatory", href: "/tools" },
      { label: "Kursy", href: "/courses" },
      { label: "Kontakt", href: "/contact" },
    ],
    privacy: "Polityka prywatności",
    allCaseStudies: "Wszystkie case study",
    allArticles: "Wszystkie artykuły",
    readArticle: "Przeczytaj artykuł",
    featured: "Polecany",
    minRead: "min czytania",
    seeCaseStudy: "Zobacz powiązane case study",
    relatedCaseStudy: "Powiązane case study",
    relatedService: "Powiązana usługa",
    relatedArticles: "Powiązane artykuły o analityce w handlu",
    toc: "Spis treści",
    aboutLink: "Więcej o Tatsianie Bandziuk",
    replyNote: "Odpowiedź w ciągu jednego dnia roboczego · PL / EN / RU",
    schematicCaption: "schemat dashboardu · dane poglądowe",
    dashboardCaption: "zanonimizowana ilustracja dashboardu · schemat, dane poglądowe",
    portraitPlaceholder: "Portret — do podmiany",
    recommendationPlaceholder:
      "Miejsce na rekomendacje — prawdziwe rekomendacje z LinkedIn pojawią się za zgodą autorów",
    allFilter: "Wszystkie",
    topics: {
      assortment: "Asortyment",
      pricing: "Ceny",
      "product-data": "Dane produktowe",
      reporting: "Raportowanie",
    },
    slicer: {
      slicer: "Temat",
      clear: "Wyczyść",
      chart: "Case study według tematu",
    },
    statusBar: {
      ready: "Gotowy",
      average: "Średnia",
      count: "Licznik",
      sum: "Suma",
      words: "Słowa",
      characters: "Znaki",
      value: "Wartość",
    },
    pagination: { prev: "← Poprzednia", next: "Następna →", page: "Strona" },
    video: { play: "Odtwórz wideo", transcript: "Streszczenie wideo" },
    calculatorHint: "Liczby zostają w Twojej przeglądarce i nie są nigdzie wysyłane.",
    calculatorMore: "Otwórz pełny kalkulator",
    form: {
      name: "Imię i nazwisko",
      company: "Firma",
      email: "E-mail",
      task: "Zadanie lub pytanie",
      taskPlaceholder: "np. plan asortymentu na wiosnę–lato 2027 i poziom obniżek",
      timeline: "Termin / budżet · opcjonalnie",
      language: "Język rozmowy",
      submit: "Umów konsultację",
      sending: "Wysyłanie…",
      privacyNote: "Dane wykorzystam wyłącznie do odpowiedzi na zapytanie. Szczegóły w polityce prywatności.",
      required: "Uzupełnij to pole.",
      invalidEmail: "Podaj poprawny adres e-mail.",
      error: `Nie udało się wysłać wiadomości. Napisz bezpośrednio na ${EMAIL}.`,
      workEmail: "Służbowy e-mail",
      emailPlaceholder: "imie@firma.pl",
      phoneRequired: "Numer telefonu",
      phoneOptional: "Telefon · opcjonalnie",
      invalidPhone: "Podaj numer telefonu z kodem kraju, np. +48 600 000 000.",
      channelLegend: "Jaka forma kontaktu jest dla Ciebie wygodna?",
      channelShort: "Preferowany kontakt",
      channels: { email: "E-mail", whatsapp: "WhatsApp", phone: "Telefon" },
    },
    languages: { en: "English", pl: "Polski", ru: "Русский" },
    cookie: {
      title: "Pliki cookie na tej stronie",
      text: "Niezbędne pliki cookie zapewniają działanie strony. Analityczne pliki cookie (Google Analytics, Microsoft Clarity) pokazują, jak odwiedzający korzystają ze strony, i są ustawiane tylko za Twoją zgodą.",
      accept: "Akceptuj wszystkie",
      reject: "Tylko niezbędne",
      policy: "Polityka prywatności",
    },
  },
  person: {
    name: "Tatsiana Bandziuk",
    jobTitle: "Konsultantka ds. analityki w handlu i modzie",
    shortBio:
      "Około dziesięciu lat w międzynarodowym handlu modowym: asortyment, ceny, dane produktowe i raporty Power BI. Warszawa.",
    signature: "Tatsiana",
    email: EMAIL,
    location: "Warszawa",
    timezone: "CET",
    linkedin: "https://www.linkedin.com/in/tatsiana-bandziuk-a96b81165/",
    languages: [
      { label: "English", value: "biegły" },
      { label: "Polski", value: "biegły" },
      { label: "Русский", value: "ojczysty" },
    ],
    educationChip: "Magister ekonomii i zarządzania, BGEU",
    photoPrimary: { src: "/images/portrait/tatsiana-main.webp", alt: "Tatsiana Bandziuk, konsultantka analityki retail i fashion", focus: "center 12%" },
    photoSecondary: { src: "/images/portrait/tatsiana-second.webp", alt: "Tatsiana Bandziuk przy biurku z otwartym raportem Power BI" },
    photoWorkspace: { src: "/images/portrait/tatsiana-workspace.webp", alt: "Laptop, notes i długopis na biurku Tatsiany Bandziuk" },
  },
  home: {
    seo: {
      title: "Tatsiana Bandziuk — analityka sprzedaży w handlu i modzie",
      description:
        "Konsultantka ds. analityki w handlu i modzie z Warszawy: planowanie asortymentu, analiza cen, raportowanie sprzedaży w Power BI i dane produktowe.",
    },
    eyebrow: "Warszawa · PL / EN / RU",
    h1: {
      before: "Tatsiana Bandziuk —",
      accent: "konsultantka ds. analityki sprzedaży",
      after: "w handlu i modzie",
    },
    subtitle:
      "Planowanie asortymentu, analiza cen, raportowanie sprzedaży w Power BI i jakość danych produktowych dla marek modowych i firm handlowych.",
    primaryCta: "Umów konsultację",
    secondaryCta: "Zobacz case study",
    stats: [
      { value: "10+", label: "lat doświadczenia w analityce handlu" },
      { value: "30+", label: "dashboardów i modeli planistycznych" },
      { value: "3", label: "języki pracy: PL / EN / RU" },
    ],
    chartLabel: "Sell-through tydzień po tygodniu",
    chartDelta: "+18 p.p.",
    chartNote: "tydzień po przeliczeniu krzywej rozmiarów",
    experienceTitle:
      "Doświadczenie w analityce handlu: Luxvisage, Fashion House, OMA i międzynarodowa marka modowa",
    experienceNames: ["Luxvisage", "Fashion House", "OMA", "Międzynarodowa marka modowa"],
    servicesTitle: "Usługi analityki sprzedaży dla marek modowych i handlowych",
    aboutTitle: "O mnie: Tatsiana Bandziuk i analityka w handlu modowym",
    aboutText: [
      "Od około dziesięciu lat pracuję w międzynarodowym handlu modowym, na styku zespołów handlowych i systemów, z których korzystają: asortymentu, cen, danych produktowych i raportów, które muszą się ze sobą zgadzać.",
      "Obecnie jestem Global Brand Analyst & Product Data Lead w międzynarodowej marce modowej i kieruję zespołem specjalistów ds. danych produktowych. Jako konsultantka pracuję z Warszawy po polsku, angielsku i rosyjsku.",
    ],
    timelineLabel: "Przebieg kariery",
    timeline,
    aboutLink: "Więcej o Tatsianie Bandziuk",
    resultsTitle: "Wyniki projektów analityki sprzedaży w liczbach",
    results: [
      { value: "+18", unit: "p.p.", label: "sell-through w kluczowych kategoriach po przebudowie planu asortymentu" },
      { value: "−31", unit: "%", label: "kosztów obniżek w dwóch sezonach" },
      { value: "40", unit: "h", label: "miesięcznie mniej pracy nad raportami dzięki jednemu modelowi Power BI" },
      { value: "98", unit: "%", label: "kompletności atrybutów produktów w PLM po standaryzacji" },
    ],
    formatsTitle: "Formy współpracy: diagnoza danych, projekt, stałe wsparcie analityczne",
    clientTypesLabel: "Dla kogo",
    clientTypes: [
      "Marki modowe",
      "Dystrybutorzy",
      "Sklepy internetowe",
      "Rosnące firmy bez własnego analityka",
    ],
    processTitle: "Jak przebiega projekt analityki sprzedaży",
    process: [
      {
        label: "KROK 01",
        title: "Diagnoza danych sprzedażowych i asortymentu",
        text: "Przez dwa tygodnie analizuję sprzedaż, zapasy i dane produktowe i wskazuję, gdzie firma traci pieniądze.",
      },
      {
        label: "KROK 02",
        title: "Plan priorytetów analitycznych",
        text: "Pisemny plan: co zmienić w asortymencie, cenach, danych i raportach, w jakiej kolejności i kto za to odpowiada.",
      },
      {
        label: "KROK 03",
        title: "Wdrożenie modeli Excel i raportów Power BI",
        text: "Modele w Excelu, reguły atrybutów w PLM i raporty Power BI zbudowane na aktualnych danych firmy.",
      },
      {
        label: "KROK 04",
        title: "Przekazanie narzędzi i procesu zespołowi",
        text: "Dokumentacja, definicje i szkolenia, dzięki którym proces działa bez konsultantki.",
      },
    ],
    processPhotoLabel: "Zdjęcie przy pracy — do podmiany",
    processNote: "Większość projektów zaczyna się od jednego uczciwego spojrzenia na dane.",
    toolsTitle: "Narzędzia analityki sprzedaży: Power BI, Excel i systemy PLM",
    educationTitle: "Wykształcenie w logistyce, ekonomii i zarządzaniu",
    educationChips: [
      "Logistyka, magister ekonomii i zarządzania — Białoruski Państwowy Uniwersytet Ekonomiczny (BGEU)",
      "Certyfikat UE Tempus Be-Safe — Uniwersytet Sapienza w Rzymie",
      "Knowledge Transfer — Loughborough University",
      "Seminarium Młodych Badaczy BNTU 2016 — 2. miejsce",
    ],
    caseStudiesTitle: "Case study z analityki w handlu i modzie",
    recommendationsTitle: "Rekomendacje współpracowników z branży mody",
    recommendationsNote:
      "Miejsce na rekomendacje — prawdziwe rekomendacje z LinkedIn pojawią się za zgodą autorów",
    faqTitle: "Analityka sprzedaży w handlu — najczęstsze pytania",
    faqLead: "Sześć pytań, które firmy zadają przed pierwszą rozmową.",
    faq: [
      {
        question: "Czym zajmuje się konsultantka ds. analityki sprzedaży?",
        answer:
          "Konsultantka ds. analityki sprzedaży pomaga firmie handlowej zamienić dane o sprzedaży, zapasach i produktach w decyzje: co kupić, po jakiej cenie i kiedy obniżyć cenę. W praktyce porządkuję definicje wskaźników, buduję modele w Excelu i raporty w Power BI oraz uczę zespół z nich korzystać. Po projekcie firma pracuje na tych narzędziach samodzielnie.",
      },
      {
        question: "Na czym polega analiza sprzedaży w handlu?",
        answer:
          "Analiza sprzedaży w handlu polega na regularnym sprawdzaniu, co, gdzie i po jakiej cenie się sprzedaje, na tle planu, zapasu i poprzedniego roku. W handlu modowym obejmuje między innymi sell-through, udział sprzedaży w pełnej cenie, krzywe rozmiarów i zwroty. Jej celem są konkretne decyzje o dokupieniu, przesunięciu towaru lub obniżce.",
      },
      {
        question: "Jakie są najważniejsze wskaźniki sprzedaży?",
        answer:
          "W handlu detalicznym najczęściej śledzi się wartość sprzedaży na tle planu i poprzedniego roku, marżę brutto, sell-through, rotację zapasów i średnią wartość paragonu. W modzie dochodzą udział sprzedaży w pełnej cenie, wskaźnik zwrotów i pokrycie zapasu w tygodniach. Każdy z tych wskaźników powinien mieć jedną, spisaną definicję.",
      },
      {
        question: "Ile trwa projekt analityki sprzedaży?",
        answer:
          "Diagnoza danych trwa dwa tygodnie. Projekt dotyczący asortymentu, cen, raportu w Power BI lub danych produktowych zajmuje zwykle od trzech do dwunastu tygodni, zależnie od liczby kategorii, rynków i źródeł danych. Dokładny harmonogram ustalamy po pierwszej rozmowie.",
      },
      {
        question: "Jakie dane są potrzebne na start?",
        answer:
          "Najczęściej wystarczą eksporty z systemu ERP lub sprzedażowego: sprzedaż, zapasy, dostawy i zwroty na poziomie SKU i tygodnia, a do tego atrybuty produktów z PLM lub PIM. Nie trzeba mieć hurtowni danych ani Power BI. Na początku sprawdzam, czy dane wystarczą, by odpowiedzieć na postawione pytanie.",
      },
      {
        question: "Czy konsultacja może odbyć się po polsku?",
        answer:
          "Tak. Konsultacje, warsztaty, dokumentację i raporty prowadzę po polsku, angielsku lub rosyjsku. Pracuję z Warszawy, na miejscu u klienta lub online.",
      },
    ],
    blogTitle: "Artykuły o analityce sprzedaży, cenach i asortymencie",
    contactTitle: "Kontakt w sprawie projektu analityki sprzedaży",
    contactNote:
      "Każde zapytanie czytam osobiście. Napisz, co nie działa — asortyment, ceny, dane produktowe czy raporty — a odpowiem pytaniami, od których zaczęłabym pracę. Jeśli projekt nie jest w moim zakresie, powiem to wprost.",
  },
  about: {
    seo: {
      title: "O mnie — Tatsiana Bandziuk, analityka w handlu i modzie",
      description:
        "Tatsiana Bandziuk: około 10 lat w międzynarodowym handlu modowym jako brand analyst i product data lead. Asortyment, ceny, PLM. Warszawa.",
    },
    h1: {
      before: "O mnie: Tatsiana Bandziuk,",
      accent: "konsultantka ds. analityki w handlu i modzie",
    },
    intro:
      "Od około dziesięciu lat zajmuję się analityką w międzynarodowym handlu modowym: asortymentem, cenami, danymi produktowymi i raportami, które je łączą. Z Warszawy doradzam markom modowym, dystrybutorom i sklepom internetowym.",
    chips: [
      "Planowanie asortymentu",
      "Analiza cen",
      "Power BI",
      "Dane produktowe w PLM",
      "Kierowanie zespołem",
    ],
    experienceTitle:
      "Doświadczenie Global Brand Analyst i Product Data Lead w międzynarodowej marce modowej",
    experienceText: [
      "Obecnie pracuję jako Global Brand Analyst & Product Data Lead w międzynarodowej marce modowej. Zajmuję się wynikami asortymentu, strukturą cen i danymi produktowymi, na których opierają się obie te dziedziny, na rynkach Europy i Azji.",
      "Moja praca łączy dział handlowy z systemami: trzeba uzgodnić, co oznacza dana liczba, sprawić, by dane liczyły ją rzetelnie, i przekonać zakupy, planowanie oraz finanse do korzystania z jednej wersji.",
    ],
    projectsTitle: "Projekty asortymentowe, cenowe i produktowe",
    projects: [
      {
        title: "Analiza wyników asortymentu i kolekcji",
        text: "Liczba modeli, krzywe rozmiarów i kolorów, głębokość kategorii i rozłożenie dostaw na rynkach.",
      },
      {
        title: "Analiza architektury cenowej i obniżek",
        text: "Progi cenowe w kategoriach, ceny wejścia i wyjścia, scenariusze marży i obniżek.",
      },
      {
        title: "Standaryzacja danych produktowych w systemach PLM",
        text: "Słowniki atrybutów, struktury sezonów i kolorów oraz reguły jakości działające już przy wprowadzaniu danych.",
      },
      {
        title: "Raportowanie KPI sprzedaży w Power BI",
        text: "Jeden model danych dla sell-through, pokrycia zapasu, udziału sprzedaży w pełnej cenie i zwrotów.",
      },
    ],
    leadershipTitle: "Kierowanie zespołem danych produktowych i analityki",
    leadershipText: [
      "Kieruję zespołem specjalistów ds. danych produktowych: ustalamy standardy danych, sprawdzamy ich jakość i pilnujemy, by każda liczba została zweryfikowana, zanim trafi do decyzji.",
      "W projektach doradczych przekłada się to na przekazanie, które działa: spisane definicje, wskazanych właścicieli i szkolenia dla osób, które poprowadzą raporty w kolejnym sezonie.",
    ],
    leadershipNote: "Raport bez właściciela po miesiącu przestaje być prawdziwy.",
    timelineTitle: "Przebieg kariery w analityce handlu modowego",
    timelineNote: "Stanowiska i lata, od najnowszych",
    timeline: [...timeline].reverse(),
    educationTitle: "Wykształcenie: logistyka, ekonomia i zarządzanie na BGEU",
    educationText:
      "Mam dwa dyplomy z logistyki Białoruskiego Państwowego Uniwersytetu Ekonomicznego (BGEU) w Mińsku: logistyka-ekonomisty (2014) i magistra ekonomii i zarządzania (2015). W latach 2014–2015 uczestniczyłam w unijnym programie Tempus Be-Safe prowadzonym z Uniwersytetem Sapienza w Rzymie. W 2016 roku ukończyłam sesje Knowledge Transfer na Loughborough University, a mój referat zajął 2. miejsce na Seminarium Młodych Badaczy BNTU. Z tamtych lat został mi nawyk: najpierw pytanie, potem miara.",
    educationChips: ["Logistyka", "Magister ekonomii i zarządzania", "UE Tempus Be-Safe"],
    credentials: {
      title: "Dyplomy i certyfikaty z logistyki, ekonomii i zarządzania",
      intro:
        "Oryginalne dokumenty: dwa dyplomy Białoruskiego Państwowego Uniwersytetu Ekonomicznego i certyfikaty z międzynarodowego programu UE Tempus. Kliknij dokument, aby go otworzyć i powiększyć.",
      items: [
        {
          id: "bseu-2014",
          year: "2014",
          institution: "Białoruski Państwowy Uniwersytet Ekonomiczny",
          title: "Dyplom ukończenia studiów wyższych, kierunek logistyka · logistyk-ekonomista",
          thumb: "/images/credentials/bachelor-cover-thumb.webp",
          image: "/images/credentials/bachelor-inside.webp",
          width: 2000,
          height: 1346,
          redacted: true,
        },
        {
          id: "tempus-2015",
          year: "2014–2015",
          institution: "Uniwersytet Sapienza w Rzymie (CTL) i BGEU · program UE Tempus Be-Safe",
          title: "Certyfikat: bezpieczeństwo ruchu drogowego w logistyce, program magisterski",
          thumb: "/images/credentials/tempus-cert-thumb.webp",
          image: "/images/credentials/tempus-cert.webp",
          width: 2000,
          height: 1410,
        },
        {
          id: "bseu-2015",
          year: "2015",
          institution: "Białoruski Państwowy Uniwersytet Ekonomiczny",
          title: "Dyplom ukończenia studiów magisterskich, kierunek logistyka · magister ekonomii i zarządzania",
          thumb: "/images/credentials/master-cover-thumb.webp",
          image: "/images/credentials/master-inside.webp",
          width: 2000,
          height: 1355,
          redacted: true,
        },
        {
          id: "loughborough",
          year: "2016",
          institution: "Loughborough University, Design School",
          title: "Certyfikat udziału: sesje Knowledge Transfer w projekcie Tempus o bezpieczeństwie drogowym",
          thumb: "/images/credentials/lboro-thumb.webp",
          image: "/images/credentials/lboro.webp",
          width: 2000,
          height: 1431,
        },
        {
          id: "bntu-2016",
          year: "2016",
          institution: "Białoruski Narodowy Uniwersytet Techniczny",
          title: "Seminarium Młodych Badaczy 2016: najlepszy referat i prezentacja, 2. miejsce",
          thumb: "/images/credentials/yrs-award-thumb.webp",
          image: "/images/credentials/yrs-award.webp",
          width: 2000,
          height: 1428,
        },
      ],
      labels: {
        open: "Zobacz dokument",
        close: "Zamknij",
        prev: "Poprzedni dokument",
        next: "Następny dokument",
        zoomIn: "Powiększ",
        zoomOut: "Pomniejsz",
        track: "Dyplomy i certyfikaty",
        redactionNote: "Numery blankietów dyplomów zostały ukryte.",
        zoomHint: "Przewiń lub kliknij dwukrotnie, aby powiększyć; przeciągnij, aby przesunąć",
      },
    },
    languagesTitle: "Języki pracy i lokalizacja: angielski, polski, rosyjski, Warszawa",
    languagesText:
      "Mieszkam w Warszawie i pracuję na miejscu lub online w całej Europie i poza nią, w strefie czasowej CET. Warsztaty, dokumentację i raporty przygotowuję po polsku, angielsku lub rosyjsku.",
    recommendationTitle: "Rekomendacja współpracownika z branży mody o kierowaniu zespołem danych",
    recommendation: placeholderRec("kierowaniu pracą z danymi produktowymi"),
    ctaTitle: "Porozmawiaj z Tatsianą Bandziuk o projekcie analitycznym",
    ctaText:
      "Opisz zadanie w kilku zdaniach — asortyment, ceny, dane produktowe lub raporty — a odpowiem pytaniami, od których zaczęłabym pracę.",
    ctaNote: "Przejście do formularza kontaktowego · PL / EN / RU",
    faqTitle: "Tatsiana Bandziuk — pytania o doświadczenie i współpracę",
    faq: [
      {
        question: "Gdzie pracuje Tatsiana Bandziuk?",
        answer:
          "Tatsiana Bandziuk pracuje jako Global Brand Analyst & Product Data Lead w międzynarodowej marce modowej, na rynkach Europy i Azji. Wcześniej zajmowała się analityką w firmach Luxvisage, Fashion House i OMA. Mieszka i pracuje w Warszawie.",
      },
      {
        question: "W jakich językach prowadzi projekty?",
        answer:
          "Projekty, warsztaty, dokumentację i raporty prowadzi po polsku, angielsku i rosyjsku. W projektach międzynarodowych języki można łączyć, np. dokumentację po angielsku i szkolenia po polsku.",
      },
      {
        question: "Jakie ma wykształcenie?",
        answer:
          "Ukończyła logistykę na Białoruskim Państwowym Uniwersytecie Ekonomicznym (BGEU): tytuł logistyka-ekonomisty w 2014 roku i magistra ekonomii i zarządzania w 2015 roku. Uczestniczyła w unijnym programie Tempus Be-Safe z Uniwersytetem Sapienza w Rzymie. W 2016 roku ukończyła sesje Knowledge Transfer na Loughborough University, a jej referat zajął 2. miejsce na Seminarium Młodych Badaczy BNTU.",
      },
      {
        question: "Czy przyjmuje projekty konsultingowe?",
        answer:
          "Tak. Konsultacje dotyczą planowania asortymentu, analizy cen, raportowania sprzedaży w Power BI, modeli Excel i danych produktowych. Współpraca może mieć formę diagnozy danych, projektu lub stałego wsparcia, na miejscu w Warszawie albo online.",
      },
    ],
  },
  servicesPage: {
    seo: {
      title: "Usługi analityczne dla handlu i marek modowych",
      description:
        "Planowanie asortymentu, analiza cen, raporty Power BI, modele Excel i jakość danych produktowych. Analityka dla marek modowych, także na zlecenie.",
    },
    eyebrow: "Usługi",
    h1: "Usługi analityki w handlu i modzie",
    intro:
      "Sześć usług analitycznych dla marek modowych, dystrybutorów i sklepów internetowych: planowanie asortymentu, analiza cen, raportowanie sprzedaży w Power BI, planowanie zakupów w Excelu, jakość danych produktowych i procesy raportowania. Analitykę można zlecić projektowo lub w stałej współpracy, bez zatrudniania analityka na etat.",
    ctaTitle: "Porozmawiaj o tym, która usługa analityczna pasuje do Twojej firmy",
    ctaText:
      "Napisz, gdzie raportowanie lub planowanie sprawia dziś najwięcej kłopotu. Wskażę właściwy punkt startu albo powiem wprost, że żadna z sześciu usług nie jest potrzebna.",
    recommendationTitle: "Rekomendacja współpracownika z branży mody o usługach analitycznych",
    recommendation: placeholderRec("projekcie doradczym"),
    faqTitle: "Usługi analityczne dla handlu — pytania",
    faq: [
      {
        question: "Czy analitykę można zlecić bez zatrudniania analityka na etat?",
        answer:
          "Tak. Analitykę sprzedaży, asortymentu i cen można zlecić jako jednorazowy projekt albo stałe wsparcie w wybranej liczbie dni w miesiącu. To rozwiązanie dla firm, które nie potrzebują analityka na pełny etat lub dopiero budują własny zespół. Po projekcie narzędzia i dokumentacja zostają w firmie.",
      },
      {
        question: "Co obejmuje dwutygodniowa diagnoza danych sprzedażowych?",
        answer:
          "Diagnoza obejmuje przegląd danych o sprzedaży, zapasach, cenach i produktach oraz obecnych raportów. Jej wynikiem jest pisemna lista problemów i priorytetów: co zmienić w asortymencie, cenach, danych i raportowaniu oraz w jakiej kolejności. Diagnoza trwa dwa tygodnie i może być samodzielną usługą.",
      },
      {
        question: "Czy pracujesz na naszych systemach ERP, PLM i Power BI?",
        answer:
          "Tak. Praca odbywa się na systemach, które firma już ma: eksportach z ERP, danych z PLM lub PIM, Excelu i Power BI. Nowe narzędzia proponuję tylko wtedy, gdy obecne naprawdę nie wystarczają do rozwiązania problemu.",
      },
      {
        question: "Czy współpraca może być w pełni online?",
        answer:
          "Tak. Rozmowy, warsztaty i przekazanie narzędzi mogą odbywać się online, a dane są wymieniane przez bezpieczne kanały wskazane przez firmę. W Warszawie możliwe są też spotkania na miejscu.",
      },
    ],
  },
  services,
  formats,
  tools,
  recommendations,
  caseStudiesPage: {
    seo: {
      title: "Case study: analityka w handlu i modzie",
      description:
        "Anonimowe case study z analityki w handlu i modzie: planowanie asortymentu, analiza cen, raporty Power BI i dane produktowe w PLM.",
    },
    eyebrow: "Case study",
    h1: "Case study z analityki w handlu i modzie",
    intro:
      "Zanonimizowane case study z planowania asortymentu, analizy cen, raportowania sprzedaży w Power BI i danych produktowych w PLM. Każde studium przypadku opisuje wyzwanie, wykonane prace, narzędzia i wyniki; klienci nie są wymienieni z nazwy.",
    ctaTitle: "Porozmawiajmy o podobnym projekcie analitycznym",
    ctaText:
      "Jeśli któryś przypadek przypomina sytuację w Twojej firmie, opisz ją w dwóch–trzech zdaniach. Odpowiem, od czego zaczęłabym podobny projekt.",
    faqTitle: "Case study z analityki w handlu — pytania",
    faq: [
      {
        question: "Czy klienci z case study są wymienieni z nazwy?",
        answer:
          "Nie. Wszystkie case study są zanonimizowane: zamiast nazwy firmy podany jest jej typ, np. marka modowa lub sklep internetowy. Pomijane są też szczegóły, które pozwoliłyby rozpoznać klienta, takie jak nazwy wewnętrznych projektów.",
      },
      {
        question: "Jak anonimizowane są liczby w case study?",
        answer:
          "Wyniki pochodzą z prawdziwych projektów i są podane jako procenty, punkty procentowe lub zaoszczędzony czas, a nie wartości sprzedaży. Nie publikuje się nazw klientów, liczby rynków, produktów ani innych danych, które pozwoliłyby zidentyfikować firmę.",
      },
      {
        question: "Czy podobny projekt można zrealizować dla naszej marki?",
        answer:
          "Tak. Każdy opisany projekt opiera się na metodzie, którą dopasowuje się do kategorii, rynków i systemów innej firmy. Pierwszym krokiem jest krótka rozmowa i przegląd dostępnych danych, po którym powstaje pisemny zakres prac.",
      },
    ],
  },
  caseStudies,
  blogPage: {
    seo: {
      title: "Blog o analityce w handlu: Power BI, Excel, asortyment",
      description:
        "Praktyczne artykuły o KPI w handlu, rotacji zapasów, marży, cenach, danych produktowych i Power BI dla zespołów w handlu i modzie.",
    },
    eyebrow: "Blog",
    h1: "Blog o analityce w handlu: Power BI, Excel i planowanie asortymentu",
    intro:
      "Praktyczne artykuły o analityce w handlu i modzie: KPI sprzedaży, rotacja zapasów, marża i narzut, ceny, dane produktowe i Power BI — z wzorami, przykładami w Excelu i miarami DAX.",
    faqTitle: "Blog o analityce w handlu — pytania",
    faq: [
      {
        question: "Kto pisze artykuły na blogu?",
        answer:
          "Artykuły pisze Tatsiana Bandziuk, konsultantka ds. analityki w handlu i modzie z około dziesięcioletnim doświadczeniem w międzynarodowym handlu modowym. Teksty opierają się na praktyce pracy z asortymentem, cenami, danymi produktowymi i raportami Power BI.",
      },
      {
        question: "Jak często pojawiają się nowe artykuły?",
        answer:
          "Nowe artykuły pojawiają się regularnie, a istniejące teksty są aktualizowane, gdy zmienia się metoda lub narzędzie. Każdy artykuł ma datę publikacji, więc łatwo sprawdzić, jak jest aktualny.",
      },
      {
        question: "Czy mogę zaproponować temat?",
        answer:
          "Tak. Temat można zaproponować przez formularz kontaktowy, opisując problem z analityką w handlu, który warto omówić. Pytania powtarzające się u wielu czytelników mają pierwszeństwo.",
      },
    ],
  },
  categories,
  posts,
  calculatorsPage,
  calculators,
  contact: {
    seo: {
      title: "Kontakt — Tatsiana Bandziuk, analityka w handlu, Warszawa",
      description:
        "Zapytanie o projekt analityczny: asortyment, ceny, raporty Power BI lub dane produktowe. Odpowiedź w ciągu jednego dnia roboczego, PL / EN / RU.",
    },
    eyebrow: "Kontakt",
    h1: "Kontakt w sprawie projektu analityki w handlu — Tatsiana Bandziuk",
    intro:
      "Opisz zadanie w kilku zdaniach. W ciągu jednego dnia roboczego otrzymasz odpowiedź z pierwszymi pytaniami i propozycją punktu startu.",
    note: "Każde zapytanie czytam osobiście. Napisz, co nie działa — asortyment, ceny, dane produktowe czy raporty — a odpowiem pytaniami, od których zaczęłabym pracę. Jeśli projekt nie jest w moim zakresie, powiem to wprost.",
    stepsTitle: "Jak przebiega zapytanie: odpowiedź, rozmowa, zakres prac",
    steps: [
      {
        label: "KROK 01",
        title: "Odpowiedź z pierwszymi pytaniami w ciągu jednego dnia roboczego",
        text: "Piszę, jakie dane chciałabym zobaczyć i jak rozumiem główny problem.",
      },
      {
        label: "KROK 02",
        title: "Krótka rozmowa po polsku, angielsku lub rosyjsku",
        text: "Trzydzieści minut, żeby potwierdzić problem i sprawdzić, czy jestem właściwą osobą do tego projektu.",
      },
      {
        label: "KROK 03",
        title: "Pisemny zakres prac i punkt startu",
        text: "Krótka propozycja: forma współpracy, czas trwania, rezultaty i to, co zostaje w zespole po projekcie.",
      },
    ],
    languagesTitle: "Języki i lokalizacja konsultacji w Warszawie",
    details: [
      { label: "Polski", value: "biegły" },
      { label: "English", value: "biegły" },
      { label: "Русский", value: "ojczysty" },
      { label: "Warszawa", value: "CET / CEST" },
      { label: "Praca online", value: "Europa i inne regiony" },
    ],
    faqTitle: "Zapytanie o projekt analityczny — pytania",
    faq: [
      {
        question: "Jak szybko odpowiadasz na zapytanie?",
        answer:
          "W ciągu jednego dnia roboczego. Zamiast ogólnej oferty odpowiadam kilkoma pytaniami o dane i cel projektu, żeby pierwsza rozmowa była konkretna.",
      },
      {
        question: "Czy rozmowa może być po polsku?",
        answer:
          "Tak. Rozmowy, warsztaty, dokumentację i raporty prowadzę po polsku, angielsku lub rosyjsku. Język wybiera się w formularzu, a w projekcie międzynarodowym można łączyć kilka języków.",
      },
      {
        question: "Co napisać w zapytaniu?",
        answer:
          "Wystarczy kilka zdań: czego dotyczy problem (asortyment, ceny, raporty czy dane produktowe), jakich systemów używa firma i na kiedy potrzebny jest wynik. Nie trzeba wysyłać danych przed pierwszą rozmową.",
      },
      {
        question: "Czy podpisujesz NDA przed analizą danych?",
        answer:
          "Tak. Umowę o zachowaniu poufności można podpisać przed przekazaniem jakichkolwiek danych. Dane klienta wykorzystuję wyłącznie w projekcie, a w case study pokazuję je tylko w formie zanonimizowanej.",
      },
    ],
  },
  courses: {
    seo: {
      title: "Kurs Power BI i Excel dla analityków handlu",
      description:
        "Kurs Power BI i Excel dla analityków w handlu i modzie: raporty KPI, budżet open-to-buy, ceny i dane produktowe. Zapisz się na listę oczekujących.",
    },
    eyebrow: "Kursy · wkrótce",
    h1: "Kursy Power BI i Excel dla analityków w handlu i modzie",
    intro:
      "Przygotowuję krótkie, praktyczne kursy Power BI i Excela dla analityków w handlu i modzie, oparte na prawdziwych problemach z raportowaniem sprzedaży, a nie na ogólnych przykładach. Zapisz się na listę oczekujących, aby dowiedzieć się o starcie wśród pierwszych osób.",
    modulesTitle: "Program kursu Power BI i Excel dla handlu",
    modules: [
      {
        label: "MODUŁ 01",
        title: "Power BI w raportowaniu KPI sprzedaży",
        text: "Model danych, miary DAX dla sell-through i pokrycia zapasu oraz układ dashboardu, który zespół handlowy będzie otwierać.",
      },
      {
        label: "MODUŁ 02",
        title: "Excel w planowaniu asortymentu i zakupów",
        text: "Budżet open-to-buy, rozłożenie dostaw w czasie i scenariusze, które planiści utrzymają bez autora modelu.",
      },
      {
        label: "MODUŁ 03",
        title: "Analiza cen i obniżek w praktyce",
        text: "Architektura cenowa, scenariusze marży i test planu obniżek przed sezonem.",
      },
      {
        label: "MODUŁ 04",
        title: "Dane produktowe i słownik atrybutów",
        text: "Słownik atrybutów i reguły walidacji, które działają na wielu rynkach.",
      },
    ],
    audienceTitle: "Dla kogo są kursy analityki handlowej",
    audience: [
      "Analitycy w handlu i modzie, którzy raportują asortyment, ceny lub zapasy",
      "Kupcy i planiści budujący własne modele w Excelu",
      "Małe zespoły marek bez specjalisty BI",
      "Osoby przechodzące do analityki handlu z innych branż",
    ],
    waitlistTitle: "Lista oczekujących na kurs Power BI i Excel",
    waitlistText:
      "Jedna wiadomość e-mail, gdy ruszy pierwszy kurs, a do tego darmowe szablony. Bez newslettera.",
    waitlistButton: "Zapisz mnie na listę",
    meanwhile: "Na początek nauki:",
    meanwhileLink: "darmowy szablon Excel open-to-buy i checklista dashboardu KPI",
    faqTitle: "Kurs Power BI i Excel — pytania",
    faq: [
      {
        question: "Kiedy startuje kurs Power BI?",
        answer:
          "Data startu nie jest jeszcze ustalona, bo program kursu jest w przygotowaniu. Osoby z listy oczekujących dostaną jedną wiadomość e-mail, gdy ruszą zapisy.",
      },
      {
        question: "Ile kosztuje kurs Power BI?",
        answer:
          "Ceny kursów na rynku zależą od formy i długości: od darmowych materiałów Microsoft Learn po płatne szkolenia z trenerem. Cena tego kursu zostanie podana razem z datą startu, najpierw osobom z listy oczekujących.",
      },
      {
        question: "Od czego zacząć naukę Power BI?",
        answer:
          "Najlepiej zacząć od modelu danych: tabel faktów, wymiarów i relacji, a dopiero potem przejść do miar DAX i wizualizacji. W handlu dobrym pierwszym projektem jest prosty raport sprzedaży i sell-through na własnych danych. Na start przydają się też darmowe szablony i artykuły na blogu.",
      },
    ],
  },
  templates: {
    seo: {
      title: "Darmowy szablon Excel open-to-buy i checklista dashboardu",
      description:
        "Darmowy szablon Excel do budżetu zakupów open-to-buy i checklista dashboardu KPI w Power BI. Gotowe do dostosowania dla zespołów w handlu.",
    },
    eyebrow: "Darmowe szablony",
    h1: "Darmowy szablon Excel open-to-buy i checklista dashboardu KPI",
    intro:
      "Darmowy szablon Excel do budżetu zakupów open-to-buy i checklista dashboardu KPI w Power BI, przygotowane na podstawie praktyki w handlu modowym. Oba pliki wysyłam e-mailem; można je od razu dostosować do własnych kategorii i rynków.",
    items: [
      {
        title: "Szablon Excel open-to-buy do planowania zakupów",
        text: "Ilości, koszt, marża i rozłożenie zakupów na miesiące i rynki, z trzema kontrolami, które zatrzymują rozjazd budżetu w sezonie.",
        preview: "otb",
        previewCaption: "podgląd · arkusz open-to-buy",
      },
      {
        title: "Checklista dashboardu KPI dla Power BI",
        text: "Dwanaście punktów do sprawdzenia, zanim dashboard sprzedażowy trafi do zespołu handlowego: definicje, właściciele i odświeżanie.",
        preview: "checklist",
        previewCaption: "podgląd · checklista dashboardu",
      },
    ],
    checklist: [
      "Sell-through zdefiniowany i opisany",
      "Pokrycie zapasu według kategorii i rynku",
      "Udział sprzedaży w pełnej cenie i głębokość obniżek",
      "Zwroty w tym samym modelu danych",
      "Jeden właściciel każdej strony raportu",
    ],
    insideTitle: "Co zawiera szablon open-to-buy i checklista dashboardu",
    inside: [
      "Arkusz open-to-buy z podziałem na miesiące i kalkulacją marży",
      "Zakładka krzywych rozmiarów i kolorów zasilana oczyszczoną historią sprzedaży",
      "Arkusz definicji: jak i przez kogo liczony jest każdy KPI",
      "Checklista dashboardu z dwunastoma punktami kontroli przed udostępnieniem",
      "Jednostronicowa instrukcja przekazania modelu zespołowi planowania",
    ],
    formTitle: "Pobierz darmowe szablony Excel dla handlu",
    formText: "Jedna wiadomość e-mail z dwoma plikami. Bez newslettera i bez przekazywania adresu innym firmom.",
    panelTitle: "Darmowe szablony Excel i Power BI do analityki sprzedaży",
    panelText:
      "Dwa pliki wysyłane e-mailem: model budżetu open-to-buy w Excelu i checklista dashboardu KPI, który zespół handlowy będzie naprawdę otwierać.",
    chips: ["Szablon Excel open-to-buy", "Checklista dashboardu KPI"],
    button: "Wyślij mi oba szablony",
    courseNote: "Kursy Power BI i Excel dla analityków w handlu — wkrótce. Bez newslettera i bez przekazywania adresu.",
    relatedTitle: "Artykuły o planowaniu zakupów i raportowaniu sprzedaży",
    faqTitle: "Darmowe szablony Excel — pytania",
    faq: [
      {
        question: "Czy szablon jest darmowy?",
        answer:
          "Tak. Szablon Excel open-to-buy i checklista dashboardu KPI są bezpłatne. Wystarczy podać adres e-mail, na który zostaną wysłane oba pliki; adres nie jest używany do newslettera ani przekazywany innym firmom.",
      },
      {
        question: "Jaka wersja Excela jest potrzebna?",
        answer:
          "Szablon opiera się na standardowych formułach Excela, więc wystarczy aktualna wersja programu Microsoft Excel, np. w ramach Microsoft 365. Nie są potrzebne żadne dodatki ani dodatkowe oprogramowanie.",
      },
      {
        question: "Czy szablon obsługuje kilka rynków?",
        answer:
          "Tak. Arkusz open-to-buy rozkłada zakupy na miesiące i rynki, więc budżet można planować osobno dla każdego rynku. Wartości w obrębie jednego rynku powinny być w jednej walucie i w tych samych cenach, detalicznych lub zakupu.",
      },
      {
        question: "Jak używać checklisty dashboardu?",
        answer:
          "Checklistę przechodzi się punkt po punkcie, zanim dashboard KPI trafi do zespołu handlowego. Każdy punkt sprawdza definicje wskaźników, właścicieli raportu lub odświeżanie danych. Niespełnione punkty warto poprawić przed publikacją, a nie po pierwszych pytaniach użytkowników.",
      },
    ],
  },
  privacy: {
    seo: {
      title: "Polityka prywatności — tatsianabandziuk.com",
      description:
        "Zasady przetwarzania danych osobowych i plików cookies w serwisie tatsianabandziuk.com: administrator danych, cele, hosting, bezpieczeństwo i Twoje prawa.",
    },
    slug: "polityka-prywatnosci",
    eyebrow: "Informacje prawne",
    h1: "Polityka prywatności serwisu tatsianabandziuk.com",
    intro: "Niniejsza polityka prywatności opisuje zasady przetwarzania danych osobowych oraz wykorzystywania plików cookies w serwisie internetowym dostępnym pod adresem: https://www.tatsianabandziuk.com.",
    sections: [
      {
        id: "informacje",
        title: "1. Informacje podstawowe",
        text: "Administratorem danych osobowych jest:\n\nAliaksandr Bandziuk, osoba fizyczna prowadząca działalność gospodarczą (JDG) pod firmą „Aliaksandr Bandziuk”\nNIP: 9512630588\nREGON: 542809213\nz siedzibą w Polsce (UE).\n\nKontakt z administratorem możliwy jest poprzez adres e-mail: info@bandziuk.com.\n\nDane osobowe podawane w formularzach są przetwarzane wyłącznie w celu kontaktu zwrotnego z użytkownikiem oraz udzielenia odpowiedzi na zapytania.\n\nDane nie są przekazywane żadnym podmiotom trzecim.",
      },
      {
        id: "cookies",
        title: "2. Pliki cookies",
        text: "Strona wykorzystuje pliki cookies w celu:\n— zapewnienia prawidłowego działania strony;\n— prowadzenia anonimowej statystyki odwiedzin (za pomocą Google Analytics i Microsoft Clarity) — dopiero po wyrażeniu zgody na analityczne pliki cookies.\n\nUżytkownik może zarządzać plikami cookies w ustawieniach swojej przeglądarki internetowej.\n\nKorzystanie ze strony oznacza zgodę na używanie cookies zgodnie z ustawieniami przeglądarki.",
      },
      {
        id: "przetwarzanie",
        title: "3. Przetwarzanie danych",
        text: "Dane są przetwarzane wyłącznie w zakresie niezbędnym do realizacji kontaktu z użytkownikiem.\n\nDane nie są profilowane ani przetwarzane automatycznie w sposób wywołujący skutki prawne.\n\nUżytkownik ma prawo do:\n— dostępu do swoich danych,\n— ich poprawienia lub usunięcia,\n— ograniczenia przetwarzania,\n— wniesienia sprzeciwu.\n\nDane mogą być przechowywane w wiadomościach e-mail oraz logach serwera przez czas niezbędny do realizacji kontaktu i celów statystycznych.\n\nDane osobowe nie są przekazywane poza Europejski Obszar Gospodarczy (EOG), chyba że jest to konieczne technicznie – np. w przypadku korzystania z narzędzi analitycznych lub formularzy kontaktowych, których serwery mogą znajdować się poza EOG (np. w USA). W takich przypadkach dane są przekazywane zgodnie z odpowiednimi mechanizmami prawnymi (np. standardowymi klauzulami umownymi) zgodnymi z RODO.",
      },
      {
        id: "hosting",
        title: "4. Hosting i bezpieczeństwo",
        text: "— Strona jest hostowana na serwerach Vercel (usługa zewnętrzna).\n— Połączenie z serwisem jest szyfrowane (SSL).\n— Administrator dokłada starań, by dane były przetwarzane w sposób bezpieczny.",
      },
      {
        id: "kontakt",
        title: "5. Kontakt",
        text: "W przypadku pytań dotyczących polityki prywatności, skontaktuj się przez e-mail: info@bandziuk.com.",
      },
    ],
    note: "Pytania dotyczące polityki prywatności: info@bandziuk.com.",
  },
  notFound: {
    eyebrow: "Błąd 404",
    h1: "Nie znaleziono strony na tatsianabandziuk.com",
    text: "Pod tym adresem nie ma żadnych danych. Wykres obok pokazuje, jak taka sytuacja wygląda w raporcie tygodniowym.",
    note: "Każdy zbiór danych ma gdzieś taki punkt.",
    chartLabel: "Sesje na tej stronie",
    nextTitle: "Najważniejsze strony o analityce w handlu i modzie",
    links: [
      {
        title: "Usługi analityki w handlu i modzie",
        text: "sześć usług i trzy formy współpracy",
        href: "/services",
      },
      {
        title: "Case study z analityki w handlu i modzie",
        text: "zanonimizowane projekty z liczbami",
        href: "/case-studies",
      },
      {
        title: "Blog o analityce w handlu",
        text: "Power BI, Excel, ceny i asortyment",
        href: "/blog",
      },
      {
        title: "Kontakt w sprawie projektu analitycznego",
        text: "odpowiedź w ciągu jednego dnia roboczego",
        href: "/contact",
      },
    ],
  },
  thankYou: {
    contactTitle: "Dziękuję — zapytanie o projekt analityczny zostało wysłane",
    contactText:
      "Każde zapytanie czytam osobiście i odpowiadam w ciągu jednego dnia roboczego, zwykle z kilkoma pytaniami o dane.",
    nextTitle: "Co dalej z zapytaniem o projekt analityczny",
    next: [
      "Odpowiedź z pierwszymi pytaniami — w ciągu jednego dnia roboczego",
      "Krótka rozmowa po polsku, angielsku lub rosyjsku",
      "Pisemny zakres prac, czas trwania i rezultaty",
    ],
    caseStudiesLink: "Przeczytaj case study",
    templatesLink: "Darmowe szablony",
    templatesTitle: "Sprawdź skrzynkę: szablon open-to-buy i checklista dashboardu są w drodze",
    templatesText: `Oba pliki są już w drodze. Jeśli w ciągu dziesięciu minut nic nie dotrze, sprawdź folder spam albo napisz na ${EMAIL}.`,
    sent: "WYSŁANO",
    whileYouWait: "Artykuły o analityce sprzedaży na czas oczekiwania",
    close: "Zamknij i czytaj dalej",
  },
};
