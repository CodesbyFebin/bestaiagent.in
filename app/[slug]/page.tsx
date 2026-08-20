import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { legacyPages } from "@/lib/legacy";
import { entitiesByType } from "@/lib/catalog";
type P={params:Promise<{slug:string}>};
export function generateStaticParams(){return Object.keys(legacyPages).filter((s)=>!s.includes("/")).map((slug)=>({slug}))}
export async function generateMetadata({params}:P):Promise<Metadata>{const {slug}=await params;const page=legacyPages[slug];if(!page)return{title:"Not found",robots:{index:false,follow:true}};return{title:page.title,description:page.description,alternates:{canonical:`/${slug}`},robots:{index:page.index,follow:true}}}
export default async function Page({params}:P){const {slug}=await params;const page=legacyPages[slug];if(!page)notFound();const models=entitiesByType("model");return <div className="shell detail"><div className="breadcrumbs"><Link href="/">Home</Link> / {page.title}</div><p className="eyebrow">Authority page</p><h1 style={{fontSize:"48px"}}>{page.title}</h1><p className="lead">{page.description}</p><div className="prose">{page.body.map((p)=><p key={p}>{p}</p>)}{slug==="local-llm-benchmarks-india"&&<><h2>Verified Indian model cards</h2><ul>{models.map((m)=><li key={m.id}><Link href={`/models/${m.slug}`}>{m.name}</Link> — {m.verification}</li>)}</ul></>}</div></div>}
