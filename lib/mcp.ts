export const mcpServers = [
  { slug: "github", name: "GitHub MCP", sourceUrl: "https://github.com/github/github-mcp-server", status: "source-linked", note: "Canonical source should be verified before feature-level publication." },
  { slug: "postgres", name: "PostgreSQL MCP", sourceUrl: "https://github.com/modelcontextprotocol/servers", status: "refreshing", note: "Legacy route preserved; current maintained upstream needs verification." },
  { slug: "slack", name: "Slack MCP", sourceUrl: "https://github.com/modelcontextprotocol/servers", status: "refreshing", note: "Legacy route preserved; current maintained upstream needs verification." },
  { slug: "filesystem", name: "Filesystem MCP", sourceUrl: "https://github.com/modelcontextprotocol/servers", status: "source-linked", note: "Reference-server lineage; verify current package/source before deployment." },
  { slug: "notion", name: "Notion MCP", sourceUrl: "https://github.com/makenotion/notion-mcp-server", status: "source-linked", note: "First-party repository link retained; capabilities should be read from upstream." },
  { slug: "excel", name: "Excel MCP", sourceUrl: "https://github.com/modelcontextprotocol/servers", status: "refreshing", note: "Legacy URL retained while a canonical upstream is verified." },
  { slug: "shopify", name: "Shopify MCP", sourceUrl: "https://shopify.dev/", status: "refreshing", note: "Legacy URL retained while an official MCP source is verified." }
] as const;

export const mcpClusters = [
  ["Core protocol", "Clients, servers, tools, resources, prompts, transports and authorization."],
  ["Server directory", "Source-linked MCP implementations with canonical upstreams."],
  ["Agent frameworks", "How frameworks expose or consume MCP without treating MCP as a framework replacement."],
  ["Local LLMs", "MCP with local inference, with performance claims held until reproducible benchmarks exist."],
  ["India", "Sovereignty, Indic-language workflows and DPDP-aware architecture without automatic compliance claims."]
] as const;
