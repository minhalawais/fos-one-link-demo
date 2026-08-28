import React, { useState } from "react"
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
    const clickX = e.clientX - rect.left
    const clickPercent = Math.max(0, Math.min(1, clickX / rect.width))
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

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0, x: "-50%", scale: 0.92 }}
          animate={{ y: 0, opacity: 1, x: "-50%", scale: 1 }}
          exit={{ y: 100, opacity: 0, x: "-50%", scale: 0.92 }}
          transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.9 }}
          className="fixed bottom-8 left-1/2 z-50 origin-bottom"
        >
          {/* Multi-layered ambient glow effect */}
          <div className="absolute -inset-8 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-[#60BA81]/25 via-[#284952]/15 to-transparent rounded-[60px] blur-3xl" />
            <div className="absolute inset-4 bg-[#17161A]/40 rounded-[50px] blur-2xl" />
          </div>

          {/* Main Glass Container */}
          <div
            className={`group relative backdrop-blur-2xl border text-white rounded-[22px] flex items-center gap-2 px-3 py-1.5 h-[64px] overflow-visible select-none ${
              language === "ur" ? "flex-row-reverse" : "flex-row"
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(23,22,26,0.96) 0%, rgba(30,29,34,0.94) 100%)',
              borderColor: 'rgba(255,255,255,0.12)',
              boxShadow: `
                0 40px 80px -20px rgba(0,0,0,0.6),
                0 0 0 1px rgba(255,255,255,0.06) inset,
                0 1px 0 0 rgba(255,255,255,0.08) inset,
                0 -1px 0 0 rgba(0,0,0,0.3) inset
              `,
            }}
          >
            {/* Inner highlight gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent rounded-[22px] pointer-events-none" />

            {/* Play/Pause Button */}
            <motion.button
              onClick={onPlayPause}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="relative w-11 h-11 rounded-full flex items-center justify-center z-10 overflow-hidden shrink-0"
              style={{
                background: 'linear-gradient(145deg, #60BA81 0%, #4CAF7A 100%)',
                boxShadow: `
                  0 8px 24px -4px rgba(96,186,129,0.4),
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
                    <Pause size={18} fill="white" className="text-white drop-shadow-sm" />
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
                    <Play size={18} fill="white" className="text-white ml-0.5 drop-shadow-sm" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Info & Segmented Progress Section */}
            <div className="flex flex-col justify-center min-w-[260px] md:min-w-[320px] max-w-[420px] px-2 gap-1.5">
              {/* Title and Time Row */}
              <div className={`flex justify-between items-center ${language === "ur" ? "flex-row-reverse" : "flex-row"}`}>
                <div className="flex items-center gap-2">
                  {isPlaying && (
                    <motion.div
                      className="flex items-center gap-0.5"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className="w-[3px] bg-[#60BA81] rounded-full"
                          animate={{ height: [4, 12, 4] }}
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
                  <span className={`text-[13px] font-semibold text-white tracking-tight truncate max-w-[200px] ${language === "ur" ? "font-urdu" : ""}`}>
                    {activeSlideTitle || (language === "ur" ? "ماڈیول" : "Module")}
                  </span>
                </div>
                <span className="text-[10px] font-medium text-white/50 tabular-nums tracking-wide font-mono">
                  {formatTime(currentTime)} / {formatTime(totalDuration)}
                </span>
              </div>

              {/* Segmented Timeline / Progress Bar */}
              <div
                className="relative w-full h-[8px] flex gap-[2px] items-center cursor-pointer py-1"
                onClick={handleGlobalBarClick}
              >
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

                    return (
                      <div
                        key={`seg-${scene.name}-${idx}`}
                        className="relative h-[6px] rounded-full bg-white/[0.12] hover:bg-white/[0.22] transition-colors duration-150 overflow-hidden group/segment"
                        style={{ flex: flexRatio }}
                        onClick={(e) => handleSegmentClick(scene, e)}
                        onMouseEnter={() => setHoveredSceneIndex(idx)}
                        onMouseLeave={() => setHoveredSceneIndex(null)}
                      >
                        {/* Segment Fill: Instant width update on seek/click without slow lag */}
                        <div
                          className="h-full bg-gradient-to-r from-[#60BA81] to-[#4CAF7A] rounded-full transition-none"
                          style={{ width: `${sceneProgress}%` }}
                        />

                        {/* Hover Tooltip */}
                        {hoveredSceneIndex === idx && (
                          <div
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none z-50 whitespace-nowrap bg-[#17161A]/95 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg border border-white/10 shadow-xl backdrop-blur-md"
                            style={{
                              direction: language === "ur" ? "rtl" : "ltr",
                              fontFamily: language === "ur" ? "Jameel Noori Nastaleeq, serif" : "inherit",
                            }}
                          >
                            <div className="font-semibold text-[#60BA81]">{scene.label}</div>
                            <div className="text-[9px] text-white/60 font-mono">
                              {formatTime(scene.start)} - {formatTime(scene.end)}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })
                ) : (
                  <div className="relative w-full h-[6px] bg-white/[0.12] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#60BA81] to-[#4CAF7A] rounded-full"
                      style={{ width: `${totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0}%` }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Separator */}
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-white/[0.12] to-transparent mx-1 shrink-0" />

            {/* Controls Group */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Volume Control with popup */}
              <div className="relative group/vol">
                <motion.button
                  onClick={onMuteToggle}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-8 h-8 flex items-center justify-center rounded-xl text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
                >
                  {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </motion.button>

                {/* Volume Slider Popup */}
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-12 h-32 rounded-2xl flex flex-col justify-end items-center p-3 pb-3 opacity-0 group-hover/vol:opacity-100 transition-all duration-200 translate-y-2 group-hover/vol:translate-y-0 pointer-events-none group-hover/vol:pointer-events-auto"
                  style={{
                    background: 'linear-gradient(135deg, rgba(23,22,26,0.98) 0%, rgba(30,29,34,0.95) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)',
                  }}
                >
                  <div className="text-[10px] font-bold text-white/60 mb-2 tabular-nums font-mono">
                    {Math.round((isMuted ? 0 : volume) * 100)}%
                  </div>

                  <div className="w-2 h-full bg-white/[0.1] rounded-full relative overflow-hidden">
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
                        width: "80px",
                        height: "24px",
                        left: "-36px",
                        top: "28px",
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
                className="w-8 h-8 flex items-center justify-center rounded-xl text-white/50 hover:text-white hover:bg-red-500/20 transition-all duration-200"
                title={language === "ur" ? "ماڈیول بند کریں" : "Close Module"}
              >
                <X size={16} />
              </motion.button>
            </div>
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