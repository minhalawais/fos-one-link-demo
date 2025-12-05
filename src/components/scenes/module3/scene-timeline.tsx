"use client"

import { motion } from "framer-motion"
import { Clock, CalendarCheck, Hourglass } from "lucide-react"

interface SceneTimelineProps {
  isActive: boolean
}

export function SceneTimeline({ isActive }: SceneTimelineProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      {/* Rotating Clock Ring Background */}
      <motion.div
        className="absolute w-[500px] h-[500px] border border-white/5 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/20 rounded-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/20 rounded-full" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white/20 rounded-full" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white/20 rounded-full" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Central Timer Graphic */}
        <div className="relative">
          {/* Spinning Clock Hand */}
          <div className="relative w-32 h-32 bg-[#284952] rounded-full flex items-center justify-center shadow-2xl border border-white/10">
            <Clock size={48} className="text-[#60BA81]" />

            {/* Hand */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-[#60BA81] to-transparent rounded-full origin-bottom" />
            </motion.div>
          </div>

          {/* Ping Effect */}
          <motion.div
            className="absolute inset-0 rounded-full border border-[#60BA81]"
            animate={{ scale: [1, 1.5], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>

        {/* SLA Progress Bar */}
        <div className="w-[400px] space-y-4">
          <div className="flex items-center justify-between text-sm font-medium">
            <span className="text-white">SLA Timer Tracking</span>
            <motion.span
              className="text-[#60BA81]"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              Active
            </motion.span>
          </div>

          <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#284952] to-[#60BA81]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 4, ease: "easeInOut" }}
            />

            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </div>

          <div className="flex justify-between text-xs text-white/40">
            <div className="flex items-center gap-1">
              <Hourglass size={12} />
              <span>Started: 09:00 AM</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarCheck size={12} />
              <span>Target: 48 Hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
