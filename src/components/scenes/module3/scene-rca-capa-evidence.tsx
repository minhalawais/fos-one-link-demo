"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
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
  Monitor,
  User,
  Users,
  FileSearch,
  Search,
  ClipboardList,
  UserCheck,
  FolderOpen,
  X,
  Mail,
  ChevronDown,
  Send
} from "lucide-react"

// Assets
const ASSETS = {
  officer_pc: "/assets/avatars/officer_pc.png",
}

// Brand Colors
const COLORS = {
  teal: "#0f9690",
  darkTeal: "#284952",
  green: "#60BA81",
  charcoal: "#17161A",
  orange: "#F5A83C",
  white: "#FFFFFF",
  bg: "#F5F5F7",
  border: "#DEE2E6",
  softGreen: "rgba(96, 186, 129, 0.42)",
}

interface SceneRCACAPAEvidenceProps {
  isActive: boolean
  progress?: number
}

export function SceneRCACAPAEvidence({ isActive, progress = 0 }: SceneRCACAPAEvidenceProps) {
  const [stage, setStage] = useState(0)
  const [rcaText, setRcaText] = useState("")
  const [capaText, setCapaText] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [draggingFile, setDraggingFile] = useState<string | null>(null)
  const [evidenceItems, setEvidenceItems] = useState<number[]>([])
  const [deadlineText, setDeadlineText] = useState("")
  const [routeEmail, setRouteEmail] = useState("")
  const [routeMessage, setRouteMessage] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  // Full deadline text to type
  const deadlineFullText = "20/11/2025 10:00"

  // Route modal text content
  const routeEmailFull = "hr.manager@company.com"
  const routeMessageFull = "Please review the complaint regarding shift scheduling. The case requires HR intervention for policy clarification."

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

  // Scene runs from 29s to 111s (82 seconds total)
  // Using absolute timestamps from script for perfect sync
  useEffect(() => {
    if (!isActive) return

    // Use sceneStart = 29 to match script timing exactly
    const sceneStart = 29
    const localProgress = progress - sceneStart

    if (localProgress < 0) {
      setStage(0)
      return
    }

    // 29-42s (13s): "The investigation officer examines the complaint, reviews evidence, conducts worker interviews and cross checks records..."
    // localProgress 0-13
    if (localProgress < 13) {
      // 29-34s (5s): Worker interviews
      if (localProgress < 5) setStage(2)
      // 34-39s (5s): Records cross check
      else if (localProgress < 10) setStage(3)
      // 39-42s (3s): Evidence summary
      else setStage(4)
    }

    // 42-51s (9s): "Based on this review, the RCA section is filled as valid, partially valid or invalid cases with clear justification."
    // localProgress 13-22
    else if (localProgress < 22) {
      // 42-44s (2s): Show FULL TIMELINE without zoom
      if (localProgress < 15) setStage(5)
      // 44-46s (2s): Zoom in to RCA card
      else if (localProgress < 17) setStage(21)
      // 46-48s (2s): Mark as valid
      else if (localProgress < 19) setStage(6)
      // 48-51s (3s): Type RCA justification
      else setStage(7)
    }

    // 51-55s (4s): "A deadline is entered for associated corrective and preventive actions."
    // localProgress 22-26
    else if (localProgress < 26) {
      setStage(8) // Focus on deadline field
    }

    // 55-61s (6s): "For valid or partially valid cases, a corrective and preventive action plan is developed."
    // localProgress 26-32
    else if (localProgress < 32) {
      setStage(9) // Zoom to CAPA
    }

    // 61-69s (8s): "This includes immediate corrective steps to resolve the issue and preventive measures to stop it from happening again."
    // localProgress 32-40
    else if (localProgress < 40) {
      // 61-65s (4s): Type corrective actions
      if (localProgress < 36) setStage(10)
      // 65-69s (4s): Type preventive measures
      else setStage(11)
    }

    // 69-76s (7s): "Responsibilities and deadlines are assigned and the system automatically tracks progress and sends reminders."
    // localProgress 40-47
    else if (localProgress < 47) {
      setStage(12) // Show responsibility assignment
    }

    // 76-87s (11s): "Once actions are implemented, the investigation officer uploads supporting evidence such as photos, records, statements or policy updates."
    // localProgress 47-58
    else if (localProgress < 58) {
      // 76-79s (3s): Zoom to upload
      if (localProgress < 50) setStage(13)
      // 79-82s (3s): Upload file 1
      else if (localProgress < 53) setStage(14)
      // 82-85s (3s): Upload file 2
      else if (localProgress < 56) setStage(15)
      // 85-87s (2s): Upload file 3
      else setStage(16)
    }

    // 87-94s (7s): "All evidence is securely stored and timestamped, creating a complete and compliant documentation trail."
    // localProgress 58-65
    else if (localProgress < 65) {
      setStage(17) // Show all uploaded files
    }

    // 94-98s (4s): "The case is then submitted to FOS for complainant interview."
    // localProgress 65-69
    else if (localProgress < 69) {
      setStage(18) // Zoom to submit button
    }

    // 98-106s (8s): "For complex cases, the system also allows complaints to be routed directly to relevant internal teams via email."
    // localProgress 69-77
    else if (localProgress < 77) {
      // 98-100s (2s): Button pulse animation
      if (localProgress < 71) setStage(19)
      // 100-106s (6s): Modal appears after button "click"
      else setStage(22)
    }

    // 106-111s (5s): "This enables coordination and quicker decision making across departments."
    // localProgress 77+
    else {
      setStage(20) // Final success state
    }

  }, [isActive, progress])

  // Evidence items animation - SLOWER (spread across 13 seconds)
  useEffect(() => {
    if (stage >= 2 && stage <= 4) {
      const maxItems = stage === 2 ? 3 : stage === 3 ? 5 : 5
      if (evidenceItems.length < maxItems) {
        const timer = setTimeout(() => {
          setEvidenceItems(prev => [...prev, prev.length + 1])
        }, 1200) // Slower: 1.2 seconds between each item
        return () => clearTimeout(timer)
      }
    }
  }, [stage, evidenceItems.length])

  // Reset typing state before each typing section begins
  // This ensures typing animations replay correctly even after hot-reloads
  useEffect(() => {
    // Clear ALL text during overview/early stages
    if (stage <= 5) {
      setRcaText("")
      setDeadlineText("")
      setCapaText("")
    }
    // Keep CAPA text cleared during RCA/deadline phases (stages 6-8)
    // So it's guaranteed empty when CAPA focus starts at stage 9
    else if (stage >= 6 && stage <= 8) {
      setCapaText("")
    }
  }, [stage])

  // RCA Typing Effect - Starts when RCA is focused (stage 21) and types across stages 21→6→7
  // ~320 chars over ~7 seconds = visible, human-readable typing speed
  // Pre-fill if we're past the typing window (stage 8+, but NOT stage 21 which is a focus stage)
  useEffect(() => {
    if (stage >= 8 && stage !== 21 && rcaText.length < rcaFullText.length) {
      setRcaText(rcaFullText)
    } else if ((stage === 21 || stage === 6 || stage === 7) && rcaText.length < rcaFullText.length) {
      const interval = setInterval(() => {
        setRcaText((prev) => {
          if (prev.length < rcaFullText.length) {
            // Type 2 chars at a time — visible typing across the 7-second window
            return rcaFullText.slice(0, prev.length + 2)
          }
          return prev
        })
      }, 40) // 40ms per 2 chars ≈ 6.4 seconds for full text
      return () => clearInterval(interval)
    }
  }, [stage, rcaText.length])

  // Deadline Typing Effect - Stage 8 (4 seconds: 51-55s)
  // Pre-fill if we're past stage 8
  useEffect(() => {
    if (stage > 8 && deadlineText.length < deadlineFullText.length) {
      setDeadlineText(deadlineFullText)
    } else if (stage === 8 && deadlineText.length < deadlineFullText.length) {
      const interval = setInterval(() => {
        setDeadlineText((prev) => {
          if (prev.length < deadlineFullText.length) {
            return deadlineFullText.slice(0, prev.length + 1)
          }
          return prev
        })
      }, 200) // Type 1 char every 200ms = ~3.2 seconds for full deadline
      return () => clearInterval(interval)
    }
  }, [stage, deadlineText.length])

  // CAPA Typing Effect - Starts when CAPA is focused (stage 9) and types across stages 9→10→11
  // ~310 chars over ~12 seconds = visible, human-readable typing speed
  // Pre-fill if we're past stage 11
  useEffect(() => {
    if (stage > 11 && capaText.length < capaFullText.length) {
      setCapaText(capaFullText)
    } else if (stage >= 9 && stage <= 11 && capaText.length < capaFullText.length) {
      const interval = setInterval(() => {
        setCapaText((prev) => {
          if (prev.length < capaFullText.length) {
            // Type 2 chars at a time — visible typing
            return capaFullText.slice(0, prev.length + 2)
          }
          return prev
        })
      }, 40) // 40ms per 2 chars ≈ 6.2 seconds for full text
      return () => clearInterval(interval)
    }
  }, [stage, capaText.length])

  // File upload animations - SLOWER (spread across 76-87s = 11 seconds)
  useEffect(() => {
    const files = ["photo_evidence.jpg", "worker_statement.pdf", "voice_recording.mp3"]

    if (stage === 14 && !draggingFile && !uploadedFiles.includes(files[0])) {
      setDraggingFile(files[0])
      setTimeout(() => {
        setDraggingFile(null)
        setUploadedFiles((prev) => [...prev, files[0]])
      }, 1500) // Slower drag animation: 1.5 seconds
    }
    if (stage === 15 && !draggingFile && !uploadedFiles.includes(files[1])) {
      setDraggingFile(files[1])
      setTimeout(() => {
        setDraggingFile(null)
        setUploadedFiles((prev) => [...prev, files[1]])
      }, 1500) // Slower drag animation: 1.5 seconds
    }
    if (stage === 16 && !draggingFile && !uploadedFiles.includes(files[2])) {
      setDraggingFile(files[2])
      setTimeout(() => {
        setDraggingFile(null)
        setUploadedFiles((prev) => [...prev, files[2]])
      }, 1200) // Slightly faster for the last one: 1.2 seconds
    }
  }, [stage])

  useEffect(() => {
    if (stage >= 20) {
      setShowSuccess(true)
    }
  }, [stage])

  // Route Modal Typing Effect - Stage 22 (6 seconds: 100-106s, after button click)
  useEffect(() => {
    if (stage === 22) {
      // Type email first (2 seconds)
      if (routeEmail.length < routeEmailFull.length) {
        const interval = setInterval(() => {
          setRouteEmail((prev) => {
            if (prev.length < routeEmailFull.length) {
              return routeEmailFull.slice(0, prev.length + 1)
            }
            return prev
          })
        }, 80) // 80ms per char = ~1.8 seconds for email
        return () => clearInterval(interval)
      }
      // Then type message (4 seconds)
      else if (routeMessage.length < routeMessageFull.length) {
        const interval = setInterval(() => {
          setRouteMessage((prev) => {
            if (prev.length < routeMessageFull.length) {
              return routeMessageFull.slice(0, prev.length + 2)
            }
            return prev
          })
        }, 60) // 60ms per 2 chars = ~3.5 seconds for message
        return () => clearInterval(interval)
      }
    }
  }, [stage, routeEmail.length, routeMessage.length])

  // Reset on inactive
  useEffect(() => {
    if (!isActive) {
      setStage(0)
      setRcaText("")
      setCapaText("")
      setDeadlineText("")
      setRouteEmail("")
      setRouteMessage("")
      setUploadedFiles([])
      setShowSuccess(false)
      setDraggingFile(null)
      setEvidenceItems([])
    }
  }, [isActive])

  // Zoom transforms for timeline - Improved positioning to center each section
  const getTransform = () => {
    // Using smaller scale for better visibility of full sections
    switch (true) {
      // Zoom to RCA (right column, top) - Stages 21, 6, 7, 8 (Stage 5 is overview)
      // RCA card is in the right column, so we need to shift left (negative x) to center it
      case stage === 21 || (stage >= 6 && stage < 9):
        return {
          scale: 1.8,
          x: -180, // Shift left to center RCA card
          y: 30    // Shift down slightly to show full card
        }

      // Timeline Overview - Stage 5
      case stage === 5:
        return {
          scale: 1,
          x: 0,
          y: 0
        }

      // Zoom to CAPA (left column, bottom) - Stages 9-12
      // CAPA is in left column at bottom, shift right (positive x) and up (negative y)
      case stage >= 9 && stage < 13:
        return {
          scale: 1.8,
          x: 180,  // Shift right to center CAPA card
          y: -100  // Shift up to center the bottom card
        }

      // Zoom to Evidence (right column, bottom) - Stages 13-17
      // Evidence is in right column at bottom
      case stage >= 13 && stage < 18:
        return {
          scale: 1.8,
          x: -180, // Shift left to center right column
          y: -120  // Shift up to show bottom section
        }

      // Zoom to footer/submit button area - Stage 18
      case stage === 18:
        return {
          scale: 1.5,
          x: 0,
          y: -180 // Shift up to focus on footer
        }

      // Zoom out for routing button - Stage 19 (before modal)
      case stage === 19:
        return {
          scale: 1.3,
          x: 80,
          y: -150 // Show footer area with routing button
        }

      // Full view for completion - Stage 20, 22 (modal stages)
      case stage === 20 || stage === 22:
        return {
          scale: 1,
          x: 0,
          y: 0
        }

      // Default: show full page
      default:
        return { scale: 1, x: 0, y: 0 }
    }
  }

  // Determine if we should show blur overlay (when zoomed into sections or buttons)
  const isZoomed = (stage >= 6 && stage < 20 && stage !== 5) || stage === 19

  const transform = getTransform()

  // PHASE 1: Evidence Examination Visualization (Stages 1-4)
  // Synced with script: 29-42s
  // "The investigation officer examines the complaint, reviews evidence, conducts worker interviews 
  // and cross checks records such as attendance, payroll or security records where needed."
  if (stage >= 1 && stage <= 4) {
    return (
      <div className="w-full h-full overflow-hidden bg-gradient-to-br from-[#F5F5F7] to-[#E8E8EA] flex flex-col items-center justify-center font-sans relative px-8">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${COLORS.darkTeal} 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Page Header - Investigation Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-6 z-10"
        >
          <h1 className="text-xl font-bold text-[#284952]">Root Cause Analysis</h1>
          <div className="flex items-center justify-center gap-2 mt-1">
            <FileSearch size={14} className="text-teal-600" />
            <span className="text-teal-600 font-mono text-xs">Complaint #XX211117-11XXXX</span>
          </div>
        </motion.div>

        {/* Main Content Area - 3 Row Layout */}
        <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-4xl">

          {/* Row 1: Worker Interviews (Stage 2+) */}
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 2 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            {[
              { id: "worker1", name: "Ahmed", role: "Kitchen Staff" },
              { id: "worker2", name: "Fatima", role: "Supervisor" },
              { id: "worker3", name: "Omar", role: "Security Guard" },
            ].map((worker, idx) => (
              <motion.div
                key={worker.id}
                initial={{ opacity: 0, y: -30, scale: 0.8 }}
                animate={stage >= 2 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -30, scale: 0.8 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 15,
                  delay: stage >= 2 ? 0.1 + idx * 0.15 : 0
                }}
                className="flex flex-col items-center"
              >
                <div className="w-32 bg-white rounded-xl overflow-hidden border-2 shadow-lg" style={{ borderColor: "#60BA81" }}>
                  <div className="px-2 py-1.5 flex items-center gap-2 bg-[#60BA81]">
                    <User size={12} className="text-white" />
                    <span className="text-white font-bold text-[9px]">Worker Interview</span>
                  </div>
                  <div className="px-2.5 py-1.5 bg-white">
                    <div className="text-gray-800 font-semibold text-[11px]">{worker.name}</div>
                    <div className="text-gray-500 text-[9px]">{worker.role}</div>
                  </div>
                </div>
                {/* Connection line down to IO */}
                <motion.div
                  className="w-0.5 bg-gradient-to-b from-[#60BA81] to-transparent"
                  initial={{ height: 0 }}
                  animate={stage >= 2 ? { height: 20 } : { height: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Row 2: Central IO Hub */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="relative flex flex-col items-center"
          >
            {/* Pulsing Glow Ring */}
            <motion.div
              className="absolute w-52 h-52 rounded-full -z-10"
              style={{ background: `radial-gradient(circle, ${COLORS.teal}15 0%, transparent 70%)` }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* IO Avatar Card */}
            <motion.div
              className="bg-white rounded-xl shadow-2xl p-4 flex flex-col items-center border-2"
              style={{ borderColor: COLORS.teal }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden border-2 shadow-md mb-2" style={{ borderColor: COLORS.teal }}>
                <img src={ASSETS.officer_pc} alt="Investigation Officer" className="w-full h-full object-cover" />
              </div>
              <span className="text-[#284952] font-bold text-xs">Investigation Officer</span>
              <span className="text-teal-600 text-[9px] font-mono mb-2">IO-MULTAN47</span>

              {/* Status Badge */}
              <div
                className="px-3 py-1 rounded-full flex items-center gap-2"
                style={{ backgroundColor: `${COLORS.teal}12` }}
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: stage === 4 ? "#60BA81" : COLORS.teal }}
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-teal-700 text-[9px] font-medium">
                  {stage === 1 && "Examining Complaint..."}
                  {stage === 2 && "Conducting Interviews"}
                  {stage === 3 && "Cross-Checking Records"}
                  {stage === 4 && "Analysis Complete"}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Row 3: Department Records (Stage 3+) */}
          <motion.div
            className="flex items-start justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 3 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            {[
              { id: "attendance", icon: Calendar, label: "Attendance Records", detail: "Last 30 Days Log", color: "#0f9690", showAt: 3 },
              { id: "payroll", icon: FileText, label: "Payroll Records", detail: "Wage Slips & Deductions", color: "#F5A83C", showAt: 4 },
              { id: "security", icon: Monitor, label: "Security Records", detail: "CCTV & Access Logs", color: "#284952", showAt: 4 },
            ].map((record, idx) => (
              <motion.div
                key={record.id}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={stage >= record.showAt ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.8 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 15,
                  delay: stage >= record.showAt ? 0.1 + idx * 0.15 : 0
                }}
              >
                {/* Connection line up to IO */}
                <motion.div
                  className="w-0.5 bg-gradient-to-t from-transparent"
                  style={{ background: `linear-gradient(to top, transparent, ${record.color})` }}
                  initial={{ height: 0 }}
                  animate={stage >= record.showAt ? { height: 20 } : { height: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                />
                <div className="w-36 bg-white rounded-xl overflow-hidden border-2 shadow-lg" style={{ borderColor: record.color }}>
                  <div className="px-2 py-1.5 flex items-center gap-2" style={{ backgroundColor: record.color }}>
                    <record.icon size={12} className="text-white" />
                    <span className="text-white font-bold text-[9px]">{record.label}</span>
                  </div>
                  <div className="px-2.5 py-1.5 bg-white">
                    <div className="flex items-center gap-2 text-[9px] text-gray-600">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={stage >= record.showAt ? { scale: 1 } : { scale: 0 }}
                        transition={{ type: "spring", delay: 0.5 + idx * 0.1 }}
                      >
                        <CheckCircle2 size={10} style={{ color: record.color }} />
                      </motion.div>
                      <span>{record.detail}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Evidence Summary Panel (Stage 4) */}
        <AnimatePresence>
          {stage === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.6 }}
              className="absolute top-1/2 -translate-y-1/2 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 border-2 shadow-2xl z-20 w-44"
              style={{ borderColor: COLORS.green }}
            >
              <div className="flex flex-col gap-4">
                {/* Row 1: Status Header */}
                <div className="flex flex-col items-center text-center gap-2 pb-3 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-50 shadow-inner">
                    <CheckCircle2 size={24} className="text-green-600" />
                  </div>
                  <span className="text-gray-800 font-bold text-xs leading-tight">Evidence Review<br />Complete</span>
                </div>

                {/* Row 2: Stats Grid */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                  <div className="text-center">
                    <div className="text-lg font-black text-[#60BA81] leading-none mb-1">3</div>
                    <div className="text-gray-400 text-[7px] font-bold uppercase tracking-wider">Interviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-black text-[#0f9690] leading-none mb-1">✓</div>
                    <div className="text-gray-400 text-[7px] font-bold uppercase tracking-wider">Attendance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-black text-[#F5A83C] leading-none mb-1">✓</div>
                    <div className="text-gray-400 text-[7px] font-bold uppercase tracking-wider">Payroll</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-black text-[#284952] leading-none mb-1">✓</div>
                    <div className="text-gray-400 text-[7px] font-bold uppercase tracking-wider">Security</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // PHASE 2-5: Original Timeline View (Stages 5+)
  return (
    <div className="w-full h-full overflow-hidden bg-gradient-to-br from-[#F5F5F7] to-[#E8E8EA] flex items-center justify-center font-sans relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${COLORS.darkTeal} 1px, transparent 0)`,
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
            transition={{ duration: 0.7, ease: "easeInOut" }}
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

      {/* Blur/Spotlight Overlay - When zoomed into a section */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-[5] pointer-events-none"
            style={{
              background: `
                radial-gradient(
                  ellipse 60% 50% at 50% 50%,
                  transparent 0%,
                  transparent 40%,
                  rgba(0, 0, 0, 0.15) 70%,
                  rgba(0, 0, 0, 0.4) 100%
                )
              `,
            }}
          />
        )}
      </AnimatePresence>

      {/* Main Container with Zoom */}
      <motion.div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
        animate={{
          scale: transform.scale,
          x: transform.x,
          y: transform.y,
        }}
        transition={{
          type: "spring",
          stiffness: 90,
          damping: 25,
          mass: 1
        }}
      >
        <div className="w-[90%] h-[90%] max-w-[700px] max-h-[480px]">
          {/* Apple-style Card Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full bg-[#F8F8F8] rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-200 flex flex-col"
          >
            {/* Timeline Content - Matching Original Layout */}
            <div className="relative flex-1 p-3 overflow-hidden">
              {/* Central Timeline Line - Vertical Dashed */}
              <div className="absolute left-1/2 top-4 bottom-16 w-0 -translate-x-1/2 border-l-2 border-dashed border-gray-300" />

              {/* Timeline Progress Line */}
              <motion.div
                className="absolute left-1/2 top-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#0f9690] to-[#60BA81]"
                initial={{ height: "0%" }}
                animate={{ height: stage >= 5 ? "80%" : "0%" }}
                transition={{ duration: 3, ease: "easeOut" }}
              />

              {/* Content Layout - Two Columns with Timeline in Center */}
              <div className="relative grid grid-cols-[1fr_50px_1fr] gap-2 h-full">
                {/* Left Column - CAPA at bottom */}
                <div className="flex flex-col justify-end pb-4">
                  {/* CAPA Card - Bottom Left */}
                  <motion.div
                    animate={{
                      scale: stage >= 8 && stage < 12 ? 1.03 : 1,
                      zIndex: stage >= 8 && stage < 12 ? 10 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <motion.div
                      className="rounded-lg overflow-hidden shadow-lg border-2 transition-all duration-300"
                      style={{
                        borderColor: stage >= 8 && stage < 12 ? COLORS.teal : "transparent",
                        boxShadow:
                          stage >= 8 && stage < 12
                            ? `0 10px 40px -10px ${COLORS.teal}60`
                            : "0 4px 20px -5px rgba(0,0,0,0.1)",
                      }}
                    >
                      {/* Card Header */}
                      <div
                        className="px-2.5 py-1.5 flex items-center justify-between"
                        style={{ backgroundColor: COLORS.teal }}
                      >
                        <span className="font-bold text-white text-[11px]">CAPA-Corrective & Preventive Actions</span>
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                          <List size={11} className="text-white" />
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="bg-white p-3">
                        <div className="text-[10px] text-gray-500 font-medium mb-1">Detail:</div>

                        {/* Rich Text Toolbar */}
                        <div className="flex items-center gap-0.5 p-1 bg-gray-50 rounded mb-2 border border-gray-200">
                          {[Bold, Italic, Underline, List, ListOrdered, LinkIcon].map((Icon, i) => (
                            <button
                              key={i}
                              className="w-3.5 h-3.5 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                            >
                              <Icon size={8} />
                            </button>
                          ))}
                        </div>

                        {/* Text Content */}
                        <div className="min-h-[100px] max-h-[120px] overflow-y-auto p-2 border border-gray-200 rounded bg-gray-50/50 relative">
                          <div className="text-[9px] text-gray-600 leading-relaxed whitespace-pre-line">
                            {capaText ? (
                              <>
                                {capaText.split("\n").map((line, idx) => (
                                  <motion.div
                                    key={idx}
                                    animate={{
                                      backgroundColor:
                                        (stage === 9 && line.includes("CORRECTIVE")) ||
                                          (stage === 10 && line.includes("PREVENTIVE"))
                                          ? COLORS.softGreen
                                          : "transparent",
                                    }}
                                    className="px-1 -mx-1 rounded transition-colors duration-300"
                                  >
                                    {line}
                                  </motion.div>
                                ))}
                              </>
                            ) : (
                              <span className="text-gray-400 italic text-[9px]">
                                Outline the specific actions taken to resolve the issue (Corrective Actions) and steps
                                to prevent similar complaints in the future (Preventive Actions). Include:
                                <br />
                                <br />• How is the current issue being fixed?
                                <br />• What changes (policy updates, training, process improvements) has been
                                implemented to avoid repetition?
                                <br />• How will effectiveness be measured (e.g., audits, follow-ups)?
                              </span>
                            )}
                            {/* Persistent Cursor for CAPA focus/typing */}
                            {(stage >= 9 && stage <= 11) && (
                              <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.6 }}
                                className={`inline-block w-0.5 h-2.5 bg-[#0f9690] ml-0.5 align-middle ${!capaText ? "absolute top-2 left-2" : ""}`}
                              />
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
                        scale: stage >= 5 && stage < 8 ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: stage >= 5 && stage < 8 ? Number.POSITIVE_INFINITY : 0,
                        repeatDelay: 1,
                      }}
                    >
                      RCA
                    </motion.div>
                    <motion.div
                      className="w-3 h-3 rounded-full bg-white border-[3px] shadow-md z-10"
                      style={{ borderColor: stage >= 5 ? COLORS.teal : COLORS.border }}
                    />
                  </div>

                  {/* Node 2 - CAPA/Evidence */}
                  <div className="flex flex-col items-center gap-1">
                    <motion.div
                      className="px-2 py-0.5 rounded text-[9px] font-bold text-white"
                      style={{ backgroundColor: COLORS.orange }}
                      animate={{
                        scale: stage >= 8 && stage < 17 ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: stage >= 8 && stage < 17 ? Number.POSITIVE_INFINITY : 0,
                        repeatDelay: 1,
                      }}
                    >
                      CAPA
                    </motion.div>
                    <motion.div
                      className="w-3 h-3 rounded-full bg-white border-[3px] shadow-md z-10"
                      style={{ borderColor: stage >= 8 ? COLORS.teal : COLORS.border }}
                    />
                  </div>
                </div>

                {/* Right Column - RCA at top, Evidence at bottom */}
                <div className="flex flex-col gap-3 py-2">
                  {/* RCA Card - Top Right */}
                  <motion.div
                    animate={{
                      scale: stage >= 5 && stage < 8 ? 1.03 : 1,
                      zIndex: stage >= 5 && stage < 8 ? 10 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <motion.div
                      className="rounded-lg overflow-hidden shadow-lg border-2 transition-all duration-300"
                      style={{
                        borderColor: stage >= 5 && stage < 8 ? COLORS.green : "transparent",
                        boxShadow:
                          stage >= 5 && stage < 8
                            ? `0 10px 40px -10px ${COLORS.green}60`
                            : "0 4px 20px -5px rgba(0,0,0,0.1)",
                      }}
                    >
                      {/* Card Header */}
                      <div className="px-2.5 py-1.5 flex items-center gap-2" style={{ backgroundColor: COLORS.teal }}>
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                          <AlertTriangle size={11} className="text-white" />
                        </div>
                        <span className="font-bold text-white text-[11px]">RCA-Root Cause Analysis</span>
                      </div>

                      {/* Card Body */}
                      <div className="bg-white p-3">
                        <div className="text-[10px] text-gray-500 font-medium mb-1">Detail</div>

                        {/* Rich Text Toolbar */}
                        <div className="flex items-center gap-0.5 p-1 bg-gray-50 rounded mb-2 border border-gray-200">
                          {[Bold, Italic, Underline, List, ListOrdered, LinkIcon].map((Icon, i) => (
                            <button
                              key={i}
                              className="w-3.5 h-3.5 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                            >
                              <Icon size={8} />
                            </button>
                          ))}
                        </div>

                        {/* Text Content */}
                        <div className="min-h-[70px] max-h-[90px] overflow-y-auto p-2 border border-gray-200 rounded bg-gray-50/50 relative">
                          <div className="text-[9px] text-gray-600 leading-relaxed whitespace-pre-line">
                            {rcaText ? (
                              <>
                                {rcaText.split("\n").map((line, idx) => (
                                  <motion.div
                                    key={idx}
                                    animate={{
                                      backgroundColor: stage === 6 && (line.includes("VALID") || line.includes("findings"))
                                        ? COLORS.softGreen
                                        : "transparent",
                                    }}
                                    className="px-1 -mx-1 rounded transition-colors duration-300"
                                  >
                                    {line}
                                  </motion.div>
                                ))}
                              </>
                            ) : (
                              <span className="text-gray-400 italic text-[9px]">
                                Explain why the complaint happened. Identify the reason behind the problem—Answer
                                questions like:
                                <br />
                                <br />• Whether the complaint is valid or invalid?
                                <br />• What went wrong?
                                <br />• Was it a process issue, lack of training, or a mistake?
                                <br />• Has this happened before? If yes, why?
                              </span>
                            )}
                            {/* Persistent Cursor for RCA focus/typing (Stages 21, 6, 7) */}
                            {(stage === 21 || stage === 6 || stage === 7) && (
                              <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.6 }}
                                className={`inline-block w-0.5 h-2.5 bg-[#0f9690] ml-0.5 align-middle ${!rcaText ? 'absolute top-2 left-2' : ''}`}
                              />
                            )}
                          </div>
                        </div>

                        {/* CAPA Deadline */}
                        <motion.div
                          className="mt-2"
                          animate={{
                            scale: stage === 8 ? 1.02 : 1,
                          }}
                        >
                          <div className="text-[10px] text-gray-500 font-medium mb-1">Capa Deadline</div>
                          <motion.div
                            className="flex items-center gap-2 px-2 py-1 border-2 rounded bg-white"
                            animate={{
                              borderColor: stage === 8 ? COLORS.teal : "#e5e7eb",
                              boxShadow: stage === 8 ? `0 0 10px ${COLORS.teal}40` : "none",
                            }}
                          >
                            <span className="text-[9px] text-gray-700 font-medium">
                              {deadlineText || <span className="text-gray-400">dd/mm/yyyy --:--</span>}
                              {stage === 8 && deadlineText.length < deadlineFullText.length && (
                                <motion.span
                                  animate={{ opacity: [1, 0] }}
                                  transition={{ repeat: Infinity, duration: 0.5 }}
                                  className="inline-block w-0.5 h-2.5 bg-[#0f9690] ml-0.5 align-middle"
                                />
                              )}
                            </span>
                            <Calendar size={12} className={stage === 8 ? "text-[#0f9690]" : "text-gray-400"} style={{ marginLeft: "auto" }} />
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Evidence Upload Card - Bottom Right */}
                  <motion.div
                    animate={{
                      scale: stage >= 12 && stage < 17 ? 1.03 : 1,
                      zIndex: stage >= 12 && stage < 17 ? 10 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <motion.div
                      className="rounded-lg overflow-hidden shadow-lg border-2 transition-all duration-300"
                      style={{
                        borderColor: stage >= 12 && stage < 17 ? COLORS.teal : "transparent",
                        boxShadow:
                          stage >= 12 && stage < 17
                            ? `0 10px 40px -10px ${COLORS.teal}60`
                            : "0 4px 20px -5px rgba(0,0,0,0.1)",
                      }}
                    >
                      {/* Upload Area */}
                      <div className="p-2.5" style={{ backgroundColor: COLORS.teal }}>
                        <div className="flex items-center gap-3">
                          {/* Select Files Button */}
                          <div className="flex items-center gap-2 px-2.5 py-1.5 bg-white/20 rounded">
                            <Upload size={12} className="text-white" />
                            <span className="text-[9px] text-white font-medium">Select Files</span>
                          </div>
                          {/* Drop Zone Text */}
                          <span className="text-[9px] text-white">
                            Drag and drop files here or click to select files
                          </span>
                        </div>

                        {/* Uploaded Files Display */}
                        <div className="mt-2 min-h-[40px] bg-white/10 rounded p-2">
                          {uploadedFiles.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {uploadedFiles.map((file, idx) => (
                                <motion.div
                                  key={file}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="flex items-center gap-1 px-2 py-1 bg-white/20 rounded text-[8px] text-white"
                                >
                                  {file.includes("jpg") && <ImageIcon size={9} />}
                                  {file.includes("pdf") && <FileText size={9} />}
                                  {file.includes("mp3") && <Mic size={9} />}
                                  {file}
                                </motion.div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-[9px] text-white/60 italic">No files selected</span>
                          )}
                        </div>

                        {/* File Types Info */}
                        <div className="flex items-center gap-1 mt-2 text-[8px] text-white/80">
                          <Info size={9} />
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

            {/* Footer Buttons */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-2">
              <motion.button
                className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[9px] font-medium text-white"
                style={{ backgroundColor: "#0095da" }}
              >
                <Printer size={10} />
                Print Timeline
              </motion.button>
              <button className="px-2.5 py-1 rounded text-[9px] font-medium text-white bg-gray-500">Close</button>
              <div className="relative">
                <motion.button
                  className="px-2.5 py-1 rounded text-[9px] font-medium text-white"
                  style={{ backgroundColor: stage === 19 ? "#0095da" : "#0095da" }}
                  animate={{
                    boxShadow: stage === 19 ? `0 0 12px ${COLORS.teal}40` : "none",
                  }}
                >
                  Route Complaint
                </motion.button>

                {/* Animated Cursor - clicks the Route Complaint button */}
                {stage === 19 && (
                  <motion.div
                    className="absolute z-50 pointer-events-none"
                    initial={{ x: 80, y: 20, opacity: 0 }}
                    animate={{
                      x: [80, 20, 20, 20],
                      y: [20, -5, -5, -5],
                      opacity: [0, 1, 1, 1],
                      scale: [1, 1, 0.85, 1],
                    }}
                    transition={{
                      duration: 1.6,
                      times: [0, 0.5, 0.7, 0.85],
                      ease: "easeInOut",
                    }}
                  >
                    {/* Cursor pointer SVG */}
                    <svg width="20" height="24" viewBox="0 0 24 28" fill="none">
                      <path
                        d="M5 2L5 20L9.5 16L13.5 24L16.5 22.5L12.5 14.5L18 13L5 2Z"
                        fill="white"
                        stroke="#333"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {/* Click ripple */}
                    <motion.div
                      className="absolute top-0 left-0 w-4 h-4 rounded-full border-2"
                      style={{ borderColor: COLORS.teal }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 0, 2.5],
                        opacity: [0, 0, 0.6, 0],
                      }}
                      transition={{
                        duration: 1.6,
                        times: [0, 0.65, 0.85, 1],
                        ease: "easeOut",
                      }}
                    />
                  </motion.div>
                )}
              </div>
              <motion.button
                className="px-2.5 py-1 rounded text-[9px] font-medium text-white"
                style={{ backgroundColor: "#0095da" }}
                animate={{
                  scale: stage === 18 ? [1, 1.1, 1] : 1,
                  boxShadow: stage === 18 ? `0 0 20px ${COLORS.teal}` : "none",
                }}
                transition={{
                  duration: 0.4,
                  repeat: stage === 18 ? Number.POSITIVE_INFINITY : 0,
                  repeatDelay: 0.3,
                }}
              >
                Submit Changes
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Investigation Officer Visualization - Bottom Left Corner */}
      <AnimatePresence>
        {stage >= 5 && (
          <motion.div
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
            className="absolute bottom-6 right-6 z-30"
          >
            {/* Officer Card Container */}
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-200 overflow-hidden w-40">
                {/* Header */}
                <div
                  className="px-2.5 py-1.5 flex items-center gap-2"
                  style={{ backgroundColor: COLORS.darkTeal }}
                >
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <User size={12} className="text-white" />
                  </div>
                  <span className="text-[9px] font-bold text-white">Investigation Officer</span>
                </div>

                {/* Officer Avatar */}
                <div className="p-2.5 bg-gradient-to-br from-gray-50 to-white">
                  <div className="relative">
                    {/* Computer/Browser Frame */}
                    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                      {/* Browser Header */}
                      <div className="h-4 bg-gray-700 flex items-center px-1.5 gap-1">
                        <div className="flex gap-0.5">
                          <div className="w-1 h-1 rounded-full bg-red-400" />
                          <div className="w-1 h-1 rounded-full bg-yellow-400" />
                          <div className="w-1 h-1 rounded-full bg-green-400" />
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                          <Monitor size={7} className="text-gray-400" />
                        </div>
                      </div>

                      {/* Screen Content - Officer Working */}
                      <div className="relative bg-[#F8F8F8] h-28 flex items-center justify-center overflow-hidden">
                        {/* Miniature version of the form (blurred background) */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 opacity-60" />

                        {/* Typing Indicator */}
                        <motion.div
                          animate={{
                            opacity: stage >= 6 && stage < 18 ? [0.3, 0.7, 0.3] : 0.3,
                          }}
                          transition={{
                            duration: 2,
                            repeat: stage >= 6 && stage < 18 ? Number.POSITIVE_INFINITY : 0,
                          }}
                          className="absolute top-1.5 right-1.5 flex gap-0.5"
                        >
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{
                                y: stage >= 6 && stage < 18 ? [0, -2, 0] : 0,
                              }}
                              transition={{
                                duration: 0.6,
                                repeat: stage >= 6 && stage < 18 ? Number.POSITIVE_INFINITY : 0,
                                delay: i * 0.15,
                              }}
                              className="w-0.5 h-0.5 rounded-full"
                              style={{ backgroundColor: COLORS.teal }}
                            />
                          ))}
                        </motion.div>

                        {/* Officer Avatar Overlay */}
                        <div className="relative z-10">
                          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg bg-gradient-to-br from-gray-50 to-white">
                            <img
                              src={ASSETS.officer_pc}
                              alt="Investigation Officer"
                              className="w-full h-full object-cover"
                              style={{
                                imageRendering: 'auto',
                                WebkitFontSmoothing: 'antialiased',
                                backfaceVisibility: 'hidden',
                                transform: 'translateZ(0) scale(1.001)',
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status Indicator */}
                    <motion.div
                      className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[7px] font-bold text-white shadow-md flex items-center gap-1"
                      style={{ backgroundColor: COLORS.green }}
                      animate={{
                        scale: stage >= 6 && stage < 18 ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: stage >= 6 && stage < 18 ? Number.POSITIVE_INFINITY : 0,
                      }}
                    >
                      <motion.div
                        className="w-1 h-1 rounded-full bg-white"
                        animate={{
                          opacity: stage >= 6 && stage < 18 ? [1, 0.3, 1] : 1,
                        }}
                        transition={{
                          duration: 1,
                          repeat: stage >= 6 && stage < 18 ? Number.POSITIVE_INFINITY : 0,
                        }}
                      />
                      {stage >= 6 && stage < 9 && "Writing RCA"}
                      {stage === 21 && "Start RCA"}
                      {stage >= 9 && stage < 13 && "Documenting CAPA"}
                      {stage >= 13 && stage < 18 && "Uploading Evidence"}
                      {stage === 18 && "Preparing Submission"}
                      {stage === 19 && "Routing Case"}
                      {stage === 20 && "Complete"}
                      {(stage < 6 || stage > 20) && "Active"}
                    </motion.div>
                  </div>

                  {/* Progress Info */}
                  <div className="mt-1.5 text-center">
                    <p className="text-[8px] text-gray-600 font-medium leading-tight">
                      {stage >= 6 && stage < 9 && "Documenting Root Cause Analysis"}
                      {stage >= 9 && stage < 13 && "Creating Action Plan"}
                      {stage >= 13 && stage < 18 && "Attaching Evidence Files"}
                      {stage === 18 && "Finalizing Case Submission"}
                      {stage === 19 && "Processing Routing Options"}
                      {stage === 20 && "Investigation Complete"}
                      {stage < 6 && "Reviewing Evidence"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Route Complaint Modal - Stage 22 (after button click) */}
      <AnimatePresence>
        {stage === 22 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-xl shadow-2xl w-[400px] max-w-[90%] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
                <h2 className="text-base font-bold" style={{ color: COLORS.teal }}>
                  Route Complaint #XX011131-47XXXX
                </h2>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-5 space-y-5">
                {/* Route Method */}
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: COLORS.teal }}>
                    Route Method:
                  </label>
                  <motion.div
                    className="flex items-center justify-between px-2.5 py-2 border-2 rounded bg-white"
                    animate={{
                      borderColor: COLORS.teal,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Mail size={14} style={{ color: COLORS.teal }} />
                      <span className="text-xs text-gray-700">Via Email</span>
                    </div>
                    <ChevronDown size={14} className="text-gray-400" />
                  </motion.div>
                </div>

                {/* Recipient Email */}
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: COLORS.teal }}>
                    Recipient Email:
                  </label>
                  <motion.div
                    className="flex items-center px-2.5 py-2 border-2 rounded bg-white"
                    animate={{
                      borderColor: routeEmail.length > 0 ? COLORS.teal : "#e5e7eb",
                      boxShadow: routeEmail.length > 0 && routeEmail.length < routeEmailFull.length ? `0 0 8px ${COLORS.teal}30` : "none",
                    }}
                  >
                    <span className="text-xs text-gray-700">
                      {routeEmail || <span className="text-gray-400">Enter email address</span>}
                      {routeEmail.length > 0 && routeEmail.length < routeEmailFull.length && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ repeat: Infinity, duration: 0.5 }}
                          className="inline-block w-0.5 h-3.5 bg-[#0f9690] ml-0.5 align-middle"
                        />
                      )}
                    </span>
                  </motion.div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: COLORS.teal }}>
                    Message:
                  </label>
                  <motion.div
                    className="px-2.5 py-2 border-2 rounded bg-white min-h-[80px]"
                    animate={{
                      borderColor: routeMessage.length > 0 ? COLORS.teal : "#e5e7eb",
                      boxShadow: routeMessage.length > 0 && routeMessage.length < routeMessageFull.length ? `0 0 8px ${COLORS.teal}30` : "none",
                    }}
                  >
                    <span className="text-xs text-gray-700 leading-relaxed">
                      {routeMessage || <span className="text-gray-400">Add any additional instructions</span>}
                      {routeMessage.length > 0 && routeMessage.length < routeMessageFull.length && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ repeat: Infinity, duration: 0.5 }}
                          className="inline-block w-0.5 h-3.5 bg-[#0f9690] ml-0.5 align-middle"
                        />
                      )}
                    </span>
                  </motion.div>
                </div>

                {/* Submit Rights */}
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: COLORS.teal }}>
                    Submit Rights:
                  </label>
                  <div className="flex items-center justify-between px-2.5 py-2 border border-gray-300 rounded bg-white">
                    <span className="text-xs text-gray-400">-- Select an option --</span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </div>
                </div>

                {/* Instructions */}
                <div className="text-xs text-gray-500 space-y-1">
                  <p><strong>Save Draft:</strong> <span className="text-gray-400">(Temporarily save the complaint routing details for later submission.)</span></p>
                  <p><strong>Submit Changes:</strong> <span style={{ color: COLORS.teal }}>(Finalize and submit the complaint routing details immediately.)</span></p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 px-5 py-3 border-t border-gray-100 bg-gray-50">
                <button className="px-4 py-1.5 rounded text-xs font-medium text-white bg-gray-500 hover:bg-gray-600 transition-colors">
                  Cancel
                </button>
                <div className="relative">
                  <motion.button
                    className="flex items-center gap-2 px-4 py-1.5 rounded text-xs font-medium text-white"
                    style={{ backgroundColor: COLORS.teal }}
                    animate={{
                      boxShadow: routeMessage.length >= routeMessageFull.length ? `0 0 12px ${COLORS.teal}40` : "none",
                    }}
                  >
                    <Send size={14} />
                    Route Complaint
                  </motion.button>

                  {/* Animated Cursor - clicks the Route Complaint submit button */}
                  {stage === 22 && routeMessage.length >= routeMessageFull.length && (
                    <motion.div
                      className="absolute z-50 pointer-events-none"
                      initial={{ x: 60, y: 30, opacity: 0 }}
                      animate={{
                        x: [60, 15, 15, 15],
                        y: [30, -2, -2, -2],
                        opacity: [0, 1, 1, 1],
                        scale: [1, 1, 0.85, 1],
                      }}
                      transition={{
                        duration: 1.4,
                        times: [0, 0.5, 0.7, 0.85],
                        ease: "easeInOut",
                      }}
                    >
                      <svg width="20" height="24" viewBox="0 0 24 28" fill="none">
                        <path
                          d="M5 2L5 20L9.5 16L13.5 24L16.5 22.5L12.5 14.5L18 13L5 2Z"
                          fill="white"
                          stroke="#333"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <motion.div
                        className="absolute top-0 left-0 w-4 h-4 rounded-full border-2"
                        style={{ borderColor: COLORS.teal }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: [0, 0, 2.5],
                          opacity: [0, 0, 0.6, 0],
                        }}
                        transition={{
                          duration: 1.4,
                          times: [0, 0.65, 0.85, 1],
                          ease: "easeOut",
                        }}
                      />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Overlay - Stage 20: Complaint Routed Successfully */}
      <AnimatePresence>
        {stage === 20 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="bg-white rounded-2xl shadow-2xl w-[480px] max-w-[90%] overflow-hidden"
            >
              {/* Success Banner */}
              <div className="px-6 py-4 flex items-center gap-3" style={{ backgroundColor: COLORS.darkTeal }}>
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: COLORS.green }}
                  animate={{
                    boxShadow: [
                      `0 0 0 0 ${COLORS.green}40`,
                      `0 0 0 12px ${COLORS.green}00`,
                      `0 0 0 0 ${COLORS.green}40`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <CheckCircle2 size={22} className="text-white" strokeWidth={2.5} />
                </motion.div>
                <div>
                  <h3 className="text-base font-bold text-white">Complaint Routed Successfully</h3>
                  <p className="text-[11px] text-white/70">via Email</p>
                </div>
                <motion.div
                  className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-white"
                  style={{ backgroundColor: COLORS.green }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Mail size={12} />
                  Sent
                </motion.div>
              </div>

              {/* Email Preview */}
              <div className="px-5 py-4 space-y-3">
                {/* FOS Header */}
                <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.darkTeal }}>
                    <span className="text-[8px] font-bold text-white">FOS</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: COLORS.darkTeal }}>Complaint Routed to You</p>
                    <p className="text-[10px] text-gray-400">from FOS HRDD Team</p>
                  </div>
                </div>

                {/* Email Body */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2.5"
                >
                  <p className="text-[11px] text-gray-600">
                    Dear Investigation Officer,
                  </p>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    Investigation Officer has reviewed a <span className="font-bold" style={{ color: COLORS.teal }}>complaint</span> and determined it falls under your department's responsibility. This complaint has been officially routed to you for resolution.
                  </p>

                  {/* Message from IO */}
                  <div className="px-3 py-2.5 rounded border-l-3 bg-amber-50 border-l-4" style={{ borderLeftColor: COLORS.orange }}>
                    <p className="text-[10px] font-bold" style={{ color: COLORS.orange }}>Message from Investigation Officer:</p>
                    <p className="text-[10px] text-gray-600 mt-1">Please close the complaint</p>
                  </div>

                  {/* Complaint Info */}
                  <div className="px-3 py-2.5 rounded border-l-4 bg-gray-50" style={{ borderLeftColor: COLORS.teal }}>
                    <p className="text-[10px] font-bold mb-1.5" style={{ color: COLORS.darkTeal }}>Complaint Information</p>
                    <div className="space-y-1">
                      <div className="flex gap-4 text-[10px]">
                        <span className="text-gray-500 w-20">Ticket Number:</span>
                        <span className="font-medium text-gray-700">#XX061105-883532</span>
                      </div>
                      <div className="flex gap-4 text-[10px]">
                        <span className="text-gray-500 w-20">Company:</span>
                        <span className="font-medium text-gray-700">ARF</span>
                      </div>
                      <div className="flex gap-4 text-[10px]">
                        <span className="text-gray-500 w-20">Category:</span>
                        <span className="font-medium text-gray-700">Workplace Discipline</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex justify-center pt-1">
                    <motion.div
                      className="px-5 py-1.5 rounded text-[10px] font-bold text-white"
                      style={{ backgroundColor: COLORS.green }}
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      Submit CAPA & RCA
                    </motion.div>
                  </div>
                </motion.div>

                {/* Footer */}
                <div className="pt-2 border-t border-gray-200 text-center">
                  <p className="text-[9px] text-gray-400">Best regards,</p>
                  <p className="text-[9px] font-bold text-gray-500">FOS HRDD Team</p>
                  <p className="text-[8px] text-gray-400 mt-1">This is an automated email. Please do not reply.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}