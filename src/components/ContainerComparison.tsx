"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { Box, TrendingUp, Zap, Package, Layers, GitCompare, Sparkles } from "lucide-react";
import { DashboardFrame, NavItem } from "./DashboardFrame";

// Box colors by category
const boxColors = {
  small: ["#f97316", "#fb923c", "#fdba74"],
  medium: ["#06b6d4", "#22d3ee", "#67e8f9"],
  large: ["#a855f7", "#c084fc", "#d8b4fe"],
  xlarge: ["#10b981", "#34d399", "#6ee7b7"],
};

interface BoxData {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}

// Single 3D box
function Box3D({ position, size, color }: BoxData) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
    </mesh>
  );
}

// Container wireframe
function ContainerFrame({ size }: { size: [number, number, number] }) {
  return (
    <lineSegments>
      <edgesGeometry args={[new THREE.BoxGeometry(...size)]} />
      <lineBasicMaterial color="#ffffff" opacity={0.4} transparent />
    </lineSegments>
  );
}

// Rotating container with boxes
function ContainerWithBoxes({ boxes, rotationSpeed = 0.3 }: { boxes: BoxData[]; rotationSpeed?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  const containerSize: [number, number, number] = [6, 2.6, 2.4];

  return (
    <group ref={groupRef}>
      <ContainerFrame size={containerSize} />
      <mesh position={[0, 0, -containerSize[2] / 2]}>
        <planeGeometry args={[containerSize[0], containerSize[1]]} />
        <meshBasicMaterial color="#ffffff" opacity={0.05} transparent side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -containerSize[1] / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[containerSize[0], containerSize[2]]} />
        <meshBasicMaterial color="#ffffff" opacity={0.08} transparent side={THREE.DoubleSide} />
      </mesh>
      {boxes.map((box, i) => (
        <Box3D key={i} {...box} />
      ))}
    </group>
  );
}

// Get color for variety
function getColor(i: number): string {
  const all = [...boxColors.small, ...boxColors.medium, ...boxColors.large, ...boxColors.xlarge];
  return all[i % all.length];
}

// BEFORE: Human packing - 200 boxes, looks FULL
function generateInefficientBoxes(): BoxData[] {
  const boxes: BoxData[] = [];
  let idx = 0;

  // Layer 1-2: Large boxes on bottom
  for (let layer = 0; layer < 2; layer++) {
    const y = -1.05 + layer * 0.55;
    for (let row = 0; row < 4; row++) {
      const z = -0.95 + row * 0.5;
      for (let col = 0; col < 8; col++) {
        const x = -2.65 + col * 0.68;
        boxes.push({ position: [x, y, z], size: [0.65, 0.52, 0.48], color: getColor(idx++) });
      }
    }
  }

  // Layer 3-4: Medium boxes
  for (let layer = 0; layer < 2; layer++) {
    const y = 0.05 + layer * 0.48;
    for (let row = 0; row < 4; row++) {
      const z = -0.9 + row * 0.48;
      for (let col = 0; col < 9; col++) {
        const x = -2.6 + col * 0.6;
        boxes.push({ position: [x, y, z], size: [0.55, 0.45, 0.45], color: getColor(idx++) });
      }
    }
  }

  // Layer 5: Small boxes on top
  const y5 = 1.0;
  for (let row = 0; row < 5; row++) {
    const z = -0.95 + row * 0.42;
    for (let col = 0; col < 10; col++) {
      const x = -2.6 + col * 0.55;
      boxes.push({ position: [x, y5, z], size: [0.5, 0.35, 0.4], color: getColor(idx++) });
    }
  }

  return boxes;
}

// AFTER: AI packing - fits 250 boxes
function generateEfficientBoxes(): BoxData[] {
  const boxes: BoxData[] = [];
  let idx = 0;

  for (let layer = 0; layer < 5; layer++) {
    const y = -1.05 + layer * 0.48;
    for (let row = 0; row < 5; row++) {
      const z = -0.95 + row * 0.42;
      for (let col = 0; col < 10; col++) {
        const x = -2.7 + col * 0.55;
        boxes.push({ position: [x, y, z], size: [0.52, 0.45, 0.4], color: getColor(idx++) });
      }
    }
  }

  return boxes;
}

