"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  X,
  ClipboardCheck,
  Bell,
  LogOut,
  AlertCircle,
  List,
  Search,
  MousePointer2,
  Calendar,
  FileText,
  CheckCircle2,
  Printer,
  ListFilter
} from "lucide-react"

// Brand Colors
const COLORS = {
  teal: "#0f9690",
  deepTeal: "#284952",
  freshGreen: "#60BA81",
  green: "#60BA81",
  charcoal: "#17161A",
  warmOrange: "#F5A83C",
  orange: "#F5A83C",
  white: "#FFFFFF",
  lightGray: "#F5F5F7",
  bg: "#F5F5F7",
  border: "#DEE2E6",
  mediumGray: "#767676",
  softGreen: "rgba(96, 186, 129, 0.42)",
}

// Apple-style easing
const EASE = [0.32, 0.72, 0, 1]

const pageTransitionVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    filter: "blur(4px)",
    transition: {
      duration: 0.5,
      ease: EASE,
    },
  },
}

// Cursor spring animation config
const cursorSpring = { type: "spring", stiffness: 60, damping: 20, mass: 0.8 }

// --- CHART COMPONENTS ---
const DonutChart = () => (
  <svg width="180" height="180" viewBox="0 0 200 200" className="mx-auto">
    <circle cx="100" cy="100" r="70" fill="none" stroke={COLORS.deepTeal} strokeWidth="22" opacity="0.9" />
    <circle
      cx="100"
      cy="100"
      r="70"
      fill="none"
      stroke={COLORS.freshGreen}
      strokeWidth="22"
      strokeDasharray="175 440"
      strokeDashoffset="0"
      transform="rotate(-90 100 100)"
      opacity="0.85"
    />
    <circle
      cx="100"
      cy="100"
      r="70"
      fill="none"
      stroke={COLORS.warmOrange}
      strokeWidth="22"
      strokeDasharray="44 440"
      strokeDashoffset="-175"
      transform="rotate(-90 100 100)"
      opacity="0.9"
    />
    <text x="100" y="95" textAnchor="middle" className="fill-[#17161A] font-bold">
      <tspan x="100" dy="0" fontSize="16">
        Total
      </tspan>
      <tspan x="100" dy="22" fontSize="24">
        (117)
      </tspan>
    </text>
  </svg>
)

const StackedBarChart = () => {
  const categories = [
    { heights: [4, 3, 1] },
    { heights: [4, 3, 1] },
    { heights: [4, 3, 1] },
    { heights: [16, 5, 1] },
    { heights: [3, 2, 1] },
    { heights: [2, 2, 1] },
    { heights: [4, 2, 1] },
    { heights: [26, 6, 2] },
    { heights: [3, 2, 1] },
    { heights: [3, 2, 1] },
    { heights: [2, 1, 0] },
    { heights: [4, 2, 1] },
  ]

  return (
    <svg width="100%" height="180" viewBox="0 0 700 180" className="w-full">
      {[0, 10, 20, 30].map((val) => (
        <g key={val}>
          <text x="30" y={160 - val * 4.5} textAnchor="end" className="text-[9px] fill-gray-400">
            {val}
          </text>
          <line x1="40" y1={160 - val * 4.5} x2="650" y2={160 - val * 4.5} stroke="#f0f0f0" strokeWidth="1" />
        </g>
      ))}
      {categories.map((bar, i) => {
        const x = 65 + i * 50
        let yOffset = 160
        return (
          <g key={i}>
            {bar.heights.map((h, j) => {
              const colors = [COLORS.deepTeal, COLORS.freshGreen, COLORS.warmOrange]
              const height = h * 4.5
              yOffset -= height
              return (
                <rect key={j} x={x - 12} y={yOffset} width="24" height={height} fill={colors[j]} opacity="0.9" rx="2" />
              )
            })}
          </g>
        )
      })}
      <line x1="40" y1="160" x2="650" y2="160" stroke={COLORS.border} strokeWidth="2" />
    </svg>
  )
}

const IOS_EASE = [0.32, 0.72, 0, 1]

