import React from "react"
import { motion } from "framer-motion"
import { Upload } from "lucide-react"
import { Card3D } from "./Card3D.tsx"
import { ProgressRing } from "./ProgressRing.tsx"

export const UploadProgressVisual = ({ progress, active }: any) => {
    if (!active) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50"
        >
            <Card3D className="px-6 py-4 min-w-[300px]">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <ProgressRing progress={progress} size={60} strokeWidth={6} />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm font-bold text-[#284952]">{Math.round(progress)}%</span>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <Upload size={16} className="text-[#60BA81]" />
                            <span className="text-sm font-bold text-[#284952]">Uploading Records</span>
                        </div>
                        <div className="text-xs text-gray-500">
                            Processing employee data...
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[#60BA81] to-[#F5A83C]"
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </div>
                </div>
            </Card3D>
        </motion.div>
    )
}
