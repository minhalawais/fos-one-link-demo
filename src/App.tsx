"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Search,
  MessageSquare,
  Smartphone,
  ArrowRight,
  CreditCard,
  Globe,
  ShieldCheck,
  Activity,
  FileCheck,
  Fingerprint,
  Phone,
  Mail,
  X,
  Zap,
} from "lucide-react"

// Import existing module players
import Module1Player from "./pages/module1-player.tsx"
import Module2Player from "./pages/module2-player.tsx"
import Module3Player from "./pages/module3-player.tsx"
import Module4Player from "./pages/module4-player.tsx"

// Import control panel and module data
import { ControlPanel } from "./components/control-panel.tsx"
import { MODULE_DATA } from "./lib/module-data.ts"

// --- DESIGN SYSTEM CONSTANTS ---
const IOS_EASE = [0.32, 0.72, 0, 1]

// --- UTILITY COMPONENTS ---
const GrainOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
)

const GlassCard = ({ children, className = "" }) => (
  <div
    className={`bg-white/60 backdrop-blur-2xl border border-white/40 shadow-xl shadow-[#284952]/5 rounded-[2rem] ${className}`}
  >
    {children}
  </div>
)

// --- ENHANCED CONTROL PANEL WRAPPER ---
const ControlPanelContainer = ({ 
  isVisible, 
  currentProgress, 
  isPlaying, 
  activeSlide 
}) => {
  if (!isVisible || activeSlide === null) return null

  const moduleId = `module${activeSlide + 1}`
  const moduleData = MODULE_DATA[moduleId]

  if (!moduleData) return null

  // Determine position based on module: right for modules 1-2, left for modules 3-4
  const position = activeSlide < 2 ? 'right' : 'left'

  return (
    <ControlPanel
      scenes={moduleData.scenes}
      currentProgress={currentProgress}
      isPlaying={isPlaying}
      moduleId={moduleId}
      position={position}
    />
  )
}

// --- VISUAL SCENES (Unchanged) ---
const FloatingIcon = ({ icon: Icon, delay = 0, x = 0, y = 0, color = "text-[#284952]" }) => (
  <motion.div
    className={`absolute p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${color}`}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1, x: [x, x + 8, x], y: [y, y - 8, y] }}
    transition={{
      opacity: { delay, duration: 0.5 },
      scale: { delay, duration: 0.5, type: "spring" },
      default: { duration: 6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" },
    }}
  >
    <Icon size={24} strokeWidth={2} />
  </motion.div>
)

const DeploymentVisual = () => (
  <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-[#F5F5F7]">
    <div className="absolute inset-0 bg-gradient-to-tr from-[#284952]/5 to-transparent" />
    <motion.div className="relative z-10" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: IOS_EASE }}>
      <GlassCard className="p-8 flex flex-col items-center gap-6 w-64 border-t border-white/80">
        <div className="relative">
          <div className="absolute inset-0 bg-[#60BA81] blur-2xl opacity-30 rounded-full" />
          <div className="bg-gradient-to-br from-[#284952] to-[#1a2e33] p-6 rounded-[1.5rem] shadow-2xl shadow-[#284952]/20 relative z-10">
            <Fingerprint size={48} className="text-white" strokeWidth={1.5} />
          </div>
        </div>
        <div className="space-y-3 w-full">
            <div className="flex justify-between text-xs font-semibold text-[#284952]/60 uppercase tracking-widest">
                <span>Syncing</span>
                <span>100%</span>
            </div>
          <div className="h-2 w-full bg-[#DEE2E6] rounded-full overflow-hidden">
            <motion.div className="h-full bg-[#60BA81]" animate={{ width: ["0%", "100%"] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }} />
          </div>
        </div>
      </GlassCard>
    </motion.div>
    <FloatingIcon icon={CreditCard} x={100} y={-80} delay={0.2} color="text-[#F5A83C]" />
    <FloatingIcon icon={Smartphone} x={-110} y={50} delay={0.4} color="text-[#60BA81]" />
  </div>
)

