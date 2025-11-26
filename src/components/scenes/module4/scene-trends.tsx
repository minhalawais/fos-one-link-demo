"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Calendar, TrendingUp, Download, FileBarChart } from "lucide-react"

// --- CONSTANTS ---
const COLORS = {
  deepTeal: "#284952",
  freshGreen: "#60BA81",
  warmOrange: "#F5A83C",
  charcoal: "#17161A",
  white: "#FFFFFF",
  bg: "#F5F5F7",
  grid: "#E5E7EB",
  text: "#9CA3AF"
}

// Data approximated from screenshot
const TREND_DATA = [
  { label: "Oct 28", value: 0 },
  { label: "Nov 01", value: 0.5 },
  { label: "Nov 05", value: 1.0 },
  { label: "Nov 08", value: 0 },
  { label: "Nov 10", value: 1.0 },
  { label: "Nov 12", value: 2.0 },
  { label: "Nov 14", value: 1.5 },
  { label: "Nov 16", value: 3.0 },
  { label: "Nov 17", value: 5.0 }, // Peak
  { label: "Nov 18", value: 4.0 },
  { label: "Nov 19", value: 3.0 },
  { label: "Nov 20", value: 2.5 },
  { label: "Nov 22", value: 2.0 },
  { label: "Nov 24", value: 1.0 },
  { label: "Nov 26", value: 0.5 },
]

// --- RESPONSIVE WRAPPER ---
const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return
      const parent = containerRef.current.parentElement
      if (!parent) return
      const { width, height } = parent.getBoundingClientRect()
      const scaleX = width / 1280
      const scaleY = height / 720
      setScale(Math.min(scaleX, scaleY) * 0.95)
    }
    handleResize()
    const observer = new ResizeObserver(handleResize)
    if (containerRef.current?.parentElement) {
      observer.observe(containerRef.current.parentElement)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden bg-[#F5F5F7]">
      <div 
        style={{ width: 1280, height: 720, transform: `scale(${scale})`, transformOrigin: "center center" }} 
        className="shrink-0 flex items-center justify-center"
      >
        {children}
      </div>
    </div>
  )
}

// --- CUSTOM LINE CHART ---
const TrendsChart = ({ data, show }: { data: typeof TREND_DATA, show: boolean }) => {
  const width = 800
  const height = 300
  const padding = 40
  const maxValue = 5

  // Calculate Points
  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2)
    const y = height - padding - (d.value / maxValue) * (height - padding * 2)
    return `${x},${y}`
  }).join(" ")

  // Area Path (closed at bottom)
  const areaPath = `${points} ${width - padding},${height - padding} ${padding},${height - padding}`

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg width={width} height={height} className="overflow-visible">
        {/* Grid Lines */}
        {[0, 1, 2, 3, 4, 5].map((val) => {
          const y = height - padding - (val / maxValue) * (height - padding * 2)
          return (
            <g key={val}>
              <line x1={padding} y1={y} x2={width - padding} y2={y} stroke={COLORS.grid} strokeWidth="1" strokeDasharray={val === 0 ? "" : "4 4"} />
              <text x={padding - 10} y={y + 4} textAnchor="end" fontSize="10" fill={COLORS.text}>{val}</text>
            </g>
          )
        })}

        {/* Area Fill */}
        <motion.path
          d={`M ${areaPath} Z`}
          fill="url(#gradient)"
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.freshGreen} stopOpacity="0.2" />
            <stop offset="100%" stopColor={COLORS.freshGreen} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Line Path */}
        <motion.path
          d={`M ${points}`}
          fill="none"
          stroke={COLORS.deepTeal}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={show ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Data Points (Dots) */}
        {data.map((d, i) => {
          const x = padding + (i / (data.length - 1)) * (width - padding * 2)
          const y = height - padding - (d.value / maxValue) * (height - padding * 2)
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill={COLORS.white}
              stroke={COLORS.deepTeal}
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={show ? { scale: 1 } : {}}
              transition={{ delay: 1 + (i * 0.05), type: "spring" }}
            />
          )
        })}

        {/* X-Axis Labels (Selective) */}
        {data.map((d, i) => {
           if (i % 2 !== 0) return null // Skip every other label to match screenshot
           const x = padding + (i / (data.length - 1)) * (width - padding * 2)
           return (
             <text key={i} x={x} y={height - 10} textAnchor="middle" fontSize="10" fill={COLORS.text}>{d.label}</text>
           )
        })}
      </svg>
    </div>
  )
}

interface SceneProps {
  isActive: boolean
  sceneProgress: number
}

export const SceneTrends = ({ isActive, sceneProgress }: SceneProps) => {
  // Sync Logic (Scene duration ~14.6s: 75.68 to 90.28)
  // 0.0 - 0.35: "Analyze trends..." (Chart draws)
  // 0.35 - 1.00: "Exportable..." (Export UI appears)

  const showChart = isActive
  const showExport = sceneProgress > 0.35

  return (
    <ResponsiveContainer>
      <div className="w-full h-full flex flex-col px-16 py-12 font-sans">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex justify-between items-end"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="text-[#F5A83C]" size={24} />
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#767676]">Strategic Analysis</h2>
            </div>
            <h1 className="text-4xl font-bold" style={{ color: COLORS.deepTeal }}>Complaint Trends Over Time</h1>
          </div>
          
          {/* Export Button (Animated) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={showExport ? { opacity: 1, scale: 1 } : {}}
            whileHover={{ scale: 1.05 }}
            className="bg-white border border-[#DEE2E6] px-6 py-3 rounded-xl shadow-sm flex items-center gap-3 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center">
               <Download size={16} color={COLORS.deepTeal} />
            </div>
            <div className="flex flex-col">
                <span className="text-xs font-bold text-[#284952] uppercase">Export Report</span>
                <span className="text-[10px] text-[#767676]">PDF / CSV / Excel</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Chart Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 bg-white rounded-[32px] shadow-xl border border-[#DEE2E6]/60 p-8 flex flex-col relative overflow-hidden"
        >
           {/* Chart Header inside Card */}
           <div className="flex justify-between items-center mb-6 px-4">
              <span className="font-semibold text-[#17161A]">Complaint Volume</span>
              <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#F5F5F7] text-xs text-[#767676] font-medium">Weekly</span>
                  <span className="px-3 py-1 rounded-full bg-[#284952] text-xs text-white font-medium">Monthly</span>
                  <span className="px-3 py-1 rounded-full bg-[#F5F5F7] text-xs text-[#767676] font-medium">Yearly</span>
              </div>
           </div>

           {/* The Chart */}
           <div className="flex-1">
              <TrendsChart data={TREND_DATA} show={showChart} />
           </div>

           {/* Legend */}
           <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#284952]" />
                  <span className="text-xs text-[#767676]">Total Complaints</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#60BA81]" />
                  <span className="text-xs text-[#767676]">Resolved</span>
              </div>
           </div>
        </motion.div>

        {/* Compliance Badges (Fade in late) */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={showExport ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mt-8 flex justify-center gap-8"
        >
            {["HRDD Compliant", "ESG Ready", "CSDD Aligned"].map((text, i) => (
                <div key={i} className="flex items-center gap-2 opacity-60">
                    <FileBarChart size={16} color={COLORS.freshGreen} />
                    <span className="text-xs font-bold text-[#284952] uppercase tracking-wide">{text}</span>
                </div>
            ))}
        </motion.div>

      </div>
    </ResponsiveContainer>
  )
}