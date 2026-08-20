import type { EvidenceRecord } from "@/lib/catalog-types";

export const recoveryEvidence: EvidenceRecord[] = [
  {
    id: "ev-cursor",
    entityId: "cursor",
    field: "product-identity",
    sourceUrl: "https://cursor.com/docs",
    sourceType: "official-documentation",
    publisher: "Cursor",
    authority: "primary",
    retrievedAt: "2026-08-20T13:50:00Z",
    contentHash: "sha256:d7af7be04cdd3c577707a4809c402dd198791bab8382ec35038a62719f17d0d6",
    snapshot: {
      developer: "Cursor",
      name: "Cursor",
      productType: "coding agent",
      sourceUrl: "https://cursor.com/docs"
    },
    status: "verified"
  }
];
