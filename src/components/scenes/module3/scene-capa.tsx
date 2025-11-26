"use client"

import { motion } from "framer-motion"
import { ShieldCheck, FireExtinguisher, User, Check } from "lucide-react"

interface SceneCAPAProps {
  isActive: boolean
}

export function SceneCAPA({ isActive }: SceneCAPAProps) {
  const correctiveItems = [
    { id: 1, text: "Isolate Hazard Area", assigned: true, delay: 1 },
    { id: 2, text: "Replace Faulty Wiring", assigned: true, delay: 2.5 },
    { id: 3, text: "Review Safety Logs", assigned: false, delay: 4 },
  ]

  const preventiveItems = [
    { id: 4, text: "Update Maintenance Schedule", assigned: true, delay: 8 },
    { id: 5, text: "Conduct Staff Training", assigned: true, delay: 9.5 },
    { id: 6, text: "Install Monitoring Sensors", assigned: false, delay: 11 },
  ]

  const ListItem = ({ item, isPreventive }: { item: any; isPreventive: boolean }) => (
    <motion.div
      initial={{ opacity: 0, x: isPreventive ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: item.delay, duration: 0.5 }}
      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 mb-3"
    >
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ scale: 0, backgroundColor: "transparent" }}
          animate={{ scale: 1, backgroundColor: "#60BA81" }}
          transition={{ delay: item.delay + 0.5 }}
          className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center"
        >
          <Check size={12} className="text-white" />
        </motion.div>
        <span className="text-sm text-white/90 font-medium">{item.text}</span>
      </div>

      {item.assigned && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: item.delay + 1, type: "spring" }}
          className="w-8 h-8 rounded-full bg-[#284952] border border-white/20 flex items-center justify-center"
        >
          <User size={14} className="text-white" />
        </motion.div>
      )}
    </motion.div>
  )

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-12">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-white mb-8 tracking-tight"
      >
        CAPA Plan
      </motion.h2>

      <div className="w-full grid grid-cols-2 gap-8 max-w-5xl">
        {/* Corrective Actions Column */}
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-[#F5A83C]/20">
              <FireExtinguisher size={24} className="text-[#F5A83C]" />
            </div>
            <h3 className="text-lg font-semibold text-white">Corrective Actions</h3>
          </div>

          <div className="space-y-2">
            {correctiveItems.map((item) => (
              <ListItem key={item.id} item={item} isPreventive={false} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60%] w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

        {/* Preventive Actions Column */}
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-[#60BA81]/20">
              <ShieldCheck size={24} className="text-[#60BA81]" />
            </div>
            <h3 className="text-lg font-semibold text-white">Preventive Measures</h3>
          </div>

          <div className="space-y-2">
            {preventiveItems.map((item) => (
              <ListItem key={item.id} item={item} isPreventive={true} />
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Visualization at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 13 }}
        className="absolute bottom-12 w-full max-w-2xl h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between px-6 backdrop-blur-md"
      >
        <span className="text-xs text-white/50 uppercase tracking-wider">Timeline Assignment</span>
        <div className="flex items-center gap-2">
          <div className="h-2 w-24 bg-[#284952] rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-[#60BA81]" />
          </div>
          <span className="text-xs text-[#60BA81] font-bold">On Track</span>
        </div>
      </motion.div>
    </div>
  )
}
