"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"

/* ─── Brand Palette ─── */
const C = {
    teal: "#284952",
    green: "#60BA81",
    greenLight: "#8CD4A4",
    orange: "#F5A83C",
    orangeLight: "#FBC97D",
    bg1: "#FAF9F7",
    bg2: "#F7F6F4",
    bg3: "#F3F1EE",
}

/* ─── Timing (seconds) ─── */
const T = {
    portalStart: 0.1,   // circular reveal begins almost immediately
    shimmerStart: 1.3,   // shimmer sweeps across logo
    textStart: 1.7,   // heading clips in
    taglineStart: 2.3,   // tagline types in
    holdUntil: 3.6,   // split exit begins
    splitDur: 0.9,
}

/* Smooth easing */
const EXPO_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number]

/* ─── Converging Dots ─── */
const CONVERGE_DOTS = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2
    const distance = 500 + Math.random() * 300
    return {
        id: i,
        startX: Math.cos(angle) * distance,
        startY: Math.sin(angle) * distance,
        size: 4 + Math.random() * 6,
        color: [C.green, C.orange, C.teal, C.greenLight, C.orangeLight][i % 5],
        delay: i * 0.05,
    }
})

/* ─── Pulse Rings ─── */
const PULSE_RINGS = [
    { delay: 0, size: 180 },
    { delay: 0.3, size: 260 },
    { delay: 0.6, size: 340 },
    { delay: 0.9, size: 420 },
]

/* ─── Floating Particles ─── */
const FLOAT_PARTICLES = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    size: 2 + Math.random() * 3,
    delay: 1 + Math.random() * 2,
    duration: 6 + Math.random() * 4,
    color: [C.green, C.greenLight, C.orange, C.orangeLight][i % 4],
    drift: (Math.random() - 0.5) * 30,
}))

/* ═══════════════════════════════════════
   SPLASH SCREEN
   ═══════════════════════════════════════ */
interface SplashScreenProps {
    onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
    const [phase, setPhase] = useState(0)
    // 0 = dark/line, 1 = portal opening, 2 = shimmer, 3 = text, 4 = exit
    const [exiting, setExiting] = useState(false)

