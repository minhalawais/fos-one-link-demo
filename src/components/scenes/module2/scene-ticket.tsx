"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Check, MessageSquare, Smartphone, ExternalLink, Bell } from "lucide-react"

// --- TIMING (Total: 18s -> 95s to 113s) ---
const TIMING = {
  START: 95,
  TICKET_REVEAL: 95.5,   // "system generates a unique ticket number"
  SMS_TRANSITION: 101,   // "shared with the worker through an SMS"
  NOTIFICATION: 102,     // Notification pops up
  END: 113
}

export const SceneTicket = ({ isActive, progress }: { isActive: boolean, progress: number }) => {

  // Stages based on progress
  const showTicket = progress >= TIMING.TICKET_REVEAL && progress < TIMING.SMS_TRANSITION
  const showSMS = progress >= TIMING.SMS_TRANSITION
  const showNotification = progress >= TIMING.NOTIFICATION

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#F5F5F7] perspective-[1000px] font-sans relative overflow-hidden p-4">

      {/* Background: Digital Data Stream (Subtle) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[10px] font-mono text-[#284952] font-bold"
            initial={{ top: -100, left: `${10 + i * 12}%`, opacity: 0 }}
            animate={{
              top: "120%",
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: Math.random() * 5
            }}
          >
            {Array(20).fill(0).map(() => Math.random().toString(36).substring(2, 3)).join('')}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md h-[500px] flex items-center justify-center">
        <AnimatePresence mode="wait">

          {/* --- STAGE 1: TICKET GENERATION CARD --- */}
          {showTicket && (
            <motion.div
              key="ticket-card"
              initial={{ rotateX: 45, opacity: 0, scale: 0.9, y: 50 }}
              animate={{ rotateX: 0, opacity: 1, scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -50, filter: "blur(10px)" }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden relative"
            >
              <div className="h-2 w-full bg-[#284952]" />
              <div className="p-8 flex flex-col items-center text-center">

                {/* Success Check */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 rounded-full bg-[#E6F4EA] flex items-center justify-center mb-6"
                >
                  <Check size={40} className="text-[#60BA81]" strokeWidth={3} />
                </motion.div>

                <h3 className="text-[#767676] text-sm font-medium uppercase tracking-wider mb-2">Complaint Registered</h3>

                {/* Ticket ID Construction Animation */}
                <div className="mb-8 relative">
                  <motion.div
                    className="text-3xl font-bold text-[#284952] font-mono tracking-widest"
                    initial={{ opacity: 0, filter: "blur(8px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    FL24-475002
                  </motion.div>
                  <motion.div
                    className="absolute -right-6 top-1 text-[10px] font-bold text-[#F5A83C] border border-[#F5A83C] px-1 rounded"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                  >
                    NEW
                  </motion.div>
                </div>

                <div className="w-full bg-gray-50 rounded-lg p-3 text-xs text-gray-500 border border-gray-100 flex items-center justify-between">
                  <span>Status</span>
                  <span className="font-bold text-[#60BA81]">Submitted</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* --- STAGE 2: SMS DELIVERY (PHONE UI) --- */}
          {showSMS && (
            <motion.div
              key="phone-sms"
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 24 }}
              className="w-[280px] h-[520px] bg-[#1a1a1a] rounded-[40px] border-[12px] border-[#2c2c2c] shadow-2xl overflow-hidden relative flex flex-col"
            >
              {/* Dynamic Island */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-20" />

              {/* Screen Content */}
              <div className="flex-1 bg-white relative flex flex-col">

                {/* Status Bar */}
                <div className="h-8 flex justify-between items-end px-6 pb-1 text-[10px] font-bold text-gray-800">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-2.5 bg-gray-800 rounded-[2px]" />
                  </div>
                </div>

                {/* LOCK SCREEN WALLPAPER */}
                <div className="flex-1 bg-gradient-to-b from-gray-200 to-gray-300 relative p-4 pt-12 flex flex-col items-center">
                  <div className="text-6xl font-thin text-white mix-blend-overlay mb-2">09:41</div>
                  <div className="text-sm font-medium text-white/80 mix-blend-overlay">Monday, 24 Nov</div>

                  {/* NOTIFICATION BANNER */}
                  <AnimatePresence>
                    {showNotification && (
                      <motion.div
                        initial={{ y: -50, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="mt-8 w-full bg-white/90 backdrop-blur-xl rounded-2xl p-3 shadow-lg cursor-pointer"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-5 h-5 bg-[#60BA81] rounded-md flex items-center justify-center">
                            <MessageSquare size={12} className="text-white" />
                          </div>
                          <span className="text-[10px] font-bold text-gray-600 uppercase">Messages • now</span>
                        </div>
                        <div className="pl-7">
                          <div className="text-xs font-bold text-[#1a1a1a] mb-0.5">FOS Grievance System</div>
                          <div className="text-[11px] text-gray-600 leading-tight">
                            Ticket <span className="text-[#284952] font-mono font-bold">#FL24-475002</span> generated.
                            Tap to view status and tracking details.
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Fingerprint Hint */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-6 w-12 h-1 bg-black rounded-full"
                  />
                </div>
              </div>

              {/* Reflection Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none rounded-[30px] z-10" />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}