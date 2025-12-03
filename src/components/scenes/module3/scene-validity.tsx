import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Search,
  FileText,
  Users,
  Database,
  Scale,
  Fingerprint,
  ArrowRight,
  Shield,
  ClipboardCheck,
  Eye
} from "lucide-react"

// --- Assets ---
const ASSETS = {
  officer1: "/assets/avatars/officer1.png",  // Thinking/Analyzing Pose
  officer2: "/assets/avatars/officer2.png",  // Presenting/Explaining Pose
}

// --- FOS Design Token System ---
const COLORS = {
  primary: "#284952",    // Deep Teal
  success: "#60BA81",    // Fresh Green
  warning: "#F5A83C",    // Warm Orange
  textMain: "#17161A",   // Charcoal
  bg: "#F5F5F7",         // Light Gray
  surface: "#FFFFFF",    // Pure White
  border: "#DEE2E6",     // Border Gray
  textSec: "#767676"     // Medium Gray
}

const SPRING = { type: "spring", stiffness: 120, damping: 18, mass: 1 }
const SMOOTH_SPRING = { type: "spring", stiffness: 80, damping: 20, mass: 0.8 }

export function SceneValidity({ isActive }: { isActive: boolean }) {
  const [stage, setStage] = useState(0)

  // Timeline synchronized with voiceover:
  // 0s (23.76s): Officer appears, begins assessment
  // 4.84s (28.6s): Validity options appear, verdict selected
  // 8.04s (31.8s): Evidence gathering begins
  // 14.16s (37.92s): Cross-checking complete, RCA document created

  useEffect(() => {
    if (isActive) {
      setStage(0)
      const timers = [
        setTimeout(() => setStage(1), 4840),   // Verdict selection
        setTimeout(() => setStage(2), 8040),   // Evidence gathering
        setTimeout(() => setStage(3), 14160),  // Documentation
      ]
      return () => timers.forEach(clearTimeout)
    } else {
      setStage(0)
    }
  }, [isActive])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden font-sans select-none bg-[#F5F5F7]">

      {/* --- Ambient Background with Depth --- */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#60BA81] rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#284952] rounded-full blur-[120px]"
        />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(${COLORS.primary} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.primary} 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* --- Header Context --- */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, ...SMOOTH_SPRING }}
        className="absolute top-8 left-8 z-20 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-2xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center border border-gray-100">
          <Scale size={18} className="text-[#284952]" />
        </div>
        <div>
          <h2 className="text-xs font-bold text-[#284952] uppercase tracking-widest opacity-70">Investigation</h2>
          <h1 className="text-lg font-semibold text-[#17161A]">Validity Assessment</h1>
        </div>
      </motion.div>

      {/* --- Main Interactive Stage --- */}
      <div className="relative z-10 w-full max-w-6xl h-[500px] flex items-center justify-center px-8">
        <AnimatePresence mode="wait">

          {/* STAGE 0: OFFICER BEGINS ASSESSMENT (0s - 4.84s) */}
          {stage === 0 && (
            <motion.div
              key="assessment-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-12 w-full justify-center"
            >
              {/* Investigation Officer - Thinking Pose */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, ...SMOOTH_SPRING }}
                className="relative"
              >
                {/* Officer Avatar Container */}
                <div className="relative w-64 h-64">
                  {/* Officer Image - Thinking Pose */}
                  <div className="w-full h-full rounded-3xl bg-gradient-to-br from-[#284952]/10 to-[#60BA81]/10 border-2 border-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden">
                    <img
                      src={ASSETS.officer1}
                      alt="Investigation Officer - Analyzing"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Thinking Indicator */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-2 -right-2 w-12 h-12 bg-[#284952] rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Eye size={20} className="text-white" />
                  </motion.div>
                </div>

                {/* Officer Label */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-4 text-center"
                >
                  <p className="text-sm font-semibold text-[#17161A]">Conducting Assessment</p>
                  <p className="text-xs text-[#767676]">Analyzing complaint validity</p>
                </motion.div>
              </motion.div>

              {/* Assessment Scanner */}
              <motion.div
                initial={{ x: 100, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, ...SMOOTH_SPRING }}
                className="relative w-80 h-96 bg-white/90 backdrop-blur-xl rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-white/50 flex flex-col items-center justify-center overflow-hidden"
              >
                {/* Scanning Animation */}
                <motion.div
                  animate={{ top: ["-10%", "110%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-[#60BA81]/30 to-transparent z-10 pointer-events-none"
                />

                <div className="relative z-20 flex flex-col items-center gap-6 px-8">
                  {/* Scanner Icon */}
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#F5F5F7] to-white flex items-center justify-center shadow-inner relative">
                    <Fingerprint size={48} className="text-[#284952] opacity-60" />

                    {/* Pulsing Rings */}
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute w-full h-full rounded-3xl border-2 border-[#60BA81]"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      className="absolute w-full h-full rounded-3xl border-2 border-[#284952]"
                    />
                  </div>

                  {/* Status Text */}
                  <div className="text-center">
                    <h3 className="text-base font-bold text-[#17161A] mb-2">Validity Check in Progress</h3>
                    <p className="text-xs text-[#767676] leading-relaxed">
                      Cross-referencing evidence<br />
                      Reviewing worker statements<br />
                      Checking internal records
                    </p>
                  </div>

                  {/* Progress Indicators */}
                  <div className="flex gap-2 mt-4">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: [1, 1.2, 1],
                          backgroundColor: ["#DEE2E6", "#60BA81", "#DEE2E6"]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                        className="w-2 h-2 rounded-full"
                      />
                    ))}
                  </div>
                </div>

                {/* Subtle Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#284952]/5 z-0" />
              </motion.div>
            </motion.div>
          )}

          {/* STAGE 1: VALIDITY VERDICT (4.84s - 8.04s) */}
          {stage === 1 && (
            <motion.div
              key="verdict"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-8 w-full justify-center"
            >
              {/* Officer - Presenting Pose */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={SMOOTH_SPRING}
                className="relative"
              >
                <div className="w-56 h-56 rounded-3xl bg-gradient-to-br from-[#284952]/10 to-[#60BA81]/10 border-2 border-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden">
                  <img
                    src={ASSETS.officer2}
                    alt="Investigation Officer - Presenting"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Speech Bubble */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, ...SPRING }}
                  className="absolute -right-4 top-8 bg-white px-4 py-2 rounded-2xl shadow-lg border border-[#DEE2E6]"
                >
                  <p className="text-xs font-medium text-[#284952] whitespace-nowrap">Assessment Complete</p>
                  <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border-l border-b border-[#DEE2E6] rotate-45" />
                </motion.div>
              </motion.div>

              {/* Verdict Options */}
              <div className="flex gap-6 items-center">
                {/* Invalid Option - Faded */}
                <VerdictCard
                  icon={XCircle}
                  color="#767676"
                  label="Invalid"
                  delay={0.1}
                  selected={false}
                />

                {/* Partial Option - Faded */}
                <VerdictCard
                  icon={AlertTriangle}
                  color={COLORS.warning}
                  label="Partially Valid"
                  delay={0.2}
                  selected={false}
                />

                {/* Valid Option - SELECTED */}
                <VerdictCard
                  icon={CheckCircle2}
                  color={COLORS.success}
                  label="Valid"
                  delay={0.3}
                  selected={true}
                />
              </div>
            </motion.div>
          )}

          {/* STAGE 2: EVIDENCE GATHERING (8.04s - 14.16s) */}
          {stage === 2 && (
            <motion.div
              key="evidence"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-8 w-full justify-center"
            >
              {/* Officer - Confident Pose */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={SMOOTH_SPRING}
                className="relative flex-shrink-0"
              >
                <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-[#60BA81]/20 to-[#284952]/10 border-2 border-[#60BA81]/30 shadow-[0_8px_30px_rgba(96,186,129,0.2)] flex items-center justify-center">
                  <div className="text-center">
                    <Shield size={36} className="text-[#60BA81] mx-auto mb-2" />
                    <p className="text-xs text-[#17161A] font-semibold">Verified</p>
                  </div>
                </div>
              </motion.div>

              {/* Evidence Collection Board */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, ...SMOOTH_SPRING }}
                className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-[#DEE2E6] p-8 w-[500px]"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#60BA81] flex items-center justify-center shadow-lg">
                    <CheckCircle2 size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#17161A]">Complaint Validated</h3>
                    <p className="text-xs text-[#767676]">Based on comprehensive evidence</p>
                  </div>
                </div>

                {/* Evidence Items */}
                <div className="space-y-3">
                  <EvidenceItem
                    icon={Users}
                    label="Worker Interviews"
                    description="Testimonies collected and verified"
                    delay={0.4}
                  />
                  <EvidenceItem
                    icon={Database}
                    label="Internal Records"
                    description="Cross-checked system data"
                    delay={0.7}
                  />
                  <EvidenceItem
                    icon={Search}
                    label="Physical Evidence"
                    description="Documentation reviewed"
                    delay={1.0}
                  />
                </div>

                {/* Cross-Check Animation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="mt-6 pt-6 border-t border-dashed border-[#DEE2E6]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#284952]">Cross-Verification Status</span>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 2, duration: 1.5, ease: "easeOut" }}
                      className="flex-1 mx-4 h-2 bg-[#F5F5F7] rounded-full overflow-hidden"
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 2, duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[#60BA81] to-[#284952] rounded-full"
                      />
                    </motion.div>
                    <CheckCircle2 size={16} className="text-[#60BA81]" />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* STAGE 3: RCA DOCUMENTATION (14.16s+) */}
          {stage === 3 && (
            <motion.div
              key="documentation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-8 w-full justify-center"
            >
              {/* Officer - Small Reference */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={SMOOTH_SPRING}
                className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#60BA81]/20 to-[#284952]/10 border border-[#60BA81]/30 shadow-lg flex items-center justify-center flex-shrink-0"
              >
                <div className="text-center">
                  <FileText size={28} className="text-[#284952] mx-auto mb-1" />
                  <p className="text-[9px] text-[#767676] font-medium">Officer</p>
                </div>
              </motion.div>

              {/* RCA Document */}
              <motion.div
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ delay: 0.3, ...SMOOTH_SPRING }}
                className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-[#DEE2E6] overflow-hidden w-[480px]"
              >
                {/* Document Header */}
                <div className="h-14 bg-gradient-to-r from-[#F5F5F7] to-white border-b border-[#DEE2E6] flex items-center justify-between px-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#28CA42]" />
                  </div>
                  <span className="text-[10px] font-bold text-[#284952] uppercase tracking-wider">Root Cause Analysis</span>
                  <FileText size={16} className="text-[#767676]" />
                </div>

                {/* Document Body */}
                <div className="p-8">
                  {/* Header Section */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#60BA81] to-[#284952] flex items-center justify-center shadow-lg">
                      <CheckCircle2 size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#17161A]">Complaint Validated</h3>
                      <p className="text-xs text-[#767676]">Case ID: #FOS-2921 • Investigation Complete</p>
                    </div>
                  </div>

                  {/* Typing Content */}
                  <div className="space-y-3 mb-6">
                    <TypingLine width="100%" delay={0.6} />
                    <TypingLine width="95%" delay={0.9} />
                    <TypingLine width="88%" delay={1.2} />
                    <TypingLine width="92%" delay={1.5} />
                    <TypingLine width="70%" delay={1.8} />
                  </div>

                  {/* Evidence Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2 }}
                    className="bg-[#F5F5F7] rounded-xl p-4 mb-6"
                  >
                    <p className="text-[10px] font-bold text-[#284952] uppercase tracking-wide mb-2">Evidence Summary</p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <Users size={14} className="text-[#60BA81] mx-auto mb-1" />
                        <p className="text-[9px] text-[#767676]">Interviews</p>
                      </div>
                      <div className="text-center">
                        <Database size={14} className="text-[#60BA81] mx-auto mb-1" />
                        <p className="text-[9px] text-[#767676]">Records</p>
                      </div>
                      <div className="text-center">
                        <Search size={14} className="text-[#60BA81] mx-auto mb-1" />
                        <p className="text-[9px] text-[#767676]">Evidence</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Signature Block */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.8 }}
                    className="pt-6 border-t border-dashed border-[#DEE2E6] flex justify-between items-end"
                  >
                    <div>
                      <p className="text-[9px] text-[#767676] uppercase tracking-wide mb-1">Investigation Officer</p>
                      <div className="font-handwriting text-xl text-[#284952] opacity-70">Authorized</div>
                    </div>
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 3.2 }}
                      className="px-4 py-2 bg-gradient-to-r from-[#284952] to-[#60BA81] text-white text-xs rounded-lg font-semibold shadow-lg flex items-center gap-2"
                    >
                      <FileText size={14} />
                      Filed to RCA
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  )
}

// --- Supporting Components ---

// Verdict Card Component
function VerdictCard({ icon: Icon, color, label, delay, selected }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{
        opacity: selected ? 1 : 0.4,
        scale: selected ? 1.05 : 0.95,
        y: 0
      }}
      transition={{ delay, ...SPRING }}
      className={`relative w-44 h-64 rounded-[28px] border-2 flex flex-col items-center justify-center overflow-hidden ${selected
        ? 'bg-white shadow-[0_20px_60px_rgba(96,186,129,0.3)] border-[#60BA81]'
        : 'bg-white/60 border-white/80 grayscale'
        }`}
    >
      {/* Icon */}
      <motion.div
        animate={selected ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${selected ? 'bg-gradient-to-br from-[#60BA81] to-[#284952] shadow-lg' : 'bg-gray-100'
          }`}
      >
        <Icon size={32} className={selected ? 'text-white' : 'text-gray-400'} />
      </motion.div>

      {/* Label */}
      <h4 className={`text-base font-bold ${selected ? 'text-[#17161A]' : 'text-gray-400'}`}>
        {label}
      </h4>

      {/* Selected Indicator */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.3, ...SPRING }}
          className="absolute top-4 right-4 w-8 h-8 bg-[#60BA81] rounded-full flex items-center justify-center shadow-lg"
        >
          <CheckCircle2 size={18} className="text-white" />
        </motion.div>
      )}

      {/* Background Gradient */}
      {selected && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#60BA81]/10 z-0" />
      )}
    </motion.div>
  )
}

// Evidence Item Component
function EvidenceItem({ icon: Icon, label, description, delay }: any) {
  return (
    <motion.div
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25, delay }}
      className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#F5F5F7] to-white hover:from-white hover:to-[#F5F5F7] transition-all border border-transparent hover:border-[#60BA81]/30 hover:shadow-md group cursor-pointer"
    >
      <div className="p-3 bg-white rounded-xl shadow-sm text-[#284952] group-hover:text-[#60BA81] group-hover:shadow-md transition-all">
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <div className="text-sm font-bold text-[#17161A]">{label}</div>
        <div className="text-[10px] text-[#767676] mt-0.5">{description}</div>
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.3, type: "spring", stiffness: 300 }}
      >
        <CheckCircle2 size={18} className="text-[#60BA81]" />
      </motion.div>
    </motion.div>
  )
}

// Typing Line Component
function TypingLine({ width, delay }: { width: string, delay: number }) {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width, opacity: 1 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="h-2.5 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full"
    />
  )
}