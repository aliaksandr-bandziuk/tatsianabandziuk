/**
 * View models for every page. The fallback content in ./fallback and, later,
 * the Sanity documents both resolve to these shapes, so components never care
 * where a text came from.
 */

export type Locale = "en" | "pl" | "ru";

export type ChartKind =
  | "sizeCurve"
  | "priceLadder"
  | "dashboard"
  | "otbTable"
  | "completeness"
  | "calendar";

export type DashboardVariant = "bars" | "trend" | "blocks";
export type CoverVariant = "bars" | "tag" | "swatches" | "table" | "lines";

/** A heading whose middle part is set in emerald italics. */
export type AccentHeading = {
  before: string;
  accent?: string;
  after?: string;
};

export type Metric = { value: string; unit?: string; label: string };
export type TitledText = { label?: string; title: string; text?: string };
export type Fact = { label: string; value: string };
export type FaqItem = { question: string; answer: string };
export type LinkItem = { label: string; href: string };

export type Seo = { title: string; description: string; noindex?: boolean };

export type Tool = {
  id: string;
  monogram: string;
  title: string;
  text: string;
  skills: string[];
};

export type Recommendation = {
  quote: string;
  name: string;
  role: string;
  placeholder?: boolean;
};

export type Service = {
  /** Stable id shared by all language versions (the EN slug). */
  key: string;
  /** URL slug in this language. */
  slug: string;
  /** Last edit in Sanity (sitemap lastmod); absent in the fallback content. */
  updatedAt?: string;
  number: string;
  cardTitle: string;
  cardText: string;
  chart: ChartKind;
  chartCaption: string;
  breadcrumb: string;
  h1: AccentHeading;
  intro: string;
  factsTitle: string;
  facts: Fact[];
  factsNote: string;
  problemsTitle: string;
  problems: TitledText[];
  includesTitle: string;
  includesLead: string;
  includes: TitledText[];
  resultsTitle: string;
  results: Metric[];
  toolsTitle: string;
  tools: TitledText[]; // label = monogram
  caseStudyKey?: string;
  recommendationTitle: string;
  recommendation: Recommendation;
  faqTitle: string;
  faq: FaqItem[];
  ctaTitle: string;
  ctaText: string;
  seo: Seo;
};

export type ConsultingFormat = {
  label: string;
  title: string;
  suits: string;
  youGet: string;
  duration: string;
  cta: string;
};

export type CaseStudy = {
  key: string;
  slug: string;
  updatedAt?: string;
  topics: string[]; // filter keys: assortment | pricing | product-data | reporting
  tag: string;
  title: string;
  h1: AccentHeading;
  summary: string;
  intro: string;
  cardMetrics: [string, string];
  dashboard: DashboardVariant;
  breadcrumb: string;
  facts: Fact[];
  factsNote: string;
  challengeTitle: string;
  challenge: string[];
  challengePoints: string[];
  actionsTitle: string;
  actions: TitledText[];
  resultsTitle: string;
  results: Metric[];
  toolsTitle: string;
  tools: TitledText[];
  serviceKey: string;
  serviceTitle: string;
  serviceText: string;
  serviceChips: string[];
  note: string;
  faqTitle?: string;
  faq?: FaqItem[];
  publishedAt: string;
  seo: Seo;
};

/**
 * Interactive calculators embedded in articles. Field ids per kind:
 * - marginMarkup: inputs cost, price, targetMargin · results margin, markup, profit, targetPrice
 * - sellThrough: inputs opening, received, sold, returned · results rate, rateReceived
 * - gmroi: inputs grossMargin, avgInventory · results gmroi
 * - stockTurn: inputs cogs, avgInventory, periodDays, stock, weeklySales · results turns, days, weeksCover
 * - openToBuy: inputs sales, markdowns, endStock, openingStock, onOrder · results otb
 */
export type CalculatorKind = "marginMarkup" | "sellThrough" | "gmroi" | "stockTurn" | "openToBuy";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "formula"; text: string }
  | { type: "code"; code: string; caption?: string }
  | { type: "chart"; title: string; legend: string; caption: string }
  | { type: "list"; items: string[] }
  | {
      type: "calculator";
      kind: CalculatorKind;
      title: string;
      /** Labels for the inputs and results of this kind, keyed by field id (see CALCULATOR_FIELDS in ./calculators). */
      labels: Record<string, string>;
      note?: string;
    }
  | {
      /** YouTube video: lite embed on click (youtube-nocookie.com) plus VideoObject markup. */
      type: "video";
      youtubeId: string;
      title: string;
      description: string;
      /** ISO date of the YouTube upload. */
      uploadDate: string;
      /** ISO 8601 duration, e.g. "PT7M30S". */
      duration?: string;
      /** Short transcript or chapter summary shown under the player. */
      transcript?: string[];
    }
  | {
      type: "table";
      caption?: string;
      columns: { label: string; kind?: "text" | "number"; format?: "scale" | "bars"; suffix?: string }[];
      rows: { cells: (string | number)[]; trend?: "up" | "down" | "flat" }[];
      trendColumn?: number;
    };

