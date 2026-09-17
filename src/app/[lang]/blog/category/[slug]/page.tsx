import type { Metadata } from "next";
import { ConsultationButton } from "@/app/components/site/ConsultationModal";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bySlug, getContent, itemMetadata, localizeHref, serviceByKey, serviceHref, slugParams } from "@/content";
import { Breadcrumbs, FaqSection } from "@/app/components/site/Blocks";
import { CategoryChips, PostGrid } from "@/app/components/site/BlogList";
import { RelatedCalculators } from "@/app/components/site/Related";
import s from "../../../pages.module.scss";

type Params = { lang: string; slug: string };

export async function generateStaticParams() {
  return slugParams("category");
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const cat = bySlug("category", await getContent(params.lang), params.slug);
  if (!cat) return {};
  return await itemMetadata("category", params.lang, cat);
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { lang } = params;
  const c = await getContent(lang);
  const cat = bySlug("category", c, params.slug);
  if (!cat) notFound();
  const posts = c.posts.filter((p) => p.category === cat.key).sort((a, b) => b.date.localeCompare(a.date));
  const service = serviceByKey(c, cat.serviceKey);
  // Calculators of every service the rubric's articles belong to.
  const serviceKeys = new Set([cat.serviceKey, ...posts.map((p) => p.serviceKey)]);
  const calculators = c.calculators.filter((x) => serviceKeys.has(x.serviceKey));
  return (
    <>
      <section className={`container ${s.pageHead}`} data-reveal>
        <Breadcrumbs lang={lang} items={[{ label: c.ui.nav[3].label, href: localizeHref(lang, "/blog") }, { label: cat.label }]} />
        <h1 className="h1-inner">{cat.h1}</h1>
        <p className="lead">{cat.intro}</p>
      </section>
      <section className="container section">
        <CategoryChips lang={lang} active={cat.slug} />
        <PostGrid lang={lang} posts={posts} />
      </section>
      <RelatedCalculators lang={lang} items={calculators} />
      {service && (
        <section className="container section">
          <div className="panel" data-reveal style={{ background: "var(--emerald-band)", color: "#fff" }}>
            <p className="eyebrow" style={{ color: "var(--mint-muted)" }}>
              {c.ui.relatedService}
            </p>
            <h2 className="h2-sm" style={{ color: "#fff", margin: "12px 0" }}>
              <Link href={serviceHref(lang, service.slug)} style={{ color: "inherit", textDecoration: "none" }}>
                {service.cardTitle}
              </Link>
            </h2>
            <p style={{ color: "var(--mint-soft)", maxWidth: 640, marginBottom: 22 }}>{service.cardText}</p>
            <ConsultationButton href={`${localizeHref(lang, "/contact")}#enquiry`} className="btn btn-light btn-inline">
              {c.ui.bookConsultation}
            </ConsultationButton>
          </div>
        </section>
      )}
      {cat.faq && cat.faq.length > 0 && <FaqSection title={cat.faqTitle ?? cat.h1} items={cat.faq} />}
    </>
  );
}
