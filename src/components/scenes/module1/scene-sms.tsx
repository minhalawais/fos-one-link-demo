"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    MessageSquare,
    Wifi,
    Battery,
    Signal,
    CheckCircle2,
    Globe,
    Users,
    ChevronRight,
    SignalHigh,
    Key,
    Link as LinkIcon,
    ShieldCheck,
    Smartphone as SmartphoneIcon,
    Monitor,
    User,
    MessageSquareMore
} from "lucide-react"

// --- THEME CONSTANTS ---
const THEME = {
    primary: "#284952",    // Deep Teal
    secondary: "#60BA81",  // Fresh Green
    accent: "#F5A83C",     // Warm Orange
    text: "#17161A",       // Charcoal
    textSecondary: "#767676", // Medium Gray
    bg: "#F5F5F7",         // Light Gray
    white: "#FFFFFF",      // Pure White
}

// Apple-style Easing
const EASE_IOS = [0.32, 0.72, 0, 1]

// --- MOCK DATA ---
// Company ID = 15
// CNIC: 34603-1123341-2 -> Last 5 "341-2" -> Digits "3412" -> FOS: 153412
const MOCK_DATA = [
    { id: "12987", name: "Ali Khan", role: "Production", avatar: "AK", cnic: "34603-1123341-2", fosId: "152987" },
    { id: "475002", name: "Sara Ahmed", role: "Quality", avatar: "SA", cnic: "34603-5567782-3", fosId: "155002" },
    { id: "78523", name: "Usman Zafar", role: "Supervisor", avatar: "UZ", cnic: "34603-9987763-4", fosId: "158523" },
    { id: "31649", name: "Fatima Bibi", role: "HR", avatar: "FB", cnic: "34603-4432214-5", fosId: "151649" },
    { id: "90124", name: "Hassan Raza", role: "Logistics", avatar: "HR", cnic: "34603-8876651-6", fosId: "150124" },
]

// Phase 3 delivery visualization intentionally focuses on 4 recipients.
const SMS_RECIPIENTS = MOCK_DATA.slice(0, 4)

// Avatar selection helper: use female avatar for known female names
const avatarFor = (name: string) => {
    const n = name.toLowerCase()
    const femaleNames = ["sara", "fatima", "fatimah", "aisha", "zubia"]
    if (femaleNames.some(fn => n.includes(fn))) return "/assets/avatars/female_worker_avatar.png"
    return "/assets/avatars/worker_avatar.png"
}

// --- UTILITY COMPONENTS ---

const Avatar = ({ initials }: { initials: string }) => (
    <div
        className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white shadow-sm ring-2 ring-white shrink-0"
        style={{
            background: `linear-gradient(135deg, ${THEME.secondary}, ${THEME.primary})`
        }}
    >
        {initials}
    </div>
)

