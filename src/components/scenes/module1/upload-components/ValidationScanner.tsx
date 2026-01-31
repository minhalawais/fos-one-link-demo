import React from "react"
import { motion } from "framer-motion"
import { CheckSquare, Sparkles } from "lucide-react"

export const ValidationScanner = ({ active, employees, validatedCount }: any) => {
    if (!active) return null

    return (
        <div className="space-y-2">
            {/* Scanner Beam */}
            <motion.div
                className="absolute left-0 right-0 h-12 pointer-events-none z-20"
                style={{
                    background: "linear-gradient(to bottom, transparent, rgba(96, 186, 129, 0.2), transparent)",
                    borderTop: "1px solid rgba(96, 186, 129, 0.3)",
                    borderBottom: "1px solid rgba(96, 186, 129, 0.3)"
                }}
                initial={{ top: 0 }}
                animate={{ top: "100%" }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Employee Rows */}
            {employees.map((emp: any, idx: number) => {
                const isValidated = idx < validatedCount

                return (
                    <motion.div
                        key={emp.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`
              relative flex items-center gap-3 p-3 rounded-xl transition-all duration-500
              ${isValidated
                                ? 'bg-gradient-to-r from-[#E6F4EA] to-white border-2 border-[#60BA81]/30'
                                : 'bg-white/60 border border-gray-200'}
            `}
                    >
                        {/* Checkbox */}
                        <motion.div
                            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all
                ${isValidated ? 'bg-[#60BA81] border-[#60BA81]' : 'border-gray-300'}`}
                            animate={isValidated ? { scale: [1, 1.2, 1] } : {}}
                        >
                            {isValidated && (
                                <motion.div
                                    initial={{ scale: 0, rotate: -90 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                >
                                    <CheckSquare size={16} className="text-white" />
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Employee Info */}
                        <div className="flex-1 grid grid-cols-12 gap-2 items-center">
                            <div className="col-span-4">
                                <div className="text-sm font-bold text-[#284952]">{emp.name}</div>
                                <div className="text-[10px] text-gray-400 font-mono">{emp.id}</div>
                            </div>
                            <div className="col-span-3">
                                <span className="text-[10px] text-gray-500 font-mono bg-gray-50 px-1 py-0.5 rounded">{emp.cnic}</span>
                            </div>
                            <div className="col-span-3">
                                <span className="text-[11px] px-2 py-1 bg-gray-100 rounded-md truncate block">
                                    {emp.dept}
                                </span>
                            </div>
                            <div className="col-span-2 text-right">
                                <span className="text-[11px] text-gray-600 truncate block">{emp.role}</span>
                            </div>
                        </div>

                        {/* Validation Badge */}
                        {isValidated && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="absolute top-2 right-2 bg-[#60BA81] text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
                            >
                                <Sparkles size={10} />
                                VALIDATED
                            </motion.div>
                        )}

                        {/* Scan Effect */}
                        {!isValidated && (
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#60BA81]/10 to-transparent"
                                initial={{ x: "-100%" }}
                                animate={{ x: "200%" }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: idx * 0.2
                                }}
                            />
                        )}
                    </motion.div>
                )
            })}
        </div>
    )
}
