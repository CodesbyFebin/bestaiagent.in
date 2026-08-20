export const SITE = {
  name: "BestAIAgent.in",
  url: "https://www.bestaiagent.in",
  description: "Evidence-first authority graph for AI agents, models, frameworks, providers and MCP infrastructure."
} as const;

export function absolute(path: string) {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
