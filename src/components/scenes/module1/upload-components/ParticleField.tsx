"use client"

import React, { useEffect, useRef } from "react"

interface Particle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    opacity: number
    life: number
}

interface ParticleFieldProps {
    count?: number
    color?: string
    speed?: number
    direction?: "up" | "down" | "random"
    active?: boolean
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
    count = 50,
    color = "#60BA81",
    speed = 0.5,
    direction = "up",
    active = true
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const animationFrameRef = useRef<number>()

    useEffect(() => {
        if (!active) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener("resize", resizeCanvas)

        // Initialize particles
        particlesRef.current = Array.from({ length: count }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * speed,
            vy: direction === "up" ? -Math.random() * speed : direction === "down" ? Math.random() * speed : (Math.random() - 0.5) * speed,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2,
            life: Math.random()
        }))

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particlesRef.current.forEach((particle) => {
                // Update position
                particle.x += particle.vx
                particle.y += particle.vy
                particle.life += 0.01

                // Fade in/out
                particle.opacity = Math.sin(particle.life) * 0.5 + 0.3

                // Wrap around screen
                if (particle.x < 0) particle.x = canvas.width
                if (particle.x > canvas.width) particle.x = 0
                if (particle.y < 0) particle.y = canvas.height
                if (particle.y > canvas.height) particle.y = 0

                // Draw particle
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
                ctx.fillStyle = `${color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, "0")}`
                ctx.fill()
            })

            animationFrameRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [count, color, speed, direction, active])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: active ? 1 : 0, transition: "opacity 0.5s" }}
        />
    )
}
