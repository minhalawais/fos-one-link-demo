import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, CheckCircle2 } from "lucide-react"

export const IntroText = ({ showIntroText }: any) => {
    if (!showIntroText) return null

    return (
        <AnimatePresence>
            <motion.div
                key="intro-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-md"
            >
                <div className="relative">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white/90 border border-gray-200 shadow-2xl rounded-2xl p-8 max-w-lg text-center"
                    >
                        {/* Company Logo in modern container */}
                        <div className="flex justify-center mb-6">
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                className="relative w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-gray-100 p-4"
                            >
                                <img
                                    src="/assets/images/company_a.png"
                                    alt="Company A"
                                    className="w-full h-full object-contain"
                                />

                                {/* Tech Verify Badge */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#60BA81] rounded-full flex items-center justify-center border-2 border-white shadow-md"
                                >
                                    <Terminal size={14} className="text-white" />
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Main Text */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mb-2"
                        >
                            <h2 className="text-2xl font-bold text-[#284952] font-mono tracking-tight">
                                Company A Onboarding
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex items-center justify-center gap-2 text-[#60BA81] font-mono text-sm font-medium mb-6"
                        >
                            <span>Process Initiating</span>
                            <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.4, repeat: Infinity }}
                                className="inline-block w-2 h-4 bg-[#60BA81]"
                            />
                        </motion.div>

                        {/* Progress Bar */}
                        <div className="h-1.5 w-64 bg-gray-100 rounded-full overflow-hidden mx-auto">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[#60BA81] to-[#284952]"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                            />
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.8 }}
                            className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400 font-mono"
                        >
                            <CheckCircle2 size={12} className="text-[#60BA81]" />
                            <span>System Ready</span>
                        </motion.div>
                    </motion.div>

                    {/* Background Decorative Rings */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[500px] h-[500px] border border-[#60BA81]/10 rounded-full"
                        animate={{ scale: [0.8, 1.2], opacity: [0.5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[300px] h-[300px] border border-[#284952]/10 rounded-full"
                        animate={{ scale: [0.8, 1.1], opacity: [0.3, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    />

                </div>
            </motion.div>
        </AnimatePresence>
    )
}
