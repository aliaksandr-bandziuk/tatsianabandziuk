import { SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * Single source of truth for who this site is about. One Person node with a
 * stable @id, emitted on every page; every other schema references it.
 *
 * Discretion rule: no worksFor. The current employer is never named.
 */

export const PERSON_ID = `${SITE_URL}/#person`;
export const SERVICE_ID = `${SITE_URL}/#service`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const PERSON_NAME = SITE_NAME;

/** Other spellings people search for. Russian spelling is Бандюк. */
export const ALTERNATE_NAMES = ["Tatiana Bandziuk", "Tatsiana Lustenkova", "Татьяна Бандюк"];

/** Only the profile she has access to. Add new profiles here. */
export const SAME_AS: string[] = ["https://www.linkedin.com/in/tatsiana-bandziuk-a96b81165/"];

export const KNOWS_LANGUAGE = ["en", "pl", "ru"];

const JOB_TITLE: Record<string, string> = {
  en: "Retail and Fashion Analytics Consultant",
  pl: "Konsultantka ds. analityki w handlu i modzie",
  ru: "Консультант по аналитике в ритейле и моде",
};

type Graph = Record<string, unknown>;

export function personNode(lang: string): Graph {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSON_NAME,
    alternateName: ALTERNATE_NAMES,
    url: SITE_URL,
    jobTitle: JOB_TITLE[lang] ?? JOB_TITLE.en,
    knowsAbout: [
      "Assortment planning",
      "Range management",
      "Retail pricing analysis",
      "Power BI dashboards",
      "Advanced Excel modelling",
      "Product data management",
      "PLM data standardisation",
      "Fashion retail analytics",
    ],
    knowsLanguage: KNOWS_LANGUAGE,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Belarusian State Economic University",
    },
    address: { "@type": "PostalAddress", addressLocality: "Warsaw", addressCountry: "PL" },
    sameAs: SAME_AS,
  };
}

/** The consulting practice, provided by the person. */
export function serviceNode(): Graph {
  return {
    "@type": "ProfessionalService",
    "@id": SERVICE_ID,
    name: `${PERSON_NAME} — Retail and Fashion Analytics Consulting`,
    url: SITE_URL,
    founder: { "@id": PERSON_ID },
    employee: { "@id": PERSON_ID },
    areaServed: [{ "@type": "Place", name: "Europe" }],
    availableLanguage: KNOWS_LANGUAGE,
    address: { "@type": "PostalAddress", addressLocality: "Warsaw", addressCountry: "PL" },
  };
}

export function webSiteNode(lang: string): Graph {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: PERSON_NAME,
    inLanguage: lang,
    publisher: { "@id": PERSON_ID },
  };
}

export function identityGraph(lang: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [personNode(lang), serviceNode(), webSiteNode(lang)],
  };
}

export const personRef = () => ({ "@id": PERSON_ID });
export const serviceRef = () => ({ "@id": SERVICE_ID });
