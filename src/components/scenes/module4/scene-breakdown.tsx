"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useMemo, useRef, useState, useEffect } from "react"

// --- CONSTANTS ---
const SPRING_CONFIG = { type: "spring", stiffness: 180, damping: 24 }
const COLORS = {
  deepTeal: "#284952",
  freshGreen: "#60BA81",
  charcoal: "#17161A",
  lightGray: "#F5F5F7",
  white: "#FFFFFF",
  barTrack: "#F0F2F5",
  textGray: "#767676",
}

const CATEGORIES = [
  { name: "Workplace Health, Safety and Environment", value: 4, id: "health" },
  { name: "Freedom of Association", value: 0, id: "freedom" },
  { name: "Child Labor", value: 0, id: "child" },
  { name: "Wages & Benefits", value: 40, id: "wages" },
  { name: "Working Hours", value: 11, id: "hours" },
  { name: "Forced Labor", value: 0, id: "forced" },
  { name: "Discrimination", value: 1, id: "discrimination" },
  { name: "Unfair Employment", value: 2, id: "unfair" },
  { name: "Ethical Business", value: 1, id: "ethical" },
  { name: "Harassment", value: 3, id: "harassment" },
  { name: "Workplace Discipline", value: 39, id: "discipline" },
]

// --- RESPONSIVE CONTAINER ---
const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return
      const parent = containerRef.current.parentElement
      if (!parent) return

      const { width, height } = parent.getBoundingClientRect()
      const scaleX = width / 1280
      const scaleY = height / 720
      setScale(Math.min(scaleX, scaleY) * 0.92)
    }

    handleResize()
    const observer = new ResizeObserver(handleResize)
    if (containerRef.current && containerRef.current.parentElement) {
      observer.observe(containerRef.current.parentElement)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden bg-[#F5F5F7]">
      <div
        style={{
          width: 1280,
          height: 720,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
        className="shrink-0 flex items-center justify-center"
      >
        {children}
      </div>
    </div>
  )
}

interface SceneBreakdownProps {
  isActive: boolean
  sceneProgress?: number
  progress?: number
}

export const SceneBreakdown = ({ isActive, sceneProgress, progress }: SceneBreakdownProps) => {
  // Calculate scene progress from global progress if not provided
  const calculatedSceneProgress = useMemo(() => {
    if (sceneProgress !== undefined) return sceneProgress
    if (progress === undefined) return 0
    // Scene runs from 16s to 30.6s
    const sceneStart = 16
    const sceneEnd = 30.6
    const sceneDuration = sceneEnd - sceneStart
    const elapsed = Math.max(0, progress - sceneStart)
    return Math.min(1, elapsed / sceneDuration)
  }, [sceneProgress, progress])

  // 16s - 20.2s (0.00 - 0.29): "Assess overall situation" -> Show full list, neutral state.
  // 20.2s - 25.36s (0.29 - 0.64): "Wages... Harassment" -> Highlight wages, harassment categories.
  // 25.36s - 30.64s (0.64 - 1.00): "Discrimination... Health... Hours... Ethical" -> Highlight these.

  const activeIds = useMemo(() => {
    if (calculatedSceneProgress < 0.29) return []
    if (calculatedSceneProgress < 0.64) return ["wages", "harassment"]
    return ["discrimination", "health", "hours", "ethical"]
  }, [calculatedSceneProgress])

  const isFocusMode = calculatedSceneProgress > 0.29

  return (
    <ResponsiveContainer>
      <div className="w-[1100px] h-[650px] flex flex-col font-sans text-[#17161A]">
        {/* Main Chart Card - Clean Apple Style */}
        <motion.div
          className="flex-1 bg-white rounded-[24px] shadow-[0_2px_20px_-2px_rgba(0,0,0,0.06)] p-10 relative overflow-hidden flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 shrink-0"
          >
            <h1 className="text-xl font-bold text-[#17161A]">Complaints By Categories</h1>
          </motion.div>

          {/* List Container */}
          <div className="flex flex-col gap-3 flex-1 justify-center">
            {CATEGORIES.map((cat, index) => {
              const isHighlighted = activeIds.includes(cat.id)
              const isDimmed = isFocusMode && !isHighlighted

              return (
                <CategoryRow
                  key={cat.id}
                  category={cat}
                  index={index}
                  isHighlighted={isHighlighted}
                  isDimmed={isDimmed}
                  isActive={isActive}
                />
              )
            })}
          </div>

          {/* Footer Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6 text-center shrink-0"
          >
            <span className="text-sm text-[#60BA81] font-medium cursor-pointer hover:underline">
              Complaint Categories
            </span>
          </motion.div>
        </motion.div>
      </div>
    </ResponsiveContainer>
  )
}

// --- ROW COMPONENT ---
interface CategoryRowProps {
  category: { name: string; value: number; id: string }
  index: number
  isHighlighted: boolean
  isDimmed: boolean
  isActive: boolean
}

const CategoryRow = ({ category, index, isHighlighted, isDimmed, isActive }: CategoryRowProps) => {
  // Calculate bar width - max is 100%, scale based on max value (40%)
  const maxValue = 40
  const barWidth = Math.max(2, (category.value / maxValue) * 100)

  return (
    <motion.div
      className="relative flex items-center gap-4"
      animate={{
        opacity: isDimmed ? 0.3 : 1,
        x: isHighlighted ? 8 : 0,
        scale: isHighlighted ? 1.01 : 1,
      }}
      transition={SPRING_CONFIG}
    >
      {/* Label Area */}
      <div className="w-[280px] shrink-0">
        <motion.span
          className="text-sm font-medium transition-colors duration-300 block truncate"
          style={{
            color: isHighlighted ? COLORS.deepTeal : "#767676",
          }}
        >
          {category.name}
        </motion.span>
      </div>

      {/* Bar Area */}
      <div className="flex-1 h-[20px] bg-[#E8F5EE] rounded-md overflow-hidden relative">
        <motion.div
          className="h-full rounded-md relative overflow-hidden"
          style={{
            backgroundColor: COLORS.freshGreen,
          }}
          initial={{ width: 0 }}
          animate={{ width: isActive ? `${barWidth}%` : 0 }}
          transition={{
            delay: 0.15 + index * 0.04,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Subtle shimmer on highlighted bars */}
          <AnimatePresence>
            {isHighlighted && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "linear" }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Percentage Value */}
      <div className="w-10 text-right shrink-0">
        <motion.span
          className="text-sm font-semibold tabular-nums"
          style={{ color: isHighlighted ? COLORS.freshGreen : COLORS.deepTeal }}
        >
          {category.value}%
        </motion.span>
      </div>

      {/* Floating Tooltip for highlighted items */}
      <AnimatePresence>
        {isHighlighted && category.value > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute left-[300px] -top-8 bg-[#284952] text-white text-xs px-3 py-1.5 rounded-lg shadow-lg z-10 font-medium flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#60BA81]" />
            {category.value}% of complaints
            {/* Triangle pointer */}
            <div
              className="absolute top-full left-4 w-0 h-0"
              style={{
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop: "5px solid #284952",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default SceneBreakdown
