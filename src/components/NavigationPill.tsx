import React, { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, X } from "lucide-react"
import type { SceneControl } from "../lib/module-data"

interface NavigationPillProps {
  visible: boolean
  onPlayPause: () => void
  isPlaying: boolean
  currentTime?: number
  totalDuration?: number
  volume: number
  isMuted: boolean
  onVolumeChange: (v: number) => void
  onMuteToggle: () => void
  onClose: () => void
  activeSlideTitle?: string
  scenes?: SceneControl[]
  onSeek?: (time: number) => void
  language?: "en" | "ur"
}

const NavigationPill: React.FC<NavigationPillProps> = ({
  visible,
  onPlayPause,
  isPlaying,
  currentTime = 0,
  totalDuration = 120,
  volume,
  isMuted,
  onVolumeChange,
  onMuteToggle,
  onClose,
  activeSlideTitle,
  scenes = [],
  onSeek,
  language = "en",
}) => {
  const [hoveredSceneIndex, setHoveredSceneIndex] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState<{ x: number; width: number } | null>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isUrdu = language === "ur"

  // Track mouse movement smoothly across timeline bar
  const handleTimelineMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current || !scenes || scenes.length === 0) return
    const rect = timelineRef.current.getBoundingClientRect()
    const rawX = Math.max(0, Math.min(rect.width, e.clientX - rect.left))
    setMousePos({ x: rawX, width: rect.width })

    // In Urdu, bar flows from right to left
    const effectiveX = isUrdu ? rect.width - rawX : rawX
    const percent = rect.width > 0 ? effectiveX / rect.width : 0
    const time = percent * totalDuration
    const idx = scenes.findIndex((s) => time >= s.start && time < s.end)
    setHoveredSceneIndex(idx !== -1 ? idx : (time >= totalDuration ? scenes.length - 1 : 0))
  }

  const handleTimelineMouseLeave = () => {
    setHoveredSceneIndex(null)
    setMousePos(null)
  }

  // Handle scene segment click and start playback directly
  const handleSegmentClick = (scene: SceneControl, e: React.MouseEvent) => {
    e.stopPropagation()
    if (onSeek) {
      onSeek(scene.start)
      if (!isPlaying) {
        onPlayPause()
      }
    }
  }

  // Handle global timeline bar click and start playback
  const handleGlobalBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onSeek || scenes.length === 0) return
    const rect = e.currentTarget.getBoundingClientRect()
    const rawX = e.clientX - rect.left
    const effectiveX = isUrdu ? rect.width - rawX : rawX
    const clickPercent = Math.max(0, Math.min(1, effectiveX / rect.width))
    const clickedTime = clickPercent * totalDuration

    // Find corresponding scene target
    const targetScene = scenes.find(
      (s) => clickedTime >= s.start && clickedTime <= s.end
    ) || scenes[0]

    onSeek(targetScene.start)
    if (!isPlaying) {
      onPlayPause()
    }
  }

  // Play/Pause Button JSX
  const renderPlayButton = () => (
    <motion.button
      onClick={onPlayPause}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="relative w-9 h-9 rounded-full flex items-center justify-center z-10 overflow-hidden shrink-0"
      style={{
        background: 'linear-gradient(145deg, #60BA81 0%, #4CAF7A 100%)',
        boxShadow: `
          0 6px 18px -3px rgba(96,186,129,0.45),
          0 2px 0 0 rgba(255,255,255,0.2) inset,
          0 -2px 0 0 rgba(0,0,0,0.1) inset
        `,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-60" />

      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="pause"
            initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative z-10"
          >
            <Pause size={15} fill="white" className="text-white drop-shadow-sm" />
          </motion.div>
        ) : (
          <motion.div
            key="play"
            initial={{ scale: 0.5, opacity: 0, rotate: 90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="relative z-10"
          >
            <Play size={15} fill="white" className="text-white ml-0.5 drop-shadow-sm" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )

  // Secondary Controls: Volume, Fullscreen, Close
  const renderControlsGroup = () => (
    <div className={`flex items-center gap-1 shrink-0 ${isUrdu ? "flex-row-reverse" : "flex-row"}`}>
      {/* Volume Control with popup */}
      <div className="relative group/vol">
        <motion.button
          onClick={onMuteToggle}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
          title={isMuted ? (isUrdu ? "آواز کھولیں" : "Unmute") : (isUrdu ? "آواز بند کریں" : "Mute")}
        >
          {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </motion.button>

        {/* Volume Slider Popup */}
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-10 h-28 rounded-xl flex flex-col justify-end items-center p-2 pb-2.5 opacity-0 group-hover/vol:opacity-100 transition-all duration-200 translate-y-2 group-hover/vol:translate-y-0 pointer-events-none group-hover/vol:pointer-events-auto z-50"
          style={{
            background: 'linear-gradient(135deg, rgba(23,22,26,0.98) 0%, rgba(30,29,34,0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)',
          }}
        >
          <div className="text-[9px] font-bold text-white/60 mb-1.5 tabular-nums font-mono">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </div>

          <div className="w-1.5 h-full bg-white/[0.1] rounded-full relative overflow-hidden">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => onVolumeChange(Number.parseFloat(e.target.value))}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "center",
                width: "70px",
                height: "20px",
                left: "-31px",
                top: "25px",
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-full rounded-full bg-gradient-to-t from-[#60BA81] to-[#4CAF7A]"
              style={{ height: `${(isMuted ? 0 : volume) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Close Button */}
      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.08, rotate: 90 }}
        whileTap={{ scale: 0.92 }}
        className="w-7 h-7 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-red-500/20 transition-all duration-200"
        title={isUrdu ? "ماڈیول بند کریں" : "Close Module"}
      >
        <X size={14} />
      </motion.button>
    </div>
  )

  // Timeline & Center Progress Section
  const renderTimelineSection = () => (
    <div className="flex flex-col justify-center min-w-[240px] md:min-w-[300px] max-w-[400px] px-2 gap-1">
      {/* Title and Time Row */}
      <div className={`flex justify-between items-center ${isUrdu ? "flex-row-reverse" : "flex-row"}`}>
        <div className="flex items-center gap-1.5">
          {isPlaying && (
            <motion.div
              className="flex items-center gap-0.5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-[2.5px] bg-[#60BA81] rounded-full"
                  animate={{ height: [3, 10, 3] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          )}
          <span className={`text-xs font-semibold text-white tracking-tight truncate max-w-[190px] ${isUrdu ? "font-urdu text-sm" : ""}`}>
            {activeSlideTitle || (isUrdu ? "ماڈیول" : "Module")}
          </span>
        </div>
        <span className="text-[9.5px] font-medium text-white/50 tabular-nums tracking-wide font-mono">
          {formatTime(currentTime)} / {formatTime(totalDuration)}
        </span>
      </div>

      {/* Segmented Timeline / Progress Bar with Mouse-Following Tooltip */}
      <div
        ref={timelineRef}
        className={`relative w-full h-[10px] flex gap-[2px] items-center cursor-pointer py-0.5 ${
          isUrdu ? "flex-row-reverse" : "flex-row"
        }`}
        onClick={handleGlobalBarClick}
        onMouseMove={handleTimelineMouseMove}
        onMouseLeave={handleTimelineMouseLeave}
      >
        {/* Floating Mouse-Following Tooltip */}
        <AnimatePresence>
          {hoveredSceneIndex !== null && mousePos && scenes[hoveredSceneIndex] && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute bottom-full mb-2.5 pointer-events-none z-50 whitespace-nowrap bg-[#17161A]/95 text-white text-[11px] font-medium px-2.5 py-1.5 rounded-xl border border-white/15 shadow-2xl backdrop-blur-xl"
              style={{
                left: `${Math.max(35, Math.min(mousePos.width - 35, mousePos.x))}px`,
                transform: 'translateX(-50%)',
                direction: isUrdu ? "rtl" : "ltr",
                fontFamily: isUrdu ? "Jameel Noori Nastaleeq, serif" : "inherit",
              }}
            >
              <div className="font-semibold text-[#60BA81] text-xs">
                {scenes[hoveredSceneIndex].label || scenes[hoveredSceneIndex].title}
              </div>
              <div className="text-[9px] text-white/70 font-mono mt-0.5">
                {formatTime(scenes[hoveredSceneIndex].start)} - {formatTime(scenes[hoveredSceneIndex].end)}
              </div>
              {/* Little downward arrow pointer */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#17161A]/95" />
            </motion.div>
          )}
        </AnimatePresence>

        {scenes && scenes.length > 0 ? (
          scenes.map((scene, idx) => {
            const sceneDuration = Math.max(1, scene.end - scene.start)
            const flexRatio = sceneDuration / totalDuration
            const isScenePast = currentTime >= scene.end
            const isSceneActive = currentTime >= scene.start && currentTime < scene.end
            const sceneProgress = isScenePast
              ? 100
              : isSceneActive
              ? ((currentTime - scene.start) / sceneDuration) * 100
              : 0
            const isHovered = hoveredSceneIndex === idx

            return (
              <div
                key={`seg-${scene.name}-${idx}`}
                className={`relative rounded-full transition-all duration-150 overflow-hidden group/segment ${
                  isHovered
                    ? "h-[7px] bg-white/[0.28] shadow-[0_0_8px_rgba(96,186,129,0.4)]"
                    : "h-[5px] bg-white/[0.12] hover:bg-white/[0.22]"
                }`}
                style={{ flex: flexRatio }}
                onClick={(e) => handleSegmentClick(scene, e)}
              >
                {/* Segment Fill */}
                <div
                  className={`h-full rounded-full transition-none ${
                    isUrdu
                      ? "bg-gradient-to-l from-[#60BA81] to-[#4CAF7A] ml-auto"
                      : "bg-gradient-to-r from-[#60BA81] to-[#4CAF7A]"
                  }`}
                  style={{ width: `${sceneProgress}%` }}
                />
              </div>
            )
          })
        ) : (
          <div className="relative w-full h-[5px] bg-white/[0.12] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                isUrdu
                  ? "bg-gradient-to-l from-[#60BA81] to-[#4CAF7A] ml-auto"
                  : "bg-gradient-to-r from-[#60BA81] to-[#4CAF7A]"
              }`}
              style={{ width: `${totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0}%` }}
            />
          </div>
        )}
      </div>
    </div>
  )

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0, x: "-50%", scale: 0.92 }}
          animate={{ y: 0, opacity: 1, x: "-50%", scale: 1 }}
          exit={{ y: 100, opacity: 0, x: "-50%", scale: 0.92 }}
          transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.9 }}
          className="fixed bottom-6 left-1/2 z-[300] origin-bottom"
        >
          {/* Multi-layered ambient glow effect */}
          <div className="absolute -inset-6 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-[#60BA81]/20 via-[#284952]/10 to-transparent rounded-[50px] blur-2xl" />
            <div className="absolute inset-3 bg-[#17161A]/35 rounded-[40px] blur-xl" />
          </div>

          {/* Main Glass Container */}
          <div
            dir="ltr"
            className="group relative backdrop-blur-2xl border text-white rounded-[18px] flex items-center gap-2 px-2.5 py-1 h-[54px] overflow-visible select-none"
            style={{
              background: 'linear-gradient(135deg, rgba(23,22,26,0.96) 0%, rgba(30,29,34,0.94) 100%)',
              borderColor: 'rgba(255,255,255,0.12)',
              boxShadow: `
                0 30px 60px -15px rgba(0,0,0,0.65),
                0 0 0 1px rgba(255,255,255,0.06) inset,
                0 1px 0 0 rgba(255,255,255,0.08) inset,
                0 -1px 0 0 rgba(0,0,0,0.3) inset
              `,
            }}
          >
            {/* Inner highlight gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent rounded-[18px] pointer-events-none" />

            {/* In Urdu: [Controls (Close leftmost, Fullscreen, Volume)] | [Timeline] | [Play/Pause rightmost] */}
            {/* In English: [Play/Pause leftmost] | [Timeline] | [Controls (Volume, Fullscreen, Close rightmost)] */}
            {isUrdu ? (
              <>
                {renderControlsGroup()}
                <div className="h-6 w-px bg-gradient-to-b from-transparent via-white/[0.12] to-transparent mx-0.5 shrink-0" />
                {renderTimelineSection()}
                <div className="h-6 w-px bg-gradient-to-b from-transparent via-white/[0.12] to-transparent mx-0.5 shrink-0" />
                {renderPlayButton()}
              </>
            ) : (
              <>
                {renderPlayButton()}
                <div className="h-6 w-px bg-gradient-to-b from-transparent via-white/[0.12] to-transparent mx-0.5 shrink-0" />
                {renderTimelineSection()}
                <div className="h-6 w-px bg-gradient-to-b from-transparent via-white/[0.12] to-transparent mx-0.5 shrink-0" />
                {renderControlsGroup()}
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s < 10 ? "0" : ""}${s}`
}

export default NavigationPill