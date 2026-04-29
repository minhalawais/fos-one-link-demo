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

const SCENES: SceneConfig[] = [
  {
    name: "intro",
    start: 0,
    end: 5,
    component: SceneIntro,
    assets: [
      // Scene 1 intentionally kept minimal — bootstrapped during Module 1 playback
      // Add any image that appears immediately when this scene opens:
      // "/assets/module2/intro-bg.png",
    ],
  },
  {
    name: "omnichannel",
    start: 5,
    end: 28,
    component: SceneOmnichannel,
    assets: [
      // "/assets/module2/omnichannel-diagram.png",
      // "/assets/module2/channel-icons.png",
    ],
  },
  {
    name: "complaint-filing",
    start: 28,
    end: 77,
    component: SceneComplaintFiling,
    assets: [
      // "/assets/module2/complaint-form-mockup.png",
    ],
  },
  {
    name: "review",
    start: 77,
    end: 95,
    component: SceneReview,
    assets: [
      // "/assets/module2/review-screen.png",
    ],
  },
  {
    name: "ticket",
    start: 95,
    end: 113,
    component: SceneTicket,
    assets: [
      // "/assets/module2/ticket-ui.png",
    ],
  },
  {
    name: "notification",
    start: 113,
    end: 141,
    component: SceneNotification,
    assets: [
      // "/assets/module2/notification-mockup.png",
    ],
  },
]

interface Module2PlayerProps {
  progress: number
}

export default function Module2Player({ progress }: Module2PlayerProps) {
  const currentSceneConfig =
    SCENES.find((scene) => progress >= scene.start && progress < scene.end) ?? SCENES[0]

  const CurrentSceneComponent = currentSceneConfig.component

  return (
    <SceneProgressiveShell scenes={SCENES} progress={progress}>
      <div className="w-full h-full bg-[#17161A] relative overflow-hidden font-sans select-none">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <CurrentSceneComponent
              key={currentSceneConfig.name}
              isActive={true}
              progress={progress}
            />
          </AnimatePresence>
        </div>
      </div>
    </SceneProgressiveShell>
  )
}