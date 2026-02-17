"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, CheckCircle2, SignalHigh, Battery, Wifi } from "lucide-react"

// --- TIMING (Total: 18s -> 95s to 113s) ---
// Script: 101-113s: "This ticket number is shared with the worker through an SMS 
// so they know their concern has been officially registered and future tracking..."
const TIMING = {
  START: 95,
  TICKET_REVEAL: 95.5,     // Card appears
  HIGHLIGHT_FOS: 96.5,     // Highlight "1121437"
  HIGHLIGHT_CAT: 98.0,     // Highlight "WH"
  HIGHLIGHT_DAY: 99.0,     // Highlight "02"
  HIGHLIGHT_MONTH: 100.0,  // Highlight "02"
  HIGHLIGHT_COMPLETE: 100.5, // Show complete ticket (no highlights)
  SMS_TRANSITION: 101.5,   // Transition to Smartphone view
  NOTIFICATION: 102.5,     // Notification banner appears
  SMS_APP: 104.0,          // SMS app opens
  FEATURE_PHONE_TRANSITION: 105.5, // Switch to Feature Phone
  ZOOM_TICKET: 108.0,      // "officially registered" - zoom on ticket number
  END: 113
}

const EASE_IOS = [0.32, 0.72, 0, 1]

const UnifiedGateway = ({ active, isBroadcasting, isCentered }: { active: boolean, isBroadcasting: boolean, isCentered: boolean }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: active ? 1 : 0,
        scale: active ? (isCentered ? 1.1 : 0.8) : 0.8,
        x: isCentered ? 0 : 0, // Simplified for this scene
      }}
      transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center justify-center relative z-40"
    >
      {/* --- PREMIUM VISUAL LAYERS --- */}

      {/* 1. Orbiting Data Ring (Always visible when active) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-64 h-64 border border-dashed border-green-200/20 rounded-full"
      />

      {/* 2. Signal Waves (Broadcasting Mode) */}
      {isBroadcasting && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
              className="absolute w-56 h-56 rounded-full border-2 border-green-400/10"
            />
          ))}
          {/* Glowing Core Aura */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute w-80 h-80 rounded-full bg-green-400/5 blur-3xl"
          />
        </div>
      )}

      <div className="relative group">
        <div
          className={`relative w-48 h-48 flex items-center justify-center transition-all duration-1000
                        ${isBroadcasting ? "transform scale-110" : ""}
                    `}
        >
          {/* --- HOLOGRAPHIC CONNECTION NEXUS --- */}

          {/* A. Central Core (The "Brain") */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{
              scale: isBroadcasting ? [1, 1.1, 1] : 1,
              boxShadow: isBroadcasting
                ? "0 0 30px rgba(96, 186, 129, 0.6), inset 0 0 20px rgba(96, 186, 129, 0.4)"
                : "0 0 10px rgba(203, 213, 225, 0.3)"
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`w-28 h-28 rounded-full flex items-center justify-center relative z-20 backdrop-blur-sm border
                            ${isBroadcasting ? "bg-green-500/10 border-green-400/50" : "bg-slate-200/10 border-slate-300/30"}
                        `}
          >
            <div className={`relative w-20 h-20 transition-all duration-500 ${isBroadcasting ? "scale-110" : "scale-100"}`}>
              <img
                src="/assets/FOS-01.png"
                alt="FOS Logo"
                className={`w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(96,186,129,0.5)] ${isBroadcasting ? "opacity-100" : "opacity-60"}`}
              />
            </div>

            {/* Core pulse ring */}
            {isBroadcasting && (
              <motion.div
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-green-400/30"
              />
            )}
          </motion.div>


          {/* Outer Ring (Slow Reverse Spin) */}
          <motion.div
            animate={{ rotateY: 45, rotateZ: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className={`absolute w-52 h-52 rounded-full border-2 box-border pointer-events-none z-10
                            ${isBroadcasting ? "border-teal-400/20" : "border-slate-300/10"}
                        `}
            style={{ borderLeftColor: 'transparent', borderRightColor: 'transparent' }}
          />

          {/* C. Floating Data Nodes (Particles) */}
          {isBroadcasting && (
            <div className="absolute inset-0 pointer-events-none">
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: Math.cos(deg * Math.PI / 180) * 100,
                    y: Math.sin(deg * Math.PI / 180) * 100,
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: "easeOut" }}
                  className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_5px_#4ade80]"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Labels */}
      <div className="mt-4 text-center">
        <h3 className="text-sm font-black text-[#284952] tracking-tight uppercase">
          FOS SMS Gateway
        </h3>
        <div className="flex items-center justify-center gap-1.5 mt-1">
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`w-2 h-2 rounded-full ${isBroadcasting ? "bg-green-500 shadow-[0_0_8px_#22c55e]" : "bg-slate-300"}`}
          />
          <span className="text-[10px] text-slate-500 font-mono font-bold tracking-[0.2em]">
            {isBroadcasting ? "SYSTEM: ACTIVE" : "SYSTEM: STANDBY"}
          </span>
        </div>
      </div>
    </motion.div>
  )
}


