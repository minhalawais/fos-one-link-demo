import React from "react"
import { motion } from "framer-motion"

export const Card3D = ({ children, className = "", delay = 0, isActive = false }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 30, rotateX: -10, scale: 0.9 }}
        animate={{
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            boxShadow: isActive
                ? "0 30px 60px -10px rgba(96, 186, 129, 0.3), 0 10px 20px -5px rgba(0, 0, 0, 0.05)"
                : "0 25px 50px -12px rgba(0, 0, 0, 0.08)"
        }}
        transition={{
            duration: 0.8,
            delay,
            type: "spring",
            stiffness: 80,
            damping: 20
        }}
        className={`bg-white/90 backdrop-blur-3xl border border-white/50 rounded-[2rem] shadow-sm ${className}`}
        style={{
            transformStyle: "preserve-3d",
            perspective: "1200px"
        }}
    >
        {children}
    </motion.div>
)
