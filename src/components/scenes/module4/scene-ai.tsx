"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Brain, Sparkles, ThumbsUp, Meh, ThumbsDown, CheckCircle, ArrowRight, Zap, MessageSquare, BarChart3, FileText, TrendingUp } from "lucide-react"

// --- ENHANCED AI COLOR PALETTE (Light Theme) ---
const COLORS = {
    // Background and Surface
    bg: "#FFFFFF",
    surface: "#F8FAFC",

    // Accents (Teal/Purple for AI feel but on light)
    aiPrimary: "#0F9690",    // Teal
    aiSecondary: "#8B5CF6",  // Purple
    aiAccent: "#06B6D4",     // Cyan

    // Sentiment
    positive: "#059669",
    neutral: "#D97706",
    negative: "#DC2626",

    // Neural network
    node: "#CBD5E1",        // Light gray nodes
    nodeActive: "#0F9690",  // Teal active
    line: "#E2E8F0",        // Very light lines

    // Text
    textMain: "#1E293B",
    textMuted: "#64748B",
    white: "#FFFFFF"
}

interface SceneAIProps {
    isActive: boolean
    progress: number
}

// Sample employee feedback for animation
const SAMPLE_FEEDBACK = [
    { text: "محفوظ ماحول ہے", sentiment: "positive" },
    { text: "ٹریننگ کی ضرورت ہے", sentiment: "neutral" },
    { text: "Good management", sentiment: "positive" },
    { text: "Need better equipment", sentiment: "negative" },
    { text: "صفائی بہتر ہے", sentiment: "positive" },
]

// Neural network nodes configuration
const NEURAL_NODES = [
    { x: 10, y: 20, size: 6 },
    { x: 25, y: 45, size: 8 },
    { x: 40, y: 15, size: 5 },
    { x: 55, y: 55, size: 7 },
    { x: 70, y: 25, size: 6 },
    { x: 85, y: 50, size: 8 },
    { x: 15, y: 70, size: 5 },
    { x: 45, y: 80, size: 6 },
    { x: 75, y: 75, size: 7 },
    { x: 90, y: 30, size: 5 },
    { x: 30, y: 60, size: 4 },
    { x: 60, y: 40, size: 5 },
]

