"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  AlertTriangle,
  List,
  ListOrdered,
  Bold,
  Italic,
  Underline,
  LinkIcon,
  Upload,
  FileText,
  ImageIcon,
  Mic,
  Printer,
  CheckCircle2,
  Calendar,
  Info,
} from "lucide-react"

// Brand Colors
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
    scale: 0.96,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: EASE,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.04,
    filter: "blur(12px)",
    transition: {
      duration: 0.5,
      ease: EASE,
    },
  },
}

// --- CHART COMPONENTS ---
const DonutChart = () => (
  <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
    <circle cx="100" cy="100" r="80" fill="none" stroke={COLORS.deepTeal} strokeWidth="24" opacity="0.9" />
    <circle
      cx="100"
      cy="100"
      r="80"
      fill="none"
      stroke={COLORS.freshGreen}
      strokeWidth="24"
      strokeDasharray="200 502"
      strokeDashoffset="0"
      transform="rotate(-90 100 100)"
      opacity="0.85"
    />
    <circle
      cx="100"
      cy="100"
      r="80"
      fill="none"
      stroke={COLORS.warmOrange}
      strokeWidth="24"
      strokeDasharray="50 502"
      strokeDashoffset="-200"
      transform="rotate(-90 100 100)"
      opacity="0.9"
    />
    <text x="100" y="95" textAnchor="middle" className="fill-[#17161A] font-bold">
      <tspan x="100" dy="0" fontSize="18">
        Total
      </tspan>
      <tspan x="100" dy="20" fontSize="22">
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
    <svg width="100%" height="220" viewBox="0 0 700 220" className="w-full">
      {[0, 5, 10, 15, 20, 25, 30, 35].map((val) => (
        <g key={val}>
          <text x="35" y={200 - val * 5} textAnchor="end" className="text-[10px] fill-gray-400">
            {val}
          </text>
          <line x1="45" y1={200 - val * 5} x2="650" y2={200 - val * 5} stroke="#f0f0f0" strokeWidth="1" />
        </g>
      ))}
      {categories.map((bar, i) => {
        const x = 70 + i * 50
        let yOffset = 200
        return (
          <g key={i}>
            {bar.heights.map((h, j) => {
              const colors = [COLORS.deepTeal, COLORS.freshGreen, COLORS.warmOrange]
              const height = h * 5
              yOffset -= height
              return (
                <rect key={j} x={x - 15} y={yOffset} width="30" height={height} fill={colors[j]} opacity="0.9" rx="2" />
              )
            })}
          </g>
        )
      })}
      <line x1="45" y1="200" x2="650" y2="200" stroke={COLORS.border} strokeWidth="2" />
    </svg>
  )
}

// --- SCREEN COMPONENTS ---

