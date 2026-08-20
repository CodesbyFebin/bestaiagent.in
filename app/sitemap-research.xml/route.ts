import { SITE } from "@/lib/site";import { xmlResponse } from "@/lib/xml";export const dynamic="force-static";export async function GET(){return xmlResponse([`${SITE.url}/research`])}
