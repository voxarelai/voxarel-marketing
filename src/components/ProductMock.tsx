type NavItem = { label: string; count?: string; active?: boolean };
const groups: { title: string; items: NavItem[] }[] = [
  {
    title: "Operate",
    items: [
      { label: "Shipments", count: "1,284", active: true },
      { label: "Warehouse" },
      { label: "Inventory" },
    ],
  },
  { title: "Money", items: [{ label: "Finance" }, { label: "Invoices", count: "12" }] },
  { title: "Field", items: [{ label: "Collections" }] },
];

const kpis = [
  { label: "In transit", value: "1,284" },
  { label: "Cleared today", value: "96", delta: "+8%", spark: true },
  { label: "Awaiting action", value: "7" },
];

const rows = [
  { id: "S-DXB-00231", customer: "Al Noor Traders", corridor: "Dubai → Chennai", mode: "Air", status: "On track", tone: "ok" },
  { id: "S-DXB-00226", customer: "Gulf Cargo Co", corridor: "Dubai → Cochin", mode: "Sea", status: "Customs hold", tone: "hold" },
  { id: "S-DXB-00219", customer: "Sharaf Exports", corridor: "Sharjah → Mumbai", mode: "Air", status: "Awaiting payment", tone: "hold" },
  { id: "S-DXB-00214", customer: "Malabar Foods", corridor: "Dubai → Delhi", mode: "Sea", status: "On track", tone: "ok" },
];

const pill: Record<string, { chip: string; dot: string }> = {
  ok: { chip: "bg-mint/15 text-mint-deep", dot: "bg-mint" },
  hold: { chip: "bg-[#c8963c]/15 text-[#8a5e10]", dot: "bg-[#c8963c]" },
};

