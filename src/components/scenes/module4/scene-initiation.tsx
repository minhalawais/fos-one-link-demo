"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
    BarChart3, Edit, Trash2, PieChart,
    Download, FileText, Clock, Calendar, Hash, HelpCircle,
    X, ClipboardList, CheckCircle2,
    LayoutDashboard, MousePointer2
} from "lucide-react"
import { useMemo } from "react"

// --- SYSTEM COLORS ---
const COLORS = {
    teal: "#0f9690",
    darkTeal: "#284952",
    green: "#60BA81",
    charcoal: "#17161A",
    orange: "#F5A83C",
    white: "#FFFFFF",
    bg: "#F5F5F7",
    border: "#DEE2E6",
}

interface SceneProps {
    isActive: boolean
    progress: number
}

// ==========================================
// 1. INTRO VIEW (0-4s)
// ==========================================
const IntroView = () => (
    <motion.div
        key="intro"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="w-full h-full flex flex-col items-center justify-center bg-white z-10 absolute inset-0"
    >
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 rounded-3xl mb-6 flex items-center justify-center shadow-xl"
            style={{ background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.darkTeal})` }}
        >
            <LayoutDashboard size={48} className="text-white" />
        </motion.div>
        <h1 className="text-5xl font-bold mb-3" style={{ color: COLORS.teal }}>
            Survey Management
        </h1>
        <p className="text-xl text-gray-500 font-medium tracking-wide">Create. Manage. Analyze.</p>
    </motion.div>
)

// ==========================================
// 2. DASHBOARD LIST VIEW (4-8s)
// ==========================================
const DashboardView = ({ progress }: { progress: number }) => {
    // Cursor Animation (Starts at 6s, Clicks at 7.5s)
    const showCursor = progress > 5.5
    const click = progress > 7.5

    return (
        <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full h-full p-8 flex flex-col gap-8 absolute inset-0 overflow-hidden"
            style={{ backgroundColor: COLORS.bg }}
        >
            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-6">
                {[
                    { label: "TOTAL SURVEYS", val: "13", icon: ClipboardList, col: COLORS.green },
                    { label: "TOTAL QUESTIONS", val: "260", icon: HelpCircle, col: COLORS.orange },
                    { label: "AVG. TIME", val: "5 min", icon: Clock, col: COLORS.charcoal },
                    { label: "ACTIVE", val: "13", icon: CheckCircle2, col: COLORS.green },
                ].map((stat, i) => (
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        key={i}
                        className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-between"
                    >
                        <div>
                            <p className="text-xs font-bold text-gray-400 mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-gray-800">{stat.val}</h3>
                        </div>
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: stat.col }}>
                            <stat.icon size={24} />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Survey Grid */}
            <div className="grid grid-cols-3 gap-6 relative">
                {[
                    { id: 43, title: "Organizational Effectiveness & Engagement Survey", qs: 39, time: "20", status: "ACTIVE", exp: "Feb 28, 2026" },
                    { id: 42, title: "صداقت کے ملازمین کا سروے", qs: 25, time: "10", status: "ACTIVE", exp: "Jan 31, 2026" },
                    { id: 41, title: "Health & Safety Pulse Check Q1", qs: 36, time: "10", status: "EXPIRED", exp: "Dec 31, 2025" },
                ].map((survey, i) => (
                    <motion.div
                        key={survey.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col p-5 relative"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.green }} />
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold text-white" style={{ backgroundColor: survey.id === 42 ? COLORS.green : 'rgba(96, 186, 129, 0.7)' }}># ID: {survey.id}</span>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${survey.status === 'ACTIVE' ? '' : 'bg-gray-500'}`} style={{ backgroundColor: survey.status === 'ACTIVE' ? COLORS.green : undefined }}>
                                {survey.status}
                            </span>
                        </div>

                        {/* Title */}
                        <h4 className="font-bold text-sm text-gray-800 mb-2 leading-tight min-h-[40px] line-clamp-2">
                            {survey.title}
                        </h4>

                        {/* Metrics */}
                        <div className="flex gap-4 mb-4">
                            <div className="flex-1 bg-gray-50 rounded p-2 text-center border border-gray-100">
                                <span className="block text-xl font-bold" style={{ color: COLORS.green }}>{survey.qs}</span>
                                <span className="text-[9px] font-bold text-gray-400 uppercase">QUESTIONS</span>
                            </div>
                            <div className="flex-1 bg-gray-50 rounded p-2 text-center border border-gray-100">
                                <span className="block text-xl font-bold" style={{ color: COLORS.orange }}>{survey.time}</span>
                                <span className="text-[9px] font-bold text-gray-400 uppercase">EST. TIME</span>
                            </div>
                        </div>

                        {/* Date */}
                        <div className="flex justify-between text-[10px] font-medium text-gray-400 mb-4">
                            <span className="flex items-center gap-1"><Calendar size={10} /> Jan 27, 2026</span>
                            <span className="flex items-center gap-1" style={{ color: COLORS.orange }}><Clock size={10} /> {survey.exp}</span>
                        </div>

                        {/* Buttons */}
                        <div className="space-y-2 mt-auto">
                            <motion.button
                                animate={{ scale: (survey.id === 42 && click) ? 0.95 : 1 }}
                                className="w-full py-2 text-white text-xs font-bold rounded flex items-center justify-center gap-2 relative overflow-hidden"
                                style={{ backgroundColor: COLORS.green }}
                            >
                                <CheckCircle2 size={12} /> View Details
                                {/* Click Ripple */}
                                {survey.id === 42 && click && (
                                    <motion.span
                                        initial={{ scale: 0, opacity: 0.5 }}
                                        animate={{ scale: 2, opacity: 0 }}
                                        className="absolute w-full h-full bg-white/50 rounded-full"
                                    />
                                )}
                            </motion.button>
                            <button className="w-full py-2 text-white text-xs font-bold rounded flex items-center justify-center gap-2" style={{ backgroundColor: COLORS.orange }}>
                                <Edit size={12} /> Edit Questions
                            </button>
                            <div className="flex gap-2">
                                <button className="flex-1 py-2 text-white text-xs font-bold rounded flex items-center justify-center gap-2" style={{ backgroundColor: COLORS.green }}>
                                    <Edit size={12} /> Edit Survey
                                </button>
                                <button className="flex-1 py-2 bg-slate-700 text-white text-xs font-bold rounded flex items-center justify-center gap-2">
                                    <Trash2 size={12} /> Delete
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* CURSOR SIMULATION */}
                {showCursor && (
                    <motion.div
                        initial={{ x: 500, y: 500, opacity: 0 }}
                        animate={{ x: 200, y: 400, opacity: 1 }} // Target Position for button on ID 42 (Middle Card)
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute z-50 pointer-events-none"
                    >
                        <MousePointer2 size={32} className="text-black drop-shadow-xl fill-white" />
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
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase">Question {i}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${type === 'radio' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>{type}</span>
        </div>
        <h4 className="font-bold text-gray-800 mb-3 text-sm">{q}</h4>
        {opts && (
            <div className="space-y-2">
                {opts.map((o, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${idx === 0 ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                            {idx === 0 && <div className="w-2 h-2 rounded-full bg-green-500" />}
                        </div>
                        <span className="text-xs text-gray-600">{o}</span>
                    </div>
                ))}
            </div>
        )}
        {!opts && <div className="h-8 bg-gray-50 rounded border border-gray-200 border-dashed" />}
    </div>
)

// ==========================================
// 3. DETAILS VIEW (8-12s)
// ==========================================
const DetailsView = ({ progress }: { progress: number }) => {
    // Scroll Logic: 8s -> 12s (4s duration)
    const localT = Math.max(0, progress - 8)
    const scrollY = Math.min(600, localT * 150)

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
            <div className="h-20 w-full flex items-center justify-between px-8 shadow-md z-30 relative flex-shrink-0"
                style={{ background: `linear-gradient(90deg, ${COLORS.teal}, ${COLORS.darkTeal})` }}
            >
                <div>
                    <div className="flex items-center gap-2 text-white">
                        <BarChart3 size={20} />
                        <h1 className="text-xl font-bold">Survey Details</h1>
                    </div>
                    <p className="text-white/80 text-xs mt-0.5">Comprehensive survey information and statistics</p>
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"><X size={18} className="text-white" /></div>
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
                            <h2 className="text-3xl font-bold text-gray-800 font-serif" style={{ direction: "rtl" }}>
                                صداقت کے ملازمین کا سروے
                            </h2>
                            <div className="flex gap-3">
                                <button className="px-4 py-2 rounded text-white text-xs font-bold flex items-center gap-2 shadow-sm" style={{ backgroundColor: "#2962FF" }}><FileText size={14} /> View Full Report</button>
                                <button className="px-4 py-2 rounded text-white text-xs font-bold flex items-center gap-2 shadow-sm" style={{ backgroundColor: "#6200EA" }}><Edit size={14} /> Edit Survey</button>
                                <button className="px-4 py-2 rounded text-white text-xs font-bold flex items-center gap-2 shadow-sm" style={{ backgroundColor: "#D50000" }}><Trash2 size={14} /> Delete Survey</button>
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <p className="text-xs text-gray-500 font-medium">
                            This survey is being conducted to improve the quality of your work... (Anonymous)
                        </p>

                        <div className="rounded-xl p-6 shadow-lg text-white" style={{ backgroundColor: "#2E7D32" }}>
                            <h3 className="flex items-center gap-2 font-bold text-lg mb-6"><PieChart size={20} /> Response Statistics</h3>
                            <div className="grid grid-cols-4 gap-4 mb-8">
                                {[
                                    { val: "6", lbl: "TOTAL INVITED" }, { val: "6", lbl: "COMPLETED" },
                                    { val: "0", lbl: "PENDING" }, { val: "100.00%", lbl: "COMPLETION RATE", bar: true }
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/10 rounded-lg p-6 flex flex-col items-center justify-center border border-white/10 relative overflow-hidden">
                                        <span className="text-4xl font-bold mb-1">{item.val}</span>
                                        <span className="text-[10px] uppercase font-bold text-white/70">{item.lbl}</span>
                                        {item.bar && <div className="w-full h-1.5 bg-black/20 rounded-full mt-2"><div className="w-full h-full bg-white rounded-full" /></div>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-5 gap-4">
                            {[
                                { val: "40", lbl: "SURVEY ID", bg: COLORS.teal, icon: Hash },
                                { val: "31", lbl: "QUESTIONS", bg: "#2962FF", icon: HelpCircle },
                                { val: "15", lbl: "EST. TIME", bg: COLORS.orange, icon: Clock },
                                { val: "12/1/2025", lbl: "CREATED", bg: "#7B1FA2", icon: Calendar },
                                { val: "12/31/2025", lbl: "EXPIRES", bg: "#F44336", icon: Calendar },
                            ].map((c, i) => (
                                <div key={i} className="rounded-lg p-4 text-white shadow-md flex items-end justify-between overflow-hidden relative h-24" style={{ background: `linear-gradient(135deg, ${c.bg}, ${c.bg}dd)` }}>
                                    <div><h4 className="text-3xl font-bold mb-1">{c.val}</h4><p className="text-[10px] font-bold uppercase opacity-80">{c.lbl}</p></div>
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
    let view = 'intro'      // 0-4s
    if (progress >= 4 && progress < 8) view = 'dashboard' // 4-8s
    else if (progress >= 8) view = 'details' // 8-12s

    return (
        <div className="w-full h-full font-sans overflow-hidden relative">
            <AnimatePresence mode="wait">
                {view === 'intro' && <IntroView />}
                {view === 'dashboard' && <DashboardView progress={progress} />}
                {view === 'details' && <DetailsView progress={progress} />}
            </AnimatePresence>
        </div>
    )
}
