"use client"

import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import type { SceneControl } from "../lib/module-data.ts"
import { Plus, Play } from "lucide-react"

// --- DESIGN TOKENS (Apple Style) ---
const THEME = {
  activeBg: "#FFFFFF",     // White card for active state
  inactiveBg: "transparent", // Transparent for list look
  textPrimary: "#1D1D1F",  // San Francisco Black
  textSecondary: "#86868B", // San Francisco Gray
  accent: "#007AFF",       // Apple Blue (Optional, using Black for monochrome chic)
  activeShadow: "0 4px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)", // Soft, diffused shadow
}

const IOS_SPRING = {
  type: "spring",
  stiffness: 350,
  damping: 30,
  mass: 1
}

interface ControlPanelProps {
  scenes: SceneControl[]
  currentProgress: number
  isPlaying: boolean
  moduleId: string
  onSeek: (time: number) => void
}

export function ControlPanel({ scenes, currentProgress, isPlaying, moduleId, onSeek }: ControlPanelProps) {
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0)
  
  // Refs for auto-scrolling
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  // --- SYNC ENGINE ---
  useEffect(() => {
    // Find current scene index based on time
    const currentScene = scenes.findIndex(
      (scene) => currentProgress >= scene.start && currentProgress < scene.end
    )
    
    // Only update if changed and valid (prevents jumping to -1 on buffer)
    if (currentScene !== -1 && currentScene !== activeSceneIndex) {
      setActiveSceneIndex(currentScene)
      
      // Auto-scroll to keep active item in view with some padding
      if (itemRefs.current[currentScene]) {
        itemRefs.current[currentScene]?.scrollIntoView({
          behavior: "smooth",
          block: "center", 
        })
      }
    }
  }, [currentProgress, scenes, activeSceneIndex])

  return (
    // Main Container Background set to #F5F5F7
    <div className="w-full h-full flex flex-col px-3 font-sans bg-[#F5F5F7]">
        <div 
            ref={scrollContainerRef}
            // Explicitly hiding scrollbar
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    layout: IOS_SPRING,
                    opacity: { duration: 0.2 }
                  }}
                  className={`group relative w-full text-left transition-all duration-300 overflow-hidden ${
                    isActive 
                      ? "rounded-[20px] p-5 z-10" 
                      : "rounded-xl px-4 py-3 z-0 hover:bg-black/[0.03]"
                  }`}
                  style={{
                    backgroundColor: isActive ? THEME.activeBg : THEME.inactiveBg,
                    boxShadow: isActive ? THEME.activeShadow : "none",
                  }}
                >
                  {/* Content Container */}
                  <motion.div layout="position" className="flex flex-col gap-3">
                    
                    {/* Header Row */}
                    <div className="flex items-center gap-3 w-full">
                        {/* Status Icon */}
                        <div className="relative shrink-0 w-5 h-5 flex items-center justify-center">
                            <motion.div 
                              className={`absolute inset-0 rounded-full border ${isActive ? "border-black" : "border-black/20"}`}
                              animate={{ borderColor: isActive ? "#1D1D1F" : "rgba(0,0,0,0.2)" }} 
                            />
                            
                            {isActive ? (
                              <motion.div 
                                layoutId={`active-dot-${moduleId}`}
                                className="w-2 h-2 bg-[#1D1D1F] rounded-full" 
                                transition={IOS_SPRING}
                              />
                            ) : (
                               // Subtle play icon on hover for inactive items
                               <Play size={8} className="text-black/40 opacity-0 group-hover:opacity-100 transition-opacity ml-0.5" fill="currentColor" />
                            )}
                        </div>

                        {/* Label */}
                        <span 
                            className={`text-[15px] font-semibold tracking-tight transition-colors duration-300 ${
                                isActive ? "text-[#1D1D1F]" : "text-[#86868B]"
                            }`}
                        >
                          {scene.label}
                        </span>
                    </div>

                    {/* Description Body (Expandable) */}
                    <AnimatePresence mode="popLayout">
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ 
                            height: IOS_SPRING,
                            opacity: { duration: 0.3, delay: 0.1 } 
                          }}
                          className="pl-8 pr-1"
                        >
                          <p className="text-[13px] leading-[1.6] text-[#636366] font-medium">
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