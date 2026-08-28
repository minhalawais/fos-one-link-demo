"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { Zap, ShieldCheck, Search, ClipboardList, Activity } from "lucide-react"

import Module1Player from "./pages/module1-player.tsx"
import Module2Player from "./pages/module2-player.tsx"
import Module3Player from "./pages/module3-player.tsx"
import Module4Player from "./pages/module4-player.tsx"
import Module5Player from "./pages/module5-player.tsx"

import { MODULE_DATA } from "./lib/module-data.ts"
import { MODULE_DATA_UR, SLIDES_DATA_UR } from "./lib/module-data-ur.ts"

import Slide from "./components/Slide.tsx"
import NavigationPill from "./components/NavigationPill.tsx"
import SplashScreen from "./components/SplashScreen.tsx"
import LanguageToggle from "./components/LanguageToggle.tsx"

// --- DESIGN SYSTEM CONSTANTS ---
// Heavier spring for main screen card expand/collapse transitions
export const SPRING_PHYSICS = { type: "spring", stiffness: 220, damping: 26, mass: 1.6 }
const SLIDE_GAP_IDLE = 16
const SLIDE_GAP_EXPANDED = 26

// --- LIGHTWEIGHT CINEMATIC ENTRANCE ANIMATIONS ---

// Ambient Particles: Static positions to ensure smooth floating CSS animation without re-render flicker
const AMBIENT_PARTICLES_DATA = [
  { id: 0, x: 12, y: 25, size: 4, delay: 0.2, duration: 16 },
  { id: 1, x: 82, y: 15, size: 3, delay: 1.1, duration: 18 },
  { id: 2, x: 45, y: 70, size: 5, delay: 0.5, duration: 14 },
  { id: 3, x: 25, y: 80, size: 3, delay: 2.0, duration: 20 },
  { id: 4, x: 70, y: 60, size: 4, delay: 1.5, duration: 15 },
  { id: 5, x: 90, y: 40, size: 3, delay: 0.8, duration: 17 },
]

