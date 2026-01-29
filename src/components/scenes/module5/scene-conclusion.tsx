"use client"

import { motion } from "framer-motion"
import { BarChart3, Shield, Users, CheckCircle } from "lucide-react"

interface SceneProps {
  isActive: boolean
  progress: number
  sceneProgress: number
}

const appleEase = [0.4, 0, 0.2, 1]

export function SceneConclusion({ isActive, progress, sceneProgress }: SceneProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-[#F5F5F7] via-white to-[#F5F5F7] overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#60BA81]/8 rounded-full blur-[180px]"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#284952]/8 rounded-full blur-[120px]"
          animate={{
            x: [0, 80, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#F5A83C]/6 rounded-full blur-[120px]"
          animate={{
            x: [0, -80, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 3 }}
        />
      </div>

      <motion.div className="relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-32 h-32 bg-gradient-to-br from-[#60BA81] to-[#284952] rounded-[2.5rem] mx-auto mb-10 flex items-center justify-center shadow-2xl shadow-[#60BA81]/40 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#60BA81] to-[#284952] rounded-[2.5rem] blur-xl opacity-60" />
          <BarChart3 className="w-16 h-16 text-white relative z-10" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: appleEase }}
          className="text-5xl font-bold text-[#17161A] mb-6"
        >
          <span className="bg-gradient-to-r from-[#284952] via-[#60BA81] to-[#F5A83C] bg-clip-text text-transparent">
            Data into Action
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: appleEase }}
          className="text-xl text-[#767676] mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Together, these dashboards turn grievance data into actionable insights and help build a transparent,
          responsible, and compliant workplace.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center gap-6 mb-12"
        >
          {[
            { icon: Shield, label: "Transparent", color: "#60BA81" },
            { icon: Users, label: "Responsible", color: "#284952" },
            { icon: CheckCircle, label: "Compliant", color: "#F5A83C" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ y: 40, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{
                delay: 1.1 + i * 0.2,
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-sm border"
              style={{
                backgroundColor: `${item.color}08`,
                borderColor: `${item.color}30`,
              }}
            >
              <item.icon className="w-5 h-5" style={{ color: item.color }} />
              <span className="text-[#17161A] font-medium">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="flex justify-center gap-3"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 2 + i * 0.15,
                type: "spring",
                stiffness: 500,
                damping: 15,
              }}
              className="w-4 h-4 bg-[#60BA81] rounded-full flex items-center justify-center shadow-lg shadow-[#60BA81]/30"
            >
              <CheckCircle className="w-3 h-3 text-white" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          className="mt-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#284952]/5 rounded-full border border-[#284952]/10">
            <div className="w-6 h-6 bg-gradient-to-br from-[#60BA81] to-[#284952] rounded-lg flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">FOS</span>
            </div>
            <span className="text-[#767676] text-sm">Fruit of Sustainability</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
