import type { Entity, EntityType, EvidenceRecord } from "@/lib/catalog-types";
import { evidence as baseEvidence } from "@/lib/evidence";
import { entities as baseEntities } from "@/lib/entities";
import { legacyAgentSources } from "@/lib/legacy-agents";
import { recoveryEntities } from "@/lib/recovery-entities";
import { recoveryEvidence } from "@/lib/recovery-evidence";

export type { Entity, EntityType, EvidenceRecord, EvidenceAuthority, VerificationState } from "@/lib/catalog-types";
export { legacyAgentSources } from "@/lib/legacy-agents";

export const evidence: EvidenceRecord[] = [...baseEvidence, ...recoveryEvidence];
export const entities: Entity[] = [...baseEntities, ...recoveryEntities];

export const getEvidence = (entityId: string) => evidence.filter((item) => item.entityId === entityId);
export const isValidHash = (hash: string) => /^sha256:[0-9a-f]{64}$/.test(hash);
export const isEvidenceVerified = (item: EvidenceRecord) =>
  item.status === "verified" &&
  item.authority === "primary" &&
  Boolean(item.retrievedAt) &&
  isValidHash(item.contentHash);

export const isEntityIndexable = (entity: Entity) =>
  entity.verification === "verified" &&
  entity.evidenceIds.some((id) => {
    const item = evidence.find((candidate) => candidate.id === id);
    return item ? isEvidenceVerified(item) : false;
  });

export const publicEntities = entities.filter(isEntityIndexable);
export const entitiesByType = (type: EntityType) => publicEntities.filter((entity) => entity.type === type);
export const getEntity = (type: EntityType, slug: string) =>
  entities.find((entity) => entity.type === type && entity.slug === slug) ?? null;
export const getPublicEntity = (type: EntityType, slug: string) =>
  publicEntities.find((entity) => entity.type === type && entity.slug === slug) ?? null;