    // Memoize the clip-path value so it doesn't cause re-renders
    const portalClip = useMemo(() => {
        if (phase >= 1) return "circle(100% at 50% 50%)"
        return "circle(0% at 50% 50%)"
    }, [phase >= 1])

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), T.portalStart * 1000),
            setTimeout(() => setPhase(2), T.shimmerStart * 1000),
            setTimeout(() => setPhase(3), T.textStart * 1000),
            setTimeout(() => { setPhase(4); setExiting(true) }, T.holdUntil * 1000),
            setTimeout(() => onComplete(), (T.holdUntil + T.splitDur + 0.15) * 1000),
        ]
        return () => timers.forEach(clearTimeout)
    }, [onComplete])

    const headingWords = ["Fruit", "of", "Sustainability"]
    const tagline = "Your partner in Grievance Management"

    return (
        <div className="fixed inset-0 z-[9999]">

            {/* ═══ LAYER 1: Main content (fades on exit) ═══ */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${C.bg1} 0%, ${C.bg2} 50%, ${C.bg3} 100%)`,
                }}
                animate={exiting ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
            >

                {/* ──── Animated gradient mesh background ──── */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* Mesh blob 1 — teal, top-left, drifting */}
                    <div
                        className="absolute w-[70vw] h-[70vw] rounded-full splash-mesh-drift-1"
                        style={{
                            background: `radial-gradient(circle, rgba(40,73,82,0.07) 0%, transparent 65%)`,
                            top: "-30%", left: "-25%",
                            filter: "blur(60px)",
                        }}
                    />
                    {/* Mesh blob 2 — green, center-right, drifting */}
                    <div
                        className="absolute w-[55vw] h-[55vw] rounded-full splash-mesh-drift-2"
                        style={{
                            background: `radial-gradient(circle, rgba(96,186,129,0.08) 0%, transparent 65%)`,
                            top: "10%", right: "-15%",
                            filter: "blur(70px)",
                        }}
                    />
                    {/* Mesh blob 3 — orange, bottom, drifting */}
                    <div
                        className="absolute w-[50vw] h-[50vw] rounded-full splash-mesh-drift-3"
                        style={{
                            background: `radial-gradient(circle, rgba(245,168,60,0.06) 0%, transparent 65%)`,
                            bottom: "-20%", left: "15%",
                            filter: "blur(60px)",
                        }}
                    />
                </div>

                {/* ──── Subtle noise grain overlay ──── */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAA6t662AAAABlBMVEUAAAD///+l2Z/dAAAAb0lEQVR42mP4RwAwYAAKAAQAAGAAQAAGAAQAAGAAQAAGAAQAAGAAQAAGAAQAAGAAQAAGAAQAAGAAQAAGAAQAAGAAQAAGAAQAAGAAQAAGAAQAAGAAQAAGAAQAAGAAQAAGAAQAAGAAQAAGAAQAAGAAQAAEIAAGlOqWkAAAAASUVORK5CYII=")`,
                        backgroundSize: "64px 64px",
                    }}
                />



                {/* ──── Converging dots: fly from edges to center ──── */}
                {phase < 2 && CONVERGE_DOTS.map((dot) => (
                    <motion.div
                        key={dot.id}
                        className="absolute rounded-full z-20"
                        style={{
                            width: dot.size,
                            height: dot.size,
                            background: dot.color,
                            boxShadow: `0 0 ${dot.size * 2}px ${dot.color}aa`,
                            top: "50%", left: "50%",
                            willChange: "transform, opacity"
                        }}
                        initial={{
                            x: dot.startX,
                            y: dot.startY,
                            opacity: 0,
                            scale: 0.5,
                        }}
                        animate={phase >= 1
                            ? { x: 0, y: 0, opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0] }
                            : {}
                        }
                        transition={{
                            delay: dot.delay,
                            duration: 0.8,
                            ease: EXPO_OUT,
                        }}
                    />
                ))}

                {/* ──── Concentric pulse rings ──── */}
                {phase >= 1 && PULSE_RINGS.map((ring, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full border z-[5]"
                        style={{
                            width: ring.size, height: ring.size,
                            top: "50%", left: "50%",
                            marginTop: -ring.size / 2,
                            marginLeft: -ring.size / 2,
                            borderColor: `${C.green}18`,
                            willChange: "transform, opacity"
                        }}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: [0.5, 1.2], opacity: [0, 0.6, 0] }}
                        transition={{
                            delay: ring.delay + 0.3,
                            duration: 1.5,
                            ease: "easeOut",
                        }}
                    />
                ))}

                {/* ──── Logo: Circular "portal" reveal using clip-path ──── */}
                <motion.div
                    className="absolute z-10 flex items-center justify-center"
                    style={{
                        width: 260, height: 260,
                        top: "50%", left: "50%",
                        marginTop: -190, marginLeft: -130,
                    }}
                    initial={{ clipPath: "circle(0% at 50% 50%)" }}
                    animate={{ clipPath: portalClip }}
                    transition={{ duration: 1.0, ease: EXPO_OUT }}
                >
                    {/* Soft radial halo */}
                    <div
                        className="absolute inset-[-50px] rounded-full"
                        style={{
                            background: `radial-gradient(circle, rgba(96,186,129,0.12) 0%, transparent 70%)`,
                            filter: "blur(20px)",
                        }}
                    />
                    <img
                        src="/assets/images/FOS-01.png"
                        alt="FOS Logo"
                        className="w-[240px] h-[240px] object-contain relative z-10"
                        style={{ filter: "drop-shadow(0 6px 25px rgba(40,73,82,0.12))" }}
                        decoding="async"
                    />

                    {/* ──── Shimmer sweep across logo ──── */}
                    {phase >= 2 && (
                        <motion.div
                            className="absolute inset-0 z-20 pointer-events-none"
                            style={{
                                background: `linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.5) 55%, transparent 70%)`,
                            }}
                            initial={{ x: "-120%" }}
                            animate={{ x: "120%" }}
                            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                        />
                    )}
                </motion.div>

                {/* ──── Center text block ──── */}
                <div
                    className="absolute z-10 flex flex-col items-center"
                    style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", paddingTop: 240 }}
                >
                    {/* Heading with clip-mask reveal */}
                    <div className="flex items-center gap-[0.35em] overflow-hidden">
                        {headingWords.map((word, i) => (
                            <motion.span
                                key={word}
                                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
                                style={{
                                    color: C.teal,
                                    textShadow: `0 1px 15px rgba(40,73,82,0.08)`,
                                }}
                                initial={{ y: "110%" }}
                                animate={phase >= 3 ? { y: "0%" } : {}}
                                transition={{
                                    delay: i * 0.10,
                                    duration: 0.6,
                                    ease: EXPO_OUT,
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>

                    {/* Gradient underline — draws itself */}
                    <motion.div
                        className="mt-4 h-[2px] rounded-full origin-left"
                        style={{
                            background: `linear-gradient(90deg, ${C.green}, ${C.orange})`,
                            width: 200,
                        }}
                        initial={{ scaleX: 0 }}
                        animate={phase >= 3 ? { scaleX: 1 } : {}}
                        transition={{ delay: 0.25, duration: 0.7, ease: EXPO_OUT }}
                    />

                    {/* Tagline with letter-by-letter typing effect */}
                    <div className="mt-5 flex overflow-hidden">
                        <motion.p
                            className="text-sm md:text-base tracking-[0.2em] uppercase font-medium whitespace-nowrap"
                            style={{ color: `${C.teal}80` }}
                            initial={{ clipPath: "inset(0 100% 0 0)" }}
                            animate={phase >= 3 ? { clipPath: "inset(0 0% 0 0)" } : {}}
                            transition={{
                                delay: T.taglineStart - T.textStart,
                                duration: 0.8,
                                ease: [0.4, 0, 0.2, 1],
                            }}
                        >
                            {tagline}
                        </motion.p>
                    </div>

                    {/* Elegant progress bar */}
                    <motion.div
                        className="mt-10 relative overflow-hidden rounded-full"
                        style={{ width: 120, height: 3, background: `${C.teal}12` }}
                        initial={{ opacity: 0 }}
                        animate={phase >= 3 ? { opacity: 1 } : {}}
                        transition={{ delay: 0.8, duration: 0.4 }}
                    >
                        <div
                            className="absolute inset-0 rounded-full splash-progress-sweep"
                            style={{
                                background: `linear-gradient(90deg, ${C.green}, ${C.orange})`,
                            }}
                        />
                    </motion.div>
                </div>

                {/* ──── Floating ambient particles ──── */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {FLOAT_PARTICLES.map((p) => (
                        <div
                            key={p.id}
                            className="absolute rounded-full splash-leaf-rise"
                            style={{
                                left: `${p.x}%`, bottom: "-8px",
                                width: p.size, height: p.size,
                                background: p.color, opacity: 0.25,
                                animationDelay: `${p.delay}s`,
                                animationDuration: `${p.duration}s`,
                                ["--leaf-drift" as any]: `${p.drift}px`,
                            }}
                        />
                    ))}
                </div>

                {/* ──── Corner watermark ──── */}
                <motion.div
                    className="absolute bottom-8 right-10 text-xs tracking-[0.3em] uppercase font-medium"
                    style={{ color: `${C.teal}20` }}
                    initial={{ opacity: 0 }}
                    animate={phase >= 3 ? { opacity: 1 } : {}}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    One-Link Demo
                </motion.div>
            </motion.div>

            {/* ═══ LAYER 2: Split curtain exit ═══ */}
            {exiting && (
                <>
                    <motion.div
                        className="absolute top-0 left-0 w-1/2 h-full z-[10]"
                        style={{
                            background: `linear-gradient(135deg, ${C.bg1} 0%, ${C.bg2} 100%)`,
                            boxShadow: '4px 0 25px rgba(40,73,82,0.10)',
                        }}
                        initial={{ x: 0 }}
                        animate={{ x: "-100%" }}
                        transition={{ duration: T.splitDur, ease: EXPO_OUT }}
                    >
                        <div
                            className="absolute top-0 right-0 w-[2px] h-full"
                            style={{
                                background: `linear-gradient(to bottom, transparent 10%, ${C.green}50, ${C.orange}40, ${C.green}50, transparent 90%)`,
                                boxShadow: `0 0 12px ${C.green}30`,
                            }}
                        />
                    </motion.div>
                    <motion.div
                        className="absolute top-0 right-0 w-1/2 h-full z-[10]"
                        style={{
                            background: `linear-gradient(135deg, ${C.bg2} 0%, ${C.bg3} 100%)`,
                            boxShadow: '-4px 0 25px rgba(40,73,82,0.10)',
                        }}
                        initial={{ x: 0 }}
                        animate={{ x: "100%" }}
                        transition={{ duration: T.splitDur, ease: EXPO_OUT }}
                    >
                        <div
                            className="absolute top-0 left-0 w-[2px] h-full"
                            style={{
                                background: `linear-gradient(to bottom, transparent 10%, ${C.orange}40, ${C.green}50, ${C.orange}40, transparent 90%)`,
                                boxShadow: `0 0 12px ${C.orange}30`,
                            }}
                        />
                    </motion.div>
                </>
            )}
        </div>
    )
}
