"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  badgeVariant?: "success" | "warning" | "default";
}

export interface DashboardFrameProps {
  url: string;
  navItems: NavItem[];
  activeItem: string;
  onItemSelect: (id: string) => void;
  children: React.ReactNode;
  bottomStatus?: React.ReactNode;
  header?: {
    icon: LucideIcon;
    title: string;
    subtitle?: string;
  };
}

const badgeStyles = {
  success: "text-emerald-400 bg-emerald-400/10",
  warning: "text-amber-400 bg-amber-400/10",
  default: "text-zinc-400 bg-white/10",
};

export function DashboardFrame({
  url,
  navItems,
  activeItem,
  onItemSelect,
  children,
  bottomStatus,
  header,
}: DashboardFrameProps) {
  return (
    <div className="w-full max-w-[900px] bg-zinc-900/98 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 overflow-hidden">
      {/* Window Chrome */}
      <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-zinc-800/90 border-b border-white/5">
        <div className="flex gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-2 sm:px-4 py-0.5 sm:py-1 bg-white/10 rounded-md text-[10px] sm:text-xs text-zinc-400 font-mono">
            {url}
          </div>
        </div>
      </div>

      {/* Dashboard Layout */}
      <div className="flex min-h-[400px] sm:min-h-[450px] md:min-h-[500px]">
        {/* Left Sidebar */}
        <div className="w-[180px] sm:w-[200px] bg-zinc-950/50 border-r border-white/5 flex flex-col">
          {/* Sidebar Header */}
          {header && (
            <div className="px-3 py-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <header.icon className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{header.title}</p>
                  {header.subtitle && (
                    <p className="text-[10px] text-zinc-500">{header.subtitle}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <div className="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => onItemSelect(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all ${
                    isActive
                      ? "bg-white/[0.08] text-white"
                      : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-300"
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? "text-orange-400" : "text-zinc-500"
                    }`}
                  />
                  <span className="text-sm truncate">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`ml-auto text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        badgeStyles[item.badgeVariant || "default"]
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Bottom Status */}
          {bottomStatus && (
            <div className="px-3 py-3 border-t border-white/5 mt-auto">
              {bottomStatus}
            </div>
          )}
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-4 sm:p-5 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
