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

const SCENES_EN: SceneConfig[] = [
  {
    name: "intro",
    start: 0,
    end: 5,
    component: SceneIntro,
    assets: [],
  },
  {
    name: "omnichannel",
    start: 5,
    end: 28,
    component: SceneOmnichannel,
    assets: [],
  },
  {
    name: "complaint-filing",
    start: 28,
    end: 77,
    component: SceneComplaintFiling,
    assets: [],
  },
  {
    name: "review",
    start: 77,
    end: 95,
    component: SceneReview,
    assets: [],
  },
  {
    name: "ticket",
    start: 95,
    end: 113,
    component: SceneTicket,
    assets: [],
  },
  {
    name: "notification",
    start: 113,
    end: 141,
    component: SceneNotification,
    assets: [],
  },
]

// Urdu timeline configuration scaled to match Module 2 Script Urdu.txt (total 201s)
const SCENES_UR: SceneConfig[] = [
  {
    name: "intro",
    start: 0,
    end: 6,
    component: SceneIntro,
    assets: [],
  },
  {
    name: "omnichannel",
    start: 6,
    end: 41,
    component: SceneOmnichannel,
    assets: [],
  },
  {
    name: "complaint-filing",
    start: 41,
    end: 117,
    component: SceneComplaintFiling,
    assets: [],
  },
  {
    name: "review",
    start: 117,
    end: 146,
    component: SceneReview,
    assets: [],
  },
  {
    name: "ticket",
    start: 146,
    end: 168,
    component: SceneTicket,
    assets: [],
  },
  {
    name: "notification",
    start: 168,
    end: 201,
    component: SceneNotification,
    assets: [],
  },
]

// Piecewise sentence-level timing mapping for synchronized voiceover to animations
const MODULE2_TIMINGS_EN = [
  // Scene 1: Omnichannel Ecosystem
  { start: 0, end: 5 },     // Sentence 1: Intro (0-5s)
  { start: 5, end: 20 },    // Sentence 2: Channel list (5-20s)
  { start: 20, end: 28 },   // Sentence 3: Accessibility summary (20-28s)
  // Scene 2: Assisted & Anonymous Complaint Filing
  { start: 28, end: 40 },   // Sentence 4: Contact channels & officer intro (28-40s)
  { start: 40, end: 52 },   // Sentence 5: Questions, evidence, form filling, launch (40-52s)
  { start: 52, end: 57 },   // Sentence 6: Non-digital inclusivity (52-57s)
  { start: 57, end: 60 },   // Sentence 7: Anonymous option intro (57-60s)
  { start: 60, end: 70 },   // Sentence 8: Masking info & tracking ID (60-70s)
  { start: 70, end: 77 },   // Sentence 9: Sensitive issues protection (70-77s)
  // Scene 3: Review & Approval
  { start: 77, end: 95 },
  // Scene 4: Ticket & SMS
  { start: 95, end: 113 },
  // Scene 5: IO Notification & Portal
  { start: 113, end: 141 },
]

const MODULE2_TIMINGS_UR = [
  // Scene 1: Omnichannel Ecosystem
  { start: 0, end: 6 },     // Sentence 1: Intro (0:00 - 0:06)
  { start: 6, end: 25 },    // Sentence 2: Channel list (0:06 - 0:25)
  { start: 25, end: 41 },   // Sentence 3: Accessibility summary (0:25 - 0:41)
  // Scene 2: Assisted & Anonymous Complaint Filing
  { start: 41, end: 55 },   // Sentence 4: Contact channels & officer intro (0:41 - 0:55)
  { start: 55, end: 73 },   // Sentence 5: Questions, evidence, form filling, launch (0:55 - 1:13)
  { start: 73, end: 81 },   // Sentence 6: Non-digital inclusivity (1:13 - 1:21)
  { start: 81, end: 87 },   // Sentence 7: Anonymous option intro (1:21 - 1:27)
  { start: 87, end: 104 },  // Sentence 8: Masking info & tracking ID (1:27 - 1:44)
  { start: 104, end: 117 }, // Sentence 9: Sensitive issues protection (1:44 - 1:57)
  // Scene 3: Review & Approval
  { start: 117, end: 146 }, // (1:57 - 2:26)
  // Scene 4: Ticket & SMS
  { start: 146, end: 168 }, // (2:26 - 2:48)
  // Scene 5: IO Notification & Portal
  { start: 168, end: 201 }, // (2:48 - 3:21)
]

interface Module2PlayerProps {
  progress: number
  language?: "en" | "ur"
}

export default function Module2Player({ progress, language = "en" }: Module2PlayerProps) {
  const isUrdu = language === "ur"
  const scenesList = isUrdu ? SCENES_UR : SCENES_EN

  const currentSceneIndex = scenesList.findIndex(
    (scene) => progress >= scene.start && progress < scene.end
  )

  const currentSceneConfig =
    currentSceneIndex !== -1 ? scenesList[currentSceneIndex] : scenesList[0]

  // Calculate normalized relative progress mapped across sentence intervals
  let scaledProgress = progress
  if (isUrdu) {
    const segmentIndex = MODULE2_TIMINGS_UR.findIndex(
      (seg) => progress >= seg.start && progress < seg.end
    )
    if (segmentIndex !== -1) {
      const urSeg = MODULE2_TIMINGS_UR[segmentIndex]
      const enSeg = MODULE2_TIMINGS_EN[segmentIndex]
      const urDuration = Math.max(0.1, urSeg.end - urSeg.start)
      const enDuration = Math.max(0.1, enSeg.end - enSeg.start)
      const localRatio = Math.min(1, Math.max(0, (progress - urSeg.start) / urDuration))
      scaledProgress = enSeg.start + localRatio * enDuration
    } else if (progress >= MODULE2_TIMINGS_UR[MODULE2_TIMINGS_UR.length - 1].end) {
      scaledProgress = MODULE2_TIMINGS_EN[MODULE2_TIMINGS_EN.length - 1].end
    }
  }

  const CurrentSceneComponent = currentSceneConfig.component

  return (
    <SceneProgressiveShell scenes={scenesList} progress={progress}>
      <div className="w-full h-full bg-[#17161A] relative overflow-hidden font-sans select-none">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <CurrentSceneComponent
              key={currentSceneConfig.name}
              isActive={true}
              progress={scaledProgress}
            />
          </AnimatePresence>
        </div>
      </div>
    </SceneProgressiveShell>
  )
}