"use client"

import { motion } from "framer-motion"
import { ClipboardList, Users, MessageSquare, BarChart3, Sparkles } from "lucide-react"

// Color Scheme
const COLORS = {
  primary: "#89A8B2",      // Dusty Blue
  secondary: "#B3C8CF",    // Light Blue-Gray
  background: "#E5E1DA",   // Cream
  surface: "#F1F0E8",      // Off-White
  text: "#2D3748",         // Dark gray for contrast
  textMuted: "#5A6A7A",    // Muted text
}

interface SceneIntroProps {
  isActive: boolean
  progress: number
}

export const SceneIntro = ({ isActive, progress }: SceneIntroProps) => {
  // Calculate animation phases based on progress (0-9 seconds)
  const phase1 = Math.min(1, progress / 2) // 0-2s: Logo and title
  const phase2 = Math.min(1, Math.max(0, (progress - 2) / 3)) // 2-5s: Icons flow
  const phase3 = Math.min(1, Math.max(0, (progress - 5) / 4)) // 5-9s: Description

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: COLORS.background }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 rounded-full"
          style={{
            background: `radial-gradient(circle, ${COLORS.primary}30, transparent 70%)`,
            filter: 'blur(40px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-32 w-48 h-48 rounded-full"
          style={{
            background: `radial-gradient(circle, ${COLORS.secondary}40, transparent 70%)`,
            filter: 'blur(30px)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -20, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${COLORS.primary} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-8">
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: phase1,
            rotate: 0,
            opacity: phase1
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative"
        >
          <div
            className="w-28 h-28 rounded-3xl flex items-center justify-center shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
              boxShadow: `0 20px 60px -10px ${COLORS.primary}60`
            }}
          >
            <ClipboardList size={56} className="text-white" strokeWidth={1.5} />
          </div>

          {/* Sparkle accent */}
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 15, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={24} style={{ color: COLORS.primary }} />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: phase1, y: 30 - (phase1 * 30) }}
          className="space-y-2"
        >
          <h1
            className="text-5xl font-bold tracking-tight"
            style={{ color: COLORS.text }}
          >
            Digital Surveys
          </h1>
          <p
            className="text-xl font-medium"
            style={{ color: COLORS.primary }}
          >
            Proactive Employee Engagement
          </p>
        </motion.div>

        {/* Feature icons flow */}
        <motion.div
          className="flex items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase2 }}
        >
          {[
            { Icon: ClipboardList, label: "Create", delay: 0 },
            { Icon: Users, label: "Target", delay: 0.15 },
            { Icon: MessageSquare, label: "Invite", delay: 0.3 },
            { Icon: BarChart3, label: "Analyze", delay: 0.45 },
          ].map(({ Icon, label, delay }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{
                opacity: phase2,
                y: phase2 * -20 + 20,
                scale: 0.8 + (phase2 * 0.2)
              }}
              transition={{ delay: delay, type: "spring", stiffness: 300, damping: 25 }}
              className="flex flex-col items-center gap-2"
            >
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  backgroundColor: COLORS.surface,
                  border: `2px solid ${COLORS.secondary}`,
                  boxShadow: `0 8px 24px -4px ${COLORS.primary}20`
                }}
                whileHover={{ scale: 1.1, y: -4 }}
              >
                <Icon size={28} style={{ color: COLORS.primary }} strokeWidth={1.5} />
              </motion.div>
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: COLORS.textMuted }}
              >
                {label}
              </span>

              {/* Connector line */}
              {i < 3 && (
                <motion.div
                  className="absolute"
                  style={{
                    width: '24px',
                    height: '2px',
                    backgroundColor: COLORS.secondary,
                    left: `calc(50% + ${i * 88 + 44}px)`,
                    top: '50%'
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: phase2 }}
                  transition={{ delay: delay + 0.2 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Description text - synced with "Beyond complaints..." narration */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase3, y: 20 - (phase3 * 20) }}
          className="max-w-2xl text-lg leading-relaxed"
          style={{ color: COLORS.textMuted }}
        >
          Beyond complaints, actively listen to your employees through digital in-app surveys
        </motion.p>

        {/* Bottom accent bar */}
        <motion.div
          className="h-1 rounded-full"
          style={{ backgroundColor: COLORS.primary }}
          initial={{ width: 0 }}
          animate={{ width: phase3 * 200 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>
    </motion.div>
  )
}