export function TrustBar() {
  // Placeholder - replace with actual client logos
  const companies = [
    { name: "POSTMAN", icon: "📮" },
    { name: "ARAMEX", icon: "📦" },
    { name: "DHL", icon: "✈️" },
    { name: "MAERSK", icon: "🚢" },
    { name: "DP WORLD", icon: "⚓" },
  ];

  return (
    <section className="py-10 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {companies.map((company) => (
            <div key={company.name} className="text-zinc-500 hover:text-zinc-300 transition-colors">
              <span className="text-sm font-medium tracking-wide">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
