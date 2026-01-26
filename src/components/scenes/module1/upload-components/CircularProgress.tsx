"use client"

import React from "react"
import { motion } from "framer-motion"

interface CircularProgressProps {
    value: number
    size?: number
    strokeWidth?: number
    color?: string
    backgroundColor?: string
    className?: string
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
    value,
    size = 60,
    strokeWidth = 4,
    color = "#60BA81",
    backgroundColor = "#E5E7EB",
    className = ""
}) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (value / 100) * circumference

    return (
        <svg
            width={size}
            height={size}
            className={className}
            style={{ transform: "rotate(-90deg)" }}
        >
            {/* Background circle */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={backgroundColor}
                strokeWidth={strokeWidth}
                fill="none"
            />
            {/* Progress circle */}
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
                transition={{ duration: 0.5, ease: "easeInOut" }}
                strokeLinecap="round"
            />
        </svg>
    )
}
