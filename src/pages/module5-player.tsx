"use client"

import { AnimatePresence } from "framer-motion"

// Import all scene components from module5 folder
import { SceneIntro } from "../components/scenes/module5/scene-intro.tsx"
import { SceneBreakdown } from "../components/scenes/module5/scene-breakdown.tsx"
import { SceneMetrics } from "../components/scenes/module5/scene-metrics.tsx"
import { SceneTimeline } from "../components/scenes/module5/scene-timeline.tsx"
import { SceneNPS } from "../components/scenes/module5/scene-nps.tsx"
import { SceneExport } from "../components/scenes/module5/scene-export.tsx"
import { SceneConclusion } from "../components/scenes/module5/scene-conclusion.tsx"
import { SceneDashboard } from "../components/scenes/module5/scene-dashboard.tsx"
import { SceneAI } from "../components/scenes/module5/scene-ai.tsx"

// Updated scene configuration to match voiceover script timestamps
const SCENES = [
    // 0-7: Intro
    { name: "intro", start: 0, end: 7, component: SceneIntro },

    // 7-51: Dashboard Overview (Multilayer structure, Filters, Snapshot)
    { name: "dashboard_overview", start: 7, end: 51, component: SceneDashboard },

    // 51-88: Workforce Feedback Slider
    { name: "analytics_feedback", start: 51, end: 88, component: SceneBreakdown },

    // 88-102: Counseling Sessions Analysis (Dashboard front view focus)
    { name: "analytics_counseling", start: 88, end: 102, component: SceneDashboard },

    // 102-114: Resolution Performance
    { name: "analytics_performance", start: 102, end: 114, component: SceneBreakdown },

    // 114-137: Interactive Dashboard Deep Dive (includes AI Summaries & Case Timelines as modals)
    { name: "interactive", start: 114, end: 137, component: SceneDashboard },

    // 137-155: Worker Happiness & Safety Scores
    { name: "scores", start: 137, end: 155, component: SceneNPS },

    // 155+: Survey Reports
    { name: "reports", start: 155, end: 170, component: SceneExport },

    // 170+: Conclusion
    { name: "conclusion", start: 170, end: 180, component: SceneConclusion }
]

interface Module5PlayerProps {
    progress: number
}

export default function Module5Player({ progress }: Module5PlayerProps) {
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
