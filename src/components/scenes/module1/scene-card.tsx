"use client"

import { motion } from "framer-motion"
import { Phone, MessageSquare, Mail, QrCode, ScanLine } from "lucide-react"

// --- BRAND PALETTE ---
const COLORS = {
  DeepTeal: "#284952",
  FreshGreen: "#60BA81",
  WarmOrange: "#F5A83C",
  Charcoal: "#17161A",
  LightGray: "#F5F5F7",
  White: "#FFFFFF",
}

export const SceneCard = ({ isActive }: { isActive: boolean }) => {
  // Animation Variants for Staggered Entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#F5F5F7] relative overflow-hidden perspective-[1200px]">
      
      {/* --- 1. AMBIENT ENVIRONMENT (Apple-style softly breathing background) --- */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-20 blur-[100px]"
          style={{ background: COLORS.FreshGreen }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full opacity-10 blur-[100px]"
          style={{ background: COLORS.DeepTeal }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* --- 2. THE HERO OBJECT (The Card) --- */}
      <motion.div
        className="relative z-10 w-full max-w-[620px] mx-6"
        initial={{ y: 120, rotateX: 15, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, rotateX: 0, opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 120, 
          damping: 20, 
          mass: 1,
          delay: 0.2 
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Card Container - Simulating premium card stock with soft shadow */}
        <div className="bg-white rounded-[24px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] border border-white/60 overflow-hidden flex flex-col">
          
          {/* --- HEADER SECTION --- */}
          <div className="px-6 pt-6 pb-2 flex justify-between items-start gap-4">
            {/* Left Logo (FOS) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="w-[72px] h-[64px] border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center bg-gray-50"
            >
              <div className="relative w-full h-full mb-1 flex items-center justify-center">
                {/* Replace with your actual logo path */}
                <img 
                  src="assets/FOS-01.png" 
                  alt="Fruit of Sustainability" 
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>

            {/* Center: ID Focus (Primary Awareness) */}
            <div className="flex-1 flex flex-col items-center pt-1">
               <motion.div 
                 className="bg-[#3E3B38] text-white px-4 py-1.5 rounded-lg shadow-sm mb-3"
                 initial={{ y: -20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.8 }}
               >
                 <span className="text-[10px] font-bold tracking-widest uppercase">فوس شکایت آگاہی کارڈ</span>
               </motion.div>

               {/* DYNAMIC ID REVEAL - Matches VO "Include their IDs" */}
               <motion.div 
                 className="flex items-baseline gap-2"
                 initial={{ scale: 0.9, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ delay: 1.8, duration: 0.5 }}
               >
                  <span className="text-sm font-bold text-[#3E3B38] opacity-60">ID - فوس</span>
                  <div className="relative">
                    <span className="text-4xl font-black text-[#284952] tracking-tight">475002</span>
                    {/* Subtle highlight burst behind ID */}
                    <motion.div 
                      className="absolute inset-0 bg-[#60BA81] blur-xl rounded-full -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.4, 0] }}
                      transition={{ delay: 2.0, duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
               </motion.div>
            </div>

            {/* Right Logo (Client) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
              className="w-[72px] h-[64px] border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50"
            >
               <div className="text-center">
                 <div className="text-[10px] font-black text-[#F5A83C] italic leading-none">Company A</div>
               </div>
            </motion.div>
          </div>

          {/* --- DATA GRID (Exact Replica of Request) --- */}
          <motion.div 
            className="px-6 py-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
             <div className="border border-gray-300 rounded-lg overflow-hidden flex flex-col text-xs">
                {/* Row 1 */}
                <div className="flex w-full border-b border-gray-300">
                   <div className="flex-1 bg-gray-200 p-2 text-center font-semibold text-[#17161A] border-r border-gray-300">Lahore</div>
                   <div className="flex-1 bg-[#3E3B38] p-2 text-center font-bold text-white border-r border-gray-600 tracking-wide">ڈیپارٹمنٹ</div>
                   <div className="flex-1 bg-gray-200 p-2 text-center font-semibold text-[#17161A]">12322</div>
                </div>
                {/* Row 2 */}
                <div className="flex w-full">
                   <div className="flex-1 bg-[#3E3B38] p-2 text-center font-bold text-white border-r border-gray-600 tracking-wide">کمپنی ID</div>
                   <div className="flex-1 bg-gray-200 p-2 text-center font-semibold text-[#17161A] border-r border-gray-300">Minhal Awais</div>
                   <div className="flex-1 bg-[#3E3B38] p-2 text-center font-bold text-white tracking-wide">نام</div>
                </div>
             </div>
          </motion.div>

          {/* --- CHANNELS & ACTION SECTION --- */}
          <div className="px-6 pt-2 pb-6 flex gap-8 items-end">
            
            {/* Left Column: Channels (Matches VO "Reporting Channels") */}
            <div className="flex-1 flex flex-col gap-2">
               <motion.p 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}
                 className="text-[11px] font-bold text-[#284952] mb-1 text-center md:text-right"
               >
                  آپ مندرجہ ذیل ذرائع سے اپنی شکایات و تجاویز کا اظہار کر سکتے ہیں۔
               </motion.p>
               
               {[
                 { icon: Phone, text: "ٹول فری نمبر - 080091299", delay: 3.0 },
                 { icon: MessageSquare, text: "موبائل ایس ایم ایس و واٹس ایپ - 03299129999", delay: 3.2 },
                 { icon: Mail, text: " hotline@fruitofsustainability.com - ای میل", delay: 3.4 }
               ].map((item, i) => (
                 <motion.div
                   key={i}
                   initial={{ x: -20, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: item.delay, type: "spring", stiffness: 100 }}
                   className="bg-[#3E3B38] text-white rounded-md p-2 pl-3 flex items-center gap-3 shadow-sm hover:bg-[#284952] transition-colors duration-300"
                 >
                    <item.icon size={14} className="text-[#60BA81]" />
                    <span className="text-[10px] md:text-[11px] font-medium tracking-wide truncate">{item.text}</span>
                 </motion.div>
               ))}
            </div>

            {/* Right Column: QR / Instructions (Matches VO "Quick Instructions") */}
            <motion.div 
              className="w-[100px] shrink-0 flex flex-col items-center gap-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 4.0, type: "spring" }}
            >
               <div className="text-[10px] font-bold text-[#767676] text-center leading-tight">
               رہنمائی کے لیے اسے 
               اسکین کریں۔
               </div>
               
               {/* QR Container */}
               <div className="relative bg-white p-1.5 rounded-lg border-2 border-dashed border-[#60BA81] shadow-md overflow-hidden group">
                  <QrCode size={72} className="text-[#17161A]" />
                  
                  {/* Scanning Animation */}
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-[2px] bg-[#F5A83C] shadow-[0_0_10px_#F5A83C]"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Corner Brackets */}
                  <div className="absolute top-0.5 left-0.5 w-2 h-2 border-t-2 border-l-2 border-[#60BA81]" />
                  <div className="absolute top-0.5 right-0.5 w-2 h-2 border-t-2 border-r-2 border-[#60BA81]" />
                  <div className="absolute bottom-0.5 left-0.5 w-2 h-2 border-b-2 border-l-2 border-[#60BA81]" />
                  <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b-2 border-r-2 border-[#60BA81]" />
               </div>
            </motion.div>
          </div>

        </div>

        {/* Reflection / Sheen Overlay (The "Apple Glass" Touch) */}
        <motion.div 
           className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-[24px] pointer-events-none z-20"
           initial={{ x: "-100%" }}
           animate={{ x: "100%" }}
           transition={{ delay: 1.5, duration: 1.5, ease: "easeInOut" }}
        />
      </motion.div>

    </div>
  )
}