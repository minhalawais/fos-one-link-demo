"use client"

import { motion, AnimatePresence } from "framer-motion"
import { FileText, Search, Tag, AlertCircle, CheckCircle2, ScanLine } from "lucide-react"
import { useState, useEffect } from "react"

export const SceneReview = ({ isActive }: { isActive: boolean }) => {
  const [stage, setStage] = useState(0)

  // Sync with Voiceover
  // 61.24s: Start ("Quick review") -> Scanning
  // 65.00s: "Information complete" -> Badges appear
  // 69.00s: "Launching" -> Verified Stamp
  useEffect(() => {
    if (isActive) {
      setStage(0)
      const timers = [
        setTimeout(() => setStage(1), 500),   // Start Scan
        setTimeout(() => setStage(2), 3500),  // Categorization
        setTimeout(() => setStage(3), 7000),  // Verification
      ]
      return () => timers.forEach(clearTimeout)
    } else {
      setStage(0)
    }
  }, [isActive])

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#F5F5F7] p-4 relative overflow-hidden">
      
      {/* Background Pulse */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.5], opacity: [0.1, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-[50vh] h-[50vh] bg-[#284952]/10 rounded-full"
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        
        {/* LEFT: The Document being Scanned */}
        <motion.div 
          className="relative bg-white h-[280px] w-[220px] md:h-[340px] md:w-[260px] rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex-shrink-0"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {/* Content Skeleton */}
          <div className="p-6 space-y-4 opacity-50">
             <div className="h-4 bg-gray-200 rounded w-1/3" />
             <div className="space-y-2">
                <div className="h-2 bg-gray-100 rounded w-full" />
                <div className="h-2 bg-gray-100 rounded w-full" />
                <div className="h-2 bg-gray-100 rounded w-2/3" />
             </div>
             <div className="h-32 bg-gray-50 rounded-lg border border-dashed border-gray-200" />
          </div>

          {/* Scanning Overlay */}
          <AnimatePresence>
            {stage === 1 && (
              <motion.div
                initial={{ top: "-20%" }}
                animate={{ top: "120%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5, ease: "linear", repeat: 1 }}
                className="absolute left-0 right-0 h-20 bg-gradient-to-b from-[#60BA81]/0 via-[#60BA81]/20 to-[#60BA81]/0 z-20 border-b-2 border-[#60BA81]"
              >
                <div className="absolute bottom-0 right-2 text-[10px] font-bold text-[#60BA81] uppercase tracking-wider bg-white/80 px-1 rounded">
                   Analyzing...
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Verified Overlay */}
          {stage >= 3 && (
            <motion.div 
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 bg-[#60BA81]/10 flex items-center justify-center backdrop-blur-[1px]"
            >
              <div className="bg-white p-3 rounded-full shadow-lg border-2 border-[#60BA81]">
                 <CheckCircle2 size={48} className="text-[#60BA81]" />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* RIGHT: Analysis Results */}
        <div className="flex flex-col gap-3 md:gap-4 w-full max-w-sm">
           <motion.h3 
             className="text-xl md:text-2xl font-bold text-[#284952] mb-2"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
           >
             System Review
           </motion.h3>

           <AnimatePresence>
             {stage >= 2 && (
               <>
                 <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-3 md:p-4 rounded-xl shadow-lg border-l-4 border-[#F5A83C] flex items-center justify-between"
                 >
                    <div>
                       <p className="text-[10px] text-gray-400 uppercase font-bold">Category Detected</p>
                       <p className="text-sm md:text-base font-bold text-[#1d1d1f]">Harassment / Discrimination</p>
                    </div>
                    <Tag className="text-[#F5A83C]" size={20} />
                 </motion.div>

                 <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-3 md:p-4 rounded-xl shadow-lg border-l-4 border-[#60BA81] flex items-center justify-between"
                 >
                    <div>
                       <p className="text-[10px] text-gray-400 uppercase font-bold">Completeness</p>
                       <p className="text-sm md:text-base font-bold text-[#1d1d1f]">100% Data Verified</p>
                    </div>
                    <ScanLine className="text-[#60BA81]" size={20} />
                 </motion.div>
               </>
             )}
           </AnimatePresence>
        </div>

      </div>
    </div>
  )
}