"use client"

import React, { useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Database,
  CheckCircle2,
  Server,
  Activity,
  ArrowRight,
  Code2,
  Cpu,
  Zap,
  Shield,
  Lock,
  Clock,
  Calendar,
  RefreshCcw
} from "lucide-react"

// --- THEME & CONSTANTS ---

const THEME = {
  primary: "#284952",    // Deep Teal
  secondary: "#60BA81",  // Fresh Green
  accent: "#F5A83C",     // Warm Orange
  text: "#17161A",       // Charcoal
  textSecondary: "#767676", // Medium Gray
  bg: "#F5F5F7",         // Light Gray
  white: "#FFFFFF",      // Pure White
  border: "#DEE2E6",     // Border Gray
}

// Timing based on script
const PHASES = {
  INTRO: 0,
  REGISTER_DATA: 2,     // "We begin by registering..."
  ONBOARDING_INIT: 2.5, // "Initiating..." Visual
  SHOW_EMPLOYEES: 5,     // End of registering line
  SOURCE_SELECTION: 6,   // "Companies simply share..."
  SOURCE_CONNECTED: 10,  // "...or they may integrate..."
  TRANSFER_START: 17,    // "Our team uploads..."
  VALIDATION: 19,
  CENTERING: 21,
  COMPLETE: 22          // End of scene
}

const MOCK_DATA = [
  { id: "12987", name: "Ali Khan", role: "Production Manager", avatar: "AK", dept: "Operations", branch: "Sialkot Main" },
  { id: "475002", name: "Sara Ahmed", role: "Quality Control", avatar: "SA", dept: "Quality", branch: "Sialkot Main" },
  { id: "78523", name: "Usman Zafar", role: "Floor Supervisor", avatar: "UZ", dept: "Operations", branch: "Plant B" },
  { id: "31649", name: "Fatima Bibi", role: "HR Specialist", avatar: "FB", dept: "Human Resources", branch: "Head Office" },
  { id: "90124", name: "Bilal Rehan", role: "Logistics Lead", avatar: "BR", dept: "Supply Chain", branch: "Warehouse A" },
]

// --- UTILITY COMPONENTS ---

const Avatar = ({ initials, isValidated }: { initials: string, isValidated: boolean }) => (
  <div
    className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white shadow-sm ring-2 ring-white"
    style={{
      background: isValidated
        ? `linear-gradient(135deg, ${THEME.secondary}, ${THEME.primary})`
        : `linear-gradient(135deg, ${THEME.textSecondary}, ${THEME.primary})`
    }}
  >
    {initials}
  </div>
)

const GlassCard = ({ children, className = "", title, subtitle, logoSrc, isActive = true, isHRMSConnected = false, layoutId, badgeLabel, initial, exit }: any) => (
  <motion.div
    layoutId={layoutId}
    initial={initial || { opacity: 0, scale: 0.95 }}
    exit={exit}
    animate={{
      opacity: isActive ? 1 : 0.5,
      scale: isActive ? 1 : 0.95,
      filter: isActive ? "blur(0px)" : "blur(2px)",
      borderColor: isHRMSConnected ? "#60BA81" : "rgba(255, 255, 255, 1)",
      boxShadow: isHRMSConnected ? "0 0 30px -5px rgba(96, 186, 129, 0.3)" : "0 20px 50px -12px rgba(0,0,0,0.1)"
    }}
    transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
    className={`relative overflow-visible rounded-3xl border shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] backdrop-blur-xl bg-white/80 flex flex-col ${className}`}
  >
    {/* HRMS Live Badge */}
    <AnimatePresence>
      {isHRMSConnected && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute top-0 right-0 bg-[#60BA81] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-3xl z-20 flex items-center gap-1"
        >
          <Activity size={10} className="animate-bounce" />
          {badgeLabel || "HRMS API LIVE"}
        </motion.div>
      )}
    </AnimatePresence>

    {/* Header */}
    <div className="relative px-4 py-3 border-b border-gray-100 flex flex-col items-center gap-2 bg-gradient-to-b from-white to-gray-50/50 flex-shrink-0 rounded-t-3xl">
      <div className="absolute top-4 left-4 flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
      </div>

      <div className="relative h-20 w-full flex items-center justify-center mt-2 mb-1">
        {/* Wave Effect - Pulse */}
        <motion.div
          className="absolute w-14 h-14 rounded-full border-2 border-[#60BA81]"
          animate={{ scale: [1, 1.25], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="absolute w-14 h-14 rounded-full border border-[#60BA81]/30"
          animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.4, ease: "easeOut" }}
        />

        {/* Circular Logo Container */}
        <div className="relative z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center p-2 overflow-hidden">
          <img src={logoSrc} alt={title} className="w-full h-full object-contain" />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-xs font-bold tracking-tight" style={{ color: THEME.primary }}>
          {title}
        </div>
        {subtitle && (
          <div className="text-[9px] font-medium text-slate-500 mt-0.5">
            {subtitle}
          </div>
        )}
      </div>
    </div>

    {/* Content */}
    <div className="p-4 relative z-10 flex-1 overflow-visible">
      {children}
    </div>
  </motion.div>
)

