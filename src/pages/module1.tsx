"use client"

import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Volume2, VolumeX, Play, Pause, RotateCcw } from "lucide-react"
import { SceneHero } from "../components/scenes/module1/scene-hero.tsx"
import { SceneUpload } from "../components/scenes/module1/scene-upload.tsx"
import { SceneSMS } from "../components/scenes/module1/scene-sms.tsx"
import { SceneCard } from "../components/scenes/module1/scene-card.tsx"
import { SceneChannels } from "../components/scenes/module1/scene-channels.tsx"
import { SceneOfficers } from "../components/scenes/module1/scene-officers.tsx"
import { ScenePortal } from "../components/scenes/module1/scene-portal.tsx"
import { SceneTimeline } from "../components/scenes/module1/scene-timeline.tsx"
import { SceneTraining } from "../components/scenes/module1/scene-training.tsx"
import { SceneClosing } from "../components/scenes/module1/scene-closing.tsx"
import { SCRIPT_TIMING, TOTAL_DURATION, THEME } from "../lib/constants.ts"

interface Module1Props {
  onComplete?: () => void
}

export default function ModulePlayer({ onComplete }: Module1Props) {
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const controlTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-hide controls for immersion
  useEffect(() => {
    const resetControls = () => {
      setShowControls(true)
      if (controlTimeoutRef.current) clearTimeout(controlTimeoutRef.current)
      if (isPlaying) {
        controlTimeoutRef.current = setTimeout(() => setShowControls(false), 3000)
      }
    }
    window.addEventListener('mousemove', resetControls)
    return () => {
      window.removeEventListener('mousemove', resetControls)
      if (controlTimeoutRef.current) clearTimeout(controlTimeoutRef.current)
    }
  }, [isPlaying])

  useEffect(() => {
    audioRef.current = new Audio("/assets/Chris-Module 1 Audio.mp3")
    audioRef.current.preload = "auto"
    
    const handleAudioEnded = () => {
      setIsPlaying(false)
      if (onComplete) onComplete()
    }

    audioRef.current.addEventListener("ended", handleAudioEnded)
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [onComplete])

  // Sync Audio State
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.play().catch(e => console.log("Playback prevented:", e))
      else audioRef.current.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  // Sync Timer
  useEffect(() => {
    let animationFrame: number
    const animate = () => {
      if (audioRef.current && isPlaying) {
        setCurrentTime(audioRef.current.currentTime)
        animationFrame = requestAnimationFrame(animate)
      }
    }
    if (isPlaying) animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isPlaying])

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const newTime = percent * TOTAL_DURATION
    setCurrentTime(newTime)
    if (audioRef.current) audioRef.current.currentTime = newTime
  }

  // Scene Logic
  const getCurrentScene = () => {
    if (currentTime < SCRIPT_TIMING.hero.end) return "hero"
    if (currentTime < SCRIPT_TIMING.upload.end) return "upload"
    if (currentTime < SCRIPT_TIMING.sms.end) return "sms"
    if (currentTime < SCRIPT_TIMING.card.end) return "card"
    if (currentTime < SCRIPT_TIMING.channels.end) return "channels"
    if (currentTime < SCRIPT_TIMING.officers.end) return "officers"
    if (currentTime < SCRIPT_TIMING.portal.end) return "portal"
    if (currentTime < SCRIPT_TIMING.training.end) return "training"
    return "closing"
  }
  const currentScene = getCurrentScene()

  return (
    <div className="w-full h-full bg-[#17161A] relative overflow-hidden font-sans select-none">
      
      {/* Scene Render */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
           {currentScene === "hero" && <SceneHero key="hero" isActive={true} />}
           {currentScene === "upload" && <SceneUpload key="upload" isActive={true} progress={currentTime} />}
           {currentScene === "sms" && <SceneSMS key="sms" isActive={true} />}
           {currentScene === "card" && <SceneCard key="card" isActive={true} />}
           {currentScene === "channels" && <SceneChannels key="channels" isActive={true} />}
           {currentScene === "officers" && <SceneOfficers key="officers" isActive={true} />}
           {currentScene === "portal" && <ScenePortal key="portal" isActive={true} progress={currentTime} />}
           {currentScene === "timeline" && <SceneTimeline key="timeline" isActive={true} />}
           {currentScene === "training" && <SceneTraining key="training" isActive={true} />}
           {currentScene === "closing" && <SceneClosing key="closing" isActive={true} />}
        </AnimatePresence>
      </div>

      {/* Floating Control Bar (Apple Style) */}
      <div className="absolute inset-x-0 bottom-0 p-6 flex justify-center pointer-events-none z-50">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: showControls ? 0 : 40, opacity: showControls ? 1 : 0 }}
          className="bg-[#17161A]/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[2rem] p-4 w-full max-w-2xl pointer-events-auto flex flex-col gap-3"
        >
          {/* Progress Scrubber */}
          <div 
            className="w-full h-1.5 bg-white/10 rounded-full cursor-pointer group relative py-2"
            onClick={handleSeek}
          >
             <div className="absolute top-2 left-0 right-0 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-white/30 w-full origin-left scale-x-0" 
                  style={{ scaleX: currentTime / TOTAL_DURATION }}
                />
             </div>
             <motion.div 
               className="absolute top-2 left-0 h-1.5 bg-[#60BA81] rounded-full"
               style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
             >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] scale-0 group-hover:scale-100 transition-transform" />
             </motion.div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between px-2">
            
            {/* Play/Pause */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
              >
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
              </button>
              
              <div className="flex flex-col">
                <span className="text-white text-xs font-bold tracking-wide">Module 01</span>
                <span className="text-white/50 text-[10px] font-medium tracking-wider uppercase">
                  {Math.floor(currentTime)}s / {Math.floor(TOTAL_DURATION)}s
                </span>
              </div>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-3 group/vol">
              <button onClick={() => setIsMuted(!isMuted)} className="text-white/70 hover:text-white transition-colors">
                 {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <div className="w-20 h-1 bg-white/20 rounded-full cursor-pointer relative overflow-hidden">
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