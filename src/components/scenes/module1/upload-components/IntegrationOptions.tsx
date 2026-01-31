import React from "react"
import { motion } from "framer-motion"
import { FileSpreadsheet, Database, CheckCircle2 } from "lucide-react"

export const IntegrationOptions = ({ active, selectedOption }: any) => {
    const options = [
        {
            id: "csv",
            icon: FileSpreadsheet,
            title: "CSV Upload",
            desc: "Share employee list",
            color: "#F5A83C"
        },
        {
            id: "hrms",
            icon: Database,
            title: "HRMS Integration",
            desc: "Secure API connection",
            color: "#60BA81"
        }
    ]

    if (!active) return null

    return (
        <div className="flex gap-3 justify-center">
            {options.map((option, idx) => {
                const Icon = option.icon
                const isSelected = selectedOption === option.id

                return (
                    <motion.div
                        key={option.id}
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: isSelected ? 1.05 : 1
                        }}
                        transition={{ delay: idx * 0.15, type: "spring" }}
                        className={`
              relative p-3 rounded-2xl border transition-all duration-500 cursor-pointer
              ${isSelected
                                ? 'bg-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] border-[#60BA81]'
                                : 'bg-white/50 border-transparent hover:bg-white hover:shadow-md'}
            `}
                    >
                        {/* Selection Indicator */}
                        {isSelected && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#60BA81] rounded-full flex items-center justify-center shadow-md ring-2 ring-white"
                            >
                                <CheckCircle2 size={12} className="text-white" />
                            </motion.div>
                        )}

                        <div className="flex flex-col items-center gap-1.5 min-w-[120px]">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-inner"
                                style={{ backgroundColor: `${option.color}15` }}
                            >
                                <Icon size={20} style={{ color: option.color }} />
                            </div>
                            <div className="text-center">
                                <div className="text-xs font-bold text-[#284952]">{option.title}</div>
                                <div className="text-[9px] text-gray-500">{option.desc}</div>
                            </div>
                        </div>

                        {/* Glow Effect */}
                        {isSelected && (
                            <motion.div
                                className="absolute inset-0 rounded-2xl z-[-1]"
                                style={{
                                    background: `radial-gradient(circle at center, ${option.color}15, transparent 70%)`,
                                    filter: "blur(15px)"
                                }}
                                animate={{ opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        )}
                    </motion.div>
                )
            })}
        </div>
    )
}
