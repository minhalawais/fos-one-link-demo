"use client"

import { motion } from "framer-motion"
import { Shuffle, Users, Percent, Shield, Check, Fingerprint } from "lucide-react"
import { useState, useEffect } from "react"

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

interface SceneSamplingProps {
    isActive: boolean
    progress: number
}

export const SceneSampling = ({ isActive, progress }: SceneSamplingProps) => {
    // Scene runs from 33-46s (13 seconds duration)
    const localProgress = progress - 33

    const phase1 = Math.min(1, localProgress / 3) // 0-3s: Header and toggle
    const phase2 = Math.min(1, Math.max(0, (localProgress - 2) / 4)) // 2-6s: Slider
    const phase3 = Math.min(1, Math.max(0, (localProgress - 5) / 4)) // 5-9s: Grid selection
    const phase4 = Math.min(1, Math.max(0, (localProgress - 9) / 4)) // 9-13s: Stats

    // Sample percentage animation
    const samplePercent = Math.round(25 + (phase2 * 25)) // 25% to 50%
    const selectedCount = Math.round(847 * (samplePercent / 100))

    // Generate grid of employees (simplified representation)
    const gridSize = 64
    const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set())

    useEffect(() => {
        if (phase3 > 0) {
            const target = Math.floor(gridSize * (samplePercent / 100))
            const newSelected = new Set<number>()

            // Randomly select indices
            const indices = Array.from({ length: gridSize }, (_, i) => i)
            for (let i = indices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [indices[i], indices[j]] = [indices[j], indices[i]]
            }

            for (let i = 0; i < Math.min(target, Math.floor(phase3 * target)); i++) {
                newSelected.add(indices[i])
            }

            setSelectedIndices(newSelected)
        }
    }, [phase3, samplePercent])

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
                    className="absolute bottom-20 right-20 w-56 h-56 rounded-full"
                    style={{
                        background: `radial-gradient(circle, ${COLORS.primary}20, transparent 70%)`,
                        filter: 'blur(40px)'
                    }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
            </div>

            {/* Main content */}
            <div className="relative z-10 flex gap-8">
                {/* Left: Controls */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: phase1, x: -40 + (phase1 * 40) }}
                    className="w-[360px] rounded-3xl overflow-hidden"
                    style={{
                        backgroundColor: COLORS.surface,
                        boxShadow: `0 25px 60px -15px ${COLORS.primary}30`
                    }}
                >
                    {/* Header */}
                    <div
                        className="px-6 py-4 flex items-center gap-3"
                        style={{
                            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`
                        }}
                    >
                        <Shuffle size={22} className="text-white" />
                        <span className="font-semibold text-white text-lg">Random Sampling</span>
                    </div>

                    <div className="p-6 space-y-5">
                        {/* Toggle switch */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: phase1, y: 10 - (phase1 * 10) }}
                            className="flex items-center justify-between"
                        >
                            <div>
                                <div className="font-medium" style={{ color: COLORS.text }}>Enable Random Sampling</div>
                                <div className="text-sm" style={{ color: COLORS.textMuted }}>
                                    Statistically representative selection
                                </div>
                            </div>
                            <motion.div
                                className="w-14 h-8 rounded-full p-1 cursor-pointer"
                                style={{ backgroundColor: phase1 > 0.5 ? COLORS.success : '#ccc' }}
                                animate={{ backgroundColor: phase1 > 0.5 ? COLORS.success : '#ccc' }}
                            >
                                <motion.div
                                    className="w-6 h-6 rounded-full bg-white shadow-md"
                                    animate={{ x: phase1 > 0.5 ? 24 : 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            </motion.div>
                        </motion.div>

                        {/* Sample size slider */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: phase2, y: 10 - (phase2 * 10) }}
                            className="space-y-3"
                        >
                            <div className="flex justify-between items-center">
                                <label className="flex items-center gap-2 text-sm font-medium" style={{ color: COLORS.text }}>
                                    <Percent size={16} style={{ color: COLORS.primary }} />
                                    Sample Size
                                </label>
                                <span
                                    className="text-xl font-bold"
                                    style={{ color: COLORS.primary }}
                                >
                                    {samplePercent}%
                                </span>
                            </div>

                            <div className="relative h-3 rounded-full overflow-hidden" style={{ backgroundColor: COLORS.secondary }}>
                                <motion.div
                                    className="absolute left-0 top-0 h-full rounded-full"
                                    style={{
                                        width: `${samplePercent}%`,
                                        background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.success})`
                                    }}
                                />
                                <motion.div
                                    className="absolute top-1/2 w-5 h-5 rounded-full bg-white shadow-lg -translate-y-1/2 border-2"
                                    style={{
                                        left: `calc(${samplePercent}% - 10px)`,
                                        borderColor: COLORS.primary
                                    }}
                                />
                            </div>

                            <div className="flex justify-between text-xs" style={{ color: COLORS.textMuted }}>
                                <span>10%</span>
                                <span>50%</span>
                                <span>100%</span>
                            </div>
                        </motion.div>

                        {/* ID Type selector */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: phase2 }}
                            className="space-y-2"
                        >
                            <label className="flex items-center gap-2 text-sm font-medium" style={{ color: COLORS.text }}>
                                <Fingerprint size={16} style={{ color: COLORS.primary }} />
                                Sample By
                            </label>
                            <div className="flex gap-2">
                                {["FOS ID", "CNIC"].map((type, i) => (
                                    <motion.div
                                        key={type}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{
                                            opacity: phase2,
                                            scale: i === 0 ? 1 : 0.95,
                                        }}
                                        className="flex-1 px-4 py-3 rounded-xl text-center font-medium cursor-pointer transition-all"
                                        style={{
                                            backgroundColor: i === 0 ? COLORS.primary : 'white',
                                            color: i === 0 ? 'white' : COLORS.text,
                                            border: `2px solid ${i === 0 ? COLORS.primary : COLORS.secondary}`
                                        }}
                                    >
                                        {type}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Confidence indicator */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: phase4, y: 10 - (phase4 * 10) }}
                            className="rounded-xl p-4 flex items-center gap-3"
                            style={{
                                background: `linear-gradient(135deg, ${COLORS.success}15, ${COLORS.success}05)`,
                                border: `2px solid ${COLORS.success}30`
                            }}
                        >
                            <Shield size={24} style={{ color: COLORS.success }} />
                            <div>
                                <div className="font-medium" style={{ color: COLORS.text }}>95% Confidence Level</div>
                                <div className="text-sm" style={{ color: COLORS.textMuted }}>Data integrity maintained</div>
                            </div>
                            <Check size={20} style={{ color: COLORS.success }} className="ml-auto" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right: Visual Grid */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: phase3, x: 40 - (phase3 * 40) }}
                    className="w-[380px] rounded-3xl overflow-hidden"
                    style={{
                        backgroundColor: COLORS.surface,
                        boxShadow: `0 25px 60px -15px ${COLORS.primary}30`
                    }}
                >
                    {/* Header */}
                    <div
                        className="px-6 py-4 flex items-center gap-3"
                        style={{
                            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`
                        }}
                    >
                        <Users size={22} className="text-white" />
                        <span className="font-semibold text-white text-lg">Selection Preview</span>
                    </div>

                    <div className="p-6 space-y-4">
                        {/* Employee grid */}
                        <div className="grid grid-cols-8 gap-1.5">
                            {Array.from({ length: gridSize }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="aspect-square rounded-lg"
                                    initial={{ scale: 0 }}
                                    animate={{
                                        scale: phase3 * 0.5 + 0.5,
                                        backgroundColor: selectedIndices.has(i) ? COLORS.primary : '#ddd'
                                    }}
                                    transition={{
                                        delay: (i % 8) * 0.02 + Math.floor(i / 8) * 0.03,
                                        type: "spring",
                                        stiffness: 400
                                    }}
                                    style={{
                                        boxShadow: selectedIndices.has(i) ? `0 2px 8px ${COLORS.primary}50` : 'none'
                                    }}
                                />
                            ))}
                        </div>

                        {/* Legend */}
                        <div className="flex justify-center gap-6 pt-2">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-4 h-4 rounded"
                                    style={{ backgroundColor: COLORS.primary }}
                                />
                                <span className="text-sm" style={{ color: COLORS.text }}>Selected</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded bg-gray-300" />
                                <span className="text-sm" style={{ color: COLORS.text }}>Not Selected</span>
                            </div>
                        </div>

                        {/* Count summary */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: phase4 }}
                            className="rounded-xl p-4 text-center"
                            style={{
                                background: `linear-gradient(135deg, ${COLORS.primary}10, ${COLORS.secondary}15)`,
                                border: `2px solid ${COLORS.primary}20`
                            }}
                        >
                            <div className="text-4xl font-bold" style={{ color: COLORS.primary }}>
                                {selectedCount}
                            </div>
                            <div className="text-sm font-medium" style={{ color: COLORS.textMuted }}>
                                employees randomly selected
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
