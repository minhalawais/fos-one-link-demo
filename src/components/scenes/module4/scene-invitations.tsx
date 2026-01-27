"use client"

import { motion } from "framer-motion"
import { Send, Smartphone, MessageSquare, Link2, Check, ExternalLink, Bell } from "lucide-react"

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

interface SceneInvitationsProps {
    isActive: boolean
    progress: number
}

export const SceneInvitations = ({ isActive, progress }: SceneInvitationsProps) => {
    // Scene runs from 46-63s (17 seconds duration)
    const localProgress = progress - 46

    // Phase 1 (0-8s): SMS invitations (46-54s in script)
    // Phase 2 (8-17s): Direct survey links (54-63s in script)
    const smsPhase = Math.min(1, localProgress / 8)
    const linkPhase = Math.min(1, Math.max(0, (localProgress - 8) / 9))

    // SMS sending counter
    const sentCount = Math.floor(423 * smsPhase)
    const sentPercent = Math.round(smsPhase * 100)

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
                {/* Left: SMS Panel */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: smsPhase, x: -50 + (smsPhase * 50) }}
                    className="w-[340px]"
                >
                    {/* SMS sending card */}
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
                            <Send size={22} className="text-white" />
                            <span className="font-semibold text-white text-lg">SMS Invitations</span>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* Progress indicator */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium" style={{ color: COLORS.text }}>Sending Progress</span>
                                    <span className="font-bold text-lg" style={{ color: COLORS.primary }}>
                                        {sentPercent}%
                                    </span>
                                </div>
                                <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: COLORS.secondary }}>
                                    <motion.div
                                        className="h-full rounded-full"
                                        style={{
                                            width: `${sentPercent}%`,
                                            background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.success})`
                                        }}
                                        transition={{ type: "spring", stiffness: 50 }}
                                    />
                                </div>
                            </div>

                            {/* Counter */}
                            <div className="flex justify-between items-center py-3 px-4 rounded-xl" style={{ backgroundColor: COLORS.background }}>
                                <div className="flex items-center gap-2">
                                    <MessageSquare size={18} style={{ color: COLORS.primary }} />
                                    <span style={{ color: COLORS.text }}>Messages Sent</span>
                                </div>
                                <motion.span
                                    className="text-xl font-bold"
                                    style={{ color: COLORS.success }}
                                    key={sentCount}
                                >
                                    {sentCount} / 423
                                </motion.span>
                            </div>

                            {/* Success indicators */}
                            {smsPhase > 0.5 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-2"
                                >
                                    {[
                                        { label: "Delivery Rate", value: "98.2%" },
                                        { label: "Via FOS SMS", value: "Active" },
                                    ].map((item, i) => (
                                        <motion.div
                                            key={item.label}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.2 }}
                                            className="flex justify-between items-center py-2 px-3 rounded-lg"
                                            style={{ backgroundColor: `${COLORS.success}10` }}
                                        >
                                            <span className="text-sm" style={{ color: COLORS.text }}>{item.label}</span>
                                            <div className="flex items-center gap-1.5">
                                                <Check size={14} style={{ color: COLORS.success }} />
                                                <span className="font-medium" style={{ color: COLORS.success }}>{item.value}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Center: Phone mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: Math.max(smsPhase * 0.5, linkPhase), y: 30 - (Math.max(smsPhase, linkPhase) * 30) }}
                    className="relative"
                >
                    {/* Phone frame */}
                    <div
                        className="w-[260px] h-[520px] rounded-[40px] p-3"
                        style={{
                            background: `linear-gradient(145deg, #2D3748, #1a202c)`,
                            boxShadow: `0 30px 60px -15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)`
                        }}
                    >
                        {/* Screen */}
                        <div className="w-full h-full rounded-[28px] overflow-hidden bg-white">
                            {/* Status bar */}
                            <div className="h-6 bg-gray-100 flex items-center justify-between px-4 text-[10px] text-gray-500">
                                <span>9:41</span>
                                <div className="flex gap-1">
                                    <div className="w-4 h-2 bg-gray-400 rounded-sm" />
                                </div>
                            </div>

                            {/* SMS notification */}
                            {smsPhase > 0.3 && (
                                <motion.div
                                    initial={{ opacity: 0, y: -50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="m-3 rounded-2xl p-4"
                                    style={{
                                        backgroundColor: COLORS.surface,
                                        boxShadow: `0 4px 20px ${COLORS.primary}20`
                                    }}
                                >
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ backgroundColor: `${COLORS.orange}20` }}
                                        >
                                            <Bell size={18} style={{ color: COLORS.orange }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-sm" style={{ color: COLORS.text }}>FOS Survey</span>
                                                <span className="text-[10px]" style={{ color: COLORS.textMuted }}>now</span>
                                            </div>
                                            <p className="text-xs mt-1 leading-relaxed" style={{ color: COLORS.textMuted }}>
                                                You've been selected to participate in the Employee Wellbeing Survey.
                                                <motion.span
                                                    animate={{ opacity: linkPhase > 0 ? 1 : 0.7 }}
                                                    style={{ color: COLORS.primary }}
                                                    className="font-medium"
                                                >
                                                    {" "}Tap to open →
                                                </motion.span>
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Direct link preview */}
                            {linkPhase > 0.3 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mx-3 mt-4 rounded-2xl overflow-hidden"
                                    style={{
                                        border: `2px solid ${COLORS.primary}`,
                                        boxShadow: `0 8px 30px ${COLORS.primary}20`
                                    }}
                                >
                                    {/* Link header */}
                                    <div
                                        className="px-4 py-2 flex items-center gap-2"
                                        style={{ backgroundColor: COLORS.primary }}
                                    >
                                        <Link2 size={14} className="text-white" />
                                        <span className="text-xs text-white font-medium truncate">
                                            survey.fos.pk/s/EWS-2026
                                        </span>
                                    </div>

                                    {/* Survey preview */}
                                    <div className="p-4 bg-white">
                                        <div className="flex items-center gap-2 mb-3">
                                            <img
                                                src="/fos-logo.png"
                                                alt="FOS"
                                                className="w-8 h-8 rounded-lg"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none'
                                                }}
                                            />
                                            <div
                                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                                style={{ backgroundColor: COLORS.primary }}
                                            >
                                                <span className="text-white text-xs font-bold">FOS</span>
                                            </div>
                                            <span className="font-bold text-sm" style={{ color: COLORS.text }}>
                                                Open Survey
                                            </span>
                                        </div>
                                        <p className="text-[11px] leading-relaxed" style={{ color: COLORS.textMuted }}>
                                            No app installation required. Access directly from browser.
                                        </p>
                                        <motion.div
                                            className="mt-3 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm"
                                            style={{
                                                backgroundColor: COLORS.success,
                                                color: 'white'
                                            }}
                                            animate={{ scale: [1, 1.02, 1] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <ExternalLink size={14} />
                                            Start Survey
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}

                            {/* No app required badge */}
                            {linkPhase > 0.7 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mx-auto mt-4 w-fit px-4 py-2 rounded-full flex items-center gap-2"
                                    style={{
                                        backgroundColor: `${COLORS.success}15`,
                                        border: `1px solid ${COLORS.success}40`
                                    }}
                                >
                                    <Check size={14} style={{ color: COLORS.success }} />
                                    <span className="text-xs font-medium" style={{ color: COLORS.success }}>
                                        No App Required
                                    </span>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Floating phone glow */}
                    <div
                        className="absolute -inset-4 rounded-[48px] -z-10"
                        style={{
                            background: `radial-gradient(circle at center, ${COLORS.primary}20, transparent 70%)`,
                            filter: 'blur(20px)'
                        }}
                    />
                </motion.div>

                {/* Right: Access stats */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: linkPhase, x: 50 - (linkPhase * 50) }}
                    className="w-[300px]"
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
                            <Link2 size={22} className="text-white" />
                            <span className="font-semibold text-white text-lg">Easy Access</span>
                        </div>

                        <div className="p-6 space-y-4">
                            {[
                                { icon: Smartphone, label: "Browser Access", desc: "Direct link opens in any browser" },
                                { icon: Check, label: "No Download", desc: "Works without mobile app" },
                                { icon: ExternalLink, label: "One-Click Entry", desc: "Tap SMS link to participate" },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: linkPhase, x: 20 - (linkPhase * 20) }}
                                    transition={{ delay: i * 0.15 }}
                                    className="flex items-start gap-3 p-3 rounded-xl"
                                    style={{ backgroundColor: COLORS.background }}
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: `${COLORS.primary}20` }}
                                    >
                                        <item.icon size={18} style={{ color: COLORS.primary }} />
                                    </div>
                                    <div>
                                        <div className="font-medium" style={{ color: COLORS.text }}>{item.label}</div>
                                        <div className="text-sm" style={{ color: COLORS.textMuted }}>{item.desc}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}
