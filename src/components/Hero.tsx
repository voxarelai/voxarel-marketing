"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero.png"
          alt="Port with container ships and cranes"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Subtle gradient overlay - lighter like giga.ai */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#09090b] z-[1]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
        {/* Announcement Badge - like giga.ai's funding announcement */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8"
        >
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
          <span className="text-xs text-white uppercase tracking-wide">
            Now serving UAE &amp; India routes
          </span>
          <span className="text-xs text-white/60">→</span>
        </motion.div>

        {/* Headline - refined sizing like giga.ai */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="heading-serif text-4xl md:text-5xl lg:text-6xl text-white mb-5 leading-[1.15]"
        >
          Eliminate delays.
          <br />
          Maximize every container.
        </motion.h1>

        {/* Subheadline - small and elegant like giga.ai */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-sm md:text-base text-zinc-400 mb-8"
        >
          AI-powered logistics for UAE freight forwarding
        </motion.p>

        {/* CTA - smaller, more refined */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-2.5 bg-white text-zinc-900 rounded-full font-medium text-sm hover:bg-zinc-100 transition-colors"
          >
            Talk to us
          </a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#09090b] to-transparent z-[2]" />
    </section>
  );
}
