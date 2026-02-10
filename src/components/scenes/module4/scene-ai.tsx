"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Brain, Sparkles, MessageSquare, List, CheckCircle, AlertCircle, Minus, FileText, Zap, TrendingUp } from "lucide-react"

// --- BRAND COLORS (Matching survey_web_report.html) ---
const BRAND = {
    teal: '#1E40AF',
    green: '#10B981',
    vibrantBlue: '#3B82F6',
    charcoal: '#0F172A',
    lightGray: '#F8FAFC',
    border: '#E2E8F0',
    white: '#FFFFFF',
    greenLight: 'rgba(16, 185, 129, 0.1)',
    blueLight: 'rgba(59, 130, 246, 0.1)',
    tealLight: 'rgba(30, 64, 175, 0.05)'
}

interface SceneAIProps {
    isActive: boolean
    progress: number
}

// Sample feedback for ingestion phase
const RAW_FEEDBACK = [
    { text: "Safety equipment is missing", type: "negative" },
    { text: "محفوظ ماحول ہے", type: "positive" }, // Safe environment
    { text: "Need better training options", type: "neutral" },
    { text: "Food quality is good", type: "positive" },
    { text: "شفٹ ٹائمنگ کا مسئلہ ہے", type: "negative" }, // Shift timing issue
    { text: "Management is cooperative", type: "positive" },
]

// Structured Analysis Data (for Dashboard)
const TOPIC_ANALYSIS = [
    { topic: "Availability", pct: 43, sent: "positive", count: 145, insights: ["Everything available", "Timely delivery"] },
    { topic: "Safety Gear", pct: 32, sent: "negative", count: 108, insights: ["Shoes missing", "Helmet issue"] },
    { topic: "Training", pct: 25, sent: "neutral", count: 82, insights: ["Need refresher", "Good basics"] },
]

