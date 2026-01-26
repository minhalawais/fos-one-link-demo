"use client"

import React from "react"
import { motion } from "framer-motion"

interface TypewriterTextProps {
    text: string
    speed?: number
    cursor?: boolean
    className?: string
    onComplete?: () => void
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
    text,
    speed = 50,
    cursor = true,
    className = "",
    onComplete
}) => {
    const [displayedText, setDisplayedText] = React.useState("")
    const [currentIndex, setCurrentIndex] = React.useState(0)

    React.useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[currentIndex])
                setCurrentIndex((prev) => prev + 1)
            }, speed)
            return () => clearTimeout(timeout)
        } else if (onComplete) {
            onComplete()
        }
    }, [currentIndex, text, speed, onComplete])

    return (
        <span className={className}>
            {displayedText}
            {cursor && currentIndex < text.length && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-0.5 h-4 bg-current ml-0.5"
                />
            )}
        </span>
    )
}
