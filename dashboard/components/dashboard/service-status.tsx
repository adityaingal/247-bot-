"use client";

import React, { useCallback, useEffect, useState } from "react";

/**
 * Live service status card.
 *
 * Reads GET /api/status from the bot API and reports the WEB service and the
 * DISCORD gateway as two separate rows - one being up never implies the other
 * is. Everything shown comes from the API response; nothing is invented, and
 * a failed fetch is shown as "Unreachable"/"Unknown" instead of a fake OK.
 */

type StatusPayload = {
  service?: string;
  web?: { status?: string };
  discord?: { status?: string; connected?: boolean };
  keepalive?: {
    result?: string | null;
    http_status?: number | null;
    last_checked?: string | null;
    response_ms?: number | null;
    interval_s?: number;
  };
  guilds?: number;
  users?: number;
};

type Dot = "on" | "warn" | "off" | "unknown";

type Row = {
  label: string;
  state: Dot;
  status: string;
  detail?: string;
};

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"
).replace(/\/api\/v1\/?$/, "");

const REFRESH_MS = 30_000;

const DOT: Record<Dot, string> = {
  on: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]",
  warn: "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]",
  off: "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]",
  unknown: "bg-slate-500",
};

const TEXT: Record<Dot, string> = {
  on: "text-emerald-500",
  warn: "text-amber-500",
  off: "text-red-500",
  unknown: "text-slate-500",
};

export default function ServiceStatus() {
  const [rows, setRows] = useState<Row[]>([
    { label: "Render Service", state: "unknown", status: "Checking..." },
    { label: "Discord Bot", state: "unknown", status: "Checking..." },
    { label: "Health Checker", state: "unknown", status: "Checking..." },
  ]);
  const [checkedAt, setCheckedAt] = useState<string | null>(null);

  const load = useCallback(async () => {
    const stamp = new Date().toLocaleTimeString();
    try {
      const res = await fetch(`${API_BASE}/api/status`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: StatusPayload = await res.json();

      const webOn = data.web?.status === "online";
      const dStatus = data.discord?.status ?? "unknown";
      const ka = data.keepalive;

      setRows([
        {
          label: "Render Service",
          state: webOn ? "on" : "off",
          status: webOn ? "Online" : "Degraded",
          detail: "answered GET /api/status",
        },
        {
          label: "Discord Bot",
          state:
            dStatus === "online" ? "on" : dStatus === "starting" ? "warn" : "off",
          status:
            dStatus === "online"
              ? "Online"
              : dStatus === "starting"
                ? "Starting"
                : "Offline",
          detail:
            typeof data.guilds === "number"
              ? `${data.guilds.toLocaleString()} guilds · ${(data.users ?? 0).toLocaleString()} users`
              : "gateway not ready - counts omitted",
        },
        {
          label: "Health Checker",
          state:
            ka?.result === "healthy" ? "on" : ka?.result ? "off" : "unknown",
          status:
            ka?.result === "healthy"
              ? "Healthy"
              : ka?.result
                ? ka.result
                : "Waiting",
          detail: ka?.last_checked
            ? `last check ${ka.last_checked}${
                ka.response_ms != null ? ` · ${ka.response_ms}ms` : ""
              }`
            : "no check yet",
        },
      ]);
      setCheckedAt(stamp);
    } catch (err: any) {
      setRows([
        {
          label: "Render Service",
          state: "off",
          status: "Unreachable",
          detail: err?.message || "fetch failed",
        },
        {
          label: "Discord Bot",
          state: "unknown",
          status: "Unknown",
          detail: "status endpoint not reachable",
        },
        {
          label: "Health Checker",
          state: "unknown",
          status: "Unknown",
          detail: "status endpoint not reachable",
        },
      ]);
      setCheckedAt(stamp);
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, REFRESH_MS);
    return () => clearInterval(id);
  }, [load]);

  return (
    <div className="space-y-4">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/[0.05] hover:border-red-500/20 transition-colors"
        >
          <div>
            <span className="text-xs font-bold text-slate-300">{row.label}</span>
            {row.detail && (
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-1">
                {row.detail}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className={`h-1.5 w-1.5 rounded-full ${DOT[row.state]}`} />
            <span
              className={`text-[9px] uppercase font-black tracking-widest ${TEXT[row.state]}`}
            >
              {row.status}
            </span>
          </div>
        </div>
      ))}
      <p className="text-[10px] text-slate-600 font-medium uppercase tracking-widest pt-1">
        {checkedAt
          ? `checked ${checkedAt} · refreshes every 30s`
          : "checking..."}
      </p>
    </div>
  );
}
