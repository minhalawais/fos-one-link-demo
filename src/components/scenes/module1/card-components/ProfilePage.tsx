"use client"

import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, Apple, Play, MessageSquare } from "lucide-react"

// --- CSS CONSTANTS & STYLES ---
const STYLES = {
    root: {
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#f8f9fc",
        color: "#284952",
        lineHeight: 1.6,
    },
    vars: {
        primary: "#60BA81",
        secondary: "#284952",
        accent: "#f5a83c",
        lightPrimary: "rgba(96, 186, 129, 0.1)",
        lightSecondary: "rgba(40, 73, 82, 0.1)",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
    }
}

export const ProfilePage = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Auto-scroll effect
    useEffect(() => {
        const container = scrollContainerRef.current
        if (!container) return

        let animationFrameId: number
        const startScroll = () => {
            // Wait a bit before scrolling
            setTimeout(() => {
                const scroll = () => {
                    if (!container) return
                    if (container.scrollTop < (container.scrollHeight - container.clientHeight)) {
                        container.scrollTop += 3 // Scroll speed
                        animationFrameId = requestAnimationFrame(scroll)
                    }
                }
                animationFrameId = requestAnimationFrame(scroll)
            }, 2000)
        }

        startScroll()

        return () => cancelAnimationFrame(animationFrameId)
    }, [])

    return (
        <motion.div
            className="w-full h-full bg-[#f8f9fc] relative flex flex-col overflow-hidden font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={STYLES.root}
        >
            {/* --- NAVBAR --- */}
            <nav className="w-full bg-white py-3 px-4 shadow-[0_4px_15px_rgba(0,0,0,0.03)] border-b-[3px] border-[#60BA81] flex-shrink-0 z-20">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        {/* Logo Replica */}
                        <div className="flex flex-col items-center leading-none">
                            <span className="text-[10px] uppercase font-bold text-[#60BA81]">Fruit of</span>
                            <span className="text-[10px] uppercase font-bold text-[#284952]">Sustainability</span>
                        </div>
                    </div>
                    <div className="text-[#284952] opacity-50">
                        <div className="w-6 h-0.5 bg-current mb-1 rounded-full"></div>
                        <div className="w-6 h-0.5 bg-current mb-1 rounded-full"></div>
                        <div className="w-6 h-0.5 bg-current rounded-full"></div>
                    </div>
                </div>
            </nav>

            {/* --- SCROLLABLE CONTENT AREA --- */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto custom-scrollbar relative px-4 py-6">
                <div className="max-w-4xl mx-auto space-y-8 pb-10">

                    {/* --- PAGE HEADER --- */}
                    <div
                        className="text-center py-6 px-4 rounded-xl border-b-4 border-[#60BA81] relative"
                        style={{ background: "linear-gradient(135deg, rgba(96, 186, 129, 0.1) 0%, rgba(40, 73, 82, 0.1) 100%)" }}
                    >
                        <h1 className="text-2xl font-bold text-[#284952] mb-2 relative inline-block">
                            Employee Profile
                            <div className="absolute -bottom-2.5 left-[25%] w-1/2 h-1 bg-[#f5a83c] rounded-full"></div>
                        </h1>
                        <p className="text-[#284952] text-sm mt-4">View employee details and information</p>
                    </div>

                    {/* --- EMPLOYEE DATA SECTION --- */}
                    <div
                        className="bg-white p-6 rounded-xl border-l-[5px] border-l-[#60BA81] border-b-2 border-b-[#f5a83c] shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
                    >
                        {/* Decorative BG */}
                        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-[#60BA81]/10 to-[#284952]/10 rounded-bl-full z-0 opacity-50" />

                        <h2 className="text-xl font-semibold text-[#284952] mb-6 pb-4 border-b-2 border-[#eaecf4] relative z-10 w-full">
                            Sana
                            <div className="absolute -bottom-0.5 left-0 w-20 h-0.5 bg-[#60BA81]"></div>
                        </h2>

                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 relative z-10">
                            <InfoItem label="FOS ID" value="475002" />
                            <InfoItem label="Gender" value="Female" />
                            <InfoItem label="Company" value="ILO" />
                            <InfoItem label="Designation" value="IT Manager" />
                            <div className="col-span-2">
                                <InfoItem label="Department" value="IT" />
                            </div>
                        </div>

                        {/* Video Section embedded in card as per HTML */}
                        <div className="mt-8 relative z-10">
                            <div className="flex items-center gap-2 mb-4 text-[#284952] font-medium text-lg">
                                <Play className="text-[#f5a83c] fill-current" size={24} />
                                <h3>FOS Introductory Video</h3>
                            </div>
                            <div className="bg-black rounded-lg overflow-hidden border-[3px] border-[#284952]/10 shadow-lg aspect-video relative">
                                <div className="absolute inset-0 bg-white flex flex-col items-center justify-center">
                                    {/* Video Thumbnail Placeholder */}
                                    <div className="text-center">
                                        <h4 className="text-2xl font-bold text-[#284952]">FRUIT OF <span className="text-[#60BA81]">SUSTAINABILITY</span></h4>
                                        <div className="bg-[#284952] text-white text-[10px] px-2 py-0.5 rounded mt-2 inline-block">YOUR PARTNER IN GRIEVANCE MANAGEMENT</div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                                            <Play className="text-[#284952] ml-1 fill-current" size={32} />
                                        </div>
                                    </div>
                                </div>
                                {/* Controls Bar Simulation */}
                                <div className="absolute bottom-0 w-full h-8 bg-black/60 flex items-center px-4 justify-between">
                                    <span className="text-white text-xs">0:00 / 1:44</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- CONTACT APP SECTION --- */}
                    <div
                        className="rounded-xl p-6 text-white relative overflow-hidden shadow-lg"
                        style={{ background: "linear-gradient(135deg, #284952 0%, #1d3640 100%)" }}
                    >
                        {/* Circles */}
                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full" />
                        <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-white/5 rounded-full" />

                        <div className="grid md:grid-cols-2 gap-8 relative z-10">
                            {/* Left: Download */}
                            <div>
                                <h2 className="text-xl font-bold mb-4 relative inline-block">
                                    Download Our Mobile App
                                    <div className="absolute -bottom-2 left-0 w-3/5 h-[3px] bg-[#f5a83c] rounded-full"></div>
                                </h2>
                                <p className="text-white/90 text-sm mb-6">Get the FOS Employee Portal app for easy access to your profile on the go.</p>

                                <div className="flex flex-wrap gap-3">
                                    <StoreButton type="apple" />
                                    <StoreButton type="google" />
                                </div>
                            </div>

                            {/* Right: Contact */}
                            <div>
                                <div className="relative z-10">
                                    <h3 className="text-lg font-semibold mb-2">Contact FOS Hotline</h3>
                                    <p className="text-right text-sm opacity-90 font-serif mb-6" style={{ fontFamily: "'Noto Nastaliq Urdu', serif" }}>
                                        کسی بھی شکایت یا سوال کے لیے رابطہ کریں
                                    </p>

                                    <div className="space-y-3">
                                        <ContactRow icon={Phone} label="Call Us" value="0800 91299" />
                                        <ContactRow icon={MessageSquare} label="WhatsApp" value="+92 329 9129999" />
                                        <ContactRow icon={Mail} label="Email" value="support@fruitofsustainability.com" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* --- FOOTER CONTENT (Inside scroll to be visible) --- */}
                <footer className="text-center pt-8 pb-4 relative">
                    <div className="absolute top-0 left-0 right-0 h-[5px] bg-gradient-to-r from-[#60BA81] to-[#f5a83c]"></div>
                    <div className="flex justify-center gap-4 mb-6 pt-4">
                        <SocialIcon />
                        <SocialIcon />
                        <SocialIcon />
                    </div>
                    <p className="text-xs text-gray-400">© 2023 FOS Employee Portal. All rights reserved.</p>
                </footer>
            </div>
        </motion.div>
    )
}

