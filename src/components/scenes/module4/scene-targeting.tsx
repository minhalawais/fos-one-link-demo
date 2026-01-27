"use client"

import { motion } from "framer-motion"
import { Globe, Users, Building2, Filter, Check, ChevronDown } from "lucide-react"

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

interface SceneTargetingProps {
    isActive: boolean
    progress: number
}

export const SceneTargeting = ({ isActive, progress }: SceneTargetingProps) => {
    // Scene runs from 17-33s (16 seconds duration)
    const localProgress = progress - 17

    // Phase 1 (0-9s): Multi-language support (17-26s in script)
    // Phase 2 (9-16s): Participant targeting (26-33s in script)
    const languagePhase = Math.min(1, localProgress / 9)
    const targetingPhase = Math.min(1, Math.max(0, (localProgress - 9) / 7))

    // Language selection animation
    const languages = [
        { code: "EN", name: "English", selected: localProgress > 1 },
        { code: "UR", name: "اردو", selected: localProgress > 2.5 },
        { code: "PS", name: "پښتو", selected: localProgress > 4 },
        { code: "AR", name: "العربية", selected: localProgress > 5.5 },
    ]

    // Targeting filters
    const departments = ["Spinning", "Knitting", "Processing", "Denim"]
    const selectedDepts = Math.min(departments.length, Math.floor((targetingPhase * 2) * departments.length))

    const employeeCount = Math.floor(847 * Math.min(1, targetingPhase * 1.5))

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
                    className="absolute top-10 left-16 w-48 h-48 rounded-full"
                    style={{
                        background: `radial-gradient(circle, ${COLORS.primary}25, transparent 70%)`,
                        filter: 'blur(40px)'
                    }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 6, repeat: Infinity }}
                />
            </div>

            {/* Main content - Two panels */}
            <div className="relative z-10 flex gap-8 px-8">
                {/* Left Panel: Language Selection */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: languagePhase, x: -40 + (languagePhase * 40) }}
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
                        <Globe size={22} className="text-white" />
                        <span className="font-semibold text-white text-lg">Multi-Language Support</span>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                        <p className="text-sm" style={{ color: COLORS.textMuted }}>
                            Allow employees to respond in their native language
                        </p>

                        {/* Language chips */}
                        <div className="flex flex-wrap gap-3">
                            {languages.map((lang, i) => (
                                <motion.div
                                    key={lang.code}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                        opacity: Math.min(1, languagePhase * 4 - i * 0.5),
                                        scale: lang.selected ? 1 : 0.9
                                    }}
                                    className={`px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition-all`}
                                    style={{
                                        backgroundColor: lang.selected ? COLORS.primary : 'white',
                                        color: lang.selected ? 'white' : COLORS.text,
                                        border: `2px solid ${lang.selected ? COLORS.primary : COLORS.secondary}`,
                                        boxShadow: lang.selected ? `0 4px 15px -3px ${COLORS.primary}50` : 'none'
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {lang.selected && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 500 }}
                                        >
                                            <Check size={16} />
                                        </motion.div>
                                    )}
                                    <span className="font-bold">{lang.code}</span>
                                    <span className="text-sm">{lang.name}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Preview card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: Math.max(0, languagePhase - 0.5) * 2, y: 20 - (Math.max(0, languagePhase - 0.5) * 40) }}
                            className="rounded-xl p-4 border-2"
                            style={{
                                borderColor: COLORS.secondary,
                                backgroundColor: 'white'
                            }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div
                                    className="w-2 h-2 rounded-full animate-pulse"
                                    style={{ backgroundColor: COLORS.success }}
                                />
                                <span className="text-xs font-bold uppercase" style={{ color: COLORS.primary }}>
                                    Live Preview
                                </span>
                            </div>
                            <div className="text-right font-medium" style={{ color: COLORS.text, direction: 'rtl' }}>
                                صداقت کے ملازمین کا سروے
                            </div>
                            <div className="text-xs text-right mt-1" style={{ color: COLORS.textMuted, direction: 'rtl' }}>
                                براہ مہربانی نوٹ فرمائیں کہ اس فارم میں فراہم کیا گیا آپ کا نام...
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right Panel: Participant Targeting */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: targetingPhase, x: 40 - (targetingPhase * 40) }}
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
                        <Filter size={22} className="text-white" />
                        <span className="font-semibold text-white text-lg">Participant Targeting</span>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                        {/* Department filter */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium" style={{ color: COLORS.text }}>
                                <Building2 size={16} style={{ color: COLORS.primary }} />
                                Department
                            </label>
                            <div
                                className="rounded-xl border-2 p-3"
                                style={{ borderColor: COLORS.secondary, backgroundColor: 'white' }}
                            >
                                <div className="flex flex-wrap gap-2">
                                    {departments.map((dept, i) => (
                                        <motion.div
                                            key={dept}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{
                                                opacity: i < selectedDepts ? 1 : 0.4,
                                                scale: i < selectedDepts ? 1 : 0.95
                                            }}
                                            className="px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
                                            style={{
                                                backgroundColor: i < selectedDepts ? `${COLORS.primary}20` : COLORS.background,
                                                color: i < selectedDepts ? COLORS.primary : COLORS.textMuted,
                                                border: `1px solid ${i < selectedDepts ? COLORS.primary : 'transparent'}`
                                            }}
                                        >
                                            {i < selectedDepts && <Check size={12} />}
                                            {dept}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Unit & Gender row */}
                        <div className="grid grid-cols-2 gap-3">
                            {/* Unit */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-medium" style={{ color: COLORS.text }}>
                                    <Building2 size={14} style={{ color: COLORS.primary }} />
                                    Unit
                                </label>
                                <motion.div
                                    className="rounded-xl border-2 px-3 py-2.5 flex items-center justify-between cursor-pointer"
                                    style={{ borderColor: COLORS.secondary, backgroundColor: 'white' }}
                                    animate={targetingPhase > 0.5 ? { borderColor: COLORS.primary } : {}}
                                >
                                    <span className="text-sm" style={{ color: COLORS.text }}>All Units</span>
                                    <ChevronDown size={16} style={{ color: COLORS.primary }} />
                                </motion.div>
                            </div>

                            {/* Gender */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-medium" style={{ color: COLORS.text }}>
                                    <Users size={14} style={{ color: COLORS.primary }} />
                                    Gender
                                </label>
                                <motion.div
                                    className="rounded-xl border-2 px-3 py-2.5 flex items-center justify-between cursor-pointer"
                                    style={{ borderColor: COLORS.secondary, backgroundColor: 'white' }}
                                    animate={targetingPhase > 0.7 ? { borderColor: COLORS.primary } : {}}
                                >
                                    <span className="text-sm" style={{ color: COLORS.text }}>All</span>
                                    <ChevronDown size={16} style={{ color: COLORS.primary }} />
                                </motion.div>
                            </div>
                        </div>

                        {/* Employee count badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: targetingPhase, y: 10 - (targetingPhase * 10) }}
                            className="rounded-xl p-4 flex items-center justify-between"
                            style={{
                                background: `linear-gradient(135deg, ${COLORS.primary}15, ${COLORS.secondary}20)`,
                                border: `2px solid ${COLORS.primary}30`
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <Users size={20} style={{ color: COLORS.primary }} />
                                <span className="font-medium" style={{ color: COLORS.text }}>Selected Employees</span>
                            </div>
                            <motion.span
                                className="text-2xl font-bold"
                                style={{ color: COLORS.primary }}
                                key={employeeCount}
                            >
                                {employeeCount.toLocaleString()}
                            </motion.span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
