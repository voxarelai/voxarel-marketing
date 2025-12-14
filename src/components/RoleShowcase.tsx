"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Warehouse,
  Building2,
  DollarSign,
  BarChart3,
  Truck,
  Package,
  CheckCircle,
  Clock,
  Camera,
  Wifi,
  WifiOff,
  ScanLine,
  Box,
  FileText,
  CreditCard,
  TrendingUp,
  Users,
  MapPin,
  Phone,
  Navigation,
  AlertCircle,
  Receipt,
  Calculator,
  PieChart,
  ArrowUpRight,
  Shield,
  ChevronDown,
  Bell,
  Zap,
  LayoutDashboard,
} from "lucide-react";
import { DashboardFrame, NavItem } from "./DashboardFrame";

// ============================================
// ROLE DEFINITIONS
// ============================================
const roles = [
  {
    id: "field-agent",
    title: "Field Agent",
    icon: User,
    tagline: "Process 60+ packages daily",
    color: "orange",
  },
  {
    id: "warehouse",
    title: "Warehouse In-Charge",
    icon: Warehouse,
    tagline: "95%+ container utilization",
    color: "cyan",
  },
  {
    id: "branch",
    title: "Branch In-Charge",
    icon: Building2,
    tagline: "Same-day reconciliation",
    color: "purple",
  },
  {
    id: "finance",
    title: "Finance",
    icon: DollarSign,
    tagline: "Complete financial visibility",
    color: "emerald",
  },
  {
    id: "operations",
    title: "Operations Manager",
    icon: BarChart3,
    tagline: "Multi-branch control center",
    color: "amber",
  },
  {
    id: "rider",
    title: "Rider",
    icon: Truck,
    tagline: "First-mile pickup & last-mile delivery",
    color: "blue",
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  orange: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/30" },
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/30" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
};

// ============================================
// TOUR STEPS - Positioned around the desktop
// ============================================
const tourSteps = [
  {
    roleId: "field-agent",
    title: "Mobile-First Collection",
    message: "Field agents process packages in under 3 minutes with automatic CBM calculations",
    position: "right" as const,
    verticalPosition: "top" as const,
  },
  {
    roleId: "warehouse",
    title: "Scan-Driven Workflows",
    message: "Every package tracked through barcode scanning from receiving to loading",
    position: "left" as const,
    verticalPosition: "center" as const,
  },
  {
    roleId: "branch",
    title: "Daily Reconciliation",
    message: "Branch managers reconcile cash and payments same-day with full audit trails",
    position: "right" as const,
    verticalPosition: "bottom" as const,
  },
  {
    roleId: "finance",
    title: "Financial Control",
    message: "Complete invoicing, VAT compliance, and export to your accounting software",
    position: "left" as const,
    verticalPosition: "top" as const,
  },
  {
    roleId: "operations",
    title: "Multi-Branch Visibility",
    message: "See performance across all branches in real-time with predictive alerts",
    position: "right" as const,
    verticalPosition: "center" as const,
  },
  {
    roleId: "rider",
    title: "First & Last Mile",
    message: "Pickup shipments at origin, deliver at destination — with real-time tracking and proof capture",
    position: "left" as const,
    verticalPosition: "bottom" as const,
  },
];

// ============================================
// TOOLTIP BUBBLE - Glassmorphism Style (like InteractiveDemo)
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
          initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            top: currentPos.top,
            left: "left" in currentPos ? currentPos.left : "auto",
            right: "right" in currentPos ? currentPos.right : "auto",
          }}
          exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
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
              ease: [0.45, 0, 0.55, 1],
              times: [0, 0.5, 1],
            }}
          >
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
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-orange-400/70 to-transparent origin-center"
            />
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
function TourProgress({
  currentStep,
  totalSteps,
  isPaused,
  onToggle,
}: {
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
// FIELD AGENT VIEW
// ============================================
function FieldAgentView() {
  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] rounded-lg border border-white/5 mb-3">
        <User className="h-4 w-4 text-orange-400" />
        <span className="text-sm text-white font-medium">Field Collections</span>
        <div className="ml-auto flex items-center gap-1 text-[10px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded">
          Ahmed K.
        </div>
      </div>

      {/* Today's Progress */}
      <div className="px-3 py-2 bg-white/[0.03] rounded-lg border border-white/5 mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-zinc-400">Today's Collections</span>
          <span className="text-sm font-bold text-white">47<span className="text-zinc-500 text-xs">/60</span></span>
        </div>
        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "78%" }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
        <p className="text-[10px] text-zinc-500 mt-1">13 more to hit target</p>
      </div>

      {/* Recent Collections */}
      <div className="flex items-center gap-2 px-3 py-2 hover:bg-white/[0.03] rounded-lg cursor-pointer transition-colors">
        <Package className="h-4 w-4 text-zinc-500" />
        <span className="text-sm text-zinc-300">Recent Collections</span>
        <ChevronDown className="h-3.5 w-3.5 text-zinc-500 ml-auto" />
      </div>

      <div className="ml-6 space-y-0.5">
        {[
          { id: "S-DXB-00847", dest: "Mumbai", time: "10 min ago", amount: "245" },
          { id: "S-DXB-00848", dest: "Chennai", time: "25 min ago", amount: "180" },
          { id: "S-DXB-00849", dest: "Delhi", time: "1 hr ago", amount: "320" },
        ].map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-300 transition-all"
          >
            <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-sm">{item.id}</span>
            <span className="text-[10px] text-zinc-500">{item.dest}</span>
            <span className="ml-auto text-[10px] text-emerald-400">AED {item.amount}</span>
          </div>
        ))}
      </div>

      {/* Bottom Status */}
      <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
        <div className="flex items-center gap-2 px-3 py-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs text-zinc-400">Sync Status</span>
          <span className="ml-auto text-[10px] text-emerald-400 font-medium">Online</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5">
          <Camera className="h-3.5 w-3.5 text-zinc-500" />
          <span className="text-xs text-zinc-400">Photos Captured</span>
          <span className="ml-auto text-[10px] text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded">142</span>
        </div>
      </div>
    </div>
  );
}

