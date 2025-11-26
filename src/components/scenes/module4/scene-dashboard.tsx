"use client"

import { motion } from "framer-motion"
import { Building2, Search, LogOut, ChevronDown, Eye, FileText, Download } from "lucide-react"

const IOS_EASE = [0.32, 0.72, 0, 1]

interface SceneDashboardProps {
  isActive: boolean
  progress: number
}

// Site data matching the exact screenshot - with Treedom icons
const SITES = [
  { name: "(OLD) F-7", hasLogo: true },
  { name: "1 COMMERCIAL", hasLogo: true },
  { name: "BAHRIA PHASE-4", hasLogo: true },
  { name: "BAHRIA PHASE-7", hasLogo: true },
  { name: "CENTAURUS", hasLogo: true, selected: true },
  { name: "CHAKLALA SCH...", hasLogo: true },
  { name: "F-10 MARKAZ", hasLogo: true },
  { name: "GIGA MALL", hasLogo: true },
  { name: "GOLRA MOR", hasLogo: true },
  { name: "GULBAHAR ROA...", hasLogo: true },
  { name: "Gulberg Green G...", hasLogo: true },
  { name: "HBK ARENA HAY...", hasLogo: true },
]

// Complaints categories data - exact from screenshot
const COMPLAINT_CATEGORIES = [
  { name: "Workplace Health, Safety and Environment", percentage: 0 },
  { name: "Freedom of Association", percentage: 0 },
  { name: "Child Labor", percentage: 0 },
  { name: "Wages & Benefits", percentage: 42 },
  { name: "Working Hours", percentage: 3 },
  { name: "Forced Labor", percentage: 0 },
  { name: "Discrimination", percentage: 0 },
  { name: "Unfair Employment", percentage: 0 },
  { name: "Ethical Business", percentage: 0 },
  { name: "Harassment", percentage: 0 },
  { name: "Workplace Discipline", percentage: 56 },
]

// Gender complaint data - exact from screenshot
const GENDER_DATA = [
  { category: "Workplace Hea...", male: 0, female: 0 },
  { category: "Freedom of Asso...", male: 0, female: 0 },
  { category: "Child Labor", male: 0, female: 0 },
  { category: "Wages & Benefi...", male: 16, female: 0 },
  { category: "Working Hours", male: 1, female: 0 },
  { category: "Forced Labor", male: 0, female: 0 },
  { category: "Discrimination", male: 0, female: 0 },
  { category: "Unfair Employme...", male: 0, female: 0 },
  { category: "Ethical Business...", male: 0, female: 0 },
  { category: "Harassment", male: 0, female: 0 },
  { category: "Discipline", male: 20, female: 0 },
]

// Resolution time data - exact from screenshot
const RESOLUTION_TIME = [
  { label: "Within same day", count: 21 },
  { label: "Within 3 days", count: 3 },
  { label: "Within 10 days", count: 1 },
  { label: "More than 10 days", count: 0 },
]

// Survey reports - exact from screenshot
const SURVEY_REPORTS = [
  { title: "Exit Interview Report June-25", date: "Jul 10, 2025", hasView: true },
  {
    title: "Employee Well Being Survey (CHZ Call Centre)",
    date: "Jun 30, 2025",
    hasView: true,
    hasPdf: true,
    hasCsv: true,
  },
  { title: "Quaterly Employee Due Diligence Survey & Assessment Report May-25", date: "Jun 19, 2025", hasView: true },
  { title: "Exit Interview Report May-25", date: "Jun 4, 2025", hasView: true },
]

// Feedback items - exact from screenshot
const FEEDBACK_ITEMS = [
  { title: "Poor Fitting Company Jackets", date: "Nov 13, 2025" },
  { title: "Shift Change Request Denied Unfairly", date: "Nov 12, 2025" },
  { title: "Delayed Clearance Payment Issue", date: "Nov 10, 2025" },
]

