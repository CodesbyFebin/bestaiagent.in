import { entitiesByType } from "@/lib/catalog";export const dynamic="force-static";export async function GET(){return Response.json({schemaVersion:"2.0",type:"model",items:entitiesByType("model")})}
