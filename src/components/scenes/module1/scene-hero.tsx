// scene-hero.tsx - REFINED Apple Aesthetic Update
"use client"

import { motion } from "framer-motion"
import { Zap, Shield, Users } from "lucide-react"

export const SceneHero = ({ isActive }: { isActive: boolean }) => {
  return (
    // Light Gray Background with a subtle Green/Teal radial gradient
    <div className="w-full h-full flex items-center justify-center bg-[#F5F5F7] relative overflow-hidden p-4">

      {/* Refined Subtle Background Radial Gradient (Breathing Effect) */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{ background: 'radial-gradient(circle at center, #60BA81 0%, transparent 50%)' }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 80, damping: 15 }} // Snappier spring
        className="relative z-10 text-center w-full max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }} // Faster entrance
          className="mb-4"
        >
          {/* Elegant Logo Treatment with subtle continuous float */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
            className="w-28 h-28 mx-auto mb-5 bg-white rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.12)] flex items-center justify-center ring-4 ring-white/40"
          >
            {/* The FOS Logo */}
            <img src="/assets/images/FOS-01.png" alt="FOS" className="w-24 h-24 object-contain" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }} // Faster entrance
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#284952] mb-4 tracking-tighter leading-snug"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Fruit of Sustainability
        </motion.h1>

        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }} // Faster entrance
          className="text-sm sm:text-base md:text-lg text-[#767676] font-light mb-8"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Your Partner in Grievance Management
        </motion.p>
      </motion.div>
    </div>
  )
}