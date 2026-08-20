import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { comparisons, findComparison } from "@/lib/comparisons";
import { getPublicEntity } from "@/lib/catalog";
import { StatusBadge } from "@/components/StatusBadge";
type P={params:Promise<{slug:string}>};
export function generateStaticParams(){return comparisons.map((c)=>({slug:c.slug}))}
export async function generateMetadata({params}:P):Promise<Metadata>{const {slug}=await params;const c=findComparison(slug);if(!c)return {title:"Not found",robots:{index:false,follow:true}};return {title:c.title,description:c.notes[0],alternates:{canonical:`/compare/${c.slug}`},robots:{index:c.status==="evidence-ready",follow:true}}}
export default async function Page({params}:P){const {slug}=await params;const c=findComparison(slug);if(!c)notFound();const a=getPublicEntity(c.a.type,c.a.slug);const b=getPublicEntity(c.b.type,c.b.slug);return <div className="shell detail"><div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/compare">Compare</Link> / {c.title}</div><p className="eyebrow">Comparison status</p><h1 style={{fontSize:"48px"}}>{c.title}</h1><StatusBadge state={c.status}/>{c.status!=="evidence-ready"&&<p className="warning">This legacy URL is preserved, but its old score/benchmark content was rejected during the clean merge. It remains noindex until a reproducible comparison evidence set exists.</p>}<div className="prose"><h2>Evidence coverage</h2><ul>{c.notes.map((n)=><li key={n}>{n}</li>)}</ul>{a&&b&&<p>Verified entity identities: <Link href={`/${a.type}s/${a.slug}`}>{a.name}</Link> and <Link href={`/${b.type}s/${b.slug}`}>{b.name}</Link>.</p>}<h2>Editorial rule</h2><p>Facts require field-level evidence. Editorial fit can be discussed, but it may not be presented as an external benchmark or universal winner.</p></div></div>}
