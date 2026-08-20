import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/mcp-directory", destination: "/mcp", permanent: true },
      { source: "/mcp-servers", destination: "/mcp", permanent: true },
      { source: "/best-ai-agent-frameworks", destination: "/frameworks", permanent: true },
      { source: "/agents/crewai", destination: "/frameworks/crewai", permanent: true },
      { source: "/agents/langgraph", destination: "/frameworks/langgraph", permanent: true },
      { source: "/agents/autogen", destination: "/frameworks/autogen", permanent: true },
      { source: "/rankings", destination: "/ai-agent-rankings", permanent: true },
      { source: "/cursor-ai", destination: "/agents/cursor", permanent: true },
      // Legacy /tools/* URLs from the previous site build — preserve Search-equity
      // by redirecting to the canonical framework or agent entity rather than 404.
      // The analysis only proved value on the entries listed below; speculative
      // /tools/* redirects for unverified products are intentionally NOT added.
      { source: "/tools/cursor", destination: "/agents/cursor", permanent: true },
      { source: "/tools/cursor-ai", destination: "/agents/cursor", permanent: true },
      { source: "/tools/crewai", destination: "/frameworks/crewai", permanent: true },
      { source: "/tools/langgraph", destination: "/frameworks/langgraph", permanent: true },
      { source: "/tools/autogen", destination: "/frameworks/autogen", permanent: true },
      { source: "/tools/langchain", destination: "/frameworks/langchain", permanent: true },
      { source: "/tools/microsoft-agent-framework", destination: "/frameworks/microsoft-agent-framework", permanent: true },
      // Comparison canonical direction — consolidate reordered/inverse duplicates
      // onto the single canonical slug already present in lib/comparisons.ts.
      // The canonical direction is alphabetical-ish (a-vs-b), so reverse
      // pairings 301 to the published comparison route.
      { source: "/compare/autogen-vs-crewai", destination: "/compare/crewai-vs-autogen", permanent: true },
      { source: "/compare/crewai-vs-langgraph", destination: "/compare/langgraph-vs-crewai", permanent: true },
      { source: "/compare/langchain-vs-langgraph", destination: "/compare/langgraph-vs-langchain", permanent: true },
      // Hub consolidations — historical hub URLs that already have a canonical
      // equivalent under /categories or /mcp/servers. Redirect rather than
      // create duplicate content.
      { source: "/coding-agents-hub", destination: "/categories/coding-agents", permanent: true },
      { source: "/coding-agents-hub/", destination: "/categories/coding-agents", permanent: true },
      { source: "/best-mcp-servers", destination: "/mcp/servers", permanent: true }
    ];
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
