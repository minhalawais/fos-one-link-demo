"use client"

import { motion, AnimatePresence } from "framer-motion"
import { 
  ShieldCheck, 
  FileSignature, 
  CheckCircle2, 
  Building2, 
  Users, 
  AlertTriangle,
  BadgeCheck,
  Fingerprint
} from "lucide-react"

// --- THEME ---
const COLORS = {
  Teal: "#284952",
  Green: "#60BA81",
  Orange: "#F5A83C",
  Charcoal: "#17161A",
  White: "#FFFFFF",
  GlassBorder: "rgba(255, 255, 255, 0.6)",
  GlassBg: "rgba(255, 255, 255, 0.65)",
}

// --- COMPONENTS ---

// 1. The ID Card (The "Hero" Element)
const OfficerBadge = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  color, 
  accentColor,
  delay = 0,
  scale = 1,
  layoutId
}: any) => (
  <motion.div
    layoutId={layoutId}
    initial={{ opacity: 0, scale: 0.8, y: 20, rotateX: 10 }}
    animate={{ opacity: 1, scale: scale, y: 0, rotateX: 0 }}
    className="relative flex flex-col items-center overflow-hidden bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] rounded-[1.5rem] w-48 aspect-[3/4] z-10"
    style={{ transformStyle: "preserve-3d" }}
    transition={{ delay, type: "spring", stiffness: 100, damping: 20 }}
  >
    {/* Decorative Header */}
    <div className="absolute top-0 inset-x-0 h-24 opacity-10" style={{ background: color }} />
    
    {/* Avatar Section */}
    <div className="mt-8 relative mb-4">
       <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg text-white relative z-10"
            style={{ background: `linear-gradient(135deg, ${color}, ${accentColor})` }}>
          <Icon size={32} strokeWidth={2} />
       </div>
       {/* Animated Ring */}
       <motion.div 
         className="absolute inset-0 rounded-2xl z-0"
         style={{ border: `2px solid ${color}` }}
         animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
         transition={{ duration: 2, repeat: Infinity }}
       />
    </div>

    {/* Text Info */}
    <div className="flex-1 flex flex-col items-center px-4 text-center space-y-1">
      <h3 className="text-sm font-bold text-[#284952] leading-tight">{title}</h3>
      <p className="text-[10px] font-medium text-[#767676] uppercase tracking-wide">{subtitle}</p>
      
      {/* Micro UI Elements */}
      <div className="mt-auto mb-6 w-full space-y-2">
         <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full rounded-full"
              style={{ background: COLORS.Green }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: delay + 0.5, duration: 1.5 }}
            />
         </div>
         <div className="flex justify-between items-center text-[8px] text-gray-400 font-mono">
            <span className="flex items-center gap-1"><Fingerprint size={8} /> VERIFIED</span>
            <span>ID: 8092</span>
         </div>
      </div>
    </div>
  </motion.div>
)

