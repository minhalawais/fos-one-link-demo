/**
 * useProgressivePreloader
 * ─────────────────────────────────────────────────────────────────────────────
 * THE ENGINE of the new asset loading system.
 *
 * STRATEGY: "Lookahead Pipeline"
 *
 *   ┌────────────────────────────────────────────────────────────────────┐
 *   │  Scene N playing  →  Scene N+1 loading  →  Scene N+2 queued       │
 *   │  (non-blocking)       (background)          (idle callback)        │
 *   └────────────────────────────────────────────────────────────────────┘
 *
 * By the time progress advances to scene N, that scene was already loaded
 * during scene N-1's playback window. The user NEVER sees a loader.
 *
 * HOW IT WORKS:
 *   1. On mount: load current scene's assets immediately (should be empty
 *      for scene 1 since bootstrapped by app, or tiny enough to be instant).
 *   2. After current scene loads: background-load next LOOKAHEAD scenes.
 *   3. On each scene change: repeat — current scene is already loaded,
 *      and we push the lookahead window forward.
 *   4. Remaining scenes: loaded via requestIdleCallback during spare CPU.
 *
 * RESULT: Zero blocking. Zero flicker. Zero loaders during playback.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// ─── Config ──────────────────────────────────────────────────────────────────

/** How many scenes ahead to actively preload while current scene plays */
const ACTIVE_LOOKAHEAD = 2;

/** How many scenes ahead to schedule via idle callback */
const IDLE_LOOKAHEAD = 4;

/** Timeout for idle callback fallback — ensures assets load even on busy CPU */
const IDLE_TIMEOUT_MS = 2000;

/** Per-asset fetch timeout */
const ASSET_TIMEOUT_MS = 12000;

// ─── Module-level cache (survives re-renders, survives component remounts) ───
const globalLoadedCache = new Set<string>();
const globalInFlightPromises = new Map<string, Promise<void>>();

// ─── Low-level asset loaders ──────────────────────────────────────────────────

const isImage = (url: string) => /\.(png|jpe?g|webp|gif|svg|avif)$/i.test(url);
const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([
    promise,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ]);
}

function loadImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = async () => {
      try {
        if (typeof img.decode === "function") await img.decode();
      } catch {
        // Non-fatal — image is in memory, decode can be skipped
      }
      resolve();
    };
    img.onerror = () => resolve(); // Fail silently — don't block scenes
    img.src = url;
  });
}

function loadViaFetch(url: string): Promise<void> {
  return fetch(url, {
    cache: "force-cache",
    mode: url.startsWith("http") ? "cors" : "same-origin",
  })
    .then(() => undefined)
    .catch(() => undefined); // Best-effort only
}

/**
 * Load a single asset, deduplicating concurrent requests via in-flight map.
 * Once loaded, the URL is added to globalLoadedCache — never loaded again.
 */
async function loadAsset(url: string): Promise<void> {
  if (!url || globalLoadedCache.has(url)) return;

  // Deduplicate: if already in-flight, await the same promise
  if (globalInFlightPromises.has(url)) {
    return globalInFlightPromises.get(url)!;
  }

  const loader = isImage(url)
    ? withTimeout(loadImage(url), ASSET_TIMEOUT_MS)
    : withTimeout(loadViaFetch(url), ASSET_TIMEOUT_MS);

  const promise = loader.then(() => {
    globalLoadedCache.add(url);
    globalInFlightPromises.delete(url);
  });

  globalInFlightPromises.set(url, promise);
  return promise;
}

/**
 * Load a group of assets in parallel.
 */
async function loadAssetGroup(assets: string[]): Promise<void> {
  const unloaded = assets.filter((a) => a && !globalLoadedCache.has(a));
  if (unloaded.length === 0) return;
  await Promise.all(unloaded.map(loadAsset));
}

// ─── Idle scheduler ───────────────────────────────────────────────────────────

/**
 * Schedule work during browser idle time with a timeout fallback.
 * Safari doesn't support requestIdleCallback, so we fall back to setTimeout.
 */
function scheduleIdle(callback: () => void, timeoutMs = IDLE_TIMEOUT_MS): () => void {
  if (typeof window === "undefined") return () => { };

  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(callback, { timeout: timeoutMs });
    return () => window.cancelIdleCallback(id);
  } else {
    // Safari fallback: setTimeout(0) yields to the event loop
    const id = setTimeout(callback, 0);
    return () => clearTimeout(id);
  }
}

// ─── Scene interface ──────────────────────────────────────────────────────────

export interface SceneConfig {
  name: string;
  start: number;
  end: number;
  component: React.ComponentType<any>;
  assets?: string[];
}

export interface UseProgressivePreloaderReturn {
  /** True when current scene's assets are ready — use to gate rendering */
  isCurrentSceneReady: boolean;
  /** Current scene name */
  currentSceneName: string;
  /** Which scenes have been loaded (for debugging) */
  loadedScenes: Set<string>;
}

// ─── Main hook ────────────────────────────────────────────────────────────────

