"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShieldCheck,
  UserCheck,
  Users,
  Briefcase,
  AlertTriangle,
  Fingerprint,
  FileCheck2,
  ScanLine,
  Landmark,
  Gavel,
  Monitor,
  Key
} from "lucide-react"

// --- TYPES & DATA ---
interface OfficerData {
  id: string
  role: string
  category: "Unit" | "Gender" | "Category"
  color: string
  icon: React.ElementType
  stats: { label: string; value: string }[]
  avatar: string
}

const OFFICERS: OfficerData[] = [
  {
    id: "IO-UNIT-01",
    role: "Unit Officer",
    category: "Unit",
    color: "#60BA81", // Green
    icon: Landmark,
    avatar: "/assets/avatars/male_io.png",
    stats: [
      { label: "Scope", value: "Production Floor" },
      { label: "Focus", value: "Resolution" },
    ],
  },
  {
    id: "IO-GENDER-02",
    role: "Harassment Officer",
    category: "Harassment",
    color: "#F5A83C", // Orange
    icon: Users,
    avatar: "/assets/avatars/female_io.png",
    stats: [
      { label: "Scope", value: "Harassment Cases" },
      { label: "Focus", value: "Sensitivity" },
    ],
  },
  {
    id: "IO-CAT-03",
    role: "Safety Officer",
    category: "Category",
    color: "#284952", // Deep Teal
    icon: AlertTriangle,
    avatar: "/assets/avatars/investigation_officer_avatar.png",
    stats: [
      { label: "Scope", value: "HSE Incidents" },
      { label: "Focus", value: "Compliance" },
    ],
  },
]

// --- MOTION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
  exit: { opacity: 0 },
}

const cardVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  },
  hover: { y: -10, scale: 1.05, boxShadow: "0px 20px 40px rgba(0,0,0,0.1)" }
}

