import { authorityPages } from "@/lib/authority-pages";
import { publicEntities } from "@/lib/catalog";

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q")?.trim().toLowerCase() ?? "";
  if (!q) return Response.json({ query: q, count: 0, results: [] });

  const entityResults = publicEntities
    .filter((entity) => `${entity.name} ${entity.developer} ${entity.summary} ${entity.categories.join(" ")}`.toLowerCase().includes(q))
    .map((entity) => ({
      id: entity.id,
      name: entity.name,
      type: entity.type,
      slug: entity.slug,
      summary: entity.summary,
      verification: entity.verification,
      url: `/${entity.type}s/${entity.slug}`
    }));

  const authorityResults = Object.entries(authorityPages)
    .filter(([, page]) => page.index)
    .filter(([slug, page]) => {
      const sectionText = page.sections.flatMap((section) => [section.heading, ...(section.paragraphs ?? []), ...(section.bullets ?? [])]).join(" ");
      return `${slug} ${page.title} ${page.description} ${page.directAnswer} ${sectionText}`.toLowerCase().includes(q);
    })
    .map(([slug, page]) => ({
      id: `authority:${slug}`,
      name: page.title,
      type: "guide",
      slug,
      summary: page.directAnswer,
      verification: page.evidenceIds?.length ? "evidence-backed" : "editorial-methodology",
      url: `/${slug}`
    }));

  const results = [...entityResults, ...authorityResults].slice(0, 50);
  return Response.json({ query: q, count: results.length, results });
}
