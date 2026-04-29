"use client"

import { AnimatePresence } from "framer-motion"

import { SceneRCACAPAEvidence } from "../components/scenes/module3/scene-rca-capa-evidence.tsx"
import { SceneFOSVerification } from "../components/scenes/module3/scene-fos-verification.tsx"
import { SceneClosure } from "../components/scenes/module3/scene-closure.tsx"
import { SceneIntro } from "../components/scenes/module3/scene-intro.tsx"
import { SceneInvestigation } from "../components/scenes/module3/scene-1-unprocessed.tsx"
import { Scene2InProcess } from "../components/scenes/module3/scene-2-in-process.tsx"

import { SceneProgressiveShell } from "../components/common/SceneProgressiveShell.tsx"
import type { SceneConfig } from "../hooks/useProgressivePreloader.ts"

const SCENES: SceneConfig[] = [
  {
    name: "intro",
    start: 0,
    end: 7,
    component: SceneIntro,
    assets: [
      // Scene 1 intentionally kept minimal — bootstrapped during Module 2 playback
      // "/assets/module3/intro-bg.png",
    ],
  },
  {
    name: "unprocessed",
    start: 7,
    end: 20,
    component: SceneInvestigation,
    assets: [
      // "/assets/module3/complaint-queue.png",
    ],
  },
  {
    name: "inProcess",
    start: 20,
    end: 28,
    component: Scene2InProcess,
    assets: [
      // "/assets/module3/in-process-ui.png",
    ],
  },
  {
    name: "rootCause",
    start: 29,
    end: 113,
    component: SceneRCACAPAEvidence,
    assets: [
      // This is a long scene (84s) — list any images shown in the first few seconds:
      // "/assets/module3/rca-diagram.png",
      // "/assets/module3/capa-form.png",
    ],
  },
  {
    name: "verification",
    start: 113,
    end: 163,
    component: SceneFOSVerification,
    assets: [
      // "/assets/module3/verification-checklist.png",
    ],
  },
  {
    name: "closure",
    start: 163,
    end: 177,
    component: SceneClosure,
    assets: [
      // "/assets/module3/closure-stamp.png",
    ],
  },
]

interface Module3PlayerProps {
  progress: number
}

export default function Module3Player({ progress }: Module3PlayerProps) {
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