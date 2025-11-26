// scene-closing.tsx - Updated
"use client"

import { motion } from "framer-motion"
import { Shield, Users, Bell, Target, Award, CheckCircle } from "lucide-react"

export const SceneClosing = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F5F5F7] via-white to-[#E6F4EA] relative overflow-hidden p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-15">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -top-16 -left-16 w-48 h-48 bg-gradient-to-br from-[#60BA81] to-[#4a9668] rounded-full blur-2xl"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -bottom-16 -right-16 w-48 h-48 bg-gradient-to-br from-[#284952] to-[#1a3038] rounded-full blur-2xl"
        />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="relative z-10 text-center max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div className="inline-block bg-white p-4 rounded-2xl shadow-lg border border-gray-200">
            <div className="w-16 h-16 bg-gradient-to-br from-[#60BA81] to-[#F5A83C] rounded-lg flex items-center justify-center shadow-md mb-2">
              <span className="text-white text-2xl font-bold">FOS</span>
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-2xl sm:text-3xl font-bold text-[#284952] mb-3"
        >
          Fruit of Sustainability
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="w-32 h-1 bg-gradient-to-r from-[#60BA81] to-[#F5A83C] rounded-full mx-auto mb-3"
        />

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-lg text-[#60BA81] font-semibold mb-6"
        >
          Your Partner in Grievance Management
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {[
            { value: "24/7", label: "Support" },
            { value: "100%", label: "Confidential" },
            { value: "Full", label: "Transparency" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.8 + i * 0.2, type: "spring" }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="bg-white p-3 rounded-xl shadow-md border border-gray-100"
            >
              <div className="text-lg font-bold text-[#284952] mb-1">{stat.value}</div>
              <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.2, type: "spring" }}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-[#284952] to-[#60BA81] text-white px-6 py-3 rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-all"
          >
            Get Started Today →
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-6 text-gray-500 text-xs"
        >
          © 2025 Fruit of Sustainability. All rights reserved.
        </motion.p>
      </motion.div>

      {/* Floating Icons */}
      {[Shield, Users, Bell, Target, Award, CheckCircle].map((Icon, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.2, 0],
            scale: [0, 1, 0],
            x: [0, i % 2 === 0 ? 50 : -50],
            y: [0, -50 - i * 15],
          }}
          transition={{
            duration: 3,
            delay: 2.5 + i * 0.3,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 2,
          }}
          className="absolute"
          style={{
            left: `${20 + i * 10}%`,
            top: "50%",
          }}
        >
          <Icon className="w-6 h-6 text-[#60BA81]" />
        </motion.div>
      ))}
    </div>
  )
}