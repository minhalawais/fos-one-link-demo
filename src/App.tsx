"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { Zap, ShieldCheck, Search, Activity } from "lucide-react"

import Module1Player from "./pages/module1-player.tsx"
import Module2Player from "./pages/module2-player.tsx"
import Module3Player from "./pages/module3-player.tsx"
import Module4Player from "./pages/module4-player.tsx"

// ControlPanel is now inside Slide.tsx, so we don't import it here directly
import { MODULE_DATA } from "./lib/module-data.ts"

import Slide from "./components/Slide.tsx"
import NavigationPill from "./components/NavigationPill.tsx"

// --- DESIGN SYSTEM CONSTANTS ---
export const SPRING_PHYSICS = { type: "spring", stiffness: 120, damping: 20, mass: 1.1 }
const SLIDE_GAP_IDLE = 16
const SLIDE_GAP_EXPANDED = 24

// --- ATMOSPHERE COMPONENTS ---

const CinematicGrain = () => (
  <div
    className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03] mix-blend-hard-light"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
)

const EtherealBackground = ({ activeSlide }: { activeSlide: number | null }) => {
  const colors = {
    teal: "#284952",
    green: "#60BA81",
    orange: "#F5A83C",
    blue: "#3B82F6",
    white: "#FFFFFF",
  }

  // Soft, diffuse gradients
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#F5F5F7]">
      <motion.div
        className="absolute w-[80vw] h-[80vw] rounded-full blur-[100px] opacity-20 top-[-20%] left-[-10%]"
        animate={{
          backgroundColor: activeSlide === 0 ? colors.green : activeSlide === 1 ? colors.orange : colors.teal,
          x: activeSlide !== null ? -50 : 0,
        }}
        transition={{ duration: 2 }}
      />
      <motion.div
        className="absolute w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-15 bottom-[-10%] right-[-10%]"
        animate={{
          backgroundColor: activeSlide === 2 ? colors.teal : activeSlide === 3 ? colors.blue : colors.orange,
        }}
        transition={{ duration: 2 }}
      />
    </div>
  )
}

