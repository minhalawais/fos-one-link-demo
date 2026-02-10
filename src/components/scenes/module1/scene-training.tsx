"use client"

import React, { useMemo } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Target,
  GraduationCap,
  Briefcase,
  Monitor,
  ClipboardList,
} from "lucide-react"

// ─── IMAGE ASSETS ───
const PHASE_IMAGES = {
  SITE: [
    "/assets/setup1.jpeg",
    "/assets/setup2.jpeg",
    "/assets/setup3.jpeg",
  ],
  WORKER: [
    "/assets/training1.jpg",
    "/assets/training2.jpeg",
    "/assets/training3.jpeg",
  ],
  MGMT: [
    "/assets/briefing1.jpg",
    "/assets/briefing2.jpeg",
    "/assets/briefing3.jpeg",
  ],
}

// ─── BRAND COLORS ───
const C = {
  teal: "#284952",
  green: "#60BA81",
  orange: "#F5A83C",
  white: "#FFFFFF",
  bg: "#F8FAFC",
  charcoal: "#17161A",
}

// ─── PHASE CONFIGURATION ───
const PHASES = [
  {
    key: 'SITE' as const,
    label: 'On-Site Setup',
    subtitle: 'Facility Walkthrough & Mapping',
    color: C.orange,
    colorLight: 'rgba(245,168,60,0.12)',
    icon: MapPin,
    captions: ["Facility walkthrough", "Safety zone mapping", "Physical assessment"],
  },
  {
    key: 'WORKER' as const,
    label: 'Worker Training',
    subtitle: 'Empowering Reporting',
    color: C.green,
    colorLight: 'rgba(96,186,129,0.12)',
    icon: GraduationCap,
    captions: ["Reporting mechanisms", "Rights awareness", "Hands-on practice"],
  },
  {
    key: 'MGMT' as const,
    label: 'Management Briefing',
    subtitle: 'System & Dashboard Overview',
    color: C.teal,
    colorLight: 'rgba(40,73,82,0.12)',
    icon: Briefcase,
    captions: ["Dashboard walkthrough", "Admin responsibilities", "Full system overview"],
  },
]

// ─── OVERLAY COMPONENTS ───

const SiteOverlay = ({ caption }: { caption: string }) => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-white/60 rounded-tl-lg" />
    <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-white/60 rounded-tr-lg" />
    <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-white/60 rounded-bl-lg" />
    <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-white/60 rounded-br-lg" />

    <motion.div
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5A83C]/60 to-transparent"
      animate={{ top: ["10%", "90%", "10%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />

    <motion.div
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: "spring" }}
      className="absolute top-6 left-6 bg-black/60 backdrop-blur-lg px-4 py-2.5 rounded-xl flex items-center gap-3 border border-white/10"
    >
      <div className="w-8 h-8 rounded-lg bg-[#F5A83C] flex items-center justify-center">
        <MapPin size={16} className="text-white" />
      </div>
      <div>
        <div className="text-[8px] font-bold text-white/50 uppercase tracking-[0.15em]">Site Assessment</div>
        <div className="text-xs font-bold text-white">{caption}</div>
      </div>
    </motion.div>

    <motion.div
      className="absolute bottom-6 right-6"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      <Target size={28} className="text-white/30" strokeWidth={1} />
    </motion.div>
  </div>
)

