"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, LayoutGroup, useMotionValue, useTransform } from "framer-motion"
import { Zap, ShieldCheck, Search, ClipboardList, Activity } from "lucide-react"

import Module1Player from "./pages/module1-player.tsx"
import Module2Player from "./pages/module2-player.tsx"
import Module3Player from "./pages/module3-player.tsx"
import Module4Player from "./pages/module4-player.tsx"
import Module5Player from "./pages/module5-player.tsx"

// ControlPanel is now inside Slide.tsx, so we don't import it here directly
import { MODULE_DATA } from "./lib/module-data.ts"

import Slide from "./components/Slide.tsx"
import NavigationPill from "./components/NavigationPill.tsx"

// --- DESIGN SYSTEM CONSTANTS ---
export const SPRING_PHYSICS = { type: "spring", stiffness: 120, damping: 20, mass: 1.1 }
const SLIDE_GAP_IDLE = 16
const SLIDE_GAP_EXPANDED = 24

// --- LIGHTWEIGHT CINEMATIC ENTRANCE ANIMATIONS ---
// Using CSS animations for GPU acceleration and smooth performance

// Ambient Particles - Reduced count with CSS animations
const AmbientParticles = () => {
  // Reduced to 12 particles for better performance
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 2,
    delay: Math.random() * 2,
    duration: 12 + Math.random() * 8,
  }))

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full particle-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: 'radial-gradient(circle, rgba(96,186,129,0.4), rgba(40,73,82,0.2))',
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

// Light Rays - Pure CSS animation
const LightRays = () => (
  <div className="pointer-events-none fixed inset-0 z-[4] overflow-hidden flex items-center justify-center">
    {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, i) => (
      <div
        key={i}
        className="absolute w-[1px] h-[40vh] origin-bottom light-ray-reveal"
        style={{
          background: 'linear-gradient(to top, transparent, rgba(96, 186, 129, 0.12), transparent)',
          transform: `rotate(${rotation}deg)`,
          animationDelay: `${0.8 + i * 0.08}s`,
        }}
      />
    ))}
  </div>
)

