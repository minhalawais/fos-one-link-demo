"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Lock,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Chrome,
  Fingerprint,
  KeyRound,
} from "lucide-react"

const COLORS = {
  deepTeal: "#284952",
  freshGreen: "#60BA81",
  warmOrange: "#F5A83C",
  charcoal: "#17161A",
  mediumGray: "#767676",
  bg: "#F5F5F7",
  border: "#DEE2E6",
  white: "#FFFFFF",
}

const EASE = [0.32, 0.72, 0, 1]

const OFFICERS = [
  {
    id: "IO-MULTAN47",
    name: "Awais Khan",
    role: "Unit Officer",
    avatar: "/assets/avatars/male_io.png",
    username: "io.multan47",
    password: "FOS@Multan47",
    email: "io.multan47@fruitofsustainability.com",
  },
  {
    id: "IO-HR-21",
    name: "Sara Ahmed",
    role: "Harassment Officer",
    avatar: "/assets/avatars/female_io.png",
    username: "io.hr21",
    password: "FOS@HR21",
    email: "io.hr21@fruitofsustainability.com",
  },
  {
    id: "IO-HSE-09",
    name: "Usman Raza",
    role: "Safety Officer",
    avatar: "/assets/avatars/investigation_officer_avatar.png",
    username: "io.hse09",
    password: "FOS@HSE09",
    email: "io.hse09@fruitofsustainability.com",
  },
]

function revealMasked(value: string, local: number, start: number, duration: number, mask = "•") {
  if (local <= start) return mask.repeat(value.length)
  if (local >= start + duration) return value
  const progress = (local - start) / duration
  const count = Math.floor(progress * value.length)
  return `${value.slice(0, count)}${mask.repeat(Math.max(0, value.length - count))}`
}

const CredentialRow = ({ label, icon: Icon, value, active }: { label: string, icon: any, value: string, active: boolean }) => (
  <motion.div
    animate={{
      borderColor: active ? "rgba(96,186,129,0.6)" : "rgba(222,226,230,1)",
      backgroundColor: active ? "rgba(96,186,129,0.06)" : "rgba(255,255,255,0.9)",
    }}
    className="rounded-xl border px-3 py-2.5"
  >
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-white border border-gray-100 flex items-center justify-center">
          <Icon size={12} style={{ color: COLORS.deepTeal }} />
        </div>
        <span className="text-[10px] uppercase font-bold tracking-[0.14em] text-gray-400">{label}</span>
      </div>
      <span className="text-[11px] font-mono font-bold" style={{ color: COLORS.deepTeal }}>{value}</span>
    </div>
  </motion.div>
)

const CredentialEngine = ({ local, officer }: { local: number, officer: (typeof OFFICERS)[0] }) => {
  const user = revealMasked(officer.username, local, 0.7, 0.8)
  const pass = revealMasked(officer.password, local, 1.5, 0.9)
  const email = revealMasked(officer.email, local, 2.4, 1.0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="w-[440px] rounded-3xl border border-white/70 bg-white/90 backdrop-blur-xl p-5 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)]"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">Credential Engine</p>
          <h3 className="text-lg font-black" style={{ color: COLORS.deepTeal }}>Generating Secure IO Access</h3>
        </div>
        <div className="w-10 h-10 rounded-xl border border-green-100 bg-green-50 flex items-center justify-center">
          <Fingerprint size={18} style={{ color: COLORS.freshGreen }} />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-3 mb-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 bg-white p-1">
          <img src={officer.avatar} alt={officer.role} className="w-full h-full object-contain" />
        </div>
        <div>
          <p className="text-xs font-bold" style={{ color: COLORS.deepTeal }}>{officer.name}</p>
          <p className="text-[10px] text-gray-400 font-mono">{officer.id}</p>
        </div>
      </div>

      <div className="space-y-2.5">
        <CredentialRow label="Username" icon={User} value={user} active={local > 0.8} />
        <CredentialRow label="Password" icon={Lock} value={pass} active={local > 1.6} />
        <CredentialRow label="Email" icon={Mail} value={email} active={local > 2.5} />
      </div>
    </motion.div>
  )
}

