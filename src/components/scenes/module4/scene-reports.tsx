"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Brain, MessageSquare, PieChart } from "lucide-react"

// --- PROFESSIONAL COLOR PALETTE (Light Theme - Original for Stages 1-3) ---
const COLORS = {
    coverOrange: "#E8A838",
    coverTeal1: "#0F9690",
    coverTeal2: "#4A9989",
    coverGreen: "#7AB97A",
    bg: "#F3F4F6",
    white: "#FFFFFF",
    teal: "#0F9690",
    navy: "#1E3A5F",
    green: "#60BA81",
    orange: "#F5A83C",
    yellow: "#F5C83C",
    red: "#E53935",
}

// --- REPORT STYLING (For Stage 3 & 4 - From survey_web_report.html) ---
const REPORT_COLORS = {
    teal: "#284952",       // brand-teal
    green: "#60BA81",      // brand-green
    orange: "#F5A83C",     // brand-orange
    bg: "#F5F5F7",         // brand-light-gray
    border: "#DEE2E6",     // brand-border
    red: "#E53E3E",
    grayMedium: "#767676",
    charcoal: "#17161A",
}

interface SceneProps {
    isActive: boolean
    progress: number
}

// ==========================================
// SCENE REPORTS (75s - 91s)
// Stages 1-2: Original (Colorful/Creative)
// Stages 3-4: Production Grade UI/UX (Matching HTML Report)
// ==========================================

