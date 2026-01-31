import React from "react"
import { motion } from "framer-motion"

export const CompanyBadge = ({ active, type = "company" }: any) => (
    <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{
            scale: active ? 1 : 0,
            rotate: active ? 0 : -180
        }}
        transition={{ type: "spring", stiffness: 150, damping: 18 }}
        className="relative"
    >
        <div className="relative w-24 h-24 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-full shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] border border-white/80 ring-1 ring-black/5 flex items-center justify-center p-4">
            {type === "company" ? (
                <img
                    src="/assets/images/company_a.png"
                    alt="Company"
                    className="w-full h-full object-contain drop-shadow-sm"
                />
            ) : (
                <img
                    src="/assets/images/FOS-01.png"
                    alt="FOS"
                    className="w-full h-full object-contain drop-shadow-sm"
                />
            )}

            {/* Pulse Ring */}
            {active && (
                <motion.div
                    className="absolute inset-0 border-2 border-[#60BA81] rounded-full z-[-1]"
                    animate={{
                        scale: [1, 1.25],
                        opacity: [0.6, 0]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut"
                    }}
                />
            )}
        </div>
    </motion.div>
)
