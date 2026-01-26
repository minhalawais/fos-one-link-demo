"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  X,
  ClipboardCheck,
  Bell,
  LogOut,
  AlertCircle,
  List,
  Search,
  MousePointer2,
  Calendar,
  FileText,
  CheckCircle2,
  ListFilter,
  Check
} from "lucide-react"

// --- THEME CONSTANTS ---
const COLORS = {
  deepTeal: "#284952",
  freshGreen: "#60BA81",
  warmOrange: "#F5A83C", // Bounced
  lightGray: "#F5F5F7",
  mediumGray: "#767676",
  charcoal: "#1d1d1f",
  border: "#DEE2E6",
  white: "#FFFFFF",
  softGreen: "rgba(96, 186, 129, 0.42)",
}

// --- TIMING CONSTANTS (0s - 21s) ---
const TIMING = {
  START: 0,
  INTRO_END: 8,          // "reflected in IO portal"
  DASHBOARD_START: 8,
  UNPROCESSED_VIEW: 10,  // "appears under unprocessed"
  ACTION_START: 14,      // "IO reviews details..."
  MODAL_OPEN: 15.5,      // Visual trigger for review
  SUBMIT_CLICK: 19.0,    // "activates the case"
  IN_PROCESS_END: 21.0   // "marking it in process"
}

// Spring Configs
const EASE = [0.32, 0.72, 0, 1]

// --- ORIGINAL CHART COMPONENTS ---
const DonutChart = () => (
  <svg width="180" height="180" viewBox="0 0 200 200" className="mx-auto">
    <circle cx="100" cy="100" r="70" fill="none" stroke={COLORS.deepTeal} strokeWidth="22" opacity="0.9" />
    <circle
      cx="100"
      cy="100"
      r="70"
      fill="none"
      stroke={COLORS.freshGreen}
      strokeWidth="22"
      strokeDasharray="175 440"
      strokeDashoffset="0"
      transform="rotate(-90 100 100)"
      opacity="0.85"
    />
    <circle
      cx="100"
      cy="100"
      r="70"
      fill="none"
      stroke={COLORS.warmOrange}
      strokeWidth="22"
      strokeDasharray="44 440"
      strokeDashoffset="-175"
      transform="rotate(-90 100 100)"
      opacity="0.9"
    />
    <text x="100" y="95" textAnchor="middle" className="fill-[#17161A] font-bold">
      <tspan x="100" dy="0" fontSize="16">
        Total
      </tspan>
      <tspan x="100" dy="22" fontSize="24">
        (117)
      </tspan>
    </text>
  </svg>
)

const StackedBarChart = () => {
  const categories = [
    { heights: [4, 3, 1] },
    { heights: [4, 3, 1] },
    { heights: [4, 3, 1] },
    { heights: [16, 5, 1] },
    { heights: [3, 2, 1] },
    { heights: [2, 2, 1] },
    { heights: [4, 2, 1] },
    { heights: [26, 6, 2] },
    { heights: [3, 2, 1] },
    { heights: [3, 2, 1] },
    { heights: [2, 1, 0] },
    { heights: [4, 2, 1] },
  ]

  return (
    <svg width="100%" height="180" viewBox="0 0 700 180" className="w-full">
      {[0, 10, 20, 30].map((val) => (
        <g key={val}>
          <text x="30" y={160 - val * 4.5} textAnchor="end" className="text-[9px] fill-gray-400">
            {val}
          </text>
          <line x1="40" y1={160 - val * 4.5} x2="650" y2={160 - val * 4.5} stroke="#f0f0f0" strokeWidth="1" />
        </g>
      ))}
      {categories.map((bar, i) => {
        const x = 65 + i * 50
        let yOffset = 160
        return (
          <g key={i}>
            {bar.heights.map((h, j) => {
              const colors = [COLORS.deepTeal, COLORS.freshGreen, COLORS.warmOrange]
              const height = h * 4.5
              yOffset -= height
              return (
                <rect key={j} x={x - 12} y={yOffset} width="24" height={height} fill={colors[j]} opacity="0.9" rx="2" />
              )
            })}
          </g>
        )
      })}
      <line x1="40" y1="160" x2="650" y2="160" stroke={COLORS.border} strokeWidth="2" />
    </svg>
  )
}

