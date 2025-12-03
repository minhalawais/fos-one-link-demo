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

export const SceneNotification = ({ isActive }: { isActive: boolean }) => {
  const [stage, setStage] = useState(0)

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
        setTimeout(() => setStage(1), 1000), // Officer moves Left (~83s)
        setTimeout(() => setStage(2), 2500), // Beam starts (~84.5s)
        setTimeout(() => setStage(3), 5200), // Phone Enters (~87.2s)
        setTimeout(() => setStage(4), 6500), // Email Enters (~88.5s)
        setTimeout(() => setStage(5), 7520), // Portal Enters (~89.52s)
        setTimeout(() => setStage(6), 9500), // Row Appears (~91.5s)
        setTimeout(() => setStage(7), 11000), // Cursor Interaction (~93s)
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
                        ? { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }
                        : { opacity: 1, x: 300, scale: 1.3, filter: "blur(0px)" }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        mass: 1.2
                      }}
                      className="relative h-[90%] w-full flex justify-center items-end"
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
                        <span className="text-[10px] font-bold text-[#284952] tracking-wide">IO ACTIVE</span>
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
                    <div className="w-[340px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden ring-1 ring-black/5 font-sans transform-gpu">
                      <div className="bg-[#284952] px-5 py-4 flex items-center justify-between">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-4 h-4 bg-white/20 rounded-sm backdrop-blur-sm" />
                            <span className="text-white font-bold text-xs tracking-wide">FRUIT OF SUSTAINABILITY</span>
                          </div>
                          <span className="text-white/80 text-[10px]">Complaint Management System</span>
                        </div>
                      </div>
                      <div className="p-6 bg-white">
                        <motion.div initial={{ y: 20, opacity: 0 }} animate={stage >= 4 ? { y: 0, opacity: 1 } : {}} transition={{ delay: 0.2 }}>
                          <h2 className="text-[14px] font-bold text-[#284952] mb-4 leading-tight">New Complaint Investigation Request</h2>
                          <div className="space-y-3 mb-5">
                            {["Ticket #: FL251141", "Category: Forced Labor", "Status: Pending Investigation"].map((text, i) => (
                              <motion.div key={i} initial={{ x: -10, opacity: 0 }} animate={stage >= 4 ? { x: 0, opacity: 1 } : {}} transition={{ delay: 0.3 + (i * 0.1) }} className="flex gap-2 text-[10px] border-b border-gray-100 pb-2">
                                <span className="font-bold text-gray-600 w-20">{text.split(":")[0]}:</span>
                                <span className={text.includes("Pending") ? "text-[#F5A83C] font-bold" : "text-gray-800"}>{text.split(":")[1]}</span>
                              </motion.div>
                            ))}
                          </div>
                          <motion.button whileHover={{ scale: 1.03, backgroundColor: "#4ea36e" }} whileTap={{ scale: 0.98 }} className="w-full bg-[#60BA81] text-white text-[11px] font-bold py-3 rounded-lg shadow-lg shadow-[#60BA81]/20 transition-all">Submit RCA & CAPA</motion.button>
                        </motion.div>
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
            <div className="w-full max-w-5xl bg-[#eeeeee] rounded-2xl shadow-2xl overflow-hidden border border-gray-300 flex flex-col h-[520px] relative">

              {/* Header Bar */}
              <div className="bg-white px-6 py-3 flex justify-between items-center border-b border-gray-200 shadow-sm z-10">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-[#284952] rounded-full flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-[#60BA81] rounded-full" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#284952]">FRUIT OF</div>
                      <div className="text-xs font-semibold text-[#60BA81]">SUSTAINABILITY</div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-[#284952] font-medium">MULTAN47</div>
                  <div className="text-lg font-bold text-[#284952]">Grievance Management Portal</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 bg-[#284952] rounded-lg flex items-center justify-center">
                      <Bell size={18} className="text-white" />
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[8px] text-white font-bold flex items-center justify-center"
                    >
                      1
                    </motion.div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Logout</span>
                    <LogOut size={16} />
                  </div>
                </div>
              </div>

              {/* Dashboard */}
              <div className="p-5 flex-1 overflow-hidden flex flex-col gap-4">
                <div className="flex gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center min-w-[220px]"
                  >
                    <DonutChart total={stage >= 6 ? 17 : 16} />
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 text-[8px]">
                      <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#284952]" /><span className="text-gray-600">Unprocessed</span></div>
                      <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#2d9480]" /><span className="text-gray-600">In Process</span></div>
                      <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#60ba81]" /><span className="text-gray-600">Submitted</span></div>
                      <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#f5a83c]" /><span className="text-gray-600">Bounced</span></div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex-1"
                  >
                    <BarChart />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 overflow-hidden flex flex-col"
                >
                  <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-[10px] text-gray-600">
                      <span>Show entries</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="text-gray-600">Search:</span>
                      <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[10px] w-32" />
                    </div>
                  </div>

                  <div className="flex-1 overflow-auto">
                    <table className="w-full text-[10px]">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr className="border-b border-gray-200">
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">Sr.</th>
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">Ticket Number</th>
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">NAME</th>
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">STATUS</th>
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">COMPLAINT DATE</th>
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">Mobile Number</th>
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">Complaint Categories</th>
                          <th className="px-3 py-2 text-left font-semibold text-gray-700">Additional Comments</th>
                        </tr>
                      </thead>
                      <tbody>
                        <AnimatePresence>
                          {stage >= 6 && (
                            <motion.tr
                              layout
                              initial={{ opacity: 0, backgroundColor: "#e8f5e9" }}
                              animate={{ opacity: 1, backgroundColor: "#ffffff" }}
                              transition={{ duration: 1 }}
                              className="border-b border-gray-100"
                            >
                              <td className="px-3 py-3 text-gray-700 font-medium">457</td>
                              <td className="px-3 py-3 font-semibold text-[#284952]">FL251141-475002</td>
                              <td className="px-3 py-3 text-gray-800">Sana</td>
                              <td className="px-3 py-3"><span className="px-3 py-1.5 rounded text-[9px] font-bold text-white bg-[#206e71]">Unprocessed</span></td>
                              <td className="px-3 py-3 text-[#284952]">Tue, 25 Nov 2025 12:36 PM</td>
                              <td className="px-3 py-3 text-gray-700">923164015542</td>
                              <td className="px-3 py-3 text-[#284952] font-medium">Forced Labor</td>
                              <td className="px-3 py-3 text-gray-500">-</td>
                            </motion.tr>
                          )}
                        </AnimatePresence>
                        <tr className="border-b border-gray-100 opacity-60">
                          <td className="px-3 py-3 text-gray-700">456</td>
                          <td className="px-3 py-3 font-semibold text-[#284952]">FL211140-475002</td>
                          <td className="px-3 py-3 text-gray-800">Sana</td>
                          <td className="px-3 py-3"><span className="px-3 py-1.5 rounded text-[9px] font-bold text-white bg-[#f5a83c]">Bounced</span></td>
                          <td className="px-3 py-3 text-[#284952]">Fri, 21 Nov 2025 11:44 AM</td>
                          <td className="px-3 py-3 text-gray-700">923164015542</td>
                          <td className="px-3 py-3 text-[#284952] font-medium">Forced Labor</td>
                          <td className="px-3 py-3 text-gray-500">N/A</td>
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
                  <MousePointer2 size={28} fill="#1d1d1f" stroke="white" strokeWidth={1.5} />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  )
}