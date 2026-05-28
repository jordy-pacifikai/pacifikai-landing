// GWAKA admin — auth par mot de passe + cookie de session signé (HMAC).
// Aucune dépendance externe : crypto natif Node.

import crypto from "crypto";

const SECRET = process.env.GWAKA_SESSION_SECRET || "gwaka-dev-secret-change-me";
const PASSWORD = process.env.GWAKA_ADMIN_PASSWORD || "";
export const GWAKA_COOKIE = "gwaka_admin";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 jours

export function passwordConfigured(): boolean {
  return Boolean(PASSWORD);
}

export function checkPassword(input: string): boolean {
  if (!PASSWORD) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(PASSWORD);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** Crée un token signé : base64(payload).hmac */
export function createSession(): string {
  const payload = JSON.stringify({ exp: Math.floor(Date.now() / 1000) + MAX_AGE });
  const b64 = Buffer.from(payload).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(b64).digest("base64url");
  return `${b64}.${sig}`;
}

export function verifySession(token: string | undefined): boolean {
  if (!token || !token.includes(".")) return false;
  const [b64, sig] = token.split(".");
  const expected = crypto.createHmac("sha256", SECRET).update(b64).digest("base64url");
  if (sig.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  try {
    const { exp } = JSON.parse(Buffer.from(b64, "base64url").toString());
    return typeof exp === "number" && exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export function sessionCookieHeader(token: string): string {
  return `${GWAKA_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${MAX_AGE}`;
}

export function clearCookieHeader(): string {
  return `${GWAKA_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

/** Lit le cookie depuis le header Cookie brut d'une Request. */
export function isAuthed(req: Request): boolean {
  const cookie = req.headers.get("cookie") || "";
  const m = cookie.match(new RegExp(`(?:^|; )${GWAKA_COOKIE}=([^;]+)`));
  return verifySession(m ? decodeURIComponent(m[1]) : undefined);
}
