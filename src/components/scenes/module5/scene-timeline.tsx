import { useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Download, Share2, Info, CheckCircle, Clock, MapPin, Building, Briefcase, FileText, Search, Sparkles } from "lucide-react"

interface SceneProps {
  isActive: boolean
  progress: number
}

const IOS_EASE = [0.32, 0.72, 0, 1]

export function SceneTimeline({ isActive, progress }: SceneProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Progress-driven auto-scroll logic - refined for zero jitter
  useEffect(() => {
    if (scrollRef.current) {
      if (progress > 132) {
        // Direct linear mapping for frame-perfect scroll synchronicity
        const targetScroll = (progress - 132) * 180
        scrollRef.current.scrollTop = targetScroll
      } else {
        scrollRef.current.scrollTop = 0
      }
    }
  }, [progress])

  // Normalizing local progress for 128s - 137s window
  const normalized = Math.max(0, Math.min(1, (progress - 128) / 9))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
      transition={{ duration: 0.8 }}
      className="w-full h-full bg-[#17161A]/40 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden font-sans p-4"
    >
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      {/* Modal Container - Now the SCROLLABLE wrapper */}
      <motion.div
        ref={scrollRef}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-[98%] max-w-[1500px] max-h-[96%] bg-white rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex flex-col overflow-y-auto overflow-x-hidden border border-gray-200 no-scrollbar"
      >
        {/* Header / Banner Replacement */}
        <div className="bg-[#284952] px-6 py-8 flex flex-col items-center justify-center relative overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-pulse" />
          <h1 className="text-2xl font-black text-white mb-2 z-10 tracking-[0.1em] uppercase">Complaint Timeline</h1>
          <div className="bg-[#60BA81] text-white px-4 py-0.5 rounded-full text-[10px] font-bold z-10">
            WB280103-1101146
          </div>
        </div>

        {/* Sub Header / Buttons Bar */}
        <div className="px-6 py-4 flex justify-center gap-4 bg-white border-b border-gray-100 shrink-0">
          <button className="bg-[#60BA81] text-white px-4 py-1.5 rounded flex items-center gap-2 text-[10px] font-bold shadow-sm">
            <Download size={12} /> Download Data
          </button>
          <button className="bg-[#284952] text-white px-4 py-1.5 rounded flex items-center gap-2 text-[10px] font-bold shadow-sm">
            <Share2 size={12} /> Share Timeline
          </button>
        </div>

        {/* Complaint Info High-Level Bar */}
        <div className="mx-6 mt-4 mb-2 shrink-0">
          <div className="bg-[#60BA81] text-white px-4 py-2 rounded-t-xl flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <Info size={12} />
            </div>
            <span className="font-bold text-[11px] tracking-wide uppercase">Complaint Details</span>
          </div>
          <div className="bg-white border-x border-b border-gray-100 rounded-b-xl shadow-sm grid grid-cols-6 gap-2 p-6">
            {[
              { icon: FileText, label: "TICKET NUMBER", val: "WB280103-1101146" },
              { icon: Briefcase, label: "CATEGORY", val: "Wages & Benefits" },
              { icon: CheckCircle, label: "STATUS", val: "COMPLETED", isStatus: true },
              { icon: Clock, label: "DATE", val: "Wed, 28 Jan 2026 12:31 PM" },
              { icon: Building, label: "COMPANY", val: "1 COMMERCIAL" },
              { icon: MapPin, label: "OFFICE", val: "1 COMMERCIAL" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <item.icon size={11} className="text-[#60BA81]" />
                  <span className="text-[9px] font-black uppercase tracking-tight">{item.label}</span>
                </div>
                {item.isStatus ? (
                  <div className="flex items-center gap-1.5 bg-[#60BA81]/10 text-[#60BA81] px-2 py-0.5 rounded-full border border-[#60BA81]/20 w-fit">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#60BA81]" />
                    <span className="text-[10px] font-black">COMPLETED</span>
                  </div>
                ) : (
                  <span className="text-[11px] font-bold text-gray-500">{item.val}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Vertical Timeline Track */}
        <div
          className="px-10 py-10 relative bg-gray-50/10 h-auto"
        >
          {/* Centered Green Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#60BA81]/40 -translate-x-1/2" />

          <div className="max-w-5xl mx-auto space-y-16 relative">

            {/* Event 1: In Process (Left) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: normalized >= 0.1 ? 1 : 0, x: normalized >= 0.1 ? 0 : -30 }}
              className="relative flex justify-start items-center"
            >
              <div className="w-[46%] bg-[#60BA81] text-white p-6 rounded-xl shadow-xl relative">
                <div className="flex items-center gap-2 mb-4 font-black text-[13px] uppercase">
                  <FileText size={16} /> In Process
                </div>
                <div className="flex gap-2 mb-4">
                  {["M. JABBAR AWAN", "DELIVERY RIDER", "Wages & Benefits"].map(tag => (
                    <span key={tag} className="bg-white/20 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
                <div className="space-y-3 text-[10px] leading-relaxed text-white/95">
                  <div className="font-bold border-b border-white/10 pb-1">Additional Comments:</div>
                  <div className="font-bold">Branch = 1 Commercial</div>
                  <div className="font-bold text-[#F5A83C]">E-Code = 2401146</div>
                  <p>
                    I would like to raise a concern regarding my phone snatching incident that occurred on 11th January. I filed an FIR at the time, and my <span className="font-black text-white underline">RM Mr. Waqas</span> also emailed HR regarding this matter. Initially, the phone's exact documents were not sent... After following up again a few days later, I was told that the reimbursement would <span className="font-black text-red-200">not be provided</span> because the data was not updated.
                  </p>
                  <div className="pt-3 border-t border-white/20 space-y-1 text-[9px] font-medium">
                    <div><span className="font-black opacity-75">Concerned Department:</span> HR Department</div>
                    <div><span className="font-black opacity-75">Proposed Solution:</span> Kindly review and resolve...</div>
                    <div><span className="font-black opacity-75">Lodged By:</span> Agent from Web</div>
                  </div>
                </div>
                {/* Connector Arrow */}
                <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#60BA81] rotate-45" />
              </div>

              {/* Node and Timestamp */}
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-white border-2 border-[#60BA81] z-20" />
                <div className="absolute left-8 w-max">
                  <div className="bg-white px-3 py-1.5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-2">
                    <Clock size={10} className="text-[#60BA81]" />
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-gray-500">Wed, 28 Jan</span>
                      <span className="text-[8px] font-bold text-gray-400">2026 04:16 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Event 2: RCA (Right) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: normalized >= 0.4 ? 1 : 0, x: normalized >= 0.4 ? 0 : 30 }}
              className="relative flex justify-end items-center"
            >
              {/* Node and Timestamp */}
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-white border-2 border-[#284952] z-20" />
                <div className="absolute right-8 w-max">
                  <div className="bg-white px-3 py-1.5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-2">
                    <Clock size={10} className="text-[#284952]" />
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] font-black text-gray-500">Wed, 28 Jan</span>
                      <span className="text-[8px] font-bold text-gray-400">2026 06:42 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[46%] bg-[#284952] text-white p-6 rounded-xl shadow-xl relative ml-auto">
                <div className="flex items-center gap-2 mb-4 font-black text-[13px] uppercase">
                  <Search size={16} /> RCA - Root Cause Analysis
                </div>
                <div className="space-y-3 text-[10px] leading-relaxed text-white/90">
                  <p>
                    The employee's case was discussed with the Welfare Team, who confirmed that the employee shared his mobile details <span className="font-bold underline text-white">after</span> the mobile snatching incident. As per company policy, all riders are required to share their mobile details at the time of hiring...
                  </p>
                  <p>
                    Due to this non-compliance, the Welfare Team was unable to verify whether the employee was using the reported mobile... the employee acknowledged and confirmed.
                  </p>
                  <p>
                    Furthermore, the Welfare Team discussed the matter with the Restaurant Manager, Mr. Waqas... both confirmed that since the employee does not meet the eligibility criteria... employee is <span className="font-black text-orange-300 underline">not eligible</span> for compensation.
                  </p>
                  <p className="opacity-70 text-[9px]">
                    For reference, the employee's application with relevant details is attached...
                  </p>
                  <div className="bg-[#F5A83C] text-white px-2 py-0.5 rounded text-[8px] font-black uppercase w-fit mt-2">
                    Capa Deadline: N/A
                  </div>
                </div>
                {/* Connector Arrow */}
                <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#284952] rotate-45" />
              </div>
            </motion.div>

            {/* Event 3: CAPA (Left) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: normalized >= 0.7 ? 1 : 0, x: normalized >= 0.7 ? 0 : -30 }}
              className="relative flex justify-start items-center"
            >
              <div className="w-[46%] bg-[#60BA81] text-white p-6 rounded-xl shadow-xl relative">
                <div className="flex items-center gap-2 mb-3 font-black text-[13px] uppercase">
                  <Sparkles size={16} /> CAPA - Corrective & Preventive Actions
                </div>
                <p className="text-[10px] leading-relaxed text-white/95 py-2">
                  The employee is not eligible for compensation as the required policy criteria were not met. Mobile details were not shared as per policy, and the Welfare Team was unable to verify ownership or usage of the mobile at the time of the incident. The case was reviewed and confirmed by the relevant stakeholders.
                </p>
                <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#60BA81] rotate-45" />
              </div>

              {/* Node and Timestamp */}
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-white border-2 border-[#60BA81] z-20" />
                <div className="absolute left-8 w-max">
                  <div className="bg-white px-3 py-1.5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-2">
                    <Clock size={10} className="text-[#60BA81]" />
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-gray-500">Wed, 28 Jan</span>
                      <span className="text-[8px] font-bold text-gray-400">2026 06:42 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Event 4: SUBMITTED (Right / Bottom) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: normalized >= 0.9 ? 1 : 0, scale: normalized >= 0.9 ? 1 : 0.9 }}
              className="relative flex justify-end items-center pb-20"
            >
              {/* Node and Timestamp */}
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-white border-2 border-[#284952] z-20" />
                <div className="absolute left-8 w-max">
                  <div className="bg-white px-3 py-1.5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-2">
                    <Clock size={10} className="text-[#284952]" />
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-gray-500">Wed, 28 Jan</span>
                      <span className="text-[8px] font-bold text-gray-400">2026 06:42 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[46%] bg-[#284952]/90 backdrop-blur-md text-white px-10 py-5 rounded-lg flex items-center gap-4 shadow-2xl border border-[#284952] ml-auto relative">
                <CheckCircle size={24} className="text-[#60BA81]" />
                <span className="font-black tracking-[0.4em] uppercase text-sm">Submitted</span>
                <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 bg-[#284952] rotate-45 opacity-90" />
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
