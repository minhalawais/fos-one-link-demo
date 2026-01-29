"use client"

import { motion } from "framer-motion"
import { Clock, AlertTriangle, CheckCircle, Timer } from "lucide-react"

interface SceneProps {
  isActive: boolean
  progress: number
  sceneProgress: number
}

const appleEase = [0.4, 0, 0.2, 1]

const resolutionData = [
  { time: "Within same day", count: 21, color: "#60BA81" },
  { time: "Within 3 days", count: 2, color: "#77E6B4" },
  { time: "Within 10 days", count: 1, color: "#F5A83C" },
  { time: "More than 10 days", count: 0, color: "#FF5353" },
]

export function SceneTimeline({ isActive, progress, sceneProgress }: SceneProps) {
  const highlightOverdue = progress >= 59.4

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-[#F5F5F7] via-white to-[#F5F5F7] overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-[#60BA81]/6 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
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
            <span className="bg-gradient-to-r from-[#284952] to-[#60BA81] bg-clip-text text-transparent">
              Timeline Monitoring
            </span>
          </h2>
          <p className="text-[#767676] text-lg">Track investigation times and ensure timely resolution</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: appleEase }}
            className="bg-white/90 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl shadow-[#284952]/10 border border-[#DEE2E6]"
          >
            <h3 className="text-[#284952] font-semibold text-lg mb-4 flex items-center gap-2">
              <Timer className="w-5 h-5 text-[#60BA81]" />
              Resolution Time Per Complaint
            </h3>

            <div className="flex bg-[#60BA81] rounded-t-xl p-3">
              <span className="flex-1 text-white font-semibold text-sm">TIME TAKEN</span>
              <span className="w-32 text-white font-semibold text-sm text-center">NO OF COMPLAINTS</span>
            </div>

            {resolutionData.map((item, i) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, x: -25 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  backgroundColor:
                    highlightOverdue && item.time === "More than 10 days" ? "rgba(255, 83, 83, 0.08)" : "transparent",
                }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: appleEase }}
                className="flex items-center p-4 border-b border-[#DEE2E6]/50 last:border-b-0"
              >
                <span className="flex-1 text-[#17161A] font-medium">{item.time}</span>
                <motion.span
                  className="w-32 text-center font-bold text-lg"
                  style={{ color: item.color }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1, type: "spring", stiffness: 400, damping: 25 }}
                >
                  {item.count}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: appleEase }}
              className="bg-white/90 backdrop-blur-2xl rounded-2xl p-6 shadow-xl shadow-[#284952]/10 border border-[#DEE2E6]"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#60BA81]/10 rounded-2xl flex items-center justify-center">
                  <Clock className="w-8 h-8 text-[#60BA81]" />
                </div>
                <div>
                  <p className="text-[#767676] text-sm">Avg. Resolution Time</p>
                  <motion.p
                    className="text-[#17161A] text-3xl font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    1 day 10 hrs
                  </motion.p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: highlightOverdue ? 1.02 : 1,
              }}
              transition={{ delay: 0.5, duration: 0.7, ease: appleEase }}
              className={`rounded-2xl p-6 shadow-xl transition-all duration-700 border ${
                highlightOverdue
                  ? "bg-[#F5A83C] text-white ring-2 ring-[#F5A83C]/30 border-[#F5A83C]"
                  : "bg-white/90 text-[#17161A] shadow-[#284952]/10 border-[#DEE2E6]"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    highlightOverdue ? "bg-white/20" : "bg-[#F5A83C]/10"
                  }`}
                >
                  <AlertTriangle className={`w-8 h-8 ${highlightOverdue ? "text-white" : "text-[#F5A83C]"}`} />
                </div>
                <div>
                  <p className={`text-sm ${highlightOverdue ? "text-white/80" : "text-[#767676]"}`}>Overdue Cases</p>
                  <p className="text-3xl font-bold">3</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease: appleEase }}
              className="bg-white/90 backdrop-blur-2xl rounded-2xl p-6 shadow-xl shadow-[#284952]/10 border border-[#DEE2E6]"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#60BA81]/10 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-[#60BA81]" />
                </div>
                <div>
                  <p className="text-[#767676] text-sm">On-Time Completion</p>
                  <p className="text-[#60BA81] text-3xl font-bold">87.5%</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
