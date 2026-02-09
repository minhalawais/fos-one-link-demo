"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import {
  Building2,
  Search,
  LogOut,
  ChevronDown,
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
  }
}

const FILTER_TRANSITION_DATA = {
  SITES: [
    { name: "ILO", hasLogo: true },
    { name: "CENTAURUS", hasLogo: true, selected: true },
    { name: "BAHRIA-4", hasLogo: true },
    { name: "BAHRIA-7", hasLogo: true },
    { name: "F-10 MARKAZ", hasLogo: true },
    { name: "GIGA MALL", hasLogo: true },
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
        {/* Background Track */}
        <circle cx="100" cy="100" r="80" fill="none" stroke="#F0F2F5" strokeWidth="20" strokeLinecap="round" />
        {/* Value Arc (Simple Approximation) */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke={color}
          strokeWidth="20"
          strokeLinecap="round"
          strokeDasharray="502" // 2 * pi * 80
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
          width: 180,
          height: 180,
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
              label: { text: "%max", align: "center", verticalAlign: "middle", style_fontSize: 20 },
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
    <div ref={chartRef} id={chartId} style={{ width: 160, height: 160 }} className="flex items-center justify-center" />
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
  iconColor: string
  staticMode?: boolean
}) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay, ease: "backOut" }}
      className="bg-white rounded-xl border border-[#DEE2E6]/60 p-3 flex flex-col items-center relative overflow-hidden shadow-sm"
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${iconColor}15` }}>
          <Icon size={14} style={{ color: iconColor }} />
        </div>
        <h2 className="text-[10px] font-bold" style={{ color: COLORS.deepTeal }}>
          {title}
        </h2>
      </div>

      <div className="relative flex items-center justify-center" style={{ minHeight: 160 }}>
        {/* Conditional Rendering: Static SVG vs Heavy JSChart */}
        {staticMode ? (
          <StaticGauge value={value} color={iconColor} />
        ) : (
          <JSChartingCircularColorBar value={value} chartId={chartId} />
        )}
      </div>
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
    HEAVY_CHARTS_END: 60,
    COUNSELING_START: 88,
    COUNSELING_END: 102,
    INTERACTIVE_START: 110,
  }

  const showHeader = isActive
  const showFilters = isActive
  const showStatCards = isActive
  const showFullDashboard = isActive
  const showHappinessFactors = isActive
  const showSafetyFactors = isActive

  const getManagementInfo = () => {
    if (progress < TIMING.ROLE_SWAP_1) return ROLE_DATA.CEO
    if (progress < TIMING.ROLE_SWAP_2) return ROLE_DATA.REGIONAL
    return ROLE_DATA.SITE
  }

  const role = getManagementInfo()

  const isSwap1 = Math.abs(progress - TIMING.ROLE_SWAP_1) < 0.8
  const isSwap2 = Math.abs(progress - TIMING.ROLE_SWAP_2) < 0.8
  const isSwap3 = Math.abs(progress - TIMING.ROLE_SWAP_3) < 0.8
  const isFocusing = isSwap1 || isSwap2 || isSwap3

  const showFiltersGlow = progress >= TIMING.FILTERS_HIGHLIGHT && progress <= TIMING.FILTERS_END
  const showStatCardsGlow = progress >= TIMING.OVERVIEW_HIGHLIGHT && progress <= TIMING.OVERVIEW_END
  const isBouncedHighlight = progress >= TIMING.OVERVIEW_BOUNCED && progress < TIMING.OVERVIEW_END
  const isCounselingHighlight = progress >= 89.5 && progress < 101

  const shouldRenderHeavyCharts = progress < TIMING.HEAVY_CHARTS_END || progress > TIMING.INTERACTIVE_START
  const showDetailModal = progress >= 118 && progress < 128
  const showTimelineModal = progress >= 128 && progress < 137
  const anyFocusActive = showFiltersGlow || isBouncedHighlight || isCounselingHighlight || showDetailModal || showTimelineModal

  // Updated Blur Logic: Reduced blur radius (3px) and increased opacity (0.8)
  const headerBlurDuringFilters = anyFocusActive ? "blur(3px) opacity(0.8)" : "blur(0px) opacity(1)"
  const dashboardDimFilter = (showDetailModal || showTimelineModal) ? "blur(20px) brightness(0.7) grayscale(20%)" : "none"

  const headerScale = isFocusing ? 1.15 : 1
  const headerZIndex = isFocusing ? 100 : 50

  return (
    <div className="w-full h-full bg-[#F5F5F7] relative overflow-hidden font-sans">
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#60BA81]/5 rounded-full blur-[120px]"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      />

      {/* Simulated Cursor and Click for Cinematic Transition (114s - 118s) */}
      <AnimatePresence>
        {progress >= 114 && progress < 118 && (
          <motion.div
            initial={{ x: 600, y: 400, opacity: 0 }}
            animate={{
              x: 110, y: 190, // Move towards "Total Complaints" card (below statistics)
              opacity: 1
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute z-[1000] pointer-events-none"
          >
            {/* Simple SVG Cursor */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <motion.path
                d="M3 3L21 11L13 13L11 21L3 3Z"
                fill="white"
                stroke="black"
                strokeWidth="2"
                animate={{
                  scale: progress >= 116 && progress < 116.5 ? [1, 0.8, 1] : 1
                }}
              />
              {/* Click Pulse */}
              {progress >= 116 && (
                <motion.circle
                  cx="3" cy="3" r="20"
                  stroke="#60BA81"
                  strokeWidth="2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 2] }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{
          opacity: isActive ? 1 : 0,
          scale: progress >= 117 && progress < 118 ? 1.05 : 1, // Slight predictive zoom before modal
          filter: dashboardDimFilter
        }}
        exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
        transition={{ duration: 0.8, ease: IOS_EASE }}
        className="relative z-10 w-full h-full flex flex-col"
      >
        {/* ===== HEADER BAR ===== */}
        <motion.div
          animate={{
            scale: headerScale,
            zIndex: headerZIndex,
            y: isFocusing ? 100 : 0,
            filter: headerBlurDuringFilters,
            boxShadow: isFocusing ? "0 40px 100px rgba(0,0,0,0.3)" : "0 1px 2px rgba(0,0,0,0.05)"
          }}
          transition={{ duration: 0.8, ease: IOS_EASE }}
          className="bg-white border-b border-[#DEE2E6] px-4 py-2 flex items-center justify-between relative"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src="/assets/vertical_logo.png" alt="Fruit of Sustainability Logo" className="w-32 h-32 object-contain" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={role.subtitle}
                initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className={`font-bold text-[#284952] transition-all duration-500 ${isFocusing ? 'text-lg' : 'text-sm'}`}
              >
                {role.subtitle}
              </motion.span>
            </AnimatePresence>
            <span className="text-[10px] text-[#60BA81] font-bold tracking-[0.15em] uppercase">
              Human Rights Due Diligence Dashboard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/assets/company_logo.png" alt="Company Logo" className="w-8 h-8 object-contain rounded-full" />
            </div>
            <div className="flex items-center gap-2 text-[#284952] bg-white border border-[#DEE2E6] rounded px-2 py-1">
              <span className="text-xs">Logout</span>
              <LogOut size={14} />
            </div>
          </div>
        </motion.div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="flex-1 overflow-visible p-2">
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
              filter: (anyFocusActive && !showFiltersGlow) ? "blur(3px) opacity(0.8) grayscale(20%)" : "none"
            }}
            transition={{ duration: 0.8, ease: IOS_EASE }}
            className="rounded-lg p-2 mb-2 relative overflow-visible"
          >
            {showFiltersGlow && (
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />
            )}
            <div className="grid grid-cols-12 gap-2">
              <motion.div
                className="col-span-3 bg-white rounded-lg p-2 relative"
                animate={{
                  scale: 1,
                  boxShadow: "none"
                }}
              >
                <div className="text-[8px] font-bold text-[#17161A] mb-1 text-center">STATISTICS</div>
                <div className="bg-gradient-to-r from-[#60BA81] to-[#4e9e6b] rounded-md px-3 py-2 flex items-center justify-center gap-2">
                  <span className="text-white text-[9px] font-medium">All Time Complaints:</span>
                  <motion.span
                    key={role.stats.total}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-white text-lg font-bold bg-white/20 px-2 py-0.5 rounded"
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
                                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-md transition-colors duration-300`}
                                >
                                  <Building2 size={16} className={item.selected ? "text-white" : "text-[#284952]"} />
                                </motion.div>
                                <span className={`text-[7px] mt-1 w-14 text-center truncate font-medium ${item.selected ? "text-[#206E71] font-bold" : "text-[#284952]"}`}>
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
                      className="bg-[#F5F5F7] rounded h-6 flex items-center justify-center px-1 border-2"
                    >
                      <span className="text-[6px] text-[#17161A]">Oct 28, 2025 - Nov 26, 2025</span>
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
              filter: (showFiltersGlow || isBouncedHighlight || isCounselingHighlight) ? "blur(3px) opacity(0.8) grayscale(20%)" : "none",
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
                  (progress >= 116 && progress < 117) ? 1.05 : 1,
                boxShadow: (progress >= TIMING.OVERVIEW_TOTAL && progress < TIMING.OVERVIEW_ANON)
                  ? "0 30px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(96, 186, 129, 0.6)" :
                  (progress >= 116 && progress < 117) ? "0 0 40px rgba(96, 186, 129, 0.5)"
                    : "none",
                y: (progress >= TIMING.OVERVIEW_TOTAL && progress < TIMING.OVERVIEW_ANON) ? -15 : 0,
                zIndex: (progress >= TIMING.OVERVIEW_TOTAL && progress < TIMING.OVERVIEW_ANON || (progress >= 116 && progress < 117)) ? 100 : 1,
                filter: (showStatCardsGlow && !(progress >= TIMING.OVERVIEW_TOTAL && progress < TIMING.OVERVIEW_ANON))
                  ? "blur(3px) brightness(0.7)" : "blur(0px) brightness(1)",
                borderWidth: (progress >= TIMING.OVERVIEW_TOTAL && progress < TIMING.OVERVIEW_ANON || (progress >= 116 && progress < 117)) ? 3 : 0,
                borderColor: "#FFFFFF"
              }}
              transition={{ duration: 0.5, ease: IOS_EASE }}
              className="relative bg-[#60BA81] rounded-lg p-3 overflow-hidden border-solid"
            >
              <motion.p key={role.stats.total} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-2xl font-bold text-white">
                {role.stats.total}
              </motion.p>
              <p className="text-[9px] text-white/90">Total Complaints</p>
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
                  ? "blur(3px) brightness(0.7)" : "blur(0px) brightness(1)",
                borderWidth: progress >= TIMING.OVERVIEW_ANON && progress < TIMING.OVERVIEW_CLOSED ? 3 : 0,
                borderColor: "#FFFFFF"
              }}
              transition={{ duration: 0.5, ease: IOS_EASE }}
              className="relative bg-[#60BA81] rounded-lg p-3 overflow-hidden border-solid"
            >
              <motion.p key={role.stats.anonymous} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-2xl font-bold text-white">
                {role.stats.anonymous}
              </motion.p>
              <p className="text-[9px] text-white/90">Anonymous Complaints</p>
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
                  ? "blur(3px) brightness(0.7)" : "blur(0px) brightness(1)",
                borderWidth: progress >= TIMING.OVERVIEW_CLOSED && progress < TIMING.OVERVIEW_INPROCESS ? 3 : 0,
                borderColor: "#FFFFFF"
              }}
              transition={{ duration: 0.5, ease: IOS_EASE }}
              className="relative bg-[#60BA81] rounded-lg p-3 overflow-hidden border-solid"
            >
              <motion.p key={role.stats.completed} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-2xl font-bold text-white">
                {role.stats.completed}
              </motion.p>
              <p className="text-[9px] text-white/90">Closed Complaints</p>
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
              className="relative bg-[#60BA81] rounded-lg p-3 overflow-hidden border-solid"
            >
              <motion.p key={role.stats.inProcess} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-2xl font-bold text-white">
                {role.stats.inProcess}
              </motion.p>
              <p className="text-[9px] text-white/90">In Process Complaints</p>
            </motion.div>
          </motion.div>

          {/* ===== MAIN DASHBOARD GRID ===== */}
          <motion.div
            animate={{
              opacity: isActive ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-12 gap-2"
            style={{ height: "calc(100% - 140px)" }}
          >
            {/* LEFT COLUMN - 25% width */}
            <div className="col-span-3 flex flex-col gap-2 relative">
              {/* Complaints Status Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: showFullDashboard ? 1 : 0,
                  x: isBouncedHighlight ? 300 : (showFullDashboard ? 0 : -20),
                  y: isBouncedHighlight ? 100 : 0,
                  scale: isBouncedHighlight ? 1.8 : 1,
                  zIndex: isBouncedHighlight ? 500 : 1,
                  boxShadow: isBouncedHighlight ? "0 40px 80px rgba(0,0,0,0.5)" : "0 1px 2px rgba(0,0,0,0.05)",
                  borderColor: isBouncedHighlight ? "#60BA81" : "#DEE2E6",
                  filter: (anyFocusActive && !isBouncedHighlight) ? "blur(3px) opacity(0.8) grayscale(20%)" : "none"
                }}
                transition={{ duration: 0.6, ease: IOS_EASE }}
                className="bg-white rounded-lg border p-2 shadow-sm"
              >
                <h3 className="text-[9px] font-semibold text-[#284952] mb-2">Complaints Status</h3>
                <div className="flex justify-around">
                  <div className="text-center">
                    <div className="w-7 h-7 mx-auto mb-1 flex items-center justify-center">
                      <img src="/assets/images/bounce_image.png" alt="Bounced 1.0" className="w-6 h-6 object-contain" />
                    </div>
                    <p className="text-[7px] text-[#284952]">Bounced 1.0</p>
                    <p className="text-sm font-bold text-[#284952]">2.7%</p>
                  </div>
                  <div className="text-center">
                    <div className="w-7 h-7 mx-auto mb-1 flex items-center justify-center">
                      <img src="/assets/images/bounce_image1.png" alt="Bounced 2.0" className="w-6 h-6 object-contain" />
                    </div>
                    <p className="text-[7px] text-[#284952]">Bounced 2.0</p>
                    <p className="text-sm font-bold text-[#284952]">0.0%</p>
                  </div>
                  <div className="text-center">
                    <div className="w-7 h-7 mx-auto mb-1 flex items-center justify-center">
                      <img src="/assets/images/unclosed_image.png" alt="Unclosed" className="w-6 h-6 object-contain" />
                    </div>
                    <p className="text-[7px] text-[#284952]">Unclosed</p>
                    <p className="text-sm font-bold text-[#284952]">0.0%</p>
                  </div>
                </div>
              </motion.div>

              {/* Counseling Sessions Analysis - CENTERED NOW */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: showFullDashboard ? 1 : 0,
                  // Expert Centering: 150% x-offset perfectly centers a 3-column card in a 12-column grid
                  x: isCounselingHighlight ? "150%" : (showFullDashboard ? 0 : -20),
                  y: isCounselingHighlight ? -126 : 0,
                  scale: isCounselingHighlight ? 2.2 : 1,
                  transformZ: isCounselingHighlight ? 0.1 : 0, // Force high-fidelity GPU composition
                  zIndex: isCounselingHighlight ? 500 : 1,
                  // Expert Filter Fix: 'none' is used instead of 'blur(0px)' to avoid subpixel rasterization blur
                  filter: (anyFocusActive && !isCounselingHighlight)
                    ? "blur(3px) opacity(0.8) grayscale(20%)"
                    : "none",
                  boxShadow: isCounselingHighlight ? "0 60px 100px rgba(0,0,0,0.4)" : "0 1px 2px rgba(0,0,0,0.05)",
                  borderColor: isCounselingHighlight ? "#60BA81" : "#DEE2E6"
                }}
                style={{
                  willChange: "transform, opacity",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden"
                }}
                transition={{ duration: 0.6, ease: IOS_EASE }}
                className="bg-white rounded-lg border border-[#DEE2E6] p-2 shadow-sm flex-1 flex flex-col"
              >
                <h3 className="text-[9px] font-semibold text-[#284952] mb-1">Counseling Sessions Analysis</h3>
                <div className="flex-1 flex items-center justify-center">
                  <CounselingDonutChart showAnimation={showFullDashboard} progress={progress} />
                </div>
              </motion.div>

              {/* Complaints By Categories */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: showFullDashboard ? 1 : 0,
                  x: showFullDashboard ? 0 : -20,
                  filter: anyFocusActive ? "blur(3px) opacity(0.8) grayscale(20%)" : "blur(0px) opacity(1)"
                }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg border border-[#DEE2E6] p-2 shadow-sm flex-1 overflow-hidden"
              >
                <h3 className="text-[9px] font-semibold text-[#284952] mb-2">Complaints By Categories</h3>
                <div className="space-y-1.5">
                  {COMPLAINT_CATEGORIES.map((cat, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span className="text-[5px] text-[#767676] w-20 truncate">{cat.name}</span>
                      <div className="flex-1 h-2.5 bg-[#e6f5d7] rounded relative overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: showFullDashboard ? `${cat.percentage}%` : 0 }}
                          transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                          className="h-full bg-[#206E71] rounded"
                        />
                        {cat.percentage > 0 && (
                          <span className="absolute inset-y-0 right-1 flex items-center text-[4px] text-white pointer-events-none">
                            {cat.percentage}%
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[6px] text-[#767676] text-center mt-2 italic">Complaint Categories</p>
              </motion.div>
            </div>

            {/* CENTER COLUMN - 50% width */}
            <motion.div
              animate={{
                filter: anyFocusActive ? "blur(3px) opacity(0.8) grayscale(20%)" : "blur(0px) opacity(1)"
              }}
              className="col-span-6 flex flex-col gap-2"
            >
              <div className="grid grid-cols-2 gap-2">
                {/* Worker Happiness Score - Using Static Mode to prevent crashes */}
                <ScoreCard
                  title="Worker Happiness Score"
                  icon={Smile}
                  value={85}
                  factors={FACTORS_HAPPINESS}
                  factorLabel="Calculated Based On"
                  chartId="dashboardHappinessChart"
                  delay={0}
                  showFactors={showHappinessFactors}
                  iconColor={COLORS.freshGreen}
                  staticMode={!shouldRenderHeavyCharts} // Pass the flag
                />

                {/* Worker Safety Score - Using Static Mode */}
                <ScoreCard
                  title="Worker Safety Score"
                  icon={ShieldCheck}
                  value={92}
                  factors={FACTORS_SAFETY}
                  factorLabel="Worker Satisfaction Based On"
                  chartId="dashboardSafetyChart"
                  delay={0.1}
                  showFactors={showSafetyFactors}
                  iconColor={COLORS.warmOrange}
                  staticMode={!shouldRenderHeavyCharts} // Pass the flag
                />
              </div>

              {/* Employees Feedback Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showFullDashboard ? 1 : 0, y: showFullDashboard ? 0 : 20 }}
                transition={{ delay: 0.25 }}
                className="rounded-lg overflow-hidden shadow-sm"
              >
                <div className="bg-[#F5A83C] px-3 py-2">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-[10px] font-bold text-white">Employees Feedback / Suggestion List</h3>
                    <span className="bg-white/20 text-white text-[7px] px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="bg-white text-[#F5A83C] text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">46</span>
                      Feedbacks
                    </span>
                  </div>
                </div>
                <div className="bg-[#fff9f0] px-2 py-2">
                  <div className="flex gap-2 overflow-hidden">
                    {FEEDBACK_ITEMS.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: showFullDashboard ? 1 : 0, x: showFullDashboard ? 0 : 20 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="bg-white rounded-lg px-2 py-1.5 min-w-[130px] border-l-4 border-[#F5A83C] shadow-sm"
                      >
                        <p className="text-[7px] text-[#17161A] font-medium truncate">{item.title}</p>
                        <p className="text-[6px] text-[#767676]">{item.date}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Complaints by Gender */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showFullDashboard ? 1 : 0, y: showFullDashboard ? 0 : 20 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg border border-[#DEE2E6] p-2 shadow-sm flex-1"
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[9px] font-semibold text-[#284952]">Complaints by Gender</h3>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-[#4A90D9] rounded-sm"></span>
                      <span className="text-[6px] text-[#767676]">Male</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-[#E91E63] rounded-sm"></span>
                      <span className="text-[6px] text-[#767676]">Female</span>
                    </span>
                  </div>
                </div>
                <div className="space-y-0.5">
                  {GENDER_DATA.map((item, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span className="text-[5px] text-[#767676] w-14 truncate">{item.category}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: showFullDashboard ? `${Math.min(item.male * 4.5, 100)}%` : 0 }}
                          transition={{ delay: 0.4 + i * 0.03, duration: 0.4 }}
                          className="h-full bg-[#60BA81] rounded"
                        />
                        {item.male > 0 && (
                          <span className="absolute right-1 top-0 text-[5px] text-[#284952]">{item.male}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-6 mt-1.5 pt-1.5 border-t border-[#DEE2E6]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#4A90D9] text-[7px]">♂ MALE</span>
                    <span className="text-sm font-bold text-[#4A90D9]">36</span>
                    <span className="text-[5px] text-[#767676]">100.0%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#E91E63] text-[7px]">♀ FEMALE</span>
                    <span className="text-sm font-bold text-[#E91E63]">0</span>
                    <span className="text-[5px] text-[#767676]">0.0%</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN - 25% width */}
            <motion.div
              animate={{
                filter: anyFocusActive ? "blur(3px) opacity(0.8) grayscale(20%)" : "blur(0px) opacity(1)"
              }}
              className="col-span-3 flex flex-col gap-2"
            >
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: showFullDashboard ? 1 : 0, x: showFullDashboard ? 0 : 20 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg border border-[#DEE2E6] p-2 shadow-sm"
              >
                <h3 className="text-[9px] font-semibold text-[#284952] mb-2">Executive Summary</h3>
                <div className="flex items-center justify-center mb-2">
                  <div className="w-7 h-7 bg-[#F5F5F7] rounded flex items-center justify-center">
                    <Building2 size={14} className="text-[#284952]" />
                  </div>
                </div>
                <p className="text-[8px] text-center text-[#60BA81] font-semibold mb-2">Suppliers</p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[7px] text-[#767676]">Companies:</span>
                    <span className="text-[8px] font-bold text-[#60BA81]">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[7px] text-[#767676]">Employees:</span>
                    <span className="text-[8px] font-bold text-[#60BA81]">4671</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[7px] text-[#767676]">Investigation Officers:</span>
                    <span className="text-[8px] font-bold text-[#60BA81]">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[7px] text-[#767676]">Avg. Resolution Time:</span>
                    <span className="text-[8px] font-bold text-[#60BA81]">1 days 9 hrs</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: showFullDashboard ? 1 : 0, x: showFullDashboard ? 0 : 20 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg border border-[#DEE2E6] p-2 shadow-sm"
              >
                <h3 className="text-[9px] font-semibold text-[#284952] mb-2">Resolution Time Per Complaint</h3>
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#2D9480]">
                      <th className="text-[6px] text-white text-left px-1.5 py-1 rounded-l font-semibold">TIME TAKEN</th>
                      <th className="text-[6px] text-white text-right px-1.5 py-1 rounded-r font-semibold">NO OF COMPLAINTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RESOLUTION_TIME.map((item, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: showFullDashboard ? 1 : 0, x: showFullDashboard ? 0 : 10 }}
                        transition={{ delay: 0.25 + i * 0.05 }}
                        className={i % 2 === 0 ? "bg-[#f8f8f8]" : "bg-white"}
                      >
                        <td className="text-[6px] text-[#767676] px-1.5 py-1">{item.label}</td>
                        <td className="text-[7px] font-bold text-[#60BA81] text-right px-1.5 py-1">{item.count}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: showFullDashboard ? 1 : 0, x: showFullDashboard ? 0 : 20 }}
                transition={{ delay: 0.3 }}
                className="rounded-lg overflow-hidden flex-1 shadow-lg"
                style={{ background: "linear-gradient(to bottom right, #60BA81, #284952)" }}
              >
                <div className="bg-[#284952] px-2 py-1.5">
                  <div className="flex items-center gap-1">
                    <FileText size={10} className="text-white" />
                    <h3 className="text-[9px] font-bold text-white">Survey Reports</h3>
                  </div>
                </div>
                <div className="p-1.5 space-y-1 max-h-28 overflow-hidden bg-white">
                  {SURVEY_REPORTS.map((report, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: showFullDashboard ? 1 : 0, y: showFullDashboard ? 0 : 10 }}
                      transition={{ delay: 0.35 + i * 0.05 }}
                      className="border-b border-[#eee] pb-1 last:border-0"
                    >
                      <p className="text-[6px] text-[#284952] font-semibold truncate">{report.title}</p>
                      <div className="flex items-center justify-between mt-0.5">
                        <p className="text-[5px] text-[#767676]">{report.date}</p>
                        <div className="flex gap-0.5">
                          {report.hasView && (
                            <button className="bg-[#60BA81] text-white text-[5px] px-1 py-0.5 rounded flex items-center gap-0.5">
                              <Eye size={6} /> View
                            </button>
                          )}
                          {report.hasPdf && <button className="bg-[#E74C3C] text-white text-[5px] px-1 py-0.5 rounded">PDF</button>}
                          {report.hasCsv && (
                            <button className="bg-[#F5A83C] text-white text-[5px] px-1 py-0.5 rounded flex items-center gap-0.5">
                              <Download size={5} /> CSV
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div >

      {/* --- CINEMATIC MODAL OVERLAYS --- */}
      <AnimatePresence>
        {showDetailModal && (
          <motion.div
            key="detail-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[2000] flex items-center justify-center"
          >
            <SceneAI isActive={true} progress={progress} />
          </motion.div>
        )}
        {showTimelineModal && (
          <motion.div
            key="timeline-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[2000] flex items-center justify-center"
          >
            <SceneTimeline isActive={true} progress={progress} />
          </motion.div>
        )}
      </AnimatePresence>
    </div >
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