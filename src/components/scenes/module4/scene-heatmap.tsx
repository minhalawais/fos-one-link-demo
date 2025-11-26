"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  FileText,
  Eye,
  Download,
  Search,
  Clock,
  AlertCircle,
  MessageSquare,
  Users,
  Smile,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react"

interface SceneProps {
  isActive: boolean
  progress: number
  sceneProgress?: number
}

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

// Sites data with full dashboard stats per site
const sitesData: Record<string, SiteData> = {
  ILO: {
    name: "ILO",
    isCompany: true,
    units: 8,
    departments: 24,
    shifts: 3,
    totalComplaints: 365,
    anonymousComplaints: 45,
    completedComplaints: 298,
    inProcessComplaints: 67,
    complaintCategories: [
      { name: "Workplace Health, Safety and Environment", percentage: 4 },
      { name: "Freedom of Association", percentage: 0 },
      { name: "Child Labor", percentage: 0 },
      { name: "Wages & Benefits", percentage: 40 },
      { name: "Working Hours", percentage: 11 },
      { name: "Forced Labor", percentage: 0 },
      { name: "Discrimination", percentage: 1 },
      { name: "Unfair Employment", percentage: 2 },
      { name: "Ethical Business", percentage: 1 },
      { name: "Harassment", percentage: 3 },
      { name: "Workplace Discipline", percentage: 39 },
    ],
    genderData: { male: 320, female: 45 },
    resolutionTime: [
      { label: "Within same day", count: 180 },
      { label: "Within 3 days", count: 85 },
      { label: "Within 10 days", count: 28 },
      { label: "More than 10 days", count: 5 },
    ],
    happinessScore: 96,
    safetyScore: 85,
    hotspot: "CENTAURUS",
  },
  CENTAURUS: {
    name: "CENTAURUS",
    isCompany: false,
    units: 3,
    departments: 8,
    shifts: 3,
    totalComplaints: 37,
    anonymousComplaints: 12,
    completedComplaints: 25,
    inProcessComplaints: 12,
    complaintCategories: [
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
    ],
    genderData: { male: 36, female: 0 },
    resolutionTime: [
      { label: "Within same day", count: 21 },
      { label: "Within 3 days", count: 3 },
      { label: "Within 10 days", count: 1 },
      { label: "More than 10 days", count: 0 },
    ],
    happinessScore: 92,
    safetyScore: 78,
    hotspot: "Floor 2",
  },
  "BAHRIA PHASE-4": {
    name: "BAHRIA PHASE-4",
    isCompany: false,
    units: 4,
    departments: 12,
    shifts: 2,
    totalComplaints: 52,
    anonymousComplaints: 8,
    completedComplaints: 45,
    inProcessComplaints: 7,
    complaintCategories: [
      { name: "Workplace Health, Safety and Environment", percentage: 8 },
      { name: "Freedom of Association", percentage: 0 },
      { name: "Child Labor", percentage: 0 },
      { name: "Wages & Benefits", percentage: 35 },
      { name: "Working Hours", percentage: 15 },
      { name: "Forced Labor", percentage: 0 },
      { name: "Discrimination", percentage: 2 },
      { name: "Unfair Employment", percentage: 5 },
      { name: "Ethical Business", percentage: 0 },
      { name: "Harassment", percentage: 5 },
      { name: "Workplace Discipline", percentage: 30 },
    ],
    genderData: { male: 48, female: 4 },
    resolutionTime: [
      { label: "Within same day", count: 28 },
      { label: "Within 3 days", count: 12 },
      { label: "Within 10 days", count: 5 },
      { label: "More than 10 days", count: 0 },
    ],
    happinessScore: 88,
    safetyScore: 82,
    hotspot: "Unit B",
  },
  "F-10 MARKAZ": {
    name: "F-10 MARKAZ",
    isCompany: false,
    units: 2,
    departments: 6,
    shifts: 2,
    totalComplaints: 28,
    anonymousComplaints: 5,
    completedComplaints: 24,
    inProcessComplaints: 4,
    complaintCategories: [
      { name: "Workplace Health, Safety and Environment", percentage: 5 },
      { name: "Freedom of Association", percentage: 0 },
      { name: "Child Labor", percentage: 0 },
      { name: "Wages & Benefits", percentage: 45 },
      { name: "Working Hours", percentage: 8 },
      { name: "Forced Labor", percentage: 0 },
      { name: "Discrimination", percentage: 0 },
      { name: "Unfair Employment", percentage: 3 },
      { name: "Ethical Business", percentage: 2 },
      { name: "Harassment", percentage: 2 },
      { name: "Workplace Discipline", percentage: 35 },
    ],
    genderData: { male: 25, female: 3 },
    resolutionTime: [
      { label: "Within same day", count: 15 },
      { label: "Within 3 days", count: 6 },
      { label: "Within 10 days", count: 3 },
      { label: "More than 10 days", count: 0 },
    ],
    happinessScore: 94,
    safetyScore: 88,
    hotspot: "Section A",
  },
  "GIGA MALL": {
    name: "GIGA MALL",
    isCompany: false,
    units: 5,
    departments: 15,
    shifts: 3,
    totalComplaints: 68,
    anonymousComplaints: 15,
    completedComplaints: 55,
    inProcessComplaints: 13,
    complaintCategories: [
      { name: "Workplace Health, Safety and Environment", percentage: 6 },
      { name: "Freedom of Association", percentage: 1 },
      { name: "Child Labor", percentage: 0 },
      { name: "Wages & Benefits", percentage: 38 },
      { name: "Working Hours", percentage: 12 },
      { name: "Forced Labor", percentage: 0 },
      { name: "Discrimination", percentage: 2 },
      { name: "Unfair Employment", percentage: 4 },
      { name: "Ethical Business", percentage: 1 },
      { name: "Harassment", percentage: 4 },
      { name: "Workplace Discipline", percentage: 32 },
    ],
    genderData: { male: 58, female: 10 },
    resolutionTime: [
      { label: "Within same day", count: 32 },
      { label: "Within 3 days", count: 15 },
      { label: "Within 10 days", count: 6 },
      { label: "More than 10 days", count: 2 },
    ],
    happinessScore: 90,
    safetyScore: 84,
    hotspot: "Food Court",
  },
  "CHAKLALA SCH": {
    name: "CHAKLALA SCH",
    isCompany: false,
    units: 3,
    departments: 9,
    shifts: 2,
    totalComplaints: 42,
    anonymousComplaints: 7,
    completedComplaints: 38,
    inProcessComplaints: 4,
    complaintCategories: [
      { name: "Workplace Health, Safety and Environment", percentage: 3 },
      { name: "Freedom of Association", percentage: 0 },
      { name: "Child Labor", percentage: 0 },
      { name: "Wages & Benefits", percentage: 48 },
      { name: "Working Hours", percentage: 6 },
      { name: "Forced Labor", percentage: 0 },
      { name: "Discrimination", percentage: 1 },
      { name: "Unfair Employment", percentage: 2 },
      { name: "Ethical Business", percentage: 0 },
      { name: "Harassment", percentage: 2 },
      { name: "Workplace Discipline", percentage: 38 },
    ],
    genderData: { male: 40, female: 2 },
    resolutionTime: [
      { label: "Within same day", count: 25 },
      { label: "Within 3 days", count: 10 },
      { label: "Within 10 days", count: 3 },
      { label: "More than 10 days", count: 0 },
    ],
    happinessScore: 91,
    safetyScore: 86,
    hotspot: "Block C",
  },
  "GOLRA MOR": {
    name: "GOLRA MOR",
    isCompany: false,
    units: 4,
    departments: 10,
    shifts: 3,
    totalComplaints: 55,
    anonymousComplaints: 10,
    completedComplaints: 48,
    inProcessComplaints: 7,
    complaintCategories: [
      { name: "Workplace Health, Safety and Environment", percentage: 5 },
      { name: "Freedom of Association", percentage: 0 },
      { name: "Child Labor", percentage: 0 },
      { name: "Wages & Benefits", percentage: 42 },
      { name: "Working Hours", percentage: 10 },
      { name: "Forced Labor", percentage: 0 },
      { name: "Discrimination", percentage: 1 },
      { name: "Unfair Employment", percentage: 3 },
      { name: "Ethical Business", percentage: 1 },
      { name: "Harassment", percentage: 3 },
      { name: "Workplace Discipline", percentage: 35 },
    ],
    genderData: { male: 50, female: 5 },
    resolutionTime: [
      { label: "Within same day", count: 30 },
      { label: "Within 3 days", count: 12 },
      { label: "Within 10 days", count: 5 },
      { label: "More than 10 days", count: 1 },
    ],
    happinessScore: 89,
    safetyScore: 83,
    hotspot: "Wing North",
  },
}

