// Enhanced timing constants for upload scene
export const ENHANCED_TIMING = {
    // Phase 1: Introduction
    INTRO_START: 0,
    INTRO_PARTICLES: 0.2,
    INTRO_TITLE: 0.5,
    INTRO_END: 2,

    // Phase 2: Data Registration
    DATA_APPEAR: 2,
    FILE_STACK: 2.2,
    FILE_ORGANIZE: 2.8,
    FILE_PREVIEW: 3.5,
    FILE_READY: 4.5,

    // Phase 3: API Integration
    API_START: 9,
    // Simple file sharing phase (5-9s) - "Companies simply share their active employee list"
    FILE_SHARING: 5,
    // HRMS appears when script says "integrate their existing HRMs" (~9-10s)
    HRMS_CONNECT: 9,
    // API Handshake when script says "with the FOS platform" (~10-12s)
    HANDSHAKE_START: 10,
    HANDSHAKE_LOCK: 10.5,
    HANDSHAKE_COMPLETE: 12,
    // Data stream during "through secure APIs" (~12-15s)
    STREAM_START: 12,
    STREAM_ACCELERATE: 13,
    STREAM_PEAK: 14,
    INTEGRATION_COMPLETE: 15,
    CELEBRATION: 15.5,
    API_END: 17,

    // Phase 4: Upload & Validation
    UPLOAD_START: 17,
    EXPLODE_TRANSITION: 17.2,
    UPLOAD_PROGRESS: 17.5,
    VALIDATION_START: 18.5,
    ROW_1_VALIDATE: 18.7,
    ROW_2_VALIDATE: 19.3,
    ROW_3_VALIDATE: 19.9,
    ROW_4_VALIDATE: 20.5,
    COMPLETE: 21,
    FINAL_CELEBRATION: 21.5,
    SCENE_END: 22
}

// Animation easing presets
export const EASING = {
    smooth: [0.43, 0.13, 0.23, 0.96] as const,
    bounce: [0.68, -0.55, 0.265, 1.55] as const,
    elastic: [0.175, 0.885, 0.32, 1.275] as const,
    snap: [0.95, 0.05, 0.795, 0.035] as const
}
