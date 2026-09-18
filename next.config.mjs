/** @type {import('next').NextConfig} */

// One-off redirects go here: { source: '/old', destination: '/new', permanent: true }.
// EN has no locale prefix; PL and RU are prefixed (/pl/..., /ru/...).
const STATIC_REDIRECTS = [];

const nextConfig = {
  // The free templates are emailed as attachments, so the route needs the files at runtime.
  outputFileTracingIncludes: { "/api/email": ["./templates/**/*"] },

  // Next still ships polyfills for features every supported browser has; swap
  // the module for an empty one (see src/lib/empty-polyfills.js).
  turbopack: {
    resolveAlias: {
      // next/dist/client/app-globals.js requires it by this relative path.
      "../build/polyfills/polyfill-module": "./src/lib/empty-polyfills.js",
      "next/dist/build/polyfills/polyfill-module": "./src/lib/empty-polyfills.js",
    },
  },

  images: {
    // Sanity's image CDN resizes and re-encodes instead of Vercel's
    // /_next/image optimizer, so Vercel's transformation quota is not spent.
    loader: "custom",
    loaderFile: "./src/lib/images/sanityLoader.ts",
    minimumCacheTTL: 86400,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "**", port: "" },
    ],
  },

  // Same rule as INDEXING_ALLOWED in src/lib/site.ts: open on Vercel production, closed elsewhere.
  async headers() {
    const open =
      process.env.SITE_INDEXING === "on" || (process.env.SITE_INDEXING !== "off" && process.env.VERCEL_ENV === "production");
    if (open) return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noimageindex" }] }];
  },

  async redirects() {
    return STATIC_REDIRECTS;
  },

  async rewrites() {
    return [{ source: "/sitemap.xml", destination: "/api/sitemap" }];
  },
};

export default nextConfig;
