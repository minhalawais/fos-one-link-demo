"use client"

import React from "react"
import { motion } from "framer-motion"
import { Lock, Unlock, Shield, Zap } from "lucide-react"
import { ENHANCED_TIMING } from "../upload-utils/timing.ts"

interface APIHandshakeProps {
    progress: number
}

export const APIHandshake: React.FC<APIHandshakeProps> = ({ progress }) => {
    const isActive = progress >= ENHANCED_TIMING.HANDSHAKE_START && progress < ENHANCED_TIMING.HANDSHAKE_COMPLETE
    const isLocked = progress >= ENHANCED_TIMING.HANDSHAKE_LOCK
    const isComplete = progress >= ENHANCED_TIMING.HANDSHAKE_COMPLETE

    if (!isActive && !isComplete) return null

    // Calculate handshake progress
    const handshakeProgress = Math.min(
        1,
        Math.max(0, (progress - ENHANCED_TIMING.HANDSHAKE_START) / (ENHANCED_TIMING.HANDSHAKE_COMPLETE - ENHANCED_TIMING.HANDSHAKE_START))
    )

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            {/* Connection Line */}
            <svg className="absolute w-full h-full" style={{ maxWidth: "600px" }}>
                <motion.path
                    d="M 100 200 Q 300 150 500 200"
                    stroke="#60BA81"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: handshakeProgress,
                        opacity: isActive ? 1 : 0
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    strokeDasharray="5,5"
                />

                {/* Animated particles along path */}
                {isActive && (
                    <>
                        <motion.circle
                            r="4"
                            fill="#60BA81"
                            initial={{ offsetDistance: "0%" }}
                            animate={{ offsetDistance: "100%" }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            style={{ offsetPath: "path('M 100 200 Q 300 150 500 200')" } as any}
                        />
                        <motion.circle
                            r="4"
                            fill="#F5A83C"
                            initial={{ offsetDistance: "0%" }}
                            animate={{ offsetDistance: "100%" }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
                            style={{ offsetPath: "path('M 100 200 Q 300 150 500 200')" } as any}
                        />
                    </>
                )}
            </svg>

            {/* Left Hand (HRMS) */}
            <motion.div
                className="absolute left-1/4 top-1/2 -translate-y-1/2"
                initial={{ x: -100, opacity: 0 }}
                animate={{
                    x: isActive ? 0 : -100,
                    opacity: isActive ? 1 : 0
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="relative">
                    <motion.div
                        className="w-20 h-20 bg-gradient-to-br from-[#284952] to-[#60BA81] rounded-2xl flex items-center justify-center shadow-2xl"
                        animate={{
                            scale: isActive ? [1, 1.05, 1] : 1,
                            rotate: isActive ? [0, 5, 0] : 0
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Shield size={32} className="text-white" />
                    </motion.div>

                    {/* Lock icon */}
                    <motion.div
                        className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: isLocked ? 1 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        {isLocked ? (
                            <Lock size={16} className="text-[#60BA81]" />
                        ) : (
                            <Unlock size={16} className="text-gray-400" />
                        )}
                    </motion.div>
                </div>
            </motion.div>

            {/* Right Hand (FOS) */}
            <motion.div
                className="absolute right-1/4 top-1/2 -translate-y-1/2"
                initial={{ x: 100, opacity: 0 }}
                animate={{
                    x: isActive ? 0 : 100,
                    opacity: isActive ? 1 : 0
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="relative">
                    <motion.div
                        className="w-20 h-20 bg-gradient-to-br from-[#60BA81] to-[#284952] rounded-2xl flex items-center justify-center shadow-2xl"
                        animate={{
                            scale: isActive ? [1, 1.05, 1] : 1,
                            rotate: isActive ? [0, -5, 0] : 0
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Zap size={32} className="text-white" />
                    </motion.div>

                    {/* Lock icon */}
                    <motion.div
                        className="absolute -top-2 -left-2 bg-white rounded-full p-1.5 shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: isLocked ? 1 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        {isLocked ? (
                            <Lock size={16} className="text-[#60BA81]" />
                        ) : (
                            <Unlock size={16} className="text-gray-400" />
                        )}
                    </motion.div>
                </div>
            </motion.div>

            {/* Center Badge */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: isLocked ? 1 : 0,
                    opacity: isLocked ? 1 : 0
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
            >
                <div className="bg-white px-4 py-2 rounded-full shadow-xl border-2 border-[#60BA81]">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#60BA81] rounded-full animate-pulse" />
                        <span className="text-xs font-bold text-[#284952]">Secure Connection</span>
                    </div>
                </div>
            </motion.div>

            {/* Success Checkmark */}
            {isComplete && (
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                    <div className="w-24 h-24 bg-[#60BA81] rounded-full flex items-center justify-center shadow-2xl">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <motion.path
                                d="M5 13l4 4L19 7"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                        </svg>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
