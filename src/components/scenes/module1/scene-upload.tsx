"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileSpreadsheet,
  CheckCircle2,
  Building2,
  ArrowRight,
  ShieldCheck,
  Server,
  Database,
  ScanLine,
  User,
  Briefcase,
  Hash
} from "lucide-react"

// Import new components
import { ParticleField } from "./upload-components/ParticleField.tsx"
import { TypewriterText } from "./upload-components/TypewriterText.tsx"
import { CircularProgress } from "./upload-components/CircularProgress.tsx"
import { ConfettiBurst } from "./upload-components/ConfettiBurst.tsx"
import { APIHandshake } from "./upload-components/APIHandshake.tsx"
import { DataStream } from "./upload-components/DataStream.tsx"
import { NetworkNodes } from "./upload-components/NetworkNodes.tsx"
import { DocumentStack } from "./upload-components/DocumentStack.tsx"
import { ENHANCED_TIMING, EASING } from "./upload-utils/timing.ts"

// Realistic Pakistani Employee Data
const MOCK_DATA = [
  { id: "EMP-204", name: "Zara Sheikh", dept: "Production", role: "Line Manager" },
  { id: "EMP-205", name: "Usman Ali", dept: "Logistics", role: "Supply Officer" },
  { id: "EMP-206", name: "Fatima Bibi", dept: "Textile", role: "Stitching Lead" },
  { id: "EMP-207", name: "Hassan Raza", dept: "Quality", role: "Senior Auditor" },
]

// --- SUB-COMPONENTS ---

// Glass Container
const GlassPanel = ({ children, className = "", scale = 1 }: { children: React.ReactNode, className?: string, scale?: number }) => (
  <motion.div
    animate={{ scale }}
    transition={{ type: "spring", stiffness: 200, damping: 20 }}
    className={`bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] rounded-3xl ${className}`}
  >
    {children}
  </motion.div>
)

// Enhanced Data Row
const DataRow = ({ data, index, isValidated, progress }: { data: any, index: number, isValidated: boolean, progress: number }) => {
  const showMagnifier = progress >= ENHANCED_TIMING.VALIDATION_START + (index * 0.6) && !isValidated

  return (
    <motion.div
      className={`flex items-center gap-3 p-2.5 rounded-lg mb-1 relative overflow-hidden transition-colors duration-300 ${isValidated ? 'bg-[#E6F4EA]/80' : 'bg-white/40'}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.3 }}
    >
      {/* Status Icon */}
      <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${isValidated ? 'bg-[#60BA81] scale-100' : 'bg-gray-200 scale-90'}`}>
        {isValidated ? (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
            <CheckCircle2 size={14} className="text-white" />
          </motion.div>
        ) : showMagnifier ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <ScanLine size={14} className="text-[#F5A83C]" />
          </motion.div>
        ) : (
          <div className="w-2 h-2 rounded-full bg-gray-400" />
        )}
      </div>

      {/* Data Columns */}
      <div className="flex-1 grid grid-cols-12 gap-2 items-center">
        <div className="col-span-5 flex flex-col justify-center">
          <span className={`text-xs font-bold leading-tight ${isValidated ? 'text-[#284952]' : 'text-gray-600'}`}>
            {data.name}
          </span>
          <span className="text-[9px] text-gray-400 font-mono">{data.id}</span>
        </div>
        <div className="col-span-3">
          <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-md truncate block">
            {data.dept}
          </span>
        </div>
        <div className="col-span-4 text-right">
          <span className="text-[10px] text-[#767676] truncate block">
            {data.role}
          </span>
        </div>
      </div>

      {/* Green Flash Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#60BA81]/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: isValidated ? "100%" : "-100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {/* Validated badge */}
      {isValidated && (
        <motion.div
          className="absolute top-1 right-1 bg-[#60BA81] text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          ✓ Validated
        </motion.div>
      )}
    </motion.div>
  )
}

// --- MAIN COMPONENT ---

