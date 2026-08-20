import { getPublicEntity } from "./catalog";

export type Comparison = {
  slug: string;
  a: { type: "agent" | "framework" | "model"; slug: string };
  b: { type: "agent" | "framework" | "model"; slug: string };
  title: string;
  status: "evidence-ready" | "refreshing";
  notes: string[];
};

export const comparisons: Comparison[] = [
  {
    slug: "openhands-vs-cline",
    a: { type: "agent", slug: "openhands" },
    b: { type: "agent", slug: "cline" },
    title: "OpenHands vs Cline",
    status: "evidence-ready",
    notes: ["Both upstream repositories are currently public and non-archived in the evidence snapshot.", "Capability, pricing and benchmark winners are intentionally not inferred from repository identity."]
  },
  {
    slug: "crewai-vs-autogen",
    a: { type: "framework", slug: "crewai" },
    b: { type: "framework", slug: "autogen" },
    title: "CrewAI vs AutoGen",
    status: "evidence-ready",
    notes: ["Both upstream repositories are represented as verified repository identities.", "Lifecycle and feature-level comparisons require field-specific evidence."]
  },
  { slug: "cursor-vs-copilot", a: { type: "agent", slug: "cline" }, b: { type: "agent", slug: "gemini-cli" }, title: "Cursor vs GitHub Copilot (legacy route)", status: "refreshing", notes: ["Legacy URL preserved. Original score-based comparison was not migrated because its benchmark evidence was not reproducible."] },
  { slug: "chatgpt-vs-claude", a: { type: "agent", slug: "gpt-researcher" }, b: { type: "agent", slug: "openhands" }, title: "ChatGPT vs Claude (legacy route)", status: "refreshing", notes: ["Legacy URL preserved while first-party product evidence is refreshed. No winner is asserted."] },
  { slug: "langgraph-vs-crewai", a: { type: "framework", slug: "langgraph" }, b: { type: "framework", slug: "crewai" }, title: "LangGraph vs CrewAI", status: "evidence-ready", notes: ["Repository identity is verified for both projects.", "Use-case judgments are editorial and are not shown as benchmark facts."] },
  { slug: "vapi-vs-retell", a: { type: "agent", slug: "gpt-researcher" }, b: { type: "agent", slug: "browser-use" }, title: "Vapi vs Retell (legacy route)", status: "refreshing", notes: ["Legacy URL preserved. Voice latency and pricing claims were removed pending reproducible evidence."] },
  { slug: "flowise-vs-dify", a: { type: "framework", slug: "langgraph" }, b: { type: "framework", slug: "crewai" }, title: "Flowise vs Dify (legacy route)", status: "refreshing", notes: ["Legacy URL preserved. The previous comparison data was not carried forward as verified evidence."] }
];

export const publicComparisons = comparisons.filter((comparison) => {
  if (comparison.status !== "evidence-ready") return false;
  return Boolean(getPublicEntity(comparison.a.type, comparison.a.slug) && getPublicEntity(comparison.b.type, comparison.b.slug));
});

export const findComparison = (slug: string) => comparisons.find((item) => item.slug === slug) ?? null;
