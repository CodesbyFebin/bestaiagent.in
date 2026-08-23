import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/legacy";

export const metadata: Metadata = {
  title: "AI Agent Categories",
  description: "Task-oriented AI agent category hubs backed by the same evidence-first publication graph.",
  alternates: { canonical: "/categories" }
};

const marks: Record<string,string> = {"coding-agents":"</>","voice-bots":"◉",orchestration:"⌘",business:"▣",crm:"◎","customer-support":"☏",sales:"↗",marketing:"✦",research:"⌕",automation:"⚙"};

export default function Page(){
  return <div className="shell detail">
    <section className="directoryHero">
      <p className="eyebrow">Browse by workflow</p>
      <h1>AI agent categories</h1>
      <p className="lead">Use category hubs to discover public entities by task and workflow. Category membership organizes the graph; it does not create a duplicate entity, rating, performance claim or compliance badge.</p>
      <div className="directoryMeta"><span>{categories.length} curated category hubs</span><span>One canonical entity URL</span><span>Evidence state preserved</span></div>
    </section>
    <div className="categoryGrid">{categories.map(([slug,title,description])=><article className="card categoryCard" key={slug}><div className="categoryIcon">{marks[slug]??"✦"}</div><h2 style={{fontSize:"18px"}}><Link href={`/categories/${slug}`}>{title}</Link></h2><p>{description}</p><p><Link href={`/categories/${slug}`}>Explore category →</Link></p></article>)}</div>
    <section className="section"><div className="discoveryBand"><div className="discoveryBandGrid"><div><p className="eyebrow">Need a broader view?</p><h2>Search the full evidence graph.</h2><p>Search verified agents, models, frameworks, providers and reviewed authority guides without relying on synthetic popularity counts.</p></div><div className="ctaRow"><Link className="button buttonPrimary" href="/search">Search</Link><Link className="button" href="/agents">Browse agents</Link></div></div></div></section>
  </div>;
}
