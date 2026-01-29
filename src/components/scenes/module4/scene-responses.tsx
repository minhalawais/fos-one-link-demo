"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Lock, Shield, ArrowLeft, Signal, HelpCircle, Clock, Calendar, ChevronRight } from "lucide-react"

// --- SYSTEM COLORS (Matching App) ---
const COLORS = {
    teal: "#0f9690",
    green: "#60BA81",
    orange: "#F5A83C",
    charcoal: "#17161A",
    white: "#FFFFFF",
    bg: "#F5F5F7",
    surface: "#F8F8F8",
    text: "#2D3748",
    textMuted: "#718096",
    border: "#E2E8F0",
    red: "#E53E3E",
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
    const localT = progress - 63

    // STAGES:
    // Stage 1: CNIC Entry (0-2s) -> localT < 2
    // Stage 2: Survey List (2-5s) -> localT < 5
    // Stage 3: Survey Form + Scroll (5-12s) -> localT >= 5
    const stage = localT < 2 ? 'cnic' : localT < 5 ? 'list' : 'form'

    // Form scroll progress (for auto-scroll effect)
    const formProgress = Math.max(0, Math.min(1, (localT - 5) / 7))
    const scrollY = formProgress * 400 // Scroll down 400px worth of content

    // Typing animation for CNIC
    const cnicText = "3520112345678"
    const typedChars = Math.min(cnicText.length, Math.floor((localT / 2) * cnicText.length))

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center overflow-hidden relative"
            style={{ backgroundColor: COLORS.bg }}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] opacity-[0.03] pointer-events-none">
                {[...Array(400)].map((_, i) => (
                    <div key={i} className="border-[0.5px] border-black/20" />
                ))}
            </div>

            <div className="relative z-10 flex gap-12 items-center">

                {/* ===== PHONE MOCKUP ===== */}
                <motion.div
                    initial={{ y: 100, opacity: 0, scale: 0.85 }}
                    animate={{ y: 0, opacity: 1, scale: 0.85 }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    className="relative"
                >
                    {/* Phone Frame */}
                    <div
                        className="w-[300px] h-[600px] rounded-[48px] p-3 relative"
                        style={{
                            background: `linear-gradient(145deg, #2D3748, #1a202c)`,
                            boxShadow: `0 40px 80px -20px rgba(0,0,0,0.4)`
                        }}
                    >
                        {/* Dynamic Island */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-b-2xl z-30" />

                        {/* Screen */}
                        <div className="w-full h-full rounded-[36px] overflow-hidden bg-white flex flex-col relative">

                            {/* Status Bar */}
                            <div className="h-8 flex justify-between items-end px-6 pb-1 text-[10px] font-bold text-gray-800 bg-transparent z-20 relative pt-4">
                                <span>9:41</span>
                                <div className="flex gap-1 items-center">
                                    <Signal size={10} />
                                    <div className="w-5 h-2.5 bg-gray-800 rounded-[2px]" />
                                </div>
                            </div>

                            <AnimatePresence mode="wait">

                                {/* ===== STAGE 1: CNIC ENTRY ===== */}
                                {stage === 'cnic' && (
                                    <motion.div
                                        key="cnic"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        className="flex-1 flex flex-col items-center justify-center px-6 bg-white"
                                    >
                                        {/* FOS Logo Placeholder */}
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="w-24 h-24 mb-6 rounded-full flex items-center justify-center"
                                            style={{ backgroundColor: `${COLORS.green}15` }}
                                        >
                                            <div className="text-3xl font-bold" style={{ color: COLORS.green }}>FOS</div>
                                        </motion.div>

                                        {/* Title */}
                                        <motion.div
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-center mb-6"
                                        >
                                            <h2 className="text-xl font-bold" style={{ color: COLORS.text }}>Enter FOS ID/CNIC</h2>
                                            <p className="text-sm mt-1" style={{ color: COLORS.textMuted, direction: 'rtl' }}>
                                                اپنا ایف او ایس آئی ڈی/شناختی کارڈ نمبر درج کریں
                                            </p>
                                        </motion.div>

                                        {/* Input Field */}
                                        <motion.div
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="w-full rounded-full px-5 py-3 flex items-center gap-3 mb-4"
                                            style={{ border: `2px solid ${COLORS.border}` }}
                                        >
                                            <span className="text-lg">👤</span>
                                            <span style={{ color: typedChars > 0 ? COLORS.text : COLORS.textMuted }}>
                                                {typedChars > 0 ? cnicText.slice(0, typedChars) : "Enter your FOS ID/CNIC..."}
                                            </span>
                                            <motion.span
                                                animate={{ opacity: [1, 0, 1] }}
                                                transition={{ repeat: Infinity, duration: 0.8 }}
                                                className="w-0.5 h-5 bg-teal-500"
                                            />
                                        </motion.div>

                                        {/* Submit Button */}
                                        <motion.button
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1, scale: localT > 1.5 ? [1, 0.95, 1] : 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="w-full py-3 rounded-full text-white font-semibold text-lg"
                                            style={{ backgroundColor: COLORS.green }}
                                        >
                                            Submit
                                        </motion.button>
                                    </motion.div>
                                )}

                                {/* ===== STAGE 2: SURVEY LIST ===== */}
                                {stage === 'list' && (
                                    <motion.div
                                        key="list"
                                        initial={{ x: 100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex-1 flex flex-col bg-gray-50"
                                    >
                                        {/* Header */}
                                        <div
                                            className="py-4 px-5 text-center"
                                            style={{ backgroundColor: COLORS.green }}
                                        >
                                            <span className="text-white text-xl font-bold">Available Surveys</span>
                                        </div>

                                        {/* Survey Card */}
                                        <div className="p-4">
                                            <motion.div
                                                initial={{ y: 30, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.3, type: "spring" }}
                                                whileTap={{ scale: 0.98 }}
                                                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                                                style={{ border: `1px solid ${COLORS.border}` }}
                                            >
                                                {/* Green left accent */}
                                                <div className="flex">
                                                    <div className="w-1.5" style={{ backgroundColor: COLORS.green }} />
                                                    <div className="flex-1 p-4">
                                                        <h3 className="font-bold text-base mb-2" style={{ color: COLORS.text }}>
                                                            Organizational Effectiveness & Engagement Survey for CHZ Head Office Staff
                                                        </h3>
                                                        <p className="text-xs leading-relaxed mb-4" style={{ color: COLORS.textMuted }}>
                                                            This survey is designed to assess leadership effectiveness, communication, performance management, and workplace culture within the Head Office team...
                                                        </p>

                                                        {/* Meta info */}
                                                        <div className="flex gap-4 text-xs mb-3">
                                                            <div className="flex items-center gap-1">
                                                                <HelpCircle size={14} style={{ color: COLORS.green }} />
                                                                <span style={{ color: COLORS.textMuted }}>Questions:</span>
                                                                <span className="font-bold" style={{ color: COLORS.orange }}>40</span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Clock size={14} style={{ color: COLORS.green }} />
                                                                <span style={{ color: COLORS.textMuted }}>Est. Time:</span>
                                                                <span className="font-bold" style={{ color: COLORS.teal }}>20 min</span>
                                                            </div>
                                                        </div>

                                                        {/* Footer */}
                                                        <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: COLORS.border }}>
                                                            <div className="flex items-center gap-1 text-xs" style={{ color: COLORS.textMuted }}>
                                                                <Calendar size={12} />
                                                                <span>Expires: 2026-01-31</span>
                                                            </div>
                                                            <motion.div
                                                                animate={{ scale: [1, 1.05, 1] }}
                                                                transition={{ repeat: Infinity, duration: 2 }}
                                                                className="px-3 py-1 rounded-full text-xs font-bold"
                                                                style={{ color: COLORS.red, backgroundColor: `${COLORS.red}10` }}
                                                            >
                                                                Not Filled
                                                            </motion.div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Tap indicator */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: localT > 4 ? 1 : 0 }}
                                                className="flex items-center justify-center gap-2 mt-4 text-sm"
                                                style={{ color: COLORS.teal }}
                                            >
                                                <span>Tap to start</span>
                                                <ChevronRight size={16} />
                                            </motion.div>
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
                                            className="py-3 px-4 flex items-center gap-3"
                                            style={{ backgroundColor: COLORS.green }}
                                        >
                                            <ArrowLeft size={20} className="text-white" />
                                            <span className="text-white font-semibold flex-1 text-center pr-6">Survey</span>
                                        </div>

                                        {/* Urdu Banner */}
                                        <div className="py-2 px-4 text-right" style={{ backgroundColor: COLORS.teal, direction: 'rtl' }}>
                                            <span className="text-white text-sm font-bold">ملازمین کی مصروفیت کا سروے</span>
                                        </div>

                                        {/* Scrollable Form Content */}
                                        <div className="flex-1 overflow-hidden relative">
                                            <motion.div
                                                animate={{ y: -scrollY }}
                                                transition={{ type: "tween", ease: "easeOut" }}
                                                className="p-4 space-y-4"
                                            >
                                                {/* Confidentiality Notice */}
                                                <motion.div
                                                    className="rounded-xl p-3 text-right"
                                                    style={{ backgroundColor: COLORS.surface, direction: 'rtl' }}
                                                >
                                                    <p className="text-xs leading-relaxed" style={{ color: COLORS.text }}>
                                                        براہ مہربانی نوٹ فرمائیں کہ اس فارم میں فراہم کیا گیا آپ کا نام اور کمپنی آئی ڈی مکمل طور پر خفیہ رکھی جائے گی۔
                                                    </p>
                                                </motion.div>

                                                {/* Confirmation Question */}
                                                <div className="rounded-xl p-3" style={{ backgroundColor: COLORS.surface }}>
                                                    <div className="text-right text-sm mb-2 font-medium" style={{ color: COLORS.text, direction: 'rtl' }}>
                                                        کیا آپ کو معلوم ہے کہ اس فارم کے تمام جوابات گمنام طریقے سے محفوظ کیے جائیں گے؟
                                                    </div>
                                                    <motion.div
                                                        className="flex items-center gap-2"
                                                        animate={formProgress > 0.1 ? { scale: [1, 1.02, 1] } : {}}
                                                    >
                                                        <div
                                                            className="w-5 h-5 rounded-full flex items-center justify-center"
                                                            style={{
                                                                backgroundColor: formProgress > 0.1 ? COLORS.green : 'transparent',
                                                                border: `2px solid ${COLORS.green}`
                                                            }}
                                                        >
                                                            {formProgress > 0.1 && <div className="w-2 h-2 rounded-full bg-white" />}
                                                        </div>
                                                        <span className="text-sm" style={{ color: COLORS.text }}>ہاں</span>
                                                    </motion.div>
                                                </div>

                                                {/* Mill Selection Question */}
                                                <motion.div
                                                    className="rounded-xl p-3"
                                                    style={{ backgroundColor: COLORS.surface }}
                                                    animate={formProgress > 0.3 && formProgress < 0.6 ? {
                                                        scale: 1.02,
                                                        boxShadow: `0 4px 20px ${COLORS.teal}30`
                                                    } : {}}
                                                >
                                                    <div className="text-right text-sm mb-3 font-medium" style={{ color: COLORS.text, direction: 'rtl' }}>
                                                        آپ صداقت لمیٹڈ کی کس مل میں کام کر رہے ہیں؟
                                                        <span style={{ color: COLORS.red }}> *</span>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {["Denim Apparel", "Knitting", "Knitting Apparel", "Power & Engineering", "Processing", "Spinning"].map((option, i) => {
                                                            const isSelected = formProgress > 0.4 && i === 2
                                                            return (
                                                                <motion.div
                                                                    key={option}
                                                                    className="flex items-center gap-2 py-1"
                                                                    animate={isSelected ? { scale: [1, 1.02, 1] } : {}}
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
                                                                </motion.div>
                                                            )
                                                        })}
                                                    </div>
                                                </motion.div>

                                                {/* Rating Question */}
                                                <motion.div
                                                    className="rounded-xl p-3"
                                                    style={{ backgroundColor: COLORS.surface }}
                                                    animate={formProgress > 0.6 ? {
                                                        scale: 1.02,
                                                        boxShadow: `0 4px 20px ${COLORS.teal}30`
                                                    } : {}}
                                                >
                                                    <div className="text-right text-sm mb-3 font-medium" style={{ color: COLORS.text, direction: 'rtl' }}>
                                                        آپ ڈپارٹمنٹ کی ٹیم سپرٹ کو کیسے درجہ بندی کریں گے؟
                                                        <span style={{ color: COLORS.red }}> *</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        {[1, 2, 3, 4, 5].map((num) => {
                                                            const isActive = formProgress > 0.7 && num <= 4
                                                            return (
                                                                <motion.div
                                                                    key={num}
                                                                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold"
                                                                    style={{
                                                                        backgroundColor: isActive ? COLORS.green : COLORS.border,
                                                                        color: isActive ? 'white' : COLORS.textMuted
                                                                    }}
                                                                    animate={isActive && num === 4 ? { scale: [1, 1.1, 1] } : {}}
                                                                >
                                                                    {num}
                                                                </motion.div>
                                                            )
                                                        })}
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="h-2" style={{ backgroundColor: COLORS.border }}>
                                            <motion.div
                                                className="h-full"
                                                style={{
                                                    width: `${formProgress * 100}%`,
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
                    className="w-[360px]"
                >
                    <div
                        className="rounded-3xl overflow-hidden shadow-2xl"
                        style={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.border}` }}
                    >
                        {/* Header */}
                        <div
                            className="px-6 py-4 flex items-center gap-3"
                            style={{ background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.green})` }}
                        >
                            <Lock size={22} className="text-white" />
                            <span className="font-bold text-white text-lg">100% Confidential</span>
                        </div>

                        {/* Privacy Features */}
                        <div className="p-5 space-y-3">
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
                                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ backgroundColor: i === 0 ? `${COLORS.green}20` : `${COLORS.teal}15` }}
                                    >
                                        <item.icon size={24} style={{ color: i === 0 ? COLORS.green : COLORS.teal }} />
                                    </div>
                                    <div>
                                        <div className="font-semibold" style={{ color: COLORS.text }}>{item.title}</div>
                                        <div className="text-sm mt-0.5" style={{ color: COLORS.textMuted }}>{item.desc}</div>
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
        </motion.div>
    )
}
