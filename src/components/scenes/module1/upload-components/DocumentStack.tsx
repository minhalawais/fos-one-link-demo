"use client"

import React from "react"
import { motion } from "framer-motion"
import { FileSpreadsheet, CheckCircle2 } from "lucide-react"
import { TypewriterText } from "./TypewriterText.tsx"

interface DocumentStackProps {
    progress: number
    startTime: number
    endTime: number
}

export const DocumentStack: React.FC<DocumentStackProps> = ({ progress, startTime, endTime }) => {
    const isActive = progress >= startTime && progress < endTime
    const phaseProgress = Math.min(1, Math.max(0, (progress - startTime) / (endTime - startTime)))

    const showStack = phaseProgress >= 0
    const showOrganize = phaseProgress >= 0.2
    const showPreview = phaseProgress >= 0.5
    const showReady = phaseProgress >= 0.8

    if (!isActive) return null

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Document Stack */}
            <div className="relative">
                {/* Background papers */}
                {showStack && (
                    <>
                        <motion.div
                            className="absolute w-32 h-40 bg-white border border-gray-200 rounded-lg shadow-md"
                            initial={{ x: -10, y: -10, rotate: -5, opacity: 0 }}
                            animate={{
                                x: showOrganize ? 0 : -10,
                                y: showOrganize ? 0 : -10,
                                rotate: showOrganize ? 0 : -5,
                                opacity: 1
                            }}
                            transition={{ duration: 0.5 }}
                        />
                        <motion.div
                            className="absolute w-32 h-40 bg-white border border-gray-200 rounded-lg shadow-md"
                            initial={{ x: 10, y: -5, rotate: 5, opacity: 0 }}
                            animate={{
                                x: showOrganize ? 0 : 10,
                                y: showOrganize ? 0 : -5,
                                rotate: showOrganize ? 0 : 5,
                                opacity: 1
                            }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        />
                    </>
                )}

                {/* Main document */}
                <motion.div
                    className="relative w-32 h-40 bg-white border-2 border-[#60BA81] rounded-lg shadow-xl overflow-hidden"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {/* Header */}
                    <div className="bg-[#E6F4EA] p-2 flex items-center justify-center gap-2">
                        <FileSpreadsheet size={16} className="text-[#60BA81]" />
                        <div className="text-[8px] font-bold text-[#284952]">
                            {showReady ? "Pak_Region_1.csv" : (
                                <TypewriterText text="Pak_Region_1.csv" speed={30} cursor={false} />
                            )}
                        </div>
                    </div>

                    {/* Preview content */}
                    {showPreview && (
                        <motion.div
                            className="p-2 space-y-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {["Name", "ID", "Department", "Role"].map((field, index) => (
                                <motion.div
                                    key={field}
                                    className="flex items-center gap-1"
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="w-1 h-1 bg-[#60BA81] rounded-full" />
                                    <span className="text-[7px] text-gray-600">{field}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* Ready checkmark */}
                    {showReady && (
                        <motion.div
                            className="absolute bottom-2 right-2 bg-[#60BA81] rounded-full p-1"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <CheckCircle2 size={12} className="text-white" />
                        </motion.div>
                    )}

                    {/* Glow effect */}
                    {showReady && (
                        <motion.div
                            className="absolute inset-0 border-2 border-[#60BA81] rounded-lg"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    )}
                </motion.div>
            </div>

            {/* Processing indicator */}
            {!showReady && showStack && (
                <motion.div
                    className="mt-4 flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <motion.div
                        className="w-1.5 h-1.5 bg-[#60BA81] rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                    <motion.div
                        className="w-1.5 h-1.5 bg-[#60BA81] rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                        className="w-1.5 h-1.5 bg-[#60BA81] rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                </motion.div>
            )}
        </div>
    )
}
