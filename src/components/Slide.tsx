"use client"

import type React from "react"
import { useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ControlPanel } from "./control-panel.tsx"
import type { SceneControl } from "../lib/module-data"
import {
  Play,
  ShieldCheck,
  Activity,
  ClipboardList,
  Fingerprint,
  Phone,
  Mail,
  MessageSquare,
  Search,
  ArrowRight,
  Sparkles,
  Users,
  UserCheck,
  CreditCard,
  Bell,
  FileCheck,
  ClipboardCheck,
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock,
  BarChart3,
  PieChart,
  TrendingUp,
  FileText,
  Download,
  Inbox,
  Eye,
  Zap,
  CheckCircle,
  Smile,
  X,
} from "lucide-react"

// --- PREMIUM PHYSICS ---
const IOS_SPRING = {
  type: "spring",
  stiffness: 280,
  damping: 32,
  mass: 1.0,
}

const IOS_SOFT_SPRING = {
  type: "spring",
  stiffness: 180,
  damping: 25,
  mass: 1,
}

const IOS_EASE = [0.32, 0.72, 0, 1] as const

// Optimized entrance - removed expensive blur filter
const SLIDE_ENTRANCE = {
  initial: {
    opacity: 0,
    y: 60,
    scale: 0.92,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
}

// Layout Constants
const EXPANDED_WIDTH = 85
const PEEK_WIDTH = 6

// --- HELPER COMPONENTS ---

// Reduced backdrop blur for better performance
const GlassSurface = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div
    className={`relative bg-white/98 backdrop-blur-md border border-[#DEE2E6] shadow-[0_20px_50px_-12px_rgba(40,73,82,0.15),inset_0_1px_0_rgba(255,255,255,0.8)] rounded-[32px] ${className}`}
    style={{ transform: 'translateZ(0)' }}
  >
    {children}
  </div>
)

// Optimized shimmer with CSS animation instead of JS
const ShimmerOverlay = () => (
  <div
    className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-[32px]"
    style={{ transform: 'translateZ(0)' }}
  >
    <div
      className="absolute inset-0 shimmer-effect"
      style={{
        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)",
        animation: 'shimmer 4s ease-in-out infinite',
        animationDelay: '2s',
      }}
    />
  </div>
)

// Subtle glow ring for colored cards
const GlowRing = ({ color }: { color: string; delay?: number }) => (
  <div
    className="absolute -inset-0.5 rounded-[30px] pointer-events-none z-0 opacity-50"
    style={{
      background: `linear-gradient(135deg, ${color}30, transparent 50%, ${color}20)`,
      transform: 'translateZ(0)',
    }}
  />
)

// Simplified icon with brand styling
const FloatingIcon = ({ Icon, color }: { Icon: React.ElementType; color: string }) => {
  return (
    <motion.div
      className="relative"
      whileHover={{ y: -4, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ transform: 'translateZ(0)' }}
    >
      {/* Status accent dot */}
      <div
        className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
        style={{ backgroundColor: '#60BA81' }}
      />

      <div
        className="relative w-14 h-14 rounded-xl bg-white border border-[#DEE2E6] shadow-[0_4px_12px_-4px_rgba(40,73,82,0.12)] flex items-center justify-center"
        style={{ color }}
      >
        <Icon size={26} strokeWidth={1.5} />
      </div>
    </motion.div>
  )
}

// Optimized floating with CSS animation for GPU acceleration
const FloatingContainer = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <div
    className="floating-element"
    style={{
      animation: 'float 5s ease-in-out infinite',
      animationDelay: `${delay}s`,
      transform: 'translateZ(0)',
    }}
  >
    {children}
  </div>
)

// --- VISUALIZATIONS ---