// 1. Login Screen
const LoginScreen = ({ stage }: { stage: number }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (stage >= 1) {
      const user = "multan47"
      let i = 0
      const typeUser = setInterval(() => {
        if (i < user.length) {
          setUsername(user.slice(0, i + 1))
          i++
        } else {
          clearInterval(typeUser)
        }
      }, 60)
      return () => clearInterval(typeUser)
    }
  }, [stage])

  useEffect(() => {
    if (stage >= 2) {
      const pass = "........"
      let i = 0
      const typePass = setInterval(() => {
        if (i < pass.length) {
          setPassword(pass.slice(0, i + 1))
          i++
        } else {
          clearInterval(typePass)
        }
      }, 50)
      return () => clearInterval(typePass)
    }
  }, [stage])

  const isButtonHovered = stage >= 3

  return (
    <motion.div
      key="login"
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute inset-0 flex items-center justify-center p-8"
      style={{ backgroundColor: COLORS.lightGray }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        className="w-[360px] bg-white rounded-[32px] overflow-hidden"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.1)" }}
      >
        {/* Logo Section */}
        <div className="px-8 pt-8 pb-6 bg-gradient-to-b from-[#FAFAFA] to-white">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-4 relative rounded-full bg-gradient-to-br from-[#284952] to-[#60BA81] flex items-center justify-center">
              <span className="text-white font-bold text-xl">FOS</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ color: COLORS.charcoal }}>
              Login
            </h1>
          </motion.div>
        </div>

        {/* Form Section */}
        <div className="px-8 py-6 space-y-4">
          {/* Username */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <label className="block text-xs font-semibold mb-2 tracking-tight" style={{ color: COLORS.deepTeal }}>
              Username
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: COLORS.mediumGray }}
              />
              <input
                type="text"
                value={username}
                readOnly
                className="w-full h-10 pl-10 pr-3 text-sm font-medium rounded-2xl border-2 transition-all"
                style={{
                  backgroundColor: COLORS.lightGray,
                  borderColor: username ? COLORS.freshGreen : COLORS.border,
                  color: COLORS.charcoal,
                }}
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <label className="block text-xs font-semibold mb-2 tracking-tight" style={{ color: COLORS.deepTeal }}>
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: COLORS.mediumGray }}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                readOnly
                className="w-full h-10 pl-10 pr-10 text-sm font-medium rounded-2xl border-2 transition-all tracking-widest"
                style={{
                  backgroundColor: COLORS.lightGray,
                  borderColor: password ? COLORS.freshGreen : COLORS.border,
                  color: COLORS.charcoal,
                }}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: COLORS.mediumGray }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </motion.div>

          {/* Remember Me */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="remember"
              className="w-3.5 h-3.5 rounded accent-[#284952]"
              style={{ accentColor: COLORS.deepTeal }}
            />
            <label htmlFor="remember" className="text-xs select-none" style={{ color: COLORS.mediumGray }}>
              Remember Me
            </label>
          </div>

          {/* Login Button */}
          <motion.button
            animate={{
              scale: isButtonHovered ? 0.97 : 1,
              backgroundColor: isButtonHovered ? "#1E3A42" : "#007AFF",
            }}
            transition={{ duration: 0.2 }}
            className="w-full h-10 rounded-2xl text-white font-semibold text-sm flex items-center justify-center gap-2"
            style={{
              backgroundColor: "#007AFF",
              boxShadow: "0 8px 20px rgba(0, 122, 255, 0.3)",
            }}
          >
            Login
            {isButtonHovered && (
              <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <ArrowRight size={16} />
              </motion.div>
            )}
          </motion.button>
        </div>

        {/* Footer */}
        <div
          className="px-8 py-3 text-center text-[10px]"
          style={{ color: COLORS.mediumGray, borderColor: COLORS.border, backgroundColor: "#FAFAFA" }}
        >
          Copyright © 2023 — Fruit of Sustainability
        </div>
      </motion.div>

      {/* Animated Cursor */}
      <motion.div
        initial={{ x: 600, y: 300, opacity: 0 }}
        animate={{
          x: stage >= 3 ? 350 : stage >= 2 ? 400 : 600,
          y: stage >= 3 ? 480 : stage >= 2 ? 420 : 300,
          opacity: stage >= 1 ? 1 : 0,
        }}
        transition={{ duration: 0.8, ease: EASE }}
        className="absolute pointer-events-none z-50"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="black" stroke="white" strokeWidth="2" />
        </svg>
      </motion.div>
    </motion.div>
  )
}

