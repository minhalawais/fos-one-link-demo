"use client"

import { motion } from "framer-motion"
import { TrendingUp, Calendar, BarChart2 } from "lucide-react"

interface SceneProps {
  isActive: boolean
  progress: number
  sceneProgress: number
}

const appleEase = [0.4, 0, 0.2, 1]

const trendData = [
  { month: "Oct 28", value: 0 },
  { month: "Nov 01", value: 0.5 },
  { month: "Nov 05", value: 1 },
  { month: "Nov 08", value: 0 },
  { month: "Nov 10", value: 1 },
  { month: "Nov 12", value: 2 },
  { month: "Nov 14", value: 1.5 },
  { month: "Nov 16", value: 3 },
  { month: "Nov 17", value: 5 },
  { month: "Nov 18", value: 4 },
  { month: "Nov 19", value: 3 },
  { month: "Nov 20", value: 2.5 },
  { month: "Nov 22", value: 2 },
  { month: "Nov 24", value: 1 },
  { month: "Nov 26", value: 0.5 },
]

const maxValue = Math.max(...trendData.map((d) => d.value))

export function SceneTrends({ isActive, progress, sceneProgress }: SceneProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-[#F5F5F7] via-white to-[#F5F5F7] overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#284952]/6 rounded-full blur-[120px]"
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
            <span className="bg-gradient-to-r from-[#284952] to-[#60BA81] bg-clip-text text-transparent">
              Trend Analysis
            </span>
          </h2>
          <p className="text-[#767676] text-lg">Strategic insights over weeks, months, and years</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: appleEase }}
          className="bg-white/90 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl shadow-[#284952]/10 border border-[#DEE2E6]"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[#284952] font-semibold text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#60BA81]" />
              Complaints by Days
            </h3>

            <div className="flex gap-2">
              {["Week", "Month", "Year"].map((period, i) => (
                <motion.button
                  key={period}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: appleEase }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    period === "Month"
                      ? "bg-[#60BA81] text-white shadow-lg shadow-[#60BA81]/20"
                      : "bg-[#F5F5F7] text-[#767676] hover:bg-[#EAEAEC]"
                  }`}
                >
                  {period}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="relative h-64">
            <div className="absolute left-0 top-0 bottom-8 w-8 flex flex-col justify-between text-right pr-2">
              {[5, 4, 3, 2, 1, 0].map((v) => (
                <span key={v} className="text-xs text-[#767676]">
                  {v}
                </span>
              ))}
            </div>

            <div className="ml-10 h-full relative">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="absolute w-full border-t border-[#DEE2E6]/50"
                  style={{ top: `${(i / 5) * 85}%` }}
                />
              ))}

              <svg className="w-full h-[85%] overflow-visible">
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60BA81" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#60BA81" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <motion.path
                  d={`
                    M 0 ${100 - (trendData[0].value / maxValue) * 100}%
                    ${trendData
                      .map((d, i) => `L ${(i / (trendData.length - 1)) * 100}% ${100 - (d.value / maxValue) * 100}%`)
                      .join(" ")}
                    L 100% 100%
                    L 0 100%
                    Z
                  `}
                  fill="url(#areaGradient)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1.2, ease: appleEase }}
                />

                <motion.path
                  d={`
                    M 0 ${100 - (trendData[0].value / maxValue) * 100}%
                    ${trendData
                      .map((d, i) => `L ${(i / (trendData.length - 1)) * 100}% ${100 - (d.value / maxValue) * 100}%`)
                      .join(" ")}
                  `}
                  fill="none"
                  stroke="#60BA81"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 2.5, ease: appleEase }}
                />

                {trendData.map((d, i) => (
                  <motion.circle
                    key={i}
                    cx={`${(i / (trendData.length - 1)) * 100}%`}
                    cy={`${100 - (d.value / maxValue) * 100}%`}
                    r="4"
                    fill="white"
                    stroke="#60BA81"
                    strokeWidth="2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.06, duration: 0.4, ease: appleEase }}
                  />
                ))}
              </svg>

              <div className="flex justify-between mt-2 text-xs text-[#767676]">
                {trendData
                  .filter((_, i) => i % 3 === 0)
                  .map((d, i) => (
                    <span key={i}>{d.month}</span>
                  ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-3 h-3 bg-[#60BA81] rounded-full" />
            <span className="text-sm text-[#767676]">Complaint Count</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { icon: Calendar, label: "This Week", value: "+12%", trend: "up" },
            { icon: BarChart2, label: "This Month", value: "+8%", trend: "up" },
            { icon: TrendingUp, label: "This Year", value: "-15%", trend: "down" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.12, duration: 0.6, ease: appleEase }}
              className="bg-white/90 backdrop-blur-2xl rounded-2xl p-5 shadow-lg shadow-[#284952]/10 flex items-center gap-4 border border-[#DEE2E6]"
            >
              <div className="w-12 h-12 bg-[#60BA81]/10 rounded-xl flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-[#60BA81]" />
              </div>
              <div>
                <p className="text-[#767676] text-sm">{stat.label}</p>
                <p className={`text-xl font-bold ${stat.trend === "down" ? "text-[#60BA81]" : "text-[#F5A83C]"}`}>
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
