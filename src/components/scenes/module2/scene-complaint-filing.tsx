"use client"

import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import {
    Phone,
    MessageCircle,
    Mail,
    Headset,
    HardHat,
    Users,
    Baby,
    DollarSign,
    Clock,
    AlertTriangle,
    Scale,
    Briefcase,
    Globe,
    ShieldAlert,
    Gavel,
    MessageSquareQuote,
    UploadCloud,
    Smartphone,
    Wifi,
    Lock,
    Search,
    EyeOff,
    Shield
} from "lucide-react"

/* ───────────────────────── CONSTANTS ───────────────────────── */

const ASSETS = {
    worker: "/assets/avatars/worker_calling.png",
    officer: "/assets/avatars/fos_grievance_officer_complaint.png",
}

const IOS_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const COMPLAINT_CATEGORIES = [
    { icon: HardHat, label: "Workplace Health,\nSafety and Environment" },
    { icon: Users, label: "Freedom of\nAssociation" },
    { icon: Baby, label: "Child Labor" },
    { icon: DollarSign, label: "Wages &\nBenefits" },
    { icon: Clock, label: "Working\nHours" },
    { icon: AlertTriangle, label: "Forced\nLabor" },
    { icon: Scale, label: "Discrimination" },
    { icon: Briefcase, label: "Unfair\nEmployment" },
    { icon: Globe, label: "Ethical\nBusiness" },
    { icon: ShieldAlert, label: "Harassment" },
    { icon: Gavel, label: "Workplace\nDiscipline" },
    { icon: MessageSquareQuote, label: "Employee\nFeedback/Suggestion" },
]

interface FormDataState {
    fosId: string
    name: string
    company: string
    workerType: string
    department: string
    designation: string
    gender: string
    mobile: string
    date: string
    additionalComments: string
    complaintAgainst: string
    concernedDept: string
    history: string
    solution: string
}

/* ───────────────────── SUB-COMPONENTS ──────────────────────── */

/* Animated data particles between avatars */
const DataStream = ({ color, isActive, direction = "right" }: { color: string; isActive: boolean; direction?: "left" | "right" }) => (
    <div className="flex gap-2 items-center justify-center overflow-visible w-24 relative h-6">
        <AnimatePresence>
            {isActive && (
                <>
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-20"
                        style={{ color }}
                    />
                    {[...Array(4)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1.5 h-1.5 rounded-full blur-[1px]"
                            style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
                            initial={{ x: direction === "right" ? -40 : 40, opacity: 0, scale: 0 }}
                            animate={{
                                x: direction === "right" ? 40 : -40,
                                opacity: [0, 1, 0],
                                scale: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: i * 0.3,
                                ease: "linear",
                            }}
                        />
                    ))}
                </>
            )}
        </AnimatePresence>
    </div>
)

/* Concentric speaking-pulse rings */
const SpeakingPulse = ({ color, isActive }: { color: string; isActive: boolean }) => (
    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
            {isActive &&
                [1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute w-full h-full rounded-full border-2"
                        style={{ borderColor: color }}
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 1, ease: "easeOut" }}
                    />
                ))}
        </AnimatePresence>
    </div>
)

