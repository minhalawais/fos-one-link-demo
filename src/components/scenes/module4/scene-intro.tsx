"use client"

import { motion } from "framer-motion"
import { Activity, TrendingUp, PieChart } from "lucide-react"

const IOS_EASE = [0.32, 0.72, 0, 1]

export const SceneIntro = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#F5F5F7] relative overflow-hidden font-sans">
      {/* Ambient Glows */}
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#60BA81]/5 rounded-full blur-[100px]" 
      />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F5A83C]/5 rounded-full blur-[100px]" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl">
        
        {/* Abstract Data Visualization */}
        <div className="flex gap-4 items-end h-32 mb-10">
            {[40, 75, 55, 90, 65].map((height, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: `${height}%`, opacity: 1 }}
                    transition={{ 
                        delay: 0.2 + (i * 0.1), 
                        duration: 1, 
                        ease: IOS_EASE,
                        type: "spring",
                        stiffness: 100 
                    }}
                    className={`w-12 rounded-t-2xl relative group`}
                >
                    {/* Bar Gradient */}
                    <div className={`absolute inset-0 rounded-t-2xl opacity-20 ${
                        i === 3 ? 'bg-[#F5A83C]' : i === 1 ? 'bg-[#60BA81]' : 'bg-[#284952]'
                    }`} />
                    
                    {/* Active Line Indicator */}
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1 + (i * 0.1), duration: 0.5 }}
                        className={`absolute top-0 left-0 right-0 h-1 rounded-full ${
                              i === 3 ? 'bg-[#F5A83C]' : i === 1 ? 'bg-[#60BA81]' : 'bg-[#284952]'
                        }`} 
                    />

                    {/* Floating Icon for tallest bar */}
                    {i === 3 && (
                        <motion.div
                            initial={{ scale: 0, y: 10 }}
                            animate={{ scale: 1, y: -20 }}
                            transition={{ delay: 0.8, type: "spring" }}
                            className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-full p-2 text-[#F5A83C]"
                        >
                            <TrendingUp size={16} strokeWidth={3} />
                        </motion.div>
                    )}
                </motion.div>
            ))}
        </div>

        {/* Typography */}
        <div className="text-center relative">
          <motion.h1
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            transition={{ delay: 0.5, duration: 0.8, ease: IOS_EASE }}
            className="text-6xl font-bold tracking-tight text-[#17161A] mb-2"
          >
            Insights & Risk
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex items-center justify-center gap-6"
          >
              <div className="flex items-center gap-2 text-[#284952]">
                <Activity size={18} />
                <span className="font-semibold">Real-time</span>
              </div>
              <div className="w-px h-4 bg-[#DEE2E6]" />
              <div className="flex items-center gap-2 text-[#284952]">
                <PieChart size={18} />
                <span className="font-semibold">Predictive</span>
              </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}
