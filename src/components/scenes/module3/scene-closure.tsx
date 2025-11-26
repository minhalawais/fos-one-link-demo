"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  BarChart3, 
  TrendingUp, 
  ArrowRight,
  Activity,
  FileCheck
} from "lucide-react"

// --- CONSTANTS ---
const IOS_EASE = [0.32, 0.72, 0, 1]

interface SceneClosureProps {
  progress: number
}

export function SceneClosure({ progress }: SceneClosureProps) {
  // Logic: The voiceover switches topic at timestamp ~118.2s
  // The scene starts at 111.4s.
  // 118.2 - 111.4 = 6.8 seconds into the scene.
  
  // We calculate local time to handle the transition precisely
  const sceneStart = 111.4
  const transitionPoint = 118.2
  const showInsights = progress > transitionPoint

  return (
    <div className="w-full h-full bg-[#F5F5F7] relative overflow-hidden font-sans select-none flex items-center justify-center">
      
      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#60BA81] opacity-[0.05] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#F5A83C] opacity-[0.05] blur-[120px] rounded-full" />
      </div>

      {/* --- CENTER DOTTED LINE (Timeline Context) --- */}
      {/* This matches the dotted line in your reference image */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
        <div className="h-full w-[2px] border-l-2 border-dashed border-[#F5A83C]/40" />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-4 flex items-center justify-center">

        {/* === ELEMENT 1: THE SATISFACTION CARD (Exact Replica) === */}
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ 
            opacity: showInsights ? 0.4 : 1, 
            scale: showInsights ? 0.85 : 1,
            x: showInsights ? -180 : 0, // Slide away to make room for insights
            filter: showInsights ? "blur(6px) grayscale(50%)" : "blur(0px) grayscale(0%)"
          }}
          transition={{ duration: 0.8, ease: IOS_EASE }}
          className="relative max-w-[600px] w-full shadow-2xl shadow-orange-500/20 rounded-2xl"
        >
          {/* THE EXACT REPLICA CARD */}
          {/* Gradient matches the image: Lighter Orange Top-Left to Darker Bottom-Right */}
          <div className="bg-gradient-to-br from-[#F5A83C] to-[#E67E22] rounded-xl p-8 text-center text-white border border-indigo-200/20 relative overflow-hidden">
            
            {/* Subtle gloss overlay to match the 'shiny' look of the image */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-3">
              {/* Heading */}
              <h2 className="text-2xl font-bold tracking-tight drop-shadow-sm">
                The Complainant Was Satisfied
              </h2>

              {/* Sub-header */}
              <h3 className="text-md font-semibold text-white/90">
                Feedback:
              </h3>

              {/* Exact Text Replica from Image */}
              <p className="text-sm leading-relaxed text-white font-medium drop-shadow-sm max-w-lg mx-auto">
                The FOS Team contacted with the complainant and informed him that a coaching session has been conducted with Mr. Areeb, and he has been issued a warning. The complainant was advised to inform FOS if any further behavior issues arise. The complainant is satisfied with the response.
              </p>
            </div>
          </div>
        </motion.div>

        {/* === ELEMENT 2: INSIGHTS DASHBOARD (Appears on Voiceover Trigger) === */}
        <AnimatePresence>
          {showInsights && (
            <motion.div
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 60, scale: 1 }} // Overlaps the blurred card slightly
              transition={{ duration: 0.8, ease: IOS_EASE }}
              className="absolute z-20 w-full max-w-[450px]"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border border-white/60 p-6">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#284952] flex items-center justify-center text-white shadow-lg shadow-[#284952]/20">
                      <BarChart3 size={20} />
                    </div>
                    <div>
                      <h3 className="text-[#17161A] font-bold text-lg leading-tight">Risk Insights</h3>
                      <p className="text-[#767676] text-xs font-medium">Global Analysis</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-[#60BA81]/10 px-2 py-1 rounded-md">
                     <TrendingUp size={14} className="text-[#60BA81]" />
                     <span className="text-[#60BA81] text-[10px] font-bold uppercase">Prevention Active</span>
                  </div>
                </div>

                {/* Chart Visualization */}
                <div className="flex items-end justify-between gap-3 h-32 px-2 border-b border-[#F5F5F7] pb-6">
                   {[
                      { label: "Harassment", val: 30, color: "#284952", opacity: 0.3 },
                      { label: "Behavior", val: 85, color: "#F5A83C", opacity: 1 }, // Highlighting the issue from the card (Mr. Areeb/Behavior)
                      { label: "Wages", val: 45, color: "#284952", opacity: 0.3 },
                      { label: "Safety", val: 20, color: "#284952", opacity: 0.3 },
                   ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
                         {item.label === "Behavior" && (
                            <motion.div 
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="bg-[#17161A] text-white text-[9px] px-1.5 py-0.5 rounded"
                            >
                                Recurring
                            </motion.div>
                         )}
                         <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${item.val}%` }}
                            transition={{ delay: i * 0.1, duration: 1, type: "spring" }}
                            className="w-full rounded-t-md relative overflow-hidden"
                            style={{ backgroundColor: item.color, opacity: item.opacity }}
                         />
                         <span className="text-[9px] font-bold text-[#767676] uppercase tracking-wide">{item.label}</span>
                      </div>
                   ))}
                </div>

                {/* Footer Action */}
                <div className="mt-4 flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center">
                      <FileCheck size={14} className="text-[#284952]" />
                   </div>
                   <p className="text-xs text-[#17161A]/80 font-medium leading-tight">
                      Factory advised to conduct sensitization training on <span className="font-bold text-[#284952]">Behavioral Conduct</span>.
                   </p>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating UI Context Tag */}
      <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-sm">
        <Activity size={12} className={showInsights ? "text-[#60BA81]" : "text-[#F5A83C]"} />
        <span className="text-[#17161A] text-[10px] font-bold tracking-widest uppercase">
            {showInsights ? "RISK PREVENTION" : "CASE RESOLUTION"}
        </span>
      </div>

    </div>
  )
}