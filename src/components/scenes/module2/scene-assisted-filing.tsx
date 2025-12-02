"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import {
  Phone,
  MessageCircle,
  Mail,
  Headset,
  Calendar,
  HardHat,
  Users,
  Baby,
  DollarSign,
  Clock,
  AlertTriangle,
  Scale,
  Briefcase,
  Globe,
  ShieldAlert,
  Gavel,
  MessageSquareQuote,
  CheckCircle2,
  UploadCloud,
  User,
  Building,
  Smartphone,
  Wifi,
  Lock
} from "lucide-react"

// --- CONSTANTS ---
const ASSETS = {
  worker: "/assets/avatars/worker_calling.png",
  officer: "/assets/avatars/fos_grievance_officer_complaint.png",
}

const PALETTE = {
  teal: "#284952",
  green: "#60BA81",
  orange: "#F5A83C",
  white: "#FFFFFF",
  grayBg: "#F5F5F7",
  charcoal: "#17161A",
  border: "#DEE2E6",
  textGray: "#767676",
  softGreen: "rgba(96, 186, 129, 0.42)"
}

const IOS_EASE = [0.16, 1, 0.3, 1] // Apple-style spring ease

const COMPLAINT_CATEGORIES = [
  { icon: HardHat, label: "Workplace Health, Safety" },
  { icon: Users, label: "Freedom of Association" },
  { icon: Baby, label: "Child Labor" },
  { icon: DollarSign, label: "Wages & Benefits" },
  { icon: Clock, label: "Working Hours" },
  { icon: AlertTriangle, label: "Forced Labor" },
  { icon: Scale, label: "Discrimination" },
  { icon: Briefcase, label: "Unfair Employment" },
  { icon: Globe, label: "Ethical Business" },
  { icon: ShieldAlert, label: "Harassment" },
  { icon: Gavel, label: "Workplace Discipline" },
  { icon: MessageSquareQuote, label: "Employee Feedback" },
]

interface FormDataState {
  fosId: string
  name: string
  company: string
  workerType: string
  department: string
  designation: string
  gender: string
  mobile: string
  date: string
  additionalComments: string
  complaintAgainst: string
  concernedDept: string
  history: string
  solution: string
}

// --- SUB-COMPONENTS ---

const DataWave = ({ color, direction = "right" }: { color: string, direction?: "left" | "right" }) => (
  <div className="flex gap-1.5 items-center justify-center overflow-hidden w-24">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: color }}
        animate={{
          scale: [0.8, 1.4, 0.8],
          opacity: [0.3, 1, 0.3],
          x: direction === "right" ? [0, 10, 0] : [0, -10, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: i * 0.2,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
)

const SpeakingPulse = ({ color }: { color: string }) => (
  <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
    {[1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="absolute w-full h-full rounded-full border-2 opacity-0"
        style={{ borderColor: color }}
        animate={{
          scale: [1, 1.5],
          opacity: [0.6, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.6,
          ease: "easeOut"
        }}
      />
    ))}
  </div>
)

const FormField = ({ label, children, delay = 0, className = "" }: { label: string, children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: IOS_EASE }}
    className={`flex flex-col gap-1.5 ${className}`}
  >
    <label className="text-[10px] font-bold text-[#17161A] ml-1">{label}</label>
    {children}
  </motion.div>
)

const FormInput = ({ value, isTyping, placeholder, icon, className = "", multiline = false }: { value: string, isTyping?: boolean, placeholder: string, icon?: React.ReactNode, className?: string, multiline?: boolean }) => (
  <div className={`relative group ${className}`}>
    <motion.div
      className={`
        w-full px-3 py-2.5 rounded-lg text-xs transition-all duration-300 border
        flex ${multiline ? 'items-start' : 'items-center'}
        ${value
          ? "bg-white border-[#60BA81]/50 shadow-[0_2px_12px_-4px_rgba(96,186,129,0.2)] text-[#17161A]"
          : "bg-white border-[#DEE2E6] text-[#767676]"
        }
        ${multiline ? 'h-20' : ''}
      `}
    >
      <span className={`flex-1 font-medium ${multiline ? 'whitespace-pre-wrap' : 'truncate'}`}>{value || placeholder}</span>
      {isTyping && (
        <motion.span
          className="w-0.5 h-3 bg-[#60BA81] ml-1 rounded-full shrink-0"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ marginTop: multiline ? '4px' : '0' }}
        />
      )}
    </motion.div>
    {icon && <div className={`absolute right-3 ${multiline ? 'top-3' : 'top-1/2 -translate-y-1/2'} text-[#284952]/40`}>{icon}</div>}
  </div>
)

