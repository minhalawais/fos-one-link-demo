import React from "react"
import { motion, AnimatePresence } from "framer-motion"

export const HolographicGlow = ({ active, color = "#60BA81" }: any) => (
    <AnimatePresence>
        {active && (
            <>
                <motion.div
                    className="absolute inset-0 rounded-3xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                        background: `radial-gradient(circle at 50% 50%, ${color}40, transparent 70%)`,
                        filter: "blur(20px)"
                    }}
                />
                <motion.div
                    className="absolute inset-0 rounded-3xl border-2"
                    style={{ borderColor: color }}
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.02, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </>
        )}
    </AnimatePresence>
)
