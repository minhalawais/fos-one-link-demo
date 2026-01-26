"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Hash, Briefcase } from "lucide-react"
import { ENHANCED_TIMING } from "../upload-utils/timing.ts"

interface DataPacket {
    id: string
    name: string
    dept: string
    role: string
}

interface DataStreamProps {
    progress: number
    data: DataPacket[]
}

export const DataStream: React.FC<DataStreamProps> = ({ progress, data }) => {
    const isActive = progress >= ENHANCED_TIMING.STREAM_START && progress < ENHANCED_TIMING.INTEGRATION_COMPLETE

    if (!isActive) return null

    // Calculate stream speed (accelerates over time)
    const streamProgress = (progress - ENHANCED_TIMING.STREAM_START) / (ENHANCED_TIMING.INTEGRATION_COMPLETE - ENHANCED_TIMING.STREAM_START)
    const speed = 1 + streamProgress * 2 // Speed increases from 1x to 3x

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
            <AnimatePresence>
                {data.map((packet, index) => {
                    const delay = index * 0.8
                    const shouldShow = progress >= ENHANCED_TIMING.STREAM_START + delay

                    if (!shouldShow) return null

                    return (
                        <motion.div
                            key={packet.id}
                            className="absolute left-1/4 top-1/2"
                            initial={{ x: 0, y: -100 + index * 40, opacity: 0, scale: 0.8 }}
                            animate={{
                                x: [0, 150, 300, 450],
                                y: [-100 + index * 40, -80 + index * 40, -60 + index * 40, -40 + index * 40],
                                opacity: [0, 1, 1, 0],
                                scale: [0.8, 1, 1, 0.9]
                            }}
                            transition={{
                                duration: 3 / speed,
                                ease: "easeInOut",
                                times: [0, 0.2, 0.8, 1]
                            }}
                            exit={{ opacity: 0, scale: 0.5 }}
                        >
                            <div className="bg-white/90 backdrop-blur-md border border-[#60BA81]/30 rounded-xl p-2 shadow-lg min-w-[200px] relative overflow-hidden">
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#60BA81]/20 to-transparent animate-pulse" />

                                {/* Content */}
                                <div className="relative z-10 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-[#E6F4EA] rounded-lg flex items-center justify-center shrink-0">
                                        <User size={16} className="text-[#60BA81]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[10px] font-bold text-[#284952] truncate">{packet.name}</div>
                                        <div className="text-[8px] text-gray-500 font-mono">{packet.id}</div>
                                    </div>
                                </div>

                                {/* Department badge */}
                                <div className="mt-1 flex items-center gap-1">
                                    <Hash size={10} className="text-gray-400" />
                                    <span className="text-[8px] text-gray-600">{packet.dept}</span>
                                </div>

                                {/* Trail effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-[#60BA81]/0 via-[#60BA81]/30 to-[#60BA81]/0"
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "200%" }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                />
                            </div>
                        </motion.div>
                    )
                })}
            </AnimatePresence>

            {/* Counter */}
            <motion.div
                className="absolute top-1/4 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
            >
                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-[#60BA81]/30">
                    <div className="flex items-center gap-2">
                        <motion.div
                            className="w-2 h-2 bg-[#60BA81] rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                        <span className="text-xs font-bold text-[#284952]">
                            Syncing: {Math.min(data.length, Math.floor(streamProgress * data.length))}/{data.length}
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
