"use client"

import { motion } from "framer-motion"
import { RefreshCw, ClipboardX, Stamp, AlertCircle } from "lucide-react"

interface SceneReworkProps {
  isActive: boolean
}

export function SceneRework({ isActive }: SceneReworkProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-16 text-2xl font-bold text-white tracking-tight z-20"
      >
        Satisfaction Guarantee
      </motion.h2>

      <div className="relative w-[600px] h-[400px] flex items-center justify-center">
        {/* Case Card */}
        <motion.div
          className="relative w-64 h-80 bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center border-t-4 border-[#284952]"
          initial={{ y: 0, rotate: 0 }}
          animate={{
            x: [0, 0, -150, 0], // Move left to "rework"
            y: [0, 0, 50, 0],
            scale: [1, 1, 0.9, 1],
          }}
          transition={{
            duration: 6,
            delay: 2,
            times: [0, 0.1, 0.5, 1],
            ease: "easeInOut",
          }}
        >
          <div className="w-full flex justify-between items-center mb-6">
            <div className="h-3 w-20 bg-gray-200 rounded-full" />
            <div className="w-8 h-8 rounded-full bg-[#284952]/10 flex items-center justify-center">
              <ClipboardX size={16} className="text-[#284952]" />
            </div>
          </div>
          <div className="space-y-3 w-full">
            <div className="h-2 w-full bg-gray-100 rounded-full" />
            <div className="h-2 w-3/4 bg-gray-100 rounded-full" />
            <div className="h-2 w-5/6 bg-gray-100 rounded-full" />
          </div>

          <div className="mt-auto w-full p-3 bg-red-50 rounded-lg border border-red-100 flex items-center gap-2">
            <AlertCircle size={16} className="text-red-500" />
            <span className="text-xs font-medium text-red-600">Not Satisfied</span>
          </div>

          {/* REJECT STAMP */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-red-600 rounded-lg px-4 py-2 rotate-[-15deg]"
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="flex items-center gap-2 text-red-600 font-black text-2xl uppercase tracking-widest">
              <Stamp size={24} />
              Rework
            </div>
          </motion.div>
        </motion.div>

        {/* Return Arrow Path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <motion.path
            d="M 300,200 C 150,200 100,300 100,350" // Curved path backwards
            fill="none"
            stroke="#F5A83C"
            strokeWidth="4"
            strokeDasharray="10 10"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ delay: 3, duration: 1 }}
          />
          <motion.path
            d="M 300,200 C 150,200 100,300 100,350"
            fill="none"
            stroke="#F5A83C"
            strokeWidth="4"
            strokeDasharray="10 10"
            strokeDashoffset="0"
            animate={{ strokeDashoffset: -100 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="opacity-50"
          />
        </svg>

        {/* Loop Icon representing process */}
        <motion.div
          className="absolute left-10 bottom-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
        >
          <div className="w-16 h-16 rounded-full bg-[#F5A83C]/20 flex items-center justify-center animate-spin-slow">
            <RefreshCw size={32} className="text-[#F5A83C]" />
          </div>
          <span className="text-sm font-bold text-[#F5A83C]">Improvement Cycle</span>
        </motion.div>
      </div>
    </div>
  )
}
