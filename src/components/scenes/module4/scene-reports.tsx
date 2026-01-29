"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, AlertTriangle, Minus, Brain } from "lucide-react"

// --- PROFESSIONAL COLOR PALETTE (Light Theme) ---
const COLORS = {
    // Cover page stripes
    coverOrange: "#E8A838",
    coverTeal1: "#0F9690",
    coverTeal2: "#4A9989",
    coverGreen: "#7AB97A",

    // UI Colors
    bg: "#F3F4F6", // Light gray background
    white: "#FFFFFF",

    // Brand Colors
    teal: "#0F9690",
    navy: "#1E3A5F",
    green: "#60BA81",
    orange: "#F5A83C",
    yellow: "#F5C83C",
    red: "#E53935",

    // Text
    textMain: "#1F2937",
    textMuted: "#6B7280",
    textLight: "#9CA3AF",
    border: "#E5E7EB",
}

interface SceneProps {
    isActive: boolean
    progress: number
}

// ==========================================
// SCENE REPORTS (75s - 91s)
// Refined Professional Light Theme layout
// ==========================================

export const SceneReports = ({ isActive, progress }: SceneProps) => {
    const localT = progress - 75

    // Stage Management
    const stage = localT < 3 ? 'cover' : localT < 7 ? 'details' : localT < 12 ? 'charts' : 'ai'

    // Scroll logic for charts
    const scrollY = stage === 'charts' ? Math.max(0, (localT - 7) * 90) : 0

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center overflow-hidden relative bg-gray-50 text-slate-800"
        >
            <AnimatePresence mode="wait">

                {/* ===== STAGE 1: COVER PAGE (Refined) ===== */}
                {stage === 'cover' && (
                    <motion.div
                        key="cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="w-full h-full relative"
                    >
                        {/* 4-color stripes background */}
                        <div className="absolute inset-0 flex opacity-90">
                            {[COLORS.coverOrange, COLORS.coverTeal1, COLORS.coverTeal2, COLORS.coverGreen].map((color, i) => (
                                <motion.div
                                    key={i}
                                    className="w-1/4 h-full"
                                    style={{ backgroundColor: color }}
                                    initial={{ y: "100%" }}
                                    animate={{ y: "0%" }}
                                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                />
                            ))}
                        </div>

                        {/* Content Container - Scaled for better fit */}
                        <div className="absolute inset-0 flex flex-col justify-center px-16 z-10">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 max-w-2xl shadow-2xl"
                            >
                                <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                                    Employee Feedback
                                </h1>
                                <h1 className="text-3xl font-light text-white mb-6 uppercase tracking-widest">
                                    Survey Report
                                </h1>

                                <div className="h-0.5 w-24 bg-white/60 mb-6" />

                                <div className="space-y-2 text-white/90 font-medium">
                                    <p>Issue Date: 26 January, 2026</p>
                                    <p className="text-sm opacity-80 mt-4">Report No: SR1272601</p>
                                    <p className="text-sm opacity-80">Generated For: Sadaqat</p>
                                </div>
                            </motion.div>

                            {/* Logos */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.8, type: "spring" }}
                                className="absolute bottom-16 right-16 flex gap-6"
                            >
                                <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-[#8B7355]">
                                    <span className="text-[10px] text-center font-bold text-[#8B7355] leading-tight">FRUIT OF<br />SUSTAINABILITY</span>
                                </div>
                                <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-[#8B7355]">
                                    <span className="text-sm font-bold text-red-600 italic">Sadaqat</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {/* ===== STAGE 2: DETAILS PAGE (Zoom fix: Document Width) ===== */}
                {stage === 'details' && (
                    <motion.div
                        key="details"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="w-full h-full flex items-center justify-center p-4"
                        style={{ backgroundColor: COLORS.bg }}
                    >
                        {/* Constrained to max-w-2xl to look like a report document */}
                        <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 p-8 transform origin-center">

                            {/* Section 1: Survey Info */}
                            <div className="mb-8">
                                <h2 className="text-lg font-bold text-teal-700 italic border-b pb-2 mb-6">Survey Details</h2>
                                <div className="grid grid-cols-4 gap-3">
                                    {[
                                        { label: "Created At", value: "22-Jan-26" },
                                        { label: "Expiry at", value: "31-Jan-26" },
                                        { label: "Questions", value: "25" },
                                        { label: "Time", value: "10 min" },
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="bg-gray-50 rounded-lg p-2 text-center border border-gray-100 hover:shadow-sm transition-shadow"
                                        >
                                            <div className="text-[10px] font-semibold text-teal-600 uppercase tracking-wider mb-1">{item.label}</div>
                                            <div className="text-base font-bold text-gray-800">{item.value}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Section 2: Stats */}
                            <div className="mb-8">
                                <h2 className="text-lg font-bold text-teal-700 italic border-b pb-2 mb-6">Participation</h2>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { label: "Total", value: 335, color: "bg-blue-50 text-blue-700" },
                                        { label: "Filled", value: 163, color: "bg-green-50 text-green-700" },
                                        { label: "Pending", value: 172, color: "bg-orange-50 text-orange-700" },
                                    ].map((stat, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.4 + i * 0.1 }}
                                            className={`rounded-xl p-4 flex flex-col items-center ${stat.color} border border-opacity-10`}
                                        >
                                            <span className="text-xs font-medium opacity-80 mb-1">{stat.label} Participants</span>
                                            <span className="text-3xl font-black">
                                                {Math.floor(stat.value * Math.min(1, (localT - 3) / 1.5))}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Info Box */}
                            <div className="bg-teal-50 rounded-lg p-3 border border-teal-100">
                                <h3 className="text-xs font-bold text-teal-800 mb-1">Module Specifications</h3>
                                <p className="text-[10px] text-teal-700 leading-relaxed opacity-80">
                                    The HRDD Survey Module empowers Brands/Factories to gather valuable employee feedback through "Launch a survey" button available in FOS HRDD Dashboard.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ===== STAGE 3: CHARTS (Zoom fix: Compact width) ===== */}
                {stage === 'charts' && (
                    <motion.div
                        key="charts"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full bg-gray-100 overflow-hidden flex flex-col items-center"
                    >
                        {/* Header */}
                        <div className="w-full bg-gradient-to-r from-teal-600 to-green-500 py-3 text-center shadow-md z-10">
                            <span className="text-white font-bold tracking-wide">Survey Analysis Dashboard</span>
                        </div>

                        {/* Scrolling Container */}
                        <div className="w-full max-w-2xl relative h-full bg-white shadow-2xl">
                            {/* Mask top/bottom */}
                            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent z-10" />
                            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent z-10" />

                            <motion.div
                                animate={{ y: -scrollY }}
                                transition={{ ease: "linear", duration: 0 }}
                                className="py-6 px-8 space-y-6"
                            >
                                {/* Chart Cards */}
                                <ChartCard title="Anonymity Awareness" question="کیا آپ کو معلوم ہے کہ اس فارم کے تمام جوابات گمنام ہوں گے؟" color="border-l-4 border-teal-500">
                                    <div className="flex items-center justify-center gap-8 py-2">
                                        <DonutChart pct={100} color={COLORS.navy} />
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-navy-800">100%</div>
                                            <div className="text-sm text-gray-500">Yes (ہاں)</div>
                                        </div>
                                    </div>
                                </ChartCard>

                                <ChartCard title="Team Spirit" question="آپ ٹیم سپرٹ کو کیسے درجہ بندی کریں گے؟" color="border-l-4 border-yellow-400">
                                    <div className="space-y-3 pt-2">
                                        <BarRow label="Excellent" val={45} color={COLORS.yellow} />
                                        <BarRow label="Good" val={32} color={COLORS.yellow} />
                                        <BarRow label="Average" val={15} color={COLORS.yellow} />
                                    </div>
                                </ChartCard>

                                <ChartCard title="Department" question="کس مل میں کام کر رہے ہیں؟" color="border-l-4 border-orange-400">
                                    <div className="flex items-center gap-6">
                                        <PieChartMulti />
                                        <div className="text-xs space-y-1">
                                            <LegendItem color={COLORS.yellow} label="Spinning (35%)" />
                                            <LegendItem color={COLORS.teal} label="Processing (25%)" />
                                            <LegendItem color={COLORS.green} label="Knitting (22%)" />
                                        </div>
                                    </div>
                                </ChartCard>

                                <ChartCard title="Workplace Safety" question="کیا آپ محفوظ محسوس کرتے ہیں؟" color="border-l-4 border-red-400">
                                    <div className="flex items-center justify-center gap-8 py-2">
                                        <div className="relative w-24 h-24">
                                            <svg className="w-full h-full -rotate-90">
                                                <circle cx="48" cy="48" r="36" fill="none" stroke={COLORS.bg} strokeWidth="12" />
                                                <circle cx="48" cy="48" r="36" fill="none" stroke={COLORS.green} strokeWidth="12" strokeDasharray="180 226" />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center font-bold text-sm">85%</div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold">Safe</div>
                                            <div className="px-2 py-0.5 bg-red-50 text-red-700 rounded text-xs">Unsafe (5%)</div>
                                        </div>
                                    </div>
                                </ChartCard>
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {/* ===== STAGE 4: AI ANALYSIS (Pure White Theme) ===== */}
                {stage === 'ai' && (
                    <motion.div
                        key="ai"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full h-full bg-white flex flex-col items-center p-6 text-gray-800"
                    >
                        {/* Header */}
                        <div className="w-full max-w-2xl flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                            <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shadow-sm border border-teal-100">
                                <Brain className="text-teal-600" size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">AI Sentiment Analysis</h2>
                                <p className="text-sm text-gray-500">Automated open-ended response processing</p>
                            </div>
                        </div>

                        {/* Main Content Card - floating on white with subtle clean border */}
                        <div className="w-full max-w-2xl bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden flex flex-col h-full max-h-[600px]">

                            {/* Question Header */}
                            <div className="bg-gray-50/50 p-5 border-b border-gray-100">
                                <h3 className="text-lg font-bold text-right text-gray-800" style={{ direction: 'rtl' }}>
                                    <span className="text-teal-600 mr-2">Q11.</span>
                                    کون سا سامان آپ کو نہیں دیا جا رہا؟ براہ کرم نام لکھیں۔
                                </h3>
                            </div>

                            <div className="p-6 overflow-y-auto">
                                {/* Summary Box */}
                                <div className="bg-orange-50/50 border-l-4 border-orange-400 p-4 rounded-r-lg mb-8">
                                    <h4 className="text-xs font-bold text-orange-800 uppercase mb-2 tracking-wide">Executive Summary</h4>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        Majority (43%) report needs being met. Significant concern (24%) regarding <span className="font-medium text-red-600 border-b border-red-200">Safety Equipment</span> availability.
                                    </p>
                                </div>

                                {/* Table */}
                                <div className="rounded-xl border border-gray-200 overflow-hidden mb-8 shadow-sm">
                                    <div className="grid grid-cols-4 bg-gray-50 py-3 px-4 border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                        <div>Topic</div>
                                        <div>Count</div>
                                        <div>Sentiment</div>
                                        <div>Keywords</div>
                                    </div>
                                    <div className="divide-y divide-gray-100">
                                        <TableRow topic="Availability" count="43%" sentiment="Positive" color="text-emerald-600" keys="All ok, Available" icon={CheckCircle} />
                                        <TableRow topic="Safety Equip" count="24%" sentiment="Negative" color="text-red-500" keys="Helmet, Shoes, Mask" icon={AlertTriangle} />
                                        <TableRow topic="No Needs" count="16%" sentiment="Neutral" color="text-gray-400" keys="None, Koi ni" icon={Minus} />
                                    </div>
                                </div>

                                {/* Sample Responses */}
                                <div>
                                    <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-wider">Recent Verbatim Responses</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            "Available everything",
                                            "Safety shoes needed",
                                            "Everything is available",
                                            "Koi ni",
                                            "Need better gloves"
                                        ].map((r, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.5 + i * 0.1 }}
                                                className="bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 italic hover:border-teal-200 hover:bg-teal-50 transition-colors cursor-default"
                                            >
                                                "{r}"
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </motion.div>
    )
}

// --- HELPER COMPONENTS ---

const ChartCard = ({ title, question, children, color }: any) => (
    <div className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100 ${color}`}>
        <h3 className="text-xs font-bold text-gray-400 uppercase mb-1">{title}</h3>
        <p className="text-sm font-medium text-gray-800 mb-4 text-right" style={{ direction: 'rtl' }}>{question}</p>
        {children}
    </div>
)

const DonutChart = ({ pct, color }: any) => (
    <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90">
            <circle cx="48" cy="48" r="36" fill="none" stroke="#E5E7EB" strokeWidth="8" />
            <motion.circle
                cx="48" cy="48" r="36" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
                initial={{ strokeDasharray: "0 226" }} animate={{ strokeDasharray: "226 226" }} transition={{ duration: 1 }}
            />
        </svg>
    </div>
)

const BarRow = ({ label, val, color }: any) => (
    <div className="flex items-center gap-3 text-xs">
        <span className="w-14 text-right font-medium text-gray-600">{label}</span>
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }} animate={{ width: `${val}%` }} transition={{ duration: 1 }}
            />
        </div>
        <span className="w-8 font-bold text-gray-700">{val}%</span>
    </div>
)

const PieChartMulti = () => (
    <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90">
            <circle cx="48" cy="48" r="24" fill="none" stroke={COLORS.yellow} strokeWidth="24" strokeDasharray="150" />
            <circle cx="48" cy="48" r="24" fill="none" stroke={COLORS.teal} strokeWidth="24" strokeDasharray="50 150" strokeDashoffset="-150" />
        </svg>
    </div>
)

const LegendItem = ({ color, label }: any) => (
    <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-gray-600">{label}</span>
    </div>
)

const TableRow = ({ topic, count, sentiment, color, keys, icon: Icon }: any) => (
    <div className="grid grid-cols-4 py-3 px-4 text-sm hover:bg-gray-50 transition-colors">
        <div className="font-medium text-gray-800">{topic}</div>
        <div className="text-gray-600">{count}</div>
        <div className={`font-bold flex items-center gap-1 ${color}`}>
            <Icon size={14} /> {sentiment}
        </div>
        <div className="text-xs text-gray-400 truncate">{keys}</div>
    </div>
)
