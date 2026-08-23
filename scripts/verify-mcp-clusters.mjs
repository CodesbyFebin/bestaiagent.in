import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const file = path.join(process.cwd(), "lib", "mcp-topic-clusters.ts");
const source = fs.readFileSync(file, "utf8");
const rowPattern = /^\s+\[(\d+),"(commercial|india|agents|integrations|troubleshooting)","([^"]+)","([^"]+)","([^"]+)"\],?$/gm;
const rows = [...source.matchAll(rowPattern)].map((match) => ({
  id: Number(match[1]),
  bucket: match[2],
  name: match[3],
  primary: match[4],
  secondary: match[5]
}));

const fail = (message) => {
  console.error(`MCP cluster verification FAILED: ${message}`);
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
for (const bucket of ["commercial", "india", "agents", "integrations", "troubleshooting"]) {
  if (counts.get(bucket) !== 10) fail(`${bucket} bucket must contain exactly 10 clusters`);
}

if (!source.includes('id === 41 ? "editorial-gap-fill" : "user-matrix"')) {
  fail("cluster 41 editorial gap-fill provenance is not explicit");
}

console.log("MCP cluster verification passed");
console.log(`- clusters: ${rows.length}`);
console.log(`- search terms: ${terms.length}`);
console.log(`- buckets: ${counts.size}`);
console.log("- source gap 41: explicitly marked editorial-gap-fill");
