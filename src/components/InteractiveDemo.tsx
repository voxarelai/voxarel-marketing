"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Ship,
  Plane,
  TrendingUp,
  TrendingDown,
  Warehouse,
  CheckCircle,
  Truck,
  Box,
  Weight,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Zap,
  ArrowRight,
  BarChart3,
  Bell,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Demo data
const predictions = [
  {
    id: "1",
    destination: "Mumbai, India",
    serviceType: "sea",
    fillPercentage: 87,
    predictedCbm: 52.4,
    confidence: 94,
    thresholdReached: true,
  },
  {
    id: "2",
    destination: "Chennai, India",
    serviceType: "sea",
    fillPercentage: 62,
    predictedCbm: 38.1,
    confidence: 88,
    thresholdReached: false,
  },
];

const trackingSteps = [
  {
    status: "Collected",
    location: "Dubai, UAE",
    time: "2 hours ago",
    completed: true,
    active: false,
  },
  {
    status: "At Warehouse",
    location: "Jebel Ali Port",
    time: "1 hour ago",
    completed: true,
    active: false,
  },
  { status: "Processing", location: "Jebel Ali", time: "Now", completed: false, active: true },
  { status: "In Transit", location: "—", time: "Dec 18", completed: false, active: false },
  { status: "Delivered", location: "Mumbai", time: "Dec 25", completed: false, active: false },
];

// ============================================
// TOUR STEPS - Auto-play sequence with varied positions
// ============================================
const tourSteps = [
  {
    tab: "predictions",
    title: "AI-Powered Predictions",
    message: "Our AI analyzes historical data to predict container fill rates 3-5 days in advance",
    position: "right" as const,
    verticalPosition: "top" as const,
    scrollY: 0,
  },
  {
    tab: "predictions",
    title: "Route Intelligence",
    message: "See which routes are ready for booking based on real-time fill thresholds",
    position: "left" as const,
    verticalPosition: "center" as const,
    scrollY: 50,
  },
  {
    tab: "tracking",
    title: "Real-Time Tracking",
    message: "Track every shipment from collection to delivery with live status updates",
    position: "right" as const,
    verticalPosition: "top" as const,
    scrollY: 0,
  },
  {
    tab: "tracking",
    title: "Customer Notifications",
    message: "Automated WhatsApp updates keep customers informed at every milestone",
    position: "left" as const,
    verticalPosition: "bottom" as const,
    scrollY: 80,
  },
  {
    tab: "dashboard",
    title: "Executive Insights",
    message: "Real-time KPIs and performance metrics for data-driven decisions",
    position: "right" as const,
    verticalPosition: "center" as const,
    scrollY: 0,
  },
  {
    tab: "dashboard",
    title: "Container Optimization",
    message: "Monitor utilization to maximize efficiency and reduce costs",
    position: "left" as const,
    verticalPosition: "bottom" as const,
    scrollY: 60,
  },
];

