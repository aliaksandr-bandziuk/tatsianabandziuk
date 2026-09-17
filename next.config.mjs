/** @type {import('next').NextConfig} */

// One-off redirects go here: { source: '/old', destination: '/new', permanent: true }.
// EN has no locale prefix; PL and RU are prefixed (/pl/..., /ru/...).
const STATIC_REDIRECTS = [];

const nextConfig = {
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

  // Closed to search engines until SITE_INDEXING=on (see src/lib/site.ts).
  async headers() {
    if (process.env.SITE_INDEXING === "on") return [];
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
