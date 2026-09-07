"use client"

import React from "react"
import { motion } from "framer-motion"
import { MOBILE_TOUCH_TARGET, MODULE_ACCENTS } from "../../lib/mobile-layout"

interface MobileModuleRailProps {
  activeIndex: number
  total: number
  language: "en" | "ur"
  onSelect: (index: number) => void
}

const MobileModuleRail: React.FC<MobileModuleRailProps> = ({
  activeIndex,
  total,
  language,
  onSelect,
}) => {
  const order = Array.from({ length: total }, (_, index) => index)
  const displayOrder = language === "ur" ? [...order].reverse() : order

  return (
    <div
      className={`flex items-center gap-2 ${language === "ur" ? "flex-row-reverse" : ""}`}
      dir="ltr"
      aria-label={language === "ur" ? "ماڈیول منتخب کریں" : "Select module"}
    >
      {displayOrder.map((index) => {
        const isActive = index === activeIndex
        const accent = MODULE_ACCENTS[index % MODULE_ACCENTS.length]

        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            className="relative grid place-items-center rounded-full border text-sm font-black transition-colors"
            style={{
              minWidth: MOBILE_TOUCH_TARGET,
              minHeight: MOBILE_TOUCH_TARGET,
              color: isActive ? "#FFFFFF" : "#284952",
              borderColor: isActive ? accent : "rgba(40,73,82,0.16)",
              background: isActive ? accent : "rgba(255,255,255,0.72)",
              boxShadow: isActive ? `0 10px 22px -10px ${accent}` : "none",
            }}
            aria-label={language === "ur" ? `ماڈیول ${index + 1}` : `Module ${index + 1}`}
            aria-current={isActive ? "step" : undefined}
          >
            {isActive && (
              <motion.span
                layoutId="mobile-module-active"
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: `0 0 0 5px ${accent}22` }}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative z-10 font-mono">{index + 1}</span>
          </button>
        )
      })}
    </div>
  )
}

export default MobileModuleRail
