"use client"

import { AnimatePresence } from "framer-motion"

import { SceneIntro } from "../components/scenes/module2/scene-intro.tsx"
import SceneOmnichannel from "../components/scenes/module2/scene-omnichannel.tsx"
import { SceneComplaintFiling } from "../components/scenes/module2/scene-complaint-filing.tsx"
import { SceneReview } from "../components/scenes/module2/scene-review.tsx"
import { SceneTicket } from "../components/scenes/module2/scene-ticket.tsx"
import { SceneNotification } from "../components/scenes/module2/scene-notification.tsx"

import { SceneProgressiveShell } from "../components/common/SceneProgressiveShell.tsx"
import type { SceneConfig } from "../hooks/useProgressivePreloader.ts"

const SCENES_EN: SceneConfig[] = [
  {
    name: "intro",
    start: 0,
    end: 5,
    component: SceneIntro,
    assets: [],
  },
  {
    name: "omnichannel",
    start: 5,
    end: 28,
    component: SceneOmnichannel,
    assets: [],
  },
  {
    name: "complaint-filing",
    start: 28,
    end: 77,
    component: SceneComplaintFiling,
    assets: [],
  },
  {
    name: "review",
    start: 77,
    end: 95,
    component: SceneReview,
    assets: [],
  },
  {
    name: "ticket",
    start: 95,
    end: 113,
    component: SceneTicket,
    assets: [],
  },
  {
    name: "notification",
    start: 113,
    end: 141,
    component: SceneNotification,
    assets: [],
  },
]

// Urdu timeline configuration scaled to match Module 2 Script Urdu.txt (total 202s)
const SCENES_UR: SceneConfig[] = [
  {
    name: "intro",
    start: 0,
    end: 6,
    component: SceneIntro,
    assets: [],
  },
  {
    name: "omnichannel",
    start: 6,
    end: 32,
    component: SceneOmnichannel,
    assets: [],
  },
  {
    name: "complaint-filing",
    start: 32,
    end: 118,
    component: SceneComplaintFiling,
    assets: [],
  },
  {
    name: "review",
    start: 118,
    end: 147,
    component: SceneReview,
    assets: [],
  },
  {
    name: "ticket",
    start: 147,
    end: 169,
    component: SceneTicket,
    assets: [],
  },
  {
    name: "notification",
    start: 169,
    end: 202,
    component: SceneNotification,
    assets: [],
  },
]

interface Module2PlayerProps {
  progress: number
  language?: "en" | "ur"
}

export default function Module2Player({ progress, language = "en" }: Module2PlayerProps) {
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