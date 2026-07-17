import Image from "next/image";

const shipments = [
  { awb: "S-DXB-00231", route: "Dubai → Chennai", kg: "42.5 kg", status: "In transit", tone: "petrol" },
  { awb: "S-DXB-00228", route: "Dubai → Kochi", kg: "18.0 kg", status: "Out for delivery", tone: "mint" },
  { awb: "S-DXB-00226", route: "Dubai → Bengaluru", kg: "76.2 kg", status: "Customs hold", tone: "hold" },
  { awb: "S-DXB-00224", route: "Dubai → Hyderabad", kg: "9.4 kg", status: "Delivered", tone: "deep" },
  { awb: "S-DXB-00219", route: "Dubai → Chennai", kg: "31.8 kg", status: "Collected", tone: "petrol" },
];

const pillTone: Record<string, string> = {
  petrol: "bg-petrol/10 text-petrol",
  mint: "bg-mint/20 text-mint-deep",
  deep: "bg-mint-deep/10 text-mint-deep",
  hold: "bg-hair text-muted",
};

const kpis = [
  { label: "In transit", value: "128", note: "+12 today" },
  { label: "Collections today", value: "24", note: "3 branches" },
  { label: "Pending approvals", value: "6", note: "2 urgent" },
  { label: "COD to settle", value: "AED 18,400", note: "5 drivers" },
];

const sideNav = ["Dashboard", "Shipments", "Warehouse", "Finance", "Inventory", "Field ops"];

export function ProductMock() {
  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="overflow-hidden rounded-2xl border border-hair bg-white shadow-[0_24px_64px_-16px_rgba(16,64,80,0.25)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-3 border-b border-hair bg-tint px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-hair" />
            <span className="h-2.5 w-2.5 rounded-full bg-hair" />
            <span className="h-2.5 w-2.5 rounded-full bg-hair" />
          </div>
          <div className="mx-auto w-full max-w-xs rounded-md bg-white px-3 py-1 text-center text-[11px] text-faint">
            voxarel.com/dashboard
          </div>
          <div className="w-10" />
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="hidden w-44 shrink-0 flex-col bg-petrol-deep p-3.5 sm:flex">
            <Image
              src="/voxarel-logo-white.png"
              alt=""
              width={720}
              height={124}
              className="mb-5 mt-1 h-4 w-auto self-start"
            />
            {sideNav.map((item, i) => (
              <div
                key={item}
                className={`rounded-md px-2.5 py-[7px] text-[11.5px] font-bold ${
                  i === 0 ? "bg-white/10 text-white" : "text-white/55"
                }`}
              >
                {item}
              </div>
            ))}
            <div className="mt-1 flex items-center gap-1.5 rounded-md px-2.5 py-[7px] text-[11.5px] font-bold text-mint-bright">
              Pulse
              <span className="rounded bg-mint/25 px-1 text-[8.5px] uppercase tracking-wide">AI</span>
            </div>
            <div className="mt-auto flex items-center gap-2 border-t border-white/10 px-2 pt-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-mint text-[9px] font-extrabold text-petrol-deep">
                Z
              </span>
              <span className="text-[10px] text-white/55">Operations</span>
            </div>
          </div>

          {/* Main panel */}
          <div className="min-w-0 flex-1 bg-tint/50 p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="font-display text-[13.5px] font-bold text-ink">
                Operations overview
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-hair bg-white px-2.5 py-1 text-[10.5px] font-bold text-mint-deep">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint-deep" />
                </span>
                Live
              </div>
            </div>

            {/* KPIs */}
            <div className="mb-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
              {kpis.map((k) => (
                <div key={k.label} className="rounded-xl border border-hair bg-white p-3">
                  <div className="text-[10px] font-bold uppercase tracking-wide text-faint">
                    {k.label}
                  </div>
                  <div className="font-display mt-1 text-[17px] font-bold tabular-nums text-petrol">
                    {k.value}
                  </div>
                  <div className="mt-0.5 text-[10px] text-mint-deep">{k.note}</div>
                </div>
              ))}
            </div>

            {/* Shipments table */}
            <div className="overflow-hidden rounded-xl border border-hair bg-white">
              <div className="flex items-center justify-between border-b border-hair px-3.5 py-2.5">
                <span className="text-[11px] font-bold text-ink">Latest shipments</span>
                <span className="text-[10.5px] font-bold text-mint-deep">View all</span>
              </div>
              {shipments.map((s) => (
                <div
                  key={s.awb}
                  className="flex items-center justify-between gap-3 border-b border-hair/70 px-3.5 py-[9px] last:border-0"
                >
                  <span className="w-24 shrink-0 text-[11px] font-bold tabular-nums text-petrol">
                    {s.awb}
                  </span>
                  <span className="hidden flex-1 text-[11px] text-muted md:block">{s.route}</span>
                  <span className="hidden w-16 text-[11px] tabular-nums text-faint sm:block">
                    {s.kg}
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-2 py-[3px] text-[9.5px] font-bold ${pillTone[s.tone]}`}
                  >
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
