"use client";

import { useState, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { roles, roleColors, Role, RoleFeature } from "./RoleShowcase/roleData";
import { FeatureVisualization } from "./RoleShowcase/FeatureVisualization";
import { DashboardFrame, NavItem } from "./DashboardFrame";

// ============================================
// ROLE TABS COMPONENT (Outside Dashboard Frame)
// ============================================
function RoleTabs({
  roles,
  activeRole,
  onRoleSelect,
}: {
  roles: Role[];
  activeRole: string;
  onRoleSelect: (roleId: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {roles.map((role) => {
        const colors = roleColors[role.color];
        const Icon = role.icon;
        const isActive = activeRole === role.id;

        return (
          <motion.button
            key={role.id}
            onClick={() => onRoleSelect(role.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
              isActive
                ? `${colors.bg} ${colors.border} border text-white`
                : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-300 border border-transparent"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isActive ? colors.bg : "bg-white/5"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? colors.text : "text-zinc-500"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${isActive ? "text-white" : ""}`}>
                {role.title}
              </p>
              <p className={`text-[10px] truncate ${isActive ? colors.text : "text-zinc-500"}`}>
                {role.tagline}
              </p>
            </div>
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

        {/* Two-Level Navigation Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
              <div className="bg-[#0a0a0a] rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-2xl">
                {/* Screen with desktop wallpaper */}
                <div
                  className="relative rounded-xl overflow-hidden bg-cover bg-center bg-no-repeat min-h-[550px] sm:min-h-[600px] md:min-h-[650px]"
                  style={{ backgroundImage: "url('/background_desktop.png')" }}
                >
                  {/* Main content area */}
                  <div className="absolute inset-4 sm:inset-6 flex gap-4 sm:gap-6">
                    {/* Left: Role Tabs (Outside Dashboard Frame) */}
                    <div className="hidden md:block w-[200px] flex-shrink-0">
                      <div className="bg-zinc-900/80 backdrop-blur-xl rounded-xl p-3 border border-white/10">
                        <div className="mb-3 pb-2 border-b border-white/5">
                          <p className="text-xs text-zinc-500 uppercase tracking-wider">Select Role</p>
                        </div>
                        <RoleTabs
                          roles={roles}
                          activeRole={activeRoleId}
                          onRoleSelect={handleRoleSelect}
                        />
                      </div>
                    </div>

                    {/* Right: Dashboard Frame with Features */}
                    <div className="flex-1 relative">
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
                            <div className="relative h-[320px] sm:h-[380px] md:h-[420px] rounded-lg overflow-hidden bg-gradient-to-b from-zinc-800/50 to-zinc-900/50">
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

                  {/* Mobile Role Selector (visible on small screens) */}
                  <div className="md:hidden absolute top-4 left-4 right-4">
                    <select
                      value={activeRoleId}
                      onChange={(e) => handleRoleSelect(e.target.value)}
                      className="w-full bg-zinc-900/90 backdrop-blur-xl text-white text-sm rounded-lg px-4 py-3 border border-white/10 appearance-none cursor-pointer"
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.title} - {role.tagline}
                        </option>
                      ))}
                    </select>
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
