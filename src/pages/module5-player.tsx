"use client"

import { AnimatePresence } from "framer-motion"
import { AssetPreloader } from "../components/common/AssetPreloader.tsx"

// Import all scene components from module5 folder
import { SceneIntro } from "../components/scenes/module5/scene-intro.tsx"
import { SceneConclusion } from "../components/scenes/module5/scene-conclusion.tsx"
import { SceneDashboard } from "../components/scenes/module5/scene-dashboard.tsx"
import { MODULE_ASSET_CONFIG } from "../lib/module-assets.ts"

// Updated scene configuration to match voiceover script timestamps
const SCENES = [
    // 0-7: Intro
    { name: "intro", start: 0, end: 7, component: SceneIntro },

    // 7-170: Unified Dashboard (Overview + Analytics + NPS Scores + Reports Integration)
    { name: "unified_dashboard", start: 7, end: 170, component: SceneDashboard },

    // 170+: Conclusion
    { name: "conclusion", start: 170, end: 180, component: SceneConclusion }
];

interface Module5PlayerProps {
    progress: number
}

export default function Module5Player({ progress }: Module5PlayerProps) {
    const currentSceneConfig = SCENES.find((scene) => progress >= scene.start && progress < scene.end) || SCENES[0]
    const CurrentSceneComponent = currentSceneConfig.component
    const sceneProgress = Math.max(0, progress - currentSceneConfig.start)

    return (
        <AssetPreloader
            criticalAssets={MODULE_ASSET_CONFIG.module5.critical}
            backgroundAssets={MODULE_ASSET_CONFIG.module5.background}
        >
            <div className="w-full h-full bg-[#F5F5F7] relative overflow-x-visible overflow-y-clip font-sans select-none">
                <div className="absolute inset-0 z-0">
                    <CurrentSceneComponent
                        key={currentSceneConfig.name}
                        isActive={true}
                        progress={progress}
                        sceneProgress={sceneProgress}
                    />
                </div>
            </div>
        </AssetPreloader>
    )
}
