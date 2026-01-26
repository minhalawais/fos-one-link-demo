"use client"

import React from "react"
import { motion } from "framer-motion"

interface ConfettiBurstProps {
    trigger: boolean
    colors?: string[]
    particleCount?: number
    duration?: number
}

export const ConfettiBurst: React.FC<ConfettiBurstProps> = ({
    trigger,
    colors = ["#60BA81", "#284952", "#F5A83C"],
    particleCount = 30,
    duration = 2
}) => {
    const particles = React.useMemo(
        () =>
            Array.from({ length: particleCount }, (_, i) => ({
                id: i,
                color: colors[Math.floor(Math.random() * colors.length)],
                angle: (Math.PI * 2 * i) / particleCount,
                velocity: Math.random() * 200 + 100,
                size: Math.random() * 8 + 4,
                rotation: Math.random() * 360
            })),
        [particleCount, colors]
    )

    if (!trigger) return null

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((particle) => {
                const x = Math.cos(particle.angle) * particle.velocity
                const y = Math.sin(particle.angle) * particle.velocity

                return (
                    <motion.div
                        key={particle.id}
                        className="absolute top-1/2 left-1/2 rounded-sm"
                        style={{
                            width: particle.size,
                            height: particle.size,
                            backgroundColor: particle.color
                        }}
                        initial={{
                            x: 0,
                            y: 0,
                            opacity: 1,
                            rotate: 0
                        }}
                        animate={{
                            x,
                            y,
                            opacity: 0,
                            rotate: particle.rotation
                        }}
                        transition={{
                            duration,
                            ease: "easeOut"
                        }}
                    />
                )
            })}
        </div>
    )
}
