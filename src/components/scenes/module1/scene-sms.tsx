// scene-sms.tsx
"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ShieldCheck, 
  Wifi, 
  CheckCircle2, 
  MessageSquare, 
  Signal
} from "lucide-react"

// --- CONSTANTS ---
const ANIMATION_DURATION = 14; 
// Mapped to Voiceover:
// 0.0s - 5.0s: "Next, every worker is automatically assigned a unique FOS ID."
// 5.0s - 14.0s: "We send these IDs directly... free of cost... without a smartphone."

const BRAND = {
  teal: "#284952",
  green: "#60BA81",
  orange: "#F5A83C",
  white: "#FFFFFF",
  bg: "#F5F5F7"
}

const SMS_ID_PLACEHOLDER = '123';
const SMS_BODY_TEMPLATE = `Moaziz MTM Employee, Aap ka FOS ID hai: ${SMS_ID_PLACEHOLDER}
For any complaint/feedback, Whatsapp: 0329-9129999 Toll-free: 0800-91299 Website: www.fruitofsustainability.com`

// Helper function to insert the styled ID span into the SMS text
const formatSmsBody = (text: string) => {
    return text.split('\n').map((line, lineIndex) => (
        <React.Fragment key={lineIndex}>
            {line.split(SMS_ID_PLACEHOLDER).map((segment, index) => (
                <React.Fragment key={index}>
                    {segment.trim()}
                    {index < line.split(SMS_ID_PLACEHOLDER).length - 1 && (
                        <span className="font-bold text-[#60BA81] bg-[#E6F4EA] px-1 rounded inline-block mx-0.5">
                            {SMS_ID_PLACEHOLDER}
                        </span>
                    )}
                </React.Fragment>
            ))}
            {lineIndex < text.split('\n').length - 1 && <br/>}
        </React.Fragment>
    ));
};

// --- SUB-COMPONENTS ---

const IDCard = ({ scale = 1 }) => (
  <motion.div 
    layoutId="id-card"
    initial={{ scale: 0.8, opacity: 0, y: 20 }}
    animate={{ scale, opacity: 1, y: 0 }}
    className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] rounded-2xl p-6 w-64 flex flex-col items-center relative overflow-hidden"
  >
    {/* Decorative Header */}
    <div className="w-full flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
       <div className="flex items-center gap-2">
         <div className="w-8 h-8 bg-[#284952] rounded-lg flex items-center justify-center">
            <ShieldCheck size={16} className="text-white" />
         </div>
         <span className="text-[10px] font-bold text-[#767676] uppercase tracking-wider">FOS Secure ID</span>
       </div>
       <div className="w-2 h-2 bg-[#60BA81] rounded-full animate-pulse" />
    </div>

    {/* The ID Number (using the original style for visual hierarchy) */}
    <div className="text-center space-y-1 mb-6">
       <div className="text-[10px] text-gray-400 font-medium">ASSIGNED ID</div>
       <div className="text-4xl font-bold text-[#284952] tracking-widest font-mono">
         475<span className="text-[#60BA81]">002</span>
       </div>
    </div>

    {/* Verification Badge */}
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: "spring" }}
      className="bg-[#E6F4EA] text-[#60BA81] px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2"
    >
      <CheckCircle2 size={12} />
      <span>System Verified</span>
    </motion.div>

    {/* Background Shine */}
    <motion.div 
      className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent"
      animate={{ x: ["-100%", "100%"] }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
    />
  </motion.div>
);

// Note: The original 'SmsNotification' component was not used in the scene rendering
// and has been left out for cleaner code, focusing on the inline rendering logic.

// --- MAIN COMPONENT ---

