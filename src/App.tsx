"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, LayoutGroup, useMotionValue, useTransform } from "framer-motion"
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

// --- CINEMATIC ENTRANCE ANIMATIONS ---

// Ambient Particles floating in background
const AmbientParticles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 3,
  }))

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-[#60BA81]/20 to-[#284952]/20 blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Light Rays emanating from center
const LightRays = () => {
  const rays = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    rotation: (360 / 8) * i,
  }))

  return (
    <div className="pointer-events-none fixed inset-0 z-[4] overflow-hidden flex items-center justify-center">
      {rays.map((ray) => (
        <motion.div
          key={ray.id}
          className="absolute w-[2px] h-[50vh] origin-bottom"
          style={{
            background: "linear-gradient(to top, transparent, rgba(96, 186, 129, 0.15), transparent)",
            rotate: ray.rotation,
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{
            duration: 2.5,
            delay: 1 + ray.id * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </div>
  )
}

// Logo with particle burst effect
const AnimatedLogo = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    angle: (360 / 20) * i,
    distance: Math.random() * 60 + 40,
  }))

  return (
    <motion.div
      className="pointer-events-auto flex items-center gap-3 bg-white/70 backdrop-blur-xl px-6 py-2 rounded-full border border-white/50 shadow-lg shadow-black/5 relative"
      initial={{ scale: 0, rotate: -180, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{
        duration: 1.8,
        type: "spring",
        stiffness: 80,
        damping: 15,
      }}
    >
      {/* Particle burst effect */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-[#60BA81] to-[#284952]"
          style={{
            left: "50%",
            top: "50%",
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((particle.angle * Math.PI) / 180) * particle.distance,
            y: Math.sin((particle.angle * Math.PI) / 180) * particle.distance,
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 1.5,
            delay: 0.8,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#60BA81]/30 to-[#284952]/30 blur-xl"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 1.5, 1], opacity: [0, 0.8, 0] }}
        transition={{
          duration: 2,
          delay: 0.5,
          times: [0, 0.5, 1],
        }}
      />

      {/* Logo image */}
      <motion.img
        src="/assets/FOS-01.png"
        alt="Fruit of Sustainability"
        className="w-10 h-10 object-contain relative z-10"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          duration: 1.2,
          delay: 0.6,
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
      />

      {/* Text with character reveal */}
      <motion.span
        className="text-sm font-bold tracking-wider text-[#284952] uppercase relative z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        Fruit of Sustainability
      </motion.span>
    </motion.div>
  )
}

// Heading with character-by-character reveal
const AnimatedHeading = () => {
  const text = "WalkThrough of FOS Grievance Management System"
  const words = text.split(" ")

  return (
    <motion.h1
      className="text-3xl md:text-4xl font-bold text-[#284952] tracking-tight text-center max-w-4xl leading-tight relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
    >
      {/* Glow effect behind text */}
      <motion.div
        className="absolute inset-0 blur-2xl bg-gradient-to-r from-[#60BA81]/20 via-[#284952]/20 to-[#F5A83C]/20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 1, 0.5], scale: [0.8, 1.2, 1] }}
        transition={{ duration: 2, delay: 1.8 }}
      />

      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.3em]">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              className="inline-block relative"
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.8 + wordIndex * 0.1 + charIndex * 0.03,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  )
}

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
    charcoal: "#17161A",
    white: "#FFFFFF",
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#F5F5F7]">
      <motion.div
        className="absolute w-[80vw] h-[80vw] rounded-full blur-[100px] opacity-20 top-[-20%] left-[-10%]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          backgroundColor: activeSlide === 0 ? colors.green : activeSlide === 1 ? colors.orange : colors.teal,
          x: activeSlide !== null ? -50 : 0,
          opacity: 0.2,
          scale: 1,
        }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      <motion.div
        className="absolute w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-15 bottom-[-10%] right-[-10%]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          backgroundColor: activeSlide === 2 ? colors.teal : activeSlide === 3 ? colors.green : colors.orange,
          opacity: 0.15,
          scale: 1,
        }}
        transition={{ duration: 2, delay: 0.8 }}
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
      <AmbientParticles />
      <LightRays />
      <CinematicGrain />

      {/* Floating Header "Island" */}
      <nav className="w-full pt-8 pb-4 flex flex-col items-center justify-center z-50 relative pointer-events-none gap-6">
        <AnimatedLogo />
        <AnimatedHeading />
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

        {/* Floating Hint Text */}
        <AnimatePresence>
          {activeSlide === null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 3.5 }}
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