// --- REUSABLE TECH CALLOUT COMPONENT ---
// Position is relative to the text center
const TechCallout = ({ label, value, position }: { label: string, value: string, position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) => {

  // Define offsets based on position preference
  const offsets = {
    'top-left': { x: -140, y: -90 },
    'top-right': { x: 140, y: -90 },
    'bottom-left': { x: -140, y: 90 },
    'bottom-right': { x: 140, y: 90 },
  }

  const { x, y } = offsets[position]

  return (
    <div className="absolute left-1/2 top-1/2 z-50 pointer-events-none w-0 h-0 overflow-visible">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute flex items-center justify-center"
        style={{ x, y }} // Framer motion handles the transform translate
      >

        {/* The Connector Line (Draws from text center (0,0) to box center) */}
        <svg
          className="absolute overflow-visible"
          style={{
            // Position SVG to span between origin and target
            left: -x,
            top: -y,
            width: 0,
            height: 0
          }}
        >
          {/* Line from (0,0) [Text Center] to (x,y) [Box Center] */}
          {/* Note: In SVG coord space inside this container, we draw relative to the box */}
          <motion.path
            d={`M${-x},${-y} L0,0`}
            stroke="#284952"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 0.4 }}
          />
          {/* Dot at the text end */}
          <motion.circle
            cx={-x} cy={-y} r="3" fill="#60BA81"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}
          />
          {/* Dot at the box end */}
          <motion.circle
            cx="0" cy="0" r="3" fill="#284952"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}
          />
        </svg>

        {/* The Content Box */}
        <div
          className="bg-[#284952]/95 backdrop-blur-xl text-white p-3 rounded-xl shadow-[0_10px_30px_rgba(40,73,82,0.3)] border border-white/20 min-w-[140px] text-center"
          style={{ transform: 'translate(-50%, -50%)' }} // Center div on the coordinate
        >
          <div className="text-[9px] font-bold text-[#60BA81] uppercase tracking-wider mb-0.5">{label}</div>
          <div className="text-xs font-bold leading-tight">{value}</div>
        </div>

      </motion.div>
    </div>
  )
}

