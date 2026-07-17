export function Stats() {
  const stats = [
    {
      value: "95%",
      label: "CONTAINER UTILIZATION",
      description: "Maximize every shipment",
    },
    {
      value: "75%",
      label: "FASTER PROCESSING",
      description: "From hours to minutes",
    },
    {
      value: "2x",
      label: "AGENT PRODUCTIVITY",
      description: "Double your field output",
    },
  ];

  return (
    <section className="py-20 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center md:text-left p-8 border-l-0 md:border-l border-zinc-800 first:border-l-0"
            >
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">{stat.label}</p>
              <p className="text-6xl md:text-7xl font-light text-white mb-2">{stat.value}</p>
              <p className="text-zinc-500">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
