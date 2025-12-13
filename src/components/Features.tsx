import { Box, Truck, BarChart3, MessageSquare } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Box,
      title: "Predictive Container Optimization",
      description:
        "Know exactly when to book containers before overflow happens. Our AI analyzes incoming package data across all branches to forecast fill rates 3-5 days in advance.",
    },
    {
      icon: Truck,
      title: "Multi-Package Smart Cart",
      description:
        "One shipment, unlimited packages, single payment. Field agents capture everything in one flow - no more juggling multiple bookings for the same customer.",
    },
    {
      icon: MessageSquare,
      title: "Real-Time WhatsApp Tracking",
      description:
        "Automated notifications at every milestone. Your customers know exactly where their package is, reducing support calls by 80%.",
    },
    {
      icon: BarChart3,
      title: "Executive Intelligence",
      description:
        "Branch performance, container utilization, revenue trends - all in real-time. Make data-driven decisions across your entire operation.",
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
              Platform Features
            </span>
          </div>
          <h2 className="heading-serif text-4xl md:text-6xl text-white">
            Built to handle
            <br />
            complexity
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500/10 transition-colors">
                <feature.icon className="w-6 h-6 text-zinc-400 group-hover:text-orange-500 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
