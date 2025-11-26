"use client"

import { motion } from "framer-motion"
import { GitMerge, Puzzle, Target, Microscope, FileSearch } from "lucide-react"

interface SceneRootCauseProps {
  isActive: boolean
}

export function SceneRootCause({ isActive }: SceneRootCauseProps) {
  const nodes = [
    { id: 1, label: "Evidence", icon: FileSearch, x: -150, y: -80, delay: 0.2 },
    { id: 2, label: "Context", icon: Microscope, x: 150, y: -80, delay: 0.4 },
    { id: 3, label: "Impact", icon: Target, x: 0, y: 120, delay: 0.6 },
  ]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-16 text-2xl font-bold text-white tracking-tight z-20"
      >
        Evidence Based
      </motion.h2>

      <div className="relative flex items-center justify-center w-[600px] h-[400px]">
        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          {nodes.map((node) => (
            <motion.path
              key={node.id}
              d={`M${300 + node.x},${200 + node.y} L300,200`}
              fill="none"
              stroke="#60BA81"
              strokeWidth="2"
              strokeDasharray="10 10"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 1.5, delay: node.delay }}
            />
          ))}
          {/* Animated pulse on lines */}
          {nodes.map((node) => (
            <motion.circle
              key={`dot-${node.id}`}
              r="3"
              fill="#60BA81"
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              style={{ offsetPath: `path("M${300 + node.x},${200 + node.y} L300,200")` }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: node.delay + 1 }}
            />
          ))}
        </svg>

        {/* Central Node (RCA) */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative z-10 w-32 h-32 rounded-full bg-[#284952] border-4 border-[#60BA81] flex flex-col items-center justify-center shadow-[0_0_50px_rgba(96,186,129,0.3)]"
        >
          <GitMerge size={36} className="text-white mb-1" />
          <span className="text-xl font-bold text-white">RCA</span>
        </motion.div>

        {/* Surrounding Nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute z-10 flex flex-col items-center gap-2"
            style={{ x: node.x, y: node.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: node.delay, type: "spring" }}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-xl group hover:bg-white/20 transition-colors">
              <node.icon size={24} className="text-[#F5A83C]" />
            </div>
            <span className="text-sm font-medium text-white/80 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
              {node.label}
            </span>
          </motion.div>
        ))}

        {/* Text Description Area */}
        <motion.div
          className="absolute bottom-0 w-full max-w-md p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[#60BA81]/20">
              <Puzzle size={16} className="text-[#60BA81]" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-2 w-3/4 bg-white/20 rounded-full animate-pulse" />
              <div className="h-2 w-1/2 bg-white/10 rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
