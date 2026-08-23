export type McpIntentBucket = "commercial" | "india" | "agents" | "integrations" | "troubleshooting";

export type McpTopicCluster = {
  id: number;
  bucket: McpIntentBucket;
  name: string;
  primaryQuery: string;
  secondaryQuery: string;
  canonicalTarget: string;
  source: "user-matrix" | "editorial-gap-fill";
  claimSensitive: boolean;
};

export const mcpBucketMeta: Record<McpIntentBucket, { title: string; description: string }> = {
  commercial: { title: "Commercial selection intent", description: "Selection, open-source, coding, enterprise, local, remote, database, filesystem, API and verification intents." },
  india: { title: "India & localized intent", description: "India-specific pricing, deployment, language, DPDP/data-residency and developer intent. Search phrases are not treated as compliance or payment-support facts." },
  agents: { title: "Agent + MCP implementation intent", description: "How agents consume MCP, orchestrate multiple servers, use stdio or Streamable HTTP, debug integrations and build custom servers." },
  integrations: { title: "Tool-specific integration intent", description: "Navigation and integration intent for developer tools, work platforms, databases, containers, cloud storage and scraping." },
  troubleshooting: { title: "Troubleshooting & AEO intent", description: "Architecture and failure-mode questions for transports, sessions, authentication, permissions, installation and disconnects." }
};

