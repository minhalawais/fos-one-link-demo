import React from "react"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

export const SuccessCelebration = ({ active, employeeCount }: any) => {
    if (!active) return null

    return (
        <>
            {/* Confetti */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 50 }).map((_, i) => {
                    const colors = ["#60BA81", "#284952", "#F5A83C"]
                    const color = colors[Math.floor(Math.random() * colors.length)]
                    const angle = (Math.PI * 2 * i) / 50
                    const velocity = 150 + Math.random() * 100
                    const x = Math.cos(angle) * velocity
                    const y = Math.sin(angle) * velocity

                    return (
                        <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-sm"
                            style={{ backgroundColor: color }}
                            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                            animate={{
                                x,
                                y,
                                opacity: 0,
                                rotate: Math.random() * 360
                            }}
                            transition={{ duration: 2, ease: "easeOut" }}
                        />
                    )
                })}
            </div>

            {/* Success Badge */}
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            >
                <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-[#60BA81]">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#60BA81] to-[#284952] rounded-full flex items-center justify-center">
                            <CheckCircle2 size={40} className="text-white" />
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-[#284952] mb-1">System Ready!</div>
                            <div className="text-sm text-gray-600">
                                {employeeCount} employees onboarded successfully
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}
