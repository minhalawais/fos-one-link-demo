"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Lock, Shield, ArrowLeft, Signal, HelpCircle, Clock, Calendar, ChevronRight } from "lucide-react"

// --- SYSTEM COLORS (Matching App) ---
const COLORS = {
    teal: "#3B82F6",
    green: "#10B981",
    vibrantBlue: "#3B82F6",
    charcoal: "#17161A",
    white: "#FFFFFF",
    bg: "#F8FAFC",
    surface: "#FFFFFF",
    text: "#0F172A",
    textMuted: "#64748B",
    border: "#E2E8F0",
    red: "#EF4444",
}

interface SceneProps {
    isActive: boolean
    progress: number
}

// ==========================================
// SCENE RESPONSES (63s - 75s)
// "Mobile Survey Journey"
// ==========================================

export const SceneResponses = ({ isActive, progress }: SceneProps) => {
    // Scene: 63s - 75s (12 seconds)
    const localT = Math.max(0, progress - 63)

    // STAGES:
    // 0s - 2.5s: CNIC Entry (Typing)
    // 2.5s - 3.5s: Submit & Verify (Click -> Verified)
    // 3.5s - 6.0s: Survey List (Appear -> Click)
    // 6.0s - 12s+: Survey Form (Scroll)

    let stage = 'cnic'
    if (localT > 3.5 && localT <= 6.0) stage = 'list'
    if (localT > 6.0) stage = 'form'

    // --- CNIC STAGE ---
    const cnicText = "35201-1234567-8"
    // Type over 2 seconds
    const typedChars = Math.min(cnicText.length, Math.floor((localT / 2) * cnicText.length))
    // Simulate Click at 2.3s
    const isSubmitPressed = localT > 2.2 && localT < 2.5
    // Show Verified after 2.5s
    const isVerified = localT > 2.5

    // --- LIST STAGE ---
    // Simulate Click on Survey Card at 5.5s
    const isCardPressed = localT > 5.4 && localT < 5.8

    // --- FORM STAGE ---
    // Scroll starts at 6.0s, duration 6s
    const formProgress = Math.max(0, Math.min(1, (localT - 6.5) / 5.5))
    const scrollY = formProgress * 300 // Slower scroll (300px)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center overflow-hidden relative"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] opacity-[0.03] pointer-events-none">
                {[...Array(400)].map((_, i) => (
                    <div key={i} className="border-[0.5px] border-black/20" />
                ))}
            </div>

            <div className="relative z-10 flex gap-8 items-center">

                {/* ===== PHONE MOCKUP ===== */}
                <motion.div
                    initial={{ y: 100, opacity: 0, scale: 0.85 }}
                    animate={{ y: 0, opacity: 1, scale: 0.85 }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    className="relative"
                >
                    {/* Phone Frame */}
                    <div
                        className="w-[270px] h-[540px] rounded-[40px] p-2.5 relative"
                        style={{
                            background: `linear-gradient(145deg, #2D3748, #1a202c)`,
                            boxShadow: `0 30px 60px -15px rgba(0,0,0,0.4)`
                        }}
                    >
                        {/* Dynamic Island */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-30" />

                        {/* Screen */}
                        <div className="w-full h-full rounded-[30px] overflow-hidden bg-white flex flex-col relative">

                            {/* Status Bar */}
                            <div className="h-7 flex justify-between items-end px-5 pb-1 text-[9px] font-bold text-gray-800 bg-transparent z-20 relative pt-3">
                                <span>9:41</span>
                                <div className="flex gap-1 items-center">
                                    <Signal size={9} />
                                    <div className="w-4 h-2 bg-gray-800 rounded-[1.5px]" />
                                </div>
                            </div>

                            <AnimatePresence mode="wait">

                                {/* ===== STAGE 1: CNIC ENTRY & VERIFY ===== */}
                                {stage === 'cnic' && (
                                    <motion.div
                                        key="cnic"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        className="flex-1 flex flex-col items-center justify-center px-6 bg-white relative"
                                    >
                                        {/* FOS Logo Placeholder */}
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="w-20 h-20 mb-5 rounded-full flex items-center justify-center"
                                            style={{ backgroundColor: `${COLORS.green}15` }}
                                        >
                                            <img src="/assets/images/FOS-01.png" alt="FOS" className="w-16 h-16 object-contain" />
                                        </motion.div>

                                        {/* Title */}
                                        <motion.div
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-center mb-5"
                                        >
                                            <h2 className="text-lg font-bold" style={{ color: COLORS.text }}>Enter FOS ID/CNIC</h2>
                                            <p className="text-[13px] mt-0.5" style={{ color: COLORS.textMuted, direction: 'rtl' }}>
                                                اپنا ایف او ایس آئی ڈی/شناختی کارڈ نمبر درج کریں
                                            </p>
                                        </motion.div>

                                        {/* Input Field */}
                                        <motion.div
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="w-full rounded-full px-4 py-2.5 flex items-center gap-2.5 mb-3"
                                            style={{ border: `2px solid ${isVerified ? COLORS.green : COLORS.border}` }}
                                        >
                                            <span className="text-base">👤</span>
                                            <span className="text-sm" style={{ color: typedChars > 0 ? COLORS.text : COLORS.textMuted }}>
                                                {typedChars > 0 ? cnicText.slice(0, typedChars) : "Enter ID/CNIC..."}
                                            </span>
                                            {!isVerified && (
                                                <motion.span
                                                    animate={{ opacity: [1, 0, 1] }}
                                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                                    className="w-0.5 h-5 bg-teal-500"
                                                />
                                            )}
                                            {isVerified && (
                                                <motion.div
                                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                    className="ml-auto text-green-500"
                                                >
                                                    <CheckCircle size={20} fill={COLORS.green} className="text-white" />
                                                </motion.div>
                                            )}
                                        </motion.div>

                                        {/* Submit Button */}
                                        <motion.button
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{
                                                y: 0,
                                                opacity: 1,
                                                scale: isSubmitPressed ? 0.92 : 1,
                                                backgroundColor: isVerified ? COLORS.green : COLORS.green // Keep green
                                            }}
                                            transition={{ delay: 0.4 }}
                                            className="w-full py-2.5 rounded-full text-white font-bold text-base relative overflow-hidden"
                                            style={{ backgroundColor: COLORS.green }}
                                        >
                                            {isVerified ? "Verified" : "Submit"}

                                            {/* Click Visual */}
                                            {isSubmitPressed && (
                                                <div className="absolute inset-0 bg-black/20" />
                                            )}
                                        </motion.button>

                                        {/* Toast Message */}
                                        <AnimatePresence>
                                            {isVerified && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute bottom-10 bg-black/80 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2"
                                                >
                                                    <CheckCircle size={14} className="text-green-400" /> Employee Verified
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                )}

                                {/* ===== STAGE 2: SURVEY LIST ===== */}
                                {stage === 'list' && (
                                    <motion.div
                                        key="list"
                                        initial={{ x: 100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex-1 flex flex-col bg-gray-50 mb-4" // mb-4 for home bar safe area
                                    >
                                        {/* Header */}
                                        <div
                                            className="py-2.5 px-4 text-center"
                                            style={{ backgroundColor: COLORS.green }}
                                        >
                                            <span className="text-white text-lg font-bold">Available Surveys</span>
                                        </div>

                                        {/* Survey Card */}
                                        <div className="p-4">
                                            <motion.div
                                                initial={{ y: 30, opacity: 0 }}
                                                animate={{
                                                    y: 0,
                                                    opacity: 1,
                                                    scale: isCardPressed ? 0.96 : 1,
                                                    backgroundColor: isCardPressed ? "#F0FDF4" : "#FFFFFF"
                                                }}
                                                transition={{ delay: 0.1 }}
                                                className="rounded-2xl shadow-lg overflow-hidden relative"
                                                style={{ border: `1px solid ${isCardPressed ? COLORS.green : COLORS.border}` }}
                                            >
                                                {/* Ripple Overlay */}
                                                {isCardPressed && (
                                                    <motion.div
                                                        initial={{ opacity: 0 }} animate={{ opacity: 0.1 }}
                                                        className="absolute inset-0 bg-teal-500 z-10"
                                                    />
                                                )}

                                                <div className="flex">
                                                    <div className="w-1.5" style={{ backgroundColor: COLORS.green }} />
                                                    <div className="flex-1 p-3">
                                                        <h3 className="font-bold text-[14px] mb-1.5 leading-tight" style={{ color: COLORS.text }}>
                                                            Organizational Effectiveness & Engagement Survey
                                                        </h3>
                                                        <p className="text-[11px] leading-snug mb-3 opacity-80" style={{ color: COLORS.textMuted }}>
                                                            Assess leadership effectiveness, communication, and workplace culture...
                                                        </p>

                                                        {/* Meta info */}
                                                        <div className="flex gap-3 text-[11px] mb-2.5">
                                                            <div className="flex items-center gap-1">
                                                                <HelpCircle size={12} style={{ color: COLORS.green }} />
                                                                <span className="font-bold" style={{ color: COLORS.vibrantBlue }}>40 Qs</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Clock size={12} style={{ color: COLORS.green }} />
                                                                <span className="font-bold" style={{ color: COLORS.teal }}>20 min</span>
                                                            </div>
                                                        </div>

                                                        {/* Footer */}
                                                        <div className="flex items-center justify-between pt-1.5 border-t" style={{ borderColor: COLORS.border }}>
                                                            <div className="flex items-center gap-1 text-[10px]" style={{ color: COLORS.textMuted }}>
                                                                <Calendar size={10} />
                                                                <span>Jan 31, 2026</span>
                                                            </div>
                                                            <div
                                                                className="px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                                                                style={{ color: COLORS.red, backgroundColor: `${COLORS.red}10` }}
                                                            >
                                                                Not Filled
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Finger pointer visualization (optional, showing interaction) */}
                                            {isCardPressed && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 2 }}
                                                    animate={{ opacity: 0.5, scale: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute top-1/2 left-1/2 w-8 h-8 rounded-full bg-gray-400/30 blur-sm pointer-events-none"
                                                />
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {/* ===== STAGE 3: SURVEY FORM ===== */}
                                {stage === 'form' && (
                                    <motion.div
                                        key="form"
                                        initial={{ x: 100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        className="flex-1 flex flex-col bg-white overflow-hidden"
                                    >
                                        {/* Header */}
                                        <div
                                            className="py-2.5 px-4 flex items-center gap-2.5"
                                            style={{ backgroundColor: COLORS.green }}
                                        >
                                            <ArrowLeft size={18} className="text-white" />
                                            <span className="text-white font-semibold flex-1 text-center pr-5 text-sm">Survey Journey</span>
                                        </div>

                                        {/* Urdu Banner */}
                                        <div className="py-1.5 px-4 text-right" style={{ backgroundColor: COLORS.teal, direction: 'rtl' }}>
                                            <span className="text-white text-[13px] font-bold">ملازمین کی مصروفیت کا سروے</span>
                                        </div>

                                        {/* Scrollable Form Content */}
                                        <div className="flex-1 overflow-hidden relative">
                                            <motion.div
                                                animate={{ y: -scrollY }}
                                                transition={{ type: "tween", ease: "linear", duration: 0.1 }}
                                                className="p-4 space-y-4 pb-20"
                                            >
                                                {/* Confidentiality Notice */}
                                                <motion.div
                                                    className="rounded-xl p-2.5 text-right"
                                                    style={{ backgroundColor: COLORS.surface, direction: 'rtl' }}
                                                >
                                                    <p className="text-[11px] leading-relaxed" style={{ color: COLORS.text }}>
                                                        براہ مہربانی نوٹ فرمائیں کہ اس فارم میں فراہم کیا گیا آپ کا نام اور کمپنی آئی ڈی مکمل طور پر خفیہ رکھی جائے گی۔
                                                    </p>
                                                </motion.div>

                                                {/* Confirmation Question */}
                                                <div className="rounded-xl p-2.5" style={{ backgroundColor: COLORS.surface }}>
                                                    <div className="text-right text-[13px] mb-1.5 font-medium" style={{ color: COLORS.text, direction: 'rtl' }}>
                                                        کیا آپ کو معلوم ہے کہ اس فارم کے تمام جوابات گمنام طریقے سے محفوظ کیے جائیں گے؟
                                                    </div>
                                                    <motion.div
                                                        className="flex items-center gap-2"
                                                        animate={{ scale: [1, 1.02, 1] }}
                                                    >
                                                        <div
                                                            className="w-4 h-4 rounded-full flex items-center justify-center"
                                                            style={{
                                                                backgroundColor: COLORS.green,
                                                                border: `2px solid ${COLORS.green}`
                                                            }}
                                                        >
                                                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                                        </div>
                                                        <span className="text-[13px]" style={{ color: COLORS.text }}>ہاں</span>
                                                    </motion.div>
                                                </div>

                                                {/* Mill Selection Question */}
                                                <motion.div
                                                    className="rounded-xl p-2.5"
                                                    style={{ backgroundColor: COLORS.surface }}
                                                >
                                                    <div className="text-right text-[13px] mb-2.5 font-medium" style={{ color: COLORS.text, direction: 'rtl' }}>
                                                        آپ صداقت لمیٹڈ کی کس مل میں کام کر رہے ہیں؟
                                                        <span style={{ color: COLORS.red }}> *</span>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {["Denim Apparel", "Knitting", "Knitting Apparel", "Power & Engineering", "Processing", "Spinning"].map((option, i) => {
                                                            const isSelected = i === 2
                                                            return (
                                                                <div
                                                                    key={option}
                                                                    className="flex items-center gap-2 py-1"
                                                                >
                                                                    <div
                                                                        className="w-4 h-4 rounded-full flex items-center justify-center"
                                                                        style={{
                                                                            backgroundColor: isSelected ? COLORS.teal : 'transparent',
                                                                            border: `2px solid ${isSelected ? COLORS.teal : '#ccc'}`
                                                                        }}
                                                                    >
                                                                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                                                    </div>
                                                                    <span className="text-xs" style={{ color: COLORS.text }}>{option}</span>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </motion.div>

                                                {/* Rating Question */}
                                                <motion.div
                                                    className="rounded-xl p-2.5"
                                                    style={{ backgroundColor: COLORS.surface }}
                                                >
                                                    <div className="text-right text-[13px] mb-2.5 font-medium" style={{ color: COLORS.text, direction: 'rtl' }}>
                                                        آپ ڈپارٹمنٹ کی ٹیم سپرٹ کو کیسے درجہ بندی کریں گے؟
                                                        <span style={{ color: COLORS.red }}> *</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        {[1, 2, 3, 4, 5].map((num) => {
                                                            const isActive = num <= 4
                                                            return (
                                                                <div
                                                                    key={num}
                                                                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                                                                    style={{
                                                                        backgroundColor: isActive ? COLORS.green : COLORS.border,
                                                                        color: isActive ? 'white' : COLORS.textMuted
                                                                    }}
                                                                >
                                                                    {num}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </motion.div>

                                                {/* Long Text Question */}
                                                <motion.div
                                                    className="rounded-xl p-2.5"
                                                    style={{ backgroundColor: COLORS.surface }}
                                                >
                                                    <div className="text-right text-[13px] mb-2.5 font-medium" style={{ color: COLORS.text, direction: 'rtl' }}>
                                                        کیا آپ کے پاس کوئی اور رائے ہے؟
                                                    </div>
                                                    <div className="w-full h-20 rounded-lg border bg-white" style={{ borderColor: COLORS.border }} />
                                                </motion.div>
                                            </motion.div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="h-2" style={{ backgroundColor: COLORS.border }}>
                                            <motion.div
                                                className="h-full"
                                                initial={{ width: "0%" }}
                                                animate={{ width: `${formProgress * 80 + 20}%` }}
                                                style={{
                                                    background: `linear-gradient(90deg, ${COLORS.teal}, ${COLORS.green})`
                                                }}
                                            />
                                        </div>
                                    </motion.div>
                                )}

                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Phone Glow */}
                    <div
                        className="absolute -inset-6 rounded-[60px] -z-10"
                        style={{
                            background: `radial-gradient(circle at center, ${COLORS.teal}25, transparent 70%)`,
                            filter: 'blur(30px)'
                        }}
                    />
                </motion.div>

                {/* ===== PRIVACY PANEL (appears at 68s / localT 5s) ===== */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{
                        opacity: localT > 5 ? 1 : 0,
                        x: localT > 5 ? 0 : 60
                    }}
                    transition={{ type: "spring", damping: 20 }}
                    className="w-[320px]"
                >
                    <div
                        className="rounded-3xl overflow-hidden shadow-2xl"
                        style={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.border}` }}
                    >
                        {/* Header */}
                        <div
                            className="px-5 py-3 flex items-center gap-2.5"
                            style={{ background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.green})` }}
                        >
                            <Lock size={20} className="text-white" />
                            <span className="font-bold text-white text-base">Security & Privacy</span>
                        </div>

                        {/* Privacy Features */}
                        <div className="p-4 space-y-2.5">
                            {[
                                { icon: Shield, title: "Anonymous Responses", desc: "Identity never linked to answers" },
                                { icon: Lock, title: "Encrypted Data", desc: "All submissions securely stored" },
                                { icon: CheckCircle, title: "Honest Feedback", desc: "Encouraging unbiased responses" },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: localT > 5 + i * 0.5 ? 1 : 0, x: localT > 5 + i * 0.5 ? 0 : 30 }}
                                    className="flex items-start gap-4 p-4 rounded-xl"
                                    style={{
                                        backgroundColor: i === 0 ? `${COLORS.green}10` : COLORS.surface,
                                        border: i === 0 ? `2px solid ${COLORS.green}30` : 'none'
                                    }}
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: i === 0 ? `${COLORS.green}20` : `${COLORS.teal}15` }}
                                    >
                                        <item.icon size={20} style={{ color: i === 0 ? COLORS.green : COLORS.teal }} />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm" style={{ color: COLORS.text }}>{item.title}</div>
                                        <div className="text-[13px] mt-0.5" style={{ color: COLORS.textMuted }}>{item.desc}</div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* At your convenience badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: localT > 8 ? 1 : 0, y: localT > 8 ? 0 : 10 }}
                                className="rounded-xl p-4 text-center mt-4"
                                style={{
                                    background: `linear-gradient(135deg, ${COLORS.teal}10, ${COLORS.green}15)`,
                                    border: `2px solid ${COLORS.teal}20`
                                }}
                            >
                                <p style={{ color: COLORS.text }}>
                                    Submit responses at <span className="font-bold" style={{ color: COLORS.teal }}>your convenience</span>
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Worker/Employee Avatar Card - Bottom Left */}
            <motion.div
                className="absolute bottom-8 left-8 z-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
                transition={{ delay: 0.5, type: "spring", damping: 20 }}
            >
                {/* Pulsing Glow Ring */}
                <motion.div
                    className="absolute w-52 h-52 rounded-full -z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ background: `radial-gradient(circle, ${COLORS.teal}15 0%, transparent 70%)` }}
                    animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* IO Avatar Card */}
                <motion.div
                    className="bg-white rounded-2xl shadow-2xl p-4 flex flex-col items-center border-[1.5px]"
                    style={{ borderColor: COLORS.teal }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-16 h-16 rounded-xl overflow-hidden border-2 shadow-md mb-2" style={{ borderColor: COLORS.teal }}>
                        <img src="/assets/avatars/worker_avatar.png" alt="Worker / Employee" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[#284952] font-bold text-[13px]">Worker / Employee</span>
                    <span className="text-teal-600 text-[9px] font-mono mb-2">Mobile App</span>

                    {/* Status Badge */}
                    <div
                        className="px-3 py-1 rounded-full flex items-center gap-1.5"
                        style={{ backgroundColor: `${COLORS.teal}12` }}
                    >
                        <motion.div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: stage === 'form' ? "#60BA81" : COLORS.teal }}
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                        <span className="text-teal-700 text-[9px] font-bold tracking-tight">
                            {stage === 'cnic' && "Entering CNIC"}
                            {stage === 'list' && "Selecting Survey"}
                            {stage === 'form' && "Filling Survey"}
                        </span>
                    </div>
                </motion.div>
            </motion.div>


        </motion.div>
    )
}
