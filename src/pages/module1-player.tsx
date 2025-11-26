"use client"
import { AnimatePresence } from "framer-motion"

import { SceneHero } from "../components/scenes/module1/scene-hero.tsx"
import { SceneUpload } from "../components/scenes/module1/scene-upload.tsx"
import { SceneSMS } from "../components/scenes/module1/scene-sms.tsx"
import { SceneCard } from "../components/scenes/module1/scene-card.tsx"
import { SceneOfficers } from "../components/scenes/module1/scene-officers.tsx"
import { ScenePortal } from "../components/scenes/module1/scene-portal.tsx"
import { SceneTraining } from "../components/scenes/module1/scene-training.tsx"
import { SceneClosing } from "../components/scenes/module1/scene-closing.tsx"

const SCENES = [
  { name: "hero", start: 0, end: 3, component: SceneHero },
  { name: "upload", start: 3, end: 14, component: SceneUpload },
  { name: "sms", start: 14, end: 28, component: SceneSMS },
  { name: "card", start: 28, end: 45, component: SceneCard },
  { name: "officers", start: 45, end: 60, component: SceneOfficers },
  { name: "portal", start: 60, end: 72, component: ScenePortal },
  { name: "training", start: 72, end: 95, component: SceneTraining },
  { name: "closing", start: 95, end: 102, component: SceneClosing },
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
