"use client"

import type React from "react"
import { useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import {
  Play,
  ShieldCheck,
  Activity,
  Fingerprint,
  Phone,
  Mail,
  MessageSquare,
  Search,
  ArrowRight,
  Sparkles,
} from "lucide-react"

// --- PREMIUM PHYSICS ---
const IOS_SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1.2,
}

const IOS_SOFT_SPRING = {
  type: "spring",
  stiffness: 180,
  damping: 25,
  mass: 1,
}

const IOS_EASE = [0.32, 0.72, 0, 1] as const

const SLIDE_ENTRANCE = {
  initial: {
    opacity: 0,
    y: 80,
    scale: 0.85,
    rotateX: 15,
    filter: "blur(20px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
  },
}

// Layout Constants
const EXPANDED_WIDTH = 85
const PEEK_WIDTH = 6

// --- HELPER COMPONENTS ---

const GlassSurface = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div
    className={`relative bg-white/95 backdrop-blur-2xl border border-[#DEE2E6] shadow-[0_20px_50px_-12px_rgba(40,73,82,0.15),inset_0_1px_0_rgba(255,255,255,0.8)] rounded-[32px] ${className}`}
  >
    {children}
  </div>
)

const ShimmerOverlay = () => (
  <motion.div
    className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-[32px]"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
  >
    <motion.div
      className="absolute inset-0"
      style={{
        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%)",
      }}
      animate={{
        x: ["-100%", "200%"],
      }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 4,
        ease: "easeInOut",
      }}
    />
  </motion.div>
)

const GlowRing = ({ color, delay = 0 }: { color: string; delay?: number }) => (
  <motion.div
    className="absolute -inset-1 rounded-[36px] pointer-events-none z-0"
    style={{
      background: `linear-gradient(135deg, ${color}20, transparent, ${color}10)`,
    }}
    animate={{
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.02, 1],
    }}
    transition={{
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      delay,
      ease: "easeInOut",
    }}
  />
)

const FloatingIcon = ({ Icon, color }: { Icon: React.ElementType; color: string }) => {
  const orbitParticles = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    delay: i * 0.8,
    size: 4 + i * 2,
  }))

  return (
    <motion.div className="relative" whileHover={{ y: -5, scale: 1.08 }} transition={IOS_SPRING}>
      {/* Orbiting particles */}
      {orbitParticles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: color,
            marginLeft: -p.size / 2,
            marginTop: -p.size / 2,
          }}
          animate={{
            x: [0, 25, 0, -25, 0],
            y: [-25, 0, 25, 0, -25],
            opacity: [0.6, 0.3, 0.6, 0.3, 0.6],
            scale: [1, 0.8, 1, 0.8, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative w-16 h-16 rounded-2xl bg-white border border-white/60 shadow-[0_8px_16px_-6px_rgba(0,0,0,0.05)] flex items-center justify-center text-[#284952] z-10">
        <Icon size={28} strokeWidth={1.5} />
      </div>
    </motion.div>
  )
}

const FloatingContainer = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    animate={{ y: [0, -8, 0] }}
    transition={{
      duration: 6,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
      delay,
    }}
  >
    {children}
  </motion.div>
)

// --- VISUALIZATIONS ---

const DeploymentVisual = () => (
  <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-t from-[#60BA81]/10 via-[#60BA81]/5 to-white" />
    <FloatingContainer>
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ ...IOS_SPRING, delay: 0.1 }}
        className="relative z-10"
      >
        <GlassSurface className="p-8 w-64 flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#284952] to-[#1a353d] flex items-center justify-center shadow-lg shadow-[#284952]/20">
            <Fingerprint size={40} className="text-[#60BA81]" strokeWidth={1.5} />
          </div>
          <div className="space-y-3 w-full">
            <div className="flex justify-between text-[10px] font-bold text-[#284952]/50 uppercase tracking-widest">
              <span>System Sync</span>
              <span>Active</span>
            </div>
            <div className="h-2 w-full bg-[#284952]/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#60BA81]"
                initial={{ x: "-100%" }}
                animate={{ x: ["-100%", "0%"] }}
                transition={{ duration: 1.5, ease: IOS_EASE, delay: 0.4 }}
              />
            </div>
            <div className="flex gap-2 justify-center mt-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, ...IOS_SPRING }}
                  className={`w-2 h-2 rounded-full ${i === 1 ? "bg-[#60BA81]" : "bg-[#DEE2E6]"}`}
                />
              ))}
            </div>
          </div>
        </GlassSurface>
      </motion.div>
    </FloatingContainer>
  </div>
)