const IntroScreen = ({ stage }: { stage: number }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F5F5F7] overflow-hidden font-sans">
      
      {/* Dynamic Background Gradient (Consistent with other modules) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vh] h-[150vh] min-w-[800px] bg-gradient-to-tr from-[#60BA81]/10 via-[#284952]/5 to-transparent rounded-full blur-[100px]"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Grid Pattern Overlay for "Structure" feel */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ backgroundImage: 'radial-gradient(#284952 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
      />

      <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl px-6">
        
        {/* Animated Visual: The Investigation Process */}
        <div className="relative w-64 h-40 md:w-80 md:h-48 flex items-center justify-center mb-8">
            
            {/* The Case File */}
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: IOS_EASE }}
                className="w-24 h-32 md:w-28 md:h-36 bg-white rounded-xl shadow-xl border border-[#DEE2E6] flex flex-col p-4 gap-3 relative z-0"
            >
                {/* File Header */}
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center">
                        <ListFilter size={14} className="text-[#284952]" />
                    </div>
                    <div className="w-8 h-2 bg-[#F5F5F7] rounded-full" />
                </div>
                {/* Skeleton Text lines */}
                <div className="space-y-2">
                    <div className="w-full h-1.5 bg-[#F5F5F7] rounded-full" />
                    <div className="w-2/3 h-1.5 bg-[#F5F5F7] rounded-full" />
                    <div className="w-3/4 h-1.5 bg-[#F5F5F7] rounded-full" />
                </div>
                <div className="mt-auto w-full h-1.5 bg-[#F5F5F7] rounded-full" />
                
                {/* Result Stamp (Appears after scan) */}
                <motion.div 
                    initial={{ opacity: 0, scale: 1.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4, type: "spring" }}
                    className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-[1px] rounded-xl"
                >
                    <CheckCircle2 size={40} className="text-[#60BA81]" />
                </motion.div>
            </motion.div>

            {/* The Scanner / Magnifying Glass */}
            <motion.div
                initial={{ x: -60, opacity: 0, rotate: -10 }}
                animate={{ x: 60, opacity: 1, rotate: 0 }}
                transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
                className="absolute z-20"
            >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-[6px] border-[#284952] bg-white/20 backdrop-blur-md shadow-2xl flex items-center justify-center">
                    <Search size={32} className="text-[#284952] md:w-10 md:h-10" strokeWidth={3} />
                </div>
                {/* Handle */}
                <div className="absolute top-[85%] left-[85%] w-4 h-12 bg-[#284952] rounded-full -rotate-45 origin-top-left -z-10 shadow-lg" />
            </motion.div>
        </div>

        {/* Typography */}
        <div className="text-center space-y-4">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: IOS_EASE }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[#1d1d1f]"
          >
            Investigation Framework
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: IOS_EASE }}
            className="text-base md:text-xl text-[#767676] max-w-xl mx-auto leading-relaxed"
          >
            Systematic resolution workflows ensuring compliance, verified satisfaction, and complete audit trails.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: IOS_EASE }}
            className="flex items-center justify-center gap-3 text-sm md:text-base font-medium text-[#767676] pt-4"
          >
            <span>Structured</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#60BA81]" />
            <span>Transparent</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#60BA81]" />
            <span>Trackable</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// --- LOGIN SCREEN ---