// ============================================
// TOOLTIP BUBBLE COMPONENT - Glassmorphism Style (Smooth transitions)
// ============================================
function TooltipBubble({
  title,
  message,
  position,
  verticalPosition,
  isVisible,
}: {
  title: string;
  message: string;
  position: "left" | "right";
  verticalPosition: "top" | "center" | "bottom";
  isVisible: boolean;
}) {
  // Position bubbles at fixed spots on the desktop background
  const positionStyles = {
    "left-top": { top: 60, left: 40 },
    "left-center": { top: 200, left: 30 },
    "left-bottom": { top: 340, left: 50 },
    "right-top": { top: 80, right: 40 },
    "right-center": { top: 220, right: 30 },
    "right-bottom": { top: 360, right: 50 },
  };

  const key = `${position}-${verticalPosition}` as keyof typeof positionStyles;
  const currentPos = positionStyles[key];

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={`${position}-${verticalPosition}`}
          initial={{
            opacity: 0,
            scale: 0.85,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            top: currentPos.top,
            left: "left" in currentPos ? currentPos.left : "auto",
            right: "right" in currentPos ? currentPos.right : "auto",
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            filter: "blur(8px)",
          }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
            opacity: { duration: 0.5 },
            filter: { duration: 0.6 },
          }}
          className="absolute z-50"
          style={{
            top: currentPos.top,
            left: "left" in currentPos ? currentPos.left : "auto",
            right: "right" in currentPos ? currentPos.right : "auto",
          }}
        >
          <motion.div
            className="relative bg-black/50 backdrop-blur-2xl rounded-2xl p-4 w-[190px] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1], // Smooth sine-like curve
              times: [0, 0.5, 1],
            }}
          >
            {/* Gradient shine effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none" />

            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-sm font-semibold text-white mb-1.5 relative z-10"
            >
              {title}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-[11px] text-white/80 leading-relaxed relative z-10"
            >
              {message}
            </motion.p>

            {/* Glowing accent line at top */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-orange-400/70 to-transparent origin-center"
            />

            {/* Pulsing dot indicator */}
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_16px_rgba(251,146,60,0.9)]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================
// TOUR PROGRESS INDICATOR
// ============================================
function TourProgress({ currentStep, totalSteps, isPaused, onToggle }: {
  currentStep: number;
  totalSteps: number;
  isPaused: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute -bottom-12 sm:-bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3"
    >
      {/* Progress dots */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <motion.div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentStep
                ? "w-6 bg-orange-500"
                : i < currentStep
                  ? "w-1.5 bg-orange-500/50"
                  : "w-1.5 bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Play/Pause button */}
      <button
        onClick={onToggle}
        className="ml-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-xs text-white/70 hover:text-white flex items-center gap-1.5"
      >
        {isPaused ? (
          <>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
            Play
          </>
        ) : (
          <>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
            </svg>
            Pause
          </>
        )}
      </button>
    </motion.div>
  );
}

// ============================================
// PREDICTION VIEW - Clean Enterprise SaaS Style
// ============================================
function PredictionView({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const [expandedSection, setExpandedSection] = useState<string | null>("routes");

  return (
    <div className="space-y-1">
      {/* Header with search */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] rounded-lg border border-white/5 mb-3">
        <Package className="h-4 w-4 text-zinc-400" />
        <span className="text-sm text-white font-medium">Container Optimizer</span>
        <div className="ml-auto flex items-center gap-1 text-[10px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded">
          <span>⌘</span><span>K</span>
        </div>
      </div>

      {/* Collapsible Routes Section */}
      <div
        className="flex items-center gap-2 px-3 py-2 hover:bg-white/[0.03] rounded-lg cursor-pointer transition-colors"
        onClick={() => setExpandedSection(expandedSection === "routes" ? null : "routes")}
      >
        <Ship className="h-4 w-4 text-zinc-500" />
        <span className="text-sm text-zinc-300">Active Routes</span>
        <ChevronDown className={`h-3.5 w-3.5 text-zinc-500 ml-auto transition-transform ${expandedSection === "routes" ? "rotate-180" : ""}`} />
      </div>

      {expandedSection === "routes" && (
        <div className="ml-6 space-y-0.5">
          {predictions.map((pred) => (
            <div
              key={pred.id}
              onClick={() => onSelect(pred.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                selectedId === pred.id
                  ? "bg-white/[0.08] text-white"
                  : "text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-300"
              }`}
            >
              <Package className="h-3.5 w-3.5" />
              <span className="text-sm">{pred.destination}</span>
              {pred.thresholdReached && (
                <span className="ml-auto text-[10px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded font-medium">
                  Ready
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Predictions Section */}
      <div
        className="flex items-center gap-2 px-3 py-2 hover:bg-white/[0.03] rounded-lg cursor-pointer transition-colors"
        onClick={() => setExpandedSection(expandedSection === "predictions" ? null : "predictions")}
      >
        <BarChart3 className="h-4 w-4 text-zinc-500" />
        <span className="text-sm text-zinc-300">AI Predictions</span>
        <ChevronDown className={`h-3.5 w-3.5 text-zinc-500 ml-auto transition-transform ${expandedSection === "predictions" ? "rotate-180" : ""}`} />
      </div>

      {/* Notifications Section */}
      <div className="flex items-center gap-2 px-3 py-2 hover:bg-white/[0.03] rounded-lg cursor-pointer transition-colors">
        <Bell className="h-4 w-4 text-zinc-500" />
        <span className="text-sm text-zinc-300">Notifications</span>
        <span className="ml-auto text-[10px] text-white bg-white/10 px-1.5 py-0.5 rounded">3</span>
      </div>

      {/* Bottom Status */}
      <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
        <div className="flex items-center gap-2 px-3 py-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs text-zinc-400">System Status</span>
          <span className="ml-auto text-[10px] text-emerald-400 font-medium">Optimal</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5">
          <Zap className="h-3.5 w-3.5 text-zinc-500" />
          <span className="text-xs text-zinc-400">AI Model</span>
          <span className="ml-auto text-[10px] text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded">v2.4</span>
        </div>
      </div>
    </div>
  );
}

// ============================================
// TRACKING VIEW - Clean Enterprise SaaS Style
// ============================================
function TrackingView() {
  const [expandedShipment, setExpandedShipment] = useState<string | null>("S-DXB-00847");

  const shipments = [
    { id: "S-DXB-00847", destination: "Mumbai, India", status: "processing", eta: "Dec 22-25" },
    { id: "S-DXB-00912", destination: "Chennai, India", status: "transit", eta: "Dec 28" },
  ];

  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] rounded-lg border border-white/5 mb-3">
        <Truck className="h-4 w-4 text-zinc-400" />
        <span className="text-sm text-white font-medium">Shipment Tracker</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-[10px] text-zinc-500">2 active</span>
        </div>
      </div>

      {/* Shipments List */}
      {shipments.map((shipment) => (
        <div key={shipment.id}>
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all ${
              expandedShipment === shipment.id
                ? "bg-white/[0.06] text-white"
                : "hover:bg-white/[0.03] text-zinc-400"
            }`}
            onClick={() => setExpandedShipment(expandedShipment === shipment.id ? null : shipment.id)}
          >
            <Package className="h-4 w-4 text-zinc-500" />
            <div className="flex-1">
              <span className="text-sm">{shipment.id}</span>
              <span className="text-[10px] text-zinc-500 ml-2">{shipment.destination}</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
              shipment.status === "processing"
                ? "text-amber-400 bg-amber-400/10"
                : "text-emerald-400 bg-emerald-400/10"
            }`}>
              {shipment.status === "processing" ? "Processing" : "In Transit"}
            </span>
            <ChevronDown className={`h-3.5 w-3.5 text-zinc-500 transition-transform ${expandedShipment === shipment.id ? "rotate-180" : ""}`} />
          </div>

          {/* Expanded Timeline */}
          <AnimatePresence>
            {expandedShipment === shipment.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="ml-6 mt-1 mb-2 p-3 bg-white/[0.02] rounded-lg border border-white/5">
                  {/* Timeline Steps */}
                  <div className="space-y-0">
                    {trackingSteps.map((step, index) => {
                      const isLast = index === trackingSteps.length - 1;
                      return (
                        <div key={index} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className={`w-2 h-2 rounded-full ${
                              step.completed ? "bg-emerald-400" : step.active ? "bg-white" : "bg-zinc-600"
                            }`} />
                            {!isLast && (
                              <div className={`w-px h-5 ${step.completed ? "bg-emerald-400/50" : "bg-zinc-700"}`} />
                            )}
                          </div>
                          <div className="flex-1 -mt-0.5 pb-2">
                            <p className={`text-xs ${step.active ? "text-white font-medium" : step.completed ? "text-zinc-300" : "text-zinc-500"}`}>
                              {step.status}
                            </p>
                            <p className="text-[10px] text-zinc-600">{step.location} · {step.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Details Row */}
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/5 text-[10px]">
                    <div>
                      <span className="text-zinc-500">Weight</span>
                      <span className="text-zinc-300 ml-1.5">12.5 kg</span>
                    </div>
                    <div>
                      <span className="text-zinc-500">CBM</span>
                      <span className="text-zinc-300 ml-1.5">0.072 m³</span>
                    </div>
                    <div className="ml-auto">
                      <span className="text-zinc-500">ETA</span>
                      <span className="text-white font-medium ml-1.5">{shipment.eta}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* Bottom Actions */}
      <div className="mt-3 pt-3 border-t border-white/5">
        <div className="flex items-center gap-2 px-3 py-2 hover:bg-white/[0.03] rounded-lg cursor-pointer transition-colors text-zinc-400 hover:text-zinc-300">
          <Bell className="h-4 w-4 text-zinc-500" />
          <span className="text-sm">Notifications</span>
          <span className="ml-auto text-[10px] text-white bg-white/10 px-1.5 py-0.5 rounded">2</span>
        </div>
      </div>
    </div>
  );
}

// ============================================
// DASHBOARD VIEW - Clean Enterprise SaaS Style
// ============================================
function DashboardView() {
  const [expandedSection, setExpandedSection] = useState<string | null>("overview");

  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] rounded-lg border border-white/5 mb-3">
        <BarChart3 className="h-4 w-4 text-zinc-400" />
        <span className="text-sm text-white font-medium">Executive Dashboard</span>
        <div className="ml-auto flex items-center gap-1 text-[10px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded">
          Live
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1" />
        </div>
      </div>

      {/* Overview Section */}
      <div
        className="flex items-center gap-2 px-3 py-2 hover:bg-white/[0.03] rounded-lg cursor-pointer transition-colors"
        onClick={() => setExpandedSection(expandedSection === "overview" ? null : "overview")}
      >
        <TrendingUp className="h-4 w-4 text-zinc-500" />
        <span className="text-sm text-zinc-300">Performance Overview</span>
        <ChevronDown className={`h-3.5 w-3.5 text-zinc-500 ml-auto transition-transform ${expandedSection === "overview" ? "rotate-180" : ""}`} />
      </div>

      {expandedSection === "overview" && (
        <div className="ml-6 space-y-1 mb-2">
          <div className="flex items-center justify-between px-3 py-2 hover:bg-white/[0.02] rounded-lg">
            <div className="flex items-center gap-2">
              <Package className="h-3.5 w-3.5 text-zinc-500" />
              <span className="text-sm text-zinc-400">Shipments</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white font-medium">1,284</span>
              <span className="text-[10px] text-emerald-400">+12.5%</span>
            </div>
          </div>
          <div className="flex items-center justify-between px-3 py-2 hover:bg-white/[0.02] rounded-lg">
            <div className="flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-zinc-500" />
              <span className="text-sm text-zinc-400">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white font-medium">AED 847K</span>
              <span className="text-[10px] text-emerald-400">+8.3%</span>
            </div>
          </div>
          <div className="flex items-center justify-between px-3 py-2 hover:bg-white/[0.02] rounded-lg">
            <div className="flex items-center gap-2">
              <Box className="h-3.5 w-3.5 text-zinc-500" />
              <span className="text-sm text-zinc-400">Utilization</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white font-medium">94.2%</span>
              <span className="text-[10px] text-emerald-400">+3.1%</span>
            </div>
          </div>
        </div>
      )}

      {/* Containers Section */}
      <div
        className="flex items-center gap-2 px-3 py-2 hover:bg-white/[0.03] rounded-lg cursor-pointer transition-colors"
        onClick={() => setExpandedSection(expandedSection === "containers" ? null : "containers")}
      >
        <Box className="h-4 w-4 text-zinc-500" />
        <span className="text-sm text-zinc-300">Active Containers</span>
        <span className="text-[10px] text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded ml-auto mr-2">4</span>
        <ChevronDown className={`h-3.5 w-3.5 text-zinc-500 transition-transform ${expandedSection === "containers" ? "rotate-180" : ""}`} />
      </div>

      {expandedSection === "containers" && (
        <div className="ml-6 p-3 bg-white/[0.02] rounded-lg border border-white/5 mb-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">MNF-2847</span>
              <span className="text-xs text-emerald-400">94% full</span>
            </div>
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400/80 rounded-full" style={{ width: "94%" }} />
            </div>
            <div className="flex items-center justify-between text-[10px] text-zinc-500">
              <span>Weight: 87%</span>
              <span>Volume: 94%</span>
            </div>
          </div>
        </div>
      )}

      {/* Alerts Section */}
      <div className="flex items-center gap-2 px-3 py-2 hover:bg-white/[0.03] rounded-lg cursor-pointer transition-colors">
        <AlertTriangle className="h-4 w-4 text-zinc-500" />
        <span className="text-sm text-zinc-300">Alerts</span>
        <span className="ml-auto text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded font-medium">1 new</span>
      </div>

      {/* Bottom Status */}
      <div className="mt-3 pt-3 border-t border-white/5">
        <div className="flex items-center justify-between px-3 py-1.5">
          <span className="text-xs text-zinc-500">Last updated</span>
          <span className="text-[10px] text-zinc-400">2 min ago</span>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export function InteractiveDemo() {
  const [selectedPrediction, setSelectedPrediction] = useState("1");
  const [activeTab, setActiveTab] = useState("predictions");
  const [currentTourStep, setCurrentTourStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto-play tour effect
  useEffect(() => {
    if (isPaused || hasInteracted) return;

    const interval = setInterval(() => {
      setCurrentTourStep((prev) => {
        const nextStep = (prev + 1) % tourSteps.length;
        // Change tab when moving to a step with different tab
        const nextTab = tourSteps[nextStep].tab;
        if (nextTab !== activeTab) {
          setActiveTab(nextTab);
        }
        return nextStep;
      });
    }, 4000); // 4 seconds per step

    return () => clearInterval(interval);
  }, [isPaused, hasInteracted, activeTab]);

  // Handle user interaction - pause auto-play
  const handleUserInteraction = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
      setIsPaused(true);
    }
  }, [hasInteracted]);

  // Handle tab change by user
  const handleTabChange = (tab: string) => {
    handleUserInteraction();
    setActiveTab(tab);
  };

  // Toggle play/pause
  const togglePause = () => {
    if (hasInteracted) {
      setHasInteracted(false);
    }
    setIsPaused(!isPaused);
  };

  const currentStep = tourSteps[currentTourStep];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh noise-overlay">
        {/* Animated Gradient Orbs */}
        <div className="gradient-orb gradient-orb-orange w-[600px] h-[600px] -top-40 -left-40" />
        <div className="gradient-orb gradient-orb-purple w-[500px] h-[500px] top-20 right-0" />
        <div className="gradient-orb gradient-orb-cyan w-[400px] h-[400px] bottom-0 left-1/3" />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm text-zinc-400 uppercase tracking-wider">
              Live Product Preview
            </span>
          </div>
          <h2 className="heading-serif text-3xl sm:text-4xl md:text-6xl text-white mb-3 sm:mb-4">See it in action</h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            Real interface components from the Voxarel platform. Click around and explore.
          </p>
        </div>

        {/* Centered Monitor Display */}
        <div className="max-w-6xl mx-auto px-3 sm:px-6">
          <div className="relative">
              {/* Ambient Glow */}
              <div className="absolute -inset-8 bg-gradient-to-r from-orange-500/20 via-purple-500/10 to-cyan-500/20 rounded-3xl blur-3xl opacity-40" />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Monitor Frame - LARGE */}
                <div className="relative">
                  {/* Screen bezel */}
                  <div className="bg-[#0a0a0a] rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-2xl">
                    {/* Screen with desktop wallpaper */}
                    <div
                      className="relative rounded-xl overflow-hidden bg-cover bg-center bg-no-repeat min-h-[450px] sm:min-h-[500px] md:min-h-[600px]"
                      style={{
                        backgroundImage: "url('/background_desktop.png')",
                      }}
                    >
                      {/* Tooltip Bubble - positioned on desktop background (hidden on mobile) */}
                      <div className="hidden md:block">
                        <TooltipBubble
                          title={currentStep.title}
                          message={currentStep.message}
                          position={currentStep.position}
                          verticalPosition={currentStep.verticalPosition}
                          isVisible={!hasInteracted}
                        />
                      </div>

                      {/* Single Large App Window - centered and prominent */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="absolute inset-6 flex items-start justify-center pt-4"
                      >
                        {/* App Window */}
                        <div className="relative">

                          <div
                            className="w-[calc(100vw-80px)] sm:w-[500px] md:w-[600px] bg-zinc-900/98 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 overflow-hidden"
                            onClick={handleUserInteraction}
                          >
                            {/* Window Chrome */}
                            <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-zinc-800/90 border-b border-white/5">
                              <div className="flex gap-1.5 sm:gap-2">
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                              </div>
                              <div className="flex-1 flex justify-center">
                                <div className="px-2 sm:px-4 py-0.5 sm:py-1 bg-white/10 rounded-md text-[10px] sm:text-xs text-zinc-400 font-mono">
                                  app.voxarel.com
                                </div>
                              </div>
                            </div>

                            {/* Demo Content */}
                            <div className="p-3 sm:p-5">
                              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                                <TabsList className="w-full justify-start mb-3 sm:mb-4 bg-white/5 p-0.5 sm:p-1 rounded-lg">
                                  <TabsTrigger
                                    value="predictions"
                                    className={`text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 data-[state=active]:bg-white/10 transition-all ${
                                      !hasInteracted && currentStep.tab === "predictions" ? "ring-2 ring-orange-500/60 ring-offset-1 ring-offset-transparent" : ""
                                    }`}
                                  >
                                    Predictions
                                  </TabsTrigger>
                                  <TabsTrigger
                                    value="tracking"
                                    className={`text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 data-[state=active]:bg-white/10 transition-all ${
                                      !hasInteracted && currentStep.tab === "tracking" ? "ring-2 ring-orange-500/60 ring-offset-1 ring-offset-transparent" : ""
                                    }`}
                                  >
                                    Tracking
                                  </TabsTrigger>
                                  <TabsTrigger
                                    value="dashboard"
                                    className={`text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 data-[state=active]:bg-white/10 transition-all ${
                                      !hasInteracted && currentStep.tab === "dashboard" ? "ring-2 ring-orange-500/60 ring-offset-1 ring-offset-transparent" : ""
                                    }`}
                                  >
                                    Dashboard
                                  </TabsTrigger>
                                </TabsList>

                                {/* Scrollable content area */}
                                <div className="h-[280px] sm:h-[300px] md:h-[320px] overflow-hidden relative">
                                  <motion.div
                                    animate={{ y: hasInteracted ? 0 : -currentStep.scrollY }}
                                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                                    className="absolute inset-x-0"
                                  >
                                    <AnimatePresence mode="wait">
                                      <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <TabsContent value="predictions" className="mt-0">
                                          <PredictionView
                                            selectedId={selectedPrediction}
                                            onSelect={(id) => {
                                              handleUserInteraction();
                                              setSelectedPrediction(id);
                                            }}
                                          />
                                        </TabsContent>

                                        <TabsContent value="tracking" className="mt-0">
                                          <TrackingView />
                                        </TabsContent>

                                        <TabsContent value="dashboard" className="mt-0">
                                          <DashboardView />
                                        </TabsContent>
                                      </motion.div>
                                    </AnimatePresence>
                                  </motion.div>

                                  {/* Scroll fade indicators */}
                                  {!hasInteracted && currentStep.scrollY > 0 && (
                                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-zinc-900 to-transparent pointer-events-none" />
                                  )}
                                </div>
                              </Tabs>
                            </div>
                          </div>

                          {/* Tour Progress Indicator */}
                          <TourProgress
                            currentStep={currentTourStep}
                            totalSteps={tourSteps.length}
                            isPaused={isPaused || hasInteracted}
                            onToggle={togglePause}
                          />
                        </div>
                      </motion.div>

                      {/* Small floating notification toast (hidden on small mobile) */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-30 hidden sm:flex"
                      >
                        <div className="bg-zinc-900/95 backdrop-blur-xl rounded-lg shadow-2xl border border-white/10 px-4 py-3 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-white">Container Booked</p>
                            <p className="text-[10px] text-zinc-400">Mumbai route • MNF-2847</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