export function ProductMock() {
  return (
    <div className="relative">
      {/* soft mint backdrop (depth, not glow) */}
      <div
        aria-hidden
        className="absolute -z-10"
        style={{
          inset: "-10% -8% -18% -8%",
          background:
            "radial-gradient(72% 82% at 50% -8%, rgba(95,181,162,0.13), transparent 72%)",
        }}
      />
      <div className="frame-elevate overflow-hidden rounded-2xl border border-hair bg-white">
        {/* browser chrome */}
        <div className="flex h-[42px] items-center gap-2 border-b border-hair bg-tint px-4">
          <span className="flex gap-1.5">
            <i className="h-2.5 w-2.5 rounded-full bg-[#d9e3e0]" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#d9e3e0]" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#d9e3e0]" />
          </span>
          <span className="ml-2 rounded-md border border-hair bg-white px-3 py-1 font-mono text-[12px] text-faint">
            app.voxarel.com
          </span>
        </div>

        <div className="grid min-h-[352px] grid-cols-1 sm:grid-cols-[198px_1fr]">
          {/* rail */}
          <aside className="hidden flex-col border-r border-hair bg-ivory p-3.5 sm:flex">
            <div className="mb-1.5 flex items-center gap-2 border-b border-hair px-2 pb-3 font-display text-[13px] font-semibold tracking-tight text-petrol-deep">
              <span className="grid h-5 w-5 place-items-center rounded-md bg-petrol text-[9.5px] font-bold text-mint-bright">
                ST
              </span>
              ST Courier
              <span className="ml-auto text-[12px] text-faint">▾</span>
            </div>
            {groups.map((g) => (
              <div key={g.title}>
                <div className="mb-2 mt-3.5 px-2 font-display text-[10.5px] font-medium uppercase tracking-[0.1em] text-faint">
                  {g.title}
                </div>
                {g.items.map((it) => (
                  <div
                    key={it.label}
                    className={`flex items-center gap-2.5 rounded-lg px-2 py-[7px] font-display text-[13.5px] font-medium ${
                      it.active
                        ? "bg-white text-petrol-deep shadow-[inset_0_0_0_1px_var(--color-hair)]"
                        : "text-muted"
                    }`}
                  >
                    <span
                      className={`h-[15px] w-[15px] rounded border-[1.5px] ${
                        it.active ? "border-petrol opacity-100" : "border-current opacity-50"
                      }`}
                    />
                    {it.label}
                    {it.count && (
                      <span className="ml-auto font-mono text-[11px] text-faint">{it.count}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </aside>

          {/* panel */}
          <div className="min-w-0">
            {/* app top-bar */}
            <div className="flex items-center gap-3 border-b border-hair px-5 py-[11px]">
              <span className="font-display text-[15px] font-semibold tracking-tight text-petrol-deep">
                Shipments
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-tint-2 px-2.5 py-1 font-mono text-[11px] text-petrol-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                Live · 6 branches
              </span>
              <span className="flex-1" />
              <span className="hidden h-[31px] items-center rounded-lg border border-hair bg-ivory px-3 text-[12px] text-faint lg:inline-flex">
                Search shipments…
              </span>
              <span className="inline-flex h-[31px] items-center gap-1.5 rounded-lg bg-petrol px-3 font-display text-[12px] font-medium text-white">
                ＋ New booking
              </span>
              <span className="grid h-[29px] w-[29px] place-items-center rounded-full border border-hair bg-tint-2 font-display text-[10.5px] font-semibold text-petrol">
                ZN
              </span>
            </div>

            <div className="p-5">
              {/* tabs */}
              <div className="mb-4 flex items-center gap-5 border-b border-hair">
                {["All", "In transit", "Customs", "Delivered"].map((t, i) => (
                  <span
                    key={t}
                    className={`relative pb-2.5 font-display text-[12.5px] font-medium ${
                      i === 0
                        ? "text-petrol-deep after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full after:bg-petrol"
                        : "text-muted"
                    }`}
                  >
                    {t}
                  </span>
                ))}
                <span className="ml-auto pb-2.5 font-mono text-[11.5px] text-faint">Oct 2026</span>
              </div>

              {/* KPIs */}
              <div className="mb-4 grid grid-cols-1 overflow-hidden rounded-xl border border-hair sm:grid-cols-3">
                {kpis.map((k, i) => (
                  <div
                    key={k.label}
                    className={`px-4 py-3.5 ${i < kpis.length - 1 ? "border-b border-hair sm:border-b-0 sm:border-r" : ""}`}
                  >
                    <div className="font-display text-[11px] font-medium uppercase tracking-[0.05em] text-faint">
                      {k.label}
                    </div>
                    <div className="mt-1.5 flex items-end justify-between gap-2.5">
                      <div className="font-display text-[22px] font-semibold tabular-nums tracking-tight text-petrol-deep">
                        {k.value}
                        {k.delta && (
                          <span className="ml-1.5 text-[12px] font-medium text-mint-deep">
                            {k.delta}
                          </span>
                        )}
                      </div>
                      {k.spark && (
                        <svg className="h-6 w-[60px] shrink-0" viewBox="0 0 60 24" fill="none">
                          <polyline
                            points="0,19 10,15 19,17 28,9 37,12 48,6 60,3"
                            stroke="#5fb5a2"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* table */}
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr className="font-display text-[10.5px] font-medium uppercase tracking-[0.07em] text-faint">
                    <th className="border-b border-hair px-2.5 py-2.5 text-left">Shipment</th>
                    <th className="hidden border-b border-hair px-2.5 py-2.5 text-left md:table-cell">
                      Customer
                    </th>
                    <th className="hidden border-b border-hair px-2.5 py-2.5 text-left md:table-cell">
                      Corridor
                    </th>
                    <th className="hidden border-b border-hair px-2.5 py-2.5 text-left md:table-cell">
                      Mode
                    </th>
                    <th className="border-b border-hair px-2.5 py-2.5 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.id} className="text-muted">
                      <td
                        className={`px-2.5 py-3 font-mono text-[12.5px] tabular-nums text-ink ${i < rows.length - 1 ? "border-b border-hair" : ""}`}
                      >
                        {r.id}
                      </td>
                      <td
                        className={`hidden px-2.5 py-3 md:table-cell ${i < rows.length - 1 ? "border-b border-hair" : ""}`}
                      >
                        {r.customer}
                      </td>
                      <td
                        className={`hidden px-2.5 py-3 md:table-cell ${i < rows.length - 1 ? "border-b border-hair" : ""}`}
                      >
                        {r.corridor}
                      </td>
                      <td
                        className={`hidden px-2.5 py-3 md:table-cell ${i < rows.length - 1 ? "border-b border-hair" : ""}`}
                      >
                        {r.mode}
                      </td>
                      <td className={`px-2.5 py-3 ${i < rows.length - 1 ? "border-b border-hair" : ""}`}>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-display text-[11.5px] font-medium ${pill[r.tone].chip}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${pill[r.tone].dot}`} />
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
