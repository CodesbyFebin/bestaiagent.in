import type { NextConfig } from "next";
import legacyRedirects from "./data/legacy-redirects.json";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return Object.entries(legacyRedirects).map(([source, destination]) => ({
      source,
      destination,
      permanent: true
    }));
  },
  async rewrites() {
    return [
      { source: "/blog-sitemap.xml", destination: "/sitemap-pages.xml" },
      { source: "/image-sitemap.xml", destination: "/sitemap.xml" },
      { source: "/free-sitemap.xml", destination: "/sitemap-pages.xml" },
      { source: "/coding-sitemap.xml", destination: "/sitemap-agents.xml" },
      { source: "/research-sitemap.xml", destination: "/sitemap-research.xml" },
      { source: "/reddit-sitemap.xml", destination: "/sitemap-pages.xml" },
      { source: "/industry-sitemap.xml", destination: "/sitemap-categories.xml" },
      { source: "/longtail-sitemap.xml", destination: "/sitemap-pages.xml" },
      { source: "/entity-sitemap.xml", destination: "/sitemap.xml" },
      { source: "/calculators-sitemap.xml", destination: "/sitemap-pages.xml" },
      { source: "/hub-sitemap.xml", destination: "/sitemap-pages.xml" },
      { source: "/author-sitemap.xml", destination: "/sitemap-pages.xml" },
      { source: "/mcp-sitemap.xml", destination: "/sitemap-mcp.xml" },
      { source: "/glossary-sitemap.xml", destination: "/sitemap-pages.xml" },
      { source: "/tutorials-sitemap.xml", destination: "/sitemap-pages.xml" },
      { source: "/alternatives-sitemap.xml", destination: "/sitemap-pages.xml" },
      { source: "/pricing-sitemap.xml", destination: "/sitemap-pages.xml" },
      { source: "/comparison-sitemap.xml", destination: "/sitemap-comparisons.xml" },
      { source: "/tool-sitemap.xml", destination: "/sitemap.xml" },
      { source: "/ai-agent-sitemap.xml", destination: "/sitemap-agents.xml" }
    ];
  },
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        { key: "X-Frame-Options", value: "DENY" }
      ]
    }];
  }
};

export default nextConfig;
