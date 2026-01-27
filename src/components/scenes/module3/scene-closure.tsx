"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  TrendingUp,
  Activity,
  FileCheck,
  CheckCircle2,
  Sparkles,
  Shield,
  Phone,
} from "lucide-react"

const ASSETS = {
  fosOfficer: "/assets/avatars/fos_grievance_officer_avatar_training.png",
  workerHappy: "/assets/avatars/worker_happy.png",
}

const COLORS = {
  teal: "#0f9690",
  darkTeal: "#284952",
  green: "#60BA81",
  charcoal: "#17161A",
  orange: "#F5A83C",
  orangeGradient: "linear-gradient(135deg, #F5A83C 0%, #E67E22 100%)",
  white: "#FFFFFF",
  bg: "#F5F5F7",
  softGreen: "rgba(96, 186, 129, 0.42)",
}

interface SceneClosureProps {
  progress: number
}

export function SceneClosure({ progress }: SceneClosureProps) {
  const sceneStart = 163
  const transitionPoint = 171
  const showInsights = progress > transitionPoint

  // Stage management for sequential storytelling
  // Stage 1 (0-3s): Show Worker & FOS Officer interaction
  // Stage 2 (3s-transition): Show satisfaction card (characters flip away)
  // Stage 3 (after transition): Show insights with FOS Officer analyzing
  const localProgress = progress - sceneStart
  const showCharactersFirst = localProgress >= 0 && localProgress < 3
  const showSatisfactionCard = localProgress >= 3 && !showInsights
  const showInsightsPhase = showInsights

  return (
    <div className="w-full h-full bg-white relative overflow-hidden font-sans select-none flex items-center justify-center">

      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(245, 168, 60, 0.04) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, rgba(96, 186, 129, 0.04) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, rgba(245, 168, 60, 0.04) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 w-full max-w-6xl px-8 flex items-center justify-center">

        {/* Stage 1: Worker & FOS Officer Characters - Initial Interaction */}
        <AnimatePresence>
          {showCharactersFirst && (
            <motion.div
              key="initial-characters"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex items-center justify-center gap-16"
            >
              {/* Worker - Happy */}
              <motion.div
                initial={{ x: -100, opacity: 0, rotateY: -30 }}
                animate={{ x: 0, opacity: 1, rotateY: 0 }}
                exit={{ x: -50, opacity: 0, rotateY: 30 }}
                transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.2 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="relative">
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${COLORS.green}30 0%, transparent 70%)`,
                      filter: "blur(25px)",
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.9, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-gray-50 to-white relative">
                    <img
                      src={ASSETS.workerHappy}
                      alt="Happy Worker"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Satisfied badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                    className="absolute -bottom-2 -right-2 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${COLORS.green} 0%, #4A9D6F 100%)`,
                    }}
                  >
                    <CheckCircle2 size={28} className="text-white" />
                  </motion.div>
                </div>

                <div className="text-center">
                  <p className="text-base font-bold text-gray-800">Worker</p>
                  <motion.p
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-sm font-semibold"
                    style={{ color: COLORS.green }}
                  >
                    Satisfied with Resolution
                  </motion.p>
                </div>
              </motion.div>

              {/* Connection visualization */}
              <div className="relative flex flex-col items-center gap-2">
                <svg width="120" height="60" viewBox="0 0 120 60">
                  <motion.path
                    d="M 10 30 Q 60 15, 110 30"
                    stroke={COLORS.green}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.path
                    d="M 10 30 Q 60 45, 110 30"
                    stroke={COLORS.teal}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  />
                </svg>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="px-4 py-2 rounded-full bg-white shadow-lg border border-gray-100"
                >
                  <p className="text-xs font-bold text-gray-700">Confirmation Call</p>
                </motion.div>
              </div>

              {/* FOS Officer */}
              <motion.div
                initial={{ x: 100, opacity: 0, rotateY: 30 }}
                animate={{ x: 0, opacity: 1, rotateY: 0 }}
                exit={{ x: 50, opacity: 0, rotateY: -30 }}
                transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.4 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="relative">
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${COLORS.teal}30 0%, transparent 70%)`,
                      filter: "blur(25px)",
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.9, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />

                  <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-gray-50 to-white relative">
                    <img
                      src={ASSETS.fosOfficer}
                      alt="FOS Officer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Phone badge */}
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
                  <p className="text-sm text-gray-600">Confirming Closure</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 2: Satisfaction Card (Flips in after characters) */}
        <AnimatePresence>
          {showSatisfactionCard && (
            <motion.div
              key="satisfaction-card"
              initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
              animate={{
                opacity: 1,
                rotateY: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0.5,
                scale: 0.88,
                x: -200,
                filter: "blur(4px)"
              }}
              transition={{ type: "spring", stiffness: 120, damping: 25 }}
              className="relative max-w-[650px] w-full"
              style={{ perspective: 1000 }}
            >
              <div
                className="rounded-3xl p-8 text-center text-white relative overflow-hidden"
                style={{
                  background: COLORS.orangeGradient,
                  boxShadow: `0 30px 80px -20px ${COLORS.orange}40`,
                }}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
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

                {/* Gloss overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center gap-4">
                  {/* Success icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
                    style={{
                      background: "rgba(255, 255, 255, 0.2)",
                      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
                    }}
                  >
                    <CheckCircle2 size={32} className="text-white" strokeWidth={2.5} />
                  </motion.div>

                  {/* Heading */}
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl font-bold tracking-tight drop-shadow-sm"
                  >
                    The Complainant Was Satisfied
                  </motion.h2>

                  {/* Sub-header */}
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm font-semibold text-white/90"
                  >
                    Feedback:
                  </motion.h3>

                  {/* Feedback text */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-sm leading-relaxed text-white/95 font-medium drop-shadow-sm max-w-xl mx-auto"
                  >
                    The FOS Team contacted the complainant and informed him that a coaching session has been conducted with Mr. Areeb, and he has been issued a warning. The complainant was advised to inform FOS if any further behavior issues arise. The complainant is satisfied with the response.
                  </motion.p>

                  {/* Closure badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-2 flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm"
                  >
                    <Shield size={16} className="text-white" />
                    <span className="text-xs font-bold text-white">Case Officially Closed</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 2 (continued): Satisfaction Card during insights phase */}
        {showInsightsPhase && (
          <motion.div
            initial={{ opacity: 1, scale: 1, x: 0 }}
            animate={{
              opacity: 0.5,
              scale: 0.88,
              x: -200,
              filter: "blur(4px)"
            }}
            transition={{ type: "spring", stiffness: 120, damping: 25 }}
            className="relative max-w-[650px] w-full"
          >
            <div
              className="rounded-3xl p-8 text-center text-white relative overflow-hidden"
              style={{
                background: COLORS.orangeGradient,
                boxShadow: `0 30px 80px -20px ${COLORS.orange}40`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
                  }}
                >
                  <CheckCircle2 size={32} className="text-white" strokeWidth={2.5} />
                </div>
                <h2 className="text-2xl font-bold tracking-tight drop-shadow-sm">
                  The Complainant Was Satisfied
                </h2>
                <h3 className="text-sm font-semibold text-white/90">Feedback:</h3>
                <p className="text-sm leading-relaxed text-white/95 font-medium drop-shadow-sm max-w-xl mx-auto">
                  The FOS Team contacted the complainant and informed him that a coaching session has been conducted with Mr. Areeb, and he has been issued a warning. The complainant was advised to inform FOS if any further behavior issues arise. The complainant is satisfied with the response.
                </p>
                <div className="mt-2 flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                  <Shield size={16} className="text-white" />
                  <span className="text-xs font-bold text-white">Case Officially Closed</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Insights Dashboard */}
        <AnimatePresence>
          {showInsights && (
            <motion.div
              initial={{ opacity: 0, x: 120, scale: 0.9 }}
              animate={{ opacity: 1, x: 80, scale: 1 }}
              exit={{ opacity: 0, x: 120, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 120, damping: 25 }}
              className="absolute z-20 w-full max-w-[480px]"
            >
              <div
                className="bg-white rounded-3xl p-7 relative overflow-hidden"
                style={{
                  boxShadow: "0 40px 100px -20px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)",
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${COLORS.darkTeal} 0%, ${COLORS.teal} 100%)`,
                        boxShadow: `0 10px 30px -10px ${COLORS.darkTeal}40`,
                      }}
                    >
                      <BarChart3 size={22} />
                    </motion.div>
                    <div>
                      <h3 className="text-gray-800 font-bold text-xl leading-tight">Risk Insights</h3>
                      <p className="text-gray-500 text-xs font-medium">Global Analysis</p>
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{
                      background: COLORS.softGreen,
                    }}
                  >
                    <TrendingUp size={14} style={{ color: COLORS.green }} />
                    <span className="text-xs font-bold uppercase" style={{ color: COLORS.green }}>
                      Prevention Active
                    </span>
                  </motion.div>
                </div>

                {/* Chart Visualization */}
                <div className="flex items-end justify-between gap-4 h-40 px-2 border-b border-gray-100 pb-6 mb-5">
                  {[
                    { label: "Harassment", val: 30, color: COLORS.darkTeal, opacity: 0.3 },
                    { label: "Behavior", val: 85, color: COLORS.orange, opacity: 1, highlight: true },
                    { label: "Wages", val: 45, color: COLORS.darkTeal, opacity: 0.3 },
                    { label: "Safety", val: 20, color: COLORS.darkTeal, opacity: 0.3 },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 flex-1 h-full justify-end">
                      {item.highlight && (
                        <motion.div
                          initial={{ opacity: 0, y: 5, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 0.8, type: "spring" }}
                          className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md font-bold shadow-lg"
                        >
                          Recurring
                        </motion.div>
                      )}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${item.val}%` }}
                        transition={{
                          delay: 0.5 + i * 0.1,
                          duration: 1,
                          type: "spring",
                          stiffness: 100,
                        }}
                        className="w-full rounded-t-lg relative overflow-hidden"
                        style={{
                          backgroundColor: item.color,
                          opacity: item.opacity,
                          boxShadow: item.highlight ? `0 -5px 20px -5px ${item.color}60` : "none",
                        }}
                      >
                        {item.highlight && (
                          <motion.div
                            className="absolute inset-0"
                            style={{
                              background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)",
                            }}
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                            }}
                          />
                        )}
                      </motion.div>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer Action */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: COLORS.bg }}
                  >
                    <FileCheck size={18} style={{ color: COLORS.darkTeal }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 font-medium leading-relaxed">
                      Factory advised to conduct sensitization training on{" "}
                      <span className="font-bold" style={{ color: COLORS.darkTeal }}>
                        Behavioral Conduct
                      </span>
                      .
                    </p>
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                      className="mt-2 flex items-center gap-2"
                    >
                      <Sparkles size={14} style={{ color: COLORS.green }} />
                      <span className="text-xs font-medium text-gray-500">
                        Long-term risk prevention
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Context Tag */}
      <motion.div
        className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(255, 255, 255, 0.3)",
        }}
        animate={{
          boxShadow: showInsightsPhase
            ? `0 10px 30px -10px ${COLORS.green}40`
            : `0 10px 30px -10px ${COLORS.orange}40`,
        }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          animate={{
            rotate: showInsightsPhase ? 360 : 0,
          }}
          transition={{ duration: 0.6 }}
        >
          <Activity
            size={16}
            style={{ color: showInsightsPhase ? COLORS.green : COLORS.orange }}
          />
        </motion.div>
        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: COLORS.charcoal }}
        >
          {showInsightsPhase ? "RISK PREVENTION" : "CASE RESOLUTION"}
        </span>
      </motion.div>

    </div>
  )
}