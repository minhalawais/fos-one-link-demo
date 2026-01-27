"use client"

import { useState, useEffect, useRef } from "react"
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
  Printer,
  ListFilter
} from "lucide-react"

// --- THEME CONSTANTS ---
const COLORS = {
  teal: "#0f9690",
  deepTeal: "#284952",
  freshGreen: "#60BA81",
  green: "#60BA81",
  charcoal: "#17161A",
  warmOrange: "#F5A83C",
  orange: "#F5A83C",
  white: "#FFFFFF",
  lightGray: "#F5F5F7",
  bg: "#F5F5F7",
  border: "#DEE2E6",
  mediumGray: "#767676",
  softGreen: "rgba(96, 186, 129, 0.42)",
}

// Apple-style easing
const EASE = [0.32, 0.72, 0, 1]

const pageTransitionVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    filter: "blur(4px)",
    transition: {
      duration: 0.5,
      ease: EASE,
    },
  },
}

// --- CHART COMPONENTS (Preserved from Scene 1) ---
const DonutChart = () => (
  <svg width="180" height="180" viewBox="0 0 200 200" className="mx-auto">
    <circle cx="100" cy="100" r="70" fill="none" stroke={COLORS.deepTeal} strokeWidth="22" opacity="0.9" />
    <circle cx="100" cy="100" r="70" fill="none" stroke={COLORS.freshGreen} strokeWidth="22" strokeDasharray="175 440" strokeDashoffset="0" transform="rotate(-90 100 100)" opacity="0.85" />
    <circle cx="100" cy="100" r="70" fill="none" stroke={COLORS.warmOrange} strokeWidth="22" strokeDasharray="44 440" strokeDashoffset="-175" transform="rotate(-90 100 100)" opacity="0.9" />
    <text x="100" y="95" textAnchor="middle" className="fill-[#17161A] font-bold">
      <tspan x="100" dy="0" fontSize="16">Total</tspan>
      <tspan x="100" dy="22" fontSize="24">(117)</tspan>
    </text>
  </svg>
)

const StackedBarChart = () => {
  const categories = [
    { heights: [4, 3, 1] }, { heights: [4, 3, 1] }, { heights: [4, 3, 1] }, { heights: [16, 5, 1] },
    { heights: [3, 2, 1] }, { heights: [2, 2, 1] }, { heights: [4, 2, 1] }, { heights: [26, 6, 2] },
    { heights: [3, 2, 1] }, { heights: [3, 2, 1] }, { heights: [2, 1, 0] }, { heights: [4, 2, 1] },
  ]
  return (
    <svg width="100%" height="180" viewBox="0 0 700 180" className="w-full">
      {[0, 10, 20, 30].map((val) => (
        <g key={val}>
          <text x="30" y={160 - val * 4.5} textAnchor="end" className="text-[9px] fill-gray-400">{val}</text>
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
              return <rect key={j} x={x - 12} y={yOffset} width="24" height={height} fill={colors[j]} opacity="0.9" rx="2" />
            })}
          </g>
        )
      })}
      <line x1="40" y1="160" x2="650" y2="160" stroke={COLORS.border} strokeWidth="2" />
    </svg>
  )
}

