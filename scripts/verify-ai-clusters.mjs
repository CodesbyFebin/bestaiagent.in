import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const file = path.join(process.cwd(), "lib", "ai-topic-clusters.ts");
const source = fs.readFileSync(file, "utf8");
const rowPattern = /\{ id:(\d+),bucket:"(coding|business|content|research|india)",name:"([^"]+)",primaryQuery:"([^"]+)",secondaryQuery:"([^"]+)",canonicalTarget:"([^"]+)",claimSensitive:(true|false) \}/g;
const rows = [...source.matchAll(rowPattern)].map((match) => ({
  id: Number(match[1]),
  bucket: match[2],
  name: match[3],
  primary: match[4],
  secondary: match[5],
  target: match[6],
  claimSensitive: match[7] === "true"
}));

const fail = (message) => {
  console.error(`AI cluster verification FAILED: ${message}`);
  process.exit(1);
};

if (rows.length !== 50) fail(`expected 50 clusters, found ${rows.length}`);
const ids = rows.map((row) => row.id);
for (let id = 1; id <= 50; id += 1) {
  if (!ids.includes(id)) fail(`missing cluster id ${id}`);
}
if (new Set(ids).size !== 50) fail("cluster ids are not unique");

const terms = rows.flatMap((row) => [row.primary, row.secondary]);
if (terms.length !== 100) fail(`expected 100 search terms, found ${terms.length}`);
if (new Set(terms.map((term) => term.toLowerCase())).size !== 100) fail("search terms are not unique");

const counts = new Map();
for (const row of rows) counts.set(row.bucket, (counts.get(row.bucket) ?? 0) + 1);
for (const bucket of ["coding", "business", "content", "research", "india"]) {
  if (counts.get(bucket) !== 10) fail(`${bucket} bucket must contain exactly 10 clusters`);
}

for (const row of rows) {
  if (!row.target.startsWith("/")) fail(`cluster ${row.id} has a non-canonical target`);
}

const sensitiveIndia = rows.filter((row) => row.bucket === "india" && row.claimSensitive).length;
if (sensitiveIndia < 7) fail("India/MCP bucket must keep material commercial/compliance/deployment intents claim-sensitive");

console.log("AI topic cluster verification passed");
console.log(`- clusters: ${rows.length}`);
console.log(`- search terms: ${terms.length}`);
console.log(`- buckets: ${counts.size}`);
console.log(`- claim-sensitive India/MCP clusters: ${sensitiveIndia}`);
