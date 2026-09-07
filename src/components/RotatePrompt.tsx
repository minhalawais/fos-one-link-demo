"use client"

import React from "react"
import { motion } from "framer-motion"

interface RotatePromptProps {
  language: "en" | "ur"
}

/**
 * RotatePrompt — shown only on mobile portrait mode.
 * Prompts the user to rotate their device to landscape.
 * Never rendered on desktop (useDeviceInfo.isMobilePortrait is always false on desktop).
 */
export const RotatePrompt: React.FC<RotatePromptProps> = ({ language }) => {
  const isUrdu = language === "ur"

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8"
      style={{
        background: "linear-gradient(135deg, #1E2A2D 0%, #0F1A1D 50%, #172628 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Ambient glow blobs — purely decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-[#60BA81]/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-[#284952]/20 blur-3xl" />
      </div>

      {/* FOS Brand pill */}
      <motion.div
        className="flex items-center gap-3 bg-white/10 backdrop-blur-lg px-5 py-2.5 rounded-full border border-white/10 relative z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <img src="/assets/FOS-01.png" alt="FOS" className="w-7 h-7 object-contain" />
        <span className="text-xs font-bold tracking-wider text-white/80 uppercase">
          Fruit of Sustainability
        </span>
      </motion.div>

      {/* Animated phone rotation icon */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
      >
        {/* Pulsing glow ring behind the phone */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-[#60BA81]/20 blur-xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Phone icon rotates 0 → 90° repeatedly to hint "rotate device" */}
        <motion.div
          className="relative w-24 h-24 rounded-3xl border-2 border-[#60BA81]/60 flex items-center justify-center bg-[#60BA81]/10"
          animate={{ rotate: [0, 0, 90, 90, 90, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 0.8,
            times: [0, 0.15, 0.45, 0.75, 0.85, 1],
            ease: "easeInOut",
          }}
        >
          {/* Simple phone SVG */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <rect
              x="5" y="2" width="14" height="20" rx="3"
              stroke="#60BA81" strokeWidth="1.5"
            />
            <circle cx="12" cy="18.5" r="1" fill="#60BA81" />
            <rect x="9" y="4" width="6" height="1" rx="0.5" fill="#60BA81" fillOpacity="0.5" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Instructional text */}
      <motion.div
        className="text-center px-10 space-y-2 relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        dir={isUrdu ? "rtl" : "ltr"}
      >
        <p
          className={`font-bold ${
            isUrdu
              ? "font-urdu text-2xl leading-relaxed text-white"
              : "text-white text-xl"
          }`}
        >
          {isUrdu
            ? "بہتر تجربے کے لیے فون کو افقی کریں"
            : "Please rotate your device"}
        </p>
        <p
          className={`text-white/50 ${
            isUrdu ? "font-urdu text-base" : "text-sm"
          }`}
        >
          {isUrdu
            ? "یہ ڈیمو لینڈاسکیپ موڈ میں بہتر کام کرتا ہے"
            : "This interactive demo is designed for landscape mode"}
        </p>
      </motion.div>

      {/* Module colour dots — brand cue */}
      <motion.div
        className="flex gap-2.5 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        {(["#60BA81", "#F5A83C", "#60BA81", "#3B82F6", "#8B5CF6"] as const).map(
          (color, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
              animate={{ opacity: [0.25, 1, 0.25] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          )
        )}
      </motion.div>
    </motion.div>
  )
}

export default RotatePrompt
