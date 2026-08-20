import type { MetadataRoute } from "next";
import { publicEntities } from "@/lib/catalog";
import { publicComparisons } from "@/lib/comparisons";
import { legacyPages, categories } from "@/lib/legacy";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const legacyPaths = Object.keys(legacyPages)
    .filter((slug) => slug !== "rankings")
    .map((slug) => `/${slug}`);

  const paths = new Set<string>([
    "/",
    "/agents",
    "/models",
    "/frameworks",
    "/providers",
    "/categories",
    "/compare",
    "/mcp",
    "/mcp/servers",
    "/india",
    "/research",
    "/ai-agent-rankings",
    ...legacyPaths,
    ...categories.map(([slug]) => `/categories/${slug}`),
    ...publicEntities.map((entity) => `/${entity.type}s/${entity.slug}`),
    ...publicComparisons.map((comparison) => `/compare/${comparison.slug}`)
  ]);

  return [...paths].map((path) => ({ url: `${SITE.url}${path}`, lastModified: "2026-08-20" }));
}
