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
    green: "#60BA81",
    charcoal: "#17161A",
    orange: "#F5A83C",
    white: "#FFFFFF",
    bg: "#F5F5F7",
    border: "#DEE2E6",
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
    else if (localT < 16) currentFocus = 'offices'
    else if (localT < 18) currentFocus = 'gender'
    else if (localT < 20) currentFocus = 'dept'
    else if (localT < 22) currentFocus = 'unit'
    else if (localT < 27) currentFocus = 'ids'
    else if (localT < 32) currentFocus = 'cnics'

    const showLangDropdown = localT > 6.5 && localT < 11.5
    const isUrduActive = localT >= 7.5 && localT < 12
    const showSuccessToast = localT >= 32 && localT < 34.5

    const currentTitle = isUrduActive ? "ملازمین کی بہبود کا سروے - سہ ماہی 1 2026" : "Employee Wellbeing Survey - Q1 2026"
    const currentDesc = isUrduActive ? "تمام برانچوں میں ہمارے ملازمین کے عمومی جذبات، بہبود اور حفاظت کی جانچ کرنے کے لیے ایک باقاعدہ نبض چیک۔" : "A regular pulse check to screen the general sentiment, wellbeing and safety of our employees across all branches."

    const currentIDs = localT > 22 ? "EMP-042, EMP-089, EMP-103, EMP-156, EMP-204".substring(0, Math.floor((localT - 22) * 12)) : ""
    const currentCNICs = localT > 27 ? "35202-1844932-1, 35201-9928374-3, 33100-9283711-2".substring(0, Math.floor((localT - 27) * 15)) : ""

    return (
        <div className="w-full h-full font-sans overflow-hidden relative">
            {/* Standard div instead of motion.div to avoid transition locks */}
            <div className="w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-[2px] z-10 p-6 absolute inset-0">
                <div className="relative w-full max-w-4xl h-[85%] flex flex-col">

                    {/* SUCCESS TOAST */}
                    <AnimatePresence>
                        {showSuccessToast && (
                            <motion.div
                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-lg font-bold"
                            >
                                <Check size={20} /> Survey Launched Successfully!
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="w-full bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col h-full border border-gray-100 relative">
                        {/* Header */}
                        <div className="h-16 flex items-center justify-between px-6 shrink-0" style={{ background: `linear-gradient(90deg, ${COLORS.teal}, ${COLORS.darkTeal})` }}>
                            <div className="flex flex-col text-white">
                                <div className="flex items-center gap-2">
                                    <Plus size={20} strokeWidth={3} /> <h2 className="text-xl font-bold">Add New Survey</h2>
                                </div>
                            </div>
                            <X size={16} className="text-white cursor-pointer" />
                        </div>

                        {/* Scrollable Form Content */}
                        <div ref={modalContentRef} className="p-6 space-y-6 overflow-y-auto flex-1 bg-[#F8FAFC]">
                            <FocusArea label="SURVEY TITLE" isActive={currentFocus === 'title' || currentFocus === 'lang'} icon={<Languages size={10} />} height="h-10">
                                <div className={`h-full px-3 flex items-center text-xs ${isUrduActive ? "text-right justify-end font-serif text-base text-green-700" : "text-gray-700"}`}>
                                    {currentTitle}
                                </div>
                            </FocusArea>

                            <FocusArea label="DESCRIPTION" isActive={currentFocus === 'desc' || currentFocus === 'lang'} icon={<FileText size={10} />} height="h-20">
                                <div className={`h-full p-3 text-[11px] ${isUrduActive ? "text-right font-serif text-sm leading-relaxed" : "text-gray-600"}`}>
                                    {currentDesc}
                                </div>
                            </FocusArea>

                            <div className="grid grid-cols-2 gap-4">
                                <FocusArea label="EXPIRY DATE" isActive={currentFocus === 'date'} icon={<Calendar size={10} />} height="h-10">
                                    <div className="h-full px-3 flex items-center justify-between text-xs text-gray-800">
                                        <span>Feb 28, 2026</span> <Calendar size={14} className="text-gray-400" />
                                    </div>
                                </FocusArea>

                                <FocusArea label="SURVEY LANGUAGE" isActive={currentFocus === 'lang'} icon={<Globe size={10} />} height="h-10">
                                    <div className="h-full px-3 flex items-center justify-between text-xs relative">
                                        <div className="flex items-center gap-1.5 font-bold text-gray-700">
                                            <span>{isUrduActive ? "🇵🇰 Urdu (اردو)" : "🇺🇸 English"}</span>
                                        </div>
                                        <ChevronDown size={14} className="text-gray-400" />
                                        {showLangDropdown && (
                                            <div className="absolute top-10 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-2">
                                                <div className={`p-2 rounded flex justify-between text-[10px] ${isUrduActive ? 'bg-teal-50 text-teal-700' : 'text-gray-600'}`}>
                                                    Urdu (اردو) {isUrduActive && <Check size={10} />}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </FocusArea>
                            </div>

                            {/* Targeted Filters */}
                            <div className="pt-2 space-y-4">
                                <div className="flex items-center gap-2 pb-1 border-b border-gray-100">
                                    <Filter size={16} style={{ color: COLORS.teal }} />
                                    <h3 className="font-bold text-gray-800">Survey Filters</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <FocusArea label="OFFICES" isActive={currentFocus === 'offices'} icon={<Building2 size={10} />} height="h-11">
                                        <div className="h-full px-2 flex items-center">
                                            {localT > 14 && <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-[10px] font-bold">Head Office</span>}
                                        </div>
                                    </FocusArea>
                                    <FocusArea label="GENDER" isActive={currentFocus === 'gender'} icon={<Users size={10} />} height="h-11">
                                        <div className="h-full px-2 flex items-center">
                                            {localT > 16 && <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-[10px] font-bold">Female</span>}
                                        </div>
                                    </FocusArea>
                                    <FocusArea label="DEPARTMENT" isActive={currentFocus === 'dept'} icon={<Building2 size={10} />} height="h-11">
                                        <div className="h-full px-2 flex items-center">
                                            {localT > 18 && <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-[10px] font-bold">IT Support</span>}
                                        </div>
                                    </FocusArea>
                                    <FocusArea label="DESIGNATION" isActive={currentFocus === 'unit'} icon={<Layers size={10} />} height="h-11">
                                        <div className="h-full px-2 flex items-center">
                                            {localT > 20 && <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded text-[10px] font-bold">Cloud Ops</span>}
                                        </div>
                                    </FocusArea>
                                    <FocusArea label="EMPLOYEE IDS" isActive={currentFocus === 'ids'} icon={<Hash size={10} />} height="h-24">
                                        <div className="h-full p-3 font-mono text-[11px] text-gray-800">{currentIDs}</div>
                                    </FocusArea>
                                    <FocusArea label="CNICS" isActive={currentFocus === 'cnics'} icon={<CreditCard size={10} />} height="h-24">
                                        <div className="h-full p-3 font-mono text-[11px] text-gray-800">{currentCNICs}</div>
                                    </FocusArea>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-3 bg-white border-t flex justify-end gap-3">
                            <button className="px-6 py-1.5 rounded-lg text-white font-extrabold text-[11px]" style={{ backgroundColor: COLORS.green }}>
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
            <span className={`text-[9px] font-extrabold uppercase tracking-widest ${isActive ? 'text-teal-600' : 'text-gray-400'}`}>{label}</span>
            {isActive && icon}
        </div>
        <div className={`bg-white border rounded-lg ${height} transition-all duration-300 ${isActive ? 'border-teal-500 shadow-md scale-[1.01]' : 'border-gray-200 opacity-60'}`}>
            {children}
        </div>
    </div>
)