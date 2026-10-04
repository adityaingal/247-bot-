/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║                                                                  ║
 * ║   ░█▀▀░█▀█░█▀▄░█▀▀░█░█   ░█▀▄░█▀▀░█░█░█▀▀                     ║
 * ║   ░█░░░█░█░█░█░█▀▀░▄▀▄   ░█░█░█▀▀░▀▄▀░▀▀█                     ║
 * ║   ░▀▀▀░▀▀▀░▀▀░░▀▀▀░▀░▀   ░▀▀░░▀▀▀░░▀░░▀▀▀                     ║
 * ║                                                                  ║
 * ║           © 2026 OGADI — All Rights Reserved                     ║
 * ║                                                                  ║
 * ║   discord  ──  https://discord.gg/UVRWygSpJq                    ║
 * ║                                                                  ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const missing = [
  !process.env.NEXTAUTH_SECRET && "NEXTAUTH_SECRET",
  !process.env.DISCORD_CLIENT_ID && "DISCORD_CLIENT_ID",
  !process.env.DISCORD_CLIENT_SECRET && "DISCORD_CLIENT_SECRET",
  !process.env.NEXTAUTH_URL && "NEXTAUTH_URL",
].filter(Boolean) as string[];

const authHandler = missing.length === 0 ? NextAuth(authOptions) : null;

if (missing.length > 0) {
  console.error(
    `[auth] Dashboard auth disabled — missing env: ${missing.join(", ")}. ` +
      `Set them in Render → support-web-dashboard → Environment and redeploy.`
  );
}

function configError(req: Request): Response {
  const wantsJson = (req.headers.get("accept") || "").includes("application/json");
  if (wantsJson) {
    return Response.json(
      { error: "Server configuration problem", missing },
      { status: 500 }
    );
  }
  const body = [
    "There is a problem with the server configuration.",
    "",
    "Missing environment variables: " + missing.join(", "),
    "",
    "Fix (Render → support-web-dashboard → Environment):",
    "  NEXTAUTH_SECRET         any long random string (e.g. openssl rand -hex 32)",
    "  NEXTAUTH_URL            https://<your-dashboard-host>",
    "  DISCORD_CLIENT_ID       Discord Developer Portal → your app → OAuth2",
    "  DISCORD_CLIENT_SECRET   same page → Client Secret",
    "  NEXT_PUBLIC_API_URL     https://support-web-api.onrender.com",
    "  NEXT_PUBLIC_DASHBOARD_API_KEY   (same DASHBOARD_API_KEY as the bot)",
    "  NEXT_PUBLIC_ADMIN_IDS   your Discord user ID",
    "",
    "Then: Clear build cache & deploy.",
  ].join("\n");
  return new Response(body, {
    status: 500,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export function GET(req: Request, ctx: unknown) {
  return authHandler ? authHandler(req as any, ctx as any) : configError(req);
}

export function POST(req: Request, ctx: unknown) {
  return authHandler ? authHandler(req as any, ctx as any) : configError(req);
}