// === MODULE 1: DEPLOYMENT & ONBOARDING VISUAL ===
// Script-synced onboarding command flow:
// employee list/API -> validation -> S-FOS ID + CNIC mapping -> SMS/cards -> IO assignment -> training/portal
const DeploymentVisual = () => {
  const rolloutSteps = [
    { icon: Upload, label: "Upload & Validate", color: "#284952" },
    { icon: Fingerprint, label: "S-FOS ID Mapping", color: "#60BA81" },
    { icon: MessageSquare, label: "SMS Delivery", color: "#06B6D4" },
    { icon: CreditCard, label: "Awareness Cards + QR", color: "#F5A83C" },
    { icon: UserCheck, label: "IO Appointment", color: "#3B82F6" },
    { icon: Activity, label: "Training + Portal Access", color: "#8B5CF6" },
  ]

  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F4FAF7] via-white to-[#EAF3EE]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #284952 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <motion.div
        className="relative z-10 w-[92%] max-w-[560px] rounded-3xl border border-[#DDE8E4] bg-white/90 backdrop-blur-md shadow-[0_24px_70px_-24px_rgba(40,73,82,0.35)] overflow-hidden"
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-white shadow-sm border border-[#dce9e4] flex items-center justify-center z-20">
          <ShieldCheck size={16} className="text-[#284952]" />
        </div>

        <div className="p-4 pt-5">
          {/* Input sources + engine */}
          <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center mb-4">
            <motion.div
              className="rounded-xl border border-[#d5e7df] bg-[#f5fbf8] p-3"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Users size={14} className="text-[#284952]" />
                <span className="text-[10px] font-bold text-[#284952] uppercase tracking-wide">Employee List</span>
              </div>
              <p className="text-[9px] text-[#4f6d67]">Company shares active workforce records</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="w-7 h-7 rounded-full bg-[#284952]/10 flex items-center justify-center"
            >
              <ArrowRight size={14} className="text-[#284952]" />
            </motion.div>

            <motion.div
              className="rounded-xl border border-[#d4e8de] bg-white p-3 shadow-sm"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles size={14} className="text-[#60BA81]" />
                <span className="text-[10px] font-bold text-[#2f5a4f] uppercase tracking-wide">Secure API</span>
              </div>
              <p className="text-[9px] text-[#5f7b73]">Direct HRMS integration for bulk onboarding</p>
            </motion.div>
          </div>

          {/* Pulse line */}
          <div className="relative h-2 rounded-full bg-[#e7efeb] overflow-hidden mb-4">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ background: "linear-gradient(90deg, #284952, #60BA81, #f5a83c)" }}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.div
              className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/65 to-transparent"
              initial={{ x: "-110%" }}
              animate={{ x: "450%" }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.2 }}
            />
          </div>

          {/* Rollout steps */}
          <div className="grid grid-cols-2 gap-2.5">
            {rolloutSteps.map((step, index) => (
              <motion.div
                key={step.label}
                className="rounded-xl border p-2.5 bg-white relative overflow-hidden"
                style={{ borderColor: `${step.color}35` }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 + index * 0.1 }}
              >
                <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: step.color }} />
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${step.color}14` }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.15 }}
                  >
                    <step.icon size={14} style={{ color: step.color }} />
                  </motion.div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold leading-tight text-[#1f3f47] truncate">{step.label}</p>
                    <p className="text-[8px] text-[#6b8380] mt-0.5">Step {String(index + 1).padStart(2, "0")}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// === MODULE 2: COMPLAINT INTAKE VISUAL ===
// Content: Multi-channel intake (hotline, SMS, WhatsApp, email, app), anonymous complaints, ticket numbers, notifications
const IntakeVisual = () => (
  <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
    {/* Warm gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#FDF9F3] via-white to-[#FEF6EC]" />

    {/* Decorative pattern */}
    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, #F5A83C 1px, transparent 0)',
        backgroundSize: '24px 24px',
      }}
    />

    <div className="relative z-10 flex flex-col items-center gap-5">
      {/* Channel Cards Row */}
      <motion.div
        className="flex gap-3"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { Icon: Phone, label: 'Toll-Free', color: '#60BA81' },
          { Icon: MessageSquare, label: 'WhatsApp', color: '#25D366' },
          { Icon: Mail, label: 'Email', color: '#284952' },
          { Icon: Fingerprint, label: 'Mobile App', color: '#3B82F6' },
        ].map(({ Icon, label, color }, i) => (
          <motion.div
            key={label}
            className="bg-white rounded-2xl p-3 shadow-lg shadow-black/5 border border-gray-100 flex flex-col items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${color}12`, color }}
            >
              <Icon size={20} strokeWidth={2} />
            </div>
            <span className="text-[8px] font-bold text-[#284952]/70 uppercase tracking-wider">{label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Intake Flow Card */}
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, ...IOS_SPRING }}
      >
        <GlassSurface className="w-[400px] p-5">
          {/* Flow Diagram */}
          <div className="flex items-center justify-between mb-5">
            {/* Worker */}
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#284952]/5 flex items-center justify-center">
                <Users size={24} className="text-[#284952]" />
              </div>
              <span className="text-[9px] font-bold text-[#284952] uppercase">Worker</span>
            </motion.div>

            {/* Arrow with animation */}
            <motion.div
              className="flex-1 flex items-center justify-center px-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="h-[2px] flex-1 bg-gradient-to-r from-[#284952]/20 via-[#F5A83C] to-[#284952]/20"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              />
              <ArrowRight size={16} className="text-[#F5A83C] mx-1" />
            </motion.div>

            {/* FOS Team */}
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5A83C] to-[#E8973A] flex items-center justify-center shadow-lg shadow-[#F5A83C]/25"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <ShieldCheck size={28} className="text-white" />
              </motion.div>
              <span className="text-[9px] font-bold text-[#F5A83C] uppercase">FOS Team</span>
            </motion.div>

            {/* Arrow with animation */}
            <motion.div
              className="flex-1 flex items-center justify-center px-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <ArrowRight size={16} className="text-[#60BA81] mx-1" />
              <motion.div
                className="h-[2px] flex-1 bg-gradient-to-r from-[#284952]/20 via-[#60BA81] to-[#284952]/20"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              />
            </motion.div>

            {/* IO Notification */}
            <motion.div
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#60BA81]/10 flex items-center justify-center">
                <Bell size={24} className="text-[#60BA81]" />
              </div>
              <span className="text-[9px] font-bold text-[#60BA81] uppercase">IO Notified</span>
            </motion.div>
          </div>

          {/* Bottom Status Row */}
          <div className="flex gap-3 pt-3 border-t border-gray-100">
            {/* Ticket Generated */}
            <motion.div
              className="flex-1 flex items-center gap-3 bg-[#60BA81]/8 rounded-xl p-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <FileCheck size={18} className="text-[#60BA81]" />
              <div>
                <div className="text-[10px] font-bold text-[#284952]">Ticket Generated</div>
                <div className="text-[9px] text-[#284952]/50">#GRV-4829</div>
              </div>
              <CheckCircle2 size={14} className="text-[#60BA81] ml-auto" />
            </motion.div>

            {/* Anonymous Option */}
            <motion.div
              className="flex-1 flex items-center gap-3 bg-[#F5A83C]/8 rounded-xl p-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <ShieldCheck size={18} className="text-[#F5A83C]" />
              <div>
                <div className="text-[10px] font-bold text-[#284952]">Anonymous</div>
                <div className="text-[9px] text-[#284952]/50">Identity Protected</div>
              </div>
            </motion.div>
          </div>
        </GlassSurface>
      </motion.div>
    </div>
  </div>
)

// === MODULE 3: INVESTIGATION VISUAL ===
// Content: Case workflow (unprocessed → in process), validity assessment, RCA, CAPA, evidence upload, verification, closure
const InvestigationVisual = () => (
  <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
    {/* Cool gradient background */}
    <div className="absolute inset-0 bg-gradient-to-tr from-[#F5F8FA] via-white to-[#F0F5F7]" />

    {/* Subtle pattern */}
    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, #284952 1px, transparent 0)',
        backgroundSize: '24px 24px',
      }}
    />

    <div className="relative z-10 flex flex-col items-center gap-5">
      {/* Workflow Pipeline with Icons */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { Icon: Inbox, label: 'Unprocessed', status: 'complete', color: '#60BA81' },
          { Icon: Eye, label: 'In Process', status: 'complete', color: '#60BA81' },
          { Icon: Zap, label: 'RCA & CAPA', status: 'active', color: '#F5A83C' },
          { Icon: CheckCircle, label: 'Closed', status: 'pending', color: '#DEE2E6' },
        ].map((step, i) => (
          <motion.div
            key={step.label}
            className="flex items-center"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.12 }}
          >
            <div className="flex flex-col items-center gap-1">
              <motion.div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${step.status === 'active' ? 'ring-2 ring-offset-2' : ''
                  }`}
                style={{
                  backgroundColor: step.status === 'pending' ? '#F5F5F5' : `${step.color}15`,
                  color: step.status === 'pending' ? '#9CA3AF' : step.color,
                }}
                animate={step.status === 'active' ? { scale: [1, 1.08, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <step.Icon size={20} strokeWidth={2} />
              </motion.div>
              <span className="text-[8px] font-bold text-[#284952]/60 uppercase tracking-wider">{step.label}</span>
            </div>
            {i < 3 && (
              <motion.div
                className="w-6 h-1 mx-2 rounded-full overflow-hidden bg-gray-100"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: step.status === 'complete' ? '#60BA81' : '#DEE2E6' }}
                  initial={{ width: 0 }}
                  animate={{ width: step.status === 'complete' ? '100%' : '0%' }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
                />
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Main Investigation Card */}
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, ...IOS_SPRING }}
      >
        <GlassSurface className="w-[400px] p-5 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#284952] to-[#1a353d] flex items-center justify-center">
                <Search size={18} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-[#1A1D21] text-sm">Case #GRV-2847</div>
                <div className="text-[10px] text-[#8A9199]">Validity assessment complete</div>
              </div>
            </div>
            <motion.div
              className="px-2.5 py-1 rounded-full bg-[#F5A83C]/15 text-[#F5A83C] text-[10px] font-bold"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              In Process
            </motion.div>
          </div>

          {/* Investigation Actions */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { Icon: ClipboardCheck, label: 'Root Cause Analysis', done: true },
              { Icon: FileCheck, label: 'CAPA Plan Created', done: true },
              { Icon: Upload, label: 'Evidence Uploaded', done: false },
              { Icon: UserCheck, label: 'Verification Call', done: false },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className={`flex items-center gap-2 p-2.5 rounded-xl ${item.done ? 'bg-[#60BA81]/10' : 'bg-gray-50'}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <item.Icon size={14} className={item.done ? 'text-[#60BA81]' : 'text-gray-400'} />
                <span className={`text-[10px] font-medium ${item.done ? 'text-[#284952]' : 'text-gray-400'}`}>
                  {item.label}
                </span>
                {item.done && <CheckCircle2 size={12} className="text-[#60BA81] ml-auto" />}
              </motion.div>
            ))}
          </div>

          {/* Resolution Progress */}
          <div className="pt-1">
            <div className="flex justify-between text-[10px] font-bold text-[#284952]/50 mb-2">
              <span>RESOLUTION PROGRESS</span>
              <span>65%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#60BA81] to-[#4CAF7A] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '65%' }}
                transition={{ delay: 1, duration: 1.2, ease: IOS_EASE }}
              />
            </div>
          </div>
        </GlassSurface>
      </motion.div>
    </div>
  </div>
)

