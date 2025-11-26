
"use client"

import { motion } from "framer-motion"
import { Search, FileCheck, CheckCircle2, ListFilter } from "lucide-react"

const IOS_EASE = [0.32, 0.72, 0, 1]

export const SceneInvestigation = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#F5F5F7] relative overflow-hidden font-sans">
      
      {/* Background Mesh */}
      <div className="absolute inset-0 opacity-[0.03]" 
            style={{ backgroundImage: 'radial-gradient(#284952 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
      />

      <div className="relative z-10 flex flex-col items-center">
        
        {/* Animated Process Visual */}
        <div className="relative w-80 h-40 flex items-center justify-center mb-10">
            {/* The Document */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: IOS_EASE }}
                className="w-24 h-32 bg-white rounded-xl shadow-xl border border-[#DEE2E6] flex flex-col p-3 gap-2 relative z-0"
            >
                <div className="w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center mb-1">
                    <ListFilter size={14} className="text-[#284952]" />
                </div>
                <div className="w-full h-2 bg-[#F5F5F7] rounded-full" />
                <div className="w-2/3 h-2 bg-[#F5F5F7] rounded-full" />
                <div className="w-full h-2 bg-[#F5F5F7] rounded-full mt-auto" />
                
                {/* Result Stamp */}
                <motion.div 
                    initial={{ opacity: 0, scale: 1.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, type: "spring" }}
                    className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-[2px] rounded-xl"
                >
                    <CheckCircle2 size={40} className="text-[#60BA81]" />
                </motion.div>
            </motion.div>

            {/* The Scanner / Glass */}
            <motion.div
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 60, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                className="absolute z-20"
            >
                <div className="w-20 h-20 rounded-full border-[6px] border-[#284952] bg-white/20 backdrop-blur-md shadow-2xl flex items-center justify-center">
                    <Search size={32} className="text-[#284952]" strokeWidth={3} />
                </div>
                {/* Handle */}
                <div className="absolute top-[85%] left-[85%] w-4 h-12 bg-[#284952] rounded-full -rotate-45 origin-top-left -z-10" />
            </motion.div>
        </div>

        {/* Text Composition */}
        <div className="text-center">
          <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#284952]/5 text-[#284952] text-xs font-bold uppercase tracking-widest mb-4"
          >
            Module 03
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: IOS_EASE }}
            className="text-5xl md:text-6xl font-bold tracking-tighter text-[#1d1d1f] mb-3"
          >
            Investigation
          </motion.h1>
          
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: IOS_EASE }}
            className="text-xl text-[#767676] max-w-md mx-auto leading-relaxed"
          >
            Systematic workflows for fair and transparent resolution.
          </motion.p>
        </div>
      </div>
    </div>
  )
}