// --- MAIN COMPONENT ---
export const SceneAssistedFiling = ({ isActive }: { isActive: boolean }) => {
  // --- STATE ---
  const [stage, setStage] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [formData, setFormData] = useState<FormDataState>({
    fosId: "", name: "", company: "", workerType: "", department: "", designation: "", gender: "", mobile: "", date: "",
    additionalComments: "", complaintAgainst: "", concernedDept: "", history: "", solution: ""
  })
  const [typingField, setTypingField] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // --- TIMING LOGIC ---
  useEffect(() => {
    if (isActive) {
      // Reset
      setStage(0)
      setSelectedCategory(null)
      setFormData({
        fosId: "", name: "", company: "", workerType: "", department: "", designation: "", gender: "", mobile: "", date: "",
        additionalComments: "", complaintAgainst: "", concernedDept: "", history: "", solution: ""
      })
      setTypingField(null)
      if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0

      // Time Reference (Relative to 22.96s start)
      // 0s: Worker Ringing
      // 6.5s: Officer Enters
      // 9.5s: Form Slides In (Data Entry Starts)

      const timers = [
        // 1. Start / Ringing (0s)
        setTimeout(() => setStage(1), 100),

        // 2. Officer Enters (6.5s)
        setTimeout(() => setStage(2), 6500),

        // 3. Form Slides In (9.5s - "We ask...")
        setTimeout(() => setStage(3), 9500),

        // --- DATA FILLING SIMULATION (Post 9.5s) ---
        // Basic Info
        setTimeout(() => { setTypingField("fosId"); setFormData(p => ({ ...p, fosId: "FOS-24-" })) }, 10500),
        setTimeout(() => { setFormData(p => ({ ...p, fosId: "FOS-24-8921" })); setTypingField("name") }, 11000),
        setTimeout(() => { setFormData(p => ({ ...p, name: "Ahmed Khan" })); setTypingField("company") }, 11500),
        setTimeout(() => { setFormData(p => ({ ...p, company: "Pearl Textiles" })); setTypingField("workerType") }, 12000),
        setTimeout(() => { setFormData(p => ({ ...p, workerType: "Operator" })); setTypingField("department") }, 12300),
        setTimeout(() => { setFormData(p => ({ ...p, department: "Spinning" })); setTypingField("designation") }, 12600),
        setTimeout(() => { setFormData(p => ({ ...p, designation: "Senior Op" })); setTypingField("gender") }, 12900),
        setTimeout(() => { setFormData(p => ({ ...p, gender: "Male" })); setTypingField("mobile") }, 13200),
        setTimeout(() => { setFormData(p => ({ ...p, mobile: "+92 300 123..." })); setTypingField("date") }, 13500),
        setTimeout(() => { setFormData(p => ({ ...p, date: "15 Nov 2024" })); setTypingField(null) }, 13800),

        // 4. Category Selection (Approx 14.5s)
        setTimeout(() => {
          setStage(4);
          setSelectedCategory(3);
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 200, behavior: 'smooth' });
          }
        }, 14500),

        // --- ADDITIONAL FIELDS FILLING (Post 15.5s) ---
        setTimeout(() => { setTypingField("additionalComments"); setFormData(p => ({ ...p, additionalComments: "Wages delayed for 2 months..." })) }, 15500),
        setTimeout(() => { setFormData(p => ({ ...p, additionalComments: "Wages delayed for 2 months. Overtime not paid." })); setTypingField("complaintAgainst") }, 16500),

        setTimeout(() => {
          if (scrollContainerRef.current) scrollContainerRef.current.scrollTo({ top: 400, behavior: 'smooth' });
          setFormData(p => ({ ...p, complaintAgainst: "Mr. Asif (Supervisor)" })); setTypingField("concernedDept")
        }, 17500),

        setTimeout(() => { setFormData(p => ({ ...p, concernedDept: "Accounts / HR" })); setTypingField("history") }, 18200),
        setTimeout(() => { setFormData(p => ({ ...p, history: "First time reporting." })); setTypingField("solution") }, 18800),
        setTimeout(() => { setFormData(p => ({ ...p, solution: "Immediate release of pending dues." })); setTypingField(null) }, 19500),

        // 5. File Upload Simulation (Approx 20s)
        setTimeout(() => {
          setStage(4.5); // Trigger upload visual
          if (scrollContainerRef.current) scrollContainerRef.current.scrollTo({ top: 600, behavior: 'smooth' });
        }, 20000),

        // 6. Success (Approx 22s)
        setTimeout(() => setStage(5), 22000),
      ]
      return () => timers.forEach(clearTimeout)
    }
  }, [isActive])

  return (
    <div className="w-full h-full bg-[#F5F5F7] flex items-center justify-center relative overflow-hidden font-sans selection:bg-[#60BA81]/20">

      {/* --- BACKGROUND AMBIANCE --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]" />
        <motion.div
          className="absolute -top-[30%] -right-[10%] w-[800px] h-[800px] bg-[#60BA81]/10 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-[30%] -left-[10%] w-[600px] h-[600px] bg-[#284952]/5 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* --- MAIN STAGE CONTAINER --- */}
      <div className="relative z-10 w-full max-w-[1400px] h-full flex items-center justify-center px-8">

        <motion.div
          className="flex items-center gap-2"
          layout
          transition={{ duration: 1, ease: IOS_EASE }}
        >

          {/* === 1. WORKER (LEFT) - UPDATED VISUALS === */}
          <motion.div
            layout
            className="flex flex-col items-center relative z-20 shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="relative flex items-center justify-center">

              {/* --- CALLING WAVES (Explicit "Ringing" effect) --- */}
              {stage < 2 && (
                <div className="absolute inset-0 z-0 flex items-center justify-center">
                  {/* Wave 1 */}
                  <motion.div
                    className="absolute w-full h-full rounded-full border-[3px] border-[#60BA81]"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 2.4, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                  {/* Wave 2 */}
                  <motion.div
                    className="absolute w-full h-full rounded-full border-[3px] border-[#284952]"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "easeOut" }}
                  />
                  {/* Wave 3 (Inner pulse) */}
                  <motion.div
                    className="absolute w-full h-full rounded-full bg-[#F5A83C]/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
              )}

              {/* --- SPEAKING PULSE (Connected State) --- */}
              {stage >= 2 && <SpeakingPulse color="#60BA81" />}

              {/* Avatar */}
              <motion.div
                className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10 bg-white"
                layoutId="worker-avatar"
                animate={stage < 2 ? {
                  scale: [1, 1.05, 1],
                  transition: { duration: 2, repeat: Infinity }
                } : { scale: 1 }}
              >
                <img src={ASSETS.worker} alt="Worker" className="w-full h-full object-cover scale-110" />
              </motion.div>

              {/* Connecting Status Badge */}
              {stage < 2 && (
                <motion.div
                  className="absolute -bottom-4 z-20 bg-white/95 backdrop-blur-sm border border-[#60BA81]/30 px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Wifi size={10} className="text-[#60BA81] animate-pulse" />
                  <span className="text-[10px] font-bold text-[#284952] tracking-wide">Connecting...</span>
                </motion.div>
              )}

              {/* Multi-Channel Icons - Floating around */}
              <AnimatePresence>
                {stage < 2 && (
                  <>
                    {/* 1. Phone (Top Left) */}
                    <motion.div
                      className="absolute w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-20 border border-[#F5A83C]/20"
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{ opacity: 1, scale: 1, x: -70, y: -50 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      style={{ top: '50%', left: '50%', marginTop: -24, marginLeft: -24 }}
                    >
                      <div className="absolute -top-6 bg-[#F5A83C] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">Phone</div>
                      <Phone size={20} className="text-[#F5A83C]" />
                      <motion.div className="absolute inset-0 rounded-full border border-[#F5A83C]" animate={{ scale: [1, 1.3], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                    </motion.div>

                    {/* 2. SMS (Top Right) */}
                    <motion.div
                      className="absolute w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center z-20 border border-[#284952]/20"
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{ opacity: 1, scale: 1, x: 70, y: -50 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ delay: 0.8, type: "spring" }}
                      style={{ top: '50%', left: '50%', marginTop: -22, marginLeft: -22 }}
                    >
                      <div className="absolute -top-5 bg-[#284952] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">SMS</div>
                      <Smartphone size={18} className="text-[#284952]" />
                    </motion.div>

                    {/* 3. WhatsApp (Bottom Right) */}
                    <motion.div
                      className="absolute w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-20 border border-[#60BA81]/20"
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{ opacity: 1, scale: 1, x: 70, y: 50 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ delay: 1.6, type: "spring" }}
                      style={{ top: '50%', left: '50%', marginTop: -24, marginLeft: -24 }}
                    >
                      <div className="absolute -bottom-6 bg-[#60BA81] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">WhatsApp</div>
                      <MessageCircle size={22} className="text-[#60BA81] fill-[#60BA81]/20" />
                    </motion.div>

                    {/* 4. Email (Bottom Left) */}
                    <motion.div
                      className="absolute w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center z-20 border border-[#17161A]/20"
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{ opacity: 1, scale: 1, x: -70, y: 50 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ delay: 2.4, type: "spring" }}
                      style={{ top: '50%', left: '50%', marginTop: -22, marginLeft: -22 }}
                    >
                      <div className="absolute -bottom-5 bg-[#17161A] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">Email</div>
                      <Mail size={18} className="text-[#17161A]" />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <motion.div className="mt-8 text-center bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white shadow-sm z-30 relative">
              <h3 className="text-sm font-bold text-[#284952]">Factory Worker</h3>
              <p className="text-[10px] text-[#767676] font-medium uppercase tracking-wide">Complainant</p>
            </motion.div>
          </motion.div>


          {/* === CONNECTION: WORKER -> OFFICER === */}
          <AnimatePresence>
            {stage >= 2 && (
              <motion.div
                layout
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: stage >= 3 ? "100px" : "180px" }} // Shrink when form appears
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center shrink-0 overflow-hidden"
              >
                <span className="text-[9px] font-bold text-[#60BA81] uppercase tracking-widest mb-2 whitespace-nowrap">Live Assist</span>
                <DataWave color="#60BA81" direction="right" />
              </motion.div>
            )}
          </AnimatePresence>


          {/* === 2. OFFICER (CENTER HUB) === */}
          <AnimatePresence>
            {stage >= 2 && (
              <motion.div
                layout
                className="flex flex-col items-center relative z-30 shrink-0"
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: IOS_EASE }}
              >
                {/* Big Avatar for Officer */}
                <div className="relative flex items-center justify-center">

                  {/* --- SPEAKING PULSE (Connected State) --- */}
                  <SpeakingPulse color="#284952" />

                  <div className="w-44 h-44 rounded-full border-[6px] border-white shadow-[0_20px_40px_-12px_rgba(40,73,82,0.2)] overflow-hidden bg-[#F0F4F8] relative z-10">
                    <img src={ASSETS.officer} alt="Officer" className="w-full h-full object-cover" />
                  </div>

                  {/* Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute bottom-2 right-2 bg-[#284952] p-3 rounded-full shadow-lg border-2 border-white z-20"
                  >
                    <Headset size={20} className="text-white" />
                  </motion.div>
                </div>

                <motion.div className="mt-6 text-center bg-white/80 backdrop-blur-md px-6 py-3 rounded-xl border border-white shadow-sm relative z-10">
                  <h3 className="text-lg font-bold text-[#284952]">Grievance Officer</h3>
                  <p className="text-[10px] text-[#767676] font-medium uppercase tracking-wide">FOS Support</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>


          {/* === CONNECTION: OFFICER -> FORM === */}
          <AnimatePresence>
            {stage >= 3 && (
              <motion.div
                layout
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100px" }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center shrink-0 overflow-hidden"
              >
                <span className="text-[9px] font-bold text-[#284952] uppercase tracking-widest mb-2 whitespace-nowrap">Filling</span>
                <DataWave color="#284952" direction="right" />
              </motion.div>
            )}
          </AnimatePresence>


          {/* === 3. FORM (RIGHT) === */}
          <AnimatePresence>
            {stage >= 3 && (
              <motion.div
                layout
                className="relative z-20 shrink-0"
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: IOS_EASE }}
              >
                {/* BROWSER FRAME CONTAINER */}
                <div className="w-[420px] bg-white rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] overflow-hidden border border-[#DEE2E6] flex flex-col">

                  {/* BROWSER CHROME (Header) */}
                  <div className="bg-[#F3F4F6] px-4 py-3 flex items-center gap-4 border-b border-[#DEE2E6] shrink-0">
                    {/* Traffic Lights */}
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] border border-[#E0443E]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E] border border-[#D89E24]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#28C840] border border-[#1AAB29]" />
                    </div>

                    {/* Address Bar */}
                    <div className="flex-1 bg-white h-7 rounded-md border border-[#DEE2E6] shadow-sm flex items-center justify-center gap-2 px-2">
                      <div className="w-3 h-3 text-[#767676]"><Lock size={10} /></div>
                      <span className="text-[10px] text-[#17161A] font-medium selection:bg-[#60BA81]/20">fos.org/complaint</span>
                    </div>
                  </div>

                  {/* FORM CONTENT (Existing Layout) */}
                  <div className="flex flex-col max-h-[420px]"> {/* Constrain height here */}

                    {/* Header */}
                    <div className="bg-[#284952] p-6 text-center text-white relative overflow-hidden shrink-0">
                      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
                      {/* Abstract Header Shape */}
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#60BA81] rounded-full blur-2xl opacity-20" />

                      <h1 className="text-xl font-bold relative z-10 tracking-tight">Complaint Filing</h1>
                      <div className="flex items-center justify-center gap-2 mt-2 opacity-80">
                        <span className="w-1.5 h-1.5 bg-[#60BA81] rounded-full animate-pulse" />
                        <p className="text-[10px] uppercase tracking-widest font-semibold relative z-10">Assisted Mode Active</p>
                      </div>
                    </div>

                    {/* Form Body (Scrollable) */}
                    <div
                      ref={scrollContainerRef}
                      className="p-5 bg-white overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] scroll-smooth"
                    >
                      {/* Search Field */}
                      <div className="bg-[#F8FAFB] p-3 rounded-xl border border-[#DEE2E6] mb-4">
                        <FormField label="FOS ID Lookup">
                          <div className="flex gap-2">
                            <div className="flex-1 relative">
                              <FormInput value={formData.fosId} isTyping={typingField === "fosId"} placeholder="Enter ID..." />
                            </div>
                            <button className="bg-[#F5A83C] text-white text-[10px] font-bold px-4 rounded-lg shadow-sm hover:bg-[#E69426] transition-colors">
                              Verify
                            </button>
                          </div>
                        </FormField>
                      </div>

                      {/* Auto-Filling Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <FormField label="Worker Name">
                          <FormInput value={formData.name} isTyping={typingField === "name"} placeholder="Name" />
                        </FormField>
                        <FormField label="Factory / Unit">
                          <FormInput value={formData.company} isTyping={typingField === "company"} placeholder="Company" />
                        </FormField>

                        <FormField label="Emp Type">
                          <FormInput value={formData.workerType} isTyping={typingField === "workerType"} placeholder="Type" />
                        </FormField>
                        <FormField label="Department">
                          <FormInput value={formData.department} isTyping={typingField === "department"} placeholder="Dept" />
                        </FormField>

                        <FormField label="Designation">
                          <FormInput value={formData.designation} isTyping={typingField === "designation"} placeholder="Desig" />
                        </FormField>
                        <FormField label="Gender">
                          <FormInput value={formData.gender} isTyping={typingField === "gender"} placeholder="Gender" />
                        </FormField>

                        <div className="col-span-2 grid grid-cols-2 gap-3">
                          <FormField label="Mobile Contact">
                            <FormInput value={formData.mobile} isTyping={typingField === "mobile"} placeholder="+92..." icon={<Phone size={12} />} />
                          </FormField>
                          <FormField label="Incident Date">
                            <FormInput value={formData.date} isTyping={typingField === "date"} placeholder="DD/MM/YYYY" icon={<Calendar size={12} />} />
                          </FormField>
                        </div>
                      </div>

                      {/* Categories Grid */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: stage >= 3.5 ? 1 : 0 }}
                        className="space-y-2 mb-4"
                      >
                        <label className="text-[10px] font-bold text-[#17161A] ml-1 uppercase tracking-wider">Classification</label>
                        <div className="grid grid-cols-3 gap-2">
                          {COMPLAINT_CATEGORIES.slice(0, 6).map((cat, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: stage >= 4 ? 1 : 0, scale: stage >= 4 ? 1 : 0.9 }}
                              transition={{ delay: i * 0.05 }}
                              className={`
                                p-2 rounded-lg border flex flex-col items-center gap-1.5 text-center cursor-pointer transition-all duration-300
                                ${selectedCategory === i
                                  ? "bg-[#60BA81] border-[#60BA81] text-white shadow-lg scale-105"
                                  : "bg-white border-[#DEE2E6] text-[#767676] opacity-60"}
                              `}
                            >
                              <cat.icon size={14} />
                              <span className="text-[8px] font-bold leading-tight">{cat.label}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Additional Details (New Fields) */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: stage >= 4 ? 1 : 0 }}
                        className="space-y-3 mb-4"
                      >
                        <FormField label="Additional Comments">
                          <FormInput
                            value={formData.additionalComments}
                            isTyping={typingField === "additionalComments"}
                            placeholder="Details..."
                            multiline
                            icon={<MessageSquareQuote size={12} />}
                          />
                        </FormField>

                        <div className="grid grid-cols-2 gap-3">
                          <FormField label="Complaint Against">
                            <FormInput
                              value={formData.complaintAgainst}
                              isTyping={typingField === "complaintAgainst"}
                              placeholder="Person Name"
                              icon={<User size={12} />}
                            />
                          </FormField>
                          <FormField label="Concerned Dept">
                            <FormInput
                              value={formData.concernedDept}
                              isTyping={typingField === "concernedDept"}
                              placeholder="Department"
                              icon={<Building size={12} />}
                            />
                          </FormField>
                        </div>

                        <FormField label="Previous History">
                          <FormInput
                            value={formData.history}
                            isTyping={typingField === "history"}
                            placeholder="Any prior issues..."
                          />
                        </FormField>

                        <FormField label="Proposed Solution">
                          <FormInput
                            value={formData.solution}
                            isTyping={typingField === "solution"}
                            placeholder="Desired outcome..."
                          />
                        </FormField>
                      </motion.div>

                      {/* File Upload Simulation */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: stage >= 4.5 ? 1 : 0 }}
                        className="mb-4"
                      >
                        <label className="text-[10px] font-bold text-[#17161A] ml-1 uppercase tracking-wider mb-2 block">Evidence</label>
                        <div className="border-2 border-dashed border-[#60BA81]/40 bg-[#60BA81]/5 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2">
                          <div className="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center text-[#60BA81]">
                            <UploadCloud size={16} />
                          </div>
                          <p className="text-[10px] text-[#284952] font-medium">
                            <span className="font-bold">Evidence Uploaded</span><br />
                            <span className="text-[#767676] font-normal">payslip_nov.pdf (1.2MB)</span>
                          </p>
                          <div className="w-full h-1 bg-[#DEE2E6] rounded-full overflow-hidden mt-1 max-w-[100px]">
                            <motion.div
                              className="h-full bg-[#60BA81]"
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 1.5, delay: 0.5 }}
                            />
                          </div>
                        </div>
                      </motion.div>

                      {/* Submit Area */}
                      <div className="mt-5 pt-4 border-t border-[#DEE2E6] flex justify-end">
                        <div className="flex items-center gap-2">
                          <div className="text-[9px] text-right text-[#767676] leading-tight">
                            Verified by<br />Officer
                          </div>
                          <button className="bg-gradient-to-r from-[#284952] to-[#1e363d] text-white px-8 py-2 rounded-lg font-bold text-xs shadow-lg transform transition-transform active:scale-95">
                            Submit Case
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* --- SUCCESS OVERLAY --- */}
                  <AnimatePresence>
                    {stage >= 5 && (
                      <motion.div
                        className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.div
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          className="w-20 h-20 bg-[#60BA81]/10 rounded-full flex items-center justify-center mb-4"
                        >
                          <CheckCircle2 size={40} className="text-[#60BA81]" />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-center"
                        >
                          <h2 className="text-2xl font-bold text-[#284952] mb-1">FOS-24-8921</h2>
                          <p className="text-xs text-[#767676] font-medium uppercase tracking-wide mb-8">Case Filed Successfully</p>

                          <button className="w-full px-8 py-2.5 border-2 border-[#60BA81] text-[#60BA81] rounded-xl hover:bg-[#60BA81] hover:text-white transition-all font-bold text-xs">
                            Close & Notify Worker
                          </button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </div>
  )
}