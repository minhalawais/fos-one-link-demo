"use client"

import React, { useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Phone,
  MessageCircle,
  Mail,
  Globe,
  Smartphone,
  ShieldCheck,
  Users,
  Wifi,
  Zap,
  MessageSquare
} from "lucide-react"

// --- TIMING (Synced with Script) ---
const TIMING = {
  START: 5,
  HOTLINE: 10.0,    // Delayed start
  SMS: 12.0,        // Space out
  WHATSAPP: 13.0,
  EMAIL: 14.5,
  WEB: 16.0,
  APP: 17.5,
  MERGE: 22.0       // End phase
}

// --- PALETTE ---
const COLORS = {
  Teal: "#284952",
  Green: "#60BA81",
  Orange: "#F5A83C",
  WhatsApp: "#60BA81",
  Blue: "#3B82F6",
  White: "#FFFFFF",
}

// --- DATA & POSITIONS ---
// Positions computed via polar coordinates: evenly spaced on a ring
// Radius chosen to clear the central logo (224px diam) + node size (~160px) + gap
const RING_RADIUS = 260
// Angles in degrees, clockwise from top (0°=12 o'clock)
// Arc from 240° (lower-left) to 480°/120° (lower-right) — open bottom
const CHANNEL_ANGLES = [240, 288, 336, 24, 72, 120]

const computePos = (angleDeg: number) => {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: Math.round(RING_RADIUS * Math.sin(rad)),
    y: Math.round(-RING_RADIUS * Math.cos(rad)),
  }
}

const CHANNELS = [
  { id: "phone", type: "hotline", label: "Hotline", sub: "0800 91299", color: COLORS.Orange, icon: Phone, delay: TIMING.HOTLINE, ...computePos(CHANNEL_ANGLES[0]), imageSrc: null },
  { id: "sms", type: "bubble", label: "SMS", sub: "+92 329 9129999", color: COLORS.Green, icon: MessageSquare, delay: TIMING.SMS, ...computePos(CHANNEL_ANGLES[1]) },
  { id: "whatsapp", type: "bubble", label: "WhatsApp", sub: "+92 329 9129999", color: COLORS.WhatsApp, icon: MessageCircle, delay: TIMING.WHATSAPP, ...computePos(CHANNEL_ANGLES[2]), imageSrc: "/assets/images/whatsapp.png" },
  { id: "email", type: "card", label: "Email", sub: "hrdd@fruitofsustainability.com", color: COLORS.Teal, icon: Mail, delay: TIMING.EMAIL, ...computePos(CHANNEL_ANGLES[3]) },
  { id: "web", type: "browser", label: "Web Portal", sub: "fruitofsustainability.com", color: COLORS.Teal, icon: Globe, delay: TIMING.WEB, ...computePos(CHANNEL_ANGLES[4]) },
  { id: "app", type: "mobile", label: "Mobile App", sub: "FOS Hotline", color: COLORS.Green, icon: Smartphone, delay: TIMING.APP, ...computePos(CHANNEL_ANGLES[5]) },
]

// --- COMPONENTS ---

