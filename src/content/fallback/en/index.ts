import type { SiteContent } from "../../types";
import { formats, recommendations, services, tools } from "./services";
import { caseStudies } from "./caseStudies";
import { categories } from "./categories";
import { posts } from "./posts";
import { calculators, calculatorsPage } from "./calculators";

const placeholderRec = (topic: string) => ({
  quote: `“Placeholder recommendation text. Two or three sentences from a colleague on ${topic}, quoted with permission once the real recommendation is in place.”`,
  name: "Name Surname",
  role: `Role · ${topic}`,
  placeholder: true,
});

const timeline = [
  {
    period: "2014 — 2016",
    company: "OMA",
    role: "Commercial analyst",
    text: "Sales reporting and planning support for a building materials retailer.",
  },
  {
    period: "2016 — 2018",
    company: "Luxvisage",
    role: "Category & pricing analyst",
    text: "Assortment structure and price positioning for a distributed product range.",
  },
  {
    period: "2018 — 2021",
    company: "Fashion House",
    role: "Retail analyst",
    text: "Multi-brand retail reporting, sell-through and tenant performance analysis.",
  },
  {
    period: "2021 — today",
    company: "International fashion brand",
    role: "Global Brand Analyst & Product Data Lead",
    text: "Assortment, pricing and product data for a brand selling across Europe and Asia.",
    current: true,
  },
];

