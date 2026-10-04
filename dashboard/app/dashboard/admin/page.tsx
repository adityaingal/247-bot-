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

import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { isDev, isAdmin } from "@/lib/utils";

import { AdminContent } from "@/components/dashboard/admin-content";

/**
 * Access rules:
 *  - the dev (NEXT_PUBLIC_DEV_IDS) always has access
 *  - IDs granted by the dev (stored server-side in the bot's admin config) have access
 *  - NEXT_PUBLIC_ADMIN_IDS may still be used as an env-based allow-list
 * Everyone else gets a 404 so the panel's existence stays hidden.
 */
async function hasApiAccess(userId: string): Promise<boolean> {
  try {
    const base =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
    const key = process.env.NEXT_PUBLIC_DASHBOARD_API_KEY;
    const res = await fetch(`${base}/admin/config`, {
      headers: key ? { Authorization: `Bearer ${key}` } : {},
      cache: "no-store",
    });
    if (!res.ok) return false;
    const data = await res.json();
    return Array.isArray(data.admin_ids) && data.admin_ids.includes(userId);
  } catch {
    return false;
  }
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id as string | undefined;

  if (!userId) {
    redirect("/dashboard");
  }

  if (!isDev(userId) && !isAdmin(userId) && !(await hasApiAccess(userId))) {
    notFound();
  }

  return <AdminContent />;
}