interface SiteData {
  name: string
  isCompany: boolean
  units: number
  departments: number
  shifts: number
  totalComplaints: number
  anonymousComplaints: number
  completedComplaints: number
  inProcessComplaints: number
  complaintCategories: { name: string; percentage: number }[]
  genderData: { male: number; female: number }
  resolutionTime: { label: string; count: number }[]
  happinessScore: number
  safetyScore: number
  hotspot: string
}

const sitesList = ["ILO", "CENTAURUS", "BAHRIA PHASE-4", "F-10 MARKAZ", "GIGA MALL", "CHAKLALA SCH", "GOLRA MOR"]

// Feedback items
const FEEDBACK_ITEMS = [
  { title: "Poor Fitting Company Jackets", date: "Nov 13, 2025" },
  { title: "Shift Change Request Denied Unfairly", date: "Nov 12, 2025" },
  { title: "Delayed Clearance Payment Issue", date: "Nov 10, 2025" },
]

// Survey reports
const SURVEY_REPORTS = [
  { title: "Exit Interview Report June-25", date: "Jul 10, 2025", hasView: true },
  {
    title: "Employee Well Being Survey (CHZ Call Centre)",
    date: "Jun 30, 2025",
    hasView: true,
    hasPdf: true,
    hasCsv: true,
  },
  { title: "Quaterly Employee Due Diligence Survey & Assessment Report May-25", date: "Jun 19, 2025", hasView: true },
  { title: "Exit Interview Report May-25", date: "Jun 4, 2025", hasView: true },
]

