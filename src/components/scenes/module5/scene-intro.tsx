"use client"

// This file is a placeholder kept for backwards compatibility with module5-player.tsx
// Module 5 should have its own scene files in a module5 folder

import { motion } from "framer-motion"
import { BarChart3, TrendingUp, Activity } from "lucide-react"

const COLORS = {
    headerStart: "#3d8b40",
    headerEnd: "#e4a83c",
    background: "#F5F7F0",
    cardBg: "#FFFFFF",
    text: "#2D3748",
    textMuted: "#6B7280",
}

interface SceneIntroProps {
    isActive: boolean
    progress: number
}

export const SceneIntro = ({ isActive, progress }: SceneIntroProps) => {
    const phase = Math.min(1, progress / 5)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: COLORS.background }}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: phase }}
                className="text-center space-y-6"
            >
                <div className="flex justify-center gap-4">
                    {[BarChart3, TrendingUp, Activity].map((Icon, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.2 }}
                            className="w-16 h-16 rounded-2xl flex items-center justify-center"
                            style={{
                                background: `linear-gradient(135deg, ${COLORS.headerStart}, ${COLORS.headerEnd})`,
                                boxShadow: `0 10px 30px ${COLORS.headerStart}40`
                            }}
                        >
                            <Icon size={28} className="text-white" />
                        </motion.div>
                    ))}
                </div>
                <h1 className="text-4xl font-bold" style={{ color: COLORS.text }}>
                    Dashboards & Risk Insights
                </h1>
                <p className="text-lg max-w-xl mx-auto" style={{ color: COLORS.textMuted }}>
                    Real-time analytics and comprehensive reporting
                </p>
            </motion.div>
        </motion.div>
    )
}
