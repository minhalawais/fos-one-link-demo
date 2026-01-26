"use client"
import { AnimatePresence } from "framer-motion"

import { SceneHero } from "../components/scenes/module1/scene-hero.tsx"
import { SceneUpload } from "../components/scenes/module1/scene-upload.tsx"
import { SceneSMS } from "../components/scenes/module1/scene-sms.tsx"
import { SceneCard } from "../components/scenes/module1/scene-card.tsx"
import SceneOfficers from "../components/scenes/module1/scene-officers.tsx"
import { ScenePortal } from "../components/scenes/module1/scene-portal.tsx"
import SceneTraining from "../components/scenes/module1/scene-training.tsx"
import SceneIOTraining from "../components/scenes/module1/scene-io-training.tsx" // Import new scene
import SceneClosing from "../components/scenes/module1/scene-closing.tsx"

const SCENES = [
  { name: "hero", start: 0, end: 2, component: SceneHero },
  { name: "upload", start: 2, end: 22, component: SceneUpload },
  { name: "sms", start: 22, end: 58, component: SceneSMS },
  { name: "card", start: 58, end: 83, component: SceneCard },
  { name: "officers", start: 83, end: 101, component: SceneOfficers },
  { name: "training", start: 101, end: 120, component: SceneTraining }, // Training first
  { name: "portal", start: 120, end: 134, component: ScenePortal }, // Then Portal
  { name: "io_training", start: 134, end: 149, component: SceneIOTraining },
  { name: "closing", start: 149, end: 152, component: SceneClosing },
]

interface Module1PlayerProps {
  progress: number
}

export default function Module1Player({ progress }: Module1PlayerProps) {
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