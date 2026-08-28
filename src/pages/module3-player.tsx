"use client"

import { AnimatePresence } from "framer-motion"

import { SceneRCACAPAEvidence } from "../components/scenes/module3/scene-rca-capa-evidence.tsx"
import { SceneFOSVerification } from "../components/scenes/module3/scene-fos-verification.tsx"
import { SceneClosure } from "../components/scenes/module3/scene-closure.tsx"
import { SceneIntro } from "../components/scenes/module3/scene-intro.tsx"
import { SceneInvestigation } from "../components/scenes/module3/scene-1-unprocessed.tsx"
import { Scene2InProcess } from "../components/scenes/module3/scene-2-in-process.tsx"

import { SceneProgressiveShell } from "../components/common/SceneProgressiveShell.tsx"
import type { SceneConfig } from "../hooks/useProgressivePreloader.ts"

const SCENES_EN: SceneConfig[] = [
  {
    name: "intro",
    start: 0,
    end: 7,
    component: SceneIntro,
    assets: [],
  },
  {
    name: "unprocessed",
    start: 7,
    end: 20,
    component: SceneInvestigation,
    assets: [],
  },
  {
    name: "inProcess",
    start: 20,
    end: 29,
    component: Scene2InProcess,
    assets: [],
  },
  {
    name: "rootCause",
    start: 29,
    end: 113,
    component: SceneRCACAPAEvidence,
    assets: [],
  },
  {
    name: "verification",
    start: 113,
    end: 163,
    component: SceneFOSVerification,
    assets: [],
  },
  {
    name: "closure",
    start: 163,
    end: 176,
    component: SceneClosure,
    assets: [],
  },
]

// Urdu timeline configuration scaled to match Module 3 Script Urdu.txt (total 274s)
const SCENES_UR: SceneConfig[] = [
  {
    name: "intro",
    start: 0,
    end: 8,
    component: SceneIntro,
    assets: [],
  },
  {
    name: "unprocessed",
    start: 8,
    end: 15,
    component: SceneInvestigation,
    assets: [],
  },
  {
    name: "inProcess",
    start: 15,
    end: 39,
    component: Scene2InProcess,
    assets: [],
  },
  {
    name: "rootCause",
    start: 39,
    end: 182,
    component: SceneRCACAPAEvidence,
    assets: [],
  },
  {
    name: "verification",
    start: 182,
    end: 253,
    component: SceneFOSVerification,
    assets: [],
  },
  {
    name: "closure",
    start: 253,
    end: 274,
    component: SceneClosure,
    assets: [],
  },
]

interface Module3PlayerProps {
  progress: number
  language?: "en" | "ur"
}

export default function Module3Player({ progress, language = "en" }: Module3PlayerProps) {
  const isUrdu = language === "ur"
  const scenesList = isUrdu ? SCENES_UR : SCENES_EN
  const enScenesList = SCENES_EN

  const currentSceneIndex = scenesList.findIndex(
    (scene) => progress >= scene.start && progress < scene.end
  )

  const currentSceneConfig =
    currentSceneIndex !== -1 ? scenesList[currentSceneIndex] : scenesList[0]

  // Calculate normalized relative progress within current scene, then map back to English scene duration
  // so internal animations in every subcomponent automatically scale and slow down smoothly
  let scaledProgress = progress
  if (isUrdu && currentSceneIndex !== -1) {
    const urScene = scenesList[currentSceneIndex]
    const enScene = enScenesList[currentSceneIndex] || urScene
    const urSceneDuration = Math.max(0.1, urScene.end - urScene.start)
    const enSceneDuration = Math.max(0.1, enScene.end - enScene.start)
    const localProgressRatio = Math.min(1, Math.max(0, (progress - urScene.start) / urSceneDuration))
    scaledProgress = enScene.start + localProgressRatio * enSceneDuration
  }

  const CurrentSceneComponent = currentSceneConfig.component

  return (
    <SceneProgressiveShell scenes={scenesList} progress={progress}>
      <div className="w-full h-full bg-[#17161A] relative overflow-hidden font-sans select-none">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <CurrentSceneComponent
              key={currentSceneConfig.name}
              isActive={true}
              progress={scaledProgress}
            />
          </AnimatePresence>
        </div>
      </div>
    </SceneProgressiveShell>
  )
}