const rows = [
  [1,"commercial","Best MCP Server Overall","best MCP server for AI agents 2026","top best MCP server evidence-backed directory"],
  [2,"commercial","Best Open-Source MCP","best open source MCP server github","top best MCP server with transparent repository"],
  [3,"commercial","Best MCP for Coding","best MCP server for coding agents","top best MCP server for developers"],
  [4,"commercial","Best Enterprise MCP","best enterprise MCP server scalable","top best MCP server for business workflows"],
  [5,"commercial","Best Local/Privacy MCP","best local MCP server for privacy","top best MCP server for offline development"],
  [6,"commercial","Best Cloud/Remote MCP","best cloud hosted MCP server","top best MCP server streamable HTTP remote"],
  [7,"commercial","Best Database MCP","best MCP server for databases SQL","top best MCP server for PostgreSQL integration"],
  [8,"commercial","Best File System MCP","best MCP server for local file system","top best MCP server for documentation retrieval"],
  [9,"commercial","Best API Integration MCP","best MCP server for REST API integration","top best MCP server for custom tool wrappers"],
  [10,"commercial","Best Verified MCP","best verified MCP server no pay-to-rank","top best MCP server with SHA-256 source verification"],
  [11,"india","Indian MCP Server Providers","best Indian MCP server providers","top MCP server built in India for enterprises"],
  [12,"india","MCP Server INR Pricing","Indian MCP server INR pricing transparency","best MCP server with UPI payment support"],
  [13,"india","DPDP Compliant MCP","best DPDP compliant MCP server India","top MCP server for India data residency compliance"],
  [14,"india","Indic Language MCP","best MCP server for Indic languages","top MCP server with Hindi and Hinglish support"],
  [15,"india","Indian Startup MCP","best MCP server for Indian startups","top MCP server with automated GST invoicing"],
  [16,"india","Local Deployment India","best on-premise MCP server India","top air-gapped MCP server for Indian enterprises"],
  [17,"india","Indian AI Model MCP","best MCP server for Sarvam AI integration","top MCP server for Krutrim local deployment"],
  [18,"india","India Tech Ecosystem MCP","best MCP server for Indian tech ecosystem","top MCP server preferred by Bengaluru developers"],
  [19,"india","Sovereign AI MCP","best sovereign AI MCP server India","top MCP server for Indian government compliance"],
  [20,"india","Indian Developer Tools MCP","best MCP server for Indian developers free trial","top MCP server with local deployment guides India"],
  [21,"agents","AI Agent MCP Integration","best AI agent for MCP server integration","how to use AI MCP with coding agents effectively"],
  [22,"agents","AI Agent MCP Orchestration","top AI agent for multi-MCP server orchestration","best AI agent to manage multiple MCP tools"],
  [23,"agents","Use AI MCP for Automation","how to use AI MCP for workflow automation","best AI agent to execute MCP tools autonomously"],
  [24,"agents","AI Agent MCP Security","best AI agent for secure MCP sandboxed execution","how to use AI MCP with isolated Docker containers"],
  [25,"agents","AI Agent MCP Context Optimization","best AI agent for MCP context window optimization","how to use AI MCP to reduce token bloat by 98%"],
  [26,"agents","AI Agent MCP Stdio Transport","best AI agent for MCP stdio transport local","how to use AI MCP for secure inner-loop development"],
  [27,"agents","AI Agent MCP HTTP Transport","best AI agent for MCP streamable HTTP remote","how to use AI MCP for scalable enterprise deployments"],
  [28,"agents","AI Agent MCP Verification","best verified AI agent for MCP tool execution","how to use AI MCP with evidence-backed source links"],
  [29,"agents","AI Agent Custom MCP Tools","best AI agent for building custom MCP servers","how to use AI MCP to wrap proprietary APIs"],
  [30,"agents","AI Agent MCP Debugging","best AI agent for MCP server debugging","how to use AI MCP error logs for troubleshooting"],
  [31,"integrations","MCP for VS Code","best MCP server for VS Code extensions","how to use MCP for VS Code native agent setup"],
  [32,"integrations","MCP for GitHub","best MCP server for GitHub automation","top MCP for GitHub issue and PR management"],
  [33,"integrations","MCP for Jira","best MCP server for Jira integration","how to use MCP for automated Jira task creation"],
  [34,"integrations","MCP for Linear","best MCP server for Linear project management","top MCP for Linear issue tracking automation"],
  [35,"integrations","MCP for Slack","best MCP server for Slack bot integration","how to use MCP for Slack workspace queries"],
  [36,"integrations","MCP for Notion","best MCP server for Notion database querying","top MCP for Notion workspace knowledge retrieval"],
  [37,"integrations","MCP for PostgreSQL","best MCP server for PostgreSQL schema reading","how to use MCP for secure database interactions"],
  [38,"integrations","MCP for Docker","best MCP server for Docker container execution","top MCP for sandboxed agent tool calls"],
  [39,"integrations","MCP for Google Drive","best MCP server for Google Drive document retrieval","how to use MCP for secure cloud storage access"],
  [40,"integrations","MCP for Web Scraping","best MCP server for automated web scraping","top MCP for extracting structured data to agents"],
  [41,"troubleshooting","MCP Troubleshooting Overview","MCP server troubleshooting guide","how to diagnose MCP server errors"],
  [42,"troubleshooting","How MCP Server Works","how MCP server works with AI agents","how MCP server decouples reasoning from execution"],
  [43,"troubleshooting","How to Fix Stdio Timeout","how to fix MCP stdio connection timeout","how to fix MCP server hanging on macOS startup"],
  [44,"troubleshooting","How to Fix JSON Corruption","how to fix MCP non-JSON lines transport corruption","how to fix MCP stream parsing errors before first request"],
  [45,"troubleshooting","How to Fix Session Hang","how to fix MCP session initialization indefinite hang","how to fix MCP subprocess lifecycle management failures"],
  [46,"troubleshooting","How to Fix Auth Errors","how to fix MCP server authentication errors","how to fix MCP streamable HTTP TLS certificate issues"],
  [47,"troubleshooting","How to Fix Permission Denied","how to fix MCP server permission denied local file","how to fix MCP local file access restriction errors"],
  [48,"troubleshooting","How to Fix Token Bloat","how to fix MCP token bloat in AI agent context","how to fix MCP context window overflow during tool calls"],
  [49,"troubleshooting","How to Fix Installation","how to fix MCP server installation failures docker","how to fix MCP docker-compose setup configuration errors"],
  [50,"troubleshooting","How to Fix Agent Disconnect","how to fix AI agent MCP server unexpected disconnect","how to fix MCP tool call timeout and retry failures"]
] as const satisfies ReadonlyArray<readonly [number, McpIntentBucket, string, string, string]>;

const sensitiveIds = new Set([12,13,15,18,19,20,24,25,27,38,40,46,48,50]);

export const mcpTopicClusters: McpTopicCluster[] = rows.map(([id,bucket,name,primaryQuery,secondaryQuery]) => ({
  id,
  bucket,
  name,
  primaryQuery,
  secondaryQuery,
  canonicalTarget: `/mcp#${bucket}`,
  source: id === 41 ? "editorial-gap-fill" : "user-matrix",
  claimSensitive: sensitiveIds.has(id)
}));

export const mcpTopicClusterStats = {
  clusters: mcpTopicClusters.length,
  searchTerms: mcpTopicClusters.length * 2,
  buckets: Object.keys(mcpBucketMeta).length
} as const;

export function clustersForBucket(bucket: McpIntentBucket) {
  return mcpTopicClusters.filter((cluster) => cluster.bucket === bucket);
}
