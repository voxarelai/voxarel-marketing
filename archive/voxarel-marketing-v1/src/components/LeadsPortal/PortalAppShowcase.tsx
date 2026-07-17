"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Code2, Inbox, Settings, Ship, Table } from "lucide-react";
import { DashboardFrame, type NavItem } from "@/components/DashboardFrame";
import { embedScriptSnippet } from "@/lib/config";
import { cn } from "@/lib/utils";
import { embedFields, leadRows, rateRows } from "./data";

const navItems: NavItem[] = [
  { id: "rates", label: "My Rates", icon: Table },
  { id: "embed", label: "Embed", icon: Code2 },
  { id: "leads", label: "Leads", icon: Inbox, badge: "12", badgeVariant: "success" },
  { id: "settings", label: "Settings", icon: Settings },
];

const statusPill: Record<"New" | "Quoted" | "Won", string> = {
  New: "bg-orange-500/15 text-orange-300",
  Quoted: "bg-amber-500/15 text-amber-300",
  Won: "bg-emerald-500/15 text-emerald-300",
};

function RatesScreen() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Rate sheet</h3>
        <button className="rounded-md bg-orange-500 px-3 py-1.5 text-xs font-medium text-white">
          + Add rate
        </button>
      </div>
      <div className="overflow-hidden rounded-lg border border-white/10">
        <table className="w-full text-left text-xs">
          <thead className="bg-white/5 text-white/50">
            <tr>
              <th className="px-3 py-2 font-medium">Destination</th>
              <th className="px-3 py-2 font-medium">Service</th>
              <th className="px-3 py-2 text-right font-medium">Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rateRows.map((r, i) => (
              <tr key={i} className="text-white/80">
                <td className="px-3 py-2.5">{r.destination}</td>
                <td className="px-3 py-2.5">
                  <span
                    className={cn(
                      "rounded px-1.5 py-0.5 text-[10px]",
                      r.service === "Sea"
                        ? "bg-cyan-500/15 text-cyan-300"
                        : "bg-violet-500/15 text-violet-300",
                    )}
                  >
                    {r.service}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-right font-medium text-orange-300">
                  {r.rate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmbedScreen() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-white">Embed settings</h3>
      <div className="grid grid-cols-2 gap-2">
        {embedFields.map((f) => (
          <div
            key={f.label}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/70"
          >
            <span>{f.label}</span>
            <span
              className={cn(
                "relative h-4 w-7 rounded-full transition-colors",
                f.enabled ? "bg-orange-500" : "bg-white/15",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all",
                  f.enabled ? "left-3.5" : "left-0.5",
                )}
              />
            </span>
          </div>
        ))}
      </div>
      <pre className="overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-[10px] leading-relaxed text-zinc-300">
        <code>{embedScriptSnippet("acme-freight")}</code>
      </pre>
    </div>
  );
}

function LeadsScreen() {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-white">Recent leads</h3>
      <div className="space-y-2">
        {leadRows.map((l, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5"
          >
            <div>
              <p className="text-xs font-medium text-white">{l.name}</p>
              <p className="text-[11px] text-white/50">
                {l.destination} · {l.category} · {l.packages}
              </p>
            </div>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-medium",
                statusPill[l.status],
              )}
            >
              {l.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsField({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs">
      <span className="text-white/50">{label}</span>
      <span className={cn("text-white/80", mono && "font-mono")}>{value}</span>
    </div>
  );
}

function SettingsScreen() {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-white">Settings</h3>
      <SettingsField label="Company" value="Acme Freight LLC" />
      <SettingsField label="Base country" value="United Arab Emirates" />
      <SettingsField label="Currency" value="AED" />
      <SettingsField label="Portal handle" value="acme-freight" mono />
      <SettingsField label="API key" value="vx_live_••••••••••••3f9a" mono />
    </div>
  );
}

export function PortalAppShowcase() {
  const [active, setActive] = useState("rates");

  return (
    <section className="bg-[#09090b] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-14">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            <span className="text-sm uppercase tracking-wider text-zinc-400">
              Inside the portal
            </span>
          </div>
          <h2 className="heading-serif text-4xl text-white md:text-5xl">
            Run it all from one dashboard
          </h2>
        </header>

        <div className="flex justify-center overflow-x-auto pb-4">
          <DashboardFrame
            url="app.voxarel.com/portal"
            navItems={navItems}
            activeItem={active}
            onItemSelect={setActive}
            header={{ icon: Ship, title: "Acme Freight", subtitle: "Leads Portal" }}
            bottomStatus={
              <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Beta access
              </div>
            }
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {active === "rates" && <RatesScreen />}
                {active === "embed" && <EmbedScreen />}
                {active === "leads" && <LeadsScreen />}
                {active === "settings" && <SettingsScreen />}
              </motion.div>
            </AnimatePresence>
          </DashboardFrame>
        </div>
      </div>
    </section>
  );
}