const WorkerOverlay = ({ caption }: { caption: string }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div
      className="absolute left-0 right-0 h-32 bg-gradient-to-b from-[#60BA81]/15 to-transparent"
      animate={{ top: ["-15%", "100%"] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    />

    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#284952]/90 backdrop-blur-lg text-white px-5 py-2.5 rounded-full shadow-2xl border border-[#60BA81]/40 flex items-center gap-3"
    >
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="w-2 h-2 rounded-full bg-[#60BA81]"
      />
      <span className="text-xs font-bold tracking-wide">{caption}</span>
      <CheckCircle2 size={14} className="text-[#60BA81]" />
    </motion.div>

    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="absolute top-6 right-6 bg-black/50 backdrop-blur-lg p-3 rounded-xl border border-white/10"
    >
      <ShieldCheck size={20} className="text-[#60BA81]" />
    </motion.div>
  </div>
)

const MgmtOverlay = ({ caption }: { caption: string }) => (
  <div className="absolute inset-0 pointer-events-none">
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: "spring" }}
      className="absolute top-6 right-6 w-52 bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/60"
    >
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200/60">
        <Monitor size={14} className="text-[#284952]" />
        <span className="text-[10px] font-black text-[#284952] uppercase tracking-wider">System Dashboard</span>
      </div>
      <div className="space-y-2.5">
        {[
          { label: "Readiness", pct: 85, color: C.green },
          { label: "Modules", pct: 100, color: C.teal },
          { label: "Alerts", pct: 30, color: C.orange },
        ].map((bar) => (
          <div key={bar.label} className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-gray-500 w-14">{bar.label}</span>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${bar.pct}%` }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-full rounded-full"
                style={{ backgroundColor: bar.color }}
              />
            </div>
            <span className="text-[9px] font-bold" style={{ color: bar.color }}>{bar.pct}%</span>
          </div>
        ))}
      </div>
    </motion.div>

    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="absolute bottom-6 left-6 bg-[#284952] text-white px-5 py-2.5 rounded-xl shadow-xl flex items-center gap-2"
    >
      <ClipboardList size={14} className="text-[#60BA81]" />
      <span className="text-xs font-bold">{caption}</span>
    </motion.div>
  </div>
)

// ─── MAIN COMPONENT ───