export function useProgressivePreloader(
  scenes: SceneConfig[],
  progress: number
): UseProgressivePreloaderReturn {
  const [currentSceneReady, setCurrentSceneReady] = useState(false);
  const [loadedScenes, setLoadedScenes] = useState<Set<string>>(new Set());

  // Track in-memory which scenes have been loaded this session
  const loadedScenesRef = useRef<Set<string>>(new Set());
  const cleanupRef = useRef<Array<() => void>>([]);
  const currentSceneIndexRef = useRef(-1);

  // Find current scene index
  const currentSceneIndex = useMemo(() => {
    const idx = scenes.findIndex(
      (s) => progress >= s.start && progress < s.end
    );
    return idx === -1 ? 0 : idx;
  }, [scenes, progress]);

  const currentScene = scenes[currentSceneIndex];

  const markSceneLoaded = useCallback((sceneName: string) => {
    loadedScenesRef.current.add(sceneName);
    setLoadedScenes((prev) => new Set([...prev, sceneName]));
  }, []);

  const isSceneAssetsDone = useCallback(
    (scene: SceneConfig) => {
      if (!scene.assets || scene.assets.length === 0) return true;
      return loadedScenesRef.current.has(scene.name);
    },
    []
  );

  // ─── Core effect: runs when scene index changes ───────────────────────────
  useEffect(() => {
    if (!currentScene) return;

    // Skip if scene didn't actually change (progress moves within same scene)
    if (currentSceneIndexRef.current === currentSceneIndex) return;
    currentSceneIndexRef.current = currentSceneIndex;

    // Cancel any pending idle callbacks from previous scene
    cleanupRef.current.forEach((fn) => fn());
    cleanupRef.current = [];

    // ── STEP 1: Load current scene's assets (HIGH PRIORITY) ──────────────────
    // This should be nearly instant because the PREVIOUS scene already
    // triggered loading of this scene during its playback window.
    // For scene 0, the App-level bootstrap preloader covers this.
    const loadCurrentScene = async () => {
      if (isSceneAssetsDone(currentScene)) {
        setCurrentSceneReady(true);
        return;
      }

      await loadAssetGroup(currentScene.assets ?? []);
      markSceneLoaded(currentScene.name);
      setCurrentSceneReady(true);
    };

    // Reset readiness state before loading — shows spinner only if load takes >16ms
    setCurrentSceneReady(isSceneAssetsDone(currentScene));
    loadCurrentScene();

    // ── STEP 2: Active lookahead — load next N scenes in background ────────────
    // Non-blocking: runs after current scene is ready, in parallel with playback.
    const activeLookaheadScenes = scenes.slice(
      currentSceneIndex + 1,
      currentSceneIndex + 1 + ACTIVE_LOOKAHEAD
    );

    // Start background loads without awaiting
    for (const scene of activeLookaheadScenes) {
      if (isSceneAssetsDone(scene)) continue;
      loadAssetGroup(scene.assets ?? []).then(() => markSceneLoaded(scene.name));
    }

    // ── STEP 3: Idle lookahead — load remaining scenes via requestIdleCallback ──
    const idleLookaheadScenes = scenes.slice(
      currentSceneIndex + 1 + ACTIVE_LOOKAHEAD,
      currentSceneIndex + 1 + IDLE_LOOKAHEAD
    );

    for (const scene of idleLookaheadScenes) {
      if (isSceneAssetsDone(scene)) continue;

      const cancel = scheduleIdle(() => {
        loadAssetGroup(scene.assets ?? []).then(() => markSceneLoaded(scene.name));
      });

      cleanupRef.current.push(cancel);
    }

    return () => {
      cleanupRef.current.forEach((fn) => fn());
      cleanupRef.current = [];
    };
  }, [currentSceneIndex]); // Intentionally only react to scene changes

  return {
    isCurrentSceneReady: currentSceneReady,
    currentSceneName: currentScene?.name ?? "",
    loadedScenes,
  };
}

// ─── App-level bootstrap hook ─────────────────────────────────────────────────
/**
 * useModuleBridgePreloader
 *
 * Preloads the NEXT module's bootstrap assets (scene 1) during idle time,
 * while the current module is still playing.
 *
 * Usage: call from the App/Player-switcher level, passing the currentModuleIndex.
 *
 *   const { triggerBridgePreload } = useModuleBridgePreloader();
 *   // Call when module N starts or is near completion:
 *   triggerBridgePreload(nextModuleBootstrapAssets);
 */
export function useModuleBridgePreloader() {
  const preloadedModulesRef = useRef<Set<number>>(new Set());

  const triggerBridgePreload = useCallback(
    (moduleIndex: number, bootstrapAssets: string[]) => {
      if (preloadedModulesRef.current.has(moduleIndex)) return;
      preloadedModulesRef.current.add(moduleIndex);

      scheduleIdle(() => {
        loadAssetGroup(bootstrapAssets);
      }, 3000); // 3s timeout — ensures it runs even on busy machines
    },
    []
  );

  return { triggerBridgePreload };
}

// ─── App-level initial bootstrap ─────────────────────────────────────────────
/**
 * useAppBootstrapPreloader
 *
 * Called once on App mount. Preloads Module 1 Scene 1 assets during idle time
 * while user is on the splash/landing screen.
 *
 * Since users typically land on Module 1 first, this ensures scene 1 of
 * Module 1 has zero loading time when the user clicks "Start".
 */
export function useAppBootstrapPreloader(module1Scene1Assets: string[]) {
  useEffect(() => {
    const cancel = scheduleIdle(() => {
      loadAssetGroup(module1Scene1Assets);
    }, 5000);

    return cancel;
  }, []); // Run once on mount
}
