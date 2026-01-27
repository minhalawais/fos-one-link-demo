"use client"

import { motion } from "framer-motion"
import { CheckCircle, Lock, Shield, ArrowLeft, ChevronDown } from "lucide-react"

// Color Scheme
const COLORS = {
    primary: "#89A8B2",
    secondary: "#B3C8CF",
    background: "#E5E1DA",
    surface: "#F1F0E8",
    text: "#2D3748",
    textMuted: "#5A6A7A",
    success: "#60BA81",
    orange: "#F5A83C",
}

interface SceneResponsesProps {
    isActive: boolean
    progress: number
}

export const SceneResponses = ({ isActive, progress }: SceneResponsesProps) => {
    // Scene runs from 63-75s (12 seconds duration)
    const localProgress = progress - 63

    // Phase 1 (0-5s): Submit responses (63-68s in script)
    // Phase 2 (5-12s): Confidentiality (68-75s in script)
    const submitPhase = Math.min(1, localProgress / 5)
    const privacyPhase = Math.min(1, Math.max(0, (localProgress - 5) / 7))

    // Question progress
    const answeredQuestions = Math.min(25, Math.floor(submitPhase * 25))
    const selectedOption = Math.floor(submitPhase * 3) % 6

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: COLORS.background }}
        >
            {/* Background */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, ${COLORS.primary} 1px, transparent 0)`,
                        backgroundSize: '32px 32px'
                    }}
                />
            </div>

            {/* Main content */}
            <div className="relative z-10 flex gap-10 items-center">
                {/* Phone mockup - matching actual app screenshots */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: submitPhase, y: 30 - (submitPhase * 30) }}
                    className="relative"
                >
                    {/* Phone frame */}
                    <div
                        className="w-[280px] h-[560px] rounded-[40px] p-3"
                        style={{
                            background: `linear-gradient(145deg, #2D3748, #1a202c)`,
                            boxShadow: `0 30px 60px -15px rgba(0,0,0,0.3)`
                        }}
                    >
                        {/* Screen */}
                        <div className="w-full h-full rounded-[28px] overflow-hidden bg-white flex flex-col">
                            {/* App header - orange like screenshot */}
                            <div
                                className="px-4 py-3 flex items-center gap-3"
                                style={{ backgroundColor: COLORS.orange }}
                            >
                                <ArrowLeft size={20} className="text-white" />
                                <span className="font-semibold text-white text-lg flex-1 text-center pr-6">Survey</span>
                            </div>

                            {/* Green banner with Urdu text */}
                            <div
                                className="px-4 py-3"
                                style={{ backgroundColor: COLORS.success }}
                            >
                                <div className="text-white text-right font-bold" style={{ direction: 'rtl' }}>
                                    صداقت کے ملازمین کا سروے
                                </div>
                            </div>

                            {/* Scrollable content */}
                            <div className="flex-1 overflow-hidden px-4 py-4 space-y-4">
                                {/* Confidentiality notice */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: submitPhase, y: 0 }}
                                    className="rounded-xl p-3 text-right"
                                    style={{
                                        backgroundColor: COLORS.surface,
                                        direction: 'rtl'
                                    }}
                                >
                                    <p className="text-xs leading-relaxed" style={{ color: COLORS.text }}>
                                        براہ مہربانی نوٹ فرمائیں کہ اس فارم میں فراہم کیا گیا آپ کا نام
                                        اور کمپنی آئی ڈی مکمل طور پر خفیہ رکھی جائے گی۔ آپ کی شناخت کسی بھی فرد کے ساتھ
                                        شیئر نہیں کی جائے گی۔
                                    </p>
                                </motion.div>

                                {/* Yes confirmation */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: submitPhase > 0.3 ? 1 : 0 }}
                                    className="rounded-xl p-3"
                                    style={{ backgroundColor: COLORS.surface }}
                                >
                                    <div className="text-right text-sm mb-2" style={{ color: COLORS.text, direction: 'rtl' }}>
                                        کیا آپ کو معلوم ہے کہ اس فارم کے تمام جوابات گمنام طریقے سے محفوظ کیے جائیں گے؟
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <motion.div
                                            className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                                            style={{
                                                borderColor: COLORS.success,
                                                backgroundColor: submitPhase > 0.4 ? COLORS.success : 'transparent'
                                            }}
                                            animate={submitPhase > 0.4 ? { scale: [1, 1.1, 1] } : {}}
                                        >
                                            {submitPhase > 0.4 && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="w-2 h-2 rounded-full bg-white"
                                                />
                                            )}
                                        </motion.div>
                                        <span className="text-sm" style={{ color: COLORS.text }}>ہاں</span>
                                    </div>
                                </motion.div>

                                {/* Question with options - matching screenshot */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: submitPhase > 0.5 ? 1 : 0, y: submitPhase > 0.5 ? 0 : 10 }}
                                    className="rounded-xl p-3"
                                    style={{ backgroundColor: COLORS.surface }}
                                >
                                    <div className="text-right text-sm mb-3 font-medium" style={{ color: COLORS.text, direction: 'rtl' }}>
                                        آپ صداقت لمیٹڈ کی کس مل میں کام کر رہے ہیں؟
                                        <span style={{ color: '#EF4444' }}> *</span>
                                    </div>
                                    <div className="space-y-2">
                                        {["Denim Apparel", "Knitting", "Knitting Apparel", "Power & Engineering", "Processing", "Spinning"].map((option, i) => (
                                            <motion.div
                                                key={option}
                                                className="flex items-center gap-2 py-1.5"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{
                                                    opacity: submitPhase > 0.6 ? 1 : 0,
                                                    x: submitPhase > 0.6 ? 0 : -10
                                                }}
                                                transition={{ delay: i * 0.05 }}
                                            >
                                                <motion.div
                                                    className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                                                    style={{
                                                        borderColor: i === selectedOption ? COLORS.primary : '#ccc',
                                                    }}
                                                    animate={i === selectedOption ? { scale: [1, 1.1, 1] } : {}}
                                                >
                                                    {i === selectedOption && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            className="w-2 h-2 rounded-full"
                                                            style={{ backgroundColor: COLORS.primary }}
                                                        />
                                                    )}
                                                </motion.div>
                                                <span className="text-sm" style={{ color: COLORS.text }}>{option}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Progress bar at bottom */}
                            <motion.div
                                className="h-2"
                                style={{ backgroundColor: COLORS.secondary }}
                            >
                                <motion.div
                                    className="h-full"
                                    style={{
                                        width: `${(answeredQuestions / 25) * 100}%`,
                                        background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.success})`
                                    }}
                                />
                            </motion.div>
                        </div>
                    </div>

                    {/* Phone glow */}
                    <div
                        className="absolute -inset-4 rounded-[48px] -z-10"
                        style={{
                            background: `radial-gradient(circle at center, ${COLORS.primary}20, transparent 70%)`,
                            filter: 'blur(20px)'
                        }}
                    />
                </motion.div>

                {/* Right: Privacy/Confidentiality panel */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: privacyPhase, x: 50 - (privacyPhase * 50) }}
                    className="w-[380px]"
                >
                    <div
                        className="rounded-3xl overflow-hidden"
                        style={{
                            backgroundColor: COLORS.surface,
                            boxShadow: `0 25px 60px -15px ${COLORS.primary}30`
                        }}
                    >
                        <div
                            className="px-6 py-4 flex items-center gap-3"
                            style={{
                                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`
                            }}
                        >
                            <Lock size={22} className="text-white" />
                            <span className="font-semibold text-white text-lg">100% Confidential</span>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Privacy features */}
                            {[
                                {
                                    icon: Shield,
                                    title: "Anonymous Responses",
                                    desc: "Identity never linked to answers"
                                },
                                {
                                    icon: Lock,
                                    title: "Encrypted Data",
                                    desc: "All submissions securely stored"
                                },
                                {
                                    icon: CheckCircle,
                                    title: "Honest Feedback",
                                    desc: "Encouraging unbiased responses"
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: privacyPhase, x: 20 - (privacyPhase * 20) }}
                                    transition={{ delay: i * 0.15 }}
                                    className="flex items-start gap-4 p-4 rounded-xl"
                                    style={{
                                        backgroundColor: i === 0 ? `${COLORS.success}10` : COLORS.background,
                                        border: i === 0 ? `2px solid ${COLORS.success}30` : 'none'
                                    }}
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{
                                            backgroundColor: i === 0 ? `${COLORS.success}20` : `${COLORS.primary}15`,
                                        }}
                                    >
                                        <item.icon
                                            size={24}
                                            style={{ color: i === 0 ? COLORS.success : COLORS.primary }}
                                        />
                                    </div>
                                    <div>
                                        <div className="font-semibold" style={{ color: COLORS.text }}>
                                            {item.title}
                                        </div>
                                        <div className="text-sm mt-0.5" style={{ color: COLORS.textMuted }}>
                                            {item.desc}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* At your convenience badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: privacyPhase > 0.5 ? 1 : 0, y: privacyPhase > 0.5 ? 0 : 10 }}
                                className="rounded-xl p-4 text-center"
                                style={{
                                    background: `linear-gradient(135deg, ${COLORS.primary}10, ${COLORS.secondary}15)`,
                                    border: `2px solid ${COLORS.primary}20`
                                }}
                            >
                                <p style={{ color: COLORS.text }}>
                                    Submit responses at <span className="font-bold" style={{ color: COLORS.primary }}>your convenience</span>
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
