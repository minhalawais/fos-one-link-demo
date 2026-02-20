"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
    BarChart3, Edit, Trash2, PieChart,
    Download, FileText, Clock, Calendar, Hash, HelpCircle,
    X, ClipboardList, CheckCircle2,
    LayoutDashboard, MousePointer2, Users, Shield,
    AlertTriangle, TrendingUp, ExternalLink
} from "lucide-react"
import { useMemo } from "react"
import { SceneDashboard } from "../module5/scene-dashboard.tsx"

// --- SYSTEM COLORS ---
const COLORS = {
    teal: "#0f9690",
    darkTeal: "#284952",
    green: "#10B981",
    charcoal: "#17161A",
    vibrantBlue: "#3B82F6",
    cyan: "#06B6D4",
    white: "#FFFFFF",
    bg: "#F8FAFC",
    border: "#E2E8F0",
    orange: "#F5A83C",
    fosGreen: "#2E7D32",
}

interface SceneProps {
    isActive: boolean
    progress: number
}

// ==========================================
// 1. FOS DASHBOARD VIEW (0-5s)
// Uses the real SceneDashboard from module5
// with a "Launch Survey" overlay button
// ==========================================
const FOSDashboardView = ({ progress }: { progress: number }) => {
    const expanded = progress > 1.5
    const showCursor = progress > 2.5
    const click = progress > 4

    return (
        <motion.div
            key="fos-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full absolute inset-0 overflow-hidden"
        >
            {/* Render the actual dashboard (static, no timing interactions) */}
            <div className="w-full h-full pointer-events-none">
                <SceneDashboard isActive={true} progress={0} />
            </div>

            {/* RIGHT WALL SLIDING SIDEBAR - matching dashboard screenshot */}

            {/* RIGHT WALL SIDEBAR - Separate Logic for Download & Launch */}
            <div className="absolute right-0 top-0 bottom-0 z-[60] flex flex-col justify-center items-end pointer-events-none gap-3 pr-0">

                {/* 1. DOWNLOAD DATA (Always Collapsed) */}
                <motion.div
                    className="rounded-l-xl overflow-hidden shadow-lg bg-teal-600 cursor-pointer relative z-20"
                    style={{ backgroundColor: COLORS.teal, writingMode: "vertical-rl" }}
                    initial={{ x: 0 }} // Stays put
                >
                    <div className="px-2 py-4 flex items-center gap-2 text-white">
                        <Download size={12} />
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Download Data</span>
                    </div>
                </motion.div>

                {/* 2. LAUNCH A SURVEY (Expands) */}
                <div className="relative flex items-center justify-end">
                    {/* The Expanded Card (slides in) */}
                    <motion.div
                        initial={{ x: 160 }} // Hidden off-screen right
                        animate={{ x: expanded ? 0 : 160 }} // Slides in to 0
                        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                        className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-l-2xl border-l border-gray-200 flex flex-col gap-4 p-3 w-[130px] relative z-10"
                    >
                        {/* Only Launch Survey Content Here */}
                        <motion.div
                            animate={{
                                boxShadow: [
                                    `0 4px 15px ${COLORS.orange}40`,
                                    `0 8px 30px ${COLORS.orange}70`,
                                    `0 4px 15px ${COLORS.orange}40`,
                                ],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="rounded-xl p-3 flex flex-col items-center gap-2 text-white shadow-md relative overflow-hidden"
                            style={{ backgroundColor: COLORS.orange }}
                        >
                            <Edit size={18} />
                            <span className="text-[9px] font-bold uppercase text-center leading-tight tracking-wide">
                                Launch A<br />Survey
                            </span>
                            {/* Shimmer */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* The Collapsed Vertical Tab (Visible only when NOT expanded) */}
                    <motion.div
                        initial={{ opacity: 1, x: 0 }}
                        animate={{
                            opacity: expanded ? 0 : 1,
                            x: expanded ? 100 : 0, // Slide out as card slides in? Or just fade
                            pointerEvents: expanded ? 'none' : 'auto'
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute right-0 rounded-l-xl overflow-hidden shadow-lg cursor-pointer z-30"
                        style={{ backgroundColor: COLORS.orange, writingMode: "vertical-rl" }}
                    >
                        <div className="px-2 py-4 flex items-center gap-2 text-white">
                            <Edit size={12} />
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Launch A Survey</span>
                        </div>
                    </motion.div>
                </div>

                {/* Cursor Animation */}
                {showCursor && (

                    <motion.div
                        className="absolute z-[70] pointer-events-none drop-shadow-md"
                        initial={{ x: -200, y: 100, opacity: 0 }}
                        animate={{
                            x: [-200, -80, -80, -80], // Target the center of the expanded card
                            y: [100, 85, 85, 85], // Moved down to hit the button center
                            opacity: [0, 1, 1, 1],
                        }}
                        transition={{
                            duration: 1.3,
                            times: [0, 0.5, 0.7, 0.85],
                            ease: "easeInOut",
                        }}
                    >
                        {/* High-quality Mac-style cursor */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4L11.5 21L15 14L22 13L4 4Z" fill="black" stroke="white" strokeWidth="1.5" strokeLinejoin="round" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.2))" />
                        </svg>
                        {/* Click ripple */}
                        {click && (
                            <motion.div
                                className="absolute top-0 left-0 w-5 h-5 rounded-full border-2"
                                style={{ borderColor: COLORS.orange }}
                                initial={{ scale: 0, opacity: 0.7 }}
                                animate={{ scale: 3, opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                        )}
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}


// ==========================================
// 2. SURVEY MANAGEMENT PAGE (5-10s)
// ==========================================
const SurveyManagementView = ({ progress }: { progress: number }) => {
    const showCursor = progress > 7.5
    const click = progress > 9

    return (
        <motion.div
            key="survey-mgmt"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full absolute inset-0 overflow-hidden flex flex-col"
            style={{ backgroundColor: COLORS.bg }}
        >
            {/* Page Header - Gradient Banner */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mx-6 mt-5 rounded-xl px-5 py-3 flex items-center justify-between relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${COLORS.darkTeal} 0%, ${COLORS.orange}CC 100%)` }}
            >
                {/* Background decorative circle */}
                <div className="absolute right-0 top-0 w-48 h-48 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />

                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur">
                        <HelpCircle size={20} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white">Survey Questions Management</h1>
                        <p className="text-[11px] text-white/70">Create, manage, and organize your survey questions with elegance and precision</p>
                    </div>
                </div>
                <motion.button
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-white relative z-10 flex items-center gap-2"
                    style={{ backgroundColor: COLORS.green }}
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    + Add New Survey
                </motion.button>
            </motion.div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4 px-6 mt-4">
                {[
                    { label: "TOTAL SURVEYS", val: "13", icon: BarChart3, col: COLORS.green },
                    { label: "TOTAL QUESTIONS", val: "260", icon: HelpCircle, col: COLORS.orange },
                    { label: "AVG. TIME", val: "5 min", icon: Clock, col: COLORS.charcoal },
                    { label: "ACTIVE", val: "13", icon: CheckCircle2, col: COLORS.green },
                ].map((stat, i) => (
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.15 + i * 0.08 }}
                        key={i}
                        className="bg-white rounded-xl p-3 shadow-sm flex items-center gap-4"
                    >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: stat.col }}>
                            <stat.icon size={16} />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase">{stat.label}</p>
                            <h3 className="text-xl font-bold text-gray-800">{stat.val}</h3>
                            <div className="w-12 h-0.5 mt-1 rounded" style={{ backgroundColor: stat.col }} />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Survey Grid */}
            <div className="grid grid-cols-3 gap-5 px-6 mt-4 relative">
                {[
                    { id: 43, title: "Organizational Effectiveness & Engagement Survey", qs: 39, time: "20", status: "ACTIVE", startDate: "Jan 1, 2026", exp: "Feb 28, 2026" },
                    { id: 42, title: "صداقت کے ملازمین کا سروے", qs: 25, time: "10", status: "ACTIVE", startDate: "Jan 15, 2026", exp: "Jan 31, 2026" },
                    { id: 41, title: "Health & Safety Pulse Check Q1", qs: 36, time: "10", status: "EXPIRED", startDate: "Nov 1, 2025", exp: "Dec 31, 2025" },
                ].map((survey, i) => (
                    <motion.div
                        key={survey.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col p-3.5 relative"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS.green }} />
                                <span className="px-2 py-0.5 rounded text-[8px] font-bold text-white" style={{ backgroundColor: survey.id === 42 ? COLORS.green : 'rgba(96, 186, 129, 0.7)' }}>
                                    # ID: {survey.id}
                                </span>
                            </div>
                            <span
                                className={`px-2 py-0.5 rounded-full text-[8px] font-bold text-white ${survey.status === 'ACTIVE' ? '' : 'bg-gray-500'}`}
                                style={{ backgroundColor: survey.status === 'ACTIVE' ? COLORS.green : undefined }}
                            >
                                ● {survey.status}
                            </span>
                        </div>

                        {/* Title */}
                        <h4 className="font-bold text-[13px] text-gray-800 mb-2 leading-tight min-h-[32px] line-clamp-2">
                            {survey.title}
                        </h4>

                        {/* Description line */}
                        <p className="text-[8px] text-gray-400 mb-3 line-clamp-2">
                            This anonymous survey is to receive your honest feedback about your experiences at workplace...
                        </p>

                        {/* Metrics */}
                        <div className="flex gap-3 mb-3">
                            <div className="flex-1 bg-gray-50 rounded-lg p-2 text-center border border-gray-100">
                                <span className="block text-base font-bold" style={{ color: COLORS.green }}>{survey.qs}</span>
                                <span className="text-[7px] font-bold text-gray-400 uppercase">QUESTIONS</span>
                            </div>
                            <div className="flex-1 bg-gray-50 rounded-lg p-2 text-center border border-gray-100">
                                <span className="block text-base font-bold" style={{ color: COLORS.orange }}>{survey.time}</span>
                                <span className="text-[7px] font-bold text-gray-400 uppercase">EST. TIME</span>
                            </div>
                        </div>

                        {/* Date */}
                        <div className="flex justify-between text-[8px] font-medium text-gray-400 mb-3">
                            <span className="flex items-center gap-1"><Calendar size={8} /> {survey.startDate}</span>
                            <span className="flex items-center gap-1" style={{ color: COLORS.vibrantBlue }}><Clock size={8} /> {survey.exp}</span>
                        </div>

                        {/* Buttons */}
                        <div className="space-y-1.5 mt-auto">
                            <motion.button
                                animate={{ scale: (survey.id === 42 && click) ? 0.95 : 1 }}
                                className="w-full py-1.5 text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-2 relative overflow-hidden"
                                style={{ backgroundColor: COLORS.green }}
                            >
                                <CheckCircle2 size={9} /> View Details
                                {survey.id === 42 && click && (
                                    <motion.span
                                        initial={{ scale: 0, opacity: 0.5 }}
                                        animate={{ scale: 2, opacity: 0 }}
                                        className="absolute w-full h-full bg-white/50 rounded-full"
                                    />
                                )}
                            </motion.button>
                            <button className="w-full py-1.5 text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-2" style={{ backgroundColor: COLORS.orange }}>
                                <Edit size={9} /> Edit Questions
                            </button>
                            <div className="flex gap-2">
                                <button className="flex-1 py-1.5 text-white text-[9px] font-bold rounded-lg flex items-center justify-center gap-1" style={{ backgroundColor: COLORS.green }}>
                                    <Edit size={9} /> Edit Survey
                                </button>
                                <button className="flex-1 py-1.5 bg-slate-700 text-white text-[9px] font-bold rounded-lg flex items-center justify-center gap-1">
                                    <Trash2 size={9} /> Delete
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* CURSOR SIMULATION */}
                {showCursor && (
                    <motion.div
                        initial={{ x: 500, y: -100, opacity: 0 }}
                        animate={{
                            x: [500, 195, 195, 195],
                            y: [-100, 330, 330, 330],
                            opacity: [0, 1, 1, 1],
                            scale: [1, 1, 0.85, 1],
                        }}
                        transition={{
                            duration: 1.4,
                            times: [0, 0.5, 0.7, 0.85],
                            ease: "easeInOut",
                        }}
                        className="absolute z-50 pointer-events-none drop-shadow-md"
                    >
                        {/* High-quality Mac-style cursor */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4L11.5 21L15 14L22 13L4 4Z" fill="black" stroke="white" strokeWidth="1.5" strokeLinejoin="round" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.2))" />
                        </svg>
                        {/* Click ripple */}
                        <motion.div
                            className="absolute top-0 left-0 w-4 h-4 rounded-full border-2"
                            style={{ borderColor: COLORS.green }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: [0, 0, 2.5],
                                opacity: [0, 0, 0.6, 0],
                            }}
                            transition={{
                                duration: 1.4,
                                times: [0, 0.65, 0.85, 1],
                                ease: "easeOut",
                            }}
                        />
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}


// ==========================================
// HELPER: QUESTION CARD
// ==========================================
const QuestionCard = ({ i, type, q, opts }: { i: number, type: string, q: string, opts?: string[] }) => (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between mb-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase">Question {i}</span>
            <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${type === 'radio' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>{type}</span>
        </div>
        <h4 className="font-bold text-gray-800 mb-3 text-[13px]">{q}</h4>
        {opts && (
            <div className="space-y-1.5">
                {opts.map((o, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                        <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${idx === 0 ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                            {idx === 0 && <div className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                        </div>
                        <span className="text-[11px] text-gray-600">{o}</span>
                    </div>
                ))}
            </div>
        )}
        {!opts && <div className="h-8 bg-gray-50 rounded border border-gray-200 border-dashed" />}
    </div>
)

// ==========================================
// 3. DETAILS VIEW (10-17s)
// ==========================================
const DetailsView = ({ progress }: { progress: number }) => {
    const localT = Math.max(0, progress - 10)
    const scrollY = Math.min(600, localT * 120)

    return (
        <motion.div
            key="details"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full h-full flex flex-col absolute inset-0 overflow-hidden"
            style={{ backgroundColor: COLORS.bg }}
        >
            {/* FIXED HEADER */}
            <div className="h-16 w-full flex items-center justify-between px-6 shadow-md z-30 relative flex-shrink-0"
                style={{ background: `linear-gradient(90deg, ${COLORS.teal}, ${COLORS.darkTeal})` }}
            >
                <div>
                    <div className="flex items-center gap-2 text-white">
                        <BarChart3 size={16} />
                        <h1 className="text-lg font-bold">Survey Details</h1>
                    </div>
                    <p className="text-white/80 text-[11px] mt-0.5">Comprehensive survey information and statistics</p>
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"><X size={16} className="text-white" /></div>
            </div>

            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-hidden relative">
                <motion.div
                    className="p-8 space-y-8 pb-32"
                    style={{ y: -scrollY }}
                >
                    {/* === TOP STATS SECTION === */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-800 font-serif" style={{ direction: "rtl" }}>
                                صداقت کے ملازمین کا سروے
                            </h2>
                            <div className="flex gap-3">
                                <button className="px-3 py-1.5 rounded text-white text-[10px] font-bold flex items-center gap-2 shadow-sm" style={{ backgroundColor: "#2962FF" }}><FileText size={12} /> View Full Report</button>
                                <button className="px-3 py-1.5 rounded text-white text-[10px] font-bold flex items-center gap-2 shadow-sm" style={{ backgroundColor: "#6200EA" }}><Edit size={12} /> Edit Survey</button>
                                <button className="px-3 py-1.5 rounded text-white text-[10px] font-bold flex items-center gap-2 shadow-sm" style={{ backgroundColor: "#D50000" }}><Trash2 size={12} /> Delete Survey</button>
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <p className="text-xs text-gray-500 font-medium">
                            This survey is being conducted to improve the quality of your work... (Anonymous)
                        </p>

                        <div className="rounded-xl p-4.5 shadow-lg text-white" style={{ backgroundColor: "#2E7D32" }}>
                            <h3 className="flex items-center gap-2 font-bold text-base mb-6"><PieChart size={18} /> Response Statistics</h3>
                            <div className="grid grid-cols-4 gap-4 mb-8">
                                {[
                                    { val: "6", lbl: "TOTAL INVITED" }, { val: "6", lbl: "COMPLETED" },
                                    { val: "0", lbl: "PENDING" }, { val: "100.00%", lbl: "COMPLETION RATE", bar: true }
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/10 rounded-lg p-6 flex flex-col items-center justify-center border border-white/10 relative overflow-hidden">
                                        <span className="text-3xl font-bold mb-1">{item.val}</span>
                                        <span className="text-[9px] uppercase font-bold text-white/70">{item.lbl}</span>
                                        {item.bar && <div className="w-full h-1.5 bg-black/20 rounded-full mt-2"><div className="w-full h-full bg-white rounded-full" /></div>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-5 gap-4">
                            {[
                                { val: "40", lbl: "SURVEY ID", bg: COLORS.teal, icon: Hash },
                                { val: "31", lbl: "QUESTIONS", bg: "#2962FF", icon: HelpCircle },
                                { val: "15", lbl: "EST. TIME", bg: COLORS.vibrantBlue, icon: Clock },
                                { val: "12/1/2025", lbl: "CREATED", bg: "#7B1FA2", icon: Calendar },
                                { val: "12/31/2025", lbl: "EXPIRES", bg: "#F44336", icon: Calendar },
                            ].map((c, i) => (
                                <div key={i} className="rounded-lg p-3 text-white shadow-md flex items-end justify-between overflow-hidden relative h-20" style={{ background: `linear-gradient(135deg, ${c.bg}, ${c.bg}dd)` }}>
                                    <div><h4 className="text-2xl font-bold mb-1">{c.val}</h4><p className="text-[9px] font-bold uppercase opacity-80">{c.lbl}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* === QUESTIONS LIST === */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <ClipboardList size={20} style={{ color: COLORS.green }} /> Questions (31)
                        </h3>

                        <QuestionCard i={1} type="radio" q="Branch:" opts={["Johar Town", "Bahria Town", "Emporium Branch", "Cloud Kitchen", "Phase 6 Branch", "DHA CC Branch"]} />
                        <QuestionCard i={2} type="text" q="Time Duration as Branch Leader:" />
                        <QuestionCard i={3} type="time" q="Total time with Johnny & Jugnu:" />
                        <QuestionCard i={4} type="radio" q="I feel trusted and empowered by my Operations Leader..." opts={["Strongly Disagree", "Disagree", "Agree", "Strongly Agree"]} />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================
export const SceneInitiation = ({ isActive, progress }: SceneProps) => {
    let view = 'dashboard'    // 0-5s: FOS Dashboard with Launch Survey
    if (progress >= 5 && progress < 10) view = 'survey-mgmt' // 5-10s: Survey Management page
    else if (progress >= 10) view = 'details' // 10-17s: Survey details

    return (
        <div className="w-full h-full font-sans overflow-hidden relative">
            <AnimatePresence mode="wait">
                {view === 'dashboard' && <FOSDashboardView progress={progress} />}
                {view === 'survey-mgmt' && <SurveyManagementView progress={progress} />}
                {view === 'details' && <DetailsView progress={progress} />}
            </AnimatePresence>
        </div>
    )
}
