// ... (imports remain)
import { motion } from "framer-motion"
import { ShieldCheck, Zap, Lock, ScanFace } from "lucide-react"

const IOS_EASE = [0.32, 0.72, 0, 1]

export const SceneIntro = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F5F5F7] overflow-hidden font-sans">

      {/* Dynamic Background Gradient */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vh] h-[150vh] min-w-[800px] bg-gradient-to-tr from-[#60BA81]/10 via-[#284952]/5 to-transparent rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center">

        {/* Main Icon Composition */}
        <div className="relative mb-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative z-20 w-32 h-32 bg-gradient-to-br from-[#284952] to-[#1a2e33] rounded-[2.5rem] shadow-2xl shadow-[#284952]/30 flex items-center justify-center text-white"
          >
            <ScanFace size={56} strokeWidth={1.5} />

            {/* Security Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="absolute -top-3 -right-3 w-10 h-10 bg-[#60BA81] rounded-full flex items-center justify-center border-4 border-[#F5F5F7] shadow-lg"
            >
              <Lock size={16} className="text-white" />
            </motion.div>

            {/* Speed Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="absolute -bottom-3 -left-3 w-10 h-10 bg-[#F5A83C] rounded-full flex items-center justify-center border-4 border-[#F5F5F7] shadow-lg"
            >
              <Zap size={16} className="text-white" />
            </motion.div>
          </motion.div>

          {/* Ripple Effect */}
          <motion.div
            className="absolute inset-0 bg-[#284952]/10 rounded-[2.5rem] blur-xl"
            animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </div>

        {/* Typography */}
        <div className="text-center space-y-2">
          <motion.h1
            initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.3, duration: 0.8, ease: IOS_EASE }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#17161A]"
          >
            Complaint Registration
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: IOS_EASE }}
            className="flex items-center justify-center gap-6 mt-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F5A83C]" />
              <span className="text-lg font-medium text-[#767676]">Quickly</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#60BA81]" />
              <span className="text-lg font-medium text-[#767676]">Safely</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}