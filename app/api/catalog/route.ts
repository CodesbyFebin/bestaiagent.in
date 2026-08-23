import migrationPolicy from "@/data/gsc-migration-policy.json";
import { authorityEvidence } from "@/lib/authority-evidence";
import { authorityPages } from "@/lib/authority-pages";
import { evidence, publicEntities } from "@/lib/catalog";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const guides = Object.entries(authorityPages)
    .filter(([, page]) => page.index)
    .map(([slug, page]) => ({
      slug,
      url: `${SITE.url}/${slug}`,
      title: page.title,
      description: page.description,
      directAnswer: page.directAnswer,
      lastReviewed: page.lastReviewed,
      evidenceIds: page.evidenceIds ?? []
    }));

  return Response.json({
    schemaVersion: "2.1",
    generatedAt: "2026-08-23",
    canonicalOrigin: SITE.url,
    entities: publicEntities,
    evidence,
    guides,
    authorityEvidence,
    migration: {
      sourceDate: migrationPolicy.sourceDate,
      rawObservedUrlCount: migrationPolicy.inputs.rawObservedUrlCount,
      normalizedPathCount: migrationPolicy.inputs.normalizedPathCount,
      defaultDisposition: migrationPolicy.defaultDisposition
    }
  });
}
