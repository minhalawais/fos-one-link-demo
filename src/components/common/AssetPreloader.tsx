"use client"

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAssetPreloader } from "../../hooks/useAssetPreloader.ts";
import { Sparkles, Loader2 } from "lucide-react";

interface AssetPreloaderProps {
    children: React.ReactNode;
    criticalAssets?: string[];
    backgroundAssets?: string[];
}

const THEME = {
    darkGreen: "#27444E",
    green: "#60BA81",
    bg: "#F5F5F7",
};

export const AssetPreloader: React.FC<AssetPreloaderProps> = ({
    children,
    criticalAssets = [],
    backgroundAssets = [],
}) => {
    const {
        isLoaded: criticalReady,
        progress,
        error,
    } = useAssetPreloader(criticalAssets, { enabled: criticalAssets.length > 0 });

    useAssetPreloader(backgroundAssets, {
        enabled: criticalReady && backgroundAssets.length > 0,
    });

    const shouldBlock = criticalAssets.length > 0 && !criticalReady;

    return (
        <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
                {shouldBlock && (
                    <motion.div
                        key="preload-overlay"
                        className="absolute inset-0 z-50 flex items-center justify-center"
                        style={{ background: THEME.bg }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                    >
                        <motion.div
                            className="rounded-2xl border shadow-sm px-6 py-5 flex flex-col items-center gap-3"
                            style={{ borderColor: `${THEME.darkGreen}1a`, background: "white" }}
                            initial={{ y: 10, opacity: 0.6 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.26 }}
                        >
                            <motion.div
                                className="relative"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
                            >
                                <Sparkles size={20} style={{ color: THEME.green }} />
                                <Loader2
                                    size={24}
                                    className="absolute -right-6 -top-2 animate-spin"
                                    style={{ color: THEME.darkGreen }}
                                />
                            </motion.div>

                            <div className="text-center">
                                <div className="text-sm font-semibold" style={{ color: THEME.darkGreen }}>
                                    Preparing scene assets...
                                </div>
                                <div className="text-xs mt-0.5" style={{ color: `${THEME.darkGreen}cc` }}>
                                    {Math.max(0, Math.min(100, Math.round(progress)))}% loaded
                                </div>
                                {error && (
                                    <div className="text-[11px] mt-1" style={{ color: "#9A3412" }}>
                                        Continuing with partial preload.
                                    </div>
                                )}
                            </div>

                            <div className="w-56 h-1.5 rounded-full overflow-hidden" style={{ background: "#DDE6E9" }}>
                                <motion.div
                                    className="h-full"
                                    style={{ background: THEME.green }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.max(3, progress)}%` }}
                                    transition={{ type: "spring", stiffness: 120, damping: 18 }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="w-full h-full">{children}</div>
            
        </div>
    );
};
