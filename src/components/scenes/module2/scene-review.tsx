"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  FileText,
  Check,
  Tag,
  Server,
  ShieldCheck,
  User
} from "lucide-react"
import { useState, useEffect } from "react"

// --- THEME CONSTANTS ---
const ASSETS = {
  officer: "/assets/avatars/fos_grievance_officer_complaint.png",
}

const COLORS = {
  teal: "#284952",
  green: "#60BA81",
  orange: "#F5A83C",
  bg: "#F5F5F7",
  white: "#FFFFFF",
  border: "#DEE2E6"
}

// Apple-style spring physics
const SPRING = {
  type: "spring",
  stiffness: 180,
  damping: 24,
  mass: 1
}

const FAST_SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 20
}

export const SceneReview = ({ isActive }: { isActive: boolean }) => {
  const [stage, setStage] = useState(0)

  // --- TIMING SEQUENCE ---
  // 61.24s: "Every complaint goes through a quick review..." (Start)
  // 63.00s: Officer Visual (Human Review)
  // 65.00s: "Information is complete..." (Validation)
  // 67.00s: "...properly categorized" (Tagging)
  // 69.00s: "...launching it into the system." (Transfer)
  useEffect(() => {
    if (isActive) {
      setStage(0)
      const timers = [
        setTimeout(() => setStage(1), 500),   // Doc Enters
        setTimeout(() => setStage(2), 2000),  // Officer Review (Image Appears)
        setTimeout(() => setStage(3), 4000),  // Validation (Checklist)
        setTimeout(() => setStage(4), 6000),  // Categorization
        setTimeout(() => setStage(5), 7800),  // Launch
      ]
      return () => timers.forEach(clearTimeout)
    } else {
      setStage(0)
    }
  }, [isActive])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#F5F5F7] relative overflow-hidden font-sans selection:bg-[#60BA81] selection:text-white">

      {/* Ambient Lighting / Noise */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]" />
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-[#60BA81]/10 to-transparent rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl h-[600px] flex items-center justify-center gap-12">

        {/* === LEFT: THE COMPLAINT CARD === */}
        <AnimatePresence mode="wait">
          {stage < 5 && (
            <motion.div
              className="relative z-20"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                scale: 0.1,
                x: 200,
                opacity: 0,
                transition: { duration: 0.4, ease: "backIn" }
              }}
              transition={SPRING}
            >
              {/* Officer Review Overlay (The "Lens" with Image) */}
              <AnimatePresence>
                {stage === 2 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.1, y: -10 }}
                    className="absolute -top-20 -left-16 bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-3 pr-6 rounded-2xl z-50 flex items-center gap-4"
                  >
                    {/* Officer Image Container */}
                    <div className="relative w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-100">
                      <img
                        src={ASSETS.officer}
                        alt="Grievance Officer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#767676] uppercase tracking-wider">Reviewing</span>
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-[#60BA81]"
                          animate={{ opacity: [1, 0.4, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </div>
                      <span className="text-sm font-bold text-[#284952]">FOS Officer</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* The Document */}
              <div className="w-[340px] bg-white rounded-[24px] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] border border-[#DEE2E6] overflow-hidden">
                {/* Header */}
                <div className="h-16 bg-[#F8FAFB] border-b border-[#DEE2E6] flex items-center px-6 gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#DEE2E6] flex items-center justify-center shadow-sm">
                    <FileText size={16} className="text-[#284952]" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="h-2 w-24 bg-gray-200 rounded-full" />
                    <div className="h-1.5 w-16 bg-gray-100 rounded-full" />
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                  {/* Field 1: Details */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="h-2 w-16 bg-gray-200 rounded-full" />
                      {stage >= 3 && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={FAST_SPRING}>
                          <Check size={14} className="text-[#60BA81]" strokeWidth={3} />
                        </motion.div>
                      )}
                    </div>
                    <motion.div
                      className="h-10 w-full rounded-xl bg-[#F5F5F7] border border-transparent flex items-center px-3"
                      animate={stage >= 3 ? { backgroundColor: "#F0FDF4", borderColor: "#60BA81" } : {}}
                    >
                      <motion.div
                        className="h-2 bg-gray-200 rounded-full w-3/4"
                        animate={stage >= 3 ? { backgroundColor: "#86EFAC" } : {}}
                      />
                    </motion.div>
                  </div>

                  {/* Field 2: Description */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="h-2 w-20 bg-gray-200 rounded-full" />
                      {stage >= 3 && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ ...FAST_SPRING, delay: 0.1 }}>
                          <Check size={14} className="text-[#60BA81]" strokeWidth={3} />
                        </motion.div>
                      )}
                    </div>
                    <motion.div
                      className="h-24 w-full rounded-xl bg-[#F5F5F7] border border-transparent p-3 space-y-2"
                      animate={stage >= 3 ? { backgroundColor: "#F0FDF4", borderColor: "#60BA81" } : {}}
                    >
                      <motion.div className="h-2 bg-gray-200 rounded-full w-full" animate={stage >= 3 ? { backgroundColor: "#86EFAC" } : {}} />
                      <motion.div className="h-2 bg-gray-200 rounded-full w-5/6" animate={stage >= 3 ? { backgroundColor: "#86EFAC" } : {}} />
                      <motion.div className="h-2 bg-gray-200 rounded-full w-4/6" animate={stage >= 3 ? { backgroundColor: "#86EFAC" } : {}} />
                    </motion.div>
                  </div>
                </div>

                {/* Footer / Category */}
                <div className="h-14 border-t border-[#DEE2E6] flex items-center justify-between px-6 bg-white">
                  <span className="text-xs text-gray-400 font-medium">Categorization</span>
                  <AnimatePresence>
                    {stage >= 4 ? (
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[#FFF4E5] text-[#F5A83C] rounded-full border border-[#FFE8CC]"
                      >
                        <Tag size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-wide">Wages & Benefits</span>
                      </motion.div>
                    ) : (
                      <div className="h-6 w-20 bg-gray-100 rounded-full" />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* === MIDDLE: FLIGHT PATH VISUALIZATION (Visible only during launch) === */}
        <AnimatePresence>
          {stage === 5 && (
            <motion.div
              className="absolute z-30"
              initial={{ x: -200, scale: 0.5, opacity: 0 }}
              animate={{ x: 180, scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "circIn" }}
            >
              <div className="relative">
                {/* Motion Blur Trail */}
                <motion.div
                  className="absolute inset-0 bg-[#60BA81] blur-lg opacity-50"
                  initial={{ width: 0 }}
                  animate={{ width: 100, x: -50 }}
                />
                {/* The Packet */}
                <div className="w-16 h-16 bg-gradient-to-br from-[#284952] to-[#1e363d] rounded-2xl shadow-2xl flex items-center justify-center border border-white/20">
                  <ShieldCheck className="text-[#60BA81]" size={32} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* === RIGHT: THE SYSTEM (Destination) === */}
        <motion.div
          className="relative z-10 w-[280px]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, ...SPRING }}
        >
          {/* Connector Line */}
          <div className="absolute top-1/2 -left-12 w-12 h-[2px] bg-gray-200 overflow-hidden">
            <motion.div
              className="h-full w-full bg-[#60BA81]"
              initial={{ x: "-100%" }}
              animate={stage >= 5 ? { x: "100%" } : { x: "-100%" }}
              transition={{ duration: 0.5, ease: "linear" }}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-[#DEE2E6] overflow-hidden">
            <div className="bg-[#284952] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server size={16} className="text-white/80" />
                <span className="text-sm font-bold text-white tracking-wide">FOS SYSTEM</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-[#F5A83C]" />
                <div className="w-2 h-2 rounded-full bg-[#60BA81]" />
              </div>
            </div>

            <div className="p-5 space-y-4">
              {/* Status Indicators */}
              <div className="space-y-3">
                <SystemStep label="Review" active={stage >= 2} />
                <SystemStep label="Validation" active={stage >= 3} />
                <SystemStep label="Categorized" active={stage >= 4} />
              </div>

              {/* Ingestion Animation */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Database Status</span>
                  {stage >= 5 ? (
                    <span className="text-[10px] font-bold text-[#60BA81]">ACTIVE</span>
                  ) : (
                    <span className="text-[10px] font-bold text-gray-400">READY</span>
                  )}
                </div>

                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#60BA81]"
                    initial={{ width: "0%" }}
                    animate={stage >= 5 ? { width: "100%" } : { width: "0%" }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  />
                </div>
                {stage >= 5 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-center text-[10px] text-[#284952] font-medium"
                  >
                    New Ticket Generated #8291
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

// --- SUBCOMPONENTS ---

const SystemStep = ({ label, active }: { label: string, active: boolean }) => (
  <div className="flex items-center justify-between">
    <span className={`text-xs font-medium transition-colors duration-300 ${active ? "text-[#17161A]" : "text-gray-400"}`}>
      {label}
    </span>
    <motion.div
      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors duration-300 ${active ? "bg-[#60BA81] border-[#60BA81]" : "border-gray-200 bg-gray-50"}`}
      animate={active ? { scale: [1, 1.2, 1] } : {}}
    >
      {active && <Check size={10} className="text-white" strokeWidth={4} />}
    </motion.div>
  </div>
)