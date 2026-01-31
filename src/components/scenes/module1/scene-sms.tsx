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
    Users,
    ChevronRight
} from "lucide-react"

// Import original components for the first half
import { IdGenerator } from "./sms-components/IdGenerator.tsx"
import { SecurityScanner } from "./sms-components/SecurityScanner.tsx"
import { MOCK_EMPLOYEE_DATA } from "./upload-constants.ts"

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

// Deterministic FOS ID generator
const getFosId = (employee: any) => {
    if (!employee) return "000000";
    const cnicDigits = employee.cnic.replace(/\D/g, '');
    const last3 = cnicDigits.slice(-3);
    // Deterministic 3-digit prefix based on employee.id
    const charSum = employee.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    const prefix = (charSum % 899) + 100;
    return `${prefix}${last3}`;
}

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

// 4. Signal Stream Particle
const SignalParticle = ({ delay }: { delay: number }) => (
    <motion.div
        initial={{ x: 0, opacity: 0, scale: 0 }}
        animate={{
            x: [0, 150, 300],
            y: [0, -40, 0],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5],
            rotate: [0, 5, -5, 0]
        }}
        transition={{
            duration: 2.5,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-lg shadow-lg flex items-center justify-center border border-[#60BA81]/30 z-20"
    >
        <MessageSquare size={12} className="text-[#60BA81]" />
    </motion.div>
)

// 5. Robot Character Component
const CharacterRobot = ({ isSending }: { isSending: boolean }) => (
    <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        className="relative flex flex-col items-center scale-150 lg:scale-[1.8]"
    >
        {/* Floating Animation */}
        <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
        >
            <img
                src="/assets/images/fos_sms.png"
                alt="FOS Robot"
                className="w-[700px] h-[700px] object-contain drop-shadow-2xl"
            />{/* Antenna Glow */}
            <AnimatePresence>
                {isSending && (
                    <>
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute top-8 left-[25%] w-8 h-8 bg-[#60BA81] rounded-full blur-2xl"
                        />
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                            className="absolute top-8 right-[25%] w-8 h-8 bg-[#60BA81] rounded-full blur-2xl"
                        />
                    </>
                )}
            </AnimatePresence>
        </motion.div>

        {/* Shadow */}
        <motion.div
            animate={{ scale: [1, 0.8, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-48 h-5 bg-black/20 blur-2xl rounded-full mt-4"
        />
    </motion.div>
)
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

    // NEW LOGIC: Use first 3 employees for both phases to keep it focused
    const DISPLAY_EMPLOYEES = MOCK_EMPLOYEE_DATA.slice(0, 3);

    // ID Generation Logic (Phase 1: 0-8s)
    const employeeIndexIdGen = Math.max(0, Math.min(2, Math.floor(localTime / 2.6)));
    const currentEmployeeIdGen = DISPLAY_EMPLOYEES[employeeIndexIdGen];
    const currentFosIdIdGen = getFosId(currentEmployeeIdGen);

    // Security Scanner Logic (Phase 2: 8-20s)
    const scannerTime = localTime - 8;
    const employeeIndexScanner = Math.max(0, Math.min(2, Math.floor(scannerTime / 4)));
    const currentEmployeeScanner = DISPLAY_EMPLOYEES[employeeIndexScanner];
    const currentFosIdScanner = getFosId(currentEmployeeScanner);

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

            <div className="relative z-10 w-full max-w-7xl h-[800px] flex items-center justify-center">
                <AnimatePresence mode="wait">

                    {/* --- PHASE 1: ID GENERATION (Refined) --- */}
                    {showIdGen && (
                        <motion.div
                            key="id-gen-container"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                            transition={{ duration: 0.8 }}
                            className="absolute"
                        >
                            <IdGenerator
                                active={showIdGen}
                                employee={currentEmployeeIdGen}
                                fosId={currentFosIdIdGen}
                            />

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="text-2xl font-bold text-[#284952] mt-8 text-center"
                            >
                                Generating FOS ID
                            </motion.h2>
                        </motion.div>
                    )}

                    {/* --- PHASE 2: SECURITY SCANNER (Refined) --- */}
                    {showScanner && (
                        <motion.div
                            key={`scanner-${employeeIndexScanner}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                            className="absolute w-full flex flex-col items-center"
                        >
                            <SecurityScanner
                                active={showScanner}
                                employee={currentEmployeeScanner}
                                fosId={currentFosIdScanner}
                            />
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

                    {/* --- PHASE 3: NEW MOBILE PHONE SEQUENCE (Refined with Character) --- */}
                    {showPhoneSequence && (
                        <motion.div
                            key="phase3-container"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full flex items-center justify-between px-0 lg:px-4"
                        >
                            {/* Left: Robot (Expanded) */}
                            <div className="flex-1 flex justify-center items-center -ml-20">
                                <CharacterRobot isSending={phoneTime < 8} />
                            </div>

                            {/* Center: Signal Visualization (Static Width) */}
                            <div className="w-1/6 relative h-64 hidden lg:block">
                                <AnimatePresence>
                                    {phoneTime < 8 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0"
                                        >
                                            {[0, 0.5, 1, 1.5, 2].map((d) => (
                                                <SignalParticle key={d} delay={d} />
                                            ))}

                                            {/* Data Beam Flow */}
                                            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                                <motion.path
                                                    d="M 50,128 Q 150,88 300,128"
                                                    fill="none"
                                                    stroke="url(#beamGradient)"
                                                    strokeWidth="4"
                                                    strokeDasharray="10 10"
                                                    initial={{ strokeDashoffset: 100 }}
                                                    animate={{ strokeDashoffset: 0 }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                />
                                                <defs>
                                                    <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                        <stop offset="0%" stopColor="#60BA81" stopOpacity="0" />
                                                        <stop offset="50%" stopColor="#60BA81" stopOpacity="0.5" />
                                                        <stop offset="100%" stopColor="#60BA81" stopOpacity="0" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Right: Phone (Standard) */}
                            <div className="flex-1 flex justify-center items-center">
                                <motion.div
                                    initial={{ y: 100, opacity: 0, rotate: 5 }}
                                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                                    transition={{ duration: 1, ease: EASE_IOS }}
                                    className="relative w-[260px] h-[520px] bg-white rounded-[35px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-[8px] border-[#1f1f1f] overflow-hidden"
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
                                                    <div className="text-white text-6xl font-thin mb-2 tracking-tighter">09:41</div>
                                                    <div className="text-white text-md font-medium opacity-80 mb-12">Monday, 24 Nov</div>

                                                    {/* Notification Banner */}
                                                    <motion.div
                                                        initial={{ y: 20, opacity: 0, scale: 0.9 }}
                                                        animate={{ y: 0, opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                                                        className="w-full bg-white/90 backdrop-blur-2xl rounded-2xl p-4 shadow-2xl flex items-start gap-3 cursor-pointer border border-white/20"
                                                    >
                                                        <div className="w-10 h-10 bg-[#284952] rounded-xl flex items-center justify-center text-white shrink-0 shadow-inner">
                                                            <MessageSquare size={20} />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex justify-between items-baseline mb-0.5">
                                                                <span className="text-[10px] font-bold text-black uppercase tracking-wider">FOS Notification</span>
                                                                <span className="text-[9px] text-gray-500">now</span>
                                                            </div>
                                                            <p className="text-[11px] text-gray-800 leading-tight font-medium">
                                                                Moaziz MTM Employee, Aap ka FOS ID hai: <span className="text-[#60BA81] font-bold">475002</span>
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* SMS APP */}
                                        {showApp && (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col bg-white">
                                                {/* App Header */}
                                                <div className="h-12 border-b flex items-center px-4 gap-3 bg-white/95 backdrop-blur z-10 shadow-sm">
                                                    <div className="w-5 h-5 flex items-center justify-center">
                                                        <span className="text-[#007AFF] text-2xl leading-none">‹</span>
                                                    </div>
                                                    <div className="flex flex-col items-center flex-1 pr-6">
                                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#60BA81] to-[#284952] flex items-center justify-center mb-0.5 shadow-sm">
                                                            <Users size={12} className="text-white" />
                                                        </div>
                                                        <span className="text-[9px] text-black font-bold uppercase tracking-tighter">FOS Hotline</span>
                                                    </div>
                                                </div>

                                                {/* Messages Area */}
                                                <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1 bg-[#F2F2F7]">
                                                    <div className="text-[9px] text-gray-400 text-center my-4 font-bold uppercase tracking-widest">Today 9:41 AM</div>

                                                    <SMSBubble
                                                        message={
                                                            <>
                                                                Moaziz MTM Employee, Aap ka FOS ID hai: <span className="font-bold text-[#60BA81] bg-[#60BA81]/10 px-1 rounded">475002</span>
                                                                {"\n\n"}
                                                                For any complaint/feedback:
                                                                {"\n"}<span className="text-[#284952] font-semibold">Whatsapp:</span> <span className="text-[#007AFF]">0329-9129999</span>
                                                                {"\n"}<span className="text-[#284952] font-semibold">Toll-free:</span> <span className="text-[#007AFF]">0800-91299</span>
                                                                {"\n"}<span className="text-[#284952] font-semibold">Portal:</span> <span className="text-[#007AFF] underline">fruitofsustainability.com</span>
                                                            </>
                                                        }
                                                        delay={0.2}
                                                    />

                                                    {/* Register Complaint Button */}
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 1.5 }}
                                                        className="flex"
                                                    >
                                                        <div
                                                            className="text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 cursor-pointer animate-pulse"
                                                            style={{ backgroundColor: COLORS.green }}
                                                        >
                                                            Register a new complaint <ChevronRight size={12} />
                                                        </div>
                                                    </motion.div>
                                                </div>

                                                {/* Input Area */}
                                                <div className="p-3 border-t bg-gray-50 flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-light text-xl">
                                                        +
                                                    </div>
                                                    <div className="flex-1 h-8 rounded-full border border-gray-300 bg-white px-3 flex items-center text-[11px] text-gray-400">
                                                        iMessage
                                                    </div>
                                                    <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">
                                                        <div className="w-3 h-3 bg-white rounded-full shadow-inner" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Activation Overlay */}
                                        <ActivationBadge isVisible={showActivation} />
                                    </div>

                                    {/* Phone Reflection Effect */}
                                    <div className="absolute inset-0 rounded-[35px] pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/10 z-[60]" />
                                </motion.div>
                            </div>
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