"use client"

import { motion } from "framer-motion"
import { Send, Radio } from "lucide-react"

export const NetworkBroadcast = ({ active }: { active: boolean }) => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">

            {/* Central Tower */}
            <div className="relative z-20 flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-100 relative">
                    <Radio size={32} className="text-[#284952]" />

                    {/* Ping Animation */}
                    {active && (
                        <motion.div
                            className="absolute inset-0 bg-[#60BA81]/20 rounded-2xl"
                            animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    )}
                </div>
                <div className="w-2 h-12 bg-gray-300 rounded-b-lg" />
            </div>

            {/* Broadcast Waves */}
            {active && [1, 2, 3].map((layer) => (
                <motion.div
                    key={layer}
                    className="absolute border border-[#60BA81]/30 rounded-full"
                    initial={{ width: 50, height: 50, opacity: 1 }}
                    animate={{ width: 600, height: 600, opacity: 0 }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: layer * 1.2,
                        ease: "linear"
                    }}
                />
            ))}

            {/* Message Packets */}
            {active && [1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                    key={`packet-${i}`}
                    className="absolute z-10 bg-[#F5A83C] p-1.5 rounded-full shadow-sm"
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{
                        x: Math.cos(i) * 150,
                        y: Math.sin(i) * 150,
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeOut"
                    }}
                >
                    <Send size={10} className="text-white" />
                </motion.div>
            ))}

        </div>
    )
}
