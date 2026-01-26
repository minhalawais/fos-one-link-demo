"use client"

import React, { useMemo } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import {
  ShieldCheck,
  Globe,
  Users,
  LayoutDashboard,
  CheckCircle2,
  Zap
} from "lucide-react"

// --- THEME CONSTANTS ---
const COLORS = {
  teal: "#284952",       // Deep Teal
  green: "#60BA81",      // Fresh Green
  orange: "#F5A83C",     // Warm Orange
  white: "#FFFFFF",      // Pure White
  grayLight: "#F5F5F7",
  accentGreen: "rgba(96, 186, 129, 0.42)",
}

// Apple-style Easing
const EASE_OUT = [0.16, 1, 0.3, 1]
const EASE_IN = [0.7, 0, 0.84, 0]

// --- SYSTEM NODES ---
// Representing the previous chapters coming together
const SystemNode = ({
  icon: Icon,
  label,
  angle,
  delay,
  isMerged
}: {
  icon: any,
  label: string,
  angle: number,
  delay: number,
  isMerged: boolean
}) => {
  // Distance from center start (dispersed) vs end (merged)
  const radius = 180
  const x = Math.cos(angle * (Math.PI / 180)) * radius
  const y = Math.sin(angle * (Math.PI / 180)) * radius

  return (
    <motion.div
      initial={{ x, y, opacity: 0, scale: 0 }}
      animate={{
        x: isMerged ? 0 : x,
        y: isMerged ? 0 : y,
        opacity: isMerged ? 0 : 1, // Fade out as they hit center
        scale: isMerged ? 0.5 : 1
      }}
      transition={{
        duration: 1.5,
        ease: isMerged ? "backIn" : EASE_OUT,
        delay: isMerged ? 0 : delay
      }}
      className="absolute z-10 flex flex-col items-center"
    >
      <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[#284952] border border-[#60BA81]/30">
        <Icon size={32} />
      </div>
      <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#284952] bg-white/80 px-2 py-1 rounded-full">
        {label}
      </span>
    </motion.div>
  )
}

// --- MAIN COMPONENT ---
export default function SceneClosing({ isActive, progress }: { isActive: boolean, progress: number }) {

  // TIMELINE (149s Start)
  // 149-151s: Convergence (Nodes fly in)
  // 151s: Impact! (Fusion)
  // 151s+: Pulse Loop & Text Reveal

  const localTime = isActive ? Math.max(0, progress - 149) : 0
  const isMerged = localTime > 2.0 // Fusion happens at 2s (151s absolute)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#f8f9fc] to-[#eef2f6] relative overflow-hidden font-sans select-none">

      {/* 1. BACKGROUND PULSE (Post-Fusion) */}
      {isMerged && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[800px] h-[800px] rounded-full border border-[#60BA81]/30"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeOut"
              }}
            />
          ))}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#60BA81]/10 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      )}

      {/* 2. CONVERGING NODES (Pre-Fusion) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <SystemNode
          icon={Globe} label="Data" angle={-135} delay={0} isMerged={isMerged}
        />
        <SystemNode
          icon={ShieldCheck} label="Awareness" angle={-45} delay={0.1} isMerged={isMerged}
        />
        <SystemNode
          icon={Users} label="Officers" angle={45} delay={0.2} isMerged={isMerged}
        />
        <SystemNode
          icon={LayoutDashboard} label="Portal" angle={135} delay={0.3} isMerged={isMerged}
        />
      </div>

      {/* 3. CENTRAL FUSION CORE (Post-Fusion) */}
      <AnimatePresence>
        {isMerged && (
          <motion.div
            className="relative z-20 flex flex-col items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Glowing Core */}
            <div className="relative w-40 h-40">
              {/* Spinning Rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-dashed border-[#60BA81]"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 rounded-full border-4 border-[#284952]/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />

              {/* Main Logo Shield */}
              <div className="absolute inset-2 bg-white rounded-full shadow-[0_0_50px_rgba(96,186,129,0.5)] flex items-center justify-center border-4 border-white">
                <CheckCircle2 size={64} className="text-[#60BA81] drop-shadow-md" />
              </div>

              {/* Sparkles */}
              <motion.div
                className="absolute -top-4 -right-4 text-[#F5A83C]"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.5 }}
              >
                <Zap size={32} fill="currentColor" />
              </motion.div>
            </div>

            {/* Text Reveal */}
            <motion.div
              className="mt-8 text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-3xl font-black text-[#284952] mb-2 tracking-tight">
                SYSTEM ACTIVE
              </h1>
              <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#60BA81] animate-pulse" />
                Fully Functional
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. FINAL CTA (Late Appearance) */}
      {localTime > 5 && (
        <motion.div
          className="absolute bottom-12 z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 px-6 py-3 bg-white rounded-full shadow-lg border border-[#60BA81]/20">
            <span className="text-sm font-bold text-[#284952]">Fruit of Sustainability</span>
            <div className="h-4 w-[1px] bg-gray-300" />
            <span className="text-xs text-[#60BA81] font-medium">Ready for Deployment</span>
          </div>
        </motion.div>
      )}

    </div>
  )
}
