"use client"

import { motion, LayoutGroup } from "framer-motion"
import { Phone, MessageCircle, Mail, Globe, Smartphone, Users, Check } from "lucide-react"
import { useState, useEffect } from "react"

// --- TIMING CONSTANTS ---
const TIMING = {
  START: 5,
  HOTLINE: 9.0,     // "toll free hotline"
  SMS: 10.5,        // "SMS, WhatsApp"
  EMAIL: 12.0,      // "email"
  WEB: 13.5,        // "online complaint form"
  APP: 16.0,        // "mobile application"
  MERGE: 21.0       // "simple and safe way"
}

// Brand Colors
const COLORS = {
  DeepTeal: "#284952",
  FreshGreen: "#60BA81",
  WarmOrange: "#F5A83C",
}

const channels = [
  {
    id: "phone",
    icon: Phone,
    label: "Toll Free",
    sub: "0800 91299",
    color: COLORS.WarmOrange,
    trigger: TIMING.HOTLINE
  },
  {
    id: "sms",
    icon: MessageCircle,
    label: "SMS / Chat",
    sub: "0329-9129999",
    color: COLORS.FreshGreen,
    trigger: TIMING.SMS
  },
  {
    id: "email",
    icon: Mail,
    label: "Email",
    sub: "hotline@fos.com",
    color: COLORS.DeepTeal,
    trigger: TIMING.EMAIL
  },
  {
    id: "web",
    icon: Globe,
    label: "Web Form",
    sub: "fos.com/login",
    color: COLORS.DeepTeal,
    trigger: TIMING.WEB
  },
  {
    id: "app",
    icon: Smartphone,
    label: "Mobile App",
    sub: "Download",
    color: COLORS.FreshGreen,
    trigger: TIMING.APP
  },
]

export const SceneOmnichannel = ({ isActive, progress }: { isActive: boolean, progress: number }) => {
  // Sync state with prop-based timing
  const visibleCount = channels.filter(c => progress >= c.trigger).length
  const isMerged = progress >= TIMING.MERGE

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F5F5F7] overflow-hidden p-4 font-sans">

      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F5F7] to-[#E5E5EA] opacity-90 z-10" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#60BA81]/10 rounded-full blur-[80px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-[#284952]/10 rounded-full blur-[60px]"
        />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center max-w-5xl">

        {/* Header Section */}
        <motion.div
          className="text-center mb-6 md:mb-10 flex-shrink-0"
          animate={{ y: isMerged ? -10 : 0, scale: isMerged ? 0.9 : 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#284952] mb-2 tracking-tight"
          >
            {isMerged ? "Universal Access" : "Reporting Channels"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#767676] text-sm md:text-lg font-medium"
          >
            {isMerged ? "Connecting every worker, everywhere." : "Select a method to connect."}
          </motion.p>
        </motion.div>

        {/* Channels Grid / Slider */}
        <div className="flex-1 w-full flex items-center justify-center min-h-0">
          <LayoutGroup>
            <motion.div
              layout
              className={`
                flex flex-wrap items-center justify-center 
                ${isMerged ? 'gap-3 md:gap-4 content-center' : 'gap-3 md:gap-6'}
              `}
            >
              {channels.map((channel, i) => {
                if (i >= visibleCount) return null;

                return (
                  <motion.div
                    key={channel.id}
                    layoutId={channel.id}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 250,
                      damping: 25
                    }}
                    className={`
                      relative bg-white rounded-2xl md:rounded-3xl shadow-lg border border-white/60 backdrop-blur-sm
                      flex flex-col items-center justify-center text-center cursor-pointer group hover:shadow-xl transition-shadow
                      ${isMerged
                        ? 'w-20 h-24 md:w-28 md:h-32 p-2'
                        : 'w-24 h-32 md:w-36 md:h-48 lg:w-44 lg:h-56 p-3 md:p-6'
                      }
                    `}
                  >
                    {/* Icon Bubble */}
                    <motion.div
                      layout
                      className={`
                        rounded-xl md:rounded-2xl flex items-center justify-center mb-2 md:mb-4
                        ${isMerged
                          ? 'w-8 h-8 md:w-12 md:h-12'
                          : 'w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20'
                        }
                      `}
                      style={{ backgroundColor: `${channel.color}15` }}
                    >
                      <channel.icon
                        className={`
                          ${isMerged
                            ? 'w-4 h-4 md:w-6 md:h-6'
                            : 'w-5 h-5 md:w-8 md:h-8 lg:w-10 lg:h-10'
                          }
                        `}
                        color={channel.color}
                        strokeWidth={2.5}
                      />
                    </motion.div>

                    {/* Label */}
                    <motion.h3
                      layout
                      className={`
                        font-bold text-[#1d1d1f] leading-tight
                        ${isMerged
                          ? 'text-[10px] md:text-xs'
                          : 'text-xs md:text-sm lg:text-lg'
                        }
                      `}
                    >
                      {channel.label}
                    </motion.h3>

                    {/* Subtext (Hidden when merged to save space) */}
                    {!isMerged && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-2 hidden md:block"
                      >
                        <span className="bg-[#F5F5F7] text-[#767676] text-[10px] md:text-xs px-2 py-1 rounded-full font-medium">
                          {channel.sub}
                        </span>
                      </motion.div>
                    )}

                    {/* Checkmark overlay when merged */}
                    {isMerged && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-[#60BA81] text-white rounded-full p-0.5 md:p-1 shadow-sm"
                      >
                        <Check size={10} className="md:w-3 md:h-3" strokeWidth={4} />
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </motion.div>
          </LayoutGroup>
        </div>

        {/* Footer / Safety Net Graphic - Resized to fit */}
        <motion.div
          className="h-20 flex-shrink-0 flex items-end justify-center pb-4"
        >
          {isMerged && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex items-center gap-3 bg-[#284952] text-white px-6 py-3 rounded-full shadow-2xl scale-90 md:scale-100"
            >
              <div className="bg-[#60BA81] rounded-full p-1.5">
                <Users size={20} className="text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-base">100% Coverage</span>
                <span className="text-xs text-white/70">Safe & Anonymous</span>
              </div>
            </motion.div>
          )}
        </motion.div>

      </div>
    </div>
  )
}