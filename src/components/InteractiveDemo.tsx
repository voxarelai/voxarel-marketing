"use client";

import { useState } from "react";
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
// PREDICTION VIEW
// ============================================
function PredictionView({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      {predictions.map((pred) => {
        const isSelected = selectedId === pred.id;
        const fillColor =
          pred.fillPercentage >= 85
            ? "text-red-400"
            : pred.fillPercentage >= 70
              ? "text-yellow-400"
              : "text-green-400";
        const progressColor =
          pred.fillPercentage >= 85
            ? "bg-red-500"
            : pred.fillPercentage >= 70
              ? "bg-yellow-500"
              : "bg-green-500";

        return (
          <motion.div
            key={pred.id}
            whileHover={{ scale: 1.01, y: -2 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelect(pred.id)}
            className="cursor-pointer"
          >
            <div
              className={`glass-card rounded-xl p-4 transition-all duration-300 ${
                isSelected ? "ring-2 ring-orange-500/50 bg-white/[0.08]" : "hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-1.5 rounded-lg ${isSelected ? "bg-orange-500/20" : "bg-zinc-800"}`}
                  >
                    <Package className={`h-4 w-4 ${isSelected ? "text-orange-400" : fillColor}`} />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-white">{pred.destination}</p>
                    <p className="text-xs text-zinc-500">{pred.predictedCbm} CBM predicted</p>
                  </div>
                </div>
                <Badge
                  variant={pred.serviceType === "sea" ? "default" : "secondary"}
                  className="text-[10px]"
                >
                  {pred.serviceType === "sea" ? (
                    <Ship className="h-3 w-3 mr-1" />
                  ) : (
                    <Plane className="h-3 w-3 mr-1" />
                  )}
                  {pred.serviceType.toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Fill Rate</span>
                  <span className={`font-bold ${fillColor}`}>{pred.fillPercentage}%</span>
                </div>
                <Progress
                  value={pred.fillPercentage}
                  indicatorClassName={progressColor}
                  className="h-1.5"
                />
              </div>

              {pred.thresholdReached && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 flex items-center gap-2 p-2 bg-orange-500/10 rounded-lg border border-orange-500/20"
                >
                  <AlertTriangle className="h-3.5 w-3.5 text-orange-400" />
                  <span className="text-[11px] text-orange-300">Booking recommended</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ============================================
// TRACKING VIEW
// ============================================
function TrackingView() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-3">
      {/* Package Card */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Package className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-sm text-white">S-DXB-00847-01</p>
              <div className="flex items-center gap-1.5 mt-1">
                <Badge variant="outline" className="text-[10px] py-0">
                  <Ship className="h-2.5 w-2.5 mr-1" />
                  Sea
                </Badge>
                <Badge variant="warning" className="text-[10px] py-0">
                  Processing
                </Badge>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-white/5 text-xs">
                <div>
                  <p className="text-zinc-500">Dimensions</p>
                  <p className="font-medium text-white">60×40×30 cm</p>
                </div>
                <div>
                  <p className="text-zinc-500">Weight</p>
                  <p className="font-medium text-white">12.5 kg</p>
                </div>
                <div>
                  <p className="text-zinc-500">CBM</p>
                  <p className="font-medium text-white">0.072 m³</p>
                </div>
                <div>
                  <p className="text-zinc-500">ETA</p>
                  <p className="font-medium text-blue-400">Dec 22-25</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Timeline */}
      <div className="glass-card rounded-xl p-4">
        <p className="text-xs font-medium text-zinc-400 mb-3">SHIPMENT TIMELINE</p>
        <div className="space-y-0">
          {trackingSteps.map((step, index) => {
            const isLast = index === trackingSteps.length - 1;
            const Icon =
              step.status === "Collected"
                ? Truck
                : step.status === "At Warehouse"
                  ? Warehouse
                  : step.status === "Processing"
                    ? Zap
                    : step.status === "In Transit"
                      ? Ship
                      : CheckCircle;

            return (
              <div key={index} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={step.active ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`w-7 h-7 rounded-full flex items-center justify-center ${
                      step.completed ? "bg-green-500" : step.active ? "bg-blue-500" : "bg-zinc-800"
                    }`}
                  >
                    <Icon
                      className={`w-3.5 h-3.5 ${step.completed || step.active ? "text-white" : "text-zinc-500"}`}
                    />
                  </motion.div>
                  {!isLast && (
                    <div
                      className={`w-0.5 h-6 ${step.completed ? "bg-green-500" : "bg-zinc-700"}`}
                    />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <p
                    className={`text-xs font-medium ${step.active ? "text-blue-400" : step.completed ? "text-white" : "text-zinc-500"}`}
                  >
                    {step.status}
                  </p>
                  <p className="text-[10px] text-zinc-600">
                    {step.location} · {step.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================
// DASHBOARD VIEW
// ============================================
function DashboardView() {
  const metrics = [
    { label: "Shipments", value: "1,284", trend: 12.5, up: true },
    { label: "Revenue", value: "847K", trend: 8.3, up: true, prefix: "AED " },
    { label: "Utilization", value: "94.2", trend: 3.1, up: true, suffix: "%" },
    { label: "Avg Time", value: "2.4", trend: 15.2, up: false, suffix: "hrs" },
  ];

  return (
    <div className="space-y-3">
      {/* Metric Grid */}
      <div className="grid grid-cols-2 gap-2">
        {metrics.map((m) => (
          <motion.div
            key={m.label}
            whileHover={{ scale: 1.02 }}
            className="glass-card rounded-lg p-3 cursor-pointer"
          >
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{m.label}</p>
            <p className="text-lg font-bold text-white mt-0.5">
              {m.prefix}
              {m.value}
              {m.suffix}
            </p>
            <div
              className={`flex items-center gap-1 text-[10px] mt-1 ${m.up ? "text-green-400" : "text-red-400"}`}
            >
              {m.up ? (
                <TrendingUp className="h-2.5 w-2.5" />
              ) : (
                <TrendingDown className="h-2.5 w-2.5" />
              )}
              <span>
                {m.up ? "+" : "-"}
                {m.trend}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Utilization Card */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Box className="h-4 w-4 text-orange-400" />
          <p className="text-xs font-medium text-white">Container #MNF-2847</p>
        </div>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400 flex items-center gap-1">
                <Weight className="h-3 w-3" /> Weight
              </span>
              <span className="text-green-400 font-medium">87.3%</span>
            </div>
            <Progress value={87.3} indicatorClassName="bg-green-500" className="h-1.5" />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400 flex items-center gap-1">
                <Box className="h-3 w-3" /> Volume
              </span>
              <span className="text-yellow-400 font-medium">94.2%</span>
            </div>
            <Progress value={94.2} indicatorClassName="bg-yellow-500" className="h-1.5" />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 p-2 bg-green-500/10 rounded-lg border border-green-500/20">
          <CheckCircle className="h-3.5 w-3.5 text-green-400" />
          <span className="text-[11px] text-green-300">Optimal utilization</span>
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

  const valueProps = [
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "AI forecasts container fill rates 3-5 days ahead, eliminating overflow delays.",
    },
    {
      icon: Package,
      title: "Real-Time Tracking",
      description:
        "WhatsApp updates at every milestone. Your customers always know where packages are.",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description:
        "Automated alerts for threshold breaches, booking recommendations, and delivery updates.",
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh noise-overlay">
        {/* Animated Gradient Orbs */}
        <div className="gradient-orb gradient-orb-orange w-[600px] h-[600px] -top-40 -left-40" />
        <div className="gradient-orb gradient-orb-purple w-[500px] h-[500px] top-20 right-0" />
        <div className="gradient-orb gradient-orb-cyan w-[400px] h-[400px] bottom-0 left-1/3" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-sm text-zinc-400 uppercase tracking-wider">
              Live Product Preview
            </span>
          </div>
          <h2 className="heading-serif text-4xl md:text-6xl text-white mb-4">See it in action</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Real interface components from the Voxarel platform. Click around and explore.
          </p>
        </div>

        {/* Split Layout: Text Left + UI Right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT: Value Props */}
          <div className="order-2 lg:order-1">
            <div className="space-y-8">
              {valueProps.map((prop, index) => (
                <motion.div
                  key={prop.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                    <prop.icon className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{prop.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{prop.description}</p>
                  </div>
                </motion.div>
              ))}

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="pt-4"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-zinc-900 rounded-full font-medium hover:bg-zinc-200 transition-colors group"
                >
                  Book a Demo
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>
          </div>

          {/* RIGHT: Interactive UI Demo */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Ambient Glow */}
              <div className="absolute -inset-8 bg-gradient-to-r from-orange-500/20 via-purple-500/10 to-cyan-500/20 rounded-3xl blur-3xl opacity-50 animate-pulse-glow" />

              {/* Glass Frame */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative glass-strong rounded-2xl overflow-hidden"
              >
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-black/30 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1 bg-white/5 rounded-md text-[11px] text-zinc-500 font-mono">
                      app.voxarel.com
                    </div>
                  </div>
                </div>

                {/* Inner Highlight */}
                <div className="absolute top-[52px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Demo Content */}
                <div className="p-5">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="w-full justify-start mb-5 bg-white/5 p-1 rounded-lg">
                      <TabsTrigger
                        value="predictions"
                        className="text-xs data-[state=active]:bg-white/10"
                      >
                        Predictions
                      </TabsTrigger>
                      <TabsTrigger
                        value="tracking"
                        className="text-xs data-[state=active]:bg-white/10"
                      >
                        Tracking
                      </TabsTrigger>
                      <TabsTrigger
                        value="dashboard"
                        className="text-xs data-[state=active]:bg-white/10"
                      >
                        Dashboard
                      </TabsTrigger>
                    </TabsList>

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
                            onSelect={setSelectedPrediction}
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
                  </Tabs>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
