export type EntityType = "agent" | "model" | "framework" | "provider";
export type VerificationState = "verified" | "source-linked" | "pending" | "unknown";
export type EvidenceAuthority = "primary" | "secondary";

export type EvidenceRecord = {
  id: string;
  entityId: string;
  field: string;
  sourceUrl: string;
  sourceType: "official-repository-api" | "official-model-card" | "official-documentation" | "official-site";
  publisher: string;
  authority: EvidenceAuthority;
  retrievedAt: string;
  contentHash: `sha256:${string}`;
  snapshot: Record<string, unknown>;
  status: "verified" | "pending" | "stale" | "rejected";
};

export type Entity = {
  id: string;
  type: EntityType;
  slug: string;
  name: string;
  developer: string;
  summary: string;
  summaryKind: "editorial" | "source-derived";
  sourceUrl: string;
  sourceLabel: string;
  categories: string[];
  indiaRelevance?: string;
  local?: boolean;
  verification: VerificationState;
  evidenceIds: string[];
  facts?: Record<string, string | number | boolean | string[] | null>;
};

