"use client"

import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import {
  FileText,
  Search,
  Tag,
  CheckCircle2,
  ScanLine,
  UserCheck,
  Server,
  ShieldCheck,
  FileCheck
} from "lucide-react"
import { useState, useEffect } from "react"

// --- CONSTANTS ---
const ASSETS = {
  officer: "/assets/avatars/fos_grievance_officer_complaint.png",
}

const SPRING = {
  type: "spring",
  stiffness: 260,
  damping: 20
}

export const SceneReview = ({ isActive }: { isActive: boolean }) => {
  const [stage, setStage] = useState(0)

  // Sync with Voiceover
  // 61.24s: "Every complaint goes through a quick review..."
  // 65.00s: "We make sure the information is complete..."
  // 69.00s: "...launching it into the system."
  useEffect(() => {
    if (isActive) {
      setStage(0)
      const timers = [
        // Stage 1: Officer Enters & Scans (61.24s)
        setTimeout(() => setStage(1), 500),

        // Stage 2: Checklist Validation (65s - "Information complete")
        setTimeout(() => setStage(2), 3800),

        // Stage 3: Categorization Tag (67s - "Properly categorized")
        setTimeout(() => setStage(3), 5800),

        // Stage 4: Launch to System (69s - "Launching")
        setTimeout(() => setStage(4), 7800),
      ]
      return () => timers.forEach(clearTimeout)
    } else {
      setStage(0)
    }
  }, [isActive])

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#F5F5F7] relative overflow-hidden font-sans">

      {/* --- AMBIENT BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
        {/* Subtle grid pattern to imply "System" */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-[#60BA81]/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl flex items-center justify-center gap-16 px-8">

        <LayoutGroup>
          {/* === LEFT: THE REVIEWER (Human Element) === */}
          <motion.div
            className="relative z-20 flex flex-col items-center"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={SPRING}
          >
            {/* Scanning Beam Effect */}
            <AnimatePresence>
              {stage >= 1 && stage < 4 && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 200 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-16 left-24 h-32 bg-gradient-to-r from-[#60BA81]/0 via-[#60BA81]/20 to-[#60BA81]/0 pointer-events-none transform -rotate-12 origin-left z-0"
                >
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#60BA81]/50" />
                  {/* Moving scanner particles */}
                  <motion.div
                    className="absolute top-0 bottom-0 w-2 bg-[#60BA81]/30 blur-md"
                    animate={{ left: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[4px] border-white shadow-2xl overflow-hidden bg-[#F0F4F8] relative z-10">
                <img src={ASSETS.officer} alt="Officer" className="w-full h-full object-cover" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, ...SPRING }}
                className="absolute -bottom-2 -right-2 bg-[#284952] text-white p-2 rounded-full border-4 border-[#F5F5F7] shadow-lg z-20"
              >
                <UserCheck size={20} />
              </motion.div>
            </div>

            <motion.div
              className="mt-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white shadow-sm text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-sm font-bold text-[#284952]">Grievance Officer</h3>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#60BA81] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#60BA81]"></span>
                </span>
                <span className="text-[10px] text-[#767676] font-medium uppercase tracking-wide">Analysing</span>
              </div>
            </motion.div>
          </motion.div>


          {/* === CENTER: THE DOCUMENT (The Subject) === */}
          <motion.div
            className="relative z-30"
            layout
          >
            <AnimatePresence mode="wait">
              {/* STATE A: PHYSICAL DOCUMENT */}
              {stage < 4 ? (
                <motion.div
                  key="doc"
                  className="bg-white w-[280px] h-[380px] rounded-xl shadow-2xl border border-[#DEE2E6] overflow-hidden relative"
                  initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
                  animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                  exit={{ scale: 0.2, opacity: 0, y: -100, transition: { duration: 0.5 } }}
                  transition={SPRING}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Header */}
                  <div className="h-14 bg-[#F8FAFB] border-b border-[#DEE2E6] flex items-center px-4 gap-3">
                    <div className="w-8 h-8 rounded bg-[#284952]/10 flex items-center justify-center">
                      <FileText size={16} className="text-[#284952]" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 w-24 bg-gray-200 rounded mb-1" />
                      <div className="h-1.5 w-16 bg-gray-100 rounded" />
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 space-y-4 relative">
                    {/* Field 1 */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <div className="h-2 w-16 bg-gray-200 rounded" />
                        {stage >= 2 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><CheckCircle2 size={12} className="text-[#60BA81]" /></motion.div>}
                      </div>
                      <motion.div
                        className="h-8 w-full bg-[#F5F5F7] rounded border border-transparent"
                        animate={stage >= 2 ? { borderColor: "#60BA81", backgroundColor: "#F0FDF4" } : {}}
                      />
                    </div>

                    {/* Field 2 */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <div className="h-2 w-20 bg-gray-200 rounded" />
                        {stage >= 2 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }}><CheckCircle2 size={12} className="text-[#60BA81]" /></motion.div>}
                      </div>
                      <motion.div
                        className="h-8 w-full bg-[#F5F5F7] rounded border border-transparent"
                        animate={stage >= 2 ? { borderColor: "#60BA81", backgroundColor: "#F0FDF4" } : {}}
                        transition={{ delay: 0.1 }}
                      />
                    </div>

                    {/* Field 3 */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <div className="h-2 w-12 bg-gray-200 rounded" />
                        {stage >= 2 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}><CheckCircle2 size={12} className="text-[#60BA81]" /></motion.div>}
                      </div>
                      <motion.div
                        className="h-20 w-full bg-[#F5F5F7] rounded border border-transparent"
                        animate={stage >= 2 ? { borderColor: "#60BA81", backgroundColor: "#F0FDF4" } : {}}
                        transition={{ delay: 0.2 }}
                      />
                    </div>
                  </div>

                  {/* Categorization Tag */}
                  <AnimatePresence>
                    {stage >= 3 && (
                      <motion.div
                        initial={{ x: 100 }}
                        animate={{ x: 0 }}
                        className="absolute top-20 -right-2 bg-[#F5A83C] text-white py-1 px-3 text-[10px] font-bold shadow-md z-20 flex items-center gap-1 rounded-l-md"
                      >
                        <Tag size={10} />
                        <span>WAGES</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Verified Stamp Overlay */}
                  <AnimatePresence>
                    {stage >= 3 && (
                      <motion.div
                        initial={{ scale: 2, opacity: 0, rotate: -45 }}
                        animate={{ scale: 1, opacity: 1, rotate: -15 }}
                        className="absolute bottom-8 right-8 border-4 border-[#60BA81] rounded-lg p-2 z-30"
                      >
                        <div className="text-[#60BA81] font-black text-xl uppercase tracking-widest opacity-80">
                          Verified
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                /* STATE B: DATA PACKET (LAUNCH) */
                <motion.div
                  key="packet"
                  className="w-16 h-16 bg-gradient-to-br from-[#60BA81] to-[#284952] rounded-xl shadow-[0_0_30px_rgba(96,186,129,0.6)] flex items-center justify-center z-40"
                  initial={{ scale: 0.5, opacity: 0, y: 50 }}
                  animate={{
                    scale: [1, 0.8, 1.2],
                    opacity: 1,
                    y: -200,
                    rotate: 360
                  }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                  <FileCheck className="text-white" size={32} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>


          {/* === RIGHT: THE SYSTEM (Destination) === */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center gap-4 w-48"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, ...SPRING }}
          >
            <div className="w-full bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 p-4 shadow-lg space-y-3">
              <div className="flex items-center gap-2 mb-2 border-b border-gray-100 pb-2">
                <Server size={14} className="text-[#284952]" />
                <span className="text-[10px] font-bold text-[#284952] uppercase">FOS System</span>
              </div>

              {/* Checklist Items */}
              <div className="space-y-2">
                <ReviewStep label="Data Integrity" active={stage >= 2} />
                <ReviewStep label="Categorization" active={stage >= 3} />
                <ReviewStep label="System Launch" active={stage >= 4} />
              </div>
            </div>
          </motion.div>

        </LayoutGroup>

      </div>
    </div>
  )
}

// Helper for the System Checklist
const ReviewStep = ({ label, active }: { label: string, active: boolean }) => (
  <div className="flex items-center justify-between">
    <span className={`text-xs font-medium transition-colors ${active ? "text-[#284952]" : "text-gray-400"}`}>
      {label}
    </span>
    <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${active ? "bg-[#60BA81] border-[#60BA81]" : "border-gray-200 bg-gray-50"}`}>
      {active && <CheckCircle2 size={10} className="text-white" />}
    </div>
  </div>
)