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
      { source: "/agents/autogen", destination: "/frameworks/autogen", permanent: true }
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