// Gender data template
const GENDER_DATA = [
  { category: "Workplace Hea...", key: "health" },
  { category: "Freedom of Asso...", key: "freedom" },
  { category: "Child Labor", key: "child" },
  { category: "Wages & Benefi...", key: "wages" },
  { category: "Working Hours", key: "hours" },
  { category: "Forced Labor", key: "forced" },
  { category: "Discrimination", key: "disc" },
  { category: "Unfair Employme...", key: "unfair" },
  { category: "Ethical Business...", key: "ethical" },
  { category: "Harassment", key: "harass" },
  { category: "Discipline", key: "discipline" },
]

const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${src}"]`)
    if (existingScript) {
      resolve()
      return
    }

    const script = document.createElement("script")
    script.src = src
    script.async = true

    script.onload = () => {
      console.log(`Script loaded: ${src}`)
      resolve()
    }

    script.onerror = () => {
      console.error(`Failed to load script: ${src}`)
      reject(new Error(`Failed to load script: ${src}`))
    }

    document.head.appendChild(script)
  })

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

        if (mounted) {
          setScriptsLoaded(true)
        }
      } catch (error) {
        console.error("Failed to load JSCharting scripts:", error)
      }
    }

    loadScripts()

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    if (!scriptsLoaded || !chartRef.current) return

    let mounted = true

    const initChart = async () => {
      // @ts-ignore
      const JSC = window.JSC

      if (!JSC || !mounted) {
        console.warn("JSC not available or component unmounted")
        return
      }

      if (chartInstance.current) {
        try {
          chartInstance.current.dispose()
        } catch (e) {
          console.warn("Error disposing old chart:", e)
        }
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
              line: {
                width: 10,
                breaks: {},
                color: "smartPalette:pal1",
              },
              scale_range: [minValue, maxValue],
            },

            {
              id: "ax2",
              scale_range: [minValue, maxValue],
              defaultTick: { padding: 10, enabled: false },
              customTicks: [minValue, maxValue],
              line: {
                width: 10,
                color: "smartPalette:pal2",
              },
            },
          ],

          defaultSeries: {
            type: "gauge column roundcaps",
            shape: {
              label: {
                text: "%max",
                align: "center",
                verticalAlign: "middle",
                style_fontSize: 20,
              },
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
        try {
          chartInstance.current.dispose()
        } catch (e) {
          console.warn("Error disposing chart on unmount:", e)
        }
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
}) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay, ease: "backOut" }}
      className="bg-white rounded-xl border border-[#DEE2E6]/60 p-3 flex flex-col items-center relative overflow-hidden shadow-sm"
    >
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-1">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon size={14} style={{ color: iconColor }} />
        </div>
        <h2 className="text-[10px] font-bold" style={{ color: COLORS.deepTeal }}>
          {title}
        </h2>
      </div>

      {/* CHART */}
      <div className="relative flex items-center justify-center" style={{ minHeight: 160 }}>
        <JSChartingCircularColorBar value={value} chartId={chartId} />
      </div>
    </motion.div>
  )
}

