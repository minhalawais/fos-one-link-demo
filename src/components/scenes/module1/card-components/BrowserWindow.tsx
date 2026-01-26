"use client"

import React from "react"
import { motion } from "framer-motion"
import { ShieldCheck, Lock, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react"

export const BrowserWindow = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-full flex flex-col bg-white rounded-lg overflow-hidden shadow-2xl border border-gray-200 font-sans">
            {/* --- BROWSER HEADER --- */}
            <div className="h-10 bg-[#f0f2f5] flex items-center px-4 gap-4 border-b border-gray-300">

                {/* Window Controls */}
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e] border border-[#d89e24]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] border border-[#1aab29]" />
                </div>

                {/* Navigation Controls */}
                <div className="flex gap-2 text-gray-400">
                    <ChevronLeft size={16} />
                    <ChevronRight size={16} />
                    <RefreshCw size={14} className="mt-0.5" />
                </div>

                {/* Address Bar */}
                <div className="flex-1 h-7 bg-white rounded-md border border-gray-200 flex items-center px-3 gap-2 text-xs text-gray-600 shadow-sm">
                    <Lock size={10} className="text-[#60BA81]" />
                    <span className="text-gray-400">https://</span>
                    <span className="text-[#284952] font-medium">portal.fos.com/employee/profile/475002</span>
                </div>

            </div>

            {/* --- CONTENT AREA --- */}
            <div className="flex-1 relative overflow-hidden">
                {children}
            </div>
        </div>
    )
}
