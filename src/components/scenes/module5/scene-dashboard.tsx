"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect, useMemo } from "react"
import {
  Building2,
  Search,
  LogOut,
  Eye,
  FileText,
  Download,
  Clock,
  AlertCircle,
  MessageSquare,
  Users,
  Smile,
  ShieldCheck,
  CheckCircle2,
  HeartPulse,
  Scale,
  UserX,
  AlertTriangle,
  Briefcase,
  Menu,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Share2,
  FileSpreadsheet,
  MousePointer2,
  Lock,
  RefreshCw,
  BarChart2,
} from "lucide-react"

import { SceneAI } from "./scene-ai.tsx"
import { SceneTimeline } from "./scene-timeline.tsx"

const IOS_EASE = [0.32, 0.72, 0, 1]

const COLORS = {
  deepTeal: "#284952",
  freshGreen: "#60BA81",
  warmOrange: "#F5A83C",
  charcoal: "#17161A",
  white: "#FFFFFF",
  bg: "#F5F5F7",
  border: "#DEE2E6",
  chartRed: "#FF5353",
  chartYellow: "#FFD221",
  chartLightGreen: "#77E6B4",
  chartGreen: "#21D683",
}

const FACTORS_HAPPINESS = [
  { label: "Avg Resolution Time", icon: Clock },
  { label: "Avg Bounced Rate", icon: AlertCircle },
  { label: "Avg Response Time", icon: MessageSquare },
  { label: "Complaints : Employees", icon: Users },
]

const FACTORS_SAFETY = [
  { label: "Avg Resolution Time", icon: Clock },
  { label: "Avg Response Time", icon: MessageSquare },
  { label: "Avg Bounced Rate", icon: AlertCircle },
  { label: "Complaints : Employees", icon: Users },
]

interface SceneDashboardProps {
  isActive: boolean
  progress: number
}

// --- MANAGEMENT ROLE DATA (DYNAMIC) ---
const ROLE_DATA = {
  CEO: {
    title: "COMPANY_A",
    subtitle: "CEO OF COMPANY A",
    stats: { total: 482, anonymous: 64, completed: 395, inProcess: 87 },
    sites: [
      { name: "ILO", hasLogo: true },
      { name: "CENTAURUS", hasLogo: true, selected: true },
      { name: "BAHRIA-4", hasLogo: true },
      { name: "BAHRIA-7", hasLogo: true },
      { name: "F-10 MARKAZ", hasLogo: true },
      { name: "GIGA MALL", hasLogo: true },
    ]
  },
  REGIONAL: {
    title: "LAHORE REGION",
    subtitle: "REGIONAL MANAGER (LAHORE)",
    stats: { total: 142, anonymous: 18, completed: 112, inProcess: 30 },
    sites: [
      { name: "NORTH UNIT", hasLogo: true },
      { name: "SOUTH UNIT", hasLogo: true, selected: true },
      { name: "EAST UNIT", hasLogo: true },
      { name: "WEST UNIT", hasLogo: true },
      { name: "W/HOUSE 1", hasLogo: true },
      { name: "W/HOUSE 2", hasLogo: true },
    ]
  },
  SITE: {
    title: "CENTAURUS SITE",
    subtitle: "SITE COMPLIANCE TEAM",
    stats: { total: 37, anonymous: 12, completed: 25, inProcess: 12 },
    sites: [
      { name: "FLOOR 1", hasLogo: true },
      { name: "FLOOR 2", hasLogo: true, selected: true },
      { name: "FLOOR 3", hasLogo: true },
      { name: "ASSEMBLY", hasLogo: true },
      { name: "PACKING", hasLogo: true },
      { name: "DRYING", hasLogo: true },
    ]
  },
  UNIT: {
    title: "PRODUCTION UNIT",
    subtitle: "UNIT SUPERVISOR (BAY 3)",
    stats: { total: 12, anonymous: 4, completed: 8, inProcess: 4 },
    sites: [
      { name: "BAY 1", hasLogo: true },
      { name: "BAY 2", hasLogo: true },
      { name: "BAY 3", hasLogo: true, selected: true },
      { name: "BAY 4", hasLogo: true },
      { name: "BAY 5", hasLogo: true },
      { name: "BAY 6", hasLogo: true },
    ]
  }
}

const FILTER_TRANSITION_DATA = {
  SITES: [
    { name: "ALL SITES", selected: true },
    { name: "FOS (Unit 1)", selected: false },
    { name: "FOS (Unit 2)", selected: false },
    { name: "FOS (Unit 3)", selected: false },
    { name: "FOS (Unit 4)", selected: false },
    { name: "FOS (Unit 5)", selected: false },
    { name: "FOS (Unit 7)", selected: false },
    { name: "FOS (Unit 8)", selected: false },
  ],
  DEPARTMENTS: [
    { name: "HUMAN RES.", hasLogo: false },
    { name: "PRODUCTION", hasLogo: false, selected: true },
    { name: "I.T. DEPT", hasLogo: false },
    { name: "MAINTENANCE", hasLogo: false },
    { name: "LOGISTICS", hasLogo: false },
    { name: "ENG. TEAM", hasLogo: false },
  ],
  SUPPLIERS: [
    { name: "SUPPLIER A", hasLogo: false },
    { name: "GLOB. FABRIC", hasLogo: false, selected: true },
    { name: "TEXTILE PRO", hasLogo: false },
    { name: "ECO YARN", hasLogo: false },
    { name: "PRIME LABEL", hasLogo: false },
    { name: "FAST LOG.", hasLogo: false },
  ],
  BRANCHES: [
    { name: "LAHORE H.Q.", hasLogo: false },
    { name: "KARACHI B.", hasLogo: false, selected: true },
    { name: "ISL. PLANT", hasLogo: false },
    { name: "MULTAN CTR.", hasLogo: false },
    { name: "PESHAWAR U.", hasLogo: false },
    { name: "QUETTA DEP.", hasLogo: false },
  ]
}

const COMPLAINT_CATEGORIES = [
  { name: "Workplace Health, Safety and Environment", percentage: 0 },
  { name: "Freedom of Association", percentage: 0 },
  { name: "Child Labor", percentage: 0 },
  { name: "Wages & Benefits", percentage: 42 },
  { name: "Working Hours", percentage: 3 },
  { name: "Forced Labor", percentage: 0 },
  { name: "Discrimination", percentage: 0 },
  { name: "Unfair Employment", percentage: 0 },
  { name: "Ethical Business", percentage: 0 },
  { name: "Harassment", percentage: 0 },
  { name: "Workplace Discipline", percentage: 56 },
]

const GENDER_DATA = [
  { category: "Workplace Hea...", male: 0, female: 0 },
  { category: "Freedom of Asso...", male: 0, female: 0 },
  { category: "Child Labor", male: 0, female: 0 },
  { category: "Wages & Benefi...", male: 16, female: 0 },
  { category: "Working Hours", male: 1, female: 0 },
  { category: "Forced Labor", male: 0, female: 0 },
  { category: "Discrimination", male: 0, female: 0 },
  { category: "Unfair Employme...", male: 0, female: 0 },
  { category: "Ethical Business...", male: 0, female: 0 },
  { category: "Harassment", male: 0, female: 0 },
  { category: "Discipline", male: 20, female: 0 },
]

// --- BREAKDOWN SPECIFIC CONSTANTS ---
const BREAKDOWN_CATEGORIES = [
  { name: "Workplace Health, Safety and Environment", value: 3, id: "health", icon: HeartPulse },
  { name: "Freedom of Association", value: 0, id: "freedom", icon: Building2 },
  { name: "Child Labor", value: 0, id: "child", icon: UserX },
  { name: "Wages & Benefits", value: 34, id: "wages", icon: Briefcase },
  { name: "Working Hours", value: 9, id: "hours", icon: Clock },
  { name: "Forced Labor", value: 0, id: "forced", icon: AlertTriangle },
  { name: "Discrimination", value: 0, id: "discrimination", icon: Scale },
  { name: "Unfair Employment", value: 9, id: "unfair", icon: UserX },
  { name: "Ethical Business", value: 3, id: "ethical", icon: ShieldCheck },
  { name: "Harassment", value: 0, id: "harassment", icon: AlertCircle },
  { name: "Workplace Discipline", value: 41, id: "discipline", icon: FileText },
]

const BREAKDOWN_FEEDBACKS = [
  { id: 1, text: "Request for Transfer to Mardan Branch due to family residence shift.", date: "Jan 28, 2026" },
  { id: 2, text: "Suggestion for introducing monthly best employee awards and recognition.", date: "Jan 28, 2026" },
  { id: 3, text: "Loan facility request for urgent domestic financial requirements.", date: "Jan 28, 2026" },
  { id: 4, text: "New uniform replacement request for the night shift team members.", date: "Jan 27, 2026" },
  { id: 5, text: "Safety Concern: Periodic inspection of electrical wiring in Bay 3.", date: "Jan 26, 2026" },
  { id: 6, text: "Suggestion for more water coolers near cafeteria and warehouse.", date: "Jan 25, 2026" },
]

const BREAKDOWN_GENDER_DATA = [
  { name: "Workplace Health, Safety and Environment", m: 19, f: 1 },
  { name: "Freedom of Association", m: 0, f: 0 },
  { name: "Child Labor", m: 0, f: 0 },
  { name: "Wages & Benefits", m: 203, f: 3 },
  { name: "Working Hours", m: 46, f: 2 },
  { name: "Forced Labor", m: 1, f: 0 },
  { name: "Discrimination", m: 2, f: 0 },
  { name: "Unfair Employment", m: 11, f: 0 },
  { name: "Ethical Business", m: 3, f: 0 },
  { name: "Harassment", m: 9, f: 2 },
  { name: "Workplace Discipline", m: 173, f: 2 },
]

const RESOLUTION_TIME = [
  { label: "Within same day", count: 21 },
  { label: "Within 3 days", count: 3 },
  { label: "Within 10 days", count: 1 },
  { label: "More than 10 days", count: 0 },
]

const SURVEY_REPORTS = [
  { title: "Exit Interview Report June-25", date: "Jul 10, 2025", hasView: true },
  { title: "Employee Well Being Survey (CHZ Call Centre)", date: "Jun 30, 2025", hasView: true, hasPdf: true, hasCsv: true },
  { title: "Quaterly Employee Due Diligence Survey & Assessment Report May-25", date: "Jun 19, 2025", hasView: true },
  { title: "Exit Interview Report May-25", date: "Jun 4, 2025", hasView: true },
]

