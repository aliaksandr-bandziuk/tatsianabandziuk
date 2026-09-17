"use client";

import { useState } from "react";
import s from "./video.module.scss";

type Props = { youtubeId: string; title: string; playLabel: string; transcriptLabel: string; transcript?: string[] };

/**
 * Lite YouTube embed: only a thumbnail until the visitor clicks, then an
 * iframe from youtube-nocookie.com. No YouTube request before the click.
 */
export default function VideoEmbed({ youtubeId, title, playLabel, transcriptLabel, transcript }: Props) {
  const [active, setActive] = useState(false);
  const id = encodeURIComponent(youtubeId);
  return (
    <figure className={s.video}>
      <div className={s.frame}>
        {active ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            className={s.poster}
            style={{ backgroundImage: `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)` }}
            onClick={() => setActive(true)}
            aria-label={`${playLabel}: ${title}`}
          >
            <span className={s.play} aria-hidden="true" />
          </button>
        )}
      </div>
      <figcaption className={s.caption}>{title}</figcaption>
      {transcript && transcript.length > 0 && (
        <details className={s.transcript}>
          <summary>{transcriptLabel}</summary>
          {transcript.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </details>
      )}
    </figure>
  );
}
