import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, Activity, ShieldCheck } from "lucide-react"

export const APIHandshakeVisual = ({ active, stage }: any) => {
    if (!active) return null

    // Stages: connecting, authenticating, established
    const isConnecting = stage === "connecting"
    const isAuthenticating = stage === "authenticating"
    const isEstablished = stage === "established"

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50 bg-white/30 backdrop-blur-sm transition-all duration-500">
            <div className="relative w-[800px] h-[400px] flex items-center justify-center">

                {/* Connection Line SVG */}
                <svg className="absolute inset-0 w-full h-full overflow-visible">
                    <defs>
                        <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#284952" />
                            <stop offset="50%" stopColor="#60BA81" />
                            <stop offset="100%" stopColor="#284952" />
                        </linearGradient>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Background Path (faint) */}
                    <path
                        d="M 150 200 Q 400 100 650 200"
                        stroke="#E5E7EB"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray="8,8"
                        className="opacity-50"
                    />

                    {/* Animated Active Path */}
                    <motion.path
                        d="M 150 200 Q 400 100 650 200"
                        stroke="url(#gradientLine)"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray="8 8"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: isEstablished ? 1 : isAuthenticating ? 0.8 : 0.2,
                            opacity: 1,
                            strokeDashoffset: isAuthenticating ? -100 : 0
                        }}
                        transition={{
                            pathLength: { duration: 1.5, ease: "easeOut" },
                            strokeDashoffset: { duration: 1, repeat: Infinity, ease: "linear" }
                        }}
                        filter="url(#glow)"
                    />

                    {/* Data Packets */}
                    {isAuthenticating && (
                        <>
                            {[0, 0.5, 1, 1.5].map((delay) => (
                                <motion.circle
                                    key={delay}
                                    r="6"
                                    fill="#60BA81"
                                    filter="url(#glow)"
                                    initial={{ offsetDistance: "0%", opacity: 0 }}
                                    animate={{
                                        offsetDistance: "100%",
                                        opacity: [0, 1, 1, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay,
                                        ease: "easeInOut"
                                    }}
                                    style={{
                                        offsetPath: "path('M 150 200 Q 400 100 650 200')"
                                    } as any}
                                />
                            ))}
                        </>
                    )}
                </svg>

                {/* Left System (HRMS) - Centered at x=150, y=200 */}
                <motion.div
                    className="absolute"
                    style={{ left: 100, top: 150 }} // 150 - (100/2) = 100 left
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                >
                    <div className="relative flex flex-col items-center gap-4">
                        <motion.div
                            className={`
                w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-xl border-4 
                ${isEstablished ? 'border-[#60BA81]' : 'border-gray-100'}
              `}
                            animate={isAuthenticating ? {
                                scale: [1, 1.05, 1],
                                boxShadow: "0 20px 40px -10px rgba(96, 186, 129, 0.3)"
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <img
                                src="/assets/images/company_a.png"
                                alt="HRMS"
                                className="w-14 h-14 object-contain"
                            />
                        </motion.div>
                        <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow-sm border border-gray-100 text-xs font-bold text-[#284952]">
                            HRMS System
                        </div>
                        {/* Connection Status Dot */}
                        <div className={`absolute -right-2 top-10 w-4 h-4 rounded-full border-2 border-white ${isEstablished ? 'bg-[#60BA81]' : 'bg-gray-300'}`} />
                    </div>
                </motion.div>

                {/* Center Status Icon */}
                <div className="absolute left-1/2 top-[100px] -translate-x-1/2 -translate-y-1/2">
                    <AnimatePresence mode="wait">
                        {isAuthenticating && (
                            <motion.div
                                key="loading"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="bg-white p-2 rounded-full shadow-lg border border-[#60BA81]"
                            >
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                                    <Activity size={20} className="text-[#60BA81]" />
                                </motion.div>
                            </motion.div>
                        )}
                        {isEstablished && (
                            <motion.div
                                key="success"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="bg-[#60BA81] p-2 rounded-full shadow-lg shadow-[#60BA81]/30"
                            >
                                <Lock size={20} className="text-white" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right System (FOS) - Centered at x=650, y=200 */}
                <motion.div
                    className="absolute"
                    style={{ left: 600, top: 150 }} // 650 - (100/2) = 600 left
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                >
                    <div className="relative flex flex-col items-center gap-4">
                        {/* Connection Status Dot */}
                        <div className={`absolute -left-2 top-10 w-4 h-4 rounded-full border-2 border-white ${isEstablished ? 'bg-[#60BA81]' : 'bg-gray-300'}`} />

                        <motion.div
                            className={`
                w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-xl border-4 
                ${isEstablished ? 'border-[#60BA81]' : 'border-gray-100'}
              `}
                            animate={isAuthenticating ? {
                                scale: [1, 1.05, 1],
                                boxShadow: "0 20px 40px -10px rgba(96, 186, 129, 0.3)"
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                        >
                            <img
                                src="/assets/images/FOS-01.png"
                                alt="FOS"
                                className="w-14 h-14 object-contain"
                            />
                        </motion.div>
                        <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow-sm border border-gray-100 text-xs font-bold text-[#284952]">
                            FOS Platform
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Status Badge (Bottom) */}
            <AnimatePresence>
                {isEstablished && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-[40%] bg-[#E6F4EA] border border-[#60BA81]/20 px-6 py-3 rounded-full flex items-center gap-2 shadow-sm"
                    >
                        <ShieldCheck size={18} className="text-[#60BA81]" />
                        <span className="text-sm font-bold text-[#284952]">Secure Handshake Verified</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
