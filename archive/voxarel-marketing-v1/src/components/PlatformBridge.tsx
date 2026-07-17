"use client";

import { motion } from "framer-motion";
import { ArrowDown, Container, LineChart, MapPin, Package, ShoppingCart } from "lucide-react";

const pillars = [
  { icon: ShoppingCart, label: "Field booking" },
  { icon: Package, label: "Warehouse & scanning" },
  { icon: Container, label: "Container planning" },
  { icon: LineChart, label: "Finance & reconciliation" },
  { icon: MapPin, label: "Live tracking" },
];

export function PlatformBridge() {
  return (
    <section className="relative overflow-hidden bg-[#09090b] py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
              Beyond lead capture
            </span>
          </div>
          <h2 className="heading-serif mx-auto max-w-3xl text-3xl text-white md:text-5xl">
            The calculator is the front door. The platform runs everything behind
            it.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-400 md:text-lg">
            Once a lead lands, Voxarel carries it the whole way — booking,
            warehouse, container planning, finance and live tracking. One
            platform connecting every person, package and payment in your
            operation.
          </p>
        </motion.div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-2"
            >
              <p.icon className="h-4 w-4 text-orange-400" />
              <span className="text-sm text-zinc-300">{p.label}</span>
            </motion.div>
          ))}
        </div>

        <a
          href="#features"
          className="mt-12 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
        >
          See the full platform <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
