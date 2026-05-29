// POST upload photo — sharp (auto-orient EXIF + WebP + resize) → Supabase Storage.
// Corrige automatiquement l'orientation : fini les photos de travers.
import sharp from "sharp";
import { uploadCataloguePhoto } from "@/lib/gwaka-db";
import { isAuthed } from "@/lib/gwaka-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugify(name: string): string {
  return name
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
    .slice(0, 60) || "photo";
}

export async function POST(req: Request): Promise<Response> {
  if (!isAuthed(req)) return Response.json({ error: "unauthorized" }, { status: 401 });
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return Response.json({ error: "no file" }, { status: 400 });
    if (file.size > 12 * 1024 * 1024) return Response.json({ error: "file too large (max 12MB)" }, { status: 413 });

    const input = Buffer.from(await file.arrayBuffer());
    // .rotate() sans argument applique l'orientation EXIF puis la supprime → photo droite.
    const webp = await sharp(input)
      .rotate()
      .resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    const base = slugify(file.name);
    const stamp = Math.random().toString(36).slice(2, 8); // évite collision sans Date.now
    const filename = `gwaka-${base}-${stamp}.webp`;
    const publicUrl = await uploadCataloguePhoto(filename, webp);

    return Response.json({ url: publicUrl, filename, bytes: webp.length });
  } catch (e) {
    console.error("[gwaka-admin]", e); return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