const FEEDBACK_ITEMS = [
  { title: "Poor Fitting Company Jackets", date: "Nov 13, 2025" },
  { title: "Shift Change Request Denied Unfairly", date: "Nov 12, 2025" },
  { title: "Delayed Clearance Payment Issue", date: "Nov 10, 2025" },
]

const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });

// --- LIGHTWEIGHT STATIC GAUGE (Fallback for Transitions) ---
const StaticGauge = ({ value, color }: { value: number; color: string }) => {
  return (
    <div className="relative w-[160px] h-[160px] flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="80" fill="none" stroke="#F0F2F5" strokeWidth="20" strokeLinecap="round" />
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke={color}
          strokeWidth="20"
          strokeLinecap="round"
          strokeDasharray="502"
          strokeDashoffset={502 - (502 * value) / 100}
          transform="rotate(-90 100 100)"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold text-[#284952]">{value}</span>
        <span className="text-[10px] text-gray-400 font-bold uppercase">% Score</span>
      </div>
    </div>
  )
}

// --- CATEGORY BREAKDOWN COMPONENTS ---
const GenderStatBox = ({ type, value, percentage, color }: any) => (
  <div style={{ borderColor: `${color}40` }} className="border rounded-lg px-4 py-1 flex flex-col items-center min-w-[100px] bg-white shadow-sm">
    <div style={{ color }} className="flex items-center gap-1.5 mb-0.5">
      <Users size={8} strokeWidth={3} />
      <span className="text-[7px] font-black uppercase tracking-wider">{type}</span>
    </div>
    <span className="text-lg font-black text-[#284952] leading-none mb-0.5">{value}</span>
    <span className="text-[7px] font-bold text-gray-400">{percentage}</span>
  </div>
)

const GenderBarChart = ({ isActive }: { isActive: boolean }) => {
  const maxValue = 250
  return (
    <div className="flex flex-col">
      <div className="absolute inset-y-0 left-[110px] right-2 flex justify-between pointer-events-none">
        {[0, 50, 100, 150, 200, 250].map(v => (
          <div key={v} className="h-full w-[1px] border-l border-solid border-gray-100/50 relative">
            {v === 0 && <div className="absolute -left-[1px] inset-y-0 w-[1px] bg-gray-200" />}
          </div>
        ))}
      </div>
      <div className="flex-col gap-[3px] py-1 relative z-10 overflow-hidden flex">
        {BREAKDOWN_GENDER_DATA.map((cat, i) => (
          <div key={i} className="flex items-center gap-2 group h-[11px]">
            <div className="w-[100px] text-right shrink-0">
              <span className="text-[7px] font-bold text-[#767676] truncate block leading-none">{cat.name}</span>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-1 max-h-[5px]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isActive ? { width: `${(cat.m / maxValue) * 100}%` } : {}}
                  transition={{ duration: 1, ease: "circOut", delay: i * 0.05 }}
                  className="h-[4px] bg-[#5F9BFF] rounded-r-[1px] min-w-[1px]"
                />
                <span className="text-[6.5px] font-black text-[#5F9BFF] leading-none">{cat.m}</span>
              </div>
              <div className="flex items-center gap-1 max-h-[5px]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isActive ? { width: `${(cat.f / maxValue) * 100}%` } : {}}
                  transition={{ duration: 1, ease: "circOut", delay: 0.2 + i * 0.05 }}
                  className="h-[4px] bg-[#FF6BB5] rounded-r-[1px] min-w-[1px]"
                />
                <span className="text-[6.5px] font-black text-[#FF6BB5] leading-none">{cat.f}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-0.5 flex flex-col items-center shrink-0 border-t border-gray-100/50 pt-1">
        <div className="w-full flex justify-between pl-[110px] pr-2">
          {[0, 50, 100, 150, 200, 250].map(v => (
            <span key={v} className="text-[7.5px] font-bold text-gray-400 w-4 text-center">{v}</span>
          ))}
        </div>
        <span className="text-[7.5px] font-bold text-[#17161A] mt-0.5 uppercase tracking-tighter">Number of Complaints</span>
      </div>
    </div>
  )
}

const TrendChart = ({ isActive }: { isActive: boolean }) => {
  const data = [0, 2, 1, 0, 2, 2, 1, 0, 0, 2, 2, 0, 0, 0, 0, 4, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const dates = ["01-12", "01-13", "01-14", "01-15", "01-16", "01-17", "01-18", "01-19", "01-20", "01-21", "01-22", "01-23", "01-24", "01-25", "01-26", "01-27", "01-28", "01-29", "01-30", "01-31", "02-01", "02-02", "02-03", "02-04", "02-05", "02-06", "02-07", "02-08", "02-09"]
  const width = 1200
  const height = 180
  const paddingLeft = 40
  const paddingBottom = 40
  const chartWidth = width - paddingLeft
  const chartHeight = height - paddingBottom
  const points = data.length > 0 ? data.map((d, i) => `${paddingLeft + (i / (data.length - 1)) * chartWidth},${chartHeight - (d / 4) * chartHeight}`).join(" ") : ""

  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        <div className="w-8 h-4 border-2 border-[#206E71] bg-[#206E71]/10 rounded-sm" />
        <span className="text-[10px] font-bold text-gray-500">Complaint Count</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4].map(v => (
          <g key={v}>
            <line x1={paddingLeft} y1={chartHeight - (v / 4) * chartHeight} x2={width} y2={chartHeight - (v / 4) * chartHeight} stroke="#F0F2F5" strokeWidth="1" />
            <text x={paddingLeft - 10} y={chartHeight - (v / 4) * chartHeight} textAnchor="end" alignmentBaseline="middle" className="text-[10px] fill-gray-400 font-bold">{v.toFixed(1)}</text>
          </g>
        ))}
        {data.map((_, i) => (
          <line key={i} x1={paddingLeft + (i / (data.length - 1)) * chartWidth} y1={0} x2={paddingLeft + (i / (data.length - 1)) * chartWidth} y2={chartHeight} stroke="#F0F2F5" strokeWidth="1" />
        ))}
        {dates.map((date, i) => (
          <text key={i} x={paddingLeft + (i / (data.length - 1)) * chartWidth} y={chartHeight + 15} textAnchor="end" transform={`rotate(-45, ${paddingLeft + (i / (data.length - 1)) * chartWidth}, ${chartHeight + 15})`} className="text-[10px] fill-gray-400 font-bold">{date}</text>
        ))}
        <polyline points={points} fill="none" stroke="#206E71" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((d, i) => (
          <motion.circle
            key={i} cx={paddingLeft + (i / (data.length - 1)) * chartWidth} cy={chartHeight - (d / 4) * chartHeight} r="4.5" fill="white" stroke="#206E71" strokeWidth="2.5"
            initial={{ scale: 0 }} animate={isActive ? { scale: 1 } : { scale: 0 }} transition={{ delay: i * 0.02 }}
          />
        ))}
        <line x1={paddingLeft} y1={0} x2={paddingLeft} y2={chartHeight} stroke="#E9ECEF" strokeWidth="2" />
        <line x1={paddingLeft} y1={chartHeight} x2={width} y2={chartHeight} stroke="#E9ECEF" strokeWidth="2" />
      </svg>
    </div>
  )
}


const JSChartingCircularColorBar = ({ value, chartId }: { value: number; chartId: string }) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<any>(null)
  const [scriptsLoaded, setScriptsLoaded] = useState(false)

  useEffect(() => {
    let mounted = true
    const loadScripts = async () => {
      try {
        await loadScript("/assets/jscharting.js")
        await loadScript("/assets/types.js")
        await new Promise((resolve) => setTimeout(resolve, 200))
        if (mounted) setScriptsLoaded(true)
      } catch (error) {
        console.error("Failed to load JSCharting scripts:", error)
      }
    }
    loadScripts()
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    if (!scriptsLoaded || !chartRef.current) return
    let mounted = true

    const initChart = async () => {
      // @ts-ignore
      const JSC = window.JSC
      if (!JSC || !mounted) return
      if (chartInstance.current) {
        try { chartInstance.current.dispose() } catch (e) { }
      }

      const minValue = 0
      const maxValue = 100

      try {
        chartInstance.current = JSC.chart(chartRef.current, {
          debug: false,
          width: 140,
          height: 140,
          license: { jscharting: "no-logo-button" },
          legend_visible: false,
          defaultTooltip_enabled: false,
          xAxis_spacingPercentage: 0.4,
          yAxis: [
            {
              id: "ax1",
              defaultTick: { padding: 10, enabled: false },
              customTicks: [0, 25, 50, 75, 100],
              line: { width: 10, breaks: {}, color: "smartPalette:pal1" },
              scale_range: [minValue, maxValue],
            },
            {
              id: "ax2",
              scale_range: [minValue, maxValue],
              defaultTick: { padding: 10, enabled: false },
              customTicks: [minValue, maxValue],
              line: { width: 10, color: "smartPalette:pal2" },
            },
          ],
          defaultSeries: {
            type: "gauge column roundcaps",
            shape: {
              label: { text: "%max", align: "center", verticalAlign: "middle", style_fontSize: 16 },
            },
          },
          series: [
            {
              type: "column roundcaps",
              name: "Temperatures",
              yAxis: "ax1",
              palette: {
                id: "pal1",
                pointValue: "%yValue",
                ranges: [
                  { value: 0, color: "#FF5353" },
                  { value: 25, color: "#FFD221" },
                  { value: 50, color: "#77E6B4" },
                  { value: [75, 100], color: "#21D683" },
                ],
              },
              points: [["x", [0, value]]],
            },
          ],
        })
      } catch (error) {
        console.error("Error initializing JSCharting chart:", error)
      }
    }
    const timer = setTimeout(initChart, 100)
    return () => {
      mounted = false
      clearTimeout(timer)
      if (chartInstance.current) {
        try { chartInstance.current.dispose() } catch (e) { }
      }
    }
  }, [scriptsLoaded, value])

  if (!scriptsLoaded) {
    return (
      <div style={{ width: 160, height: 160 }} className="flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center text-gray-500">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#60BA81] mx-auto mb-2"></div>
          <p className="text-xs">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={chartRef} id={chartId} style={{ width: 130, height: 130 }} className="flex items-center justify-center" />
  )
}