// 2. Action Indicators (Floating Glass Pills)
const TaskPill = ({ icon: Icon, label, align, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, x: align === 'left' ? 20 : -20, scale: 0.8 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    transition={{ delay, type: "spring", stiffness: 120 }}
    className={`
      absolute top-1/2 -translate-y-1/2 
      ${align === 'left' ? 'right-[55%]' : 'left-[55%]'}
      flex items-center gap-3 p-3 rounded-2xl
      bg-white/80 backdrop-blur-xl border border-white
      shadow-lg z-20 min-w-[140px]
    `}
  >
    <div className={`p-2 rounded-full ${align === 'left' ? 'bg-[#60BA81]/10 text-[#60BA81]' : 'bg-[#F5A83C]/10 text-[#F5A83C]'}`}>
      <Icon size={18} />
    </div>
    <div className="flex flex-col">
       <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Status</span>
       <span className="text-xs font-bold text-[#284952]">{label}</span>
    </div>
  </motion.div>
)

export const SceneOfficers = ({ isActive }: { isActive: boolean }) => {
  // Voiceover Timing Logic Map (approximate based on script)
  // 0s - 5s: Intro Officer (VO: 43-48)
  // 5s - 10s: Duties (VO: 48-53)
  // 10s+: Split (VO: 53-61)
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#F5F5F7] relative overflow-hidden">
      
      {/* Background Ambience (Subtle Apple-style Mesh) */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#60BA81]/10 blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#284952]/10 blur-[80px]" />
      </div>

      {/* Main Content Container - Fits Slider Aspect Ratio */}
      <div className="relative w-full max-w-2xl h-full flex items-center justify-center p-8 perspective-[1000px]">
        
        {/* PHASE 1 & 2: SINGLE OFFICER & DUTIES */}
        {/* We keep this visible until the split happens around 10s (approx 53s global time) */}
        <motion.div 
           className="absolute inset-0 flex items-center justify-center"
           animate={{ 
             opacity: [0, 1, 1, 0], 
             scale: [0.9, 1, 1, 1.1],
             filter: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(8px)"]
           }}
           transition={{ 
             times: [0, 0.1, 0.8, 1], 
             duration: 10, // Visible for first 10 seconds of scene
             ease: "easeInOut" 
           }}
        >
           <div className="relative">
              {/* Central Card */}
              <OfficerBadge 
                icon={BadgeCheck}
                title="Investigation Officer"
                subtitle="Authorized Personnel"
                color={COLORS.Teal}
                accentColor={COLORS.Green}
                delay={0.2}
                layoutId="main-card"
              />

              {/* Task: Resolving (Appears at ~5s mark in global relative time) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5, duration: 0.5 }} // Sync with "Resolving" audio
              >
                <TaskPill icon={CheckCircle2} label="Resolving" align="left" delay={3.5} />
              </motion.div>

              {/* Task: Documenting */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.5, duration: 0.5 }} // Sync with "Documenting" audio
              >
                <TaskPill icon={FileSignature} label="Documenting" align="right" delay={4.5} />
              </motion.div>
           </div>
        </motion.div>


        {/* PHASE 3: THE SPLIT (Different Units/Genders) */}
        {/* Starts appearing at 10s (VO: "Different units, genders...") */}
        <motion.div 
           className="absolute inset-0 flex items-center justify-center"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 9.5, duration: 0.8 }}
        >
           <div className="flex gap-4 md:gap-6 items-center justify-center">
              
              {/* Left: Unit Officer */}
              <motion.div
                initial={{ x: 50, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 0.9 }}
                transition={{ delay: 10, type: "spring", stiffness: 80 }}
                className="hidden md:block origin-right"
              >
                 <OfficerBadge 
                    icon={Building2}
                    title="Unit Officer"
                    subtitle="Location A"
                    color={COLORS.Teal}
                    accentColor="#3b6b78"
                    scale={0.9}
                    delay={10}
                 />
              </motion.div>

              {/* Center: Gender Specialist (Prominent) */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 10.2, type: "spring", stiffness: 100 }}
                className="z-20 shadow-2xl"
              >
                 <OfficerBadge 
                    icon={Users}
                    title="Gender Specialist"
                    subtitle="Inclusivity Lead"
                    color={COLORS.Orange}
                    accentColor="#ffc978"
                    scale={1.1} // Slightly larger
                    delay={10.2}
                 />
              </motion.div>

              {/* Right: Category Lead */}
              <motion.div
                initial={{ x: -50, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 0.9 }}
                transition={{ delay: 10.4, type: "spring", stiffness: 80 }}
                className="hidden md:block origin-left"
              >
                 <OfficerBadge 
                    icon={AlertTriangle}
                    title="Category Lead"
                    subtitle="Safety Dept"
                    color={COLORS.Green}
                    accentColor="#8be3ab"
                    scale={0.9}
                    delay={10.4}
                 />
              </motion.div>
           </div>
        </motion.div>
        
        {/* Connection Lines Background for Phase 3 */}
        <motion.svg 
          className="absolute inset-0 w-full h-full pointer-events-none -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 10.5 }}
        >
           <path d="M 50% 50% L 20% 50%" stroke={COLORS.Teal} strokeWidth="2" strokeDasharray="6 6" fill="none" />
           <path d="M 50% 50% L 80% 50%" stroke={COLORS.Teal} strokeWidth="2" strokeDasharray="6 6" fill="none" />
        </motion.svg>

      </div>

      {/* Footer / Context Indicator */}
      <motion.div 
        className="absolute bottom-6 flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-md rounded-full border border-white/40"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <ShieldCheck size={14} className="text-[#284952]" />
        <span className="text-[10px] font-bold text-[#284952] uppercase tracking-wider">
          FOS Investigation Framework
        </span>
      </motion.div>

    </div>
  )
}