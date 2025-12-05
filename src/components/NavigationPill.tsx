import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, X, SkipForward, SkipBack } from "lucide-react"

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
}) => {
  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0

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

          {/* Main Glass Container - Premium material design */}
          <div
            className="group relative backdrop-blur-2xl border text-white rounded-[28px] flex items-center gap-1 px-3 py-2.5 h-[72px] overflow-hidden select-none"
            style={{
              background: 'linear-gradient(135deg, rgba(23,22,26,0.95) 0%, rgba(30,29,34,0.92) 100%)',
              borderColor: 'rgba(255,255,255,0.08)',
              boxShadow: `
                0 40px 80px -20px rgba(0,0,0,0.6),
                0 0 0 1px rgba(255,255,255,0.04) inset,
                0 1px 0 0 rgba(255,255,255,0.06) inset,
                0 -1px 0 0 rgba(0,0,0,0.3) inset
              `,
            }}
          >
            {/* Inner highlight gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent rounded-[28px] pointer-events-none" />

            {/* Play/Pause Button - Premium tactile button */}
            <motion.button
              onClick={onPlayPause}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-14 h-14 rounded-full flex items-center justify-center z-10 overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #60BA81 0%, #4CAF7A 100%)',
                boxShadow: `
                  0 8px 24px -4px rgba(96,186,129,0.4),
                  0 2px 0 0 rgba(255,255,255,0.15) inset,
                  0 -2px 0 0 rgba(0,0,0,0.1) inset
                `,
              }}
            >
              {/* Button shine effect */}
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
                    <Pause size={22} fill="white" className="text-white drop-shadow-sm" />
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
                    <Play size={22} fill="white" className="text-white ml-1 drop-shadow-sm" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Info & Progress Section */}
            <div className="flex flex-col justify-center min-w-[220px] max-w-[260px] px-3 gap-2">
              {/* Title and Time Row */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {/* Now Playing indicator */}
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
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                  <span className="text-[14px] font-semibold text-white tracking-tight truncate max-w-[140px]">
                    {activeSlideTitle || "Module"}
                  </span>
                </div>
                <span className="text-[11px] font-medium text-white/40 tabular-nums tracking-wide font-mono">
                  {formatTime(currentTime)} / {formatTime(totalDuration)}
                </span>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="relative w-full h-[6px] bg-white/[0.08] rounded-full overflow-hidden group/progress cursor-pointer">
                {/* Background glow when hovering */}
                <div className="absolute inset-0 bg-[#60BA81]/10 opacity-0 group-hover/progress:opacity-100 transition-opacity" />

                {/* Progress Fill with gradient */}
                <motion.div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #60BA81 0%, #4CAF7A 50%, #60BA81 100%)',
                  }}
                  layoutId="progress-bar"
                >
                  {/* Animated shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>

                {/* Playhead indicator */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-all scale-75 group-hover/progress:scale-100"
                  style={{ left: `calc(${progress}% - 6px)` }}
                >
                  <div className="absolute inset-0 bg-[#60BA81] rounded-full animate-ping opacity-40" />
                </motion.div>
              </div>
            </div>

            {/* Separator */}
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-white/[0.1] to-transparent mx-2" />

            {/* Controls Group */}
            <div className="flex items-center gap-0.5">
              {/* Volume Control with hover popup */}
              <div className="relative group/vol">
                <motion.button
                  onClick={onMuteToggle}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                >
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </motion.button>

                {/* Volume Slider Popup */}
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-14 h-36 rounded-2xl flex flex-col justify-end items-center p-3 pb-4 opacity-0 group-hover/vol:opacity-100 transition-all duration-300 translate-y-2 group-hover/vol:translate-y-0 pointer-events-none group-hover/vol:pointer-events-auto"
                  style={{
                    background: 'linear-gradient(135deg, rgba(23,22,26,0.98) 0%, rgba(30,29,34,0.95) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset',
                  }}
                >
                  {/* Volume level indicator */}
                  <div className="text-[10px] font-bold text-white/60 mb-2 tabular-nums">
                    {Math.round((isMuted ? 0 : volume) * 100)}%
                  </div>

                  <div className="w-2 h-full bg-white/[0.08] rounded-full relative overflow-hidden">
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
                        width: "100px",
                        height: "30px",
                        left: "-46px",
                        top: "38px"
                      }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 w-full rounded-full"
                      style={{
                        height: `${(isMuted ? 0 : volume) * 100}%`,
                        background: 'linear-gradient(to top, #60BA81, #4CAF7A)',
                      }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-white/40 hover:text-white hover:bg-red-500/10 transition-all duration-200"
                title="Close Module"
              >
                <X size={18} />
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