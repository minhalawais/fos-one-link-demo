"use client"

import React, { useMemo } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle2,
  ClipboardList,
  UploadCloud,
  Lock,
  ShieldCheck,
  Check,
  FileSearch,
  Stamp,
  Users
} from "lucide-react"

// --- THEME CONSTANTS ---
const COLORS = {
  teal: "#284952",       // Deep Teal
  green: "#60BA81",      // Fresh Green
  white: "#FFFFFF",      // Pure White
  grayBorder: "#DEE2E6", // Border Gray
}

// --- MICRO-ANIMATIONS ---
const ValidationAnim = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-gray-200">
      <FileSearch size={32} />
    </motion.div>
    <motion.div
      initial={{ scale: 2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="absolute bottom-0 right-0 bg-[#60BA81] text-white p-1 rounded-full shadow-lg"
    >
      <Check size={12} strokeWidth={4} />
    </motion.div>
  </div>
)

const BlueprintAnim = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div animate={{ opacity: 1 }} className="absolute inset-0 border-2 border-dashed border-[#F5A83C]/30 rounded-lg" />
    <ClipboardList size={28} className="text-[#F5A83C]" />
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "80%" }}
      transition={{ duration: 1 }}
      className="absolute bottom-2 h-1 bg-[#F5A83C] rounded-full"
    />
  </div>
)

const UploadAnim = () => (
  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#284952]/10 rounded-b-lg" />
    <UploadCloud size={28} className="text-[#284952] relative z-10" />
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: -20, opacity: [0, 1, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="absolute flex flex-col items-center justify-center"
    >
      <div className="w-1 h-1 bg-[#284952] rounded-full mb-1" />
      <div className="w-1 h-1 bg-[#284952] rounded-full" />
    </motion.div>
  </div>
)

const ClosureAnim = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <ShieldCheck size={32} className="text-[#284952]" />
    <motion.div
      initial={{ scale: 1.5, opacity: 0, rotate: -20 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ delay: 0.3 }}
      className="absolute -top-1 -right-1"
    >
      <Stamp size={20} className="text-[#60BA81]" />
    </motion.div>
  </div>
)

