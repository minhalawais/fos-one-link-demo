"use client"

import { motion } from "framer-motion"
import { FileText, Calendar, Type, AlignLeft, Check } from "lucide-react"

// Color Scheme
const COLORS = {
    primary: "#89A8B2",
    secondary: "#B3C8CF",
    background: "#E5E1DA",
    surface: "#F1F0E8",
    text: "#2D3748",
    textMuted: "#5A6A7A",
    success: "#60BA81",
}

interface SceneCreationProps {
    isActive: boolean
    progress: number
}

export const SceneCreation = ({ isActive, progress }: SceneCreationProps) => {
    // Scene runs from 9-17s (8 seconds duration)
    const localProgress = progress - 9

    // Animation phases
    const phase1 = Math.min(1, localProgress / 2) // 0-2s: Form container
    const phase2 = Math.min(1, Math.max(0, (localProgress - 1.5) / 2)) // 1.5-3.5s: Title field
    const phase3 = Math.min(1, Math.max(0, (localProgress - 3) / 2)) // 3-5s: Description field
    const phase4 = Math.min(1, Math.max(0, (localProgress - 5) / 2)) // 5-7s: Date picker
    const phase5 = Math.min(1, Math.max(0, (localProgress - 6.5) / 1.5)) // 6.5-8s: Submit button

    // Typing animation for title
    const titleText = "Employee Wellbeing Survey"
    const typedTitleLength = Math.floor(phase2 * titleText.length)
    const displayedTitle = titleText.substring(0, typedTitleLength)

    // Typing animation for description
    const descText = "Quarterly satisfaction assessment for all departments..."
    const typedDescLength = Math.floor(phase3 * descText.length)
    const displayedDesc = descText.substring(0, typedDescLength)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: COLORS.background }}
        >
            {/* Background pattern */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, ${COLORS.primary} 1px, transparent 0)`,
                        backgroundSize: '32px 32px'
                    }}
                />

                {/* Floating orbs */}
                <motion.div
                    className="absolute top-16 right-24 w-40 h-40 rounded-full"
                    style={{
                        background: `radial-gradient(circle, ${COLORS.primary}25, transparent 70%)`,
                        filter: 'blur(30px)'
                    }}
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center gap-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: phase1, y: -20 + (phase1 * 20) }}
                    className="text-center space-y-2"
                >
                    <h2
                        className="text-3xl font-bold"
                        style={{ color: COLORS.text }}
                    >
                        Create New Survey
                    </h2>
                    <p style={{ color: COLORS.textMuted }}>
                        Define title, description, and visibility period
                    </p>
                </motion.div>

                {/* Survey creation form card */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{
                        opacity: phase1,
                        y: 40 - (phase1 * 40),
                        scale: 0.95 + (phase1 * 0.05)
                    }}
                    className="w-[500px] rounded-3xl overflow-hidden"
                    style={{
                        backgroundColor: COLORS.surface,
                        boxShadow: `0 25px 60px -15px ${COLORS.primary}30, 0 0 0 1px ${COLORS.secondary}40`
                    }}
                >
                    {/* Form header */}
                    <div
                        className="px-6 py-4 flex items-center gap-3"
                        style={{
                            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`
                        }}
                    >
                        <FileText size={22} className="text-white" />
                        <span className="font-semibold text-white text-lg">Survey Details</span>
                    </div>

                    {/* Form content */}
                    <div className="p-6 space-y-5">
                        {/* Title field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: phase2, x: -20 + (phase2 * 20) }}
                            className="space-y-2"
                        >
                            <label className="flex items-center gap-2 text-sm font-medium" style={{ color: COLORS.text }}>
                                <Type size={16} style={{ color: COLORS.primary }} />
                                Survey Title
                            </label>
                            <div
                                className="relative rounded-xl border-2 overflow-hidden"
                                style={{
                                    borderColor: phase2 > 0.1 ? COLORS.primary : COLORS.secondary,
                                    backgroundColor: 'white',
                                    transition: 'border-color 0.3s'
                                }}
                            >
                                <div className="px-4 py-3 min-h-[48px] flex items-center">
                                    <span style={{ color: COLORS.text }} className="font-medium">
                                        {displayedTitle}
                                    </span>
                                    {phase2 > 0 && phase2 < 1 && (
                                        <motion.span
                                            className="w-0.5 h-5 ml-0.5"
                                            style={{ backgroundColor: COLORS.primary }}
                                            animate={{ opacity: [1, 0, 1] }}
                                            transition={{ duration: 0.5, repeat: Infinity }}
                                        />
                                    )}
                                </div>
                                {phase2 >= 1 && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                    >
                                        <Check size={18} style={{ color: COLORS.success }} />
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>

                        {/* Description field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: phase3, x: -20 + (phase3 * 20) }}
                            className="space-y-2"
                        >
                            <label className="flex items-center gap-2 text-sm font-medium" style={{ color: COLORS.text }}>
                                <AlignLeft size={16} style={{ color: COLORS.primary }} />
                                Description
                            </label>
                            <div
                                className="relative rounded-xl border-2 overflow-hidden"
                                style={{
                                    borderColor: phase3 > 0.1 && phase3 < 1 ? COLORS.primary : COLORS.secondary,
                                    backgroundColor: 'white'
                                }}
                            >
                                <div className="px-4 py-3 min-h-[80px]">
                                    <span style={{ color: COLORS.text }}>
                                        {displayedDesc}
                                    </span>
                                    {phase3 > 0 && phase3 < 1 && (
                                        <motion.span
                                            className="w-0.5 h-4 ml-0.5 inline-block"
                                            style={{ backgroundColor: COLORS.primary }}
                                            animate={{ opacity: [1, 0, 1] }}
                                            transition={{ duration: 0.5, repeat: Infinity }}
                                        />
                                    )}
                                </div>
                                {phase3 >= 1 && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute right-3 top-4"
                                    >
                                        <Check size={18} style={{ color: COLORS.success }} />
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>

                        {/* Visibility Period */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: phase4, x: -20 + (phase4 * 20) }}
                            className="space-y-2"
                        >
                            <label className="flex items-center gap-2 text-sm font-medium" style={{ color: COLORS.text }}>
                                <Calendar size={16} style={{ color: COLORS.primary }} />
                                Visibility Period
                            </label>
                            <div className="flex gap-3">
                                {/* Start Date */}
                                <motion.div
                                    className="flex-1 rounded-xl border-2 px-4 py-3 flex items-center gap-2"
                                    style={{
                                        borderColor: COLORS.secondary,
                                        backgroundColor: 'white'
                                    }}
                                    animate={phase4 > 0.5 ? { borderColor: COLORS.success } : {}}
                                >
                                    <Calendar size={16} style={{ color: COLORS.primary }} />
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: phase4 }}
                                        style={{ color: COLORS.text }}
                                        className="font-medium"
                                    >
                                        Jan 15, 2026
                                    </motion.span>
                                </motion.div>

                                <div className="flex items-center" style={{ color: COLORS.textMuted }}>to</div>

                                {/* End Date */}
                                <motion.div
                                    className="flex-1 rounded-xl border-2 px-4 py-3 flex items-center gap-2"
                                    style={{
                                        borderColor: COLORS.secondary,
                                        backgroundColor: 'white'
                                    }}
                                    animate={phase4 >= 1 ? { borderColor: COLORS.success } : {}}
                                >
                                    <Calendar size={16} style={{ color: COLORS.primary }} />
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: Math.max(0, (phase4 - 0.5) * 2) }}
                                        style={{ color: COLORS.text }}
                                        className="font-medium"
                                    >
                                        Feb 15, 2026
                                    </motion.span>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: phase5, y: 10 - (phase5 * 10) }}
                            className="pt-2"
                        >
                            <motion.button
                                className="w-full py-4 rounded-xl font-bold text-white text-lg flex items-center justify-center gap-2"
                                style={{
                                    background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                                    boxShadow: `0 10px 30px -5px ${COLORS.primary}50`
                                }}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                animate={phase5 >= 1 ? {
                                    boxShadow: [`0 10px 30px -5px ${COLORS.primary}50`, `0 15px 40px -5px ${COLORS.success}60`, `0 10px 30px -5px ${COLORS.primary}50`]
                                } : {}}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <Check size={20} />
                                Create Survey
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
