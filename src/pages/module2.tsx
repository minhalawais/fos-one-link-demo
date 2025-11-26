"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"
import { SceneIntro } from "../components/scenes/module2/scene-intro.tsx"
import { SceneOmnichannel } from "../components/scenes/module2/scene-omnichannel.tsx"
import { SceneAssistedFiling } from "../components/scenes/module2/scene-assisted-filing.tsx"
import { SceneAnonymity } from "../components/scenes/module2/scene-anonymity.tsx"
import { SceneReview } from "../components/scenes/module2/scene-review.tsx"
import { SceneTicket } from "../components/scenes/module2/scene-ticket.tsx"
import { SceneNotification } from "../components/scenes/module2/scene-notification.tsx"

const TOTAL_DURATION = 98

// Scene Config
const SCENES = [
  { name: "intro", start: 0, end: 4.64, component: SceneIntro },
  { name: "omnichannel", start: 4.64, end: 22, component: SceneOmnichannel },
  { name: "assisted", start: 22, end: 44.56, component: SceneAssistedFiling },
  { name: "anonymity", start: 44.56, end: 61.24, component: SceneAnonymity },
  { name: "review", start: 61.24, end: 71, component: SceneReview },
  { name: "ticket", start: 71, end: 82, component: SceneTicket },
  { name: "notification", start: 82, end: 98, component: SceneNotification },
]

interface Module2PlayerProps {
  isPlaying: boolean 
  onComplete?: () => void
}

export const Module2Player = ({ isPlaying: initialPlaying, onComplete }: Module2PlayerProps) => {
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(initialPlaying)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [currentScene, setCurrentScene] = useState(SCENES[0])

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const controlTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // 1. Audio Initialization
  useEffect(() => {
    // Assuming a consistent naming convention for the audio file
    audioRef.current = new Audio("/assets/Chris-Module 2 Audio.mp3")
    audioRef.current.preload = "auto"

    const handleEnded = () => {
      setIsPlaying(false)
      if (onComplete) onComplete()
    }

    audioRef.current.addEventListener('ended', handleEnded)
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [onComplete])

  // 2. Playback Control
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.warn("Audio play interrupted", e))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  // 3. Volume Control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  // 4. High-Precision Timing Loop
  useEffect(() => {
    let frameId: number
    const tick = () => {
      if (audioRef.current && isPlaying) {
        setCurrentTime(audioRef.current.currentTime)
        frameId = requestAnimationFrame(tick)
      }
    }
    if (isPlaying) frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [isPlaying])

  // 5. Scene Switching Logic
  useEffect(() => {
    const activeScene = SCENES.find((scene) => currentTime >= scene.start && currentTime < scene.end)
    if (activeScene && activeScene.name !== currentScene.name) {
      setCurrentScene(activeScene)
    }
  }, [currentTime, currentScene])

  // 6. UI Interaction
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const newTime = percent * TOTAL_DURATION
    setCurrentTime(newTime)
    if (audioRef.current) audioRef.current.currentTime = newTime
  }

  // Auto-hide controls
  useEffect(() => {
    const reset = () => {
      setShowControls(true)
      if (controlTimeoutRef.current) clearTimeout(controlTimeoutRef.current)
      if (isPlaying) controlTimeoutRef.current = setTimeout(() => setShowControls(false), 3000)
    }
    window.addEventListener('mousemove', reset)
    return () => window.removeEventListener('mousemove', reset)
  }, [isPlaying])

  return (
    <div className="w-full h-full relative bg-[#F5F5F7] overflow-hidden font-sans select-none rounded-[2rem]">
      
      {/* Scene Container */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            <currentScene.component isActive={true} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Control Bar */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 flex justify-center pointer-events-none z-50">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: showControls ? 0 : 40, opacity: showControls ? 1 : 0 }}
          className="bg-[#17161A]/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[2rem] p-3 md:p-4 w-full max-w-xl pointer-events-auto flex flex-col gap-2 md:gap-3"
        >
          {/* Scrubber */}
          <div 
            className="w-full h-1 bg-white/10 rounded-full cursor-pointer group relative py-2"
            onClick={handleSeek}
          >
             <div className="absolute top-2 left-0 right-0 h-1 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-white/30 w-full origin-left scale-x-0" 
                  style={{ scaleX: currentTime / TOTAL_DURATION }}
                />
             </div>
             <motion.div 
               className="absolute top-2 left-0 h-1 bg-[#60BA81] rounded-full"
               style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
             >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] scale-0 group-hover:scale-100 transition-transform" />
             </motion.div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between px-1 md:px-2">
            <div className="flex items-center gap-3 md:gap-4">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 md:w-10 md:h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
              >
                {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
              </button>
              
              <div className="flex flex-col">
                <span className="text-white text-[10px] md:text-xs font-bold tracking-wide">Module 02</span>
                <span className="text-white/50 text-[8px] md:text-[10px] font-medium tracking-wider uppercase">
                  {Math.floor(currentTime)}s / {Math.floor(TOTAL_DURATION)}s
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3 group/vol">
              <button onClick={() => setIsMuted(!isMuted)} className="text-white/70 hover:text-white transition-colors">
                 {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <div className="w-16 md:w-20 h-1 bg-white/20 rounded-full cursor-pointer relative overflow-hidden">
                 <input 
                   type="range" min="0" max="1" step="0.05"
                   value={isMuted ? 0 : volume}
                   onChange={(e) => { setVolume(parseFloat(e.target.value)); setIsMuted(false); }}
                   className="absolute inset-0 opacity-0 cursor-pointer z-10"
                 />
                 <div className="h-full bg-white rounded-full" style={{ width: `${(isMuted ? 0 : volume) * 100}%` }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}