// ============================================
// WAREHOUSE VIEW
// ============================================
function WarehouseView() {
  const [expandedSection, setExpandedSection] = useState<string | null>("containers");

  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] rounded-lg border border-white/5 mb-3">
        <ScanLine className="h-4 w-4 text-cyan-400" />
        <span className="text-sm text-white font-medium">Warehouse Operations</span>
        <div className="ml-auto flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </div>
      </div>

      {/* Containers Section */}
      <div
        className="flex items-center gap-2 px-3 py-2 hover:bg-white/[0.03] rounded-lg cursor-pointer transition-colors"
        onClick={() => setExpandedSection(expandedSection === "containers" ? null : "containers")}
      >
        <Box className="h-4 w-4 text-zinc-500" />
        <span className="text-sm text-zinc-300">Active Containers</span>
        <span className="text-[10px] text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded ml-auto mr-2">2</span>
        <ChevronDown className={`h-3.5 w-3.5 text-zinc-500 transition-transform ${expandedSection === "containers" ? "rotate-180" : ""}`} />
      </div>

      {expandedSection === "containers" && (
        <div className="ml-6 p-3 bg-white/[0.02] rounded-lg border border-white/5 mb-2 space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-zinc-400">Mumbai - MNF-2847</span>
              <span className="text-xs text-emerald-400">94%</span>
            </div>
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full w-[94%] bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full" />
            </div>
            <p className="text-[10px] text-emerald-400 mt-1">Ready to book</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-zinc-400">Chennai - MNF-2848</span>
              <span className="text-xs text-amber-400">67%</span>
            </div>
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full w-[67%] bg-gradient-to-r from-amber-500 to-orange-400 rounded-full" />
            </div>
            <p className="text-[10px] text-zinc-500 mt-1">Loading in progress</p>
          </div>
        </div>
      )}

      {/* Scan Queue Section */}
      <div className="flex items-center gap-2 px-3 py-2 hover:bg-white/[0.03] rounded-lg cursor-pointer transition-colors">
        <ScanLine className="h-4 w-4 text-zinc-500" />
        <span className="text-sm text-zinc-300">Pending Scans</span>
        <span className="ml-auto text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded font-medium">12</span>
      </div>

      {/* Stats */}
      <div className="mt-4 pt-3 border-t border-white/5">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/[0.02] rounded-lg p-2">
            <p className="text-sm font-bold text-white">847</p>
            <p className="text-[10px] text-zinc-500">Received</p>
          </div>
          <div className="bg-white/[0.02] rounded-lg p-2">
            <p className="text-sm font-bold text-white">812</p>
            <p className="text-[10px] text-zinc-500">Scanned</p>
          </div>
          <div className="bg-white/[0.02] rounded-lg p-2">
            <p className="text-sm font-bold text-emerald-400">96%</p>
            <p className="text-[10px] text-zinc-500">Verified</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// BRANCH IN-CHARGE VIEW
