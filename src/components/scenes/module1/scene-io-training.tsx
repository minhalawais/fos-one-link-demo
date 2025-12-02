"use client"

import React, { useMemo } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle2,
  ClipboardList,
  UploadCloud,
  Lock,
  ShieldCheck,
  Zap,
  Check,
  FileSearch
} from "lucide-react"

// --- DESIGN SYSTEM CONSTANTS ---
// Exact match to user provided color scheme
const COLORS = {
  teal: "#284952",       // Deep Teal - Main brand color
  green: "#60BA81",      // Fresh Green - Primary actions
  greenLight: "rgba(96, 186, 129, 0.15)",
  charcoal: "#17161A",   // Body Text
  orange: "#F5A83C",     // Warm Orange - Accent/Warning
  white: "#FFFFFF",      // Pure White
  grayLight: "#F5F5F7",  // Light Gray - Backgrounds
  grayMedium: "#767676", // Medium Gray - Secondary text
  grayBorder: "#DEE2E6", // Border Gray
  accentGreen: "rgba(96, 186, 129, 0.42)", // Soft Green Accent
}

const ASSETS = {
  io_officer: "/assets/avatars/male_io_training.png",
}

// Layout Config
// Reduced radius significantly to close gap between image and cards
const ARC_RADIUS = 330
const CENTER_Y_OFFSET = 140

// Apple-style Easing
const IOS_EASE = [0.16, 1, 0.3, 1]

