"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NotFoundContent } from "@/content/types";
import { NotFoundChart } from "./Charts";
import { localizePath } from "@/lib/routing";
import s from "@/app/[lang]/pages.module.scss";

type Entry = NotFoundContent & { home: string };

/** 404 copy is picked from the URL prefix: Next passes no params to not-found. */
export default function NotFoundView({ byLang }: { byLang: Record<string, Entry> }) {
  const path = usePathname() ?? "/";
  const lang = path.match(/^\/(pl|ru)(\/|$)/)?.[1] ?? "en";
  const n = byLang[lang] ?? byLang.en;
  const prefix = lang === "en" ? "" : `/${lang}`;
  return (
    <>
      <section className={`container ${s.notFound}`}>
        <div>
          <p className="eyebrow">{n.eyebrow}</p>
          <h1 className="h1-inner" style={{ marginTop: 20 }}>
            {n.h1}
          </h1>
          <p className="lead">{n.text}</p>
          <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap", marginTop: 28 }}>
            <Link className="btn" href={prefix || "/"}>
              {n.home}
            </Link>
            <span className="hand" style={{ fontSize: 20 }}>
              {n.note}
            </span>
          </div>
        </div>
        <NotFoundChart label={n.chartLabel} />
      </section>
      <section className="container section">
        <h2 className="h2-sm" style={{ marginBottom: 22 }}>
          {n.nextTitle}
        </h2>
        <nav className={s.linkCards}>
          {n.links.map((l) => (
            <Link key={l.href} href={`${prefix}${localizePath(lang, l.href)}`}>
              <strong>{l.title}</strong>
              <span>{l.text}</span>
            </Link>
          ))}
        </nav>
      </section>
    </>
  );
}
