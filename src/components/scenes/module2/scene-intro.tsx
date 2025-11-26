"use client"

import { motion } from "framer-motion"
import { ShieldCheck, MessageSquare, Phone, Globe, Lock } from "lucide-react"

const IOS_EASE = [0.32, 0.72, 0, 1]

export const SceneIntro = ({ isActive }: { isActive: boolean }) => {
  return (
    // CHANGE 1: Used 'absolute inset-0' instead of 'w-full h-full' to force full container fill
    // CHANGE 2: Removed 'bg-[#F5F5F7]' here because the parent usually handles bg, 
    // but kept it just in case transparency is an issue.
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F5F5F7] overflow-hidden font-sans">
      
      {/* Dynamic Background Gradient */}
      <motion.div
        // CHANGE 3: Changed fixed pixel width (800px) to percentage/viewport units 
        // to ensure it covers the aspect ratio regardless of screen size.
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vh] h-[150vh] min-w-[800px] bg-gradient-to-tr from-[#60BA81]/10 via-[#284952]/5 to-transparent rounded-full blur-[100px]"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Central Composition */}
        {/* CHANGE 4: Reduced 'mb-8' to 'mb-6' to better optically center the visual weight */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center mb-6">
            
            {/* Orbiting Channels */}
            {[Globe, Phone, MessageSquare].map((Icon, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1, rotate: 360 }}
                    transition={{ 
                        opacity: { delay: 0.2 + (i * 0.1), duration: 0.5 },
                        scale: { delay: 0.2 + (i * 0.1), duration: 0.5, type: "spring" },
                        rotate: { duration: 20 + (i * 5), repeat: Number.POSITIVE_INFINITY, ease: "linear" }
                    }}
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                    }}
                >
                    <motion.div 
                        className="absolute w-10 h-10 md:w-12 md:h-12 bg-white rounded-2xl shadow-lg shadow-[#284952]/10 flex items-center justify-center text-[#284952]"
                        style={{
                            top: i === 0 ? '0%' : i === 1 ? '60%' : '60%',
                            left: i === 0 ? '50%' : i === 1 ? '90%' : '10%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        <Icon size={20} />
                    </motion.div>
                </motion.div>
            ))}

            {/* Central Shield Pulse */}
            <motion.div
                className="absolute inset-0 bg-[#60BA81]/20 rounded-full blur-xl"
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />

            {/* Main Icon */}
            <motion.div 
                initial={{ scale: 0.5, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="relative z-20 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-[#284952] to-[#1a2e33] rounded-[2rem] shadow-2xl shadow-[#284952]/30 flex items-center justify-center text-white"
            >
                <ShieldCheck size={48} className="md:w-[56px] md:h-[56px]" strokeWidth={1.5} />
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                    className="absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 bg-[#F5A83C] rounded-full flex items-center justify-center border-4 border-[#F5F5F7]"
                >
                    <Lock size={10} className="md:w-[12px] md:h-[12px] text-white" />
                </motion.div>
            </motion.div>
        </div>

        {/* Typography */}
        <div className="text-center space-y-4">
          <motion.h1
            initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.3, duration: 0.8, ease: IOS_EASE }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#17161A]"
          >
            Complaint Intake
          </motion.h1>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: IOS_EASE }}
            className="flex items-center justify-center gap-4"
          >
             {["Anonymous", "Accessible", "Secure"].map((text, i) => (
                 <div key={i} className="flex items-center gap-2">
                    {i > 0 && <div className="w-1 h-1 rounded-full bg-[#DEE2E6]" />}
                    <span className="text-sm md:text-lg font-medium text-[#767676] tracking-wide">{text}</span>
                 </div>
             ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}