export default function App() {
  const [activeSlide, setActiveSlide] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const slides = [
    {
      id: 1,
      shortTitle: "Deploy",
      headline: "Deployment & Onboarding",
      subtext: "Smooth rollout to empower every employee from day one.",
      duration: 102,
      audioPath: "/assets/Chris-Module 1 Audio.mp3",
      icon: Zap,
      playerComponent: <Module1Player progress={currentTime} />,
    },
    {
      id: 2,
      shortTitle: "Intake",
      headline: "Complaint Intake & Registration",
      subtext: "Multiple grievance reporting channels—confidential, accessible, and worker-friendly.",
      duration: 98,
      audioPath: "/assets/Chris-Module 2 Audio.mp3",
      icon: ShieldCheck,
      playerComponent: <Module2Player progress={currentTime} />,
    },
    {
      id: 3,
      shortTitle: "Investigate",
      headline: "Investigation-Remediation-Satisfaction Framework",
      subtext: "Systematic resolution workflows with verified employee satisfaction.",
      duration: 120,
      audioPath: "/assets/Chris-Module 3 Audio.mp3",
      icon: Search,
      playerComponent: <Module3Player progress={currentTime} />,
    },
    {
      id: 4,
      shortTitle: "Insights",
      headline: "Dashboards & Risk Insights",
      subtext: "Data Intelligence for HRDD reporting and risk monitoring.",
      duration: 102,
      audioPath: "/assets/Chris-Module 4 Audio.mp3",
      icon: Activity,
      playerComponent: <Module4Player progress={currentTime} />,
    },
  ]

  const currentSlideData = activeSlide !== null ? slides[activeSlide] : null

  // --- Audio Logic (Preserved) ---
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    if (isPlaying && currentSlideData?.audioPath) {
      audioRef.current = new Audio(currentSlideData.audioPath)
      audioRef.current.volume = isMuted ? 0 : volume
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((e) => console.warn("Autoplay blocked:", e))

      const handleEnded = () => {
        if (activeSlide !== null && activeSlide < slides.length - 1) {
          setActiveSlide((prev) => (prev !== null ? prev + 1 : null))
          setIsPlaying(true)
          setCurrentTime(0)
        } else {
          setIsPlaying(false)
          setCurrentTime(0)
          setActiveSlide(null)
        }
      }

      audioRef.current.addEventListener("ended", handleEnded)
      return () => {
        audioRef.current?.removeEventListener("ended", handleEnded)
        audioRef.current?.pause()
      }
    }
  }, [isPlaying, activeSlide])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  // Listen for custom seek events from ControlPanel (Loose coupling)
  useEffect(() => {
    const handleSeekEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (audioRef.current) {
        audioRef.current.currentTime = customEvent.detail.time;
        setCurrentTime(customEvent.detail.time);
      }
    };
    window.addEventListener('seek-audio', handleSeekEvent);
    return () => window.removeEventListener('seek-audio', handleSeekEvent);
  }, []);

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

  // --- Interaction Handlers ---
  const handleSlideClick = (index: number) => {
    if (activeSlide === index) return
    setActiveSlide(index)
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const handleClose = () => {
    // Stop audio immediately
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Reset states
    setIsPlaying(false);
    setCurrentTime(0);

    // Small delay to allow clean animation transitions
    setTimeout(() => {
      setActiveSlide(null);
    }, 50);
  }

  const getSlideStatus = (index: number): string => {
    if (activeSlide === null) return "idle"
    if (activeSlide === index) return "expanded"
    if (index === activeSlide - 1 || index === activeSlide + 1) return "peek"
    return "hidden"
  }

  return (
    <div className="h-screen w-full font-sans overflow-hidden flex flex-col relative text-[#17161A] bg-[#F5F5F7]">
      <EtherealBackground activeSlide={activeSlide} />
      <CinematicGrain />

      {/* Floating Header "Island" */}
      <nav className="w-full pt-8 pb-4 flex justify-center z-50 relative pointer-events-none">
        <motion.div
          className="pointer-events-auto flex items-center gap-3 bg-white/70 backdrop-blur-xl px-6 py-2 rounded-full border border-white/50 shadow-lg shadow-black/5"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring" }}
        >
          {/* Replace the colored dot with your logo */}
          <img
            src="/assets/FOS-01.png"
            alt="Fruit of Sustainability"
            className="w-10 h-10 object-contain"
          />
          <span className="text-sm font-bold tracking-wider text-[#284952] uppercase">Fruit of Sustainability</span>
        </motion.div>
      </nav>

      {/* Main Content Stage */}
      <main className="flex-1 w-full h-full flex flex-col justify-center relative z-10">
        <LayoutGroup>
          <motion.div
            ref={containerRef}
            className="w-full h-[75vh] flex items-center justify-center pb-10"
            layout
          >
            <motion.div
              className="flex h-full items-center px-4 md:px-12"
              layout
              initial={false}
              animate={{
                gap: activeSlide !== null ? `${SLIDE_GAP_EXPANDED}px` : `${SLIDE_GAP_IDLE}px`,
              }}
              transition={SPRING_PHYSICS}
              style={{
                width: "100%",
                maxWidth: "1800px",
                justifyContent: activeSlide !== null ? "center" : "space-between",
              }}
            >
              {slides.map((item, index) => (
                <Slide
                  key={`${item.id}-${activeSlide === index && isPlaying ? 'playing' : 'idle'}`}
                  index={index}
                  item={item}
                  status={getSlideStatus(index)}
                  onClick={() => handleSlideClick(index)}
                  isPlaying={activeSlide === index && isPlaying}
                  playerComponent={item.playerComponent}
                  totalSlides={slides.length}
                  currentTime={currentTime}
                />
              ))}
            </motion.div>
          </motion.div>
        </LayoutGroup>

        {/* Removed global ControlPanelContainer */}

        {/* Floating Hint Text */}
        <AnimatePresence>
          {activeSlide === null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 left-0 right-0 text-center pointer-events-none"
            >
              <p className="text-[#284952]/40 text-xs font-bold tracking-[0.3em] uppercase">
                Select a Module
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <NavigationPill
        visible={activeSlide !== null}
        isPlaying={isPlaying}
        currentTime={currentTime}
        totalDuration={currentSlideData?.duration || 120}
        volume={volume}
        isMuted={isMuted}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onVolumeChange={setVolume}
        onMuteToggle={() => setIsMuted(!isMuted)}
        onClose={handleClose}
        activeSlideTitle={currentSlideData?.shortTitle}
      />
    </div>
  )
}