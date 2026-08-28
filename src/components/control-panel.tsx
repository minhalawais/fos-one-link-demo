"use client"

import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import type { SceneControl } from "../lib/module-data.ts"
import { Play } from "lucide-react"

// --- DESIGN TOKENS ---
const THEME = {
  activeBg: "#FFFFFF",
  inactiveBg: "transparent",
  textPrimary: "#1D1D1F",
  textSecondary: "#86868B",
  activeShadow: "0 4px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
}

// Slower, smoother card layout spring
const IOS_SPRING = {
  type: "spring",
  stiffness: 1000,
  damping: 34,
  mass: 1.0,
} as const

// Dot scale spring — slightly snappier than the card but still smooth
const DOT_SPRING = {
  type: "spring",
  stiffness: 900,
  damping: 22,
  mass: 0.6,
} as const

// Label slide spring — faster in/out while card expands slowly
const LABEL_SPRING = {
  type: "spring",
  stiffness: 900,
  damping: 22,
  mass: 0.6,
} as const

interface ControlPanelProps {
  scenes: SceneControl[]
  currentProgress: number
  isPlaying: boolean
  moduleId: string
  onSeek: (time: number) => void
  language?: "en" | "ur"
}

export function ControlPanel({
  scenes,
  currentProgress,
  isPlaying,
  moduleId,
  onSeek,
  language = "en",
}: ControlPanelProps) {
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0)
  const prevIndexRef = useRef<number>(0)

  // Refs for auto-scrolling
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  // --- SYNC ENGINE ---
  useEffect(() => {
    const currentScene = scenes.findIndex(
      (scene) => currentProgress >= scene.start && currentProgress < scene.end
    )
    if (currentScene !== -1 && currentScene !== activeSceneIndex) {
      prevIndexRef.current = activeSceneIndex
      setActiveSceneIndex(currentScene)
      if (itemRefs.current[currentScene]) {
        itemRefs.current[currentScene]?.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }, [currentProgress, scenes, activeSceneIndex])

  const isUrdu = language === "ur"
  // Direction: forward (+1) scene enters from below; backward (-1) enters from above
  const direction = activeSceneIndex >= prevIndexRef.current ? 1 : -1

  return (
    <div
      className={`w-full h-full flex flex-col px-3 bg-[#F5F5F7] ${isUrdu ? "font-urdu" : "font-sans"}`}
      dir={isUrdu ? "rtl" : "ltr"}
    >
      <div
        ref={scrollContainerRef}
        className="w-full h-full overflow-y-auto space-y-2 py-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <LayoutGroup>
          {scenes.map((scene, index) => {
            const isActive = activeSceneIndex === index

            return (
              <motion.button
                layout
                key={`${moduleId}-${scene.name}`}
                ref={(el) => { itemRefs.current[index] = el }}
                onClick={() => onSeek(scene.start)}
                transition={{ layout: IOS_SPRING }}
                className={`group relative w-full ${isUrdu ? "text-right" : "text-left"} focus:outline-none focus-visible:outline-none ${
                  isActive
                    ? "rounded-[20px] p-5 z-10"
                    : "rounded-xl px-4 py-3 z-0 hover:bg-black/[0.03]"
                }`}
                style={{
                  backgroundColor: isActive ? THEME.activeBg : THEME.inactiveBg,
                  boxShadow: isActive ? THEME.activeShadow : "none",
                }}
              >
                <motion.div layout="position" className="flex flex-col gap-2.5">

                  {/* Header Row: dot indicator + scene label */}
                  <div className={`flex items-center gap-3 w-full ${isUrdu ? "flex-row-reverse" : "flex-row"}`}>

                    {/* Status Dot: per-row scale in/out, no cross-row flying */}
                    <div className="relative shrink-0 w-5 h-5 flex items-center justify-center">
                      {/* Outer circle ring animates border color */}
                      <motion.div
                        className="absolute inset-0 rounded-full border"
                        animate={{ borderColor: isActive ? "#1D1D1F" : "rgba(0,0,0,0.2)" }}
                        transition={{ duration: 0.25 }}
                      />
                      <AnimatePresence mode="wait">
                        {isActive ? (
                          /* Active: filled dot scales in smoothly from zero */
                          <motion.div
                            key="dot"
                            className="w-2 h-2 bg-[#1D1D1F] rounded-full"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={DOT_SPRING}
                          />
                        ) : (
                          /* Inactive: invisible placeholder so AnimatePresence tracks exit */
                          <motion.div
                            key="play"
                            className="flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                          >
                            <Play size={8} className="text-black/40 group-hover:opacity-100 opacity-0 transition-opacity ml-0.5" fill="currentColor" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Scene Label: slides vertically in direction of navigation */}
                    <div className="overflow-hidden flex-1">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={`label-${index}-${isActive}`}
                          className={`block text-[15px] ${
                            isUrdu ? "text-lg font-urdu font-bold leading-normal" : "font-semibold tracking-tight"
                          } ${isActive ? "text-[#1D1D1F]" : "text-[#86868B]"}`}
                          initial={{ y: isActive ? direction * 12 : direction * -12, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: isActive ? direction * -12 : direction * 12, opacity: 0 }}
                          transition={LABEL_SPRING}
                        >
                          {scene.label}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Description Body: expands below label when scene is active */}
                  <AnimatePresence mode="popLayout">
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ height: IOS_SPRING, opacity: { duration: 0.3, delay: 0.1 } }}
                        className={isUrdu ? "pr-2 pl-2" : "pl-8 pr-1"}
                      >
                        {/* Scene description text */}
                        <p className={`text-[#52525B] ${isUrdu ? "font-urdu text-lg leading-relaxed font-normal" : "text-[15px] font-medium leading-relaxed"}`}>
                          {scene.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.button>
            )
          })}
        </LayoutGroup>

        {/* Bottom spacer */}
        <div className="h-24" />
      </div>
    </div>
  )
}