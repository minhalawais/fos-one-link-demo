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
  credentials: {
    username: string
    password: string
    email: string
  }
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
    credentials: {
      username: "io.unit01",
      password: "FOS@Unit01",
      email: "io.unit01@fruitofsustainability.com"
    }
  },
  {
    id: "IO-GENDER-02",
    role: "Harassment Officer",
    category: "Gender",
    color: "#F5A83C", // Orange
    icon: Users,
    avatar: "/assets/avatars/female_io.png",
    stats: [
      { label: "Scope", value: "Harassment Cases" },
      { label: "Focus", value: "Sensitivity" },
    ],
    credentials: {
      username: "io.gender02",
      password: "FOS@Gender02",
      email: "io.gender02@fruitofsustainability.com"
    }
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
    credentials: {
      username: "io.category03",
      password: "FOS@Category03",
      email: "io.category03@fruitofsustainability.com"
    }
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
  hover: { y: -6, scale: 1.02, boxShadow: "0px 16px 30px rgba(0,0,0,0.08)" }
}

export default function SceneOfficers({ isActive }: { isActive: boolean }) {
  const [phase, setPhase] = useState<"APPOINTMENT" | "EXPANSION" | "PORTAL">("APPOINTMENT")

  // Script Timing Sync
  useEffect(() => {
    if (!isActive) return

    // 0s: Appointment phase starts (Single candidate)
    setPhase("APPOINTMENT")

    const t1 = setTimeout(() => setPhase("EXPANSION"), 7000) // 7s: "Multiple officers..."
    const t2 = setTimeout(() => setPhase("PORTAL"), 16000) // 16s: transition to secure portal access stage

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
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

          {(phase === "EXPANSION" || phase === "PORTAL") && (
            <ExpansionPhase
              key="expansion"
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
        <div className="w-[120px] h-[120px] min-w-[120px] min-h-[120px] rounded-full border-4 border-gray-100 shadow-inner overflow-hidden mb-6 relative z-10 bg-gray-50 flex items-center justify-center shrink-0 aspect-square">
          <img src="/assets/avatars/male_io.png" className="w-full h-full object-contain scale-[1.55] translate-y-1 opacity-85" alt="Candidate" />
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
const ExpansionPhase = ({ showPortal }: { showPortal: boolean }) => {
  return (
    <motion.div
      className="flex flex-col gap-4 items-center justify-center w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-5 py-2.5 rounded-full bg-white/80 border border-white/60 shadow-lg"
      >
        <span className="text-[10px] font-black text-[#284952] tracking-[0.16em] uppercase">Officer Assignment Matrix</span>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-5 items-center justify-center w-full">
      {OFFICERS.map((officer, index) => (
        <div key={officer.id} className="relative group">
          <OfficerCard
            officer={officer}
            showPortal={showPortal}
            delay={index * 0.1}
          />

          {/* Connection Lines (Desktop only) */}
          {index < OFFICERS.length - 1 && (
            <div className="hidden md:block absolute top-1/2 -right-6 w-6 h-[2px] bg-gray-200 z-0"></div>
          )}
        </div>
      ))}
      </div>
    </motion.div>
  )
}

const OfficerCard = ({ officer, showPortal, delay }: { officer: OfficerData, showPortal: boolean, delay: number }) => {
  const Icon = officer.icon
  const isUnitOfficer = officer.category === "Unit"

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="w-72 bg-white rounded-2xl shadow-[0_18px_36px_-22px_rgba(15,23,42,0.35)] border border-white/60 overflow-hidden relative flex flex-col items-center backdrop-blur-sm"
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
        <div className="relative mb-5 group-hover:scale-[1.02] transition-transform duration-300 shrink-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 rounded-full blur-md" />
          <div className={`${isUnitOfficer ? "w-24 h-24 min-w-24 min-h-24" : "w-20 h-20 min-w-20 min-h-20"} rounded-full overflow-hidden bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 shadow-inner flex items-center justify-center p-1.5 aspect-square`}>
            <img src={officer.avatar} alt={officer.role} className={`w-full h-full object-contain ${isUnitOfficer ? "scale-[1.45] translate-y-1" : ""}`} />
          </div>

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

        <h3 className="text-base font-bold text-[#284952] mb-1 text-center">{officer.role}</h3>

        {/* Stats Grid */}
        <div className="w-full grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-dashed border-gray-200">
          {officer.stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[8px] text-gray-400 uppercase">{stat.label}</span>
              <span className="text-[10px] font-bold text-[#284952]">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="w-full mt-3 rounded-xl bg-[#f8fafc] border border-gray-100 p-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[8px] uppercase font-bold tracking-wider text-gray-400">Assigned Responsibility</span>
            <Briefcase size={12} style={{ color: officer.color }} />
          </div>
          <p className="mt-1.5 text-[10px] font-semibold text-[#284952]">Manage grievance resolution and documentation.</p>
        </div>
      </div>

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

              <div className="w-full space-y-1.5 bg-white border border-gray-100 rounded-lg p-2.5 mb-3 text-left">
                <div className="flex justify-between gap-2 text-[8px]">
                  <span className="text-gray-400 uppercase font-bold tracking-wide">Username</span>
                  <span className="text-[#284952] font-mono font-bold break-all text-right">{officer.credentials.username}</span>
                </div>
                <div className="flex justify-between gap-2 text-[8px]">
                  <span className="text-gray-400 uppercase font-bold tracking-wide">Password</span>
                  <span className="text-[#284952] font-mono font-bold break-all text-right">{officer.credentials.password}</span>
                </div>
                <div className="flex justify-between gap-2 text-[8px]">
                  <span className="text-gray-400 uppercase font-bold tracking-wide">Email</span>
                  <span className="text-[#284952] font-mono font-bold break-all text-right">{officer.credentials.email}</span>
                </div>
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