// --- PORTAL DASHBOARD (Static "In Process" State) ---
const PortalDashboard = () => {
  const complaints = [
    { sr: 462, ticket: "XX261114-11XXXX", name: "Sana", initialStatus: "In Process", date: "Wed, 26 Nov 2025 11:13 AM", mobile: "923214864040", category: "Workplace Health" },
    { sr: 461, ticket: "XX241120-47XXXX", name: "Ahmad", initialStatus: "Completed", date: "Mon, 24 Nov 2025 11:47 AM", mobile: "03214864040", category: "Wages" },
    { sr: 460, ticket: "XX241119-38XXXX", name: "Fatima", initialStatus: "In Process", date: "Sun, 23 Nov 2025 09:30 AM", mobile: "03001234567", category: "Forced Labor" },
  ]

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(5px)", transition: { duration: 1 } }}
      className="absolute inset-0 bg-[#F5F5F7] overflow-hidden"
    >
      <div className="scale-[0.58] origin-top-left p-6 w-[172%] h-[172%]">
        {/* Header */}
        <div className="bg-white px-8 h-[70px] flex items-center justify-between shadow-sm relative z-20 rounded-xl mb-6">
          <div className="flex items-center gap-3"><img src="assets/vertical_logo.png" alt="Logo" className="w-32 h-32 object-contain" /></div>
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] mb-0.5" style={{ color: COLORS.green }}>MULTAN47</div>
            <div className="text-xl font-bold" style={{ color: COLORS.deepTeal }}>Grievance Management Portal</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded text-white flex items-center justify-center shadow" style={{ backgroundColor: COLORS.green }}><Bell size={20} fill="currentColor" /></div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded text-xs font-semibold text-gray-600 hover:bg-gray-50 shadow-sm transition">Logout <LogOut size={14} /></button>
          </div>
        </div>
        {/* Charts */}
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
        {/* Table */}
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>
          <div className="px-6 py-4 flex justify-between items-center" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
            <div className="flex items-center gap-3"><span className="text-xs font-medium text-gray-500">Show</span><div className="px-3 py-1.5 text-sm rounded-lg border bg-white">100</div></div>
            <div className="flex items-center gap-2"><span className="text-xs font-medium text-gray-500">Search:</span><div className="px-3 py-1.5 text-sm rounded-lg border w-40 bg-white"></div></div>
          </div>
          <div className="grid grid-cols-7 gap-4 px-6 py-3 text-[10px] font-bold uppercase tracking-wider" style={{ color: COLORS.mediumGray, borderBottom: `1px solid ${COLORS.border}`, backgroundColor: "#FAFAFA" }}>
            <div>Sr.</div><div>Ticket Number</div><div>NAME</div><div>STATUS</div><div>COMPLAINT DATE</div><div>Mobile Number</div><div>Category</div>
          </div>
          <div>
            {complaints.map((c, i) => (
              <div key={i} className="grid grid-cols-7 gap-4 px-6 py-4 items-center" style={{
                borderBottom: `1px solid ${COLORS.border}`,
                borderLeft: i === 0 ? `4px solid ${COLORS.freshGreen}` : "4px solid transparent",
                backgroundColor: i === 0 ? COLORS.softGreen : "transparent"
              }}>
                <div className="text-xs font-medium text-gray-500">{c.sr}</div>
                <div className="text-xs font-bold font-mono text-[#284952]">{c.ticket}</div>
                <div className="text-xs font-semibold text-[#1d1d1f]">{c.name}</div>
                <div><span className="px-3 py-1.5 rounded-full text-[10px] font-bold inline-block" style={{ backgroundColor: c.initialStatus === "In Process" ? "rgba(96, 186, 129, 0.2)" : (c.initialStatus === "Unprocessed" ? "rgba(40, 73, 82, 0.15)" : "rgba(245, 168, 60, 0.2)"), color: c.initialStatus === "In Process" ? COLORS.freshGreen : (c.initialStatus === "Unprocessed" ? COLORS.deepTeal : COLORS.warmOrange) }}>{c.initialStatus}</span></div>
                <div className="text-xs text-gray-500">{c.date}</div>
                <div className="text-xs text-gray-500">{c.mobile}</div>
                <div className="text-xs text-gray-500">{c.category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// --- TIMELINE SCREEN (Synced & Animated) ---
const TimelineFormScreen = ({ stage }: { stage: number }) => {
  const [statusText, setStatusText] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  const statusFullText = `Case activated by Investigation Officer (IO-MULTAN47)

✓ Complaint status changed to "In Process"
✓ System-based timeline tracking initiated
✓ Compliance monitoring clock started
✓ All workflow triggers activated

Investigation is now formally underway. The IO will proceed with evidence collection and root cause analysis.`

  // Status typing effect
  useEffect(() => {
    if (stage >= 14 && statusText.length < statusFullText.length) {
      const interval = setInterval(() => {
        setStatusText((prev) => {
          if (prev.length < statusFullText.length) {
            return statusFullText.slice(0, prev.length + 3)
          }
          return prev
        })
      }, 25)
      return () => clearInterval(interval)
    }
  }, [stage, statusText.length])

  // --- ANIMATION LOGIC: ZOOM & PAN ---
  const getTransform = () => {
    // Stage 14: Zoom in and focus on the TOP (Complaint Received)
    if (stage === 14) {
      return { scale: 1.25, x: 0, y: 100 }
    }
    // Stage 15+: Stay zoomed, but PAN DOWN to the BOTTOM (Status Changed)
    if (stage >= 15) {
      return { scale: 1.25, x: 0, y: -180 }
    }
    // Default: Full view
    return { scale: 1, x: 0, y: 0 }
  }

  const transform = getTransform()

  return (
    <motion.div
      key="timeline-form"
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#F5F5F7] to-[#E8E8EA] flex items-center justify-center font-sans relative"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${COLORS.deepTeal} 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Main Animated Container */}
      <motion.div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
        animate={{
          scale: transform.scale,
          x: transform.x,
          y: transform.y,
        }}
        // Apple-like smooth spring animation for panning
        transition={{ type: "spring", stiffness: 50, damping: 20, mass: 1.2 }}
      >
        <div className="w-[95%] h-[95%] max-w-[950px] max-h-[700px]">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full bg-[#F8F8F8] rounded-sm shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col border border-white/60"
          >
            {/* --- HEADER (Replica of Image) --- */}
            <div
              className="px-6 py-4 flex items-center justify-between bg-white z-20 relative shadow-sm"
              style={{ borderBottom: `1px solid ${COLORS.border}` }}
            >
              {/* Left Side: Ticket & Date */}
              <div className="flex items-center text-[15px] text-[#374151]">
                <span className="font-normal">
                  XX211117-11XXXX
                </span>
                <span className="mx-2 text-gray-300 font-light">|</span>
                <span className="font-normal">Fri, 21 Nov 2025 05:31 PM</span>
              </div>

              {/* Right Side: Location & Close */}
              <div className="flex items-center gap-4">
                <span className="text-[15px] text-[#374151] font-normal uppercase">
                  PWD <span className="mx-1 text-gray-300">|</span> PWD
                </span>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* --- TIMELINE CONTENT AREA --- */}
            <div className="relative flex-1 p-8 overflow-hidden">

              {/* Central Timeline Line (Longer to accommodate scroll) */}
              <div
                className="absolute left-1/2 top-0 bottom-0 w-0 -translate-x-1/2 border-l-2 border-dashed opacity-30"
                style={{ borderColor: COLORS.deepTeal }}
              />

              {/* Animated Progress Line */}
              <motion.div
                className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#0f9690] to-[#60BA81]"
                initial={{ height: "0%" }}
                animate={{ height: stage >= 14 ? "85%" : "0%" }}
                transition={{ duration: 2.5, ease: "easeOut" }}
              />

              {/* Grid Layout - Staggered */}
              <div className="relative grid grid-cols-[1fr_50px_1fr] gap-8 h-full">

                {/* === LEFT COLUMN (Item 1) === */}
                <div className="flex flex-col justify-start">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {/* Teal Card */}
                    <div
                      className="rounded-xl overflow-hidden shadow-xl text-white font-sans text-[11px] leading-relaxed relative"
                      style={{
                        backgroundColor: COLORS.teal,
                        boxShadow: "0 10px 30px rgba(30, 126, 120, 0.25)",
                      }}
                    >
                      <div className="p-4 space-y-3">
                        {/* Card Header Row */}
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-[13px] uppercase tracking-wide">
                              HANZALA SIDDIQUE
                            </h3>
                            <div className="font-bold text-[11px] opacity-90 uppercase mt-0.5">
                              KITCHEN ASSISTANT
                            </div>
                            <div className="mt-2 inline-block bg-[#3AA888] text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-sm">
                              Wages & Benefits
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="font-medium text-[11px]">
                              In Process
                            </span>
                            <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
                              <List size={16} strokeWidth={3} />
                            </div>
                          </div>
                        </div>

                        {/* Card Body Content */}
                        <div className="space-y-2 mt-2">
                          <div className="font-bold text-[11px]">
                            Additional Comments:
                          </div>
                          <div className="font-bold">Branch: Mardan</div>
                          <div className="font-bold">Employee ID: 2302285</div>

                          <p className="opacity-95 text-[10px] leading-relaxed mt-2 text-justify">
                            I would like to raise a concern regarding{" "}
                            <strong className="text-white font-extrabold">
                              my leaves
                            </strong>
                            , have not been updated in Flow HCM. I joined
                            Cheezious on{" "}
                            <strong className="text-white font-extrabold">
                              18 October 2023
                            </strong>{" "}
                            and my{" "}
                            <strong className="text-white font-extrabold">
                              third year of service has started
                            </strong>
                            , but the leaves for this year{" "}
                            <strong className="text-white font-extrabold">
                              have still not been reflected
                            </strong>{" "}
                            in the system.
                            <br />
                            <br />I discussed this issue with{" "}
                            <strong className="text-white font-extrabold">
                              Shift Manager Mr. Jawad
                            </strong>
                            , and he advised me to report your concern to the
                            FOS team. He also mentioned that if it is not
                            resolved from there, he would send an email on his
                            behalf. The main issue is that{" "}
                            <strong className="text-white font-extrabold">
                              most of the staff in Mardan is new
                            </strong>
                            , so they are not fully familiar with the system.
                            Additionally, there is{" "}
                            <strong className="text-white font-extrabold">
                              no RM available
                            </strong>
                            , otherwise I would have discussed this matter with
                            him as well.
                            <br />
                            <br />
                            Kindly update me on{" "}
                            <strong className="text-white font-extrabold">
                              when my leave records will be updated or update my
                              leaves as soon as possible.
                            </strong>
                          </p>

                          <div className="mt-4 pt-3 border-t border-white/20 space-y-1">
                            <div>
                              <span className="font-bold">
                                Concerned Department:
                              </span>{" "}
                              HR Department
                            </div>
                            <div>
                              <span className="font-bold">
                                Proposed Solution:
                              </span>{" "}
                              Kindly update my leave record as soon as possible.
                            </div>
                            <div>
                              <span className="font-bold">Lodged By:</span>{" "}
                              Agent from Web
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* === CENTER COLUMN (Nodes) === */}
                <div className="flex flex-col items-center justify-start gap-[320px] pt-4">
                  {/* Node 1 */}
                  <div className="flex flex-col items-center gap-1">
                    <motion.div
                      className="px-2 py-0.5 rounded text-[8px] font-bold text-white shadow-sm"
                      style={{ backgroundColor: COLORS.deepTeal }}
                    >
                      RECEIVED
                    </motion.div>
                    <motion.div
                      className="w-3.5 h-3.5 rounded-full bg-white shadow-md z-10"
                      style={{ border: `3.5px solid ${COLORS.deepTeal}` }}
                    />
                  </div>

                  {/* Node 2 */}
                  <div className="flex flex-col items-center gap-1">
                    <motion.div
                      className="px-2 py-0.5 rounded text-[8px] font-bold text-white shadow-sm"
                      style={{ backgroundColor: COLORS.orange }}
                      animate={{
                        scale: stage >= 14 ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: stage >= 14 ? Number.POSITIVE_INFINITY : 0,
                        repeatDelay: 1,
                      }}
                    >
                      ACTIVATED
                    </motion.div>
                    <motion.div
                      className="w-3.5 h-3.5 rounded-full bg-white shadow-md z-10"
                      style={{
                        border: `3.5px solid ${stage >= 14 ? COLORS.green : COLORS.border
                          }`,
                      }}
                    />
                  </div>
                </div>

                {/* === RIGHT COLUMN (Item 2) === */}
                {/* Added 'pt-[340px]' to push this column down so it starts where the left one ends */}
                <div className="flex flex-col justify-start pt-[340px]">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div
                      className="rounded-xl overflow-hidden shadow-lg transition-all duration-300 bg-white"
                      animate={{
                        scale: stage >= 14 ? 1.02 : 1,
                      }}
                      style={{
                        border:
                          stage >= 14
                            ? `2px solid ${COLORS.green}`
                            : `2px solid transparent`,
                        boxShadow:
                          stage >= 14
                            ? `0 10px 40px -10px ${COLORS.green}40`
                            : "0 4px 20px -5px rgba(0,0,0,0.05)",
                      }}
                    >
                      <div
                        className="px-3 py-2 flex items-center gap-2"
                        style={{ backgroundColor: COLORS.green }}
                      >
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                          <CheckCircle2 size={12} className="text-white" />
                        </div>
                        <span className="font-bold text-white text-xs">
                          RCA-Root Cause Analysis
                        </span>
                      </div>

                      <div className="p-4">
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">
                          Detail
                        </div>

                        <div
                          className="min-h-[140px] max-h-[180px] overflow-y-auto p-3 rounded-lg bg-gray-50/80 border border-gray-100"
                        >
                          <div className="text-[11px] text-gray-600 leading-relaxed whitespace-pre-line font-mono">
                            {statusText ? (
                              <>
                                {statusText.split("\n").map((line, idx) => (
                                  <motion.div
                                    key={idx}
                                    animate={{
                                      backgroundColor: line.includes("✓")
                                        ? COLORS.softGreen
                                        : "transparent",
                                      color: line.includes("✓")
                                        ? "#15803d"
                                        : "#4b5563",
                                    }}
                                    className="px-1.5 py-0.5 -mx-1.5 rounded transition-colors"
                                  >
                                    {line}
                                  </motion.div>
                                ))}
                                {stage >= 14 &&
                                  stage < 16 &&
                                  statusText.length < statusFullText.length && (
                                    <motion.span
                                      animate={{ opacity: [1, 0] }}
                                      transition={{
                                        repeat: Number.POSITIVE_INFINITY,
                                        duration: 0.6,
                                      }}
                                      className="inline-block w-1.5 h-3 bg-[#60BA81] ml-1 align-middle"
                                    />
                                  )}
                              </>
                            ) : (
                              <span className="text-gray-400 italic">
                                Waiting for status update...
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                          <Calendar size={12} />
                          <span>Mon, 24 Nov 2025 - 12:15 PM</span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div
              className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200"
            >
              <motion.button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition shadow-sm">
                <Printer size={14} />
                Print Timeline
              </motion.button>
              <div className="flex gap-3">
                <button className="px-4 py-2 rounded-lg text-[11px] font-semibold text-white bg-gray-400 hover:bg-gray-500 transition shadow-sm">
                  Close
                </button>
                <button
                  className="px-4 py-2 rounded-lg text-[11px] font-semibold text-white transition shadow-sm hover:brightness-110"
                  style={{ backgroundColor: COLORS.teal }}
                >
                  Route Complaint
                </button>
                <motion.button
                  className="px-4 py-2 rounded-lg text-[11px] font-semibold text-white shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-100 transition"
                  style={{ backgroundColor: COLORS.green }}
                  animate={{
                    scale: stage >= 15 ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    duration: 0.4,
                    repeat: stage >= 15 ? Number.POSITIVE_INFINITY : 0,
                    repeatDelay: 0.5,
                  }}
                >
                  Continue Investigation
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// --- MAIN WRAPPER (Synced with Progress) ---
export const Scene2InProcess = ({ isActive, progress }: { isActive: boolean, progress: number }) => {
  // Sync Logic (New Script):
  // 13s - 20s: Show Dashboard (In Process) 
  // 20s+: Show Timeline (Formal Investigation starts)

  const showTimeline = progress >= 20;
  const showRCA = progress >= 25;

  const stage = showRCA ? 15 : (showTimeline ? 14 : 12);

  return (
    <div className="w-full h-screen bg-[#F5F5F7] overflow-hidden font-sans relative">
      {/* Always render dashboard as background */}
      <PortalDashboard />

      {/* Overlay Timeline when ready */}
      <AnimatePresence>
        {showTimeline && <TimelineFormScreen stage={stage} />}
      </AnimatePresence>
    </div>
  )
}
