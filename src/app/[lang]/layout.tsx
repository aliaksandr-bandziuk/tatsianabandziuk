import "@/app/globals.css";
import StatusBar from "@/app/components/site/StatusBar";
import SmoothScroll from "@/app/components/site/SmoothScroll";
import PageLoader from "@/app/components/site/PageLoader";
import { getContent, localizeHref } from "@/content";
import type { SiteContent } from "@/content/types";
import { ConsultationModalProvider } from "@/app/components/site/ConsultationModal";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Playfair_Display, Inter_Tight, IBM_Plex_Mono, Caveat, Marck_Script } from "next/font/google";
import CustomCookieConsent from "../components/shared/CustomCookieConsent/CustomCookieConsent";
import GoogleAnalyticsWrapper from "../components/scripts/GoogleAnalyticsWrapper/GoogleAnalyticsWrapper";
import MicrosoftClarity from "../components/scripts/MicrosoftClarity/MicrosoftClarity";
import SchemaIdentity from "../components/seo/SchemaIdentity/SchemaIdentity";
import Header from "../components/site/Header";
import Footer from "../components/site/Footer";
import Reveal from "../components/site/Reveal";
import { INDEXING_ALLOWED, LOCALES, NOINDEX_ROBOTS, SITE_NAME, SITE_URL, isLocale } from "@/lib/site";

// Every font carries Cyrillic and Polish diacritics: the site is EN / PL / RU.
// `subsets` only decides what is PRELOADED; the generated @font-face rules
// cover every subset through unicode-range, so PL and RU text still gets its
// glyphs. Preloading all three subsets of five families put 21 font files in
// front of the first render (PageSpeed, 2026-09-18), so only the Latin files of
// the heading and body fonts are preloaded; the decorative fonts load on use.
const fontHeading = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const fontBody = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const fontMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

const fontSignature = Marck_Script({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: "400",
  variable: "--font-signature",
  display: "swap",
  preload: false,
});

const fontHand = Caveat({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["500"],
  variable: "--font-hand",
  display: "swap",
  preload: false,
});

// Default cache lifetime for every page under [lang]. Must be a literal; keep
// equal to SANITY_REVALIDATE_SECONDS. Publishing refreshes pages earlier via
// the webhook's revalidateTag.
export const revalidate = 86400;

// Without generateStaticParams a page under [lang] is rendered on every
// request and never cached (Next.js 14).
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Retail and Fashion Analytics Consultant`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Assortment planning, retail pricing analysis and Power BI reporting for fashion and retail brands. Consultant based in Warsaw, working in English, Polish and Russian.",
  robots: INDEXING_ALLOWED ? undefined : NOINDEX_ROBOTS,
};

export const viewport: Viewport = {
  themeColor: "#faf8f4",
  colorScheme: "light",
};

const MODAL_TEXT: Record<string, { title: string; text: string }> = {
  en: { title: "Book a Retail Analytics Consultation", text: "Describe the task in a few lines. I reply within one working day with the first questions about your data." },
  pl: { title: "Umów konsultację z analityki handlu detalicznego", text: "Opisz zadanie w kilku zdaniach. Odpowiem w ciągu jednego dnia roboczego z pierwszymi pytaniami o Twoje dane." },
  ru: { title: "Запись на консультацию по аналитике ритейла", text: "Опишите задачу в нескольких строках. Отвечу в течение одного рабочего дня и задам первые вопросы о ваших данных." },
};

function modalProps(lang: string, c: SiteContent) {
  const m = MODAL_TEXT[lang] ?? MODAL_TEXT.en;
  return {
    title: m.title,
    text: m.text,
    closeLabel: c.ui.close,
    form: {
      lang,
      form: c.ui.form,
      languages: c.ui.languages,
      thanks: {
        title: c.thankYou.contactTitle,
        text: c.thankYou.contactText,
        nextTitle: c.thankYou.nextTitle,
        next: c.thankYou.next,
        links: [
          { label: c.thankYou.caseStudiesLink, href: localizeHref(lang, "/case-studies") },
          { label: c.thankYou.templatesLink, href: localizeHref(lang, "/free-templates") },
        ],
      },
    },
  };
}

export default async function LangLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

  if (!isLocale(params.lang)) notFound();
  const c = await getContent(params.lang);

  return (
    <html lang={params.lang}>
      <body
        className={`${fontHeading.variable} ${fontBody.variable} ${fontMono.variable} ${fontHand.variable} ${fontSignature.variable}`}
      >
        {/* Site-wide entity graph; other schema on the site references it by @id. */}
        <SchemaIdentity lang={params.lang} />

        <a className="skip-link" href="#main">
          {{ en: "Skip to content", pl: "Przejdź do treści", ru: "К содержанию" }[params.lang]}
        </a>
        <ConsultationModalProvider {...modalProps(params.lang, c)}>
          <Header lang={params.lang} />
          <main id="main">{children}</main>
          <Footer lang={params.lang} />
        </ConsultationModalProvider>
        <Reveal />
        <SmoothScroll />
        <StatusBar lang={params.lang} labels={c.ui.statusBar} />
        <PageLoader
          signature={c.person.name}
          label={{ en: "Loading page…", pl: "Ładowanie strony…", ru: "Загрузка страницы…" }[params.lang] ?? "Loading page…"}
        />

        <GoogleAnalyticsWrapper />
        <MicrosoftClarity />
        <CustomCookieConsent lang={params.lang} />
      </body>
    </html>
  );
}
