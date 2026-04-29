/**
 * SCENE ASSET REGISTRY
 * ─────────────────────────────────────────────────────────────
 * Each scene declares ONLY the assets it needs.
 * This is the single source of truth for the progressive loader.
 *
 * CRITICAL RULE: Scene 1 (index 0) of every module should have
 * ZERO or near-zero assets — they get preloaded during app idle time,
 * so there must be nothing heavy here.
 *
 * For every other scene: list assets that appear during that scene.
 * The progressive loader will have them ready before the scene starts.
 */

export interface SceneWithAssets {
  name: string;
  start: number;
  end: number;
  component: React.ComponentType<any>;
  assets?: string[]; // Only assets this scene needs
}

// ─── MODULE 1 ────────────────────────────────────────────────
export const MODULE1_SCENES: SceneWithAssets[] = [
  {
    name: "hero",
    start: 0,
    end: 2,
    component: null!, // Replace with actual SceneHero import in player
    assets: [
      "/assets/images/FOS-01.png", // Tiny logo — loads in <100ms
    ],
  },
  {
    name: "upload",
    start: 2,
    end: 22,
    component: null!,
    assets: [
      // Add upload scene images here
      // "/assets/upload/company-logo.png",
    ],
  },
  {
    name: "sms",
    start: 22,
    end: 58,
    component: null!,
    assets: [
      // "/assets/sms/phone-mockup.png",
    ],
  },
  {
    name: "card",
    start: 58,
    end: 83,
    component: null!,
    assets: [],
  },
  {
    name: "officers",
    start: 83,
    end: 101,
    component: null!,
    assets: [
      // "/assets/avatars/officer-1.png",
      // "/assets/avatars/officer-2.png",
    ],
  },
  {
    name: "training",
    start: 101,
    end: 120,
    component: null!,
    assets: [],
  },
  {
    name: "portal",
    start: 120,
    end: 134,
    component: null!,
    assets: [],
  },
  {
    name: "io_training",
    start: 134,
    end: 149,
    component: null!,
    assets: [
      "/assets/avatars/male_io_training.png",
    ],
  },
  {
    name: "closing",
    start: 149,
    end: 152,
    component: null!,
    assets: [],
  },
];

// ─── MODULE 2 ────────────────────────────────────────────────
export const MODULE2_SCENES: SceneWithAssets[] = [
  {
    name: "intro",
    start: 0,
    end: 5,
    component: null!,
    assets: [], // Keep scene 1 empty — pre-loaded during module 1 playback
  },
  {
    name: "omnichannel",
    start: 5,
    end: 28,
    component: null!,
    assets: [],
  },
  {
    name: "complaint-filing",
    start: 28,
    end: 77,
    component: null!,
    assets: [],
  },
  {
    name: "review",
    start: 77,
    end: 95,
    component: null!,
    assets: [],
  },
  {
    name: "ticket",
    start: 95,
    end: 113,
    component: null!,
    assets: [],
  },
  {
    name: "notification",
    start: 113,
    end: 141,
    component: null!,
    assets: [],
  },
];

// ─── MODULE 3 ────────────────────────────────────────────────
export const MODULE3_SCENES: SceneWithAssets[] = [
  { name: "intro", start: 0, end: 7, component: null!, assets: [] },
  { name: "unprocessed", start: 7, end: 20, component: null!, assets: [] },
  { name: "inProcess", start: 20, end: 28, component: null!, assets: [] },
  { name: "rootCause", start: 29, end: 113, component: null!, assets: [] },
  { name: "verification", start: 113, end: 163, component: null!, assets: [] },
  { name: "closure", start: 163, end: 177, component: null!, assets: [] },
];

// ─── MODULE 4 ────────────────────────────────────────────────
export const MODULE4_SCENES: SceneWithAssets[] = [
  { name: "initiation", start: 0, end: 13, component: null!, assets: [] },
  { name: "targeting", start: 13, end: 46, component: null!, assets: [] },
  { name: "distribution", start: 46, end: 63, component: null!, assets: [] },
  { name: "responses", start: 63, end: 75, component: null!, assets: [] },
  { name: "reports", start: 75, end: 115, component: null!, assets: [] },
];

// ─── MODULE 5 ────────────────────────────────────────────────
export const MODULE5_SCENES: SceneWithAssets[] = [
  { name: "intro", start: 0, end: 7, component: null!, assets: [] },
  { name: "unified_dashboard", start: 7, end: 170, component: null!, assets: [] },
  { name: "conclusion", start: 170, end: 180, component: null!, assets: [] },
];

// ─── REGISTRY (used by bridge preloader) ─────────────────────
// Maps module index → first scene's assets (what to preload before module starts)
export const MODULE_BOOTSTRAP_ASSETS: Record<number, string[]> = {
  1: MODULE1_SCENES[0].assets ?? [],
  2: MODULE2_SCENES[0].assets ?? [],
  3: MODULE3_SCENES[0].assets ?? [],
  4: MODULE4_SCENES[0].assets ?? [],
  5: MODULE5_SCENES[0].assets ?? [],
};

// All assets for a given module (for exhaustive background preload)
export const ALL_MODULE_ASSETS: Record<number, string[]> = {
  1: MODULE1_SCENES.flatMap((s) => s.assets ?? []),
  2: MODULE2_SCENES.flatMap((s) => s.assets ?? []),
  3: MODULE3_SCENES.flatMap((s) => s.assets ?? []),
  4: MODULE4_SCENES.flatMap((s) => s.assets ?? []),
  5: MODULE5_SCENES.flatMap((s) => s.assets ?? []),
};
