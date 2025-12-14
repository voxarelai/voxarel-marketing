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
  success: "text-emerald-600 bg-emerald-50",
  warning: "text-amber-600 bg-amber-50",
  default: "text-zinc-500 bg-zinc-100",
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
    <div className="w-full max-w-[900px] bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl shadow-black/20 overflow-hidden">
      {/* Window Chrome - Light */}
      <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-zinc-100/80 border-b border-zinc-200/50">
        <div className="flex gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-300" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-300" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-zinc-300" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-3 sm:px-4 py-1 bg-white rounded-md text-[10px] sm:text-xs text-zinc-500 font-mono border border-zinc-200/50">
            {url}
          </div>
        </div>
      </div>

      {/* Dashboard Layout */}
      <div className="flex min-h-[420px] sm:min-h-[460px] md:min-h-[500px]">
        {/* Left Sidebar - Light */}
        <div className="w-[170px] sm:w-[190px] bg-zinc-50/80 border-r border-zinc-200/50 flex flex-col">
          {/* Sidebar Header */}
          {header && (
            <div className="px-3 py-3 border-b border-zinc-200/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center">
                  <header.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900">{header.title}</p>
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
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? "text-white" : "text-zinc-400"
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
            <div className="px-3 py-3 border-t border-zinc-200/50 mt-auto">
              {bottomStatus}
            </div>
          )}
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-3 sm:p-4 overflow-hidden bg-white">{children}</div>
      </div>
    </div>
  );
}
