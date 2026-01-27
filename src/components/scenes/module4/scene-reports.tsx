"use client"

import { motion } from "framer-motion"
import { BarChart3, PieChart, TrendingUp, Users, Clock, CheckCircle2 } from "lucide-react"

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

interface SceneReportsProps {
    isActive: boolean
    progress: number
}

export const SceneReports = ({ isActive, progress }: SceneReportsProps) => {
    // Scene runs from 75-91s (16 seconds duration)
    const localProgress = progress - 75

    // Phase 1 (0-6s): Real-time reports loading (75-81s in script)
    // Phase 2 (6-16s): Statistics, charts, trends (81-91s in script)
    const loadingPhase = Math.min(1, localProgress / 6)
    const chartsPhase = Math.min(1, Math.max(0, (localProgress - 6) / 10))

    // Response counter animation
    const responseCount = Math.floor(245 + (loadingPhase * 602)) // 245 to 847
    const completionRate = Math.round(loadingPhase * 68) // 0% to 68%

    // Chart data
    const pieData = [
        { label: "Very Satisfied", value: 35, color: COLORS.success },
        { label: "Satisfied", value: 28, color: COLORS.primary },
        { label: "Neutral", value: 22, color: COLORS.secondary },
        { label: "Dissatisfied", value: 15, color: COLORS.orange },
    ]

    const barData = [
        { label: "Spinning", value: 85 },
        { label: "Knitting", value: 72 },
        { label: "Processing", value: 68 },
        { label: "Denim", value: 54 },
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
                    className="absolute top-10 right-20 w-56 h-56 rounded-full"
                    style={{
                        background: `radial-gradient(circle, ${COLORS.primary}20, transparent 70%)`,
                        filter: 'blur(40px)'
                    }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 6, repeat: Infinity }}
                />
            </div>

            {/* Main content */}
            <div className="relative z-10 flex flex-col gap-6 max-w-5xl">
                {/* Header stats */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: loadingPhase, y: -20 + (loadingPhase * 20) }}
                    className="flex gap-4 justify-center"
                >
                    {[
                        { icon: Users, label: "Total Responses", value: responseCount, color: COLORS.primary },
                        { icon: CheckCircle2, label: "Completion Rate", value: `${completionRate}%`, color: COLORS.success },
                        { icon: Clock, label: "Avg. Time", value: "8 min", color: COLORS.orange },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: loadingPhase, scale: 0.9 + (loadingPhase * 0.1) }}
                            transition={{ delay: i * 0.1 }}
                            className="px-6 py-4 rounded-2xl flex items-center gap-4"
                            style={{
                                backgroundColor: COLORS.surface,
                                boxShadow: `0 10px 30px -10px ${stat.color}30`
                            }}
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: `${stat.color}15` }}
                            >
                                <stat.icon size={24} style={{ color: stat.color }} />
                            </div>
                            <div>
                                <motion.div
                                    className="text-2xl font-bold"
                                    style={{ color: stat.color }}
                                    key={stat.value}
                                >
                                    {stat.value}
                                </motion.div>
                                <div className="text-sm" style={{ color: COLORS.textMuted }}>{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Charts row */}
                <div className="flex gap-6">
                    {/* Pie Chart - Response breakdown */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: chartsPhase, x: -30 + (chartsPhase * 30) }}
                        className="flex-1 rounded-3xl overflow-hidden"
                        style={{
                            backgroundColor: COLORS.surface,
                            boxShadow: `0 20px 50px -15px ${COLORS.primary}25`
                        }}
                    >
                        <div
                            className="px-5 py-3 flex items-center gap-2"
                            style={{
                                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`
                            }}
                        >
                            <PieChart size={18} className="text-white" />
                            <span className="font-semibold text-white">Satisfaction Breakdown</span>
                        </div>
                        <div className="p-5 flex items-center gap-6">
                            {/* Pie chart SVG */}
                            <div className="relative w-32 h-32">
                                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                    {pieData.map((slice, i) => {
                                        const total = pieData.reduce((sum, d) => sum + d.value, 0)
                                        const startAngle = pieData.slice(0, i).reduce((sum, d) => sum + (d.value / total) * 360, 0)
                                        const angle = (slice.value / total) * 360
                                        const progress = chartsPhase

                                        // Calculate SVG arc
                                        const r = 40
                                        const cx = 50
                                        const cy = 50
                                        const circumference = 2 * Math.PI * r
                                        const offset = (startAngle / 360) * circumference
                                        const length = (angle / 360) * circumference * progress

                                        return (
                                            <motion.circle
                                                key={slice.label}
                                                cx={cx}
                                                cy={cy}
                                                r={r}
                                                fill="none"
                                                stroke={slice.color}
                                                strokeWidth="20"
                                                strokeDasharray={`${length} ${circumference}`}
                                                strokeDashoffset={-offset}
                                                initial={{ strokeDasharray: `0 ${circumference}` }}
                                                animate={{ strokeDasharray: `${length} ${circumference}` }}
                                                transition={{ delay: i * 0.2, duration: 0.8 }}
                                            />
                                        )
                                    })}
                                </svg>
                            </div>

                            {/* Legend */}
                            <div className="flex-1 space-y-2">
                                {pieData.map((item, i) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: chartsPhase, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-sm"
                                                style={{ backgroundColor: item.color }}
                                            />
                                            <span className="text-sm" style={{ color: COLORS.text }}>{item.label}</span>
                                        </div>
                                        <span className="font-bold" style={{ color: item.color }}>{item.value}%</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Bar Chart - Department responses */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: chartsPhase, x: 30 - (chartsPhase * 30) }}
                        className="flex-1 rounded-3xl overflow-hidden"
                        style={{
                            backgroundColor: COLORS.surface,
                            boxShadow: `0 20px 50px -15px ${COLORS.primary}25`
                        }}
                    >
                        <div
                            className="px-5 py-3 flex items-center gap-2"
                            style={{
                                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`
                            }}
                        >
                            <BarChart3 size={18} className="text-white" />
                            <span className="font-semibold text-white">Response by Department</span>
                        </div>
                        <div className="p-5 space-y-3">
                            {barData.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: chartsPhase }}
                                    transition={{ delay: i * 0.15 }}
                                    className="space-y-1"
                                >
                                    <div className="flex justify-between text-sm">
                                        <span style={{ color: COLORS.text }}>{item.label}</span>
                                        <span className="font-bold" style={{ color: COLORS.primary }}>{item.value}%</span>
                                    </div>
                                    <div
                                        className="h-3 rounded-full overflow-hidden"
                                        style={{ backgroundColor: COLORS.secondary }}
                                    >
                                        <motion.div
                                            className="h-full rounded-full"
                                            style={{
                                                background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.success})`
                                            }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.value * chartsPhase}%` }}
                                            transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Trend line */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: chartsPhase > 0.5 ? 1 : 0, y: chartsPhase > 0.5 ? 0 : 20 }}
                    className="rounded-3xl overflow-hidden"
                    style={{
                        backgroundColor: COLORS.surface,
                        boxShadow: `0 20px 50px -15px ${COLORS.primary}25`
                    }}
                >
                    <div
                        className="px-5 py-3 flex items-center gap-2"
                        style={{
                            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`
                        }}
                    >
                        <TrendingUp size={18} className="text-white" />
                        <span className="font-semibold text-white">Response Trend</span>
                    </div>
                    <div className="p-5">
                        {/* Simplified trend line */}
                        <svg viewBox="0 0 400 80" className="w-full h-20">
                            <defs>
                                <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor={COLORS.primary} />
                                    <stop offset="100%" stopColor={COLORS.success} />
                                </linearGradient>
                                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.3" />
                                    <stop offset="100%" stopColor={COLORS.primary} stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            {/* Area fill */}
                            <motion.path
                                d="M0,70 Q50,60 100,50 T200,35 T300,25 T400,15 L400,80 L0,80 Z"
                                fill="url(#areaGradient)"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: chartsPhase }}
                            />

                            {/* Trend line */}
                            <motion.path
                                d="M0,70 Q50,60 100,50 T200,35 T300,25 T400,15"
                                fill="none"
                                stroke="url(#trendGradient)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: chartsPhase }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />

                            {/* Data points */}
                            {[0, 100, 200, 300, 400].map((x, i) => (
                                <motion.circle
                                    key={x}
                                    cx={x}
                                    cy={[70, 50, 35, 25, 15][i]}
                                    r="5"
                                    fill={COLORS.primary}
                                    stroke="white"
                                    strokeWidth="2"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: chartsPhase }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                />
                            ))}
                        </svg>

                        {/* X-axis labels */}
                        <div className="flex justify-between text-xs mt-2" style={{ color: COLORS.textMuted }}>
                            <span>Week 1</span>
                            <span>Week 2</span>
                            <span>Week 3</span>
                            <span>Week 4</span>
                            <span>Week 5</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
