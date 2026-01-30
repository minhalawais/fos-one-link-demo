"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Brain, Sparkles, MessageSquare, List, CheckCircle, AlertCircle, Minus, FileText, Zap, TrendingUp } from "lucide-react"

// --- BRAND COLORS (Matching survey_web_report.html) ---
const BRAND = {
    teal: '#284952',
    green: '#60BA81',
    orange: '#F5A83C',
    charcoal: '#17161A',
    lightGray: '#F5F5F7',
    border: '#DEE2E6',
    white: '#FFFFFF',
    greenLight: 'rgba(96, 186, 129, 0.1)',
    orangeLight: 'rgba(245, 168, 60, 0.1)',
    tealLight: 'rgba(40, 73, 82, 0.05)'
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
    // 6s+: Result (Dashboard view expansion)
    const showDashboard = localT > 6

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
                {!showDashboard ? (
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
                                <Sparkles size={16} className="text-teal-600 animate-pulse" />
                                <span className="text-sm font-bold text-teal-800">Processing Feedback...</span>
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
                ) : (
                    /* ===== PHASE 2: DASHBOARD (Structured Results) ===== */
                    <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-5xl p-6 z-20"
                    >
                        {/* 1. Header Section */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#284952] to-[#60BA81] flex items-center justify-center shadow-lg text-white">
                                <Brain size={24} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-[#284952]">AI Analysis Summary</h1>
                                <p className="text-[#767676] text-sm flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Analysis Complete • 335 Responses Processed
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
                                            <Sparkles size={18} className="text-[#F5A83C]" />
                                            Key Insight
                                        </h3>
                                        <p className="opacity-90 leading-relaxed text-sm">
                                            Analysis indicates a strong positive trend in <span className="font-bold text-[#F5A83C]">Management Cooperation</span>.
                                            However, <span className="underline decoration-[#F5A83C] underline-offset-4 font-bold">Safety Equipment</span> availability requires immediate attention in Block B.
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
                                            <List size={18} className="text-[#60BA81]" /> Detailed Topic Analysis
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
                                        <MessageSquare size={18} className="text-[#F5A83C]" />
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
                borderColor: item.type === 'positive' ? BRAND.green : item.type === 'negative' ? BRAND.orange : '#999',
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
                <span className="font-bold text-gray-400">#{1024 + index}</span>
                {item.type === 'positive' && <CheckCircle size={12} className="text-green-500" />}
                {item.type === 'negative' && <AlertCircle size={12} className="text-orange-500" />}
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
                    row.sent === 'negative' ? 'bg-[#F5A83C]/10 text-[#F5A83C]' : 'bg-gray-100 text-gray-600'}`}>
                {row.sent === 'positive' && <CheckCircle size={12} />}
                {row.sent === 'negative' && <AlertCircle size={12} />}
                {row.sent === 'neutral' && <Minus size={12} />}
                {row.sent.charAt(0).toUpperCase() + row.sent.slice(1)}
            </span>
        </td>
    </motion.tr>
)
