"use client"

import { motion } from "framer-motion"
import { FileText, Download, Share2, FileSpreadsheet, Eye } from "lucide-react"

interface SceneProps {
  isActive: boolean
  progress: number
  sceneProgress: number
}

const appleEase = [0.4, 0, 0.2, 1]

const surveyReports = [
  { title: "Exit Interview Report August", date: "Sep 5, 2025" },
  { title: "Exit Interview Report July 2025", date: "Aug 8, 2025" },
  { title: "Exit Interview Report June-25", date: "Jul 10, 2025" },
  { title: "Employee Well Being Survey (CHZ Call Centre)", date: "Jun 30, 2025" },
]

export function SceneExport({ isActive, progress, sceneProgress }: SceneProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-[#F5F5F7] via-white to-[#F5F5F7] overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-[#F5A83C]/6 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      <motion.div className="relative z-10 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: appleEase }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold text-[#17161A] mb-3">
            <span className="bg-gradient-to-r from-[#284952] via-[#60BA81] to-[#F5A83C] bg-clip-text text-transparent">
              Export & Compliance Reports
            </span>
          </h2>
          <p className="text-[#767676] text-lg">Ready for HRDD, ESG, and CSDD compliance</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: appleEase }}
            className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-[#284952]/10 overflow-hidden border border-[#DEE2E6]"
          >
            <div className="bg-[#284952] p-4 flex items-center gap-3">
              <FileText className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Survey Reports</span>
            </div>

            <div className="p-4 space-y-3">
              {surveyReports.map((report, i) => (
                <motion.div
                  key={report.title}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.6, ease: appleEase }}
                  className="p-4 bg-[#F5F5F7] rounded-xl hover:bg-[#EAEAEC] transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[#17161A] font-medium text-sm">{report.title}</p>
                      <p className="text-[#767676] text-xs mt-1">{report.date}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-[#60BA81] text-white text-xs font-medium rounded-lg flex items-center gap-1 shadow-lg shadow-[#60BA81]/20"
                    >
                      <Eye className="w-3 h-3" />
                      View
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                icon: FileText,
                title: "Due Diligence Reports",
                desc: "Comprehensive HRDD documentation",
                color: "#60BA81",
              },
              {
                icon: Share2,
                title: "Brand Updates",
                desc: "Share progress with partners",
                color: "#284952",
              },
              {
                icon: FileSpreadsheet,
                title: "Social Audits",
                desc: "Complete audit-ready exports",
                color: "#F5A83C",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.7, ease: appleEase }}
                className="bg-white/90 backdrop-blur-2xl rounded-2xl p-6 shadow-xl shadow-[#284952]/10 hover:shadow-2xl transition-all duration-500 cursor-pointer group border border-[#DEE2E6]"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{ backgroundColor: `${item.color}10` }}
                  >
                    <item.icon className="w-7 h-7" style={{ color: item.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#17161A] font-semibold">{item.title}</p>
                    <p className="text-[#767676] text-sm">{item.desc}</p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 bg-[#F5F5F7] rounded-full flex items-center justify-center group-hover:bg-[#60BA81] transition-all duration-300"
                  >
                    <Download className="w-5 h-5 text-[#767676] group-hover:text-white transition-colors duration-300" />
                  </motion.div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6, ease: appleEase }}
              className="flex gap-3 justify-center mt-6"
            >
              {["HRDD", "ESG", "CSDD"].map((badge, i) => (
                <motion.div
                  key={badge}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + i * 0.12, type: "spring", stiffness: 400, damping: 20 }}
                  className="px-4 py-2 bg-[#60BA81]/10 border border-[#60BA81]/30 rounded-full"
                >
                  <span className="text-[#60BA81] font-bold text-sm">{badge}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