export const en: SiteContent = {
  locale: "en",
  ui: {
    nav: [
      { label: "Services", href: "/services" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Calculators", href: "/tools" },
      { label: "Contact", href: "/contact" },
    ],
    tagline: "Retail & Fashion Analytics",
    bookConsultation: "Book a Consultation",
    menu: "Menu",
    close: "Close",
    switchLanguage: "Language",
    breadcrumbHome: "Home",
    footerText:
      "Assortment planning, retail pricing, Power BI reporting and product data for fashion and retail brands. Based in Warsaw, working in English, Polish and Russian.",
    footerServices: "Services",
    footerSite: "Site",
    footerContact: "Contact",
    footerSiteLinks: [
      { label: "Case studies", href: "/case-studies" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Free templates", href: "/free-templates" },
      { label: "Retail calculators", href: "/tools" },
      { label: "Courses", href: "/courses" },
      { label: "Contact", href: "/contact" },
    ],
    privacy: "Privacy policy",
    allCaseStudies: "All case studies",
    allArticles: "All articles",
    readArticle: "Read the article",
    featured: "Featured",
    minRead: "min read",
    seeCaseStudy: "See the related case study",
    relatedCaseStudy: "Related Case Study",
    relatedService: "Related service",
    relatedArticles: "Related Retail Analytics Articles",
    toc: "Contents",
    aboutLink: "About Tatsiana Bandziuk",
    replyNote: "Reply within one working day · EN / PL / RU",
    placeholderFigures: "placeholder figures",
    schematicCaption: "schematic dashboard · illustrative data",
    dashboardCaption: "anonymised dashboard illustration · schematic, illustrative data",
    portraitPlaceholder: "Portrait — to be replaced",
    recommendationPlaceholder:
      "Placeholder — real LinkedIn recommendations will be added with permission",
    allFilter: "All case studies",
    topics: {
      assortment: "Assortment",
      pricing: "Pricing",
      "product-data": "Product data",
      reporting: "Reporting",
    },
    slicer: { slicer: "Topic", clear: "Clear", chart: "Case studies by topic" },
    statusBar: {
      ready: "Ready",
      average: "Average",
      count: "Count",
      sum: "Sum",
      words: "Words",
      characters: "Characters",
      value: "Value",
    },
    pagination: { prev: "← Previous", next: "Next →", page: "Page" },
    video: { play: "Play video", transcript: "Video summary" },
    calculatorHint: "The numbers stay in your browser and are not sent anywhere.",
    calculatorMore: "Open the full calculator",
    form: {
      name: "Name",
      company: "Company",
      email: "Email",
      task: "Task or question",
      taskPlaceholder: "e.g. rebuild the SS27 range plan and check the markdown level",
      timeline: "Timeline or budget · optional",
      language: "Preferred language",
      submit: "Book a Consultation",
      sending: "Sending…",
      privacyNote:
        "Your details are used only to reply to this enquiry, as described in the privacy policy.",
      required: "Please fill in this field.",
      invalidEmail: "Please enter a valid email address.",
      error:
        "The message could not be sent. Please write to business@tatsianabandziuk.com.",
      workEmail: "Work email",
      emailPlaceholder: "name@company.com",
      phoneRequired: "Phone number",
      phoneOptional: "Phone · optional",
      invalidPhone:
        "Please enter a phone number with the country code, e.g. +48 600 000 000.",
      channelLegend: "How would you like me to contact you?",
      channelShort: "Preferred contact",
      channels: { email: "Email", whatsapp: "WhatsApp", phone: "Phone call" },
    },
    languages: { en: "English", pl: "Polski", ru: "Русский" },
    cookie: {
      title: "Cookies on this site",
      text: "Necessary cookies keep the site working. Analytics cookies from Google Analytics and Microsoft Clarity are set only if you agree.",
      accept: "Accept all",
      reject: "Only necessary",
      policy: "Privacy policy",
    },
  },
  person: {
    name: "Tatsiana Bandziuk",
    jobTitle: "Retail and Fashion Analytics Consultant",
    shortBio:
      "Retail and fashion analytics consultant in Warsaw with about ten years in international fashion retail: assortment planning, retail pricing, PLM product data and Power BI reporting.",
    signature: "Tatsiana",
    email: "business@tatsianabandziuk.com",
    location: "Warsaw",
    timezone: "CET",
    linkedin: "https://www.linkedin.com/in/tatsiana-bandziuk-a96b81165/",
    languages: [
      { label: "English", value: "professional" },
      { label: "Polski", value: "professional" },
      { label: "Русский", value: "native" },
    ],
    educationChip: "Master of Economics and Management, BSEU",
  },
  home: {
    seo: {
      title: "Tatsiana Bandziuk — Retail & Fashion Analytics Consultant",
      description:
        "Retail and fashion analytics consultant in Warsaw: assortment planning, retail pricing, Power BI dashboards and PLM product data. Work in EN, PL, RU.",
    },
    eyebrow: "Warsaw, Poland · EN / PL / RU",
    h1: {
      before: "Tatsiana Bandziuk,",
      accent: "Retail and Fashion Analytics",
      after: "Consultant",
    },
    subtitle:
      "I help fashion and retail brands plan the assortment, set prices that hold across markets, clean up product data and build Power BI reporting the team actually uses.",
    primaryCta: "Book a Consultation",
    secondaryCta: "See retail analytics case studies",
    stats: [
      { value: "10+", label: "years in fashion retail analytics" },
      { value: "30+", label: "dashboards and models delivered" },
      { value: "3", label: "working languages EN / PL / RU" },
    ],
    chartLabel: "Sell-through by week",
    chartDelta: "+18 pp",
    chartNote: "the week the size curve was fixed",
    experienceTitle:
      "Retail and Brand Analytics Experience at Luxvisage, Fashion House, OMA and an International Fashion Brand",
    experienceNames: ["Luxvisage", "Fashion House", "OMA", "International fashion brand"],
    servicesTitle: "Retail Analytics Consulting Services for Fashion and Retail Brands",
    servicesCount: "06 services",
    aboutTitle: "About Tatsiana Bandziuk, Retail and Fashion Analytics Consultant",
    aboutText: [
      "I have spent about ten years in international fashion retail, working between the commercial teams and the systems behind them: assortment, pricing, product data and the reporting that has to agree with all three.",
      "Today I am Global Brand Analyst and Product Data Lead at an international fashion brand, where I also lead a team of product specialists. From Warsaw I take on consulting projects in English, Polish and Russian.",
    ],
    timelineLabel: "Career timeline",
    timeline,
    aboutLink: "About Tatsiana Bandziuk",
    resultsTitle: "Retail Analytics Consulting Results in Numbers",
    resultsNote: "placeholder figures",
    results: [
      {
        value: "+18",
        unit: "pp",
        label: "sell-through on core categories after the range rebuild",
      },
      { value: "−31", unit: "%", label: "markdown spend across two seasons" },
      {
        value: "40",
        unit: "h",
        label: "monthly reporting time removed by one Power BI model",
      },
      {
        value: "98",
        unit: "%",
        label: "product attribute completeness in PLM after standardisation",
      },
    ],
    formatsTitle: "Retail Analytics Consulting Formats: Diagnostic, Project, Ongoing Support",
    clientTypesLabel: "Who I work with",
    clientTypes: [
      "Fashion brands",
      "Distributors",
      "E-commerce retailers",
      "Growing brands without an analytics team",
    ],
    processTitle: "How a Retail Analytics Consulting Project Works",
    process: [
      {
        label: "STEP 01",
        title: "Retail Data Diagnostic: Sales, Stock and Product Data",
        text: "Two weeks with your sales, stock and product data. You get a short memo that names where margin and time are being lost.",
      },
      {
        label: "STEP 02",
        title: "Retail Analytics Plan with Priorities and Owners",
        text: "A written plan: what changes in the range, pricing, data and reporting, in which order, and who owns each change.",
      },
      {
        label: "STEP 03",
        title: "Building the Excel Models, PLM Rules and Power BI Reports",
        text: "Models, attribute rules and dashboards built on your live data, checked against the numbers your team already trusts.",
      },
      {
        label: "STEP 04",
        title: "Handover of the Analytics Process to Your Team",
        text: "Definitions, documentation and training sessions, so the process keeps running after the project ends.",
      },
    ],
    processPhotoLabel: "Working moment — to be replaced",
    processNote: "Most projects start with one honest look at the data.",
    toolsTitle: "Retail Analytics Tools: Power BI, Excel and PLM Systems",
    educationTitle: "Education in Logistics, Economics and Management",
    educationChips: [
      "Master of Economics and Management, Logistics — BSEU, 2015",
      "Logistician-economist, Logistics — BSEU, 2014",
      "EU Tempus Be-Safe certificate — Sapienza CTL and BSEU, 2014–2015",
      "Knowledge Transfer certificate — Loughborough University",
      "BNTU Young Researchers Seminar 2016 — best paper, 2nd place",
    ],
    caseStudiesTitle: "Retail and Fashion Analytics Case Studies",
    recommendationsTitle: "Recommendations from Fashion Retail Colleagues",
    recommendationsNote:
      "Placeholder — real LinkedIn recommendations will be added with permission",
    faqTitle: "Retail Analytics Consultant FAQ",
    faqLead: "Short answers to the questions brands ask before the first call.",
    faq: [
      {
        question: "What does a retail analytics consultant do?",
        answer:
          "A retail analytics consultant turns a brand’s sales, stock, price and product data into decisions about what to buy, how to price it and how to report on it. In practice that means assortment and pricing analysis, agreed KPI definitions and models or dashboards the team can maintain. My focus is fashion retail: range plans, size curves, price architecture, PLM product data and Power BI.",
      },
      {
        question: "What is retail analytics?",
        answer:
          "Retail analytics is the analysis of sales, stock, pricing, customer and product data to improve buying, pricing, allocation and store or online performance. It covers KPIs such as sell-through, stock cover, margin and returns, and the models used to plan the next season. Good retail analytics ends in a decision, not in a report.",
      },
      {
        question: "What are the 5 KPIs in retail?",
        answer:
          "For a fashion brand, the five KPIs I would track weekly are sell-through rate, gross margin, stock cover (weeks of supply), full-price sales share and returns rate. GMROI and stock turn complete the picture at season level. The exact list matters less than having one written definition for each KPI that every team uses.",
      },
      {
        question: "How long does a retail analytics consulting project take?",
        answer:
          "A data diagnostic takes two weeks. A focused project, such as a range plan, a pricing review or a Power BI reporting model, usually takes four to ten weeks depending on the number of categories and markets. Ongoing support runs month by month.",
      },
      {
        question: "Which data do you need to start a retail analytics project?",
        answer:
          "Sales, stock, receipts and returns at SKU and week level, plus product attributes and prices, ideally for two seasons. Standard exports from your ERP, PLM or e-commerce platform are enough to start. An NDA can be signed before any data is shared.",
      },
      {
        question: "Do you work with fashion brands outside Poland?",
        answer:
          "Yes. I am based in Warsaw and work remotely with brands across Europe and beyond, in English, Polish or Russian. On-site workshops are possible when a project needs them.",
      },
    ],
    blogTitle: "Retail Analytics Articles on Power BI, Pricing and Assortment",
    contactTitle: "Contact Tatsiana Bandziuk about a Retail Analytics Project",
    contactNote:
      "I read every enquiry myself. Tell me what is not working — the range, the prices, the product data or the reporting — and I will reply within one working day with the first questions I would ask. If the project is not a good fit for me, I will say so.",
  },
  about: {
    seo: {
      title: "About Tatsiana Bandziuk: Fashion Retail Analytics",
      description:
        "Tatsiana Bandziuk: about ten years in international fashion retail as a brand analyst and product data lead. Assortment, pricing, PLM. Warsaw.",
    },
    h1: {
      before: "About Tatsiana Bandziuk,",
      accent: "Retail and Fashion Analytics",
      after: "Consultant",
    },
    intro:
      "I am Tatsiana Bandziuk, a retail and fashion analytics consultant based in Warsaw, with about ten years in international fashion retail. My work covers assortment planning, retail pricing, PLM product data and Power BI reporting for fashion brands, distributors and e-commerce retailers.",
    chips: [
      "Assortment planning",
      "Retail pricing",
      "Power BI",
      "PLM product data",
      "Team leadership",
    ],
    experienceTitle:
      "Global Brand Analyst and Product Data Lead Experience in International Fashion Retail",
    experienceText: [
      "I currently work as Global Brand Analyst and Product Data Lead at an international fashion brand that sells across Europe and Asia. My remit is assortment performance, pricing structure and the product data that feeds both.",
      "The job sits between the commercial side and the systems side: agreeing what a number means, making the data produce it reliably, and getting buyers, planners and finance to work from the same version.",
    ],
    projectsTitle: "Assortment, Pricing and Product Data Projects",
    projects: [
      {
        title: "Assortment and Range Performance Analysis",
        text: "Option counts, size and colour curves, category depth and phasing, compared across markets.",
      },
      {
        title: "Price Architecture and Markdown Analysis",
        text: "Price points per category, entry and top tiers, margin and markdown scenarios before the season.",
      },
      {
        title: "Product Data Standardisation in PLM Systems",
        text: "Attribute dictionaries, season and colour structures, and validation rules that hold at data entry.",
      },
      {
        title: "Retail KPI Reporting in Power BI",
        text: "One data model per brand for sell-through, stock cover, full-price share and returns.",
      },
    ],
    leadershipTitle: "Leading Product Data and Analytics Teams",
    leadershipText: [
      "I lead a team of product specialists: we set data standards, review data quality and make a habit of checking a number before it travels into a decision.",
      "In consulting projects this becomes a handover that lasts: written definitions, named owners and training for the people who will run the reporting next season.",
    ],
    leadershipNote: "A report nobody owns stops being true within a month.",
    timelineTitle: "Career Timeline in Fashion Retail Analytics",
    timelineNote: "Roles and years, most recent first",
    timeline: [...timeline].reverse(),
    educationTitle: "Education in Logistics, Economics and Management at BSEU",
    educationText:
      "I hold two degrees in Logistics from the Belarusian State Economic University (BSEU) in Minsk: logistician-economist (2014) and Master of Economics and Management (2015). During the master’s programme I completed the EU Tempus Be-Safe certificate with Sapienza University of Rome (CTL) and Knowledge Transfer sessions with Loughborough University, and in 2016 my paper took second place at the BNTU Young Researchers Seminar. Logistics taught me to define the question before choosing the metric.",
    educationChips: [
      "Logistics, BSEU",
      "Master of Economics and Management",
      "EU Tempus Be-Safe",
    ],
    credentials: {
      title: "Diplomas and Certificates in Logistics, Economics and Management",
      intro:
        "Original documents: two degrees from the Belarusian State Economic University, international training within the EU Tempus programme and a research seminar award. Click a document to open it and zoom in to read the details.",
      items: [
        {
          id: "bseu-2014",
          year: "2014",
          institution: "Belarusian State Economic University",
          title: "Higher education diploma in Logistics · logistician-economist",
          thumb: "/images/credentials/bachelor-cover-thumb.webp",
          image: "/images/credentials/bachelor-inside.webp",
          width: 2000,
          height: 1346,
          redacted: true,
        },
        {
          id: "tempus-2015",
          year: "2014–2015",
          institution: "Sapienza University of Rome (CTL) and BSEU · EU Tempus Be-Safe",
          title: "Certificate: Road Traffic Safety in Logistics, master’s programme",
          thumb: "/images/credentials/tempus-cert-thumb.webp",
          image: "/images/credentials/tempus-cert.webp",
          width: 2000,
          height: 1410,
        },
        {
          id: "loughborough",
          year: "Tempus",
          institution: "Loughborough University, Design School",
          title:
            "Certificate of participation: Knowledge Transfer sessions, Tempus road safety project",
          thumb: "/images/credentials/lboro-thumb.webp",
          image: "/images/credentials/lboro.webp",
          width: 2000,
          height: 1431,
        },
        {
          id: "bseu-2015",
          year: "2015",
          institution: "Belarusian State Economic University",
          title: "Master’s diploma in Logistics · Master of Economics and Management",
          thumb: "/images/credentials/master-cover-thumb.webp",
          image: "/images/credentials/master-inside.webp",
          width: 2000,
          height: 1355,
          redacted: true,
        },
        {
          id: "bntu-2016",
          year: "2016",
          institution: "Belarusian National Technical University",
          title: "Young Researchers Seminar 2016: best paper and presentation, 2nd place",
          thumb: "/images/credentials/yrs-award-thumb.webp",
          image: "/images/credentials/yrs-award.webp",
          width: 2000,
          height: 1428,
        },
      ],
      labels: {
        open: "View document",
        close: "Close",
        prev: "Previous document",
        next: "Next document",
        zoomIn: "Zoom in",
        zoomOut: "Zoom out",
        track: "Diplomas and certificates",
        redactionNote: "Diploma form numbers are hidden.",
        zoomHint: "Scroll or double-click to zoom, drag to move",
      },
    },
    languagesTitle: "Working Languages and Location: English, Polish, Russian in Warsaw",
    languagesText:
      "I am based in Warsaw (CET) and work remotely with brands across Europe and beyond. Calls, workshops, documentation and reports can be in English, Polish or Russian.",
    recommendationTitle:
      "Recommendation from a Fashion Retail Colleague on Analytics Leadership",
    recommendation: placeholderRec("leading product data and analytics work"),
    ctaTitle: "Discuss a Retail Analytics Project with Tatsiana Bandziuk",
    ctaText:
      "Describe the task in a few lines — the range, pricing, product data or reporting — and I will reply with the first questions I would ask.",
    ctaNote: "Opens the enquiry form · reply within one working day",
    faqTitle: "About Tatsiana Bandziuk: Frequently Asked Questions",
    faq: [
      {
        question: "Where is Tatsiana Bandziuk based?",
        answer:
          "I am based in Warsaw, Poland, in the CET time zone. I work remotely with fashion and retail brands across Europe and beyond, and on-site workshops are possible when a project needs them.",
      },
      {
        question: "Which languages does Tatsiana Bandziuk work in?",
        answer:
          "I work in English, Polish and Russian. Calls, workshops, documentation and reports can be in any of the three, and the enquiry form lets you choose the language of my reply.",
      },
      {
        question: "What is Tatsiana Bandziuk’s education?",
        answer:
          "I hold two degrees in Logistics from the Belarusian State Economic University: logistician-economist (2014) and Master of Economics and Management (2015). During the master’s programme I completed the EU Tempus Be-Safe certificate with Sapienza University of Rome and Knowledge Transfer sessions with Loughborough University. In 2016 my paper took second place at the BNTU Young Researchers Seminar.",
      },
      {
        question: "Does Tatsiana Bandziuk take consulting projects?",
        answer:
          "Yes. I take on retail analytics consulting projects in assortment planning, retail pricing, product data and Power BI reporting, as a diagnostic, a focused project or ongoing support. Send a short enquiry and I will reply within one working day.",
      },
    ],
  },
  servicesPage: {
    seo: {
      title: "Retail Analytics Consulting Services for Fashion Brands",
      description:
        "Assortment planning, retail pricing analysis, Power BI dashboards, Excel planning models and PLM product data consulting for fashion and retail brands.",
    },
    eyebrow: "Services",
    h1: "Retail and Fashion Analytics Consulting Services",
    intro:
      "Six retail analytics consulting services for fashion brands, distributors and e-commerce retailers: assortment planning, retail pricing, Power BI dashboards, Excel planning models, product data quality and reporting processes. Each follows the same method: read the data first, agree the definitions, then build something your team can keep running.",
    ctaTitle: "Discuss Which Retail Analytics Consulting Service Fits Your Brand",
    ctaText:
      "Tell me where the reporting or planning hurts most. I will reply with the service I would start with — or tell you honestly if none of them fits.",
    recommendationTitle:
      "Recommendation from a Fashion Retail Colleague on Retail Analytics Work",
    recommendation: placeholderRec("a retail analytics consulting project"),
    faqTitle: "Retail Analytics Consulting Services FAQ",
    faq: [
      {
        question: "What does a retail consultant do?",
        answer:
          "A retail consultant helps a retailer or brand make better commercial decisions: what to buy, how to price it, how to manage stock and how to measure the result. As a retail analytics consultant I work from the data: sales, stock, prices and product attributes. The outcome is a plan, a model or a report the team keeps using.",
      },
      {
        question: "What is included in the two-week retail data diagnostic?",
        answer:
          "I review your sales, stock and product data for two weeks and check how the key KPIs are defined and reported. You receive a short written memo that names where margin and time are being lost and what I would fix first. It is a good starting point when you are not sure which service you need.",
      },
      {
        question: "How is a retail analytics consulting project scoped and priced?",
        answer:
          "After a short call I send a written scope with the format, duration, deliverables and price. The scope depends mainly on the number of categories, markets and data sources involved. Ongoing support runs month by month.",
      },
      {
        question: "Can you work with our existing ERP, PLM and Power BI setup?",
        answer:
          "Yes. I work with the systems you already have and start from standard exports from your ERP, PLM or e-commerce platform. Models and reports are built so your team can maintain them without new software.",
      },
      {
        question: "Do you work remotely or on site?",
        answer:
          "Mostly remotely, from Warsaw, with brands across Europe and beyond. Workshops can be held on site when a project needs them, for example to agree KPI definitions with several teams.",
      },
    ],
  },
  services,
  formats,
  tools,
  recommendations,
  caseStudiesPage: {
    seo: {
      title: "Retail and Fashion Analytics Case Studies",
      description:
        "Anonymised retail and fashion analytics case studies: assortment planning, retail pricing, Power BI reporting and PLM product data, with results.",
    },
    eyebrow: "Case studies",
    h1: "Retail and Fashion Analytics Case Studies",
    intro:
      "Anonymised retail analytics case studies from fashion brands, distributors and e-commerce retailers: assortment planning, pricing, product data and Power BI reporting. Each one shows the problem, what was done, the tools and the result. Client names and identifying details are removed.",
    ctaTitle: "Discuss a Similar Retail Analytics Project",
    ctaText:
      "If one of these looks like your situation, send me two or three sentences about yours. I will reply with what I would check first.",
    faqTitle: "Retail Analytics Case Studies FAQ",
    faq: [
      {
        question: "Are the retail analytics case study clients named?",
        answer:
          "No. Every case study is anonymised, and the client is described only by type, such as a fashion distributor or an e-commerce retailer. Names, brands and details that could identify a business are removed.",
      },
      {
        question: "How are the case study figures anonymised?",
        answer:
          "The figures on the case study pages are illustrative and are marked as such. They show the kind of change a project measures, not a specific client’s results. Details such as market counts or product counts are left out on purpose.",
      },
      {
        question: "Can a similar project be done for our brand?",
        answer:
          "Yes. Each case study links to the service it is based on, and the method adapts to your categories, markets and systems. Send a short description of your situation and I will reply within one working day with what I would check first.",
      },
    ],
  },
  caseStudies,
  blogPage: {
    seo: {
      title: "Retail Analytics Blog: Power BI, Excel and Assortment",
      description:
        "Practical articles on retail KPIs, sell-through, open-to-buy, pricing, PLM product data and Power BI for fashion and retail teams, with formulas.",
    },
    eyebrow: "Blog",
    h1: "Retail Analytics Blog: Power BI, Excel and Assortment Planning",
    intro:
      "Practical articles for fashion and retail teams on retail KPIs, sell-through, open-to-buy, pricing, product data and Power BI. Each one gives the formula, a worked example and the mistakes that make two people quote different numbers.",
    faqTitle: "Retail Analytics Blog FAQ",
    faq: [
      {
        question: "Who writes the retail analytics blog?",
        answer:
          "I write every article myself: Tatsiana Bandziuk, a retail and fashion analytics consultant in Warsaw with about ten years in international fashion retail. The topics come from the questions I work on with buying, planning and product data teams.",
      },
      {
        question: "How often are new retail analytics articles published?",
        answer:
          "New articles are added regularly, and existing ones are updated when a method or a tool changes. Each article shows its publication date, so you can see how current it is.",
      },
      {
        question: "Can I suggest a topic for the blog?",
        answer:
          "Yes. Send the question through the contact form, ideally with an example of where it comes up in your work. If it is useful to other retail teams, I will cover it in an article.",
      },
    ],
  },
  categories,
  posts,
  calculatorsPage,
  calculators,
  contact: {
    seo: {
      title: "Contact Tatsiana Bandziuk — Retail Analytics Consultant",
      description:
        "Send a retail analytics enquiry to Tatsiana Bandziuk: assortment, pricing, Power BI or product data. Reply within one working day, EN / PL / RU.",
    },
    eyebrow: "Contact",
    h1: "Contact Tatsiana Bandziuk about a Retail Analytics Consulting Project",
    intro:
      "Describe your assortment, pricing, product data or reporting task in a few lines. I reply within one working day with the first questions and a suggested starting point.",
    note: "I read every enquiry myself. Tell me what is not working — the range, the prices, the product data or the reporting — and choose how you would like me to get back to you: by email, WhatsApp or phone.",
    stepsTitle: "How a Retail Analytics Enquiry Works: Reply, Call, Scope",
    steps: [
      {
        label: "STEP 01",
        title: "Reply to Your Enquiry Within One Working Day",
        text: "My first questions: what I would need to see in the data and what I think the real question is.",
      },
      {
        label: "STEP 02",
        title: "Short Call in English, Polish or Russian",
        text: "Thirty minutes to check that the problem is the one you described and that I am the right person for it.",
      },
      {
        label: "STEP 03",
        title: "Written Project Scope and Starting Point",
        text: "A short proposal: format, duration, deliverables, price and what your team keeps afterwards.",
      },
    ],
    languagesTitle: "Consultation languages and location",
    details: [
      { label: "English", value: "professional" },
      { label: "Polski", value: "professional" },
      { label: "Русский", value: "native" },
      { label: "Warsaw", value: "CET / CEST" },
      { label: "Remote work", value: "Europe and beyond" },
    ],
    faqTitle: "Retail Analytics Enquiry FAQ",
    faq: [
      {
        question: "How fast do you reply to an enquiry?",
        answer:
          "Within one working day. The reply usually contains two or three questions about your data rather than a generic brochure.",
      },
      {
        question: "Can the first call be in Polish or Russian?",
        answer:
          "Yes. Calls, workshops and documents can be in English, Polish or Russian. Choose the language in the enquiry form and the reply will come in that language.",
      },
      {
        question: "What should the enquiry include?",
        answer:
          "A few sentences are enough: what kind of business you are, what is not working and when you would like it solved. If you know which systems hold the data (ERP, PLM, Power BI, Excel), mention them too.",
      },
      {
        question: "Do you sign an NDA before seeing our data?",
        answer:
          "Yes. I can sign your NDA, or send a standard one, before any data is shared. Case studies on this site are always anonymised.",
      },
    ],
  },
  courses: {
    seo: {
      title: "Power BI and Excel Courses for Retail Analysts",
      description:
        "Upcoming Power BI and Excel courses for retail and fashion analysts: KPI reporting, open-to-buy, pricing and product data. Join the waitlist.",
    },
    eyebrow: "Courses · coming soon",
    h1: "Power BI and Excel Courses for Retail and Fashion Analysts",
    intro:
      "I am preparing short, practical Power BI and Excel courses for retail and fashion analysts, built from real reporting and planning tasks rather than generic BI demos. Join the waitlist to hear when the first course opens.",
    modulesTitle: "Power BI and Excel Course Modules for Retail Analysts",
    modules: [
      {
        label: "MODULE 01",
        title: "Power BI for Retail KPI Reporting",
        text: "Data model, DAX measures for sell-through and stock cover, and a dashboard layout a commercial team will open.",
      },
      {
        label: "MODULE 02",
        title: "Excel Models for Open-to-Buy and Buy Planning",
        text: "Open-to-buy, monthly phasing and scenarios, built so planners can maintain them without the author.",
      },
      {
        label: "MODULE 03",
        title: "Retail Pricing and Markdown Analysis in Excel",
        text: "Price architecture, markup and margin, and how to test a markdown plan before committing to it.",
      },
      {
        label: "MODULE 04",
        title: "Product Data and Attribute Standards in PLM",
        text: "An attribute dictionary and validation rules that hold across several markets.",
      },
    ],
    audienceTitle: "Who the Retail Analytics Courses Are For",
    audience: [
      "Retail and fashion analysts who report on assortment, pricing or stock",
      "Buyers and merchandise planners who build their own Excel models",
      "Small brand teams without an in-house BI specialist",
      "Analysts moving into fashion retail from another industry",
    ],
    waitlistTitle: "Join the Retail Analytics Course Waitlist",
    waitlistText:
      "One email when the first course opens and the free templates in the meantime. No newsletter, and your address is never shared.",
    waitlistButton: "Join the waitlist",
    meanwhile: "In the meantime:",
    meanwhileLink: "free open-to-buy Excel template and retail KPI dashboard checklist",
    faqTitle: "Retail Analytics Courses FAQ",
    faq: [
      {
        question: "When will the retail analytics courses start?",
        answer:
          "The courses are in preparation and no start date is fixed yet. Join the waitlist and you will receive one email when the first course opens.",
      },
      {
        question: "Will the Power BI course be online?",
        answer:
          "Yes, the courses are being prepared as online courses, so you can follow them from anywhere. Each module is built around a real retail reporting or planning task rather than a generic BI demo.",
      },
      {
        question: "Which languages will the courses be taught in?",
        answer:
          "I work in English, Polish and Russian, and the courses are being prepared with these languages in mind. The waitlist email will say which language versions open first.",
      },
      {
        question: "Do I need Power BI experience to join?",
        answer:
          "Basic Excel skills are enough for the Excel modules. For the Power BI module it helps to have opened Power BI Desktop before, but the course starts from the retail data model rather than from advanced DAX.",
      },
    ],
  },
  templates: {
    seo: {
      title: "Free Open-to-Buy Excel Template and KPI Checklist",
      description:
        "Free open-to-buy Excel template for retail planners and a retail KPI dashboard checklist for Power BI. Structured, documented, ready to adapt.",
    },
    eyebrow: "Free templates",
    h1: "Free Open-to-Buy Excel Template and Retail KPI Dashboard Checklist",
    intro:
      "Two free working files for retail and fashion planners: an open-to-buy Excel template with monthly phasing and a checklist for a retail KPI dashboard in Power BI. Both are sent by email and ready to adapt to your categories and markets.",
    items: [
      {
        title: "Open-to-Buy Excel Template for Retail Planning",
        text: "Planned sales, markdowns, closing stock and on-order by month and category, with the open-to-buy calculated for you and checks that flag drift mid-season.",
        preview: "otb",
        previewCaption: "preview · open-to-buy sheet",
      },
      {
        title: "Retail KPI Dashboard Checklist for Power BI",
        text: "The checks to run before a retail dashboard goes to the commercial team: KPI definitions, owners, market access and refresh.",
        preview: "checklist",
        previewCaption: "preview · dashboard checklist",
      },
    ],
    checklist: [
      "Sell-through defined and documented",
      "Stock cover per category and market",
      "Full-price share and markdown depth",
      "Returns rate in the same model",
      "One owner per report page",
    ],
    insideTitle: "What Is Inside the Open-to-Buy Excel Template",
    inside: [
      "Open-to-buy sheet with monthly phasing by category",
      "Open-to-buy formula: planned sales + planned markdowns + planned closing stock − opening stock − stock on order",
      "Built-in checks that flag when receipts or sales have not been updated",
      "A definitions tab that says how each figure is calculated",
      "A one-page guide on using the template in a seasonal planning cycle",
    ],
    formTitle: "Download the Free Retail Planning Templates",
    formText:
      "Leave your email and both files arrive in one message. No newsletter, and your address is never shared.",
    panelTitle: "Free Open-to-Buy Excel Template and Retail KPI Dashboard Checklist",
    panelText:
      "Two free downloads sent by email: an open-to-buy planning model in Excel and a checklist for a Power BI retail KPI dashboard that a commercial team will actually open.",
    chips: ["Open-to-Buy Excel Template", "Retail KPI Dashboard Checklist"],
    button: "Send me both templates",
    courseNote:
      "Power BI and Excel courses for retail analysts are in preparation. No newsletter, and your address is never shared.",
    relatedTitle: "Retail Planning Articles Related to the Free Templates",
    faqTitle: "Free Open-to-Buy Template and KPI Checklist FAQ",
    faq: [
      {
        question: "Is the open-to-buy Excel template free?",
        answer:
          "Yes. Both the open-to-buy Excel template and the retail KPI dashboard checklist are free. Leave your email and both files arrive in one message, with no newsletter.",
      },
      {
        question: "Which Excel version does the template need?",
        answer:
          "The template is built with standard Excel formulas, so a current desktop version of Microsoft Excel, such as Microsoft 365, is enough. No add-ins or extra software are needed.",
      },
      {
        question: "Can the template handle several markets?",
        answer:
          "The template is laid out by month and category and is meant to be adapted. For several markets, keep one planning sheet per market with the same categories, so the totals can be added up. Convert every market to one currency before adding them.",
      },
      {
        question: "How is the KPI dashboard checklist used?",
        answer:
          "Go through it before a Power BI retail dashboard is shared with the commercial team. It checks that every KPI has a written definition and an owner, that market access is set and that the refresh works. Anything unticked is a reason to wait.",
      },
    ],
  },
  privacy: {
    seo: {
      title: "Privacy Policy — tatsianabandziuk.com",
      description:
        "How tatsianabandziuk.com handles personal data and cookies: who the data controller is, why data is processed, hosting, transfers and your rights.",
    },
    slug: "privacy-policy",
    eyebrow: "Legal",
    h1: "Privacy Policy for tatsianabandziuk.com",
    intro: "This Privacy Policy describes how your personal data and cookies are handled on the website https://www.tatsianabandziuk.com (the “Website”).",
    sections: [
      {
        id: "general",
        title: "1. General Information",
        text: "Aliaksandr Bandziuk, sole proprietor (JDG) registered in Poland\nBusiness name: Aliaksandr Bandziuk\nNIP (Tax ID): 9512630588\nREGON: 542809213\nBased in Poland (EU).\n\nYou can contact me at: info@bandziuk.com.\n\nI collect and process personal data only when you voluntarily provide it via the contact form or a sign-up form on the Website.\n\nYour data will not be shared with third parties, used for marketing automation, or stored in external CRMs.",
      },
      {
        id: "cookies",
        title: "2. Cookies",
        text: "The Website uses cookies to:\n— ensure proper operation of the site;\n— collect anonymous website usage statistics (via Google Analytics and Microsoft Clarity), only after you accept analytics cookies.\n\nBy using the Website, you agree to the use of cookies in accordance with your browser settings.\n\nYou can disable cookies in your browser at any time. Please note that disabling cookies may affect some site functionality.",
      },
      {
        id: "processing",
        title: "3. Data Processing",
        text: "1. Personal data is processed solely for communication purposes — e.g., to respond to your inquiry.\n2. No profiling, automated decision-making, or newsletter distribution takes place.\n3. You have the right to:\n— access your data,\n— correct or delete your data,\n— restrict or object to processing.\n4. Data is stored securely and only for as long as needed to respond to your inquiry or maintain technical records.",
      },
      {
        id: "hosting",
        title: "4. Hosting and Security",
        text: "— The Website is hosted by Vercel (vercel.com), a reliable cloud hosting provider.\n— The Website uses SSL encryption (https) to protect your data.\n— No database of user data is maintained — messages are delivered via email only.",
      },
      {
        id: "transfers",
        title: "5. International Data Transfers",
        text: "— Your personal data is not intentionally transferred outside the European Economic Area (EEA).\n— However, certain technical tools (e.g. Google Analytics, Microsoft Clarity, form services, or hosting providers) may process data on servers outside the EEA (such as in the United States or other countries).\n— In such cases, data transfers are protected under GDPR-compliant legal mechanisms (such as Standard Contractual Clauses).",
      },
      {
        id: "final",
        title: "6. Final Notes",
        text: "— Submitting any personal information on this Website is entirely voluntary.\n— If you have any questions about this Privacy Policy, contact me at info@bandziuk.com.\n— This policy may be updated from time to time, especially if legal or technical circumstances change.",
      },
    ],
    note: "Questions about this policy: info@bandziuk.com.",
  },
  notFound: {
    eyebrow: "Error 404",
    h1: "Page Not Found on tatsianabandziuk.com",
    text: "There is no page at this address. It may have moved, or the link may contain a typo. The chart shows what that looks like in a weekly report.",
    note: "Every dataset has one of these somewhere.",
    chartLabel: "Sessions on this page",
    nextTitle: "Where to Go Next on the Retail Analytics Site",
    links: [
      {
        title: "Retail Analytics Consulting Services",
        text: "six services and three formats",
        href: "/services",
      },
      {
        title: "Retail and Fashion Analytics Case Studies",
        text: "anonymised projects with results",
        href: "/case-studies",
      },
      {
        title: "Retail Analytics Blog Articles",
        text: "Power BI, Excel, pricing and assortment",
        href: "/blog",
      },
      {
        title: "Contact about a Retail Analytics Project",
        text: "reply within one working day",
        href: "/contact",
      },
    ],
  },
  thankYou: {
    contactTitle: "Thank You — Your Retail Analytics Enquiry Has Been Sent",
    contactText:
      "I read every enquiry myself and reply within one working day, usually with two or three questions about your data before anything else.",
    nextTitle: "What Happens Next with Your Retail Analytics Enquiry",
    next: [
      "A reply with first questions — within one working day",
      "A short call in English, Polish or Russian",
      "A written scope with duration and deliverables",
    ],
    caseStudiesLink: "Read the case studies",
    templatesLink: "Free templates",
    templatesTitle: "Check Your Inbox for the Open-to-Buy Template and Dashboard Checklist",
    templatesText:
      "Both files are on their way. If nothing arrives within ten minutes, please check your spam folder. Sent to",
    sent: "SENT",
    whileYouWait: "While You Wait: Retail Analytics Articles",
    close: "Close and keep reading",
  },
};
