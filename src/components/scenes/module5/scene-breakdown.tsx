"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMemo, useRef, useState, useEffect } from "react"
import {
  Building2, Search, Bell, Settings, LogOut,
  Smile, ShieldCheck, Download, FileText, Eye,
  Menu, Clock, AlertCircle, MessageSquare,
  Briefcase, HeartPulse, UserX, AlertTriangle, Scale,
  Users, ChevronLeft, ChevronRight
} from "lucide-react"

// --- CONSTANTS ---
const SPRING_CONFIG = { type: "spring", stiffness: 150, damping: 20 }
const IOS_EASE = [0.22, 1, 0.36, 1]

const COLORS = {
  deepTeal: "#284952",
  freshGreen: "#60BA81",
  warmOrange: "#F5A83C",
  charcoal: "#17161A",
  lightGray: "#F5F5F7",
  white: "#FFFFFF",
  barTrack: "#F0F2F5",
  textGray: "#767676",
}

const CATEGORIES = [
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

const FEEDBACKS = [
  { id: 1, text: "Request for Transfer to Mardan Branch due to family residence shift.", date: "Jan 28, 2026" },
  { id: 2, text: "Suggestion for introducing monthly best employee awards and recognition.", date: "Jan 28, 2026" },
  { id: 3, text: "Loan facility request for urgent domestic financial requirements.", date: "Jan 28, 2026" },
  { id: 4, text: "New uniform replacement request for the night shift team members.", date: "Jan 27, 2026" },
  { id: 5, text: "Safety Concern: Periodic inspection of electrical wiring in Bay 3.", date: "Jan 26, 2026" },
  { id: 6, text: "Suggestion for more water coolers near cafeteria and warehouse.", date: "Jan 25, 2026" },
]

const GENDER_DATA = [
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

// --- RESPONSIVE CONTAINER ---
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
      setScale(Math.min(scaleX, scaleY) * 0.92)
    }

    handleResize()
    const observer = new ResizeObserver(handleResize)
    if (containerRef.current && containerRef.current.parentElement) {
      observer.observe(containerRef.current.parentElement)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden bg-[#F5F5F7]">
      <div
        style={{
          width: 1280,
          height: 720, // Restore standard height
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
        className="shrink-0 relative"
      >
        {children}
      </div>
    </div>
  )
}

interface SceneBreakdownProps {
  isActive: boolean
  sceneProgress?: number
  progress?: number
}

export const SceneBreakdown = ({ isActive, sceneProgress, progress }: SceneBreakdownProps) => {
  // Sync with global player timing (51s - 114s)
  const calculatedProgress = useMemo(() => {
    if (sceneProgress !== undefined) return sceneProgress
    if (progress === undefined) return 0
    const start = 51
    const end = 114 // Extended to include Feedback and Performance
    const dur = end - start
    return Math.min(1, Math.max(0, (progress - start) / dur))
  }, [sceneProgress, progress])

  // --- SUB-PHASES (51-114s | 63s Total Window) ---
  const zoomPhase = Math.min(1, calculatedProgress / 0.24) // 51-66s (Categories)

  const focusDaily = calculatedProgress > 0.24 && calculatedProgress <= 0.32 // 66-71s
  const focusGender = calculatedProgress > 0.32 && calculatedProgress <= 0.40 // 71-76s
  const focusFeedback = calculatedProgress > 0.40 && calculatedProgress <= 0.81 // Bridged: 76-102s (covers gap until remount)
  const focusPerformance = calculatedProgress > 0.81 && calculatedProgress <= 1.0 // 102-114s

  // Strictly for the first sub-phase
  const isZoomed = calculatedProgress > 0.05 && calculatedProgress <= 0.24

  // Zoom sequence: 0->1 (in), then 1->0 (out)
  const zoomFactor = zoomPhase < 0.5
    ? Math.min(1, zoomPhase * 4) // Zooming in fast
    : Math.max(0, 1 - (zoomPhase - 0.7) * 4) // Zooming out fast

  const activeIds = zoomPhase > 0.3 ? ["wages", "hours", "harassment", "health"] : []

  const anyFocusActive = focusGender || focusDaily || focusFeedback || focusPerformance

  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: IOS_EASE }}
    >
      <ResponsiveContainer>
        <div className="w-full h-full relative">
          {/* === MAIN CONTENT GRID (Background) === */}
          <MockDashboardBottomGrid
            isBlurred={isZoomed ? true : false}
            focusGender={focusGender}
            focusDaily={focusDaily}
            focusFeedback={focusFeedback}
            focusPerformance={focusPerformance}
            isActive={isActive}
            calculatedProgress={calculatedProgress}
          />

          {/* === THE FLOATING FOCUS CARD === */}
          <motion.div
            initial={false}
            animate={{
              // Recalibrated for 720px static height
              // grid placeholder is at Left Col, after 1 item
              top: isZoomed ? 30 : 16,
              left: isZoomed ? 80 : 16,
              width: isZoomed ? 1120 : 300,
              height: isZoomed ? 660 : 500,
              opacity: (anyFocusActive && !isZoomed) ? 0.65 : 1,
              filter: (anyFocusActive && !isZoomed) ? "blur(4px) grayscale(20%)" : "none",
              pointerEvents: isZoomed ? "all" : "none",
              zIndex: isZoomed ? 100 : 30,
              boxShadow: isZoomed ? "0 80px 160px -30px rgba(0,0,0,0.4)" : "0 1px 2px rgba(0,0,0,0.05)"
            }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="absolute bg-white rounded-xl border border-[#DEE2E6] flex flex-col"
          >
            <div className={`flex flex-col h-full bg-white ${isZoomed ? 'p-8 pb-4' : 'p-5 py-6'}`}>
              {/* Card Header */}
              <motion.div layout="position" className={`flex justify-between items-center shrink-0 ${isZoomed ? 'mb-6' : 'mb-6'}`}>
                <h2 className={`font-bold text-[#17161A] ${isZoomed ? 'text-3xl tracking-tight' : 'text-[14px] font-black text-[#555555] uppercase tracking-wide'}`}>
                  Complaints By Categories
                </h2>
              </motion.div>

              {/* Card Content */}
              <div className={`flex-1 flex flex-col overflow-hidden ${isZoomed ? 'gap-1' : 'justify-between py-1'}`}>
                {CATEGORIES.map((cat, idx) => {
                  const isHighlighted = activeIds.includes(cat.id)
                  const isDimmed = isZoomed && activeIds.length > 0 && !isHighlighted

                  if (isZoomed) {
                    return (
                      <motion.div
                        key={cat.id}
                        layout="position"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: isDimmed ? 0.3 : 1,
                          scale: isHighlighted ? 1.02 : 1,
                        }}
                        className={`flex items-center gap-4 px-4 ${isZoomed ? 'py-2' : 'py-0.5'}`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-500 ${isHighlighted ? 'bg-[#60BA81] text-white' : 'bg-gray-100 text-gray-400'}`}>
                          <cat.icon size={16} />
                        </div>

                        <div className="w-[300px] shrink-0">
                          <span className={`text-sm font-medium transition-colors duration-300 ${isHighlighted ? 'text-[#284952] font-bold' : 'text-[#767676]'}`}>
                            {cat.name}
                          </span>
                        </div>

                        <div className="flex-1 h-3 bg-[#F0F2F5] rounded-full overflow-visible relative">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: isHighlighted ? COLORS.freshGreen : "#CCCCCC" }}
                            initial={{ width: 0 }}
                            animate={{ width: isActive ? `${(cat.value / 41) * 100}%` : 0 }}
                            transition={{ duration: 1, ease: "circOut", delay: idx * 0.05 }}
                          />
                        </div>

                        <div className="w-12 text-right">
                          <span className={`text-sm font-bold ${isHighlighted ? 'text-[#60BA81]' : 'text-gray-400'}`}>
                            {cat.value}%
                          </span>
                        </div>
                      </motion.div>
                    )
                  }

                  return (
                    <div key={cat.id} className="flex flex-col gap-1.5 w-full px-1">
                      <div className="flex justify-between items-center w-full mb-0.5">
                        <span className="text-[11px] font-bold text-[#555555] leading-none">{cat.name}</span>
                        <span className="text-[11px] font-bold text-[#767676] leading-none">{cat.value}%</span>
                      </div>
                      <div className="h-2 w-full bg-[#E9F5E9] rounded-full overflow-hidden">
                        <div style={{ width: `${cat.value}%` }} className="h-full bg-[#206E71] rounded-full" />
                      </div>
                    </div>
                  )
                })}
              </div>

              {!isZoomed && (
                <div className="text-center italic text-[#767676] text-[10px] mt-2 underline decoration-[#206E71]/20 pb-1">
                  Complaint Categories
                </div>
              )}
            </div>
          </motion.div>

          <AnimatePresence>
            {isZoomed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                // Explicitly disable pointer events to prevent "z-index trap"
                className="absolute inset-0 bg-white/60 backdrop-blur-sm z-40 pointer-events-none"
                style={{ top: 0 }}
              />
            )}
          </AnimatePresence>
        </div>
      </ResponsiveContainer>
    </motion.div>
  )
}

// --- SUB-COMPONENTS ---

const MockDashboardBottomGrid = ({ isBlurred, focusGender, focusDaily, focusFeedback, focusPerformance, isActive, calculatedProgress }: any) => {
  const anyFocusActive = focusGender || focusDaily || focusFeedback || focusPerformance

  const getBlurStyle = (isSectionFocused: boolean) => ({
    filter: (isBlurred || (anyFocusActive && !isSectionFocused)) ? "blur(4px) opacity(0.65) grayscale(20%)" : "none",
    transition: "all 0.8s ease-in-out",
    pointerEvents: (isBlurred || (anyFocusActive && !isSectionFocused)) ? "none" : "all"
  })

  // Ensure progress never exceeds 1 or goes below 0 to prevent spring physics "over-stretching"
  // Clamped for the active 12s window (76-88s | 0.40-0.587)
  const feedbackPhaseProgress = Math.min(1, Math.max(0, (calculatedProgress - 0.40) / 0.19))

  // Ensure we don't scroll into empty white space by limiting the max translation
  const maxTranslation = -(FEEDBACKS.length * 200) + 600
  const sliderTranslateX = Math.max(
    -feedbackPhaseProgress * (FEEDBACKS.length * 200),
    maxTranslation
  )

  return (
    <div className="flex flex-col gap-2 flex-1">
      <div className="grid grid-cols-12 gap-4 h-[500px]">
        {/* LEFT - SLOT FOR CATEGORIES */}
        <div className="col-span-3 flex flex-col gap-4" style={getBlurStyle(false)}>
          <div className="flex-1 bg-transparent border border-dashed border-[#DEE2E6]/50 rounded-xl" />
        </div>

        {/* CENTER - Feedback + Gender */}
        <div className="col-span-6 flex flex-col gap-4">
          {/* Feedback List (With Highlight Focus) */}
          <motion.div
            style={getBlurStyle(focusFeedback)}
            animate={{
              scale: focusFeedback ? 1.05 : 1,
              opacity: (anyFocusActive && !focusFeedback) ? 0.3 : 1, // Dim when others are focused
              zIndex: focusFeedback ? 100 : 10,
              boxShadow: focusFeedback ? "0 30px 60px -12px rgba(245,168,60,0.3)" : "0 1px 3px rgba(0,0,0,0.1)"
            }}
            transition={SPRING_CONFIG}
            className="rounded-xl overflow-hidden border border-[#DEE2E6] bg-white shadow-sm flex flex-col h-[180px]"
          >
            {/* Header matching screenshot */}
            <div className="bg-[#F5A83C] px-4 py-4 flex flex-col items-center justify-center relative overflow-hidden">
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rotate-45 translate-x-16 -translate-y-16" />

              <h3 className="text-xl font-bold text-white mb-2 z-10">Employees Feedback / Suggestion List</h3>
              <div className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center gap-2 z-10 shadow-sm border border-white/50">
                <span className="bg-[#F5A83C] text-white text-[12px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-inner">
                  76
                </span>
                <span className="text-[#F5A83C] text-[12px] font-bold">Feedbacks</span>
              </div>
            </div>

            <div className="flex-1 bg-[#FFF9F0]/30 p-4 relative group overflow-hidden">
              {/* Slider Arrows */}
              <div className="absolute left-1 top-1/2 -translate-y-1/2 z-20 transition-opacity duration-300">
                <div className="w-8 h-8 rounded-full bg-[#F5A83C] text-white flex items-center justify-center shadow-md border border-white/50">
                  <ChevronLeft size={20} />
                </div>
              </div>
              <div className="absolute right-1 top-1/2 -translate-y-1/2 z-20 transition-opacity duration-300">
                <div className="w-8 h-8 rounded-full bg-[#F5A83C] text-white flex items-center justify-center shadow-md border border-white/50">
                  <ChevronRight size={20} />
                </div>
              </div>

              {/* The Slider Track */}
              <div className="h-full w-full overflow-hidden">
                <motion.div
                  className="flex gap-4 h-full"
                  animate={{ x: focusFeedback ? sliderTranslateX : 0 }}
                  transition={{ type: "spring", stiffness: 45, damping: 15 }}
                >
                  {FEEDBACKS.map((item) => (
                    <div
                      key={item.id}
                      className="min-w-[280px] bg-white rounded-xl p-2 border-l-[6px] border-[#F5A83C] shadow-sm flex flex-col justify-between"
                    >
                      <p className="text-[11px] font-normal text-[#17161A] leading-tight">
                        {item.text}
                      </p>
                      <div className="flex justify-end mt-1">
                        <span className="text-[9px] font-medium text-gray-400">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Gender Chart (With Highlight Focus) */}
          <motion.div
            style={getBlurStyle(focusGender)}
            animate={{
              scale: focusGender ? 1.05 : 1,
              zIndex: focusGender ? 100 : 10,
              boxShadow: focusGender ? "0 30px 60px -12px rgba(40,73,82,0.3)" : "0 1px 3px rgba(0,0,0,0.1)"
            }}
            transition={SPRING_CONFIG}
            className="bg-white rounded-xl border border-[#DEE2E6] p-4 flex flex-col relative overflow-hidden"
          >
            <div className="flex justify-between items-center mb-1 shrink-0">
              <h3 className="text-sm font-bold text-[#17161A]">Complaints by Gender</h3>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#5F9BFF] rounded-sm" />
                  <span className="text-[9px] font-bold text-gray-500">Male</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FF6BB5] rounded-sm" />
                  <span className="text-[9px] font-bold text-gray-500">Female</span>
                </div>
                <Menu size={12} className="text-gray-300 cursor-pointer" />
              </div>
            </div>

            <div className="relative flex flex-col">
              <GenderBarChart isActive={isActive} />
            </div>

            <div className="mt-0.5 flex justify-center gap-3 shrink-0">
              <GenderStatBox type="MALE" value="467" percentage="97.9%" color="#5F9BFF" />
              <GenderStatBox type="FEMALE" value="10" percentage="2.1%" color="#FF6BB5" />
            </div>
          </motion.div>
        </div>

        {/* RIGHT - Resolution + Survey */}
        <div className="col-span-3 flex flex-col gap-4">
          {/* Resolution Time (With Highlight Focus) */}
          <motion.div
            style={getBlurStyle(focusPerformance)}
            animate={{
              scale: focusPerformance ? 1.05 : 1,
              zIndex: focusPerformance ? 100 : 10,
              boxShadow: focusPerformance ? "0 30px 60px -12px rgba(96,186,129,0.3)" : "0 1px 3px rgba(0,0,0,0.1)"
            }}
            transition={SPRING_CONFIG}
            className="bg-white rounded-xl border border-[#DEE2E6] p-4 shadow-sm flex flex-col overflow-hidden"
          >
            <h3 className="text-xs font-bold text-[#17161A] mb-4">Resolution Time Per Complaint</h3>

            <div className="flex-1 flex flex-col">
              <div className="flex bg-[#2D9480] rounded-t-lg overflow-hidden">
                <div className="flex-1 py-3 px-4 text-center">
                  <span className="text-[9px] font-bold text-white uppercase tracking-wider">Time Taken</span>
                </div>
                <div className="flex-1 py-3 px-4 text-center">
                  <span className="text-[9px] font-bold text-white uppercase tracking-wider">No of Complaints</span>
                </div>
              </div>

              <div className="flex flex-col border-x border-b border-gray-100 rounded-b-lg overflow-hidden">
                {[
                  { t: "Within same day", v: 22 },
                  { t: "Within 3 days", v: 1 },
                  { t: "Within 10 days", v: 2 },
                  { t: "More than 10 days", v: 0 }
                ].map((row, i) => (
                  <div key={i} className={`flex justify-between items-center ${i % 2 === 0 ? "bg-[#F8F9FA]" : "bg-white"}`}>
                    <div className="flex-1 py-3 px-4 text-center border-r border-gray-50">
                      <span className="text-[10px] text-gray-400 font-medium">{row.t}</span>
                    </div>
                    <div className="flex-1 py-3 px-4 text-center">
                      <span className="text-[11px] text-[#60BA81] font-black">{row.v}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="flex-1 bg-white rounded-xl border border-[#DEE2E6] flex flex-col overflow-hidden shadow-sm" style={getBlurStyle(false)}>
            <div className="bg-[#284952] px-4 py-3 flex items-center gap-3">
              <FileText size={16} className="text-white" />
              <span className="text-sm font-bold text-white">Survey Reports</span>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
              {[
                { t: "Employee WellBeing Due Diligence Survey Dec 2025", d: "Jan 16, 2026" },
                { t: "Employee WellBeing Due Diligence Survey Aug 2025", d: "Jan 16, 2026" },
                { t: "Exit Interview Report August", d: "Sep 5, 2025" },
                { t: "Exit Interview Report July 2025", d: "Aug 8, 2025" }
              ].map((survey, i) => (
                <div key={i} className="p-4 border-b border-gray-100 flex justify-between items-center group hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col gap-1 max-w-[200px]">
                    <p className="text-[11px] font-bold text-[#284952] leading-tight">{survey.t}</p>
                    <span className="text-[10px] text-gray-400 font-medium">{survey.d}</span>
                  </div>
                  <button className="flex items-center gap-1.5 bg-[#60BA81] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-sm hover:opacity-90 transition-all">
                    <FileText size={12} />
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION - Line Chart (With Highlight Focus) */}
      <div className="flex-1 flex pb-4 pt-2">
        <motion.div
          style={getBlurStyle(focusDaily)}
          animate={{
            scale: focusDaily ? 1.05 : 1,
            zIndex: focusDaily ? 100 : 10,
            boxShadow: focusDaily ? "0 30px 60px -12px rgba(40,73,82,0.3)" : "0 1px 3px rgba(0,0,0,0.1)"
          }}
          transition={SPRING_CONFIG}
          className="bg-white rounded-xl border border-[#DEE2E6] p-4 shadow-sm w-3/4 flex flex-col"
        >
          <h3 className="text-sm font-bold text-[#284952] mb-4">Complaints by Days</h3>
          <div className="h-full min-h-[160px]">
            <TrendChart isActive={isActive && focusDaily} />
          </div>
        </motion.div>
        {/* Right side spacer for 25% reduction */}
        <div className="w-1/4" />
      </div>
    </div>
  )
}

const GenderStatBox = ({ type, value, percentage, color }: any) => (
  <div style={{ borderColor: `${color}40` }} className="border rounded-lg px-4 py-1 flex flex-col items-center min-w-[100px] bg-white shadow-sm">
    <div style={{ color }} className="flex items-center gap-1.5 mb-0.5">
      <Users size={10} strokeWidth={3} />
      <span className="text-[8px] font-black uppercase tracking-wider">{type}</span>
    </div>
    <span className="text-xl font-black text-[#284952] leading-none mb-0.5">{value}</span>
    <span className="text-[8px] font-bold text-gray-400">{percentage}</span>
  </div>
)

const GenderBarChart = ({ isActive }: { isActive: boolean }) => {
  const maxValue = 250

  return (
    <div className="flex flex-col">
      {/* Grid Lines */}
      <div className="absolute inset-y-0 left-[110px] right-2 flex justify-between pointer-events-none">
        {[0, 50, 100, 150, 200, 250].map(v => (
          <div key={v} className="h-full w-[1px] border-l border-dashed border-gray-100 relative">
            {v === 0 && <div className="absolute -left-[1px] inset-y-0 w-[1px] bg-gray-200" />}
          </div>
        ))}
      </div>

      <div className="flex-col gap-[3px] py-1 relative z-10 overflow-hidden flex">
        {GENDER_DATA.map((cat, i) => (
          <div key={i} className="flex items-center gap-2 group h-[11px]">
            <div className="w-[100px] text-right shrink-0">
              <span className="text-[7px] font-bold text-[#767676] truncate block leading-none">{cat.name}</span>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              {/* Male Bar */}
              <div className="flex items-center gap-1 max-h-[5px]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isActive ? { width: `${(cat.m / maxValue) * 100}%` } : {}}
                  transition={{ duration: 1, ease: "circOut", delay: i * 0.05 }}
                  className="h-[4px] bg-[#5F9BFF] rounded-r-[1px] min-w-[1px]"
                />
                <span className="text-[6.5px] font-black text-[#5F9BFF] leading-none">{cat.m}</span>
              </div>
              {/* Female Bar */}
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

      {/* Axis Labels */}
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
  // Data points exactly calibrated to the reference screenshot
  const data = [
    0, 2, 1, 0, 2, 2, 1, 0, 0, 2, 2, 0, 0, 0, 0, 4, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ]
  const dates = [
    "01-12", "01-13", "01-14", "01-15", "01-16", "01-17", "01-18", "01-19", "01-20", "01-21",
    "01-22", "01-23", "01-24", "01-25", "01-26", "01-27", "01-28", "01-29", "01-30", "01-31",
    "02-01", "02-02", "02-03", "02-04", "02-05", "02-06", "02-07", "02-08", "02-09"
  ]

  const width = 1200
  const height = 180
  const paddingLeft = 40
  const paddingBottom = 40
  const chartWidth = width - paddingLeft
  const chartHeight = height - paddingBottom

  // Safety check to prevent NaN in SVG points
  const points = data.length > 0
    ? data.map((d, i) => `${paddingLeft + (i / (data.length - 1)) * chartWidth},${chartHeight - (d / 4) * chartHeight}`).join(" ")
    : ""

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* Legend */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        <div className="w-8 h-4 border-2 border-[#206E71] bg-[#206E71]/10 rounded-sm" />
        <span className="text-[10px] font-bold text-gray-500">Complaint Count</span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        {/* Grid Lines - Horizontal */}
        {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4].map(v => (
          <g key={v}>
            <line
              x1={paddingLeft}
              y1={chartHeight - (v / 4) * chartHeight}
              x2={width}
              y2={chartHeight - (v / 4) * chartHeight}
              stroke="#F0F2F5"
              strokeWidth="1"
            />
            <text
              x={paddingLeft - 10}
              y={chartHeight - (v / 4) * chartHeight}
              textAnchor="end"
              alignmentBaseline="middle"
              className="text-[10px] fill-gray-400 font-bold"
            >
              {v.toFixed(1)}
            </text>
          </g>
        ))}

        {/* Grid Lines - Vertical */}
        {data.map((_, i) => (
          <line
            key={i}
            x1={paddingLeft + (i / (data.length - 1)) * chartWidth}
            y1={0}
            x2={paddingLeft + (i / (data.length - 1)) * chartWidth}
            y2={chartHeight}
            stroke="#F0F2F5"
            strokeWidth="1"
          />
        ))}

        {/* Labels - X Axis (Dates) */}
        {dates.map((date, i) => (
          <text
            key={i}
            x={paddingLeft + (i / (data.length - 1)) * chartWidth}
            y={chartHeight + 15}
            textAnchor="end"
            transform={`rotate(-45, ${paddingLeft + (i / (data.length - 1)) * chartWidth}, ${chartHeight + 15})`}
            className="text-[10px] fill-gray-400 font-bold"
          >
            {date}
          </text>
        ))}

        <polyline points={points} fill="none" stroke="#206E71" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {data.map((d, i) => (
          <motion.circle
            key={i}
            cx={paddingLeft + (i / (data.length - 1)) * chartWidth}
            cy={chartHeight - (d / 4) * chartHeight}
            r="4.5"
            fill="white"
            stroke="#206E71"
            strokeWidth="2.5"
            initial={{ scale: 0 }}
            animate={isActive ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: i * 0.02 }}
          />
        ))}

        {/* Main Axes */}
        <line x1={paddingLeft} y1={0} x2={paddingLeft} y2={chartHeight} stroke="#E9ECEF" strokeWidth="2" />
        <line x1={paddingLeft} y1={chartHeight} x2={width} y2={chartHeight} stroke="#E9ECEF" strokeWidth="2" />
      </svg>
    </div>
  )
}

export default SceneBreakdown
