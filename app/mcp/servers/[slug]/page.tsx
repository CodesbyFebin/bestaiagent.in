import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mcpServers } from "@/lib/mcp";
type P={params:Promise<{slug:string}>};
export function generateStaticParams(){return mcpServers.map((s)=>({slug:s.slug}))}
export async function generateMetadata({params}:P):Promise<Metadata>{const {slug}=await params;const s=mcpServers.find((x)=>x.slug===slug);if(!s)return{title:"Not found",robots:{index:false,follow:true}};return{title:s.name,description:s.note,alternates:{canonical:`/mcp/servers/${s.slug}`},robots:{index:false,follow:true}}}
export default async function Page({params}:P){const {slug}=await params;const s=mcpServers.find((x)=>x.slug===slug);if(!s)notFound();return <div className="shell detail"><div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/mcp">MCP</Link> / {s.name}</div><p className="eyebrow">{s.status}</p><h1 style={{fontSize:"48px"}}>{s.name}</h1><p className="lead">{s.note}</p><p><a className="button" href={s.sourceUrl}>Candidate upstream ↗</a></p><div className="warning">This detail URL remains noindex until a canonical upstream and hashed primary evidence pass the publication gate. Capabilities, ownership, maintenance status and security posture are not inferred from a source link.</div></div>}