export const SceneUpload = ({ isActive, progress }: { isActive: boolean; progress: number }) => {
  // Phase Logic
  const showIntro = progress < ENHANCED_TIMING.INTRO_END
  const showParticles = progress >= ENHANCED_TIMING.INTRO_PARTICLES
  const isDataPhase = progress >= ENHANCED_TIMING.DATA_APPEAR && progress < ENHANCED_TIMING.API_START
  const isApiPhase = progress >= ENHANCED_TIMING.API_START && progress < ENHANCED_TIMING.API_END
  const showNetworkNodes = progress >= ENHANCED_TIMING.HRMS_CONNECT && progress < ENHANCED_TIMING.HANDSHAKE_START
  const showHandshake = progress >= ENHANCED_TIMING.HANDSHAKE_START && progress < ENHANCED_TIMING.API_END
  const showDataStream = progress >= ENHANCED_TIMING.STREAM_START && progress < ENHANCED_TIMING.INTEGRATION_COMPLETE
  const showCelebration = progress >= ENHANCED_TIMING.CELEBRATION && progress < ENHANCED_TIMING.CELEBRATION + 1
  const isTransferring = progress >= ENHANCED_TIMING.UPLOAD_START && progress < ENHANCED_TIMING.VALIDATION_START
  const isValidating = progress >= ENHANCED_TIMING.VALIDATION_START
  const isComplete = progress >= ENHANCED_TIMING.COMPLETE
  const showFinalCelebration = progress >= ENHANCED_TIMING.FINAL_CELEBRATION

  // Calculate upload progress
  const uploadProgress = Math.min(100, Math.max(0, ((progress - ENHANCED_TIMING.UPLOAD_START) / (ENHANCED_TIMING.VALIDATION_START - ENHANCED_TIMING.UPLOAD_START)) * 100))

  // Validation counter
  const validatedCount = Math.min(
    MOCK_DATA.length,
    Math.max(0, Math.floor((progress - ENHANCED_TIMING.VALIDATION_START) / 0.6))
  )

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center bg-[#F5F5F7] overflow-hidden p-4 md:p-8">

      {/* PARTICLE FIELD BACKGROUND */}
      <ParticleField
        count={60}
        color="#60BA81"
        speed={0.3}
        direction="up"
        active={showParticles}
      />

      {/* BACKGROUND AMBIENCE */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#60BA81]/5 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#284952]/5 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#284952 0.5px, transparent 0.5px)', backgroundSize: '40px 40px', opacity: 0.03 }} />
      </div>

      {/* --- PHASE 1: INTRO TITLE (0s - 2s) --- */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
            transition={{ duration: 0.6 }}
            className="absolute z-30 text-center"
          >
            <motion.span
              className="px-3 py-1 rounded-full border border-[#284952]/10 bg-white/50 text-[#284952] text-[10px] font-bold tracking-widest uppercase mb-3 inline-block backdrop-blur-md"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Module 01
            </motion.span>
            <h1 className="text-4xl md:text-6xl font-bold text-[#284952] tracking-tight leading-tight mt-3">
              {["D", "e", "p", "l", "o", "y", "m", "e", "n", "t"].map((letter, i) => (
                <motion.span
                  key={`d-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60BA81] to-[#284952]">
                {["O", "n", "b", "o", "a", "r", "d", "i", "n", "g"].map((letter, i) => (
                  <motion.span
                    key={`o-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (i + 10) * 0.05, duration: 0.3 }}
                    className="inline-block"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </span>
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN STAGE --- */}
      <motion.div
        className="relative z-20 flex items-center gap-2 md:gap-8 w-full max-w-6xl justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >

        {/* LEFT: CLIENT SIDE */}
        <div className="hidden md:flex flex-col items-end relative shrink-0">
          <GlassPanel className="p-6 w-56 h-80 flex flex-col items-center justify-between relative z-10">
            <div className="w-full flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Building2 size={20} className="text-[#767676]" />
              </div>
              <div className="text-xs font-semibold text-[#767676]">Client Enterprise</div>
            </div>

            {/* Content Area - Only show ONE component at a time */}
            <div className="flex-1 flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                {/* Phase 1: Document Stack (2-5s) */}
                {isDataPhase && (
                  <motion.div
                    key="document-stack"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <DocumentStack
                      progress={progress}
                      startTime={ENHANCED_TIMING.DATA_APPEAR}
                      endTime={ENHANCED_TIMING.API_START}
                    />
                  </motion.div>
                )}

                {/* Phase 2: Network Nodes (5.5-8s) */}
                {showNetworkNodes && !showHandshake && (
                  <motion.div
                    key="network-nodes"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <NetworkNodes active={true} />
                  </motion.div>
                )}

                {/* Phase 3: HRMS System (8-17s, except during data stream) */}
                {isApiPhase && !showNetworkNodes && !showDataStream && (
                  <motion.div
                    key="hrms-system"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <motion.div
                      className="w-20 h-20 bg-[#E6F4EA] rounded-full flex items-center justify-center border-4 border-[#60BA81]/20"
                      animate={{
                        boxShadow: ["0 0 0 0 rgba(96, 186, 129, 0.4)", "0 0 0 20px rgba(96, 186, 129, 0)", "0 0 0 0 rgba(96, 186, 129, 0)"]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Server size={32} className="text-[#60BA81]" />
                    </motion.div>
                    <div className="text-[10px] font-bold text-[#60BA81] bg-white px-2 py-1 rounded shadow-sm">HRMS System</div>
                  </motion.div>
                )}

                {/* Phase 4: Empty state during data stream and after */}
                {(showDataStream || progress >= ENHANCED_TIMING.API_END) && !isValidating && (
                  <motion.div
                    key="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <Building2 size={24} className="text-gray-400" />
                    </div>
                    <p className="text-[9px] text-gray-400">Connected</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="text-center mt-auto">
              <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Source</div>
            </div>
          </GlassPanel>
        </div>

        {/* CENTER: TRANSFER PIPELINE */}
        <div className="hidden md:flex w-20 relative items-center justify-center">
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#60BA81]"
              initial={{ width: "0%" }}
              animate={{ width: (isApiPhase || isTransferring || isValidating) ? "100%" : "0%" }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md border border-gray-100">
            <ArrowRight size={16} className={`text-[#60BA81] transition-opacity ${(isTransferring || isApiPhase) ? 'opacity-100' : 'opacity-30'}`} />
          </div>
        </div>

        {/* RIGHT: FOS VALIDATION ENGINE */}
        <div className="flex-1 max-w-md md:max-w-lg flex flex-col items-start">
          <GlassPanel className={`p-0 w-full h-[26rem] overflow-hidden relative transition-all duration-500 ${isValidating ? 'ring-2 ring-[#60BA81]/30 shadow-2xl shadow-[#60BA81]/10' : ''}`}>

            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 bg-white/50 flex justify-between items-center backdrop-blur-md z-20 relative">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#284952] rounded-lg shadow-lg shadow-[#284952]/20 relative">
                  <ShieldCheck size={20} className="text-white" />
                  {isValidating && !isComplete && (
                    <CircularProgress
                      value={(validatedCount / MOCK_DATA.length) * 100}
                      size={50}
                      strokeWidth={3}
                      color="#60BA81"
                      className="absolute -top-1 -left-1"
                    />
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#284952]">FOS Validator Engine</div>
                  <div className="text-[10px] text-[#60BA81] font-medium flex items-center gap-1">
                    {isComplete ? "Validation Complete" : isValidating ? `Validating... ${validatedCount}/${MOCK_DATA.length}` : "System Idle"}
                  </div>
                </div>
              </div>
              {isValidating && !isComplete && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="bg-[#FFF0E0] p-1.5 rounded-md"
                >
                  <ScanLine size={14} className="text-[#F5A83C]" />
                </motion.div>
              )}
              {isComplete && <div className="bg-[#E6F4EA] p-1 rounded-full"><CheckCircle2 size={16} className="text-[#60BA81]" /></div>}
            </div>

            {/* Column Headers */}
            <div className="px-4 py-2 bg-gray-50/80 border-b border-gray-100 grid grid-cols-12 gap-2 text-[9px] font-bold text-[#767676] uppercase tracking-wider pl-12">
              <div className="col-span-5 flex items-center gap-1"><User size={10} /> Employee</div>
              <div className="col-span-3 flex items-center gap-1"><Hash size={10} /> Dept</div>
              <div className="col-span-4 text-right flex items-center justify-end gap-1"><Briefcase size={10} /> Designation</div>
            </div>

            {/* Content Area */}
            <div className="p-2 space-y-1 relative h-full overflow-hidden">
              {/* Scanner Beam */}
              <AnimatePresence>
                {isValidating && !isComplete && (
                  <motion.div
                    className="absolute left-0 right-0 h-8 bg-gradient-to-b from-[#60BA81]/0 via-[#60BA81]/10 to-[#60BA81]/0 z-20 pointer-events-none border-y border-[#60BA81]/20"
                    initial={{ top: -50 }}
                    animate={{ top: "120%" }}
                    transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                  />
                )}
              </AnimatePresence>

              {/* Data Rows */}
              {isValidating ? (
                <>
                  {MOCK_DATA.map((employee, i) => (
                    <DataRow
                      key={employee.id}
                      data={employee}
                      index={i}
                      isValidated={progress > (ENHANCED_TIMING.VALIDATION_START + (i * 0.6))}
                      progress={progress}
                    />
                  ))}

                  {/* Success Message */}
                  <AnimatePresence>
                    {isComplete && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-4 left-4 right-4 bg-[#284952] text-white p-3 rounded-xl shadow-xl flex items-center justify-between z-40"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-white/20 p-1.5 rounded-full"><Database size={14} /></div>
                          <div className="text-xs">
                            <div className="font-bold">System Ready</div>
                            <div className="text-white/60 text-[10px]">{MOCK_DATA.length} Records Onboarded Successfully</div>
                          </div>
                        </div>
                        <CheckCircle2 size={18} className="text-[#60BA81]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center opacity-40 gap-3">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#284952] flex items-center justify-center">
                    <Server size={24} className="text-[#284952]" />
                  </div>
                  <p className="text-xs font-medium text-center text-[#284952]">Ready for Upload</p>
                </div>
              )}
            </div>

            {/* Upload Progress Bar */}
            {isTransferring && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
                <motion.div
                  className="h-full bg-[#F5A83C]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </GlassPanel>
        </div>

      </motion.div>

      {/* API HANDSHAKE OVERLAY */}
      {showHandshake && <APIHandshake progress={progress} />}

      {/* DATA STREAM OVERLAY */}
      {showDataStream && <DataStream progress={progress} data={MOCK_DATA} />}

      {/* CELEBRATION CONFETTI */}
      <ConfettiBurst trigger={showCelebration} colors={["#60BA81", "#284952", "#F5A83C"]} particleCount={40} />
      <ConfettiBurst trigger={showFinalCelebration} colors={["#60BA81", "#284952", "#F5A83C"]} particleCount={50} />
    </div>
  )
}