export const SceneReports = ({ isActive, progress }: SceneProps) => {
    const localT = Math.max(0, progress - 75)

    // Stage Management
    // Stage 1: Cover (0-3s)
    // Stage 2: Details (3-7s)
    // Stage 3: Charts & AI (7s - End)
    const stage = localT < 3 ? 'cover' : localT < 7 ? 'details' : 'charts'

    // Scroll logic
    // We have more content now, so we scroll continuously from t=7s to the end (approx t=16s)
    // Rate of 100px/s over 9s = 900px scroll, which should fit the taller content.
    const scrollY = stage === 'charts' ? Math.max(0, (localT - 7) * 100) : 0

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center overflow-hidden relative text-slate-800"
            style={{ backgroundColor: stage === 'charts' ? REPORT_COLORS.bg : COLORS.bg }}
        >
            <AnimatePresence mode="wait">

                {/* ===== STAGE 1: COVER PAGE (Original) ===== */}
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

                        {/* Content Container */}
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
                                    <p className="text-sm opacity-80">Generated For: Company A</p>
                                </div>
                            </motion.div>
                        </div>
                        {/* Logos */}
                        <div className="absolute bottom-10 right-16 flex items-center gap-6 z-10">
                            {/* FOS Logo Circle */}
                            <div className="w-24 h-24 rounded-full border-4 border-[#F5A83C] bg-white flex items-center justify-center shadow-lg overflow-hidden relative">
                                <img src="/assets/images/logo.png" alt="FOS" className="w-full h-full object-contain p-2" />
                            </div>

                            {/* Company Logo Circle */}
                            <div className="w-24 h-24 rounded-full border-4 border-[#F5A83C] bg-white flex items-center justify-center shadow-lg overflow-hidden">
                                <img src="/assets/images/company_a.png" alt="Company A" className="w-full h-full object-contain p-2" />
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ===== STAGE 2: DETAILS PAGE (Enhanced Original Layout) ===== */}
                {stage === 'details' && (
                    <motion.div
                        key="details"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="w-full h-full flex items-center justify-center p-4 relative"
                        style={{ backgroundColor: REPORT_COLORS.bg }}
                    >
                        {/* Decorative background elements matching Stage 3 */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />

                        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#DEE2E6] p-8 z-10">

                            {/* Section 1: Survey Info */}
                            <div className="mb-10">
                                <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-700">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                    </div>
                                    <h2 className="text-lg font-bold text-[#284952] uppercase tracking-wide">Survey Details</h2>
                                </div>

                                <div className="grid grid-cols-4 gap-4">
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
                                            className="bg-[#F5F5F7] rounded-xl p-3 text-center border border-transparent hover:border-gray-200 transition-colors"
                                        >
                                            <div className="text-[10px] font-bold text-[#767676] uppercase tracking-wider mb-1">{item.label}</div>
                                            <div className="text-sm font-bold text-[#17161A]">{item.value}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Section 2: Stats */}
                            <div className="mb-8">
                                <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-700">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    </div>
                                    <h2 className="text-lg font-bold text-[#284952] uppercase tracking-wide">Participation</h2>
                                </div>

                                <div className="grid grid-cols-3 gap-6">
                                    {[
                                        { label: "Total", value: 335, bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-100" },
                                        { label: "Filled", value: 163, bg: "bg-green-50", text: "text-green-700", border: "border-green-100" },
                                        { label: "Pending", value: 172, bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-100" },
                                    ].map((stat, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.4 + i * 0.1 }}
                                            className={`rounded-xl p-5 flex flex-col items-center justify-center ${stat.bg} ${stat.text} border ${stat.border}`}
                                        >
                                            <span className="text-xs font-semibold opacity-70 mb-1 uppercase tracking-wider">{stat.label}</span>
                                            <span className="text-4xl font-black tracking-tight">
                                                {Math.floor(stat.value * Math.min(1, (localT - 3) / 1.5))}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Info Box */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="bg-teal-50 rounded-lg p-4 border border-teal-100 flex gap-3"
                            >
                                <div className="text-teal-600 mt-1">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                </div>
                                <div>
                                    <h3 className="text-xs font-bold text-teal-800 mb-1 uppercase">Module Specifications</h3>
                                    <p className="text-xs text-teal-700 leading-relaxed opacity-90">
                                        The HRDD Survey Module empowers Brands/Factories to gather valuable employee feedback through "Launch a survey" button available in FOS HRDD Dashboard.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {/* ===== STAGE 3: CHARTS & AI ANALYSIS (MERGED) ===== */}
                {stage === 'charts' && (
                    <motion.div
                        key="charts"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full relative"
                    >
                        <div className="absolute inset-0 top-0 h-24 bg-gradient-to-b from-[#F5F5F7] to-transparent z-10 pointer-events-none" />

                        {/* Scrolling Container */}
                        <motion.div
                            animate={{ y: -scrollY }}
                            transition={{ ease: "linear", duration: 0 }}
                            className="w-full max-w-3xl mx-auto pt-10 pb-40 space-y-8"
                        >
                            {/* Chart 1: Donut (Yes/No) */}
                            <QuestionCard
                                order={1}
                                type="Yes/No"
                                required={true}
                                question="Do you know that all answers in this form will be anonymous?"
                                subtext="کیا آپ کو معلوم ہے کہ اس فارم کے تمام جوابات گمنام ہوں گے؟"
                                responses={335}
                            >
                                <div className="h-64 w-full flex items-center justify-center gap-12 bg-[#F5F5F7] rounded-xl border border-[#DEE2E6] p-6">
                                    <div className="relative w-40 h-40">
                                        <svg viewBox="0 0 100 100" className="-rotate-90">
                                            <circle cx="50" cy="50" r="40" fill="none" stroke="#DEE2E6" strokeWidth="20" />
                                            <circle cx="50" cy="50" r="40" fill="none" stroke={REPORT_COLORS.teal} strokeWidth="20" strokeDasharray="251 251" />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-[#284952]">100%</div>
                                    </div>
                                    <div className="space-y-4">
                                        <LegendItem color={REPORT_COLORS.teal} label="Yes (335)" />
                                        <LegendItem color={REPORT_COLORS.bg} label="No (0)" />
                                    </div>
                                </div>
                            </QuestionCard>

                            {/* Chart 2: Bar (Rating) */}
                            <QuestionCard
                                order={2}
                                type="Rating"
                                required={true}
                                question="How would you rate the department's team spirit?"
                                subtext="آپ ٹیم سپرٹ کو کیسے درجہ بندی کریں گے؟"
                                responses={335}
                            >
                                <div className="bg-[#F5F5F7] rounded-xl border border-[#DEE2E6] p-6 space-y-4">
                                    {[
                                        { l: "Excellent", v: 45, c: REPORT_COLORS.green },
                                        { l: "Good", v: 30, c: REPORT_COLORS.teal },
                                        { l: "Average", v: 15, c: REPORT_COLORS.orange },
                                        { l: "Poor", v: 10, c: REPORT_COLORS.red }
                                    ].map((row, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <span className="w-24 text-sm font-medium text-right text-[#767676]">{row.l}</span>
                                            <div className="flex-1 h-8 bg-white rounded border border-[#DEE2E6] overflow-hidden relative">
                                                <div
                                                    className="h-full absolute left-0 top-0 opacity-80"
                                                    style={{ width: `${row.v}%`, backgroundColor: row.c }}
                                                />
                                                <div className="absolute inset-0 flex items-center pl-3 text-xs font-bold text-[#17161A]">
                                                    {row.v}%
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </QuestionCard>

                            {/* Chart 3: AI Analysis (Moved to #3) */}
                            <QuestionCard
                                order={3}
                                type="Text"
                                required={false}
                                question="Any other feedback?"
                                subtext="کون سا سامان آپ کو نہیں دیا جا رہا؟ براہ کرم نام لکھیں۔"
                                responses={163}
                            >
                                {/* AI Summary Section Content */}
                                <div className="mt-4">
                                    {/* Summary Box */}
                                    <div className="rounded-xl p-6 border mb-6" style={{ background: `linear-gradient(to right, ${REPORT_COLORS.teal}0D, ${REPORT_COLORS.green}0D)`, borderColor: REPORT_COLORS.border }}>
                                        <h4 className="flex items-center font-bold mb-2" style={{ color: REPORT_COLORS.teal }}>
                                            <Brain className="mr-2" size={18} /> AI Analysis Summary
                                        </h4>
                                        <p className="text-sm text-[#17161A] leading-relaxed">
                                            Analysis identifies <span className="font-bold" style={{ color: REPORT_COLORS.green }}>43% positive sentiment</span> regarding availability.
                                            Primary concern is <span className="font-bold" style={{ color: REPORT_COLORS.red }}>Safety Equipment</span> (Shoes, Helmets).
                                        </p>
                                    </div>

                                    {/* Detailed Table */}
                                    <div className="rounded-xl overflow-hidden border mb-6" style={{ borderColor: REPORT_COLORS.border }}>
                                        <div className="grid grid-cols-4 py-3 px-4 text-sm font-bold text-white" style={{ background: `linear-gradient(to right, ${REPORT_COLORS.teal}, ${REPORT_COLORS.green})` }}>
                                            <div>Topic</div>
                                            <div className="text-center">Percentage</div>
                                            <div className="text-center">Sentiment</div>
                                            <div>Key Insights</div>
                                        </div>
                                        <div className="divide-y bg-white text-sm" style={{ divideColor: REPORT_COLORS.border }}>
                                            <TableRow topic="Availability" pct={43} sent="positive" keys={["All ok", "Available"]} />
                                            <TableRow topic="Safety Gear" pct={32} sent="negative" keys={["Shoes", "Helmet", "Gloves"]} />
                                            <TableRow topic="General" pct={25} sent="neutral" keys={["No comments", "Fine"]} />
                                        </div>
                                    </div>

                                    {/* Sample Responses */}
                                    <div className="space-y-3">
                                        <h4 className="font-bold flex items-center text-sm" style={{ color: REPORT_COLORS.orange }}>
                                            <MessageSquare size={14} className="mr-2" />Responses from Survey
                                        </h4>
                                        {["Everything is available", "Safety shoes are missing", "No issues"].map((r, i) => (
                                            <div
                                                key={i}
                                                className="border-l-4 p-3 rounded text-xs text-[#17161A]"
                                                style={{ backgroundColor: REPORT_COLORS.bg, borderColor: REPORT_COLORS.green }}
                                            >
                                                <span className="font-bold bg-white rounded-full w-5 h-5 inline-flex items-center justify-center mr-2 text-[10px]" style={{ color: REPORT_COLORS.green }}>{i + 1}</span>
                                                {r}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </QuestionCard>

                            {/* Chart 4: Pie (Department) (Moved to #4) */}
                            <QuestionCard
                                order={4}
                                type="Single Select"
                                required={true}
                                question="Which mill are you working in?"
                                subtext="کس مل میں کام کر رہے ہیں؟"
                                responses={335}
                            >
                                <div className="h-64 w-full flex items-center justify-center gap-8 bg-[#F5F5F7] rounded-xl border border-[#DEE2E6] p-6">
                                    <div className="relative w-40 h-40">
                                        <svg viewBox="0 0 100 100" className="-rotate-90">
                                            <circle cx="50" cy="50" r="25" fill="none" stroke={REPORT_COLORS.green} strokeWidth="50" strokeDasharray="40 157" />
                                            <circle cx="50" cy="50" r="25" fill="none" stroke={REPORT_COLORS.teal} strokeWidth="50" strokeDasharray="60 157" strokeDashoffset="-40" />
                                            <circle cx="50" cy="50" r="25" fill="none" stroke={REPORT_COLORS.orange} strokeWidth="50" strokeDasharray="30 157" strokeDashoffset="-100" />
                                            <circle cx="50" cy="50" r="25" fill="none" stroke={REPORT_COLORS.red} strokeWidth="50" strokeDasharray="27 157" strokeDashoffset="-130" />
                                        </svg>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                                        <LegendItem color={REPORT_COLORS.green} label="Spinning (25%)" />
                                        <LegendItem color={REPORT_COLORS.teal} label="Processing (38%)" />
                                        <LegendItem color={REPORT_COLORS.orange} label="Knitting (20%)" />
                                        <LegendItem color={REPORT_COLORS.red} label="Other (17%)" />
                                    </div>
                                </div>
                            </QuestionCard>
                        </motion.div>
                    </motion.div>
                )}

            </AnimatePresence>
        </motion.div>
    )
}

// --- HELPER COMPONENTS ---

// New QuestionCard matching HTML .question-card
const QuestionCard = ({ order, type, required, question, subtext, responses, children }: any) => (
    <div className="bg-white rounded-2xl shadow-[0_4px_6px_rgba(0,0,0,0.07)] p-8 border border-[#DEE2E6]">
        <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
                <div className="flex items-center mb-3 gap-2">
                    <span className="bg-[#60BA81] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
                        {order}
                    </span>
                    <span className="bg-[#284952]/10 text-[#284952] text-sm font-semibold px-3 py-1 rounded-full border border-[#284952]/20">
                        {type}
                    </span>
                    {required && (
                        <span className="bg-[#F5A83C]/10 text-[#F5A83C] text-sm font-semibold px-3 py-1 rounded-full border border-[#F5A83C]/20">
                            Required
                        </span>
                    )}
                </div>
                <h3 className="text-2xl font-bold text-[#284952] mb-2">{question}</h3>
                {subtext && (
                    <p className="bg-[#284952]/5 text-[#17161A] p-3 rounded-lg border-l-4 border-[#284952] text-sm">
                        {subtext}
                    </p>
                )}
            </div>
            <div className="text-right ml-4">
                <div className="text-sm text-[#767676] font-medium">Responses</div>
                <div className="text-3xl font-bold text-[#60BA81]">{responses}</div>
            </div>
        </div>
        {children}
    </div>
)

const LegendItem = ({ color, label }: any) => (
    <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
        <span className="text-[#17161A] font-medium text-sm">{label}</span>
    </div>
)

const TableRow = ({ topic, pct, sent, keys }: any) => (
    <div className="grid grid-cols-4 py-3 px-4 hover:bg-[#F5F5F7] transition-colors items-center">
        <div className="font-semibold" style={{ color: REPORT_COLORS.teal }}>{topic}</div>
        <div className="text-center">
            <span className="px-2 py-0.5 rounded text-xs font-bold border" style={{ backgroundColor: `${REPORT_COLORS.teal}1A`, color: REPORT_COLORS.teal, borderColor: `${REPORT_COLORS.teal}33` }}>{pct}%</span>
        </div>
        <div className="text-center">
            {sent === 'positive' && <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: `${REPORT_COLORS.green}1A`, color: REPORT_COLORS.green }}>Positive</span>}
            {sent === 'negative' && <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: `${REPORT_COLORS.orange}1A`, color: REPORT_COLORS.orange }}>Negative</span>}
            {sent === 'neutral' && <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: `${REPORT_COLORS.grayMedium}1A`, color: '#767676' }}>Neutral</span>}
        </div>
        <div className="text-xs text-[#767676]">
            {keys.join(", ")}
        </div>
    </div>
)