const LoginScreen = ({ stage }: { stage: number }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (stage >= 3) {
      const user = "multan47"
      let i = 0
      const typeUser = setInterval(() => {
        if (i < user.length) {
          setUsername(user.slice(0, i + 1))
          i++
        } else clearInterval(typeUser)
      }, 60)
      return () => clearInterval(typeUser)
    }
  }, [stage])

  useEffect(() => {
    if (stage >= 4) {
      const pass = "••••••••"
      let i = 0
      const typePass = setInterval(() => {
        if (i < pass.length) {
          setPassword(pass.slice(0, i + 1))
          i++
        } else clearInterval(typePass)
      }, 50)
      return () => clearInterval(typePass)
    }
  }, [stage])

  const isButtonHovered = stage >= 5

  return (
    <motion.div
      key="login"
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute inset-0 flex items-center justify-center p-8"
      style={{ backgroundColor: COLORS.lightGray }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        className="w-[360px] bg-white rounded-[32px] overflow-hidden"
        style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.1)" }}
      >
        {/* Logo Section */}
        <div className="px-8 pt-8 pb-6 bg-gradient-to-b from-[#FAFAFA] to-white">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="text-center"
          >
 <div className="w-20 h-20 mx-auto mb-4 relative rounded-full bg-white flex items-center justify-center">
  {/* Fruit of Sustainability Logo */}
  <img 
    src="/assets/FOS-01.png" 
    alt="Fruit of Sustainability" 
    className="w-24 h-24 object-contain"
    onError={(e) => {
      // Fallback if logo doesn't load
      const target = e.target as HTMLImageElement;
      target.style.display = 'none';
      // Show text fallback
      const fallback = document.createElement('div');
      fallback.className = 'text-white font-bold text-xl';
      fallback.textContent = 'FOS';
      target.parentNode?.appendChild(fallback);
    }}
  />
</div>
            <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ color: COLORS.charcoal }}>
              Login
            </h1>
          </motion.div>
        </div>

        {/* Form Section */}
        <div className="px-8 py-6 space-y-4">
          {/* Username */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <label className="block text-xs font-semibold mb-2 tracking-tight" style={{ color: COLORS.deepTeal }}>
              Username
            </label>
            <div className="relative">
              <User
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: COLORS.mediumGray }}
              />
              <input
                type="text"
                value={username}
                readOnly
                className="w-full h-10 pl-10 pr-3 text-sm font-medium rounded-2xl border-2 transition-all"
                style={{
                  backgroundColor: COLORS.lightGray,
                  borderColor: username ? COLORS.freshGreen : COLORS.border,
                  color: COLORS.charcoal,
                }}
              />
              {stage >= 3 && stage < 4 && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-[#284952]"
                />
              )}
            </div>
          </motion.div>

          {/* Password */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <label className="block text-xs font-semibold mb-2 tracking-tight" style={{ color: COLORS.deepTeal }}>
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: COLORS.mediumGray }}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                readOnly
                className="w-full h-10 pl-10 pr-10 text-sm font-medium rounded-2xl border-2 transition-all tracking-widest"
                style={{
                  backgroundColor: COLORS.lightGray,
                  borderColor: password ? COLORS.freshGreen : COLORS.border,
                  color: COLORS.charcoal,
                }}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: COLORS.mediumGray }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </motion.div>

          {/* Remember Me */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="remember"
              className="w-3.5 h-3.5 rounded"
              style={{ accentColor: COLORS.deepTeal }}
            />
            <label htmlFor="remember" className="text-xs select-none" style={{ color: COLORS.mediumGray }}>
              Remember Me
            </label>
          </div>

          {/* Login Button */}
          <motion.button
            animate={{ scale: isButtonHovered ? 0.97 : 1, backgroundColor: isButtonHovered ? "#1E3A42" : "#007AFF" }}
            transition={{ duration: 0.2 }}
            className="w-full h-10 rounded-2xl text-white font-semibold text-sm flex items-center justify-center gap-2"
            style={{ backgroundColor: "#007AFF", boxShadow: "0 8px 20px rgba(0, 122, 255, 0.3)" }}
          >
            Login
            {isButtonHovered && (
              <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <ArrowRight size={16} />
              </motion.div>
            )}
          </motion.button>
        </div>

        {/* Footer */}
        <div
          className="px-8 py-3 text-center text-[10px]"
          style={{ color: COLORS.mediumGray, backgroundColor: "#FAFAFA" }}
        >
          Copyright © 2023 — Fruit of Sustainability
        </div>
      </motion.div>

      {/* Animated Cursor */}
      <motion.div
        initial={{ x: 500, y: 200, opacity: 0 }}
        animate={{
          x: stage >= 5 ? 180 : stage >= 4 ? 200 : stage >= 3 ? 200 : 500,
          y: stage >= 5 ? 380 : stage >= 4 ? 340 : stage >= 3 ? 280 : 200,
          opacity: stage >= 3 ? 1 : 0,
        }}
        transition={{ duration: 0.8, ease: EASE }}
        className="absolute pointer-events-none z-50"
      >
        <MousePointer2 size={28} className="fill-black stroke-white stroke-[1.5]" />
      </motion.div>
    </motion.div>
  )
}


// --- MAIN COMPONENT ---
const PortalDashboard = ({ stage }: { stage: number }) => {
  const selectedRow = stage >= 8 ? 0 : null
  
  // Dialog Logic: Show between stage 10 and 12
  const showStatusConfirm = stage >= 10 && stage < 12
  
  // Status Logic: If stage passed 11 (clicked submit), status is processed
  const isProcessed = stage >= 12

  const complaints = [
    {
      sr: 462,
      ticket: "XX261114-11XXXX", // Updated to match Dialog Image
      name: "Sana",
      initialStatus: "Unprocessed",
      date: "Wed, 26 Nov 2025 11:13 AM", // Updated to match Dialog Image
      mobile: "923214864040",
      category: "Workplace Health",
    },
    {
      sr: 461,
      ticket: "XX241120-47XXXX",
      name: "Ahmad",
      initialStatus: "Completed",
      date: "Mon, 24 Nov 2025 11:47 AM",
      mobile: "03214864040",
      category: "Wages",
    },
    {
      sr: 460,
      ticket: "XX241119-38XXXX",
      name: "Fatima",
      initialStatus: "In Process",
      date: "Sun, 23 Nov 2025 09:30 AM",
      mobile: "03001234567",
      category: "Forced Labor",
    },
  ]

  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: COLORS.lightGray }}
    >
      <div className="scale-[0.58] origin-top-left p-6 w-[172%] h-[172%]">
        
        {/* --- HEADER (Original Styling) --- */}
        <div className="bg-white px-8 h-[70px] flex items-center justify-between shadow-sm relative z-20 rounded-xl mb-6">
        <div className="flex items-center gap-3">
  <div className="flex flex-col items-center justify-center">
    <img 
      src="assets/vertical_logo.png" 
      alt="Fruit of Sustainability" 
      className="w-32 h-32 object-contain"
      onError={(e) => {
        // Fallback if logo doesn't load
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        // Show icon fallback
        const fallback = document.createElement('div');
        fallback.innerHTML = `
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 7L12 12L20 7L12 2Z" stroke="#F5A83C" fill="#60BA81" stroke-width="2"/>
            <path d="M4 7V17L12 22L20 17V7" stroke="#F5A83C" fill="#284952" stroke-width="2"/>
          </svg>
        `;
        target.parentNode?.appendChild(fallback);
      }}
    />
  </div>
