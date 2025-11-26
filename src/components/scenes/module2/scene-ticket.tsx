"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Check, Shield, Lock, Fingerprint, User } from "lucide-react"
import { useState, useEffect } from "react"

// Apple-style spring presets
const smoothSpring = { type: "spring", stiffness: 300, damping: 30 }
const gentleSpring = { type: "spring", stiffness: 200, damping: 25 }
const microInteraction = { type: "spring", stiffness: 400, damping: 25 }
const cardSpring = { type: "spring", stiffness: 150, damping: 18, mass: 1.2 }

export const SceneTicket = ({ isActive }: { isActive: boolean }) => {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (isActive) {
      setStage(0)
      const timers = [
        setTimeout(() => setStage(1), 1000), 
        setTimeout(() => setStage(2), 2500), 
        setTimeout(() => setStage(3), 5000), 
        setTimeout(() => setStage(4), 7000), 
      ]
      return () => timers.forEach(clearTimeout)
    }
  }, [isActive])

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#F5F5F7] perspective-[1000px] font-sans relative overflow-hidden p-4">
      
      {/* Enhanced Background Stream */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
         {[...Array(12)].map((_, i) => (
           <motion.div
             key={i}
             className="absolute text-[10px] font-mono text-gray-400"
             initial={{ top: -100, left: `${i * 8}%`, opacity: 0 }}
             animate={{ 
               top: "120%", 
               opacity: [0, 0.8, 0],
               scale: [1, 1.1, 1]
             }}
             transition={{ 
               duration: Math.random() * 6 + 4, 
               repeat: Number.POSITIVE_INFINITY, 
               ease: "easeInOut",
               delay: Math.random() * 3
             }}
           >
             {Math.random().toString(2).substring(2, 10)}
           </motion.div>
         ))}
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        
        {/* Enhanced PHASE 1: The "Hiding Details" Story */}
        <div className="h-24 mb-6 relative w-full flex justify-center items-center">
           <AnimatePresence mode="wait">
             
             {/* Enhanced Personal Data */}
             {stage === 1 && (
               <motion.div 
                 key="personal"
                 initial={{ opacity: 0, scale: 0.8, filter: "blur(12px)" }}
                 animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                 exit={{ 
                   opacity: 0, 
                   scale: 0.7, 
                   filter: "blur(15px)",
                   transition: { duration: 0.6, ease: "easeIn" }
                 }}
                 className="flex flex-col items-center gap-1.5"
               >
                 <motion.div 
                   className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center shadow-inner"
                   animate={{ 
                     scale: [1, 1.05, 1],
                     rotate: [0, 5, 0]
                   }}
                   transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                 >
                    <User size={28} className="text-gray-500" />
                 </motion.div>
                 <motion.div 
                   className="bg-white px-3 py-1.5 rounded-md shadow-sm border border-gray-100 flex flex-col items-center"
                   initial={{ y: 10, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 0.2 }}
                 >
                    <span className="text-xs font-bold text-[#284952]">Muhammad Ali</span>
                    <span className="text-[9px] text-gray-400">ID: 35201-99281</span>
                 </motion.div>
               </motion.div>
             )}

             {/* Enhanced Shield (Protection) */}
             {stage >= 2 && stage < 3 && (
               <motion.div 
                 key="shield"
                 initial={{ opacity: 0, scale: 0.6, rotateY: 90, filter: "blur(10px)" }}
                 animate={{ opacity: 1, scale: 1, rotateY: 0, filter: "blur(0px)" }}
                 exit={{ opacity: 0, scale: 1.1, filter: "blur(12px)" }}
                 transition={smoothSpring}
                 className="flex flex-col items-center gap-1.5"
               >
                 <motion.div 
                   className="w-16 h-16 bg-gradient-to-br from-[#284952] to-[#1a3038] rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden"
                   animate={{ 
                     scale: [1, 1.03, 1],
                     rotate: [0, 2, 0]
                   }}
                   transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                 >
                    <motion.div 
                      className="absolute inset-0 bg-white/20"
                      animate={{ 
                        top: ["120%", "-120%"], 
                        skewY: [0, 8, 0],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                    <Shield size={32} className="text-white" />
                 </motion.div>
                 <motion.div 
                   initial={{ opacity: 0, y: 8, scale: 0.9 }}
                   animate={{ opacity: 1, y: 0, scale: 1 }}
                   transition={{ delay: 0.3, ...gentleSpring }}
                   className="flex items-center gap-1.5 text-[#60BA81] bg-[#E6F4EA] px-2.5 py-1 rounded-full"
                 >
                    <Lock size={10} />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Identity Hidden</span>
                 </motion.div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* Enhanced PHASE 2: The Ticket Card */}
        <AnimatePresence>
          {stage >= 3 && (
            <motion.div
              initial={{ rotateX: 60, opacity: 0, y: 100, scale: 0.85 }}
              animate={{ rotateX: 0, opacity: 1, y: 0, scale: 1 }}
              transition={cardSpring}
              style={{ transformStyle: "preserve-3d" }}
              className="w-full bg-white rounded-lg shadow-2xl overflow-hidden relative"
            >
              {/* Green Top Border */}
              <motion.div 
                className="h-1.5 w-full bg-[#284952]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              /> 

              <div className="p-6 flex flex-col items-center text-center">
                
                {/* Enhanced Success Check Circle */}
                <motion.div 
                  initial={{ scale: 0, rotate: -180, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.4, ...microInteraction }}
                  className="w-16 h-16 rounded-full border-4 border-[#284952] flex items-center justify-center mb-4 relative"
                >
                   <motion.svg
                     viewBox="0 0 24 24"
                     className="w-8 h-8 text-[#284952]"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="3"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                   >
                     <motion.path 
                        d="M20 6L9 17l-5-5"
                        initial={{ pathLength: 0, pathOffset: 1 }}
                        animate={{ pathLength: 1, pathOffset: 0 }}
                        transition={{ delay: 0.6, duration: 0.8, ease: "circOut" }}
                     />
                   </motion.svg>
                </motion.div>

                {/* Enhanced Ticket ID Animation */}
                <div className="mb-2 flex flex-col items-center w-full">
                   <motion.div layout className="relative h-8 w-full flex justify-center items-center">
                     <AnimatePresence mode="wait">
                       {stage < 4 ? (
                         <motion.span 
                           key="original"
                           initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                           animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                           exit={{ opacity: 0, y: -15, filter: "blur(8px)", scale: 0.9 }}
                           transition={gentleSpring}
                           className="text-xl font-bold text-[#1d1d1f] tracking-widest font-mono absolute"
                         >
                           FL241120-475002
                         </motion.span>
                       ) : (
                         <motion.div 
                           key="masked"
                           initial={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                           animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                           transition={smoothSpring}
                           className="text-xl font-bold tracking-widest font-mono absolute"
                         >
                           <span className="bg-[#284952] text-white px-1.5 py-0.5 rounded shadow-sm">XX241120-47XXXX</span>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </motion.div>
                   
                   {/* Enhanced Anonymity Label */}
                   <AnimatePresence>
                     {stage >= 4 && (
                       <motion.div
                         initial={{ opacity: 0, height: 0, scale: 0.8 }}
                         animate={{ opacity: 1, height: "auto", scale: 1 }}
                         transition={{ delay: 0.3, ...gentleSpring }}
                         className="flex items-center gap-1 mt-2"
                       >
                         <motion.div
                           animate={{ 
                             rotate: [0, 10, 0],
                             scale: [1, 1.2, 1]
                           }}
                           transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                         >
                           <Fingerprint size={10} className="text-[#F5A83C]" />
                         </motion.div>
                         <span className="text-[9px] font-bold text-[#F5A83C] uppercase tracking-wide">Anonymous ID Assigned</span>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>

                <motion.p
                  className="text-[#767676] mb-6 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  Your ticket number has been generated successfully.
                </motion.p>

                {/* Enhanced Button */}
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: "#E6F4EA" }}
                  whileTap={{ scale: 0.97 }}
                  transition={gentleSpring}
                  className="border border-[#284952] text-[#284952] px-5 py-2 rounded text-sm font-semibold transition-colors"
                >
                  Register Another Complaint
                </motion.button>
              </div>

              {/* Enhanced Security Footer */}
              <AnimatePresence>
                {stage >= 4 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.6, ...gentleSpring }}
                    className="bg-[#F5F5F7] p-2.5 text-center border-t border-gray-100"
                  >
                    <div className="flex items-center justify-center gap-1.5 text-[9px] text-gray-400">
                      <motion.div
                        animate={{ rotate: [0, 10, 0] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      >
                        <Lock size={9} />
                      </motion.div>
                      <span>End-to-end encrypted submission</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}