const IntakeVisual = () => (
  <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-[#F5A83C]/10 via-[#F5A83C]/5 to-white" />
    <div className="relative w-72 h-72">
      <motion.div
        className="absolute inset-0 border border-[#F5A83C]/10 rounded-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={IOS_SOFT_SPRING}
      />
      <motion.div
        className="absolute inset-8 border border-[#F5A83C]/20 rounded-full border-dashed"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <FloatingContainer delay={1}>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={IOS_SPRING}
        >
          <GlassSurface className="w-28 h-28 rounded-full flex items-center justify-center !shadow-[0_20px_40px_-10px_rgba(245,168,60,0.2)]">
            <ShieldCheck size={48} className="text-[#F5A83C]" strokeWidth={1.5} />
          </GlassSurface>
        </motion.div>
      </FloatingContainer>

      <motion.div
        className="absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        {[Phone, Mail, MessageSquare].map((Icon, i) => (
          <div
            key={i}
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 origin-bottom"
            style={{
              transform:
                i === 0
                  ? `rotate(180deg) translateY(-230px) rotate(-180deg)`
                  : `rotate(${i * 120}deg) translateY(-144px) rotate(-${i * 120}deg)`,
            }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15, ...IOS_SPRING }}
              className="p-3 bg-white shadow-md rounded-2xl text-[#284952]"
            >
              <Icon size={20} />
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  </div>
)

