import type { MetadataRoute } from "next";
import { publicEntities } from "@/lib/catalog";
import { publicComparisons } from "@/lib/comparisons";
import { authorityPages } from "@/lib/authority-pages";
import { legacyPages, categories } from "@/lib/legacy";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const legacyPaths = Object.entries(legacyPages)
    .filter(([slug, page]) => page.index && slug !== "rankings")
    .map(([slug]) => `/${slug}`);

  const authorityPaths = Object.entries(authorityPages)
    .filter(([, page]) => page.index)
    .map(([slug]) => `/${slug}`);

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
    ...legacyPaths,
    ...authorityPaths,
    ...categories.map(([slug]) => `/categories/${slug}`),
    ...publicEntities.map((entity) => `/${entity.type}s/${entity.slug}`),
    ...publicComparisons.map((comparison) => `/compare/${comparison.slug}`)
  ]);

  return [...paths].map((path) => ({ url: `${SITE.url}${path}`, lastModified: "2026-08-23" }));
}
