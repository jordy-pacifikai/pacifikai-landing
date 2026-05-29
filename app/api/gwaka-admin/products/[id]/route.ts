// PATCH (édition) + DELETE — protégé par session admin.
import { updateProduct, deleteProduct } from "@/lib/gwaka-db";
import { isAuthed } from "@/lib/gwaka-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CAT_LABELS: Record<string, string> = {
  sales: "Salés", toasts: "Toasts", wraps: "Wraps", salades: "Salades",
  plateaux: "Plateaux", sushis: "Sushis", mini: "Mini Salés",
};

const ALLOWED = ["categorie_slug", "categorie_label", "nom", "description", "image", "vegetarien", "ordre", "actif"];

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }): Promise<Response> {
  if (!isAuthed(req)) return Response.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  try {
    const b = await req.json();
    const patch: Record<string, unknown> = {};
    for (const k of ALLOWED) if (k in b) patch[k] = b[k];
    if ("categorie_slug" in patch) {
      patch.categorie_label = CAT_LABELS[String(patch.categorie_slug)] || patch.categorie_slug;
    }
    if (Object.keys(patch).length === 0) return Response.json({ error: "empty patch" }, { status: 400 });
    return Response.json({ product: await updateProduct(id, patch) });
  } catch (e) {
    console.error("[gwaka-admin]", e); return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }): Promise<Response> {
  if (!isAuthed(req)) return Response.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  try {
    await deleteProduct(id);
    return Response.json({ ok: true });
  } catch (e) {
    console.error("[gwaka-admin]", e); return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
