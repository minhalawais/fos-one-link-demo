import { motion, AnimatePresence } from "framer-motion"
import { Bell, Mail, ShieldCheck, CheckCircle2, ArrowRight, LogOut, MousePointer2 } from "lucide-react"
import { useState, useEffect } from "react"

// --- CONSTANTS ---
const COLORS = {
  deepTeal: "#284952",
  freshGreen: "#60BA81",
  charcoal: "#17161A",
  white: "#FFFFFF",
  lightGray: "#F5F5F7",
  warmOrange: "#F5A83C",
  glassBorder: "rgba(255, 255, 255, 0.6)",
}

const ASSETS = {
  officer: "/assets/avatars/male_io_notification.png",
}

// Apple-style physics
const spring = { type: "spring", stiffness: 400, damping: 30 }

// --- HELPER COMPONENTS ---
const DonutChart = ({ total }: { total: number }) => (
  <div className="relative w-24 h-24 flex items-center justify-center">
    <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
      {/* Background Circle */}
      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#eee" strokeWidth="4" />
      {/* Segments */}
      {/* Unprocessed (Deep Teal) */}
      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 10 3" fill="none" stroke="#284952" strokeWidth="4" strokeDasharray="20, 100" />
      {/* In Process (Teal Green) */}
      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#2d9480" strokeWidth="4" strokeDasharray="30, 100" strokeDashoffset="-20" />
      {/* Submitted (Fresh Green) */}
      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 -10 3" fill="none" stroke="#60BA81" strokeWidth="4" strokeDasharray="25, 100" strokeDashoffset="-50" />
      {/* Bounced (Orange) */}
      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 5 5" fill="none" stroke="#F5A83C" strokeWidth="4" strokeDasharray="15, 100" strokeDashoffset="-75" />
    </svg>
    <div className="absolute flex flex-col items-center">
      <span className="text-xl font-bold text-[#284952]">{total}</span>
      <span className="text-[6px] text-gray-500 uppercase">Total</span>
    </div>
  </div>
)

const BarChart = () => (
  <div className="flex items-end justify-between h-24 gap-2 px-2">
    {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
      <motion.div
        key={i}
        initial={{ height: 0 }}
        animate={{ height: `${h}%` }}
        transition={{ delay: 0.5 + (i * 0.1), duration: 0.5 }}
        className="w-full bg-[#284952] opacity-80 rounded-t-sm"
      />
    ))}
  </div>
)
// --- STYLES ---
const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

