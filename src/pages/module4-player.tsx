"use client"

import { AnimatePresence } from "framer-motion"

// Import scene components
import { SceneIntro } from "../components/scenes/module4/scene-intro.tsx"
import { SceneCreation } from "../components/scenes/module4/scene-creation.tsx"
import { SceneTargeting } from "../components/scenes/module4/scene-targeting.tsx"
import { SceneSampling } from "../components/scenes/module4/scene-sampling.tsx"
import { SceneInvitations } from "../components/scenes/module4/scene-invitations.tsx"
import { SceneResponses } from "../components/scenes/module4/scene-responses.tsx"
import { SceneReports } from "../components/scenes/module4/scene-reports.tsx"
import { SceneAI } from "../components/scenes/module4/scene-ai.tsx"

// Scene configuration matching the module4_script.json timestamps
const SCENES = [
  { name: "intro", start: 0, end: 9, component: SceneIntro },
  { name: "creation", start: 9, end: 17, component: SceneCreation },
  { name: "targeting", start: 17, end: 33, component: SceneTargeting },
  { name: "sampling", start: 33, end: 46, component: SceneSampling },
  { name: "invitations", start: 46, end: 63, component: SceneInvitations },
  { name: "responses", start: 63, end: 75, component: SceneResponses },
  { name: "reports", start: 75, end: 91, component: SceneReports },
  { name: "ai", start: 91, end: 115, component: SceneAI },
]

interface Module4PlayerProps {
  progress: number
}

export default function Module4Player({ progress }: Module4PlayerProps) {
  const currentScene = SCENES.find((scene) => progress >= scene.start && progress < scene.end) || SCENES[SCENES.length - 1]
  const SceneComponent = currentScene.component

  return (
    <div className="w-full h-full relative overflow-hidden font-sans select-none" style={{ backgroundColor: "#E5E1DA" }}>
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <SceneComponent
            key={currentScene.name}
            isActive={true}
            progress={progress}
          />
        </AnimatePresence>
      </div>
    </div>
  )
}