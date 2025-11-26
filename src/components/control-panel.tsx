"use client"

import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import type { SceneControl } from "@/lib/module-data"
import { CheckCircle2, Activity, ChevronRight, Lock, List, X, Play } from "lucide-react"

// --- DESIGN TOKENS (Apple Light Mode) ---
const THEME = {
  glass: "rgba(245, 245, 247, 0.85)", // Light gray frosted glass
  activeCard: "#FFFFFF",
  textPrimary: "#1D1D1F", // Apple standard black
  textSecondary: "#86868B", // Apple standard gray
  accent: "#60BA81", // Brand Green
  border: "rgba(0, 0, 0, 0.06)",
  shadowSoft: "0 8px 30px rgba(0,0,0,0.08)",
  shadowActive: "0 12px 40px rgba(0,0,0,0.12)",
  buttonGlass: "rgba(255, 255, 255, 0.6)",
}

const IOS_SPRING = {
  type: "spring",
  stiffness: 350,
  damping: 30,
  mass: 1,
}

interface ControlPanelProps {
  scenes: SceneControl[]
  currentProgress: number
  isPlaying: boolean
  moduleId: string
  position?: 'left' | 'right' // Add position prop
}

export function ControlPanel({ scenes, currentProgress, isPlaying, moduleId, position = 'right' }: ControlPanelProps) {
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0)
  const [isManuallyOpen, setIsManuallyOpen] = useState(false)
  
  // Refs for auto-scrolling
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  // Determine visibility state
  // Panel is visible if audio is playing OR user manually opened it
  const showPanel = isPlaying || isManuallyOpen

  // Calculate global progress
  const totalDuration = scenes[scenes.length - 1]?.end || 100
  const globalProgress = Math.min((currentProgress / totalDuration) * 100, 100)

  // --- SYNC ENGINE & AUTO-SCROLL ---
  useEffect(() => {
    // If playback starts, we ensure manual mode is reset (so pausing later reverts to button)
    // or we can leave it. Let's reset it so the behavior "Pause -> Hide" persists unless clicked again.
    if (isPlaying) {
      setIsManuallyOpen(false) 
    }

    if (isPlaying || isManuallyOpen) {
      // Find current scene index
      const currentScene = scenes.findIndex(
        (scene) => currentProgress >= scene.start && currentProgress < scene.end
      )
      
      if (currentScene !== -1 && currentScene !== activeSceneIndex) {
        setActiveSceneIndex(currentScene)
        
        // SMOOTH AUTO-SCROLL TO CENTER
        if (itemRefs.current[currentScene]) {
          itemRefs.current[currentScene]?.scrollIntoView({
            behavior: "smooth",
            block: "center", 
          })
        }
      }
    }
  }, [currentProgress, isPlaying, scenes, activeSceneIndex, isManuallyOpen])

  // Determine container class based on position
  const containerClass = position === 'left' 
    ? "fixed bottom-8 left-8 z-50 flex flex-col items-start pointer-events-none"
    : "fixed bottom-8 right-8 z-50 flex flex-col items-end pointer-events-none"

  const panelAnimationOrigin = position === 'left' 
    ? { transformOrigin: "bottom left" }
    : { transformOrigin: "bottom right" }

  return (
    <div className={containerClass}>
      <AnimatePresence mode="wait">
        {showPanel ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.95, ...panelAnimationOrigin }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={IOS_SPRING}
            className="pointer-events-auto w-[320px] font-sans"
          >
            {/* --- MAIN GLASS CONTAINER --- */}
            <div 
              className="rounded-[28px] overflow-hidden shadow-2xl backdrop-blur-xl border border-white/50"
              style={{ backgroundColor: THEME.glass, boxShadow: THEME.shadowSoft }}
            >
              
              {/* Header: Live Status */}
              <div className="px-5 py-3.5 border-b border-black/5 flex justify-between items-center bg-white/40 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  {isPlaying ? (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#60BA81] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#60BA81]"></span>
                    </span>
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full bg-black/20" />
                  )}
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#1D1D1F]/70">
                    {isPlaying ? "Live Sequence" : "Timeline Explorer"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-2 py-0.5 rounded-full bg-black/5 border border-black/5">
                     <span className="text-[10px] font-mono font-medium text-[#1D1D1F]/60">
                        {Math.floor(currentProgress)}s
                     </span>
                  </div>
                  
                  {/* Close Button (Only visible when manually open and NOT playing) */}
                  {!isPlaying && (
                    <button 
                      onClick={() => setIsManuallyOpen(false)}
                      className="w-6 h-6 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors text-[#1D1D1F]/60"
                    >
                      <X size={12} strokeWidth={2.5} />
                    </button>
                  )}
                </div>
              </div>

              {/* Scrollable Timeline List */}
              <div 
                  ref={scrollContainerRef}
                  className="max-h-[340px] overflow-y-auto overflow-x-hidden p-3 relative space-y-2 no-scrollbar"
                  style={{ scrollBehavior: 'smooth' }}
              >
                <LayoutGroup>
                  {scenes.map((scene, index) => {
                    const isActive = activeSceneIndex === index
                    const isPast = index < activeSceneIndex
                    
                    // Local Progress Calculation
                    const sceneDuration = scene.end - scene.start
                    const sceneProgress = Math.max(0, Math.min(1, (currentProgress - scene.start) / sceneDuration))

                    return (
                      <motion.div
                        layout
                        key={`${moduleId}-${scene.name}`}
                        ref={(el) => { itemRefs.current[index] = el }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`relative rounded-[20px] overflow-hidden transition-all duration-500`}
                        style={{
                          backgroundColor: isActive ? THEME.activeCard : "transparent",
                          boxShadow: isActive ? THEME.shadowActive : "none",
                          scale: isActive ? 1 : 0.98,
                        }}
                      >
                        {/* CARD CONTENT */}
                        <div 
                          className={`flex flex-col relative z-10 ${isActive ? "py-4 px-4" : "py-3 px-3 opacity-60 hover:opacity-100 hover:bg-black/5 cursor-pointer rounded-[16px]"}`}
                        >
                          {/* Title Row */}
                          <div className="flex items-center gap-3">
                            {/* Status Icon */}
                            <div className="shrink-0 w-6 h-6 flex items-center justify-center">
                                {isActive ? (
                                    <div className="relative w-4 h-4">
                                        <svg className="w-full h-full -rotate-90">
                                            <circle cx="8" cy="8" r="7" stroke="#E5E5EA" strokeWidth="2" fill="none" />
                                            <motion.circle 
                                              cx="8" cy="8" r="7" 
                                              stroke={THEME.accent} 
                                              strokeWidth="2" 
                                              fill="none"
                                              strokeDasharray={44}
                                              strokeDashoffset={44 - (sceneProgress * 44)}
                                            />
                                        </svg>
                                    </div>
                                ) : isPast ? (
                                    <CheckCircle2 size={16} className="text-[#60BA81]" />
                                ) : (
                                    <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                                )}
                            </div>

                            <span className={`text-[13px] font-semibold tracking-tight truncate flex-1 transition-colors ${isActive ? "text-[#1D1D1F]" : "text-[#86868B]"}`}>
                              {scene.label}
                            </span>
                          </div>

                          {/* EXPANDED DETAILS (Only Active) */}
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pl-9 overflow-hidden"
                              >
                                <motion.div
                                  initial={{ y: 5, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  transition={{ delay: 0.1 }}
                                  className="pt-2 pb-1"
                                >
                                  <div className="h-[1px] w-full bg-black/5 mb-3" />
                                  <p className="text-[12px] leading-[1.6] text-[#1D1D1F]/70">
                                    {scene.description}
                                  </p>
                                </motion.div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Active Indicator Bar (Left Side) */}
                        {isActive && (
                          <motion.div 
                              layoutId="accent-bar"
                              className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#60BA81]" 
                          />
                        )}
                      </motion.div>
                    )
                  })}
                </LayoutGroup>
              </div>

              {/* Footer: Global Progress Bar */}
              <div className="h-[4px] w-full bg-[#E5E5EA]">
                  <motion.div 
                      className="h-full bg-[#60BA81] shadow-[0_0_10px_rgba(96,186,129,0.4)]"
                      animate={{ width: `${globalProgress}%` }}
                      transition={{ type: "tween", ease: "linear", duration: 0.1 }}
                  />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="fab"
            onClick={() => setIsManuallyOpen(true)}
            initial={{ scale: 0, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={IOS_SPRING}
            className="pointer-events-auto w-12 h-12 rounded-full backdrop-blur-xl border border-white/40 flex items-center justify-center shadow-lg group"
            style={{ backgroundColor: THEME.buttonGlass }}
          >
            {/* Pulsing Ring Effect on Hover */}
            <div className="absolute inset-0 rounded-full bg-white/40 opacity-0 group-hover:animate-ping" />
            <List size={22} className="text-[#1D1D1F] opacity-80" strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}