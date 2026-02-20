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
            id: "WH170205-1101285",
            category: "Working Hours",
            company: "1 COMMERCIAL",
            location: "1 COMMERCIAL",
            status: "Closed",
            date: "Feb 17, 2026",
            summary: "Forced Extra Working Hours Without Overtime Compensation",
            rcacapa: "Employee claimed overtime for submitting apology after checkout, HR to monitor.",
            isHighlighted: true
        },
        {
            id: "XX170204-11XXXX",
            category: "Workplace Discipline",
            company: "1 COMMERCIAL",
            location: "1 COMMERCIAL",
            status: "Closed",
            date: "Feb 17, 2026",
            summary: "Unprofessional Behavior by Kitchen Manager Mr. Shahid",
            rcacapa: "Employee's bad behavior addressed through counseling and coaching.",
        },
        {
            id: "WB160206-1140050",
            category: "Wages & Benefits",
            company: "WAH CANTT TXA",
            location: "WAH CANTT TXA",
            status: "Completed",
            date: "Feb 16, 2026",
            summary: "Pending Clearance Amount Not Received on Time",
            rcacapa: "Employee's payment delayed due to missing documents, now resolved with payment expected within 1-2 days.",
        },
        {
            id: "XX110208-11XXXX",
            category: "Workplace Discipline",
            company: "GOLRA MOR",
            location: "GOLRA MOR",
            status: "Completed",
            date: "Feb 11, 2026",
            summary: "Disrespectful Behavior Towards Riders at Golra Mor Branch",
            rcacapa: "Employees coached on professional behavior, trainer assigned to improve employee interactions.",
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
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white relative z-50">
                    <h2 className="text-[18px] font-medium text-gray-500">Complaints Detail</h2>
                    <div className="flex items-center gap-3">
                        <button className="bg-[#60BA81] hover:bg-[#52a370] text-white px-4 py-2 rounded flex items-center gap-2 text-[11px] font-bold shadow-sm transition-colors">
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
                            className="bg-white rounded-lg border border-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 relative overflow-visible group"
                        >
                            {/* Card Header Info */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="space-y-1">
                                    <h3 className="text-[15px] font-black text-[#284952] tracking-tight">{c.id}</h3>
                                    <div className="text-[11px] text-[#60BA81] font-black uppercase tracking-tight">{c.company}</div>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="text-[11px] text-[#60BA81] font-black uppercase tracking-tight">{c.category}</div>
                                    <div className="text-[11px] text-[#284952] font-black uppercase tracking-tight">{c.location}</div>
                                </div>

                                <div className="text-right">
                                    <div className={`${c.status === 'Closed' ? 'bg-[#F5A83C]' : 'bg-[#F5A83C]'} text-white text-[11px] font-black px-12 py-1.5 rounded inline-block uppercase tracking-widest`}>
                                        {c.status}
                                    </div>
                                    <div className="text-[11px] text-gray-400 font-bold mt-2">{c.date}</div>
                                </div>
                            </div>

                            {/* AI Summary Blocks - Row Layout */}
                            <div className="flex gap-6">
                                {/* Complaint Summary */}
                                <motion.div
                                    animate={{
                                        borderColor: showSummaryFocus ? "#F5A83C" : "rgba(229, 231, 235, 0.5)",
                                        boxShadow: showSummaryFocus ? "0 8px 30px rgba(0,0,0,0.12)" : "none"
                                    }}
                                    className="flex-1 border border-gray-100 border-t-[4px] border-t-[#FF5353] rounded-lg p-5 bg-[#F8F9FA]/30 hover:bg-white transition-all duration-500"
                                >
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-5 h-5 rounded-full bg-[#FF5353] flex items-center justify-center text-white shadow-sm">
                                            <AlertCircle size={10} fill="currentColor" strokeWidth={3} />
                                        </div>
                                        <span className="text-[12px] font-black text-[#284952] uppercase tracking-wider">Complaint Summary</span>
                                    </div>
                                    <div className="pl-7">
                                        <p className="text-[12px] text-gray-500 font-bold leading-relaxed">
                                            {c.summary}
                                        </p>
                                    </div>
                                </motion.div>

                                {/* RCA/CAPA Summary */}
                                <motion.div
                                    animate={{
                                        borderColor: showRCAPAFocus ? "#60BA81" : "rgba(229, 231, 235, 0.5)",
                                        boxShadow: showRCAPAFocus ? "0 8px 30px rgba(0,0,0,0.12)" : "none"
                                    }}
                                    className={`flex-1 border border-gray-100 border-t-[4px] border-t-[#60BA81] rounded-lg p-5 bg-[#F8F9FA]/30 hover:bg-white transition-all duration-500 ${!c.rcacapa ? 'opacity-30 grayscale' : ''}`}
                                >
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-5 h-5 rounded-full bg-[#60BA81] flex items-center justify-center text-white shadow-sm">
                                            <CheckSquare size={10} fill="currentColor" strokeWidth={3} />
                                        </div>
                                        <span className="text-[12px] font-black text-[#284952] uppercase tracking-wider">RCA/CAPA Summary</span>
                                    </div>
                                    <div className="pl-7 min-h-[22px]">
                                        <p className="text-[12px] text-gray-500 font-bold leading-relaxed">
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
