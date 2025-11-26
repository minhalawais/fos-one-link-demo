"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Users, 
  LayoutDashboard, 
  ShieldCheck, 
  FileSearch, 
  Lightbulb, 
  Upload, 
  Gavel, 
  Smartphone, 
  Bell, 
  Globe, 
  Route, 
  Mail, 
  CheckCircle2,
  Zap
} from "lucide-react"

// --- CONSTANTS ---
const COLORS = {
  teal: "#284952",
  green: "#60BA81",
  orange: "#F5A83C",
  white: "#FFFFFF",
  gray: "#F5F5F7",
  text: "#4A4A4A"
}

// --- ASSETS: DASHBOARD IMAGE ---
const DashboardAsset = () => (
  <div className="w-full h-full relative overflow-hidden bg-white group">
    {/* Actual dashboard image */}
    <div className="w-full h-full bg-gray-100 relative">
        <img
          src="/assets/training1.jpg"
          alt="Management Dashboard"
          className="w-full h-full object-cover object-top"
        />
        
        {/* "Live" overlay effect to make the static image feel dynamic */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
        
        {/* Scanning Line Animation */}
        <motion.div 
            className="absolute inset-x-0 h-[2px] bg-[#60BA81] shadow-[0_0_10px_#60BA81]"
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
    </div>

    {/* Floating Badge */}
    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[#284952] text-[10px] font-bold px-2 py-1 rounded-full shadow-sm border border-gray-200 flex items-center gap-1">
        <div className="w-1.5 h-1.5 bg-[#60BA81] rounded-full animate-pulse" />
        LIVE VIEW
    </div>
  </div>
)

// --- ASSETS: TRAINING IMAGE ---
const TrainingAsset = () => (
  <div className="w-full h-full relative overflow-hidden bg-white">
    {/* Actual training session image */}
    <div className="w-full h-full relative">
        <img 
          src="/assets/training.jpg" 
          alt="Worker Training Session"
          className="w-full h-full object-cover object-center"
        />
        
        {/* Overlay gradient for better text readability */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
    </div>

    {/* Training session badge */}
    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/20">
        ON-SITE TRAINING
    </div>
  </div>
)

// --- FALLBACK COMPONENTS (in case images don't load) ---
const DashboardFallback = () => (
  <div className="w-full h-full bg-gradient-to-br from-[#284952] to-[#1a2e33] flex items-center justify-center">
    <div className="text-center text-white">
      <LayoutDashboard size={48} className="mx-auto mb-4 opacity-50" />
      <p className="text-sm opacity-70">Dashboard Preview</p>
    </div>
  </div>
)

const TrainingFallback = () => (
  <div className="w-full h-full bg-gradient-to-br from-[#F5A83C] to-[#D48929] flex items-center justify-center">
    <div className="text-center text-white">
      <Users size={48} className="mx-auto mb-4 opacity-50" />
      <p className="text-sm opacity-70">Training Session</p>
    </div>
  </div>
)

// --- ENHANCED ASSET COMPONENTS WITH ERROR HANDLING ---
const SafeDashboardAsset = () => {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return <DashboardFallback />
  }

  return (
    <div className="w-full h-full relative overflow-hidden bg-white group">
      <div className="w-full h-full bg-gray-100 relative">
        <img
          src="/assets/training.jpg"
          alt="Management Dashboard"
          className="w-full h-full object-cover object-top"
          onError={() => setImgError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
        <motion.div 
          className="absolute inset-x-0 h-[2px] bg-[#60BA81] shadow-[0_0_10px_#60BA81]"
          animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[#284952] text-[10px] font-bold px-2 py-1 rounded-full shadow-sm border border-gray-200 flex items-center gap-1">
        <div className="w-1.5 h-1.5 bg-[#60BA81] rounded-full animate-pulse" />
        LIVE VIEW
      </div>
    </div>
  )
}
// Helper component for training flash images
const TrainingFlashImage = ({ src, alt, label, delay, duration }: any) => (
  <motion.div
    key={src}
    className="absolute inset-0 w-full h-full"
    initial={{ opacity: 0, scale: 1.1 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ 
      duration: duration,
      delay: delay,
      ease: "easeInOut"
    }}
  >
    <img 
      src={src} 
      alt={alt}
      className="w-full h-full object-cover"
    />
    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
      <div className="text-white text-sm font-bold">{label}</div>
      <div className="text-white/80 text-xs">Worker Training Session</div>
    </div>
  </motion.div>
)
const SafeTrainingAsset = () => {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return <TrainingFallback />
  }

  return (
    <div className="w-full h-full relative overflow-hidden bg-white">
      <div className="w-full h-full relative">
        <img 
          src="/assets/training.png" 
          alt="Worker Training Session"
          className="w-full h-full object-cover object-center"
          onError={() => setImgError(true)}
        />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/20">
        ON-SITE TRAINING
      </div>
    </div>
  )
}

// --- MODULE PILL COMPONENT ---
const SystemModule = ({ icon: Icon, label, delay, color }: any) => (
  <motion.div
    initial={{ scale: 0, opacity: 0, y: 20 }}
    animate={{ scale: 1, opacity: 1, y: 0 }}
    exit={{ scale: 0, opacity: 0 }}
    transition={{ delay, type: "spring", stiffness: 200, damping: 15 }}
    className="flex flex-col items-center gap-2"
  >
    <div className="w-14 h-14 rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center justify-center border border-gray-100 relative overflow-hidden group hover:scale-110 transition-transform duration-300">
      <div className={`absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity`} style={{ backgroundColor: color }} />
      <Icon size={24} color={color} />
    </div>
    <span className="text-[10px] font-bold text-[#767676] uppercase tracking-wide text-center max-w-[80px] leading-tight">{label}</span>
  </motion.div>
)

export const SceneTraining = ({ isActive }: { isActive: boolean }) => {
  const [phase, setPhase] = useState<"bento" | "walkthrough" | "io" | "ready">("bento")

  // --- TIMELINE ORCHESTRATION ---
  // 71s: Start (Bento Phase)
  // 81s: "Walking everyone through..." (Switch to Ecosystem)
  // 85s: "Finally, investigation officer..." (Switch to IO List)
  // 97s: "Fully functional..." (Switch to Ready State)
  
  useEffect(() => {
    if (isActive) {
      setPhase("bento")
      
      const t1 = setTimeout(() => setPhase("walkthrough"), 10000) // @ 81s
      const t2 = setTimeout(() => setPhase("io"), 14000)          // @ 85s
      const t3 = setTimeout(() => setPhase("ready"), 26000)       // @ 97s

      return () => {
        clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      }
    }
  }, [isActive])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#F5F5F7] relative overflow-hidden font-sans p-4">
      
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F5F7] to-[#E3E3E8]" />
      
      <AnimatePresence mode="wait">

        {/* ==========================================================
            PHASE 1A: DEPLOYMENT BENTO GRID (71s - 81s)
            VO: "Visits facility... training workers... briefing management..."
           ========================================================== */}
       {phase === "bento" && (
  <motion.div
    key="bento"
    className="w-full max-w-5xl h-[80%] grid grid-cols-12 grid-rows-2 gap-4 z-10"
    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
    transition={{ duration: 0.5 }}
  >
     {/* TILE 1: WORKER TRAINING (Small) */}
     <motion.div
        className="col-span-4 row-span-2 bg-white rounded-[2rem] shadow-xl overflow-hidden relative border border-white/50"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
     >
        {/* Rapid Flash Training Images */}
        <div className="w-full h-full relative">
          <AnimatePresence mode="wait">
            {/* Rapid cycling through training images */}
            <TrainingFlashImage 
              src="/assets/training.jpg"
              alt="Group Training"
              label="Group Orientation"
              delay={0}
              duration={1.5}
            />
            <TrainingFlashImage 
              src="/assets/training1.jpg"
              alt="One-on-One"
              label="Individual Guidance"
              delay={1.5}
              duration={1.5}
            />
            <TrainingFlashImage 
              src="/assets/training2.jpg"
              alt="App Demo"
              label="App Demonstration"
              delay={3}
              duration={1.5}
            />
            <TrainingFlashImage 
              src="/assets/training3.jpg"
              alt="Q&A Session"
              label="Q&A Session"
              delay={4.5}
              duration={1.5}
            />
            <TrainingFlashImage 
              src="/assets/training1.jpg"
              alt="Facilitation"
              label="Active Facilitation"
              delay={6}
              duration={1.5}
            />
          </AnimatePresence>

          {/* Training Status Overlay */}
          <div className="absolute top-4 left-4 bg-[#F5A83C]/90 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
            MULTI-SESSION
          </div>

          {/* Progress Dots */}
          <div className="absolute top-4 right-4 flex gap-1">
            {[1, 2, 3, 4, 5, 6].map((dot) => (
              <motion.div
                key={dot}
                className="w-1.5 h-1.5 rounded-full bg-white/80"
                animate={{ 
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: (dot - 1) * 1.5 
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Mobile App Notification Popup */}
        <motion.div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-white/95 backdrop-blur rounded-xl p-3 shadow-2xl border border-gray-200"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 2.5, type: "spring", damping: 15 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#284952] rounded-lg flex items-center justify-center text-white">
              <Smartphone size={16} />
            </div>
            <div>
              <div className="text-[10px] text-gray-500 font-semibold uppercase">FOS Mobile App</div>
              <div className="text-xs font-bold text-[#17161A]">New Report Submitted</div>
            </div>
          </div>
        </motion.div>
     </motion.div>

     {/* TILE 2: MANAGEMENT DASHBOARD (Large) */}
     <motion.div
        className="col-span-8 row-span-2 bg-white rounded-[2rem] shadow-xl overflow-hidden relative border border-white/50 group"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
     >
        <SafeDashboardAsset />
        
        {/* Text Overlay appearing when VO mentions "Management" */}
        <motion.div 
            className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#284952]/90 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6, duration: 1 }}
        >
           <h3 className="text-white text-xl font-bold flex items-center gap-2">
              <LayoutDashboard size={20} className="text-[#60BA81]" />
              On-Site Sessions
           </h3>
           <p className="text-white/70 text-sm mt-1">WalkThrough of the System</p>
        </motion.div>
     </motion.div>
  </motion.div>
)}

        {/* ==========================================================
            PHASE 1B: SYSTEM WALKTHROUGH (81s - 85s)
            VO: "Walking everyone through the entire system"
           ========================================================== */}
        {phase === "walkthrough" && (
          <motion.div
             key="walkthrough"
             className="absolute inset-0 flex items-center justify-center z-20"
             exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
             transition={{ duration: 0.4 }}
          >
             {/* Central Hub */}
             <motion.div 
                className="relative w-32 h-32 bg-[#284952] rounded-full flex items-center justify-center shadow-2xl z-10"
                layoutId="hub"
             >
                <Globe size={48} className="text-white" />
                <div className="absolute inset-0 border-2 border-dashed border-white/20 rounded-full animate-[spin_10s_linear_infinite]" />
             </motion.div>

             {/* Orbiting Modules */}
             <div className="absolute w-[600px] h-32 flex items-center justify-between px-4">
                 <SystemModule icon={Smartphone} label="Mobile App" color={COLORS.green} delay={0.1} />
                 <SystemModule icon={Route} label="Complaint Routing" color={COLORS.orange} delay={0.2} />
                 <div className="w-24" /> {/* Spacer for Hub */}
                 <SystemModule icon={Mail} label="Email Notifs" color={COLORS.green} delay={0.3} />
                 <SystemModule icon={LayoutDashboard} label="Admin Dashboard" color={COLORS.orange} delay={0.4} />
             </div>
             
             {/* Top Floating Module */}
             <div className="absolute top-1/4">
                <SystemModule icon={ShieldCheck} label="IO Portal" color={COLORS.teal} delay={0.5} />
             </div>
          </motion.div>
        )}

        {/* ==========================================================
            PHASE 2: I.O. TRAINING CERTIFICATION (85s - 97s)
            VO: "Validate complaints, CAPA, Evidence, Close Cases"
           ========================================================== */}
        {phase === "io" && (
          <motion.div
            key="io"
            className="w-full max-w-2xl z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
             <div className="text-center mb-8">
                <div className="inline-flex p-3 bg-white rounded-2xl shadow-lg mb-4">
                    <Gavel size={32} className="text-[#284952]" />
                </div>
                <h2 className="text-3xl font-bold text-[#284952]">I.O. Certification</h2>
             </div>

             <div className="bg-white rounded-3xl shadow-2xl border border-white/60 overflow-hidden">
                <IOSkillRow 
                   icon={FileSearch} 
                   text="Validate Complaints" 
                   timestamp={1.5} // Relative to phase start (85s) -> ~86.5s
                   color={COLORS.teal} 
                />
                <IOSkillRow 
                   icon={Lightbulb} 
                   text="Build CAPA Plans" 
                   timestamp={4.0} // ~89s
                   color={COLORS.green} 
                />
                <IOSkillRow 
                   icon={Upload} 
                   text="Evidence Upload" 
                   timestamp={6.0} // ~91s
                   color={COLORS.orange} 
                />
                <IOSkillRow 
                   icon={CheckCircle2} 
                   text="Case Closure" 
                   timestamp={8.0} // ~93s
                   color={COLORS.teal} 
                   isLast
                />
             </div>
          </motion.div>
        )}

        {/* ==========================================================
            PHASE 3: SYSTEM READY (97s - 102s)
            VO: "Fully functional from day one"
           ========================================================== */}
        {phase === "ready" && (
          <motion.div
             key="ready"
             className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#284952]"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1 }}
          >
              <motion.div
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ type: "spring", stiffness: 200, damping: 20 }}
                 className="w-24 h-24 bg-[#60BA81] rounded-full flex items-center justify-center shadow-[0_0_50px_#60BA81]"
              >
                 <Zap size={48} className="text-white fill-white" />
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white text-4xl font-bold mt-8 tracking-tight"
              >
                System Active
              </motion.h1>
              
              <motion.p 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 0.8 }}
                 transition={{ delay: 1 }}
                 className="text-white/70 mt-2 text-lg"
              >
                 Functional from Day One
              </motion.p>

              {/* Expanding Pulse Rings */}
              {[1, 2, 3].map((i) => (
                <motion.div
                   key={i}
                   className="absolute w-24 h-24 rounded-full border border-[#60BA81]/30"
                   animate={{ scale: [1, 4], opacity: [1, 0] }}
                   transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                />
              ))}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}

// --- HELPER: IO SKILL ROW ---
const IOSkillRow = ({ icon: Icon, text, timestamp, color, isLast }: any) => {
  return (
    <div className={`relative p-5 flex items-center gap-4 ${!isLast ? 'border-b border-gray-100' : ''}`}>
       <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 shrink-0">
          <Icon size={18} color={color} />
       </div>
       
       <div className="flex-1 font-semibold text-[#17161A] text-lg">{text}</div>
       
       {/* Toggle Switch Animation */}
       <motion.div 
         className="w-12 h-7 rounded-full bg-gray-200 p-1 flex items-center"
         initial={{ backgroundColor: "#E5E7EB" }}
         animate={{ backgroundColor: "#60BA81" }}
         transition={{ delay: timestamp, duration: 0.5 }}
       >
          <motion.div 
             className="w-5 h-5 bg-white rounded-full shadow-sm"
             initial={{ x: 0 }}
             animate={{ x: 20 }}
             transition={{ delay: timestamp, type: "spring", stiffness: 300, damping: 20 }}
          />
       </motion.div>
    </div>
  )
}