export const SceneDashboard = ({ isActive, progress }: SceneDashboardProps) => {
  const sceneStart = 6
  const sceneEnd = 16
  const sceneProgress = Math.max(0, Math.min(1, (progress - sceneStart) / (sceneEnd - sceneStart)))

  // Animation timeline synced with voiceover
  const showDashboard = sceneProgress > 0.05
  const showHeader = sceneProgress > 0.1
  const showFilters = sceneProgress > 0.15
  const showStatCards = sceneProgress > 0.25
  const highlightTotal = sceneProgress > 0.35 && sceneProgress < 0.5
  const highlightOpen = sceneProgress > 0.45 && sceneProgress < 0.6
  const highlightInProcess = sceneProgress > 0.55 && sceneProgress < 0.7
  const highlightResolved = sceneProgress > 0.65 && sceneProgress < 0.8
  const showFullDashboard = sceneProgress > 0.75

  return (
    <div className="w-full h-full bg-[#F5F5F7] relative overflow-hidden font-sans">
      {/* Subtle ambient glow */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#60BA81]/5 rounded-full blur-[120px]"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      />

      {/* Dashboard Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{
          opacity: showDashboard ? 1 : 0,
          scale: showDashboard ? 1 : 0.95,
          y: showDashboard ? 0 : 30,
        }}
        transition={{ duration: 0.8, ease: IOS_EASE }}
        className="relative z-10 w-full h-full flex flex-col"
      >
        {/* ===== HEADER BAR - Exact match ===== */}
        <motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: showHeader ? 1 : 0, y: showHeader ? 0 : -20 }}
  transition={{ duration: 0.5, ease: IOS_EASE }}
  className="bg-white border-b border-[#DEE2E6] px-4 py-2 flex items-center justify-between"
>
  <div className="flex items-center gap-3">
    {/* FOS Logo */}
    <div className="w-10 h-10 flex items-center justify-center">
      <img 
        src="/assets/vertical_logo.png" 
        alt="Fruit of Sustainability Logo" 
        className="w-32 h-32 object-contain"
        onError={(e) => {
          // Fallback in case FOS logo doesn't load
          e.target.style.display = 'none';
          const fallback = document.createElement('div');
          fallback.className = 'w-10 h-10 bg-[#60BA81] rounded-full flex items-center justify-center text-white text-xs font-bold';
          fallback.textContent = 'FOS';
          e.target.parentNode.appendChild(fallback);
        }}
      />
    </div>
  </div>
  <div className="flex flex-col items-center">
    <span className="text-[10px] text-[#E74C3C] font-semibold tracking-wide">COMPANY_A</span>
    <span className="text-sm font-bold text-[#284952]">Human Rights Due Diligence Dashboard</span>
  </div>
  <div className="flex items-center gap-3">
    {/* Company Logo */}
    <div className="w-8 h-8 flex items-center justify-center">
      <img 
        src="/assets/company_logo.png" 
        alt="Company Logo" 
        className="w-8 h-8 object-contain rounded-full"
        onError={(e) => {
          // Fallback in case company logo doesn't load
          e.target.style.display = 'none';
          const fallback = document.createElement('div');
          fallback.className = 'w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs';
          fallback.textContent = 'Co';
          e.target.parentNode.appendChild(fallback);
        }}
      />
    </div>
    <div className="flex items-center gap-2 text-[#284952] bg-white border border-[#DEE2E6] rounded px-2 py-1">
      <span className="text-xs">Logout</span>
      <LogOut size={14} />
    </div>
  </div>
</motion.div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="flex-1 overflow-hidden p-2">
          {/* ===== TOP FILTER ROW - Wrapped in gray card like HTML ===== */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: showFilters ? 1 : 0, y: showFilters ? 0 : 10 }}
            transition={{ duration: 0.5, delay: 0.1, ease: IOS_EASE }}
            className="bg-[#DEE2E6] rounded-lg p-2 mb-2"
          >
            <div className="grid grid-cols-12 gap-2">
              {/* Statistics Section */}
              <div className="col-span-3 bg-white rounded-lg p-2">
                <div className="text-[8px] font-bold text-[#17161A] mb-1 text-center">STATISTICS</div>
                <div className="bg-gradient-to-r from-[#60BA81] to-[#4e9e6b] rounded-md px-3 py-2 flex items-center justify-center gap-2">
                  <span className="text-white text-[9px] font-medium">All Time Complaints:</span>
                  <span className="text-white text-lg font-bold bg-white/20 px-2 py-0.5 rounded">365</span>
                </div>
              </div>

              {/* Sites Filter */}
              <div className="col-span-6 bg-white rounded-lg p-2">
  <div className="text-[8px] font-bold text-[#17161A] mb-1 text-center">SITES FILTER</div>
  <div className="flex items-center gap-1 overflow-hidden">
    <button className="shrink-0 w-5 h-5 flex items-center justify-center">
      <ChevronDown size={12} className="text-[#284952]" />
    </button>
    <div className="flex gap-1.5 overflow-hidden items-end">
      {SITES.slice(0, 11).map((site, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: showFilters ? 1 : 0, scale: showFilters ? 1 : 0.8 }}
          transition={{ delay: 0.2 + i * 0.02 }}
          className="flex flex-col items-center shrink-0"
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
              site.selected ? "border-[#284952] bg-[#284952]" : "border-[#60BA81]/30 bg-white"
            }`}
          >
            <img 
              src={`/assets/${i + 1}.png`} 
              alt={`Site ${i + 1}`}
              className={`w-10 h-10 object-contain ${site.selected ? "filter brightness-0 invert" : ""}`}
            />
          </div>
          <span className="text-[5px] text-[#767676] mt-0.5 w-10 text-center truncate">{site.name}</span>
        </motion.div>
      ))}
    </div>
  </div>
</div>
              {/* Filters & Search */}
              <div className="col-span-3 bg-white rounded-lg p-2">
                <div className="text-[8px] font-bold text-[#17161A] mb-1 text-center">FILTERS</div>
                <div className="grid grid-cols-2 gap-1">
                  <div>
                    <div className="text-[6px] text-[#767676] text-center mb-0.5">SEARCH</div>
                    <div className="bg-[#F5F5F7] rounded h-6 flex items-center justify-center">
                      <Search size={10} className="text-[#767676]" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[6px] text-[#767676] text-center mb-0.5">DATE RANGE</div>
                    <div className="bg-[#F5F5F7] rounded h-6 flex items-center justify-center px-1">
                      <span className="text-[6px] text-[#17161A]">Oct 28, 2025 - Nov 26, 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ===== STAT CARDS ROW - 4 green cards ===== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showStatCards ? 1 : 0 }}
            className="grid grid-cols-4 gap-2 mb-2"
          >
            {/* Total Complaints */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{
                opacity: showStatCards ? 1 : 0,
                y: showStatCards ? 0 : 20,
                scale: highlightTotal ? 1.05 : 1,
                boxShadow: highlightTotal ? "0 0 20px rgba(96, 186, 129, 0.5)" : "none",
              }}
              transition={{ duration: 0.4, ease: IOS_EASE }}
              className="relative bg-[#60BA81] rounded-lg p-3 overflow-hidden"
            >
              {highlightTotal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{ duration: 0.8, repeat: 3 }}
                  className="absolute inset-0 border-3 border-white rounded-lg"
                />
              )}
              <p className="text-2xl font-bold text-white">37</p>
              <p className="text-[9px] text-white/90">Total Complaints</p>
            </motion.div>

            {/* Anonymous Complaints */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{
                opacity: showStatCards ? 1 : 0,
                y: showStatCards ? 0 : 20,
                scale: highlightOpen ? 1.05 : 1,
                boxShadow: highlightOpen ? "0 0 20px rgba(96, 186, 129, 0.5)" : "none",
              }}
              transition={{ duration: 0.4, delay: 0.1, ease: IOS_EASE }}
              className="relative bg-[#60BA81] rounded-lg p-3 overflow-hidden"
            >
              {highlightOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{ duration: 0.8, repeat: 3 }}
                  className="absolute inset-0 border-3 border-white rounded-lg"
                />
              )}
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-[9px] text-white/90">Anonymous Complaints</p>
            </motion.div>

            {/* Completed Complaints */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{
                opacity: showStatCards ? 1 : 0,
                y: showStatCards ? 0 : 20,
                scale: highlightResolved ? 1.05 : 1,
                boxShadow: highlightResolved ? "0 0 20px rgba(96, 186, 129, 0.5)" : "none",
              }}
              transition={{ duration: 0.4, delay: 0.2, ease: IOS_EASE }}
              className="relative bg-[#60BA81] rounded-lg p-3 overflow-hidden"
            >
              {highlightResolved && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{ duration: 0.8, repeat: 3 }}
                  className="absolute inset-0 border-3 border-white rounded-lg"
                />
              )}
              <p className="text-2xl font-bold text-white">25</p>
              <p className="text-[9px] text-white/90">Completed Complaints</p>
            </motion.div>

            {/* In Process Complaints */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{
                opacity: showStatCards ? 1 : 0,
                y: showStatCards ? 0 : 20,
                scale: highlightInProcess ? 1.05 : 1,
                boxShadow: highlightInProcess ? "0 0 20px rgba(96, 186, 129, 0.5)" : "none",
              }}
              transition={{ duration: 0.4, delay: 0.3, ease: IOS_EASE }}
              className="relative bg-[#60BA81] rounded-lg p-3 overflow-hidden"
            >
              {highlightInProcess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{ duration: 0.8, repeat: 3 }}
                  className="absolute inset-0 border-3 border-white rounded-lg"
                />
              )}
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-[9px] text-white/90">In Process Complaints</p>
            </motion.div>
          </motion.div>

          {/* ===== MAIN DASHBOARD GRID ===== */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showFullDashboard ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-12 gap-2"
            style={{ height: "calc(100% - 140px)" }}
          >
            {/* LEFT COLUMN - 25% width */}
            <div className="col-span-3 flex flex-col gap-2">
              {/* Complaints Status Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: showFullDashboard ? 1 : 0, x: showFullDashboard ? 0 : -20 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg border border-[#DEE2E6] p-2 shadow-sm"
                >
                <h3 className="text-[9px] font-semibold text-[#284952] mb-2">Complaints Status</h3>
                <div className="flex justify-around">
                    {/* Bounced 1.0 */}
                    <div className="text-center">
                    <div className="w-7 h-7 mx-auto mb-1 flex items-center justify-center">
                        <img 
                        src="/assets/bounced_image.png" 
                        alt="Bounced 1.0" 
                        className="w-6 h-6 object-contain"
                        />
                    </div>
                    <p className="text-[7px] text-[#284952]">Bounced 1.0</p>
                    <p className="text-sm font-bold text-[#284952]">2.7%</p>
                    </div>
                    
                    {/* Bounced 2.0 */}
                    <div className="text-center">
                    <div className="w-7 h-7 mx-auto mb-1 flex items-center justify-center">
                        <img 
                        src="/assets/bounced_image1.png" 
                        alt="Bounced 2.0" 
                        className="w-6 h-6 object-contain"
                        />
                    </div>
                    <p className="text-[7px] text-[#284952]">Bounced 2.0</p>
                    <p className="text-sm font-bold text-[#284952]">0.0%</p>
                    </div>
                    
                    {/* Unclosed */}
                    <div className="text-center">
                    <div className="w-7 h-7 mx-auto mb-1 flex items-center justify-center">
                        <img 
                        src="/assets/unclosed_image.png" 
                        alt="Unclosed" 
                        className="w-6 h-6 object-contain"
                        />
                    </div>
                    <p className="text-[7px] text-[#284952]">Unclosed</p>
                    <p className="text-sm font-bold text-[#284952]">0.0%</p>
                    </div>
                </div>
                </motion.div>

              {/* Counseling Sessions Analysis - Nested Donut */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: showFullDashboard ? 1 : 0, x: showFullDashboard ? 0 : -20 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg border border-[#DEE2E6] p-2 shadow-sm flex-1"
              >
                <h3 className="text-[9px] font-semibold text-[#284952] mb-1">Counseling Sessions Analysis</h3>
                <div className="flex items-center justify-center h-24">
                  <CounselingDonutChart showAnimation={showFullDashboard} />
                </div>
              </motion.div>

              {/* Complaints By Categories */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: showFullDashboard ? 1 : 0, x: showFullDashboard ? 0 : -20 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg border border-[#DEE2E6] p-2 shadow-sm flex-1 overflow-hidden"
              >
                <h3 className="text-[9px] font-semibold text-[#284952] mb-2">Complaints By Categories</h3>
                <div className="space-y-1.5">
                  {COMPLAINT_CATEGORIES.map((cat, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span className="text-[5px] text-[#767676] w-20 truncate">{cat.name}</span>
                      <div className="flex-1 h-2.5 bg-[#e6f5d7] rounded overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: showFullDashboard ? `${cat.percentage}%` : 0 }}
                          transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                          className="h-full bg-[#206E71] rounded"
                        />
                      </div>
                      <span className="text-[6px] text-[#284952] w-6 text-right font-medium">{cat.percentage}%</span>
                    </div>
                  ))}
                </div>
                <p className="text-[6px] text-[#767676] text-center mt-2 italic">Complaint Categories</p>
              </motion.div>
            </div>

            {/* CENTER COLUMN - 50% width */}
            <div className="col-span-6 flex flex-col gap-2">
              {/* Gauge Charts Row */}
              <div className="grid grid-cols-2 gap-2">
                {/* Worker Happiness Score */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showFullDashboard ? 1 : 0, y: showFullDashboard ? 0 : 20 }}
                  transition={{ delay: 0.15 }}
                  className="bg-white rounded-lg border border-[#DEE2E6] p-2 shadow-sm"
                >
                  <h3 className="text-[9px] font-semibold text-[#284952] mb-0">Worker Happiness Score</h3>
                  <div className="flex items-center justify-center">
                    <HappinessGaugeChart value={96} showAnimation={showFullDashboard} />
                  </div>
                </motion.div>

                {/* Worker Safety Score */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showFullDashboard ? 1 : 0, y: showFullDashboard ? 0 : 20 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-lg border border-[#DEE2E6] p-2 shadow-sm"
                >
                  <h3 className="text-[9px] font-semibold text-[#284952] mb-0">Worker Safety Score</h3>
                  <div className="flex items-center justify-center">
                    <HappinessGaugeChart value={85} showAnimation={showFullDashboard} />
                  </div>
                </motion.div>
              </div>

              {/* Employees Feedback Section - Orange header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showFullDashboard ? 1 : 0, y: showFullDashboard ? 0 : 20 }}
                transition={{ delay: 0.25 }}
                className="rounded-lg overflow-hidden shadow-sm"
              >
                <div className="bg-[#F5A83C] px-3 py-2">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-[10px] font-bold text-white">Employees Feedback / Suggestion List</h3>
                    <span className="bg-white/20 text-white text-[7px] px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="bg-white text-[#F5A83C] text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        46
                      </span>
                      Feedbacks
                    </span>
                  </div>
                </div>
                <div className="bg-[#fff9f0] px-2 py-2">
                  <div className="flex gap-2 overflow-hidden">
                    {FEEDBACK_ITEMS.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: showFullDashboard ? 1 : 0, x: showFullDashboard ? 0 : 20 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="bg-white rounded-lg px-2 py-1.5 min-w-[130px] border-l-4 border-[#F5A83C] shadow-sm"
                      >
                        <p className="text-[7px] text-[#17161A] font-medium truncate">{item.title}</p>
                        <p className="text-[6px] text-[#767676]">{item.date}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Complaints by Gender - Horizontal bar chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showFullDashboard ? 1 : 0, y: showFullDashboard ? 0 : 20 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg border border-[#DEE2E6] p-2 shadow-sm flex-1"
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[9px] font-semibold text-[#284952]">Complaints by Gender</h3>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-[#4A90D9] rounded-sm"></span>
                      <span className="text-[6px] text-[#767676]">Male</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 bg-[#E91E63] rounded-sm"></span>
                      <span className="text-[6px] text-[#767676]">Female</span>
                    </span>
                  </div>
                </div>
                <div className="space-y-0.5">
                  {GENDER_DATA.map((item, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <span className="text-[5px] text-[#767676] w-14 truncate">{item.category}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: showFullDashboard ? `${Math.min(item.male * 4.5, 100)}%` : 0 }}
                          transition={{ delay: 0.4 + i * 0.03, duration: 0.4 }}
                          className="h-full bg-[#60BA81] rounded"
                        />
                        {item.male > 0 && (
                          <span className="absolute right-1 top-0 text-[5px] text-[#284952]">{item.male}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Gender Summary */}
                <div className="flex justify-center gap-6 mt-1.5 pt-1.5 border-t border-[#DEE2E6]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#4A90D9] text-[7px]">♂ MALE</span>
                    <span className="text-sm font-bold text-[#4A90D9]">36</span>
                    <span className="text-[5px] text-[#767676]">100.0%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#E91E63] text-[7px]">♀ FEMALE</span>
                    <span className="text-sm font-bold text-[#E91E63]">0</span>
                    <span className="text-[5px] text-[#767676]">0.0%</span>
                  </div>
                </div>
              </motion.div>

              {/* Complaints by Days - Line Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: showFullDashboard ? 1 : 0, y: showFullDashboard ? 0 : 20 }}
                transition={{ delay: 0.35 }}
                className="bg-white rounded-lg border border-[#DEE2E6] p-2 shadow-sm"
              >
                <h3 className="text-[9px] font-semibold text-[#284952] mb-1">Complaints by Days</h3>
                <div className="h-14">
                  <ComplaintLineChart showAnimation={showFullDashboard} />
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN - 25% width */}
            <div className="col-span-3 flex flex-col gap-2">
              {/* Executive Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: showFullDashboard ? 1 : 0, x: showFullDashboard ? 0 : 20 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg border border-[#DEE2E6] p-2 shadow-sm"
              >
                <h3 className="text-[9px] font-semibold text-[#284952] mb-2">Executive Summary</h3>
                <div className="flex items-center justify-center mb-2">
                  <div className="w-7 h-7 bg-[#F5F5F7] rounded flex items-center justify-center">
                    <Building2 size={14} className="text-[#284952]" />
                  </div>
                </div>
                <p className="text-[8px] text-center text-[#60BA81] font-semibold mb-2">Suppliers</p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[7px] text-[#767676]">Companies:</span>
                    <span className="text-[8px] font-bold text-[#60BA81]">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[7px] text-[#767676]">Employees:</span>
                    <span className="text-[8px] font-bold text-[#60BA81]">4671</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[7px] text-[#767676]">Investigation Officers:</span>
                    <span className="text-[8px] font-bold text-[#60BA81]">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[7px] text-[#767676]">Avg. Resolution Time:</span>
                    <span className="text-[8px] font-bold text-[#60BA81]">1 days 9 hrs</span>
                  </div>
                </div>
              </motion.div>

              {/* Resolution Time Per Complaint - Table */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: showFullDashboard ? 1 : 0, x: showFullDashboard ? 0 : 20 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg border border-[#DEE2E6] p-2 shadow-sm"
              >
                <h3 className="text-[9px] font-semibold text-[#284952] mb-2">Resolution Time Per Complaint</h3>
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#2D9480]">
                      <th className="text-[6px] text-white text-left px-1.5 py-1 rounded-l font-semibold">
                        TIME TAKEN
                      </th>
                      <th className="text-[6px] text-white text-right px-1.5 py-1 rounded-r font-semibold">
                        NO OF COMPLAINTS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {RESOLUTION_TIME.map((item, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: showFullDashboard ? 1 : 0, x: showFullDashboard ? 0 : 10 }}
                        transition={{ delay: 0.25 + i * 0.05 }}
                        className={i % 2 === 0 ? "bg-[#f8f8f8]" : "bg-white"}
                      >
                        <td className="text-[6px] text-[#767676] px-1.5 py-1">{item.label}</td>
                        <td className="text-[7px] font-bold text-[#60BA81] text-right px-1.5 py-1">{item.count}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>

              {/* Survey Reports - Green gradient card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: showFullDashboard ? 1 : 0, x: showFullDashboard ? 0 : 20 }}
                transition={{ delay: 0.3 }}
                className="rounded-lg overflow-hidden flex-1 shadow-lg"
                style={{ background: "linear-gradient(to bottom right, #60BA81, #284952)" }}
              >
                <div className="bg-[#284952] px-2 py-1.5">
                  <div className="flex items-center gap-1">
                    <FileText size={10} className="text-white" />
                    <h3 className="text-[9px] font-bold text-white">Survey Reports</h3>
                  </div>
                </div>
                <div className="p-1.5 space-y-1 max-h-28 overflow-hidden bg-white">
                  {SURVEY_REPORTS.map((report, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: showFullDashboard ? 1 : 0, y: showFullDashboard ? 0 : 10 }}
                      transition={{ delay: 0.35 + i * 0.05 }}
                      className="border-b border-[#eee] pb-1 last:border-0"
                    >
                      <p className="text-[6px] text-[#284952] font-semibold truncate">{report.title}</p>
                      <div className="flex items-center justify-between mt-0.5">
                        <p className="text-[5px] text-[#767676]">{report.date}</p>
                        <div className="flex gap-0.5">
                          {report.hasView && (
                            <button className="bg-[#60BA81] text-white text-[5px] px-1 py-0.5 rounded flex items-center gap-0.5">
                              <Eye size={6} /> View
                            </button>
                          )}
                          {report.hasPdf && (
                            <button className="bg-[#E74C3C] text-white text-[5px] px-1 py-0.5 rounded">PDF</button>
                          )}
                          {report.hasCsv && (
                            <button className="bg-[#F5A83C] text-white text-[5px] px-1 py-0.5 rounded flex items-center gap-0.5">
                              <Download size={5} /> CSV
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

function CounselingDonutChart({ showAnimation }: { showAnimation: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-28 h-28">
      {/* Outer ring - 5 segments with exact colors from screenshot */}
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#60BA81"
        strokeWidth="12"
        strokeDasharray="70 251.2"
        strokeDashoffset="0"
        initial={{ strokeDasharray: "0 251.2" }}
        animate={{ strokeDasharray: showAnimation ? "70 251.2" : "0 251.2" }}
        transition={{ delay: 0.3, duration: 0.8 }}
        transform="rotate(-90 50 50)"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#F5A83C"
        strokeWidth="12"
        strokeDasharray="55 251.2"
        strokeDashoffset="-70"
        initial={{ strokeDasharray: "0 251.2" }}
        animate={{ strokeDasharray: showAnimation ? "55 251.2" : "0 251.2" }}
        transition={{ delay: 0.4, duration: 0.8 }}
        transform="rotate(-90 50 50)"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#284952"
        strokeWidth="12"
        strokeDasharray="50 251.2"
        strokeDashoffset="-125"
        initial={{ strokeDasharray: "0 251.2" }}
        animate={{ strokeDasharray: showAnimation ? "50 251.2" : "0 251.2" }}
        transition={{ delay: 0.5, duration: 0.8 }}
        transform="rotate(-90 50 50)"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#E74C3C"
        strokeWidth="12"
        strokeDasharray="40 251.2"
        strokeDashoffset="-175"
        initial={{ strokeDasharray: "0 251.2" }}
        animate={{ strokeDasharray: showAnimation ? "40 251.2" : "0 251.2" }}
        transition={{ delay: 0.6, duration: 0.8 }}
        transform="rotate(-90 50 50)"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#9CA3AF"
        strokeWidth="12"
        strokeDasharray="36.2 251.2"
        strokeDashoffset="-215"
        initial={{ strokeDasharray: "0 251.2" }}
        animate={{ strokeDasharray: showAnimation ? "36.2 251.2" : "0 251.2" }}
        transition={{ delay: 0.7, duration: 0.8 }}
        transform="rotate(-90 50 50)"
      />

      {/* Inner ring - 3 segments */}
      <motion.circle
        cx="50"
        cy="50"
        r="24"
        fill="none"
        stroke="#60BA81"
        strokeWidth="10"
        strokeDasharray="90 150.8"
        strokeDashoffset="0"
        initial={{ strokeDasharray: "0 150.8" }}
        animate={{ strokeDasharray: showAnimation ? "90 150.8" : "0 150.8" }}
        transition={{ delay: 0.8, duration: 0.8 }}
        transform="rotate(-90 50 50)"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="24"
        fill="none"
        stroke="#E74C3C"
        strokeWidth="10"
        strokeDasharray="35 150.8"
        strokeDashoffset="-90"
        initial={{ strokeDasharray: "0 150.8" }}
        animate={{ strokeDasharray: showAnimation ? "35 150.8" : "0 150.8" }}
        transition={{ delay: 0.9, duration: 0.8 }}
        transform="rotate(-90 50 50)"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="24"
        fill="none"
        stroke="#F5A83C"
        strokeWidth="10"
        strokeDasharray="25.8 150.8"
        strokeDashoffset="-125"
        initial={{ strokeDasharray: "0 150.8" }}
        animate={{ strokeDasharray: showAnimation ? "25.8 150.8" : "0 150.8" }}
        transition={{ delay: 1, duration: 0.8 }}
        transform="rotate(-90 50 50)"
      />

      {/* Labels matching screenshot */}
      <text x="25" y="25" className="text-[7px] fill-[#60BA81] font-bold">
        22
      </text>
      <text x="70" y="32" className="text-[7px] fill-[#F5A83C] font-bold">
        38
      </text>
      <text x="60" y="72" className="text-[7px] fill-[#284952] font-bold">
        102
      </text>
      <text x="28" y="75" className="text-[7px] fill-[#E74C3C] font-bold">
        124
      </text>
    </svg>
  )
}

function HappinessGaugeChart({ value, showAnimation }: { value: number; showAnimation: boolean }) {
  const progress = (value / 100) * 180

  return (
    <div className="relative">
      <svg viewBox="0 0 120 70" className="w-36 h-20">
        {/* Background arc - Red zone (0-25) */}
        <path
          d="M 15 55 A 40 40 0 0 1 42 18"
          fill="none"
          stroke="#E74C3C"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.8"
        />
        {/* Yellow zone (25-50) */}
        <path
          d="M 42 18 A 40 40 0 0 1 60 12"
          fill="none"
          stroke="#F5A83C"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.8"
        />
        {/* Light green zone (50-75) */}
        <path
          d="M 60 12 A 40 40 0 0 1 78 18"
          fill="none"
          stroke="#90EE90"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.8"
        />
        {/* Dark green zone (75-100) */}
        <path
          d="M 78 18 A 40 40 0 0 1 105 55"
          fill="none"
          stroke="#60BA81"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Gray background arc (unfilled portion) */}
        <path
          d="M 15 55 A 40 40 0 0 1 105 55"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.3"
        />

        {/* Scale labels */}
        <text x="8" y="60" className="text-[6px] fill-[#767676]">
          0
        </text>
        <text x="30" y="22" className="text-[6px] fill-[#767676]">
          25
        </text>
        <text x="56" y="10" className="text-[6px] fill-[#767676]">
          50
        </text>
        <text x="82" y="22" className="text-[6px] fill-[#767676]">
          75
        </text>
        <text x="100" y="60" className="text-[6px] fill-[#767676]">
          100
        </text>

        {/* Center value */}
        <motion.text
          x="60"
          y="48"
          textAnchor="middle"
          className="text-2xl font-bold fill-[#17161A]"
          initial={{ opacity: 0 }}
          animate={{ opacity: showAnimation ? 1 : 0 }}
          transition={{ delay: 1 }}
        >
          {value}
        </motion.text>
      </svg>
    </div>
  )
}

function ComplaintLineChart({ showAnimation }: { showAnimation: boolean }) {
  const data = [1, 1, 1, 2, 2.5, 2, 2, 4, 3, 4, 5, 3.5, 3, 3.5, 4, 3]
  const maxValue = 5.5
  const width = 320
  const height = 45
  const points = data.map((v, i) => ({
    x: 20 + (i / (data.length - 1)) * (width - 40),
    y: height - 5 - (v / maxValue) * (height - 10),
  }))
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")

  return (
    <svg viewBox={`0 0 ${width} ${height + 15}`} className="w-full h-full">
      {/* Grid lines */}
      {[0, 1, 2, 3, 4, 5].map((v, i) => (
        <line
          key={i}
          x1="20"
          y1={height - 5 - (v / maxValue) * (height - 10)}
          x2={width - 20}
          y2={height - 5 - (v / maxValue) * (height - 10)}
          stroke="#E5E7EB"
          strokeWidth="0.5"
        />
      ))}

      {/* Y-axis labels */}
      {[0, 2.5, 5].map((v, i) => (
        <text key={i} x="5" y={height - 5 - (v / maxValue) * (height - 10) + 2} className="text-[5px] fill-[#767676]">
          {v}
        </text>
      ))}

      {/* Line - teal color like screenshot */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="#2D9480"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: showAnimation ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
      />

      {/* Data points */}
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="2"
          fill="#2D9480"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: showAnimation ? 1 : 0, scale: showAnimation ? 1 : 0 }}
          transition={{ delay: 0.5 + i * 0.03 }}
        />
      ))}

      {/* X-axis label */}
      <text x={width / 2} y={height + 12} className="text-[5px] fill-[#767676]" textAnchor="middle">
        Number of Complaints
      </text>

      {/* Legend */}
      <rect x={width / 2 - 40} y={height + 4} width="8" height="4" fill="#2D9480" rx="1" />
      <text x={width / 2 - 28} y={height + 8} className="text-[5px] fill-[#767676]">
        Complaint Count
      </text>
    </svg>
  )
}
