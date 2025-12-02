"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import {
  ShieldCheck,
  FileSignature,
  Gavel,
  Users,
  Building2,
  Lock,
  MapPin,
  AlertTriangle,
  HeartHandshake,
  CheckCircle2,
  Scan,
  Fingerprint,
  FileText,
  Database
} from "lucide-react"

// --- ASSET CONFIGURATION ---
const AVATARS = {
  male_unit: "/assets/avatars/male_io.png",
  female_hr: "/assets/avatars/female_io.png",
  male_safety: "/assets/avatars/investigation_officer_avatar.png"
}

// --- THEME CONSTANTS ---
const COLORS = {
  Teal: "#284952",
  Green: "#60BA81",
  Orange: "#F5A83C",
  White: "#FFFFFF",
}

// --- SUB-COMPONENTS ---

// 1. Holographic Duty Widget
const DutyWidget = ({ icon: Icon, title, subtitle, align, color, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, x: align === 'left' ? 40 : -40, scale: 0.8, rotateY: align === 'left' ? 20 : -20 }}
    animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
    transition={{ delay, type: "spring", stiffness: 100, damping: 15 }}
    className={`
      absolute top-[30%] z-40
      ${align === 'left' ? '-left-[150px] md:-left-[180px]' : '-right-[150px] md:-right-[180px]'}
      flex items-center gap-3 p-3 rounded-xl
      bg-white/80 backdrop-blur-md border border-white shadow-xl w-[170px]
    `}
  >
    <div
      className="p-3 rounded-lg text-white shadow-sm flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: color }}
    >
      <Icon size={20} className="relative z-10" />
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-white/30 skew-x-12"
      />
    </div>
    <div className="flex flex-col">
      <span className="text-[8px] font-bold uppercase text-gray-400 tracking-wider">Module Access</span>
      <span className="text-[10px] md:text-[11px] font-bold text-[#284952] leading-tight">{title}</span>
      <span className="text-[9px] text-gray-500 leading-tight">{subtitle}</span>
    </div>

    <div className={`absolute top-1/2 w-8 h-[2px] bg-gradient-to-r ${align === 'left' ? 'from-transparent to-' + color : 'from-' + color + ' to-transparent'} ${align === 'left' ? '-right-8' : '-left-8'}`} style={{ backgroundColor: color, opacity: 0.5 }} />
    <motion.div
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: delay + 0.2 }}
      className={`absolute top-1/2 w-2 h-2 rounded-full border-2 border-white ${align === 'left' ? '-right-8' : '-left-8'} -mt-1`}
      style={{ backgroundColor: color }}
    />
  </motion.div>
)

// 2. The Main Persona Card
const PersonaCard = ({
  avatar,
  roleTitle,
  dept,
  systemRole,
  systemId,
  isUpgraded,
  color,
  delay = 0,
  specialties = []
}: any) => {
  return (
    <motion.div
      layout
      className={`
        relative flex flex-col items-center overflow-hidden rounded-2xl border transition-all duration-700 shrink-0
        ${isUpgraded
          // INCREASED CARD HEIGHT (h-[32rem])
          ? 'bg-white/90 backdrop-blur-xl shadow-2xl border-white/80 w-64 h-[28rem] md:w-72 md:h-[32rem] z-20'
          : 'bg-gray-200/80 grayscale opacity-70 border-gray-300 w-52 h-72 z-10'
        }
      `}
      style={{
        boxShadow: isUpgraded ? `0 25px 50px -12px ${color}30` : 'none'
      }}
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`, backgroundSize: '10px 10px' }} />

      <div className={`w-full h-1.5 transition-colors duration-500 ${isUpgraded ? '' : 'bg-gray-400'}`} style={{ background: isUpgraded ? color : undefined }} />

      <div className="mt-4 flex flex-col items-center z-10 w-full px-5">
        <div className="flex justify-between w-full items-center mb-1">
          <div className="flex flex-col">
            <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400">
              {isUpgraded ? "IO-PORTAL STATUS" : "SYSTEM PENDING"}
            </span>
            {isUpgraded && (
              <motion.span
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-[10px] font-mono font-bold" style={{ color: color }}
              >
                ID: {systemId}
              </motion.span>
            )}
          </div>
          {isUpgraded ? (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: delay + 0.3, type: "spring" }}
            >
              <ShieldCheck size={20} color={color} />
            </motion.div>
          ) : (
            <Lock size={16} className="text-gray-400" />
          )}
        </div>
      </div>

      {/* --- AVATAR & SCANNER --- */}
      {/* SIGNIFICANTLY INCREASED CONTAINER HEIGHT (h-60) */}
      <div className={`relative w-full flex items-end justify-center overflow-hidden transition-all duration-500 ${isUpgraded ? 'h-60' : 'flex-1'}`}>
        <motion.img
          src={avatar}
          alt={roleTitle}
          layoutId={`avatar-${roleTitle}`}
          // SIGNIFICANTLY INCREASED IMAGE WIDTH (w-64)
          className={`object-contain drop-shadow-2xl transition-all duration-700 ${isUpgraded ? 'w-64 mb-[-20px]' : 'w-40 mb-0 opacity-60'}`}
        />

        <AnimatePresence>
          {isUpgraded && (
            <motion.div
              initial={{ top: "-100%" }}
              animate={{ top: ["-10%", "120%"] }}
              transition={{ duration: 1.5, delay: delay, ease: "easeInOut" }}
              className="absolute left-0 w-full h-16 bg-gradient-to-b from-transparent via-white/60 to-transparent z-30 opacity-60"
            >
              <div className="w-full h-[2px] bg-white shadow-[0_0_15px_white]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full flex-1 bg-white/70 backdrop-blur-sm p-4 z-20 border-t border-gray-100 flex flex-col items-center relative">

        <div className="text-center w-full">
          <AnimatePresence mode="wait">
            {isUpgraded ? (
              <motion.div
                key="active"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              >
                <h3 className="text-sm md:text-base font-bold text-[#284952]">{roleTitle}</h3>
                <p className="text-[10px] font-medium text-gray-500 uppercase mb-2">{dept}</p>

                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-bold text-white shadow-sm" style={{ backgroundColor: color }}>
                  <Fingerprint size={10} />
                  <span>{systemRole}</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="inactive"
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-20 h-2 bg-gray-200 rounded-full mb-1" />
                <div className="w-12 h-2 bg-gray-200 rounded-full" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {isUpgraded && specialties.length > 0 && (
          <motion.div
            className="w-full mt-auto pt-3 border-t border-dashed border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.6 }}
          >
            <div className="flex flex-col gap-2">
              {specialties.map((spec: any, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-md bg-opacity-10`} style={{ backgroundColor: color }}>
                    <spec.icon size={12} style={{ color: color }} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[7px] font-bold text-gray-400 uppercase">{spec.label}</span>
                    <span className="text-[10px] font-bold text-[#284952]">{spec.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </motion.div>
  )
}

