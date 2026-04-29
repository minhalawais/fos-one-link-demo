"use client"

import { AnimatePresence } from "framer-motion"

import { SceneIntro } from "../components/scenes/module5/scene-intro.tsx"
import { SceneConclusion } from "../components/scenes/module5/scene-conclusion.tsx"
import { SceneDashboard } from "../components/scenes/module5/scene-dashboard.tsx"

import { SceneProgressiveShell } from "../components/common/SceneProgressiveShell.tsx"
import type { SceneConfig } from "../hooks/useProgressivePreloader.ts"

const SCENES: SceneConfig[] = [
    {
        name: "intro",
        start: 0,
        end: 7,
        component: SceneIntro,
        assets: [
            // Scene 1 intentionally kept minimal — bootstrapped during Module 4 playback
            // "/assets/module5/intro-bg.png",
        ],
    },
    {
        name: "unified_dashboard",
        start: 7,
        end: 170,
        component: SceneDashboard,
        assets: [
            // This is the longest scene (163s) — list images visible immediately at second 7:
            // "/assets/module5/dashboard-overview.png",
            // "/assets/module5/analytics-chart.png",
            // "/assets/module5/nps-widget.png",
        ],
    },
    {
        name: "conclusion",
        start: 170,
        end: 180,
        component: SceneConclusion,
        assets: [
            // "/assets/module5/conclusion-bg.png",
        ],
    },
]

interface Module5PlayerProps {
    progress: number
}

export default function Module5Player({ progress }: Module5PlayerProps) {
    const currentSceneConfig =
        SCENES.find((scene) => progress >= scene.start && progress < scene.end) ?? SCENES[0]

    const CurrentSceneComponent = currentSceneConfig.component

    // Original passed sceneProgress (relative time) — preserved exactly
    const sceneProgress = Math.max(0, progress - currentSceneConfig.start)

    return (
        <SceneProgressiveShell scenes={SCENES} progress={progress}>
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
        </SceneProgressiveShell>
    )
}