"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Shield, Eye, EyeOff, Lock, AlertTriangle, Fingerprint, CheckCircle2, ShieldCheck } from "lucide-react"
import { useState, useEffect } from "react"

// Apple-style spring presets
const smoothSpring = { type: "spring", stiffness: 300, damping: 30 }
const gentleSpring = { type: "spring", stiffness: 200, damping: 25 }
const microInteraction = { type: "spring", stiffness: 400, damping: 25 }

export const SceneAnonymity = ({ isActive }: { isActive: boolean }) => {
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [trackingId, setTrackingId] = useState<string | null>(null)
  const [protectedFields, setProtectedFields] = useState<string[]>([])
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (isActive) {
      setStage(0)
      setIsAnonymous(false)
      setTrackingId(null)
      setProtectedFields([])

      const timers = [
        setTimeout(() => setStage(1), 500),
        setTimeout(() => setIsAnonymous(true), 3200),
        setTimeout(() => setStage(2), 3500),
        setTimeout(() => setProtectedFields(["id", "name"]), 7500),
        setTimeout(() => setProtectedFields(["id", "name", "mobile"]), 8500),
        setTimeout(() => setStage(3), 9000),
        setTimeout(() => setTrackingId("FOS-ANON-2025-8947"), 10500),
      ]
      return () => timers.forEach(clearTimeout)
    }
  }, [isActive])

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F5F5F7] via-white to-[#E8EEF1] relative overflow-hidden font-sans p-4">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 180, 360],
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[300px] h-[300px]"
        >
          <Shield className="w-full h-full text-[#284952]" strokeWidth={0.5} />
        </motion.div>
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px]"
        >
          <ShieldCheck className="w-full h-full text-[#60BA81]" strokeWidth={0.5} />
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-md px-2">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <motion.div
              animate={{ 
                rotate: [0, 8, -8, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <Shield className="text-[#284952]" size={24} strokeWidth={2} />
            </motion.div>
            <motion.h2 
              className="text-2xl font-bold text-[#1d1d1f]"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Privacy Protection
            </motion.h2>
          </div>
          <motion.p
            className="text-[#86868b] text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Identity masking for sensitive grievances
          </motion.p>
        </motion.div>

        {/* Enhanced Main Form Card */}
        <motion.div
          className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-white/60 overflow-hidden"
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={smoothSpring}
        >
          {/* Enhanced Header */}
          <div className="relative bg-gradient-to-r from-[#60BA81] via-[#4a9d6a] to-[#284952] px-4 py-4 flex justify-between items-center overflow-hidden">
            <div className="relative z-10">
              <motion.h3 
                className="text-white font-bold text-lg mb-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Complaint/Feedback Form
              </motion.h3>
              <motion.p 
                className="text-white/80 text-xs font-medium"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Fill form carefully for registration
              </motion.p>
            </div>
            
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -right-8 -top-8 opacity-10"
            >
              <Shield className="w-32 h-32 text-white" strokeWidth={1} />
            </motion.div>

            {/* Enhanced Protected Badge */}
            {isAnonymous && (
              <motion.div
                initial={{ scale: 0, rotate: -90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={microInteraction}
                className="relative z-10 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5"
              >
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Lock className="text-white" size={14} strokeWidth={2.5} />
                </motion.div>
                <span className="text-white font-bold text-xs">Protected</span>
              </motion.div>
            )}
          </div>

          <div className="p-4">
            {/* Enhanced Toggle Section */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {/* Urgent Toggle */}
              <motion.div 
                className="bg-gray-50 border-2 border-gray-200 rounded-lg p-3 flex items-center justify-between opacity-60"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle size={18} className="text-[#F5A83C]" strokeWidth={2} />
                  <span className="text-xs font-semibold text-gray-600">Urgent</span>
                </div>
                <div className="w-10 h-6 bg-gray-300 rounded-full relative shadow-inner">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-md" />
                </div>
              </motion.div>

              {/* Enhanced Anonymous Toggle */}
              <motion.div
                className={`
                  border-2 rounded-lg p-3 flex items-center justify-between cursor-pointer
                  ${
                    isAnonymous
                      ? "bg-gradient-to-br from-[#E6F4EA] to-[#d4eedc] border-[#60BA81] shadow-md"
                      : "bg-gray-50 border-gray-200"
                  }
                `}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2">
                  <AnimatePresence mode="wait">
                    {isAnonymous ? (
                      <motion.div
                        key="off"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                        transition={microInteraction}
                      >
                        <EyeOff size={18} className="text-[#60BA81]" strokeWidth={2.5} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="on"
                        initial={{ scale: 0, rotate: 90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: -90 }}
                        transition={microInteraction}
                      >
                        <Eye size={18} className="text-gray-500" strokeWidth={2} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className={`text-xs font-semibold ${isAnonymous ? "text-[#284952]" : "text-gray-600"}`}>
                    Anonymous
                  </span>
                </div>
                <div
                  className={`
                  w-10 h-6 rounded-full relative shadow-inner transition-colors duration-500
                  ${isAnonymous ? "bg-[#60BA81]" : "bg-gray-300"}
                `}
                >
                  <motion.div
                    className="w-4 h-4 bg-white rounded-full absolute top-1 shadow-md"
                    animate={{ x: isAnonymous ? 18 : 4 }}
                    transition={gentleSpring}
                  />
                </div>
              </motion.div>
            </div>

            {/* Enhanced Form Fields */}
            <AnimatePresence>
              {stage >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <EnhancedProtectedField
                      label="FOS ID"
                      visibleValue="FOS-35201-982"
                      isProtected={protectedFields.includes("id")}
                      protectionType="ENCRYPTED"
                      delay={0}
                    />
                    <EnhancedProtectedField
                      label="Name"
                      visibleValue="Muhammad Ali Hassan"
                      isProtected={protectedFields.includes("name")}
                      protectionType="HIDDEN"
                      delay={0.1}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <EnhancedPublicField label="Company" value="Pearl Textiles Ltd" delay={0.2} />
                    <EnhancedProtectedField
                      label="Mobile Number"
                      visibleValue="+92 300 1234567"
                      isProtected={protectedFields.includes("mobile")}
                      protectionType="MASKED"
                      delay={0.3}
                    />
                  </div>

                  {/* Enhanced Protection Highlight */}
                  {stage >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={gentleSpring}
                      className="bg-gradient-to-r from-[#60BA81]/10 to-[#284952]/10 rounded-lg border-2 border-dashed border-[#60BA81] p-3 flex items-center gap-2"
                    >
                      <motion.div
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      >
                        <Shield className="text-[#60BA81]" size={18} strokeWidth={2} />
                      </motion.div>
                      <div>
                        <motion.p 
                          className="text-xs font-semibold text-[#60BA81]"
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          Protected from employer
                        </motion.p>
                        <motion.p 
                          className="text-[10px] text-[#60BA81]/70"
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          Your identity is safely hidden
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhanced Tracking ID Section */}
            <AnimatePresence>
              {trackingId && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={smoothSpring}
                  className="relative mt-6"
                >
                  <div className="bg-gradient-to-br from-[#17161A] via-[#1d1d1f] to-[#284952] text-white p-4 rounded-xl shadow-lg border border-white/10 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="absolute -top-1/2 -right-1/2 w-full h-full"
                      >
                        <Fingerprint className="w-full h-full" strokeWidth={0.5} />
                      </motion.div>
                    </div>

                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-12 h-12 bg-gradient-to-br from-[#60BA81] to-[#4a9d6a] rounded-xl flex items-center justify-center shadow-md"
                          animate={{ 
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.05, 1]
                          }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        >
                          <Fingerprint className="text-white" size={24} strokeWidth={2} />
                        </motion.div>
                        <div>
                          <motion.p 
                            className="text-[10px] text-white/60 uppercase tracking-[0.15em] font-bold mb-1"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            Anonymous Tracking ID
                          </motion.p>
                          <motion.p
                            className="font-mono text-lg font-bold text-[#F5A83C] tracking-wider"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, ...gentleSpring }}
                          >
                            {trackingId}
                          </motion.p>
                        </div>
                      </div>
                      <motion.div
                        className="p-2 bg-white/10 rounded-lg"
                        animate={{ 
                          rotate: [0, 8, -8, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      >
                        <CheckCircle2 className="text-[#60BA81]" size={24} strokeWidth={2} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Enhanced Protected Field Component
interface EnhancedProtectedFieldProps {
  label: string
  visibleValue: string
  isProtected: boolean
  protectionType: "ENCRYPTED" | "HIDDEN" | "MASKED"
  delay?: number
}

const EnhancedProtectedField = ({ label, visibleValue, isProtected, protectionType, delay = 0 }: EnhancedProtectedFieldProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="space-y-1.5"
  >
    <label className="text-[10px] font-bold text-[#86868b] uppercase tracking-wide flex items-center gap-1.5">
      {label}
      {isProtected && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={microInteraction}
        >
          <Lock size={10} className="text-[#60BA81]" strokeWidth={2} />
        </motion.div>
      )}
    </label>
    <div className="relative h-9 bg-gray-50 rounded-lg border-2 border-gray-200 flex items-center px-3 overflow-hidden transition-all duration-500 hover:border-gray-300">
      <AnimatePresence mode="wait">
        {!isProtected ? (
          <motion.span
            key="visible"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              filter: "blur(8px)", 
              scale: 0.95,
              transition: { duration: 0.4, ease: "easeIn" }
            }}
            className="font-mono text-[#1d1d1f] font-medium text-xs truncate"
          >
            {visibleValue}
          </motion.span>
        ) : (
          <motion.div
            key="hidden"
            initial={{ opacity: 0, x: -15, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-1.5 text-[#60BA81]"
          >
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              <Lock size={12} strokeWidth={2.5} />
            </motion.div>
            <span className="font-mono font-bold tracking-[0.15em] text-[10px]">{protectionType}</span>
            <motion.div
              className="ml-1.5 flex gap-0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 bg-[#60BA81] rounded-full"
                  animate={{ 
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Number.POSITIVE_INFINITY, 
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
)

// Enhanced Public Field Component
interface EnhancedPublicFieldProps {
  label: string
  value: string
  delay?: number
}

const EnhancedPublicField = ({ label, value, delay = 0 }: EnhancedPublicFieldProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="space-y-1.5"
  >
    <label className="text-[10px] font-bold text-[#86868b] uppercase tracking-wide">{label}</label>
    <motion.div 
      className="h-9 bg-gray-50 rounded-lg border-2 border-gray-200 flex items-center px-3 transition-all duration-500 hover:border-gray-300"
      whileHover={{ scale: 1.01 }}
    >
      <span className="text-[#1d1d1f] font-medium text-xs truncate">{value}</span>
    </motion.div>
  </motion.div>
)