// --- MAIN SCENE CONTROLLER ---

export default function SceneOfficers() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1000)
    const t2 = setTimeout(() => setPhase(2), 5000)
    const t3 = setTimeout(() => setPhase(3), 10000)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); }
  }, [])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#F5F5F7] relative overflow-hidden font-sans">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#284952 1px, transparent 1px), linear-gradient(90deg, #284952 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#284952]/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#60BA81]/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative w-full h-full flex items-center justify-center p-4">

        {/* --- PHASE 1 & 2: APPOINTMENT & DUTIES --- */}
        <AnimatePresence>
          {phase < 3 && (
            <motion.div
              className="relative z-30"
              exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
            >
              <PersonaCard
                avatar={AVATARS.male_unit}
                roleTitle="Factory Nominee"
                dept="Management Representative"
                systemRole="Lead Investigation Officer"
                systemId="IO-8921"
                isUpgraded={phase >= 1}
                color={COLORS.Teal}
                specialties={[
                  { icon: Database, label: "System Access", value: "IO-Portal Activated" },
                  { icon: Scan, label: "Responsibility", value: "Grievance Resolution" }
                ]}
              />

              {/* HOLOGRAPHIC DUTIES */}
              {phase >= 2 && (
                <>
                  <DutyWidget
                    icon={Gavel}
                    title="Remediation Protocol"
                    subtitle="RCA & CAPA Development"
                    align="left"
                    color={COLORS.Green}
                    delay={0}
                  />
                  <DutyWidget
                    icon={FileText}
                    title="Evidence Logging"
                    subtitle="Documentation & Upload"
                    align="right"
                    color={COLORS.Orange}
                    delay={0.2}
                  />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- PHASE 3: DIVERSITY GRID --- */}
        {phase === 3 && (
          <motion.div
            className="flex items-end justify-center gap-3 md:gap-6 z-20 w-full max-w-5xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* 1. UNIT IO */}
            <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
              <PersonaCard
                avatar={AVATARS.male_unit}
                roleTitle="Production Supervisor"
                dept="Production Unit A"
                systemRole="Unit-Level IO"
                systemId="IO-8921"
                isUpgraded={true}
                color={COLORS.Teal}
                delay={0.2}
                specialties={[
                  { icon: MapPin, label: "Assignment Scope", value: "Production Floor" },
                  { icon: CheckCircle2, label: "Task", value: "Verification & RCA" }
                ]}
              />
            </motion.div>

            {/* 2. GENDER IO - HERO CARD */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="transform scale-110 z-30"
            >
              <PersonaCard
                avatar={AVATARS.female_hr}
                roleTitle="HR Representative"
                dept="Human Resources"
                systemRole="Gender-Specific IO"
                systemId="IO-4432"
                isUpgraded={true}
                color={COLORS.Orange}
                delay={0.4}
                specialties={[
                  { icon: HeartHandshake, label: "Assignment Scope", value: "Female Grievances" },
                  { icon: AlertTriangle, label: "Protocol", value: "Harassment/Sensitive" }
                ]}
              />
              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }}
                className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#284952] text-white px-4 py-1.5 rounded-full text-[10px] font-bold shadow-lg border border-white/20 whitespace-nowrap flex items-center gap-2"
              >
                <Users size={12} className="text-[#F5A83C]" />
                SENSITIVE CASES
              </motion.div>
            </motion.div>

            {/* 3. CATEGORY IO (HSE/Safety) */}
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
              <PersonaCard
                avatar={AVATARS.male_safety}
                roleTitle="HSE Manager"
                dept="Health & Safety"
                systemRole="Category-Specific IO"
                systemId="IO-1198"
                isUpgraded={true}
                color={COLORS.Green}
                delay={0.6}
                specialties={[
                  { icon: ShieldCheck, label: "Assignment Scope", value: "HSE & Discipline" },
                  { icon: FileSignature, label: "Duty", value: "CAPA Execution" }
                ]}
              />
            </motion.div>
          </motion.div>
        )}

      </div>

      {/* --- FOOTER CONTEXT --- */}
      <motion.div
        className="absolute bottom-6 flex items-center gap-2 px-5 py-2.5 bg-white/60 backdrop-blur-md rounded-full border border-white/50 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] font-bold text-[#284952] uppercase tracking-widest">
          IO-PORTAL DEPLOYMENT ACTIVE
        </span>
      </motion.div>

    </div>
  )
}