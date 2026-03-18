"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useMemo } from "react"

// Import scene components
import { SceneInitiation } from "../components/scenes/module4/scene-initiation.tsx"
import { SceneTargeting } from "../components/scenes/module4/scene-targeting.tsx"
import { SceneDistribution } from "../components/scenes/module4/scene-distribution.tsx"
import { SceneResponses } from "../components/scenes/module4/scene-responses.tsx"
import { SceneReports } from "../components/scenes/module4/scene-reports.tsx"
import { AssetPreloader } from "../components/common/AssetPreloader.tsx"
import { MODULE_ASSET_CONFIG } from "../lib/module-assets.ts"

// Scene configuration matching module-data.ts timestamps
const SCENES = [
  { name: "initiation", start: 0, end: 13, component: SceneInitiation },
  { name: "targeting", start: 13, end: 46, component: SceneTargeting },
  { name: "distribution", start: 46, end: 63, component: SceneDistribution },
  { name: "responses", start: 63, end: 75, component: SceneResponses },
  { name: "reports", start: 75, end: 115, component: SceneReports },
]

interface Module4PlayerProps {
  progress: number
}

export default function Module4Player({ progress }: Module4PlayerProps) {
  // Memoize current scene to ensure stability during progress updates
  const currentScene = useMemo(() => {
    return SCENES.find((scene) => progress >= scene.start && progress < scene.end) || SCENES[SCENES.length - 1]
  }, [progress])

  const SceneComponent = currentScene.component

  return (
    <AssetPreloader
      criticalAssets={MODULE_ASSET_CONFIG.module4.critical}
      backgroundAssets={MODULE_ASSET_CONFIG.module4.background}
    >
      <div className="w-full h-full relative overflow-hidden font-sans select-none" style={{ backgroundColor: "#F5F5F7" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 z-10 overflow-hidden"
          >
            <SceneComponent
              isActive={true}
              progress={progress}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </AssetPreloader>
  )
}