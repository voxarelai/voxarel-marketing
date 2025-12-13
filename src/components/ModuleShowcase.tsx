"use client";

import { motion } from "framer-motion";
import {
  Package,
  Truck,
  Warehouse,
  CreditCard,
  BarChart3,
  Bell,
  Box,
  Zap,
  Map,
  Users,
  FileText,
  Shield,
} from "lucide-react";

const modules = [
  {
    icon: Package,
    title: "Digital Collection",
    description: "Mobile-first package intake with automatic CBM calculations, photo documentation, and instant AWB generation.",
    features: ["Auto volumetric weight", "Multi-box tracking", "Photo capture"],
    color: "orange",
  },
  {
    icon: Box,
    title: "Container Prediction",
    description: "AI-powered forecasting predicts container fill rates 7-10 days in advance, eliminating reactive booking.",
    features: ["85% threshold alerts", "3D load optimization", "SeaRates integration"],
    color: "purple",
  },
  {
    icon: Warehouse,
    title: "Warehouse Management",
    description: "Barcode-driven receiving, priority handling, and systematic loading workflows for 95%+ utilization.",
    features: ["Barcode scanning", "Priority queues", "Loading sequences"],
    color: "cyan",
  },
  {
    icon: CreditCard,
    title: "Payment Processing",
    description: "Multi-channel payments with cash recording, payment links, and POS integration. Same-day reconciliation.",
    features: ["Cash + Card + Links", "Auto reconciliation", "Invoice workflows"],
    color: "emerald",
  },
  {
    icon: Map,
    title: "Real-Time Tracking",
    description: "End-to-end visibility for every shipment with automated WhatsApp/SMS notifications at every milestone.",
    features: ["Live status updates", "Customer portal", "Auto notifications"],
    color: "blue",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Live organization dashboard with multi-branch metrics, financial reporting, and predictive insights.",
    features: ["Branch analytics", "P&L reports", "Demand forecasting"],
    color: "amber",
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  orange: {
    bg: "bg-orange-500/10",
    text: "text-orange-400",
    border: "group-hover:border-orange-500/30",
    glow: "from-orange-500/20",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "group-hover:border-purple-500/30",
    glow: "from-purple-500/20",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    border: "group-hover:border-cyan-500/30",
    glow: "from-cyan-500/20",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "group-hover:border-emerald-500/30",
    glow: "from-emerald-500/20",
  },
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "group-hover:border-blue-500/30",
    glow: "from-blue-500/20",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "group-hover:border-amber-500/30",
    glow: "from-amber-500/20",
  },
};

export function ModuleShowcase() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh">
        <div className="gradient-orb gradient-orb-purple w-[500px] h-[500px] -top-20 -right-20 opacity-30" />
        <div className="gradient-orb gradient-orb-cyan w-[400px] h-[400px] bottom-0 -left-20 opacity-30" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-orange-500 rounded-full" />
            <span className="text-sm text-zinc-400 uppercase tracking-wider">
              Platform Modules
            </span>
          </div>
          <h2 className="heading-serif text-3xl md:text-5xl text-white mb-4">
            Everything you need,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              integrated
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Six powerful modules working together as one unified system. No more jumping between tools
            or reconciling data across spreadsheets.
          </p>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => {
            const colors = colorClasses[module.color];
            const Icon = module.icon;

            return (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Glow effect */}
                <div
                  className={`absolute -inset-2 bg-gradient-to-r ${colors.glow} to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div
                  className={`relative h-full bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5 ${colors.border} transition-all duration-300`}
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-2">{module.title}</h3>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{module.description}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {module.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs px-2 py-1 bg-white/5 rounded-full text-zinc-400"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-zinc-500 mb-4">All modules included in every plan. No upsells.</p>
          <a
            href="#demo"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
          >
            <span>See it in action</span>
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
