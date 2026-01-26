"use client"

import { motion } from "framer-motion"
import { MessageSquare } from "lucide-react"

export const FeaturePhone = ({ active }: { active: boolean }) => {
    return (
        <motion.div
            className="relative w-40 h-72 bg-[#17161A] rounded-3xl border-4 border-[#383838] shadow-2xl flex flex-col items-center p-3"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: active ? 0 : 50, opacity: active ? 1 : 0 }}
        >
            {/* Top Speaker */}
            <div className="w-12 h-1.5 bg-[#383838] rounded-full mb-4" />

            {/* Screen */}
            <div className="w-full h-32 bg-[#9EA792] rounded-md border-2 border-[#888] mb-4 relative overflow-hidden font-mono text-[8px] p-2 shadow-inner">
                <div className="flex justify-between border-b border-black/20 pb-1 mb-1">
                    <span>T-Mobile</span>
                    <span>12:00</span>
                </div>

                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.2, repeat: 3, repeatType: "reverse" }} // Blinking effect
                        className="flex items-center gap-1 mb-1"
                    >
                        <MessageSquare size={10} />
                        <span className="font-bold">1 NEW MSG</span>
                    </motion.div>
                )}

                {active && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                        <div>FRO: FOS Hotline</div>
                        <div className="leading-tight mt-1">
                            Your FOS ID is 123. Dial *123# to report. Free SMS.
                        </div>
                    </motion.div>
                )}

                <div className="absolute inset-0 bg-black/5 pointer-events-none" style={{ backgroundSize: '2px 2px', backgroundImage: 'radial-gradient(black 1px, transparent 0)' }} />
            </div>

            {/* Keypad */}
            <div className="w-full grid grid-cols-3 gap-2 px-1">
                <div className="col-span-3 flex justify-evenly mb-1">
                    <div className="w-8 h-3 bg-gray-600 rounded-sm" />
                    <div className="w-8 h-3 bg-gray-600 rounded-sm" />
                </div>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((key) => (
                    <div key={key} className="h-6 bg-[#2a2a2a] rounded-sm flex items-center justify-center shadow-sm active:translate-y-px transition-transform">
                        <span className="text-white/50 text-[10px] font-bold">{key}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}