export const SceneAI = ({ isActive, progress }: SceneAIProps) => {
    // Local time starts from 91s in the overall timeline
    const localT = Math.max(0, progress - 91)

    // Stages:
    // 0-6s: Ingestion (Raw feedback floating into brain)
    // 6-14s: Dashboard (Structured results)
    // 14s+: Transformation (Reactive → Proactive message)
    const stage = localT < 6 ? 'ingestion' : localT < 14 ? 'dashboard' : 'transformation'

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center overflow-hidden relative"
            style={{ backgroundColor: "#FFFFFF" }}
        >
            {/* Background Decor (Subtle Brand Gradients) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-10" style={{ backgroundColor: BRAND.green }} />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-10" style={{ backgroundColor: BRAND.teal }} />
            </div>

            <AnimatePresence mode="wait">
                {stage === 'ingestion' ? (
                    /* ===== PHASE 1: INGESTION (Raw Data -> AI) ===== */
                    <motion.div
                        key="ingestion"
                        exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        {/* Central AI Core */}
                        <div className="relative z-10">
                            {/* Pulse Rings */}
                            {[1, 2, 3].map(i => (
                                <motion.div
                                    key={i}
                                    className="absolute inset-0 rounded-full border border-teal-500/30"
                                    initial={{ scale: 1, opacity: 0.5 }}
                                    animate={{ scale: 2.5, opacity: 0 }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
                                />
                            ))}

                            {/* Brain Icon Container */}
                            <div className="w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden ring-4 ring-teal-50 z-20">
                                <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-teal-500 to-green-500" />
                                <Brain size={64} className="text-[#284952] relative z-10" />
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent"
                                    animate={{ y: ["0%", "-100%"] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                />
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-4 py-2 rounded-full shadow-lg border border-teal-100 flex items-center gap-2"
                            >
                                <img src="/assets/images/FOS-01.png" alt="FOS" className="w-6 h-6 object-contain" />
                                <span className="text-sm font-bold text-teal-800">FOS Engine Processing...</span>
                            </motion.div>
                        </div>

                        {/* Floating Feedback Cards */}
                        {RAW_FEEDBACK.map((item, i) => (
                            <FloatingCard
                                key={i}
                                item={item}
                                index={i}
                                total={RAW_FEEDBACK.length}
                                time={localT}
                            />
                        ))}

                    </motion.div>
                ) : stage === 'dashboard' ? (
                    /* ===== PHASE 2: DASHBOARD (Structured Results) ===== */
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-5xl p-6 z-20"
                    >
                        {/* 1. Header Section */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-lg border-2 border-[#284952] p-1">
                                <img src="/assets/images/FOS-01.png" alt="FOS" className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-[#284952]">FOS AI Analysis Summary</h1>
                                <p className="text-[#767676] text-sm flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    FOS Engine Analysis Complete • 335 Responses
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-6">
                            {/* Left Column: Summary & Stats */}
                            <div className="col-span-12 md:col-span-7 space-y-6">
                                {/* Summary Box */}
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="rounded-xl p-6 text-white shadow-lg relative overflow-hidden"
                                    style={{ background: `linear-gradient(135deg, ${BRAND.teal} 0%, ${BRAND.green} 100%)` }}
                                >
                                    <div className="relative z-10">
                                        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                            <Sparkles size={18} className="text-[#3B82F6]" />
                                            FOS Key Insight
                                        </h3>
                                        <p className="opacity-90 leading-relaxed text-sm">
                                            <span className="font-bold text-[#3B82F6]">FOS AI Analysis</span> indicates a strong positive trend in <span className="font-bold text-[#3B82F6]">Management Cooperation</span>.
                                            However, <span className="underline decoration-[#3B82F6] underline-offset-4 font-bold">Safety Equipment</span> availability requires attention in Block B.
                                        </p>
                                    </div>
                                    {/* Abstract shapes bg */}
                                    <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 translate-y-10" />
                                </motion.div>

                                {/* Topic Analysis Table */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="bg-white rounded-xl border border-[#DEE2E6] shadow-sm overflow-hidden"
                                >
                                    <div className="px-6 py-4 border-b border-[#DEE2E6] flex justify-between items-center">
                                        <h4 className="font-bold text-[#284952] flex items-center gap-2">
                                            <List size={18} className="text-[#60BA81]" /> FOS Detailed Topic Analysis
                                        </h4>
                                    </div>
                                    <table className="w-full text-sm">
                                        <thead className="bg-[#F5F5F7] text-[#284952]">
                                            <tr>
                                                <th className="px-6 py-3 text-left font-bold">Topic</th>
                                                <th className="px-6 py-3 text-center font-bold">%</th>
                                                <th className="px-6 py-3 text-center font-bold">Sentiment</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#DEE2E6]">
                                            {TOPIC_ANALYSIS.map((row, i) => (
                                                <TopicRow key={i} row={row} index={i} />
                                            ))}
                                        </tbody>
                                    </table>
                                </motion.div>
                            </div>

                            {/* Right Column: Sample Responses & Stats */}
                            <div className="col-span-12 md:col-span-5 space-y-6">
                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { l: "Positive", v: "62%", c: "text-green-600", bg: "bg-green-50", i: CheckCircle },
                                        { l: "Negative", v: "15%", c: "text-red-600", bg: "bg-red-50", i: AlertCircle },
                                    ].map((s, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.6 + (i * 0.1) }}
                                            className={`p-4 rounded-xl ${s.bg} border border-transparent hover:scale-105 transition-transform`}
                                        >
                                            <s.i size={20} className={`mb-2 ${s.c}`} />
                                            <div className="text-2xl font-bold text-[#17161A]">{s.v}</div>
                                            <div className="text-xs font-semibold opacity-60 uppercase">{s.l}</div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Sample Responses Panel */}
                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="bg-white rounded-xl border border-[#DEE2E6] shadow-sm p-6"
                                >
                                    <h4 className="font-bold text-[#284952] mb-4 flex items-center gap-2">
                                        <MessageSquare size={18} className="text-[#3B82F6]" />
                                        Sample Feedback
                                    </h4>
                                    <div className="space-y-3">
                                        {RAW_FEEDBACK.slice(0, 3).map((fb, i) => (
                                            <div key={i} className="flex gap-3 text-xs bg-[#F5F5F7] p-3 rounded-lg border-l-4 border-[#60BA81]">
                                                <span className="font-bold text-white bg-[#60BA81] w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                                                    {i + 1}
                                                </span>
                                                <span className="text-[#17161A] leading-relaxed">{fb.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Bottom Action Bar (Simulating Footer) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="mt-6 flex justify-center gap-4 border-t border-[#DEE2E6] pt-6"
                        >
                            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#DEE2E6] rounded-lg shadow-sm text-sm text-[#767676]">
                                <FileText size={16} /> Export Report
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-[#284952] text-white rounded-lg shadow-md text-sm font-medium">
                                <Zap size={16} /> Take Action
                            </div>
                        </motion.div>
                    </motion.div>
                ) : (
                    /* ===== PHASE 3: TRANSFORMATION (Reactive → Proactive) ===== */
                    /* Script: "This digital survey module helps organizations switch from reactive grievance handling to proactive employee engagement and continuous improvement." */
                    <motion.div
                        key="transformation"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full max-w-5xl p-4 z-20 flex flex-col items-center justify-center h-full scale-[0.85] origin-center"
                    >
                        {/* Header with floating effect */}
                        <motion.div
                            initial={{ y: -30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-center mb-16 relative z-30"
                        >
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#284952] to-[#60BA81] rounded-full text-white shadow-2xl mb-6 ring-4 ring-teal-50"
                            >
                                <img src="/assets/images/FOS-01.png" alt="FOS" className="w-8 h-8 object-contain brightness-0 invert" />
                                <span className="font-bold text-lg tracking-wide">FOS Digital Transformation</span>
                            </motion.div>
                            <h1 className="text-4xl font-extrabold text-[#284952] mb-3 tracking-tight">From Reactive to Proactive</h1>
                            <p className="text-[#767676] text-lg font-medium">Empowering continuous improvement with FOS engagement modules</p>
                        </motion.div>

                        {/* Transformation Visual - 3D Perspective Container */}
                        <div className="flex items-center justify-center gap-12 w-full perspective-1000 mb-8">

                            {/* Reactive Side (The Past) */}
                            <motion.div
                                initial={{ opacity: 0, rotateY: 45, x: -50 }}
                                animate={{ opacity: 1, rotateY: 15, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="flex-1 max-w-[300px] relative group"
                            >
                                <div className="absolute inset-0 bg-red-500/5 blur-3xl rounded-full transform -translate-x-10 -translate-y-10" />

                                <motion.div
                                    className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-dashed border-[#DEE2E6] p-6 shadow-xl relative overflow-hidden grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
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
                                        <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-orange-100 shadow-inner">
                                            <AlertCircle size={32} className="text-[#F5A83C]" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#284952] mb-1">Reactive</h3>
                                        <p className="text-[10px] font-semibold text-[#3B82F6] uppercase tracking-widest">Grievance Handling</p>
                                    </div>
                                    <div className="space-y-3 opacity-70">
                                        {["Wait for complaints", "Manual tracking", "Delayed responses"].map((text, i) => (
                                            <div key={i} className="flex items-center gap-2.5 p-2 bg-orange-50/50 rounded-lg border border-orange-100/50">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                                <span className="text-[#555] font-medium text-xs">{text}</span>
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
                                className="flex flex-col items-center justify-center relative w-24"
                            >
                                <motion.div
                                    animate={{
                                        boxShadow: ["0 0 0 0 rgba(96, 186, 129, 0)", "0 0 20px 10px rgba(96, 186, 129, 0.3)", "0 0 0 0 rgba(96, 186, 129, 0)"],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-teal-500 z-10"
                                >
                                    <TrendingUp size={20} className="text-teal-600" />
                                </motion.div>
                                <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mt-3 bg-white/80 px-2 py-0.5 rounded backdrop-blur whitespace-nowrap">Transforming</span>
                            </motion.div>

                            {/* Proactive Side (The Future) */}
                            <motion.div
                                initial={{ opacity: 0, rotateY: -45, x: 50 }}
                                animate={{ opacity: 1, rotateY: -15, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="flex-1 max-w-[300px] relative"
                            >
                                <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full transform translate-x-10 translate-y-10 animate-pulse" />

                                <motion.div
                                    className="bg-white rounded-3xl border-2 border-[#60BA81] p-6 shadow-[0_20px_50px_rgba(96,186,129,0.3)] relative overflow-hidden z-10"
                                    animate={{ y: [-5, 5, -5] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#60BA81]/20 to-transparent rounded-bl-full" />

                                    <div className="text-center mb-4 relative z-10">
                                        <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-green-200 shadow-md">
                                            <Zap size={32} className="text-[#60BA81]" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#284952] mb-1">Proactive</h3>
                                        <p className="text-[10px] font-semibold text-[#60BA81] uppercase tracking-widest">Employee Engagement</p>
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
            </AnimatePresence>
        </motion.div>
    )
}

// Helper: Floating Card for Ingestion Phase
const FloatingCard = ({ item, index, total, time }: any) => {
    // Calculated circular starting position
    const angle = (index / total) * Math.PI * 2
    const radius = 250 // Distance from center
    const startX = Math.cos(angle) * radius
    const startY = Math.sin(angle) * radius

    return (
        <motion.div
            className="absolute bg-white p-3 rounded-lg border-l-4 shadow-sm w-48 text-xs z-0"
            style={{
                borderColor: item.type === 'positive' ? BRAND.green : item.type === 'negative' ? BRAND.vibrantBlue : '#999',
                left: '50%',
                top: '50%'
            }}
            initial={{ x: startX, y: startY, opacity: 0, scale: 0.8 }}
            animate={{
                x: [startX, startX * 0.8, 0], // Move towards center
                y: [startY, startY * 0.8, 0],
                opacity: [0, 1, 0], // Fade in then out as it hits center
                scale: [0.8, 1, 0.2], // Shrink into center
            }}
            transition={{
                duration: 3,
                delay: index * 0.5,
                times: [0, 0.2, 1],
                ease: "easeInOut"
            }}
        >
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                    <img src="/assets/images/FOS-01.png" alt="FOS" className="w-3 h-3 object-contain opacity-50" />
                    <span className="font-bold text-gray-400">#{1024 + index}</span>
                </div>
                {item.type === 'positive' && <CheckCircle size={12} className="text-green-500" />}
                {item.type === 'negative' && <AlertCircle size={12} className="text-blue-500" />}
                {item.type === 'neutral' && <Minus size={12} className="text-gray-400" />}
            </div>
            <div className="text-gray-700 truncate">{item.text}</div>
        </motion.div>
    )
}

// Helper: Table Row with animation
const TopicRow = ({ row, index }: any) => (
    <motion.tr
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 + (index * 0.1) }}
        className="hover:bg-[#F5F5F7] transition-colors"
    >
        <td className="px-6 py-4 font-semibold text-[#17161A]">{row.topic}</td>
        <td className="px-6 py-4 text-center">
            <span className="bg-[#284952]/10 text-[#284952] px-3 py-1 rounded-full text-xs font-bold">
                {row.pct}%
            </span>
        </td>
        <td className="px-6 py-4 text-center">
            <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center justify-center gap-1 w-24 mx-auto
                ${row.sent === 'positive' ? 'bg-[#60BA81]/10 text-[#60BA81]' :
                    row.sent === 'negative' ? 'bg-[#3B82F6]/10 text-[#3B82F6]' : 'bg-gray-100 text-gray-600'}`}>
                {row.sent === 'positive' && <CheckCircle size={12} />}
                {row.sent === 'negative' && <AlertCircle size={12} />}
                {row.sent === 'neutral' && <Minus size={12} />}
                {row.sent.charAt(0).toUpperCase() + row.sent.slice(1)}
            </span>
        </td>
    </motion.tr>
)