// --- SUB COMPONENTS ---

const InfoItem = ({ label, value }: { label: string, value: string }) => (
    <div className="w-full mb-2">
        <span className="block text-xs font-bold text-[#284952] uppercase mb-1 tracking-wide">{label}</span>
        <span className="block text-sm text-[#5a6670] px-4 py-2 bg-[rgba(96,186,129,0.1)] rounded-lg shadow-inner border-l-[3px] border-[#60BA81]">
            {value}
        </span>
    </div>
)

const StoreButton = ({ type }: { type: 'apple' | 'google' }) => (
    <div className="flex items-center gap-3 bg-[#60BA81] text-white px-5 py-3 rounded-full shadow-md hover:scale-105 transition-transform cursor-pointer min-w-[140px] justify-center">
        {type === 'apple' ? <Apple size={24} fill="white" /> : <Play size={24} fill="white" />}
        <div className="leading-tight text-left">
            <div className="text-[9px] opacity-90">{type === 'apple' ? 'Download on the' : 'Get it on'}</div>
            <div className="text-xs font-bold">{type === 'apple' ? 'App Store' : 'Google Play'}</div>
        </div>
    </div>
)

const ContactRow = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex items-center gap-4 bg-white/10 p-3 rounded-xl border border-white/10 hover:bg-white/15 transition-colors cursor-pointer backdrop-blur-sm">
        <Icon size={20} className="text-[#f5a83c]" />
        <div>
            <div className="text-[10px] opacity-80">{label}</div>
            <div className="text-sm font-medium">{value}</div>
        </div>
    </div>
)

const SocialIcon = () => (
    <div className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center text-[#284952] hover:bg-[#60BA81] hover:text-white transition-colors cursor-pointer">
        <div className="w-4 h-4 bg-current rounded-sm" />
    </div>
)
