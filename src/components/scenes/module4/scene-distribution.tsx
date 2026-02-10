"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Server, Radio, Users, MessageSquare, Smartphone, Check, Signal, Link, ChevronRight, ArrowLeft } from "lucide-react"
import { useMemo } from "react"

// --- SYSTEM COLORS ---
const COLORS = {
    teal: "#3B82F6",
    darkTeal: "#1E40AF",
    green: "#10B981",
    charcoal: "#17161A",
    white: "#FFFFFF",
    bg: "#F8FAFC",
    vibrantBlue: "#3B82F6",
    cyan: "#06B6D4",
    red: "#EF4444",
}

interface SceneProps {
    isActive: boolean
    progress: number
}

// ==========================================
// SCENE DISTRIBUTION (46s - 63s)
// "FOSSMS Integration & Mobile Access"
// ==========================================

export const SceneDistribution = ({ isActive, progress }: SceneProps) => {
    // Scene starts at 46s
    const localT = Math.max(0, progress - 46)

    // STAGES
    const showServer = localT < 8   // 46s - 54s: Automated Invitations
    const showMobile = localT >= 8  // 54s - 63s: Direct Survey Link

    // SUB-STAGES for Mobile
    const mobileState = localT < 10 ? 'lock' : (localT < 11 ? 'unlocking' : 'sms')

    // Memoized background (performance optimization)
    const gridPattern = useMemo(() => Array(400).fill(0).map((_, i) => (
        <div key={i} className="border-[0.5px] border-black/20" />
    )), [])

    return (
        <div className="w-full h-full font-sans overflow-hidden relative flex items-center justify-center p-8">

            {/* BACKGROUND PATTERN */}
            <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] opacity-[0.03] pointer-events-none">
                {gridPattern}
            </div>

            <AnimatePresence mode="wait">

                {/* --- STAGE 1: SERVER PULSE (46s - 54s) --- */}
                {showServer && (
                    <motion.div
                        key="server"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                        className="flex flex-col items-center justify-center relative z-10"
                    >
                        {/* Central FOSSMS Mascot - Enhanced Hero Section */}
                        <div className="relative mb-6 group flex flex-col items-center">
                            <motion.div
                                animate={{
                                    y: [0, -15, 0],
                                    filter: [
                                        "drop-shadow(0 0 10px rgba(96, 186, 129, 0.2))",
                                        "drop-shadow(0 0 30px rgba(96, 186, 129, 0.4))",
                                        "drop-shadow(0 0 10px rgba(96, 186, 129, 0.2))"
                                    ]
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="relative z-20 flex items-center justify-center"
                            >
                                <img
                                    src="/assets/images/fos_sms_frontshot1.png"
                                    alt="FOSSMS Mascot"
                                    className="w-[210px] h-[200px] object-contain drop-shadow-[0_0_15px_rgba(96,186,129,0.3)] transition-transform duration-700"
                                />

                                {/* Inner Screen Core Glow */}
                                <div className="absolute top-[35%] w-[40%] h-[30%] bg-[#60BA81]/15 blur-[40px] rounded-full animate-pulse mix-blend-screen" />
                            </motion.div>

                            {/* Electronic Signal Waves (Ripple Effect from Antennas) */}
                            {[1, 2, 3].map(i => (
                                <motion.div
                                    key={i}
                                    className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full border-t-4 border-green-500/30"
                                    initial={{ width: 80, height: 25, opacity: 0, scale: 0.8 }}
                                    animate={{
                                        width: [150, 500],
                                        height: [40, 140],
                                        opacity: [0, 0.35, 0],
                                        y: [-50, -220]
                                    }}
                                    transition={{ duration: 3.5, delay: i * 0.8, repeat: Infinity, ease: "easeOut" }}
                                />
                            ))}
                        </div>

                        {/* Title */}
                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-8">
                            <h2 className="text-4xl font-bold text-gray-800 mb-2">FOSSMS Service</h2>
                            <p className="text-gray-500 text-lg">Automated Survey Invitations</p>
                        </motion.div>

                        {/* Broadcast Signals */}
                        <div className="flex gap-12">
                            {[
                                { name: "Ali", delay: 0 },
                                { name: "Abrar", delay: 0.2 },
                                { name: "Waqar", delay: 0.4 },
                                { name: "Zain", delay: 2.5 },
                                { name: "Bilal", delay: 3.0 }
                            ].map((user, i) => {
                                // Dynamic Status Logic
                                // All start pending (hidden or explicit), then sent after their delay + initial stagger
                                // BUT per user request: "After 2 sec change Pending to Sent"
                                // So we treat 'delay' as the threshold for switching status.

                                const isSent = localT > (2 + user.delay) // Global 2s wait + stagger

                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.15 }}
                                        className="flex flex-col items-center gap-3 relative"
                                    >
                                        {/* User Icon */}
                                        <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 z-10 relative">
                                            <Users size={20} />
                                            {/* Status Indicator Dot */}
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{
                                                    scale: 1,
                                                    backgroundColor: isSent ? COLORS.green : COLORS.vibrantBlue
                                                }}
                                                transition={{
                                                    delay: 1 + i * 0.2,
                                                    duration: 0.5
                                                }}
                                                className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center"
                                            >
                                                <AnimatePresence mode="wait">
                                                    {isSent ? (
                                                        <motion.div
                                                            key="check"
                                                            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                                        >
                                                            <Check size={10} className="text-white" strokeWidth={4} />
                                                        </motion.div>
                                                    ) : (
                                                        <motion.div
                                                            key="dot"
                                                            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                                            className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"
                                                        />
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        </div>

                                        {/* Name (Top of Pulse) */}
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.2 }}
                                            className="text-center -mb-2 z-10"
                                        >
                                            <div className="text-sm font-bold text-gray-700">{user.name}</div>
                                            <div className="text-[10px] text-gray-400 leading-none">Employee</div>
                                        </motion.div>

                                        {/* Vertical Assembly */}
                                        <div className="relative flex flex-col items-center">

                                            {/* The Pulse Line */}
                                            <div className="w-0.5 h-[50px] relative rounded-full overflow-hidden bg-gray-200 mt-2">
                                                {/* Pending State (Orange Background) */}
                                                <motion.div
                                                    className="absolute inset-0 bg-orange-200"
                                                    animate={{ opacity: isSent ? 0 : 1 }}
                                                />
                                                {/* Sent State (Teal Fill) */}
                                                <motion.div
                                                    className="absolute bottom-0 w-full bg-teal-500"
                                                    initial={{ height: "0%" }}
                                                    animate={{ height: isSent ? "100%" : "0%" }}
                                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                                />
                                            </div>

                                            {/* Status Text (Bottom of Pulse) */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 + i * 0.2 }}
                                                className="text-center mt-2 min-h-[20px]"
                                            >
                                                <motion.div
                                                    key={isSent ? 'sent' : 'pending'}
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -5 }}
                                                    className={`text-[10px] font-bold uppercase tracking-wider ${isSent ? 'text-blue-600' : 'text-[#3B82F6]'}`}
                                                >
                                                    {isSent ? "SENT" : "PENDING..."}
                                                </motion.div>
                                            </motion.div>

                                            {/* End Dot (Below Status) */}
                                            <motion.div
                                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                transition={{ delay: 1.5 + i * 0.2 }}
                                                className="mt-2 w-3 h-3 rounded-full shadow-lg ring-4 transition-colors duration-500"
                                                style={{
                                                    backgroundColor: isSent ? COLORS.green : COLORS.vibrantBlue,
                                                    boxShadow: `0 0 0 4px ${isSent ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`
                                                }}
                                            />
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>
                )}


                {/* --- STAGE 2: MOBILE SMS (54s - 63s) --- */}
                {showMobile && (
                    <motion.div
                        key="mobile"
                        initial={{ y: 500, opacity: 0, scale: 0.85 }}
                        animate={{ y: 0, opacity: 1, scale: 0.85 }}
                        exit={{ y: -200, opacity: 0, scale: 0.85 }}
                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                        className="relative z-20"
                    >
                        <div className="w-[300px] h-[600px] bg-[#1a1a1a] rounded-[48px] border-[12px] border-[#2c2c2c] shadow-2xl overflow-hidden relative flex flex-col">

                            {/* Dynamic Island */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-b-2xl z-20" />

                            {/* --- SCREEN CONTENT --- */}
                            <div className="flex-1 bg-white relative flex flex-col overflow-hidden rounded-[36px]">

                                {/* Status Bar */}
                                <div className="h-10 flex justify-between items-end px-6 pb-2 text-[10px] font-bold text-gray-800 bg-transparent z-10 relative">
                                    <span>9:41</span>
                                    <div className="flex gap-1.5 items-center">
                                        <Signal size={12} />
                                        <div className="w-5 h-3 bg-gray-800 rounded-[3px]" />
                                    </div>
                                </div>

                                {/* LOCK SCREEN */}
                                <AnimatePresence mode="wait">
                                    {mobileState === 'lock' && (
                                        <motion.div
                                            key="lock"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, scale: 1.1 }}
                                            transition={{ duration: 0.5 }}
                                            className="absolute inset-0 z-10 flex flex-col items-center pt-20"
                                        >
                                            {/* Wallpaper */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-20" />
                                            <div className="absolute inset-0 backdrop-blur-md bg-white/30" />

                                            {/* Time */}
                                            <div className="relative text-6xl font-thin text-gray-800 mb-2 tracking-tighter">9:41</div>
                                            <div className="relative text-sm font-medium text-gray-600 mb-8">Wednesday, January 28</div>

                                            {/* Notification */}
                                            <motion.div
                                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2, type: "spring" }}
                                                className="w-[90%] bg-white/60 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/40 cursor-pointer"
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <div className="flex justify-between items-center mb-2">
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-6 h-6 bg-gray-900 rounded-lg flex items-center justify-center">
                                                            <MessageSquare size={12} className="text-white" fill="white" />
                                                        </div>
                                                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">MESSAGES</span>
                                                    </div>
                                                    <span className="text-[10px] text-gray-500">now</span>
                                                </div>
                                                <div className="text-xs font-bold text-gray-900 mb-0.5">FOS Hotline</div>
                                                <div className="text-xs text-gray-600 leading-snug line-clamp-2">
                                                    Dear Company A Employee, Company A has launched an Organizational Effectiveness & Engagement Survey...
                                                </div>
                                            </motion.div>

                                            <div className="mt-auto mb-6 w-32 h-1 bg-gray-400/50 rounded-full" />
                                        </motion.div>
                                    )}

                                    {/* SMS APP */}
                                    {mobileState === 'sms' && (
                                        <motion.div
                                            key="sms"
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex-1 bg-white flex flex-col pt-2"
                                        >
                                            {/* App Header */}
                                            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3 bg-white/80 backdrop-blur-lg z-10">
                                                <ArrowLeft size={20} className="text-blue-500" />
                                                <div className="flex-1 flex flex-col items-center pr-5">
                                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mb-1">
                                                        <span className="text-[10px] font-bold text-gray-500">FT</span>
                                                    </div>
                                                    <span className="text-xs font-semibold text-gray-900">FOS Team - HRDD</span>
                                                </div>
                                            </div>

                                            {/* Messages */}
                                            <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
                                                <div className="text-center text-[10px] text-gray-400 font-medium mb-4">Text Message • Today 9:41 AM</div>

                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9, originX: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ type: "spring" }}
                                                    className="bg-[#E9E9EB] rounded-2xl rounded-tl-sm p-4 max-w-[95%] shadow-sm text-sm text-gray-900"
                                                >
                                                    <p className="mb-3 leading-relaxed">
                                                        Dear Company A Employee,
                                                        <br /><br />
                                                        Company A has launched an Organizational Effectiveness & Engagement Survey.
                                                        <br /><br />
                                                        Please fill it using FOS Hotline App or this link:
                                                    </p>

                                                    {/* Link Preview */}
                                                    <motion.div
                                                        className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 mb-3 cursor-pointer"
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <div className="h-24 bg-gray-50 flex items-center justify-center relative overflow-hidden group">
                                                            <div className="absolute inset-0 bg-green-50 opacity-50 group-hover:opacity-100 transition-opacity" />
                                                            <div className="relative z-10 flex flex-col items-center gap-2">
                                                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                                                    <Link size={20} />
                                                                </div>
                                                                <span className="font-bold text-green-700 text-xs">FOS Survey Portal</span>
                                                            </div>
                                                        </div>
                                                        <div className="p-3 bg-white">
                                                            <div className="text-xs font-bold text-gray-900 mb-0.5">Start Survey</div>
                                                            <div className="text-[10px] text-gray-500">fruitofsustainability.com</div>
                                                        </div>
                                                    </motion.div>

                                                    <p className="leading-relaxed text-xs text-gray-600">
                                                        Your FOS ID is: <span className="font-bold text-gray-900 select-all">1019549</span> or use your CNIC.
                                                        <br /><br />
                                                        Regards,<br />
                                                        FOS Team - HRDD Division
                                                    </p>
                                                </motion.div>

                                                {/* Start Button Hint */}
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 1.5 }}
                                                    className="flex justify-center mt-6"
                                                >
                                                    <div className="bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 cursor-pointer animate-pulse">
                                                        Tap link to start <ChevronRight size={12} />
                                                    </div>
                                                </motion.div>
                                            </div>

                                            {/* Input Area */}
                                            <div className="p-3 bg-gray-50 border-t border-gray-200">
                                                <div className="h-9 bg-white border border-gray-300 rounded-full px-4 flex items-center text-gray-400 text-xs">
                                                    Text Message
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Reflection Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none rounded-[30px] z-10" />
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    )
}
