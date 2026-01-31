"use client"

import React, { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileCheck,
  ScanLine,
  CheckCircle2,
} from "lucide-react"

import { ENHANCED_TIMING, MOCK_EMPLOYEE_DATA } from "./upload-constants.ts"
import {
  Card3D,
  HolographicGlow,
  DataParticleStream,
  TypewriterText,
  ProgressRing,
  CompanyBadge,
  EmployeeListCard,
  IntegrationOptions,
  APIHandshakeVisual,
  UploadProgressVisual,
  ValidationScanner,
  SuccessCelebration,
  IntroText,
  BackgroundEffects
} from "./upload-components/index.ts"

export const SceneUpload = ({ isActive, progress }: any) => {
  // Calculate phase states based on timeline
  const showIntroText = progress >= ENHANCED_TIMING.INTRO_TEXT && progress < ENHANCED_TIMING.INTRO_END
  const showCompany = progress >= ENHANCED_TIMING.COMPANY_APPEAR
  const showEmployeeList = progress >= ENHANCED_TIMING.EMPLOYEE_LIST_REVEAL
  const showIntegrationChoice = progress >= ENHANCED_TIMING.INTEGRATION_CHOICE
  const selectedOption = progress >= ENHANCED_TIMING.HRMS_OPTION_APPEAR ? "hrms" : null
  const showAPIConnection = progress >= ENHANCED_TIMING.API_CONNECTION_START
  const apiStage = progress >= ENHANCED_TIMING.API_COMPLETE ? "established"
    : progress >= ENHANCED_TIMING.API_HANDSHAKE ? "authenticating"
      : "connecting"
  const showUpload = progress >= ENHANCED_TIMING.UPLOAD_INITIATE && progress < ENHANCED_TIMING.VALIDATION_START
  const uploadProgress = showUpload
    ? Math.min(100, ((progress - ENHANCED_TIMING.UPLOAD_INITIATE) / (ENHANCED_TIMING.VALIDATION_START - ENHANCED_TIMING.UPLOAD_INITIATE)) * 100)
    : 0
  const showValidation = progress >= ENHANCED_TIMING.VALIDATION_START
  const validatedCount = showValidation
    ? Math.min(MOCK_EMPLOYEE_DATA.length, Math.floor((progress - ENHANCED_TIMING.VALIDATION_START) / 0.4))
    : 0
  const isComplete = progress >= ENHANCED_TIMING.READY_STATE
  const showCelebration = progress >= ENHANCED_TIMING.CELEBRATION && progress < ENHANCED_TIMING.CELEBRATION + 2

  return (
    <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-[#F5F5F7] via-white to-[#F5F5F7] overflow-hidden">

      {/* ===== BACKGROUND EFFECTS ===== */}
      <BackgroundEffects />

      {/* ===== INTRO TEXT (2-5s) ===== */}
      <IntroText showIntroText={showIntroText} />

      {/* ===== MAIN CONTENT AREA ===== */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 h-full flex items-center justify-center gap-8 lg:gap-20">

        {/* Company Section (Left Side) - Hides on API Handshake */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          animate={{
            opacity: showCompany && !showAPIConnection ? 1 : 0,
            x: showCompany && !showAPIConnection ? 0 : -50,
            display: showValidation ? "none" : "block" // Hide completely during validation to allow specific centering if needed, but here we want to keep structure. Actually, keeping it block preserves layout.
          }}
          transition={{ duration: 0.5 }}
        >
          <Card3D className="p-6 w-80" isActive={showCompany}>
            <div className="space-y-4">
              {/* Company Badge */}
              <div className="flex justify-center">
                <CompanyBadge active={showCompany} type="company" />
              </div>

              {/* Company Info */}
              <div className="text-center">
                <div className="text-sm font-bold text-[#284952]">Manufacturing Company</div>
                <div className="text-xs text-gray-500">Region 1 - Pakistan</div>
              </div>

              {/* Content Swap: Employee List -> Integration Options */}
              <div className="min-h-[160px] relative">
                <AnimatePresence mode="wait">
                  {showEmployeeList && !showIntegrationChoice && (
                    <motion.div
                      key="employee-list"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <EmployeeListCard
                        employees={MOCK_EMPLOYEE_DATA}
                        revealed={true} // Always "revealed" when mounted here
                        progress={progress}
                      />
                    </motion.div>
                  )}

                  {showIntegrationChoice && !showValidation && (
                    <motion.div
                      key="integration-options"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IntegrationOptions
                        active={true} // Always active when mounted
                        selectedOption={selectedOption}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <HolographicGlow active={showCompany} color="#60BA81" />
          </Card3D>
        </motion.div>

        {/* FOS Validation Engine (Right Side) */}
        <motion.div
          className="relative origin-center"
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{
            opacity: showValidation ? 1 : 0,
            x: showValidation ? 0 : 50,
            scale: showValidation ? 0.9 : 0.9 // Keep visually zoomed out
          }}
          transition={{ duration: 0.5 }}
        >
          <Card3D className="p-0 w-[500px] overflow-hidden shadow-2xl" isActive={showValidation}>
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-white to-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <CompanyBadge active={showValidation} type="fos" />
                    {showValidation && !isComplete && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: 104, height: 104 }}>
                        <ProgressRing
                          progress={(validatedCount / MOCK_EMPLOYEE_DATA.length) * 100}
                          size={104}
                          strokeWidth={4}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#284952]">FOS Validation Engine</div>
                    <div className="text-xs text-[#60BA81] font-medium">
                      {isComplete
                        ? "✓ 2,400 Records Validated"
                        : `Processing ${Math.floor((validatedCount / MOCK_EMPLOYEE_DATA.length) * 2400).toLocaleString()}/2,400`}
                    </div>
                  </div>
                </div>

                {!isComplete && showValidation && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <ScanLine size={24} className="text-[#F5A83C]" />
                  </motion.div>
                )}

                {isComplete && (
                  <div className="bg-[#E6F4EA] p-2 rounded-full">
                    <CheckCircle2 size={24} className="text-[#60BA81]" />
                  </div>
                )}
              </div>
            </div>

            {/* Column Headers (Aligned with Checkbox) */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
              <div className="w-6" /> {/* Spacer for Checkbox Column */}
              <div className="flex-1 grid grid-cols-12 gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                <div className="col-span-4 flex items-center gap-1">
                  Employee
                </div>
                <div className="col-span-3 flex items-center gap-1">
                  CNIC
                </div>
                <div className="col-span-3 flex items-center gap-1">
                  Dept
                </div>
                <div className="col-span-2 text-right flex items-center justify-end gap-1">
                  Role
                </div>
              </div>
            </div>

            {/* Validation Content */}
            <div className="p-4 h-80 overflow-hidden relative">
              <ValidationScanner
                active={showValidation}
                employees={MOCK_EMPLOYEE_DATA}
                validatedCount={validatedCount}
              />
            </div>

            <HolographicGlow active={showValidation} color="#60BA81" />
          </Card3D>
        </motion.div>

      </div>

      {/* ===== OVERLAY EFFECTS ===== */}

      {/* API Handshake Animation */}
      <APIHandshakeVisual
        active={showAPIConnection && !showValidation}
        stage={apiStage}
      />

      {/* Upload Progress */}
      <UploadProgressVisual
        active={showUpload}
        progress={uploadProgress}
      />

      {/* Data Flow Particles */}
      <DataParticleStream
        active={showAPIConnection && apiStage === "established"}
        direction="right"
      />

      {/* Success Celebration */}
      <SuccessCelebration active={showCelebration} employeeCount={MOCK_EMPLOYEE_DATA.length} />

    </div>
  )
}