// --- COMPONENT: ORGANIC CONNECTION LINE ---
const ConnectionLine = ({
  startX,
  startY,
  endX,
  endY,
  isActive,
  isVisible
}: {
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  isActive: boolean,
  isVisible: boolean
}) => {
  // Calculate control points for a smooth Bezier curve
  const midX = (startX + endX) / 2
  const midY = (startY + endY) / 2 - 20

  const pathD = `M ${startX},${startY} Q ${midX},${midY} ${endX},${endY}`

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-0">
      <defs>
        <linearGradient id={`grad-${endX}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={COLORS.teal} stopOpacity="0" />
          <stop offset="50%" stopColor={isActive ? COLORS.green : COLORS.teal} stopOpacity={isActive ? 0.8 : 0.2} />
          <stop offset="100%" stopColor={isActive ? COLORS.green : COLORS.teal} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Base subtle line */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={COLORS.teal}
        strokeWidth="1.5"
        strokeOpacity="0.15"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isVisible ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "circOut" }}
      />

      {/* Active Data Stream */}
      {isVisible && (
        <motion.path
          d={pathD}
          fill="none"
          stroke={`url(#grad-${endX})`}
          strokeWidth={isActive ? 3 : 1}
          strokeLinecap="round"
          initial={{ pathLength: 0, strokeDasharray: "0 1" }}
          animate={{
            pathLength: [0, 1],
            strokeDashoffset: [0, -100],
            opacity: isActive ? 1 : 0.3
          }}
          transition={{
            duration: isActive ? 1.5 : 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}

      {/* Pulse Dot traveling the line */}
      {isActive && (
        <motion.circle
          r="4"
          fill={COLORS.green}
        >
          <motion.animateMotion
            dur="1.5s"
            repeatCount="indefinite"
            path={pathD}
            calcMode="linear"
          />
        </motion.circle>
      )}
    </svg>
  )
}

// --- COMPONENT: PREMIUM GLASS CARD ---
const SkillCard = ({
  icon: Icon,
  title,
  subtitle,
  index,
  isActive,
  isMastered,
  isVisible,
  position
}: {
  icon: any
  title: string
  subtitle: string
  index: number
  isActive: boolean
  isMastered: boolean
  isVisible: boolean
  position: { x: number, y: number }
}) => {
  return (
    <motion.div
      className="absolute"
      style={{ left: '50%', top: '50%', x: position.x, y: position.y }}
      initial={{ opacity: 0, scale: 0.8, y: position.y + 40 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? (isActive ? 1.15 : 1) : 0.8,
        y: isVisible ? position.y : position.y + 40,
        zIndex: isActive ? 50 : 10
      }}
      transition={{
        duration: 0.8,
        ease: IOS_EASE,
        delay: index * 0.1
      }}
    >
      <div
        className={`
          relative flex flex-col items-center justify-center p-3 w-32 h-32 rounded-2xl
          backdrop-blur-xl transition-all duration-500
          ${isActive ? 'shadow-[0_20px_40px_-10px_rgba(96,186,129,0.4)]' : 'shadow-sm'}
        `}
        style={{
          background: isActive
            ? 'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(240,250,245,0.95))'
            : 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(245,245,247,0.8))',
          border: `1px solid ${isActive ? COLORS.green : COLORS.grayBorder}`,
        }}
      >
        {/* Status Indicator Dot */}
        <div
          className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full transition-colors duration-500"
          style={{ backgroundColor: isActive ? COLORS.green : COLORS.grayBorder }}
        />

        {/* Icon Container */}
        <div className="relative mb-2">
          <motion.div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md relative z-10"
            style={{ backgroundColor: isActive || isMastered ? COLORS.green : COLORS.teal }}
            animate={{
              scale: isActive ? [1, 1.1, 1] : 1,
              rotate: isActive ? [0, 5, -5, 0] : 0
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Icon size={18} strokeWidth={2.5} />
          </motion.div>

          {/* Ripple Effect behind icon */}
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-full opacity-30"
              style={{ backgroundColor: COLORS.accentGreen }}
              animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </div>

        {/* Text */}
        <h3 className="text-xs font-bold text-center leading-tight mb-1 px-1" style={{ color: COLORS.charcoal }}>
          {title}
        </h3>

        {/* Subtitle - e.g., Module Step */}
        <p className="text-[9px] font-medium text-center uppercase tracking-wide" style={{ color: isActive ? COLORS.teal : COLORS.grayMedium }}>
          {isActive ? "Active Module" : isMastered ? "Completed" : "Pending"}
        </p>

        {/* Mastered Checkmark Badge */}
        <AnimatePresence>
          {isMastered && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -bottom-2 -right-2 text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-md z-20"
              style={{ backgroundColor: COLORS.teal }}
            >
              <Check size={12} strokeWidth={4} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// --- MAIN COMPONENT ---
export default function SceneIOTraining({ progress }: { progress: number }) {

  // TIMELINE LOGIC 
  // 85-92: Validate
  // 92-93.5: CAPA
  // 93.5-95: Evidence
  // 95-97: Close

  const activeStage = useMemo(() => {
    if (progress < 85) return 0
    if (progress < 92) return 1 // Validate Active
    if (progress < 93.5) return 2 // CAPA Active
    if (progress < 95) return 3 // Evidence Active
    if (progress < 97) return 4 // Close Active
    return 5 // All Done
  }, [progress])

  // UPDATED WORDING based on PDF & Script
  // 1. "validate complaints" -> Validation & RCA (PDF: RCA Validation / Validity Assessment)
  // 2. "build corrective action plans" -> CAPA Development (PDF: CAPA Development)
  // 3. "upload evidence" -> Evidence Submission (PDF: Evidence Submission)
  // 4. "close cases" -> Case Closure (PDF: Submission for Closure Review)
  const skills = [
    { icon: FileSearch, title: "Validation & RCA", subtitle: "Assessment", angle: -55 },
    { icon: ClipboardList, title: "CAPA Development", subtitle: "Planning", angle: -20 },
    { icon: UploadCloud, title: "Evidence Submission", subtitle: "Documentation", angle: 20 },
    { icon: Lock, title: "Case Closure", subtitle: "Remediation", angle: 55 }
  ]

  // Calculate positions on the arc
  const getPosition = (angle: number) => {
    const rad = (angle - 90) * (Math.PI / 180) // -90 to start from top
    return {
      x: ARC_RADIUS * Math.cos(rad),
      y: ARC_RADIUS * Math.sin(rad) + CENTER_Y_OFFSET
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden font-sans select-none" style={{ backgroundColor: COLORS.grayLight }}>

      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Grain */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12]" />

        {/* Brand Ambient Glows - Using Fresh Green and Deep Teal */}
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[100px] rounded-full"
          style={{ background: `radial-gradient(circle, ${COLORS.accentGreen} 0%, transparent 70%)` }}
        />
      </div>

      {/* --- MAIN SCENE CONTAINER --- */}
      <div className="relative w-full h-full max-w-5xl mx-auto flex flex-col items-center justify-end pb-0">

        {/* 1. CONNECTING LINES LAYER (Behind IO) */}
        <div className="absolute inset-0 z-0">
          {skills.map((skill, i) => {
            const pos = getPosition(skill.angle)
            // Adjust start point to be roughly chest/head level of IO
            const startX = window.innerWidth < 1024 ? 50 : 500
            const startY = 600

            return (
              <div key={`line-${i}`} className="absolute top-1/2 left-1/2 w-0 h-0 overflow-visible">
                <ConnectionLine
                  startX={0}
                  startY={CENTER_Y_OFFSET - 80} // Start from IO Head/Chest
                  endX={pos.x}
                  endY={pos.y + 60} // Connect to bottom of card
                  isActive={activeStage === i + 1}
                  isVisible={activeStage >= 1}
                />
              </div>
            )
          })}
        </div>

        {/* 2. SKILL CARDS LAYER (Top Arc) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {skills.map((skill, i) => {
            const pos = getPosition(skill.angle)
            const isActive = activeStage === i + 1
            const isMastered = activeStage > i + 1

            return (
              <SkillCard
                key={i}
                index={i}
                {...skill}
                position={{ x: pos.x - 64, y: pos.y - 64 }} // Center offset based on w/h
                isActive={isActive}
                isMastered={isMastered}
                isVisible={activeStage >= 1}
              />
            )
          })}
        </div>

        {/* 3. HERO LAYER: IO OFFICER */}
        <motion.div
          className="relative z-10 h-[75%] flex items-end mt-auto mb-0"
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: activeStage >= 1 ? 0 : 100,
            opacity: activeStage >= 1 ? 1 : 0
          }}
          transition={{ duration: 1, ease: IOS_EASE }}
        >
          <img
            src={ASSETS.io_officer}
            alt="Investigation Officer"
            className="h-full w-auto object-contain drop-shadow-2xl"
          />

          {/* Floating UI: Officer ID */}
          {activeStage >= 1 && (
            <motion.div
              className="absolute top-[40%] -left-24 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border flex flex-col gap-1.5"
              style={{ borderColor: COLORS.white }}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: COLORS.orange }} />
                <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: COLORS.teal }}>System Sync</span>
              </div>
              <div className="h-1.5 w-32 rounded-full overflow-hidden" style={{ backgroundColor: COLORS.grayLight }}>
                <motion.div
                  className="h-full"
                  style={{ backgroundColor: COLORS.green }}
                  initial={{ width: "0%" }}
                  animate={{ width: activeStage === 5 ? "100%" : `${(activeStage / 4) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* 4. FOOTER STATUS BAR */}
        <motion.div
          className="absolute bottom-8 z-30 flex items-center gap-6 bg-white/90 backdrop-blur-xl px-6 py-3 rounded-full border shadow-lg"
          style={{ borderColor: COLORS.white, color: COLORS.charcoal }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex items-center gap-3 pr-4 border-r" style={{ borderColor: COLORS.grayBorder }}>
            <div className="p-1.5 rounded-lg text-white" style={{ backgroundColor: COLORS.teal }}>
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider" style={{ color: COLORS.grayMedium }}>Module</p>
              <p className="text-sm font-bold" style={{ color: COLORS.teal }}>Investigation Officer</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold tracking-wider" style={{ color: COLORS.grayMedium }}>Status</p>
              <p className="text-sm font-semibold" style={{ color: activeStage === 5 ? COLORS.green : COLORS.orange }}>
                {activeStage === 0 ? "Standby" : activeStage === 5 ? "Certified" : "Training Active..."}
              </p>
            </div>

            {/* Animated Ring Chart */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                <circle cx="20" cy="20" r="16" fill="none" stroke={COLORS.grayBorder} strokeWidth="4" />
                <motion.circle
                  cx="20" cy="20" r="16" fill="none" stroke={COLORS.green} strokeWidth="4" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: Math.min((activeStage - 1) / 4, 1) }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              {activeStage === 5 ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ color: COLORS.green }}
                >
                  <Check size={14} strokeWidth={4} />
                </motion.div>
              ) : (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ color: COLORS.orange }}
                >
                  <Zap size={14} fill="currentColor" />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}