// 2. Portal Dashboard
const PortalDashboard = ({ stage }: { stage: number }) => {
  const selectedRow = stage >= 5 ? 0 : null

  const complaints = [
    {
      sr: 462,
      ticket: "XX0810010-16XXXX",
      name: "Sana",
      status: "Bounced",
      date: "Mon, 24 Nov 2025 11:56 AM",
      mobile: "923214864040",
    },
    {
      sr: 461,
      ticket: "XX241120-47XXXX",
      name: "Sana",
      status: "Completed",
      date: "Mon, 24 Nov 2025 11:47 AM",
      mobile: "03214864040",
    },
  ]

  return (
    <motion.div
      key="dashboard"
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute inset-0 overflow-auto"
      style={{ backgroundColor: COLORS.lightGray }}
    >
      <div className="scale-[0.65] origin-top-left p-6 w-[154%]">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
            className="flex items-center gap-4"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold"
              style={{
                backgroundColor: COLORS.deepTeal,
                boxShadow: "0 4px 12px rgba(40, 73, 82, 0.3)",
              }}
            >
              FOS
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: COLORS.charcoal }}>
                Grievance Management Portal
              </h1>
              <p className="text-xs font-medium mt-0.5" style={{ color: COLORS.mediumGray }}>
                MULTAN47
              </p>
            </div>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
            className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold flex items-center gap-2"
            style={{
              backgroundColor: COLORS.freshGreen,
              boxShadow: "0 4px 12px rgba(96, 186, 129, 0.25)",
            }}
          >
            <span>Logout</span>
          </motion.button>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-5 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
            className="col-span-2 bg-white rounded-3xl p-6"
            style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: COLORS.mediumGray }}>
              Complaint Status
            </h3>
            <DonutChart />
            <div className="flex justify-center gap-5 mt-6 text-[11px]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.deepTeal }} />
                <span style={{ color: COLORS.mediumGray }}>Unprocessed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.freshGreen }} />
                <span style={{ color: COLORS.mediumGray }}>In Process</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.warmOrange }} />
                <span style={{ color: COLORS.mediumGray }}>Bounced</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
            className="col-span-3 bg-white rounded-3xl p-6"
            style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: COLORS.mediumGray }}>
              Complaints By Categories
            </h3>
            <StackedBarChart />
            <div className="flex justify-center gap-5 mt-4 text-[11px]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.deepTeal }} />
                <span style={{ color: COLORS.mediumGray }}>Submitted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.freshGreen }} />
                <span style={{ color: COLORS.mediumGray }}>In Process</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.warmOrange }} />
                <span style={{ color: COLORS.mediumGray }}>Bounced</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Complaints Table - Removed border-b classes to eliminate black borders */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: EASE }}
          className="bg-white rounded-3xl overflow-hidden"
          style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}
        >
          <div
            className="px-6 py-4 flex justify-between items-center"
            style={{ borderBottom: `1px solid ${COLORS.border}` }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium" style={{ color: COLORS.mediumGray }}>
                Show
              </span>
              <select className="px-3 py-1.5 text-sm rounded-lg border" style={{ borderColor: COLORS.border }}>
                <option>100</option>
              </select>
              <span className="text-xs font-medium" style={{ color: COLORS.mediumGray }}>
                entries
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium" style={{ color: COLORS.mediumGray }}>
                Search:
              </span>
              <input
                type="text"
                className="px-3 py-1.5 text-sm rounded-lg border"
                style={{ borderColor: COLORS.border }}
              />
            </div>
          </div>

          <div
            className="grid grid-cols-6 gap-4 px-6 py-3 text-[10px] font-bold uppercase tracking-wider"
            style={{ color: COLORS.mediumGray, borderBottom: `1px solid ${COLORS.border}`, backgroundColor: "#FAFAFA" }}
          >
            <div>Sr.</div>
            <div>Ticket Number</div>
            <div>NAME</div>
            <div>STATUS</div>
            <div>COMPLAINT DATE</div>
            <div>Mobile Number</div>
          </div>

          <div>
            {complaints.map((complaint, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: EASE }}
                className="grid grid-cols-6 gap-4 px-6 py-4 items-center cursor-pointer transition-all duration-300"
                style={{
                  borderBottom: i < complaints.length - 1 ? `1px solid ${COLORS.border}` : "none",
                  borderLeft: selectedRow === i ? `4px solid ${COLORS.freshGreen}` : "4px solid transparent",
                  backgroundColor: selectedRow === i ? COLORS.softGreen : "transparent",
                }}
              >
                <div className="text-xs font-medium" style={{ color: COLORS.mediumGray }}>
                  {complaint.sr}
                </div>
                <div className="text-xs font-bold font-mono" style={{ color: COLORS.deepTeal }}>
                  {complaint.ticket}
                </div>
                <div className="text-xs font-semibold" style={{ color: COLORS.charcoal }}>
                  {complaint.name}
                </div>
                <div>
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-bold inline-block"
                    style={{
                      backgroundColor:
                        complaint.status === "Bounced" ? "rgba(245, 168, 60, 0.2)" : "rgba(96, 186, 129, 0.2)",
                      color: complaint.status === "Bounced" ? COLORS.warmOrange : COLORS.freshGreen,
                    }}
                  >
                    {complaint.status}
                  </span>
                </div>
                <div className="text-xs" style={{ color: COLORS.mediumGray }}>
                  {complaint.date}
                </div>
                <div className="text-xs" style={{ color: COLORS.mediumGray }}>
                  {complaint.mobile}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Animated Cursor */}
        <motion.div
          initial={{ x: 300, y: 500, opacity: 0 }}
          animate={{
            x: stage >= 5 ? 180 : 200,
            y: stage >= 5 ? 750 : 700,
            opacity: 1,
          }}
          transition={{ duration: 0.8, ease: EASE }}
          className="absolute pointer-events-none z-50"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="black" stroke="white" strokeWidth="2" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}