export const SceneTicket = ({ isActive, progress }: { isActive: boolean, progress: number }) => {

  // Stages
  const showTicket = progress >= TIMING.TICKET_REVEAL && progress < TIMING.SMS_TRANSITION
  const showSMS = progress >= TIMING.SMS_TRANSITION

  // Phone Stages
  const showSmartphone = progress >= TIMING.SMS_TRANSITION && progress < TIMING.FEATURE_PHONE_TRANSITION
  const showNotification = progress >= TIMING.NOTIFICATION
  const showSMSApp = progress >= TIMING.SMS_APP
  const showFeaturePhone = progress >= TIMING.FEATURE_PHONE_TRANSITION
  const showZoomTicket = progress >= TIMING.ZOOM_TICKET

  // Helper for text styling based on active state
  const getTextStyle = (isActive: boolean, isDimmed: boolean) => {
    if (isActive) return {
      color: "#60BA81",
      scale: 1.3,
      fontWeight: 800,
      y: -2,
      filter: "blur(0px)",
      opacity: 1
    }
    if (isDimmed) return {
      color: "#212529",
      scale: 1,
      fontWeight: 400,
      y: 0,
      filter: "blur(1.5px)",
      opacity: 0.25
    }
    return {
      color: "#212529",
      scale: 1,
      fontWeight: 600,
      y: 0,
      filter: "blur(0px)",
      opacity: 1
    }
  }

  // Determine which part is highlighted (ends at HIGHLIGHT_COMPLETE)
  const isFosActive = progress >= TIMING.HIGHLIGHT_FOS && progress < TIMING.HIGHLIGHT_CAT
  const isCatActive = progress >= TIMING.HIGHLIGHT_CAT && progress < TIMING.HIGHLIGHT_DAY
  const isDayActive = progress >= TIMING.HIGHLIGHT_DAY && progress < TIMING.HIGHLIGHT_MONTH
  const isMonthActive = progress >= TIMING.HIGHLIGHT_MONTH && progress < TIMING.HIGHLIGHT_COMPLETE

  const anyActive = isFosActive || isCatActive || isDayActive || isMonthActive

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#F5F5F7] perspective-[1000px] font-sans relative overflow-hidden p-4">

      {/* Background: Digital Data Stream (Subtle) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[10px] font-mono text-[#284952] font-bold"
            initial={{ top: -100, left: `${10 + i * 12}%`, opacity: 0 }}
            animate={{
              top: "120%",
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: Math.random() * 5
            }}
          >
            {Array(20).fill(0).map(() => Math.random().toString(36).substring(2, 3)).join('')}
          </motion.div>
        ))}
      </div>

      <div className={`relative z-10 w-full ${showSMS ? 'max-w-7xl h-[800px]' : 'max-w-md h-[500px]'} flex items-center justify-center transition-all duration-500`}>
        <AnimatePresence mode="wait">

          {/* --- STAGE 1: TICKET GENERATION CARD --- */}
          {showTicket && (
            <motion.div
              key="ticket-card"
              initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: 15 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotateX: 0,
                // Gentle sway during analysis
                rotateY: anyActive ? (progress % 2 === 0 ? 2 : -2) : 0
              }}
              exit={{ opacity: 0, scale: 0.8, y: -30, filter: "blur(10px)" }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="w-full max-w-[420px] bg-white shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] rounded-2xl overflow-visible relative border-t-[6px] border-[#60BA81]"
            >
              <div className="p-8 flex flex-col items-center relative z-20">

                {/* Success Check Animation */}
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mb-6 bg-[#E6F4EA] p-4 rounded-full shadow-inner"
                >
                  <CheckCircle2 size={40} className="text-[#60BA81]" strokeWidth={2.5} />
                </motion.div>

                {/* --- THE TICKET NUMBER DISPLAY --- */}
                <div className="text-center w-full mb-8 relative">
                  <div className="text-[26px] tracking-tight font-mono text-[#212529] flex items-center justify-center gap-[2px] relative cursor-default select-none">

                    {/* 1. Category (WH) */}
                    <div className="relative">
                      <motion.span
                        className="inline-block relative z-10"
                        animate={getTextStyle(isCatActive, anyActive && !isCatActive)}
                      >
                        WH
                      </motion.span>
                      <AnimatePresence>
                        {isCatActive && (
                          <TechCallout
                            label="Category"
                            value="Workplace Health"
                            position="top-left"
                          />
                        )}
                      </AnimatePresence>
                    </div>

                    {/* 2. Day (02) */}
                    <div className="relative">
                      <motion.span
                        className="inline-block relative z-10"
                        animate={getTextStyle(isDayActive, anyActive && !isDayActive)}
                      >
                        02
                      </motion.span>
                      <AnimatePresence>
                        {isDayActive && (
                          <TechCallout
                            label="Day"
                            value="02"
                            position="bottom-left"
                          />
                        )}
                      </AnimatePresence>
                    </div>

                    {/* 3. Month (02) */}
                    <div className="relative">
                      <motion.span
                        className="inline-block relative z-10"
                        animate={getTextStyle(isMonthActive, anyActive && !isMonthActive)}
                      >
                        02
                      </motion.span>
                      <AnimatePresence>
                        {isMonthActive && (
                          <TechCallout
                            label="Month"
                            value="February"
                            position="bottom-right"
                          />
                        )}
                      </AnimatePresence>
                    </div>

                    {/* 4. Year/Dash (89-) */}
                    <motion.span
                      className="inline-block opacity-40"
                      animate={{ opacity: anyActive ? 0.2 : 0.4, scale: 1, filter: anyActive ? "blur(1px)" : "blur(0px)" }}
                    >
                      89-
                    </motion.span>

                    {/* 5. FOS ID (1121437) */}
                    <div className="relative">
                      <motion.span
                        className="inline-block relative z-10"
                        animate={getTextStyle(isFosActive, anyActive && !isFosActive)}
                      >
                        1121437
                      </motion.span>
                      <AnimatePresence>
                        {isFosActive && (
                          <TechCallout
                            label="Legacy ID"
                            value="Unique Complaint ID"
                            position="top-right"
                          />
                        )}
                      </AnimatePresence>
                    </div>

                  </div>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-500 text-sm font-medium"
                >
                  Ticket Generated Successfully
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 w-full"
                >
                  <div className="w-full bg-gray-50 border border-dashed border-gray-300 rounded-lg p-3 text-center">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      Syncing to Central Database...
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Decorative shine */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/80 to-transparent z-10 pointer-events-none opacity-50" />
            </motion.div>
          )}

          {/* --- STAGE 2: SMS DELIVERY (Robot + Feature Phone) --- */}
          {showSMS && (
            <motion.div
              key="phase-sms"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.8 }}
              className="w-full flex items-center justify-between px-0 lg:px-4 relative"
            >
              {/* Left: FOS SMS Gateway */}
              <div className="flex-1 flex justify-center items-center scale-[1.1] lg:scale-[1.3]">
                <UnifiedGateway active={showSMS} isBroadcasting={showSMS} isCentered={true} />
              </div>

              {/* Center-Left: Signal from Gateway to Worker */}
              <div className="w-24 relative h-64 hidden lg:block">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0"
                >
                  <svg className="absolute inset-0 w-full h-full border-none pointer-events-none">
                    <motion.path
                      d="M 0,128 Q 50,88 100,128"
                      fill="none"
                      stroke="url(#beamGradientTicket1)"
                      strokeWidth="3"
                      strokeDasharray="8 8"
                      initial={{ strokeDashoffset: 100 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                    <defs>
                      <linearGradient id="beamGradientTicket1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60BA81" stopOpacity="0" />
                        <stop offset="50%" stopColor="#60BA81" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#60BA81" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              </div>

              {/* Middle: Worker Avatar */}
              <motion.div
                className="flex-none flex flex-col items-center justify-center relative px-4"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative">
                  <img
                    src="/assets/avatars/worker_avatar.png"
                    alt="Worker"
                    className="w-32 h-32 lg:w-48 lg:h-48 object-contain drop-shadow-xl rounded-full border-4 border-white bg-white/20 backdrop-blur-sm"
                  />
                  {/* Receiving Glow */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0, 0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-[#60BA81] rounded-full blur-2xl -z-10"
                  />
                </div>
                <div className="mt-4 text-center">
                  <span className="text-[10px] font-bold text-[#284952] uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full shadow-sm border border-[#284952]/10">
                    Concerned Worker
                  </span>
                </div>
              </motion.div>

              {/* Center-Right: Signal from Worker to Phone */}
              <div className="w-24 relative h-64 hidden lg:block">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0"
                >
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.path
                      d="M 0,128 Q 50,88 100,128"
                      fill="none"
                      stroke="url(#beamGradientTicket2)"
                      strokeWidth="3"
                      strokeDasharray="8 8"
                      initial={{ strokeDashoffset: 100 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                    />
                    <defs>
                      <linearGradient id="beamGradientTicket2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60BA81" stopOpacity="0" />
                        <stop offset="50%" stopColor="#60BA81" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#60BA81" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              </div>

              {/* Right: Feature Phone (Nokia Style) */}
              <div className="flex-1 flex justify-center items-center relative h-[600px]">
                <AnimatePresence mode="wait">

                  {/* --- PHASE 1: SMARTPHONE (iPhone) --- */}
                  {showSmartphone && (
                    <motion.div
                      key="phone-smart"
                      initial={{ y: 100, opacity: 0, rotate: 5 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      exit={{ x: -50, opacity: 0, scale: 0.9, filter: "blur(5px)" }}
                      transition={{ duration: 0.6, ease: EASE_IOS }}
                      className="absolute z-20 w-[260px] h-[520px] bg-white rounded-[35px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-[8px] border-[#1f1f1f] overflow-hidden"
                    >
                      {/* Dynamic Island */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[24px] bg-[#1f1f1f] rounded-b-xl z-50 flex justify-center items-center">
                        <div className="w-12 h-1 bg-[#333] rounded-full mt-1" />
                      </div>

                      {/* Screen Content */}
                      <div className="w-full h-full bg-[#f5f5f5] flex flex-col relative">
                        {/* Status Bar */}
                        <div className="w-full h-6 px-4 flex items-center justify-between text-[10px] font-medium text-gray-800">
                          <span>9:41</span>
                          <div className="flex items-center gap-1.5">
                            <div className="w-3 h-2 border border-gray-800 rounded-[2px]" />
                          </div>
                        </div>

                        {/* Lock Screen with Notification */}
                        <AnimatePresence>
                          {!showSMSApp && (
                            <motion.div
                              key="lockscreen"
                              initial={{ opacity: 1 }}
                              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                              transition={{ duration: 0.5 }}
                              className="absolute inset-0 z-20 flex flex-col items-center pt-20 px-6 bg-cover bg-center"
                              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop')" }}
                            >
                              <div className="text-white text-6xl font-thin mb-2 tracking-tighter">09:41</div>
                              <div className="text-white text-md font-medium opacity-80 mb-12">Monday, 24 Nov</div>

                              {/* Notification Banner */}
                              {showNotification && (
                                <motion.div
                                  initial={{ y: 20, opacity: 0, scale: 0.9 }}
                                  animate={{ y: 0, opacity: 1, scale: 1 }}
                                  transition={{ type: "spring", stiffness: 100 }}
                                  className="w-full bg-white/90 backdrop-blur-2xl rounded-2xl p-4 shadow-2xl flex items-start gap-3 cursor-pointer border border-white/20"
                                >
                                  <div className="w-10 h-10 bg-[#284952] rounded-xl flex items-center justify-center text-white shrink-0 shadow-inner">
                                    <MessageSquare size={20} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                      <span className="text-[10px] font-bold text-black uppercase tracking-wider">FOS Notification</span>
                                      <span className="text-[9px] text-gray-500">now</span>
                                    </div>
                                    <p className="text-[11px] text-gray-800 leading-tight font-medium">
                                      New FOS complaint: <span className="text-[#60BA81] font-bold">#WH020289-1121437</span>
                                    </p>
                                  </div>
                                </motion.div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* SMS App (After Notification) */}
                        {showSMSApp && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col bg-white">
                            {/* App Header */}
                            <div className="h-12 border-b flex items-center px-4 gap-3 bg-white/95 backdrop-blur z-10 shadow-sm">
                              <div className="w-5 h-5 flex items-center justify-center">
                                <span className="text-[#007AFF] text-2xl leading-none">‹</span>
                              </div>
                              <div className="flex flex-col items-center flex-1 pr-6">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#60BA81] to-[#284952] flex items-center justify-center mb-0.5 shadow-sm">
                                  <MessageSquare size={10} className="text-white" />
                                </div>
                                <span className="text-[9px] text-black font-bold uppercase tracking-tighter">FOS Hotline</span>
                              </div>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1 bg-[#F2F2F7]">
                              <div className="text-[9px] text-gray-400 text-center my-4 font-bold uppercase tracking-widest">Today 9:41 AM</div>

                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                                className="max-w-[85%] p-3 rounded-2xl mb-2 relative bg-[#E9E9EB] text-black rounded-tl-sm self-start"
                              >
                                <div className="text-[11px] leading-relaxed whitespace-pre-wrap">
                                  You have received a new FOS complaint against <span className="font-bold text-[#60BA81] bg-[#60BA81]/10 px-1 rounded">#WH020289-1121437</span>.
                                  {"\n\n"}
                                  Please visit <span className="text-[#007AFF] underline">fruitofsustainability.com</span> or visit mobile app to process complaint.
                                </div>
                              </motion.div>
                            </div>

                            {/* Input Area */}
                            <div className="p-3 border-t bg-gray-50 flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-light text-xl">+</div>
                              <div className="flex-1 h-8 rounded-full border border-gray-300 bg-white px-3 flex items-center text-[11px] text-gray-400">iMessage</div>
                              <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">
                                <div className="w-3 h-3 bg-white rounded-full shadow-inner" />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Phone Reflection Effect */}
                      <div className="absolute inset-0 rounded-[35px] pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/10 z-[60]" />
                    </motion.div>
                  )}

                  {/* --- PHASE 2: FEATURE PHONE (Nokia Style) --- */}
                  {showFeaturePhone && (
                    <motion.div
                      key="phone-feature"
                      initial={{ scale: 0.9, opacity: 0, x: 50 }}
                      animate={{
                        scale: showZoomTicket ? 1.3 : 1,
                        opacity: 1,
                        x: 0,
                        y: showZoomTicket ? -50 : 0
                      }}
                      transition={{ duration: 0.6, ease: EASE_IOS }}
                      className="absolute z-20 w-[200px] h-[400px] bg-[#1a1a1a] rounded-[30px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] border-[4px] border-[#333] flex flex-col relative overflow-hidden"
                    >
                      {/* Earpiece */}
                      <div className="h-4 w-full flex justify-center items-center opacity-50">
                        <div className="w-12 h-1 bg-[#444] rounded-full" />
                      </div>

                      {/* Screen Area */}
                      <div className="px-3 pb-2 pt-1">
                        <div className="bg-[#d4ded4] h-[140px] rounded-sm border-2 border-black/10 shadow-inner flex flex-col font-mono text-[#1a1a1a] p-1.5 relative overflow-hidden">
                          {/* LCD Pixel Overlay */}
                          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />

                          {/* Status Bar */}
                          <div className="flex justify-between items-center text-[8px] border-b border-[#1a1a1a]/10 pb-0.5 mb-1.5 opacity-70">
                            <span>Telenor</span>
                            <div className="flex gap-1">
                              <SignalHigh size={8} />
                              <Battery size={8} />
                            </div>
                          </div>

                          {/* Message Content */}
                          <div className="flex-1 overflow-hidden">
                            <div className="bg-[#1a1a1a]/5 p-1 mb-1">
                              <span className="text-[8px] font-bold block">FOS Hotline</span>
                              <span className="text-[6px] opacity-60">9:41 AM</span>
                            </div>
                            <div className="text-[7px] leading-tight space-y-0.5">
                              <p>You have received a new FOS complaint against </p>
                              <motion.p
                                className="font-bold text-[9px] relative inline-block"
                                animate={showZoomTicket ? {
                                  scale: 1.2,
                                  color: "#60BA81",
                                } : {}}
                              >
                                #WH020289-1121437
                              </motion.p>
                              <p className="opacity-80">Please visit fruitofsustainability.com to process.</p>
                            </div>
                          </div>

                          {/* Bottom Action */}
                          <div className="mt-auto pt-1 border-t border-[#1a1a1a]/10 flex justify-between text-[7px] font-bold">
                            <span>Options</span>
                            <span>Back</span>
                          </div>
                        </div>
                      </div>

                      {/* Brand */}
                      <div className="flex justify-center py-2">
                        <span className="text-gray-500 text-[10px] font-bold tracking-[0.2em]">NOKIA</span>
                      </div>

                      {/* Navigation Key */}
                      <div className="h-12 flex justify-center items-center mb-2">
                        <div className="w-10 h-10 rounded-[10px] border-2 border-[#444] bg-[#222] flex items-center justify-center shadow-lg">
                          <div className="w-4 h-4 bg-[#111] rounded shadow-inner" />
                        </div>
                        {/* Call Buttons */}
                        <div className="absolute w-[160px] flex justify-between px-2">
                          <div className="flex flex-col gap-2">
                            <div className="w-8 h-[2px] bg-white/20 rounded-full" />
                            <div className="w-8 h-6 rounded-md bg-[#222] border-t border-white/10 flex items-center justify-center">
                              <span className="text-green-500 text-[10px]">📞</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            <div className="w-8 h-[2px] bg-white/20 rounded-full" />
                            <div className="w-8 h-6 rounded-md bg-[#222] border-t border-white/10 flex items-center justify-center">
                              <span className="text-red-500 text-[10px]">⏻</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Keypad */}
                      <div className="flex-1 px-4 pb-6 grid grid-cols-3 gap-1.5 content-start">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((k) => (
                          <div key={k} className="w-full h-7 bg-gradient-to-b from-[#2a2a2a] to-[#222] rounded-[4px] flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.5)] text-gray-300 text-[12px] font-bold border-t border-white/10">
                            {k}
                          </div>
                        ))}
                      </div>

                    </motion.div>
                  )}

                  {/* ZOOM EFFECT: Ticket Number Tag */}
                  {showFeaturePhone && (
                    <AnimatePresence>
                      {showZoomTicket && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          className="absolute top-[30%] right-[5%] z-50"
                        >
                          <div className="bg-[#284952] text-white px-6 py-4 rounded-2xl shadow-2xl border-2 border-[#60BA81]/50 relative">

                            <div className="text-[10px] font-bold text-[#60BA81] uppercase tracking-wider mb-1">
                              Registered Complaint
                            </div>
                            <div className="text-lg font-bold font-mono tracking-wide">
                              #WH020289-1121437
                            </div>
                            <div className="text-[9px] text-white/70 mt-1">
                              Officially Registered ✓
                            </div>

                            {/* Pulse Ring */}
                            <motion.div
                              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="absolute inset-0 border-2 border-[#60BA81] rounded-2xl"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                </AnimatePresence>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}