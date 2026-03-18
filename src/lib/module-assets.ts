export interface ModuleAssetConfig {
  critical: string[]
  background: string[]
}

export const MODULE_ASSET_CONFIG: Record<"module1" | "module2" | "module3" | "module4" | "module5", ModuleAssetConfig> = {
  module1: {
    critical: [
      "/assets/images/FOS-01.png",
      "/assets/images/company_a.png",
    ],
    background: [
      "/assets/avatars/worker_avatar.png",
      "/assets/avatars/male_io.png",
      "/assets/avatars/female_io.png",
      "/assets/avatars/investigation_officer_avatar.png",
      "/assets/avatars/male_io_training.png",
      "/assets/setup1.jpeg",
      "/assets/setup2.jpeg",
      "/assets/setup3.jpeg",
      "/assets/training1.jpg",
      "/assets/training2.jpeg",
      "/assets/training3.jpeg",
      "/assets/briefing1.jpg",
      "/assets/briefing2.jpeg",
      "/assets/briefing3.jpeg",
      "/assets/fos_video.mp4",
    ],
  },

  module2: {
    critical: [
      "/assets/images/FOS-01.png",
      "/assets/images/whatsapp.png",
      "/assets/avatars/worker_calling.png",
      "/assets/avatars/fos_grievance_officer_complaint.png",
    ],
    background: [
      "/assets/FOS-01.png",
      "/assets/images/vertical_logo.png",
      "/assets/avatars/male_io_notification.png",
      "/assets/avatars/worker_avatar.png",
      "https://fruitofsustainability.com/assets/img/FOS-logo.webp",
      "https://grainy-gradients.vercel.app/noise.svg",
    ],
  },

  module3: {
    critical: [
      "/assets/avatars/officer_pc.png",
      "assets/vertical_logo.png",
    ],
    background: [
      "/assets/vertical_logo.png",
      "/assets/avatars/fos_grievance_officer_avatar_training.png",
      "/assets/avatars/worker_neutral.png",
      "/assets/avatars/worker_sad.png",
      "/assets/avatars/worker_happy.png",
      "/assets/avatars/officer1.png",
      "/assets/avatars/officer2.png",
    ],
  },

  module4: {
    critical: [
      "/assets/images/FOS-01.png",
      "/assets/images/logo.png",
    ],
    background: [
      "/assets/FOS-01.png",
      "/assets/images/company_a.png",
      "/assets/avatars/worker_avatar.png",
    ],
  },

  module5: {
    critical: [
      "/assets/vertical_logo.png",
      "/assets/company_logo.png",
      "/assets/jscharting.js",
      "/assets/types.js",
    ],
    background: [
      "/assets/images/bounce_image.png",
      "/assets/images/bounce_image1.png",
      "/assets/images/unclosed_image.png",
      "/assets/bounced_image.png",
      "/assets/bounced_image1.png",
      "/assets/unclosed_image.png",
      "/assets/setup1.jpeg",
      "/assets/setup2.jpeg",
      "/assets/setup3.jpeg",
      "/assets/fos_video.mp4",
      "/placeholder.svg",
    ],
  },
}
