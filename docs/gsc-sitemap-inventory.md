# Google Search Console sitemap inventory

Updated: 2026-08-20
Canonical origin: https://www.bestaiagent.in

## Canonical sitemap surfaces

- https://www.bestaiagent.in/sitemap.xml
- https://www.bestaiagent.in/sitemap-pages.xml
- https://www.bestaiagent.in/sitemap-agents.xml
- https://www.bestaiagent.in/sitemap-categories.xml
- https://www.bestaiagent.in/sitemap-comparisons.xml
- https://www.bestaiagent.in/sitemap-mcp.xml
- https://www.bestaiagent.in/sitemap-research.xml

## Historical GSC sitemap compatibility aliases

These URLs remain fetchable because they were previously submitted to Google Search Console. They are internal rewrites to the current evidence-first sitemap inventory; they do not restore the old low-evidence page corpus.

| Historical submitted URL | Current inventory source |
| --- | --- |
| /blog-sitemap.xml | /sitemap-pages.xml |
| /image-sitemap.xml | /sitemap.xml |
| /free-sitemap.xml | /sitemap-pages.xml |
| /coding-sitemap.xml | /sitemap-agents.xml |
| /research-sitemap.xml | /sitemap-research.xml |
| /reddit-sitemap.xml | /sitemap-pages.xml |
| /industry-sitemap.xml | /sitemap-categories.xml |
| /longtail-sitemap.xml | /sitemap-pages.xml |
| /entity-sitemap.xml | /sitemap.xml |
| /calculators-sitemap.xml | /sitemap-pages.xml |
| /hub-sitemap.xml | /sitemap-pages.xml |
| /author-sitemap.xml | /sitemap-pages.xml |
| /mcp-sitemap.xml | /sitemap-mcp.xml |
| /glossary-sitemap.xml | /sitemap-pages.xml |
| /tutorials-sitemap.xml | /sitemap-pages.xml |
| /alternatives-sitemap.xml | /sitemap-pages.xml |
| /pricing-sitemap.xml | /sitemap-pages.xml |
| /comparison-sitemap.xml | /sitemap-comparisons.xml |
| /tool-sitemap.xml | /sitemap.xml |
| /ai-agent-sitemap.xml | /sitemap-agents.xml |

## Recovery rules

1. Sitemap URLs must return HTTP 200 and XML.
2. Sitemap entries must use the canonical `https://www.bestaiagent.in` origin.
3. Redirecting, 404, noindex, source-linked-only, and unverified detail URLs must not be emitted as indexable sitemap entries.
4. Historical sitemap aliases may contain a reduced qualified inventory; discovered-page counts are expected to fall after removal of unsupported legacy pages.
5. `/best-ai-agent` and `/ai-agent-rankings` are canonical 200 authority pages.
6. `/rankings` permanently redirects to `/ai-agent-rankings`.
7. `/cursor-ai` permanently redirects to the canonical verified entity `/agents/cursor`.
