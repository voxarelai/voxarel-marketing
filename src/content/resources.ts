export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date, published
  readMins: number;
  body: Block[];
  related: { label: string; href: string }[];
};

export const articles: Article[] = [
  {
    slug: "cash-on-delivery-reconciliation",
    title: "Cash on delivery reconciliation: why it breaks, and how to fix it",
    description:
      "COD reconciliation fails when cash, drivers and branches live in separate ledgers. Here is why it breaks and a practical way to make the numbers add up every day.",
    date: "2026-08-04",
    readMins: 6,
    body: [
      {
        type: "p",
        text: "Across the Gulf and South Asia, a large share of deliveries are still paid in cash on delivery. The money is real, but the reconciliation is where operators quietly lose it. A few dirhams unaccounted for per shipment, multiplied across hundreds of parcels and a dozen drivers, becomes a month end nobody trusts.",
      },
      { type: "h2", text: "What cash on delivery reconciliation actually means" },
      {
        type: "p",
        text: "Reconciliation is the act of matching three numbers that should always agree: what a shipment was supposed to collect, what the driver or agent actually collected, and what finally reached the bank. When those three match for every shipment, every day, you have control. When they do not, you have leakage and arguments.",
      },
      { type: "h2", text: "Why it breaks" },
      {
        type: "ul",
        items: [
          "Multiple drivers each hold cash at the same time, in different amounts, for different shipments.",
          "Every branch keeps its own spreadsheet, and no two are built the same way.",
          "Cash sits in transit for days between collection, the branch, and the bank.",
          "Partial payments, refunds and failed deliveries are recorded late or not at all.",
          "There is no single ledger, so a discrepancy can hide for weeks.",
        ],
      },
      {
        type: "p",
        text: "The cost is not only the cash that goes missing. It is the slow monthly close, the disputes between branches, and the quiet erosion of trust when the head office can never quite prove where the money went.",
      },
      { type: "h2", text: "How to fix it" },
      {
        type: "ul",
        items: [
          "Give every driver one running ledger, from the moment cash is collected to the moment it is settled.",
          "Record the collection against the shipment, on the phone, at the point of delivery, not on a slip of paper later.",
          "Reconcile daily, not monthly. A one day gap is easy to find; a one month gap is an investigation.",
          "Separate three states clearly: collected, settled, and banked. Do not let them blur.",
          "Require deposit verification, so finance confirms what actually reached the bank against what was collected.",
          "Surface variances the moment they appear, while the driver and the delivery are still fresh.",
        ],
      },
      {
        type: "p",
        text: "This is exactly where software earns its place. When cash on delivery is tied to the shipment and the driver, and reconciled automatically against verified deposits, the spreadsheet disappears and the numbers simply agree.",
      },
      { type: "h2", text: "The daily rhythm that works" },
      {
        type: "ul",
        items: [
          "Morning: each driver can see their outstanding cash on delivery for the day.",
          "Through the day: collections are recorded on the phone at delivery, against the right shipment.",
          "Evening: drivers settle and deposit; finance verifies the deposit against what was collected.",
          "Any variance is flagged the same day, to the right person, with the shipment attached.",
        ],
      },
      {
        type: "p",
        text: "When cash on delivery reconciles daily, month end stops being a fight. It becomes a report you can already trust, because the work was done the day it happened.",
      },
    ],
    related: [
      { label: "See how Voxarel handles finance and COD", href: "/features" },
      { label: "Courier management software", href: "/courier-management-software" },
      { label: "Book a demo", href: "/demo" },
    ],
  },
  {
    slug: "cargo-consolidation-explained",
    title: "Cargo consolidation explained: how groupage works and how to price it",
    description:
      "Cargo consolidation, or groupage, combines many shippers into one movement to cut cost. Here is how it works, how chargeable weight is calculated, and how to price it without losing margin.",
    date: "2026-08-04",
    readMins: 7,
    body: [
      {
        type: "p",
        text: "Consolidation is how forwarders make thin margins work. Done well, it lowers cost for every customer in the container and still leaves you a healthy margin. Done carelessly, it quietly eats your profit, one under priced box at a time.",
      },
      { type: "h2", text: "What consolidation, or groupage, is" },
      {
        type: "p",
        text: "Consolidation combines shipments from several customers into one movement, most often one container on a corridor. Instead of each customer paying for a full load they do not need, they each pay a share of the space they use. Your job is to fill the container well and allocate its cost fairly and profitably.",
      },
      { type: "h2", text: "Chargeable weight: the number that matters" },
      {
        type: "p",
        text: "Carriers do not charge on actual weight alone. A light but bulky box takes space a heavy small box does not, so pricing uses chargeable weight: the greater of actual weight and volumetric weight. Volumetric weight is the shipment volume divided by a standard divisor set by the mode and the carrier. Whichever is larger is what you bill.",
      },
      {
        type: "ul",
        items: [
          "Measure every package at intake: length, width, height and actual weight.",
          "Compute volumetric weight from the dimensions and the correct divisor.",
          "Take the greater of actual and volumetric weight.",
          "That number, the chargeable weight, is what you price on.",
        ],
      },
      { type: "h2", text: "How to price a consolidated shipment" },
      {
        type: "ul",
        items: [
          "Start from your current corridor rate per kilogram, not a rate from last quarter.",
          "Allocate the container cost across shippers by chargeable weight, so each pays for the space they use.",
          "Add the real extras: handling, customs, last mile, insurance and any cash on delivery fee.",
          "Keep a floor price, so a small parcel is never loss making once you count the handling.",
        ],
      },
      {
        type: "p",
        text: "The most common trap is pricing on actual weight when a box is light and bulky. The customer is happy, the container fills with air, and your margin vanishes. Chargeable weight exists precisely to stop that.",
      },
      { type: "h2", text: "Where operators lose money" },
      {
        type: "ul",
        items: [
          "Not measuring dimensions at intake, so volumetric weight is guessed later.",
          "Pricing on stale corridor rates that no longer reflect the market.",
          "Forgetting surcharges that apply to the lane or the commodity.",
          "Having no minimum, so small shipments are quietly subsidised.",
          "Doing all the maths by hand across a spreadsheet, where errors hide.",
        ],
      },
      {
        type: "p",
        text: "Consolidation profit lives in three habits: accurate measurement at intake, current corridor rates, and disciplined pricing on chargeable weight. A system that captures dimensions when the box arrives and applies your live corridor rates removes the guesswork and the arithmetic at once.",
      },
    ],
    related: [
      { label: "Cargo management software", href: "/cargo-management-software" },
      { label: "See the full platform", href: "/features" },
      { label: "Book a demo", href: "/demo" },
    ],
  },
  {
    slug: "how-to-choose-logistics-software",
    title: "How to choose courier and cargo management software: a practical checklist",
    description:
      "A practical checklist for choosing courier or cargo management software: what to evaluate, the red flags, and the questions that separate a real platform from a booking tool.",
    date: "2026-08-04",
    readMins: 8,
    body: [
      {
        type: "p",
        text: "Most software sold to courier and cargo companies stops at the booking. That is the easy part. The hard part, where operations actually break, is the cash, the reconciliation, the warehouse, and keeping many branches honest with each other. Here is how to tell a real platform from a booking tool with a nice logo.",
      },
      { type: "h2", text: "Start with the whole operation, not the booking" },
      {
        type: "p",
        text: "A booking screen is the easy twenty percent. What you actually need is a system of record for the whole flow, from the first quote to the final settlement, where every step shares the same live data. Judge software on how much of that flow it truly covers.",
      },
      {
        type: "ul",
        items: [
          "Quote to settlement in one connected record, not separate apps.",
          "Finance: invoicing, VAT, cash on delivery, and daily reconciliation.",
          "Warehouse and containers: scanning, manifests, and load planning.",
          "Multi-branch, with roles and dashboards for each job.",
          "Corridor rates that match how you actually price.",
          "A real mobile app for drivers and field agents.",
          "Tracking, complaints, and an audit trail of who did what.",
        ],
      },
      { type: "h2", text: "The finance test" },
      {
        type: "p",
        text: "If the software cannot reconcile cash on delivery and help you close the month, it is a booking tool, whatever the brochure says. Ask to see a day of collections reconciled against deposits, live, on the demo. Watch how it handles a variance.",
      },
      { type: "h2", text: "The mobile test" },
      {
        type: "p",
        text: "Drivers and field agents live on their phones. If the field app is an afterthought, adoption fails, and a system nobody uses is worse than the spreadsheet you replaced. Ask what works offline, because connectivity on a route is never guaranteed.",
      },
      { type: "h2", text: "Red flags" },
      {
        type: "ul",
        items: [
          "No cash on delivery settlement, or it is handled outside the system.",
          "Per seat pricing that punishes you for growing your team.",
          "No offline mode for the field app.",
          "No audit trail, so you cannot prove who changed what.",
          "Key features that are always coming soon.",
          "A demo run only on their sample data, never on yours.",
        ],
      },
      { type: "h2", text: "Build versus buy" },
      {
        type: "p",
        text: "Building your own looks cheaper until you price the ongoing maintenance of finance, compliance and a mobile app. Those are boring, endless, and unforgiving. Buy the parts that are the same for every operator, and spend your energy on what makes your service different.",
      },
      { type: "h2", text: "Questions to ask on the demo" },
      {
        type: "ul",
        items: [
          "Can you reconcile a day of cash on delivery for me, right now?",
          "Show me the audit trail for a shipment that was changed.",
          "Add a new branch while I watch.",
          "Price a shipment on one of my real corridors.",
          "What happens when a driver loses signal mid route?",
          "Who runs this in production today, and at what scale?",
        ],
      },
      {
        type: "p",
        text: "Above all, insist on a demo run on your own workflow, your corridors and your numbers. Any platform confident in the hard half will happily show you.",
      },
    ],
    related: [
      { label: "See everything Voxarel does", href: "/features" },
      { label: "Cargo management software", href: "/cargo-management-software" },
      { label: "Courier management software", href: "/courier-management-software" },
      { label: "Book a demo", href: "/demo" },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Deterministic date formatting (no locale dependency at build time).
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}
