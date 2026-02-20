"use client"

import { AnimatePresence } from "framer-motion"
import { AssetPreloader } from "../components/common/AssetPreloader.tsx"

import { SceneIntro } from "../components/scenes/module2/scene-intro.tsx"
import SceneOmnichannel from "../components/scenes/module2/scene-omnichannel.tsx"
import { SceneComplaintFiling } from "../components/scenes/module2/scene-complaint-filing.tsx"
import { SceneReview } from "../components/scenes/module2/scene-review.tsx"
import { SceneTicket } from "../components/scenes/module2/scene-ticket.tsx"
import { SceneNotification } from "../components/scenes/module2/scene-notification.tsx"

const SCENES = [
  { name: "intro", start: 0, end: 5, component: SceneIntro },
  { name: "omnichannel", start: 5, end: 28, component: SceneOmnichannel },
  { name: "complaint-filing", start: 28, end: 77, component: SceneComplaintFiling },
  { name: "review", start: 77, end: 95, component: SceneReview },
  { name: "ticket", start: 95, end: 113, component: SceneTicket },
  { name: "notification", start: 113, end: 141, component: SceneNotification },
]

interface Module2PlayerProps {
  progress: number
}

export default function Module2Player({ progress }: Module2PlayerProps) {
  const currentSceneConfig = SCENES.find((scene) => progress >= scene.start && progress < scene.end) || SCENES[0]
  const CurrentSceneComponent = currentSceneConfig.component

  return (
    <AssetPreloader>
      <div className="w-full h-full bg-[#17161A] relative overflow-hidden font-sans select-none">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <CurrentSceneComponent key={currentSceneConfig.name} isActive={true} progress={progress} />
          </AnimatePresence>
        </div>
      </div>
    </AssetPreloader>
  )
}
