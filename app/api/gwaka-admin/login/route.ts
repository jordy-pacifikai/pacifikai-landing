// POST login admin — password → cookie de session signé.
import { checkPassword, createSession, sessionCookieHeader, passwordConfigured } from "@/lib/gwaka-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request): Promise<Response> {
  if (!passwordConfigured()) {
    return Response.json({ ok: false, error: "Admin non configuré (mot de passe manquant)" }, { status: 503 });
  }
  let password = "";
  try {
    const body = await req.json();
    password = String(body.password || "");
  } catch {
    return Response.json({ ok: false, error: "Requête invalide" }, { status: 400 });
  }
  if (!checkPassword(password)) {
    return Response.json({ ok: false, error: "Mot de passe incorrect" }, { status: 401 });
  }
  const token = createSession();
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json", "Set-Cookie": sessionCookieHeader(token) },
  });
}
