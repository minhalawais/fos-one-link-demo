import React from "react"
import { motion } from "framer-motion"
import { Users } from "lucide-react"

export const EmployeeListCard = ({ employees, revealed, progress }: any) => {
    // If revealed is false, we can still render but opacity/height controlled by parent AnimatePresence
    // But let's keep internal safety just in case

    return (
        <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="space-y-2 p-3 bg-gray-50/80 rounded-2xl border border-gray-100/50 shadow-inner">
                <div className="flex items-center gap-2 mb-2 px-1">
                    <div className="w-5 h-5 bg-[#60BA81]/10 rounded-md flex items-center justify-center">
                        <Users size={12} className="text-[#60BA81]" />
                    </div>
                    <span className="text-[11px] font-bold text-[#284952] uppercase tracking-wide">Active Employees</span>
                </div>

                {employees.map((emp: any, idx: number) => (
                    <motion.div
                        key={emp.id}
                        initial={{ opacity: 0, x: -20, y: 10 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{
                            delay: idx * 0.1, // Stagger effect
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                        }}
                        className="flex items-center gap-2 p-2 bg-white rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-gray-100/80 hover:border-[#60BA81]/30 transition-colors"
                    >
                        <div className="w-7 h-7 bg-gradient-to-br from-[#60BA81] to-[#284952] rounded-full flex items-center justify-center text-white text-[9px] font-bold ring-2 ring-white shadow-sm">
                            {emp.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[11px] font-bold text-[#284952] truncate leading-tight">{emp.name}</div>
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] text-gray-400 leading-tight">{emp.dept}</span>
                                <span className="text-[9px] text-gray-300">•</span>
                                <span className="text-[9px] text-gray-500 font-mono leading-tight">{emp.cnic}</span>
                            </div>
                        </div>
                        <div className="w-1.5 h-1.5 bg-[#60BA81] rounded-full shadow-[0_0_8px_rgba(96,186,129,0.8)]" />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
