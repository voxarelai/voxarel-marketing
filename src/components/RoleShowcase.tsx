"use client";

import { useState, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { roles, roleColors, Role, RoleFeature } from "./RoleShowcase/roleData";
import { FeatureVisualization } from "./RoleShowcase/FeatureVisualization";
import { DashboardFrame, NavItem } from "./DashboardFrame";

// ============================================
// ROLE ACCORDION COMPONENT (Elegant enterprise style)
// ============================================
function RoleAccordion({
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
      {roles.map((role, index) => {
        const isActive = activeRole === role.id;

        return (
          <motion.button
            key={role.id}
            onClick={() => onRoleSelect(role.id)}
            className={`text-left py-5 transition-all duration-200 ${
              index !== 0 ? "border-t border-zinc-700/30" : ""
            }`}
            whileTap={{ scale: 0.995 }}
          >
            <span
              className={`block text-[15px] font-medium transition-colors duration-200 ${
                isActive
                  ? "text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {role.title}
            </span>
            <AnimatePresence>
              {isActive && (
                <motion.p
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="text-sm text-zinc-400 leading-relaxed overflow-hidden"
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
// FEATURE INFO OVERLAY (Elegant light style)
// ============================================
function FeatureInfoOverlay({ feature }: { feature: RoleFeature; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xl rounded-lg p-3 shadow-lg shadow-black/10 border border-zinc-200/50"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-zinc-900 flex items-center justify-center flex-shrink-0">
          <feature.icon className="w-4 h-4 text-white" />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-medium text-zinc-900">{feature.label}</h4>
          <p className="text-xs text-zinc-500 truncate">{feature.description}</p>
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

  // Bottom status for sidebar (light theme)
  const bottomStatus = (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
        <span className="text-xs text-zinc-500">Status</span>
        <span className="ml-auto text-[10px] text-emerald-600 font-medium">Online</span>
      </div>
      <div className="flex items-center gap-2">
        <activeRole.icon className="h-3.5 w-3.5 text-zinc-400" />
        <span className="text-xs text-zinc-500">Role</span>
        <span className="ml-auto text-[10px] text-zinc-700 font-medium">{activeRole.title}</span>
      </div>
    </div>
  );

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Clean dark background */}
      <div className="absolute inset-0 bg-zinc-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column layout with more spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 lg:gap-16 items-start">

          {/* Left Column: Title + Role Accordion */}
          <div className="lg:sticky lg:top-24">
              {/* Section Header - Refined */}
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-medium text-white mb-3 tracking-tight">
                  Role-based workflows
                </h2>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-[240px]">
                  Purpose-built experiences for every team member in your operation.
                </p>

                {/* CTA Button */}
                <button className="mt-6 px-5 py-2.5 text-sm font-medium text-zinc-900 bg-white rounded-full hover:bg-zinc-100 transition-colors">
                  Explore roles
                </button>
              </div>

              {/* Horizontal Divider */}
              <div className="border-t border-zinc-700/50 pt-6">
                {/* Role Accordion - Desktop */}
                <div className="hidden lg:block">
                  <RoleAccordion
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
                        {role.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
          </div>

          {/* Right Column: Dashboard Visualization */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Scenic background container */}
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
                style={{
                  backgroundImage: "url('/background_desktop.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Dashboard container */}
                <div className="relative p-4 sm:p-6 lg:p-8 min-h-[520px] sm:min-h-[560px] md:min-h-[600px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeRoleId}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
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
                        <div className="relative h-[300px] sm:h-[360px] md:h-[420px] rounded-lg overflow-hidden bg-zinc-900/80">
                          <Suspense
                            fallback={
                              <div className="flex items-center justify-center h-full">
                                <div className="w-6 h-6 border-2 border-zinc-600 border-t-zinc-300 rounded-full animate-spin" />
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
