import { authorityPages } from "@/lib/authority-pages";
import { getAuthorityEvidence } from "@/lib/authority-evidence";
import { publicEntities } from "@/lib/catalog";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const entityLines = publicEntities.map((entity) =>
    `- ${entity.name} (${entity.type}) — ${SITE.url}/${entity.type}s/${entity.slug} — source: ${entity.sourceUrl}`
  );

  const authorityLines = Object.entries(authorityPages)
    .filter(([, page]) => page.index)
    .map(([slug, page]) => {
      const sources = getAuthorityEvidence(slug).map((record) => record.sourceUrl);
      return `- ${page.title} (authority page) — ${SITE.url}/${slug} — reviewed: ${page.lastReviewed}${sources.length ? ` — sources: ${sources.join(", ")}` : ""}`;
    });

  const lines = [
    "# BestAIAgent.in — full public authority index",
    "",
    "Public entity detail pages below pass the entity publication gate. Authority guides are separately reviewed and may include dated page-level evidence receipts.",
    "",
    "## Verified entities",
    ...entityLines,
    "",
    "## Authority guides",
    ...authorityLines
  ];

  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
