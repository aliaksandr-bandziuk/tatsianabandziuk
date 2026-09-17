import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bySlug, calculatorHref, getContent, itemMetadata, localizeHref, postByKey, postHref, serviceByKey, serviceHref, slugParams } from "@/content";
import { Accent, Breadcrumbs, FaqSection, accentText } from "@/app/components/site/Blocks";
import { ArticleBody, articleStyles as a } from "@/app/components/site/Article";
import { ConsultationButton } from "@/app/components/site/ConsultationModal";
import JsonLd from "@/app/components/site/JsonLd";
import { RelatedCalculators, RelatedPosts, servicePosts } from "@/app/components/site/Related";
import { PERSON_ID } from "@/lib/schema/identity";
import { SITE_URL } from "@/lib/site";
import s from "../../pages.module.scss";

type Params = { lang: string; slug: string };

export async function generateStaticParams() {
  return slugParams("calculator");
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const calc = bySlug("calculator", await getContent(params.lang), params.slug);
  if (!calc) return {};
  return await itemMetadata("calculator", params.lang, calc);
}

export default async function CalculatorPage({ params }: { params: Params }) {
  const { lang } = params;
  const c = await getContent(lang);
  const calc = bySlug("calculator", c, params.slug);
  if (!calc) notFound();
  const post = postByKey(c, calc.relatedPostKey);
  const service = serviceByKey(c, calc.serviceKey);
  // Same service first, then the rest; the aside already links to `post`.
  const others = c.calculators
    .filter((x) => x.key !== calc.key)
    .sort((x, y) => Number(y.serviceKey === calc.serviceKey) - Number(x.serviceKey === calc.serviceKey))
    .slice(0, 3);
  const relatedPosts = await servicePosts(lang, calc.serviceKey, 3, post?.key);
  const url = `${SITE_URL}${calculatorHref(lang, calc.slug)}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${url}#app`,
    name: accentText(calc.h1),
    description: calc.lead,
    url,
    inLanguage: lang,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className={`container ${s.pageHead}`} style={{ maxWidth: "calc(1040px + 2 * var(--gutter))" }}>
        <div data-reveal>
          <Breadcrumbs lang={lang} items={[{ label: c.calculatorsPage.eyebrow, href: localizeHref(lang, "/tools") }, { label: calc.breadcrumb }]} />
          <h1 className="h1-inner">
            <Accent h={calc.h1} />
          </h1>
          <p className="lead" style={{ maxWidth: 760 }}>
            {calc.lead}
          </p>
        </div>
      </section>
      <section className={`container section ${a.layout}`}>
        <div>
          <ArticleBody blocks={calc.body} lang={lang} standalone />
        </div>
        <aside className={a.aside}>
          {post && (
            <div className={a.author}>
              <p className="eyebrow" style={{ margin: 0 }}>
                {c.ui.relatedArticles}
              </p>
              <h2 style={{ margin: "12px 0 8px", fontSize: 18, lineHeight: 1.3 }}>
                <Link href={postHref(lang, post.slug)}>{post.title}</Link>
              </h2>
              <p>{post.excerpt}</p>
            </div>
          )}
          {service && (
            <div className={a.service}>
              <p className="eyebrow" style={{ margin: 0 }}>
                {c.ui.relatedService}
              </p>
              <h3>
                <Link href={serviceHref(lang, service.slug)}>{service.cardTitle}</Link>
              </h3>
              <p>{service.cardText}</p>
              <ConsultationButton href={`${localizeHref(lang, "/contact")}#enquiry`} className="btn btn-sm btn-light btn-inline">
                {c.ui.bookConsultation}
              </ConsultationButton>
            </div>
          )}
        </aside>
      </section>
      <FaqSection title={calc.faqTitle} items={calc.faq} />
      <RelatedPosts lang={lang} posts={relatedPosts} />
      <RelatedCalculators lang={lang} items={others} />
    </>
  );
}
