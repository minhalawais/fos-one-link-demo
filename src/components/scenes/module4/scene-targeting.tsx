"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
    X, Plus, Filter, Calendar, Check, Hash, Building2, Users, CreditCard
} from "lucide-react"
import { useEffect, useRef } from "react"

// --- SYSTEM COLORS ---
const COLORS = {
    teal: "#0f9690",
    darkTeal: "#284952",
    green: "#60BA81",
    charcoal: "#17161A",
    orange: "#F5A83C",
    white: "#FFFFFF",
    bg: "#F5F5F7",
    border: "#DEE2E6",
    softGreen: "rgba(96, 186, 129, 0.42)",
}

interface SceneProps {
    isActive: boolean
    progress: number
}

// ==========================================
// SCENE TARGETING (26-46s)
// "Spotlight Focus" Interaction Model
// ==========================================

export const SceneTargeting = ({ isActive, progress }: SceneProps) => {
    const modalContentRef = useRef<HTMLDivElement>(null)

    // Local time relative to scene start (26s)
    const localT = Math.max(0, progress - 26)

    // Auto-scroll to Filters at start of scene (Run once)
    const hasScrolledRef = useRef(false)
    useEffect(() => {
        if (!hasScrolledRef.current && localT < 1 && modalContentRef.current) {
            modalContentRef.current.scrollTo({ top: 400, behavior: 'smooth' })
            hasScrolledRef.current = true
        }
    }, [localT])

    // --- FOCUS LOGIC ---
    // 0-2s: Offices
    // 2-4s: Gender
    // 4-6s: Dept
    // 6s-13s: IDs (Sampling Start at 7s)
    // 13s+: CNICs

    let currentFocus = 'none'
    if (localT > 1 && localT < 3) currentFocus = 'offices'
    else if (localT >= 3 && localT < 5) currentFocus = 'gender'
    else if (localT >= 5 && localT < 7) currentFocus = 'dept'
    else if (localT >= 7 && localT < 13) currentFocus = 'ids'
    else if (localT >= 13) currentFocus = 'cnics'

    // Typing simulation
    const samplingT = Math.max(0, localT - 7)
    const sampleIDs = "EMP-042, EMP-089, EMP-103, EMP-156, EMP-204"
    const currentIDs = samplingT > 0 ? sampleIDs.substring(0, Math.floor(samplingT * 8)) : ""

    const sampleCNICs = "35202-1844932-1, 35201-9928374-3, 33100-9283711-2"
    const currentCNICs = samplingT > 6 ? sampleCNICs.substring(0, Math.floor((samplingT - 6) * 10)) : ""

    let showOffices = localT > 1
    let showGender = localT > 3
    let showDept = localT > 5

    // EXIT LOGIC (Start at 18s local -> 44s global)
    const isExiting = localT > 18

    // Force visible when exiting
    if (isExiting) {
        showOffices = true
        showGender = true
        showDept = true
        currentFocus = 'none'
    }

    return (
        <div className="w-full h-full font-sans overflow-hidden relative" style={{ backgroundColor: COLORS.bg }}>
            <motion.div
                initial={{ opacity: 1 }}
                animate={isExiting ? { y: -800, opacity: 0 } : { y: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-8 absolute inset-0"
            >
                <div className="relative w-full max-w-5xl">
                    {/* SUCCESS TOAST on Exit */}
                    <AnimatePresence>
                        {isExiting && (
                            <motion.div
                                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] bg-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 text-xl font-bold"
                            >
                                <div className="p-2 bg-white/20 rounded-full"><Check size={24} /></div>
                                Survey Launched Successfully!
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        className="w-full bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-full"
                        style={{ filter: isExiting ? "blur(4px)" : "none" }} // Blur the modal backing as we leave
                        layout
                    >
                        {/* Header with increased padding matching SceneInitiation */}
                        <div className="h-28 flex items-center justify-between px-8 bg-gradient-to-r relative z-20"
                            style={{ background: `linear-gradient(90deg, ${COLORS.teal}, ${COLORS.darkTeal})` }}
                        >
                            <div>
                                <div className="flex items-center gap-3 text-white mb-2">
                                    <Plus size={28} strokeWidth={3} /> <h2 className="text-3xl font-bold">Add New Survey</h2>
                                </div>
                                <p className="text-white/90 text-sm font-medium">Create a new survey with advanced filters and settings</p>
                            </div>
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                                <X size={20} className="text-white" />
                            </div>
                        </div>

                        {/* Content - Hidden Scrollbar */}
                        <div
                            ref={modalContentRef}
                            className="p-8 space-y-8 overflow-hidden relative h-full bg-[#F8FAFC]"
                        >

                            {/* === SECTION 1: BASIC INFO (Blurred) === */}
                            <motion.div
                                animate={{
                                    filter: isExiting ? "blur(0px)" : "blur(3px)",
                                    opacity: isExiting ? 1 : 0.4,
                                }}
                                className="space-y-4 pointer-events-none origin-top"
                            >
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">SURVEY TITLE:</label>
                                    <div className="h-12 bg-white border border-gray-300 rounded-lg px-4 flex items-center text-sm shadow-sm text-gray-700">
                                        Employee Wellbeing Survey - Q1 2026
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">DESCRIPTION:</label>
                                    <div className="h-24 bg-white border border-gray-300 rounded-lg p-4 text-sm shadow-sm text-gray-600">
                                        A regular pulse check to screen the general sentiment, wellbeing and safety of our employees across all branches.
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div><label className="text-xs font-bold text-gray-500 uppercase mb-1 block">QUESTION COUNT:</label><div className="h-12 bg-white border border-gray-300 rounded-lg px-4 flex items-center text-sm shadow-sm">35</div></div>
                                    <div><label className="text-xs font-bold text-gray-500 uppercase mb-1 block">ESTIMATED TIME (MINUTES):</label><div className="h-12 bg-white border border-gray-300 rounded-lg px-4 flex items-center text-sm shadow-sm">15</div></div>
                                </div>
                            </motion.div>

                            {/* === SECTION 2: FILTERS === */}
                            <div className="pt-2 relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <Filter size={20} style={{ color: COLORS.teal, fill: COLORS.teal }} />
                                    <h3 className="font-bold text-xl text-gray-800">Survey Filters</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-x-6 gap-y-4">

                                    {/* 1. OFFICES */}
                                    <FocusArea label="OFFICES" isActive={currentFocus === 'offices' || isExiting} icon={<Building2 size={12} />} height="h-12">
                                        <div className="h-full px-1.5 flex items-center overflow-hidden">
                                            <AnimatePresence>
                                                {showOffices ? (
                                                    <motion.div
                                                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                                        className="bg-green-100 text-green-700 px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2"
                                                    >
                                                        <Building2 size={12} /> Head Office <X size={10} className="cursor-pointer hover:text-green-900" />
                                                    </motion.div>
                                                ) : <span className="text-gray-400 ml-2 text-sm">Select options...</span>}
                                            </AnimatePresence>
                                        </div>
                                    </FocusArea>

                                    {/* 2. GENDER */}
                                    <FocusArea label="GENDER" isActive={currentFocus === 'gender' || isExiting} icon={<Users size={12} />} height="h-12">
                                        <div className="h-full px-1.5 flex items-center overflow-hidden">
                                            <AnimatePresence>
                                                {showGender ? (
                                                    <motion.div
                                                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                                        className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2"
                                                    >
                                                        <Users size={12} /> Female <X size={10} className="cursor-pointer hover:text-purple-900" />
                                                    </motion.div>
                                                ) : <span className="text-gray-400 ml-2 text-sm">Select options...</span>}
                                            </AnimatePresence>
                                        </div>
                                    </FocusArea>

                                    {/* 3. EMPLOYEE IDS */}
                                    <FocusArea
                                        label="EMPLOYEE IDS"
                                        isActive={currentFocus === 'ids' || isExiting}
                                        icon={<Hash size={12} />}
                                        height="h-24"
                                    >
                                        <div className="h-full p-3 font-mono text-sm leading-relaxed">
                                            {currentIDs.length > 0 ? (
                                                <span className="text-gray-800">{currentIDs}<span className="inline-block w-1.5 h-4 bg-green-500 ml-1 animate-pulse align-middle" /></span>
                                            ) : <span className="text-gray-400 italic">Enter employee IDs...</span>}
                                        </div>
                                    </FocusArea>

                                    {/* 4. DEPARTMENT */}
                                    <FocusArea label="DEPARTMENT" isActive={currentFocus === 'dept' || isExiting} icon={<Building2 size={12} />} height="h-12">
                                        <div className="h-full px-1.5 flex items-center overflow-hidden">
                                            <AnimatePresence>
                                                {showDept ? (
                                                    <motion.div
                                                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                                        className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2"
                                                    >
                                                        <Building2 size={12} /> IT Support <X size={10} className="cursor-pointer hover:text-blue-900" />
                                                    </motion.div>
                                                ) : <span className="text-gray-400 ml-2 text-sm">Select options...</span>}
                                            </AnimatePresence>
                                        </div>
                                    </FocusArea>

                                    {/* 5. COMPANY IDS */}
                                    <div className="space-y-1 opacity-50 filter blur-[2px]">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">COMPANY IDS:</label>
                                        <div className="bg-white border border-gray-300 rounded-lg p-3 text-sm shadow-sm h-24 flex items-center">
                                            <span className="text-gray-400">Enter company IDs...</span>
                                        </div>
                                    </div>

                                    {/* 6. CNICS */}
                                    <FocusArea
                                        label="CNICS"
                                        isActive={currentFocus === 'cnics' || isExiting}
                                        icon={<CreditCard size={12} />}
                                        height="h-24"
                                    >
                                        <div className="h-full p-3 font-mono text-sm leading-relaxed">
                                            {currentCNICs.length > 0 ? (
                                                <span className="text-gray-800">{currentCNICs}<span className="inline-block w-1.5 h-4 bg-green-500 ml-1 animate-pulse align-middle" /></span>
                                            ) : <span className="text-gray-400 italic">Enter CNICs...</span>}
                                        </div>
                                    </FocusArea>

                                </div>
                            </div>

                            {/* Footer */}
                            <div className="pt-2 flex justify-end gap-3 opacity-80">
                                <button className="px-6 py-3 rounded-lg border border-gray-200 text-gray-600 font-bold text-sm bg-white hover:bg-gray-50 shadow-sm">Cancel</button>
                                <button className="px-6 py-3 rounded-lg text-white font-bold text-sm flex items-center gap-2 shadow-md" style={{ backgroundColor: COLORS.green }}>
                                    <Plus size={18} strokeWidth={3} /> Add Survey
                                </button>
                            </div>

                        </div>
                    </motion.div >
                </div>
            </motion.div >
        </div >
    )
}

// ==========================================
//  HELPER COMPONENTS
// ==========================================

const FocusArea = ({ label, isActive, children, icon, height = "h-24" }: { label: string, isActive: boolean, children: React.ReactNode, icon: React.ReactNode, height?: string }) => {
    return (
        <div className="space-y-1 relative z-20">
            <motion.div
                animate={{ color: isActive ? COLORS.teal : "#6B7280" }}
                className="flex items-center gap-1 mb-1"
            >
                <span className="text-[10px] font-bold uppercase tracking-wide">{label}</span>
                {isActive && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-600">{icon}</motion.span>}
            </motion.div>

            <motion.div
                animate={{
                    scale: isActive ? 1.05 : 1,
                    borderColor: isActive ? COLORS.teal : "#D1D5DB",
                    boxShadow: isActive ? `0 10px 25px -5px rgba(15, 150, 144, 0.2), 0 8px 10px -6px rgba(15, 150, 144, 0.1)` : "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                    zIndex: isActive ? 30 : 0,
                    filter: isActive ? "blur(0px)" : "blur(2px)",
                    opacity: isActive ? 1 : 0.5
                }}
                transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                className={`bg-white border rounded-lg ${height} overflow-hidden relative`}
            >
                {/* Active Indicator Strip */}
                {isActive && <motion.div layoutId="activeStrip" className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-green-600" />}

                {children}
            </motion.div>
        </div>
    )
}


