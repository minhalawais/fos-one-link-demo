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

// --- TYPES & CONSTANTS ---
// Adjusted Timing for 12s Total Limit
const TIMING = {
  INTRO: 0,
  DATA_APPEAR: 2.5,      // "We begin by registering..."
  TRANSFER_START: 5.5,   // "Companies simply share..."
  VALIDATION_START: 7.2, // "...uploads and validates..."
  COMPLETE: 10.8         // "...system is ready."
}

// Realistic Pakistani Employee Data
const MOCK_DATA = [
  { id: "EMP-204", name: "Zara Sheikh", dept: "Production", role: "Line Manager" },
  { id: "EMP-205", name: "Usman Ali", dept: "Logistics", role: "Supply Officer" },
  { id: "EMP-206", name: "Fatima Bibi", dept: "Textile", role: "Stitching Lead" },
  { id: "EMP-207", name: "Hassan Raza", dept: "Quality", role: "Senior Auditor" },
];

// --- SUB-COMPONENTS ---

// 1. The Glass Container
const GlassPanel = ({ children, className = "", scale = 1 }: { children: React.ReactNode, className?: string, scale?: number }) => (
  <motion.div 
    animate={{ scale }}
    transition={{ type: "spring", stiffness: 200, damping: 20 }}
    className={`bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] rounded-3xl ${className}`}
  >
    {children}
  </motion.div>
);

// 2. The Detailed Data Row (Table Row)
const DataRow = ({ data, index, isValidated }: { data: any, index: number, isValidated: boolean }) => (
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
      ) : (
        <div className="w-2 h-2 rounded-full bg-gray-400" />
      )}
    </div>
    
    {/* Data Columns */}
    <div className="flex-1 grid grid-cols-12 gap-2 items-center">
        {/* Name & ID */}
        <div className="col-span-5 flex flex-col justify-center">
            <span className={`text-xs font-bold leading-tight ${isValidated ? 'text-[#284952]' : 'text-gray-600'}`}>
                {data.name}
            </span>
            <span className="text-[9px] text-gray-400 font-mono">{data.id}</span>
        </div>

        {/* Dept */}
        <div className="col-span-3">
             <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-md truncate block">
                {data.dept}
             </span>
        </div>

        {/* Designation */}
        <div className="col-span-4 text-right">
            <span className="text-[10px] text-[#767676] truncate block">
                {data.role}
            </span>
        </div>
    </div>

    {/* Green Flash Overlay upon validation */}
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-transparent via-[#60BA81]/20 to-transparent"
      initial={{ x: "-100%" }}
      animate={{ x: isValidated ? "100%" : "-100%" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    />
  </motion.div>
);

// --- MAIN COMPONENT ---

export const SceneUpload = ({ isActive, progress }: { isActive: boolean; progress: number }) => {
  
  // Phase Logic
  const showIntro = progress < TIMING.DATA_APPEAR;
  const isTransferring = progress >= TIMING.TRANSFER_START && progress < TIMING.VALIDATION_START;
  const isValidating = progress >= TIMING.VALIDATION_START;
  const isComplete = progress >= TIMING.COMPLETE;

  // Calculate generic progress for bars
  const uploadProgress = Math.min(100, Math.max(0, ((progress - TIMING.TRANSFER_START) / (TIMING.VALIDATION_START - TIMING.TRANSFER_START)) * 100));

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center bg-[#F5F5F7] overflow-hidden p-4 md:p-8">
      
      {/* BACKGROUND AMBIENCE */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#60BA81]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#284952]/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#284952 0.5px, transparent 0.5px)', backgroundSize: '40px 40px', opacity: 0.03 }} />
      </div>

      {/* --- PHASE 1: INTRO TITLE (0s - 2.5s) --- */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
            transition={{ duration: 0.6 }}
            className="absolute z-30 text-center"
          >
            <span className="px-3 py-1 rounded-full border border-[#284952]/10 bg-white/50 text-[#284952] text-[10px] font-bold tracking-widest uppercase mb-3 inline-block backdrop-blur-md">
              Module 01
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-[#284952] tracking-tight leading-tight">
              Deployment &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60BA81] to-[#284952]">
                Onboarding
              </span>
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN STAGE (2.5s - 12s) --- */}
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
            
            {/* The File Object */}
            <AnimatePresence>
              {!isValidating && (
                <motion.div
                  layoutId="dataFile"
                  className="bg-white border border-[#E1E4E8] shadow-lg rounded-xl p-3 w-40 flex items-center gap-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: isTransferring ? 350 : "-50%", // Move to center
                    opacity: isTransferring ? 0 : 1 // Fade out into validator
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 70, 
                    damping: 14,
                    opacity: { duration: 0.3, delay: isTransferring ? 0.3 : 0 }
                  }}
                >
                  <div className="bg-[#E6F4EA] p-2 rounded-lg">
                    <FileSpreadsheet size={20} className="text-[#60BA81]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#284952]">Pak_Region_1.csv</div>
                    <div className="text-[9px] text-[#767676]">12KB • CSV</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
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
                animate={{ width: isTransferring || isValidating ? "100%" : "0%" }}
                transition={{ duration: 0.6 }}
             />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md border border-gray-100">
             <ArrowRight size={16} className={`text-[#60BA81] transition-opacity ${isTransferring ? 'opacity-100' : 'opacity-30'}`} />
          </div>
        </div>

        {/* RIGHT: FOS VALIDATION ENGINE */}
        <div className="flex-1 max-w-md md:max-w-lg flex flex-col items-start">
          <GlassPanel className={`p-0 w-full h-[26rem] overflow-hidden relative transition-all duration-500 ${isValidating ? 'ring-2 ring-[#60BA81]/30 shadow-2xl shadow-[#60BA81]/10' : ''}`}>
             
             {/* Header */}
             <div className="px-5 py-4 border-b border-gray-100 bg-white/50 flex justify-between items-center backdrop-blur-md z-20 relative">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-[#284952] rounded-lg shadow-lg shadow-[#284952]/20">
                      <ShieldCheck size={20} className="text-white" />
                   </div>
                   <div>
                      <div className="text-xs font-bold text-[#284952]">FOS Validator Engine</div>
                      <div className="text-[10px] text-[#60BA81] font-medium flex items-center gap-1">
                        {isComplete ? "Validation Complete" : isValidating ? "Importing Data..." : "System Idle"}
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

             {/* Content Area (Rows) */}
             <div className="p-2 space-y-1 relative h-full overflow-hidden">
                {/* The "Scanner" Beam */}
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

                {/* Data Rows Appearing */}
                {isValidating ? (
                  <>
                     {MOCK_DATA.map((employee, i) => (
                       <DataRow 
                          key={employee.id} 
                          data={employee}
                          index={i} 
                          isValidated={progress > (TIMING.VALIDATION_START + (i * 0.6))} // Faster validation staggering
                       />
                     ))}
                     
                     {/* Success Message Overlay */}
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
                                  <div className="text-white/60 text-[10px]">Records Onboarded Successfully</div>
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

             {/* Progress Bar (During Transfer) */}
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
    </div>
  )
}