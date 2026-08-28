"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
    X, Plus, Filter, Calendar, Check, Hash, Building2, Users, CreditCard,
    Languages, Globe, ChevronDown, FileText, Layers
} from "lucide-react"
import { useEffect, useRef } from "react"

// --- SYSTEM COLORS ---
const COLORS = {
    teal: "#0f9690",
    darkTeal: "#284952",
    green: "#10B981",
    charcoal: "#17161A",
    vibrantBlue: "#3B82F6",
    cyan: "#06B6D4",
    white: "#FFFFFF",
    bg: "#F8FAFC",
    border: "#E2E8F0",
}

interface SceneProps {
    isActive: boolean
    progress: number
}

export const SceneTargeting = ({ isActive, progress }: SceneProps) => {
    const modalContentRef = useRef<HTMLDivElement>(null)
    const localT = Math.max(0, progress - 12)

    // SCROLL MANAGEMENT
    const hasScrolledFilters = useRef(false)
    const hasScrolledCNIC = useRef(false)

    useEffect(() => {
        if (!modalContentRef.current) return

        if (localT < 1) {
            modalContentRef.current.scrollTo({ top: 0, behavior: 'auto' })
            hasScrolledFilters.current = false
            hasScrolledCNIC.current = false
        }

        if (!hasScrolledFilters.current && localT >= 14 && localT < 15) {
            modalContentRef.current.scrollTo({ top: 320, behavior: 'smooth' })
            hasScrolledFilters.current = true
        }

        if (!hasScrolledCNIC.current && localT >= 27) {
            modalContentRef.current.scrollTo({ top: 650, behavior: 'smooth' })
            hasScrolledCNIC.current = true
        }
    }, [localT])

    // FOCUS & CONTENT LOGIC
    let currentFocus = 'none'
    if (localT < 2.5) currentFocus = 'title'
    else if (localT < 5) currentFocus = 'desc'
    else if (localT < 6.5) currentFocus = 'date'
    else if (localT < 12) currentFocus = 'lang'
    else if (localT < 15.5) currentFocus = 'designation'
    else if (localT < 17) currentFocus = 'dept'
    else if (localT < 18.5) currentFocus = 'unit'
    else if (localT < 20.5) currentFocus = 'gender'
    else if (localT < 26) currentFocus = 'ids'
    else if (localT < 31) currentFocus = 'cnics'

    const showLangDropdown = localT > 6.5 && localT < 11.5
    const isUrduActive = localT >= 7.5 && localT < 12
    const showSuccessToast = localT >= 32 && localT < 34.5

    const currentTitle = isUrduActive ? "ورکرز کی بہبود کا سروے - سہ ماہی 1 2026" : "Employee Wellbeing Survey - Q1 2026"
    const currentDesc = isUrduActive ? "تمام برانچوں میں ہمارے ورکرز کے عمومی جذبات، بہبود اور حفاظت کی جانچ کرنے کے لیے ایک باقاعدہ نبض چیک۔" : "A regular pulse check to screen the general sentiment, wellbeing and safety of our employees across all branches."

    const currentIDs = localT > 21 ? "EMP-042, EMP-089, EMP-103, EMP-156, EMP-204".substring(0, Math.floor((localT - 21) * 12)) : ""
    const currentCNICs = localT > 26 ? "35202-1844932-1, 35201-9928374-3, 33100-9283711-2".substring(0, Math.floor((localT - 26) * 15)) : ""

    return (
        <div className="w-full h-full font-sans overflow-hidden relative">
            {/* Standard div instead of motion.div to avoid transition locks */}
            <div className="w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-[2px] z-10 p-4 absolute inset-0">
                <div className="relative w-full max-w-3xl h-[80%] flex flex-col">

                    {/* SUCCESS TOAST */}
                    <AnimatePresence>
                        {showSuccessToast && (
                            <motion.div
                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] bg-green-600 text-white px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2.5 text-base font-bold"
                            >
                                <Check size={16} /> Survey Launched Successfully!
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="w-full bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col h-full border border-gray-100 relative">
                        {/* Header */}
                        <div className="h-14 flex items-center justify-between px-6 shrink-0" style={{ background: `linear-gradient(90deg, ${COLORS.teal}, ${COLORS.darkTeal})` }}>
                            <div className="flex flex-col text-white">
                                <div className="flex items-center gap-2">
                                    <Plus size={18} strokeWidth={3} /> <h2 className="text-lg font-bold">Add New Survey</h2>
                                </div>
                            </div>
                            <X size={14} className="text-white cursor-pointer" />
                        </div>

                        {/* Scrollable Form Content */}
                        <div ref={modalContentRef} className="p-4 space-y-2.5 overflow-y-auto flex-1 bg-[#F8FAFC]">
                            <FocusArea label="SURVEY TITLE" isActive={currentFocus === 'title' || currentFocus === 'lang'} icon={<Languages size={9} />} height="h-8">
                                <div className={`h-full px-2 flex items-center text-[10px] ${isUrduActive ? "text-right justify-end font-serif text-sm text-green-700" : "text-gray-700"}`}>
                                    {currentTitle}
                                </div>
                            </FocusArea>

                            <FocusArea label="DESCRIPTION" isActive={currentFocus === 'desc' || currentFocus === 'lang'} icon={<FileText size={9} />} height="h-12">
                                <div className={`h-full p-2 text-[9px] ${isUrduActive ? "text-right font-serif text-xs leading-relaxed" : "text-gray-600"}`}>
                                    {currentDesc}
                                </div>
                            </FocusArea>

                            <div className="grid grid-cols-2 gap-3">
                                <FocusArea label="EXPIRY DATE" isActive={currentFocus === 'date'} icon={<Calendar size={9} />} height="h-8">
                                    <div className="h-full px-2 flex items-center justify-between text-[10px] text-gray-800">
                                        <span>Feb 28, 2026</span> <Calendar size={11} className="text-gray-400" />
                                    </div>
                                </FocusArea>

                                <FocusArea label="SURVEY LANGUAGE" isActive={currentFocus === 'lang'} icon={<Globe size={9} />} height="h-8">
                                    <div className="h-full px-2 flex items-center justify-between text-[10px] relative">
                                        <div className="flex items-center gap-1 font-bold text-gray-700">
                                            <span>{isUrduActive ? "🇵🇰 Urdu" : "🇺🇸 English"}</span>
                                        </div>
                                        <ChevronDown size={12} className="text-gray-400" />
                                        {showLangDropdown && (
                                            <div className="absolute top-9 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-1.5">
                                                <div className={`p-1.5 rounded flex justify-between text-[9px] ${isUrduActive ? 'bg-teal-50 text-teal-700' : 'text-gray-600'}`}>
                                                    Urdu {isUrduActive && <Check size={9} />}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </FocusArea>
                            </div>

                            {/* Targeted Filters */}
                            <div className="pt-1 space-y-3">
                                <div className="flex items-center gap-2 pb-1 border-b border-gray-100">
                                    <Filter size={14} style={{ color: COLORS.vibrantBlue }} />
                                    <h3 className="font-bold text-gray-800 text-sm">Target Audience</h3>
                                </div>

                                {/* 2x2 Grid with OR badge in center */}
                                <div className="relative">
                                    <div className="grid grid-cols-2 gap-3">
                                        <FocusArea label="DESIGNATION" isActive={currentFocus === 'designation'} icon={<Layers size={9} />} height="h-9">
                                            <div className="h-full px-2 flex items-center">
                                                {currentFocus === 'designation' && (
                                                    <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[9px] font-bold flex items-center gap-1">
                                                        Manager <X size={7} />
                                                    </motion.span>
                                                )}
                                            </div>
                                        </FocusArea>

                                        <FocusArea label="DEPARTMENT" isActive={currentFocus === 'dept'} icon={<Building2 size={9} />} height="h-9">
                                            <div className="h-full px-2 flex items-center">
                                                {currentFocus === 'dept' && (
                                                    <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-[9px] font-bold flex items-center gap-1">
                                                        IT Support <X size={7} />
                                                    </motion.span>
                                                )}
                                            </div>
                                        </FocusArea>

                                        <FocusArea label="UNIT / BRANCH" isActive={currentFocus === 'unit'} icon={<Building2 size={9} />} height="h-9">
                                            <div className="h-full px-2 flex items-center">
                                                {currentFocus === 'unit' && (
                                                    <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-orange-50 text-orange-700 px-1.5 py-0.5 rounded text-[9px] font-bold flex items-center gap-1">
                                                        Head Office <X size={7} />
                                                    </motion.span>
                                                )}
                                            </div>
                                        </FocusArea>

                                        <FocusArea label="GENDER" isActive={currentFocus === 'gender'} icon={<Users size={9} />} height="h-9">
                                            <div className="h-full px-2 flex items-center">
                                                {currentFocus === 'gender' && (
                                                    <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded text-[9px] font-bold flex items-center gap-1">
                                                        Female <X size={7} />
                                                    </motion.span>
                                                )}
                                            </div>
                                        </FocusArea>
                                    </div>

                                    {/* Central OR Badge */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-gray-400 text-[9px] font-bold w-5 h-5 rounded-full border border-gray-200 shadow-sm flex items-center justify-center z-10">
                                        OR
                                    </div>
                                </div>

                                {/* Random Sampling Section - distinct */}
                                <div className="space-y-2 pt-2 border-t border-dashed border-gray-200 relative">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F8FAFC] text-gray-400 text-[9px] px-2 font-bold">OR SELECT RANDOMLY</div>

                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                        <FocusArea label="EMPLOYEE IDS" isActive={currentFocus === 'ids'} icon={<Hash size={9} />} height="h-14">
                                            <div className="h-full p-2 font-mono text-[9px] text-gray-600 leading-tight">
                                                {currentIDs}
                                            </div>
                                        </FocusArea>
                                        <FocusArea label="CNICS" isActive={currentFocus === 'cnics'} icon={<CreditCard size={9} />} height="h-14">
                                            <div className="h-full p-2 font-mono text-[9px] text-gray-600 leading-tight">
                                                {currentCNICs}
                                            </div>
                                        </FocusArea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-2 bg-white border-t flex justify-end gap-3">
                            <button className="px-4 py-1.5 rounded-lg text-white font-extrabold text-[10px]" style={{ backgroundColor: COLORS.green }}>
                                Add Survey
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const FocusArea = ({ label, isActive, children, icon, height = "h-11" }: { label: string, isActive: boolean, children: React.ReactNode, icon: React.ReactNode, height?: string }) => (
    <div className="space-y-1">
        <div className="flex items-center gap-1 px-0.5">
            <span className={`text-[9px] font-extrabold uppercase tracking-widest ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>{label}</span>
            {isActive && icon}
        </div>
        <div className={`bg-white border rounded-lg ${height} transition-all duration-300 ${isActive ? 'border-blue-500 shadow-md scale-[1.01]' : 'border-gray-200 opacity-60'}`}>
            {children}
        </div>
    </div>
)