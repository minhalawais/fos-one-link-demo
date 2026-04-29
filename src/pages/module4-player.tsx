"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useMemo } from "react"

import { SceneInitiation } from "../components/scenes/module4/scene-initiation.tsx"
import { SceneTargeting } from "../components/scenes/module4/scene-targeting.tsx"
import { SceneDistribution } from "../components/scenes/module4/scene-distribution.tsx"
import { SceneResponses } from "../components/scenes/module4/scene-responses.tsx"
import { SceneReports } from "../components/scenes/module4/scene-reports.tsx"

import { SceneProgressiveShell } from "../components/common/SceneProgressiveShell.tsx"
import type { SceneConfig } from "../hooks/useProgressivePreloader.ts"

const SCENES: SceneConfig[] = [
  {
    name: "initiation",
    start: 0,
    end: 13,
    component: SceneInitiation,
    assets: [
      // Scene 1 intentionally kept minimal — bootstrapped during Module 3 playback
      // "/assets/module4/survey-create-ui.png",
    ],
  },
  {
    name: "targeting",
    start: 13,
    end: 46,
    component: SceneTargeting,
    assets: [
      // "/assets/module4/employee-targeting.png",
    ],
  },
  {
    name: "distribution",
    start: 46,
    end: 63,
    component: SceneDistribution,
    assets: [
      // "/assets/module4/distribution-channels.png",
    ],
  },
  {
    name: "responses",
    start: 63,
    end: 75,
    component: SceneResponses,
    assets: [
      // "/assets/module4/response-chart.png",
    ],
  },
  {
    name: "reports",
    start: 75,
    end: 115,
    component: SceneReports,
    assets: [
      // "/assets/module4/reports-dashboard.png",
    ],
  },
]

interface Module4PlayerProps {
  progress: number
}

export default function Module4Player({ progress }: Module4PlayerProps) {
  // Original used useMemo for scene stability — preserved exactly
  const currentScene = useMemo(() => {
    return SCENES.find((scene) => progress >= scene.start && progress < scene.end) ?? SCENES[SCENES.length - 1]
  }, [progress])

  const SceneComponent = currentScene.component

  return (
    <SceneProgressiveShell scenes={SCENES} progress={progress}>
      <div
        className="w-full h-full relative overflow-hidden font-sans select-none"
        style={{ backgroundColor: "#F5F5F7" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 z-10 overflow-hidden"
          >
            <SceneComponent isActive={true} progress={progress} />
          </motion.div>
        </AnimatePresence>
      </div>
    </SceneProgressiveShell>
  )
}