export const SceneAI = ({ isActive, progress }: SceneAIProps) => {
    const localProgress = progress - 91

    // Phase timing
    // Phase 1 (0-14s): AI sentiment analysis with neural processing
    // Phase 2 (14-24s): Conclusion - transformation
    const aiPhase = Math.min(1, localProgress / 14)
    const conclusionPhase = Math.min(1, Math.max(0, (localProgress - 14) / 10))
    const showConclusion = localProgress > 14

    // Animated sentiment values
    const positiveValue = Math.round(62 * aiPhase)
    const neutralValue = Math.round(28 * aiPhase)
    const negativeValue = Math.round(10 * aiPhase)

    // Current feedback being processed (cycles through)
    const currentFeedbackIndex = Math.floor((localProgress * 0.8) % SAMPLE_FEEDBACK.length)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center overflow-hidden relative"
            style={{ backgroundColor: COLORS.bg }}
        >
            {/* ===== NEURAL NETWORK BACKGROUND (Reverted to original style but Light) ===== */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Animated gradient orbs (Subtler for light mode) */}
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full"
                    style={{
                        background: `radial-gradient(circle, ${COLORS.aiSecondary}15, transparent 70%)`,
                        top: '10%',
                        left: '20%',
                        filter: 'blur(80px)'
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full"
                    style={{
                        background: `radial-gradient(circle, ${COLORS.aiPrimary}15, transparent 70%)`,
                        bottom: '10%',
                        right: '10%',
                        filter: 'blur(60px)'
                    }}
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -30, 0],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />

                {/* Neural Connections */}
                <svg className="absolute inset-0 w-full h-full">
                    {NEURAL_NODES.map((node, i) => (
                        NEURAL_NODES.slice(i + 1).map((target, j) => {
                            const dist = Math.hypot(node.x - target.x, node.y - target.y)
                            if (dist < 35) {
                                return (
                                    <motion.line
                                        key={`${i}-${j}`}
                                        x1={`${node.x}%`}
                                        y1={`${node.y}%`}
                                        x2={`${target.x}%`}
                                        y2={`${target.y}%`}
                                        stroke={COLORS.line}
                                        strokeWidth={1.5}
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{
                                            pathLength: [0, 1, 1],
                                            opacity: [0.1, 0.4, 0.1]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            delay: Math.random() * 5
                                        }}
                                    />
                                )
                            }
                            return null
                        })
                    ))}

                    {/* Nodes */}
                    {NEURAL_NODES.map((node, i) => (
                        <motion.circle
                            key={i}
                            cx={`${node.x}%`}
                            cy={`${node.y}%`}
                            r={node.size}
                            fill={COLORS.bg}
                            stroke={Math.random() > 0.5 ? COLORS.aiPrimary : COLORS.node}
                            strokeWidth={2}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: 1,
                                stroke: [COLORS.node, COLORS.aiPrimary, COLORS.node]
                            }}
                            transition={{
                                scale: { duration: 3 + Math.random(), repeat: Infinity },
                                stroke: { duration: 4 + Math.random(), repeat: Infinity },
                                delay: i * 0.1
                            }}
                        />
                    ))}
                </svg>
            </div>

            {/* ===== MAIN CONTENT ===== */}
            <div className="relative z-10 w-full max-w-6xl px-8 h-full flex flex-col justify-center">

                {!showConclusion ? (
                    <div className="grid grid-cols-12 gap-8 items-center h-full max-h-[600px]">

                        {/* Section 1: AI Processing Visualization */}
                        <div className="col-span-4 flex flex-col items-center">
                            <motion.div
                                className="relative w-48 h-48 mb-8"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            >
                                {/* Outer Rings */}
                                <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-200" />
                                <motion.div
                                    className="absolute inset-0 rounded-full border-t-2 border-r-2 border-teal-500"
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                />

                                {/* Central Brain */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center border border-teal-100 z-10">
                                        <Brain size={64} className="text-teal-600" />
                                    </div>
                                    {/* Pulse Effect */}
                                    <motion.div
                                        className="absolute w-32 h-32 bg-teal-100 rounded-full -z-10"
                                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </div>
                            </motion.div>

                            {/* Processing Text */}
                            <motion.div
                                className="bg-white/80 backdrop-blur px-6 py-3 rounded-full border border-teal-100 shadow-sm text-center"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                            >
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <Sparkles size={16} className="text-teal-500" />
                                    <span className="font-bold text-gray-800">AI Analysis Active</span>
                                </div>
                                <div className="text-xs text-gray-500">Processing employee feedback nodes...</div>
                            </motion.div>
                        </div>

                        {/* Section 2: Live Feedback Stream */}
                        <div className="col-span-4 h-full flex flex-col justify-center">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <MessageSquare size={18} className="text-teal-600" />
                                Incoming Responses
                            </h3>
                            <div className="space-y-3 relative">
                                <AnimatePresence mode="popLayout">
                                    {SAMPLE_FEEDBACK.map((fb, i) => {
                                        const isCurrent = i === currentFeedbackIndex;
                                        return (
                                            <motion.div
                                                key={i}
                                                className={`p-4 rounded-xl border transition-all duration-300 ${isCurrent
                                                        ? "bg-white border-teal-400 shadow-md scale-105 z-10"
                                                        : "bg-gray-50 border-gray-100 opacity-60 scale-95"
                                                    }`}
                                                animate={{
                                                    y: isCurrent ? 0 : 0,
                                                    opacity: isCurrent ? 1 : 0.4
                                                }}
                                            >
                                                <p className="text-gray-800 font-medium text-right" style={{ direction: 'rtl' }}>
                                                    {fb.text}
                                                </p>
                                                {isCurrent && (
                                                    <motion.div
                                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                        className="mt-2 flex justify-between items-center"
                                                    >
                                                        <span className="text-xs text-gray-400">Determining sentiment...</span>
                                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase
                                                            ${fb.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                                                                fb.sentiment === 'negative' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}
                                                        >
                                                            {fb.sentiment}
                                                        </span>
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        )
                                    })}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Section 3: Sentiment Results */}
                        <div className="col-span-4 flex flex-col justify-center gap-6">
                            <StatsCard
                                icon={ThumbsUp}
                                label="Positive"
                                value={positiveValue}
                                color={COLORS.positive}
                                bg="bg-green-50"
                                border="border-green-100"
                            />
                            <StatsCard
                                icon={Meh}
                                label="Neutral"
                                value={neutralValue}
                                color={COLORS.neutral}
                                bg="bg-orange-50"
                                border="border-orange-100"
                            />
                            <StatsCard
                                icon={ThumbsDown}
                                label="Negative"
                                value={negativeValue}
                                color={COLORS.negative}
                                bg="bg-red-50"
                                border="border-red-100"
                            />
                        </div>
                    </div>
                ) : (
                    /* ===== CONCLUSION TRANSFORM ===== */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto"
                    >
                        <motion.div
                            className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-6"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                        >
                            <CheckCircle size={40} className="text-teal-600" />
                        </motion.div>

                        <h2 className="text-4xl font-black text-gray-800 mb-6">
                            From <span className="text-teal-600">Compliance</span> to Impact
                        </h2>

                        <p className="text-xl text-gray-500 mb-12 max-w-2xl">
                            FOS transforms routine audits into a continuous improvement engine driven by real employee data.
                        </p>

                        <div className="grid grid-cols-3 gap-6 w-full">
                            {[
                                { title: "Transparent", icon: FileText },
                                { title: "Efficient", icon: Zap },
                                { title: "Actionable", icon: TrendingUp },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:border-teal-200 transition-colors"
                                >
                                    <item.icon size={32} className="mx-auto mb-3 text-teal-600" />
                                    <h3 className="font-bold text-gray-800">{item.title}</h3>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    )
}

const StatsCard = ({ icon: Icon, label, value, color, bg, border }: any) => (
    <motion.div
        className={`bg-white p-5 rounded-2xl shadow-sm border ${border} relative overflow-hidden`}
        whileHover={{ scale: 1.02 }}
    >
        <div className="flex items-center gap-4 relative z-10">
            <div className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center`}>
                <Icon size={24} style={{ color }} />
            </div>
            <div className="flex-1">
                <div className="text-sm font-medium text-gray-500">{label}</div>
                <div className="text-3xl font-bold text-gray-800">{value}%</div>
            </div>
        </div>
        {/* Progress Fill */}
        <motion.div
            className={`absolute bottom-0 left-0 h-1 ${bg.replace('-50', '-500')} opacity-20`}
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1 }}
        />
    </motion.div>
)
