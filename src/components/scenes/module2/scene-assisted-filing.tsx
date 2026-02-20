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

const DataStream = ({ color, isActive, direction = "right" }: { color: string, isActive: boolean, direction?: "left" | "right" }) => (
  <div className="flex gap-2 items-center justify-center overflow-visible w-24 relative h-6">
    <AnimatePresence>
      {isActive && (
        <>
          {/* Base Beam Line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
            className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-20"
            style={{ color }}
          />
          {/* Animated Particles */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full blur-[1px]"
              style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
              initial={{ x: direction === "right" ? -40 : 40, opacity: 0, scale: 0 }}
              animate={{
                x: direction === "right" ? 40 : -40,
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "linear"
              }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  </div>
)

const SpeakingPulse = ({ color, isActive }: { color: string, isActive: boolean }) => (
  <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
    <AnimatePresence>
      {isActive && [1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-full h-full rounded-full border-2"
          style={{ borderColor: color }}
          initial={{ scale: 1, opacity: 0 }}
          animate={{
            scale: [1, 1.4],
            opacity: [0.5, 0]
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeOut"
          }}
        />
      ))}
    </AnimatePresence>
  </div>
)

const FormField = ({ label, children, delay = 0, className = "" }: { label: string, children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: IOS_EASE }}
    className={`flex flex-col gap-1.5 ${className}`}
  >
    <label className="text-[10px] font-extrabold text-[#284952]/60 ml-1 uppercase tracking-wider">{label}</label>
    {children}
  </motion.div>
)

const FormInput = ({ value, isTyping, placeholder, icon, className = "", multiline = false }: { value: string, isTyping?: boolean, placeholder: string, icon?: React.ReactNode, className?: string, multiline?: boolean }) => (
  <div className={`relative group ${className}`}>
    <motion.div
      className={`
        w-full px-3 py-1.5 rounded-lg text-xs transition-all duration-300 border
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
        setTimeout(() => { setTypingField("fosId"); setFormData(p => ({ ...p, fosId: "475002" })) }, 10500),
        setTimeout(() => { setFormData(p => ({ ...p, fosId: "475002" })); setTypingField("name") }, 11000),
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
          className="flex items-center gap-1.5"
          layout
          transition={{ duration: 1.2, ease: IOS_EASE }}
        >

          {/* === 1. WORKER (LEFT) === */}
          <motion.div
            layout
            className="flex flex-col items-center relative z-20 shrink-0"
            initial={{ opacity: 0, scale: 0.9, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: IOS_EASE }}
          >
            <div className="relative flex items-center justify-center">

              {/* --- RINGING / SPEAKING PULSES --- */}
              <SpeakingPulse color="#60BA81" isActive={stage >= 1} />

              {/* Avatar */}
              <motion.div
                layout
                className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-2xl relative z-10 bg-white"
                animate={stage < 2 ? {
                  scale: [1, 1.05, 1],
                  transition: { duration: 2, repeat: Infinity }
                } : { scale: 1 }}
              >
                <img src={ASSETS.worker} alt="Worker" className="w-full h-full object-cover scale-110" />
              </motion.div>

              {/* Status Badge */}
              <AnimatePresence>
                {stage < 2 && (
                  <motion.div
                    className="absolute -bottom-4 z-20 bg-white px-3 py-1 rounded-full shadow-lg border border-[#60BA81]/20 flex items-center gap-1.5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Wifi size={10} className="text-[#60BA81] animate-pulse" />
                    <span className="text-[10px] font-bold text-[#284952] tracking-wide uppercase">Connecting</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Floating Channels (Only in Stage 1) */}
              <AnimatePresence>
                {stage < 2 && (
                  <>
                    {[
                      { icon: Phone, color: "#F5A83C", label: "Phone", x: -75, y: -50, delay: 0.2 },
                      { icon: Smartphone, color: "#284952", label: "SMS", x: 75, y: -50, delay: 0.4 },
                      { icon: MessageCircle, color: "#60BA81", label: "WhatsApp", x: 75, y: 50, delay: 0.6 },
                      { icon: Mail, color: "#17161A", label: "Email", x: -75, y: 50, delay: 0.8 },
                    ].map((ch, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center z-20 border border-gray-100"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1, x: ch.x, y: ch.y }}
                        exit={{ opacity: 0, scale: 0, filter: "blur(10px)" }}
                        transition={{ delay: ch.delay, type: "spring", stiffness: 100 }}
                        style={{ top: '50%', left: '50%', marginTop: -24, marginLeft: -24 }}
                      >
                        <div className="absolute -top-6 bg-white border border-gray-100 text-[#284952] text-[8px] font-black px-2 py-0.5 rounded-full shadow-sm uppercase tracking-tighter">
                          {ch.label}
                        </div>
                        <ch.icon size={20} style={{ color: ch.color }} />
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>
            </div>

            <motion.div layout className="mt-6 text-center bg-white/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/50 shadow-sm z-30 relative">
              <h3 className="text-sm font-black text-[#284952] tracking-tight">Factory Worker</h3>
              <p className="text-[10px] text-[#767676] font-extrabold uppercase tracking-widest opacity-60">Complainant</p>
            </motion.div>
          </motion.div>


          {/* === INTER-CHARACTER FLOW === */}
          <motion.div
            layout
            className="flex items-center justify-center overflow-hidden"
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: stage >= 2 ? (stage >= 3 ? 80 : 160) : 0,
              opacity: stage >= 2 ? 1 : 0
            }}
            transition={{ duration: 0.8, ease: IOS_EASE }}
          >
            <DataStream color="#60BA81" isActive={stage >= 2} direction="right" />
          </motion.div>


          {/* === 2. OFFICER (CENTER HUB) === */}
          <AnimatePresence mode="popLayout">
            {stage >= 2 && (
              <motion.div
                layout
                className="flex flex-col items-center relative z-30 shrink-0"
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, ease: IOS_EASE }}
              >
                <div className="relative flex items-center justify-center">
                  <SpeakingPulse color="#284952" isActive={stage >= 2} />

                  <motion.div
                    layout
                    className="w-32 h-32 rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-white/80 relative z-10"
                  >
                    <img src={ASSETS.officer} alt="Officer" className="w-full h-full object-cover scale-105" />
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute bottom-2 right-2 bg-gradient-to-br from-[#284952] to-[#1e363d] p-2 rounded-full shadow-2xl border-2 border-white z-20"
                  >
                    <Headset size={20} className="text-white" />
                  </motion.div>
                </div>

                <motion.div layout className="mt-4 text-center bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/50 shadow-sm relative z-10">
                  <h3 className="text-lg font-black text-[#284952] tracking-tight">Grievance Officer</h3>
                  <p className="text-[10px] text-[#767676] font-extrabold uppercase tracking-widest opacity-60">FOS System Support</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>


          {/* === DATA FLOW TO FORM === */}
          <motion.div
            layout
            className="flex items-center justify-center overflow-hidden"
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: stage >= 3 ? 80 : 0,
              opacity: stage >= 3 ? 1 : 0
            }}
            transition={{ duration: 0.8, ease: IOS_EASE }}
          >
            <DataStream color="#284952" isActive={stage >= 3} direction="right" />
          </motion.div>


          {/* === 3. BROWSER FORM (RIGHT) === */}
          <AnimatePresence>
            {stage >= 3 && (
              <motion.div
                layout
                className="relative z-20 shrink-0"
                initial={{ opacity: 0, x: 100, rotateY: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                transition={{ duration: 1, ease: IOS_EASE }}
                style={{ perspective: 1000 }}
              >
                {/* BROWSER FRAME */}
                <div className="w-[340px] bg-white rounded-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] overflow-hidden border border-[#DEE2E6] flex flex-col">

                  {/* HEADER CHROME */}
                  <div className="bg-[#F3F4F6] px-4 py-3.5 flex items-center gap-4 border-b border-[#DEE2E6] shrink-0">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-inner" />
                      <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-inner" />
                      <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-inner" />
                    </div>

                    <div className="flex-1 bg-white h-8 rounded-lg border border-[#DEE2E6] shadow-sm flex items-center justify-center gap-2 px-3">
                      <Lock size={10} className="text-[#284952]/40" />
                      <span className="text-[11px] text-[#17161A]/60 font-medium tracking-tight">fos.org/complaint/assisted</span>
                    </div>
                  </div>

                  {/* FORM CONTENT (Existing Layout) */}
                  <div className="flex flex-col max-h-[420px]"> {/* Constrain height here */}

                    {/* FORM BODY */}
                    <div className="flex flex-col max-h-[460px]">

                      {/* Brand Header */}
                      <div className="bg-[#284952] p-3 text-center text-white relative overflow-hidden shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#60BA81]/20 to-transparent opacity-40" />
                        <h1 className="text-lg font-black relative z-10 tracking-tight">Case Filing Assistant</h1>
                        <div className="flex items-center justify-center gap-2 mt-2">
                          <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 bg-[#60BA81] rounded-full shadow-[0_0_8px_#60BA81]"
                          />
                          <p className="text-[9px] uppercase tracking-[0.2em] font-black opacity-70">Secured FOS Uplink</p>
                        </div>
                      </div>

                      {/* Scrollable Content */}
                      <div
                        ref={scrollContainerRef}
                        className="p-4 bg-white overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] scroll-smooth"
                      >
                        {/* Lookup Section */}
                        <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 mb-4">
                          <FormField label="Identity Verification">
                            <div className="flex gap-2">
                              <FormInput
                                className="flex-1"
                                value={formData.fosId}
                                isTyping={typingField === "fosId"}
                                placeholder="FOS-ID..."
                              />
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-[#60BA81] text-white text-[10px] font-black px-4 rounded-xl shadow-lg shadow-[#60BA81]/20 uppercase tracking-widest"
                              >
                                Verify
                              </motion.button>
                            </div>
                          </FormField>
                        </div>

                        {/* Main Data Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          {[
                            { label: "Worker Name", key: "name", placeholder: "Name" },
                            { label: "Factory Unit", key: "company", placeholder: "Company" },
                            { label: "Employment", key: "workerType", placeholder: "Type" },
                            { label: "Department", key: "department", placeholder: "Dept" },
                            { label: "Designation", key: "designation", placeholder: "Desig" },
                            { label: "Gender", key: "gender", placeholder: "Gender" },
                          ].map((field, i) => (
                            <FormField key={field.key} label={field.label} delay={0.1 + (i * 0.05)}>
                              <FormInput
                                value={formData[field.key as keyof FormDataState]}
                                isTyping={typingField === field.key}
                                placeholder={field.placeholder}
                              />
                            </FormField>
                          ))}

                          <FormField label="Contact" className="col-span-1">
                            <FormInput value={formData.mobile} isTyping={typingField === "mobile"} placeholder="+92..." icon={<Phone size={12} />} />
                          </FormField>
                          <FormField label="Incident Date" className="col-span-1">
                            <FormInput value={formData.date} isTyping={typingField === "date"} placeholder="DD/MM/YYYY" icon={<Calendar size={12} />} />
                          </FormField>
                        </div>

                        {/* Classification Grid */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: stage >= 4 ? 1 : 0 }}
                          className="mb-8"
                        >
                          <label className="text-[10px] font-black text-[#284952]/40 ml-1 uppercase tracking-widest block mb-3">Classification</label>
                          <div className="grid grid-cols-3 gap-2">
                            {COMPLAINT_CATEGORIES.slice(0, 6).map((cat, i) => (
                              <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className={`
                                p-1.5 rounded-xl border flex flex-col items-center gap-2 text-center transition-all duration-500
                                ${selectedCategory === i
                                    ? "bg-[#60BA81] border-[#60BA81] text-white shadow-xl shadow-[#60BA81]/30 scale-105"
                                    : "bg-white border-gray-100 text-[#284952]/40"}
                              `}
                              >
                                <cat.icon size={16} strokeWidth={selectedCategory === i ? 2.5 : 2} />
                                <span className="text-[8px] font-black leading-tight uppercase tracking-tighter">{cat.label}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        {/* Deep Details */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: stage >= 4 ? 1 : 0 }}
                          className="space-y-4 mb-6"
                        >
                          <FormField label="Case Description">
                            <FormInput
                              value={formData.additionalComments}
                              isTyping={typingField === "additionalComments"}
                              placeholder="Detailed account..."
                              multiline
                              icon={<MessageSquareQuote size={12} />}
                            />
                          </FormField>

                          <div className="grid grid-cols-2 gap-4">
                            <FormField label="Respondent">
                              <FormInput
                                value={formData.complaintAgainst}
                                isTyping={typingField === "complaintAgainst"}
                                placeholder="Name/Role"
                                icon={<User size={12} />}
                              />
                            </FormField>
                            <FormField label="Involved Dept">
                              <FormInput
                                value={formData.concernedDept}
                                isTyping={typingField === "concernedDept"}
                                placeholder="Department"
                                icon={<Building size={12} />}
                              />
                            </FormField>
                          </div>
                        </motion.div>

                        {/* Evidence Vault */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: stage >= 4.5 ? 1 : 0 }}
                          className="mb-6"
                        >
                          <label className="text-[10px] font-black text-[#284952]/40 ml-1 uppercase tracking-widest block mb-3">Supporting Evidence</label>
                          <div className="border-2 border-dashed border-[#60BA81]/20 bg-gray-50/50 rounded-2xl p-6 flex flex-col items-center text-center gap-3">
                            <motion.div
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-[#60BA81]"
                            >
                              <UploadCloud size={20} />
                            </motion.div>
                            <div className="space-y-1">
                              <p className="text-[11px] text-[#284952] font-black uppercase tracking-tight">Evidence Secured</p>
                              <p className="text-[10px] text-[#767676] font-medium opacity-60 italic">payslip_nov_24.pdf (1.2MB)</p>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2 max-w-[140px]">
                              <motion.div
                                className="h-full bg-gradient-to-r from-[#60BA81] to-[#28C840]"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, delay: 0.5 }}
                              />
                            </div>
                          </div>
                        </motion.div>

                        {/* Actions */}
                        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[8px] font-black text-[#284952]/30 uppercase tracking-[0.2em]">Verified By</span>
                            <span className="text-[10px] font-bold text-[#284952]">FOS-SYSTEM-ID-99</span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05, x: 4 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-[#284952] to-[#1e363d] text-white px-8 py-3 rounded-xl font-black text-[10px] shadow-xl uppercase tracking-widest flex items-center gap-2"
                          >
                            Establish Case
                            <CheckCircle2 size={14} className="text-[#60BA81]" />
                          </motion.button>
                        </div>

                      </div>
                    </div>

                    {/* --- REPLICATED TICKET CONFIRMATION OVERLAY --- */}
                    <AnimatePresence>
                      {stage >= 5 && (
                        <motion.div
                          className="absolute inset-0 bg-[#F8F9FA]/95 backdrop-blur-md z-50 flex items-center justify-center p-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <motion.div
                            className="w-full max-w-md bg-white shadow-2xl rounded-lg overflow-hidden border-t-[6px] border-[#198754]"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                          >
                            <div className="p-8 flex flex-col items-center">
                              {/* Success Icon */}
                              <div className="mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-[#198754]" width="75" height="75"
                                  fill="currentColor" viewBox="0 0 16 16">
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                                </svg>
                              </div>

                              {/* Content */}
                              <div className="text-center">
                                <h1 className="text-[25px] font-bold text-[#212529] mb-3">WH020289-1121437</h1>
                                <p className="text-[#6C757D] text-sm mb-8">
                                  Your ticket number has been generated successfully.
                                </p>

                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="px-6 py-2.5 border border-[#198754] text-[#198754] rounded font-medium text-sm hover:bg-[#198754] hover:text-white transition-colors duration-300"
                                >
                                  Register Another Complaint
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>


        </motion.div>
      </div>
    </div>
  )
}