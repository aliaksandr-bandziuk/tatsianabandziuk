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
  slug: string;
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
  caseStudySlug?: string;
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
  slug: string;
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
  serviceSlug: string;
  serviceTitle: string;
  serviceText: string;
  serviceChips: string[];
  note: string;
  publishedAt: string;
  seo: Seo;
};

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "formula"; text: string }
  | { type: "code"; code: string; caption?: string }
  | { type: "chart"; title: string; legend: string; caption: string }
  | { type: "list"; items: string[] }
  | {
      type: "table";
      caption?: string;
      columns: { label: string; kind?: "text" | "number"; format?: "scale" | "bars"; suffix?: string }[];
      rows: { cells: (string | number)[]; trend?: "up" | "down" | "flat" }[];
      trendColumn?: number;
    };

export type Post = {
  slug: string;
  category: string; // category slug
  title: string;
  h1: AccentHeading;
  excerpt: string;
  lead: string;
  date: string; // ISO
  readingMinutes: number;
  cover: CoverVariant;
  featured?: boolean;
  body: ArticleBlock[];
  serviceSlug: string;
  seo: Seo;
};

export type Category = {
  slug: string;
  label: string;
  h1: string;
  intro: string;
  serviceSlug?: string;
  seo: Seo;
};

export type CareerStep = {
  period: string;
  company: string;
  role: string;
  text: string;
  current?: boolean;
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
  servicesCount: string;
  aboutTitle: string;
  aboutText: string[];
  timelineLabel: string;
  timeline: CareerStep[];
  aboutLink: string;
  resultsTitle: string;
  resultsNote: string;
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
  languagesTitle: string;
  languagesText: string;
  recommendationTitle: string;
  recommendation: Recommendation;
  ctaTitle: string;
  ctaText: string;
  ctaNote: string;
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
  placeholderFigures: string;
  schematicCaption: string;
  dashboardCaption: string;
  portraitPlaceholder: string;
  recommendationPlaceholder: string;
  allFilter: string;
  topics: Record<string, string>;
  slicer: { slicer: string; clear: string; chart: string };
  statusBar: { ready: string; average: string; count: string; sum: string; words: string; characters: string; value: string };
  pagination: { prev: string; next: string; page: string };
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
  contact: ContactContent;
  courses: CoursesContent;
  templates: TemplatesContent;
  privacy: LegalContent;
  notFound: NotFoundContent;
  thankYou: ThankYouContent;
};
