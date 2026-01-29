"use client"

import { AnimatePresence } from "framer-motion"

// Import scene components - matching new 6-scene structure
import { SceneInitiation } from "../components/scenes/module4/scene-initiation.tsx"
import { SceneTargeting } from "../components/scenes/module4/scene-targeting.tsx"
import { SceneResponses } from "../components/scenes/module4/scene-responses.tsx"
import { SceneReports } from "../components/scenes/module4/scene-reports.tsx"
import { SceneAI } from "../components/scenes/module4/scene-ai.tsx"
import { SceneDistribution } from "../components/scenes/module4/scene-distribution.tsx" // [NEW]

// Scene configuration matching module-data.ts timestamps
const SCENES = [
  { name: "initiation", start: 0, end: 26, component: SceneInitiation },
  { name: "targeting", start: 26, end: 46, component: SceneTargeting },
  { name: "distribution", start: 46, end: 63, component: SceneDistribution }, // Updated for 46-63s
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
    <div className="w-full h-full relative overflow-hidden font-sans select-none" style={{ backgroundColor: "#FFFFFF" }}>
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