const IntakeVisual = () => (
  <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-[#FFF8F0]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#F5A83C]/10 to-transparent opacity-50" />
    <motion.div className="relative z-10" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, ease: IOS_EASE }}>
      <GlassCard className="w-40 h-40 rounded-full flex items-center justify-center relative z-20 bg-white/80 border-2 border-white">
        <ShieldCheck size={64} className="text-[#F5A83C]" strokeWidth={1.5} />
      </GlassCard>
    </motion.div>
    <motion.div className="absolute w-80 h-80 rounded-full border border-[#F5A83C]/20 border-dashed" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}>
      {[Phone, Globe, MessageSquare, Mail].map((Icon, i) => (
        <motion.div key={i} whileHover={{ scale: 1.2 }} className="absolute bg-white p-4 rounded-full shadow-lg border border-gray-100 cursor-pointer" style={{ top: i % 2 === 0 ? (i === 0 ? "-24px" : "auto") : "50%", bottom: i === 2 ? "-24px" : "auto", left: i % 2 !== 0 ? (i === 3 ? "-24px" : "auto") : "50%", right: i === 1 ? "-24px" : "auto", transform: i % 2 === 0 ? "translateX(-50%)" : "translateY(-50%)" }}>
          <Icon size={20} className="text-[#284952]" />
        </motion.div>
      ))}
    </motion.div>
  </div>
)

const InvestigationVisual = () => (
  <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-[#F0F7F2]">
    <motion.div className="relative z-10" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: IOS_EASE }}>
      <GlassCard className="w-64 h-80 p-6 flex flex-col gap-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#60BA81] to-[#284952]" />
        <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
          <div className="w-12 h-12 bg-[#60BA81]/10 rounded-xl flex items-center justify-center text-[#60BA81]">
            <FileCheck size={24} />
          </div>
          <div className="space-y-2">
            <div className="w-24 h-2 bg-[#284952] rounded-full opacity-10" />
            <div className="w-16 h-2 bg-[#284952] rounded-full opacity-5" />
          </div>
        </div>
        {[1, 2, 3].map((_, i) => (
             <div key={i} className="flex gap-3 items-center opacity-50">
                 <div className="w-8 h-8 rounded-full bg-gray-100" />
                 <div className="w-full h-2 bg-gray-100 rounded-full" />
             </div>
        ))}
      </GlassCard>
    </motion.div>
    <motion.div className="absolute z-20 pointer-events-none" animate={{ x: [-40, 40, -40], y: [-30, 30, -30] }} transition={{ duration: 12, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}>
      <div className="bg-white/60 backdrop-blur-lg border border-white w-24 h-24 rounded-[2rem] shadow-2xl flex items-center justify-center">
        <Search size={32} className="text-[#284952]" strokeWidth={2.5} />
      </div>
    </motion.div>
  </div>
)

