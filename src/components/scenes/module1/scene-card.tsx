"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Phone, MessageSquare, Mail, QrCode, Scan, Signal, Wifi, Battery, CheckCircle2 } from "lucide-react"

// Script Timing
const TIMING = {
  ENTRANCE: 0,
  FOCUS_ID: 10,
  FOCUS_INSTRUCTIONS: 13.5,
  FOCUS_CHANNELS: 16.5,
  FOCUS_QR: 18.5,
  TRANSITION_START: 23, // Start moving phone to center & rotating
  SHOW_VIDEO_UI: 24.5, // Phone screen switches to video
}

// --- BRAND PALETTE ---
const COLORS = {
  DeepTeal: "#284952",
  FreshGreen: "#60BA81",
  WarmOrange: "#F5A83C",
  Charcoal: "#17161A",
  LightGray: "#F5F5F7",
}

export const SceneCard = ({ isActive }: { isActive: boolean }) => {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive) {
      const startTime = Date.now()
      interval = setInterval(() => {
        setElapsed((Date.now() - startTime) / 1000)
      }, 100)
    } else {
      setElapsed(0)
    }
    return () => clearInterval(interval)
  }, [isActive])

  // --- STAGE LOGIC ---
  const isFocusId = elapsed >= TIMING.FOCUS_ID && elapsed < TIMING.FOCUS_INSTRUCTIONS
  const isFocusInstructions = elapsed >= TIMING.FOCUS_INSTRUCTIONS && elapsed < TIMING.FOCUS_CHANNELS
  const isFocusChannels = elapsed >= TIMING.FOCUS_CHANNELS && elapsed < TIMING.FOCUS_QR
  const isFocusQr = elapsed >= TIMING.FOCUS_QR && elapsed < TIMING.TRANSITION_START

  // The Transition Phase
  const isTransitioning = elapsed >= TIMING.TRANSITION_START
  const showVideoUI = elapsed >= TIMING.SHOW_VIDEO_UI

  // Helper for Card Blur/Focus
  const getFocusStyle = (isFocused: boolean) => {
    if (isTransitioning) return { filter: "blur(8px)", opacity: 0, scale: 0.9 } // Card fades out

    if (isFocused) return { scale: 1.05, opacity: 1, filter: "blur(0px)", zIndex: 20 }
    if (isFocusId || isFocusInstructions || isFocusChannels || isFocusQr) {
      return { scale: 0.98, opacity: 0.4, filter: "blur(2px)", zIndex: 1 }
    }
    return { scale: 1, opacity: 1, filter: "blur(0px)", zIndex: 1 }
  }

  // --- PHONE ANIMATION VARIANTS ---
  const phoneVariants: Variants = {
    hidden: {
      x: 100,
      y: 200,
      rotateX: 20,
      rotateZ: -10,
      opacity: 0,
      scale: 0.8
    },
    scanning: {
      x: 320, // Rebalanced for larger main card and larger phone
      y: 215,
      rotateX: 20,
      rotateZ: -5,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    },
    centered: {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateZ: -90, // ROTATE TO LANDSCAPE (Counter-Clockwise)
      opacity: 1,
      scale: 1.3, // Larger for viewing
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 15,
        mass: 1.2,
        delay: 0.2
      }
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#F5F5F7] relative overflow-hidden perspective-[1200px]">

      {/* --- 1. AMBIENT ENVIRONMENT --- */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-20 blur-[100px]"
          style={{ background: COLORS.FreshGreen }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full opacity-10 blur-[100px]"
          style={{ background: COLORS.DeepTeal }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* --- 2. THE CARD (Background) --- */}
      <motion.div
        className="relative z-10 w-full max-w-[760px] mx-6"
        initial={{ y: 0, rotateX: 0, opacity: 1, scale: 1 }}
        animate={{
          y: elapsed < 1 ? 120 : 0,
          rotateX: elapsed < 1 ? 15 : 0,
          opacity: isTransitioning ? 0 : 1, // Fade out on transition
          scale: isTransitioning ? 0.9 : (isFocusQr ? 0.95 : 1),
          filter: isTransitioning ? "blur(10px)" : "blur(0px)",
        }}
        transition={{ duration: 0.8 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="bg-white rounded-[24px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] border border-white/60 overflow-hidden flex flex-col relative">

          {/* Dimmer Overlay during focus events */}
          <motion.div
            className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 pointer-events-none"
            animate={{ opacity: (isFocusId || isFocusInstructions || isFocusChannels || isFocusQr) ? 1 : 0 }}
          />

          {/* HEADER */}
          <div className="px-5 pt-5 pb-2 flex justify-between items-start gap-3 z-20 relative">
            <motion.div className="w-[100px] h-[100px] border border-gray-100 rounded-xl flex items-center justify-center bg-white shadow-sm shrink-0" animate={getFocusStyle(false)}>
              <img src="/assets/images/FOS-01.png" alt="FOS" className="w-full h-full object-contain" />
            </motion.div>
            <motion.div className="flex-1 flex flex-col items-center pt-1" animate={getFocusStyle(isFocusId)}>
              <div className="bg-[#3E3B38] text-white px-3 py-1 rounded-lg shadow-sm mb-2">
                <span className="text-[9px] font-bold tracking-widest uppercase">فوس شکایت آگاہی کارڈ</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-bold text-[#3E3B38] opacity-60">ID - فوس</span>
                <span className="text-2xl font-black text-[#284952] tracking-tight">475002</span>
              </div>
            </motion.div>
            <motion.div className="w-[100px] h-[100px] border border-gray-100 rounded-xl flex items-center justify-center bg-white shadow-sm shrink-0" animate={getFocusStyle(false)}>
              <img src="/assets/images/company_a.png" alt="Co" className="w-full h-full object-contain" />
            </motion.div>
          </div>

          {/* DATA GRID */}
          <motion.div className="px-5 py-2 z-20 relative" animate={getFocusStyle(isFocusInstructions)}>
            <div className={`border rounded-lg overflow-hidden flex flex-col text-xs transition-colors duration-500 ${isFocusInstructions ? 'border-[#60BA81]' : 'border-gray-300'}`}>
              <div className="flex w-full border-b border-gray-300">
                <div className="flex-1 bg-gray-200 p-2 text-center font-semibold text-[#17161A]">Lahore</div>
                <div className="flex-1 bg-[#3E3B38] p-2 text-center font-bold text-white">ڈیپارٹمنٹ</div>
                <div className="flex-1 bg-gray-200 p-2 text-center font-semibold text-[#17161A]">12322</div>
              </div>
              <div className="flex w-full">
                <div className="flex-1 bg-[#3E3B38] p-2 text-center font-bold text-white">کمپنی ID</div>
                <div className="flex-1 bg-gray-200 p-2 text-center font-semibold text-[#17161A]">Minhal Awais</div>
                <div className="flex-1 bg-[#3E3B38] p-2 text-center font-bold text-white">نام</div>
              </div>
            </div>
          </motion.div>

          {/* CHANNELS & QR */}
          <div className="px-5 pt-2 pb-5 flex gap-6 items-end z-20 relative">
            <motion.div className="flex-1 flex flex-col gap-2" animate={getFocusStyle(isFocusChannels)}>
              {[
                { icon: Phone, text: "ٹول فری نمبر - 080091299" },
                { icon: MessageSquare, text: "موبائل ایس ایم ایس - 03299129999" },
                { icon: Mail, text: "hotline@fruitofsustainability.com" }
              ].map((item, i) => (
                <div key={i} className={`rounded-md p-1.5 pl-2.5 flex items-center gap-2.5 shadow-sm ${isFocusChannels ? 'bg-[#284952]' : 'bg-[#3E3B38]'}`}>
                  <item.icon size={12} className="text-[#60BA81]" />
                  <span className="text-[9px] font-medium tracking-wide text-white truncate">{item.text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div className="w-[90px] shrink-0 flex flex-col items-center gap-2" animate={getFocusStyle(isFocusQr)}>
              <div className="text-[9px] font-bold text-[#767676] text-center">اسکین کریں</div>
              <div className="relative bg-white p-1 rounded-lg border-2 border-[#60BA81] border-dashed shadow-md">
                <QrCode size={60} className="text-[#17161A]" />
                {/* QR Corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#60BA81]" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#60BA81]" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#60BA81]" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#60BA81]" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* --- 3. THE MOBILE PHONE (Scanner -> Video) --- */}
      <AnimatePresence>
        {(isFocusQr || isTransitioning) && (
          <motion.div
            className="absolute z-50 origin-center"
            initial="hidden"
            animate={isTransitioning ? "centered" : "scanning"}
            variants={phoneVariants}
          >
            {/* PHONE CHASSIS */}
            <div className="w-[280px] h-[560px] bg-[#121212] rounded-[44px] border-[5px] border-[#2d2d2d] shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden relative ring-1 ring-white/10">

              {/* STATUS BAR (Hide when video is playing for immersion) */}
              <motion.div
                className="absolute top-0 w-full h-[30px] px-6 flex justify-between items-end pb-1 z-30"
                animate={{ opacity: showVideoUI ? 0 : 1 }}
              >
                <span className="text-[10px] text-white font-medium">9:41</span>
                <div className="flex gap-1.5">
                  <Signal size={10} className="text-white" />
                  <Wifi size={10} className="text-white" />
                  <Battery size={10} className="text-white" />
                </div>
              </motion.div>

              {/* DYNAMIC ISLAND / NOTCH */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[70px] h-[18px] bg-black rounded-full z-30 pointer-events-none" />

              {/* SCREEN CONTENT */}
              <div className="w-full h-full bg-black relative">
                <AnimatePresence mode="wait">
                  {!showVideoUI ? (
                    <CameraView key="camera" />
                  ) : (
                    <motion.div
                      key="video-player"
                      className="w-full h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <VideoPlayer />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* HOME BAR (Hide when video is playing) */}
              <motion.div
                className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/40 rounded-full z-30 backdrop-blur-sm"
                animate={{ opacity: showVideoUI ? 0 : 1 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// --- SUB COMPONENTS ---

const CameraView = () => (
  <motion.div
    className="w-full h-full relative flex items-center justify-center overflow-hidden bg-[#222]"
    exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.5 } }}
  >
    {/* Simulated Camera Feed */}
    <div className="absolute inset-0 bg-white flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gray-100 opacity-20" />
      <div className="p-4 bg-white rounded-lg scale-[2] shadow-sm blur-[1px]">
        <QrCode size={80} className="text-[#17161A] opacity-80" />
      </div>
      {/* Noise */}
      <div className="absolute inset-0 bg-black opacity-[0.1]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")' }}></div>
    </div>

    {/* HUD - Moved upside */}
    <div className="absolute inset-0 flex flex-col items-center justify-start pt-20 z-10">
      <div className="w-[150px] h-[150px] relative border border-white/50 rounded-xl">
        <motion.div
          className="absolute left-0 right-0 h-[2px] bg-[#F5A83C] shadow-[0_0_15px_#F5A83C]"
          animate={{ top: ["10%", "90%", "10%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        {/* Corners */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-[3px] border-l-[3px] border-[#F5A83C] rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-[3px] border-r-[3px] border-[#F5A83C] rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[3px] border-l-[3px] border-[#F5A83C] rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[3px] border-r-[3px] border-[#F5A83C] rounded-br-lg" />
      </div>

      <motion.div
        className="mt-12 flex items-center gap-2 px-4 py-2 bg-black/70 backdrop-blur-md rounded-full border border-white/10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Scan size={12} className="text-[#F5A83C] animate-pulse" />
        <span className="text-[10px] text-white font-medium tracking-wide">Scanning QR...</span>
      </motion.div>

      {/* Success Popup */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur rounded-2xl p-5 shadow-2xl flex flex-col items-center gap-2 z-50 w-[160px]"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{
          scale: [0.5, 1.1, 1],
          opacity: [0, 1, 1]
        }}
        transition={{ delay: 3, duration: 0.5 }} // Syncs with end of scanning phase
      >
        <div className="bg-[#60BA81] rounded-full p-2">
          <CheckCircle2 size={24} className="text-white" />
        </div>
        <span className="text-xs font-bold text-gray-800">Video Loading...</span>
      </motion.div>
    </div>
  </motion.div>
)

const VideoPlayer = () => {
  return (
    <div className="relative w-full h-full bg-black">
      {/* Rotated wrapper: this div is sized for landscape and counter-rotated.
          The video inside fills it naturally without any transform quirks. */}
      <div
        className="absolute"
        style={{
          width: "570px",
          height: "270px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(90deg)",
          overflow: "hidden",
        }}
      >
        <motion.video
          src="/assets/fos_video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  )
}