const GlassCard = ({ children, className = "", title, subtitle, logoSrc, isActive = true, layoutId, initial, exit }: any) => (
    <motion.div
        layoutId={layoutId}
        initial={initial || { opacity: 0, scale: 0.95 }}
        exit={exit}
        animate={{
            opacity: isActive ? 1 : 0,
            scale: isActive ? 1 : 0.95,
            filter: isActive ? "blur(0px)" : "blur(10px)",
        }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
        className={`relative overflow-visible rounded-3xl border shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] backdrop-blur-xl bg-white/80 flex flex-col ${className}`}
    >
        {/* Header (Compacted) */}
        <div className="relative px-5 py-3 border-b border-gray-100 flex flex-col items-center gap-1 bg-gradient-to-b from-white to-gray-50/50 flex-shrink-0 rounded-t-3xl">
            <div className="absolute top-4 left-4 flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
            </div>

            <div className="relative h-14 w-full flex items-center justify-center mt-1">
                {/* Circular Logo Container */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center p-1.5 overflow-hidden">
                    <img src={logoSrc} alt={title} className="w-full h-full object-contain" />
                </div>
            </div>

            <div className="flex flex-col items-center">
                <div className="text-xs font-bold tracking-tight text-[#284952]">
                    {title}
                </div>
                {subtitle && (
                    <div className="text-[9px] font-medium text-slate-500">
                        {subtitle}
                    </div>
                )}
            </div>
        </div>

        {/* Content (Compacted) */}
        <div className="p-4 relative z-10 flex-1 overflow-visible">
            {children}
        </div>
    </motion.div>
)

const FOSIDGenerator = ({ text, Trigger, isLinked, className = "" }: any) => {
    const [display, setDisplay] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const chars = "0123456789"

    useEffect(() => {
        if (!Trigger) {
            setDisplay("")
            setIsGenerating(false)
            return
        }

        setIsGenerating(true)
        let iter = 0
        const interval = setInterval(() => {
            setDisplay(text.split("").map((_: string, index: number) => {
                if (index < iter) return text[index]
                return chars[Math.floor(Math.random() * chars.length)]
            }).join("")
            )

            if (iter >= text.length) {
                clearInterval(interval)
                setIsGenerating(false)
            }
            iter += 1 / 3 // Slightly faster lock
        }, 40)
        return () => clearInterval(interval)
    }, [Trigger, text])

    if (!Trigger && !display) return null

    return (
        <motion.span
            className={`
                ${className} transition-all duration-300
                ${isLinked ? "text-[#60BA81] bg-green-100/80 px-1 rounded shadow-sm ring-1 ring-green-200/50 scale-110 font-black" : ""}
                ${isGenerating ? "text-green-500 brightness-110" : ""}
            `}
        >
            {display || text}
        </motion.span>
    )
}


const IdentityRow = ({ data, showId, showLink, showSend, dimmed = false, focus = false }: any) => {

    const companyId = "15"
    const highlightPart = data.cnic.slice(-5)
    const prefix = data.cnic.slice(0, -5)
    const fosIdSuffix = highlightPart.replace("-", "")

    return (
        <motion.div
            className={`
                flex items-center gap-2 p-2 rounded-xl border relative bg-white mb-1 group transition-all duration-500
                ${showLink ? "border-green-200 bg-green-50/20 shadow-sm" : "border-slate-100"}
                ${dimmed ? "opacity-45 blur-[0.2px]" : "opacity-100"}
                ${focus ? "ring-1 ring-green-300/70 shadow-[0_8px_20px_-12px_rgba(96,186,129,0.7)]" : ""}
            `}
        >
            <Avatar initials={data.avatar} />

            {/* Name */}
            <div className="flex-shrink-0 w-24">
                <h4 className="text-[10px] font-bold truncate transition-colors" style={{ color: showLink ? THEME.primary : THEME.text }}>
                    {data.name}
                </h4>
                <span className="text-[8px] font-mono text-slate-400 block truncate">{data.role}</span>
            </div>

            {/* CNIC Column */}
            <div className="flex-1 flex flex-col justify-center px-3 border-l border-slate-100 relative">
                <span className="text-[8px] uppercase font-bold text-slate-400">CNIC Identity</span>
                <div className="flex items-center text-[10px] font-mono relative z-10 whitespace-nowrap">
                    <span className="text-slate-500 shrink-0">{prefix}</span>
                    <span className={`transition-all duration-500 mx-0.5 ${showLink ? "text-[#60BA81] bg-green-100/80 px-1 rounded shadow-sm ring-1 ring-green-200/50 scale-110 font-black" : "text-slate-500 font-bold"}`}>
                        {highlightPart}
                    </span>

                    {showLink && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-green-100 rounded-full ml-1 p-0.5 shrink-0"
                        >
                            <ShieldCheck size={8} className="text-green-600" />
                        </motion.div>
                    )}
                </div>

                {/* Connection Bridge */}
                <AnimatePresence>
                    {showLink && (
                        <div className="absolute top-[68%] left-[95%] w-[50px] h-[20px] pointer-events-none z-20 overflow-visible" style={{ transform: 'translateY(-50%)' }}>
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 50 20">
                                <defs>
                                    <linearGradient id={`line-grad-${data.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#60BA81" stopOpacity="0.2" />
                                        <stop offset="50%" stopColor="#a7f3d0" stopOpacity="1" />
                                        <stop offset="100%" stopColor="#60BA81" stopOpacity="0.2" />
                                    </linearGradient>
                                    <filter id={`line-glow-${data.id}`} x="-20%" y="-80%" width="140%" height="260%">
                                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>

                                {/* Layer 1: Soft wide glow track */}
                                <motion.line
                                    x1="0" y1="10" x2="50" y2="10"
                                    stroke="#60BA81"
                                    strokeWidth="6"
                                    strokeOpacity="0.06"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.4 }}
                                />

                                {/* Layer 2: Primary line with gradient */}
                                <motion.line
                                    x1="0" y1="10" x2="50" y2="10"
                                    stroke={`url(#line-grad-${data.id})`}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    filter={`url(#line-glow-${data.id})`}
                                />

                                {/* Layer 3: Animated dash overlay */}
                                <line
                                    x1="0" y1="10" x2="50" y2="10"
                                    stroke="#60BA81"
                                    strokeWidth="0.5"
                                    strokeOpacity="0.4"
                                    strokeDasharray="2 3"
                                    strokeLinecap="round"
                                >
                                    <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="1s" repeatCount="indefinite" />
                                </line>

                                {/* Particle 1: Glowing dot */}
                                <circle r="2" fill="#a7f3d0">
                                    <animateMotion dur="1.6s" repeatCount="indefinite" path="M 0,10 L 50,10" />
                                    <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
                                </circle>

                                {/* Particle 2: Trailing smaller dot */}
                                <circle r="1.2" fill="#60BA81" opacity="0.6">
                                    <animateMotion dur="1.6s" repeatCount="indefinite" begin="0.5s" path="M 0,10 L 50,10" />
                                </circle>

                                {/* Endpoint anchors */}
                                <circle cx="0" cy="10" r="2" fill="#60BA81" opacity="0.5" />
                                <circle cx="50" cy="10" r="2" fill="#60BA81" opacity="0.5" />
                                <motion.circle
                                    cx="0" cy="10" r="1" fill="#a7f3d0"
                                    animate={{ opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <motion.circle
                                    cx="50" cy="10" r="1" fill="#a7f3d0"
                                    animate={{ opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                                />
                            </svg>
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* FOS ID Column */}
            <div className={`w-36 flex flex-col items-end justify-center gap-1 pl-2 relative transition-all duration-300 ${showLink ? "border-transparent" : "border-l border-slate-100"}`}>
                <motion.span
                    animate={showLink ? { color: THEME.primary, scale: 1.05, opacity: 1 } : { color: "#94a3b8", scale: 1, opacity: 0.6 }}
                    className="text-[8px] uppercase font-bold tracking-tight mb-0 pointer-events-none whitespace-nowrap"
                >
                    FOS ID
                </motion.span>
                <div
                    className={`
                        flex items-center gap-0.5 bg-slate-50 border px-1.5 py-1 rounded-md min-w-[75px] max-w-[75px] justify-center transition-all duration-500 relative overflow-hidden z-10
                        ${showLink ? "border-green-300 bg-green-50/50 shadow-sm" : "border-slate-100"}
                    `}
                >
                    <span className={`text-[10px] font-mono font-bold transition-colors ${showLink ? "text-slate-500/80" : "text-slate-400"}`}>{companyId}</span>
                    <FOSIDGenerator text={fosIdSuffix} Trigger={showId} isLinked={showLink} className="text-[10px] font-mono" />

                    {/* Subtle Scanlight effect */}
                    {showLink && (
                        <motion.div
                            initial={{ left: "-100%" }}
                            animate={{ left: "100%" }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                        />
                    )}
                </div>
            </div>

            {/* Sending Animation Particle */}
            <AnimatePresence>
                {showSend && (
                    <motion.div
                        initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        animate={{
                            opacity: [1, 1, 0],
                            x: 400, // Fly off correct to phone
                            y: 100,
                            scale: 0.5
                        }}
                        transition={{ duration: 0.8, ease: "easeIn" }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 pointer-events-none"
                    >
                        <div className="bg-green-500 text-white text-[7px] font-bold px-1.5 py-0.5 rounded shadow-lg flex items-center gap-1 ring-1 ring-white">
                            <Key size={8} /> {data.fosId}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// --- MOBILE COMPONENTS ---

const StatusBar = () => (
    <div className="w-full h-6 px-4 flex items-center justify-between text-[10px] font-medium text-gray-800">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
            <Signal size={10} />
            <Wifi size={10} />
            <Battery size={10} />
        </div>
    </div>
)

const SMSBubble = ({ message, isReceived = true, delay = 0 }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay, duration: 0.4, ease: EASE_IOS }}
        className={`max-w-[85%] p-3 rounded-2xl mb-2 relative ${isReceived
            ? "bg-[#E9E9EB] text-black rounded-tl-sm self-start"
            : "bg-[#60BA81] text-white rounded-tr-sm self-end"
            }`}
    >
        <div className="text-[11px] leading-relaxed whitespace-pre-wrap">
            {message}
        </div>
    </motion.div>
)

// --- NEW ENHANCEMENT COMPONENTS ---

const IDGenerationVisual = ({ active, sceneTime, employee }: { active: boolean, sceneTime: number, employee: typeof MOCK_DATA[0] }) => {
    const progress = Math.max(0, Math.min(1, (sceneTime - 1) / 6.6))
    const companyId = "15"
    const sourceId = employee.id
    const lastFour = sourceId.slice(-4)
    const revealCount = Math.floor(progress * lastFour.length)
    const suffix = `${lastFour.slice(0, revealCount)}${"•".repeat(Math.max(0, lastFour.length - revealCount))}`
    const generated = `${companyId}${lastFour}`

    const stepA = progress >= 0.15
    const stepB = progress >= 0.45
    const stepC = progress >= 0.72
    const stepD = progress >= 0.92

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
            <div className="absolute inset-0">
                <motion.div
                    animate={{ opacity: [0.05, 0.12, 0.05], scale: [0.95, 1, 0.95] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full bg-green-300/20 blur-3xl"
                />
            </div>

            <div className="relative w-[300px] rounded-2xl border border-slate-200/90 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)] overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-[#284952]/10 to-green-500/10">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#284952] flex items-center justify-center">
                            <Key size={13} className="text-white" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-[0.12em] text-[#284952]">Generating Unique FOS ID</div>
                            <div className="text-[9px] text-slate-500">Focused walkthrough for one employee</div>
                        </div>
                    </div>
                </div>

                <div className="px-4 pt-3 pb-2">
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg p-2">
                        <Avatar initials={employee.avatar} />
                        <div className="min-w-0">
                            <div className="text-[10px] font-bold text-slate-700 truncate">{employee.name}</div>
                            <div className="text-[8px] font-mono text-slate-400 truncate">{employee.role}</div>
                        </div>
                    </div>
                </div>

                <div className="px-4 pb-4 space-y-2">
                    <div className={`rounded-lg border px-3 py-2 transition-all duration-500 ${stepA ? "border-green-300 bg-green-50/70" : "border-slate-200 bg-white"}`}>
                        <div className="text-[8px] uppercase font-bold tracking-wide text-slate-400">Raw Company ID</div>
                        <div className="text-[12px] font-mono font-bold text-slate-700 mt-0.5">{sourceId}</div>
                    </div>

                    <div className="flex items-center justify-center h-4">
                        <motion.div
                            animate={{ height: stepB ? 16 : 0, opacity: stepB ? 1 : 0.2 }}
                            transition={{ duration: 0.35 }}
                            className="w-[1px] bg-gradient-to-b from-green-400 to-green-200"
                        />
                    </div>

                    <div className={`rounded-lg border px-3 py-2 transition-all duration-500 ${stepB ? "border-green-300 bg-green-50/70" : "border-slate-200 bg-white"}`}>
                        <div className="text-[8px] uppercase font-bold tracking-wide text-slate-400">Extract Last 4 Digits</div>
                        <div className="text-[12px] font-mono font-bold mt-0.5">
                            <span className="text-slate-400">{sourceId.slice(0, -4)}</span>
                            <span className="text-green-600 bg-green-100/80 px-1 rounded ml-1">{lastFour}</span>
                        </div>
                    </div>

                    <div className="relative rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 overflow-hidden">
                        <motion.div
                            initial={{ left: "-40%" }}
                            animate={{ left: stepC ? "100%" : "-40%" }}
                            transition={{ duration: 1.4, repeat: stepC ? Infinity : 0, ease: "linear" }}
                            className="absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-12"
                        />
                        <div className="text-[8px] uppercase font-bold tracking-wide text-slate-400">Compose FOS ID</div>
                        <div className="mt-1 flex items-center gap-1 text-[13px] font-mono font-black">
                            <span className="text-slate-500">{companyId}</span>
                            <span className="text-slate-400">+</span>
                            <span className={`${stepC ? "text-green-600" : "text-slate-400"}`}>{suffix}</span>
                        </div>
                    </div>

                    <motion.div
                        animate={{ opacity: stepD ? [0.7, 1, 0.7] : 0.5, scale: stepD ? [1, 1.02, 1] : 1 }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className={`rounded-lg border px-3 py-2 ${stepD ? "border-green-400 bg-green-100/80 shadow-[0_0_0_1px_rgba(96,186,129,0.35)]" : "border-slate-200 bg-white"}`}
                    >
                        <div className="text-[8px] uppercase font-bold tracking-wide text-slate-400">Final FOS ID</div>
                        <div className={`text-[14px] font-mono font-black mt-0.5 ${stepD ? "text-[#284952]" : "text-slate-500"}`}>{generated}</div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

const MappingNexus = ({ active }: { active: boolean }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
            opacity: active ? 1 : 0,
            scale: active ? 1 : 0.9,
        }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
        <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Energy Field */}
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute w-80 h-80 rounded-full bg-green-400/5 blur-3xl"
            />

            {/* Spinning Technical Rings */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-slate-300/20 rounded-full"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-6 border border-dashed border-teal-500/10 rounded-full"
            />

            {/* Connection Visuals */}
            <div className="relative z-10 p-5 bg-white/30 backdrop-blur-xl rounded-full border border-white/40 shadow-2xl ring-4 ring-green-500/5">
                <LinkIcon size={28} className="text-[#284952]/60" />
            </div>

            {/* Inbound/Outbound Data Pulses */}
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <motion.div
                    key={i}
                    style={{ rotate: deg }}
                    className="absolute inset-0"
                >
                    <motion.div
                        animate={{
                            x: [120, 0],
                            opacity: [0, 1, 0],
                            scale: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: "easeInOut"
                        }}
                        className="absolute top-1/2 left-1/2 w-4 h-[1px] bg-gradient-to-r from-transparent via-green-400 to-white"
                    />
                </motion.div>
            ))}
        </div>
    </motion.div>
)


// --- CNIC → FOS ID TRANSFORMATION PIPELINE ---
const PipelineStep = ({ label, value, isActive, isComplete, delay, highlight }: {
    label: string, value: string, isActive: boolean, isComplete: boolean, delay: number, highlight?: string
}) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
            opacity: isActive ? 1 : 0.3,
            x: isActive ? 0 : -10,
        }}
        transition={{ duration: 0.4, delay }}
        className="relative"
    >
        <div className={`flex items-center gap-2 px-2.5 py-2 rounded-xl border transition-all duration-500 ${isComplete
            ? "border-green-300 bg-green-50/60 shadow-sm"
            : isActive
                ? "border-slate-200 bg-white/80 shadow-sm"
                : "border-transparent bg-white/30"
            }`}>
            {/* Step indicator */}
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0 transition-all duration-500 ${isComplete
                ? "bg-green-500 text-white shadow-sm"
                : isActive
                    ? "bg-slate-200 text-slate-500"
                    : "bg-slate-100 text-slate-300"
                }`}>
                {isComplete ? "✓" : ""}
            </div>

            <div className="flex-1 min-w-0">
                <div className="text-[7px] uppercase font-bold text-slate-400 tracking-wide">{label}</div>
                <div className="text-[10px] font-mono font-bold mt-0.5 whitespace-nowrap">
                    {highlight ? (
                        <span>
                            <span className="text-slate-400">{value.replace(highlight, "")}</span>
                            <span className="text-green-600 bg-green-100/80 px-1 rounded">{highlight}</span>
                        </span>
                    ) : (
                        <span className={isComplete ? "text-green-700" : "text-slate-700"}>{value}</span>
                    )}
                </div>
            </div>
        </div>

        {/* Connector line */}
        {label !== "FOS ID" && (
            <div className="flex justify-center py-1">
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: isComplete ? 16 : 0 }}
                    transition={{ duration: 0.3, delay: delay + 0.2 }}
                    className="w-[1px] bg-gradient-to-b from-green-400 to-green-200"
                />
            </div>
        )}
    </motion.div>
)

const CNICTransformationPipeline = ({ sceneTime, startIdGen, startMapping }: {
    sceneTime: number, startIdGen: boolean, startMapping: boolean
}) => {
    // Determine which employee is currently being processed
    const maxPipelineEmps = startMapping ? MOCK_DATA.length : 1 // Act 1 focuses on one employee for clarity
    const currentEmpIndex = startMapping
        ? Math.min(MOCK_DATA.length - 1, Math.floor((sceneTime - 8) / 3))
        : 0

    const emp = MOCK_DATA[Math.max(0, currentEmpIndex)]
    const empId = emp.id
    const lastFour = empId.slice(-4) // e.g. "2987" from "12987"
    const companyId = "15"
    const fosId = companyId + lastFour // e.g. "152987"

    // Pipeline step timing (relative to each employee cycle)
    const cycleDuration = startMapping ? 3 : 6.6
    const cycleTime = startMapping
        ? (sceneTime - 8) % cycleDuration
        : Math.max(0, Math.min(cycleDuration, sceneTime - 1))

    const step1Active = cycleTime >= 0
    const step1Complete = cycleTime >= (startMapping ? 0.5 : 1.1)
    const step2Active = cycleTime >= (startMapping ? 0.5 : 1.1)
    const step2Complete = cycleTime >= (startMapping ? 1.0 : 2.3)
    const step3Active = cycleTime >= (startMapping ? 1.0 : 2.3)
    const step3Complete = cycleTime >= (startMapping ? 1.4 : 3.5)
    const step4Active = cycleTime >= (startMapping ? 1.4 : 3.5)
    const step4Complete = cycleTime >= (startMapping ? 1.8 : 4.9)
    const step5Active = cycleTime >= (startMapping ? 1.8 : 4.9)
    const step5Complete = cycleTime >= (startMapping ? 2.1 : 6.1)

    const isVisible = startIdGen && !startMapping ? true : (startMapping && sceneTime < 24)

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="cnic-pipeline"
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60, filter: "blur(8px)" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute left-[30px] top-[30px] w-48 z-30"
                >
                    {/* Glass card container */}
                    <div className="relative rounded-2xl border border-slate-200/80 bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.08)] overflow-hidden">
                        {/* Header */}
                        <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-[#284952]/5 to-green-500/5">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-[#284952] flex items-center justify-center">
                                    <Key size={12} className="text-white" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-[#284952] uppercase tracking-wider">ID Generation</div>
                                    <div className="text-[8px] text-slate-400">CNIC → FOS ID Pipeline</div>
                                </div>
                            </div>
                        </div>

                        {/* Current Employee Badge */}
                        <div className="px-4 pt-3 pb-2">
                            <motion.div
                                key={emp.id}
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100"
                            >
                                <Avatar initials={emp.avatar} />
                                <div>
                                    <div className="text-[11px] font-bold text-slate-700">{emp.name}</div>
                                    <div className="text-[9px] text-slate-400 font-mono">{emp.role}</div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Pipeline Steps */}
                        <div className="px-4 pb-4 pt-1">
                            <PipelineStep
                                label="Raw Company ID"
                                value={emp.id}
                                isActive={step1Active}
                                isComplete={step1Complete}
                                delay={0}
                            />
                            <PipelineStep
                                label="Extract Last 4"
                                value={empId}
                                highlight={lastFour}
                                isActive={step2Active}
                                isComplete={step2Complete}
                                delay={0.05}
                            />
                            <PipelineStep
                                label="Isolate Digits"
                                value={lastFour}
                                isActive={step3Active}
                                isComplete={step3Complete}
                                delay={0.1}
                            />
                            <PipelineStep
                                label="FOS Assigned Company ID"
                                value={`${companyId} + ${lastFour}`}
                                isActive={step4Active}
                                isComplete={step4Complete}
                                delay={0.15}
                            />
                            <PipelineStep
                                label="FOS ID"
                                value={fosId}
                                isActive={step5Active}
                                isComplete={step5Complete}
                                delay={0.2}
                            />
                        </div>

                        {/* Progress footer */}
                        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                            <span className="text-[9px] font-bold text-slate-400">Processing</span>
                            <div className="flex items-center gap-1.5">
                                {MOCK_DATA.slice(0, maxPipelineEmps).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            backgroundColor: i < currentEmpIndex
                                                ? "#60BA81"
                                                : i === currentEmpIndex
                                                    ? "#284952"
                                                    : "#e2e8f0",
                                            scale: i === currentEmpIndex ? 1.3 : 1
                                        }}
                                        className="w-2 h-2 rounded-full"
                                        transition={{ duration: 0.3 }}
                                    />
                                ))}
                                <span className="text-[9px] font-mono font-bold text-slate-500 ml-1">
                                    {Math.min(currentEmpIndex + 1, maxPipelineEmps)}/{maxPipelineEmps}
                                </span>
                            </div>
                        </div>
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    )
}

const UnifiedGateway = ({ active, isBroadcasting, isCentered }: { active: boolean, isBroadcasting: boolean, isCentered: boolean }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: active ? 1 : 0,
                scale: active ? (isCentered ? 1.1 : 0.8) : 0.8,
            }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col items-center justify-center relative z-40"
        >
            {/* --- PREMIUM VISUAL LAYERS --- */}

            {/* 1. Orbiting Data Ring (Always visible when active) */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-40 h-40 border border-dashed border-green-200/20 rounded-full"
            />

            {/* 2. Signal Waves (Broadcasting Mode) */}
            {isBroadcasting && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {[...Array(4)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0.8, opacity: 0.8 }}
                            animate={{ scale: 4, opacity: 0 }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
                            className="absolute w-56 h-56 rounded-full border-2 border-green-400/10"
                        />
                    ))}
                    {/* Glowing Core Aura */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute w-60 h-60 rounded-full bg-green-400/5 blur-3xl"
                    />
                </div>
            )}

            <div className="relative group">
                <div
                    className={`relative w-32 h-32 flex items-center justify-center transition-all duration-1000
                        ${isBroadcasting ? "transform scale-110" : ""}
                    `}
                >
                    {/* --- HOLOGRAPHIC CONNECTION NEXUS --- */}

                    {/* A. Central Core (The "Brain") */}
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{
                            scale: isBroadcasting ? [1, 1.1, 1] : 1,
                            boxShadow: isBroadcasting
                                ? "0 0 30px rgba(96, 186, 129, 0.6), inset 0 0 20px rgba(96, 186, 129, 0.4)"
                                : "0 0 10px rgba(203, 213, 225, 0.3)"
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className={`w-16 h-16 rounded-full flex items-center justify-center relative z-20 backdrop-blur-sm border
                            ${isBroadcasting ? "bg-green-500/10 border-green-400/50" : "bg-slate-200/10 border-slate-300/30"}
                        `}
                    >
                        <MessageSquareMore size={24} className={isBroadcasting ? "text-green-400" : "text-slate-400"} />

                        {/* Core pulse ring */}
                        {isBroadcasting && (
                            <motion.div
                                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="absolute inset-0 rounded-full border border-green-400/30"
                            />
                        )}
                    </motion.div>


                    {/* Outer Ring (Slow Reverse Spin) */}
                    <motion.div
                        animate={{ rotateY: 45, rotateZ: -360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className={`absolute w-36 h-36 rounded-full border-2 box-border pointer-events-none z-10
                            ${isBroadcasting ? "border-teal-400/20" : "border-slate-300/10"}
                        `}
                        style={{ borderLeftColor: 'transparent', borderRightColor: 'transparent' }}
                    />

                    {/* C. Floating Data Nodes (Particles) */}
                    {isBroadcasting && (
                        <div className="absolute inset-0 pointer-events-none">
                            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 0, y: 0 }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        x: Math.cos(deg * Math.PI / 180) * 80,
                                        y: Math.sin(deg * Math.PI / 180) * 80,
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: "easeOut" }}
                                    className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_5px_#4ade80]"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Labels */}
            <div className="mt-4 text-center">
                <h3 className="text-xs font-black text-[#284952] tracking-tight uppercase">
                    FOS SMS Gateway
                </h3>
                <div className="flex items-center justify-center gap-1.5 mt-1">
                    <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className={`w-2 h-2 rounded-full ${isBroadcasting ? "bg-green-500 shadow-[0_0_8px_#22c55e]" : "bg-slate-300"}`}
                    />
                    <span className="text-[10px] text-slate-500 font-mono font-bold tracking-[0.2em]">
                        {isBroadcasting ? "SYSTEM: ACTIVE" : "SYSTEM: STANDBY"}
                    </span>
                </div>
            </div>
        </motion.div>
    )
}

const MobileFrame = ({ message }: { message: string }) => (
    <div className="w-[120px] h-[240px] bg-[#1a1a1a] rounded-[28px] p-[3px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] border border-[#333] relative ring-2 ring-black/20 transform-gpu">
        <div className="absolute inset-0 rounded-[28px] border border-white/10 pointer-events-none z-10" />
        <div className="w-full h-full bg-black rounded-[25px] overflow-hidden relative">
            {/* Wallpaper Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a4a] via-[#0d2b35] to-[#0a1f28]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Dynamic Island */}
            <div className="absolute top-[5px] inset-x-0 mx-auto w-[42px] h-[13px] bg-black rounded-[8px] shadow-lg z-50" />

            {/* Time Display */}
            <div className="absolute top-[22px] w-full text-center">
                <h1 className="text-lg font-thin text-white tracking-tighter drop-shadow-lg leading-none">09:41</h1>
                <p className="text-white/60 text-[5px] font-medium mt-0.5">Wednesday, December 3</p>
            </div>

            {/* SMS Notification Banner */}
            <motion.div
                initial={{ y: -20, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
                className="absolute top-[58px] left-1.5 right-1.5 bg-white/80 backdrop-blur-xl p-1.5 rounded-xl shadow-xl border border-white/40"
            >
                <div className="flex justify-between items-start mb-0.5">
                    <div className="flex items-center gap-1">
                        <div className="w-3.5 h-3.5 rounded bg-[#284952] flex items-center justify-center">
                            <MessageSquare size={7} className="text-white" />
                        </div>
                        <span className="text-[5px] font-bold uppercase text-gray-600 tracking-wide">MESSAGES</span>
                    </div>
                    <span className="text-[4px] text-gray-500">now</span>
                </div>
                <p className="text-[6px] font-bold text-[#17161A] leading-tight">FOS Alert</p>
                <p className="text-[5px] text-gray-700 mt-0.5 leading-snug whitespace-pre-wrap">{message}</p>
            </motion.div>

            {/* Home Indicator */}
            <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[32px] h-[3px] bg-white/70 rounded-full" />
        </div>
    </div>
)

// --- FLOATING MESSAGE VISUALIZATION (Two-Act Flow) ---

// Act 1: Data chip (employee row pill) flies from Platform card → Gateway
const FloatingDataChip = ({ emp, index, sceneTime }: {
    emp: typeof MOCK_DATA[0], index: number, sceneTime: number
}) => {
    const launchTime = 24.2 + index * 0.5
    const isLaunched = sceneTime > launchTime
    const isAbsorbed = sceneTime > (launchTime + 1.2)

    if (!isLaunched) return null

    // Vertical offset: distribute chips along Y axis matching their row in the card
    // Card is at left (~x:-350 from center), gateway is at center
    const yOffsets = [-90, -30, 30, 90]

    return (
        <AnimatePresence>
            {!isAbsorbed && (
                <motion.div
                    key={`chip-${emp.id}`}
                    initial={{
                        x: -180,
                        y: yOffsets[index],
                        opacity: 1,
                        scale: 1,
                    }}
                    animate={{
                        x: 0,
                        y: 0,
                        opacity: [1, 1, 0.6, 0],
                        scale: [1, 0.95, 0.7, 0.3],
                    }}
                    transition={{
                        duration: 1.2,
                        ease: [0.4, 0, 0.2, 1],
                        times: [0, 0.3, 0.7, 1],
                    }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
                >
                    {/* The data chip pill */}
                    <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-green-200 whitespace-nowrap">
                        <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold text-white shrink-0"
                            style={{ background: `linear-gradient(135deg, ${THEME.secondary}, ${THEME.primary})` }}
                        >
                            {emp.avatar}
                        </div>
                        <span className="text-[9px] font-bold text-[#284952]">{emp.name}</span>
                        <span className="text-[8px] font-mono font-bold text-[#60BA81] bg-green-50 px-1.5 py-0.5 rounded border border-green-100">
                            {emp.fosId}
                        </span>
                    </div>

                    {/* Trailing glow */}
                    <motion.div
                        animate={{ opacity: [0.4, 0], scale: [1, 2] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-green-400/20 blur-md -z-10"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// Act 2: SMS bubble flies from Gateway → Employee phone
const FloatingSMSBubble = ({ emp, index, sceneTime }: {
    emp: typeof MOCK_DATA[0], index: number, sceneTime: number
}) => {
    const absorptionTime = 24.2 + index * 0.5 + 1.2 // After chip is absorbed
    const launchTime = absorptionTime + 0.3 // Small delay after absorption
    const isLaunched = sceneTime > launchTime
    const hasArrived = sceneTime > (launchTime + 1.5)

    if (!isLaunched || hasArrived) return null

    // Target positions: phones are in a 2x2 grid at the right side
    const row = Math.floor(index / 2)
    const col = index % 2
    const targetX = 280 + col * 80  // Offset from center to right
    const targetY = row === 0 ? -90 : 70

    return (
        <motion.div
            key={`sms-${emp.id}`}
            initial={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 0.6,
            }}
            animate={{
                x: targetX,
                y: targetY,
                opacity: [1, 1, 0.8, 0],
                scale: [0.6, 0.85, 0.75, 0.5],
            }}
            transition={{
                duration: 1.5,
                ease: [0.25, 0.46, 0.45, 0.94],
                times: [0, 0.3, 0.7, 1],
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
        >
            {/* iOS-style SMS bubble */}
            <div className="bg-[#60BA81] text-white px-3 py-2 rounded-2xl rounded-tl-sm shadow-lg max-w-[160px] relative">
                <div className="text-[8px] font-bold mb-0.5 opacity-90 flex items-center gap-1">
                    <MessageSquare size={8} />
                    FOS SMS
                </div>
                <div className="text-[7px] leading-tight opacity-95">
                    FOS ID: <span className="font-bold">{emp.fosId}</span>
                    {"\n"}Verified ✓
                </div>
                {/* Bubble tail */}
                <div className="absolute -left-1 top-0 w-2 h-2 bg-[#60BA81] transform rotate-45" />
            </div>

            {/* Motion trail */}
            <motion.div
                animate={{ opacity: [0.3, 0], scaleX: [1, 2.5] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-3 bg-green-400/30 rounded-full blur-sm -z-10"
            />
        </motion.div>
    )
}

// Gateway absorption pulse effect
const GatewayAbsorptionPulse = ({ index, sceneTime }: { index: number, sceneTime: number }) => {
    const absorptionTime = 24.2 + index * 0.5 + 1.2
    const isPulsing = sceneTime > absorptionTime && sceneTime < (absorptionTime + 0.8)

    if (!isPulsing) return null

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-green-400/40 pointer-events-none z-35"
        />
    )
}

const SMSFlowVisualization = ({ active, sceneTime }: { active: boolean, sceneTime: number }) => {
    if (!active) return null

    return (
        <div className="absolute inset-0 pointer-events-none z-35">
            {/* Act 1: Data chips flying from Platform → Gateway */}
            {SMS_RECIPIENTS.map((emp, i) => (
                <FloatingDataChip key={`chip-${emp.id}`} emp={emp} index={i} sceneTime={sceneTime} />
            ))}

            {/* Gateway absorption pulses */}
            {SMS_RECIPIENTS.map((_, i) => (
                <GatewayAbsorptionPulse key={`pulse-${i}`} index={i} sceneTime={sceneTime} />
            ))}

            {/* Act 2: SMS bubbles flying from Gateway → Phones */}
            {SMS_RECIPIENTS.map((emp, i) => (
                <FloatingSMSBubble key={`sms-${emp.id}`} emp={emp} index={i} sceneTime={sceneTime} />
            ))}
        </div>
    )
}

const EmployeeStatusCard = ({ active }: { active: boolean }) => (
    <motion.div
        initial={{ opacity: 0, x: -20, y: 0, scale: 0.9 }}
        animate={{
            opacity: active ? 1 : 0,
            x: active ? 0 : -20,
            scale: active ? 1 : 0.9
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute bottom-8 left-8 z-[100] pointer-events-none"
    >
        <div className="relative">
            <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-200 overflow-hidden w-36 font-sans">
                {/* Header */}
                <div className="px-2 py-1.5 flex items-center gap-2" style={{ backgroundColor: THEME.primary }}>
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                        <User size={12} className="text-white" />
                    </div>
                    <span className="text-[9px] font-bold text-white uppercase tracking-wider">Employee</span>
                </div>

                {/* Content Area */}
                <div className="p-2.5 bg-gradient-to-br from-gray-50 to-white">
                    <div className="relative">
                        {/* Browser/Device Shell */}
                        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700/50">
                            <div className="h-4 bg-gray-700 flex items-center px-2 gap-1 border-b border-gray-600/50">
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                                </div>
                                <div className="flex-1 flex items-center justify-center -ml-4">
                                    <Monitor size={8} className="text-gray-400" />
                                </div>
                            </div>

                            {/* Main Visual */}
                            <div className="relative bg-[#F8F8F8] h-32 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 opacity-60"></div>

                                {/* Vertical Pulsing Dots */}
                                <div className="absolute top-2 right-2 flex gap-0.5">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ y: [0, -4, 0] }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                delay: i * 0.2,
                                                ease: "easeInOut"
                                            }}
                                            className="w-1 h-1 rounded-full bg-[#0F9690]"
                                        />
                                    ))}
                                </div>

                                {/* Avatar (hero) */}
                                <div className="relative z-10 px-4">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white p-0.5">
                                        <img
                                            alt="Employee"
                                            className="w-full h-full object-cover rounded-full"
                                            src={avatarFor(SMS_RECIPIENTS[0]?.name || "")}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -bottom-1 -right-1 px-2.5 py-1 rounded-full text-[8px] font-bold text-white shadow-md flex items-center gap-1.5 ring-1 ring-white/50"
                            style={{ backgroundColor: THEME.secondary }}
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                            SMS Received
                        </motion.div>
                    </div>

                    {/* Footer Text */}
                    <div className="mt-3 text-center">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">Reading SMS</p>
                    </div>
                </div>
            </div>
        </div>
    </motion.div >
)

// --- PHASE 3 COMPONENTS ---

const EmployeeNetwork = ({ active, progress, isFocusing }: { active: boolean, progress: number, isFocusing: boolean }) => {
    return (
        <motion.div
            className="grid grid-cols-2 gap-x-8 gap-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{
                opacity: active ? (isFocusing ? 1 : 1) : 0, // Keep opacity 1 during focus transition
                x: active ? 0 : 50,
            }}
            transition={{ duration: 0.5 }}
        >
            {SMS_RECIPIENTS.map((emp, i) => {
                const isReceived = progress > (26 + i * 0.5);
                const isHero = i === 0; // First phone is the hero that transitions

                return (
                    <div key={emp.id} className="relative group flex justify-center">
                        <AnimatePresence mode="wait">
                            {/* State 1: Employee Avatar */}
                            {!isReceived && (
                                <motion.div
                                    key="avatar"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{
                                        scale: 1,
                                        opacity: isFocusing ? 0 : 1,
                                        filter: (isFocusing && !isHero) ? "blur(4px)" : "blur(0px)"
                                    }}
                                    exit={{ scale: 0, opacity: 0, rotateY: 90 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-slate-200 to-white shadow-lg">
                                            <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden border-2 border-white bg-slate-100">
                                                <img
                                                    src={avatarFor(emp.name)}
                                                    alt={emp.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-slate-200 rounded-full border-2 border-white flex items-center justify-center">
                                            <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-[10px] font-bold text-slate-600">{emp.name}</span>
                                        <span className="text-[8px] font-medium text-slate-400">{emp.role}</span>
                                    </div>
                                </motion.div>
                            )}

                            {/* State 2: Mobile Device (Received) */}
                            {isReceived && (
                                <motion.div
                                    key="mobile"
                                    layout
                                    // only render in grid if not focusing to allow layoutId to "move" to center
                                    layoutId={isHero ? "hero-phone" : undefined}
                                    initial={{ scale: 0.5, rotateY: -90, opacity: 0 }}
                                    animate={{
                                        scale: (!isFocusing || !isHero) ? 1 : 1.2, // slight swell before transition
                                        rotateY: 0,
                                        opacity: isFocusing ? 0 : 1,
                                        filter: (isFocusing && !isHero) ? "blur(4px)" : "blur(0px)"
                                    }}
                                    transition={{ type: "spring", damping: 15, stiffness: 120 }}
                                    className="relative transform-gpu"
                                >
                                    {(!isFocusing || !isHero) && (
                                        <>
                                            <MobileFrame message={`Moaziz Company A Employee, Aap ka FOS ID hai: ${emp.fosId}. For any complaint/feedback, Whatsapp: 0329-9129999`} />

                                            {/* Success Indicator */}
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.2 }}
                                                className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 border-2 border-white shadow-sm z-20"
                                            >
                                                <CheckCircle2 size={12} />
                                            </motion.div>
                                        </>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )
            })}
        </motion.div>
    )
}

// --- ACT 3: FOCUSED PHONE COMPONENT ---
// The hero phone that slides to center and expands into the SMS app
const FocusedPhoneView = ({ isActive, showSMSApp, sceneTime }: { isActive: boolean, showSMSApp: boolean, sceneTime: number }) => {
    const focusProgress = Math.max(0, Math.min(1, (sceneTime - 30) / 2.2))
    const featurePhoneCue = 33.2
    const showFeaturePhone = showSMSApp && sceneTime >= featurePhoneCue

    return (
        <AnimatePresence>
            {isActive && (
                <motion.div
                    key="focused-phone-container"
                    className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {/* Background overlay - Fading blur in separately after move */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            backdropFilter: showSMSApp ? "blur(12px)" : "blur(4px)"
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 bg-[#F5F5F7]/95 transform-gpu"
                    />

                    {/* Cinematic focus layers */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        <motion.div
                            animate={{ scale: [0.92, 1.05, 0.95], opacity: [0.2, 0.35, 0.2] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-green-300/25 blur-3xl"
                        />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(40,73,82,0.08),transparent_60%)]" />
                    </motion.div>

                    {/* Unified Phone Shell: GPU-accelerated morphing via 'layout' engine */}
                    <motion.div
                        layout
                        layoutId="hero-phone"
                        initial={{ y: 24, rotateX: 8, scale: 0.9, opacity: 0.65 }}
                        animate={{
                            scale: 1,
                            y: 0,
                            rotateX: 0,
                            opacity: 1,
                            boxShadow: showSMSApp
                                ? "0 60px 120px -25px rgba(2,6,23,0.65), 0 0 0 1px rgba(255,255,255,0.08)"
                                : "0 40px 90px -20px rgba(2,6,23,0.55)"
                        }}
                        transition={{
                            layout: { type: "spring", damping: 25, stiffness: 120, mass: 1 },
                            opacity: { duration: 0.25 },
                            y: { type: "spring", damping: 18, stiffness: 140 }
                        }}
                        className={`relative z-10 pointer-events-auto bg-[#111215] border border-[#2e3238] ring-4 ring-black/20 overflow-hidden transform-gpu flex flex-col items-center justify-center
                            ${showFeaturePhone ? 'w-[210px] h-[430px] rounded-[34px] p-[7px]' : (showSMSApp ? 'w-[260px] h-[520px] rounded-[44px] p-[7px]' : 'w-[100px] h-[200px] rounded-[24px] p-[2.5px]')}`}
                    >
                        {/* High-fidelity detail layers */}
                        <div className="absolute inset-0 rounded-[inherit] border-[2px] border-white/10 pointer-events-none z-10" />
                        <div className="absolute inset-[1px] rounded-[inherit] bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0)_25%,rgba(0,0,0,0.28))] pointer-events-none z-[9]" />

                        {/* Main Screen Content Area */}
                        <motion.div
                            layout
                            className="w-full h-full bg-[#f5f5f5] rounded-[inherit] overflow-hidden relative flex flex-col transform-gpu"
                        >
                            {/* Unified Dynamic Island: Positioned with layout for smooth move */}
                            <motion.div
                                layout
                                className={`absolute inset-x-0 mx-auto z-50 bg-black rounded-full shadow-lg
                                    ${showFeaturePhone ? 'hidden' : (showSMSApp ? 'top-[7px] w-[80px] h-[20px]' : 'top-[4px] w-[36px] h-[11px]')}`}
                            />

                            {/* Internal Content Cross-fade */}
                            <AnimatePresence mode="popLayout">
                                {!showSMSApp ? (
                                    /* Component: Lock Screen Content */
                                    <motion.div
                                        key="lockscreen-content"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 flex flex-col"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a4a] via-[#0d2b35] to-[#0a1f28]" />
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.18),transparent_45%)]" />

                                        <div className="absolute top-[22px] w-full text-center">
                                            <h1 className="text-lg font-thin text-white tracking-tighter drop-shadow-lg leading-none">09:41</h1>
                                            <p className="text-white/60 text-[5px] font-medium mt-0.5 uppercase tracking-widest leading-none">Wednesday, Dec 3</p>
                                        </div>

                                        <div className="mt-[58px] px-1.5 flex flex-col gap-1 z-20">
                                            <motion.div
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                className="bg-white/85 backdrop-blur-xl p-2 rounded-xl shadow-xl border border-white/40"
                                            >
                                                <div className="flex justify-between items-center mb-0.5">
                                                    <span className="text-[5px] font-bold text-gray-400">MESSAGES</span>
                                                    <span className="text-[4px] text-gray-500">now</span>
                                                </div>
                                                <p className="text-[6px] font-bold text-black leading-none">FOS Alert</p>
                                                <p className="text-[5px] text-gray-700 leading-snug mt-0.5">
                                                    Moaziz Company A Employee, Aap ka FOS ID hai: {MOCK_DATA[0].fosId}. For any complaint/feedback...
                                                </p>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: focusProgress > 0.45 ? 1 : 0, y: focusProgress > 0.45 ? 0 : 8 }}
                                                transition={{ duration: 0.35 }}
                                                className="bg-[#0f172a]/35 border border-white/20 rounded-lg px-2 py-1 backdrop-blur-sm"
                                            >
                                                <p className="text-[4px] uppercase tracking-[0.2em] text-emerald-200 font-bold">Secure Channel</p>
                                            </motion.div>
                                        </div>

                                        <div className="absolute top-1 right-2 bg-green-500 text-white rounded-full p-1 border border-white/20 shadow-sm z-30 scale-50">
                                            <CheckCircle2 size={12} />
                                        </div>
                                    </motion.div>
                                ) : (
                                    <AnimatePresence mode="wait">
                                        {!showFeaturePhone ? (
                                            /* Component: Smartphone SMS App Content */
                                            <motion.div
                                                key="sms-app-content"
                                                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95, y: 6, filter: "blur(6px)" }}
                                                transition={{ duration: 0.45, ease: "easeOut" }}
                                                className="absolute inset-0 flex flex-col pt-10 transform-gpu bg-[#F2F2F7]"
                                            >
                                                {/* Header */}
                                                <div className="px-4 py-2.5 bg-white/85 backdrop-blur border-b flex items-center gap-3 shadow-sm z-10 shrink-0">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#60BA81] to-[#284952] flex items-center justify-center text-white shadow-sm">
                                                        <Users size={14} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold text-black">FOS Hotline</span>
                                                        <span className="text-[9px] text-gray-500">Verified Business</span>
                                                    </div>
                                                    <div className="ml-auto rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-[8px] font-bold text-green-700">
                                                        DELIVERED
                                                    </div>
                                                </div>

                                                {/* Messages Thread */}
                                                <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                                                    <div className="text-[8px] text-gray-400 text-center font-bold uppercase tracking-widest my-1">Today 9:41 AM</div>

                                                    <SMSBubble
                                                        message={
                                                            <>
                                                                Moaziz Company A Employee, Aap ka FOS ID hai: <span className="text-[#60BA81] bg-[#60BA81]/10 px-1 rounded font-black">{MOCK_DATA[0].fosId}</span>.
                                                                {"\n\n"}
                                                                For any complaint/feedback:
                                                                {"\n"}<span className="text-[#284952] font-semibold">Whatsapp:</span> <span className="text-[#007AFF]">0329-9129999</span>
                                                                {"\n"}<span className="text-[#284952] font-semibold">Toll-free:</span> <span className="text-[#007AFF]">0800-91299</span>
                                                                {"\n"}<span className="text-[#284952] font-semibold">Website:</span> <span className="text-[#007AFF]">www.fruitofsustainability.com</span>
                                                            </>
                                                        }
                                                        delay={0.4}
                                                    />

                                                    <motion.div
                                                        initial={{ opacity: 0, y: 6 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.9 }}
                                                        className="w-full rounded-xl bg-emerald-50 border border-emerald-200 px-2.5 py-2"
                                                    >
                                                        <div className="flex items-center justify-between gap-2">
                                                            <span className="text-[8px] font-bold text-emerald-700 uppercase tracking-wide">No Internet Required</span>
                                                            <ShieldCheck size={11} className="text-emerald-600" />
                                                        </div>
                                                        <p className="text-[8px] text-emerald-800 mt-1">Accessible via SMS and toll-free channels for all workers.</p>
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            /* Component: Feature Phone SMS Content */
                                            <motion.div
                                                key="feature-phone-content"
                                                initial={{ opacity: 0, scale: 0.88, y: 10, rotate: 2 }}
                                                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                                                exit={{ opacity: 0, scale: 0.92, y: 10 }}
                                                transition={{ duration: 0.5, ease: EASE_IOS }}
                                                className="absolute inset-0 bg-[#171717] flex flex-col"
                                            >
                                                {/* Earpiece */}
                                                <div className="h-5 w-full flex justify-center items-center opacity-50">
                                                    <div className="w-12 h-1 bg-[#3b3b3b] rounded-full" />
                                                </div>

                                                {/* LCD Screen */}
                                                <div className="px-3 pt-1 pb-2">
                                                    <div className="bg-[#d4ded4] h-[146px] rounded-sm border-2 border-black/15 shadow-inner flex flex-col font-mono text-[#1a1a1a] p-1.5 relative overflow-hidden">
                                                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,#000_0.5px,transparent_0.5px)] [background-size:2px_2px]" />
                                                        <div className="flex justify-between items-center text-[7px] border-b border-[#1a1a1a]/10 pb-0.5 mb-1.5 opacity-70">
                                                            <span>Telenor</span>
                                                            <div className="flex gap-1">
                                                                <SignalHigh size={8} />
                                                                <Battery size={8} />
                                                            </div>
                                                        </div>

                                                        <div className="text-[7px] leading-tight">
                                                            <div className="bg-[#1a1a1a]/5 p-1 mb-1">
                                                                <p className="font-bold">FOS Hotline</p>
                                                                <p className="text-[6px] opacity-70">9:41 AM</p>
                                                            </div>
                                                            <p>Your FOS ID is <span className="font-bold text-[8px]">{MOCK_DATA[0].fosId}</span>.</p>
                                                            <p className="mt-0.5">For complaint/feedback:</p>
                                                            <p className="font-bold">0800-91299</p>
                                                            <p className="opacity-80">www.fruitofsustainability.com</p>
                                                        </div>

                                                        <div className="mt-auto pt-1 border-t border-[#1a1a1a]/10 flex justify-between text-[7px] font-bold">
                                                            <span>Options</span>
                                                            <span>Back</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-center py-1.5">
                                                    <span className="text-gray-500 text-[9px] font-bold tracking-[0.2em]">NOKIA</span>
                                                </div>

                                                {/* Navigation pad */}
                                                <div className="h-11 flex justify-center items-center mb-1.5 relative">
                                                    <div className="w-10 h-10 rounded-[10px] border-2 border-[#3f3f3f] bg-[#242424] flex items-center justify-center shadow-lg">
                                                        <div className="w-4 h-4 bg-[#121212] rounded shadow-inner" />
                                                    </div>
                                                </div>

                                                {/* Keypad */}
                                                <div className="flex-1 px-3 pb-4 grid grid-cols-3 gap-1.5 content-start">
                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((k) => (
                                                        <div key={k} className="w-full h-7 bg-gradient-to-b from-[#2b2b2b] to-[#212121] rounded-[4px] flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.6)] text-gray-300 text-[12px] font-bold border-t border-white/10">
                                                            {k}
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </AnimatePresence>

                            {/* Universal Home Indicator */}
                            <motion.div
                                layout
                                className={`absolute bottom-[4px] inset-x-0 mx-auto h-[3.5px] bg-black/10 rounded-full shrink-0
                                    ${showFeaturePhone ? 'hidden' : (showSMSApp ? 'w-[80px]' : 'w-[32px]')}`}
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}


export const SceneSMS = ({ isActive, progress }: { isActive: boolean, progress: number }) => {

    // TIMELINE: 22s -> 58s (Total 36s)
    // 0-8s: ID Generation (Card View)
    // 8-24s: ID Mapping (Card View - Highlight)
    // 24-36s: SMS Send (Transition to Phone)

    const sceneTime = isActive ? Math.max(0, progress - 22) : 0;

    // --- STATES ---
    const showCard = sceneTime < 30;
    const startIdGen = sceneTime > 1;
    const startMapping = sceneTime > 8;
    const startSend = sceneTime > 18;
    const startPhase3 = sceneTime > 24;
    const startFocusTransition = sceneTime > 30; // Act 3: phone slides to center
    const showSMSApp = sceneTime > 32; // SMS app appears inside focused phone
    const endScene = sceneTime > 34;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#F5F5F7] relative overflow-hidden font-sans select-none p-4">

            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.02]"
                    style={{ backgroundImage: `radial-gradient(${THEME.primary} 1px, transparent 1px)`, backgroundSize: '32px 32px' }}
                />
            </div>

            <div className="relative z-10 w-full max-w-6xl h-[560px] flex items-center justify-center scale-[0.9] origin-center">

                {/* === PHASE 1 & 2: CARD VIEW & PHASE 3: SOURCE === */}
                <AnimatePresence>
                    {showCard && (
                        <motion.div
                            key="fos-card-view"
                            animate={{
                                x: startPhase3 ? -300 : 0,
                                scale: startPhase3 ? 0.85 : 1,
                                opacity: startPhase3 ? 0.8 : 1
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.7,
                                x: -500,
                                filter: "blur(16px)",
                            }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="relative z-20"
                        >
                            <GlassCard
                                initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                title="FOS Platform"
                                subtitle="FOS Onboarding System"
                                logoSrc="/assets/images/FOS-01.png"
                                className="w-[430px] h-[540px] border-green-100 transition-colors duration-500"
                            >
                                <div className="flex justify-between items-center text-xs pb-3 border-b border-gray-100 mb-4">
                                    <div className="flex items-center gap-2">
                                        <SmartphoneIcon size={14} className="text-slate-400" />
                                        <motion.span
                                            key={startPhase3 ? "broadcast" : "gen"}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="font-bold text-slate-500"
                                        >
                                            {startPhase3 ? "Broadcasting..." : (startMapping ? "Linking Identities..." : "Generating IDs...")}
                                        </motion.span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded text-[10px] font-bold text-slate-500">
                                        {startPhase3 ? <SignalHigh size={10} className="text-green-500 animate-pulse" /> : (startMapping ? <LinkIcon size={10} /> : <Key size={10} />)}
                                        <span>{startPhase3 ? "SENDING SMS" : (startMapping ? "CNIC LINKAGE" : "ID GEN")}</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {MOCK_DATA.map((emp, i) => (
                                        <IdentityRow
                                            key={emp.id}
                                            data={emp}
                                            showId={startMapping ? (sceneTime > (8 + i * 0.5)) : (startIdGen && i === 0)}
                                            showLink={startMapping && sceneTime > (8 + i * 0.4)}
                                            showSend={startSend && sceneTime > (18 + i * 0.25)}
                                            dimmed={!startMapping && startIdGen && i !== 0}
                                            focus={!startMapping && startIdGen && i === 0}
                                        />
                                    ))}
                                </div>

                                {/* Active Sending Indicator for Phase 3 */}
                                {startPhase3 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-white bg-[#284952] p-3 rounded-xl shadow-lg"
                                    >
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                        <span>Transmitting Data...</span>
                                    </motion.div>
                                )}
                            </GlassCard>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* === PHASE SPECIFIC CENTRAL VISUALIZATIONS === */}
                <AnimatePresence mode="wait">
                    {/* Phase 1: ID Generation (0-8s) */}
                    {(startIdGen && !startMapping) && (
                        <motion.div
                            key="id-gen-visual"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                        >
                            <IDGenerationVisual active={true} sceneTime={sceneTime} employee={MOCK_DATA[0]} />
                        </motion.div>
                    )}

                    {/* Phase 2: Mapping Nexus (8-24s) */}
                    {(startMapping && !startPhase3) && (
                        <motion.div
                            key="mapping-nexus-visual"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                        >
                            <MappingNexus active={true} />
                        </motion.div>
                    )}

                    {/* Phase 3: Unified Gateway (24s-30s) */}
                    {(startPhase3 && !startFocusTransition) && (
                        <motion.div
                            key="gateway-visual"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1.1 }}
                            exit={{ opacity: 0, scale: 0.8, filter: "blur(12px)" }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
                        >
                            <UnifiedGateway active={true} isBroadcasting={true} isCentered={true} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* === CNIC → FOS ID TRANSFORMATION PIPELINE (Left Side, Act 1 & 2) === */}
                <CNICTransformationPipeline sceneTime={sceneTime} startIdGen={startIdGen} startMapping={startMapping} />

                {/* === PHASE 3: FLOATING MESSAGE VISUALIZATION === */}
                <SMSFlowVisualization active={startPhase3 && showCard && !startFocusTransition} sceneTime={sceneTime} />

                {/* === PHASE 3: RIGHT EMPLOYEE NETWORK === */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[300px] z-20">
                    <EmployeeNetwork active={startPhase3} progress={sceneTime} isFocusing={startFocusTransition} />
                </div>

                {/* === ACT 3: FOCUSED PHONE TRANSITION === */}
                <FocusedPhoneView isActive={startFocusTransition} showSMSApp={showSMSApp} sceneTime={sceneTime} />
            </div>

            {/* === ACT 3: EMPLOYEE STATUS CARD (At root for true corner placement) === */}
            <EmployeeStatusCard active={startFocusTransition} />
        </div>
    )
}