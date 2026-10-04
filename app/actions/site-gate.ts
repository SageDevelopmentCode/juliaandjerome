"use server";

import { cookies } from "next/headers";
import {
  createSiteAccessToken,
  SITE_ACCESS_COOKIE,
  siteAccessCookieOptions,
  sitePasswordConfigured,
  verifySitePasswordInput,
} from "@/lib/site-gate";

export type SiteGateResult =
  | { success: true }
  | { success: false; error: string };

export async function verifySitePassword(
  password: string
): Promise<SiteGateResult> {
  const configured = sitePasswordConfigured();
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
      hypothesisId: "E",
      location: "app/actions/site-gate.ts:verifySitePassword",
      message: "verifySitePassword entry",
      data: { configured, passwordLen: password.length },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
  if (!configured) {
    const error =
      process.env.NODE_ENV === "development"
        ? "Guest password is not loaded. Add SITE_PASSWORD (and SITE_GATE_SECRET) to .env.local, then restart the dev server."
        : "The site is not configured for guest access yet.";
    return { success: false, error };
  }

  if (!verifySitePasswordInput(password)) {
    return { success: false, error: "That password didn’t match. Try again." };
  }

  try {
    const token = createSiteAccessToken();
    const cookieStore = await cookies();
    cookieStore.set(SITE_ACCESS_COOKIE, token, siteAccessCookieOptions());
    return { success: true };
  } catch {
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}
