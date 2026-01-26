"use client"

import { motion } from "framer-motion"
import { ShieldCheck, User } from "lucide-react"

export const IdGenerator = ({ active }: { active: boolean }) => {
    return (
        <div className="relative w-64 h-40 flex items-center justify-center">
            {/* Blueprint/Wireframe Background */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: active ? 1 : 0 }}
                className="absolute inset-0 border-2 border-dashed border-[#60BA81]/30 rounded-xl"
            />

            {/* Floating Particles coalescing */}
            {active && (
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-[#60BA81] rounded-full"
                            initial={{ x: Math.random() * 200 - 100, y: Math.random() * 200 - 100, opacity: 0 }}
                            animate={{ x: 0, y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                        />
                    ))}
                </div>
            )}

            {/* The Logical ID Card */}
            <motion.div
                className="relative z-10 bg-white/90 backdrop-blur-md w-48 h-28 rounded-xl shadow-xl border border-[#60BA81]/20 overflow-hidden flex flex-col p-3"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: active ? 1 : 0.8, opacity: active ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <div className="flex justify-between items-start mb-2">
                    <div className="bg-[#284952] p-1 rounded-md">
                        <ShieldCheck size={12} className="text-white" />
                    </div>
                    <div className="text-[8px] font-bold text-[#60BA81] bg-[#E6F4EA] px-1.5 py-0.5 rounded-full">
                        FOS-ID
                    </div>
                </div>

                <div className="mt-1">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mb-1">
                        <User size={12} className="text-gray-400" />
                    </div>
                    <div className="h-2 w-24 bg-gray-100 rounded mb-1" />
                    <div className="h-2 w-16 bg-gray-100 rounded" />
                </div>

                {/* Scanning Effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                />
            </motion.div>
        </div>
    )
}
