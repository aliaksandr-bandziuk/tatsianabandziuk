import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bySlug, categoryByKey, categoryHref, dateLabel, getContent, itemMetadata, latestPosts, localizeHref, postHref, slugParams } from "@/content";
import type { ArticleBlock } from "@/content/types";
import { Accent, Breadcrumbs, FaqSection, accentText } from "@/app/components/site/Blocks";
import { RelatedCalculators, RelatedPosts } from "@/app/components/site/Related";
import { ArticleAside, ArticleBody, articleStyles as a } from "@/app/components/site/Article";
import JsonLd from "@/app/components/site/JsonLd";
import { PERSON_ID } from "@/lib/schema/identity";
import { SITE_URL } from "@/lib/site";
import s from "../../pages.module.scss";

type Params = { lang: string; slug: string };

export async function generateStaticParams() {
  return slugParams("post");
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params;
  const post = bySlug("post", await getContent(params.lang), params.slug);
  if (!post) return {};
  const meta = await itemMetadata("post", params.lang, post, { type: "article" });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: post.date, authors: [(await getContent(params.lang)).person.name] } };
}

type VideoBlock = Extract<ArticleBlock, { type: "video" }>;

function videoSchema(v: VideoBlock, lang: string) {
  return {
    "@type": "VideoObject",
    name: v.title,
    description: v.description,
    uploadDate: v.uploadDate,
    ...(v.duration ? { duration: v.duration } : {}),
    thumbnailUrl: `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.youtubeId}`,
    contentUrl: `https://www.youtube.com/watch?v=${v.youtubeId}`,
    inLanguage: lang,
    ...(v.transcript?.length ? { transcript: v.transcript.join(" ") } : {}),
  };
}

export default async function PostPage(props: { params: Promise<Params> }) {
  const params = await props.params;
  const { lang } = params;
  const c = await getContent(lang);
  const post = bySlug("post", c, params.slug);
  if (!post) notFound();
  const cat = categoryByKey(c, post.category);
  // Same category first, then finished articles, then newest.
  const related = latestPosts(c, c.posts.length, post.key)
    .sort((x, y) => Number(y.category === post.category) - Number(x.category === post.category))
    .slice(0, 3);
  const url = `${SITE_URL}${postHref(lang, post.slug)}`;
  const videos = post.body.filter((b): b is VideoBlock => b.type === "video");
  // Calculators of the same service, except the ones already embedded in the text.
  const embedded = new Set(post.body.flatMap((b) => (b.type === "calculator" ? [b.kind] : [])));
  const calculators = c.calculators.filter((x) => x.serviceKey === post.serviceKey && !embedded.has(x.kind));

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
    ...(videos.length ? { video: videos.map((v) => videoSchema(v, lang)) } : {}),
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
      {post.faq && post.faq.length > 0 && <FaqSection title={post.faqTitle ?? accentText(post.h1)} items={post.faq} />}
      <RelatedCalculators lang={lang} items={calculators} />
      <RelatedPosts lang={lang} posts={related} />
    </>
  );
}
