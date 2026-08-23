import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
const readText = (file) => fs.readFileSync(path.join(root, file), "utf8");

const redirects = readJson("data/legacy-redirects.json");
const policy = readJson("data/gsc-migration-policy.json");
const authoritySource = readText("lib/authority-pages.ts");
const nextConfig = readText("next.config.ts");

const errors = [];
const assert = (condition, message) => {
  if (!condition) errors.push(message);
};

const sourcePaths = Object.keys(redirects);
const sourceSet = new Set(sourcePaths);

for (const [source, destination] of Object.entries(redirects)) {
  assert(source.startsWith("/"), `redirect source must be root-relative: ${source}`);
  assert(destination.startsWith("/"), `redirect destination must be root-relative: ${source} -> ${destination}`);
  assert(source !== destination, `self redirect: ${source}`);
  assert(!sourceSet.has(destination), `redirect chain detected: ${source} -> ${destination} -> ${redirects[destination]}`);
}

assert(policy.inputs.performancePageRows === 300, "GSC performance page row baseline changed");
assert(policy.inputs.crawledCurrentlyNotIndexedRows === 36, "GSC crawled-not-indexed row baseline changed");
assert(policy.inputs.soft404Rows === 83, "GSC Soft 404 row baseline changed");
assert(policy.inputs.duplicateCanonicalRows === 39, "GSC duplicate-canonical row baseline changed");
assert(policy.inputs.rawObservedUrlCount === 457, "GSC raw observed URL baseline must remain 457 for the 2026-08-20 export bundle");
assert(policy.inputs.normalizedPathCount === 450, "GSC normalized path baseline must remain 450 for the 2026-08-20 export bundle");
assert(/^([a-f0-9]{64})$/.test(policy.inputs.rawObservedUrlSetSha256), "raw URL-set SHA-256 is malformed");
assert(/^([a-f0-9]{64})$/.test(policy.inputs.normalizedPathSetSha256), "normalized path-set SHA-256 is malformed");

const triageTotal = Object.values(policy.initialTriage).reduce((sum, value) => sum + Number(value), 0);
assert(triageTotal === policy.inputs.normalizedPathCount, `initial triage count ${triageTotal} does not match normalized path count ${policy.inputs.normalizedPathCount}`);
assert(policy.defaultDisposition === "QUARANTINE", "unclassified historical URLs must fail closed to QUARANTINE");

for (const route of policy.implementedAuthorityPages) {
  const slug = route.replace(/^\//, "");
  assert(!sourceSet.has(route), `authority page cannot also be a redirect source: ${route}`);
  assert(authoritySource.includes(`\"${slug}\": {`), `implemented authority page missing from lib/authority-pages.ts: ${route}`);
}

const criticalLegacyRoutes = [
  "/cursor-pricing",
  "/github-copilot-pricing",
  "/claude-code-pricing",
  "/tools/crewai",
  "/tools/flowise",
  "/tools/cursor-ai",
  "/tools/yellow-ai",
  "/tools/vapi-ai",
  "/what-is-mcp",
  "/best-free-ai-agents",
  "/ai-agent-benchmarks",
  "/coding-agents-hub",
  "/ai-agent-market-map",
  "/best-mcp-servers",
  "/glossary-hub"
];

for (const route of criticalLegacyRoutes) {
  const inAuthority = policy.implementedAuthorityPages.includes(route);
  const inRedirects = Object.hasOwn(redirects, route);
  assert(inAuthority || inRedirects, `critical historical route has no protected disposition: ${route}`);
}

const historicalSitemaps = [
  "/blog-sitemap.xml",
  "/image-sitemap.xml",
  "/free-sitemap.xml",
  "/coding-sitemap.xml",
  "/research-sitemap.xml",
  "/reddit-sitemap.xml",
  "/industry-sitemap.xml",
  "/longtail-sitemap.xml",
  "/entity-sitemap.xml",
  "/calculators-sitemap.xml",
  "/hub-sitemap.xml",
  "/author-sitemap.xml",
  "/mcp-sitemap.xml",
  "/glossary-sitemap.xml",
  "/tutorials-sitemap.xml",
  "/alternatives-sitemap.xml",
  "/pricing-sitemap.xml",
  "/comparison-sitemap.xml",
  "/tool-sitemap.xml",
  "/ai-agent-sitemap.xml"
];

for (const sitemap of historicalSitemaps) {
  assert(nextConfig.includes(`source: \"${sitemap}\"`), `historical sitemap compatibility rewrite missing: ${sitemap}`);
}

assert(nextConfig.includes('import legacyRedirects from "./data/legacy-redirects.json"'), "next.config.ts must consume the canonical redirect registry");

if (errors.length) {
  console.error(`GSC migration verification failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("GSC migration verification passed");
console.log(`- historical raw URLs: ${policy.inputs.rawObservedUrlCount}`);
console.log(`- normalized paths: ${policy.inputs.normalizedPathCount}`);
console.log(`- permanent redirect rules: ${sourcePaths.length}`);
console.log(`- implemented authority pages: ${policy.implementedAuthorityPages.length}`);
console.log(`- historical sitemap aliases: ${historicalSitemaps.length}`);
console.log(`- default disposition: ${policy.defaultDisposition}`);
