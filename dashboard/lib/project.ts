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

/**
 * Central project/branding configuration for the dashboard.
 * Every link and credit shown in the UI should come from here so that
 * project name, creator and Discord invite stay in sync.
 */
export const PROJECT = {
  /** Bot / project name (env override keeps Render + local consistent). */
  name: process.env.NEXT_PUBLIC_BRAND_NAME || "Support",
  /** Short monogram used in the logo tile. */
  nameWord: process.env.NEXT_PUBLIC_BRAND_NAME_WORD || "SW",
  /** Project creator. */
  creator: "OGADI",
  /** Project type. */
  type: "Discord Support Bot + Web Dashboard",
  /** One line description. */
  tagline:
    "A feature-rich Discord support bot paired with a modern web dashboard for managing servers, security and community tools.",
  /** Discord community invite — used by every "Join Discord" button. */
  discordInvite: "https://discord.gg/UVRWygSpJq",
  /** OAuth URL used to add the bot to a server. */
  botInviteUrl:
    "https://discord.com/oauth2/authorize?client_id=1396114795102470196&permissions=8&integration_type=0&scope=bot+applications.commands",
  /** Internal documentation route. */
  docsUrl: "/docs",
  /** Creator goals shown on the About page. */
  goals: [
    "Build a reliable and useful Discord support bot.",
    "Make server management easier for administrators.",
    "Improve the dashboard's usability and design.",
    "Continue improving existing commands and features.",
    "Build a helpful community around the project.",
    "Keep the project maintainable, secure, and easy to configure.",
  ],
  /** Feature highlights shown on the About page. */
  features: [
    "Anti-nuke and auto-mod security suite",
    "Tickets, verification and welcome systems",
    "Leveling, giveaways and invite tracking",
    "Lavalink music, mini-games and utility commands",
    "FastAPI backend with a per-guild REST API",
    "Discord OAuth2 dashboard deployed on Render",
  ],
} as const;

export type Project = typeof PROJECT;
