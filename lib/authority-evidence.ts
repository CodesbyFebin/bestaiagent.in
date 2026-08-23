import records from "@/data/authority-evidence.json";

export type AuthorityEvidenceRecord = {
  id: string;
  pageSlug: string;
  field: string;
  sourceUrl: string;
  publisher: string;
  retrievedAt: string;
  contentHash: `sha256:${string}`;
  status: "verified" | "stale";
  snapshot: Record<string, unknown>;
};

export const authorityEvidence = records as AuthorityEvidenceRecord[];

export function getAuthorityEvidence(pageSlug: string) {
  return authorityEvidence.filter((record) => record.pageSlug === pageSlug);
}
