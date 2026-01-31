"use client"

import React, { useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShieldCheck, User, Fingerprint, RefreshCw } from "lucide-react"

export const IdGenerator = ({ active, employee, fosId }: { active: boolean, employee: any, fosId: string }) => {
    // If no employee (safety), return null or loading
    if (!employee) return null

    return (
        <div className="relative w-80 h-48 flex items-center justify-center">
            {/* Background Effects */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: active ? 1 : 0 }}
                className="absolute inset-0 border border-dashed border-[#60BA81]/20 rounded-2xl"
            />

            <AnimatePresence mode="wait">
                <motion.div
                    key={employee.id} // Trigger animation on employee change
                    className="relative z-10 w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100/50 p-4"
                    initial={{ scale: 0.95, opacity: 0, x: 20 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    exit={{ scale: 0.95, opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    {/* Header: ID Status */}
                    <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#284952] p-1.5 rounded-lg">
                                <ShieldCheck size={14} className="text-white" />
                            </div>
                            <span className="text-[10px] font-bold text-[#284952] uppercase tracking-wide">FOS ID Generator</span>
                        </div>
                        {/* Badge that changes state */}
                        <motion.div
                            initial={{ backgroundColor: "#F5A83C" }}
                            animate={{ backgroundColor: "#E6F4EA" }}
                            transition={{ delay: 0.8, duration: 0.2 }}
                            className="px-2 py-0.5 rounded-md flex items-center gap-1"
                        >
                            <motion.span
                                initial={{ opacity: 1, display: "block" }}
                                animate={{ opacity: 0, display: "none" }}
                                transition={{ delay: 0.8 }}
                                className="text-[9px] font-bold text-white flex items-center gap-1"
                            >
                                <RefreshCw size={8} className="animate-spin" /> GEN
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, display: "none" }}
                                animate={{ opacity: 1, display: "block" }}
                                transition={{ delay: 0.8 }}
                                className="text-[9px] font-bold text-[#60BA81]"
                            >
                                Generated
                            </motion.span>
                        </motion.div>
                    </div>

                    {/* Employee Info Row */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#60BA81] to-[#284952] rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-sm">
                            {employee.name.charAt(0)}
                        </div>
                        <div>
                            <div className="text-xs font-bold text-[#284952]">{employee.name}</div>
                            <div className="flex flex-col gap-0.5">
                                <div className="text-[9px] text-gray-400">{employee.dept} • {employee.role}</div>
                                <div className="text-[9px] text-gray-500 font-mono">CNIC: {employee.cnic}</div>
                            </div>
                        </div>
                    </div>

                    {/* Generated ID Field */}
                    <div className="bg-gray-50 rounded-lg p-2 flex items-center justify-between border border-gray-100">
                        <div className="flex items-center gap-2">
                            <Fingerprint size={12} className="text-gray-400" />
                            <span className="text-[10px] text-gray-500 font-mono">FOS-ID</span>
                        </div>
                        <div className="overflow-hidden relative h-4 w-24 text-right">
                            {/* Scramble / Reveal Text */}
                            <motion.div
                                initial={{ y: 0 }}
                                animate={{ y: -20 }}
                                transition={{ delay: 0.8, duration: 0.2, ease: "circIn" }}
                                className="text-[11px] font-mono font-bold text-gray-300 absolute right-0"
                            >
                                •••• ••••
                            </motion.div>
                            <motion.div
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.8, duration: 0.3, type: "spring" }}
                                className="text-[11px] font-mono font-bold text-[#60BA81] absolute right-0"
                            >
                                {fosId.slice(0, 3)}
                                <span className="text-white bg-[#60BA81] px-0.5 rounded ml-0.5">{fosId.slice(-3)}</span>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