export type Post = {
  /** Stable id: the same topic in several languages shares a key; a language-only topic has its own. */
  key: string;
  slug: string;
  updatedAt?: string;
  category: string; // category key
  title: string;
  h1: AccentHeading;
  excerpt: string;
  lead: string;
  date: string; // ISO
  readingMinutes: number;
  cover: CoverVariant;
  featured?: boolean;
  body: ArticleBlock[];
  faqTitle?: string;
  faq?: FaqItem[];
  serviceKey: string;
  /** true while the body is still a stand-in (listed in research/copy-report.md). */
  placeholder?: boolean;
  seo: Seo;
};

export type Category = {
  key: string;
  slug: string;
  updatedAt?: string;
  label: string;
  h1: string;
  intro: string;
  faqTitle?: string;
  faq?: FaqItem[];
  serviceKey?: string;
  seo: Seo;
};

/** Stand-alone calculator page (/tools/<slug>). The body must contain a calculator block of the same `kind`. */
export type CalculatorPage = {
  key: string;
  slug: string;
  updatedAt?: string;
  kind: CalculatorKind;
  cardTitle: string;
  cardText: string;
  breadcrumb: string;
  h1: AccentHeading;
  /** 1–2 sentences answering what the calculator does. */
  lead: string;
  body: ArticleBlock[];
  faqTitle: string;
  faq: FaqItem[];
  relatedPostKey?: string;
  serviceKey: string;
  seo: Seo;
};

export type CareerStep = {
  period: string;
  company: string;
  role: string;
  text: string;
  current?: boolean;
};

/**
 * A photo the site renders through `next/image`.
 *
 * `src` is either a Sanity CDN URL (built with `urlFor()`, resized by the
 * custom loader) or a path under `public/`. Photos are edited in Studio, so
 * `alt` is per language.
 */
export type SiteImage = {
  src: string;
  alt: string;
  /** Object-position for the crop, e.g. "center 20%". Default: "center". */
  focus?: string;
};

export type Person = {
  name: string;
  jobTitle: string;
  shortBio: string;
  signature: string;
  email: string;
  location: string;
  timezone: string;
  linkedin: string;
  languages: Fact[];
  educationChip: string;
  /** Hero photo on the home page. */
  photoPrimary?: SiteImage;
  /** Photo for every other slot: about teaser, about page, contact. */
  photoSecondary?: SiteImage;
  /** Desk photo without a face, used in the process block on the home page. */
  photoWorkspace?: SiteImage;
};

export type HomeContent = {
  seo: Seo;
  eyebrow: string;
  h1: AccentHeading;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  stats: Metric[];
  chartLabel: string;
  chartDelta: string;
  chartNote: string;
  experienceTitle: string;
  experienceNames: string[];
  servicesTitle: string;
  aboutTitle: string;
  aboutText: string[];
  timelineLabel: string;
  timeline: CareerStep[];
  aboutLink: string;
  resultsTitle: string;
  results: Metric[];
  formatsTitle: string;
  clientTypesLabel: string;
  clientTypes: string[];
  processTitle: string;
  process: TitledText[];
  processPhotoLabel: string;
  processNote: string;
  toolsTitle: string;
  educationTitle: string;
  educationChips: string[];
  caseStudiesTitle: string;
  recommendationsTitle: string;
  recommendationsNote: string;
  faqTitle: string;
  faqLead: string;
  faq: FaqItem[];
  blogTitle: string;
  contactTitle: string;
  contactNote: string;
};

export type Credential = {
  id: string;
  year: string;
  institution: string;
  title: string;
  /** Card preview (cover for bound diplomas) and the full document shown in the viewer. */
  thumb: string;
  image: string;
  width: number;
  height: number;
  redacted?: boolean;
};

export type CredentialsBlock = {
  title: string;
  intro: string;
  items: Credential[];
  labels: {
    open: string;
    close: string;
    prev: string;
    next: string;
    zoomIn: string;
    zoomOut: string;
    track: string;
    redactionNote: string;
    zoomHint: string;
  };
};

export type AboutContent = {
  seo: Seo;
  h1: AccentHeading;
  intro: string;
  chips: string[];
  experienceTitle: string;
  experienceText: string[];
  projectsTitle: string;
  projects: TitledText[];
  leadershipTitle: string;
  leadershipText: string[];
  leadershipNote: string;
  timelineTitle: string;
  timelineNote: string;
  timeline: CareerStep[];
  educationTitle: string;
  educationText: string;
  educationChips: string[];
  credentials: CredentialsBlock;
  languagesTitle: string;
  languagesText: string;
  recommendationTitle: string;
  recommendation: Recommendation;
  ctaTitle: string;
  ctaText: string;
  ctaNote: string;
  faqTitle?: string;
  faq?: FaqItem[];
};