const DashboardVisual = () => (
  <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-[#F5F7F9]">
    <motion.div className="grid grid-cols-2 gap-4 w-72" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: IOS_EASE }}>
      <GlassCard className="col-span-2 h-32 p-5 flex flex-col justify-between !rounded-[1.5rem]">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <Activity size={20} className="text-blue-600" />
          </div>
          <div className="bg-[#60BA81]/10 px-3 py-1 rounded-full">
            <span className="text-xs font-bold text-[#60BA81]">+12.5%</span>
          </div>
        </div>
        <div className="h-12 flex items-end gap-1">
             {[40, 70, 50, 90, 60, 80, 50].map((h, i) => (
                 <motion.div key={i} initial={{height: 0}} animate={{height: `${h}%`}} transition={{delay: i * 0.1}} className="flex-1 bg-blue-500/20 rounded-t-sm" />
             ))}
        </div>
      </GlassCard>
      <GlassCard className="h-32 p-4 flex flex-col items-center justify-center !rounded-[1.5rem]">
        <div className="relative w-16 h-16">
          <svg viewBox="0 0 32 32" className="w-full h-full -rotate-90">
            <circle cx="16" cy="16" r="12" fill="none" stroke="#E2E8F0" strokeWidth="4" />
            <motion.circle cx="16" cy="16" r="12" fill="none" stroke="#F5A83C" strokeWidth="4" strokeLinecap="round" strokeDasharray="75" initial={{ strokeDashoffset: 75 }} animate={{ strokeDashoffset: 20 }} transition={{ duration: 1.5, delay: 0.5, ease: IOS_EASE }} />
          </svg>
        </div>
      </GlassCard>
      <GlassCard className="h-32 p-4 flex flex-col justify-end items-center gap-2 !rounded-[1.5rem]">
        <div className="flex items-end gap-2 h-16">
          <motion.div className="w-3 bg-[#284952] rounded-full" animate={{ height: "40%" }} />
          <motion.div className="w-3 bg-[#60BA81] rounded-full" animate={{ height: "80%" }} />
          <motion.div className="w-3 bg-[#F5A83C] rounded-full" animate={{ height: "60%" }} />
        </div>
      </GlassCard>
    </motion.div>
  </div>
)

const DynamicCoverArt = ({ id }) => {
  switch (id) {
    case 1: return <DeploymentVisual />
    case 2: return <IntakeVisual />
    case 3: return <InvestigationVisual />
    case 4: return <DashboardVisual />
    default: return null
  }
}