// ============================================
function BranchInChargeView() {
  const [expandedSection, setExpandedSection] = useState<string | null>("agents");

  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] rounded-lg border border-white/5 mb-3">
        <Building2 className="h-4 w-4 text-purple-400" />
        <span className="text-sm text-white font-medium">Branch Reconciliation</span>
        <div className="ml-auto text-[10px] text-zinc-500">Dubai Main</div>
      </div>

      {/* Today's Summary */}
      <div className="px-3 py-3 bg-gradient-to-br from-purple-500/10 to-violet-500/5 rounded-lg border border-purple-500/20 mb-3">
        <p className="text-[10px] text-purple-300 mb-1">Today's Collection</p>
        <div className="flex items-end gap-2">
          <span className="text-xl font-bold text-white">AED 24,850</span>
          <span className="text-[10px] text-emerald-400 mb-1">+18.5%</span>
        </div>
      </div>

      {/* Agent Reconciliation */}
      <div
        className="flex items-center gap-2 px-3 py-2 hover:bg-white/[0.03] rounded-lg cursor-pointer transition-colors"
        onClick={() => setExpandedSection(expandedSection === "agents" ? null : "agents")}
      >
        <Users className="h-4 w-4 text-zinc-500" />
        <span className="text-sm text-zinc-300">Agent Reconciliation</span>
        <span className="text-[10px] text-emerald-400 ml-auto mr-2">3/5</span>
        <ChevronDown className={`h-3.5 w-3.5 text-zinc-500 transition-transform ${expandedSection === "agents" ? "rotate-180" : ""}`} />
      </div>

      {expandedSection === "agents" && (
        <div className="ml-6 space-y-0.5 mb-2">
          {[
            { name: "Ahmed K.", amount: "8,450", status: "verified" },
            { name: "Fatima S.", amount: "6,200", status: "verified" },
            { name: "Mohammed R.", amount: "5,100", status: "verified" },
            { name: "Sara A.", amount: "3,200", status: "pending" },
            { name: "Hassan M.", amount: "1,900", status: "pending" },
          ].map((agent) => (
            <div key={agent.name} className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/[0.02]">
              <div className={`w-1.5 h-1.5 rounded-full ${agent.status === "verified" ? "bg-emerald-400" : "bg-amber-400"}`} />
              <span className="text-xs text-zinc-300">{agent.name}</span>
              <span className="text-xs text-white ml-auto">AED {agent.amount}</span>
              {agent.status === "verified" ? (
                <CheckCircle className="w-3 h-3 text-emerald-400" />
              ) : (
                <Clock className="w-3 h-3 text-amber-400" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Deposits */}
      <div className="flex items-center gap-2 px-3 py-2 hover:bg-white/[0.03] rounded-lg cursor-pointer transition-colors">
        <CreditCard className="h-4 w-4 text-zinc-500" />
        <span className="text-sm text-zinc-300">Bank Deposits</span>
        <span className="ml-auto text-[10px] text-zinc-500">1 pending</span>
      </div>

      {/* Bottom Status */}
      <div className="mt-3 pt-3 border-t border-white/5">
        <div className="flex items-center justify-between px-3 py-1.5">
          <span className="text-xs text-zinc-500">Reconciliation deadline</span>
          <span className="text-[10px] text-amber-400">6:00 PM today</span>
        </div>
      </div>
    </div>
  );
}

// ============================================
// FINANCE VIEW
// ============================================
function FinanceView() {
  const [expandedSection, setExpandedSection] = useState<string | null>("revenue");

  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] rounded-lg border border-white/5 mb-3">
        <DollarSign className="h-4 w-4 text-emerald-400" />
        <span className="text-sm text-white font-medium">Finance Dashboard</span>
        <div className="ml-auto flex items-center gap-1 text-[10px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded">
          Dec 2024
        </div>
      </div>

      {/* Revenue Section */}
      <div
        className="flex items-center gap-2 px-3 py-2 hover:bg-white/[0.03] rounded-lg cursor-pointer transition-colors"
        onClick={() => setExpandedSection(expandedSection === "revenue" ? null : "revenue")}
      >
        <TrendingUp className="h-4 w-4 text-zinc-500" />
        <span className="text-sm text-zinc-300">Revenue Overview</span>
        <ChevronDown className={`h-3.5 w-3.5 text-zinc-500 ml-auto transition-transform ${expandedSection === "revenue" ? "rotate-180" : ""}`} />
      </div>

      {expandedSection === "revenue" && (
        <div className="ml-6 space-y-1 mb-2">
          <div className="flex items-center justify-between px-3 py-2 hover:bg-white/[0.02] rounded-lg">
            <span className="text-sm text-zinc-400">Monthly Revenue</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white font-medium">AED 847K</span>
              <span className="text-[10px] text-emerald-400">+12.3%</span>
            </div>
          </div>
          <div className="flex items-center justify-between px-3 py-2 hover:bg-white/[0.02] rounded-lg">
            <span className="text-sm text-zinc-400">Outstanding</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-amber-400 font-medium">AED 42K</span>
              <span className="text-[10px] text-zinc-500">18 inv</span>
            </div>
          </div>
          <div className="flex items-center justify-between px-3 py-2 hover:bg-white/[0.02] rounded-lg">
            <span className="text-sm text-zinc-400">VAT Collected (5%)</span>
            <span className="text-sm text-white font-medium">AED 42,350</span>
          </div>
        </div>
      )}

      {/* Invoices */}
      <div className="flex items-center gap-2 px-3 py-2 hover:bg-white/[0.03] rounded-lg cursor-pointer transition-colors">
        <FileText className="h-4 w-4 text-zinc-500" />
        <span className="text-sm text-zinc-300">Invoices</span>
        <span className="ml-auto text-[10px] text-white bg-white/10 px-1.5 py-0.5 rounded">1,284</span>
      </div>

      {/* Export */}
      <div className="flex items-center gap-2 px-3 py-2 hover:bg-white/[0.03] rounded-lg cursor-pointer transition-colors">
        <ArrowUpRight className="h-4 w-4 text-zinc-500" />
        <span className="text-sm text-zinc-300">Export to Accounting</span>
      </div>

      {/* Bottom Status */}
      <div className="mt-3 pt-3 border-t border-white/5">
        <div className="flex items-center gap-2 px-3 py-1.5">
          <Shield className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-xs text-zinc-400">UAE VAT Compliant</span>
          <span className="ml-auto text-[10px] text-emerald-400">Verified</span>
        </div>
      </div>
    </div>
  );
}

// ============================================
// OPERATIONS MANAGER VIEW
// ============================================
function OperationsManagerView() {
  const [expandedSection, setExpandedSection] = useState<string | null>("overview");

  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] rounded-lg border border-white/5 mb-3">
        <BarChart3 className="h-4 w-4 text-amber-400" />
        <span className="text-sm text-white font-medium">Operations Center</span>
        <div className="ml-auto flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          All online
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

      {/* Branches */}
      <div className="flex items-center gap-2 px-3 py-2 hover:bg-white/[0.03] rounded-lg cursor-pointer transition-colors">
        <Building2 className="h-4 w-4 text-zinc-500" />
        <span className="text-sm text-zinc-300">Branch Performance</span>
        <span className="text-[10px] text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded ml-auto">5</span>
      </div>

      {/* Alerts */}
      <div className="flex items-center gap-2 px-3 py-2 hover:bg-white/[0.03] rounded-lg cursor-pointer transition-colors">
        <AlertCircle className="h-4 w-4 text-zinc-500" />
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
// RIDER VIEW
// ============================================
function RiderView() {
  const [mode, setMode] = useState<"pickup" | "delivery">("pickup");

  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] rounded-lg border border-white/5 mb-3">
        <Truck className="h-4 w-4 text-blue-400" />
        <span className="text-sm text-white font-medium">Rider Operations</span>
        <div className="ml-auto flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          En Route
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-1 p-1 bg-white/[0.03] rounded-lg mb-3">
        <button
          onClick={() => setMode("pickup")}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            mode === "pickup"
              ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
              : "text-zinc-400 hover:text-zinc-300"
          }`}
        >
          <Package className="w-3 h-3" />
          First Mile
        </button>
        <button
          onClick={() => setMode("delivery")}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            mode === "delivery"
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
              : "text-zinc-400 hover:text-zinc-300"
          }`}
        >
          <Navigation className="w-3 h-3" />
          Last Mile
        </button>
      </div>

      {mode === "pickup" ? (
        <>
          {/* Current Pickup */}
          <div className="px-3 py-3 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 rounded-lg border border-blue-500/20 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[10px] text-blue-300">Active Pickup</span>
            </div>
            <p className="text-sm font-medium text-white mb-0.5">Al Quoz Industrial</p>
            <p className="text-[10px] text-zinc-400">Collect 8 packages • Sender: Gulf Trading LLC</p>
          </div>

          {/* Pickup Queue */}
          <div className="flex items-center gap-2 px-3 py-2 hover:bg-white/[0.03] rounded-lg cursor-pointer transition-colors">
            <Package className="h-4 w-4 text-zinc-500" />
            <span className="text-sm text-zinc-300">Pickup Queue</span>
            <span className="ml-auto text-[10px] text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded">3 stops</span>
          </div>

          <div className="ml-6 space-y-0.5">
            {[
              { loc: "Jebel Ali Free Zone", pkgs: "12 pkgs", eta: "25 min" },
              { loc: "DIP Warehouse", pkgs: "5 pkgs", eta: "45 min" },
            ].map((pickup, i) => (
              <div key={pickup.loc} className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/[0.02]">
                <span className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400">{i + 2}</span>
                <div className="flex-1">
                  <span className="text-xs text-zinc-300">{pickup.loc}</span>
                  <span className="text-[10px] text-zinc-500 ml-2">{pickup.pkgs}</span>
                </div>
                <span className="text-[10px] text-zinc-500">{pickup.eta}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Current Delivery */}
          <div className="px-3 py-3 bg-gradient-to-br from-emerald-500/10 to-green-500/5 rounded-lg border border-emerald-500/20 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-300">Active Delivery</span>
            </div>
            <p className="text-sm font-medium text-white mb-0.5">Rashid Mohammed</p>
            <p className="text-[10px] text-zinc-400">Al Rigga Road, Building 45 • COD: AED 180</p>
          </div>

          {/* Delivery Queue */}
          <div className="flex items-center gap-2 px-3 py-2 hover:bg-white/[0.03] rounded-lg cursor-pointer transition-colors">
            <Navigation className="h-4 w-4 text-zinc-500" />
            <span className="text-sm text-zinc-300">Delivery Queue</span>
            <span className="ml-auto text-[10px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">4 stops</span>
          </div>

          <div className="ml-6 space-y-0.5">
            {[
              { name: "Sarah Ali", area: "Business Bay", eta: "15 min" },
              { name: "Ahmed Hassan", area: "Downtown", eta: "28 min" },
            ].map((delivery, i) => (
              <div key={delivery.name} className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/[0.02]">
                <span className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400">{i + 2}</span>
                <div className="flex-1">
                  <span className="text-xs text-zinc-300">{delivery.name}</span>
                  <span className="text-[10px] text-zinc-500 ml-2">{delivery.area}</span>
                </div>
                <span className="text-[10px] text-zinc-500">{delivery.eta}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Bottom Stats */}
      <div className="mt-3 pt-3 border-t border-white/5">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/[0.02] rounded-lg p-2">
            <p className="text-sm font-bold text-blue-400">8</p>
            <p className="text-[10px] text-zinc-500">Picked Up</p>
          </div>
          <div className="bg-white/[0.02] rounded-lg p-2">
            <p className="text-sm font-bold text-emerald-400">12</p>
            <p className="text-[10px] text-zinc-500">Delivered</p>
          </div>
          <div className="bg-white/[0.02] rounded-lg p-2">
            <p className="text-sm font-bold text-white">100%</p>
            <p className="text-[10px] text-zinc-500">On-Time</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Navigation items for the dashboard sidebar (converted from roles)
const roleNavItems: NavItem[] = roles.map((role) => ({
  id: role.id,
  label: role.title,
  icon: role.icon,
}));

// ============================================
// MAIN COMPONENT
// ============================================
export function RoleShowcase() {
  const [activeRole, setActiveRole] = useState("field-agent");
  const [currentTourStep, setCurrentTourStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const activeRoleData = roles.find((r) => r.id === activeRole)!;
  const colors = colorClasses[activeRoleData.color];
  const currentTour = tourSteps[currentTourStep];

  // Auto-play tour
  useEffect(() => {
    if (isPaused || hasInteracted) return;

    const interval = setInterval(() => {
      setCurrentTourStep((prev) => {
        const nextStep = (prev + 1) % tourSteps.length;
        setActiveRole(tourSteps[nextStep].roleId);
        return nextStep;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, hasInteracted]);

  const handleRoleSelect = useCallback((roleId: string) => {
    setHasInteracted(true);
    setIsPaused(true);
    setActiveRole(roleId);
    const stepIndex = tourSteps.findIndex((s) => s.roleId === roleId);
    if (stepIndex !== -1) setCurrentTourStep(stepIndex);
  }, []);

  const handleUserInteraction = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
      setIsPaused(true);
    }
  }, [hasInteracted]);

  const togglePause = () => {
    if (hasInteracted) setHasInteracted(false);
    setIsPaused(!isPaused);
  };

  const renderRoleView = () => {
    switch (activeRole) {
      case "field-agent": return <FieldAgentView />;
      case "warehouse": return <WarehouseView />;
      case "branch": return <BranchInChargeView />;
      case "finance": return <FinanceView />;
      case "operations": return <OperationsManagerView />;
      case "rider": return <RiderView />;
      default: return <FieldAgentView />;
    }
  };

  // Bottom status for sidebar
  const bottomStatus = (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="text-xs text-zinc-400">System Status</span>
        <span className="ml-auto text-[10px] text-emerald-400 font-medium">Online</span>
      </div>
      <div className="flex items-center gap-2">
        <Users className="h-3.5 w-3.5 text-zinc-500" />
        <span className="text-xs text-zinc-400">Active Users</span>
        <span className="ml-auto text-[10px] text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded">24</span>
      </div>
    </div>
  );

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh noise-overlay">
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
              Complete ERP Platform
            </span>
          </div>
          <h2 className="heading-serif text-3xl sm:text-4xl md:text-6xl text-white mb-3 sm:mb-4">
            One ERP, six specialized roles
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            Every team member gets a purpose-built experience — field agents, warehouse managers, finance, and beyond.
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
                    style={{ backgroundImage: "url('/background_desktop.png')" }}
                  >
                    {/* Tooltip Bubble - positioned on desktop background */}
                    <div className="hidden md:block">
                      <TooltipBubble
                        title={currentTour.title}
                        message={currentTour.message}
                        position={currentTour.position}
                        verticalPosition={currentTour.verticalPosition}
                        isVisible={!hasInteracted}
                      />
                    </div>

                    {/* App Window with Dashboard Frame */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="absolute inset-6 flex items-start justify-center pt-4"
                      onClick={handleUserInteraction}
                    >
                      <div className="relative">
                        <DashboardFrame
                          url="app.voxarel.com"
                          navItems={roleNavItems}
                          activeItem={activeRole}
                          onItemSelect={handleRoleSelect}
                          header={{
                            icon: LayoutDashboard,
                            title: "Voxarel ERP",
                            subtitle: "6 specialized roles",
                          }}
                          bottomStatus={bottomStatus}
                        >
                          {/* Role Header */}
                          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/5">
                            <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
                              <activeRoleData.icon className={`w-5 h-5 ${colors.text}`} />
                            </div>
                            <div>
                              <h3 className="text-sm sm:text-base font-semibold text-white">{activeRoleData.title}</h3>
                              <p className={`text-[10px] sm:text-xs ${colors.text}`}>{activeRoleData.tagline}</p>
                            </div>
                          </div>

                          {/* Role View Content */}
                          <div className="h-[280px] sm:h-[320px] overflow-hidden">
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={activeRole}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                              >
                                {renderRoleView()}
                              </motion.div>
                            </AnimatePresence>
                          </div>
                        </DashboardFrame>

                        {/* Tour Progress Indicator */}
                        <TourProgress
                          currentStep={currentTourStep}
                          totalSteps={tourSteps.length}
                          isPaused={isPaused || hasInteracted}
                          onToggle={togglePause}
                        />
                      </div>
                    </motion.div>

                    {/* Floating notification toast */}
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
                          <p className="text-xs font-medium text-white">Role View Active</p>
                          <p className="text-[10px] text-zinc-400">{activeRoleData.title} • Live data</p>
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