// Logo - Simplified elegant animation
const AnimatedLogo = () => (
  <div
    className="pointer-events-auto flex items-center gap-3 bg-white/80 backdrop-blur-lg px-6 py-2.5 rounded-full border border-white/60 shadow-[0_8px_32px_rgba(40,73,82,0.12)] relative logo-entrance"
    style={{ animationDelay: '0.2s' }}
  >
    {/* Subtle glow pulse */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#60BA81]/20 to-[#284952]/20 blur-xl logo-glow" />

    {/* Logo image */}
    <img
      src="/assets/FOS-01.png"
      alt="Fruit of Sustainability (FOS)"
      className="w-10 h-10 object-contain relative z-10 logo-spin"
      style={{ animationDelay: '0.4s' }}
    />

    {/* Text with fade slide */}
    <span
      className="text-sm font-bold tracking-wider text-[#284952] uppercase relative z-10 text-reveal"
      style={{ animationDelay: '0.7s' }}
    >
      Fruit of Sustainability
    </span>
  </div>
)

// Heading - Word-by-word reveal instead of character-by-character (much lighter)
// Heading - Word-by-word reveal with premium styling
const AnimatedHeading = () => {
  const prefix = ["Walkthrough", "of"]
  const mainTitle = ["FOS", "Digital", "Grievance", "Management", "System"]

  return (
    <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#284952] text-center w-full leading-tight relative whitespace-nowrap flex items-center justify-center gap-3" >
      {/* Subtle background glow */}
      <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-[#60BA81]/15 via-[#284952]/10 to-[#F5A83C]/15 heading-glow" />

      {/* Prefix: Graceful, lighter weight */}
      <span className="relative z-10 flex gap-x-[0.35em] font-light tracking-wide opacity-80">
        {prefix.map((word, i) => (
          <span
            key={`p-${i}`}
            className="inline-block word-reveal"
            style={{ animationDelay: `${0.8 + i * 0.1}s` }}
          >
            {word}
          </span>
        ))}
      </span>

      {/* Main Title: Bold, Premium */}
      <span className="relative z-10 flex gap-x-[0.35em] font-bold tracking-tight">
        {mainTitle.map((word, i) => (
          <span
            key={`m-${i}`}
            className="inline-block word-reveal"
            style={{ animationDelay: `${1.1 + i * 0.1}s` }}
          >
            {word}
          </span>
        ))}
      </span>
    </h1>
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
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base warm neutral background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF9F7] via-[#F7F6F4] to-[#F3F1EE]" />

      {/* Mesh gradient layer 1 - Deep Teal accent - CSS fade-in */}
      <div
        className="absolute w-[80vw] h-[80vw] rounded-full bg-gradient-fade-in"
        style={{
          background: `radial-gradient(circle, rgba(40,73,82,0.08) 0%, rgba(40,73,82,0.02) 50%, transparent 70%)`,
          top: '-30%',
          left: '-25%',
          filter: 'blur(60px)',
          animationDelay: '0.3s',
        }}
      />

      {/* Mesh gradient layer 2 - Fresh Green accent - CSS fade-in */}
      <div
        className="absolute w-[60vw] h-[60vw] rounded-full bg-gradient-fade-in"
        style={{
          background: `radial-gradient(circle, rgba(96,186,129,0.07) 0%, rgba(96,186,129,0.02) 50%, transparent 70%)`,
          bottom: '-20%',
          right: '-15%',
          filter: 'blur(50px)',
          animationDelay: '0.6s',
        }}
      />

      {/* Mesh gradient layer 3 - Warm Orange subtle center glow */}
      <div
        className="absolute w-[50vw] h-[50vw] rounded-full"
        style={{
          background: `radial-gradient(ellipse at center, rgba(245,168,60,0.04) 0%, transparent 60%)`,
          top: '20%',
          left: '25%',
          filter: 'blur(80px)',
        }}
      />

      {/* Subtle animated blob 1 - CSS animation */}
      <div
        className="absolute w-[30vw] h-[30vw] rounded-full opacity-[0.03] blob-drift-1"
        style={{
          background: 'linear-gradient(135deg, #284952, #60BA81)',
          top: '10%',
          right: '10%',
          filter: 'blur(40px)',
        }}
      />

      {/* Subtle animated blob 2 - CSS animation */}
      <div
        className="absolute w-[25vw] h-[25vw] rounded-full opacity-[0.02] blob-drift-2"
        style={{
          background: 'linear-gradient(225deg, #F5A83C, #60BA81)',
          bottom: '15%',
          left: '5%',
          filter: 'blur(50px)',
        }}
      />

      {/* Premium subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(40,73,82,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(40,73,82,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Vignette effect for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(40,73,82,0.03) 100%)',
        }}
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
      audioPath: "/assets/Module 1 Script.mp3",
      icon: Zap,
      playerComponent: <Module1Player progress={currentTime} />,
      scenes: MODULE_DATA.module1.scenes,
    },
    {
      id: 2,
      shortTitle: "Intake",
      headline: "Complaint Intake & Registration",
      subtext: "Multiple grievance reporting channels—confidential, accessible, and worker-friendly.",
      duration: 98,
      audioPath: "/assets/Module 2 Script.mp3",
      icon: ShieldCheck,
      playerComponent: <Module2Player progress={currentTime} />,
      scenes: MODULE_DATA.module2.scenes,
    },
    {
      id: 3,
      shortTitle: "Investigate",
      headline: "Investigation-Remediation-Satisfaction Framework",
      subtext: "Systematic resolution workflows with verified employee satisfaction.",
      duration: 177,
      audioPath: "/assets/Module 3 Script.mp3",
      icon: Search,
      playerComponent: <Module3Player progress={currentTime} />,
      scenes: MODULE_DATA.module3.scenes,
    },
    {
      id: 4,
      shortTitle: "Surveys",
      headline: "Digital Surveys",
      subtext: "Proactive employee engagement through in-app surveys.",
      duration: 115,
      audioPath: "/assets/Module 4 Script.mp3",
      icon: ClipboardList,
      playerComponent: <Module4Player progress={currentTime} />,
      scenes: MODULE_DATA.module4.scenes,
    },
    {
      id: 5,
      shortTitle: "Insights",
      headline: "Dashboards & Risk Insights",
      subtext: "Data Intelligence for HRDD reporting and risk monitoring.",
      duration: 102,
      audioPath: "/assets/Module 5 Script.mp3",
      icon: Activity,
      playerComponent: <Module5Player progress={currentTime} />,
      scenes: MODULE_DATA.module5.scenes,
    },
  ]

  // Seek handler for control panel
  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

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
        <AnimatePresence>
          {activeSlide === null && <AnimatedHeading />}
        </AnimatePresence>
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
              className="flex h-full items-center px-4 md:px-4"
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
                  key={`slide-${item.id}`}
                  index={index}
                  item={item}
                  status={getSlideStatus(index)}
                  onClick={() => handleSlideClick(index)}
                  isPlaying={activeSlide === index && isPlaying}
                  playerComponent={item.playerComponent}
                  totalSlides={slides.length}
                  currentTime={currentTime}
                  scenes={item.scenes}
                  onSeek={handleSeek}
                  onStartModule={() => setIsPlaying(true)}
                />
              ))}
            </motion.div>
          </motion.div>
        </LayoutGroup>

        {/* Floating Hint Text - Only show when no slide is active */}
        <AnimatePresence>
          {activeSlide === null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
              transition={{ delay: 3.5, duration: 0.5 }}
              className="absolute bottom-6 left-0 right-0 text-center pointer-events-none"
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