export const SceneSMS = ({ isActive }: { isActive: boolean }) => {
  const [phase, setPhase] = useState("minting"); // minting -> sending -> delivered

  useEffect(() => {
    if (!isActive) return;
    
    // Sequence Timeline
    const t1 = setTimeout(() => setPhase("sending"), 5000); // @ 5s: "Next, every worker..."
    const t2 = setTimeout(() => setPhase("delivered"), 7500); // @ 7.5s: "Directly to employees..."
    
    return () => { clearTimeout(t1); clearTimeout(t2); }
  }, [isActive]);

  return (
    <div className="w-full h-full relative flex items-center justify-center bg-[#F5F5F7] overflow-hidden p-8 font-sans">
      
      {/* --- AMBIENT BACKGROUND --- */}
      <div className="absolute inset-0">
          <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-[#60BA81]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[40vw] h-[40vw] bg-[#284952]/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#284952 0.5px, transparent 0.5px)', backgroundSize: '30px 30px', opacity: 0.05 }} />
      </div>

      <div className="relative z-10 w-full max-w-5xl flex items-center justify-center gap-8 md:gap-20">
        
        {/* --- LEFT: GENERATION HUB --- */}
        <div className="relative w-72 h-80 flex items-center justify-center">
            {/* Base Platform */}
            <div className="absolute bottom-0 w-48 h-12 bg-gray-200/50 rounded-[100%] blur-md" />
            
            <AnimatePresence mode="wait">
                {phase === "minting" && (
                    <motion.div exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.5 } }} className="z-20">
                        <IDCard />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* The "Sender" particles when sending */}
            {phase !== "minting" && (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="w-16 h-16 bg-[#E6F4EA] rounded-full flex items-center justify-center animate-pulse">
                        <CheckCircle2 size={32} className="text-[#60BA81]" />
                    </div>
                </motion.div>
            )}
        </div>

        {/* --- MIDDLE: CONNECTION BEAM --- */}
        <div className="flex-1 h-2 relative bg-gray-200 rounded-full overflow-hidden max-w-[200px]">
            {/* Signal Strength Indicators */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1">
               {[1,2,3,4].map(i => (
                 <motion.div 
                    key={i} 
                    className="w-1 bg-[#284952] rounded-full"
                    style={{ height: i * 4 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                 />
               ))}
            </div>

            {/* The Traveling Message */}
            <AnimatePresence>
                {phase === "sending" && (
                    <motion.div 
                        className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[#60BA81] to-transparent z-20"
                        initial={{ x: "-100%" }}
                        animate={{ x: "300%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                )}
            </AnimatePresence>
        </div>

        {/* --- RIGHT: THE DEVICE (Updated Inbox UI) --- */}
        <div className="relative w-64 h-[400px] flex items-center justify-center">
           <motion.div 
              className="w-full h-full bg-[#17161A] rounded-[2.5rem] border-[6px] border-[#383838] shadow-2xl relative overflow-hidden flex flex-col"
              initial={{ rotateY: 15 }}
              animate={{ rotateY: 0 }}
              transition={{ duration: 1 }}
           >
              {/* Dynamic Island / Notch */}
              <div className="h-6 w-1/3 bg-black mx-auto rounded-b-xl z-20 absolute top-0 left-1/3" />
              
              {/* Screen Content */}
              <div className="flex-1 bg-white relative flex flex-col overflow-hidden">
                 
                 {/* Status Bar - Simpler for SMS UI */}
                 <div className="h-8 flex justify-between items-center px-5 pt-1.5 bg-white border-b border-gray-100">
                    <span className="text-[10px] font-bold text-gray-500">9:41 AM</span>
                    <div className="flex gap-1 items-center">
                        <Signal size={12} className="text-[#284952]" />
                        <Wifi size={12} className="text-[#284952]" />
                        <div className="text-[10px] font-bold text-[#284952]">100%</div>
                    </div>
                 </div>

                 {/* SMS App Header */}
                 <div className="h-14 flex items-center px-4 bg-gray-50 border-b border-gray-100">
                    <div className="w-8 h-8 bg-[#60BA81] rounded-full flex items-center justify-center mr-3">
                        <MessageSquare size={16} className="text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#284952]">Messages</span>
                        <span className="text-[10px] text-gray-500">Inbox</span>
                    </div>
                 </div>

                 {/* Message List */}
                 <div className="flex-1 p-4 bg-[#F5F5F7] flex flex-col justify-start space-y-4 pt-6">
                    
                    {/* Previous message (Context) - Placeholder for existing conversation */}
                    <div className="w-full flex justify-start">
                        <div className="bg-gray-200/80 p-3 rounded-2xl rounded-bl-sm text-xs max-w-[80%] text-[#17161A] shadow-sm">
                            <div className="text-[10px] font-medium text-gray-600 mb-1">FOS Hotline</div>
                            <div className="leading-tight">
                                Dear Employee, your welcome kit is ready.
                            </div>
                            <div className="mt-1 text-[9px] text-gray-400 text-right">Yesterday</div>
                        </div>
                    </div>

                    {/* The NEW Message (Animated Delivery) */}
                    <AnimatePresence>
                        {phase === "delivered" && (
                            <motion.div 
                                initial={{ scale: 0.8, opacity: 0, x: -20 }}
                                animate={{ scale: 1, opacity: 1, x: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                className="w-full flex justify-start"
                            >
                                {/* Actual Message Bubble */}
                                <div className="bg-white p-3 rounded-2xl rounded-bl-sm shadow-md text-[#17161A] border border-gray-100 relative max-w-[90%]">
                                    <div className="text-[10px] font-bold mb-1 text-[#284952]">FOS Hotline</div>
                                    <div className="text-xs leading-relaxed whitespace-pre-line">
                                        {formatSmsBody(SMS_BODY_TEMPLATE)}
                                    </div>
                                    <div className="mt-2 text-[9px] text-gray-400 text-right">Just now</div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                 </div>

                 {/* Free SMS Indicator at the bottom */}
                 <AnimatePresence>
                     {phase === "delivered" && (
                        <motion.div 
                           initial={{ y: 10, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.5 }}
                           className="h-10 flex items-center justify-center bg-gray-50 border-t border-gray-100"
                        >
                            <span className="bg-[#F5A83C] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm mr-2">
                                FREE SMS
                            </span>
                            <span className="text-[9px] text-gray-500">No internet/smartphone required</span>
                        </motion.div>
                     )}
                 </AnimatePresence>

                 {/* Screen Reflection overlay */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 pointer-events-none z-10" />
              </div>
           </motion.div>
           
           {/* Shadow */}
           <div className="absolute -bottom-4 w-40 h-4 bg-black/20 rounded-[100%] blur-lg" />
        </div>

      </div>

    </div>
  )
}