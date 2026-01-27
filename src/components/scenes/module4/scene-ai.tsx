"use client"

import { motion } from "framer-motion"
import { Brain, Sparkles, ThumbsUp, Meh, ThumbsDown, CheckCircle, ArrowRight, ClipboardList, Users, MessageSquare, BarChart3 } from "lucide-react"

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
    red: "#EF4444",
}

interface SceneAIProps {
    isActive: boolean
    progress: number
}

export const SceneAI = ({ isActive, progress }: SceneAIProps) => {
    // Scene runs from 91-115s (24 seconds duration)
    const localProgress = progress - 91

    // Phase 1 (0-14s): AI sentiment analysis (91-105s in script)
    // Phase 2 (14-24s): Conclusion - proactive engagement (105-115s in script)
    const aiPhase = Math.min(1, localProgress / 14)
    const conclusionPhase = Math.min(1, Math.max(0, (localProgress - 14) / 10))

    // Sentiment values (animated)
    const positiveValue = Math.round(62 * aiPhase)
    const neutralValue = Math.round(28 * aiPhase)
    const negativeValue = Math.round(10 * aiPhase)

    // Word cloud terms
    const themes = [
        { text: "Work-Life Balance", size: 1.2, x: 0, y: 0, delay: 0.2 },
        { text: "Management", size: 1.0, x: -80, y: 40, delay: 0.4 },
        { text: "Safety", size: 1.1, x: 90, y: 30, delay: 0.3 },
        { text: "Growth", size: 0.9, x: -60, y: -40, delay: 0.5 },
        { text: "Benefits", size: 1.0, x: 70, y: -35, delay: 0.6 },
        { text: "Training", size: 0.85, x: -100, y: 0, delay: 0.7 },
        { text: "Communication", size: 0.95, x: 110, y: -10, delay: 0.55 },
    ]

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
                <motion.div
                    className="absolute top-20 left-1/4 w-64 h-64 rounded-full"
                    style={{
                        background: `radial-gradient(circle, ${COLORS.primary}20, transparent 70%)`,
                        filter: 'blur(50px)'
                    }}
                    animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
            </div>

            {/* Main content */}
            <div className="relative z-10 max-w-5xl mx-auto">
                {/* AI Phase content */}
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: conclusionPhase > 0.5 ? 0 : 1 }}
                    className="flex gap-8"
                    style={{ display: conclusionPhase > 0.7 ? 'none' : 'flex' }}
                >
                    {/* Left: Sentiment Analysis */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: aiPhase, x: -30 + (aiPhase * 30) }}
                        className="w-[400px] rounded-3xl overflow-hidden"
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
                            <motion.div
                                animate={{ rotate: [0, 15, -15, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Brain size={22} className="text-white" />
                            </motion.div>
                            <span className="font-semibold text-white text-lg">AI Sentiment Analysis</span>
                            <motion.div
                                className="ml-auto"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <Sparkles size={18} className="text-white" />
                            </motion.div>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* Sentiment bars */}
                            {[
                                { icon: ThumbsUp, label: "Positive", value: positiveValue, color: COLORS.success },
                                { icon: Meh, label: "Neutral", value: neutralValue, color: COLORS.orange },
                                { icon: ThumbsDown, label: "Negative", value: negativeValue, color: COLORS.red },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: aiPhase, x: 0 }}
                                    transition={{ delay: i * 0.15 }}
                                    className="space-y-2"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                                style={{ backgroundColor: `${item.color}15` }}
                                            >
                                                <item.icon size={16} style={{ color: item.color }} />
                                            </div>
                                            <span className="font-medium" style={{ color: COLORS.text }}>{item.label}</span>
                                        </div>
                                        <motion.span
                                            className="text-xl font-bold"
                                            style={{ color: item.color }}
                                            key={item.value}
                                        >
                                            {item.value}%
                                        </motion.span>
                                    </div>
                                    <div
                                        className="h-3 rounded-full overflow-hidden"
                                        style={{ backgroundColor: `${item.color}20` }}
                                    >
                                        <motion.div
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: item.color }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.value}%` }}
                                            transition={{ delay: i * 0.15 + 0.3, duration: 0.8 }}
                                        />
                                    </div>
                                </motion.div>
                            ))}

                            {/* AI insights list */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: aiPhase > 0.7 ? 1 : 0, y: aiPhase > 0.7 ? 0 : 10 }}
                                className="pt-3 border-t"
                                style={{ borderColor: COLORS.secondary }}
                            >
                                <div className="text-xs font-bold uppercase mb-3" style={{ color: COLORS.textMuted }}>
                                    Key Insights
                                </div>
                                {[
                                    "Most positive feedback about work environment",
                                    "Safety measures rated highly across units",
                                    "Training opportunities requested frequently",
                                ].map((insight, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.8 + i * 0.1 }}
                                        className="flex items-start gap-2 py-1.5"
                                    >
                                        <CheckCircle size={14} style={{ color: COLORS.success }} className="mt-0.5 flex-shrink-0" />
                                        <span className="text-sm" style={{ color: COLORS.text }}>{insight}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right: Word Cloud */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: aiPhase, x: 30 - (aiPhase * 30) }}
                        className="w-[380px] rounded-3xl overflow-hidden"
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
                            <Sparkles size={22} className="text-white" />
                            <span className="font-semibold text-white text-lg">Key Themes</span>
                        </div>

                        <div className="p-6">
                            {/* Word cloud visualization */}
                            <div className="relative h-48 flex items-center justify-center">
                                {themes.map((theme, i) => (
                                    <motion.div
                                        key={theme.text}
                                        className="absolute px-3 py-1.5 rounded-lg font-medium whitespace-nowrap"
                                        style={{
                                            backgroundColor: `${COLORS.primary}${Math.round(theme.size * 20)}`,
                                            color: COLORS.text,
                                            fontSize: `${theme.size * 14}px`,
                                            left: `calc(50% + ${theme.x}px)`,
                                            top: `calc(50% + ${theme.y}px)`,
                                            transform: 'translate(-50%, -50%)'
                                        }}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: aiPhase, scale: aiPhase }}
                                        transition={{ delay: theme.delay, type: "spring", stiffness: 200 }}
                                        whileHover={{ scale: 1.1, zIndex: 10 }}
                                    >
                                        {theme.text}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Actionable badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: aiPhase > 0.8 ? 1 : 0, y: aiPhase > 0.8 ? 0 : 10 }}
                                className="mt-4 rounded-xl p-4 text-center"
                                style={{
                                    background: `linear-gradient(135deg, ${COLORS.success}15, ${COLORS.primary}10)`,
                                    border: `2px solid ${COLORS.success}30`
                                }}
                            >
                                <p style={{ color: COLORS.text }}>
                                    Raw input transformed into <br />
                                    <span className="font-bold text-lg" style={{ color: COLORS.success }}>
                                        Clear, Actionable Insights
                                    </span>
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Conclusion Phase */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: conclusionPhase }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ display: conclusionPhase < 0.3 ? 'none' : 'flex' }}
                >
                    {/* Flow icons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: conclusionPhase, y: 20 - (conclusionPhase * 20) }}
                        className="flex items-center gap-4 mb-8"
                    >
                        {[
                            { icon: ClipboardList, label: "Create" },
                            { icon: Users, label: "Target" },
                            { icon: MessageSquare, label: "Invite" },
                            { icon: CheckCircle, label: "Respond" },
                            { icon: BarChart3, label: "Analyze" },
                        ].map((step, i) => (
                            <motion.div
                                key={step.label}
                                className="flex items-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: conclusionPhase, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <motion.div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                        style={{
                                            backgroundColor: COLORS.surface,
                                            border: `2px solid ${COLORS.primary}`,
                                            boxShadow: `0 8px 24px -4px ${COLORS.primary}30`
                                        }}
                                        whileHover={{ scale: 1.1, y: -4 }}
                                    >
                                        <step.icon size={24} style={{ color: COLORS.primary }} />
                                    </motion.div>
                                    <span className="text-xs font-bold uppercase" style={{ color: COLORS.textMuted }}>
                                        {step.label}
                                    </span>
                                </div>
                                {i < 4 && (
                                    <motion.div
                                        className="mx-2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: conclusionPhase }}
                                        transition={{ delay: i * 0.1 + 0.2 }}
                                    >
                                        <ArrowRight size={16} style={{ color: COLORS.secondary }} />
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Main message */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: conclusionPhase, y: 30 - (conclusionPhase * 30) }}
                        className="text-center"
                    >
                        <h2
                            className="text-4xl font-bold mb-4"
                            style={{ color: COLORS.text }}
                        >
                            From Reactive to <span style={{ color: COLORS.success }}>Proactive</span>
                        </h2>
                        <p
                            className="text-lg max-w-xl mx-auto mb-8"
                            style={{ color: COLORS.textMuted }}
                        >
                            Digital surveys help organizations switch from reactive grievance handling
                            to proactive employee engagement
                        </p>

                        {/* Completion badge */}
                        <motion.div
                            className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
                            style={{
                                background: `linear-gradient(135deg, ${COLORS.success}, ${COLORS.primary})`,
                                boxShadow: `0 15px 40px -10px ${COLORS.success}50`
                            }}
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <CheckCircle size={24} className="text-white" />
                            <span className="text-white font-bold text-lg">Continuous Improvement</span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    )
}
