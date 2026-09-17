import { MetadataRoute } from "next";
import { INDEXING_ALLOWED, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Closed until launch: every crawler is turned away.
  if (!INDEXING_ALLOWED) {
    return { rules: [{ userAgent: "*", disallow: ["/"] }] };
  }
  return {
    rules: [
      // SEO-tool crawlers: no visitors, no search or AI visibility, only
      // hosting usage. Search engines, AI crawlers (GPTBot, OAI-SearchBot,
      // ClaudeBot, PerplexityBot, Google-Extended…) and link-preview bots
      // stay allowed on purpose.
      {
        userAgent: [
          "AhrefsBot", "SemrushBot", "MJ12bot", "DotBot", "BLEXBot",
          "DataForSeoBot", "serpstatbot", "Barkrowler", "SeekportBot",
          "MegaIndex.ru", "PetalBot", "Bytespider", "ImagesiftBot",
        ],
        disallow: ["/"],
      },
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/admin", "/api", "/*?utm", "/*?gclid", "/*?gbraid"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