export type ListingPage = {
  seo: Seo;
  eyebrow: string;
  h1: string;
  intro: string;
  ctaTitle?: string;
  ctaText?: string;
  recommendationTitle?: string;
  recommendation?: Recommendation;
  faqTitle?: string;
  faq?: FaqItem[];
};

export type ContactContent = {
  seo: Seo;
  eyebrow: string;
  h1: string;
  intro: string;
  note: string;
  stepsTitle: string;
  steps: TitledText[];
  languagesTitle: string;
  details: Fact[];
  faqTitle: string;
  faq: FaqItem[];
};

export type CoursesContent = {
  seo: Seo;
  eyebrow: string;
  h1: string;
  intro: string;
  modulesTitle: string;
  modules: TitledText[];
  audienceTitle: string;
  audience: string[];
  waitlistTitle: string;
  waitlistText: string;
  waitlistButton: string;
  meanwhile: string;
  meanwhileLink: string;
  faqTitle?: string;
  faq?: FaqItem[];
};

export type TemplatesContent = {
  seo: Seo;
  eyebrow: string;
  h1: string;
  intro: string;
  items: { title: string; text: string; preview: "otb" | "checklist"; previewCaption: string }[];
  checklist: string[];
  insideTitle: string;
  inside: string[];
  formTitle: string;
  formText: string;
  panelTitle: string;
  panelText: string;
  chips: string[];
  button: string;
  courseNote: string;
  relatedTitle: string;
  faqTitle?: string;
  faq?: FaqItem[];
};

export type LegalContent = {
  seo: Seo;
  slug: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections: { id: string; title: string; text: string }[];
  note: string;
};

export type NotFoundContent = {
  eyebrow: string;
  h1: string;
  text: string;
  note: string;
  chartLabel: string;
  nextTitle: string;
  links: { title: string; text: string; href: string }[];
};

export type ThankYouContent = {
  contactTitle: string;
  contactText: string;
  nextTitle: string;
  next: string[];
  caseStudiesLink: string;
  templatesLink: string;
  templatesTitle: string;
  templatesText: string;
  sent: string;
  whileYouWait: string;
  close: string;
};

/** Interface strings: navigation, buttons, form labels. */
export type Ui = {
  nav: LinkItem[];
  tagline: string;
  bookConsultation: string;
  /** Short button label for the phone header bar. */
  bookConsultationShort: string;
  menu: string;
  close: string;
  switchLanguage: string;
  breadcrumbHome: string;
  footerText: string;
  footerServices: string;
  footerSite: string;
  footerContact: string;
  footerSiteLinks: LinkItem[];
  privacy: string;
  allCaseStudies: string;
  allArticles: string;
  readArticle: string;
  featured: string;
  minRead: string;
  seeCaseStudy: string;
  relatedCaseStudy: string;
  relatedService: string;
  relatedArticles: string;
  toc: string;
  aboutLink: string;
  replyNote: string;
  schematicCaption: string;
  dashboardCaption: string;
  portraitPlaceholder: string;
  recommendationPlaceholder: string;
  allFilter: string;
  topics: Record<string, string>;
  slicer: { slicer: string; clear: string; chart: string };
  statusBar: { ready: string; average: string; count: string; sum: string; words: string; characters: string; value: string };
  pagination: { prev: string; next: string; page: string };
  video: { play: string; transcript: string };
  /** Shown under every calculator, e.g. that numbers stay in the browser. */
  calculatorHint: string;
  /** Link under an embedded calculator to its stand-alone page. */
  calculatorMore: string;
  form: {
    name: string;
    company: string;
    email: string;
    task: string;
    taskPlaceholder: string;
    timeline: string;
    language: string;
    submit: string;
    sending: string;
    privacyNote: string;
    required: string;
    invalidEmail: string;
    error: string;
    workEmail: string;
    emailPlaceholder: string;
    phoneRequired: string;
    phoneOptional: string;
    invalidPhone: string;
    channelLegend: string;
    channelShort: string;
    channels: { email: string; whatsapp: string; phone: string };
  };
  languages: { en: string; pl: string; ru: string };
  cookie: { title: string; text: string; accept: string; reject: string; policy: string };
};

export type SiteContent = {
  locale: Locale;
  ui: Ui;
  person: Person;
  home: HomeContent;
  about: AboutContent;
  servicesPage: ListingPage;
  services: Service[];
  formats: ConsultingFormat[];
  tools: Tool[];
  recommendations: Recommendation[];
  caseStudiesPage: ListingPage;
  caseStudies: CaseStudy[];
  blogPage: ListingPage;
  categories: Category[];
  posts: Post[];
  calculatorsPage: ListingPage;
  calculators: CalculatorPage[];
  contact: ContactContent;
  courses: CoursesContent;
  templates: TemplatesContent;
  privacy: LegalContent;
  notFound: NotFoundContent;
  thankYou: ThankYouContent;
};