export function SceneHeatmap({ isActive, progress }: SceneProps) {
  const [selectedSite, setSelectedSite] = useState("CENTAURUS")
  const [sliderPosition, setSliderPosition] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const currentSiteData = sitesData[selectedSite]

  // Voiceover sync states
  const showDashboard = progress >= 30.64
  const showFilters = progress >= 30.64
  const highlightUnit = progress >= 35.56 && progress < 37.5
  const highlightDept = progress >= 37.5 && progress < 39
  const highlightShift = progress >= 39 && progress < 40.12
  const showHotspots = progress >= 40.12
  const showHappinessFactors = progress >= 31.5
  const showSafetyFactors = progress >= 32.5

  // Auto-animate site selection during voiceover to show dashboard updating
  useEffect(() => {
    if (progress >= 31 && progress < 33) {
      setSelectedSite("CENTAURUS")
    } else if (progress >= 36 && progress < 38) {
      setSelectedSite("BAHRIA PHASE-4")
    } else if (progress >= 39 && progress < 41) {
      setSelectedSite("GIGA MALL")
    } else if (progress >= 41.5 && progress < 43.4) {
      setSelectedSite("ILO")
    }
  }, [progress])

  const handleSlide = (direction: "left" | "right") => {
    const maxSlide = Math.max(0, (sitesList.length - 5) * 60)
    if (direction === "left") {
      setSliderPosition(Math.max(0, sliderPosition - 120))
    } else {
      setSliderPosition(Math.min(maxSlide, sliderPosition + 120))
    }
  }

  return (
    <div className="w-full h-full bg-[#F5F5F7] relative overflow-hidden font-sans">
      {/* Subtle ambient glow */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#60BA81]/5 rounded-full blur-[120px]"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      />

      {/* Dashboard Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{
          opacity: showDashboard ? 1 : 0,
          scale: showDashboard ? 1 : 0.95,
          y: showDashboard ? 0 : 30,
        }}
        transition={{ duration: 0.8, ease: IOS_EASE }}
        className="relative z-10 w-full h-full flex flex-col"
      >
        {/* ===== HEADER BAR ===== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: showDashboard ? 1 : 0, y: showDashboard ? 0 : -20 }}
          transition={{ duration: 0.5, ease: IOS_EASE }}
          className="bg-white border-b border-[#DEE2E6] px-4 py-2 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src="/assets/vertical_logo.png" alt="FOS Logo" className="w-32 h-32 object-contain" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-[#E74C3C] font-semibold tracking-wide">COMPANY_A</span>
            <span className="text-sm font-bold text-[#284952]">Human Rights Due Diligence Dashboard</span>
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
        <div className="flex-1 overflow-hidden p-2">
          {/* ===== TOP FILTER ROW ===== */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: showFilters ? 1 : 0, y: showFilters ? 0 : 10 }}
            transition={{ duration: 0.5, delay: 0.1, ease: IOS_EASE }}
            className="bg-[#DEE2E6] rounded-lg p-2 mb-2"
          >
            <div className="grid grid-cols-12 gap-2">
              {/* Statistics Section */}
              <div className="col-span-3 bg-white rounded-lg p-2">
                <div className="text-[8px] font-bold text-[#17161A] mb-1 text-center">STATISTICS</div>
                <div className="bg-gradient-to-r from-[#60BA81] to-[#4e9e6b] rounded-md px-3 py-2 flex items-center justify-center gap-2">
                  <span className="text-white text-[9px] font-medium">All Time Complaints:</span>
                  <motion.span
                    key={currentSiteData.totalComplaints}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-white text-lg font-bold bg-white/20 px-2 py-0.5 rounded"
                  >
                    {currentSiteData.totalComplaints}
                  </motion.span>
                </div>
              </div>

              {/* Sites Filter - Horizontal Slider */}
              <div className="col-span-6 bg-white rounded-lg p-2">
                <div className="text-[8px] font-bold text-[#17161A] mb-1 text-center">SITES FILTER</div>
                <div className="flex items-center gap-1 overflow-hidden relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="shrink-0 w-5 h-5 flex items-center justify-center"
                  >
                    <ChevronDown
                      size={12}
                      className={`text-[#284952] transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Left Arrow */}
                  <button
                    onClick={() => handleSlide("left")}
                    className={`shrink-0 w-4 h-4 rounded-full bg-white shadow flex items-center justify-center hover:bg-[#F5F5F7] transition-all ${sliderPosition === 0 ? "opacity-0" : "opacity-100"}`}
                  >
                    <ChevronLeft size={10} className="text-[#284952]" />
                  </button>

                  <div className="flex-1 overflow-hidden">
                    <motion.div
                      className="flex gap-1.5 items-end"
                      animate={{ x: -sliderPosition }}
                      transition={{ duration: 0.5, ease: IOS_EASE }}
                    >
                      {sitesList.map((site, i) => {
                        const isSelected = selectedSite === site
                        const siteInfo = sitesData[site]
                        return (
                          <div key={site} className="flex items-end">
                            <motion.button
                              onClick={() => setSelectedSite(site)}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: showFilters ? 1 : 0, scale: showFilters ? 1 : 0.8 }}
                              transition={{ delay: 0.2 + i * 0.02 }}
                              className="flex flex-col items-center shrink-0"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <motion.div
                                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                  isSelected
                                    ? "border-[#284952] bg-[#284952] ring-2 ring-[#60BA81] ring-offset-1"
                                    : "border-[#60BA81]/30 bg-white hover:bg-[#F5F5F7]"
                                }`}
                                animate={{ scale: isSelected ? 1.15 : 1 }}
                              >
                                {siteInfo.isCompany ? (
                                  <img
                                    src="/assets/company_logo.png"
                                    alt={site}
                                    className={`w-4 h-4 object-contain ${isSelected ? "filter brightness-0 invert" : ""}`}
                                  />
                                ) : (
                                  <Building2 size={12} className={isSelected ? "text-white" : "text-[#284952]"} />
                                )}
                              </motion.div>
                              <span
                                className={`text-[5px] mt-0.5 w-10 text-center truncate transition-colors ${
                                  isSelected ? "text-[#284952] font-semibold" : "text-[#767676]"
                                }`}
                              >
                                {site}
                              </span>
                            </motion.button>
                            {/* Line separator after ILO */}
                            {i === 0 && <div className="w-px h-8 bg-[#DEE2E6] mx-1 shrink-0" />}
                          </div>
                        )
                      })}
                    </motion.div>
                  </div>

                  {/* Right Arrow */}
                  <button
                    onClick={() => handleSlide("right")}
                    className={`shrink-0 w-4 h-4 rounded-full bg-white shadow flex items-center justify-center hover:bg-[#F5F5F7] transition-all ${sliderPosition >= (sitesList.length - 5) * 60 ? "opacity-0" : "opacity-100"}`}
                  >
                    <ChevronRight size={10} className="text-[#284952]" />
                  </button>
                </div>
              </div>

              {/* Filters & Search section */}
              <div className="col-span-3 bg-white rounded-lg p-2">
                <div className="text-[8px] font-bold text-[#17161A] mb-1 text-center">FILTERS</div>
                <div className="grid grid-cols-2 gap-1">
                  <div>
                    <div className="text-[6px] text-[#767676] text-center mb-0.5">SEARCH</div>
                    <div className="bg-[#F5F5F7] rounded h-6 flex items-center justify-center">
                      <Search size={10} className="text-[#767676]" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[6px] text-[#767676] text-center mb-0.5">DATE RANGE</div>
                    <div className="bg-[#F5F5F7] rounded h-6 flex items-center justify-center px-1">
                      <span className="text-[6px] text-[#17161A]">Oct 28, 2025 - Nov 26, 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ===== STAT CARDS ROW ===== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showDashboard ? 1 : 0 }}
            className="grid grid-cols-4 gap-2 mb-2"
          >
            <AnimatePresence mode="wait">
              {[
                { label: "Total Complaints", value: currentSiteData.totalComplaints },
                { label: "Anonymous Complaints", value: currentSiteData.anonymousComplaints },
                { label: "Completed Complaints", value: currentSiteData.completedComplaints },
                { label: "In Process Complaints", value: currentSiteData.inProcessComplaints },
              ].map((stat, i) => (
                <motion.div
                  key={`${selectedSite}-${stat.label}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: IOS_EASE }}
                  className="relative bg-[#60BA81] rounded-lg p-3 overflow-hidden"
                >
                  <motion.p
                    key={stat.value}
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-white"
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-[9px] text-white/90">{stat.label}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ===== MAIN DASHBOARD GRID ===== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showDashboard ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-12 gap-2"
            style={{ height: "calc(100% - 140px)" }}
          >
            {/* LEFT COLUMN */}
            <div className="col-span-3 flex flex-col gap-2">
              {/* Complaints Status Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: showDashboard ? 1 : 0, x: showDashboard ? 0 : -20 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg border border-[#DEE2E6] p-2 shadow-sm"
              >
                <h3 className="text-[9px] font-semibold text-[#284952] mb-2">Complaints Status</h3>
                <div className="flex justify-around">
                  {[
                    { label: "Bounced 1.0", value: "2.7%", img: "/assets/bounced_image.png" },
                    { label: "Bounced 2.0", value: "0.0%", img: "/assets/bounced_image1.png" },
                    { label: "Unclosed", value: "0.0%", img: "/assets/unclosed_image.png" },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <div className="w-7 h-7 mx-auto mb-1 flex items-center justify-center">
                        <img src={item.img || "/placeholder.svg"} alt={item.label} className="w-6 h-6 object-contain" />
                      </div>
                      <p className="text-[7px] text-[#284952]">{item.label}</p>
                      <p className="text-sm font-bold text-[#284952]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Counseling Sessions Analysis */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: showDashboard ? 1 : 0, x: showDashboard ? 0 : -20 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg border border-[#DEE2E6] p-2 shadow-sm flex-1"
              >
                <h3 className="text-[9px] font-semibold text-[#284952] mb-1">Counseling Sessions Analysis</h3>
                <div className="flex items-center justify-center h-24">
                  <CounselingDonutChart showAnimation={showDashboard} />
                </div>
              </motion.div>

              {/* Complaints By Categories */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: showDashboard ? 1 : 0, x: showDashboard ? 0 : -20 }}
                transition={{ delay: 0.3 }}
                className={`bg-white rounded-lg border p-2 shadow-sm flex-1 overflow-hidden transition-all duration-500 ${
                  showHotspots ? "border-2 border-[#60BA81] ring-2 ring-[#60BA81]/20" : "border-[#DEE2E6]"
                }`}
              >
                <h3 className="text-[9px] font-semibold text-[#284952] mb-2">Complaints By Categories</h3>
                <div className="space-y-1.5">
                  <AnimatePresence mode="wait">
                    {currentSiteData.complaintCategories.map((cat, i) => (
                      <motion.div
                        key={`${selectedSite}-${cat.name}`}
                        className="flex items-center gap-1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ delay: i * 0.02 }}
                      >
                        <span className="text-[5px] text-[#767676] w-20 truncate">{cat.name}</span>
                        <div className="flex-1 h-2.5 bg-[#e6f5d7] rounded overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${cat.percentage}%` }}
                            transition={{ delay: 0.2 + i * 0.03, duration: 0.5 }}
                            className="h-full bg-[#206E71] rounded"
                          />
                        </div>
                        <span className="text-[6px] text-[#284952] w-6 text-right font-medium">{cat.percentage}%</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <p className="text-[6px] text-[#767676] text-center mt-2 italic">Complaint Categories</p>
              </motion.div>
            </div>

            {/* CENTER COLUMN */}
            <div className="col-span-6 flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <ScoreCard
                  title="Worker Happiness Score"
                  icon={Smile}
                  value={currentSiteData.happinessScore}
                  factors={FACTORS_HAPPINESS}
                  factorLabel="Calculated Based On"
                  chartId={`heatmapHappinessChart-${selectedSite}`}
                  delay={0}
                  showFactors={showHappinessFactors}
                  iconColor={COLORS.freshGreen}
                />

                <ScoreCard
                  title="Worker Safety Score"
                  icon={ShieldCheck}
                  value={currentSiteData.safetyScore}
                  factors={FACTORS_SAFETY}
                  factorLabel="Worker Satisfaction Based On"
                  chartId={`heatmapSafetyChart-${selectedSite}`}
                  delay={0.1}
                  showFactors={showSafetyFactors}
                  iconColor={COLORS.warmOrange}
                />
              </div>

              {/* Employees Feedback Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showDashboard ? 1 : 0, y: showDashboard ? 0 : 20 }}
                transition={{ delay: 0.25 }}
                className="rounded-lg overflow-hidden shadow-sm"
              >
                <div className="bg-[#F5A83C] px-3 py-2">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-[10px] font-bold text-white">Employees Feedback / Suggestion List</h3>
                    <span className="bg-white/20 text-white text-[7px] px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="bg-white text-[#F5A83C] text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        46
                      </span>
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
                        animate={{ opacity: showDashboard ? 1 : 0, x: showDashboard ? 0 : 20 }}
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
                animate={{ opacity: showDashboard ? 1 : 0, y: showDashboard ? 0 : 20 }}
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
                  {GENDER_DATA.map((item, i) => {
                    const catData = currentSiteData.complaintCategories[i]
                    const maleValue = Math.round(((catData?.percentage || 0) * currentSiteData.genderData.male) / 100)
                    return (
                      <div key={i} className="flex items-center gap-1">
                        <span className="text-[5px] text-[#767676] w-14 truncate">{item.category}</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded relative">
                          <motion.div
                            key={`${selectedSite}-${item.key}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(maleValue * 4.5, 100)}%` }}
                            transition={{ delay: 0.4 + i * 0.03, duration: 0.4 }}
                            className="h-full bg-[#60BA81] rounded"
                          />
                          {maleValue > 0 && (
                            <span className="absolute right-1 top-0 text-[5px] text-[#284952]">{maleValue}</span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
                {/* Gender Summary */}
                <div className="flex justify-center gap-6 mt-1.5 pt-1.5 border-t border-[#DEE2E6]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#4A90D9] text-[7px]">♂ MALE</span>
                    <motion.span
                      key={`${selectedSite}-male`}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-sm font-bold text-[#4A90D9]"
                    >
                      {currentSiteData.genderData.male}
                    </motion.span>
                    <span className="text-[5px] text-[#767676]">
                      {(
                        (currentSiteData.genderData.male /
                          (currentSiteData.genderData.male + currentSiteData.genderData.female)) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#E91E63] text-[7px]">♀ FEMALE</span>
                    <motion.span
                      key={`${selectedSite}-female`}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-sm font-bold text-[#E91E63]"
                    >
                      {currentSiteData.genderData.female}
                    </motion.span>
                    <span className="text-[5px] text-[#767676]">
                      {(
                        (currentSiteData.genderData.female /
                          (currentSiteData.genderData.male + currentSiteData.genderData.female)) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Complaints by Days */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showDashboard ? 1 : 0, y: showDashboard ? 0 : 20 }}
                transition={{ delay: 0.35 }}
                className="bg-white rounded-lg border border-[#DEE2E6] p-2 shadow-sm"
              >
                <h3 className="text-[9px] font-semibold text-[#284952] mb-1">Complaints by Days</h3>
                <div className="h-14">
                  <ComplaintLineChart showAnimation={showDashboard} />
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="col-span-3 flex flex-col gap-2">
              {/* Executive Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: showDashboard ? 1 : 0, x: showDashboard ? 0 : 20 }}
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

              {/* Resolution Time Per Complaint */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: showDashboard ? 1 : 0, x: showDashboard ? 0 : 20 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg border border-[#DEE2E6] p-2 shadow-sm"
              >
                <h3 className="text-[9px] font-semibold text-[#284952] mb-2">Resolution Time Per Complaint</h3>
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#2D9480]">
                      <th className="text-[6px] text-white text-left px-1.5 py-1 rounded-l font-semibold">
                        TIME TAKEN
                      </th>
                      <th className="text-[6px] text-white text-right px-1.5 py-1 rounded-r font-semibold">
                        NO OF COMPLAINTS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence mode="wait">
                      {currentSiteData.resolutionTime.map((item, i) => (
                        <motion.tr
                          key={`${selectedSite}-${item.label}`}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ delay: 0.25 + i * 0.05 }}
                          className={i % 2 === 0 ? "bg-[#f8f8f8]" : "bg-white"}
                        >
                          <td className="text-[6px] text-[#767676] px-1.5 py-1">{item.label}</td>
                          <td className="text-[7px] font-bold text-[#60BA81] text-right px-1.5 py-1">{item.count}</td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </motion.div>

              {/* Survey Reports */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: showDashboard ? 1 : 0, x: showDashboard ? 0 : 20 }}
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
                      animate={{ opacity: showDashboard ? 1 : 0, y: showDashboard ? 0 : 10 }}
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
                          {report.hasPdf && (
                            <button className="bg-[#E74C3C] text-white text-[5px] px-1 py-0.5 rounded">PDF</button>
                          )}
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
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

// Helper Components
function CounselingDonutChart({ showAnimation }: { showAnimation: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-28 h-28">
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#60BA81"
        strokeWidth="12"
        strokeDasharray="70 251.2"
        strokeDashoffset="0"
        initial={{ strokeDasharray: "0 251.2" }}
        animate={{ strokeDasharray: showAnimation ? "70 251.2" : "0 251.2" }}
        transition={{ delay: 0.3, duration: 0.8 }}
        transform="rotate(-90 50 50)"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#F5A83C"
        strokeWidth="12"
        strokeDasharray="55 251.2"
        strokeDashoffset="-70"
        initial={{ strokeDasharray: "0 251.2" }}
        animate={{ strokeDasharray: showAnimation ? "55 251.2" : "0 251.2" }}
        transition={{ delay: 0.4, duration: 0.8 }}
        transform="rotate(-90 50 50)"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#284952"
        strokeWidth="12"
        strokeDasharray="50 251.2"
        strokeDashoffset="-125"
        initial={{ strokeDasharray: "0 251.2" }}
        animate={{ strokeDasharray: showAnimation ? "50 251.2" : "0 251.2" }}
        transition={{ delay: 0.5, duration: 0.8 }}
        transform="rotate(-90 50 50)"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#E74C3C"
        strokeWidth="12"
        strokeDasharray="40 251.2"
        strokeDashoffset="-175"
        initial={{ strokeDasharray: "0 251.2" }}
        animate={{ strokeDasharray: showAnimation ? "40 251.2" : "0 251.2" }}
        transition={{ delay: 0.6, duration: 0.8 }}
        transform="rotate(-90 50 50)"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#9CA3AF"
        strokeWidth="12"
        strokeDasharray="36.2 251.2"
        strokeDashoffset="-215"
        initial={{ strokeDasharray: "0 251.2" }}
        animate={{ strokeDasharray: showAnimation ? "36.2 251.2" : "0 251.2" }}
        transition={{ delay: 0.7, duration: 0.8 }}
        transform="rotate(-90 50 50)"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="24"
        fill="none"
        stroke="#60BA81"
        strokeWidth="10"
        strokeDasharray="90 150.8"
        strokeDashoffset="0"
        initial={{ strokeDasharray: "0 150.8" }}
        animate={{ strokeDasharray: showAnimation ? "90 150.8" : "0 150.8" }}
        transition={{ delay: 0.8, duration: 0.8 }}
        transform="rotate(-90 50 50)"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="24"
        fill="none"
        stroke="#E74C3C"
        strokeWidth="10"
        strokeDasharray="35 150.8"
        strokeDashoffset="-90"
        initial={{ strokeDasharray: "0 150.8" }}
        animate={{ strokeDasharray: showAnimation ? "35 150.8" : "0 150.8" }}
        transition={{ delay: 0.9, duration: 0.8 }}
        transform="rotate(-90 50 50)"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="24"
        fill="none"
        stroke="#F5A83C"
        strokeWidth="10"
        strokeDasharray="25.8 150.8"
        strokeDashoffset="-125"
        initial={{ strokeDasharray: "0 150.8" }}
        animate={{ strokeDasharray: showAnimation ? "25.8 150.8" : "0 150.8" }}
        transition={{ delay: 1, duration: 0.8 }}
        transform="rotate(-90 50 50)"
      />
      <text x="25" y="25" className="text-[7px] fill-[#60BA81] font-bold">
        22
      </text>
      <text x="70" y="32" className="text-[7px] fill-[#F5A83C] font-bold">
        38
      </text>
      <text x="60" y="72" className="text-[7px] fill-[#284952] font-bold">
        102
      </text>
      <text x="28" y="75" className="text-[7px] fill-[#E74C3C] font-bold">
        124
      </text>
    </svg>
  )
}

function ComplaintLineChart({ showAnimation }: { showAnimation: boolean }) {
  const data = [2, 5, 3, 8, 4, 6, 3, 7, 5, 4, 6, 8, 5, 3, 6, 4, 7, 5, 8, 6, 4, 5, 7, 3, 6, 4, 5, 8, 6]
  const maxValue = Math.max(...data)
  const width = 400
  const height = 50
  const padding = 5

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - 2 * padding)
    const y = height - padding - (value / maxValue) * (height - 2 * padding)
    return `${x},${y}`
  })

  const pathD = `M ${points.join(" L ")}`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      <motion.path
        d={pathD}
        fill="none"
        stroke="#60BA81"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: showAnimation ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      {data.map((value, index) => {
        const x = padding + (index / (data.length - 1)) * (width - 2 * padding)
        const y = height - padding - (value / maxValue) * (height - 2 * padding)
        return (
          <motion.circle
            key={index}
            cx={x}
            cy={y}
            r="2"
            fill="#60BA81"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: showAnimation ? 1 : 0, scale: showAnimation ? 1 : 0 }}
            transition={{ delay: 0.5 + index * 0.03 }}
          />
        )
      })}
    </svg>
  )
}
