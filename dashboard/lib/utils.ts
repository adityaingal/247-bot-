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

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isAdmin(userId?: string | null) {
  if (!userId) return false;
  const adminIds = (process.env.NEXT_PUBLIC_ADMIN_IDS || "").split(",");
  return adminIds.includes(userId);
}

/**
 * The dev (project owner) — the only role that can grant/revoke access
 * and open the Dev Admin Panel by default.
 */
export function isDev(userId?: string | null) {
  if (!userId) return false;
  const devIds = (
    process.env.NEXT_PUBLIC_DEV_IDS || "1466133502939365437"
  )
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return devIds.includes(userId);
}
