"use client";

import { useState, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { roles, roleColors, Role, RoleFeature } from "./RoleShowcase/roleData";
import { FeatureVisualization } from "./RoleShowcase/FeatureVisualization";
import { DashboardFrame, NavItem } from "./DashboardFrame";

// ============================================
// ROLE LIST COMPONENT (Minimal text style)
// ============================================
function RoleList({
  roles,
  activeRole,
  onRoleSelect,
}: {
  roles: Role[];
  activeRole: string;
  onRoleSelect: (roleId: string) => void;
}) {
  return (
    <div className="flex flex-col">
      {roles.map((role) => {
        const colors = roleColors[role.color];
        const isActive = activeRole === role.id;

        return (
          <motion.button
            key={role.id}
            onClick={() => onRoleSelect(role.id)}
            className="text-left py-3 transition-colors group"
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center gap-3">
              <span
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  isActive ? "bg-orange-500" : "bg-zinc-600 group-hover:bg-zinc-400"
                }`}
              />
              <span
                className={`text-base font-medium transition-colors ${
                  isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
                }`}
              >
                {role.title}
              </span>
            </span>
            <AnimatePresence>
              {isActive && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`text-sm mt-1 ml-[18px] ${colors.text}`}
                >
                  {role.tagline}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}

// ============================================
// FEATURE INFO OVERLAY
// ============================================
function FeatureInfoOverlay({ feature, color }: { feature: RoleFeature; color: string }) {
  const colors = roleColors[color as keyof typeof roleColors];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-xl rounded-xl p-4 border border-white/10"
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
          <feature.icon className={`w-5 h-5 ${colors.text}`} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">{feature.label}</h4>
          <p className="text-xs text-zinc-400">{feature.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export function RoleShowcase() {
  const [activeRoleId, setActiveRoleId] = useState("field-agent");
  const [activeFeatureId, setActiveFeatureId] = useState("customer-capture");

  const activeRole = roles.find((r) => r.id === activeRoleId)!;
  const activeFeature = activeRole.features.find((f) => f.id === activeFeatureId) || activeRole.features[0];
  const colors = roleColors[activeRole.color];

  // Handle role selection
  const handleRoleSelect = useCallback((roleId: string) => {
    setActiveRoleId(roleId);
    const role = roles.find((r) => r.id === roleId);
    if (role && role.features.length > 0) {
      setActiveFeatureId(role.features[0].id);
    }
  }, []);

  // Handle feature selection
  const handleFeatureSelect = useCallback((featureId: string) => {
    setActiveFeatureId(featureId);
  }, []);

  // Convert features to NavItems for DashboardFrame
  const featureNavItems: NavItem[] = activeRole.features.map((feature) => ({
    id: feature.id,
    label: feature.label,
    icon: feature.icon,
  }));

  // Bottom status for sidebar
  const bottomStatus = (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="text-xs text-zinc-400">Status</span>
        <span className="ml-auto text-[10px] text-emerald-400 font-medium">Online</span>
      </div>
      <div className="flex items-center gap-2">
        <activeRole.icon className="h-3.5 w-3.5 text-zinc-500" />
        <span className="text-xs text-zinc-400">Role</span>
        <span className={`ml-auto text-[10px] ${colors.text}`}>{activeRole.title}</span>
      </div>
    </div>
  );

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:gap-16 items-start">

          {/* Left Column: Title + Role List */}
          <div className="lg:sticky lg:top-24">
            {/* Section Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-orange-500 rounded-full" />
                <span className="text-sm text-zinc-500 uppercase tracking-wider">
                  Complete ERP Platform
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4 leading-tight">
                One ERP, six specialized roles
              </h2>
              <p className="text-base text-zinc-400 leading-relaxed">
                Every team member gets a purpose-built experience — field agents, warehouse managers, finance, and beyond.
              </p>
            </div>

            {/* Role List - Desktop */}
            <div className="hidden lg:block border-t border-zinc-800 pt-6">
              <RoleList
                roles={roles}
                activeRole={activeRoleId}
                onRoleSelect={handleRoleSelect}
              />
            </div>

            {/* Role Selector - Mobile/Tablet */}
            <div className="lg:hidden">
              <select
                value={activeRoleId}
                onChange={(e) => handleRoleSelect(e.target.value)}
                className="w-full bg-zinc-900 text-white text-sm rounded-lg px-4 py-3 border border-zinc-800 appearance-none cursor-pointer"
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.title} - {role.tagline}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right Column: Dashboard Visualization */}
          <div className="relative">
            {/* Ambient glow behind dashboard */}
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/10 via-purple-500/5 to-cyan-500/10 rounded-3xl blur-2xl opacity-60" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Desktop wallpaper background container */}
              <div
                className="relative rounded-2xl overflow-hidden bg-cover bg-center bg-no-repeat shadow-2xl"
                style={{ backgroundImage: "url('/background_desktop.png')" }}
              >
                {/* Padding for the dashboard to float */}
                <div className="p-4 sm:p-6 min-h-[500px] sm:min-h-[550px] md:min-h-[600px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeRoleId}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      <DashboardFrame
                        url={`app.voxarel.com/${activeRole.id}`}
                        navItems={featureNavItems}
                        activeItem={activeFeatureId}
                        onItemSelect={handleFeatureSelect}
                        header={{
                          icon: activeRole.icon,
                          title: activeRole.title,
                          subtitle: activeRole.tagline,
                        }}
                        bottomStatus={bottomStatus}
                      >
                        {/* 3D Visualization Area */}
                        <div className="relative h-[280px] sm:h-[340px] md:h-[400px] rounded-lg overflow-hidden bg-gradient-to-b from-zinc-800/50 to-zinc-900/50">
                          <Suspense
                            fallback={
                              <div className="flex items-center justify-center h-full">
                                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                              </div>
                            }
                          >
                            <FeatureVisualization
                              type={activeFeature.visualizationType}
                              accentColor={colors.accent}
                            />
                          </Suspense>

                          {/* Feature Info Overlay */}
                          <AnimatePresence mode="wait">
                            <FeatureInfoOverlay
                              key={activeFeatureId}
                              feature={activeFeature}
                              color={activeRole.color}
                            />
                          </AnimatePresence>
                        </div>
                      </DashboardFrame>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
