import React from "react"
import { motion } from "framer-motion"

export const BackgroundEffects = () => (
    <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
            className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-[#60BA81]/10 rounded-full blur-3xl"
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
            className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-[#284952]/10 rounded-full blur-3xl"
            animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity }}
        />

        {/* Grid Pattern */}
        <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
                backgroundImage: 'radial-gradient(circle, #284952 1px, transparent 1px)',
                backgroundSize: '50px 50px'
            }}
        />
    </div>
)