const ScoreCard = ({
  title,
  icon: Icon,
  value,
  factors,
  factorLabel,
  chartId,
  delay = 0,
  showFactors,
  isHighlighted = false,
  iconColor,
  staticMode = false // New Prop for preventing crashes
}: {
  title: string
  icon: React.ElementType
  value: number
  factors: typeof FACTORS_HAPPINESS
  factorLabel: string
  chartId: string
  delay?: number
  showFactors: boolean
  isHighlighted?: boolean
  iconColor: string
  staticMode?: boolean
}) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        boxShadow: isHighlighted
          ? `0 0 0 2px ${iconColor}40, 0 20px 40px -10px ${iconColor}25, 0 0 25px ${iconColor}30`
          : "0 1px 3px rgba(0,0,0,0.08)",
      }}
      transition={{ duration: 0.6, delay, ease: "backOut" }}
      className="bg-white rounded-xl border border-[#DEE2E6]/60 p-2 flex flex-col items-center relative overflow-hidden shadow-sm w-full"
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: `${iconColor}15` }}>
          <Icon size={12} style={{ color: iconColor }} />
        </div>
        <h2 className="text-[9px] font-bold" style={{ color: COLORS.deepTeal }}>
          {title}
        </h2>
      </div>

      <div className="relative flex items-center justify-center" style={{ minHeight: 130 }}>
        {/* Conditional Rendering: Static SVG vs Heavy JSChart */}
        {staticMode ? (
          <StaticGauge value={value} color={iconColor} />
        ) : (
          <JSChartingCircularColorBar value={value} chartId={chartId} />
        )}
      </div>

      {/* Factor Breakdown - shown during NPS focus */}
      <AnimatePresence>
        {showFactors && isHighlighted && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full overflow-hidden"
          >
            <p className="text-[7px] font-bold uppercase tracking-[0.15em] text-[#767676] mb-1.5 text-center mt-1">
              {factorLabel}
            </p>
            {factors.map((factor, i) => (
              <motion.div
                key={factor.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className="flex items-center gap-2 p-1.5 rounded-lg bg-[#F5F5F7] mb-1"
              >
                <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-sm" style={{ color: iconColor }}>
                  <factor.icon size={9} />
                </div>
                <span className="text-[8px] font-semibold text-[#17161A] flex-1">{factor.label}</span>
                <CheckCircle2 size={10} className="text-[#60BA81]" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// --- BROWSER FRAME COMPONENT ---
const BrowserFrame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-0 relative z-10 overflow-x-visible">
      <motion.div
        initial={{ scale: 0.75, opacity: 0, y: 30 }}
        animate={{ scale: 0.85, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
        className="w-[125%] h-[110%] max-w-[2600px] max-h-[1100px] bg-white rounded-2xl shadow-[0_50px_100px_rgba(0,0,0,0.15)] border border-[#DEE2E6] flex flex-col overflow-x-visible overflow-y-clip relative origin-center"
      >
        {/* Browser Top Bar */}
        <div className="h-10 bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6] border-b border-[#DEE2E6] flex items-center px-4 shrink-0 justify-between select-none rounded-t-2xl">
          {/* Traffic Lights */}
          <div className="flex gap-2 w-20">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]" />
            <div className="w-3 h-3 rounded-full bg-[#FEB12F] border border-[#D89724]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29]" />
          </div>

          {/* Address Bar */}
          <div className="flex-1 flex justify-center max-w-2xl px-4">
            <div className="w-full bg-white h-7 rounded-md border border-[#E5E7EB] shadow-sm flex items-center px-3 gap-2">
              <Lock size={10} className="text-[#60BA81]" fill="currentColor" />
              <div className="flex-1 text-[10px] font-medium text-gray-500 flex items-center gap-1">
                <span className="opacity-40">https://</span>
                <span className="text-[#284952] font-semibold">fruitofsustainability.com</span>
                <span className="opacity-100">/login/admin_portal</span>
              </div>
              <RefreshCw size={10} className="text-gray-400" />
            </div>
          </div>

          {/* Search/User Mock */}
          <div className="w-20 flex justify-end gap-3">
            <div className="w-6 h-6 rounded-full bg-[#DEE2E6]/50 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full border border-gray-400" />
            </div>
          </div>
        </div>

        {/* Content Viewport */}
        <div className="flex-1 relative overflow-x-visible overflow-y-clip bg-[#F5F5F7] rounded-b-2xl">
          {children}
          {/* Inner Vignette for depth */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.02)]" />
        </div>
      </motion.div>
    </div>
  )
}

// --- CURSOR COMPONENT FOR INTERACTIVITY DEMO ---
const MetricClickCursor = ({ progress }: { progress: number }) => {
  const isPhase1 = progress >= 114 && progress < 118
  const isPhase2 = progress >= 126 && progress < 130

  if (!isPhase1 && !isPhase2) return null

  let currentX, currentY, opacity, scale, isClicking;

  if (isPhase1) {
    // Phase 1: Dashboard click (114s - 118s)
    opacity = progress < 114.2 ? (progress - 114) / 0.2 : progress > 117.5 ? (118 - progress) / 0.5 : 1
    const startX = 85, startY = 80
    // Coordinates relative to whole screen (Stat card top-left)
    const targetX = 15, targetY = 44
    const moveProgress = Math.min(1, Math.max(0, (progress - 114.5) / 1.0))
    currentX = startX + (targetX - startX) * moveProgress
    currentY = startY + (targetY - startY) * moveProgress
    isClicking = progress >= 115.5 && progress < 115.8
    scale = isClicking ? 0.75 : 1
  } else {
    // Phase 2: Modal Ticket click (126s - 130s)
    opacity = progress < 126.2 ? (progress - 126) / 0.2 : progress > 129.5 ? (130 - progress) / 0.5 : 1
    const startX = 60, startY = 60
    // Coordinates relative to whole screen (Ticket ID in centered modal)
    const targetX = 24, targetY = 32
    const moveProgress = Math.min(1, Math.max(0, (progress - 126.5) / 1.0))
    currentX = startX + (targetX - startX) * moveProgress
    currentY = startY + (targetY - startY) * moveProgress
    isClicking = progress >= 127.5 && progress < 127.8
    scale = isClicking ? 0.75 : 1
  }

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${currentX}%`,
        top: `${currentY}%`,
        opacity,
        scale,
        zIndex: 5000,
        pointerEvents: "none",
        color: "#17161A",
        filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.4))",
        translateX: "-50%",
        translateY: "-50%"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <MousePointer2 size={32} fill="#FFFFFF" strokeWidth={2.5} />
      {isClicking && (
        <motion.div
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 2, opacity: 0 }}
          className="absolute inset-0 bg-[#60BA81]/40 rounded-full"
        />
      )}
    </motion.div>
  )
}

export const SceneDashboard = ({ isActive, progress }: SceneDashboardProps) => {
  // --- TIMING CONSTANTS (Aligned with Script) ---
  const TIMING = {
    ROLE_SWAP_1: 11,
    ROLE_SWAP_2: 17,
    ROLE_SWAP_3: 22,
    FILTERS_HIGHLIGHT: 24,
    FILTER_SITE: 26.5,
    FILTER_DEPT: 28.5,
    FILTER_SUPP: 30.5,
    FILTER_BRANCH: 32.5,
    DATE_RANGE_OPEN: 34,
    FILTERS_END: 35.5,
    OVERVIEW_HIGHLIGHT: 40,
    OVERVIEW_TOTAL: 41.5,
    OVERVIEW_ANON: 43.5,
    OVERVIEW_CLOSED: 45.5,
    OVERVIEW_INPROCESS: 47.5,
    OVERVIEW_BOUNCED: 49.5,
    OVERVIEW_END: 51,
    BREAKDOWN_START: 51,
    BREAKDOWN_END: 88,
    COUNSELING_START: 88,
    COUNSELING_END: 102,
    PERFORMANCE_START: 102,
    PERFORMANCE_END: 114,
    INTERACTIVE_START: 114,
    REPORTS_START: 155,
    HEAVY_CHARTS_END: 170,
  }

  const calculatedProgress = useMemo(() => {
    const start = 51
    const end = 114
    const dur = end - start
    return Math.min(1, Math.max(0, (progress - start) / dur))
  }, [progress])

  const showFiltersGlow = progress >= TIMING.FILTERS_HIGHLIGHT && progress <= TIMING.FILTERS_END
  const showStatCardsGlow = progress >= TIMING.OVERVIEW_HIGHLIGHT && progress <= TIMING.OVERVIEW_END
  const isBouncedHighlight = progress >= TIMING.OVERVIEW_BOUNCED && progress < 51
  const isCategoriesHighlight = progress >= 51 && progress < 66
  const focusDaily = progress >= 66 && progress < 71
  const isGenderHighlight = progress >= 71 && progress < 76
  const focusFeedback = progress >= 76 && progress < 88
  const isCounselingHighlight = progress >= 88 && progress < 102
  const focusPerformance = progress >= 102 && progress < 114
  const focusHappiness = progress >= 137 && progress < 146
  const focusSafety = progress >= 146 && progress < 155

  const categoriesPhaseProgress = isCategoriesHighlight ? Math.min(1, Math.max(0, (progress - 51) / 15)) : 0
  const isCategoriesZoomed = isCategoriesHighlight && categoriesPhaseProgress > 0.05 && categoriesPhaseProgress <= 0.95

  const feedbackPhaseProgress = focusFeedback ? Math.min(1, Math.max(0, (progress - 76) / 12)) : 0
  const totalSliderWidth = BREAKDOWN_FEEDBACKS.length * 296
  const visibleWidth = 560
  const sliderTranslateX = Math.max(-feedbackPhaseProgress * (totalSliderWidth - visibleWidth), -(totalSliderWidth - visibleWidth))

  // Resolution Performance row sequencing: 102-114s (12s, 4 rows × 3s each)
  const activeResolutionRow = focusPerformance ? Math.min(3, Math.floor(((progress - 102) / 12) * 4)) : -1

  const SCRIPT_CATEGORIES = ["wages", "hours", "harassment", "health"]
  const OTHER_CATEGORIES = ["discipline", "unfair", "ethical", "freedom", "child", "forced", "discrimination"]
  const activeCategoryIds = categoriesPhaseProgress > 0.6
    ? OTHER_CATEGORIES
    : categoriesPhaseProgress > 0.3
      ? SCRIPT_CATEGORIES
      : []

  const isSwap1 = Math.abs(progress - TIMING.ROLE_SWAP_1) < 0.8
  const isSwap2 = Math.abs(progress - TIMING.ROLE_SWAP_2) < 0.8
  const isSwap3 = Math.abs(progress - TIMING.ROLE_SWAP_3) < 0.8
  const isFocusing = isSwap1 || isSwap2 || isSwap3 || (progress > 117 && progress < 124)

  // --- CINEMATIC MULTI-STOP SCROLL LOGIC ---
  const getScrollY = () => {
    // 0-51: Overview (Stat Cards at Top)
    if (progress < 51) return 0

    // 51-66: Categories Breakdown (Focus on Middle-Left)
    if (progress >= 51 && progress < 66) {
      return -520 // Stable stop for Categories
    }

    // 66-71: Complaints by Days (Integrated in Bottom of Center Column)
    if (progress >= 66 && progress < 71) {
      return -850 // Target the lower part of the center column
    }

    // 71-76: Gender Distribution (Focus on Middle-Center)
    if (progress >= 71 && progress < 76) {
      return -450 // Center column focus
    }

    // 76-88: Feedback Section (scroll a bit more to show feedback card)
    if (progress >= 76 && progress < 88) {
      return -300
    }

    // 88-102: Counseling Analysis (Focus on Middle-Left, scroll back up slightly)
    if (progress >= 88 && progress < 102) {
      return -250
    }

    // 102-114: Resolution Performance (Right column, same height as analytics grid)
    if (progress >= 102 && progress < 114) {
      return -450 // Right column sits at same height as center analytics cards
    }

    // 114-137: Interactive modals / overview return
    if (progress >= 114 && progress < 137) {
      return 0
    }

    // 137-155: NPS Scores (Scroll to top of center column where ScoreCards live)
    if (progress >= 137 && progress < 155) {
      return -100
    }

    // 155-170: Survey Reports Focus (Scroll to bottom of dashboard)
    if (progress >= 155 && progress < 170) {
      return -650
    }

    // Final Return to Overview
    return 0
  }

  const viewScrollY = getScrollY()

  const showHeader = isActive
  const showFilters = isActive
  const showStatCards = isActive
  const showFullDashboard = isActive
  const showHappinessFactors = isActive
  const showSafetyFactors = isActive

  const getManagementInfo = () => {
    if (progress < TIMING.ROLE_SWAP_1) return ROLE_DATA.CEO
    if (progress < TIMING.ROLE_SWAP_2) return ROLE_DATA.REGIONAL
    if (progress < TIMING.ROLE_SWAP_3) return ROLE_DATA.SITE
    return ROLE_DATA.UNIT
  }

  const role = getManagementInfo()

  const shouldRenderHeavyCharts = progress < TIMING.HEAVY_CHARTS_END

  const showDetailModal = progress >= 118 && progress < 128
  const showTimelineModal = progress >= 128 && progress < 137
  const focusReports = progress >= 155 && progress < 170
  const isReportsZoomed = progress >= 158 && progress < 170

  const anyFocusActive = showFiltersGlow || isBouncedHighlight || isCounselingHighlight || isCategoriesHighlight || focusDaily || isGenderHighlight || focusFeedback || focusPerformance || focusHappiness || focusSafety || showDetailModal || showTimelineModal || focusReports

  const headerBlurDuringFilters = anyFocusActive ? "blur(2px) opacity(0.6)" : "none"
  const dashboardDimFilter = (showDetailModal || showTimelineModal || isCategoriesZoomed || isReportsZoomed) ? "blur(20px) brightness(0.7)" : "none"

  const headerScale = isFocusing ? 1.05 : 1
  const headerZIndex = isFocusing ? 100 : 50

  return (
    <motion.div
      className="w-full h-full overflow-x-visible overflow-y-clip"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <BrowserFrame>
        <div className="w-full h-full bg-[#F5F5F7] relative overflow-x-visible overflow-y-clip font-sans flex flex-col">
          {/* ... Background Circles ... */}
          <motion.div
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#60BA81]/5 rounded-full blur-[120px]"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          />

          {/* ===== PINNED HEADER BAR ===== */}
          <motion.div
            animate={{
              scale: headerScale,
              zIndex: headerZIndex,
              y: isFocusing ? 20 : 0,
              filter: headerBlurDuringFilters,
              boxShadow: isFocusing ? "0 40px 100px rgba(0,0,0,0.15)" : "0 1px 2px rgba(0,0,0,0.05)"
            }}
            transition={{ duration: 0.8, ease: IOS_EASE }}
            className="bg-white border-b border-[#DEE2E6] px-4 py-1 flex items-center justify-between relative shrink-0 z-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/assets/vertical_logo.png" alt="FOS" className="w-24 h-24 object-contain" />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={role.subtitle}
                  initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                  className={`font-bold text-[#284952] ${isFocusing ? 'text-lg' : 'text-xs'}`}
                >
                  {role.subtitle}
                </motion.span>
              </AnimatePresence>
              <span className="text-[8px] text-[#60BA81] font-bold tracking-[0.15em] uppercase">
                Human Rights Due Diligence Dashboard
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-[#284952] bg-white border border-[#DEE2E6] rounded px-1.5 py-0.5">
                <span className="text-[10px]">Logout</span>
                <LogOut size={12} />
              </div>
            </div>
          </motion.div>

          {/* ===== SCROLLABLE CONTENT WINDOW ===== */}
          <div className="flex-1 relative overflow-x-visible overflow-y-clip bg-[#F5F5F7]">
            <motion.div
              animate={{ y: viewScrollY }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 150,
                mass: 1
              }}
              style={{ willChange: "transform" }}
              className="absolute top-0 left-0 w-full flex flex-col"
            >
              {/* ----- SECTION 1: TOP OVERVIEW LAYER ----- */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: (progress >= 117 && progress < 118) ? 1.1 : 1,
                  filter: dashboardDimFilter
                }}
                className="w-full flex-shrink-0 flex flex-col p-2 origin-top"
                style={{ minHeight: "2000px" }}
              >

                {/* ===== MAIN CONTENT ===== */}
                <div className="flex-1 overflow-x-visible overflow-y-clip p-2">
                  {/* ===== TOP FILTER ROW ===== */}
                  <motion.div
                    animate={{
                      boxShadow: showFiltersGlow ? "0 0 80px rgba(96, 186, 129, 0.8)" : "none",
                      border: showFiltersGlow ? "3px solid #60BA81" : "2px solid transparent",
                      scale: showFiltersGlow ? 1.08 : 1,
                      zIndex: showFiltersGlow ? 200 : 1,
                      y: showFiltersGlow ? 80 : 0,
                      backgroundColor: showFiltersGlow ? "#FFFFFF" : "#DEE2E6",
                      // Apply gentle blur when OTHER things (like Counseling) are focused
                      filter: (anyFocusActive && !showFiltersGlow) ? "blur(2px) brightness(0.6) grayscale(100%) opacity(0.4)" : "none"
                    }}
                    transition={{ duration: 0.8, ease: IOS_EASE }}
                    className="rounded-lg p-1 mb-3 relative overflow-x-visible overflow-y-hidden"
                  >
                    <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                      {showFiltersGlow && (
                        <motion.div
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                        />
                      )}
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <motion.div
                        className="col-span-3 bg-white rounded-lg p-2 relative"
                        animate={{
                          scale: 1,
                          boxShadow: "none"
                        }}
                      >
                        <div className="text-[7px] font-bold text-[#17161A] mb-1 text-center">STATISTICS</div>
                        <div className="bg-gradient-to-r from-[#60BA81] to-[#4e9e6b] rounded-md px-2 py-1 flex items-center justify-center gap-2">
                          <span className="text-white text-[8px] font-medium">All Time Complaints:</span>
                          <motion.span
                            key={role.stats.total}
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-white text-base font-bold bg-white/20 px-2 py-0.5 rounded"
                          >
                            {role.stats.total}
                          </motion.span>
                        </div>
                      </motion.div>

                      <div className="col-span-6 bg-white rounded-lg p-2">
                        <motion.div
                          key={!showFiltersGlow ? "NORMAL" : progress < TIMING.FILTER_DEPT ? "SITE" : progress < TIMING.FILTER_SUPP ? "DEPT" : progress < TIMING.FILTER_BRANCH ? "SUPP" : "BRANCH"}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-[8px] font-bold text-[#17161A] mb-1 text-center font-mono tracking-widest uppercase"
                        >
                          {!showFiltersGlow ? "UNIT FILTER (ACCESS LEVEL)" :
                            progress < TIMING.FILTER_DEPT ? "VIEW BY SITE" :
                              progress < TIMING.FILTER_SUPP ? "VIEW BY DEPARTMENT" :
                                progress < TIMING.FILTER_BRANCH ? "VIEW BY SUPPLIER" : "VIEW BY BRANCH"}
                        </motion.div>
                        <div className="flex items-center gap-2 justify-center py-1">
                          <AnimatePresence mode="popLayout">
                            {(!showFiltersGlow ? role.sites :
                              progress < TIMING.FILTER_DEPT ? FILTER_TRANSITION_DATA.SITES :
                                progress < TIMING.FILTER_SUPP ? FILTER_TRANSITION_DATA.DEPARTMENTS :
                                  progress < TIMING.FILTER_BRANCH ? FILTER_TRANSITION_DATA.SUPPLIERS :
                                    FILTER_TRANSITION_DATA.BRANCHES).map((item, i) => (
                                      <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8, position: 'absolute' }}
                                        transition={{ delay: i * 0.03, duration: 0.3 }}
                                        className="flex flex-col items-center shrink-0"
                                      >
                                        <motion.div
                                          animate={{
                                            scale: item.selected ? 1.15 : 1,
                                            backgroundColor: item.selected ? "#206E71" : "#FFFFFF",
                                            borderColor: item.selected ? "#206E71" : "#DEE2E6"
                                          }}
                                          className={`w-7 h-7 rounded-full flex items-center justify-center border-2 shadow-md transition-colors duration-300`}
                                        >
                                          <Building2 size={14} className={item.selected ? "text-white" : "text-[#284952]"} />
                                        </motion.div>
                                        <span className={`text-[6.5px] mt-1 w-14 text-center truncate font-medium ${item.selected ? "text-[#206E71] font-bold" : "text-[#284952]"}`}>
                                          {item.name}
                                        </span>
                                      </motion.div>
                                    ))}
                          </AnimatePresence>
                        </div>
                      </div>
                      <div className="col-span-3 bg-white rounded-lg p-2 relative">
                        <div className="text-[8px] font-bold text-[#17161A] mb-1 text-center">FILTERS</div>
                        <div className="grid grid-cols-2 gap-1">
                          <div>
                            <div className="text-[6px] text-[#767676] text-center mb-0.5">SEARCH</div>
                            <div className="bg-[#F5F5F7] rounded h-6 flex items-center justify-center">
                              <Search size={10} className="text-[#767676]" />
                            </div>
                          </div>
                          <div className="relative">
                            <div className="text-[6px] text-[#767676] text-center mb-0.5">DATE RANGE</div>
                            <motion.div
                              animate={{
                                borderColor: progress >= TIMING.DATE_RANGE_OPEN ? "#60BA81" : "transparent",
                                boxShadow: progress >= TIMING.DATE_RANGE_OPEN ? "0 0 20px rgba(96, 186, 129, 0.5)" : "none"
                              }}
                              className="bg-[#F5F5F7] rounded h-5 flex items-center justify-center px-1 border-2"
                            >
                              <span className="text-[5.5px] text-[#17161A]">Oct 28, 2025 - Nov 26, 2025</span>
                            </motion.div>

                            <AnimatePresence>
                              {progress >= TIMING.DATE_RANGE_OPEN && progress <= TIMING.FILTERS_END && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                                  transition={{ duration: 0.4, ease: IOS_EASE }}
                                  className="absolute top-8 left-0 right-0 bg-white rounded-lg shadow-2xl border border-[#DEE2E6] p-2 z-50"
                                >
                                  <div className="grid grid-cols-7 gap-0.5 mb-1">
                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                                      <div key={i} className="text-[5px] text-center text-[#767676] font-bold">{d}</div>
                                    ))}
                                  </div>
                                  <div className="grid grid-cols-7 gap-0.5">
                                    {[...Array(28)].map((_, i) => {
                                      const day = i + 1
                                      const isInRange = day >= 10 && day <= 26
                                      const isStart = day === 10
                                      const isEnd = day === 26
                                      return (
                                        <motion.div
                                          key={i}
                                          initial={{ opacity: 0, scale: 0.5 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ delay: i * 0.01, duration: 0.2 }}
                                          className={`text-[5px] w-3 h-3 flex items-center justify-center rounded-full 
                                    ${isStart || isEnd ? 'bg-[#60BA81] text-white' : ''}
                                    ${isInRange && !isStart && !isEnd ? 'bg-[#60BA81]/20 text-[#284952]' : ''}
                                    ${!isInRange ? 'text-[#767676]' : ''}
                                  `}
                                        >
                                          {day}
                                        </motion.div>
                                      )
                                    })}
                                  </div>
                                  <div className="mt-1 pt-1 border-t border-[#DEE2E6] flex justify-between items-center">
                                    <span className="text-[5px] text-[#60BA81] font-bold">17 days selected</span>
                                    <motion.div
                                      animate={{ scale: [1, 1.1, 1] }}
                                      transition={{ repeat: Infinity, duration: 1 }}
                                      className="bg-[#60BA81] text-white text-[5px] px-1.5 py-0.5 rounded"
                                    >
                                      Apply
                                    </motion.div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* ===== STAT CARDS ROW ===== */}
                  <motion.div
                    animate={{
                      filter: (showFiltersGlow || isBouncedHighlight || isCounselingHighlight) ? "blur(2px) brightness(0.6) grayscale(100%) opacity(0.4)" : "none",
                      zIndex: showStatCardsGlow ? 250 : 10
                    }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-4 gap-2 mb-2 relative"
                  >
                    {/* ... (Stat cards content unchanged) ... */}
                    {/* Total Complaints */}
                    <motion.div
                      animate={{
                        scale: (progress >= TIMING.OVERVIEW_TOTAL && progress < TIMING.OVERVIEW_ANON) ? 1.15 :
                          (progress >= 115.5 && progress < 116.8) ? 1.12 : 1,
                        boxShadow: (progress >= TIMING.OVERVIEW_TOTAL && progress < TIMING.OVERVIEW_ANON)
                          ? "0 30px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(96, 186, 129, 0.6)" :
                          (progress >= 115.5 && progress < 116.8) ? "0 20px 40px rgba(96, 186, 129, 0.4), 0 0 30px rgba(96, 186, 129, 0.7)"
                            : "none",
                        y: (progress >= TIMING.OVERVIEW_TOTAL && progress < TIMING.OVERVIEW_ANON) ? -15 : 0,
                        zIndex: (progress >= TIMING.OVERVIEW_TOTAL && progress < TIMING.OVERVIEW_ANON || (progress >= 115.5 && progress < 116.8)) ? 100 : 1,
                        filter: (showStatCardsGlow && !(progress >= TIMING.OVERVIEW_TOTAL && progress < TIMING.OVERVIEW_ANON))
                          ? "blur(2px) brightness(0.6) grayscale(100%) opacity(0.4)" : "opacity(1) grayscale(0%)",
                        borderWidth: (progress >= TIMING.OVERVIEW_TOTAL && progress < TIMING.OVERVIEW_ANON || (progress >= 115.5 && progress < 116.8)) ? 3 : 0,
                        borderColor: "#FFFFFF"
                      }}
                      transition={{ duration: 0.5, ease: IOS_EASE }}
                      className="relative bg-[#60BA81] rounded-lg p-2 overflow-hidden border-solid"
                    >
                      <motion.p key={role.stats.total} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-xl font-bold text-white">
                        {role.stats.total}
                      </motion.p>
                      <p className="text-[8px] text-white/90">Total Complaints</p>
                    </motion.div>

                    {/* Anonymous Complaints */}
                    <motion.div
                      animate={{
                        scale: progress >= TIMING.OVERVIEW_ANON && progress < TIMING.OVERVIEW_CLOSED ? 1.15 : 1,
                        boxShadow: progress >= TIMING.OVERVIEW_ANON && progress < TIMING.OVERVIEW_CLOSED
                          ? "0 30px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(96, 186, 129, 0.6)"
                          : "none",
                        y: progress >= TIMING.OVERVIEW_ANON && progress < TIMING.OVERVIEW_CLOSED ? -15 : 0,
                        zIndex: progress >= TIMING.OVERVIEW_ANON && progress < TIMING.OVERVIEW_CLOSED ? 100 : 1,
                        filter: showStatCardsGlow && !(progress >= TIMING.OVERVIEW_ANON && progress < TIMING.OVERVIEW_CLOSED)
                          ? "blur(2px) brightness(0.6) grayscale(100%) opacity(0.4)" : "opacity(1) grayscale(0%)",
                        borderWidth: progress >= TIMING.OVERVIEW_ANON && progress < TIMING.OVERVIEW_CLOSED ? 3 : 0,
                        borderColor: "#FFFFFF"
                      }}
                      transition={{ duration: 0.5, ease: IOS_EASE }}
                      className="relative bg-[#60BA81] rounded-lg p-2 overflow-hidden border-solid"
                    >
                      <motion.p key={role.stats.anonymous} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-xl font-bold text-white">
                        {role.stats.anonymous}
                      </motion.p>
                      <p className="text-[8px] text-white/90">Anonymous Complaints</p>
                    </motion.div>

                    {/* Completed/Closed Complaints */}
                    <motion.div
                      animate={{
                        scale: progress >= TIMING.OVERVIEW_CLOSED && progress < TIMING.OVERVIEW_INPROCESS ? 1.15 : 1,
                        boxShadow: progress >= TIMING.OVERVIEW_CLOSED && progress < TIMING.OVERVIEW_INPROCESS
                          ? "0 30px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(96, 186, 129, 0.6)"
                          : "none",
                        y: progress >= TIMING.OVERVIEW_CLOSED && progress < TIMING.OVERVIEW_INPROCESS ? -15 : 0,
                        zIndex: progress >= TIMING.OVERVIEW_CLOSED && progress < TIMING.OVERVIEW_INPROCESS ? 100 : 1,
                        filter: showStatCardsGlow && !(progress >= TIMING.OVERVIEW_CLOSED && progress < TIMING.OVERVIEW_INPROCESS)
                          ? "blur(2px) brightness(0.6) grayscale(100%) opacity(0.4)" : "opacity(1) grayscale(0%)",
                        borderWidth: progress >= TIMING.OVERVIEW_CLOSED && progress < TIMING.OVERVIEW_INPROCESS ? 3 : 0,
                        borderColor: "#FFFFFF"
                      }}
                      transition={{ duration: 0.5, ease: IOS_EASE }}
                      className="relative bg-[#60BA81] rounded-lg p-2 overflow-hidden border-solid"
                    >
                      <motion.p key={role.stats.completed} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-xl font-bold text-white">
                        {role.stats.completed}
                      </motion.p>
                      <p className="text-[8px] text-white/90">Closed Complaints</p>
                    </motion.div>

                    {/* In Process Complaints */}
                    <motion.div
                      animate={{
                        scale: progress >= TIMING.OVERVIEW_INPROCESS && progress < TIMING.OVERVIEW_BOUNCED ? 1.15 : 1,
                        boxShadow: progress >= TIMING.OVERVIEW_INPROCESS && progress < TIMING.OVERVIEW_BOUNCED
                          ? "0 30px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(96, 186, 129, 0.6)"
                          : "none",
                        y: progress >= TIMING.OVERVIEW_INPROCESS && progress < TIMING.OVERVIEW_BOUNCED ? -15 : 0,
                        zIndex: progress >= TIMING.OVERVIEW_INPROCESS && progress < TIMING.OVERVIEW_BOUNCED ? 100 : 1,
                        filter: showStatCardsGlow && !(progress >= TIMING.OVERVIEW_INPROCESS && progress < TIMING.OVERVIEW_BOUNCED)
                          ? "blur(3px) brightness(0.7)" : "blur(0px) brightness(1)",
                        borderWidth: progress >= TIMING.OVERVIEW_INPROCESS && progress < TIMING.OVERVIEW_BOUNCED ? 3 : 0,
                        borderColor: "#FFFFFF"
                      }}
                      transition={{ duration: 0.5, ease: IOS_EASE }}
                      className="relative bg-[#60BA81] rounded-lg p-2 overflow-hidden border-solid"
                    >
                      <motion.p key={role.stats.inProcess} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-xl font-bold text-white">
                        {role.stats.inProcess}
                      </motion.p>
                      <p className="text-[8px] text-white/90">In Process Complaints</p>
                    </motion.div>
                  </motion.div>

                  {/* ===== MAIN DASHBOARD GRID ===== */}
                  <motion.div
                    animate={{
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-12 gap-2"
                    style={{ minHeight: "1200px" }}
                  >
                    {/* --- LEFT COLUMN --- */}
                    <div className="col-span-3 flex flex-col gap-3">
                      {/* Complaints Status Card */}
                      <motion.div
                        animate={{
                          filter: (anyFocusActive && !isBouncedHighlight) ? "blur(2px) brightness(0.6) grayscale(100%) opacity(0.4)" : "none",
                          scale: isBouncedHighlight ? 1.05 : 1,
                          zIndex: isBouncedHighlight ? 100 : 1,
                        }}
                        className="bg-white rounded-lg border border-[#DEE2E6] p-2 shadow-sm"
                      >
                        <h3 className="text-[9px] font-bold text-[#284952] mb-3 uppercase tracking-wider">Complaints Status</h3>
                        <div className="flex justify-around items-center">
                          <div className="text-center">
                            <img src="/assets/images/bounce_image.png" alt="Bounced 1.0" className="w-8 h-8 mx-auto mb-1 object-contain" />
                            <p className="text-[8px] text-gray-500 font-bold">Bounced 1.0</p>
                            <p className="text-sm font-black text-[#284952]">2.7%</p>
                          </div>
                          <div className="text-center">
                            <img src="/assets/images/bounce_image1.png" alt="Bounced 2.0" className="w-8 h-8 mx-auto mb-1 object-contain" />
                            <p className="text-[8px] text-gray-500 font-bold">Bounced 2.0</p>
                            <p className="text-sm font-black text-[#284952]">0.0%</p>
                          </div>
                          <div className="text-center">
                            <img src="/assets/images/unclosed_image.png" alt="Unclosed" className="w-8 h-8 mx-auto mb-1 object-contain" />
                            <p className="text-[8px] text-gray-500 font-bold">Unclosed</p>
                            <p className="text-sm font-black text-[#284952]">0.0%</p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Counseling Sessions Analysis */}
                      <motion.div
                        animate={{
                          filter: (anyFocusActive && !isCounselingHighlight) ? "blur(2px) brightness(0.6) grayscale(100%) opacity(0.4)" : "none",
                          scale: isCounselingHighlight ? 1.15 : 1,
                          x: isCounselingHighlight ? 80 : 0,
                          zIndex: isCounselingHighlight ? 100 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 22 }}
                        className="bg-white rounded-lg border border-[#DEE2E6] p-3 shadow-sm flex flex-col items-center justify-center"
                      >
                        <h3 className="text-[9px] font-bold text-[#284952] mb-4 uppercase tracking-wider">Counseling Sessions Analysis</h3>
                        <div className="scale-110 mb-4">
                          <CounselingDonutChart showAnimation={showFullDashboard} progress={progress} />
                        </div>
                        <p className="text-[8px] text-gray-400 text-center italic font-bold uppercase tracking-widest">Global Distribution</p>
                      </motion.div>

                      {/* Complaints By Categories */}
                      <motion.div
                        animate={{
                          filter: (anyFocusActive && !isCategoriesHighlight) ? "blur(2px) brightness(0.6) grayscale(100%) opacity(0.4)" : "none",
                          scale: isCategoriesHighlight ? 1.05 : 1,
                          zIndex: isCategoriesHighlight ? 100 : 1,
                        }}
                        className={`bg-white rounded-lg border border-[#DEE2E6] p-3 shadow-sm flex flex-col ${isCategoriesHighlight ? "overflow-hidden" : ""}`}
                        style={{
                          minHeight: isCategoriesHighlight ? "400px" : "auto"
                        }}
                      >
                        <h3 className="text-[9px] font-bold text-[#284952] mb-4 uppercase tracking-wider">Complaints By Categories</h3>
                        <div className="space-y-2 flex-1 flex flex-col justify-between">
                          {BREAKDOWN_CATEGORIES.map((cat, idx) => (
                            <div key={cat.id} className="flex flex-col gap-1 w-full">
                              <div className="flex justify-between items-center w-full px-0.5">
                                <span className="text-[9px] font-bold text-[#555555] truncate max-w-[140px]">{cat.name}</span>
                                <span className="text-[9px] font-black text-[#206E71]">{cat.value}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-[#E9F5E9] rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${cat.value}%` }}
                                  transition={{ duration: 1, delay: idx * 0.05 }}
                                  className="h-full bg-[#206E71] rounded-full"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="text-center italic text-gray-400 text-[8px] mt-4 font-bold uppercase tracking-widest">Category Distribution</div>
                      </motion.div>
                    </div>

                    {/* --- CENTER COLUMN --- */}
                    <div className="col-span-6 flex flex-col gap-3">
                      {/* Gauges Row */}
                      <div className="grid grid-cols-2 gap-3">
                        <motion.div
                          animate={{
                            filter: (anyFocusActive && !focusHappiness) ? "blur(2px) brightness(0.6) grayscale(100%) opacity(0.4)" : "none",
                            scale: focusHappiness ? 1.05 : 1,
                            zIndex: focusHappiness ? 100 : 1,
                          }}
                          transition={{ type: "spring", stiffness: 150, damping: 20 }}
                          className="rounded-lg flex flex-col items-center justify-center"
                        >
                          <ScoreCard
                            title="Worker Happiness Score"
                            icon={Smile}
                            value={85}
                            factors={FACTORS_HAPPINESS}
                            factorLabel="Calculated Based On"
                            chartId="dh1"
                            delay={0}
                            showFactors={focusHappiness}
                            isHighlighted={focusHappiness}
                            iconColor={COLORS.freshGreen}
                            staticMode={!shouldRenderHeavyCharts}
                          />
                        </motion.div>
                        <motion.div
                          animate={{
                            filter: (anyFocusActive && !focusSafety) ? "blur(2px) brightness(0.6) grayscale(100%) opacity(0.4)" : "none",
                            scale: focusSafety ? 1.05 : 1,
                            zIndex: focusSafety ? 100 : 1,
                          }}
                          transition={{ type: "spring", stiffness: 150, damping: 20 }}
                          className="rounded-lg flex flex-col items-center justify-center"
                        >
                          <ScoreCard
                            title="Worker Safety Score"
                            icon={ShieldCheck}
                            value={92}
                            factors={FACTORS_SAFETY}
                            factorLabel="Worker Satisfaction Based On"
                            chartId="ds1"
                            delay={0.1}
                            showFactors={focusSafety}
                            isHighlighted={focusSafety}
                            iconColor={COLORS.warmOrange}
                            staticMode={!shouldRenderHeavyCharts}
                          />
                        </motion.div>
                      </div>

                      {/* Feedback Slider */}
                      <motion.div
                        animate={{
                          filter: (anyFocusActive && !focusFeedback) ? "blur(2px) brightness(0.6) grayscale(100%) opacity(0.4)" : "none",
                        }}
                        className="bg-white rounded-lg border border-[#DEE2E6] shadow-sm overflow-hidden flex flex-col h-[150px]"
                      >
                        <div className="bg-[#F5A83C] px-3 py-2 flex items-center justify-center gap-2">
                          <h3 className="text-[10px] font-black text-white uppercase">Employees Feedback / Suggestion List</h3>
                          <div className="bg-white/20 px-2 py-0.5 rounded-full flex items-center gap-1.5">
                            <span className="bg-white text-[#F5A83C] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">76</span>
                            <span className="text-white text-[8px] font-bold uppercase">Feedbacks</span>
                          </div>
                        </div>
                        <div className="p-3 bg-[#FFF9F0]/30 flex-1 relative overflow-hidden flex items-center">
                          <motion.div
                            className="flex gap-4 h-full items-center"
                            animate={{ x: focusFeedback ? sliderTranslateX : 0 }}
                            transition={{ type: "tween", duration: 8, ease: "linear" }}
                          >
                            {BREAKDOWN_FEEDBACKS.map((item) => (
                              <div key={item.id} className="min-w-[280px] bg-white rounded-lg p-3 border-l-4 border-[#F5A83C] shadow-sm flex flex-col justify-between h-[80%]">
                                <p className="text-[10px] font-medium text-[#17161A] leading-tight">{item.text}</p>
                                <span className="text-[8px] font-bold text-gray-400 text-right uppercase tracking-tighter">{item.date}</span>
                              </div>
                            ))}
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Complaints by Gender */}
                      <motion.div
                        animate={{
                          filter: (anyFocusActive && !isGenderHighlight) ? "blur(2px) brightness(0.6) grayscale(100%) opacity(0.4)" : "none",
                          scale: isGenderHighlight ? 1.05 : 1,
                          zIndex: isGenderHighlight ? 100 : 1,
                        }}
                        className="bg-white rounded-lg border border-[#DEE2E6] p-3 shadow-sm flex flex-col"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-[9px] font-bold text-[#284952] uppercase tracking-wider">Complaints by Gender</h3>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-[#4A90D9] rounded-sm" /><span className="text-[8px] font-bold text-gray-400 uppercase">Male</span></div>
                            <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-[#E91E63] rounded-sm" /><span className="text-[8px] font-bold text-gray-400 uppercase">Female</span></div>
                          </div>
                        </div>
                        <div className="flex-1 min-h-[160px]">
                          <GenderBarChart isActive={isActive} />
                        </div>
                        <div className="mt-4 flex justify-center gap-8 border-t border-[#F1F3F5] pt-4">
                          <div className="flex items-center gap-3">
                            <span className="text-[#4A90D9] text-[9px] font-black">♂ MALE</span>
                            <span className="text-lg font-black text-[#284952]">467</span>
                            <span className="text-[8px] font-bold text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">97.9%</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[#E91E63] text-[9px] font-black">♀ FEMALE</span>
                            <span className="text-lg font-black text-[#284952]">10</span>
                            <span className="text-[8px] font-bold text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">2.1%</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Complaints by Days */}
                      <motion.div
                        animate={{
                          opacity: isActive ? 1 : 0,
                          filter: (anyFocusActive && !focusDaily) ? "blur(2px) brightness(0.6) grayscale(100%) opacity(0.4)" : "none",
                          scale: focusDaily ? 1.05 : 1,
                          zIndex: focusDaily ? 100 : 10,
                          boxShadow: focusDaily ? "0 30px 60px -12px rgba(40,73,82,0.3)" : "0 1px 3px rgba(0,0,0,0.1)"
                        }}
                        transition={{ type: "spring", stiffness: 150, damping: 20 }}
                        className="bg-white rounded-lg border border-[#DEE2E6] p-3 shadow-sm flex flex-col"
                      >
                        <h3 className="text-xs font-bold text-[#284952] mb-4">Complaints by Days</h3>
                        <div className="h-[150px]">
                          <TrendChart isActive={isActive && focusDaily} />
                        </div>
                      </motion.div>
                    </div>

                    {/* --- RIGHT COLUMN --- */}
                    <div className="col-span-3 flex flex-col gap-3">
                      {/* Executive Summary */}
                      <motion.div
                        animate={{
                          filter: anyFocusActive ? "blur(2px) brightness(0.6) grayscale(100%) opacity(0.4)" : "none",
                        }}
                        className="bg-white rounded-lg border border-[#DEE2E6] p-3 shadow-sm flex flex-col"
                      >
                        <h3 className="text-[9px] font-bold text-[#206E71] mb-4 uppercase tracking-wider border-b pb-2">Business Units Summary</h3>
                        <div className="flex items-center justify-center my-4">
                          <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center shadow-inner border border-gray-100">
                            <Building2 size={32} className="text-[#206E71]" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          {[
                            { l: "Companies", v: "24" },
                            { l: "Employees", v: "4671" },
                            { l: "Officers", v: "24" },
                            { l: "Res. Time", v: "1.5 Days", highlight: true }
                          ].map((row, i) => (
                            <div key={i} className="flex justify-between items-center bg-[#F8F9FA] p-2 rounded-md border border-gray-50">
                              <span className="text-[9px] font-bold text-gray-500 uppercase">{row.l}:</span>
                              <span className={`text-xs font-black ${row.highlight ? "text-[#60BA81]" : "text-[#284952]"}`}>{row.v}</span>
                            </div>
                          ))}
                        </div>
                        <p className="text-[8px] text-gray-400 text-center mt-6 font-bold uppercase tracking-[0.2em] opacity-60">Operations Statistics</p>
                      </motion.div>

                      {/* Resolution Table */}
                      <motion.div
                        animate={{
                          filter: (anyFocusActive && !focusPerformance) ? "blur(2px) brightness(0.6) grayscale(100%) opacity(0.4)" : "none",
                          scale: focusPerformance ? 1.05 : 1,
                          zIndex: focusPerformance ? 100 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 150, damping: 20 }}
                        className="bg-white rounded-lg border border-[#DEE2E6] p-3 shadow-sm flex flex-col"
                      >
                        <h3 className="text-[9px] font-bold text-[#284952] mb-4 uppercase tracking-wider">Resolution Performance</h3>
                        <div className="rounded-lg overflow-hidden border border-gray-100">
                          <div className="grid grid-cols-2 bg-[#2D9480] text-white text-[8px] font-black p-2 uppercase tracking-wide">
                            <div className="text-center">Time Frame</div>
                            <div className="text-center">Cases</div>
                          </div>
                          {[
                            { t: "Same Day", v: 22 },
                            { t: "3 Days", v: 1 },
                            { t: "10 Days", v: 2 },
                            { t: "Over 10 Days", v: 0 }
                          ].map((row, i) => {
                            const isCurrent = i === activeResolutionRow
                            return (
                              <motion.div key={i} animate={{ backgroundColor: isCurrent ? "#60BA81" : (i % 2 === 0 ? "#F8F9FA" : "#FFFFFF") }} className="grid grid-cols-2 p-2 border-t border-gray-50">
                                <span className={`text-[9px] text-center font-bold ${isCurrent ? "text-white" : "text-gray-500"}`}>{row.t}</span>
                                <span className={`text-[10px] text-center font-black ${isCurrent ? "text-white" : "text-[#206E71]"}`}>{row.v}</span>
                              </motion.div>
                            )
                          })}
                        </div>
                      </motion.div>

                      {/* Survey Reports */}
                      <motion.div
                        animate={{
                          scale: (focusReports && !isReportsZoomed) ? 1.15 : 1,
                          y: (focusReports && !isReportsZoomed) ? -15 : 0,
                          zIndex: (focusReports && !isReportsZoomed) ? 100 : 1,
                          boxShadow: (focusReports && !isReportsZoomed) ? "0 40px 100px rgba(96, 186, 129, 0.5)" : "none",
                          filter: (anyFocusActive && !focusReports)
                            ? "blur(2px) brightness(0.6) grayscale(100%) opacity(0.4)"
                            : "none",
                        }}
                        transition={{ duration: 0.8, ease: IOS_EASE }}
                        className="bg-white rounded-lg border border-[#DEE2E6] flex flex-col overflow-hidden shadow-sm flex-1"
                      >
                        <div className="bg-[#284952] px-4 py-3 flex items-center gap-3">
                          <div className="bg-white/10 p-1.5 rounded">
                            <BarChart2 size={16} className="text-white" />
                          </div>
                          <span className="text-sm font-black text-white uppercase tracking-wider">Survey Reports</span>
                        </div>
                        <div className="flex-1 relative flex overflow-hidden">
                          {/* Scroll Content */}
                          <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar p-0">
                            {SURVEY_REPORTS.map((survey, i) => (
                              <div key={i} className={`p-4 border-b border-gray-100 bg-white transition-all`}>
                                <div className="flex flex-col gap-2">
                                  <span className="text-[11px] font-black text-[#284952] leading-tight">{survey.title}</span>
                                  <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-gray-400">{survey.date}</span>
                                    <div className="flex gap-2">
                                      {survey.hasView && (
                                        <button className="bg-[#60BA81] text-white px-2 py-1.5 rounded-md text-[9px] font-black uppercase tracking-tighter flex items-center gap-1.5 shadow-md shadow-[#60BA81]/20">
                                          <BarChart2 size={10} /> View
                                        </button>
                                      )}
                                      {survey.hasPdf && (
                                        <button className="bg-[#F5A83C] text-white px-2 py-1.5 rounded-md text-[9px] font-black uppercase tracking-tighter flex items-center gap-1.5 shadow-md shadow-[#F5A83C]/20">
                                          <FileText size={10} /> PDF
                                        </button>
                                      )}
                                      {survey.hasCsv && (
                                        <button className="bg-[#F5A83C] text-white px-2 py-1.5 rounded-md text-[9px] font-black uppercase tracking-tighter flex items-center gap-1.5 shadow-md shadow-[#F5A83C]/20">
                                          <Download size={10} /> CSV
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Custom Scrollbar */}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                </div>
              </motion.div>
            </motion.div >

            {/* REMOVED DUPLICATE CURSOR FROM INCORRECT NESTING */}
          </div>
        </div>
      </BrowserFrame>

      {/* --- CINEMATIC MODAL OVERLAYS (Outside Frame to prevent clipping) --- */}
      <AnimatePresence>
        {
          showDetailModal && (
            <motion.div
              key="detail-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[2000] flex items-center justify-center bg-black/40 backdrop-blur-md"
            >
              <SceneAI isActive={true} progress={progress} />
            </motion.div>
          )
        }
        {
          showTimelineModal && (
            <motion.div
              key="timeline-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[2000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
            >
              <SceneTimeline isActive={true} progress={progress} />
            </motion.div>
          )
        }
        {
          isReportsZoomed && (
            <motion.div
              key="reports-zoom"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[2000] flex items-center justify-center p-8 bg-black/40 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.7, y: 40, opacity: 0 }}
                animate={{ scale: 0.85, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, y: -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 w-full max-w-4xl flex flex-col overflow-hidden"
              >
                <div className="bg-[#284952] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-white" />
                    <span className="text-white font-black text-base uppercase tracking-wider">Survey Intelligence & HRDD Reports</span>
                  </div>
                  <div className="flex gap-2">
                    {["HRDD", "ESG", "CSDD"].map((badge) => (
                      <div key={badge} className="px-3 py-1 bg-white/10 border border-white/20 rounded-full">
                        <span className="text-white font-bold text-[10px]">{badge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 grid grid-cols-2 gap-6 overflow-y-auto max-h-[75vh]">
                  {/* Left side: Report List */}
                  <div className="flex flex-col border border-[#DEE2E6] rounded-2xl overflow-hidden bg-white shadow-xl">
                    <div className="bg-[#284952] p-4 flex items-center gap-3 shrink-0">
                      <div className="bg-white/10 p-1.5 rounded-lg">
                        <BarChart2 className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-black text-base uppercase tracking-wider">Survey Reports</span>
                    </div>

                    <div className="flex-1 relative flex overflow-hidden">
                      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar max-h-[150vh]">
                        {SURVEY_REPORTS.map((report, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex flex-col gap-4">
                              <span className="font-black text-[#284952] text-[13px] leading-tight">
                                {report.title}
                              </span>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-400 font-bold">{report.date}</span>
                                <div className="flex gap-2">
                                  {report.hasView && (
                                    <button className="bg-[#60BA81] text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#60BA81]/20 transform transition-transform hover:scale-105 active:scale-95">
                                      <BarChart2 size={12} /> View
                                    </button>
                                  )}
                                  {report.hasPdf && (
                                    <button className="bg-[#F5A83C] text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#F5A83C]/20 transform transition-transform hover:scale-105 active:scale-95">
                                      <FileText size={12} /> PDF
                                    </button>
                                  )}
                                  {report.hasCsv && (
                                    <button className="bg-[#F5A83C] text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#F5A83C]/20 transform transition-transform hover:scale-105 active:scale-95">
                                      <Download size={12} /> CSV
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Scrollbar Mock for Modal */}
                      <div className="w-[24px] h-full flex flex-col border-l border-gray-100 shrink-0 bg-[#F8F9FA]">
                        <button className="h-[24px] w-full flex items-center justify-center text-gray-400 py-1">
                          <ChevronUp size={16} />
                        </button>
                        <div className="flex-1 relative flex justify-center py-2">
                          <div className="w-full mx-1 bg-gray-400 rounded-full" style={{ height: '40%' }} />
                        </div>
                        <button className="h-[24px] w-full flex items-center justify-center text-gray-400 py-1">
                          <ChevronDown size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right side: Strategy & Analytics */}
                  <div className="space-y-4">
                    {[
                      { icon: FileText, title: "Due Diligence Reports", desc: "Comprehensive documentation", color: "#60BA81" },
                      { icon: Share2, title: "Brand Updates", desc: "Share progress with partners", color: "#284952" },
                      { icon: FileSpreadsheet, title: "Social Audits", desc: "Audit-ready exports", color: "#F5A83C" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
                      >
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}10` }}>
                          <item.icon className="w-5 h-5" style={{ color: item.color }} />
                        </div>
                        <div className="flex-1">
                          <p className="text-[#284952] font-black text-sm uppercase tracking-tight">{item.title}</p>
                          <p className="text-gray-400 text-xs font-medium">{item.desc}</p>
                        </div>
                        <div className="w-8 h-8 bg-[#F8F9FA] rounded-full flex items-center justify-center text-gray-400 hover:text-[#60BA81] transition-colors cursor-pointer">
                          <Download size={14} />
                        </div>
                      </motion.div>
                    ))}

                    <div className="mt-6 p-6 bg-gradient-to-br from-[#284952] to-[#206E71] rounded-2xl text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-xl" />
                      <h4 className="font-black text-xs uppercase tracking-widest mb-2 opacity-80">Compliance Readiness</h4>
                      <p className="text-xl font-bold leading-tight">System ready for CSDD & ESG Disclosure Requirements</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        }
        {
          isCategoriesZoomed && (
            <motion.div
              key="categories-zoom"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 z-[2000] flex items-center justify-center p-8 bg-black/60 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.7, y: 40, opacity: 0, filter: "blur(10px)" }}
                animate={{ scale: 1, y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ scale: 0.9, y: -20, opacity: 0, filter: "blur(6px)" }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                  mass: 0.8,
                }}
                className="bg-white rounded-xl shadow-2xl border border-white/20 w-fit max-w-2xl max-h-[70vh] flex flex-col overflow-hidden"
              >
                <div className="px-6 py-4 flex justify-between items-center shrink-0 border-b border-gray-50">
                  <h2 className="text-lg font-black text-[#284952] tracking-tight uppercase">
                    Complaints By Categories
                  </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-0.5">
                  {BREAKDOWN_CATEGORIES.map((cat, idx) => {
                    const isHighlighted = activeCategoryIds.includes(cat.id)
                    const isDimmed = activeCategoryIds.length > 0 && !isHighlighted

                    return (
                      <motion.div
                        key={cat.id}
                        layout="position"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: isDimmed ? 0.35 : 1,
                          x: 0,
                          scale: isHighlighted ? 1.01 : 1,
                        }}
                        className={`flex items-center gap-4 px-4 py-1.5 rounded-lg transition-colors duration-500 ${isHighlighted ? 'bg-[#60BA81]/5' : 'bg-transparent'}`}
                      >
                        <div className={`w-7 h-7 rounded flex items-center justify-center shrink-0 shadow-sm transition-all duration-500 ${isHighlighted ? 'bg-[#60BA81] text-white' : 'bg-gray-100 text-gray-400'}`}>
                          <cat.icon size={14} />
                        </div>

                        <div className="w-[240px] shrink-0">
                          <span className={`text-[13px] font-bold transition-all duration-300 ${isHighlighted ? 'text-[#284952]' : 'text-[#767676]'}`}>
                            {cat.name}
                          </span>
                        </div>

                        <div className="w-32 h-1.5 bg-[#F0F2F5] rounded-full overflow-hidden relative">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: isHighlighted ? COLORS.freshGreen : "#CCCCCC" }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(cat.value / 41) * 100}%` }}
                            transition={{ duration: 1.2, ease: "circOut", delay: idx * 0.05 }}
                          />
                        </div>

                        <div className="w-12 text-right">
                          <span className={`text-base font-black ${isHighlighted ? 'text-[#60BA81]' : 'text-gray-400'}`}>
                            {cat.value}%
                          </span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </motion.div>
          )
        }
      </AnimatePresence >

      {/* --- INTERACTIVE CURSOR (At Root Level to overlay everything) --- */}
      <MetricClickCursor progress={progress} />
    </motion.div>
  )
}

function CounselingDonutChart({ showAnimation, progress }: { showAnimation: boolean; progress: number }) {
  // Determine cinematic focus based on timing (88s - 102s)
  const getActiveData = () => {
    if (progress < 90) return null
    if (progress >= 90 && progress < 93) return { id: "out-green", label: "Production", value: "124", color: "#60BA81", type: "DEPARTMENT" }
    if (progress >= 93 && progress < 96) return { id: "out-red", label: "HR & Admin", value: "38", color: "#E74C3C", type: "DEPARTMENT" }
    if (progress >= 96 && progress < 99) return { id: "in-green", label: "Lahore HQ", value: "102", color: "#60BA81", type: "BRANCH" }
    if (progress >= 99 && progress < 102) return { id: "in-red", label: "Karachi Unit", value: "22", color: "#E74C3C", type: "BRANCH" }
    return null
  }

  const activeData = getActiveData()
  const isFocusMode = !!activeData

  // Helper for opacity
  const getOpacity = (id: string) => {
    if (!isFocusMode) return 1
    return activeData.id === id ? 1 : 0.1
  }

  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0" style={{ shapeRendering: "geometricPrecision" }}>
        {/* Outer ring - 5 segments */}
        {/* GREEN (Production) */}
        <motion.circle
          cx="50" cy="50" r="40" fill="none" stroke="#60BA81"
          strokeWidth={activeData?.id === "out-green" ? 16 : 12}
          strokeDasharray="70 251.2"
          initial={{ strokeDasharray: "0 251.2" }}
          animate={{
            strokeDasharray: showAnimation ? "70 251.2" : "0 251.2",
            opacity: getOpacity("out-green")
          }}
          transition={{ duration: 0.5 }}
          transform="rotate(-90 50 50)"
        />
        {/* YELLOW */}
        <motion.circle
          cx="50" cy="50" r="40" fill="none" stroke="#F5A83C" strokeWidth="12"
          strokeDasharray="55 251.2" strokeDashoffset="-70"
          initial={{ strokeDasharray: "0 251.2" }}
          animate={{
            strokeDasharray: showAnimation ? "55 251.2" : "0 251.2",
            opacity: isFocusMode ? 0.1 : 1
          }}
          transition={{ duration: 0.5 }}
          transform="rotate(-90 50 50)"
        />
        {/* TEAL */}
        <motion.circle
          cx="50" cy="50" r="40" fill="none" stroke="#284952" strokeWidth="12"
          strokeDasharray="50 251.2" strokeDashoffset="-125"
          initial={{ strokeDasharray: "0 251.2" }}
          animate={{
            strokeDasharray: showAnimation ? "50 251.2" : "0 251.2",
            opacity: isFocusMode ? 0.1 : 1
          }}
          transition={{ duration: 0.5 }}
          transform="rotate(-90 50 50)"
        />
        {/* RED (HR & Admin) */}
        <motion.circle
          cx="50" cy="50" r="40" fill="none" stroke="#E74C3C"
          strokeWidth={activeData?.id === "out-red" ? 16 : 12}
          strokeDasharray="40 251.2" strokeDashoffset="-175"
          initial={{ strokeDasharray: "0 251.2" }}
          animate={{
            strokeDasharray: showAnimation ? "40 251.2" : "0 251.2",
            opacity: getOpacity("out-red")
          }}
          transition={{ duration: 0.5 }}
          transform="rotate(-90 50 50)"
        />
        {/* GRAY */}
        <motion.circle
          cx="50" cy="50" r="40" fill="none" stroke="#9CA3AF" strokeWidth="12"
          strokeDasharray="36.2 251.2" strokeDashoffset="-215"
          initial={{ strokeDasharray: "0 251.2" }}
          animate={{
            strokeDasharray: showAnimation ? "36.2 251.2" : "0 251.2",
            opacity: isFocusMode ? 0.1 : 1
          }}
          transition={{ duration: 0.5 }}
          transform="rotate(-90 50 50)"
        />

        {/* Inner ring - 3 segments */}
        {/* INNER GREEN (Lahore HQ) */}
        <motion.circle
          cx="50" cy="50" r="24" fill="none" stroke="#60BA81"
          strokeWidth={activeData?.id === "in-green" ? 14 : 10}
          strokeDasharray="90 150.8"
          initial={{ strokeDasharray: "0 150.8" }}
          animate={{
            strokeDasharray: showAnimation ? "90 150.8" : "0 150.8",
            opacity: getOpacity("in-green")
          }}
          transition={{ duration: 0.5 }}
          transform="rotate(-90 50 50)"
        />
        {/* INNER RED (Karachi Unit) */}
        <motion.circle
          cx="50" cy="50" r="24" fill="none" stroke="#E74C3C"
          strokeWidth={activeData?.id === "in-red" ? 14 : 10}
          strokeDasharray="35 150.8" strokeDashoffset="-90"
          initial={{ strokeDasharray: "0 150.8" }}
          animate={{
            strokeDasharray: showAnimation ? "35 150.8" : "0 150.8",
            opacity: getOpacity("in-red")
          }}
          transition={{ duration: 0.5 }}
          transform="rotate(-90 50 50)"
        />
        {/* INNER YELLOW */}
        <motion.circle
          cx="50" cy="50" r="24" fill="none" stroke="#F5A83C" strokeWidth="10"
          strokeDasharray="25.8 150.8" strokeDashoffset="-125"
          initial={{ strokeDasharray: "0 150.8" }}
          animate={{
            strokeDasharray: showAnimation ? "25.8 150.8" : "0 150.8",
            opacity: isFocusMode ? 0.1 : 1
          }}
          transition={{ duration: 0.5 }}
          transform="rotate(-90 50 50)"
        />

        {/* Labels - hide during focus for central overlay */}
        {!isFocusMode && (
          <>
            <text x="75" y="30" className="text-[3px] fill-white font-medium" textAnchor="middle">22</text>
            <text x="20" y="40" className="text-[3px] fill-white font-medium" textAnchor="middle">38</text>
            <text x="70" y="75" className="text-[3px] fill-white font-medium" textAnchor="middle">102</text>
            <text x="30" y="80" className="text-[3px] fill-white font-medium" textAnchor="middle">124</text>
          </>
        )}
      </svg>

      {/* Cinematic Center Overlay */}
      <AnimatePresence>
        {activeData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
          >
            <span className="text-[5px] font-bold tracking-widest text-gray-400 mb-0.5">{activeData.type}</span>
            <span className="text-[7px] font-black uppercase leading-tight mb-0.5" style={{ color: activeData.color }}>{activeData.label}</span>
            <div className="flex flex-col items-center">
              <span className="text-xl font-black text-[#284952] leading-none">{activeData.value}</span>
              <span className="text-[5px] text-[#767676] font-bold uppercase tracking-widest mt-0.5">Counsellings</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}