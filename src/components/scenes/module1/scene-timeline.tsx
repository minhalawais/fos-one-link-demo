// scene-timeline.tsx - Updated
"use client"

import { motion } from "framer-motion"
import { FileText, Clock, Target, ClipboardCheck, CheckCircle, Award } from "lucide-react"

export const SceneTimeline = ({ isActive }: { isActive: boolean }) => {
  const stages = [
    {
      title: "Complaint Details",
      status: "COMPLETED",
      color: "#60BA81",
      icon: FileText,
      desc: "Initial submission received",
    },
    { title: "In Process", status: "ACTIVE", color: "#60BA81", icon: Clock, desc: "Investigation underway" },
    {
      title: "RCA - Root Cause Analysis",
      status: "COMPLETED",
      color: "#284952",
      icon: Target,
      desc: "Identified underlying issues and systemic problems",
    },
    {
      title: "CAPA - Corrective & Preventive Actions",
      status: "COMPLETED",
      color: "#60BA81",
      icon: ClipboardCheck,
      desc: "Action plan implemented to resolve and prevent recurrence",
    },
    { title: "Submitted", status: "COMPLETED", color: "#284952", icon: CheckCircle, desc: "Report finalized" },
    { title: "Completed", status: "COMPLETED", color: "#60BA81", icon: Award, desc: "Case resolved successfully" },
  ]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#284952] to-[#1a3038] p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            animate={{
              y: ["0%", "100%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
            style={{
              left: Math.random() * 100 + "%",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-6 relative z-10"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Complaint Journey Timeline</h2>
        <p className="text-sm text-white/70">From submission to resolution</p>
      </motion.div>

      <div className="relative w-full max-w-2xl">
        {/* Vertical Timeline Line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#60BA81] via-white to-[#60BA81] origin-top"
        />

        {/* Timeline Stages */}
        <div className="space-y-8 relative z-10">
          {stages.map((stage, i) => {
            const isLeft = i % 2 === 0
            const IconComponent = stage.icon

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2, type: "spring" }}
                className={`flex items-center gap-4 ${isLeft ? "flex-row" : "flex-row-reverse"} justify-start`}
              >
                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  className={`flex-1 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border ${
                    stage.status === "ACTIVE" ? "border-[#F5A83C]" : "border-white/20"
                  } ${isLeft ? "text-left ml-12" : "text-right mr-12"}`}
                >
                  <div className={`flex items-center gap-2 mb-2 ${isLeft ? "justify-start" : "justify-end"}`}>
                    {isLeft && (
                      <>
                        <div className="text-left">
                          <h3 className="text-sm font-bold text-gray-900">{stage.title}</h3>
                          <p className="text-xs text-gray-600">{stage.desc}</p>
                        </div>
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${stage.color} 0%, ${stage.color}dd 100%)` }}
                        >
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                      </>
                    )}
                    {!isLeft && (
                      <>
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${stage.color} 0%, ${stage.color}dd 100%)` }}
                        >
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-right">
                          <h3 className="text-sm font-bold text-gray-900">{stage.title}</h3>
                          <p className="text-xs text-gray-600">{stage.desc}</p>
                        </div>
                      </>
                    )}
                  </div>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: i * 0.2 + 0.3 }}
                    className={`h-1 bg-gradient-to-r ${
                      stage.status === "COMPLETED" ? "from-[#60BA81] to-[#4a9668]" : "from-[#F5A83C] to-[#e59730]"
                    } rounded-full ${isLeft ? "origin-left" : "origin-right"}`}
                  />

                  <div
                    className={`mt-1 text-xs font-semibold ${stage.status === "ACTIVE" ? "text-[#F5A83C]" : "text-[#60BA81]"}`}
                  >
                    {stage.status}
                  </div>
                </motion.div>

                {/* Center Node */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: i * 0.2 + 0.1, type: "spring" }}
                  className="relative flex-shrink-0"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 ${
                      stage.status === "ACTIVE" ? "border-[#F5A83C] bg-[#F5A83C]" : "border-white bg-white"
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: stage.color }}
                    >
                      <IconComponent className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  {stage.status === "ACTIVE" && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="absolute inset-0 rounded-full bg-[#F5A83C]"
                    />
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Completion Badge */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.5, type: "spring" }}
        className="mt-6 bg-white rounded-xl px-4 py-2 flex items-center gap-3 shadow-lg relative z-10"
      >
        <Award className="w-6 h-6 text-[#F5A83C]" />
        <div>
          <h4 className="text-sm font-bold text-[#284952]">Case Resolved Successfully</h4>
          <p className="text-xs text-gray-600">Average resolution time: 14 days</p>
        </div>
      </motion.div>
    </div>
  )
}