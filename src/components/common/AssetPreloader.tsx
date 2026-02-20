"use client"

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAssetPreloader } from "../../hooks/useAssetPreloader.ts";
import { Sparkles, Loader2 } from "lucide-react";

interface AssetPreloaderProps {
    children: React.ReactNode;
}

const THEME = {
    darkGreen: "#27444E",
    green: "#60BA81",
    bg: "#F5F5F7",
};

export const AssetPreloader: React.FC<AssetPreloaderProps> = ({ children }) => {
    return (
        <div className="w-full h-full">
            {children}
        </div>
    );
};