const EmployeeRow = ({ data, status = "idle" }: any) => {
  const isValidated = status === "validated"
  const isTransferring = status === "transferring" // New status for visual flair

  return (
    <motion.div
      layout
      layoutId={`row-${data.id}`}
      initial={{ opacity: 0, x: -10, borderColor: "rgba(243, 244, 246, 0.6)", boxShadow: "0 0 0 0 rgba(0,0,0,0)" }}
      animate={{
        opacity: 1,
        x: 0,
        scale: isTransferring ? 1.08 : 1,
        rotate: isTransferring ? [0, -2, 2, 0] : 0, // Dynamic wobble during flight
        borderColor: isTransferring || isValidated ? THEME.secondary : "rgba(243, 244, 246, 0.6)",
        zIndex: isTransferring ? 50 : 1, // High z-index during transfer
        boxShadow: isTransferring
          ? `0 20px 40px -10px ${THEME.secondary}44, 0 0 20px ${THEME.secondary}22`
          : isValidated
            ? "0 1px 2px 0 rgba(0,0,0,0.05)"
            : "0 0 0 0 rgba(0,0,0,0)"
      }}
      whileHover={{ scale: isTransferring ? 1.08 : 1.01 }}
      transition={{
        layout: {
          type: "spring",
          stiffness: 180,
          damping: 25,
          mass: 1.2
        },
        rotate: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        },
        opacity: { duration: 0.3 }
      }}
      exit={{ opacity: 0, x: 10 }}
      className={`
        flex items-center gap-1.5 p-2 rounded-xl border relative bg-white
        ${isValidated ? "bg-green-50/80" : ""}
      `}
    >
      <Avatar initials={data.avatar} isValidated={isValidated} />

      {/* Name and ID */}
      <div className="flex-shrink-0 w-32">
        <h4 className="text-[10px] font-bold truncate" style={{ color: THEME.text }}>
          {data.name}
        </h4>
        <span className="text-[8px] font-mono text-slate-400 block">{data.id}</span>
      </div>

      {/* Details Grid */}
      <div className="flex-1 grid grid-cols-2 gap-x-2 gap-y-0.5 min-w-0 border-l border-slate-100 pl-3">
        <div className="text-[8px] text-slate-500 truncate" title="Role">
          <span className="font-semibold text-slate-400 mr-1">Role:</span>{data.role}
        </div>
        <div className="text-[8px] text-slate-500 truncate" title="Department">
          <span className="font-semibold text-slate-400 mr-1">Dept:</span>{data.dept}
        </div>
        <div className="col-span-2 text-[8px] text-slate-500 truncate" title="Branch">
          <span className="font-semibold text-slate-400 mr-1">Branch:</span>{data.branch}
        </div>
      </div>

      {/* Status Icon */}
      {isValidated && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-2 flex-shrink-0">
          <CheckCircle2 size={16} fill={THEME.secondary} className="text-white" />
        </motion.div>
      )}


      {/* Transfer Trail / Comet Effect */}
      {isTransferring && (
        <>
          <motion.div
            className="absolute -inset-1 rounded-xl opacity-20"
            animate={{
              boxShadow: [`0 0 0px ${THEME.secondary}`, `0 0 20px ${THEME.secondary}`, `0 0 0px ${THEME.secondary}`]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          {/* Animated "Speed Line" across the card */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
            animate={{ x: ["-150%", "150%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}
    </motion.div>
  )
}

const DataSourceSelector = ({ isConnected }: { isConnected: boolean }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    className="absolute -right-48 top-1/2 -translate-y-1/2 w-40 bg-white/90 backdrop-blur-xl rounded-2xl border border-white shadow-2xl p-4 z-50"
  >
    <h3 className="text-[10px] font-bold text-slate-500 mb-3 px-1">SELECT DATA SOURCE</h3>

    <div className="space-y-2">
      {/* CSV Option - Disabled */}
      <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50 opacity-70 relative overflow-hidden">
        <div className="p-2 bg-slate-200 rounded-lg text-slate-500">
          <Database size={14} />
        </div>
        <div className="text-[9px] font-bold text-slate-600">CSV Bulk Upload</div>
      </div>

      {/* OR Separator */}
      <div className="flex items-center gap-2 py-1">
        <div className="h-[1px] flex-1 bg-slate-200" />
        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">or</span>
        <div className="h-[1px] flex-1 bg-slate-200" />
      </div>

      {/* HRMS Option - Active */}
      <div className="relative">
        <motion.div
          className="flex items-center gap-3 p-3 rounded-xl border relative z-10 bg-white"
          animate={{
            borderColor: isConnected ? THEME.secondary : THEME.border,
            backgroundColor: isConnected ? "#F0FDF4" : "#FFFFFF"
          }}
        >
          <div className="p-2 bg-green-100 text-green-600 rounded-lg">
            <Server size={14} />
          </div>
          <div className="flex-1">
            <div className="text-[9px] font-bold" style={{ color: THEME.primary }}>HRMS Integration</div>
            <div className="text-[8px] text-slate-400">Direct API Sync</div>
          </div>
          {isConnected && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <CheckCircle2 size={16} fill={THEME.secondary} className="text-white bg-white rounded-full" />
            </motion.div>
          )}
        </motion.div>

        {/* Glow behind */}
        {isConnected && (
          <motion.div
            layoutId="hrms-glow"
            className="absolute inset-0 rounded-xl bg-green-400/20 blur-md z-0"
          />
        )}
      </div>
    </div>

    {/* Connection Line Animation */}
    {isConnected && (
      <svg className="absolute top-1/2 right-full w-12 h-2 -translate-y-1/2 overflow-visible pointer-events-none">
        <motion.path
          d="M 48 4 L 0 4"
          fill="none"
          stroke={THEME.secondary}
          strokeWidth="2"
          strokeDasharray="4 2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.circle
          cx="0" cy="4" r="3" fill={THEME.secondary}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        />
      </svg>
    )}
  </motion.div>
)

const DataPipeline = ({ active }: { active: boolean }) => {
  return (
    <div className="relative w-full h-24 flex items-center justify-center -mt-8">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 200 120">
        <defs>
          <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={THEME.primary} />
            <stop offset="50%" stopColor={THEME.secondary} />
            <stop offset="100%" stopColor={THEME.accent} />
          </linearGradient>

          <filter id="glowBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- CONNECTION CURVE --- */}
        {/* Full width (0 to 200) to touch edges. Arcs UP (Q 100,-20). y=60 base. */}
        <motion.path
          d="M -2,70 Q 100,-10 202,70"
          fill="none"
          stroke="url(#curveGradient)"
          strokeWidth={active ? 5 : 2}
          strokeLinecap="round"
          strokeDasharray={active ? "none" : "5 5"}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: active ? 1 : 0.4,
            filter: active ? "url(#glowBlur)" : "none"
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        {/* --- ANIMATED PARTICLES --- */}
        {active && (
          <>
            {[0, 1, 2].map((i) => (
              <circle key={i} r="4" fill="#FFFFFF">
                <animateMotion
                  dur="2s"
                  repeatCount="indefinite"
                  begin={`${i * 0.6}s`}
                  path="M -2,70 Q 100,-10 202,70"
                  calcMode="spline"
                  keyTimes="0;1"
                  keySplines="0.4 0 0.2 1"
                />
              </circle>
            ))}
            {/* Extra small particles for "dust" effect */}
            {[0, 1, 2, 3].map((i) => (
              <circle key={`dust-${i}`} r="1.5" fill={THEME.secondary} opacity="0.8">
                <animateMotion
                  dur="2.5s"
                  repeatCount="indefinite"
                  begin={`${i * 0.5 + 0.2}s`}
                  path="M -2,70 Q 100,-10 202,70"
                  calcMode="spline"
                  keyTimes="0;1"
                  keySplines="0.4 0 0.2 1"
                />
              </circle>
            ))}
          </>
        )}
      </svg>

      {/* --- SECURE LABEL --- */}
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute -bottom-6 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-xl rounded-full shadow-lg border border-green-100 z-10"
        >
          <div className="bg-green-100 p-1.5 rounded-full">
            <Shield size={14} className="text-green-600" />
          </div>
          <span className="text-xs font-bold tracking-wide bg-gradient-to-r from-teal-700 to-green-600 bg-clip-text text-transparent uppercase">
            Secure Connection
          </span>
        </motion.div>
      )}
    </div>
  )
}

const SyncSchedule = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="mt-6 p-2.5 bg-white/50 rounded-2xl border border-slate-100 shadow-sm"
  >
    <div className="flex items-center gap-2 mb-3 px-1">
      <RefreshCcw size={11} className="text-slate-400" />
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Auto-Sync Schedule</span>
    </div>

    <div className="grid grid-cols-3 gap-2">
      {[
        { label: "Daily", icon: Clock, sub: "24 Hours", active: true },
        { label: "Weekly", icon: Calendar, sub: "Mon 8AM", active: false },
        { label: "Monthly", icon: Database, sub: "1st Day", active: false }
      ].map((opt) => (
        <div
          key={opt.label}
          className={`p-2 rounded-xl border text-center transition-all cursor-default
            ${opt.active
              ? "bg-green-50 border-green-200 shadow-sm"
              : "bg-gray-50/50 border-gray-100 opacity-60"}`}
        >
          <opt.icon size={14} className={`mx-auto mb-1 ${opt.active ? "text-green-600" : "text-slate-400"}`} />
          <div className={`text-[9px] font-bold ${opt.active ? "text-green-700" : "text-slate-500"}`}>{opt.label}</div>
          <div className="text-[7px] text-slate-400 font-medium">{opt.sub}</div>
        </div>
      ))}
    </div>

    <div className="mt-3 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-[#284952]/5 rounded-lg">
      <div className="w-1.5 h-1.5 rounded-full bg-[#60BA81] animate-pulse" />
      <span className="text-[8px] font-bold text-[#284952] opacity-70 uppercase tracking-widest">Continuous API Monitoring Active</span>
    </div>
  </motion.div>
)

const OnboardingInit = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm z-20 p-6 text-center"
  >
    <div className="relative w-12 h-12 mb-4 flex items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-slate-100"
      />
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-t-[#60BA81] border-r-[#60BA81] border-b-transparent border-l-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      <Zap size={20} className="text-[#284952]" />
    </div>
    <h3 className="text-xs font-bold text-[#284952] mb-1">Initiating Onboarding</h3>
    <p className="text-[10px] text-slate-500 font-medium">Establishing secure connection...</p>
  </motion.div>
)

export const SceneUpload = ({ isActive = true, progress = 0 }: any) => {

  // --- STATE ----
  const showCentered = progress < PHASES.TRANSFER_START
  const showOnboarding = progress >= PHASES.ONBOARDING_INIT && progress < PHASES.SHOW_EMPLOYEES
  const showList = progress >= PHASES.SHOW_EMPLOYEES

  const showSourceSelector = progress >= PHASES.SOURCE_SELECTION && progress < PHASES.TRANSFER_START
  const isSourceConnected = progress >= PHASES.SOURCE_CONNECTED

  const isTransferring = progress >= PHASES.TRANSFER_START
  const isValidating = progress >= PHASES.VALIDATION
  const isFinalCentering = progress >= PHASES.CENTERING
  const isComplete = progress >= PHASES.COMPLETE

  // Calculate transferred items based on progress during transfer phase
  const transferredCount = isTransferring
    ? Math.min(MOCK_DATA.length, Math.floor((progress - PHASES.TRANSFER_START) * 3))
    : 0

  const validatedCount = isValidating
    ? Math.min(transferredCount, Math.floor((progress - PHASES.VALIDATION) * 4))
    : 0

  return (
    <div className="w-full h-full relative bg-[#F5F5F7] overflow-hidden font-sans flex items-center justify-center">

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: `radial-gradient(${THEME.primary} 1px, transparent 1px)`, backgroundSize: '32px 32px' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-20"
          style={{ backgroundColor: THEME.secondary }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Main Stage Container - Added explicit EXIT prop to fix lingering scene issue */}
      <motion.div
        layout
        key="scene-upload-stage"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }} // Keep visible during layout transition
        className={`relative z-10 w-full max-w-6xl px-8 h-[450px] flex items-center scale-[0.85] origin-center
            ${(showCentered || isFinalCentering) ? "justify-center" : "justify-between"}`}
      >

        {/* === LEFT CARD: COMPANY A === */}
        <AnimatePresence>
          {!isFinalCentering && (
            <motion.div
              key="company-a-container"
              exit={{ opacity: 0, x: -50, scale: 0.9 }}
              className="relative z-20"
            > {/* Wrapper for positioning selector relative to card */}
              <GlassCard
                layoutId="card-company-a"
                title="Company A"
                subtitle="Sialkot Region Pakistan"
                logoSrc="/assets/images/company_a.png"
                className="w-[280px] shrink-0 h-auto min-h-[400px]"
                isHRMSConnected={isSourceConnected}
              >
                <div className="flex justify-between items-center text-xs pb-3 border-b border-gray-100 mb-3">
                  <span className="font-bold text-slate-500">
                    {isTransferring ? "Uploading Data..." : "Employee Records"}
                  </span>
                  <div className="flex items-center gap-2">
                    {isTransferring && !isComplete && <Activity size={12} className="text-orange-400 animate-pulse" />}
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-mono font-bold">
                      {MOCK_DATA.length} Active
                    </span>
                  </div>
                </div>

                <div className="space-y-2 relative min-h-[200px]">
                  {/* Initial Onboarding Loader */}
                  <AnimatePresence>
                    {showOnboarding && <OnboardingInit />}
                  </AnimatePresence>

                  {/* Employee List */}
                  <div className="space-y-2 relative">
                    <AnimatePresence>
                      {showList && MOCK_DATA.map((emp, i) => {
                        // Only render if NOT transferred yet
                        const isTransferred = isTransferring && i < transferredCount;
                        if (isTransferred) return null;

                        return (
                          <motion.div
                            layout
                            key={emp.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }} // Fade out as it leaves
                          >
                            <EmployeeRow data={emp} />
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                  </div>
                </div>


                <AnimatePresence>
                  {isComplete && (
                    <div className="flex flex-col">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-8 py-4 text-center bg-green-50 rounded-xl border border-green-100"
                      >
                        <CheckCircle2 size={24} className="mx-auto text-green-500 mb-2" />
                        <p className="text-xs text-green-700 font-bold uppercase tracking-wider">Upload Complete</p>
                      </motion.div>

                      <SyncSchedule />
                    </div>
                  )}
                </AnimatePresence>

              </GlassCard>

              {/* Data Source Selector - Outside Card */}
              <AnimatePresence>
                {showSourceSelector && <DataSourceSelector isConnected={isSourceConnected} />}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* === CENTER: BRIDGE / PIPELINE === */}
        <AnimatePresence>
          {(!showCentered && !isFinalCentering) && (
            <motion.div
              key="pipeline-container"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="flex-shrink-0 w-32 relative z-0 flex flex-col items-center justify-center"
            >
              <DataPipeline active={isTransferring && !isComplete} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* === RIGHT CARD: FOS PLATFORM === */}
        <AnimatePresence>
          {!showCentered && (
            <motion.div
              layoutId="fos-card-view-container" // Anchor for the move
              className={`shrink-0 flex items-center relative z-20 ${isFinalCentering ? "w-[340px]" : "w-[280px]"}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0, scale: isFinalCentering ? 1 : 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              exit={{ opacity: 1 }} // Don't fade out the card
            >
              <GlassCard
                layoutId="fos-platform-card"
                title="FOS Platform"
                logoSrc="/assets/images/FOS-01.png"
                isActive={true}
                isHRMSConnected={isSourceConnected}
                badgeLabel="SYNC ACTIVE: COMPANY A"
                className={`w-full border-green-200 ${isFinalCentering ? "min-h-[420px]" : "min-h-[400px]"}`}
                exit={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              >
                <div className="flex justify-between items-center text-[10px] pb-2 border-b border-gray-100 mb-2">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-slate-500">Validated Records</span>
                    {isSourceConnected && (
                      <motion.div
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2 h-2 rounded-full bg-[#60BA81] shadow-[0_0_8px_rgba(96,186,129,0.8)]"
                      />
                    )}
                  </div>
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-mono font-bold">
                    {validatedCount} / {MOCK_DATA.length}
                  </span>
                </div>

                <div className="space-y-2 relative min-h-[300px]">
                  <AnimatePresence>
                    {MOCK_DATA.slice(0, transferredCount).map((emp, i) => (
                      <EmployeeRow
                        key={`dest-${emp.id}`}
                        data={emp}
                        status={i < validatedCount ? "validated" : "transferring"}
                      />
                    ))}
                  </AnimatePresence>

                  {/* Validation Scanner Overlay */}
                  <AnimatePresence>
                    {isValidating && !isComplete && (
                      <motion.div
                        key="scanner-line"
                        className="absolute inset-0 pointer-events-none z-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }} // Clean exit for scanner
                      >
                        <motion.div
                          className="w-full h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-[0_0_15px_rgba(96,186,129,0.8)]"
                          animate={{ top: ["0%", "100%", "0%"] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          style={{ position: 'absolute' }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {transferredCount === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                      <div className="text-center">
                        <Server size={32} className="mx-auto mb-2 opacity-50" />
                        <p className="text-[10px] font-bold tracking-widest uppercase">Waiting for Data</p>
                      </div>
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div >
    </div >
  )
}