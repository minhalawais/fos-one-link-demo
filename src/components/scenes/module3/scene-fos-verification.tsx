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
  MessageSquare,
  ArrowRight,
  RefreshCw,
} from "lucide-react"

// Brand Colors
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
  red: "#EF4444",
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

  // Updated RCA text after rework
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

  // Scene runs from 80.04 to ~112 seconds
  useEffect(() => {
    if (!isActive) return

    const sceneStart = 80.04
    const localProgress = progress - sceneStart

    if (localProgress < 0) {
      setStage(0)
      return
    }

    // [80.04-85.2] FOS contacts complainant - Show phone call animation
    if (localProgress < 5.16) {
      setStage(1)
    }
    // [85.2-90.6] Explain actions, confirm satisfaction - Show conversation
    else if (localProgress < 10.56) {
      setStage(2)
    }
    // [90.6-94.6] Independent check for fairness - Show trust badge
    else if (localProgress < 14.56) {
      setStage(3)
    }
    // [94.6-99.12] Not satisfied, bounced back - Show orange "Not Satisfied" card
    else if (localProgress < 19.08) {
      setStage(4)
    }
    // [99.12-107] Update RCA, revise CAPA - Zoom to RCA/CAPA timeline
    else if (localProgress < 27) {
      if (localProgress < 21)
        setStage(5) // Show full timeline
      else if (localProgress < 23)
        setStage(6) // Zoom to RCA
      else if (localProgress < 25)
        setStage(7) // Type RCA
      else setStage(8) // Zoom to CAPA, type CAPA
    }
    // [107.72-110.68] Prevents premature closures - Show success message
    else {
      setStage(9)
    }
  }, [isActive, progress])

  // RCA typing effect
  useEffect(() => {
    if (stage >= 7 && rcaText.length < rcaReworkText.length) {
      const interval = setInterval(() => {
        setRcaText((prev) => {
          if (prev.length < rcaReworkText.length) {
            return rcaReworkText.slice(0, prev.length + 3)
          }
          return prev
        })
      }, 25)
      return () => clearInterval(interval)
    }
  }, [stage, rcaText.length])

  // CAPA typing effect
  useEffect(() => {
    if (stage >= 8 && capaText.length < capaReworkText.length) {
      const interval = setInterval(() => {
        setCapaText((prev) => {
          if (prev.length < capaReworkText.length) {
            return capaReworkText.slice(0, prev.length + 3)
          }
          return prev
        })
      }, 20)
      return () => clearInterval(interval)
    }
  }, [stage, capaText.length])

  // Reset on inactive
  useEffect(() => {
    if (!isActive) {
      setStage(0)
      setRcaText("")
      setCapaText("")
    }
  }, [isActive])

  // Zoom transform based on stage
  const getTransform = () => {
    if (stage === 6 || stage === 7) {
      // Zoom to RCA
      return { scale: 2.2, x: -160, y: 60 }
    }
    if (stage === 8) {
      // Zoom to CAPA
      return { scale: 2.2, x: 160, y: -40 }
    }
    return { scale: 1, x: 0, y: 0 }
  }

  const transform = getTransform()

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
            <div className="flex flex-col items-center gap-6 max-w-[600px] px-6">
              {/* FOS Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 px-6 py-3 rounded-full shadow-lg"
                style={{ backgroundColor: COLORS.teal }}
              >
                <Shield size={24} className="text-white" />
                <span className="text-white font-bold text-lg">FOS Team Verification</span>
              </motion.div>

              {/* Stage 1: Phone Call */}
              {stage === 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-4"
                >
                  <motion.div
                    animate={{
                      rotate: [0, -10, 10, -10, 10, 0],
                      scale: [1, 1.1, 1.1, 1.1, 1.1, 1],
                    }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatDelay: 0.5 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: COLORS.softGreen }}
                  >
                    <Phone size={36} style={{ color: COLORS.teal }} />
                  </motion.div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Contacting Complainant</h3>
                    <p className="text-sm text-gray-500">FOS Team calling for independent verification...</p>
                  </div>
                  <motion.div
                    className="flex gap-1"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: COLORS.teal }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* Stage 2: Explaining Actions */}
              {stage === 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-[500px]"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: COLORS.softGreen }}
                    >
                      <MessageSquare size={24} style={{ color: COLORS.teal }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-gray-800 mb-2">Verification Call in Progress</h3>
                      <div className="space-y-3">
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-start gap-2"
                        >
                          <ArrowRight size={14} style={{ color: COLORS.teal }} className="mt-1 flex-shrink-0" />
                          <p className="text-sm text-gray-600">
                            Explaining the actions taken by the Investigation Officer
                          </p>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 }}
                          className="flex items-start gap-2"
                        >
                          <ArrowRight size={14} style={{ color: COLORS.teal }} className="mt-1 flex-shrink-0" />
                          <p className="text-sm text-gray-600">
                            Confirming if the worker is satisfied with the outcome
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Stage 3: Trust & Fairness */}
              {stage === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl shadow-xl p-6 flex items-center gap-6"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: COLORS.softGreen }}
                  >
                    <Shield size={32} style={{ color: COLORS.green }} />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Independent Verification</h3>
                    <p className="text-sm text-gray-500">Ensures fairness and builds trust in the process</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Stage 4: Not Satisfied Card */}
        {stage === 4 && (
          <motion.div
            key="not-satisfied"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 flex items-center justify-center px-6"
          >
            <div className="w-full max-w-[700px]">
              {/* Timeline connector */}
              <div className="flex justify-center mb-4">
                <div className="w-0.5 h-8 border-l-2 border-dashed border-gray-300" />
              </div>

              {/* Orange "Not Satisfied" Card - Matching Image */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl overflow-hidden shadow-2xl"
                style={{
                  background: COLORS.orangeGradient,
                }}
              >
                <div className="p-6 text-white">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <XCircle size={24} className="text-white" />
                    <h2 className="text-xl font-bold">The Complainant Was Not Satisfied</h2>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold mb-2 opacity-90">Feedback:</p>
                    <p className="text-sm leading-relaxed opacity-95">
                      The FOS team called the complainant and informed him about the response to his complaint. The
                      complainant mentioned that no renovation work has been done— all the washrooms are still in poor
                      condition, and no action has been taken. He requested that the issue be looked into and the
                      washrooms be properly repaired.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Bounce Back Arrow */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center mt-4 gap-2"
              >
                <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}>
                  <RotateCcw size={28} style={{ color: COLORS.orange }} />
                </motion.div>
                <span className="text-sm font-semibold" style={{ color: COLORS.orange }}>
                  Case Bounced Back to Investigation Officer
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Stage 5-8: RCA/CAPA Rework Timeline */}
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
              transition={{ type: "spring", stiffness: 80, damping: 25 }}
            >
              <div className="w-[95%] h-[95%] max-w-[900px] max-h-[550px]">
                {/* Rework Header Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center mb-3"
                >
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-full shadow-lg"
                    style={{ backgroundColor: COLORS.orange }}
                  >
                    <RefreshCw size={16} className="text-white" />
                    <span className="text-white font-bold text-sm">REWORK REQUIRED</span>
                  </div>
                </motion.div>

                {/* Timeline Content Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-[calc(100%-50px)] bg-[#F8F8F8] rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-200 flex flex-col"
                >
                  {/* Timeline Content */}
                  <div className="relative flex-1 p-4 overflow-hidden">
                    {/* Central Timeline Line */}
                    <div className="absolute left-1/2 top-4 bottom-16 w-0 -translate-x-1/2 border-l-2 border-dashed border-gray-300" />

                    {/* Timeline Progress */}
                    <motion.div
                      className="absolute left-1/2 top-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#F5A83C] to-[#60BA81]"
                      initial={{ height: "0%" }}
                      animate={{ height: "80%" }}
                      transition={{ duration: 2, ease: "easeOut" }}
                    />

                    {/* Two Column Layout */}
                    <div className="relative grid grid-cols-[1fr_50px_1fr] gap-3 h-full">
                      {/* Left Column - CAPA */}
                      <div className="flex flex-col justify-end pb-4">
                        <motion.div
                          animate={{
                            scale: stage === 8 ? 1.02 : 1,
                          }}
                        >
                          <motion.div
                            className="rounded-lg overflow-hidden shadow-lg border-2 transition-all duration-300"
                            style={{
                              borderColor: stage === 8 ? COLORS.teal : "transparent",
                              boxShadow:
                                stage === 8 ? `0 10px 40px -10px ${COLORS.teal}60` : "0 4px 20px -5px rgba(0,0,0,0.1)",
                            }}
                          >
                            <div
                              className="px-3 py-2 flex items-center justify-between"
                              style={{ backgroundColor: COLORS.teal }}
                            >
                              <span className="font-bold text-white text-xs">CAPA-Corrective & Preventive Actions</span>
                              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                <List size={12} className="text-white" />
                              </div>
                            </div>

                            <div className="bg-white p-3">
                              <div className="text-[10px] text-gray-500 font-medium mb-1">Detail:</div>
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
                        <div className="flex flex-col items-center gap-1">
                          <motion.div
                            className="px-2 py-0.5 rounded text-[9px] font-bold text-white"
                            style={{ backgroundColor: COLORS.orange }}
                            animate={{
                              scale: stage === 6 || stage === 7 ? [1, 1.1, 1] : 1,
                            }}
                            transition={{
                              duration: 0.5,
                              repeat: stage === 6 || stage === 7 ? Number.POSITIVE_INFINITY : 0,
                              repeatDelay: 1,
                            }}
                          >
                            REWORK
                          </motion.div>
                          <motion.div
                            className="w-3 h-3 rounded-full bg-white border-[3px] shadow-md z-10"
                            style={{ borderColor: stage >= 6 ? COLORS.orange : COLORS.border }}
                          />
                        </div>

                        <div className="flex flex-col items-center gap-1">
                          <motion.div
                            className="px-2 py-0.5 rounded text-[9px] font-bold text-white"
                            style={{ backgroundColor: COLORS.orange }}
                            animate={{
                              scale: stage === 8 ? [1, 1.1, 1] : 1,
                            }}
                            transition={{
                              duration: 0.5,
                              repeat: stage === 8 ? Number.POSITIVE_INFINITY : 0,
                              repeatDelay: 1,
                            }}
                          >
                            UPDATE
                          </motion.div>
                          <motion.div
                            className="w-3 h-3 rounded-full bg-white border-[3px] shadow-md z-10"
                            style={{ borderColor: stage === 8 ? COLORS.teal : COLORS.border }}
                          />
                        </div>
                      </div>

                      {/* Right Column - RCA */}
                      <div className="flex flex-col gap-3 py-2">
                        <motion.div
                          animate={{
                            scale: stage === 6 || stage === 7 ? 1.02 : 1,
                          }}
                        >
                          <motion.div
                            className="rounded-lg overflow-hidden shadow-lg border-2 transition-all duration-300"
                            style={{
                              borderColor: stage === 6 || stage === 7 ? COLORS.green : "transparent",
                              boxShadow:
                                stage === 6 || stage === 7
                                  ? `0 10px 40px -10px ${COLORS.green}60`
                                  : "0 4px 20px -5px rgba(0,0,0,0.1)",
                            }}
                          >
                            <div className="px-3 py-2 flex items-center gap-2" style={{ backgroundColor: COLORS.teal }}>
                              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                <AlertTriangle size={12} className="text-white" />
                              </div>
                              <span className="font-bold text-white text-xs">RCA-Root Cause Analysis</span>
                            </div>

                            <div className="bg-white p-3">
                              <div className="text-[10px] text-gray-500 font-medium mb-1">Detail</div>
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

                              <div className="min-h-[100px] max-h-[120px] overflow-y-auto p-2 border border-gray-200 rounded bg-gray-50/50">
                                <div className="text-[10px] text-gray-600 leading-relaxed whitespace-pre-line">
                                  {rcaText ? (
                                    <>
                                      {rcaText}
                                      {stage === 7 && rcaText.length < rcaReworkText.length && (
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
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Stage 9: Prevents Premature Closures */}
        {stage === 9 && (
          <motion.div
            key="prevents-closures"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-6 max-w-[500px] px-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-24 h-24 rounded-full flex items-center justify-center shadow-2xl"
                style={{ backgroundColor: COLORS.green }}
              >
                <CheckCircle2 size={48} className="text-white" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Quality Assurance</h2>
                <p className="text-base text-gray-600 leading-relaxed">
                  This verification loop prevents premature or incomplete closures, ensuring every complaint is properly
                  resolved.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white shadow-lg border border-gray-200"
              >
                <Shield size={20} style={{ color: COLORS.teal }} />
                <span className="text-sm font-medium text-gray-700">Fairness & Accountability Guaranteed</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
