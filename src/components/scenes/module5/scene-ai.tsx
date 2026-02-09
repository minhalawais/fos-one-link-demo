import { motion, AnimatePresence } from "framer-motion"
import { Search, Bell, Settings, LogOut, Download, FileText, X, CheckSquare, AlertCircle, Sparkles } from "lucide-react"

interface SceneProps {
    isActive: boolean
    progress: number
}

const IOS_EASE = [0.32, 0.72, 0, 1]

export const SceneAI = ({ isActive, progress }: SceneProps) => {
    // Phase mapping: 118s - 128s
    const isDetailPhase = progress >= 118 && progress < 128
    const showSummaryFocus = progress >= 120 && progress < 124
    const showRCAPAFocus = progress >= 124 && progress < 128

    const complaints = [
        {
            id: "WB280103-1101146",
            category: "Wages & Benefits",
            company: "1 COMMERCIAL",
            location: "1 COMMERCIAL",
            status: "Completed",
            date: "Jan 28, 2026",
            summary: "Phone Snatching Incident Reimbursement Not Processed",
            rcacapa: "Employee ineligible for compensation due to non-compliance with mobile sharing policy.",
            isHighlighted: true
        },
        {
            id: "XX280102-11XXXX",
            category: "Workplace Discipline",
            company: "1 COMMERCIAL",
            location: "1 COMMERCIAL",
            status: "In Process",
            date: "Jan 28, 2026",
            summary: "Unfair Blame for Delivery Delays Due to Traffic Conditions",
        },
        {
            id: "WB280103-1101264",
            category: "Wages & Benefits",
            company: "GOLRA MOR",
            location: "GOLRA MOR",
            status: "In Process",
            date: "Jan 28, 2026",
            summary: "Pending Incentive for Gulbahar Branch Opening Not Received",
        }
    ]

    return (
        <div className="w-full h-full bg-[#17161A]/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
                transition={{ duration: 0.8, ease: IOS_EASE }}
                className="w-[96%] max-w-[1500px] max-h-[92%] bg-white rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden border border-gray-200"
            >
                {/* Modal Header */}
                <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between bg-white relative z-50">
                    <h2 className="text-[16px] font-bold text-gray-400">Complaints Detail</h2>
                    <div className="flex items-center gap-3">
                        <button className="bg-[#60BA81] hover:bg-[#52a370] text-white px-3 py-1.5 rounded flex items-center gap-2 text-[10px] font-bold shadow-sm transition-colors">
                            <Download size={12} /> Download Data
                        </button>
                        <X className="text-gray-300 w-5 h-5 cursor-pointer hover:text-gray-500 transition-colors" />
                    </div>
                </div>

                {/* Modal Content - Scrollable Ticket Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50">
                    {complaints.map((c, i) => (
                        <motion.div
                            key={c.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: (c.isHighlighted && (showSummaryFocus || showRCAPAFocus)) ? 1.01 : 1,
                                filter: (!c.isHighlighted && (showSummaryFocus || showRCAPAFocus)) ? "blur(2px)" : "none"
                            }}
                            transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                            className="bg-white rounded-xl border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-5 relative overflow-hidden group"
                        >
                            {/* Card Header Info */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="space-y-0.5">
                                    <h3 className="text-[13px] font-black text-[#284952] tracking-tight">{c.id}</h3>
                                    <div className="text-[10px] text-[#60BA81] font-bold uppercase">{c.company}</div>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="text-[10px] text-[#60BA81] font-bold uppercase">{c.category}</div>
                                    <div className="text-[10px] text-gray-400 font-medium uppercase">{c.location}</div>
                                </div>

                                <div className="text-right">
                                    <div className="bg-[#F5A83C] text-white text-[10px] font-bold px-8 py-1 rounded inline-block uppercase tracking-wider">
                                        {c.status}
                                    </div>
                                    <div className="text-[9px] text-gray-400 font-bold mt-1.5">Jan 28, 2026</div>
                                </div>
                            </div>

                            {/* AI Summary Blocks - Row Layout */}
                            <div className="flex gap-4">
                                {/* Complaint Summary */}
                                <motion.div
                                    animate={{
                                        borderColor: showSummaryFocus ? "#F5A83C" : "#E5E7EB",
                                        boxShadow: showSummaryFocus ? "0 4px 20px rgba(0,0,0,0.08)" : "none"
                                    }}
                                    className="flex-1 border border-gray-100 border-l-[4px] border-l-[#FF5353] rounded-xl p-4 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-500"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-5 h-5 rounded-full bg-[#FF5353] flex items-center justify-center text-white">
                                            <Sparkles size={10} fill="currentColor" />
                                        </div>
                                        <span className="text-[11px] font-bold text-[#284952] uppercase tracking-wide">Complaint Summary</span>
                                    </div>
                                    <div className="pl-7 py-1 border-l border-gray-100">
                                        <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                                            {c.summary}
                                        </p>
                                    </div>
                                </motion.div>

                                {/* RCA/CAPA Summary */}
                                <motion.div
                                    animate={{
                                        borderColor: showRCAPAFocus ? "#60BA81" : "#E5E7EB",
                                        boxShadow: showRCAPAFocus ? "0 4px 20px rgba(0,0,0,0.08)" : "none"
                                    }}
                                    className={`flex-1 border border-gray-100 border-l-[4px] border-l-[#21D683] rounded-xl p-4 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-500 ${!c.rcacapa ? 'opacity-30 grayscale' : ''}`}
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-5 h-5 rounded-full bg-[#21D683] flex items-center justify-center text-white">
                                            <Sparkles size={10} fill="currentColor" />
                                        </div>
                                        <span className="text-[11px] font-bold text-[#284952] uppercase tracking-wide">RCA/CAPA Summary</span>
                                    </div>
                                    <div className="pl-7 py-1 border-l border-gray-100 min-h-[22px]">
                                        <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                                            {c.rcacapa || "Investigation in progress. RCA/CAPA results pending review."}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}
