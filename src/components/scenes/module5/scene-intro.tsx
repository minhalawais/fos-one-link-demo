"use client"

import { motion } from "framer-motion"
import { BarChart3, TrendingUp, Activity } from "lucide-react"

const IOS_EASE = [0.32, 0.72, 0, 1]

interface SceneIntroProps {
    isActive: boolean
    progress: number
}

export const SceneIntro = ({ isActive, progress }: SceneIntroProps) => {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F5F5F7] overflow-hidden font-sans">

            {/* Dynamic Background Gradient */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vh] h-[150vh] min-w-[800px] bg-gradient-to-tr from-[#F5A83C]/10 via-[#284952]/5 to-transparent rounded-full blur-[100px]"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                    rotate: [0, 90, 0]
                }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center">

                {/* Main Icon Composition */}
                <div className="relative mb-6">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                        className="relative z-20 w-24 h-24 bg-gradient-to-br from-[#17161A] to-[#284952] rounded-2xl shadow-2xl shadow-[#17161A]/30 flex items-center justify-center text-white"
                    >
                        <BarChart3 size={44} strokeWidth={1.5} />

                        {/* Insights Badge */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.6, type: "spring" }}
                            className="absolute -top-2 -right-2 w-8 h-8 bg-[#F5A83C] rounded-full flex items-center justify-center border-4 border-[#F5F5F7] shadow-lg"
                        >
                            <TrendingUp size={13} className="text-white" />
                        </motion.div>

                        {/* Analytics Badge */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.8, type: "spring" }}
                            className="absolute -bottom-2 -left-2 w-8 h-8 bg-[#60BA81] rounded-full flex items-center justify-center border-4 border-[#F5F5F7] shadow-lg"
                        >
                            <Activity size={13} className="text-white" />
                        </motion.div>
                    </motion.div>

                    {/* Ripple Effect */}
                    <motion.div
                        className="absolute inset-0 bg-[#17161A]/10 rounded-2xl blur-xl"
                        animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                </div>

                {/* Typography */}
                <div className="text-center space-y-2">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-[#17161A]/5 text-[#17161A] text-[10px] font-bold uppercase tracking-widest mb-2"
                    >
                        Module 05
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        transition={{ delay: 0.3, duration: 0.8, ease: IOS_EASE }}
                        className="text-3xl md:text-4xl lg:text-4xl font-bold tracking-tight text-[#17161A]"
                    >
                        Dashboards & Risk Insights
                    </motion.h1>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8, ease: IOS_EASE }}
                        className="flex items-center justify-center gap-4 mt-3"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-[#F5A83C]" />
                            <span className="text-base font-medium text-[#767676]">Visible</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-[#60BA81]" />
                            <span className="text-base font-medium text-[#767676]">Interactive</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