// 1. The Dynamic Connection Beam (Curved Line)
const ConnectionBeam = ({ start, end, color, isActive }: { start: { x: number, y: number }, end: { x: number, y: number }, color: string, isActive: boolean }) => {
  // Calculate control point for a nice curve
  const midX = (start.x + end.x) / 2
  const midY = (start.y + end.y) / 2 - 50 // Curve upwards
  const path = `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`

  return (
    <div className="absolute top-1/2 left-1/2 overflow-visible pointer-events-none" style={{ width: 0, height: 0, zIndex: 0 }}>
      {/* Glow Effect behind beam */}
      <svg className="overflow-visible w-[1px] h-[1px] absolute opacity-40 blur-sm">
        <AnimatePresence>
          {isActive && (
            <motion.path
              d={path}
              fill="none"
              stroke={color}
              strokeWidth="4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
      </svg>
      <svg className="overflow-visible w-[1px] h-[1px]">
        <AnimatePresence>
          {isActive && (
            <>
              {/* Base Line */}
              <motion.path
                d={path}
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeOpacity="0.15"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              {/* Data Packet Animation */}
              <motion.circle
                r="3"
                fill={color}
              >
                <animateMotion
                  dur="1.5s"
                  repeatCount="indefinite"
                  path={path}
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1"
                />
              </motion.circle>
            </>
          )}
        </AnimatePresence>
      </svg>
    </div>
  )
}

// 2. High-Fidelity Channel Node
const ChannelNode = ({ data, isActive, index }: { data: typeof CHANNELS[0], isActive: boolean, index: number }) => {
  if (!isActive) return null

  // render specific shapes based on type
  const renderVisual = () => {
    switch (data.type) {
      case 'mobile':
        return (
          <div className="w-20 h-36 bg-gray-900 rounded-[18px] border-[5px] border-gray-800 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute top-0 w-10 h-4 bg-black rounded-b-md z-10" />
            <div className="w-full h-full bg-white flex flex-col items-center pt-8 gap-1.5">
              <div className="w-10 h-10 rounded-xl bg-[#60BA81] flex items-center justify-center shadow-sm">
                <Smartphone size={18} className="text-white" />
              </div>
              <div className="w-12 h-1.5 bg-gray-100 rounded-full mt-3" />
              <div className="w-10 h-1.5 bg-gray-100 rounded-full" />
            </div>
          </div>
        )
      case 'browser':
        return (
          <div className="w-32 h-20 bg-white rounded-xl border border-gray-200 shadow-2xl relative overflow-hidden flex flex-col">
            <div className="h-5 bg-gray-50 border-b flex items-center px-2.5 gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div className="w-2 h-2 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 flex items-center justify-center bg-gray-50/50">
              <Globe size={32} className="text-[#284952] opacity-20" />
            </div>
          </div>
        )
      case 'bubble':
        return (
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute -inset-2 rounded-full opacity-30 blur-xl" style={{ backgroundColor: data.color }} />
            {/* Main bubble — circle */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${data.color}, ${data.color}dd)` }}
            >
              {/* Glass shine overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-full" />
              {/* Icon */}
              <div className="relative z-10">
                {data.imageSrc ? (
                  <img src={data.imageSrc} alt={data.label} className="w-12 h-12 drop-shadow-md" />
                ) : (
                  <data.icon size={36} className="text-white drop-shadow-md" />
                )}
              </div>
            </div>
          </div>
        )
      default: // card/hotline
        return (
          <div className="w-20 h-20 rounded-full bg-white border-2 flex items-center justify-center shadow-xl" style={{ borderColor: data.color }}>
            <data.icon size={36} style={{ color: data.color }} />
          </div>
        )
    }
  }

  return (
    /* Layer 1: ANCHOR — positioned at center of container, then moved to target x,y.
       The connection beams share this same coordinate system (SVG at top:50% left:50%).
       This guarantees the beam endpoint and the node anchor are the SAME point. */
    <motion.div
      className="absolute top-1/2 left-1/2 z-20 cursor-pointer"
      initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
      animate={{ x: data.x, y: data.y, scale: 1, opacity: 1 }}
      exit={{ x: 0, y: 0, scale: 0, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 24,
        mass: 1.2,
        delay: index * 0.1
      }}
    >
      {/* Layer 2: CENTERING — plain div (NOT motion.div), so framer-motion
          will never overwrite this transform. Shifts content so its center
          sits exactly on the anchor point above. */}
      <div style={{ transform: 'translate(-50%, -50%)' }}>
        {/* Layer 3: FLOAT — handles hover and breathing animation only */}
        <motion.div
          whileHover={{ scale: 1.1, y: -5 }}
          animate={{ y: [0, -6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
            delay: index * 0.7,
            repeatType: "mirror"
          }}
          className="flex flex-col items-center gap-2"
        >
          {renderVisual()}
          <div className="bg-white/95 backdrop-blur px-4 py-2 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center max-w-[160px]">
            <span className="text-xs font-bold text-gray-800 leading-none mb-1">{data.label}</span>
            <span className="text-[10px] text-gray-500 leading-tight text-center break-all">{data.sub}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// 3. Central "FOS Brain" -> Morphs into "Safety Shield"
const CentralCore = ({ isMerged }: { isMerged: boolean }) => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center overflow-visible">

    {/* Logo + Shield container */}
    <div className="relative flex items-center justify-center">

      {/* State 1: Pulse Rings (Active when NOT merged) */}
      <AnimatePresence>
        {!isMerged && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            exit={{ opacity: 0, scale: 1.5, transition: { duration: 0.8 } }}
          >
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 bg-[#60BA81]/10 rounded-full"
                style={{ width: '100%', height: '100%' }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: "easeOut"
                }}
              />
            ))}
            <div className="absolute -inset-4 border border-[#284952]/10 rounded-full animate-spin-slow" style={{ borderStyle: 'dashed', animationDuration: '20s' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* State 2: Holographic Glass Shield (Active when MERGED) */}
      <AnimatePresence>
        {isMerged && (
          <motion.div
            className="absolute z-40 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            style={{ width: 280, height: 320, top: -50 }}
          >
            <div className="relative w-full h-full">
              <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-[0_0_20px_rgba(96,186,129,0.3)]">
                <defs>
                  <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "white", stopOpacity: 0.2 }} />
                    <stop offset="100%" style={{ stopColor: COLORS.Green, stopOpacity: 0.1 }} />
                  </linearGradient>
                  <linearGradient id="scanBeam" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: COLORS.Green, stopOpacity: 0 }} />
                    <stop offset="50%" style={{ stopColor: COLORS.Green, stopOpacity: 0.4 }} />
                    <stop offset="100%" style={{ stopColor: COLORS.Green, stopOpacity: 0 }} />
                  </linearGradient>
                </defs>

                {/* Shield Body */}
                <motion.path
                  d="M50 2 L94 26 V60 C94 88 50 116 50 116 C50 116 6 88 6 60 V26 L50 2 Z"
                  fill="url(#shieldGrad)"
                  stroke={COLORS.Green}
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />

                {/* Tech Lines */}
                <motion.path
                  d="M50 15 V105 M20 40 L80 40 M30 80 L70 80"
                  stroke="white"
                  strokeWidth="0.5"
                  strokeOpacity="0.15"
                  strokeDasharray="2 2"
                />

                {/* Scanning Beam */}
                <motion.rect
                  x="6"
                  y="2"
                  width="88"
                  height="12"
                  fill="url(#scanBeam)"
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: [0, 100, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ mixBlendMode: 'plus-lighter' }}
                />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Logo */}
      <motion.div
        className="w-56 h-56 bg-white rounded-full shadow-2xl flex items-center justify-center relative z-20 border-4 border-white"
        animate={{
          scale: isMerged ? 0.9 : 1,
          boxShadow: isMerged ? "0 0 40px rgba(96,186,129,0.4)" : "0 30px 60px -12px rgba(0,0,0,0.3)"
        }}
        transition={{ duration: 0.8 }}
      >
        <img src="/assets/images/FOS-01.png" alt="FOS" className="w-54 h-54 object-contain max-w-[130%]" />
      </motion.div>

    </div>

    {/* Text Reveal - flows below the logo in the flex column */}
    <AnimatePresence>
      {isMerged && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col items-center gap-2 mt-6"
        >
          <div className="flex items-center gap-3 text-[#284952] bg-white/95 backdrop-blur-md px-8 py-3 rounded-full border border-green-100 shadow-2xl">
            <ShieldCheck size={22} className="text-[#60BA81]" />
            <span className="text-sm font-black tracking-widest uppercase">100% Protected</span>
          </div>
          <p className="text-[#284952]/70 text-sm font-semibold max-w-sm leading-relaxed text-center">
            "A simple and safe way for every worker to speak up."
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

// 4. The "Safety Net" Shield Overlay
const SafetyNet = ({ isActive }: { isActive: boolean }) => (
  <AnimatePresence>
    {isActive && (
      <motion.div
        key="shield-overlay"
        className="absolute inset-0 flex items-center justify-center z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Expanding Mesh Background */}
        <motion.div
          className="absolute inset-0 bg-white/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        <motion.div
          className="relative flex flex-col items-center"
          initial={{ scale: 0.5, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          {/* Main Shield Graphic */}
          <div className="relative w-64 h-72">
            <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-2xl">
              <path d="M50 0 L95 25 V60 C95 90 50 120 50 120 C50 120 5 90 5 60 V25 L50 0 Z" fill="#284952" />
              <path d="M50 5 L90 28 V60 C90 85 50 110 50 110 C50 110 10 85 10 60 V28 L50 5 Z" fill="url(#grad1)" />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: COLORS.Green, stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: COLORS.Teal, stopOpacity: 1 }} />
                </linearGradient>
              </defs>
            </svg>

            {/* Center Icon */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white pt-4">
              <ShieldCheck size={64} strokeWidth={1.5} />
              <h2 className="text-2xl font-bold mt-2">100% Protected</h2>
              <div className="flex gap-2 mt-4">
                <div className="bg-white/20 px-2 py-1 rounded text-[10px] flex items-center gap-1"><Users size={10} /> Inclusive</div>
                <div className="bg-white/20 px-2 py-1 rounded text-[10px] flex items-center gap-1"><Zap size={10} /> Fast</div>
              </div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-[#284952] font-medium text-center max-w-md"
          >
            "A simple and safe way for every worker to speak up."
          </motion.p>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

// --- MAIN SCENE ---

export default function SceneOmnichannel({ isActive, progress }: { isActive: boolean, progress: number }) {
  const isMerged = progress >= TIMING.MERGE

  // Header Animation
  const headerVariant = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -50, opacity: 0 }
  }

  return (
    <div className="w-full h-full bg-[#F5F5F7] relative overflow-hidden font-sans flex flex-col items-center justify-center">

      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(96,186,129,0.1),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#284952 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />

      {/* Floating Blobs for Depth */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 left-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      />
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-20 right-20 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      />

      {/* --- HEADER (Moved to Bottom) --- */}
      <motion.div
        className="absolute bottom-12 z-50 text-center"
        variants={headerVariant}
        animate={isMerged ? "hidden" : "visible"}
      >
        <h1 className="text-4xl font-extrabold text-[#284952] tracking-tight">FOS Multichannel Grievance Ecosystem</h1>
      </motion.div>

      {/* --- INTERACTIVE GRAPH CONTAINER --- */}
      <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center perspective-[1000px]">

        {/* The 3D Tilt Plane */}
        <motion.div
          className="relative w-full h-full flex items-center justify-center preserve-3d"
          initial={{ rotateX: 20 }}
          animate={{
            rotateX: isMerged ? 0 : 20,
            scale: isMerged ? 0.9 : 1
          }}
          transition={{ duration: 1 }}
        >

          {/* Connection Lines (Behind nodes) */}
          {CHANNELS.map((channel) => (
            <ConnectionBeam
              key={`beam-${channel.id}`}
              start={{ x: 0, y: 0 }} // Center relative to container center
              end={{ x: channel.x, y: channel.y }}
              color={channel.color}
              isActive={progress >= channel.delay && !isMerged}
            />
          ))}

          {/* Central Brain */}
          <CentralCore isMerged={isMerged} />

          {/* Floating Channels */}
          {CHANNELS.map((channel, i) => (
            <ChannelNode
              key={channel.id}
              data={channel}
              index={i} // Pass index for staggering
              isActive={progress >= channel.delay && !isMerged}
            />
          ))}

        </motion.div>
      </div>

      {/* --- END SHIELD (Removed separate component, integrated into Core) --- */}
      {/* <SafetyNet isActive={isMerged} /> */}

    </div>
  )
}