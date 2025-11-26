"use client"

import { AnimatePresence } from "framer-motion"


// Import Scenes (Retaining original imports)
import { SceneValidity } from "../components/scenes/module3/scene-validity.tsx"
import { SceneRCACAPAEvidence } from "../components/scenes/module3/scene-rca-capa-evidence.tsx"
import { SceneFOSVerification } from "../components/scenes/module3/scene-fos-verification.tsx"
import { SceneRework } from "../components/scenes/module3/scene-rework.tsx"
import { SceneClosure } from "../components/scenes/module3/scene-closure.tsx"
import { SceneInvestigation } from "../components/scenes/module3/scene-1-unprocessed.tsx"


const SCENES = [
  { name: "intro", start: 0, end: 23, component: SceneInvestigation },
  { name: "validity", start: 23, end: 37.9, component: SceneValidity },
  { name: "rootCause", start: 37.9, end: 80, component: SceneRCACAPAEvidence },
  { name: "verification", start: 80, end: 111, component: SceneFOSVerification },
  { name: "closure", start: 111.4, end: 122, component: SceneClosure },
]

interface Module3PlayerProps {
  progress: number
}

export default function Module3Player({ progress }: Module3PlayerProps) {
  const currentSceneConfig = SCENES.find((scene) => progress >= scene.start && progress < scene.end) || SCENES[0]
  const CurrentSceneComponent = currentSceneConfig.component

  return (
    <div className="w-full h-full bg-[#17161A] relative overflow-hidden font-sans select-none">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <CurrentSceneComponent key={currentSceneConfig.name} isActive={true} progress={progress} />
        </AnimatePresence>
      </div>
    </div>
  )
}
