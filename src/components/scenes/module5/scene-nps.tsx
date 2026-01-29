"use client";

import type React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  Clock,
  AlertCircle,
  MessageSquare,
  Users,
  Smile,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

//
// CONSTANTS
//
const COLORS = {
  deepTeal: "#284952",
  freshGreen: "#60BA81",
  warmOrange: "#F5A83C",
  charcoal: "#17161A",
  white: "#FFFFFF",
  bg: "#F5F5F7",
  border: "#DEE2E6",
  chartRed: "#FF5353",
  chartYellow: "#FFD221",
  chartLightGreen: "#77E6B4",
  chartGreen: "#21D683",
};

const FACTORS_HAPPINESS = [
  { label: "Avg Resolution Time", icon: Clock },
  { label: "Avg Bounced Rate", icon: AlertCircle },
  { label: "Avg Response Time", icon: MessageSquare },
  { label: "Complaints : Employees", icon: Users },
];

const FACTORS_SAFETY = [
  { label: "Avg Resolution Time", icon: Clock },
  { label: "Avg Response Time", icon: MessageSquare },
  { label: "Avg Bounced Rate", icon: AlertCircle },
  { label: "Complaints : Employees", icon: Users },
];

//
// RESPONSIVE WRAPPER
//
const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      const scaleX = width / 1280;
      const scaleY = height / 720;
      setScale(Math.min(scaleX, scaleY) * 0.95);
    };
    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current?.parentElement) {
      observer.observe(containerRef.current.parentElement);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center overflow-hidden bg-[#F5F5F7]"
    >
      <div
        style={{
          width: 1280,
          height: 720,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
        className="shrink-0 flex items-center justify-center"
      >
        {children}
      </div>
    </div>
  );
};

//
// JSCHARTING – FIXED GAUGE COMPONENT
//
// Loader helper
const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    // Check if script is already loaded
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    
    script.onload = () => {
      console.log(`Script loaded: ${src}`);
      resolve();
    };
    
    script.onerror = () => {
      console.error(`Failed to load script: ${src}`);
      reject(new Error(`Failed to load script: ${src}`));
    };
    
    document.head.appendChild(script);
  });

  const JSChartingCircularColorBar = ({
    value,
    chartId,
  }: {
    value: number;
    chartId: string;
  }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const chartInstance = useRef<any>(null);
    const [scriptsLoaded, setScriptsLoaded] = useState(false);
  
    // Load scripts only once
    useEffect(() => {
      let mounted = true;
      
      const loadScripts = async () => {
        try {
          await loadScript("/assets/jscharting.js");
          await loadScript("/assets/types.js");
          
          // Wait a bit more to ensure JSC is fully initialized
          await new Promise(resolve => setTimeout(resolve, 200));
          
          if (mounted) {
            setScriptsLoaded(true);
          }
        } catch (error) {
          console.error("Failed to load JSCharting scripts:", error);
        }
      };
  
      loadScripts();
  
      return () => {
        mounted = false;
      };
    }, []);
  
    // Initialize chart when scripts are loaded and value changes
    useEffect(() => {
      if (!scriptsLoaded || !chartRef.current) return;
  
      let mounted = true;
  
      const initChart = async () => {
        // @ts-ignore
        const JSC = window.JSC;
  
        if (!JSC || !mounted) {
          console.warn("JSC not available or component unmounted");
          return;
        }
  
        // Dispose old chart
        if (chartInstance.current) {
          try {
            chartInstance.current.dispose();
          } catch (e) {
            console.warn("Error disposing old chart:", e);
          }
        }
  
        const minValue = 0;
        const maxValue = 100;
  
        try {
          chartInstance.current = JSC.chart(chartRef.current, {
            debug: false,
            width: 300,
            height: 330,
            license: { jscharting: "no-logo-button" },
  
            legend_visible: false,
            defaultTooltip_enabled: false,
            xAxis_spacingPercentage: 0.4,
  
            yAxis: [
              {
                id: "ax1",
                defaultTick: { padding: 10, enabled: false },
                customTicks: [0, 25, 50, 75, 100],
                line: {
                  width: 10,
                  breaks: {},
                  color: "smartPalette:pal1",
                },
                scale_range: [minValue, maxValue],
              },
  
              {
                id: "ax2",
                scale_range: [minValue, maxValue],
                defaultTick: { padding: 10, enabled: false },
                customTicks: [minValue, maxValue],
                line: {
                  width: 10,
                  color: "smartPalette:pal2",
                },
              },
            ],
  
            defaultSeries: {
              type: "gauge column roundcaps",
              shape: {
                label: {
                  text: "%max",
                  align: "center",
                  verticalAlign: "middle",
                  style_fontSize: 28,
                },
              },
            },
  
            series: [
              {
                type: "column roundcaps",
                name: "Temperatures",
                yAxis: "ax1",
  
                palette: {
                  id: "pal1",
                  pointValue: "%yValue",
                  ranges: [
                    { value: 0, color: "#FF5353" },
                    { value: 25, color: "#FFD221" },
                    { value: 50, color: "#77E6B4" },
                    { value: [75, 100], color: "#21D683" },
                  ],
                },
  
                points: [["x", [0, value]]],
              },
            ],
          });
        } catch (error) {
          console.error("Error initializing JSCharting chart:", error);
        }
      };
  
      // Small delay to ensure DOM is ready
      const timer = setTimeout(initChart, 100);
  
      return () => {
        mounted = false;
        clearTimeout(timer);
        if (chartInstance.current) {
          try {
            chartInstance.current.dispose();
          } catch (e) {
            console.warn("Error disposing chart on unmount:", e);
          }
        }
      };
    }, [scriptsLoaded, value]);
  
    // Show loading state or fallback
    if (!scriptsLoaded) {
      return (
        <div
          style={{ width: 260, height: 260 }}
          className="flex items-center justify-center bg-gray-100 rounded-lg"
        >
          <div className="text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#60BA81] mx-auto mb-2"></div>
            <p className="text-sm">Loading chart...</p>
          </div>
        </div>
      );
    }
  
    return (
      <div
        ref={chartRef}
        id={chartId}
        style={{ width: 260, height: 260 }}
        className="flex items-center justify-center"
      />
    );
  };