// --- CARD COMPONENT ---
const SkillNode = ({
  icon: Icon,
  title,
  isActive,
  isCompleted,
  isVisible,
  pos,
  anim: Anim
}: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isActive ? 1.1 : isVisible ? 1 : 0,
        x: pos.x,
        y: pos.y
      }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="absolute flex flex-col items-center justify-center z-20"
      style={{ left: '50%', top: '50%', marginLeft: '-3.5rem', marginTop: '-3.5rem' }} // Center the 7rem (w-28) box
    >
      <div className={`
          relative w-28 h-28 bg-white rounded-2xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] 
          flex flex-col items-center justify-center p-2
          border-2 transition-colors duration-300
          ${isActive ? 'border-[#60BA81]' : 'border-transparent'}
          ${isCompleted ? 'border-[#60BA81]/50' : ''}
      `}>
        {isActive ? (
          <div className="w-16 h-16 mb-2">
            <Anim />
          </div>
        ) : (
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${isCompleted ? 'bg-[#60BA81]/10 text-[#60BA81]' : 'bg-gray-100 text-gray-400'}`}>
            {isCompleted ? <Check size={24} strokeWidth={3} /> : <Icon size={24} />}
          </div>
        )}

        <span className={`text-[10px] font-bold text-center leading-tight ${isActive ? 'text-[#284952]' : 'text-gray-500'}`}>
          {title}
        </span>

        {/* Active Progress Ring */}
        {isActive && (
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <rect width="100%" height="100%" fill="none" rx="14" ry="14" />
            <motion.rect
              width="100%" height="100%" rx="14" ry="14"
              fill="none" stroke="#60BA81" strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, ease: "linear" }}
            />
          </svg>
        )}
      </div>
    </motion.div>
  )
}

// --- MAIN SCENE ---
export default function SceneIOTraining({ isActive, progress }: { isActive: boolean, progress: number }) {

  const localTime = isActive ? Math.max(0, progress - 134) : 0

  const stage = useMemo(() => {
    if (localTime < 3) return -1 // FOS Team Intro
    if (localTime < 6) return 0
    if (localTime < 9) return 1
    if (localTime < 12) return 2
    if (localTime < 15) return 3
    return 4
  }, [localTime])

  const skills = [
    { icon: FileSearch, title: "Validation", anim: ValidationAnim },
    { icon: ClipboardList, title: "CAPA Plan", anim: BlueprintAnim },
    { icon: UploadCloud, title: "Evidence", anim: UploadAnim },
    { icon: Lock, title: "Closure", anim: ClosureAnim },
  ]

  // Wider Layout Positions to prevent overlap
  // Center is (0,0). Avatar radius is ~80px.
  // We place cards at +/- 220px in X and +/- 120px in Y
  const positions = [
    { x: -220, y: -120 }, // Top Left
    { x: 220, y: -120 },  // Top Right
    { x: -220, y: 120 },  // Bottom Left
    { x: 220, y: 120 }    // Bottom Right
  ]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#f8f9fc] relative overflow-hidden font-sans">

      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#284952 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />

      {/* --- SVG LINES LAYER (Z-0) --- */}
      {/* This ensures lines are drawn properly behind everything */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-visible">
        {skills.map((_, i) => (
          stage >= i && (
            <motion.line
              key={`line-${i}`}
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${positions[i].x}px)`}
              y2={`calc(50% + ${positions[i].y}px)`}
              stroke={stage === i ? COLORS.green : COLORS.grayBorder}
              strokeWidth="2"
              strokeDasharray={stage === i ? "none" : "4 4"}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            />
          )
        ))}
      </svg>

      {/* --- CENTRAL AVATAR (Z-10) --- */}
      <motion.div
        className="relative z-10 w-40 h-40 rounded-full border-[6px] border-white shadow-2xl flex items-center justify-center bg-gray-100 overflow-hidden"
        initial={{ scale: 0 }}
        animate={{ scale: 1, boxShadow: stage === 4 ? "0 0 60px #60BA81" : "0 20px 40px rgba(0,0,0,0.1)" }}
        transition={{ type: "spring" }}
      >
        <img src="/assets/avatars/male_io_training.png" className="w-full h-full object-cover" alt="Officer" />

        {/* FOS Team Intro Overlay */}
        <AnimatePresence>
          {stage === -1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#284952]/90 flex flex-col items-center justify-center text-white"
            >
              <Users size={32} className="mb-2" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-center px-4 leading-tight">
                FOS Team<br />Training
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage === 4 && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="absolute inset-0 bg-[#60BA81]/90 flex flex-col items-center justify-center text-white"
            >
              <CheckCircle2 size={48} className="mb-1" />
              <span className="text-xs font-bold uppercase tracking-widest">Certified</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* --- SKILL NODES (Z-20) --- */}
      {skills.map((skill, i) => (
        <SkillNode
          key={i}
          {...skill}
          index={i}
          isActive={stage === i}
          isCompleted={stage > i}
          isVisible={stage >= i}
          pos={positions[i]}
        />
      ))}

      {/* --- BOTTOM LABEL --- */}
      <div className="absolute bottom-12 w-full text-center z-30">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg border border-gray-100"
          >
            <div className={`w-2 h-2 rounded-full ${stage === 4 ? 'bg-[#60BA81]' : stage === -1 ? 'bg-[#284952]' : 'bg-[#F5A83C] animate-pulse'}`} />
            <span className="text-sm font-bold text-[#284952]">
              {stage === -1 && "FOS Team: Initiating Training..."}
              {stage === 0 && "Module 1: Validating Complaints"}
              {stage === 1 && "Module 2: Building CAPA Plans"}
              {stage === 2 && "Module 3: Uploading Evidence"}
              {stage === 3 && "Module 4: Closing Procedures"}
              {stage === 4 && "Training Complete"}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  )
}
