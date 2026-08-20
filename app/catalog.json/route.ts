import { evidence, publicEntities } from "@/lib/catalog";
export const dynamic = "force-static";
export async function GET() {
  return Response.json({ schemaVersion: "2.0", generatedAt: "2026-08-20", entities: publicEntities, evidence });
}