// 3. Timeline Form Screen - Matching scene-rca-capa-evidence layout
const TimelineFormScreen = ({ stage }: { stage: number }) => {
  const [rcaText, setRcaText] = useState("")
  const [capaText, setCapaText] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [draggingFile, setDraggingFile] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Voice-over synced text content
  const rcaFullText = `The complaint is VALID based on the investigation findings.

• Worker statements confirm inconsistent shift rotations
• HR records show policy was not followed for 3 employees
• Root cause: Branch manager failed to update the rotation schedule

This is a process issue requiring immediate corrective action.`

  const capaFullText = `CORRECTIVE ACTIONS:
• Revert affected workers to their original fixed shifts immediately
• Issue formal warning to branch manager

PREVENTIVE MEASURES:
• Implement automated rotation software
• Monthly compliance audits by HR
• Staff training on new scheduling policy

Assigned to: HR Manager | Deadline: 20 Nov 2025`

  // RCA typing effect
  useEffect(() => {
    if (stage >= 8 && rcaText.length < rcaFullText.length) {
      const interval = setInterval(() => {
        setRcaText((prev) => {
          if (prev.length < rcaFullText.length) {
            return rcaFullText.slice(0, prev.length + 2)
          }
          return prev
        })
      }, 30)
      return () => clearInterval(interval)
    }
  }, [stage, rcaText.length])

  // CAPA typing effect
  useEffect(() => {
    if (stage >= 10 && capaText.length < capaFullText.length) {
      const interval = setInterval(() => {
        setCapaText((prev) => {
          if (prev.length < capaFullText.length) {
            return capaFullText.slice(0, prev.length + 2)
          }
          return prev
        })
      }, 25)
      return () => clearInterval(interval)
    }
  }, [stage, capaText.length])

  // File upload animation
  useEffect(() => {
    const files = ["photo_evidence.jpg", "worker_statement.pdf", "voice_recording.mp3", "policy_doc.pdf"]

    if (stage === 13 && !draggingFile && !uploadedFiles.includes(files[0])) {
      setDraggingFile(files[0])
      setTimeout(() => {
        setDraggingFile(null)
        setUploadedFiles((prev) => [...prev, files[0]])
      }, 600)
    }
    if (stage === 14 && !draggingFile && !uploadedFiles.includes(files[1])) {
      setDraggingFile(files[1])
      setTimeout(() => {
        setDraggingFile(null)
        setUploadedFiles((prev) => [...prev, files[1]])
      }, 600)
    }
  }, [stage, draggingFile, uploadedFiles])

  // Success state
  useEffect(() => {
    if (stage >= 17) {
      setShowSuccess(true)
    }
  }, [stage])

  // Zoom transforms matching scene-rca-capa-evidence
  const getTransform = () => {
    if (stage >= 7 && stage < 10) {
      // Zoom to RCA
      return { scale: 2.2, x: -180, y: 80 }
    }
    if (stage >= 10 && stage < 13) {
      // Zoom to CAPA
      return { scale: 2.2, x: 180, y: -60 }
    }
    if (stage >= 13 && stage < 15) {
      // Zoom to Evidence
      return { scale: 2.2, x: -180, y: -80 }
    }
    if (stage >= 15 && stage < 17) {
      // Zoom to Submit button
      return { scale: 1.8, x: 0, y: -120 }
    }
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
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${COLORS.deepTeal} 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Dragging File Animation */}
      <AnimatePresence>
        {draggingFile && (
          <motion.div
            initial={{ x: 200, y: -100, opacity: 0, scale: 0.5 }}
            animate={{ x: 80, y: 60, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute z-[100] flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-2xl border-2 border-dashed"
            style={{ borderColor: COLORS.teal }}
          >
            {draggingFile.includes("jpg") && <ImageIcon size={24} className="text-[#F5A83C]" />}
            {draggingFile.includes("pdf") && <FileText size={24} className="text-[#60BA81]" />}
            {draggingFile.includes("mp3") && <Mic size={24} className="text-[#284952]" />}
            <span className="text-[10px] font-medium text-gray-600">{draggingFile}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
        animate={{
          scale: transform.scale,
          x: transform.x,
          y: transform.y,
        }}
        transition={{ type: "spring", stiffness: 80, damping: 25 }}
      >
        <div className="w-[95%] h-[95%] max-w-[900px] max-h-[600px]">
          {/* Apple-style Card Container - Removed border-gray-200 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full bg-[#F8F8F8] rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col"
            style={{ border: `1px solid ${COLORS.border}` }}
          >
            {/* Timeline Content */}
            <div className="relative flex-1 p-4 overflow-hidden">
              {/* Central Timeline Line - Vertical Dashed */}
              <div
                className="absolute left-1/2 top-4 bottom-16 w-0 -translate-x-1/2 border-l-2 border-dashed"
                style={{ borderColor: COLORS.border }}
              />

              {/* Timeline Progress Line */}
              <motion.div
                className="absolute left-1/2 top-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#0f9690] to-[#60BA81]"
                initial={{ height: "0%" }}
                animate={{ height: stage >= 7 ? "80%" : "0%" }}
                transition={{ duration: 3, ease: "easeOut" }}
              />

              {/* Content Layout - Two Columns with Timeline in Center */}
              <div className="relative grid grid-cols-[1fr_50px_1fr] gap-3 h-full">
                {/* Left Column - CAPA at bottom */}
                <div className="flex flex-col justify-end pb-4">
                  {/* CAPA Card - Bottom Left */}
                  <motion.div
                    animate={{
                      scale: stage >= 10 && stage < 13 ? 1.02 : 1,
                    }}
                  >
                    <motion.div
                      className="rounded-lg overflow-hidden shadow-lg transition-all duration-300"
                      style={{
                        border: stage >= 10 && stage < 13 ? `2px solid ${COLORS.teal}` : `2px solid transparent`,
                        boxShadow:
                          stage >= 10 && stage < 13
                            ? `0 10px 40px -10px ${COLORS.teal}60`
                            : "0 4px 20px -5px rgba(0,0,0,0.1)",
                      }}
                    >
                      {/* Card Header */}
                      <div
                        className="px-3 py-2 flex items-center justify-between"
                        style={{ backgroundColor: COLORS.teal }}
                      >
                        <span className="font-bold text-white text-xs">CAPA-Corrective & Preventive Actions</span>
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                          <List size={12} className="text-white" />
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="bg-white p-3">
                        <div className="text-[10px] text-gray-500 font-medium mb-1">Detail:</div>

                        {/* Rich Text Toolbar */}
                        <div
                          className="flex items-center gap-0.5 p-1.5 bg-gray-50 rounded mb-2"
                          style={{ border: `1px solid ${COLORS.border}` }}
                        >
                          {[Bold, Italic, Underline, List, ListOrdered, LinkIcon].map((Icon, i) => (
                            <button
                              key={i}
                              className="w-5 h-5 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                            >
                              <Icon size={10} />
                            </button>
                          ))}
                        </div>

                        {/* Text Content - Using inline style for border instead of border-gray-200 */}
                        <div
                          className="min-h-[120px] max-h-[140px] overflow-y-auto p-2 rounded bg-gray-50/50"
                          style={{ border: `1px solid ${COLORS.border}` }}
                        >
                          <div className="text-[10px] text-gray-600 leading-relaxed whitespace-pre-line">
                            {capaText ? (
                              <>
                                {capaText.split("\n").map((line, idx) => (
                                  <motion.div
                                    key={idx}
                                    animate={{
                                      backgroundColor:
                                        (stage === 11 && line.includes("CORRECTIVE")) ||
                                        (stage === 12 && line.includes("PREVENTIVE"))
                                          ? COLORS.softGreen
                                          : "transparent",
                                    }}
                                    className="px-1 -mx-1 rounded transition-colors"
                                  >
                                    {line}
                                  </motion.div>
                                ))}
                                {stage >= 10 && stage < 13 && (
                                  <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6 }}
                                    className="inline-block w-0.5 h-3 bg-[#0f9690] ml-0.5 align-middle"
                                  />
                                )}
                              </>
                            ) : (
                              <span className="text-gray-400 italic text-[10px]">
                                Outline the specific actions taken to resolve the issue (Corrective Actions) and steps
                                to prevent similar complaints in the future (Preventive Actions).
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Center Column - Timeline Nodes */}
                <div className="flex flex-col items-center justify-between py-6">
                  {/* Node 1 - RCA */}
                  <div className="flex flex-col items-center gap-1">
                    <motion.div
                      className="px-2 py-0.5 rounded text-[9px] font-bold text-white"
                      style={{ backgroundColor: COLORS.orange }}
                      animate={{
                        scale: stage >= 7 && stage < 10 ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: stage >= 7 && stage < 10 ? Number.POSITIVE_INFINITY : 0,
                        repeatDelay: 1,
                      }}
                    >
                      RCA
                    </motion.div>
                    <motion.div
                      className="w-3 h-3 rounded-full bg-white shadow-md z-10"
                      style={{ border: `3px solid ${stage >= 7 ? COLORS.teal : COLORS.border}` }}
                    />
                  </div>

                  {/* Node 2 - CAPA/Evidence */}
                  <div className="flex flex-col items-center gap-1">
                    <motion.div
                      className="px-2 py-0.5 rounded text-[9px] font-bold text-white"
                      style={{ backgroundColor: COLORS.orange }}
                      animate={{
                        scale: stage >= 10 && stage < 15 ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: stage >= 10 && stage < 15 ? Number.POSITIVE_INFINITY : 0,
                        repeatDelay: 1,
                      }}
                    >
                      CAPA
                    </motion.div>
                    <motion.div
                      className="w-3 h-3 rounded-full bg-white shadow-md z-10"
                      style={{ border: `3px solid ${stage >= 10 ? COLORS.teal : COLORS.border}` }}
                    />
                  </div>
                </div>

                {/* Right Column - RCA at top, Evidence at bottom */}
                <div className="flex flex-col gap-3 py-2">
                  {/* RCA Card - Top Right */}
                  <motion.div
                    animate={{
                      scale: stage >= 7 && stage < 10 ? 1.02 : 1,
                    }}
                  >
                    <motion.div
                      className="rounded-lg overflow-hidden shadow-lg transition-all duration-300"
                      style={{
                        border: stage >= 7 && stage < 10 ? `2px solid ${COLORS.green}` : `2px solid transparent`,
                        boxShadow:
                          stage >= 7 && stage < 10
                            ? `0 10px 40px -10px ${COLORS.green}60`
                            : "0 4px 20px -5px rgba(0,0,0,0.1)",
                      }}
                    >
                      {/* Card Header */}
                      <div className="px-3 py-2 flex items-center gap-2" style={{ backgroundColor: COLORS.teal }}>
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                          <AlertTriangle size={12} className="text-white" />
                        </div>
                        <span className="font-bold text-white text-xs">RCA-Root Cause Analysis</span>
                      </div>

                      {/* Card Body */}
                      <div className="bg-white p-3">
                        <div className="text-[10px] text-gray-500 font-medium mb-1">Detail</div>

                        {/* Rich Text Toolbar */}
                        <div
                          className="flex items-center gap-0.5 p-1.5 bg-gray-50 rounded mb-2"
                          style={{ border: `1px solid ${COLORS.border}` }}
                        >
                          {[Bold, Italic, Underline, List, ListOrdered, LinkIcon].map((Icon, i) => (
                            <button
                              key={i}
                              className="w-5 h-5 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                            >
                              <Icon size={10} />
                            </button>
                          ))}
                        </div>

                        {/* Text Content - Using inline style for border */}
                        <div
                          className="min-h-[80px] max-h-[100px] overflow-y-auto p-2 rounded bg-gray-50/50"
                          style={{ border: `1px solid ${COLORS.border}` }}
                        >
                          <div className="text-[10px] text-gray-600 leading-relaxed whitespace-pre-line">
                            {rcaText ? (
                              <>
                                {rcaText}
                                {stage >= 8 && stage < 10 && (
                                  <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6 }}
                                    className="inline-block w-0.5 h-3 bg-[#60BA81] ml-0.5 align-middle"
                                  />
                                )}
                              </>
                            ) : (
                              <span className="text-gray-400 italic text-[10px]">
                                Explain why the complaint happened. Identify the reason behind the problem.
                              </span>
                            )}
                          </div>
                        </div>

                        {/* CAPA Deadline */}
                        <div className="mt-2">
                          <div className="text-[10px] text-gray-500 font-medium mb-1">Capa Deadline</div>
                          <div
                            className="flex items-center gap-2 px-2 py-1.5 rounded bg-white"
                            style={{ border: `1px solid ${COLORS.border}` }}
                          >
                            <span className="text-[10px] text-gray-400">dd/mm/yyyy --:--</span>
                            <Calendar size={12} className="text-gray-400 ml-auto" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Evidence Upload Card - Bottom Right */}
                  <motion.div
                    animate={{
                      scale: stage >= 13 && stage < 15 ? 1.02 : 1,
                    }}
                  >
                    <motion.div
                      className="rounded-lg overflow-hidden shadow-lg transition-all duration-300"
                      style={{
                        border: stage >= 13 && stage < 15 ? `2px solid ${COLORS.teal}` : `2px solid transparent`,
                        boxShadow:
                          stage >= 13 && stage < 15
                            ? `0 10px 40px -10px ${COLORS.teal}60`
                            : "0 4px 20px -5px rgba(0,0,0,0.1)",
                      }}
                    >
                      {/* Upload Area */}
                      <div className="p-3" style={{ backgroundColor: COLORS.teal }}>
                        <div className="flex items-center gap-3">
                          {/* Select Files Button */}
                          <div className="flex items-center gap-2 px-3 py-2 bg-white/20 rounded">
                            <Upload size={14} className="text-white" />
                            <span className="text-[10px] text-white font-medium">Select Files</span>
                          </div>
                          {/* Drop Zone Text */}
                          <span className="text-[10px] text-white">
                            Drag and drop files here or click to select files
                          </span>
                        </div>

                        {/* Uploaded Files Display */}
                        <div className="mt-2 min-h-[40px] bg-white/10 rounded p-2">
                          {uploadedFiles.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {uploadedFiles.map((file) => (
                                <motion.div
                                  key={file}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="flex items-center gap-1 px-2 py-1 bg-white/20 rounded text-[9px] text-white"
                                >
                                  {file.includes("jpg") && <ImageIcon size={10} />}
                                  {file.includes("pdf") && <FileText size={10} />}
                                  {file.includes("mp3") && <Mic size={10} />}
                                  {file}
                                </motion.div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-[10px] text-white/60 italic">No files selected</span>
                          )}
                        </div>

                        {/* File Types Info */}
                        <div className="flex items-center gap-1 mt-2 text-[9px] text-white/80">
                          <Info size={10} />
                          <span>
                            You can upload multiple files (PNG, JPG, JPEG, PDF, MP4, AVI, MKV, MOV, MP3, OPUS)
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Footer Buttons - Using inline style for border */}
            <div
              className="px-4 py-3 bg-gray-50 flex items-center justify-end gap-2"
              style={{ borderTop: `1px solid ${COLORS.border}` }}
            >
              <motion.button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-[10px] font-medium text-white"
                style={{ backgroundColor: "#0095da" }}
                animate={{
                  scale: stage >= 15 ? [1, 1.05, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  repeat: stage >= 15 && stage < 17 ? Number.POSITIVE_INFINITY : 0,
                  repeatDelay: 0.5,
                }}
              >
                <Printer size={12} />
                Print Timeline
              </motion.button>
              <button className="px-3 py-1.5 rounded text-[10px] font-medium text-white bg-gray-500">Close</button>
              <button
                className="px-3 py-1.5 rounded text-[10px] font-medium text-white"
                style={{ backgroundColor: "#0095da" }}
              >
                Route Complaint
              </button>
              <motion.button
                className="px-3 py-1.5 rounded text-[10px] font-medium text-white"
                style={{ backgroundColor: "#0095da" }}
                animate={{
                  scale: stage >= 16 ? [1, 1.1, 1] : 1,
                  boxShadow: stage >= 16 ? `0 0 20px ${COLORS.teal}` : "none",
                }}
                transition={{
                  duration: 0.4,
                  repeat: stage >= 16 && stage < 17 ? Number.POSITIVE_INFINITY : 0,
                  repeatDelay: 0.3,
                }}
              >
                Submit Changes
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Success Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-sm mx-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: COLORS.softGreen }}
              >
                <CheckCircle2 size={32} style={{ color: COLORS.green }} />
              </motion.div>
              <h3 className="text-lg font-bold text-gray-800">Investigation Complete</h3>
              <p className="text-sm text-gray-600 text-center">
                Case submitted to FOS for closure review. All evidence and documentation has been recorded.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function ScenePortal({ isActive, progress }: { isActive: boolean; progress: number }) {
  const [stage, setStage] = useState(0)

  // Scene runs from 60 to 72 seconds (12 seconds duration)
  // Sync stages to progress timeline
  useEffect(() => {
    if (!isActive) {
      setStage(0)
      return
    }

    const sceneStart = 60
    const localProgress = progress - sceneStart

    if (localProgress < 0) {
      setStage(0)
      return
    }

    // Timeline mapping for 12-second scene:
    // [60-61s] Stage 0-1: Login screen appears
    // [61-62s] Stage 2-3: Type username, password, hover button
    // [62-63.5s] Stage 4-5: Transition to dashboard, select row
    // [63.5-64.5s] Stage 6: Transition to timeline form
    // [64.5-66s] Stage 7-8: Show full form, zoom to RCA, type RCA
    // [66-68s] Stage 9-10: Zoom to CAPA, type CAPA
    // [68-69s] Stage 11-12: CAPA highlights
    // [69-70s] Stage 13-14: Evidence upload
    // [70-71s] Stage 15-16: Submit button focus
    // [71-72s] Stage 17: Success overlay

    if (localProgress < 0.5) setStage(0)
    else if (localProgress < 1) setStage(1)
    else if (localProgress < 1.5) setStage(2)
    else if (localProgress < 2) setStage(3)
    else if (localProgress < 2.5) setStage(4)
    else if (localProgress < 3.5) setStage(5)
    else if (localProgress < 4.5) setStage(6)
    else if (localProgress < 5) setStage(7)
    else if (localProgress < 6) setStage(8)
    else if (localProgress < 6.5) setStage(9)
    else if (localProgress < 7) setStage(10)
    else if (localProgress < 7.5) setStage(11)
    else if (localProgress < 8) setStage(12)
    else if (localProgress < 8.5) setStage(13)
    else if (localProgress < 9) setStage(14)
    else if (localProgress < 10) setStage(15)
    else if (localProgress < 11) setStage(16)
    else setStage(17)
  }, [isActive, progress])

  // Determine which screen to show based on stage
  const getScreen = () => {
    if (stage < 4) return "login"
    if (stage < 6) return "dashboard"
    return "timeline"
  }

  const currentScreen = getScreen()

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === "login" && <LoginScreen key="login" stage={stage} />}
        {currentScreen === "dashboard" && <PortalDashboard key="dashboard" stage={stage} />}
        {currentScreen === "timeline" && <TimelineFormScreen key="timeline" stage={stage} />}
      </AnimatePresence>
    </div>
  )
}
