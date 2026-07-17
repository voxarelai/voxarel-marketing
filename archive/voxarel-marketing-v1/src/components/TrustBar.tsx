export function TrustBar() {
  const companies = ["ARAMEX", "DHL", "MAERSK", "DP WORLD"];

  return (
    <section className="py-10 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          <span className="text-xs text-zinc-600 uppercase tracking-widest">
            Trusted partners
          </span>
          {companies.map((company) => (
            <div key={company} className="text-zinc-500 hover:text-zinc-300 transition-colors">
              <span className="text-sm font-medium tracking-widest">{company}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
