"use client"

import { motion } from "framer-motion"
import { FileSearch, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react"

interface SceneProps {
  isActive: boolean
  progress: number
  sceneProgress: number
}

const appleEase = [0.4, 0, 0.2, 1]

export function SceneMetrics({ isActive, progress, sceneProgress }: SceneProps) {
  const showRCA = progress >= 43.4
  const showCAPA = progress >= 46
  const showQuality = progress >= 49.16

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-[#F5F5F7] via-white to-[#F5F5F7] overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/3 -left-32 w-[600px] h-[600px] bg-[#284952]/6 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      <motion.div className="relative z-10 w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: appleEase }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold text-[#17161A] mb-3">
            <span className="bg-gradient-to-r from-[#284952] via-[#60BA81] to-[#F5A83C] bg-clip-text text-transparent">
              RCA & CAPA Performance
            </span>
          </h2>
          <p className="text-[#767676] text-lg">Track resolution quality and recurring patterns</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: showRCA && !showCAPA ? 1.02 : 1,
            }}
            transition={{ delay: 0.3, duration: 0.8, ease: appleEase }}
            className={`bg-white/90 backdrop-blur-2xl rounded-3xl p-6 shadow-xl shadow-[#284952]/10 transition-all duration-700 border ${
              showRCA && !showCAPA ? "ring-2 ring-[#60BA81] border-[#60BA81]" : "border-[#DEE2E6]"
            }`}
          >
            <div className="w-14 h-14 bg-[#60BA81]/10 rounded-2xl flex items-center justify-center mb-4">
              <FileSearch className="w-7 h-7 text-[#60BA81]" />
            </div>
            <h3 className="text-[#17161A] font-bold text-xl mb-2">Root Cause Analysis</h3>
            <p className="text-[#767676] text-sm mb-4">Investigation depth and accuracy</p>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#767676]">Completed RCAs</span>
                <motion.span
                  className="text-[#60BA81] font-bold text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  24
                </motion.span>
              </div>
              <div className="h-2 bg-[#F5F5F7] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#60BA81] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ delay: 0.6, duration: 1.2, ease: appleEase }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: showCAPA && !showQuality ? 1.02 : 1,
            }}
            transition={{ delay: 0.4, duration: 0.8, ease: appleEase }}
            className={`bg-white/90 backdrop-blur-2xl rounded-3xl p-6 shadow-xl shadow-[#284952]/10 transition-all duration-700 border ${
              showCAPA && !showQuality ? "ring-2 ring-[#F5A83C] border-[#F5A83C]" : "border-[#DEE2E6]"
            }`}
          >
            <div className="w-14 h-14 bg-[#F5A83C]/10 rounded-2xl flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7 text-[#F5A83C]" />
            </div>
            <h3 className="text-[#17161A] font-bold text-xl mb-2">CAPA Tracking</h3>
            <p className="text-[#767676] text-sm mb-4">Corrective & preventive actions</p>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#767676]">Actions Completed</span>
                <motion.span
                  className="text-[#F5A83C] font-bold text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  18
                </motion.span>
              </div>
              <div className="h-2 bg-[#F5F5F7] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#F5A83C] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "72%" }}
                  transition={{ delay: 0.7, duration: 1.2, ease: appleEase }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: showQuality ? 1.02 : 1,
            }}
            transition={{ delay: 0.5, duration: 0.8, ease: appleEase }}
            className={`bg-white/90 backdrop-blur-2xl rounded-3xl p-6 shadow-xl shadow-[#284952]/10 transition-all duration-700 border ${
              showQuality ? "ring-2 ring-[#284952] border-[#284952]" : "border-[#DEE2E6]"
            }`}
          >
            <div className="w-14 h-14 bg-[#284952]/10 rounded-2xl flex items-center justify-center mb-4">
              <TrendingUp className="w-7 h-7 text-[#284952]" />
            </div>
            <h3 className="text-[#17161A] font-bold text-xl mb-2">Investigation Quality</h3>
            <p className="text-[#767676] text-sm mb-4">Effectiveness & recurring issues</p>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#767676]">Quality Score</span>
                <motion.span
                  className="text-[#284952] font-bold text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  92%
                </motion.span>
              </div>
              <div className="h-2 bg-[#F5F5F7] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#284952] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "92%" }}
                  transition={{ delay: 0.8, duration: 1.2, ease: appleEase }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: showQuality ? 1 : 0, y: showQuality ? 0 : 25 }}
          transition={{ delay: 1.2, duration: 0.7, ease: appleEase }}
          className="mt-6 bg-white/90 backdrop-blur-2xl rounded-2xl p-5 flex items-center gap-4 shadow-lg shadow-[#284952]/10 border border-[#DEE2E6]"
        >
          <div className="w-12 h-12 bg-[#F5A83C]/10 rounded-xl flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-[#F5A83C]" />
          </div>
          <div>
            <p className="text-[#17161A] font-semibold">Recurring Pattern Detected</p>
            <p className="text-[#767676] text-sm">3 similar complaints in Workplace Discipline category this month</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