export const SceneNotification = ({ isActive }: { isActive: boolean }) => {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    // Inject styles
    const styleTag = document.createElement("style");
    styleTag.innerHTML = customScrollbarStyles;
    document.head.appendChild(styleTag);
    return () => { document.head.removeChild(styleTag); };
  }, []);

  useEffect(() => {
    if (isActive) {
      setStage(0)
      // Timings synced with Voiceover:
      // 82s: Start
      // 82s - 87.2s: "At the same time... notifications via" (Officer, Beam)
      // 87.2s - 89.52s: "mobile app and email." (Phone, Email)
      // 89.52s - 93.88s: "The case appears on their portals..." (Portal)
      // 93.88s: "...without delay." (Interaction)

      const timers = [
        setTimeout(() => setStage(1), 1000),  // Officer moves Left (~114s)
        setTimeout(() => setStage(2), 3000),  // Beam starts (~116s)
        setTimeout(() => setStage(3), 6000),  // Phone Enters (~119s)
        setTimeout(() => setStage(4), 9000),  // Email Enters (~122s)
        setTimeout(() => setStage(5), 12000), // Portal Enters (~125s - "The case appears on their portals")
        setTimeout(() => setStage(6), 15000), // Row Appears (~128s)
        setTimeout(() => setStage(7), 17500), // Cursor Interaction (~130.5s)
      ]
      return () => timers.forEach(clearTimeout)
    }
  }, [isActive])

  return (
    <div className="w-full h-full relative bg-[#F5F5F7] overflow-hidden flex items-center justify-center font-sans perspective-[2000px]">

      {/* 1. CINEMATIC BACKGROUND & PARTICLES */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Ambient Light Orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-[#60BA81]/20 rounded-full blur-[100px]"
        />

        {/* Floating Particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#284952] rounded-full opacity-20"
            initial={{
              x: Math.random() * 1000,
              y: Math.random() * 600
            }}
            animate={{
              y: [null, Math.random() * -50],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl h-[600px] flex items-center gap-12 px-8">

        {/* --- PHASE 1: NOTIFICATION SEQUENCE (Officer, Phone, Email) --- */}
        <AnimatePresence>
          {stage < 5 && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center w-full h-full"
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.8 }}
            >
              {/* --- LEFT: THE OFFICER (Receiver) --- */}
              <div className="w-1/3 h-full flex items-end justify-center relative z-20">
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: 300, scale: 1.3, filter: "blur(10px)" }}
                      animate={stage >= 1
                        ? { opacity: 1, x: 0, scale: 1.4, filter: "blur(0px)" }
                        : { opacity: 1, x: 300, scale: 1.3, filter: "blur(0px)" }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        mass: 1.2
                      }}
                      className="relative h-[115%] w-full flex justify-center items-end"
                    >
                      {/* Officer Image */}
                      <motion.img
                        src={ASSETS.officer}
                        className="h-full object-contain drop-shadow-2xl relative z-20"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      />

                      {/* Connection Status Badge */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0, y: 20 }}
                        animate={stage >= 1 ? { scale: 1, opacity: 1, y: 0 } : { scale: 0, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                        className="absolute bottom-[40%] right-0 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-full shadow-xl border border-white/50 flex items-center gap-2 z-30"
                      >
                        <div className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#60BA81] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#60BA81]"></span>
                        </div>
                        <span className="text-[10px] font-bold text-[#284952] tracking-wide">Investigation Officer</span>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* --- CENTER/RIGHT: THE DEVICE CLUSTER --- */}
              <div className="flex-1 h-full relative flex items-center justify-center">

                {/* A. THE DATA BEAM */}
                <div className="absolute left-[-150px] right-[50%] top-1/2 h-[40px] z-0 pointer-events-none flex items-center">
                  <svg className="w-full h-full overflow-visible">
                    <line x1="0" y1="20" x2="100%" y2="20" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
                    {stage === 2 && (
                      <motion.g>
                        <motion.circle r="4" fill="#60BA81" filter="url(#glow)">
                          <animateMotion path="M 0 20 L 450 20" dur="1.2s" repeatCount="1" fill="freeze" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
                        </motion.circle>
                        {[1, 2, 3].map((i) => (
                          <motion.circle key={i} r={3 - i * 0.5} fill="#60BA81" opacity={0.5}>
                            <animateMotion path="M 0 20 L 450 20" dur="1.2s" begin={`${i * 0.05}s`} repeatCount="1" fill="freeze" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
                          </motion.circle>
                        ))}
                      </motion.g>
                    )}
                    <defs>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                      </filter>
                    </defs>
                  </svg>
                </div>

                {/* B. THE 3D DEVICE STACK */}
                <div className="relative w-[400px] h-[500px] flex items-center justify-center perspective-[1200px]">

                  {/* --- EMAIL LAYER --- */}
                  <motion.div
                    initial={{ opacity: 0, rotateY: 45, rotateX: 10, z: -200, x: 100 }}
                    animate={stage >= 4
                      ? { opacity: 1, x: 0, y: 0, rotateY: 0, rotateX: 0, z: 0, scale: 1 }
                      : { opacity: 0, z: -200, x: 100 }
                    }
                    transition={{ type: "spring", stiffness: 120, damping: 20, mass: 1 }}
                    className="absolute z-20"
                  >
                    <div className="w-[360px] h-[480px] bg-white rounded-xl shadow-2xl border border-gray-300 overflow-hidden flex flex-col transform-gpu ring-1 ring-black/10">

                      {/* Gmail/Outlook Header Bar */}
                      <div className="bg-[#f2f6fc] px-4 py-2 border-b border-gray-200 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-[#ea4335] rounded-sm flex items-center justify-center">
                            <Mail size={12} className="text-white" />
                          </div>
                          <span className="text-[11px] font-semibold text-gray-700">Gmail - Complaint #UE121228</span>
                        </div>
                        <div className="flex gap-1.5 opacity-40">
                          <div className="w-2 h-2 rounded-full bg-gray-400" />
                          <div className="w-2 h-2 rounded-full bg-gray-400" />
                          <div className="w-2 h-2 rounded-full bg-gray-400" />
                        </div>
                      </div>

                      {/* Email Actions Bar */}
                      <div className="bg-white px-4 py-2 border-b border-gray-100 flex items-center gap-4 shrink-0">
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-[12px]">←</div>
                        <div className="w-5 h-5 text-gray-400 flex items-center justify-center">⋮</div>
                        <div className="flex-1" />
                        <div className="text-[10px] text-gray-400">1 of 124</div>
                      </div>

                      {/* Scrollable Email Body */}
                      <div className="flex-1 overflow-y-auto bg-[#f7f7f7] p-2 custom-scrollbar">
                        <div className="bg-white shadow-sm w-full mx-auto max-w-full">

                          {/* FOS Production Email Styling Replicated Below */}

                          {/* Header Block */}
                          <div className="bg-[#284952] p-5 text-center">
                            <div className="bg-white p-1 rounded inline-block mb-3">
                              <img src="https://fruitofsustainability.com/assets/img/FOS-logo.webp" alt="FOS Logo" className="w-24 h-auto" />
                            </div>
                            <h1 className="text-white text-[13px] font-bold m-0 flex items-center justify-center gap-2 leading-tight">
                              New Complaint <br /> Investigation Request
                              <span className="bg-[#f5a83c] text-white text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider h-fit">HIGH PRIORITY</span>
                            </h1>
                          </div>

                          <div className="p-4 space-y-4 text-left">
                            <p className="text-[11px] text-[#333] m-0">Dear Investigation Officer Minhal Awais,</p>

                            <p className="text-[11px] text-[#333] m-0 leading-relaxed">
                              A new complaint has been registered in the FOS Grievance Management System and requires your immediate attention and investigation.
                            </p>

                            {/* Complaint Information Box */}
                            <div className="bg-[#f9f9f9] border-l-4 border-[#60BA81] p-3 shadow-sm">
                              <h3 className="text-[#284952] text-[11px] font-bold mb-2">Complaint Information</h3>
                              <div className="space-y-1 text-[10px]">
                                <div className="flex border-b border-gray-100 pb-1">
                                  <span className="w-28 text-gray-500 font-bold text-left">Ticket Number:</span>
                                  <span className="font-bold text-gray-800">#UE121228-878863</span>
                                </div>
                                <div className="flex border-b border-gray-100 pb-1 pt-1">
                                  <span className="w-28 text-gray-500 font-bold text-left">Category:</span>
                                  <span className="text-gray-800">Unfair Employment</span>
                                </div>
                                <div className="flex border-b border-gray-100 pb-1 pt-1">
                                  <span className="w-28 text-gray-500 font-bold text-left">Received On:</span>
                                  <span className="text-gray-800">2025-12-12 14:01:38</span>
                                </div>
                                <div className="flex pt-1">
                                  <span className="w-28 text-gray-500 font-bold text-left">Status:</span>
                                  <span className="font-bold text-[#F5A83C]">Pending Investigation</span>
                                </div>
                              </div>
                            </div>

                            {/* Complaint Summary Box */}
                            <div className="bg-[#f9f9f9] border-l-4 border-[#60BA81] p-3 shadow-sm">
                              <h3 className="text-[#284952] text-[11px] font-bold mb-2">Complaint Summary</h3>
                              <p className="text-[10px] m-0 leading-relaxed text-gray-700 italic">
                                "I would like to raise a serious concern regarding an <strong>unfair and forceful termination</strong>.
                                Yesterday, I was called to the <strong>head office by Mr. Nabeel Ghazi</strong>, who informed me that <strong>Major Shehryar</strong> wanted to meet me..."
                              </p>
                              <div className="mt-1 text-center">
                                <span className="text-[8px] text-gray-400 underline cursor-pointer hover:text-[#60BA81]">Read full summary...</span>
                              </div>
                            </div>

                            {/* Action Required Box */}
                            <div className="bg-[#f9f9f9] border-l-4 border-[#60BA81] p-3 shadow-sm">
                              <h3 className="text-[#284952] text-[11px] font-bold mb-1">Action Required</h3>
                              <p className="text-[10px] text-gray-700 m-0">Please conduct a thorough investigation and submit your RCA and CAPA plan using the link below.</p>
                            </div>

                            {/* Submit Button */}
                            <div className="text-center py-2">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-[#60BA81] text-white text-[10px] font-bold py-2.5 px-6 rounded shadow-lg cursor-pointer inline-block"
                              >
                                Submit RCA & CAPA
                              </motion.div>
                            </div>

                            {/* Important Notice */}
                            <div className="bg-[#fff4e6] border border-[#f5a83c] p-2">
                              <p className="text-[9px] text-[#333] m-0">
                                <strong className="text-[#f5a83c]">Important:</strong> This link provides direct access to submit your findings. All details must be documented through this portal.
                              </p>
                            </div>

                            {/* Footer */}
                            <div className="bg-[#284952] -mx-4 -mb-4 p-4 text-center mt-6">
                              <p className="text-white/60 text-[8px] mb-1 text-center">Confidential: This communication is for Investigation Officer only.</p>
                              <p className="text-white/80 text-[9px] font-bold mb-2 tracking-wide uppercase text-center">Fruit of Sustainability | CMS</p>
                              <div className="flex justify-center gap-3 text-white/50 text-[7px] underline">
                                <span className="cursor-pointer">Website</span>
                                <span className="cursor-pointer">LinkedIn</span>
                                <span className="cursor-pointer">Facebook</span>
                              </div>
                              <p className="text-white/40 text-[7px] mt-2 text-center">© 2026 Fruit of Sustainability. All rights reserved.</p>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* --- PHONE LAYER --- */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotateY: -45, y: 200 }}
                    animate={stage === 3
                      ? { opacity: 1, scale: 1, rotateY: -15, y: 0, x: 0 }
                      : stage >= 4
                        ? { opacity: 0, scale: 0.8, rotateY: -30, x: -100, filter: "blur(10px)" }
                        : { opacity: 0, scale: 0.5, rotateY: -45, y: 200 }
                    }
                    transition={{ type: "spring", stiffness: 150, damping: 25, mass: 1.1 }}
                    className="relative z-30"
                  >
                    <div className="w-[240px] h-[480px] bg-[#1a1a1a] rounded-[50px] p-[8px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] border border-[#333] relative ring-4 ring-black/20 transform-gpu">
                      <div className="absolute inset-0 rounded-[50px] border-[2px] border-white/10 pointer-events-none" />
                      <div className="w-full h-full bg-black rounded-[42px] overflow-hidden relative">
                        <motion.div initial={{ opacity: 0, filter: "brightness(0)" }} animate={stage >= 3 ? { opacity: 1, filter: "brightness(1)" } : {}} transition={{ duration: 0.6, ease: "circOut" }} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1621360841012-3f687e42822a?q=80&w=1000&auto=format&fit=crop')" }}><div className="absolute inset-0 bg-black/40" /></motion.div>
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50">
                          <motion.div initial={{ width: 90, height: 28, borderRadius: 18 }} animate={stage >= 3 ? { width: 210, height: 70, borderRadius: 35 } : { width: 90, height: 28, borderRadius: 18 }} transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.1 }} className="bg-black shadow-lg overflow-hidden flex items-center justify-center relative">
                            <AnimatePresence>
                              {stage >= 3 && (
                                <motion.div initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ delay: 0.3, duration: 0.4 }} className="flex items-center w-full px-4 gap-3">
                                  <div className="w-9 h-9 rounded-full bg-[#284952] flex items-center justify-center shrink-0 border border-white/10"><ShieldCheck size={16} className="text-[#60BA81]" /></div>
                                  <div className="flex flex-col min-w-0 flex-1"><span className="text-[11px] font-bold text-white leading-tight">FOS Alert</span><span className="text-[9px] text-gray-400">Ticket #FL251141</span></div>
                                  <div className="w-7 h-7 rounded-full bg-[#60BA81] flex items-center justify-center"><ArrowRight size={14} className="text-white" /></div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        </div>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={stage >= 3 ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5, duration: 0.8 }} className="absolute top-28 w-full text-center"><h1 className="text-6xl font-thin text-white tracking-tighter drop-shadow-lg">09:41</h1><p className="text-white/80 text-[12px] font-medium mt-1">Wednesday, December 3</p></motion.div>
                        <div className="absolute bottom-6 left-4 right-4 flex flex-col gap-3">
                          <motion.div initial={{ y: 100, opacity: 0, scale: 0.8 }} animate={stage >= 3 ? { y: 0, opacity: 1, scale: 1 } : {}} transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }} className="bg-white/80 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl border border-white/40">
                            <div className="flex justify-between items-start mb-1.5"><div className="flex items-center gap-1.5"><div className="w-5 h-5 rounded bg-[#284952] flex items-center justify-center"><ShieldCheck size={12} className="text-white" /></div><span className="text-[10px] font-bold uppercase text-gray-600 tracking-wide">FOS APP</span></div><span className="text-[9px] text-gray-500">now</span></div>
                            <p className="text-[12px] font-bold text-[#17161A] leading-tight">Investigation Required</p><p className="text-[11px] text-gray-700 mt-0.5 leading-snug">New complaint assigned: <strong>Forced Labor</strong> at Multan Branch.</p>
                          </motion.div>
                        </div>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/70 rounded-full" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- PHASE 2: PORTAL DASHBOARD --- */}
        {stage >= 5 && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={spring}
            className="w-full h-full flex flex-col items-center justify-center p-2"
          >
            <div className="w-full max-w-5xl bg-[#F5F5F7] rounded-[32px] shadow-2xl overflow-hidden border border-gray-200 flex flex-col h-[520px] relative">

              {/* Header Bar - Matched to Module 1 Portal Style */}
              <div className="bg-white px-8 py-4 flex justify-between items-center border-b border-gray-100 shadow-sm z-10 h-[80px]">
                {/* Left Section (Logo) */}
                <div className="w-1/4 flex justify-start">
                  <div className="w-20 h-12 flex items-center justify-center">
                    <img src="/assets/images/vertical_logo.png" alt="FOS Logo" className="w-full h-full object-contain" />
                  </div>
                </div>

                {/* Center Section (Heading) */}
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <p className="text-[10px] font-black tracking-[0.3em] mb-0.5 leading-none text-[#60BA81]">
                    MULTAN47
                  </p>
                  <h1 className="text-xl font-black tracking-tight leading-tight text-[#17161A]">
                    Grievance Management Portal
                  </h1>
                </div>

                {/* Right Section (Action/Logout) */}
                <div className="w-1/4 flex justify-end items-center gap-4">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                      <Bell size={16} className="text-[#284952]" />
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[8px] text-white font-bold flex items-center justify-center border-2 border-white"
                    >
                      1
                    </motion.div>
                  </div>
                  <button className="px-4 py-1.5 rounded-xl text-white text-[11px] font-bold bg-[#60BA81] shadow-md shadow-[#60BA81]/20">
                    Logout
                  </button>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-5 flex-1 overflow-hidden flex flex-col gap-4">
                <div className="flex gap-4">
                  {/* Status Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                    className="bg-white p-4 rounded-[24px] shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col items-center justify-center min-w-[220px]"
                  >
                    <h3 className="w-full text-[9px] font-bold uppercase tracking-wider mb-2 text-gray-400 text-left px-2">Complaint Status</h3>
                    <DonutChart total={stage >= 6 ? 17 : 16} />
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 text-[8px] font-medium">
                      <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#284952]" /><span className="text-gray-500">Unprocessed</span></div>
                      <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#2d9480]" /><span className="text-gray-500">In Process</span></div>
                      <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#60ba81]" /><span className="text-gray-500">Submitted</span></div>
                    </div>
                  </motion.div>

                  {/* Categories Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                    className="bg-white p-4 rounded-[24px] shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-gray-50 flex-1 flex flex-col"
                  >
                    <h3 className="text-[9px] font-bold uppercase tracking-wider mb-2 text-gray-400">Complaints By Categories</h3>
                    <BarChart />
                  </motion.div>
                </div>

                {/* Table Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                  className="bg-white rounded-[24px] shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-gray-50 flex-1 overflow-hidden flex flex-col"
                >
                  <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center bg-[#FAFAFA]/50">
                    <div className="flex items-center gap-2 text-[9px] text-gray-500 font-bold">
                      <span>Show entries</span>
                      <div className="px-2 py-0.5 bg-white border border-gray-200 rounded text-gray-700">100</div>
                    </div>
                    <div className="flex items-center gap-2 text-[9px]">
                      <span className="text-gray-500 font-bold uppercase tracking-tighter">Search:</span>
                      <div className="h-6 w-32 bg-white border border-gray-200 rounded" />
                    </div>
                  </div>

                  <div className="flex-1 overflow-auto">
                    <table className="w-full text-[10px]">
                      <thead className="bg-[#FAFAFA] sticky top-0">
                        <tr className="border-b border-gray-100">
                          <th className="px-3 py-2 text-left font-bold text-gray-400 uppercase tracking-wider text-[8px]">Sr.</th>
                          <th className="px-3 py-2 text-left font-bold text-gray-400 uppercase tracking-wider text-[8px]">Ticket Number</th>
                          <th className="px-3 py-2 text-left font-bold text-gray-400 uppercase tracking-wider text-[8px]">NAME</th>
                          <th className="px-3 py-2 text-left font-bold text-gray-400 uppercase tracking-wider text-[8px]">STATUS</th>
                          <th className="px-3 py-2 text-left font-bold text-gray-400 uppercase tracking-wider text-[8px]">COMPLAINT DATE</th>
                          <th className="px-3 py-2 text-left font-bold text-gray-400 uppercase tracking-wider text-[8px]">Mobile Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        <AnimatePresence>
                          {stage >= 6 && (
                            <motion.tr
                              layout
                              initial={{ opacity: 0, backgroundColor: "rgba(96, 186, 129, 0.1)" }}
                              animate={{ opacity: 1, backgroundColor: "#ffffff" }}
                              transition={{ duration: 1 }}
                              className="border-b border-gray-100 group hover:bg-gray-50"
                            >
                              <td className="px-3 py-3 text-gray-500 font-medium font-mono">457</td>
                              <td className="px-3 py-3 font-bold text-[#284952] font-mono">FL251141-475002</td>
                              <td className="px-3 py-3 text-[#17161A] font-semibold">Sana</td>
                              <td className="px-3 py-3">
                                <span className="px-2 py-1 rounded-full text-[8px] font-black uppercase text-[#284952] bg-[#284952]/10 border border-[#284952]/10">Unprocessed</span>
                              </td>
                              <td className="px-3 py-3 text-gray-500 tabular-nums">Tue, 25 Nov 2025 12:36 PM</td>
                              <td className="px-3 py-3 text-gray-500 tabular-nums">923164015542</td>
                            </motion.tr>
                          )}
                        </AnimatePresence>
                        <tr className="border-b border-gray-100 opacity-60">
                          <td className="px-3 py-3 text-gray-500 font-mono">456</td>
                          <td className="px-3 py-3 font-bold text-[#284952] font-mono">FL211140-475002</td>
                          <td className="px-3 py-3 text-[#17161A] font-semibold">Sana</td>
                          <td className="px-3 py-3">
                            <span className="px-2 py-1 rounded-full text-[8px] font-black uppercase text-[#F5A83C] bg-[#F5A83C]/10 border border-[#F5A83C]/10">Bounced</span>
                          </td>
                          <td className="px-3 py-3 text-gray-500 tabular-nums">Fri, 21 Nov 2025 11:44 AM</td>
                          <td className="px-3 py-3 text-gray-500 tabular-nums">923164015542</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </div>

              {/* Cursor Animation */}
              {stage >= 7 && (
                <motion.div
                  initial={{ x: 800, y: 500, opacity: 0 }}
                  animate={{ x: 180, y: 340, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="absolute top-0 left-0 z-50 pointer-events-none"
                >
                  <MousePointer2 size={24} fill="#1d1d1f" stroke="white" strokeWidth={1.5} />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  )
}