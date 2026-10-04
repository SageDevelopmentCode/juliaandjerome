import { createHmac, timingSafeEqual } from "crypto";

export const SITE_ACCESS_COOKIE = "site_access";

type CookieStore = {
  get: (name: string) => { value: string } | undefined;
};

const ACCESS_TOKEN = "granted";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function env(
  name: "SITE_PASSWORD" | "SITE_GATE_SECRET" | "AUTH_SECRET"
): string | undefined {
  const value = process.env[name];
  return typeof value === "string" ? value.trim() : undefined;
}

function debugEnvSnapshot(source: string): void {
  const sitePasswordLen = env("SITE_PASSWORD")?.length ?? 0;
  const siteGateSecretLen = env("SITE_GATE_SECRET")?.length ?? 0;
  const supabaseUrlSet = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL?.length);
  const directDot = typeof process.env.SITE_PASSWORD === "string";
  const bracket = typeof process.env["SITE_PASSWORD"] === "string";
  const siteEnvKeys = Object.keys(process.env).filter((k) => k.includes("SITE"));
  // #region agent log
  fetch("http://127.0.0.1:7290/ingest/c92b5adb-dd89-4e04-8a10-5ac11b5e6984", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "1bfbd4",
    },
    body: JSON.stringify({
      sessionId: "1bfbd4",
      runId: "pre-fix",
      hypothesisId: "A-D",
      location: "lib/site-gate.ts:debugEnvSnapshot",
      message: "site-gate env snapshot",
      data: {
        source,
        cwd: process.cwd(),
        nodeEnv: process.env.NODE_ENV,
        sitePasswordLen,
        siteGateSecretLen,
        supabaseUrlSet,
        directDot,
        bracket,
        siteEnvKeys,
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
}

function gateSecret(): string | undefined {
  return env("SITE_GATE_SECRET") ?? env("AUTH_SECRET");
}

export function sitePasswordConfigured(): boolean {
  return Boolean(env("SITE_PASSWORD")?.length);
}

export function createSiteAccessToken(): string {
  const secret = gateSecret();
  if (!secret) {
    throw new Error("SITE_GATE_SECRET (or AUTH_SECRET) is required for site gate.");
  }
  return createHmac("sha256", secret).update(ACCESS_TOKEN).digest("hex");
}

export function verifySiteAccessToken(value: string | undefined): boolean {
  if (!value) return false;
  const secret = gateSecret();
  if (!secret) return false;

  try {
    const expected = createSiteAccessToken();
    const a = Buffer.from(value, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function hasSiteAccess(cookies: CookieStore): boolean {
  if (!sitePasswordConfigured()) {
    debugEnvSnapshot("hasSiteAccess");
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[site-gate] SITE_PASSWORD is not set; guest site is locked (fail closed)."
      );
    }
    return false;
  }
  return verifySiteAccessToken(cookies.get(SITE_ACCESS_COOKIE)?.value);
}

export function siteAccessCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  };
}

export function verifySitePasswordInput(password: string): boolean {
  const expected = env("SITE_PASSWORD");
  if (!expected) return false;

  const a = Buffer.from(password, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
