"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export const Scene3ValidityAssessment = () => {
  const [selectedValidity, setSelectedValidity] = useState<string | null>(null)
  const [showEvidence, setShowEvidence] = useState(false)

  useEffect(() => {
    // Timeline: 23.76-37.92s - Validity assessment visualization
    const timer1 = setTimeout(() => {
      setShowEvidence(true)
    }, 23760)

    return () => clearTimeout(timer1)
  }, [])

  const validityOptions = [
    {
      id: "valid",
      label: "Valid",
      description: "Complaint is fully justified",
      color: "#60BA81",
      icon: "✓",
      bgColor: "from-green-50 to-emerald-50",
    },
    {
      id: "partially",
      label: "Partially Valid",
      description: "Some aspects are justified",
      color: "#F5A83C",
      icon: "◐",
      bgColor: "from-orange-50 to-amber-50",
    },
    {
      id: "invalid",
      label: "Invalid",
      description: "Complaint is not justified",
      color: "#E74C3C",
      icon: "✗",
      bgColor: "from-red-50 to-rose-50",
    },
  ]

  const evidenceSources = [
    { title: "Worker Interviews", count: 5, icon: "👥" },
    { title: "Internal Records", count: 3, icon: "📄" },
    { title: "Evidence Review", count: 8, icon: "🔍" },
  ]

  return (
    <div className="w-full h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4 px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <span className="text-xs font-medium text-gray-500">MULTAN47</span>
        </div>
        <h1 className="flex-1 text-center">
          <span className="text-xl font-bold text-teal-900">Validity Assessment</span>
        </h1>
        <div className="flex items-center gap-4">
          <button className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">🔔</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-6xl mx-auto">
          {/* Assessment Options */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Assessment Outcome</h2>
            <div className="grid grid-cols-3 gap-4">
              {validityOptions.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: (28.6 - 23.76) / 1000 + index * 0.15,
                  }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedValidity(option.id)}
                  className={`relative p-6 rounded-lg border-2 transition-all ${
                    selectedValidity === option.id
                      ? `border-[${option.color}] bg-gradient-to-br ${option.bgColor}`
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <motion.div animate={{ scale: selectedValidity === option.id ? 1.1 : 1 }} className="text-4xl mb-3">
                    {option.icon}
                  </motion.div>
                  <h3 className="font-bold text-gray-900">{option.label}</h3>
                  <p className="text-sm text-gray-600 mt-2">{option.description}</p>

                  {selectedValidity === option.id && (
                    <motion.div
                      layoutId="selection"
                      className="absolute inset-0 rounded-lg border-2"
                      style={{ borderColor: option.color }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Evidence Sources */}
          {showEvidence && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (31.8 - 23.76) / 1000 }}
              className="mb-8"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-6">Evidence Sources Reviewed</h2>
              <div className="grid grid-cols-3 gap-4">
                {evidenceSources.map((source, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: (31.8 - 23.76) / 1000 + index * 0.1,
                    }}
                    className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="text-4xl mb-3">{source.icon}</div>
                    <h3 className="font-semibold text-gray-900">{source.title}</h3>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: (31.8 - 23.76) / 1000 + 0.3 + index * 0.1,
                      }}
                      className="mt-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100"
                    >
                      <span className="font-bold text-green-700">{source.count}</span>
                    </motion.div>
                    <p className="text-xs text-gray-500 mt-2">items reviewed</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Assessment Details */}
          {selectedValidity && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Assessment Details</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  <span className="font-medium">Based on:</span> Worker interviews, internal record cross-check, and
                  comprehensive evidence review
                </p>
                <p>
                  <span className="font-medium">Status:</span> This complaint has been marked as{" "}
                  <strong>{validityOptions.find((o) => o.id === selectedValidity)?.label}</strong>
                </p>
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900">
                    The Investigation Officer will now proceed with the Root Cause Analysis (RCA) and Corrective &
                    Preventive Actions (CAPA) phase.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
