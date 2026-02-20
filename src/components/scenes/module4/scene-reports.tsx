"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Brain, MessageSquare, Download, Eye, FileText as FileTextIcon, Calendar, Clock, HelpCircle, CheckCircle, Share2, Printer, ArrowLeft, Sparkles, List, AlertCircle, Minus, Zap, TrendingUp } from "lucide-react"

// --- PALETTE FROM IMAGE ---
const THEME = {
    darkGreen: "#27444E",    // Primary Dark Header
    green: "#60BA81",        // Brand Green
    orange: "#F5A623",       // Brand Orange
    blueDark: "#2C3E50",     // Text Color
    slate: "#64748B",        // Subtext
    bg: "#F3F4F6",           // Light Gray BG
    card: "#FFFFFF",
    border: "#E5E7EB",
    // Chart Colors
    chartBlue: "#4A6FA5",
    chartTeal: "#4ECDC4",
    chartYellow: "#FFE66D",
    chartOrange: "#FF6B6B",
    chartRed: "#FF8A8A",
}

// --- AI DATA (Copied from SceneAI) ---
const RAW_FEEDBACK = [
    { text: "Safety equipment is missing", type: "negative" },
    { text: "محفوظ ماحول ہے", type: "positive" }, // Safe environment
    { text: "Need better training options", type: "neutral" },
    { text: "Food quality is good", type: "positive" },
    { text: "شفٹ ٹائمنگ کا مسئلہ ہے", type: "negative" }, // Shift timing issue
    { text: "Management is cooperative", type: "positive" },
]

const TOPIC_ANALYSIS = [
    { topic: "Technical Issues with FlowHCM", percent: "31.1%", count: "23", sentiment: "Negative", insights: ["FlowHCM not working", "Technical issues", "Login issues"] },
    { topic: "User Experience and Ease of Use", percent: "27.0%", count: "20", sentiment: "Positive", insights: ["Easy to use", "User friendly", "Smooth experience"] },
    { topic: "Pay Slip and Salary Issues", percent: "20.3%", count: "15", sentiment: "Negative", insights: ["Pay slip not available", "Salary deductions", "Incorrect salary"] },
    { topic: "Attendance and Leave Tracking", percent: "12.2%", count: "9", sentiment: "Neutral", insights: ["Attendance tracking", "Leave quota"] },
]

interface SceneProps {
    isActive: boolean
    progress: number
}

// ==========================================
// SCENE REPORTS (75s - 91s)
// ==========================================

