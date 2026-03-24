import { Container, ShoppingCart, MessageCircle, LineChart, Zap, Bell, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function Features() {
  const features: { icon: LucideIcon; companion: LucideIcon; title: string; description: string }[] = [
    {
      icon: Container,
      companion: TrendingUp,
      title: "Container Planning",
      description:
        "See exactly when containers are filling up, which routes are ready to book, and how much space you have left. Plan ahead instead of reacting.",
    },
    {
      icon: ShoppingCart,
      companion: Zap,
      title: "One-Flow Booking",
      description:
        "One shipment, unlimited packages, single payment. Field agents capture everything in one flow — no more juggling multiple bookings for the same customer.",
    },
    {
      icon: MessageCircle,
      companion: Bell,
      title: "Live Shipment Tracking",
      description:
        "Your customers know where their package is at every step. Automated WhatsApp updates mean fewer calls and fewer questions.",
    },
    {
      icon: LineChart,
      companion: TrendingUp,
      title: "Operations Dashboard",
      description:
        "Branch performance, container fill rates, revenue by route — all live. See your entire operation on one screen, from anywhere.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-orange-500 rounded-full" />
            <span className="text-sm text-zinc-400 uppercase tracking-wider">
              The Platform
            </span>
          </div>
          <h2 className="heading-serif text-4xl md:text-6xl text-white">
            One platform for
            <br />
            your entire operation
          </h2>
        </div>

        {/* Features Grid - 2x2 */}
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center group-hover:bg-orange-500/10 transition-colors">
                  <feature.icon className="w-6 h-6 text-zinc-400 group-hover:text-orange-500 transition-colors" />
                </div>
                <div className="w-8 h-8 bg-zinc-800/50 rounded-lg flex items-center justify-center group-hover:bg-orange-500/5 transition-colors">
                  <feature.companion className="w-4 h-4 text-zinc-600 group-hover:text-orange-400 transition-colors" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
