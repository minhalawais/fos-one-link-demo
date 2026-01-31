import React, { useState, useEffect } from "react"

export const TypewriterText = ({ text, delay = 0, className = "" }: any) => {
    const [displayText, setDisplayText] = useState("")

    useEffect(() => {
        const timer = setTimeout(() => {
            let i = 0
            const interval = setInterval(() => {
                if (i <= text.length) {
                    setDisplayText(text.substring(0, i))
                    i++
                } else {
                    clearInterval(interval)
                }
            }, 30)
            return () => clearInterval(interval)
        }, delay * 1000)

        return () => clearTimeout(timer)
    }, [text, delay])

    return <span className={className}>{displayText}</span>
}