/* ─── Real FOS form field (matches entry_form.html style) ──── */
const FosFormField = ({
    label,
    value,
    isTyping,
    placeholder,
    isProtected,
    protectionType,
    delay = 0,
}: {
    label: string
    value?: string
    isTyping?: boolean
    placeholder: string
    isProtected?: boolean
    protectionType?: "ENCRYPTED" | "HIDDEN" | "MASKED"
    delay?: number
}) => (
    <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.4, ease: IOS_EASE }}
        className="flex flex-col gap-0.5"
    >
        <label className="text-[8px] font-semibold text-[#1a202c] flex items-center gap-1">
            {label}
            {isProtected && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Lock size={7} className="text-[#60BA81]" />
                </motion.span>
            )}
        </label>
        <div
            className="h-6 rounded border flex items-center px-2 text-[7px] transition-all duration-500 relative overflow-hidden"
            style={{
                borderColor: isProtected ? "#60BA81" : value ? "#60BA81" : "#e2e8f0",
                backgroundColor: isProtected ? "rgba(96,186,129,0.06)" : "#fff",
            }}
        >
            <AnimatePresence mode="wait">
                {isProtected ? (
                    <motion.div
                        key="protected"
                        initial={{ opacity: 0, x: -8, filter: "blur(6px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        className="flex items-center gap-1 text-[#60BA81]"
                    >
                        <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                            <Lock size={8} strokeWidth={2.5} />
                        </motion.div>
                        <span className="font-mono font-bold tracking-widest text-[6px]">{protectionType}</span>
                        <div className="flex gap-0.5 ml-1">
                            {[0, 1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-0.5 h-0.5 bg-[#60BA81] rounded-full"
                                    animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                                />
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.span
                        key="value"
                        exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 0.3 } }}
                        className={`truncate ${value ? "text-[#1a202c] font-medium" : "text-[#a0aec0]"}`}
                    >
                        {value || placeholder}
                    </motion.span>
                )}
            </AnimatePresence>
            {isTyping && !isProtected && (
                <motion.span
                    className="w-0.5 h-2.5 bg-[#60BA81] ml-0.5 rounded-full shrink-0"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                />
            )}
        </div>
    </motion.div>
)

/* ──────────────────────── MAIN COMPONENT ──────────────────── */

export const SceneComplaintFiling = ({ isActive, progress = 0 }: { isActive: boolean; progress?: number }) => {
    const scrollRef = useRef<HTMLDivElement>(null)

    /* ── DECLARATIVE PROGRESS STATE (Deterministic & Seek-proof) ── */
    const t = Math.max(0, progress - 28) // Offset from scene start

    // Phase calculation
    let phase = 0
    if (isActive) {
        if (t >= 42) phase = 7
        else if (t >= 36) phase = 6
        else if (t >= 29) phase = 5
        else if (t >= 22) phase = 4
        else if (t >= 19.5) phase = 3.7
        else if (t >= 14.5) phase = 3.5
        else if (t >= 9.5) phase = 3
        else if (t >= 6.0) phase = 2
        else phase = 1
    }

    // Category selection
    const selectedCategory = t >= 29 ? 9 : t >= 14.5 ? 3 : null

    // Form data & typing field
    const isAnonymityStage = t >= 29
    const formData: FormDataState = isAnonymityStage
        ? {
            fosId: "FOS-35201-982",
            name: "Muhammad Ali Hassan",
            company: "Pearl Textiles Ltd",
            workerType: "Stitching",
            department: "Production",
            designation: "Line Worker",
            gender: "Male",
            mobile: "+92 300 1234567",
            date: "12 Dec 2024",
            additionalComments: "Harassment by floor supervisor...",
            complaintAgainst: "Mr. Idrees (Floor Manager)",
            concernedDept: "HR",
            history: "Reported verbally twice",
            solution: "Immediate action required",
        }
        : {
            fosId: t >= 10.5 ? "475002" : "",
            name: t >= 11.5 ? "Ahmed Khan" : "",
            company: t >= 12.0 ? "Pearl Textiles" : "",
            workerType: t >= 12.3 ? "Operator" : "",
            department: t >= 12.6 ? "Spinning" : "",
            designation: t >= 12.9 ? "Senior Op" : "",
            gender: t >= 13.2 ? "Male" : "",
            mobile: t >= 13.5 ? "+92 300 123..." : "",
            date: t >= 13.8 ? "15 Nov 2024" : "",
            additionalComments: t >= 15.5 ? "Wages delayed for 2 months. Overtime not paid." : "",
            complaintAgainst: t >= 16.5 ? "Mr. Asif (Supervisor)" : "",
            concernedDept: t >= 17.2 ? "Accounts / HR" : "",
            history: t >= 17.8 ? "First time" : "",
            solution: t >= 18.5 ? "Release pending dues" : "",
        }

    const typingField: string | null = isAnonymityStage
        ? null
        : t >= 10.5 && t < 11.0 ? "fosId"
        : t >= 11.0 && t < 11.5 ? "name"
        : t >= 11.5 && t < 12.0 ? "company"
        : t >= 12.0 && t < 12.3 ? "workerType"
        : t >= 12.3 && t < 12.6 ? "department"
        : t >= 12.6 && t < 12.9 ? "designation"
        : t >= 12.9 && t < 13.2 ? "gender"
        : t >= 13.2 && t < 13.5 ? "mobile"
        : t >= 13.5 && t < 13.8 ? "date"
        : t >= 15.0 && t < 16.5 ? "additionalComments"
        : t >= 16.5 && t < 17.2 ? "complaintAgainst"
        : t >= 17.2 && t < 17.8 ? "concernedDept"
        : t >= 17.8 && t < 18.5 ? "history"
        : null

    // Anonymity variables
    const isAnonymous = t >= 35.0
    const protectedFields = t >= 40.0 ? ["id", "name", "mobile"] : t >= 38.5 ? ["id", "name"] : t >= 37.0 ? ["id"] : []
    const trackingId = t >= 44.0 ? "XX020289-11XXXX" : null
    const workerSpeech = t >= 32.0 && t < 42.0
    const officerSpeech = t >= 34.0 && t < 42.0

    // Auto-scroll sync
    useEffect(() => {
        if (!scrollRef.current) return
        if (t >= 29) {
            scrollRef.current.scrollTop = 0
        } else if (t >= 19.5) {
            scrollRef.current.scrollTop = 500
        } else if (t >= 16.5) {
            scrollRef.current.scrollTop = 320
        } else if (t >= 14.5) {
            scrollRef.current.scrollTop = 160
        } else {
            scrollRef.current.scrollTop = 0
        }
    }, [t])

    /* ── Derived booleans ── */
    const showWorker = phase >= 1
    const showOfficer = phase >= 2
    const showForm = phase >= 3
    const showTicket = phase === 4
    const showAnonymity = phase >= 5
    const showProtection = phase >= 6
    const showAnonymousTicket = phase >= 7

    return (
        <div className="w-full h-full bg-[#F5F5F7] flex items-center justify-center relative overflow-hidden font-['Inter',sans-serif] selection:bg-[#60BA81]/20">

            {/* ── BACKGROUND AMBIANCE ── */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]" />
                <motion.div
                    className="absolute -top-[30%] -right-[10%] w-[800px] h-[800px] bg-[#60BA81]/10 rounded-full blur-[120px]"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.div
                    className="absolute -bottom-[30%] -left-[10%] w-[600px] h-[600px] bg-[#284952]/5 rounded-full blur-[100px]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 12, repeat: Infinity, delay: 2 }}
                />
            </div>

            {/* ── MAIN STAGE ── */}
            <div className="relative z-10 w-full max-w-[1400px] h-full flex items-center justify-center px-8">
                <motion.div
                    className="flex items-center gap-2"
                    layout
                    transition={{ duration: 1.2, ease: IOS_EASE }}
                >

                    {/* ═══════ 1. WORKER (LEFT) ═══════ */}
                    <AnimatePresence>
                        {showWorker && (
                            <motion.div
                                layout
                                className="flex flex-col items-center relative z-20 shrink-0"
                                initial={{ opacity: 0, scale: 0.9, x: -20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.8, x: -60, transition: { duration: 0.8, ease: IOS_EASE } }}
                                transition={{ duration: 0.8, ease: IOS_EASE }}
                            >
                                {/* ── Worker speech bubble ABOVE avatar with thought dots ── */}
                                <AnimatePresence>
                                    {workerSpeech && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.7 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.3 } }}
                                            transition={{ type: "spring", stiffness: 300, damping: 22 }}
                                            className="flex flex-col items-center mb-2 z-40 pointer-events-none"
                                            style={{ transformOrigin: "bottom center" }}
                                        >
                                            {/* Bubble body */}
                                            <div className="bg-white rounded-2xl px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-[#60BA81]/30 relative overflow-hidden w-[220px]">
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#60BA81]/[0.06] to-transparent" />
                                                <div className="relative z-10">
                                                    <p className="text-[12px] text-[#284952] font-semibold leading-snug text-center">
                                                        <span className="text-[#F5A83C] text-base font-bold">“</span>
                                                        I don&apos;t want my identity to be revealed to Investigation Officer
                                                        <span className="text-[#F5A83C] text-base font-bold">”</span>
                                                    </p>
                                                </div>
                                            </div>
                                            {/* Thought dots — 3 circles getting smaller toward the avatar */}
                                            <motion.div
                                                className="flex flex-col items-center gap-[3px] mt-1"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.15 }}
                                            >
                                                <div className="w-[8px] h-[8px] rounded-full bg-white border border-[#60BA81]/30 shadow-sm" />
                                                <div className="w-[5px] h-[5px] rounded-full bg-white border border-[#60BA81]/30 shadow-sm" />
                                                <div className="w-[3px] h-[3px] rounded-full bg-white border border-[#60BA81]/30 shadow-sm" />
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="relative flex items-center justify-center">
                                    <SpeakingPulse color="#60BA81" isActive={phase >= 1} />
                                    <motion.div
                                        layout
                                        className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10 bg-white"
                                        animate={phase < 2 ? { scale: [1, 1.05, 1], transition: { duration: 2, repeat: Infinity } } : { scale: 1 }}
                                    >
                                        <img src={ASSETS.worker} alt="Worker" className="w-full h-full object-cover scale-110" />
                                    </motion.div>

                                    {/* Connecting badge */}
                                    <AnimatePresence>
                                        {phase < 2 && (
                                            <motion.div
                                                className="absolute -bottom-4 z-20 bg-white px-3 py-1 rounded-full shadow-lg border border-[#60BA81]/20 flex items-center gap-1.5"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                            >
                                                <Wifi size={10} className="text-[#60BA81] animate-pulse" />
                                                <span className="text-[10px] font-bold text-[#284952] tracking-wide uppercase">Connecting</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Floating channel icons */}
                                    <AnimatePresence>
                                        {phase < 2 && (
                                            <>
                                                {[
                                                    { icon: Phone, color: "#F5A83C", label: "Phone", x: -75, y: -50, delay: 0.2 },
                                                    { icon: Smartphone, color: "#284952", label: "SMS", x: 75, y: -50, delay: 0.4 },
                                                    { icon: MessageCircle, color: "#60BA81", label: "WhatsApp", x: 75, y: 50, delay: 0.6 },
                                                    { icon: Mail, color: "#17161A", label: "Email", x: -75, y: 50, delay: 0.8 },
                                                ].map((ch, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="absolute w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center z-20 border border-gray-100"
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        animate={{ opacity: 1, scale: 1, x: ch.x, y: ch.y }}
                                                        exit={{ opacity: 0, scale: 0, filter: "blur(10px)" }}
                                                        transition={{ delay: ch.delay, type: "spring", stiffness: 100 }}
                                                        style={{ top: "50%", left: "50%", marginTop: -24, marginLeft: -24 }}
                                                    >
                                                        <div className="absolute -top-6 bg-white border border-gray-100 text-[#284952] text-[8px] font-black px-2 py-0.5 rounded-full shadow-sm uppercase tracking-tighter">
                                                            {ch.label}
                                                        </div>
                                                        <ch.icon size={20} style={{ color: ch.color }} />
                                                    </motion.div>
                                                ))}
                                            </>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <motion.div layout className="mt-8 text-center bg-white/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/50 shadow-sm z-30 relative">
                                    <h3 className="text-sm font-black text-[#284952] tracking-tight">Factory Worker</h3>
                                    <p className="text-[10px] text-[#767676] font-extrabold uppercase tracking-widest opacity-60">Complainant</p>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ═══════ DATA STREAM: Worker → Officer ═══════ */}
                    <AnimatePresence>
                        {showOfficer && (
                            <motion.div
                                layout
                                className="flex items-center justify-center overflow-hidden"
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: phase >= 3 ? 80 : 160, opacity: 1 }}
                                exit={{ width: 0, opacity: 0, transition: { duration: 0.6 } }}
                                transition={{ duration: 0.8, ease: IOS_EASE }}
                            >
                                <DataStream color="#60BA81" isActive={phase >= 2} direction="right" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ═══════ 2. OFFICER (CENTER) ═══════ */}
                    <AnimatePresence>
                        {showOfficer && (
                            <motion.div
                                layout
                                className="flex flex-col items-center relative z-30 shrink-0"
                                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.8, x: -40, transition: { duration: 0.8, ease: IOS_EASE } }}
                                transition={{ duration: 0.8, ease: IOS_EASE }}
                            >
                                {/* ── Officer speech bubble ABOVE avatar with thought dots ── */}
                                <AnimatePresence>
                                    {officerSpeech && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.7 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.3 } }}
                                            transition={{ type: "spring", stiffness: 300, damping: 22 }}
                                            className="flex flex-col items-center mb-2 z-40 pointer-events-none"
                                            style={{ transformOrigin: "bottom center" }}
                                        >
                                            {/* Bubble body */}
                                            <div className="bg-white rounded-2xl px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-[#284952]/25 relative overflow-hidden w-[230px]">
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#284952]/[0.04] to-transparent" />
                                                <div className="relative z-10">
                                                    <p className="text-[12px] text-[#284952] font-semibold leading-snug text-center">
                                                        <span className="text-[#284952] text-base font-bold">“</span>
                                                        Ok, Hiding your personal information from complaint
                                                        <span className="text-[#284952] text-base font-bold">”</span>
                                                    </p>
                                                </div>
                                            </div>
                                            {/* Thought dots */}
                                            <motion.div
                                                className="flex flex-col items-center gap-[3px] mt-1"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.15 }}
                                            >
                                                <div className="w-[8px] h-[8px] rounded-full bg-white border border-[#284952]/25 shadow-sm" />
                                                <div className="w-[5px] h-[5px] rounded-full bg-white border border-[#284952]/25 shadow-sm" />
                                                <div className="w-[3px] h-[3px] rounded-full bg-white border border-[#284952]/25 shadow-sm" />
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="relative flex items-center justify-center">
                                    <SpeakingPulse color="#284952" isActive={phase >= 2} />
                                    <motion.div layout className="w-44 h-44 rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-white/80 relative z-10">
                                        <img src={ASSETS.officer} alt="Officer" className="w-full h-full object-cover scale-105" />
                                    </motion.div>
                                    <motion.div
                                        initial={{ scale: 0, rotate: -45 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.5, type: "spring" }}
                                        className="absolute bottom-2 right-2 bg-gradient-to-br from-[#284952] to-[#1e363d] p-3 rounded-full shadow-2xl border-2 border-white z-20"
                                    >
                                        <Headset size={20} className="text-white" />
                                    </motion.div>
                                </div>
                                <motion.div layout className="mt-6 text-center bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/50 shadow-sm relative z-10">
                                    <h3 className="text-lg font-black text-[#284952] tracking-tight">Grievance Officer</h3>
                                    <p className="text-[10px] text-[#767676] font-extrabold uppercase tracking-widest opacity-60">FOS System Support</p>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ═══════ DATA STREAM: Officer → Form ═══════ */}
                    <AnimatePresence>
                        {showForm && (
                            <motion.div
                                layout
                                className="flex items-center justify-center overflow-hidden"
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 80, opacity: 1 }}
                                exit={{ width: 0, opacity: 0, transition: { duration: 0.6 } }}
                                transition={{ duration: 0.8, ease: IOS_EASE }}
                            >
                                <DataStream color="#284952" isActive={phase >= 3} direction="right" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ═══════ 3. BROWSER FORM ═══════ */}
                    <AnimatePresence>
                        {showForm && (
                            <motion.div
                                layout
                                className="relative z-20 shrink-0"
                                initial={{ opacity: 0, x: 100, rotateY: 20, scale: 0.9 }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    rotateY: 0,
                                    scale: 1,
                                }}
                                transition={{ duration: 1, ease: IOS_EASE }}
                                style={{ perspective: 1000 }}
                            >
                                {/* BROWSER FRAME */}
                                <div className="bg-white rounded-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] overflow-hidden border border-[#DEE2E6] flex flex-col w-[400px]">

                                    {/* BROWSER CHROME */}
                                    <div className="bg-[#F3F4F6] px-3 py-2.5 flex items-center gap-3 border-b border-[#DEE2E6] shrink-0">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] shadow-inner" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E] shadow-inner" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840] shadow-inner" />
                                        </div>
                                        <div className="flex-1 bg-white h-6 rounded-md border border-[#DEE2E6] shadow-sm flex items-center justify-center gap-1.5 px-2">
                                            <Lock size={8} className="text-[#284952]/40" />
                                            <span className="text-[9px] text-[#17161A]/60 font-medium tracking-tight">fruitofsustainability.com/complaint</span>
                                        </div>
                                    </div>

                                    {/* FORM CONTENT */}
                                    <div className="flex flex-col max-h-[440px]">

                                        {/* Gradient Header (matches entry_form.html) */}
                                        <div className="shrink-0 py-4 px-6 text-center text-white relative overflow-hidden"
                                            style={{ background: "linear-gradient(135deg, #60BA81, #284952)" }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                                            <h1 className="text-base font-bold relative z-10 tracking-tight">Complaint/Feedback Form</h1>
                                            <p className="text-[8px] relative z-10 opacity-80 mt-0.5">Fill out the form carefully for complaint registration</p>

                                            {/* Protected badge (anonymity phase) */}
                                            <AnimatePresence>
                                                {isAnonymous && (
                                                    <motion.div
                                                        initial={{ scale: 0, rotate: -90, opacity: 0 }}
                                                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                        className="absolute top-3 right-3 z-20 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1"
                                                    >
                                                        <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                                                            <Lock className="text-white" size={10} strokeWidth={2.5} />
                                                        </motion.div>
                                                        <span className="text-white font-bold text-[7px]">Protected</span>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Scrollable Form Body */}
                                        <div
                                            ref={scrollRef}
                                            className="px-4 py-3 bg-white overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] scroll-smooth flex-1"
                                        >

                                            {/* ── Search Section (FOS ID) ── */}
                                            <div className="bg-[#f8fafb] p-3 rounded-lg border border-[#e2e8f0] mb-3">
                                                <label className="text-[8px] font-semibold text-[#1a202c] block mb-1">FOS ID - فوس آئی ڈی</label>
                                                <div className="flex gap-1.5 items-center">
                                                    <div className="flex-1 relative">
                                                        <div className="h-6 rounded border border-[#e2e8f0] bg-white flex items-center px-2 text-[7px]">
                                                            <span className={`flex-1 truncate ${formData.fosId ? "text-[#1a202c] font-medium" : "text-[#a0aec0]"}`}>
                                                                {formData.fosId || "Enter FOS ID or CNIC"}
                                                            </span>
                                                            {typingField === "fosId" && (
                                                                <motion.span className="w-0.5 h-2.5 bg-[#60BA81] ml-0.5 rounded-full" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
                                                            )}
                                                            <div className="flex ml-1 bg-[#f8fafb] rounded text-[5px] border border-[#e2e8f0]">
                                                                <span className="px-1 py-0.5 bg-white rounded text-[#284952] font-bold shadow-sm">FOS ID</span>
                                                                <span className="px-1 py-0.5 text-[#4a5568]">CNIC</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-[#F5A83C] text-white text-[6px] font-bold px-2.5 py-1.5 rounded cursor-pointer shadow-sm flex items-center gap-1">
                                                        <Search size={8} />
                                                        Search
                                                    </div>
                                                </div>

                                                {/* Urgent / Anonymous toggles */}
                                                <div className="flex gap-2 mt-2">
                                                    <div className="flex-1 h-7 rounded border-2 border-[#e2e8f0] bg-white flex items-center justify-center text-[7px] font-medium text-[#1a202c]">
                                                        Urgent
                                                    </div>
                                                    <motion.div
                                                        className={`flex-1 h-7 rounded border-2 flex items-center justify-center text-[7px] font-semibold cursor-pointer transition-all duration-500 ${isAnonymous
                                                            ? "bg-[#284952] border-[#284952] text-white"
                                                            : "border-[#e2e8f0] bg-white text-[#1a202c]"
                                                            }`}
                                                        animate={isAnonymous ? { scale: [1, 1.05, 1] } : {}}
                                                        transition={{ duration: 0.4 }}
                                                    >
                                                        {isAnonymous && <EyeOff size={9} className="mr-1" />}
                                                        Anonymous
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* ── Personal Info Grid ── */}
                                            <div className="grid grid-cols-5 gap-x-2 gap-y-1.5 mb-3">
                                                <FosFormField label="Name - نام" value={formData.name} isTyping={typingField === "name"} placeholder="Enter your name" isProtected={protectedFields.includes("name")} protectionType="HIDDEN" delay={0.05} />
                                                <FosFormField label="Company - کمپنی" value={formData.company} isTyping={typingField === "company"} placeholder="Enter company name" delay={0.1} />
                                                <FosFormField label="Worker Type - کارکن کی قسم" value={formData.workerType} isTyping={typingField === "workerType"} placeholder="Enter worker type" delay={0.15} />
                                                <FosFormField label="Department - شعبہ" value={formData.department} isTyping={typingField === "department"} placeholder="Enter department" delay={0.2} />
                                                <FosFormField label="Designation - عہدہ" value={formData.designation} isTyping={typingField === "designation"} placeholder="Enter designation" delay={0.25} />
                                            </div>

                                            <div className="grid grid-cols-3 gap-x-2 gap-y-1.5 mb-3">
                                                <FosFormField label="Gender - جنس" value={formData.gender} isTyping={typingField === "gender"} placeholder="Male, Female, or N/A" delay={0.3} />
                                                <div className="flex flex-col gap-0.5">
                                                    <motion.label initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="text-[8px] font-semibold text-[#1a202c]">
                                                        Mobile Number - موبائل نمبر
                                                        {protectedFields.includes("mobile") && (
                                                            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-1 inline-block"><Lock size={7} className="text-[#60BA81]" /></motion.span>
                                                        )}
                                                    </motion.label>
                                                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                                                        className="h-6 rounded border flex items-center px-2 text-[7px] relative overflow-hidden"
                                                        style={{ borderColor: protectedFields.includes("mobile") ? "#60BA81" : formData.mobile ? "#60BA81" : "#e2e8f0", backgroundColor: protectedFields.includes("mobile") ? "rgba(96,186,129,0.06)" : "#fff" }}
                                                    >
                                                        <AnimatePresence mode="wait">
                                                            {protectedFields.includes("mobile") ? (
                                                                <motion.div key="prot" initial={{ opacity: 0, x: -8, filter: "blur(6px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} className="flex items-center gap-1 text-[#60BA81]">
                                                                    <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ duration: 1, repeat: Infinity }}><Lock size={8} strokeWidth={2.5} /></motion.div>
                                                                    <span className="font-mono font-bold tracking-widest text-[6px]">MASKED</span>
                                                                </motion.div>
                                                            ) : (
                                                                <motion.span key="val" exit={{ opacity: 0, filter: "blur(4px)" }} className={`flex-1 truncate ${formData.mobile ? "text-[#1a202c] font-medium" : "text-[#a0aec0]"}`}>
                                                                    {formData.mobile || "Enter mobile number"}
                                                                </motion.span>
                                                            )}
                                                        </AnimatePresence>
                                                        {typingField === "mobile" && !protectedFields.includes("mobile") && (
                                                            <motion.span className="w-0.5 h-2.5 bg-[#60BA81] ml-0.5 rounded-full" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
                                                        )}
                                                        {!protectedFields.includes("mobile") && (
                                                            <div className="absolute right-1 bg-[#284952] text-white text-[5px] font-bold px-1.5 py-0.5 rounded">Send OTP</div>
                                                        )}
                                                    </motion.div>
                                                </div>
                                                <FosFormField label="Date of Incident - اجراء کی تاریخ" value={formData.date} isTyping={typingField === "date"} placeholder="dd/mm/yyyy" delay={0.4} />
                                            </div>

                                            {/* FOS ID protected field (anonymity) */}
                                            {protectedFields.includes("id") && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    className="mb-3 bg-[#f8fafb] p-2.5 rounded-lg border border-[#e2e8f0]"
                                                >
                                                    <FosFormField label="FOS ID" value={formData.fosId} placeholder="" isProtected={true} protectionType="ENCRYPTED" />
                                                </motion.div>
                                            )}

                                            {/* ── Complaint Categories ── */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: phase >= 3.5 || showAnonymity ? 1 : 0.3 }}
                                                className="mb-3"
                                            >
                                                <label className="text-[8px] font-semibold text-[#1a202c] block mb-1.5">Complaint Category</label>
                                                <div className="grid grid-cols-6 gap-1.5">
                                                    {COMPLAINT_CATEGORIES.slice(0, 6).map((cat, i) => (
                                                        <motion.div
                                                            key={i}
                                                            className={`p-1.5 rounded-lg border flex flex-col items-center gap-1 text-center transition-all duration-500 cursor-pointer ${selectedCategory === i
                                                                ? "bg-[#60BA81] border-[#60BA81] text-white shadow-lg shadow-[#60BA81]/20"
                                                                : "bg-white border-[#e2e8f0] text-[#284952]"
                                                                }`}
                                                        >
                                                            <cat.icon size={14} strokeWidth={selectedCategory === i ? 2.5 : 1.5} />
                                                            <span className="text-[5px] font-semibold leading-tight whitespace-pre-line">{cat.label}</span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                                <div className="grid grid-cols-6 gap-1.5 mt-1.5">
                                                    {COMPLAINT_CATEGORIES.slice(6).map((cat, i) => (
                                                        <motion.div
                                                            key={i + 6}
                                                            className={`p-1.5 rounded-lg border flex flex-col items-center gap-1 text-center transition-all duration-500 cursor-pointer ${selectedCategory === i + 6
                                                                ? "bg-[#60BA81] border-[#60BA81] text-white shadow-lg shadow-[#60BA81]/20"
                                                                : "bg-white border-[#e2e8f0] text-[#284952]"
                                                                }`}
                                                        >
                                                            <cat.icon size={14} strokeWidth={selectedCategory === i + 6 ? 2.5 : 1.5} />
                                                            <span className="text-[5px] font-semibold leading-tight whitespace-pre-line">{cat.label}</span>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>

                                            {/* ── Additional Comments ── */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: phase >= 3.5 || showAnonymity ? 1 : 0 }}
                                                className="mb-3"
                                            >
                                                <label className="text-[8px] font-semibold text-[#1a202c] block mb-1">Additional Comments - اضافی تبصرے</label>
                                                {/* Mini toolbar */}
                                                <div className="flex gap-1 bg-[#f8fafb] rounded-t border border-[#e2e8f0] border-b-0 px-2 py-1">
                                                    {["B", "I", "U", "S", "≡", "≡", "∞"].map((c, i) => (
                                                        <span key={i} className="text-[7px] text-[#4a5568] font-bold px-0.5">{c}</span>
                                                    ))}
                                                </div>
                                                <div className="h-12 rounded-b border border-[#e2e8f0] bg-white px-2 py-1 text-[7px] text-[#1a202c] relative overflow-hidden">
                                                    <span>{formData.additionalComments || "Enter your complaint details..."}</span>
                                                    {typingField === "additionalComments" && (
                                                        <motion.span className="w-0.5 h-2.5 bg-[#60BA81] ml-0.5 rounded-full inline-block" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
                                                    )}
                                                </div>
                                            </motion.div>

                                            {/* ── Bottom 4 fields ── */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: phase >= 3.5 || showAnonymity ? 1 : 0 }}
                                                className="grid grid-cols-4 gap-2 mb-3"
                                            >
                                                <FosFormField label="Complaint Against" value={formData.complaintAgainst} isTyping={typingField === "complaintAgainst"} placeholder="Enter person's name" />
                                                <FosFormField label="Concerned Department" value={formData.concernedDept} isTyping={typingField === "concernedDept"} placeholder="Enter department" />
                                                <FosFormField label="Previous History" value={formData.history} isTyping={typingField === "history"} placeholder="Enter previous history" />
                                                <FosFormField label="Proposed Solution" value={formData.solution} isTyping={typingField === "solution"} placeholder="Enter proposed solution" />
                                            </motion.div>

                                            {/* ── File Upload ── */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: phase >= 3.7 || showAnonymity ? 1 : 0 }}
                                                className="mb-3"
                                            >
                                                <div className="bg-[#f8fafb] p-3 rounded-lg border border-[#e2e8f0]">
                                                    <label className="text-[8px] font-semibold text-[#1a202c] block mb-1.5">Upload Supporting Documents - دستاویزات اپ لوڈ کریں</label>
                                                    <div className="border-2 border-dashed border-[#60BA81]/40 bg-white rounded-lg p-3 flex flex-col items-center text-center gap-1">
                                                        <motion.div
                                                            animate={{ y: [0, -3, 0] }}
                                                            transition={{ duration: 2, repeat: Infinity }}
                                                            className="text-[#284952]/40"
                                                        >
                                                            <UploadCloud size={16} />
                                                        </motion.div>
                                                        <p className="text-[7px] text-[#284952] font-medium">Drag and drop files here or click to select files</p>
                                                    </div>
                                                    {phase >= 3.7 && !showAnonymity && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 5 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="mt-2 flex items-center gap-2"
                                                        >
                                                            <span className="text-[7px] text-[#4a5568] italic">payslip_nov_24.pdf (1.2MB)</span>
                                                            <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                                                                <motion.div
                                                                    className="h-full bg-gradient-to-r from-[#60BA81] to-[#28C840]"
                                                                    initial={{ width: 0 }}
                                                                    animate={{ width: "100%" }}
                                                                    transition={{ duration: 2 }}
                                                                />
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                    <p className="text-[6px] text-[#4a5568] mt-1 opacity-60">Maximum file size: 5MB. Allowed formats: JPG, PNG, PDF, DOC, XLS</p>
                                                </div>
                                            </motion.div>

                                            {/* ── Submit Button ── */}
                                            <div className="border-t border-[#e2e8f0] pt-3 flex justify-center mb-2">
                                                <div className="px-8 py-2 rounded-lg text-white text-[9px] font-bold shadow-md cursor-pointer"
                                                    style={{ background: "linear-gradient(135deg, #F5A83C, #e69426)" }}
                                                >
                                                    Submit
                                                </div>
                                            </div>

                                            {/* ── Protection Banner (anonymity) ── */}
                                            <AnimatePresence>
                                                {showProtection && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                                        className="bg-gradient-to-r from-[#60BA81]/10 to-[#284952]/10 rounded-lg border-2 border-dashed border-[#60BA81] p-2.5 flex items-center gap-2 mb-3"
                                                    >
                                                        <motion.div
                                                            animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                                        >
                                                            <Shield className="text-[#60BA81]" size={16} strokeWidth={2} />
                                                        </motion.div>
                                                        <div>
                                                            <p className="text-[8px] font-semibold text-[#60BA81]">Protected from employer</p>
                                                            <p className="text-[6px] text-[#60BA81]/70">Your identity is safely hidden</p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* ── Anonymous Ticket Overlay (Phase 7) ── */}
                                            <AnimatePresence>
                                                {showAnonymousTicket && (
                                                    <motion.div
                                                        className="absolute inset-0 bg-[#F8F9FA]/95 backdrop-blur-md z-50 flex items-center justify-center p-6"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0, transition: { duration: 0.6 } }}
                                                    >
                                                        <motion.div
                                                            className="w-full max-w-md bg-white shadow-2xl rounded-lg overflow-hidden border-t-[6px] border-[#60BA81]"
                                                            initial={{ scale: 0.9, y: 20 }}
                                                            animate={{ scale: 1, y: 0 }}
                                                            exit={{ scale: 0.9, y: -20 }}
                                                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                                        >
                                                            <div className="p-8 flex flex-col items-center">
                                                                <div className="mb-6">
                                                                    <div className="w-20 h-20 bg-[#60BA81]/10 rounded-full flex items-center justify-center">
                                                                        <Shield className="text-[#60BA81]" size={40} strokeWidth={2} />
                                                                    </div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="mb-2 flex items-center justify-center gap-2">
                                                                        <span className="bg-[#60BA81]/15 text-[#60BA81] text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider">Anonymous Ticket</span>
                                                                    </div>
                                                                    <h1 className="text-[25px] font-bold text-[#212529] mb-3">{trackingId}</h1>
                                                                    <p className="text-[#6C757D] text-sm mb-8 px-4">
                                                                        Your complaint has been registered anonymously. Your identity is hidden from the employer.
                                                                    </p>
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                        className="px-6 py-2.5 border border-[#60BA81] text-[#60BA81] rounded font-medium text-sm hover:bg-[#60BA81] hover:text-white transition-colors duration-300"
                                                                    >
                                                                        Track Status
                                                                    </motion.button>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                        </div>
                                    </div>

                                    {/* ── TICKET CONFIRMATION OVERLAY (Phase 4) ── */}
                                    <AnimatePresence>
                                        {showTicket && (
                                            <motion.div
                                                className="absolute inset-0 bg-[#F8F9FA]/95 backdrop-blur-md z-50 flex items-center justify-center p-6"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, transition: { duration: 0.6 } }}
                                            >
                                                <motion.div
                                                    className="w-full max-w-md bg-white shadow-2xl rounded-lg overflow-hidden border-t-[6px] border-[#198754]"
                                                    initial={{ scale: 0.9, y: 20 }}
                                                    animate={{ scale: 1, y: 0 }}
                                                    exit={{ scale: 0.9, y: -20 }}
                                                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                                >
                                                    <div className="p-8 flex flex-col items-center">
                                                        <div className="mb-6">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-[#198754]" width="75" height="75"
                                                                fill="currentColor" viewBox="0 0 16 16">
                                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                                                            </svg>
                                                        </div>
                                                        <div className="text-center">
                                                            <h1 className="text-[25px] font-bold text-[#212529] mb-3">WH020289-1121437</h1>
                                                            <p className="text-[#6C757D] text-sm mb-8">
                                                                Your ticket number has been generated successfully.
                                                            </p>
                                                            <motion.button
                                                                whileHover={{ scale: 1.05 }}
                                                                whileTap={{ scale: 0.95 }}
                                                                className="px-6 py-2.5 border border-[#198754] text-[#198754] rounded font-medium text-sm hover:bg-[#198754] hover:text-white transition-colors duration-300"
                                                            >
                                                                Register Another Complaint
                                                            </motion.button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </motion.div>
            </div>
        </div>
    )
}
