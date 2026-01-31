import React from "react"
import { motion } from "framer-motion"

export const ProgressRing = ({ progress, size = 120, strokeWidth = 8, color = "#60BA81" }: any) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (progress / 100) * circumference

    return (
        <svg width={size} height={size} className="transform -rotate-90">
            {/* Background */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#E5E7EB"
                strokeWidth={strokeWidth}
                fill="none"
            />
            {/* Progress */}
            <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                strokeLinecap="round"
                transition={{ duration: 0.5, ease: "easeOut" }}
            />
        </svg>
    )
}
