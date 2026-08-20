# BestAIAgent.in

Evidence-first authority graph for AI agents, models, frameworks, providers and MCP infrastructure.

## Production

- Canonical domain: `https://bestaiagent.in`
- WWW: `https://www.bestaiagent.in`
- Vercel project: `bestaiagent-clean-preview`
- Production repository: `CodesbyFebin/bestaiagent.in`

## Architecture

Next.js App Router is the sole production runtime. Public pages are server-rendered/static-capable and consume one catalog/evidence model.

```text
primary sources
  → normalized evidence snapshots
  → SHA-256 + retrieval metadata
  → entity publication gate
  → HTML / API / JSON / sitemap / llms.txt
```

The clean merge intentionally excludes synthetic rankings, fake review counts, unverifiable benchmark datasets, mass-generated `agent-N.html` pages, and quarantined legacy manifests.

## Commands

```bash
npm install
npm run verify:catalog
npm run typecheck
npm run lint
npm run build
npm start
```

## Public machine surfaces

- `/api/health`
- `/api/search?q=`
- `/api/catalog`
- `/catalog.json`
- `/agents.json`
- `/models.json`
- `/providers.json`
- `/frameworks.json`
- `/llms.txt`
- `/llms-full.txt`
- `/robots.txt`
- `/sitemap.xml`
- legacy child sitemaps

## Publication doctrine

Unknown stays unknown. A verified identity does not automatically verify pricing, capabilities, compliance, benchmark performance, India billing, data residency, or licensing. Those require field-specific evidence.
