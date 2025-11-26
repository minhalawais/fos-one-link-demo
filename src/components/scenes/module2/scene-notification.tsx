"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Bell, MousePointer2, LogOut } from "lucide-react"
import { useState, useEffect } from "react"

// Exact Colors from your file
const COLORS = {
  deepTeal: "#284952",
  freshGreen: "#60BA81",
  charcoal: "#17161A",
  white: "#FFFFFF",
  lightGray: "#F5F5F7",
  border: "#DEE2E6",
  warmOrange: "#F5A83C",
  inProcess: "#2d9480",
  submitted: "#60ba81",
  bounced: "#f5a83c",
}

// Apple-style Physics
const spring = { type: "spring", stiffness: 250, damping: 25 }
const slowScroll = { duration: 7, ease: "linear" } // Changed to 7 seconds as requested

// Restored Donut Chart (Exact UI)
const DonutChart = ({ total = 116 }: { total?: number }) => (
  <div className="relative w-[140px] h-[140px]">
    <svg width="140" height="140" viewBox="0 0 140 140">
      <circle cx="70" cy="70" r="50" fill="none" stroke={COLORS.border} strokeWidth="20" />
      <motion.circle
        cx="70"
        cy="70"
        r="50"
        fill="none"
        stroke={COLORS.deepTeal}
        strokeWidth="20"
        strokeDasharray="220 314"
        initial={{ strokeDashoffset: 314 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        transform="rotate(-90 70 70)"
      />
      <motion.circle
        cx="70"
        cy="70"
        r="50"
        fill="none"
        stroke={COLORS.inProcess}
        strokeWidth="20"
        strokeDasharray="50 314"
        initial={{ strokeDashoffset: 314 }}
        animate={{ strokeDashoffset: -220 }}
        transition={{ duration: 1, delay: 0.3 }}
        transform="rotate(-90 70 70)"
      />
      <motion.circle
        cx="70"
        cy="70"
        r="50"
        fill="none"
        stroke={COLORS.freshGreen}
        strokeWidth="20"
        strokeDasharray="30 314"
        initial={{ strokeDashoffset: 314 }}
        animate={{ strokeDashoffset: -270 }}
        transition={{ duration: 1, delay: 0.4 }}
        transform="rotate(-90 70 70)"
      />
      <motion.circle
        cx="70"
        cy="70"
        r="50"
        fill="none"
        stroke={COLORS.warmOrange}
        strokeWidth="20"
        strokeDasharray="14 314"
        initial={{ strokeDashoffset: 314 }}
        animate={{ strokeDashoffset: -300 }}
        transition={{ duration: 1, delay: 0.5 }}
        transform="rotate(-90 70 70)"
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="text-xs text-gray-500">Total</span>
      <span className="text-xl font-bold text-[#284952]">({total})</span>
    </div>
  </div>
)

// Restored Bar Chart (Exact UI)
const BarChart = () => {
  const categories = [
    { name: "Workplace\nHealth", unprocessed: 8, inProcess: 2, submitted: 0, bounced: 0 },
    { name: "Freedom of\nAssociation", unprocessed: 7, inProcess: 2, submitted: 1, bounced: 0 },
    { name: "Child\nLabor", unprocessed: 6, inProcess: 2, submitted: 0, bounced: 0 },
    { name: "Wages &\nBenefits", unprocessed: 18, inProcess: 4, submitted: 2, bounced: 0 },
    { name: "Working\nHours", unprocessed: 5, inProcess: 1, submitted: 0, bounced: 0 },
    { name: "Forced\nLabor", unprocessed: 4, inProcess: 1, submitted: 0, bounced: 1 },
    { name: "Discrimination", unprocessed: 8, inProcess: 2, submitted: 1, bounced: 0 },
    { name: "Unfair\nLabor", unprocessed: 30, inProcess: 4, submitted: 1, bounced: 0 },
    { name: "Ethical\nBusiness", unprocessed: 3, inProcess: 1, submitted: 0, bounced: 0 },
    { name: "Environment", unprocessed: 2, inProcess: 1, submitted: 0, bounced: 0 },
    { name: "Harassment", unprocessed: 2, inProcess: 1, submitted: 0, bounced: 0 },
    { name: "Discipline", unprocessed: 4, inProcess: 0, submitted: 0, bounced: 0 },
    { name: "Feedback", unprocessed: 3, inProcess: 0, submitted: 0, bounced: 0 },
  ]
  const maxValue = 35
  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-xs font-semibold text-[#284952] mb-2 text-center">Complaints By Categories</div>
      <div className="flex items-end justify-between gap-1 flex-1 px-2">
        {categories.map((cat, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div className="w-full flex flex-col-reverse" style={{ height: "80px" }}>
              <motion.div initial={{ height: 0 }} animate={{ height: `${(cat.unprocessed / maxValue) * 80}px` }} transition={{ delay: i * 0.05 }} className="w-full bg-[#284952] rounded-t-sm" />
              <motion.div initial={{ height: 0 }} animate={{ height: `${(cat.inProcess / maxValue) * 80}px` }} transition={{ delay: i * 0.05 + 0.1 }} className="w-full bg-[#2d9480]" />
              <motion.div initial={{ height: 0 }} animate={{ height: `${(cat.submitted / maxValue) * 80}px` }} transition={{ delay: i * 0.05 + 0.15 }} className="w-full bg-[#60ba81]" />
              <motion.div initial={{ height: 0 }} animate={{ height: `${(cat.bounced / maxValue) * 80}px` }} transition={{ delay: i * 0.05 + 0.2 }} className="w-full bg-[#f5a83c]" />
            </div>
            <span className="text-[6px] text-gray-500 mt-1 text-center leading-tight whitespace-pre-line">{cat.name}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-3 justify-end mt-2 text-[8px]">
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#284952]" /><span>Unprocessed</span></div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#2d9480]" /><span>In Process</span></div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#60ba81]" /><span>Submitted</span></div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#f5a83c]" /><span>Bounced</span></div>
      </div>
    </div>
  )
}

export const SceneNotification = ({ isActive }: { isActive: boolean }) => {
  const [stage, setStage] = useState(0)
  const [emailScrolling, setEmailScrolling] = useState(false)

  useEffect(() => {
    if (isActive) {
      setStage(0)
      setEmailScrolling(false)
      
      const timers = [
        setTimeout(() => setStage(1), 500),   // Mobile Appears
        setTimeout(() => {
          setStage(2)  // Focus Email
          setEmailScrolling(true) // START SCROLLING IMMEDIATELY
        }, 5200),  
        setTimeout(() => setStage(3), 7520),  // Focus Portal
        setTimeout(() => setStage(4), 8500),  // New Row Entry
        setTimeout(() => setStage(5), 11880), // Cursor Move
      ]
      return () => timers.forEach(clearTimeout)
    }
  }, [isActive])

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#F5F5F7] p-2 md:p-6 relative overflow-hidden font-sans">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#60BA81]/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl h-full flex flex-col justify-center">
        <AnimatePresence mode="wait">
          
          {/* PHASE 1: Mobile & Email */}
          {stage < 3 && (
            <motion.div
              key="notifications"
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 h-full"
            >
              
              {/* MOBILE PHONE - Enhanced Realism */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={spring}
                className="relative z-20"
              >
                {/* Phone Frame - Improved CSS for realism */}
                <div className="bg-[#1d1d1f] border-[6px] border-[#2b2b2c] w-[200px] h-[400px] rounded-[40px] shadow-2xl relative overflow-hidden ring-1 ring-white/20">
                  {/* Screen Content */}
                  <div className="bg-gradient-to-b from-[#1a2f35] to-[#0f1d21] w-full h-full rounded-[32px] overflow-hidden relative">
                    
                    {/* Dynamic Island */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-20 flex items-center justify-center">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#121212] ring-1 ring-gray-800/50" />
                    </div>

                    {/* Wallpaper */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop')] bg-cover opacity-40 mix-blend-overlay" />
                    
                    {/* Time */}
                    <div className="absolute top-20 w-full text-center z-10">
                      <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-thin text-white tracking-tight drop-shadow-md"
                      >
                        15:09
                      </motion.h1>
                      <p className="text-[10px] text-white/70 mt-1 font-medium">Saturday, November 22</p>
                    </div>

                    {/* REALISTIC NOTIFICATION POP */}
                    <AnimatePresence>
                      {stage >= 1 && (
                        <motion.div
                          initial={{ y: 50, opacity: 0, scale: 0.9 }}
                          animate={{ y: 0, opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
                          className="absolute top-[160px] left-3 right-3 z-30"
                        >
                          <div className="bg-white/80 backdrop-blur-xl p-3 rounded-2xl shadow-lg border border-white/40">
                            <div className="flex items-start gap-2.5">
                              <div className="w-8 h-8 bg-[#284952] rounded-lg flex items-center justify-center shadow-sm shrink-0">
                                <Bell size={14} className="text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-0.5">
                                  <span className="text-[10px] font-bold text-[#1d1d1f]">FOS Officer</span>
                                  <span className="text-[8px] text-gray-500">now</span>
                                </div>
                                <p className="text-[11px] font-semibold text-[#1d1d1f] leading-tight">Investigation Required</p>
                                <p className="text-[9px] text-gray-600 leading-snug mt-0.5">New case assigned: #FL251141-475002 - Forced Labor complaint at PWD Branch</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Bottom Bar */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full" />
                  </div>
                </div>
              </motion.div>

              {/* EMAIL - Exact UI with IMMEDIATE Scroll Animation */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ ...spring, delay: 0.2 }}
                className={`transition-all duration-700 ${stage === 2 ? "scale-105 shadow-2xl" : "shadow-xl"}`}
              >
                <div className="bg-white w-[300px] md:w-[380px] rounded-2xl overflow-hidden border border-gray-200">
                  
                  {/* Chrome Header */}
                  <div className="bg-[#f5f5f7] px-4 py-2.5 flex items-center gap-3 border-b border-gray-200">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                      <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="bg-white rounded-md px-4 py-1 text-[10px] text-gray-500 font-mono border border-gray-200 shadow-sm">
                        mail.google.com
                      </div>
                    </div>
                  </div>

                  {/* SCROLLING EMAIL CONTENT CONTAINER */}
                  <div className="h-[320px] overflow-hidden relative bg-white">
                    <motion.div
                      // IMMEDIATE Auto-scroll animation - starts as soon as email is focused
                      animate={emailScrolling ? { y: [0, -80] } : { y: 0 }}
                      transition={emailScrolling ? slowScroll : {}}
                    >
                      {/* Header */}
                      <div className="bg-[#284952] px-6 py-5 text-center">
                        <div className="inline-block bg-white rounded-md px-3 py-1.5 mb-3">
                          <span className="text-xs font-bold text-[#284952]">FRUIT OF SUSTAINABILITY</span>
                        </div>
                        <h2 className="text-white font-bold text-base">New Complaint Investigation Request</h2>
                      </div>

                      {/* Body */}
                      <div className="p-5 space-y-4 bg-white min-h-[400px]">
                        <p className="text-[11px] text-gray-700">Dear Investigation Officer,</p>
                        <p className="text-[11px] text-gray-600 leading-relaxed">
                          A new complaint has been registered in the FOS Grievance Management System and requires your
                          immediate attention.
                        </p>

                        <div className="bg-[#f9f9f9] border-l-4 border-[#60BA81] p-4 rounded-r-lg">
                          <h4 className="text-[11px] font-bold text-[#284952] mb-3">Complaint Information</h4>
                          <div className="space-y-2 text-[10px]">
                            <div className="flex"><span className="text-gray-500 w-28">Ticket Number:</span><span className="font-bold text-[#284952]">FL251141-475002</span></div>
                            <div className="flex"><span className="text-gray-500 w-28">Category:</span><span className="text-gray-800">Forced Labor</span></div>
                            <div className="flex"><span className="text-gray-500 w-28">Received On:</span><span className="text-gray-800">Tue, 25 Nov 2025 12:36 PM</span></div>
                            <div className="flex"><span className="text-gray-500 w-28">Status:</span><span className="font-bold text-gray-800">Pending Investigation</span></div>
                          </div>
                        </div>

                        <div className="text-center pt-2">
                          <button className="bg-[#60BA81] text-white px-6 py-2.5 rounded-md text-[11px] font-bold shadow-md">
                            Submit RCA & CAPA
                          </button>
                        </div>

                        <div className="bg-[#fff4e6] border border-[#f5a83c] p-3 rounded text-[9px] text-gray-700">
                          <strong>Important:</strong> This link provides direct access to submit your RCA and CAPA findings.
                        </div>
                        
                        {/* Footer text added to ensure scroll length */}
                        <div className="pt-4 border-t border-gray-100 text-center">
                           <p className="text-[8px] text-gray-400">© 2025 FOS. Confidential System Notification.</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}

          {/* PHASE 2: PORTAL - Exact UI */}
          {stage >= 3 && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={spring}
              className="w-full h-full flex flex-col items-center justify-center p-2"
            >
              <div className="w-full max-w-5xl bg-[#eeeeee] rounded-2xl shadow-2xl overflow-hidden border border-gray-300 flex flex-col h-[520px] relative">
                
                {/* Header Bar */}
                <div className="bg-white px-6 py-3 flex justify-between items-center border-b border-gray-200 shadow-sm z-10">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-[#284952] rounded-full flex items-center justify-center">
                         <div className="w-5 h-5 border-2 border-[#60BA81] rounded-full" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#284952]">FRUIT OF</div>
                        <div className="text-xs font-semibold text-[#60BA81]">SUSTAINABILITY</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-[#284952] font-medium">MULTAN47</div>
                    <div className="text-lg font-bold text-[#284952]">Grievance Management Portal</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-9 h-9 bg-[#284952] rounded-lg flex items-center justify-center">
                        <Bell size={18} className="text-white" />
                      </div>
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[8px] text-white font-bold flex items-center justify-center"
                      >
                        1
                      </motion.div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>Logout</span>
                      <LogOut size={16} />
                    </div>
                  </div>
                </div>

                {/* Dashboard */}
                <div className="p-5 flex-1 overflow-hidden flex flex-col gap-4">
                  <div className="flex gap-4">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                        className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center min-w-[220px]"
                    >
                      <DonutChart total={stage >= 4 ? 117 : 116} />
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 text-[8px]">
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#284952]" /><span className="text-gray-600">Unprocessed</span></div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#2d9480]" /><span className="text-gray-600">In Process</span></div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#60ba81]" /><span className="text-gray-600">Submitted</span></div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#f5a83c]" /><span className="text-gray-600">Bounced</span></div>
                      </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                        className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex-1"
                    >
                      <BarChart />
                    </motion.div>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 overflow-hidden flex flex-col"
                  >
                    <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                      <div className="flex items-center gap-2 text-[10px] text-gray-600">
                        <span>Show entries</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="text-gray-600">Search:</span>
                        <input type="text" className="border border-gray-300 rounded px-2 py-1 text-[10px] w-32" />
                      </div>
                    </div>

                    <div className="flex-1 overflow-auto">
                      <table className="w-full text-[10px]">
                        <thead className="bg-gray-50 sticky top-0">
                          <tr className="border-b border-gray-200">
                            <th className="px-3 py-2 text-left font-semibold text-gray-700">Sr.</th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-700">Ticket Number</th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-700">NAME</th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-700">STATUS</th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-700">COMPLAINT DATE</th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-700">Mobile Number</th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-700">Complaint Categories</th>
                            <th className="px-3 py-2 text-left font-semibold text-gray-700">Additional Comments</th>
                          </tr>
                        </thead>
                        <tbody>
                          <AnimatePresence>
                            {stage >= 4 && (
                              <motion.tr
                                layout
                                initial={{ opacity: 0, backgroundColor: "#e8f5e9" }}
                                animate={{ opacity: 1, backgroundColor: "#ffffff" }}
                                transition={{ duration: 1 }}
                                className="border-b border-gray-100"
                              >
                                <td className="px-3 py-3 text-gray-700 font-medium">457</td>
                                <td className="px-3 py-3 font-semibold text-[#284952]">FL251141-475002</td>
                                <td className="px-3 py-3 text-gray-800">Sana</td>
                                <td className="px-3 py-3"><span className="px-3 py-1.5 rounded text-[9px] font-bold text-white bg-[#206e71]">Unprocessed</span></td>
                                <td className="px-3 py-3 text-[#284952]">Tue, 25 Nov 2025 12:36 PM</td>
                                <td className="px-3 py-3 text-gray-700">923164015542</td>
                                <td className="px-3 py-3 text-[#284952] font-medium">Forced Labor</td>
                                <td className="px-3 py-3 text-gray-500">-</td>
                              </motion.tr>
                            )}
                          </AnimatePresence>
                          <tr className="border-b border-gray-100 opacity-60">
                            <td className="px-3 py-3 text-gray-700">456</td>
                            <td className="px-3 py-3 font-semibold text-[#284952]">FL211140-475002</td>
                            <td className="px-3 py-3 text-gray-800">Sana</td>
                            <td className="px-3 py-3"><span className="px-3 py-1.5 rounded text-[9px] font-bold text-white bg-[#f5a83c]">Bounced</span></td>
                            <td className="px-3 py-3 text-[#284952]">Fri, 21 Nov 2025 11:44 AM</td>
                            <td className="px-3 py-3 text-gray-700">923164015542</td>
                            <td className="px-3 py-3 text-[#284952] font-medium">Forced Labor</td>
                            <td className="px-3 py-3 text-gray-500">N/A</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                </div>
                
                {/* Cursor Animation */}
                {stage >= 5 && (
                  <motion.div
                    initial={{ x: 800, y: 500, opacity: 0 }}
                    animate={{ x: 180, y: 340, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="absolute top-0 left-0 z-50 pointer-events-none"
                  >
                    <MousePointer2 size={28} fill="#1d1d1f" stroke="white" strokeWidth={1.5} />
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
export default SceneNotification