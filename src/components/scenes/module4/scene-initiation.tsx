"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
    BarChart3, Edit, Trash2, PieChart,
    Download, FileText, Clock, Calendar, Hash, HelpCircle,
    X, ClipboardList, MessageCircle, CheckCircle2,
    LayoutDashboard, Plus, Search, Filter, Shuffle, Check, List, MousePointer2,
    Globe, Languages, ChevronDown
} from "lucide-react"
import { useRef, useEffect } from "react"

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
    softGreen: "rgba(96, 186, 129, 0.42)",
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
        className="w-full h-full flex flex-col items-center justify-center bg-white z-50 absolute inset-0"
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
    // We scroll faster now since the view is shorter
    const localT = Math.max(0, progress - 8)
    const scrollY = Math.min(600, localT * 150) // Scrolls 600px over 4s

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
                    style={{ y: -scrollY }} // RESTORED SCROLL ANIMATION
                >
                    {/* === TOP STATS SECTION (From Image 1) === */}
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
                            <div className="flex justify-center gap-4">
                                {["Export Completed (6)", "Export Pending (0)", "Export All (6)"].map((label, i) => (
                                    <button key={i} className="px-4 py-2 rounded bg-white/20 text-xs font-bold flex items-center gap-2 border border-white/20"><Download size={14} /> {label}</button>
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

                    {/* === FILTER SECTION (RESTORED) === */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Filter size={20} style={{ color: COLORS.green }} /> Survey Filters (1)</h3>
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                            <span className="px-4 py-1.5 bg-purple-600 text-white rounded-full text-xs font-bold flex items-center gap-2">
                                <Hash size={12} /> Employee id
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {["571849", "571132", "562408", "561289", "560272", "540059"].map(id => (
                                    <span key={id} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded">{id}</span>
                                ))}
                                <span className="px-3 py-1 bg-gray-50 text-gray-400 text-xs font-medium rounded">6 items</span>
                            </div>
                        </div>
                    </div>

                    {/* === QUESTIONS LIST (RESTORED) === */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <List size={20} style={{ color: COLORS.green }} /> Questions (31)
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
// 4. ADD SURVEY MODAL VIEW (12-26s)
// ==========================================
const ModalView = ({ progress }: { progress: number }) => {
    // Script Synced Typing: Starts at 12s
    const localT = Math.max(0, progress - 12)
    const contentRef = useRef<HTMLDivElement>(null)

    // SCROLL LOGIC: At 16s (localT 4s), scroll to date/languages
    useEffect(() => {
        if (localT > 4 && localT < 5 && contentRef.current) {
            contentRef.current.scrollTo({ top: 200, behavior: 'smooth' })
        }
        // At 24s (localT 12s), scroll to Filters
        if (localT > 12 && contentRef.current) {
            contentRef.current.scrollTo({ top: 400, behavior: 'smooth' })
        }
    }, [localT])

    // DATA
    const titleEn = "Employee Wellbeing Survey - Q1 2026"
    const titleUr = "ملازمین کی بہبود کا سروے - سہ ماہی 1 2026"

    const descEn = "A regular pulse check to screen the general sentiment, wellbeing and safety of our employees across all branches."
    const descUr = "تمام برانچوں میں ہمارے ملازمین کے عمومی جذبات، بہبود اور حفاظت کی جانچ کرنے کے لیے ایک باقاعدہ نبض چیک۔"

    // LANGUAGE MORPH TIMING (18s - 24s) -> localT 6s - 12s
    const isUrdu = localT > 6 && localT < 12

    // FOCUS LOGIC
    let focusSection = 'none'
    if (localT > 0 && localT < 2.5) focusSection = 'title'
    else if (localT >= 2.5 && localT < 5) focusSection = 'desc'
    else if (localT >= 5 && localT < 6.5) focusSection = 'date'
    else if (localT >= 6.5 && localT < 12) focusSection = 'lang'
    else if (localT >= 12) focusSection = 'all'

    return (
        <motion.div
            key="modal"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-8 absolute inset-0"
        >
            <motion.div
                initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }}
                className="w-full max-w-5xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-full"
                layout
            >
                {/* Header with increased padding */}
                <div className="h-28 flex items-center justify-between px-8 bg-gradient-to-r relative z-20"
                    style={{ background: `linear-gradient(90deg, ${COLORS.teal}, ${COLORS.darkTeal})` }}
                >
                    <div className="py-8">
                        <div className="flex items-center gap-3 text-white mb-2">
                            <Plus size={28} strokeWidth={3} /> <h2 className="text-3xl font-bold">Add New Survey</h2>
                        </div>
                        <p className="text-white/90 text-sm font-medium">Create a new survey with advanced filters and settings</p>
                    </div>

                    {/* Language Badge */}
                    <div className="flex items-center gap-4">
                        <AnimatePresence>
                            {isUrdu && (
                                <motion.div
                                    initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}
                                    className="bg-white text-green-700 px-3 py-1 rounded-full font-bold text-xs flex items-center gap-2 shadow-lg"
                                >
                                    🌍 Native Language Support
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                            <X size={20} className="text-white" />
                        </div>
                    </div>
                </div>

                {/* Content - Hidden Scrollbar */}
                <div ref={contentRef} className="p-8 space-y-6 overflow-hidden relative h-full">

                    {/* Fields Container */}
                    <div className="space-y-6 relative z-10">
                        {/* Title */}
                        <FocusArea label="SURVEY TITLE" isActive={focusSection === 'title' || focusSection === 'lang'} icon={isUrdu ? <Languages size={12} /> : <Edit size={12} />}>
                            <div className="h-full px-4 flex items-center text-sm text-gray-700 relative overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={isUrdu ? "ur" : "en"}
                                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
                                        className={`block w-full ${isUrdu ? "font-serif text-right text-lg text-green-700" : ""}`}
                                    >
                                        {isUrdu ? titleUr : titleEn.substring(0, Math.floor(localT * 15))}
                                    </motion.span>
                                </AnimatePresence>
                                {!isUrdu && localT < 3 && <span className="animate-pulse ml-1">|</span>}
                            </div>
                        </FocusArea>

                        {/* Desc */}
                        <FocusArea label="DESCRIPTION" isActive={focusSection === 'desc' || focusSection === 'lang'} icon={isUrdu ? <Languages size={12} /> : <FileText size={12} />} height="h-24">
                            <div className="h-full p-4 text-sm text-gray-600 leading-relaxed relative overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={isUrdu ? "ur" : "en"}
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className={`w-full ${isUrdu ? "font-serif text-right text-base text-gray-800 leading-8" : ""}`}
                                    >
                                        {isUrdu ? descUr : (localT > 2 ? descEn.substring(0, Math.floor((localT - 2) * 25)) : "")}
                                    </motion.p>
                                </AnimatePresence>
                                {!isUrdu && localT > 2 && localT < 5 && <span className="animate-pulse">|</span>}
                            </div>
                        </FocusArea>

                        {/* Grid */}
                        <motion.div
                            animate={{
                                filter: (focusSection === 'title' || focusSection === 'desc' || focusSection === 'date' || focusSection === 'lang') ? "blur(3px)" : "blur(0px)",
                                opacity: (focusSection === 'title' || focusSection === 'desc' || focusSection === 'date' || focusSection === 'lang') ? 0.4 : 1
                            }}
                            className="grid grid-cols-2 gap-6"
                        >
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">QUESTION COUNT:</label>
                                <div className="h-12 bg-white border border-gray-300 rounded-lg px-4 flex items-center text-sm shadow-sm">
                                    {localT > 4 ? "35" : "0"}
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">ESTIMATED TIME (MINUTES):</label>
                                <div className="h-12 bg-white border border-gray-300 rounded-lg px-4 flex items-center text-sm shadow-sm">
                                    {localT > 4 ? "15" : "5"}
                                </div>
                            </div>
                        </motion.div>

                        {/* Date & Language Toggle Row */}
                        <div className="grid grid-cols-2 gap-6">
                            <FocusArea label="EXPIRY DATE" isActive={focusSection === 'date'} icon={<Calendar size={12} />}>
                                <div className="h-full px-4 flex items-center justify-between text-sm">
                                    <span className={localT > 5 ? "text-gray-800" : "text-gray-400"}>
                                        {localT > 5 ? "Feb 28, 2026" : "dd/mm/yyyy"}
                                    </span>
                                    <Calendar size={18} className="text-gray-400" />
                                </div>
                            </FocusArea>

                            {/* New Language Dropdown */}
                            <FocusArea label="SURVEY LANGUAGE" isActive={focusSection === 'lang'} icon={<Globe size={12} />}>
                                <div className="h-full px-4 flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        {isUrdu ? <span className="text-2xl">🇵🇰</span> : <span className="text-2xl">🇺🇸</span>}
                                        <span className="font-bold text-gray-700">{isUrdu ? "Urdu (اردو)" : "English (Default)"}</span>
                                    </div>
                                    <ChevronDown size={16} className="text-gray-400" />
                                </div>
                            </FocusArea>
                        </div>
                    </div>

                    {/* Filters (Blurred initially) */}
                    <motion.div
                        initial={{ opacity: 0.5, filter: "blur(2px)" }}
                        animate={{ opacity: 0.5, filter: "blur(2px)" }}
                        className="pt-2"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Filter size={20} style={{ color: COLORS.teal, fill: COLORS.teal }} />
                            <h3 className="font-bold text-xl text-gray-800">Survey Filters</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 opacity-70">
                            {["OFFICES", "GENDER", "EMPLOYEE IDS", "DEPARTMENT", "COMPANY IDS", "CNICS"].map((label, i) => (
                                <div key={label} className="space-y-1">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">{label}:</label>
                                    <div className={`bg-white border border-gray-300 rounded-lg p-3 text-sm shadow-sm ${i % 2 === 0 ? 'h-12 flex items-center' : 'h-24'}`}>
                                        <span className="text-gray-400">Select options...</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Footer */}
                    <div className="pt-2 flex justify-end gap-3 opacity-80">
                        <button className="px-6 py-3 rounded-lg border border-gray-200 text-gray-600 font-bold text-sm bg-white hover:bg-gray-50 shadow-sm">Cancel</button>
                        <button className="px-6 py-3 rounded-lg text-white font-bold text-sm flex items-center gap-2 shadow-md" style={{ backgroundColor: COLORS.green }}>
                            <Plus size={18} strokeWidth={3} /> Add Survey
                        </button>
                    </div>

                </div>
            </motion.div>
        </motion.div>
    )
}


// ==========================================
// CUSTOM FOCUS HELPER (Reused from SceneTargeting)
// ==========================================
const FocusArea = ({ label, isActive, children, icon, height = "h-14" }: { label: string, isActive: boolean, children: React.ReactNode, icon: React.ReactNode, height?: string }) => {
    return (
        <div className="space-y-1 relative z-20">
            <motion.div
                animate={{ color: isActive ? COLORS.HeaderStart : "#6B7280" }}
                className="flex items-center gap-1 mb-1"
            >
                <span className="text-[10px] font-bold uppercase tracking-wide">{label}</span>
                {isActive && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-600">{icon}</motion.span>}
            </motion.div>

            <motion.div
                animate={{
                    scale: isActive ? 1.05 : 1,
                    borderColor: isActive ? COLORS.HeaderStart : "#D1D5DB",
                    boxShadow: isActive ? "0 10px 25px -5px rgba(61, 139, 64, 0.2), 0 8px 10px -6px rgba(61, 139, 64, 0.1)" : "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                    zIndex: isActive ? 30 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`bg-white border rounded-lg ${height} overflow-hidden relative`}
            >
                {/* Active Indicator Strip */}
                {isActive && <motion.div layoutId="activeStripInput" className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-green-600" />}

                {children}
            </motion.div>
        </div>
    )
}

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================
export const SceneInitiation = ({ isActive, progress }: SceneProps) => {
    let view = 'intro'      // 0-4s
    if (progress >= 4 && progress < 8) view = 'dashboard' // 4-8s (Click at 7.5s)
    else if (progress >= 8 && progress < 12) view = 'details' // 8-12s (Details View)
    else if (progress >= 12) view = 'modal' // 12-26s (Modal View)

    return (
        <div className="w-full h-full font-sans overflow-hidden relative" style={{ backgroundColor: COLORS.Background }}>
            <AnimatePresence mode="wait">
                {view === 'intro' && <IntroView />}
                {view === 'dashboard' && <DashboardView progress={progress} />}
                {view === 'details' && <DetailsView progress={progress} />}
                {view === 'modal' && <ModalView progress={progress} />}
            </AnimatePresence>
        </div>
    )
}
