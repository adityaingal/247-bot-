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

"use client";

import React from "react";
import Link from "next/link";
import {
  Bot,
  ChevronLeft,
  User,
  Target,
  Sparkles,
    MessagesSquare,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROJECT } from "@/lib/project";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-red-500/[0.03] blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-5%] w-[35%] h-[35%] bg-indigo-500/[0.03] blur-[120px] rounded-full" />
      </div>

      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.03] bg-[#020617]/80 backdrop-blur-3xl px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="h-9 w-9 rounded-xl bg-red-600 flex items-center justify-center mr-4">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white font-outfit uppercase tracking-tighter">
            {PROJECT.name}
          </span>
        </Link>
        <Link href="/">
          <Button variant="ghost" className="text-slate-400 hover:text-white gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </nav>

      <main className="relative z-10 pt-40 pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest mb-8">
            <User className="h-3 w-3" />
            About the Creator
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white font-outfit tracking-tighter uppercase mb-6 italic">
            {PROJECT.creator.split(" ")[0]}{" "}
            <span className="text-red-500 not-italic">{PROJECT.creator.split(" ").slice(1).join(" ")}</span>
          </h1>

          <p className="text-slate-500 font-medium max-w-2xl mb-12 leading-relaxed">
            Creator of {PROJECT.name} — {PROJECT.type}.
          </p>

          {/* Creator + project card */}
          <div className="glass border-white/5 rounded-[40px] p-10 md:p-16 space-y-12">
            <section className="space-y-6">
              <div className="flex items-center gap-4 text-white">
                <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500">
                  <User className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold font-outfit uppercase tracking-tight">The Creator</h2>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-800 flex items-center justify-center border border-white/10 shadow-lg shadow-red-500/20 shrink-0">
                  <span className="text-2xl font-black text-white font-outfit">
                    {PROJECT.creator
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-xl font-bold text-white font-outfit">{PROJECT.creator}</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500/80 mt-1">
                    Creator &amp; Maintainer
                  </p>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed font-medium">{PROJECT.tagline}</p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a href={PROJECT.discordInvite} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full sm:w-auto rounded-2xl px-8 h-12 font-black uppercase tracking-widest text-[11px] gap-2 bg-red-600 text-white hover:bg-red-500 border-none shadow-lg shadow-red-500/20">
                    <MessagesSquare className="h-4 w-4" />
                    Join our Discord
                  </Button>
                </a>
                <Link href={PROJECT.docsUrl}>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto rounded-2xl px-8 h-12 font-black uppercase tracking-widest text-[11px] gap-2 border-white/10 bg-white/[0.02] text-white hover:bg-white/[0.05]"
                  >
                    <FileText className="h-4 w-4" />
                    Documentation
                  </Button>
                </Link>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4 text-white">
                <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500">
                  <Target className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold font-outfit uppercase tracking-tight">Creator Goals</h2>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROJECT.goals.map((goal) => (
                  <li
                    key={goal}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-red-500/20 transition-colors"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)] shrink-0" />
                    <span className="text-slate-400 text-sm font-medium leading-relaxed">{goal}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4 text-white">
                <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-red-500">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold font-outfit uppercase tracking-tight">Project Features</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROJECT.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-red-500/20 transition-colors group"
                  >
                    <span className="text-slate-300 text-sm font-bold">{feature}</span>
                    <ArrowUpRight className="h-4 w-4 text-slate-600 group-hover:text-red-500 transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            </section>

            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <p className="text-[10px] font-black uppercase text-slate-600 tracking-[0.4em]">
                {PROJECT.name} {"//"} Created by {PROJECT.creator}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={PROJECT.discordInvite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-black uppercase text-red-500/80 tracking-[0.3em] hover:text-red-500 transition-colors"
                >
                  Support Server
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
