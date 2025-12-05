"use client"

import { motion } from "framer-motion"
import { FolderOpen, ImageIcon, FileText, Mic, FileCheck } from "lucide-react"

interface SceneEvidenceProps {
  isActive: boolean
}

export function SceneEvidence({ isActive }: SceneEvidenceProps) {
  const files = [
    { id: 1, icon: ImageIcon, color: "#F5A83C", x: -200, y: -150, delay: 0.5 },
    { id: 2, icon: FileText, color: "#60BA81", x: 200, y: -100, delay: 1.5 },
    { id: 3, icon: Mic, color: "#284952", x: -180, y: 120, delay: 2.5 },
    { id: 4, icon: FileCheck, color: "#FFFFFF", x: 180, y: 150, delay: 3.5 },
  ]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Central Folder */}
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 1 }}
          className="relative w-48 h-48"
        >
          {/* Back Plate */}
          <div className="absolute inset-0 bg-[#284952] rounded-xl transform skew-x-[-10deg] origin-bottom-left shadow-2xl" />

          {/* Front Plate */}
          <motion.div
            className="absolute inset-0 bg-[#284952]/80 backdrop-blur-sm rounded-xl border border-white/10 flex items-center justify-center z-20"
            animate={{ rotateX: [0, -10, 0] }} // Flap animation
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <FolderOpen size={64} className="text-white" />
          </motion.div>

          {/* Glow */}
          <div className="absolute inset-0 bg-[#60BA81]/20 blur-3xl -z-10" />
        </motion.div>
      </div>

      {/* Flying Files */}
      {files.map((file) => (
        <motion.div
          key={file.id}
          className="absolute z-30"
          initial={{
            x: file.x,
            y: file.y,
            scale: 1.5,
            opacity: 0,
            rotate: Math.random() * 45 - 22.5,
          }}
          animate={{
            x: 0,
            y: 0,
            scale: 0,
            opacity: 1,
            rotate: 0,
          }}
          transition={{
            delay: file.delay,
            duration: 0.8,
            type: "spring",
            stiffness: 60,
            damping: 15,
          }}
          onAnimationComplete={() => {
            // Optional: Could trigger a "file added" pulse on the folder
          }}
        >
          <div className="w-16 h-20 bg-white rounded-lg flex items-center justify-center shadow-xl border border-gray-200">
            <file.icon size={32} color={file.color} />
          </div>
        </motion.div>
      ))}

      {/* Success Check at end */}
      <motion.div
        className="absolute bottom-20 flex items-center gap-2 px-6 py-3 bg-[#60BA81] rounded-full shadow-lg"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 5, type: "spring" }}
      >
        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
          <FileCheck size={12} className="text-[#60BA81]" />
        </div>
        <span className="text-white font-bold text-sm">Evidence Securely Stored</span>
      </motion.div>
    </div>
  )
}
