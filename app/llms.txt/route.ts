import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const text = `# BestAIAgent.in

Evidence-first authority graph for AI agents, models, frameworks, providers and MCP infrastructure.

Publication rule: discovery is not verification. Public entity detail pages require qualified evidence; unresolved historical URLs remain noindex or quarantined.

## Core directories
- ${SITE.url}/agents
- ${SITE.url}/models
- ${SITE.url}/frameworks
- ${SITE.url}/providers
- ${SITE.url}/categories
- ${SITE.url}/compare
- ${SITE.url}/india
- ${SITE.url}/mcp

## High-intent authority guides
- ${SITE.url}/best-ai-agent
- ${SITE.url}/cursor-pricing
- ${SITE.url}/github-copilot-pricing
- ${SITE.url}/claude-code-pricing
- ${SITE.url}/what-is-mcp
- ${SITE.url}/best-free-ai-agents
- ${SITE.url}/best-free-ai-coding-agents
- ${SITE.url}/ai-agent-benchmarks
- ${SITE.url}/ai-agent-rankings
- ${SITE.url}/coding-agents-hub
- ${SITE.url}/ai-agent-market-map
- ${SITE.url}/glossary-hub

## Trust and methodology
- ${SITE.url}/methodology
- ${SITE.url}/editorial-policy
- ${SITE.url}/review-process
- ${SITE.url}/corrections

Machine catalog: ${SITE.url}/catalog.json
Full public index: ${SITE.url}/llms-full.txt
`;

  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
