"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    MessageSquare,
    Wifi,
    Battery,
    Signal,
    Smartphone,
    CheckCircle2,
    Lock,
    Globe,
    Bell,
    Users
} from "lucide-react"

// Import original components for the first half
import { IdGenerator } from "./sms-components/IdGenerator.tsx"
import { SecurityScanner } from "./sms-components/SecurityScanner.tsx"

// --- THEME CONSTANTS ---
const COLORS = {
    teal: "#284952",       // Deep Teal
    green: "#60BA81",      // Fresh Green
    orange: "#F5A83C",     // Warm Orange
    white: "#FFFFFF",      // Pure White
    grayLight: "#F5F5F7",
    black: "#17161A",
}

// Apple-style Easing
const EASE_IOS = [0.32, 0.72, 0, 1]

// --- NEW MOBILE COMPONENTS ---

// 1. Mobile Status Bar
const StatusBar = () => (
    <div className="w-full h-6 px-4 flex items-center justify-between text-[10px] font-medium text-gray-800">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
            <Signal size={10} />
            <Wifi size={10} />
            <Battery size={10} />
        </div>
    </div>
)

// 2. SMS Bubble
const SMSBubble = ({
    message,
    isReceived = true,
    delay = 0,
    timestamp
}: {
    message: React.ReactNode,
    isReceived?: boolean,
    delay?: number,
    timestamp?: string
}) => (
    <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay, duration: 0.4, ease: EASE_IOS }}
        className={`max-w-[85%] p-3 rounded-2xl mb-2 relative ${isReceived
            ? "bg-[#E9E9EB] text-black rounded-tl-sm self-start"
            : "bg-[#60BA81] text-white rounded-tr-sm self-end"
            }`}
    >
        <div className="text-[11px] leading-relaxed whitespace-pre-wrap">
            {message}
        </div>
        {timestamp && (
            <span className="text-[9px] opacity-50 absolute bottom-1 right-2">{timestamp}</span>
        )}
    </motion.div>
)

