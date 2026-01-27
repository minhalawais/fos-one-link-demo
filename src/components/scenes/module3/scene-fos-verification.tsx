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
                className="flex items-center gap-3 px-8 py-4 rounded-full relative"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.teal} 0%, ${COLORS.darkTeal} 100%)`,
                  boxShadow: `0 10px 40px -10px ${COLORS.teal}80, 0 0 0 1px ${COLORS.teal}20`,
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Shield size={28} className="text-white" />
                </motion.div>
                <span className="text-white font-bold text-xl">FOS Team Verification</span>

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

                        <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-gray-50 to-white relative">
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
                          className="absolute -top-2 -right-2 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${COLORS.teal} 0%, ${COLORS.darkTeal} 100%)`,
                          }}
                        >
                          <Phone size={24} className="text-white" />
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

                        <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-gray-50 to-white">
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
                          className="absolute -top-2 -right-2 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${COLORS.green} 0%, #4A9D6F 100%)`,
                          }}
                        >
                          <Phone size={24} className="text-white" />
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
                      <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gradient-to-br from-gray-50 to-white">
                        <img src={ASSETS.fosOfficer} alt="FOS Officer" className="w-full h-full object-cover" />
                      </div>
                      <p className="text-sm font-bold text-gray-800">FOS Officer</p>

                      {/* Enhanced speech bubble */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                        className="relative bg-white rounded-3xl shadow-2xl p-5 border-2 max-w-sm"
                        style={{
                          borderColor: COLORS.teal,
                          boxShadow: `0 20px 60px -15px ${COLORS.teal}30, 0 0 0 1px ${COLORS.teal}20`,
                        }}
                      >
                        <div className="space-y-3">
                          <motion.p
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="text-sm text-gray-700 leading-relaxed"
                          >
                            "The Investigation Officer has reviewed your complaint and taken corrective actions..."
                          </motion.p>
                          <motion.p
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                            className="text-sm text-gray-800 leading-relaxed font-semibold"
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
                      <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gradient-to-br from-gray-50 to-white">
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
                  className="bg-white rounded-3xl shadow-2xl p-8 flex items-center gap-8 relative overflow-hidden"
                  style={{
                    boxShadow: `0 30px 80px -20px ${COLORS.green}30`,
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

                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 3, ease: "linear", repeat: Infinity },
                      scale: { duration: 2, repeat: Infinity },
                    }}
                    className="w-20 h-20 rounded-full flex items-center justify-center relative z-10"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.green} 0%, #4A9D6F 100%)`,
                      boxShadow: `0 10px 30px -10px ${COLORS.green}60`,
                    }}
                  >
                    <Shield size={40} className="text-white" />
                  </motion.div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Independent Verification</h3>
                    <p className="text-base text-gray-600">Ensures fairness and builds trust in the process</p>
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

                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-gray-50 to-white relative">
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
                    className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
                    style={{
                      background: COLORS.orangeGradient,
                      boxShadow: `0 10px 40px -10px ${COLORS.orange}80`,
                    }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <XCircle size={32} className="text-white" strokeWidth={2.5} />
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

                <div className="p-6 text-white relative z-10">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <XCircle size={24} className="text-white" strokeWidth={2.5} />
                    <h2 className="text-xl font-bold">The Complainant Was Not Satisfied</h2>
                  </div>
                  <div className="text-center bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                    <p className="text-sm font-semibold mb-3 opacity-95">Feedback:</p>
                    <p className="text-sm leading-relaxed opacity-95">
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
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: COLORS.orangeGradient,
                    boxShadow: `0 5px 20px -5px ${COLORS.orange}60`,
                  }}
                >
                  <RotateCcw size={24} className="text-white" />
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
              <div className="w-[90%] h-[90%] max-w-[850px] max-h-[550px]">
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
                      className="mb-3"
                    >
                      <motion.div
                        className="rounded-lg overflow-hidden shadow-lg border-2 transition-all duration-300 mx-auto max-w-[500px]"
                        style={{
                          borderColor: COLORS.orange,
                          boxShadow: `0 10px 40px -10px ${COLORS.orange}60`,
                        }}
                      >
                        {/* Card Header */}
                        <div
                          className="px-3 py-2 flex items-center gap-2"
                          style={{ backgroundColor: COLORS.orange }}
                        >
                          <XCircle size={14} className="text-white" strokeWidth={2.5} />
                          <span className="font-bold text-white text-xs">Worker Feedback - Not Satisfied</span>
                        </div>

                        {/* Card Body */}
                        <div className="bg-white p-3">
                          <div className="text-[10px] text-gray-600 leading-relaxed">
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
                              <span className="font-bold text-white text-xs">CAPA-Corrective & Preventive Actions</span>
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
                              <div className="min-h-[120px] max-h-[140px] overflow-y-auto p-2 border border-gray-200 rounded bg-gray-50/50">
                                <div className="text-[10px] text-gray-600 leading-relaxed whitespace-pre-line">
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
                              <span className="font-bold text-white text-xs">RCA-Root Cause Analysis</span>
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
                            <div className="p-3" style={{ backgroundColor: COLORS.teal }}>
                              <div className="flex items-center gap-3">
                                {/* Select Files Button */}
                                <div className="flex items-center gap-2 px-3 py-2 bg-white/20 rounded">
                                  <Upload size={14} className="text-white" />
                                  <span className="text-[10px] text-white font-medium">Select Files</span>
                                </div>
                                {/* Drop Zone Text */}
                                <span className="text-[10px] text-white">
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
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                    {/* Rework Badge */}
                    <motion.div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full"
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
                        <RefreshCw size={14} className="text-white" />
                      </motion.div>
                      <span className="text-xs font-bold text-white">REWORK REQUIRED</span>
                    </motion.div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 rounded text-[10px] font-medium text-white bg-gray-500">Close</button>
                      <motion.button
                        className="px-3 py-1.5 rounded text-[10px] font-medium text-white"
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
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden w-56">
                    <div
                      className="px-4 py-3 flex items-center gap-2"
                      style={{ background: COLORS.orangeGradient }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <RefreshCw size={16} className="text-white" />
                      </motion.div>
                      <span className="text-xs font-bold text-white">Investigation Officer - Rework</span>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-gray-50 to-white">
                      <div className="relative">
                        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                          <div className="h-5 bg-gray-700 flex items-center px-2 gap-1">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 rounded-full bg-red-400" />
                              <div className="w-2 h-2 rounded-full bg-yellow-400" />
                              <div className="w-2 h-2 rounded-full bg-green-400" />
                            </div>
                          </div>

                          <div className="relative bg-gradient-to-br from-orange-50 to-red-50 h-32 flex items-center justify-center overflow-hidden">

                            <div className="relative z-10">
                              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-xl">
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
                          className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
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

                      <div className="mt-3 text-center">
                        <p className="text-xs text-gray-600 font-medium">
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
                className="flex items-center gap-3 px-6 py-3 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
                  boxShadow: "0 10px 40px -10px rgba(239, 68, 68, 0.5)",
                }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowUp size={24} className="text-white" />
                </motion.div>
                <span className="text-white font-bold text-lg">Escalation Triggered</span>
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
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border-2 border-red-200"
                  >
                    <Clock size={18} className="text-red-500" />
                    <span className="text-sm font-semibold text-red-600">Timeline Missed: 7 Days Overdue</span>
                  </motion.div>

                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border-2 border-orange-200"
                  >
                    <RotateCcw size={18} className="text-orange-500" />
                    <span className="text-sm font-semibold text-orange-600">3 Bounce-backs</span>
                  </motion.div>
                </div>

                {/* Escalation levels */}
                <div className="flex items-end justify-center gap-6">
                  {/* Level 1 - IO */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 80 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="w-28 bg-gradient-to-t from-gray-200 to-gray-100 rounded-t-xl flex flex-col items-center justify-end pb-2"
                  >
                    <span className="text-xs font-medium text-gray-600">IO</span>
                  </motion.div>

                  {/* Level 2 - Supervisor */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 120 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="w-28 bg-gradient-to-t from-orange-300 to-orange-200 rounded-t-xl flex flex-col items-center justify-end pb-2"
                  >
                    <span className="text-xs font-medium text-orange-700">Supervisor</span>
                  </motion.div>

                  {/* Level 3 - Management */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 160 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="w-28 rounded-t-xl flex flex-col items-center justify-end pb-2 relative overflow-hidden"
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
                    <span className="text-xs font-bold text-white">Senior Mgmt</span>
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

        {/* Stage 10: Senior Management */}
        {stage === 10 && (
          <motion.div
            key="senior-mgmt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center px-6"
          >
            <div className="flex flex-col items-center gap-6 max-w-[700px]">
              {/* Header */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex items-center gap-3 px-6 py-3 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.teal} 0%, ${COLORS.darkTeal} 100%)`,
                  boxShadow: `0 10px 40px -10px ${COLORS.teal}80`,
                }}
              >
                <Users size={24} className="text-white" />
                <span className="text-white font-bold text-lg">Senior Management Engaged</span>
              </motion.div>

              {/* Management Team */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl p-8 shadow-2xl w-full relative overflow-hidden"
                style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.15)" }}
              >
                {/* Background glow */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${COLORS.teal}10 0%, transparent 60%)`,
                  }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Management avatars */}
                <div className="flex items-center justify-center gap-8 mb-6 relative z-10">
                  {[
                    { title: "HR Director", color: "#8B5CF6" },
                    { title: "Compliance Head", color: COLORS.teal },
                    { title: "Plant Manager", color: "#F59E0B" },
                  ].map((person, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.2, type: "spring" }}
                      className="flex flex-col items-center gap-2"
                    >
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${person.color} 0%, ${person.color}CC 100%)` }}
                      >
                        <Users size={32} className="text-white" />
                      </motion.div>
                      <span className="text-sm font-semibold text-gray-700">{person.title}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Action items */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="bg-gray-50 rounded-xl p-4 relative z-10"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 size={18} style={{ color: COLORS.teal }} />
                    <span className="text-sm font-bold text-gray-800">Accountability Actions</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Direct intervention assigned",
                      "Priority escalation active",
                      "Daily progress reviews",
                      "Compliance audit scheduled",
                    ].map((action, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.9 + i * 0.1 }}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: COLORS.teal }}
                        />
                        {action}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Stage 11: Quality Assurance Summary */}
        {stage === 11 && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8 max-w-[550px] px-6 relative">

              {/* Success icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-28 h-28 rounded-full flex items-center justify-center shadow-2xl relative z-10"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.green} 0%, #4A9D6F 100%)`,
                  boxShadow: `0 20px 60px -15px ${COLORS.green}60`,
                }}
              >
                {/* Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${COLORS.green}40 0%, transparent 70%)`,
                    filter: "blur(20px)",
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.9, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <CheckCircle2 size={56} className="text-white" strokeWidth={2.5} />
                </motion.div>
              </motion.div>

              {/* Text content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center relative z-10"
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Quality Assurance</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  This verification loop prevents premature or incomplete closures, ensuring every complaint is properly
                  resolved.
                </p>
              </motion.div>

              {/* Trust badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white shadow-xl border border-gray-200 relative z-10"
                style={{
                  boxShadow: `0 20px 60px -15px ${COLORS.teal}30`,
                }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Shield size={24} style={{ color: COLORS.teal }} />
                </motion.div>
                <span className="text-base font-semibold text-gray-700">Fairness & Accountability Guaranteed</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
