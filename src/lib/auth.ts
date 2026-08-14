import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE_NAME = "admin_session";

function getSecret(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("ADMIN_PASSWORD env var is not set");
  return secret;
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function checkPassword(password: string): boolean {
  return safeEqual(password, getSecret());
}

export function makeSessionToken(): string {
  return createHmac("sha256", getSecret()).update("chez-ricco-admin").digest("hex");
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  return safeEqual(token, makeSessionToken());
}
