"use client"

import { AnimatePresence } from "framer-motion"


// Import Scenes (Retaining original imports)
import { SceneValidity } from "../components/scenes/module3/scene-validity.tsx"
import { SceneRCACAPAEvidence } from "../components/scenes/module3/scene-rca-capa-evidence.tsx"
import { SceneFOSVerification } from "../components/scenes/module3/scene-fos-verification.tsx"
import { SceneClosure } from "../components/scenes/module3/scene-closure.tsx"
import { SceneInvestigation } from "../components/scenes/module3/scene-1-unprocessed.tsx"
import { Scene2InProcess } from "../components/scenes/module3/scene-2-in-process.tsx"

const SCENES = [
  { name: "intro", start: 0, end: 13, component: SceneInvestigation },
  { name: "inProcess", start: 13, end: 28, component: Scene2InProcess },
  { name: "rootCause", start: 29, end: 113, component: SceneRCACAPAEvidence },
  { name: "verification", start: 113, end: 163, component: SceneFOSVerification },
  { name: "closure", start: 163, end: 177, component: SceneClosure },
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
