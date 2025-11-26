"use client"

import { AnimatePresence } from "framer-motion"

// Import all scene components
import { SceneIntro } from "../components/scenes/module4/scene-intro.tsx"
import { SceneBreakdown } from "../components/scenes/module4/scene-breakdown.tsx"
import { SceneHeatmap } from "../components/scenes/module4/scene-heatmap.tsx"
import { SceneMetrics } from "../components/scenes/module4/scene-metrics.tsx"
import { SceneTimeline } from "../components/scenes/module4/scene-timeline.tsx"
import { SceneNPS } from "../components/scenes/module4/scene-nps.tsx"
import { SceneTrends } from "../components/scenes/module4/scene-trends.tsx"
import { SceneExport } from "../components/scenes/module4/scene-export.tsx"
import { SceneConclusion } from "../components/scenes/module4/scene-conclusion.tsx"
import { SceneDashboard } from "../components/scenes/module4/scene-dashboard.tsx"

// Updated scene configuration to match voiceover script timestamps
const SCENES = [
  // Intro: "It's time to explore the dashboards and risk insights..."
  { name: "intro", start: 0, end: 7, component: SceneIntro },
  
  // Dashboard overview: "The dashboard provides a real-time view..."
  { name: "dashboard", start: 7, end: 16, component: SceneDashboard },
  
  // Quick assessment: "This helps management quickly assess..."
  { name: "assessment", start: 16, end: 20.2, component: SceneDashboard }, // Could be a variant of dashboard
  
  // Categories breakdown: "Complaints are automatically grouped..."
  { name: "breakdown", start: 20.2, end: 30.64, component: SceneBreakdown },
  
  // Heatmap insights: "This allows factories to identify recurring issues..."
  { name: "heatmap", start: 30.64, end: 43.4, component: SceneHeatmap },
  
  // RCA/CAPA metrics: "The system also tracks RCA and CAPA performance..."
  { name: "metrics", start: 43.4, end: 59.4, component: SceneMetrics },
  
  // Timeline monitoring: "Timeline monitoring highlights average investigation times..."
  { name: "timeline", start: 59.4, end: 70.4, component: SceneTimeline },
  
  // Worker satisfaction: "Workers' satisfaction indicators show how employees responded..."
  { name: "nps", start: 70.4, end: 75.68, component: SceneNPS },
  
  // Trends analysis: "You can also analyze trends over weeks, months..."
  { name: "trends", start: 75.68, end: 90.28, component: SceneTrends },
  
  // Export functionality: "And finally, all reports are exportable for HRDD..."
  { name: "export", start: 90.28, end: 96.4, component: SceneExport },
  
  // Conclusion: "Together, these dashboards turn grievance data..."
  { name: "conclusion", start: 96.4, end: 102, component: SceneConclusion }
]

interface Module4PlayerProps {
  progress: number
}

export default function Module4Player({ progress }: Module4PlayerProps) {
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