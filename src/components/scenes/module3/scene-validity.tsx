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
  ArrowRight
} from "lucide-react"

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

export function SceneValidity({ isActive }: { isActive: boolean }) {
  const [stage, setStage] = useState(0)

  // Timeline mapped to 14-second flow based on Voiceover cues
  // 0s: Scanning (Assessment)
  // 4.5s: Verdict (Valid/Invalid)
  // 7.5s: Evidence (Ingestion)
  // 11.5s: Documentation (RCA)
  
  useEffect(() => {
    if (isActive) {
      setStage(0)
      const timers = [
        setTimeout(() => setStage(1), 4500),   // Reveal Options
        setTimeout(() => setStage(2), 7500),   // Ingest Evidence
        setTimeout(() => setStage(3), 11500),  // Create Document
      ]
      return () => timers.forEach(clearTimeout)
    } else {
      setStage(0)
    }
  }, [isActive])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden font-sans select-none bg-[#F5F5F7]">
      
      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#60BA81]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#284952]/10 rounded-full blur-[100px]" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: `linear-gradient(${COLORS.primary} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.primary} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
        />
      </div>

      {/* --- Header Context --- */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-8 z-20 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-gray-100">
           <Scale size={18} className="text-[#284952]" />
        </div>
        <div>
          <h2 className="text-xs font-bold text-[#284952] uppercase tracking-widest opacity-70">Investigation</h2>
          <h1 className="text-lg font-semibold text-[#17161A]">Validity Assessment</h1>
        </div>
      </motion.div>

      {/* --- Main Interactive Stage --- */}
      <div className="relative z-10 w-full max-w-3xl h-[400px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          
          {/* STAGE 0: THE SCANNER (0s - 4.5s) */}
          {stage === 0 && (
            <motion.div
              key="scanner"
              layoutId="hero-container"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-72 h-80 bg-white/80 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/50 flex flex-col items-center justify-center overflow-hidden"
            >
               {/* Scanning Light */}
               <motion.div 
                 animate={{ top: ["-10%", "110%"] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-[#60BA81]/30 to-transparent z-10"
               />
               
               <div className="relative z-20 flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-[#F5F5F7] flex items-center justify-center shadow-inner relative">
                     <Fingerprint size={40} className="text-[#284952] opacity-50" />
                     {/* Pulsing Dots */}
                     <motion.div 
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute w-full h-full rounded-2xl border-2 border-[#60BA81]"
                     />
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-[#17161A]">Assessing Complaint</h3>
                    <p className="text-[10px] text-[#767676] mt-1">Cross-referencing logic...</p>
                  </div>
               </div>
            </motion.div>
          )}

          {/* STAGE 1 & 2: THE DECISION & EVIDENCE (4.5s - 11.5s) */}
          {(stage === 1 || stage === 2) && (
            <div className="flex gap-6 items-center">
               
               {/* Non-Selected Options (Fade out/Back) */}
               {stage === 1 && (
                 <>
                   <GlassCard icon={AlertTriangle} color={COLORS.warning} label="Partial" delay={0.1} />
                   <GlassCard icon={XCircle} color={COLORS.textSec} label="Invalid" delay={0.2} />
                 </>
               )}

               {/* The Hero Card: VALID */}
               <motion.div
                 layoutId="hero-container"
                 className="relative bg-white rounded-[32px] shadow-2xl border border-[#60BA81]/20 flex flex-col items-center overflow-hidden"
                 initial={{ width: 200, height: 240 }}
                 animate={{ 
                   width: stage === 2 ? 340 : 220, 
                   height: stage === 2 ? 380 : 260,
                   borderColor: stage === 2 ? COLORS.success : "rgba(255,255,255,0.5)"
                 }}
                 transition={SPRING}
               >
                  {/* Status Header */}
                  <div className="w-full flex flex-col items-center pt-8 pb-4 z-20">
                    <motion.div 
                      layout
                      className="w-16 h-16 rounded-full bg-[#60BA81] flex items-center justify-center shadow-lg text-white mb-3"
                    >
                      <CheckCircle2 size={32} />
                    </motion.div>
                    <motion.h2 layout className="text-xl font-bold text-[#284952]">Valid</motion.h2>
                    <motion.span layout className="text-[10px] text-[#767676] uppercase tracking-wide">Confirmed</motion.span>
                  </div>

                  {/* Evidence List (Appears in Stage 2) */}
                  {stage === 2 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="w-full px-6 flex flex-col gap-3 mt-2"
                    >
                       <EvidenceItem icon={Users} label="Worker Testimony" delay={0.2} />
                       <EvidenceItem icon={Database} label="System Records" delay={0.4} />
                       <EvidenceItem icon={Search} label="Physical Evidence" delay={0.6} />
                    </motion.div>
                  )}
                  
                  {/* Background Accents */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#60BA81]/5 z-0" />
               </motion.div>

            </div>
          )}

          {/* STAGE 3: THE DOCUMENT (11.5s+) */}
          {stage === 3 && (
            <motion.div
              layoutId="hero-container"
              className="bg-white rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-[#DEE2E6] overflow-hidden flex flex-col"
              initial={{ width: 340, height: 380 }}
              animate={{ width: 400, height: 480 }}
              transition={SPRING}
            >
              {/* Doc Header */}
              <div className="h-12 bg-gray-50 border-b border-gray-100 flex items-center justify-between px-4">
                 <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                 </div>
                 <span className="text-[9px] font-bold text-[#284952] uppercase tracking-wider">Root Cause Analysis</span>
              </div>

              {/* Doc Body */}
              <div className="flex-1 p-8 relative">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                       <CheckCircle2 size={18} className="text-[#60BA81]" />
                    </div>
                    <div>
                       <div className="text-sm font-bold text-[#17161A]">Complaint Validated</div>
                       <div className="text-[10px] text-[#767676]">Case ID: #FOS-2921</div>
                    </div>
                 </div>

                 {/* Simulated Typing Text */}
                 <div className="space-y-3">
                    <TypingLine width="100%" delay={0.5} />
                    <TypingLine width="90%" delay={0.8} />
                    <TypingLine width="95%" delay={1.1} />
                    <TypingLine width="60%" delay={1.4} />
                 </div>

                 {/* Signature Block */}
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 2 }}
                   className="mt-8 pt-6 border-t border-dashed border-gray-200"
                 >
                    <div className="flex justify-between items-end">
                       <div>
                          <div className="text-[9px] text-[#767676] uppercase">Investigation Officer</div>
                          <div className="font-handwriting text-lg text-[#284952] opacity-80 mt-1">Signed...</div>
                       </div>
                       <div className="px-3 py-1 bg-[#284952] text-white text-[10px] rounded-md font-medium">
                          Filed to RCA
                       </div>
                    </div>
                 </motion.div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  )
}

// --- Supporting Components ---

// 1. Ghost Cards for invalid options
function GlassCard({ icon: Icon, color, label, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: -20 }}
      animate={{ opacity: 0.5, scale: 0.9, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
      transition={{ delay }}
      className="w-40 h-56 rounded-[24px] bg-white/40 border border-white/60 flex flex-col items-center justify-center grayscale"
    >
       <div className="w-12 h-12 rounded-full bg-white/50 flex items-center justify-center mb-3">
          <Icon size={24} color={color} />
       </div>
       <span className="text-sm font-medium text-gray-500">{label}</span>
    </motion.div>
  )
}

// 2. Evidence Items that "fly in"
function EvidenceItem({ icon: Icon, label, delay }: any) {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay }}
      className="flex items-center gap-3 p-3 rounded-xl bg-[#F5F5F7] hover:bg-white transition-colors border border-transparent hover:border-[#60BA81]/30 group"
    >
      <div className="p-2 bg-white rounded-lg shadow-sm text-[#284952] group-hover:text-[#60BA81] transition-colors">
         <Icon size={16} />
      </div>
      <div className="flex-1">
         <div className="text-xs font-semibold text-[#17161A]">{label}</div>
         <div className="text-[9px] text-[#767676]">Verified Source</div>
      </div>
      <CheckCircle2 size={14} className="text-[#60BA81]" />
    </motion.div>
  )
}

// 3. Simulated Typing Lines
function TypingLine({ width, delay }: { width: string, delay: number }) {
   return (
      <motion.div 
         initial={{ width: 0 }}
         animate={{ width }}
         transition={{ duration: 1, delay, ease: "easeOut" }}
         className="h-2 bg-gray-100 rounded-full"
      />
   )
}