export const SceneInvestigation = ({ isActive, progress }: { isActive: boolean, progress: number }) => {

  // Derived State
  const showIntro = progress < TIMING.INTRO_END
  const showDashboard = progress >= TIMING.DASHBOARD_START

  // Interaction Stages
  const showCursor = progress >= TIMING.ACTION_START
  const showModal = progress >= TIMING.MODAL_OPEN && progress < TIMING.SUBMIT_CLICK + 0.5
  const isSubmitClicked = progress >= TIMING.SUBMIT_CLICK
  const statusChanged = progress >= TIMING.SUBMIT_CLICK + 0.5

  return (
    <div className="w-full h-full bg-[#17161A] relative overflow-hidden font-sans select-none">

      {/* 1. INTRO SCREEN (0s - 8s) */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroScreen key="intro" />
        )}
      </AnimatePresence>

      {/* 2. DASHBOARD (8s - 21s) */}
      <AnimatePresence>
        {showDashboard && (
          <DashboardScreen
            progress={progress}
            showCursor={showCursor}
            showModal={showModal}
            statusChanged={statusChanged}
            isSubmitClicked={isSubmitClicked}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ------------------------------------------------------------------
// SUB-COMPONENTS
// ------------------------------------------------------------------

const IntroScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.8 } }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#F5F5F7] z-20"
    >
      {/* Background Gradient */}
      <motion.div
        className="absolute w-[120vw] h-[120vw] bg-gradient-to-tr from-[#60BA81]/10 via-[#284952]/5 to-transparent rounded-full blur-[100px]"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-4xl text-center px-6">

        {/* Visual Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-8 relative"
        >
          <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center border border-[#DEE2E6] relative z-10">
            <ListFilter size={48} className="text-[#284952]" strokeWidth={1.5} />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d1f] tracking-tight mb-4"
        >
          Investigation Framework
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
          className="text-[#767676] text-lg md:text-xl max-w-2xl leading-relaxed"
        >
          A structured, transparent workflow for resolving every complaint.
        </motion.p>
      </div>
    </motion.div>
  )
}

const DashboardScreen = ({ progress, showCursor, showModal, statusChanged, isSubmitClicked }: any) => {

  // Simulate Cursor Movement for Original Layout
  const cursorVariants = {
    hidden: { opacity: 0, x: 200, y: 200 },
    rowHover: { opacity: 1, x: 500, y: 560, transition: { duration: 1, ease: "easeOut" } }, // Target First Row Status
    modalTrigger: { x: 500, y: 560, transition: { duration: 1.0, ease: "easeInOut" } }, // Click Status
    modalSubmit: { x: 740, y: 620, transition: { delay: 0.2, duration: 1, ease: "easeInOut" } } // Click Submit inside Modal
  }

  const complaints = [
    {
      sr: 462,
      ticket: "XX261114-11XXXX",
      name: "Sana",
      initialStatus: "Unprocessed",
      date: "Wed, 26 Nov 2025 11:13 AM",
      mobile: "923214864040",
      category: "Workplace Health",
    },
    {
      sr: 461,
      ticket: "XX241120-47XXXX",
      name: "Ahmad",
      initialStatus: "Completed",
      date: "Mon, 24 Nov 2025 11:47 AM",
      mobile: "03214864040",
      category: "Wages",
    },
    {
      sr: 460,
      ticket: "XX241119-38XXXX",
      name: "Fatima",
      initialStatus: "In Process",
      date: "Sun, 23 Nov 2025 09:30 AM",
      mobile: "03001234567",
      category: "Forced Labor",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="absolute inset-0 bg-[#F5F5F7] overflow-hidden"
    >
      <div className="scale-[0.58] origin-top-left p-6 w-[172%] h-[172%]">

        {/* --- HEADER (Original) --- */}
        <div className="bg-white px-8 h-[70px] flex items-center justify-between shadow-sm relative z-20 rounded-xl mb-6">
          <div className="flex items-center gap-3">
            <img src="assets/vertical_logo.png" alt="Logo" className="w-32 h-32 object-contain" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] mb-0.5" style={{ color: COLORS.freshGreen }}>MULTAN47</div>
            <div className="text-xl font-bold" style={{ color: COLORS.deepTeal }}>Grievance Management Portal</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded text-white flex items-center justify-center shadow" style={{ backgroundColor: COLORS.freshGreen }}>
              <Bell size={20} fill="currentColor" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded text-xs font-semibold text-gray-600 hover:bg-gray-50 shadow-sm transition">
              Logout <LogOut size={14} />
            </button>
          </div>
        </div>

        {/* --- CHARTS ROW (Restored) --- */}
        <div className="grid grid-cols-5 gap-6 mb-6">
          <div className="col-span-2 bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: COLORS.mediumGray }}>Complaint Status</h3>
            <DonutChart />
            <div className="flex justify-center gap-4 mt-4 text-[10px]">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.deepTeal }} /> Unprocessed</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.freshGreen }} /> In Process</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.warmOrange }} /> Bounced</div>
            </div>
          </div>

          <div className="col-span-3 bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: COLORS.mediumGray }}>Complaints By Categories</h3>
            <StackedBarChart />
          </div>
        </div>

        {/* --- COMPLAINTS TABLE (Original Styling) --- */}
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>
          {/* Header Controls */}
          <div className="px-6 py-4 flex justify-between items-center" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-gray-500">Show</span>
              <div className="px-3 py-1.5 text-sm rounded-lg border bg-white">100</div>
              <span className="text-xs font-medium text-gray-500">entries</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500">Search:</span>
              <div className="px-3 py-1.5 text-sm rounded-lg border w-40 bg-white"></div>
            </div>
          </div>

          {/* Table Headers */}
          <div className="grid grid-cols-7 gap-4 px-6 py-3 text-[10px] font-bold uppercase tracking-wider" style={{ color: COLORS.mediumGray, borderBottom: `1px solid ${COLORS.border}`, backgroundColor: "#FAFAFA" }}>
            <div>Sr.</div>
            <div>Ticket Number</div>
            <div>NAME</div>
            <div>STATUS</div>
            <div>COMPLAINT DATE</div>
            <div>Mobile Number</div>
            <div>Category</div>
          </div>

          {/* Table Rows */}
          <div>
            {complaints.map((complaint, i) => {
              const isTargetRow = i === 0;
              const currentStatus = isTargetRow && statusChanged ? "In Process" : complaint.initialStatus;

              return (
                <motion.div
                  key={i}
                  className="grid grid-cols-7 gap-4 px-6 py-4 items-center transition-all duration-300"
                  style={{
                    borderBottom: `1px solid ${COLORS.border}`,
                    borderLeft: isTargetRow ? `4px solid ${COLORS.freshGreen}` : "4px solid transparent",
                    backgroundColor: isTargetRow ? COLORS.softGreen : "transparent",
                  }}
                >
                  <div className="text-xs font-medium text-gray-500">{complaint.sr}</div>
                  <div className="text-xs font-bold font-mono text-[#284952]">{complaint.ticket}</div>
                  <div className="text-xs font-semibold text-[#1d1d1f]">{complaint.name}</div>
                  <div>
                    <motion.span
                      layout
                      className="px-3 py-1.5 rounded-full text-[10px] font-bold inline-block"
                      style={{
                        backgroundColor: currentStatus === "Unprocessed" ? "rgba(40, 73, 82, 0.15)" :
                          currentStatus === "Bounced" ? "rgba(245, 168, 60, 0.2)" :
                            "rgba(96, 186, 129, 0.2)",
                        color: currentStatus === "Unprocessed" ? COLORS.deepTeal :
                          currentStatus === "Bounced" ? COLORS.warmOrange :
                            COLORS.freshGreen
                      }}
                    >
                      {currentStatus}
                    </motion.span>
                  </div>
                  <div className="text-xs text-gray-500">{complaint.date}</div>
                  <div className="text-xs text-gray-500">{complaint.mobile}</div>
                  <div className="text-xs text-gray-500">{complaint.category}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* --- CONFIRMATION MODAL (Original Replica) --- */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-[950px] shadow-2xl rounded-sm overflow-hidden flex flex-col font-sans"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300 bg-white">
                <div className="flex items-center text-gray-700 text-[16px] font-normal">
                  <span>XX261114-11XXXX</span>
                  <span className="mx-2 text-gray-400">|</span>
                  <span>Wed, 26 Nov 2025 11:13 AM</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[16px] text-gray-700 font-normal uppercase">CHAKLALA SCHEME-III</span>
                  <X size={20} />
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-10 bg-white flex items-center">
                <p className="text-[16px] text-gray-700 font-normal">Are you sure, you want to process this complaint?</p>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-white border-t border-gray-300 flex justify-end items-center gap-3">
                <button className="px-5 py-2 rounded bg-[#6c757d] text-white text-[15px] font-medium">Close</button>
                <motion.button
                  animate={isSubmitClicked ? { scale: 0.95 } : {}}
                  className="px-5 py-2 rounded bg-[#0d6efd] text-white text-[15px] font-medium shadow-sm"
                >
                  Submit Changes
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CURSOR SIMULATION --- */}
      {showCursor && (
        <motion.div
          className="absolute z-50 pointer-events-none"
          initial="hidden"
          animate={showModal ? "modalSubmit" : "modalTrigger"}
          variants={cursorVariants}
        >
          <MousePointer2
            size={32}
            className="fill-black stroke-white stroke-[2px]"
            style={{ filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.2))" }}
          />
        </motion.div>
      )}
    </motion.div>
  )
}
