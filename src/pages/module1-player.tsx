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
const SCENES_EN: SceneConfig[] = [
  {
    name: "hero",
    start: 0,
    end: 2,
    component: SceneHero,
    assets: [
      "/assets/images/FOS-01.png",
    ],
  },
  {
    name: "upload",
    start: 2,
    end: 22,
    component: SceneUpload,
    assets: [],
  },
  {
    name: "sms",
    start: 22,
    end: 58,
    component: SceneSMS,
    assets: [],
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
    assets: [],
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
    end: 155,
    component: SceneClosing,
    assets: [],
  },
];

// Urdu timeline configuration scaled to match Module 1 Script Urdu.txt (total 218s)
const SCENES_UR: SceneConfig[] = [
  {
    name: "hero",
    start: 0,
    end: 3,
    component: SceneHero,
    assets: [
      "/assets/images/FOS-01.png",
    ],
  },
  {
    name: "upload",
    start: 3,
    end: 34,
    component: SceneUpload,
    assets: [],
  },
  {
    name: "sms",
    start: 34,
    end: 72,
    component: SceneSMS,
    assets: [],
  },
  {
    name: "card",
    start: 72,
    end: 108,
    component: SceneCard,
    assets: [],
  },
  {
    name: "officers",
    start: 108,
    end: 135,
    component: SceneOfficers,
    assets: [],
  },
  {
    name: "training",
    start: 135,
    end: 165,
    component: SceneTraining,
    assets: [],
  },
  {
    name: "portal",
    start: 165,
    end: 185,
    component: ScenePortal,
    assets: [],
  },
  {
    name: "io_training",
    start: 185,
    end: 212,
    component: SceneIOTraining,
    assets: [
      "/assets/avatars/male_io_training.png",
    ],
  },
  {
    name: "closing",
    start: 212,
    end: 218,
    component: SceneClosing,
    assets: [],
  },
];

// ─── Player ───────────────────────────────────────────────────────────────────

interface Module1PlayerProps {
  progress: number;
  language?: "en" | "ur";
}

export default function Module1Player({ progress, language = "en" }: Module1PlayerProps) {
  const isUrdu = language === "ur";
  const scenesList = isUrdu ? SCENES_UR : SCENES_EN;
  const enScenesList = SCENES_EN;

  const currentSceneIndex = scenesList.findIndex(
    (scene) => progress >= scene.start && progress < scene.end
  );

  const currentSceneConfig =
    currentSceneIndex !== -1 ? scenesList[currentSceneIndex] : scenesList[0];

  // Calculate normalized relative progress within current scene, then map back to English scene duration
  // so internal animations in every subcomponent automatically scale and slow down smoothly
  let scaledProgress = progress;
  if (isUrdu && currentSceneIndex !== -1) {
    const urScene = scenesList[currentSceneIndex];
    const enScene = enScenesList[currentSceneIndex] || urScene;
    const urSceneDuration = Math.max(0.1, urScene.end - urScene.start);
    const enSceneDuration = Math.max(0.1, enScene.end - enScene.start);
    const localProgressRatio = Math.min(1, Math.max(0, (progress - urScene.start) / urSceneDuration));
    scaledProgress = enScene.start + localProgressRatio * enSceneDuration;
  }

  const CurrentSceneComponent = currentSceneConfig.component;

  return (
    <SceneProgressiveShell scenes={scenesList} progress={progress}>
      <div className="w-full h-full bg-[#17161A] relative overflow-hidden font-sans select-none">
        <div className="absolute inset-0 z-0">
          <AnimatePresence>
            <CurrentSceneComponent
              key={currentSceneConfig.name}
              isActive={true}
              progress={scaledProgress}
            />
          </AnimatePresence>
        </div>
      </div>
    </SceneProgressiveShell>
  );
}