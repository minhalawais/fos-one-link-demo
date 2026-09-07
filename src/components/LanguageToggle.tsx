"use client"

import React from "react"
import { motion } from "framer-motion"

interface LanguageToggleProps {
  language: "en" | "ur"
  onToggle: (lang: "en" | "ur") => void
  isCompact?: boolean
}

// Floating pill toggle for switching interface language between English and Urdu
export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  language,
  onToggle,
  isCompact = false,
}) => {
  // Handle language switch
  const toggleLanguage = () => {
    onToggle(language === "en" ? "ur" : "en")
  }

  return (
    <div
      onClick={toggleLanguage}
      className={`relative flex items-center bg-white/90 backdrop-blur-md rounded-full border border-white/80 shadow-[0_8px_32px_rgba(40,73,82,0.12)] pointer-events-auto select-none cursor-pointer transition-all duration-200 ${
        isCompact
          ? "h-[28px] w-[118px] p-0.5"
          : "h-[32px] w-[132px] p-0.5"
      }`}
      title="Click to toggle language"
    >
      {/* English Option */}
      <div
        className={`relative flex-1 h-full rounded-full transition-colors duration-200 flex items-center justify-center font-bold z-10 ${
          isCompact ? "text-[10px]" : "text-[11px]"
        } ${language === "en" ? "text-white" : "text-[#284952]/70"}`}
      >
        {language === "en" && (
          <motion.div
            layoutId="lang-active-pill"
            className="absolute inset-0 bg-[#284952] rounded-full shadow-sm"
            transition={{ type: "spring", stiffness: 450, damping: 32 }}
          />
        )}
        <span className="relative z-10 tracking-wider">English</span>
      </div>

      {/* Urdu Option */}
      <div
        className={`relative flex-1 h-full rounded-full transition-colors duration-200 flex items-center justify-center font-bold z-10 ${
          isCompact ? "text-[11px]" : "text-[12px]"
        } ${language === "ur" ? "text-white" : "text-[#284952]/70"}`}
      >
        {language === "ur" && (
          <motion.div
            layoutId="lang-active-pill"
            className="absolute inset-0 bg-[#284952] rounded-full shadow-sm"
            transition={{ type: "spring", stiffness: 450, damping: 32 }}
          />
        )}
        <span className={`relative z-10 font-urdu leading-none pt-0.5 ${
          isCompact ? "text-[12px]" : "text-[13px]"
        }`}>
          اردو
        </span>
      </div>
    </div>
  )
}

export default LanguageToggle
