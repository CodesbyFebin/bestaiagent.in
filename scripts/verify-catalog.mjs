import fs from "node:fs";

const evidenceFiles = ["evidence.ts", "recovery-evidence.ts"];
const evidenceSource = evidenceFiles
  .map((name) => fs.readFileSync(new URL(`../lib/${name}`, import.meta.url), "utf8"))
  .join("\n");

const corpus = [
  "catalog.ts",
  "catalog-types.ts",
  "evidence.ts",
  "entities.ts",
  "legacy-agents.ts",
  "recovery-evidence.ts",
  "recovery-entities.ts"
].map((name) => fs.readFileSync(new URL(`../lib/${name}`, import.meta.url), "utf8")).join("\n");

const hashes = [...evidenceSource.matchAll(/contentHash:\s*"sha256:([0-9a-f]+)"/g)].map((match) => match[1]);
if (!hashes.length) throw new Error("No evidence hashes found");
const bad = hashes.filter((hash) => hash.length !== 64);
if (bad.length) throw new Error(`Invalid SHA-256 hashes: ${bad.join(",")}`);

for (const forbidden of ["1,250+", "450+ Independent Reviews", "9.7/10", "100% Verified"]) {
  if (corpus.includes(forbidden)) throw new Error(`Forbidden synthetic authority claim found: ${forbidden}`);
}

console.log(`catalog verification PASS: ${hashes.length} evidence hashes, all SHA-256 shaped`);
