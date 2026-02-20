"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Phone,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  List,
  ListOrdered,
  Bold,
  Italic,
  Underline,
  LinkIcon,
  RotateCcw,
  Shield,
  RefreshCw,
  Sparkles,
  ArrowUp,
  Clock,
  Users,
  AlertCircle,
  FileText,
  Upload,
  Mail,
} from "lucide-react"

const ASSETS = {
  fosOfficer: "/assets/avatars/fos_grievance_officer_avatar_training.png",
  workerNeutral: "/assets/avatars/worker_neutral.png",
  workerSad: "/assets/avatars/worker_sad.png",
  workerHappy: "/assets/avatars/worker_happy.png",
  officerPC: "/assets/avatars/officer_pc.png",
}

const COLORS = {
  teal: "#0f9690",
  darkTeal: "#284952",
  green: "#60BA81",
  charcoal: "#17161A",
  orange: "#F5A83C",
  orangeGradient: "linear-gradient(135deg, #F5A83C 0%, #E8923A 100%)",
  white: "#FFFFFF",
  bg: "#F5F5F7",
  border: "#DEE2E6",
  softGreen: "rgba(96, 186, 129, 0.42)",
}

interface SceneFOSVerificationProps {
  isActive: boolean
  progress?: number
}



export function SceneFOSVerification({ isActive, progress = 0 }: SceneFOSVerificationProps) {
  const [stage, setStage] = useState(0)
  const [rcaText, setRcaText] = useState("")
  const [capaText, setCapaText] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  // Evidence files to show during upload animation
  const evidenceFiles = ["site_photo_1.jpg", "renovation_quote.pdf", "worker_statement.pdf"]

  const rcaReworkText = `UPDATED RCA (Rework):

The complaint is VALID - Initial investigation was incomplete.

• Physical inspection confirms all 4 washrooms are in poor condition
• Renovation work was NOT completed as previously claimed
• Maintenance logs show no repair activities in past 6 months

Root Cause: Miscommunication between site team and management regarding completion status.`

  const capaReworkText = `REVISED CAPA:

CORRECTIVE ACTIONS:
• Schedule immediate washroom renovation (within 7 days)
• Assign dedicated contractor with daily progress reports

PREVENTIVE MEASURES:
• Implement photo-verified completion sign-offs
• Weekly site inspection by supervisor
• Direct communication channel with complainant

Deadline: 15 Dec 2025 | Escalated Priority`

  useEffect(() => {
    if (!isActive) return
    const sceneStart = 113
    const localProgress = progress - sceneStart
    if (localProgress < 0) { setStage(0); return }

    // 113-118s (5s): "Once a complaint is submitted, EFOS team contacts back the complainant directly for verification."
    if (localProgress < 5) setStage(1) // FOS Call

    // 118-124s (6s): "We explain the actions taken and confirm if the worker is satisfied with the outcome."
    else if (localProgress < 11) setStage(2) // Explain actions

    // 124-128s (4s): "This independent check ensures fairness and builds trust."
    else if (localProgress < 15) setStage(3) // Trust badge

    // 128-134s (6s): "If the worker is not satisfied, the case is bounced back to the investigation officer."
    else if (localProgress < 21) setStage(4) // Dissatisfied - bounce back

    // 134-138s (4s): "For the investigation officer must update the rca..."
    else if (localProgress < 25) setStage(5) // Rework intro - show timeline

    // 138-144s (6s): "...revise the CAPA and resubmit with improved documentation."
    else if (localProgress < 31) {
      if (localProgress < 28) setStage(6) // Zoom to RCA
      else setStage(7) // RCA typing
    }

    // 144-148s (4s): "This prevents premature or incomplete closures."
    else if (localProgress < 35) setStage(8) // CAPA revision

    // 148-155s (7s): "The system also supports escalation if timelines are missed or cases are repeatedly bounced back."
    else if (localProgress < 42) setStage(9) // Escalation visualization

    // 155-161s (6s): "Senior management can be automatically engaged to ensure accountability."
    else if (localProgress < 48) setStage(10) // Senior management

    // 161-163s (2s+): Quality assurance summary
    else setStage(11)

  }, [isActive, progress])

  useEffect(() => {
    if (stage >= 7 && rcaText.length < rcaReworkText.length) {
      const interval = setInterval(() => {
        setRcaText((prev) => prev.length < rcaReworkText.length ? rcaReworkText.slice(0, prev.length + 3) : prev)
      }, 25)
      return () => clearInterval(interval)
    }
  }, [stage, rcaText.length, rcaReworkText])

  useEffect(() => {
    if (stage >= 8 && capaText.length < capaReworkText.length) {
      const interval = setInterval(() => {
        setCapaText((prev) => prev.length < capaReworkText.length ? capaReworkText.slice(0, prev.length + 3) : prev)
      }, 20)
      return () => clearInterval(interval)
    }
  }, [stage, capaText.length, capaReworkText])

  // File upload animation for evidence
  useEffect(() => {
    if (stage === 8 && uploadedFiles.length < evidenceFiles.length) {
      const timer = setTimeout(() => {
        setUploadedFiles(prev => [...prev, evidenceFiles[prev.length]])
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [stage, uploadedFiles.length, evidenceFiles])

  useEffect(() => {
    if (!isActive) {
      setStage(0)
      setRcaText("")
      setCapaText("")
      setUploadedFiles([])
    }
  }, [isActive])

  const getTransform = () => {
    // Zoom to RCA card - stages 6, 7
    if (stage === 6 || stage === 7) return { scale: 1.8, x: -180, y: 30 }
    // Zoom to CAPA card - stage 8
    if (stage === 8) return { scale: 1.8, x: 180, y: -80 }
    // Default - full view
    return { scale: 1, x: 0, y: 0 }
  }

  const transform = getTransform()

  return (
    <div className="w-full h-full overflow-hidden bg-white flex items-center justify-center font-sans relative">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(15, 150, 144, 0.03) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(96, 186, 129, 0.03) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(15, 150, 144, 0.03) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Stage 1-3: FOS Verification Flow */}
      <AnimatePresence mode="wait">
        {stage >= 1 && stage <= 3 && (
          <motion.div
            key="fos-verification"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8 max-w-[700px] px-6 relative">

              {/* FOS Header with glow */}
              <motion.div
                initial={{ opacity: 0, y: -30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="flex items-center gap-2.5 px-6 py-3 rounded-full relative"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.teal} 0%, ${COLORS.darkTeal} 100%)`,
                  boxShadow: `0 8px 30px -8px ${COLORS.teal}80, 0 0 0 1px ${COLORS.teal}20`,
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Shield size={24} className="text-white" />
                </motion.div>
                <span className="text-white font-bold text-lg">FOS Team Verification</span>

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${COLORS.teal}40 0%, transparent 70%)`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Stage 1: Enhanced Phone Call */}
              {stage === 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-full"
                >
                  <div className="flex items-center justify-center gap-12 relative">

                    {/* FOS Officer */}
                    <motion.div
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 15 }}
                      className="flex flex-col items-center gap-4 relative z-10"
                    >
                      <div className="relative">
                        {/* Glow ring */}
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: `radial-gradient(circle, ${COLORS.teal}30 0%, transparent 70%)`,
                            filter: "blur(20px)",
                          }}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0.9, 0.5],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />

                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-gray-50 to-white relative">
                          <img
                            src={ASSETS.fosOfficer}
                            alt="FOS Officer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Calling badge with pulse */}
                        <motion.div
                          animate={{
                            scale: [1, 1.15, 1],
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="absolute -top-1 -right-1 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${COLORS.teal} 0%, ${COLORS.darkTeal} 100%)`,
                          }}
                        >
                          <Phone size={18} className="text-white" />
                        </motion.div>
                      </div>
                      <div className="text-center">
                        <p className="text-base font-bold text-gray-800">FOS Officer</p>
                        <motion.p
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-sm text-gray-500"
                        >
                          Calling...
                        </motion.p>
                      </div>
                    </motion.div>

                    {/* Connection visualization */}
                    <div className="relative flex items-center">
                      {/* Animated wave */}
                      <svg width="120" height="60" viewBox="0 0 120 60" className="relative z-10">
                        <motion.path
                          d="M 10 30 Q 30 15, 60 30 T 110 30"
                          stroke={COLORS.teal}
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{
                            pathLength: [0, 1, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        <motion.path
                          d="M 10 30 Q 30 45, 60 30 T 110 30"
                          stroke={COLORS.green}
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{
                            pathLength: [0, 1, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5,
                          }}
                        />
                      </svg>
                    </div>

                    {/* Worker */}
                    <motion.div
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 120, damping: 15 }}
                      className="flex flex-col items-center gap-4 relative z-10"
                    >
                      <div className="relative">
                        {/* Glow ring */}
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: `radial-gradient(circle, ${COLORS.green}30 0%, transparent 70%)`,
                            filter: "blur(20px)",
                          }}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0.9, 0.5],
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />

                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-gray-50 to-white">
                          <img
                            src={ASSETS.workerNeutral}
                            alt="Worker"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Ringing badge */}
                        <motion.div
                          animate={{
                            rotate: [0, -20, 20, -20, 20, 0],
                            scale: [1, 1.1, 1.1, 1.1, 1.1, 1],
                          }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.3 }}
                          className="absolute -top-1 -right-1 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${COLORS.green} 0%, #4A9D6F 100%)`,
                          }}
                        >
                          <Phone size={18} className="text-white" />
                        </motion.div>
                      </div>
                      <div className="text-center">
                        <p className="text-base font-bold text-gray-800">Worker</p>
                        <motion.p
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                          className="text-sm text-gray-500"
                        >
                          Receiving call...
                        </motion.p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Context text */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-center"
                  >
                    <p className="text-base text-gray-600 font-medium">
                      FOS Team calling for independent verification...
                    </p>
                  </motion.div>
                </motion.div>
              )}

              {/* Stage 2: Enhanced Conversation */}
              {stage === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full max-w-[750px]"
                >
                  <div className="flex items-start justify-center gap-8">
                    {/* FOS Officer with enhanced speech bubble */}
                    <motion.div
                      initial={{ x: -60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="flex flex-col items-center gap-4 flex-1"
                    >
                      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gradient-to-br from-gray-50 to-white">
                        <img src={ASSETS.fosOfficer} alt="FOS Officer" className="w-full h-full object-cover" />
                      </div>
                      <p className="text-sm font-bold text-gray-800">FOS Officer</p>

                      {/* Enhanced speech bubble */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                        className="relative bg-white rounded-3xl shadow-2xl p-4 border-2 max-w-sm"
                        style={{
                          borderColor: COLORS.teal,
                          boxShadow: `0 15px 40px -10px ${COLORS.teal}30, 0 0 0 1px ${COLORS.teal}20`,
                        }}
                      >
                        <div className="space-y-3">
                          <motion.p
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="text-[13px] text-gray-700 leading-relaxed"
                          >
                            "The Investigation Officer has reviewed your complaint and taken corrective actions..."
                          </motion.p>
                          <motion.p
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                            className="text-[13px] text-gray-800 leading-relaxed font-semibold"
                          >
                            "Are you satisfied with the outcome?"
                          </motion.p>
                        </div>
                        {/* Bubble tail */}
                        <div
                          className="absolute -bottom-3 left-10 w-6 h-6 bg-white border-b-2 border-r-2 rotate-45"
                          style={{ borderColor: COLORS.teal }}
                        />
                      </motion.div>
                    </motion.div>

                    {/* Worker listening */}
                    <motion.div
                      initial={{ x: 60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4, type: "spring" }}
                      className="flex flex-col items-center gap-4 flex-1"
                    >
                      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gradient-to-br from-gray-50 to-white">
                        <img src={ASSETS.workerNeutral} alt="Worker" className="w-full h-full object-cover" />
                      </div>
                      <p className="text-sm font-bold text-gray-800">Worker</p>

                      {/* Listening animation */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="flex gap-2"
                      >
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -8, 0] }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: i * 0.2,
                              ease: "easeInOut",
                            }}
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: COLORS.teal }}
                          />
                        ))}
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Stage 3: Enhanced Trust Badge */}
              {stage === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="bg-white rounded-3xl shadow-2xl p-6 flex items-center gap-6 relative overflow-hidden"
                  style={{
                    boxShadow: `0 20px 60px -15px ${COLORS.green}30`,
                  }}
                >
                  {/* Background glow */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 30% 50%, ${COLORS.softGreen} 0%, transparent 60%)`,
                    }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  <div className="w-16 h-16 rounded-full flex items-center justify-center relative z-10"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.green} 0%, #4A9D6F 100%)`,
                      boxShadow: `0 8px 25px -8px ${COLORS.green}60`,
                    }}
                  >
                    <Shield size={32} className="text-white" />
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">Independent Verification</h3>
                    <p className="text-sm text-gray-600">Ensures fairness and builds trust in the process</p>
                  </div>

                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Stage 4: Enhanced Dissatisfaction */}
        {stage === 4 && (
          <motion.div
            key="not-satisfied"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center px-6"
          >
            <div className="w-full max-w-[700px] relative">

              {/* Worker avatar */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0, y: -30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                className="flex justify-center mb-6 relative z-10"
              >
                <div className="relative">
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${COLORS.orange}40 0%, transparent 70%)`,
                      filter: "blur(30px)",
                    }}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.5, 0.9, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-gray-50 to-white relative">
                    <img
                      src={ASSETS.workerSad}
                      alt="Dissatisfied Worker"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* X badge with animation */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                    className="absolute -bottom-1 -right-1 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl"
                    style={{
                      background: COLORS.orangeGradient,
                      boxShadow: `0 8px 30px -8px ${COLORS.orange}80`,
                    }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <XCircle size={24} className="text-white" strokeWidth={2.5} />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced feedback card */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="rounded-3xl overflow-hidden shadow-2xl relative"
                style={{
                  background: COLORS.orangeGradient,
                  boxShadow: `0 30px 80px -20px ${COLORS.orange}60`,
                }}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                  }}
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />

                <div className="p-4 text-white relative z-10">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <XCircle size={20} className="text-white" strokeWidth={2.5} />
                    <h2 className="text-lg font-bold">The Complainant Was Not Satisfied</h2>
                  </div>
                  <div className="text-center bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <p className="text-xs font-semibold mb-2 opacity-95">Feedback:</p>
                    <p className="text-xs leading-relaxed opacity-95">
                      The FOS team called the complainant and informed him about the response to his complaint. The
                      complainant mentioned that no renovation work has been done— all the washrooms are still in poor
                      condition, and no action has been taken. He requested that the issue be looked into and the
                      washrooms be properly repaired.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Bounce back indicator */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center mt-6 gap-3 relative z-10"
              >
                <motion.div
                  animate={{
                    rotate: [0, -360],
                    y: [0, -5, 0],
                  }}
                  transition={{
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    y: { duration: 1.5, repeat: Infinity },
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: COLORS.orangeGradient,
                    boxShadow: `0 4px 15px -4px ${COLORS.orange}60`,
                  }}
                >
                  <RotateCcw size={20} className="text-white" />
                </motion.div>
                <span className="text-base font-bold" style={{ color: COLORS.orange }}>
                  Case Bounced Back to Investigation Officer
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Stage 5-8: Enhanced RCA/CAPA Timeline - Matching scene-rca-capa-evidence.tsx style */}
        {stage >= 5 && stage <= 8 && (
          <motion.div
            key="rework-timeline"
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
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
              <div className="w-[90%] h-[90%] max-w-[750px] max-h-[480px]">
                {/* Apple-style Card Container - matching scene-rca-capa-evidence.tsx */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full bg-[#F8F8F8] rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-200 flex flex-col"
                >
                  {/* Timeline Content */}
                  <div className="relative flex-1 p-4 overflow-hidden">
                    {/* Central Timeline Line - Vertical Dashed */}
                    <div className="absolute left-1/2 top-4 bottom-16 w-0 -translate-x-1/2 border-l-2 border-dashed border-gray-300" />

                    {/* Timeline Progress Line */}
                    <motion.div
                      className="absolute left-1/2 top-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#0f9690] to-[#60BA81]"
                      initial={{ height: "0%" }}
                      animate={{ height: stage >= 5 ? "80%" : "0%" }}
                      transition={{ duration: 3, ease: "easeOut" }}
                    />

                    {/* Worker Feedback Card - Horizontally Centered at Top */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mb-3 relative z-20"
                    >
                      <motion.div
                        className="rounded-lg overflow-hidden shadow-lg border-2 transition-all duration-300 mx-auto max-w-[420px]"
                        style={{
                          borderColor: COLORS.orange,
                          boxShadow: `0 8px 30px -8px ${COLORS.orange}60`,
                        }}
                      >
                        {/* Card Header */}
                        <div
                          className="px-2.5 py-1.5 flex items-center gap-2"
                          style={{ backgroundColor: COLORS.orange }}
                        >
                          <XCircle size={12} className="text-white" strokeWidth={2.5} />
                          <span className="font-bold text-white text-[11px]">Worker Feedback - Not Satisfied</span>
                        </div>

                        {/* Card Body */}
                        <div className="bg-white p-2.5">
                          <div className="text-[9px] text-gray-600 leading-relaxed">
                            The complainant mentioned that no renovation work has been done— all the washrooms are
                            still in poor condition. He requested the issue be properly addressed.
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Content Layout - Two Columns with Timeline in Center */}
                    <div className="relative grid grid-cols-[1fr_50px_1fr] gap-3 flex-1">
                      {/* Left Column - CAPA at bottom */}
                      <div className="flex flex-col justify-end pb-4">
                        {/* CAPA Card - Bottom Left */}
                        <motion.div
                          animate={{
                            scale: stage === 8 ? 1.03 : 1,
                            zIndex: stage === 8 ? 10 : 1,
                          }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <motion.div
                            className="rounded-lg overflow-hidden shadow-lg border-2 transition-all duration-300"
                            style={{
                              borderColor: stage === 8 ? COLORS.teal : "transparent",
                              boxShadow: stage === 8
                                ? `0 10px 40px -10px ${COLORS.teal}60`
                                : "0 4px 20px -5px rgba(0,0,0,0.1)",
                            }}
                          >
                            {/* Card Header */}
                            <div
                              className="px-3 py-2 flex items-center justify-between"
                              style={{ backgroundColor: COLORS.teal }}
                            >
                              <span className="font-bold text-white text-xs">CAPA1-Corrective & Preventive Actions</span>
                              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                <List size={12} className="text-white" />
                              </div>
                            </div>

                            {/* Card Body */}
                            <div className="bg-white p-3">
                              <div className="text-[10px] text-gray-500 font-medium mb-1">Detail:</div>

                              {/* Rich Text Toolbar */}
                              <div className="flex items-center gap-0.5 p-1.5 bg-gray-50 rounded mb-2 border border-gray-200">
                                {[Bold, Italic, Underline, List, ListOrdered, LinkIcon].map((Icon, i) => (
                                  <button
                                    key={i}
                                    className="w-5 h-5 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                                  >
                                    <Icon size={10} />
                                  </button>
                                ))}
                              </div>

                              {/* Text Content */}
                              <div className="min-h-[100px] max-h-[120px] overflow-y-auto p-2 border border-gray-200 rounded bg-gray-50/50">
                                <div className="text-[9px] text-gray-600 leading-relaxed whitespace-pre-line">
                                  {capaText ? (
                                    <>
                                      {capaText}
                                      {stage === 8 && capaText.length < capaReworkText.length && (
                                        <motion.span
                                          animate={{ opacity: [1, 0] }}
                                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6 }}
                                          className="inline-block w-0.5 h-3 bg-[#0f9690] ml-0.5 align-middle"
                                        />
                                      )}
                                    </>
                                  ) : (
                                    <span className="text-gray-400 italic text-[10px]">
                                      Revise CAPA with improved documentation...
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

                        {/* Node 2 - CAPA */}
                        <div className="flex flex-col items-center gap-1">
                          <motion.div
                            className="px-2 py-0.5 rounded text-[9px] font-bold text-white"
                            style={{ backgroundColor: COLORS.orange }}
                            animate={{
                              scale: stage >= 8 ? [1, 1.1, 1] : 1,
                            }}
                            transition={{
                              duration: 0.5,
                              repeat: stage >= 8 ? Number.POSITIVE_INFINITY : 0,
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
                              boxShadow: stage >= 5 && stage < 8
                                ? `0 10px 40px -10px ${COLORS.green}60`
                                : "0 4px 20px -5px rgba(0,0,0,0.1)",
                            }}
                          >
                            {/* Card Header */}
                            <div className="px-3 py-2 flex items-center gap-2" style={{ backgroundColor: COLORS.teal }}>
                              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                <AlertTriangle size={12} className="text-white" />
                              </div>
                              <span className="font-bold text-white text-xs">RCA1-Root Cause Analysis</span>
                            </div>

                            {/* Card Body */}
                            <div className="bg-white p-3">
                              <div className="text-[10px] text-gray-500 font-medium mb-1">Detail</div>

                              {/* Rich Text Toolbar */}
                              <div className="flex items-center gap-0.5 p-1.5 bg-gray-50 rounded mb-2 border border-gray-200">
                                {[Bold, Italic, Underline, List, ListOrdered, LinkIcon].map((Icon, i) => (
                                  <button
                                    key={i}
                                    className="w-5 h-5 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                                  >
                                    <Icon size={10} />
                                  </button>
                                ))}
                              </div>

                              {/* Text Content */}
                              <div className="min-h-[80px] max-h-[100px] overflow-y-auto p-2 border border-gray-200 rounded bg-gray-50/50">
                                <div className="text-[10px] text-gray-600 leading-relaxed whitespace-pre-line">
                                  {rcaText ? (
                                    <>
                                      {rcaText}
                                      {stage >= 6 && stage < 8 && (
                                        <motion.span
                                          animate={{ opacity: [1, 0] }}
                                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6 }}
                                          className="inline-block w-0.5 h-3 bg-[#60BA81] ml-0.5 align-middle"
                                        />
                                      )}
                                    </>
                                  ) : (
                                    <span className="text-gray-400 italic text-[10px]">
                                      Update RCA based on complainant feedback...
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>

                        {/* Evidence Upload Card - Bottom Right */}
                        <motion.div
                          animate={{
                            scale: stage === 8 && uploadedFiles.length > 0 ? 1.03 : 1,
                            zIndex: stage === 8 && uploadedFiles.length > 0 ? 10 : 1,
                          }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <motion.div
                            className="rounded-lg overflow-hidden shadow-lg border-2 transition-all duration-300"
                            style={{
                              borderColor: stage === 8 && uploadedFiles.length > 0 ? COLORS.teal : "transparent",
                              boxShadow: stage === 8 && uploadedFiles.length > 0
                                ? `0 10px 40px -10px ${COLORS.teal}60`
                                : "0 4px 20px -5px rgba(0,0,0,0.1)",
                            }}
                          >
                            {/* Upload Area */}
                            <div className="p-2.5" style={{ backgroundColor: COLORS.teal }}>
                              <div className="flex items-center gap-3">
                                {/* Select Files Button */}
                                <div className="flex items-center gap-2 px-2 py-1.5 bg-white/20 rounded">
                                  <Upload size={12} className="text-white" />
                                  <span className="text-[9px] text-white font-medium">Select Files</span>
                                </div>
                                {/* Drop Zone Text */}
                                <span className="text-[9px] text-white">
                                  Drag and drop files here
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
                                        <FileText size={10} />
                                        {file}
                                      </motion.div>
                                    ))}
                                  </div>
                                ) : (
                                  <span className="text-[10px] text-white/60 italic">No files selected</span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Footer - Matching scene-rca-capa-evidence.tsx */}
                  <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                    {/* Rework Badge */}
                    <motion.div
                      className="flex items-center gap-2 px-2.5 py-1 rounded-full"
                      style={{
                        background: COLORS.orangeGradient,
                        boxShadow: `0 4px 15px -5px ${COLORS.orange}60`,
                      }}
                      animate={{
                        boxShadow: [
                          `0 4px 15px -5px ${COLORS.orange}60`,
                          `0 4px 20px -2px ${COLORS.orange}80`,
                          `0 4px 15px -5px ${COLORS.orange}60`,
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <RefreshCw size={12} className="text-white" />
                      </motion.div>
                      <span className="text-[10px] font-bold text-white">REWORK REQUIRED</span>
                    </motion.div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button className="px-2.5 py-1.5 rounded text-[9px] font-medium text-white bg-gray-500">Close</button>
                      <motion.button
                        className="px-2.5 py-1.5 rounded text-[9px] font-medium text-white"
                        style={{ backgroundColor: "#0095da" }}
                      >
                        Submit Changes
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Investigation Officer card */}
            <AnimatePresence>
              {stage >= 5 && stage <= 8 && (
                <motion.div
                  initial={{ x: -150, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -150, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.4 }}
                  className="absolute bottom-8 left-8 z-40"
                >
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden w-48">
                    <div
                      className="px-3 py-2 flex items-center gap-2"
                      style={{ background: COLORS.orangeGradient }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <RefreshCw size={14} className="text-white" />
                      </motion.div>
                      <span className="text-[11px] font-bold text-white">Investigation Officer - Rework</span>
                    </div>

                    <div className="p-3 bg-gradient-to-br from-gray-50 to-white">
                      <div className="relative">
                        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                          <div className="h-4 bg-gray-700 flex items-center px-2 gap-1">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 rounded-full bg-red-400" />
                              <div className="w-2 h-2 rounded-full bg-yellow-400" />
                              <div className="w-2 h-2 rounded-full bg-green-400" />
                            </div>
                          </div>

                          <div className="relative bg-gradient-to-br from-orange-50 to-red-50 h-28 flex items-center justify-center overflow-hidden">

                            <div className="relative z-10">
                              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-xl">
                                <img
                                  src={ASSETS.officerPC}
                                  alt="Investigation Officer"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Status badge */}
                        <motion.div
                          className="absolute -bottom-1.5 -right-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-lg"
                          style={{ background: COLORS.orangeGradient }}
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        >
                          {stage >= 6 && stage < 8 && "Updating RCA"}
                          {stage === 8 && "Revising CAPA"}
                          {stage === 5 && "Reviewing"}
                        </motion.div>
                      </div>

                      <div className="mt-2.5 text-center">
                        <p className="text-[10px] text-gray-600 font-medium">
                          {stage >= 6 && stage < 8 && "Documenting new findings"}
                          {stage === 8 && "Creating revised action plan"}
                          {stage === 5 && "Preparing rework"}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Stage 9: Escalation Visualization */}
        {stage === 9 && (
          <motion.div
            key="escalation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center px-6"
          >
            <div className="flex flex-col items-center gap-6 max-w-[700px]">
              {/* Escalation Header */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
                  boxShadow: "0 8px 30px -8px rgba(239, 68, 68, 0.5)",
                }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowUp size={20} className="text-white" />
                </motion.div>
                <span className="text-white font-bold text-base">Escalation Triggered</span>
              </motion.div>

              {/* Escalation Pyramid */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative bg-white rounded-3xl p-8 shadow-2xl w-full"
                style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.15)" }}
              >
                {/* Timeline missed indicator */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border-2 border-red-200"
                  >
                    <Clock size={16} className="text-red-500" />
                    <span className="text-xs font-semibold text-red-600">Timeline Missed: 7 Days Overdue</span>
                  </motion.div>

                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border-2 border-orange-200"
                  >
                    <RotateCcw size={16} className="text-orange-500" />
                    <span className="text-xs font-semibold text-orange-600">3 Bounce-backs</span>
                  </motion.div>
                </div>

                {/* Escalation levels */}
                <div className="flex items-end justify-center gap-6">
                  {/* Level 1 - IO */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 60 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="w-24 bg-gradient-to-t from-gray-200 to-gray-100 rounded-t-xl flex flex-col items-center justify-end pb-2"
                  >
                    <span className="text-[10px] font-medium text-gray-600">IO</span>
                  </motion.div>

                  {/* Level 2 - Supervisor */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 100 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="w-24 bg-gradient-to-t from-orange-300 to-orange-200 rounded-t-xl flex flex-col items-center justify-end pb-2"
                  >
                    <span className="text-[10px] font-medium text-orange-700">Supervisor</span>
                  </motion.div>

                  {/* Level 3 - Management */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 140 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="w-24 rounded-t-xl flex flex-col items-center justify-end pb-2 relative overflow-hidden"
                    style={{
                      background: "linear-gradient(180deg, #EF4444 0%, #DC2626 100%)",
                    }}
                  >
                    {/* Pulsing effect */}
                    <motion.div
                      className="absolute inset-0"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{ background: "rgba(255,255,255,0.2)" }}
                    />
                    <ArrowUp size={20} className="text-white mb-1" />
                    <span className="text-[10px] font-bold text-white">Senior Mgmt</span>
                  </motion.div>
                </div>

                {/* Arrow animation */}
                <motion.div
                  className="absolute right-8 top-1/2 -translate-y-1/2"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white shadow-lg">
                    <AlertCircle size={16} />
                    <span className="text-sm font-bold">Auto-Escalating</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Stage 10: Senior Management - Email Reminder Visualization */}
        {stage === 10 && (
          <motion.div
            key="senior-mgmt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center px-6"
          >
            <div className="flex items-start gap-8 max-w-[850px] w-full">

              {/* Left Column: Management Receiving Notifications */}
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="flex flex-col items-center gap-4 w-[220px] flex-shrink-0"
              >
                {/* Header Badge */}
                <motion.div
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.teal} 0%, ${COLORS.darkTeal} 100%)`,
                    boxShadow: `0 8px 30px -8px ${COLORS.teal}60`,
                  }}
                >
                  <Users size={16} className="text-white" />
                  <span className="text-xs font-bold text-white">Senior Management</span>
                </motion.div>

                {/* Management Avatars with notification dots */}
                <div className="flex flex-col gap-4 w-full">
                  {[
                    { title: "HR Director", subtitle: "Imran Ijaz", color: "#8B5CF6", delay: 0.3 },
                    { title: "Compliance Head", subtitle: "Ahmed Khan", color: COLORS.teal, delay: 0.5 },
                    { title: "Plant Manager", subtitle: "Asif Malik", color: "#F59E0B", delay: 0.7 },
                  ].map((person, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: person.delay, type: "spring" }}
                      className="flex items-center gap-3 bg-white rounded-xl px-3.5 py-2.5 shadow-lg border border-gray-100"
                    >
                      <div className="relative">
                        <motion.div
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                          className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                          style={{ background: `linear-gradient(135deg, ${person.color} 0%, ${person.color}CC 100%)` }}
                        >
                          <Users size={18} className="text-white" />
                        </motion.div>
                        {/* Notification dot */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: person.delay + 0.5, type: "spring", stiffness: 300 }}
                          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center"
                        >
                          <Mail size={10} className="text-white" />
                        </motion.div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-800 truncate">{person.title}</p>
                        <p className="text-[10px] text-gray-500">{person.subtitle}</p>
                      </div>
                      {/* Delivery status */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: person.delay + 0.8 }}
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold"
                        style={{ backgroundColor: `${COLORS.green}20`, color: COLORS.green }}
                      >
                        <CheckCircle2 size={10} />
                        Sent
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Sending animation line */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex items-center gap-2 text-xs text-gray-500"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  >
                    <RefreshCw size={12} style={{ color: COLORS.teal }} />
                  </motion.div>
                  <span className="font-medium" style={{ color: COLORS.teal }}>Auto-reminders active</span>
                </motion.div>
              </motion.div>

              {/* Animated arrow connecting columns */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="flex flex-col items-center justify-center self-center gap-2"
              >
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  <svg width="40" height="24" viewBox="0 0 40 24">
                    <path d="M2 12H32M32 12L24 4M32 12L24 20" stroke={COLORS.teal} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </motion.div>
                <span className="text-[9px] font-bold" style={{ color: COLORS.teal }}>EMAIL</span>
              </motion.div>

              {/* Right Column: Email Preview */}
              <motion.div
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
                className="flex-1 max-w-[420px]"
              >
                <motion.div
                  className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
                  style={{ boxShadow: `0 25px 60px -15px rgba(0,0,0,0.2)` }}
                >
                  {/* Email Header - FOS Branded Dark Teal */}
                  <div className="px-4 py-3 text-center" style={{ backgroundColor: COLORS.darkTeal }}>
                    {/* FOS Logo Badge */}
                    <div className="flex justify-center mb-1.5">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-[7px] font-bold text-white leading-tight">FOS</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <h3 className="text-xs font-bold text-white">RCA & CAPA Submission Reminder</h3>
                      <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="px-2 py-0.5 rounded text-[8px] font-bold text-white"
                        style={{ backgroundColor: COLORS.green }}
                      >
                        REMINDER
                      </motion.span>
                    </div>
                  </div>

                  {/* Email Body */}
                  <div className="px-4 py-3 space-y-2.5">
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <p className="text-[10px] text-gray-600 mb-1">Dear Imran Ijaz,</p>
                      <p className="text-[9px] text-gray-500 leading-relaxed">
                        This is a friendly reminder to submit the Root Cause Analysis (RCA) and Corrective and Preventive Action (CAPA) for the following complaint ticket.
                      </p>
                    </motion.div>

                    {/* Action Required Alert */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="px-2.5 py-2 rounded border-l-4 bg-amber-50"
                      style={{ borderLeftColor: COLORS.orange }}
                    >
                      <p className="text-[9px] font-bold text-red-600 mb-0.5">Action Required</p>
                      <p className="text-[9px] text-gray-600">
                        Your RCA and CAPA submission is pending. Please complete and submit as soon as possible.
                      </p>
                    </motion.div>

                    {/* Complaint Information */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 }}
                      className="px-2.5 py-2 rounded border-l-4 bg-gray-50"
                      style={{ borderLeftColor: COLORS.teal }}
                    >
                      <p className="text-[9px] font-bold mb-1" style={{ color: COLORS.darkTeal }}>Complaint Information</p>
                      <div className="space-y-1">
                        <div className="flex gap-3 text-[9px]">
                          <span className="text-gray-500 w-16">Ticket Number:</span>
                          <span className="font-medium" style={{ color: COLORS.teal }}>#FB021221-1002430</span>
                        </div>
                        <div className="flex gap-3 text-[9px]">
                          <span className="text-gray-500 w-16">Time Elapsed:</span>
                          <span className="font-medium text-red-500">48 hours</span>
                        </div>
                        <div className="flex gap-3 text-[9px]">
                          <span className="text-gray-500 w-16">Status:</span>
                          <span className="font-medium text-gray-700">Pending RCA & CAPA</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Next Steps */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 }}
                      className="px-2.5 py-2 rounded border-l-4 bg-teal-50"
                      style={{ borderLeftColor: COLORS.green }}
                    >
                      <p className="text-[9px] font-bold mb-0.5" style={{ color: COLORS.darkTeal }}>Next Steps</p>
                      <p className="text-[9px] text-gray-600">
                        Please complete the RCA and CAPA as soon as possible to ensure timely resolution.
                      </p>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className="flex justify-center pt-1"
                    >
                      <motion.div
                        className="px-4 py-1 rounded text-[9px] font-bold text-white"
                        style={{ backgroundColor: COLORS.green }}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Submit RCA & CAPA
                      </motion.div>
                    </motion.div>

                    {/* Important Notice */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="px-2.5 py-1.5 rounded bg-gray-50 border border-gray-200"
                    >
                      <p className="text-[9px] text-gray-500">
                        <span className="font-bold text-red-500">Important:</span> This link provides direct access to submit your RCA and CAPA findings. All investigation details must be documented through this portal.
                      </p>
                    </motion.div>
                  </div>

                  {/* Email Footer */}
                  <div className="px-4 py-2 text-center border-t border-gray-200" style={{ backgroundColor: COLORS.darkTeal }}>
                    <p className="text-[7px] text-white/60">This is an automated reminder. Please do not reply.</p>
                    <p className="text-[7px] text-white/80 font-medium mt-0.5">Fruit of Sustainability | Your Partner in Grievance Management</p>
                    <p className="text-[6px] text-white/50 mt-0.5">© 2025 Fruit of Sustainability. All rights reserved.</p>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
