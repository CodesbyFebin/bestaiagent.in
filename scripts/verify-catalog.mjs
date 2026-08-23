import crypto from "node:crypto";
import fs from "node:fs";

const evidenceFiles = ["evidence.ts", "recovery-evidence.ts"];
const evidenceSource = evidenceFiles
  .map((name) => fs.readFileSync(new URL(`../lib/${name}`, import.meta.url), "utf8"))
  .join("\n");

const authorityEvidence = JSON.parse(fs.readFileSync(new URL("../data/authority-evidence.json", import.meta.url), "utf8"));
const authorityPagesSource = fs.readFileSync(new URL("../lib/authority-pages.ts", import.meta.url), "utf8");

const corpus = [
  "catalog.ts",
  "catalog-types.ts",
  "evidence.ts",
  "entities.ts",
  "legacy-agents.ts",
  "recovery-evidence.ts",
  "recovery-entities.ts",
  "authority-pages.ts"
].map((name) => fs.readFileSync(new URL(`../lib/${name}`, import.meta.url), "utf8")).join("\n");

const hashes = [...evidenceSource.matchAll(/contentHash:\s*"sha256:([0-9a-f]+)"/g)].map((match) => match[1]);
if (!hashes.length) throw new Error("No entity evidence hashes found");
const bad = hashes.filter((hash) => hash.length !== 64);
if (bad.length) throw new Error(`Invalid entity SHA-256 hashes: ${bad.join(",")}`);

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

const authorityIds = new Set();
for (const record of authorityEvidence) {
  if (authorityIds.has(record.id)) throw new Error(`Duplicate authority evidence id: ${record.id}`);
  authorityIds.add(record.id);

  if (!/^sha256:[0-9a-f]{64}$/.test(record.contentHash)) {
    throw new Error(`Malformed authority evidence hash: ${record.id}`);
  }

  const hashInput = {
    sourceUrl: record.sourceUrl,
    retrievedAt: record.retrievedAt,
    facts: record.snapshot
  };
  const computed = `sha256:${crypto.createHash("sha256").update(stableStringify(hashInput)).digest("hex")}`;
  if (computed !== record.contentHash) {
    throw new Error(`Authority evidence hash mismatch for ${record.id}: expected ${record.contentHash}, computed ${computed}`);
  }
}

const referencedAuthorityEvidence = [...authorityPagesSource.matchAll(/"(ev-page-[a-z0-9-]+)"/g)].map((match) => match[1]);
for (const evidenceId of referencedAuthorityEvidence) {
  if (!authorityIds.has(evidenceId)) throw new Error(`Authority page references unknown evidence: ${evidenceId}`);
}
for (const evidenceId of authorityIds) {
  if (!referencedAuthorityEvidence.includes(evidenceId)) throw new Error(`Authority evidence is orphaned: ${evidenceId}`);
}

for (const forbidden of ["1,250+", "450+ Independent Reviews", "9.7/10", "100% Verified"]) {
  if (corpus.includes(forbidden)) throw new Error(`Forbidden synthetic authority claim found: ${forbidden}`);
}

console.log(`catalog verification PASS: ${hashes.length} entity evidence hashes + ${authorityEvidence.length} recomputed authority evidence hashes`);
