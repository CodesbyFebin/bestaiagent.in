import type { Metadata } from "next";
import Link from "next/link";
import { EntityCard } from "@/components/EntityCard";
import { entitiesByType } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "India & Indic AI",
  description: "Indian and Indic AI models, local inference and agent infrastructure with primary-source evidence.",
  alternates: { canonical: "/india" }
};

export default function Page(){
  const models=entitiesByType("model").filter((model)=>Boolean(model.indiaRelevance));
  const publishers=new Set(models.map((model)=>model.developer));
  return <div className="shell detail">
    <section className="indiaHero">
      <div>
        <div className="heroBadge">🇮🇳 Built in India evidence hub</div>
        <p className="eyebrow">Indian & Indic AI</p>
        <h1 style={{fontSize:"clamp(42px,6vw,66px)"}}>India-first discovery, <span className="gradient">without sovereignty theatre.</span></h1>
        <p className="lead">A source-first map of Indian and Indic model work. India relevance is recorded from primary publisher evidence; it is not automatically converted into a DPDP, residency, security or sovereignty claim.</p>
        <div className="directoryMeta"><span>{models.length} verified India-relevant model cards</span><span>{publishers.size} primary publishers represented</span><span>Publisher benchmarks stay publisher-reported</span></div>
        <div className="ctaRow"><Link className="button buttonPrimary" href="/indian-ai">Explore the Indian AI pillar</Link><Link className="button" href="/models">Browse model cards</Link><Link className="button" href="/local-llm-benchmarks-india">Benchmark methodology</Link></div>
      </div>
      <div className="indiaMap" aria-hidden="true"><div className="indiaMapShape">🇮🇳</div></div>
    </section>

    <section className="section"><div className="sectionHead"><div><p className="eyebrow">Verified model identities</p><h2>Indian and Indic model cards</h2><p>These records pass the same primary-source identity gate as the rest of the public graph.</p></div></div><div className="grid">{models.map((model)=><EntityCard key={model.id} entity={model}/>)}</div></section>

    <section className="section sectionAlt" style={{marginInline:"calc(50% - 50vw)",paddingInline:"calc(50vw - 50%)"}}><div className="sectionHead"><div><p className="eyebrow">How to read this hub</p><h2>India relevance is a fact field, not a badge.</h2></div></div><div className="grid"><article className="card"><div className="categoryIcon">◎</div><h3>Publisher identity</h3><p>Developer and model identity must resolve to a primary model card, repository or official publisher page.</p></article><article className="card"><div className="categoryIcon">▥</div><h3>Benchmarks</h3><p>Publisher-reported benchmarks are labeled as such and are not converted into independent rankings.</p></article><article className="card"><div className="categoryIcon">◇</div><h3>Compliance</h3><p>No DPDP, data-residency or sovereignty status is inferred from a model being Indian, Indic or locally runnable.</p></article></div></section>

    <section className="section"><div className="discoveryBand"><div className="discoveryBandGrid"><div><p className="eyebrow">Indian AI ecosystem</p><h2>Move from model cards to the wider ecosystem.</h2><p>The Indian AI pillar connects these verified model records to IndiaAI, AIKosh, BHASHINI, AI4Bharat, policy references and developer resources.</p></div><div className="ctaRow"><Link className="button buttonPrimary" href="/indian-ai">Open Indian AI pillar</Link><Link className="button" href="/methodology">Evidence policy</Link></div></div></div></section>
  </div>;
}
