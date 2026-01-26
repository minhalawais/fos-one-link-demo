"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  FileText,
  Check,
  Tag,
  Server,
  ShieldCheck,
  Award, // Using Award for the "Standard" look
  Database
} from "lucide-react"

// --- THEME CONSTANTS ---
const ASSETS = {
  officer: "/assets/avatars/fos_grievance_officer_complaint.png",
}

// --- TIMING (77s - 95s) ---
const TIMING = {
  START: 77,
  OFFICER_REVIEW: 77.5,   // "quick review by FOS team"
  ACCURACY_CHECKS: 81.5, // "ensures accuracy"
  CATEGORIZATION: 85.0,  // "correct categorization"
  HRDD_COMPLIANCE: 90.5, // "alignment with human rights..." (Synced specifically to this line)
  SYSTEM_INGEST: 92.5,   // "maintaining data quality" -> Launch
  END: 95
}

// Physics
const SPRING = { type: "spring", stiffness: 180, damping: 24 }
const BOUNCE = { type: "spring", stiffness: 300, damping: 15 }
const STAMP = { type: "spring", stiffness: 500, damping: 20, mass: 1.5 }

export const SceneReview = ({ isActive, progress }: { isActive: boolean, progress: number }) => {

  // Derived State
  const showOfficer = progress >= TIMING.OFFICER_REVIEW && progress < TIMING.SYSTEM_INGEST
  const showChecks = progress >= TIMING.ACCURACY_CHECKS
  const showTag = progress >= TIMING.CATEGORIZATION
  const showShield = progress >= TIMING.HRDD_COMPLIANCE
  const isIngesting = progress >= TIMING.SYSTEM_INGEST

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#F5F5F7] relative overflow-hidden font-sans">

      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-[#60BA81]/10 to-transparent rounded-full blur-[100px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl h-[600px] flex items-center justify-center gap-16 perspective-[1000px]">

        {/* === LEFT: THE COMPLAINT DOCUMENT === */}
        <AnimatePresence>
          {!isIngesting && (
            <motion.div
              className="relative z-20"
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{
                x: 300,
                opacity: 0,
                scale: 0.4,
                filter: "blur(10px)",
                transition: { duration: 0.6, ease: "backIn" }
              }}
              transition={SPRING}
            >

              {/* Officer "Lens" Overlay */}
              <AnimatePresence>
                {showOfficer && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute -top-16 -left-12 z-50 flex items-center gap-3 bg-white/90 backdrop-blur-md p-3 pr-5 rounded-full shadow-xl border border-white/50"
                  >
                    <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-100 relative">
                      <img src={ASSETS.officer} alt="Reviewer" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-[#284952]/10" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#60BA81] uppercase tracking-wider">Reviewing</span>
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#60BA81] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#60BA81]"></span>
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#284952]">FOS Officer</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* The Document Card */}
              <div className="w-[340px] bg-white rounded-[24px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-[#DEE2E6] overflow-hidden relative">

                {/* Header */}
                <div className="h-16 bg-[#F8FAFB] border-b border-[#DEE2E6] flex items-center px-6 gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#DEE2E6] flex items-center justify-center shadow-sm">
                    <FileText size={20} className="text-[#284952]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#1d1d1f]">Sarah Khan</span>
                    <span className="text-[10px] text-gray-500">EMP-4921 • Production Unit</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-5 relative">

                  {/* Field 1: Subject */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Subject</span>
                      {showChecks && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={BOUNCE}>
                          <Check size={14} className="text-[#60BA81]" strokeWidth={3} />
                        </motion.div>
                      )}
                    </div>
                    <motion.div
                      className="w-full rounded-lg bg-[#F5F5F7] border border-transparent px-3 py-2"
                      animate={showChecks ? { backgroundColor: "#F0FDF4", borderColor: "#86EFAC" } : {}}
                    >
                      <div className="text-sm font-semibold text-[#284952]">Unpaid Overtime - Oct 2024</div>
                    </motion.div>
                  </div>

                  {/* Field 2: Description */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Description</span>
                      {showChecks && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ ...BOUNCE, delay: 0.1 }}>
                          <Check size={14} className="text-[#60BA81]" strokeWidth={3} />
                        </motion.div>
                      )}
                    </div>
                    <div className="w-full h-28 rounded-lg bg-[#F5F5F7] border border-transparent p-3 relative overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-[#F0FDF4]"
                        initial={{ opacity: 0 }}
                        animate={showChecks ? { opacity: 1 } : { opacity: 0 }}
                      />
                      <p className="relative z-10 text-xs text-gray-600 leading-relaxed">
                        I worked 20 extra hours last month during the peak season shift, but my paycheck does not reflect the overtime rate defined in my contract. I have attached my timesheets as evidence.
                      </p>

                      {/* HRDD Shield Badge */}
                      <AnimatePresence>
                        {showShield && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            className="absolute bottom-2 right-2 bg-white/90 backdrop-blur p-2 rounded-lg shadow-sm border border-[#E6F4EA] flex items-center gap-1.5"
                          >
                            <ShieldCheck size={14} className="text-[#60BA81]" />
                            <span className="text-[10px] font-bold text-[#284952]">HRDD Validated</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* HRDD STAMP OVERLAY (Large & Center) */}
                <AnimatePresence>
                  {showShield && (
                    <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none pb-12 pr-6">
                      <motion.div
                        initial={{ opacity: 0, scale: 2, rotate: 15 }}
                        animate={{ opacity: 1, scale: 1, rotate: -5 }}
                        transition={STAMP}
                        className="border-4 border-[#284952] rounded-full p-1 opacity-90 mix-blend-multiply bg-[#F5F5F7]/90 backdrop-blur-sm"
                      >
                        <div className="border border-[#284952] rounded-full p-4 flex flex-col items-center justify-center w-32 h-32">
                          <Award size={32} className="text-[#284952] mb-1" />
                          <div className="text-[10px] font-bold text-[#284952] tracking-widest leading-none">HRDD</div>
                          <div className="text-[14px] font-black text-[#284952] uppercase tracking-tighter leading-none mt-1">
                            ALIGNED
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>

                {/* Footer: Categorization */}
                <div className="h-14 border-t border-[#DEE2E6] flex items-center justify-between px-6 bg-white relative z-10">
                  <span className="text-xs text-gray-400 font-medium">Categorization</span>
                  <AnimatePresence>
                    {showTag ? (
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={BOUNCE}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[#FFF4E5] text-[#F5A83C] rounded-full border border-[#FFE8CC] shadow-sm"
                      >
                        <Tag size={12} fill="currentColor" className="opacity-20" />
                        <span className="text-[10px] font-bold uppercase tracking-wide">Wages & Benefits</span>
                      </motion.div>
                    ) : (
                      <motion.div className="h-6 w-24 bg-gray-100 rounded-full" />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* === FLIGHT PATH VISUAL (Transition) === */}
        <AnimatePresence>
          {isIngesting && (
            <motion.div
              className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[2px] bg-gray-200 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-1/3 h-full bg-gradient-to-r from-transparent via-[#60BA81] to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 0.6, ease: "linear" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* === RIGHT: THE SYSTEM === */}
        <motion.div
          className="relative z-10 w-[300px]"
          animate={isIngesting ? { scale: 1.05 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          {/* Main System Block */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#DEE2E6] overflow-hidden">
            <div className="bg-[#17161A] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database size={16} className="text-[#60BA81]" />
                <span className="text-xs font-bold text-white tracking-widest">FOS CORE</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F5A83C]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#60BA81]" />
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Status Steps */}
              <div className="space-y-3">
                <SystemStep label="Review Locked" active={isIngesting} />
                <SystemStep label="Data Validated" active={showShield} />
                <SystemStep label="Category Mapped" active={showTag} />
              </div>

              {/* Ingestion Status Bar */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Database Ingest</span>
                  <span className={`text-[10px] font-bold ${isIngesting ? 'text-[#60BA81] animate-pulse' : 'text-gray-300'}`}>
                    {isIngesting ? "PROCESSING" : "WAITING"}
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#60BA81]"
                    initial={{ width: "0%" }}
                    animate={isIngesting ? { width: "100%" } : { width: showShield ? "60%" : "30%" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

const SystemStep = ({ label, active }: { label: string, active: boolean }) => (
  <div className="flex items-center justify-between">
    <span className={`text-xs font-medium transition-colors duration-300 ${active ? "text-[#17161A]" : "text-gray-400"}`}>
      {label}
    </span>
    <motion.div
      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors duration-300 ${active ? "bg-[#284952] border-[#284952]" : "border-gray-200 bg-gray-50"}`}
      animate={active ? { scale: [1, 1.2, 1] } : {}}
    >
      {active && <Check size={10} className="text-white" strokeWidth={3} />}
    </motion.div>
  </div>
)