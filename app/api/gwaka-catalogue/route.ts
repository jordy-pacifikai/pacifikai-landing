// GET public — catalogue actif pour la carte gwakatahiti.com/menu.
import { listActiveProducts, dbConfigured } from "@/lib/gwaka-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CORS = {
  "Access-Control-Allow-Origin": "https://gwakatahiti.com",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { status: 200, headers: CORS });
}

export async function GET(): Promise<Response> {
  if (!dbConfigured()) {
    return Response.json({ products: [], error: "not_configured" }, { status: 200, headers: CORS });
  }
  try {
    const products = await listActiveProducts();
    return Response.json(
      { products },
      { status: 200, headers: { ...CORS, "Cache-Control": "public, max-age=60, s-maxage=60" } }
    );
  } catch (e) {
    return Response.json({ products: [], error: String(e) }, { status: 200, headers: CORS });
  }
}
