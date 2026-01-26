"use client"

import React from "react"
import { motion } from "framer-motion"
import { Server, Wifi, Activity } from "lucide-react"

interface NetworkNodesProps {
    active: boolean
}

export const NetworkNodes: React.FC<NetworkNodesProps> = ({ active }) => {
    const nodes = [
        { angle: 0, label: "Auth" },
        { angle: 60, label: "DB" },
        { angle: 120, label: "API" },
        { angle: 180, label: "Cache" },
        { angle: 240, label: "Queue" },
        { angle: 300, label: "Log" }
    ]

    if (!active) return null

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Center node */}
            <motion.div
                className="w-16 h-16 bg-[#E6F4EA] rounded-full flex items-center justify-center border-4 border-[#60BA81]/20 shadow-lg relative z-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
                <Server size={24} className="text-[#60BA81]" />

                {/* Pulse rings */}
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[#60BA81]"
                    animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[#60BA81]"
                    animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
            </motion.div>

            {/* Surrounding nodes */}
            {nodes.map((node, index) => {
                const radius = 100
                const x = Math.cos((node.angle * Math.PI) / 180) * radius
                const y = Math.sin((node.angle * Math.PI) / 180) * radius

                return (
                    <React.Fragment key={node.label}>
                        {/* Connection line */}
                        <svg className="absolute w-full h-full" style={{ maxWidth: "400px", maxHeight: "400px" }}>
                            <motion.line
                                x1="50%"
                                y1="50%"
                                x2={`calc(50% + ${x}px)`}
                                y2={`calc(50% + ${y}px)`}
                                stroke="#60BA81"
                                strokeWidth="2"
                                strokeDasharray="4,4"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.3 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                            />
                        </svg>

                        {/* Node */}
                        <motion.div
                            className="absolute"
                            style={{
                                left: `calc(50% + ${x}px)`,
                                top: `calc(50% + ${y}px)`,
                                transform: "translate(-50%, -50%)"
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.1, type: "spring", stiffness: 200, damping: 15 }}
                        >
                            <div className="relative">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-200">
                                    <Activity size={14} className="text-[#284952]" />
                                </div>
                                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                    <span className="text-[8px] font-medium text-gray-600 bg-white px-1.5 py-0.5 rounded shadow-sm">
                                        {node.label}
                                    </span>
                                </div>

                                {/* Activity indicator */}
                                <motion.div
                                    className="absolute -top-1 -right-1 w-3 h-3 bg-[#60BA81] rounded-full"
                                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                                />
                            </div>
                        </motion.div>
                    </React.Fragment>
                )
            })}
        </div>
    )
}
