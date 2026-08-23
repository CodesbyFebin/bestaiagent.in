import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const inventoryPath = path.join(root, "data/candidate-inventory-meta.json");
const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
const errors = [];

const assert = (condition, message) => {
  if (!condition) errors.push(message);
};

assert(inventory.pillarCount === 50, "candidate inventory must preserve 50 donor pillars");
assert(inventory.clusterCount === 2500, "candidate inventory must preserve 2,500 quarantined clusters");
assert(inventory.candidateRecords === 2550, "candidate inventory record count must be 2,550");
assert(/^([a-f0-9]{64})$/.test(inventory.sourceSha256), "candidate inventory source SHA-256 is malformed");
assert(inventory.sourceSha256 === "39c50788e35c63d170ba3ed34c50cdfbbf198ea051f7920eaac97ff1e61fab74", "candidate inventory source hash changed without review");
assert(inventory.pillars.length === 50, "candidate inventory pillar metadata is incomplete");
assert(inventory.pillars.every((pillar) => pillar.clusterCount === 50), "every donor pillar should retain 50 candidate clusters in metadata");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return full;
  });
}

for (const dirName of ["app", "lib", "components"]) {
  const dir = path.join(root, dirName);
  for (const file of walk(dir).filter((file) => /\.(ts|tsx|js|mjs)$/.test(file))) {
    const source = fs.readFileSync(file, "utf8");
    if (source.includes("candidate-inventory-meta")) {
      errors.push(`runtime source must not import quarantined candidate inventory: ${path.relative(root, file)}`);
    }
  }
}

for (const publicSurface of [
  "app/sitemap.ts",
  "app/sitemap-pages.xml/route.ts",
  "app/llms.txt/route.ts",
  "app/llms-full.txt/route.ts",
  "app/api/catalog/route.ts",
  "app/catalog.json/route.ts"
]) {
  const source = fs.readFileSync(path.join(root, publicSurface), "utf8");
  assert(!source.includes("candidate-inventory-meta"), `public surface must not consume candidate inventory: ${publicSurface}`);
}

if (errors.length) {
  console.error(`candidate quarantine verification failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("candidate quarantine verification passed");
console.log(`- donor pillars preserved: ${inventory.pillarCount}`);
console.log(`- donor cluster candidates preserved: ${inventory.clusterCount}`);
console.log("- runtime publication imports: 0");