export const SceneReports = ({ isActive, progress }: SceneProps) => {
    const localT = Math.max(0, progress - 75)

    // Refs for precision centering
    const containerRef = useRef<HTMLDivElement>(null)
    const targetRef = useRef<HTMLDivElement>(null)
    const [targetMetrics, setTargetMetrics] = useState({ offsetTop: 0, height: 0, containerHeight: 0 })

    // Stage Management (Moved up to avoid ReferenceError in useEffect)
    const stage = localT < 4 ? 'dashboard' : localT < 7 ? 'cover' : localT < 11 ? 'details' : 'charts'

    // AI Sub-stages (Moved up to avoid ReferenceError in useEffect)
    // Synchronized with script: Ingestion (91s), Dashboard (91s+), Transformation (105s)
    const aiT = Math.max(0, localT - 16)
    const aiStage = aiT === 0 ? 'idle' : aiT < 2 ? 'zoom' : aiT < 7 ? 'ingestion' : aiT < 14 ? 'dashboard' : 'transformation'

    // Measure positions for robust focus on any screen size
    useEffect(() => {
        const measure = () => {
            if (targetRef.current && containerRef.current) {
                setTargetMetrics({
                    offsetTop: targetRef.current.offsetTop,
                    height: targetRef.current.offsetHeight,
                    containerHeight: containerRef.current.offsetHeight
                })
            }
        }
        measure()
        // Also measure after a short delay to ensure layout is settled
        const timer = setTimeout(measure, 500)
        window.addEventListener('resize', measure)
        return () => {
            window.removeEventListener('resize', measure)
            clearTimeout(timer)
        }
    }, [stage, aiStage]) // Re-measure when stage changes OR AI dashboard results appear


    // Robust Scroll & Zoom Logic
    // Step 1: Scroll so that the card's top is 40px from the top of the container
    const paddingOffset = 56 // pt-14
    const targetYInScrollingDiv = 40
    const maxScrollY = Math.max(0, targetMetrics.offsetTop - targetYInScrollingDiv)

    const scrollStopT = 16
    const scrollY = stage === 'charts'
        ? Math.min(maxScrollY, Math.max(0, (localT - 11) * 450))
        : 0

    // Zoom Focus Logic (Expert "Focus then Reveal" approach)
    const isZooming = aiStage !== 'idle'
    // Step 1: Smooth Zoom Curve (1.0 -> 1.22 -> 1.0 Reveal)
    const zoomScale = aiStage === 'zoom'
        ? 1 + (aiT / 2) * 0.22
        : aiStage === 'ingestion'
            ? 1.22
            : (aiStage === 'dashboard' || aiStage === 'transformation')
                ? Math.max(1, 1.22 - (Math.max(0, aiT - 7) / 2) * 0.22)
                : 1

    // Step 2: Calculate centering offset
    // Corrected Math: CenterPoint = paddingOffset - scrollY + zoomY + (offsetTop + height/2) * zoomScale
    const centerFactor = (aiStage === 'dashboard' || aiStage === 'transformation') ? 0.5 : isZooming ? 0.5 : 0.5
    const centerPoint = targetMetrics.containerHeight * centerFactor

    // Formula for zoomY that corrects for originY: 0 and external displacement (scroll/padding)
    const targetCenterOffset = centerPoint - paddingOffset + scrollY - (zoomScale * (targetMetrics.offsetTop + targetMetrics.height / 2))
    const zoomY = aiStage === 'zoom' ? (aiT / 2) * targetCenterOffset : isZooming ? targetCenterOffset : 0

    // Dashboard cursor logic
    const cursorProgress = Math.min(1, localT / 2.5)
    const isClicking = localT > 2.4 && localT < 3.0

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center overflow-hidden relative text-slate-800 font-sans"
            style={{ backgroundColor: isZooming ? "#FFFFFF" : stage === 'charts' ? THEME.bg : stage === 'dashboard' ? '#E8ECF0' : "#F8FAFC" }}
        >
            <AnimatePresence mode="popLayout">

                {/* ===== STAGE 0: DASHBOARD (Unchanged) ===== */}
                {stage === 'dashboard' && (
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full flex items-center justify-center p-5 relative"
                    >
                        {/* Subtle grid background */}
                        <div className="absolute inset-0 opacity-[0.03]" style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, #284952 1px, transparent 0)`,
                            backgroundSize: "32px 32px"
                        }} />

                        {/* Browser Window Chrome */}
                        <motion.div
                            initial={{ y: 40, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            transition={{ type: "spring", damping: 22, stiffness: 120 }}
                            className="w-full max-w-3xl bg-white rounded-2xl shadow-[0_25px_80px_-15px_rgba(0,0,0,0.2)] overflow-hidden border border-gray-200/80 relative z-10"
                        >
                            {/* Browser Top Bar */}
                            <div className="h-9 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                </div>
                                <div className="flex-1 mx-4">
                                    <div className="bg-white rounded-md h-6 flex items-center px-3 text-[11px] text-gray-400 font-medium border border-gray-200">
                                        <svg className="w-3 h-3 mr-1.5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                        fruitofsustainability.com/dashboard/surveys
                                    </div>
                                </div>
                            </div>

                            {/* Dashboard Content Area */}
                            <div className="flex">
                                {/* Main Content */}
                                <div className="flex-1 bg-[#F5F7FA] p-4">
                                    {/* Survey Reports Header */}
                                    <motion.div
                                        initial={{ y: -10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="rounded-t-xl overflow-hidden"
                                    >
                                        <div className="px-5 py-2.5 flex items-center gap-2" style={{ backgroundColor: THEME.darkGreen }}>
                                            <div className="w-6 h-6 rounded bg-white/15 flex items-center justify-center">
                                                <FileTextIcon size={14} className="text-white" />
                                            </div>
                                            <span className="font-bold text-white text-sm tracking-wide">Survey Reports</span>
                                        </div>
                                    </motion.div>

                                    {/* Survey Reports List */}
                                    <div className="bg-white rounded-b-xl shadow-sm border border-gray-100 overflow-hidden">
                                        {[
                                            { title: "Exit Interview Report June-25", date: "Jul 10, 2025", buttons: ["view"], delay: 0.4 },
                                            { title: "Employee Well Being Survey (CHZ Call Centre)", date: "Jun 30, 2025", buttons: ["view", "pdf", "csv"], delay: 0.5, highlight: true },
                                            { title: "Quarterly Employee Due Diligence Survey", date: "Jun 19, 2025", buttons: ["view"], delay: 0.6 },
                                            { title: "Exit Interview Report May-25", date: "Jun 4, 2025", buttons: ["view"], delay: 0.7 },
                                        ].map((report, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ x: 20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: report.delay, type: "spring", damping: 20 }}
                                                className={`px-5 py-3 border-b border-gray-100 last:border-b-0 transition-colors relative ${report.highlight && isClicking ? 'bg-teal-50/50' : 'bg-white'}`}
                                            >
                                                <h4 className="font-bold text-gray-800 text-sm mb-1 leading-tight">{report.title}</h4>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-400 font-medium">{report.date}</span>
                                                    <div className="flex gap-2">
                                                        {report.buttons.includes("view") && (
                                                            <motion.div className="flex items-center gap-1 px-3 py-1 rounded text-[11px] font-bold text-white" style={{ backgroundColor: THEME.green }} animate={report.highlight && isClicking ? { scale: 0.9 } : { scale: 1 }}>
                                                                <Eye size={12} /> View
                                                            </motion.div>
                                                        )}
                                                        {report.buttons.includes("pdf") && (
                                                            <div className="flex items-center gap-1 px-3 py-1 rounded text-[11px] font-bold text-white" style={{ backgroundColor: THEME.orange }}>
                                                                <Download size={11} /> PDF
                                                            </div>
                                                        )}
                                                        {report.buttons.includes("csv") && (
                                                            <div className="flex items-center gap-1 px-3 py-1 rounded text-[11px] font-bold text-white" style={{ backgroundColor: THEME.green }}>
                                                                <Download size={11} /> CSV
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                        {/* Animated Cursor */}
                        <motion.div
                            className="absolute z-50 pointer-events-none"
                            initial={{ x: "55%", y: "70%", opacity: 0 }}
                            animate={{
                                x: `${50 + cursorProgress * 12}%`,
                                y: `${65 - cursorProgress * 15}%`,
                                opacity: localT > 0.8 ? 1 : 0,
                                scale: isClicking ? 0.85 : 1,
                            }}
                            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                        >
                            <svg width="24" height="28" viewBox="0 0 24 28" fill="none" className="drop-shadow-lg">
                                <path d="M5 2L5 22L10 17L15 25L18 23.5L13 15.5L20 15.5L5 2Z" fill="white" stroke="#333" strokeWidth="1.5" strokeLinejoin="round" />
                            </svg>
                            {isClicking && (
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0.6 }}
                                    animate={{ scale: 2, opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute top-0 left-0 w-4 h-4 rounded-full bg-teal-400"
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )}

                {/* ===== STAGE 1: COVER PAGE (Unchanged) ===== */}
                {stage === 'cover' && (
                    <motion.div
                        key="cover"
                        initial={{ y: "100%", opacity: 1 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full relative overflow-hidden"
                    >
                        {/* 4-color stripes background — exact PDF colors */}
                        <div className="absolute inset-0 flex">
                            {["#D4A843", "#0f9690", "#4AAF6E", "#8BC853"].map((color, i) => (
                                <motion.div
                                    key={i}
                                    className="w-1/4 h-full"
                                    style={{ backgroundColor: color }}
                                    initial={{ y: "100%" }}
                                    animate={{ y: "0%" }}
                                    transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                />
                            ))}
                        </div>

                        {/* Title & Metadata — top left */}
                        <div className="absolute inset-0 flex flex-col justify-start px-10 pt-10 z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                            >
                                <h1 className="text-4xl font-extrabold text-white leading-[1.15] mb-1 drop-shadow-md" style={{ fontFamily: "'Georgia', serif" }}>
                                    Employee Feedback
                                </h1>
                                <h1 className="text-4xl font-extrabold text-white leading-[1.15] mb-4 drop-shadow-md" style={{ fontFamily: "'Georgia', serif" }}>
                                    Survey Report
                                </h1>
                                <p className="text-white/90 text-sm font-medium mb-6">Issue Date: 26 January, 2026</p>
                                <div className="space-y-1 text-white/85 text-sm">
                                    <p><span className="font-bold text-white">Report No:</span> SR1272601</p>
                                    <p><span className="font-bold text-white">Generated By:</span>  FOS Digital In-App HRDD Survey Module</p>
                                    <p><span className="font-bold text-white">Generated For:</span> Company A</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Centered Logos — middle of page */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7, type: "spring", damping: 18 }}
                            className="absolute left-[40%] top-[52%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-8 z-10"
                        >
                            {/* FOS Logo Circle */}
                            <div className="w-24 h-24 rounded-full border-[5px] border-[#C4943E] bg-white flex items-center justify-center shadow-xl overflow-hidden">
                                <img src="/assets/images/logo.png" alt="FOS" className="w-full h-full object-contain p-3" />
                            </div>
                            {/* Company Logo Circle */}
                            <div className="w-24 h-24 rounded-full border-[5px] border-[#C4943E] bg-white flex items-center justify-center shadow-xl overflow-hidden">
                                <img src="/assets/images/company_a.png" alt="Sadaqat" className="w-full h-full object-contain p-3" />
                            </div>
                        </motion.div>

                        {/* Bottom Website Bar */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.0 }}
                            className="absolute bottom-0 left-0 right-0 z-10 py-2.5 px-8 flex items-center justify-between"
                            style={{ backgroundColor: "#0f9690" }}
                        >
                            <span className="text-white font-bold text-sm tracking-wide">www.fruitofsustainability.com</span>
                            <span className="text-white/80 text-xs font-medium bg-white/15 px-3 py-1 rounded">Login Page</span>
                        </motion.div>
                    </motion.div>
                )}

                {/* ===== STAGE 2: DETAILS PAGE (RESTORED TEXT SECTIONS) ===== */}
                {stage === 'details' && (
                    <motion.div
                        key="details"
                        initial={{ y: "100%", opacity: 1 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full flex items-center justify-center p-4 relative"
                        style={{ backgroundColor: "#C8CCD0" }}
                    >
                        {/* White paper card */}
                        <motion.div
                            initial={{ y: 30, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 0.88 }}
                            transition={{ type: "spring", damping: 22 }}
                            className="w-full max-w-lg bg-white rounded-sm shadow-[0_8px_40px_rgba(0,0,0,0.15)] px-6 py-4 z-10 overflow-y-auto max-h-[94%] scrollbar-hide"
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                WebkitOverflowScrolling: 'touch'
                            }}
                        >
                            <style>{`
                                .scrollbar-hide::-webkit-scrollbar {
                                    display: none;
                                }
                            `}</style>
                            {/* ── Survey Details ── */}
                            <div className="mb-2.5">
                                <motion.h2
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-[13px] font-black italic text-[#0f9690] mb-1.5 border-b border-[#0f9690] pb-0.5 inline-block"
                                >
                                    Survey Details
                                </motion.h2>

                                <div className="grid grid-cols-4 gap-4 mt-3">
                                    {[
                                        { label: "Created At", value: "22-Jan-26" },
                                        { label: "Expiry at", value: "31-Jan-26" },
                                        { label: "No. of\nQuestions", value: "25" },
                                        { label: "Time\nRequired", value: "10 min" },
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 + i * 0.08 }}
                                            className="flex flex-col items-center"
                                        >
                                            {/* Teal label badge */}
                                            <div className="bg-[#0f9690] text-white text-[8px] font-black text-center px-1 py-0.5 rounded-sm w-full leading-tight whitespace-pre-line min-h-[22px] flex items-center justify-center">
                                                {item.label}
                                            </div>
                                            {/* Arrow connector */}
                                            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[3px] border-t-[#0f9690]" />
                                            {/* Value box */}
                                            <div className="border border-gray-300 rounded-sm px-1 py-0.5 text-center w-full mt-0.5">
                                                <span className="text-[11px] font-black text-gray-800">{item.value}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* ── Participant Details ── */}
                            <div className="mb-2.5">
                                <motion.h2
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-[13px] font-black italic text-[#0f9690] mb-1.5 border-b border-[#0f9690] pb-0.5 inline-block"
                                >
                                    Participant Details
                                </motion.h2>

                                <div className="grid grid-cols-3 gap-5 mt-3">
                                    {[
                                        { label: "Total\nParticipants", value: 335 },
                                        { label: "Filled\nParticipants", value: 163 },
                                        { label: "Pending\nParticipants", value: 172 },
                                    ].map((stat, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.6 + i * 0.1 }}
                                            className="flex flex-col items-center"
                                        >
                                            {/* Teal label badge */}
                                            <div className="bg-[#0f9690] text-white text-[8px] font-black text-center px-1 py-0.5 rounded-sm w-full leading-tight whitespace-pre-line min-h-[22px] flex items-center justify-center">
                                                {stat.label}
                                            </div>
                                            {/* Arrow connector */}
                                            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[3px] border-t-[#0f9690]" />
                                            {/* Value box */}
                                            <div className="border border-gray-300 rounded-sm px-1 py-0.5 text-center w-full mt-0.5">
                                                <span className="text-base font-black text-gray-800">
                                                    {Math.floor(stat.value * Math.min(1, (localT - 7) / 1.5))}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-b border-gray-200 my-3" />

                            {/* ── Survey Module Specifications (Restored) ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="mb-2"
                            >
                                <h3 className="text-[13px] font-bold italic text-[#0f9690] mb-1.5 border-b border-[#0f9690] pb-0.5 inline-block underline">
                                    Survey Module Specifications
                                </h3>
                                <p className="text-[9.5px] text-gray-700 leading-[1.25] text-justify font-medium">
                                    The HRDD Survey Module empowers Brands/Factories to gather valuable employee feedback through "Launch a survey" button available in FOS HRDD Dashboard. FOS manages and maintains the platform, ensuring its reliability and security. Once a survey is launched, all relevant employees receive SMS notification inviting them to participate. A real time report is automatically generated and made available within the Brand/Factory Dashboard, providing statistical analysis of employee sentiment.
                                </p>
                            </motion.div>

                            {/* ── AI Analysis Specifications (Restored) ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0 }}
                            >
                                <h3 className="text-lg font-bold italic text-[#0f9690] mb-3 border-b-2 border-[#0f9690] pb-1 inline-block underline">
                                    AI Analysis Specifications
                                </h3>
                                <p className="text-[13px] text-gray-700 leading-relaxed text-justify">
                                    For text-based survey responses, our system uses smart AI analysis to turn feedback into clear and meaningful insights. It detects common patterns and evaluates the sentiment behind each comment. The output includes a short written summary, a structured breakdown of sentiment (positive, neutral, or negative) and a few top representative responses. This approach removes manual work and provides instant clarity on employee feedback.
                                </p>
                            </motion.div>

                        </motion.div>
                    </motion.div>
                )}

                {/* ===== STAGE 3: CHARTS & AI ANALYSIS (High Fidelity) ===== */}
                {stage === 'charts' && (
                    <motion.div
                        key="charts"
                        initial={{ y: "100%", opacity: 1 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full relative"
                    >
                        {/* Top App Bar Replica (Fixed) */}
                        <motion.div
                            animate={{ opacity: isZooming ? 0 : 1 }}
                            transition={{ duration: 0.5 }}
                            className="absolute top-0 left-0 right-0 h-12 bg-white border-b border-gray-200 z-50 flex items-center px-5 justify-between shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <img src="/assets/images/logo.png" className="h-8 w-8 object-contain" alt="FOS" />
                                <span className="font-bold text-gray-800">Survey Report</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="px-3 py-1.5 border rounded text-xs font-semibold text-gray-600 flex items-center gap-1 bg-white">
                                    <Printer size={12} /> Print Report
                                </div>
                                <div className="px-3 py-1.5 rounded text-xs font-semibold text-white flex items-center gap-1" style={{ backgroundColor: THEME.orange }}>
                                    <Download size={12} /> Download PDF
                                </div>
                                <div className="px-3 py-1.5 rounded text-xs font-semibold text-white flex items-center gap-1" style={{ backgroundColor: THEME.green }}>
                                    <ArrowLeft size={12} /> Back to Surveys
                                </div>
                            </div>
                        </motion.div>

                        {/* Scrolling Content Container */}
                        <div className="w-full h-full overflow-hidden pt-12" ref={containerRef}>

                            <motion.div
                                animate={{
                                    y: -scrollY + zoomY,
                                    scale: zoomScale,
                                }}
                                style={{ originY: 0, originX: 0.5 }}
                                transition={{
                                    y: { ease: isZooming ? [0.16, 1, 0.3, 1] : "linear", duration: isZooming ? 0.8 : 0 },
                                    scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                                }}
                                className="w-full max-w-2xl mx-auto p-4 space-y-4 relative"
                            >
                                {/* 1. Report Header Card */}
                                <motion.div
                                    animate={{ opacity: isZooming ? 0 : 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 relative overflow-hidden"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h1 className="text-xl font-bold text-gray-800 mb-1 leading-tight">Employee Well Being Survey (CHZ Call Centre)</h1>
                                            <p className="text-[11px] text-gray-400">Honest feedback for a better workplace. Your privacy is fully protected.</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Survey ID</div>
                                            <div className="text-3xl font-bold text-green-500">27</div>
                                        </div>
                                    </div>

                                    {/* 4 Metadata Cards */}
                                    <div className="grid grid-cols-4 gap-4 mb-6">
                                        <MetaCard label="Created Date" value="Jun 30, 2025" color="#27444E" />
                                        <MetaCard label="Expiry Date" value="Jul 15, 2025" color={THEME.green} />
                                        <MetaCard label="Total Questions" value="18" color={THEME.orange} />
                                        <MetaCard label="Est. Time" value="15 min" color="#427868" />
                                    </div>

                                    {/* Response Statistics Bar (Dark Green) */}
                                    <div className="rounded-lg p-4 text-white flex items-center justify-between" style={{ backgroundColor: "#4A8B6F" }}>
                                        <div className="flex-1 grid grid-cols-4 gap-4">
                                            <div>
                                                <div className="text-[10px] opacity-80 uppercase tracking-wide mb-1 flex items-center gap-1">
                                                    <span className="w-2 h-2 rounded-full bg-orange-400"></span> Response Statistics
                                                </div>
                                                <div className="text-lg font-bold">74</div>
                                                <div className="text-[10px] opacity-70">Total Invited</div>
                                            </div>
                                            <div className="mt-4">
                                                <div className="text-lg font-bold">74</div>
                                                <div className="text-[10px] opacity-70">Completed</div>
                                            </div>
                                            <div className="mt-4">
                                                <div className="text-lg font-bold">0</div>
                                                <div className="text-[10px] opacity-70">Pending</div>
                                            </div>
                                            <div className="mt-4">
                                                <div className="text-lg font-bold">100.0%</div>
                                                <div className="text-[10px] opacity-70">Completion Rate</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded text-[10px] font-semibold flex items-center gap-1 transition-colors">
                                                <Download size={10} /> Export Completed (74)
                                            </button>
                                            <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded text-[10px] font-semibold flex items-center gap-1 transition-colors">
                                                <Download size={10} /> Export Pending (0)
                                            </button>
                                            <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded text-[10px] font-semibold flex items-center gap-1 transition-colors">
                                                <Download size={10} /> Export All (74)
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* 2. Chart Card 1: Time Spent (Pie) */}
                                <motion.div animate={{ opacity: isZooming ? 0 : 1 }} transition={{ duration: 0.5 }}>
                                    <QuestionCardReplica
                                        number="2"
                                        type="radio"
                                        required
                                        question="Time Spent with Company"
                                        responses="74"
                                    >
                                        <div className="flex items-center justify-center gap-10 py-5">
                                            <div className="relative w-48 h-48">
                                                {/* Custom SVG Pie Chart */}
                                                <svg viewBox="0 0 100 100" className="-rotate-90 drop-shadow-sm">
                                                    {/* 0-3 Months (Blue Dark) */}
                                                    <path d="M 50 50 L 50 0 A 50 50 0 0 1 100 50 Z" fill="#4B5E80" />
                                                    {/* 3-6 Months (Cyan) */}
                                                    <path d="M 50 50 L 100 50 A 50 50 0 0 1 50 100 Z" fill="#7DD3FC" />
                                                    {/* 6 Mo - 1 Yr (Yellow) */}
                                                    <path d="M 50 50 L 50 100 A 50 50 0 0 1 15 85 Z" fill="#FDE047" />
                                                    {/* More than 1 yr (Orange) */}
                                                    <path d="M 50 50 L 15 85 A 50 50 0 0 1 50 0 Z" fill="#FDBA74" />
                                                </svg>
                                            </div>
                                            <div className="space-y-2">
                                                <LegendRow color="#4B5E80" label="0-3 Months" />
                                                <LegendRow color="#7DD3FC" label="3-6 Months" />
                                                <LegendRow color="#FDE047" label="6 Months - 1 Year" />
                                                <LegendRow color="#FDBA74" label="More than 1 Year" />
                                                <LegendRow color="#FDA4AF" label="More than 3 Years" />
                                            </div>
                                        </div>
                                    </QuestionCardReplica>
                                </motion.div>

                                {/* 3. Chart Card 2: Deductions (Pie) */}
                                <motion.div animate={{ opacity: isZooming ? 0 : 1 }} transition={{ duration: 0.5 }}>
                                    <QuestionCardReplica
                                        number="3"
                                        type="radio"
                                        required
                                        question="Has there been any deduction in your salary? Are the deductions fair or unfair?"
                                        responses="74"
                                    >
                                        <div className="flex items-center justify-center gap-10 py-5">
                                            <div className="relative w-48 h-48">
                                                <svg viewBox="0 0 100 100" className="-rotate-90 drop-shadow-sm">
                                                    {/* No (Dark Blue) - 60% */}
                                                    <path d="M 50 50 L 50 0 A 50 50 0 1 1 30 95 Z" fill="#4B5E80" />
                                                    {/* Yes, Fair (Teal) - 25% */}
                                                    <path d="M 50 50 L 30 95 A 50 50 0 0 1 10 30 Z" fill="#7DD3FC" />
                                                    {/* Yes, Unfair (Yellow) - 15% */}
                                                    <path d="M 50 50 L 10 30 A 50 50 0 0 1 50 0 Z" fill="#FDE047" />
                                                </svg>
                                            </div>
                                            <div className="space-y-2">
                                                <LegendRow color="#4B5E80" label="No" />
                                                <LegendRow color="#7DD3FC" label="Yes, Fair" />
                                                <LegendRow color="#FDE047" label="Yes, Unfair" />
                                            </div>
                                        </div>
                                    </QuestionCardReplica>
                                </motion.div>

                                {/* 4. AI Analysis Card (Detailed) */}
                                <QuestionCardReplica
                                    innerRef={targetRef}
                                    number="4"
                                    type="textarea"
                                    required
                                    question="How easy/user friendly is it to use the FlowHCM portal and what are the challenges while using the self service portal?"
                                    responses="74"
                                    hideHeader={aiStage === 'transformation'}
                                    ghost={aiStage === 'transformation'}
                                    isFocused={aiStage === 'zoom' || aiStage === 'ingestion'}
                                >
                                    {/* AI Ingestion Phase (Brain + Floating Cards) */}
                                    {(aiStage === 'zoom' || aiStage === 'ingestion') && (
                                        <div className="relative h-56 w-full flex items-center justify-center overflow-hidden rounded-lg bg-white shadow-inner">
                                            {/* Pulse Rings */}
                                            {[1, 2, 3].map(i => (
                                                <motion.div
                                                    key={i}
                                                    className="absolute inset-0 rounded-full border border-teal-500/30 w-40 h-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                                    initial={{ scale: 1, opacity: 0.5 }}
                                                    animate={{ scale: 2.2, opacity: 0 }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
                                                />
                                            ))}

                                            <div className="relative z-10 w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center shadow-lg">
                                                <Brain size={40} className="text-teal-600" />
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent rounded-full"
                                                    animate={{ y: ["0%", "-100%"] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                                />
                                            </div>

                                            {/* Floating Feedback Cards */}
                                            {RAW_FEEDBACK.map((item, i) => (
                                                <FloatingCard
                                                    key={i}
                                                    item={item}
                                                    index={i}
                                                    total={RAW_FEEDBACK.length}
                                                    time={aiT}
                                                />
                                            ))}

                                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100 flex items-center gap-2">
                                                <img src="/assets/images/logo.png" className="w-4 h-4" alt="FOS" />
                                                AI Engine Processing Raw Feedback...
                                            </div>
                                        </div>
                                    )}

                                    {/* AI Dashboard Phase */}
                                    {aiStage === 'dashboard' && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="space-y-4"
                                        >
                                            {/* AI Summary Box */}
                                            <div className="rounded-lg p-4 text-white" style={{ background: "linear-gradient(135deg, #4A7C68 0%, #60BA81 100%)" }}>
                                                <h4 className="font-bold text-sm mb-1.5 flex items-center gap-2">
                                                    <Brain size={16} /> AI Analysis Summary
                                                </h4>
                                                <p className="text-[11px] leading-relaxed opacity-95">
                                                    The analysis reveals that while many respondents find the FlowHCM portal easy to use and have a positive user experience, there are significant technical issues and problems with pay slips and salaries that need to be addressed.
                                                </p>
                                            </div>

                                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                                <div className="grid grid-cols-12 bg-[#27444E] text-white text-[10px] font-bold py-2 px-4 uppercase">
                                                    <div className="col-span-4">Topic</div>
                                                    <div className="col-span-4 text-center">Sentiment</div>
                                                    <div className="col-span-4 pl-4">Insights</div>
                                                </div>
                                                <div className="divide-y divide-gray-100 text-[10px]">
                                                    {TOPIC_ANALYSIS.map((row, i) => (
                                                        <AnalysisRow key={i} {...row} />
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Proactive Transformation Phase (Expert 3D Perspective Reveal) */}
                                    {/* Proactive Transformation Phase (Exact Replica from SceneAI Phase 3) */}
                                    {aiStage === 'transformation' && (
                                        <motion.div
                                            key="transformation"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="w-full max-w-5xl p-4 z-20 flex flex-col items-center justify-center h-full scale-[0.75] origin-center"
                                        >
                                            {/* Header with floating effect */}
                                            <motion.div
                                                initial={{ y: -30, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ duration: 0.8, ease: "easeOut" }}
                                                className="text-center mb-10 relative z-30"
                                            >
                                                <motion.div
                                                    animate={{ y: [0, -5, 0] }}
                                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#284952] to-[#60BA81] rounded-full text-white shadow-2xl mb-4 ring-4 ring-teal-50"
                                                >
                                                    <img src="/assets/images/FOS-01.png" alt="FOS" className="w-5 h-5 object-contain brightness-0 invert" />
                                                    <span className="font-bold text-sm tracking-wide">FOS Digital Transformation</span>
                                                </motion.div>
                                                <h1 className="text-[22px] font-extrabold text-[#284952] mb-1.5 tracking-tight">From Reactive to Proactive</h1>
                                                <p className="text-[#767676] text-[13px] font-medium">Empowering continuous improvement with FOS engagement modules</p>
                                            </motion.div>

                                            {/* Transformation Visual - 3D Perspective Container */}
                                            <div className="flex items-center justify-center gap-8 w-full mb-8" style={{ perspective: "1000px" }}>

                                                {/* Reactive Side (The Past) */}
                                                <motion.div
                                                    initial={{ opacity: 0, rotateY: 45, x: -50 }}
                                                    animate={{ opacity: 1, rotateY: 15, x: 0 }}
                                                    transition={{ delay: 0.3, duration: 0.8 }}
                                                    className="flex-1 max-w-[260px] relative group"
                                                >
                                                    <div className="absolute inset-0 bg-red-500/5 blur-3xl rounded-full transform -translate-x-10 -translate-y-10" />

                                                    <motion.div
                                                        className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-dashed border-[#DEE2E6] p-4 shadow-xl relative overflow-hidden grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
                                                    >
                                                        {/* Dynamic Strikethrough */}
                                                        <motion.div
                                                            initial={{ pathLength: 0, opacity: 0 }}
                                                            animate={{ pathLength: 1, opacity: 1 }}
                                                            transition={{ delay: 1.5, duration: 0.8, ease: "easeInOut" }}
                                                            className="absolute inset-0 z-20 pointer-events-none"
                                                        >
                                                            <svg width="100%" height="100%" className="absolute inset-0">
                                                                <motion.line
                                                                    x1="10%" y1="10%" x2="90%" y2="90%"
                                                                    stroke="#E53E3E" strokeWidth="4" opacity="0.6"
                                                                />
                                                                <motion.line
                                                                    x1="10%" y1="90%" x2="90%" y2="10%"
                                                                    stroke="#E53E3E" strokeWidth="4" opacity="0.6"
                                                                />
                                                            </svg>
                                                        </motion.div>

                                                        <div className="text-center mb-4 opacity-70">
                                                            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-orange-100 shadow-inner">
                                                                <AlertCircle size={24} className="text-[#F5A83C]" />
                                                            </div>
                                                            <h3 className="text-lg font-bold text-[#284952] mb-1">Reactive</h3>
                                                            <p className="text-[9px] font-semibold text-[#3B82F6] uppercase tracking-widest">Grievance Handling</p>
                                                        </div>
                                                        <div className="space-y-2 opacity-70">
                                                            {["Wait for complaints", "Manual tracking", "Delayed responses"].map((text, i) => (
                                                                <div key={i} className="flex items-center gap-2 p-1.5 bg-orange-50/50 rounded-lg border border-orange-100/50">
                                                                    <div className="w-1 h-1 rounded-full bg-blue-400" />
                                                                    <span className="text-[#555] font-medium text-[10px]">{text}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                </motion.div>

                                                {/* Digital Stream Arrow */}
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.8 }}
                                                    className="flex flex-col items-center justify-center relative w-20"
                                                >
                                                    <motion.div
                                                        animate={{
                                                            boxShadow: ["0 0 0 0 rgba(96, 186, 129, 0)", "0 0 20px 10px rgba(96, 186, 129, 0.3)", "0 0 0 0 rgba(96, 186, 129, 0)"],
                                                            scale: [1, 1.1, 1]
                                                        }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                        className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-teal-500 z-10"
                                                    >
                                                        <TrendingUp size={16} className="text-teal-600" />
                                                    </motion.div>
                                                    <span className="text-[9px] font-bold text-teal-600 uppercase tracking-widest mt-2 bg-white/80 px-2 py-0.5 rounded backdrop-blur whitespace-nowrap">Transforming</span>
                                                </motion.div>

                                                {/* Proactive Side (The Future) */}
                                                <motion.div
                                                    initial={{ opacity: 0, rotateY: -45, x: 50 }}
                                                    animate={{ opacity: 1, rotateY: -15, x: 0 }}
                                                    transition={{ delay: 0.5, duration: 0.8 }}
                                                    className="flex-1 max-w-[260px] relative"
                                                >
                                                    <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full transform translate-x-10 translate-y-10 animate-pulse" />

                                                    <motion.div
                                                        className="bg-white rounded-3xl border-2 border-[#60BA81] p-4 shadow-[0_20px_50px_rgba(96,186,129,0.3)] relative overflow-hidden z-10"
                                                        animate={{ y: [-5, 5, -5] }}
                                                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                                    >
                                                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#60BA81]/20 to-transparent rounded-bl-full" />

                                                        <div className="text-center mb-4 relative z-10">
                                                            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-green-200 shadow-md">
                                                                <Zap size={32} className="text-[#60BA81]" />
                                                            </div>
                                                            <h3 className="text-lg font-bold text-[#284952] mb-1">Proactive</h3>
                                                            <p className="text-[9px] font-semibold text-[#60BA81] uppercase tracking-widest">Employee Engagement</p>
                                                        </div>
                                                        <div className="space-y-3 relative z-10">
                                                            {[
                                                                { t: "Continuous Feedback", i: MessageSquare },
                                                                { t: "AI-Powered Insights", i: Brain },
                                                                { t: "Continuous Improvement", i: TrendingUp }
                                                            ].map((item, i) => (
                                                                <motion.div
                                                                    key={i}
                                                                    initial={{ x: 20, opacity: 0 }}
                                                                    animate={{ x: 0, opacity: 1 }}
                                                                    transition={{ delay: 1.5 + (i * 0.2) }}
                                                                    className="flex items-center gap-2.5 p-2.5 bg-green-50 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow cursor-default"
                                                                >
                                                                    <div className="bg-white p-1.5 rounded-lg shadow-sm">
                                                                        <item.i size={14} className="text-[#60BA81]" />
                                                                    </div>
                                                                    <span className="text-[#284952] font-bold text-xs">{item.t}</span>
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                </motion.div>
                                            </div>

                                            {/* Bottom Message */}
                                            <motion.div
                                                initial={{ y: 30, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 2.2 }}
                                                className="text-center mt-6"
                                            >
                                                <div className="inline-flex items-center gap-3 px-8 py-3 bg-white rounded-full border border-[#DEE2E6] shadow-lg">
                                                    <img src="/assets/images/FOS-01.png" alt="FOS" className="w-6 h-6 object-contain" />
                                                    <span className="text-base font-medium text-[#284952]">
                                                        FOS Survey Module • Powering <span className="text-[#60BA81] font-bold">Continuous Improvement</span>
                                                    </span>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    )}

                                    {/* Original Content (Only show if not in AI sequence) */}
                                    {aiStage === 'idle' && (
                                        <>
                                            <div className="bg-gray-50 rounded p-3 text-xs text-gray-500 mb-4 flex items-center gap-2">
                                                <HelpCircle size={14} /> Any improvement or suggestion?
                                            </div>

                                            {/* AI Summary Box */}
                                            <div className="rounded-lg p-5 mb-6 text-white" style={{ background: "linear-gradient(135deg, #4A7C68 0%, #60BA81 100%)" }}>
                                                <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                                                    <Brain size={16} /> AI Analysis Summary
                                                </h4>
                                                <p className="text-xs leading-relaxed opacity-95">
                                                    The analysis reveals that while many respondents find the FlowHCM portal easy to use and have a positive user experience, there are significant technical issues and problems with pay slips and salaries that need to be addressed. The portal's attendance and leave tracking features are also causing some inconvenience. Overall, the sentiment is neutral, with a slight leaning towards positive.
                                                </p>
                                            </div>

                                            {/* Detailed Topic Analysis Table */}
                                            <h5 className="font-bold text-gray-700 text-sm mb-3 flex items-center gap-2">
                                                <div className="w-4 h-4 rounded bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle size={10} /></div> Detailed Topic Analysis
                                            </h5>

                                            <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                                                <div className="grid grid-cols-12 bg-[#27444E] text-white text-[10px] font-bold py-2.5 px-4 uppercase tracking-wider">
                                                    <div className="col-span-4">Topic</div>
                                                    <div className="col-span-2 text-center">Percentage</div>
                                                    <div className="col-span-2 text-center">Sentiment</div>
                                                    <div className="col-span-4">Key Insights</div>
                                                </div>
                                                <div className="divide-y divide-gray-100 text-xs">
                                                    <AnalysisRow
                                                        topic="Technical Issues with FlowHCM"
                                                        percent="31.1%"
                                                        count="23"
                                                        sentiment="Negative"
                                                        insights={["FlowHCM not working", "Technical issues", "Login issues"]}
                                                    />
                                                    <AnalysisRow
                                                        topic="User Experience and Ease of Use"
                                                        percent="27.0%"
                                                        count="20"
                                                        sentiment="Positive"
                                                        insights={["Easy to use", "User friendly", "Smooth experience"]}
                                                    />
                                                    <AnalysisRow
                                                        topic="Pay Slip and Salary Issues"
                                                        percent="20.3%"
                                                        count="15"
                                                        sentiment="Negative"
                                                        insights={["Pay slip not available", "Salary deductions", "Incorrect salary"]}
                                                    />
                                                    <AnalysisRow
                                                        topic="Attendance and Leave Tracking"
                                                        percent="12.2%"
                                                        count="9"
                                                        sentiment="Neutral"
                                                        insights={["Attendance tracking", "Leave quota"]}
                                                    />
                                                </div>
                                            </div>

                                            {/* Sample Responses */}
                                            <h5 className="font-bold text-gray-700 text-sm mb-3 flex items-center gap-2">
                                                <MessageSquare size={14} className="text-orange-400" /> Sample Responses
                                            </h5>
                                            <div className="space-y-2">
                                                {["Yes we face issues with using FlowHCM because if we want to check our current month pay slip we can't check because they hide it...", "It's fine", "Pay slip is not properly mention", "Sometimes the portal doesn't work properly", "Right now no improvement required"].map((r, i) => (
                                                    <div key={i} className="bg-gray-50 border border-gray-100 p-3 rounded text-[11px] text-gray-600">
                                                        <span className="font-bold text-gray-400 mr-2">{i + 1}</span>{r}
                                                    </div>
                                                ))}
                                                <div className="text-center text-[10px] text-gray-400 italic mt-2">... and 69 more responses</div>
                                            </div>
                                        </>
                                    )}
                                </QuestionCardReplica>

                                {/* 5. Chart Card 3: Policies (Bar) */}
                                <motion.div animate={{ opacity: isZooming ? 0 : 1 }} transition={{ duration: 0.5 }}>
                                    <QuestionCardReplica
                                        number="5"
                                        type="checkbox"
                                        required
                                        question="Do you know about the following HR policies."
                                        responses="74"
                                    >
                                        <div className="h-64 mt-6 relative pl-8 pb-8">
                                            {/* Y Axis */}
                                            <div className="absolute left-0 top-0 bottom-8 w-8 flex flex-col justify-between text-[10px] text-gray-400 text-right pr-2">
                                                <span>70</span><span>60</span><span>50</span><span>40</span><span>30</span><span>20</span><span>10</span><span>0</span>
                                            </div>
                                            {/* Bars Container */}
                                            <div className="w-full h-full flex items-end justify-around border-l border-b border-gray-200">
                                                <Bar height="85%" color="#5E7595" label="Leave Policy" />
                                                <Bar height="65%" color="#4D869F" label="Attendance Policy" />
                                                <Bar height="45%" color="#7FB0B2" label="Sexual Harassment Policy" />
                                                <Bar height="75%" color="#A1C6C5" label="Employee Handbook" />
                                                <Bar height="92%" color="#C4D7D6" label="Health & Safety" />
                                            </div>
                                        </div>
                                    </QuestionCardReplica>
                                </motion.div>

                                <div className="h-20" /> {/* Spacer */}
                            </motion.div>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence >
        </motion.div >
    )
}

// --- HELPER COMPONENTS ---

const MetaCard = ({ label, value, color }: { label: string, value: string, color: string }) => (
    <div className="rounded-md p-3 text-white h-20 flex flex-col justify-between" style={{ backgroundColor: color }}>
        <div className="text-[10px] font-medium opacity-90">{label}</div>
        <div className="text-xl font-bold">{value}</div>
    </div>
)

const QuestionCardReplica = ({ number, type, required, question, responses, children, innerRef, hideHeader, ghost, isFocused }: any) => (
    <motion.div
        animate={{
            scale: isFocused ? 1.05 : 1,
            boxShadow: isFocused ? "0 20px 50px rgba(0,0,0,0.15)" : "0 1px 2px rgba(0,0,0,0.05)"
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`${ghost ? "" : "bg-white rounded-lg border border-gray-200"} p-5 transition-all duration-700 relative z-[1] ${isFocused ? 'z-10' : ''}`}
        ref={innerRef}
    >
        {!hideHeader && (
            <div className="flex justify-between items-start mb-3.5">
                <div className="flex gap-3.5">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm flex-shrink-0" style={{ backgroundColor: THEME.green }}>
                        {number}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide">{type}</span>
                            {required && <span className="bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded text-[9px] font-bold border border-orange-100 flex items-center gap-1">★ Required</span>}
                        </div>
                        <h3 className="text-sm font-bold text-gray-800 leading-tight max-w-lg">{question}</h3>
                    </div>
                </div>
                <div className="text-right flex-shrink-0">
                    <div className="text-[8px] text-gray-400 uppercase font-black tracking-widest">Responses</div>
                    <div className="text-lg font-black text-gray-800">{responses}</div>
                </div>
            </div>
        )}
        <div className={(hideHeader || ghost) ? "" : "bg-gray-50/50 rounded-lg p-2 border border-gray-100/50"}>
            {children}
        </div>
    </motion.div>
)

const LegendRow = ({ color, label }: { color: string, label: string }) => (
    <div className="flex items-center gap-2">
        <div className="w-8 h-3 rounded-[2px]" style={{ backgroundColor: color }}></div>
        <span className="text-xs text-gray-600 font-medium">{label}</span>
    </div>
)

const AnalysisRow = ({ topic, percent, count, sentiment, insights }: any) => (
    <div className="grid grid-cols-12 py-2 hover:bg-gray-50 items-center px-4">
        <div className="col-span-4 font-bold text-gray-700 text-xs leading-tight">{topic}</div>
        <div className="col-span-2 text-center">
            <div className="bg-gray-100 rounded px-1.5 py-0.5 inline-block text-[11px] font-bold text-gray-700">{percent}</div>
            <div className="text-[8px] text-gray-400 mt-0.5">{count} responses</div>
        </div>
        <div className="col-span-2 text-center flex justify-center">
            {sentiment === 'Negative' && <span className="flex items-center gap-1 text-[9px] font-bold bg-red-50 text-red-600 px-1.5 py-0.5 rounded-full"><div className="w-1 h-1 rounded-full bg-red-600"></div> Negative</span>}
            {sentiment === 'Positive' && <span className="flex items-center gap-1 text-[9px] font-bold bg-green-50 text-green-600 px-1.5 py-0.5 rounded-full"><div className="w-1 h-1 rounded-full bg-green-600"></div> Positive</span>}
            {sentiment === 'Neutral' && <span className="flex items-center gap-1 text-[9px] font-bold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full"><div className="w-1 h-1 rounded-full bg-gray-500"></div> Neutral</span>}
        </div>
        <div className="col-span-4 pl-4 space-y-0.5">
            {insights.map((insight: string, i: number) => (
                <div key={i} className="flex items-center gap-1 text-[9px] text-gray-500">
                    <div className="w-1 h-1 rounded-full bg-green-500"></div> {insight}
                </div>
            ))}
        </div>
    </div>
)

const Bar = ({ height, color, label }: any) => (
    <div className="h-full flex flex-col justify-end items-center group w-1/6 px-2">
        <motion.div
            initial={{ height: 0 }}
            whileInView={{ height }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full rounded-t-sm relative group-hover:opacity-90 transition-opacity"
            style={{ backgroundColor: color }}
        >
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                {height}
            </div>
        </motion.div>
        <div className="mt-2 text-[9px] text-gray-500 text-center leading-tight h-8 flex items-center justify-center">{label}</div>
    </div>
)

// Helper: Floating Card for Ingestion Phase (Copied from SceneAI)
const FloatingCard = ({ item, index, total, time }: any) => {
    // Calculated circular starting position
    const angle = (index / total) * Math.PI * 2
    const radius = 160 // Expanded distance from center
    const startX = Math.cos(angle) * radius
    const startY = Math.sin(angle) * radius

    return (
        <motion.div
            className="absolute bg-white p-2 rounded-lg border-l-2 shadow-md w-32 text-[8.5px] z-50 pointer-events-none border-gray-200"
            style={{
                borderColor: item.type === 'positive' ? THEME.green : item.type === 'negative' ? THEME.chartBlue : THEME.slate,
                left: '50%',
                top: '50%',
                marginLeft: '-64px', // Center offset
                marginTop: '-20px',
            }}
            initial={{ x: startX, y: startY, opacity: 0, scale: 0.8 }}
            animate={{
                x: [startX, startX * 0.8, 0], // Move towards center
                y: [startY, startY * 0.8, 0],
                opacity: [0, 1, 0], // Fade in then out as it hits center
                scale: [0.8, 1, 0.2], // Shrink into center
            }}
            transition={{
                duration: 2.5,
                delay: index * 0.4,
                times: [0, 0.2, 1],
                ease: "easeInOut"
            }}
        >
            <div className="flex items-center justify-between mb-1 opacity-60">
                <span className="font-bold">ORD-{1024 + index}</span>
                {item.type === 'positive' && <CheckCircle size={10} className="text-green-500" />}
                {item.type === 'negative' && <AlertCircle size={10} className="text-blue-500" />}
            </div>
            <div className="text-gray-700 truncate font-medium">{item.text}</div>
        </motion.div>
    )
}
