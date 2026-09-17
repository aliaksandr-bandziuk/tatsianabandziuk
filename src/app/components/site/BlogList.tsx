import Link from "next/link";
import type { Post } from "@/content/types";
import { categoryHref, dateLabel, getContent, localizeHref, postHref } from "@/content";
import { PostCard } from "./Blocks";
import { Cover } from "./Charts";
import s from "@/app/[lang]/pages.module.scss";

export function CategoryChips({ lang, active }: { lang: string; active?: string }) {
  const c = getContent(lang);
  return (
    <nav className={s.filters} aria-label="Blog categories">
      <Link href={localizeHref(lang, "/blog")} aria-current={active ? undefined : "page"}>
        {c.ui.allArticles}
      </Link>
      {c.categories.map((cat) => (
        <Link key={cat.slug} href={categoryHref(lang, cat.slug)} aria-current={active === cat.slug ? "page" : undefined}>
          {cat.label}
        </Link>
      ))}
    </nav>
  );
}

export function FeaturedPost({ lang, post }: { lang: string; post: Post }) {
  const c = getContent(lang);
  const cat = c.categories.find((x) => x.slug === post.category);
  return (
    <Link href={postHref(lang, post.slug)} className={`lift ${s.featured}`} data-reveal>
      <Cover variant={post.cover} />
      <div className={s.featuredBody}>
        <div className="chips">
          <span className="chip">{c.ui.featured}</span>
          {cat && <span className="chip chip-muted">{cat.label}</span>}
          <span className="chip chip-muted">
            <time dateTime={post.date}>{dateLabel(lang, post.date)}</time>
          </span>
          <span className="chip chip-muted">
            {post.readingMinutes} {c.ui.minRead}
          </span>
        </div>
        <h2 className="h3">{post.title}</h2>
        <p className="body">{post.excerpt}</p>
        <span className="link" style={{ alignSelf: "flex-start" }}>
          {c.ui.readArticle}
        </span>
      </div>
    </Link>
  );
}

export function PostGrid({ lang, posts }: { lang: string; posts: Post[] }) {
  return (
    <div className="grid-3">
      {posts.map((p, i) => (
        <PostCard key={p.slug} lang={lang} post={p} index={i % 3} />
      ))}
    </div>
  );
}
