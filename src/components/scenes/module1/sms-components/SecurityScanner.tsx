"use client"

import { motion } from "framer-motion"
import { ScanLine, Check, Lock, Fingerprint } from "lucide-react"

export const SecurityScanner = ({ active, employee, fosId }: { active: boolean, employee: any, fosId: string }) => {
    if (!employee) return null;

    // Extract CNIC digits for highlighting - using last 4 chars because of the dash (e.g., "10-1")
    const cnicTail = employee.cnic.slice(-4);
    const fosIdTail = fosId.slice(-3);
    return (
        <div className="relative w-full max-w-lg h-40 flex items-center justify-between px-8">

            {/* Left Node: FOS ID */}
            <motion.div
                className="w-28 h-24 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col items-center justify-center relative z-10 overflow-hidden"
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: active ? 0 : 30, opacity: active ? 1 : 0 }}
            >
                <span className="text-[10px] text-gray-400 font-bold mb-1">FOS ID</span>
                <span className="text-xl font-bold text-[#284952]">
                    {fosId.slice(0, 3)}
                    <span className="text-[#60BA81] border-b-2 border-[#60BA81]/30">{fosIdTail}</span>
                </span>
                {/* Match Pulse */}
                <motion.div
                    className="absolute inset-0 bg-[#60BA81]/5"
                    animate={{ opacity: [0, 0.2, 0] }}
                    transition={{ delay: 1.5, duration: 1, repeat: Infinity }}
                />
            </motion.div>

            {/* Center Link: Scanner */}
            <div className="flex-1 relative h-full flex items-center justify-center mx-4">
                <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-[#60BA81]"
                        initial={{ width: "0%" }}
                        animate={{ width: active ? "100%" : "0%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                    />
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md border border-gray-100 z-20">
                    <motion.div
                        animate={{ rotate: active ? 360 : 0 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                        <ScanLine size={20} className="text-[#F5A83C]" />
                    </motion.div>
                </div>

                {/* Biometric Match Popup */}
                {active && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1.5, type: 'spring' }}
                        className="absolute top-4 bg-[#284952] text-white px-3 py-1 rounded-full text-[10px] flex items-center gap-1.5 shadow-xl z-30"
                    >
                        <Fingerprint size={10} className="text-[#60BA81]" />
                        <span>Identity Mapping</span>
                    </motion.div>
                )}
            </div>

            {/* Right Node: CNIC */}
            <motion.div
                className="w-28 h-24 bg-[#E6F4EA] rounded-xl shadow-lg border border-[#60BA81]/20 flex flex-col items-center justify-center relative z-10 overflow-hidden"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: active ? 0 : -30, opacity: active ? 1 : 0 }}
            >
                <div className="absolute top-2 right-2">
                    <Lock size={10} className="text-[#60BA81]" />
                </div>
                <span className="text-[10px] text-[#60BA81] font-bold mb-1">REGISTERED CNIC</span>
                <span className="text-[10px] font-mono font-bold text-[#284952] tracking-tight">
                    {employee.cnic.slice(0, -4)}
                    <span className="text-white bg-[#60BA81] px-0.5 rounded ml-0.5">{cnicTail}</span>
                </span>
                <div className="flex gap-1 mt-2">
                    <div className="w-1.5 h-1.5 bg-[#60BA81] rounded-full" />
                    <div className="w-1.5 h-1.5 bg-[#60BA81] rounded-full" />
                    <div className="w-1.5 h-1.5 bg-[#60BA81]/30 rounded-full" />
                </div>
            </motion.div>

        </div>
    )
}
