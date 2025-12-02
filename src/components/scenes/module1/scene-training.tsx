"use client"

import React from 'react'
import { motion, AnimatePresence } from "framer-motion"
import {
  Users,
  Presentation,
  MonitorPlay,
} from "lucide-react"

// --- CONSTANTS ---
const COLORS = {
  Teal: "#284952",
  Green: "#60BA81",
  Orange: "#F5A83C",
}

const ASSETS = {
  training_bg_1: "linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)",
  training_bg_2: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
  training_bg_3: "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)"
}

// --- SUB-COMPONENT ---
const SessionCard = ({ title, icon: Icon, color, delay, className, children }: any) => (
  <motion.div
    className={`rounded-2xl overflow-hidden relative shadow-lg border border-white/50 ${className}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
    transition={{ delay, duration: 0.6 }}
  >
    {/* Background Content */}
    <div className="absolute inset-0 bg-white/50">
      {children}
    </div>

    {/* Overlay Badge */}
    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-3 py-2 rounded-lg shadow-sm flex items-center gap-3">
      <div className="p-1.5 rounded-md text-white" style={{ backgroundColor: color }}>
        <Icon size={14} />
      </div>
      <span className="text-[10px] font-bold text-[#284952] uppercase tracking-wider">{title}</span>
    </div>
  </motion.div>
)

// --- MAIN COMPONENT ---
export default function SceneTraining({ isActive }: { isActive: boolean, progress: number }) {
  // TIMELINE: 71s - 85s (Static visuals)

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#F5F5F7] relative overflow-hidden font-sans">

      {/* --- BACKGROUND AMBIENCE --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-1/2 -right-1/2 w-[100%] h-[100%] bg-gradient-to-b from-[#60BA81]/10 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* --- CONTENT GRID --- */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            key="photos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
            transition={{ duration: 0.8 }}
            className="w-full h-full flex items-center justify-center p-6 md:p-12 z-10"
          >
            <div className="grid grid-cols-6 grid-rows-2 gap-4 w-full h-full max-w-6xl">

              {/* 1. Worker Training (Large Left) */}
              <SessionCard
                title="Worker Reporting Training"
                icon={Users}
                color={COLORS.Green}
                delay={0}
                className="col-span-3 row-span-2 bg-gray-100"
              >
                <div className="w-full h-full opacity-30" style={{ background: ASSETS.training_bg_1 }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Users size={64} className="text-[#284952] opacity-20" />
                  </div>
                </div>
              </SessionCard>

              {/* 2. Management Briefing (Top Right) */}
              <SessionCard
                title="Management Dashboard Briefing"
                icon={Presentation}
                color={COLORS.Teal}
                delay={0.2}
                className="col-span-3 row-span-1 bg-gray-50"
              >
                <div className="w-full h-full opacity-30" style={{ background: ASSETS.training_bg_2 }} />
              </SessionCard>

              {/* 3. System Walkthrough (Bottom Right) */}
              <SessionCard
                title="Full System Walkthrough"
                icon={MonitorPlay}
                color={COLORS.Orange}
                delay={0.4}
                className="col-span-3 row-span-1 bg-gray-50"
              >
                <div className="w-full h-full opacity-30" style={{ background: ASSETS.training_bg_3 }} />
              </SessionCard>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FOOTER STATUS INDICATOR --- */}
      <motion.div
        className="absolute bottom-6 bg-white/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/50 text-[#284952] flex items-center gap-2 shadow-sm z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] font-bold tracking-widest uppercase">
          Deployment Phase: On-Site
        </span>
      </motion.div>

    </div>
  )
}