const InvestigationVisual = () => (
  <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-tr from-[#284952]/10 via-[#284952]/5 to-white" />
    <FloatingContainer>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        transition={IOS_SPRING}
      >
        <GlassSurface className="w-72 p-6 flex flex-col gap-4">
          <div className="flex items-center gap-4 border-b border-[#284952]/5 pb-4">
            <div className="w-12 h-12 bg-[#284952]/5 rounded-xl flex items-center justify-center text-[#284952]">
              <Search size={24} />
            </div>
            <div>
              <div className="h-2 w-24 bg-[#284952]/10 rounded-full mb-2" />
              <div className="h-2 w-16 bg-[#284952]/5 rounded-full" />
            </div>
          </div>
          {[1, 2, 3].map((_, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 p-2 rounded-lg"
              initial={{ x: -20, opacity: 0, filter: "blur(4px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.3 + i * 0.1, ...IOS_SPRING }}
            >
              <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-[#60BA81]" : "bg-[#DEE2E6]"}`} />
              <div className="h-2 flex-1 bg-[#DEE2E6]/50 rounded-full" />
            </motion.div>
          ))}
        </GlassSurface>
      </motion.div>
    </FloatingContainer>
  </div>
)

const DashboardVisual = () => (
  <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-tl from-[#284952]/8 via-[#60BA81]/5 to-white" />
    <FloatingContainer>
      <motion.div
        className="grid grid-cols-2 gap-4 w-72"
        initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={IOS_SPRING}
      >
        <GlassSurface className="col-span-2 h-32 p-5 flex flex-col justify-end">
          <div className="flex items-center justify-between mb-auto">
            <Activity size={20} className="text-[#3B82F6]" />
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs font-bold text-[#60BA81] bg-[#60BA81]/10 px-2 py-1 rounded-md"
            >
              +24%
            </motion.span>
          </div>
          <div className="flex items-end gap-1 h-12">
            {[40, 65, 45, 80, 55, 90, 60].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: `${h}%`, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.05, ease: IOS_EASE }}
                className="flex-1 bg-[#3B82F6]/20 rounded-t-sm"
              />
            ))}
          </div>
        </GlassSurface>

        <GlassSurface className="h-32 p-4 flex items-center justify-center">
          <div className="relative w-16 h-16">
            <svg viewBox="0 0 32 32" className="-rotate-90 w-full h-full">
              <circle cx="16" cy="16" r="12" fill="none" stroke="#F5A83C" strokeWidth="4" opacity="0.1" />
              <motion.circle
                cx="16"
                cy="16"
                r="12"
                fill="none"
                stroke="#F5A83C"
                strokeWidth="4"
                strokeDasharray="75"
                initial={{ strokeDashoffset: 75 }}
                animate={{ strokeDashoffset: 20 }}
                transition={{ duration: 1.5, ease: IOS_EASE, delay: 0.5 }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#284952]">
              72%
            </div>
          </div>
        </GlassSurface>

        <GlassSurface className="h-32 p-4 flex flex-col justify-center gap-3">
          <div className="w-full h-2 bg-[#DEE2E6]/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#284952]"
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 1, ease: IOS_EASE, delay: 0.2 }}
            />
          </div>
          <div className="w-full h-2 bg-[#DEE2E6]/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#60BA81]"
              initial={{ width: 0 }}
              animate={{ width: "85%" }}
              transition={{ duration: 1, delay: 0.4, ease: IOS_EASE }}
            />
          </div>
        </GlassSurface>
      </motion.div>
    </FloatingContainer>
  </div>
)

const DynamicCoverArt = ({ id }: { id: number }) => {
  switch (id) {
    case 1:
      return <DeploymentVisual />
    case 2:
      return <IntakeVisual />
    case 3:
      return <InvestigationVisual />
    case 4:
      return <DashboardVisual />
    default:
      return null
  }
}

// --- MAIN SLIDE COMPONENT ---

interface SlideProps {
  index: number
  item: {
    id: number
    shortTitle: string
    headline: string
    subtext: string
    icon: React.ElementType
  }
  status: string
  onClick: () => void
  isPlaying: boolean
  playerComponent: React.ReactNode
  totalSlides: number
  currentTime: number
  entranceDelay?: number
}

const Slide: React.FC<SlideProps> = ({
  index,
  item,
  status,
  onClick,
  isPlaying,
  playerComponent,
  currentTime,
  entranceDelay = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || status !== "idle") return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const themeColors = [
    { accent: "#60BA81", gradient: "from-[#60BA81]/12 via-[#60BA81]/6 to-white", glow: "rgba(96, 186, 129, 0.25)" },
    { accent: "#F5A83C", gradient: "from-[#F5A83C]/12 via-[#F5A83C]/6 to-white", glow: "rgba(245, 168, 60, 0.25)" },
    { accent: "#284952", gradient: "from-[#284952]/12 via-[#284952]/6 to-white", glow: "rgba(40, 73, 82, 0.25)" },
    { accent: "#60BA81", gradient: "from-[#60BA81]/10 via-[#284952]/8 to-white", glow: "rgba(96, 186, 129, 0.2)" },
  ]
  const currentTheme = themeColors[index % themeColors.length]

  const isExpanded = status === "expanded"
  const isIdle = status === "idle"
  const isPeek = status === "peek"
  const isHidden = status === "hidden"

  const getWidth = () => {
    if (isExpanded) return `${EXPANDED_WIDTH}vw`
    if (isPeek) return `${PEEK_WIDTH}vw`
    if (isIdle) return `calc((100% - 1rem) / 4)`
    return "0px"
  }

  if (isHidden) return null

  return (
    <motion.div
      ref={cardRef}
      className={`relative h-full cursor-pointer group flex-shrink-0 ${isExpanded ? "z-30" : isPeek ? "z-20" : "z-10"}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      layout
      initial={SLIDE_ENTRANCE.initial}
      animate={{
        ...SLIDE_ENTRANCE.animate,
        width: getWidth(),
      }}
      transition={{
        ...IOS_SPRING,
        delay: entranceDelay,
      }}
      style={{
        willChange: "width, transform",
        perspective: 1000,
        rotateX: isIdle ? rotateX : 0,
        rotateY: isIdle ? rotateY : 0,
      }}
    >
      {isIdle && <GlowRing color={currentTheme.accent} delay={index * 0.5} />}

      <motion.div
        className="absolute inset-0 overflow-hidden rounded-[32px] bg-white"
        layout
        transition={IOS_SPRING}
        style={{
          boxShadow: isExpanded
            ? "0 40px 100px -20px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.03)"
            : "0 4px 24px -4px rgba(0,0,0,0.08), 0 0 0 1px rgba(23,22,26,0.04)",
        }}
      >
        {isIdle && <ShimmerOverlay />}

        <AnimatePresence mode="wait" initial={false}>
          {isIdle ? (
            // === IDLE STATE ===
            <motion.div
              key="idle"
              className="w-full h-full relative flex flex-col p-8 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4 }}
            >
              {/* Rich colored background overlay */}
              <div className="absolute inset-0" style={{ backgroundColor: currentTheme.accent, opacity: 0.08 }} />

              {/* Gradient overlay for depth */}
              <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.gradient}`} />

              {/* Animated glow orb - more prominent */}
              <motion.div
                className="absolute bottom-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full blur-[100px]"
                style={{ backgroundColor: currentTheme.accent, opacity: 0.4 }}
                animate={{
                  scale: [1, 1.4, 1],
                  rotate: [0, 25, 0],
                  x: [0, 40, 0],
                  y: [0, -40, 0],
                }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />

              {/* Top right accent glow */}
              <motion.div
                className="absolute top-[-100px] right-[-100px] w-[350px] h-[350px] rounded-full blur-[100px]"
                style={{ backgroundColor: currentTheme.accent, opacity: 0.25 }}
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, -20, 0],
                }}
                transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />

              {/* Big number watermark - more visible */}
              <motion.div
                className="absolute top-4 right-4 z-0 pointer-events-none select-none"
                animate={{
                  opacity: [0.18, 0.25, 0.18],
                  scale: [1, 1.03, 1],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              >
                <span className="text-[180px] font-bold tracking-tighter leading-none font-sans" style={{ color: currentTheme.accent, opacity: 0.25 }}>
                  {String(item.id).padStart(2, "0")}
                </span>
              </motion.div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <FloatingIcon Icon={item.icon} color={currentTheme.accent} />

                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: currentTheme.accent, opacity: 0.4 }}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: currentTheme.accent }}
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <motion.div
                    initial={{ x: 0, opacity: 0, filter: "blur(4px)" }}
                    animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                    transition={{ ...IOS_SOFT_SPRING, delay: 0.1 + entranceDelay }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-[0_8px_32px_-8px_rgba(40,73,82,0.2)] border border-white/60"
                  >
                    <h2 className="text-3xl font-bold text-[#17161A] tracking-tight leading-[1.1] mb-3">
                      {item.headline}
                    </h2>
                    <p className="text-sm font-medium text-[#767676] leading-relaxed line-clamp-2">{item.subtext}</p>
                  </motion.div>

                  <div className="pt-4 flex items-center justify-between group/action bg-white/60 backdrop-blur-lg rounded-2xl px-5 py-4 border border-white/40 shadow-[0_4px_16px_-4px_rgba(40,73,82,0.15)]">
                    <motion.span
                      className="text-xs font-bold uppercase tracking-widest flex items-center gap-2"
                      style={{ color: currentTheme.accent }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Sparkles size={14} />
                      Explore Module
                    </motion.span>
                    <motion.div
                      className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: currentTheme.accent }}
                      whileHover={{
                        scale: 1.15,
                        boxShadow: `0 8px 24px -6px ${currentTheme.glow}`,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight size={16} className="text-white" strokeWidth={2.5} />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            // === EXPANDED / PLAYING STATE ===
            <motion.div
              key="expanded"
              className="flex w-full h-full relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* LEFT CONTENT SIDE */}
              <motion.div
                layout
                className="flex flex-col justify-between relative z-10 overflow-hidden bg-white"
                animate={{
                  width: isPlaying ? "0%" : isExpanded ? "45%" : "100%",
                  padding: isPlaying ? 0 : isExpanded ? "4rem" : isPeek ? "1rem" : "2rem",
                  opacity: isPlaying ? 0 : 1,
                }}
                transition={IOS_SPRING}
              >
                <motion.div layout className="flex flex-col h-full relative z-10">
                  {isPeek && (
                    <motion.div
                      className="absolute top-0 left-0 w-full h-1.5 z-20 origin-left"
                      style={{ backgroundColor: currentTheme.accent }}
                      layoutId={`accent-${item.id}`}
                    />
                  )}

                  <motion.div layout className="flex items-center gap-4 mb-6">
                    <motion.span
                      layout="position"
                      className={`font-mono font-bold tracking-tight ${isPeek ? "text-2xl opacity-0" : "text-sm"}`}
                      style={{ color: currentTheme.accent }}
                    >
                      {String(item.id).padStart(2, "0")}
                    </motion.span>
                    {isExpanded && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 40, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="h-px bg-gray-200"
                      />
                    )}
                  </motion.div>

                  <div className={`flex flex-col ${isPeek ? "items-center h-full justify-center" : "items-start"}`}>
                    {isPeek ? (
                      <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                        <motion.h1
                          className="text-sm font-bold tracking-widest uppercase text-[#767676]"
                          style={{
                            writingMode: "vertical-rl",
                            transform: "rotate(180deg)",
                          }}
                        >
                          {item.shortTitle}
                        </motion.h1>
                      </motion.div>
                    ) : (
                      <motion.div layout className="space-y-6">
                        <motion.h1
                          layout="position"
                          className={`font-bold text-[#17161A] tracking-tighter ${isExpanded ? "text-5xl lg:text-6xl leading-[1.1]" : "text-2xl"}`}
                        >
                          {item.headline}
                        </motion.h1>

                        {isExpanded && (
                          <motion.p
                            layout="position"
                            initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="text-[#767676] font-medium leading-relaxed text-lg max-w-md"
                          >
                            {item.subtext}
                          </motion.p>
                        )}

                        {isExpanded && !isPlaying && (
                          <motion.button
                            initial={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            transition={{ delay: 0.2, ...IOS_SPRING }}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="flex items-center gap-3 pl-6 pr-5 py-3.5 text-white rounded-full mt-8 shadow-lg hover:shadow-xl transition-shadow duration-300 group/btn"
                            style={{ backgroundColor: "#17161A" }}
                          >
                            <span className="text-sm font-semibold">Start Module</span>
                            <div className="bg-white/20 rounded-full p-1 group-hover/btn:bg-white/30 transition-colors">
                              <Play size={10} fill="currentColor" />
                            </div>
                          </motion.button>
                        )}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </motion.div>

              {/* RIGHT VISUAL SIDE */}
              <motion.div
                layout
                className="h-full relative overflow-hidden"
                initial={false}
                animate={{
                  width: isPlaying ? "100%" : isExpanded ? "55%" : "0%",
                  opacity: isExpanded ? 1 : 0,
                }}
                transition={IOS_SPRING}
              >
                <AnimatePresence mode="wait">
                  {isPlaying ? (
                    <motion.div
                      key="player-container"
                      className="absolute inset-0 w-full h-full flex bg-[#17161A]"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {playerComponent || (
                        <div className="w-full h-full flex items-center justify-center text-white/50">
                          Module Player
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="visual"
                      className="absolute inset-0 w-full h-full"
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <DynamicCoverArt id={item.id} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default Slide
