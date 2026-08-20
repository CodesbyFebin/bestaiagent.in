import type { EvidenceRecord } from "@/lib/catalog-types";

export const recoveryEvidence: EvidenceRecord[] = [
  {
    id: "ev-cursor",
    entityId: "cursor",
    field: "product-identity",
    sourceUrl: "https://cursor.com/docs",
    sourceType: "official-documentation",
    publisher: "Cursor",
    authority: "primary",
    retrievedAt: "2026-08-20T13:50:00Z",
    contentHash: "sha256:d7af7be04cdd3c577707a4809c402dd198791bab8382ec35038a62719f17d0d6",
    snapshot: {
      developer: "Cursor",
      name: "Cursor",
      productType: "coding agent",
      sourceUrl: "https://cursor.com/docs"
    },
    status: "verified"
  },
  {
    id: "ev-cursor-pricing-india",
    entityId: "cursor",
    field: "pricing",
    sourceUrl: "https://cursor.com/docs/models-and-pricing",
    sourceType: "official-documentation",
    publisher: "Cursor",
    authority: "primary",
    retrievedAt: "2026-08-20T14:00:00Z",
    contentHash: "sha256:165ed049c6a7e9817b8d9a8365fb114a6a2d5fca728e4392552cf010c333adb3",
    snapshot: {
      developer: "Cursor",
      field: "pricing",
      sourceUrl: "https://cursor.com/docs/models-and-pricing",
      retrievedAt: "2026-08-20T14:00:00Z",
      plans: {
        start: { name: "Cursor Start", region: "India only", price: "₹649/mo", tax: "tax inclusive", billing: "in INR, monthly", payment: "UPI, credit card, or debit card" },
        pro: { name: "Pro", price: "$20/mo", tax: "before tax" },
        proPlus: { name: "Pro Plus", price: "$60/mo", tax: "before tax" },
        ultra: { name: "Ultra", price: "$200/mo", tax: "before tax" }
      },
      teamsPlans: { standard: "$40/user/mo", premium: "$120/user/mo" },
      freshnessPolicy: "Pricing changes; verify first-party source before procurement."
    },
    status: "verified"
  },
  {
    id: "ev-github-copilot-pricing",
    entityId: "github-copilot-pricing",
    field: "pricing",
    sourceUrl: "https://github.com/features/copilot/plans",
    sourceType: "official-documentation",
    publisher: "GitHub",
    authority: "primary",
    retrievedAt: "2026-08-20T14:00:00Z",
    contentHash: "sha256:a8e5e776171354dcb03cb37e8ec7cacfb32b2306be8c5b17abfc492aae5fd0f1",
    snapshot: {
      developer: "GitHub",
      field: "pricing",
      sourceUrl: "https://github.com/features/copilot/plans",
      retrievedAt: "2026-08-20T14:00:00Z",
      individualPlans: { free: "$0/mo", pro: "$10/user/mo", proPlus: "$39/user/mo", max: "$100/user/mo" },
      note: "GitHub Copilot Business and Enterprise per-seat prices are listed separately on GitHub; this receipt only asserts the individual Free/Pro/Pro+/Max prices surfaced on the public plans page."
    },
    status: "verified"
  },
  {
    id: "ev-claude-code-pricing",
    entityId: "claude-code-pricing",
    field: "pricing",
    sourceUrl: "https://claude.com/pricing",
    sourceType: "official-documentation",
    publisher: "Anthropic",
    authority: "primary",
    retrievedAt: "2026-08-20T14:00:00Z",
    contentHash: "sha256:c6259e81eefdedce24a39c01a155548ba9d17690e846f08f3ea76268f3e9e6e3",
    snapshot: {
      developer: "Anthropic",
      field: "pricing",
      sourceUrl: "https://claude.com/pricing",
      retrievedAt: "2026-08-20T14:00:00Z",
      plans: { free: "$0/mo", pro: "$20/mo (or ~$17/mo billed annually, $200 upfront)", max5x: "From $100/mo" },
      claudeCodeInclusion: "Claude Code (CLI/terminal agent) is included with all paid plans; it shares the same usage limits as the rest of the plan.",
      overage: "When limits are reached, usage credits at standard API rates or pay-as-you-go Console credits may be enabled."
    },
    status: "verified"
  },
  {
    id: "ev-crewai-definition",
    entityId: "crewai",
    field: "framework-identity",
    sourceUrl: "https://docs.crewai.com/core-concepts/Agents",
    sourceType: "official-documentation",
    publisher: "CrewAI",
    authority: "primary",
    retrievedAt: "2026-08-20T14:00:00Z",
    contentHash: "sha256:476b78a493e384c53fc3b47c5162154257500f31776b9bd3a890bc19263f10bc",
    snapshot: {
      developer: "CrewAI",
      field: "framework-identity",
      sourceUrl: "https://docs.crewai.com/core-concepts/Agents",
      retrievedAt: "2026-08-20T14:00:00Z",
      statement: "CrewAI is the product and framework name. CrewAI does not publish an expanded acronym or full form. The framework builds collaborative AI agents organized into Crews and connected via Flows.",
      corePrimitives: ["Agent", "Crew", "Flow", "Task", "Process", "Tool"],
      tagline: "Build collaborative AI agents, crews, and flows — production ready from day one."
    },
    status: "verified"
  }
];

/**
 * Slug-keyed evidence receipts for the /<slug> authority pages that are NOT
 * entity routes (e.g. pricing pages). Each slug maps to the evidence receipt
 * ids that should be surfaced on that page so the page is evidence-first
 * rather than a generic "verify at the source" notice.
 */
export const slugEvidence: Record<string, string[]> = {
  "cursor-pricing": ["ev-cursor-pricing-india"],
  "github-copilot-pricing": ["ev-github-copilot-pricing"],
  "claude-code-pricing": ["ev-claude-code-pricing"],
  "crewai-full-form": ["ev-crewai-definition"]
};
