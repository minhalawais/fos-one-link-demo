import { useState, useEffect } from "react"

export interface DeviceInfo {
  /** true for phones/tablets (≤1024px wide touch device) */
  isMobile: boolean
  /** true when height > width */
  isPortrait: boolean
  /** true when width >= height */
  isLandscape: boolean
  /** true when isMobile AND landscape — the "golden zone" for this app */
  isMobileLandscape: boolean
  /** true when isMobile AND portrait — the "broken zone" that triggers rotate prompt */
  isMobilePortrait: boolean
}

function computeInfo(): DeviceInfo {
  const w = window.innerWidth
  const h = window.innerHeight
  // Touch + small screen = mobile. Avoids false-positives on touch laptops (which are ≥1024).
  const isMobile =
    w <= 1024 &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  const isPortrait = h > w
  const isLandscape = w >= h
  return {
    isMobile,
    isPortrait,
    isLandscape,
    isMobileLandscape: isMobile && isLandscape,
    isMobilePortrait: isMobile && isPortrait,
  }
}

/**
 * Reactive device/orientation info hook.
 * Updates on window resize and screen orientation change.
 * Desktop always returns isMobile=false — zero effect on laptop/desktop layouts.
 */
export function useDeviceInfo(): DeviceInfo {
  const [info, setInfo] = useState<DeviceInfo>(computeInfo)

  useEffect(() => {
    const update = () => setInfo(computeInfo())
    window.addEventListener("resize", update)
    // Modern orientation API (Chrome 38+, Safari 16.4+)
    // Use window.screen explicitly — bare 'screen' is banned by no-restricted-globals
    window.screen.orientation?.addEventListener("change", update)
    return () => {
      window.removeEventListener("resize", update)
      window.screen.orientation?.removeEventListener("change", update)
    }
  }, [])

  return info
}
