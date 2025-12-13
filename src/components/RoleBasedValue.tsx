"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  User,
  Warehouse,
  BarChart3,
  Settings,
  Clock,
  Shield,
  TrendingUp,
  Zap,
  CheckCircle,
  Users,
  Package,
  DollarSign,
} from "lucide-react";

const roles = [
  {
    id: "agent",
    title: "Field Agent",
    icon: User,
    tagline: "Process 60+ packages daily",
    description: "Mobile-first tools that make every collection faster and error-free",
    color: "orange",
    benefits: [
      {
        icon: Clock,
        title: "3-Minute Collections",
        description: "Auto CBM calculations eliminate manual math errors",
      },
      {
        icon: Shield,
        title: "Dispute Protection",
        description: "Photo documentation at collection prevents claims",
      },
      {
        icon: DollarSign,
        title: "Instant Pricing",
        description: "Real-time quotes without calling the office",
      },
      {
        icon: CheckCircle,
        title: "One-Thumb Operation",
        description: "Complete workflows without complex navigation",
      },
    ],
  },
  {
    id: "warehouse",
    title: "Warehouse Manager",
    icon: Warehouse,
    tagline: "95%+ container utilization",
    description: "Predictive tools that eliminate guesswork from container planning",
    color: "cyan",
    benefits: [
      {
        icon: TrendingUp,
        title: "7-Day Predictions",
        description: "Know container capacity before it fills",
      },
      {
        icon: Package,
        title: "3D Load Optimization",
        description: "SeaRates integration for perfect packing",
      },
      {
        icon: Zap,
        title: "2-Hour Loading",
        description: "Step-by-step sequences reduce loading time",
      },
      {
        icon: CheckCircle,
        title: "Zero Leftovers",
        description: "Proactive booking eliminates delay packages",
      },
    ],
  },
  {
    id: "operations",
    title: "Operations Manager",
    icon: BarChart3,
    tagline: "Complete operational visibility",
    description: "Real-time dashboards and controls across all branches",
    color: "purple",
    benefits: [
      {
        icon: Users,
        title: "Multi-Branch View",
        description: "Live metrics from all 5+ branches instantly",
      },
      {
        icon: Shield,
        title: "Approval Workflows",
        description: "Price changes require authorization with audit trail",
      },
      {
        icon: DollarSign,
        title: "Financial Reports",
        description: "P&L by branch, payment reconciliation, forecasting",
      },
      {
        icon: TrendingUp,
        title: "Performance Analytics",
        description: "Agent productivity and branch comparisons",
      },
    ],
  },
  {
    id: "admin",
    title: "Administrator",
    icon: Settings,
    tagline: "Enterprise-grade control",
    description: "Full system configuration with security and compliance",
    color: "emerald",
    benefits: [
      {
        icon: Users,
        title: "Role-Based Access",
        description: "Granular permissions for every user type",
      },
      {
        icon: Shield,
        title: "Complete Audit Trail",
        description: "Every action logged with user and timestamp",
      },
      {
        icon: Zap,
        title: "99.5% Uptime",
        description: "Enterprise infrastructure that scales",
      },
      {
        icon: CheckCircle,
        title: "Compliance Ready",
        description: "PCI DSS, GDPR, TLS 1.3 encryption",
      },
    ],
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  orange: {
    bg: "bg-orange-500/10",
    text: "text-orange-400",
    border: "border-orange-500/30",
    gradient: "from-orange-500 to-amber-500",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    border: "border-cyan-500/30",
    gradient: "from-cyan-500 to-blue-500",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-purple-500/30",
    gradient: "from-purple-500 to-violet-500",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    gradient: "from-emerald-500 to-green-500",
  },
};

export function RoleBasedValue() {
  const [activeRole, setActiveRole] = useState("agent");
  const activeRoleData = roles.find((r) => r.id === activeRole)!;
  const colors = colorClasses[activeRoleData.color];

  return (
    <section className="relative py-24 overflow-hidden bg-[#09090b]">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,.3) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-orange-500 rounded-full" />
            <span className="text-sm text-zinc-400 uppercase tracking-wider">Built for Every Role</span>
          </div>
          <h2 className="heading-serif text-3xl md:text-5xl text-white mb-4">
            One platform,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              tailored experiences
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Whether you're collecting packages in the field or managing operations across branches,
            Voxarel adapts to how you work.
          </p>
        </motion.div>

        {/* Role Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {roles.map((role) => {
            const roleColors = colorClasses[role.color];
            const Icon = role.icon;
            const isActive = activeRole === role.id;

            return (
              <motion.button
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? `${roleColors.bg} ${roleColors.border} border`
                    : "bg-white/5 border border-transparent hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className={`w-4 h-4 ${isActive ? roleColors.text : "text-zinc-400"}`} />
                <span className={`text-sm font-medium ${isActive ? "text-white" : "text-zinc-400"}`}>
                  {role.title}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Active Role Content */}
        <motion.div
          key={activeRole}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-2 gap-8 items-center"
        >
          {/* Left - Role Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                <activeRoleData.icon className={`w-6 h-6 ${colors.text}`} />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white">{activeRoleData.title}</h3>
                <p className={`text-sm ${colors.text}`}>{activeRoleData.tagline}</p>
              </div>
            </div>

            <p className="text-zinc-400 text-lg mb-8">{activeRoleData.description}</p>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {activeRoleData.benefits.map((benefit, index) => {
                const BenefitIcon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white/[0.03] rounded-xl p-4 border border-white/5"
                  >
                    <BenefitIcon className={`w-5 h-5 ${colors.text} mb-2`} />
                    <h4 className="text-white font-medium mb-1">{benefit.title}</h4>
                    <p className="text-sm text-zinc-500">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right - Visual */}
          <div className="relative">
            <div className={`absolute -inset-4 bg-gradient-to-r ${colors.gradient} rounded-3xl blur-3xl opacity-10`} />

            <div className="relative bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              {/* Mock Interface */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <span className="text-[10px] text-zinc-500 bg-white/5 px-3 py-0.5 rounded">
                    {activeRoleData.title} View
                  </span>
                </div>
              </div>

              {/* Role-specific mock content */}
              <div className="space-y-3">
                {activeRole === "agent" && (
                  <>
                    <div className="bg-white/[0.03] rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-zinc-400">Today's Collections</span>
                        <span className="text-lg font-bold text-white">47</span>
                      </div>
                      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" />
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1">Goal: 60 packages</p>
                    </div>
                    <div className="bg-emerald-500/10 rounded-lg p-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-emerald-300">S-DXB-00849 collected successfully</span>
                    </div>
                  </>
                )}

                {activeRole === "warehouse" && (
                  <>
                    <div className="bg-white/[0.03] rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-zinc-400">Mumbai Container</span>
                        <span className="text-lg font-bold text-emerald-400">87%</span>
                      </div>
                      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full w-[87%] bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full" />
                      </div>
                      <p className="text-[10px] text-emerald-400 mt-1">Ready to book</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-white/[0.03] rounded-lg p-2">
                        <p className="text-sm font-bold text-white">52.4</p>
                        <p className="text-[10px] text-zinc-500">CBM Used</p>
                      </div>
                      <div className="bg-white/[0.03] rounded-lg p-2">
                        <p className="text-sm font-bold text-white">94%</p>
                        <p className="text-[10px] text-zinc-500">Confidence</p>
                      </div>
                      <div className="bg-white/[0.03] rounded-lg p-2">
                        <p className="text-sm font-bold text-white">3d</p>
                        <p className="text-[10px] text-zinc-500">To Book</p>
                      </div>
                    </div>
                  </>
                )}

                {activeRole === "operations" && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white/[0.03] rounded-lg p-3">
                        <p className="text-[10px] text-zinc-500">Revenue (MTD)</p>
                        <p className="text-lg font-bold text-white">847K</p>
                        <p className="text-[10px] text-emerald-400">+12% vs last month</p>
                      </div>
                      <div className="bg-white/[0.03] rounded-lg p-3">
                        <p className="text-[10px] text-zinc-500">Active Branches</p>
                        <p className="text-lg font-bold text-white">5</p>
                        <p className="text-[10px] text-zinc-500">All operational</p>
                      </div>
                    </div>
                    <div className="bg-amber-500/10 rounded-lg p-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span className="text-xs text-amber-300">3 invoices pending approval</span>
                    </div>
                  </>
                )}

                {activeRole === "admin" && (
                  <>
                    <div className="bg-white/[0.03] rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-zinc-400">System Status</span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                          <span className="text-xs text-emerald-400">All Systems Operational</span>
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white/[0.03] rounded-lg p-2">
                        <p className="text-[10px] text-zinc-500">Active Users</p>
                        <p className="text-sm font-bold text-white">47</p>
                      </div>
                      <div className="bg-white/[0.03] rounded-lg p-2">
                        <p className="text-[10px] text-zinc-500">Uptime</p>
                        <p className="text-sm font-bold text-emerald-400">99.9%</p>
                      </div>
                    </div>
                    <div className="bg-white/[0.03] rounded-lg p-3 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-zinc-400">Last audit: 2 hours ago</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
