"use client"

import { motion } from "framer-motion"
import { Activity, TrendingUp, PieChart, BarChart3, Zap } from "lucide-react"
import { useState, useEffect, useRef } from "react"

// --- CONSTANTS ---
const COLORS = {
  deepTeal: "#284952",
  freshGreen: "#60BA81",
  warmOrange: "#F5A83C",
  charcoal: "#17161A",
  lightGray: "#F5F5F7",
}

const IOS_EASE = [0.32, 0.72, 0, 1]

// --- RESPONSIVE WRAPPER ---
const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return
      const parent = containerRef.current.parentElement
      if (!parent) return
      const { width, height } = parent.getBoundingClientRect()
      const scaleX = width / 1280
      const scaleY = height / 720
      setScale(Math.min(scaleX, scaleY))
    }
    handleResize()
    const observer = new ResizeObserver(handleResize)
    if (containerRef.current?.parentElement) {
      observer.observe(containerRef.current.parentElement)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden bg-[#F5F5F7]">
      <div 
        style={{ width: 1280, height: 720, transform: `scale(${scale})`, transformOrigin: "center center" }} 
        className="shrink-0 flex items-center justify-center"
      >
        {children}
      </div>
    </div>
  )
}

export const SceneIntro = ({ isActive }: { isActive: boolean }) => {
  return (
    <ResponsiveContainer>
      <div className="w-full h-full flex items-center justify-center relative overflow-hidden font-sans">
        
        {/* Ambient Glows */}
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#60BA81]/5 rounded-full blur-[120px]" 
        />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#F5A83C]/5 rounded-full blur-[120px]" />

        <div className="relative z-10 flex flex-col items-center w-full max-w-3xl">
          
          {/* Abstract Data Visualization (The Module 2 Style) */}
          <div className="flex gap-6 items-end h-40 mb-12">
              {[40, 75, 55, 90, 65].map((height, i) => (
                  <motion.div
                      key={i}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: `${height}%`, opacity: 1 }}
                      transition={{ 
                          delay: 0.2 + i * 0.1, 
                          duration: 1, 
                          ease: IOS_EASE 
                      }}
                      className="w-16 rounded-t-2xl relative"
                      style={{ 
                          backgroundColor: i === 3 ? COLORS.deepTeal : "rgba(96, 186, 129, 0.2)", // Highlight the tallest bar
                      }}
                  >
                      {/* Floating Icon on Top of Highlighted Bar */}
                      {i === 3 && (
                          <motion.div
                              initial={{ scale: 0, y: 20 }}
                              animate={{ scale: 1, y: -20 }}
                              transition={{ delay: 0.8, ...IOS_EASE }}
                              className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-full p-3 text-[#F5A83C]"
                          >
                              <TrendingUp size={24} strokeWidth={3} />
                          </motion.div>
                      )}
                  </motion.div>
              ))}
          </div>

          {/* Typography */}
          <div className="text-center relative">
            <motion.h1
              initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", y: 20 }}
              animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: IOS_EASE }}
              className="text-7xl font-bold tracking-tight text-[#17161A] mb-4 leading-tight"
            >
              Dashboards & Insights
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center justify-center gap-8"
            >
                <div className="flex items-center gap-2 text-[#284952]">
                  <Activity size={20} />
                  <span className="text-lg font-semibold">Real-time Intelligence</span>
                </div>
                <div className="w-px h-5 bg-[#DEE2E6]" />
                <div className="flex items-center gap-2 text-[#60BA81]">
                  <PieChart size={20} />
                  <span className="text-lg font-semibold">Risk Monitoring</span>
                </div>
                <div className="w-px h-5 bg-[#DEE2E6]" />
                <div className="flex items-center gap-2 text-[#F5A83C]">
                  <Zap size={20} />
                  <span className="text-lg font-semibold">Strategic Decisions</span>
                </div>
            </motion.div>
          </div>

        </div>
      </div>
    </ResponsiveContainer>
  )
}