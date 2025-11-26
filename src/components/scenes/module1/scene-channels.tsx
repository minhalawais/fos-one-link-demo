// scene-channels.tsx - Updated
"use client"

import { motion } from "framer-motion"
import { Phone, MessageSquare, Globe, Mail, Smartphone, Clock } from "lucide-react"

export const SceneChannels = ({ isActive }: { isActive: boolean }) => {
  const channels = [
    { icon: Phone, title: "Toll Free Call", detail: "0800 91299", color: "#F5A83C" },
    { icon: MessageSquare, title: "SMS", detail: "+923299129999", color: "#60BA81" },
    { icon: Globe, title: "Whatsapp", detail: "+923299129999", color: "#25D366" },
    { icon: Mail, title: "Email", detail: "Click Here", color: "#284952" },
    { icon: Smartphone, title: "Online Form", detail: "Click Here", color: "#60BA81" },
    { icon: Smartphone, title: "Mobile App", detail: "Click Here", color: "#F5A83C" },
  ]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#7fa8b3] via-[#5a8a99] to-[#284952] relative overflow-hidden p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-20 h-20 border border-white rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 4,
              delay: i * 0.3,
              repeat: Number.POSITIVE_INFINITY,
            }}
            style={{
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6 relative z-10"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">Our 24/7 Complaint Registration Channels</h2>
        <p className="text-sm sm:text-base text-white/80">Multiple ways to reach us, anytime</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl relative z-10">
        {channels.map((channel, i) => (
          <motion.div
            key={i}
            initial={{ y: 50, opacity: 0, rotateX: -90 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{
              delay: i * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{
              scale: 1.05,
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.25)",
            }}
            className="bg-white rounded-xl p-3 sm:p-4 flex flex-col items-center shadow-lg border border-gray-100 cursor-pointer group"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Icon Circle */}
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br shadow-lg mb-3 flex items-center justify-center group-hover:shadow-xl transition-all"
              style={{
                background: `linear-gradient(135deg, ${channel.color} 0%, ${channel.color}dd 100%)`,
              }}
            >
              <channel.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </motion.div>

            {/* Title */}
            <h3 className="text-sm sm:text-base font-bold text-[#284952] mb-1 text-center">{channel.title}</h3>

            {/* Detail */}
            <p className="text-xs sm:text-sm text-gray-600 font-medium mb-2 text-center">{channel.detail}</p>

            {/* Arrow */}
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="text-[#60BA81]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* 24/7 Badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        className="mt-6 relative z-10"
      >
        <div className="bg-white/90 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 shadow-lg border border-white/50">
          <Clock className="w-5 h-5 text-[#F5A83C]" />
          <span className="text-sm font-bold text-[#284952]">Available 24/7 - 365 Days</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-2 h-2 bg-green-500 rounded-full shadow-md shadow-green-500/50"
          />
        </div>
      </motion.div>
    </div>
  )
}