export default function SceneTraining({ isActive, progress }: { isActive: boolean; progress: number }) {
  const sceneStart = 101
  const localTime = isActive ? Math.max(0, progress - sceneStart) : 0

  // Clamped Phase Index: Ensures we never exceed index 2 even if the progress is exactly at the boundary
  const phaseIndex = useMemo(() => {
    if (localTime < 6) return 0
    if (localTime < 12) return 1
    return 2
  }, [localTime])

  const phase = PHASES[phaseIndex]

  // Image cycling logic: Fixed boundary overshoots to prevent "sticking"
  const imageIndex = useMemo(() => {
    if (phaseIndex === 0) return Math.min(2, Math.floor(localTime / 2))
    if (phaseIndex === 1) return Math.min(2, Math.floor((localTime - 6) / 2))
    // Uses 2.33s for Mgmt phase to ensure all 3 images fit comfortably in the final 7s (12-19s)
    return Math.min(2, Math.floor((localTime - 12) / 2.33))
  }, [localTime, phaseIndex])

  const currentImages = PHASE_IMAGES[phase.key]
  const currentImage = currentImages[imageIndex]
  const currentCaption = phase.captions[imageIndex]
  const PhaseIcon = phase.icon

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#F8FAFC] via-white to-[#F1F5F9] relative overflow-hidden font-sans flex flex-col">

      {/* ── AMBIENT BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(#E2E8F0_1px,transparent_1px),linear-gradient(90deg,#E2E8F0_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[100px]"
          style={{ backgroundColor: `${phase.color}08` }}
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ backgroundColor: `${C.green}08` }}
        />
      </div>

      {/* ── TOP HEADER ── */}
      <div className="relative z-20 pt-4 pb-2 flex flex-col items-center shrink-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase.key}
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 15, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-1"
          >
            <div
              className="flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.15em]"
              style={{ backgroundColor: phase.colorLight, color: phase.color }}
            >
              <PhaseIcon size={11} />
              Phase {phaseIndex + 1} of 3
            </div>

            <h2 className="text-2xl font-black text-[#0F172A] tracking-tight leading-tight">
              {phase.label}
            </h2>
            <p className="text-xs font-medium text-slate-400">{phase.subtitle}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="flex-1 min-h-0 relative z-10 flex items-center justify-center px-8 py-2">
        <div className="w-full h-full max-w-[90%] max-h-full flex gap-4 items-stretch">

          {/* ── HERO IMAGE ── */}
          <div className="flex-1 min-w-0 relative rounded-2xl overflow-hidden shadow-[0_25px_80px_-15px_rgba(0,0,0,0.15)] bg-white p-1.5">
            <div className="w-full h-full relative rounded-xl overflow-hidden bg-slate-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${phase.key}-${imageIndex}`}
                  className="absolute inset-0"
                  initial={{ scale: 1.08, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.img
                    src={currentImage}
                    alt={currentCaption}
                    className="w-full h-full object-cover"
                    animate={{ scale: [1, 1.06] }}
                    transition={{ duration: 6, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

                  {phaseIndex === 0 && <SiteOverlay caption={currentCaption} />}
                  {phaseIndex === 1 && <WorkerOverlay caption={currentCaption} />}
                  {phaseIndex === 2 && <MgmtOverlay caption={currentCaption} />}
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-4 left-4 z-30 flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-1 rounded-full"
                    animate={{
                      width: i === imageIndex ? 24 : 8,
                      backgroundColor: i === imageIndex ? phase.color : 'rgba(255,255,255,0.4)',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── THUMBNAIL STRIP ── */}
          <div className="w-24 flex flex-col gap-2 shrink-0">
            {currentImages.map((thumb, i) => (
              <motion.div
                key={`${phase.key}-thumb-${i}`}
                className="flex-1 relative rounded-xl overflow-hidden cursor-pointer"
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                style={{
                  border: i === imageIndex ? `2px solid ${phase.color}` : '2px solid transparent',
                  boxShadow: i === imageIndex ? `0 0 15px ${phase.color}30` : '0 4px 12px rgba(0,0,0,0.06)',
                }}
              >
                <img
                  src={thumb}
                  alt={phase.captions[i]}
                  className="w-full h-full object-cover"
                  style={{
                    filter: i === imageIndex ? 'none' : 'brightness(0.6)',
                    transition: 'filter 0.3s ease',
                  }}
                />
                {i === imageIndex && (
                  <motion.div
                    layoutId="activeThumb"
                    className="absolute inset-0 border-2 rounded-xl"
                    style={{ borderColor: phase.color }}
                  />
                )}
                <div
                  className="absolute top-1.5 left-1.5 w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black"
                  style={{
                    backgroundColor: i === imageIndex ? phase.color : 'rgba(0,0,0,0.5)',
                    color: C.white,
                  }}
                >
                  {i + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM PHASE PROGRESS ── */}
      <div className="relative z-20 py-3 px-12 shrink-0">
        <div className="flex items-center gap-3">
          {PHASES.map((p, i) => {
            const isPhaseActive = i === phaseIndex
            const isPhaseComplete = i < phaseIndex
            const PIcon = p.icon
            return (
              <React.Fragment key={p.key}>
                <motion.div
                  className="flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all duration-300"
                  style={{
                    backgroundColor: isPhaseActive ? p.colorLight : isPhaseComplete ? `${p.color}08` : 'transparent',
                    border: isPhaseActive ? `1.5px solid ${p.color}40` : '1.5px solid transparent',
                  }}
                  animate={{ scale: isPhaseActive ? 1 : 0.95 }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: isPhaseActive || isPhaseComplete ? p.color : '#E2E8F0',
                    }}
                  >
                    {isPhaseComplete ? (
                      <CheckCircle2 size={14} className="text-white" />
                    ) : (
                      <PIcon size={14} className={isPhaseActive ? "text-white" : "text-slate-400"} />
                    )}
                  </div>
                  <div>
                    <div
                      className="text-[10px] font-black uppercase tracking-wider"
                      style={{ color: isPhaseActive ? p.color : isPhaseComplete ? p.color : '#94A3B8' }}
                    >
                      {p.label}
                    </div>
                  </div>
                </motion.div>

                {i < PHASES.length - 1 && (
                  <div className="flex-1 h-px relative">
                    <div className="absolute inset-0 bg-slate-200" />
                    {isPhaseComplete && (
                      <motion.div
                        className="absolute inset-0 h-px"
                        style={{ backgroundColor: p.color }}
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}