const AmbientParticles = () => (
  <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
    {AMBIENT_PARTICLES_DATA.map((p) => (
      <div
        key={p.id}
        className="absolute rounded-full particle-float"
        style={{
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: p.size,
          height: p.size,
          background: 'radial-gradient(circle, rgba(96,186,129,0.35), rgba(40,73,82,0.15))',
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`,
        }}
      />
    ))}
  </div>
)

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

// Logo - Remains un-translated as brand identity
const AnimatedLogo = () => (
  <div
    className="pointer-events-auto flex items-center gap-3 bg-white/80 backdrop-blur-lg px-4 py-1.5 rounded-full border border-white/60 shadow-[0_8px_32px_rgba(40,73,82,0.12)] relative logo-entrance"
    style={{ animationDelay: '0.2s' }}
  >
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#60BA81]/20 to-[#284952]/20 blur-xl logo-glow" />

    <img
      src="/assets/FOS-01.png"
      alt="Fruit of Sustainability (FOS)"
      className="w-7 h-7 object-contain relative z-10 logo-spin"
      style={{ animationDelay: '0.4s' }}
    />

    <span
      className="text-xs font-bold tracking-wider text-[#284952] uppercase relative z-10 text-reveal"
      style={{ animationDelay: '0.7s' }}
    >
      Fruit of Sustainability
    </span>
  </div>
)

const AnimatedHeading = ({ language = "en" }: { language?: "en" | "ur" }) => {
  if (language === "ur") {
    const urduPrefix = ["تعارف:"]
    const urduMain = ["ایف او ایس", "ڈیجیٹل", "شکایت", "مینجمنٹ", "سسٹم"]

    return (
      <h1 className="text-xl md:text-2xl lg:text-3xl text-[#284952] text-center w-full leading-relaxed relative whitespace-nowrap flex items-center justify-center gap-3 font-urdu" dir="rtl">
        {/* Subtle background glow */}
        <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-[#60BA81]/15 via-[#284952]/10 to-[#F5A83C]/15 heading-glow" />

        {/* Prefix */}
        <span className="relative z-10 flex gap-x-[0.35em] font-light tracking-wide opacity-80">
          {urduPrefix.map((word, i) => (
            <span
              key={`up-${i}`}
              className="inline-block word-reveal"
              style={{ animationDelay: `${0.8 + i * 0.1}s` }}
            >
              {word}
            </span>
          ))}
        </span>

        {/* Main Title */}
        <span className="relative z-10 flex gap-x-[0.35em] font-bold tracking-tight">
          {urduMain.map((word, i) => (
            <span
              key={`um-${i}`}
              className="inline-block word-reveal"
              style={{ animationDelay: `${1.0 + i * 0.08}s` }}
            >
              {word}
            </span>
          ))}
        </span>
      </h1>
    )
  }

  const prefix = ["Walkthrough", "of"]
  const mainTitle = ["FOS", "Digital", "Grievance", "Management", "System"]

  return (
    <h1 className="text-xl md:text-2xl lg:text-3xl text-[#284952] text-center w-full leading-tight relative whitespace-nowrap flex items-center justify-center gap-3">
      <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-[#60BA81]/15 via-[#284952]/10 to-[#F5A83C]/15 heading-glow" />

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

// Active Module Header
const ActiveModuleHeader = ({
  id,
  title,
  accentColor,
  language = "en",
  onSelectModule,
}: {
  id: number
  title: string
  accentColor: string
  language?: "en" | "ur"
  onSelectModule?: (modId: number) => void
}) => (
  <motion.div
    initial={{ y: -10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 5, opacity: 0 }}
    transition={SPRING_PHYSICS}
    className={`flex items-center gap-4 bg-white/40 backdrop-blur-md px-5 py-2 rounded-2xl border border-white/60 shadow-[0_8px_32px_rgba(40,73,82,0.08)] pointer-events-auto ${
      language === "ur" ? "flex-row-reverse font-urdu" : ""
    }`}
  >
    <div className="flex items-center gap-2">
      <span className={`text-[10px] font-black tracking-[0.2em] uppercase text-[#284952]/40 ${language === "ur" ? "font-urdu text-xs" : ""}`}>
        {language === "ur" ? "ماڈیول" : "Module"}
      </span>
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((modNum) => {
          const isActive = modNum === id
          return (
            <button
              key={modNum}
              type="button"
              onClick={() => onSelectModule?.(modNum - 1)}
              title={language === "ur" ? `ماڈیول ${modNum}` : `Module ${modNum}`}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-black border-2 transition-all cursor-pointer ${
                isActive ? "scale-110 shadow-sm" : "opacity-60 hover:opacity-100 hover:scale-105"
              }`}
              style={{
                color: isActive ? accentColor : "#284952",
                borderColor: isActive ? accentColor : "rgba(40,73,82,0.2)",
                backgroundColor: isActive ? `${accentColor}20` : "rgba(255,255,255,0.6)",
              }}
            >
              {modNum}
            </button>
          )
        })}
      </div>
    </div>

    <div className="w-[1px] h-6 bg-[#284952]/10" />

    <h2 className={`text-lg md:text-xl font-extrabold tracking-tight text-[#284952] ${language === "ur" ? "font-urdu text-xl font-bold" : ""}`}>
      {title}
    </h2>
  </motion.div>
)

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
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF9F7] via-[#F7F6F4] to-[#F3F1EE]" />

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

      <div
        className="absolute w-[50vw] h-[50vw] rounded-full"
        style={{
          background: `radial-gradient(ellipse at center, rgba(245,168,60,0.04) 0%, transparent 60%)`,
          top: '20%',
          left: '25%',
          filter: 'blur(80px)',
        }}
      />

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
  const [showSplash, setShowSplash] = useState(true)
  const [activeSlide, setActiveSlide] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isMouseActive, setIsMouseActive] = useState(true)
  const [language, setLanguage] = useState<"en" | "ur">("en")

  // Mouse timer ref for tracking user inactivity
  const mouseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevActiveSlideRef = useRef<number | null>(null)

  // --- Mouse Inactivity Tracking ---
  useEffect(() => {
    const handleMouseMove = () => {
      setIsMouseActive(true)
      if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current)

      if (isPlaying && activeSlide !== null) {
        mouseTimerRef.current = setTimeout(() => {
          setIsMouseActive(false)
        }, 3000)
      }
    }

    if (isPlaying && activeSlide !== null) {
      window.addEventListener("mousemove", handleMouseMove)
      mouseTimerRef.current = setTimeout(() => {
        setIsMouseActive(false)
      }, 3000)
    } else {
      setIsMouseActive(true)
      if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current)
    }
  }, [isPlaying, activeSlide])

  const handleSplashComplete = useCallback(() => setShowSplash(false), [])

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Dynamic slides data according to language
  const slides = useMemo(() => {
    const isUrdu = language === "ur"

    return [
      {
        id: 1,
        shortTitle: isUrdu ? SLIDES_DATA_UR[0].shortTitle : "Deploy",
        headline: isUrdu ? SLIDES_DATA_UR[0].headline : "Deployment & Onboarding",
        subtext: isUrdu ? SLIDES_DATA_UR[0].subtext : "Smooth rollout to empower every employee from day one.",
        duration: isUrdu ? SLIDES_DATA_UR[0].duration : 155,
        audioPath: isUrdu ? SLIDES_DATA_UR[0].audioPath : "/assets/Module 1 Script.mp3",
        icon: Zap,
        playerComponent: <Module1Player progress={currentTime} language={language} />,
        scenes: isUrdu ? MODULE_DATA_UR.module1.scenes : MODULE_DATA.module1.scenes,
      },
      {
        id: 2,
        shortTitle: isUrdu ? SLIDES_DATA_UR[1].shortTitle : "Intake",
        headline: isUrdu ? SLIDES_DATA_UR[1].headline : "Complaint Intake & Registration",
        subtext: isUrdu ? SLIDES_DATA_UR[1].subtext : "Multiple grievance reporting channels—confidential, accessible, and worker-friendly.",
        duration: isUrdu ? SLIDES_DATA_UR[1].duration : 141,
        audioPath: isUrdu ? SLIDES_DATA_UR[1].audioPath : "/assets/Module 2 Script.mp3",
        icon: ShieldCheck,
        playerComponent: <Module2Player progress={currentTime} language={language} />,
        scenes: isUrdu ? MODULE_DATA_UR.module2.scenes : MODULE_DATA.module2.scenes,
      },
      {
        id: 3,
        shortTitle: isUrdu ? SLIDES_DATA_UR[2].shortTitle : "Investigate",
        headline: isUrdu ? SLIDES_DATA_UR[2].headline : "Investigation-Remediation-Satisfaction Framework",
        subtext: isUrdu ? SLIDES_DATA_UR[2].subtext : "Systematic resolution workflows with verified employee satisfaction.",
        duration: isUrdu ? SLIDES_DATA_UR[2].duration : 176,
        audioPath: isUrdu ? SLIDES_DATA_UR[2].audioPath : "/assets/Module 3 Script.mp3",
        icon: Search,
        playerComponent: <Module3Player progress={currentTime} language={language} />,
        scenes: isUrdu ? MODULE_DATA_UR.module3.scenes : MODULE_DATA.module3.scenes,
      },
      {
        id: 4,
        shortTitle: isUrdu ? SLIDES_DATA_UR[3].shortTitle : "Surveys",
        headline: isUrdu ? SLIDES_DATA_UR[3].headline : "Digital Surveys",
        subtext: isUrdu ? SLIDES_DATA_UR[3].subtext : "Proactive employee engagement through in-app surveys.",
        duration: isUrdu ? SLIDES_DATA_UR[3].duration : 116,
        audioPath: isUrdu ? SLIDES_DATA_UR[3].audioPath : "/assets/Module 4 Script.mp3",
        icon: ClipboardList,
        playerComponent: <Module4Player progress={currentTime} language={language} />,
        scenes: isUrdu ? MODULE_DATA_UR.module4.scenes : MODULE_DATA.module4.scenes,
      },
      {
        id: 5,
        shortTitle: isUrdu ? SLIDES_DATA_UR[4].shortTitle : "Insights",
        headline: isUrdu ? SLIDES_DATA_UR[4].headline : "Dashboards & Risk Insights",
        subtext: isUrdu ? SLIDES_DATA_UR[4].subtext : "Data Intelligence for HRDD reporting and risk monitoring.",
        duration: isUrdu ? SLIDES_DATA_UR[4].duration : 165,
        audioPath: isUrdu ? SLIDES_DATA_UR[4].audioPath : "/assets/Module 5 Script.mp3",
        icon: Activity,
        playerComponent: <Module5Player progress={currentTime} language={language} />,
        scenes: isUrdu ? MODULE_DATA_UR.module5.scenes : MODULE_DATA.module5.scenes,
      },
    ]
  }, [language, currentTime])

  // Seek handler for control panel
  const handleSeek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
    setCurrentTime(time)
  }, [])

  const currentSlideData = activeSlide !== null ? slides[activeSlide] : null

  // Language switch handler: restarts current scene from its beginning
  const handleLanguageToggle = (newLang: "en" | "ur") => {
    if (newLang === language) return

    if (activeSlide !== null && currentSlideData) {
      // Find current scene index
      const scenes = currentSlideData.scenes
      const currentSceneIndex = scenes.findIndex(
        (s) => currentTime >= s.start && currentTime < s.end
      )

      const targetSceneIndex = currentSceneIndex !== -1 ? currentSceneIndex : 0
      const newModuleScenes = newLang === "ur"
        ? (MODULE_DATA_UR[`module${activeSlide + 1}`]?.scenes || [])
        : (MODULE_DATA[`module${activeSlide + 1}`]?.scenes || [])

      const restartTime = newModuleScenes[targetSceneIndex]?.start || 0

      const targetAudio = newLang === "ur"
        ? SLIDES_DATA_UR[activeSlide]?.audioPath
        : `/assets/Module ${activeSlide + 1} Script.mp3`

      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = new Audio(targetAudio)
        audioRef.current.currentTime = restartTime
        audioRef.current.volume = isMuted ? 0 : volume

        if (isPlaying) {
          audioRef.current.play().catch((e) => console.warn("Playback error on lang switch:", e))
        }
      }

      setCurrentTime(restartTime)
    }

    setLanguage(newLang)
  }

  // --- Audio Logic ---
  useEffect(() => {
    const handleEnded = () => {
      if (activeSlide !== null && activeSlide < slides.length - 1) {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
          audioRef.current = null
        }
        setActiveSlide((prev) => (prev !== null ? prev + 1 : null))
        setIsPlaying(false)
        setCurrentTime(0)
      } else {
        setIsPlaying(false)
        setCurrentTime(0)
        setActiveSlide(null)
      }
    }

    if (isPlaying && currentSlideData?.audioPath) {
      const currentSrc = audioRef.current?.src ? new URL(audioRef.current.src).pathname : ''
      const targetSrc = currentSlideData.audioPath

      if (!audioRef.current || !currentSrc.endsWith(targetSrc)) {
        if (audioRef.current) {
          audioRef.current.pause()
        }
        audioRef.current = new Audio(targetSrc)
        audioRef.current.currentTime = currentTime
      }

      audioRef.current.volume = isMuted ? 0 : volume
      audioRef.current.play().catch((e) => console.warn("Playback blocked or interrupted:", e))
      audioRef.current.addEventListener("ended", handleEnded)
    } else {
      audioRef.current?.pause()
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleEnded)
      }
    }
  }, [isPlaying, activeSlide, currentSlideData?.audioPath])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  // Custom seek event listener
  useEffect(() => {
    const handleSeekEvent = (e: Event) => {
      const customEvent = e as CustomEvent
      if (audioRef.current) {
        audioRef.current.currentTime = customEvent.detail.time
      }
      setCurrentTime(customEvent.detail.time)
    }
    window.addEventListener('seek-audio', handleSeekEvent)
    return () => window.removeEventListener('seek-audio', handleSeekEvent)
  }, [])

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

  // Reset timeline on module switch
  useEffect(() => {
    if (prevActiveSlideRef.current === activeSlide) return

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }

    setIsPlaying(false)
    setCurrentTime(0)
    prevActiveSlideRef.current = activeSlide
  }, [activeSlide])

  // --- Interaction Handlers ---
  const handleSlideClick = (index: number) => {
    if (activeSlide === index) return
    setActiveSlide(index)
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const handleClose = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    setIsPlaying(false)
    setCurrentTime(0)

    setTimeout(() => {
      setActiveSlide(null)
    }, 50)
  }, [])

  const activeSlideRef = useRef(activeSlide)
  activeSlideRef.current = activeSlide
  const slidesRef = useRef(slides)
  slidesRef.current = slides
  const isPlayingRef = useRef(isPlaying)
  isPlayingRef.current = isPlaying
  const currentTimeRef = useRef(currentTime)
  currentTimeRef.current = currentTime
  const currentSlideDataRef = useRef(currentSlideData)
  currentSlideDataRef.current = currentSlideData
  // Ref so keyboard handler can read language without stale closure
  const languageRef = useRef(language)
  languageRef.current = language

  const selectModule = useCallback((targetIndex: number) => {
    setShowSplash(false)
    if (targetIndex >= 0 && targetIndex < slidesRef.current.length) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        audioRef.current = null
      }
      setActiveSlide(targetIndex)
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }, [])

  // --- Centralized Keyboard Navigation ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)) {
        return
      }

      if (e.code === "Space") {
        e.preventDefault()
        setShowSplash(false)
        setIsPlaying((prev) => !prev)
        return
      }

      if (e.key === "Escape") {
        e.preventDefault()
        handleClose()
        return
      }

      // Detect number keys 1-5 across digit keys, numpad keys, and key strings
      let numPressed: number | null = null
      if (["1", "2", "3", "4", "5"].includes(e.key)) {
        numPressed = Number.parseInt(e.key, 10)
      } else if (e.code.startsWith("Digit")) {
        const digit = Number.parseInt(e.code.replace("Digit", ""), 10)
        if (digit >= 1 && digit <= 5) numPressed = digit
      } else if (e.code.startsWith("Numpad")) {
        const digit = Number.parseInt(e.code.replace("Numpad", ""), 10)
        if (digit >= 1 && digit <= 5) numPressed = digit
      }

      if (numPressed !== null) {
        e.preventDefault()
        selectModule(numPressed - 1)
        return
      }

      const activeSlideVal = activeSlideRef.current
      const slidesVal = slidesRef.current
      const isPlayingVal = isPlayingRef.current
      const currentTimeVal = currentTimeRef.current
      const currentSlideDataVal = currentSlideDataRef.current
      // In Urdu, arrow directions are flipped to match RTL module orientation
      const isUrdu = languageRef.current === "ur"

      // ArrowRight: next module in LTR, previous module in RTL (Urdu)
      if (e.key === "ArrowRight") {
        e.preventDefault()
        setShowSplash(false)
        if (isUrdu) {
          if (activeSlideVal !== null) {
            if (activeSlideVal > 0) selectModule(activeSlideVal - 1)
            else handleClose()
          }
        } else {
          if (activeSlideVal === null) selectModule(0)
          else if (activeSlideVal < slidesVal.length - 1) selectModule(activeSlideVal + 1)
        }
        return
      }

      // ArrowLeft: previous module in LTR, next module in RTL (Urdu)
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        setShowSplash(false)
        if (isUrdu) {
          if (activeSlideVal === null) selectModule(0)
          else if (activeSlideVal < slidesVal.length - 1) selectModule(activeSlideVal + 1)
        } else {
          if (activeSlideVal !== null) {
            if (activeSlideVal > 0) selectModule(activeSlideVal - 1)
            else handleClose()
          }
        }
        return
      }

      if (e.key === "ArrowDown") {
        e.preventDefault()
        setShowSplash(false)
        if (activeSlideVal === null) {
          selectModule(0)
        } else {
          const scenes = slidesVal[activeSlideVal].scenes
          // If on static intro screen, start scene 1 (index 0)
          if (!isPlayingVal && currentTimeVal === 0) {
            handleSeek(scenes[0]?.start || 0)
            setIsPlaying(true)
            return
          }

          const currentIdx = scenes.findIndex(
            (s) => currentTimeVal >= s.start && currentTimeVal < s.end
          )
          if (currentIdx !== -1 && currentIdx < scenes.length - 1) {
            handleSeek(scenes[currentIdx + 1].start)
          } else if (activeSlideVal < slidesVal.length - 1) {
            selectModule(activeSlideVal + 1)
          }
        }
        return
      }

      if (e.key === "ArrowUp") {
        e.preventDefault()
        setShowSplash(false)
        if (activeSlideVal !== null) {
          const scenes = slidesVal[activeSlideVal].scenes
          // If already at intro screen
          if (!isPlayingVal && currentTimeVal === 0) {
            if (activeSlideVal > 0) {
              selectModule(activeSlideVal - 1)
            } else {
              handleClose()
            }
            return
          }

          const currentIdx = scenes.findIndex(
            (s) => currentTimeVal >= s.start && currentTimeVal < s.end
          )
          if (currentIdx > 0) {
            handleSeek(scenes[currentIdx - 1].start)
          } else if (currentIdx === 0) {
            if (currentTimeVal > (scenes[0]?.start || 0) + 1.5) {
              handleSeek(scenes[0]?.start || 0)
            } else {
              // Return to module intro screen
              if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current.currentTime = 0
              }
              setIsPlaying(false)
              setCurrentTime(0)
            }
          } else if (activeSlideVal > 0) {
            selectModule(activeSlideVal - 1)
          } else {
            handleClose()
          }
        }
        return
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleClose, handleSeek, selectModule])

  const getSlideStatus = (index: number): string => {
    if (activeSlide === null) return "idle"
    if (activeSlide === index) return "expanded"
    if (index === activeSlide - 1 || index === activeSlide + 1) return "peek"
    return "hidden"
  }

  return (
    <div className="h-screen w-full font-sans overflow-hidden flex flex-col relative text-[#17161A] bg-[#F5F5F7]">
      {/* Splash Screen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <EtherealBackground activeSlide={activeSlide} />
      <AmbientParticles />
      <LightRays />
      <CinematicGrain />

      {/* Floating Top-Right Language Switcher */}
      <div className="fixed top-6 right-8 z-50 pointer-events-auto">
        <LanguageToggle language={language} onToggle={handleLanguageToggle} />
      </div>

      {/* Floating Header "Island" */}
      <nav className="w-full pt-6 pb-2 flex flex-col items-center justify-center z-40 relative pointer-events-none gap-4">
        <AnimatedLogo />
        <AnimatePresence mode="wait">
          {activeSlide === null || (!isPlaying && currentTime === 0) ? (
            <AnimatedHeading key={`main-heading-${language}`} language={language} />
          ) : (
            currentSlideData && (
              <ActiveModuleHeader
                key={`module-header-${currentSlideData.id}-${language}`}
                id={currentSlideData.id}
                title={currentSlideData.headline}
                language={language}
                onSelectModule={selectModule}
                accentColor={
                  currentSlideData.id === 1 ? "#60BA81" :
                    currentSlideData.id === 2 ? "#F5A83C" :
                      currentSlideData.id === 3 ? "#60BA81" :
                        currentSlideData.id === 4 ? "#3B82F6" :
                          "#8B5CF6"
                }
              />
            )
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content Stage */}
      <main className="flex-1 w-full h-full flex flex-col justify-center relative z-10">
        <LayoutGroup>
          <motion.div
            ref={containerRef}
            className="w-full h-[80vh] flex items-center justify-center pb-10"
            layout
          >
            <motion.div
              className={`flex ${language === "ur" ? "flex-row-reverse" : "flex-row"} h-full items-center px-4 md:px-4`}
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
                  key={`slide-${item.id}-${language}`}
                  index={index}
                  item={item}
                  status={getSlideStatus(index)}
                  onClick={() => handleSlideClick(index)}
                  onClose={handleClose}
                  isPlaying={activeSlide === index && isPlaying}
                  playerComponent={item.playerComponent}
                  totalSlides={slides.length}
                  currentTime={currentTime}
                  scenes={item.scenes}
                  onSeek={handleSeek}
                  onStartModule={() => setIsPlaying(true)}
                  onSelectModule={selectModule}
                  language={language}
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
              exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
              transition={{ delay: 3.5, duration: 0.5 }}
              className={`absolute ${language === "ur" ? "bottom-2" : "bottom-6"} left-0 right-0 text-center pointer-events-none`}
            >
              <p className={`text-[#284952]/40 font-bold tracking-[0.3em] uppercase ${language === "ur" ? "font-urdu text-xl leading-relaxed" : "text-xs"}`}>
                {language === "ur" ? "کسی ماڈیول کا انتخاب کریں" : "Select a Module"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <NavigationPill
        visible={activeSlide !== null && (isMouseActive || !isPlaying)}
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
        scenes={currentSlideData?.scenes}
        onSeek={handleSeek}
        language={language}
      />
    </div>
  )
}