</div>
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] mb-0.5" style={{ color: COLORS.green }}>
              MULTAN47
            </div>
            <div className="text-xl font-bold" style={{ color: COLORS.deepTeal }}>
              Grievance Management Portal
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded text-white flex items-center justify-center shadow transition cursor-pointer"
              style={{ backgroundColor: COLORS.green }}
            >
              <Bell size={20} fill="currentColor" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded text-xs font-semibold text-gray-600 hover:bg-gray-50 shadow-sm transition">
              Logout <LogOut size={14} />
            </button>
          </div>
        </div>

        {/* --- CHARTS ROW (Restored) --- */}
        <div className="grid grid-cols-5 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
            className="col-span-2 bg-white rounded-2xl p-5"
            style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: COLORS.mediumGray }}>
              Complaint Status
            </h3>
            <DonutChart />
            <div className="flex justify-center gap-4 mt-4 text-[10px]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.deepTeal }} />
                <span style={{ color: COLORS.mediumGray }}>Unprocessed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.freshGreen }} />
                <span style={{ color: COLORS.mediumGray }}>In Process</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.warmOrange }} />
                <span style={{ color: COLORS.mediumGray }}>Bounced</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
            className="col-span-3 bg-white rounded-2xl p-5"
            style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}
          >
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: COLORS.mediumGray }}>
              Complaints By Categories
            </h3>
            <StackedBarChart />
          </motion.div>
        </div>

        {/* --- COMPLAINTS TABLE (Original Styling + New Status Logic) --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease: EASE }}
          className="bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}
        >
          <div
            className="px-6 py-4 flex justify-between items-center"
            style={{ borderBottom: `1px solid ${COLORS.border}` }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium" style={{ color: COLORS.mediumGray }}>Show</span>
              <select className="px-3 py-1.5 text-sm rounded-lg border" style={{ borderColor: COLORS.border }}>
                <option>100</option>
              </select>
              <span className="text-xs font-medium" style={{ color: COLORS.mediumGray }}>entries</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium" style={{ color: COLORS.mediumGray }}>Search:</span>
              <div className="relative">
                <input
                  type="text"
                  className="px-3 py-1.5 text-sm rounded-lg border pl-8"
                  style={{ borderColor: COLORS.border }}
                />
                <Search size={12} className="absolute left-2.5 top-2.5 text-gray-400" />
              </div>
            </div>
          </div>

          <div
            className="grid grid-cols-7 gap-4 px-6 py-3 text-[10px] font-bold uppercase tracking-wider"
            style={{ color: COLORS.mediumGray, borderBottom: `1px solid ${COLORS.border}`, backgroundColor: "#FAFAFA" }}
          >
            <div>Sr.</div>
            <div>Ticket Number</div>
            <div>NAME</div>
            <div>STATUS</div>
            <div>COMPLAINT DATE</div>
            <div>Mobile Number</div>
            <div>Category</div>
          </div>

          <div>
            {complaints.map((complaint, i) => {
              // Calculate status dynamically
              const statusText = (i === 0 && isProcessed) ? "In Process" : complaint.initialStatus;
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease: EASE }}
                  className="grid grid-cols-7 gap-4 px-6 py-4 items-center cursor-pointer transition-all duration-300"
                  style={{
                    borderBottom: i < complaints.length - 1 ? `1px solid ${COLORS.border}` : "none",
                    borderLeft: selectedRow === i ? `4px solid ${COLORS.freshGreen}` : "4px solid transparent",
                    backgroundColor: selectedRow === i ? COLORS.softGreen : "transparent",
                  }}
                >
                  <div className="text-xs font-medium" style={{ color: COLORS.mediumGray }}>
                    {complaint.sr}
                  </div>
                  <div className="text-xs font-bold font-mono" style={{ color: COLORS.deepTeal }}>
                    {complaint.ticket}
                  </div>
                  <div className="text-xs font-semibold" style={{ color: COLORS.charcoal }}>
                    {complaint.name}
                  </div>
                  <div>
                    {/* --- ZOOM IN ANIMATION ON STATUS CHANGE --- */}
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={statusText} // Key change triggers animation
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ 
                          scale: isProcessed && i === 0 ? [1, 1.3, 1] : 1, // Zoom Effect
                          opacity: 1 
                        }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 400, 
                          damping: 15 
                        }}
                        className="px-3 py-1.5 rounded-full text-[10px] font-bold inline-block cursor-pointer"
                        style={{
                          backgroundColor:
                            statusText === "Unprocessed"
                              ? "rgba(40, 73, 82, 0.15)"
                              : statusText === "Bounced"
                              ? "rgba(245, 168, 60, 0.2)"
                              : "rgba(96, 186, 129, 0.2)",
                          color:
                            statusText === "Unprocessed"
                              ? COLORS.deepTeal
                              : statusText === "Bounced"
                              ? COLORS.warmOrange
                              : COLORS.freshGreen,
                        }}
                      >
                        {statusText}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <div className="text-xs" style={{ color: COLORS.mediumGray }}>
                    {complaint.date}
                  </div>
                  <div className="text-xs" style={{ color: COLORS.mediumGray }}>
                    {complaint.mobile}
                  </div>
                  <div className="text-xs" style={{ color: COLORS.mediumGray }}>
                    {complaint.category}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* --- CONFIRMATION MODAL (EXACT REPLICA) --- */}
      <AnimatePresence>
        {showStatusConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
              className="bg-white w-[950px] shadow-2xl rounded-sm overflow-hidden flex flex-col font-sans"
              style={{ boxShadow: "0 15px 50px rgba(0,0,0,0.3)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300 bg-white">
                <div className="flex items-center text-gray-700 text-[16px] font-normal">
                  <span>XX261114-11XXXX</span>
                  <span className="mx-2 text-gray-400">|</span>
                  <span>Wed, 26 Nov 2025 11:13 AM</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-[16px] text-gray-700 font-normal uppercase">
                        CHAKLALA SCHEME-III <span className="mx-1 text-gray-400">|</span> CHAKLALA SCHEME-III
                    </span>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-10 bg-white flex items-center">
                 <p className="text-[16px] text-gray-700 font-normal">
                    Are you sure, you want to process this complaint?
                 </p>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-white border-t border-gray-300 flex justify-end items-center gap-3">
                 <button className="px-5 py-2 rounded bg-[#6c757d] hover:bg-[#5a6268] text-white text-[15px] font-medium transition-colors shadow-sm">
                    Close
                 </button>
                 <motion.button 
                    whileTap={{ scale: 0.98 }}
                    // Blue button exactly like screenshot
                    className="px-5 py-2 rounded bg-[#0d6efd] hover:bg-[#0b5ed7] text-white text-[15px] font-medium transition-colors shadow-sm"
                 >
                    Submit Changes
                 </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- ANIMATED CURSOR --- */}
      <motion.div
        initial={{ x: "120%", y: "120%", opacity: 0 }}
        animate={{
          x: stage >= 11 ? "75%" : stage >= 10 ? "72%" : stage >= 9 ? "32%" : stage >= 8 ? "20%" : "120%",
          y: stage >= 11 ? "62%" : stage >= 10 ? "62%" : stage >= 9 ? "58%" : stage >= 8 ? "52%" : "120%",
          opacity: stage >= 8 ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="absolute pointer-events-none z-[60]"
      >
        <MousePointer2 size={28} className="fill-black stroke-white stroke-[1.5]" />
        
        {/* Click Effect on Submit Button */}
        <AnimatePresence>
          {(stage === 11) && (
            <motion.div
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -top-4 -left-4 w-16 h-16 bg-blue-500 rounded-full opacity-50"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

const TimelineFormScreen = ({ stage }: { stage: number }) => {
  const [statusText, setStatusText] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  const statusFullText = `Case activated by Investigation Officer (IO-MULTAN47)

✓ Complaint status changed to "In Process"
✓ System-based timeline tracking initiated
✓ Compliance monitoring clock started
✓ All workflow triggers activated

Investigation is now formally underway. The IO will proceed with evidence collection and root cause analysis.`

  // Status typing effect
  useEffect(() => {
    if (stage >= 14 && statusText.length < statusFullText.length) {
      const interval = setInterval(() => {
        setStatusText((prev) => {
          if (prev.length < statusFullText.length) {
            return statusFullText.slice(0, prev.length + 3)
          }
          return prev
        })
      }, 25)
      return () => clearInterval(interval)
    }
  }, [stage, statusText.length])

  // --- ANIMATION LOGIC: ZOOM & PAN ---
  const getTransform = () => {
    // Stage 14: Zoom in and focus on the TOP (Complaint Received)
    if (stage === 14) {
      return { scale: 1.25, x: 0, y: 100 } 
    }
    // Stage 15+: Stay zoomed, but PAN DOWN to the BOTTOM (Status Changed)
    if (stage >= 15) {
        return { scale: 1.25, x: 0, y: -180 }
    }
    // Default: Full view
    return { scale: 1, x: 0, y: 0 }
  }

  const transform = getTransform()

  return (
    <motion.div
      key="timeline-form"
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#F5F5F7] to-[#E8E8EA] flex items-center justify-center font-sans relative"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${COLORS.deepTeal} 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Main Animated Container */}
      <motion.div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
        animate={{
          scale: transform.scale,
          x: transform.x,
          y: transform.y,
        }}
        // Apple-like smooth spring animation for panning
        transition={{ type: "spring", stiffness: 50, damping: 20, mass: 1.2 }}
      >
        <div className="w-[95%] h-[95%] max-w-[950px] max-h-[700px]">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full bg-[#F8F8F8] rounded-sm shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col border border-white/60"
          >
            {/* --- HEADER (Replica of Image) --- */}
            <div
              className="px-6 py-4 flex items-center justify-between bg-white z-20 relative shadow-sm"
              style={{ borderBottom: `1px solid ${COLORS.border}` }}
            >
              {/* Left Side: Ticket & Date */}
              <div className="flex items-center text-[15px] text-[#374151]">
                <span className="font-normal">
                  XX211117-11XXXX
                </span>
                <span className="mx-2 text-gray-300 font-light">|</span>
                <span className="font-normal">Fri, 21 Nov 2025 05:31 PM</span>
              </div>

              {/* Right Side: Location & Close */}
              <div className="flex items-center gap-4">
                 <span className="text-[15px] text-[#374151] font-normal uppercase">
                    PWD <span className="mx-1 text-gray-300">|</span> PWD
                 </span>
                 <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={20} strokeWidth={2.5} />
                 </button>
              </div>
            </div>

            {/* --- TIMELINE CONTENT AREA --- */}
            <div className="relative flex-1 p-8 overflow-hidden">
              
              {/* Central Timeline Line (Longer to accommodate scroll) */}
              <div
                className="absolute left-1/2 top-0 bottom-0 w-0 -translate-x-1/2 border-l-2 border-dashed opacity-30"
                style={{ borderColor: COLORS.deepTeal }}
              />

              {/* Animated Progress Line */}
              <motion.div
                className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#0f9690] to-[#60BA81]"
                initial={{ height: "0%" }}
                animate={{ height: stage >= 14 ? "85%" : "0%" }}
                transition={{ duration: 2.5, ease: "easeOut" }}
              />

              {/* Grid Layout - Staggered */}
              <div className="relative grid grid-cols-[1fr_50px_1fr] gap-8 h-full">
                
                {/* === LEFT COLUMN (Item 1) === */}
                <div className="flex flex-col justify-start">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {/* Teal Card */}
                    <div
                      className="rounded-xl overflow-hidden shadow-xl text-white font-sans text-[11px] leading-relaxed relative"
                      style={{
                        backgroundColor: COLORS.teal,
                        boxShadow: "0 10px 30px rgba(30, 126, 120, 0.25)",
                      }}
                    >
                       <div className="p-4 space-y-3">
                        {/* Card Header Row */}
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-[13px] uppercase tracking-wide">
                              HANZALA SIDDIQUE
                            </h3>
                            <div className="font-bold text-[11px] opacity-90 uppercase mt-0.5">
                              KITCHEN ASSISTANT
                            </div>
                            <div className="mt-2 inline-block bg-[#3AA888] text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-sm">
                              Wages & Benefits
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className="font-medium text-[11px]">
                              In Process
                            </span>
                            <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
                              <List size={16} strokeWidth={3} />
                            </div>
                          </div>
                        </div>

                        {/* Card Body Content */}
                        <div className="space-y-2 mt-2">
                          <div className="font-bold text-[11px]">
                            Additional Comments:
                          </div>
                          <div className="font-bold">Branch: Mardan</div>
                          <div className="font-bold">Employee ID: 2302285</div>

                          <p className="opacity-95 text-[10px] leading-relaxed mt-2 text-justify">
                            I would like to raise a concern regarding{" "}
                            <strong className="text-white font-extrabold">
                              my leaves
                            </strong>
                            , have not been updated in Flow HCM. I joined
                            Cheezious on{" "}
                            <strong className="text-white font-extrabold">
                              18 October 2023
                            </strong>{" "}
                            and my{" "}
                            <strong className="text-white font-extrabold">
                              third year of service has started
                            </strong>
                            , but the leaves for this year{" "}
                            <strong className="text-white font-extrabold">
                              have still not been reflected
                            </strong>{" "}
                            in the system.
                            <br />
                            <br />I discussed this issue with{" "}
                            <strong className="text-white font-extrabold">
                              Shift Manager Mr. Jawad
                            </strong>
                            , and he advised me to report your concern to the
                            FOS team. He also mentioned that if it is not
                            resolved from there, he would send an email on his
                            behalf. The main issue is that{" "}
                            <strong className="text-white font-extrabold">
                              most of the staff in Mardan is new
                            </strong>
                            , so they are not fully familiar with the system.
                            Additionally, there is{" "}
                            <strong className="text-white font-extrabold">
                              no RM available
                            </strong>
                            , otherwise I would have discussed this matter with
                            him as well.
                            <br />
                            <br />
                            Kindly update me on{" "}
                            <strong className="text-white font-extrabold">
                              when my leave records will be updated or update my
                              leaves as soon as possible.
                            </strong>
                          </p>

                          <div className="mt-4 pt-3 border-t border-white/20 space-y-1">
                            <div>
                              <span className="font-bold">
                                Concerned Department:
                              </span>{" "}
                              HR Department
                            </div>
                            <div>
                              <span className="font-bold">
                                Proposed Solution:
                              </span>{" "}
                              Kindly update my leave record as soon as possible.
                            </div>
                            <div>
                              <span className="font-bold">Lodged By:</span>{" "}
                              Agent from Web
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* === CENTER COLUMN (Nodes) === */}
                <div className="flex flex-col items-center justify-start gap-[320px] pt-4">
                  {/* Node 1 */}
                  <div className="flex flex-col items-center gap-1">
                    <motion.div
                      className="px-2 py-0.5 rounded text-[8px] font-bold text-white shadow-sm"
                      style={{ backgroundColor: COLORS.deepTeal }}
                    >
                      RECEIVED
                    </motion.div>
                    <motion.div
                      className="w-3.5 h-3.5 rounded-full bg-white shadow-md z-10"
                      style={{ border: `3.5px solid ${COLORS.deepTeal}` }}
                    />
                  </div>

                  {/* Node 2 */}
                  <div className="flex flex-col items-center gap-1">
                    <motion.div
                      className="px-2 py-0.5 rounded text-[8px] font-bold text-white shadow-sm"
                      style={{ backgroundColor: COLORS.orange }}
                      animate={{
                        scale: stage >= 14 ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: stage >= 14 ? Number.POSITIVE_INFINITY : 0,
                        repeatDelay: 1,
                      }}
                    >
                      ACTIVATED
                    </motion.div>
                    <motion.div
                      className="w-3.5 h-3.5 rounded-full bg-white shadow-md z-10"
                      style={{
                        border: `3.5px solid ${
                          stage >= 14 ? COLORS.green : COLORS.border
                        }`,
                      }}
                    />
                  </div>
                </div>

                {/* === RIGHT COLUMN (Item 2) === */}
                {/* Added 'pt-[340px]' to push this column down so it starts where the left one ends */}
                <div className="flex flex-col justify-start pt-[340px]">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div
                      className="rounded-xl overflow-hidden shadow-lg transition-all duration-300 bg-white"
                      animate={{
                        scale: stage >= 14 ? 1.02 : 1,
                      }}
                      style={{
                        border:
                          stage >= 14
                            ? `2px solid ${COLORS.green}`
                            : `2px solid transparent`,
                        boxShadow:
                          stage >= 14
                            ? `0 10px 40px -10px ${COLORS.green}40`
                            : "0 4px 20px -5px rgba(0,0,0,0.05)",
                      }}
                    >
                      <div
                        className="px-3 py-2 flex items-center gap-2"
                        style={{ backgroundColor: COLORS.green }}
                      >
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                          <CheckCircle2 size={12} className="text-white" />
                        </div>
                        <span className="font-bold text-white text-xs">
                          RCA-Root Cause Analysis
                        </span>
                      </div>

                      <div className="p-4">
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">
                          Detail
                        </div>

                        <div
                          className="min-h-[140px] max-h-[180px] overflow-y-auto p-3 rounded-lg bg-gray-50/80 border border-gray-100"
                        >
                          <div className="text-[11px] text-gray-600 leading-relaxed whitespace-pre-line font-mono">
                            {statusText ? (
                              <>
                                {statusText.split("\n").map((line, idx) => (
                                  <motion.div
                                    key={idx}
                                    animate={{
                                      backgroundColor: line.includes("✓")
                                        ? COLORS.softGreen
                                        : "transparent",
                                      color: line.includes("✓")
                                        ? "#15803d"
                                        : "#4b5563",
                                    }}
                                    className="px-1.5 py-0.5 -mx-1.5 rounded transition-colors"
                                  >
                                    {line}
                                  </motion.div>
                                ))}
                                {stage >= 14 &&
                                  stage < 16 &&
                                  statusText.length < statusFullText.length && (
                                    <motion.span
                                      animate={{ opacity: [1, 0] }}
                                      transition={{
                                        repeat: Number.POSITIVE_INFINITY,
                                        duration: 0.6,
                                      }}
                                      className="inline-block w-1.5 h-3 bg-[#60BA81] ml-1 align-middle"
                                    />
                                  )}
                              </>
                            ) : (
                              <span className="text-gray-400 italic">
                                Waiting for status update...
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                          <Calendar size={12} />
                          <span>Mon, 24 Nov 2025 - 12:15 PM</span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div
              className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200"
            >
              <motion.button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition shadow-sm">
                <Printer size={14} />
                Print Timeline
              </motion.button>
              <div className="flex gap-3">
                <button className="px-4 py-2 rounded-lg text-[11px] font-semibold text-white bg-gray-400 hover:bg-gray-500 transition shadow-sm">
                  Close
                </button>
                <button
                  className="px-4 py-2 rounded-lg text-[11px] font-semibold text-white transition shadow-sm hover:brightness-110"
                  style={{ backgroundColor: COLORS.teal }}
                >
                  Route Complaint
                </button>
                <motion.button
                  className="px-4 py-2 rounded-lg text-[11px] font-semibold text-white shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-100 transition"
                  style={{ backgroundColor: COLORS.green }}
                  animate={{
                    scale: stage >= 15 ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    duration: 0.4,
                    repeat: stage >= 15 ? Number.POSITIVE_INFINITY : 0,
                    repeatDelay: 0.5,
                  }}
                >
                  Continue Investigation
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
// --- MAIN SCENE COMPONENT ---
export function SceneInvestigation({ isActive, progress }: { isActive: boolean; progress: number }) {
  const [stage, setStage] = useState(0)

  /**
   * Voice Over Script Sync (0 - 22.88 seconds):
   *
   * [0s - 5.12s]: "In this section, we walk through how each complaint is investigated and resolved in a structured,"
   *   → Stage 0-2: Show Intro screen
   *
   * [5.12s - 11.28s]: "transparent way. Once a complaint is reflected in the I/O portal, it appears under unprocessed."
   *   → Stage 3-8: Login → Portal Dashboard, highlight unprocessed row
   *
   * [12.24s - 17.52s]: "The Investigation Officer reviews the details and activates the case by marking it in process."
   *   → Stage 9-12: Click status button, confirm modal, mark as In Process
   *
   * [18.56s - 22.88s]: "This step starts the formal investigation and triggers system-based timeline tracking."
   *   → Stage 13-15: Show timeline view with tracking activated
   */

  useEffect(() => {
    if (!isActive) {
      setStage(0)
      return
    }

    const localProgress = progress

    // Intro Phase (0 - 5s)
    if (localProgress < 2) setStage(0)
    else if (localProgress < 4) setStage(1)
    else if (localProgress < 5) setStage(2)
    // Login Phase (5 - 7s)
    else if (localProgress < 5.5) setStage(3)
    else if (localProgress < 6) setStage(4)
    else if (localProgress < 6.5) setStage(5)
    else if (localProgress < 7) setStage(6)
    // Dashboard Phase (7 - 12s)
    else if (localProgress < 8) setStage(7)
    else if (localProgress < 10)
      setStage(8) // Row highlighted - "appears under unprocessed"
    else if (localProgress < 11)
      setStage(9) // Cursor moves to status
    // Status Change (12 - 17.5s)
    else if (localProgress < 13)
      setStage(10) // Modal appears
    else if (localProgress < 15)
      setStage(11) // Cursor on confirm
    else if (localProgress < 17)
      setStage(12) // Confirm clicked
    // Timeline Phase (17.5 - 23s)
    else if (localProgress < 19)
      setStage(13) // Transition to timeline
    else if (localProgress < 21)
      setStage(14) // Timeline tracking highlight
    else setStage(15) // End state
  }, [isActive, progress])

  // Determine which screen to show based on stage
  const getScreen = () => {
    if (stage <= 2) return "intro"
    if (stage <= 6) return "login"
    if (stage <= 12) return "dashboard"
    return "timeline"
  }

  const currentScreen = getScreen()

  return (
    <div className="relative w-full h-full overflow-hidden font-sans" style={{ backgroundColor: COLORS.lightGray }}>
      <AnimatePresence mode="wait">
        {currentScreen === "intro" && <IntroScreen key="intro" stage={stage} />}
        {currentScreen === "login" && <LoginScreen key="login" stage={stage} />}
        {currentScreen === "dashboard" && <PortalDashboard key="dashboard" stage={stage} />}
        {currentScreen === "timeline" && <TimelineFormScreen key="timeline" stage={stage} />}
      </AnimatePresence>
    </div>
  )
}

export default SceneInvestigation
