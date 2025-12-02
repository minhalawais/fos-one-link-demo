import { useState } from "react";
import { motion } from "framer-motion";
import CharacterGrievanceOfficer, { OfficerState } from "../components/characters/CharacterGrievanceOfficer";

export default function CharacterDemo() {
    const [state, setState] = useState<OfficerState>("idle");
    const [size, setSize] = useState<"sm" | "md" | "lg">("lg");
    const [showProps, setShowProps] = useState(true);

    const states: OfficerState[] = ["idle", "listening", "speaking", "taking-notes"];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F5F5F7] via-[#E5E1DA] to-[#B3C8CF] flex flex-col items-center justify-center p-8">
            {/* Header */}
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-4xl font-bold text-[#284952] mb-2">
                    FOS Grievance Officer
                </h1>
                <p className="text-[#284952]/60 text-lg">
                    3D Character Component Demo
                </p>
            </motion.div>

            {/* Character Display */}
            <motion.div
                className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50 mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
            >
                <CharacterGrievanceOfficer
                    state={state}
                    size={size}
                    showProps={showProps}
                    animationDelay={0}
                />
            </motion.div>

            {/* Controls */}
            <motion.div
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50 max-w-2xl w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                {/* State Controls */}
                <div className="mb-6">
                    <label className="block text-sm font-bold text-[#284952] mb-3 uppercase tracking-wider">
                        Character State
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {states.map((s) => (
                            <button
                                key={s}
                                onClick={() => setState(s)}
                                className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all ${state === s
                                        ? "bg-[#89A8B2] text-white shadow-lg scale-105"
                                        : "bg-white text-[#284952] hover:bg-[#E5E1DA] shadow-md"
                                    }`}
                            >
                                {s === "taking-notes" ? "Taking Notes" : s.charAt(0).toUpperCase() + s.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Size Controls */}
                <div className="mb-6">
                    <label className="block text-sm font-bold text-[#284952] mb-3 uppercase tracking-wider">
                        Size
                    </label>
                    <div className="flex gap-3">
                        {(["sm", "md", "lg"] as const).map((s) => (
                            <button
                                key={s}
                                onClick={() => setSize(s)}
                                className={`flex-1 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${size === s
                                        ? "bg-[#60BA81] text-white shadow-lg scale-105"
                                        : "bg-white text-[#284952] hover:bg-[#E5E1DA] shadow-md"
                                    }`}
                            >
                                {s.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Props Toggle */}
                <div>
                    <label className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md cursor-pointer hover:bg-[#F1F0E8] transition-all">
                        <span className="text-sm font-bold text-[#284952] uppercase tracking-wider">
                            Show Props (Badge & Tablet)
                        </span>
                        <input
                            type="checkbox"
                            checked={showProps}
                            onChange={(e) => setShowProps(e.target.checked)}
                            className="w-5 h-5 accent-[#89A8B2]"
                        />
                    </label>
                </div>
            </motion.div>

            {/* Usage Instructions */}
            <motion.div
                className="mt-8 max-w-2xl w-full bg-[#284952]/5 backdrop-blur-sm rounded-2xl p-6 border border-[#89A8B2]/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <h3 className="text-lg font-bold text-[#284952] mb-3">Usage Example:</h3>
                <pre className="bg-[#2D3436] text-[#60BA81] p-4 rounded-lg overflow-x-auto text-xs">
                    {`import { CharacterGrievanceOfficer } from '@/components/characters';

<CharacterGrievanceOfficer 
  state="listening"
  size="lg"
  showProps={true}
  animationDelay={0.2}
  className="mx-auto"
/>`}
                </pre>
            </motion.div>

            {/* Footer Info */}
            <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <p className="text-sm text-[#284952]/40 font-medium">
                    Pure CSS + Framer Motion • No images required • Fully responsive
                </p>
            </motion.div>
        </div>
    );
}