const inefficientBoxes = generateInefficientBoxes();
const efficientBoxes = generateEfficientBoxes();

// Scene component
function Scene({ boxes }: { boxes: BoxData[] }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <ContainerWithBoxes boxes={boxes} />
    </>
  );
}

// Comparison View inside the app
function ComparisonContent({ mode }: { mode: "before" | "after" | "compare" }) {
  const beforeBoxes = inefficientBoxes;
  const afterBoxes = efficientBoxes;

  if (mode === "compare") {
    return (
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="flex flex-col">
          <div className="text-center mb-2">
            <span className="text-xs text-zinc-400 bg-white/5 px-2 py-1 rounded">Before</span>
          </div>
          <div className="flex-1 rounded-lg overflow-hidden bg-black/30">
            <Canvas camera={{ position: [8, 4, 8], fov: 35 }}>
              <Suspense fallback={null}>
                <Scene boxes={beforeBoxes} />
              </Suspense>
            </Canvas>
          </div>
          <div className="text-center mt-2">
            <span className="text-lg font-bold text-white">{beforeBoxes.length}</span>
            <span className="text-xs text-zinc-500 ml-1">boxes</span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-center mb-2">
            <span className="text-xs text-orange-400 bg-orange-500/10 px-2 py-1 rounded border border-orange-500/20">After</span>
          </div>
          <div className="flex-1 rounded-lg overflow-hidden bg-black/30">
            <Canvas camera={{ position: [8, 4, 8], fov: 35 }}>
              <Suspense fallback={null}>
                <Scene boxes={afterBoxes} />
              </Suspense>
            </Canvas>
          </div>
          <div className="text-center mt-2">
            <span className="text-lg font-bold text-white">{afterBoxes.length}</span>
            <span className="text-xs text-zinc-500 ml-1">boxes</span>
            <span className="text-xs text-emerald-400 ml-2">+{afterBoxes.length - beforeBoxes.length}</span>
          </div>
        </div>
      </div>
    );
  }

  const boxes = mode === "before" ? beforeBoxes : afterBoxes;
  const isAfter = mode === "after";

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 rounded-lg overflow-hidden bg-black/20">
        <Canvas camera={{ position: [8, 4, 8], fov: 35 }}>
          <Suspense fallback={null}>
            <Scene boxes={boxes} />
          </Suspense>
        </Canvas>
      </div>
      <div className="mt-4 flex items-center justify-between px-2">
        <div>
          <span className="text-2xl font-bold text-white">{boxes.length}</span>
          <span className="text-sm text-zinc-500 ml-2">boxes loaded</span>
        </div>
        {isAfter && (
          <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">+{afterBoxes.length - beforeBoxes.length} more fit</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Stats sidebar
function StatsSidebar() {
  const beforeCount = inefficientBoxes.length;
  const afterCount = efficientBoxes.length;
  const improvement = Math.round(((afterCount - beforeCount) / beforeCount) * 100);

  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] rounded-lg border border-white/5 mb-3">
        <Box className="h-4 w-4 text-zinc-400" />
        <span className="text-sm text-white font-medium">Optimization Stats</span>
      </div>

      {/* Stats */}
      <div className="space-y-2 px-3">
        <div className="flex items-center justify-between py-2 border-b border-white/5">
          <span className="text-xs text-zinc-400">Manual Packing</span>
          <span className="text-sm text-white font-medium">{beforeCount} boxes</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-white/5">
          <span className="text-xs text-zinc-400">AI Optimized</span>
          <span className="text-sm text-orange-400 font-medium">{afterCount} boxes</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-white/5">
          <span className="text-xs text-zinc-400">Improvement</span>
          <span className="text-sm text-emerald-400 font-medium">+{improvement}%</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-xs text-zinc-400">Extra Capacity</span>
          <span className="text-sm text-cyan-400 font-medium">+{afterCount - beforeCount} boxes</span>
        </div>
      </div>

      {/* Bottom info */}
      <div className="mt-4 pt-3 border-t border-white/5 px-3">
        <div className="flex items-center gap-2 py-1.5">
          <Zap className="h-3.5 w-3.5 text-orange-500" />
          <span className="text-xs text-zinc-400">AI Model</span>
          <span className="ml-auto text-[10px] text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded">v2.4</span>
        </div>
        <div className="flex items-center gap-2 py-1.5">
          <Package className="h-3.5 w-3.5 text-zinc-500" />
          <span className="text-xs text-zinc-400">Container</span>
          <span className="ml-auto text-[10px] text-zinc-500">20ft Standard</span>
        </div>
      </div>
    </div>
  );
}

// Tooltip bubble
function TooltipBubble({ isVisible }: { isVisible: boolean }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
          transition={{ duration: 0.5 }}
          className="absolute z-50 top-20 right-10"
        >
          <motion.div
            className="relative bg-black/50 backdrop-blur-2xl rounded-2xl p-4 w-[200px] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none" />
            <p className="text-sm font-semibold text-white mb-1.5 relative z-10">AI Optimization</p>
            <p className="text-[11px] text-white/80 leading-relaxed relative z-10">
              Our algorithm finds the optimal box arrangement to maximize container utilization
            </p>
            <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-orange-400/70 to-transparent" />
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

// Navigation items for the dashboard sidebar
const containerNavItems: NavItem[] = [
  { id: "before", label: "Manual Packing", icon: Layers },
  { id: "after", label: "AI Optimized", icon: Sparkles, badge: "+25%", badgeVariant: "success" },
  { id: "compare", label: "Compare", icon: GitCompare },
];

export function ContainerComparison() {
  const [activeTab, setActiveTab] = useState<"before" | "after" | "compare">("compare");
  const [showTooltip, setShowTooltip] = useState(true);

  const beforeCount = inefficientBoxes.length;
  const afterCount = efficientBoxes.length;
  const improvement = Math.round(((afterCount - beforeCount) / beforeCount) * 100);

  // Bottom status for sidebar
  const bottomStatus = (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Zap className="h-3.5 w-3.5 text-orange-500" />
        <span className="text-xs text-zinc-400">AI Model</span>
        <span className="ml-auto text-[10px] text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded">v2.4</span>
      </div>
      <div className="flex items-center gap-2">
        <Package className="h-3.5 w-3.5 text-zinc-500" />
        <span className="text-xs text-zinc-400">Container</span>
        <span className="ml-auto text-[10px] text-zinc-500">20ft Standard</span>
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
              Container Optimization
            </span>
          </div>
          <h2 className="heading-serif text-3xl sm:text-4xl md:text-6xl text-white mb-3 sm:mb-4">
            Maximize every cubic meter
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            See how AI optimization fits more cargo in the same container space.
          </p>
        </div>

        {/* Monitor Display */}
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
              {/* Monitor Frame */}
              <div className="relative">
                <div className="bg-[#0a0a0a] rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-2xl">
                  {/* Screen with desktop wallpaper */}
                  <div
                    className="relative rounded-xl overflow-hidden bg-cover bg-center bg-no-repeat min-h-[500px] sm:min-h-[550px] md:min-h-[600px]"
                    style={{ backgroundImage: "url('/background_desktop.png')" }}
                  >
                    {/* Tooltip */}
                    <div className="hidden md:block">
                      <TooltipBubble isVisible={showTooltip} />
                    </div>

                    {/* App Window with Dashboard Frame */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="absolute inset-4 sm:inset-6 flex items-start justify-center pt-2 sm:pt-4"
                      onClick={() => setShowTooltip(false)}
                    >
                      <DashboardFrame
                        url="app.voxarel.com/optimizer"
                        navItems={containerNavItems}
                        activeItem={activeTab}
                        onItemSelect={(id) => setActiveTab(id as "before" | "after" | "compare")}
                        header={{
                          icon: Box,
                          title: "Container Optimizer",
                          subtitle: `+${improvement}% efficiency`,
                        }}
                        bottomStatus={bottomStatus}
                      >
                        {/* Main Content Area */}
                        <div className="flex gap-4 h-full">
                          {/* 3D View */}
                          <div className="flex-1 h-[320px] sm:h-[380px]">
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="h-full"
                              >
                                <ComparisonContent mode={activeTab} />
                              </motion.div>
                            </AnimatePresence>
                          </div>

                          {/* Stats Sidebar - Hidden on mobile */}
                          <div className="hidden lg:block w-[200px] border-l border-white/5 pl-4">
                            <StatsSidebar />
                          </div>
                        </div>
                      </DashboardFrame>
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
