import Link from "next/link";
import { calculatorHref, getContent, latestPosts } from "@/content";
import type { CalculatorPage, Post } from "@/content/types";
import { PostCard } from "./Blocks";

/**
 * Cross-links between sections: articles and calculators that belong to the
 * same service (`serviceKey`). Render nothing when the list is empty.
 */

export async function RelatedPosts({ lang, posts, title }: { lang: string; posts: Post[]; title?: string }) {
  if (!posts.length) return null;
  const c = await getContent(lang);
  return (
    <section className="container section">
      <h2 className="h2-sm" style={{ marginBottom: 26 }} data-reveal>
        {title ?? c.ui.relatedArticles}
      </h2>
      <div className="grid-3">
        {posts.map((p, i) => (
          <PostCard key={p.key} lang={lang} post={p} withCover={false} index={i} />
        ))}
      </div>
    </section>
  );
}

export async function RelatedCalculators({ lang, items, title }: { lang: string; items: CalculatorPage[]; title?: string }) {
  if (!items.length) return null;
  const c = await getContent(lang);
  return (
    <section className="container section">
      <h2 className="h2-sm" style={{ marginBottom: 26 }} data-reveal>
        {title ?? c.calculatorsPage.h1}
      </h2>
      <div className="grid-3">
        {items.map((o, i) => (
          <Link key={o.key} href={calculatorHref(lang, o.slug)} className="card lift" style={{ textDecoration: "none", color: "inherit" }} data-reveal data-reveal-delay={(i % 3) * 60}>
            <h3 className="h3" style={{ marginBottom: 10 }}>
              {o.cardTitle}
            </h3>
            <p className="body">{o.cardText}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Up to `count` articles of one service, finished ones first. */
export async function servicePosts(lang: string, serviceKey: string | undefined, count = 3, exceptKey?: string) {
  if (!serviceKey) return [];
  const c = await getContent(lang);
  return latestPosts(c, c.posts.length, exceptKey)
    .filter((p) => p.serviceKey === serviceKey)
    .slice(0, count);
}

/** Calculators of one service. */
export async function serviceCalculators(lang: string, serviceKey: string | undefined) {
  if (!serviceKey) return [];
  const c = await getContent(lang);
  return c.calculators.filter((x) => x.serviceKey === serviceKey);
}
