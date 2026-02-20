import { useState, useEffect } from "react";
import { ALL_ASSETS } from "../lib/assets.ts";

export const useAssetPreloader = (assets: string[] = ALL_ASSETS) => {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        let loadedCount = 0;
        const totalCount = assets.length;

        if (totalCount === 0) {
            setIsLoaded(true);
            return;
        }

        const loadAsset = (url: string) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = resolve;
                img.onerror = () => {
                    console.warn(`Failed to preload asset: ${url}`);
                    // We resolve anyway to allow the app to continue, 
                    // but we could also track failures.
                    resolve(null);
                };
            });
        };

        const preloadAll = async () => {
            try {
                const promises = assets.map(async (url) => {
                    await loadAsset(url);
                    if (mounted) {
                        loadedCount++;
                        setProgress(Math.round((loadedCount / totalCount) * 100));
                    }
                });

                await Promise.all(promises);

                if (mounted) {
                    // Subtle delay for psychological "readiness" effect
                    setTimeout(() => {
                        if (mounted) setIsLoaded(true);
                    }, 800);
                }
            } catch (err) {
                if (mounted) setError("Some assets failed to load.");
                console.error("Asset preloading error:", err);
            }
        };

        preloadAll();

        return () => {
            mounted = false;
        };
    }, [assets]);

    return { isLoaded, progress, error };
};
