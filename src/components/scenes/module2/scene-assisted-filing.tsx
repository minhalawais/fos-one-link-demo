"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Headset,
  Phone,
  MessageCircle,
  Mail,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Search,
  Calendar,
  Upload,
  HardHat,
  Users,
  Baby,
  DollarSign,
  Clock,
  AlertTriangle,
  Scale,
  Briefcase,
  Globe,
  ShieldAlert,
  Gavel,
  MessageSquareQuote,
} from "lucide-react"
import { useState, useEffect } from "react"

const COMPLAINT_CATEGORIES = [
  { icon: HardHat, label: "Workplace Health, Safety and Environment" },
  { icon: Users, label: "Freedom of Association" },
  { icon: Baby, label: "Child Labor" },
  { icon: DollarSign, label: "Wages & Benefits" },
  { icon: Clock, label: "Working Hours" },
  { icon: AlertTriangle, label: "Forced Labor" },
  { icon: Scale, label: "Discrimination" },
  { icon: Briefcase, label: "Unfair Employment" },
  { icon: Globe, label: "Ethical Business" },
  { icon: ShieldAlert, label: "Harassment" },
  { icon: Gavel, label: "Workplace Discipline" },
  { icon: MessageSquareQuote, label: "Employee Feedback/Suggestion" },
]

interface FormDataState {
  fosId: string
  name: string
  company: string
  workerType: string
  department: string
  designation: string
  gender: string
  mobile: string
  date: string
}

const smoothSpring = { type: "spring", stiffness: 300, damping: 30 }
const gentleSpring = { type: "spring", stiffness: 200, damping: 25 }
const microInteraction = { type: "spring", stiffness: 400, damping: 25 }