// 3. Activation Badge
const ActivationBadge = ({ isVisible }: { isVisible: boolean }) => (
    <AnimatePresence>
        {isVisible && (
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/30 backdrop-blur-sm"
            >
                <motion.div
                    className="bg-white p-5 rounded-2xl shadow-2xl flex flex-col items-center text-center max-w-[200px]"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                >
                    <div className="w-16 h-16 rounded-full bg-[#E6F4EA] flex items-center justify-center mb-3">
                        <CheckCircle2 size={32} className="text-[#60BA81]" />
                    </div>
                    <h3 className="text-[#284952] font-bold text-lg mb-1">ID Activated</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                        Employee <strong>475002</strong> can now access the Grievance Management System immediately.
                    </p>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
)

// --- MAIN SCENE ---
export const SceneSMS = ({ isActive, progress }: { isActive: boolean, progress: number }) => {

    // TIMELINE (Scene runs from 22s to 58s -> 36s duration)
    // [0-8s] (Abs: 22-30): ID Generation (Older Scene Part)
    // [8-20s] (Abs: 30-42): Security Scanner (Older Scene Part)
    // [20-36s] (Abs: 42-58): New Mobile Phone Visualization 

    const sceneStart = 22
    const localTime = isActive ? Math.max(0, progress - sceneStart) : 0

    // Phase Flags
    const showIdGen = localTime < 8
    const showScanner = localTime >= 8 && localTime < 20
    const showPhoneSequence = localTime >= 20

    // Phone Internal Timing (starts at localTime 20)
    const phoneTime = Math.max(0, localTime - 20)
    const showPhoneIn = phoneTime >= 0
    const showApp = phoneTime >= 3.0 // 45s (22+20+3)
    const showActivation = phoneTime >= 8.0 // 50s (22+20+8)

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#F5F5F7] relative overflow-hidden font-sans select-none p-8">

            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(#284952 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />
                {showPhoneSequence && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 0.1 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="w-[600px] h-[600px] bg-[#60BA81] rounded-full blur-[120px]" />
                    </motion.div>
                )}
            </div>

            <div className="relative z-10 w-full max-w-4xl h-[600px] flex items-center justify-center">
                <AnimatePresence mode="wait">

                    {/* --- PHASE 1: ID GENERATION (Original) --- */}
                    {showIdGen && (
                        <motion.div
                            key="id-gen"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                            transition={{ duration: 0.8 }}
                            className="absolute"
                        >
                            <IdGenerator active={showIdGen} />
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="text-2xl font-bold text-[#284952] mt-8 text-center"
                            >
                                Generating Secure ID
                            </motion.h2>
                        </motion.div>
                    )}

                    {/* --- PHASE 2: SECURITY SCANNER (Original) --- */}
                    {showScanner && (
                        <motion.div
                            key="scanner"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.8 }}
                            className="absolute w-full flex flex-col items-center"
                        >
                            <SecurityScanner active={showScanner} />
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-[#767676] mt-8 font-medium"
                            >
                                Verifying Identity...
                            </motion.p>
                        </motion.div>
                    )}

                    {/* --- PHASE 3: NEW MOBILE PHONE SEQUENCE --- */}
                    {showPhoneSequence && (
                        <motion.div
                            key="mobile-phone"
                            initial={{ y: 400, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: EASE_IOS }}
                            className="relative w-[260px] h-[520px] bg-white rounded-[35px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.2)] border-[8px] border-[#1f1f1f] overflow-hidden"
                        >
                            {/* Dynamic Island / Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[24px] bg-[#1f1f1f] rounded-b-xl z-50 flex justify-center items-center">
                                <div className="w-12 h-1 bg-[#333] rounded-full mt-1" />
                            </div>

                            {/* Screen Content */}
                            <div className="w-full h-full bg-[#f5f5f5] flex flex-col relative">
                                <StatusBar />

                                {/* LOCK SCREEN */}
                                <AnimatePresence>
                                    {!showApp && (
                                        <motion.div
                                            key="lockscreen"
                                            initial={{ opacity: 1 }}
                                            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                                            transition={{ duration: 0.5 }}
                                            className="absolute inset-0 z-20 flex flex-col items-center pt-20 px-6 bg-cover bg-center"
                                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop')" }}
                                        >
                                            <div className="text-white text-6xl font-thin mb-2">09:41</div>
                                            <div className="text-white text-md font-medium opacity-80 mb-12">Monday, 24 November</div>

                                            {/* Notification Banner */}
                                            <motion.div
                                                initial={{ y: -20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.5, type: "spring" }}
                                                className="w-full bg-white/80 backdrop-blur-xl rounded-2xl p-3 shadow-lg flex items-start gap-3 cursor-pointer"
                                            >
                                                <div className="w-10 h-10 bg-[#284952] rounded-xl flex items-center justify-center text-white shrink-0">
                                                    <MessageSquare size={20} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-baseline mb-0.5">
                                                        <span className="text-xs font-bold text-black">FOS Service</span>
                                                        <span className="text-[10px] text-gray-500">now</span>
                                                    </div>
                                                    <p className="text-xs text-gray-800 leading-tight">
                                                        Moaziz MTM Employee, Aap ka FOS ID hai: 475002
                                                    </p>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* SMS APP */}
                                {showApp && (
                                    <motion.div className="flex-1 flex flex-col bg-white">
                                        {/* App Header */}
                                        <div className="h-12 border-b flex items-center px-4 gap-3 bg-white/95 backdrop-blur z-10">
                                            <div className="w-[10px] h-[18px] flex items-center justify-center">
                                                <span className="text-[#007AFF] text-xl">‹</span>
                                            </div>
                                            <div className="flex flex-col items-center flex-1 pr-6">
                                                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mb-0.5">
                                                    <Users size={12} className="text-gray-500" />
                                                </div>
                                                <span className="text-[10px] text-black font-medium">FOS Service</span>
                                            </div>
                                        </div>

                                        {/* Messages Area */}
                                        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1">
                                            <div className="text-[10px] text-gray-400 text-center my-4 font-medium">Today 9:41 AM</div>

                                            <SMSBubble
                                                message={
                                                    <>
                                                        Moaziz MTM Employee, Aap ka FOS ID hai: <span className="font-bold bg-[#F5A83C]/20 px-1 rounded text-[#F5A83C]">475002</span>
                                                        {"\n\n"}
                                                        For any complaint/feedback:
                                                        {"\n"}• Whatsapp: <span className="text-blue-500 underline">0329-9129999</span>
                                                        {"\n"}• Toll-free: <span className="text-blue-500 underline">0800-91299</span>
                                                        {"\n"}• Website: <span className="text-blue-500 underline">www.fruitofsustainability.com</span>
                                                    </>
                                                }
                                                delay={0.2}
                                            />
                                        </div>

                                        {/* Input Area */}
                                        <div className="p-3 border-t bg-gray-50 flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                                                <span className="text-lg">+</span>
                                            </div>
                                            <div className="flex-1 h-8 rounded-full border border-gray-300 bg-white px-3 flex items-center text-xs text-gray-400">
                                                Text Message
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Activation Overlay */}
                                <ActivationBadge isVisible={showActivation} />
                            </div>

                            {/* Phone Reflection */}
                            <div className="absolute inset-0 rounded-[40px] pointer-events-none shadow-[inset_0_0_20px_rgba(255,255,255,0.2)] z-[60]" />
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* Floating Elements (Accessibility) - ONLY during phone phase */}
            {showPhoneSequence && showActivation && (
                <div className="absolute inset-0 pointer-events-none z-20">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.2 }}
                            className="absolute"
                            style={{
                                top: `${30 + i * 20}%`,
                                left: i % 2 === 0 ? "15%" : "75%"
                            }}
                        >
                            <div className="bg-white p-2 rounded-xl shadow-lg flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#60BA81] rounded-full flex items-center justify-center text-white">
                                    {i === 1 ? <Globe size={16} /> : i === 2 ? <Smartphone size={16} /> : <Lock size={16} />}
                                </div>
                                <span className="text-[10px] font-bold text-[#284952]">Connected</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

        </div>
    )
}