const AssignmentView = ({ local }: { local: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="w-full max-w-6xl px-6"
  >
    <div className="text-center mb-5">
      <p className="text-[10px] uppercase tracking-[0.18em] font-black text-gray-400">Secure Distribution</p>
      <h3 className="text-2xl font-black" style={{ color: COLORS.deepTeal }}>Credentials Assigned To Investigation Officers</h3>
    </div>

    <div className="relative flex flex-col md:flex-row justify-center items-center gap-5">
      <div className="absolute left-1/2 top-10 -translate-x-1/2 hidden md:block">
        <div className="w-24 h-24 rounded-full border border-dashed border-green-200 bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
          <KeyRound size={28} style={{ color: COLORS.freshGreen }} />
        </div>
      </div>

      {OFFICERS.map((officer, i) => {
        const granted = local > 4.4 + i * 0.7
        return (
          <motion.div
            key={officer.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            className="w-72 rounded-2xl border border-white/70 bg-white/90 backdrop-blur-sm p-4 shadow-[0_14px_40px_-24px_rgba(15,23,42,0.4)] relative"
          >
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 bg-gray-50 p-1">
                <img src={officer.avatar} alt={officer.role} className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: COLORS.deepTeal }}>{officer.role}</p>
                <p className="text-[10px] font-mono text-gray-400">{officer.id}</p>
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-gray-100 bg-gray-50/80 p-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-wider font-bold text-gray-400">Portal Access</span>
                <motion.div
                  animate={{ scale: granted ? [1, 1.1, 1] : 1 }}
                  transition={{ duration: 0.8, repeat: granted ? Infinity : 0 }}
                >
                  {granted ? <CheckCircle2 size={14} className="text-green-500" /> : <ShieldCheck size={14} className="text-gray-300" />}
                </motion.div>
              </div>
              <p className="text-[11px] font-mono font-bold mt-1" style={{ color: granted ? COLORS.deepTeal : COLORS.mediumGray }}>
                {granted ? officer.username : "Pending secure assignment..."}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  </motion.div>
)

const LoginPreview = ({ local }: { local: number }) => {
  const officerIndex = Math.min(OFFICERS.length - 1, Math.floor((local - 8) / 2))
  const officer = OFFICERS[Math.max(0, officerIndex)]

  const username = revealMasked(officer.username, local, 8.2, 1.0, "_")
  const password = revealMasked(officer.password, local, 9.5, 0.9, "•")
  const canSubmit = local > 10.8

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.74 }}
      animate={{ opacity: 1, y: 0, scale: 0.78 }}
      className="w-full max-w-[980px] rounded-[24px] border border-white/70 bg-white/65 backdrop-blur-xl px-2.5 py-3 md:px-4 md:py-4 shadow-[0_25px_50px_-12px_rgba(40,73,82,0.12)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1.3fr_auto_1fr] items-stretch gap-0">
        <div className="rounded-3xl lg:rounded-none lg:rounded-l-3xl bg-white/55 px-4 py-5 text-center lg:mt-[70px]">
          <div className="w-12 h-12 mx-auto rounded-2xl border border-[#60BA81] bg-gradient-to-br from-[#60BA81]/10 to-[#284952]/5 flex items-center justify-center mb-4 transition-all duration-300">
            <Fingerprint size={22} color={COLORS.freshGreen} />
          </div>
          <h4 className="font-black text-[19px] leading-tight mb-2" style={{ color: COLORS.deepTeal, fontFamily: "'Space Grotesk', sans-serif" }}>
            Login Via OTP
          </h4>
          <p className="text-xs leading-relaxed mb-4" style={{ color: COLORS.mediumGray }}>
            Sign in without a password. You’ll receive a one-time code at your registered email.
          </p>

          <div className="text-left mb-3">
            <label className="block text-[10px] uppercase tracking-[2px] font-black mb-2" style={{ color: COLORS.freshGreen }}>
              Email Address
            </label>
            <div className="h-10 rounded-xl border border-[#DEE2E6] bg-white/95 px-3 flex items-center">
              <span className="text-xs" style={{ color: COLORS.mediumGray }}>name@abc.com</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full h-10 rounded-xl border-2 border-[#DEE2E6] bg-white/90 text-xs font-bold tracking-[0.05em] uppercase transition-all"
            style={{ color: COLORS.deepTeal }}
          >
            Send Code
          </button>
        </div>

        <div className="hidden lg:flex flex-col items-center justify-center px-3 min-h-[360px]">
          <div className="flex-1 w-[2px] bg-gradient-to-b from-transparent via-[#DEE2E6] to-transparent" />
          <span className="w-12 h-12 rounded-full bg-white border-2 border-[#60BA81]/35 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] text-xs font-black uppercase tracking-[0.05em] text-[#284952] flex items-center justify-center">
            or
          </span>
          <div className="flex-1 w-[2px] bg-gradient-to-b from-transparent via-[#DEE2E6] to-transparent" />
        </div>

        <div className="px-4 py-4 text-center">
          <div className="mb-4 relative">
            <div className="w-[112px] h-[112px] mx-auto mb-4 rounded-full border-2 border-[#60BA81] bg-white shadow-2xl p-3">
              <img src="/assets/images/FOS-01.png" alt="FOS" className="w-full h-full object-contain" />
            </div>
            <h2 className="font-black text-[21px] leading-tight mb-1" style={{ color: COLORS.deepTeal, fontFamily: "'Space Grotesk', sans-serif" }}>
              Login Via Credentials
            </h2>
            <p className="text-xs" style={{ color: COLORS.mediumGray }}>Sign in using your username or email</p>
          </div>

          <div className="w-full max-w-[360px] mx-auto text-left mb-3">
            <label className="block text-[10px] uppercase tracking-[2px] font-black mb-2" style={{ color: COLORS.freshGreen }}>
              Username Or Email
            </label>
            <div className="h-11 rounded-xl border border-[#DEE2E6] bg-white/95 px-3 flex items-center">
              <span className="text-[13px] font-mono" style={{ color: COLORS.charcoal }}>{username}</span>
            </div>
          </div>

          <div className="w-full max-w-[360px] mx-auto text-left mb-3">
            <label className="block text-[10px] uppercase tracking-[2px] font-black mb-2" style={{ color: COLORS.freshGreen }}>
              Password
            </label>
            <div className="h-11 rounded-xl border border-[#DEE2E6] bg-white/95 px-3 flex items-center justify-between">
              <span className="text-[13px] font-mono" style={{ color: COLORS.charcoal }}>{password}</span>
              <Lock size={14} className="text-slate-400" />
            </div>
          </div>

          <div className="w-full max-w-[360px] mx-auto flex items-center justify-between mb-4 px-1">
            <label className="flex items-center gap-3">
              <div className="w-4 h-4 rounded border border-slate-200 bg-white" />
              <span className="text-xs font-semibold text-slate-500">Keep me logged in</span>
            </label>
            <div className="px-3 py-1.5 rounded-full border text-[10px] font-bold" style={{ color: canSubmit ? "#166534" : COLORS.mediumGray, borderColor: canSubmit ? "#bbf7d0" : "#e2e8f0", backgroundColor: canSubmit ? "#f0fdf4" : "#f8fafc" }}>
              {canSubmit ? "AUTH READY" : "WAITING"}
            </div>
          </div>

          <motion.button
            type="button"
            animate={{
              y: canSubmit ? [0, -2, 0] : 0,
              boxShadow: canSubmit
                ? ["0 10px 15px -3px rgba(96,186,129,0.3)", "0 20px 25px -5px rgba(96,186,129,0.5)", "0 10px 15px -3px rgba(96,186,129,0.3)"]
                : "0 10px 15px -3px rgba(96,186,129,0.3)",
            }}
            transition={{ duration: 1.2, repeat: canSubmit ? Infinity : 0 }}
            className="w-full max-w-[360px] h-11 rounded-xl text-white font-bold text-xs uppercase tracking-[2px]"
            style={{ background: "linear-gradient(to bottom right, #60BA81, #60BA81, #4a9965)" }}
          >
            Login
          </motion.button>
        </div>

        <div className="hidden lg:flex flex-col items-center justify-center px-3 min-h-[360px]">
          <div className="flex-1 w-[2px] bg-gradient-to-b from-transparent via-[#DEE2E6] to-transparent" />
          <span className="w-12 h-12 rounded-full bg-white border-2 border-[#60BA81]/35 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] text-xs font-black uppercase tracking-[0.05em] text-[#284952] flex items-center justify-center">
            or
          </span>
          <div className="flex-1 w-[2px] bg-gradient-to-b from-transparent via-[#DEE2E6] to-transparent" />
        </div>

        <div className="rounded-3xl lg:rounded-none lg:rounded-r-3xl bg-white/55 px-4 py-5 text-center lg:mt-[70px]">
          <div className="w-12 h-12 mx-auto rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center mb-4 transition-all duration-300">
            <Chrome size={22} color="#4285F4" />
          </div>
          <h4 className="font-black text-[19px] leading-tight mb-2" style={{ color: COLORS.deepTeal, fontFamily: "'Space Grotesk', sans-serif" }}>
            Login Via Google
          </h4>
          <p className="text-xs leading-relaxed mb-3" style={{ color: COLORS.mediumGray }}>
            Sign in using your Google account.
          </p>

          <div className="w-full bg-blue-50/80 border border-blue-100 rounded-xl p-3 mb-6 text-left">
            <p className="text-[11px] leading-relaxed text-blue-700">
              <strong>Not registered?</strong> Contact hrdd@fruitofsustainability.com to link your Gmail account.
            </p>
          </div>

          <button
            type="button"
            className="w-full h-10 rounded-xl border-2 border-[#DEE2E6] bg-white/90 text-xs font-bold tracking-[0.05em] flex items-center justify-center gap-2"
            style={{ color: "#DB4437" }}
          >
            <Chrome size={15} />
            Continue with Google
          </button>

          <div className="mt-4 rounded-2xl border border-gray-100 bg-white/90 p-2.5 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 bg-gray-50 p-1">
              <img src={officer.avatar} alt={officer.role} className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-left" style={{ color: COLORS.deepTeal }}>{officer.role}</p>
              <p className="text-[9px] font-mono text-left text-gray-400">Assigned: {officer.username}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ScenePortal({ isActive, progress }: { isActive: boolean; progress: number }) {
  const sceneStart = 120
  const local = isActive ? Math.max(0, Math.min(14, progress - sceneStart)) : 0

  const phase = local < 4 ? "generate" : local < 8 ? "assign" : "login"
  const activeOfficer = OFFICERS[Math.min(OFFICERS.length - 1, Math.floor(local / 1.5))]

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ backgroundColor: COLORS.bg }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#284952 1px, transparent 1px), linear-gradient(90deg, #284952 1px, transparent 1px)", backgroundSize: "42px 42px" }} />
        <motion.div
          animate={{ scale: [1, 1.12, 1], x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] right-[-10%] w-[560px] h-[560px] rounded-full blur-[120px] bg-[#60BA81]/20"
        />
        <motion.div
          animate={{ scale: [1, 1.18, 1], x: [0, -25, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-25%] left-[-8%] w-[500px] h-[500px] rounded-full blur-[120px] bg-[#284952]/16"
        />
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {phase === "generate" && (
            <motion.div key="generate" className="flex flex-col md:flex-row items-center gap-8">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-[290px] rounded-2xl border border-white/70 bg-white/85 backdrop-blur-sm p-4 shadow-[0_18px_45px_-26px_rgba(15,23,42,0.5)]"
              >
                <p className="text-[10px] uppercase tracking-[0.16em] font-black text-gray-400 mb-2">Officer Identity</p>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-200 bg-white p-1">
                    <img src={activeOfficer.avatar} alt={activeOfficer.role} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: COLORS.deepTeal }}>{activeOfficer.name}</p>
                    <p className="text-[10px] font-mono text-gray-400">{activeOfficer.id}</p>
                  </div>
                </div>
              </motion.div>

              <CredentialEngine local={local} officer={activeOfficer} />
            </motion.div>
          )}

          {phase === "assign" && <AssignmentView key="assign" local={local} />}

          {phase === "login" && <LoginPreview key="login" local={local} />}
        </AnimatePresence>
      </div>
    </div>
  )
}
