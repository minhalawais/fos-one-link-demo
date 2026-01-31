import React, { useMemo } from "react"
import { motion } from "framer-motion"

export const DataParticleStream = ({ active, direction = "right" }: any) => {
    const particles = useMemo(() =>
        Array.from({ length: 20 }, (_, i) => ({
            id: i,
            delay: i * 0.15,
            duration: 2 + Math.random() * 1,
            size: 3 + Math.random() * 3,
            yOffset: (Math.random() - 0.5) * 40
        })), []
    )

    if (!active) return null

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-gradient-to-r from-[#60BA81] to-[#F5A83C]"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: direction === "right" ? "-10px" : "auto",
                        right: direction === "left" ? "-10px" : "auto",
                        top: `calc(50% + ${p.yOffset}px)`
                    }}
                    initial={{
                        x: 0,
                        opacity: 0,
                        scale: 0
                    }}
                    animate={{
                        x: direction === "right" ? 400 : -400,
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1, 1, 0]
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    )
}
