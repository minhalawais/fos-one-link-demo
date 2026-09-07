"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Play, X } from "lucide-react"
import type { SceneControl } from "../../lib/module-data"
import LanguageToggle from "../LanguageToggle"
import MobileModuleRail from "./MobileModuleRail"
import {
  MOBILE_HEADER_HEIGHT,
  MOBILE_RADIUS,
  MOBILE_STAGE_PADDING,
  MODULE_ACCENTS,
} from "../../lib/mobile-layout"

export interface MobileSlideItem {
  id: number
  shortTitle: string
  headline: string
  subtext: string
  duration: number
  audioPath: string
  icon: React.ElementType
  playerComponent: React.ReactNode
  scenes: SceneControl[]
}

interface MobileTrainingShellProps {
  slides: MobileSlideItem[]
  activeSlide: number | null
  isPlaying: boolean
  currentTime: number
  language: "en" | "ur"
  onSelectModule: (index: number) => void
  onStartModule: () => void
  onStartModuleAt: (index: number) => void
  onClose: () => void
  onLanguageToggle: (language: "en" | "ur") => void
}

const getShortSubtext = (text: string) => text.replace(/—/g, " - ")

const MobileTrainingShell: React.FC<MobileTrainingShellProps> = ({
  slides,
  activeSlide,
  isPlaying,
  currentTime,
  language,
  onSelectModule,
  onStartModule,
  onStartModuleAt,
  onClose,
  onLanguageToggle,
}) => {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const isUrdu = language === "ur"
  const activeIndex = activeSlide ?? focusedIndex
  const active = slides[activeIndex]
  const accent = MODULE_ACCENTS[activeIndex % MODULE_ACCENTS.length]
  const isPlayerActive = activeSlide !== null && (isPlaying || currentTime > 0)
  const Icon = active.icon

  useEffect(() => {
    if (activeSlide !== null) setFocusedIndex(activeSlide)
  }, [activeSlide])

  const selectFocused = (index: number) => {
    setFocusedIndex(index)
    if (activeSlide !== null && !isPlayerActive) {
      onSelectModule(index)
    }
  }

  const move = (delta: 1 | -1) => {
    const next = Math.max(0, Math.min(slides.length - 1, focusedIndex + delta))
    selectFocused(next)
  }

  if (isPlayerActive) {
    return (
      <section className="relative z-10 flex h-full w-full flex-col overflow-hidden bg-[#17161A]">
        <div
          className="pointer-events-auto absolute left-0 right-0 top-0 z-[220] flex items-center justify-between bg-[#17161A]/82 px-3 backdrop-blur-xl"
          style={{
            minHeight: MOBILE_HEADER_HEIGHT,
            paddingLeft: `calc(0.75rem + var(--safe-left))`,
            paddingRight: `calc(0.75rem + var(--safe-right))`,
          }}
          dir={isUrdu ? "rtl" : "ltr"}
        >
          <div className="flex min-w-0 items-center gap-2">
            <span
              className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-black text-white"
              style={{ background: accent }}
            >
              {active.id}
            </span>
            <span className={`truncate text-sm font-extrabold text-white ${isUrdu ? "font-urdu text-base" : ""}`}>
              {active.shortTitle || active.headline}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-white/80"
            aria-label={isUrdu ? "ماڈیول بند کریں" : "Close module"}
          >
            <X size={17} />
          </button>
        </div>

        <div
          className="h-full w-full"
          style={{
            paddingTop: MOBILE_HEADER_HEIGHT,
            paddingBottom: "calc(48px + var(--safe-bottom))",
          }}
        >
          {active.playerComponent}
        </div>
      </section>
    )
  }

  return (
    <section
      className="relative z-10 flex h-full w-full flex-col overflow-hidden"
      style={{
        padding: MOBILE_STAGE_PADDING,
        paddingLeft: `calc(${MOBILE_STAGE_PADDING}px + var(--safe-left))`,
        paddingRight: `calc(${MOBILE_STAGE_PADDING}px + var(--safe-right))`,
      }}
      dir={isUrdu ? "rtl" : "ltr"}
    >
      <header className="flex h-12 shrink-0 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/80 shadow-[0_8px_24px_rgba(40,73,82,0.10)]">
            <img src="/assets/FOS-01.png" alt="FOS" className="h-6 w-6 object-contain" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[10px] font-black uppercase tracking-[0.22em] text-[#284952]/45">
              {isUrdu ? "ٹریننگ" : "Training"}
            </p>
            <p className={`truncate text-sm font-extrabold text-[#284952] ${isUrdu ? "font-urdu text-base" : ""}`}>
              {isUrdu ? "ماڈیول منتخب کریں" : "Select module"}
            </p>
          </div>
        </div>
        <div className="scale-[0.82] origin-right">
          <LanguageToggle language={language} onToggle={onLanguageToggle} />
        </div>
      </header>

      <main className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <AnimatePresence mode="wait">
          <motion.article
            key={`${active.id}-${language}`}
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="relative min-h-0 overflow-hidden border border-white/70 bg-white/84 shadow-[0_18px_50px_-28px_rgba(40,73,82,0.45)] backdrop-blur-xl"
            style={{ borderRadius: MOBILE_RADIUS }}
          >
            <div
              className={`absolute bottom-[-2.2rem] ${isUrdu ? "left-2" : "right-2"} select-none text-[118px] font-black leading-none opacity-[0.045]`}
              style={{ color: accent }}
            >
              0{active.id}
            </div>
            <div className="relative z-10 grid h-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl" style={{ background: `${accent}18`, color: accent }}>
                <Icon size={26} strokeWidth={1.8} />
              </div>

              <div className="min-w-0">
                <div className={`mb-2 flex items-center gap-2 ${isUrdu ? "flex-row-reverse" : ""}`}>
                  <span className="text-xs font-black uppercase tracking-[0.22em]" style={{ color: accent }}>
                    {isUrdu ? `ماڈیول ${active.id}` : `Module ${active.id}`}
                  </span>
                  <span className="h-px w-12 rounded-full" style={{ background: accent }} />
                </div>
                <h1
                  className={`line-clamp-2 max-w-[520px] font-extrabold text-[#1A1D21] ${
                    isUrdu ? "font-urdu text-2xl leading-[1.45]" : "text-[clamp(1.2rem,3.2vw,1.85rem)] leading-[1.06]"
                  }`}
                >
                  {active.headline}
                </h1>
                <p
                  className={`mt-2 line-clamp-2 max-w-[560px] font-semibold text-[#5A6169] ${
                    isUrdu ? "font-urdu text-lg leading-relaxed" : "text-[13px] leading-relaxed"
                  }`}
                >
                  {getShortSubtext(active.subtext)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => (activeSlide === null ? onStartModuleAt(focusedIndex) : onStartModule())}
                className={`flex h-12 shrink-0 items-center gap-2 rounded-2xl px-4 font-extrabold text-white shadow-xl ${
                  isUrdu ? "flex-row-reverse font-urdu text-base" : "text-sm"
                }`}
                style={{ background: `linear-gradient(135deg, ${accent}, ${accent}DD)` }}
              >
                <span>{isUrdu ? "شروع کریں" : "Start"}</span>
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/22">
                  <Play size={15} fill="currentColor" />
                </span>
              </button>
            </div>
          </motion.article>
        </AnimatePresence>

        <aside className="flex h-full shrink-0 flex-col items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => move(isUrdu ? 1 : -1)}
            disabled={focusedIndex === 0}
            className="grid h-11 w-11 place-items-center rounded-full border border-[#284952]/12 bg-white/70 text-[#284952] disabled:opacity-30"
            aria-label={isUrdu ? "اگلا ماڈیول" : "Previous module"}
          >
            {isUrdu ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
          </button>
          <MobileModuleRail
            activeIndex={focusedIndex}
            total={slides.length}
            language={language}
            onSelect={selectFocused}
          />
          <button
            type="button"
            onClick={() => move(isUrdu ? -1 : 1)}
            disabled={focusedIndex === slides.length - 1}
            className="grid h-11 w-11 place-items-center rounded-full border border-[#284952]/12 bg-white/70 text-[#284952] disabled:opacity-30"
            aria-label={isUrdu ? "پچھلا ماڈیول" : "Next module"}
          >
            {isUrdu ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
          </button>
        </aside>
      </main>
    </section>
  )
}

export default MobileTrainingShell
