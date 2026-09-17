import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categoryHref, dateLabel, getContent, localizeHref, pageMetadata, postHref } from "@/content";
import { Accent, Breadcrumbs, PostCard, accentText } from "@/app/components/site/Blocks";
import { ArticleAside, ArticleBody, articleStyles as a } from "@/app/components/site/Article";
import JsonLd from "@/app/components/site/JsonLd";
import { PERSON_ID } from "@/lib/schema/identity";
import { LOCALES, SITE_URL } from "@/lib/site";
import s from "../../pages.module.scss";

type Params = { lang: string; slug: string };


export function generateStaticParams() {
  return LOCALES.flatMap((lang) => getContent(lang).posts.map((p) => ({ lang, slug: p.slug })));
}

function find(params: Params) {
  return getContent(params.lang).posts.find((p) => p.slug === params.slug);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = find(params);
  if (!post) return {};
  const meta = pageMetadata(params.lang, post.seo, () => `/blog/${post.slug}`, { type: "article" });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: post.date, authors: [getContent(params.lang).person.name] } };
}

export default function PostPage({ params }: { params: Params }) {
  const { lang } = params;
  const c = getContent(lang);
  const post = find(params);
  if (!post) notFound();
  const cat = c.categories.find((x) => x.slug === post.category);
  const related = c.posts.filter((p) => p.slug !== post.slug).sort((x, y) => Number(y.category === post.category) - Number(x.category === post.category)).slice(0, 3);
  const url = `${SITE_URL}${postHref(lang, post.slug)}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: accentText(post.h1),
    description: post.lead,
    url,
    mainEntityOfPage: url,
    inLanguage: lang,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    articleSection: cat?.label,
    isPartOf: { "@id": `${SITE_URL}${localizeHref(lang, "/blog")}#blog` },
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className={`container ${s.pageHead}`} style={{ maxWidth: "calc(1040px + 2 * var(--gutter))" }}>
        <div data-reveal>
          <Breadcrumbs
            lang={lang}
            items={[
              { label: c.ui.nav[3].label, href: localizeHref(lang, "/blog") },
              ...(cat ? [{ label: cat.label, href: categoryHref(lang, cat.slug) }] : []),
              { label: post.title },
            ]}
          />
          <div className="chips" style={{ marginBottom: 20 }}>
            {cat && <span className="chip">{cat.label}</span>}
            <span className="chip chip-muted">
              <time dateTime={post.date}>{dateLabel(lang, post.date, "long")}</time>
            </span>
            <span className="chip chip-muted">
              {post.readingMinutes} {c.ui.minRead}
            </span>
          </div>
          <h1 className="h1-inner">
            <Accent h={post.h1} />
          </h1>
          <p className="lead" style={{ maxWidth: 760 }}>
            {post.lead}
          </p>
        </div>
      </section>
      <section className={`container section ${a.layout}`}>
        <article>
          <ArticleBody blocks={post.body} lang={lang} />
        </article>
        <ArticleAside lang={lang} post={post} />
      </section>
      <section className="container section">
        <h2 className="h2-sm" style={{ marginBottom: 26 }} data-reveal>
          {c.ui.relatedArticles}
        </h2>
        <div className="grid-3">
          {related.map((p, i) => (
            <PostCard key={p.slug} lang={lang} post={p} withCover={false} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
