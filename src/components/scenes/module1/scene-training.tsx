"use client"

import React, { useMemo } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin,
  ScanFace,
  BarChart3,
  CheckCircle2,
  Users,
  Building2,
  LayoutDashboard,
  ShieldCheck,
  Target,
  FileText,
  Activity
} from "lucide-react"

// --- ASSETS ---
const TRAINING_IMAGES = [
  "/assets/training.jpg",  // 0: Site 1
  "/assets/training1.jpg", // 1: Site 2
  "/assets/training2.jpg", // 2: Site 3
  "/assets/training3.jpg", // 3: Worker 1
  "/assets/training4.jpg", // 4: Worker 2
  "/assets/training.jpg",  // 5: Worker 3
  "/assets/training1.jpg", // 6: Mgmt 1
  "/assets/training2.jpg", // 7: Mgmt 2
  "/assets/training3.jpg", // 8: Mgmt 3
  "/assets/training4.jpg", // 9: Mgmt 4
]

const COLORS = {
  Teal: "#284952",
  Green: "#60BA81",
  Orange: "#F5A83C",
  White: "#FFFFFF",
}

// --- AUGMENTED REALITY OVERLAYS ---

// 1. SITE OVERLAY: "Mapping the Facility"
const SiteOverlay = ({ label }: { label: string }) => (
  <div className="absolute inset-0 pointer-events-none">
    {/* Animated Dashed Border */}
    <div className="absolute inset-4 border-2 border-dashed border-white/50 rounded-lg opacity-70" />

    {/* Floating Location Pin */}
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: "spring" }}
      className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg flex items-center gap-3"
    >
      <div className="bg-[#F5A83C] p-1.5 rounded-full text-white">
        <MapPin size={16} />
      </div>
      <div>
        <div className="text-[9px] font-bold text-[#767676] uppercase tracking-wider">Site Checked</div>
        <div className="text-sm font-black text-[#284952] leading-none">{label}</div>
      </div>
    </motion.div>

    {/* Technical Crosshairs */}
    <motion.div
      className="absolute bottom-8 right-8 text-white/80"
      initial={{ rotate: 90, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
    >
      <Target size={32} strokeWidth={1} />
    </motion.div>
  </div>
)

// 2. WORKER OVERLAY: "Empowering & Reporting"
const WorkerOverlay = ({ label }: { label: string }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
    {/* Soft Scan Light */}
    <motion.div
      className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#60BA81]/20 to-transparent z-10"
      animate={{ top: ["-20%", "120%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Interactive Badge Pop-up */}
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#284952] text-white px-5 py-2 rounded-full shadow-2xl border border-[#60BA81] flex items-center gap-3 z-20"
    >
      <ScanFace size={18} className="text-[#60BA81]" />
      <span className="text-xs font-bold tracking-wide">Report Mechanism: <span className="text-[#60BA81]">Active</span></span>
    </motion.div>
  </div>
)

// 3. MANAGEMENT OVERLAY: "System Briefing"
const ManagementOverlay = ({ label }: { label: string }) => (
  <div className="absolute inset-0 pointer-events-none">
    {/* Glassmorphism Sidebar Widget */}
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="absolute top-8 right-8 w-48 bg-white/80 backdrop-blur-xl p-4 rounded-xl shadow-2xl border border-white/50"
    >
      <div className="flex items-center gap-2 mb-3 border-b border-[#284952]/10 pb-2">
        <LayoutDashboard size={14} className="text-[#284952]" />
        <span className="text-[10px] font-black text-[#284952] uppercase">System Overview</span>
      </div>

      {/* Fake Charts */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-[9px] text-[#767676] font-bold">Usage</span>
          <div className="h-1.5 w-16 bg-[#F0F2F5] rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: "80%" }} className="h-full bg-[#60BA81]" />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[9px] text-[#767676] font-bold">Alerts</span>
          <div className="h-1.5 w-16 bg-[#F0F2F5] rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: "40%" }} className="h-full bg-[#F5A83C]" />
          </div>
        </div>
      </div>
    </motion.div>

    {/* Context Label */}
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="absolute bottom-6 left-6 bg-[#60BA81] text-white px-4 py-1.5 rounded-lg shadow-lg text-xs font-bold"
    >
      {label}
    </motion.div>
  </div>
)

// --- MAIN COMPONENT ---

export default function SceneTraining({ isActive, progress }: { isActive: boolean, progress: number }) {
  // Logic
  const sceneStart = 101
  const localTime = isActive ? Math.max(0, progress - sceneStart) : 0

  // Script Sync Logic (19s Total)
  // "FOS team visits... on site sessions" -> 0-6s
  // "training workers on how to report..." -> 6-12s
  // "briefing management on dashboards..." -> 12-19s
  const phase = useMemo(() => {
    if (localTime < 6) return 'SITE'
    if (localTime < 12) return 'WORKER'
    return 'MGMT'
  }, [localTime])

  // Active Image Calculation
  const globalImageIndex = useMemo(() => {
    if (phase === 'SITE') return Math.min(2, Math.floor(localTime / 2))
    if (phase === 'WORKER') return Math.min(5, 3 + Math.floor((localTime - 6) / 2))
    return Math.min(9, 6 + Math.floor((localTime - 12) / 1.75)) // Faster pace for 4 images
  }, [localTime, phase])

  const currentImage = TRAINING_IMAGES[globalImageIndex]

  // Context Labels synced with script
  const labels = [
    "Facility Walkthrough", "Safety Zone Setup", "Physical Inspection", // Site
    "Reporting Tools", "Voice Mechanism", "Worker Rights",              // Worker
    "Dashboard Setup", "Admin Controls", "Responsibility Matrix", "Full Rollout" // Mgmt
  ]

  return (
    <div className="w-full h-full bg-white relative overflow-hidden font-sans flex flex-col items-center justify-center">

      {/* 1. CLEAN BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(#E5E7EB_1px,transparent_1px),linear-gradient(90deg,#E5E7EB_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

        {/* Creative Ambient Blobs (FOS Colors) */}
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#60BA81]/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#F5A83C]/5 rounded-full blur-3xl"
        />
      </div>

      {/* 2. HEADER: Phase Title (Synced with Voiceover) */}
      <div className="absolute top-10 z-30 flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            className="flex flex-col items-center gap-1"
          >
            <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] 
              ${phase === 'SITE' ? 'bg-[#F5F5F7] text-[#284952]' :
                phase === 'WORKER' ? 'bg-[#284952] text-[#60BA81]' :
                  'bg-[#60BA81] text-white'}`}
            >
              {phase === 'SITE' ? 'Step 1: On-Site Sessions' : phase === 'WORKER' ? 'Step 2: Worker Training' : 'Step 3: Management Briefing'}
            </div>
            <h2 className="text-3xl font-black text-[#284952] tracking-tight">
              {phase === 'SITE' ? 'Facility Visits' : phase === 'WORKER' ? 'Reporting Concerns' : 'System Walkthrough'}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. MAIN HERO STAGE */}
      <div className="relative z-20 w-[80%] h-[60%] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] rounded-2xl bg-white p-2">
        <div className="w-full h-full relative rounded-xl overflow-hidden bg-gray-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={globalImageIndex}
              className="w-full h-full relative"
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Image */}
              <img src={currentImage} alt="Training" className="w-full h-full object-cover" />

              {/* Overlay Logic */}
              {phase === 'SITE' && <SiteOverlay label={labels[globalImageIndex]} />}
              {phase === 'WORKER' && <WorkerOverlay label={labels[globalImageIndex]} />}
              {phase === 'MGMT' && <ManagementOverlay label={labels[globalImageIndex]} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 4. PROGRESS FOOTER (No Counts, Just Flow) */}
      <div className="absolute bottom-12 z-30 w-[60%] flex flex-col gap-2">
        <div className="flex w-full h-1 bg-[#F0F2F5] rounded-full overflow-hidden">
          {/* Site Bar */}
          <motion.div
            className="h-full bg-[#F5A83C]"
            initial={{ width: 0 }}
            animate={{ width: phase === 'SITE' ? `${(localTime / 6) * 33}%` : '33%' }}
          />
          {/* Worker Bar */}
          <motion.div
            className="h-full bg-[#60BA81]"
            initial={{ width: 0 }}
            animate={{ width: phase === 'WORKER' ? `${((localTime - 6) / 6) * 33}%` : phase === 'MGMT' ? '33%' : '0%' }}
          />
          {/* Mgmt Bar */}
          <motion.div
            className="h-full bg-[#284952]"
            initial={{ width: 0 }}
            animate={{ width: phase === 'MGMT' ? `${((localTime - 12) / 7) * 34}%` : '0%' }}
          />
        </div>

        <div className="flex justify-between text-[10px] font-bold text-[#284952]/40 uppercase tracking-widest">
          <span className={phase === 'SITE' ? "text-[#F5A83C]" : ""}>Setup</span>
          <span className={phase === 'WORKER' ? "text-[#60BA81]" : ""}>Training</span>
          <span className={phase === 'MGMT' ? "text-[#284952]" : ""}>Briefing</span>
        </div>
      </div>

    </div>
  )
}