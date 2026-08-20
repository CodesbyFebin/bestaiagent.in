import type { Metadata } from "next";
import Link from "next/link";
import { EntityDirectory } from "@/components/EntityDirectory";
import { legacyAgentSources } from "@/lib/catalog";
export const metadata: Metadata = { title: "AI Agents Directory", description: "Evidence-backed AI agent identities with primary-source provenance.", alternates: { canonical: "/agents" } };
export default function Page(){return <><EntityDirectory type="agent" title="AI agents" description="Browse verified agent identities. Scores, pricing and benchmarks are published only when their own evidence exists."/><div className="shell"><section className="prose"><h2>Legacy source-linked routes</h2><p>These URLs are retained for continuity while field-level evidence is refreshed.</p><ul>{legacyAgentSources.map((item)=><li key={item.slug}><Link href={`/agents/${item.slug}`}>{item.name}</Link></li>)}</ul></section></div></>}
