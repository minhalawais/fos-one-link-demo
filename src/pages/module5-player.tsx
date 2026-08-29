"use client"

import { SceneIntro } from "../components/scenes/module5/scene-intro.tsx"
import { SceneConclusion } from "../components/scenes/module5/scene-conclusion.tsx"
import { SceneDashboard } from "../components/scenes/module5/scene-dashboard.tsx"

import { SceneProgressiveShell } from "../components/common/SceneProgressiveShell.tsx"
import type { SceneConfig } from "../hooks/useProgressivePreloader.ts"

const SCENES_EN: SceneConfig[] = [
  {
    name: "intro",
    start: 0,
    end: 7,
    component: SceneIntro,
    assets: [],
  },
  {
    name: "unified_dashboard",
    start: 7,
    end: 160,
    component: SceneDashboard,
    assets: [],
  },
  {
    name: "conclusion",
    start: 160,
    end: 165,
    component: SceneConclusion,
    assets: [],
  },
]

// Urdu timeline configuration scaled to match Module 5 Script Urdu.txt (total 280s)
const SCENES_UR: SceneConfig[] = [
  {
    name: "intro",
    start: 0,
    end: 9,
    component: SceneIntro,
    assets: [],
  },
  {
    name: "unified_dashboard",
    start: 9,
    end: 275,
    component: SceneDashboard,
    assets: [],
  },
  {
    name: "conclusion",
    start: 275,
    end: 280,
    component: SceneConclusion,
    assets: [],
  },
]

// Sub-scene timing mappings for fine-grained internal dashboard animation scaling
const MODULE5_TIMINGS_EN = [
  { start: 0, end: 24 },    // architecture / multi-layer
  { start: 24, end: 40 },   // filters
  // Scene 3 (Overview) subdivided into 5 synchronized animation phases:
  { start: 40, end: 51 },   // Overview top stat cards & bounced metrics
  { start: 51, end: 60 },   // Categories distribution part 1 (wages, hours)
  { start: 60, end: 66 },   // Categories distribution part 2 (harassment, health, etc)
  { start: 66, end: 76 },   // Date-wise complaints chart & Gender distribution
  { start: 76, end: 88 },   // General employee suggestions / feedback slider
  // Remaining scenes:
  { start: 88, end: 102 },  // counseling
  { start: 102, end: 114 }, // performance
  { start: 114, end: 137 }, // drilldown / AI summaries
  { start: 137, end: 155 }, // scores
  { start: 155, end: 165 }, // surveys
]

const MODULE5_TIMINGS_UR = [
  { start: 0, end: 28 },    // architecture / multi-layer
  { start: 28, end: 61 },   // filters
  // Scene 3 (Overview) subdivided into 5 synchronized animation phases:
  { start: 61, end: 91 },   // Overview top stat cards & bounced metrics (61-91)
  { start: 91, end: 102 },  // Categories distribution part 1 (91-102)
  { start: 102, end: 113 }, // Categories distribution part 2 (102-113)
  { start: 113, end: 128 }, // Date-wise complaints chart & Gender distribution (113-128)
  { start: 128, end: 140 }, // General employee suggestions / feedback slider (128-140)
  // Remaining scenes:
  { start: 140, end: 161 }, // counseling
  { start: 161, end: 188 }, // performance
  { start: 188, end: 230 }, // drilldown
  { start: 230, end: 260 }, // scores
  { start: 260, end: 280 }, // surveys
]

interface Module5PlayerProps {
  progress: number
  language?: "en" | "ur"
}

export default function Module5Player({ progress, language = "en" }: Module5PlayerProps) {
  const isUrdu = language === "ur"
  const scenesList = isUrdu ? SCENES_UR : SCENES_EN

  const currentSceneConfig =
    scenesList.find((scene) => progress >= scene.start && progress < scene.end) ?? scenesList[0]

  // Calculate fine-grained scaled progress for dashboard internal timeline
  let scaledProgress = progress
  if (isUrdu) {
    const subIdx = MODULE5_TIMINGS_UR.findIndex(
      (s) => progress >= s.start && progress < s.end
    )
    if (subIdx !== -1) {
      const urSub = MODULE5_TIMINGS_UR[subIdx]
      const enSub = MODULE5_TIMINGS_EN[subIdx]
      const urDur = Math.max(0.1, urSub.end - urSub.start)
      const enDur = Math.max(0.1, enSub.end - enSub.start)
      const ratio = Math.min(1, Math.max(0, (progress - urSub.start) / urDur))
      scaledProgress = enSub.start + ratio * enDur
    } else if (progress >= 280) {
      scaledProgress = 165
    }
  }

  const CurrentSceneComponent = currentSceneConfig.component
  const sceneProgress = Math.max(0, scaledProgress - currentSceneConfig.start)

  return (
    <SceneProgressiveShell scenes={scenesList} progress={progress}>
      <div className="w-full h-full bg-[#F5F5F7] relative overflow-x-visible overflow-y-clip font-sans select-none">
        <div className="absolute inset-0 z-0">
          <CurrentSceneComponent
            key={currentSceneConfig.name}
            isActive={true}
            progress={scaledProgress}
            sceneProgress={sceneProgress}
          />
        </div>
      </div>
    </SceneProgressiveShell>
  )
}