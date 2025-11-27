import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, X } from "lucide-react"

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
          initial={{ y: 120, opacity: 0, x: "-50%", scale: 0.9 }}
          animate={{ y: 0, opacity: 1, x: "-50%", scale: 1 }}
          exit={{ y: 120, opacity: 0, x: "-50%", scale: 0.9 }}
          transition={{ type: "spring", stiffness: 280, damping: 24, mass: 1 }}
          className="fixed bottom-10 left-1/2 z-50 origin-bottom"
        >
          {/* Ambient Glow behind the pill */}
          <div className="absolute -inset-6 bg-gradient-to-t from-[#284952]/40 to-transparent rounded-full blur-3xl pointer-events-none opacity-60" />

          {/* Main Glass Container */}
          <div className="group relative bg-[#17161A]/90 backdrop-blur-2xl border border-white/[0.08] text-white rounded-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)_inset] flex items-center pr-2 pl-2 py-2 h-[68px] overflow-hidden select-none">
            
            {/* Play/Pause Button - Tactile feel */}
            <button
              onClick={onPlayPause}
              className="w-12 h-12 rounded-full bg-white text-[#17161A] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.2)] relative z-10 mr-4 group-hover:bg-[#F5F5F7]"
            >
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div
                    key="pause"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Pause size={20} fill="currentColor" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Play size={20} fill="currentColor" className="ml-0.5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Info & Progress */}
            <div className="flex flex-col justify-center min-w-[200px] max-w-[240px] mr-6 gap-1.5">
              <div className="flex justify-between items-end px-0.5">
                <span className="text-[13px] font-semibold text-white tracking-tight truncate max-w-[140px] drop-shadow-sm">
                  {activeSlideTitle || "Module"}
                </span>
                <span className="text-[10px] font-medium text-white/50 tabular-nums tracking-wide">
                  {formatTime(currentTime)} / {formatTime(totalDuration)}
                </span>
              </div>

              {/* Progress Bar Track */}
              <div className="relative w-full h-[4px] bg-white/[0.15] rounded-full overflow-hidden">
                {/* Progress Fill with Glow */}
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#60BA81] rounded-full"
                  style={{ width: `${progress}%` }}
                  layoutId="progress-bar"
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(96,186,129,0.8)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </div>
            </div>

            <div className="h-6 w-px bg-white/[0.1] mx-1" />

            {/* Volume & Close Group */}
            <div className="flex items-center gap-1 pl-1">
              {/* Volume Control - Reveals on hover */}
              <div className="relative group/vol flex items-center justify-center w-10 h-10">
                <button onClick={onMuteToggle} className="text-white/60 hover:text-white transition-colors">
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>

                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-12 h-32 bg-[#17161A]/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl flex flex-col justify-end items-center p-3 opacity-0 group-hover/vol:opacity-100 transition-all duration-300 translate-y-2 group-hover/vol:translate-y-0 pointer-events-none group-hover/vol:pointer-events-auto shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]">
                  <div className="w-1.5 h-full bg-white/10 rounded-full relative overflow-hidden">
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
                        top: "35px"
                      }}
                    />
                    <div
                      className="absolute bottom-0 left-0 w-full bg-white rounded-full transition-all"
                      style={{ height: `${(isMuted ? 0 : volume) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/[0.1] text-white/60 hover:text-[#F5A83C] transition-colors active:scale-95"
                title="Close Module"
              >
                <X size={18} />
              </button>
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