// --- SLIDE COMPONENT (Unchanged) ---
const Slide = ({ item, status, onClick, isPlaying, playerComponent, index }) => {
  const isExpanded = status === "expanded"
  const isCollapsed = status === "collapsed"
  const isIdle = status === "idle"

  return (
    <motion.div
      layout
      onClick={status !== "expanded" ? onClick : undefined}
      className={`relative h-full rounded-[2.5rem] overflow-hidden cursor-pointer group select-none ${isExpanded ? "cursor-default" : ""}`}
      style={{ zIndex: isExpanded ? 30 : isIdle ? 10 : isCollapsed ? 5 : 10 }}
      initial={false}
      animate={{ flex: isExpanded ? 3.5 : isCollapsed ? 0.3 : 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 30, mass: 1 }}
    >
      <motion.div className={`absolute inset-0 overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]`} animate={{ borderRadius: "2.5rem", backgroundColor: isExpanded ? "#FFFFFF" : isIdle ? "#FFFFFF" : "#F8F8FA" }}>
        <div className="flex w-full h-full relative">
            
            <motion.div className="absolute inset-0 z-0 opacity-0 bg-gray-50" animate={{ opacity: isIdle ? 1 : 0 }} transition={{ duration: 0.5 }}>
                <div className={`absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-20 ${item.id === 1 ? 'bg-[#60BA81]' : item.id === 2 ? 'bg-[#F5A83C]' : item.id === 3 ? 'bg-[#284952]' : 'bg-blue-400'}`} />
                 <div className="absolute top-10 right-10 opacity-10">
                    <item.icon size={120} className="text-[#284952]" />
                 </div>
            </motion.div>

          <motion.div layout className="flex flex-col justify-between relative z-10 overflow-hidden" animate={{ width: isPlaying ? "0%" : (isExpanded ? "45%" : "100%"), padding: isPlaying ? 0 : (isExpanded ? "4rem" : (isCollapsed ? "1rem" : "3rem")), opacity: isPlaying ? 0 : 1 }}>
            <motion.div layout className="flex flex-col gap-6 w-full">
              <motion.div layout className="flex items-center gap-3">
                 <motion.span layout="position" className={`font-mono font-bold text-[#284952]/20 ${isIdle ? "text-6xl" : isExpanded ? "text-xl" : "text-sm"}`}>{String(item.id).padStart(2, "0")}</motion.span>
                 {!isIdle && !isCollapsed && (<motion.div initial={{ width: 0 }} animate={{ width: 40 }} className="h-[2px] bg-[#F5A83C]" />)}
              </motion.div>
              
              <div className={`flex flex-col ${isCollapsed ? "items-center h-full justify-center pt-20" : "items-start"}`}>
                  {isCollapsed ? (
                       <motion.h1 layout className="text-xl font-bold text-[#17161A]/60 tracking-wider uppercase" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>{item.shortTitle}</motion.h1>
                  ) : (
                    <motion.div layout className="space-y-6 relative">
                        <motion.h1 layout="position" className={`font-bold tracking-tight text-[#284952] leading-[1] ${isExpanded ? "text-5xl lg:text-7xl" : "text-3xl"}`}>{item.headline}</motion.h1>
                        {(isExpanded || isIdle) && (
                            <motion.p layout="position" initial={{ opacity: 0 }} animate={{ opacity: isExpanded ? 1 : 0.6 }} className={`text-[#17161A] font-medium leading-relaxed max-w-md ${isExpanded ? "text-lg" : "text-base line-clamp-3"}`}>{item.subtext}</motion.p>
                        )}
                        {isExpanded && !isPlaying && (
                             <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="group/btn flex items-center gap-3 px-6 py-3 bg-[#17161A] text-white rounded-full mt-4 hover:bg-[#284952] transition-colors shadow-lg">
                                <span className="text-sm font-semibold tracking-wide">Start Module</span>
                                <div className="bg-white/20 rounded-full p-1 group-hover/btn:translate-x-1 transition-transform"><Play size={12} fill="currentColor" /></div>
                             </motion.button>
                        )}
                        {isIdle && (
                            <motion.div className="flex items-center gap-2 text-[#60BA81] font-bold text-sm mt-4">
                                <div className="w-8 h-8 rounded-full border border-[#60BA81]/30 flex items-center justify-center group-hover:bg-[#60BA81] group-hover:text-white transition-colors">
                                    <ArrowRight size={14} />
                                </div>
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">View Details</span>
                            </motion.div>
                        )}
                    </motion.div>
                  )}
              </div>
            </motion.div>
          </motion.div>

          <motion.div layout className="h-full relative overflow-hidden bg-[#F5F5F7]" initial={false} animate={{ width: isPlaying ? "100%" : (isExpanded ? "55%" : "0%"), opacity: isExpanded ? 1 : 0 }}>
             <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#DEE2E6] to-transparent z-20" />
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div key="player" className="absolute inset-0 w-full h-full bg-[#17161A]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {playerComponent}
                </motion.div>
              ) : (
                <motion.div key="visual" className="absolute inset-0 w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <DynamicCoverArt id={item.id} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// --- NEW COMPACT NAVIGATION PILL ---
const NavigationPill = ({
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
          initial={{ y: 100, opacity: 0, x: "-50%", scale: 0.9 }}
          animate={{ y: 0, opacity: 1, x: "-50%", scale: 1 }}
          exit={{ y: 100, opacity: 0, x: "-50%", scale: 0.9 }}
          transition={{ type: "spring", stiffness: 220, damping: 25 }}
          className="fixed bottom-8 left-1/2 z-50 origin-bottom"
        >
          {/* Main Pill Container - Compact Apple Style */}
          <div className="group relative bg-black/85 backdrop-blur-3xl border border-white/10 text-white rounded-full shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] flex items-center pr-2 pl-2 py-2 h-[68px] overflow-hidden select-none">
            
            {/* Play/Pause Button (Prominent) */}
            <button
              onClick={onPlayPause}
              className="w-12 h-12 rounded-full bg-white text-black hover:scale-105 active:scale-90 transition-all duration-200 flex items-center justify-center shadow-lg relative z-10 mr-3"
            >
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div key="pause" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Pause size={20} fill="currentColor" />
                  </motion.div>
                ) : (
                  <motion.div key="play" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Play size={20} fill="currentColor" className="ml-1" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Info & Progress - Compact Stack */}
            <div className="flex flex-col justify-center min-w-[180px] max-w-[240px] mr-4 gap-1">
              <div className="flex justify-between items-baseline px-1">
                 <span className="text-[13px] font-semibold text-white tracking-tight truncate max-w-[120px]">
                    {activeSlideTitle || "Module"}
                 </span>
                 <span className="text-[10px] font-mono text-white/40 tabular-nums tracking-wide">
                    {formatTime(currentTime)} <span className="opacity-50">/</span> {formatTime(totalDuration)}
                 </span>
              </div>
              
              {/* Read-Only Progress Bar (No Scrubbing) */}
              <div className="relative w-full h-[3px] bg-white/10 rounded-full overflow-hidden mt-1">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#60BA81] shadow-[0_0_8px_rgba(96,186,129,0.6)]"
                  style={{ width: `${progress}%` }}
                  layoutId="progress-bar"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="h-6 w-[1px] bg-white/10 mx-1" />

            {/* Volume & Close Group */}
            <div className="flex items-center gap-1 pl-2">
               {/* Compact Volume Control */}
               <div className="relative group/vol flex items-center justify-center w-10 h-10">
                   <button 
                     onClick={onMuteToggle}
                     className="text-white/50 hover:text-white transition-colors"
                   >
                     {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                   </button>
                   
                   {/* Hover Slider (Apple Style Reveal) */}
                   <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-8 h-24 bg-[#17161A] border border-white/10 rounded-full flex flex-col justify-end items-center p-2 opacity-0 group-hover/vol:opacity-100 transition-opacity duration-200 pointer-events-none group-hover/vol:pointer-events-auto shadow-2xl">
                      <div className="w-1 h-full bg-white/20 rounded-full relative overflow-hidden">
                          <input
                            type="range" min="0" max="1" step="0.05"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full -left-[10px] w-[30px]"
                            style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
                          />
                          <div 
                            className="absolute bottom-0 left-0 w-full bg-white rounded-full transition-all"
                            style={{ height: `${(isMuted ? 0 : volume) * 100}%` }}
                          />
                      </div>
                   </div>
               </div>

                {/* Close Button */}
                <button 
                  onClick={onClose}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/20 text-white/60 hover:text-white transition-all active:scale-95"
                  title="Close Module"
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
            </div>

            {/* Subtle glow effect */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-white/5 to-transparent blur-md -z-10 pointer-events-none" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s < 10 ? "0" : ""}${s}`
}

// --- MAIN APP ---
export default function App() {
  const [activeSlide, setActiveSlide] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  
  const audioRef = useRef(null)

  const slides = [
    {
      id: 1,
      shortTitle: "Deploy",
      headline: "Deployment & Onboarding",
      subtext: "Smooth rollout to empower every employee from day one with automated workflows and instant access.",
      duration: 102,
      audioPath: "/assets/Chris-Module 1 Audio.mp3",
      icon: Zap,
      playerComponent: <Module1Player progress={currentTime} />,
    },
    {
      id: 2,
      shortTitle: "Intake",
      headline: "Complaint Intake",
      subtext: "Multiple grievance reporting channels that are confidential, accessible, and designed for worker safety.",
      duration: 98,
      audioPath: "/assets/Chris-Module 2 Audio.mp3",
      icon: ShieldCheck,
      playerComponent: <Module2Player progress={currentTime} />,
    },
    {
      id: 3,
      shortTitle: "Investigate",
      headline: "Investigation Framework",
      subtext: "Systematic resolution workflows ensuring compliance, verified satisfaction, and complete audit trails.",
      duration: 120,
      audioPath: "/assets/Chris-Module 3 Audio.mp3",
      icon: Search,
      playerComponent: <Module3Player progress={currentTime} />,
    },
    {
      id: 4,
      shortTitle: "Insights",
      headline: "Dashboards & Insights",
      subtext: "Real-time data intelligence for HRDD reporting, risk monitoring, and strategic decision making.",
      duration: 102,
      audioPath: "/assets/Chris-Module 4 Audio.mp3",
      icon: Activity,
      playerComponent: <Module4Player progress={currentTime} />,
    },
  ]

  const currentSlideData = activeSlide !== null ? slides[activeSlide] : null

  // Audio Logic & Auto Advance
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    if (isPlaying && currentSlideData?.audioPath) {
      audioRef.current = new Audio(currentSlideData.audioPath)
      audioRef.current.volume = isMuted ? 0 : volume
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((e) => console.log("Autoplay blocked:", e))

      const handleEnded = () => {
        // --- AUTO CLOSE AND OPEN NEXT MODULE LOGIC ---
        if (activeSlide < slides.length - 1) {
          // Advance to next slide
          setActiveSlide(prev => prev + 1)
          // Ensure it keeps playing
          setIsPlaying(true)
          setCurrentTime(0)
        } else {
          // If it's the last slide, stop and close
          setIsPlaying(false)
          setCurrentTime(0)
          setActiveSlide(null)
        }
      }
      
      audioRef.current.addEventListener("ended", handleEnded)

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("ended", handleEnded)
          audioRef.current.pause()
        }
      }
    }
  }, [isPlaying, activeSlide]) // Re-run when activeSlide changes to load new audio

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  useEffect(() => {
    let animationFrame
    const animate = () => {
      if (audioRef.current && isPlaying) {
        setCurrentTime(audioRef.current.currentTime)
        animationFrame = requestAnimationFrame(animate)
      }
    }
    if (isPlaying) animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isPlaying])

  const handleSlideClick = (index) => {
    if (activeSlide === index) return
    setActiveSlide(index)
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const handleClose = () => {
    setActiveSlide(null)
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const handlePlayPause = () => {
    if (activeSlide === null) return
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="h-screen w-full bg-[#F5F5F7] text-[#17161A] font-sans overflow-hidden flex flex-col relative">
      <GrainOverlay />
      
      {/* Header */}
      <nav className="w-full px-10 py-8 flex justify-between items-center z-50">
        <div className="flex items-center gap-1 text-2xl font-bold tracking-tighter text-[#284952]">
          Fruit of Sustainability<span className="text-[#F5A83C] text-4xl leading-[0]">.</span>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full h-full px-6 md:px-10 pb-8 pt-2 flex flex-col justify-center relative z-10">
        <LayoutGroup>
          <div className="w-full h-[70vh] flex gap-4 md:gap-6">
            {slides.map((item, index) => {
              let status = "idle"
              if (activeSlide !== null) {
                status = activeSlide === index ? "expanded" : "collapsed"
              }

              return (
                <Slide
                  key={item.id}
                  index={index}
                  item={item}
                  status={status}
                  onClick={() => handleSlideClick(index)}
                  isPlaying={activeSlide === index && isPlaying}
                  playerComponent={item.playerComponent}
                />
              )
            })}
          </div>
        </LayoutGroup>
        
        {/* Control Panel Container */}
        <ControlPanelContainer
          isVisible={activeSlide !== null}
          currentProgress={currentTime}
          isPlaying={isPlaying}
          activeSlide={activeSlide}
        />
        
        {/* Helper Text for Idle State */}
        <AnimatePresence>
            {activeSlide === null && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-10 left-0 right-0 text-center pointer-events-none"
                >
                    <p className="text-[#17161A]/40 font-medium tracking-widest text-xs uppercase">Select a module to explore</p>
                </motion.div>
            )}
        </AnimatePresence>
      </main>

      {/* Enhanced Compact Navigation Pill */}
      <NavigationPill
        visible={activeSlide !== null}
        isPlaying={isPlaying}
        currentTime={currentTime}
        totalDuration={currentSlideData?.duration || 120}
        volume={volume}
        isMuted={isMuted}
        onPlayPause={handlePlayPause}
        onVolumeChange={setVolume}
        onMuteToggle={() => setIsMuted(!isMuted)}
        onClose={handleClose}
        activeSlideTitle={currentSlideData?.shortTitle}
      />
    </div>
  )
}