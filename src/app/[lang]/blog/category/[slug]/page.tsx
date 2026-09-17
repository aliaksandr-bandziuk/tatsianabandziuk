import type { Metadata } from "next";
import { ConsultationButton } from "@/app/components/site/ConsultationModal";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent, localizeHref, pageMetadata, serviceHref } from "@/content";
import { Breadcrumbs } from "@/app/components/site/Blocks";
import { CategoryChips, PostGrid } from "@/app/components/site/BlogList";
import { LOCALES } from "@/lib/site";
import s from "../../../pages.module.scss";

type Params = { lang: string; slug: string };


export function generateStaticParams() {
  return LOCALES.flatMap((lang) => getContent(lang).categories.map((cat) => ({ lang, slug: cat.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const cat = getContent(params.lang).categories.find((x) => x.slug === params.slug);
  if (!cat) return {};
  return pageMetadata(params.lang, cat.seo, () => `/blog/category/${cat.slug}`);
}

export default function CategoryPage({ params }: { params: Params }) {
  const { lang } = params;
  const c = getContent(lang);
  const cat = c.categories.find((x) => x.slug === params.slug);
  if (!cat) notFound();
  const posts = c.posts.filter((p) => p.category === cat.slug).sort((a, b) => b.date.localeCompare(a.date));
  const service = c.services.find((sv) => sv.slug === cat.serviceSlug);
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
    </>
  );
}
