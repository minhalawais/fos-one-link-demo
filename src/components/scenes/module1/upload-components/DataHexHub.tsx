"use client"

import React from "react"
import { motion } from "framer-motion"
import { Hexagon, Cpu } from "lucide-react"

// Brand Color for Company A
const CLIENT_BLUE = "#007AFF"

export const DataHexHub = ({ active, isHandshake }: { active: boolean; isHandshake: boolean }) => {
    return (
        <motion.div
            className="relative flex items-center justify-center w-24 h-24"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
        >
            {/* Outer Rotating Hexagon Frame */}
            <motion.div
                className="absolute inset-0 border-2 border-dashed rounded-xl opacity-20"
                style={{ borderColor: CLIENT_BLUE }}
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            {/* Main Glass-morphic Hexagon */}
            <motion.div
                className="relative z-10 w-16 h-16 bg-white/40 backdrop-blur-xl rounded-2xl flex items-center justify-center border shadow-xl"
                style={{
                    borderColor: isHandshake ? CLIENT_BLUE : "rgba(0,0,0,0.1)",
                    boxShadow: isHandshake ? `0 0 30px ${CLIENT_BLUE}40` : "none"
                }}
                animate={isHandshake ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <Hexagon
                    size={32}
                    className="transition-colors duration-500"
                    style={{ color: isHandshake ? CLIENT_BLUE : "#767676" }}
                />

                {/* Internal "Active" Core */}
                {active && (
                    <motion.div
                        className="absolute"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.2, 0.6, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Cpu size={14} style={{ color: CLIENT_BLUE }} />
                    </motion.div>
                )}
            </motion.div>

            {/* Connection Pulse Rings */}
            {isHandshake && (
                <motion.div
                    className="absolute inset-0 rounded-full border-2"
                    style={{ borderColor: CLIENT_BLUE }}
                    initial={{ scale: 0.5, opacity: 0.8 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                />
            )}
        </motion.div>
    )
}
