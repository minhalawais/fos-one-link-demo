/**
 * module1-player.tsx — UPDATED with Progressive Preloading
 * ─────────────────────────────────────────────────────────────────────────────
 * Changes from original:
 *   1. SCENES array now includes `assets` per scene (not per module)
 *   2. AssetPreloader replaced by SceneProgressiveShell
 *   3. No more blocking "preparing scene assets..." screen
 *
 * The progressive loader ensures:
 *   - Scene 1 (hero): assets were preloaded at app boot during idle time → instant
 *   - Scene 2+: assets loaded during the previous scene's playback → instant
 *   - The safety-net loader is only visible if assets haven't loaded, which
 *     should be <200ms in worst case (hero has 1 small image)
 */

"use client";

import { AnimatePresence } from "framer-motion";

import { SceneHero } from "../components/scenes/module1/scene-hero.tsx";
import { SceneUpload } from "../components/scenes/module1/scene-upload.tsx";
import { SceneSMS } from "../components/scenes/module1/scene-sms.tsx";
import { SceneCard } from "../components/scenes/module1/scene-card.tsx";
import SceneOfficers from "../components/scenes/module1/scene-officers.tsx";
import { ScenePortal } from "../components/scenes/module1/scene-portal.tsx";
import SceneTraining from "../components/scenes/module1/scene-training.tsx";
import SceneIOTraining from "../components/scenes/module1/scene-io-training.tsx";
import SceneClosing from "../components/scenes/module1/scene-closing.tsx";

import { SceneProgressiveShell } from "../components/common/SceneProgressiveShell.tsx";
import type { SceneConfig } from "../hooks/useProgressivePreloader.tsx";

// ─── SCENES — with per-scene asset declarations ───────────────────────────────
//
// IMPORTANT: Only list assets that are visually CRITICAL for this scene.
// Images used as backgrounds, hero visuals, avatars = yes.
// Assets that only appear at second 10+ of a 20-second scene = can omit
// (they'll be fetched by the browser naturally when the <img> renders).
//
const SCENES: SceneConfig[] = [
  {
    name: "hero",
    start: 0,
    end: 2,
    component: SceneHero,
    assets: [
      "/assets/images/FOS-01.png", // The only asset in this scene
    ],
  },
  {
    name: "upload",
    start: 2,
    end: 22,
    component: SceneUpload,
    assets: [
      // Add any images rendered immediately when upload scene starts
      // e.g. "/assets/upload/hrms-logo.png",
    ],
  },
  {
    name: "sms",
    start: 22,
    end: 58,
    component: SceneSMS,
    assets: [
      // e.g. "/assets/sms/phone-frame.png",
    ],
  },
  {
    name: "card",
    start: 58,
    end: 83,
    component: SceneCard,
    assets: [],
  },
  {
    name: "officers",
    start: 83,
    end: 101,
    component: SceneOfficers,
    assets: [
      // Officer avatar images
      // "/assets/avatars/officer-male.png",
      // "/assets/avatars/officer-female.png",
    ],
  },
  {
    name: "training",
    start: 101,
    end: 120,
    component: SceneTraining,
    assets: [],
  },
  {
    name: "portal",
    start: 120,
    end: 134,
    component: ScenePortal,
    assets: [],
  },
  {
    name: "io_training",
    start: 134,
    end: 149,
    component: SceneIOTraining,
    assets: [
      "/assets/avatars/male_io_training.png",
    ],
  },
  {
    name: "closing",
    start: 149,
    end: 152,
    component: SceneClosing,
    assets: [],
  },
];

// ─── Player ───────────────────────────────────────────────────────────────────

interface Module1PlayerProps {
  progress: number;
}

export default function Module1Player({ progress }: Module1PlayerProps) {
  const currentSceneConfig =
    SCENES.find((scene) => progress >= scene.start && progress < scene.end) ??
    SCENES[0];

  const CurrentSceneComponent = currentSceneConfig.component;

  return (
    // SceneProgressiveShell replaces AssetPreloader.
    // It loads assets progressively — current scene first, then lookahead.
    <SceneProgressiveShell scenes={SCENES} progress={progress}>
      <div className="w-full h-full bg-[#17161A] relative overflow-hidden font-sans select-none">
        <div className="absolute inset-0 z-0">
          <AnimatePresence>
            <CurrentSceneComponent
              key={currentSceneConfig.name}
              isActive={true}
              progress={progress}
            />
          </AnimatePresence>
        </div>
      </div>
    </SceneProgressiveShell>
  );
}