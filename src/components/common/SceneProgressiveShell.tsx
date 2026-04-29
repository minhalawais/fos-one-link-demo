/**
 * SceneProgressiveShell
 * ─────────────────────────────────────────────────────────────────────────────
 * Drop-in replacement for <AssetPreloader>.
 *
 * Instead of blocking until ALL module assets load, this component:
 *   - Renders scenes immediately if their assets are already cached
 *   - Shows a minimal, sub-second loader ONLY for the very first scene
 *     of a module (which should be near-instant since the app bootstrapper
 *     already fetched those assets during idle time)
 *   - Triggers lookahead loading for upcoming scenes in the background
 *
 * Props:
 *   scenes       – The full SCENES array from the module player (with assets)
 *   progress     – Current playback progress
 *   children     – The scene component to render (pass as render prop for access
 *                  to currentSceneIndex if needed, or just pass children)
 *
 * Usage:
 *   <SceneProgressiveShell scenes={SCENES} progress={progress}>
 *     <CurrentSceneComponent isActive progress={progress} />
 *   </SceneProgressiveShell>
 */

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgressivePreloader, SceneConfig } from "../../hooks/useProgressivePreloader.ts";

// ─── Minimal inline loader (only visible if first scene takes >200ms) ─────────
// Design philosophy: should never be seen in production — it's a safety net.
const THEME = {
  teal: "#284952",
  green: "#60BA81",
  bg: "#F5F5F7",
};

const SceneReadyGate: React.FC<{
  isReady: boolean;
  sceneName: string;
  children: React.ReactNode;
}> = ({ isReady, sceneName, children }) => {
  return (
    <div className="relative w-full h-full">
      {/* Scene content — always mounted, visibility controlled by opacity */}
      {/* This ensures components initialize even while we wait, cutting
          perceived latency to near-zero when the gate opens */}
      <div
        className="w-full h-full"
        style={{
          visibility: isReady ? "visible" : "hidden",
          // Using visibility (not display:none) so components stay mounted
          // and their useEffect hooks can run, animations can prepare, etc.
        }}
      >
        {children}
      </div>

      {/* Safety-net loader — only visible if assets haven't loaded yet.
          In a well-configured system this should NEVER be seen. */}
      <AnimatePresence>
        {!isReady && (
          <motion.div
            key={`preload-gate-${sceneName}`}
            className="absolute inset-0 z-50 flex items-center justify-center"
            style={{ background: THEME.bg }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.05 }} // Near-instant appear — minimize flash
          >
            {/* Deliberately minimal — you should never see this */}
            <div className="flex flex-col items-center gap-2">
              <motion.div
                className="w-8 h-8 rounded-full border-2 border-t-transparent"
                style={{ borderColor: `${THEME.green} transparent transparent transparent` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: `${THEME.teal}80` }}
              >
                Loading scene...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

interface SceneProgressiveShellProps {
  scenes: SceneConfig[];
  progress: number;
  children: React.ReactNode;
  /** Optional: called when preloader status changes (for debugging) */
  onPreloadStatus?: (loaded: Set<string>, current: string) => void;
}

export const SceneProgressiveShell: React.FC<SceneProgressiveShellProps> = ({
  scenes,
  progress,
  children,
  onPreloadStatus,
}) => {
  const { isCurrentSceneReady, currentSceneName, loadedScenes } =
    useProgressivePreloader(scenes, progress);

  if (onPreloadStatus) {
    onPreloadStatus(loadedScenes, currentSceneName);
  }

  return (
    <SceneReadyGate isReady={isCurrentSceneReady} sceneName={currentSceneName}>
      {children}
    </SceneReadyGate>
  );
};
