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
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="mb-4"
        >
          {/* Elegant Logo Treatment with subtle continuous float */}
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
            className="w-20 h-20 mx-auto mb-3 bg-white rounded-2xl shadow-2xl flex items-center justify-center border border-gray-100"
          >
            {/* The FOS Cube */}
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#60BA81] to-[#284952] flex items-center justify-center">
              <span className="text-white text-xl font-bold tracking-widest">FOS</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }} // Quicker delay
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#284952] mb-4 tracking-tighter leading-snug"
        >
          Fruit of Sustainability
        </motion.h1>

        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }} // Quicker delay
          className="text-lg sm:text-xl md:text-2xl text-[#767676] font-light mb-8"
        >
          Your Partner in Grievance Management
        </motion.p>
      </motion.div>
    </div>
  )
}