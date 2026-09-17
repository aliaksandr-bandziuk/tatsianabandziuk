import type { Metadata } from "next";
import { getContent, localeParams, localizeHref, pageMetadata, postHref } from "@/content";
import { CategoryChips, FeaturedPost, PostGrid } from "@/app/components/site/BlogList";
import { EmailSignup } from "@/app/components/site/Forms";
import JsonLd from "@/app/components/site/JsonLd";
import { PERSON_ID } from "@/lib/schema/identity";
import { SITE_URL } from "@/lib/site";
import s from "../pages.module.scss";

export const generateStaticParams = localeParams;

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return pageMetadata(params.lang, getContent(params.lang).blogPage.seo, () => "/blog");
}

export default function BlogPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const c = getContent(lang);
  const p = c.blogPage;
  const posts = [...c.posts].sort((a, b) => b.date.localeCompare(a.date));
  const featured = posts.find((x) => x.featured) ?? posts[0];
  const rest = posts.filter((x) => x !== featured);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}${localizeHref(lang, "/blog")}#blog`,
    name: p.h1,
    description: p.intro,
    inLanguage: lang,
    author: { "@id": PERSON_ID },
    blogPost: posts.map((x) => ({
      "@type": "BlogPosting",
      headline: x.title,
      url: `${SITE_URL}${postHref(lang, x.slug)}`,
      datePublished: x.date,
    })),
  };
  return (
    <>
      <JsonLd data={schema} />
      <section className={`container ${s.pageHead}`} data-reveal>
        <p className="eyebrow">{p.eyebrow}</p>
        <h1 className="h1-inner" style={{ marginTop: 20 }}>
          {p.h1}
        </h1>
        <p className="lead">{p.intro}</p>
      </section>
      <section className="container section">
        <FeaturedPost lang={lang} post={featured} />
        <CategoryChips lang={lang} />
        <PostGrid lang={lang} posts={rest} />
      </section>
      <section className="container section">
        <div className={`panel ${s.templates}`} data-reveal>
          <div>
            <h2 className="h2-sm">{c.templates.panelTitle}</h2>
            <p className="body-lg">{c.templates.panelText}</p>
          </div>
          <EmailSignup
            kind="templates"
            form={c.ui.form}
            button={c.templates.button}
            note={c.templates.courseNote}
            thanks={{ title: c.thankYou.templatesTitle, text: c.thankYou.templatesText, sent: c.thankYou.sent, items: c.templates.items.map((i) => i.title) }}
          />
        </div>
      </section>
    </>
  );
}
