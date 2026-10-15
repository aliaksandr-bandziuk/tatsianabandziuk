import Link from "next/link";
import { calculatorHref, getContent, latestPosts } from "@/content";
import type { CalculatorPage, CaseStudy, Post } from "@/content/types";
import { CaseCard, PostCard } from "./Blocks";

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

export async function RelatedCase({ lang, item, title }: { lang: string; item?: CaseStudy; title?: string }) {
  if (!item) return null;
  const c = await getContent(lang);
  return (
    <section className="container section">
      <h2 className="h2-sm" style={{ marginBottom: 26 }} data-reveal>
        {title ?? c.ui.relatedCaseStudy}
      </h2>
      <div className="grid-3">
        <CaseCard lang={lang} item={item} />
      </div>
    </section>
  );
}

/**
 * The case study closest to an article, so every article links into the
 * portfolio — the case pages are the ones Google crawls least.
 *
 * Two services (Power BI reporting, Excel planning models) have no case study
 * of their own, and they carry the most articles, so an exact match on
 * `serviceKey` alone leaves the best-crawled rubrics without a link. The
 * rubric's topic is the second try, the newest case the last.
 */
const CATEGORY_TOPIC: Record<string, string> = {
  "power-bi": "reporting",
  excel: "assortment",
  assortment: "assortment",
  pricing: "pricing",
  "product-data": "product-data",
};

export async function serviceCase(lang: string, serviceKey: string | undefined, categoryKey?: string) {
  const c = await getContent(lang);
  if (!c.caseStudies.length) return undefined;
  const exact = serviceKey ? c.caseStudies.find((x) => x.serviceKey === serviceKey) : undefined;
  if (exact) return exact;
  const topic = categoryKey ? CATEGORY_TOPIC[categoryKey] : undefined;
  const byTopic = topic ? c.caseStudies.find((x) => x.topics.includes(topic)) : undefined;
  return byTopic ?? c.caseStudies[0];
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
