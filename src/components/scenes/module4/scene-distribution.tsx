"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Server, Radio, Users, MessageSquare, Smartphone, Check, Signal, Link } from "lucide-react"
import { useMemo } from "react"

// --- SYSTEM COLORS ---
const COLORS = {
    teal: "#0f9690",
    darkTeal: "#284952",
    green: "#60BA81",
    charcoal: "#17161A",
    white: "#FFFFFF",
    bg: "#F5F5F7",
    orange: "#FB923C",
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
        <div className="w-full h-full font-sans overflow-hidden relative flex items-center justify-center p-8" style={{ backgroundColor: COLORS.bg }}>

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
                        {/* Central Server Icon */}
                        <div className="relative mb-12">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1], boxShadow: ["0 0 0px rgba(15, 150, 144, 0)", "0 0 50px rgba(15, 150, 144, 0.5)", "0 0 0px rgba(15, 150, 144, 0)"] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center relative z-20 border border-t-2 border-b-8 border-gray-100"
                            >
                                <Server size={64} style={{ color: COLORS.teal }} />
                            </motion.div>

                            {/* Orbital Rings */}
                            {[1, 2, 3].map(i => (
                                <motion.div
                                    key={i}
                                    className="absolute inset-0 rounded-full border-2 border-dashed border-teal-500/20"
                                    initial={{ scale: 1.5, opacity: 0 }}
                                    animate={{ scale: 3 + i, opacity: [0, 0.5, 0], rotate: 360 }}
                                    transition={{ duration: 4, delay: i, repeat: Infinity, ease: "linear" }}
                                    style={{ left: '50%', top: '50%', marginLeft: '-4rem', marginTop: '-4rem', width: '8rem', height: '8rem' }}
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
                                                    backgroundColor: isSent ? COLORS.green : COLORS.orange
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
                                                    className={`text-[10px] font-bold uppercase tracking-wider ${isSent ? 'text-teal-600' : 'text-orange-500'}`}
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
                                                    backgroundColor: isSent ? COLORS.green : COLORS.orange,
                                                    boxShadow: `0 0 0 4px ${isSent ? 'rgba(96, 186, 129, 0.2)' : 'rgba(251, 146, 60, 0.2)'}`
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
                        <div className="w-[300px] h-[580px] bg-[#1a1a1a] rounded-[48px] border-[12px] border-[#2c2c2c] shadow-2xl overflow-hidden relative flex flex-col">

                            {/* Dynamic Island */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-b-2xl z-20" />

                            {/* --- SCREEN CONTENT --- */}
                            <div className="flex-1 bg-white relative flex flex-col overflow-hidden">

                                {/* Status Bar */}
                                <div className="h-10 flex justify-between items-end px-6 pb-2 text-[10px] font-bold text-gray-800 bg-transparent z-10 relative">
                                    <span>24 Jan</span>
                                    <div className="flex gap-1.5 items-center">
                                        <Signal size={12} />
                                        <div className="w-5 h-3 bg-gray-800 rounded-[3px]" />
                                    </div>
                                </div>

                                {/* LOCK SCREEN */}
                                <AnimatePresence>
                                    {mobileState === 'lock' && (
                                        <motion.div
                                            key="lock"
                                            exit={{ y: -600, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: "easeInOut" }}
                                            className="absolute inset-0 z-10 bg-cover bg-center flex flex-col items-center pt-20"
                                            style={{ backgroundImage: "linear-gradient(to bottom, #d1d5db, #9ca3af)" }}
                                        >
                                            <div className="text-6xl font-thin text-white mb-2 mix-blend-overlay">09:41</div>
                                            <div className="text-sm font-medium text-white/90 mix-blend-overlay mb-8">Tuesday, January 24</div>

                                            {/* Notification */}
                                            <motion.div
                                                initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
                                                className="w-[90%] bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg"
                                            >
                                                <div className="flex justify-between items-center mb-2">
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                                                            <MessageSquare size={12} className="text-white" fill="white" />
                                                        </div>
                                                        <span className="text-[10px] font-bold text-gray-600 uppercase">MESSAGES</span>
                                                    </div>
                                                    <span className="text-[10px] text-gray-500">now</span>
                                                </div>
                                                <div className="text-xs font-bold text-gray-900 mb-0.5">FOS Survey</div>
                                                <div className="text-xs text-gray-600 leading-snug">
                                                    You have been invited to participate in the Employee Wellbeing Survey...
                                                </div>
                                            </motion.div>

                                            <div className="mt-auto mb-8 w-32 h-1 bg-white/50 rounded-full" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* SMS APP */}
                                <motion.div className="flex-1 bg-white flex flex-col pt-12">
                                    {/* App Header */}
                                    <div className="h-14 border-b border-gray-100 flex items-center px-4 gap-3 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-xs">FS</div>
                                        <div className="flex-1">
                                            <div className="font-bold text-sm text-gray-900">FOS Survey</div>
                                            <div className="text-[10px] text-gray-400">To: You</div>
                                        </div>
                                    </div>

                                    {/* Messages */}
                                    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                                        <div className="text-center text-[10px] text-gray-400 font-medium my-4">Today 9:41 AM</div>

                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                                            className="bg-gray-100 rounded-2xl rounded-tl-sm p-4 max-w-[85%] self-start text-sm text-gray-800 leading-relaxed shadow-sm"
                                        >
                                            <p className="mb-3">Dear Employee, please complete the <span className="font-bold">Wellbeing Survey Q1</span>. Your feedback is valuable.</p>
                                            <div className="bg-white rounded-xl p-3 border border-gray-200 flex items-center gap-3">
                                                <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600">
                                                    <Link size={20} />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-xs text-teal-700">fruitofsustainability.com</div>
                                                    <div className="text-[10px] text-gray-400">Tap to start survey</div>
                                                </div>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 2, type: 'spring' }}
                                            className="self-center mt-4"
                                        >
                                            <div className="bg-teal-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg cursor-pointer">
                                                Start Survey &rarr;
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Input Placeholder */}
                                    <div className="h-16 border-t border-gray-100 p-3 flex items-center gap-3 bg-gray-50">
                                        <div className="w-8 h-8 rounded-full bg-gray-200" />
                                        <div className="flex-1 h-10 bg-white border border-gray-200 rounded-full" />
                                    </div>
                                </motion.div>
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