//
// SCORE CARD
//
const ScoreCard = ({
  title,
  icon: Icon,
  value,
  factors,
  factorLabel,
  chartId,
  delay = 0,
  showFactors,
  isHighlighted,
  iconColor,
}: {
  title: string;
  icon: React.ElementType;
  value: number;
  factors: typeof FACTORS_HAPPINESS;
  factorLabel: string;
  chartId: string;
  delay?: number;
  showFactors: boolean;
  isHighlighted: boolean;
  iconColor: string;
}) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        scale: isHighlighted ? 1.02 : 1,
        boxShadow: isHighlighted
          ? "0 25px 50px -12px rgba(96,186,129,0.25)"
          : "0 25px 50px -12px rgba(0,0,0,0.1)",
      }}
      transition={{ duration: 0.8, delay, ease: "backOut" }}
      className="bg-white rounded-[24px] border border-[#DEE2E6]/60 p-6 flex flex-col items-center relative overflow-hidden"
      style={{ width: 360, height: 540 }}
    >
      <AnimatePresence>
        {isHighlighted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-[24px] pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(96,186,129,0.08) 0%, transparent 50%)",
              border: "2px solid rgba(96,186,129,0.3)",
            }}
          />
        )}
      </AnimatePresence>

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon size={22} style={{ color: iconColor }} />
        </div>
        <h2 className="text-lg font-bold" style={{ color: COLORS.deepTeal }}>
          {title}
        </h2>
      </div>

      {/* CHART */}
      <div className="relative flex items-center justify-center" style={{ minHeight: 260 }}>
        <JSChartingCircularColorBar value={value} chartId={chartId} />
      </div>

      {/* FACTORS */}
      <div className="w-full mt-2 space-y-1.5 flex-1">
        <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#767676] mb-2 text-center">
          {factorLabel}
        </p>

        {factors.map((factor, i) => (
          <motion.div
            key={factor.label}
            initial={{ opacity: 0, x: delay > 0 ? 20 : -20 }}
            animate={showFactors ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="flex items-center gap-2.5 p-2 rounded-xl bg-[#F5F5F7] hover:bg-[#F0F2F5] transition-colors"
          >
            <div
              className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm"
              style={{ color: iconColor }}
            >
              <factor.icon size={12} />
            </div>
            <span className="text-[11px] font-semibold text-[#17161A]">
              {factor.label}
            </span>
            <CheckCircle2 size={12} className="ml-auto text-[#60BA81]" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

//
// MAIN SCENE
//
interface SceneProps {
  isActive: boolean;
  progress: number;
}

export function SceneNPS({ isActive, progress }: SceneProps) {
  const sceneStart = 59.4;
  const sceneEnd = 70.4;
  const sceneDuration = sceneEnd - sceneStart;
  const sceneProgress = Math.max(
    0,
    Math.min(1, (progress - sceneStart) / sceneDuration)
  );

  const showHappinessFactors = sceneProgress > 0.1;
  const showSafetyFactors = sceneProgress > 0.55;
  const highlightHappiness = sceneProgress > 0.05 && sceneProgress < 0.55;
  const highlightSafety = sceneProgress >= 0.55;

  return (
    <ResponsiveContainer>
      <div className="w-full h-full flex flex-col items-center justify-center px-8">
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-bold text-[#284952] mb-1">
            Performance Indicators
          </h1>
          <p className="text-[#767676] text-sm">
            Real-time worker satisfaction and safety metrics
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="flex gap-8 items-center justify-center">
          <ScoreCard
            title="Worker Happiness Score"
            icon={Smile}
            value={85}
            factors={FACTORS_HAPPINESS}
            factorLabel="Calculated Based On"
            chartId="happinessChart"
            delay={0}
            showFactors={showHappinessFactors}
            isHighlighted={highlightHappiness}
            iconColor={COLORS.freshGreen}
          />

          <ScoreCard
            title="Worker Safety Score"
            icon={ShieldCheck}
            value={92}
            factors={FACTORS_SAFETY}
            factorLabel="Worker Satisfaction Based On"
            chartId="safetyChart"
            delay={0.15}
            showFactors={showSafetyFactors}
            isHighlighted={highlightSafety}
            iconColor={COLORS.warmOrange}
          />
        </div>

        {/* FOOTER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: sceneProgress > 0.7 ? 1 : 0,
            y: sceneProgress > 0.7 ? 0 : 20,
          }}
          transition={{ duration: 0.5 }}
          className="mt-6 px-5 py-2.5 rounded-full bg-white shadow-lg border border-[#DEE2E6]/60 flex items-center gap-2"
        >
          <CheckCircle2 size={16} className="text-[#60BA81]" />
          <span className="text-sm font-medium text-[#284952]">
            Solutions are genuinely helping workers
          </span>
        </motion.div>
      </div>
    </ResponsiveContainer>
  );
}
