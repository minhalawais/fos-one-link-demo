"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SceneIntro } from "./scene-intro"
import { SceneOmnichannel } from "./scene-omnichannel"
import { SceneAssistedFiling } from "./scene-assisted-filing"
import { SceneAnonymity } from "./scene-anonymity"
import { SceneReview } from "./scene-review"
import { SceneTicket } from "./scene-ticket"
import { SceneNotification } from "./scene-notification"

const COLORS = {
  DeepTeal: "#284952",
  FreshGreen: "#60BA81",
  WarmOrange: "#F5A83C",
  Charcoal: "#17161A",
  LightGray: "#F5F5F7",
  White: "#FFFFFF",
}

const TOTAL_DURATION = 98 // seconds

// Scene timing based on the script
const SCENES = [
  { name: "intro", start: 0, end: 4.64, component: SceneIntro },
  { name: "omnichannel", start: 4.64, end: 22, component: SceneOmnichannel },
  { name: "assisted", start: 22, end: 44.56, component: SceneAssistedFiling },
  { name: "anonymity", start: 44.56, end: 61.24, component: SceneAnonymity },
  { name: "review", start: 61.24, end: 71, component: SceneReview },
  { name: "ticket", start: 71, end: 82, component: SceneTicket },
  { name: "notification", start: 82, end: 98, component: SceneNotification },
]

interface Module2PlayerProps {
  isPlaying: boolean
  onComplete?: () => void
}

export const Module2Player = ({ isPlaying, onComplete }: Module2PlayerProps) => {
  const [currentTime, setCurrentTime] = useState(0)
  const [currentScene, setCurrentScene] = useState(SCENES[0])

  // Timer effect
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 0.1

          // Check if we've reached the end
          if (newTime >= TOTAL_DURATION) {
            clearInterval(interval)
            onComplete?.()
            return TOTAL_DURATION
          }

          return newTime
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isPlaying, onComplete])

  // Scene detection effect
  useEffect(() => {
    const activeScene = SCENES.find((scene) => currentTime >= scene.start && currentTime < scene.end)

    if (activeScene && activeScene.name !== currentScene.name) {
      setCurrentScene(activeScene)
    }
  }, [currentTime, currentScene])

  // Calculate progress percentage
  const progress = (currentTime / TOTAL_DURATION) * 100

  return (
    <div className="w-full h-full relative bg-[#17161A] overflow-hidden">
      {/* Main Scene Container */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.name}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.6,
              ease: [0.43, 0.13, 0.23, 0.96], // Apple's easing curve
            }}
            className="w-full h-full"
          >
            <currentScene.component isActive={true} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/30 backdrop-blur-sm z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-[#60BA81] to-[#4a9668] shadow-[0_0_10px_rgba(96,186,129,0.5)]"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Scene Indicator (optional debug/info) */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs px-3 py-2 rounded-lg z-50 font-mono">
          <div>Scene: {currentScene.name}</div>
          <div>
            Time: {currentTime.toFixed(1)}s / {TOTAL_DURATION}s
          </div>
        </div>
      )}
    </div>
  )
}
