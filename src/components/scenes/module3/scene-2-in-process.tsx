"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Complaint {
  sr: number
  ticketNumber: string
  name: string
  status: "Unprocessed" | "In Process" | "Submitted" | "Bounced"
  complaintDate: string
  mobileNumber: string
  complaintCategory: string
  additionalComments: string
}

// --- TIMING CONSTANTS ---
// Start: 21s
const TIMING_IN_PROCESS = 21.5; // "activates the case"
const TIMING_SHOW_TIMELINE = 23.0; // "triggers timeline tracking"
const TIMING_RCA_EXPAND = 28.0;   // "next step is root cause"

export const Scene2InProcess = ({ isActive, progress }: { isActive: boolean, progress: number }) => {
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      sr: 457,
      ticketNumber: "FL251141-475002",
      name: "Sana",
      status: "Unprocessed",
      complaintDate: "Tue, 25 Nov 2025 12:36 PM",
      mobileNumber: "923164015542",
      complaintCategory: "Forced Labor",
      additionalComments: "Anonymous",
    },
    {
      sr: 456,
      ticketNumber: "FL251140-475002",
      name: "Sana",
      status: "Unprocessed",
      complaintDate: "Fri, 21 Nov 2025 11:44 AM",
      mobileNumber: "923164015542",
      complaintCategory: "Forced Labor",
      additionalComments: "N/A",
    },
  ])

  // Derived Logic from Progress
  const isStatusProcessed = isActive && progress >= TIMING_IN_PROCESS;
  const showTimelineComputed = isActive && progress >= TIMING_SHOW_TIMELINE;
  // If progress > 28, expand RCA. Else null.
  const expandedSectionComputed = (isActive && progress >= TIMING_RCA_EXPAND) ? "rca" : null;

  // Sync state with timeline
  useEffect(() => {
    if (isStatusProcessed) {
      setComplaints(prev => prev.map(c => c.sr === 457 ? { ...c, status: "In Process" } : c));
    }
  }, [isStatusProcessed]);

  // Use the computed timeline/expanded state directly or sync it
  // We'll keep local state for manual overrides if user wants to play, but auto-drive it.
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  useEffect(() => {
    if (showTimelineComputed) {
      // Auto-select the first complaint
      setSelectedComplaint(complaints.find(c => c.sr === 457) || complaints[0]);
    } else {
      // Only close if we are rewinding significantly, otherwise keep open for continuity
      if (progress < TIMING_SHOW_TIMELINE && isActive) setSelectedComplaint(null);
    }
  }, [showTimelineComputed, isActive, progress, complaints]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Unprocessed":
        return "bg-[#284952] text-white"
      case "In Process":
        return "bg-[#60BA81] text-white"
      case "Submitted":
        return "bg-gray-400 text-white"
      case "Bounced":
        return "bg-[#F5A83C] text-white"
      default:
        return "bg-gray-300 text-white"
    }
  }

  return (
    <div className="w-full h-screen bg-white overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4 px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/fruit-of-sustainability-logo.jpg" alt="Logo" className="h-10 w-10" />
          <span className="text-xs font-bold text-teal-900">FRUIT OF SUSTAINABILITY</span>
        </div>
        <h1 className="flex-1 text-center">
          <span className="text-xl font-bold text-teal-900">Grievance Management Portal</span>
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-gray-600">MULTAN47</span>
          <button className="px-3 py-1 rounded-lg bg-[#60BA81] text-white text-xs font-medium hover:bg-[#60BA81]/90">
            🔔
          </button>
          <button className="text-sm text-gray-700">Logout ↗</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Complaints</h3>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Sr.</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Ticket Number</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">NAME</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">STATUS</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">COMPLAINT DATE</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Mobile Number</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Complaint Categories</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Additional Comments</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {complaints.map((complaint) => (
                    <motion.tr
                      key={complaint.ticketNumber}
                      onClick={() => setSelectedComplaint(complaint)}
                      className={`hover:bg-gray-50 transition-colors ${complaint.status === "In Process" ? "cursor-pointer" : ""
                        }`}
                      layout
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">{complaint.sr}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{complaint.ticketNumber}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{complaint.name}</td>
                      <td className="px-6 py-4 text-sm">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-4 py-2 rounded-lg font-medium text-xs ${getStatusColor(complaint.status)}`}
                        >
                          {complaint.status}
                        </motion.button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{complaint.complaintDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{complaint.mobileNumber}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{complaint.complaintCategory}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{complaint.additionalComments}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showTimelineComputed && selectedComplaint && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-white border-b border-gray-200 px-8 py-6 flex items-start justify-between sticky top-0 z-10">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedComplaint.ticketNumber}</h2>
                  <p className="text-sm text-gray-600 mt-2">
                    {selectedComplaint.complaintDate} | {selectedComplaint.name} | {selectedComplaint.complaintCategory}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-gray-600 text-3xl font-light"
                >
                  ×
                </motion.button>
              </div>

              {/* Share Timeline Button */}
              <div className="bg-gray-50 px-8 py-4 border-b border-gray-200 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-[#60BA81] text-white rounded-lg hover:bg-[#60BA81]/90 text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C9.556 15.408 11.692 17 14.5 17a4.5 4.5 0 10-9-9m15 0a4.5 4.5 0 01-9 9m0 0v1.5a2.25 2.25 0 005 0v-1.5"
                    />
                  </svg>
                  Share Timeline
                </motion.button>
              </div>

              {/* Timeline Content */}
              <div className="flex-1 overflow-auto p-8">
                {/* Timeline Sections with alternating left-right layout */}
                <div className="space-y-8">
                  {/* Complaint Details Card - Left Side */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="ml-0 mr-auto w-1/2 bg-[#284952] text-white rounded-xl p-6 shadow-lg"
                  >
                    <h3 className="text-lg font-bold mb-3">Anonymous</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                        {selectedComplaint.status}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{selectedComplaint.additionalComments}</p>
                  </motion.div>

                  {/* RCA Section - Right Side */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="ml-auto mr-0 w-1/2"
                  >
                    <button className="w-full text-left">
                      <div className="bg-[#60BA81] text-white rounded-t-xl p-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4v2m0 4v2M12 3v2M8 3h8M3 12h2m4 0h2m4 0h2M3 8h2m4 0h2m4 0h2"
                            />
                          </svg>
                        </div>
                        <h4 className="text-lg font-bold">RCA-Root Cause Analysis</h4>
                      </div>
                    </button>

                    <AnimatePresence>
                      {expandedSectionComputed === "rca" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-[#60BA81]/10 border border-[#60BA81] rounded-b-xl p-6"
                        >
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Detail</label>
                            <div className="bg-white border border-gray-300 rounded-lg p-4 min-h-[200px]">
                              <p className="text-sm text-gray-600 italic">
                                Explain why the complaint happened. Identify the reason behind the problem—
                              </p>
                              <ul className="text-sm text-gray-600 mt-3 space-y-1 ml-4">
                                <li>• Whether the complaint is valid or invalid?</li>
                                <li>• What went wrong?</li>
                                <li>• Was it a process issue, lack of training, or a mistake?</li>
                                <li>• Has this happened before? If yes, why?</li>
                              </ul>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Capa Deadline</label>
                            <input
                              type="datetime-local"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              defaultValue="2025-11-28T23:59"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* CAPA Section - Left Side */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="ml-0 mr-auto w-1/2"
                  >
                    <button className="w-full text-left">
                      <div className="bg-[#284952] text-white rounded-t-xl p-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                        </div>
                        <h4 className="text-lg font-bold">CAPA-Corrective & Preventive Actions</h4>
                      </div>
                    </button>
                  </motion.div>

                  {/* File Upload Section - Right Side */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="ml-auto mr-0 w-1/2"
                  >
                    <div className="bg-[#284952] text-white rounded-xl p-6 shadow-lg">
                      <div className="flex items-center gap-3 mb-4">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                          />
                        </svg>
                        <h4 className="text-lg font-bold">Select Files</h4>
                      </div>
                      <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center cursor-pointer hover:bg-white/5 transition">
                        <p className="text-sm">Drag and drop files here or click to select</p>
                        <p className="text-xs text-white/70 mt-2">
                          Supported: PNG, JPG, JPEG, PDF, MP4, AVI, MKV, MOV, MP3, OPUS
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 border-t border-gray-200 px-8 py-6 flex items-center justify-end gap-3 sticky bottom-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 rounded-lg bg-gray-400 text-white font-medium hover:bg-gray-500 text-sm"
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 text-sm"
                >
                  Route Complaint
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 text-sm"
                >
                  Submit Changes
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
