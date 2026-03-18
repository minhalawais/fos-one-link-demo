import { useEffect, useMemo, useState } from "react";
import { ALL_ASSETS } from "../lib/assets.ts";

const loadedAssetCache = new Set<string>();
const CHUNK_SIZE = 6;

interface UseAssetPreloaderOptions {
    enabled?: boolean;
}

const isImageAsset = (asset: string) => /\.(png|jpe?g|webp|gif|svg|avif)$/i.test(asset);
const isVideoAsset = (asset: string) => /\.(mp4|webm|ogg)$/i.test(asset);
const isScriptAsset = (asset: string) => /\.(js|mjs)$/i.test(asset);

const withTimeout = async <T,>(promise: Promise<T>, timeoutMs: number): Promise<T | null> => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const timeoutPromise = new Promise<null>((resolve) => {
        timeoutId = setTimeout(() => resolve(null), timeoutMs);
    });

    const result = await Promise.race([promise, timeoutPromise]);
    if (timeoutId) clearTimeout(timeoutId);
    return result;
};

const preloadImage = (asset: string): Promise<void> =>
    new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = async () => {
            try {
                if (typeof img.decode === "function") {
                    await img.decode();
                }
            } catch {
                // Ignore decode errors to avoid blocking playback.
            }
            resolve();
        };
        img.onerror = () => resolve();
        img.src = asset;
    });

const preloadViaFetch = async (asset: string): Promise<void> => {
    try {
        await fetch(asset, {
            cache: "force-cache",
            mode: asset.startsWith("http") ? "cors" : "same-origin",
        });
    } catch {
        // Best-effort prefetch only.
    }
};

const preloadAsset = async (asset: string): Promise<void> => {
    if (!asset || loadedAssetCache.has(asset)) return;

    if (isImageAsset(asset)) {
        await withTimeout(preloadImage(asset), 15000);
    } else if (isVideoAsset(asset) || isScriptAsset(asset)) {
        await withTimeout(preloadViaFetch(asset), 15000);
    } else {
        await withTimeout(preloadViaFetch(asset), 10000);
    }

    loadedAssetCache.add(asset);
};

const chunkArray = (assets: string[]): string[][] => {
    const chunks: string[][] = [];
    for (let i = 0; i < assets.length; i += CHUNK_SIZE) {
        chunks.push(assets.slice(i, i + CHUNK_SIZE));
    }
    return chunks;
};

export const useAssetPreloader = (
    assets: string[] = ALL_ASSETS,
    options: UseAssetPreloaderOptions = {}
) => {
    const { enabled = true } = options;
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const normalizedAssets = useMemo(
        () => Array.from(new Set(assets.filter(Boolean))),
        [assets]
    );

    useEffect(() => {
        if (!enabled) {
            setIsLoaded(false);
            setProgress(0);
            setError(null);
            return;
        }

        let mounted = true;
        let loadedCount = 0;
        const totalCount = normalizedAssets.length;

        if (totalCount === 0) {
            setIsLoaded(true);
            setProgress(100);
            return;
        }

        const preloadAll = async () => {
            try {
                const chunks = chunkArray(normalizedAssets);

                for (const chunk of chunks) {
                    await Promise.all(
                        chunk.map(async (url) => {
                            await preloadAsset(url);
                            if (!mounted) return;
                            loadedCount++;
                            setProgress(Math.round((loadedCount / totalCount) * 100));
                        })
                    );
                }

                if (mounted) {
                    setIsLoaded(true);
                }
            } catch (err) {
                if (mounted) setError("Some assets failed to preload.");
                console.error("Asset preloading error:", err);
            }
        };

        preloadAll();

        return () => {
            mounted = false;
        };
    }, [enabled, normalizedAssets]);

    return { isLoaded, progress, error };
};
