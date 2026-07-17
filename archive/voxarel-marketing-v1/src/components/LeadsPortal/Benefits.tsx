"use client";

import { motion } from "framer-motion";
import { Code2, Globe, Inbox, Palette, Ship, Zap } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Instant quotes",
    desc: "Visitors get a price in seconds instead of waiting for an email reply.",
  },
  {
    icon: Inbox,
    title: "Every visitor, a lead",
    desc: "Each quote request is captured with full shipment context in your portal.",
  },
  {
    icon: Palette,
    title: "Your branding",
    desc: "The calculator wears your logo and colors — it looks like part of your site.",
  },
  {
    icon: Globe,
    title: "Any website",
    desc: "One script tag works on WordPress, Wix, Shopify, or a custom build.",
  },
  {
    icon: Ship,
    title: "Sea & air",
    desc: "Quote personal and commercial cargo across the destinations you serve.",
  },
  {
    icon: Code2,
    title: "No developer needed",
    desc: "Copy, paste, done. Update your rates anytime from the portal.",
  },
];

export function Benefits() {
  return (
    <section className="bg-[#09090b] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-14">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            <span className="text-sm uppercase tracking-wider text-zinc-400">
              Why forwarders use it
            </span>
          </div>
          <h2 className="heading-serif text-4xl text-white md:text-5xl">
            Turn your website into your best sales rep
          </h2>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-800">
                <b.icon className="h-5 w-5 text-orange-400" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-white">{b.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
