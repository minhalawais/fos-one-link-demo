"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, MessageSquare, Mail, QrCode } from "lucide-react"
import { ProfilePage } from "./card-components/ProfilePage.tsx"

// Script Timing (Total segment approx 25s)
// 0s: Entrance
// 10s: "Include their IDs" -> Focus ID
// 13.5s: "Clear written instructions" -> Focus Data/Instructions
// 16.5s: "Details of reporting channels" -> Focus Channels
// 18.5s: "QR code" -> Focus QR
// 21.5s: "Leads to a short video guide" -> Transition to Profile Page (Video)

const TIMING = {
  ENTRANCE: 0,
  FOCUS_ID: 10,
  FOCUS_INSTRUCTIONS: 13.5,
  FOCUS_CHANNELS: 16.5,
  FOCUS_QR: 18.5,
  SHOW_PROFILE: 20,
  END: 32
}

// --- BRAND PALETTE ---
const COLORS = {
  DeepTeal: "#284952",
  FreshGreen: "#60BA81",
  WarmOrange: "#F5A83C",
  Charcoal: "#17161A",
  LightGray: "#F5F5F7",
  White: "#FFFFFF",
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

  // Determine active focus area
  const isFocusId = elapsed >= TIMING.FOCUS_ID && elapsed < TIMING.FOCUS_INSTRUCTIONS
  const isFocusInstructions = elapsed >= TIMING.FOCUS_INSTRUCTIONS && elapsed < TIMING.FOCUS_CHANNELS
  const isFocusChannels = elapsed >= TIMING.FOCUS_CHANNELS && elapsed < TIMING.FOCUS_QR
  const isFocusQr = elapsed >= TIMING.FOCUS_QR && elapsed < TIMING.SHOW_PROFILE
  const showProfile = elapsed >= TIMING.SHOW_PROFILE

  // Helper for Focus Styles
  const getFocusStyle = (isFocused: boolean, isAnyFocused: boolean) => {
    if (isFocused) {
      return { scale: 1.05, opacity: 1, filter: "blur(0px)", zIndex: 20 }
    }
    if (isAnyFocused) {
      return { scale: 0.98, opacity: 0.4, filter: "blur(2px)", zIndex: 1 }
    }
    return { scale: 1, opacity: 1, filter: "blur(0px)", zIndex: 1 }
  }

  const isAnyFocused = isFocusId || isFocusInstructions || isFocusChannels || isFocusQr

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

      <AnimatePresence mode="wait">
        {!showProfile ? (
          /* --- 2. THE HERO OBJECT (The Card) --- */
          <motion.div
            key="card-scene"
            className="relative z-10 w-full max-w-[620px] mx-6"
            initial={{ y: 0, rotateX: 0, opacity: 1, scale: 1 }} // Assume entrance handled by TIMING
            animate={{
              y: elapsed < 1 ? 120 : 0,
              rotateX: elapsed < 1 ? 15 : 0,
              opacity: elapsed < 1 ? 0 : 1,
              scale: isFocusQr ? 1.05 : 1, // Slight zoom on QR phase
            }}
            exit={{ scale: 1.5, opacity: 0, filter: "blur(20px)", transition: { duration: 0.8 } }} // Zoom into QR for exit
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Card Container */}
            <div className="bg-white rounded-[24px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] border border-white/60 overflow-hidden flex flex-col relative">

              {/* FOCUS OVERLAY (Optional dimming of background) */}
              <motion.div
                className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isAnyFocused ? 0 : 0 }}
              />

              {/* --- HEADER SECTION --- */}
              <div className="px-6 pt-6 pb-2 flex justify-between items-start gap-4 z-20 relative">
                {/* Left Logo (FOS) */}
                <motion.div
                  className="w-[72px] h-[64px] border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center bg-gray-50 shrink-0"
                  animate={getFocusStyle(false, isAnyFocused)}
                >
                  <div className="text-[10px] font-bold text-gray-400">LOGO</div>
                </motion.div>

                {/* Center: ID Focus (Primary Awareness) */}
                <motion.div
                  className="flex-1 flex flex-col items-center pt-1"
                  animate={getFocusStyle(isFocusId, isAnyFocused)}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-[#3E3B38] text-white px-4 py-1.5 rounded-lg shadow-sm mb-3">
                    <span className="text-[10px] font-bold tracking-widest uppercase">فوس شکایت آگاہی کارڈ</span>
                  </div>

                  {/* DYNAMIC ID REVEAL */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-[#3E3B38] opacity-60">ID - فوس</span>
                    <div className="relative">
                      <span className="text-4xl font-black text-[#284952] tracking-tight">475002</span>
                      {/* Highlight burst behind ID when focused */}
                      {isFocusId && (
                        <motion.div
                          className="absolute inset-0 bg-[#60BA81] blur-xl rounded-full -z-10"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 0.4, scale: 1.5 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Right Logo (Client) */}
                <motion.div
                  className="w-[72px] h-[64px] border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50 shrink-0"
                  animate={getFocusStyle(false, isAnyFocused)}
                >
                  <div className="text-center">
                    <div className="text-[10px] font-black text-[#F5A83C] italic leading-none">Company A</div>
                  </div>
                </motion.div>
              </div>

              {/* --- DATA GRID / INSTRUCTIONS --- */}
              <motion.div
                className="px-6 py-2 z-20 relative"
                animate={getFocusStyle(isFocusInstructions, isAnyFocused)}
                transition={{ duration: 0.5 }}
              >
                <div className={`border rounded-lg overflow-hidden flex flex-col text-xs transition-colors duration-500 ${isFocusInstructions ? 'border-[#60BA81] shadow-lg shadow-[#60BA81]/10' : 'border-gray-300'}`}>
                  {/* Row 1 */}
                  <div className="flex w-full border-b border-gray-300">
                    <div className="flex-1 bg-gray-200 p-2 text-center font-semibold text-[#17161A] border-r border-gray-300">Lahore</div>
                    <div className="flex-1 bg-[#3E3B38] p-2 text-center font-bold text-white border-r border-gray-600 tracking-wide">ڈیپارٹمنٹ</div>
                    <div className="flex-1 bg-gray-200 p-2 text-center font-semibold text-[#17161A]">12322</div>
                  </div>
                  {/* Row 2 */}
                  <div className="flex w-full">
                    <div className="flex-1 bg-[#3E3B38] p-2 text-center font-bold text-white border-r border-gray-600 tracking-wide">کمپنی ID</div>
                    <div className="flex-1 bg-gray-200 p-2 text-center font-semibold text-[#17161A] border-r border-gray-300">Minhal Awais</div>
                    <div className="flex-1 bg-[#3E3B38] p-2 text-center font-bold text-white tracking-wide">نام</div>
                  </div>
                </div>
              </motion.div>

              {/* --- CHANNELS & ACTION SECTION --- */}
              <div className="px-6 pt-2 pb-6 flex gap-8 items-end z-20 relative">

                {/* Left Column: Channels */}
                <motion.div
                  className="flex-1 flex flex-col gap-2"
                  animate={getFocusStyle(isFocusChannels, isAnyFocused)}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-[11px] font-bold text-[#284952] mb-1 text-center md:text-right">
                    آپ مندرجہ ذیل ذرائع سے اپنی شکایات و تجاویز کا اظہار کر سکتے ہیں۔
                  </p>

                  {[
                    { icon: Phone, text: "ٹول فری نمبر - 080091299" },
                    { icon: MessageSquare, text: "موبائل ایس ایم ایس و واٹس ایپ - 03299129999" },
                    { icon: Mail, text: " hotline@fruitofsustainability.com - ای میل" }
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`rounded-md p-2 pl-3 flex items-center gap-3 shadow-sm transition-all duration-300 ${isFocusChannels ? 'bg-[#284952] scale-105' : 'bg-[#3E3B38]'}`}
                    >
                      <item.icon size={14} className="text-[#60BA81]" />
                      <span className="text-[10px] md:text-[11px] font-medium tracking-wide text-white truncate">{item.text}</span>
                    </div>
                  ))}
                </motion.div>

                {/* Right Column: QR / Instructions */}
                <motion.div
                  className="w-[100px] shrink-0 flex flex-col items-center gap-2"
                  animate={getFocusStyle(isFocusQr, isAnyFocused)}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-[10px] font-bold text-[#767676] text-center leading-tight">
                    رہنمائی کے لیے اسے
                    اسکین کریں۔
                  </div>

                  {/* QR Container */}
                  <div className={`relative bg-white p-1.5 rounded-lg border-2 border-dashed shadow-md overflow-hidden group transition-colors duration-500 ${isFocusQr ? 'border-[#F5A83C] scale-110 shadow-xl' : 'border-[#60BA81]'}`}>
                    <QrCode size={72} className="text-[#17161A]" />

                    {/* Scanning Animation - Always active but more prominent when focused */}
                    <motion.div
                      className="absolute top-0 left-0 w-full h-[2px] bg-[#F5A83C] shadow-[0_0_10px_#F5A83C]"
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Corner Brackets */}
                    <div className="absolute top-0.5 left-0.5 w-2 h-2 border-t-2 border-l-2 border-[#60BA81]" />
                    <div className="absolute top-0.5 right-0.5 w-2 h-2 border-t-2 border-r-2 border-[#60BA81]" />
                    <div className="absolute bottom-0.5 left-0.5 w-2 h-2 border-b-2 border-l-2 border-[#60BA81]" />
                    <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b-2 border-r-2 border-[#60BA81]" />
                  </div>
                </motion.div>
              </div>

            </div>

            {/* Reflection / Sheen Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-[24px] pointer-events-none z-30"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
        ) : (
          /* --- 3. PROFILE PAGE VIEW (Post-QR Scan) --- */
          <motion.div
            key="profile-page"
            className="relative z-20 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ProfilePage />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}