export default function SceneOfficers({ isActive }: { isActive: boolean }) {
  const [phase, setPhase] = useState<"APPOINTMENT" | "EXPANSION" | "RESPONSIBILITY" | "PORTAL">("APPOINTMENT")

  // Script Timing Sync
  useEffect(() => {
    if (!isActive) return

    // 0s: Appointment phase starts (Single candidate)
    setPhase("APPOINTMENT")

    const t1 = setTimeout(() => setPhase("EXPANSION"), 7000) // 7s: "Multiple officers..."
    const t2 = setTimeout(() => setPhase("RESPONSIBILITY"), 12000) // 12s: "...responsible for managing..."
    const t3 = setTimeout(() => setPhase("PORTAL"), 18000) // 18s: "Portals Generated..."

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [isActive])

  return (
    <div className="w-full h-full bg-[#f8f9fc] relative overflow-hidden flex items-center justify-center font-sans perspective-1000 origin-center">

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#284952 1px, transparent 1px), linear-gradient(90deg, #284952 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* Floating Blurs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#60BA81]/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], x: [0, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#284952]/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative w-full max-w-6xl px-4 flex items-center justify-center z-10">

        <AnimatePresence mode="wait">
          {phase === "APPOINTMENT" && (
            <AppointmentPhase key="appointment" />
          )}

          {(phase === "EXPANSION" || phase === "RESPONSIBILITY" || phase === "PORTAL") && (
            <ExpansionPhase
              key="expansion"
              showDuties={phase === "RESPONSIBILITY"}
              showPortal={phase === "PORTAL"}
            />
          )}
        </AnimatePresence>

      </div>

      {/* --- FLOATING CONTEXT BADGE --- */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white/50"
        >
          <ShieldCheck size={14} className="text-[#60BA81]" />
          <span className="text-[10px] font-bold text-[#284952] uppercase tracking-widest">
            INTERNAL APPOINTMENT PROTOCOL
          </span>
        </motion.div>
      </div>

    </div>
  )
}

// --- PHASE 1: APPOINTMENT (SCANNING) ---
const AppointmentPhase = () => {
  return (
    <motion.div
      className="relative"
      exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
      transition={{ duration: 0.5 }}
    >
      {/* CENTRAL CARD */}
      <div className="w-72 h-[480px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden relative flex flex-col items-center pt-8 perspective-card">

        {/* Holographic scanner effect */}
        <motion.div
          initial={{ top: "-20%" }}
          animate={{ top: "120%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#60BA81] to-transparent z-30 shadow-[0_0_15px_#60BA81]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-[#60BA81]/10 z-20"
        />

        {/* Avatar */}
        <div className="w-28 h-28 rounded-full border-4 border-gray-100 shadow-inner overflow-hidden mb-6 relative z-10 bg-gray-50 flex items-center justify-center shrink-0">
          <img src="/assets/avatars/male_io.png" className="w-full h-full object-cover opacity-80" alt="Candidate" />
        </div>

        {/* Candidate Info */}
        <div className="text-center space-y-2 z-10 px-4">
          <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-gray-400 mb-1">
            Investigation Officer Appointed
          </div>
          <h3 className="text-lg font-bold text-[#284952]">Internal Employee</h3>
          <p className="text-xs text-gray-500">Processing Appointment...</p>
        </div>

        {/* Bottom Status */}
        <div className="flex-1 w-full px-6 py-4 flex flex-col justify-between">

          {/* Operational Scope */}
          <div className="space-y-2">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 border-b border-gray-100 pb-1">Operational Scope</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-[9px] font-bold border border-blue-100">Unit: Production Floor</span>
              <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-[9px] font-bold border border-purple-100">Cat: General</span>
              <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-[9px] font-bold border border-amber-100">Clearance: L3</span>
            </div>
          </div>

          {/* Authorized Modules */}
          <div className="space-y-2">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 border-b border-gray-100 pb-1">Authorized Modules</h4>
            <div className="grid grid-cols-1 gap-1.5">
              {["Root Cause Analysis", "Corrective Actions", "Evidence Upload"].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + (i * 0.2) }}
                  className="flex items-center gap-2 text-[10px] text-gray-600 font-medium"
                >
                  <div className="w-3 h-3 rounded-full bg-[#60BA81]/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#60BA81]" />
                  </div>
                  {item}
                </motion.div>
              ))}
            </div>
          </div>

          {/* System Sync Visualization */}
          <div className="mt-2 bg-gray-50 rounded-lg p-3 border border-gray-200/60">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[9px] font-bold text-gray-500">SYSTEM SYNC</span>
              <span className="text-[9px] font-mono text-[#60BA81] animate-pulse">ACTIVE</span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#60BA81] to-[#284952]"
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[7px] text-gray-400">CONNECTING TO FOS PLATFORM...</span>
              <span className="text-[7px] text-gray-400 font-mono">ID: PENDING</span>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute -right-12 top-20 bg-white p-3 rounded-lg shadow-xl border border-gray-100 flex items-center gap-3 z-30"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Fingerprint className="text-[#F5A83C]" size={20} />
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-[#284952]">Identity</span>
          <span className="text-[8px] text-gray-400">VERIFIED</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

// --- PHASE 2 & 3: EXPANSION & RESPONSIBILITY ---
// --- PHASE 2, 3 & 4: EXPANSION, RESPONSIBILITY & PORTAL ---
const ExpansionPhase = ({ showDuties, showPortal }: { showDuties: boolean, showPortal: boolean }) => {
  return (
    <motion.div
      className="flex flex-col md:flex-row gap-6 items-center justify-center w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {OFFICERS.map((officer, index) => (
        <div key={officer.id} className="relative group">
          <OfficerCard
            officer={officer}
            showDuties={showDuties}
            showPortal={showPortal}
            delay={index * 0.1}
          />

          {/* Connection Lines (Desktop only) */}
          {index < OFFICERS.length - 1 && (
            <div className="hidden md:block absolute top-1/2 -right-6 w-6 h-[2px] bg-gray-200 z-0"></div>
          )}
        </div>
      ))}
    </motion.div>
  )
}

const OfficerCard = ({ officer, showDuties, showPortal, delay }: { officer: OfficerData, showDuties: boolean, showPortal: boolean, delay: number }) => {
  const Icon = officer.icon

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="w-72 bg-white rounded-2xl shadow-xl border border-white/60 overflow-hidden relative flex flex-col items-center backdrop-blur-sm"
    >
      {/* Header Color Bar */}
      <div className="w-full h-2" style={{ backgroundColor: officer.color }} />

      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(${officer.color} 1px, transparent 1px)`, backgroundSize: '10px 10px' }} />

      {/* Officer Content */}
      <div className="p-5 flex flex-col items-center w-full relative z-10">
        {/* Badge Header */}
        <div className="flex justify-between w-full items-start mb-4">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{officer.category}</span>
            <span className="text-[11px] font-mono font-bold" style={{ color: officer.color }}>{officer.id}</span>
          </div>
          <div className="p-1.5 rounded-lg bg-gray-50 border border-gray-100">
            <Icon size={16} style={{ color: officer.color }} />
          </div>
        </div>

        {/* Avatar Box */}
        <div className="relative mb-6 group-hover:scale-105 transition-transform duration-300 shrink-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 rounded-full blur-md" />
          <img src={officer.avatar} alt={officer.role} className="w-20 h-20 object-contain drop-shadow-lg" />

          {/* Verification Tick */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.5, type: "spring" }}
            className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md"
          >
            <div className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px]" style={{ backgroundColor: officer.color }}>✓</div>
          </motion.div>
        </div>

        <h3 className="text-base font-bold text-[#284952] mb-1">{officer.role}</h3>

        {/* Stats Grid */}
        <div className="w-full grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-dashed border-gray-200">
          {officer.stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[8px] text-gray-400 uppercase">{stat.label}</span>
              <span className="text-[10px] font-bold text-[#284952]">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- RESPONSIBILITY OVERLAY (Phase 3) --- --- */}
      <AnimatePresence>
        {showDuties && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#284952]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="mb-3 p-3 rounded-full border-2 border-dashed border-white/30"
            >
              <FileCheck2 className="text-white" size={24} />
            </motion.div>
            <h4 className="text-white font-bold text-sm mb-1">Active Duty</h4>
            <p className="text-white/80 text-xs mb-4">Grievance Resolution & Documentation</p>

            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#60BA81]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PORTAL ACCESS OVERLAY (Phase 4) --- --- */}
      <AnimatePresence>
        {showPortal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 bg-[#f8f9fc] flex flex-col items-center justify-center p-6 z-30"
          >
            <div className="w-full h-full border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-4 bg-white/50 relative overflow-hidden">
              {/* Scanning Line */}
              <motion.div
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-[1px] bg-[#60BA81]/30 z-10"
              />

              <div className="mb-4 relative">
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shadow-inner">
                  <Monitor size={24} className="text-[#284952]" />
                </div>
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}
                  className="absolute -top-1 -right-1 bg-[#60BA81] text-white rounded-full p-1"
                >
                  <Key size={10} />
                </motion.div>
              </div>

              <h4 className="text-[11px] font-bold text-[#284952] uppercase tracking-tighter mb-1 text-center">Portal Generated</h4>
              <div className="bg-[#60BA81]/10 px-2 py-0.5 rounded-full mb-3">
                <span className="text-[9px] font-bold text-[#60BA81]">Credentials Assigned</span>
              </div>

              <div className="w-full space-y-1.5 opacity-60">
                <div className="h-1 bg-gray-100 rounded-full w-full" />
                <div className="h-1 bg-gray-100 rounded-full w-3/4 mx-auto" />
              </div>

              <p className="mt-4 text-[8px] font-mono text-gray-400">ACCESS: fruitofsustainability.com/login</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}