export const SceneAssistedFiling = ({ isActive }: { isActive: boolean }) => {
  const [stage, setStage] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [formData, setFormData] = useState<FormDataState>({
    fosId: "",
    name: "",
    company: "",
    workerType: "",
    department: "",
    designation: "",
    gender: "",
    mobile: "",
    date: "",
  })
  const [showComments, setShowComments] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [typingField, setTypingField] = useState<string | null>(null)

  useEffect(() => {
    if (isActive) {
      // Reset state
      setStage(0)
      setSelectedCategory(null)
      setFormData({
        fosId: "",
        name: "",
        company: "",
        workerType: "",
        department: "",
        designation: "",
        gender: "",
        mobile: "",
        date: "",
      })
      setShowComments(false)
      setShowUpload(false)
      setTypingField(null)

      // Timeline based on voiceover (22.96s - 44.56s = ~21.6s duration)
      const timers = [
        // Stage 1: Show worker with communication channels (0s - Phone/SMS/WhatsApp/Email channels appear)
        setTimeout(() => setStage(1), 500),

        // Stage 2: Connection established, officer appears (around 6.4s mark - "trained FOS grievance officers")
        setTimeout(() => setStage(2), 6400),

        // Stage 3: Form appears, start filling (around 9.52s - "help them file their cases")
        setTimeout(() => setStage(3), 9520),

        // Counter questions - extracting info (around 14.8s - "ask counter questions")
        setTimeout(() => {
          setTypingField("fosId")
          setFormData((prev) => ({ ...prev, fosId: "FOS-2024-" }))
        }, 10500),
        setTimeout(() => {
          setFormData((prev) => ({ ...prev, fosId: "FOS-2024-78542" }))
          setTypingField("name")
        }, 11200),
        setTimeout(() => {
          setFormData((prev) => ({ ...prev, name: "Ahmed Khan" }))
          setTypingField("company")
        }, 12000),
        setTimeout(() => {
          setFormData((prev) => ({ ...prev, company: "Pearl Textile Mills" }))
          setTypingField("workerType")
        }, 12800),
        setTimeout(() => {
          setFormData((prev) => ({ ...prev, workerType: "Machine Operator" }))
          setTypingField("department")
        }, 13600),
        setTimeout(() => {
          setFormData((prev) => ({ ...prev, department: "Spinning Unit" }))
          setTypingField("mobile")
        }, 14400),
        setTimeout(() => {
          setFormData((prev) => ({ ...prev, mobile: "+92 300 1234567" }))
          setTypingField("date")
        }, 15200),
        setTimeout(() => {
          setFormData((prev) => ({ ...prev, date: "15/11/2024" }))
          setTypingField(null)
        }, 16000),

        // Stage 4: Category selection (around 17s - "verify details")
        setTimeout(() => {
          setStage(4)
          setSelectedCategory(0) // Workplace Health selected
        }, 17000),

        // Stage 5: Additional fields appear (around 18.5s)
        setTimeout(() => {
          setShowComments(true)
        }, 18500),
        setTimeout(() => {
          setShowUpload(true)
        }, 19500),

        // Stage 6: Submit success (around 21s - "launch complaint on their behalf")
        setTimeout(() => setStage(5), 21000),
      ]

      return () => timers.forEach(clearTimeout)
    }
  }, [isActive])

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F5F5F7] via-white to-[#E8EEF1] relative overflow-hidden font-sans p-4">
      {/* Subtle Background Gradients */}
      <div className="absolute inset-0 z-0 opacity-30">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#60BA81]/30 to-[#284952]/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute -bottom-1/4 -right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-[#F5A83C]/25 to-[#60BA81]/15 rounded-full blur-[90px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl flex items-center justify-center gap-8 px-4">
        {/* LEFT: Worker with Communication Channels */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, x: -60, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={smoothSpring}
        >
          <div className="relative w-28 h-28">
            <motion.div
              className="w-full h-full rounded-full bg-white shadow-xl flex items-center justify-center relative z-10 border-4 border-white"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <User size={44} className="text-[#284952]" strokeWidth={1.5} />
            </motion.div>

            {/* Communication Channels Orbiting */}
            {stage >= 1 && (
              <>
                {[
                  { Icon: Phone, angle: 0, color: "#60BA81", label: "Phone" },
                  { Icon: MessageCircle, angle: 90, color: "#F5A83C", label: "SMS/WhatsApp" },
                  { Icon: Mail, angle: 180, color: "#284952", label: "Email" },
                ].map(({ Icon, angle, color }, i) => (
                  <motion.div
                    key={i}
                    className="absolute left-1/2 top-1/2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      x: 55 * Math.cos((angle * Math.PI) / 180) - 16,
                      y: 55 * Math.sin((angle * Math.PI) / 180) - 16,
                    }}
                    transition={{ delay: i * 0.15, ...microInteraction }}
                  >
                    <motion.div
                      className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: color }}
                      animate={{
                        y: [0, -3, 0],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.3,
                        ease: "easeInOut",
                      }}
                    >
                      <Icon size={14} className="text-white" strokeWidth={2.5} />
                    </motion.div>
                  </motion.div>
                ))}

                {/* Pulse Waves */}
                <motion.div
                  animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeOut" }}
                  className="absolute inset-0 bg-[#60BA81]/30 rounded-full"
                />
              </>
            )}
          </div>

          <div className="text-center">
            <motion.h3
              className="text-lg font-semibold text-[#1d1d1f]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Worker
            </motion.h3>
            <motion.p
              className="text-xs text-[#86868b] mt-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Phone / SMS / WhatsApp / Email
            </motion.p>
          </div>
        </motion.div>

        {/* CENTER: Animated Connection Line */}
        <div className="hidden lg:flex flex-col items-center gap-3">
          <motion.div
            className="relative w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#60BA81] via-[#F5A83C] to-[#284952]"
              initial={{ width: "0%" }}
              animate={{ width: stage >= 2 ? "100%" : "0%" }}
              transition={{ duration: 1.5, ease: [0.32, 0.72, 0, 1] }}
            />
          </motion.div>

          <motion.div
            className="p-2.5 rounded-full bg-white shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: stage >= 2 ? 1 : 0.7,
              rotate: stage >= 2 ? 0 : -180,
              backgroundColor: stage >= 2 ? "#60BA81" : "#E5E7EB",
            }}
            transition={gentleSpring}
          >
            <ArrowRight size={18} className={stage >= 2 ? "text-white" : "text-gray-400"} strokeWidth={2.5} />
          </motion.div>

          <motion.p
            className="text-[10px] text-[#86868b] font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 2 ? 1 : 0 }}
            transition={{ delay: 0.3 }}
          >
            Assisted Filing
          </motion.p>
        </div>

        {/* RIGHT: FOS Officer Interface with Form */}
        <motion.div
          className="relative w-full max-w-xl"
          initial={{ opacity: 0, x: 60, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ ...smoothSpring, delay: 0.2 }}
        >
          <motion.div
            className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 overflow-hidden"
            whileHover={{ y: -2 }}
            transition={gentleSpring}
          >
            {/* Header - Gradient like the form */}
            <div className="bg-gradient-to-r from-[#60BA81] to-[#284952] p-5 flex items-center gap-3">
              <div className="relative">
                <motion.div
                  className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                >
                  <Headset size={26} className="text-white" strokeWidth={2} />
                </motion.div>
                <motion.div
                  className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#60BA81] border-2 border-white rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
              <div className="flex-1">
                <motion.h4 className="text-white font-semibold text-base">FOS Grievance Officer</motion.h4>
                <div className="flex items-center gap-2 mt-1">
                  <motion.span
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <span className="text-white/90 text-xs font-medium">
                    {stage < 3 ? "Connecting..." : "Assisting Live"}
                  </span>
                </div>
              </div>
              {stage >= 5 && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={microInteraction}
                >
                  <CheckCircle2 size={28} className="text-white" strokeWidth={2} />
                </motion.div>
              )}
            </div>

            {/* Form Content */}
            <div className="p-5">
              <AnimatePresence mode="wait">
                {stage < 3 ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="h-[380px] flex flex-col items-center justify-center gap-4"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Sparkles size={40} className="text-[#F5A83C]" strokeWidth={1.5} />
                    </motion.div>
                    <div className="text-center">
                      <h5 className="text-sm font-semibold text-[#1d1d1f] mb-1">
                        {stage < 2 ? "Receiving Call..." : "Preparing Assistance..."}
                      </h5>
                      <p className="text-xs text-[#86868b]">
                        {stage < 2 ? "Worker is reaching out" : "Verifying worker details"}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={smoothSpring}
                    className="space-y-4"
                  >
                    {/* FOS ID Search */}
                    <motion.div
                      className="bg-[#F5F5F7] rounded-xl p-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <label className="text-[10px] font-semibold text-[#86868b] uppercase tracking-wide block mb-2">
                        FOS ID - فوس آئی ڈی
                      </label>
                      <div className="flex gap-2">
                        <FormInput
                          value={formData.fosId}
                          isTyping={typingField === "fosId"}
                          placeholder="Enter FOS ID or CNIC"
                          className="flex-1"
                        />
                        <motion.button
                          className="px-4 py-2 bg-[#F5A83C] text-white rounded-lg text-xs font-semibold"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Search size={14} />
                        </motion.button>
                      </div>
                    </motion.div>

                    {/* Form Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <FormField
                        label="Name - نام"
                        value={formData.name}
                        isTyping={typingField === "name"}
                        placeholder="Enter your name"
                        delay={0}
                      />
                      <FormField
                        label="Company - کمپنی"
                        value={formData.company}
                        isTyping={typingField === "company"}
                        placeholder="Enter company name"
                        delay={0.1}
                      />
                      <FormField
                        label="Worker Type - کارکن کی قسم"
                        value={formData.workerType}
                        isTyping={typingField === "workerType"}
                        placeholder="Enter worker type"
                        delay={0.2}
                      />
                      <FormField
                        label="Department - شعبہ"
                        value={formData.department}
                        isTyping={typingField === "department"}
                        placeholder="Enter department"
                        delay={0.3}
                      />
                      <FormField
                        label="Mobile Number - موبائل نمبر"
                        value={formData.mobile}
                        isTyping={typingField === "mobile"}
                        placeholder="Enter mobile number"
                        delay={0.4}
                      />
                      <FormField
                        label="Date of Incident - تاریخ"
                        value={formData.date}
                        isTyping={typingField === "date"}
                        placeholder="mm/dd/yyyy"
                        icon={<Calendar size={12} className="text-[#86868b]" />}
                        delay={0.5}
                      />
                    </div>

                    {/* Complaint Categories */}
                    {stage >= 4 && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={gentleSpring}
                        className="space-y-2"
                      >
                        <label className="text-[10px] font-semibold text-[#86868b] uppercase tracking-wide">
                          Complaint Category - شکایت کی قسم
                        </label>
                        <div className="grid grid-cols-6 gap-2">
                          {COMPLAINT_CATEGORIES.slice(0, 6).map((cat, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: i * 0.05, ...microInteraction }}
                              onClick={() => setSelectedCategory(i)}
                              className={`
                                relative p-2 rounded-xl border-2 flex flex-col items-center gap-1 cursor-pointer transition-all
                                ${
                                  selectedCategory === i
                                    ? "bg-[#60BA81] border-[#60BA81] shadow-lg"
                                    : "bg-white border-[#DEE2E6] hover:border-[#60BA81]/50"
                                }
                              `}
                            >
                              <cat.icon
                                size={16}
                                className={selectedCategory === i ? "text-white" : "text-[#284952]"}
                                strokeWidth={1.5}
                              />
                              <span
                                className={`text-[7px] font-medium leading-tight text-center line-clamp-2 ${
                                  selectedCategory === i ? "text-white" : "text-[#17161A]"
                                }`}
                              >
                                {cat.label.split(" ").slice(0, 2).join(" ")}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Additional Comments */}
                    {showComments && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={gentleSpring}
                      >
                        <label className="text-[10px] font-semibold text-[#86868b] uppercase tracking-wide block mb-2">
                          Additional Comments - اضافی تبصرے
                        </label>
                        <motion.div
                          className="bg-[#F5F5F7] rounded-xl p-3 h-14 flex items-center justify-center"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <span className="text-xs text-[#86868b]">Recording details from call...</span>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* File Upload */}
                    {showUpload && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ ...gentleSpring, delay: 0.1 }}
                      >
                        <label className="text-[10px] font-semibold text-[#86868b] uppercase tracking-wide block mb-2 flex items-center gap-1">
                          <Upload size={10} />
                          Upload Supporting Documents
                        </label>
                        <div className="border-2 border-dashed border-[#60BA81] rounded-xl p-3 bg-[#60BA81]/5 flex items-center justify-center">
                          <span className="text-xs text-[#284952] font-medium">Drag and drop files here</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Submit */}
                    {stage >= 5 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={gentleSpring}
                        className="pt-2"
                      >
                        <motion.button
                          className="w-full py-3 bg-gradient-to-r from-[#F5A83C] to-[#e69426] text-white rounded-xl font-semibold text-sm shadow-lg"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          animate={{
                            boxShadow: [
                              "0 4px 15px rgba(245, 168, 60, 0.3)",
                              "0 8px 25px rgba(245, 168, 60, 0.5)",
                              "0 4px 15px rgba(245, 168, 60, 0.3)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <CheckCircle2 size={16} />
                            Complaint Filed Successfully
                          </span>
                        </motion.button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Helper Text */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <p className="text-xs text-[#86868b] text-center max-w-md">
          Helpful for workers who aren't comfortable using digital forms
        </p>
      </motion.div>
    </div>
  )
}

// Form Field Component
const FormField = ({
  label,
  value,
  isTyping,
  placeholder,
  icon,
  delay = 0,
}: {
  label: string
  value: string
  isTyping?: boolean
  placeholder: string
  icon?: React.ReactNode
  delay?: number
}) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
    <label className="text-[9px] font-semibold text-[#86868b] uppercase tracking-wide block mb-1">{label}</label>
    <FormInput value={value} isTyping={isTyping} placeholder={placeholder} icon={icon} />
  </motion.div>
)

// Form Input Component
const FormInput = ({
  value,
  isTyping,
  placeholder,
  icon,
  className = "",
}: {
  value: string
  isTyping?: boolean
  placeholder: string
  icon?: React.ReactNode
  className?: string
}) => (
  <div className={`relative ${className}`}>
    <motion.div
      className={`
        w-full px-3 py-2 rounded-lg text-xs border-2 transition-all
        ${
          isTyping
            ? "border-[#60BA81] bg-[#60BA81]/5"
            : value
              ? "border-[#60BA81]/30 bg-white"
              : "border-[#DEE2E6] bg-white"
        }
      `}
    >
      <span className={value ? "text-[#17161A]" : "text-[#767676]"}>{value || placeholder}</span>
      {isTyping && (
        <motion.span
          className="inline-block w-0.5 h-3 bg-[#60BA81] ml-0.5"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        />
      )}
    </motion.div>
    {icon && <div className="absolute right-3 top-1/2 -translate-y-1/2">{icon}</div>}
  </div>
)