// === MODULE 4: SURVEYS VISUAL ===
// Content: Digital surveys, multi-language, participant targeting, SMS invitations, responses, AI analysis
const SurveyVisual = () => (
  <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
    {/* Survey gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#EEF2FF] via-white to-[#E0F2FE]" />

    {/* Subtle pattern */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, #3B82F6 1px, transparent 0)',
        backgroundSize: '24px 24px',
      }}
    />

    <div className="relative z-10 flex flex-col items-center gap-4">
      {/* Survey Features Row */}
      <motion.div
        className="flex gap-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { Icon: MessageSquare, label: 'Create', color: '#3B82F6' },
          { Icon: Users, label: 'Target', color: '#06B6D4' },
          { Icon: Mail, label: 'Invite', color: '#6366F1' },
          { Icon: BarChart3, label: 'Analyze', color: '#1E40AF' },
        ].map(({ Icon, label, color }, i) => (
          <motion.div
            key={label}
            className="bg-white rounded-2xl p-3 shadow-lg shadow-black/5 border border-gray-100 flex flex-col items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${color}15`, color }}
            >
              <Icon size={18} strokeWidth={2} />
            </div>
            <span className="text-[8px] font-bold text-[#1E3A8A]/70 uppercase tracking-wider">{label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Survey Card */}
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, ...IOS_SPRING }}
      >
        <GlassSurface className="w-[380px] p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] flex items-center justify-center">
                <ClipboardCheck size={18} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-[#0F172A] text-sm">Employee Wellbeing Survey</div>
                <div className="text-[10px] text-[#64748B]">Multi-language • 847 responses</div>
              </div>
            </div>
            <motion.div
              className="px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] text-[10px] font-bold"
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Live
            </motion.div>
          </div>

          {/* Response Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: 'Sent', value: '1,250', color: '#1E40AF' },
              { label: 'Responded', value: '847', color: '#10B981' },
              { label: 'Rate', value: '68%', color: '#3B82F6' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="bg-slate-50/50 rounded-xl p-2.5 text-center border border-slate-100/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <div className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-tight">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Sentiment Analysis */}
          <div className="bg-gradient-to-r from-[#EFF6FF] to-[#ECFEFF] rounded-xl p-3 border border-blue-50">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-[#3B82F6]" />
              <span className="text-[10px] font-bold text-[#1E3A8A]">AI Sentiment Analysis</span>
            </div>
            <div className="flex gap-2">
              {[
                { label: 'Positive', pct: 62, color: '#10B981' },
                { label: 'Neutral', pct: 28, color: '#F59E0B' },
                { label: 'Negative', pct: 10, color: '#EF4444' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex-1 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <div className="text-sm font-bold" style={{ color: item.color }}>{item.pct}%</div>
                  <div className="text-[8px] font-medium text-slate-500">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </GlassSurface>
      </motion.div>
    </div>
  </div>
)

// === MODULE 5: DASHBOARDS & INSIGHTS VISUAL ===
// Content: Executive Pulse View - Summary Ribbon, Integrity Ring, Vital Signs
const DashboardVisual = () => (
  <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
    {/* Analytics gradient background */}
    <div className="absolute inset-0 bg-gradient-to-tl from-[#F5F7FA] via-white to-[#F0F4F8]" />

    {/* Animated glow spots */}
    <motion.div
      className="absolute top-20 left-20 w-40 h-40 rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(96,186,129,0.1), transparent 70%)', filter: 'blur(30px)' }}
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ duration: 5, repeat: Infinity }}
    />

    <div className="relative z-10 flex flex-col items-center gap-6 w-full px-6">
      {/* 1. Metric Ribbon (Header) */}
      <motion.div
        className="flex justify-between w-full max-w-[400px]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { label: 'Total', value: '482', color: '#284952' },
          { label: 'Anonymous', value: '64', color: '#284952' },
          { label: 'Closed', value: '395', color: '#60BA81' },
          { label: 'In Process', value: '87', color: '#F5A83C' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.08 }}
          >
            <div className="text-2xl font-black leading-none" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* 2. Executive Pulse Card */}
      <motion.div
        initial={{ y: 20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, ...IOS_SPRING }}
        className="w-full max-w-[420px]"
      >
        <GlassSurface className="w-full p-5 flex gap-8 items-center justify-center">
          {/* Left: Integrity Ring (Nested Donut) */}
          <div className="relative w-36 h-36 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 drop-shadow-xl">
              {/* Outer Ring Segments - Production(Green), HR(Orange), Admin(Teal), Issues(Red) */}
              <motion.circle cx="50" cy="50" r="40" fill="none" stroke="#60BA81" strokeWidth="8"
                strokeDasharray="70 251" strokeLinecap="round"
                initial={{ strokeDasharray: "0 251" }} animate={{ strokeDasharray: "70 251" }} transition={{ duration: 1, delay: 0.5 }} />
              <motion.circle cx="50" cy="50" r="40" fill="none" stroke="#F5A83C" strokeWidth="8"
                strokeDasharray="55 251" strokeDashoffset="-78" strokeLinecap="round"
                initial={{ strokeDasharray: "0 251" }} animate={{ strokeDasharray: "55 251" }} transition={{ duration: 1, delay: 0.6 }} />
              <motion.circle cx="50" cy="50" r="40" fill="none" stroke="#284952" strokeWidth="8"
                strokeDasharray="50 251" strokeDashoffset="-140" strokeLinecap="round"
                initial={{ strokeDasharray: "0 251" }} animate={{ strokeDasharray: "50 251" }} transition={{ duration: 1, delay: 0.7 }} />
              <motion.circle cx="50" cy="50" r="40" fill="none" stroke="#EF4444" strokeWidth="8"
                strokeDasharray="40 251" strokeDashoffset="-198" strokeLinecap="round"
                initial={{ strokeDasharray: "0 251" }} animate={{ strokeDasharray: "40 251" }} transition={{ duration: 1, delay: 0.8 }} />

              {/* Inner Ring Segments - Lahore(Green), Karachi(Red), Remote(Orange) */}
              <motion.circle cx="50" cy="50" r="26" fill="none" stroke="#60BA81" strokeWidth="6"
                strokeDasharray="90 163" strokeLinecap="round"
                initial={{ strokeDasharray: "0 163" }} animate={{ strokeDasharray: "90 163" }} transition={{ duration: 1, delay: 0.9 }} />
              <motion.circle cx="50" cy="50" r="26" fill="none" stroke="#EF4444" strokeWidth="6"
                strokeDasharray="35 163" strokeDashoffset="-98" strokeLinecap="round"
                initial={{ strokeDasharray: "0 163" }} animate={{ strokeDasharray: "35 163" }} transition={{ duration: 1, delay: 1.0 }} />
              <motion.circle cx="50" cy="50" r="26" fill="none" stroke="#F5A83C" strokeWidth="6"
                strokeDasharray="20 163" strokeDashoffset="-140" strokeLinecap="round"
                initial={{ strokeDasharray: "0 163" }} animate={{ strokeDasharray: "20 163" }} transition={{ duration: 1, delay: 1.1 }} />
            </svg>
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-[#284952] tracking-tighter">98%</span>
              <span className="text-[7px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Integrity</span>
            </div>
          </div>

          {/* Right: Vital Signs */}
          <div className="flex flex-col gap-3 w-32">
            {/* Happiness Score */}
            <motion.div
              className="flex flex-col gap-1 bg-white rounded-xl p-3 border border-gray-100 shadow-sm items-center"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2 w-full justify-center">
                <Smile size={18} className="text-[#60BA81]" strokeWidth={2.5} />
                <span className="text-xl font-bold text-[#284952]">85</span>
              </div>
              <div className="text-[7px] font-bold text-gray-400 uppercase tracking-wider">Happiness</div>
            </motion.div>

            {/* Safety Score */}
            <motion.div
              className="flex flex-col gap-1 bg-white rounded-xl p-3 border border-gray-100 shadow-sm items-center"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2 w-full justify-center">
                <ShieldCheck size={18} className="text-[#F5A83C]" strokeWidth={2.5} />
                <span className="text-xl font-bold text-[#284952]">92</span>
              </div>
              <div className="text-[7px] font-bold text-gray-400 uppercase tracking-wider">Safety</div>
            </motion.div>
          </div>
        </GlassSurface>
      </motion.div>

      {/* Footer: Active Monitoring Pulse */}
      <motion.div
        className="flex items-center gap-2 bg-[#60BA81]/10 px-3 py-1.5 rounded-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="relative w-2 h-2">
          <div className="absolute inset-0 bg-[#60BA81] rounded-full animate-ping opacity-75" />
          <div className="absolute inset-0 bg-[#60BA81] rounded-full" />
        </div>
        <span className="text-[9px] font-bold text-[#60BA81] uppercase tracking-widest">Live System Monitoring</span>
      </motion.div>
    </div>
  </div>
)

const DynamicCoverArt = ({ id }: { id: number }) => {
  switch (id) {
    case 1:
      return <DeploymentVisual />
    case 2:
      return <IntakeVisual />
    case 3:
      return <InvestigationVisual />
    case 4:
      return <SurveyVisual />
    case 5:
      return <DashboardVisual />
    default:
      return null
  }
}

// --- MAIN SLIDE COMPONENT ---

interface SlideProps {
  index: number
  item: {
    id: number
    shortTitle: string
    headline: string
    subtext: string
    icon: React.ElementType
  }
  status: string
  onClick: () => void
  isPlaying: boolean
  playerComponent: React.ReactNode
  totalSlides: number
  currentTime: number
  scenes?: SceneControl[]
  onSeek?: (time: number) => void
  onStartModule?: () => void
  onClose?: () => void
  entranceDelay?: number
}

const Slide: React.FC<SlideProps> = ({
  index,
  item,
  status,
  onClick,
  isPlaying,
  playerComponent,
  totalSlides,
  currentTime,
  scenes,
  onSeek,
  onStartModule,
  onClose,
  entranceDelay = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || status !== "idle") return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Premium Dark Color Palette - Unified Cohesive Design
  // All dark cards with accent color variations for visual distinction
  const themeColors = [
    {
      // Card 1 - Deep Charcoal with Fresh Green accent
      cardBg: "#1E2A2D",
      textColor: "#FFFFFF",
      subtextColor: "rgba(255,255,255,0.7)",
      accent: "#60BA81",
      accentLight: "rgba(96,186,129,0.12)",
      secondaryAccent: "#F5A83C",
      iconBg: "rgba(96,186,129,0.15)",
      gradient: "from-[#1E2A2D] via-[#243438] to-[#1a2325]",
      glow: "rgba(96,186,129,0.35)",
      decorativeColor: "#60BA81",
      innerGlow: "radial-gradient(ellipse at top center, rgba(96,186,129,0.1) 0%, transparent 55%)",
      borderGradient: "linear-gradient(135deg, rgba(96,186,129,0.4) 0%, rgba(96,186,129,0.1) 50%, rgba(96,186,129,0.25) 100%)",
      isDark: true,
    },
    {
      // Card 2 - Deep Teal with Warm Orange accent
      cardBg: "#1A2C30",
      textColor: "#FFFFFF",
      subtextColor: "rgba(255,255,255,0.7)",
      accent: "#F5A83C",
      accentLight: "rgba(245,168,60,0.12)",
      secondaryAccent: "#60BA81",
      iconBg: "rgba(245,168,60,0.15)",
      gradient: "from-[#1A2C30] via-[#213539] to-[#172628]",
      glow: "rgba(245,168,60,0.35)",
      decorativeColor: "#F5A83C",
      innerGlow: "radial-gradient(ellipse at top center, rgba(245,168,60,0.1) 0%, transparent 55%)",
      borderGradient: "linear-gradient(135deg, rgba(245,168,60,0.4) 0%, rgba(245,168,60,0.1) 50%, rgba(245,168,60,0.25) 100%)",
      isDark: true,
    },
    {
      // Card 3 - Rich Teal with Fresh Green accent
      cardBg: "#284952",
      textColor: "#FFFFFF",
      subtextColor: "rgba(255,255,255,0.75)",
      accent: "#60BA81",
      accentLight: "rgba(96,186,129,0.12)",
      secondaryAccent: "#F5A83C",
      iconBg: "rgba(96,186,129,0.15)",
      gradient: "from-[#284952] via-[#2F5560] to-[#223D45]",
      glow: "rgba(96,186,129,0.35)",
      decorativeColor: "#60BA81",
      innerGlow: "radial-gradient(ellipse at top center, rgba(96,186,129,0.1) 0%, transparent 55%)",
      borderGradient: "linear-gradient(135deg, rgba(96,186,129,0.4) 0%, rgba(96,186,129,0.1) 50%, rgba(96,186,129,0.25) 100%)",
      isDark: true,
    },
    {
      // Card 4 - Vibrant Electric Blue for Surveys
      cardBg: "#1F2830",
      textColor: "#FFFFFF",
      subtextColor: "rgba(255,255,255,0.7)",
      accent: "#3B82F6", // Electric Blue
      accentLight: "rgba(59,130,246,0.15)",
      secondaryAccent: "#06B6D4", // Cyan
      iconBg: "rgba(59,130,246,0.2)",
      gradient: "from-[#1F2830] via-[#263238] to-[#1a2228]",
      glow: "rgba(59,130,246,0.45)",
      decorativeColor: "#3B82F6",
      innerGlow: "radial-gradient(ellipse at top center, rgba(59,130,246,0.15) 0%, transparent 55%)",
      borderGradient: "linear-gradient(135deg, rgba(59,130,246,0.5) 0%, rgba(6,182,212,0.2) 50%, rgba(59,130,246,0.3) 100%)",
      isDark: true,
    },
    {
      // Card 5 - Purple Accent for Surveys
      cardBg: "#1E1E2E",
      textColor: "#FFFFFF",
      subtextColor: "rgba(255,255,255,0.7)",
      accent: "#8B5CF6",
      accentLight: "rgba(139,92,246,0.12)",
      secondaryAccent: "#60BA81",
      iconBg: "rgba(139,92,246,0.15)",
      gradient: "from-[#1E1E2E] via-[#252538] to-[#1a1a28]",
      glow: "rgba(139,92,246,0.35)",
      decorativeColor: "#8B5CF6",
      innerGlow: "radial-gradient(ellipse at top center, rgba(139,92,246,0.1) 0%, transparent 55%)",
      borderGradient: "linear-gradient(135deg, rgba(139,92,246,0.4) 0%, rgba(139,92,246,0.1) 50%, rgba(139,92,246,0.25) 100%)",
      isDark: true,
    },

  ]
  const currentTheme = themeColors[index % themeColors.length]

  const isExpanded = status === "expanded"
  const isIdle = status === "idle"
  const isPeek = status === "peek"
  const isHidden = status === "hidden"

  const getWidth = () => {
    if (isExpanded) return `${EXPANDED_WIDTH}vw`
    if (isPeek) return `${PEEK_WIDTH}vw`
    if (isIdle) return `calc((100% - 2rem) / 5.1)`
    return "0px"
  }

  if (isHidden) return null

  return (
    <motion.div
      ref={cardRef}
      className={`relative h-full cursor-pointer group flex-shrink-0 ${isExpanded ? "z-30" : isPeek ? "z-20" : "z-10"}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      layout
      initial={SLIDE_ENTRANCE.initial}
      animate={{
        ...SLIDE_ENTRANCE.animate,
        width: getWidth(),
      }}
      transition={{
        ...IOS_SPRING,
        delay: entranceDelay,
      }}
      style={{
        willChange: "width, transform",
        perspective: 1000,
        rotateX: isIdle ? rotateX : 0,
        rotateY: isIdle ? rotateY : 0,
      }}
    >
      {/* GlowRing removed for cleaner, more graceful appearance */}

      <motion.div
        className="absolute inset-0 overflow-hidden rounded-[28px]"
        transition={IOS_SPRING}
        style={{
          backgroundColor: isIdle ? currentTheme.cardBg : '#FFFFFF',
          boxShadow: isExpanded
            ? "0 40px 100px -20px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)"
            : `0 8px 32px -8px ${currentTheme.glow}, 0 0 0 1px rgba(0,0,0,0.05)`,
          transition: "background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        whileHover={isIdle ? {
          scale: 1.02,
          y: -8,
          boxShadow: `0 25px 60px -15px ${currentTheme.glow}, 0 0 50px -10px ${currentTheme.accent}30`,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 25,
            mass: 0.8,
          }
        } : undefined}
      >
        {/* Top-right Close button (only visible when expanded). Rendered here so it always sits above internal player visuals. */}
        {isExpanded && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              onClose?.()
            }}
            initial={{ opacity: 0, scale: 0.8, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: -6, transition: { duration: 0.15, ease: [0.4, 0, 1, 1] } }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 420, damping: 26 }}
            className="absolute right-4 top-4 z-50 w-10 h-10 rounded-lg flex items-center justify-center bg-white/96 border border-[#E6EEF0] shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-1"
            aria-label={`Close module ${item.id}`}
          >
            <X size={16} className="text-[#374151]" />
          </motion.button>
        )}

        {/* Shimmer removed for cleaner idle state */}

        <AnimatePresence initial={false}>
          {isIdle ? (
            // === IDLE STATE - Premium Production Grade Design ===
            <motion.div
              key="idle"
              className="w-full h-full absolute inset-0 flex flex-col overflow-hidden"
              initial={{ opacity: 0, scale: 0.96, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.14, ease: [0.4, 0, 1, 1] } }}
              transition={{ duration: 0.45, ease: [0, 0, 0.2, 1], delay: 0.12 }}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.gradient}`} />

              {/* Premium Inner Glow Effect */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: currentTheme.innerGlow }}
              />

              {/* Gradient Border Effect */}
              <div
                className="absolute inset-0 rounded-[28px] pointer-events-none"
                style={{
                  background: currentTheme.borderGradient,
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'xor',
                  WebkitMaskComposite: 'xor',
                  padding: '1.5px',
                }}
              />

              {/* Minimal decorative elements for graceful appearance */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Single subtle decorative circle */}
                <div
                  className="absolute -right-20 -top-20 w-52 h-52 rounded-full"
                  style={{
                    border: `1px solid ${currentTheme.decorativeColor}`,
                    opacity: 0.06,
                  }}
                />
              </div>

              {/* Content Container - Reduced padding for zoom-out effect */}
              <div className="relative z-10 h-full flex flex-col p-6">
                {/* Top Section - Module indicator & Icon */}
                <div className="flex justify-between items-start mb-auto">
                  {/* Step indicator with connecting line */}
                  <div className="flex items-center gap-2.5">
                    <motion.div
                      className="text-[10px] font-bold tracking-[0.2em] uppercase"
                      style={{ color: currentTheme.accent }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Module {item.id}
                    </motion.div>
                    <motion.div
                      className="h-[1px] rounded-full"
                      style={{
                        backgroundColor: currentTheme.accent,
                        boxShadow: `0 0 4px ${currentTheme.accent}30`,
                      }}
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 20, opacity: 0.4 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                    />
                  </div>

                  {/* Icon with CSS animated glow ring */}
                  <div className="relative group">
                    {/* CSS animated glow ring */}
                    <div
                      className="absolute -inset-2 rounded-2xl icon-glow-pulse"
                      style={{
                        background: `radial-gradient(circle, ${currentTheme.accent}25, transparent 70%)`,
                      }}
                    />
                    <div
                      className="relative w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg]"
                      style={{
                        backgroundColor: currentTheme.iconBg,
                        color: currentTheme.accent,
                        border: `1px solid ${currentTheme.accent}20`,
                        boxShadow: `0 4px 12px -2px ${currentTheme.accent}20`,
                      }}
                    >
                      <item.icon size={20} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                {/* Middle Section - Premium Typography Showcase */}
                <div className="flex-1 flex flex-col justify-center">
                  {/* Subtle module number - watermark style - Repositioned for depth */}
                  <div
                    className="absolute -right-4 top-1/2 -translate-y-1/2 text-[60px] font-black leading-none select-none pointer-events-none z-0"
                    style={{
                      color: currentTheme.accent,
                      opacity: 0.04,
                      fontVariantNumeric: 'tabular-nums',
                      transform: 'rotate(-5deg)',
                    }}
                  >
                    0{item.id}
                  </div>

                  {/* Headline - Rescaled for expert production-grade UI */}
                  <motion.h2
                    className="text-[22px] leading-[1.1] mb-5 relative z-10"
                    style={{
                      fontWeight: 900,
                      letterSpacing: '-0.01em',
                      fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1',
                      textRendering: 'optimizeLegibility',
                      WebkitFontSmoothing: 'antialiased',
                      // Premium gradient text
                      background: `linear-gradient(135deg, #FFFFFF 0%, #FFFFFF 50%, ${currentTheme.accent} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      // Enhanced text shadow for premium depth
                      filter: `drop-shadow(0 4px 12px ${currentTheme.accent}30)`,
                    }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {item.headline}
                  </motion.h2>

                  {/* Accent underline - animated reveal */}
                  <motion.div
                    className="h-[4px] rounded-full mb-6 relative z-10"
                    style={{
                      background: `linear-gradient(90deg, ${currentTheme.accent}, ${currentTheme.accent}40, transparent)`,
                      boxShadow: `0 0 12px ${currentTheme.accent}40`
                    }}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 80, opacity: 1 }}
                    transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />

                  {/* Subheading - Fine-tuned for breathability */}
                  <motion.p
                    className="text-[12px] leading-[1.7] line-clamp-3 max-w-[90%] relative z-10"
                    style={{
                      color: 'rgba(255, 255, 255, 0.75)',
                      fontWeight: 500,
                      letterSpacing: '0.01em',
                      fontFeatureSettings: '"kern" 1, "liga" 1',
                      textRendering: 'optimizeLegibility',
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {item.subtext}
                  </motion.p>

                </div>

                {/* Bottom Section - Premium CTA */}
                <motion.div
                  className="flex items-center justify-between rounded-2xl px-4 py-3 backdrop-blur-sm"
                  style={{
                    backgroundColor: currentTheme.accentLight,
                    border: `1px solid ${currentTheme.accent}12`,
                    boxShadow: `0 2px 8px -2px ${currentTheme.accent}15`,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center gap-3">
                    {/* Progress indicator dots */}
                    <div className="flex gap-1">
                      {Array.from({ length: totalSlides }, (_, i) => i + 1).map((dot) => (
                        <motion.div
                          key={dot}
                          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor: dot === item.id ? currentTheme.accent : currentTheme.textColor,
                            opacity: dot === item.id ? 1 : 0.15,
                            boxShadow: dot === item.id ? `0 0 6px ${currentTheme.accent}50` : 'none',
                          }}
                          animate={dot === item.id ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      ))}
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.15em]"
                      style={{ color: currentTheme.textColor, opacity: 0.6 }}
                    >
                      {item.id} of {totalSlides}
                    </span>
                  </div>

                  {/* CTA Button with pulse animation */}
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Pulse ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: currentTheme.accent }}
                      animate={{
                        scale: [1, 1.4, 1.4],
                        opacity: [0.4, 0, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                    <div
                      className="relative w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: currentTheme.accent,
                        boxShadow: `0 4px 12px -3px ${currentTheme.glow}, inset 0 1px 0 rgba(255,255,255,0.2)`,
                      }}
                    >
                      <ArrowRight
                        size={12}
                        className={currentTheme.isDark ? "text-white" : "text-white"}
                        strokeWidth={2.5}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            // === EXPANDED / PLAYING STATE - Premium Redesign ===
            <motion.div
              key="expanded"
              className="flex w-full h-full absolute inset-0 overflow-hidden"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 10,
                transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
              }}
              transition={{ duration: 0.35, ease: [0, 0, 0.2, 1] }}
            >
              {/* LEFT CONTENT SIDE */}
              <motion.div
                layout
                className="flex flex-col justify-between relative z-10 overflow-hidden"
                style={{
                  background: isExpanded
                    ? 'linear-gradient(135deg, #FAFBFC 0%, #F5F7F9 50%, #F0F4F7 100%)'
                    : '#FFFFFF',
                }}
                animate={{
                  width: (isPlaying || (isExpanded && currentTime > 0)) ? "0%" : isExpanded ? "45%" : "100%",
                  padding: (isPlaying || (isExpanded && currentTime > 0)) ? 0 : isExpanded ? "2.5rem" : isPeek ? "1rem" : "2rem",
                  opacity: (isPlaying || (isExpanded && currentTime > 0)) ? 0 : 1,
                }}
                transition={IOS_SPRING}
              >
                {/* Decorative Background Elements for Expanded - Only when not playing and not paused mid-scene */}
                {isExpanded && !isPlaying && currentTime === 0 && (
                  <>
                    {/* Floating accent orbs */}
                    <motion.div
                      className="absolute top-20 right-16 w-32 h-32 rounded-full pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${currentTheme.accent}10, transparent 70%)`,
                        filter: 'blur(20px)',
                      }}
                      animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute bottom-32 left-8 w-24 h-24 rounded-full pointer-events-none"
                      style={{
                        background: `radial-gradient(circle, ${currentTheme.secondaryAccent || currentTheme.accent}08, transparent 70%)`,
                        filter: 'blur(15px)',
                      }}
                      animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Subtle grid pattern */}
                    <div
                      className="absolute inset-0 opacity-[0.02] pointer-events-none"
                      style={{
                        backgroundImage: `
                          linear-gradient(${currentTheme.accent}40 1px, transparent 1px),
                          linear-gradient(90deg, ${currentTheme.accent}40 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px',
                      }}
                    />
                  </>
                )}

                <motion.div layout className="flex flex-col h-full relative z-10">
                  {/* Peek State - Enhanced with gradient bar and icon */}
                  {isPeek && (
                    <>
                      <motion.div
                        className="absolute top-0 left-0 w-full h-1.5 z-20 origin-left"
                        style={{
                          background: `linear-gradient(90deg, ${currentTheme.accent}, ${currentTheme.secondaryAccent || currentTheme.accent}80)`,
                        }}
                        layoutId={`accent-${item.id}`}
                      />
                      {/* Module number badge for peek */}
                      <motion.div
                        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center border backdrop-blur-md"
                        style={{
                          backgroundColor: `${currentTheme.accent}15`,
                          color: currentTheme.accent,
                          borderColor: `${currentTheme.accent}30`,
                        }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <span className="text-xs font-black tracking-tight font-mono">
                          {String(item.id).padStart(2, "0")}
                        </span>
                      </motion.div>
                    </>
                  )}

                  {/* Module Number Header */}
                  <motion.div layout className="flex items-center gap-4 mb-8">
                    <motion.div
                      layout="position"
                      className={`font-mono font-black tracking-tight ${isPeek ? "text-2xl opacity-0" : "text-xl"}`}
                      style={{
                        color: currentTheme.accent,
                        textShadow: `0 2px 8px ${currentTheme.accent}20`,
                      }}
                    >
                      {String(item.id).padStart(2, "0")}
                    </motion.div>
                    {isExpanded && (
                      <>
                        <motion.div
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: 50, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="h-[2px] rounded-full"
                          style={{ backgroundColor: currentTheme.accent }}
                        />
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-xs font-bold uppercase tracking-[0.2em]"
                          style={{ color: `${currentTheme.accent}90` }}
                        >
                          Module {item.id}
                        </motion.span>
                        {/* header content only - close button is rendered at container level */}
                      </>
                    )}
                  </motion.div>

                  <div className={`flex flex-col flex-1 ${isPeek ? "items-center h-full justify-center" : "items-start justify-center"}`}>
                    {isPeek ? (
                      <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                        <motion.h1
                          className="text-sm font-bold tracking-widest uppercase max-h-[60vh] text-center"
                          style={{
                            color: currentTheme.accent,
                            writingMode: "vertical-rl",
                            transform: "rotate(180deg)",
                            textShadow: `0 0 20px ${currentTheme.accent}30`,
                            // Ensure wrapping for long titles in vertical mode
                            wordBreak: "break-word",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {item.headline}
                        </motion.h1>
                      </motion.div>
                    ) : (
                      <motion.div layout className="space-y-4 max-w-lg">
                        {/* Large Display Number - Background decoration */}
                        {isExpanded && (
                          <motion.div
                            className="absolute -left-6 top-1/2 -translate-y-1/2 text-[100px] font-black leading-none select-none pointer-events-none"
                            style={{
                              background: `linear-gradient(180deg, ${currentTheme.accent}15, transparent)`,
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                            }}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                          >
                            {item.id}
                          </motion.div>
                        )}

                        {/* Headline */}
                        <motion.h1
                          layout="position"
                          className={`font-extrabold text-[#1A1D21] tracking-tight relative z-10 ${isExpanded ? "text-3xl lg:text-[2.25rem] leading-[1.1]" : "text-2xl"}`}
                        >
                          {item.headline}
                        </motion.h1>

                        {/* Subtext */}
                        {isExpanded && (
                          <motion.p
                            layout="position"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.5 }}
                            className="text-[#5A6169] font-medium leading-relaxed text-base relative z-10"
                          >
                            {item.subtext}
                          </motion.p>
                        )}



                        {/* Enhanced CTA Button */}
                        {isExpanded && !isPlaying && (
                          <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, type: "spring", stiffness: 200 }}
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onStartModule?.();
                            }}
                            className="flex items-center gap-4 pl-6 pr-5 py-3 text-white rounded-2xl mt-6 shadow-xl hover:shadow-2xl transition-all duration-300 group/btn relative overflow-hidden"
                            style={{
                              background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.accent}DD)`,
                            }}
                          >
                            {/* Shine effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                              initial={{ x: '-100%' }}
                              whileHover={{ x: '100%' }}
                              transition={{ duration: 0.6 }}
                            />

                            <span className="text-sm font-bold tracking-wide relative z-10">Start Module</span>
                            <motion.div
                              className="bg-white/25 rounded-xl p-2 group-hover/btn:bg-white/35 transition-colors relative z-10"
                              whileHover={{ rotate: 90 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Play size={14} fill="currentColor" />
                            </motion.div>
                          </motion.button>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {/* Bottom progress indicator for expanded */}
                  {isExpanded && !isPlaying && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-3 mt-auto pt-4"
                    >
                      <div className="flex gap-2">
                        {Array.from({ length: totalSlides }, (_, i) => i + 1).map((step) => (
                          <motion.div
                            key={step}
                            className="h-1.5 rounded-full transition-all duration-300"
                            style={{
                              width: step === item.id ? 32 : 8,
                              backgroundColor: step === item.id ? currentTheme.accent : '#E2E5E9',
                            }}
                            animate={step === item.id ? { scale: [1, 1.05, 1] } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-[#8A9199]">
                        {item.id} of {totalSlides} modules
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>

              {/* RIGHT VISUAL SIDE - Enhanced */}
              <motion.div
                layout
                className="h-full relative overflow-hidden"
                initial={false}
                animate={{
                  width: (isPlaying || (isExpanded && currentTime > 0)) ? "100%" : isExpanded ? "55%" : "0%",
                  opacity: isExpanded ? 1 : 0,
                }}
                transition={IOS_SPRING}
              >
                {/* Decorative border accent */}
                {isExpanded && !isPlaying && (
                  <motion.div
                    className="absolute left-0 top-8 bottom-8 w-[3px] z-20 rounded-full"
                    style={{
                      background: `linear-gradient(180deg, ${currentTheme.accent}, ${currentTheme.accent}40, ${currentTheme.accent})`,
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  />
                )}

                <AnimatePresence mode="wait">
                  {(isPlaying || (isExpanded && currentTime > 0)) ? (
                    <motion.div
                      key="player-container"
                      className="absolute inset-0 w-full h-full flex bg-[#17161A]"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Control Panel - Left 25% */}
                      {scenes && scenes.length > 0 && onSeek && (
                        <motion.div
                          className="w-[25%] h-full flex-shrink-0 border-r border-white/5"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2, ...IOS_SPRING }}
                        >
                          <ControlPanel
                            scenes={scenes}
                            currentProgress={currentTime}
                            isPlaying={isPlaying}
                            moduleId={`module${item.id}`}
                            onSeek={onSeek}
                          />
                        </motion.div>
                      )}

                      {/* Module Player - Right 75% (or 100% if no control panel) */}
                      <div className={`${scenes && scenes.length > 0 ? 'w-[75%]' : 'w-full'} h-full`}>
                        {playerComponent || (
                          <div className="w-full h-full flex items-center justify-center text-white/50">
                            Module Player
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="visual"
                      className="absolute inset-0 w-full h-full"
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.5 }}
                    >
                      <DynamicCoverArt id={item.id} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default Slide