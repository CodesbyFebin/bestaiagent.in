import type { Metadata } from "next";
import Link from "next/link";
import { comparisons } from "@/lib/comparisons";

export const metadata: Metadata = {
  title: "Compare AI Agents & Frameworks",
  description: "Evidence-aware comparisons with legacy routes preserved and unsupported winner claims removed.",
  alternates: { canonical: "/compare" }
};

export default function Page(){
  const ready=comparisons.filter((item)=>item.status==="evidence-ready").length;
  return <div className="shell detail">
    <section className="directoryHero"><p className="eyebrow">Comparison graph</p><h1>Compare AI systems</h1><p className="lead">Comparisons are published only when both entities and the compared fields have adequate evidence. No universal winner is inferred from incompatible vendor claims.</p><div className="directoryMeta"><span>{comparisons.length} preserved comparison routes</span><span>{ready} evidence-ready</span><span>Inverse duplicates consolidated</span></div></section>
    <div className="grid">{comparisons.map((item)=><article className="card" key={item.slug}><div className="authorityType"><span>{item.status}</span><b>⇄</b></div><h2 style={{fontSize:"21px"}}><Link href={`/compare/${item.slug}`}>{item.title}</Link></h2><p>{item.notes[0]}</p><p><Link href={`/compare/${item.slug}`}>Open comparison →</Link></p></article>)}</div>
    <section className="section"><div className="discoveryBand"><div className="discoveryBandGrid"><div><p className="eyebrow">Comparison policy</p><h2>No synthetic winner table.</h2><p>Every factual row needs evidence on both sides. Missing facts remain unknown, and reverse-order duplicate URLs are redirected to one canonical comparison.</p></div><Link className="button buttonPrimary" href="/methodology">Read methodology</Link></div></div></section>
  </div>;
}
