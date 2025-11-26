"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  AlertTriangle,
  List,
  ListOrdered,
  Bold,
  Italic,
  Underline,
  LinkIcon,
  Upload,
  FileText,
  ImageIcon,
  Mic,
  Printer,
  CheckCircle2,
  Calendar,
  Info,
} from "lucide-react"

// Brand Colors
const COLORS = {
  teal: "#0f9690",
  darkTeal: "#284952",
  green: "#60BA81",
  charcoal: "#17161A",
  orange: "#F5A83C",
  white: "#FFFFFF",
  bg: "#F5F5F7",
  border: "#DEE2E6",
  softGreen: "rgba(96, 186, 129, 0.42)",
}

interface SceneRCACAPAEvidenceProps {
  isActive: boolean
  progress?: number
}

export function SceneRCACAPAEvidence({ isActive, progress = 0 }: SceneRCACAPAEvidenceProps) {
  const [stage, setStage] = useState(0)
  const [rcaText, setRcaText] = useState("")
  const [capaText, setCapaText] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [draggingFile, setDraggingFile] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Voice-over synced text content
  const rcaFullText = `The complaint is VALID based on the investigation findings.

• Worker statements confirm inconsistent shift rotations
• HR records show policy was not followed for 3 employees
• Root cause: Branch manager failed to update the rotation schedule

This is a process issue requiring immediate corrective action.`

  const capaFullText = `CORRECTIVE ACTIONS:
• Revert affected workers to their original fixed shifts immediately
• Issue formal warning to branch manager

PREVENTIVE MEASURES:
• Implement automated rotation software
• Monthly compliance audits by HR
• Staff training on new scheduling policy

Assigned to: HR Manager | Deadline: 20 Nov 2025`

  // Scene runs from 37.9 to 80 seconds
  useEffect(() => {
    if (!isActive) return

    const sceneStart = 37.9
    const localProgress = progress - sceneStart

    if (localProgress < 0) {
      setStage(0)
      return
    }

    // [37.9-38.7] Show full page
    if (localProgress < 0.8) {
      setStage(1)
    }
    // [38.7-43.96] Zoom to RCA, type RCA
    else if (localProgress < 6) {
      setStage(localProgress < 1.5 ? 2 : 3)
    }
    // [43.96-64.52] Zoom to CAPA, type CAPA
    else if (localProgress < 26.6) {
      if (localProgress < 7) setStage(4)
      else if (localProgress < 12) setStage(5)
      else if (localProgress < 18) setStage(6)
      else setStage(7)
    }
    // [64.52-73.72] Evidence upload
    else if (localProgress < 35.8) {
      if (localProgress < 27) setStage(8)
      else if (localProgress < 29) setStage(9)
      else if (localProgress < 31) setStage(10)
      else if (localProgress < 33) setStage(11)
      else setStage(12)
    }
    // [73.72-80] Submit
    else {
      if (localProgress < 37) setStage(13)
      else if (localProgress < 39) setStage(14)
      else setStage(15)
    }
  }, [isActive, progress])

  useEffect(() => {
    if (stage >= 3 && rcaText.length < rcaFullText.length) {
      const interval = setInterval(() => {
        setRcaText((prev) => {
          if (prev.length < rcaFullText.length) {
            return rcaFullText.slice(0, prev.length + 2)
          }
          return prev
        })
      }, 30)
      return () => clearInterval(interval)
    }
  }, [stage, rcaText.length])

  useEffect(() => {
    if (stage >= 5 && capaText.length < capaFullText.length) {
      const interval = setInterval(() => {
        setCapaText((prev) => {
          if (prev.length < capaFullText.length) {
            return capaFullText.slice(0, prev.length + 2)
          }
          return prev
        })
      }, 25)
      return () => clearInterval(interval)
    }
  }, [stage, capaText.length])

  useEffect(() => {
    const files = ["photo_evidence.jpg", "worker_statement.pdf", "voice_recording.mp3", "policy_doc.pdf"]

    if (stage === 9 && !draggingFile && !uploadedFiles.includes(files[0])) {
      setDraggingFile(files[0])
      setTimeout(() => {
        setDraggingFile(null)
        setUploadedFiles((prev) => [...prev, files[0]])
      }, 800)
    }
    if (stage === 10 && !draggingFile && !uploadedFiles.includes(files[1])) {
      setDraggingFile(files[1])
      setTimeout(() => {
        setDraggingFile(null)
        setUploadedFiles((prev) => [...prev, files[1]])
      }, 800)
    }
    if (stage === 11 && !draggingFile && !uploadedFiles.includes(files[2])) {
      setDraggingFile(files[2])
      setTimeout(() => {
        setDraggingFile(null)
        setUploadedFiles((prev) => [...prev, files[2]])
      }, 800)
    }
    if (stage === 12 && !draggingFile && !uploadedFiles.includes(files[3])) {
      setDraggingFile(files[3])
      setTimeout(() => {
        setDraggingFile(null)
        setUploadedFiles((prev) => [...prev, files[3]])
      }, 800)
    }
  }, [stage])

  useEffect(() => {
    if (stage >= 15) {
      setShowSuccess(true)
    }
  }, [stage])

  // Reset on inactive
  useEffect(() => {
    if (!isActive) {
      setStage(0)
      setRcaText("")
      setCapaText("")
      setUploadedFiles([])
      setShowSuccess(false)
      setDraggingFile(null)
    }
  }, [isActive])

  // More moderate zoom transforms for better visibility
  const getTransform = () => {
    const containerWidth = 900 // approx max-w-[900px]
    const containerHeight = 600 // approx max-h-[600px]
    
    switch (true) {
      // Zoom to RCA (top right section) - More moderate zoom
      case stage >= 2 && stage < 4:
        return { 
          scale: 1.6, // Reduced from 2.2 to 1.6
          x: -containerWidth * 0.18, // Adjusted for new scale
          y: containerHeight * 0.12   
        }
      
      // Zoom to CAPA (bottom left section) - More moderate zoom
      case stage >= 4 && stage < 8:
        return { 
          scale: 1.6, // Reduced from 2.2 to 1.6
          x: containerWidth * 0.18,  
          y: -containerHeight * 0.12 
        }
      
      // Zoom to Evidence (bottom right section) - More moderate zoom
      case stage >= 8 && stage < 13:
        return { 
          scale: 1.6, // Reduced from 2.2 to 1.6
          x: -containerWidth * 0.18, 
          y: -containerHeight * 0.18 
        }
      
      // Zoom to footer/submit button area - More moderate zoom
      case stage >= 13:
        return { 
          scale: 1.4, // Reduced from 1.8 to 1.4
          x: 0, 
          y: -containerHeight * 0.25 // Less aggressive upward movement
        }
      
      // Default: show full page
      default:
        return { scale: 1, x: 0, y: 0 }
    }
  }

  const transform = getTransform()

  return (
    <div className="w-full h-full overflow-hidden bg-gradient-to-br from-[#F5F5F7] to-[#E8E8EA] flex items-center justify-center font-sans relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${COLORS.darkTeal} 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Dragging File Animation */}
      <AnimatePresence>
        {draggingFile && (
          <motion.div
            initial={{ x: 200, y: -100, opacity: 0, scale: 0.5 }}
            animate={{ x: 80, y: 60, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute z-[100] flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-2xl border-2 border-dashed"
            style={{ borderColor: COLORS.teal }}
          >
            {draggingFile.includes("jpg") && <ImageIcon size={24} className="text-[#F5A83C]" />}
            {draggingFile.includes("pdf") && <FileText size={24} className="text-[#60BA81]" />}
            {draggingFile.includes("mp3") && <Mic size={24} className="text-[#284952]" />}
            <span className="text-[10px] font-medium text-gray-600">{draggingFile}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container with More Moderate Zoom */}
      <motion.div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
        animate={{
          scale: transform.scale,
          x: transform.x,
          y: transform.y,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 90, // Slightly softer spring
          damping: 25,   // More damping for smoother stop
          mass: 1        // Standard mass
        }}
      >
        {/* Slightly smaller container for better proportions */}
        <div className="w-[90%] h-[90%] max-w-[850px] max-h-[550px]">
          {/* Apple-style Card Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full bg-[#F8F8F8] rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-200 flex flex-col"
          >
            {/* Timeline Content - Matching Image Layout */}
            <div className="relative flex-1 p-4 overflow-hidden">
              {/* Central Timeline Line - Vertical Dashed */}
              <div className="absolute left-1/2 top-4 bottom-16 w-0 -translate-x-1/2 border-l-2 border-dashed border-gray-300" />

              {/* Timeline Progress Line */}
              <motion.div
                className="absolute left-1/2 top-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#0f9690] to-[#60BA81]"
                initial={{ height: "0%" }}
                animate={{ height: stage >= 1 ? "80%" : "0%" }}
                transition={{ duration: 3, ease: "easeOut" }}
              />

              {/* Content Layout - Two Columns with Timeline in Center */}
              <div className="relative grid grid-cols-[1fr_50px_1fr] gap-3 h-full">
                {/* Left Column - CAPA at bottom */}
                <div className="flex flex-col justify-end pb-4">
                  {/* CAPA Card - Bottom Left */}
                  <motion.div
                    animate={{
                      scale: stage >= 4 && stage < 8 ? 1.03 : 1, // More subtle scale
                      zIndex: stage >= 4 && stage < 8 ? 10 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <motion.div
                      className="rounded-lg overflow-hidden shadow-lg border-2 transition-all duration-300"
                      style={{
                        borderColor: stage >= 4 && stage < 8 ? COLORS.teal : "transparent",
                        boxShadow:
                          stage >= 4 && stage < 8
                            ? `0 10px 40px -10px ${COLORS.teal}60`
                            : "0 4px 20px -5px rgba(0,0,0,0.1)",
                      }}
                    >
                      {/* Card Header */}
                      <div
                        className="px-3 py-2 flex items-center justify-between"
                        style={{ backgroundColor: COLORS.teal }}
                      >
                        <span className="font-bold text-white text-xs">CAPA-Corrective & Preventive Actions</span>
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                          <List size={12} className="text-white" />
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="bg-white p-3">
                        <div className="text-[10px] text-gray-500 font-medium mb-1">Detail:</div>

                        {/* Rich Text Toolbar */}
                        <div className="flex items-center gap-0.5 p-1.5 bg-gray-50 rounded mb-2 border border-gray-200">
                          {[Bold, Italic, Underline, List, ListOrdered, LinkIcon].map((Icon, i) => (
                            <button
                              key={i}
                              className="w-5 h-5 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                            >
                              <Icon size={10} />
                            </button>
                          ))}
                        </div>

                        {/* Text Content */}
                        <div className="min-h-[120px] max-h-[140px] overflow-y-auto p-2 border border-gray-200 rounded bg-gray-50/50">
                          <div className="text-[10px] text-gray-600 leading-relaxed whitespace-pre-line">
                            {capaText ? (
                              <>
                                {capaText.split("\n").map((line, idx) => (
                                  <motion.div
                                    key={idx}
                                    animate={{
                                      backgroundColor:
                                        (stage === 6 && line.includes("CORRECTIVE")) ||
                                        (stage === 7 && line.includes("PREVENTIVE"))
                                          ? COLORS.softGreen
                                          : "transparent",
                                    }}
                                    className="px-1 -mx-1 rounded transition-colors duration-300"
                                  >
                                    {line}
                                  </motion.div>
                                ))}
                                {stage >= 5 && stage < 8 && (
                                  <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6 }}
                                    className="inline-block w-0.5 h-3 bg-[#0f9690] ml-0.5 align-middle"
                                  />
                                )}
                              </>
                            ) : (
                              <span className="text-gray-400 italic text-[10px]">
                                Outline the specific actions taken to resolve the issue (Corrective Actions) and steps
                                to prevent similar complaints in the future (Preventive Actions). Include:
                                <br />
                                <br />• How is the current issue being fixed?
                                <br />• What changes (policy updates, training, process improvements) has been
                                implemented to avoid repetition?
                                <br />• How will effectiveness be measured (e.g., audits, follow-ups)?
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Center Column - Timeline Nodes */}
                <div className="flex flex-col items-center justify-between py-6">
                  {/* Node 1 - RCA */}
                  <div className="flex flex-col items-center gap-1">
                    <motion.div
                      className="px-2 py-0.5 rounded text-[9px] font-bold text-white"
                      style={{ backgroundColor: COLORS.orange }}
                      animate={{
                        scale: stage >= 2 && stage < 4 ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: stage >= 2 && stage < 4 ? Number.POSITIVE_INFINITY : 0,
                        repeatDelay: 1,
                      }}
                    >
                      null
                    </motion.div>
                    <motion.div
                      className="w-3 h-3 rounded-full bg-white border-[3px] shadow-md z-10"
                      style={{ borderColor: stage >= 2 ? COLORS.teal : COLORS.border }}
                    />
                  </div>

                  {/* Node 2 - CAPA/Evidence */}
                  <div className="flex flex-col items-center gap-1">
                    <motion.div
                      className="px-2 py-0.5 rounded text-[9px] font-bold text-white"
                      style={{ backgroundColor: COLORS.orange }}
                      animate={{
                        scale: stage >= 4 && stage < 13 ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: stage >= 4 && stage < 13 ? Number.POSITIVE_INFINITY : 0,
                        repeatDelay: 1,
                      }}
                    >
                      null
                    </motion.div>
                    <motion.div
                      className="w-3 h-3 rounded-full bg-white border-[3px] shadow-md z-10"
                      style={{ borderColor: stage >= 4 ? COLORS.teal : COLORS.border }}
                    />
                  </div>
                </div>

                {/* Right Column - RCA at top, Evidence at bottom */}
                <div className="flex flex-col gap-3 py-2">
                  {/* RCA Card - Top Right */}
                  <motion.div
                    animate={{
                      scale: stage >= 2 && stage < 4 ? 1.03 : 1, // More subtle scale
                      zIndex: stage >= 2 && stage < 4 ? 10 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <motion.div
                      className="rounded-lg overflow-hidden shadow-lg border-2 transition-all duration-300"
                      style={{
                        borderColor: stage >= 2 && stage < 4 ? COLORS.green : "transparent",
                        boxShadow:
                          stage >= 2 && stage < 4
                            ? `0 10px 40px -10px ${COLORS.green}60`
                            : "0 4px 20px -5px rgba(0,0,0,0.1)",
                      }}
                    >
                      {/* Card Header */}
                      <div className="px-3 py-2 flex items-center gap-2" style={{ backgroundColor: COLORS.teal }}>
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                          <AlertTriangle size={12} className="text-white" />
                        </div>
                        <span className="font-bold text-white text-xs">RCA-Root Cause Analysis</span>
                      </div>

                      {/* Card Body */}
                      <div className="bg-white p-3">
                        <div className="text-[10px] text-gray-500 font-medium mb-1">Detail</div>

                        {/* Rich Text Toolbar */}
                        <div className="flex items-center gap-0.5 p-1.5 bg-gray-50 rounded mb-2 border border-gray-200">
                          {[Bold, Italic, Underline, List, ListOrdered, LinkIcon].map((Icon, i) => (
                            <button
                              key={i}
                              className="w-5 h-5 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                            >
                              <Icon size={10} />
                            </button>
                          ))}
                        </div>

                        {/* Text Content */}
                        <div className="min-h-[80px] max-h-[100px] overflow-y-auto p-2 border border-gray-200 rounded bg-gray-50/50">
                          <div className="text-[10px] text-gray-600 leading-relaxed whitespace-pre-line">
                            {rcaText ? (
                              <>
                                {rcaText}
                                {stage >= 3 && stage < 4 && (
                                  <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6 }}
                                    className="inline-block w-0.5 h-3 bg-[#60BA81] ml-0.5 align-middle"
                                  />
                                )}
                              </>
                            ) : (
                              <span className="text-gray-400 italic text-[10px]">
                                Explain why the complaint happened. Identify the reason behind the problem—Answer
                                questions like:
                                <br />
                                <br />• Whether the complaint is valid or invalid?
                                <br />• What went wrong?
                                <br />• Was it a process issue, lack of training, or a mistake?
                                <br />• Has this happened before? If yes, why?
                              </span>
                            )}
                          </div>
                        </div>

                        {/* CAPA Deadline */}
                        <div className="mt-2">
                          <div className="text-[10px] text-gray-500 font-medium mb-1">Capa Deadline</div>
                          <div className="flex items-center gap-2 px-2 py-1.5 border border-gray-200 rounded bg-white">
                            <span className="text-[10px] text-gray-400">dd/mm/yyyy --:--</span>
                            <Calendar size={12} className="text-gray-400 ml-auto" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Evidence Upload Card - Bottom Right */}
                  <motion.div
                    animate={{
                      scale: stage >= 8 && stage < 13 ? 1.03 : 1, // More subtle scale
                      zIndex: stage >= 8 && stage < 13 ? 10 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <motion.div
                      className="rounded-lg overflow-hidden shadow-lg border-2 transition-all duration-300"
                      style={{
                        borderColor: stage >= 8 && stage < 13 ? COLORS.teal : "transparent",
                        boxShadow:
                          stage >= 8 && stage < 13
                            ? `0 10px 40px -10px ${COLORS.teal}60`
                            : "0 4px 20px -5px rgba(0,0,0,0.1)",
                      }}
                    >
                      {/* Upload Area */}
                      <div className="p-3" style={{ backgroundColor: COLORS.teal }}>
                        <div className="flex items-center gap-3">
                          {/* Select Files Button */}
                          <div className="flex items-center gap-2 px-3 py-2 bg-white/20 rounded">
                            <Upload size={14} className="text-white" />
                            <span className="text-[10px] text-white font-medium">Select Files</span>
                          </div>
                          {/* Drop Zone Text */}
                          <span className="text-[10px] text-white">
                            Drag and drop files here or click to select files
                          </span>
                        </div>

                        {/* Uploaded Files Display */}
                        <div className="mt-2 min-h-[40px] bg-white/10 rounded p-2">
                          {uploadedFiles.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {uploadedFiles.map((file, idx) => (
                                <motion.div
                                  key={file}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="flex items-center gap-1 px-2 py-1 bg-white/20 rounded text-[9px] text-white"
                                >
                                  {file.includes("jpg") && <ImageIcon size={10} />}
                                  {file.includes("pdf") && <FileText size={10} />}
                                  {file.includes("mp3") && <Mic size={10} />}
                                  {file}
                                </motion.div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-[10px] text-white/60 italic">No files selected</span>
                          )}
                        </div>

                        {/* File Types Info */}
                        <div className="flex items-center gap-1 mt-2 text-[9px] text-white/80">
                          <Info size={10} />
                          <span>
                            You can upload multiple files (PNG, JPG, JPEG, PDF, MP4, AVI, MKV, MOV, MP3, OPUS)
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-2">
              <motion.button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-[10px] font-medium text-white"
                style={{ backgroundColor: "#0095da" }}
                animate={{
                  scale: stage >= 13 ? [1, 1.05, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  repeat: stage >= 13 && stage < 15 ? Number.POSITIVE_INFINITY : 0,
                  repeatDelay: 0.5,
                }}
              >
                <Printer size={12} />
                Print Timeline
              </motion.button>
              <button className="px-3 py-1.5 rounded text-[10px] font-medium text-white bg-gray-500">Close</button>
              <button
                className="px-3 py-1.5 rounded text-[10px] font-medium text-white"
                style={{ backgroundColor: "#0095da" }}
              >
                Route Complaint
              </button>
              <motion.button
                className="px-3 py-1.5 rounded text-[10px] font-medium text-white"
                style={{ backgroundColor: "#0095da" }}
                animate={{
                  scale: stage >= 14 ? [1, 1.1, 1] : 1,
                  boxShadow: stage >= 14 ? `0 0 20px ${COLORS.teal}` : "none",
                }}
                transition={{
                  duration: 0.4,
                  repeat: stage >= 14 && stage < 15 ? Number.POSITIVE_INFINITY : 0,
                  repeatDelay: 0.3,
                }}
              >
                Submit Changes
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Success Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 max-w-sm mx-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: COLORS.softGreen }}
              >
                <CheckCircle2 size={32} style={{ color: COLORS.green }} />
              </motion.div>
              <h3 className="text-lg font-bold text-gray-800">Investigation Complete</h3>
              <p className="text-sm text-gray-600 text-center">
                Case submitted to FOS for closure review. All evidence and documentation has been recorded.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}