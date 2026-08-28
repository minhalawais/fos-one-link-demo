"use client"

import { AnimatePresence, motion } from "framer-motion"

import { SceneInitiation } from "../components/scenes/module4/scene-initiation.tsx"
import { SceneTargeting } from "../components/scenes/module4/scene-targeting.tsx"
import { SceneDistribution } from "../components/scenes/module4/scene-distribution.tsx"
import { SceneResponses } from "../components/scenes/module4/scene-responses.tsx"
import { SceneReports } from "../components/scenes/module4/scene-reports.tsx"

import { SceneProgressiveShell } from "../components/common/SceneProgressiveShell.tsx"
import type { SceneConfig } from "../hooks/useProgressivePreloader.ts"

const SCENES_EN: SceneConfig[] = [
  {
    name: "initiation",
    start: 0,
    end: 13,
    component: SceneInitiation,
    assets: [],
  },
  {
    name: "targeting",
    start: 13,
    end: 46,
    component: SceneTargeting,
    assets: [],
  },
  {
    name: "distribution",
    start: 46,
    end: 63,
    component: SceneDistribution,
    assets: [],
  },
  {
    name: "responses",
    start: 63,
    end: 75,
    component: SceneResponses,
    assets: [],
  },
  {
    name: "reports",
    start: 75,
    end: 116,
    component: SceneReports,
    assets: [],
  },
]

// Urdu timeline configuration scaled to match Module 4 Script Urdu.txt (total 175s)
const SCENES_UR: SceneConfig[] = [
  {
    name: "initiation",
    start: 0,
    end: 29,
    component: SceneInitiation,
    assets: [],
  },
  {
    name: "targeting",
    start: 29,
    end: 69,
    component: SceneTargeting,
    assets: [],
  },
  {
    name: "distribution",
    start: 69,
    end: 90,
    component: SceneDistribution,
    assets: [],
  },
  {
    name: "responses",
    start: 90,
    end: 110,
    component: SceneResponses,
    assets: [],
  },
  {
    name: "reports",
    start: 110,
    end: 175,
    component: SceneReports,
    assets: [],
  },
]

interface Module4PlayerProps {
  progress: number
  language?: "en" | "ur"
}

export default function Module4Player({ progress, language = "en" }: Module4PlayerProps) {
  const isUrdu = language === "ur"
  const scenesList = isUrdu ? SCENES_UR : SCENES_EN
  const enScenesList = SCENES_EN

  const currentSceneIndex = scenesList.findIndex(
    (scene) => progress >= scene.start && progress < scene.end
  )

  const currentScene =
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

  const SceneComponent = currentScene.component

  return (
    <SceneProgressiveShell scenes={scenesList} progress={progress}>
      <div
        className="w-full h-full relative overflow-hidden font-sans select-none"
        style={{ backgroundColor: "#F5F5F7" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 z-10 overflow-hidden"
          >
            <SceneComponent isActive={true} progress={scaledProgress} />
          </motion.div>
        </AnimatePresence>
      </div>
    </SceneProgressiveShell>
  )
}