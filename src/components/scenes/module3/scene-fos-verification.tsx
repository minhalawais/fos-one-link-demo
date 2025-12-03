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
  const containerRef = useRef<HTMLDivElement>(null)

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
    const sceneStart = 80.04
    const localProgress = progress - sceneStart
    if (localProgress < 0) { setStage(0); return }
    if (localProgress < 5.16) setStage(1)
    else if (localProgress < 10.56) setStage(2)
    else if (localProgress < 14.56) setStage(3)
    else if (localProgress < 19.08) setStage(4)
    else if (localProgress < 27) {
      if (localProgress < 21) setStage(5)
      else if (localProgress < 23) setStage(6)
      else if (localProgress < 25) setStage(7)
      else setStage(8)
    } else setStage(9)
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

  useEffect(() => {
    if (!isActive) {
      setStage(0)
      setRcaText("")
      setCapaText("")
    }
  }, [isActive])

  const getTransform = () => {
    if (stage === 6 || stage === 7) return { scale: 2.2, x: -160, y: 60 }
    if (stage === 8) return { scale: 2.2, x: 160, y: -40 }
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

        {/* Stage 5-8: Enhanced RCA/CAPA Timeline */}
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
              transition={{ type: "spring", stiffness: 100, damping: 25 }}
            >
              <div className="w-[98%] h-[98%] max-w-[1000px] max-h-[650px]">
                {/* Header badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center mb-4"
                >
                  <motion.div
                    className="flex items-center gap-3 px-6 py-3 rounded-full shadow-lg relative"
                    style={{
                      background: COLORS.orangeGradient,
                      boxShadow: `0 10px 30px -10px ${COLORS.orange}60`,
                    }}
                    animate={{
                      boxShadow: [
                        `0 10px 30px -10px ${COLORS.orange}60`,
                        `0 10px 40px -5px ${COLORS.orange}80`,
                        `0 10px 30px -10px ${COLORS.orange}60`,
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <RefreshCw size={20} className="text-white" />
                    </motion.div>
                    <span className="text-white font-bold text-base">REWORK REQUIRED</span>
                  </motion.div>
                </motion.div>

                {/* Timeline card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full h-[calc(100%-60px)] bg-white rounded-3xl overflow-hidden border border-gray-200 flex flex-col"
                  style={{
                    boxShadow: "0 30px 80px -20px rgba(0,0,0,0.15)",
                  }}
                >
                  <div className="relative flex-1 p-6 overflow-hidden">
                    {/* Timeline line */}
                    <div className="absolute left-1/2 top-6 bottom-20 w-0 -translate-x-1/2 border-l-2 border-dashed border-gray-300" />

                    {/* Animated progress line */}
                    <motion.div
                      className="absolute left-1/2 top-6 w-1 -translate-x-1/2 rounded-full"
                      style={{
                        background: `linear-gradient(180deg, ${COLORS.orange} 0%, ${COLORS.teal} 50%, ${COLORS.green} 100%)`,
                      }}
                      initial={{ height: "0%" }}
                      animate={{ height: "75%" }}
                      transition={{ duration: 2, ease: "easeOut" }}
                    />

                    {/* Content grid */}
                    <div className="relative grid grid-cols-[1fr_60px_1fr] gap-4 h-full">
                      {/* Left: CAPA */}
                      <div className="flex flex-col justify-end pb-6">
                        <motion.div
                          animate={{
                            scale: stage === 8 ? 1.03 : 1,
                          }}
                          transition={{ type: "spring" }}
                        >
                          <motion.div
                            className="rounded-2xl overflow-hidden shadow-xl border-2 transition-all duration-300"
                            style={{
                              borderColor: stage === 8 ? COLORS.teal : "transparent",
                              boxShadow: stage === 8
                                ? `0 15px 50px -15px ${COLORS.teal}60`
                                : "0 5px 25px -5px rgba(0,0,0,0.1)",
                            }}
                          >
                            <div
                              className="px-4 py-3 flex items-center justify-between"
                              style={{
                                background: `linear-gradient(135deg, ${COLORS.teal} 0%, ${COLORS.darkTeal} 100%)`,
                              }}
                            >
                              <span className="font-bold text-white text-sm">CAPA - Corrective & Preventive Actions</span>
                              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                                <List size={14} className="text-white" />
                              </div>
                            </div>

                            <div className="bg-white p-4">
                              <div className="text-xs text-gray-500 font-medium mb-2">Detail:</div>
                              <div className="flex items-center gap-1 p-2 bg-gray-50 rounded-lg mb-3 border border-gray-200">
                                {[Bold, Italic, Underline, List, ListOrdered, LinkIcon].map((Icon, i) => (
                                  <button
                                    key={i}
                                    className="w-6 h-6 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                                  >
                                    <Icon size={12} />
                                  </button>
                                ))}
                              </div>

                              <div className="min-h-[130px] max-h-[150px] overflow-y-auto p-3 border border-gray-200 rounded-lg bg-gray-50/50">
                                <div className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                                  {capaText ? (
                                    <>
                                      {capaText}
                                      {stage === 8 && capaText.length < capaReworkText.length && (
                                        <motion.span
                                          animate={{ opacity: [1, 0] }}
                                          transition={{ repeat: Infinity, duration: 0.6 }}
                                          className="inline-block w-0.5 h-4 bg-teal-600 ml-1 align-middle"
                                        />
                                      )}
                                    </>
                                  ) : (
                                    <span className="text-gray-400 italic">
                                      Revise CAPA with improved documentation...
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Center: Timeline nodes */}
                      <div className="flex flex-col items-center justify-between py-8">
                        <div className="flex flex-col items-center gap-2">
                          <motion.div
                            className="px-3 py-1 rounded-full text-xs font-bold text-white"
                            style={{ background: COLORS.orangeGradient }}
                            animate={{
                              scale: stage === 6 || stage === 7 ? [1, 1.15, 1] : 1,
                            }}
                            transition={{
                              duration: 0.6,
                              repeat: stage === 6 || stage === 7 ? Infinity : 0,
                              repeatDelay: 0.8,
                            }}
                          >
                            REWORK
                          </motion.div>
                          <motion.div
                            className="w-4 h-4 rounded-full bg-white border-4 shadow-lg z-10"
                            style={{ borderColor: stage >= 6 ? COLORS.orange : COLORS.border }}
                            animate={{
                              scale: stage >= 6 ? [1, 1.2, 1] : 1,
                            }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>

                        <div className="flex flex-col items-center gap-2">
                          <motion.div
                            className="px-3 py-1 rounded-full text-xs font-bold text-white"
                            style={{ background: COLORS.orangeGradient }}
                            animate={{
                              scale: stage === 8 ? [1, 1.15, 1] : 1,
                            }}
                            transition={{
                              duration: 0.6,
                              repeat: stage === 8 ? Infinity : 0,
                              repeatDelay: 0.8,
                            }}
                          >
                            UPDATE
                          </motion.div>
                          <motion.div
                            className="w-4 h-4 rounded-full bg-white border-4 shadow-lg z-10"
                            style={{ borderColor: stage === 8 ? COLORS.teal : COLORS.border }}
                            animate={{
                              scale: stage === 8 ? [1, 1.2, 1] : 1,
                            }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>

                      {/* Right: RCA */}
                      <div className="flex flex-col gap-4 py-3">
                        <motion.div
                          animate={{
                            scale: stage === 6 || stage === 7 ? 1.03 : 1,
                          }}
                          transition={{ type: "spring" }}
                        >
                          <motion.div
                            className="rounded-2xl overflow-hidden shadow-xl border-2 transition-all duration-300"
                            style={{
                              borderColor: stage === 6 || stage === 7 ? COLORS.green : "transparent",
                              boxShadow: stage === 6 || stage === 7
                                ? `0 15px 50px -15px ${COLORS.green}60`
                                : "0 5px 25px -5px rgba(0,0,0,0.1)",
                            }}
                          >
                            <div
                              className="px-4 py-3 flex items-center gap-2"
                              style={{
                                background: `linear-gradient(135deg, ${COLORS.teal} 0%, ${COLORS.darkTeal} 100%)`,
                              }}
                            >
                              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                                <AlertTriangle size={14} className="text-white" />
                              </div>
                              <span className="font-bold text-white text-sm">RCA - Root Cause Analysis</span>
                            </div>

                            <div className="bg-white p-4">
                              <div className="text-xs text-gray-500 font-medium mb-2">Detail:</div>
                              <div className="flex items-center gap-1 p-2 bg-gray-50 rounded-lg mb-3 border border-gray-200">
                                {[Bold, Italic, Underline, List, ListOrdered, LinkIcon].map((Icon, i) => (
                                  <button
                                    key={i}
                                    className="w-6 h-6 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                                  >
                                    <Icon size={12} />
                                  </button>
                                ))}
                              </div>

                              <div className="min-h-[110px] max-h-[130px] overflow-y-auto p-3 border border-gray-200 rounded-lg bg-gray-50/50">
                                <div className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                                  {rcaText ? (
                                    <>
                                      {rcaText}
                                      {stage === 7 && rcaText.length < rcaReworkText.length && (
                                        <motion.span
                                          animate={{ opacity: [1, 0] }}
                                          transition={{ repeat: Infinity, duration: 0.6 }}
                                          className="inline-block w-0.5 h-4 bg-green-600 ml-1 align-middle"
                                        />
                                      )}
                                    </>
                                  ) : (
                                    <span className="text-gray-400 italic">
                                      Update RCA based on complainant feedback...
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      </div>
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

        {/* Stage 9: Enhanced Success */}
        {stage === 9 && (
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
