"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
    BarChart3, Edit, Trash2, PieChart,
    Download, FileText, Clock, Calendar, Hash, HelpCircle,
    X, ClipboardList, CheckCircle2,
    LayoutDashboard, MousePointer2, Users
} from "lucide-react"
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

            {/* --- FOCUS OVERLAY --- */}
            {/* Blurs and dims the entire dashboard to focus on the Survey action */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: expanded ? 1 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 bg-[#17161A]/40 backdrop-blur-md z-[100] pointer-events-none"
            />

            {/* --- DASHBOARD FRAME ALIGNMENT LAYER --- */}
            {/* Invisibly matches the exact size and scale of the dashboard's BrowserFrame so the buttons dock perfectly to its edge */}
            <div className="absolute inset-0 z-[110] flex items-center justify-center pointer-events-none">
                <motion.div
                    initial={{ scale: 0.75, opacity: 0, y: 30 }}
                    animate={{ scale: 0.85, opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
                    className="w-[125%] h-[110%] max-w-[2600px] max-h-[1100px] relative origin-center pointer-events-none"
                >
                    {/* RIGHT WALL SIDEBAR - Docked exactly to the inner right border of the frame */}
                    <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center items-end pointer-events-none gap-2 pr-0 z-50">

                        {/* 1. DOWNLOAD DATA (Always Collapsed, gently dims when Survey expands) */}
                        <motion.div
                            className="rounded-l-xl overflow-hidden shadow-lg cursor-pointer relative z-20 transition-all duration-700 pointer-events-auto"
                            style={{ backgroundColor: COLORS.teal, writingMode: "vertical-rl" }}
                            initial={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                            animate={{
                                opacity: expanded ? 0.3 : 1,
                                filter: expanded ? "blur(2px)" : "blur(0px)"
                            }}
                        >
                            <div className="px-2 py-4 flex items-center gap-2 text-white">
                                <Download size={12} />
                                <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Download Data</span>
                            </div>
                        </motion.div>

                        {/* 2. LAUNCH A SURVEY (Expands) */}
                        <div className="relative flex items-center justify-end pointer-events-auto">

                            {/* The Collapsed Vertical Tab (Visible only when NOT expanded, sits normally in flex layout) */}
                            <motion.div
                                initial={{ opacity: 1, x: 0 }}
                                animate={{
                                    opacity: expanded ? 0 : 1,
                                    x: expanded ? 100 : 0, // Slide out as card slides in
                                }}
                                transition={{ duration: 0.3 }}
                                className="rounded-l-xl overflow-hidden shadow-lg cursor-pointer z-30"
                                style={{ backgroundColor: COLORS.orange, writingMode: "vertical-rl", pointerEvents: expanded ? 'none' : 'auto' }}
                            >
                                <div className="px-2 py-4 flex items-center gap-2 text-white">
                                    <Edit size={12} />
                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Survey</span>
                                </div>
                            </motion.div>

                            {/* The Expanded Card (Absolutely positioned over the collapsed one so it doesn't push layout) */}
                            <motion.div
                                initial={{ x: 160, opacity: 0 }} // Hidden off-screen right and fully invisible
                                animate={{ x: expanded ? 0 : 160, opacity: expanded ? 1 : 0 }} // Fades in & Slides in to 0
                                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm shadow-2xl rounded-l-2xl border-l border-y border-gray-200 flex flex-col gap-4 p-3 w-[130px] z-10"
                                style={{ pointerEvents: expanded ? 'auto' : 'none' }}
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

                            {/* Cursor Animation for Launch Survey Button */}
                            {showCursor && (
                                <motion.div
                                    className="absolute right-0 z-[120] pointer-events-none drop-shadow-md"
                                    style={{ top: '50%' }} // Anchored at vertical center
                                    initial={{ x: 150, y: 150, opacity: 0 }}
                                    animate={{
                                        x: [150, -65, -65, -65], // Targets center of the expanded 130px card (-65px from right)
                                        y: [150, 0, 0, 0],       // Zero offset matches exact vertical center
                                        opacity: [0, 1, 1, 1],
                                    }}
                                    transition={{
                                        duration: 1.3,
                                        times: [0, 0.5, 0.7, 0.85],
                                        ease: "easeInOut",
                                    }}
                                >
                                    {/* High-quality Mac-style cursor */}
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                                        <path d="M4 4L11.5 21L15 14L22 13L4 4Z" fill="black" stroke="white" strokeWidth="1.5" strokeLinejoin="round" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.2))" />
                                    </svg>
                                    
                                    {/* Precision Click Ripple (Centered mathematically on cursor tip at 4,4) */}
                                    {click && (
                                        <motion.div
                                            className="absolute w-6 h-6 rounded-full border-2"
                                            style={{ borderColor: COLORS.orange, top: -8, left: -8 }} 
                                            initial={{ scale: 0, opacity: 0.8 }}
                                            animate={{ scale: 2.5, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                        />
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
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
                style={{ background: `linear-gradient(135deg, #284952 0%, #60BA81 50%, #f5a83c 100%)` }}
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
                        className="bg-white rounded-xl p-3 shadow-xl flex items-center gap-4 border-xl"
                        style={{background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)', border: '1px solid rgba(255, 255, 255, 0.3)'}}
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
                    { id: 42, title: "صداقت کے ورکرز کا سروے", qs: 25, time: "10", status: "ACTIVE", startDate: "Jan 15, 2026", exp: "Jan 31, 2026" },
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

                {/* CURSOR SIMULATION TARGETING "VIEW DETAILS" IN MIDDLE CARD */}
                {showCursor && (
                    <motion.div
                        initial={{ left: "80%", top: "110%", opacity: 0 }}
                        animate={{
                            left: ["80%", "50%", "50%", "50%"], // 50% left precisely targets the middle card
                            top: ["110%", "84%", "84%", "84%"], // 84% top precisely targets the bottom 'View Details' button
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
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                            <path d="M4 4L11.5 21L15 14L22 13L4 4Z" fill="black" stroke="white" strokeWidth="1.5" strokeLinejoin="round" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.2))" />
                        </svg>

                        {/* Precision Click Ripple (Centered mathematically on cursor tip at 4,4) */}
                        <motion.div
                            className="absolute w-6 h-6 rounded-full border-2"
                            style={{ borderColor: COLORS.green, top: -8, left: -8 }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: [0, 0, 2.5],
                                opacity: [0, 0, 0.8, 0],
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
const QuestionCard = ({ i, type, q, opts }: { i: number, type: string, q: string, opts?: string[] }) => {
    const typeColors: Record<string, string> = {
        text: "from-blue-500 to-blue-600",
        textarea: "from-green-500 to-green-600",
        radio: "from-purple-500 to-purple-600",
        checkbox: "from-pink-500 to-pink-600",
        select: "from-indigo-500 to-indigo-600",
        file: "from-yellow-500 to-yellow-600",
        time: "from-orange-500 to-orange-600",
    }

    return (
        <div className="border border-gray-200 rounded-xl p-4 shadow-lg bg-white">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#60BA81] to-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                        {i}
                    </div>
                    <span className="text-[11px] font-bold text-[#60BA81] bg-[#60BA81]/10 px-2.5 py-1 rounded-full border border-[#60BA81]/20">
                        Question {i}
                    </span>
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-bold bg-gradient-to-r ${typeColors[type] || "from-gray-500 to-gray-600"} text-white shadow-md uppercase`}>
                    {type}
                </span>
            </div>

            <h5 className="font-bold text-gray-900 mb-3 text-base leading-tight">{q}</h5>

            {opts && opts.length > 0 ? (
                <div className="mt-3">
                    <span className="text-xs font-bold text-gray-700 mb-2 block">Options:</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {opts.map((option, idx) => (
                            <div key={idx} className="flex items-center p-2.5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                                <span className="w-6 h-6 bg-gradient-to-br from-[#60BA81] to-green-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold mr-2.5 shadow-sm">
                                    {idx + 1}
                                </span>
                                <span className="text-xs font-medium text-gray-700">{option}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="h-9 rounded-lg border border-dashed border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100" />
            )}
        </div>
    )
}

// ==========================================
// 3. DETAILS VIEW (10-17s)
// ==========================================
const DetailsView = ({ progress }: { progress: number }) => {
    const localT = Math.max(0, progress - 10)
    const scrollY = Math.min(640, localT * 120)

    return (
        <motion.div
            key="details"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full h-full absolute inset-0 overflow-hidden"
            style={{ backgroundColor: COLORS.bg }}
        >
            {/* modal-backdrop style */}
            <div className="absolute inset-0 bg-[#284952]/80 backdrop-blur-md" />

            <div className="absolute inset-0 flex items-center justify-center p-3">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="relative w-[93%] max-w-[1160px] h-[86%] rounded-2xl overflow-hidden border border-white/30 shadow-2xl"
                    style={{
                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)",
                        backdropFilter: "blur(20px)",
                    }}
                >
                    {/* Hero header matching survey_crud style */}
                    <div
                        className="text-white px-6 py-4 rounded-t-2xl relative overflow-hidden"
                        style={{ background: "linear-gradient(135deg, #284952 0%, #60BA81 50%, #f5a83c 100%)" }}
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12" />
                        <div className="relative z-10 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold mb-1.5 flex items-center">
                                    <BarChart3 size={24} className="mr-3" />Survey Details
                                </h2>
                                <p className="opacity-90 text-sm font-light">Comprehensive survey information and statistics</p>
                            </div>
                            <button className="text-white hover:text-gray-200 bg-white/20 hover:bg-white/30 rounded-full p-2.5 transition-all duration-300 backdrop-blur-lg">
                                <X size={16} />
                            </button>
                        </div>
                    </div>

                    {/* scrollable modal content */}
                    <div className="h-[calc(100%-92px)] overflow-hidden relative">
                        <motion.div className="p-6 space-y-6 pb-24" style={{ y: -scrollY }}>
                            <div className="mb-2">
                                <div className="flex items-center justify-between mb-5">
                                    <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent" style={{ direction: "rtl" }}>
                                        صداقت کے ورکرز کا سروے
                                    </h3>
                                    <div className="flex space-x-2.5">
                                        <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center shadow-lg">
                                            <FileText size={12} className="mr-1.5" />View Full Report
                                        </button>
                                        <button className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center shadow-lg">
                                            <Edit size={12} className="mr-1.5" />Edit Survey
                                        </button>
                                        <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center shadow-lg">
                                            <Trash2 size={12} className="mr-1.5" />Delete Survey
                                        </button>
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                                    This survey is being conducted to improve workplace operations and gather anonymous employee feedback.
                                </p>

                                <div className="bg-gradient-to-r from-[#60BA81] via-green-500 to-green-600 rounded-xl p-5 mb-6 text-white shadow-xl">
                                    <h4 className="text-xl font-bold mb-4 flex items-center">
                                        <PieChart size={20} className="mr-2.5" />Response Statistics
                                    </h4>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 mb-4">
                                        {[
                                            { val: "6", lbl: "TOTAL INVITED" },
                                            { val: "6", lbl: "COMPLETED", accent: "text-green-200" },
                                            { val: "0", lbl: "PENDING", accent: "text-orange-200" },
                                            { val: "100%", lbl: "COMPLETION RATE", bar: true },
                                        ].map((item, i) => (
                                            <div key={i} className="bg-white/20 backdrop-blur-lg rounded-lg p-3.5 text-center">
                                                <div className={`text-3xl font-bold mb-1 ${item.accent || ""}`}>{item.val}</div>
                                                <div className="text-[10px] opacity-90 font-medium uppercase tracking-wide">{item.lbl}</div>
                                                {item.bar && (
                                                    <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
                                                        <div className="bg-white h-full rounded-full w-full" />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-2.5 justify-center pt-3 border-t border-white/20">
                                        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-lg px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center shadow-lg">
                                            <CheckCircle2 size={12} className="mr-1.5" />Export Completed (6)
                                        </button>
                                        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-lg px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center shadow-lg">
                                            <Clock size={12} className="mr-1.5" />Export Pending (0)
                                        </button>
                                        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-lg px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center shadow-lg">
                                            <Users size={12} className="mr-1.5" />Export All (6)
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 mb-8">
                                    {[
                                        { val: "40", lbl: "SURVEY ID", grad: "from-[#60BA81] via-green-500 to-green-600" },
                                        { val: "31", lbl: "QUESTIONS", grad: "from-blue-500 via-blue-600 to-indigo-600" },
                                        { val: "15", lbl: "EST. TIME", grad: "from-[#f5a83c] via-orange-500 to-red-500" },
                                        { val: "12/1/2025", lbl: "CREATED", grad: "from-purple-500 via-purple-600 to-pink-600" },
                                        { val: "12/31/2025", lbl: "EXPIRES", grad: "from-pink-500 via-rose-500 to-red-500" },
                                    ].map((item, i) => (
                                        <div key={i} className={`bg-gradient-to-br ${item.grad} text-white p-3.5 rounded-xl shadow-lg`}>
                                            <div className="text-xl font-bold">{item.val}</div>
                                            <div className="text-[10px] opacity-90 font-medium uppercase tracking-wide">{item.lbl}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-2xl font-bold text-gray-900 mb-1.5 flex items-center">
                                    <ClipboardList size={22} className="mr-2.5 text-[#60BA81]" />Questions (31)
                                </h4>

                                <QuestionCard i={1} type="radio" q="Branch:" opts={["Johar Town", "Bahria Town", "Emporium Branch", "Cloud Kitchen", "Phase 6 Branch", "DHA CC Branch"]} />
                                <QuestionCard i={2} type="text" q="Time Duration as Branch Leader:" />
                                <QuestionCard i={3} type="time" q="Total time with Johnny & Jugnu:" />
                                <QuestionCard i={4} type="radio" q="I feel trusted and empowered by my Operations Leader..." opts={["Strongly Disagree", "Disagree", "Agree", "Strongly Agree"]} />
                            </div>
                        </motion.div>
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