"use client";

import { motion } from "framer-motion";
import { Code2, Inbox, Sliders } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Sliders,
    title: "Add your rates",
    desc: "Sign up and load your sea and air rates by destination, for personal and commercial cargo. Update them anytime.",
  },
  {
    n: "02",
    icon: Code2,
    title: "Embed the calculator",
    desc: "Paste one line of code on your site. The calculator picks up your branding automatically — no developer required.",
  },
  {
    n: "03",
    icon: Inbox,
    title: "Collect leads",
    desc: "Every quote request becomes a lead in your portal, with the customer's destination and shipment details ready to action.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-zinc-950 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-14">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            <span className="text-sm uppercase tracking-wider text-zinc-400">
              How it works
            </span>
          </div>
          <h2 className="heading-serif text-4xl text-white md:text-5xl">
            Live in three steps
          </h2>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">
                  <s.icon className="h-6 w-6 text-orange-400" />
                </div>
                <span className="heading-serif text-4xl text-zinc-700">{s.n}</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">{s.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
