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

  const imageIndex = 0 // Default to 0 for overlays if needed, though grid uses all 3.
  const currentImages = PHASE_IMAGES[phase.key]
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
            <h2 className="text-2xl font-black text-[#0F172A] tracking-tight leading-tight">
              {phase.label}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── TOP PHASE PROGRESS ── */}
      <div className="relative z-20 py-0 px-12 shrink-0">
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

      {/* ── MAIN CONTENT AREA ── */}
      <div className="flex-1 min-h-0 relative z-10 flex items-center justify-center px-8 py-2">
        <div className="w-full h-full max-w-[90%] max-h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase.key}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full h-full grid grid-cols-12 grid-rows-2 gap-4"
            >
              {/* ── PRIMARY IMAGE (Large, Left) ── */}
              <div className="col-span-8 row-span-2 relative rounded-2xl overflow-hidden shadow-2xl bg-white p-1">
                <div className="w-full h-full relative rounded-xl overflow-hidden bg-slate-100 group">
                  <img
                    src={currentImages[0]}
                    alt={phase.captions[0]}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                  {/* Phase-Specific Overlays (Only on Main Image) */}
                  {phaseIndex === 0 && <SiteOverlay caption={phase.captions[0]} />}
                  {phaseIndex === 1 && <WorkerOverlay caption={phase.captions[0]} />}
                  {phaseIndex === 2 && <MgmtOverlay caption={phase.captions[0]} />}

                  <div className="absolute bottom-4 left-4 z-30">
                    <span className="bg-white/90 backdrop-blur text-black text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                      Primary View
                    </span>
                  </div>
                </div>
              </div>

              {/* ── SECONDARY IMAGES (Right Column) ── */}
              <div className="col-span-4 row-span-1 relative rounded-2xl overflow-hidden shadow-lg bg-white p-1">
                <div className="w-full h-full relative rounded-xl overflow-hidden bg-slate-100 group">
                  <img
                    src={currentImages[1]}
                    alt={phase.captions[1]}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white text-[9px] font-bold leading-tight drop-shadow-md bg-black/40 backdrop-blur-sm px-2 py-1 rounded inline-block">
                      {phase.captions[1]}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-span-4 row-span-1 relative rounded-2xl overflow-hidden shadow-lg bg-white p-1">
                <div className="w-full h-full relative rounded-xl overflow-hidden bg-slate-100 group">
                  <img
                    src={currentImages[2]}
                    alt={phase.captions[2]}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white text-[9px] font-bold leading-tight drop-shadow-md bg-black/40 backdrop-blur-sm px-2 py-1 rounded inline-block">
                      {phase.captions[2]}
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}