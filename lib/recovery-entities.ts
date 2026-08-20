import type { Entity } from "@/lib/catalog-types";

export const recoveryEntities: Entity[] = [
  {
    id: "cursor",
    type: "agent",
    slug: "cursor",
    name: "Cursor",
    developer: "Cursor",
    summary: "Cursor's first-party documentation describes Cursor as a coding agent for understanding codebases, planning and building features, fixing bugs, reviewing changes and working with developer tools.",
    summaryKind: "source-derived",
    sourceUrl: "https://cursor.com/docs",
    sourceLabel: "Official documentation",
    categories: ["coding", "ide"],
    verification: "verified",
    evidenceIds: ["ev-cursor", "ev-cursor-pricing-india"],
    facts: {
      productType: "coding agent",
      indiaStartPlan: "Cursor Start (₹649/mo tax inclusive, billed monthly in INR)",
      proPlan: "$20/mo (billed before tax)",
      proPlusPlan: "$60/mo (billed before tax)",
      ultraPlan: "$200/mo (billed before tax)"
    }
  }
];
